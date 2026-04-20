//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IFileContent.cs                          </Name>
//    <Description> rozhraní obsahu souboru                                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-26                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// rozhraní obsahu souboru
    /// </summary>
    public interface IFileContent
    {
        /// <summary>
        /// obsah souboru
        /// </summary>
        string Content { get; }
        /// <summary>
        /// uvolnění obsahu
        /// </summary>
        void Dispose();

        /// <summary>
        /// kolekce členů obsahu
        /// </summary>
        ICollection<IMember> Members { get; }

        /// <summary>
        /// Jazykové vlastnosti daného souboru
        /// </summary>
        LanguageProperties Language { get; }

        /// <summary>
        /// odstranění kompilační jednotky
        /// </summary>
        /// <param name="oldUnit">jednotka k odstranění</param>
        void RemoveCompilationUnit(ICompilationUnit oldUnit);
        /// <summary>
        /// aktualizace kompilační jednotky
        /// </summary>
        /// <param name="oldUnit">neaktuální jednotka</param>
        /// <param name="parserOutput">aktuální jednotka</param>
        /// <param name="fileName">název souboru</param>
        void UpdateCompilationUnit(ICompilationUnit oldUnit, ICompilationUnit parserOutput, string fileName);
        /// <summary>
        /// aktualizace obsahu
        /// </summary>
        /// <param name="content">obsah k aktuallizací</param>
        /// <param name="showError">TRUE - zobrazení hlášení o chybě</param>
        void UpdateContent(string content, bool showError = false);
        /// <summary>
        /// získání člena
        /// </summary>
        /// <param name="typeName">název typu člena</param>
        /// <param name="typeParameterCount">počet typových parametrů</param>
        /// <returns></returns>
        IMember GetMemeber(string typeName, int typeParameterCount);

        /// <summary>
        /// Získání pozice člena.
        /// </summary>
        /// <param name="entity">Jednotka, u které se hledá pozice.</param>
        FilePosition GetPosition(IEntity entity);
    }
}
