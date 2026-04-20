//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.XmlView.cs                             </Name>
//    <Description> Třída XmlEditoru pro zobrazení souborů vázaných na xml formát</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.addins.editors.texteditor.xmlFormatting;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.Parsers.DefaultEditor;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.XmlEditor;
using Gordic.GFE.WinClient.DefaultEditor;
using Gordic.GFE.WinClient.Editor;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Gui.Dialogs;
using Gordic.GFE.WinClient.MessageView;
using Gordic.GFE.WinClient.Services;
using Gordic.TextEditor;
using Gordic.TextEditor.Actions;
using Gordic.TextEditor.Document;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Drawing;
using System.Drawing.Printing;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Windows.Forms;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Schema;
using System.Xml.XPath;
using System.Xml.Xsl;

namespace Gordic.GFE.WinClient.XmlEditor.Gui.Editor
{
    /// <summary>
    /// Třída XmlEditoru pro zobrazení souborů vázaných na xml formát
    /// </summary>
    class XmlView : DefaultAbstractViewContent, ITextEditorControlProvider, IEditable, IClipboardHandler, IParseInformationListener, IMementoCapable, IPrintable, IPositionable, IUndoHandler
    {
        string language;
        /// <summary>
        /// Jazyk - vázaný na dané zobrazení
        /// </summary>
        public string Language { get => language; set => language = value; }
        /// <summary>
        /// Jazyk - vázaný na dané zobrazení
        /// </summary>
        public static string LanguageStat;

        /// <summary>
        /// Název kategorie výstupního okna
        /// </summary>
        public string CategoryName { get; set; }

        /// <summary>
        /// Název kategorie výstupního okna
        /// </summary>
        public static string CategoryNameStat;

        /// <summary>
        /// Editovatelné operace pro ovladač daného editoru
        /// </summary>
        static string editActionsPath;
        /// <summary>
        /// Kontextové menu pro ovladax XML editoru
        /// </summary>
        protected static string _ContextMenuPath;
        /// <summary>
        /// editor obsahu
        /// </summary>
        protected TextEditorControl lXmlEditor;
        /// <summary>
        /// textový ovladač
        /// </summary>
        public XmlEditorControl XmlEditor { get => lXmlEditor as XmlEditorControl; set => lXmlEditor = value; }
        static MessageViewCategory category;
        string stylesheetFileName;
        /// <summary>
        /// jiné zobrazení obsahu
        /// </summary>
        protected XmlTreeView lXmlTreeView;

        /// <summary>
        /// Indikuje, že pro tento soubor má být použito XML highlighting (dle obsahu)
        /// </summary>
        bool useXmlHighlighting = false;


        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public XmlView() { }

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        /// <param name="file">Primární soubor zobrazení.</param>
        public override IViewContent Initialize(OpenedFile file)
        {
            base.Initialize(file);

            _OnFileNameChanged(file);
            file.ForceInitializeView(this);

            lXmlTreeView = new XmlTreeView();
            lXmlTreeView.Initialize(this);
            SecondaryViewContents.Add(lXmlTreeView);
            return this;
        }
        /// <summary>
        /// inicializace pohledu
        /// </summary>
        public override IViewContent Initialize()
        {
            base.Initialize();
            language = "XML";
            CategoryName = "XML";
            LanguageStat = "XML";
            CategoryNameStat = "XML";
            editActionsPath = "/AddIns/XmlEditor/EditActions";
            _ContextMenuPath = "/ReportDesigner/ViewContent/XmlEditor/ContextMenu";
            TabPageText = "XML";

            lXmlEditor = CreateTextAreaControl();
            if (XmlEditor != null)
            {
                XmlEditor.SchemaCompletionDataItems = XmlSchemaManager.SchemaCompletionDataItems;
                XmlEditor.AddEditActions(_GetEditActions());

                ContextMenuStrip strip = MenuService.CreateContextMenu(lXmlEditor, new EventArgsContextMenu(_ContextMenuPath));
                if (strip != null)
                    XmlEditor.TextAreaContextMenuStrip = strip;
            }

            lXmlEditor.Dock = DockStyle.Fill;
            lXmlEditor.TextEditorProperties = ReportDesignerTextEditorProperties.Instance;
            lXmlEditor.Document.DocumentChanged += pDocumentChanged;
            lXmlEditor.ActiveTextAreaControl.Caret.CaretModeChanged += pCaretModeChanged;
            lXmlEditor.ActiveTextAreaControl.Caret.PositionChanged += pCaretChanged;
            lXmlEditor.ActiveTextAreaControl.Enter += pCaretUpdate;

            // nasloucháme změnam ve vlastnostech xml editoru.
            XmlEditorAddInOptions.PropertyChanged += PropertyChanged;
            XmlSchemaManager.UserSchemaAdded += UserSchemaAdded;
            XmlSchemaManager.UserSchemaRemoved += UserSchemaRemoved;

            lXmlEditor.ActiveTextAreaControl.TextArea.DragDrop += EditorDragDrop;
            lXmlEditor.ActiveTextAreaControl.TextArea.DragOver += EditorDragOver;
            lXmlEditor.BeforeSave += lXmlEditor_BeforeSave;
            return this;
        }

        void lXmlEditor_BeforeSave(object sender, EventArgs e)
        {
            bool isCDATA = false;
            // save line per line to apply the LineTerminator to all lines
            // (otherwise we might save files with mixed-up line endings)
            foreach (LineSegment line in lXmlEditor.Document.LineSegmentCollection)
            {
                string text = string.Empty;
                text = lXmlEditor.Document.GetText(line.Offset, line.Length);
                if (isCDATA)
                {
                    string variable = text.Trim(' ').Trim('\t');
                    if (variable.Length > 0 && variable[0] == ' ')
                    {
                        text = text.Replace("\t", "    ");
                        lXmlEditor.Document.Replace(line.Offset, line.Length, text);
                    }
                }

                if (text.Contains("<![CDATA["))
                {
                    if (text.Contains("]]>"))
                    {
                        if (text.LastIndexOf("<![CDATA[") > text.LastIndexOf("]]>"))
                            isCDATA = true;
                    }
                    else isCDATA = true;
                }
                else if (isCDATA && text.Contains("]]>"))
                    isCDATA = false;
            }
        }

        protected virtual void EditorDragOver(object sender, DragEventArgs drgevent)
        {
            if (drgevent.Data.GetDataPresent(typeof(StructExtNode))
                || drgevent.Data.GetDataPresent(typeof(string)))
                drgevent.Effect = DragDropEffects.Copy;
        }

        protected virtual void EditorDragDrop(object sender, DragEventArgs drgevent)
        {
            if (drgevent.Data.GetDataPresent(typeof(StructExtNode)))
            {
                lXmlEditor.ActiveTextAreaControl.TextArea.InsertString(LocalCommonService.GetText_XmlStructure((StructExtNode)drgevent.Data.GetData(typeof(StructExtNode))));
                (new IndentSelection()).Execute(lXmlEditor.ActiveTextAreaControl.TextArea);
            }
            else if (drgevent.Data.GetDataPresent(typeof(string)))
                lXmlEditor.ActiveTextAreaControl.TextArea.InsertString(LocalCommonService.GetText((((string)drgevent.Data.GetData(typeof(string))).Split(';').Last())));
        }
        /// <summary>
        /// Získání textového ovladače
        /// </summary>
        /// <returns></returns>
        protected virtual TextEditorControl CreateTextAreaControl() => new XmlEditorControl();

