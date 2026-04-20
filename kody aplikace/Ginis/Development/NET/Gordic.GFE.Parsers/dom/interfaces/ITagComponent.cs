//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ITagComponent.cs                      </Name>
//    <Description> Rozhraní základního objektu grafické sestavy                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Xml;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// rozhraní objektů, které mohou být vybrané
    /// </summary>
    public interface ISelectable
    {
        /// <summary>
        /// Indikuje vybranost objektu
        /// </summary>
        bool IsSelected { get; }
    }
    /// <summary>
    /// rozhraní objektu s pozici
    /// </summary>
    public interface IOrder
    {
        /// <summary>
        /// pozice objektu vůči stránce
        /// </summary>
        List<int> Order { get; }
    }
    /// <summary>
    /// Rozhraní základního objektu grafické sestavy
    /// </summary>
    public interface ITagComponent : ISizable, IZoomSizable, IComponent/*kvůli ServiceSelection*/, IAttributeHandler,
        IScriptHandler, IPaintable, IParentable, IAnchored, IPositionHandler, IBackground, IOrder
    {
        /// <summary>
        /// formát analyzátoru
        /// </summary>
        GFEFormatTag FormatTag { get; }
        /// <summary>
        /// Oblast obsahu - je to BoundsInPixels bez odsazení
        /// </summary>
        RectangleF ContentBounds { get; }
        /// <summary>
        /// Get/Set odsazení rámečku
        /// </summary>
        IComplexFive Spacing { get; set; }
        /// <summary>
        /// Get/Set odsazení textu
        /// </summary>
        IComplexFive Padding { get; set; }

        /// <summary>
        /// Rameček (detail)
        /// </summary>
        IComplexSurround Surround { get; set; }

        /// <summary>
        /// typ objektu
        /// </summary>
        ComponentType ComponentType { get; }
        /// <summary>
        /// Stránka objektu
        /// </summary>
        IPage Page { get; set; }

        /// <summary>
        /// pozicování objektu
        /// </summary>
        int PropertyOrder { get; set; }

        /// <summary>
        /// Metoda vracení XML struktury samotného elementu (bez STYLE)
        /// </summary>
        /// <param name="xmlDoc">Dokument, do kterého se struktura vkládá</param>
        /// <param name="xmlStyles">Seznamm nadřazených stylů</param>
        /// <param name="withRect">Indikuje vložení parametru RECT</param>
        /// <param name="regionFullName">Úplný název aktuálního regionu</param>
        /// <returns>Element prezentující daný objekt</returns>
        XmlElement GetXmlData(XmlDocumentPosition xmlDoc, List<GFEList> xmlStyles = null, bool withRect = true, string regionFullName = null);
        /// <summary>
        /// Uložení atributů do XML prezentace objektu
        /// </summary>
        /// <param name="xmlElement">XML objekt prezentující daný objekt</param>
        /// <returns>Vkládá atributy do objektu</returns>
        void SetXmlAttribute(XmlElement xmlElement);
        /// <summary>
        /// uložení obsahu řádku do <paramref name="xmlElement"/>
        /// </summary>
        /// <param name="xmlElement">daný XML element, do kterého se vkládá obsah</param>
        /// <param name="xmlDoc">výsledný dokument</param>
        /// <param name="styles">seznam již dostupných stylů</param>
        /// <param name="withRect">seznam již dostupných stylů</param>
        void SetXmlData(System.Xml.XmlElement xmlElement, XmlDocumentPosition xmlDoc, List<GFEList> styles, bool withRect = true);
        /// <summary>
        /// Aktualizace položky dle struktury
        /// </summary>
        void RefreshByStructure();
        /// <summary>
        /// Načtení informaci o objektu z formátu objektu
        /// </summary>
        void LoadInformation();
    }
}
