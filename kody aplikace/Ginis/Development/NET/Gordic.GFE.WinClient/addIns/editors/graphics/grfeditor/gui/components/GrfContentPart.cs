//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrfContentPart.cs                      </Name>
//    <Description> Sekce vlastních komponent-součásti                          </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2020-02-02                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Linq;
using System.Windows.Forms;
using System.Xml;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Sekce vlastních komponent-součásti
    /// </summary>
    class GrfContentPart : AreaContent
    {
        #region ICloneable
        /// <summary>
        /// Creates a new object that is a copy of the current instance
        /// </summary>
        /// <returns>A new object that is a copy of this instance.</returns>
        public override object Clone() => new GrfContentPart().Initialize(this);
        #endregion

        #region AbstractTextContent
        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            //Pokud položka není regionem, pak není co řešit
            if (FormatTag is GFEFormatGRFPart)
            {
                //pozice řádku, ve kterém začíná Tag
                StartPosition = FormatTag.LinePosition - 1;

                if (FormatTag.Attributes.ContainsKey("rect"))
                    TagService.SetRectByAttribute(this, FormatTag.Attributes["rect"]);

                Text.TextFont = new URTagTextFont().Initialize(FontFamily.GenericSerif.Name);
                Text.TextFont.Size.Value = "1";

                if (FormatTag.Attributes.ContainsKey("name"))
                    Name = FormatTag.Attributes["name"];

                Guid = FormatTag.Attributes.ContainsKey("guid") ? FormatTag.Attributes["guid"] : System.Guid.NewGuid().ToString().Replace("-", "");
            }
        }

        /// <summary>
        /// Metoda vracení XML struktury samotného elementu (bez STYLE)
        /// </summary>
        /// <param name="xmlDoc">Dokument, do kterého se struktura vkládá</param>
        /// <param name="xmlStyles">Seznam nadřazených stylů</param>
        /// <param name="withRect"></param>
        /// <param name="regionFullName">Úplný název aktuálního regionu</param>
        /// <returns>Element prezentující daný objekt</returns>
        override public XmlElement GetXmlData(XmlDocumentPosition xmlDoc, List<GFEList> xmlStyles, bool withRect = true, string regionFullName = null)
        {
            // potřebné pro pamatování pozici řádku
            // pokud region je vybrán, pak, protože je pouze kontejner, 
            // nastavíme výběr všem vnitřním objektům 
            if (IsSelected)
                foreach (ITagComponent _item in this)
                    ServiceSelection.SetSelectedComponents(_item, SelectionTypes.Add);

            XmlElement xmlNode = xmlDoc.CreateElement("part", ReportDesignerProperties.Instance.AlfReportXmlns);
            // uložíme název součásti
            xmlNode.SetAttribute("name", Name);
            // uložíme jednoznačný identifikátor součásti
            xmlNode.SetAttribute("guid", Guid);

            if (withRect)
            {
                // uložení informaci o rámečku pro daný objekt
                string value = TagService.GetRect(this);
                if (!string.IsNullOrEmpty(value))
                    xmlNode.SetAttribute("rect", value);
            }

            if (Page.Order != 1)
                // uložení informaci o stránce, na které se nachází daný objekt
                xmlNode.SetAttribute("page", Convert.ToString(Page.Order));

            // pokud existuje, pak prvně uližíme "pozadí" regionu
            if (_BackObject != null)
                SetChildXmlData(_BackObject, xmlNode, xmlStyles);
            // prvně se uloží všechny políčka co nejsou regiony
            // a zároveň nejsou prvním objektem regionu
            foreach (ITagComponent item in this)
                if (!(item is AreaContent) && !item.Equals(_BackObject))
                    SetChildXmlData(item, xmlNode, xmlStyles);

            // teď se uloží všechny vnitřní součásti
            foreach (ITagComponent item in this)
                if (item is AreaContent)
                    xmlNode.AppendChild(item.GetXmlData(xmlDoc, xmlStyles));

            // pořadí objektu
            xmlNode.SetAttribute("order", PropertyOrder.ToString());

            // uložíme neznámé značky
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Unknowns, xmlStyles);

            // vrátíme součást
            return xmlNode;
        }

        void SetChildXmlData(ITagComponent item, XmlElement _xmlBody, List<GFEList> xmlStyles)
        {
            XmlElement xmlElement = item.GetXmlData(_xmlBody.OwnerDocument as XmlDocumentPosition, xmlStyles);

            //pokud větev STYLE, neobsahuje žádné atributy, pak je zbytečná 
            if (string.Equals(xmlElement.Name, "style", StringComparison.InvariantCultureIgnoreCase)
                && xmlElement.Attributes.Count == 0)
                //V tomto případě přepíšeme všechny vnořené větve větvi STYLE do nadřazené větvi
                foreach (XmlNode subItem in xmlElement.ChildNodes)
                    _xmlBody.AppendChild(subItem);
            else _xmlBody.AppendChild(xmlElement);
        }
        #endregion
        #region AreaContent
        /// <summary>
        /// indikace pohybu myši nad objektem
        /// </summary>
        [Browsable(false)]
        protected override bool IsTowed
        {
            get
            {
                bool towed = false;
                if (PagePanel.IsDragOver
                    && BoundsInPixels.Contains(PagePanel.DragPoint))
                    towed = true;

                ThreadService.SafeThreadAsyncCall(delegate
                {
                    if (towed)
                        TowedService.TowedComponent = this;
                    else if (TowedService.TowedComponent == this)
                        TowedService.TowedComponent = this.Parent as URAbstractContainer;
                });

                return towed;
            }
        }
        /// <summary>
        /// Přidání položky bočního panelu
        /// </summary>
        /// <param name="info">Přidávaná položka</param>
        /// <param name="e">data o myší</param>
        /// <param name="type">Typ vkládané komponenty</param>
        /// <param name="format">Formát sestavy</param>
        public override IComponent CreateItem(dynamic info, MouseEventArgs e, ComponentType type, GFEFormat format = null)
        {
            MessageService.ShowInformation(GResources.GetResourceText(2945176));
            return null;
        }
        #endregion
        #region ITowedHandler
        /// <summary>
        /// získání objektu pod kurzorem
        /// </summary>
        /// <param name="point">pozice kurzoru vůči stránce</param>
        /// <returns>Objekt, který se nachází bezprostředně pod kurzorem</returns>
        public override object GetTowedObject(PointF point)
        {
            if (this is ITagComponent && (this as ITagComponent).BoundsInPixels.Contains(point))
                return this;

            return this is IZoomSizable ? ((this as IZoomSizable).BoundsInPixels.Contains(point) ? this : null) : null;
        }
        #endregion

        UndoRedo<string> guid = new UndoRedo<string>();
        /// <summary>
        /// Jednoznačný identifikátor složky příloh
        /// </summary>
        [Category("Součást")]
        [DisplayName("jednoznačný identifikátor")]
        [Description("jednoznačný identifikátor oblasti (bez mezer)")]
        public string Guid { get => guid.Value; set => guid.Value = value.Replace(" ", ""); }

        /// <summary>
        /// Název políčka
        /// </summary>
        [ReadOnly(true)]
        [Category("Součást")]
        [DisplayName("název")]
        [Description("Název součásti")]
        public string Name { get; set; }

        List<string> knownTags;
        /// <summary>
        /// Známě značky regionu
        /// </summary>
        [Browsable(false)]
        public override List<string> KnownTags
        {
            get
            {
                if (knownTags == null)
                    knownTags = AddInTree.BuildItem("/ReportDesigner/GrfList/Part", null) as List<string>;
                return knownTags;
            }
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public override void Initialize()
        {
            base.Initialize();
            ComponentType = ComponentType.part;
        }

        /// <exclude/>
        public override void Initialize(GFEFormatTag item)
        {
            base.Initialize(item);
            ComponentType = ComponentType.part;
        }

        /// <summary>
        /// inicilializace objektu dle instance stejného objektu
        /// </summary>
        /// <param name="value">instance stejného objektu</param>
        public virtual GrfContentPart Initialize(GrfContentPart value)
        {
            Initialize(value.FormatTag);

            Anchor = value.Anchor;
            AttrList = new GFEAttrList(value.AttrList);
            AttrList.Remove("row");

            BackColor = new URComplexColor().Initialize(value.BackColor);
            BackImage = new BackgroundImage(value.BackImage);
            ComponentType = value.ComponentType;
            Height = new SizeValue(value.Height);
            Left = new SizeValue(value.Left);
            Padding = new URComplexPadding();
            Padding.Initialize(value.Padding);
            Scripts = new GFEScriptList(value.Scripts);
            ShowBackground = value.ShowBackground;
            Spacing = new URComplexSpacing();
            Spacing.Initialize(value.Spacing);
            Text = new URTagText();
            Text.Initialize(value.Text, true);
            Top = new SizeValue(value.Top);
            Width = new SizeValue(value.Width);

            foreach (var item in value)
                if (item is ICloneable)
                    InsertTagComponent((item as ICloneable).Clone());
            return this;
        }
    }
}