        /// <summary>
        /// Aktivní XmlView.
        /// </summary>
        /// <returns><see langword="null"/> pokud aktivní okno není XmlView.</returns>
        public static XmlView ActiveXmlView
        {
            get
            {
                IDesktop desktop = SimpleDesktop.Desktop;
                if (desktop != null)
                {
                    IDesktopWindow window = desktop.ActiveDesktopWindow;
                    if (window != null)
                        return window.ActiveViewContent as XmlView;
                }
                return null;
            }
        }

        /// <summary>
        /// Indikuje, zda aktivní okno je XmlView.
        /// </summary>
        public static bool IsXmlViewActive { get => ActiveXmlView != null; }

        /// <summary>
        /// Indikuje, zda pohled je pouze pro čtení
        /// </summary>
        public override bool IsReadOnly => lXmlEditor == null || lXmlEditor.IsReadOnly;

        /// <exclude/>
        public override void MakeDirty()
        {
            base.MakeDirty();
            this.PrimaryFile.IsDirty = this.IsDirty;
        }

        /// <summary>
        /// Načtení obsahu do pohledu
        /// </summary>
        /// <param name="content">Obsah pro načtení</param>
        public void LoadContent(string content)
        {
            lXmlEditor.Document.TextContent = StringParser.Parse(content);
            lXmlEditor.Document.HighlightingStrategy = HighlightingStrategyFactory.CreateHighlightingStrategy(Language);
            XmlService.UpdateFolding(lXmlEditor);
        }

        /// <summary>
        /// Indikuje, zda lze vytvořit 'XML' obsah.
        /// </summary>
        /// <param name="pLanguage">Jazyk</param>
        public static bool IsLanguageHandled(string pLanguage) => pLanguage == XmlView.LanguageStat;
        /// <summary>
        /// Indikuje, zda daný pohled může zpracovat specifický soubor
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        public static bool IsFileNameHandled(string fileName) => IsXmlFileExtension(Path.GetExtension(fileName));

        static bool IsXmlFileExtension(string extension)
            => GetXmlFileExtensions().Any(ext => extension.Equals(ext, StringComparison.OrdinalIgnoreCase) || ext == "*.*");

        /// <summary>
        /// Získání známých XML koncovek
        /// </summary>
        public static string[] GetXmlFileExtensions()
        {
            foreach (ParserDescriptor parser in AddInTree.BuildItems<ParserDescriptor>("/Workspace/Parser", null, false))
                if (parser.Entity.Id == "XmlFoldingParser")
                    return parser.Supportedextensions;

            // v případě nenalezení XmlFoldingParser definujeme výchozí koncovky
            IHighlightingStrategy strategy = HighlightingManager.Manager.FindHighlighter(XmlView.LanguageStat);
            return (strategy != null) ? strategy.Extensions : new string[0];
        }

        /// <summary>
        /// Nalezení XML větví které odpovídají specifickému XPATH příkazu
        /// </summary>
        /// <returns></returns>
        public static XPathNodeMatch[] SelectNodes(string xml, string xpath, ReadOnlyCollection<XmlNamespace> namespaces)
        {
            XmlTextReader xmlReader = new XmlTextReader(new StringReader(xml))
            {
                XmlResolver = null
            };
            XPathDocument doc = new XPathDocument(xmlReader);
            XPathNavigator navigator = doc.CreateNavigator();

            // Add namespaces.
            XmlNamespaceManager namespaceManager = new XmlNamespaceManager(navigator.NameTable);
            foreach (XmlNamespace xmlNamespace in namespaces)
                namespaceManager.AddNamespace(xmlNamespace.Prefix, xmlNamespace.Uri);

            // spuštění xpath příkazu.
            XPathNodeIterator iterator = navigator.Select(xpath, namespaceManager);

            List<XPathNodeMatch> nodes = new List<XPathNodeMatch>();
            while (iterator.MoveNext())
                nodes.Add(new XPathNodeMatch(iterator.Current));
            return nodes.ToArray();
        }
        /// <summary>
        /// Nalezení xml větví odpovídajících specifickému XPATH.
        /// </summary>
        /// <returns></returns>
        public static XPathNodeMatch[] SelectNodes(string xml, string xpath)
        {
            List<XmlNamespace> list = new List<XmlNamespace>();
            return SelectNodes(xml, xpath, new ReadOnlyCollection<XmlNamespace>(list));
        }

        /// <summary>
        /// Nalezení xml větví ve stávajícím dokumentu, ketré odpovídajéí XPATH
        /// </summary>
        /// <returns></returns>
        public XPathNodeMatch[] SelectNodes(string xpath, ReadOnlyCollection<XmlNamespace> namespaces)
            => SelectNodes(Text, xpath, namespaces);

        /// <summary>
        /// Získání XmlSchemaObject definujícího aktivní vybraný element nebo atribut
        /// </summary>
        /// <param name="xml">Kompletní xml text.</param>
        /// <param name="index">Aktuální pozice kurzoru.</param>
        /// <param name="provider">POskytovatel dat pro doplnění</param>
        public static XmlSchemaObject GetSchemaObjectSelected(string xml, int index, XmlCompletionDataProvider provider)
            => GetSchemaObjectSelected(xml, index, provider, null);

        /// <summary>
        /// Získání XmlSchemaObject definujícího aktivní vybraný element nebo atribut
        /// </summary>
        /// <param name="xml">Kompletní xml text.</param>
        /// <param name="index">Aktuální pozice kurzoru.</param>
        /// <param name="provider">POskytovatel dat pro doplnění</param>
        /// <param name="currentSchemaCompletionData"></param>
        public static XmlSchemaObject GetSchemaObjectSelected(string xml, int index, XmlCompletionDataProvider provider, XmlSchemaCompletionData currentSchemaCompletionData)
        {
            // nalezení elemntu pod kurzorem.
            XmlElementPath path = XmlParser.GetActiveElementStartPathAtIndex(xml, index);
            string attributeName = XmlParser.GetAttributeNameAtIndex(xml, index);

            // nalezení schématu.
            XmlSchemaCompletionData schemaCompletionData = provider.FindSchema(path);
            XmlSchemaObject schemaObject = null;
            if (schemaCompletionData != null)
            {
                XmlSchemaElement element = schemaCompletionData.FindElement(path);
                schemaObject = element;
                if (element != null)
                {
                    if (attributeName.Length > 0)
                    {
                        XmlSchemaAttribute attribute = schemaCompletionData.FindAttribute(element, attributeName);
                        if (attribute != null)
                            schemaObject = currentSchemaCompletionData != null
                                ? GetSchemaObjectReferenced(xml, index, provider, currentSchemaCompletionData, element, attribute)
                                : attribute;
                    }
                    return schemaObject;
                }
            }
            return null;
        }

