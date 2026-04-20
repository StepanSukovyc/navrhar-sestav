//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.VariablesViewTreeNode.cs               </Name>
//    <Description> větev stromu proměnných                                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-03                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.WinClient.Editor;
using Gordic.General;
using System;
using System.Runtime.Serialization;

namespace Gordic.GFE.WinClient.VariablesView
{
    /// <summary>
    /// větev stromu proměnných
    /// </summary>
    [System.Runtime.InteropServices.ComVisible(false)]
    [Serializable]
    public class VarExtNode : AbstractExtTreeNode
    {
        #region ISerializable
        /// <summary>
        /// Initializes a new instance of the ExtTreeNode class using the
        /// specified serialization information and context.
        /// </summary>
        /// <param name="serializationInfo"></param>
        /// <param name="context"></param>
        protected VarExtNode(SerializationInfo serializationInfo, StreamingContext context) : base(serializationInfo, context) { }
        #endregion

        #region AbstractExtTreeNode
        /// <summary>
        /// Inicializace větve
        /// </summary>
        protected override void Initialize()
        {
            base.Initialize();
            ContextmenuAddinTreePath = "/Pad/VariablesView/TreeNode/ContextMenu";
        }
        #endregion
        bool isRoot;
        /// <summary>
        /// indikuje, že větev je nejvyšší
        /// </summary>
        public bool IsRoot { get => isRoot; }
        VariableNode variableNode;
        /// <summary>
        /// obsah větve
        /// </summary>
        public VariableNode Variable { get => variableNode; set => variableNode = value; }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        protected VarExtNode()
        {
            sortOrder = 1;
            isRoot = false;
            canLabelEdit = false;
            ImageIndex = 1;
            SelectedImageIndex = 1;
        }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public VarExtNode(object nullObject)
            : this()
        {
            variableNode = new VariableNode();
            sortOrder = 1;
            ImageKey = "dir";
            SelectedImageKey = "dirOpen";
            Text = GResources.GetResourceText(29450402); //RC 29450402 : Proměnné
            isRoot = true;
        }

        /// <summary>
        /// Konstruktor třídy.
        /// Vytvoří položku pro Desktop.
        /// </summary>
        public VarExtNode(GrrRegion region, IVariable variable)
        {
            sortOrder = 1;
            variableNode = variable as VariableNode;//new VariableNode(variable);
            isRoot = region != null;

            ImageKey = isRoot ? "dir" : "item";
            SelectedImageKey = isRoot ? "dirOpen" : "item";
            Text = variableNode != null ? variableNode.Name : GResources.GetResourceText(29450402); //RC 29450402 : Proměnné
            if (variableNode != null)
            {
                Name = variableNode.Name;
                SetToolTip(variableNode);
            }
            if (region != null && region.Variables != null)
                foreach (var item in region.Variables)
                {
                    VarExtNode node = new VarExtNode(null, item);
                    node.AddTo(this);
                }
        }

        void SetToolTip(VariableNode dataNode)
        {
            if (dataNode != null)
                ToolTipText = dataNode.SetToolTip();
        }

    }
}
