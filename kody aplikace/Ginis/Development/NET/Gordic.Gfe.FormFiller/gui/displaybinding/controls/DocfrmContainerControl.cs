////  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
////    <Name>        Gordic.Gfe.FormFiller.DocfrmContainerControl.cs             </Name>
////    <Description> Dokument ovladače                                           </Description>
////    <Author>      Mgr. Stepan Sukovych                                        </Author>
////    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
////    <Created>     2013-02-13                                                  </Created>
////  </FileHeader>

//using System;
//using System.Collections.Generic;
//using System.Windows.Forms;
//using Gordic.GFE.Parsers;
//using Gordic.GFE.Parsers.Core;
//using Gordic.GFE.Parsers.Dom;
//using Gordic.GFE.Parsers.Gui;
//using Gordic.GFE.Parsers.Services;
//using System.Drawing;

//namespace Gordic.Gfe.FormFiller.Gui
//{
//    /// <summary>
//    /// Nadřazený ovladač kreslící plochy.
//    /// Udržuje i informací o sestavě v komponentě DocfrmFormationDocument.
//    /// </summary>
//    class DocfrmContainerControl : UserControl, ICurrentDocumentView, IMementoCapable
//    {
//        #region IGrfDocumentView
//        /// <summary>
//        /// grafika pro výpočty
//        /// </summary>
//        public Graphics ComputeGraphics { get { return panel == null ? null : panel.ComputeGraphics; } set { if (panel != null) panel.ComputeGraphics = value; } }

//        /// <summary>
//        /// struktura vázané sestavy
//        /// </summary>
//        public GFEStructure Structure { get { return panel != null ? panel.Structure : null; } }

//        /// <summary>
//        /// služba grafiky
//        /// </summary>
//        public IGraphicSettingService GSS { get { return panel != null ? panel.GSS : null; } set { if (panel != null) panel.GSS = value; } }

//        /// <summary>
//        /// hodnota zvětšení
//        /// </summary>
//        public float Zoom { get { return panel != null ? panel.Zoom : 1; } }

//        /// <summary>
//        /// kolekce stránek ovladače
//        /// </summary>
//        public IPages Pages { get { return panel != null ? panel.Pages : null; } }

//        DocfrmPagePanel panel;
//        /// <summary>
//        /// Ovladač, na kterém probíhá kreslení
//        /// </summary>
//        public object Control { get { return panel; } }

//        /// <summary>
//        /// Dokument ovladače
//        /// </summary>
//        public DocfrmFormationDocument Document { get { return document; } }
//        /// <summary>
//        /// Primární soubor sestavy
//        /// </summary>
//        public OpenedFile PrimaryFile { get { return dataFile; } }
//        /// <summary>
//        /// Indikuje, že je zobrazeá chybová hláška.
//        /// </summary>
//        public bool IsErrorVisible
//        {
//            get { return errorVisible; }
//            set
//            {
//                errorVisible = value;
//                if (value)
//                {
//                    errorMessageTextBox.BringToFront();
//                    errorMessageTextBox.TabStop = true;
//                }
//                else
//                {
//                    errorMessageTextBox.SendToBack();
//                    errorMessageTextBox.TabStop = false;
//                }
//            }
//        }
//        /// <summary>
//        /// Indikuje nutnost uložení dokumentu
//        /// </summary>
//        public bool IsDirty
//        {
//            get { return dirty; }
//            set
//            {
//                bool previousDirty = dirty;
//                dirty = value;
//                OnChanged(previousDirty);
//            }
//        }

//        public void ShowErrorMessage(string message)
//        {
//            ErrorMessage = message;
//            IsErrorVisible = true;
//        }
//        /// <summary>
//        /// Zobrazí zadaný XML jako strom.
//        /// </summary>
//        /// <param name="primaryFile">primární soubor sestavy</param>
//        public void LoadXml(OpenedFile primaryFile) { throw new NotImplementedException(); }
//        #endregion

//        #region IMementoCapable
//        /// <exclude/>
//        public Property CreateMemento()
//        {
//            Property property = new Property();
//            if (document != null && document.Pages != null)
//            {
//                List<int> colors = new List<int>();
//                List<string> images = new List<string>();
//                foreach (IPage page in document.Pages)
//                {
//                    colors.Add(page.BackColor.Color.ToArgb());
//                    if (page.BackImage != null)
//                        images.Add(ImageService.SetTempBackImage(page.BackImage.Image, page.BackImage.ImageFile));
//                    else images.Add(ImageService.SetTempBackImage(null, string.Empty));
//                }

//                property.Set("colors", colors);
//                property.Set("images", images);
//            }
//            return property;
//        }
//        /// <exclude/>
//        public void SetMemento(Property memento)
//        {
//            if (document == null || document.Pages == null)
//                return;

