//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GCustomDialogBuilder.cs             </Name>
//    <Description> Pomocna trida pro nacteni a prevod ovl. prvku ze sestavy do LK</Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2017                            </Copyright>
//    <Created>     2016-04-01                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.Report.Interface;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using static Gordic.Report.CustomDialogs.GSesCheckedListBoxControl;

namespace Gordic.Report.CustomDialogs
{
    /// <summary>Pomocna trida pro nacteni a prevod ovl. prvku ze sestavy do LK</summary>
    [System.Security.SecurityCritical]
    public class GCustomDialogBuilder : IGReportCustomDialog
    {
        /// <summary>Vsechny posbirane ovl. prvky nezarazene do radku</summary>
        protected List<GSesControl> m_oSesControls = new List<GSesControl>();
        private Dictionary<string, object> m_oComponentState = new Dictionary<string, object>();

        /// <summary>Prefix pro hodnotu cilenou pro GDate</summary>
        public const string GDATE_FIELD_PREFIX = "#d/";

        public GCustomDialogBuilder(string caption, Point location, Size size, IDictionary properties = null)
        {
            Caption = caption;
            Location = location;
            Size = size;
            Props = new Dictionary<string, object>();

            if (properties == null) return;

            foreach (var key in properties.Keys)
            {
                var strKey = key.ToString();
                Props.Add(strKey, properties[key]);
            }
        }

        public string DialogType { [System.Security.SecurityCritical] get; [System.Security.SecurityCritical] set; }

        #region IGReportCustomDialog

        public string Caption { [System.Security.SecurityCritical] get; [System.Security.SecurityCritical] set; }
        public Point Location { [System.Security.SecurityCritical] get; [System.Security.SecurityCritical] set; }
        public Size Size { [System.Security.SecurityCritical] get; [System.Security.SecurityCritical] set; }
        public GUserDlgStyle Style { [System.Security.SecurityCritical] get; [System.Security.SecurityCritical] set; }
        public Dictionary<string, object> Props { get; set; }
        public IDictionary ComponentState
        {
            [System.Security.SecurityCritical]
            get { return m_oComponentState; }
        }

        [System.Security.SecurityCritical]
        public void InsertCheckBox(Point location, Size size, string caption, string name, bool value, IDictionary properties)
        {
            var ctl = new GSesCheckBoxControl
            {
                Name = name,
                CollProps = properties,
                Location = location,
                Size = size,
                Value = value,
                Caption = caption
            };

            m_oSesControls.Add(ctl);
        }

        [System.Security.SecurityCritical]
        public void InsertDateEdit(Point location, Size size, string name, DateTime Value, IDictionary properties)
        {
            var ctl = new GSesDateEditControl
            {
                Name = GDATE_FIELD_PREFIX + name,
                CollProps = properties,
                Location = location,
                Size = size
            };
            //if (properties.Contains("DATEEMPTY"))
            //{
            //    if (!(bool)(properties["DATEEMPTY"]))
            //        ctl.Value = Value;
            //}
            //else
            ctl.Value = Value;
            m_oSesControls.Add(ctl);
        }

        [System.Security.SecurityCritical]
        public void InsertEdit(Point location, Size size, int maxLength, string name, string Value, IDictionary properties)
        {
            var ctl = new GSesEditControl
            {
                Name = name,
                CollProps = properties,
                Location = location,
                Size = size,
                Value = Value,
                MaxLength = maxLength,
            };

            m_oSesControls.Add(ctl);
        }

        [System.Security.SecurityCritical]
        public void InsertLabel(Point location, Size size, string caption, string name, IDictionary properties)
        {
            var ctl = new GSesLabelControl
            {
                Name = name,
                CollProps = properties,
                Location = location,
                Size = size,
                Caption = caption
            };

            m_oSesControls.Add(ctl);
        }

        [System.Security.SecurityCritical]
        public void InsertMemo(Point location, Size size, string name, string value, IDictionary properties)
        {
            var ctl = new GSesMemoControl
            {
                Name = name,
                CollProps = properties,
                Location = location,
                Size = size,
                Value = value
            };

            m_oSesControls.Add(ctl);
        }

