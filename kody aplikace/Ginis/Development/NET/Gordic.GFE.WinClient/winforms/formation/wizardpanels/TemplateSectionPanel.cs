//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.TemplateSectionPanel.cs                </Name>
//    <Description> Panel průvodce na výběr šablony sestavy RTF                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;
using System.IO;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Internal.Templates;
using Gordic.General;
using System.Collections.Generic;

namespace Gordic.GFE.WinClient.FormationWizard
{
    /// <summary>
    /// Panel průvodce na výběr šablony sestavy RTF
    /// </summary>
    class TemplateSectionPanel : AbstractWizardPanel
    {
        ErrorProvider errorProvider;

        Dictionary<string, string> file_filters = new Dictionary<string, string>()
        {
            { "oxs", "/ReportDesigner/Desktop/OpenTemplateFilterOXS" },
            { "mse", "/ReportDesigner/Desktop/OpenTemplateFilterMSE" },
            { "rtf", "/ReportDesigner/Desktop/OpenTemplateFilter" }
        };

        bool initDone;
        Property customizer;
        /// <summary>
        /// přetížení kvůli tlačítku NEXT
        /// </summary>
        public override bool EnableNext { get => base.EnableNext || cbDefaultTemplate.Checked; set => base.EnableNext = value; }
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public TemplateSectionPanel()
        {
            InitializeComponent();
            errorProvider = new ErrorProvider
            {
                ContainerControl = this
            };
            CustomizationObjectChanged += ChangedEvent;
            base.VisibleChanged += new EventHandler(ChangedEvent);
            Init();
        }

        void Init()
        {
            fileName = DataService.TemplateFileName;
            initDone = true;
            FinishPanelRequested += SectionPanelFinishPanelRequested;
            UpdateError();
            if (string.IsNullOrEmpty(DataService.TemplateFileName))
                cbDefaultTemplate.Checked = true;
        }
        void ChangedEvent(object sender, EventArgs e)
        {
            if (initDone)
            {
                if (customizer == null)
                    customizer = (Property)base.CustomizationObject;

                GoOn();
            }
        }
        void UpdateTemplate()
        {
            if (cbDefaultTemplate.Checked)
            {
                FileTemplate ft = (FileTemplate)customizer.Get("Template");
                if (ft != null && ft.FileDescriptionTemplates.Count > 0)
                {
                    DataService.TemplateType = ft.FileDescriptionTemplates[0].Language;
                    switch (ft.FileDescriptionTemplates[0].Language)
                    {
                        case "RTF":
                            StringParser.Properties["TemplateFileName"] = "sablona.doc";
                            break;
                        case "MSE":
                            StringParser.Properties["TemplateFileName"] = "sablona.xls";
                            break;
                        case "OXS":
                            StringParser.Properties["TemplateFileName"] = "sablona.xlsx";
                            break;
                        default:
                            break;
                    }
                }
                DataService.TemplateFileName = null;
            }
            else if (!string.IsNullOrEmpty(tbFile.Text))
            {
                DataService.TemplateFileName = tbFile.Text;
                if (info != null)
                    StringParser.Properties["TemplateFileName"] = info.Name;
            }
        }
        void GoOn()
        {
            if (initDone && (string.IsNullOrEmpty(errorProvider.GetError(tbFile))))
            {
                base.EnableFinish = cbDefaultTemplate.Checked || (!string.IsNullOrEmpty(fileName) && File.Exists(fileName));
                base.EnableNext = !string.IsNullOrEmpty(NextWizardPanelID);
            }
            else
                base.EnableNext = base.EnableFinish = false;
        }

        Label lblFile;
        TextBox tbFile;
        Button btnFile;
        GroupBox gbFile;
        CheckBox cbDefaultTemplate;
        FileInfo info;
        string fileName;

        /// <summary>
        /// Přetížení kvůli ukončení průvodce s parametrem Finish
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public override bool ReceiveDialogMessage(DialogMessage message)
        {
            switch (message)
            {
                case DialogMessage.next:
                    UpdateTemplate();
                    base.EnableFinish = true;
                    break;
                case DialogMessage.finish:
                    UpdateTemplate();
                    if (string.IsNullOrEmpty(NextWizardPanelID))
                        FinishPanel();
                    break;
                default:
                    break;
            }

            return true;
        }