//            List<int> colors = memento.Get("colors", new List<int>());
//            List<string> images = memento.Get("images", new List<string>());
//            int index = 0;
//            foreach (IPage page in document.Pages)
//            {
//                if (colors.Count > index && !ColorService.IsTransparent(colors[index]))
//                    page.BackColor.Color = ColorService.FromArgb(colors[index]);
//                if (images.Count > index)
//                    page.BackImage = new BackgroundImage(ImageService.GetTempBackImage(images[index]), images[index]);
//                index++;
//            }
//        }
//        #endregion

//        /// <summary>
//        /// Uvolnění objektu
//        /// </summary>
//        /// <param name="disposing">Indikuje nutnost uvolnění objektu</param>
//        protected override void Dispose(bool disposing)
//        {
//            if (document != null) document.Dispose();
//            if (panel != null)
//            {
//                panel.Dispose();
//                panel = null;
//            }

//            if (errorMessageTextBox != null)
//            {
//                errorMessageTextBox.Dispose();
//                errorMessageTextBox = null;
//            }
//            base.Dispose(disposing);
//        }

//        /// <summary>
//        /// obsah byl pozměněn
//        /// </summary>
//        public event EventHandler DirtyChanged;

//        bool dirty;
//        bool errorVisible;
//        RichTextBox errorMessageTextBox;
//        DocfrmFormationDocument document;
//        OpenedFile dataFile;

//        private DocfrmContainerControl()
//        {
//            InitializeComponent();
//            GotFocus += delegate
//            {
//                if (this.Controls.Count != 0 && this.ContainsFocus) 
//                    this.Controls[0].Focus();
//            };
//        }

//        /// <summary>
//        /// Vytvoření nové instance třídy
//        /// </summary>
//        public DocfrmContainerControl(IViewContent view)
//            : this()
//        {
//            panel = new DocfrmPagePanel(view) { Dock = DockStyle.Fill };
//            Controls.Add(panel);
//        }

//        /// <summary>
//        /// Načtení dat formuláře.
//        /// </summary>
//        /// <param name="primaryDataFile">primární datový soubor</param>
//        /// <param name="formatFileData">Obsah souboru sestavy</param>
//        /// <param name="manager">Správce dat</param>
//        /// <param name="view"></param>
//        public void LoadData(OpenedFile primaryDataFile, byte[] formatFileData, DefaultDataManager manager, IViewContent view)
//        {
//            IsErrorVisible = false;
//            this.dataFile = primaryDataFile;
//            if (document == null)
//                document = new DocfrmFormationDocument(this, view);
//            document.Load(CompilationService.Units[primaryDataFile].FileContent.Content, formatFileData, manager);
//            ShowDocument();
//        }

//        /// <exclude/>
//        protected override void OnPaint(PaintEventArgs e)
//        {
//            base.OnPaint(e);
//            panel.Invalidate();
//        }

//        /// <summary>
//        /// Text chybové hlášky
//        /// </summary>
//        string ErrorMessage
//        {
//            get { return errorMessageTextBox.Text; }
//            set { errorMessageTextBox.Text = value; }
//        }
//        void OnChanged(bool previousIsDirty)
//        {
//            if (previousIsDirty != dirty)
//                OnDirtyChanged();
//        }
//        void OnDirtyChanged()
//        {
//            if (DirtyChanged != null)
//                DirtyChanged(this, new EventArgs());
//        }
//        void ShowDocument()
//        {
//            if (errorVisible)
//                return;
         
//            if (panel.Document == null)
//                panel.Document = document;
            
//            panel.BringToFront();
//            panel.FindNextControl();
//        }
//        /// <summary>
//        /// This method is required for Windows Forms designer support.
//        /// Do not change the method contents inside the source code editor. The Forms designer might
//        /// not be able to load this method if it was changed manually.
//        /// </summary>
//        void InitializeComponent()
//        {
//            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(DocfrmContainerControl));
//            this.errorMessageTextBox = new System.Windows.Forms.RichTextBox();
//            this.SuspendLayout();
//            // 
//            // errorMessageTextBox
//            // 
//            resources.ApplyResources(this.errorMessageTextBox, "errorMessageTextBox");
//            this.errorMessageTextBox.Name = "errorMessageTextBox";
//            this.errorMessageTextBox.TabStop = false;
//            // 
//            // DocfrmContainerControl
//            // 
//            this.Controls.Add(this.errorMessageTextBox);
//            this.Name = "DocfrmContainerControl";
//            resources.ApplyResources(this, "$this");
//            this.ResumeLayout(false);

//        }

//        /// <summary>
//        /// aktualizace textu dle pohledu
//        /// </summary>
//        public void RefreshData()
//        {
//            panel.RefreshData();
//        }

//        /// <excluce/>
//        public void LoadData(OpenedFile primaryDataFile, byte[] fileData, byte[] formatFileData, DefaultDataManager manager)
//        {
//            throw new NotImplementedException();
//        }
//    }
//}