        [System.Security.SecurityCritical]
        public void InsertNumEdit(Point location, Size size, int maxLength, decimal minValue, decimal maxValue, int decimals, string name, decimal value, IDictionary properties)
        {
            var ctl = new GSesNumEditControl
            {
                Name = name,
                CollProps = properties,
                Location = location,
                Size = size,
                Value = GDecimal.Floor(value, decimals), //oriznuti cisla na patricny pocet desetinnych mist (orizne Precision)
                MaxLenght = maxLength,
                MinValue = minValue,
                MaxValue = maxValue,
                Decimals = decimals
            };

            m_oSesControls.Add(ctl);
        }

        [System.Security.SecurityCritical]
        public IGReportListBox InsertListBox(Point location, Size size, string name, IDictionary properties)
        {
            var ctl = new GSesListBoxControl
            {
                Name = name,
                CollProps = properties,
                Location = location,
                Size = size,
                SelectedIndex = -1
            };

            m_oSesControls.Add(ctl);

            return ctl;
        }

        [System.Security.SecurityCritical]
        public IGReportCheckedListBox InsertCheckedListBox(Point location, Size size, string name, GCheckListStyle style, string checks, IDictionary properties)
        {
            var field = new GSesCheckedListBoxControl
            {
                Name = name,
                CollProps = properties,
                Location = location,
                Size = size,
                Style = style,
                Checks = checks
            };

            m_oSesControls.Add(field);

            return field;
        }

        [System.Security.SecurityCritical]
        public IGReportComboBox InsertComboBox(Point location, Size size, string name, IDictionary properties)
        {
            var field = new GSesComboBoxControl
            {
                Name = name,
                CollProps = properties,
                Location = location,
                Size = size,
                SelectedIndex = -1, //default
                //Props = properties
            };

            m_oSesControls.Add(field);

            return field;
        }
        //public IGReportComboBox InsertComboBox(Point location, Size size, string name, IList items, IDictionary properties)
        //{
        //    var field = new GSesComboBoxControl
        //    {
        //        Name = name,
        //        CollProps = properties,
        //        Location = location,
        //        Size = size,
        //        SelectedIndex = -1, //default
        //    };

        //    foreach (var item in items)
        //        field.Items.Add(item);

        //    m_oSesControls.Add(field);

        //    return field;
        //}
        #endregion
        [System.Security.SecurityCritical]
        public virtual GDialogResult ShowDialog()
        {
            //var fields = new List<GFieldDto>();
            //foreach (var c in m_oSesControls)
            //{
            //    fields.Add(c.ToDto());
            //}
            //var l_dialogContent = Newtonsoft.Json.JsonConvert.SerializeObject(fields);

            //var l_dialogContent = Newtonsoft.Json.JsonConvert.SerializeObject(this);

            //System.Text.StringBuilder l_dialogContent = new System.Text.StringBuilder();
            //l_dialogContent.AppendLine(c.ToDto());

            //throw new GReportWebDialogException(21000126, Caption, Size.Width, Size.Height, NewDialog(), l_dialogContent.ToString());
            throw new GReportWebDialogException(21000126, Caption, Size.Width, Size.Height, this);
        }
        //protected virtual string NewDialog()
        //{
        //    return System.Guid.NewGuid().ToString();
        //}

