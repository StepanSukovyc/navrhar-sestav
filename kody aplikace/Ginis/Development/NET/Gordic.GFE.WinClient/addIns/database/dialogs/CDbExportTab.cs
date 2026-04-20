//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.CDbExportTab.cs                        </Name>
//    <Description> Uložení sestavy do databáze                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-06-27                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using Gordic.General;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Database;
using Gordic.GFE.WinClient.FileCommands;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.Report.Interface;

namespace Gordic.GFE.WinClient
{
    /// <summary>
    /// Uložení sestavy do databáze
    /// </summary>
    partial class CDbExportTab : UserControl, IDialogDefaultable
    {
        #region IDialogDefaultable
        /// <summary>
        /// Reakce na ukončení s akceptací změn
        /// </summary>
        public event EventHandler AcceptEvent;

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
        public string Title { get => GResources.GetResourceText(29450008); }  //RC 29450008 : Uložení sestavy do databáze
        /// <summary>
        /// Reakce na akceptování nastavení
        /// </summary>
        public void Accept()
        {
            if (ParentForm is PropertyDialog)
                (ParentForm as PropertyDialog).DialogResult = ExportFormation() ? DialogResult.OK : DialogResult.Cancel;
            else ExportFormation();
            OnAccept();
        }

        void OnAccept() => AcceptEvent?.Invoke(this, EventArgs.Empty);

        /// <summary>
        /// Reakce na zamitnutí nastavení
        /// </summary>
        public void Cancel() { }

        Dictionary<string, string> infos = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        IInfoHandler infoHandler;
        //bool isSimulation;
        /// <summary>
        /// Nastavení implicitních hodnot
        /// </summary>
        public void SetDefault()
        {
            if (!DatabaseService.IsAuthorized)
                //#if xDEBUG
                //                MessageService.ShowWarning(GResources.GetResourceText(29450010) + '\n' + GResources.GetResourceText(29450009)); //RC 29450010 : Spuštěná simulace práce s databází.
                //                isSimulation = true;
                //#else                
                //                isSimulation = false;
                //                Canceling = true;
                //                return;
                //#endif
                this.ParentForm.Close();
            else
            {
                Content = SimpleDesktop.Desktop.ActiveDesktopWindow.ViewContents.FirstOrDefault(vc => vc is IInfoHandler);
                if (Content == null)
                {
                    MessageService.ShowError(GResources.GetResourceText(29450011)); //RC 29450011 : Sestavu nelze uložit do databáze - chybí ovladač INFO sekce!
                    Canceling = true;
                    return;
                }

                infoHandler = Content as IInfoHandler;
                infos = infoHandler.GetInfo();

                tbIxsFrm.Value = new GString(GetInfo("ixs_frm", null));
                if (Gordic.General.GValidation.ValidateIxs(tbIxsFrm.Value.BaseValueTrimmed) == false)
                    LoggingService.Error("ixs_frm " + GResources.GetResourceText(29450012)); //RC 29450012 : je chybné!

                tbIxsAlv.Value = new GString(GetInfo("ixs_alv", null));
                foreach (GString ixsAlv in tbIxsAlv.Value.Split(','))
                    if (Gordic.General.GValidation.ValidateIxs(ixsAlv.BaseValueTrimmed) == false)
                        LoggingService.Error("ixs_alv " + GResources.GetResourceText(29450012)); //RC 29450012 : je chybné!

                try { tbIxsXme.Value = GetInfoReq("ixs_xme"); }
                catch (GNonFatalException) { LoggingService.Error(GResources.GetResourceText(29450013) + " 'ixs_xme'!"); } //RC 29450013 : Nenalezena povinná info sekce

                try { tbXmetaVer.Value = GInt32.Parse(GetInfoReq("xmeta_ver")); }
                catch (GNonFatalException) { LoggingService.Error(GResources.GetResourceText(29450013) + " 'xmeta_ver'!"); } //RC 29450432 : Nenalezena povinná info sekce 'xmeta_ver'.

                try { tbXmetaSubver.Value = GInt32.Parse(GetInfoReq("xmeta_subver_min")); }
                catch (GNonFatalException) { LoggingService.Error(GResources.GetResourceText(29450013) + " 'xmeta_subver_min'!"); } //RC 29450433 : Nenalezena povinná info sekce 'xmeta_subver_min'.

                if (tbIxsAlv.Value == "0000ALV056IT") //DOCFORM
                    try
                    {
                        gGroupBox1.Visible = false;
                        var l_IxsTyp = GetInfo("ixs_typ", "");
                        if (l_IxsTyp.Length > 12 || tbIxsTyp.SetValidData(new GString(l_IxsTyp, 12)) == false)
                        { tbIxsTyp.SetInvalidData(l_IxsTyp); tbIxsTyp.ReadOnly = true; }
                        chbIxsTypSpis.Checked = GBoolean.Parse(GetInfo("ixs_typ_spis", "false"));
                    }
                    catch (GNonFatalException) { LoggingService.Error(GResources.GetResourceText(29450013) + " 'xmeta_ver'!"); } //RC 29450432 : Nenalezena povinná info sekce 'xmeta_ver'.
                    catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450014) + ": " + ex.Message); } //RC 29450014 : Nespecifikovaná chyba

