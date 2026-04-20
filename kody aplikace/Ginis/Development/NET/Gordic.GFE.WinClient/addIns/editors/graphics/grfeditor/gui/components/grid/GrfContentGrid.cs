//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrfContentGrid.cs                      </Name>
//    <Description> objekt, umožňující editací mřižky                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-18                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Linq;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Editor;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.TextEditor.Document;
using Gordic.General;
using Gordic.GFE.WinClient.Labels;
using System.Collections;
using System.Xml.Linq;

namespace Gordic.GFE.WinClient.GrfEditor
{
    /// <summary>
    /// Vlastní comparer pro třídu řádku mřížky
    /// </summary>
    class LineCloneComparer : IEqualityComparer<ILine>
    {
        /// <summary>
        /// řádky budou rovní, pokud jsou ze stejného regionu
        /// </summary>
        /// <param name="x"></param>
        /// <param name="y"></param>
        /// <returns></returns>
        public bool Equals(ILine x, ILine y)
        {
            // zkontrolujeme, jestli neporovnávámé náhodou objekty, odkazující na stejné data
            if (ReferenceEquals(x, y)) return true;

            // zkontrolujte, zda některý z porovnávaných objektů je null.
            if (x is null || y is null)
                return false;

            // kontrolujte, zda řádky jsou ze stejného regionu
            return x.ParentLabel == y.ParentLabel && x.ParentLabel != null && y.ParentLabel != null;
        }

        /// <summary>
        /// Pokud Equals () vrací hodnotu true pro dvojici objektů,
        /// pak GetHashCode () musí vrátit stejnou hodnotu těchto objektů
        /// </summary>
        /// <param name="line"></param>
        /// <returns></returns>
        public int GetHashCode(ILine line)
        {
            // zkontrolujte, zda některý z porovnávaných objektů je null
            if (line is null) return 0;

            int hashLine = line.ParentLabel == null ? 0 : line.ParentLabel.GetHashCode();
            return hashLine;
        }
    }

    /// <summary>
    /// objekt, umožňující editací mřižky
    /// </summary>
    class GrfContentGrid : AbstractContent, ITowedHandler, IDesignSearchHandler, ILabledObject, IItemContainer
    {
        #region AbstractContent
        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            // výchozí načtení
            base.LoadInformation();

            if (AttrList.ContainsKey("alt-color"))
                AltColor = new URComplexColor().Initialize(AttrList["alt-color"]);

            if (AttrList.ContainsKey("head-color"))
                HeadColor = new URComplexColor().Initialize(AttrList["head-color"]);

            GFEAttrList attrs = new GFEAttrList();
            if (FormatTag is GFEFormatContent)
                TagService.LoadAttributes(attrs, (FormatTag as GFEFormatContent).Style.Attributes, null);

            if (FormatTag != null && FormatTag.Children != null)
            {
                TagService.LoadAttributes(attrs, FormatTag.Attributes, null);
                LoadRegions();
            }

            OnTopChanged(true);
        }

