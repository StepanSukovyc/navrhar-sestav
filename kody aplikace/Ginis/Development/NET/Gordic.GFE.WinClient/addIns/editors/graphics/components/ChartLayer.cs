//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ChartLayer.cs                          </Name>
//    <Description> Vrstva objektu CHART                                        </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-10-23                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.UndoRedoFramework;
using System;
using System.Collections.Generic;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Services;
using System.Xml;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.General;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Vrstva objektu CHART
    /// </summary>
    class ChartLayer : IChartLayer
    {
        #region IChartLayer
        readonly UndoRedo<IComplexColor> dataSetColor = new UndoRedo<IComplexColor>();
        /// <summary>
        /// Barva množiny dat
        /// </summary>
        public IComplexColor DataSetColor { get { return dataSetColor.Value; } set { dataSetColor.Value = value; } }

        readonly UndoRedo<string> dataSetName = new UndoRedo<string>();
        /// <summary>
        /// jméno množiny dat (pro legendu)
        /// </summary>
        public string DataSetName { get { return dataSetName.Value; } set { dataSetName.Value = value; } }

        readonly UndoRedo<bool> draw3D = new UndoRedo<bool>();
        /// <summary>
        /// indikátor kreslení 3D
        /// </summary>
        public bool Draw3D { get { return draw3D.Value; } set { draw3D.Value = value; } }

        readonly UndoRedo<ChartLabelType> label = new UndoRedo<ChartLabelType>();
        /// <summary>
        /// Náplň popisek vrstvy
        /// </summary>
        public ChartLabelType Label { get { return label.Value; } set { label.Value = value; } }

        readonly UndoRedo<ChartLabelLayoutType> labelLayout = new UndoRedo<ChartLabelLayoutType>();
        /// <summary>
        /// typ štítku vrstvy
        /// </summary>
        public ChartLabelLayoutType LabelLayout { get { return labelLayout.Value; } set { labelLayout.Value = value; } }

        readonly UndoRedo<ChartLegendType> legend = new UndoRedo<ChartLegendType>();
        /// <summary>
        /// Legenda
        /// </summary>
        public ChartLegendType Legend { get { return legend.Value; } set { legend.Value = value; } }

        readonly UndoRedo<ShapeType> shape = new UndoRedo<ShapeType>();
        /// <summary>
        /// tvar vrstvy
        /// </summary>
        public ShapeType Shape { get => shape.Value; set => shape.Value = value; }

        readonly UndoRedo<LayerLayersType> type = new UndoRedo<LayerLayersType>();
        /// <summary>
        /// typ vrstvy
        /// </summary>
        public LayerLayersType Type { get { return type.Value; } set { type.Value = value; } }

        readonly UndoRedo<GFEAttrList> attrlist = new UndoRedo<GFEAttrList>();
        /// <summary>
        /// Všechny atributy objektu
        /// </summary>
        public GFEAttrList AttrList { get { return attrlist.Value; } set { attrlist.Value = value; } }

        List<string> knownTags;
        /// <summary>
        /// Seznam znamých atributů
        /// </summary>
        public List<string> KnownTags
        {
            get
            {
                if (knownTags == null)
                    knownTags = AddInTree.BuildItem("/Formation/Chart/LayerTags", null) as List<string>;
                return knownTags;
            }
        }

        /// <summary>
        /// Neznámé značky buňky
        /// </summary>
        public Dictionary<string, string> Unknowns { get => AttrList?.FindAllByKey(attr => KnownTags == null || !KnownTags.Contains(attr)); }

        /// <summary>
        /// vrstvy grafu (objektu CHART)
        /// </summary>
        public ChartLayersDataSets DataSet { get; set; }

        /// <summary>
        /// Metoda vracení XML struktury samotného elementu (bez STYLE)
        /// </summary>
        /// <param name="xmlDoc">Dokument, do kterého se struktura vkládá</param>
        /// <param name="namespaceUri">jmenný prostor <paramref name="xmlDoc"/></param>
        /// <returns>Element popisující samotný objekt bez stylů</returns>
        public XmlElement GetDataComponent(XmlDocumentPosition xmlDoc, string namespaceUri = null)
        {
            XmlElement xmlNode = xmlDoc.CreateElement("layer", string.IsNullOrEmpty(namespaceUri) ? ReportDesignerProperties.Instance.AlfReportXmlns : namespaceUri);

            if (!string.IsNullOrEmpty(DataSetName))
                xmlNode.SetAttribute("name", DataSetName);
            if (!Draw3D)
                xmlNode.SetAttribute("draw3d", "false");

            if (Label != ChartLabelType.label_percent)
                switch (Label)
                {
                    case ChartLabelType.label_value:
                        xmlNode.SetAttribute("label", "label-value");
                        break;
                    default:
                        xmlNode.SetAttribute("label", ChartLabelType.label.ToString());
                        break;
                }

            if (LabelLayout != ChartLabelLayoutType.side)
                xmlNode.SetAttribute("label-layout", LabelLayout.ToString());

            if (Legend != ChartLegendType.none)
                xmlNode.SetAttribute("legend", Legend.ToString());

            if (Shape != ShapeType.round)
                xmlNode.SetAttribute("shape", Shape.ToString());

            switch (Type)
            {
                case LayerLayersType.side_colors:
                    xmlNode.SetAttribute("type", "side-colors");
                    break;
                default:
                    xmlNode.SetAttribute("type", Type.ToString());
                    break;
            }

            if (DataSetColor != null && DataSetColor.Color != System.Drawing.Color.Transparent)
                xmlNode.SetAttribute("color", DataSetColor.Name);

            // uložíme neznámé značky
            // po aktualizací objektu dodělat pouze neznáme značky
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Unknowns, null);

            if (DataSet != null && DataSet.Count > 0)
                foreach (var item in DataSet)
                    xmlNode.AppendChild(item.GetDataComponent(xmlDoc, namespaceUri));

            return xmlNode;
        }
        #endregion

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="item">položka sestavy obsahující vlastnosti</param>
        public ChartLayer(GFEFormatTag item)
            : this()
        {
            if (item != null)
            {
                AttrList.AddRange(item.Attributes);
                AttrList.SynchronizeByOrigin();

                if (AttrList.ContainsKey("name"))
                    DataSetName = AttrList["name"];

                if (AttrList.ContainsKey("color"))
                    DataSetColor = new URComplexColor().Initialize(AttrList["color"]);

                Draw3D = AttrList.ContainsKey("draw3d") && bool.TryParse(AttrList["draw3d"], out bool d3dValue) ? d3dValue : true;
                Label = AttrList.ContainsKey("label") && Enum.TryParse<ChartLabelType>(AttrList["label"], out ChartLabelType cltValue) ? cltValue : ChartLabelType.label_percent;
                LabelLayout = AttrList.ContainsKey("label-layout") && Enum.TryParse<ChartLabelLayoutType>(AttrList["label-layout"], out ChartLabelLayoutType clltValue) ? clltValue : ChartLabelLayoutType.side;
                Legend = AttrList.ContainsKey("legend") && Enum.TryParse<ChartLegendType>(AttrList["legend"], out ChartLegendType cltlValue) ? cltlValue : ChartLegendType.none;
                Shape = AttrList.ContainsKey("shape") && Enum.TryParse<ShapeType>(AttrList["shape"], out ShapeType stValue) ? stValue : ShapeType.round;
                Type = AttrList.ContainsKey("type") ? (AttrList["type"].Equals("side-colors", StringComparison.OrdinalIgnoreCase) ? LayerLayersType.side_colors : (Enum.TryParse<LayerLayersType>(AttrList["type"], out LayerLayersType llttType) ? llttType : LayerLayersType.none)) : LayerLayersType.none;

                foreach (var subItem in item.Children)
                    if (subItem.TagName.Equals("dataset", StringComparison.OrdinalIgnoreCase))
                        LoadInternalDataSet(subItem);
            }
        }
        /// <summary>
        /// konstruktor třídy
        /// </summary>
        public ChartLayer()
        {
            AttrList = new GFEAttrList();
            DataSet = new ChartLayersDataSets(UndoRedoService.Manager);
        }

        void LoadInternalDataSet(GFEFormatTag item)
        {
            if (item != null)
                DataSet.Add(new ChartLayerDataSet(item));
        }

        /// <exclude/>
        public override string ToString()
        {
            return string.IsNullOrEmpty(this.DataSetName) ? GResources.GetResourceText(29451441) : this.DataSetName;
        }
    }
}
