//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.OxsContainerControl.cs           </Name>
//    <Description> Pomocná třída pro zobrazení OXS dokumentu                   </Description>
//    <Author>      Mgr. Stepan Sukovyč                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2016-09-01                                                  </Created>
//  </FileHeader>

using System;
using System.Threading;
using System.Windows.Forms;
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
    /// Pomocná třída pro zobrazení OXS dokumentu
    /// </summary>
    class OxsContainerControl : UserControl, IOfficeDocumentView
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
                {
                    errMessTextBox.BringToFront();
                    errMessTextBox.TabStop = true;
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
        public SelectionService ServiceSelection { get { return view is IHost ? (view as IHost).ServiceSelection : null; } }

        /// <summary>
        /// Ukazatel na aplikaci Excelu
        /// </summary>
        public IntPtr DocumentAppPointer { get; private set; } = IntPtr.Zero;

        /// <exclude/>
        public void ShowDocument()
        {
            if (errorVisible)
                return;

            DocumentAppPointer = document.ShowDocument(Handle, Bounds);
        }

        /// <summary>
        /// aktuální obsah
        /// </summary>
        public IViewContent Content { get => view; }
        #endregion

        /// <summary>
        /// obsah byl pozměněn
        /// </summary>
        public event EventHandler DirtyChanged;

        OxsOfficeDocument document;
        bool dirty;
        bool errorVisible;
        RichTextBox errMessTextBox;

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        private OxsContainerControl()
        {
            InitializeComponent();
        }
        IViewContent view;
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public OxsContainerControl(IViewContent pView)
            : this()
        {
            this.view = pView;
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
                document = new OxsOfficeDocument(this);
                PropertyPad.PropertyValueChanged += PvChanged;
                if (SimpleDesktop.Desktop != null)
                    SimpleDesktop.Desktop.ActiveViewContentChanged += this.IsavcChangedHandler;
            }

            document.Load(CompilationService.Units[primaryFile].FileContent.Content);
            ShowDocument();
        }

        /// <exclude/>
        protected override void OnResize(EventArgs e)
        {
            if (document == null)
                return;

            if (document.OfficeWnd != IntPtr.Zero)
                NativeMethods.MoveWindow(document.OfficeWnd, 0, 0, Bounds.Width, Bounds.Height, true);
            // počkáme, až se OFFICE vypořádá s dokumentem
            Thread.Sleep(ReportDesignerProperties.Instance.RtfThreadSleep);
        }
        /// <exclude/>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                DocumentAppPointer = IntPtr.Zero;
                if (PrimaryFile != null && document != null)
                    document.CloseDocument(PrimaryFile);

                PropertyPad.PropertyValueChanged -= PvChanged;
                InfoSectionViewPad.TreeChanged -= IsTreeChanged;

                if (SimpleDesktop.Desktop != null)
                    SimpleDesktop.Desktop.ActiveViewContentChanged -= this.IsavcChangedHandler;
            }
            base.Dispose(disposing);
        }

        /// <summary>
        /// Text chybové hlášky
        /// </summary>
        string ErrorMessage
        {
            get => errMessTextBox.Text;
            set { errMessTextBox.Text = value; }
        }

        /// <summary>
        /// 
        /// </summary>
        public bool IsInsertSection { get; set; }

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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(OxsContainerControl));
            this.errMessTextBox = new System.Windows.Forms.RichTextBox();
            this.SuspendLayout();
            // 
            // errMessTextBox
            // 
            resources.ApplyResources(this.errMessTextBox, "errMessTextBox");
            this.errMessTextBox.Name = "errMessTextBox";
            this.errMessTextBox.TabStop = false;
            // 
            // OxsContainerControl
            // 
            this.Controls.Add(this.errMessTextBox);
            this.Name = "OxsContainerControl";
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
