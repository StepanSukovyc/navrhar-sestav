//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GeneralDisplayViewsPanel.cs            </Name>
//    <Description> panel nastavení zobrazení záložek pohledu                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-09-12                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;
using System;
using System.IO;
using System.Reflection;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.Dialogs.OptionPanels
{
    /// <summary>
    /// panel nastavení zobrazení záložek pohledu
    /// </summary>
    partial class GeneralDisplayViewsPanel : AbstractOptionPanel
    {
        /// <summary>
        /// načtené obsahu
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.general.GeneralDisplayViewsPanel.xfrm");
            //SetupFromXmlStream(asm.GetManifestResourceStream(AssemblyName + ".Resources.forms.options.general.GeneralDisplayViewsPanel.xfrm"));

            if (!ReportDesignerProperties.Instance.TabVisibilityCode
                && !ReportDesignerProperties.Instance.TabVisibilityDesign
                && !ReportDesignerProperties.Instance.TabVisibilityTree)
                ReportDesignerProperties.Instance.TabVisibilityCode = true;

            ((CheckBox)ControlDictionary["cbCodeView"]).Checked = ReportDesignerProperties.Instance.TabVisibilityCode;
            ((CheckBox)ControlDictionary["cbDesignView"]).Checked = ReportDesignerProperties.Instance.TabVisibilityDesign;
            ((CheckBox)ControlDictionary["cbTreeView"]).Checked = ReportDesignerProperties.Instance.TabVisibilityTree;

            SetValues();

            //switch (ReportDesignerProperties.Instance.TabDefaultViewIndex)
            switch (defIndex)
            {
                case 1:
                    ((RadioButton)ControlDictionary["rbDesignView"]).Checked = true;
                    break;
                case 2:
                    ((RadioButton)ControlDictionary["rbTreeView"]).Checked = true;
                    break;
                default:
                    ((RadioButton)ControlDictionary["rbCodeView"]).Checked = true;
                    break;
            }

            ((CheckBox)ControlDictionary["cbCodeView"]).CheckedChanged += checkedChanged;
            ((CheckBox)ControlDictionary["cbDesignView"]).CheckedChanged += checkedChanged;
            ((CheckBox)ControlDictionary["cbTreeView"]).CheckedChanged += checkedChanged;
        }
        int defIndex = 2;
        void SetValues()
        {
            if (ReportDesignerProperties.Instance.TabDefaultViewIndex == 0)
                if (!ReportDesignerProperties.Instance.TabVisibilityCode)
                    if (!ReportDesignerProperties.Instance.TabVisibilityDesign)
                        defIndex = 2;
                    else defIndex = 1;
                else defIndex = 0;

            if (ReportDesignerProperties.Instance.TabDefaultViewIndex == 1)
                if (ReportDesignerProperties.Instance.TabVisibilityCode)
                {
                    if (!ReportDesignerProperties.Instance.TabVisibilityDesign)
                        defIndex = 2;
                    else defIndex = 1;
                }
        }

        void checkedChanged(object sender, EventArgs e)
        {
            if (!((CheckBox)ControlDictionary["cbCodeView"]).Checked
                && !((CheckBox)ControlDictionary["cbDesignView"]).Checked
                && !((CheckBox)ControlDictionary["cbTreeView"]).Checked)
            {
                MessageService.ShowWarning(GResources.GetResourceText(29450459)); //RC 29450459 : Alespoň jeden z pohledů misí být viditelný!
                ((CheckBox)ControlDictionary["cbCodeView"]).Checked = true;
            }
        }

        /// <summary>
        /// Uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public override bool StorePanelContents()
        {
            ReportDesignerProperties.Instance.TabVisibilityCode = ((CheckBox)ControlDictionary["cbCodeView"]).Checked;
            ReportDesignerProperties.Instance.TabVisibilityDesign = ((CheckBox)ControlDictionary["cbDesignView"]).Checked;
            ReportDesignerProperties.Instance.TabVisibilityTree = ((CheckBox)ControlDictionary["cbTreeView"]).Checked;
            int index = -1;
            if (((RadioButton)ControlDictionary["rbDesignView"]).Checked)
            {
                if (!ReportDesignerProperties.Instance.TabVisibilityDesign)
                {
                    MessageService.ShowWarning(GResources.GetResourceText(29450461) + '\n' + GResources.GetResourceText(29450460)); //RC 29450461 : Návrh není viditelným pohledem.
                    index = 0;
                }
                else if (ReportDesignerProperties.Instance.TabVisibilityCode)
                    index = 1;
                else index = 0;
            }
            else if (((RadioButton)ControlDictionary["rbTreeView"]).Checked)
            {
                if (!ReportDesignerProperties.Instance.TabVisibilityTree)
                {
                    MessageService.ShowWarning(GResources.GetResourceText(29450462) + '\n' + GResources.GetResourceText(29450460)); //RC 29450462 : Stromový pohled není viditelným pohledem.
                    index = 0;
                }
                else if (ReportDesignerProperties.Instance.TabVisibilityCode)
                    if (ReportDesignerProperties.Instance.TabVisibilityDesign)
                        index = 2;
                    else
                        index = 1;
                else index = 0;
            }
            else if (!ReportDesignerProperties.Instance.TabVisibilityCode)
            {
                MessageService.ShowWarning(GResources.GetResourceText(29450463) + '\n' + GResources.GetResourceText(29450460)); //RC 29450463 : Zdrojový kód není viditelným pohledem.
                index = 1;
            }
            else index = 0;

            ReportDesignerProperties.Instance.TabDefaultViewIndex = index;
            return true;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // GeneralDisplayViewsPanel
            // 
            this.Name = "GeneralDisplayViewsPanel";
            this.ResumeLayout(false);

        }
    }
}
