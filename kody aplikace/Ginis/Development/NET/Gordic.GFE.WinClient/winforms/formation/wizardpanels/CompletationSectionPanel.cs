//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.CompletationSectionPanel.cs            </Name>
//    <Description> Kompletace souborů formuláře                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;
using System.IO;
using System.Windows.Forms;
using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Internal.Templates;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.StructureView;

namespace Gordic.GFE.WinClient.FormationWizard
{
    /// <summary>
    /// Kompletace souborů formuláře
    /// </summary>
    class CompletationSectionPanel : AbstractWizardPanel
    {
        ErrorProvider errorProvider;
        bool initDone;
        Property customizer;
        string xmeFileName, alfFileName, zipFileName, dataFileName;

        GroupBox gbFormation;
        Label lbStructure;
        TextBox tbStructure;
        Button btnStructure;
        CheckBox cbStructure;

        Label lbFormation;
        TextBox tbFormation;
        Button btnFormation;
        CheckBox cbFormation;

        GroupBox gbData;
        Label lbData;
        TextBox tbData;
        Button btnData;

        GroupBox gbDatabase;
        Button btnDatabase;
        PictureBox pbDatabase;
        CheckBox cbDatabase;

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public CompletationSectionPanel()
        {	
			InitializeComponent();
			errorProvider = new ErrorProvider();
			errorProvider.ContainerControl = this;
			init();
            base.VisibleChanged += new EventHandler(changedEvent);
		}

        /// <summary>
        /// Přetížení kvůli ukončení průvodce s parametrem Finish
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public override bool ReceiveDialogMessage(DialogMessage message)
        {
            switch (message)
            {
                case DialogMessage.finish:
                    updateInfo();
                    updateFiles();
                    FinishPanel();
                    break;
                default:
                    break;
            }

            return true;
        }

        bool DatabaseFormatIsValid { get; set; }

