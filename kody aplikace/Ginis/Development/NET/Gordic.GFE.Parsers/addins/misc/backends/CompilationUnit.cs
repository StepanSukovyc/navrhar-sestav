//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.CompilationUnit.cs                    </Name>
//    <Description> výchozí kompilační jednotka                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Xml;

namespace Gordic.GFE.Parsers.Binding
{
    /// <summary>
    /// podporované formáty
    /// </summary>
    public enum SupportedFormats
    {
        /// <summary>
        /// formát GRF
        /// </summary>
        GRF,
        /// <summary>
        /// grafický formát GRR
        /// </summary>
        GRR,
        /// <summary>
        /// office formát Excel sestav
        /// </summary>
        MSE,
        /// <summary>
        /// office format Word sestav
        /// </summary>
        RTF,
        /// <summary>
        /// office format Excel sestav
        /// </summary>
        OXS,
        /// <summary>
        /// všechny formáty
        /// </summary>
        All,
        /// <summary>
        /// bez formátu
        /// </summary>
        None,
    }

    /// <summary>
    /// výchozí kompilační jednotka
    /// </summary>
    public class CompilationUnit : AbstractFreezable, ICompilationUnit
    {
        #region ICompilationUnit
        /// <exclude/>
        public string[] LexerTags { get; set; }

        /// <summary>
        /// kódování souboru
        /// </summary>
        public Encoding FileEncoding { get; set; }

        /// <exclude/>
        public LanguageProperties Language { get; set; } = LanguageProperties.None;

        /// <summary>
        /// chybová hláška
        /// </summary>
        public string ErrorMessage { get; set; }
        /// <summary>
        /// Zdrojový soubor, ze kterého byla vytvořená jednotka.
        /// </summary>
        public string FileName
        {
            get => fileName;
            set
            {
                CheckBeforeMutation();
                fileName = value;
            }
        }
        /// <summary>
        /// Zdrojový soubor, ze kterého byla vytvořená jednotka.
        /// </summary>
        public IFileContent FileContent { get => fileContent; }


        public virtual void Compile()
        {
            CheckBeforeMutation();

            try
            {
                // Pokusíme se načíst XML přímo – pokud je nevalidní, vyhodí výjimku
                xmlDoc.LoadXml(FileContent.Content);

                // Vytvoříme XmlNamespaceManager navázaný na NameTable dokumentu
                NameSpaceManager = new XmlNamespaceManager(xmlDoc.NameTable);

                // Pokud je kořenový element bez jmenného prostoru, nic nepřidáváme
                // Pokud má defaultní xmlns, zaregistrujeme ho pod prefixem "alf"
                var root = xmlDoc.DocumentElement;
                if (root != null)
                {
                    var defaultNs = root.GetAttribute("xmlns");
                    if (!string.IsNullOrEmpty(defaultNs))
                        NameSpaceManager.AddNamespace("alf", defaultNs);
                }

                // Úspěch
                errorsDuringCompile = false;
                ErrorMessage = null;
            }
            catch (Exception ex)
            {
                // Jakákoliv chyba při parsování = nevalidní XML
                errorsDuringCompile = true;
                ErrorMessage = ex.Message;
            }
        }


        //public virtual void Compile()
        //{
        //    CheckBeforeMutation();

        //    if (!ParserService.IsValidXML(FileContent.Content, out string errorMessage))
        //    {
        //        errorsDuringCompile = true;
        //        ErrorMessage = errorMessage; // např. "Obsah není XML validní!"
        //        return;
        //    }

        //    try
        //    {
        //        // XML je validní → načteme dokument
        //        xmlDoc.LoadXml(FileContent.Content);
        //    }

        //    catch {
        //        errorsDuringCompile = true;
        //        ErrorMessage = "Chyba při načítání XML: " + ex.Message;
        //        return;
        //    }

        //    // NameTable je navázaná na dokument; XmlNamespaceManager musí dostat jeho NameTable
        //    NameSpaceManager = new XmlNamespaceManager(xmlDoc.NameTable);

