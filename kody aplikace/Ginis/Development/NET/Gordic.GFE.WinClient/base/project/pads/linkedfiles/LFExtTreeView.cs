//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.LFExtTreeView.cs                   </Name>
//    <Description> Třída pro zobrazení vázaných souborů                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-11-08                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.WinClient.FormatOffice;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;

namespace Gordic.GFE.WinClient.LinkedFiles
{
    /// <summary>
    /// Třída pro zobrazení struktury
    /// </summary>
    class LFExtTreeView : ExtTreeView
    {
        /// <summary>
        /// hlavní větev stromu vázaných souborů
        /// </summary>
        LFExtNode rootItem;

        /// <summary>
        /// Prázdný konstruktor třídy
        /// </summary>
        public LFExtTreeView()
        {
            IsSorted = false;
            initialize();            
        }
        
        /// <summary>
        /// inicializace stromu vázaných souborů
        /// </summary>
        /// <param name="lfNode">hlavní větev stromu</param>
        internal void Initialize(LFExtNode lfNode)
        {
            if (Nodes.Contains(rootItem))
                Nodes.Remove(rootItem);

            // Vytvoříme hlavní větev
            rootItem = lfNode;
            rootItem.ExpandAll();

            // přidáme hlavní větev do stromu
            //Nodes.Clear();
            Nodes.Add(rootItem);

            rootItem.UpdateIcons();
            rootItem.Expand();
        }

        /// <summary>
        /// pohlcení souboru s obrázkém
        /// </summary>
        /// <param name="e"></param>
        protected override void OnDragDrop(DragEventArgs e)
        {
            if (e.Data.GetDataPresent(DataFormats.FileDrop))
            {
                string[] files = (string[])e.Data.GetData(DataFormats.FileDrop);
                foreach (string fileName in files)
                    try { ImageService.GetImage(fileName, true); }
                    catch { }
            }
            base.OnDragDrop(e);
        }

        void initialize()
        {
            AllowDrop = true;
            this.ImageList = new ImageList();
            ShowNodeToolTips = true;
            this.ItemDrag += svtItemDrag;
        }
        void svtItemDrag(object sender, ItemDragEventArgs e)
        {
            if (!(SimpleDesktop.Desktop.ActiveViewContent is IOfficeControl))
            {
                LocalCommonService.DropInitialized = true;
                LocalCommonService.DraggedObject = e.Item;
                DoDragDrop(e.Item, DragDropEffects.Copy);
            }
        }
    }
}