        /// <summary>
        /// Inicializace komponent
        /// </summary>
        void InitializeComponent()
        {
            //Properties.Resources.Icons__Gin__stav_overeni_negativni, 
            //            Properties.Resources.Icons__Gin__stav_overeni_pozitivni
            gbFormation = new GroupBox();
            lbStructure = new Label();
            tbStructure = new TextBox();
            btnStructure = new Button();
            cbStructure = new CheckBox();

            lbFormation = new Label();
            tbFormation = new TextBox();
            btnFormation = new Button();
            cbFormation = new CheckBox();

            gbData = new GroupBox();
            lbData = new Label();
            tbData = new TextBox();
            btnData = new Button();

            gbDatabase = new GroupBox();
            cbDatabase = new CheckBox();
            pbDatabase = new PictureBox();
            btnDatabase = new Button();

            this.SuspendLayout();
            gbFormation.SuspendLayout();
            //
            // gbFormation
            //
            gbFormation.Size = new Size(140, 120);
            gbFormation.Location = new Point(5, 5);
            gbFormation.Anchor = AnchorStyles.Left | AnchorStyles.Right | AnchorStyles.Top;
            //
            // lbStructure
            //
            lbStructure.Location = new Point(6, 11);
            lbStructure.Name = "lblFileStructure";
            lbStructure.Size = new Size(128, 14);
            lbStructure.Text = GResources.GetResourceText(29450588) + ":"; //RC 29450588 : soubor struktury dat
            //
            // tbStructure
            //
            tbStructure.Location = new Point(8, 30);
            tbStructure.Name = "btnFileStructure";
            tbStructure.Size = new Size(1, 24);
            tbStructure.Anchor = AnchorStyles.Left | AnchorStyles.Right | AnchorStyles.Top;
            tbStructure.TabIndex = 1;
            tbStructure.KeyUp += new KeyEventHandler((sender, e) =>
            {
                if (e.KeyValue == 13)
                {
                    xmeFileName = tbStructure.Text;
                    updateError();
                }
            });
            tbStructure.TextChanged += delegate { xmeFileName = tbStructure.Text; updateError(); };
            //
            // tbFileStructure
            //
            btnStructure.Location = new Point(14, 27);
            btnStructure.Name = "btnFileStructure";
            btnStructure.Size = new Size(30, 24);
            btnStructure.Text = "...";
            btnStructure.Anchor = AnchorStyles.Right | AnchorStyles.Top;
            btnStructure.TabIndex = 2;
            btnStructure.Click += btnStructure_Click;
            //
            // cbStructure
            //
            cbStructure.Location = new Point(52, 27);
            cbStructure.Name = "cbActiveStructure";
            cbStructure.Size = new Size(80, 24);
            cbStructure.Text = GResources.GetResourceText(29450589); //RC 29450589 : aktuální
            cbStructure.TabIndex = 3;
            cbStructure.CheckedChanged += delegate { tbStructure.Enabled = !cbStructure.Checked; };
            cbStructure.Enabled = SimpleDesktop.Desktop.ActiveViewContent is IStructureHost && (SimpleDesktop.Desktop.ActiveViewContent as IStructureHost).StructureEntry != null;
            cbStructure.Anchor = AnchorStyles.Right | AnchorStyles.Top;
            //
            // lbFormation
            //
            lbFormation.Location = new Point(6, 60);
            lbFormation.Name = "lbFormation";
            lbFormation.Size = new Size(128, 14);
            lbFormation.Text = GResources.GetResourceText(29450590) + ":"; //RC 29450590 : soubor sestavy
            //
            // tbFormation
            //
            tbFormation.Location = new Point(8, 79);
            tbFormation.Name = "tbFormation";
            tbFormation.Size = new Size(1, 24);
            tbFormation.Anchor = AnchorStyles.Left | AnchorStyles.Right | AnchorStyles.Top;
            tbFormation.TabIndex = 3;
            tbFormation.KeyUp += new KeyEventHandler((sender, e) =>
                {
                    if (e.KeyValue == 13)
                    {
                        alfFileName = tbFormation.Text;
                        setZipFileName();
                        updateError();
                    }
                });
            tbFormation.TextChanged += delegate { alfFileName = tbFormation.Text; updateError(); };
            //
            // btnFormation
            //
            btnFormation.Location = new Point(14, 76);
            btnFormation.Name = "btnFormation";
            btnFormation.Size = new Size(30, 24);
            btnFormation.Text = "...";
            btnFormation.Anchor = AnchorStyles.Right | AnchorStyles.Top;
            btnFormation.TabIndex = 4;
            btnFormation.Click += btnFormationClick;
            //
            // cbFormation
            //
            cbFormation.Location = new Point(52, 79);
            cbFormation.Name = "cbFormation";
            cbFormation.Size = new Size(80, 24);
            cbFormation.Text = GResources.GetResourceText(29450589); //RC 29450589 : aktuální
            cbFormation.TabIndex = 5;
            cbFormation.CheckedChanged += delegate { tbFormation.Enabled = !cbFormation.Checked; };
            cbFormation.Anchor = AnchorStyles.Right | AnchorStyles.Top;

            gbFormation.Controls.AddRange(new Control[] { 
                lbStructure, tbStructure, btnStructure, cbStructure,
                lbFormation, tbFormation, btnFormation, cbFormation,
                lbData, tbData, btnData
            });
            gbFormation.ResumeLayout(false);

            gbData.SuspendLayout();
            //
            // gbData
            //
            gbData.Size = new Size(140, 60);
            gbData.Location = new Point(5, 130);
            gbData.Anchor = AnchorStyles.Left | AnchorStyles.Right | AnchorStyles.Top;
            //
            // lbData
            //
            lbData.Location = new Point(6, 11);
            lbData.Name = "lbData";
            lbData.Size = new Size(138, 14);
            lbData.Text = GResources.GetResourceText(29450591) + ":"; //RC 29450591 : soubor dat
            //
            // tbData
            //
            tbData.Location = new Point(8, 30);
            tbData.Name = "tbData";
            tbData.Size = new Size(86, 24);
            tbData.Anchor = AnchorStyles.Left | AnchorStyles.Right | AnchorStyles.Top;
            tbData.TabIndex = 3;
            tbData.KeyUp += new KeyEventHandler((sender, e) =>
            {
                if (e.KeyValue == 13)
                {
                    dataFileName = tbData.Text;
                    updateError();
                }
            });
            tbData.TextChanged += delegate { dataFileName = tbData.Text; updateError(); };

            //
            // btnData
            //
            btnData.Location = new Point(102, 27);
            btnData.Name = "btnData";
            btnData.Size = new Size(30, 24);
            btnData.Text = "...";
            btnData.Anchor = AnchorStyles.Right | AnchorStyles.Top;
            btnData.TabIndex = 4;
            btnData.Click += btnData_Click;

            gbData.Controls.AddRange(new Control[] { 
                lbData, tbData, btnData
            });
            gbData.ResumeLayout(false);


            this.gbDatabase.SuspendLayout();
            // 
            // gbDatabase
            // 
            this.gbDatabase.Controls.AddRange(new Control[] { btnDatabase, pbDatabase, cbDatabase });
            this.gbDatabase.Location = new Point(5, 190);
            this.gbDatabase.Name = "gbDatabase";
            this.gbDatabase.Size = new System.Drawing.Size(140, 38);
            this.gbDatabase.TabIndex = 5;
            this.gbDatabase.TabStop = false;
            gbDatabase.Anchor = AnchorStyles.Left | AnchorStyles.Right | AnchorStyles.Top;
            // 
            // cbDatabase
            // 
            this.cbDatabase.AutoSize = true;
            this.cbDatabase.Location = new Point(7, 13);
            this.cbDatabase.Name = "cbDatabase";
            this.cbDatabase.Size = new System.Drawing.Size(70, 17);
            this.cbDatabase.TabIndex = 6;
            this.cbDatabase.Text = GResources.GetResourceText(29450592); //RC 29450592 : databáze
            cbDatabase.CheckedChanged += cbDatabaseCheckedChanged;
            this.cbDatabase.UseVisualStyleBackColor = true;
            // 
            // pbDatabase
            // 
            this.pbDatabase.Location = new System.Drawing.Point(179, 8);
            this.pbDatabase.Name = "pbDatabase";
            this.pbDatabase.Size = new System.Drawing.Size(27, 27);
            this.pbDatabase.TabIndex = 7;
            this.pbDatabase.TabStop = false;
            // 
            // btnDatabase
            // 
            this.btnDatabase.Location = new System.Drawing.Point(83, 8);
            this.btnDatabase.Name = "btnDatabase";
            this.btnDatabase.Size = new System.Drawing.Size(90, 23);
            this.btnDatabase.TabIndex = 8;
            this.btnDatabase.Text = GResources.GetResourceText(29450593); //RC 29450593 : načíst soubory
            this.btnDatabase.UseVisualStyleBackColor = true;
            btnDatabase.Enabled = false;
            btnDatabase.Click += btnDatabase_Click;
            this.gbDatabase.ResumeLayout(false);

            this.Controls.AddRange(new Control[] { gbFormation, gbData, gbDatabase });

            this.ResumeLayout(false);
        }
        /// <summary>
        /// Nastaví název archivu
        /// </summary>
        void setZipFileName()
        {
            if (!string.IsNullOrEmpty(alfFileName) && File.Exists(alfFileName) && File.Exists(Path.ChangeExtension(alfFileName, ".zip")))
                zipFileName = Path.ChangeExtension(alfFileName, ".zip");
        }
        void btnDatabase_Click(object sender, EventArgs e)
        {
            ReportDesignerMain.Current.Initialize();
            //DefaultDesktop.Instance.LabelModule = DefaultDesktop.Instance.LabelModule;
            if (ReportDesignerMain.Current.IsAuthorized)
            {
                PropertyDialog frm = new PropertyDialog() { PropertiesDefalut = "Dialog.DBImport" };
                CDbImportTab import = new CDbImportTab() { Dock = DockStyle.Fill };
                import.AcceptEvent += new EventHandler(frm.AcceptEvent);
                import.AfterTempSaveEvent += importAfterTempSaveEvent;
                frm.AddControl(import);
                frm.ShowDialog();
            }
        }
        void importAfterTempSaveEvent(params string[] parameters)
        {
            xmeFileName = parameters[0];
            alfFileName = parameters[1];
            zipFileName = parameters[2];
            if (FileUtility.TestFileExists(alfFileName))
                Gordic.GFE.WinClient.Services.FileAgent.OpenFile(alfFileName);
        }
        void cbDatabaseCheckedChanged(object sender, EventArgs e)
        {
            btnDatabase.Enabled = pbDatabase.Enabled = cbDatabase.Checked;
            pbDatabase.Image = DatabaseFormatIsValid ? Properties.Resources.Icons__Gin__stav_overeni_pozitivni : Properties.Resources.Icons__Gin__stav_overeni_negativni;
        }
        void btnFormationClick(object sender, EventArgs e)
        {
            tbFormation.Text = LocalCommonService.GetFormationFileName(tbFormation.Text);
            updateError();
        }
        void btnData_Click(object sender, EventArgs e)
        {
            OpenFileDialog l_oVyberSoubor = new OpenFileDialog();
            if (!string.IsNullOrEmpty(tbData.Text))
                if (Directory.Exists(tbData.Text))
                    l_oVyberSoubor.InitialDirectory = tbData.Text;

            string[] fileFilters = (string[])(AddInTree.GetTreeNode("/ReportDesigner/Desktop/OpenDataFilter").BuildChildItems(null)).ToArray(typeof(string));
            l_oVyberSoubor.Filter = String.Join("|", fileFilters);
            l_oVyberSoubor.ShowDialog();
            if (!string.IsNullOrEmpty(l_oVyberSoubor.FileName))
                tbData.Text = l_oVyberSoubor.FileName;
            updateError();
        }
        void btnStructure_Click(object sender, EventArgs e)
        {
            tbStructure.Text = LocalCommonService.GetStructureFileName(tbStructure.Text);
            updateError();
        }
        void updateError()
        {
            if (!cbStructure.Checked && !string.IsNullOrEmpty(tbStructure.Text) && !File.Exists(tbStructure.Text))
                errorProvider.SetError(tbStructure, GResources.GetResourceText(29450594)); //RC 29450594 : Název souboru struktury není platný!
            else errorProvider.SetError(tbStructure, "");

            if (!cbFormation.Checked && (string.IsNullOrEmpty(tbFormation.Text) || !File.Exists(tbFormation.Text)))
                errorProvider.SetError(tbFormation, GResources.GetResourceText(29450595)); //RC 29450595 : Název souboru sestavy není platný!
            else errorProvider.SetError(tbFormation, "");

            if (!string.IsNullOrEmpty(tbData.Text) && !File.Exists(tbData.Text))
                errorProvider.SetError(tbData, GResources.GetResourceText(29450596)); //RC 29450596 : Název souboru dat není platný!
            else errorProvider.SetError(tbData, "");

            goOn();
        }
        void changedEvent(object sender, EventArgs e)
        {
            if (initDone)
            {
                if (customizer == null)
                    customizer = (Property)base.CustomizationObject;

                goOn();
            }
        }
        void goOn()
        {
            base.EnableNext = false;
            EnableFinish = true;
                //initDone
                //&& (!string.IsNullOrEmpty(alfFileName) && File.Exists(alfFileName) || cbStructure.Checked);
        }
        void init()
        {
            initDone = true;
            FinishPanelRequested += sectionPanelFinishPanelRequested;
            updateError();
        }
        void sectionPanelFinishPanelRequested(object sender, EventArgs e)
        {
            SaveFileDialog l_oVyberSoubor = new SaveFileDialog();
            if (!string.IsNullOrEmpty(tbFormation.Text))
                if (Directory.Exists(tbFormation.Text))
                    l_oVyberSoubor.InitialDirectory = tbFormation.Text;

            FileTemplate ft = (FileTemplate)customizer.Get("Template");
            string parsedFileName = StringParser.Parse(ft.DefaultName);

            string[] fileFilters = (string[])(AddInTree.GetTreeNode("/ReportDesigner/Desktop/SaveGfrmFilter").BuildChildItems(null)).ToArray(typeof(string));
            l_oVyberSoubor.Filter = String.Join("|", fileFilters);
            l_oVyberSoubor.FileName = parsedFileName;
            if (l_oVyberSoubor.ShowDialog() == DialogResult.OK)
            {
                bool existsZip = false;
                if (!string.IsNullOrEmpty(l_oVyberSoubor.FileName))
                {
                    if (!string.IsNullOrEmpty(alfFileName) && File.Exists(alfFileName))
                    {
                        GZip.Zip(alfFileName, l_oVyberSoubor.FileName);
                        existsZip = true;
                    }
                    if (!string.IsNullOrEmpty(xmeFileName) && File.Exists(xmeFileName))
                        if (existsZip)
                            GZip.ZipAdd(xmeFileName, l_oVyberSoubor.FileName);
                        else
                        {
                            GZip.Zip(xmeFileName, l_oVyberSoubor.FileName);
                            existsZip = true;
                        }

                    if (!string.IsNullOrEmpty(zipFileName) && File.Exists(zipFileName))
                        if (existsZip)
                            GZip.ZipAdd(zipFileName, l_oVyberSoubor.FileName);
                        else
                        {
                            GZip.Zip(zipFileName, l_oVyberSoubor.FileName);
                            existsZip = true;
                        }

                    if (!string.IsNullOrEmpty(dataFileName) && File.Exists(dataFileName))
                        if (existsZip)
                            GZip.ZipAdd(dataFileName, l_oVyberSoubor.FileName);
                        else
                            GZip.Zip(dataFileName, l_oVyberSoubor.FileName);

                    if (FileUtility.TestFileExists(l_oVyberSoubor.FileName))
                        ProjectService.LoadSolutionOrProject(l_oVyberSoubor.FileName);
                    else
                        MessageService.ShowErrorFormatted(string.Join(" ", GResources.GetResourceText(29450374), "'{0}'", GResources.GetResourceText(29450597)), l_oVyberSoubor.FileName); //RC 29450374 : Sestavení
                }
            }
        }
        void updateFiles()
        {
            GFETempDir dir = new GFETempDir();

            // pokud soubor dán, pak generujeme datový soubor
            if (string.IsNullOrEmpty(dataFileName) || !File.Exists(dataFileName))
            {
                // případ prázdných dat
                dataFileName = Path.Combine(dir.Path, "Data.xml");

                FileTemplate ft = (FileTemplate)customizer.Get("Template");
                string parsedContent = string.Empty;

                foreach (FileDescriptionTemplate newfile in ft.FileDescriptionTemplates)
                    if (newfile.Language.Equals("xml", StringComparison.InvariantCultureIgnoreCase)
                        || newfile.Language.Equals("tmp", StringComparison.InvariantCultureIgnoreCase))
                    {
                        parsedContent = StringParser.Parse(StringParser.Parse(newfile.Content));
                        break;
                    }
                using (StreamWriter writer = File.CreateText(dataFileName))
                {
                    writer.Write(parsedContent);
                }
            }
            else if (!string.IsNullOrEmpty(dataFileName) && File.Exists(dataFileName))
            {
                string sourceDataFileName = dataFileName;
                dataFileName = FileUtility.Combine(dir.Path, Path.GetFileName(dataFileName));
                File.Copy(sourceDataFileName, dataFileName);
            }
            
            // strukturá není ze souboru
            if (cbStructure.Checked)
                try
                {
                    string sourceStructureFileName = (SimpleDesktop.Desktop.ActiveContent as IStructureHost).StructureEntry.FileName;
                    if (!string.IsNullOrEmpty(sourceStructureFileName))
                    {
                        xmeFileName = FileUtility.Combine(dir.Path, Path.GetFileName(sourceStructureFileName));
                        File.Copy(sourceStructureFileName, xmeFileName);
                    }
                }
                catch { }
            else
            // structura ze souboru
            {
            }

            // sestava není ze souboru ale aktuální (nemusí být uložená)
            if (cbFormation.Checked)
                try
                {
                    alfFileName = !string.IsNullOrEmpty(SimpleDesktop.Desktop.ActiveViewContent.PrimaryFileName)
                        ? FileUtility.Combine(dir.Path, Path.GetFileName(SimpleDesktop.Desktop.ActiveViewContent.PrimaryFileName))
                        : FileUtility.Combine(dir.Path, "Formation.alf");
                    SimpleDesktop.Desktop.ActiveViewContent.PrimaryFile.SaveTempToDisk(alfFileName);
                    setZipFileName();
                }
                catch { }
        }
        void updateInfo()
        {
            if (SimpleDesktop.Desktop.ActiveContent is IStructureHandler)
            {
                StringParser.Properties["Struct_IXS_XME"] = (SimpleDesktop.Desktop.ActiveContent as IStructureHandler).StructureView.Structure.StructureID;
                StringParser.Properties["Struct_VersionMajor"] = (SimpleDesktop.Desktop.ActiveContent as IStructureHandler).StructureView.Structure.StructureVersionMajor.ToString();
                StringParser.Properties["Struct_VersionMinor"] = (SimpleDesktop.Desktop.ActiveContent as IStructureHandler).StructureView.Structure.StructureVersionMinor.ToString();
            }
        }
    }
}