        //    // Pokud je kořenový element bez jmenného prostoru, nic nepřidáváme
        //    // Pokud má defaultní xmlns, zaregistrujeme ho pod prefixem "alf"
        //    var root = xmlDoc.DocumentElement;
        //    if (root != null)
        //    {
        //        var defaultNs = root.GetAttribute("xmlns");
        //        if (!string.IsNullOrEmpty(defaultNs))
        //            // Přepíše existující prefix "alf" (pokud byl), což je obvykle žádoucí – držíme aktuální obsah
        //            NameSpaceManager.AddNamespace("alf", defaultNs);
        //    }

        //    // Úspěšně zkompilováno → vynulovat chyby
        //    errorsDuringCompile = false;
        //    ErrorMessage = null;
        //}
        /// <summary>
        /// Správce namespace
        /// </summary>
        public XmlNamespaceManager NameSpaceManager { get; private set; }

        /// <summary>
        /// Chyba během kompilace
        /// </summary>
        public bool ErrorsDuringCompile
        {
            get => errorsDuringCompile;
            set
            {
                CheckBeforeMutation();
                errorsDuringCompile = value;
            }
        }
        /// <summary>
        /// Chyba během validace
        /// </summary>
        public bool ErrorsDuringValidate
        {
            get => errorsDuringCompile;
            set
            {
                CheckBeforeMutation();
                errorsDuringCompile = value;
            }
        }

        /// <summary>
        /// Informace z kompilované jednotky
        /// </summary>
        /// <param name="nodeXpath">Hledaný atribut</param>
        /// <param name="attributeName">Indikuje, že atribut je kořenový</param>
        /// <returns></returns>
        public string GetAttributeValue(string nodeXpath, string attributeName)
        {
            if (string.IsNullOrWhiteSpace(nodeXpath) ||
                string.IsNullOrEmpty(attributeName) ||
                xmlDoc?.DocumentElement == null)
                return null;

            // Najde přímo první uzel s daným atributem
            var node = xmlDoc.DocumentElement
                .SelectSingleNode($"{nodeXpath}[@{attributeName}]", NameSpaceManager) as XmlElement;

            return node?.GetAttribute(attributeName);
        }

        /// <summary>
        /// získání sekce jednotky
        /// </summary>
        /// <param name="nodeXPath">Cesta k sekcí</param>
        /// <returns>seznam nalezených sekcí</returns>
        public XmlNodeList GetSection(string nodeXPath) =>
            string.IsNullOrWhiteSpace(nodeXPath) || xmlDoc?.DocumentElement == null
                ? null
                : xmlDoc.DocumentElement.SelectNodes(nodeXPath, NameSpaceManager);

        /// <summary>
        /// Získání identifikátoru souboru
        /// </summary>
        /// <returns>Idfentifikátor souboru</returns>
        public virtual string GetID() => GetAttributeValue(@"//alf:info", "ixs_xme");
        #endregion

        /// <summary>
        /// poziční XmlDokument sestavy
        /// </summary>
        public XmlDocumentPosition XmlDocPosition { get; set; }

        /// <summary>
        /// Otevřený soubor
        /// </summary>
        public virtual OpenedFile OpenedFile { get; set; }

        object structE;
        /// <summary>
        /// Jednotka struktury
        /// </summary>
        public object StructureViewEntry { get => structE; set { if (structE != value) structE = value; } }
        /// <summary>
        /// Jednotka sekce info
        /// </summary>
        public dynamic InfoSectionEntry { get; set; }

        protected string zipResources;
        /// <summary>
        /// úplný název archivního souboru s koncovkou ".tmp" 
        /// obsahující vázané soubory sestavy
        /// u grafických sestav to jsou zejména obrázky
        /// u Office sestav to jsou šablony
        /// </summary>
        public string ZipResources { get => zipResources; set { zipResources = value; } }

        /// <summary>
        /// případná šablona jednotky, která se nachází v ZipResources
        /// </summary>
        public string TemplateFile { get; set; }

        protected bool isCompiled;
        /// <summary>
        /// Indikuje, že jednotka byla přeložená/analyzováná
        /// </summary>
        public bool IsCompiled { get => isCompiled; }

        string namespaceURI;
        /// <summary>
        /// URI aktuálního elementu
        /// </summary>
        public string NamespaceURI { get => namespaceURI; set { namespaceURI = value; } }

        /// <summary>
        /// Vastností jednotky
        /// </summary>
        public IFormationDocumentProperty FormationProperty { get; set; }

        /// <summary>
        /// indikuje, že soubor zdrojů je archiv
        /// </summary>
        public bool IsArchive { get; set; }

