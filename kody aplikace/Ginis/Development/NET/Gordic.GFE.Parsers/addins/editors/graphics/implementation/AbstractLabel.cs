//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrrLabel.cs                            </Name>
//    <Description> štítek GRR sestavy                                          </Description>
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
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.Parsers.Core.Services;

namespace Gordic.GFE.Parsers.Editor
{
    /// <summary>
    /// štítek GRR sestavy
    /// </summary>
    abstract public class AbstractLabel : IGRRLabel
    {
        #region ITagComponent
        /// <summary>
        /// indikuje možnost manipulace s objektem
        /// </summary>
        public bool ReadOnly => false;
        GFEFormatTag formatTag;
        /// <summary>
        /// region parseru
        /// </summary>
        [Browsable(false)]
        public GFEFormatTag FormatTag { get { return formatTag; } set { formatTag = value; } }
        /// <summary>
        /// Stránka objektu
        /// </summary>
        [Browsable(false)]
        public IPage Page
        {
            get { return LabledObject?.Page; }
            set { }
        }

        RectangleF contentBounds = RectangleF.Empty;
        /// <summary>
        /// Oblast obsahu - je to BoundsInPixels bez odsazení
        /// </summary>
        [Browsable(false)]
        public RectangleF ContentBounds { get { return contentBounds; } }
        /// <summary>
        /// Get/Set odsazení rámečku
        /// </summary>
        [Browsable(false)]
        public IComplexFive Spacing { get; set; }
        /// <summary>
        /// Get/Set odsazení textu
        /// </summary>
        [Browsable(false)]
        public IComplexFive Padding { get; set; }
        /// <summary>
        /// Rameček (detail)
        /// </summary>
        [Browsable(false)]
        public IComplexSurround Surround { get; set; }
        /// <summary>
        /// Načtení informaci o objektu z formátu objektu
        /// </summary>
        public virtual void LoadInformation()
        {
            IUndoRedoManager manager = UndoRedoService.Manager;
            Head = new LineList(this, manager);
            Foot = new LineList(this, manager);
            Body = new BodyList(this, manager);
            AttrList = new GFEAttrList(manager);
            Scripts = new GFEScriptList(manager);
            if (FormatTag != null)
            {
                StartPosition = FormatTag.LinePosition - 1;
                AttrList.AddRange(FormatTag.Attributes);
            }

            SetScripts();
        }

        /// <summary>
        /// Nastavení skriptů
        /// </summary>
        void SetScripts()
        {
            Dictionary<string, string> scripts = AttrList != null
            ? AttrList.FindAllByKey(key =>
                key.StartsWith("on", StringComparison.InvariantCulture)
                && key.Length > 2
                && char.IsUpper(key[2]))
            : new Dictionary<string, string>();
            Scripts.AddRange(scripts);
        }

        /// <summary>
        /// Typ vybraného objektu
        /// </summary>
        [DisplayName("typ")]
        [Description("Typ obsahu položky")]
        [ReadOnly(true)]
        public ComponentType ComponentType { get { return this is IGroup ? ComponentType.group : ComponentType.region; } }

        /// <summary>
        /// Metoda vracení XML struktury samotného elementu (bez STYLE)
        /// </summary>
        /// <param name="xmlDoc">Dokument, do kterého se struktura vkládá</param>
        /// <param name="xmlStyles">Seznamm nadřazených stylů</param>
        /// <param name="withRect"></param>
        /// <param name="regionFullName">Úplný název aktuálního regionu</param>
        /// <returns>Element prezentující daný objekt</returns>
        public System.Xml.XmlElement GetXmlData(XmlDocumentPosition xmlDoc, List<GFEList> xmlStyles, bool withRect = true, string regionFullName = null)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// Pozice objektu v seznamu vlastníka
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
        /// <summary>
        /// Aktualizace položky
        /// </summary>
        public virtual void RefreshByStructure()
        {
            ThreadService.SafeThreadAsyncCall(delegate { _RefreshByStructure(Head); });
            ThreadService.SafeThreadAsyncCall(delegate { _RefreshByStructure(Body); });
            ThreadService.SafeThreadAsyncCall(delegate { _RefreshByStructure(Foot); });
        }

