//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.IInfoHandler.cs                        </Name>
//    <Description> Rzhraní sekce INFO                                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-28                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using Gordic.General;
using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.WinClient.Gui
{
    /// <summary>
    /// Rzhraní sekce INFO
    /// </summary>
    interface IInfoHandler
    {
        /// <summary>
        /// Získání sekce info
        /// </summary>
        /// <returns></returns>
        Dictionary<string, string> GetInfo();
        /// <summary>
        /// Typ sestavy
        /// </summary>
        /// <returns></returns>
        GString GetFormatType();
        /// <summary>
        /// Nastavení sekce info
        /// </summary>
        /// <param name="dictionary">seznam přidávaných hodnot</param>
        /// <param name="file">otevřený soubor</param>
        void AppendInfo(Dictionary<string, string> dictionary, OpenedFile file );
    }
}
