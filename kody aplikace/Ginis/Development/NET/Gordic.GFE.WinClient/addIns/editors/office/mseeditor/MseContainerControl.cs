//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.MseOfficeContainerControl.cs           </Name>
//    <Description> Pomocná třída pro zobrazení MSE dokumentu                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-22                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.InfoSectionView;
using System;
using System.Drawing;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Pomocná třída pro zobrazení MSE dokumentu
    /// </summary>
    class MseContainerControl : UserControl, IOfficeDocumentView
    {
        #region IMseDocumentView
        /// <summary>
        /// grafika pro výpočty
        /// </summary>
        public Graphics ComputeGraphics { get => null; set { } }
        /// <summary>
        /// struktura vázané sestavy
        /// </summary>
        public GFEStructure Structure { get => null; }
        /// <summary>
        /// služba grafiky
        /// </summary>
        public IGraphicSettingService GSS { get => null; set { } }
        /// <summary>
        /// hodnota zvětšení
        /// </summary>
        public float Zoom { get => 1; }
        /// <summary>
        /// kolekce stránek ovladače
        /// </summary>
        public Gordic.GFE.Parsers.Dom.IPages Pages { get => null; }

        /// <summary>
        /// Ovladač, na kterém probíhá kreslení
        /// </summary>
        public object Control { get => null; }

        /// <summary>
        /// Dokument ovladače
        /// </summary>
        public IOfficeDocument Document { get => document; }
        /// <summary>
        /// Primární soubor sestavy
        /// </summary>
        public OpenedFile PrimaryFile { get => view.PrimaryFile; }
        /// <summary>
        /// Indikuje nutnost uložení dokumentu
        /// </summary>
        public bool IsDirty
        {
            get => dirty;
            set
            {
                bool previousDirty = dirty;
                dirty = value;
                OnChanged(previousDirty);
            }
        }
        /// <summary>
        /// Indikuje, že je zobrazeá chybová hláška.
        /// </summary>
        public bool IsErrorVisible
        {
            get => errorVisible;
            set
            {
                errorVisible = value;

                if (value)
                    errMessTextBox.BringToFront();
                else
                    errMessTextBox.SendToBack();

                errMessTextBox.TabStop = value;
            }
        }

        /// <summary>
        /// zobrazení chybové hlášky
        /// </summary>
        /// <param name="message">zobrazovaná zpráva</param>
        public void ShowErrorMessage(string message)
        {
            errMessTextBox.Text = message;
            IsErrorVisible = true;
        }
        /// <summary>
        /// Služba pro práci s výběrem
        /// </summary>
        public SelectionService ServiceSelection { get => view is IHost ? (view as IHost).ServiceSelection : null; }

        public IntPtr DocumentAppPointer { get; private set; } = IntPtr.Zero;

        /// <exclude/>
        public void ShowDocument()
        {
            if (errorVisible)
                return;

            DocumentAppPointer = document.ShowDocument(this.Handle, this.Bounds);
        }
        /// <summary>
        /// aktuální obsah
        /// </summary>
        public IViewContent Content { get => view; }
        #endregion

        readonly System.Windows.Forms.Timer _resizeDebounceTimer = new System.Windows.Forms.Timer { Interval = 60 };
        readonly System.Windows.Forms.Timer _showRetryTimer = new System.Windows.Forms.Timer { Interval = 80 };
        DateTime _showStartedAt;
        bool _isDisposed;
        const int ShowRetryTimeoutMs = 4000;

        /// <summary>
        /// 
        /// </summary>
        public bool IsInsertSection { get; set; }

        /// <summary>
        /// obsah byl pozměněn
        /// </summary>
        public event EventHandler DirtyChanged;

        MseOfficeDocument document;
        bool dirty, errorVisible;
        RichTextBox errMessTextBox;

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        private MseContainerControl()
        {
            InitializeComponent();

            // Debounce resize
            _resizeDebounceTimer.Tick += (s, e) =>
            {
                _resizeDebounceTimer.Stop();
                ResizeEmbeddedWindow();
            };

            // Retry ShowDocument dokud nevznikne OfficeWnd
            _showRetryTimer.Tick += (s, e) =>
            {
                if (document == null || _isDisposed)
                {
                    _showRetryTimer.Stop();
                    return;
                }

                // Timeout ochrana
                if ((DateTime.Now - _showStartedAt).TotalMilliseconds > ShowRetryTimeoutMs)
                {
                    _showRetryTimer.Stop();
                    ShowErrorMessage("Nepodařilo se inicializovat okno Office v časovém limitu.");
                    return;
                }

                // Je okno už k dispozici?
                if (document.OfficeWnd != IntPtr.Zero && IsHandleCreated)
                    try
                    {
                        SafeAttachAndLayout();

                        _showRetryTimer.Stop();
                    }
                    catch (Exception ex)
                    {
                        _showRetryTimer.Stop();
                        ShowErrorMessage("Chyba při vkládání okna Office do kontejneru: " + ex.Message);
                    }
            };
        }

        readonly IViewContent view;
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public MseContainerControl(IViewContent pView) : this()
        {
            this.view = pView;
        }

        protected override void OnHandleCreated(EventArgs e)
        {
            base.OnHandleCreated(e);

            // Pokud už existuje načtený dokument (LoadXml mohl proběhnout dříve), zajistíme zobrazení nyní.
            if (!errorVisible && document != null)
                BeginInvoke(new Action(ShowDocumentSafe));
        }

        protected override void OnHandleDestroyed(EventArgs e)
        {
            base.OnHandleDestroyed(e);
        }

        /// <summary>
        /// Zobrazí zadaný XML jako strom.
        /// </summary>
        /// <param name="primaryFile">primární soubor sestavy</param>
        public void LoadXml(OpenedFile primaryFile)
        {
            IsErrorVisible = false;

            if (document == null)
            {
                document = new MseOfficeDocument(this);
                PropertyPad.PropertyValueChanged += PvChanged;
                if (SimpleDesktop.Desktop != null)
                    SimpleDesktop.Desktop.ActiveViewContentChanged += this.SavcChangedHandler;
            }

            document.Load(CompilationService.Units[primaryFile].FileContent.Content);

            if (IsHandleCreated)
                ShowDocumentSafe();
        }

        void ShowDocumentSafe()
        {
            if (_isDisposed || errorVisible || document == null)
                return;

            if (InvokeRequired)
            {
                BeginInvoke(new Action(ShowDocumentSafe));
                return;
            }

            try
            {
                DocumentAppPointer = document.ShowDocument(this.Handle, this.Bounds);
                _showStartedAt = DateTime.Now;

                if (document.OfficeWnd != IntPtr.Zero)                
                    SafeAttachAndLayout();
                else
                {
                    _showRetryTimer.Stop();
                    _showRetryTimer.Start();
                }
            }
            catch (Exception ex)
            {
                ShowErrorMessage("Nepodařilo se zobrazit dokument: " + ex.Message);
            }
        }

        void SafeAttachAndLayout()
        {
            if (document == null || document.OfficeWnd == IntPtr.Zero || !IsHandleCreated)
                return;

            NativeMethods.SetParent(document.OfficeWnd, this.Handle);
            // WS_CHILD (0x40000000), WS_VISIBLE (0x10000000)
            const int GWL_STYLE = -16;
            const int WS_CHILD = unchecked((int)0x40000000);
            const int WS_VISIBLE = 0x10000000;

            int style = NativeMethods.GetWindowLong(document.OfficeWnd, GWL_STYLE);
            style |= WS_CHILD | WS_VISIBLE;
            NativeMethods.SetWindowLong(document.OfficeWnd, GWL_STYLE, style);

            ResizeEmbeddedWindow();
        }

        void ResizeEmbeddedWindow()
        {
            if (document == null || document.OfficeWnd == IntPtr.Zero || !IsHandleCreated)
                return;

            var rc = this.ClientRectangle;
            const int SWP_NOZORDER = 0x0004;
            const int SWP_NOACTIVATE = 0x0010;
            NativeMethods.SetWindowPos(document.OfficeWnd, IntPtr.Zero, 0, 0, rc.Width, rc.Height, SWP_NOZORDER | SWP_NOACTIVATE);
        }

        /// <exclude/>
        protected override void OnResize(EventArgs e)
        {
            base.OnResize(e);

            if (document == null) return;

            _resizeDebounceTimer.Stop();
            _resizeDebounceTimer.Start();
        }

        /// <exclude/>
        protected override void Dispose(bool disposing)
        {
            if (disposing && !_isDisposed)
            {
                _isDisposed = true;

                try
                {
                    _resizeDebounceTimer.Stop();
                    _resizeDebounceTimer.Dispose();
                    _showRetryTimer.Stop();
                    _showRetryTimer.Dispose();
                }
                catch { }

                try
                {
                    if (PrimaryFile != null && document != null)
                        document.CloseDocument(PrimaryFile);
                }
                catch { }

                PropertyPad.PropertyValueChanged -= PvChanged;
                InfoSectionViewPad.TreeChanged -= IsTreeChanged;
                if (SimpleDesktop.Desktop != null)
                    SimpleDesktop.Desktop.ActiveViewContentChanged -= this.SavcChangedHandler;

                errMessTextBox?.Dispose();
                DocumentAppPointer = IntPtr.Zero;
            }
            base.Dispose(disposing);
        }

        void OnChanged(bool previousIsDirty)
        {
            if (previousIsDirty != dirty)
                OnDirtyChanged();
        }
        void OnDirtyChanged()
        {
            DirtyChanged?.Invoke(this, new EventArgs());
        }
        /// <summary>
        /// This method is required for Windows Forms designer support.
        /// Do not change the method contents inside the source code editor. The Forms designer might
        /// not be able to load this method if it was changed manually.
        /// </summary>
        void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(MseContainerControl));
            this.errMessTextBox = new System.Windows.Forms.RichTextBox();
            this.SuspendLayout();
            // 
            // errMessTextBox
            // 
            resources.ApplyResources(this.errMessTextBox, "errMessTextBox");
            this.errMessTextBox.Name = "errMessTextBox";
            this.errMessTextBox.TabStop = false;
            // 
            // MseContainerControl
            // 
            this.Controls.Add(this.errMessTextBox);
            this.Name = "MseContainerControl";
            resources.ApplyResources(this, "$this");
            this.ResumeLayout(false);

        }

        void PvChanged(object s, PropertyValueChangedEventArgs e) { this.IsDirty = true; }
        void SavcChangedHandler(object sender, EventArgs e)
        {
            if (SimpleDesktop.Desktop.ActiveViewContent == this)
                InfoSectionViewPad.TreeChanged += IsTreeChanged;
            else
                InfoSectionViewPad.TreeChanged -= IsTreeChanged;
        }
        void IsTreeChanged(object sender, EventArgs e) { IsDirty = true; }
        /// <exclude/>
        public void LoadData(OpenedFile primaryDataFile, byte[] fileData, OpenedFile formatFile, Parsers.Dom.DefaultDataManager manager)
        {
            throw new NotImplementedException();
        }

        /// <exclude/>
        public void RefreshData()
        {
            throw new NotImplementedException();
        }

    }
}
