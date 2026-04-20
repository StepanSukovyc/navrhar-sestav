//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.CheckVersion.cs                        </Name>
//    <Description> okno kontroly verzi potřebných knihoven pro práci s návrhářem</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-08-07                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Core;
using Gordic.WinForms.Controls;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Text;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient
{
    /// <summary>
    /// okno kontroly verzi potřebných knihoven pro práci s návrhářem
    /// </summary>
    public partial class CheckVersion : Form
    {
        static CheckVersion versionScreen;
        static List<string> requestedFileList = new List<string>();
        static List<string> parameterList = new List<string>();

        const long MINVER = 4003001038;
        DataTable dt;

        /// <summary>
        /// indikuje nutnost ponechání okna s výsledkém kontroly
        /// </summary>
        bool needShow = false;

        /// <summary>
        /// okno kontroly verze
        /// </summary>
        public static CheckVersion CheckVersionForm
        {
            get { return versionScreen; }
            set { versionScreen = value; }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public CheckVersion()
        {
            InitializeComponent();
            prepare();
        }

        /// <exclude/>
        protected override void OnShown(EventArgs e)
        {
            base.OnShown(e);
            check("g32grr06.dll");
            check("g32grr08.dll");
            check("g32grs01.dll");
            check("g32vim01.dll");
            //if (check("chartdir50.dll", 5000000000, allowMissing: true) == false)
            //    check("x32chart.dll", 5000000000);
            if (Environment.Is64BitProcess)
                check("x64chart.dll", 5000000000);
            else
                check("x32chart.dll", 5000000000);

            //TODO: test MS Office? 32bit vs 64bit instalace

            // kontrola existence kořenového adresáře
            check();

            if (!needShow)
            {
                DialogResult = System.Windows.Forms.DialogResult.OK;
                Close();
            }
            else
                btnExit.Enabled = true;

            this.gPictureBox1.Image = Icon.ExtractAssociatedIcon(Application.ExecutablePath).ToBitmap();
        }

        static string rootPath;
        /// <summary>
        /// zobrazení okna kontroly verze
        /// </summary>
        /// <param name="rootPath">cesta ke kořenovému adresáři aplikace</param>
        public static DialogResult ShowCheckVersion(string rootPath)
        {
            versionScreen = new CheckVersion();
            CheckVersion.rootPath = rootPath;
            return versionScreen.ShowDialog();
        }

        /// <summary>
        /// získání verze knihovny
        /// </summary>
        /// <param name="dll">název knihovny</param>
        /// <param name="fname"></param>
        /// <returns></returns>
        static long getDllVersion(string dll, out string fname)
        {
            var p = System.Diagnostics.Process.GetCurrentProcess();
            foreach (System.Diagnostics.ProcessModule m in p.Modules)
                if (String.Compare(m.ModuleName, dll, true) == 0)
                {
                    fname = m.FileName;
                    return ((((long)m.FileVersionInfo.FileMajorPart * 1000) + m.FileVersionInfo.FileMinorPart) * 1000 + m.FileVersionInfo.FileBuildPart) * 1000 + m.FileVersionInfo.FilePrivatePart;
                }
            fname = "";
            return 0;
        }
        static long getDllVersion(Gordic.Report.Interface.FunctionLoader dll, out string fname)
        {
            fname = dll.ModuleFileName;
            return ((((long)dll.VersionInfo.FileMajorPart * 1000) + dll.VersionInfo.FileMinorPart) * 1000 + dll.VersionInfo.FileBuildPart) * 1000 + dll.VersionInfo.FilePrivatePart;
        }

        void prepare()
        {
            dt = new DataTable();
            dt.Columns.Add("m");
            dt.Columns.Add("v", typeof(long));
            dt.Columns.Add("mv", typeof(long));
            dt.Columns.Add("s", typeof(bool));
            dt.Columns.Add("p");

            gvList.DataSource = dt;

            GGridFormat gf = new GGridFormat();
            gf.AddStringColumn("m", GResources.GetResourceText(29450265), 100); //RC 29450265 : Knihovna
            gf.AddStringColumn("p", GResources.GetResourceText(29450266), 120); //RC 29450266 : Cesta
            gf.AddStringColumn("v", GResources.GetResourceText(29450267), 60); //RC 29450267 : Verze
            gf.AddStringColumn("mv", GResources.GetResourceText(29450268), 60); //RC 29450268 : Vyžadováno
            gf.AddStringColumn("s", GResources.GetResourceText(29450269), 50);  //RC 29450269 : Stav

            gvList.FormatGrid(gf);
        }
        void gvList_CellFormatting(object sender, DataGridViewCellFormattingEventArgs e)
        {
            switch (gvList.Columns[e.ColumnIndex].Name)
            {
                case "v":
                case "mv":
                    long v = (long)e.Value;
                    StringBuilder sb = new StringBuilder();

                    for (int i = 0; i < 4; i++)
                    {
                        if (sb.Length > 0) sb.Insert(0, ".");
                        sb.Insert(0, v % 1000);
                        v /= 1000;
                    }
                    e.Value = sb.ToString();
                    e.FormattingApplied = true;
                    break;
                case "s":
                    bool s = (bool)e.Value;
                    if (s) { e.Value = GResources.GetResourceText(29450270); e.CellStyle.ForeColor = Color.Green; } //RC 29450270 : Ok
                    else { e.Value = GResources.GetResourceText(29450189); e.CellStyle.ForeColor = Color.Red; } //RC 29450189 : Chyba
                    e.CellStyle.Font = new Font(e.CellStyle.Font, FontStyle.Bold);
                    e.FormattingApplied = true;
                    break;
            }
        }
        void btnExit_Click(object sender, EventArgs e)
        {
            DialogResult = System.Windows.Forms.DialogResult.Abort;
            Close();
        }
        void check()
        {
            if (rootPath == null)
                rootPath = Path.Combine(ApplicationHelper.AppRootDataPath, RevisionClass.ApplicationName, RevisionClass.FullVersion);

            if (!Directory.Exists(rootPath) && Directory.Exists(Directory.GetParent(rootPath).FullName))// případ prvního spuštění novější verze
            {
                //throw new Exception("s aplikací nelze pracovat - není vhodné prostředí");
                // najdeme všechny předchozí verze a zeptáme se, 
                // jestli si uživatel přeje import nastavení
                string[] directories = Directory.GetDirectories(Directory.GetParent(rootPath).FullName);
                // SS nově se uživateli automaticky kopíruji uživatelská nastavení ale Aplikační nastavení se aktualizuji dle verze
                //string importVersion = GetImportVersion(directories);
                //if (!string.IsNullOrEmpty(importVersion))
                //    FileUtility.DeepCopy(importVersion, rootPath, true);
                //else 
                if (directories.Length > 0)
                {
                    // nakopírujeme poslední změněnou složku 'reportdesignerconfig'
                    DateTime dt = DateTime.MinValue;
                    int index = -1;
                    for (int _index = 0; _index < directories.Length; _index++)
                    {
                        DateTime _dt = Directory.GetLastWriteTime(directories[_index]);
                        if (dt < _dt)
                        {
                            dt = _dt;
                            index = _index;
                        }
                    }
                    if (index != -1)
                    {
                        if (!Directory.Exists(rootPath))
                            Directory.CreateDirectory(rootPath);
                        FileUtility.DeepCopy(Path.Combine(directories[index], "reportdesignerconfig"), Path.Combine(rootPath, "reportdesignerconfig"), true);
                    }
                }
            }
        }

        string GetImportVersion(string[] versions)
        {
            if (versions.Length != 0
                && GMessageBox.ShowQuestion(string.Format(GResources.GetResourceText(29450271) + " - {0}\n"  //RC 29450271 : Spouštíte novou verzí Návrháře sestav
                + GResources.GetResourceText(29450272), RevisionClass.FullVersion)) == System.Windows.Forms.DialogResult.Yes) //RC 29450272 : Přejete si importovat existující nastavení?
            {
                AvailableVersions.ShowAvailableVersions(versions);
                return AvailableVersions.Version;
            }
            return null;
        }
        void check(string dll) { check(dll, MINVER); }

        bool check(string dll, long minver, bool allowMissing = false)
        {
            try
            {
                Gordic.Report.Interface.FunctionLoader dl;
                var s = dll;
                if (s.StartsWith("g32") && s.EndsWith(".dll"))
                {
                    s = s.Substring(3, s.Length - 7);
                    dl = new Gordic.Report.Interface.FunctionLoader(s);
                }
                else
                    dl = new Gordic.Report.Interface.FunctionLoader(s, noMangling: true);
                bool loaded;
                try
                {
                    dl.Load();
                    loaded = true;
                }
                catch (Report.Interface.GReportException) { loaded = false; }
                if (allowMissing && loaded == false) return false;

                string fname;
                long ver;
                if (loaded == false) { fname = dll; ver = 0; }
                else ver = getDllVersion(dl, out fname); // dll, out fname);

                dt.Rows.Add(dll, ver, minver, ver >= minver, fname);

                if (ver < minver)
                    needShow = true;

                //dl.ForgetAndLeaveLibraryLoaded();
                dl.Free();
                return true;
            }
            catch (Exception ex)
            {
                GMessageBox.ShowError(ex.Message);
                return false;
            }
        }

        void btnContinue_Click(object sender, EventArgs e)
        {
            DialogResult = System.Windows.Forms.DialogResult.Ignore;
            Close();
        }

    }
}
