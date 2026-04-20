//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.InfoSectionViewTree.cs                 </Name>
//    <Description> strom informaci o info sekci                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-07                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.Parsers.Gui;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.InfoSectionView
{
    /// <summary>
    /// strom informaci o info sekci
    /// </summary>
    class InfoSectionViewTree : ExtTreeView
    {
        string contextMenuPath = "/ReportDesigner/Pads/InfoSectionView/ContextMenu";

        /// <summary>
        /// sekce INFO
        /// </summary>
        public InfoSectionViewEntry InfoSection { get; set; }
        /// <summary>
        /// Prázdný konstruktor třídy
        /// </summary>
        private InfoSectionViewTree()
        {
            InfoSection = null;
            IsSorted = false;
            Initialize();
        }

        /// <summary>
        /// Vytvoření nové instance třídy dle sekce INFO
        /// </summary>
        /// <param name="infoSection">Sekce INFO</param>
        public InfoSectionViewTree(InfoSectionViewEntry infoSection)
            : this()
        {
            InfoSection = infoSection;
            Initialize(infoSection);
        }
        void Initialize()
        {
            AllowDrop = true;
            ImageService.SetStructureExplorerImageList(this);

            ContextMenuStrip strip = MenuService.CreateContextMenu(this, new EventArgsContextMenu(contextMenuPath));
            if (strip != null)
                ContextMenuStrip = strip;

            ShowNodeToolTips = true;
        }
        void Initialize(InfoSectionViewEntry infoSection)
        {
            Nodes.Clear();
            if (infoSection != null)
                foreach (var item in infoSection.AttrList)
                    Nodes.Add(new ISExtNode(item));
        }

        /// <summary>
        /// aktualizace položek
        /// </summary>
        internal void RefreshItems()
        {
            if (InfoSection != null)
            {
                int index = SelectedNode != null ? SelectedNode.Index : -1;
                Initialize(InfoSection);
                if (Nodes.Count != 0 && index != -1)
                    if (index < Nodes.Count)
                        SelectedNode = Nodes[index];
            }
        }
    }
}