        /// <summary>
        /// Ověření XML přes znáe schématy.
        /// </summary>
        public void ValidateXml()
        {
            Category.ClearText();
            pShowOutputWindow();

            OutputWindowWriteLine("------ " + GResources.GetResourceText(29450205) + " ------"); //RC 29450205 : validace XML

            if (IsSchema)
            {
                if (!ValidateSchema())
                    return;
            }
            else
                if (!ValidateAgainstSchema())
                    return;

            OutputWindowWriteLine(String.Empty);
            OutputWindowWriteLine(StringParser.Parse(GResources.GetResourceText(29450108))); //RC 29450108 : validace proběhla úspěšně
            OutputWindowWriteLine("------ " + GResources.GetResourceText(29450206) + " ------"); //RC 29450206 : konec validace XML
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="showDialog">TRUE - zobrazení dialogu s výsledkem validace</param>
        public void ValidateAlf(bool showDialog)
        {
            if (Control is ReportDesignerTextAreaControl && this is GraphicView && (this as GraphicView).StructureEntry != null)
            {
                Category.ClearText();
                pShowOutputWindow();

                OutputWindowWriteLine("------ " + GResources.GetResourceText(29450805) + " ------"); //RC 29450205 : validace XML

                string alfText = ((ReportDesignerTextAreaControl)Control).Text;
                string fn = (this as GraphicView).StructureEntry.Structure.FileName;
                string fileStructure = FileReader.ReadFileContent(fn);

                if (fileStructure.IsWellFormedXML(out string s) && alfText.IsWellFormedXML(out s))
                {
                    XDocument formatDoc = XDocument.Parse(alfText);
                    XDocument structureDoc = XDocument.Parse(fileStructure);
                    XNamespace nsFormat = formatDoc.Root.GetDefaultNamespace();
                    XNamespace nsStructure = structureDoc.Root.GetDefaultNamespace();

                    var valueOfNames = formatDoc.Descendants(nsFormat + "value-of").Select(e => (string)e.Attribute("name")).Where(n => !string.IsNullOrEmpty(n)).ToList();
                    var itemNames = structureDoc.Descendants(nsStructure + "item").Select(e => (string)e.Attribute("name")).Where(n => !string.IsNullOrEmpty(n)).ToHashSet();

                    var unmatchedNames = valueOfNames.Where(name => !itemNames.Contains(name)).ToList();
                    if (unmatchedNames.Any())
                    {
                        OutputWindowWriteLine(GResources.GetResourceText(2945203)); //RC-EX 2945203 : Následující názvy nejsou ve struktuře definovány:
                        OutputWindowWriteLine(String.Empty);

                        StringBuilder sb = new StringBuilder();
                        sb.AppendLine(GResources.GetResourceText(2945203));
                        sb.AppendLine(String.Empty);

                        foreach (var name in unmatchedNames)
                        {
                            sb.AppendLine($" - {name}");
                            OutputWindowWriteLine($" - {name}");
                        }
                        ShowValidationFailedMessage();
                        if (showDialog)
                            MessageService.ShowWarning(sb.ToString());
                        return;
                    }
                    else
                    {
                        OutputWindowWriteLine(GResources.GetResourceText(2945204)); //RC 2945204 : Všechny názvy sedí.
                        if (showDialog)
                            MessageService.ShowWarning(GResources.GetResourceText(2945204));

                    }
                }

                OutputWindowWriteLine(String.Empty);
                OutputWindowWriteLine(StringParser.Parse(GResources.GetResourceText(29450108))); //RC 29450108 : validace proběhla úspěšně
                OutputWindowWriteLine("------ " + GResources.GetResourceText(29450140) + " ------"); //RC 29450206 : konec validace XML

            }
        }

        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnění objektu</param>
        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            if (disposing)
            {
                XmlEditorAddInOptions.PropertyChanged -= PropertyChanged;
                XmlSchemaManager.UserSchemaAdded -= UserSchemaAdded;
                XmlSchemaManager.UserSchemaRemoved -= UserSchemaRemoved;
                if (lXmlEditor != null)
                {
                    if (lXmlEditor.ActiveTextAreaControl.TextArea != null)
                    {
                        lXmlEditor.ActiveTextAreaControl.TextArea.DragDrop -= EditorDragDrop;
                        lXmlEditor.ActiveTextAreaControl.TextArea.DragOver -= EditorDragOver;
                    }

                    lXmlEditor.Dispose();
                    lXmlEditor = null;
                }
                if (lXmlTreeView != null)
                {
                    lXmlTreeView.Dispose();
                    lXmlTreeView = null;
                }
            }
        }

        /// <exclude/>
        protected override void _OnFileNameChanged(OpenedFile file)
        {
            base._OnFileNameChanged(file);

            string oldFileName = lXmlEditor.FileName;
            string newFileName = file.FileName;

            string extension = Path.GetExtension(newFileName);
            if (Path.GetExtension(oldFileName) != extension && lXmlEditor.Document.HighlightingStrategy != null)
            {
                // Pro .tmp/.xml soubory: highlighting je už nastavený v Load()
                // VŮBEC je tady nenastavuj!
                if (!IsContentBasedExtension(extension))
                {
                    lXmlEditor.Document.HighlightingStrategy = XmlView.IsXmlFileExtension(extension)
                        ? HighlightingStrategyFactory.CreateHighlightingStrategy(Language)
                        : HighlightingStrategyFactory.CreateHighlightingStrategyForFile(newFileName);
                    lXmlEditor.Refresh();
                }
            }
            pSetDefaultSchema(extension);

            lXmlEditor.FileName = newFileName;
        }

        /// <summary>
        /// Kontroluje zda je přípona detekována podle obsahu
        /// </summary>
        static bool IsContentBasedExtension(string extension)
        {
            string ext = extension?.ToLower();
            return ext == ".tmp";  // POUZE .tmp! (.xml je vždy XML)
        }

        /// <summary>
        /// Šablony stylů spojené s daným souborem.
        /// </summary>
        public string StylesheetFileName
        {
            get => stylesheetFileName;
            set { stylesheetFileName = value; }
        }

        /// <summary>
        /// Aplikuje šablonu stylu na XML a zobrazí výsledek
        /// </summary>
        /// <param name="xsl"></param>
        public void RunXslTransform(string xsl)
        {
            try
            {
                if (IsWellFormed && IsValidXsl(xsl))
                    try
                    {
                        string transformedXml = Transform(Text, xsl);
                        ShowTransformOutput(transformedXml);
                    }
                    catch (XsltException) { }
            }
            catch (Exception ex)
            {
                MessageService.ShowError(ex);
            }
        }
        /// <summary>
        /// Tisknutí XML.
        /// </summary>
        public void FormatXml()
        {
            if (IsWellFormed)
                ReplaceAll(Text);
        }
        /// <summary>
        /// Nalezení definice XML elementu nebo atributu pod kurzorem
        /// </summary>
        public void GoToSchemaDefinition()
        {
            XmlCompletionDataProvider provider = new XmlCompletionDataProvider(XmlEditor.SchemaCompletionDataItems, XmlEditor.DefaultSchemaCompletionData, XmlEditor.DefaultNamespacePrefix);
            XmlSchemaCompletionData currentSchemaCompletionData = provider.FindSchemaFromFileName(PrimaryFileName);
            XmlSchemaObject schemaObject = GetSchemaObjectSelected(Text, lXmlEditor.ActiveTextAreaControl.Caret.Offset, provider, currentSchemaCompletionData);

            // otevření schématu
            if (schemaObject != null && schemaObject.SourceUri != null && schemaObject.SourceUri.Length > 0)
            {
                string fileName = schemaObject.SourceUri.Replace("file:///", String.Empty);
                FileAgent.JumpToFilePosition(fileName, schemaObject.LineNumber - 1, schemaObject.LinePosition - 1);
            }
        }
        /// <summary>
        /// Nahrazení celého XML textu daným
        /// </summary>
        /// <param name="xml">Daný XML text</param>
        /// <param name="service"></param>
        public void ReplaceAll(dynamic xml, SelectionService service = null)
        {
            string formattedXml = replaceWithEncoding(XmlService.SimpleFormat(XmlService.IndentedFormat(xml, lXmlEditor.TextEditorProperties.ConvertTabsToSpaces, lXmlEditor.TextEditorProperties.IndentationSize), service));
            lXmlEditor.Document.Replace(0, lXmlEditor.Document.TextLength, formattedXml);

            if (lXmlEditor.Document.FormattingStrategy is XmlFormattingStrategy)
                (lXmlEditor.Document.FormattingStrategy as XmlFormattingStrategy).FormatLines(lXmlEditor.Document);

            XmlService.UpdateFolding(lXmlEditor);
        }