        /// <summary>
        /// aktualizace objektu kontaineru
        /// </summary>
        /// <param name="list">kontainer objektů</param>
        /// <typeparam name="T">typ objektů kontaineru</typeparam>
        protected void _RefreshByStructure<T>(IList<T> list)
        {
            foreach (var item in list)
                if (item is IItemContainer)
                    (item as IItemContainer).RefreshByStructure();
                else if (item is ITagComponent)
                    (item as ITagComponent).RefreshByStructure();
                else if (item is ILine)
                    (item as ILine).RefreshByStructure();
        }
        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="lblObject">vázaný objekt</param>
        /// <returns>inicializovaný objekt</returns>
        public IGRRLabel Initialize(ILabledObject lblObject)
        {
            LabledObject = lblObject;
            LoadInformation();
            return this;
        }
        /// <summary>
        /// uložení obsahu řádku do <paramref name="xmlElement"/>
        /// </summary>
        /// <param name="xmlElement">daný XML element, do kterého se vkládá obsah</param>
        /// <param name="xmlDoc">výsledný dokument</param>
        /// <param name="styles">seznam již dostupných stylů</param>
        /// <param name="withRect">seznam již dostupných stylů</param>
        abstract public void SetXmlData(System.Xml.XmlElement xmlElement, XmlDocumentPosition xmlDoc, List<GFEList> styles, bool withRect = true);
        #endregion

        #region ISizable
        readonly UndoRedo<SizeValue> width = new UndoRedo<SizeValue>();
        /// <summary>
        /// šířka samotného štítku (ne šířka řádku)
        /// </summary>
        [Browsable(false)]
        public Utils.SizeValue Width { get { return width.Value; } set { width.Value = value; } }

        readonly UndoRedo<SizeValue> height = new UndoRedo<SizeValue>();
        /// <summary>
        /// výška samotného štítku (ne všech řádků dohromady)
        /// </summary>
        [Browsable(false)]
        public Utils.SizeValue Height { get { return height.Value; } set { height.Value = value; } }

        readonly UndoRedo<SizeValue> left = new UndoRedo<SizeValue>();
        /// <summary>
        /// pozice zleva štítku (ne pozice zleva prvního řádku)
        /// </summary>
        [Browsable(false)]
        public Utils.SizeValue Left { get { return left.Value; } set { left.Value = value; } }

        readonly UndoRedo<SizeValue> top = new UndoRedo<SizeValue>();
        /// <summary>
        /// pozice shora štítku (dá se řící, že je to zárověň pozice prvního řádku)
        /// </summary>
        [Browsable(false)]
        public Utils.SizeValue Top { get { return top.Value; } set { top.Value = value; } }
        /// <summary>
        /// indikuje změnu výšky
        /// </summary>
        [Browsable(false)]
        public virtual bool IsHeightChanged { get { return false; } }

        readonly UndoRedo<int> proporder = new UndoRedo<int>();
        /// <summary>
        /// Pozicování objektu
        /// </summary>
        [Browsable(false)]
        public virtual int PropertyOrder { get { return proporder.Value; } set { proporder.Value = value; } }

        #endregion

        #region IZoomSizable
        /// <summary>
        /// veličina zvětšení
        /// </summary>
        [Browsable(false)]
        public virtual float Zoom { get { return GraphicSettingService.Zoom; } }

