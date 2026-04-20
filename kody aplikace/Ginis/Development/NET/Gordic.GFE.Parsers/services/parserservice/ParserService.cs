//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ParserService.cs                       </Name>
//    <Description> Služba analyzování obsahu                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.DefaultEditor;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.TextEditor.Document;
using Gordic.General;
using System.Xml;


namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Služba analyzování obsahu
    /// </summary>
    public static class ParserService
    {
        static IList<ParserDescriptor> parser;
        static readonly Dictionary<string, ParseInformation> parsings = new Dictionary<string, ParseInformation>(StringComparer.OrdinalIgnoreCase);
        static Thread loadSolutionProjectsThread;

        static bool abortLoadSolutionProjectsThread;
        /// <summary>
        /// Ukončení vlákna načtení projektu
        /// </summary>
        public static event EventHandler LoadSolutionProjectsThreadEnded;

        /// <summary>
        /// Výchozí kódování
        /// </summary>
        public static Encoding DefaultFileEncoding { get { return TextEditorProperties.Encoding; } }

        /// <summary>
        /// Získání informaci o souboru
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <returns></returns>
        public static ParseInformation GetParseInformation(string fileName)
        {
            if (string.IsNullOrEmpty(fileName))
                return null;

            lock (parsings)
            {
                if (parsings.TryGetValue(fileName, out ParseInformation parseInfo))
                    return parseInfo;
            }

            return ParseFile(fileName);
        }

        static readonly Queue<KeyValuePair<string, string>> parseQueue = new Queue<KeyValuePair<string, string>>();
        /// <summary>
        /// Soubory pro analýzu
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        public static void EnqueueForParsing(string fileName)
        {
            Encoding encoding = Encoding.Default;
            EnqueueForParsing(fileName, GetParseableFileContent(fileName, ref encoding));
        }

        /// <summary>
        /// Analýza obsahu
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <param name="fileContent">Obsah</param>
        public static void EnqueueForParsing(string fileName, string fileContent)
        {
            lock (parseQueue)
                parseQueue.Enqueue(new KeyValuePair<string, string>(fileName, fileContent));
        }

        /// <summary>
        /// Uvolnění analýzovaných informaci o souboru
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        public static void ClearParseInformation(string fileName)
        {
            if (string.IsNullOrEmpty(fileName))
                return;

            LoggingService.Info("ClearParseInformation: " + fileName);
            lock (parsings)
            {
                if (parsings.TryGetValue(fileName, out ParseInformation parseInfo))
                    parsings.Remove(fileName);
                else
                    return;
            }
        }

        /// <summary>
        /// Asznchronní analýza obsahu souboru
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <param name="fileContent">Obsah souboru</param>
        public static void StartAsyncParse(string fileName, string fileContent)
        {
            ThreadPool.QueueUserWorkItem(delegate { ParseFile(fileName, fileContent); });
        }

        /// <summary>
        /// Analýza obsahu
        /// </summary>
        /// <param name="viewContent">Obsah k analýze</param>
        public static void ParseViewContent(IViewContent viewContent)
        {
            string text = ((IEditable)viewContent).Text;
            ParseInformation parseInformation = ParseFile(viewContent.PrimaryFileName, text);
            if (parseInformation != null && viewContent is IParseInformationListener)
                ((IParseInformationListener)viewContent).ParseInformationUpdated(parseInformation);
        }

        /// <summary>
        /// Volá se po načtení sestavení
        /// </summary>
        public static void OnSolutionLoaded()
        {
            if (loadSolutionProjectsThread != null)
            {
                if (!abortLoadSolutionProjectsThread)
                    throw new InvalidOperationException(GResources.GetResourceText(29450460)); //RC 29450460 : Nelze otevřít nové řešení bez zavření starého!
                if (!loadSolutionProjectsThread.Join(50))
                {
                    ThreadService.SafeThreadAsyncCall(OnSolutionLoaded);
                    return;
                }
            }
            loadSolutionProjectsThread = new Thread(new ThreadStart(LoadSolutionProjects));
            loadSolutionProjectsThread.SetApartmentState(ApartmentState.STA);
            loadSolutionProjectsThread.Name = "loadSolutionProjects";
            loadSolutionProjectsThread.Priority = ThreadPriority.BelowNormal;
            loadSolutionProjectsThread.IsBackground = true;
            loadSolutionProjectsThread.Start();
        }

        /// <summary>
        /// reakce na Ctrl+Space
        /// </summary>
        /// <param name="caretLine">aktuální řídek</param>
        /// <param name="caretColumn">aktuální sloupec</param>
        /// <param name="fileName">název souboru</param>
        /// <param name="fileContent">obsah souboru</param>
        /// <param name="context">kontext</param>
        /// <returns></returns>
        public static ArrayList CtrlSpace(int caretLine, int caretColumn,
                                  string fileName, string fileContent, ExpressionContext context)
        {
            IResolver resolver = CreateResolver(fileName);
            if (resolver != null)
                return resolver.CtrlSpace(caretLine, caretColumn, GetParseInformation(fileName), fileContent, context);
            return null;
        }

        /// <summary>
        /// vytvoření nástroje pro hledání řešení
        /// </summary>
        /// <param name="fileName">název souboru</param>
        /// <returns></returns>
        public static IResolver CreateResolver(string fileName)
        {
            IParser parser = GetParser(fileName);
            if (parser != null)
                return parser.CreateResolver();
            return null;
        }

        /// <summary>
        /// získání 
        /// </summary>
        /// <param name="fileName">název souboru</param>
        /// <returns></returns>
        public static IExpressionFinder GetExpressionFinder(string fileName)
        {
            IParser parser = GetParser(fileName);
            if (parser != null)
                return parser.CreateExpressionFinder(fileName);
            return null;
        }
        /// <summary>
        /// řešení 
        /// </summary>
        /// <param name="expressionResult"></param>
        /// <param name="caretLineNumber"></param>
        /// <param name="caretColumn"></param>
        /// <param name="fileName"></param>
        /// <param name="fileContent"></param>
        /// <returns></returns>
        public static ResolveResult Resolve(ExpressionResult expressionResult,
                                    int caretLineNumber, int caretColumn,
                                    string fileName, string fileContent)
        {
            if (expressionResult.Region.IsEmpty)
                expressionResult.Region = new DomRegion(caretLineNumber, caretColumn);
            IResolver resolver = CreateResolver(fileName);
            if (resolver != null)
            {
                ParseInformation parseInfo = GetParseInformation(fileName);
                return resolver.Resolve(expressionResult, parseInfo, fileContent);
            }
            return null;
        }

        static void LoadSolutionProjects()
        {
            try
            {
                abortLoadSolutionProjectsThread = false;
                LoggingService.Info(GResources.GetResourceText(29450461) + " 'LoadSolutionProjectsInternal' ..."); //RC 29450461 : spuštění vlákna
                LoadSolutionProjectsInternal();
            }
            finally
            {
                LoggingService.Info(GResources.GetResourceText(29450463) + " 'LoadSolutionProjects' " + GResources.GetResourceText(29450462) + "..."); //RC 29450463 : vlákno
                loadSolutionProjectsThread = null;
                OnLoadSolutionProjectsThreadEnded(EventArgs.Empty);
            }
        }
        static void OnLoadSolutionProjectsThreadEnded(EventArgs e)
        {
            LoadSolutionProjectsThreadEnded?.Invoke(null, e);
        }
        static void LoadSolutionProjectsInternal()
        {
            IProgressMonitor progressMonitor = StatusBarService.CreateProgressMonitor();
            ThreadService.SafeThreadAsyncCall(CreatedProjectContents);
        }

        #region analýza obsahu
        static volatile bool abortParserUpdateThread = false;
        static readonly Dictionary<string, int> lastUpdateHash = new Dictionary<string, int>();
        /// <summary>
        /// <para>Volá se každé 2 vteřiny. Volá se po aktualizací obsahu.</para>
        /// <para>
        /// <b>WARNING: Volá se v zvlátním vlákně - je zapotřebí volát Invoke pokud chceme pracovat s GUI.</b>
        /// </para>
        /// </summary>
        public static event ParserUpdateStepEventHandler ParserUpdateStepFinished;

        /// <summary>
        /// spuštění vlákna analyzátoru
        /// </summary>
        public static void StartParserThread()
        {
            abortParserUpdateThread = false;
            Thread parserThread = new Thread(new ThreadStart(ParserUpdateThread))
            {
                Name = "parser",
                Priority = ThreadPriority.BelowNormal,
                IsBackground = true
            };
            parserThread.Start();
        }
        /// <summary>
        /// Zastavení služby analýzy obsahu
        /// </summary>
        public static void StopParserThread() { abortParserUpdateThread = true; }

        static void ParserUpdateThread()
        {
            Thread.Sleep(750);
            while (!abortParserUpdateThread)
            {
                try
                {
                    ParseQueue();
                    ParserUpdateStep();
                }
                catch (Exception e)
                {
                    MessageService.ShowError(e);
                    // počkáme, až si uživatel přečte vyjímku
                    Thread.Sleep(10000);
                }
                // uvolnění CPU
                Thread.Sleep(2000);
            }
        }
        static void ParseQueue()
        {
            while (true)
            {
                KeyValuePair<string, string> entry;

                lock (parseQueue)
                {
                    if (parseQueue.Count == 0)
                        return;
                    else
                        entry = parseQueue.Dequeue();
                }
                ParseFile(entry.Key, entry.Value);
            }
        }
        static void ParserUpdateStep()
        {
            string fileName = null;
            bool isUntitled = false;
            // získáme aktivní pohled na obsah
            var activeViewContent = GetActiveViewContent != null ? GetActiveViewContent() : null;
            if (activeViewContent != null && activeViewContent.PrimaryFile != null)
                lock (activeViewContent.PrimaryFile)
                {
                    try
                    {
                        fileName = activeViewContent.PrimaryFileName;
                        isUntitled = activeViewContent.PrimaryFile.IsUntitled;

                        if (activeViewContent is IEditable editable)
                        {
                            string text = null;

                            if (!string.IsNullOrEmpty(fileName))
                            {
                                ParseInformation parseInformation = null;
                                bool updated = false;
                                if (text == null)
                                {
                                    text = editable.Text;
                                    if (text == null) return;
                                }
                                int hash = text.GetHashCode();
                                if (!lastUpdateHash.ContainsKey(fileName) || lastUpdateHash[fileName] != hash)
                                {
                                    parseInformation = ParseFile(fileName, text);
                                    lastUpdateHash[fileName] = hash;
                                    updated = true;
                                }
                                if (updated)
                                    if (parseInformation != null && editable is IParseInformationListener)
                                        ((IParseInformationListener)editable).ParseInformationUpdated(parseInformation);
                                OnParserUpdateStepFinished(new ParserUpdateStepEventArgs(fileName, text, updated, parseInformation));
                            }
                        }
                    }
                    catch (InvalidOperationException ex)
                    {
                        // včetně ObjectDisposedException
                        // možná pracovní plocha byla uvolněná zatímco se čekálo SafeThreadCall
                        // se může stát při ukončení aplikace
                        LoggingService.Warning("InvalidOperationException: " + GResources.GetResourceText(29450466) + " GetActiveViewContent() " + ex); //RC 29450466 : při pokusu o volání
                        return; // přerušíme toto vlákno
                    }
                }
        }

        static void OnParserUpdateStepFinished(ParserUpdateStepEventArgs e)
        {
            ParserUpdateStepFinished?.Invoke(typeof(ParserService), e);
        }
        #endregion

        /// <summary>
        /// funkce na získání aktivního pohledu na obsah
        /// </summary>
        public static Func<IViewContent> GetActiveViewContent { get; set; }
        /// <summary>
        /// vlastnosti textového editoru
        /// </summary>
        public static ITextEditorProperties TextEditorProperties { get; set; }
        /// <summary>
        /// vytvoření obsahu projektu
        /// </summary>
        public static Action CreatedProjectContents { get; set; }
        /// <summary>
        /// funkce získání pohledu na otevřený soubor
        /// </summary>
        public static Func<string, IViewContent> GetOpenFileView { get; set; }
        /// <summary>
        /// funkce získání otevřeného souboru
        /// </summary>
        public static Func<string, OpenedFile> GetOpenedFile { get; set; }

        /// <summary>
        /// inicializace služby
        /// </summary>
        /// <param name="getActiveViewContent">funkce na získání aktivního pohledu</param>
        /// <param name="textEditorProperties">vlastnosti textového editoru</param>
        /// <param name="createdProjectContents">reakce na vytvoření obsahu projektu</param>
        /// <param name="getOpenFileView">Lokální funkce získání pohledu na otevřený soubor</param>
        /// <param name="getOpenedFile">funkce získání otevřeného souboru</param>
        public static void InitializeService(Func<IViewContent> getActiveViewContent
            , ITextEditorProperties textEditorProperties
            , Action createdProjectContents
            , Func<string, IViewContent> getOpenFileView
            , Func<string, OpenedFile> getOpenedFile)
        {
            if (parser == null)
                parser = AddInTree.BuildItems<ParserDescriptor>("/Workspace/Parser", null, false);
            GetActiveViewContent = getActiveViewContent;
            TextEditorProperties = textEditorProperties;
            CreatedProjectContents = createdProjectContents;
            GetOpenFileView = getOpenFileView;
            GetOpenedFile = getOpenedFile;
        }

        #region new
        /// <summary>
        /// získání analyzátoru obsahu uvedeného souboru <paramref name="fileName"/>.
        /// </summary>
        /// <param name="fileName">Název souboru k posouzení</param>
        /// <returns>Nástroj analýzy souboru</returns>
        public static IParser GetParser(string fileName)
        {
            if (string.IsNullOrEmpty(fileName))
                throw new ArgumentNullException(GResources.GetResourceText(29450467)); //RC 29450467 : Metoda získání analyzátoru nemá vstupní parámetr!

            IParser curParser = null;
            foreach (ParserDescriptor descriptor in parser)
                if (descriptor.CanParse(fileName))
                {
                    curParser = descriptor.Parser;
                    break;
                }

            return curParser;
        }

        /// <summary>
        /// Získání obsahu suboru s použitím automatické detekce kódování (nebo DefaultFileEncoding, pokud auto-detekce selže)
        /// V případě, že soubor je již otevřen, získáme text souboru z otevřeného pohledu
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="encoding"></param>
        /// <returns></returns>
        public static string GetParseableFileContent(string fileName, ref Encoding encoding)
        {
            IViewContent viewContent = GetOpenFileView != null ? GetOpenFileView(fileName) : null;
            if (viewContent is IEditable editable)
                return editable.Text;
            // získáme kódování souboru
            encoding = FileReader.GetEncoding(fileName);

            OpenedFile file = GetOpenedFile != null ? GetOpenedFile(fileName) : null;
            return file != null ? GetParseableFileContent(file, encoding) : FileReader.ReadFileContent(fileName, encoding);

        }
        /// <summary>
        /// získání obsahu pro analýzu souboru
        /// </summary>
        /// <param name="file">Otevřený soubor pro získání obsahu</param>
        /// <param name="encoding">Kódování</param>
        /// <returns>Textový obsah souboru</returns>
        public static string GetParseableFileContent(OpenedFile file, Encoding encoding)
        {
            if (file != null && !string.IsNullOrEmpty(file.FileName))
            {
                if (file.CurrentView is IFileDocumentProvider provider)
                {
                    IDocument document = provider.GetDocumentForFile(file);
                    if (document != null && !string.IsNullOrEmpty(document.TextContent))
                        return document.TextContent;
                }
                using (Stream s = file.OpenRead(file.FileName))
                    // načtení souboru
                    return FileReader.ReadFileContent(s, ref encoding);
            }

            return null;
        }

        /// <summary>
        /// Analýza obsahu souboru
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <returns>Informace analyzátoru</returns>
        public static ParseInformation ParseFile(string fileName) { return ParseFile(fileName, null); }

        /// <summary>
        /// Analýza obsahu souboru
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <param name="fileContent">Případný obsah souboru</param>
        /// <returns>Informace analyzátoru</returns>
        public static ParseInformation ParseFile(string fileName, string fileContent)
        {
            if (fileName == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450468)); //RC 29450468 : Analýzu souboru nelze uskutečnit - není uveden název analyzovaného souboru!

            IParser parser = GetParser(fileName);
            if (parser == null)
                return null;

            try
            {
                Encoding encoding = Encoding.Default;
                if (string.IsNullOrEmpty(fileContent))
                    fileContent = GetParseableFileContent(fileName, ref encoding);

                ICompilationUnit parserOutput = parser.Parse(fileName, fileContent);
                if (parserOutput != null
                    && !parserOutput.ErrorsDuringCompile)
                {
                    ParseInformation parseInformation;
                    lock (parsings)
                    {
                        if (!parsings.TryGetValue(fileName, out parseInformation))
                            parsings[fileName] = parseInformation = new ParseInformation();
                    }

                    parserOutput.FileEncoding = encoding;
                    parseInformation.SetCompilationUnit(parserOutput);
                    return parseInformation;
                }
            }
            catch (Exception ex)
            {
                MessageService.ShowErrorFormatted(GResources.GetResourceText(29450469) + " '{0}'\n{1}", fileName, ex); //RC 29450469 : Chyba analýzy souboru
            }
            return null;
        }

        /// <summary>
        /// validace obsahu na XML strukturu
        /// </summary>
        /// <param name="text">text k validací</param>
        /// <param name="errorMessage">chybová hláška</param>
        /// <returns></returns>
        public static bool IsWellFormedXML(this string text, out string errorMessage)
        {
            errorMessage = string.Empty;
            if (string.IsNullOrEmpty(text))
            {
                errorMessage = GResources.GetResourceText(29450797); //RC 29450797 : XML je prázdné.
                return false;
            }

            bool errored = false;
            using (XmlReader reader = XmlReader.Create(new StringReader(text)))
                try { while (reader.Read()) ; }
                catch (Exception ex) { errored = true; errorMessage = ex.Message; }

            return !errored;
        }
        #endregion
    }
}