        string replaceWithEncoding(string dynamic)
            => dynamic != null ? dynamic.Replace("&amp;#", "&#") : dynamic;


        /// <summary>
        /// Vytvoření schématu založeného na XML obsahu
        /// </summary>
        /// <returns></returns>
        public string[] InferSchema()
        {
            if (IsWellFormed)
            {
                try
                {
                    using (XmlTextReader reader = new XmlTextReader(new StringReader(Text)))
                    {
                        XmlSchemaInference schemaInference = new XmlSchemaInference();
                        XmlSchemaSet schemaSet = schemaInference.InferSchema(reader);
                        return GetSchemas(schemaSet);
                    }
                }
                catch (XmlSchemaInferenceException) { }
            }
            return null;
        }

        #region IEditable
        /// <exclude/>
        public IClipboardHandler ClipboardHandler { get => this; }
        /// <exclude/>
        public bool EnableUndo { get => lXmlEditor.EnableUndo; }

        /// <exclude/>
        public bool EnableRedo { get => lXmlEditor.EnableRedo; }
        /// <summary>
        /// Získání textu
        /// </summary>
        /// <returns></returns>
        internal string GetText() => lXmlEditor?.Document.TextContent;

        /// <summary>
        /// Nastavení textu
        /// </summary>
        /// <param name="value">Nastavovaná hodnota</param>
        internal void SetText(string value)
        {
            lXmlEditor.Document.TextContent = value;
        }
        /// <summary>
        /// TExt
        /// </summary>
        public string Text
        {
            get => ThreadService.InvokeRequired ? ThreadService.SafeThreadFunction<string>(GetText) : GetText();
            set
            {
                if (ThreadService.InvokeRequired)
                    ThreadService.SafeThreadCall(SetText, value);
                else
                    SetText(value);
            }
        }
        /// <exclude/>
        public void Redo() { lXmlEditor.Redo(); }
        /// <exclude/>
        public void Undo() { lXmlEditor.Undo(); }
        #endregion

        #region AbstractViewContent

        /// <exclude/>
        public override object Control { get => lXmlEditor; }
        /// <exclude/>
        public override void Load(OpenedFile file, Stream stream)
        {
            if (!file.IsUntitled)
                lXmlEditor.IsReadOnly = FileUtility.IsFileReadOnly(file.FileName);

            string extension = Path.GetExtension(file.FileName);
            string loadFileName = file.ContentFileName;

            // Pro .tmp/.xml: detekuj obsah a možná použij .xml příponu
            if (IsContentBasedExtension(extension))
            {
                long position = stream.Position;
                using (StreamReader reader = new StreamReader(stream, System.Text.Encoding.UTF8, true, 1024, leaveOpen: true))
                {
                    string content = reader.ReadToEnd();
                    stream.Position = position;

                    if (ParserService.IsWellFormedXML(content, out string _))
                    {
                        // Použij .xml příponu pro LoadFile → automaticky nastaví XML highlighting
                        loadFileName = Path.ChangeExtension(file.ContentFileName, ".xml");
                        useXmlHighlighting = true;
                    }
                }
            }

            try
            {
                lXmlEditor.Encoding = GFileUtils.DetectEncoding(stream) ?? Encoding.UTF8;

                // LoadFile s autoLoadHighlighting=TRUE → nastaví highlighting podle loadFileName
                lXmlEditor.LoadFile(loadFileName, stream, true, false);
            }
            catch (Exception ex)
            {
                MessageService.ShowError(ex);
            }

            ValidateEncoding(file);
            XmlService.UpdateFolding(lXmlEditor);
        }

        void ValidateEncoding(OpenedFile file)
        {
            try
            {
                XmlTreeViewContainerControl treeViewContainer = new XmlTreeViewContainerControl();
                treeViewContainer.LoadXml(lXmlEditor.Text, null);
                var editorEncoding = lXmlEditor.Encoding.WebName;
                if (treeViewContainer.Document.FirstChild is XmlDeclaration decl)
                {
                    var declaredEncoding = Encoding.GetEncoding(decl.Encoding).WebName;
                    if (!declaredEncoding.Equals(editorEncoding, StringComparison.InvariantCultureIgnoreCase))
                        if (
                        MessageService.AskQuestion(string.Format(GResources.GetResourceText(29450667) + ':' + "\r\n" + GResources.GetResourceText(29450668) + " - '{0}'" + "\r\n" + GResources.GetResourceText(29450669) + " - '{1}'!", decl.Encoding, lXmlEditor.Encoding.WebName) //RC 29450669 : kódováno
                            + "\r\n"
                            + GResources.GetResourceText(29450670)))  //RC 29450670 : Přejete si změnit kódování?
                        {
                            lXmlEditor.Encoding = Encoding.GetEncoding(decl.Encoding);
                            lXmlEditor.TextEditorProperties.Encoding = Encoding.GetEncoding(decl.Encoding);
                            lXmlEditor.Text = XmlService.IndentedFormat(treeViewContainer.Document.OuterXml, lXmlEditor.TextEditorProperties.ConvertTabsToSpaces, lXmlEditor.TextEditorProperties.IndentationSize);
                            MakeDirty();
                        }
                }

                if (file != null)
                    file.Encoding = lXmlEditor.Encoding;
            }
            catch { }
        }

