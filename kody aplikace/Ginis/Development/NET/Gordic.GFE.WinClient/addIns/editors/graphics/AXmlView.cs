//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.AbstractXmlViewContent.cs              </Name>
//    <Description> Abstractní třída primárního zobrazení sestavy               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2013-06-10                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Database;
using Gordic.GFE.WinClient.DefaultEditor;
using Gordic.GFE.WinClient.Editor;
using Gordic.GFE.WinClient.FileCommands;
using Gordic.GFE.WinClient.InfoSectionView;
using Gordic.GFE.WinClient.LinkedFiles;
using Gordic.GFE.WinClient.Service;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.StructureView;
using Gordic.GFE.WinClient.VariablesView;
using Gordic.GFE.WinClient.XmlEditor;
using Gordic.GFE.WinClient.XmlEditor.Gui.Editor;
using Gordic.TextEditor;
using Gordic.TextEditor.Document;
using System;
using System.IO;
using System.Linq;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.Gui
{
    /// <summary>
    /// Abstractní třída primárního zobrazení sestavy
    /// </summary>
    class AXmlView : XmlView, IStructureHost, IInfoSectionHost, IMementoCapable, ICustomizedCommands, IToolsHost
    {
        #region XmlView
        /// <exclude/>
        protected override void _OnFileNameChanged(OpenedFile file)
        {
            base._OnFileNameChanged(file);
            lXmlEditor.Document.HighlightingStrategy = HighlightingManager.Manager.FindHighlighter(Language);
        }
        /// <exclude/>
        public override void Save(OpenedFile file, System.IO.Stream stream)
        {
            TextService.SetLastModif(lXmlEditor.Document);
            InfoSectionViewPad.Instance.RefreshInfoSection(infoSectionEntry, file, lXmlEditor.Document.TextContent);
            base.Save(file, stream);
        }
        /// <exclude/>
        public override bool SwitchFromThisWithoutSaveLoad(OpenedFile file, Parsers.Gui.IViewContent newView)
        {
            InfoSectionViewPad.Instance.RefreshInfoSection(infoSectionEntry, file, lXmlEditor.Document.TextContent);
            return base.SwitchFromThisWithoutSaveLoad(file, newView);
        }

        /// <exclude />
        public override bool CanSafelySwitchFromThisView
        {
            get
            {
                // Pokud nemáme editor nebo dokument, lze přepnout
                if (lXmlEditor?.Document?.TextContent == null)
                    return true;

                // Validace XML obsahu
                if (!IsXmlValid(out string errorMessage, out int errorLine, out int errorColumn))
                {
                    // Upravíme řádek podle typu chyby (missing delimiter detection)
                    int adjustedLine = AdjustErrorLine(errorLine, errorMessage);

                    // Nastavíme kurzor na skutečnou pozici chyby
                    SetCursorToError(adjustedLine, errorColumn);

                    // XML není validní - zobrazíme hlášku a zakážeme přepnutí
                    // (Hlášku zobrazíme s PŮVODNÍM číslem řádku od parseru)
                    MessageService.ShowWarning(
                        GResources.GetResourceText(2945205) + //RC 2945205 : $"Nelze přepnout na jiný pohled.;;
                        GResources.GetResourceText(2945206) + errorMessage); //RC 2945206 : $"Textový obsah není validní XML:;
                    return false;
                }

                // XML je validní - lze přepnout
                return true;
            }
        }

        /// <summary>
        /// Validuje XML obsah textového editoru
        /// </summary>
        /// <param name="errorMessage">Chybová hláška pokud validace selže</param>
        /// <param name="errorLine">Číslo řádku s chybou (1-based)</param>
        /// <param name="errorColumn">Pozice ve sloupci (1-based)</param>
        /// <returns>True pokud je XML validní, jinak false</returns>
        bool IsXmlValid(out string errorMessage, out int errorLine, out int errorColumn)
        {
            errorMessage = null;
            errorLine = 0;
            errorColumn = 0;

            try
            {
                string xmlContent = lXmlEditor.Document.TextContent;

                // Prázdný obsah považujeme za validní
                if (string.IsNullOrWhiteSpace(xmlContent))
                    return true;

                // Pokus o načtení XML
                var xmlDoc = new System.Xml.XmlDocument();
                xmlDoc.LoadXml(xmlContent);

                return true;
            }
            catch (System.Xml.XmlException ex)
            {
                // XML chyba - vrátíme detaily
                errorLine = ex.LineNumber;
                errorColumn = ex.LinePosition;
                errorMessage = $"Řádek {errorLine}, pozice {errorColumn}: {ex.Message}";
                return false;
            }
            catch (Exception ex)
            {
                // Jiná chyba
                errorMessage = ex.Message;
                return false;
            }
        }

        /// <summary>
        /// Nastaví kurzor na pozici chyby v editoru a zvýrazní chybný řádek
        /// </summary>
        /// <param name="line">Číslo řádku (1-based)</param>
        /// <param name="column">Pozice ve sloupci (1-based)</param>
        void SetCursorToError(int line, int column)
        {
            if (_RdEditor?.ActiveTextAreaControl?.TextArea == null)
                return;

            try
            {
                var textArea = _RdEditor.ActiveTextAreaControl.TextArea;
                var document = textArea.Document;

                // XmlException vrací 1-based indexy
                // TextArea.Caret.Line je 0-based
                int targetLine = Math.Max(0, line - 1);
                int targetColumn = Math.Max(0, column - 1);

                // DEBUG LOG
                LoggingService.Debug($"XML Error Position: Line={line}, Column={column} (1-based from XmlException)");
                LoggingService.Debug($"TextArea Target (initial): Line={targetLine}, Column={targetColumn} (converted to 0-based)");
                LoggingService.Debug($"TextArea Total Lines: {document.TotalNumberOfLines}");

                // Ověření, že řádek existuje
                if (targetLine < document.TotalNumberOfLines)
                {
                    // Nastavení pozice kurzoru
                    textArea.Caret.Line = targetLine;
                    textArea.Caret.Column = targetColumn;

                    // Zvýraznění celého řádku (selection)
                    SelectErrorLine(textArea, targetLine);

                    LoggingService.Debug($"Caret set to: Line={textArea.Caret.Line}, Column={textArea.Caret.Column}");

                    // Posun viewportu, aby byl chybný řádek viditelný
                    textArea.ScrollToCaret();

                    // Nastavení focus na editor
                    textArea.Focus();
                }
                else
                {
                    LoggingService.Error($"Target line {targetLine} is out of range (max: {document.TotalNumberOfLines - 1})");
                }
            }
            catch (Exception ex)
            {
                // Pokud nastavení kurzoru selže, nezabráníme validaci
                LoggingService.Error($"Nepodařilo se nastavit kurzor na pozici chyby: {ex.Message}");
            }
        }

        /// <summary>
        /// Analyzuje XML chybu a určí skutečný řádek s problémem
        /// </summary>
        /// <param name="reportedLine">Řádek hlášený XmlException (1-based)</param>
        /// <param name="errorMessage">Chybová hláška</param>
        /// <returns>Upravený řádek (1-based)</returns>
        int AdjustErrorLine(int reportedLine, string errorMessage)
        {
            LoggingService.Debug($"AdjustErrorLine: reportedLine={reportedLine}, errorMessage={errorMessage}");

            // PRIORITA 1: Attribute errors (=, whitespace) → chyba je na REPORTOVANÉM řádku
            string[] attributeErrorPatterns = 
            {
                "'='",
                "Expecting white space",
                "Whitespace is required"
            };

            foreach (var pattern in attributeErrorPatterns)
            {
                if (errorMessage.Contains(pattern))
                {
                    LoggingService.Debug($"✓ Attribute error '{pattern}' → using reported line {reportedLine}");
                    return reportedLine;
                }
            }

            // PRIORITA 2: Missing delimiter (>, ") → chyba je na PŘEDCHOZÍM řádku
            string[] missingDelimiterPatterns = 
            {
                "expected '>'",
                "'>' expected",
                "unexpected '<'",
                "Name cannot begin"
            };

            foreach (var pattern in missingDelimiterPatterns)
            {
                if (errorMessage.Contains(pattern))
                {
                    int adjustedLine = Math.Max(1, reportedLine - 1);
                    LoggingService.Debug($"✓ Delimiter error '{pattern}' → line {reportedLine} - 1 = {adjustedLine}");
                    return adjustedLine;
                }
            }

            LoggingService.Debug($"✗ No pattern → using reported line {reportedLine}");
            return reportedLine;
        }

        /// <summary>
        /// Zvýrazní celý chybný řádek pomocí selection
        /// </summary>
        /// <param name="textArea">Text area editoru</param>
        /// <param name="lineNumber">Číslo řádku (0-based)</param>
        void SelectErrorLine(Gordic.TextEditor.TextArea textArea, int lineNumber)
        {
            try
            {
                var document = textArea.Document;

                // Získání informací o řádku
                var lineSegment = document.GetLineSegment(lineNumber);
                if (lineSegment == null)
                    return;

                LoggingService.Debug($"Selecting line: Number={lineNumber}, Length={lineSegment.Length}");

                // Vytvoření TextLocation pro začátek a konec řádku
                var startLocation = new Gordic.TextEditor.TextLocation(0, lineNumber);
                var endLocation = new Gordic.TextEditor.TextLocation(lineSegment.Length, lineNumber);

                // Nastavení selection (zvýraznění) celého řádku
                textArea.SelectionManager.ClearSelection();
                textArea.SelectionManager.SetSelection(
                    new Gordic.TextEditor.Document.DefaultSelection(
                        document,
                        startLocation,
                        endLocation
                    )
                );

                // Refresh editoru pro zobrazení selection
                textArea.Refresh();
            }
            catch (Exception ex)
            {
                LoggingService.Debug($"Nepodařilo se zvýraznit řádek: {ex.Message}");
            }
        }

        /// <summary>
        /// Získání textového ovladače
        /// </summary>
        /// <returns></returns>
        protected override TextEditorControl CreateTextAreaControl() { return new ReportDesignerTextAreaControl(); }
        /// <summary>
        /// editor návrháře
        /// </summary>
        protected ReportDesignerTextAreaControl _RdEditor => lXmlEditor as ReportDesignerTextAreaControl;
        #endregion

        #region IStructureHost
        StructureViewEntry structureEntry;
        /// <summary>
        /// Struktura
        /// </summary>
        public StructureViewEntry StructureEntry => structureEntry;
        #endregion

        #region IInfoSectionHost
        /// <summary>
        /// indikuje možnost editace infosekce
        /// </summary>
        public bool ISEnableEdit => false;

        InfoSectionViewEntry infoSectionEntry;
        /// <summary>
        /// Struktura
        /// </summary>
        public InfoSectionViewEntry InfoSectionEntry => infoSectionEntry;

        /// <summary>
        /// volá se po změně InfoSekce
        /// </summary>
        /// <param name="sender">objekt, který spustil událost</param>
        /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
        public virtual void OnInfoPropertyChanged(object sender, EventArgs e) { }
        #endregion

        #region IMementoCapable
        /// <exclude/>
        public override void SetMemento(Property memento)
        {
            base.SetMemento(memento);
            if (_GraphicView is IMementoCapable mementoCapable)
                mementoCapable.SetMemento(memento.Get(CategoryName, new Property()));
        }
        /// <exclude/>
        public override Property CreateMemento()
        {
            Property memento = base.CreateMemento();
            if (_GraphicView is IMementoCapable mementoCapable)
                memento.Set(CategoryName, mementoCapable.CreateMemento());

            // uložení typu sestavy
            RecentOpenFile file = Services.FileAgent.RecentOpen.RecentFileOrProject.FirstOrNull(rof => rof.Path.Equals(PrimaryFileName, StringComparison.InvariantCultureIgnoreCase));
            if (file != null)
                file.Set("formation", CategoryName);

            return memento;
        }
        #endregion

        #region ICustomizedCommands
        /// <summary>
        /// Uložení sestavy
        /// </summary>
        /// <returns></returns>
        public bool SaveCommand()
        {
            if (!PrimaryFile.IsDatabase)
                return Save(new EventHandlerOpenedFileArgument(SaveFile.Save));
            else
            {
                DatabaseService.ObservedSave();
                return true;
            }
        }
        bool isSaveAs;
        /// <summary>
        /// Uložení sestavy
        /// </summary>
        /// <returns></returns>
        public bool SaveAsCommand()
        {
            PrimaryFile.IsDatabase = false;
            isSaveAs = true;
            bool result = Save(new EventHandlerOpenedFileArgument(SaveFileAs.Save));
            isSaveAs = false;
            return result;
        }
        bool Save(EventHandlerOpenedFileArgument eventHandler)
        {
            try
            {
                if (PrimaryFile.CancelSaving)
                    PrimaryFile.CancelSaving = false;

                string oldName = GetOldFileName();

                if (!isSaveAs && IsAlfFile())
                    PrimaryFile.FileName = _GetNewAlfxName();

                if (!PrimaryFile.CancelSaving)
                {
                    PerformSaveOperation(eventHandler, oldName);
                }

                HandleSaveCancellation();
                return true;
            }
            catch (ErrorFileNameException ex) { LoggingService.Error(ex); return true; }
            catch (Exception ex) { MessageService.ShowError(ex); }
            return false;
        }

        /// <summary>
        /// Získá původní název souboru před uložením
        /// </summary>
        string GetOldFileName() => FileUtility.TestFileExists(PrimaryFileName) ? PrimaryFileName : PrimaryFile.ContentFileName;

        /// <summary>
        /// Kontroluje, zda je soubor ALF formátu
        /// </summary>
        bool IsAlfFile() => Path.GetExtension(PrimaryFileName).Equals(".alf", StringComparison.InvariantCultureIgnoreCase);

        /// <summary>
        /// Provede vlastní operaci uložení souboru
        /// </summary>
        void PerformSaveOperation(EventHandlerOpenedFileArgument eventHandler, string oldName)
        {
            // po uložení textové části souboru
            eventHandler.Invoke(PrimaryFile);

            if (!PrimaryFile.CancelSaving)
                // uložíme archiv - pomocné soubory kopírujeme
                PrimaryFile.CopyArchive(oldName);

            if (!PrimaryFile.CancelSaving)
                ShowSaveMessage();
        }

        /// <summary>
        /// Zobrazí hlášku o úspěšném uložení
        /// </summary>
        void ShowSaveMessage()
        {
            if (!PrimaryFile.IsDatabase && ReportDesignerProperties.Instance.AlfShowSaveMessage)
                MessageService.ShowMessage(Path.GetFileName(PrimaryFileName), GResources.GetResourceText(29450025)); //RC 29450025 : Soubor uložen
            else
                StatusBarService.SetMessage($"{GResources.GetResourceText(29450025)}: {Path.GetFileName(PrimaryFileName)}"); //RC 29450025 : Soubor uložen
        }

        /// <summary>
        /// Zpracuje zrušení operace uložení
        /// </summary>
        void HandleSaveCancellation()
        {
            if (PrimaryFile.CancelSaving)
            {
                MessageService.ShowWarning(GResources.GetResourceText(29450085)); //RC 29450085 : Operace uložení zrušená!
                PrimaryFile.CancelSaving = false;
            }
        }

        /// <summary>
        /// Uložení souboru do databáze
        /// </summary>
        /// <returns>TRUE, pokud operace je dostupná</returns>
        public bool SaveToDatabaseCommand(EventHandlerOpenedFileArgument eventHandler)
        {
            PrimaryFile.IsDatabase = true;
            Save(eventHandler);
            //string oldName = PrimaryFileName;
            //bool oldDB = PrimaryFile.IsDatabase;
            //PrimaryFile.IsDatabase = true;
            //if (Save(eventHandler))
            //{
            //    PrimaryFile.FileName = oldName;
            //    return true;
            //}
            //else
            //{
            //    PrimaryFile.IsDatabase = oldDB;
            //    return false;
            //}
            return true;
        }
        #endregion

        #region IToolsHost
        /// <summary>
        /// nástrojová lišta
        /// </summary>
        public object ToolsControl => _RdEditor?.ToolsControl;
        #endregion

        protected AGraphicViewContent _GraphicView;
        /// <summary>
        /// grafický pohled primárního pohledu
        /// </summary>
        public virtual AGraphicViewContent GraphicView => _GraphicView;

        /// <summary>
        /// instance abstraktní třídy XML pohledu na obsah
        /// </summary>
        protected static AXmlView _Instance;

        /// <summary>
        /// pracovní oblast
        /// </summary>
        TextArea TextArea => _RdEditor?.ActiveTextAreaControl?.TextArea;

        /// <summary>
        /// prázdný konstruktor třídy
        /// </summary>
        public AXmlView() { }

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        public override IViewContent Initialize()
        {
            base.Initialize();
            Language = "XML";
            TabPageText = GResources.GetResourceText(29450086); //RC 29450086 : Zdrojový kód

            lXmlEditor = CreateTextAreaControl();
            _RdEditor.Dock = DockStyle.Fill;
            _RdEditor.Document.DocumentChanged += pDocumentChanged;
            return this;
        }

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        /// <param name="textEditorProperties">vlastnosti textového editoru</param>
        public virtual IViewContent Initialize(ITextEditorProperties textEditorProperties)
        {
            base.Initialize();
            _Instance = this;
            TabPageText = GResources.GetResourceText(29450086); //RC 29450086 : Zdrojový kód

            _RdEditor.TextEditorProperties = textEditorProperties;
            //textArea.DragDrop += editorDragDrop;
            //textArea.DragOver += editorDragOver;
            return this;
        }

        /// <summary>
        /// nastavení standardních sekundárních pohledů
        /// </summary>
        protected void _SetStandardSecContent()
        {
            if (lXmlTreeView == null)
            {
                SecondaryViewContents.Add(_GraphicView);
                lXmlTreeView = new XmlTreeView();
                lXmlTreeView.Initialize(this);
                SecondaryViewContents.Add(lXmlTreeView);
            }
            else
                secondaryViewContentCollection.Insert(0, _GraphicView);

            lXmlTreeView.Visible = ReportDesignerProperties.Instance.TabVisibilityTree;
            _GraphicView.Visible = ReportDesignerProperties.Instance.TabVisibilityDesign;

            Visible = ReportDesignerProperties.Instance.TabVisibilityCode;
        }
        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnění objektu</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                UnregisterEventHandlers();
            }
            base.Dispose(disposing);
        }

        /// <summary>
        /// Odregistruje event handlery
        /// </summary>
        void UnregisterEventHandlers()
        {
            StructureViewPad.Instance.ItemRefreshed -= SvpItemRefreshed;
            SimpleDesktop.Desktop.ActiveViewContentChanged -= SvpSelectedItemIndexChanged;
            StructureViewPad.Instance.SelectedItemIndexChanged -= SvpSelectedItemIndexChanged;
        }

        /// <summary>
        /// nastavení oken dle primárního souboru
        /// </summary>
        /// <param name="file">primární soubor</param>
        protected void _SetPads(OpenedFile file)
        {
            CreateViewEntries(file);
            CompilationUnit unit = InitializeCompilationUnit(file);
            ConfigureCompilationUnit(unit, file);
            RegisterEventHandlers();
            ThreadService.SafeThreadCall(ValidateAlf, false);
        }

        /// <summary>
        /// Vytvoří view entries pro strukturu a info sekci
        /// </summary>
        void CreateViewEntries(OpenedFile file)
        {
            StructureViewEntry.Create(ref structureEntry, file);
            InfoSectionViewEntry.Create(ref infoSectionEntry, file);
        }

        /// <summary>
        /// Inicializuje compilation unit
        /// </summary>
        CompilationUnit InitializeCompilationUnit(OpenedFile file)
        {
            CompilationService.InitializeUnit(file);

            CompilationUnit unit = CompilationService.Units[file] as CompilationUnit;
            if (unit == null)
                unit = new CompilationUnit();

            return unit;
        }

        /// <summary>
        /// Nakonfiguruje compilation unit
        /// </summary>
        void ConfigureCompilationUnit(CompilationUnit unit, OpenedFile file)
        {
            if (unit.OpenedFile == null && file != null)
                unit.OpenedFile = file;

            unit.IsArchive = true;
            unit.UpdateContent(lXmlEditor.Text);
            unit.StructureViewEntry = structureEntry;
            unit.InfoSectionEntry = infoSectionEntry;
            unit.Compiled += delegate
            {
                if (!string.IsNullOrEmpty(unit.FileContent.Content))
                    this.ReplaceAll(unit.XmlDocPosition, _GraphicView.Visible ? _GraphicView.ServiceSelection : null);
            };
        }

        /// <summary>
        /// Registruje event handlery pro structure view
        /// </summary>
        void RegisterEventHandlers()
        {
            StructureViewPad.Instance.SelectedItemIndexChanged += SvpSelectedItemIndexChanged;
            StructureViewPad.Instance.ItemRefreshed += SvpItemRefreshed;
            SimpleDesktop.Desktop.ActiveViewContentChanged += SvpSelectedItemIndexChanged;
        }

        void SvpSelectedItemIndexChanged(object sender, EventArgs e)
        {
            if (structureEntry == null && IsActiveViewContent())
            {
                CreateStructureEntryIfNeeded();
            }
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
            if (CompilationService.Units[PrimaryFile] is CompilationUnit cu && structureEntry != null)
                cu.StructureViewEntry = structureEntry;
        }
        void SvpItemRefreshed(object sender, EventArgs e)
        {
            structureEntry?.Refresh();
            _GraphicView?.RefreshItem();
        }
        protected override void EditorDragOver(object sender, DragEventArgs drgevent)
        {
            if (IsSupportedDragDataType(drgevent))
                drgevent.Effect = DragDropEffects.Copy;
        }

        /// <summary>
        /// Kontroluje, zda typ dat je podporovaný pro drag and drop
        /// </summary>
        bool IsSupportedDragDataType(DragEventArgs drgevent)
        {
            Type[] supportedTypes = 
            {
                typeof(StructExtNode),
                typeof(LFExtNode),
                typeof(string),
                typeof(VarExtNode),
                typeof(ReportDesignerSideTabItem)
            };

            return supportedTypes.Any(type => drgevent.Data.GetDataPresent(type));
        }
        protected override void EditorDragDrop(object sender, DragEventArgs drgevent)
        {
            if (TryGetDragData<StructExtNode>(drgevent, out var structNode))
            {
                TextArea.InsertString(LocalCommonService.GetText(structNode.FullName));
            }
            else if (TryGetDragData<LFExtNode>(drgevent, out var lfNode))
            {
                TextArea.InsertString(LocalCommonService.GetText(lfNode.FullName, Path.DirectorySeparatorChar));
            }
            else if (drgevent.Data.GetDataPresent(typeof(string)))
                TextArea.InsertString(LocalCommonService.GetText((((string)drgevent.Data.GetData(typeof(string))).Split(';').Last())));
            else if (TryGetDragData<VarExtNode>(drgevent, out var varNode))
                TextArea.InsertString(LocalCommonService.GetText(varNode));
            else if (TryGetDragData<ReportDesignerSideTabItem>(drgevent, out var sideTabItem))
                TextArea.InsertString(sideTabItem.Tag.ToString());
        }

        /// <summary>
        /// Pomocná metoda pro získání dat z DragEventArgs s kontrolou typu
        /// </summary>
        bool TryGetDragData<T>(DragEventArgs drgevent, out T result) where T : class
        {
            result = null;
            if (drgevent.Data.GetDataPresent(typeof(T)))
            {
                result = drgevent.Data.GetData(typeof(T)) as T;
                return result != null;
            }
            return false;
        }
    }
}
