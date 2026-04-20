//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DefaultCompilationUnit.cs                </Name>
//    <Description> výchozí kompilační jednotka                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Text;
using System.Xml;
using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// výchozí kompilační jednotka
    /// </summary>
    public class DefaultCompilationUnit : AbstractFreezable, ICompilationUnit
    {
        #region ICompilationUnit
        /// <exclude/>
        public string[] LexerTags { get; set; }
        /// <summary>
        /// kódování souboru
        /// </summary>
        public Encoding FileEncoding { get; set; }

        /// <exclude/>
        public LanguageProperties Language { get; set; }

        /// <summary>
        /// otevřený soubor sestavy
        /// </summary>
        public OpenedFile OpenedFile { get; set; }
        /// <summary>
        /// chybová hláška
        /// </summary>
        public string ErrorMessage { get; set; }

        IFileContent fileContent;
        /// <summary>
        /// Zdrojový soubor, ze kterého byla vytvořená jednotka.
        /// </summary>
        public IFileContent FileContent { get { return fileContent; } }

        string fileName = null;
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

        bool errorsDuringCompile = false;
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
        /// Získání identifikátoru souboru
        /// </summary>
        /// <returns>Idfentifikátor souboru</returns>
        public string GetID() { return null; }

        /// <summary>
        /// Informace z kompilované jednotky
        /// </summary>
        /// <param name="nodeXpath">Hledaný atribut</param>
        /// <param name="attributeName">Indikuje, že atribut je kořenový</param>
        /// <returns></returns>
        public string GetAttributeValue(string nodeXpath, string attributeName) { return null; }

        /// <summary>
        /// získání sekce jednotky
        /// </summary>
        /// <param name="nodeXPath">Cesta k sekcí</param>
        /// <returns>seznam nalezených sekcí</returns>
        public XmlNodeList GetSection(string nodeXPath) { return null; }

        /// <summary>
        /// překlad jednotky
        /// </summary>
        public void Compile() { }
        #endregion

        object tag = null;
        /// <summary>
        /// Objekt TAG
        /// </summary>
        public object Tag
        {
            get { return tag; }
            set
            {
                CheckBeforeMutation();
                tag = value;
            }
        }

        /// <summary>
        /// fiktivní kompilační jednotka
        /// </summary>
        public static readonly ICompilationUnit DummyCompilationUnit = new DefaultCompilationUnit().FreezeAndReturnSelf();

        DefaultCompilationUnit FreezeAndReturnSelf()
        {
            Freeze();
            return this;
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public DefaultCompilationUnit() { fileContent = DefaultFileContent.DummyFileContent; }


        /// <exclude/>
        public override string ToString()
        {
            return String.Format("[CompilationUnit: fileName = {0}]", fileName);
        }


        /// <summary>
        /// aktualizace obsahu
        /// </summary>
        /// <param name="content">obsah k aktualizací</param>
        /// <param name="showError">TRUE - zobrazení hlášení o chybě</param>
        public void UpdateContent(string content, bool showError = false)
        {
            if (FileContent == null)
                fileContent = DefaultFileContent.DummyFileContent;
            
            FileContent.UpdateContent(content, showError);
        }
    }
}
