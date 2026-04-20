//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DockContentCollection.cs               </Name>
//    <Description> Kolekce dokovatelných obsahù                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Kolekce dokovatelných obsahù
    /// </summary>
    [ComVisible(false)]
    public class DockContentCollection : ReadOnlyCollection<IDockContent>
    {
        static List<IDockContent> _emptyList = new List<IDockContent>(0);

        private readonly DockPane m_dockPane = null;
        /// <summary>
        /// Podokno dané kolekce
        /// </summary>
        private DockPane DockPane { get { return m_dockPane; } }

        /// <summary>
        /// Získání obsahu dle pozice
        /// </summary>
        /// <param name="index">Pozice obsahu pro získání</param>
        /// <returns></returns>
        public new IDockContent this[int index]
        {
            get { return DockPane == null ? Items[index] as IDockContent : GetVisibleContent(index); }
        }
        /// <summary>
        /// Poèet objektu v kolekci
        /// </summary>
        public new int Count { get { return DockPane == null ? base.Count : CountOfVisibleContents; } }

        int CountOfVisibleContents
        {
            get
            {
                int count = 0;
                foreach (IDockContent content in DockPane.Contents)
                    if (content.DockHandler.DockState == DockPane.DockState)
                        count++;
                return count;
            }
        }

        /// <summary>
        /// Vytvoøení nové instance tøídy
        /// </summary>
        internal DockContentCollection()
            : base(new List<IDockContent>())
        {
        }
        /// <summary>
        /// Vytvoøení nové instance tøídy dle podokna
        /// </summary>
        /// <param name="pane">Dané podokno</param>
        internal DockContentCollection(DockPane pane)
            : base(_emptyList)
        {
            m_dockPane = pane;
        }

        /// <summary>
        /// Pøidání obsahu
        /// </summary>
        /// <param name="content">Pøidávaný obsah</param>
        /// <returns></returns>
        internal int Add(IDockContent content)
        {
            if (Contains(content))
                return IndexOf(content);

            Items.Add(content);
            return Count - 1;
        }
        /// <summary>
        /// Pøidání obsahu na urèitou pozici
        /// </summary>
        /// <param name="content">Pøidávaný obsah</param>
        /// <param name="index">Pozice pro obsah</param>
        internal void AddAt(IDockContent content, int index)
        {
            if (index < 0 || index > Items.Count - 1)
                return;

            if (Contains(content))
                return;

            Items.Insert(index, content);
        }

        /// <summary>
        /// Zjištìní, zda kolekce obsahuje uvedený obsah
        /// </summary>
        /// <param name="content">Obsah kolekce</param>
        /// <returns></returns>
        public new bool Contains(IDockContent content)
        {
            return DockPane == null ? Items.Contains(content) : (GetIndexOfVisibleContents(content) != -1);
        }

        /// <summary>
        /// Pozice urèitého obsahu v kolekci
        /// </summary>
        /// <param name="content">Obsah, pozicí kterého chceme získat</param>
        /// <returns></returns>
        public new int IndexOf(IDockContent content)
        {
            if (DockPane == null)
                return !Contains(content) ? -1 : Items.IndexOf(content);
            else
                return GetIndexOfVisibleContents(content);
        }
        /// <summary>
        /// Odstranìní obshu z kolekce
        /// </summary>
        /// <param name="content">Obsah k odstranìní</param>
        internal void Remove(IDockContent content)
        {
            if (DockPane != null)
                throw new InvalidOperationException();

            if (!Contains(content))
                return;

            Items.Remove(content);
        }

        private IDockContent GetVisibleContent(int index)
        {
            int currentIndex = -1;
            foreach (IDockContent content in DockPane.Contents)
            {
                if (content.DockHandler.DockState == DockPane.DockState)
                    currentIndex++;

                if (currentIndex == index)
                    return content;
            }
            throw (new ArgumentOutOfRangeException());
        }

        private int GetIndexOfVisibleContents(IDockContent content)
        {
            if (content == null)
                return -1;

            int index = -1;
            foreach (IDockContent c in DockPane.Contents)
                if (c.DockHandler.DockState == DockPane.DockState)
                {
                    index++;

                    if (c == content)
                        return index;
                }
            return -1;
        }
    }
}
