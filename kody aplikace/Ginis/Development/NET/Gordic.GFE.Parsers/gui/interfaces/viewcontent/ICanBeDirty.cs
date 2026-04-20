//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ICanBeDirty.cs                           </Name>
//    <Description> Rozhraní pro třídy implementující vlastnost IsChanged a událost IsChangedChanged</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní pro třídy implementující vlastnost IsChanged a událost IsChangedChanged
    /// </summary>
    public interface ICanBeDirty
    {
        /// <summary>
        /// Pokud tato vlastnost vrácí TRUE, pak obsah byl pozměněn 
        /// od okamžíku posledního uložení/načtení obsahu
        /// </summary>
        bool IsDirty { get; }

        /// <summary>
        /// Se volá pokud obsah byl pozměněn od okamžíku posledního uložení/načtení
        /// </summary>
        event EventHandler IsDirtyChanged;
    }
}
