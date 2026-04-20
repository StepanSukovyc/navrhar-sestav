//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DefaultContentDrawing.cs                 </Name>
//    <Description> Vektorová grafika                                           </Description>
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
    /// Vektorová grafika
    /// </summary>
    public class DefaultContentDrawing : DefaultAbstractContent, IMouseComponent, IScriptable, IDefaultDataBound, IBlockContent
    {
        #region AbstractContent
        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            // pokud to není drawing pak není co řešit
            if (FormatTag is GFEFormatContentDrawing == false || FormatTag.TagName.Equals("drawing") == false)
                return;

            if (isLoaded)
                return;

            base.LoadInformation();

            ComponentType = ComponentType.drawing;

            // zafixujeme objekt
            var _formatTag = (GFEFormatContentDrawing)FormatTag;
            BackColor = new ComplexColor();
            BackColor.Initialize(_formatTag.Style.BackgroundColor);
            ShowBackground = BackColor.Color != Color.Transparent;
        }

        void IBlockContent.ComputeBounds(ref SizeValue w, ref SizeValue h)
        {
            var cw = this.Width;
            if (!cw.IsEmpty) w = cw;

            var ch = this.Height;
            if (!ch.IsEmpty) h = ch;
            if (h == 0) h = UnitConverter.ConvertFromTwips(200); //obrázky k výpočtu používají výšku 200tw. viz GrrSize ret(clientSize.width, clientSize.height ? clientSize.height : 200);

            if (AttrList.GetValueDefault("aspect") == "keep")
            {
                w = h = Math.Min(w, h);
            }
        }
        protected override void DrawContent(Graphics graphics)
        {
            RectangleF rect = ContentBounds;
            var w = (int)(rect.Width + 0.5F);
            var h = (int)(rect.Height + 0.5F);
            if (w > 0 && h > 0)
            {
                //aspect keep, nové od 2020/10/12
                if (AttrList.GetValueDefault("aspect") == "keep")
                {
                    w = h = Math.Min(w, h);

                    float ox, oy;
                    switch (Text.Align.Horizontal)
                    {
                        case HAlign.right: ox = (rect.Width - w); break;
                        case HAlign.center: ox = (rect.Width - w) / 2; break;
                        default: ox = 0; break;
                    }
                    switch (Text.Align.Vertical)
                    {
                        case VAlign.bottom: oy = (rect.Height - h); break;
                        case VAlign.center: oy = (rect.Height - h) / 2; break;
                        default: oy = 0; break;
                    }
                    rect.Offset(ox, oy);
                }

                using (var help = new NativePaintHelper(this, AttrList))
                using (var i = Charting.CreateDrawing(w, h, help.Attributes, help))
                    graphics.DrawImage(i, rect.Location); //subpixel pozice -> jinak je to nekdy o 1px posunute a vypada to spatne
            }
        }
        /// <summary>
        /// Metoda vracení XML struktury samotného elementu (bez STYLE)
        /// </summary>
        /// <param name="xmlDoc">Dokument, do kterého se struktura vkládá</param>
        /// <param name="namespaceUri">jmenný prostor <paramref name="xmlDoc"/></param>
        /// <param name="styles">seznam již dostupných stylů</param>
        /// <returns>Element popisující samotný objekt bez stylů</returns>
        XmlElement GetDataComponent(XmlDocumentPosition xmlDoc, string namespaceUri = null, List<GFEList> styles = null)
        {
            XmlElement xmlNode = xmlDoc.CreateElement("drawing");

            SizeValue _rLeft = new SizeValue(LeftZoom, "tw"),
                _rTop = new SizeValue(TopZoom, "tw"),
                _rWidth = new SizeValue(_rLeft + WidthZoom, "tw"),
                _rHeight = new SizeValue(_rTop + HeightZoom, "tw");

            xmlNode.SetAttribute("rect", string.Format("{0},{1},{2},{3}", _rLeft.MathRoundValue(2), _rTop.MathRoundValue(2),
                _rWidth.MathRoundValue(2), _rHeight.MathRoundValue(2)));

            if (Page.Order != 1)
                // uložení informaci o stránce, na které se nachází daný objekt
                xmlNode.SetAttribute("page", Convert.ToString(Page.Order));

            return xmlNode;
        }
        #endregion


        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="item">položka s informaci o objektu</param>
        /// <param name="view">pohled objektu</param>
        public override void Initialize(GFEFormatTag item, IViewContent view)
        {
            base.Initialize(item, view);
            ComponentType = ComponentType.drawing;
            LoadInformation();
        }
        /// <summary>Dispose</summary>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
                if (m_OnClick != null)
                    m_OnClick.Dispose();

            base.Dispose(disposing);
        }

        /// <summary>
        /// napojení dat k objektu
        /// </summary>
        /// <param name="dataRegion">region s daty</param>
        protected override void AttachData(IDataRegion dataRegion)
        {
            if (dataRegion != null)
            {
                m_manager = dataRegion.Manager;
                m_datarow = dataRegion.GetDataRow(AttrList, out _);
            }
        }

        private DefaultDataManager m_manager;
        System.Data.DataRow m_datarow;
        /// <summary>Správce dat</summary>
        public DefaultDataManager DataManager { get { return m_manager; } }
        /// <summary>Správce skriptů</summary>
        public IFFScriptManager ScriptManager { get { return m_manager?.ScriptManager; } }


        private GScript m_OnClick;
        /// <summary>
        /// skript pri Click
        /// </summary>
        public GScript OnClick
        {
            get
            {
                if (m_OnClick == null && ScriptManager != null)
                {
                    var l_script = Scripts.GetValueDefault("onClick", string.Empty);
                    if (l_script.Length == 0) return null;
                    m_OnClick = ScriptManager.PrepareScript(FormatTag, "onClick", l_script, this);
                }
                return m_OnClick;
            }
        }
        /// <summary>
        /// Spuštění skriptu OnClick
        /// </summary>
        public void RunOnClick()
        {
            var s = OnClick;
            if (s != null) ScriptManager.RunScript(s);
        }

        #region IMouseComponent Members

        void IMouseComponent.Click(float x, float y)
        {
            RunOnClick();
        }
        void IMouseComponent.HoverEnd()
        {
            (PagePanel as FillerPagePanel).TkHoverEnd(this);
        }
        void IMouseComponent.Hover(float x, float y)
        {
            (PagePanel as FillerPagePanel).TkHover(this, x, y, OnClick != null);
        }

        #endregion

        #region IDefaultDataBound Members
        System.Data.DataRow IDefaultDataBound.DataRow
        {
            get { return m_datarow; }
        }
        DefaultDataManager IDefaultDataBound.DataManager
        {
            get { return m_manager; }
        }
        #endregion

        #region IScriptable Members

        int IScriptable.getProperty(string name, out IDataScriptable value)
        {
            switch (name)
            {
                case "toggle":
                    value = new Gordic.Report.Implementation.GScriptableMethod(ScriptManager.Engine, name, delegate(IDataScriptable[] args)
                    {
                        Toggle();
                        return null;
                    });
                    return 0;
                default:
                    if (AttrList.ContainsKey(name))
                    {
                        value = ScriptManager.Engine.GetScriptableString(name, AttrList[name]);
                        return 0;
                    }
                    //var snc = FormatTag.NativeContent as IScriptable;
                    //if (snc != null)
                    //{
                    //    return snc.getProperty(name, out value);
                    //}
                    return base.GetProperty(ScriptManager, name, out value);
            }
        }

        int IScriptable.setProperty(string name, IDataScriptable value)
        {
            //var snc = FormatTag.NativeContent as IScriptable;
            //if (snc != null)
            //{
            //    var ret = snc.setProperty(name, value);
            //    if (ret == 0)
            //    {
            //        drawingFoil.NeedRepaint = true;
            //    }
            //    return ret;
            //}
            if (AttrList.ContainsKey(name))
                using (var v = new GDataScriptable(ScriptManager.Engine, value))
                {
                    AttrList[name] = v.ToString();
                    return 0;
                }
            return base.SetProperty(ScriptManager, name, value);
            //switch (name)
            //{
            //    case "shape":
            //        using (var v = new GDataScriptable(ScriptManager.Engine, value))
            //        {
            //            FormatTag.NativeContent
            //            Attributes["shape"] = v.ToString();
            //            drawingFoil.NeedRepaint = true;
            //            return 0;
            //        }
            //    default:
            //        return 1;
            //}
        }

        internal void Toggle()
        {
            var s = AttrList["shape"];
            switch (s)
            {
                case "plus":
                    AttrList["shape"] = "minus";
                    break;
                case "minus":
                    AttrList["shape"] = "plus";
                    break;
                case "plus-box":
                    AttrList["shape"] = "minus-box";
                    break;
                case "minus-box":
                    AttrList["shape"] = "plus-box";
                    break;
                case "gi-plus":
                    AttrList["shape"] = "gi-minus";
                    break;
                case "gi-minus":
                    AttrList["shape"] = "gi-plus";
                    break;
                case "gi-plus_bold":
                    AttrList["shape"] = "gi-minus_bold";
                    break;
                case "gi-minus_bold":
                    AttrList["shape"] = "gi-plus_bold";
                    break;
            }
        }

        #endregion
    }
}
