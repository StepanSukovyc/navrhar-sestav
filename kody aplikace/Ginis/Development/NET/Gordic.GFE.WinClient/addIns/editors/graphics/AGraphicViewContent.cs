//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AbstractGraphicViewContent.cs            </Name>
//    <Description> abstraktní třída grafického pohledu na obsah                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2013-05-28                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.DefaultEditor;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Designer.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.InfoSectionView;
using Gordic.GFE.WinClient.Service;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.StructureView;
using Gordic.TextEditor;
using Gordic.TextEditor.Document;
using Gordic.WinForms.Controls;
using System;
using System.Collections;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Drawing;
using System.Linq;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// abstraktní třída grafického pohledu na obsah
    /// </summary>
    abstract class AGraphicViewContent : DefaultAbstractSecondaryViewContent,
        IHost, IHasPropertyContainer, IMementoCapable, IHasTextContent, IFormatHandler, IZoomHandler, IUndoHandler,
        IStructureHost, IToolsHost, IClipboardHandler, IInfoSectionHost, ISurroundHandler, IDesignerPropertyHandler, ITextFontHandler
    {
        #region DefaultAbstractSecondaryViewContent
        /// <summary>
        /// načtení sekundárního obsahu dle primárního
        /// </summary>
        protected override void LoadFromPrimary()
        {
            IsLoading = true;
            LoggingService.Debug(GResources.GetResourceText(29450069) + "..."); //RC 29450069 : načtení designéru dle textového editoru
            using (AsynchronousWaitDialog monitor = AsynchronousWaitDialog.ShowWaitDialog(GResources.GetResourceText(29450070))) //RC 29450070 : načtení designéru
                (container as IDocumentView).LoadXml(PrimaryFile);
            IsLoading = false;
        }
        /// <summary>
        /// uložení sekundarního obsahu do primárního
        /// </summary>
        protected override void SaveToPrimary()
        {
            LoggingService.Debug(GResources.GetResourceText(29450071) + "..."); //RC 29450071 : aktualizace textového editoru dle designéru
            if (!(container as IDocumentView).IsDirty)
                return;

            CompilationUnit unit = CompilationService.Units[PrimaryFile] as CompilationUnit;
            using (AsynchronousWaitDialog monitor = AsynchronousWaitDialog.ShowWaitDialog(GResources.GetResourceText(29450072))) //RC 29450072 : generování grafické sestavy
                unit.Compile(this);

            if (unit.ErrorsDuringCompile)
                if (!PrimaryFile.CancelSaving)
                    if (GMessageBox.ShowQuestion(string.Format(GResources.GetResourceText(29450073)  //RC 29450073 : Chyba generování sestavy
                        + "\n\n{0}\n\n" + GResources.GetResourceText(29450074), unit.ErrorMessage), SimpleDesktop.MainForm) == DialogResult.No) //RC 29450074 : Přejete si uložit poslední známý překlad?
                    {
                        PrimaryFile.CancelSaving = true;
                        return;
                    }

            ignoreDirtyChange = true;
            (container as IDocumentView).IsDirty = false;
            ignoreDirtyChange = false;
        }

        /// <exclude/>
        public override bool SwitchFromThisWithoutSaveLoad(OpenedFile file, IViewContent newView)
        {
            //TODO: dodělat aby se kompilovalo po provedení změn 
            // a zde by mělo záležet také ne tom, zda kompilace byla úspěšná
            //if (this.ValidateDocument(true))
            //{
            if (container != null)
                // uložení vlastností stránky.např. barva, obrázek atd.
                memento = (container as IMementoCapable).CreateMemento();
            return base.SwitchFromThisWithoutSaveLoad(file, newView);
            //}
            //return false;
        }
        /// <exclude/>
        public override void SwitchToThisWithoutSaveLoad(OpenedFile file, IViewContent oldView)
        {
            base.SwitchToThisWithoutSaveLoad(file, oldView);
            if (container != null)
            {
                if (memento != null)
                    // načteme nastavení pro stránky atd. třeba barva nebo obrázek pozadí
                    (container as IMementoCapable).SetMemento(memento);

                ThreadService.SafeThreadAsyncCall(UpdateSelection, oldView as ITextEditorControlProvider);
            }
        }

        /// <summary>
        /// Je Windows.Forms ovladač pro dané zobrazení.
        /// </summary>
        public override object Control => container;
        #endregion

        #region IHost
        /// <summary>
        /// služba nastavitelná z konstruktoru
        /// </summary>
        SelectionService serviceSelection;
        /// <summary>
        /// Služba výběru objektů
        /// </summary>
        public SelectionService ServiceSelection => serviceSelection;
        /// <summary>
        /// nastavitelné a volatelné z konstruktoru děděných tříd
        /// </summary>
        IDesignerHost host;
        /// <summary>
        /// Hostovací služba
        /// </summary>
        public IDesignerHost Host => host;
        /// <summary>
        /// kvůli dědění
        /// </summary>
        UndoRedoManager undoRedoManager;
        /// <summary>
        /// Správce undoredo operací
        /// </summary>
        public IUndoRedoManager UndoRedoManager => undoRedoManager;
        #endregion

        #region Design
        DefaultServiceContainer defaultServiceContainer;
        DesignSurface designSurface;

        static readonly DesignSurfaceManager designSurfaceManager = new DesignSurfaceManager();
        /// <summary>
        /// vytvoření konstruktoru
        /// </summary>
        /// <param name="serviceProvider"></param>
        /// <returns></returns>
        public static DesignSurface CreateDesignSurface(IServiceProvider serviceProvider)
        {
            return designSurfaceManager.CreateDesignSurface(serviceProvider);
        }
        #endregion

        #region IHasPropertyContainer
        PropertyContainer propertyContainer = new PropertyContainer();
        /// <summary>
        /// Kontainer s objekty pro vlastnosti
        /// </summary>
        public PropertyContainer PropertyContainer => propertyContainer;

        /// <summary>
        /// Aktualizace okna vlastnosti
        /// </summary>
        protected void UpdatePropertyPad()
        {
            if (Host != null)
            {
                propertyContainer.Host = Host;
                propertyContainer.SelectableObjects = Host.Container.Components;

                if (serviceSelection != null)
                    UpdatePropertyPadSelection(serviceSelection);
            }
        }
        void UpdatePropertyPadSelection(ISelectionService selectionService)
        {
            ICollection selection = selectionService.GetSelectedComponents();
            object[] selArray = new object[selection.Count];
            selection.CopyTo(selArray, 0);
            propertyContainer.SelectedObjects = selArray.ToList().FindAll(itm => (((itm is IParentable) && (itm as IParentable).Parent != null) || !(itm is IParentable)) && (!(itm is IReadOnly) || !(itm as IReadOnly).ReadOnly)).ToArray();
        }
        void SelectionChangedHandler(object sender, EventArgs args)
        {
            LocalCommonService.ClosePropertyOptions();
            UpdatePropertyPadSelection((ISelectionService)sender);
        }
        #endregion

        #region IMementoCapable
        /// <exclude/>
        public Property CreateMemento()
        {
            Property property = new Property();
            property.Set("zoom", GraphicSettingService.GetZoom(this));
            property.Set("showgrid", GraphicSettingService.GetShowGrid(this));
            property.Set("showorder", GraphicSettingService.GetShowOrder(this));
            property.Set("showcolorof", GraphicSettingService.GetShowColorOf(this));
            property.Set("resolution", GraphicSettingService.GetResolution(this));
            if (container != null && container is IMementoCapable)
            {
                Property containerProp = (container as IMementoCapable).CreateMemento();
                if (containerProp != null)
                    memento = containerProp;

                if (memento != null)
                    property.Set("ContainerControl", this.memento);
            }
            return property;
        }

        /// <exclude/>
        public void SetMemento(Property pMemento)
        {
            GraphicSettingService.SetZoom(this, pMemento.Get("zoom", ReportDesignerProperties.Instance.Zoom));
            GraphicSettingService.SetShowGrid(this, pMemento.Get("showgrid", ReportDesignerProperties.Instance.ShowGrid));
            GraphicSettingService.SetShowColorOf(this, pMemento.Get("showcolorof", ReportDesignerProperties.Instance.ShowColorOf));
            GraphicSettingService.SetResolution(this, new SizeValue(pMemento.Get("resolution", ReportDesignerProperties.Instance.Resolution)));
            this.memento = pMemento.Get("ContainerControl", new Property());
        }
        #endregion

        #region IHasTextContent Helpers
        /// <summary>
        /// Helper metoda pro provedení text alignment operace s UndoRedo transakcí
        /// </summary>
        /// <param name="alignAction">Akce pro zarovnání textu</param>
        /// <param name="transactionText">Text pro UndoRedo transakci</param>
        void ExecuteTextAlignment(Action<object> alignAction, string transactionText)
        {
            if (!EnableChange)
                return;

            using (UndoRedoService.StartTransaction(transactionText))
            {
                ServiceSelection.SelectedComponents.ForEach(alignAction);
                UndoRedoService.Commit();
            }
        }

        /// <summary>
        /// Helper metoda pro provedení font style operace s UndoRedo transakcí
        /// </summary>
        /// <param name="styleAction">Akce pro změnu stylu písma</param>
        /// <param name="transactionText">Text pro UndoRedo transakci</param>
        void ExecuteFontStyle(Action<object> styleAction, string transactionText)
        {
            if (!EnableChange)
                return;

            using (UndoRedoService.StartTransaction(transactionText))
            {
                isFirst = true;
                ServiceSelection.SelectedComponents.ForEach(styleAction);
                UndoRedoService.Commit();
            }
        }
        #endregion

        #region IHasTextContent
        /// <summary>
        /// Dostupnost funkce zarovnání textu
        /// </summary>
        public bool EnableChange => ServiceSelection != null && ServiceSelection.SelectedComponents.Exists(cmp => cmp is ITextHandler || cmp is IText);

        /// <summary>
        /// Vertikální zarovnání textu nahoru
        /// </summary>
        public void AlignTop() => ExecuteTextAlignment(_AlignTop, GResources.GetResourceText(29450075));
        void _AlignTop(object cmp)
        {
            if (!(cmp is ITextHandler || cmp is IText))
                return;

            ((IHasTextContent)(cmp is IText ? cmp : (cmp as ITextHandler).Text)).AlignTop();
        }

        /// <summary>
        /// Vertikální zarovnání textu na střed
        /// </summary>
        public void AlignMiddle() => ExecuteTextAlignment(_AlignMiddle, GResources.GetResourceText(29450075));
        void _AlignMiddle(object cmp)
        {
            if (!(cmp is ITextHandler || cmp is IText))
                return;

            ((IHasTextContent)(cmp is IText ? cmp : (cmp as ITextHandler).Text)).AlignMiddle();
        }

        /// <summary>
        /// Vertikální zarovnání textu dolů
        /// </summary>
        public void AlignBottom() => ExecuteTextAlignment(_AlignBottom, GResources.GetResourceText(29450075));
        void _AlignBottom(object cmp)
        {
            if (!(cmp is ITextHandler || cmp is IText))
                return;

            ((IHasTextContent)(cmp is IText ? cmp : (cmp as ITextHandler).Text)).AlignBottom();
        }

        /// <summary>
        /// Horizontální zarovnání textu doleva
        /// </summary>
        public void AlignLeft() => ExecuteTextAlignment(_AlignLeft, GResources.GetResourceText(29450076));
        void _AlignLeft(object cmp)
        {
            if (!(cmp is ITextHandler || cmp is IText))
                return;

            ((IHasTextContent)(cmp is IText ? cmp : (cmp as ITextHandler).Text)).AlignLeft();
            if (cmp is IEditControlHandler handler && handler.EditControl != null)
                handler.EditControl.TextAlign = HorizontalAlignment.Left;
        }

        /// <summary>
        /// Horizontální zarovnání textu na střed
        /// </summary>
        public void AlignCenter() => ExecuteTextAlignment(_AlignCenter, GResources.GetResourceText(29450076));
        void _AlignCenter(object cmp)
        {
            if (!(cmp is ITextHandler || cmp is IText))
                return;

            ((IHasTextContent)(cmp is IText ? cmp : (cmp as ITextHandler).Text)).AlignCenter();
            if (cmp is IEditControlHandler handler && handler.EditControl != null)
                handler.EditControl.TextAlign = HorizontalAlignment.Center;
        }

        /// <summary>
        /// Horizontální zarovnání textu doprava
        /// </summary>
        public void AlignRight() => ExecuteTextAlignment(_AlignRight, GResources.GetResourceText(29450076));
        void _AlignRight(object cmp)
        {
            if (!(cmp is ITextHandler || cmp is IText))
                return;

            ((IHasTextContent)(cmp is IText ? cmp : (cmp as ITextHandler).Text)).AlignRight();
            if (cmp is IEditControlHandler handler && handler.EditControl != null)
                handler.EditControl.TextAlign = HorizontalAlignment.Right;
        }

        /// <summary>
        /// Horizontální zarovnání textu justify
        /// </summary>
        public void AlignJustify() => ExecuteTextAlignment(_AlignJustify, GResources.GetResourceText(29450076));
        void _AlignJustify(object cmp)
        {
            if (!(cmp is ITextHandler || cmp is IText))
                return;

            ((IHasTextContent)(cmp is IText ? cmp : (cmp as ITextHandler).Text)).AlignJustify();
        }

        /// <summary>
        /// Nastavení řezu písma na 'regular'
        /// </summary>
        public void Regular() => ExecuteTextAlignment(_Regular, GResources.GetResourceText(29450077));
        void _Regular(object cmp)
        {
            if (!(cmp is ITextHandler || cmp is IText))
                return;

            ((IHasTextContent)(cmp is IText ? cmp : (cmp as ITextHandler).Text)).Regular();

            if (cmp is IEditControlHandler handler && handler.EditControl != null)
                handler.EditControl.Font = new Font(handler.EditControl.Font, handler.EditControl.Font.Style | FontStyle.Regular);
        }

        /// <summary>
        /// Nastavení řezu písma na 'bold'
        /// </summary>
        /// <param name="pIsTrue">TRUE - nastavení na tučné písmo, opačně - vyjmutí tučného písma</param>
        public void Bold(bool pIsTrue = true) => ExecuteFontStyle(_Bold, GResources.GetResourceText(29450077));
        bool isFirst, isTrue;
        void _Bold(object cmp)
        {
            if (!(cmp is ITextHandler || cmp is IText))
                return;

            var iText = (cmp is IText ? cmp : (cmp as ITextHandler).Text);

            if (isFirst)
            {
                isFirst = false;
                isTrue = (iText as IText).TextFont.Font.Bold;
            }
            ((IHasTextContent)iText).Bold(!isTrue);

            if (cmp is IEditControlHandler handler && handler.EditControl != null)
                handler.EditControl.Font = new Font(handler.EditControl.Font, handler.EditControl.Font.Style | FontStyle.Bold);
        }

        /// <summary>
        /// Nastavení řezu písma na 'italic'
        /// </summary>
        /// <param name="pIsTrue">TRUE - nastavení na 'italic' písmo, opačně - vyjmutí 'italic' písma</param>
        public void Italic(bool pIsTrue = true) => ExecuteFontStyle(_Italic, GResources.GetResourceText(29450077));
        void _Italic(object cmp)
        {
            if (!(cmp is ITextHandler || cmp is IText))
                return;

            var iText = (cmp is IText ? cmp : (cmp as ITextHandler).Text);

            if (isFirst)
            {
                isFirst = false;
                isTrue = (iText as IText).TextFont.Font.Italic;
            }
            ((IHasTextContent)iText).Italic(!isTrue);

            if (cmp is IEditControlHandler handler && handler.EditControl != null)
                handler.EditControl.Font = new Font(handler.EditControl.Font, handler.EditControl.Font.Style | FontStyle.Italic);
        }

        /// <summary>
        /// Nastavení řezu písma na 'underline'
        /// </summary>
        /// <param name="pIsTrue">TRUE - nastavení na 'underline' písmo, opačně - vyjmutí 'underline' písma</param>
        public void Underline(bool pIsTrue = true) => ExecuteFontStyle(_Underline, GResources.GetResourceText(29450077));
        void _Underline(object cmp)
        {
            if (!(cmp is ITextHandler || cmp is IText))
                return;

            var iText = (cmp is IText ? cmp : (cmp as ITextHandler).Text);

            if (isFirst)
            {
                isFirst = false;
                isTrue = (iText as IText).TextFont.Font.Underline;
            }
            ((IHasTextContent)iText).Underline(!isTrue);

            if (cmp is IEditControlHandler handler && handler.EditControl != null)
                handler.EditControl.Font = new Font(handler.EditControl.Font, handler.EditControl.Font.Style | FontStyle.Underline);
        }

        /// <summary>
        /// Nastavení řezu písma na 'strikeout'
        /// </summary>
        /// <param name="pIsTrue">TRUE - nastavení na 'strikeout' písmo, opačně - vyjmutí 'strikeout' písma</param>
        public void Strikeout(bool pIsTrue = true) => ExecuteFontStyle(_Strikeout, GResources.GetResourceText(29450077));
        void _Strikeout(object cmp)
        {
            if (!(cmp is ITextHandler || cmp is IText))
                return;

            var iText = (cmp is IText ? cmp : (cmp as ITextHandler).Text);

            if (isFirst)
            {
                isFirst = false;
                isTrue = (iText as IText).TextFont.Font.Strikeout;
            }
            ((IHasTextContent)iText).Strikeout(!isTrue);

            if (cmp is IEditControlHandler handler && handler.EditControl != null)
                handler.EditControl.Font = new Font(handler.EditControl.Font, handler.EditControl.Font.Style | FontStyle.Strikeout);
        }
        #endregion

        #region IFormatHandler
        /// <summary>
        /// Aplikovat formát
        /// </summary>
        /// <param name="copiedFormat">kopírovaný formát</param>
        public virtual bool ApplyFormat(object copiedFormat = null)
        {
            if (!EnableApplyFormat)
                return false;

            using (UndoRedoService.StartTransaction(GResources.GetResourceText(29450078))) //RC 29450078 : aplikování formátu
            {
                ServiceSelection.SelectedComponents.ForEach(_ApplayFormat);

                if (isApplayFormat)
                {
                    OnFormatApplayed();
                    UndoRedoService.Commit();
                }
            }
            return true;
        }
        /// <summary>
        /// volá se po aplikaci formátu
        /// </summary>
        protected event EventHandler FormatApplayed;

        void OnFormatApplayed()
        {
            FormatApplayed?.Invoke(this, EventArgs.Empty);
        }
        bool isApplayFormat = false;
        void _ApplayFormat(object cmp)
        {
            if (!(cmp is IFormatHandler))
                return;
            if (!isApplayFormat)
                isApplayFormat = ((IFormatHandler)cmp).ApplyFormat();
            else ((IFormatHandler)cmp).ApplyFormat();
        }
        /// <summary>
        /// Kopírovat formát
        /// </summary>
        public void CopyFormat()
        {
            if (!EnableCopyFormat)
                return;
            ClipboardService.CopyFormat(ServiceSelection);
        }
        /// <summary>
        /// Formát lze aplikovat
        /// </summary>
        public bool EnableApplyFormat => ServiceSelection != null && ClipboardService.CopiedFormat != null;
        /// <summary>
        /// Formát lze kopírovat
        /// </summary>
        public bool EnableCopyFormat => ServiceSelection != null && ServiceSelection.SelectedComponents.Count == 1 && ServiceSelection.SelectedComponents.Exists(cmp => cmp is IFormatHandler);
        #endregion

        #region IZoomHandler
        /// <summary>
        /// Hodnota zvětšení
        /// </summary>
        /// <remarks>Math.Round být musí, protože bez něj se místo 90 % zobrazí pouze 89 %</remarks>
        public string ZoomValue
        {
            get => $"{(int)Math.Round(Zoom * 100)} %";
            set
            {

                if (string.IsNullOrEmpty(value))
                    return;
                float zoom = -1;
                value = value.Replace("%", string.Empty);
                if (float.TryParse(value, out zoom))
                {
                    if (zoom != -1)
                        Zoom = zoom / 100;
                }
                else
                    ThreadService.SafeThreadAsyncCall(delegate
                    {
                        try
                        {
                            IPage page = (Control as IDocumentView).Pages.First();
                            if (page != null)
                            {
                                // 3x kvůli přesnosti přepočtu Zoom veličiny dle šířky stránky - hodnota page.Left
                                Zoom = (((Control as IDocumentView).Pages.Parent as AbstractPagePanel).Width - page.Left - ReportDesignerProperties.Instance.PageLeft - 20) / page.Width;// 20 - šířka vertikalního posuvníku
                                Zoom = (((Control as IDocumentView).Pages.Parent as AbstractPagePanel).Width - page.Left - ReportDesignerProperties.Instance.PageLeft - 20) / page.Width;// 20 - šířka vertikalního posuvníku
                                Zoom = (((Control as IDocumentView).Pages.Parent as AbstractPagePanel).Width - page.Left - ReportDesignerProperties.Instance.PageLeft - 20) / page.Width;// 20 - šířka vertikalního posuvníku
                            }
                        }
                        catch (Exception ex)
                        {
                            MessageService.ShowErrorFormatted(GResources.GetResourceText(29450079), " '{0}' ", GResources.GetResourceText(29450080) + "!\r\n{1}", value, ex.Message); //RC 29450080 : není platná!
                        }
                    });
            }
        }
        #endregion        

        #region IDesignerPropertyHandler
        /// <summary>
        /// veličina indikujíci dostupnosti změny viditelnosti rozlišení
        /// </summary>
        public virtual bool EnableShowGrid => true;
        /// <summary>
        /// veličina indikujíci dostupnosti změny viditelnosti rozlišení
        /// </summary>
        public virtual bool EnableShowOrder => true;

        /// <summary>
        /// Indikátor podbarevní datových položek
        /// </summary>
        public bool ShowColorOf
        {
            get => GraphicSettingService.ShowColorOf;
            set => GraphicSettingService.ShowColorOf = value;
        }
        /// <summary>
        /// Indikátor podbarevní položek
        /// </summary>
        public bool ShowColorOfObjects
        {
            get => ReportDesignerDesignerProperties.Instance.ShowColorOfObjects;
            set => ReportDesignerDesignerProperties.Instance.ShowColorOfObjects = value;
        }
        /// <summary>
        /// Indikátor zobrazení mřížky
        /// </summary>
        public bool ShowGrid
        {
            get => GraphicSettingService.ShowGrid;
            set => GraphicSettingService.ShowGrid = value;
        }
        /// <summary>
        /// Indikátor zobrazení řazení
        /// </summary>
        public bool ShowOrder
        {
            get => GraphicSettingService.ShowOrder;
            set => GraphicSettingService.ShowOrder = value;
        }
        /// <summary>
        /// Faktor zvětšení
        /// </summary>
        public float Zoom
        {
            get => GraphicSettingService.Zoom;
            set => GraphicSettingService.Zoom = value;
        }
        #endregion

        #region IUndoHandler
        /// <summary>
        /// Operace vratit odvolat zpět je povolená
        /// </summary>
        public bool EnableRedo => UndoRedoService.CanRedo;
        /// <summary>
        /// Operace vrátit zpět je povolená
        /// </summary>
        public bool EnableUndo => UndoRedoService.CanUndo;

        /// <summary>
        /// Odvolaní operace zpět
        /// </summary>
        public void Redo()
        {
            if (UndoRedoManager != null)
                UndoRedoManager.Redo();
        }
        /// <summary>
        /// vrátit zpět
        /// </summary>
        public void Undo()
        {
            if (UndoRedoManager != null)
                UndoRedoManager.Undo();
        }
        #endregion

        #region IStructureHost
        /// <summary>
        /// Jednotka struktury
        /// </summary>
        public StructureViewEntry StructureEntry => (primaryViewContent as IStructureHost)?.StructureEntry;
        #endregion

        #region IToolsHost
        /// <summary>
        /// nástrojová lišta
        /// </summary>
        abstract public object ToolsControl { get; }
        #endregion

        #region IClipboardHandler
        /// <summary>
        /// Akce na kopírování objektu
        /// </summary>
        public void Copy() { ClipboardService.Copy(ServiceSelection); }
        /// <summary>
        /// Akce na vyjmutí objektu
        /// </summary>
        public void Cut()
        {
            EditCommands.Copy.Execute(this);
            EditCommands.Delete.Execute(this);
        }
        /// <summary>
        /// Akce na odstranění výběru
        /// </summary>
        public void Delete() { ClipboardService.Delete(ServiceSelection); }

        /// <summary>
        /// Lze kopírovat
        /// </summary>
        public bool EnableCopy
        {
            get => ServiceSelection != null && ServiceSelection.SelectedComponents.Exists(obj => obj is ITagComponent && (obj as ITagComponent).Parent != null && !(obj as IReadOnly).ReadOnly);
        }
        /// <summary>
        /// Lze vyjmout
        /// </summary>
        public bool EnableCut
        {
            get => ServiceSelection != null && ServiceSelection.SelectedComponents.Exists(obj => obj is ITagComponent && (obj as ITagComponent).Parent != null && !(obj as IReadOnly).ReadOnly);
        }
        /// <summary>
        /// Lze odstranit
        /// </summary>
        public bool EnableDelete
        {
            get => ServiceSelection != null && ServiceSelection.SelectedComponents.Count != 0 && ServiceSelection.SelectedComponents.Exists(obj => !(obj as IReadOnly).ReadOnly);
        }
        /// <summary>
        /// Lze vkládat
        /// </summary>
        public virtual bool EnablePaste => ClipboardService.EnablePaste;
        /// <summary>
        /// Lze vybrat vše
        /// </summary>
        public bool EnableSelectAll => true;
        /// <summary>
        /// Akce na vložení objektu
        /// </summary>
        public virtual void Paste() { }
        /// <summary>
        /// Reakce na Vybrat vše
        /// </summary>
        public void SelectAll() { }
        #endregion

        #region IInfoSectionHost
        /// <summary>
        /// indikuje možnost editace infosekce
        /// </summary>
        public bool ISEnableEdit => true;

        /// <summary>
        /// Struktura
        /// </summary>
        public InfoSectionViewEntry InfoSectionEntry => (primaryViewContent as IInfoSectionHost)?.InfoSectionEntry;
        /// <summary>
        /// reakce na změnu vlastnosti položky INFO sekce
        /// </summary>
        /// <param name="sender">objekt, který spustil událost</param>
        /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
        public virtual void OnInfoPropertyChanged(object sender, EventArgs e) { }
        #endregion

        #region ISurroundHandler
        /// <summary>
        /// Změna šířky je povolená
        /// </summary>
        public bool EnableSurround => true;
        /// <summary>
        /// Změna stylu je povolená
        /// </summary>
        public bool EnableSurroundColor => true;
        /// <summary>
        /// Změna barvy je povolená
        /// </summary>
        public bool EnableSurroundDashStyle => true;
        /// <summary>
        /// Změna orámování je povolená
        /// </summary>
        public bool EnableSurroundWidth => true;

        /// <summary>
        /// Orámování dle typu orámování
        /// </summary>
        /// <param name="surroundType">Typ orámování</param>
        public void SetSurround(SurroundType surroundType)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// Barva rámečku
        /// </summary>
        public IComplexColor PropertySurroundColor { get; set; }
        /// <summary>
        /// Styl rámečku
        /// </summary>
        [TypeConverter(typeof(ComplexDashStyleConverter))]
        public string PropertySurroundDashStyle { get; set; }
        /// <summary>
        /// šířka orámování
        /// </summary>
        public string PropertySurroundWidth { get; set; }

        /// <summary>
        /// Orámování
        /// </summary>
        public IComplexSurround Surround { get; set; }
        /// <summary>
        /// Vnitřní orámování
        /// </summary>
        public IInnerSurround InnerSurround { get; set; }
        #endregion

        #region ITextFontHandler
        /// <summary>
        /// změna barvy písma
        /// </summary>
        /// <param name="commit">indikuje nutnost ukončení transakce</param>
        public void ChangeColor(bool commit)
        {
            if (serviceSelection != null)
                try
                {
                    if (!UndoRedoManager.IsTransactionStarted)
                        UndoRedoManager.StartTransaction("změna barvy");

                    foreach (var item in serviceSelection.SelectedComponents.FindAll(itm => itm is IPropertyGridValue))
                        (item as IPropertyGridValue).PropertyForeColor = ((IComplexColor)Activator.CreateInstance((item as IPropertyGridValue).PropertyForeColor.GetType())).Initialize(FontService.Color);
                }
                catch { }
                finally
                {
                    if (commit && UndoRedoManager.IsTransactionStarted)
                        UndoRedoManager.Commit();
                }
        }
        /// <summary>
        /// získání společné barvy písma vybraných objektů
        /// </summary>
        /// <returns>textový název barvy písma</returns>
        public string GetColorName()
        {
            if (serviceSelection != null)
                try
                {
                    bool first = true;
                    string _value = string.Empty;
                    foreach (var item in serviceSelection.SelectedComponents)
                    {
                        if (item is ITextHandler handler && handler.Text != null && handler.Text.TextFont != null)
                        {
                            // zafixujeme Písmo vybraného objektu
                            ITagTextFont _font = handler.Text.TextFont;
                            // pokud je to první objekt, pak jeho vlastnosti nakopírujeme
                            if (first)
                            {
                                first = false;
                                _value = _font.ForeColor.Name;
                            }
                            else
                                //_value==string.Empty znamená, že obsahy nejsou stejné
                                if (!string.IsNullOrEmpty(_value)
                                    && !_value.Equals(_font.ForeColor.Name, StringComparison.OrdinalIgnoreCase))
                                _value = string.Empty;
                        }
                    }
                    return ColorService.GetColorCZName(_value);
                }
                catch { }

            return ColorService.GetColorCZName("transparent");
        }

        /// <summary>
        /// změna názvu písma
        /// </summary>
        /// <param name="commit">indikuje nutnost ukončení transakce</param>
        public void ChangeName(bool commit)
        {
            if (serviceSelection != null)
                try
                {
                    if (!UndoRedoManager.IsTransactionStarted)
                        UndoRedoManager.StartTransaction(GResources.GetResourceText(29450472));

                    foreach (var item in serviceSelection.SelectedComponents.FindAll(itm => itm is IPropertyGridValue))
                    {
                        (item as IPropertyGridValue).PropertyFontFamily = (IComplexFontFamily)Activator.CreateInstance((item as IPropertyGridValue).PropertyFontFamily.GetType());
                        (item as IPropertyGridValue).PropertyFontFamily.Initialize(FontService.FontName);
                    }
                }
                catch { }
                finally
                {
                    if (commit && UndoRedoManager.IsTransactionStarted)
                        UndoRedoManager.Commit();
                }
        }
        /// <summary>
        /// získání společného názvu písma vybraných objektů
        /// </summary>
        /// <returns>textový název písma</returns>
        public string GetFontName()
        {
            if (serviceSelection != null)
                try
                {
                    bool first = true;
                    string _value = string.Empty;
                    foreach (var item in serviceSelection.SelectedComponents)
                    {
                        if (item is ITextHandler handler && handler.Text != null && handler.Text.TextFont != null)
                        {
                            // zafixujeme Písmo vybraného objektu
                            ITagTextFont _font = handler.Text.TextFont;
                            // pokud je to první objekt, pak jeho vlastnosti nakopírujeme
                            if (first)
                            {
                                first = false;
                                _value = _font.FontFamily.Name;
                            }
                            else
                                //_value==string.Empty znamená, že obsahy nejsou stejné
                                if (!string.IsNullOrEmpty(_value)
                                    && !_value.Equals(_font.FontFamily.Name, StringComparison.OrdinalIgnoreCase))
                                _value = string.Empty;
                        }
                    }
                    return _value;
                }
                catch { }

            return string.Empty;
        }

        /// <summary>
        /// získání společné velikostí písma vybraných objektů
        /// </summary>
        /// <returns></returns>
        public string GetSize()
        {
            if (serviceSelection != null)
                try
                {
                    bool first = true;
                    string _size = string.Empty;
                    foreach (var item in serviceSelection.SelectedComponents)
                    {
                        if (item is ITextHandler handler && handler.Text != null && handler.Text.TextFont != null)
                        {
                            // zafixujeme Písmo vybraného objektu
                            ITagTextFont _font = handler.Text.TextFont;
                            // pokud je to první objekt, pak jeho vlastnosti nakopírujeme
                            if (first)
                            {
                                first = false;
                                _size = _font.Size.Value;
                            }
                            else
                                // _size == null znamená, že obsahy nejsou stejné
                                if (_size != _font.Size.Value
                                    && _size != null)
                                _size = null;
                        }
                    }
                    return _size;
                }
                catch { }

            return string.Empty;
        }
        /// <summary>
        /// změna velikostí písma
        /// </summary>
        /// <param name="commit">indikuje nutnost ukončení transakce</param>
        public void ChangeSize(bool commit)
        {
            if (serviceSelection != null)
                try
                {
                    if (!UndoRedoManager.IsTransactionStarted)
                        UndoRedoManager.StartTransaction(GResources.GetResourceText(29451448));

                    foreach (var item in serviceSelection.SelectedComponents.FindAll(itm => itm is IPropertyGridValue))
                        (item as IPropertyGridValue).PropertySize = FontService.Size.Value;
                }
                catch { }
                finally
                {
                    if (commit && UndoRedoManager.IsTransactionStarted)
                        UndoRedoManager.Commit();
                }
        }
        #endregion

        /// <summary>
        /// indikuje, že se objekt nachází v režimu načtení
        /// </summary>
        public bool IsLoading { get; set; }

        /// <summary>
        /// validace dokumentus
        /// </summary>
        /// <param name="waitDialog">čekácí dialog</param>
        /// <param name="isSuccess">Výsledek validace - TRUE: validace proběhla úspěšně, jinak FALSE</param>
        /// <returns>výsledek validace</returns>
        internal virtual string ValidateDocument(bool waitDialog, out bool isSuccess) { isSuccess = true; return string.Empty; }

        /// <summary>
        /// Validace dokumentu
        /// </summary>
        /// <param name="waitDialog">Indikuje zobrazení čekacího dialogu</param>
        internal bool ValidateDocument(bool waitDialog)
        {
            bool result = true;
            //SimpleDesktop.Desktop.GetPad(typeof(CompilerMessageView)).BringPadToFront(SimpleDesktop.Desktop.DesktopLayout);
            //MessageViewCategory mvc = CompilerMessageView.Instance.AddCategory.GetCategory("GRF");
            //mvc.AppendLine(string.Format("------ {0} {1} ------", GResources.GetResourceText(29450139), PrimaryFileName)); //RC 29450139 : validace sestavy
            string validateText = string.Empty;
            validateText += this.ValidateDocument(waitDialog, out bool validateResult);
            result = result && validateResult;
            //mvc.AppendLine(validateText);
            //mvc.AppendLine("------ " + GResources.GetResourceText(29450140) + " ------"); //RC 29450140 : konec validace 

            //CompilerMessageView.Instance.SelectCategory("GRF");

            if (!result && !validateText.IsNullOrEmpty())
                GMessageBox.ShowError(validateText);

            return result;
        }

        /// <summary>
        /// aktualizace sekce dle pohledu
        /// </summary>
        /// <param name="view">pohled s informaci o aktualizaci</param>
        virtual protected void UpdateSelection(ITextEditorControlProvider view)
        {
            if (view == null || view.TextEditorControl == null)
                return;

            ServiceSelection.Clear();

            if (view.TextEditorControl.ActiveTextAreaControl.SelectionManager.HasSomethingSelected)
                view.TextEditorControl.ActiveTextAreaControl.SelectionManager.SelectionCollection.ForEach(((container as IDocumentView).Control as AbstractPagePanel).UpdateSelection);
            else
            {
                TextLocation location = view.TextEditorControl.ActiveTextAreaControl.TextArea.Caret.Position;
                ((container as IDocumentView).Control as AbstractPagePanel).UpdateSelection(new DefaultSelection(view.TextEditorControl.Document, location, location));
            }
            if (ServiceSelection.PrimarySelection != null)
                ((container as IDocumentView).Control as AbstractPagePanel).JumpTo(ServiceSelection.PrimarySelection as ITagComponent);

            ((container as IDocumentView).Control as AbstractPagePanel).Invalidate();
        }
        /// <summary>
        /// aktualizace položek
        /// </summary>
        abstract internal void RefreshItem();
        void ComponentChanging(object sender, ComponentChangingEventArgs e)
        {
            // Pokud probíhá drag operace, neautomaticky nestartujeme transakci
            // Transakce se vytvoří manuálně v OnDragDrop
            if (container is IPagePanel pagePanel && pagePanel.IsDragOperation)
                return;

            if (!UndoRedoManager.IsTransactionStarted)
                // odlišíme případ změny rozlišení přes tabulku vlastnosti
                if (!(e.Component is IPage
                    && e.Member.Name.Equals("Resolution", StringComparison.InvariantCultureIgnoreCase)))
                    UndoRedoManager.StartTransaction(GResources.GetResourceText(29450081)); //RC 29450081 : změna hodnoty
        }
        Property memento;

        /// <summary>
        /// ignoruje změny
        /// </summary>
        protected bool ignoreDirtyChange;
        /// <summary>
        /// uživatelský ovladač
        /// </summary>
        protected UserControl container;

        /// <summary>
        /// volá se před Commit v metodě po změně vlastnosti objektu prostřednictvím tabulky vlastnosti
        /// </summary>
        public event PropertyValueChangedEventHandler PropertyValueChanged;

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        /// <param name="primaryViewContent">Primární pohled</param>
        /// <param name="isLK">indikuje LK</param>
        public override IViewContent Initialize(IViewContent primaryViewContent, bool isLK = false)
        {
            base.Initialize(primaryViewContent, isLK);
            TabPageText = GResources.GetResourceText(29450082); //RC 29450082 : Návrh

            defaultServiceContainer = new DefaultServiceContainer();
            designSurface = CreateDesignSurface(defaultServiceContainer);

            defaultServiceContainer.RemoveService(typeof(ISelectionService));
            host = (IDesignerHost)designSurface.GetService(typeof(IDesignerHost));
            serviceSelection = new SelectionService(host);
            undoRedoManager = new UndoRedoManager();

            defaultServiceContainer.AddService(typeof(ISelectionService), serviceSelection);
            defaultServiceContainer.AddService(typeof(IUndoRedoManager), undoRedoManager);

            IComponentChangeService componentService = (IComponentChangeService)this.designSurface.GetService(typeof(IComponentChangeService));
            componentService.ComponentChanging += ComponentChanging;

            ServiceSelection.SelectionChanged += SelectionChangedHandler;

            UndoRedoService.AttachContent(this, undoRedoManager);

            UndoRedoManager.CommandDone += UndoRedoManagerCommandDone;
            PropertyPad.PropertyValueChanged += PropertyPadPropertyValueChanged;

            UpdatePropertyPad();

            if (SimpleDesktop.Desktop != null)
                SimpleDesktop.Desktop.ActiveViewContentChanged += IsActiveViewContentChangedHandler;

            Disposed += AGraphicViewContent_Disposed;
            return this;
        }

        void AGraphicViewContent_Disposed(object sender, EventArgs e)
        {
            IComponentChangeService componentService = (IComponentChangeService)designSurface.GetService(typeof(IComponentChangeService));
            if (componentService != null)
                componentService.ComponentChanging -= ComponentChanging;

            if (serviceSelection != null)
                serviceSelection.SelectionChanged -= SelectionChangedHandler;

            PropertyPad.PropertyValueChanged -= PropertyPadPropertyValueChanged;
            if (UndoRedoManager != null)
                UndoRedoManager.CommandDone -= UndoRedoManagerCommandDone;

            UndoRedoService.DetachContent(this);
            if (SimpleDesktop.Desktop != null)
                SimpleDesktop.Desktop.ActiveViewContentChanged -= this.IsActiveViewContentChangedHandler;
        }
        void UndoRedoManagerCommandDone(object sender, CommandDoneEventArgs e)
        {
            container.Invalidate();
            UpdatePropertyPad();
        }
        void PropertyPadPropertyValueChanged(object s, PropertyValueChangedEventArgs e)
        {
            if (UndoRedoService.IsTransactionStarted)
            {
                PropertyValueChanged?.Invoke(s, e);
                // zde se volá i UndoRedoManagerCommandDone
                UndoRedoService.Commit();
            }
            else
                container.Invalidate();
        }
        void IsActiveViewContentChangedHandler(object sender, EventArgs e)
        {
            if (SimpleDesktop.Desktop.ActiveViewContent == this)
            {
                designSurfaceManager.ActiveDesignSurface = this.designSurface;
                InfoSectionViewPad.TreeChanged += OnInfoPropertyChanged;
            }
            else
            {
                LoggingService.Debug(string.Join(" ", GResources.GetResourceText(29450083) + ',', "ActiveDesignSurface", GResources.GetResourceText(29450084) + "...")); //RC 29450084 : je nastaveno na NULL
                designSurfaceManager.ActiveDesignSurface = null;
                InfoSectionViewPad.TreeChanged -= OnInfoPropertyChanged;
            }
        }
    }
}