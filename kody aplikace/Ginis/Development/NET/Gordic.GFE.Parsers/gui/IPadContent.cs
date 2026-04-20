//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IPadContent.cs                           </Name>
//    <Description> IPadContent rozhraní je základním rozhraním pro nástrojové okno Návrháře sestav</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-10                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// IPadContent rozhraní je základním rozhraním pro nástrojové okno Návrháře sestav
    /// </summary>
    public interface IPadContent : IDisposable
    {
        /// <summary>
        /// Vrácí Windows.Control pro tuto položku.
        /// </summary>
        Control Control { get; }

        /// <summary>
        /// Znovu inicializuje všechny komponenty položky.
        /// Nevolat pokud nevíte co děláte
        /// </summary>
        void RedrawContent();
    }
}
