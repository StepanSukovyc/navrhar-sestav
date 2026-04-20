//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SsrProject.cs                          </Name>
//    <Description> Projekt konfiguračního souboru prohlížeče                   </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-05-27                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.WinClient.Project.Templates;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Utils;
using Gordic.Report.Implementation;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.WinClient.AddIns;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Database;
using Gordic.Report.WinClient;
using Gordic.Report.Interface;
using Gordic.GFE.WinClient.Project.Commands;
using Gordic.GFE.Parsers.ExternalList;
using Gordic.General;

namespace Gordic.GFE.WinClient.SsrBinding
{
    /// <summary>
    /// třída SSR sestavení
    /// </summary>
    class SsrSolution : Solution
    {
        /// <summary>
        /// lze vytvořít archivní soubor
        /// </summary>
        public override bool CanCreateArchive { get { return true; } }
        /// <exclude/>
        internal override void ProjectItemRemoved(FileProjectItem pItem) { }
        /// <exclude/>
        protected override void OnBeforeRun()
        {
            base.OnBeforeRun();
            IProject project = Projects.FirstOrNull(prj => prj.ProjectSections.Exists(ps => ps.SectionType == ItemType.Generator));
            if (project != null)
            {
                // pokud existuje datový soubor níže v seznamu než je generátor, pak se nový soubor generovat nemusí
                IProjectSection dat = project.ProjectSections.LastOrDefault(ps => ps.SectionType == ItemType.Data);
                IProjectSection gen = project.ProjectSections.LastOrDefault(ps => ps.SectionType == ItemType.Generator);
                if (dat != null && gen != null)
                    if (project.ProjectSections.IndexOf(dat) > project.ProjectSections.IndexOf(gen))
                        return;

                if (project.ProjectSections.FirstOrNull(ps => ps.SectionType == ItemType.Generator) is SsrProjectSection section)
                {
                    var readname = section.FileName;
                    if (DatabaseService.IsAuthorized)
                    {
                        var UserProcess = DatabaseService.UserProcess;

                        var l_oReportProvider = (IGReportProvider)UserProcess.CreateObject(typeof(IGReportProvider));
                        using (var ridStream = File.OpenRead(readname))
                        {
                            IGReport report = l_oReportProvider.ReadFile(readname, ridStream);

                            foreach (var item in section.Attributes)
                                if (item.Key.StartsWith("X", StringComparison.OrdinalIgnoreCase))
                                {
                                    var key = item.Key;
                                    var val = item.Value;
                                    if (key.EndsWith("_base64", StringComparison.Ordinal))
                                    {
                                        key = key.Substring(0, key.Length - "_base64".Length);
                                        val = System.Text.Encoding.Default.GetString(Convert.FromBase64String(val));
                                        //Convert.ToBase64String(System.Text.Encoding.Default.GetBytes(val))
                                    }
                                    report.Parameters[key] = val;
                                }

                            GenerateReport(project as SsrProject, report, FileUtility.GetUniqueName(Path.Combine(project.Directory, string.Format("gen_{0}_{1}.dat", Path.GetFileNameWithoutExtension(readname), DateTime.Now.Ticks.ToString()))));
                        }
                    }
                }
            }
        }

        /// <exclude/>
        public override void CreateArchive()
        {
            if (Folders.FirstOrNull(prc => prc is SsrProject) is SsrProject node)
                node.CreateArchive();
        }
        /// <summary>
        /// spuštění sestavení
        /// </summary>
        public override bool Run()
        {
            // spouštíme dle nastavení externích nástrojů
            if (!base.Run())
            {
                // spouštíme VIDRUN
                if (!FileUtility.StartVidRun(FileName))
                    try
                    {
                        // spouštíme přidružení souboru
                        System.Diagnostics.Process p = System.Diagnostics.Process.Start(FileName);
                        return true;
                    }
                    catch (Exception ex) { MessageService.ShowErrorFormatted(GResources.GetResourceText(29451460) + "\r\n{0}", ex.Message); }
                else
                    return true;
            }
            else
                return true;
            return false;
        }

        void GenerateReport(SsrProject project, IGReport report, string path)
        {
            GReportViewerWin.Instance.GenerateReport(report);
            ((IGReportImplementation)report).Files[1].SaveTo(path);

            FileProjectItem fpi = AddExistingItemsToProject.CopyFile(path, project.Node, true);
            project.SetDefault(project.Items.FirstOrDefault(
                itm => itm.ItemType == ItemType.Data
                && (itm as FileProjectItem).VirtualName.Equals(fpi.VirtualName, StringComparison.OrdinalIgnoreCase)) as SsrFileProjectItem, forceSave: true);
        }
    }

