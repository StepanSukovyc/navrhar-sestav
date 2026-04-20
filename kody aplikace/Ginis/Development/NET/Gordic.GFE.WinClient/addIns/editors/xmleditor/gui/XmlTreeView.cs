//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlTreeView.cs                         </Name>
//    <Description> Sekundární pohled na obsah zobrazeného XML dokumentu.       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.XmlEditor.Gui.Editor;
using Gordic.General;
using Gordic.GFE.Parsers.Binding;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Sekundární pohled na obsah zobrazeného XML dokumentu.
    /// Je to strom.
    /// </summary>
    class XmlTreeView : DefaultAbstractSecondaryViewContent, IClipboardHandler, ICustomizedCommands, IInfoHandler
    {
        #region AbstractSecondaryViewContent
        /// <summary>
        /// Načtení z primárního pohledu
        /// </summary>
        protected override void LoadFromPrimary()
        {
            LoggingService.Debug("XmlTreeView.LoadFromPrimary");

            //XmlEditorControl xmlEditor = xmlView.XmlEditor;
            //XmlCompletionDataProvider completionDataProvider = new XmlCompletionDataProvider(xmlEditor.SchemaCompletionDataItems, xmlEditor.DefaultSchemaCompletionData, xmlEditor.DefaultNamespacePrefix);
            //treeViewContainer.LoadXml(xmlView.Text, completionDataProvider);
            treeViewContainer.LoadXml(xmlView.Text, null);
        }
        /// <summary>
        /// Uložení do primárního pohledu
        /// </summary>
        protected override void SaveToPrimary()
        {
            LoggingService.Debug("XmlTreeView.SaveToPrimary");

            if (treeViewContainer.IsDirty)
            {
                xmlView.ReplaceAll(treeViewContainer.Document.OuterXml);
                ignoreDirtyChange = true;
                treeViewContainer.IsDirty = false;
                ignoreDirtyChange = false;
            }
        }
        /// <summary>
        /// Ovladač sekundárního pohledu
        /// </summary>
        public override object Control { get { return treeViewContainer; } }

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
        public bool SaveToDatabaseCommand(EventHandlerOpenedFileArgument eventHandler) { return true; }
        #endregion

        #region IInfoHandler
        public Dictionary<string, string> GetInfo()
        {
            LoadFromPrimary();
            return treeViewContainer.GetInfo();
        }
        /// <summary>
        /// Typ sestavy
        /// </summary>
        /// <returns></returns>
        public General.GString GetFormatType()
        {
            return treeViewContainer.GetFormatType();
        }
        /// <summary>
        /// Aktualizace sekce INFO
        /// </summary>
        /// <param name="dictionary">Seznam aktualizovaných hodnot</param>
        /// <param name="file">otevřený soubor sestavy</param>
        public void AppendInfo(Dictionary<string, string> dictionary, OpenedFile file)
        {
            treeViewContainer.AppendInfo(dictionary, file);
            SaveToPrimary();
        }
        #endregion
        XmlTreeViewContainerControl treeViewContainer;
        XmlView xmlView;
        bool disposed;
        bool ignoreDirtyChange;

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        /// <param name="primaryViewContent">Primární pohled</param>
        /// <param name="isLK">indikuje LK</param>
        public override IViewContent Initialize(IViewContent primaryViewContent, bool isLK = false)
        {
            base.Initialize(primaryViewContent, isLK);
            xmlView = primaryViewContent as XmlView;
            treeViewContainer.DirtyChanged += TreeViewContainerDirtyChanged;
            return this;
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public override IViewContent Initialize()
        {
            base.Initialize();
            TabPageText = GResources.GetResourceText(29450221); //RC 29450221 : Strom
            treeViewContainer = new XmlTreeViewContainerControl();

            ContextMenuStrip strip1 = MenuService.CreateContextMenu(treeViewContainer, new Parsers.EventArgsContextMenu("/AddIns/XmlEditor/XmlTree/AttributesGrid/ContextMenu"));
            if (strip1 != null)
                treeViewContainer.AttributesGrid.ContextMenuStrip = strip1;

            ContextMenuStrip strip = MenuService.CreateContextMenu(treeViewContainer, new Parsers.EventArgsContextMenu("/AddIns/XmlEditor/XmlTree/ContextMenu"));
            if (strip != null)
                treeViewContainer.TreeView.ContextMenuStrip = strip;
            return this;
        }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="xmlView">Primární pohled na obsah</param>
        /// <param name="attributesGridContextMenuStrip"></param>
        /// <param name="treeViewContextMenuStrip"></param>
        public IViewContent Initialize(XmlView xmlView, ContextMenuStrip attributesGridContextMenuStrip, ContextMenuStrip treeViewContextMenuStrip)
        {
            base.Initialize(xmlView);

            this.xmlView = xmlView;
            treeViewContainer.DirtyChanged += TreeViewContainerDirtyChanged;
            treeViewContainer.AttributesGrid.ContextMenuStrip = attributesGridContextMenuStrip;
            treeViewContainer.TreeView.ContextMenuStrip = treeViewContextMenuStrip;
            return this;
        }

        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnění objektu</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                LoggingService.Debug(GResources.GetResourceText(29450222) + "..."); //RC 29450222 : uvolnění stromu XML souboru

                if (!disposed)
                {
                    disposed = true;
                    if (treeViewContainer != null)
                        treeViewContainer.Dispose();
                }
            }

            base.Dispose(disposing);
        }

        #region IClipboardHandler

        /// <exclude/>
        public bool EnableCut { get { return treeViewContainer.EnableCut; } }

        /// <exclude/>
        public bool EnableCopy { get { return treeViewContainer.EnableCopy; } }

        /// <exclude/>
        public bool EnablePaste { get { return treeViewContainer.EnablePaste; } }

        /// <exclude/>
        public bool EnableDelete { get { return treeViewContainer.EnableDelete; } }

        /// <exclude/>
        public bool EnableSelectAll { get { return false; } }

        /// <exclude/>
        public void Cut()
        {
            treeViewContainer.Cut();
        }

        /// <exclude/>
        public void Copy()
        {
            treeViewContainer.Copy();
        }

        /// <exclude/>
        public void Paste()
        {
            treeViewContainer.Paste();
        }

        /// <exclude/>
        public void Delete()
        {
            treeViewContainer.Delete();
        }

        /// <exclude/>
        public void SelectAll()
        {
        }

        #endregion

        void TreeViewContainerDirtyChanged(object source, EventArgs e)
        {
            if (!ignoreDirtyChange)
                this.PrimaryFile.IsDirty = treeViewContainer.IsDirty;

        }
    }
}
