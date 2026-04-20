//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.StructureExplorerNode.cs               </Name>
//    <Description> Položka struktury                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-11-08                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Core;
using Gordic.Report.Implementation;
using Gordic.General;
using System.Runtime.InteropServices;
using System.Runtime.Serialization;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Položka struktury
    /// </summary>
    [ComVisible(false)]
    [Serializable]
    public class StructExtNode : AbstractExtTreeNode
    {
        #region ISerializable
        /// <summary>
        /// Initializes a new instance of the ExtTreeNode class using the
        /// specified serialization information and context.
        /// </summary>
        /// <param name="serializationInfo"></param>
        /// <param name="context"></param>
        protected StructExtNode(SerializationInfo serializationInfo, StreamingContext context) : base(serializationInfo, context) { }
        #endregion

        sealed class DataNode
        {
            /// <summary>
            /// Datová položka struktury sestavy
            /// </summary>
            [Browsable(false)]
            public GFEDataItem DataItem { get; set; }
            /// <summary>
            /// Datová položka struktury sestavy
            /// </summary>
            [Browsable(false)]
            public GFERegion DataRegion { get; set; }
            /// <summary>
            /// Popis položky
            /// </summary>
            [ReadOnly(true), DisplayName("Popis")]
            public string Description { get; set; }
            /// <summary>
            /// Plný název položky
            /// </summary>
            [ReadOnly(true), DisplayName("Nadpis"), Description("Srozumitelný název datové položky")]
            public string Title { get; set; }
            /// <summary>
            /// Plný název položky
            /// </summary>
            [ReadOnly(true), DisplayName("Úplný název")
            , Description("Úplná cesta od kořenové větve k dané")]
            public string FullName { get; set; }
            /// <summary>
            /// Typ položky
            /// </summary>
            [ReadOnly(true), DisplayName("Typ"), Description("Typ datové položky")]
            public Grr06DataType DataType { get; set; }
            /// <summary>
            /// Název větve
            /// </summary>
            [ReadOnly(true), DisplayName("Název"), Description("Krátký název datové položky")]
            public string Name { get; set; }
            /// <summary>
            /// Nápověda
            /// </summary>
            [Browsable(false)]
            public string ToolTipText { get; set; }
            /// <summary>
            /// výchozí hodnota datové položky
            /// </summary>
            public string PreviewValue { get; set; }

            internal string SetToolTip()
            {
                // je to region
                if (DataRegion != null)
                    ToolTipText = string.Format(GResources.GetResourceText(29450116) + ": {0}\n"+ GResources.GetResourceText(29450415) + ": {1}\n"+ GResources.GetResourceText(29450414) + ": {2}\n" + GResources.GetResourceText(29450413) + ": {3}", Name, FullName, Title, Description); //RC 29450116 : název
                else
                    ToolTipText = string.Format(GResources.GetResourceText(29450116)+ ": {0}\n" + GResources.GetResourceText(29450415) + ": {1}\n" + GResources.GetResourceText(29450414) + ": {2}\n" + GResources.GetResourceText(29450413) + ": {3}\n" + GResources.GetResourceText(29450416) + ": {4}", Name, FullName, Title, Description, DataType); //RC 29450413 : popis
                return ToolTipText;
            }

            public DataNode(GFEDataItem dataItem, StructExtNode node)
            {
                // TODO: Complete member initialization
                this.DataItem = dataItem;
                DataItem = dataItem;
                Name = dataItem.Name;
                Title = dataItem.FullName;
                Description = dataItem.Description;
                DataType = dataItem.DataType;

                if (!string.Equals(node.Name, "ROOT", StringComparison.InvariantCultureIgnoreCase))
                    FullName = node.FullName + "." + dataItem.Name;
                else FullName = dataItem.Name;
                PreviewValue = dataItem.PreviewValue;
            }

            /// <summary>
            /// vytvoření nové instance třídy
            /// </summary>
            public DataNode()
            {
                Title = GResources.GetResourceText(29450417); //RC 29450417 : Dokument
            }

            /// <summary>
            /// vytvoření nové instance třídy
            /// </summary>
            /// <param name="region"></param>
            /// <param name="explorerNode"></param>
            public DataNode(GFERegion region, StructExtNode explorerNode)
            {
                DataRegion = region;
                Name = region.Name;
                Title = GResources.GetResourceText(29450417); //RC 29450417 : Dokument
                if (explorerNode == null)
                    FullName = region.Name;
                else
                {
                    if (!string.Equals(explorerNode.Name, "ROOT", StringComparison.InvariantCultureIgnoreCase))
                        FullName = explorerNode.FullName + "." + Name;
                    else FullName = Name;
                    Title = string.IsNullOrEmpty(region.FullName) ? Name : region.FullName;
                }
            }
        }

        /// <summary>
        /// úplný název větve
        /// </summary>
        public override string FullName { get { return dataNode?.FullName; } }

        /// <summary>
        /// Datová položka struktury sestavy
        /// </summary>
        public GFERegion DataRegion { get { return dataNode?.DataRegion; } }

        /// <summary>
        /// Datová položka struktury sestavy
        /// </summary>
        public GFEDataItem DataItem { get { return dataNode?.DataItem; } }

        /// <summary>
        /// přetížení kvůli tabulce vlastnosti
        /// </summary>
        public new object Tag { get { return dataNode; } }

        readonly DataNode dataNode;

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        protected StructExtNode()
        {
            sortOrder = 1;
            canLabelEdit = false;
            ImageIndex = 1;
            SelectedImageIndex = 1;
        }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public StructExtNode(object nullObject)
            : this()
        {
            dataNode = new DataNode();
            sortOrder = 1;
            ImageKey = "dir";
            SelectedImageKey = "dirOpen";
            Text = GResources.GetResourceText(29450417); //RC 29450417 : Dokument
        }

        /// <summary>
        /// Konstruktor třídy dle datové položky
        /// </summary>
        /// <param name="dataItem">Datová položka</param>
        /// <param name="node">Nadřazená větev</param>
        public StructExtNode(GFEDataItem dataItem, StructExtNode node)
            : this()
        {
            dataNode = new DataNode(dataItem, node);
            Name = dataItem.Name;
            Text = string.IsNullOrEmpty(dataNode.Title) ? Name : dataNode.Title;

            switch (dataItem.DataType)
            {
                case Grr06DataType.Datetime:
                    ImageKey = SelectedImageKey = "time";
                    break;
                case Grr06DataType.Number:
                    ImageKey = SelectedImageKey = "number";
                    break;
                case Grr06DataType.Object:
                    ImageKey = SelectedImageKey = "object";
                    break;
                case Grr06DataType.RtfCompressed:
                    ImageKey = SelectedImageKey = "rtfcompressed";
                    break;
                case Grr06DataType.RtfText:
                    ImageKey = SelectedImageKey = "rtftext";
                    break;
                case Grr06DataType.String:
                    ImageKey = SelectedImageKey = "item";
                    break;
                case Grr06DataType.StringNT:
                    ImageKey = SelectedImageKey = "stringnontrimmed";
                    break;
                case Grr06DataType.Unknown:
                    ImageKey = SelectedImageKey = "unknown";
                    break;
                default:
                    break;
            }
            SetToolTip(dataNode);
        }

        /// <summary>
        /// Konstruktor třídy.
        /// Vytvoří položku pro Desktop.
        /// </summary>
        public StructExtNode(GFERegion region, StructExtNode explorerNode)
        {
            sortOrder = 1;
            dataNode = new DataNode(region, explorerNode);

            ImageKey = "dir";
            SelectedImageKey = "dirOpen";

            Name = dataNode.Name;
            Text = dataNode.Title;
            SetToolTip(dataNode);
            
            foreach (GFEDataItem item in region.Items)
            {
                StructExtNode node = new StructExtNode(item, this);
                node.AddTo(this);
            }

            foreach (GFERegion item in region.Children)
            {
                StructExtNode node = new StructExtNode(item, this);
                node.AddTo(this);
            }
        }

        /// <summary>
        /// inicializace třídy
        /// </summary>
        protected override void Initialize()
        {
            base.Initialize();
            ContextmenuAddinTreePath = "/Pad/StructureView/TreeNode/ContextMenu";
        }

        void SetToolTip(DataNode dataNode)
        {
            if (dataNode != null)
                ToolTipText = dataNode.SetToolTip();
        }
    }
}
