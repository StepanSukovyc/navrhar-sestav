//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AbstractFileExplorerTreeNode.cs        </Name>
//    <Description> větev stromu prohlížeče souborů                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-11                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Runtime.Serialization;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.AddIns
{
    /// <summary>
    /// větev stromu prohlížeče souborů
    /// </summary>
    [ComVisible(false)]
    [Serializable]
    public abstract class AbstractExtTreeNode : ExtTreeNode
    {
        #region ISerializable
        /// <summary>
        /// Initializes a new instance of the ExtTreeNode class using the
        /// specified serialization information and context.
        /// </summary>
        /// <param name="serializationInfo"></param>
        /// <param name="context"></param>
        protected AbstractExtTreeNode(SerializationInfo serializationInfo, StreamingContext context) : base(serializationInfo, context) { }
        /// <summary>
        /// prázdný konstruktor třídy
        /// </summary>
        public AbstractExtTreeNode() { }
        #endregion

        bool isNewNode = true;
        readonly string fullName = string.Empty;
        /// <summary>
        /// Pomocná proměnná pro práci s DragDrop
        /// </summary>
        public virtual string FullName { get { return fullName; } }

        /// <summary>
        /// Cesta ke konfiguraci nástrojové lišty
        /// </summary>
        public virtual string ToolbarAddinTreePath { get; set; }

        /// <summary>
        /// Expandování
        /// </summary>
        public override void Expanding()
        {
            if (isInitialized)
                return;
            isInitialized = true;
            Initialize();
            base.UpdateVisibility();
        }

        /// <summary>
        /// Odstranění položky ze seznamu
        /// </summary>
        /// <typeparam name="T">Typ položky</typeparam>
        /// <param name="list">Seznam</param>
        /// <param name="item">Položka k odstranění</param>
        /// <returns></returns>
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

        /// <summary>
        /// STATIC událost voláná po přidání nového úzlu do prohlížeče projektu.
        /// </summary>
        public static event TreeViewEventHandler OnNewNode;

        /// <summary>
        /// Aktualizace
        /// </summary>
        public override void Refresh()
        {
            base.Refresh();
            if (isNewNode)
            {
                isNewNode = false;
                OnNewNode?.Invoke(null, new TreeViewEventArgs(this));
            }
        }
    }
}
