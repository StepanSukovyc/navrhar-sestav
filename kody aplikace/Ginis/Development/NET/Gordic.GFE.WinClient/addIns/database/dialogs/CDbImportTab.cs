//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.CDbImportTab.cs                        </Name>
//    <Description> Načtení sestav z databáze                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-06-25                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Windows.Forms;
using Gordic.General;
using Gordic.Report.Client;
using Gordic.General.ApplicationInterface;
using Gordic.Report.Interface;
using System.IO;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Database;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.Parsers.Core.Services;

namespace Gordic.GFE.WinClient
{
    /// <summary>
    /// Načtení sestav z databáze
    /// </summary>
    partial class CDbImportTab : UserControl, IDialogDefaultable, IMementoCapable
    {
        #region IDialogDefaultable
        bool cancel;
        /// <summary>
        /// stav načtení ovladače
        /// </summary>
        public bool Loading { get; set; }
        /// <summary>
        /// indikuje zrušení dialogu
        /// </summary>
        public bool Canceling { get; set; }

        /// <summary>
        /// Obsah
        /// </summary>
        public IViewContent Content { get; set; }

        /// <summary>
        /// Na ovladači proběhla změna
        /// </summary>
        public bool Change { get; set; }
        /// <summary>
        /// Titulek ovladače
        /// </summary>
        public string Title { get { return GResources.GetResourceText(29450027); } }  //RC 29450027 : Načtení formátu z databáze
        /// <summary>
        /// Reakce na akceptování nastavení
        /// </summary>
        public void Accept()
        {
            string l_ixsalv = gvList.CurrentDataRow["ixs_alv"].ToString();
            string l_ixsfrm = gvList.CurrentDataRow["ixs_frm"].ToString();
            if (!LoadFormation(l_ixsalv, l_ixsfrm))
                //    if (MessageService.AskQuestion("Přejete si vybrat jinou sestavu?"))
                cancel = true;
            else cancel = false;
            OnAccept();
        }

        /// <summary>
        /// Reakce na akceptování nastavení
        /// </summary>
        /// <param name="l_ixsalv"></param>
        /// <param name="l_ixsfrm"></param>
        public void Accept(string l_ixsalv, string l_ixsfrm)
        {
            if (!LoadFormation(l_ixsalv, l_ixsfrm))
                //    if (MessageService.AskQuestion("Přejete si vybrat jinou sestavu?")) //RC 29450443 : Přejete si vybrat jinou sestavu?
                cancel = true;
            else cancel = false;
            OnAccept();
        }

        void OnAccept()
        {
            AcceptEvent?.Invoke(this, EventArgs.Empty);
        }

        /// <summary>
        /// Reakce na zamitnutí nastavení
        /// </summary>
        public void Cancel() { cancel = true; }

        static internal string m_DbImport_LastStrUsed = null;

        bool okEnabled;

        Gordic.Report.Client.GReportList m_reps;
        /// <summary>
        /// Nastavení implicitních hodnot
        /// </summary>
        public void SetDefault()
        {
            m_reps = new Gordic.Report.Client.GReportList(DatabaseService.UserProcess);

            tbStrom.FilterAktivita = new GBaseFilter<GInt16>(new GInt16(100));
            tbStrom.FilterPrizRoot = new GBaseFilter<GInt16>(new GInt16(1));
            tbStrom.DependancyTema = tbTema;

            if (m_DbImport_LastStrUsed != null)
                tbStrom.SetValidData(m_DbImport_LastStrUsed);

            //GGridFormat gf = new GGridFormat();
            //var l_col1 = gf.AddStringColumn("nazev", GResources.GetResourceText(29450028), 400); //RC 29450028 : Název
            //l_col1.SelectImageCallBack = GetImage;
            //l_col1.CustomColumn = new Gordic.WinForms.Controls.GDataGridView.GDataGridViewGroupingColumn();

            ////gf.AddPictureColumn(24, GetImage);
            //gf.AddStringColumn("id_ses", GResources.GetResourceText(29450029), 80); //RC 29450029 : ID Sestavy
            //gf.AddStringColumn("ixs_alv", "ixs alv", 100).Visible = false;
            //gf.AddStringColumn("ixs_frm", "ixs frm", 100).Visible = false;
            //gf.AddStringColumn("ixs_str", "ixs str", 100).Visible = false;
            //gf.AddStringColumn("tema", GResources.GetResourceText(29450030), 150); //RC 29450030 : Téma
            //gf.AddStringColumn("rokmes_od", GResources.GetResourceText(29450031), 70); //RC 29450031 : Platnost od
            //gf.AddStringColumn("rokmes_do", GResources.GetResourceText(29450032), 70); //RC 29450032 : Platnost do
            //gvList.FormatGrid(gf);

            okEnabled = false;
            Change = false;
        }

