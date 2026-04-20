//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.IResolver.cs                           </Name>
//    <Description> rozhraní tříd pro rozhodování ohledně akci v textovém editoru</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-26                                                  </Created>
//  </FileHeader>

using System.Collections;
using Gordic.GFE.Parsers.Dom;

namespace Gordic.GFE.Parsers.Binding
{
    /// <summary>
    /// rozhraní tříd pro rozhodování ohledně akci v textovém editoru
    /// </summary>
    public interface IResolver
    {
        /// <summary>
        /// kolekce objektů pro nápovědu
        /// </summary>
        /// <param name="caretLine">aktuální řádek pozice kurzoru v textu</param>
        /// <param name="caretColumn">aktuální sloupec pozice kurzoru v textu</param>
        /// <param name="parseInfo">informace analyzátoru</param>
        /// <param name="fileContent">obsah souboru</param>
        /// <param name="context">kontext, ve kterém se nachází kurzór</param>
        /// <returns>seznam možných vložení</returns>
        ArrayList CtrlSpace(int caretLine, int caretColumn, 
            ParseInformation parseInfo, 
            string fileContent, 
            ExpressionContext context);

        /// <summary>
        /// Řeší výraz.
        /// </summary>
        ResolveResult Resolve(ExpressionResult expressionResult,
                              ParseInformation parseInfo,
                              string fileContent);

    }
}
