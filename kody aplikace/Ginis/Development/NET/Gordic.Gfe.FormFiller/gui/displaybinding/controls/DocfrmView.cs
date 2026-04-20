//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.View.cs                                  </Name>
//    <Description> Třída pro zobrazení GRF sestav                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.Gfe.FormFiller.AddIns;
using Gordic.Gfe.FormFiller.DefaultEditor;
using Gordic.Gfe.FormFiller.FileCommands;
using Gordic.TextEditor.Document;
using Gordic.Gfe.FormFiller.StructureView;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Core.Services;
using Gordic.General;
using System.Linq;

namespace Gordic.Gfe.FormFiller.Gui
{
    /// <summary>
    /// Třída pro zobrazení GRF sestav
    /// </summary>
    class DocfrmView : TextEditorDisplayBindingWrapper, IStructureHost, ICustomizedCommands, IDataManagerHandler
    {
        #region IStructureHost
        StructureViewEntry structureViewEntry;
        /// <summary>
        /// Struktura
        /// </summary>
        public StructureViewEntry StructureViewEntry { get { return structureViewEntry; } }
        #endregion

        #region ICustomizedCommands
        /// <summary>
        /// Uložení sestavy
        /// </summary>
        /// <returns></returns>
        public bool SaveCommand()
        {
            return project != null ? Save(new EventHandlerOpenedFileArgument(SaveFile.Save), project.Save)
                : Save(new EventHandlerOpenedFileArgument(SaveFile.Save));
        }
        /// <summary>
        /// Uložení sestavy
        /// </summary>
        /// <returns></returns>
        public bool SaveAsCommand()
        {
            return project != null ? SaveAs(new EventHandlerOpenedFileArgument(SaveFile.Save), project.SaveAs)
                : Save(new EventHandlerOpenedFileArgument(SaveFileAs.Save));
        }
        bool Save(EventHandlerOpenedFileArgument fileServiceEventHandler, EventHandler projectEventHandler = null)
        {
            try
            {
                DocfrmCompilationUnit unit = (DocfrmCompilationUnit)CompilationService.Units[PrimaryFile];

                if (SimpleDesktop.Desktop.ActiveViewContent is DocfrmViewContent && PrimaryFile.IsDirty)
                    CompilationService.Units[PrimaryFile].Compile(SimpleDesktop.Desktop.ActiveViewContent as DocfrmViewContent);

                // po uložení textové části souboru
                fileServiceEventHandler.Invoke(PrimaryFile);

                if (projectEventHandler != null)
                    projectEventHandler.Invoke(this, EventArgs.Empty);
                return true;
            }
            catch (Exception ex)
            {
                MessageService.ShowError(ex);
                return false;
            }
        }
        bool SaveAs(EventHandlerOpenedFileArgument fileServiceEventHandler, EventHandlerFillerSaveAs projectEventHandler = null)
        {
            try
            {
                DocfrmCompilationUnit unit = (DocfrmCompilationUnit)CompilationService.Units[PrimaryFile];

                if (SimpleDesktop.Desktop.ActiveViewContent is DocfrmViewContent && PrimaryFile.IsDirty)
                    CompilationService.Units[PrimaryFile].Compile(SimpleDesktop.Desktop.ActiveViewContent as DocfrmViewContent);

                // po uložení textové části souboru
                fileServiceEventHandler.Invoke(PrimaryFile);

                if (projectEventHandler != null)
                    projectEventHandler.Invoke(this, new EventArgsFillerSaveAs(null, false));
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

        #region IMementoCapable
        /// <exclude/>
        public override void SetMemento(Property memento)
        {
            if (memento != null)
                base.SetMemento(memento);
            if (grfControl is IMementoCapable)
                (grfControl as IMementoCapable).SetMemento(memento != null 
                    ? memento.Get("GraphicsView", new Property())
                    : new Property());
        }

        /// <exclude/>
        public override Property CreateMemento()
        {
            Property memento = base.CreateMemento();
            if (grfControl is IMementoCapable)
                memento.Set("GraphicsView", (grfControl as IMementoCapable).CreateMemento());
            return memento;
        }
        #endregion

        #region IDataManagerHandler
        /// <summary>
        /// správce dostupných dat
        /// </summary>
        public DefaultDataManager DataManager { get; set; }
        /// <summary>
        /// data formuláře
        /// </summary>
        public byte[] FileData {
            get {
                // Some encodings, may require byte order mark (BOM).
                // If byte order mark is not required, empty byte array is returned. 
                var bom = textEditorControl.Encoding.GetPreamble();
                var bytes = textEditorControl.Encoding.GetBytes(Text);
                return bom.Concat(bytes).ToArray();
            } 
        }
        /// <summary>
        /// Zdrojový soubor, ze kterého byla vytvořená jednotka.
        /// </summary>
        public string FileContent
        {
            get { return Text; }
            set { Text = value; }
        }
        /// <summary>
        /// Přidružená datová struktura
        /// </summary>
        public GFEStructure Structure { get { return structureViewEntry?.Structure; } }
        #endregion

        string propertyKey;
        /// <summary>
        /// Klíč vlastnosti
        /// </summary>
        public override string PropertyKey { get { return propertyKey; } }

        /// <summary>
        /// Jazyk - vázaný na dané zobrazení
        /// </summary>
        public static readonly string Language = "ALF-GRF";

        DocfrmViewContent grfControl;
        IFiller project;
        IFiller IDataManagerHandler.Filler { get { return project; } }

        public override IViewContent Initialize(OpenedFile file, IFiller project)
        {
            base.Initialize(file, project);
            this.project = project;
            TabPageText = GResources.GetResourceText(29450058); //RC 29450058 : Datový soubor
            propertyKey = FileUtility.NormalizePath(project.FileName);
            TextEditorDisplayBinding.InitializeSyntaxModes();

            textEditorControl.Dock = DockStyle.Fill;
            textEditorControl.TextEditorProperties = FormFillerTextEditorProperties.Instance;
            textEditorControl.Document.DocumentChanged += DocumentChanged;
            textEditorControl.Document.HighlightingStrategy = HighlightingManager.Manager.FindHighlighter(Language);

            _OnFileNameChanged(file);
            Visible = false;
            return this;
        }

        /// <summary>
        /// "otevření" (načtení všech potřebných dat) pohledu
        /// </summary>
        public void Open()
        {
            var file = _Files[0];

            // vytvoříme datovou structuru
            // musí být před načtením textu
            GetOrCreateStructure(project.StructureSection);

            DataManager = new DefaultDataManager(structureViewEntry.Structure, project);
            file.ForceInitializeView(this);
            SetCompilationUnit(file);
            DataManager.Encoding = PrimaryFile != null ? PrimaryFile.Encoding : System.Text.Encoding.UTF8;
            if (project.FormatFile != null)
                if (project.FormatFile.Items.Count != 0)
                {
                    string fileName = FileUtility.Combine(project.FormatFile.Items[0].Location, project.FormatFile.Items[0].Name);

                    if (FileUtility.TestFileExists(fileName))
                    {
                        grfControl = new DocfrmViewContent();
                        grfControl.Initialize(this);
                        SecondaryViewContents.Add(grfControl);
                        if (grfControl is IFormFormation)
                            (grfControl as IFormFormation).FormFile = FileAgent.GetOrCreateOpenedFile(fileName);
                    }
                }
        }
        void GetOrCreateStructure(ProjectSection structureSection)
        {
            if (structureSection != null)
                if (structureSection.Items.Count != 0)
                {
                    string fileName = FileUtility.Combine(structureSection.Items[0].Location, structureSection.Items[0].Name);

                    if (FileUtility.TestFileExists(fileName))
                        structureViewEntry = StructureViewEntry.GetOrCreate(fileName);
                }
        }
        void SetCompilationUnit(OpenedFile opendFile)
        {
            if (opendFile != null)
            {
                CompilationService.InitializeUnit(opendFile);
                AlfCompilationUnit unit = new DocfrmCompilationUnit(opendFile);
                unit.UpdateContent(textEditorControl.Text);
                unit.StructureViewEntry = structureViewEntry;
                unit.AfterCompile += delegate
                {
                    if (!string.IsNullOrEmpty(unit.FileContent.Content))
                        this.ReplaceAll(unit.FileContent.Content);
                };
                
                CompilationService.Units[opendFile] = unit;
            }
        }

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
                if (CompilationService.Units.ContainsKey(PrimaryFile))
                    CompilationService.Units[PrimaryFile].UpdateContent(e.Document.TextContent);
                //DataManager.ReloadData(textEditor.Encoding.GetBytes(e.Document.TextContent));
            }
        }

        /// <summary>
        /// Indikuje, zda daný pohled může zpracovat specifický soubor
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        public static bool IsFileNameHandled(string fileName)
        {
            return IsGfrmFileExtension(Path.GetExtension(fileName));
        }

        static bool IsGfrmFileExtension(string extension)
        {
            foreach (string currentExtension in GetGfrmFileExtensions())
                if (String.Compare(extension, currentExtension, true) == 0)
                    return true;
            return false;
        }
        static string[] GetGfrmFileExtensions()
        {
            foreach (ParserDescriptor parser in AddInTree.BuildItems<ParserDescriptor>("/Workspace/Parser", null, false))
                if (parser.Entity.Id == "DocfrmFoldingParser")
                    return parser.Supportedextensions;

            // v případě nenalezení RtfFoldingParser definujeme výchozí koncovky
            IHighlightingStrategy strategy = HighlightingManager.Manager.FindHighlighter(DocfrmView.Language);
            if (strategy != null)
                return strategy.Extensions;

            return new string[0];
        }

        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnění objektu</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
                ServiceManager.GraphicSettingService.RemoveItem(this);

            base.Dispose(disposing);
        }
    }
}
