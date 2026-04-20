//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GrrViewContent.cs                      </Name>
//    <Description> Sekundární pohled na obsah zobrazeného GRR dokumentu.       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Editor;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Editor;
using Gordic.TextEditor;
using Gordic.TextEditor.Document;
using Gordic.GFE.Parsers.DefaultEditor;
using Gordic.General;
using Gordic.GFE.Parsers.Binding;

namespace Gordic.GFE.WinClient.GrrEditor
{
    /// <summary>
    /// Sekundární pohled na obsah zobrazeného GRR dokumentu.
    /// </summary>
    class GrrViewContent : AGraphicViewContent, ICustomizedCommands
        , ILineHandler
    {
        #region AGraphicViewContent
        /// <summary>
        /// veličina indikujíci dostupnosti změny viditelnosti rozlišení
        /// </summary>
        public override bool EnableShowGrid { get { return true; } }
        #endregion
        
        #region IToolsHost
        Control toolscontrol;
        /// <summary>
        /// nástrojová lišta
        /// </summary>
        public override object ToolsControl
        {
            get
            {
                if (toolscontrol == null)
                    toolscontrol = (new GraphicEditorSideBar()).Initialize("GRR", "USR-SideBarGrrConfig.xml");
                return toolscontrol;
            }
        }
        #endregion

        #region AbstractSecondaryViewContent
        /// <summary>
        /// aktualizace sekce dle pohledu
        /// </summary>
        /// <param name="view">pohled s informaci o aktualizaci</param>
        protected override void UpdateSelection(ITextEditorControlProvider view)
        {
            if (view == null || view.TextEditorControl == null)
                return;

            ServiceSelection.Clear();

            if (view.TextEditorControl.ActiveTextAreaControl.SelectionManager.HasSomethingSelected)
                view.TextEditorControl.ActiveTextAreaControl.SelectionManager.SelectionCollection.ForEach((Container.Control as AbstractPagePanel).UpdateSelection);
            else
            {
                TextLocation location = view.TextEditorControl.ActiveTextAreaControl.TextArea.Caret.Position;
                (Container.Control as AbstractPagePanel).UpdateSelection(new DefaultSelection(view.TextEditorControl.Document, location, location));
            }
            if (ServiceSelection.PrimarySelection != null)
                (Container.Control as AbstractPagePanel).JumpTo(ServiceSelection.PrimarySelection as ITagComponent);

            (Container.Control as AbstractPagePanel).Invalidate();
        }
        #endregion

        #region ICustomizedCommands
        /// <exclude/>
        public bool SaveCommand() { return true; }
        /// <exclude/>
        public bool SaveAsCommand() { return true; }
        /// <summary>
        /// Uložení souboru do databáze
        /// </summary>
        /// <returns>TRUE, pokud operace je dostupná</returns>
        public bool SaveToDatabaseCommand(EventHandlerOpenedFileArgument eventHandler) { return false; }
        #endregion        

        #region ILineHandler

        /// <exclude/>
        public bool EnableMoveToHeadRegion { get { return false; } }
        /// <exclude/>
        public bool EnableMoveToFootRegion { get { return false; } }

        /// <exclude/>
        public void MoveToHeadRegion(object obj) { }
        /// <exclude/>
        public void MoveToFootRegion(object obj) { }
        /// <exclude/>
        public void InsertLine(LineType lineType) { }
        #endregion

        #region IClipboardHandler
        /// <summary>
        /// Lze vkládat
        /// </summary>
        public override bool EnablePaste
        {
            get
            {
                return ClipboardService.EnablePaste
                    && ServiceSelection.SelectedComponents.Exists(cm => !(cm is IGRRLabel));
            }
        }
        /// <summary>
        /// Akce na vložení objektu
        /// </summary>
        public override void Paste() { Container.Paste(); }
        #endregion

        #region IInfoSectionHost
        /// <summary>
        /// volá se po změně InfoSekce
        /// </summary>
        /// <param name="sender">objekt, který spustil událost</param>
        /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
        public override void OnInfoPropertyChanged(object sender, EventArgs e) { Container.IsDirty = true; }
        #endregion

        GrrContainerControl Container { get { return container as GrrContainerControl; } }
        GraphicView View { get { return primaryViewContent as GraphicView; } }

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        /// <param name="primaryViewContent">Primární pohled</param>
        /// <param name="isLK">indikuje LK</param>
        public override IViewContent Initialize(IViewContent primaryViewContent, bool isLK = false)
        {
            base.Initialize(primaryViewContent, isLK);
            container = new GrrContainerControl(this);
            Container.DirtyChanged += delegate { MakeDirty(); };
            FormatApplayed += ViewContentFormatApplayed;
            return this;
        }

        void ViewContentFormatApplayed(object sender, EventArgs e)
        {
            try
            {
                if (ReportDesignerProperties.Instance.ApplyFormatSize)
                    ((Container.Document.Pages[0] as GrrPage).LabelZone as Gordic.GFE.WinClient.Labels.GrrLabelZone).LabelZoneListChanged(this, EventArgs.Empty);
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450065), ex); } //RC 29450065 : Nepodařilo se aplikovat velikost!
        }

        /// <summary>
        /// Aktualizace položek dle seznamu
        /// </summary>
        internal override void RefreshItem()
        {
            Container.RefreshByStructure();
            container.Invalidate();
        }

        /// <exclude/>
        public override void MakeDirty()
        {
            if (!ignoreDirtyChange)
                this.PrimaryFile.IsDirty = true;
        }
        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnění objektu</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (container != null)
                    container.Dispose();
                FormatApplayed -= ViewContentFormatApplayed;
            }

            base.Dispose(disposing);
        }
    }
}