        /// <exclude/>
        public override void Save(OpenedFile file, Stream stream)
        {

            if (Language != "XML"
                && Path.GetExtension(file.FileName).Equals(".alfx", StringComparison.InvariantCultureIgnoreCase))
            {
                if (!Path.GetFileNameWithoutExtension(file.ContentFileName).Equals("main", StringComparison.InvariantCultureIgnoreCase))
                    file.ContentFileName = FileUtility.NormalizePath(string.Format("{0}\\main.alf", (new GFETempDir()).Path));

                string saveAs = file.ContentFileName + ".bak";
                using (FileStream fs = new FileStream(saveAs, FileMode.Create, FileAccess.ReadWrite))
                    lXmlEditor.SaveFile(fs);

                try
                {
                    if (FileUtility.TestFileExists(file.ContentFileName))
                        File.Delete(file.ContentFileName);

                    File.Move(saveAs, file.ContentFileName);
                }
                catch (UnauthorizedAccessException)
                {
                    // občas File.Move vyhodí chyb (TortoiseSVN, Anti-vir ?)
                    // zkusíme znovu po krátké přestavce
                    System.Threading.Thread.Sleep(250);

                    if (FileUtility.TestFileExists(file.ContentFileName))
                        File.Delete(file.ContentFileName);

                    File.Move(saveAs, file.ContentFileName);
                }
            }
            else
                lXmlEditor.SaveFile(stream);

            lXmlEditor.Refresh();
        }
        /// <exclude/>
        public override void SwitchToThisWithoutSaveLoad(OpenedFile file, IViewContent oldView)
        {
            base.SwitchToThisWithoutSaveLoad(file, oldView);
            if (PrimaryFile != null && PrimaryFile.CancelSaving)
                PrimaryFile.CancelSaving = false;
            if (oldView is IHost)
                ThreadService.SafeThreadAsyncCall(UpdateMarker, (oldView as IHost).ServiceSelection);
        }
        #endregion

        #region IClipboardHandler

        /// <exclude/>
        public bool EnableCut { get => lXmlEditor.ActiveTextAreaControl.TextArea.ClipboardHandler.EnableCut; }

        /// <exclude/>
        public bool EnableCopy { get => lXmlEditor.ActiveTextAreaControl.TextArea.ClipboardHandler.EnableCopy; }

        /// <exclude/>
        public bool EnablePaste { get => lXmlEditor.ActiveTextAreaControl.TextArea.ClipboardHandler.EnablePaste; }

        /// <exclude/>
        public bool EnableDelete { get => lXmlEditor.ActiveTextAreaControl.TextArea.ClipboardHandler.EnableDelete; }
        /// <exclude/>
        public bool EnableSelectAll { get => lXmlEditor.ActiveTextAreaControl.TextArea.ClipboardHandler.EnableSelectAll; }

        /// <exclude/>
        public void SelectAll()
        {
            lXmlEditor.ActiveTextAreaControl.TextArea.ClipboardHandler.SelectAll(null, EventArgs.Empty);
        }

        /// <exclude/>
        public void Delete()
        {
            lXmlEditor.ActiveTextAreaControl.TextArea.ClipboardHandler.Delete(null, EventArgs.Empty);
        }

        /// <exclude/>
        public void Paste()
        {
            lXmlEditor.ActiveTextAreaControl.TextArea.ClipboardHandler.Paste(null, EventArgs.Empty);
        }
        /// <exclude/>
        public void Copy()
        {
            lXmlEditor.ActiveTextAreaControl.TextArea.ClipboardHandler.Copy(null, EventArgs.Empty);
        }

        /// <exclude/>
        public void Cut()
        {
            lXmlEditor.ActiveTextAreaControl.TextArea.ClipboardHandler.Cut(null, EventArgs.Empty);
        }

        #endregion

        #region IParseInformationListener
        /// <exclude/>
        public void ParseInformationUpdated(ParseInformation parseInfo) { XmlService.UpdateFolding(lXmlEditor); }
        #endregion

        #region IMementoCapable

        /// <exclude/>
        public virtual void SetMemento(Property properties)
        {
            lXmlEditor.ActiveTextAreaControl.Caret.Position = lXmlEditor.Document.OffsetToPosition(Math.Min(lXmlEditor.Document.TextLength, Math.Max(0, properties.Get("CaretOffset", lXmlEditor.ActiveTextAreaControl.Caret.Offset))));

            if (lXmlEditor.Document.HighlightingStrategy.Name != properties.Get("HighlightingLanguage", lXmlEditor.Document.HighlightingStrategy.Name))
            {
                IHighlightingStrategy highlightingStrategy = HighlightingStrategyFactory.CreateHighlightingStrategy(properties.Get("HighlightingLanguage", lXmlEditor.Document.HighlightingStrategy.Name));
                if (highlightingStrategy != null)
                    lXmlEditor.Document.HighlightingStrategy = highlightingStrategy;
            }
            lXmlEditor.ActiveTextAreaControl.TextArea.TextView.FirstVisibleLine = properties.Get("VisibleLine", 0);
            lXmlEditor.Document.FoldingManager.DeserializeFromString(properties.Get("Foldings", String.Empty));
        }

        /// <exclude/>
        public virtual Property CreateMemento()
        {
            Property properties = new Property();
            properties.Set("CaretOffset", lXmlEditor.ActiveTextAreaControl.Caret.Offset);
            properties.Set("VisibleLine", lXmlEditor.ActiveTextAreaControl.TextArea.TextView.FirstVisibleLine);
            properties.Set("HighlightingLanguage", lXmlEditor.Document.HighlightingStrategy.Name);
            properties.Set("Foldings", lXmlEditor.Document.FoldingManager.SerializeToString());
            return properties;
        }

        #endregion

        #region IPrintable

        /// <exclude/>
        public PrintDocument PrintDocument { get => lXmlEditor.PrintDocument; }

        #endregion

        #region ITextEditorControlProvider

        /// <exclude/>
        public TextEditorControl TextEditorControl { get => lXmlEditor; }

        /// <exclude/>
        public IDocument GetDocumentForFile(OpenedFile file)
            => file == this.PrimaryFile ? this.TextEditorControl.Document : null;

        #endregion

        #region IPositionable

        /// <exclude/>
        public void JumpTo(int line, int column)
        {
            lXmlEditor.ActiveTextAreaControl.JumpTo(line, column);
        }

        /// <exclude/>
        public int Line { get => lXmlEditor.ActiveTextAreaControl.Caret.Line; }

        /// <exclude/>
        public int Column { get => lXmlEditor.ActiveTextAreaControl.Caret.Column; }

        #endregion

        MessageViewCategory Category
        {
            get
            {
                if (category == null)
                    MessageViewCategory.Create(ref category, CategoryNameStat);

                return category;
            }
        }

        bool IsSchema
        {
            get => Path.GetExtension(lXmlEditor.FileName)?.Equals(".xsd", StringComparison.OrdinalIgnoreCase) == true;
        }

        /// <exclude/>
        protected void pDocumentChanged(object sender, DocumentEventArgs e)
        {
            PrimaryFile?.MakeDirty();

            ThreadService.SafeThreadAsyncCall(delegate
            {
                try
                {
                    if (PrimaryFile != null && CompilationService.Units.ContainsKey(PrimaryFile))
                        CompilationService.Units[PrimaryFile].UpdateContent(e.Document.TextContent);
                }
                catch { }
            });
        }
        /// <exclude/>
        protected void pCaretUpdate(object sender, EventArgs e)
        {
            pCaretChanged(sender, e);
            pCaretModeChanged(sender, e);
        }
        /// <exclude/>
        protected void pCaretChanged(object sender, EventArgs e)
        {
            TextAreaControl activeTextAreaControl = lXmlEditor.ActiveTextAreaControl;
            int line = activeTextAreaControl.Caret.Line;
            int col = activeTextAreaControl.Caret.Column;
            StatusBarService.SetCaretPosition(activeTextAreaControl.TextArea.TextView.GetVisualColumn(line, col) + 1, line + 1, col + 1);
        }
        /// <summary>
        /// Změna režimu posuvníka
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void pCaretModeChanged(object sender, EventArgs e)
        {
            StatusBarService.SetInsertMode(lXmlEditor.ActiveTextAreaControl.Caret.CaretMode == CaretMode.InsertMode);
        }
        /// <summary>
        /// Zobrazení výstupního okna
        /// </summary>
        protected void pShowOutputWindow()
        {
            SimpleDesktop.Desktop.GetPad(typeof(CompilerMessageView)).BringPadToFront(SimpleDesktop.Desktop.DesktopLayout);
        }
        /// <summary>
        /// Nastavení výchozího schématu
        /// </summary>
        /// <param name="extension"></param>
        protected void pSetDefaultSchema(string extension)
        {
            if (XmlEditor != null)
            {
                XmlEditor.DefaultSchemaCompletionData = XmlSchemaManager.GetSchemaCompletionData(extension);
                XmlEditor.DefaultNamespacePrefix = XmlSchemaManager.GetNamespacePrefix(extension);
            }
        }