    /// <summary>
    /// Projekt konfiguračního souboru prohlížeče
    /// </summary>
    class SsrProject : BaseProject
    {
        #region IArchive
        bool isArchiveCreating;
        /// <exclude/>
        public void CreateArchive()
        {
            try
            {
                isArchiveCreating = true;
                ProjectService.SaveSolution();
                using (AsynchronousWaitDialog waitDialog = AsynchronousWaitDialog.ShowWaitDialog(GResources.GetResourceText(29451462)))
                {
                    // najdeme vazbu na sestavení
                    ISolutionBinding binding = SolutionBindingService.GetBindingPerProjectFile(solution.FileName);
                    if (binding != null)
                        binding.ArchiveSolution(solution, waitDialog);
                }
            }
            finally { isArchiveCreating = false; }
        }
        #endregion

        /// <summary>
        /// Složka souboru projektu.
        /// </summary>
        [Browsable(false)]
        public override string Directory
        {
            get
            {
                lock (SyncRoot)
                {
                    return (solution != null && System.IO.Directory.Exists(solution.TemporaryDir)) ? solution.TemporaryDir : solution.Directory;
                }
            }
        }
        /// <summary>
        /// přetížení kvůli typu objektu
        /// </summary>
        [Browsable(false)]
        public override bool ReadOnly { get { return false; } }

        /// <summary>
        /// větev projektu
        /// </summary>
        public SsrProjectNode Node { get; set; }

        List<ProjectSection> dataFiles;
        /// <summary>
        /// Indikuje, že projekt lze spustit
        /// </summary>
        public override bool IsStartable { get { return true; } }

        /// <summary>
        /// Jazyk porjektu
        /// </summary>
        public override string ProjectType { get { return "SSR"; } }
        /// <summary>
        /// Vlastností jazyka
        /// </summary>
        public override LanguageProperties LanguageProperties { get { return LanguageProperties.None; } }

        Dictionary<string, string> attributes;
        /// <summary>
        /// atributy projektu
        /// </summary>
        public Dictionary<string, string> Attributes { get { return attributes; } }

        List<GSsrElement> elements;
        /// <summary>
        /// elementy projektu
        /// </summary>
        public List<GSsrElement> Elements { get { return elements; } }

        Solution solution;
        /// <summary>
        /// výchozí formát
        /// </summary>
        public string DefaultFormat { get; set; }
        /// <summary>
        /// titulek projektu
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// načtení projektu sestavení
        /// </summary>
        public SsrProject() { }

        /// <summary>
        /// inicializace třídy
        /// </summary>
        public override IProject Initialize()
        {
            dataFiles = new List<ProjectSection>();
            attributes = new Dictionary<string, string>();
            elements = new List<GSsrElement>();
            return base.Initialize();
        }

        /// <summary>
        /// inicializace projektu dle informaci o projektu
        /// </summary>
        /// <param name="info">Informace potřebna pro vytvoření třídy</param>
        public override IProject Initialize(ProjectCreateInformation info)
        {
            Create(info);
            return base.Initialize(info);
        }

        /// <summary>
        /// inicializace projektu
        /// </summary>
        /// <param name="solution">sestavení projektu</param>
        /// <param name="report"></param>
        public virtual void Initialize(Solution solution, GSsrReport report)
        {
            Initialize();
            project = new TempProject();
            this.solution = solution;

            if (report != null)
            {
                Title = report.Title;
                Name = !string.IsNullOrEmpty(Title) ? Title : GResources.GetResourceText(29451463);

                try
                {
                    if (report.DefaultFormat != null)
                        DefaultFormat = report.DefaultFormat.NameOnly;
                }
                catch (Exception ex) { LoggingService.Error(ex.Message); }

                if (report.Elements != null)
                    elements = new List<GSsrElement>(report.Elements);
                else
                    elements = new List<GSsrElement>();

                if (report.Attributes != null && report.Attributes.Count != 0)
                    attributes.AddRange(report.Attributes);
            }
            LoadProject();
        }