        /// <summary>
        /// Kreslení objektu
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="args">args</param>
        public override void OnPaint(Graphics graphics, PaintArgs args)
        {
            // pokud nejsme v obsahové zóně objektu
            // pak není co řešit
            if (!graphics.VisibleClipBounds.IntersectsWith(BoundsInPixels))
                return;

            Region reg = graphics.Clip;

            // v případě, že objekt obsahuje skripta
            // pak vykreslíme červený trojúhelník
            if (!Scripts.IsEmpty)
                TagService.DrawTagTriangle(graphics, new PointF(LeftZoom, TopZoom));

            // vybarvíme pozadí
            DrawClear(graphics);

            // kreslíme obsah regionů
            (labelZ as IPaintable).OnPaint(graphics, args);

            // kreslíme řazení
            List<int> order = Order;
            if (GraphicSettingService.ShowOrder && order.Count > 0)
                // do pravého horního rohu
                TagService.DrawTagOrder(graphics, new PointF(LeftZoom, TopZoom), Order.Last().ToString(), Zoom);

            if (Page != null)
                Page.DelayPaintList.Add(new DelayPaintItem(this, IsSelected, reg));
        }
        /// <summary>
        /// Metoda vracení XML struktury samotného elementu (bez STYLE)
        /// </summary>
        /// <param name="xmlDoc">Dokument, do kterého se struktura vkládá</param>
        /// <param name="withRect"></param>
        /// <param name="namespaceUri">jmenný prostor <paramref name="xmlDoc"/></param>
        /// <param name="styles">seznam již dostupných stylů</param>
        /// <param name="regionFullName">Úplný název aktuálního regionu</param>
        /// <returns>Element popisující samotný objekt bez stylů</returns>
        public override XmlLinkedNode GetDataComponent(XmlDocumentPosition xmlDoc, bool withRect = true, string namespaceUri = null, List<GFEList> styles = null, string regionFullName = null)
        {
            ownerDoc = xmlDoc;
            currentElement = xmlDoc.CreateElement(Convert.ToString(ComponentType), string.IsNullOrEmpty(namespaceUri) ? ReportDesignerProperties.Instance.AlfReportXmlns : namespaceUri);

            // uložení informaci o rámečku pro daný objekt
            if (string.IsNullOrEmpty(this.Height.Metrics))
                Height = new SizeValue(Height) { Metrics = "mm" };
            if (string.IsNullOrEmpty(this.Width.Metrics))
                Width = new SizeValue(Width) { Metrics = "mm" };

            if (withRect)
            {
                string value = TagService.GetRect(this);
                if (!string.IsNullOrEmpty(value))
                    currentElement.SetAttribute("rect", value);
            }

            if (Page.Order != 1)
                //Uložení informaci o stránce, na které se nachází daný objekt
                currentElement.SetAttribute("page", Convert.ToString(Page.Order));

            if (AltColor != null && AltColor.Color != Color.Transparent)
                currentElement.SetAttribute("alt-color", AltColor.Name);

            if (HeadColor != null && HeadColor.Color != Color.Transparent)
                currentElement.SetAttribute("head-color", HeadColor.Name);

            //uložení skriptů
            XmlDocumentService.SetListOfDictionaryItems(currentElement, Scripts, styles);
            // uložíme neznámé značky
            XmlDocumentService.SetListOfDictionaryItems(currentElement, Unknowns, styles);
            // generujeme obsah vnitřních objektů
            if (labelZ != null)
                labelZ.SetAlfData(currentElement, styles);
            return currentElement;
        }
        #endregion

        #region ITowedHandler
        /// <summary>
        /// získání objektu pod kurzorem
        /// </summary>
        /// <param name="point">pozice kurzoru vůči stránce</param>
        /// <returns>Objekt, který se nachází bezprostředně pod kurzorem</returns>
        public object GetTowedObject(PointF point)
        {
            if (TowedService.TowedObject is AbstractLabel)
            {
                if ((TowedService.TowedObject as AbstractLabel).BoundsInPixels.Contains(point))
                    return TowedService.TowedObject;
            }
            else if (TowedService.TowedObject is ITagComponent)
                if ((TowedService.TowedObject as ITagComponent).BoundsInPixels.Contains(GetContentBegin(point.X, point.Y)))
                    return TowedService.TowedObject;

            if (BoundsInPixels.Contains(point))
            {
                object result = labelZ.GetTowedObject(GetContentBegin(point.X, point.Y), true);
                return result ?? (this);
            }
            else
                return null;
        }
        /// <summary>
        /// získání začátku obsahu stránky
        /// </summary>
        /// <param name="x">X - dle panelu</param>
        /// <param name="y">Y - dle panelu</param>
        /// <returns>Levý horní roh stránky</returns>
        Point GetContentBegin(float x, float y)
        {
            return new Point((int)x, (int)y);
        }

        /// <summary>
        /// pozice objektu <paramref name="item"/> v seznamu
        /// </summary>
        /// <param name="item">objekt, pozice kterého se hledá</param>
        /// <returns>číslo, prezentující pozici objektu <paramref name="item"/> v seznamu daného objektu.</returns>
        public int IndexOf(object item) { return -1; }
        #endregion

