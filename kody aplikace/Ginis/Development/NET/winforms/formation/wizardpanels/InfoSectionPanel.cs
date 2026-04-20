//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.InfoSectionPanel.cs                    </Name>
//    <Description> Panel pro zjištění sekce Info                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Windows.Forms;
using Gordic.General;
using Gordic.General.ApplicationInterface;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Internal.Templates;
using Gordic.GFE.WinClient.StructureView;
using Gordic.Report.Client;
using Gordic.Report.Interface;
using Gordic.WinForms.Controls;
using Gordic.WinForms.DbControls;

namespace Gordic.GFE.WinClient.FormationWizard
{
    /// <summary>
    /// Panel pro zjištění sekce Info
    /// </summary>
    class InfoSectionPanel : AbstractWizardPanel
    {
        ErrorProvider errorProvider;

        bool initDone;
        private DataGridView dgvCustomParameters;
        private DataGridViewTextBoxColumn clmnKey;
        private DataGridViewTextBoxColumn clmnValue;
        private ComboBox cbSelection;
        Property customizer;

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public InfoSectionPanel()
        {	
			InitializeComponent();
            errorProvider = new ErrorProvider
            {
                ContainerControl = this
            };
            Init();
            base.VisibleChanged += new EventHandler(ChangedEvent);
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
                case DialogMessage.next:
                    UpdateInfo();
                    this.EnableFinish = true;
                    break;
                case DialogMessage.finish:
                    UpdateInfo();
                    if (string.IsNullOrEmpty(NextWizardPanelID))
                        FinishPanel();
                    break;
                default:
                    break;
            }
            
