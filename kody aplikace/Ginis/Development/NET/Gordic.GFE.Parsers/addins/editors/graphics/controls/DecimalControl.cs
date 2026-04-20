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
using System.Runtime.InteropServices;
using System;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Vlastní TextBox používaný na stránkách
    /// </summary>
    [ComVisible(false)]
    public class DecimalControl : GTbGDecimal, IEditControl
    {
        /// <summary>
        /// Volá se po aktualizací textu
        /// </summary>
        public event EventHandler TextRefreshed;

        /// <summary>
        /// Konstruktor objektu
        /// </summary>
        public DecimalControl()
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
        void IEditControl.Focus()
        {
            this.Focus();
        }

        /// <summary>
        /// Pretypovani (pripadne)
        /// </summary>
        public new BorderStyle BorderStyle
        {
            get { return base.BorderStyle; }
            set { base.BorderStyle = value; }
        }
        public bool IsDirty { get; set; }

        public bool RefreshText()
        {
            if (IsDirty && DataItem != null)
            {
                if (RunValidation() == false) return false;
                DataItem.UpdateContent(Value.DbValue);
            }
            OnTextRefreshed();
            return true;
        }

        void OnTextRefreshed()
        {
            TextRefreshed?.Invoke(this, EventArgs.Empty);
        }
    }
}
