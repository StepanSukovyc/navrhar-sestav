//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Filler.cs                         </Name>
//    <Description> Výchozí načtení formuláře                                   </Description>
//    <Author>      Mgr. Stepan Sukovyč                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-28                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using Gordic.General;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.Services;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Možné typy koncovek
    /// </summary>
    public enum FillerExtensions
    {
        /// <summary>
        /// soubor má koncovku sestavy
        /// </summary>
        format,
        /// <summary>
        /// soubor má koncovku datového souboru
        /// </summary>
        data,
        /// <summary>
        /// koncovka souboru odpovídá datové struktuře
        /// </summary>
        structure,
        /// <summary>
        /// koncovka souboru odpovídá archivu
        /// </summary>
        archive
    }


    /// <summary>
    /// Výchozí načtení formuláře
    /// </summary>
    public class Filler : IFiller, IDisposable
    {
        #region IFiller
        /// <summary>
        /// Volá se po uložení souboru
        /// </summary>
        public event FileNameEventHandler FileSaved;
        /// <summary>
        /// Volá se před načtením formuláře
        /// </summary>
        public event EventHandler BeforeLoad;
        void IFiller.OnBeforeLoad()
        {
            BeforeLoad?.Invoke(this, EventArgs.Empty);
        }
        //po načtení dat
        public event EventHandler DataLoaded;
        void IFiller.OnDataLoaded() => DataLoaded?.Invoke(this, EventArgs.Empty);
        // po načtení pohledu formátu
        public event EventHandler ViewLoaded;
        void IFiller.OnViewLoaded() => ViewLoaded?.Invoke(this, EventArgs.Empty);

        readonly List<ProjectSection> projectSections = new List<ProjectSection>();
        [Browsable(false)]
        public virtual List<ProjectSection> ProjectSections { get { return projectSections; } }

        bool isLK;
        /// <summary>
        /// indikuje filler pro LK
        /// </summary>
        public bool IsLK { get { return isLK; } }

        string internalName;
        /// <summary>
        /// Název souboru projektu (třeba formular.gfrm nebo balicek.srz atd.)
        /// </summary>
        public string FileName { get { return string.IsNullOrEmpty(internalName) && file != null ? file.FileName : internalName; } }

        string cachedDirectoryName;
        /// <summary>
        /// Složka souboru projektu.
        /// </summary>
        public string Directory
        {
            get
            {
                if (string.IsNullOrEmpty(cachedDirectoryName))
                    try { cachedDirectoryName = Path.GetDirectoryName(this.FileName); }
                    catch (Exception) { cachedDirectoryName = ""; }
                return cachedDirectoryName;
            }
        }

        /// <summary>
        /// Soubor formuláře ALF
        /// </summary>
        public ProjectSection FormatFile { get { return formatFiles.Count == 0 ? null : formatFiles[0]; } }

        ProjectSection structureSection = null;
        /// <summary>
        /// Sekce datové struktury
        /// </summary>
        public ProjectSection StructureSection { get { return structureSection; } }
        /// <summary>
        /// Uložení formuláře
        /// </summary>
        /// <param name="sender">objekt, který spustil událost</param>
        /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
        public void Save(object sender, EventArgs e)
        {
            if (file == null || !FileUtility.TestFileExists(FileName))
                return;

            GZip.ZipDirectoryContent(temporaryDir.Path, FileName);
            Log.Info($"Gfrm {FileName} has been saved.");
        }

        /// <summary>
        /// Uložení jako... formuláře
        /// </summary>
        /// <param name="sender">objekt, který spustil událost</param>
        /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
        public void SaveAs(object sender, EventArgsFillerSaveAs e)
        {
            if (e == EventArgs.Empty)
                return;

            if (string.IsNullOrEmpty(e.FileName))
            {
                System.Windows.Forms.DialogResult result = FileService.GetNewName(file, out string fileName);

                if (result != System.Windows.Forms.DialogResult.OK)
                    return;

                if (!string.IsNullOrEmpty(fileName))
                    SaveAs(sender, new EventArgsFillerSaveAs(fileName, false));
            }
            else
            {
                internalName = e.FileName;

                if (e.SaveBefore)
                    ContentService.Save(PrimaryContents[0]);
                GZip.ZipDirectoryContent(temporaryDir.Path, FileName);
                Log.Info($"Gfrm {FileName} has been saved as.");
                if (e.ShowSaveDialog)
                    StatusBarService.SetMessage(GResources.GetResourceText(29450291, FileName)); //RC 29450291 : Soubor {0} byl uložen.
                OnFileSaved(e.FileName);
            }
        }
        void OnFileSaved(string fileName)
        {
            FileSaved?.Invoke(this, new FileNameEventArgs(fileName));
        }

        List<IViewContent> primarycontents = new List<IViewContent>();
        /// <summary>
        /// Ovladače primárních pohledů
        /// </summary>
        public List<IViewContent> PrimaryContents { get { return primarycontents; } }
        #endregion

        #region IDisposeable
        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
#if MEMORYDEBUG
            Gordic.General.GLoggerExtensions.Trace(GFEFormat.MemoryDebugLog, $"{GetType()} Dispose {disposing}");
#endif
            if (disposing)
            {
                var vw = View;
                if (vw != null && serv != null)
                    serv.RemoveShowColorOfChanged(vw, _OnShowColorOfChanged);

                foreach (IViewContent v in primarycontents)
                {
                    if (v is IDisposable d) d.Dispose();
                }
                primarycontents.Clear();
                TemporaryDir?.Dispose();
                file?.Dispose();
            }
        }
        ~Filler() { Dispose(false); }
        #endregion

        /// <summary>
        /// správce dostupných dat
        /// </summary>
        public DefaultDataManager DataManager
        {
            get
            {
                //TOTO by zde byt nemelo. Muze dojit k nejake synchronizaci dat, ale ne k ulozeni gfrm souboru!
                //navic dost kodu se opira o View.DataManager primo a dochazelo by ke zmatkum co je co.
                //ContentService.Save(PrimaryContents[0]);
                //nove se dela refresh primo ve View.DatManager
                return View.DataManager;
            }
        }

        /// <summary>
        /// sekundární pohled (první grafický) na soubor
        /// </summary>
        public DefaultViewContent View
        {
            get
            {
                if (PrimaryContents.Count > 0)
                    if (PrimaryContents[0].SecondaryViewContents.Count > 0)
                        return PrimaryContents[0].SecondaryViewContents.First() as DefaultViewContent;

                return null;
            }
        }
        /// <summary>
        /// stránky grafického pohledu
        /// </summary>
        public IPages Pages { get { return View.Pages; } }
        /// <summary>
        /// nástroj pro práci se skripty
        /// </summary>
        public Gordic.Report.Implementation.GScriptEngine ScriptEngine
        {
            get { return View.DataManagerInternal.ScriptManager.Engine; }
        }
        /// <summary>
        /// registrátor skriptů
        /// </summary>
        public ScriptManager.IScriptRegistrar ScriptRegistrar { get; set; }

        /// <summary>Parametry pro skripty</summary>
        public string StartFragment { get; set; }

        //---------------------------------------------------------------------
        ///<summary>ShowColor</summary>
        public bool ShowColorOf
        {
            get
            {
                if (serv != null)
                    return serv.GetShowColorOf(View);

                return true;
            }
            set
            {
                if (serv != null)
                    serv.SetShowColorOf(View, value);
            }
        }
        ///<summary>ShowColorOfChanged</summary>
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Visible)]
        [Browsable(true)]
        [Description("ShowColorOfChanged")]
        [Category("_DefaultFiller")]
        public event EventHandler ShowColorOfChanged;
        /// <exclude/>
        protected virtual void OnShowColorOfChanged(EventArgs e)
        {
            ShowColorOfChanged?.Invoke(this, e);
        }
        //------------------------------------------------------------------
        /// <summary>Obsahuje editovatelnou položku?</summary>
        public bool IsEditable
        {
            get
            {
                if (Pages == null) return false;
                foreach (DefaultPage p in Pages)
                    if (p.ContainsEditableValue()) return true;
                return false;
            }
        }
        ///// <summary>Obsahuje povinnou nevyplněnou položku?</summary>
        //public bool ContainsEmptyRequiredValue
        //{
        //    get
        //    {
        //        if (Pages == null) return false;
        //        foreach (DefaultPage p in Pages)
        //            if (p.ContainsEmptyRequiredValue()) return true;
        //        return false;
        //    }
        //}   

        //------------------------------------------------------------------
        /// <summary>
        /// seznam datových souborů sestavení
        /// </summary>
        protected List<ProjectSection> dataFiles = new List<ProjectSection>();
        /// <summary>
        /// seznam všech souborů sestav sestavení
        /// </summary>
        protected List<ProjectSection> formatFiles = new List<ProjectSection>();

        private static readonly IGLogger Log = GLogManager.CurrentClassLogger();

        /// <summary>
        /// Otevřený soubor formuláře
        /// </summary>
        protected OpenedFile file;

        GFETempDir temporaryDir = null;
        /// <summary>
        /// Dočasná složka souborů formuláře
        /// </summary>
        protected GFETempDir TemporaryDir
        {
            get { return temporaryDir; }
            set { temporaryDir = value; }
        }
        /// <summary>
        /// Načtení formuláře
        /// </summary>
        protected virtual void LoadInternal()
        {
            // zjistíme koncovky datových souborů projektu
            List<string> dataFilter = GetExtensions(FillerExtensions.data);
            List<string> formatFilter = GetExtensions(FillerExtensions.format);
            List<string> structureFilter = GetExtensions(FillerExtensions.structure);

            // vytvoříme složku do které nasypeme soubory archivu
            TemporaryDir = new GFETempDir(file.FileName);
            Log.Debug($"Gfrm {file.FileName} is opening using folder {TemporaryDir.Path}.");
            cachedDirectoryName = temporaryDir.Path;

            if (System.IO.Directory.Exists(TemporaryDir.Path))
                foreach (FileInfo item in (new DirectoryInfo(TemporaryDir.Path)).GetFiles())
                {
                    ProjectSection ps = GfrmService.ReadSection(item);
                    ProjectSections.Add(ps);
                    if (dataFilter.Contains('*' + item.Extension, StringComparer.OrdinalIgnoreCase))
                        dataFiles.Add(ps);
                    else if (formatFilter.Contains('*' + item.Extension, StringComparer.OrdinalIgnoreCase))
                        formatFiles.Add(ps);
                    else if (structureSection == null && structureFilter.Contains('*' + item.Extension, StringComparer.OrdinalIgnoreCase))
                        structureSection = ps;
                }

            OnFillerLoaded();
            Log.Info($"Gfrm {file.FileName} loaded.");
        }
        /// <summary>Přetížení URL z relations souboru</summary>
        public string GetUrlRedirect(string url)
        {
            foreach (FileInfo item in new DirectoryInfo(TemporaryDir.Path).GetFiles("*.rel"))
            {
                var x = System.Xml.Linq.XDocument.Load(item.FullName);
                //var rel = x.Descendants(System.Xml.Linq.XName.Get("rel", @"http://www.gordic.cz/TR/relations/1.0/")).FirstOrDefault();

                var xnm = new System.Xml.XmlNamespaceManager(new System.Xml.NameTable());
                xnm.AddNamespace("x", "http://www.gordic.cz/TR/relations/1.0/");
                var rel = System.Xml.XPath.Extensions.XPathSelectElement(x, "//x:rel[@url='" + url + "']", xnm);
                if (rel != null) return rel.Value;
            }
            return url;
        }

        /// <summary>
        /// získání koncovek pro určité typy souborů
        /// </summary>
        /// <param name="key">Klíč k hledaným koncovkám</param>
        /// <returns>Seznam koncovek</returns>
        protected virtual List<string> GetExtensions(FillerExtensions key)
        {
            List<string> ext = new List<string>();
            switch (key)
            {
                case FillerExtensions.format:
                    ext.Add("*.alf");
                    break;
                case FillerExtensions.data:
                    ext.Add("*.xml");
                    ext.Add("*.dat");
                    ext.Add("*.tmp");
                    break;
                case FillerExtensions.structure:
                    ext.Add("*.xme");
                    break;
                default:
                    break;
            }
            return ext;
        }

        /// <summary>
        /// vytvoření sekundarního pohledu na data
        /// </summary>
        /// <param name="dataFile">datový soubor</param>
        protected virtual void OpenedFile(string dataFile)
        {
            var v = new LightFillerView();
            v.Initialize(FileService.GetOrCreateOpenedFile(dataFile), this);

            PrimaryContents.Add(v);
            v.Open();
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public Filler() { }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="file">otevřený soubor sesatvení</param>
        /// <param name="isLK">indikace lehkého klienta</param>
        public virtual Filler Initialize(OpenedFile file = null, bool isLK = false)
        {
            this.isLK = isLK;
            CommonService.IsLC = isLK;

            if (!isLK)
                AddInTree.InitializeCore();

            if (file != null)
                Load(file);

            return this;
        }

        /// <summary>
        /// načtení souboru sestavení
        /// </summary>
        /// <param name="file"></param>
        public void Load(OpenedFile file)
        {
            if (file != null)
            {
                this.file = file;
                LoadInternal();
            }
        }

        /// <summary>
        /// Načtení
        /// </summary>
        /// <param name="fileName">Cesta k souboru načtení (soubor *.gfrm)</param>
        /// <returns>Indikuje úspěšné načtení</returns>
        public bool Load(string fileName)
        {
            if (!FileUtility.TestFileExists(fileName))
                return false;

            Load(FileService.GetOrCreateOpenedFile(fileName));
            return true;
        }
        /// <summary>
        /// Načtení obsahu
        /// </summary>
        /// <param name="content">Obsah</param>
        /// <param name="ext">Typ obsahu</param>
        /// <param name="isLastContent">V případě, že TRUE, pak se spustí metoda Prohlížeč je načten</param>
        public void Load(byte[] content, FillerExtensions ext, bool isLastContent)
        {
            if (TemporaryDir == null)
            {
                // vytvoříme složku do které nasypeme soubory archivu
                TemporaryDir = new GFETempDir();
                cachedDirectoryName = temporaryDir.Path;
            }

            ProjectSection ps = GfrmService.ReadSection(content, ext, TemporaryDir.Path);
            switch (ext)
            {
                case FillerExtensions.data:
                    dataFiles.Add(ps);
                    break;
                case FillerExtensions.structure:
                    if (structureSection == null)
                        structureSection = ps;
                    break;
                case FillerExtensions.format:
                    formatFiles.Add(ps);
                    break;
                default:
                    break;
            }

            if (ps != null)
                ProjectSections.Add(ps);

            if (isLastContent)
                OnFillerLoaded();
        }
        /// <summary>
        /// Načtení souborů formuláře
        /// </summary>
        /// <param name="content">Obsah</param>
        /// <param name="data">Data</param>
        /// <param name="xme">Structura</param>
        /// <param name="zip">Archiv (obrázky atp.)</param>
        /// <returns>TRUE - v případě úspěšného načtení</returns>
        public bool Load(byte[] content, byte[] data, byte[] xme, byte[] zip = null)
        {
            if (content.Length == 0
                || data.Length == 0
                || xme.Length == 0)
            {
                MessageService.ShowError(GResources.GetResourceText(29450293)); //RC 29450293 : Nedostatek informace pro načtení formuláře!
                return false;
            }
            Load(content, FillerExtensions.format, false);
            Load(data, FillerExtensions.data, false);

            Load(xme, FillerExtensions.structure, zip == null || zip.Length == 0);
            if (zip != null && zip.Length != 0)
                Load(zip, FillerExtensions.archive, true);

            return true;
        }
        /// <summary>
        /// přidání souboru do sestavení
        /// </summary>
        /// <param name="content">obsah přidávaného souboru</param>
        /// <param name="filename">název (úplná cesta) přidávaného souboru</param>
        public void AddFile(byte[] content, string filename)
        {
            var fn = Path.Combine(temporaryDir.Path, filename);

            if (content == null)
                File.Delete(fn);
            else
                File.WriteAllBytes(fn, content);
        }
        /// <summary>
        /// získání souboru ze sestavení
        /// </summary>
        /// <param name="filename">název (úplná cesta) souboru</param>
        public byte[] GetFile(string filename)
        {
            var fn = Path.Combine(temporaryDir.Path, filename);
            if(File.Exists(fn))
                return File.ReadAllBytes(fn);
            return null;
        }
        /// <summary>
        /// test existence souboru v sestavení
        /// </summary>
        /// <param name="filename">název (úplná cesta) souboru</param>
        public bool HasFile(string filename)
        {
            var fn = Path.Combine(temporaryDir.Path, filename);
            return File.Exists(fn);
        }
        /// <summary>
        /// Načtení souborů
        /// </summary>
        /// <param name="xmeFile"></param>
        /// <param name="dataFile"></param>
        /// <param name="alfFile"></param>
        void Load(string xmeFile, string dataFile, string alfFile)
        {
            ProjectSection ps = GfrmService.ReadSection(new FileInfo(dataFile));
            ProjectSections.Add(ps);
            dataFiles.Add(ps);

            ps = GfrmService.ReadSection(new FileInfo(xmeFile));
            ProjectSections.Add(ps);
            structureSection = ps;

            ps = GfrmService.ReadSection(new FileInfo(alfFile));
            ProjectSections.Add(ps);
            formatFiles.Add(ps);

            OpenedFile(dataFile);
        }
        IGraphicSettingService serv;
        void OnFillerLoaded()
        {
            if (dataFiles.Count < 1)
                throw new Exception(GResources.GetResourceText(29450294)); //RC 29450294 : Chybí datový soubor!
            if (dataFiles.Count > 1)
                throw new Exception(GResources.GetResourceText(29450295)); //RC 29450295 : Musí být pouze jeden datový soubor!

            // pro každý datový soubor vytvořím záložku s formulářem
            foreach (ProjectSection item in dataFiles)
                if (item.Items.Count != 0)
                {
                    string dataFile = FileUtility.Combine(item.Items[0].Location, item.Items[0].Name);
                    if (FileUtility.TestFileExists(dataFile))
                        OpenedFile(dataFile);
                }

            serv = (View?.Control as IPageControl)?.GSS;
            if (serv == null)
                serv = ServiceManager.GraphicSettingService;

            if (serv != null)
                serv.AddShowColorOfChanged(View, _OnShowColorOfChanged);
        }
        void _OnShowColorOfChanged(object sender, EventArgs e)
        {
            OnShowColorOfChanged(e);
        }
    }
}