            return true;
        }
        /// <exclude/>
        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);
            tbFileStructure.TextChanged += delegate { UpdateError(); };
            tbFileStructure.KeyUp += OnKeyUp;
            gvParts.GroupOperationRowsChanged += delegate { GoOn(); };
            this.tbIxsTyp.ValueChanged += delegate { GoOn(); };
            btnFileStructure.Click += BtnFileStructure_Click;
            dgvCustomParameters.Resize += DgvCustomParameters_Resize;
            dgvCustomParameters.CellEndEdit += CellEndEdit;
            dgvCustomParameters.ColumnWidthChanged += new System.Windows.Forms.DataGridViewColumnEventHandler(this.DgvCustomParameters_ColumnWidthChanged);
            DgvCustomParameters_ColumnWidthChanged(null, null);
            cbSelection.SelectedIndexChanged += CbSelection_SelectedIndexChanged;
            cbSelection.SelectedIndex = 0;
        }

        Label lblFileStructure;
        TextBox tbFileStructure;
        Button btnFileStructure;
        GroupBox gbFile;
        GroupBox gbSections;

        GroupBox gbDocFrmSection;
        GDataGridView gvParts;
        GTbDataSslstyp tbIxsTyp;
        string fileName;

        /// <summary>
        /// Inicializace komponent
        /// </summary>
        void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(InfoSectionPanel));
            this.lblFileStructure = new System.Windows.Forms.Label();
            this.btnFileStructure = new System.Windows.Forms.Button();
            this.tbFileStructure = new System.Windows.Forms.TextBox();
            this.gbFile = new System.Windows.Forms.GroupBox();
            this.gbSections = new System.Windows.Forms.GroupBox();
            this.dgvCustomParameters = new System.Windows.Forms.DataGridView();
            this.clmnKey = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.clmnValue = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.gbDocFrmSection = new System.Windows.Forms.GroupBox();
            this.tbIxsTyp = new Gordic.WinForms.DbControls.GTbDataSslstyp();
            this.gvParts = new Gordic.WinForms.Controls.GDataGridView();
            this.cbSelection = new System.Windows.Forms.ComboBox();
            this.gbFile.SuspendLayout();
            this.gbSections.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvCustomParameters)).BeginInit();
            this.gbDocFrmSection.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.gvParts)).BeginInit();
            this.SuspendLayout();
            // 
            // lblFileStructure
            // 
            resources.ApplyResources(this.lblFileStructure, "lblFileStructure");
            this.lblFileStructure.Name = "lblFileStructure";
            // 
            // btnFileStructure
            // 
            resources.ApplyResources(this.btnFileStructure, "btnFileStructure");
            this.btnFileStructure.Name = "btnFileStructure";
            // 
            // tbFileStructure
            // 
            resources.ApplyResources(this.tbFileStructure, "tbFileStructure");
            this.tbFileStructure.Name = "tbFileStructure";
            // 
            // gbFile
            // 
            resources.ApplyResources(this.gbFile, "gbFile");
            this.gbFile.Controls.Add(this.lblFileStructure);
            this.gbFile.Controls.Add(this.tbFileStructure);
            this.gbFile.Controls.Add(this.btnFileStructure);
            this.gbFile.Name = "gbFile";
            this.gbFile.TabStop = false;
            // 
            // gbSections
            // 
            resources.ApplyResources(this.gbSections, "gbSections");
            this.gbSections.Controls.Add(this.dgvCustomParameters);
            this.gbSections.Name = "gbSections";
            this.gbSections.TabStop = false;
            // 
            // dgvCustomParameters
            // 
            resources.ApplyResources(this.dgvCustomParameters, "dgvCustomParameters");
            this.dgvCustomParameters.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgvCustomParameters.ColumnHeadersVisible = false;
            this.dgvCustomParameters.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.clmnKey,
            this.clmnValue});
            this.dgvCustomParameters.Name = "dgvCustomParameters";
            // 
            // clmnKey
            // 
            this.clmnKey.Frozen = true;
            resources.ApplyResources(this.clmnKey, "clmnKey");
            this.clmnKey.Name = "clmnKey";
            // 
            // clmnValue
            // 
            this.clmnValue.Frozen = true;
            resources.ApplyResources(this.clmnValue, "clmnValue");
            this.clmnValue.Name = "clmnValue";
            // 
            // gbDocFrmSection
            // 
            resources.ApplyResources(this.gbDocFrmSection, "gbDocFrmSection");
            this.gbDocFrmSection.Controls.Add(this.tbIxsTyp);
            this.gbDocFrmSection.Controls.Add(this.gvParts);
            this.gbDocFrmSection.Name = "gbDocFrmSection";
            this.gbDocFrmSection.TabStop = false;
            // 
            // tbIxsTyp
            // 
            resources.ApplyResources(this.tbIxsTyp, "tbIxsTyp");
            this.tbIxsTyp.Name = "tbIxsTyp";
            // 
            // gvParts
            // 
            resources.ApplyResources(this.gvParts, "gvParts");
            this.gvParts.FitColumnsToClientArea = true;
            this.gvParts.MultiSelect = true;
            this.gvParts.Name = "gvParts";
            // 
            // cbSelection
            // 
            resources.ApplyResources(this.cbSelection, "cbSelection");
            this.cbSelection.FormattingEnabled = true;
            this.cbSelection.Items.AddRange(new object[] {
            resources.GetString("cbSelection.Items"),
            resources.GetString("cbSelection.Items1"),
            resources.GetString("cbSelection.Items2")});
            this.cbSelection.Name = "cbSelection";
            // 
            // InfoSectionPanel
            // 
            this.Controls.Add(this.cbSelection);
            this.Controls.Add(this.gbFile);
            this.Controls.Add(this.gbDocFrmSection);
            this.Controls.Add(this.gbSections);
            this.Name = "InfoSectionPanel";
            resources.ApplyResources(this, "$this");
            this.gbFile.ResumeLayout(false);
            this.gbFile.PerformLayout();
            this.gbSections.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.dgvCustomParameters)).EndInit();
            this.gbDocFrmSection.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.gvParts)).EndInit();
            this.ResumeLayout(false);

        }
        void CbSelection_SelectedIndexChanged(object sender, EventArgs e)
        {
            gbFile.Visible = cbSelection.SelectedIndex == 0;
            gbSections.Visible = cbSelection.SelectedIndex == 1;
            gbDocFrmSection.Visible = cbSelection.SelectedIndex == 2;

            if (cbSelection.SelectedIndex != 0)
            {
                if (cbSelection.SelectedIndex == 2)
                {
                    LoadData();
                    gvParts.Enabled = tbIxsTyp.Enabled = ReportDesignerMain.Current.IsAuthorized;
                }
                UpdateError();
            }
        }
        void CellEndEdit(object sender, DataGridViewCellEventArgs e)
        {
            if (string.IsNullOrEmpty(Convert.ToString(dgvCustomParameters.Rows[e.RowIndex].Cells[0].Value)))
                MessageService.ShowError(GResources.GetResourceText(29450341)); //RC 29450341 : Klíč nesmí být prázdná hodnota!
            else
                UpdateInfoParameters();
        }
        void DgvCustomParameters_ColumnWidthChanged(object sender, DataGridViewColumnEventArgs e)
        {
            dgvCustomParameters.Columns[1].Width = (int)dgvCustomParameters.Width - dgvCustomParameters.Columns[0].Width - dgvCustomParameters.RowHeadersWidth;
        }
        void DgvCustomParameters_Resize(object sender, EventArgs e)
        {
            dgvCustomParameters.Columns[0].Width = (int)(dgvCustomParameters.Width - dgvCustomParameters.RowHeadersWidth) / 2;
        }
        void OnKeyUp(object sender, KeyEventArgs e)
        {
            if (e.KeyValue == 13)
            {
                fileName = tbFileStructure.Text;
                UpdateStructureInfo();
            }
        }
        void BtnFileStructure_Click(object sender, EventArgs e)
        {
            OpenFileDialog l_oVyberSoubor = new OpenFileDialog();
            if (!string.IsNullOrEmpty(tbFileStructure.Text))
                if (Directory.Exists(tbFileStructure.Text))
                    l_oVyberSoubor.InitialDirectory = tbFileStructure.Text;

            string[] fileFilters = (string[])(AddInTree.GetTreeNode("/ReportDesigner/Desktop/OpenStructureFilter").BuildChildItems(null)).ToArray(typeof(string));
            l_oVyberSoubor.Filter = String.Join("|", fileFilters);
            l_oVyberSoubor.ShowDialog();
            if (!string.IsNullOrEmpty(l_oVyberSoubor.FileName))
            {
                fileName = l_oVyberSoubor.FileName;
                UpdateStructureInfo();
            }
        }
        void SectionPanelFinishPanelRequested(object sender, EventArgs e)
        {
            FileTemplate ft = (FileTemplate)customizer.Get("Template");
            NewFileDialog fd = (NewFileDialog)customizer.Get("Creator");

            if (ft != null)
            {
                string template = cbSelection.SelectedIndex == 2 ? "DOCFRM" : "GRF";

                FileDescriptionTemplate newfile = ft.FileDescriptionTemplates.Count != 1
                    ? ft.FileDescriptionTemplates.FirstOrDefault(templ => templ.Template.Equals(template, StringComparison.InvariantCultureIgnoreCase))
                    : ft.FileDescriptionTemplates.First();

                if (newfile != null)
                {
                    //foreach (FileDescriptionTemplate newfile in ft.FileDescriptionTemplates)
                    if (!NewFileDialog.IsFilenameAvailable(StringParser.Parse(newfile.Name)))
                    {
                        MessageService.ShowErrorFormatted(GResources.GetResourceText(29450498) + " {0} " + GResources.GetResourceText(29450497) + '\n' + GResources.GetResourceText(29450599), StringParser.Parse(newfile.Name)); //RC 29450498 : Název souboru
                        return;
                    }

                    //foreach (FileDescriptionTemplate newfile in ft.FileDescriptionTemplates)
                    if (newfile.ContentData != null)
                        fd.SaveFile(newfile, null, newfile.ContentData);
                    else
                        fd.SaveFile(newfile, newfile.Content, null);
                }
            }
        }
        void Init()
        {
            fileName = DataService.StructureFileName;
            if (string.IsNullOrEmpty(fileName) && StructureViewPad.Instance.ActiveItem != null)
                fileName = StructureViewPad.Instance.ActiveItem.FileName;

            UpdateStructureInfo();

            initDone = true;
            FinishPanelRequested += SectionPanelFinishPanelRequested;
        }
        void UpdateStructureInfo()
        {
            if (!string.IsNullOrEmpty(fileName) && File.Exists(fileName))
            {
                tbFileStructure.Text = fileName;
                StructureViewEntry structureView = StructureViewEntry.GetOrCreate(fileName);
                if (structureView.Structure != null)
                {
                    dgvCustomParameters.Rows.Clear();
                    //ixs_xme="0000ALX0AZD0" xmeta_ver="1" xmeta_subver_min="1"
                    dgvCustomParameters.Rows.Add("ixs_xme", structureView.Structure.StructureID);
                    dgvCustomParameters.Rows.Add("xmeta_ver", structureView.Structure.StructureVersionMajor);
                    dgvCustomParameters.Rows.Add("xmeta_subver_min", structureView.Structure.StructureVersionMinor);
                }
                else
                    MessageService.ShowWarningFormatted(GResources.GetResourceText(29450246) + " '{0}' " + GResources.GetResourceText(29450601) + ' ' + GResources.GetResourceText(29450600), fileName); //RC 29450246 : Struktura
            }
            UpdateError();
        }
        void UpdateError()
        {
            if (!gbDocFrmSection.Visible)
            {
                if (!gbSections.Visible && (string.IsNullOrEmpty(tbFileStructure.Text) || !File.Exists(tbFileStructure.Text)))
                    errorProvider.SetError(tbFileStructure, GResources.GetResourceText(29450602)); //RC 29450602 : Název souboru je neplatný!
                else errorProvider.Clear();
            }
            GoOn();
        }
        void GoOn()
        {
            if (initDone &&
                (cbSelection.SelectedIndex == 1 || string.IsNullOrEmpty(errorProvider.GetError(tbFileStructure))))
                EnableFinish = string.IsNullOrEmpty(errorProvider.GetError(tbFileStructure));/*Wizard.ActivePanelNumber == Wizard.WizardPanels.Count - 1*/
            else if (initDone && cbSelection.SelectedIndex == 2)
                base.EnableFinish = tbIxsTyp.Valid && gvParts.GroupOperationRowsCount > 0;
            else
                EnableFinish = false;

            base.EnableNext = !this.IsLastPanel;
        }
        void ChangedEvent(object sender, EventArgs e)
        {
            if (initDone)
            {
                if (customizer == null)
                    customizer = (Property)base.CustomizationObject;

                IsLastPanel = Wizard.WizardPanels.Count == 1;

                GoOn();
            }
        }

        #region DOCFRM
        /// <summary>
        /// vybrany ixs_typ
        /// </summary>
        public GString IxsTyp { get { return tbIxsTyp.IxsTyp; } }

        void LoadData()
        {
            try
            {
                if (!ReportDesignerMain.Current.IsAuthorized)
                    ReportDesignerMain.Current.Initialize();
                if (!ReportDesignerMain.Current.IsAuthorized)
                    return;

                Gordic.Report.Client.GReaderGinsxme xme = new Gordic.Report.Client.GReaderGinsxme(ReportDesignerMain.Current);
                var x = xme.ReadData(new GFilter<FilterGinsxme>(FilterGinsxme.nazev, OperatorEnum.Like, new GString("DOCFORM")));
                foreach (GGinsxmeDataSet.SeznamRow r in x)
                    if (r.nazev.BaseValue.StartsWith("DOCFORM:"))
                        r.nazev = r.nazev.BaseValue.Substring("DOCFORM:".Length);

                var vlaRow = x.AddSeznamRow(ReportDesignerProperties.Instance.DocfrmWflVla, GResources.GetResourceText(29450603), 100, "", DateTime.Now, "", 1, 1); //RC 29450603 : Vlastnosti

                gvParts.DataSource = x;
                gvParts.FormatGrid(CreateGridFormat());

                var wflRow = x.FindByixs_xme(ReportDesignerProperties.Instance.DocfrmWflIxsXme); //part:wfl
                if (wflRow != null)
                {
                    gvParts.CheckRow(wflRow);
                    gvParts.DisableRow(wflRow);
                }

                if (vlaRow != null)
                    gvParts.CheckRow(vlaRow);
            }
            catch (Exception ex) { MessageService.ShowError(ex); }
        }
        GGridFormat CreateGridFormat()
        {
            GGridFormat gf = new GGridFormat();
            gf.AddStringColumn("nazev", GResources.GetResourceText(29450028), 200); //RC 29450028 : Název
            return gf;
        }
        void UpdateInfo()
        {
            if (!gbDocFrmSection.Visible)
            {
                if (!gbSections.Visible && !string.IsNullOrEmpty(tbFileStructure.Text))
                    DataService.StructureFileName = tbFileStructure.Text;

                UpdateInfoParameters();
            }
            else
            {
#if !zDEBUG
                GTempFile xmeFile = new GTempFile();
                xmeFile.SaveStream(GetXme());

                TemporaryService.RegisterFile(xmeFile);
                DataService.StructureFileName = xmeFile.Path;
#else
            DataService.StructureFileName = @"N:\Ginis\467\dev\net\Sestavy\00000AWm.xme";
#endif
                var Parts = GetParts();

                if (!string.IsNullOrEmpty(DataService.StructureFileName))
                {
                    StructureViewEntry structureView = StructureViewEntry.GetOrCreate(DataService.StructureFileName);
                    StringParser.Properties["Struct_IXS_XME"] = structureView.Structure.StructureID;
                    StringParser.Properties["Struct_VersionMajor"] = Convert.ToString(structureView.Structure.StructureVersionMajor);
                    StringParser.Properties["Struct_VersionMinor"] = Convert.ToString(structureView.Structure.StructureVersionMinor);
                    StringParser.Properties["StructureParts"] = string.Join(",", Parts);
                    StringParser.Properties["StructureIxsType"] = IxsTyp;

                    StringParser.Properties["StructureNazev"] = ReportDesignerProperties.Instance.DocfrmStructureName;
                    StringParser.Properties["StructurePoznamka"] = ReportDesignerProperties.Instance.DocfrmStructureNote;
                    StringParser.Properties["Struct_IXS_ALV"] = ReportDesignerProperties.Instance.DocfrmStructureIxsAlv;
                    StringParser.Properties["StructureRokmesOd"] = ReportDesignerProperties.Instance.DocfrmStructureDateFrom;
                    StringParser.Properties["StructureRokmesDo"] = ReportDesignerProperties.Instance.DocfrmStructureDateTo;
                    StringParser.Properties["StructureFormVyst"] = ReportDesignerProperties.Instance.DocfrmStructureFormationOutput;
                }
            }
        }

        void UpdateInfoParameters()
        {
            StringParser.Properties["Structure_Parameters"] = string.Empty;

            List<string> keys = StringParser.Properties.Keys.Select(itm => itm.StartsWith("Structure_Item_") ? itm : null)
                .Distinct()
                .ToList()
                .FindAll(itm => itm != null);
            if (keys.Count != 0)
                foreach (var item in keys)
                    StringParser.Properties.Remove(item);

            int index = 0;
            foreach (DataGridViewRow row in dgvCustomParameters.Rows)
                if (Convert.ToString(row.Cells[0].Value).Equals("ixs_xme"))
                    StringParser.Properties["Struct_IXS_XME"] = Convert.ToString(row.Cells[1].Value);//tbStructureId.Text;
                else if (Convert.ToString(row.Cells[0].Value).Equals("xmeta_ver"))
                    StringParser.Properties["Struct_VersionMajor"] = Convert.ToString(row.Cells[1].Value);//tbVersionMajor.Text;
                else if (Convert.ToString(row.Cells[0].Value).Equals("xmeta_subver_min"))
                    StringParser.Properties["Struct_VersionMinor"] = Convert.ToString(row.Cells[1].Value);//tbVersionMinor.Text;
                else if (!string.IsNullOrEmpty(Convert.ToString(row.Cells[0].Value)))
                {
                    StringParser.Properties["Structure_Parameters"] += Convert.ToString(row.Cells[0].Value) + "=\"${" + string.Format("Structure_Item_{0}", index) + "}\" ";
                    StringParser.Properties[string.Format("Structure_Item_{0}", index)] = Convert.ToString(row.Cells[1].Value);
                    index++;
                }
            if (index != 0)
                StringParser.Properties["Structure_Parameters"] = StringParser.Properties["Structure_Parameters"].Trim();
        }
        /// <summary>
        /// Xme
        /// </summary>
        Stream GetXme()
        {
            var ixsParts = new string[gvParts.GroupOperationRowsCount];
            int i = 0;
            foreach (GGinsxmeDataSet.SeznamRow r in gvParts.GroupOperationRows)
                ixsParts[i++] = r.ixs_xme;
            return GetXme(ixsParts);
        }
        Stream GetXme(string[] ixsParts)
        {
            try { return new GDocFormStructure(ReportDesignerMain.Current).GetXme(ixsParts); }
            catch(Exception ex) {
                MessageService.ShowError(ex);
                return null; }
        }
        string[] GetParts()
        {
            string[] p = new string[gvParts.GroupOperationRowsCount];
            int i = 0;
            foreach (GGinsxmeDataSet.SeznamRow r in gvParts.GroupOperationRows)
            {
                var s = r.ixs_xme;
                //if (s.StartsWith("DOCFORM:")) s = s.Substring("DOCFORM:".Length).TrimStart();
                p[i++] = s;
            }
            return p;
        }
        #endregion
    }
}