        //public static GCustomDialogBuilder Deserialize(string json)
        //{
        //    //var fields = Newtonsoft.Json.JsonConvert.DeserializeObject<List<GFieldDto>>(json);
        //    return Newtonsoft.Json.JsonConvert.DeserializeObject<GCustomDialogBuilder>(json);
        //}
        [System.Security.SecurityCritical]
        public GDialogResult ReplayTo(IGReportCustomDialog d)
        {
            d.Caption = Caption;
            d.Location = Location;
            d.Size = Size;
            d.Style = Style;
            //d.ComponentState.Add = ComponentState;

            foreach (var s in m_oSesControls)
            {
                var s0 = s as GSesCheckBoxControl;
                if (s0 != null)
                {
                    d.InsertCheckBox(s.Location, s.Size, s0.Caption, s.Name, s0.Value, s.Props);
                    continue;
                }
                var s1 = s as GSesDateEditControl;
                if (s1 != null)
                {
                    d.InsertDateEdit(s.Location, s.Size, s.Name, s1.Value, s.Props);
                    continue;
                }
                var s4 = s as GSesMemoControl;
                if (s4 != null)
                {
                    d.InsertMemo(s.Location, s.Size, s.Name, s4.Value, s.Props);
                    continue;
                }
                var s2 = s as GSesEditControl;
                if (s2 != null)
                {
                    d.InsertEdit(s.Location, s.Size, s2.MaxLength, s.Name, s2.Value, s.Props);
                    continue;
                }
                var s3 = s as GSesLabelControl;
                if (s3 != null)
                {
                    d.InsertLabel(s.Location, s.Size, s3.Caption, s.Name, s.Props);
                    continue;
                }
                var s5 = s as GSesNumEditControl;
                if (s5 != null)
                {
                    d.InsertNumEdit(s.Location, s.Size, s5.MaxLenght, s5.MinValue, s5.MaxValue, s5.Decimals, s.Name, s5.Value, s.Props);
                    continue;
                }
                var s6 = s as GSesListBoxControl;
                if (s6 != null)
                {
                    var l = d.InsertListBox(s.Location, s.Size, s.Name, s.Props);
                    if (s6.SelectedIndex != -1)
                        l.SelectedIndex = s6.SelectedIndex;
                    foreach (var s6i in s6.Items)
                        l.Items.Add(s6i);
                    continue;
                }
                var s7 = s as GSesCheckedListBoxControl;
                if (s7 != null)
                {
                    var l = d.InsertCheckedListBox(s.Location, s.Size, s.Name, s7.Style, s7.Checks, s.Props);
                    foreach (GSesCheckedListBoxControl.GCheckListOption s7i in s7.Items)
                        l.AddItem(s7i.Value, s7i.HiddenValue, s7i.Check);
                    continue;
                }
                var s8 = s as GSesComboBoxControl;
                if (s8 != null)
                {
                    var l = d.InsertComboBox(s.Location, s.Size, s.Name, s.Props);
                    if (s8.SelectedIndex != -1)
                        l.SelectedIndex = s8.SelectedIndex;
                    foreach (var s8i in s8.Items)
                        l.Items.Add(s8i);
                    continue;
                }
            }
            return d.ShowDialog();
        }

        [System.Security.SecurityCritical]
        public Dictionary<string, object> ReplayToVals(IGReportCustomDialog d)
        {
            var vals = new Dictionary<string, object>(this.ComponentState.Count + 1);
            vals.Add("@R", ReplayTo(d));
            foreach (DictionaryEntry cs in d.ComponentState)
            {
                vals.Add(cs.Key.ToString(), cs.Value);
            }
            return vals;
        }

