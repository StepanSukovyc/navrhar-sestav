//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FontService.cs                         </Name>
//    <Description> služba pro práci s písmem                                   </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-07-08                                                  </Created>
//  </FileHeader>

using System.Drawing;

namespace Gordic.GFE.WinClient.Service
{
    /// <summary>
    /// služba pro práci s písmem
    /// </summary>
    static class FontService
    {
        /// <summary>
        /// Barva písma
        /// </summary>
        public static Color Color { get; set; }

        /// <summary>
        /// název písma
        /// </summary>
        public static string FontName { get; set; }
        /// <summary>
        /// velikost písma
        /// </summary>
        public static Parsers.Utils.SizeValue Size { get; set; }
    }
}