        /// <summary>
        /// Interní načtení projektu
        /// </summary>
        /// <param name="fileName">Název projektu</param>
        protected override void LoadProjectInternal(string fileName)
        {
            base.LoadProjectInternal(fileName);

            foreach (var item in Elements.FindAll(el => el is GSsrFile))
                try
                {
                    if (!(item as GSsrFile).Name.ToUpperInvariant().EndsWith(":GENERATE:")
                        && File.Exists((item as GSsrFile).Name))
                        if (!string.IsNullOrEmpty(item.ElementName))
                            ProjectSections.Add(new SsrProjectSection(item as GSsrFile, GetItemType(item.ElementName, (item as GSsrFile).Name)));
                        else ProjectSections.Add(new SsrProjectSection(item as GSsrFile, GetDefaultItemType((item as GSsrFile).Name)));
                    else
                        NonActiveProjectSections.Add(new SsrProjectSection(item as GSsrFile, GetItemType(item.ElementName, (item as GSsrFile).Name)));
                }
                catch
                {
                    try
                    {
                        NonActiveProjectSections.Add(new SsrProjectSection(item as GSsrFile, GetDefaultItemType((item as GSsrFile).Name)));
                    }
                    catch (Exception ex) { LoggingService.Error(ex.Message); }
                }

            CreateItemsList();
            FileUtility.FileSaved += FileFromProjectIsSaved;
        }
        /// <summary>
        /// Vytvoření položky projektu
        /// </summary>
        /// <param name="item">Sekce projektu pro vytvoření</param>
        /// <returns>Nová položky projektu</returns>
        public override ProjectItem CreateProjectItem(IProjectSection item)
        {
            return new SsrFileProjectItem(this, item);
        }

        /// <summary>
        /// Získání výchozího typu položky
        /// </summary>
        /// <param name="fileName">Název souboru položky</param>
        /// <returns>Výchozí typ položky</returns>
        public override ItemType GetDefaultItemType(string fileName)
        {
            if (string.Equals(".ssr", Path.GetExtension(fileName), StringComparison.OrdinalIgnoreCase))
                return ItemType.Runable;
            if (fileName.ToUpper().EndsWith(":TRANSFORM:"))
                return ItemType.Transform;

            return base.GetDefaultItemType(fileName);
        }

        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        public override void Dispose()
        {
            FileUtility.FileSaved -= FileFromProjectIsSaved;
            base.Dispose();
        }

        /// <summary>
        /// Přidání nové položky
        /// </summary>
        /// <param name="item">přidávaná položka projektu</param>
        /// <param name="fileNode">větev projektu</param>
        public override void AddProjectItem(ProjectItem item, AbstractFileTreeNode fileNode)
        {
            if (item != null)
            {
                GSsrFile file = GetFileByType(item.ItemType, item.FileName);
                if (file != null)
                {
                    Elements.Add(file);
                    SsrProjectSection pSection = new SsrProjectSection(file, item.ItemType);
                    ProjectSections.Add(pSection);
                    item = CreateProjectItem(pSection);

                    if (fileNode is SsrFileNode)
                        (fileNode as SsrFileNode).Item = item;
                }

                base.AddProjectItem(item, fileNode);
            }
        }

        GSsrFile GetFileByType(ItemType type, string fileName, string title = "")
        {
            GSsrFile file = null;
            if (type == ItemType.Content
                    || type == ItemType.None
                    || type == ItemType.Data
                    || type == ItemType.Structure)
            {
                if (type == ItemType.Content)
                    file = new GSsrFile(solution.Tag as GSsr, "format", fileName, title);
                else if (type == ItemType.None)
                    file = new GSsrFile(solution.Tag as GSsr, "file", fileName, title);
                else if (type == ItemType.Data)
                    file = new GSsrFile(solution.Tag as GSsr, "data", fileName, title);
                else if (type == ItemType.Structure)
                    file = new GSsrFile(solution.Tag as GSsr, "structure", fileName, title);
            }

            return file;
        }
        /// <summary>
        /// odstranění položky projektu
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public override bool RemoveProjectItem(ProjectItem item)
        {
            if (item == null)
                throw new ArgumentNullException("item");

            bool result = false;
            SsrFileProjectItem pItem = Items.FirstOrNull(itm => (itm as SsrFileProjectItem).Section.FileName.Equals(item.FileName)) as SsrFileProjectItem;

            // najdeme starý soubor
            // odstraníme staré záznamy
            if (Elements.FirstOrNull(fl => fl is GSsrFile && (fl as GSsrFile).Name.Equals(item.FileName, StringComparison.OrdinalIgnoreCase)) is GSsrFile oldFile && Elements.Contains(oldFile))
                Elements.Remove(oldFile);

            if (pItem != null)
            {
                ProjectSections.Remove((pItem as SsrFileProjectItem).Section);

                // pokud na daný soubor je vázán výchozí formát, pak ho pozměníme
                if (!string.IsNullOrEmpty(DefaultFormat) && DefaultFormat.Equals(Path.GetFileName(pItem.Section.FileNameOnly), StringComparison.OrdinalIgnoreCase))
                    if (ProjectSections.Count != 0)
                    {
                        if (ProjectSections.FirstOrDefault(ps => ps.SectionType == ItemType.Content) is SsrProjectSection sps)
                            DefaultFormat = sps.FileNameOnly;
                        else DefaultFormat = string.Empty;
                    }
                    else DefaultFormat = string.Empty;

                result = base.RemoveProjectItem(pItem);
            }

            solution.ProjectItemRemoved(pItem);
            CreateItemsList();
            ProjectService.SaveSolution();
            return result;
        }