        #region IDesignSearchHandler
        /// <summary>
        /// Získání objektu, co se nachází ve výběru
        /// </summary>
        /// <param name="selection">Informace o výběru, dle které určíme, na řádky výběru</param>
        /// <returns>Seznam objektů, které se nachází ve výbrané části.</returns>
        public List<IComponent> SearchComponentText(ISelection selection)
        {
            List<IComponent> result = new List<IComponent>();
            foreach (var item in (LabelZone as IList))
                result.AddRange((item as IDesignSearchHandler).SearchComponentText(selection));
            return result.Distinct().ToList();
        }
        /// <summary>
        /// hledání všech objektů dle pozice <paramref name="location"/>
        /// pod kurzorem
        /// </summary>
        /// <param name="location">Umístění kurzóru</param>
        /// <returns>Buď objekt samotný nebo seznam vnořených objektů</returns>
        public virtual List<IComponent> SearchComponent(Point location) { return null; }
        #endregion

        #region ILabledObject
        GrrLabelZone labelZ;
        /// <summary>
        /// štítková zóna stránky
        /// </summary>
        [Browsable(false)]
        public IComponent LabelZone
        {
            get { return labelZ; }
            set
            {
                RemoveZoneFromPage();
                labelZ = value as GrrLabelZone;
                ThreadService.SafeThreadAsyncCall(AddZoneToPage);
            }
        }

        /// <summary>
        /// seznam zpožděného kreslení ohraničení
        /// </summary>
        [Browsable(false)]
        public List<DelayPaintItem> DelayPaintList { get { return Page?.DelayPaintList; } }

        /// <summary>
        /// změna nastavení služby
        /// </summary>
        /// <param name="sender">objekt, který spustil událost</param>
        /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
        public void SettingServiceChanged(object sender, EventArgs e) { }

        /// <summary>
        /// Změna pozice zleva objektu
        /// </summary>
        /// <param name="value">Nová pozice zleva</param>
        public void ChangeLeft(float value = -1f) { }
        /// <summary>
        /// nastavení TOP pozice objektů
        /// </summary>
        /// <param name="value">nová pozice</param>
        public void ChangeTop(float value) { }
        /// <summary>
        /// nastavení šířky objektů
        /// </summary>
        /// <param name="value">nová šířka</param>
        public void ChangeWidth(float value) { }

        /// <summary>
        /// pozice LEFT obsahu
        /// </summary>
        [Browsable(false)]
        public float ContentLeft { get { return this.Left + (Page != null ? Page.MarginLeft : 0); } }
        /// <summary>
        /// šířka obsahu
        /// </summary>
        [Browsable(false)]
        public float ContentWidth { get { return this.Width; } }
        /// <summary>
        /// Změna výšky vybraných objektů
        /// </summary>
        public void SetHeight() { }
        [Category("Odsazení")]
        [Description("Odsazení vnitřního obsahu od dolního okraju mřížky")]
        [DisplayName("zdola")]
        [Browsable(false)]
        public SizeValue MarginBottom { get { return 0; } set { } }
        [Category("Odsazení")]
        [Description("Odsazení vnitřního obsahu od levého okraju mřížky")]
        [DisplayName("zleva")]
        [Browsable(false)]
        public SizeValue MarginLeft { get { return 0; } set { MarginLeftChanged?.Invoke(this, EventArgs.Empty); } }

        [Category("Odsazení")]
        [Description("Odsazení vnitřního obsahu od pravého okraju mřížky")]
        [DisplayName("zprava")]
        [Browsable(false)]
        public SizeValue MarginRight { get { return 0; } set { MarginRightChanged?.Invoke(this, EventArgs.Empty); } }
        [Category("Odsazení")]
        [Description("Odsazení vnitřního obsahu od horního okraju mřížky")]
        [DisplayName("shora")]
        [Browsable(false)]
        public SizeValue MarginTop { get { return 0; } set { MarginTopChanged?.Invoke(this, EventArgs.Empty); } }
        /// <summary>
        /// volá se po změně odsazení zleva mřížky
        /// </summary>
        public event EventHandler MarginLeftChanged;
        /// <summary>
        /// volá se po změně odsazení zprava mřížky
        /// </summary>
        public event EventHandler MarginRightChanged;
        /// <summary>
        /// volá se po změně odsazení shora mřížky
        /// </summary>
        public event EventHandler MarginTopChanged;
        #endregion