        static string Transform(string input, string transform)
        {
            StringReader inputString = new StringReader(input);
            XmlTextReader sourceDocument = new XmlTextReader(inputString);

            StringReader transformString = new StringReader(transform);
            XPathDocument transformDocument = new XPathDocument(transformString);

            XslCompiledTransform xslTransform = new XslCompiledTransform();
            xslTransform.Load(transformDocument, XsltSettings.TrustedXslt, new XmlUrlResolver());

            MemoryStream outputStream = new MemoryStream();
            XmlTextWriter writer = new XmlTextWriter(outputStream, Encoding.UTF8);

            xslTransform.Transform(sourceDocument, null, writer);

            int preambleLength = Encoding.UTF8.GetPreamble().Length;
            byte[] outputBytes = outputStream.ToArray();
            return UTF8Encoding.UTF8.GetString(outputBytes, preambleLength, outputBytes.Length - preambleLength);
        }
        static string GetFileNameFromInnerException(Exception ex, string defaultFileName)
            => ex.InnerException is XmlException innerException && !string.IsNullOrEmpty(innerException.SourceUri)
                ? innerException.SourceUri.Replace("file:///", string.Empty)
                : defaultFileName;

        static string GetInnerExceptionErrorMessage(Exception ex) => ex.InnerException != null ? ex.InnerException.Message : ex.Message;

        bool IsWellFormed
        {
            get
            {
                try
                {
                    XmlDocument Document = new XmlDocument();
                    Document.LoadXml(Text);
                    return true;
                }
                catch (XmlException) { }
                catch (WebException) { }
                return false;
            }
        }
        bool IsValidXsl(string xml)
        {
            try
            {
                SimpleDesktop.Desktop.GetPad(typeof(CompilerMessageView)).BringPadToFront(SimpleDesktop.Desktop.DesktopLayout);

                StringReader reader = new StringReader(xml);
                XPathDocument doc = new XPathDocument(reader);

                XslCompiledTransform xslTransform = new XslCompiledTransform();
                xslTransform.Load(doc, XsltSettings.Default, new XmlUrlResolver());

                return true;
            }
            catch (Exception ex) { LoggingService.Error(ex.Message); }

            return false;
        }
        bool ValidateAgainstSchema()
        {
            try
            {
                StringReader stringReader = new StringReader(lXmlEditor.Document.TextContent);
                XmlTextReader xmlReader = new XmlTextReader(stringReader)
                {
                    XmlResolver = null
                };
                XmlReaderSettings settings = new XmlReaderSettings
                {
                    ValidationType = ValidationType.Schema,
                    ValidationFlags = XmlSchemaValidationFlags.None,
                    XmlResolver = null
                };

                XmlSchemaCompletionData schemaData = null;
                try
                {
                    for (int i = 0; i < XmlSchemaManager.SchemaCompletionDataItems.Count; ++i)
                    {
                        schemaData = XmlSchemaManager.SchemaCompletionDataItems[i];
                        settings.Schemas.Add(schemaData.Schema);
                    }
                }
                catch (XmlSchemaException ex)
                {
                    DisplayValidationError(schemaData.FileName, ex.Message, ex.LinePosition - 1, ex.LineNumber - 1);
                    ShowValidationFailedMessage();
                    return false;
                }

                XmlReader reader = XmlReader.Create(xmlReader, settings);

                XmlDocument doc = new XmlDocument();
                doc.Load(reader);
                return true;

            }
            catch (XmlSchemaException ex)
            {
                DisplayValidationError(lXmlEditor.FileName, ex.Message, ex.LinePosition - 1, ex.LineNumber - 1);
            }
            catch (XmlException ex)
            {
                DisplayValidationError(lXmlEditor.FileName, ex.Message, ex.LinePosition - 1, ex.LineNumber - 1);
            }
            ShowValidationFailedMessage();
            return false;
        }
        bool ValidateSchema()
        {
            StringReader stringReader = new StringReader(lXmlEditor.Document.TextContent);
            XmlTextReader xmlReader = new XmlTextReader(stringReader)
            {
                XmlResolver = null
            };

            try
            {
                XmlSchema schema = XmlSchema.Read(xmlReader, new ValidationEventHandler(SchemaValidation));
                XmlSchemaSet set = new XmlSchemaSet();
                set.Add(schema);
                set.ValidationEventHandler += new ValidationEventHandler(SchemaValidation);
                set.Compile();
                //schema.Compile(new ValidationEventHandler(SchemaValidation));
            }
            catch (XmlSchemaException ex)
            {
                DisplayValidationError(lXmlEditor.FileName, ex.Message, ex.LinePosition - 1, ex.LineNumber - 1);
            }
            catch (XmlException ex)
            {
                DisplayValidationError(lXmlEditor.FileName, ex.Message, ex.LinePosition - 1, ex.LineNumber - 1);
            }
            finally { xmlReader.Close(); }
            return true;
        }

        void SchemaValidation(object source, ValidationEventArgs e)
        {
            if (e.Severity == XmlSeverityType.Error)
                DisplayValidationError(lXmlEditor.FileName, e.Message, e.Exception.LinePosition - 1, e.Exception.LineNumber - 1);
            else
                DisplayValidationWarning(lXmlEditor.FileName, e.Message, e.Exception.LinePosition - 1, e.Exception.LineNumber - 1);
        }
        void DisplayValidationWarning(string fileName, string message, int column, int line)
        {
            OutputWindowWriteLine(message);
        }
        void UserSchemaAdded(object source, EventArgs e)
        {
            pSetDefaultSchema(Path.GetExtension(lXmlEditor.FileName).ToLowerInvariant());
        }
        void UserSchemaRemoved(object source, EventArgs e)
        {
            pSetDefaultSchema(Path.GetExtension(lXmlEditor.FileName).ToLowerInvariant());
        }
        void ShowTransformOutput(string xml)
        {
            // vytvoření xml
            xml = XmlService.SimpleFormat(XmlService.IndentedFormat(xml, lXmlEditor.TextEditorProperties.ConvertTabsToSpaces, lXmlEditor.TextEditorProperties.IndentationSize));
            //zobrazení výstupního xml
            XslOutputView view = XslOutputView.Instance;
            if (view == null)
            {
                view = (XslOutputView)(new XslOutputView()).Initialize();
                view.LoadContent(xml);
                SimpleDesktop.Desktop.ShowView(view);
            }
            else
            {
                view.LoadContent(xml);
                view.DesktopWindow.SelectWindow();
            }
        }
        void OutputWindowWriteLine(string message)
        {
            Category.AppendText(String.Concat(message, Environment.NewLine));
        }
        void DisplayValidationError(string fileName, string message, int column, int line)
        {
            OutputWindowWriteLine(message);
        }
        void ShowValidationFailedMessage()
        {
            OutputWindowWriteLine(String.Empty);
            OutputWindowWriteLine(GResources.GetResourceText(29450208) + ": " + GResources.GetResourceText(29450207)); //RC 29450208 : Validace
        }
        void PropertyChanged(object sender, PropertyChangedEventArgs e)
        {
            string extension = Path.GetExtension(lXmlEditor.FileName).ToLowerInvariant();
            if (e.Key == String.Concat("ext", extension))
                pSetDefaultSchema(extension);
            else if (e.Key == XmlEditorAddInOptions.ShowAttributesWhenFoldedPropertyName)
            {
                XmlService.UpdateFolding(lXmlEditor);
                lXmlEditor.Refresh();
            }
        }

