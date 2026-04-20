//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IMarginable.cs                           </Name>
//    <Description> rozhraní okrajů                                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-16                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Utils;
using System;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// rozhraní okrajů
    /// </summary>
    public interface IMarginable
    {
        /// <summary>
        /// odsazení zlevá
        /// </summary>
        SizeValue MarginLeft { get; set; }
        /// <summary>
        /// odsazení zprava
        /// </summary>
        SizeValue MarginRight { get; set; }
        /// <summary>
        /// odsazení shora
        /// </summary>
        SizeValue MarginTop { get; set; }
        /// <summary>
        /// odsazení dole
        /// </summary>
        SizeValue MarginBottom { get; set; }

        /// <summary>
        /// volá se po změně odsazení shora stránky
        /// </summary>
        event EventHandler MarginTopChanged;
        /// <summary>
        /// volá se po změně odsazení zprava stránky
        /// </summary>
        event EventHandler MarginRightChanged;
        /// <summary>
        /// volá se po změně odsazení zleva stránky
        /// </summary>
        event EventHandler MarginLeftChanged;
    }
}
