//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.defaultcontentselect.cs                  </Name>
//    <Description> Výběrové pole. Combo, radio, checkbox, ...                  </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2016-10-19                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Xml;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;
using Gordic.Report.Implementation;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Výběrové pole. Combo, radio, checkbox, ...
    /// </summary>
    public class DefaultContentSelect : DefaultContentPar, IMouseComponent, IDefaultDataItemHandler, IEditableContent
    {
        #region AbstractContent
        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            // pokud to není textové pole pak není co řešit
            if (!(FormatTag is GFEFormatContentSelect || FormatTag.TagName.Equals("select")))
                return;

            if (isLoaded)
                return;

            base.LoadInformation();

            ComponentType = ComponentType.none;//TODO

            // zafixujeme objekt
            var _formatTag = (GFEFormatContentSelect)FormatTag;
            BackColor = new ComplexColor();
            BackColor.Initialize(_formatTag.Style.BackgroundColor);
            ShowBackground = BackColor.Color != Color.Transparent;

            foreach (var t in FormatTag.Children)
                if (t.TagName == "option")
                    Options.Add(new Option(t));
        }

        protected override void DrawClear(Graphics graphics, IDefaultDataItem item)
        {
            //base.DrawClear(graphics, item);
            var bc = GetDrawItemBackColor(item);
            if (bc.IsEmpty == false)
            {
                foreach (var c in Children)
                    c.BackColor.Initialize(bc, "");
                using (var b = new SolidBrush(bc))
                    graphics.FillRectangle(b, BoundsInPixels);
            }
            else
            {
                foreach (var c in Children)
                {
                    c.BackColor.Initialize(Color.Transparent, "");
                }
            }
        }
        protected override void DrawContent(Graphics graphics)
        {
            base.DrawContent(graphics);
            if (m_innerText != null)
            {
                TagText.Paint(graphics, m_innerText, Text.TextFont, BoundsInPixels, Padding, Text.Ellipsis, Text.Align, Text.Orientation, Zoom, Text.MultiLine);
            }
        }

        void IEditableContent.OnTextChanged()
        {
            var value = Text.Text;

            switch (dataItem.Type)
            {
                case ControlType.MultiCheckBox:
                    foreach (var o in Options)
                    {
                        string v = o.Value;
                        if (v != null)
                        {
                            var i = value.IndexOf(v);
                        next:
                            if (i < 0) continue;
                            if (i > 0 && value[i - 1] != ',') { i = value.IndexOf(v, i + v.Length); goto next; }
                            if (i + v.Length < value.Length && value[i + v.Length] != ',') { i = value.IndexOf(v, i + v.Length); goto next; }
                        }
                        SetOption(o);
                        break;
                    }
                    break;
                default:
                    foreach (var o in Options)
                    {
                        string v = o.Value;
                        if (v == null || v == value)
                        {
                            SetOption(o);
                            break;
                        }
                    }
                    break;
            }
        }

        /// <summary>Formátovaný text pro zobrazení v políčku</summary>
        string IEditableContent.FormattedText
        {
            get { DataItem.SetDisplayValue(); return Text.Text; }
        }

        private Option m_currentOption = null;
        private string m_innerText = null;
        public Option CurrentOption
        {
            get { DataItem.SetDisplayValue(); return m_currentOption; }
        }
        private void SetOption(Option o)
        {
            m_currentOption = o;

            if (o.ComponentsCount == 0) //nikdy by nemelo byt 0. na urovni Grr06 se konvertuje na jednu Text polozku
                m_innerText = o.InnerText;
            else
                m_innerText = null;

            SetChildren(o.Components);
        }

        ///// <summary>
        ///// Metoda vracení XML struktury samotného elementu (bez STYLE)
        ///// </summary>
        ///// <param name="xmlDoc">Dokument, do kterého se struktura vkládá</param>
        ///// <param name="namespaceUri">jmenný prostor <paramref name="xmlDoc"/></param>
        ///// <param name="styles">seznam již dostupných stylů</param>
        ///// <returns>Element popisující samotný objekt bez stylů</returns>
        //XmlElement GetDataComponent(XmlDocumentPosition xmlDoc, string namespaceUri = null, List<GFEList> styles = null)
        //{
        //    XmlElement xmlNode = xmlDoc.CreateElement("drawing");

        //    SizeValue _rLeft = new SizeValue(LeftZoom, "tw"),
        //        _rTop = new SizeValue(TopZoom, "tw"),
        //        _rWidth = new SizeValue(_rLeft + WidthZoom, "tw"),
        //        _rHeight = new SizeValue(_rTop + HeightZoom, "tw");

        //    xmlNode.SetAttribute("rect", string.Format("{0},{1},{2},{3}", _rLeft.MathRoundValue(2), _rTop.MathRoundValue(2),
        //        _rWidth.MathRoundValue(2), _rHeight.MathRoundValue(2)));

        //    if (Page.Order != 1)
        //        // uložení informaci o stránce, na které se nachází daný objekt
        //        xmlNode.SetAttribute("page", Convert.ToString(Page.Order));

        //    return xmlNode;
        //}
        #endregion


        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="item">položka s informaci o objektu</param>
        /// <param name="view">pohled objektu</param>
        public override void Initialize(GFEFormatTag item, IViewContent view)
        {
            base.Initialize(item, view);
            ComponentType = ComponentType.none;//TODO
            LoadInformation();
        }
        /// <summary>Dispose</summary>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                SetChildren(new ITagComponent[0]);
                foreach (var o in Options)
                {
                    o.Dispose();
                }
                Options.Clear();
            }

            base.Dispose(disposing);
        }

        GFEDataItem structItem;
        /// <summary>
        /// Položka struktury
        /// </summary>
        public GFEDataItem StructureItem
        {
            get
            {
                if (structItem == null)
                    if (!string.IsNullOrEmpty(DataName) && PageControl != null)
                        structItem = (GFEDataItem)CommonService.GetItemFromStructure(PageControl.Structure, DataFullPath, 1);
                return structItem;
            }
        }
        /// <summary>Titulek pole</summary>
        public string StructureItemTitle => StructureItem?.FullName;
        /// <summary>Popis pole</summary>
        public string StructureItemDescription => StructureItem?.Description;

        /// <summary>
        /// napojení dat k objektu
        /// </summary>
        /// <param name="dataRegion">region s daty</param>
        protected override void AttachData(IDataRegion dataRegion)
        {
            if (dataRegion != null)
            {
                foreach (var o in Options)
                {
                    o.CreateContent(this, dataRegion);
                }
                //dataItem = new SelectDataItem(this, dataRegion);
                dataItem = new DefaultDataItem();
                dataItem.AttachData(this, dataRegion);
            }
        }

        #region IMouseComponent Members

        /// <summary>
        /// kliknutí na datovou položku
        /// </summary>
        /// <param name="x">abscisa kliknutí</param>
        /// <param name="y">ordinata kliknutí</param>
        public void Click(float x, float y)
        {
            dataItem.RunOnClick();
            if (dataItem.Edit == false) return;

            switch (dataItem.Type)
            {
                case ControlType.CheckBox:
                    if (Options.Count > 0)
                    {
                        int i = Options.IndexOf(CurrentOption);
                        i++;
                        if (i >= Options.Count) i = 0;
                        string val = Options[i].WriteValue;
                        UpdateContent((object)val ?? DBNull.Value);
                    }
                    break;
                case ControlType.RadioButton:
                    if (Options.Count > 0)
                    {
                        var value = Options[0].WriteValue;
                        if (value == null) break;
                        UpdateContent(value);
                    }
                    break;
                case ControlType.MultiCheckBox:
                    if (Options.Count > 0)
                    {
                        int i = Options.IndexOf(CurrentOption);
                        i++;
                        if (i >= Options.Count) i = 0;

                        var value = new List<string>(Text.Text.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries));
                        value.Remove(CurrentOption.Value);
                        string val = Options[i].WriteValue;
                        if (val != null) value.Add(val);

                        UpdateContent(string.Join(",", value));
                    }
                    break;
            }
        }
        public bool IsClickable
        {
            get
            {
                return dataItem.OnClick != null
                    ||
                    (dataItem.Edit && (
                        dataItem.Type == ControlType.CheckBox
                        || dataItem.Type == ControlType.RadioButton
                        || dataItem.Type == ControlType.MultiCheckBox
                    ))
                    ;
            }
        }

        void IMouseComponent.HoverEnd()
        {
            (PagePanel as FillerPagePanel).TkHoverEnd(this);
        }
        void IMouseComponent.Hover(float x, float y)
        {
            (PagePanel as FillerPagePanel).TkHover(this, x, y, IsClickable);
        }

        #endregion

        #region IDefaultDataItemHandler
        /// <summary>
        /// Aktualizace datového obsahu
        /// </summary>
        /// <param name="content">aktuální obsah</param>
        public void UpdateContent(object content)
        {
            dataItem.UpdateDataContent(DataName, content, true);
        }
        /// <summary>
        /// Update souvisejícího obsahu (ale není přímo vázána)
        /// </summary>
        public void UpdateContent(string dataName, object content)
        {
            if (string.IsNullOrEmpty(dataName)) //tak nic
                return;
            dataItem.UpdateDataContent(dataName, content, false);
        }

        DefaultDataItem dataItem;
        /// <summary>
        /// Propojení mezi daty a danou položkou
        /// </summary>
        public IDefaultDataItem DataItem { get { return dataItem; } }
        #endregion


        string IEditableContent.ComboItems
        {
            get
            {
                var sb = new System.Text.StringBuilder();
                foreach (var o in Options)
                {
                    sb.Append(o.Value);
                    sb.Append('|');
                    sb.Append(o.InnerText);
                    sb.Append('|');
                }
                return sb.ToString();
            }
        }
        /// <summary>Datový název položky klíče</summary>
        string IEditableContent.ComboKeyName { get { return DataName; } }
        /// <summary>Datový název položky hodnoty</summary>
        string IEditableContent.ComboValueName
        {
            get
            {
                if (AttrList.TryGetValue("value-name", out string name)) return name;

                name = DataName + "_txt";
                return name;
            }
        }


        public List<Option> Options = new List<Option>();

        public class Option : IDisposable
        {
            private GFEFormatTag tag;
            private List<ITagComponent> comp;

            public Option(GFEFormatTag t)
            {
                tag = t;
            }

            public string Value { get { return Attributes.GetValueDefault("value", null); } }
            public string WriteValue { get { return Attributes.GetValueDefault("write-value", null) ?? Value; } }
            public GFEList Attributes => tag.Attributes;

            public string InnerText
            {
                get
                {
                    if (comp == null || comp.Count == 0)
                        return tag.GetInnerText();

                    var sb = new System.Text.StringBuilder();

                    foreach (var c in comp)
                        if (c is ITextHandler t)
                            sb.Append(t.Text.Text);

                    return sb.ToString();
                }
            }

            public IEnumerable<ITagComponent> Components { get { return comp; } }
            public int ComponentsCount { get { return comp.Count; } }

            public void Dispose()
            {
                foreach (var c in comp)
                    if (c is IDisposable d) d.Dispose();
                comp.Clear();
            }

            internal void CreateContent(DefaultContentSelect parent, IDataRegion dataRegion)
            {
                comp = new List<ITagComponent>();
                foreach (var ch in tag.Children)
                {
                    var c = FillerService.CreateAndInitContent(null, parent.Page, ch, dataRegion, parent._View);
                    if (c != null)
                    {
                        //var nat = (GFEFormatContent)c.FormatTag;
                        if (c.AttrList.ContainsKey("width")) c.Width = new SizeValue(c.AttrList["width"]);
                        if (c.AttrList.ContainsKey("height")) c.Height = new SizeValue(c.AttrList["height"]);
                        comp.Add(c);
                    }
                }
            }
        }
    }
}