        GImageColumnInfo GetImage(DataRow row, string currentColumnName)
        {
            string l_TypVyst = row["typ_vyst"].ToString().ToUpper();
            if (row["ixs_str"].ToString().Length > 0)
            {
                if (((GGroupingDataRow)row).IsExpanded)
                    return new GImageColumnInfo(WinFormsResourceService.GetBitmap("Icons__Gin__slozka_otevrena"));
                else
                    return new GImageColumnInfo(WinFormsResourceService.GetBitmap("Icons__Gin__slozka"));
            }
            if (row["ixs_frm"].ToString().Length > 0)
            {
                if (Enum.IsDefined(typeof(GFormatingGroup), l_TypVyst) == false)
                    return new GImageColumnInfo(WinFormsResourceService.GetBitmap("Icons__Gin__soubor_special"), l_TypVyst);
                GFormatingGroup l_ot = (GFormatingGroup)Enum.Parse(typeof(GFormatingGroup), l_TypVyst);
                switch (l_ot)
                {
                    case GFormatingGroup.MSE:
                        return new GImageColumnInfo(WinFormsResourceService.GetBitmap("Icons__Gin__soubor_xls"), l_TypVyst);
                    case GFormatingGroup.MSW:
                    case GFormatingGroup.RTF:
                        return new GImageColumnInfo(WinFormsResourceService.GetBitmap("Icons__Gin__soubor_doc"), l_TypVyst);
                    case GFormatingGroup.GRR:
                    case GFormatingGroup.GRF:
                        return new GImageColumnInfo(WinFormsResourceService.GetBitmap("Icons__Gin__soubor_gor"), l_TypVyst);
                    default:
                        return new GImageColumnInfo(WinFormsResourceService.GetBitmap("Icons__Gin__soubor_special"), l_TypVyst);
                }
            }
            if (GInt16.Parse(row["has_frm"]).BaseValue > 0)
            {
                if (((GGroupingDataRow)row).IsExpanded)
                    return new GImageColumnInfo(WinFormsResourceService.GetBitmap("Icons__Gin__slozka_otevrena_obsahujici"));
                else
                    return new GImageColumnInfo(WinFormsResourceService.GetBitmap("Icons__Gin__slozka_obsahujici"));
            }
            switch (l_TypVyst)
            {
                case "TXT":
                case "RTF":
                    return new GImageColumnInfo(WinFormsResourceService.GetBitmap("Icons__Gin__soubor_standard"));
                case "GXL":
                    return new GImageColumnInfo(WinFormsResourceService.GetBitmap("Icons__Gin__soubor_xls"));
                //case "DB":
                //case "BCH":
                default:
                    return new GImageColumnInfo(WinFormsResourceService.GetBitmap("Icons__Gin__soubor_special"));
            }
            //return null;
        }
        #endregion

        #region IMementoCapable
        /// <summary>
        /// uložení vlastnosti dialogového okna
        /// </summary>
        /// <returns></returns>
        public Property CreateMemento()
        {
            Property result = new Property();
            result.Set("columns", CreateMemColumns());
            result.Set("colors", CreateMemColors());
            return result;
        }

        Property CreateMemColors()
        {
            Property result = new Property();
            if (gvList.GridFormat != null)
            {
                result.Set("RowsColor", CreateMemColor(gvList.GridFormat.RowsColor));
                result.Set("AlternatingRowsColor", CreateMemColor(gvList.GridFormat.AlternatingRowsColor));
            }
            return result;
        }

        Property CreateMemColor(Color color)
        {
            Property result = new Property();
            result.Set("a", Convert.ToString(color.A));
            result.Set("r", Convert.ToString(color.R));
            result.Set("g", Convert.ToString(color.G));
            result.Set("b", Convert.ToString(color.B));
            return result;
        }

