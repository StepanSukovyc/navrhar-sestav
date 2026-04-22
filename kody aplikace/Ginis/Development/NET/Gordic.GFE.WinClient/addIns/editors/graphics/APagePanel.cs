//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.APagePanel.cs                          </Name>
//    <Description> abstraktní třída se společnými vlastnostmi GRRPagePanelu a GRFPagePanelu</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-26                                                  </Created>
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
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.WinForm;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.StructureView;
using Gordic.GFE.Parsers.Utils;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// abstraktní třída se společnými vlastnostmi GRRPagePanelu a GRFPagePanelu
    /// </summary>
    abstract class APagePanel : AbstractPagePanel, IEditControlHandler, ICanBeDirty
    {
        #region AbstractPagePanel
        /// <summary>
        /// vytvoření seznamu reakci na klávesy
        /// </summary>
        protected override void GenerateKeyActions()
        {
            keyactions[Keys.F2] = new AbstractKeyAction();
            keyactions[Keys.F2].OnActionEvent += EditAction;
            keyactions[Keys.Escape] = new AbstractKeyAction();
            keyactions[Keys.Escape].OnActionEvent += EscapeAction;
        }
        /// <summary>
        /// reakce na ESC
        /// </summary>
        /// <returns></returns>
        protected ActionResult EscapeAction() =>
            EditControl != null
            ? (RemoveEditControl(false) ? ActionResult.execute_true : ActionResult.execute_false)
            : ActionResult.execute_none;

        /// <summary>
        /// editace textu
        /// </summary>
        /// <returns></returns>
        protected ActionResult EditAction()
        {
            if (EditControl == null)
            {
                ActivateEditControl();
                return EditControl != null ? ActionResult.execute_true : ActionResult.execute_false;
            }

            return ActionResult.execute_none;
        }

        /// <summary>
        /// Vyčistí dočasný stav interakce po změně výběru nebo odstranění objektu.
        /// </summary>
        protected void ResetInteractionState()
        {
            DrawSquare = DrawSquares.nothing;
            Cursor = Cursors.Default;
            ObjectsChangeLocker = false;
            TransformMouseEventArgs = null;
        }
        #endregion

        #region IDesignSearchHandler
        /// <summary>
        /// Získání objektu, co se nachází ve výběru
        /// </summary>
        /// <param name="selection">Informace o výběru, dle které určíme, na řádky výběru</param>
        /// <returns>Seznam objektů, které se nachází ve výbrané části.</returns>
        public override List<IComponent> SearchComponentText(TextEditor.Document.ISelection selection)
        {
            List<IComponent> result = new List<IComponent>();
            if (Document != null)
                // projdeme všechny stránky a zjistíme, zda některá obsahuje v sobě pozici kurzoru
                foreach (URAbstractContainer page in Document.Pages.Cast<URAbstractContainer>())
                    // ...pak najdeme objekt na této stránce obsahující řádek
                    result.AddRange(page.SearchComponentText(selection));

            return result.Distinct().ToList();
        }

        /// <summary>
        /// hledání všech objektů dle pozice <paramref name="location"/>
        /// pod kurzorem
        /// </summary>
        /// <param name="location">Umístění kurzóru</param>
        /// <returns>Buď objekt samotný nebo seznam vnořených objektů</returns>
        public override List<IComponent> SearchComponent(Point location)
        {
            List<IComponent> result = new List<IComponent>();
            if (TowedService.TowedObject is IComponent)
                result.Add(TowedService.TowedObject as IComponent);
            else if (TowedService.TowedObject is IList<object>)
                result.AddRange(CommonService.GetComponents(TowedService.TowedObject as IList<object>));
            result.Sort(new DeepOrderComparer(true));
            return result.Distinct().ToList();
        }
        #endregion

        #region Mouse
        Timer tm;

        List<ITagComponent> list = new List<ITagComponent>();
        /// <summary>
        /// časovač na delku držení spuštěného levého tlačítka myši
        /// </summary>
        protected AsynchronousMethodTimer mouseDownTimer = new AsynchronousMethodTimer();
        /// <exclude/>
        protected override void OnMouseDown(MouseEventArgs e)
        {
            if (tm == null)
            {
                tm = new Timer();
                tm.Tick += TmTick;
                tm.Start();
            }
            else
                tm.Start();

            // startujeme časovač
            mouseDownTimer.Start(GetObjectForSelection, e, ReportDesignerProperties.Instance.ContextMenuMouseDownWaitMiliseconds);

            base.OnMouseDown(e);
        }
        /// <exclude/>
        protected override void OnMouseMove(MouseEventArgs e)
        {
            StopDownTimer();
            base.OnMouseMove(e);
        }
        /// <exclude/>
        protected override void OnMouseUp(MouseEventArgs e)
        {
            StopDownTimer();
            base.OnMouseUp(e);

            if (e.Button == MouseButtons.Left
                && !ReportDesignerProperties.Instance.F2Activation
                && ServiceSelection.SelectedComponents.Count == 1)
                EditAction();
        }

        void StopDownTimer()
        {
            mouseDownTimer.Stop();
            list.Clear();
        }
        void GetObjectForSelection(MouseEventArgs e)
        {
            lock (syncRoot)
            {
                list.Clear();
                SetTowedObjects(TowedService.TowedObject is IList<object> ? TowedService.TowedObject as IList<object> : new List<object> { TowedService.TowedObject });
            }
        }
        void SetTowedObjects(IList<object> towedList)
        {
            if (towedList != null)
                foreach (var item in towedList)
                    if (item is ITagComponent)
                        list.Add(item as ITagComponent);
                    else SetTowedObjects(item as IList<object>);
        }
        void CommandClick(object sender, EventArgs e)
        {
            if (sender is ToolStripMenuItem tsmi)
            {
                SetSelectedComponents(tsmi.Tag as IComponent, ModifierKeys == Keys.Control ? SelectionTypes.Add : SelectionTypes.Replace);
                Invalidate();
            }
        }
        void TmTick(object sender, EventArgs e)
        {
            if (mouseDownTimer.IsStarted)
            {
                if (mouseDownTimer.IsCompleted)
                {
                    tm.Stop();
                    if (list.Count > 1)
                    {
                        ContextMenuStrip contextMenu = new ContextMenuStrip();

                        foreach (var item in list)
                        {
                            ToolStripMenuItem command = new ToolStripMenuItem(Convert.ToString(item.ComponentType));
                            switch (item.ComponentType)
                            {
                                case ComponentType.region:
                                    command.Image = WinFormsResourceService.GetBitmap("Icons__Gin__oblast");
                                    break;
                                case ComponentType.grid:
                                case ComponentType.table:
                                    command.Image = WinFormsResourceService.GetBitmap("Icons__Gin__tabulka");
                                    break;
                                case ComponentType.text:
                                case ComponentType.textbox:
                                    command.Image = WinFormsResourceService.GetBitmap("Icons__Gin__prvek_textbox");
                                    break;
                                case ComponentType.image:
                                case ComponentType.imagelink:
                                case ComponentType.imageof:
                                    command.Image = WinFormsResourceService.GetBitmap("Icons__Gin__prvek_obrazek");
                                    break;
                                case ComponentType.chart:
                                case ComponentType.drawing:
                                    command.Image = WinFormsResourceService.GetBitmap("Icons__Gin__graf_kolacovy");
                                    break;
                                default:
                                    command.Image = WinFormsResourceService.GetBitmap("Icons__Ost__struktura");
                                    break;
                            }
                            command.Tag = item;
                            command.Click += CommandClick;
                            contextMenu.Items.Add(command);
                        }

                        contextMenu.Show(this, TransformMouseEventArgs.Location);
                        isShowSelectionContextMenu = true;
                        StopDownTimer();
                    }
                }
            }
            else
                tm.Stop();
        }
        #endregion

        /// <summary>
        /// stránky dokumentu
        /// </summary>
        public override IPages Pages { get => Document?.Pages; }

        readonly object syncRoot = new object();

        /// <summary>
        /// Jednotka struktury
        /// </summary>
        public override GFEStructure Structure { get => _View is IStructureHost vish && vish.StructureEntry != null ? vish.StructureEntry.Structure : null; }

        GraphicFormationDocument document;
        /// <summary>
        /// Dokument ovladače
        /// </summary>
        public GraphicFormationDocument Document
        {
            get => document;
            set
            {
                document = value;
                ActualizeScrollScope(this, EventArgs.Empty);
            }
        }

        #region IEditControlHandler
        /// <summary>
        /// Aktivace ovladacího prvku stránky
        /// </summary>
        public void ActivateEditControl()
        {
            if (!(ServiceSelection.PrimarySelection is IEditControlHandler v)) return;

            v.ActivateEditControl();
            EditControl = v.EditControl;
            if (EditControl != null)
            {
                if (EditControl is WinForms.Controls.IGUserInput uinp)
                {
                    uinp.InputChanged += delegate { ValueChange(); };
                    EditControl.KeyPress += EditControl_KeyPress;
                    EditControl.LostFocus += EditControl_LostFocus;
                }
                SetWidthAndLocation();

                Controls.Add(EditControl as Control);
                EditControl.Focus();
            }
            Invalidate();
        }

        void EditControl_LostFocus(object sender, EventArgs e) => RemoveEditControl(true);

        void EditControl_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (Control.ModifierKeys == (Keys.None | Keys.Control))
                RemoveEditControl(true);
        }

        /// <summary>
        /// nastavení umístění ovladače
        /// </summary>
        protected virtual void SetWidthAndLocation()
        {
            if (EditControl != null)
            {
                var owner = ServiceSelection.PrimarySelection as ITagComponent;
                var p = Point.Ceiling(new PointF(owner.LeftZoom, owner.TopZoom));
                var s = new Size((int)Math.Ceiling(owner.LeftZoom + owner.WidthZoom) - p.X, (int)Math.Ceiling(owner.TopZoom + owner.HeightZoom) - p.Y);
                p.Offset(-HorizontalScroll.Value, -VerticalScroll.Value);
                EditControl.Bounds = new Rectangle(p, s);

                var r = owner.ContentBounds;
                r.Offset(-HorizontalScroll.Value, -VerticalScroll.Value);
                EditControl.ContentBounds = r;
            }
        }

        /// <summary>
        /// Ovládací prvek stránky
        /// </summary>
        [Browsable(false)]
        public IEditControl EditControl { get; protected set; }
        void ValueChange()
        {
            if (EditControl != null)
                EditControl.IsDirty = true;

            isDirty = true;
            OnDirtyChanged();
        }

        /// <summary>
        /// Odstranění ovladacího prvku stránky
        /// </summary>
        /// <param name="updateChanges">Validace obsahu</param>
        public bool RemoveEditControl(bool updateChanges)
        {
            if (EditControl != null)
            {
                if (updateChanges)
                    EditControl.RefreshText();

                if (Controls.Contains(EditControl as Control)) Controls.Remove(EditControl as Control);
                EditControl?.Dispose();
                EditControl = null;
            }
            return true;
        }
        #endregion

        #region ICanBeDirty
        bool isDirty = false;
        /// <summary>
        /// Pokud tato vlastnost vrácí TRUE, pak obsah byl pozměněn 
        /// od okamžíku posledního uložení/načtení obsahu
        /// </summary>
        public bool IsDirty { get => isDirty; }

        /// <summary>
        /// Se volá pokud obsah byl pozměněn od okamžíku posledního uložení/načtení
        /// </summary>
        public event EventHandler IsDirtyChanged;
        void OnDirtyChanged() => IsDirtyChanged?.Invoke(this, EventArgs.Empty);
        #endregion

        /// <summary>
        /// Najdeme položku pod kurzorem
        /// </summary>
        /// <param name="value">údaje o myši</param>
        protected void SetTowedObject(object value)
        {
            Document?.SetTowedObject((value as MouseEventArgs).Location);
        }

        /// <summary>
        /// Vložení objektů ze zásobníku na stránku
        /// </summary>
        internal void Paste() => ClipboardService.Paste(this, TransformMouseEventArgs.Location);

        /// <summary>
        /// zaokrouhlení velikosti
        /// </summary>
        /// <param name="_xPixels"></param>
        /// <param name="actualFocused"></param>
        /// <returns></returns>
        protected float AlignXByResolution(float _xPixels, IChangeable actualFocused)
        {
            //zkorigujeme veličinu změny dle toho, zda uživatel si přeje zaokrouhlovat šířku či nikoliv
            if (ReportDesignerProperties.Instance.AlignWidthResize)
            {
                SizeValue metr = new SizeValue("1" + (actualFocused as ISizable).Width.Metrics, (actualFocused as ISizable).Width.PC100);

                return _xPixels < 0 ? -CommonService.AlignValueByResolution(-_xPixels, metr) : CommonService.AlignValueByResolution(_xPixels, metr);
            }
            return _xPixels;
        }
        /// <summary>
        /// zaokrouhlení velikosti
        /// </summary>
        /// <param name="_yPixels"></param>
        /// <param name="actualFocused"></param>
        /// <param name="resolution"></param>
        /// <returns></returns>
        protected float AlignYByResolution(float _yPixels, IChangeable actualFocused, float resolution = -1) =>
             /*zaokrouhlení velikosti*/
             ReportDesignerProperties.Instance.AlignHeightResize
                ? (_yPixels < 0 ? -CommonService.AlignValueByResolution(-_yPixels, resolution) : CommonService.AlignValueByResolution(_yPixels, resolution))
                : _yPixels;
        /*zaokrouhlení ^*/

        /// <summary>
        /// Zjištění, zda je nebo není zapotřebí přenastavit TowedObject
        /// V případě, že je, proběhne přenastavení
        /// </summary>
        /// <param name="mea">Údaje o mýši</param>
        /// <param name="isChanging">TRUE - probíhá změna velikosti</param>
        protected void SetTowedService(MouseEventArgs mea, bool isChanging = false)
        {
            // pokud probíhá změna šířky jedné buňky, potom není třeba vyhledávát tažený objekt - ten je neměnný SS 21.2.2024
            if (!isChanging || ServiceSelection.SelectedComponents.Count > 1)
                TowedService.StartTowedObjectThread(mea, SetTowedObject, this);
            else if (isChanging && ServiceSelection.SelectedComponents.Count == 1)
                TowedService.SetTowedObject(ServiceSelection.SelectedComponents.FirstOrNull(obj => obj is ITagComponent && (obj as ITagComponent).Parent != null), false);
        }


        #region Painting
        /// <summary>
        /// Kreslení ovladače
        /// </summary>
        /// <param name="e">Argument kreslení</param>
        protected override void PaintControl(PaintEventArgs e)
        {
            if (DesignMode)
                return;

            // pokud obrázek ve vyrovnávací pamětí je prázdný
            // pak ho vytvoříme
            if (_contentBuffer == null)
                _contentBuffer = new Bitmap(Width, Height);
            // získáme ovladač grafiky
            Graphics graphics = Graphics.FromImage(_contentBuffer);

            // připravíme pozadí
            ClearBackground(graphics);
            PaintPanel(e, graphics);
            // malování grafiky
            graphics.Dispose();

            // zkopírujeme vše co je ve vyrovnávací paměti na obrazovku
            e.Graphics.DrawImageUnscaledAndClipped(_contentBuffer, new Rectangle(0, 0, Width, Height));
        }
        #endregion
    }
}