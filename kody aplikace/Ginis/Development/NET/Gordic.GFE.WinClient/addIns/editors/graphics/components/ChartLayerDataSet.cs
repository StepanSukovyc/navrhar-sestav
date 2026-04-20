//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ChartLayerDataSet.cs                   </Name>
//    <Description> množina dat vrstvy CHART objektu                            </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-10-23                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.UndoRedoFramework;
using System.Collections.Generic;
using Gordic.GFE.Parsers.Utils;
using System.Xml;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.Parsers;
using Gordic.General;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// množina dat vrstvy CHART objektu
    /// </summary>
    class ChartLayerDataSet : IChartDataSet
    {
        #region IChartDataSet
        readonly UndoRedo<GFEAttrList> attrlist = new UndoRedo<GFEAttrList>();
        /// <summary>
        /// seznam všech atributů
        /// </summary>
        public GFEAttrList AttrList { get { return attrlist.Value; } set { attrlist.Value = value; } }

        readonly UndoRedo<string> name = new UndoRedo<string>();
        /// <summary>
        /// název množiny dat
        /// </summary>
        public string Name { get { return name.Value; } set { name.Value = value; } }

        readonly UndoRedo<int> serie = new UndoRedo<int>();
        /// <summary>
        /// série množiny dat
        /// </summary>
        public int Serie { get { return serie.Value; } set { serie.Value = value; } }

        readonly UndoRedo<IComplexColor> color = new UndoRedo<IComplexColor>();
        /// <summary>
        /// Barva množiny dat
        /// </summary>
        public IComplexColor Color { get { return color.Value; } set { color.Value = value; } }

        /// <summary>
        /// Metoda vracení XML struktury samotného elementu (bez STYLE)
        /// </summary>
        /// <param name="xmlDoc">Dokument, do kterého se struktura vkládá</param>
        /// <param name="namespaceUri">jmenný prostor <paramref name="xmlDoc"/></param>
        /// <returns>Element popisující samotný objekt bez stylů</returns>
        public XmlElement GetDataComponent(XmlDocumentPosition xmlDoc, string namespaceUri = null)
        {
            XmlElement xmlNode = xmlDoc.CreateElement("dataset", string.IsNullOrEmpty(namespaceUri) ? ReportDesignerProperties.Instance.AlfReportXmlns : namespaceUri);

            if (!string.IsNullOrEmpty(Name))
                xmlNode.SetAttribute("name", Name);

            if (Serie != 0)
                xmlNode.SetAttribute("series", Serie.ToString());

            if (Color != null && Color.Color != System.Drawing.Color.Transparent)
                xmlNode.SetAttribute("color", Color.Name);

            // uložíme neznámé značky
            // po aktualizací objektu dodělat pouze neznáme značky
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, AttrUnknowns, null);

            return xmlNode;
        }
        #endregion

        List<string> knownTags;
        /// <summary>
        /// Seznam znamých atributů
        /// </summary>
        public List<string> KnownTags
        {
            get
            {
                if (knownTags == null)
                    knownTags = AddInTree.BuildItem("/Formation/Chart/LayerDataSetTags", null) as List<string>;
                return knownTags;
            }
        }

        /// <summary>
        /// Neznámé značky buňky
        /// </summary>
        public Dictionary<string, string> AttrUnknowns { get => AttrList?.FindAllByKey(attr => KnownTags == null || !KnownTags.Contains(attr)); }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="item">položka s informaci o objektu</param>
        public ChartLayerDataSet(Parsers.Core.GFEFormatTag item)
            : this()
        {
            if (item != null)
            {
                AttrList.AddRange(item.Attributes);
                AttrList.SynchronizeByOrigin();

                if (AttrList.ContainsKey("name"))
                    Name = AttrList["name"];

                Serie = AttrList.ContainsKey("series") && int.TryParse(AttrList["series"], out int s) ? s : 0;
                if (AttrList.ContainsKey("color"))
                    Color = new URComplexColor().Initialize(AttrList["color"]);
            }
        }

        /// <summary>
        /// prázdný konstruktor třídy
        /// </summary>
        public ChartLayerDataSet()
        {
            AttrList = new GFEAttrList();
        }

        /// <exclude/>
        public override string ToString()
        {
            return string.IsNullOrEmpty(this.Name) ? GResources.GetResourceText(29451441) : this.Name;
        }
    }
}
