//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ExternalToolPanel.cs                   </Name>
//    <Description> nástavení externích nástrojů                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-05                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.General;

namespace Gordic.GFE.WinClient.External
{
    /// <summary>
    /// nástavení externích nástrojů
    /// </summary>
    class ToolExternalToolPanel : AbstractOptionPanel
    {
        static string[,] argumentQuickInsertMenu = new string[,] {
			{GResources.GetResourceText(29450515), "${ItemPath}"}, //RC 29450515 : položka cesta
			{GResources.GetResourceText(29450516), "${ItemDir}"}, //RC 29450516 : položka složka
			{GResources.GetResourceText(29450517), "${ItemFileName}"}, //RC 29450517 : položka název souboru
			{GResources.GetResourceText(29450518), "${ItemExt}"}, //RC 29450518 : položka koncovka souboru
			{"-", ""},
			{GResources.GetResourceText(29450519), "${CurLine}"}, //RC 29450519 : aktuální řádek
			{GResources.GetResourceText(29450520), "${CurCol}"}, //RC 29450520 : aktuální sloupec
			{GResources.GetResourceText(29450521), "${CurText}"}, //RC 29450521 : aktuální text
			{"-", ""},
			{GResources.GetResourceText(29450522), "${ProjectDir}"}, //RC 29450522 : projekt složka
			{GResources.GetResourceText(29450523), "${ProjectFileName}"}, //RC 29450523 : projekt název
			{"-", ""},
            {GResources.GetResourceText(29450524), "${SolutionPath}"}, //RC 29450524 : sestavení cesta
			{GResources.GetResourceText(29450525), "${SolutionDir}"}, //RC 29450525 : sestavení složka
			{GResources.GetResourceText(29450526),  "${SolutionFileName}"}, //RC 29450526 : sestavení název
			{"-", ""},
			{GResources.GetResourceText(29450527), "${StartupPath}"}, //RC 29450527 : složka aplikace
		};

        static string[,] workingDirInsertMenu = new string[,] {
			{GResources.GetResourceText(29450528), "${ItemDir}"}, //RC 29450528 : složka položky
			{"-", ""},
			{GResources.GetResourceText(29450529), "${ProjectDir}"}, //RC 29450529 : složka projektu
			{"-", ""},
			{GResources.GetResourceText(29450530), "${SolutionDir}"}, //RC 29450530 : složka sestavení
			{"-", ""},
			{GResources.GetResourceText(29450527), "${StartupPath}"}, //RC 29450527 : složka aplikace
		};

        // to jsou názvy ovládačů, které jsou povoleny/zakázány podle toho, zda je vybraný nástroj
        static string[] dependendControlNames = new string[] {
			"titleTextBox", "commandTextBox", "argumentTextBox",
			"workingDirTextBox",
			"titleLabel", "argumentLabel", "commandLabel",
			"workingDirLabel", "browseButton", "argumentQuickInsertButton",
			"workingDirQuickInsertButton", "moveUpButton", "moveDownButton"
		};

        string ExecutableFilesFilter = GResources.GetResourceText(29450513) + "|*.exe;*.com;*.pif;*.bat;*.cmd|" + GResources.GetResourceText(29450514) + "|*.*"; //RC 29450514 : všechny soubory

        /// <summary>
        /// načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.ToolExternalToolPanel.xfrm");

            ((ListBox)ControlDictionary["toolListBox"]).BeginUpdate();
            try
            {
                foreach (object o in ToolLoader.Tool)
                    ((ListBox)ControlDictionary["toolListBox"]).Items.Add(o);
            }
            finally
            {
                ((ListBox)ControlDictionary["toolListBox"]).EndUpdate();
            }

            MenuService.CreateQuickInsertMenu((TextBox)ControlDictionary["argumentTextBox"],
                                              ControlDictionary["argumentQuickInsertButton"],
                                              argumentQuickInsertMenu);

            MenuService.CreateQuickInsertMenu((TextBox)ControlDictionary["workingDirTextBox"],
                                              ControlDictionary["workingDirQuickInsertButton"],
                                              workingDirInsertMenu, false);

            ((ListBox)ControlDictionary["toolListBox"]).SelectedIndexChanged += new EventHandler(selectEvent);
            ControlDictionary["removeButton"].Click += new EventHandler(removeEvent);
            ControlDictionary["addButton"].Click += new EventHandler(addEvent);
            ControlDictionary["moveUpButton"].Click += new EventHandler(moveUpEvent);
            ControlDictionary["moveDownButton"].Click += new EventHandler(moveDownEvent);
            ControlDictionary["browseButton"].Click += new EventHandler(browseEvent);

