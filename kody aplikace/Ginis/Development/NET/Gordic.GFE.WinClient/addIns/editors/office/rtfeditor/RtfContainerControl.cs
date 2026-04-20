//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.RtfOfficeContainerControl.cs           </Name>
//    <Description> Pomocná třída pro zobrazení RTF dokumentu                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-12                                                  </Created>
//  </FileHeader>

using System;
using System.Threading;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.InfoSectionView;
using System.Drawing;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.AddIns;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Pomocná třída pro zobrazení RTF dokumentu
    /// </summary>
    class RtfContainerControl : UserControl, IOfficeDocumentView
    {
        #region IRtfDocumentView
        /// <summary>
        /// grafika pro výpočty
        /// </summary>
        public Graphics ComputeGraphics { get => null; set { } }
        /// <summary>
        /// struktura vázané sestavy
        /// </summary>
        public GFEStructure Structure => null;
        /// <summary>
        /// služba grafiky
        /// </summary>
        public IGraphicSettingService GSS { get => null; set { } }
        /// <summary>
        /// hodnota zvětšení
        /// </summary>
        public float Zoom => 1;
        /// <summary>
        /// kolekce stránek ovladače
        /// </summary>
        public Gordic.GFE.Parsers.Dom.IPages Pages => null;
        /// <summary>
        /// Ovladač, na kterém probíhá kreslení
        /// </summary>
        public object Control => null;

        /// <summary>
        /// Dokument ovladače
        /// </summary>
        public IOfficeDocument Document => document;
        /// <summary>
        /// Primární soubor sestavy
        /// </summary>
        public OpenedFile PrimaryFile => primaryFile;
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
                OnRtfChanged(previousDirty);
            }
        }
        /// <summary>
        /// Indikuje, že je zobrazeá chybová hláška.
        /// </summary>
        public bool IsErrorVisible
        {
            get => errVisible;
            set
            {
                errVisible = value;
                if (value)
                {
                    errMessTextBox.BringToFront();
                    errMessTextBox.TabStop = true; ;
                }
                else
                {
                    errMessTextBox.SendToBack();
                    errMessTextBox.TabStop = false;
                }
            }
        }

        /// <summary>
        /// zobrazení chybové hlášky
        /// </summary>
        /// <param name="message">zobrazovaná zpráva</param>
        public void ShowErrorMessage(string message)
        {
            ErrorMessage = message;
            IsErrorVisible = true;
        }
        /// <summary>
        /// Služba pro práci s výběrem
        /// </summary>
        public SelectionService ServiceSelection => view is IHost ? (view as IHost).ServiceSelection : null;

        /// <summary>
        /// zobrazení dokuemntu v okně
        /// </summary>
        public void ShowDocument()
        {
            if (errVisible)
                return;

            document.ShowDocument(this.Handle, this.Bounds);
        }
        /// <summary>
        /// aktuální obsah
        /// </summary>
        public IViewContent Content => view;
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
        #endregion

        /// <summary>
        /// 
        /// </summary>
        public bool IsInsertSection { get; set; }

        /// <summary>
        /// obsah byl pozměněn
        /// </summary>
        public event EventHandler DirtyChanged;

        void OnRtfChanged(bool previousIsDirty)
        {
            if (previousIsDirty != dirty)
                OnDirtyChanged();
        }
        void OnDirtyChanged()
        {
            DirtyChanged?.Invoke(this, new EventArgs());
        }

        RtfOfficeDocument document;
        public IntPtr DocumentAppPointer => document?.WordWnd ?? IntPtr.Zero;
        bool dirty;
        RichTextBox errMessTextBox;
        bool errVisible;

        /// <summary>
        /// Text chybové hlášky
        /// </summary>
        public string ErrorMessage
        {
            get => errMessTextBox.Text;
            set { errMessTextBox.Text = value; }
        }

        OpenedFile primaryFile;

        /// <summary>
        /// Zobrazí zadaný XML jako strom.
        /// </summary>
        /// <param name="pFile">primární soubor sestavy</param>
        public void LoadXml(OpenedFile pFile)
        {
            IsErrorVisible = false;
            this.primaryFile = pFile;
            if (document == null)
            {
                document = new RtfOfficeDocument(this);
                PropertyPad.PropertyValueChanged += PvChanged;
                if (SimpleDesktop.Desktop != null)
                    SimpleDesktop.Desktop.ActiveViewContentChanged += this.IsavcChangedHandler;
            }
            LoadXml(CompilationService.Units[pFile].FileContent.Content);
        }

        internal void LoadXml(string content)
        {
            if (document != null)
            {
                document.Load(content);
                ShowDocument();
            }
        }

        /// <exclude/>
        protected override void OnResize(EventArgs e)
        {
            if (document == null)
                return;
            NativeMethods.MoveWindow(document.WordWnd, 0, 0, Bounds.Width, Bounds.Height, true);
            // počkáme, až se WORD vypořádá s dokumentem
            Thread.Sleep(ReportDesignerProperties.Instance.RtfThreadSleep);
        }
        /// <exclude/>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (primaryFile != null && document != null)
                    document.CloseDocument(primaryFile);
                PropertyPad.PropertyValueChanged -= PvChanged;
                InfoSectionViewPad.TreeChanged -= IsTreeChanged;

                if (SimpleDesktop.Desktop != null)
                    SimpleDesktop.Desktop.ActiveViewContentChanged -= this.IsavcChangedHandler;
            }
            base.Dispose(disposing);
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        private RtfContainerControl()
        {
            InitializeComponent();
        }

        readonly IViewContent view;
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public RtfContainerControl(IViewContent pView)
            : this()
        {
            this.view = pView;
            primaryFile = pView.PrimaryFile;
        }
        /// <summary>
        /// This method is required for Windows Forms designer support.
        /// Do not change the method contents inside the source code editor. The Forms designer might
        /// not be able to load this method if it was changed manually.
        /// </summary>
        void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(RtfContainerControl));
            this.errMessTextBox = new RichTextBox();
            this.SuspendLayout();
            // 
            // errMessTextBox
            // 
            resources.ApplyResources(this.errMessTextBox, "errMessTextBox");
            this.errMessTextBox.Name = "errMessTextBox";
            this.errMessTextBox.TabStop = false;
            // 
            // RtfContainerControl
            // 
            this.Controls.Add(this.errMessTextBox);
            this.Name = "RtfContainerControl";
            resources.ApplyResources(this, "$this");
            this.ResumeLayout(false);

        }

        void PvChanged(object s, PropertyValueChangedEventArgs e) { this.IsDirty = true; }
        void IsavcChangedHandler(object sender, EventArgs e)
        {
            if (SimpleDesktop.Desktop.ActiveViewContent == this)
                InfoSectionViewPad.TreeChanged += IsTreeChanged;
            else
                InfoSectionViewPad.TreeChanged -= IsTreeChanged;
        }
        void IsTreeChanged(object sender, EventArgs e) { this.IsDirty = true; }

        internal void RefreshLists()
        {
            document?.RefreshLists();
        }
    }
}
