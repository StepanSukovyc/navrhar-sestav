//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AbstractPagePanel.cs                     </Name>
//    <Description> Abstraktní třída kreslící plochy                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2013-02-20                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.Parsers.Services;
using Gordic.TextEditor.Document;
using Gordic.GFE.Parsers.Editor;
using Gordic.General;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// rozhraní ovladače stránek
    /// </summary>
    public interface IPageControl
    {
        /// <summary>
        /// služba grafiky
        /// </summary>
        IGraphicSettingService GSS { get; set; }
        /// <summary>
        /// ovladač grafiky
        /// </summary>
        Graphics ComputeGraphics { get; set; }
        /// <summary>
        /// struktura vázané sestavy
        /// </summary>
        GFEStructure Structure { get; }
        /// <summary>
        /// kolekce stránek ovladače
        /// </summary>
        IPages Pages { get; }

        /// <summary>
        /// hodnota zvětšení
        /// </summary>
        float Zoom { get; }
    }
    /// <summary>
    /// rozhraní panelu stránky
    /// </summary>
    public interface IPagePanel : IPageControl
    {
        /// <summary>
        /// Služba výběru objektů
        /// </summary>
        SelectionService ServiceSelection { get; }
        /// <summary>
        /// kurzor
        /// </summary>
        Cursor Cursor { get; set; }
        /// <summary>
        /// 
        /// </summary>
        VScrollProperties VerticalScroll { get; }
        /// <summary>
        /// 
        /// </summary>
        HScrollProperties HorizontalScroll { get; }
        /// <summary>
        /// Indikuje, že je nutno přepočítát cach seznamy pozic rohů mřížky - urychluje kreslení stránky
        /// </summary>
        bool PositionCachNeedRefresh { get; set; }
        /// <summary>
        /// ovladač panelu
        /// </summary>
        Control Control { get; }
        /// <summary>
        /// aktivované tažení
        /// </summary>
        bool IsDragOver { get; set; }
        /// <summary>
        /// Indikuje zda probíhá operace přetahování objektů (drag and drop)
        /// </summary>
        bool IsDragOperation { get; }
        /// <summary>
        /// případné překreslení
        /// </summary>
        void Invalidate();
        /// <summary>
        /// pozice tažení
        /// </summary>
        Point DragPoint { get; set; }
        /// <summary>
        /// Aktualizace oblastí přetáčení
        /// </summary>
        /// <param name="sender">objekt, který spustil událost</param>
        /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
        void ActualizeScrollScope(object sender, EventArgs e);
    }

    /// <summary>
    /// Vybraná oblsat
    /// </summary>
    public class SelectedArea
    {
        /// <summary>
        /// Aktuální oblast
        /// </summary>
        public ComplexSurroundWidth Area { get; set; }

        /// <summary>
        /// aktuální grafická oblast
        /// </summary>
        public ComplexSurroundWidth Graph { get; set; }

        /// <summary>
        /// Indikuje, že objekt je prázdný
        /// </summary>
        public bool IsEmpty { get => Area.IsEmpty; set => Area = new ComplexSurroundWidth(); }
        /// <summary>
        /// Indikuje existencí rámečku
        /// </summary>
        public bool ExistArea => Area.LeftPixels - Area.RightPixels != 0 && Area.TopPixels - Area.BottomPixels != 0;
        /// <summary>
        /// Kreslení objektu
        /// </summary>
        /// <param name="graphics">ovladač grafiky</param>
        public void Paint(Graphics graphics)
        {
            if (graphics == null || Graph == null)
                return;

            if (Graph != null && ExistArea)
                graphics.DrawRectangle(new Pen(new SolidBrush(Color.Blue), 2F) { DashStyle = DashStyle.Dash }, (float)Graph.LeftPixels, (float)Graph.TopPixels, (float)(Graph.RightPixels - Graph.LeftPixels), (float)(Graph.BottomPixels - Graph.TopPixels));
        }

        private SelectedArea()
        {
            Graph = new ComplexSurroundWidth();
            Area = new ComplexSurroundWidth();
        }

        readonly AbstractPagePanel pagePanel;
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="pPagePanel">Panel pro kreslení</param>
        public SelectedArea(AbstractPagePanel pPagePanel)
            : this()
        {
            this.pagePanel = pPagePanel;
        }

        /// <summary>
        /// Aktualizace velikostí rámečku
        /// </summary>
        /// <param name="e">Argument</param>
        public void RefreshSize(MouseEventArgs e)
        {
            //Zjišťujeme velikost rámečku (modrý čárkovaný)
            if (pagePanel.NonTransormationMousePosition.X > e.X)
            {
                Graph.LeftValue = e.X + "px";
                Area.LeftValue = (e.X + pagePanel.HorizontalScroll.Value) + "px";
            }
            else
            {
                Graph.LeftValue = pagePanel.NonTransormationMousePosition.X + "px";
                Area.LeftValue = (pagePanel.NonTransormationMousePosition.X + pagePanel.HorizontalScroll.Value) + "px";
            }
            if (pagePanel.NonTransormationMousePosition.Y > e.Y)
            {
                Area.TopValue = (e.Y + pagePanel.VerticalScroll.Value) + "px";
                Graph.TopValue = e.Y + "px";
            }
            else
            {
                Area.TopValue = (pagePanel.NonTransormationMousePosition.Y + pagePanel.VerticalScroll.Value) + "px";
                Graph.TopValue = pagePanel.NonTransormationMousePosition.Y + "px";
            }

            if (pagePanel.NonTransormationMousePosition.X > e.X)
            {
                Area.RightValue = (pagePanel.NonTransormationMousePosition.X + pagePanel.HorizontalScroll.Value) + "px";
                Graph.RightValue = pagePanel.NonTransormationMousePosition.X + "px";
            }
            else
            {
                Area.RightValue = (e.X + pagePanel.HorizontalScroll.Value) + "px";
                Graph.RightValue = e.X + "px";
            }

            if (pagePanel.NonTransormationMousePosition.Y > e.Y)
            {
                Area.BottomValue = (pagePanel.NonTransormationMousePosition.Y + pagePanel.VerticalScroll.Value) + "px";
                Graph.BottomValue = pagePanel.NonTransormationMousePosition.Y + "px";
            }
            else
            {
                Area.BottomValue = (e.Y + pagePanel.VerticalScroll.Value) + "px";
                Graph.BottomValue = e.Y + "px";
            }
        }
    }

    /// <summary>
    /// pomocné rozhraní pro předání akci myši
    /// </summary>
    public interface IMouseHandler
    {
        /// <exclude/>
        void IOnMouseUp(MouseEventArgs e);
        /// <exclude/>
        void IOnMouseDown(MouseEventArgs e);
    }

    /// <summary>
    /// Abstraktní třída kreslící plochy
    /// </summary>
    public abstract class AbstractPagePanel : Panel, IPagePanel, IDesignSearchHandler, IMouseHandler
    {
        #region IPagePanel
        /// <summary>
        /// Indikuje zda probíhá operace přetahování objektů (drag and drop)
        /// </summary>
        public virtual bool IsDragOperation => ObjectsChangeLocker;
        #endregion

        #region IDesignSearchHandler
        /// <summary>
        /// Získání objektu, co se nachází ve výběru
        /// </summary>
        /// <param name="selection">Informace o výběru, dle které určíme, na řádky výběru</param>
        /// <returns>Seznam objektů, které se nachází ve výbrané části.</returns>
        public virtual List<IComponent> SearchComponentText(ISelection selection) => new List<IComponent>();
        /// <summary>
        /// hledání všech objektů dle pozice <paramref name="location"/>
        /// pod kurzorem
        /// </summary>
        /// <param name="location">Umístění kurzóru</param>
        /// <returns>Buď objekt samotný nebo seznam vnořených objektů</returns>
        public abstract List<IComponent> SearchComponent(Point location);
        #endregion

        #region IMouseHandler
        /// <exclude/>
        public void IOnMouseUp(MouseEventArgs e) => OnMouseUp(e);

        /// <exclude/>
        public void IOnMouseDown(MouseEventArgs e) { }
        #endregion

        #region Mouse
        /// <exclude/>
        protected override void OnMouseDown(MouseEventArgs e)
        {
            base.OnMouseDown(e);
            // zafixujeme transformovanou a netransformovanou pozice myši
            NonTransormationMousePosition = new Point(e.X, e.Y);
            TransformMouseEventArgs = e;
            TransformMouseEventArgsBegin = new MouseEventArgs(e.Button, e.Clicks, e.X, e.Y, e.Delta);
        }

        void TmTick(MouseEventArgs e)
        {
            // pokud je splněná tato podmínka, pak to znamená, 
            // že jsme ukončili režím „výběr objektů tažením myši“
            // takže je zapotřebí vynulovat používané objekty
            if (selectedArea != null && !selectedArea.IsEmpty)
            {
                selectedArea.IsEmpty = true;
                // překreslíme plochu
                Repaint();
            }
            // pokud objekty jsou uzamčené, pak to znamená, že se měnily
            else if (ObjectsChangeLocker)
            {
                if (ServiceSelection.PrimarySelection == null)
                    return;

                lock (ServiceSelection.PrimarySelection)
                {
                    // proběhla změna velikosti?
                    if (isSizeChanged)
                    {
                        isSizeChanged = false;

                        OnSelectedObjectSizeChanged();
                    }
                    if (UndoRedoService.IsTransactionStarted)
                        UndoRedoService.Commit();
                }
                ObjectsChangeLocker = false;
            }
            else if (e.Button == MouseButtons.Left || e.Button == MouseButtons.Right)
            {
                if (!isShowSelectionContextMenu)
                {
                    List<IComponent> component = SearchComponent(e.Location);
                    if (component != null && component.Count > 0)
                    {
                        IComponent firstComponent = component.First();
                        if (firstComponent is IPage)
                        {
                            LoggingService.Info(GResources.GetResourceText(29450089)); //RC 29450089 : vybraný objekt je stránka ...
                            if (Control.ModifierKeys != Keys.Control && view is IHost _host)
                                if (_host.Host.Container.Components.Count <= 1)
                                    // stránku lze přidávat jednotlivě
                                    SetSelectedComponents(firstComponent, SelectionTypes.Replace);
                        }
                        else if (e.Button == MouseButtons.Left)
                        {
                            List<IComponent> selectedComponents = new List<IComponent>();

                            if ((Control.ModifierKeys & Keys.Shift) == Keys.Shift)
                            {
                                if (firstComponent is IParentable parentable && parentable.Parent is ICell cell && cell.Line != null)
                                    selectedComponents.AddRange(
                                        cell.Line
                                        .Select(cl => cl is ICell && !cl.IsComment ? (cl as ICell).Sizable as IComponent : null)
                                        .Distinct()
                                        .ToList()
                                        .FindAll(cm => cm != null));
                            }
                            else
                                selectedComponents.Add(firstComponent);

                            if (selectedComponents.Count > 0)
                            {
                                ServiceSelection.RemovePages();
                                bool firstTime = true;
                                foreach (var item in selectedComponents)
                                    if ((Control.ModifierKeys & Keys.Control) == Keys.Control
                                        || ((Control.ModifierKeys & Keys.Shift) == Keys.Shift && !firstTime))
                                        SetSelectedComponents(item, SelectionTypes.Add);
                                    else
                                    {
                                        firstTime = false;
                                        SetSelectedComponents(item, SelectionTypes.Replace);
                                    }
                            }
                        }
                        else if (e.Button == MouseButtons.Right && !ServiceSelection.SelectedComponents.Contains(firstComponent))
                        {
                            ServiceSelection.RemovePages();
                            // je to prázdné opuštění tlačítka myši na plochu
                            // ...vybereme objekt pod kurzorem 
                            SetSelectedComponents(firstComponent, Control.ModifierKeys == Keys.Control ? SelectionTypes.Add : SelectionTypes.Replace);
                        }
                    }

                    if (e.Button == System.Windows.Forms.MouseButtons.Right && ServiceSelection != null)
                        // kliknuti mimo stránku
                        CommonService.ShowContextMenu(ServiceSelection.PrimarySelection, PointToScreen(e.Location));
                }
                isShowSelectionContextMenu = false;
            }
            Invalidate();
        }

        bool isSizeChanged;
        /// <summary>
        /// seznam aktuálně vybraných objektů
        /// </summary>
        protected List<IChangeable> actualFocused = new List<IChangeable>();
        /// <summary>
        /// indikuje, že contextové menu na zobrazení výběru položky bylo zobrazeno
        /// </summary>
        protected bool isShowSelectionContextMenu = false;

        /// <summary>
        /// volá se po změně velikosti
        /// </summary>
        /// <param name="pActualFocused">aktuálně vybraný objekt</param>
        /// <param name="diffP">diferenciál posunu</param>
        protected void OnSizeChanged(IChangeable pActualFocused, Point diffP)
        {
            if (!this.actualFocused.Contains(pActualFocused))
                this.actualFocused.Add(pActualFocused);

            if (diffP.X != 0 || diffP.Y != 0)
            {
                isSizeChanged = true;
                // aktualizujeme transformovanou pozici myši
                TransformMouseEventArgsBegin
                    = new MouseEventArgs(TransformMouseEventArgsBegin.Button
                    , TransformMouseEventArgsBegin.Clicks
                    , TransformMouseEventArgsBegin.X + diffP.X
                    , TransformMouseEventArgsBegin.Y + diffP.Y
                    , TransformMouseEventArgsBegin.Delta);

                Invalidate();
            }
        }
        /// <summary>
        /// Přetížení dané metody
        /// </summary>
        /// <param name="e"></param>
        protected override void OnMouseUp(MouseEventArgs e) => TmTick(e);

        /// <summary>
        /// volá se po změně velikosti vybraného objektu
        /// </summary>
        protected event EventHandlerDynamic SelectedObjectSizeChanged;
        void OnSelectedObjectSizeChanged()
        {
            SelectedObjectSizeChanged?.Invoke(this, new EventArgsDynamic(actualFocused));

            actualFocused.Clear();
        }
        #endregion

        #region Dragging
        /// <summary>
        /// získání bodu tažení
        /// </summary>
        /// <param name="e"></param>
        /// <returns>Bod tažení vůči objektu</returns>
        protected Point GetDragPoint(DragEventArgs e)
        {
            // zjistíme pozici kurzoru vůči ploše
            Point pointToClient = PointToClient(new Point(e.X, e.Y));
            // najdeme pozici myši vůči zvětšené stránce
            return new Point(pointToClient.X + HorizontalScroll.Value, pointToClient.Y + VerticalScroll.Value);
        }

        /// <summary>
        /// Vstup při přetažení
        /// </summary>
        /// <param name="e">Parametry tažení</param>
        protected override void OnDragEnter(DragEventArgs e)
        {
            base.OnDragEnter(e);
            e.Effect = e.Data.GetDataPresent(typeof(SideTabItem)) ? DragDropEffects.Copy : DragDropEffects.None;
        }
        /// <exclude/>
        /// SideBarControl
        protected override void OnDragOver(DragEventArgs e)
        {
            base.OnDragOver(e);
            e.Effect = e.Data.GetDataPresent(typeof(SideTabItem)) ? GetDragDropEffect(e) : DragDropEffects.None;
        }
        static DragDropEffects GetDragDropEffect(DragEventArgs e)
        {
            if ((e.AllowedEffect & DragDropEffects.Move) > 0 &&
                (e.AllowedEffect & DragDropEffects.Copy) > 0)
                return (e.KeyState & 8) > 0 ? DragDropEffects.Copy : DragDropEffects.Move;
            else if ((e.AllowedEffect & DragDropEffects.Move) > 0)
                return DragDropEffects.Move;
            else if ((e.AllowedEffect & DragDropEffects.Copy) > 0)
                return DragDropEffects.Copy;
            return DragDropEffects.None;
        }
        bool isDragOver = false;
        /// <summary>
        /// aktivované tažení
        /// </summary>
        public bool IsDragOver { get => isDragOver; set => isDragOver = value; }
        Point dragPoint = new Point(0);
        /// <summary>
        /// pozice tažení
        /// </summary>
        public Point DragPoint { get => dragPoint; set => dragPoint = value; }
        /// <summary>
        /// Akce pro stránku, nad kterou se pohybuje myš
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="param"></param>
        protected void OnDragOver(IPage obj, params object[] param)
        {
            DragEventArgs drgevent = (DragEventArgs)param[0];
            Point dragPoint = (Point)param[1];
            DragPoint = new Point(dragPoint.X + HorizontalScroll.Value, dragPoint.Y + VerticalScroll.Value);
            IsDragOver = true;
            drgevent.Effect = drgevent.AllowedEffect;

            // tato situace nastane jenom když táhneme objekt z jednoho umístěni do jiného
            if (drgevent.Effect == DragDropEffects.Move)
            {
                // zjistíme velikost změny
                XDifference = (int)((dragPoint.X - TransformMouseEventArgs.X) / Zoom);
                YDifference = (int)((dragPoint.Y - TransformMouseEventArgs.Y) / Zoom);
                // pokud změna není nulová 
                if (XDifference != 0 || (YDifference != 0))
                {
                    ActionDragOver();
                    TransformMouseEventArgs = new MouseEventArgs(TransformMouseEventArgs.Button, TransformMouseEventArgs.Clicks, dragPoint.X, dragPoint.Y, TransformMouseEventArgs.Delta);
                    Refresh();
                }
            }
            else if (drgevent.Effect == DragDropEffects.Copy)
                ActionDragOver(drgevent);
        }

        /// <summary>
        /// Akce tažení nad ovladačem
        /// </summary>
        protected virtual void ActionDragOver()
        {
            //Pokud nejsou vybrané objekty, pak není co řešit
            if (ServiceSelection.SelectedComponents.Count == 0)
                return;

            // posuneme vybraný/é objekt/y
            foreach (object item in ServiceSelection.SelectedComponents)
                if (item is IChangeable)
                    (item as IChangeable).ChangeLocation(XDifference, YDifference);
        }
        /// <summary>
        /// Přetažení objektu nad stránkou
        /// </summary>
        /// <param name="drgevent">parametry tažení</param>
        protected virtual void ActionDragOver(DragEventArgs drgevent) { }
        #endregion

        #region KeyActions
        /// <summary>
        /// Dostupé příkazy
        /// </summary>
        protected Dictionary<Keys, IKeyAction> keyactions = new Dictionary<Keys, IKeyAction>();

        /// <summary>
        /// Naplnění seznamu činnosti
        /// </summary>
        protected virtual void GenerateKeyActions() { }
        #endregion

        //------------------------------------------------------------------
        Graphics computeGraphics;
        ///<summary>grafika pro výpočty</summary>
        public Graphics ComputeGraphics
        {
            get
            {
                if (computeGraphics == null)
                    computeGraphics = base.CreateGraphics();
                return computeGraphics;
            }
            set => computeGraphics = value;
        }

        /// <summary>
        /// přetížení kvůli grafice pro výpočty
        /// </summary>
        /// <returns></returns>
        new public virtual Graphics CreateGraphics() => ComputeGraphics ?? base.CreateGraphics();

        Control m_control = null;
        /// <summary>
        /// ovladač panelu
        /// </summary>
        public Control Control => m_control ?? this;
        public void SetControl(Control value) { m_control = value; }

        /// <summary>
        /// Jednotka struktury
        /// </summary>
        public virtual GFEStructure Structure => null;

        /// <summary>
        /// zjisštění, zda se nacházíme nad objektem, který implementuje rozhraní ICursorHandler
        /// </summary>
        /// <returns></returns>
        protected bool IsSelectionCursorHandler() => ServiceSelection != null
                // po použití Undo operace na vložení objektu se může stat, 
                // že objekt bude vybraný ale nebude na ploše
                && (ServiceSelection.PrimarySelection is ITagComponent)
                && (ServiceSelection.PrimarySelection as ITagComponent).Parent != null
                && ServiceSelection.PrimarySelection is ICursorHandler; // pokud je vybrán objekt a pouze jeden        

        /// <exclude/>
        protected override bool ProcessDialogKey(Keys keyData)
        {
            IKeyAction action = GetKeyAction(keyData);
            if (action != null)
                switch (action.Execute())
                {
                    case ActionResult.execute_true:
                        return true;
                    case ActionResult.execute_false:
                        return false;
                    default:
                        break;
                }

            return base.ProcessDialogKey(keyData);
        }

        /// <summary>
        /// Indikuje průběh změny
        /// </summary>
        protected bool IsChanging => Cursor == Cursors.SizeWE || Cursor == Cursors.SizeNS || Cursor == Cursors.SizeNESW || Cursor == Cursors.SizeNWSE;

        /// <summary>
        /// Transformovaná pozice myši při tažení, změně velikosti - také indikuje že se dějě nějaka akce
        /// </summary>
        public MouseEventArgs TransformMouseEventArgs { get; set; }
        /// <summary>
        /// Pozice myši (netransformovaná)
        /// </summary>
        public Point NonTransormationMousePosition { get; set; }
        /// <summary>
        /// Zámek na  zákaz uložení stavu vybraných objektů 
        /// pokud se nezmění (čili pokud nevyberu jiný objekt)
        /// </summary>
        protected bool ObjectsChangeLocker;
        /// <summary>
        /// Čtvereček, který byl aktivován metodou MouseDown
        /// </summary>
        protected DrawSquares DrawSquare { get; set; }
        /// <summary>
        /// Počáteční stav transformované pozice myši při tažení, 
        /// změně velikosti - také indikuje že se dějě nějaka akce
        /// </summary>
        protected MouseEventArgs TransformMouseEventArgsBegin;

        /// <summary>
        /// Pomocné proměnné pro případ, kdy se objekty vybírají pomocí myší a stisknutého tlačítka Ctrl
        /// Veličiny jsou s hodnotou ZOOM
        /// </summary>
        protected SelectedArea selectedArea;

        /// <summary>
        /// Událost vykreslení pozadí ... při použití ručního 'backBuffer' se musí zakázat
        /// </summary>
        /// <param name="e">Argument kreslení</param>
        protected override void OnPaintBackground(PaintEventArgs e) { }
        /// <summary>
        /// Buffer kreslení obsahu komponenty
        /// </summary>
        protected Bitmap _contentBuffer;
        /// <summary>
        /// Buffer kreslení stránky
        /// </summary>
        protected Bitmap _pageBuffer;
        /// <summary>
        /// Indikuje, že je nutno přepočítát cach seznamy pozic rohů mřížky - urychluje kreslení stránky
        /// </summary>
        public bool PositionCachNeedRefresh { get; set; }

        /// <summary>
        /// Zde uvolníme buffer obrázku a překreslíme ho znovu
        /// </summary>
        /// <param name="eventargs">argument změny velikostí</param>
        protected override void OnResize(EventArgs eventargs)
        {
            DisposeBuffer();
            base.OnResize(eventargs);
        }
        /// <summary>
        /// V této metodě rozlišújeme 2 případy:
        /// a. klasické přetáčení
        /// b. tzvn. zoomování
        /// Zoomování probíha se stisknutou klávesou Ctrl.
        /// </summary>
        /// <returns></returns>
        protected override void OnMouseWheel(MouseEventArgs e)
        {
            // pokud se nejedná o zoomování, pak klasické přetáčení
            if (!IsChangeZoom(e))
            {
                base.OnMouseWheel(e);
                PositionCachNeedRefresh = true;
            }

            // překreslíme ovladač
            Invalidate();
        }

        /// <summary>
        /// Zjistíme, zda se jedná o tzvn. zoomování nebo o klasické přetáčení
        /// </summary>
        /// <param name="e">Poskytuje data události s myši</param>
        bool IsChangeZoom(MouseEventArgs e)
        {
            // indikuje stisknutou klávesu Ctrl, která indikuje zoomování
            if ((Control.ModifierKeys & Keys.Control) > 0)
            {
                // Delta > 0 indikuje zvětšení
                if (e.Delta > 0)
                    zoom += 0.1F;
                else
                    zoom -= 0.1F;

                // maximálně možné zvětšení je 5
                if (zoom > 5)
                    zoom = 5;
                // minimálně možné zmenšení je 0.1F
                else if (zoom < 0.1F)
                    zoom = 0.1F;
                GraphicSettingService.Zoom = zoom;
            }
            return (Control.ModifierKeys & Keys.Control) > 0;
        }
        /// <exclude/>
        protected override void OnScroll(ScrollEventArgs se)
        {
            base.OnScroll(se);
            PositionCachNeedRefresh = true;
            Invalidate();
        }

        /// <summary>
        /// Kreslení stránky/ek
        /// </summary>
        /// <param name="graphics">ovladač grafiky</param>
        /// <param name="e"></param>
        protected abstract void PaintPanel(PaintEventArgs e, Graphics graphics);
        /// <summary>
        /// Vyčíštění pozadí
        /// </summary>
        /// <param name="graphics">Grafický ovladač</param>
        protected void ClearBackground(Graphics graphics) => graphics.Clear(SystemColors.ButtonShadow);

        /// <summary>
        /// Diference po X
        /// </summary>
        public int XDifference { get; set; }
        /// <summary>
        /// Diference po Y
        /// </summary>
        public int YDifference { get; set; }


        private static bool __InPaint = false;
        /// <summary>
        /// Kreslení ovladače
        /// </summary>
        /// <param name="e">Atribut kreslení</param>
        protected override void OnPaint(PaintEventArgs e)
        {
            if (DesignMode)
            {
                base.OnPaint(e);
                return;
            }
            if (__InPaint)
            {
                base.OnPaint(e);
                return;
            }

            // jinak kreslení ve vlastní réžii
            try { __InPaint = true; PaintControl(e); }
            catch (Exception ex)
            {
                __InPaint = false;
                MessageService.ShowError($"{GResources.GetResourceText(29450090)}{ex.Message}");//RC 29450090 : Chyba kreslení ovladače:
            }
            finally { __InPaint = false; }
        }
        /// <summary>
        /// Kreslení ovladače
        /// </summary>
        /// <param name="e">Argument kreslení</param>
        protected abstract void PaintControl(PaintEventArgs e);
        /// <summary>
        /// Změna velikosti vybraného objektu
        /// </summary>
        /// <param name="pActualFocused">objekt, kterému se měni parametry</param>
        /// <param name="_xPixels">změna po X</param>
        /// <param name="_yPixels">změna po Y</param>
        /// <param name="contentBegin">začátek obsahu</param>
        /// <param name="isFirst">je první v seznamu</param>
        protected virtual void ChangeSize(IChangeable pActualFocused, ref float _xPixels, ref float _yPixels, Point contentBegin, bool isFirst = true) { }
        /// <summary>
        /// Akce změna velikosti
        /// </summary>
        /// <param name="focused">vybraný objekt</param>
        /// <param name="mouseBegin"></param>
        /// <param name="contentBegin">začátek obsahu</param>
        protected void ChangeSize(dynamic/*IChangeable*/ focused, MouseEventArgs mouseBegin, Point contentBegin)
        {
            if (actualFocused != null)
                // uzamkneme objekty pro práci s nimi
                ObjectsChangeLocker = true;

            SetDiffForWidthHeight(TransformMouseEventArgs, TransformMouseEventArgsBegin);

            if (XDifference != 0 || YDifference != 0)
            {
                if (!UndoRedoService.IsTransactionStarted)
                    UndoRedoService.StartTransaction(GResources.GetResourceText(29450091)); //RC 29450091 : změna velikosti

                float xDiff = XDifference,
                    yDiff = YDifference;
                if (focused is IChangeable)
                    ChangeSize(focused as IChangeable, ref xDiff, ref yDiff, contentBegin);
                else
                {
                    bool isFirst = true;
                    if (focused is List<object> list)
                        foreach (var item in list)
                        {
                            ChangeSize(item as IChangeable, ref xDiff, ref yDiff, contentBegin, isFirst);
                            isFirst = false;
                        }
                }
            }
        }
        /// <summary>
        /// Posunutí posuvníků tak, aby byl vidět daný objekt
        /// </summary>
        /// <param name="item">Daný objekt</param>
        public virtual void JumpTo(ITagComponent item)
        {
            if (item == null)
                return;

            AutoScrollPosition = new Point((int)(item.LeftZoom - Width / 2), (int)(item.TopZoom - Height / 2));
        }

        /// <summary>
        /// Aktualizace vybraných objektů dle výběru textu.
        /// </summary>
        /// <param name="item">Vybraná část textu</param>
        public virtual void UpdateSelection(ISelection item)
        {
            if (item == null)
                return;

            foreach (var subItem in SearchComponentText(item))
                SetSelectedComponents(subItem, SelectionTypes.Add);
        }

        /// <summary>
        /// Překreslení plochy
        /// </summary>
        public void Repaint()
        {
            DisposeBuffer();
            PaintControl(new PaintEventArgs(this.CreateGraphics(), this.Bounds));
        }

        protected void DisposeBuffer()
        {
            _contentBuffer?.Dispose();
            _contentBuffer = null;
        }

        /// <summary>
        /// Kolekce stránek
        /// </summary>
        public virtual IPages Pages { get; set; }

        #region InsertSection
        /// <summary>
        /// Přidání položky bočního panelu
        /// </summary>
        /// <param name="info">informace o přidávané položce</param>
        /// <param name="e">data o myší</param>
        /// <param name="type">Typ vkládané komponenty</param>
        virtual protected IComponent CreateItem(dynamic info, ComponentType type, MouseEventArgs e = null) => null;
        /// <summary>
        /// Přidání položek ze seznamu do sestavy
        /// </summary>
        /// <param name="objects">Přidávané položky</param>
        /// <param name="e">Pozice vložení</param>
        virtual protected List<IComponent> InsertTagComponents(List<object> objects, PointF e) => new List<IComponent>();
        /// <summary>
        /// Odstranění stránky ze seznamu stránek
        /// </summary>
        /// <param name="page">Stránka k odstranění</param>
        virtual public void RemovePage(IPage page) { }

        /// <summary>
        /// Vložení objektu na stránku
        /// </summary>
        /// <param name="obj">Vkládaný objekt</param>
        /// <param name="point">Nová pozice objektu</param>
        /// <param name="type">Typ vkládané komponenty</param>
        protected void InsertObject(object obj, Point point, ComponentType type = ComponentType.valueof)
        {
            // pokud nic není přetahováno pak není co řešit
            if (obj == null)
                return;

            List<IComponent> insertObject = new List<IComponent>();

            // zjistíme pozici kurzoru vůči ploše
            Point _point = PointToClient(new Point(point.X, point.Y));
            MouseEventArgs _pointMouse = new MouseEventArgs(MouseButtons.Left, 0, _point.X, _point.Y, 0);

            OnObjectInserting(_pointMouse);
            insertObject.Add(CreateItem(obj, type, _pointMouse));
            OnObjectInserted(insertObject);
        }
        /// <summary>
        /// Vložení objektu na stránku
        /// </summary>
        /// <param name="obj">Vkládaný objekt</param>
        /// <param name="type">Typ vkládané komponenty</param>
        protected void InsertObject(object obj, ComponentType type = ComponentType.valueof)
        {
            // pokud nic není přetahováno pak není co řešit
            if (obj == null)
                return;

            List<IComponent> insertObject = new List<IComponent>
            {
                CreateItem(obj, type)
            };
            OnObjectInserted(insertObject);
        }
        /// <summary>
        /// Vložení několik objektů na určenou pozici
        /// </summary>
        /// <param name="objects">Objekty k vložení</param>
        /// <param name="point">Pozice, na kterou se vkládá první objekt ze seznamu</param>
        public void InsertObjects(List<object> objects, PointF point)
        {
            // pokud nic není přetahováno pak není co řešit
            if (objects.Count == 0)
                return;

            MouseEventArgs _pointMouse = new MouseEventArgs(MouseButtons.Left, 0, (int)(point.X < 0 ? 0 : point.X), (int)(point.Y < 0 ? 0 : point.Y), 0);

            OnObjectInserting(_pointMouse);
            OnObjectInserted(InsertTagComponents(objects, point));
        }

        /// <summary>
        /// Volá se před vložením objektu na stránku
        /// </summary>
        public event MouseEventHandler ObjectInserting;
        /// <summary>
        /// Volá se po vložení objektu na stránku
        /// </summary>
        public event EventHandlerListIComponent ObjectInserted;

        void OnObjectInserting(MouseEventArgs e) => ObjectInserting?.Invoke(this, e);

        void OnObjectInserted(List<IComponent> comp) => ObjectInserted?.Invoke(this, new EventArgsListIComponent(comp));
        #endregion

        protected IKeyAction GetKeyAction(Keys keyData) => !keyactions.ContainsKey(keyData) ? null : (IKeyAction)keyactions[keyData];

        int pageLeft = -1, pageSpacing = -1;
        /// <summary>
        /// Aktualizace oblastí přetáčení
        /// </summary>
        /// <param name="sender">objekt, který spustil událost</param>
        /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
        public virtual void ActualizeScrollScope(object sender, EventArgs e)
        {
            if (Pages != null)
                // nastavíme novou oblast pro přetáčení
                AutoScrollMinSize = Pages.Size;
            if (pageLeft == -1)
                pageLeft = GSS.PageLeft;
            if (pageSpacing == -1)
                pageSpacing = GSS.PageSpacing;
            // nastavíme odstupy od pravého a dolního okrajů pro přetáčení
            AutoScrollMargin = new Size(pageLeft, pageSpacing);
        }

        /// <summary>
        /// Služba výběru objektů
        /// </summary>
        public SelectionService ServiceSelection => view is IHost host ? host.ServiceSelection : null;

        /// <summary>
        /// Pohled na obsah, kterému patří panel
        /// </summary>
        IViewContent view;
        protected IViewContent _View
        {
            get => view;
            set
            {
                if (GSS == null)
                    GSS = GraphicSettingService.Instance;

                if (GSS != null)
                {
                    if (view != null)
                        GSS.RemoveZoomChanged(view, _ZoomChanged);

                    view = value;

                    if (view != null)
                    {
                        zoom = GSS.GetZoom(view);
                        GSS.AddZoomChanged(view, _ZoomChanged);
                    }
                }
            }
        }

        float zoom;
        /// <summary>
        /// aktuální zvětšení stránky
        /// </summary>
        public float Zoom => zoom;

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        protected AbstractPagePanel() => GenerateKeyActions();
        /// <summary>
        /// služba grafiky
        /// </summary>
        public IGraphicSettingService GSS { get; set; }
        /// <summary>
        /// po změně hodnoty zvětšení
        /// </summary>
        protected virtual void _ZoomChanged(object sender, EventArgs e)
        {
            zoom = GSS.GetZoom(view);
            ActualizeScrollScope(this, EventArgs.Empty);
        }

        /// <summary>
        /// Přidání objektu do seznamu vybraných
        /// </summary>
        /// <param name="selected">Přidávaný objekt</param>
        /// <param name="type">Typ výběru</param>
        protected virtual void SetSelectedComponents(IComponent selected, SelectionTypes type)
        {
            // pokud objekt neexistuje, 
            // nebo neexistuje služba pro práci s vybranými objekty,
            // pak není co řešit
            if (selected == null || !(view is IHost) || ServiceSelection == null)
                return;

            ServiceSelection.SetSelectedComponents(selected, type);
        }
        /// <summary>
        /// nastavení diference dle nové hodnoty
        /// </summary>
        /// <param name="e_transform">nová hodnota pozice myši</param>
        /// <param name="mouseBegin"></param>
        void SetDiffForWidthHeight(MouseEventArgs e_transform, MouseEventArgs mouseBegin)
        {
            if (ServiceSelection.PrimarySelection == null)
                return;

            if (!(ServiceSelection.PrimarySelection is ISizable sizebleObject))
                return;

            XDifference = Cursor == Cursors.SizeWE || Cursor == Cursors.SizeNESW || Cursor == Cursors.SizeNWSE
                ? (int)((e_transform.X - mouseBegin.X) / zoom)
                : 0;

            YDifference = Cursor == Cursors.SizeNS || Cursor == Cursors.SizeNESW || Cursor == Cursors.SizeNWSE
                ? (int)((e_transform.Y - mouseBegin.Y) / zoom)
                : 0;
        }

        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing"></param>
        protected override void Dispose(bool disposing)
        {
            if (Pages != null)
            {
                Pages.ListChanged -= ActualizeScrollScope;
                Pages.Dispose();
                Pages = null;
            }
            _View = null; //odvazu view (nevolam Dispose -> obvykle je volano prave z view.Dispose()

            base.Dispose(disposing);
        }
    }
}