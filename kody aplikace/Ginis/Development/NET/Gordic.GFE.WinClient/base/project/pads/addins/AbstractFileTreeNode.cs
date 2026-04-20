//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.AbstractProjectBrowserTreeNode.cs      </Name>
//    <Description> Větev stromu prohlížeče projektu                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Project;

namespace Gordic.GFE.WinClient.AddIns
{
    /// <summary>
    /// Stavy větve souboru
    /// </summary>
    [Flags]
    enum FileNodeStatus
    {
        None = 1,
        InProject = 2,
        Missing = 4,
        BehindFile = 8,
        Link = 16,
    }

    /// <summary>
    /// Větev stromu prohlížeče projektu
    /// </summary>
    abstract class AbstractFileTreeNode : ExtTreeNode, IDisposable
    {
        string toolbarAddinTreePath = null;

        protected bool autoClearNodes = true;
        /// <summary>
        /// Cesta k doplňkům
        /// </summary>
        public virtual string ToolbarAddinTreePath
        {
            get { return toolbarAddinTreePath; }
            set { toolbarAddinTreePath = value; }
        }

        /// <summary>
        /// řešení větve
        /// </summary>
        public virtual Solution Solution
        {
            get
            {
                AbstractFileTreeNode parent = Parent as AbstractFileTreeNode;
                if (parent != null)
                    return parent.Solution;
                return null;
            }
        }

        /// <summary>
        /// projekt
        /// </summary>
        public virtual IProject Project
        {
            get
            {
                AbstractFileTreeNode parent = Parent as AbstractFileTreeNode;
                if (parent != null)
                    return parent.Project;
                return null;
            }
        }
        /// <summary>
        /// Zobrazit vše
        /// </summary>
        public static bool ShowAll
        {
            get { return PropertyService.Get("AbstractFileTreeNode.ShowAll", false); }
            set { PropertyService.Set("AbstractFileTreeNode.ShowAll", value); }
        }
        /// <summary>
        /// Expanding
        /// </summary>
        public override void Expanding()
        {
            if (isInitialized)
                return;
            isInitialized = true;
            if (autoClearNodes)
                Nodes.Clear();
            Initialize();
            base.UpdateVisibility();
        }
        /// <exclude/>
        public static bool IsSomewhereBelow(string path, ProjectItem item)
        {
            return item.Include.StartsWith(path);
        }

        /// <exclude/>
        public static LinkedListNode<T> Remove<T>(LinkedList<T> list, LinkedListNode<T> item)
        {
            LinkedListNode<T> ret = item.Next;
            if (item == list.First)
                list.RemoveFirst();
            else if (item == list.Last)
                list.RemoveLast();
            else
                list.Remove(item);
            return ret;
        }

        /// <exclude/>
        public static event TreeViewEventHandler OnNewNode;

        bool isNewNode = true;

        /// <exclude/>
        public override void Refresh()
        {
            base.Refresh();
            if (isNewNode)
            {
                isNewNode = false;
                if (OnNewNode != null)
                    OnNewNode(null, new TreeViewEventArgs(this));
            }
        }

        Image overlay;

        /// <exclude/>
        public Image Overlay
        {
            get { return overlay; }
            set
            {
                if (overlay == value) return;
                overlay = value;
                if (TreeView != null && IsVisible)
                {
                    Rectangle r = this.Bounds;
                    r.Width += r.X;
                    r.X = 0;
                    TreeView.Invalidate(r);
                }
            }
        }

        /// <exclude/>
        protected string GetQuestionText(string question)
        {
            return StringParser.Parse(question, new string[,] { { "FileName", Text } });
        }

        public abstract object AcceptVisitor(FileTreeNodeVisitor visitor, object data);

        public virtual object AcceptChildren(FileTreeNodeVisitor visitor, object data)
        {
            foreach (TreeNode node in Nodes)
                if (node is AbstractFileTreeNode)
                    ((AbstractFileTreeNode)node).AcceptVisitor(visitor, data);
            return data;
        }
    }
}
