//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.CustomNode.cs                          </Name>
//    <Description> Vlastní větev                                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using Gordic.GFE.WinClient.AddIns;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    delegate void NodeInitializer(CustomNode node);

    /// <summary>
    /// Vlastní větev
    /// </summary>
    class CustomNode : AbstractFileTreeNode
    {
        NodeInitializer nodeInitializer = null;

        public NodeInitializer NodeInitializer
        {
            get { return nodeInitializer; }
            set { nodeInitializer = value; }
        }

        public CustomNode() { }

        protected override void Initialize()
        {
            nodeInitializer?.Invoke(this);
            base.Initialize();
        }
        public override object AcceptVisitor(FileTreeNodeVisitor visitor, object data)
        {
            return visitor.Visit(this, data);
        }
    }
}
