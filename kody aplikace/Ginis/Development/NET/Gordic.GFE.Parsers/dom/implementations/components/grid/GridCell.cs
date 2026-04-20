//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GridCell.cs                              </Name>
//    <Description> buňka řádku mřížky                                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-27                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Light;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.Report.Implementation;
using System.Runtime.InteropServices;
using System.ComponentModel;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// buňka řádku mřížky
    /// </summary>
    [ComVisible(false)]
    public sealed class GridCell : List<ITagComponent>, IPaintable, IDisposable, IContainerComponent, ISizable, IParentable
    {
        #region ITowedHandler
        /// <summary>
        /// získání objektu pod kurzorem
        /// </summary>
        /// <param name="point">pozice kurzoru vůči stránce</param>
        /// <returns>Objekt, který se nachází bezprostředně pod kurzorem</returns>
        public object GetTowedObject(PointF point)
        {
            List<object> res = new List<object>();
            foreach (var item in this)
                if (item.BoundsInPixels.Contains(point))
                {
                    object obj = item is ITowedHandler ? (item as ITowedHandler).GetTowedObject(point) : item;
                    if (obj != null)
                        res.Add(obj);
                }

            if (res.Count != 0)
                return res;

            return null;
        }
        /// <summary>
        /// pozice objektu <paramref name="item"/> v seznamu
        /// </summary>
        /// <param name="item">objekt, pozice kterého se hledá</param>
        /// <returns>číslo, prezentující pozici objektu <paramref name="item"/> v seznamu daného objektu.</returns>
        public int IndexOf(object item) => item is ITagComponent ? base.IndexOf(item as ITagComponent) : -1;
        #endregion

        /// <summary>
        /// nativní řádek
        /// </summary>
        //public object Cell;
        GridLine line;
        //ISizable sizable;
        LAbstractContent sizable;
        /// <summary>
        /// vnitřní objekt
        /// </summary>
        public LAbstractContent Sizable { get => sizable; set => sizable = value; }

        /// <summary>
        /// indikuje, že šířka je dle pozůstalé velikosti řádku
        /// </summary>
        public bool IsWidthByRemainedPlace
        {
            get => Exists(tc => tc is ISizeByContent && (tc as ISizeByContent).IsWidthByContent);
            set
            {
                foreach (var item in this)
                    if (item is ISizeByContent)
                        (item as ISizeByContent).IsWidthByContent = value;
            }
        }

        /// <summary>
        /// šířka objektu
        /// </summary>
        public SizeValue Width
        {
            get => Sizable != null ? Sizable.Width : SizeValue.Empty;
            set { if (Sizable != null) Sizable.Width = value < 0 ? SizeValue.Empty : value; }
        }
        /// <summary>
        /// výška objektu
        /// </summary>
        public SizeValue Height
        {
            get => Sizable != null ? Sizable.Height : SizeValue.Empty;
            set { if (Sizable != null) Sizable.Height = value; }
        }
        /// <summary>
        /// indikuje změnu výšky
        /// </summary>
        [Browsable(false)]
        public bool IsHeightChanged { get => Exists(itm => itm.IsHeightChanged); }

        /// <summary>
        /// pozice LEFT objektu
        /// </summary>
        public SizeValue Left
        {
            get => Sizable != null ? Sizable.Left : SizeValue.Empty;
            set { if (Sizable != null) Sizable.Left = value < 0 ? SizeValue.Empty : value; }
        }
        /// <summary>
        /// pozice TOP objektu
        /// </summary>
        public SizeValue Top
        {
            get => Sizable != null ? Sizable.Top : SizeValue.Empty;
            set { if (Sizable != null) Sizable.Top = value < 0 ? SizeValue.Empty : value; }
        }

        /// <summary>
        /// stránka, které patří objekt
        /// </summary>
        public IPage Page { get => line.Page; }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="gridLine">řádek buňky</param>
        public GridCell(GridLine gridLine)
        {
            this.line = gridLine;
        }

        internal void Load(DefaultAbstractContent cnt)
        {
            //cnt.Initialize(null, Page, this);
            Add(cnt);
            sizable = cnt;
            var vw = (this.line.Parent as DefaultAbstractContent)._View;
            cnt.Initialize(null, vw, null, Page, this);
        }

        /// <summary>
        /// načtení buňky řádku mřížky
        /// </summary>
        /// <param name="r">data řádku</param>
        /// <param name="cell">nativní objekt buňky</param>
        /// <param name="reg">formát regionu</param>
        /// <param name="dev">nástroje pro práci s daty</param>
        /// <returns></returns>
        internal GridCell Load(IDataRegion r, object cell, GFEFormatRegion reg, Gordic.Report.Implementation.IGFormatDevTools dev)
        {
            var t = cell as IGFormatTag;

            t.getChildCount(out int cnt);
            using (var l_ch = new GfeFormatTags(cnt))
            {
                for (int i = 0; i < cnt; i++)
                {
                    Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(t.getChild(i, out IGFormatTag ch));
                    try
                    {
                        string fmt = r.GetFormattedValue(ch);  //přednačtení formátované hodnoty -> spustí skripty ještě před vytvořením managed component
                        l_ch.Add(GFEFormatTag.Create(reg, ch, dev));
                    }
                    finally
                    {
                        //jeste je potreba! Zajisti Dispose na konci. Marshal.ReleaseComObject(ch);
                    }
                }

                CreateContent(r, l_ch);
                l_ch.Dispose();
            }
            return this;
        }

        void CreateContent(IDataRegion r, GfeFormatTags children)
        {
            // projdeme všechny vnořené objekty ze seznamu TAG a vytvoříme vnořené objekty pro danou buňku
            var vw = (this.line.Parent as DefaultAbstractContent)._View;
            foreach (GFEFormatTag _item in children)
            {
                GFEFormatTag item = null;
                dynamic com = null;

                if (_item is GFEFormatContentTextbox)
                {
                    if ((_item as GFEFormatContentTextbox).Children.Count != 0)
                        item = (_item as GFEFormatContentTextbox).Children[0];
                }
                else item = _item;

                com = FillerService.CreateContent(item, vw, initialize: false);
                if (com is DefaultAbstractContent t)
                {
                    Add(t);
                    sizable = t;
                    t.Initialize(item, vw, r, Page, this);
                }
                else if (com != null)
                    com.Dispose();
            }
        }

        /// <summary>
        /// nastavení šířky objektu
        /// </summary>
        internal void LoadWidth(float pc100)
        {
            var cnt = (DefaultAbstractContent)Sizable;
            if (cnt == null) return; //stalo se mi to kdyz byl v gridu radek s unknown tagem (udelal cell,ale bez obsahu)
            var nat = (GFEFormatContent)cnt.FormatTag;
            //CommonService.ApplayStyleSizable(Sizable, nat.Style.Attributes);

            if (cnt.AttrList.ContainsKey("width"))
                cnt.Width = new SizeValue(cnt.AttrList["width"]);
            else if (nat != null && nat.Style.Attributes.ContainsKey("width"))
                cnt.Width = new SizeValue(nat.Style.Attributes["width"]);
            //if (string.IsNullOrEmpty(content.Height.Metrics))
            //    content.Height = new SizeValue(content.Height, "mm");


            if (pc100 != 0 && Sizable != null)
                if (Sizable.Width.Metrics == "%")
                    Sizable.Width = new SizeValue(Sizable.Width.Value, pc100);
                else
                    Sizable.Width = new SizeValue(Sizable.Width, Sizable.Width.Metrics, pc100);
        }
        /// <summary>
        /// načtení výšky objektů
        /// </summary>
        /// <param name="force">v tomto případě se ignoruje již načtená velikost</param>
        internal void LoadHeight(bool force)
        {
            var cnt = (DefaultAbstractContent)Sizable;
            if (cnt == null) return;
            var nat = (GFEFormatContent)cnt.FormatTag;
            //CommonService.ApplayStyleSizable(Sizable, nat.Style.Attributes);

            SizeValue minHeight = SizeValue.Empty;
            if (cnt.AttrList.ContainsKey("height"))
                minHeight = new SizeValue(cnt.AttrList["height"]);
            else if (nat != null && nat.Style.Attributes.ContainsKey("height"))
                minHeight = new SizeValue(nat.Style.Attributes["height"]);
            //if (string.IsNullOrEmpty(content.Height.Metrics))
            //    minHeight = new SizeValue(content.Height, "mm");

            if (Sizable is ISizeByContent sbC)
                if (force)
                {
                    sbC.SetHeightByContent(); //nastavi cnt.Text.Changed = false
                    if (minHeight.IsEmpty == false && cnt.Height < minHeight) cnt.Height = minHeight;
                }
                else if (sbC.IsHeightByContent)
                {
                    sbC.SetHeightByContent(); //nastavi cnt.Text.Changed = false
                    if (minHeight.IsEmpty == false && cnt.Height < minHeight) cnt.Height = minHeight;
                }
                else if (minHeight.IsEmpty) //(string.IsNullOrEmpty(minHeight.Value))
                    sbC.SetHeightByContent(); //nastavi cnt.Text.Changed = false
                else
                {
                    cnt.Height = minHeight;
                    cnt.Text.Changed = false; //priznak, ze vyska je nactena spravne a neni treba prepocitavat
                }
        }

        /// <summary>
        /// kreslení objektu
        /// </summary>
        /// <param name="graphics">ovladač grafiky</param>
        /// <param name="args">Upřesnení co a jak vykreslovat</param>
        public void OnPaint(Graphics graphics, PaintArgs args)
        {
            //InlineService.ComputeInlineFlow(this.line.Parent, graphics, this);
            //Layout(graphics);
            this.ForEach(TagService.PaintTag, graphics, args);
        }
        /// <summary>
        /// kreslení ohraničení
        /// </summary>
        /// <param name="graphics">ovladač grafiky</param>
        /// <param name="isSelected">indikátor vybranosti objektu</param>
        public void OnPaintBorder(Graphics graphics, bool isSelected) { }

        internal void SetBackground(Color backColor)
        {
            foreach (var item in this)
                item.BackColor.Color = backColor;
        }

        internal void SetDisplayData()
        {
            foreach (var c in this)
                if (c is IDefaultDataItemHandler dic && dic.DataItem != null)
                    dic.DataItem.SetDisplayValue();
        }
        internal string TextContent
        {
            get
            {
                foreach (var c in this)
                {
                    if (c is IDefaultDataItemHandler dic && dic.DataItem != null)
                        dic.DataItem.SetDisplayValue();
                    if (c is ITextHandler tc) return tc.Text.Text;
                }
                return null;
            }
        }

        #region IDisposable Members

        public void Dispose()
        {
            foreach (var c in this)
                if (c is IDisposable dic)
                    dic.Dispose();
        }

        #endregion

        #region IContainerComponent Members

        object IContainerComponent.this[int index]
        {
            get => base[index];
        }

        int IContainerComponent.IndexOf(object item) => base.IndexOf((ITagComponent)item);
        
        IContainerComponent IContainerComponent.Parent { get => this.line; }

        ISizable IParentable.Parent { get => this.line; set { throw new NotImplementedException(); } }

        public GridLine Line => line;
        public DefaultContentGrid Grid => line.Parent;

        /// <summary>
        /// indikuje možnost manipulace s objektem
        /// </summary>
        public bool ReadOnly => false;

        #endregion
    }
}
