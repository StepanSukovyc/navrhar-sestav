//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.PagePanel.cs                             </Name>
//    <Description> Pagepanel GRF sestav                                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
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
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.Editor;
using System.Threading.Tasks;
using Gordic.General;
using Gordic.GFE.WinClient.LinkedFiles;

namespace Gordic.GFE.WinClient.GrfEditor
{
    /// <summary>
    /// Pagepanel GRF sestav
    /// </summary>
    class GrfPagePanel : APagePanel
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

            if (selectedArea != null)
                selectedArea.Paint(graphics);
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

            RemoveEditControl(false);
            if (ServiceSelection != null)
                ServiceSelection.SelectionChanged -= ServiceSelectionSelectionChanged;
            IsDirtyChanged -= PagePanelIsDirtyChanged;
            _View = null;
            base.Dispose(disposing);
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

            // zafixujeme velikost
            RectangleF b = actualFocused.BoundsInPixels;

            /*zaokrouhlení velikosti*/
            //zkorigujeme veličinu změny dle toho, zda uživatel si přeje zaokrouhlovat šířku či nikoliv
            _xPixels = AlignXByResolution(_xPixels, actualFocused);
            _yPixels = AlignYByResolution(_yPixels, actualFocused, new SizeValue("1" + (actualFocused as ISizable).Height.Metrics));
            /*zaokrouhlení ^*/

            // PropertyScale u všech vlastnosti se přiřazuje 
            // jen kvůli aktivaci občerstvení hodnoty dané vlastnosti objektu
            switch (DrawSquare)
            {
                case DrawSquares.leftTop:
                    // případ změny velikosti pomocí levé strány objektu
                    actualFocused.SetWidthByLeftSide(_xPixels);
                    // případ změny velikosti pomocí levé strány objektu
                    actualFocused.SetHeightByTopSide(_yPixels);
                    break;
                case DrawSquares.top:
                    // případ změny velikosti pomocí levé strány objektu
                    actualFocused.SetHeightByTopSide(_yPixels);
                    break;
                case DrawSquares.rightTop:
                    // případ změny velikosti pomocí pravé strány objektu
                    actualFocused.SetWidthByRightSide(_xPixels);
                    // případ změny velikosti pomocí levé strány objektu
                    actualFocused.SetHeightByTopSide(_yPixels);
                    break;
                case DrawSquares.left:
                    // případ změny velikosti pomocí levé strány objektu
                    actualFocused.SetWidthByLeftSide(_xPixels);
                    break;
                case DrawSquares.right:
                    // případ změny velikosti pomocí pravé strány objektu
                    actualFocused.SetWidthByRightSide(_xPixels);
                    break;
                case DrawSquares.leftBottom:
                    actualFocused.SetWidthByLeftSide(_xPixels);
                    actualFocused.SetHeightByBottomSide(_yPixels);
                    break;
                case DrawSquares.bottom:
                    actualFocused.SetHeightByBottomSide(_yPixels);
                    break;
                case DrawSquares.rightBottom:
                    actualFocused.SetWidthByRightSide(_xPixels);
                    actualFocused.SetHeightByBottomSide(_yPixels);
                    break;
            }
            if (actualFocused is GrfRegion)
                (actualFocused as GrfRegion).ChangeLocation(b, actualFocused.BoundsInPixels, this.Zoom);