        /// <summary>
        /// šířka - včetně ZOOM hodnoty
        /// </summary>
        [Browsable(false)]
        public float WidthZoom { get { return Width * Zoom; } }
        /// <summary>
        /// výška - včetně ZOOM
        /// </summary>
        [Browsable(false)]
        public float HeightZoom { get { return Height * Zoom; } }
        /// <summary>
        /// Pozice zleva objektu - včetně ZOOM hodnoty
        /// </summary>
        [Browsable(false)]
        public float LeftZoom { get { return Left * Zoom + Page.GraphDiffLeft; } }
        /// <summary>
        /// Pozice shora objektu - včetně ZOOM hodnoty
        /// </summary>
        [Browsable(false)]
        public float TopZoom { get { return Top * Zoom + (LabledObject is IPage ? SettingService.FirstPageTop : Page.GraphDiffTop); } }
        /// <summary>
        /// Velikost objektu v pixelech - se Zoom faktorem
        /// </summary>
        [Browsable(false)]
        public System.Drawing.RectangleF BoundsInPixels { get { return new RectangleF(new PointF(LeftZoom, TopZoom), new SizeF(WidthZoom, HeightZoom)); } }
        #endregion

        #region IComponent
        /// <exclude/>
        public event EventHandler Disposed;
        /// <exclude/>
        [Browsable(false)]
        public ISite Site { get; set; }
        #endregion

        #region IDisposable
        /// <summary>
        /// uvolnění objektu
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikátor uvolnění</param>
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
                Disposed?.Invoke(this, EventArgs.Empty);
        }
        /// <summary>
        /// finalizer objektu
        /// </summary>
        ~AbstractLabel() { Dispose(false); }
        #endregion

        #region IAttributeHandler
        /// <summary>
        /// Neznámé značky buňky
        /// </summary>
        [Browsable(false)]
        public Dictionary<string, string> Unknowns
        {
            get => AttrList != null ? AttrList.FindAllByKey(attr => !KnownTags.Contains(attr) && !Scripts.ContainsKey(attr)) : new Dictionary<string, string>();
        }
        readonly UndoRedo<GFEAttrList> attrlist = new UndoRedo<GFEAttrList>();
        /// <summary>
        /// Všechny atributy objektu
        /// </summary>
        [DisplayName("atributy")]
        [Description("Všechny atributy objektu")]
        [EditorAttribute(typeof(AttributeListEditor), typeof(UITypeEditor))]
        public GFEAttrList AttrList { get => attrlist.Value; set => attrlist.Value = value; }
        #endregion

        #region IScriptHandler
        readonly UndoRedo<GFEScriptList> scripts = new UndoRedo<GFEScriptList>();
        /// <summary>
        /// Dostupné skripty objektu
        /// </summary>
        [DisplayName("skripty")]
        [Description("Dostupné skripty objektu")]
        [EditorAttribute(typeof(ScriptListEditor), typeof(UITypeEditor))]
        [Browsable(false)]
        public GFEScriptList Scripts { get { return scripts.Value; } set { scripts.Value = value; } }
        #endregion

        #region IPaintable
        /// <summary>
        /// metoda kreslí pouze vnitřek (řádky) štítku.
        /// samotný štítek se kreslí v přetížení s odkazem na obsah
        /// </summary>
        abstract public void OnPaint(System.Drawing.Graphics graphics, PaintArgs args);

        /// <summary>
        /// Kreslení ramečku objektu
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="isSelected">indikátor vybranosti objektu</param>
        public virtual void OnPaintBorder(System.Drawing.Graphics graphics, bool isSelected) { }
        #endregion

        #region IParentable

        readonly UndoRedo<ISizable> parent = new UndoRedo<ISizable>();
        /// <summary>
        /// Vlastník objektu implementujícího toto rozhraní
        /// </summary>
        [Browsable(false)]
        public ISizable Parent { get { return parent.Value; } set { parent.Value = value; OnParentChanged(); } }

        /// <summary>
        /// metoda, která se volá po změně vlastníka
        /// </summary>
        protected event EventHandler ParentChanged;
        void OnParentChanged()
        {
            ParentChanged?.Invoke(this, EventArgs.Empty);
        }
        #endregion