        event EventHandlerDynamicArgumentStringResult lCompileMethod;
        /// <summary>
        /// metoda překladu
        /// </summary>
        public event EventHandlerDynamicArgumentStringResult CompileMethod
        {
            add { if (lCompileMethod == null) lCompileMethod += value; }
            remove { lCompileMethod -= value; }
        }

        /// <summary>
        /// Volá se po kompilací souboru
        /// </summary>
        public event EventHandler Compiled;

        /// <summary>
        /// Získání objektu, ve kterém je StructureViewEntry uzamčeno.
        /// </summary>
        protected readonly object syncRoot = new object();

        string fileName = null;
        /// <summary>
        /// obsah souboru
        /// </summary>
        protected IFileContent fileContent;
        /// <summary>
        /// indikuje chybu kompilace jednotky
        /// </summary>
        protected bool errorsDuringCompile = false;
        /// <summary>
        /// indikuje chybu validace jednotky
        /// </summary>
        protected bool errorsDuringValidate = false;
        XmlDocument xmlDoc = new XmlDocument();

        /// <summary>
        /// Prázdný konstruktor třídy
        /// </summary>
        public CompilationUnit() { }

        static readonly Dictionary<string, LanguageProperties> FormatMap =
            new Dictionary<string, LanguageProperties>(StringComparer.OrdinalIgnoreCase)
            {
        { "grf", LanguageProperties.GRF },
        { "grr", LanguageProperties.GRR },
        { "mse", LanguageProperties.MSE },
        { "rtf", LanguageProperties.RTF },
        { "oxs", LanguageProperties.OXS }
            };

        /// <summary>
        /// Inicializace třídy
        /// </summary>
        /// <param name="pFileContent">obsah souboru</param>        
        public void Initialize(string pFileContent)
        {
            UpdateContent(pFileContent ?? string.Empty);

            var format = GetAttributeValue("/alf:format", "type");
            var key = format == null ? null : format.Trim();

            LanguageProperties lang;
            Language = (key != null && FormatMap.TryGetValue(key, out lang))
                ? lang
                : LanguageProperties.None;

            isCompiled = false;
        }

        /// <summary>
        /// Kompilace jednotky
        /// </summary>
        /// <param name="view"></param>
        public virtual void Compile(DefaultAbstractSecondaryViewContent view)
        {
            lock (syncRoot)
            {
                if (lCompileMethod == null)
                    return;

                try
                    {
                        UpdateContent(OnCompileMethod(this));
                        OnCompiled();
                        ErrorsDuringCompile = false;
                        isCompiled = true;
                    }
                    catch (Exception ex)
                    {
                        LoggingService.Error(ex.Message, ex);
                        ErrorsDuringCompile = true;
                        ErrorMessage = ex.Message;
                        isCompiled = false;
                    }
            }
        }
        /// <summary>
        /// Kompilace jednotky
        /// </summary>
        /// <param name="view"></param>
        public virtual void Validate(DefaultAbstractSecondaryViewContent view)
        {
            lock (syncRoot)
            {
                if (lCompileMethod == null)
                    return;

                try
                    {
                        OnCompileMethod(this);
                        ErrorsDuringValidate = false;
                    }
                    catch (Exception ex)
                    {
                        LoggingService.Error(ex.Message, ex);
                        ErrorsDuringValidate = true;
                        ErrorMessage = ex.Message;
                    }
            }
        }

        /// <summary>
        /// Volá se po kompilaci souboru
        /// </summary>
        public void OnCompiled()
        {
            Compiled?.Invoke(this, EventArgs.Empty);
        }

        /// <summary>
        /// Generování alf kódu
        /// </summary>
        /// <returns></returns>
        protected string OnCompileMethod(dynamic unt = null) =>
            lCompileMethod?.Invoke(unt) ?? throw new Exception(GResources.GetResourceText(29450109));

        /// <summary>
        /// aktualizace obsahu
        /// </summary>
        /// <param name="content">obsah k aktualizací</param>
        /// <param name="showError">TRUE - zobrazení hlášení o chybě</param>
        public virtual void UpdateContent(string content, bool showError = false)
        {
            if (fileContent == null)
                this.fileContent = new DefaultFileContent(this);

            fileContent.UpdateContent(content, showError);
        }

    }
}
