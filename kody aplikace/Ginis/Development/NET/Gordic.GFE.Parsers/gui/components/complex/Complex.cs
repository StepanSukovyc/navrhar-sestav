//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Complex.cs                               </Name>
//    <Description> Pomocné třídy komplexných objektů                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-01                                                  </Created>
//  </FileHeader>

using System.Linq;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Seznam dostupných formátů
    /// </summary>
    public class ListOfFormats
    {
        /// <summary>
        /// Dostupné formáty
        /// </summary>
        public static string[] Formats
        {
            get { return CommonService.Formats.Values.ToList().ToArray(); }
        }
    }
}