            OnSizeChanged(actualFocused, new Point((int)(_xPixels * Zoom), (int)(_yPixels * Zoom)));
        }
        #endregion

        #region APagePanel
        /// <exclude/>
        protected override void OnMouseMove(MouseEventArgs e)
        {
            base.OnMouseMove(e);

            MouseEventArgs mea =
                new MouseEventArgs(
                    e.Button,
                    e.Clicks,
                    e.X + HorizontalScroll.Value
                    , e.Y + VerticalScroll.Value,
                    e.Delta);
            // TODOD
            IsDragOver = (Control.MouseButtons & MouseButtons.Left) == MouseButtons.Left && !IsDragOver;

            SetTowedService(mea, DrawSquare != DrawSquares.nothing && IsChanging);

            TransformMouseEventArgs = e;
            // je zmačklé levé tlačítko myši
            if (e.Button == MouseButtons.Left)
            {
                // případ vyběru objektů pomocí myší a tlačítka Ctrl (tažením)
                if (Control.ModifierKeys == Keys.Control
                    || ServiceSelection == null
                    || (ServiceSelection.SelectedComponents.Count == 1
                    && ServiceSelection.PrimarySelection is IPage)
                    || !selectedArea.IsEmpty)
                {
                    selectedArea.RefreshSize(e);

                    // pokud existuje nějaký výběrový rámeček (má šířku a výšku), pak provedeme výběr 
                    if (selectedArea.ExistArea)
                    {
                        // odstraníme z výběru stránky
                        ServiceSelection.RemovePages();
                        SetSelectedByArea(selectedArea.Area);
                    }
                }
                // možná se děla něco s vybranými komponentami ???
                else if (ServiceSelection != null)
                {
                    if (IsChanging)
                    {
                        // SS 9.9.2013
                        MouseEventArgs mouseBegin = TransformMouseEventArgsBegin;
                        bool isFirst = true;
                        foreach (var item in ServiceSelection.SelectedComponents)
                        {
                            ActionChange(item as IChangeable, mouseBegin, isFirst);
                            isFirst = false;
                        }
                    }
                    else if (IsDragOver)
                        ActionChange(ServiceSelection.PrimarySelection as IChangeable, TransformMouseEventArgsBegin, true);
                }
            }
            else
            {
                ObjectsChangeLocker = false;
                // změna vzhledu kurzoru
                ThreadService.SafeThreadAsyncCall(
                    delegate
                    {
                        // prázdný pohyb myši po ploše
                        if (IsSelectionCursorHandler())
                        {
                            int direction = -1;
                            Cursor = (ServiceSelection.PrimarySelection as ICursorHandler).GetCursor(new PointF(e.X + HorizontalScroll.Value, e.Y + VerticalScroll.Value), ref direction);
                            DrawSquare = (DrawSquares)direction;
                        }
                    });
            }
        }
        /// <exclude/>
        protected override void OnDragDrop(DragEventArgs e)
        {
            Point p = PointToClient(new Point(e.X, e.Y));
            dynamic draggedItem;
            if (e.Data.GetDataPresent(typeof(SideTabItem))
                || e.Data.GetDataPresent(typeof(ReportDesignerSideTabItem)))
            {
                draggedItem = (SideTabItem)e.Data.GetData(typeof(SideTabItem));
                if (draggedItem == null)
                    draggedItem = (ReportDesignerSideTabItem)e.Data.GetData(typeof(ReportDesignerSideTabItem));
                UndoRedoService.StartTransaction(GResources.GetResourceText(29450050)); //RC 29450050 : nový objekt
                bool isCreated = false;
                ComponentType type = ComponentType.none;
                if (!string.IsNullOrEmpty(Convert.ToString(draggedItem.Tag)))
                    if (Enum.TryParse(Convert.ToString(draggedItem.Tag), out type))
                        if (type == ComponentType.page)
                        {
                            (Document as GrfFormationDocument).CreatePage();
                            isCreated = true;
                        }
                if (!isCreated)
                    InsertObject(draggedItem, new Point(e.X, e.Y), type);
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
            // tažení objektů
            if (!e.Data.GetDataPresent(typeof(SideTabItem)) && e.Data.GetDataPresent(typeof(List<object>)))
            {
                // Manuálně startujeme transakci pro drag operaci (ComponentChanging je blokován ObjectsChangeLocker)
                if (!UndoRedoService.IsTransactionStarted)
                    UndoRedoService.StartTransaction(GResources.GetResourceText(29450050)); //RC 29450050 : nový objekt

                List<object> draggedItems = (List<object>)e.Data.GetData(typeof(List<object>));
                List<object> movedItems = new List<object>();
                URAbstractContainer dropTarget = GetDropTargetFromLocation(e) ?? GetCurrentDropTargetContainer();

                if (dropTarget != null)
                    movedItems = SetParent(draggedItems, dropTarget);

                // Pokud byly objekty úspěšně přesunuty, provedeme zarovnání
                if (movedItems.Count > 0)
                {
                    movedItems.ForEach(AlignByResolution);
                    movedItems.ForEach(ResizeByResolution);
                }
                else 
                {
                    // Žádný objekt nebyl přesunut - musíme vrátit VŠECHNY změny včetně pozic
                    RestoreOriginalPositions();

                    if (UndoRedoService.IsTransactionStarted)
                        UndoRedoService.FlushHistory();
                }
            }
            if (UndoRedoService.IsTransactionStarted)
                UndoRedoService.Commit();

            ObjectsChangeLocker = false;
            IsDragOver = false;
        }

        URAbstractContainer GetDropTargetFromLocation(DragEventArgs e)
        {
            if (e == null)
                return null;

            Point clientPoint = PointToClient(new Point(e.X, e.Y));
            int adjustedX = clientPoint.X + HorizontalScroll.Value - ReportDesignerProperties.Instance.StepBetween;
            int adjustedY = clientPoint.Y + VerticalScroll.Value;

            SetTowedObject(new MouseEventArgs(MouseButtons.Left, 0, adjustedX, adjustedY, 0));

            URAbstractContainer target = GetCurrentDropTargetContainer();
            if (target != null)
                return target;

            List<IComponent> hoveredComponents = SearchComponent(clientPoint);
            if (hoveredComponents != null && hoveredComponents.Count > 0)
                return ResolveTargetContainer(hoveredComponents.Cast<object>().ToList());

            return null;
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

            dynamic selected = GetInsertTargetFromLocation(e) ?? GetCurrentInsertTarget();

            if (selected == null)
            {
                MessageService.ShowWarning(GResources.GetResourceText(29450053)); //RC 29450053 : Položku nelze vytvořit!
                return null;
            }

            if (!ValidateDataSchemaForInsert(info, selected))
                return null;

            if (!UndoRedoService.IsTransactionStarted)
                UndoRedoService.StartTransaction(GResources.GetResourceText(29450052)); //RC 29450052 : vytvoření nové datové položky

            return selected.CreateItem(info, e, type, Document._FormationProperty.Format);
        }

        object GetInsertTargetFromLocation(MouseEventArgs e)
        {
            if (e == null)
                return null;

            int adjustedX = e.X + HorizontalScroll.Value - ReportDesignerProperties.Instance.StepBetween;
            int adjustedY = e.Y + VerticalScroll.Value;
            SetTowedObject(new MouseEventArgs(MouseButtons.Left, 0, adjustedX, adjustedY, 0));

            return GetCurrentInsertTarget();
        }
        /// <summary>
        /// Odstranění stránky ze seznamu stránek
        /// </summary>
        /// <param name="page">Stránka k odstranění</param>
        public override void RemovePage(IPage page) => (Document as GrfFormationDocument).RemovePage(page);

        #region InsertTagComponents Helpers
        /// <summary>
        /// Pokusí se vložit tag komponentu do vybraného kontejneru
        /// </summary>
        /// <param name="clone">Klonovaný objekt k vložení</param>
        /// <param name="selected">Vybraný kontejner nebo tag</param>
        /// <param name="position">Pozice vložení</param>
        /// <param name="isDiff">Zda je pozice relativní</param>
        /// <returns>True pokud byl objekt úspěšně vložen</returns>
        bool TryInsertClonedTag(object clone, object selected, PointF position, bool isDiff)
        {
            if (!ValidateDataSchemaForInsert(clone, selected))
                return false;

            if (selected is URAbstractContainer container)
            {
                container.InsertTagComponent(clone, position, isDiff);
                return true;
            }

            if (selected is ITagComponent tag && tag.Parent is URAbstractContainer parentContainer)
            {
                parentContainer.InsertTagComponent(clone, position, isDiff);
                return true;
            }

            MessageService.ShowWarning(GResources.GetResourceText(29450054)); //RC 29450054 : Objekt nelze vytvořit!
            UndoRedoService.FlushHistory();
            return false;
        }
        #endregion

        /// <summary>
        /// Přidání položek ze seznamu do sestavy
        /// </summary>
        /// <param name="objects">Přidávané položky</param>
        /// <param name="e">Pozice vložení</param>
        protected override List<IComponent> InsertTagComponents(List<object> objects, PointF e)
        {
            List<IComponent> result = new List<IComponent>();
            float diffX = 0, diffY = 0;
            bool isDiff = false;

            object selected = ServiceSelection.SelectedComponents[0];

            foreach (var item in objects)
            {
                if (item is StructExtNode node)
                {
                    InsertObject(node, PointToScreen(new Point((int)e.X, (int)e.Y)), 
                        node.DataRegion != null ? ComponentType.region : ComponentType.valueof);
                    continue;
                }

                if (!(item is ICloneable cloneable))
                    continue;

                object clone = cloneable.Clone();
                if (!(clone is ITagComponent tag))
                    continue;

                float originalLeft = tag.Left;
                float originalTop = tag.Top;

                if (!TryInsertClonedTag(clone, selected, isDiff ? new PointF(diffX, diffY) : e, isDiff))
                    continue;

                if (!isDiff)
                {
                    isDiff = true;
                    diffX = tag.Left - originalLeft;
                    diffY = tag.Top - originalTop;
                }

                if (clone is URAbstractContainer container)
                    container.ShiftItems(diffX, diffY);

                result.Add(tag);
            }

            return result;
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
            if (e.Data.GetDataPresent(typeof(List<object>)))
            {
                //Zjistíme pozici kurzoru vůči ploše
                Point pointToClient = PointToClient(new Point(e.X, e.Y));
                // zafixujeme zvětšení
                float zoom = GraphicSettingService.Zoom;
                // najdeme pozici myši vůči zvětšené stránce
                PointF dragPoint = new PointF(pointToClient.X + HorizontalScroll.Value, pointToClient.Y + VerticalScroll.Value);

                // najdeme stránku, nad kterou se pohybujeme myši
                // a uskutečníme činnost OnDragOver s parametry drgevent, dragPoint
                if (!Document.Pages.ForFirstBool(pg => pg.BoundsInPixels.Contains(dragPoint), OnDragOver, e, pointToClient))
                    // nepohybujeme se nad žádnou stránkou
                    e.Effect = DragDropEffects.None;
            }
            else if (e.Data.GetDataPresent(typeof(StructExtNode))
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
        /// Přetažení objektu nad stránkou
        /// </summary>
        /// <param name="drgevent">parametry tažení</param>
        protected override void ActionDragOver(DragEventArgs drgevent)
        {
            Point clientPoint = PointToClient(new Point(drgevent.X, drgevent.Y));
            int adjustedX = clientPoint.X + HorizontalScroll.Value - ReportDesignerProperties.Instance.StepBetween;
            int adjustedY = clientPoint.Y + VerticalScroll.Value;

            SetTowedObject(new MouseEventArgs(MouseButtons.Left, 0, adjustedX, adjustedY, 0));

            if (drgevent.Data.GetData(typeof(StructExtNode)) is StructExtNode svtn)
            {
                if (TowedService.TowedObject is IParentable)
                    if ((TowedService.TowedObject as IParentable).Parent is ICell)
                    {
                        if (((TowedService.TowedObject as IParentable).Parent as ICell).Line.Type != LineType.body)
                            if (svtn.DataRegion != null)
                            {
                                drgevent.Effect = DragDropEffects.None;
                                return;
                            }

                        if (svtn.DataItem != null
                            && svtn.DataItem.Region != null
                            && Convert.ToString(svtn.DataItem.Region.Name).Equals("root", StringComparison.InvariantCultureIgnoreCase))
                            drgevent.Effect = DragDropEffects.Copy;
                        else drgevent.Effect =
                            LocalCommonService.ValidateObject(((TowedService.TowedObject as IParentable).Parent as IGRRCell).ParentLabel, svtn.FullName, svtn.DataRegion != null)
                            ? DragDropEffects.Copy : DragDropEffects.None;
                    }
                return;
            }

            if (drgevent.Data.GetDataPresent(typeof(List<object>)))
            {
                List<object> draggedItems = drgevent.Data.GetData(typeof(List<object>)) as List<object>;
                URAbstractContainer targetContainer = GetCurrentDropTargetContainer();

                if (draggedItems == null || targetContainer == null)
                {
                    drgevent.Effect = DragDropEffects.None;
                    return;
                }

                string targetRegionLabel = GetRegionLabel(targetContainer);
                bool isValid = true;

                foreach (ITagComponent tag in draggedItems.OfType<ITagComponent>())
                {
                    if (targetContainer == tag || (draggedItems.Contains(tag.Parent) && !(tag.Parent is GrfPage)))
                        continue;

                    if (!ValidateDataSchemaForMove(tag, targetRegionLabel, targetContainer, false))
                    {
                        isValid = false;
                        break;
                    }
                }

                drgevent.Effect = isValid ? DragDropEffects.Move : DragDropEffects.None;
                return;
            }
        }
        #endregion

        List<Task> toweds = new List<Task>();

        // Uložení původních pozic objektů před drag operací
        private Dictionary<ITagComponent, (float Left, float Top, URAbstractContainer Parent)> originalPositions;

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        private GrfPagePanel()
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
        public GrfPagePanel(IViewContent view)
            : this()
        {
            _View = view;

            if (ServiceSelection != null)
                ServiceSelection.SelectionChanged += ServiceSelectionSelectionChanged;

            IsDirtyChanged += PagePanelIsDirtyChanged;
        }

        /// <summary>
        /// Výběr objektů dle oblastí
        /// </summary>
        /// <param name="_area">Oblast na ploše, ve které se vybírají objekty</param>
        void SetSelectedByArea(ComplexSurroundWidth _area)
        {
            RectangleF _rects = new RectangleF((float)_area.LeftPixels, (float)_area.TopPixels, (float)(_area.RightPixels - _area.LeftPixels), (float)(_area.BottomPixels - _area.TopPixels));

            // najdeme na stránkách všechny objekty z oblasti _area
            Document.Pages.ForEach(pg => pg.BoundsInPixels.IntersectsWith(_rects), SetSelectedByArea, _rects);
            Repaint();
        }
        void SetSelectedByArea(IPage page, params object[] _area) 
        {
            if (page is URAbstractContainer container)
                SetSelectedByArea(container, (RectangleF)_area[0]);
        }

        void SetSelectedByArea(URAbstractContainer container, RectangleF rect)
        {
            if (container == null)
                return;

            // hledáme v konataineru objekty, které patří oblasti
            foreach (ITagComponent item in container)
            {
                if (item is IPageBackground && (item as IPageBackground).BackType)
                    continue;
                bool itemSelected = ServiceSelection.GetComponentSelected(item)
                , intersect = item.BoundsInPixels.IntersectsWith(rect);

                //Zjistíme, zda daný objekt má průnik s danou oblasti
                //Pokud průnik MÁ, pak daný objekt přidáme do seznamu vybraných objektů
                if (intersect && !itemSelected)
                    ServiceSelection.SetSelectedComponents(item, SelectionTypes.Add);
                // pokud průnik NEMÁ, pak daný objekt ze seznamu odstraníme
                else if (!intersect && itemSelected)
                    ServiceSelection.SetSelectedComponents(item, SelectionTypes.Remove);

                if (item is URAbstractContainer)
                    SetSelectedByArea(item as URAbstractContainer, rect);
            }
        }
        void PagePanelIsDirtyChanged(object sender, EventArgs e)
        {
            if (IsDirty)
                (_View as GrfViewContent).MakeDirty();
        }
        void ServiceSelectionSelectionChanged(object sender, EventArgs e)
        {
            ResetInteractionState();

            if (EditControl != null)
                RemoveEditControl(true);
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
        /// <summary>
        /// Rekurzivně uloží původní pozice objektu a všech jeho vnořených objektů
        /// </summary>
        /// <param name="tag">Objekt k uložení</param>
        void SaveOriginalPositionsRecursive(ITagComponent tag)
        {
            if (tag == null)
                return;

            // Uložíme pozici aktuálního objektu
            if (tag.Parent is URAbstractContainer parent)
            {
                originalPositions[tag] = (tag.Left, tag.Top, parent);
            }

            // Pokud je to kontejner, rekurzivně uložíme i všechny vnořené objekty
            if (tag is URAbstractContainer container)
            {
                foreach (ITagComponent child in container)
                {
                    SaveOriginalPositionsRecursive(child);
                }
            }
        }

        void ActionChange(IChangeable actualFocused, MouseEventArgs mouseBegin, bool isFirst)
        {
            // případ změny velikosti
            if (IsChanging)
            {
                if (actualFocused == null)
                    return;

                ChangeSize(actualFocused, mouseBegin, new Point(0, 0));
            }
            // tažení - nesmí být zámek na opuštění myši, 
            // jinak by to znamenalo, že se nesmí volat metoda tažení
            else if (ServiceSelection.PrimarySelection != null)
            {
                // musíme zjistit, zda myš se nachází nad nějakým vybraným objektem
                if (ServiceSelection.SelectedComponents?.Find(obj => obj is IZoomSizable
                    && (obj as IZoomSizable).BoundsInPixels.Contains(new Point(TransformMouseEventArgs.X + HorizontalScroll.Value, TransformMouseEventArgs.Y + VerticalScroll.Value))) != null)
                {
                    // přetahovat jde ppouze objekty, které nejsou vázané na buňky
                    if (!ServiceSelection.SelectedComponents.Exists(itm => itm is IParentable && (itm as IParentable).Parent is ICell))
                    {
                        // například poku neexistuje Datová struktura
                        if (ServiceSelection.SelectedComponents.Exists(itm => itm is IParentable && !(itm as IParentable).ReadOnly))
                        {
                            // Rekurzivně uložíme původní pozice objektů včetně všech vnořených
                            originalPositions = new Dictionary<ITagComponent, (float, float, URAbstractContainer)>();
                            foreach (var component in ServiceSelection.SelectedComponents)
                            {
                                if (component is ITagComponent tag)
                                {
                                    SaveOriginalPositionsRecursive(tag);
                                }
                            }

                            // uzamkneme objekty pro práci s nimi
                            ObjectsChangeLocker = true;
                            DoDragDrop(ServiceSelection.SelectedComponents, DragDropEffects.Move);
                        }
                        else 
                            MessageService.ShowWarning(GResources.GetResourceText(2945201).Replace("\\r\\n", "\r\n")); //RC 2945201 : Vybrané objekty nelze editovat.\r;Pro úpravy použijte textový režim
                    }
                }
                // jinak vybereme objekt pod myši
                else
                {
                    List<IComponent> component = SearchComponent(TransformMouseEventArgs.Location);
                    if (component != null && component.Count > 0 && !(component.First() is IPage))
                    {
                        //...vybereme objekt pod kurzorem 
                        SetSelectedComponents(component.First(), SelectionTypes.Replace);
                        Invalidate();
                    }
                }
            }
        }
        void PpObjectInserting(object sender, MouseEventArgs e)
        {
            int adjustedX = e.X + HorizontalScroll.Value - ReportDesignerProperties.Instance.StepBetween;
            int adjustedY = e.Y + VerticalScroll.Value;

            SetTowedObject(new MouseEventArgs(MouseButtons.Left, 0, adjustedX, adjustedY, 0));

            if (GetCurrentInsertTarget() is IComponent target)
            {
                SetSelectedComponents(target, SelectionTypes.Replace);
                return;
            }

            List<IComponent> item = SearchComponent(e.Location);
            if (item != null && item.Count > 0)
                SetSelectedComponents(item.First(), SelectionTypes.Replace);
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
        void ResizeByResolution(object obj)
        {
            if (!(obj is ITagComponent component))
                return;

            SizeValue resolution = Pages.AttrList.TryGetValue("paper-resolution", out string value) 
                ? new SizeValue(value) 
                : GraphicSettingService.Resolution;

            if (ReportDesignerProperties.Instance.AlignWidthMove)
            {
                float width = CommonService.AlignValueByResolution(component.Width, resolution);
                if (Math.Ceiling((component.Width - width) * 100) != 0)
                    component.Width = new SizeValue(width, component.Width.Metrics);
            }

            if (ReportDesignerProperties.Instance.AlignHeightMove)
            {
                float height = CommonService.AlignValueByResolution(component.Height, resolution);
                if (Math.Ceiling((component.Height - height) * 100) != 0)
                    component.Height = new SizeValue(height, component.Height.Metrics);
            }
        }
        /// <summary>
        /// Zarovnání objektu dle rozlišení
        /// </summary>
        /// <param name="obj">Objekt k zarovnání</param>
        void AlignByResolution(object obj)
        {
            if (!(obj is ITagComponent component))
                return;

            SizeValue resolution = Pages.AttrList.TryGetValue("paper-resolution", out string value) 
                ? new SizeValue(value) 
                : GraphicSettingService.Resolution;
            // změníme pozici TOP, jestli jsme objekt přemístili ze stránky A na stránku B
            int change = SetTopByNewPage(component);
            while (change == -1)
                change = SetTopByNewPage(component);

            // zjistíme nové hodnoty pozic Left a Top
            float _left = component.Left < 0 ? 0 : CommonService.AlignValueByResolution(component.Left, resolution),
                _top = component.Top < 0 ? 0 : CommonService.AlignValueByResolution(component.Top, resolution);

            float diffL = _left - component.Left,
                diffT = change == 1 ? 0 : (_top - component.Top);

            // zjistíme nové hodnoty Left a Top v závislosti na rozlišení
            // je-li zapotřebí, pak změníme hodnoty Left a Top
            if (diffL != 0)
                component.Left = new SizeValue(_left, component.Left.Metrics);
            if (diffT != 0)
                component.Top = new SizeValue(_top, component.Top.Metrics);

            if (diffL != 0 || diffT != 0)
                if (component is URAbstractContainer aCont)
                    aCont.ForEach(Shift, diffL, diffT);
        }

        int SetTopByNewPage(ITagComponent component)
        {
            if (component is IParentable && (component as IParentable).Parent is IPage)
            {
                IPage page = (component as IParentable).Parent as IPage;
                // může se jednát o přesun ze spodní stránky nahoru
                // zjistíme, jestli jsme v Margin zóně
                if (component.Top + page.MarginTop < 0)
                {
                    // zjistíme, jestli jsme objekt posunuli nahoru přes mezeru mezí stránky a spodní Margin zónu
                    if (page.Order > 1 && (component.Top + page.MarginTop + page.MarginBottom + ReportDesignerProperties.Instance.StepBetween < 0))
                    {
                        SetParent(component, page.PagePanel.Pages[page.Order - 2] as URAbstractContainer);
                        return -1;
                    }
                    else
                    {
                        (component as IChangeable).ChangeLocation(0, page.Height);
                        return 1;
                    }
                }
                else if ((component.Top - page.Height) > 0)
                {
                    (component as IChangeable).ChangeLocation(0, -page.Height);
                    return 1;
                }
            }
            return 0;
        }
        /// <summary>
        /// TODO - Stepan
        /// </summary>
        /// <param name="item"></param>
        /// <param name="objects"></param>
        void Shift(ITagComponent item, params object[] objects)
        {
            if (item == null)
                return;

            float diffL = float.Parse(objects[0].ToString());
            float diffT = float.Parse(objects[1].ToString());

            // zafixujeme stav kotvení daného objektu
            bool kotva = item.Anchor;

            // povolíme kotvu pro manipulaci s objektem
            item.Anchor = false;

            //Změníme pozice o uvedenou velikost 
            if (diffL != 0)
                item.Left = new SizeValue(item.Left + diffL, item.Left.Metrics);
            if (diffT != 0)
                item.Top = new SizeValue(item.Top + diffT, item.Top.Metrics);

            // pokud daný objekt byl regionem, 
            // pak je zapotřebí změnit pozice Left a Top i všech vnitřních objektů
            if ((diffL != 0 || diffT != 0) && item is URAbstractContainer container)
                container.ForEach(Shift, diffL, diffT);

            //Vrátíme stav ukotveni na původní
            item.Anchor = kotva;
        }
        void MethodSelectedObjectSizeChanged(object sender, EventArgsDynamic e)
        {
            if (e == EventArgs.Empty || e.Argument == null)
                return;

            // Rekurzivní volání pro seznam změn
            if (e.Argument is List<IChangeable> changeables)
            {
                foreach (var item in changeables)
                    MethodSelectedObjectSizeChanged(this, new EventArgsDynamic(item));
                return;
            }

            // Zpracování objektů v řádku
            if (!(e.Argument is IParentable parentable) || !(parentable.Parent is ICell cell))
                return;

            dynamic line = cell.Line;

            // Refresh podle směru změny velikosti
            switch (DrawSquare)
            {
                case DrawSquares.right:
                case DrawSquares.left:
                case DrawSquares.leftBottom:
                case DrawSquares.leftTop:
                case DrawSquares.rightBottom:
                case DrawSquares.rightTop:
                    line.RefreshWidthLeft();
                    break;
            }

            // Přepočet výšky řádku
            if (line.IsHeightByContent)
                line.IsHeightByContent = true;
            else
                line.RefreshTopHeight();
        }
        /// <summary>
        /// Získá úroveň vnoření objektu (pro správné pořadí restore)
        /// </summary>
        /// <param name="tag">Objekt</param>
        /// <returns>Úroveň vnoření (0 = root level)</returns>
        int GetNestingLevel(ITagComponent tag)
        {
            int level = 0;
            ITagComponent current = tag;

            while (current?.Parent is ITagComponent parent)
            {
                level++;
                current = parent;
            }

            return level;
        }

        /// <summary>
        /// Vrátí objekty na jejich původní pozice (před drag operací)
        /// DŮLEŽITÉ: Obnovuje od nejhlouběji vnořených k top-level objektům
        /// </summary>
        void RestoreOriginalPositions()
        {
            if (originalPositions == null)
                return;

            // KRITICKÉ: Musíme obnovit od nejhlouběji vnořených objektů k top-level!
            // Jinak by restore parent objektu přepsal pozice children
            var orderedItems = originalPositions
                .OrderByDescending(kvp => GetNestingLevel(kvp.Key))
                .ToList();

            foreach (var kvp in orderedItems)
            {
                ITagComponent tag = kvp.Key;
                float originalLeft = kvp.Value.Left;
                float originalTop = kvp.Value.Top;
                URAbstractContainer originalParent = kvp.Value.Parent;

                // Pokud se změnil parent, vrátíme objekt zpět
                if (tag.Parent != originalParent)
                {
                    if (tag.Parent is URAbstractContainer currentParent)
                        currentParent.Remove(tag);
                    originalParent.Add(tag);
                }

                // Vrátíme původní pozici
                tag.Left = new SizeValue(originalLeft, tag.Left.Metrics);
                tag.Top = new SizeValue(originalTop, tag.Top.Metrics);
            }

            // Vyčistíme uložené pozice
            originalPositions = null;
        }

        /// <summary>
        /// Nastavení rodičovského kontejneru pro seznam přetahovaných objektů s validací datového schématu
        /// </summary>
        /// <param name="draggedItems">Seznam přetahovaných objektů</param>
        /// <param name="towedComponent">Cílový kontejner</param>
        /// <returns>Seznam úspěšně přesunutých objektů</returns>
        List<object> SetParent(List<object> draggedItems, URAbstractContainer towedComponent)
        {
            List<object> movedItems = new List<object>();
            List<ITagComponent> tagsToMove = new List<ITagComponent>();

            if (towedComponent == null)
                return movedItems;

            foreach (var item in draggedItems)
                if (item is ITagComponent tag && towedComponent != tag && (!draggedItems.Contains(tag.Parent) || tag.Parent is GrfPage))
                {
                    // SPECIÁLNÍ PŘÍPAD: Posun v rámci stejného kontejneru (pouze změna pozice Left/Top)
                    if (tag.Parent == towedComponent)
                    {
                        tagsToMove.Add(tag);
                        continue;
                    }

                    // ZMĚNA PARENTU: Validace + přesun do jiného kontejneru
                    if (tag.Parent is URAbstractContainer)
                        // pokud objekt pod myši je kontajner uvnítř vybraného kontajneru
                        if (!(towedComponent is URAbstractContainer && towedComponent is ITagComponent && tag == (towedComponent as ITagComponent).Parent))
                        {
                            // Získání datového region labelu cílového kontejneru pro validaci
                            string targetRegionLabel = GetRegionLabel(towedComponent);

                            // Validace datového schématu před přesunutím (předáme towedComponent pro správnou validaci)
                            if (!ValidateDataSchemaForMove(tag, targetRegionLabel, towedComponent))
                                return new List<object>();

                            tagsToMove.Add(tag);
                        }
                }

            foreach (var tag in tagsToMove)
            {
                if (tag.Parent is URAbstractContainer currentParent && currentParent != towedComponent)
                {
                    currentParent.Remove(tag);
                    towedComponent.Add(tag);
                }

                movedItems.Add(tag);
            }

            return movedItems;
        }

        /// <summary>
        /// Nastavení rodičovského kontejneru pro jeden objekt s validací datového schématu
        /// </summary>
        /// <param name="tag">Přesouvaný objekt</param>
        /// <param name="towedComponent">Cílový kontejner</param>
        void SetParent(ITagComponent tag, URAbstractContainer towedComponent)
        {
            if (towedComponent == null)
                return;

            if (tag != null && tag.Parent is URAbstractContainer && towedComponent != tag && towedComponent != tag.Parent)
            {
                // Získání datového region labelu cílového kontejneru pro validaci
                string targetRegionLabel = GetRegionLabel(towedComponent);

                // Validace datového schématu před přesunutím (předáme towedComponent pro správnou validaci)
                if (!ValidateDataSchemaForMove(tag, targetRegionLabel, towedComponent))
                    return; // Validace selhala - neprovedeme přesun

                // Validace proběhla úspěšně - provedeme přesun
                (tag.Parent as URAbstractContainer).Remove(tag);
                towedComponent.Add(tag);
            }
        }

        /// <summary>
        /// Validuje, zda lze datovou položku přesunout do cílového regionu podle datového schématu
        /// </summary>
        /// <param name="tag">Přesouvaný objekt</param>
        /// <param name="targetRegionLabel">Label cílového regionu</param>
        /// <param name="towedComponent">Cílový kontejner pro validaci kompatibility</param>
        /// <returns>True pokud lze přesunout, false pokud validace selhala</returns>
        bool ValidateDataSchemaForMove(ITagComponent tag, string targetRegionLabel, URAbstractContainer towedComponent = null, bool showWarnings = true)
        {
            // Získání plného názvu taženého objektu
            string movingObjectName = GetFullName(tag);
            if (string.IsNullOrEmpty(movingObjectName))
                return true; // Není datová položka - validaci přeskočíme

            bool isRegionObject = IsRegionObject(tag);

            // PRAVIDLO 1 a 2: Táhnutí DO REGIONU (má DataRegionFullName)
            if (!string.IsNullOrEmpty(targetRegionLabel))
            {
                return ValidateTargetRegion(movingObjectName, targetRegionLabel, isRegionObject, showWarnings);
            }

            // PRAVIDLO 3: Táhnutí NA STRÁNKU (bez region labelu)
            return ValidatePageTarget(tag, movingObjectName, towedComponent, showWarnings);
        }

        /// <summary>
        /// Validuje nové vložení nebo vložení klonovaného objektu do cílového kontejneru.
        /// </summary>
        bool ValidateDataSchemaForInsert(object source, object target)
        {
            string movingObjectName = GetFullName(source);
            if (string.IsNullOrEmpty(movingObjectName))
                return true;

            bool isRegionObject = IsRegionObject(source);

            URAbstractContainer targetContainer = ResolveTargetContainer(target);
            if (targetContainer == null)
                return true;

            string targetRegionLabel = GetRegionLabel(targetContainer);
            if (!string.IsNullOrEmpty(targetRegionLabel))
                return ValidateTargetRegion(movingObjectName, targetRegionLabel, isRegionObject);

            return ValidatePageTarget(null, movingObjectName, targetContainer);
        }

        /// <summary>
        /// Validuje přesun nebo vložení do cílového regionu (target má DataRegionFullName).
        /// Datová položka smí pouze do vlastního regionu.
        /// Region smí do svého nadřazeného regionu nebo do sourozenecké větve pod stejným předkem.
        /// </summary>
        bool ValidateTargetRegion(string movingObjectName, string targetRegionLabel, bool isRegionObject, bool showWarnings = true)
        {
            // Získáme region tažené položky (immediate parent)
            // Např. "x.y.z" → region je "x.y"
            string movingItemRegion = GetParentPrefix(movingObjectName);
            if (string.IsNullOrEmpty(movingItemRegion))
                movingItemRegion = "root";

            // Datovou polozku lze vlozit jen do jejiho vlastniho regionu.
            if (!isRegionObject)
            {
                if (targetRegionLabel.Equals(movingItemRegion, StringComparison.OrdinalIgnoreCase))
                    return true;

                if (showWarnings)
                    ShowInvalidTargetWarning(movingObjectName, targetRegionLabel, movingItemRegion, null, false);
                return false;
            }

            // PRAVIDLO 1: Region lze táhnout do svého nadřazeného regionu.
            if (targetRegionLabel.Equals(movingItemRegion, StringComparison.OrdinalIgnoreCase))
                return true; // ✓ OK

            // Získáme nadřazený region (grandparent)
            // Např. "x.y.z" → region "x.y" → nadřazený "x"
            string movingItemGrandparent = GetParentPrefix(movingItemRegion);
            if (string.IsNullOrEmpty(movingItemGrandparent))
                movingItemGrandparent = "root";

            // PRAVIDLO 2: Lze táhnout do podřízeného regionu nadřazeného regionu
            // Např. "x.y.z" má grandparent "x"
            //       Lze táhnout do jakéhokoliv regionu "x.*" (např. "x.y1", "x.y2", "x.y")
            if (targetRegionLabel.StartsWith(movingItemGrandparent + ".", StringComparison.OrdinalIgnoreCase))
                return true; // ✓ OK

            // Validace selhala - cílový region nesplňuje žádné pravidlo
            if (showWarnings)
                ShowInvalidTargetWarning(movingObjectName, targetRegionLabel, movingItemRegion, movingItemGrandparent, true);
            return false;
        }

        /// <summary>
        /// Validuje přesun na stránku (target NEMÁ DataRegionFullName)
        /// Pravidlo: Existující položky musí patřit stejnému regionu NEBO stejnému nadřazenému regionu
        /// </summary>
        bool ValidatePageTarget(ITagComponent tag, string movingObjectName, URAbstractContainer targetContainer, bool showWarnings = true)
        {
            if (targetContainer == null)
                return true;

            // Získáme region tažené položky
            string movingItemRegion = GetParentPrefix(movingObjectName);
            if (string.IsNullOrEmpty(movingItemRegion))
                movingItemRegion = "root";

            // Získáme nadřazený region
            string movingItemGrandparent = GetParentPrefix(movingItemRegion);
            if (string.IsNullOrEmpty(movingItemGrandparent))
                movingItemGrandparent = "root";

            // Projdeme všechny existující objekty v cílovém kontejneru
            foreach (ITagComponent existingItem in targetContainer)
            {
                // Přeskočíme sebe sama (pokud přesouváme v rámci stejného kontejneru)
                if (existingItem == tag)
                    continue;

                string existingFullName = GetFullName(existingItem);
                if (string.IsNullOrEmpty(existingFullName))
                    continue;

                // Získáme region existující položky
                string existingItemRegion = GetParentPrefix(existingFullName);
                if (string.IsNullOrEmpty(existingItemRegion))
                    existingItemRegion = "root";

                // Získáme nadřazený region existující položky
                string existingItemGrandparent = GetParentPrefix(existingItemRegion);
                if (string.IsNullOrEmpty(existingItemGrandparent))
                    existingItemGrandparent = "root";

                // PRAVIDLO 3: Položky musí patřit stejnému regionu NEBO stejnému nadřazenému regionu
                bool sameRegion = movingItemRegion.Equals(existingItemRegion, StringComparison.OrdinalIgnoreCase);
                bool sameGrandparent = movingItemGrandparent.Equals(existingItemGrandparent, StringComparison.OrdinalIgnoreCase);
                if (!sameRegion && !sameGrandparent)
                {
                    if (showWarnings)
                        ShowPageMismatchWarning(movingObjectName, existingItemRegion, movingItemRegion, movingItemGrandparent);
                    return false;
                }
            }

            return true; // ✓ Všechny položky jsou kompatibilní
        }

        /// <summary>
        /// Zkontroluje, zda je targetName vnořeným objektem movingName
        /// Např. targetName="X.Y.Z", movingName="X" → true (X.Y.Z obsahuje X jako prefix)
        /// </summary>
        /// <summary>
        /// Získá parent prefix z plného názvu (část před poslední tečkou)
        /// </summary>
        /// <param name="fullName">Plné jméno datové položky (např. "root.customers.orders")</param>
        /// <returns>Parent prefix (např. "root.customers") nebo "root" pro root-level</returns>
        string GetParentPrefix(string fullName)
        {
            if (string.IsNullOrEmpty(fullName))
                return null;

            // Pro REGION i POLOŽKU najdeme parenta stejným způsobem
            // Region "X.Z" → parent je "X"
            // Položka "X.U" → parent je "X"

            int lastDotIndex = fullName.LastIndexOf('.');
            if (lastDotIndex > 0)
                return fullName.Substring(0, lastDotIndex);

            // Pokud není tečka, je to root-level
            // Např. region "Customers" nebo položka "Name" → parent je "root"
            return "root";
        }

        /// <summary>
        /// Získá plný název objektu (DataRegionFullName pro region, DataFullName pro položku)
        /// </summary>
        string GetFullName(ITagComponent tag)
        {
            if (tag == null)
                return null;

            // Nejdřív zkusíme DataRegionFullName (region)
            if (TryGetPropertyValue(tag, "DataRegionFullName", out string regionName) 
                && !string.IsNullOrEmpty(regionName))
                return regionName;

            // Pak zkusíme DataFullName (položka)
            if (TryGetPropertyValue(tag, "DataFullName", out string fullName) 
                && !string.IsNullOrEmpty(fullName))
                return fullName;

            return null;
        }

        /// <summary>
        /// Získá plný název objektu z různých zdrojů vložení.
        /// </summary>
        string GetFullName(object source)
        {
            if (source == null)
                return null;

            if (source is StructExtNode node)
                return node.FullName;

            if (source is ITagComponent tag)
                return GetFullName(tag);

            return null;
        }

        bool IsRegionObject(object source)
        {
            if (source == null)
                return false;

            if (source is StructExtNode node)
                return node.DataRegion != null;

            if (source is ITagComponent)
                return TryGetPropertyValue(source, "DataRegionFullName", out string regionName)
                    && !string.IsNullOrEmpty(regionName);

            return false;
        }

        /// <summary>
        /// Přeloží cíl vložení na kontejner, vůči kterému se vyhodnocuje regionová kompatibilita.
        /// </summary>
        URAbstractContainer ResolveTargetContainer(object target)
        {
            if (target is IList<object> hoveredObjects)
            {
                IComponent deepestComponent = CommonService.GetComponents(hoveredObjects)
                    .OrderByDescending(component => component is IOrder order ? order.Order.Count : 0)
                    .FirstOrDefault();

                return ResolveTargetContainer(deepestComponent);
            }

            if (target is URAbstractContainer container)
                return container;

            if (target is ITagComponent tag)
                return tag.Parent as URAbstractContainer;

            if (target is IParentable parentable)
                return parentable.Parent as URAbstractContainer;

            return null;
        }

        object GetCurrentInsertTarget()
        {
            // Insert se musi ridit stejnou logikou jako move:
            // primarni je skutecne zvyrazneny drop target (TowedComponent)
            // a teprve potom fallback na nejhlubsi objekt pod kurzorem.
            object target = (object)TowedService.TowedComponent
                ?? ResolveTargetContainer(TowedService.TowedObject);

            if (target != null)
                return target;

            object selected = ServiceSelection.SelectedComponents.First();
            return selected is IItemContainer
                ? selected
                : (selected is ITagComponent tag ? tag.Parent : null);
        }

        URAbstractContainer GetCurrentDropTargetContainer()
        {
            return TowedService.TowedComponent
                ?? ResolveTargetContainer(TowedService.TowedObject);
        }

        /// <summary>
        /// Získá region label (DataRegionFullName) pro daný kontejner
        /// </summary>
        /// <param name="container">Kontejner, pro který hledáme region label</param>
        /// <returns>Region label nebo null pokud není nalezen</returns>
        string GetRegionLabel(object target)
        {
            if (target == null)
                return null;

            // V GRF muze regionovy label viset na samotnem tagu i na nekterem rodici.
            // Proto prochazime cely parent chain pres IParentable, ne jen URAbstractContainer rodice.
            object current = target;
            while (current != null)
            {
                if (TryGetPropertyValue(current, "DataRegionFullName", out string dataRegionFullName) 
                    && !string.IsNullOrEmpty(dataRegionFullName))
                    return dataRegionFullName;

                current = (current as IParentable)?.Parent;
            }

            return null;
        }

        /// <summary>
        /// Pokusí se získat hodnotu property pomocí reflection
        /// </summary>
        /// <typeparam name="T">Typ výsledné hodnoty</typeparam>
        /// <param name="obj">Objekt, ze kterého získáváme property</param>
        /// <param name="propertyName">Název property</param>
        /// <param name="value">Výstupní hodnota</param>
        /// <returns>True pokud se podařilo získat hodnotu, jinak false</returns>
        bool TryGetPropertyValue<T>(object obj, string propertyName, out T value)
        {
            value = default(T);

            if (obj == null || string.IsNullOrEmpty(propertyName))
                return false;

            try
            {
                var property = obj.GetType().GetProperty(propertyName);
                if (property != null && property.CanRead)
                {
                    var rawValue = property.GetValue(obj, null);
                    if (rawValue is T typedValue)
                    {
                        value = typedValue;
                        return true;
                    }
                }
            }
            catch
            {
                // Property neexistuje nebo nelze přečíst
            }

            return false;
        }

        /// <summary>
        /// Zobrazí varovné hlášení o neplatném cílovém regionu
        /// </summary>
        void ShowInvalidTargetWarning(string movingItemName, string targetRegion, string movingItemRegion, string movingItemGrandparent, bool isRegionObject)
        {
            string message = isRegionObject
                ? string.Format(
                    "Položku '{0}' nelze přesunout do regionu '{1}'.\n\n" +
                    "Region patří pod region '{2}'.\n" +
                    "Lze přesunout pouze do:\n" +
                    "  - regionu '{2}' (nadřazený region)\n" +
                    "  - podřízených regionů '{3}.*' (sourozenci regionu)",
                    movingItemName ?? "neznámá položka",
                    targetRegion,
                    movingItemRegion,
                    movingItemGrandparent ?? "root")
                : string.Format(
                    "Položku '{0}' nelze přesunout do regionu '{1}'.\n\n" +
                    "Datová položka patří regionu '{2}'.\n" +
                    "Lze ji přesunout pouze do tohoto regionu.",
                    movingItemName ?? "neznámá položka",
                    targetRegion,
                    movingItemRegion);

            MessageService.ShowWarning(
                message
            );
        }

        /// <summary>
        /// Zobrazí varovné hlášení o nekompatibilitě s existujícími objekty na stránce
        /// </summary>
        void ShowPageMismatchWarning(string movingItemName, string existingItemRegion, string movingItemRegion, string movingItemGrandparent)
        {
            MessageService.ShowWarning(
                string.Format(
                    "Položku '{0}' nelze přesunout do zvoleného kontejneru.\n\n" +
                    "V cílovém kontejneru jsou položky regionu '{1}'.\n" +
                    "Položky na stránce musí patřit:\n" +
                    "  - stejnému regionu ('{2}')\n" +
                    "  - NEBO stejnému nadřazenému regionu ('{3}')",
                    movingItemName ?? "neznámá položka",
                    existingItemRegion ?? "neznámý region",
                    movingItemRegion,
                    movingItemGrandparent
                )
            );
        }
    }
}