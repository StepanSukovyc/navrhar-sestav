//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IChart.cs                                </Name>
//    <Description> rozhraní grafů                                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-17                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using Gordic.GFE.Parsers.Utils;
using Gordic.Report.Implementation;
using Gordic.GFE.Parsers.Editor;
using System.Xml;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// typ vrstvy
    /// </summary>
    public enum LayerLayersType
    {
        /// <summary>
        /// 
        /// </summary>
        none = 0,
        /// <summary>
        /// 
        /// </summary>
        side = 1,
        /// <summary>
        /// 
        /// </summary>
        side_colors = 2,
        /// <summary>
        /// 
        /// </summary>
        line = 3,
        /// <summary>
        /// 
        /// </summary>
        area = 4,
        /// <summary>
        /// 
        /// </summary>
        stack = 5
    }
    /// <summary>
    /// Typy Shape
    /// </summary>
    public enum ShapeType
    {
        /// <summary>
        /// 
        /// </summary>
        round = 0,
        /// <summary>
        /// 
        /// </summary>
        bar = 1,
        /// <summary>
        /// pouze sloupcový
        /// </summary>
        circle = 2
    }
    /// <summary>
    /// typ štítku vrstvy
    /// </summary>
    public enum ChartLabelLayoutType
    {
        /// <summary>
        /// 
        /// </summary>
        side = 0,
        /// <summary>
        /// 
        /// </summary>
        circle = 1
    }
    /// <summary>
    /// Náplň popisek vrstvy grafu
    /// </summary>
    public enum ChartLabelType
    {
        /// <summary>
        /// 
        /// </summary>
        none = 0,
        /// <summary>
        /// 
        /// </summary>
        value = 1,
        /// <summary>
        /// 
        /// </summary>
        percent = 2,
        /// <summary>
        /// 
        /// </summary>
        label_value = 3,
        /// <summary>
        /// 
        /// </summary>
        label_percent = 4,
        /// <summary>
        /// 
        /// </summary>
        label = 5
    }
    /// <summary>
    /// Legenda
    /// </summary>
    public enum ChartLegendType
    {
        /// <summary>
        /// 
        /// </summary>
        none = 0,
        /// <summary>
        /// 
        /// </summary>
        left = 1,
        /// <summary>
        /// 
        /// </summary>
        top = 2,
        /// <summary>
        /// 
        /// </summary>
        right = 3,
        /// <summary>
        /// 
        /// </summary>
        bottom = 4
    }

    /// <summary>
    /// rozhraní položky množiny dat grafu
    /// </summary>
    public interface IChartDataSet
    {
        /// <summary>
        /// Název
        /// </summary>
        string Name { get; set; }
        /// <summary>
        /// Serie
        /// </summary>
        int Serie { get; set; }
        /// <summary>
        /// Barva množiny dat
        /// </summary>
        IComplexColor Color { get; set; }

        /// <summary>
        /// atributy množiny dat
        /// </summary>
        GFEAttrList AttrList { get; set; }

        /// <summary>
        /// neznáme atributy
        /// </summary>
        Dictionary<string, string> AttrUnknowns { get; }

        /// <summary>
        /// Metoda vracení XML struktury samotného elementu (bez STYLE)
        /// </summary>
        /// <param name="xmlDoc">Dokument, do kterého se struktura vkládá</param>
        /// <param name="namespaceUri">jmenný prostor <paramref name="xmlDoc"/></param>
        /// <returns>Element popisující samotný objekt bez stylů</returns>
        XmlElement GetDataComponent(XmlDocumentPosition xmlDoc, string namespaceUri = null);
    }

    /// <summary>
    /// rozhraní vrstv grafu
    /// </summary>
    public interface IChartLayer
    {
        /// <summary>
        /// typ vrstvy
        /// </summary>
        LayerLayersType Type { get; set; }
        /// <summary>
        /// tvar vrstvy
        /// </summary>
        ShapeType Shape { get; set; }
        /// <summary>
        /// indikátor kreslení 3D
        /// </summary>
        bool Draw3D { get; set; }

        /// <summary>
        /// jméno množiny dat (pro legendu)
        /// </summary>
        string DataSetName { get; set; }
        /// <summary>
        /// Barva množiny dat
        /// </summary>
        IComplexColor DataSetColor { get; set; }

        /// <summary>
        /// Náplň popisek vrstvy
        /// </summary>
        ChartLabelType Label { get; set; }
        /// <summary>
        /// typ štítku vrstvy
        /// </summary>
        ChartLabelLayoutType LabelLayout { get; set; }

        /// <summary>
        /// Legenda
        /// </summary>
        ChartLegendType Legend { get; set; }
        /// <summary>
        /// Všechny atributy objektu
        /// </summary>
        GFEAttrList AttrList { get; set; }
        /// <summary>
        /// seznam množin dat
        /// </summary>
        ChartLayersDataSets DataSet { get; set; }
        /// <summary>
        /// Metoda vracení XML struktury samotného elementu (bez STYLE)
        /// </summary>
        /// <param name="xmlDoc">Dokument, do kterého se struktura vkládá</param>
        /// <param name="namespaceUri">jmenný prostor <paramref name="xmlDoc"/></param>
        /// <returns>Element popisující samotný objekt bez stylů</returns>
        XmlElement GetDataComponent(XmlDocumentPosition xmlDoc, string namespaceUri = null);
    }
    /// <summary>
    /// rozhraní grafů
    /// </summary>
    public interface IChart
    {
        /// <summary>
        /// typ grafu
        /// </summary>
        Charting.ChartType ChartType { get; set; }
        /// <summary>
        /// kreslení 3D
        /// </summary>
        bool Draw3D { get; set; }

        /// <summary>
        /// jméno množiny dat (pro legendu)
        /// </summary>
        string DataSetName { get; set; }
        /// <summary>
        /// Barva množiny dat
        /// </summary>
        IComplexColor DataSetColor { get; set; }

        /// <summary>
        /// Text, např. "Ostatní", který bude zobrazen pro součet všech hodnot, které jsou menší než limit
        /// </summary>
        string GroupSmall { get; set; }
        /// <summary>
        /// Limit pro skupinování.
        /// Lze zadat v % nebo absolutním číslem
        /// </summary>
        SizeValue GroupLimit { get; set; }

        /// <summary>
        /// Číslo určující zda se má zobrazovat Y osa od nuly.
        /// 1 = ano, 0 = ne
        /// </summary>
        float ZeroAffinity { get; set; }

        /// <summary>
        /// 
        /// </summary>
        int StepMinor { get; set; }
        /// <summary>
        /// Zobrazí každou n-tou položky na X ose
        /// </summary>
        int StepMajor { get; set; }

        /// <summary>
        /// Seznam barev
        /// </summary>
        ChartColorPalette ColorPalette { get; set; }
        /// <summary>
        /// vrstvy grafu
        /// </summary>
        ChartLayers Layers { get; }
        /// <summary>
        /// data grafu
        /// </summary>
        ChartData Data { get; }
    }
}
