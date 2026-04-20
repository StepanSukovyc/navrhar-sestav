//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DefaultFillerPagePanel.cs                </Name>
//    <Description> Výchozí ovladač stránek                                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-01                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Drawing;
using System.Linq;
using System.Windows.Forms;
using Gordic.General;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.Services;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Výchozí ovladač stránek
    /// </summary>
    public class FillerPagePanel : AbstractPagePanel, IEditControlHandler, ICanBeDirty, IDisposable
    {
        #region AbstractPagePanel
        bool removeAfterMouseUp = false;
        /// <summary>
        /// hledání všech objektů dle pozice <paramref name="location"/>
        /// pod kurzorem
        /// </summary>
        /// <param name="location">Umístění kurzóru</param>
        /// <returns>Buď objekt samotný nebo seznam vnořených objektů</returns>
        public override List<IComponent> SearchComponent(Point location)
        {
            // zafixujeme pozici kurzoru
            // tato pozice je NEtransformovaná
            location = new Point(location.X + HorizontalScroll.Value, location.Y + VerticalScroll.Value);
            List<IComponent> result = new List<IComponent>();

            //Projdeme všechny stránky a zjistíme, zda některá obsahuje v sobě pozici kurzoru
            foreach (var page in Pages)
                //Pokud stránka obsahuje v sobě kurzor...
                if (page.BoundsInPixels.Contains(location))
                    //...pak najdeme objekt na této stránce obsahující kurzor
                    result.AddRange((page as IDesignSearchHandler).SearchComponent(location));

            if (result.Count != 0)
            {
                removeAfterMouseUp = true;
                result.RemoveAll(item => !(item is ITagComponent) || (item is URAbstractContainer) || (item is DefaultContentText));
            }
            if (result.Count != 0)
                result.Sort(new DeepOrderComparer(true));
            return result.Distinct().ToList();
        }
        /// <summary>
        /// Kreslení stránky
        /// </summary>
        /// <param name="e"></param>
        /// <param name="graphics">ovladač grafiky</param>
        protected override void PaintPanel(PaintEventArgs e, Graphics graphics)
        {
            if (Pages == null)
                return;

            // jako první vykreslíme stránku
            foreach (IPage page in Pages)
                page.Paint(e.ClipRectangle, graphics, new PaintArgs());
        }
        /// <summary>
        /// Kreslení ovladače
        /// </summary>
        /// <param name="e">Argument kreslení</param>
        protected override void PaintControl(PaintEventArgs e)
        {
            if (DesignMode)
                return;
            if (manager.ScriptManager.__Just_Running != null) //vykresleni behem skriptu?!
            {
                //nemelo by nikdy nastat! Rekurzivni Painty jsou potlaceny
                return;
            }
        start:
            // pokud obrázek ve vyrovnávací pamětí je prázdný
            // pak ho vytvoříme
            if (_contentBuffer == null)
                _contentBuffer = new Bitmap(Width, Height);

            // získáme ovladač grafiky
            using (Graphics graphics = Graphics.FromImage(_contentBuffer))
            {
                // připravíme pozadí
                ClearBackground(graphics);
                // malování grafiky
                PaintPanel(e, graphics);
            }
            if (_contentBuffer == null) //resize behem vykresleni?
            {
                goto start;
            }

            // zkopírujeme vše co je ve vyrovnávací paměti na obrazovku
            Graphics _graphics = e.Graphics;
            _graphics.DrawImageUnscaledAndClipped(_contentBuffer, new Rectangle(0, 0, Width, Height));
        }

        #region IKeyActions
        protected override void GenerateKeyActions()
        {
            keyactions[Keys.Escape] = new AbstractKeyAction();
            keyactions[Keys.Escape].OnActionEvent += EscapeAction;
            keyactions[Keys.Tab] = new AbstractKeyAction();
            keyactions[Keys.Tab].OnActionEvent += TabAction;
            keyactions[Keys.Tab | Keys.Shift] = new AbstractKeyAction();
            keyactions[Keys.Tab | Keys.Shift].OnActionEvent += TabShiftAction;
        }
        ActionResult TabAction()
        {
            var e = EditControl;
            if (e != null && e.IsDirty)
            {
                if (e.RefreshText() == false) return ActionResult.execute_false;
                e.IsDirty = false;
            }
            return FindNextControl() ? ActionResult.execute_true : ActionResult.execute_false;
        }
        ActionResult TabShiftAction()
        {
            var e = EditControl;
            if (e != null && e.IsDirty)
            {
                if (e.RefreshText() == false) return ActionResult.execute_false;
                e.IsDirty = false;
            }
            return FindPreviousControl() ? ActionResult.execute_true : ActionResult.execute_false;
        }
        ActionResult EscapeAction()
        {
            if (EditControl != null)
                return RemoveEditControl(true) ? ActionResult.execute_true : ActionResult.execute_false;
            return ActionResult.execute_none;
        }
        #endregion

        #endregion

        #region IEditControlHandler

        /// <summary>
        /// Aktivace ovladacího prvku stránky
        /// </summary>
        public void ActivateEditControl()
        {
            if (_View.IsReadOnly)
                return;
            if (ServiceSelection == null || ServiceSelection.PrimarySelection == null)
                return;

            //musi implementovat rozhraní IDefaultDataItemHandler a být editovatelné
            if (!(ServiceSelection.PrimarySelection is IDefaultDataItemHandler v)) return;
            if (v is IVisibleComponent vc && vc.Visible == false) return;
            var di = v.DataItem;
            if (di == null || di.Edit == false) return;

            if (RemoveEditControl(true) == false) return;

            if (di.Value == DataRegionGrr.unknown_value) di.MakeDirty();
            di.SetDisplayValue(); //pripadne spusteni aktualizace hodnoty
            di.RunOnEdit();       //onEdit skript

            EditControl = di.CreateEditControl();
            if (EditControl != null)
            {
                if (EditControl is Gordic.WinForms.Controls.IGUserInput uinp) uinp.InputChanged += delegate { ValueChange(); };

                var owner = di.Owner as ITagComponent;
                var p = Point.Ceiling(new PointF(owner.LeftZoom, owner.TopZoom));
                var s = new Size((int)Math.Ceiling(owner.LeftZoom + owner.WidthZoom) - p.X, (int)Math.Ceiling(owner.TopZoom + owner.HeightZoom) - p.Y);
                p.Offset(-HorizontalScroll.Value, -VerticalScroll.Value);
                var b = new Rectangle(p, s);

                var r = owner.ContentBounds;
                r.Offset(-HorizontalScroll.Value, -VerticalScroll.Value);

                if (r.Left - b.Left < 8) b.Inflate(8 - (int)(r.Left - b.Left), 0);
                if (r.Top - b.Top < 8) b.Inflate(0, 8 - (int)(r.Top - b.Top));

                EditControl.Bounds = b;
                EditControl.ContentBounds = r;

                Controls.Add(EditControl as Control);
                EditControl.Focus();
            }
            else if (di is IDefaultDataItem)
                (di as IDefaultDataItem).InputChanged += delegate { ValueChange(); };
            Invalidate();
        }

        /// <summary>
        /// Ovládací prvek stránky
        /// </summary>
        public IEditControl EditControl { get; protected set; }
        /// <summary>
        /// Odstranění ovladacího prvku stránky
        /// </summary>
        /// <param name="validate">Validace obsahu</param>
        public bool RemoveEditControl(bool validate)
        {
            var e = EditControl;
            if (e != null)
            {
                if (validate && e.RefreshText() == false) return false;
                if (Controls.Contains(e as Control)) Controls.Remove(e as Control);
                e.Dispose();
                EditControl = null;
            }
            this.Focus();
            return true;
        }

        /// <summary>
        /// Aktualizace textu
        /// </summary>
        public void RefreshData()
        {
            if (EditControl != null)
                EditControl.RefreshText();
        }
        void ValueChange()
        {
            if (EditControl != null)
                EditControl.IsDirty = true;
            isDirty = true;
            OnDirtyChanged();
        }
        #endregion

        #region ICanBeDirty
        bool isDirty = false;
        /// <summary>
        /// Pokud tato vlastnost vrácí TRUE, pak obsah byl pozměněn 
        /// od okamžíku posledního uložení/načtení obsahu
        /// </summary>
        public bool IsDirty
        {
            get { return isDirty; }
        }

        /// <summary>
        /// Se volá pokud obsah byl pozměněn od okamžíku posledního uložení/načtení
        /// </summary>
        public event EventHandler IsDirtyChanged;
        void OnDirtyChanged()
        {
            IsDirtyChanged?.Invoke(this, EventArgs.Empty);
        }
        #endregion

        /// <summary>
        /// cesta k popisu položek kontextového menu
        /// </summary>
        protected string contextMenuPath = "/Dom/PagePanel/ContextMenu";
        IMouseComponent m_lastHover = null;
        internal GFEFormat gfeFormat;
        DefaultDataManager manager;

        /// <summary>
        /// Jednotka struktury
        /// </summary>
        public override GFEStructure Structure { get { return (_View as DefaultViewContent).Structure; } }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public FillerPagePanel()
            : base()
        {
            _InitializeComponent();
        }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="view">pohled na obsah, kterému patří daný panel</param>
        public FillerPagePanel(IViewContent view)
            : this()
        {
            this._View = view;
            if (GSS == null)
                GSS = ServiceManager.GraphicSettingService;

            if (GSS is DefaultGraphicSettingService srv)
                srv.View = this._View;

            if (ServiceSelection != null)
                ServiceSelection.SelectionChanged += SelectionChanged;
            IsDirtyChanged += PagePanelIsDirtyChanged;

            SetCommonFunctions();
        }

        /// <summary>
        /// Nalezení dalšího editovatelného objektu
        /// </summary>
        /// <returns>TRUE-objekt nalezen</returns>
        public virtual bool FindNextControl()
        {
            if (Pages == null) return false;

            IPage page = GetActivePage();
            int from = page != null ? page.Order - 1 : 0;

            if (from == -1)
                from = 0;

            for (int i = from; i < Pages.Count; i++)
                if (FindedComponent(Pages[i] as URAbstractContainer))
                    return true;

            // sem se dostaneme pokud nenajdeme objekt nahoru
            RemoveEditControl(true);

            for (int i = 0; i <= from; i++)
                if (FindedComponent(Pages[i] as URAbstractContainer))
                    return true;

            if (EditControl == null)
                LoggingService.Warning(GResources.GetResourceText(29450297)); //RC 29450297 : v kolekci neexistuje editovatelný objekt
            else
                LoggingService.Warning(GResources.GetResourceText(29450298)); //RC 29450298 : v kolekci neexistuje další editovatelný objekt
            return false;
        }
        /// <summary>
        /// Nalezení předchozího editovatelného objektu
        /// </summary>
        /// <returns>True - objekt nalezen</returns>
        public virtual bool FindPreviousControl()
        {
            IPage page = GetActivePage();
            if (page == null)
                return false;

            int from = page.Order - 1;
            for (int i = from; i >= 0; i--)
                if (FindedComponent(Pages[i] as URAbstractContainer, false))
                    return true;

            // sem se dostaneme pokud nenajdeme objekt dolů
            RemoveEditControl(true);

            for (int i = Pages.Count - 1; i >= from; i--)
                if (FindedComponent(Pages[i] as URAbstractContainer, false))
                    return true;

            if (EditControl == null)
                LoggingService.Warning(GResources.GetResourceText(29450297)); //RC 29450297 : v kolekci neexistuje editovatelný objekt
            else
                LoggingService.Warning(GResources.GetResourceText(29450298)); //RC 29450298 : v kolekci neexistuje další editovatelný objekt
            return false;
        }

        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje, že objekt ve stavu uvolnění</param>
        protected override void Dispose(bool disposing)
        {
            if (IsDisposed)
                return;
            RemoveEditControl(false);

            if (ServiceSelection != null)
                ServiceSelection.SelectionChanged -= SelectionChanged;
            if (GSS != null)
            {
                GSS.RemoveResolutionChanged(_View, SettingServiceChanged);
                GSS.RemoveShowGridChanged(_View, SettingServiceChanged);
                GSS.RemoveShowColorOfChanged(_View, SettingServiceChanged);
                if (GSS is DefaultGraphicSettingService)
                    (GSS as DefaultGraphicSettingService).View = null;
            }
            IsDirtyChanged -= PagePanelIsDirtyChanged;
            _View = null; //odvazu view (nevolam Dispose -> obvykle je volano prave z view.Dispose()

            if (Pages != null)
            {
                Pages.ListChanged -= ActualizeScrollScope;
                Pages.Dispose();
            }
            if (manager != null) manager.Dispose();
            if (gfeFormat != null) gfeFormat.Dispose();

            base.Dispose(disposing);
        }

        /// <exclude/>
        public void InvokeMouseDown(MouseEventArgs e) { OnMouseDown(e); }
        /// <exclude/>
        public void InvokeMouseUp(MouseEventArgs e) { OnMouseUp2(e, false); }
        /// <exclude/>
        public void InvokeMouseMove(MouseEventArgs e) { OnMouseMove(e); }

        /// <exclude/>
        protected override void OnMouseDown(MouseEventArgs e)
        {
            ThreadService.SafeThreadAsyncCall(this, _OnMouseDown, e);
            base.OnMouseDown(e);
            this.Focus();
        }

        void _OnMouseDown(MouseEventArgs e)
        {
            IEnumerable<IComponent> components = SearchComponent(e.Location);
            foreach (var item in components)
            {
                if (!(item is IMouseHandler mc)) continue;
                if (item is IVisibleComponent vc && vc.Visible == false) continue;

                mc.IOnMouseDown(e);
            }
        }
        void _OnMouseUp(MouseEventArgs e)
        {
            IEnumerable<IComponent> components = SearchComponent(e.Location);
            foreach (var item in components)
            {
                if (!(item is IMouseHandler mc)) continue;
                if (item is IVisibleComponent vc && vc.Visible == false) continue;

                mc.IOnMouseUp(e);
            }
        }
        /// <summary>
        /// Přetížení dané metody
        /// </summary>
        /// <param name="e"></param>
        protected override void OnMouseUp(MouseEventArgs e)
        {
            //base.OnMouseUp(e);
            OnMouseUp2(e, true);
        }
        private void OnMouseUp2(MouseEventArgs e, bool fireContextMenu)
        {
            ThreadService.SafeThreadAsyncCall(this, _OnMouseUp, e);
            switch (e.Button)
            {
                case MouseButtons.Left:
                    if (removeAfterMouseUp)
                    {
                        RemoveEditControl(true);
                        removeAfterMouseUp = false;
                    }

                    IEnumerable<IComponent> components = new HashSet<IComponent>(SearchComponent(e.Location));
                    var _view = _View as IHost;
                    foreach (var component in components)
                    {
                        //MAL 2019/08/13 prehozeni pred SetSelectedComponents, ktere aktivuji EditControl, umozni onClick skriptu menit data
                        if (component is IVisibleComponent vc && vc.Visible == false) continue;

                        if (component is IMouseComponent mc)
                        {
                            mc.Click(e.X, e.Y);
                            Invalidate();
                        }

                        //if (component is IMouseHandler)
                        //    (component as IMouseHandler).IOnMouseUp(e);
                        if (component is IPage)
                        {
                            if (_view != null && Control.ModifierKeys != Keys.Control)
                                if (_view.Host.Container.Components.Count <= 1)
                                    // stránku lze přidávat jednotlivě
                                    SetSelectedComponents(component, SelectionTypes.Replace);
                        }
                        else
                            // je to prázdné opuštění tlačítka myši na plochu
                            // ...vybereme objekt pod kurzorem 
                            SetSelectedComponents(component, Control.ModifierKeys == Keys.Control ? SelectionTypes.Add : SelectionTypes.Replace);
                    }
                    break;
                case MouseButtons.Right:
                    // případ kontextového menu
                    // kliknuti mimo stránku
                    IEnumerable<IComponent> _comps = SearchComponent(e.Location);
                    if (_comps.Count() != 0)
                    {
                        foreach (var component in _comps)
                        {
                            //if (component is IMouseHandler)
                            //    (component as IMouseHandler).IOnMouseUp(e);
                            if (!(component is IPage))
                                // je to prázdné opuštění tlačítka myši na plochu
                                // ...vybereme objekt pod kurzorem 
                                SetSelectedComponents(component, Control.ModifierKeys == Keys.Control ? SelectionTypes.Add : SelectionTypes.Replace);
                        }
                    }
                    else if (ServiceSelection != null)
                        ServiceSelection.Clear();

                    if (fireContextMenu)
                    {
                        if (ServiceSelection != null)
                        {
                            if (ServiceSelection.PrimarySelection != null)
                                if ((ServiceSelection.PrimarySelection as ITagComponent).Parent is Gordic.GFE.Parsers.Editor.ILineLite)
                                {
                                    MenuService.ShowContextMenu(ServiceSelection.PrimarySelection, "/FormFiller/Desktop/SelectedObject", this, e.X, e.Y);
                                    break;
                                }

                            MenuService.ShowContextMenu(_View, contextMenuPath, this, e.X, e.Y);
                        }
                    }
                    break;
                case MouseButtons.Middle:
                case MouseButtons.None:
                case MouseButtons.XButton1:
                case MouseButtons.XButton2:
                default:
                    break;
            }
        }
        protected override void OnMouseMove(MouseEventArgs e)
        {
            base.OnMouseMove(e);

            IEnumerable<IComponent> components = SearchComponent(e.Location);
            foreach (var component in components)
            {
                if (component is IVisibleComponent vc && vc.Visible == false) continue;

                if (component is IMouseComponent mc)
                {
                    if (m_lastHover != null && component != m_lastHover) m_lastHover.HoverEnd();
                    m_lastHover = mc;
                    mc.Hover(e.X - AutoScrollPosition.X, e.Y - AutoScrollPosition.Y);
                    return;
                }
            }
            if (m_lastHover != null)
            {
                m_lastHover.HoverEnd();
                m_lastHover = null;
            }
        }
        protected override void OnMouseLeave(EventArgs e)
        {
            base.OnMouseLeave(e);
            if (m_lastHover != null)
            {
                m_lastHover.HoverEnd();
                m_lastHover = null;
            }
        }

        Point m_tooltipPoint;
        public void TkHoverEnd(IMouseComponent mc)
        {
            if (m_tooltipPoint.IsEmpty == false)
            {
                Gordic.WinForms.Controls.GToolTipService.HideHint();
            }
            //if (dataItem.OnClick != null)
            this.Control.Cursor = System.Windows.Forms.Cursors.Default;
        }
        public Point TkPoint(IMouseComponent mc, float x, float y)
        {
            var p = new Point((int)x + 12, (int)y);
            if (Math.Abs(p.X - m_tooltipPoint.X) + Math.Abs(p.Y - m_tooltipPoint.Y) < 4) return Point.Empty;
            return p;
        }
        public void TkHover(IMouseComponent mc, float x, float y, bool handCursor = false, Point? defPoint = null, string defTooltip = null)
        {
            if (handCursor)
                this.Control.Cursor = System.Windows.Forms.Cursors.Hand;

            Point p = defPoint ?? TkPoint(mc, (int)x + 12, (int)y);
            if (p.IsEmpty) return;

            var tooltip = defTooltip ?? mc.Tooltip;
            var error = (mc as IDefaultDataItemHandler)?.DataItem?.ValidationResult;

            if (string.IsNullOrEmpty(tooltip) == false || error != null)
            {
                Gordic.WinForms.Controls.GHintText l_hinttext;
                if (error != null)
                    l_hinttext = new Gordic.WinForms.Controls.GHintTextWithImage(error.Message, Gordic.WinForms.Controls.TipStyle.Error)
                    {
                        Header = string.IsNullOrEmpty(tooltip) ? null : tooltip
                    };
                else
                    l_hinttext = new Gordic.WinForms.Controls.GHintPlainText(tooltip)
                    {
                    };

                //Gordic.WinForms.Controls.GToolTipService.ShowHint(tooltip, this.Page.Parent, p, int.MaxValue);
                //tooltip = tooltip.Replace("<b>", "").Replace("</b>", "").Replace("<br/>", "\n");
                m_tooltipPoint = p;
                if (this.Control is ScrollableControl sc)
                    p.Offset(sc.AutoScrollPosition);
                Gordic.WinForms.Controls.GToolTipService.ShowHint(l_hinttext, this.Control, p, int.MaxValue, balloon: true);
                return;
            }
        }

        /// <exclude/>
        protected override void _ZoomChanged(object sender, EventArgs e)
        {
            base._ZoomChanged(sender, e);
            SettingServiceChanged(sender, e);
            if (IsHandleCreated)
                ActivateEditControl();  //toto selze na LK. A ZoomChanged se vyvolat muze!
        }

        /// <summary>
        /// Načtení dat formuláře.
        /// </summary>
        /// <param name="fileData">Obsah primárních dat</param>
        /// <param name="formatFile">Format sestavy</param>
        /// <param name="manager">Správce dat</param>
        /// <param name="monitor"></param>
        internal void ReloadData(byte[] fileData, OpenedFile formatFile, DefaultDataManager manager, AsynchronousWaitDialog monitor)
        {
            if (monitor != null)
                monitor.TaskName = GResources.GetResourceText(29450300); //RC 29450300 : analýza formátu...
            //if (formatFileData == null || formatFileData.Length == 0)
            //    throw new Exception(GResources.GetResourceText(29450299)); //RC 29450299 : Soubor sestavy je prázdný!

            if (gfeFormat == null)
                //gfeFormat = GFEFormat.LoadFromBytes(formatFileData);
                gfeFormat = GFEFormat.LoadFromFile(formatFile.FileName);
            else
                gfeFormat.InitializeRegisterNamedComponents();

            if (this.manager == null)
                this.manager = manager;
            this.manager.AttachFormat(gfeFormat);

            DisposePages(monitor);
            Pages = new Pages();
            RefreshPages(monitor);
            Pages.ListChanged += ActualizeScrollScope;
            manager.Filler.OnViewLoaded();

            //ComboControl.Focus vyroluje nabidku, coz pusobi rusive pri loadu/reloadu. Proto panel zneviditelnim, nic se nevyroluje a pak vratim zpet
            var l_vis = this.Visible;
            try
            {
                this.Visible = false;
                FindNextControl();
                _ZoomChanged(this, EventArgs.Empty);
            }
            finally
            {
                this.Visible = l_vis;
            }
        }

        bool CallBackCondition(object item)
        {
            ServiceSelection.SetSelectedComponents(item, SelectionTypes.Replace);
            return EditControl != null;
        }
        bool FindedComponent(URAbstractContainer aPage, bool next = true) =>
            aPage != null
            && (next
            ? aPage.FindNextControl(EditControl, CallBackCondition) != null
            : aPage.FindPreviousControl(EditControl, CallBackCondition) != null);

        IPage GetActivePage() => (EditControl == null || EditControl.Owner == null)
            ? Pages.FirstOrDefault(pg => pg.IsActive)
            : (EditControl.Owner as ITagComponent).Page;

        /// <summary>
        /// Načtení stránek z formátu.
        /// </summary>
        /// <param name="grf">Formát s informací o sestavě.</param>
        int LoadPages(GFEFormatGRF grf)
        {
            Pages.PageHeight = new SizeValue((grf.PageSize.Height == 0 ? 297 : grf.PageSize.Height) + "mm");
            Pages.PageWidth = new SizeValue((grf.PageSize.Width == 0 ? 210 : grf.PageSize.Width) + "mm");
            Pages.MarginLeft = new SizeValue((grf.PageMargins.left == 0 ? 10 : grf.PageMargins.left) + "mm");
            Pages.MarginRight = new SizeValue((grf.PageMargins.right == 0 ? 10 : grf.PageMargins.right) + "mm");
            Pages.MarginTop = new SizeValue((grf.PageMargins.top == 0 ? 10 : grf.PageMargins.top) + "mm");
            Pages.MarginBottom = new SizeValue((grf.PageMargins.bottom == 0 ? 10 : grf.PageMargins.bottom) + "mm");
            Pages.Parent = this;

            int collectionsCount;
            if (manager == null)
                collectionsCount = 1;
            else
            {
                var mainReg = grf.FindMainRegion();
                manager.SetMain(mainReg.Name);
                collectionsCount = manager.GetCollectionsCount();
            }

            for (int index = 0; index < collectionsCount; index++)
                for (int i = 0; i < grf.PageCount; i++)
                {
                    DefaultPage page = new DefaultPage(Pages, _View);
                    page.Initialize();
                    Pages.Add(page as IPage);
                }
            Pages.PageWidthChanged += ActualizeScrollScope;
            Pages.PageHeightChanged += ActualizeScrollScope;

            return collectionsCount;
        }

        object Reg_GetStructureItem(string datafullname)
        {
            if (!string.IsNullOrEmpty(datafullname))
                return CommonService.GetItemFromStructure(Structure, datafullname);
            return null;
        }

        void SelectionChanged(object sender, EventArgs e) { ActivateEditControl(); }
        void _InitializeComponent()
        {
            this.SuspendLayout();
            this.AllowDrop = true;
            //MAL 2020/01/08 zruseni OptimizedDoubleBuffer - delalo cernou plochu pri nekterych rekurzivnich Paint. Navic stejne pouziva vlastni _contentBuffer
            //SetStyle(ControlStyles.AllPaintingInWmPaint | ControlStyles.UserPaint | ControlStyles.OptimizedDoubleBuffer, true);
            SetStyle(ControlStyles.AllPaintingInWmPaint | ControlStyles.UserPaint, true);
            SetStyle(ControlStyles.Selectable, true);
            AutoScroll = true;
            Dock = DockStyle.Fill;
            this.ResumeLayout(false);
        }
        void SettingServiceChanged(object sender, EventArgs e)
        {
            PositionCachNeedRefresh = true;
            Invalidate();
        }
        void PagePanelIsDirtyChanged(object sender, EventArgs e)
        {
            if (IsDirty)
                (_View as DefaultAbstractViewContent).MakeDirty();
        }
        void SetCommonFunctions()
        {
            if (GSS != null)
            {
                GSS.AddResolutionChanged(_View, SettingServiceChanged);
                GSS.AddShowGridChanged(_View, SettingServiceChanged);
                GSS.AddShowColorOfChanged(_View, SettingServiceChanged);
            }
        }
        void DisposePages(AsynchronousWaitDialog monitor)
        {
            if (monitor != null)
                monitor.TaskName = GResources.GetResourceText(29450301); //RC 29450301 : uvolnění předchozí instance stránek...
            // pokud se stránky nenačítají poprvé, pak je před znovu vytvořením uvolníme
            if (Pages != null)
            {
                Pages.ListChanged -= ActualizeScrollScope;
                Pages.Dispose();
                Pages = null;
                ServiceSelection.Clear();
                if (EditControl != null)
                {
                    EditControl.Dispose();
                    EditControl = null;
                }
            }
        }
        /// <summary>
        /// Aktualizace stránek formuláře
        /// </summary>
        void RefreshPages(AsynchronousWaitDialog monitor)
        {
            GFEFormatGRF grf = (GFEFormatGRF)gfeFormat;
            if (grf == null)
            {
                MessageService.ShowError(GResources.GetResourceText(29450302)); //RC 29450302 : Chybný formát formulářové sestavy!
                return;
            }

            if (monitor != null)
                monitor.TaskName = GResources.GetResourceText(29450303); //RC 29450303 : načtení stránek...
            // lze získat i z manager.GetCollectionsCount(), ale tento počet se již určuje v metodě LoadPages
            int collectionsCount = LoadPages(grf);

            if (monitor != null)
                monitor.TaskName = GResources.GetResourceText(29450304); //RC 29450304 : načtení regionů...

            for (int index = 0; index < collectionsCount; index++)
                FillerService.LoadRegions(grf, manager.GetRootData(index), index * grf.PageCount, _View, Pages, Structure);

            AfterLoad();
        }
        void AfterLoad()
        {
            foreach (DefaultPage page in Pages)
                AfterLoad(page);
        }
        void AfterLoad(DefaultPage p)
        {
            foreach (ITagComponent c in p.All)
                if (c is DefaultAbstractContent ac)
                    ac.AfterLoad();
        }
    }
}
