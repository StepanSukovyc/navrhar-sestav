//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TextBoxControl.cs                        </Name>
//    <Description> Vlastní TextBox používaný na stránkách                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-03-15                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using System.Drawing;
using Gordic.WinForms.Controls;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Core;
using System;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Vlastní TextBox používaný na stránkách
    /// </summary>
    public class ComboControl : GLabeledComboBox, IEditControl
    {
        /// <summary>
        /// Volá se po aktualizací textu
        /// </summary>
        public event EventHandler TextRefreshed;

        /// <summary>
        /// Konstruktor objektu
        /// </summary>
        public ComboControl()
        {
            LabelVisible = false;
            base.BorderStyle = GraphicSettingService.ShowColorOf ? GLtbBorderStyle.RedThick : GLtbBorderStyle.None;
        }

        /// <summary>
        /// Pozice obsahu uvnitř ovladače
        /// </summary>
        public RectangleF ContentBounds
        {
            get { return EditRect; }
            set
            {
                var p = Point.Ceiling(value.Location);
                EditHorizontalOffset = p.X - Left - BorderSize - 1;
                EditVerticalOffset = p.Y - Top - BorderSize - 1;
            }
        }

        /// <summary>
        /// Obsah, kterému patří daný objekt
        /// </summary>
        public IDefaultDataItemHandler DataItem { get; set; }

        /// <summary>
        /// "Vlastník" ovládacího prvku - objekt, který nahrazuje daný ovladací prvek
        /// </summary>
        public object Owner
        {
            get { return (DataItem == null || DataItem.DataItem == null || DataItem.DataItem.Owner == null) ? null : DataItem.DataItem.Owner; }
        }

        /// <summary>
        /// Fokusace objektu
        /// </summary>
        void IEditControl.Focus() { this.Focus(); if (Focused) this.DroppedDown = true; }

        ///// <summary>
        ///// Datum a čas
        ///// </summary>
        //public DateTime Value { get; set; }

        /// <summary>
        /// Pretypovani (pripadne)
        /// </summary>
        public new BorderStyle BorderStyle
        {
            get { return base.BorderStyle; }
            set { base.BorderStyle = value; }
        }

        /// <summary>
        /// Přidání položek do seznamu
        /// </summary>
        /// <param name="items">Přidávané položky</param>
        /// <param name="defKey">výchozí klíč</param>
        /// <param name="defValue">Výchozí hodnota</param>
        public void AddItems(string items, string defKey = null, string defValue = null)
        {
            int si = -1;
            ItemValue iv = null;
            foreach (string s in items.Split('|'))
            {
                if (iv == null)
                {
                    iv = new ItemValue() { Key = s };
                    if (s == defKey) si = Items.Count;
                }
                else
                {
                    iv.Text = s;
                    if (s == defValue) si = Items.Count;
                    Items.Add(iv);
                    iv = null;
                }
            }
            if (si >= 0 && si < Items.Count)
                SelectedIndex = si;
        }
        public void Add(string key, string value)
        {
            var iv = new ItemValue() { Key = key, Text = value };
            Items.Add(iv);
        }

        private class ItemValue
        {
            public string Key;
            public string Text;
            public override string ToString() { return Text; }
        }
        /// <summary>
        /// objekt je pozměněn
        /// </summary>
        public bool IsDirty { get; set; }
        /// <summary>
        /// aktualizace textové hodnoty
        /// </summary>
        /// <returns></returns>
        public bool RefreshText()
        {
            if (IsDirty && DataItem != null)
            {
                if (RunValidation() == false) return false;

                if (SelectedItem is ItemValue i)
                {
                    DataItem.UpdateContent(DataItem.DataItem.ComboKeyName, i.Key);
                    DataItem.UpdateContent(DataItem.DataItem.ComboValueName, i.Text);
                    IsDirty = false;
                }
                else
                {
                    if (DropDownStyle == ComboBoxStyle.DropDown)
                    {
                        DataItem.UpdateContent(DataItem.DataItem.ComboKeyName, Text);
                        DataItem.UpdateContent(DataItem.DataItem.ComboValueName, Text);
                        IsDirty = false;
                    }
                    else
                        return false;
                }
            }
            OnTextRefreshed();
            return true;
        }

        void OnTextRefreshed()
        {
            TextRefreshed?.Invoke(this, EventArgs.Empty);
        }

        private void InitializeComponent()
        {
            ((System.ComponentModel.ISupportInitialize)(this)).BeginInit();
            this.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this)).EndInit();
            this.ResumeLayout(false);
        }

        protected override void OnSelectedIndexChanged(EventArgs e)
        {
            base.OnSelectedIndexChanged(e);
            RefreshText();
        }

    }
}
