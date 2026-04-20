//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DefaultFillerContainerControl.cs         </Name>
//    <Description> Výchozí ovladač obsahující stránky atd.                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-01                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Core;
using System.Drawing;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Výchozí ovladač obsahující stránky atd.
    /// </summary>
    public class DefaultFillerContainerControl : UserControl, IControlView
    {
        #region IControlView
        /// <summary>
        /// indikuje změnu obsahu
        /// </summary>
        public event EventHandler DirtyChanged;

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
        /// Primární soubor sestavy
        /// </summary>
        public OpenedFile PrimaryFile { get { return dataFile; } }
        /// <summary>
        /// Indikuje, že je zobrazená chybová hláška.
        /// </summary>
        public bool IsErrorVisible
        {
            get { return errorVisible; }
            set
            {
                errorVisible = value;
                if (value)
                {
                    errorMessageTextBox.BringToFront();
                    errorMessageTextBox.TabStop = true;
                }
                else
                {
                    errorMessageTextBox.SendToBack();
                    errorMessageTextBox.TabStop = false;
                }
            }
        }
        /// <summary>
        /// grafika pro výpočty
        /// </summary>
        public Graphics ComputeGraphics { get { return panel?.ComputeGraphics; } set { if (panel != null) panel.ComputeGraphics = value; } }
        /// <summary>
        /// kolekce stránek ovladače
        /// </summary>
        public IPages Pages { get { return panel?.Pages; } }
        /// <summary>
        /// hodnota zvětšení
        /// </summary>
        public float Zoom { get { return panel == null ? 1 : panel.Zoom; } }
        /// <summary>
        /// služba grafiky
        /// </summary>
        public IGraphicSettingService GSS { get { return panel?.GSS; } set { if (panel != null) panel.GSS = value; } }

        /// <summary>
        /// struktura vázané sestavy
        /// </summary>
        public GFEStructure Structure { get { return panel?.Structure; } }
        /// <summary>
        /// zobrazení chybové hlášky
        /// </summary>
        /// <param name="message">text chybové hlášky</param>
        public void ShowErrorMessage(string message)
        {
            ErrorMessage = message;
            IsErrorVisible = true;
        }
        /// <summary>
        /// aktualizace dat dle pohledu
        /// </summary>
        public void RefreshData()
        {
            panel.RefreshData();
        }
        /// <summary>
        /// Načtení dat formuláře.
        /// </summary>
        /// <param name="primaryDataFile">primární datový soubor</param>
        /// <param name="fileData">Obsah primárních dat</param>
        /// <param name="formatFile">Format sestavy</param>
        /// <param name="manager">Správce dat</param>
        public void LoadData(OpenedFile primaryDataFile, byte[] fileData, OpenedFile formatFile, DefaultDataManager manager)
        {
            IsErrorVisible = false;
            this.dataFile = primaryDataFile;

            try
            {
                panel.ReloadData(fileData, formatFile, manager, null);

//                //test!
//#if DEBUG
//                if (Structure != null)
//                    foreach (var t in Structure.Templates)
//                    {
//                        var tt = t.Instantiate(panel.gfeFormat);
//                        foreach (var tti in tt)
//                        {
//                            tti.Dispose();
//                        }
//                    }
//#endif

            }
            catch (Gordic.Report.Interface.GUnsafeRepWrapper.GrrException ex) { ShowErrorMessage(ex.Message); }
        }
        #endregion

        /// <summary>
        /// Ovladač
        /// </summary>
        public object Control { get { return IsErrorVisible ? errorMessageTextBox as Control : panel; } }

        /// <summary>
        /// Text chybové hlášky
        /// </summary>
        string ErrorMessage
        {
            get { return errorMessageTextBox.Text; }
            set { errorMessageTextBox.Text = value; }
        }

        bool dirty, errorVisible;
        OpenedFile dataFile;
        RichTextBox errorMessageTextBox;
        FillerPagePanel panel;

        private DefaultFillerContainerControl()
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
        /// <param name="view">primární pohled na data </param>
        public DefaultFillerContainerControl(IViewContent view)
            : this()
        {
            panel = new FillerPagePanel(view) { Dock = DockStyle.Fill };
            panel.Parent = this;
            Controls.Add(panel);
            Dock = DockStyle.Fill;
        }

        /// <summary>
        /// This method is required for Windows Forms designer support.
        /// Do not change the method contents inside the source code editor. The Forms designer might
        /// not be able to load this method if it was changed manually.
        /// </summary>
        void InitializeComponent()
        {
            this.errorMessageTextBox = new System.Windows.Forms.RichTextBox();
            this.SuspendLayout();
            // 
            // errorMessageTextBox
            // 
            this.errorMessageTextBox.Dock = System.Windows.Forms.DockStyle.Fill;
            this.errorMessageTextBox.Location = new System.Drawing.Point(0, 0);
            this.errorMessageTextBox.Name = "errorMessageTextBox";
            this.errorMessageTextBox.Size = new System.Drawing.Size(375, 326);
            this.errorMessageTextBox.TabIndex = 0;
            this.errorMessageTextBox.TabStop = false;
            this.errorMessageTextBox.Text = "";
            // 
            // RtfOfficeContainerControl
            // 
            this.Controls.Add(this.errorMessageTextBox);
            this.Name = "ContainerControl";
            this.Size = new System.Drawing.Size(562, 326);
            this.ResumeLayout(false);
        }

        /// <exclude/>
        protected override void OnCreateControl()
        {
            base.OnCreateControl();
            ShowDocument();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (errorMessageTextBox != null)
                    errorMessageTextBox.Dispose();

                if (panel != null)
                    panel.Dispose();

                if (Control is IDisposable)
                    (Control as IDisposable).Dispose();
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
        void ShowDocument()
        {
            if (errorVisible)
                return;
            panel.BringToFront();
            //zde nevolat FindNextControl nebo podobne metody. Pokud by vyvolali skripty (napr. pres ziskani hodnoty) tak by mohlo dojit k prekresleni behem cekani na skript a tim opet vyvolani skriptu atp.
        }
    }
}
