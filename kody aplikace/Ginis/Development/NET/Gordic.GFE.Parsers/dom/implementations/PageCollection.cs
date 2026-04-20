//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.PageCollection.cs                     </Name>
//    <Description> Kolekce stránek ovladače                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using Gordic.GFE.Parsers.Core.Services;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.General;
using System.Diagnostics;
using Gordic.GFE.Parsers.Core;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// rozhraní stránek
    /// </summary>
    public interface IPages : IList<IPage>, IDisposable, IMarginable
    {
        /// <summary>
        /// volá se po změně šířky stránky
        /// </summary>
        event EventHandler PageHeightChanged;
        /// <summary>
        /// výška kolekce stránek
        /// </summary>
        SizeValue PageHeight { get; set; }

        /// <summary>
        /// volá se po změně šířky stránky
        /// </summary>
        event EventHandler PageWidthChanged;
        /// <summary>
        /// šířka kolekce stránek
        /// </summary>
        SizeValue PageWidth { get; set; }

        /// <summary>
        /// reakce na změnu formátu
        /// </summary>
        event EventHandler FormatChanged;
        /// <summary>
        /// formát stránek
        /// </summary>
        string Format { get; set; }

        /// <summary>
        /// změna seznamu
        /// </summary>
        event EventHandler ListChanged;

        /// <summary>
        /// velikost
        /// </summary>
        Size Size { get; }

        /// <summary>
        /// Neznámé atributy
        /// </summary>
        Dictionary<string, string> Unknowns { get; }
        /// <summary>
        /// Seznam znamých atributů
        /// </summary>
        List<string> KnownTags { get; }
        /// <summary>
        /// Všechny atributy objektu
        /// </summary>
        GFEAttrList AttrList { get; set; }
        /// <summary>
        /// vlastnk kolekce
        /// </summary>
        IPageControl Parent { get; set; }
        /// <summary>
        /// přesun objektu z pozice na pozici
        /// </summary>
        /// <param name="oldPosition"></param>
        /// <param name="newPosition"></param>
        void MoveFromTo(int oldPosition, int newPosition);
        /// <summary>
        /// synchroniyace objektů
        /// </summary>
        void SynchronizeByOrigin();

        /// <summary>
        /// celková výška všech stran před zadanou stranou (bez mezer mezi stranami)
        /// </summary>
        SizeValue PageHeightSumUpTo(int pageNo);
        /// <summary>
        /// celková výška včetně zoom všech stran před zadanou stranou (bez mezer mezi stranami)
        /// </summary>
        float PageHeightZoomSumUpTo(int pageNo);
    }
    /// <summary>
    /// kolekce stránek
    /// </summary>
    [ComVisible(false)]
    public class Pages : List<IPage>, IPages
    {
        #region IMarginable
        SizeValue marginLeft = new SizeValue();
        /// <summary>
        /// Odsazení zlevá
        /// </summary>
        public virtual SizeValue MarginLeft { get { return marginLeft; } set { marginLeft = value; MarginLeftChanged?.Invoke(this, EventArgs.Empty); } }
        SizeValue marginRight = new SizeValue();
        /// <summary>
        /// Odsazení zprava
        /// </summary>
        public virtual SizeValue MarginRight { get { return marginRight; } set { marginRight = value; MarginRightChanged?.Invoke(this, EventArgs.Empty); } }
        SizeValue marginTop = new SizeValue();
        /// <summary>
        /// Odsazení shora
        /// </summary>
        public virtual SizeValue MarginTop { get { return marginTop; } set { marginTop = value; MarginTopChanged?.Invoke(this, EventArgs.Empty); } }
        /// <summary>
        /// Odsazení zdola
        /// </summary>
        public virtual SizeValue MarginBottom { get; set; }

        /// <summary>
        /// volá se po změně odsazení shora stránky
        /// </summary>
        public event EventHandler MarginTopChanged;
        /// <summary>
        /// volá se po změně odsazení zprava stránky
        /// </summary>
        public event EventHandler MarginRightChanged;
        /// <summary>
        /// volá se po změně odsazení zleva stránky
        /// </summary>
        public event EventHandler MarginLeftChanged;
        #endregion

        /// <summary>
        /// Všechny atributy objektu
        /// </summary>
        public GFEAttrList AttrList { get; set; }

        List<string> knownTags;
        /// <summary>
        /// Seznam znamých atributů
        /// </summary>
        public List<string> KnownTags
        {
            get
            {
                if (knownTags == null)
                    knownTags = AddInTree.BuildItem("/ReportDesigner/GrfList/EditorSettingsTags", null) as List<string>;
                return knownTags;
            }
        }

        /// <summary>
        /// Neznámé značky větve
        /// </summary>
        public Dictionary<string, string> Unknowns
        {
            get => AttrList?.FindAllByKey(attr => !KnownTags.Contains(attr));
        }

        event EventHandler EHListChanged;
        /// <summary>
        /// Volá se poprovedení jakýchkoliv změn v počtu položek v seznamu,
        /// nebo jejích pořadí
        /// </summary>
        public event EventHandler ListChanged
        {
            add
            {
                if (EHListChanged != null)
                    EHListChanged -= value;
                EHListChanged += value;
            }
            remove
            {
                if (EHListChanged != null)
                    EHListChanged -= value;
            }
        }

        /// <summary>
        /// většinou Vizuální objekt - na tomto objektu se stránky vykreslují.
        /// </summary>
        public IPageControl Parent { get; set; }

        /// <summary>
        /// synchronizace seznamů
        /// </summary>
        public virtual void SynchronizeByOrigin() { OnListChanged(); }
        /// <exclude/>
        public virtual void MoveFromTo(int oldPosition, int newPosition) { }

        /// <summary>
        /// volá se po změně formátu    
        /// </summary>
        public event EventHandler FormatChanged;
        protected virtual double _PWMilimter { get; set; }
        protected virtual double _PHMilimeter { get; set; }
        /// <summary>
        /// Formát stránky
        /// </summary>        
        public string Format
        {
            get { return string.Format("{0} x {1}", _PWMilimter, _PHMilimeter); }
            set { if (value != null) SetFormat(value); }
        }

        /// <summary>
        /// pomocná proměnna
        /// </summary>
        protected virtual SizeValue _PageWidth { get; set; }
        /// <summary>
        /// volá se po změně šířky stránky
        /// </summary>
        public event EventHandler PageWidthChanged;
        /// <summary>
        /// šířka
        /// </summary>
        public SizeValue PageWidth
        {
            get { return _PageWidth; }
            set
            {
                _PageWidth = value;
                _PWMilimter = Math.Round(CommonService.GetMilimeters(PageWidth), 0);
                PageWidthChanged?.Invoke(this, EventArgs.Empty);
            }
        }

        internal bool PageHeightSameOnAllPages = true;
        /// <summary>
        /// pomocná proměnna
        /// </summary>
        protected virtual SizeValue _PageHeight { get; set; }
        /// <summary>
        /// volá se po změně šířky stránky
        /// </summary>
        public event EventHandler PageHeightChanged;
        /// <summary>
        /// výška
        /// </summary>
        public SizeValue PageHeight
        {
            get { return _PageHeight; }
            set
            {
                _PageHeight = value;
                _PHMilimeter = Math.Round(CommonService.GetMilimeters(PageHeight), 0);
                OnPageHeightChanged(EventArgs.Empty);
            }
        }
        internal void OnPageHeightChanged(EventArgs e) => PageHeightChanged?.Invoke(this, e);

        /// <summary>
        /// celková výška všech stran před zadanou stranou (bez mezer mezi stranami)
        /// </summary>
        public SizeValue PageHeightSumUpTo(int pageNo)
        {
            if (PageHeightSameOnAllPages)
            {
                return pageNo * (this.Count != 0 ? this[0].Height : 0);
            }
            SizeValue height = SizeValue.Empty;
            for (int i = 0; i < pageNo; i++)
            {
                height += this[i].Height;
            }
            return height;
        }
        /// <summary>
        /// celková výška včetně zoom všech stran před zadanou stranou (bez mezer mezi stranami)
        /// </summary>
        public float PageHeightZoomSumUpTo(int pageNo)
        {
            if (PageHeightSameOnAllPages)
            {
                return pageNo * (this.Count != 0 ? this[0].HeightZoom /*this.Last().BoundsInPixels.Height*/ : 0);
            }

            float height = SizeValue.Empty;
            for (int i = 0; i < pageNo; i++)
            {
                height += this[i].HeightZoom;
            }
            return height;
        }

        /// <summary>
        /// přidání objektu
        /// </summary>
        /// <param name="item">nová stránka</param>
        public new virtual void Add(IPage item)
        {
            base.Add(item);
            OnListChanged();
        }
        /// <summary>
        /// hodnota položky dle indexu
        /// </summary>
        /// <param name="index">index položky</param>
        /// <returns></returns>
        public new virtual IPage this[int index]
        {
            get { return base[index]; }
            set { base[index] = value; }
        }
        /// <exclude/>
        public new virtual bool Remove(IPage item)
        {
            bool r = base.Remove(item);
            OnListChanged();
            return r;
        }
        /// <summary>
        /// přetížení kvůli Undo/Redo
        /// </summary>
        public new virtual void Clear()
        {
            base.Clear();
            OnListChanged();
        }

        /// <summary>
        /// Vytvoření instance nové třídy.
        /// </summary>
        public Pages() { _srv = ServiceManager.GraphicSettingService; AttrList = new GFEAttrList(); }
        /// <summary>
        /// Vytvoření instance nové třídy.
        /// </summary>
        public Pages(IGraphicSettingService srv) { _srv = srv; AttrList = new GFEAttrList(); }

        int pageLeft = -1, pageSpacing = -1, pageFirstTop = -1;
        protected IGraphicSettingService _srv;
        /// <summary>
        /// Graphická velikost kolekce
        /// </summary>
        public virtual System.Drawing.Size Size
        {
            get
            {
                if (pageLeft == -1)
                    pageLeft = _srv.PageLeft;
                if (pageSpacing == -1)
                    pageSpacing = _srv.PageSpacing;
                if (pageFirstTop == -1)
                    pageFirstTop = _srv.FirstPageTop;

                // vypočítáme šířku a výšku zobrazované oblasti
                int width = (int)(2 * pageLeft + (this.Count != 0 ? this.First().WidthZoom : 0));
                // výška: výšku každé stránky vynásobíme zvětšením a přičteme nezvětšené odstupy mezí stránkami
                int height = (int)(this.Count * pageSpacing + PageHeightZoomSumUpTo(this.Count) + pageFirstTop);

                return new Size(width, height);
            }
        }

        /// <summary>
        /// Uvolnění kolece stránek
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
                while (Count != 0)
                {
                    this[0].Dispose();
                    this[0] = null;
                    RemoveAt(0);
                }
        }
        ~Pages() { Dispose(false); }
        /// <summary>
        /// nastavení formátu stránek
        /// </summary>
        /// <param name="value">nový formát stránek</param>
        protected virtual void SetFormat(string value)
        {
            string text = value.Trim();

            if (text.Contains("x"))
            {
                int index = text.IndexOf("(") != -1 ? text.IndexOf("(") : 0;
                string _wh = text.Substring(index).Trim().Trim(')').Trim('(');
                string _w = _wh.Substring(0, _wh.IndexOf("x")).Trim();
                _wh = _wh.Remove(0, _wh.IndexOf("x") + 1).Trim();
                string _h = string.IsNullOrEmpty(_wh) ? "0" : _wh;

                int __w = 0, __h = 0;
                if (PageWidth.IsEmpty)
                    PageWidth = new SizeValue(int.TryParse(_w, out __w) ? _w + "mm" : _w);
                else
                    PageWidth = new SizeValue(int.TryParse(_w, out __w) ? _w + "mm" : _w);

                if (PageHeight.IsEmpty)
                    PageHeight = new SizeValue(int.TryParse(_h, out __h) ? _h + "mm" : _h);
                else
                    PageHeight = new SizeValue(int.TryParse(_h, out __h) ? _h + "mm" : _h);

                FormatChanged?.Invoke(this, EventArgs.Empty);
            }
        }
        /// <summary>
        /// reakce nazměnu seznamu
        /// </summary>
        protected void OnListChanged()
        {
            EHListChanged?.Invoke(this, EventArgs.Empty);
        }
    }

    /// <summary>
    /// Kolekce stránek ovladače
    /// </summary>
    [ComVisible(false)]
    public class URPages : Pages, IUndoRedoMember
    {
        #region IMarginable
        readonly UndoRedo<SizeValue> marginleft = new UndoRedo<SizeValue>();
        /// <summary>
        /// Odsazení zlevá
        /// </summary>
        public override SizeValue MarginLeft
        {
            get { return marginleft.Value; }
            set
            {
                if (Parent != null && !UndoRedoService.IsTransactionStarted)
                    UndoRedoService.StartTransaction(GResources.GetResourceText(29450320)); //RC 29450320 : změna odsazení zleva
                marginleft.Value = value;
            }
        }

        readonly UndoRedo<SizeValue> marginright = new UndoRedo<SizeValue>();
        /// <summary>
        /// Odsazení zprava
        /// </summary>
        public override SizeValue MarginRight
        {
            get { return marginright.Value; }
            set
            {
                if (Parent != null && !UndoRedoService.IsTransactionStarted)
                    UndoRedoService.StartTransaction(GResources.GetResourceText(29450321)); //RC 29450321 : změna odsazení zprava
                marginright.Value = value;
            }
        }

        readonly UndoRedo<SizeValue> margintop = new UndoRedo<SizeValue>();
        /// <summary>
        /// Odsazení shora
        /// </summary>
        public override SizeValue MarginTop
        {
            get { return margintop.Value; }
            set
            {
                if (Parent != null && !UndoRedoService.IsTransactionStarted)
                    UndoRedoService.StartTransaction(GResources.GetResourceText(29450322)); //RC 29450322 : změna odsazení shora
                margintop.Value = value;
            }
        }

        readonly UndoRedo<SizeValue> marginbottom = new UndoRedo<SizeValue>();
        /// <summary>
        /// Odsazení zdola
        /// </summary>
        public override SizeValue MarginBottom
        {
            get { return marginbottom.Value; }
            set
            {
                if (Parent != null && !UndoRedoService.IsTransactionStarted)
                    UndoRedoService.StartTransaction(GResources.GetResourceText(29450323)); //RC 29450323 : změna odsazení sdola
                marginbottom.Value = value;
            }
        }
        #endregion

        #region IUndoRedoMember Members
        void IUndoRedoMember.OnCommit(object change)
        {
            if (UndoRedoService.Manager != null)
            {
                Debug.Assert(change != null);
                ((Change<List<IPage>>)change).NewState = pages;
            }
        }
        void IUndoRedoMember.OnUndo(object change)
        {
            if (UndoRedoService.Manager != null)
            {
                Debug.Assert(change != null);
                pages = ((Change<List<IPage>>)change).OldState;
                ByList();
            }
        }
        void IUndoRedoMember.OnRedo(object change)
        {
            if (UndoRedoService.Manager != null)
            {
                Debug.Assert(change != null);
                pages = ((Change<List<IPage>>)change).NewState;
                ByList();
            }
        }
        #endregion

        readonly UndoRedo<SizeValue> pageWidth = new UndoRedo<SizeValue>();
        /// <summary>
        /// pomocná proměnna
        /// </summary>
        protected override SizeValue _PageWidth { get { return pageWidth.Value; } set { pageWidth.Value = value; } }

        readonly UndoRedo<double> pwMilimter = new UndoRedo<double>();
        /// <summary>
        /// pomocná proměnna
        /// </summary>
        protected override double _PWMilimter { get { return pwMilimter.Value; } set { pwMilimter.Value = value; } }

        readonly UndoRedo<SizeValue> pageHeight = new UndoRedo<SizeValue>();
        /// <summary>
        /// pomocná proměnna
        /// </summary>
        protected override SizeValue _PageHeight { get { return pageHeight.Value; } set { pageHeight.Value = value; } }

        readonly UndoRedo<double> phMilimeter = new UndoRedo<double>();
        /// <summary>
        /// pomocná proměnna
        /// </summary>
        protected override double _PHMilimeter { get { return phMilimeter.Value; } set { phMilimeter.Value = value; } }

        /// <summary>
        /// nastavení formátu stránek
        /// </summary>
        /// <param name="value"></param>
        protected override void SetFormat(string value)
        {
            if (!UndoRedoService.IsTransactionStarted)
                UndoRedoService.StartTransaction(GResources.GetResourceText(29450324)); //RC 29450324 : změna formátu stránky
            base.SetFormat(value);
        }

        /// <exclude/>
        public override void MoveFromTo(int oldPosition, int newPosition)
        {
            if (oldPosition == newPosition)
                return;

            if (newPosition >= this.Count)
            {
                MoveFromTo(oldPosition, this.Count - 1);
                return;
            }
            if (newPosition < 0)
            {
                MoveFromTo(oldPosition, 0);
                return;
            }

            if (oldPosition >= this.Count)
            {
                MoveFromTo(this.Count - 1, newPosition);
                return;
            }
            if (oldPosition < 0)
            {
                MoveFromTo(0, newPosition);
                return;
            }

            EnumList(true);
            if (oldPosition < newPosition)
                for (int index = oldPosition; index < newPosition; index++)
                {
                    pages.Reverse(index, 2);
                    this.Reverse(index, 2);
                }
            else
                for (int index = oldPosition - 1; index >= newPosition; index--)
                {
                    pages.Reverse(index, 2);
                    this.Reverse(index, 2);
                }
            OnListChanged();
        }

        /// <summary>
        /// hodnota položky dle indexu
        /// </summary>
        /// <param name="index">index položky</param>
        /// <returns></returns>
        public override IPage this[int index]
        {
            get { return base[index]; }
            set
            {
                EnumList(true);
                base[index] = value;
                pages[index] = value;
            }
        }
        /// <exclude/>
        public override bool Remove(IPage item)
        {
            EnumList(true);
            pages.Remove(item);
            return base.Remove(item);
        }
        /// <summary>
        /// přetížení kvůli Undo/Redo
        /// </summary>
        public override void Clear()
        {
            EnumList(false);
            pages.Clear();
            base.Clear();
        }
        /// <summary>
        /// přidání objektu
        /// </summary>
        /// <param name="item">nová stránka</param>
        public override void Add(IPage item)
        {
            EnumList(true);
            pages.Add(item);
            base.Add(item);
        }

        /// <summary>
        /// synchronizace seznamů
        /// </summary>
        public override void SynchronizeByOrigin() { ByOriginal(); base.SynchronizeByOrigin(); }

        public List<IPage> Pages { get { return pages; } }

        List<IPage> pages = new List<IPage>();
        IUndoRedoManager manager;
        /// <summary>
        /// Vytvoření instance nové třídy.
        /// </summary>
        public URPages(IUndoRedoManager manager)
            : base()
        {
            this.manager = manager;
        }

        void ByOriginal()
        {
            EnumList(false);
            pages = new List<IPage>(this);
        }
        void ByList()
        {
            base.Clear();
            foreach (var item in pages)
                base.Add(item);
        }
        void EnumList(bool copyItems)
        {
            if (manager != null)
                if (manager.CurrentCommand != null
                    && !manager.CurrentCommand.ContainsKey(this))
                {
                    Change<List<IPage>> change = new Change<List<IPage>>
                    {
                        OldState = pages
                    };
                    manager.CurrentCommand[this] = change;
                    if (copyItems)
                        pages = new List<IPage>(pages);
                    else
                        pages = new List<IPage>();
                }
        }
    }

    ///// <summary>
    ///// Kolekce stránek ovladače
    ///// </summary>
    //public class PageCollection : UndoRedoList<IPage>, IPages
    //{
    //    #region IMarginable
    //    readonly UndoRedo<SizeValue> marginleft = new UndoRedo<SizeValue>();
    //    /// <summary>
    //    /// Odsazení zlevá
    //    /// </summary>
    //    public SizeValue MarginLeft
    //    {
    //        get { return marginleft.Value; }
    //        set
    //        {
    //            if (Parent != null && !UndoRedoService.IsTransactionStarted)
    //                UndoRedoService.StartTransaction(GResources.GetResourceText(29450320)); //RC 29450320 : změna odsazení zleva
    //            marginleft.Value = value;
    //        }
    //    }

    //    readonly UndoRedo<SizeValue> marginright = new UndoRedo<SizeValue>();
    //    /// <summary>
    //    /// Odsazení zprava
    //    /// </summary>
    //    public SizeValue MarginRight
    //    {
    //        get { return marginright.Value; }
    //        set
    //        {
    //            if (Parent != null && !UndoRedoService.IsTransactionStarted)
    //                UndoRedoService.StartTransaction(GResources.GetResourceText(29450321)); //RC 29450321 : změna odsazení zprava
    //            marginright.Value = value;
    //        }
    //    }

    //    readonly UndoRedo<SizeValue> margintop = new UndoRedo<SizeValue>();
    //    /// <summary>
    //    /// Odsazení shora
    //    /// </summary>
    //    public SizeValue MarginTop
    //    {
    //        get { return margintop.Value; }
    //        set
    //        {
    //            if (Parent != null && !UndoRedoService.IsTransactionStarted)
    //                UndoRedoService.StartTransaction(GResources.GetResourceText(29450322)); //RC 29450322 : změna odsazení shora
    //            margintop.Value = value;
    //        }
    //    }

    //    readonly UndoRedo<SizeValue> marginbottom = new UndoRedo<SizeValue>();
    //    /// <summary>
    //    /// Odsazení zdola
    //    /// </summary>
    //    public SizeValue MarginBottom
    //    {
    //        get { return marginbottom.Value; }
    //        set
    //        {
    //            if (Parent != null && !UndoRedoService.IsTransactionStarted)
    //                UndoRedoService.StartTransaction(GResources.GetResourceText(29450323)); //RC 29450323 : změna odsazení sdola
    //            marginbottom.Value = value;
    //        }
    //    }
    //    #endregion

    //    /// <summary>
    //    /// volá se po změně formátu    
    //    /// </summary>
    //    public event EventHandlerNonArgument FormatChanged;

    //    readonly UndoRedo<SizeValue> pageWidth = new UndoRedo<SizeValue>();
    //    readonly UndoRedo<double> pwMilimter = new UndoRedo<double>();
    //    /// <summary>
    //    /// volá se po změně šířky stránky
    //    /// </summary>
    //    public event EventHandlerNonArgument PageWidthChanged;
    //    /// <summary>
    //    /// šířka
    //    /// </summary>
    //    public SizeValue PageWidth
    //    {
    //        get { return pageWidth.Value; }
    //        set
    //        {
    //            pageWidth.Value = value; 
    //            pwMilimter.Value = Math.Round(CommonService.GetMilimeters(PageWidth), 0);
    //            if (PageWidthChanged != null)
    //                PageWidthChanged();
    //        }
    //    }

    //    readonly UndoRedo<SizeValue> pageHeight = new UndoRedo<SizeValue>();
    //    readonly UndoRedo<double> phMilimeter = new UndoRedo<double>();
    //    /// <summary>
    //    /// volá se po změně šířky stránky
    //    /// </summary>
    //    public event EventHandlerNonArgument PageHeightChanged;
    //    /// <summary>
    //    /// výška
    //    /// </summary>
    //    public SizeValue PageHeight
    //    {
    //        get { return pageHeight.Value; }
    //        set
    //        {
    //            pageHeight.Value = value;
    //            phMilimeter.Value = Math.Round(CommonService.GetMilimeters(PageHeight), 0);
    //            if (PageHeightChanged != null) 
    //                PageHeightChanged();
    //        }
    //    }

    //    /// <summary>
    //    /// Formát stránky
    //    /// </summary>        
    //    public string Format
    //    {
    //        get { return string.Format("{0} x {1}", pwMilimter.Value, phMilimeter.Value); }
    //        set
    //        {
    //            if (value != null)
    //            {
    //                if (!UndoRedoService.IsTransactionStarted)
    //                    UndoRedoService.StartTransaction(GResources.GetResourceText(29450324)); //RC 29450324 : změna formátu stránky

    //                string text = value.Trim();

    //                if (text.Contains("x"))
    //                {
    //                    int index = text.IndexOf("(") != -1 ? text.IndexOf("(") : 0;
    //                    string _wh = text.Substring(index).Trim().Trim(')').Trim('(');
    //                    string _w = _wh.Substring(0, _wh.IndexOf("x")).Trim();
    //                    _wh = _wh.Remove(0, _wh.IndexOf("x") + 1).Trim();
    //                    string _h = string.IsNullOrEmpty(_wh) ? "0" : _wh;

    //                    int __w = 0, __h = 0;
    //                    if (PageWidth.IsEmpty)
    //                        PageWidth = new SizeValue(int.TryParse(_w, out __w) ? _w + "mm" : _w);
    //                    else
    //                        PageWidth = new SizeValue(int.TryParse(_w, out __w) ? _w + "mm" : _w);

    //                    if (PageHeight.IsEmpty)
    //                        PageHeight = new SizeValue(int.TryParse(_h, out __h) ? _h + "mm" : _h);
    //                    else
    //                        PageHeight = new SizeValue(int.TryParse(_h, out __h) ? _h + "mm" : _h);

    //                    OnFormatChanged();
    //                }
    //            }
    //        }
    //    }

    //    /// <summary>
    //    /// Vizuální objekt - na tomto objektu se stránky vykreslují.
    //    /// </summary>
    //    public AbstractPagePanel Parent { get; set; }

    //    /// <summary>
    //    /// Vytvoření instance nové třídy.
    //    /// </summary>
    //    public PageCollection() { }

    //    /// <summary>
    //    /// Graphická velikost kolekce
    //    /// </summary>
    //    public virtual System.Drawing.Size Size
    //    {
    //        get
    //        {
    //            // vypočítáme šířku a výšku zobrazované oblasti
    //            int width = (int)(2 * ServiceManager.GraphicSettingService.PageLeft + (this.Count != 0 ? this.First().BoundsInPixels.Width : 0)),
    //                // výška: výšku každé stránky vynásobíme zvětšením a přičteme nezvětšené odstupy mezí stránkami
    //                height = (int)(this.Count * (ServiceManager.GraphicSettingService.PageSpacing + (this.Count != 0 ? this.Last().BoundsInPixels.Height : 0)) + ServiceManager.GraphicSettingService.FirstPageTop);
    //            return new Size(width, height);
    //        }
    //    }

    //    void OnFormatChanged()
    //    {
    //        if (FormatChanged != null)
    //            FormatChanged();
    //    }

    //    /// <summary>
    //    /// Uvolnění kolece stránek
    //    /// </summary>
    //    public void Dispose()
    //    {
    //        while (Count != 0)
    //        {
    //            this[0].Dispose();
    //            this[0] = null;
    //            RemoveAt(0);
    //        }
    //    }
    //}
}
