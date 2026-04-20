//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TreeViewHelper.cs                      </Name>
//    <Description> Pomocná třída pro práci se stromem                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System;
using System.Text;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.AddIns
{
    /// <summary>
    /// Pomocná třída pro práci se stromem
    /// </summary>
    public static class TreeViewHelper
    {
        #region Saving/restoring expanded state
        /// <summary>
        /// Získání stavu stromu
        /// </summary>
        /// <param name="treeView">strom</param>
        /// <returns></returns>
        public static string GetViewStateString(TreeView treeView)
        {
            if (treeView.Nodes.Count == 0) return string.Empty;
            StringBuilder b = new StringBuilder();
            WriteViewStateString(b, treeView.Nodes);
            return b.ToString();
        }
        static void WriteViewStateString(StringBuilder b, TreeNodeCollection nodes)
        {
            b.Append('[');
            foreach (TreeNode subNode in nodes)
                if (subNode.IsExpanded && subNode.Text.IndexOf('[') < 0)
                {
                    b.Append(subNode.Text);
                    WriteViewStateString(b, subNode.Nodes);
                }
            
            b.Append(']');
        }

        /// <exclude/>
        public static void ApplyViewStateString(string viewState, TreeView treeView)
        {
            if (viewState.Length == 0)
                return;
            int i = 0;
            ApplyViewStateString(treeView.Nodes, viewState, ref i);
            System.Diagnostics.Debug.Assert(i == viewState.Length - 1);
        }
        static void ApplyViewStateString(TreeNodeCollection nodes, string viewState, ref int pos)
        {
            if (viewState[pos++] != '[')
                throw new ArgumentException(GResources.GetResourceText(29450107) + " '['!"); //RC 29450107 : pozice musí ukazovat na
            // expect an identifier or an closing bracket
            while (viewState[pos] != ']')
            {
                StringBuilder nameBuilder = new StringBuilder();
                char ch;
                while ((ch = viewState[pos++]) != '[')
                {
                    nameBuilder.Append(ch);
                }
                pos -= 1; // zpět do '['
                string nodeText = nameBuilder.ToString();
                
                TreeNode subNode = null;
                if (nodes != null)
                    foreach (TreeNode n in nodes)
                        if (n.Text == nodeText)
                        {
                            subNode = n;
                            break;
                        }
                if (subNode != null)
                    subNode.Expand();
                ApplyViewStateString(subNode?.Nodes, viewState, ref pos);
                pos += 1; // na další symbol
            }
        }
        #endregion

        #region GetNodeByPath
        /// <summary>
        /// Získání cesty pro větev
        /// </summary>
        /// <param name="node">Větev</param>
        /// <returns></returns>
        public static string GetPath(TreeNode node)
        {
            if (node == null)
                return null;
            if (node.Parent == null)
                return node.Text;
            else
                return GetPath(node.Parent) + "\\" + node.Text;
        }

        /// <summary>
        /// Získání node dle cesty
        /// </summary>
        /// <param name="treeView">Strom ve kterém se hledá</param>
        /// <param name="path">Cesta k větvi</param>
        /// <returns></returns>
        public static TreeNode GetNodeByPath(TreeView treeView, string path)
        {
            if (string.IsNullOrEmpty(path))
                return null;
            TreeNode result = null;
            TreeNodeCollection nodes = treeView.Nodes;
            foreach (string entry in path.Split('\\'))
            {
                result = null;
                foreach (TreeNode node in nodes)
                    if (node.Text == entry)
                    {
                        result = node;
                        break;
                    }
                
                if (result != null)
                    nodes = result.Nodes;
            }
            return result;
        }
        #endregion
    }
}
