//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ViewContentCollection.cs                 </Name>
//    <Description> kolekce pohledů                                             </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-06-29                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using System.Collections.ObjectModel;
using System.Linq;
using System.Runtime.InteropServices;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// kolekce pohledů
    /// </summary>
    [ComVisible(false)]
    public sealed class ViewContentCollection : Collection<IViewContent>
    {
        readonly IWorkspaceWindow window;

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="window"></param>
        public ViewContentCollection(IWorkspaceWindow window) { this.window = window; }

        /// <summary>
        /// Uvolnění položek
        /// </summary>
        protected override void ClearItems()
        {
            foreach (IViewContent vc in this)
                window.UnregisterContent(vc);

            base.ClearItems();
            window.ClearContent();
            window.UpdateActiveViewContent();
            window.VisibleContents.Clear();
        }
        /// <summary>
        /// Vložení položky na určitou pozici
        /// </summary>
        /// <param name="index">Pozice pro vložení</param>
        /// <param name="item">Vkládaná položka</param>
        protected override void InsertItem(int index, IViewContent item)
        {
            base.InsertItem(index, item);

            window.RegisterNewContent(item);

            (item.Control as Control).Dock = DockStyle.Fill;
            int count = this.Count(itm => itm.Visible);
            if (count != 0)
            {
                if (count == 1)
                {
                    if (window.Controls.Count != count)
                        window.Controls.Add(item.Control as Control);
                }
                else if (window.ViewTabControl == null || window.ViewTabControl.TabPages.Count != count)
                {
                    if (count == 2)
                    {
                        window.CreateViewTabControl();
                        IViewContent oldItem = this.FirstOrDefault(itm => itm.Visible);
                        if (oldItem == item) oldItem = this.LastOrDefault(itm => itm.Visible);

                        TabPage oldPage = new TabPage(StringParser.Parse(oldItem.TabPageText));
                        oldPage.Controls.Add(oldItem.Control as Control);
                        window.ViewTabControl.TabPages.Add(oldPage);
                    }

                    TabPage newPage = new TabPage(StringParser.Parse(item.TabPageText));
                    newPage.Controls.Add(item.Control as Control);

                    if (index >= window.ViewTabControl.TabPages.Count)
                        window.ViewTabControl.TabPages.Add(newPage);
                    else
                        window.ViewTabControl.TabPages.Insert(index, newPage);
                }
            }
            window.UpdateActiveViewContent();
            UpdateVisibleContents();
        }
        /// <summary>
        /// Odstranění položky
        /// </summary>
        /// <param name="index">Pozice položky k odstranění</param>
        protected override void RemoveItem(int index)
        {
            window.UnregisterContent(this[index]);

            base.RemoveItem(index);

            if (Count < 2)
            {
                window.ClearContent();
                if (Count == 1)
                    window.Controls.Add(this[0].Control as Control);
            }
            else
                window.ViewTabControl.TabPages.RemoveAt(index);
            window.UpdateActiveViewContent();
            UpdateVisibleContents();
        }
        /// <summary>
        /// Nastavení položky na určitou hodnotu
        /// </summary>
        /// <param name="index">Index položky k nastavení</param>
        /// <param name="item">Nová hodnota</param>
        protected override void SetItem(int index, IViewContent item)
        {
            window.UnregisterContent(this[index]);

            base.SetItem(index, item);

            window.RegisterNewContent(item);

            (item.Control as Control).Dock = DockStyle.Fill;
            if (Count == 1)
            {
                window.ClearContent();
                window.Controls.Add(item.Control as Control);
            }
            else
            {
                TabPage page = window.ViewTabControl.TabPages[index];
                page.Controls.Clear();
                page.Controls.Add(item.Control as Control);
                page.Text = StringParser.Parse(item.TabPageText);
            }
            window.UpdateActiveViewContent();
            UpdateVisibleContents();
        }

        void UpdateVisibleContents()
        {
            window.VisibleContents = this.Select(itm => itm.Visible ? itm : null)?
                .Distinct()
                .ToList()
                .FindAll(itm => itm != null);
        }
    }
}