            selectEvent(this, EventArgs.Empty);
        }
        /// <summary>
        /// uložení obsahu panelu
        /// </summary>
        /// <returns>TRUE - obsah uožen</returns>
        public override bool StorePanelContents()
        {
            List<ExternalTool> newlist = new List<ExternalTool>();
            foreach (ExternalTool tool in ((ListBox)ControlDictionary["toolListBox"]).Items)
            {
                if (!FileUtility.IsValidPath(StringParser.Parse(tool.Command)))
                    if (!Regex.IsMatch(tool.Command, @"^\$\{SdkToolPath:[\w\d]+\.exe\}$"))
                    {
                        MessageService.ShowError(String.Format(GResources.GetResourceText(29450531) + " \"{0}\" " + GResources.GetResourceText(29450501), tool.MenuCommand)); //RC 29450531 : Příkaz nástroje
                        return false;
                    }
                if ((tool.InitialDirectory != String.Empty) && (!FileUtility.IsValidPath(tool.InitialDirectory)))
                {
                    MessageService.ShowError(String.Format(GResources.GetResourceText(29450533) + " \"{0}\" " + GResources.GetResourceText(29450532), tool.MenuCommand)); //RC 29450533 : Pracovní složka nástroje
                    return false;
                }
                newlist.Add(tool);
            }

            ToolLoader.Tool = newlist;
            ToolLoader.SaveTools();

            return true;
        }