        void SectionPanelFinishPanelRequested(object sender, EventArgs e)
        {
            FileTemplate ft = (FileTemplate)customizer.Get("Template");
            NewFileDialog fd = (NewFileDialog)customizer.Get("Creator");

            if (ft != null)
            {
                foreach (FileDescriptionTemplate newfile in ft.FileDescriptionTemplates)
                    if (!NewFileDialog.IsFilenameAvailable(StringParser.Parse(newfile.Name)))
                    {
                        MessageService.ShowErrorFormatted(GResources.GetResourceText(29450498) + " {0} " + GResources.GetResourceText(29450497) + '\n' + GResources.GetResourceText(29450599), StringParser.Parse(newfile.Name)); //RC 29450498 : Název souboru
                        return;
                    }

                foreach (FileDescriptionTemplate newfile in ft.FileDescriptionTemplates)
                    fd.SaveFile(newfile, newfile.ContentData == null ? newfile.Content : null, newfile.ContentData);
            }
        }
        /// <summary>
        /// Inicializace komponent
        /// </summary>
        void InitializeComponent()
        {
            lblFile = new Label();
            btnFile = new Button();
            tbFile = new TextBox();
            gbFile = new GroupBox();
            cbDefaultTemplate = new CheckBox();
            this.SuspendLayout();
            //
            // gbFile
            //
            gbFile.Size = new Size(420, 60);
            gbFile.Location = new Point(5, 5);
            //
            // lblFileStructure
            //
            lblFile.Location = new Point(6, 11);
            lblFile.Name = "lblFile";
            lblFile.Size = new Size(150, 14);
            lblFile.Text = GResources.GetResourceText(29451521) + ":";
            //
            // btnFileStructure
            //
            tbFile.Location = new Point(8, 30);
            tbFile.Name = "tbFile";
            tbFile.Size = new Size(375, 24);
            tbFile.Anchor = AnchorStyles.Left | AnchorStyles.Right | AnchorStyles.Top;
            tbFile.TabIndex = 1;
            tbFile.KeyUp += OnKeyUp;
            tbFile.TextChanged += delegate { UpdateError(); };

            //
            // tbFileStructure
            //
            btnFile.Location = new Point(385, 27);
            btnFile.Name = "btnFile";
            btnFile.Size = new Size(30, 24);
            btnFile.Text = "...";
            btnFile.Anchor = AnchorStyles.Right | AnchorStyles.Top;
            btnFile.TabIndex = 2;
            btnFile.Click += BtnFileClick;
            gbFile.Controls.AddRange(new Control[] { lblFile, tbFile, btnFile });

            //
            // cbDefaultTemplate
            //
            cbDefaultTemplate.Location = new Point(5, 70);
            cbDefaultTemplate.Text = GResources.GetResourceText(29450604); //RC 29450604 : prázdná šablona
            cbDefaultTemplate.CheckedChanged += delegate { UpdateError(); tbFile.Enabled = !cbDefaultTemplate.Checked; };

            this.Controls.AddRange(new Control[] { gbFile, cbDefaultTemplate });

            this.ResumeLayout(false);

        }
        void OnKeyUp(object sender, KeyEventArgs e)
        {
            if (e.KeyValue == 13)
            {
                fileName = tbFile.Text;
                UpdateTemplateInfo();
            }
        }
        void BtnFileClick(object sender, EventArgs e)
        {
            // získáme popis šablony
            FileTemplate ft = (FileTemplate)customizer.Get("Template");

            OpenFileDialog l_oVyberSoubor = new OpenFileDialog();
            if (!string.IsNullOrEmpty(tbFile.Text))
                if (Directory.Exists(tbFile.Text))
                    l_oVyberSoubor.InitialDirectory = tbFile.Text;

            string[] fileFilters = (string[])(AddInTree.GetTreeNode(file_filters[ft.Type.ToLower()]).BuildChildItems(null)).ToArray(typeof(string));
            l_oVyberSoubor.Filter = string.Join("|", fileFilters);
            l_oVyberSoubor.ShowDialog();
            if (!string.IsNullOrEmpty(l_oVyberSoubor.FileName))
            {
                fileName = l_oVyberSoubor.FileName;
                UpdateTemplateInfo();
            }
        }
        void UpdateTemplateInfo()
        {
            if (!string.IsNullOrEmpty(fileName) && File.Exists(fileName))
            {
                tbFile.Text = fileName;
                info = new FileInfo(fileName);
            }
            else info = null;
            UpdateError();
        }
        void UpdateError()
        {
            if (!cbDefaultTemplate.Checked && (string.IsNullOrEmpty(tbFile.Text) || !File.Exists(tbFile.Text)))
                errorProvider.SetError(tbFile, GResources.GetResourceText(29450602)); //RC 29450602 : Název souboru je neplatný!
            else errorProvider.Clear();
            GoOn();
        }

    }
}
