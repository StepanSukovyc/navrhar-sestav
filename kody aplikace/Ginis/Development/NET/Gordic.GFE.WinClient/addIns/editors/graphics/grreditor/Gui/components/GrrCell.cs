//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrrCell.cs                             </Name>
//    <Description> buňka grr sestavy                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-23                                                  </Created>
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
using Gordic.GFE.WinClient.Designer.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Gui.Dialogs;
using Gordic.GFE.WinClient.Services;
using Gordic.Report.Implementation;
using Gordic.General;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// buňka grr sestavy
    /// </summary>
    class GrrCell : URAbstractContainer, IGRRCell
    {
        #region AbstractContainer
        /// <summary>
        /// Pozice objektu v seznamu nadřazeného objketu
        /// </summary>
        [Browsable(false)]
        public List<int> Order
        {
            get
            {
                List<int> ordering = new List<int>();
                if (Line != null)
                {
                    ordering.AddRange(Line.Order);
                    ordering.Add(Line.IndexOf(this));
                }
                return ordering;
            }
        }

        /// <summary>
        /// odstranění obsahu.
        /// místo dosavadního obsahu se vloží prázdná textová položka
        /// </summary>
        public override void DeleteContent()
        {
            if (!IsEmpty)
            {
                ITagComponent clone = this.FirstOrNull(cmp => cmp is ICloneable);
                if (clone != null)
                {
                    GrrContentText text = new GrrContentText();
                    text.Initialize(clone);
                    //fix: 5.9.2013
                    if (text.Text == null)
                    {
                        text.Text = new URTagText();
                        text.Text.Initialize(ReportDesignerDesignerProperties.Instance);
                    }
                    /* 
                     * v případě odstranění obsahu výběru se musí odstranit i název položky - 
                     * jinak by se tato položka stále brala jako value-of 
                     * fix: 9.3.2016 
                     */
                    if (text.AttrList.ContainsKey("name"))
                    {
                        text.Text.Text = text.AttrList["name"];
                        text.AttrList.Remove("name");
                    }
                    else
                        text.Text.Text = string.Empty;

                    text.HeightChanged += HeightChanged;
                    if (ServiceService.ServiceSelection.SelectedComponents.Contains(clone))
                        ServiceService.ServiceSelection.Remove(clone);
                    this.Clear();
                    clone.Parent = null;
                    Add(text);
                    ServiceService.ServiceSelection.SetSelectedComponents(text, System.ComponentModel.Design.SelectionTypes.Add);
                }
            }
        }
        /// <summary>
        /// odstranění obsahu kontaineru
        /// </summary>
        /// <param name="cmp">objekt k odstranění</param>
        public override void Delete(ITagComponent cmp)
        {
            if (cmp == null)
                return;

            base.Delete(cmp);
            ServiceService.ServiceSelection.Remove(cmp);

            if (Count == 0 && Parent is GrrLine)
                (Parent as GrrLine).Delete(this);
        }

        /// <summary>
        /// odstranění obsahu kontaineru
        /// </summary>
        /// <param name="cmp">objekt k odstranění</param>
        public void Delete(object cmp = null)
        {
            if (cmp == null)
                DeleteContent();
            else
            {
                base.Delete(cmp as ITagComponent);
                ServiceService.ServiceSelection.Remove(cmp);

                if (Count == 0 && Parent is ILine)
                    (Parent as ILine).Delete(this);
            }
        }

        /// <summary>
        /// vložení položky boční lišty na daný objekt
        /// </summary>
        /// <param name="info">větev lišty</param>
        /// <param name="e"></param>
        /// <param name="type">typ vkládaného objektu</param>
        /// <returns>vložený objekt</returns>
        /// <param name="format">Formát sestavy</param>
        public override IComponent CreateItem(dynamic info, System.Windows.Forms.MouseEventArgs e, ComponentType type, GFEFormat format = null)
        {
            if (info == null)
            {
                MessageService.ShowError(GResources.GetResourceText(29450037)); //RC 29450037 : Objekt nelze vytvořit - nedostatek informace!
                return null;
            }

            dynamic com = null;
            SideTabItem item = info as SideTabItem;
            bool createObject = true;
            XmlElement fragment = (item != null && item.Entry != null) ? item.Entry.Element : null;
            if (item != null
                && !string.IsNullOrEmpty(item.Entry.WizardPath))
            {
                WizardDialog wizard = new WizardDialog(GResources.GetResourceText(29450050), item.Entry.Element, item.Entry.WizardPath);
                if (wizard.ShowDialog(SimpleDesktop.MainForm) != DialogResult.OK)
                    createObject = false;
                else
                    fragment = wizard.Customizer as XmlElement;
            }
            if (createObject)
            {
                switch (type)
                {
                    case ComponentType.image:
                        com = new GrrContentImage();
                        break;
                    case ComponentType.text:
                        com = new GrrContentText();
                        break;
                    case ComponentType.chart:
                        com = new GrrContentChart();
                        break;
                    case ComponentType.table:
                        com = new GrrContentTable();
                        break;
                    case ComponentType.barcode:
                        com = new GrrContentBarcode();
                        break;
                    case ComponentType.drawing:
                        com = new GrrContentDrawing();
                        break;
                    case ComponentType.variable:
                    case ComponentType.valueof:
                        com = new GrrContentValue();
                        break;
                    case ComponentType.select:
                        com = new GrrContentSelect();
                        break;
                    case ComponentType.region:
                        if (this.ParentLabel != null)
                        {
                            if (Line != null)
                                if (ReplaceLineContent)
                                {
                                    GrrRegion reg = ParentLabel as GrrRegion;
                                    if (ReportDesignerProperties.Instance.GrrAutoIncludeLineContentNewLineBefore)
                                        reg.Body.InsertBefore(new GrrRegion(reg.LabledObject), Line, info);
                                    else
                                        reg.Body.InsertAfter(new GrrRegion(reg.LabledObject), Line, info);

                                    if (reg != null && reg.Group.Count > 0)
                                        reg.Body.ForEach(cm => cm is AbstractLabel, ChangeParent, reg.Group.Last());

                                    LocalCommonService.LabelZoneListChanged(reg);
                                    return null;
                                }
                        }
                        MessageService.ShowError(GResources.GetResourceText(29450038)); //RC 29450038 : Objekt nelze vložit - nedostatek informace!
                        if (UndoRedoService.IsTransactionStarted)
                            UndoRedoService.FlushHistory();
                        return null;
                    default:
                        break;
                }

                if (com == null)
                {
                    MessageService.ShowErrorFormatted(GResources.GetResourceText(29450039) + " '{0}'.", type); //RC 29450039 : Nepodporovaný formát objektu
                    if (UndoRedoService.IsTransactionStarted)
                        UndoRedoService.FlushHistory();
                }
                else
                {
                    if (fragment == null)
                        com.Initialize(info);
                    else
                        com.Initialize(fragment);

                    com.Load(Line?.Page, this);
                    // potřebujeme zjistit, jestli náhodou se nevkládá na objekt IBarcode
                    ITagComponent tag = this.FirstOrNull(itm => itm != null);
                    // buď obsah je prázdný, nebo obsah implementuje rozhraní IBarcode
                    if ((this.IsEmpty || (tag is IBarcode && com is ITextHandler))
                        //zjištění toho, co se má dít s vkládaným objektem
                        && ReplaceCellContent
                        // nebo dle konfigurace
                        && ReportDesignerProperties.Instance.GrrAutoReplaceEmptyCellContentReplace)
                    {
                        if (tag is IBarcode && com is ITextHandler)
                            (tag as IBarcode).Textable = com;
                        else
                        {
                            com.ApplyFormat(this.FirstOrNull(cm => cm is ITagComponent));

                            com.IsHeightByContent = this.IsHeightByContent;
                            com.IsWidthByContent = this.IsWidthByContent;
                            com.Height = new SizeValue(this.Height);
                            com.Width = new SizeValue(Width);
                            com.Top = new SizeValue(Top);
                            com.Left = new SizeValue(Left);
                            this.RemoveAll(cm => cm is ITagComponent);
                            this.Add(com);
                            sizable.Value = com;
                            (com as AbstractContent).HeightChanged += HeightChanged;
                        }
                    }
                    else
                    {
                        if (e != null)
                        {
                            float a = e.X - this.LeftZoom - (this.ParentLabel != null && this.ParentLabel.LabledObject != null ? this.ParentLabel.LabledObject.LeftZoom : 0),
                                b = (this.LeftZoom + this.WidthZoom) - e.X + (this.ParentLabel != null && this.ParentLabel.LabledObject != null ? this.ParentLabel.LabledObject.LeftZoom : 0);

                            if (a < b)
                                Line.InsertCellBefore(this, component: com);
                            else
                                Line.InsertCellAfter(this, component: com);
                        }
                        else
                            Line.InsertCellAfter(this, component: com);
                    }
                }
            }

            return com;
        }
        void ChangeParent(object bodyObject, params object[] obj)
        {
            if (obj == null || obj.Length == 0 || !(obj[0] is ISizable) || !(bodyObject is IParentable))
                return;
            if (!(bodyObject as IParentable).Parent.Equals(obj[0] as ISizable))
                (bodyObject as IParentable).Parent = obj[0] as ISizable;
        }
        void HeightChanged(object sender, EventArgs e)
        {
            Line.RecalcHeight(this);
        }
        #endregion

        #region ICell
        /// <summary>
        /// indikuje možnost manipulace s objektem
        /// </summary>
        public bool ReadOnly => false;

        readonly UndoRedo<bool> isNULLheight = new UndoRedo<bool>();
        /// <summary>
        /// je nulové výšky
        /// </summary>
        [Browsable(false)]
        public bool IsNULLHeight { get => isNULLheight.Value;  set { isNULLheight.Value = value; if (value) Height = SizeValue.MM5; } }
        /// <summary>
        /// pozice buňky v seznamu nadřazeného objektu
        /// </summary>
        [Browsable(false)]
        public int Index { get => Line != null ? Line.IndexOf(this) : -1; }
        /// <summary>
        /// stránka buňky
        /// </summary>
        public Gordic.GFE.Parsers.IPage Page { get => Line?.Page; }

        /// <summary>
        /// Získání vzhledu kurzóru dle jeho umístění
        /// </summary>
        /// <param name="pointF">Umístění kurzóru</param>
        /// <param name="direction">Směr pohybu</param>
        /// <returns>Vzhled kurzoru</returns>
        public Cursor GetCursor(PointF pointF, ref int direction)
        {
            Cursor curs = Cursors.Default;
            curs = CommonService.GetCursor(pointF, BoundsInPixels, ref direction);

            // nelze měnit velikost prvního objektu tažením doleva
            if (direction == 3 || direction == 5 || direction == 0)
            {
                if (Line is GrrLine)
                {
                    if (!(Line as GrrLine).Exists(cl => !cl.IsComment && cl.Index < Index))
                    {
                        if (direction == 3)
                            direction = -1;
                        else if (direction == 5)
                            direction = 6;
                        else
                            direction = 1;
                    }
                }
            }
            // nelze měnit velikost posledního objektu tažením doprava
            else if (direction == 2 || direction == 4 || direction == 7)
            {
                if (Line is GrrLine)
                {
                    if (!(Line as GrrLine).Exists(cl => !cl.IsComment && cl.Index > Index))
                    {
                        if (direction == 4)
                            direction = -1;
                        else if (direction == 2)
                            direction = 1;
                        else
                            direction = 6;
                    }
                }
            }

            // nelze měnit výšku řádku s fajfkou - výška dle obsahu
            if (Line != null && Line.IsHeightByContent)
            {
                // pouze velikost zlevá
                if (direction == 0 || direction == 5)
                {
                    direction = 3;
                    return Cursors.SizeWE;
                }
                // pouze změna vpravo
                else if (direction == 2 || direction == 7)
                {
                    direction = 4;
                    return Cursors.SizeWE;
                }
                else if (direction == 1 || direction == 6)
                    return Cursors.Default;
            }
            return curs;
        }

        /// <summary>
        /// zpětná vazba na vlastníka (region) řádku
        /// </summary>
        [Browsable(false)]
        public ILabel ParentLabel { get => Line?.ParentLabel; }

        /// <exclude/>
        public bool EnableShiftUp {/*skupiny se posouvat nesmí*/get => Line != null && (Line as GrrLine).EnableShiftUp; }
        /// <exclude/>
        public bool EnableShiftDown {/*skupiny se posouvat nesmí*/get => Line != null && (Line as GrrLine).EnableShiftDown; }
        /// <exclude/>
        public bool EnableShiftLeft {/*skupiny se posouvat nesmí*/get => Line != null && Line.FirstOrDefault(itm => !itm.IsComment) != this; }
        /// <exclude/>
        public bool EnableShiftRight {/*skupiny se posouvat nesmí*/get => Line != null && Line.LastOrDefault(itm => !itm.IsComment) != this; }

        /// <exclude/>
        public bool EnableMoveToHead {/*skupiny se posouvat nesmí*/get => Line != null && (Line as GrrLine).EnableMoveToHead; }
        /// <exclude/>
        public bool EnableMoveToBody {/*skupiny se posouvat nesmí*/get => Line != null && (Line as GrrLine).EnableMoveToBody; }
        /// <exclude/>
        public bool EnableMoveToFoot {/*skupiny se posouvat nesmí*/get => Line != null && (Line as GrrLine).EnableMoveToFoot; }

        /// <summary>
        /// Indikuje fakt, že objekt obsahuje pouze komentář
        /// </summary>
        [Browsable(false)]
        public bool IsComment { get => !Exists(itm => !(itm is GrrContentComment)); }
        /// <summary>
        /// indikuje, že buňka obsahuje vybraný objekt
        /// </summary>
        [Browsable(false)]
        public bool IsSelected { get => Exists(itm => itm is AbstractContent && (itm as AbstractContent).IsSelected); }

        readonly UndoRedo<ISizable> parent = new UndoRedo<ISizable>();
        /// <summary>
        /// Vlastník daného objektu
        /// </summary>
        [Browsable(false)]
        public ISizable Parent { get => parent.Value; set { parent.Value = value; } }

        readonly UndoRedo<ILine> line = new UndoRedo<ILine>();
        /// <summary>
        /// řádek buňky
        /// </summary>
        [Browsable(false)]
        public ILine Line { get => line.Value; set { line.Value = value; } }

        /// <summary>
        /// Velikost objektu v pixelech - se Zoom faktorem
        /// </summary>
        [Browsable(false)]
        public System.Drawing.RectangleF BoundsInPixels { get => new RectangleF(new PointF(LeftZoom, TopZoom), new SizeF(WidthZoom, HeightZoom)); }

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
            set
            {
                if (Sizable != null)
                {
                    Sizable.Height = value;
                    HeightChanged(this, EventArgs.Empty);
                }
            }
        }
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
        /// indikuje změnu výšky
        /// </summary>
        [Browsable(false)]
        public bool IsHeightChanged { get => Exists(itm => itm.IsHeightChanged); }

        /// <summary>
        /// načtení šířky
        /// </summary>
        /// <param name="pc100">číslo, představující 100%</param>
        public void LoadWidth(float pc100)
        {
            if (pc100 != 0 && Sizable != null)
                if (Sizable.Width.Metrics == "%")
                    Sizable.Width = new SizeValue(Sizable.Width.Value, pc100);
                else
                    Sizable.Width = new SizeValue(Sizable.Width, Sizable.Width.Metrics, pc100);
        }
        /// <summary>
        /// načtení výšky
        /// </summary>
        public void LoadHeight()
        {
            if (Sizable is ISizeByContent)
                if (Sizable.Height.Value == null || (Sizable as ISizeByContent).IsHeightByContent)
                    (Sizable as ISizeByContent).SetHeightByContent();
        }

        /// <summary>
        /// veličina zvětšení
        /// </summary>
        public float Zoom { get => Line != null && Line.Page != null ? Line.Page.Zoom : 1f; }
        /// <summary>
        /// výška - včetně Zoom
        /// </summary>
        [Browsable(false)]
        public float HeightZoom { get => Height * Zoom; }

        /// <summary>
        /// Pozice zleva objektu - včetně Zoom hodnoty
        /// </summary>
        [Browsable(false)]
        public float LeftZoom { get => Left * Zoom + Page.GraphDiffLeft; }

        /// <summary>
        /// Pozice shora objektu - včetně Zoom hodnoty
        /// </summary>
        [Browsable(false)]
        public float TopZoom { get => Line.TopZoom; }

        /// <summary>
        /// šířka - včetně Zoom hodnoty
        /// </summary>
        [Browsable(false)]
        public float WidthZoom { get => Width * Zoom; }

        /// <exclude/>
        public void OnPaint(Graphics graphics, PaintArgs args)
        {
            if (!graphics.VisibleClipBounds.IntersectsWith(BoundsInPixels))
                return;

            this.ForEach(TagService.PaintTag, graphics, args);
        }
        /// <exclude/>
        public void OnPaintBorder(Graphics graphics, bool isSelected) { }

        /// <summary>
        /// Změna pozice zleva objektu
        /// </summary>
        /// <param name="value">Nová pozice zleva</param>
        public void ChangeLeft(float value) { }

        /// <summary>
        /// indikuje, že velikost je brána dle obsahu
        /// </summary>
        [Browsable(false)]
        public bool IsHeightByContent
        {
            get => this.FirstOrNull(itm => (itm is ISizeByContent) && !(itm as ISizeByContent).IsHeightByContent) == null;
            set
            {
                foreach (var item in this)
                    if (item is ISizeByContent)
                        (item as ISizeByContent).IsHeightByContent = value;
            }
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
        /// Změna výšky vybraných objektů
        /// </summary>
        public void SetHeight()
        {
            lock (syncRoot)
            {
                float max = this.Height;
                bool isChanged = false;

                foreach (var item in this)
                {
                    if ((item is IGRR && (item as IGRR).IsHeightByContent)
                        || item is GrrContentTable)
                        (item as IGRR).SetHeightByContent();

                    if (max != item.Height)
                    {
                        if (max < item.Height)
                            max = item.Height;
                        isChanged = true;
                    }
                }

                if (isChanged)
                    this.Height = new SizeValue(max, !string.IsNullOrEmpty(this.Height.Metrics) ? this.Height.Metrics : "mm");

                IsHeightByContent = this.FirstOrNull(itm => itm is IGRR && !(itm as IGRR).IsHeightByContent) == null;
                //}
                //else
                //    this.Height = new SizeValue(value);
                //foreach (var item in this)
                //    if (item is ISizeHandler)
                //        (item as ISizeHandler).SetHeight(value);
            }
        }
        /// <summary>
        /// nastavení šířky objektů (zejména u kterých velikost je vyjádřená v %)
        /// </summary>
        /// <param name="value">nová šířka stránky</param>
        public void ChangeWidth(float value)
        {
            lock (syncRoot)
            {
                float _width = 0;
                foreach (var item in this)
                {
                    if (item.Width.Metrics == "%")
                        item.Width = new SizeValue(item.Width.Value, value);

                    _width += item.Width;
                }

                if (_width != 0
                    && Math.Round(this.Width - _width, 2) != 0)
                    this.Width = new SizeValue(_width, !string.IsNullOrEmpty(this.Width.Metrics) ? this.Width.Metrics : "mm");
            }
        }
        /// <summary>
        /// nastavení TOP pozice objektů
        /// </summary>
        /// <param name="value">nová pozice</param>
        public void ChangeTop(float value)
        {
            lock (syncRoot)
            {
                /*TOP pozice samotné buňky se bere z TOP pozice řádku*/
                foreach (var item in this)
                    if (item is ISizeHandler)
                        (item as ISizeHandler).ChangeTop(value);
            }
        }

        /// <summary>
        /// Indikuje fakt, že objekt obsahuje pouze jedno prázdné textové pole
        /// </summary>
        public bool IsEmpty { get => this.Count == 1 && (this.Last() is GrrContentText) && string.IsNullOrEmpty((this.Last() as GrrContentText).PropertyText); }

        /// <summary>
        /// získání objektu pod kurzorem
        /// </summary>
        /// <param name="point">pozice kurzoru vůči stránce</param>
        /// <returns>Objekt, který se nachází bezprostředně pod kurzorem</returns>
        public override object GetTowedObject(PointF point)
        {
            object result = null;

            foreach (var item in this)
                if (item is ITowedHandler)
                {
                    result = (item as ITowedHandler).GetTowedObject(point);
                    if (result != null)
                        return result;
                }

            return result;
        }

        /// <summary>
        /// uložení obsahu řádku do <paramref name="xmlElement"/>
        /// </summary>
        /// <param name="xmlElement">daný XML element, do kterého se vkládá obsah</param>
        /// <param name="xmlDoc">výsledný dokument</param>
        /// <param name="styles">seznam již dostupných stylů</param>
        public void SetData(System.Xml.XmlElement xmlElement, XmlDocumentPosition xmlDoc, List<GFEList> styles = null)
        {
            if (IsComment)
                foreach (var item in this)
                    xmlElement.AppendChild(xmlDoc.CreateComment((item as GrrContentComment).CommentText));
            else
                this.First().SetXmlData(xmlElement, xmlDoc, styles, false);
        }
        #endregion

        #region ICloneable
        /// <summary>
        /// Creates a new object that is a copy of the current instance
        /// </summary>
        /// <returns>A new object that is a copy of this instance.</returns>
        public object Clone() { return null; }
        #endregion

        #region IKeyActionHandler
        /// <exclude/>
        public override IComponent GetLeftObject()
        {
            //if (Keyboard.IsKeyDown(Keys.I) && Content is IKeyActionHandler)
            //    return (Sizable as IKeyActionHandler).GetLeftObject(null);
            //if (Keyboard.IsKeyDown(Keys.O) && Line.Parent is GrrContent)
            //    return (Line.Parent as AbstractContentLineable).ParentCell;
            return (Line as IKeyActionHandler).GetLeftObject(this);
        }
        /// <exclude/>
        public override IComponent GetRightObject()
        {
            return (Line as IKeyActionHandler).GetRightObject(this);
            //if (Keyboard.IsKeyDown(Keys.I) && Content is IKeyActionHandler)
            //    return (Content as IKeyActionHandler).GetRightObject(null);
            //else if (Keyboard.IsKeyDown(Keys.O) && Line.Parent is GrrContent)
            //    return (Line.Parent as GrrContent).ParentCell;
            //return Line.GetRightObject(this);
        }
        /// <exclude/>
        public override IComponent GetTopObject() { return (Line as IKeyActionHandler).GetTopObject(this, this); }
        /// <exclude/>
        public override IComponent GetBottomObject() { return (Line as IKeyActionHandler).GetBottomObject(this, this); }
        #endregion

        #region vnitřní vlastnosti
        /// <summary>
        /// informace o formátu objektu
        /// </summary>
        [Browsable(false)]
        protected GFEFormatTag FormatTag { get; set; }

        readonly UndoRedo<GFEAttrList> attrlist = new UndoRedo<GFEAttrList>();
        /// <summary>
        /// Všechny atributy objektu
        /// </summary>
        [DisplayName("atributy")]
        [Description("Všechny atributy objektu")]
        [EditorAttribute(typeof(AttributeListEditor), typeof(UITypeEditor))]
        public GFEAttrList AttrList { get => attrlist.Value; set { attrlist.Value = value; } }
        #endregion

        readonly UndoRedo<ISizable> sizable = new UndoRedo<ISizable>();
        /// <summary>
        /// vnitřní objekt
        /// </summary>
        public ISizable Sizable { get => sizable.Value; set { sizable.Value = value; } }

        /// <summary>
        /// indikuje, že šířka je dle pozůstalé velikosti řádku
        /// </summary>
        public bool IsWidthByContent
        {
            get => Exists(tc => tc is ISizeByContent && (tc as ISizeByContent).IsWidthByContent);
            set
            {
                foreach (var item in this)
                    if (item is ISizeByContent)
                        (item as ISizeByContent).IsWidthByContent = value;
            }
        }

        readonly object syncRoot = new object();

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public GrrCell()
        {
            AttrList = new GFEAttrList(UndoRedoService.Manager);
            ListChanged += List_Changed;
        }

        /// <summary>
        /// načtení informaci o buňce z formátu
        /// </summary>
        /// <param name="formatTag">formát buňky</param>
        /// <param name="line">řádek buňky</param>
        /// <returns>daná buňka sformátovaná dle <paramref name="formatTag"/>.</returns>
        internal GrrCell LoadInformation(ILine line, GFEFormatTag formatTag = null)
        {
            Line = line;
            // TODO: Complete member initialization
            this.FormatTag = formatTag;
            if (formatTag != null)
            {
                AttrList.AddRange(formatTag.Attributes);
                AttrList.SynchronizeByOrigin();
            }
            dynamic comp = null;
            if (FormatTag == null)
                comp = new GrrContentText();
            //pro případ komentáře
            else if (FormatTag is GFEFormatComment)
                comp = new GrrContentComment();
            else if (FormatTag is GFEFormatGRRCell)
            {
                // projdeme všechny vnořené objekty ze seznamu TAG a vytvoříme vnořené objekty pro danou buňku
                foreach (GFEFormatTag _item in (FormatTag as GFEFormatGRRCell).Children)
                {
                    GFEFormatTag item = null;
                    dynamic component = null;

                    if (_item is GFEFormatContentTextbox)
                    {
                        if ((_item as GFEFormatContentTextbox).Children.Count != 0)
                            item = (_item as GFEFormatContentTextbox).Children[0];
                    }
                    else item = _item;

                    if (item is GFEFormatContentTable)
                        component = new GrrContentTable();
                    else if (item is GFEFormatContentText)
                        component = new GrrContentText();
                    else if (item is GFEFormatContentValue)
                        component = new GrrContentValue();
                    else if (item is GFEFormatContentDrawing)
                        component = new GrrContentDrawing();
                    // případ obrázku
                    else if (item is GFEFormatContentImage)
                        switch (item.TagName.ToLowerInvariant())
                        {
                            case "image-of":
                                /*
                                 // případ datového obrázku
                                    GrrContentImageOf _imageOf = new GrrContentImageOf();
                                    _imageOf.ParentCell = this;
                                    //pokud výška buňky je nastavená, pak ji předáme i vnitřním objektům
                                    if (Height != 0)
                                        _imageOf.SetHeight(_height);

                                    //pokud šířka buňky je nastavená, pak ji předáme i vnitřním objektům
                                    if (Width != 0)
                                        _imageOf.SetWidth(_width);

                                    _imageOf.Initialize(item);
                                    //nastavíme atributy které jsou standardní ale jsou uvedené
                                    _imageOf.SetDefaultAttributes(_cell.Style.Attributes);

                                    //pokud i přesto výška není známa, pak se bere dle obsahu
                                    if (string.IsNullOrEmpty(_imageOf.SizeHeight.Value))
                                        _imageOf.SetHeightByContent();

                                    Content = _imageOf;*/
                                break;
                            case "barcode":
                                component = new GrrContentBarcode();
                                break;
                            default:
                                component = item is GFEFormatContentChart ? (dynamic)new GrrContentChart() : (dynamic)new GrrContentImage();
                                break;
                        }
                    // případ komentáře
                    else if (item is GFEFormatComment)
                        component = new GrrContentComment();
                    // také tato větev nemusí být známa
                    else if (item is GFEFormatContentChart)
                        component = new GrrContentChart();
                    else if (item is GFEFormatContentSelect)
                        component = new GrrContentSelect();
                    else if ("button".Equals(item.TagName.ToLowerInvariant()))
                        component = new GrrContentButton();
                    else if ("p".Equals(item.TagName.ToLowerInvariant()))
                        component = new ContentPArea();
                    else component = new GrrContentUnknown();

                    if (component != null)
                    {
                        component.Initialize(item);
                        component.Load(Page, this);
                        if (component is AbstractContent)
                            (component as AbstractContent).HeightChanged += HeightChanged;
                        Add(component);
                    }
                }
            }
            // je GFEFormatUnknown 
            else if (FormatTag is GFEFormatUnknown)
                comp = new GrrContentUnknown();

            if (comp != null)
            {
                comp.Initialize(FormatTag);
                comp.Load(Page, this);
                (comp as AbstractContent).HeightChanged += HeightChanged;
                this.Add(comp);
            }

            IsNULLHeight = !IsComment && Sizable.Height.Value != null && (float)Sizable.Height == 0;
            return this;
        }
        /// <summary>
        /// načtení informací z již existující buňky
        /// </summary>
        /// <param name="line">řádek buňky</param>
        /// <param name="cell">vzorová buňka</param>
        /// <param name="insertSett">TRUE - brat v úvahu nastavení (ReportDesignerProperties.Instance.GrrAutoInsert)</param>
        /// <param name="component">Vkládaný obsah</param>
        /// <returns>Buňka, s clonem-obsahem vzorové buňky</returns>
        public GrrCell LoadInformation(ILine line, ICell cell, bool insertSett = false, ITagComponent component = null)
        {
            Line = line;
            if (cell != null)
            {
                dynamic cmp = null;
                if (!insertSett
                    || ReportDesignerProperties.Instance.GrrAutoInsertCellContent)
                {
                    foreach (var item in cell as URAbstractContainer)
                        if (component != null)
                        {
                            if (component is AbstractContent)
                                (component as AbstractContent).HeightChanged += HeightChanged;
                            Add(component);
                        }
                        else if (item is ICloneable)
                        {
                            cmp = (item as ICloneable).Clone() as ITagComponent;
                            Add(cmp);
                        }
                }
                else if (insertSett)
                {
                    if (component != null)
                    {
                        if (component is AbstractContent)
                            (component as AbstractContent).HeightChanged += HeightChanged;
                        Add(component);
                    }
                    else
                    {
                        cmp = new GrrContentText();
                        cmp.Load(cell.Line.Page, this);
                        this.Add(cmp);
                    }
                }

                this.IsHeightByContent = cell.IsHeightByContent;
                this.IsWidthByContent = cell.IsWidthByContent;
                this.Width = new SizeValue(cell.Width);
                this.Height = new SizeValue(cell.Height, "mm");
                this.Top = new SizeValue(cell.Top, "mm");
                if (cmp is AbstractContent)
                    (cmp as AbstractContent).HeightChanged += HeightChanged;
            }

            return this;
        }

        /// <summary>
        /// Vrací vnitřní xml strukturu buňky, v elementu CELL
        /// </summary>
        /// <param name="xmlDoc">Dokument do kterého se vytváří obsah</param>
        /// <param name="namespaceUri">Namespace dokumentu</param>
        /// <param name="styles">seznam předchozích stylů</param>
        /// <returns>Větev buňky</returns>
        internal System.Xml.XmlElement GetData(XmlDocumentPosition xmlDoc, string namespaceUri, List<GFEList> styles)
        {
            System.Xml.XmlElement xmlCell = xmlDoc.CreateElement("CELL", namespaceUri);

            //pokud jsou v buňce nějaké komponenty, pak je uložíme  
            //Pokud položka je komentář 
            //if (this[0] is GrrContentComment)
            //    xmlCell.AppendChild(xmlDoc.CreateComment((this[0] as GrrContentComment).CommentText));
            //else if (FormatUnknown != null)
            //    xmlCell.AppendChild(GetUnknown(xmlDoc, FormatUnknown));
            //else
            {
                XmlElement xmlElement = this.First().GetXmlData(xmlDoc, styles);
                //pokud větev style, neobsahuje žádné atributy, pak je zbytečná 
                if (xmlElement.Name == "style" && xmlElement.Attributes.Count == 0)
                    foreach (XmlNode subItem in xmlElement.ChildNodes)
                        xmlCell.AppendChild(subItem);
                else xmlCell.AppendChild(xmlElement);
            }

            return xmlCell;
        }

        string LoadSize(GFEUnit? unit)
        {
            if (unit != null && unit.HasValue)
                switch (unit.Value.mtr)
                {
                    case Grr06Metrics.Percent:
                        return unit.Value.met + "%";
                    case Grr06Metrics.MMeters:
                        return unit.Value.met + "mm";
                    case Grr06Metrics.Points:
                        return unit.Value.met + "pt";
                    case Grr06Metrics.Twip:
                        return unit.Value.met + "tw";
                    default:
                        return string.Empty;
                }

            return string.Empty;
        }

        /// <summary>
        /// indikuje, že obsah buňky bude nahrazen
        /// </summary>
        bool ReplaceCellContent
        {
            get
            {
                if (ReportDesignerProperties.Instance.GrrAutoReplaceEmptyCellContent)
                    return true;

                QuestionWithDefaultDialog slf = new QuestionWithDefaultDialog();
                slf.AddControl(new QPReplaceEmptyCellContent());
                return slf.ShowDialog(SimpleDesktop.MainForm) == DialogResult.OK;
            }
        }
        /// <summary>
        /// indikuje, že obsah řádku bude pojat, 
        /// jako obsah vkládaného regionu
        /// </summary>
        bool ReplaceLineContent
        {
            get
            {
                if (ReportDesignerProperties.Instance.GrrAutoIncludeLineContent)
                    return true;

                QuestionWithDefaultDialog slf = new QuestionWithDefaultDialog();
                slf.AddControl(new QPIncludeLineContent());
                return slf.ShowDialog(SimpleDesktop.MainForm) == DialogResult.OK;
            }
        }

        void List_Changed(object sender, EventArgs e)
        {
            Sizable = this.FirstOrDefault(ct => ct is ISizable);
        }
    }
}
