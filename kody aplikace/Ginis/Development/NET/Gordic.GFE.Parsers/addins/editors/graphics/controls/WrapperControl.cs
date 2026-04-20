//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.WrapperControl.cs                        </Name>
//    <Description> Wrapper pro aplikační políčka (může vyžadovat online přístup)</Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-03-21                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.WinForms.Controls;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Wrapper pro aplikační políčka (může vyžadovat online přístup)
    /// </summary>
    public class WrapperControl : Control, IEditControl, IGUserInput
    {
        /// <summary>
        /// Volá se po aktualizací textu
        /// </summary>
        public event EventHandler TextRefreshed;

        Type m_t;
        Control m_c;
        //bool changed = false;
        /// <summary>Konstruktor</summary>
        public WrapperControl(Type t, string text)
        {
            SetStyle(ControlStyles.Selectable, false);

            m_t = t;
            var c = Activator.CreateInstance(t) as Control;
            m_c = c;
            m_c.Parent = this;
            m_c.Dock = DockStyle.Fill;

            if (m_c is GLabeledTextBox lb)
            {
                lb.LabelVisible = false;
                lb.SetInvalidData(text);
                lb.BorderStyle = GraphicSettingService.ShowColorOf ? GLtbBorderStyle.RedThick : GLtbBorderStyle.None;
            }
            else
            {
                m_c.Text = text;
                var l_LabelVisible = t.GetProperty("LabelVisible");
                if (l_LabelVisible != null)
                    l_LabelVisible.SetValue(m_c, false, null);
            }

            //hlidani zmen pro InputChanged
            if (m_c is IGUserInput)
                ((IGUserInput)m_c).InputChanged += new EventHandler(WrapperControl_Changed);
            if (m_c is IGTypeEdit)
                ((IGTypeEdit)m_c).ValueChanged += new EventHandler(WrapperControl_Changed);
            m_c.TextChanged += new EventHandler(WrapperControl_Changed);

            if (m_c is IGKeyValuesControl)
                ((IGKeyValuesControl)m_c).LeaveInvalid = true; //vypneme vychozi validace -> udelam je sam
        }

        void WrapperControl_Changed(object sender, EventArgs e)
        {
            InputChanged?.Invoke(sender, e);
        }

        public event EventHandler InputChanged;

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
        /// Pozice obsahu uvnitř ovladače
        /// </summary>
        public System.Drawing.RectangleF ContentBounds
        {
            get { return System.Drawing.RectangleF.Empty;/* (m_c as GLabeledTextBox).EditRect;*/ }
            set
            {
                /*var lb = m_c as GLabeledTextBox;
                if (lb != null)
                {
                    var p = Point.Ceiling(value.Location);
                    lb.EditHorizontalOffset = p.X - Left - lb.BorderSize - 1;
                    lb.EditVerticalOffset = p.Y - Top - lb.BorderSize - 1;
                }*/
            }
        }

        /// <summary>
        /// Mapování vlastností
        /// </summary>
        public string Mapping { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Init
        {
            set
            {
                foreach (var m in value.Split(','))
                {
                    var map = m.Split('=');
                    if (map.Length != 2) continue;
                    var key = map[0];
                    var p = m_t.GetProperty(key);
                    var tc = System.ComponentModel.TypeDescriptor.GetConverter(p.PropertyType);
                    var val = tc.ConvertFromString(map[1]);
                    p.SetValue(m_c, val, null);                    
                }
            }
        }

        /// <summary>
        /// 
        /// </summary>
        public HorizontalAlignment TextAlign
        {
            get
            {
                if (m_c is GLabeledTextBox lb)
                    return lb.TextAlign;
                return HorizontalAlignment.Left;
            }
            set
            {
                if (m_c is TextBox lb)
                    lb.TextAlign = value;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        public BorderStyle BorderStyle
        {
            get
            {
                if (m_c is GLabeledTextBox lb)
                    return lb.BorderStyle;
                return System.Windows.Forms.BorderStyle.None;
            }
            set
            {
                if (m_c is TextBoxBase lb)
                    lb.BorderStyle = value;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        public float ZoomFactor { get; set; }
        void IEditControl.Focus() { m_c.Focus(); }
        /// <summary>
        /// 
        /// </summary>
        public bool Multiline
        {
            get { return false; }
            set { }
        }


        public bool IsDirty { get; set; }
        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        /// <param name="disposing"></param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && m_c != null)
                m_c.Dispose();
            base.Dispose(disposing);
        }
        public bool RefreshText()
        {
            if (IsDirty && DataItem != null)
            {
                if (m_c is IGKeyValuesControl)
                {
                    if (((IGKeyValuesControl)m_c).ValidateData() == false) return false;
                }
                else if (m_c is GLabeledTextBox)
                    if (((GLabeledTextBox)m_c).RunValidation() == false) return false;
                DataItem.UpdateContent(m_c.Text);

                //pripadne dalsi pres Mapping
                if (string.IsNullOrEmpty(Mapping) == false)
                    foreach (var m in Mapping.Split(','))
                    {
                        var map = m.Split(':');
                        if (map.Length != 2) continue;
                        var key = map[0];
                        object val = null;
                        //if (valid)
                        {
                            System.Reflection.PropertyInfo p = null;
                            object c = m_c;
                            foreach (var pn in map[1].Split('.'))
                            {
                                if (c == null) break;
                                var t = p == null ? m_t : p.PropertyType;
                                p = t.GetProperty(pn);
                                c = p.GetValue(c, null);
                            }
                            if (c != null)
                            {
                                if (c is Gordic.General.IGDbType)
                                    val = ((Gordic.General.IGDbType)c).DbValue;
                                else
                                    val = c;
                            }
                        }
                        DataItem.UpdateContent(key, val);
                    }
            }
            OnTextRefreshed();
            return true;
        }

        private void OnTextRefreshed()
        {
            TextRefreshed?.Invoke(this, EventArgs.Empty);
        }

    }
}
