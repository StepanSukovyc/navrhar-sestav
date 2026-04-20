//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SolutionItemNode.cs                    </Name>
//    <Description> Položka větve řešení                                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System.IO;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.Parsers.WinForm;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.AddIns;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// Položka větve řešení
    /// </summary>
    class SolutionItemNode : CustomFolderNode
    {
        #region AbstractExtTreeNode
        /// <summary>
        /// Inicializace větve
        /// </summary>
        protected override void Initialize()
        {
            base.Initialize();
            ContextmenuAddinTreePath = "/ReportDesigner/Pads/ProjectBrowser/ContextMenu/SolutionItemNode";
        }
        #endregion

        /// <summary>
        /// cesta k vázanému souboru větve
        /// </summary>
        public override string LinkedFileName { get { return FileName; } }

        Solution solution;
        SolutionItem item;

        public SolutionItem SolutionItem { get { return item; } }

        public string FileName { get { return Path.Combine(solution.Directory, item.Location); } }

        public SolutionItemNode(Solution solution, SolutionItem item)
        {
            sortOrder = 2;
            canLabelEdit = true;

            this.solution = solution;
            this.item = item;
            Text = Path.GetFileName(FileName);
            SetIcon(IconService.GetImageForFile(FileName));
        }

        public override void ActivateItem() { FileAgent.OpenFile(FileName); }

        #region Drag & Drop
        public override DataObject DragDropDataObject { get { return new DataObject(this); } }

        public override DragDropEffects GetDragDropEffect(IDataObject dataObject, DragDropEffects proposedEffect)
        {
            return ((ExtTreeNode)Parent).GetDragDropEffect(dataObject, proposedEffect);
        }

        public override void DoDragDrop(IDataObject dataObject, DragDropEffects effect)
        {
            ((ExtTreeNode)Parent).DoDragDrop(dataObject, effect);
        }
        #endregion

        #region Cut & Paste
        public override bool EnableDelete { get { return true; } }

        public override void Delete()
        {
            ISolutionFolderNode folderNode = Parent as ISolutionFolderNode;
            folderNode.Container.SolutionItems.Items.Remove(item);
            base.Remove();
        }

        public override bool EnablePaste { get { return ((ExtTreeNode)Parent).EnablePaste; } }

        public override void Paste() { ((ExtTreeNode)Parent).Paste(); }

        public override bool EnableCopy { get { return true; } }
        public override void Copy()
        {
            DoPerformCut = true;
            ClipboardWrapper.SetDataObject(FileOperationClipboardObject.CreateDataObject(this, false));
        }

        public override bool EnableCut { get { return true; } }

        public override void Cut()
        {
            DoPerformCut = true;
            ClipboardWrapper.SetDataObject(FileOperationClipboardObject.CreateDataObject(this, true));
        }
        #endregion

        public override void AfterLabelEdit(string newName)
        {
            if (string.IsNullOrEmpty(newName))
                return;
            if (!Gordic.GFE.Parsers.Services.FileService.CheckFileName(newName))
                return;

            string newFileName = Path.Combine(Path.GetDirectoryName(this.FileName), newName);
            if (!FileAgent.RenameFile(this.FileName, newFileName, false))
                return;
            solution.Save();
        }
        public override object AcceptVisitor(FileTreeNodeVisitor visitor, object data)
        {
            return visitor.Visit(this, data);
        }
    }
}