        /// <exclude/>
        public override void AfterLabelEdit(AfterFileNodeEditEventArgs eventArgs)
        {
            dynamic node = eventArgs.FileNode;
            if (node == null)
                node = eventArgs.DirNode;

            if (node != null)
            {
                // najdeme starý soubor
                GSsrFile oldFile = Elements.FirstOrNull(fl => fl is GSsrFile && (fl as GSsrFile).Name.Equals(eventArgs.OldName, StringComparison.OrdinalIgnoreCase)) as GSsrFile;
                // vytvoříme nový soubor
                GSsrFile file = GetFileByType(node.Item != null ? node.Item.ItemType : ItemType.None, node.LinkedFileName, oldFile != null ? oldFile.Title : "");

                if (file != null)
                {
                    // odstraníme staré záznamy
                    if (oldFile != null && Elements.Contains(oldFile))
                        Elements.Remove(oldFile);

                    IProjectSection oldSection = ProjectSections.FirstOrNull(ps => ps.SectionType == node.Item.ItemType
                        && (ps as SsrProjectSection).FileName.Equals(eventArgs.OldName, StringComparison.OrdinalIgnoreCase));
                    if (oldSection != null)
                        ProjectSections.Remove(oldSection);

                    // přidáme nové záznamy
                    Elements.Add(file);

                    SsrProjectSection newSection = new SsrProjectSection(file, node.Item.ItemType);
                    ProjectSections.Add(newSection);
                    node.Item = CreateProjectItem(newSection);
                    node.ProjectItem = node.Item;
                    node.SetIcon(IconService.GetImageForFile(node.LinkedFileName));

                    if (!string.IsNullOrEmpty(DefaultFormat) && DefaultFormat.Equals(Path.GetFileName(eventArgs.OldName), StringComparison.OrdinalIgnoreCase))
                        DefaultFormat = node.Item.Section.FileNameOnly;

                    CreateItemsList();
                }
            }
        }

