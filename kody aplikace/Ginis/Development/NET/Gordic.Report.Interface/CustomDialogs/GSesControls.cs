//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GSesControls.cs                     </Name>
//    <Description> Ovladaci prvek sestavy (obecne)                             </Description>
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
using System.Web;

namespace Gordic.Report.CustomDialogs
{
    /// <summary>Ovladaci prvek sestavy (obecne)</summary>
    [System.Security.SecurityCritical]
    public abstract class GSesControl : IGObject
    {
        public Point Location { get; set; }
        public Size Size { get; set; }
        public string Name { get; set; }
        public Dictionary<string, object> Props { get; set; }
        public IDictionary CollProps
        {
            set
            {
                Props = new Dictionary<string, object>();

                if (value == null)
                    return;

                foreach (var key in value.Keys)
                {
                    var strKey = key.ToString();
                    //#region Optimize

                    //if (string.Compare(strKey, "ALIGMENT", true) == 0)
                    //    continue;

                    //if (string.Compare(strKey, "fontname", true) == 0)
                    //    continue;

                    //#endregion
                    Props.Add(strKey, value[key]);
                }
            }
        }
    }

    [System.Security.SecurityCritical]
    internal class GSesLabelControl : GSesControl
    {
        public string Caption { get; set; }
    }

    [System.Security.SecurityCritical]
    internal abstract class GSesInputControl : GSesControl
    { }

    [System.Security.SecurityCritical]
    internal abstract class GSesInputControl<T> : GSesInputControl
    {
        public T Value { get; set; }
    }

    [System.Security.SecurityCritical]
    internal class GSesCheckBoxControl : GSesInputControl<bool>
    {
        public string Caption { get; set; }
        public string HiddenValue { get; set; }
    }

    [System.Security.SecurityCritical]
    internal class GSesDateEditControl : GSesInputControl<DateTime>
    {
    }

    [System.Security.SecurityCritical]
    internal class GSesEditControl : GSesInputControl<string>
    {
        public int MaxLength { get; set; }
    }

    [System.Security.SecurityCritical]
    internal class GSesMemoControl : GSesEditControl
    {
    }

    [System.Security.SecurityCritical]
    internal class GSesNumEditControl : GSesInputControl<decimal>
    {
        public int MaxLenght { get; set; }
        public decimal MinValue { get; set; }
        public decimal MaxValue { get; set; }
        public int Decimals { get; set; }
    }

    [System.Security.SecurityCritical]
    internal class GSesCheckedListBoxControl : GSesControl, IGReportCheckedListBox
    {
        public string Checks { get; set; }

        public string CheckedItems { [System.Security.SecurityCritical]get; set; }

        public GCheckListStyle Style { [System.Security.SecurityCritical]get; set; }

        private List<GCheckListOption> m_oItems = new List<GCheckListOption>();

        public class GCheckListOption
        {
            public string Value { get; set; }
            public string HiddenValue { get; set; }
            public string Check { get; set; }
        }

        [System.Security.SecurityCritical]
        public void AddItem(string value, string hiddenValue, string check)
        {
            m_oItems.Add(new GCheckListOption
            {
                Value = value,
                HiddenValue = hiddenValue,
                Check = check
            });
        }
        
        public IList Items
        {
            [System.Security.SecurityCritical]
            get { return m_oItems as IList; }
        }
    }

    [System.Security.SecurityCritical]
    internal class GSesComboBoxControl : GSesControl, IGReportComboBox
    {
        private List<string> m_oItems = new List<string>();
        public IList Items
        {
            [System.Security.SecurityCritical]
            get { return m_oItems; }
        }

        public int SelectedIndex { [System.Security.SecurityCritical]get; [System.Security.SecurityCritical]set; }
    }

    [System.Security.SecurityCritical]
    internal class GSesListBoxControl : GSesControl, IGReportListBox
    {
        private List<string> m_oItems = new List<string>();
        public IList Items
        {
            [System.Security.SecurityCritical]
            get { return m_oItems; }
        }

        public int SelectedIndex { [System.Security.SecurityCritical]get; [System.Security.SecurityCritical]set; }
    }
}
