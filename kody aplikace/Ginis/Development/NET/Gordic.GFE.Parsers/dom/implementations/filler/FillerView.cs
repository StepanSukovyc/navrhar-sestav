//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DefaultFillerView.cs                     </Name>
//    <Description> Třída pro zobrazení formulářů                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-28                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.General;
using Gordic.TextEditor.Document;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Výchozí třída pro práci s formuláři
    /// </summary>
    public class FillerView : DefaultTextEditorWrapper, ICustomizedCommands
    {
        #region ICustomizedCommands
        /// <summary>
        /// Uložení sestavy
        /// </summary>
        /// <returns></returns>
        public bool SaveCommand()
        {
            return true;
            //return project != null ? Save(new EventHandlerOpenedFileArgument(SaveFile.Save), project.Save)
            //    : Save(new EventHandlerOpenedFileArgument(SaveFile.Save));
        }
        /// <summary>
        /// Uložení sestavy
        /// </summary>
        /// <returns></returns>
        public bool SaveAsCommand()
        {
            return true;
            //return project != null ? Save(new EventHandlerOpenedFileArgument(SaveFile.Save), project.SaveAs)
            //    : Save(new EventHandlerOpenedFileArgument(SaveFileAs.Save));
        }
        internal bool Save(EventHandlerOpenedFileArgument fileServiceEventHandler, EventHandler eventHandler = null)
        {
            try
            {
                //CompilationUnit unit = (CompilationUnit)CompilationService.Units[PrimaryFile];

                //if (SimpleDesktop.Desktop.ActiveViewContent is GrfViewContent && PrimaryFile.IsDirty)
                //    CompilationService.Units[PrimaryFile].Compile(SimpleDesktop.Desktop.ActiveViewContent as GrfViewContent);

                //string oldName = PrimaryFileName;

                //if (PrimaryFile.IsUntitled)
                //    // po uložení textové části souboru
                //    eventHandler.Invoke();
                //else
                //    // po uložení textové části souboru
                //    eventHandler.Invoke();

                //FileInfo fi = new FileInfo(PrimaryFileName);
                //string dest = FileUtility.Combine(fi.DirectoryName, Path.GetFileNameWithoutExtension(PrimaryFileName) + ".zip");
                //string source = string.IsNullOrEmpty(unit.ResourcesFile)
                //    ? FileUtility.Combine(fi.DirectoryName, Path.GetFileNameWithoutExtension(oldName) + ".zip")
                //    : null;

                //if (((!string.IsNullOrEmpty(source) && FileUtility.TestFileExists(source) && !source.Equals(dest, StringComparison.InvariantCultureIgnoreCase))
                //    || string.IsNullOrEmpty(source))
                //    && FileUtility.TestFileExists(dest))
                //    File.Delete(dest);

                //if (string.IsNullOrEmpty(unit.ResourcesFile))
                //{
                //    if (FileUtility.TestFileExists(source))
                //        // pouze zkopírujeme zip soubor
                //        File.Copy(source, dest);
                //}
                //else if (!string.IsNullOrEmpty(unit.ResourcesFile))
                //    // tato podmínka platí, pokud jsme se alespoň jednou přepli na záložku WORD dokumentu
                //    // a provedli změny
                //    File.Copy(unit.ResourcesFile, dest, true);

                return true;
            }
            catch (Exception ex)
            {
                MessageService.ShowError(ex);
                return false;
            }
        }
        /// <summary>
        /// Uložení souboru do databáze
        /// </summary>
        /// <returns>TRUE, pokud operace je dostupná</returns>
        public bool SaveToDatabaseCommand(EventHandlerOpenedFileArgument eventHandler) { return false; }
        #endregion

        IFiller project;
        /// <summary>
        /// Jazyk - vázaný na dané zobrazení
        /// </summary>
        static readonly string Language = "ALF-GRF";
        bool ignoreReplace;

        string fileContent;
        /// <summary>
        /// Zdrojový soubor, ze kterého byla vytvořená jednotka.
        /// </summary>
        public string FileContent
        {
            get { return fileContent; }
            set
            {
                fileContent = value;
                if (!ignoreReplace)
                    ReplaceAll(fileContent);
            }
        }

        GFEStructure structure;
        /// <summary>
        /// Přidružená datová struktura
        /// </summary>
        public GFEStructure Structure { get { return structure; } }

        DefaultViewContent grfControl;

        /// <summary>
        /// Správce dat
        /// </summary>
        public DefaultDataManager DataManager { get; set; }

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        /// <param name="file">primární soubor zobrazení</param>
        /// <param name="project">projekt souboru zobrazení</param>
        public override IViewContent Initialize(OpenedFile file, IFiller project)
        {
            base.Initialize(file, project);
            ignoreReplace = true;
            this.project = project;
            TabPageText = GResources.GetResourceText(29450305); //RC 29450305 : Datový soubor

            textEditor.Dock = DockStyle.Fill;
            textEditor.Document.DocumentChanged += DocumentChanged;

            _OnFileNameChanged(file);
            // vytvoříme datovou structuru
            // musí být před načtením textu
            GetOrCreateStructure(project.StructureSection);

            DataManager = new DefaultDataManager(structure, project);
            textEditor.Document.HighlightingStrategy = HighlightingManager.Manager.FindHighlighter(Language);
            file.ForceInitializeView(this);
            DataManager.Encoding = PrimaryFile != null ? PrimaryFile.Encoding : System.Text.Encoding.UTF8;
            ignoreReplace = false;
            SetCompilationUnit(file);

            if (project.FormatFile != null)
                if (project.FormatFile.Items.Count != 0)
                {
                    string fileName = FileUtility.Combine(project.FormatFile.Items[0].Location, project.FormatFile.Items[0].Name);

                    if (FileUtility.TestFileExists(fileName))
                    {
                        grfControl = new DefaultViewContent();
                        grfControl.Initialize(this);
                        grfControl.FormFile = FileService.GetOrCreateOpenedFile(fileName);
                        SecondaryViewContents.Add(grfControl);
                    }
                }
            return this;
        }
        /// <summary>
        /// Data
        /// </summary>
        public byte[] FileData { get { return textEditor.Encoding.GetBytes(Text); } }

        /// <summary>
        /// Po změně dokumentu se volá daná metoda.
        /// Označí otevřený soubor pohledu jako pozměněný
        /// </summary>
        /// <param name="sender">Objekt volaný</param>
        /// <param name="e">Argument metody</param>
        protected void DocumentChanged(object sender, DocumentEventArgs e)
        {
            if (PrimaryFile != null)
            {
                PrimaryFile.MakeDirty();
                FileContent = e.Document.TextContent;
            }
        }

        void SetCompilationUnit(OpenedFile opendFile)
        {
            if (opendFile != null)
            {
                ignoreReplace = true;
                FileContent = textEditor.Text;
                ignoreReplace = false;
            }
        }
        void GetOrCreateStructure(ProjectSection structureSection)
        {
            if (structureSection != null)
                if (structureSection.Items.Count != 0)
                {
                    string fileName = FileUtility.Combine(structureSection.Items[0].Location, structureSection.Items[0].Name);

                    if (FileUtility.TestFileExists(fileName))
                        structure = GFEStructure.LoadFromFile(fileName); //StructureViewEntry.GetOrCreate(fileName);
                }
        }

    }
}