        Property CreateMemColumns()
        {
            Property result = new Property();

            if (gvList.GridFormat != null)
                foreach (var item in gvList.GridFormat.Columns)
                    result.Set(item.Name, CreateMemColumn(item));

            return result;
        }

        Property CreateMemColumn(GColumn item)
        {
            Property prop = new Property();
            prop.Set("displayName", item.Title);
            prop.Set("width", item.Width);
            prop.Set("visible", item.Visible);
            return prop;
        }

        private void SetMementoGf(Property memento, GGridFormat gf)
        {
            //gvList.AddAktivitaStyle();
            DataGridViewCellStyle dataGridViewCellStyle = new DataGridViewCellStyle();
            dataGridViewCellStyle.ForeColor = SystemColors.GrayText;
            dataGridViewCellStyle.Font = new Font(gvList.DefaultCellStyle.Font, FontStyle.Italic);
            gvList.RowsConditionalCellStyles.AddNegative("aktivita", dataGridViewCellStyle, (short)100);
            gvList.RowsConditionalCellStyles.AddNegative("aktivita_v", dataGridViewCellStyle, (short)100);

            gvList.FormatGrid(gf);
        }

        /// <summary>
        /// nastavení dialogového okna dle vlastností
        /// </summary>
        /// <param name="memento">vlastnosti dialogového okna</param>
        public void SetMemento(Property memento)
        {
            GGridFormat gf = new GGridFormat();
            if (memento != null && !memento.IsEmpty)
            {
                Property thisMemento = memento.Get(this.Name, new Property());

                if (!thisMemento.IsEmpty)
                {
                    SetDefaultMemColumns(thisMemento.Get("columns", new Property()), gf);
                    SetDefaultMemColors(thisMemento.Get("colors", new Property()), gf);
                    SetMementoGf(memento, gf);
                    return;
                }
            }

            SetDefaultMem(gf);
            SetMementoGf(memento, gf);
        }

