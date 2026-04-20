//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DateTimePickerControl.cs                 </Name>
//    <Description> Komponenta DateTimePicker rozšířená o potřebné funkcionality</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-03-15                                                  </Created>
//  </FileHeader>

using System.Drawing;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.WinForms.Controls;
using System.Runtime.InteropServices;
using System;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Komponenta DateTimePicker rozšířená o potřebné funkcionality
    /// </summary>
    [ComVisible(false)]
    public class DateTimePickerControl : GTbGDateTime, IEditControl
    {
        /// <summary>
        /// Volá se po aktualizací textu
        /// </summary>
        public event EventHandler TextRefreshed;

        /// <summary>Konstruktor</summary>
        public DateTimePickerControl()
        {
            LabelVisible = false;
            HasButton = true;
            base.BorderStyle = GraphicSettingService.ShowColorOf ? GLtbBorderStyle.RedThick : GLtbBorderStyle.None;
        }

        /// <summary>
        /// Pozice obsahu uvnitř ovladače
        /// </summary>
        public System.Drawing.RectangleF ContentBounds
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

        public static bool CheckDateTimeFormat(string value)
        {
            int l_index = value == null ? 1 : value.IndexOfAny(new char[] { 'H', 'h', 'S', 's' }); //M zamerne vynecham kvuli pleteni M a m
            return l_index >= 0; // s casem
        }
        //bool m_hasTime = false;
        //string m_pattern = null;
        ///// <summary>
        ///// šablona
        ///// </summary>
        //public override string Pattern
        //{
        //    get { return m_pattern ?? base.Pattern; }
        //}
        ///// <summary>
        ///// formátování
        ///// </summary>
        //public string Format {
        //    set
        //    {
        //        int l_index = value == null ? 1 : value.IndexOfAny(new char[] { 'H', 'h', 'S', 's' }); //M zamerne vynecham kvuli pleteni M a m
        //        if (l_index >= 0) // s casem
        //        {
        //            m_pattern = new GTbGDateTime().Pattern;
        //        }
        //        else
        //        {
        //            m_pattern = base.Pattern;
        //        }
        //    }
        //}

        ///// <summary>
        ///// Získání datumu a času z řetěuzce
        ///// </summary>
        ///// <param name="datetime">Řetězec s hodnotou datumu a času</param>
        ///// <param name="format">Formát datumu</param>
        ///// <returns></returns>
        //public static GDateTime GetDateTime(string datetime, string format = "yyyyMMddHHmmss")
        //{
        //    DateTime d;
        //    if (DateTime.TryParseExact(datetime, format, null, System.Globalization.DateTimeStyles.None, out d))
        //        return d;
        //    return GDateTime.Null;
        //}

        /// <summary>
        /// Fokusace objektu
        /// </summary>
        void IEditControl.Focus()
        {
            this.Focus();
        }

        /// <summary>
        /// Víceřádkový
        /// </summary>
        bool IEditControl.Multiline { get { return false; } set { } }

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