        /// <summary>
        /// uložení projektu do sestavení
        /// </summary>
        /// <param name="main">hlavní větev</param>
        /// <param name="xmlDoc">dokument</param>
        public override void Save(XmlElement main, XmlDocumentPosition xmlDoc)
        {
            XmlElement rpt = xmlDoc.CreateElement("report", main.NamespaceURI);
            if (!string.IsNullOrEmpty(Title))
            {
                XmlAttribute atr = xmlDoc.CreateAttribute("title");
                atr.Value = Title;
                rpt.Attributes.Append(atr);
            }

            if (!string.IsNullOrEmpty(DefaultFormat))
            {
                XmlAttribute atr = xmlDoc.CreateAttribute("default-format");
                atr.Value = DefaultFormat;
                rpt.Attributes.Append(atr);
            }

            // uložíme atributy větve 'report'
            Dictionary<string, string> dict = Attributes.FindAllByKey(itm => !itm.Equals("title") && !itm.Equals("default-format"));
            if (dict != null)
                foreach (var atribute in dict)
                {
                    XmlAttribute atr = xmlDoc.CreateAttribute(atribute.Key);
                    atr.Value = atribute.Value;
                    rpt.Attributes.Append(atr);
                }

            // prvně uložíme větve, které nejsou soubory
            foreach (GSsrElement item in Elements.FindAll(el => !(el is GSsrFile)))
            {
                XmlElement child = xmlDoc.CreateElement(item.ElementName, rpt.NamespaceURI);
                foreach (var atribute in item.Attributes)
                {
                    XmlAttribute atr = xmlDoc.CreateAttribute(atribute.Key);
                    atr.Value = atribute.Value;
                    child.Attributes.Append(atr);
                }
                rpt.AppendChild(child);
            }

            // teď uložíme všechny soubory
            foreach (var item in ProjectSections)
            {
                if (item is SsrProjectSection sps)
                {
                    XmlElement child = xmlDoc.CreateElement(sps.ElementName, rpt.NamespaceURI);
                    foreach (var atribute in sps.Attributes)
                    {
                        XmlAttribute atr = xmlDoc.CreateAttribute(atribute.Key);
                        atr.Value = atribute.Value;
                        child.Attributes.Append(atr);
                    }

                    if (!child.HasAttribute("file"))
                    {
                        XmlAttribute atr = xmlDoc.CreateAttribute("file");
                        atr.Value = GetFileName(sps);
                        child.Attributes.Append(atr);
                    }
                    else if (!string.IsNullOrEmpty(child.Value)
                        && !child.Value.StartsWith(":"))
                        child.Attributes["file"].Value = GetFileName(sps);

                    if (!string.IsNullOrEmpty(sps.Title))
                        if (!child.HasAttribute("title"))
                        {
                            XmlAttribute atr = xmlDoc.CreateAttribute("title");
                            atr.Value = sps.Title;
                            child.Attributes.Append(atr);
                        }
                        else child.Attributes["title"].Value = sps.Title;

                    rpt.AppendChild(child);
                }
            }

            // pokud datový soubor neexistuje v žádném seznamu
            if (!ProjectSections.Exists(itm => itm.SectionType == ItemType.Data || itm.SectionType == ItemType.Generator)
                && !NonActiveProjectSections.Exists(itm => itm.SectionType == ItemType.Data || itm.SectionType == ItemType.Generator))
            {
                XmlElement child = xmlDoc.CreateElement("data", rpt.NamespaceURI);
                XmlAttribute atr = xmlDoc.CreateAttribute("file");
                atr.Value = ":GENERATE:";
                child.Attributes.Append(atr);
                rpt.AppendChild(child);
            }

            foreach (var item in NonActiveProjectSections)
                if (item is SsrProjectSection ps && !string.IsNullOrEmpty(ps.ElementName))
                {
                    XmlElement child = xmlDoc.CreateElement(ps.ElementName, rpt.NamespaceURI);

                    foreach (var subItem in ps.Attributes)
                    {
                        XmlAttribute atr = xmlDoc.CreateAttribute(subItem.Key);
                        atr.Value = subItem.Value;
                        child.Attributes.Append(atr);
                    }

                    rpt.AppendChild(child);
                }

            main.AppendChild(rpt);
        }

        /// <summary>
        /// přidání nové položky
        /// </summary>
        /// <param name="fullFileName">úplný název souboru</param>
        internal ProjectItem AddProjectItem(string fullFileName)
        {
            ItemType type = GetDefaultItemType(fullFileName);
            GSsrFile file = GetFileByType(type, fullFileName, "");
            // přidáme nové záznamy
            Elements.Add(file);

            SsrProjectSection newSection = new SsrProjectSection(file, type);
            ProjectSections.Add(newSection);
            CreateItemsList();

            return Items.FirstOrNull(itm => itm is SsrFileProjectItem && (itm as SsrFileProjectItem).Section == newSection);
        }
        /// <summary>
        /// archivace projektu do složky
        /// </summary>
        /// <param name="temp"></param>
        internal void Copy(GFETempDir temp)
        {
            string fileName = string.Empty;

            // teď uložíme všechny soubory
            foreach (var item in ProjectSections)
            {
                if (item is SsrProjectSection sps && !string.IsNullOrEmpty(sps.FileName) && File.Exists(sps.FileName))
                {
                    fileName = Path.Combine(temp.Path, Path.GetFileName(sps.FileName));
                    FileService.CopyFile(sps.FileName, fileName, false, true);
                    // je nutné nakopírovat i archiv (pokud existuje)
                    if (sps.SectionType == ItemType.Content)
                    {
                        string oldArchName = Path.Combine(Path.GetDirectoryName(sps.FileName), Path.GetFileNameWithoutExtension(sps.FileName) + ".zip");
                        if (File.Exists(oldArchName))
                        {
                            string newArchName = Path.Combine(Path.GetDirectoryName(fileName), Path.GetFileNameWithoutExtension(fileName) + ".zip");
                            FileService.CopyFile(oldArchName, newArchName, false, true);
                        }
                    }
                }
            }
        }