        public GCustomDialogDto GetDialogDto()
        {
            var dialog = new GCustomDialogDto();

            dialog.Title = Caption;
            dialog.DialogType = DialogType;
            dialog.PosX = Location.X;
            dialog.PosY = Location.Y;
            dialog.Width = Size.Width;
            dialog.Height = Size.Height;

            if (Props != null)
            {
                //NOTE (BM): Spravne by tam asi mely byt vsechny property, ale z bezpecnostnich duvodu tam dame jen podporovane.
                if (Props.ContainsKey("LKLAYOUTDESCRIPTOR"))
                    dialog.Props.Add("LKLAYOUTDESCRIPTOR", Props["LKLAYOUTDESCRIPTOR"].ToString());
                if (Props.ContainsKey("LKDIALOGID"))
                    dialog.Id = Props["LKDIALOGID"].ToString();
            }

            foreach (var ctl in m_oSesControls)
            {
                if (ctl is GSesLabelControl l)
                {
                    dialog.Controls.Add(new GCustomDialogLabelDto
                    {
                        Name = l.Name,
                        Top = l.Location.Y,
                        Left = l.Location.X,
                        Height = l.Size.Height,
                        Width = l.Size.Width,
                        Caption = l.Caption,
                        Props = l.Props //LKISSECTION, LKISFORMTEXT, ALIGNMENT
                    });
                }
                else if (ctl is GSesCheckBoxControl c)
                {
                    dialog.Controls.Add(new GCustomDialogCheckBoxDto
                    {
                        Name = c.Name,
                        Caption = c.Caption,
                        Top = c.Location.Y,
                        Left = c.Location.X,
                        Height = c.Size.Height,
                        Width = c.Size.Width,
                        Value = c.Value,
                        Props = c.Props
                    });
                }
                else if (ctl is GSesDateEditControl d)
                {
                    dialog.Controls.Add(new GCustomDialogDateBoxDto
                    {
                        Name = d.Name,
                        Top = d.Location.Y,
                        Left = d.Location.X,
                        Height = d.Size.Height,
                        Width = d.Size.Width,
                        Value = d.Value,
                        Props = d.Props //DATEEMPTY
                    });
                }
                else if (ctl is GSesMemoControl m)
                {
                    dialog.Controls.Add(new GCustomDialogMemoDto
                    {
                        Name = m.Name,
                        Top = m.Location.Y,
                        Left = m.Location.X,
                        Height = m.Size.Height,
                        Width = m.Size.Width,
                        Value = m.Value,
                        Props = m.Props
                    });
                }
                else if (ctl is GSesEditControl e)
                {
                    dialog.Controls.Add(new GCustomDialogEditBoxDto
                    {
                        Name = e.Name,
                        Top = e.Location.Y,
                        Left = e.Location.X,
                        Height = e.Size.Height,
                        Width = e.Size.Width,
                        Value = e.Value,
                        Props = e.Props,
                        MaxLength = e.MaxLength
                    });
                }
                else if (ctl is GSesNumEditControl n)
                {
                    dialog.Controls.Add(new GCustomDialogNumberBoxDto
                    {
                        Name = n.Name,
                        Top = n.Location.Y,
                        Left = n.Location.X,
                        Height = n.Size.Height,
                        Width = n.Size.Width,
                        Value = GDecimal.Floor(n.Value, n.Decimals), //oriznuti cisla na patricny pocet desetinnych mist (orizne Precision)
                        MaxLength = n.MaxLenght,
                        MinValue = n.MinValue,
                        MaxValue = n.MaxValue,
                        Decimals = n.Decimals,
                        Props = n.Props
                    });
                }
                else if (ctl is GSesCheckedListBoxControl cl)
                {
                    dialog.Controls.Add(new GCustomDialogListBoxDto
                    {
                        Name = cl.Name,
                        Top = cl.Location.Y,
                        Left = cl.Location.X,
                        Height = cl.Size.Height,
                        Width = cl.Size.Width,
                        Style = (int)cl.Style,
                        Checks = cl.Checks,
                        Props = cl.Props,
                        Items = cl.Items.Cast<GCheckListOption>()
                            .Select(o =>
                            {
                                return new GCustomDialogSelectOptionDto
                                {
                                    Check = o.Check,
                                    Text = o.Value,
                                    Value = o.HiddenValue
                                };
                            })
                            .ToList()
                    });
                }
                else if (ctl is GSesComboBoxControl cb)
                {
                    var returnIndex = cb.Props != null && cb.Props.ContainsKey("RETURNINDEX") ? Convert.ToBoolean(cb.Props["RETURNINDEX"]) : false;
                    dialog.Controls.Add(new GCustomDialogComboBoxDto
                    {
                        Name = cb.Name,
                        Top = cb.Location.Y,
                        Left = cb.Location.X,
                        Height = cb.Size.Height,
                        Width = cb.Size.Width,
                        SelectedIndex = cb.SelectedIndex,
                        ReturnIndex = returnIndex,
                        Props = cb.Props,
                        Items = cb.Items.Cast<string>()
                            .Select(o =>
                            {
                                return new GCustomDialogSelectOptionDto { Text = o, Value = o };
                            })
                            .ToList()
                    });
                }
                else if (ctl is GSesListBoxControl lb)
                {
                    dialog.Controls.Add(new GCustomDialogListBoxDto
                    {
                        Name = lb.Name,
                        Top = lb.Location.Y,
                        Left = lb.Location.X,
                        Height = lb.Size.Height,
                        Width = lb.Size.Width,
                        SelectedIndex = lb.SelectedIndex,
                        Props = lb.Props,
                        Items = lb.Items.Cast<string>()
                            .Select(o =>
                            {
                                return new GCustomDialogSelectOptionDto { Text = o, Value = o };
                            })
                            .ToList()
                    });
                }
                else throw new NotImplementedException(); //Pro sichr, ze bych na nekterou zapomnel
            }

            return dialog;
        }
    }
}