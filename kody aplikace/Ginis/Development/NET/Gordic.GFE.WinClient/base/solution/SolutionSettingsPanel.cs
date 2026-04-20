//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SolutionSettingsPanel.cs               </Name>
//    <Description> panel nastavení sestavení                                   </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-06-06                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.External;
using System;
using System.Linq;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// panel nastavení sestavení
    /// </summary>
    class SolutionSettingsPanel : AbstractPropertyPanel
    {
        #region AbstractPropertyPanel
        /// <exclude/>
        public override object PropertyValue { get { return false; } }
        /// <exclude/>
        protected override void SetDefault() { throw new NotImplementedException(); }
        
        /// <summary>
        /// potvrzení akce
        /// </summary>
        /// <returns></returns>
        protected override bool Accept()
        {
            if (extTool != null)
                ProjectService.OpenSolution.Preferences.StartupTool = extTool;

            ProjectService.OpenSolution.Preferences.StartupByOS = ((CheckBox)ControlDictionary["osCheckBox"]).Checked;
            return true;
        }

        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".base.solution.SolutionSettingsPanel.xfrm");
            ((ListBox)ControlDictionary["toolListBox"]).BeginUpdate();
            try
            {
                foreach (object o in ToolLoader.Tool)
                    ((ListBox)ControlDictionary["toolListBox"]).Items.Add(o);
            }
            finally { ((ListBox)ControlDictionary["toolListBox"]).EndUpdate(); }

            MenuService.CreateQuickInsertMenu((TextBox)ControlDictionary["argumentTextBox"],
                                  ControlDictionary["argumentQuickInsertButton"],
                                  argumentQuickInsertMenu);

            ((ListBox)ControlDictionary["toolListBox"]).SelectedIndexChanged += new EventHandler(selectEvent);
            if (ProjectService.OpenSolution.Preferences.StartupTool != null)
            {
                ExternalTool tool = ToolLoader.Tool.FirstOrDefault(t => t.Command.Equals(ProjectService.OpenSolution.Preferences.StartupTool.Command));
                if (tool != null)
                    ((ListBox)ControlDictionary["toolListBox"]).SelectedItem = tool;
            }

            ((CheckBox)ControlDictionary["osCheckBox"]).CheckedChanged += ssp_CheckedChanged;
            ((CheckBox)ControlDictionary["osCheckBox"]).Checked = ProjectService.OpenSolution.Preferences.StartupByOS;
            
            selectEvent(this, EventArgs.Empty);
        }
        #endregion

        static string[,] argumentQuickInsertMenu = new string[,] {
			{GResources.GetResourceText(29450522), "${ProjectDir}"}, //RC 29450522 : projekt složka
			{GResources.GetResourceText(29450523), "${ProjectFileName}"}, //RC 29450523 : projekt název
			{"-", ""},
            {GResources.GetResourceText(29450524), "${SolutionPath}"}, //RC 29450524 : sestavení cesta
			{GResources.GetResourceText(29450525), "${SolutionDir}"}, //RC 29450525 : sestavení složka
			{GResources.GetResourceText(29450526),  "${SolutionFileName}"} //RC 29450526 : sestavení název
		};

        // to jsou názvy ovládačů, které jsou povoleny/zakázány podle toho, zda je vybraný nástroj
        static string[] dependendControlNames = new string[] { "argumentTextBox", "argumentLabel", "argumentQuickInsertButton" };
        // to jsou názvy ovládačů, které jsou povoleny/zakázány podle toho, zda je vybraný nástroj
        static string[] dependendOS = new string[] { "argumentTextBox", "argumentLabel", "argumentQuickInsertButton", "toolListBox" };

        ExternalTool extTool = null;

        void selectEvent(object sender, EventArgs e)
        {
            SetVisibleStatus(((ListBox)ControlDictionary["toolListBox"]).Items.Count > 0, "toolListBox");
            SetVisibleStatus(((ListBox)ControlDictionary["toolListBox"]).Items.Count == 0, "lblPanel");

            ControlDictionary["argumentTextBox"].TextChanged -= new EventHandler(setToolValues);

            if (((ListBox)ControlDictionary["toolListBox"]).SelectedItems.Count == 1)
            {
                SetEnabledStatus(true, dependendControlNames);

                if (ProjectService.OpenSolution.Preferences.StartupTool != null
                    && (((ListBox)ControlDictionary["toolListBox"]).SelectedItem as ExternalTool).Command == ProjectService.OpenSolution.Preferences.StartupTool.Command)
                    extTool = ProjectService.OpenSolution.Preferences.StartupTool;
                else 
                    extTool = ((ListBox)ControlDictionary["toolListBox"]).SelectedItem as ExternalTool;

                ControlDictionary["argumentTextBox"].Text = extTool.Arguments;
            }
            else
            {
                SetEnabledStatus(false, dependendControlNames);
                ControlDictionary["argumentTextBox"].Text = String.Empty;
            }
            ControlDictionary["argumentTextBox"].TextChanged += new EventHandler(setToolValues);
        }
        void setToolValues(object sender, EventArgs e)
        {
            if (ProjectService.OpenSolution.Preferences.StartupTool != null
                    && (((ListBox)ControlDictionary["toolListBox"]).SelectedItem as ExternalTool).Command == ProjectService.OpenSolution.Preferences.StartupTool.Command)
                extTool = ProjectService.OpenSolution.Preferences.StartupTool;
            else
                extTool = new ExternalTool(((ListBox)ControlDictionary["toolListBox"]).SelectedItem as ExternalTool);

            extTool.Arguments = ControlDictionary["argumentTextBox"].Text;
        }
        void ssp_CheckedChanged(object sender, EventArgs e)
        {
            bool check = ((CheckBox)ControlDictionary["osCheckBox"]).Checked;
            SetEnabledStatus(!check, dependendOS);
            if (check)
            {
                extTool = null;
                ((ListBox)ControlDictionary["toolListBox"]).SelectedItem = null;
            }
        }
    }
}
