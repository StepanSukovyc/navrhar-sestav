//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.AddButtonArea.cs                </Name>
//    <Description> příloha sestav                                              </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-03-10                                                  </Created>
//  </FileHeader>

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
using System.Xml;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// příloha sestav
    /// </summary>
    class AddButtonArea : AreaContent
    {
        #region ICloneable
        /// <summary>
        /// Creates a new object that is a copy of the current instance
        /// </summary>
        /// <returns>A new object that is a copy of this instance.</returns>
        public override object Clone() => new AddButtonArea().Initialize(this);
        #endregion

        #region AbstractTextContent
        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            // pokud to není textové pole pak není co řešit
            if (FormatTag is GFEFormatRegion reg && reg.Name.Equals("$$"))
            {
                base.LoadInformation();

                if (FormatTag.Attributes.ContainsKey("rect"))
                    TagService.SetRectByAttribute(this, FormatTag.Attributes["rect"]);

                Guid = FormatTag.Attributes.ContainsKey("guid") ? FormatTag.Attributes["guid"] : System.Guid.NewGuid().ToString().Replace("-", "");

                if (FormatTag.Attributes.ContainsKey("btnposition"))
                    ButtonPosition = (CornerPositionType)Enum.Parse(typeof(CornerPositionType), FormatTag.Attributes["btnposition"]);

                if (FormatTag.Attributes.ContainsKey("btnheight"))
                    ButtonHeight = new SizeValue(FormatTag.Attributes["btnheight"]);

                if (FormatTag.Attributes.ContainsKey("btnwidth"))
                    ButtonWidth = new SizeValue(FormatTag.Attributes["btnwidth"]);
            }
            else
#pragma warning disable CS0618 // Typ nebo člen je zastaralý.
                CommonService.ApplayStyleSizable(this, AttrList);
#pragma warning restore CS0618 // Typ nebo člen je zastaralý.
        }
        #endregion

        #region AreaContent
        /// <summary>
        /// Kreslení objektu
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="args">args</param>
        public override void OnPaint(Graphics graphics, PaintArgs args)
        {
            base.OnPaint(graphics, args);
            RectangleF buttonBoundsInPixels = new RectangleF(LeftZoom + WidthZoom - ButtonWidth * Zoom, TopZoom, ButtonWidth * Zoom, ButtonHeight * Zoom);

            switch (ButtonPosition)
            {
                case CornerPositionType.RightTop:
                    // pravý-horní roh
                    buttonBoundsInPixels = new RectangleF(LeftZoom + WidthZoom - ButtonWidth * Zoom, TopZoom, ButtonWidth * Zoom, ButtonHeight * Zoom);
                    break;
                case CornerPositionType.LeftBottom:
                    // levý-dolní roh
                    buttonBoundsInPixels = new RectangleF(LeftZoom, TopZoom + HeightZoom - ButtonHeight * Zoom, ButtonWidth * Zoom, ButtonHeight * Zoom);
                    break;
                case CornerPositionType.RightBottom:
                    // pravý-dolní roh
                    buttonBoundsInPixels = new RectangleF(LeftZoom + WidthZoom - ButtonWidth * Zoom, TopZoom + HeightZoom - ButtonHeight * Zoom, ButtonWidth * Zoom, ButtonHeight * Zoom);
                    break;
                default:
                    // levý-horní roh
                    buttonBoundsInPixels = new RectangleF(LeftZoom, TopZoom, ButtonWidth * Zoom, ButtonHeight * Zoom);
                    break;
            }

            // gradientní kreslení tlačítka objektu
            using (LinearGradientBrush gradBrush = new LinearGradientBrush(buttonBoundsInPixels, Color.LightSlateGray, Color.White, 0, true))
                switch (ButtonPosition)
                {
                    case CornerPositionType.RightTop:
                        // pravý-horní roh
                        buttonBoundsInPixels = new RectangleF(LeftZoom + WidthZoom - ButtonWidth * Zoom, TopZoom, ButtonWidth * Zoom, ButtonHeight * Zoom);
                        graphics.FillRectangle(gradBrush, (float)Math.Ceiling(LeftZoom + WidthZoom - ButtonWidth * Zoom), (float)Math.Ceiling(TopZoom), (float)Math.Ceiling(ButtonWidth * Zoom), (float)Math.Ceiling(ButtonHeight * Zoom));
                        graphics.DrawRectangle(new Pen(SystemBrushes.ActiveBorder), (float)Math.Ceiling(LeftZoom + WidthZoom - ButtonWidth * Zoom), (float)Math.Ceiling(TopZoom), (float)Math.Ceiling(ButtonWidth * Zoom), (float)Math.Ceiling(ButtonHeight * Zoom));
                        break;
                    case CornerPositionType.LeftBottom:
                        // levý-dolní roh
                        buttonBoundsInPixels = new RectangleF(LeftZoom, TopZoom + HeightZoom - ButtonHeight * Zoom, ButtonWidth * Zoom, ButtonHeight * Zoom);
                        graphics.FillRectangle(gradBrush, (float)Math.Ceiling(LeftZoom), (float)Math.Ceiling(TopZoom + HeightZoom - ButtonHeight * Zoom), (float)Math.Ceiling(ButtonWidth * Zoom), (float)Math.Ceiling(ButtonHeight * Zoom));
                        graphics.DrawRectangle(new Pen(SystemBrushes.ActiveBorder), (float)Math.Ceiling(LeftZoom), (float)Math.Ceiling(TopZoom + HeightZoom - ButtonHeight * Zoom), (float)Math.Ceiling(ButtonWidth * Zoom), (float)Math.Ceiling(ButtonHeight * Zoom));
                        break;
                    case CornerPositionType.RightBottom:
                        // pravý-dolní roh
                        buttonBoundsInPixels = new RectangleF(LeftZoom + WidthZoom - ButtonWidth * Zoom, TopZoom + HeightZoom - ButtonHeight * Zoom, ButtonWidth * Zoom, ButtonHeight * Zoom);
                        graphics.FillRectangle(gradBrush, (float)Math.Ceiling(LeftZoom + WidthZoom - ButtonWidth * Zoom), (float)Math.Ceiling(TopZoom + HeightZoom - ButtonHeight * Zoom), (float)Math.Ceiling(ButtonWidth * Zoom), (float)Math.Ceiling(ButtonHeight * Zoom));
                        graphics.DrawRectangle(new Pen(SystemBrushes.ActiveBorder), (float)Math.Ceiling(LeftZoom + WidthZoom - ButtonWidth * Zoom), (float)Math.Ceiling(TopZoom + HeightZoom - ButtonHeight * Zoom), (float)Math.Ceiling(ButtonWidth * Zoom), (float)Math.Ceiling(ButtonHeight * Zoom));
                        break;
                    default:
                        // levý-horní roh
                        buttonBoundsInPixels = new RectangleF(LeftZoom, TopZoom, ButtonWidth * Zoom, ButtonHeight * Zoom);
                        graphics.FillRectangle(gradBrush, (float)Math.Ceiling(LeftZoom), (float)Math.Ceiling(TopZoom), (float)Math.Ceiling(ButtonWidth * Zoom), (float)Math.Ceiling(ButtonHeight * Zoom));
                        graphics.DrawRectangle(new Pen(SystemBrushes.ActiveBorder), (float)Math.Ceiling(LeftZoom), (float)Math.Ceiling(TopZoom), (float)Math.Ceiling(ButtonWidth * Zoom), (float)Math.Ceiling(ButtonHeight * Zoom));
                        break;
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

            XmlElement xmlNode = xmlDoc.CreateElement("region", ReportDesignerProperties.Instance.AlfReportXmlns);
            // název AddButtonArea je VŽDY '$$'
            xmlNode.SetAttribute("name", "$$");

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

            // vytvoříme větev BODY
            XmlElement _xmlBody = xmlDoc.CreateElement("body", ReportDesignerProperties.Instance.AlfReportXmlns);

            // pokud existuje, pak prvně uližíme "pozadí" regionu
            if (_BackObject != null)
                SetChildXmlData(_BackObject, _xmlBody, xmlStyles);

            // prvně se uloží všechny políčka co nejsou regiony
            // a zároveň nejsou prvním objektem regionu
            foreach (ITagComponent item in this)
                if (!(item is AreaContent) && !item.Equals(_BackObject))
                    SetChildXmlData(item, _xmlBody, xmlStyles);

            // teď se uloží všechny vnitřní regiony
            foreach (ITagComponent item in this)
                if (item is AreaContent)
                    _xmlBody.AppendChild(item.GetXmlData(xmlDoc, xmlStyles));

            // přidáme tělo do regionu
            xmlNode.AppendChild(_xmlBody);

            if (!string.IsNullOrEmpty(ButtonWidth.Value))
                xmlNode.SetAttribute("btnwidth", ButtonWidth.Value);
            if (!string.IsNullOrEmpty(ButtonWidth.Value))
                xmlNode.SetAttribute("btnheight", ButtonHeight.Value);
            if (ButtonPosition != CornerPositionType.LeftTop)
                xmlNode.SetAttribute("btnposition", ButtonPosition.ToString());

            if (!string.IsNullOrEmpty(Guid))
                xmlNode.SetAttribute("guid", Guid);
            else
                xmlNode.SetAttribute("guid", System.Guid.NewGuid().ToString().Replace("-", ""));

            // uložíme neznámé značky
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Unknowns, xmlStyles);

            // vrátíme region
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

        /// <exclude/>
        public override void Reindex() { }
        #endregion

        #region Tlačítko
        readonly UndoRedo<CornerPositionType> buttonPosition = new UndoRedo<CornerPositionType>();
        /// <summary>
        /// pozice tlačítka
        /// </summary>
        [DisplayName("pozice")]
        [Category("Tlačítko")]
        [Description("Pozice tlačítka v objektu")]
        public CornerPositionType ButtonPosition { get => buttonPosition.Value; set => buttonPosition.Value = value; }

        readonly UndoRedo<SizeValue> buttonHeight = new UndoRedo<SizeValue>();
        /// <summary>
        /// Výška tlačítka
        /// </summary>
        [DisplayName("výška")]
        [Category("Tlačítko")]
        [Description("Výška tlačítka přidání")]
        public SizeValue ButtonHeight { get => buttonHeight.Value; set => buttonHeight.Value = value; }

        readonly UndoRedo<SizeValue> buttonWidth = new UndoRedo<SizeValue>();
        /// <summary>
        /// Výška tlačítka
        /// </summary>
        [DisplayName("šířka")]
        [Category("Tlačítko")]
        [Description("Šířka tlačítka přidání")]
        public SizeValue ButtonWidth { get => buttonWidth.Value; set => buttonWidth.Value = value; }
        #endregion

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
                    knownTags = AddInTree.BuildItem("/ReportDesigner/GrfList/AddButtonAreaTags", null) as List<string>;
                return knownTags;
            }
        }

        UndoRedo<string> guid = new UndoRedo<string>();
        /// <summary>
        /// Jednoznačný identifikátor složky příloh
        /// </summary>
        [Category("Tlačítko")]
        [DisplayName("jednoznačný identifikátor")]
        [Description("jednoznačný identifikátor oblasti (bez mezer)")]
        public string Guid { get => guid.Value; set => guid.Value = value.Replace(" ", ""); }

        /// <exclude/>
        public override AreaContent Initialize(object clone)
        {
            Initialize();
            base.Initialize(clone);

            ComponentType = ComponentType.addbuttonarea;

            AttrList.Remove("row");
            if (clone is AddButtonArea)
            {
                ButtonWidth = new SizeValue((clone as AddButtonArea).ButtonWidth);
                ButtonHeight = new SizeValue((clone as AddButtonArea).ButtonHeight);
                ButtonPosition = (clone as AddButtonArea).ButtonPosition;
            }
            else
            {
                ButtonWidth = new SizeValue("5mm");
                ButtonHeight = new SizeValue("5mm");
            }
            Guid = System.Guid.NewGuid().ToString().Replace("-", "");

            return this;
        }
        /// <exclude/>
        public override void Initialize(GFEFormatTag item)
        {
            base.Initialize(item);
            ComponentType = ComponentType.addbuttonarea;
            ButtonWidth = new SizeValue("5mm");
            ButtonHeight = new SizeValue("5mm");
        }
        /// <exclude/>
        public override void Initialize(SideTabItem node)
        {
            base.Initialize(node);
            ComponentType = ComponentType.addbuttonarea;
            ButtonWidth = new SizeValue("5mm");
            ButtonHeight = new SizeValue("5mm");
        }
        /// <exclude/>
        public virtual void Initialize(ReportDesignerSideTabItem node) => Initialize(node as SideTabItem);

        /// <summary>
        /// přetížení
        /// </summary>
        /// <param name="oldPosition"></param>
        /// <param name="newPosition"></param>
        /// <param name="zoom"></param>
        public override void ChangeLocation(RectangleF oldPosition, RectangleF newPosition, float zoom) { }
    }
}
