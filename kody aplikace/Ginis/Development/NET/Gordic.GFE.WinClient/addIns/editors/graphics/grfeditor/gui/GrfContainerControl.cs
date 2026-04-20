//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ContainerControl.cs                      </Name>
//    <Description> Pomocná třída pro zobrazení GRF obsahu                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.GrfEditor;
using System.Drawing;
using Gordic.GFE.Parsers.Dom;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Pomocná třída pro zobrazení GRF obsahu
    /// </summary>
    class GrfContainerControl : UserControl, IGrfDocumentView, IMementoCapable
    {
        #region IGrfDocumentView
        /// <summary>
        /// grafika pro výpočty
        /// </summary>
        public Graphics ComputeGraphics { get { return panel?.ComputeGraphics; } set { if (panel != null) panel.ComputeGraphics = value; } }
        /// <summary>
        /// struktura vázané sestavy
        /// </summary>
        public GFEStructure Structure { get { return panel?.Structure; } }
        /// <summary>
        /// služba grafiky
        /// </summary>
        public IGraphicSettingService GSS { get { return panel?.GSS; } set { if (panel != null) panel.GSS = value; } }
        /// <summary>
        /// hodnota zvětšení
        /// </summary>
        public float Zoom { get { return panel != null ? panel.Zoom : 1; } }
        /// <summary>
        /// kolekce stránek ovladače
        /// </summary>
        public IPages Pages { get { return panel?.Pages; } }

        /// <summary>
        /// Dokument ovladače
        /// </summary>
        public GrfFormationDocument Document { get; private set; }
        /// <summary>
        /// Primární soubor sestavy
        /// </summary>
        public OpenedFile PrimaryFile { get { return PrimaryFile1; } }
        /// <summary>
        /// Indikuje nutnost uložení dokumentu
        /// </summary>
        public bool IsDirty
        {
            get { return dirty; }
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
            get { return errorVisible; }
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
        /// Zobrazení chybové zprávy
        /// </summary>
        /// <param name="message">zpráva k zobrazení</param>
        public void ShowErrorMessage(string message)
        {
            ErrorMessage = message;
            IsErrorVisible = true;
        }
        /// <summary>
        /// Ovladač, na kterém probíhá kreslení
        /// </summary>
        public object Control { get { return panel; } }
        #endregion

        #region IMementoCapable
        /// <exclude/>
        public Property CreateMemento()
        {
            Property property = new Property();
            if (Document != null
                && Document.Pages != null
                && Document.Pages.Count != 0)
            {
                List<int> colors = new List<int>();
                List<string> images = new List<string>();
                List<bool> showbacks = new List<bool>();
                List<ImageStretch> stretchs = new List<ImageStretch>();
                //string resolution = string.Empty;
                foreach (IPage page in Document.Pages)
                {
                    if (page.BackColor != null)
                        colors.Add(page.BackColor.Color.ToArgb());
                    images.Add(page.BackImage != null && page.BackImage.Image != null ? ImageService.SetTempBackImage(page.BackImage.Image, page.BackImage.ImageFile) : ImageService.SetTempBackImage(null, ""));
                    showbacks.Add(page.ShowBackground);
                    stretchs.Add(page.BackImageStretch);
                    //if (string.IsNullOrEmpty(resolution))
                    //    resolution = (page as GrfPage).Resolution.Value;
                }

                property.Set("colors", colors);
                property.Set("images", images);
                property.Set("showback", showbacks);
                property.Set("stretchs", stretchs);
                //property.Set("page_resolution", resolution);
            }
            else return null;
            return property;
        }

        /// <exclude/>
        public void SetMemento(Property memento)
        {
            if (Document == null || Document.Pages == null)
                return;

            //List<int> colors = memento.Get("colors", new List<int>());
            List<string> images = memento.Get("images", new List<string>());
            List<bool> showbacks = memento.Get("showback", new List<bool>());
            List<ImageStretch> stretchs = memento.Get("stretchs", new List<ImageStretch>());
            //string page_resolution = memento.Get("page_resolution", ReportDesignerProperties.Instance.Resolution.Value);
            int index = 0;
            foreach (IPage page in Document.Pages)
            {
                if (images.Count > index)
                    page.BackImage = new BackgroundImage(ImageService.GetTempBackImage(images[index], true), images[index]);
                if (showbacks.Count > index)
                    page.ShowBackground = showbacks[index];
                if (stretchs.Count > index)
                    page.BackImageStretch = stretchs[index];
                //(page as GrfPage).Resolution = new Parsers.Utils.SizeValue(page_resolution);
                index++;
            }
        }
        #endregion

        /// <exclude/>
        protected override void Dispose(bool disposing)
        {
            if (disposing && Document != null)
                Document.Dispose();
            base.Dispose(disposing);
        }

        /// <summary>
        /// obsah byl pozměněn
        /// </summary>
        public event EventHandler DirtyChanged;

        bool dirty, errorVisible;

        RichTextBox errMessTextBox;
        GrfPagePanel panel;

        private GrfContainerControl()
        {
            InitializeComponent();
            GotFocus += delegate
            {
                if (this.Controls.Count != 0 && this.ContainsFocus)
                    this.Controls[0].Focus();
            };
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public GrfContainerControl(IViewContent view)
            : this()
        {
            panel = new GrfPagePanel(view) { Dock = DockStyle.Fill };
            Controls.Add(panel);
        }

        /// <summary>
        /// Zobrazí zadaný XML jako strom.
        /// </summary>
        /// <param name="primaryFile">primární soubor sestavy</param>
        public void LoadXml(OpenedFile primaryFile)
        {
            UndoRedoService.FlushHistory();
            IsErrorVisible = false;
            this.PrimaryFile1 = primaryFile;
            if (Document == null)
                Document = new GrfFormationDocument(this);

            Document.Load(CompilationService.Units[primaryFile].FileContent.Content);
            ShowDocument();
        }

        /// <exclude/>
        protected override void OnPaint(PaintEventArgs e)
        {
            base.OnPaint(e);
            panel.Invalidate();
        }

        /// <summary>
        /// Vložení objektů ze zásobníku na stránku
        /// </summary>
        internal void Paste() { panel.Paste(); }

        /// <summary>
        /// Text chybové hlášky
        /// </summary>
        string ErrorMessage
        {
            get => errMessTextBox.Text;
            set { errMessTextBox.Text = value; }
        }

        public OpenedFile PrimaryFile1 { get => PrimaryFile2; set => PrimaryFile2 = value; }
        public OpenedFile PrimaryFile2 { get; set; }

        void OnChanged(bool previousIsDirty)
        {
            if (previousIsDirty != dirty)
                OnDirtyChanged();
        }
        void OnDirtyChanged()
        {
            DirtyChanged?.Invoke(this, new EventArgs());
        }
        void ShowDocument()
        {
            if (errorVisible)
                return;

            if (panel.Document == null)
                panel.Document = Document;

            panel.BringToFront();
            panel.Focus();
        }
        /// <summary>
        /// This method is required for Windows Forms designer support.
        /// Do not change the method contents inside the source code editor. The Forms designer might
        /// not be able to load this method if it was changed manually.
        /// </summary>
        void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(GrfContainerControl));
            this.errMessTextBox = new System.Windows.Forms.RichTextBox();
            this.SuspendLayout();
            // 
            // errMessTextBox
            // 
            resources.ApplyResources(this.errMessTextBox, "errMessTextBox");
            this.errMessTextBox.Name = "errMessTextBox";
            this.errMessTextBox.TabStop = false;
            // 
            // GrfContainerControl
            // 
            this.Controls.Add(this.errMessTextBox);
            this.Name = "GrfContainerControl";
            resources.ApplyResources(this, "$this");
            this.ResumeLayout(false);

        }

        /// <exclude/>
        internal void RefreshByStructure()
        {
            Document?.RefreshByStructure();
        }

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
