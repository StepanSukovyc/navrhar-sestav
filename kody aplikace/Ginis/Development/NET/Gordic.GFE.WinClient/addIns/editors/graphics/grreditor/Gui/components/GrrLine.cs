//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrrLine.cs                             </Name>
//    <Description> řádek GRR sestavy                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-22                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Drawing.Design;
using System.Linq;
using System.Windows.Forms;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Gui.Dialogs;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.Labels;
using Gordic.GFE.WinClient.GrfEditor;
using Gordic.GFE.WinClient.Designer.Gui;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// řádek GRR sestavy
    /// </summary>
    class GrrLine : UndoRedoList<ICell>, IGRRLine, IKeyActionHandler, IDesignSearchHandler
    {
        #region GrrLineProperty
        #region GridProperty
        /// <summary>
        /// Pozice řádku na stránce
        /// </summary>
        [Category("vlastnosti řádku")]
        [DisplayName("pozice na výstupu")]
        [Description("Pozice řádku na výstupu: úvod/závěr, uvnitř, na každé stránce")]
        public LinePrintPosition LinePropertyPrintPosition { get => Property.PrintPosition; set => Property.PrintPosition = value; }

        /// <summary>
        /// Odstránkovat ZA řádkem
        /// </summary>
        [Category("vlastnosti řádku")]
        [DisplayName("stránkovát 'za' řádkem")]
        [Description("Odstránkovat 'za' řádkem: umožnit, zakázat, žádná akce")]
        public LineBreak LinePropertyBreakPageAfter { get => Property.BreakPageAfter; set => Property.BreakPageAfter = value; }

        /// <summary>
        /// Odstránkovat před řádkem
        /// </summary>
        [Category("vlastnosti řádku")]
        [DisplayName("stránkovát 'před' řádkem")]
        [Description("Odstránkovat 'před' řádkem: umožnit, zakázat, žádná akce")]
        public LineBreak LinePropertyBreakPageBefore { get => Property.BreakPageBefore; set => Property.BreakPageBefore = value; }

        /// <summary>
        /// Indikuje stav, kdy řádek se nachází na konci stránky
        /// </summary>
        [Category("vlastnosti řádku")]
        [DisplayName("konec stránky")]
        [Description("Indikuje stav, kdy se řádek nachází na konci stránky")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        public bool LinePropertyEndPage { get => Property.EndPage; set => Property.EndPage = value; }

        /// <summary>
        /// Parametr OnlyIf
        /// </summary>
        [Category("vlastnosti řádku")]
        [DisplayName("konec stránky")]
        [Description("Indikuje stav, kdy se řádek nachází na konci stránky")]
        public string LinePropertyOnlyIf { get => Property.OnlyIf; set => Property.OnlyIf = value; }

        #endregion

        /// <summary>
        /// vlastnosti řádku
        /// </summary>
        [Browsable(false)]
        public LineProperty Property { get; set; }
        #endregion

        #region ILine
        /// <summary>
        /// indikuje možnost manipulace s objektem
        /// </summary>
        public bool ReadOnly => false;
        /// <summary>
        /// přidavatelný
        /// </summary>
        public bool Adding { get; set; }

        /// <summary>
        /// Pozice objektu v seznamu nadřazeného objketu
        /// </summary>
        [Browsable(false)]
        public List<int> Order
        {
            get
            {
                List<int> ordering = new List<int>();
                if (Parent is IOrder)
                    ordering.AddRange((Parent as IOrder).Order);

                if (Parent is ITowedHandler)
                    ordering.Add((Parent as ITowedHandler).IndexOf(this));

                return ordering;
            }
        }

        event EventHandler Typechanged;
        /// <summary>
        /// volá se po změně typu řádku
        /// </summary>
        public event EventHandler TypeChanged
        {
            add { if (Typechanged != null) Typechanged -= value; Typechanged += value; }
            remove { if (Typechanged != null) Typechanged -= value; }
        }
        UndoRedo<LineType> type;
        /// <summary>
        /// Typ řádku 
        /// </summary>
        [Category("vlastnosti řádku")]
        [DisplayName("typ")]
        [Description("Typ řádku dle umístění: hlavička, tělo, patička")]
        public LineType Type { get => type.Value; set { type.Value = value; OnTypeChanged(); } }

        UndoRedo<bool> isNULLheight;
        /// <summary>
        /// je nulové výšky
        /// </summary>
        [Browsable(false)]
        public bool IsNULLHeight { get => isNULLheight.Value; set => isNULLheight.Value = value; }
        /// <summary>
        /// nastavení NULLové výšky
        /// </summary>
        /// <param name="value">hodnota NULLové výšky</param>
        public void SetNullHeight(bool value)
        {
            IsLoading = true;
            isNULLheight.Value = value;
            foreach (var cell in this)
                if (cell is IGRRCell grrCell)
                    grrCell.IsNULLHeight = value;
            IsLoading = false;
            RefreshTopHeight();
        }
        /// <summary>
        /// pozice objektu v seznamu nadřazeného objektu
        /// </summary>
        public int Index
        {
            get
            {
                if (Parent is AbstractLabel)
                    switch (Type)
                    {
                        case LineType.foot:
                            return (Parent as AbstractLabel).Foot.IndexOf(this);
                        case LineType.head:
                            return (Parent as AbstractLabel).Head.IndexOf(this);
                        default:
                            return (Parent as AbstractLabel).Body.IndexOf(this);
                    }

                return (Parent is GrrContentTable) ? (Parent as GrrContentTable).Lines.IndexOf(this) : -1;
            }
        }
        /// <summary>
        /// zpětná vazba na vlastníka (region) řádku
        /// </summary>
        [Browsable(false)]
        public ILabel ParentLabel
        {
            get
            {
                if (Parent is ILabel)
                    return Parent as ILabel;
                if (Parent is IParentable)
                    if ((Parent as IParentable).Parent is IGRRCell)
                        return ((Parent as IParentable).Parent as IGRRCell).ParentLabel;

                return null;
            }
        }

        bool isLoading;
        /// <summary>
        /// indikuje, že objekt se nachází v režimu načítání
        /// </summary>
        public bool IsLoading
        {
            get => isLoading || ((SimpleDesktop.Desktop.ActiveViewContent as AGraphicViewContent)?.IsLoading ?? false);
            set => isLoading = value;
        }

        UndoRedo<ISizable> parent;
        /// <summary>
        /// Vlastník daného objektu
        /// </summary>
        [Browsable(false)]
        public ISizable Parent { get => parent.Value; set { parent.Value = value; OnParentChanged(); } }

        UndoRedo<IPage> page;
        /// <summary>
        /// stránka řádku
        /// </summary>
        [Browsable(false)]
        public IPage Page { get => page.Value; set => page.Value = value; }

        /// <summary>
        /// volá se po změně vlastníka
        /// </summary>
        public event EventHandler ParentChanged;
        /// <summary>
        /// změna vlastníka buňky
        /// </summary>
        void OnParentChanged()
        {
            ParentChanged?.Invoke(this, EventArgs.Empty);
        }

        /// <summary>
        /// Velikost objektu v pixelech - se Zoom faktorem
        /// </summary>
        [Browsable(false)]
        public RectangleF BoundsInPixels { get => new RectangleF(new PointF(LeftZoom, TopZoom), new SizeF(WidthZoom, HeightZoom)); }

        /// <summary>
        /// Šířka objektu
        /// </summary>
        public SizeValue Width
        {
            get => Parent is ISizeHandler ? new SizeValue((Parent as ISizeHandler).ContentWidth) : SizeValue.Empty;
            set { SetInternalWidth(true); SetInternalLeft(); }
        }

        object syncRoot;
        SizeValue nullValue;
        SizeValue commentValue;

        UndoRedo<SizeValue> height;
        /// <summary>
        /// Výška objektu
        /// </summary>
        [Category("Pozice a velikost")]
        [DisplayName("výška")]
        [Description("Výška objektu")]
        public SizeValue Height
        {
            get => IsNULLHeight ? nullValue : (IsComment ? commentValue : height.Value);
            set => height.Value = value;
        }

        /// <summary>
        /// výška - včetně Zoom
        /// </summary>
        [Browsable(false)]
        public float HeightZoom { get => Height * Zoom; }

        /// <summary>
        /// indikuje změnu výšky
        /// </summary>
        [Browsable(false)]
        public bool IsHeightChanged { get => Exists(itm => itm.Sizable.IsHeightChanged); }

        /// <summary>
        /// Pozice zleva objektu
        /// </summary>
        public SizeValue Left
        {
            get => Parent is ISizeHandler ? new SizeValue((Parent as ISizeHandler).ContentLeft) : SizeValue.Empty;
            set => SetInternalLeft();
        }

        /// <summary>
        /// veličina zvětšení
        /// </summary>
        public float Zoom { get { return Page != null ? Page.Zoom : 0; } }

        /// <summary>
        /// Pozice zleva objektu - včetně Zoom hodnoty
        /// </summary>
        [Browsable(false)]
        public float LeftZoom { get => Left * Zoom + (Page != null ? Page.GraphDiffLeft : 0); }

        UndoRedo<SizeValue> top;
        /// <summary>
        /// Pozice shora objektu
        /// </summary>
        [Category("Pozice a velikost")]
        [DisplayName("shora")]
        [Description("Pozice objektu shora")]
        [ReadOnly(true)]
        public SizeValue Top
        {
            get => top.Value;
            set
            {
                top.Value = value;
                foreach (var item in this)
                    (item as ISizable).Top = value;
            }
        }

        /// <summary>
        /// Pozice shora objektu - včetně Zoom hodnoty
        /// </summary>
        [Browsable(false)]
        public float TopZoom { get => Top * Zoom + (Page != null ? Page.GraphDiffTop : 0); }

        /// <summary>
        /// šířka - včetně Zoom hodnoty
        /// </summary>
        [Browsable(false)]
        public float WidthZoom { get => Width * Zoom; }

        /// <summary>
        /// Indikuje fakt, že objekt obsahuje pouze komentář
        /// </summary>
        [Browsable(false)]
        public bool IsComment { get; set; }

        /// <summary>
        /// Indikuje fakt, že objekt obsahuje pouze komentář
        /// </summary>
        [Browsable(false)]
        public bool IsVisible { get => !IsComment; }

        /// <summary>
        /// kreslení objektu
        /// </summary>
        /// <param name="graphics">ovladač grafiky</param>
        /// <param name="args">args</param>
        public void OnPaint(Graphics graphics, PaintArgs args)
        {
            if (!graphics.VisibleClipBounds.IntersectsWith(BoundsInPixels) || HeightZoom == 0)
                return;

            DrawClear(graphics);

            // vykreslíme vnitřní komponenty
            this.ForEach(TagService.PaintTag, graphics, args);
            if (IsNULLHeight)
                graphics.DrawRectangle(new Pen(new SolidBrush(Color.Red)) { Width = 2 }, LeftZoom, TopZoom, WidthZoom, HeightZoom);
        }

        void DrawClear(Graphics graphics)
        {
            if (this.Type == LineType.head)
                if (ParentLabel.Parent is GrrLabelZone lZ)
                    if (lZ.LObject is GrfContentGrid grid && grid.HeadColor != null)
                        using (SolidBrush drawBrush = new SolidBrush(grid.HeadColor.Color))
                            graphics.FillRectangle(drawBrush, BoundsInPixels);
        }
        /// <exclude/>
        public void OnPaintBorder(Graphics graphics, bool isSelected) { }

        /// <summary>
        /// Změna pozice zleva objektu
        /// </summary>
        /// <param name="value">Nová pozice zleva</param>
        public void ChangeLeft(float value = -1) { }

        /// <summary>
        /// indikuje, že velikost je brána dle obsahu
        /// </summary>
        [Browsable(true)]
        [Description("Indikuje, že velikost je brána dle obsahu")]
        [DisplayName("výška dle obsahu")]
        public bool IsHeightByContent
        {
            get => this.FirstOrNull(itm => !itm.IsHeightByContent) == null;
            set
            {
                lock (syncRoot)
                {
                    foreach (var item in this)
                        item.IsHeightByContent = value;
                    if (value)
                        SetHeightByContent(false);
                }
            }
        }
        /// <summary>
        /// Zkontroluje, jestli je zapotřebí aktualizovat velikost řádku dle aktuální hodnoty IsHeightByContent.
        /// </summary>
        public void CheckIsHeightByContent()
        {
            SetHeightByContent(IsHeightByContent);
        }
        void SetHeightByContent(bool loadHeight)
        {
            SetInternalHeight(loadHeight, false);
            RefreshTopHeight();
        }
        /// <summary>
        /// šířka obsahu
        /// </summary>
        public float ContentWidth { get => Width; }
        /// <summary>
        /// pozice LEFT obsahu
        /// </summary>
        public float ContentLeft { get => Left; }

        /// <summary>
        /// Přepočet výšky
        /// </summary>
        /// <param name="cell">aktuálně vybraná buňka řádku</param>
        public void RecalcHeight(IGRRCell cell)
        {
            if (!IsLoading)
            {
                IsLoading = true;
                bool isChange = false;
                if (IsHeightByContent)
                {
                    if (!IsHeightChanging)
                    {
                        SetInternalHeight();
                        isChange = true;
                    }
                }
                else if (Math.Round(cell.Height - Height, 2) != 0)
                {
                    Height = new SizeValue(cell.Height, Height.Metrics);
                    SetInternalHeight(false, true);
                    isChange = true;
                }

                if (isChange)
                    RefreshTopHeight();

                IsLoading = false;
            }
        }
        /// <summary>
        /// načtení interní velikosti řádku
        /// </summary>
        /// <param name="loadHeight">indikuje, že je zapotřebí načíst velikost</param>
        /// <param name="setByLine">TRUE - nastaví velikost objektů dle řádku</param>
        public void SetInternalHeight(bool loadHeight = false, bool setByLine = false)
        {
            if (setByLine)
            {
                foreach (var item in this)
                    if (Math.Round(item.Height - Height, 2) != 0)
                        item.Height = new SizeValue(Height, !string.IsNullOrEmpty(item.Height.Metrics) ? item.Height.Metrics : "mm");
            }
            else
            {
                IsHeightChanging = true;
                float max = 0;
                bool first = true,
                    change = false,
                    fixSize = false,
                    _isHeightByContent = false;

                /* nastavení výšky vnitřním objektům */
                foreach (var item in this)
                {
                    if (loadHeight || IsLoading && item.IsHeightByContent)
                        item.LoadHeight();

                    if (fixSize)
                    {
                        if (item.IsHeightByContent)
                            change = true;
                    }
                    else if (!item.IsHeightChanged)
                    {
                        max = item.Height;
                        _isHeightByContent = item.IsHeightByContent;
                        fixSize = true;
                        change = !first;

                        if (first)
                            first = false;

                        continue;
                    }

                    if (item.Height < max && _isHeightByContent && !item.IsHeightByContent)
                    {
                        max = item.Height;
                        _isHeightByContent = item.IsHeightByContent;
                    }

                    if (max < item.Height && (_isHeightByContent == item.IsHeightByContent || _isHeightByContent))
                    {
                        max = item.Height;
                        _isHeightByContent = item.IsHeightByContent;
                        change = !first;
                    }
                    // případ, kdy výška následujících objektů je menší než prvního
                    else if (Math.Round(max - item.Height, 2) > 0)
                        change = !first;

                    if (first)
                        first = false;
                }

                if (change)
                    foreach (var item in this)
                        item.Height = new SizeValue(max, !string.IsNullOrEmpty(item.Height.Metrics) ? item.Height.Metrics : "mm");
                Height = new SizeValue(max, "mm");
                IsHeightChanging = false;
            }
        }
        /// <summary>
        /// indikuje, že probíhá změna výšky
        /// </summary>
        public bool IsHeightChanging { get; set; } = false;

        /// <summary>
        /// Změna výšky vybraných objektů
        /// </summary>
        public void SetHeight() { }

        /// <summary>
        /// nastavení šířky objektů (zejména u kterých velikost je vyjádřená v %)
        /// </summary>
        /// <param name="value">nová šířka stránky</param>
        public void ChangeWidth(float value = -1)
        {
            SetInternalWidth(true);
            SetInternalLeft();
        }
        /// <summary>
        /// nastavení šířky vnitřním objektům
        /// </summary>
        public void SetInternalWidth(bool loadWidth = false)
        {
            // pokud řádek není komentářem a zároveň má neNULLovou šířku
            if (!this.IsComment && this.Width.Value != null)
            {
                lock (syncRoot)
                {
                    // nastavení šířky vnitřním objektům
                    float counted = 0;
                    //int residueCount = 0;
                    List<ICell> cells = new List<ICell>();
                    foreach (var item in this)
                    {
                        // pokud potřebujeme šířku načíst, pak jí načteme
                        if (loadWidth)
                            item.LoadWidth(this.Width);

                        if (!item.IsWidthByContent)
                        {
                            if (item.Width.Metrics == "%" && item.Width.PC100 != this.Width)
                                item.Width = new SizeValue(item.Width, "%", this.Width);
                            counted += item.Width;
                        }
                        else if (!item.IsComment)
                            cells.Add(item);
                    }
                    // zbývající velikost
                    float rest = (float)Math.Round(Width - counted, 2);
                    // pokud je více buněk s NULLovou šířkou, 
                    // nebo buněk, šířka kterých by se měla počítát ze zbytku
                    if (rest != 0)
                    {
                        if (rest > 0)
                        {
                            if (cells.Count > 0)
                            {
                                float residue = (Width - counted) / cells.Count;
                                foreach (var item in cells)
                                    item.Width = new SizeValue(residue, "%", Width);
                            }
                            else
                            {
                                if (this.LastOrDefault(cl => !cl.IsComment && !cl.IsSelected) is ICell cell)
                                    cell.Width = new SizeValue(cell.Width + rest, cell.Width.Metrics, !this.Width.IsEmpty ? (float)this.Width : cell.Width.PC100);
                                else
                                    // je zapotřebí automaticky přidat prázdnou položku na konec řádku
                                    this.Add((new GrrCell()).LoadInformation(this));
                            }
                        }
                        else
                        {
                            // najdeme buňky které se dá změnit
                            List<ICell> cls = new List<ICell>();
                            if (cells.Count != 0)
                                cls = cells;

                            do
                            {
                                // NE komentáře, co mají velikost dle zbylého místa
                                if (cls.Count == 0)
                                    cls = FindAll(cl => !cl.IsComment && (cl as IGRRCell).IsWidthByContent && cl.Width > 0 && !cl.IsSelected);

                                // NE komentáře s neNULLovou velikosti
                                if (cls.Count == 0)
                                    cls = FindAll(cl => !cl.IsComment && cl.Width > 0 && !cl.IsSelected);

                                if (cls.Count == 0)
                                    cls = FindAll(cl => !cl.IsComment && (cl as IGRRCell).IsWidthByContent && cl.Width > 0 && !cl.IsSelected);
                                if (cls.Count == 0)
                                    cls = FindAll(cl => !cl.IsComment && cl.Width > 0 && !cl.IsSelected);

                                if (cls.Count != 0)
                                {
                                    ICell actual = cls.FirstOrNull(itm => (float)itm.Width != 0);
                                    if (actual == null)
                                        cls.Clear();
                                    else
                                        while (rest != 0 && actual != null)
                                        {
                                            float wdth = actual.Width;
                                            actual.Width += rest;
                                            rest = wdth + rest > 0 ? 0 : rest + wdth;
                                            actual = cls.FirstOrNull(itm => (float)itm.Width != 0);
                                        }
                                }
                                else
                                    break;
                            } while (cls.Count > 0 && rest != 0);
                        }
                    }
                    else if (cells.Count != 0)
                    {
                        int index = 0;
                        while (index < cells.Count)
                        {
                            if (cells[index].IsEmpty)
                                this.Delete(cells[index]);
                            else cells[index].Width = 0;
                            index++;
                        }
                    }
                }
            }
        }

        /// <summary>
        /// nastavení TOP pozice objektů
        /// </summary>
        /// <param name="value">nová pozice</param>
        public void ChangeTop(float value)
        {
            lock (syncRoot) { this.Top = new SizeValue(value, !string.IsNullOrEmpty(Top.Metrics) ? Top.Metrics : "mm"); }
        }

        /// <summary>
        /// Indikuje fakt, že objekt obsahuje pouze jedno prázdné textové pole
        /// </summary>
        [Browsable(false)]
        public bool IsEmpty { get => this.Count == 1 && this.First().IsEmpty; }

        /// <summary>
        /// získání objektu pod kurzorem
        /// </summary>
        /// <param name="point">pozice kurzoru vůči stránce</param>
        /// <returns>Objekt, který se nachází bezprostředně pod kurzorem</returns>
        public object GetTowedObject(PointF point)
        {
            object result = null;
            if (!IsComment)
                if (this.BoundsInPixels.Contains(point))
                {
                    foreach (var item in this)
                    {
                        result = item.GetTowedObject(point);
                        if (result != null)
                            return result;
                    }
                    result = this;
                }
            return result;
        }

        /// <exclude/>
        public bool EnableShiftUp
        {/*skupiny se posouvat nesmí*/
            get
            {
                switch (Type)
                {
                    case LineType.head:
                        if (Parent is IGRRLabel)
                            return (Parent as IGRRLabel).Head.FirstOrDefault(itm => !itm.IsComment) != this;
                        return false;
                    case LineType.foot:
                        if (Parent is IGRRLabel)
                            return (Parent as IGRRLabel).Foot.FirstOrDefault(itm => !itm.IsComment) != this;
                        return false;
                    default:
                        if (Parent is IGRRLabel)
                            return (Parent as IGRRLabel).Body.FirstOrDefault(itm => itm is IGRRLabel || (itm is IGRRLine && !((itm as IGRRLine).IsComment))) != this;
                        if (Parent is GrrContentTable)
                            return (Parent as GrrContentTable).Lines.FirstOrDefault(itm => !itm.IsComment) != this;
                        return false;
                }
            }
        }
        /// <exclude/>
        public bool EnableShiftDown
        {/*skupiny se posouvat nesmí*/
            get
            {
                switch (Type)
                {
                    case LineType.head:
                        if (Parent is AbstractLabel)
                            return (Parent as AbstractLabel).Head.LastOrDefault(itm => !itm.IsComment) != this;
                        return false;
                    case LineType.foot:
                        if (Parent is AbstractLabel)
                            return (Parent as AbstractLabel).Foot.LastOrDefault(itm => !itm.IsComment) != this;
                        return false;
                    default:
                        if (Parent is AbstractLabel)
                            return (Parent as AbstractLabel).Body.LastOrDefault(itm => itm is AbstractLabel || (itm is IGRRLine && !((itm as IGRRLine).IsComment))) != this;
                        if (Parent is GrrContentTable)
                            return (Parent as GrrContentTable).Lines.LastOrDefault(itm => !itm.IsComment) != this;
                        return false;
                }
            }
        }
        /// <summary>
        /// Posun aktuálního řádku nahoru
        /// </summary>
        public void ShiftUp()
        {
            int indexStart, indexEnd;
            IGRRLine line;
            switch (Type)
            {
                case LineType.head:
                    if (Parent is AbstractLabel)
                    {
                        indexEnd = (Parent as AbstractLabel).Head.IndexOf(this);
                        line = (Parent as AbstractLabel).Head.LastOrDefault(itm => !itm.IsComment && (Parent as AbstractLabel).Head.IndexOf(itm) < indexEnd);
                        if (line != null)
                        {
                            indexStart = (Parent as AbstractLabel).Head.IndexOf(line);
                            (Parent as AbstractLabel).Head.Reverse(indexStart, indexEnd - indexStart + 1);
                            (Parent as AbstractLabel).Head.ChangeTop((Parent as AbstractLabel).Head.Top);
                        }
                    }
                    break;
                case LineType.foot:
                    if (Parent is AbstractLabel)
                    {
                        indexEnd = (Parent as AbstractLabel).Foot.IndexOf(this);
                        line = (Parent as AbstractLabel).Foot.LastOrDefault(itm => !itm.IsComment && (Parent as AbstractLabel).Foot.IndexOf(itm) < indexEnd);
                        if (line != null)
                        {
                            indexStart = (Parent as AbstractLabel).Foot.IndexOf(line);
                            (Parent as AbstractLabel).Foot.Reverse(indexStart, indexEnd - indexStart + 1);
                            (Parent as AbstractLabel).Foot.ChangeTop((Parent as AbstractLabel).Foot.Top);
                        }
                    }
                    break;
                default:
                    if (Parent is AbstractLabel)
                    {
                        indexEnd = (Parent as AbstractLabel).Body.IndexOf(this);
                        object obj = (Parent as AbstractLabel).Body.LastOrDefault(itm => (!(itm is IGRRLine && (itm as IGRRLine).IsComment) || itm is AbstractLabel) && (Parent as AbstractLabel).Body.IndexOf(itm) < indexEnd);
                        if (obj != null)
                        {
                            indexStart = (Parent as AbstractLabel).Body.IndexOf(obj);
                            (Parent as AbstractLabel).Body.Reverse(indexStart, indexEnd - indexStart + 1);
                            (Parent as AbstractLabel).Body.ChangeTop((Parent as AbstractLabel).Body.Top);
                        }
                    }
                    if (Parent is GrrContentTable)
                    {
                        indexEnd = (Parent as GrrContentTable).Lines.IndexOf(this);
                        line = (Parent as GrrContentTable).Lines.LastOrDefault(itm => !itm.IsComment && (Parent as GrrContentTable).Lines.IndexOf(itm) < indexEnd);
                        if (line != null)
                        {
                            indexStart = (Parent as GrrContentTable).Lines.IndexOf(line);
                            (Parent as GrrContentTable).Lines.Reverse(indexStart, indexEnd - indexStart + 1);
                            (Parent as GrrContentTable).Lines.ChangeTop((Parent as GrrContentTable).Lines.Top);
                        }
                    }
                    break;
            }
        }
        /// <summary>
        /// Posun aktuálního řádku dolů
        /// </summary>
        public void ShiftDown()
        {
            int indexStart, indexEnd;
            IGRRLine line;
            switch (Type)
            {
                case LineType.head:
                    if (Parent is AbstractLabel)
                    {
                        indexStart = (Parent as AbstractLabel).Head.IndexOf(this);
                        if (indexStart != -1)
                        {
                            line = (Parent as AbstractLabel).Head.FirstOrDefault(itm => !itm.IsComment && (Parent as AbstractLabel).Head.IndexOf(itm) > indexStart);
                            if (line != null)
                            {
                                indexEnd = (Parent as AbstractLabel).Head.IndexOf(line);
                                (Parent as AbstractLabel).Head.Reverse(indexStart, indexEnd - indexStart + 1);
                                (Parent as AbstractLabel).Head.ChangeTop((Parent as AbstractLabel).Head.Top);
                            }
                        }
                    }
                    break;
                case LineType.foot:
                    if (Parent is AbstractLabel)
                    {
                        indexStart = (Parent as AbstractLabel).Foot.IndexOf(this);
                        if (indexStart != -1)
                        {
                            line = (Parent as AbstractLabel).Foot.FirstOrDefault(itm => !itm.IsComment && (Parent as AbstractLabel).Foot.IndexOf(itm) > indexStart);
                            if (line != null)
                            {
                                indexEnd = (Parent as AbstractLabel).Foot.IndexOf(line);
                                (Parent as AbstractLabel).Foot.Reverse(indexStart, indexEnd - indexStart + 1);
                                (Parent as AbstractLabel).Foot.ChangeTop((Parent as AbstractLabel).Foot.Top);
                            }
                        }
                    }
                    break;
                default:
                    if (Parent is AbstractLabel)
                    {
                        indexStart = (Parent as AbstractLabel).Body.IndexOf(this);
                        if (indexStart != -1)
                        {
                            object obj = (Parent as AbstractLabel).Body.FirstOrDefault(itm => (!(itm is IGRRLine && (itm as IGRRLine).IsComment) || itm is AbstractLabel) && (Parent as AbstractLabel).Body.IndexOf(itm) > indexStart);
                            if (obj != null)
                            {
                                indexEnd = (Parent as AbstractLabel).Body.IndexOf(obj);
                                (Parent as AbstractLabel).Body.Reverse(indexStart, indexEnd - indexStart + 1);
                                (Parent as AbstractLabel).Body.ChangeTop((Parent as AbstractLabel).Body.Top);
                            }
                        }
                    }
                    if (Parent is GrrContentTable)
                    {
                        indexStart = (Parent as GrrContentTable).Lines.IndexOf(this);
                        if (indexStart != -1)
                        {
                            line = (Parent as GrrContentTable).Lines.FirstOrDefault(itm => !itm.IsComment && (Parent as GrrContentTable).Lines.IndexOf(itm) > indexStart);
                            if (line != null)
                            {
                                indexEnd = (Parent as GrrContentTable).Lines.IndexOf(line);
                                (Parent as GrrContentTable).Lines.Reverse(indexStart, indexEnd - indexStart + 1);
                                (Parent as GrrContentTable).Lines.ChangeTop((Parent as GrrContentTable).Lines.Top);
                            }
                        }
                    }
                    break;
            }
        }
        /// <summary>
        /// posunutí buňky <paramref name="cell"/> o jednu pozici doleva
        /// </summary>
        /// <param name="cell">buňka pro přesun</param>
        public void ShiftRight(ICell cell)
        {
            int indexStart = IndexOf(cell);
            ICell cl = this.FirstOrDefault(cel => !cel.IsComment && IndexOf(cel) > indexStart);
            if (cl != null)
            {
                int indexEnd = IndexOf(cl);
                Reverse(indexStart, indexEnd - indexStart + 1);
                SetInternalLeft();
            }
        }
        /// <summary>
        /// posunití buňky <paramref name="cell"/> o jednu pozici doprava
        /// </summary>
        /// <param name="cell">buňka pro přesunutí</param>
        public void ShiftLeft(ICell cell)
        {
            int indexEnd = IndexOf(cell);
            ICell cl = this.LastOrDefault(cel => !cel.IsComment && IndexOf(cel) < indexEnd);
            if (cl != null)
            {
                int indexStart = IndexOf(cl);
                Reverse(indexStart, indexEnd - indexStart + 1);
                SetInternalLeft();
            }
        }
        /// <exclude/>
        public bool EnableMoveToHead
        {
            get => Type != LineType.head && Parent is AbstractLabel && !(Parent as AbstractLabel).DataName.Equals("root", StringComparison.OrdinalIgnoreCase);
        }
        /// <exclude/>
        public bool EnableMoveToBody
        {
            get => Type != LineType.body && Parent is AbstractLabel && !(Parent as AbstractLabel).DataName.Equals("root", StringComparison.OrdinalIgnoreCase);
        }
        /// <exclude/>
        public bool EnableMoveToFoot
        {
            get => Type != LineType.foot && Parent is AbstractLabel && !(Parent as AbstractLabel).DataName.Equals("root", StringComparison.OrdinalIgnoreCase);
        }

        /// <summary>
        /// uložení obsahu řádku do <paramref name="xmlElement"/>
        /// </summary>
        /// <param name="xmlElement">daný XML element, do kterého se vkládá</param>
        /// <param name="xmlDoc">dokument elementu</param>
        /// <param name="styles">seznam již dostupných stylů</param>
        /// <param name="nodeName">název větve</param>
        public void SetData(XmlElement xmlElement, XmlDocumentPosition xmlDoc, List<GFEList> styles, string nodeName = "line")
        {
            XmlElement xmlNode = IsComment ? xmlElement : xmlElement.AppendChild(xmlDoc.CreateElement(nodeName, xmlElement.NamespaceURI)) as XmlElement;
            if (!IsComment)
            {
                switch (Property.BreakPageAfter)
                {
                    case LineBreak.pageup:
                        xmlNode.SetAttribute("break-page-after", "always");
                        break;
                    case LineBreak.sheet:
                        xmlNode.SetAttribute("break-page-after", "sheet");
                        break;
                    case LineBreak.forbid:
                        //v hlavicce defaultni hodnota je AVOID
                        if (Type != LineType.head)
                            xmlNode.SetAttribute("break-page-after", "avoid");
                        break;
                    default:
                        break;
                }

                switch (Property.BreakPageBefore)
                {
                    case LineBreak.pageup:
                        xmlNode.SetAttribute("break-page-before", "always");
                        break;
                    case LineBreak.forbid:
                        //v paticce defaultni hodnota je AVOID
                        if (Type != LineType.foot)
                            xmlNode.SetAttribute("break-page-before", "avoid");
                        break;
                    case LineBreak.sheet:
                        xmlNode.SetAttribute("break-page-before", "sheet");
                        break;
                    default:
                        if (Type == LineType.foot)
                            xmlNode.SetAttribute("break-page-before", "none");
                        break;
                }

                if (!Property.EndPage && Property.PrintPosition != LinePrintPosition.intrclose && Type == LineType.foot)
                    xmlNode.SetAttribute("endpage", "false");

                if (Type != LineType.body)
                {
                    if (Property.PrintPosition == LinePrintPosition.oneachpage)
                        xmlNode.SetAttribute("on-each-page", "true");
                    else if (Property.PrintPosition == LinePrintPosition.middle)
                        xmlNode.SetAttribute("on-each-page", "middle");
                }

                if (!string.IsNullOrEmpty(Property.OnlyIf))
                    xmlNode.SetAttribute("only-if", Property.OnlyIf);//.Replace("&", "&amp;").Replace("\"", "&quot;").Replace("\'", "&apos;").Replace("<", "&lt;").Replace(">", "&gt;"));

                // uložíme neznámé atributy
                XmlDocumentService.SetListOfDictionaryItems(xmlNode, Unknowns, styles);
            }

            foreach (var item in this)
                (item as IGRRCell).SetData(xmlNode, xmlDoc, styles);
        }
        /// <summary>
        /// Změní velikost sousedních objektů dle velikosti změny dané buňky <paramref name="cell"/>.
        /// </summary>
        /// <param name="cell">Buňka, pozice které byla pozměněná</param>
        /// <param name="leftDiff">Velikost změny pozice zlevá dané buňky <paramref name="cell"/>.</param>
        public void ItemLeftChanged(ICell cell, float leftDiff)
        {
            if (cell != null && leftDiff != 0)
            {
                ICell ell = FindLast(cl => !cl.IsComment && cl.Index < cell.Index);
                if (ell is ISizable)
                    (ell as ISizable).Width += leftDiff;
            }
        }
        /// <summary>
        /// aktualizace šířek a pozic zleva všech vnořených objektů
        /// </summary>
        public void RefreshWidthLeft()
        {
            SetInternalWidth(false);
            SetInternalLeft();
        }

        /// <summary>
        /// aktualizace výšek a pozic shora všech vnořených objektů
        /// </summary>
        public void RefreshTopHeight()
        {
            GrrRegion region = LocalCommonService.GetRootRegion(ParentLabel);
            if (region != null && region.Parent is GrrLabelZone lZ)
            {
                lZ.SetHeight();
                lZ.SetTop();
            }
        }
        /// <summary>
        /// nastavení pozic ZLEVA všem vnořeným objektům
        /// </summary>
        public void SetInternalLeft()
        {
            SizeValue lval = Left;
            if (!IsComment)
                lock (syncRoot)
                {
                    float lft = lval;
                    foreach (var item in this)
                    {
                        (item as ISizable).Left = new SizeValue(lft, !string.IsNullOrEmpty((item as ISizable).Left.Metrics) ? (item as ISizable).Left.Metrics : "mm");
                        lft += (item as ISizable).Width;
                    }
                }
        }

        /// <summary>
        /// vložení nové buňky před danou
        /// </summary>
        /// <param name="insertCell">vkládaná buňka</param>
        /// <param name="cell">Daná buňka</param>
        /// <param name="component">Vkládaný obsah</param>
        public void InsertCellBefore(ICell cell, ICell insertCell = null, ITagComponent component = null)
        {
            if (cell != null)
            {
                // aby funkce listChange neproběhla - zbytečné
                isLoading = true;
                cell.Width = new SizeValue(cell.Width / 2, cell.Width.Metrics, cell.Width.PC100);

                int index = IndexOf(cell);
                if (insertCell == null &&
                    (ReportDesignerProperties.Instance.GrrAutoInsertCellEmpty
                    || ReportDesignerProperties.Instance.GrrAutoInsertCellEmptyFormat))
                {
                    if (insertCell == null)
                        insertCell = (new GrrCell()).LoadInformation(this, cell, true, component);

                    /* SS 5.3.2018 dle požadavku email */
                    if (insertCell.IsWidthByContent)
                    {
                        insertCell.IsWidthByContent = false;
                        insertCell.Width = new SizeValue(insertCell.Width) { Metrics = ReportDesignerDesignerProperties.Instance.DefaultMetrics };
                    }
                    if (index != -1)
                        Insert(index, insertCell);
                    else
                        Add(insertCell);

                    if (ReportDesignerProperties.Instance.GrrAutoInsertCellEmptyFormat)
                    {
                        ITagComponent fh = (cell as URAbstractContainer).FirstOrDefault(itm => itm is IFormatHandler);
                        if (fh != null)
                        {
                            ITagComponent cmp = (insertCell as URAbstractContainer).FirstOrDefault(itm => itm is IFormatHandler);
                            if (cmp != null)
                            {
                                (fh as IFormatHandler).CopyFormat();
                                (cmp as IFormatHandler).ApplyFormat();
                            }
                        }
                    }
                }
                else
                {
                    if (insertCell == null)
                        insertCell = (new GrrCell()).LoadInformation(this, cell, component: component);

                    /* SS 5.3.2018 dle požadavku email */
                    if (insertCell.IsWidthByContent)
                    {
                        insertCell.IsWidthByContent = false;
                        insertCell.Width = new SizeValue(insertCell.Width) { Metrics = ReportDesignerDesignerProperties.Instance.DefaultMetrics };
                    }
                    if (index != -1)
                        Insert(index, insertCell);
                    else
                        Add(insertCell);
                }
                //(cell as ISizeHandler).ChangeLeft((insertCell.Left + insertCell.Width));
                isLoading = false;
            }
        }
        /// <summary>
        /// vložení nové buňky za danou
        /// </summary>
        /// <param name="cell">daná buňka</param>
        /// <param name="insertCell">daná buňka</param>
        /// <param name="component">Vkládaný objsah</param>
        public void InsertCellAfter(ICell cell, ICell insertCell = null, ITagComponent component = null)
        {
            if (cell != null)
            {
                isLoading = true;

                cell.Width = new SizeValue(cell.Width / 2, cell.Width.Metrics, cell.Width.PC100);

                int index = IndexOf(cell);
                if (insertCell == null &&
                    (ReportDesignerProperties.Instance.GrrAutoInsertCellEmpty
                    || ReportDesignerProperties.Instance.GrrAutoInsertCellEmptyFormat))
                {
                    if (insertCell == null)
                        insertCell = (new GrrCell()).LoadInformation(this, cell, true, component);

                    /* SS 5.3.2018 dle požadavku email */
                    if (insertCell.IsWidthByContent)
                    {
                        insertCell.IsWidthByContent = false;
                        insertCell.Width = new SizeValue(insertCell.Width) { Metrics = ReportDesignerDesignerProperties.Instance.DefaultMetrics };
                    }
                    if (index == Count - 1)
                        Add(insertCell);
                    else
                        Insert(index + 1, insertCell);

                    if (ReportDesignerProperties.Instance.GrrAutoInsertCellEmptyFormat)
                    {
                        ITagComponent fh = (cell as URAbstractContainer).FirstOrDefault(itm => itm is IFormatHandler);
                        if (fh != null)
                        {
                            ITagComponent cmp = (insertCell as GrrCell).FirstOrDefault(itm => itm is IFormatHandler);
                            if (cmp != null)
                            {
                                (fh as IFormatHandler).CopyFormat();
                                (cmp as IFormatHandler).ApplyFormat();
                            }
                        }
                    }
                }
                else
                {
                    if (insertCell == null)
                        insertCell = (new GrrCell()).LoadInformation(this, cell, component: component);

                    /* SS 5.3.2018 dle požadavku email */
                    if (insertCell.IsWidthByContent)
                    {
                        insertCell.IsWidthByContent = false;
                        insertCell.Width = new SizeValue(insertCell.Width) { Metrics = ReportDesignerDesignerProperties.Instance.DefaultMetrics };
                    }
                    if (index == Count - 1)
                        Add(insertCell);
                    else
                        Insert(index + 1, insertCell);
                }

                //(insertCell as ISizeHandler).ChangeLeft((cell.Left + cell.Width));
                isLoading = false;
            }
        }

        bool isCellRemoving;
        /// <summary>
        /// odstranění buňky ze seznamu
        /// </summary>
        /// <param name="cell">buňka k odstranění</param>
        public void Delete(ICell cell)
        {
            isCellRemoving = true;
            if (cell != null)
            {
                // odstraníme buňku
                if (this.Contains(cell))
                {
                    // pokud jedná se o poslední buňku
                    // pak zabraníme automatickému vytvoření prázného textového pole
                    if (this.Count(cl => !cl.IsComment) == 0)
                        isLoading = true;

                    Remove(cell);
                    isLoading = false;
                }

                // pokud řádek neobsahuje žádnou buňku
                // odstraníme ho
                if (this.Count(cl => !cl.IsComment) == 0)
                    if (Parent is ILineManipulator)
                        (Parent as ILineManipulator).Delete(this);
            }
            isCellRemoving = false;
        }

        /// <summary>
        /// Aktualizace položky
        /// </summary>
        public void RefreshByStructure()
        {
            ThreadService.SafeThreadAsyncCall(delegate
            {
                foreach (ICell item in this)
                    if (!item.IsComment && !item.IsEmpty)
                        item.RefreshByStructure();
            });
        }
        #endregion

        #region ICloneable
        /// <summary>
        /// Creates a new object that is a copy of the current instance
        /// </summary>
        /// <returns>A new object that is a copy of this instance.</returns>
        public object Clone()
        {
            var gl = new GrrLine();
            gl.Initialize(Parent);

            return gl.LoadInformation(this, Page);
        }
        #endregion

        #region IKeyActionHandler
        /// <exclude/>
        public IComponent GetLeftObject() { return null; }
        /// <exclude/>
        public IComponent GetLeftObject(object obj)
        {
            if (obj is ICell cell)
            {
                if (this.FindLast(cl => !cl.IsComment && cl.Index < cell.Index) is GrrCell result)
                    return result.Sizable as IComponent;

                if (Parent is IKeyActionHandler keyHandler)
                    return keyHandler.GetLeftObject(this);
            }
            return null;
        }
        /// <exclude/>
        public IComponent GetRightObject() { return null; }
        /// <exclude/>
        public IComponent GetRightObject(object obj)
        {
            if (obj is ICell cell)
            {
                if (this.Find(cl => !cl.IsComment && cl.Index > cell.Index) is GrrCell result)
                    return result.Sizable as IComponent;

                if (Parent is IKeyActionHandler keyHandler)
                    return keyHandler.GetRightObject(this);
            }
            return null;
        }
        /// <exclude/>
        public IComponent GetTopObject() { return null; }
        /// <exclude/>
        public IComponent GetTopObject(object obj, ISizable sizable) => (Parent is IKeyActionHandler keyHandler) ? keyHandler.GetTopObject(this, sizable) : null;
        /// <exclude/>
        public IComponent GetBottomObject() => null;
        /// <exclude/>
        public IComponent GetBottomObject(object obj, ISizable sizable) => (Parent is IKeyActionHandler keyHandler) ? keyHandler.GetBottomObject(this, sizable) : null;
        #endregion

        #region IDesignSearchHandler
        /// <exclude/>
        public List<IComponent> SearchComponent(Point location)
        {
            throw new NotImplementedException();
        }
        /// <exclude/>
        public List<IComponent> SearchComponentText(TextEditor.Document.ISelection selection)
        {
            List<IComponent> result = new List<IComponent>();

            List<IPositionHandler> tags = this.Select(cell => cell.Sizable as IPositionHandler).ToList().FindAll(tg => tg != null);
            foreach (var item in tags)
            {
                if (item is IDesignSearchHandler)
                    result.AddRange((item as IDesignSearchHandler).SearchComponentText(selection));

                if (selection.StartPosition.Line <= item.StartPosition
                        && item.StartPosition <= selection.EndPosition.Line)
                    result.Add(item as IComponent);
            }
            return result.Distinct().ToList();
        }
        #endregion

        #region vnitřní vlastnosti
        UndoRedo<GFEAttrList> attrlist;
        /// <summary>
        /// Všechny atributy objektu
        /// </summary>
        [DisplayName("atributy")]
        [Description("Všechny atributy objektu")]
        [EditorAttribute(typeof(AttributeListEditor), typeof(UITypeEditor))]
        public GFEAttrList AttrList { get => attrlist.Value; set => attrlist.Value = value; }

        List<string> knownTags;
        /// <summary>
        /// Známě značky datové položky
        /// </summary>
        public virtual List<string> KnownTags
        {
            get
            {
                if (knownTags == null)
                    knownTags = AddInTree.BuildItem("/ReportDesigner/GrrList/LineTags", null) as List<string>;
                return knownTags;
            }
        }

        /// <summary>
        /// Neznámé značky buňky
        /// </summary>
        [Browsable(false)]
        public Dictionary<string, string> Unknowns
        {
            get => AttrList.FindAllByKey(key => !KnownTags.Contains(key));
        }

        /// <summary>
        /// informace o formátu objektu
        /// </summary>
        [Browsable(false)]
        protected GFEFormatTag FormatTag { get; set; }
        #endregion

        XmlElement fragment;

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public GrrLine()
            : base(UndoRedoService.Manager)
        {
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public override void Initialize()
        {
            base.Initialize();
            type = new UndoRedo<LineType>();
            isNULLheight = new UndoRedo<bool>();
            parent = new UndoRedo<ISizable>();
            page = new UndoRedo<IPage>();
            height = new UndoRedo<SizeValue>();
            top = new UndoRedo<SizeValue>();
            attrlist = new UndoRedo<GFEAttrList>();

            syncRoot = new object();
            nullValue = new SizeValue("5mm");
            commentValue = new SizeValue(0);
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="parent">vlastník objektu</param>
        public override void Initialize(ISizable parent)
        {
            base.Initialize(parent);
            Parent = parent;
            AttrList = new GFEAttrList(UndoRedoService.Manager);
            Property = new LineProperty();
            Top = new SizeValue("0mm");
            Type = LineType.line;
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="item">položka analýzeru</param>
        /// <param name="parent">vlastník objektu</param>
        public override void Initialize(GFEFormatTag item, ISizable parent)
        {
            base.Initialize(item, parent);

            FormatTag = item;
            if (item != null)
            {
                AttrList.AddRange(item.Attributes);
                AttrList.SynchronizeByOrigin();
            }
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="item">položka větve</param>
        /// <param name="parent">vlastník řádku</param>
        public override void Initialize(XmlElement item, ISizable parent)
        {
            base.Initialize(item, parent);

            fragment = item;

            if (item != null)
            {
                foreach (XmlAttribute subItem in item.Attributes)
                    if (AttrList.ExistsByKey(itm => itm.Equals(subItem.Name)))
                        AttrList[subItem.Name] = subItem.Value;
                    else
                        AttrList.Add(subItem.Name, subItem.Value);

                AttrList.SynchronizeByOrigin();
            }
        }

        /// <summary>
        /// načtení řádku z FormatTag objektu
        /// </summary>
        /// <param name="type">Typ řádku</param>
        /// <param name="page">stránka objektu</param>
        public IGRRLine LoadInformation(IPage page, LineType type = LineType.line)
        {
            IsLoading = true;
            Page = page;
            Type = type;

            if (fragment != null)
                foreach (var item in fragment)
                    // v případě komentáře vytvoříme jednu buňku s komentářem 
                    this.Add((new GrrCell()).LoadInformation(this, formatTag: null));
            else
            {
                // pokud je to standardní řádek, pak ho vytvoříme
                if (FormatTag is GFEFormatGRRLine
                    // případ GRFGrid objektu
                    || FormatTag is GFEFormatGRFBlock)
                    //inicializujeme všechny buňky popořadí
                    FormatTag.Children.ForEach(LoadCell, FormatTag.Attributes);
                // také to může být komentář 
                else if (FormatTag is GFEFormatComment)
                {
                    IsComment = true;
                    // v případě komentáře vytvoříme jednu buňku s komentářem 
                    this.Add((new GrrCell()).LoadInformation(this, FormatTag));
                }
            }

            foreach (var item in AttrList)
            {
                if (item.Key.Equals("break-page-before", StringComparison.InvariantCultureIgnoreCase))
                {
                    if (item.Value.Equals("always", StringComparison.InvariantCultureIgnoreCase))
                        Property.BreakPageBefore = LineBreak.pageup;
                    else if (item.Value.Equals("avoid", StringComparison.InvariantCultureIgnoreCase))
                        Property.BreakPageBefore = LineBreak.forbid;
                    else if (item.Value.Equals("sheet", StringComparison.InvariantCultureIgnoreCase))
                        Property.BreakPageBefore = LineBreak.sheet;
                    else if (Type == LineType.foot)
                    {
                        if (item.Value.Equals("none", StringComparison.InvariantCultureIgnoreCase))
                            Property.BreakPageBefore = LineBreak.none;
                        else
                            //v paticce defaultni hodnota je AVOID
                            Property.BreakPageBefore = LineBreak.forbid;
                    }
                    else
                        Property.BreakPageBefore = LineBreak.none;
                }
                else if (item.Key.Equals("break-page-after", StringComparison.InvariantCultureIgnoreCase))
                {
                    if (item.Value.Equals("always", StringComparison.InvariantCultureIgnoreCase)
                        || item.Value.Equals("true", StringComparison.InvariantCultureIgnoreCase))
                        Property.BreakPageAfter = LineBreak.pageup;
                    else if (item.Value.Equals("avoid", StringComparison.InvariantCultureIgnoreCase))
                        Property.BreakPageAfter = LineBreak.forbid;
                    else if (item.Value.Equals("sheet", StringComparison.InvariantCultureIgnoreCase))
                        Property.BreakPageAfter = LineBreak.sheet;
                    else
                    {
                        //v hlavicce defaultni hodnota je AVOID
                        if (Type == LineType.head)
                            Property.BreakPageAfter = LineBreak.forbid;
                        else
                            Property.BreakPageAfter = LineBreak.none;
                    }
                }

                if (item.Key.Equals("on-each-page", StringComparison.InvariantCultureIgnoreCase))
                {
                    if (item.Value.Equals("true", StringComparison.InvariantCultureIgnoreCase))
                        Property.PrintPosition = LinePrintPosition.oneachpage;//na uvod zaver + kazda stranka
                    else if (item.Value.Equals("middle", StringComparison.InvariantCultureIgnoreCase))
                        Property.PrintPosition = LinePrintPosition.middle;//uvnitr oblasti
                    else Property.PrintPosition = LinePrintPosition.intrclose;//na uvod zaver
                }

                if (item.Key.Equals("endpage", StringComparison.InvariantCultureIgnoreCase))
                    Property.EndPage = !item.Value.Equals("false", StringComparison.InvariantCultureIgnoreCase);

                if (item.Key.Equals("only-if", StringComparison.InvariantCultureIgnoreCase))
                    Property.OnlyIf = Convert.ToString(item.Value).Replace("&amp;", "&").Replace("&quot;", "\"").Replace("&apos;", "\'").Replace("&lt;", "<").Replace("&gt;", ">");
            }

            IsNULLHeight = TrueForAll(cl => cl != null && (cl as IGRRCell).IsNULLHeight);

            SetInternalWidth(true);
            SetInternalLeft();
            SetInternalHeight(true);

            TypeChanged += PropertyTypeChanged;
            ListChanged += LineListChanged;
            IsLoading = false;

            return this;
        }
        /// <summary>
        /// načtení informace z uvedeného objektu <paramref name="line"/>
        /// do daného s ohledem (bez ohledu) na konfigurací <paramref name="insertSett"/>.
        /// </summary>
        /// <param name="line">uvedený objekt</param>
        /// <param name="page">Stránka řádku</param>
        /// <param name="insertSett">TRUE - brat v ohled nastavení vložení</param>
        /// <returns></returns>
        public IGRRLine LoadInformation(dynamic line, IPage page, bool insertSett = false)
        {
            IsLoading = true;
            Page = page;
            if (line is IGRRLine)
            {
                this.IsComment = line.IsComment;
                this.AttrList = new GFEAttrList((line as GrrLine).AttrList);
                this.Property = new LineProperty(line.Property);
                this.Type = line.Type;
            }
            else
                this.Type = LineType.body;

            // pokud předaný argument je stránka
            this.TypeChanged += PropertyTypeChanged;

            if ((!insertSett
                || ReportDesignerProperties.Instance.GrrAutoInsertLineContent)
                && line is IGRRLine)
            {
                foreach (var item in (line as GrrLine))
                    Add((new GrrCell()).LoadInformation(this, item as GrrCell));
                SetInternalHeight(false);
            }
            else if (insertSett || !(line is IGRRLine))
            {
                Add((new GrrCell()).LoadInformation(this));

                SetInternalWidth(true);
                SetInternalLeft();
                SetInternalHeight(true);
            }

            ListChanged += LineListChanged;
            IsLoading = false;
            return this;
        }

        /// <summary>
        /// sem se dostane jedině, když se řádek přenáší z Těla regionu do patičky
        /// </summary>
        /// <returns></returns>
        bool MoveFoot()
        {
            if (ReportDesignerProperties.Instance.GrrAutoMoveGroup)
            {
                if (ParentLabel is IGroup)
                {
                    if (!(ParentLabel as AbstractLabel).Foot.Contains(this))
                        (ParentLabel as AbstractLabel).Foot.Add(this);
                    return true;
                }
                else if (ParentLabel is GrrRegion && (ParentLabel as GrrRegion).Group.Count != 0)
                {
                    if (!(ParentLabel as GrrRegion).Group.Last().Foot.Contains(this))
                        (ParentLabel as GrrRegion).Group.Last().Foot.Add(this);
                    return true;
                }
            }
            else if (ReportDesignerProperties.Instance.GrrAutoMoveRegion)
                if (ParentLabel != null)
                {
                    if (!(ParentLabel as AbstractLabel).Foot.Contains(this))
                        (ParentLabel as AbstractLabel).Foot.Add(this);
                    return true;
                }

            return false;
        }
        /// <summary>
        /// sem se dostane jedině, když se řádek přenáší z Těla regionu do patičky
        /// </summary>
        /// <returns></returns>
        bool MoveHead()
        {
            if (ReportDesignerProperties.Instance.GrrAutoMoveGroup)
            {
                if (ParentLabel is IGroup)
                {
                    if (!(ParentLabel as AbstractLabel).Head.Contains(this))
                        (ParentLabel as AbstractLabel).Head.Add(this);
                    return true;
                }
                else if (ParentLabel is GrrRegion && (ParentLabel as GrrRegion).Group.Count != 0)
                {
                    if (!(ParentLabel as GrrRegion).Group.Last().Head.Contains(this))
                        (ParentLabel as GrrRegion).Group.Last().Head.Add(this);
                    return true;
                }
            }
            else if (ReportDesignerProperties.Instance.GrrAutoMoveRegion)
                if (ParentLabel != null)
                {
                    if (!(ParentLabel as AbstractLabel).Head.Contains(this))
                        (ParentLabel as AbstractLabel).Head.Add(this);
                    return true;
                }

            return false;
        }
        void LineListChanged(object sender, EventArgs e)
        {
            if (this.Count(cl => !cl.IsComment) != 0 || !isCellRemoving)
            {
                SetInternalHeight(setByLine: !IsHeightByContent);
                SetInternalWidth();
                SetInternalLeft();
            }
        }
        void PropertyTypeChanged(object sender, EventArgs e)
        {
            if (isLoading)
                return;

            bool fromBody = false;
            // prvně najdeme starý seznam a odstraníme z něj daný řádek
            if (Parent is AbstractLabel)
            {
                if ((Parent as AbstractLabel).Head.Contains(this))
                    (Parent as AbstractLabel).Head.Remove(this);
                else if ((Parent as AbstractLabel).Body.Contains(this))
                {
                    fromBody = true;
                    (Parent as AbstractLabel).Body.Remove(this);
                }
                else if ((Parent as AbstractLabel).Foot.Contains(this))
                    (Parent as AbstractLabel).Foot.Remove(this);
            }
            bool needrefresh = true;
            // teď přidámé stávající řádek do odpovídajícího seznamu
            switch (Type)
            {
                case LineType.foot:
                    // musí přijit dotaz KAM vkládat pokud Parent 
                    // je Region ve kterém je skupina a jdeme z těla
                    if (ParentLabel != null)
                    {

                        if ((ParentLabel is IGroup ? (ParentLabel as IGroup).Parent as ILabel : ParentLabel) is GrrRegion region && region.Group.Count != 0 && fromBody)
                        {
                            // dotaz, KAM vkládat?
                            if (ReportDesignerProperties.Instance.GrrAutoMove)
                                if (MoveFoot())
                                    break;

                            QuestionWithDefaultDialog slf = new QuestionWithDefaultDialog();
                            slf.AddControl(new QPMoveLine());
                            if (slf.ShowDialog(SimpleDesktop.MainForm) == DialogResult.OK)
                            {
                                MoveFoot();
                                break;
                            }
                        }
                    }
                    if (!(Parent as AbstractLabel).Foot.Contains(this))
                        (Parent as AbstractLabel).Foot.Add(this);
                    break;
                case LineType.head:
                    // musí přijit dotaz KAM vkládat pokud Parent 
                    // je Region ve kterém je skupina a jdeme z těla
                    if (ParentLabel != null
                        && ParentLabel is GrrRegion
                        && (ParentLabel as GrrRegion).Group.Count != 0 && fromBody)
                    {
                        // dotaz, KAM vkládat?
                        if (ReportDesignerProperties.Instance.GrrAutoMove)
                            if (MoveHead())
                                break;

                        QuestionWithDefaultDialog slf = new QuestionWithDefaultDialog();
                        slf.AddControl(new QPMoveLine());
                        if (slf.ShowDialog(SimpleDesktop.MainForm) == DialogResult.OK)
                        {
                            MoveHead();
                            break;
                        }
                    }
                    if (!(Parent as AbstractLabel).Head.Contains(this))
                        (Parent as AbstractLabel).Head.Add(this);
                    break;
                case LineType.body:
                    if (!(Parent as AbstractLabel).Body.Contains(this))
                        (Parent as AbstractLabel).Body.Add(this);
                    break;
                default:
                    needrefresh = false;
                    break;
            }
            if (needrefresh)
            {
                // je-li vlastník řádku region
                AbstractLabel label = ParentLabel is IGroup ? ParentLabel.ParentLabel as AbstractLabel : ParentLabel as AbstractLabel;
                if (label != null)
                {
                    label.SetHeight();
                    label.ChangeTop(label.Top);
                }
            }
        }
        void OnTypeChanged()
        {
            Typechanged?.Invoke(this, EventArgs.Empty);
        }
        void LoadCell(GFEFormatTag formatTag, params object[] attributes)
        {
            if (formatTag != null)
                Add((new GrrCell()).LoadInformation(this, formatTag));
        }
    }
}