                tbNazev.Value = GString.Left(GetInfo("nazev", ""), 100);
                //tbAllowedOutput.Value = GetInfo("allowed_output", "");
                tbRokmesOd.Value = GEkoDate.Parse(GetInfo("rokmes_od", "200000"));
                tbRokmesDo.Value = GEkoDate.Parse(GetInfo("rokmes_do", "299999"));
                tbPoznamka.Value = GString.Left(GetInfo("poznamka", ""), 254);
                tbFiltrFrm.Value = GString.Left(GetInfo("filtr_frm", ""), 254);
                tbFormVyst.Value = GString.Left(GetInfo("form_vyst", ""), 254);
                tbStrom.FilterAktivita = new GBaseFilter<GInt16>(new GInt16(100));
                //tbStrom.FilterPrizRoot = new GBaseFilter<GInt16>(new GInt16(1));
                tbStrom.DependancyTema = tbTema;
                tbStrom.SetValidData(new GString(GetInfo("ixs_str_fos", null), 12));
                tbTypPrilohy.SetValidData(GInt16.Parse(GetInfo("ktg_typ_pri", null), acceptNull: true));

                tbFormatSkup.Value = (Content as IInfoHandler).GetFormatType();
                //tbFormatSkup.Value = Content.PrimaryFile.FormatType.ToString();
                if (tbFormatSkup.Value.BaseValueTrimmed.Length != 3)
                    throw new GNonFatalException(GResources.GetResourceText(29450015)); //RC 29450015 : Tento typ sestavy nelze uložit do databáze!

                StringBuilder fazes = new StringBuilder();
                StringBuilder dirs = new StringBuilder();
                var fazes_dict = new HashSet<string>();
                foreach (GString ixsAlv in tbIxsAlv.Value.Split(','))
                {
                    if (ixsAlv.IsNullOrEmpty) continue;

                    if (DatabaseService.UserProcess != null)
                        //zjisteni info o ALV
                        try
                        {
                            var alvInfo = new Gordic.Report.Client.GReportInfo(DatabaseService.UserProcess, new GReportIdentity(ixsAlv));
                            if (tbTema.Value.IsNullOrEmpty)
                                tbTema.SetValidData(alvInfo.Tema);

                            GString[] faze = new Gordic.Gin.Client.GGinsfil(DatabaseService.UserProcess).SeznamFaziKSouboru(alvInfo.Alv.file_name);
                            foreach (var f in faze)
                            {
                                var s = f.BaseValueTrimmed;
                                if (fazes_dict.Add(s) == false) continue;
                                if (fazes.Length > 0) { fazes.Append(","); dirs.Append(","); }
                                fazes.Append(s);
                                dirs.Append(GetFazePath(s, alvInfo.Alv.file_name));
                            }
                        }
                        catch (Exception ex)
                        {
                            //Canceling = MessageService.AskQuestion("chyba načtení nastavení uložení do databáze. Chcete pokračovat?", ex.Message, 0, 1, "pokračovat", "zrušit") == 1)
                            Canceling = MessageService.ShowCustomDialog(GResources.GetResourceText(29450016), ex.Message, 0, 1, GResources.GetResourceText(29450017), GResources.GetResourceText(29450018)) == 1; //RC 29450018 : zrušit
                        }
                }
                tbFaze.SetInvalidData(fazes.ToString());
                tbDir.SetInvalidData(dirs.ToString());                

