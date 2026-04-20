//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.CustomListBox.cs                       </Name>
//    <Description> Vlastní seznam s kontextovou nabídkou a podporou operací     </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2014-11-06                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core.WinForm;
using System;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.Base
{
    /// <summary>
    /// Vlastní seznam s kontextovou nabídkou a podporou přidávání, mazání a přesouvání položek
    /// </summary>
    class CustomListBox : ListBox
    {
        #region Constants
        /// <summary>
        /// Cesta ke kontextovému menu pro CustomListBox
        /// </summary>
        private const string ContextMenuPath = "/Formation/CustomListBox/ContextMenu";
        #endregion

        #region Events
        /// <summary>
        /// Event volaný při přidání nové položky
        /// </summary>
        public event EventHandler OnAddItem;

        /// <summary>
        /// Event volaný při odebrání vybrané položky
        /// </summary>
        public event EventHandler OnDeleteItem;

        /// <summary>
        /// Event volaný při posunutí položky o jednu pozici dolů
        /// </summary>
        public event EventHandler OnShiftDownItem;

        /// <summary>
        /// Event volaný při posunutí položky o jednu pozici nahoru
        /// </summary>
        public event EventHandler OnShiftUpItem;
        #endregion

        #region Overrides
        /// <summary>
        /// Volá se při vytváření ovládacího prvku
        /// </summary>
        protected override void OnCreateControl()
        {
            base.OnCreateControl();

            ContextMenuStrip strip = MenuService.CreateContextMenu(this, new EventArgsContextMenu(ContextMenuPath));
            if (strip != null)
                ContextMenuStrip = strip;
        }
        #endregion

        #region Public Methods
        /// <summary>
        /// Obnoví zobrazení aktuálně vybrané položky
        /// </summary>
        public void RefreshSelectedItem()
        {
            if (SelectedIndex != -1)
                RefreshItem(SelectedIndex);
        }
        #endregion

        #region Internal Methods
        /// <summary>
        /// Vyvolá event pro přidání nové položky
        /// </summary>
        internal void AddItem() => OnAddItem?.Invoke(this, EventArgs.Empty);

        /// <summary>
        /// Vyvolá event pro odebrání vybrané položky
        /// </summary>
        internal void DeleteItem() => OnDeleteItem?.Invoke(this, EventArgs.Empty);

        /// <summary>
        /// Vyvolá event pro posunutí položky o jednu pozici dolů
        /// </summary>
        internal void ShiftDownItem() => OnShiftDownItem?.Invoke(this, EventArgs.Empty);

        /// <summary>
        /// Vyvolá event pro posunutí položky o jednu pozici nahoru
        /// </summary>
        internal void ShiftUpItem() => OnShiftUpItem?.Invoke(this, EventArgs.Empty);
        #endregion
    }
}