        #region ILabel
        readonly UndoRedo<ILabledObject> labledObject = new UndoRedo<ILabledObject>();
        /// <summary>
        /// vázaný objekt s obsahem
        /// </summary>
        [Browsable(false)]
        public ILabledObject LabledObject { get { return labledObject.Value; } set { labledObject.Value = value; } }

        readonly bool isActive = false;
        /// <summary>
        /// Indikuje, že štítek je aktivní
        /// </summary>
        [Browsable(false)]
        public virtual bool IsActive { get { return isActive; } }

        /// <summary>
        /// Interaktivita objektu
        /// </summary>
        [Browsable(false)]
        public virtual IInteractive Interactive { get; protected set; }

        /// <summary>
        /// nadřazený štítek
        /// </summary>
        [Browsable(false)]
        public virtual ILabel ParentLabel { get { return Parent as AbstractLabel; } }

        /// <summary>
        /// seznam řádku záhlavi
        /// </summary>
        [Browsable(false)]
        public LineList Head { get; protected set; }
        /// <summary>
        /// seznam řádku zapati
        /// </summary>
        [Browsable(false)]
        public LineList Foot { get; protected set; }

        /// <summary>
        /// seznam objektů těla
        /// </summary>
        [Browsable(false)]
        public virtual BodyList Body { get; protected set; }

        readonly UndoRedo<float> labelZoneSize = new UndoRedo<float>();
        /// <summary>
        /// Šířka štítkové zóny
        /// </summary>
        [Browsable(false)]
        public float LabelZoneSize { get { return labelZoneSize.Value; } set { labelZoneSize.Value = value; } }
        /// <summary>
        /// Šířka štítkové zóny
        /// </summary>
        [Browsable(false)]
        public float LabelZoneSizeZoom { get { return LabelZoneSize * GraphicSettingService.Zoom; } }

        /// <summary>
        /// objekt pro bezpečný přístup k objektům
        /// </summary>
        protected readonly object syncRoot = new object();
        /// <summary>
        /// aktualizace šířky štítkové zóny
        /// </summary>
        abstract public void UpdateLabelZoneSize();
        /// <summary>
        /// kreslení samotného štítku
        /// </summary>
        /// <param name="graphics">ovladač grafiky</param>
        public virtual void PaintLabel(Graphics graphics)
        {
            var transform = graphics.Transform;

            //pokud objekt je vybrán, pak ohraničení nakreslíme až poslední
            OnPaintBorder(graphics, false);

            graphics.ResetTransform();
            graphics.Transform = transform;
        }

        /// <summary>
        /// Indikuje dostupnost operace posun objektu o jeden nahoru
        /// </summary>
        abstract public bool EnableShiftUp { get; }
        /// <summary>
        /// Indikuje dostupnost operace posun objektu o jeden dolu
        /// </summary>
        abstract public bool EnableShiftDown { get; }
        /// <summary>
        /// Indikuje dostupnost operace vložení řádku PŘED aktuální objekt
        /// </summary>
        abstract public bool EnableLineBefore { get; }
        /// <summary>
        /// Indikuje dostupnost operace vložení řádku ZA aktuální objekt
        /// </summary>
        abstract public bool EnableLineAfter { get; }

        /// <summary>
        /// vložení nového řádku před daný objekt
        /// </summary>
        /// <param name="obj">daný objekt</param>
        /// <param name="config">indikuje nutnost brat ohled na konfiguraci</param>
        abstract public void InsertBefore(object obj, bool config = false);
        /// <summary>
        /// vložení nového řádku za daný objekt
        /// </summary>
        /// <param name="obj">daný objekt</param>
        /// <param name="config">indikuje nutnost brat ohled na konfiguraci</param>
        abstract public void InsertAfter(object obj, bool config = false);
        /// <summary>
        /// vložení prázdného řádku do hlavičky
        /// </summary>
        /// <param name="type">Typ vkládaného objektu</param>
        /// <param name="lineType">typ nového řádku</param>
        abstract public void InsertTo(Type type, LineType lineType = LineType.body);

