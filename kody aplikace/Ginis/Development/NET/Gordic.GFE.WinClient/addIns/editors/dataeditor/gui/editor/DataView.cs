//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DataView.cs                            </Name>
//    <Description> Třída Data Editoru pro zobrazení obsahu datového souboru    </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2014-05-13                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.DefaultEditor;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.StructureView;
using Gordic.TextEditor;
using Gordic.TextEditor.Document;
using System;
using System.IO;
using System.Linq;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.DataEditor
{
    /// <summary>
    /// Třída Data Editoru pro zobrazení obsahu datového souboru
    /// </summary>
    class DataView : TextEditorDisplayBindingWrapper, IStructureHost
    {
        #region TextEditorDisplayBindingWrapper
        /// <summary>
        /// Načtení souboru
        /// </summary>
        /// <param name="file">otevřený soubor</param>
        /// <param name="stream">proud s obsahem</param>
        public override void Load(OpenedFile file, Stream stream)
        {
            if (file != PrimaryFile)
                throw new ArgumentException("file != PrimaryFile");

            if (!file.IsUntitled)
                textEditorControl.IsReadOnly = (File.GetAttributes(file.FileName) & FileAttributes.ReadOnly) == FileAttributes.ReadOnly;

            textEditorControl.LoadFile(file.FileName, stream, autoLoadHighlighting: false);
            ForceFoldingUpdate();
        }

        /// <exclude/>
        public override void Save(OpenedFile file, Stream stream)
        {
            if (CompilationService.Units[file] is CUData unit && unit.IsXml)
            {
                dataXmlView.Save(stream);
                return;
            }

            base.Save(file, stream);
        }
        #endregion

        #region IStructureHost
        StructureViewEntry structureEntry;
        /// <summary>
        /// Struktura
        /// </summary>
        public StructureViewEntry StructureEntry => structureEntry;
        #endregion

        /// <summary>
        /// metoda zjištění, zda daný soubor je podporován daným pohledem
        /// </summary>
        /// <param name="fileName">úplný název souboru</param>
        /// <param name="content">případný obsah souboru</param>
        /// <returns></returns>
        internal static bool CanCreateContent(string fileName, string content)
        {
            // Načti obsah pokud není poskytnut
            if (string.IsNullOrEmpty(content) && FileUtility.TestFileExists(fileName))
                content = FileReader.ReadFileContent(fileName);

            string extension = Path.GetExtension(fileName)?.ToLower();

            // Pro .tmp a .xml → POUZE content-based detection
            if (IsContentBasedExtension(extension))
                return IsValidContent(content);

            // Pro .dat a ostatní → kombinace (content NEBO extension)
            return IsValidContent(content) || IsFileNameHandled(fileName);
        }

        /// <summary>
        /// Kontroluje zda je přípona detekována pouze podle obsahu
        /// </summary>
        static bool IsContentBasedExtension(string extension) =>
            extension == ".tmp" || extension == ".xml";

        const string DATA_FILE_SIGNATURE = "ixs_xme|";

        /// <summary>
        /// metoda zjištění validnosti datového obsahu
        /// </summary>
        /// <param name="content">případný obsah souboru</param>
        /// <returns></returns>
        internal static bool IsValidContent(string content) =>
            !string.IsNullOrEmpty(content) && content.StartsWith(DATA_FILE_SIGNATURE);

        /// <summary>
        /// Indikuje, zda daný pohled může zpracovat specifický soubor
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        static bool IsFileNameHandled(string fileName) =>
            IsDataFileExtension(Path.GetExtension(fileName));
        static bool IsDataFileExtension(string extension) =>
            GetDataFileExtensions().Any(ext =>
                ext.Equals("*.*", StringComparison.Ordinal) ||
                ext.Equals(extension, StringComparison.OrdinalIgnoreCase));
        /// <summary>
        /// Získání známých datových přípon
        /// </summary>
        public static string[] GetDataFileExtensions()
        {
            var parser = AddInTree.BuildItems<ParserDescriptor>("/Workspace/Parser", null, false)
                .FirstOrDefault(p => p.Entity.Id == "DataFoldingParser");

            return parser?.Supportedextensions ?? new string[0];
        }

        DataXmlView dataXmlView;
        DataEditorControl DataControl => TextEditorControl as DataEditorControl;

        readonly bool isLoading = false;

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        /// <param name="file">Otevřený soubor</param>
        public override IViewContent Initialize(OpenedFile file)
        {
            base.Initialize(file);
            TabPageText = "data";
            _OnFileNameChanged(file);
            DataControl.EnableFolding = false;
            file.ForceInitializeView(this);
            RegisterEventHandlers();
            SetPads(file);
            return this;
        }

        /// <summary>
        /// Registruje event handlery
        /// </summary>
        void RegisterEventHandlers()
        {
            DataControl.Document.DocumentChanged += DocumentChanged;
            DataControl.ActiveTextAreaControl.TextArea.DragOver += EditorDragOver;
            DataControl.ActiveTextAreaControl.TextArea.DragDrop += EditorDragDrop;
            DataControl.ActiveTextAreaControl.Caret.PositionChanged += CaretUpdate;
        }

        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnění objektu</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                DisposeDataXmlView();
                UnregisterEventHandlers();
            }

            base.Dispose(disposing);
        }

        /// <summary>
        /// Uvolní dataXmlView
        /// </summary>
        void DisposeDataXmlView()
        {
            if (dataXmlView != null)
            {
                dataXmlView.Dispose();
                dataXmlView = null;
            }
        }

        /// <summary>
        /// Odregistruje event handlery
        /// </summary>
        void UnregisterEventHandlers()
        {
            StructureViewPad.Instance.ItemRefreshed -= SvpItemRefreshed;
            SimpleDesktop.Desktop.ActiveViewContentChanged -= SvpSelectedItemIndexChanged;
            StructureViewPad.Instance.SelectedItemIndexChanged -= SvpSelectedItemIndexChanged;

            if (DataControl != null)
            {
                DataControl.ActiveTextAreaControl.TextArea.DragDrop -= EditorDragDrop;
                DataControl.ActiveTextAreaControl.TextArea.DragOver -= EditorDragOver;
                DataControl.ActiveTextAreaControl.Caret.PositionChanged -= CaretUpdate;
            }
        }
        /// <summary>
        /// Vytvoření textového editora návrháře
        /// </summary>
        protected override ReportDesignerTextAreaControl CreateRDTextAreaControl() => new DataEditorControl(this);

        void SetPads(OpenedFile file)
        {
            CreateStructureEntry(file);
            CUData unit = InitializeCompilationUnit(file);
            ConfigureCompilationUnit(unit);
            RegisterStructureViewHandlers();
            CreateSecondaryXmlView(unit);

            if (unit.IsXml)
            {
                PrimaryFile.InLoadOperation = true;
                this.ReplaceAll(string.Empty);
                PrimaryFile.InLoadOperation = false;
            }
        }

        /// <summary>
        /// Vytvoří structure entry
        /// </summary>
        void CreateStructureEntry(OpenedFile file)
        {
            StructureViewEntry.Create(ref structureEntry, file);
            if (structureEntry?.Structure != null)
                structureEntry.Structure.MouseDoubleClick += MouseDoubleClick;
        }

        /// <summary>
        /// Inicializuje compilation unit
        /// </summary>
        CUData InitializeCompilationUnit(OpenedFile file)
        {
            CompilationService.InitializeUnit(file);

            if (!(CompilationService.Units[file] is CUData unit))
                unit = new CUData { OpenedFile = file };

            return unit;
        }

        /// <summary>
        /// Nakonfiguruje compilation unit
        /// </summary>
        void ConfigureCompilationUnit(CUData unit)
        {
            unit.IsArchive = true;
            unit.UpdateContent(DataControl.Text);
            unit.StructureViewEntry = structureEntry;
            unit.Compiled += delegate
            {
                if (!string.IsNullOrEmpty(unit.FileContent.Content))
                    this.ReplaceAll(unit.FileContent.Content);
            };
        }

        /// <summary>
        /// Registruje handlery pro structure view
        /// </summary>
        void RegisterStructureViewHandlers()
        {
            StructureViewPad.Instance.SelectedItemIndexChanged += SvpSelectedItemIndexChanged;
            StructureViewPad.Instance.ItemRefreshed += SvpItemRefreshed;
            SimpleDesktop.Desktop.ActiveViewContentChanged += SvpSelectedItemIndexChanged;
        }

        /// <summary>
        /// Vytvoří sekundární XML view
        /// </summary>
        void CreateSecondaryXmlView(CUData unit)
        {
            dataXmlView = new DataXmlView();
            dataXmlView.Initialize(this, unit);
            SecondaryViewContents.Add(dataXmlView);
        }

        void MouseDoubleClick(object sender, MouseEventArgs e)
        {
            //StructureViewTree svt = sender as StructureViewTree;

            //if (svt != null)
            //{
            //    StructExtNode sen = svt.SelectedNode as StructExtNode;
            //    if (sen != null && sen.DataItem != null && sen.DataItem.PreviewValue != null)
            //    {
            //        if (dataControl.ActiveTextAreaControl.TextArea.SelectionManager.HasSomethingSelected)
            //        {
            //            ISelection sel = dataControl.ActiveTextAreaControl.TextArea.SelectionManager.SelectionCollection.First();
            //            dataControl.Document.Replace(sel.Offset, sel.Length, sen.DataItem.PreviewValue);
            //        }
            //        else
            //            dataControl.Document.Insert(dataControl.ActiveTextAreaControl.Caret.Offset, sen.DataItem.PreviewValue);
            //    }
            //}
        }
        /// <summary>
        /// Nahrazení celého XML textu daným
        /// </summary>
        /// <param name="xml">Daný XML text</param>
        void ReplaceAll(dynamic xml)
        {
            DataControl.Document.Replace(0, DataControl.Document.TextLength, xml);
            XmlService.UpdateFolding(DataControl);
        }
        void SvpSelectedItemIndexChanged(object sender, EventArgs e)
        {
            if (structureEntry == null && IsActiveViewContent())
                CreateStructureEntryIfNeeded();
        }

        /// <summary>
        /// Kontroluje, zda je tento view aktivní
        /// </summary>
        bool IsActiveViewContent() =>
            SimpleDesktop.Desktop.ActiveViewContent != null &&
            PrimaryFile == SimpleDesktop.Desktop.ActiveViewContent.PrimaryFile;

        /// <summary>
        /// Vytvoří structure entry pokud je potřeba
        /// </summary>
        void CreateStructureEntryIfNeeded()
        {
            StructureViewEntry.Create(ref structureEntry, PrimaryFile);
            if (structureEntry?.Structure != null)
                structureEntry.Structure.MouseDoubleClick += MouseDoubleClick;

            if (CompilationService.Units[PrimaryFile] is CUData cu && structureEntry != null)
                cu.StructureViewEntry = structureEntry;
        }
        void SvpItemRefreshed(object sender, EventArgs e)
        {
            structureEntry?.Refresh();
        }
        /// <exclude/>
        void DocumentChanged(object sender, DocumentEventArgs e)
        {
            if (isLoading)
                return;

            PrimaryFile?.MakeDirty();

            ThreadService.SafeThreadAsyncCall(() =>
            {
                try
                {
                    if (CompilationService.Units.ContainsKey(PrimaryFile))
                        CompilationService.Units[PrimaryFile].UpdateContent(e.Document.TextContent);
                }
                catch { }
            });
        }
        /// <exclude/>
        void CaretUpdate(object sender, EventArgs e)
        {
            CaretChanged(sender, e);
            CaretModeChanged(sender, e);
        }
        /// <exclude/>
        void CaretChanged(object sender, EventArgs e)
        {
            TextAreaControl activeTextAreaControl = DataControl.ActiveTextAreaControl;
            int line = activeTextAreaControl.Caret.Line, col = activeTextAreaControl.Caret.Column;
            StatusBarService.SetCaretPosition(activeTextAreaControl.TextArea.TextView.GetVisualColumn(line, col) + 1, line + 1, col + 1);
            ThreadService.SafeThreadAsyncCall(StructureShowArrows, line, col);
        }
        void StructureShowArrows(int line, int column)
        {
            if (structureEntry == null)
                return;

            if (!(CompilationService.Units[PrimaryFile] is CUData cu && cu.StructureViewEntry is StructureViewEntry svEntry))
                return;

            string lineText = DataControl.Document.GetText(DataControl.Document.GetLineSegment(line));
            string[] regName = lineText.Split('|');

            if (regName.Length == 0)
                return;

            int position = CalculateFieldPosition(regName, column);
            svEntry.SelectNode(regName.First().Trim(), position - 1);
        }

        /// <summary>
        /// Vypočítá pozici pole na základě sloupce
        /// </summary>
        static int CalculateFieldPosition(string[] fields, int column)
        {
            int len = 0;
            int position = 0;

            foreach (var field in fields)
            {
                if (column > len)
                    len += field.Length + 1;
                else
                {
                    if (column < len)
                        position--;
                    break;
                }
                position++;
            }

            return position;
        }
        /// <summary>
        /// Změna režimu posuvníka
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        void CaretModeChanged(object sender, EventArgs e)
        {
            StatusBarService.SetInsertMode(DataControl.ActiveTextAreaControl.Caret.CaretMode == CaretMode.InsertMode);
        }
        void EditorDragOver(object sender, DragEventArgs drgevent)
        {
            if (drgevent.Data.GetDataPresent(typeof(StructExtNode))
                || drgevent.Data.GetDataPresent(typeof(string)))
                drgevent.Effect = DragDropEffects.Copy;
        }
        void EditorDragDrop(object sender, DragEventArgs drgevent)
        {
            if (drgevent.Data.GetData(typeof(StructExtNode)) is StructExtNode node)
            {
                DataControl.ActiveTextAreaControl.TextArea.InsertString(LocalCommonService.GetTextDataForData(node));
                XmlService.UpdateFolding(DataControl);
            }
        }
    }
}