        void SetDefaultMem(GGridFormat gf)
        {
            SetDefaultMemColumns(new Property(), gf);
        }
        void SetDefaultMemColors(Property mem, GGridFormat gf)
        {
            if (!mem.IsEmpty)
            {
                Property p = mem.Get("RowsColor", new Property());

                if (!p.IsEmpty)
                    gf.RowsColor = p.Get("a", "") == "0" ? Color.Empty :
                        Color.FromArgb(int.Parse(p.Get("a", "255"))
                        , int.Parse(p.Get("r", "0"))
                        , int.Parse(p.Get("g", "0"))
                        , int.Parse(p.Get("b", "0")));

                p = mem.Get("AlternatingRowsColor", new Property());
                if (!p.IsEmpty)
                    gf.AlternatingRowsColor = p.Get("a", "") == "0" ? Color.Empty :
                        Color.FromArgb(int.Parse(p.Get("a", "255"))
                        , int.Parse(p.Get("r", "0"))
                        , int.Parse(p.Get("g", "0"))
                        , int.Parse(p.Get("b", "0")));
            }
        }
        void SetDefaultMemColumns(Property mem, GGridFormat gf)
        {
            //if (mem.IsEmpty)
            {
                Dictionary<string, Property> props = new Dictionary<string, Property>
                {
                    { "nazev", mem.Get("nazev", new Property()) },

                    { "id_ses", mem.Get("id_ses", new Property()) },
                    { "ixs_alv", mem.Get("ixs_alv", new Property()) },
                    { "ixs_frm", mem.Get("ixs_frm", new Property()) },
                    { "ixs_str", mem.Get("ixs_str", new Property()) },
                    { "tema", mem.Get("tema", new Property()) },
                    { "rokmes_od", mem.Get("rokmes_od", new Property()) },
                    { "rokmes_do", mem.Get("rokmes_do", new Property()) },
                    { "typ_vyst", mem.Get("typ_vyst", new Property()) },
                    { "aktivita", mem.Get("aktivita", new Property()) },
                    { "aktivita_v", mem.Get("aktivita_v", new Property()) },
            };

                var l_col1 = gf.AddStringColumn("nazev",
                    props["nazev"].Get("displayName", GResources.GetResourceText(29450028)) //RC 29450028 : Název
                    , props["nazev"].Get("width", 400));

                l_col1.SelectImageCallBack = GetImage;
                l_col1.CustomColumn = new Gordic.WinForms.Controls.GDataGridView.GDataGridViewGroupingColumn();

                //gf.AddPictureColumn(24, GetImage);

                //gf.AddStringColumn("id_ses", GResources.GetResourceText(29450029), 80); //RC 29450029 : ID Sestavy
                gf.AddStringColumn("id_ses"
                    , props["id_ses"].Get("displayName", GResources.GetResourceText(29450029))
                    , props["id_ses"].Get("width", 80)).Visible = props["id_ses"].Get("visible", true);

                //gf.AddStringColumn("ixs_alv", "ixs alv", 100).Visible = false;
                gf.AddStringColumn("ixs_alv"
                    , props["ixs_alv"].Get("displayName", "ixs alv")
                    , props["ixs_alv"].Get("width", 100)).Visible = props["ixs_alv"].Get("visible", false);

                //gf.AddStringColumn("ixs_frm", "ixs frm", 100).Visible = false;
                gf.AddStringColumn("ixs_frm"
                    , props["ixs_frm"].Get("displayName", "ixs frm")
                    , props["ixs_frm"].Get("width", 100)).Visible = props["ixs_frm"].Get("visible", false);

                //gf.AddStringColumn("ixs_str", "ixs str", 100).Visible = false;
                gf.AddStringColumn("ixs_str"
                    , props["ixs_str"].Get("displayName", "ixs str")
                    , props["ixs_str"].Get("width", 100)).Visible = props["ixs_str"].Get("visible", false);

                //gf.AddStringColumn("tema", GResources.GetResourceText(29450030), 150); //RC 29450030 : Téma
                gf.AddStringColumn("tema"
                    , props["tema"].Get("displayName", GResources.GetResourceText(29450030))
                    , props["tema"].Get("width", 150)).Visible = props["tema"].Get("visible", true);

                //gf.AddStringColumn("rokmes_od", GResources.GetResourceText(29450031), 70); //RC 29450031 : Platnost od
                gf.AddStringColumn("rokmes_od"
                    , props["rokmes_od"].Get("displayName", GResources.GetResourceText(29450031))
                    , props["rokmes_od"].Get("width", 70)).Visible = props["rokmes_od"].Get("visible", true);

                //gf.AddStringColumn("rokmes_do", GResources.GetResourceText(29450032), 70); //RC 29450032 : Platnost do
                gf.AddStringColumn("rokmes_do"
                    , props["rokmes_do"].Get("displayName", GResources.GetResourceText(29450032))
                    , props["rokmes_do"].Get("width", 70)).Visible = props["rokmes_do"].Get("visible", true);

                gf.AddStringColumn("typ_vyst"
                    , props["typ_vyst"].Get("displayName", GResources.GetResourceText(21090004)) //RC 21090004 : Výstup
                    , props["typ_vyst"].Get("width", 100)).Visible = props["typ_vyst"].Get("visible", false);

                gf.AddLookupColumn("aktivita", "act", "aktivita", "aktivita_txt"
                    , props["aktivita"].Get("displayName", GResources.GetResourceText(21090006)) //RC 21090006 : Aktivita
                    , props["aktivita"].Get("width", 100)).Visible = props["aktivita"].Get("visible", false);

                gf.AddLookupColumn("aktivita_v", "act", "aktivita", "aktivita_txt"
                    , props["aktivita_v"].Get("displayName", GResources.GetResourceText(21090005)) //RC 21090005 : Aktivita vazby
                    , props["aktivita_v"].Get("width", 100)).Visible = props["aktivita_v"].Get("visible", false);
            }
            //else
            //    foreach (var item in mem.Elements)
            //        if (!string.IsNullOrEmpty(item))
            //        {
            //            Property prop = mem.Get(item, new Property());
            //            gf.AddStringColumn(item, prop.Get("displayName", "titulek"), prop.Get("width", 100)).Visible
            //                = prop.Get("visible", true);

            //            if (item.Equals("nazev"))
            //            {
            //                var l_col1 = gf.Columns.Last();
            //                l_col1.SelectImageCallBack = GetImage;
            //                l_col1.CustomColumn = new Gordic.WinForms.Controls.GDataGridView.GDataGridViewGroupingColumn();
            //            }
            //        }
        }
        #endregion

