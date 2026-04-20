//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GfrmProject.cs                         </Name>
//    <Description> Projekt formuláře                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-12                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using Gordic.General;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.WinClient.Project.Templates;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.WinClient.AddIns;

namespace Gordic.GFE.WinClient.GfrmBinding
{
    /// <summary>
    /// třída SRZ sestavení
    /// </summary>
    class GfrmSolution : Solution { }

    /// <summary>
    /// Projekt formuláře
    /// </summary>
    class GfrmProject : BaseProject
    {
        string cachedDirectoryName;
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
                    if (string.IsNullOrEmpty(cachedDirectoryName))
                        try { cachedDirectoryName = Path.GetDirectoryName(this.FileName); }
                        catch (Exception) { cachedDirectoryName = ""; }
                    return cachedDirectoryName;
                }
            }
        }

        List<ProjectSection> dataFiles;
        /// <summary>
        /// Indikuje, že projekt lze spustit
        /// </summary>
        public override bool IsStartable => true;
        /// <summary>
        /// Jazyk porjektu
        /// </summary>
        public override string ProjectType => "GFRM";
        /// <summary>
        /// Vlastností jazyka
        /// </summary>
        public override LanguageProperties LanguageProperties => LanguageProperties.None;

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public GfrmProject() { }

        /// <summary>
        /// inicializace třídy
        /// </summary>
        public override IProject Initialize()
        {
            dataFiles = new List<ProjectSection>();
            return base.Initialize();
        }

        /// <summary>
        /// inicializace třídy dle parametrů
        /// </summary>
        /// <param name="names">parametry inicializace: první je název souboru projektu; druhý je název samotného projektu</param>
        public override IProject Initialize(params string[] names)
        {
            base.Initialize(names);

            Name = names[1];
            project = new TempProject(names[0]);
            return (project.TemporaryDir != null && project.TemporaryDir.Error == null)
                ? LoadProject(names[0])
                : throw new ProjectLoadException(project.TemporaryDir != null ? project.TemporaryDir.Error : GResources.GetResourceText(GResources.GetResourceText(2945177))); //RC 2945177 : Chyba načtení projektu: nelze vytvořit dočasnou složku
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
        /// Získání výchozího typu položky
        /// </summary>
        /// <param name="fileName">Název souboru položky</param>
        /// <returns>Výchozí typ položky</returns>
        public override ItemType GetDefaultItemType(string fileName)
        {
            return (string.Equals(".gfrm", Path.GetExtension(fileName), StringComparison.InvariantCultureIgnoreCase)) ? ItemType.Archive: base.GetDefaultItemType(fileName);
        }

        /// <summary>
        /// Interní načtení projektu
        /// </summary>
        /// <param name="fileName">Název projektu</param>
        protected override void LoadProjectInternal(string fileName)
        {
            base.LoadProjectInternal(fileName);

            // zjistíme koncovky datových souborů projektu
            List<string> dataFilter = ProjectService.GetExtensions("/ReportDesigner/Desktop/OpenDataFilter");
            // vytvoříme složku do které nasypeme soubory archivu
            cachedDirectoryName = project.TemporaryDir.Path;
            List<string> alfFilter = new List<string>();

            foreach (FileInfo item in (project.TemporaryDir.GetFiles()))
            {
                ProjectSection ps = new ProjectSection(item.Name, GetDefaultItemType(item.Name)); //GfrmService.ReadSection(item);
                if (item.Extension.Equals(".alf", StringComparison.OrdinalIgnoreCase))
                    alfFilter.Add(Path.GetFileNameWithoutExtension(item.FullName));
                //ProjectSections.Add(new SsrProjectSection(item as GSsrFile, GetDefaultItemType((item as GSsrFile).Name)));
                if (ps.SectionType != ItemType.Archive || !alfFilter.Contains(Path.GetFileNameWithoutExtension(item.FullName)))
                {
                    ProjectSections.Add(ps);
                    if (dataFilter.Contains('*' + item.Extension))
                        dataFiles.Add(ps);
                }
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
            return new FileProjectItem(this, item.SectionType, item.Name);
        }

        /// <summary>
        /// Spuštění projektu
        /// </summary>
        public override void Start()
        {
            foreach (ProjectSection item in ProjectSections)
                switch (item.SectionType.ToString())
                {
                    case "Data":
                    case "Structure":
                        FileAgent.OpenFile(FileUtility.Combine(project.TemporaryDir.Path, item.Name), false, false);
                        break;
                    case "Content":
                        FileAgent.OpenFile(FileUtility.Combine(project.TemporaryDir.Path, item.Name), true, false);
                        break;
                    default:
                        break;
                }
        }

        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        public override void Dispose()
        {
            FileUtility.FileSaved -= FileFromProjectIsSaved;
            base.Dispose();
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
        public override void AfterLabelEdit(AfterFileNodeEditEventArgs eventArgs)
        {
            if (eventArgs.FileNode != null)
            {
                // je nutné změnit název archivu (pokud existuje)
                string ext = Path.GetExtension(eventArgs.OldName);
                if (ext.Equals(".alf", StringComparison.OrdinalIgnoreCase))
                {
                    string oldArchName = Path.Combine(Path.GetDirectoryName(eventArgs.OldName), Path.GetFileNameWithoutExtension(eventArgs.OldName) + ".zip");
                    if (File.Exists(oldArchName))
                    {
                        string newArchName = Path.Combine(Path.GetDirectoryName(eventArgs.FileNode.FileName), Path.GetFileNameWithoutExtension(eventArgs.FileNode.FileName) + ".zip");
                        FileService.CopyFile(oldArchName, newArchName, false, true);
                        FileAgent.RemoveFile(oldArchName, false);

                        base.AfterLabelEdit(eventArgs);
                    }
                }
                else
                    base.AfterLabelEdit(eventArgs);
            }
        }
        /// <exclude/>
        public override bool SetDefault(ProjectItem item, bool withoutSave = false, bool forceSave = false) { return true; }

        /// <summary>
        /// uložení dokumentu
        /// některé projekty potřebuji provést další operace
        /// </summary>
        /// <param name="fileName">název ukládaného souboru</param>
        protected override void OnSaving(string fileName)
        {
            if (project != null && project.TemporaryDir != null)
                // teď všechny položky zazipujeme do souboru fileName
                GZip.ZipDirectoryContent(project.TemporaryDir.Path, fileName);
        }
    }
}