        /// <summary>
        /// Načtení informací o štítku dle řádku a nastavení
        /// </summary>
        /// <param name="line">řádek s informací o štítku</param>
        /// <param name="sen">nastavení</param>
        public virtual IGRRLabel LoadInformation(dynamic line, object sen)
        {
            LoadInformation();

            return this;
        }

        /// <summary>
        /// odstranění řádku ze seznamu
        /// </summary>
        /// <param name="line">řádek k odstranění</param>
        public void Delete(ILine line) { Remove(line); }
        #endregion

        #region IAnchored
        /// <summary>
        /// Ukotvení
        /// </summary>
        [Browsable(false)]
        public bool Anchor { get; set; }
        #endregion

        #region IPositionHandler
        int start_position = -1;
        /// <summary>
        /// Začátek pozice
        /// </summary>
        [Browsable(false)]
        public int StartPosition { get { return start_position; } set { start_position = value; } }
        int end_position = -1;
        /// <summary>
        /// Konec pozice
        /// </summary>
        [Browsable(false)]
        public int EndPosition { get { return end_position; } set { end_position = value; } }

        /// <summary>
        /// typ objektu
        /// </summary>
        [Browsable(false)]
        public string PSType { get { return "region"; } }

        /// <summary>
        /// typ objektu
        /// </summary>
        [Browsable(false)]
        public bool IsInStyle { get { return false; } }
        /// <summary>
        /// 
        /// </summary>
        [Browsable(false)]
        public bool CanBeSameANested { get { return true; } }
        #endregion

        #region IDataItem
        protected bool isRootElement = false;
        /// <exclude/>
        [ReadOnly(true)]
        [Browsable(false)]
        public bool IsRootElement { get { return isRootElement; } set { isRootElement = value; } }
        /// <exclude/>
        [ReadOnly(true)]
        public virtual string DataTitle { get; set; }
        /// <exclude/>
        [ReadOnly(true)]
        public virtual string DataName { get; set; }
        /// <exclude/>
        [ReadOnly(true)]
        public virtual string DataDescription { get; set; }
        /// <exclude/>
        [ReadOnly(true)]
        public virtual string DataFullName { get; set; }
        /// <summary>
        /// Položka struktury
        /// </summary>
        [Browsable(false)]
        public virtual object StructureItem { get; set; }
        #endregion

        #region ISizeHandler
        /// <summary>
        /// šířka obsahu
        /// </summary>
        [Browsable(false)]
        public float ContentWidth { get { return LabledObject != null ? LabledObject.ContentWidth : 0; } }
        /// <summary>
        /// pozice LEFT obsahu
        /// </summary>
        [Browsable(false)]
        public float ContentLeft { get { return LabledObject != null ? LabledObject.ContentLeft : 0; } }

        /// <summary>
        /// Změna pozice zleva objektu
        /// </summary>
        /// <param name="value">Nová pozice zleva</param>
        abstract public void ChangeLeft(float value = -1);
        /// <summary>
        /// Změna výšky vybraných objektů
        /// </summary>
        abstract public void SetHeight();
        /// <summary>
        /// nastavení šířky objektů
        /// </summary>
        /// <param name="value">nová šířka</param>
        abstract public void ChangeWidth(float value);
        /// <summary>
        /// nastavení TOP pozice objektů
        /// </summary>
        /// <param name="value">nová pozice</param>
        abstract public void ChangeTop(float value);
        #endregion

        #region IBackground
        /// <summary>
        /// Barva pozadí
        /// </summary>
        [Browsable(false)]
        public IComplexColor BackColor { get; set; }
        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        [Browsable(false)]
        public BackgroundImage BackImage { get; set; }
        /// <summary>
        /// chování se obrázku pozadí
        /// </summary>
        [Browsable(false)]
        public ImageStretch BackImageStretch { get; set; }
        /// <summary>
        /// Indikuje zobrazení pozadí
        /// </summary>
        [Browsable(false)]
        public bool ShowBackground { get; set; }
        #endregion

