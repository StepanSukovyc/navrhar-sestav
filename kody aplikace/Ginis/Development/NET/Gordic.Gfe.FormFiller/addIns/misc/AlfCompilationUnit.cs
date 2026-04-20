//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.AlfCompilationUnit.cs                 </Name>
//    <Description> výchozí kompilační jednotka                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-12                                                  </Created>
//  </FileHeader>

using System;
using System.Text;
using System.Xml;
using Gordic.Gfe.FormFiller.StructureView;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Services;

namespace Gordic.Gfe.FormFiller.AddIns
{
    /// <summary>
    /// výchozí kompilační jednotka
    /// </summary>
    class AlfCompilationUnit : AbstractFreezable, ICompilationUnit
    {
        #region ICompilationUnit
        /// <exclude/>
        public string[] LexerTags { get; set; }
        /// <summary>
        /// Kódování souboru
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
            get { return fileName; }
            set
            {
                CheckBeforeMutation();
                fileName = value;
            }
        }

        /// <summary>
        /// Zdrojový soubor, ze kterého byla vytvořená jednotka.
        /// </summary>
        public IFileContent FileContent { get { return fileContent; } }

        /// <summary>
        /// Správce namespace
        /// </summary>
        public XmlNamespaceManager NameSpaceManager { get; private set; }

        /// <summary>
        /// překlad jednotky
        /// </summary>
        public void Compile()
        {
            if (ParserService.IsWellFormedXML(FileContent.Content, out string errorMessage))
            {
                xmlDoc.LoadXml(FileContent.Content);
                NameSpaceManager = new XmlNamespaceManager(xmlDoc.NameTable);
                if (xmlDoc.DocumentElement.HasAttribute("xmlns"))
                    NameSpaceManager.AddNamespace("alf", xmlDoc.DocumentElement.GetAttribute("xmlns"));
            }
            else
            {
                errorsDuringCompile = true;
                ErrorMessage = errorMessage;//"Obsah není XML validní!";
            }
        }

        /// <summary>
        /// Chyba během kompilace
        /// </summary>
        public bool ErrorsDuringCompile
        {
            get { return errorsDuringCompile; }
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
            if (nodeXpath.GetType() != typeof(string))
                return null;

            XmlElement node = (XmlElement)xmlDoc.DocumentElement.SelectSingleNode(nodeXpath, NameSpaceManager);

            if (node != null && node.HasAttribute(attributeName))
                return node.GetAttribute(attributeName);

            return null;
        }
        /// <summary>
        /// získání sekce jednotky
        /// </summary>
        /// <param name="nodeXPath">Cesta k sekcí</param>
        /// <returns>seznam nalezených sekcí</returns>
        public XmlNodeList GetSection(string nodeXPath)
        {
            if (nodeXPath.GetType() != typeof(string))
                return null;

            return xmlDoc.DocumentElement.SelectNodes(nodeXPath, NameSpaceManager);
        }
        /// <summary>
        /// Získání identifikátoru souboru
        /// </summary>
        /// <returns>Idfentifikátor souboru</returns>
        public virtual string GetID() { return GetAttributeValue(@"//alf:info", "ixs_xme"); }
        #endregion

        /// <summary>
        /// Otevřený soubor
        /// </summary>
        public virtual OpenedFile OpenedFile { get; set; }
        /// <summary>
        /// Jednotka struktury
        /// </summary>
        public StructureViewEntry StructureViewEntry { get; set; }

        string fileName = null;
        IFileContent fileContent;
        bool errorsDuringCompile = false;
        XmlDocument xmlDoc = new XmlDocument();
        /// <summary>
        /// Prázdný konstruktor třídy
        /// </summary>
        public AlfCompilationUnit() { this.fileContent = new DefaultFileContent(this); }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="fileContent">obsah souboru</param>
        public AlfCompilationUnit(string fileContent)
            : base()
        {
            UpdateContent(fileContent);
            switch (this.GetAttributeValue(@"/alf:format", "type").ToLowerInvariant())
            {
                case "grf":
                    Language = LanguageProperties.GRF;
                    break;
                case "grr":
                    Language = LanguageProperties.GRR;
                    break;
                case "mse":
                    Language = LanguageProperties.MSE;
                    break;
                case "rtf":
                    Language = LanguageProperties.RTF;
                    break;
                default:
                    Language = LanguageProperties.None;
                    break;
            }
        }
        /// <summary>
        /// překlad jednotky
        /// </summary>
        /// <param name="view"></param>
        public virtual void Compile(DefaultAbstractSecondaryViewContent view) { }
        /// <summary>
        /// Volá se po kompilací souboru
        /// </summary>
        public event EventHandler AfterCompile;
        /// <summary>
        /// Volá se po kompilaci souboru
        /// </summary>
        public void OnAfterCompile()
        {
            AfterCompile?.Invoke(this, EventArgs.Empty);
        }
        /// <summary>
        /// aktualizace obsahu
        /// </summary>
        /// <param name="content">obsah k aktualizací</param>
        /// <param name="showError">TRUE - zobrazení hlášení o chybě</param>
        public void UpdateContent(string content, bool showError = false)
        {
            if (fileContent == null)
                this.fileContent = new DefaultFileContent(this);

            fileContent.UpdateContent(content, showError);
        }
    }
}
