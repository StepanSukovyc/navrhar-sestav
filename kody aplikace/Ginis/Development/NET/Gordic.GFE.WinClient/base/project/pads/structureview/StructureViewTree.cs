//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.StructureExplorer.cs                   </Name>
//    <Description> Třída pro zobrazení struktury                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-11-08                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.FormatOffice;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;

namespace Gordic.GFE.WinClient.StructureView
{
    /// <summary>
    /// Třída pro zobrazení struktury
    /// </summary>
    class StructureViewTree : ExtTreeView, IClipboardHandler
    {
        /// <summary>
        /// cesta k vázanému souboru stromového pohledu
        /// </summary>
        public override string LinkedFileName { get => Structure?.FileName ?? base.LinkedFileName; }

        readonly string contextMenuPath = "/ReportDesigner/Pads/StructureView/ContextMenu";
        bool dropEscapePressed = false;

        /// <summary>
        /// Datová struktura
        /// </summary>
        public GFEStructure Structure { get; set; }

        /// <summary>
        /// Prázdný konstruktor třídy
        /// </summary>
        private StructureViewTree()
        {
            Structure = null;
            IsSorted = false;
            LocalInitialize();
        }

        /// <summary>
        /// Vytvoření nové instance třídy dle datové struktury
        /// </summary>
        /// <param name="structure">Datová struktura</param>
        public StructureViewTree(GFEStructure structure)
            : this()
        {
            Structure = structure;
            LocalInitialize(structure);
        }

        StructExtNode rootItem;
        void LocalInitialize(GFEStructure structure)
        {
            // Vytvoříme hlavní větev
            rootItem = structure == null ? new StructExtNode(null) : new StructExtNode(structure.Root, null);
            rootItem.ExpandAll();
            // přidáme hlavní větev do stromu
            Nodes.Clear();
            Nodes.Add(rootItem);
            rootItem.Expand();
        }
        void LocalInitialize()
        {
            AllowDrop = true;
            ImageService.SetStructureExplorerImageList(this);

            ContextMenuStrip strip = MenuService.CreateContextMenu(this, new EventArgsContextMenu(contextMenuPath));
            if (strip != null)
                ContextMenuStrip = strip;

            ShowNodeToolTips = true;
            this.ItemDrag += SvtItemDrag;
            this.QueryContinueDrag += SvtQueryContinueDrag;
            this.MouseDoubleClick += Svt_MouseDoubleClick;
        }
        void Svt_MouseDoubleClick(object sender, MouseEventArgs e)
        {
            Structure?.OnMouseDoubleClick(sender, e);
        }
        void SvtQueryContinueDrag(object sender, QueryContinueDragEventArgs e)
        {
            if (e.EscapePressed)
                dropEscapePressed = true;
        }
        void SvtItemDrag(object sender, ItemDragEventArgs e)
        {
            dropEscapePressed = false;
            if (SimpleDesktop.Desktop.ActiveViewContent is IOfficeControl)
            {
                DoDragDrop(string.Empty, DragDropEffects.Copy);

                if (!dropEscapePressed)
                    (SimpleDesktop.Desktop.ActiveViewContent as IOfficeControl).ItemDrag(sender, e);
            }
            else
            {
                LocalCommonService.DropInitialized = true;
                LocalCommonService.DraggedObject = e.Item;
                DoDragDrop(e.Item, DragDropEffects.Copy);
            }
        }

        #region IClipboardHandler
        /// <exclude/>
        public void Copy()
        {
            if (SelectedNode is StructExtNode node)
            {
                ClipboardService.Copy(node);
                Clipboard.SetText(node.FullName);
            }
        }
        /// <exclude/>
        public void Cut()
        {
            throw new NotImplementedException();
        }
        /// <exclude/>
        public void Delete()
        {
            throw new NotImplementedException();
        }
        /// <exclude/>
        public bool EnableCopy { get => Structure != null && this.SelectedNode != null; }
        /// <exclude/>
        public bool EnableCut { get => false; }
        /// <exclude/>
        public bool EnableDelete { get => false; }
        /// <exclude/>
        public bool EnablePaste { get => false; }
        /// <exclude/>
        public bool EnableSelectAll { get => false; }
        /// <exclude/>
        public void Paste()
        {
            throw new NotImplementedException();
        }
        /// <exclude/>
        public void SelectAll()
        {
            throw new NotImplementedException();
        }
        #endregion

        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje stav procesu uvolnění</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                MouseDoubleClick -= Svt_MouseDoubleClick;
                if (rootItem != null)
                {
                    rootItem.Dispose();
                    rootItem = null;
                }
            }

            base.Dispose(disposing);
        }
    }
}