        #region IGRRLabel
        /// <summary>
        /// posunutí aktuálního objektu o jeden dolů
        /// </summary>
        /// <param name="lineOrLabel">Posouváný objekt</param>
        public void ShiftDown(object lineOrLabel)
        {
            if (lineOrLabel is IGRRLine)
                (lineOrLabel as IGRRLine).ShiftDown();
            else
            {
                int indexStart = Body.IndexOf(lineOrLabel);
                if (indexStart != -1)
                {
                    object obj = Body.FirstOrDefault(itm => (!(itm is IGRRLine && (itm as IGRRLine).IsComment) || itm is AbstractLabel) && Body.IndexOf(itm) > indexStart);
                    if (obj != null)
                    {
                        int indexEnd = Body.IndexOf(obj);
                        Body.Reverse(indexStart, indexEnd - indexStart + 1);
                        Body.ChangeTop(Body.Top);
                    }
                }
            }
        }
        /// <summary>
        /// posunutí aktuálního objektu o jeden dolů
        /// </summary>
        /// <param name="lineOrLabel">Posouváný objekt</param>
        public void ShiftUp(object lineOrLabel)
        {
            if (lineOrLabel is IGRRLine)
                (lineOrLabel as IGRRLine).ShiftUp();
            else
            {
                int indexEnd = Body.IndexOf(lineOrLabel);
                object obj = Body.LastOrDefault(itm => (!(itm is IGRRLine && (itm as IGRRLine).IsComment) || itm is AbstractLabel) && Body.IndexOf(itm) < indexEnd);
                if (obj != null)
                {
                    int indexStart = Body.IndexOf(obj);
                    Body.Reverse(indexStart, indexEnd - indexStart + 1);
                    Body.ChangeTop(Body.Top);
                }
            }
        }

        /// <summary>
        /// odstranění objektu
        /// </summary>
        /// <param name="com">objekt k odstranní</param>
        abstract public void Remove(object com);
        /// <summary>
        /// vazba na proměnné
        /// </summary>
        /// <param name="vars">seznam proměnných</param>
        abstract public void BindVariables(IListComponent<IVariable> vars);
        #endregion

        /// <summary>
        /// kvůli typu
        /// </summary>
        [Browsable(false)]
        public IPagePanel PagePanel { get { return Page == null ? null : Page.PagePanel as IPagePanel; } }
        /// <summary>
        /// Známě značky regionu
        /// </summary>
        [Browsable(false)]
        abstract public List<string> KnownTags { get; }

        /// <summary>
        /// Služba výběru objektů
        /// </summary>
        [Browsable(false)]
        public SelectionService ServiceSelection
        {
            get { return Page is URAbstractPage ? (Page as URAbstractPage).ServiceSelection : null; }
        }

        IGraphicSettingService settingService;
        /// <summary>
        /// služba grafická
        /// </summary>
        IGraphicSettingService SettingService
        {
            get
            {
                if (settingService == null) settingService = ServiceManager.GraphicSettingService;
                return settingService;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="formatTag">informace o objektu z analyzátoru</param>
        protected AbstractLabel(GFEFormatTag formatTag)
            : this()
        {
            // TODO: Complete member initialization
            this.formatTag = formatTag;
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        protected AbstractLabel() { }

        /// <summary>
        /// získání objektu pod kurzorem
        /// </summary>
        /// <param name="point">pozice kurzoru vůči stránce</param>
        /// <param name="content">určuje, že hledání probíhá v obsahu štítku</param>
        /// <returns>Objekt, který se nachází bezprostředně pod kurzorem</returns>
        abstract public object GetTowedObject(PointF point, bool content);

        /// <exclude/>
        public void SetXmlAttribute(System.Xml.XmlElement xmlElement)
        {
            throw new NotImplementedException();
        }
    }
}