        bool isSetting;
        /// <summary>
        /// nastavení výchozí hodnoty
        /// </summary>
        /// <param name="item">položka k nastavení</param>
        /// <param name="withoutSave">TRUE - proběhne nastavení bez uložení</param>
        /// <param name="forceSave">TRUE - pokud položka odpovídá parametrům výchozí hodnoty, pak uloží i přesto, že <paramref name="withoutSave"/> je TRUE</param>
        public override bool SetDefault(ProjectItem item, bool withoutSave = false, bool forceSave = false)
        {
            if (isSetting)
                return true;
            isSetting = true;
            if (!(item is SsrFileProjectItem itm))
            {
                isSetting = false;
                return false;
            }

            // generátor a datový soubor ve výchozím stavu jsou posledními
            if (itm.ItemType == ItemType.Data || itm.ItemType == ItemType.Generator)
            {
                int index = ProjectSections.IndexOf(itm.Section);
                if (index != (ProjectSections.Count - 1))
                {
                    ProjectSections.Reverse(index, ProjectSections.Count - index);
                    if (!withoutSave)
                        ProjectService.SaveSolution();
                }
                else if (forceSave)
                    ProjectService.SaveSolution();

                if (Node != null)
                    foreach (var node in Node.Nodes)
                    {
                        if (node is IFileProjectItemHandler nd)
                            if (nd.Item != itm && (nd.Item.ItemType == ItemType.Data || nd.Item.ItemType == ItemType.Generator))
                                nd.SetDefault(false);
                            else if (nd.Item == itm)
                                nd.SetDefault(true, true);
                    }

                isSetting = false;
                return true;
            }
            // u obsahového souboru je zapotřebí nastavit atribut výchozí formát
            else if (itm.ItemType == ItemType.Content)
            {
                DefaultFormat = itm.Section.FileNameOnly;
                if (!withoutSave)
                    ProjectService.SaveSolution();

                if (Node != null)
                    foreach (var node in Node.Nodes)
                        if (node is IFileProjectItemHandler nd)
                            if (nd.Item != itm && nd.Item.ItemType == ItemType.Content)
                                nd.SetDefault(false);

                isSetting = false;
                return true;
            }
            isSetting = false;
            return false;
        }

        string GetFileName(SsrProjectSection sps)
        {
            if (isArchiveCreating)
                return sps.FileNameOnly;
            int index = sps.FileName.IndexOf("..");

            if (index != -1)
                return sps.FileName.Substring(index);

            string tempDir = string.IsNullOrEmpty(solution.TemporaryDir) ? "" : Path.GetDirectoryName(solution.TemporaryDir);
            if (string.IsNullOrEmpty(tempDir) && !string.IsNullOrEmpty(solution.Directory))
                tempDir = solution.Directory;

            if (!Path.GetDirectoryName(sps.FileName).Equals(Directory, StringComparison.OrdinalIgnoreCase)
                && !Directory.Equals(tempDir, StringComparison.OrdinalIgnoreCase))
                return sps.FileName;

            return sps.FileNameOnly;
        }

        void FileFromProjectIsSaved(object sender, FileNameEventArgs e)
        {
            if (isSaving)
                return;

            if (Items.FirstOrNull(item => item.FileName.Equals(e.FileName, StringComparison.InvariantCultureIgnoreCase)) != null)
            {
                isSaving = true;
                Save();
                isSaving = false;
            }
        }

        /// <exclude/>
        internal void _SetDefault()
        {
            ThreadService.SafeThreadAsyncCall(delegate
            {
                dynamic def = null;
                foreach (var item in Node.Nodes)
                {
                    if (item is IFileProjectItemHandler nd)
                        if (nd.Item.ItemType == ItemType.Data || nd.Item.ItemType == ItemType.Generator)
                            def = nd;
                        else if (nd.Item.ItemType == ItemType.Content && nd.Item.VirtualName.Equals(DefaultFormat, StringComparison.OrdinalIgnoreCase))
                            nd.SetDefault(true, true);
                }
                if (def != null)
                    def.SetDefault(true, true);
            });
        }
    }
}