        #region IItemContainer
        /// <summary>
        /// Přidání položky bočního panelu
        /// </summary>
        /// <param name="info">Přidávaná položka</param>
        /// <param name="e">data o myší</param>
        /// <param name="type">Typ vkládané komponenty</param>
        /// <param name="format">Formát sestavy</param>
        public IComponent CreateItem(dynamic info, System.Windows.Forms.MouseEventArgs e, ComponentType type, GFEFormat format = null)
        {
            // v mřížce lze vytvářet pouze regiony
            // pak v regionech řádky a v řádcích buňky s obsahem
            if (type != ComponentType.region)
                return (Page as IItemContainer).CreateItem(info, e, type, format);

            if (LabelZone is GrrLabelZone lz)
            {
                if (lz.Count == 0)
                    LoadRegions();

                if (lz.Count != 0)
                {
                    var reg = lz.First();
                    if (reg != null)
                    {
                        string[] nm = info.FullName.Split('.');
                        List<string> names = nm.ToList();
                        names.RemoveAt(0);
                        GrrRegion newReg = names.Count == 0 ? reg as GrrRegion : CreateRegStructure(reg, names);
                        if (newReg != null)
                        {
                            (LabelZone as GrrLabelZone).LabelZoneListChanged(this, EventArgs.Empty);
                            return (newReg.Body.First() as ILine).First().Sizable as IComponent;
                        }
                    }
                }
            }
            MessageService.ShowError(GResources.GetResourceText(29450038)); //RC 29450038 : Objekt nelze vložit - nedostatek informace!
            if (UndoRedoService.IsTransactionStarted)
                UndoRedoService.FlushHistory();
            return null;
        }
        GrrRegion CreateRegStructure(IGRRLabel root, List<string> names)
        {
            GrrRegion newReg = new GrrRegion(this)
            {
                DataFullName = string.Join(".", new string[] { root.DataFullName, names.First() })
            };
            root.Body.InsertAfter(newReg, root.Body.Last(), true);

            // jdeme hloubějí
            names.RemoveAt(0);
            if (names.Count != 0)
                return CreateRegStructure(newReg, names);

            return newReg;
        }

        /// <summary>
        /// Metoda Pře indexace vnořených objektů 
        /// </summary>
        public virtual void Reindex() { }
        #endregion

        UndoRedo<IComplexColor> altColor;
        /// <summary>
        /// barva každého druhého řádku
        /// </summary>
        [Category("Mřížka")]
        [DisplayName("sekundární barva")]
        [Description("Barva pozadí sudého řádku mřížky")]
        [TypeConverter(typeof(ComplexColorConverter))]
        public IComplexColor AltColor { get { return altColor.Value; } set { altColor.Value = value; } }

        UndoRedo<IComplexColor> headColor;
        /// <summary>
        /// barva každého druhého řádku
        /// </summary>
        [Category("Mřížka")]
        [DisplayName("barva hlavičky")]
        [Description("Barva pozadí hlavičky mřížky")]
        [TypeConverter(typeof(ComplexColorConverter))]
        public IComplexColor HeadColor { get { return headColor.Value; } set { headColor.Value = value; } }

        List<string> knownTags;
        /// <summary>
        /// Známě značky datové položky
        /// </summary>
        public override List<string> KnownTags
        {
            get
            {
                if (knownTags == null)
                    knownTags = AddInTree.BuildItem("/ReportDesigner/GrfList/GridOfTags", null) as List<string>;
                return knownTags;
            }
        }