        void browseEvent(object sender, EventArgs e)
        {
            using (OpenFileDialog fdiag = new OpenFileDialog())
            {
                fdiag.CheckFileExists = true;
                fdiag.Filter = StringParser.Parse(ExecutableFilesFilter);

                if (fdiag.ShowDialog(SimpleDesktop.MainForm) == DialogResult.OK)
                    ControlDictionary["commandTextBox"].Text = fdiag.FileName;
            }
        }
        void moveUpEvent(object sender, EventArgs e)
        {
            int index = ((ListBox)ControlDictionary["toolListBox"]).SelectedIndex;
            if (index > 0)
            {
                ((ListBox)ControlDictionary["toolListBox"]).SelectedIndexChanged -= new EventHandler(selectEvent);
                try
                {
                    object tmp = ((ListBox)ControlDictionary["toolListBox"]).Items[index - 1];
                    ((ListBox)ControlDictionary["toolListBox"]).Items[index - 1] = ((ListBox)ControlDictionary["toolListBox"]).Items[index];
                    ((ListBox)ControlDictionary["toolListBox"]).Items[index] = tmp;
                    ((ListBox)ControlDictionary["toolListBox"]).SetSelected(index, false);
                    ((ListBox)ControlDictionary["toolListBox"]).SetSelected(index - 1, true);
                }
                finally
                {
                    ((ListBox)ControlDictionary["toolListBox"]).SelectedIndexChanged += new EventHandler(selectEvent);
                }
            }

        }
        void moveDownEvent(object sender, EventArgs e)
        {
            int index = ((ListBox)ControlDictionary["toolListBox"]).SelectedIndex;
            if (index >= 0 && index < ((ListBox)ControlDictionary["toolListBox"]).Items.Count - 1)
            {
                ((ListBox)ControlDictionary["toolListBox"]).SelectedIndexChanged -= new EventHandler(selectEvent);
                try
                {
                    object tmp = ((ListBox)ControlDictionary["toolListBox"]).Items[index + 1];
                    ((ListBox)ControlDictionary["toolListBox"]).Items[index + 1] = ((ListBox)ControlDictionary["toolListBox"]).Items[index];
                    ((ListBox)ControlDictionary["toolListBox"]).Items[index] = tmp;
                    ((ListBox)ControlDictionary["toolListBox"]).SetSelected(index, false);
                    ((ListBox)ControlDictionary["toolListBox"]).SetSelected(index + 1, true);
                }
                finally
                {
                    ((ListBox)ControlDictionary["toolListBox"]).SelectedIndexChanged += new EventHandler(selectEvent);
                }
            }
        }
        void propertyValueChanged(object sender, PropertyValueChangedEventArgs e)
        {
            foreach (ListViewItem item in ((ListView)ControlDictionary["toolListView"]).Items)
                if (item.Tag != null)
                    item.Text = item.Tag.ToString();
        }
        void setToolValues(object sender, EventArgs e)
        {
            ExternalTool selectedItem = ((ListBox)ControlDictionary["toolListBox"]).SelectedItem as ExternalTool;

            selectedItem.MenuCommand = ControlDictionary["titleTextBox"].Text;
            selectedItem.Command = ControlDictionary["commandTextBox"].Text;
            selectedItem.Arguments = ControlDictionary["argumentTextBox"].Text;
            selectedItem.InitialDirectory = ControlDictionary["workingDirTextBox"].Text;
        }
        void selectEvent(object sender, EventArgs e)
        {
            SetEnabledStatus(((ListBox)ControlDictionary["toolListBox"]).SelectedItems.Count > 0, "removeButton");

            ControlDictionary["titleTextBox"].TextChanged -= new EventHandler(setToolValues);
            ControlDictionary["commandTextBox"].TextChanged -= new EventHandler(setToolValues);
            ControlDictionary["argumentTextBox"].TextChanged -= new EventHandler(setToolValues);
            ControlDictionary["workingDirTextBox"].TextChanged -= new EventHandler(setToolValues);

            if (((ListBox)ControlDictionary["toolListBox"]).SelectedItems.Count == 1)
            {
                ExternalTool selectedItem = ((ListBox)ControlDictionary["toolListBox"]).SelectedItem as ExternalTool;
                SetEnabledStatus(true, dependendControlNames);
                ControlDictionary["titleTextBox"].Text = selectedItem.MenuCommand;
                ControlDictionary["commandTextBox"].Text = selectedItem.Command;
                ControlDictionary["argumentTextBox"].Text = selectedItem.Arguments;
                ControlDictionary["workingDirTextBox"].Text = selectedItem.InitialDirectory;
            }
            else
            {
                SetEnabledStatus(false, dependendControlNames);

                ControlDictionary["titleTextBox"].Text = String.Empty;
                ControlDictionary["commandTextBox"].Text = String.Empty;
                ControlDictionary["argumentTextBox"].Text = String.Empty;
                ControlDictionary["workingDirTextBox"].Text = String.Empty;
            }

            ControlDictionary["titleTextBox"].TextChanged += new EventHandler(setToolValues);
            ControlDictionary["commandTextBox"].TextChanged += new EventHandler(setToolValues);
            ControlDictionary["argumentTextBox"].TextChanged += new EventHandler(setToolValues);
            ControlDictionary["workingDirTextBox"].TextChanged += new EventHandler(setToolValues);
        }
        void removeEvent(object sender, EventArgs e)
        {
            ((ListBox)ControlDictionary["toolListBox"]).BeginUpdate();
            try
            {
                int index = ((ListBox)ControlDictionary["toolListBox"]).SelectedIndex;
                object[] selectedItems = new object[((ListBox)ControlDictionary["toolListBox"]).SelectedItems.Count];
                ((ListBox)ControlDictionary["toolListBox"]).SelectedItems.CopyTo(selectedItems, 0);
                ((ListBox)ControlDictionary["toolListBox"]).SelectedIndexChanged -= new EventHandler(selectEvent);
                foreach (object item in selectedItems)
                    ((ListBox)ControlDictionary["toolListBox"]).Items.Remove(item);
                ((ListBox)ControlDictionary["toolListBox"]).SelectedIndexChanged += new EventHandler(selectEvent);
                if (((ListBox)ControlDictionary["toolListBox"]).Items.Count == 0)
                    selectEvent(this, EventArgs.Empty);
                else
                    ((ListBox)ControlDictionary["toolListBox"]).SelectedIndex = Math.Min(index, ((ListBox)ControlDictionary["toolListBox"]).Items.Count - 1);
            }
            finally
            {
                ((ListBox)ControlDictionary["toolListBox"]).EndUpdate();
            }
        }
        void addEvent(object sender, EventArgs e)
        {
            ((ListBox)ControlDictionary["toolListBox"]).BeginUpdate();
            try
            {
                ((ListBox)ControlDictionary["toolListBox"]).Items.Add(new ExternalTool());
                ((ListBox)ControlDictionary["toolListBox"]).SelectedIndexChanged -= new EventHandler(selectEvent);
                ((ListBox)ControlDictionary["toolListBox"]).ClearSelected();
                ((ListBox)ControlDictionary["toolListBox"]).SelectedIndexChanged += new EventHandler(selectEvent);
                ((ListBox)ControlDictionary["toolListBox"]).SelectedIndex = ((ListBox)ControlDictionary["toolListBox"]).Items.Count - 1;
            }
            finally
            {
                ((ListBox)ControlDictionary["toolListBox"]).EndUpdate();
            }
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // ToolExternalToolPanel
            // 
            this.Name = "ToolExternalToolPanel";
            this.ResumeLayout(false);

        }
    }

}
