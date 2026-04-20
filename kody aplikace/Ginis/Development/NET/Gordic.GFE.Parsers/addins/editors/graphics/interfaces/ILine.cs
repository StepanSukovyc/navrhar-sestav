//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ILine.cs                               </Name>
//    <Description> rozhraní řádků                                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-23                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.Parsers.Editor
{
    /// <summary>
    /// rozhraní manipulací s řádkem
    /// </summary>
    public interface ILineManipulator
    {
        /// <summary>
        /// posunutí aktuálního objektu o jeden dolů
        /// </summary>
        /// <param name="lineOrLabel">Posouváný objekt</param>
        void ShiftDown(object lineOrLabel);
        /// <summary>
        /// posunutí aktuálního objektu o jeden dolů
        /// </summary>
        /// <param name="lineOrLabel">Posouváný objekt</param>
        void ShiftUp(object lineOrLabel);

        /// <summary>
        /// vložení nového řádku před daný objekt
        /// </summary>
        /// <param name="obj">daný objekt</param>
        /// <param name="config">indikuje nutnost brat ohled na konfiguraci</param>
        void InsertBefore(object obj, bool config = false);
        /// <summary>
        /// vložení nového řádku za daný objekt
        /// </summary>
        /// <param name="obj">daný objekt</param>
        /// <param name="config">indikuje nutnost brat ohled na konfiguraci</param>
        void InsertAfter(object obj, bool config = false);
        /// <summary>
        /// vložení prázdného řádku do sekce <paramref name="lineType"/>.
        /// </summary>
        /// <param name="type">Typ vkládaného objektu</param>
        /// <param name="lineType">typ nového řádku</param>
        void InsertTo(Type type, LineType lineType = LineType.body);

        /// <summary>
        /// odstranění řádku ze seznamu
        /// </summary>
        /// <param name="line">řádek k odstranění</param>
        void Delete(ILine line);
    }

    /// <summary>
    /// Rozhraní pro práci s řádky
    /// </summary>
    public interface ILineHandler
    {
        /// <summary>
        /// Indikuje dostupnost operace přesunu do hlavičky nadřazeného regionu
        /// </summary>
        bool EnableMoveToHeadRegion { get; }
        /// <summary>
        /// Indikuje dostupnost operace přesunu do patičky nadřazeného regionu
        /// </summary>
        bool EnableMoveToFootRegion { get; }

        /// <summary>
        /// Přesun objektu do hlavičky nadřazeného regionu.
        /// Platí pro přesun objektu ze skupiny
        /// </summary>
        /// <param name="obj">Přesouvaný objekt</param>
        void MoveToHeadRegion(object obj);
        /// <summary>
        /// Přesun objektu do patičky nadřazeného regionu.
        /// Platí pro přesun objektu ze skupiny
        /// </summary>
        /// <param name="obj">Přesouvaný objekt</param>
        void MoveToFootRegion(object obj);

        /// <summary>
        /// Vložení řádku dle typu
        /// </summary>
        /// <param name="lineType">Typ řádku</param>
        void InsertLine(LineType lineType);
    }

    /// <summary>
    /// lehká verze rozhraní řádků
    /// </summary>
    public interface ILineLite : ISizable, IZoomSizable
    {
        /// <summary>
        /// přidavatelný
        /// </summary>
        bool Adding { get; set; }
    }

    /// <summary>
    /// rozhraní řádku
    /// </summary>
    public interface ILine : IList<ICell>, ILineLite, IParentable, IPaintable, IOrder
    {
        /// <summary>
        /// volá se po změně typu řádku
        /// </summary>
        event EventHandler TypeChanged;

        /// <summary>
        /// stránka řádku
        /// </summary>
        IPage Page { get; set; }
        /// <summary>
        /// indikuje, že objekt se nachází v režimu načítání
        /// </summary>
        bool IsLoading { get; set; }
        /// <summary>
        /// indikuje, že probíhá změna výšky
        /// </summary>
        bool IsHeightChanging { get; set; }
        
        /// <summary>
        /// indikuje, že velikost je brána dle obsahu
        /// </summary>
        bool IsHeightByContent { get; set; }
        
        /// <summary>
        /// Typ řádku 
        /// </summary>
        LineType Type { get; set; }
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

        /// <summary>
        /// Přepočet výšky
        /// </summary>
        /// <param name="cell">aktuálně vybraná buňka řádku</param>
        void RecalcHeight(IGRRCell cell);
        /// <summary>
        /// nastavení pozic ZLEVA všem vnořeným objektům
        /// </summary>
        void SetInternalLeft();
        /// <summary>
        /// nastavení šířky vnitřním objektům
        /// </summary>
        void SetInternalWidth(bool load = false);
        /// <summary>
        /// načtení interní velikosti řádku
        /// </summary>
        /// <param name="loadHeight">indikuje, že je zapotřebí načíst velikost</param>
        /// <param name="setByLine">TRUE - nastaví velikost objektů dle řádku</param>
        void SetInternalHeight(bool loadHeight = false, bool setByLine = false);
        /// <summary>
        /// aktualizace výšek a pozic shora všech vnořených objektů
        /// </summary>
        void RefreshTopHeight();

        /// <summary>
        /// Změní velikost sousedních objektů dle velikosti změny dané buňky <paramref name="cell"/>.
        /// </summary>
        /// <param name="cell">Buňka, pozice které byla pozměněná</param>
        /// <param name="leftDiff">Velikost změny pozice zlevá dané buňky <paramref name="cell"/>.</param>
        void ItemLeftChanged(ICell cell, float leftDiff);
        /// <summary>
        /// uložení obsahu řádku do <paramref name="xmlElement"/>
        /// </summary>
        /// <param name="xmlElement">daný XML element, do kterého se vkládá</param>
        /// <param name="xmlDoc">dokument elementu</param>
        /// <param name="styles">seznam již dostupných stylů</param>
        /// <param name="nodeName">název větve</param>
        void SetData(System.Xml.XmlElement xmlElement, XmlDocumentPosition xmlDoc, List<GFEList> styles, string nodeName = "line");

        /// <summary>
        /// vložení nové buňky před danou
        /// </summary>
        /// <param name="insertCell">vkládaná buňka</param>
        /// <param name="cell">Daná buňka</param>
        /// <param name="component">Vkládaný obsah</param>
        void InsertCellBefore(ICell cell, ICell insertCell = null, ITagComponent component = null);
        /// <summary>
        /// vložení nové buňky za danou
        /// </summary>
        /// <param name="cell">daná buňka</param>
        /// <param name="insertCell">daná buňka</param>
        /// <param name="component">Vkládaný objsah</param>
        void InsertCellAfter(ICell cell, ICell insertCell = null, ITagComponent component = null);

        /// <summary>
        /// posunutí buňky <paramref name="cell"/> o jednu pozici doleva
        /// </summary>
        /// <param name="cell">buňka pro přesun</param>
        void ShiftLeft(ICell cell);
        /// <summary>
        /// posunití buňky <paramref name="cell"/> o jednu pozici doprava
        /// </summary>
        /// <param name="cell">buňka pro přesunutí</param>
        void ShiftRight(ICell cell);
        /// <summary>
        /// odstranění buňky ze seznamu
        /// </summary>
        /// <param name="cell">buňka k odstranění</param>
        void Delete(ICell cell);

        /// <summary>
        /// Zkontroluje, jestli je zapotřebí aktualizovat velikost řádku dle aktuální hodnoty IsHeightByContent.
        /// </summary>
        void CheckIsHeightByContent();

        /// <summary>
        /// aktualizace vnitřních položek dle struktury
        /// </summary>
        void RefreshByStructure();
        /// <summary>
        /// aktualizace velikosti a umístění buněk
        /// </summary>
        void RefreshWidthLeft();
    }

    /// <summary>
    /// rozhraní řádků
    /// </summary>
    public interface IGRRLine : ILine, ISizeHandler, ICloneable
    {
        /// <summary>
        /// je nulové výšky
        /// </summary>
        bool IsNULLHeight { get; set; }
        /// <summary>
        /// Indikuje fakt, že objekt obsahuje pouze jedno prázdné textové pole
        /// </summary>
        bool IsEmpty { get; }

        /// <summary>
        /// pozice objektu v seznamu nadřazeného objektu
        /// </summary>
        int Index { get; }

        /// <summary>
        /// volá se po změně vlastníka
        /// </summary>
        event EventHandler ParentChanged;

        /// <summary>
        /// vlastnosti řádku
        /// </summary>
        LineProperty Property { get; }
        /// <summary>
        /// získání objektu pod kurzorem
        /// </summary>
        /// <param name="point">pozice kurzoru vůči stránce</param>
        /// <returns>Objekt, který se nachází bezprostředně pod kurzorem</returns>
        object GetTowedObject(PointF point);

        /// <summary>
        /// Indikuje fakt, že objekt obsahuje pouze komentář
        /// </summary>
        bool IsComment { get; set; }
        /// <summary>
        /// Indikuje viditelnost objektu v závislosti na režimu zobrazení (řádky nulové výšky, komentáře nebo normální zobrazení)
        /// </summary>
        bool IsVisible { get; }

        /// <summary>
        /// Posun aktuálního řádku nahoru
        /// </summary>
        void ShiftUp();
        /// <summary>
        /// Posun aktuálního řádku dolů
        /// </summary>
        void ShiftDown();

        /// <summary>
        /// nastavení NULLové výšky
        /// </summary>
        /// <param name="value">hodnota NULLové výšky</param>
        void SetNullHeight(bool value);
        /// <summary>
        /// načtení informace z uvedeného objektu <paramref name="line"/>
        /// do daného s ohledem (bez ohledu) na konfigurací <paramref name="insertSett"/>.
        /// </summary>
        /// <param name="line">uvedený objekt</param>
        /// <param name="page">stránka objektu</param>
        /// <param name="insertSett">TRUE - brat v ohled nastavení vložení</param>
        /// <returns></returns>
        IGRRLine LoadInformation(dynamic line, IPage page, bool insertSett = false);
    }
}