        XmlElement currentElement;
        XmlDocumentPosition ownerDoc;

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="item">Informace o formátu objektu.</param>
        /// <param name="page"></param>
        /// <param name="left"></param>
        /// <param name="top"></param>
        /// <param name="width"></param>
        /// <param name="height"></param>
        public void Initialize(GFEFormatTag item
            , IPage page = null
            , dynamic left = null
            , dynamic top = null
            , dynamic width = null
            , dynamic height = null)
        {
            base.Initialize(item);
            if (page != null)
                this.Page = page;
            if (left != null)
                Left = new SizeValue(left);
            if (top != null)
                Top = new SizeValue(top);
            if (width != null)
                Width = new SizeValue(width);
            if (height != null)
                Height = new SizeValue(height);
        }

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="node">Položka bočního panelu s informaci o vkládaném objektu</param>
        /// <param name="page"></param>
        /// <param name="left"></param>
        /// <param name="top"></param>
        /// <param name="width"></param>
        /// <param name="height"></param>
        public void Initialize(SideTabItem node
            , IPage page = null
            , dynamic left = null
            , dynamic top = null
            , dynamic width = null
            , dynamic height = null)
        {
            base.Initialize(node);
            if (page != null)
                Page = page;
            if (left != null)
                Left = new SizeValue(left);
            if (top != null)
                Top = new SizeValue(top);
            if (width != null)
                Width = new SizeValue(width);
            if (height != null)
                Height = new SizeValue(height);

            LoadRegions();
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public override AbstractContent Initialize()
        {
            base.Initialize();
            ComponentType = ComponentType.grid;
            headColor = new UndoRedo<IComplexColor>();
            altColor = new UndoRedo<IComplexColor>();
            SetMethods();
            LabelZone = new GrrLabelZone(this);
            Disposed += GridDisposed;
            return this;
        }

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="clone">objekt ke kopírování</param>
        public override void Initialize(object clone)
        {
            base.Initialize(clone);
            if (clone is GrfContentGrid cG)
            {
                if (cG.AltColor != null)
                    AltColor = new URComplexColor().Initialize(cG.AltColor);

                if (cG.HeadColor != null)
                    HeadColor = new URComplexColor().Initialize(cG.HeadColor);
                labelZ = new GrrLabelZone(cG.LabelZone, this);
            }

            LoadRegions();
        }

        void SetMethods()
        {
            this.TopChanged += delegate { OnTopChanged(); };
            this.LeftChanged += OnLeftChanged;
        }
        void OnListChanged(object sender, EventArgs e)
        {
            if (!isLoading)
                OnTopChanged();
        }
        void OnLeftChanged(object sender, EventArgs e)
        {
            if (!isLoading)
                ActLeft(this, EventArgs.Empty);
            //ThreadService.SafeThreadAsyncCall(actLeft);
        }
        void OnTopChanged(bool force = false)
        {
            if (!isLoading || force)
                ActTop(this, EventArgs.Empty);
            //ThreadService.SafeThreadAsyncCall(actTop);
        }
        void GridDisposed(object sender, EventArgs e)
        {
            Disposed -= GridDisposed;
            RemoveZoneFromPage();
            LabelZone.Dispose();
        }
        void RemoveZoneFromPage()
        {
            var _page = Page as GrfPage;

            if (labelZ != null && _page != null)
            {
                _page.MarginLeftChanged -= OnLeftChanged;
                _page.MarginTopChanged -= OnListChanged;
                if (_page._Zones.Contains(labelZ))
                    _page._Zones.Remove(labelZ);
            }
        }
        void AddZoneToPage()
        {
            if (Page is GrfPage _page)
            {
                if (!_page._Zones.Contains(labelZ))
                    _page._Zones.Add(labelZ);

                _page.MarginLeftChanged += OnLeftChanged;
                _page.MarginTopChanged += OnListChanged;
            }
        }
        /// <summary>
        /// Načtení hlavního regionu
        /// </summary>
        IGRRLabel LoadRegions()
        {
            labelZ.ActualizeLeft += ActLeft;
            labelZ.ActualizeTop += ActTop;
            //vytvoříme hlavní region
            var result = FormatTag != null ? new GrrRegion(FormatTag) : new GrrRegion(this);

            if (FormatTag != null)
                result.Initialize(this);
            else
            {
                result.LoadInformation(null, null);
                if (StructureView.StructureViewPad.Instance.ActiveItem != null)
                    result.DataFullName = StructureView.StructureViewPad.Instance.ActiveItem.GetStructureRootRegionName();
                result.IsRootElement = true;
            }
            labelZ.Initialize(result);

            return result;
        }
        void ActTop(object sender, EventArgs e)
        {
            if (labelZ != null)
            {
                labelZ.Top = Top + (Page != null ? Page.MarginTop : 0);
                // aktualizujeme pozici TOP
                labelZ.SetTop();
            }
        }
        void ActLeft(object sender, EventArgs e)
        {
            if (labelZ != null)
            {
                labelZ.Left = ContentLeft - labelZ.Width;
                // nastavíme pozice zleva
                labelZ.SetLeft();
                labelZ.OnLeftValueChanged(sender, e);
            }
        }
    }
}