        /// <summary>
        /// Reakce na ukončení s akceptací změn
        /// </summary>
        public event EventHandler AcceptEvent;
        /// <summary>
        /// Volá se po uložení načtených souborů do dočasných složek
        /// </summary>
        public event EventHandlerParamArgument AfterTempSaveEvent;

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public CDbImportTab()
        {
            InitializeComponent();
        }

        bool LoadFormation(string l_ixsalv, string l_ixsfrm)
        {
            cancel = false;
            GReportIdentity l_report = new GReportIdentity(null, l_ixsalv, l_ixsfrm, false);

            try
            {
                Gordic.Report.Interface.IGReport rep =
                    Gordic.Report.WinClient.GReportViewerWin.Instance.GetReport(l_report,
                                                        Gordic.Report.Interface.GReportSource.DatabaseOnly, GEkoDate.Null, "");
                IGVisualRepresentation l_oVis = rep.VisualRepresentations[0];
                //0=alv,1=datak,2=xme	(alfy jsou ve visuals.memfiles)
                IGMemoryFile l_alf = (l_oVis as Gordic.Report.Interface.IGVisualRepresentationImpl).Files[0];
                IGMemoryFile l_zip = (l_oVis as Gordic.Report.Interface.IGVisualRepresentationImpl).Files[1];
                IGMemoryFile l_xme = null;
                if (l_ixsalv == "0000ALV056IT") //DOCFORM
                    l_xme = LoadDocFormXme(l_alf);
                if (l_xme == null)
                    l_xme = (rep as Gordic.Report.Interface.IGReportImplementation).Files[2];


                if (l_alf == null)
                {
                    string ixs = (l_oVis.LocalInfos["IXS_FRM"] ?? l_oVis.LocalInfos["NAME"]).ToString();
                    throw new GException(GResources.GetResourceText(29450033)); //RC 29450033 : Vybraný formát není k dispozici!
                }

                GFETempDir tempDir = new GFETempDir();
                string alfFileName = FileUtility.Combine(tempDir.Path, l_alf.FileName),
                    xmeFileName = l_xme != null ? FileUtility.Combine(tempDir.Path, l_xme.FileName) : null,
                    zipFileName = l_zip != null ? FileUtility.Combine(tempDir.Path, l_zip.FileName) : null;

                if (l_xme != null)
                    File.WriteAllBytes(xmeFileName, l_xme.ToArray());
                File.WriteAllBytes(alfFileName, l_alf.ToArray());
                if (l_zip != null)
                    File.WriteAllBytes(zipFileName, l_zip.ToArray());

                if (AfterTempSaveEvent != null)
                    AfterTempSaveEvent(xmeFileName, alfFileName, zipFileName, l_ixsalv, l_ixsfrm);
                else
                {
                    //IViewContent openContent = FileService.OpenFile(alfFileName, FileLoadStatus.database);
                    //openContent.PrimaryFile.Database = new DatabaseItem()
                    //{
                    //    IXSALV = l_ixsalv,
                    //    IXSFRM = l_ixsfrm
                    //};
                }
                return true;
            }
            catch (Exception ex)
            {
                ServiceManager.MessageService.ShowError(ex, GResources.GetResourceText(29450034)); //RC 29450034 : Chyba načtení formátu z databáze!
                return false;
            }
        }

        private IGMemoryFile LoadDocFormXme(IGMemoryFile alf)
        {
            string alffile;
            using (StreamReader r = new StreamReader(alf.ReadStream()))
                alffile = r.ReadToEnd();
            var i1 = alffile.IndexOf("parts");
            if (i1 < 0) return null;

            var i2 = alffile.IndexOf('"', i1);
            if (i2 < 0) return null;
            i2++;
            var i3 = alffile.IndexOf('"', i2);
            if (i3 < 0) return null;

            var ixsPart = alffile.Substring(i2, i3 - i2);
            var ixsParts = ixsPart.Split(',');

            try
            {
                using (Stream s = new GDocFormStructure(ReportDesignerMain.Current).GetXme(ixsParts))
                {
                    return new GMemoryFile(s) { FileName = "docform.xme" };
                }
            }
            catch { return null; }
        }

