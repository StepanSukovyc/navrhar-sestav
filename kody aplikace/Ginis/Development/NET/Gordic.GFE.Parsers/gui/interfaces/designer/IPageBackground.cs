//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IPageBackground.cs                       </Name>
//    <Description> Rozhraní objektů pozadí                                     </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2016-09-15                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní objektů pozadí
    /// </summary>
    public interface IPageBackground
    {
        /// <summary>
        /// indikátor, že objekt je nebo není pozadím
        /// </summary>
        bool BackType { get; set; }

        /// <summary>
        /// Barva pozadí
        /// </summary>
        IComplexColor BackColor { get; set; }

        /// <summary>
        /// pozice shora
        /// </summary>
        SizeValue BackTop { get; set; }
        /// <summary>
        /// pozice zleva
        /// </summary>
        SizeValue BackLeft { get; set; }

        /// <summary>
        /// šířka
        /// </summary>
        SizeValue BackWidth { get; set; }
        /// <summary>
        /// výška
        /// </summary>
        SizeValue BackHeight { get; set; }
    }
}
