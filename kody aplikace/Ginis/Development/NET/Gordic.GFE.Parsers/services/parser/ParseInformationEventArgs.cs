//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ParseInformationEventArgs.cs             </Name>
//    <Description> Informace analyzátoru                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Dom;

namespace Gordic.GFE.Parsers.Services
{
    /// <summary>
    /// Informace analyzátoru
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e">Argument analyzátoru</param>
    public delegate void ParseInformationEventHandler(object sender, ParseInformationEventArgs e);

    /// <summary>
    /// Arguent analyzátora
    /// </summary>
    public class ParseInformationEventArgs : EventArgs
    {
        readonly string fileName;
        readonly ICompilationUnit oldCompilationUnit;
        readonly ICompilationUnit newCompilationUnit;

        /// <summary>
        /// Název souboru
        /// </summary>
        public string FileName { get { return fileName; } }

        /// <summary>
        /// Stará kompilovaná jednotka.
        /// </summary>
        public ICompilationUnit OldCompilationUnit { get { return oldCompilationUnit; } }

        /// <summary>
        /// Nově zkompilovaná jednotka.
        /// </summary>
        public ICompilationUnit NewCompilationUnit { get { return newCompilationUnit; } }

        /// <summary>
        /// Vytvoření nové třídy
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <param name="oldCompilationUnit">Stará kompilovaná jednotka</param>
        /// <param name="newCompilationUnit">Nová kompilovaná jednotka</param>
        public ParseInformationEventArgs(string fileName, ICompilationUnit oldCompilationUnit, ICompilationUnit newCompilationUnit)
        {
            this.fileName = fileName;
            this.oldCompilationUnit = oldCompilationUnit;
            this.newCompilationUnit = newCompilationUnit;
        }
    }
}
