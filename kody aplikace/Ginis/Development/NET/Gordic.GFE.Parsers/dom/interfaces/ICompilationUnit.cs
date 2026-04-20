//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ICompilationUnit.cs                      </Name>
//    <Description> Kompilační jednotka                                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Text;
using System.Xml;
using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Kompilační jednotka
    /// </summary>
    public interface ICompilationUnit : IFreezable
    {
        /// <summary>
        /// štítky jazyka
        /// </summary>
        string[] LexerTags { get; set; }
        /// <summary>
        /// Jazyk obsahu
        /// </summary>
        LanguageProperties Language { get; set; }

        /// <summary>
        /// Název souboru
        /// </summary>
        string FileName { get; set; }
        /// <summary>
        /// kódování souboru
        /// </summary>
        Encoding FileEncoding { get; set; }
        /// <summary>
        /// Obsah souboru
        /// </summary>
        IFileContent FileContent { get; }
        /// <summary>
        /// otevřený soubor sestavy
        /// </summary>
        OpenedFile OpenedFile { get; set; }
        /// <summary>
        /// Indikuje chybu během kontroly
        /// </summary>
        bool ErrorsDuringCompile { get; set; }
        /// <summary>
        /// chybová hláška
        /// </summary>
        string ErrorMessage { get; set; }
        /// <summary>
        /// Informace z kompilované jednotky
        /// </summary>
        /// <param name="nodeXPath">Hledaný atribut</param>
        /// <param name="attributeName">Indikuje, že atribut je kořenový</param>
        /// <returns></returns>
        string GetAttributeValue(string nodeXPath, string attributeName);
        /// <summary>
        /// získání sekce jednotky
        /// </summary>
        /// <param name="nodeXPath">Cesta k sekcí</param>
        /// <returns>seznam nalezených sekcí</returns>
        XmlNodeList GetSection(string nodeXPath);

        /// <summary>
        /// Získání identifikátoru souboru
        /// </summary>
        /// <returns>Idfentifikátor souboru</returns>
        string GetID();

        /// <summary>
        /// překlad jednotky
        /// </summary>
        void Compile();
        /// <summary>
        /// aktualizace obsahu
        /// </summary>
        /// <param name="content">obsah k aktualizací</param>
        /// <param name="showError">TRUE - zobrazení hlášení o chybě</param>
        void UpdateContent(string content, bool showError = false);
    }
}