        void UpdateMarker(SelectionService selectionService)
        {
            // odstraníme předchozí zvýraznění
            lXmlEditor.Document.MarkerStrategy.RemoveAll(str => str != null);

            if (selectionService == null || selectionService.SelectionCount == 0)
                return;
            // pro každý prvek seznamu provedeme zvýraznění
            selectionService.SelectedComponents.ForEach(MarkText);
        }
        void MarkText(object item)
        {
            try
            {
                if (!(item is IPositionHandler ps))
                    return;

                LineSegment start = ps.StartPosition != -1 ? lXmlEditor.Document.GetLineSegment(ps.StartPosition) : null;
                LineSegment end = ps.EndPosition != -1 ? lXmlEditor.Document.GetLineSegment(ps.EndPosition) : null;

                int start_offset = 0;
                int end_offset = 0;

                if (start != null)
                {
                    start_offset = start.Offset;
                    if (end != null && start != end)
                        end_offset = end.Offset - start.Offset + end.Length;
                    else
                        end_offset = start.Length;
                }
                else if (end != null)
                {
                    if (start != null && start != end)
                    {
                        start_offset = start.Offset;
                        end_offset = end.Offset - start.Offset + start.Length;
                    }
                    else
                    {
                        start_offset = end.Offset;
                        end_offset = end.Length;
                    }
                }

                KorekceVyberu(ps, ref start_offset, ref end_offset);

                if (ps.IsInStyle)
                    GetOffsetOfStyle(ref start_offset, ref end_offset);

                MarkText(start_offset, end_offset);

                if (start != null || end != null)
                {
                    lXmlEditor.ActiveTextAreaControl.JumpTo(start != null ? start.LineNumber : end.LineNumber);
                    lXmlEditor.Refresh();
                }
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450209), ex); } //RC 29450209 : Text nelze označit!
        }

        private void KorekceVyberu(IPositionHandler ps, ref int start_offset, ref int end_offset)
        {
            if (ps.PSType == null || start_offset == 0 || "image".Equals(ps.PSType))
                return;

            string text = lXmlEditor.Document.GetText(start_offset, end_offset)
            , starts_with = "<" + ps.PSType + " "
            , ends_with = "</" + ps.PSType + ">";

            if (!text.Trim().StartsWith(starts_with))
                if (text.Trim().IndexOf(starts_with) != -1)
                    KorekceStartuUvnitr(starts_with, ref start_offset, ref end_offset);
                else
                    KorekceStartuVen(starts_with, ref start_offset, ref end_offset);
            if (!text.Trim().EndsWith(ends_with))
                if (text.Trim().IndexOf(ends_with) != -1)
                    KorekceKonceUvnitr(ends_with, ref start_offset, ref end_offset);
                else
                    KorekceKonceVen(ps, ref start_offset, ref end_offset);
        }

        void KorekceKonceVen(dynamic ps, ref int start_offset, ref int end_offset)
        {
            string text = lXmlEditor.Document.GetText(start_offset, end_offset);
            var count_nested = 0;
            var index = 1;
            if (!text.Trim().EndsWith("</" + (ps is string ? ps : ps.PSType) + ">"))
                while (index < lXmlEditor.Document.TextLength - start_offset - end_offset)
                {
                    text = lXmlEditor.Document.GetText(start_offset, end_offset + index);
                    if (text.EndsWith("</" + (ps is string ? ps : ps.PSType) + ">"))
                    {
                        if (ps is IPositionHandler && ps.CanBeSameANested && count_nested > 0)
                            count_nested--;
                        else
                        {
                            end_offset = end_offset + index;
                            break;
                        }
                    }
                    else if (text.EndsWith("<" + (ps is string ? ps : ps.PSType) + " "))
                    {
                        if (ps is IPositionHandler && ps.CanBeSameANested)
                            count_nested++;
                        else return;
                    }

                    index++;
                }
        }

        private void KorekceKonceUvnitr(string ends_with, ref int start_offset, ref int end_offset)
        {
            string text = lXmlEditor.Document.GetText(start_offset, end_offset);
            var index = 1;
            if (!text.Trim().EndsWith(ends_with))
                while (index < end_offset)
                {
                    text = lXmlEditor.Document.GetText(start_offset, end_offset - index);
                    if (text.EndsWith(ends_with))
                    {
                        end_offset = end_offset - index;
                        return;
                    }
                    else index++;
                }
        }

        private void KorekceStartuVen(string starts_with, ref int start_offset, ref int end_offset)
        {
        }

        private void KorekceStartuUvnitr(string starts_with, ref int start_offset, ref int end_offset)
        {
        }

        void GetOffsetOfStyle(ref int start_offset, ref int end_offset)
        {
            if (end_offset > start_offset)
            {
                string text = lXmlEditor.Document.GetText(start_offset, end_offset);
                int index = 1;
                // nalezení indexu <style
                if (!text.Trim().StartsWith("<style "))
                    while (index < start_offset)
                    {
                        text = lXmlEditor.Document.GetText(start_offset - index, end_offset + index);
                        if (text.Trim().StartsWith("<style "))
                        {
                            start_offset -= index;
                            end_offset += index;
                            break;
                        }
                        else if (text.Trim().StartsWith("</style>"))
                            return;
                        else
                            index++;
                    }
                KorekceKonceVen("style", ref start_offset, ref end_offset);
            }
        }

        void MarkText(int offset, int lenght)
        {
            TextMarker marker = CommonService.CMarkerText == Color.Transparent
                ? new TextMarker(offset, lenght, TextMarkerType.SolidBlock, CommonService.BCMarkerText)
                : new TextMarker(offset, lenght, TextMarkerType.SolidBlock, CommonService.BCMarkerText, CommonService.CMarkerText);

            lXmlEditor.Document.MarkerStrategy.AddMarker(marker);
        }
        void OnDocumentChange(string text)
        {
            if (PrimaryFile == null)
                return;

            PrimaryFile.MakeDirty();
            if (CompilationService.Units.ContainsKey(PrimaryFile))
                CompilationService.Units[PrimaryFile].UpdateContent(text, true);
        }

        static bool IsXmlSchemaNamespace(XmlSchemaElement element) => element.QualifiedName?.Namespace is string ns && XmlSchemaManager.IsXmlSchemaNamespace(ns);

        static XmlSchemaObject GetSchemaObjectReferenced(string xml, int index, XmlCompletionDataProvider provider, XmlSchemaCompletionData currentSchemaCompletionData, XmlSchemaElement element, XmlSchemaAttribute attribute)
        {
            XmlSchemaObject schemaObject = null;
            if (IsXmlSchemaNamespace(element))
            {
                // nalezení hodnoty atributu.
                string attributeValue = XmlParser.GetAttributeValueAtIndex(xml, index);
                if (attributeValue.Length == 0)
                    return attribute;

                if (attribute.Name == "ref")
                    schemaObject = FindSchemaObjectReference(attributeValue, provider, currentSchemaCompletionData, element.Name);
                else if (attribute.Name == "type")
                    schemaObject = FindSchemaObjectType(attributeValue, provider, currentSchemaCompletionData, element.Name);
            }

            return schemaObject != null ? schemaObject : attribute;
        }
        static XmlSchemaObject FindSchemaObjectReference(string name, XmlCompletionDataProvider provider, XmlSchemaCompletionData schemaCompletionData, string elementName)
        {
            QualifiedName qualifiedName = schemaCompletionData.CreateQualifiedName(name);
            XmlSchemaCompletionData qualifiedNameSchema = provider.FindSchema(qualifiedName.Namespace);
            if (qualifiedNameSchema != null)
                schemaCompletionData = qualifiedNameSchema;
            switch (elementName)
            {
                case "element":
                    return schemaCompletionData.FindElement(qualifiedName);
                case "attribute":
                    return schemaCompletionData.FindAttribute(qualifiedName.Name);
                case "group":
                    return schemaCompletionData.FindGroup(qualifiedName.Name);
                case "attributeGroup":
                    return schemaCompletionData.FindAttributeGroup(qualifiedName.Name);
            }
            return null;
        }
        static XmlSchemaObject FindSchemaObjectType(string name, XmlCompletionDataProvider provider, XmlSchemaCompletionData schemaCompletionData, string elementName)
        {
            QualifiedName qualifiedName = schemaCompletionData.CreateQualifiedName(name);
            XmlSchemaCompletionData qualifiedNameSchema = provider.FindSchema(qualifiedName.Namespace);
            if (qualifiedNameSchema != null)
                schemaCompletionData = qualifiedNameSchema;
            switch (elementName)
            {
                case "element":
                    return schemaCompletionData.FindComplexType(qualifiedName);
                case "attribute":
                    return schemaCompletionData.FindSimpleType(qualifiedName.Name);
            }
            return null;
        }

        string[] GetSchemas(XmlSchemaSet schemaSet)
        {
            List<string> schemas = new List<string>();
            EncodedStringWriter writer = null;
            XmlTextWriter xmlWriter = null;

            try
            {
                writer = new EncodedStringWriter(lXmlEditor.TextEditorProperties.Encoding);
                foreach (System.Xml.Schema.XmlSchema schema in schemaSet.Schemas())
                {
                    xmlWriter = XmlService.CreateXmlTextWriter(writer, lXmlEditor.TextEditorProperties.ConvertTabsToSpaces, lXmlEditor.TextEditorProperties.IndentationSize);
                    schema.Write(xmlWriter);
                    schemas.Add(writer.ToString());
                }
            }
            finally
            {
                xmlWriter?.Close();
            }

            return schemas.ToArray();
        }

        /// <summary>
        /// Akce editoru
        /// </summary>
        /// <returns></returns>
        protected IEditAction[] _GetEditActions() => AddInTree.BuildItems<IEditAction>(editActionsPath, this, false).ToArray();

        /// <summary>
        /// získání nového *.alfx názvu souboru
        /// </summary>
        /// <returns>úplná cesta k novému *.alfx souboru</returns>
        protected string _GetNewAlfxName()
        {
            AsynchronousWaitDialog.Pause();
            if (!ReportDesignerProperties.Instance.AlfAutoSaveFormat)
            {
                QuestionWithDefaultDialog slf = new QuestionWithDefaultDialog();
                slf.AddControl(new QPSaveNewAlfxFormat());
                if (slf.ShowDialog(SimpleDesktop.MainForm) != DialogResult.OK)
                    PrimaryFile.CancelSaving = true;
            }
            AsynchronousWaitDialog.ReStart();

            string newName = PrimaryFileName;

            if (!PrimaryFile.CancelSaving)
            {
                if (ReportDesignerProperties.Instance.AlfSaveFormatNew)
                {
                    int index = 0;
                    newName = FileUtility.NormalizePath(string.Format("{0}\\{1}.alfx", Path.GetDirectoryName(PrimaryFileName), Path.GetFileNameWithoutExtension(PrimaryFileName)));
                    if (FileUtility.TestFileExists(newName))
                    {
                        MessageService.ShowInformation(string.Format(GResources.GetResourceText(29450211)  //RC 29450211 : Automaticky generované jméno souboru
                            + " \n{0}\n " + GResources.GetResourceText(29450212) + ' ' + GResources.GetResourceText(29450210), newName)); //RC 29450212 : již existuje.
                        string result = CommonService.InputBox(GResources.GetResourceText(29450215) + " *.alfx " + GResources.GetResourceText(29450214), GResources.GetResourceText(29450213), Path.GetFileName(newName)); //RC 29450215 : Zadejte nový název
                        while (!string.IsNullOrEmpty(result))
                        {
                            newName = FileUtility.Combine(Path.GetDirectoryName(PrimaryFileName), !result.EndsWith(".alfx") ? result + ".alfx" : result);
                            if (FileUtility.TestFileExists(newName))
                                if (MessageService.AskQuestion(string.Format(GResources.GetResourceText(29450217) + " \n{0}\n " + GResources.GetResourceText(29450212) + ' ' + GResources.GetResourceText(29450216), newName))) //RC 29450217 : Soubor s názvem
                                {
                                    try { File.Delete(newName); }
                                    catch (Exception ex) { MessageService.ShowErrorFormatted(GResources.GetResourceText(29450220) + " '{0}' " + GResources.GetResourceText(29450219) + ": \n{1}.\n" + GResources.GetResourceText(29450218), newName, ex.Message); newName = string.Empty; } //RC 29450220 : Soubor
                                    break;
                                }
                                else
                                    result = CommonService.InputBox(GResources.GetResourceText(29450215) + " *.alfx " + GResources.GetResourceText(29450214), GResources.GetResourceText(29450213), "file.alfx"); //RC 29450215 : Zadejte nový název
                            else
                                break;
                        }
                    }

                    if (string.IsNullOrEmpty(newName))
                    {
                        MessageService.ShowWarning(GResources.GetResourceText(29450218)); //RC 29450218 : Bude generováno jedinečné v dané složce jméno!
                        string nameWithoutExt = Path.GetFileNameWithoutExtension(PrimaryFileName),
                            dict = Path.GetDirectoryName(PrimaryFileName);
                        while (FileUtility.TestFileExists(newName))
                        {
                            index++;
                            newName = FileUtility.NormalizePath(string.Format("{0}\\{1}_{2}.alfx", dict, Path.GetFileNameWithoutExtension(nameWithoutExt), index));
                        }
                    }
                }
            }
            return newName;
        }
    }
}