        bool m_needdata = true;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="e"></param>
        protected override void OnPaint(PaintEventArgs e)
        {
            if (m_needdata) LoadData();
            base.OnPaint(e);
        }

        void TbFaze_ValueChanged(object sender, EventArgs e)
        {
            if (tbFaze.Valid)
                m_reps.FilterFaze = new GBaseFilter<GString>(tbFaze.Value);
            else
                m_reps.FilterFaze = new GBaseFilter<GString>();
            Reload();
        }
        void TbTema_ValueChanged(object sender, EventArgs e)
        {
            if (tbTema.Valid)
                m_reps.FilterTema = new GBaseFilter<GString>(tbTema.Tema);
            else
                m_reps.FilterTema = new GBaseFilter<GString>();
            Reload();
        }
        void TbStrom_ValueChanged(object sender, EventArgs e)
        {
            chbFolders.Enabled = tbStrom.Valid;
            Reload();
        }
        void ChbGraphics_CheckedChanged(object sender, EventArgs e)
        {
            Reload();
        }
        void ChbFolders_CheckedChanged(object sender, EventArgs e)
        {
            TbStrom_ValueChanged(sender, e);
        }
        void GvList_CellDoubleClick(object sender, DataGridViewCellEventArgs e)
        {
            if (okEnabled)
            {
                Accept();
                if (!cancel && ParentForm is PropertyDialog)
                    (ParentForm as PropertyDialog).Close();
            }
            else if (gvList.CurrentDataRow is GGroupingDataRow)
                ((GGroupingDataRow)gvList.CurrentDataRow).Toggle();
        }
        void GvList_CurrentRowChanged(object sender, EventArgs e)
        {
            if (gvList.CurrentDataRow == null)
            {
                okEnabled = false;
                return;
            }
            string l_ixsfrm = gvList.CurrentDataRow["ixs_frm"].ToString();
            okEnabled = l_ixsfrm.Length > 0;
        }
        void TbStrom_FiltersChanged(object sender, EventArgs e)
        {
            if (tbStrom.Valid == false && tbTema.Valid == true)
                tbStrom.ValidateData();
        }
        void LoadData()
        {
            m_reps.FilterGraphics = new GValueFilter<GInt16>(new GInt16(chbGraphics.Checked ? 1 : 0));
            m_reps.FilterPodStrom = new GValueFilter<GString>();
            m_reps.FilterStrom = new GValueFilter<GString>();
            m_reps.FilterAktivita = new GBaseFilter<GInt16>(OperatorEnum.Less, new GInt16(900)); //new GBaseFilter<GInt16>(new GInt16(100));
            if (tbStrom.Valid)
            {
                if (chbFolders.Checked)
                    m_reps.FilterStrom = new GValueFilter<GString>(tbStrom.IxsStr);
                else
                    m_reps.FilterPodStrom = new GValueFilter<GString>(tbStrom.IxsStr);
            }

            GReportListDataSet.AlvDataTable l_data = m_reps.LoadReports();
            //l_data.PrimaryKey = new DataColumn[] { dt.Columns["ixs_alv"], dt.Columns["ixs_frm"] };

            for (int i = 0; i < l_data.Rows.Count; i++) //nelze foreach - menim kolekci (ConvertToGroup)
            {
                GReportListDataSet.AlvRow row = l_data.Rows[i];
                row.ixs_frm = ""; //defaultni format nebudu prezentovat
                row.ixs_str = ""; //slozka me nezajima
                if (row.has_frm)
                {
                    var g = row.ConvertToGroup();
                    g.BeforeExpand += new CancelEventHandler(Alv_BeforeExpand);
                }
            }

            if (chbFolders.Enabled && chbFolders.Checked) AddFolders(l_data, l_data.Rows.Untyped, null, tbStrom.IxsStr);
            l_data.AcceptChanges();

            var actTable = GEnum.GetValues(typeof(Gordic.Ginis.DbModel.GGincaktEnum)).OfType<Gordic.Ginis.DbModel.GGincaktEnum>().Select(e => e.Meta).ToList().ToDataTable();
            actTable.TableName = "act";
            l_data.DataSet.Tables.Add(actTable);

            gvList.DataSource = new GDataView(l_data);
            m_needdata = false;
        }
        void Reload()
        {
            m_needdata = true;
            Invalidate();
        }
        void Str_BeforeExpand(object sender, CancelEventArgs e)
        {
            var strnode = (sender as GGroupingDataRow);
            GString l_ixsstr = GString.Parse(strnode["ixs_str"]);

            //prvne pridam slozky
            AddFolders(gvList.DataTable, null, strnode, l_ixsstr);

            m_reps.FilterStrom = new GValueFilter<GString>(l_ixsstr);
            GReportListDataSet.AlvDataTable l_data = m_reps.LoadReports();

            for (int i = 0; i < l_data.Rows.Count; i++) //nelze foreach - menim kolekci (ConvertToGroup)
            {
                GReportListDataSet.AlvRow row = l_data.Rows[i];
                row.ixs_frm = ""; //defaultni format nebudu prezentovat
                row.ixs_str = ""; //slozka me nezajima
                if (row.has_frm)
                {
                    var g = GDataTable.NewGroupingRow(strnode.Table, row.ItemArray);
                    g.BeforeExpand += new CancelEventHandler(Alv_BeforeExpand);
                    strnode.Rows.Add(g);
                }
                else strnode.ImportRow(row);
            }

            strnode.BeforeExpand -= new CancelEventHandler(Str_BeforeExpand);
        }
        void AddFolders(DataTable t, DataRowCollection nodes, GGroupingDataRow strnode, GString l_ixsstr)
        {
            int l_index = 0;
            foreach (GReportListDataSet.StrRow str in m_reps.LoadFolders(l_ixsstr))
            {
                var g = GDataTable.NewGroupingRow(t);
                g["nazev"] = str.nazev;
                g["ixs_str"] = str.ixs_str;
                g.BeforeExpand += new CancelEventHandler(Str_BeforeExpand);
                if (nodes != null)
                    nodes.InsertAt(g, l_index++);
                else
                    strnode.Rows.Add(g);
            }
        }
        void Alv_BeforeExpand(object sender, CancelEventArgs e)
        {
            var g = (sender as GGroupingDataRow);
            GString l_ixsalv = GString.Parse(g["ixs_alv"]);
            GReportListDataSet.FrmDataTable formats = m_reps.LoadFormats(l_ixsalv);
            foreach (GReportListDataSet.FrmRow frm in formats)
            {
                //                DataRow r = g.Table.NewRow();
                GReportListDataSet.AlvRow r = (GReportListDataSet.AlvRow)g.Table.NewRow();
                r.ItemArray = g.ItemArray;
                r.ixs_frm = frm.ixs_frm;
                r.nazev = frm.nazev;
                r.typ_vyst = frm.format_skup;
                r.form_vyst = frm.form_vyst;
                r.rokmes_od = frm.rokmes_od;
                r.rokmes_do = frm.rokmes_do;
                r.aktivita = frm.aktivita;
                r.aktivita_v = frm.aktivita_v;
                r.rokmes_od_v = frm.rokmes_od_v;
                r.rokmes_do_v = frm.rokmes_do_v;
                r.poznamka = frm.poznamka;
                r.file_name = frm.file_name;
                r.dat_zmena = frm.dat_zmena;
                r.zmenu_prov = frm.zmenu_prov;
                r.zpus_uloz = frm.zpus_uloz;
                r.priz_zmeny = frm.priz_zmeny;
                //r.filtr_frm = frm.filtr_frm;
                r.k_v = frm.k_v;
                r.primy_tisk = frm.primy_tisk;

                g.Rows.Add(r);
            }
            g.BeforeExpand -= new CancelEventHandler(Alv_BeforeExpand);
        }

        private void aOpenALV_Start(object sender, EventArgs e)
        {
            string l_ixsalv = gvList.CurrentDataRow["ixs_alv"].ToString();
            if (l_ixsalv.Length == 12)
            {
                PropertyDialog frm = new PropertyDialog()
                {
                    PropertiesDefalut = "Dialog.DBAlv",
                    Icon = Parsers.ImageService.BitmapToIcon(Properties.Resources.Icons__Gin__ulozit_do_databaze)
                };
                CDbDetailAlvTab export = new CDbDetailAlvTab(l_ixsalv) { Dock = DockStyle.Fill };
                frm.AddControl(export);
                frm.ShowDialog();
            }
        }
    }
}
