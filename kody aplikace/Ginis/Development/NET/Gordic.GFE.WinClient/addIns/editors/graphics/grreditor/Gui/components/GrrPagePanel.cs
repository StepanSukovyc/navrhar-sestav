//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrrPagePanel.cs                        </Name>
//    <Description> panel GRR sestav                                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-22                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Drawing;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.GrrEditor;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.VariablesView;
using Gordic.General;
using Gordic.GFE.WinClient.Labels;
using Gordic.GFE.WinClient.LinkedFiles;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// panel GRR sestav
    /// </summary>
    class GrrPagePanel : APagePanel
    {
        #region AbstractPagePanel
        /// <summary>
        /// Kreslení stránky
        /// </summary>
        /// <param name="e"></param>
        /// <param name="graphics">ovladač grafiky</param>
        protected override void PaintPanel(PaintEventArgs e, Graphics graphics)
        {
            if (Document == null)
                return;

            // jako první vykreslíme stránku
            foreach (IPage page in Document.Pages)
                page.Paint(e.ClipRectangle, graphics, new PaintArgs());

            selectedArea?.Paint(graphics);
        }
        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        /// <param name="disposing">Indikuje stav uvolnění</param>
        protected override void Dispose(bool disposing)
        {
            ObjectInserted -= PpObjectInserted;
            ObjectInserting -= PpObjectInserting;
            SelectedObjectSizeChanged -= MethodSelectedObjectSizeChanged;

            if (_View is AGraphicViewContent)
                (_View as AGraphicViewContent).PropertyValueChanged -= PropertyValueChanged;

            RemoveEditControl(false);
            if (ServiceSelection != null)
                ServiceSelection.SelectionChanged -= ServiceSelectionSelectionChanged;
            IsDirtyChanged -= PagePanelIsDirtyChanged;
            _View = null;
            base.Dispose(disposing);
        }

        #region IKeyActionHandler
        /// <exclude/>
        public IComponent GetLeftObject()
        {
            if (ServiceSelection.PrimarySelection is IKeyActionHandler)
                return (ServiceSelection.PrimarySelection as IKeyActionHandler).GetLeftObject();
            else return null;
        }
        /// <exclude/>
        public virtual IComponent GetLeftObject(object obj) { return null; }
        /// <exclude/>
        public IComponent GetRightObject()
        {
            if (ServiceSelection.PrimarySelection is IKeyActionHandler)
                return (ServiceSelection.PrimarySelection as IKeyActionHandler).GetRightObject();
            else
                return null;
        }
        /// <exclude/>
        public virtual IComponent GetRightObject(object obj) { return null; }
        /// <exclude/>
        public IComponent GetTopObject()
        {
            if (ServiceSelection.PrimarySelection is IKeyActionHandler)
                return (ServiceSelection.PrimarySelection as IKeyActionHandler).GetTopObject();
            else
                return null;
        }
        /// <exclude/>
        public virtual IComponent GetTopObject(object obj, ISizable sizeable) { return null; }
        /// <exclude/>
        public IComponent GetBottomObject()
        {
            if (ServiceSelection.PrimarySelection is IKeyActionHandler)
                return (ServiceSelection.PrimarySelection as IKeyActionHandler).GetBottomObject();
            else
                return null;
        }
        /// <exclude/>
        public virtual IComponent GetBottomObject(object obj, ISizable sizeable) { return null; }
        #endregion

        /// <summary>
        /// generování základních funkcí tlačítek
        /// </summary>
        protected override void GenerateKeyActions()
        {
            base.GenerateKeyActions();

            keyactions[Keys.Left] = new AbstractKeyAction();
            keyactions[Keys.Left].OnActionEvent += delegate
            {
                if (EditControl == null)
                {
                    ApplySelected(GetLeftObject());
                    return ActionResult.execute_true;
                }
                return ActionResult.execute_false;
            };

            keyactions[Keys.Right] = new AbstractKeyAction();
            keyactions[Keys.Right].OnActionEvent += delegate
            {
                if (EditControl == null)
                {
                    ApplySelected(GetRightObject());
                    return ActionResult.execute_true;
                }
                return ActionResult.execute_false;
            };

            keyactions[Keys.Up] = new AbstractKeyAction();
            keyactions[Keys.Up].OnActionEvent += delegate
            {
                if (EditControl == null)
                {
                    ApplySelected(GetTopObject());
                    return ActionResult.execute_true;
                }
                return ActionResult.execute_false;
            };

            keyactions[Keys.Down] = new AbstractKeyAction();
            keyactions[Keys.Down].OnActionEvent += delegate
            {
                if (EditControl == null)
                {
                    ApplySelected(GetBottomObject());
                    return ActionResult.execute_true;
                }
                return ActionResult.execute_false;
            };
        }

        void ApplySelected(IComponent obj)
        {
            if (obj != null
                && obj is IKeyActionHandler)
            {
                SetSelectedComponents(obj, SelectionTypes.Replace);
                JumpTo(obj as ITagComponent);
                Invalidate();
            }
        }

        /// <exclude/>
        public override void ActualizeScrollScope(object sender, EventArgs e)
        {
            if (Pages != null && Pages.Count > 0)
            {
                // nastavíme novou oblast pro přetáčení
                AutoScrollMinSize = new Size(Pages.Size.Width + (int)((Pages.First() as GrrPage).LabelZone as GrrLabelZone).WidthZoom, Pages.Size.Height);

                // nastavíme odstupy od pravého a dolního okrajů pro přetáčení
                AutoScrollMargin = new Size(ReportDesignerProperties.Instance.PageLeft, ReportDesignerProperties.Instance.PageSpacing);
            }
        }

        /// <summary>
        /// přetížení kvůli spuštění vlákna na vypočet objektu pod myši
        /// </summary>
        /// <param name="e"></param>
        protected override void OnMouseMove(MouseEventArgs e)
        {
            if (Document != null && Document.Pages.Count != 0)
            {
                MouseEventArgs mea =
                    new MouseEventArgs(
                        e.Button,
                        e.Clicks,
                        e.X + HorizontalScroll.Value - ReportDesignerProperties.Instance.StepBetween,
                        (int)(e.Y + VerticalScroll.Value),
                        e.Delta);

                // pokud probíhá změna šířky jedné buňky, potom není třeba vyhledávát tažený objekt - ten je neměnný SS 21.2.2024
                SetTowedService(mea, DrawSquare != DrawSquares.nothing && IsChanging);

                TransformMouseEventArgs = e;
                Point contentBegin = (Document.Pages.First() as GrrPage).GetContentBegin(mea.X, mea.Y);
                if (e.Button == MouseButtons.Left)
                {
                    // možná se děla něco s vybranými komponentami ???
                    if (ServiceSelection != null
                        && DrawSquare != DrawSquares.nothing
                        && IsChanging)
                        // SS 9.9.2013
                        ChangeSize(ServiceSelection.SelectedComponents, TransformMouseEventArgsBegin, contentBegin);
                }
                else
                {
                    object focused = ServiceSelection.PrimarySelection;

                    // změna vzhledu kurzoru
                    ThreadService.SafeThreadAsyncCall(
                        delegate
                        {
                            // prázdný pohyb myši po ploše
                            if (IsSelectionCursorHandler()
                                && Document != null
                                && Document.Pages.Count > 0
                                && Document.Pages[0] is GrrPage)
                            {
                                int direction = -1;
                                if (focused is ITagComponent)
                                    Cursor = (focused as ICursorHandler).GetCursor(
                                        contentBegin,
                                        ref direction);
                                DrawSquare = (DrawSquares)direction;
                            }
                        });
                }
            }
            base.OnMouseMove(e);
        }
        /// <exclude/>
        protected override void OnDragDrop(DragEventArgs e)
        {
            Point p = PointToClient(new Point(e.X, e.Y));

            SetTowedObject(new MouseEventArgs(MouseButtons.Left, 0, p.X + HorizontalScroll.Value - ReportDesignerProperties.Instance.StepBetween, (int)(p.Y + VerticalScroll.Value), 0));

            dynamic draggedItem;
            if (e.Data.GetDataPresent(typeof(SideTabItem)) || e.Data.GetDataPresent(typeof(ReportDesignerSideTabItem)))
            {
                draggedItem = (SideTabItem)e.Data.GetData(typeof(SideTabItem));
                if (draggedItem == null)
                    draggedItem = (ReportDesignerSideTabItem)e.Data.GetData(typeof(ReportDesignerSideTabItem));

                if (!string.IsNullOrEmpty(Convert.ToString(draggedItem.Tag)))
                {
                    ComponentType type = ComponentType.none;
                    if (Enum.TryParse(Convert.ToString(draggedItem.Tag), out type))
                    {
                        UndoRedoService.StartTransaction(GResources.GetResourceText(29450050)); //RC 29450050 : nový objekt
                        InsertObject(draggedItem, new Point(e.X, e.Y), type);
                    }
                }
            }
            else if (e.Data.GetDataPresent(typeof(LFExtNode)))
            {
                draggedItem = (LFExtNode)e.Data.GetData(typeof(LFExtNode));
                UndoRedoService.StartTransaction(GResources.GetResourceText(29450050)); //RC 29450050 : nový objekt
                InsertObject(draggedItem, new Point(e.X, e.Y), ComponentType.image);
            }
            else if (e.Data.GetDataPresent(typeof(StructExtNode)))
            {
                draggedItem = e.Data.GetData(typeof(StructExtNode)) as StructExtNode;
                LoggingService.Info(GResources.GetResourceText(29450051) + "..."); //RC 29450051 : přetažení objektu z datové struktury
                InsertObject(draggedItem, new Point(e.X, e.Y), draggedItem.DataRegion != null ? ComponentType.region : ComponentType.valueof);
            }
            else if (e.Data.GetDataPresent(typeof(VarExtNode)))
            {
                draggedItem = e.Data.GetData(typeof(VarExtNode)) as VarExtNode;
                LoggingService.Info(GResources.GetResourceText(29450058) + "..."); //RC 29450058 : přetažení proměnné
                InsertObject(draggedItem, new Point(e.X, e.Y), ComponentType.variable);
            }
            if (UndoRedoService.IsTransactionStarted)
                UndoRedoService.Commit();

            ObjectsChangeLocker = false;
            IsDragOver = false;
        }

        /// <summary>
        /// nastavení umístění ovladače
        /// </summary>
        protected override void SetWidthAndLocation()
        {
            if (EditControl != null)
            {
                var owner = ServiceSelection.PrimarySelection as ITagComponent;
                var p = new Point((int)owner.LeftZoom, (int)owner.TopZoom + 2);

                if (owner.Page != null)
                    p.Offset((int)(owner.Page.MarginLeft * Zoom + owner.Page.LeftZoom + ReportDesignerProperties.Instance.StepBetween),
                        (int)(owner.Page.MarginTop * Zoom + owner.Page.TopZoom));

                var s = new Size((int)owner.WidthZoom - 4, (int)owner.HeightZoom - 4);
                p.Offset(-HorizontalScroll.Value, -VerticalScroll.Value);
                EditControl.Bounds = new Rectangle(p, s);
            }
        }
        /// <summary>
        /// Přetažení objektu nad stránkou
        /// </summary>
        /// <param name="e">parametry tažení</param>
        protected override void ActionDragOver(DragEventArgs e)
        {
            ThreadService.SafeThreadAsyncCall(
                delegate
                {
                    Point p = PointToClient(new Point(e.X, e.Y));
                    SetTowedObject(new MouseEventArgs(System.Windows.Forms.MouseButtons.Left, 0, p.X + HorizontalScroll.Value - ReportDesignerProperties.Instance.StepBetween, (int)(p.Y + VerticalScroll.Value), 0));
                });

            if (e.Data.GetData(typeof(StructExtNode)) is StructExtNode svtn)
            {
                if (TowedService.TowedObject is IParentable)
                    if ((TowedService.TowedObject as IParentable).Parent is ICell)
                    {
                        if (((TowedService.TowedObject as IParentable).Parent as ICell).Line.Type != LineType.body)
                            if (svtn.DataRegion != null)
                            {
                                e.Effect = DragDropEffects.None;
                                return;
                            }

                        if (svtn.DataItem != null
                            && svtn.DataItem.Region != null
                            && Convert.ToString(svtn.DataItem.Region.Name).Equals("root", StringComparison.InvariantCultureIgnoreCase))
                            e.Effect = DragDropEffects.Copy;
                        else e.Effect =
                            LocalCommonService.ValidateObject(((TowedService.TowedObject as IParentable).Parent as IGRRCell).ParentLabel, svtn.FullName, svtn.DataRegion != null)
                            ? DragDropEffects.Copy : DragDropEffects.None;
                    }
                return;
            }
            if (e.Data.GetData(typeof(VarExtNode)) is VarExtNode vvtn)
            {
                if (TowedService.TowedObject is IParentable)
                    if ((TowedService.TowedObject as IParentable).Parent is IGRRCell)
                        e.Effect =
                            LocalCommonService.ValidateObject(((TowedService.TowedObject as IParentable).Parent as IGRRCell).ParentLabel, vvtn.Variable.Region.DataFullName + '.', false)
                            ? DragDropEffects.Copy : DragDropEffects.None;
            }
        }
        /// <summary>
        /// Tažení nad objektem.
        /// Lze přetahovat:
        /// - objekty stránky
        /// - datové položky z datové struktury
        /// </summary>
        /// <param name="e"></param>
        protected override void OnDragOver(DragEventArgs e)
        {
            if (e.Data.GetDataPresent(typeof(StructExtNode))
                || e.Data.GetDataPresent(typeof(VarExtNode))
                || e.Data.GetDataPresent(typeof(LFExtNode))
                || e.Data.GetDataPresent(typeof(ReportDesignerSideTabItem)))
            {
                // najdeme pozici myši vůči stránce
                Point dragpoint = GetDragPoint(e);
                // najdeme stránku, nad kterou se pohybujeme myši
                // a uskutečníme činnost OnDragOver s parametry drgevent, dragPoint
                if (!Document.Pages.ForFirstBool(pg => pg.BoundsInPixels.Contains(dragpoint), OnDragOver, e, dragpoint))
                    // nepohybujeme se nad žádnou stránkou
                    e.Effect = DragDropEffects.None;
            }
            else
                base.OnDragOver(e);
        }

        /// <summary>
        /// Přidání položky ze struktury dat do sestavy
        /// </summary>
        /// <param name="info">informace o přidávané položce</param>
        /// <param name="e">data o myší</param>
        /// <param name="type">Typ přidávané položky</param>
        protected override IComponent CreateItem(dynamic info, ComponentType type, MouseEventArgs e = null)
        {
            if (ServiceSelection.SelectedComponents.Count == 0)
                return null;

            List<IComponent> results = new List<IComponent>();
            foreach (var item in ServiceSelection.SelectedComponents)
            {
                dynamic selected = item is URAbstractContainer
                    ? item as URAbstractContainer
                    : (item is ITagComponent
                    ? (item as ITagComponent).Parent as URAbstractContainer
                    : null);

                if (selected != null)
                {
                    if (!UndoRedoService.IsTransactionStarted)
                        UndoRedoService.StartTransaction(GResources.GetResourceText(29450052)); //RC 29450052 : vytvoření nové datové položky
                    results.Add(selected.CreateItem(info, e, type));
                }
                else
                    MessageService.ShowWarning(GResources.GetResourceText(29450053)); //RC 29450053 : Položku nelze vytvořit!
            }

            if (results.Count != 0)
                return results[0];

            return null;
        }

        /// <summary>
        /// Změna velikosti vybraného objektu
        /// </summary>
        /// <param name="actualFocused">objekt, kterému se měni parametry</param>
        /// <param name="_xPixels">změna po X</param>
        /// <param name="_yPixels">změna po Y</param>
        /// <param name="contentBegin">začátek obsahu</param>
        /// <param name="isFirst">se jedná o první vybraný objekt</param>
        protected override void ChangeSize(IChangeable actualFocused, ref float _xPixels, ref float _yPixels, Point contentBegin, bool isFirst = true)
        {
            if (actualFocused == null)
                return;

            // PropertyScale u všech vlastnosti se přiřazuje 
            // jen kvůli aktivaci občerstvení hodnoty dané vlastnosti objektu
            switch (DrawSquare)
            {
                case DrawSquares.leftTop:
                    if (isFirst)
                    {
                        _xPixels = AlignXByResolution(_xPixels, actualFocused);
                        _yPixels = AlignYByResolution(_yPixels, actualFocused);
                    }

                    // případ změny velikosti pomocí levé strány objektu
                    actualFocused.SetWidthByLeftSide(_xPixels);
                    // případ změny velikosti pomocí levé strány objektu
                    actualFocused.SetHeightByTopSide(_yPixels);
                    break;
                case DrawSquares.top:
                    if (isFirst)
                        _yPixels = AlignYByResolution(_yPixels, actualFocused);

                    // případ změny velikosti pomocí levé strány objektu
                    actualFocused.SetHeightByTopSide(_yPixels);
                    break;
                case DrawSquares.rightTop:
                    if (isFirst)
                    {
                        _xPixels = AlignXByResolution(_xPixels, actualFocused);
                        _yPixels = AlignYByResolution(_yPixels, actualFocused);
                    }

                    // případ změny velikosti pomocí pravé strány objektu
                    actualFocused.SetWidthByRightSide(_xPixels);
                    // případ změny velikosti pomocí levé strány objektu
                    actualFocused.SetHeightByTopSide(_yPixels);
                    break;
                case DrawSquares.left:
                    if (isFirst)
                        _xPixels = AlignXByResolution(_xPixels, actualFocused);

                    // případ změny velikosti pomocí levé strány objektu
                    actualFocused.SetWidthByLeftSide(_xPixels);
                    break;
                case DrawSquares.right:
                    if (isFirst)
                        _xPixels = AlignXByResolution(_xPixels, actualFocused);

                    // případ změny velikosti pomocí pravé strány objektu
                    actualFocused.SetWidthByRightSide(_xPixels);
                    break;
                case DrawSquares.leftBottom:
                    if (isFirst)
                    {
                        _xPixels = AlignXByResolution(_xPixels, actualFocused);
                        _yPixels = AlignYByResolution(_yPixels, actualFocused);
                    }

                    actualFocused.SetWidthByLeftSide(_xPixels);
                    actualFocused.SetHeightByBottomSide(_yPixels);
                    break;
                case DrawSquares.bottom:
                    if (isFirst)
                        _yPixels = AlignYByResolution(_yPixels, actualFocused);
                    actualFocused.SetHeightByBottomSide(_yPixels);
                    break;
                case DrawSquares.rightBottom:
                    if (isFirst)
                    {
                        _xPixels = AlignXByResolution(_xPixels, actualFocused);
                        _yPixels = AlignYByResolution(_yPixels, actualFocused);
                    }
                    actualFocused.SetWidthByRightSide(_xPixels);
                    actualFocused.SetHeightByBottomSide(_yPixels);
                    break;
            }

            OnSizeChanged(actualFocused, new Point((int)(_xPixels * Zoom), (int)(_yPixels * Zoom)));
        }
        #endregion

        #region APagePanel
        /// <summary>
        /// Přidání položek ze seznamu do sestavy
        /// </summary>
        /// <param name="objects">Přidávané položky</param>
        /// <param name="e">Pozice vložení</param>
        protected override List<IComponent> InsertTagComponents(List<object> objects, PointF e)
        {
            List<IComponent> result = new List<IComponent>();
            //SS fix 5.9.2013
            for (int i = objects.Count - 1; i >= 0; i--)
                if (objects[i] is StructExtNode)
                    InsertObject(objects[i], (objects[i] as StructExtNode).DataRegion != null ? ComponentType.region : ComponentType.valueof);
                else if (objects[i] is AbstractContent)
                    InsertObject(objects[i], (objects[i] as AbstractContent).ComponentType);
            return result;
        }
        #endregion

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        private GrrPagePanel()
            : base()
        {
            InitializeComponent();
            ObjectInserted += PpObjectInserted;
            ObjectInserting += PpObjectInserting;
            SelectedObjectSizeChanged += MethodSelectedObjectSizeChanged;
        }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="view">pohled na obsah, kterému patří daný panel</param>
        public GrrPagePanel(IViewContent view)
            : this()
        {
            this._View = view;

            if (ServiceSelection != null)
                ServiceSelection.SelectionChanged += ServiceSelectionSelectionChanged;

            if (view is AGraphicViewContent)
                (view as AGraphicViewContent).PropertyValueChanged += PropertyValueChanged;

            IsDirtyChanged += PagePanelIsDirtyChanged;
        }

        void PropertyValueChanged(object s, PropertyValueChangedEventArgs e)
        {
            if (ServiceSelection != null)
            {
                if (e.OldValue is SizeValue
                    ||
                    (
                    e.ChangedItem != null
                    && e.ChangedItem.PropertyDescriptor != null
                    && e.ChangedItem.PropertyDescriptor.Converter is SizeValueConverter)
                    )
                {
                    List<ILine> lines = ServiceSelection.SelectedComponents
                        .Select(itm => itm is IParentable && (itm as IParentable).Parent is IGRRCell ? ((itm as IParentable).Parent as IGRRCell).Line : null)
                        .Distinct()
                        .ToList()
                        .FindAll(cm => cm != null);

                    if (lines.Count != 0)
                        lines.ForEach(ValueChanged);
                }
            }
        }
        void ValueChanged(ILine obj)
        {
            (obj as IGRRLine).RefreshTopHeight();
            (obj as IGRRLine).RefreshWidthLeft();
        }
        void InitializeComponent()
        {
            selectedArea = new SelectedArea(this);
            this.SuspendLayout();
            this.AllowDrop = true;
            SetStyle(ControlStyles.AllPaintingInWmPaint | ControlStyles.UserPaint | ControlStyles.OptimizedDoubleBuffer, true);
            SetStyle(ControlStyles.Selectable, true);
            AutoScroll = true;
            Dock = DockStyle.Fill;
            this.ResumeLayout(false);
        }
        void PpObjectInserted(object sender, EventArgsListIComponent e)
        {
            if (e.Argument == null)
                return;

            if (e.Argument.Count != 0)
            {
                if (UndoRedoService.IsTransactionStarted)
                    UndoRedoService.Commit();

                ServiceSelection.SetSelectedComponents(e.Argument.ToArray(), SelectionTypes.Replace);
                Invalidate();
            }
            else if (UndoRedoService.IsTransactionStarted)
                UndoRedoService.FlushHistory();
        }
        void PpObjectInserting(object sender, MouseEventArgs e)
        {
            // jen při tažení objektů
            if (IsDragOver)
            {
                List<IComponent> item = SearchComponent(e.Location);
                if (item != null && item.Count > 0)
                    SetSelectedComponents(item.First(), SelectionTypes.Replace);
            }
        }
        void PagePanelIsDirtyChanged(object sender, EventArgs e) { if (IsDirty) (_View as GrrViewContent).MakeDirty(); }
        void ServiceSelectionSelectionChanged(object sender, EventArgs e) { if (EditControl != null) RemoveEditControl(true); }
        void MethodSelectedObjectSizeChanged(object sender, EventArgsDynamic e)
        {
            if (e == EventArgs.Empty || e.Argument == null)
                return;

            if (e.Argument is IList<IChangeable>)
                foreach (var item in (e.Argument as IList<IChangeable>))
                    MethodSelectedObjectSizeChanged(this, new EventArgsDynamic(item));
            else
                if (e.Argument is IGRR && e.Argument.Line != null)
                switch (DrawSquare)
                {
                    case DrawSquares.right:
                    case DrawSquares.left:
                        e.Argument.IsWidthByContent = false;
                        e.Argument.Line.RefreshWidthLeft();
                        // po změně velikosti objektů musíme přepočítát velikost řádku, který je dle obsahu
                        if (e.Argument.Line.IsHeightByContent)
                            e.Argument.Line.IsHeightByContent = true;
                        break;
                    case DrawSquares.bottom:
                    case DrawSquares.top:
                        e.Argument.Line.RefreshTopHeight();
                        break;
                    case DrawSquares.leftBottom:
                    case DrawSquares.leftTop:
                    case DrawSquares.rightBottom:
                    case DrawSquares.rightTop:
                        e.Argument.IsWidthByContent = false;
                        e.Argument.Line.RefreshWidthLeft();
                        // po změně velikosti objektů musíme přepočítát velikost řádku, který je dle obsahu
                        if (e.Argument.Line.IsHeightByContent)
                            e.Argument.Line.IsHeightByContent = true;
                        else
                            e.Argument.Line.RefreshTopHeight();
                        break;
                    default:
                        break;
                }
        }
    }
}
