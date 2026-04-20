//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.CustomFolderNode.cs                    </Name>
//    <Description> Vlastní větev složky                                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using Gordic.GFE.WinClient.AddIns;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// Vlastní větev složky
    /// </summary>
    class CustomFolderNode : AbstractFileTreeNode
    {
        string closedImage = null;
        string openedImage = null;

        public string ClosedImage
        {
            get { return closedImage; }
            set
            {
                closedImage = value;
                if (!IsExpanded)
                    SetIcon(closedImage);
            }
        }

        public string OpenedImage
        {
            get { return openedImage; }
            set
            {
                openedImage = value;
                if (IsExpanded)
                    SetIcon(openedImage);
            }
        }

        public CustomFolderNode() { }

        protected void UpdateIcon()
        {
            if (Nodes.Count == 0)
                SetIcon(ClosedImage);
            else if (IsExpanded)
                SetIcon(openedImage);
        }

        public override void Refresh()
        {
            base.Refresh();
            UpdateIcon();
        }

        public override void Expanding()
        {
            if (openedImage != null)
                SetIcon(openedImage);
            base.Expanding();
            if (Nodes.Count == 0)
                SetIcon(ClosedImage);
        }

        public override void Collapsing()
        {
            if (closedImage != null)
                SetIcon(closedImage);
            base.Collapsing();
        }

        public override object AcceptVisitor(FileTreeNodeVisitor visitor, object data)
        {
            return visitor.Visit(this, data);
        }
    }

}
