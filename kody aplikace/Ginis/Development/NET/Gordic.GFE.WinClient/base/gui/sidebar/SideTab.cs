//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SideTab.cs                             </Name>
//    <Description> Záložka boční lišty                                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-08                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Gui;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.Base.Gui
{
    /// <summary>
    /// Delegát na změnu míst dvou položek
    /// </summary>
    /// <param name="source"></param>
    /// <param name="e"></param>
    public delegate void SideTabItemExchangeEventHandler(object source, SideTabItemExchangeEventArgs e);

    /// <summary>
    /// Argument události na změnu umístění dvou položek
    /// </summary>
    public class SideTabItemExchangeEventArgs
    {

        /// <summary>
        /// Vytvoření argumentu
        /// </summary>
        /// <param name="item1">Položka první</param>
        /// <param name="item2">Položka druhá</param>
        public SideTabItemExchangeEventArgs(SideTabItem item1, SideTabItem item2)
        {
            this.Item1 = item1;
            this.Item2 = item2;
        }
        /// <summary>
        /// Informace o první položce
        /// </summary>
        public SideTabItem Item1 { get; }
        /// <summary>
        /// Informace o druhé položce
        /// </summary>
        public SideTabItem Item2 { get; }
    }

    /// <summary>
    /// Výčet možných stavu záložky
    /// </summary>
    public enum SideTabStatus
    {
        /// <summary>
        /// normální
        /// </summary>
        Normal,
        /// <summary>
        /// záložka je vybraná
        /// </summary>
        Selected,
        /// <summary>
        /// záložka je ve stavu tažení
        /// </summary>
        Dragged
    }

    /// <summary>
    /// Záložka boční lišty
    /// </summary>
    public class SideTab
    {
        string name;
        SideTabItem selectedItem = null, choosedItem = null;

        /// <summary>
        /// Indikuje skrýtost záložky
        /// </summary>
        public bool Hidden = false;

        /// <summary>
        /// Index přetáčení
        /// </summary>
        public int ScrollIndex { get; set; } = 0;
        /// <summary>
        /// Seznam obrázků pro velké ikonky
        /// </summary>
        public ImageList LargeImageList { get; set; } = null;

        /// <summary>
        /// Seznam malých ikonek
        /// </summary>
        public ImageList SmallImageList { get; set; } = null;
        /// <summary>
        /// Stav boční záložky
        /// </summary>
        public SideTabStatus SideTabStatus { get; set; }

        /// <summary>
        /// Indikuje možnost odstranění záložky
        /// </summary>
        public bool CanBeDeleted { get; set; } = true;
        /// <summary>
        /// Indikuje možnost přejmenování záložky
        /// </summary>
        public bool CanBeRenamed { get; set; } = true;
        /// <summary>
        /// Název záložky
        /// </summary>
        public string Name
        {
            get { return name; }
            set
            {
                name = value;
                DisplayName = value;
            }
        }
        /// <summary>
        /// Zobrazený název záložky
        /// </summary>
        public string DisplayName { get; set; }
        /// <summary>
        /// KOlekce položek záložky
        /// </summary>
        public SideTabItemCollection Items { get; } = new SideTabItemCollection();
        /// <summary>
        /// Indikuje zda záložka může být tažená
        /// </summary>
        public bool CanDragDrop { get; set; } = true;

        /// <summary>
        /// Indikuje možnost uložení záložky
        /// </summary>
        public bool CanSaved { get; set; } = true;
        /// <summary>
        /// Vybraná položka záložky
        /// </summary>
        public SideTabItem SelectedItem
        {
            get { return selectedItem; }
            set
            {
                if (selectedItem != null && selectedItem != choosedItem)
                    selectedItem.SideTabItemStatus = SideTabItemStatus.Normal;
                selectedItem = value;
                if (selectedItem != null && selectedItem != choosedItem)
                    selectedItem.SideTabItemStatus = SideTabItemStatus.Selected;
            }
        }
        /// <exclude/>
        protected void OnChoosedItemChanged(EventArgs e)
        {
            ChoosedItemChanged?.Invoke(this, e);
        }
        /// <summary>
        /// Ovladač události po změně vybrané položky
        /// </summary>
        public event EventHandler ChoosedItemChanged;
        /// <summary>
        /// Změněná položka
        /// </summary>
        public SideTabItem ChoosedItem
        {
            get { return choosedItem; }
            set
            {
                if (choosedItem != null)
                    choosedItem.SideTabItemStatus = SideTabItemStatus.Normal;
                choosedItem = value;
                if (choosedItem != null)
                    choosedItem.SideTabItemStatus = SideTabItemStatus.Choosed;
                OnChoosedItemChanged(null);
            }
        }

        /// <summary>
        /// SideTabItem může být odstraněná.
        /// </summary>
        public event EventHandlerSideTabItem ItemRemoved;

        /// <summary>
        /// Dvě SideTabItems vyměnili místa.
        /// </summary>
        public event SideTabItemExchangeEventHandler ItemsExchanged;
        /// <summary>
        /// Farma na vytvoření položek
        /// </summary>
        public ISideTabItemFactory SideTabItemFactory
        {
            get { return Items.SideTabItemFactory; }
            set { Items.SideTabItemFactory = value; }
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        protected SideTab() { }

        /// <summary>
        /// Vytvoření nové isnatance třídy s farmoun a vytváření položek
        /// </summary>
        /// <param name="sideTabItemFactory">Farma na vytváření položek</param>
        public SideTab(ISideTabItemFactory sideTabItemFactory)
        {
            SideTabItemFactory = sideTabItemFactory;
        }

        /// <summary>
        /// Vytvořenín nové instance třídy
        /// </summary>
        /// <param name="sideBar">OPstranní lišta</param>
        /// <param name="name">Název vytváření záložky</param>
        public SideTab(SideBarControl sideBar, string name)
            : this(sideBar.SideTabItemFactory)
        {
            this.Name = name;
            SetCanRename();
            Items.ItemRemoved += OnSideTabItemRemoved;
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="name">Název vytvářené položky</param>
        public SideTab(string name)
        {
            this.Name = name;
            SetCanRename();
            Items.ItemRemoved += OnSideTabItemRemoved;
        }

        /// <summary>
        /// Indikuje aktivací tlačítka přetáčení dolů
        /// </summary>
        public bool ScrollDownButtonActivated { get { return ScrollIndex > 0; } }
        /// <summary>
        /// Indikuje aktivací tlačítka přetáčení nahoru
        /// </summary>
        public bool ScrollUpButtonActivated { get { return true; } }

        /// <summary>
        /// Kreslení hlavičky záložky
        /// </summary>
        /// <param name="g">Ovlafač grafiky</param>
        /// <param name="font">Písmo</param>
        /// <param name="pos">Pozice</param>
        /// <param name="width">šířka</param>
        public void DrawTabHeader(Graphics g, Font font, Point pos, int width)
        {
            switch (SideTabStatus)
            {
                case SideTabStatus.Normal:
                    ControlPaint.DrawBorder3D(g, new Rectangle(0, pos.Y, width - 4, font.Height + 4), Border3DStyle.RaisedInner);
                    g.DrawString(DisplayName, font, SystemBrushes.ControlText, new RectangleF(1, pos.Y + 1, width - 5, font.Height + 1));

                    break;
                case SideTabStatus.Selected:
                    ControlPaint.DrawBorder3D(g, new Rectangle(0, pos.Y, width - 4, font.Height + 4), Border3DStyle.Sunken);
                    g.DrawString(DisplayName, font, SystemBrushes.ControlText, new RectangleF(1 + 1, pos.Y + 2, width - 5, font.Height + 2));
                    break;
                case SideTabStatus.Dragged:
                    Rectangle r = new Rectangle(0, pos.Y, width - 4, font.Height + 4);
                    ControlPaint.DrawBorder3D(g, r, Border3DStyle.RaisedInner);
                    r.X += 2;
                    r.Y += 1;
                    r.Width -= 4;
                    r.Height -= 2;

                    g.FillRectangle(SystemBrushes.ControlDarkDark, r);

                    g.DrawString(DisplayName, font, SystemBrushes.HighlightText, new RectangleF(1 + 1, pos.Y + 2, width - 5, font.Height + 2));
                    break;
            }
        }
        /// <summary>
        /// Výška záložky
        /// </summary>
        public int Height { get { return Items.Count * 20; } }
        /// <summary>
        /// Získání umístění položky
        /// </summary>
        /// <param name="whichItem">Daná položka</param>
        /// <returns></returns>
        public Point GetLocation(SideTabItem whichItem)
        {
            for (int i = 0; i < Items.Count; ++i)
            {
                SideTabItem item = (SideTabItem)Items[i];
                if (item == whichItem)
                    return new Point(0, i * 20);
            }
            return new Point(-1, -1);
        }
        /// <summary>
        /// Získání položky dle pozice
        /// </summary>
        /// <param name="x">POzice X hledané položky</param>
        /// <param name="y">Pozice Y hledané položky</param>
        /// <returns></returns>
        public SideTabItem GetItemAt(int x, int y)
        {
            int index = ScrollIndex + y / 20;
            return (index >= 0 && index < Items.Count) ? (SideTabItem)Items[index] : null;
        }

        /// <summary>
        /// Získání položky na pozici
        /// </summary>
        /// <param name="pos">Pozice položky pro hledání</param>
        /// <returns></returns>
        public SideTabItem GetItemAt(Point pos)
        {
            return GetItemAt(pos.X, pos.Y);
        }
        /// <summary>
        /// Výška položky
        /// </summary>
        public int ItemHeight { get { return 20; } }
        /// <summary>
        /// Kreslení obsahu záložky
        /// </summary>
        /// <param name="g">Oladač grafiky</param>
        /// <param name="f">Písmo</param>
        /// <param name="rectangle">Ohraničení</param>
        public void DrawTabContent(Graphics g, Font f, Rectangle rectangle)
        {
            for (int i = 0; i + ScrollIndex < Items.Count; ++i)
            {
                SideTabItem item = (SideTabItem)Items[ScrollIndex + i];
                if (rectangle.Height < i * ItemHeight)
                    break;

                item.DrawItem(g, f, new Rectangle(rectangle.X,
                                                  rectangle.Y + i * ItemHeight,
                                                  rectangle.Width,
                                                  ItemHeight));
            }
        }

        /// <summary>
        /// Výměna dvou položek s danými indexy
        /// </summary>
        /// <param name="a">Index první položky</param>
        /// <param name="b">Index druhé položky</param>
        public void Exchange(int a, int b)
        {
            SideTabItem itemA = Items[a], itemB = Items[b];
            Items[a] = itemB;
            Items[b] = itemA;
            OnExchange(itemA, itemB);
        }

        void SetCanRename()
        {
            if (name != null && name.StartsWith("${res:"))
                CanBeRenamed = false;
        }
        void OnSideTabItemRemoved(object source, EventArgsSideTabItem e)
        {
            ItemRemoved?.Invoke(this, e);
        }
        void OnExchange(SideTabItem item1, SideTabItem item2)
        {
            ItemsExchanged?.Invoke(this, new SideTabItemExchangeEventArgs(item1, item2));
        }

        /// <summary>
        /// Kolekce položek boční záložky
        /// </summary>
        public class SideTabItemCollection : ICollection<SideTabItem>, IEnumerable<SideTabItem>
        {
            List<SideTabItem> list = new List<SideTabItem>();

            /// <summary>
            /// Reakce na odstranění položky
            /// </summary>
            public event EventHandlerSideTabItem ItemRemoved;
            /// <summary>
            /// Farnma na vytváření položek
            /// </summary>
            public ISideTabItemFactory SideTabItemFactory { get; set; } = new DefaultSideTabItemFactory();

            /// <summary>
            /// Vytvoření nové instance třídy
            /// </summary>
            public SideTabItemCollection()
            {
            }
            /// <summary>
            /// Získání položky na umístění
            /// </summary>
            /// <param name="index">Index položky</param>
            /// <returns></returns>
            public SideTabItem this[int index]
            {
                get { return (SideTabItem)list[index]; }
                set { list[index] = value; }
            }
            /// <summary>
            /// Index tažené položky
            /// </summary>
            public int DraggedIndex
            {
                get
                {
                    for (int i = 0; i < Count; ++i)
                        if (this[i].SideTabItemStatus == SideTabItemStatus.Drag)
                            return i;
                    return -1;
                }
            }
            /// <summary>
            /// Počet položek v kolekci
            /// </summary>
            public int Count { get { return list.Count; } }
            /// <summary>
            /// Indikuje synchronizovanost položek
            /// </summary>
            public virtual bool IsSynchronized { get { return false; } }
            /// <summary>
            /// Synchronizace jádra
            /// </summary>
            public virtual object SyncRoot { get { return this; } }
            /// <summary>
            /// Přidání položky do kolekce
            /// </summary>
            /// <param name="item">Přidávaná položka</param>
            public virtual void Add(SideTabItem item)
            {
                list.Add(item);
            }
            /// <summary>
            /// Přidání položky do kolekce
            /// </summary>
            /// <param name="name">Název přidávané položky</param>
            /// <param name="content">Obsah přidávané položky</param>
            /// <returns></returns>
            public virtual SideTabItem Add(string name, object content)
            {
                return Add(name, content, -1);
            }
            /// <summary>
            /// Přidání položky do kolekce
            /// </summary>
            /// <param name="name">Název položky</param>
            /// <param name="content">Obsah položky</param>
            /// <param name="imageIndex">Index obrázku položky</param>
            /// <returns></returns>
            public virtual SideTabItem Add(string name, object content, int imageIndex)
            {
                SideTabItem item = SideTabItemFactory.CreateSideTabItem(name, imageIndex);
                item.Tag = content;
                Add(item);
                return item;
            }
            /// <summary>
            /// Vyčištění kolekce
            /// </summary>
            public virtual void Clear()
            {
                list.Clear();
            }
            /// <summary>
            /// Zjištění, zda kolekce obsahuje položku
            /// </summary>
            /// <param name="item">Zjišťovaná položka</param>
            /// <returns></returns>
            public bool Contains(SideTabItem item)
            {
                return list.Contains(item);
            }
            /// <exclude/>
            public IEnumerator<SideTabItem> GetEnumerator()
            {
                return list.GetEnumerator();
            }

            System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
            {
                return list.GetEnumerator();
            }
            /// <summary>
            /// Index dané položky
            /// </summary>
            /// <param name="item">Položka pro zjištění indexu</param>
            /// <returns></returns>
            public int IndexOf(SideTabItem item)
            {
                return list.IndexOf(item);
            }
            /// <exclude/>
            public void CopyTo(Array dest, int index)
            {
                list.CopyTo((SideTabItem[])dest, index);
            }

            /// <exclude/>
            public virtual SideTabItem Insert(int index, SideTabItem item)
            {
                list.Insert(index, item);
                return item;
            }

            /// <exclude/>
            public virtual SideTabItem Insert(int index, string name, object content)
            {
                return Insert(index, name, content, -1);
            }

            /// <exclude/>
            public virtual SideTabItem Insert(int index, string name, object content, int imageIndex)
            {
                SideTabItem item = SideTabItemFactory.CreateSideTabItem(name, imageIndex);
                item.Tag = content;
                return Insert(index, item);
            }

            /// <exclude/>
            public virtual bool Remove(SideTabItem item)
            {
                bool r = list.Remove(item);
                OnItemRemoved(item);
                return r;
            }

            /// <exclude/>
            public virtual void RemoveAt(int index)
            {
                if (index < 0 || index >= list.Count)
                    return;
                SideTabItem item = this[index];
                list.Remove(item);
                OnItemRemoved(item);
            }

            void OnItemRemoved(SideTabItem item)
            {
                ItemRemoved?.Invoke(this, new EventArgsSideTabItem(item));
            }

            /// <summary>
            /// Indikuje, že kolekce je pouze pro čtení
            /// </summary>
            public bool IsReadOnly { get { return false; } }
            /// <exclude/>
            public void CopyTo(SideTabItem[] array, int arrayIndex)
            {
                throw new NotImplementedException();
            }
        }
    }
}
