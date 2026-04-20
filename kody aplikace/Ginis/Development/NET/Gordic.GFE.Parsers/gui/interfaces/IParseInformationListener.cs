//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IParseInformationListener.cs             </Name>
//    <Description> Naslouchání změnam informačního analýzeru                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Dom;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Naslouchání změnam informačního analýzeru
    /// </summary>
    public interface IParseInformationListener
    {
        /// <summary>
        /// Aktualizace informací
        /// </summary>
        /// <param name="parseInfo">Analýzer informaci</param>
        void ParseInformationUpdated(ParseInformation parseInfo);
    }
}
