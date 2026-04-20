//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ICell.cs                               </Name>
//    <Description> rozraní buňky                                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-23                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.Parsers.Editor
{
    /// <summary>
    /// rozhraní buněk
    /// </summary>
    public interface ICell : IPaintable, IParentable, ITowedHandler, ISizable, IZoomSizable, IOrder
    {
        /// <summary>
        /// řádek buňky
        /// se nastavuje přes Parent
        /// </summary>
        ILine Line { get; }
        /// <summary>
        /// objekt buňky
        /// </summary>
        ISizable Sizable { get; set; }

        /// <summary>
        /// pozice buňky v seznamu nadřazeného objektu
        /// </summary>
        int Index { get; }
        /// <summary>
        /// Indikuje fakt, že objekt obsahuje pouze jedno prázdné textové pole
        /// </summary>
        bool IsEmpty { get; }
        /// <summary>
        /// Indikuje fakt, že objekt obsahuje pouze komentář
        /// </summary>
        bool IsComment { get; }
        /// <summary>
        /// indikuje, že velikost je brána dle obsahu
        /// </summary>
        bool IsHeightByContent { get; set; }
        /// <summary>
        /// indikuje, že šířka je dle pozůstalé velikosti řádku
        /// </summary>
        bool IsWidthByContent { get; set; }

        /// <summary>
        /// Indikuje dostupnost operace posunu objektu doleva
        /// </summary>
        bool EnableShiftLeft { get; }
        /// <summary>
        /// Indikuje dostupnost operace posunu objektu doprava
        /// </summary>
        bool EnableShiftRight { get; }

        /// <summary>
        /// indikuje, že buňka obsahuje vybraný objekt
        /// </summary>
        bool IsSelected { get; }

        /// <summary>
        /// stránka buňky
        /// </summary>
        Gordic.GFE.Parsers.IPage Page { get; }

        /// <summary>
        /// Získání vzhledu kurzóru dle jeho umístění
        /// </summary>
        /// <param name="pointF">Umístění kurzóru</param>
        /// <param name="direction">Směr pohybu</param>
        /// <returns>Vzhled kurzoru</returns>
        Cursor GetCursor(PointF pointF, ref int direction);
        /// <summary>
        /// aktualizace vnitřních položek dle struktury
        /// </summary>
        void RefreshByStructure();
        /// <summary>
        /// načtení výšky
        /// </summary>
        void LoadHeight();
        /// <summary>
        /// načtení šířky
        /// </summary>
        /// <param name="pc100">číslo, představující 100%</param>
        void LoadWidth(float pc100);
        /// <summary>
        /// uložení obsahu řádku do <paramref name="xmlElement"/>
        /// </summary>
        /// <param name="xmlElement">daný XML element, do kterého se vkládá obsah</param>
        /// <param name="xmlDoc">výsledný dokument</param>
        /// <param name="styles">seznam již dostupných stylů</param>
        void SetData(System.Xml.XmlElement xmlElement, XmlDocumentPosition xmlDoc, List<GFEList> styles = null);
        /// <summary>
        /// odstranění objektu
        /// </summary>
        /// <param name="cmp">objekt k odstranění</param>
        void Delete(object cmp = null);
    }

    /// <summary>
    /// rozraní buňky
    /// </summary>
    public interface IGRRCell : ICell, ISizeHandler, ICloneable
    {
        /// <summary>
        /// region řádku
        /// </summary>
        ILabel ParentLabel { get; }
        /// <summary>
        /// Indikuje dostupnost operace posun objektu o jeden nahoru
        /// </summary>
        bool EnableShiftUp { get; }
        /// <summary>
        /// Indikuje dostupnost operace posun objektu o jeden dolu
        /// </summary>
        bool EnableShiftDown { get; }

        /// <summary>
        /// je nulové výšky
        /// </summary>
        bool IsNULLHeight { get; set; }

        /// <summary>
        /// Indikuje dostupnost operace přesunu do hlavičky
        /// </summary>
        bool EnableMoveToHead { get; }
        /// <summary>
        /// Indikuje dostupnost operace přesunu do těla
        /// </summary>
        bool EnableMoveToBody { get; }
        /// <summary>
        /// Indikuje dostupnost operace přesunu do patičky
        /// </summary>
        bool EnableMoveToFoot { get; }
    }
}