                Change = false;
            }
        }

        string GetInfo(string key, string def) => infos != null && infos.TryGetValue(key, out string val) ? val : def;

        string GetInfoReq(string key)
        {
            if (infos != null && infos.TryGetValue(key, out string val))
                return val;

            throw new GNonFatalException(GResources.GetResourceText(29450013) + " {0}!"); //RC 29450013 : Nenalezena povinná info sekce
        }

        #endregion

        string fileName;
        string ZipSource
        {
            get => !string.IsNullOrEmpty(fileName)
                ? FileUtility.Combine(Path.GetDirectoryName(fileName), Path.GetFileNameWithoutExtension(fileName) + ".zip")
                : string.Empty;
        }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public CDbExportTab() => InitializeComponent();

        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);
            btnNewPID.BackgroundImage = WinFormsResourceService.GetBitmap("Icons__Gin__plus");
        }
        /// <summary>
        /// Ukládání sestavy do databáze
        /// </summary>
        bool ExportFormation()
        {
            LoggingService.Info("DBExport: Uložení do DB");

            if (infoHandler == null)
            {
                MessageService.ShowError(GResources.GetResourceText(29450011)); //RC 29450011 : Sestavu nelze uložit do databáze - chybí ovladač INFO sekce!
                return false;
            }

            try
            {
                //kontroly
                if (
                    //isSimulation || 
                    tbIxsFrm.Value.BaseValueTrimmed.Substring(0, 4) != DatabaseService.UserProcess.SessionInfo.LicAdr.BaseValueTrimmed)
                {
                    if (!MessageService.AskQuestion(
                        GResources.GetResourceText(29450019)
                        + '\n' + GResources.GetResourceText(29450020)
                        + '\n' + GResources.GetResourceText(29450021)  //RC 29450021 : Použitím položky 'Nový formát' kontextového menu nad polem FRM vytvoříte kopii.
                        + '\n' + GResources.GetResourceText(29450022)  //RC 29450022 : Původní formát pak lze zneaktivnit v administraci sestav.
                        + '\n' + GResources.GetResourceText(29450023))) //RC 29450023 : Chcete přesto uložit?
                        return false;
                }

                LoggingService.Debug("DBExport: Nastavení vlastností");
                // zpětné nastavení vlastnosti
                Dictionary<string, string> newInfos = new Dictionary<string, string>()
                    {
                        {"ixs_frm", tbIxsFrm.Value.BaseValueTrimmed},
                        {"nazev", tbNazev.Value.BaseValueTrimmed},
                        {"poznamka", tbPoznamka.Value.BaseValueTrimmed},
                        {"rokmes_od", tbRokmesOd.Value.BaseValueTrimmed},
                        {"rokmes_do", tbRokmesDo.Value.BaseValueTrimmed},
                        {"filtr_frm", tbFiltrFrm.Value.BaseValueTrimmed},
                        {"form_vyst", tbFormVyst.Value.BaseValueTrimmed},
                        {"ixs_str_fos", tbStrom.IxsStr.BaseValueTrimmed},
                        {"ktg_typ_pri", tbTypPrilohy.KtgTypPri.ToString() },
                    };
                if (tbIxsAlv.Value == "0000ALV056IT") //DOCFORM
                {
                    if(tbIxsTyp.Valid)
                        newInfos.Add("ixs_typ", tbIxsTyp.IxsTyp.BaseValueTrimmed);
                    else
                        newInfos.Add("ixs_typ", tbIxsTyp.Value.BaseValueTrimmed);
                    newInfos.Add("ixs_typ_spis", chbIxsTypSpis.Checked.ToString());
                }

                // promítnuti změn do náhledu
                infoHandler.AppendInfo(newInfos, Content.PrimaryFile);

                var msg = new StringBuilder();
                // pokud aktuální pohled je sekundární, pak ho uložíme
                if (SimpleDesktop.Desktop.ActiveViewContent is ICustomizedCommands)
                {
                    LoggingService.Debug("DBExport: Uložení souboru");
                    SaveFileToDatabase.Save(new EventHandlerOpenedFileArgument(SaveAs));

                    var fazes = tbFaze.Value.Split(',');
                    var dirs = tbDir.Value.BaseValueTrimmed.Split(',');

                    if (
                        //!isSimulation && 
                        DatabaseService.UserProcess != null)
                    {
                        //prvně kopii. Pokud by to selhalo, do DB vůbec neuložím
                        if (chbSaveCopy.Checked)
                        {
                            LoggingService.Debug("DBExport: uložení kopie");
                            var h = new HashSet<string>();

                            //foreach (GString faze in tbFaze.Value.Split(','))
                            for (int i = 0; i < fazes.Length; i++)
                            {
                                GString faze = fazes[i];
                                //string dir = GetFazePath(faze.BaseValueTrimmed);
                                string dir = dirs[i];

                                if (h.Add(dir))
                                {
                                    dir = dir.Replace("@(GINADR)@", DatabaseService.UserProcess.Configuration.GinisPath);
                                    msg.AppendLine(GResources.GetResourceText(29451294, dir)); //RC 29451294 : Uloženo do {0}
                                    FileUtility.ObservedCopy(fileName, Path.Combine(dir, Path.GetFileName(fileName)), forceOverwrite: true);
                                    FileUtility.ObservedCopy(ZipSource, Path.Combine(dir, Path.GetFileName(ZipSource)), forceOverwrite: true);
                                }
                            }
                        }

                        var fil = new Gordic.Gin.Client.GGinsfil(DatabaseService.UserProcess);
                        var poznamka = GResources.GetResourceText(21090003); //RC 21090003 : GFE - načteno uživatelem

                        //foreach (GString faze in tbFaze.Value.Split(','))
                        for (int i  = 0; i < fazes.Length; i++)
                        {
                            GString faze = fazes[i];
                            //string dir = GetFazePath(faze.BaseValueTrimmed);
                            string dir = dirs[i];
                            LoggingService.Debug($"DBExport: uložení do db {faze} {dir}");

                            if (!string.IsNullOrEmpty(fileName) && FileUtility.TestFileExists(fileName))
                                if (Path.GetExtension(fileName).Equals(".alfx", StringComparison.InvariantCultureIgnoreCase))
                                {
                                    if (tbFilename.Value.BaseValueTrimmed.EndsWith(".alf"))
                                        tbFilename.Value = tbFilename.Value.BaseValueTrimmed.Replace(".alf", ".alfx");

                                    using (var f = System.IO.File.OpenRead(fileName))
                                        fil.UlozSoubor2(faze, tbFilename.Value, chbAktualizovat.Checked, f, dir, poznamka, 0);
                                }
                                else
                                {
                                    using (var f = System.IO.File.OpenRead(fileName))
                                        fil.UlozSoubor2(faze, tbFilename.Value, chbAktualizovat.Checked, f, dir, poznamka, 0);

                                    if (File.Exists(ZipSource))
                                        using (var zip = System.IO.File.OpenRead(ZipSource))
                                            fil.UlozSoubor2(faze, Path.ChangeExtension(tbFilename.Value, ".zip"), false, zip, dir, poznamka, 0);
                                }
                            msg.AppendLine(GResources.GetResourceText(29451293, faze)); //RC 29451293 : Uloženo do DB k fázi {0}
                        }

                        var ads = new Gordic.Report.Client.GReportAdmin(DatabaseService.UserProcess);
                        var ixsStrOld = new GString(GetInfo("ixs_str_fos", null), 12);
                        foreach (GString ixsAlv in tbIxsAlv.Value.Split(','))
                        {
                            LoggingService.Debug($"DBExport: registrace do db {ixsAlv} {tbIxsFrm.Value} {tbIxsXme.Value}");
                            ads.RegisterAlfToDatabase(
                                tbIxsFrm.Value, tbIxsXme.Value, tbXmetaVer.Value, tbXmetaSubver.Value, ixsAlv, tbNazev.Value, tbPoznamka.Value, tbRokmesOd.Value, tbRokmesDo.Value
                                , tbFilename.Value, tbFormatSkup.Value, tbFiltrFrm.Value, tbFormVyst.Value, tbTypPrilohy.KtgTypPri
                            );
                            if (tbStrom.Valid || ixsStrOld.IsNullOrEmpty == false)
                                ads.RegisterAlfToTree(tbStrom.IxsStr, ixsAlv, tbIxsFrm.Value, ixsStrOld, tbNazev.Value);
                        }

                        if (tbIxsAlv.Value == "0000ALV056IT") //DOCFORM
                        {
                            LoggingService.Debug($"DBExport: registrace docform {tbIxsTyp.Value} {chbIxsTypSpis.Checked}");
                            if (tbIxsTyp.Valid)
                                ads.RegisterDocFormToDatabase(tbIxsFrm.Value, tbIxsTyp.IxsTyp, chbIxsTypSpis.Checked);
                            else
                                foreach (GString ixsTyp in tbIxsTyp.Value.Split(','))
                                {
                                    ads.RegisterDocFormToDatabase(tbIxsFrm.Value, ixsTyp, chbIxsTypSpis.Checked);
                                }
                        }
                    }
                    else
                        MessageService.ShowWarning(GResources.GetResourceText(29450024)); //RC 29450024 : Uložení do databáze nelze uskutečnit - chybí připojení!

                    LoggingService.Debug($"DBExport: uloženo OK.");
                    if (ReportDesignerProperties.Instance.AlfShowSaveMessage)
                        MessageService.ShowMessage(msg.ToString(), GResources.GetResourceText(29450025)); //RC 29450025 : Soubor uložen
                    else
                        StatusBarService.SetMessage(GResources.GetResourceText(29450025) + ": " + msg.ToString()); //RC 29450025 : Soubor uložen
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                MessageService.ShowError(ex);
                return false;
            }
        }

        //obdoba metody GetFazePath z Gordic.Gin.Server\Gin\Gordic.Gin.Server.GGinsfil.cs
        private GString GetFazePath(string faze, string alvFilename)
        {
            var v_faze = faze;
            //takto je to v Gin.Server
            bool isFrm = faze[6] == 'S'; //faze sestav?
            if (isFrm) v_faze = new System.Text.StringBuilder(faze).Replace('S', '0', 6, 1).ToString();

            //string fazeAdr;
            //if (faze.StartsWith("GMS") && faze.Substring(3, 3) != "USN" /* T9051 */) fazeAdr = "";
            //else if (faze.StartsWith("GSA")) fazeAdr = faze.Substring(3, 5) + "\\";
            //else if (faze.EndsWith("01")) fazeAdr = faze.Substring(3, 3) + "\\";
            //else fazeAdr = faze.Substring(3, 5) + "\\";

            //GString l_pth = $"@(GINADR)@{fazeAdr}FRM\\";
            //return l_pth;

            var v_faze_cast = v_faze.Substring(3, 5).ToUpper(); // ponechám název fáze bez platformy - např. z GSAUCR01 zbyde UCR01
            var v_zacatek = v_faze.Substring(0, 3).ToUpper(); // první tři znaky z názvu fáze
            if(v_zacatek == "GSA")
                return $"@(GINADR)@{v_faze_cast}\\FRM\\"; // pokud se jedná o GSA modul, načítat se bude do např. UCR01/FRM 
            if (v_zacatek == "GIN")
                v_faze_cast = v_faze_cast.Substring(0, 3); // pokud se jedná o starý GIN modul, načítat se bude do např. SML/FRM 
            if( v_faze_cast == "SSLS1" || v_faze_cast == "SSL" || v_faze_cast == "GIN" || v_faze_cast == "EKO")
                return $"@(GINADR)@FRM\\";
            if( v_faze_cast == "PRR")// ALF 14.4.2015 - na žádost R. Podešvy
                return $"@(GINADR)@FRM\\";
            if (v_faze_cast == "LEG")// ALF 19.11.2019 po reklamaci S. Horáka/mail MUKV, LEG v balíku sestav směřuje na GINIS/FRM
                return $"@(GINADR)@FRM\\";

	        //vfc  = Mid(v_faze_cast,1,3) 
	        //IF vfc = "DDP" OR vfc ="SML" OR vfc = "BUC" OR vfc="INT" THEN 	// ALF 23.5.2023 Gupta a neexistuje GSA modul
		       // v_faze_cast = Mid(v_faze_cast,1,3) 
	        //END IF

            if (DatabaseService.UserProcess != null)
                //zjisteni info o ALV
                try
                {
                    var v_cil_cesta32 = new Gordic.Gin.Client.GGinsfil(DatabaseService.UserProcess).PosledniPouzitaCesta(faze, alvFilename).Trimmed;
                    if(string.IsNullOrEmpty(v_cil_cesta32)) // pokud je sestava načítána poprvé
                    {
                        tbDir.LabelText = tbDir.LabelText + " (N)"; //    st_adr.text = "N"
                        //    IF v_soubor<>"" THEN
                        MessageService.ShowWarning("Zkontrolujte si prosím zda se sestava načítá do správného adresáře (měl by odpovídat tomu, který bude nastaven v instalačním balíčku sestav).");
                        //    END IF
                        //    v_cil_cesta32 = gin.str_fce.format_path("@(GINADR)@" + v_faze_cast + "FRM")
                        //    sle_adr32.displayonly = false  // např. DDP má GINDDP i GSADDP - tak aby mohl uživatel změnit adresář
                        tbDir.BackColor = Color.LightSalmon;
                        return $"@(GINADR)@{v_faze_cast}\\FRM\\";
                    }
                    //ELSE
                    tbDir.LabelText = tbDir.LabelText + " (DB)"; //    st_adr.text = "DB"
                    if (v_cil_cesta32.BaseValueTrimmed.EndsWith("FRM\\") == false) //    IF mid(v_cil_cesta32, Len(v_cil_cesta32)-3, 4) <> "FRM\" THEN 
                    {
                        MessageService.ShowWarning("Zkontrolujte si prosím zda se sestava načítá do správného adresáře (měl by odpovídat tomu, který bude nastaven v instalačním balíčku sestav). Adresář má nestandarní tvar.");
                        tbDir.BackColor = Color.OrangeRed;
                    }
                    //END IF
                    return v_cil_cesta32;
                }
                catch (Exception ex)
                {
                    //Canceling = MessageService.AskQuestion("chyba načtení nastavení uložení do databáze. Chcete pokračovat?", ex.Message, 0, 1, "pokračovat", "zrušit") == 1)
                    Canceling = MessageService.ShowCustomDialog(GResources.GetResourceText(29450016), ex.Message, 0, 1, GResources.GetResourceText(29450017), GResources.GetResourceText(29450018)) == 1; //RC 29450018 : zrušit
                }

            tbDir.BackColor = Color.LightYellow;
            return $"@(GINADR)@FRM\\";
        }


        void TbNazevValueChanged(object sender, EventArgs e) => SetOk();

        void SetOk()
        {
            string l_ixsfrm = tbIxsFrm.Value.BaseValueTrimmed;
            var okEnabled =
                tbNazev.Value.BaseValueTrimmed.Length > 0        //ma nazev
                && GValidation.ValidateIxs(l_ixsfrm)             //ma ixs_frm
                && l_ixsfrm.Substring(4, 3) == "ALF"             //a ixs_frm je skutecne ixs_frm!
                && tbFaze.Value.BaseValueTrimmed.Length >= 8     //alespon jedna faze kam ulozit
            ;
            (FindForm() as PropertyDialog).AcceptEnabled = okEnabled /*|| isSimulation*/;
        }
        void SaveAs(OpenedFile file)
        {
            string name = FileUtility.Combine((new GFETempDir()).Path, tbFilename.Text);
            if (FileUtility.ObservedSave(new NamedFileOperationDelegate(file.SaveToDisk), name, false) == FileOperationResult.OK)
                fileName = name;

            int index = SimpleDesktop.Desktop.Title.IndexOf('[');
            FileAgent.RecentOpen.AddLastFile(new RecentOpenFile(name, true, tbIxsAlv.Text, tbIxsFrm.Text, index != -1 ? SimpleDesktop.Desktop.Title.Substring(index) : null));
        }

        void TbIxsFrmValueChanged(object sender, EventArgs e)
        {
            string l_ixsfrm = tbIxsFrm.Value.BaseValueTrimmed;
            if (GValidation.ValidateIxs(l_ixsfrm) && l_ixsfrm.Substring(4, 3) == "ALF")
                tbFilename.Value = l_ixsfrm.Substring(0, 4) + l_ixsfrm.Substring(7, 4) + ".alf";
            else
                tbFilename.Clear();
            SetOk();
        }
        void TbFazeValueChanged(object sender, EventArgs e)
        {
            if (!tbFaze.Value.IsNullOrEmpty)
            {
                string l_val = tbFaze.Value;
                foreach (GString faze in l_val.Split(','))
                {
                    string f = faze.BaseValueTrimmed;
                    if (f.Length != 8) continue;
                    bool isFrm = f[6] == 'S'; // faze sestav?
                    if (isFrm == false)
                    {
                        StringBuilder s = new StringBuilder(f);
                        s[6] = 'S';
                        l_val = l_val.Replace(faze.BaseValueTrimmed, s.ToString());
                    }
                }
                if (l_val != tbFaze.Value)
                {
                    var s = tbFaze.SelectionStart;
                    var l = tbFaze.SelectionLength;
                    tbFaze.SetInvalidData(l_val);
                    tbFaze.Select(s, l);
                }
            }
            SetOk();
        }
        void NewPIDClick(object sender, EventArgs e)
        {
            var ads = NewPID.Generate(out string pid);
            tbIxsFrm.Value = pid;

            if (!tbNazev.Value.IsNullOrEmpty)
                if (ads.KontrolaExistenceFormatuSeJmenem(tbIxsAlv.Value, tbNazev.Value))
                    tbNazev.SetInvalidData(tbNazev.Value.BaseValueTrimmed + " (" + GResources.GetResourceText(29450026) + ')'); //RC 29450026 : kopie

            btnNewPID.Enabled = false;
        }

        void TbIxsAlv_DetailClicked(object sender, EventArgs e)
        {
            var ixsAlv = tbIxsAlv.Value.Split(',');
            if (ixsAlv.Length != 1) return;

            PropertyDialog frm = new PropertyDialog()
            {
                PropertiesDefalut = "Dialog.DBAlv",
                Icon = Parsers.ImageService.BitmapToIcon(Properties.Resources.Icons__Gin__ulozit_do_databaze)
            };
            CDbDetailAlvTab export = new CDbDetailAlvTab(ixsAlv[0]) { Dock = DockStyle.Fill };
            frm.AddControl(export);
            frm.ShowDialog();
        }
    }
}
