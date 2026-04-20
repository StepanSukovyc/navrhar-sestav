//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.StructureViewCommands.cs               </Name>
//    <Description> příkazy datové struktury                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-03                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;

namespace Gordic.GFE.WinClient.StructureView
{
    /// <summary>
    /// Příkaz otevření datové struktury
    /// </summary>
    class OpenStructure : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu Open
        /// </summary>
        public override void Run()
        {
            OnOpen(this.Owner, new EventArgs());
        }

        /// <summary>
        /// Otevření souboru datové struktury
        /// </summary>
        /// <param name="sender">vlastník příkazu</param>
        /// <param name="args">argumenty příkazu</param>
        public static void OnOpen(object sender, EventArgs args)
        {
            using (OpenFileDialog l_oVyberSoubor = new OpenFileDialog())
            {
                // nastavení filtru hledání souboru
                string[] fileFilters = (string[])(AddInTree.GetTreeNode("/ReportDesigner/Desktop/OpenStructureFilter").BuildChildItems(null)).ToArray(typeof(string));
                l_oVyberSoubor.Filter = String.Join("|", fileFilters);
                l_oVyberSoubor.CheckFileExists = true;

                if (l_oVyberSoubor.ShowDialog(SimpleDesktop.MainForm) == DialogResult.OK)
                    if (!string.IsNullOrEmpty(l_oVyberSoubor.FileName))
                    {
                        PadDescriptor pd = SimpleDesktop.Desktop.GetPad(typeof(StructureViewPad));
                        if (pd != null)
                        {
                            pd.BringPadToFront(SimpleDesktop.Desktop.DesktopLayout);
                            StructureViewPad.Instance.SetOrCreateItem(l_oVyberSoubor.FileName);
                        }
                    }
            }
        }
    }

    /// <summary>
    /// Aktualizace struktury ze souboru nebo z pole dat
    /// </summary>
    class RefreshStructure : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu Open
        /// </summary>
        public override void Run()
        {
            OnRefreshStructure(this.Owner, new EventArgs());
        }

        /// <summary>
        /// Otevření souboru datové struktury
        /// </summary>
        /// <param name="sender">vlastník příkazu</param>
        /// <param name="args">argumenty příkazu</param>
        public static void OnRefreshStructure(object sender, EventArgs args)
        {
            PadDescriptor pd = SimpleDesktop.Desktop.GetPad(typeof(StructureViewPad));
            if (pd != null)
            {
                pd.BringPadToFront(SimpleDesktop.Desktop.DesktopLayout);
                StructureViewPad.Instance.RefreshItem();
            }
        }
    }

    /// <summary>
    /// editace struktury
    /// </summary>
    class EditStructure : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu Open
        /// </summary>
        public override void Run()
        {
            if (StructureViewPad.Instance.ActiveItem != null)
                if (!string.IsNullOrEmpty(StructureViewPad.Instance.ActiveItem.FileName))
                    FileAgent.OpenFile(StructureViewPad.Instance.ActiveItem.FileName);
        }

    }

    /// <summary>
    /// Odstranění struktury ze seznamu otevřených struktur
    /// </summary>
    class RemoveStructure : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu Open
        /// </summary>
        public override void Run()
        {
            if (StructureViewPad.Instance.ActiveItem != null)
                StructureViewPad.Instance.RemoveActive();
        }

    }
    /// <summary>
    /// seznam otevřených datových struktur, 
    /// pomocí kterého se lze přepínat mezí datovými strukturami
    /// </summary>
    class ShowStructureComboBox : AbstractComboBoxCommand
    {
        ComboBox comboBox;

        /// <summary>
        /// Změna vlastníka
        /// </summary>
        /// <param name="e"></param>
        protected override void OnOwnerChanged(EventArgs e)
        {
            base.OnOwnerChanged(e);
            ToolBarComboBox toolbarItem = (ToolBarComboBox)Owner;
            comboBox = toolbarItem.ComboBox;
            SetItems();
            StructureViewPad.Instance.ItemAdded += new EventHandler(StructureAdded);
            StructureViewPad.Instance.ItemRemoved += new EventHandler(StructureAdded);
            StructureViewPad.Instance.SelectedItemIndexChanged += new EventHandler(SelectedStructureIndexChanged);
            if (comboBox.Items.Count > 0)
                comboBox.SelectedIndex = 0;
            comboBox.SelectedIndexChanged += new EventHandler(ComboBoxSelectedIndexChanged);
        }

        void ComboBoxSelectedIndexChanged(object sender, EventArgs e)
        {
            if (comboBox.SelectedIndex != StructureViewPad.Instance.SelectedIndex)
                StructureViewPad.Instance.SelectedIndex = comboBox.SelectedIndex;
        }

        void SelectedStructureIndexChanged(object sender, EventArgs e)
        {
            if (comboBox.SelectedIndex != StructureViewPad.Instance.SelectedIndex)
                comboBox.SelectedIndex = StructureViewPad.Instance.SelectedIndex;
        }
        void StructureAdded(object sender, EventArgs e)
        {
            SetItems();
        }
        void SetItems()
        {
            comboBox.Items.Clear();
            foreach (StructureViewEntry entry in StructureViewPad.Instance.Entries)
                comboBox.Items.Add(entry.StructureID);
        }
    }

    /// <summary>
    /// seznam otevřených datových struktur, 
    /// pomocí kterého se lze přepínat mezí datovými strukturami
    /// </summary>
    class FilterStructureTextBox : AbstractTextBoxCommand
    {
        TextBox textBox;

        /// <summary>
        /// Změna vlastníka
        /// </summary>
        /// <param name="e"></param>
        protected override void OnOwnerChanged(EventArgs e)
        {
            base.OnOwnerChanged(e);
            ToolBarTextBox toolbarItem = (ToolBarTextBox)Owner;
            textBox = toolbarItem.TextBox;
            textBox.TextChanged += TextBox_TextChanged;
        }

        void TextBox_TextChanged(object sender, EventArgs e)
        {
            if (!string.IsNullOrEmpty(textBox.Text))
                StructureViewPad.Instance.Filter(textBox.Text);
            else
                StructureViewPad.Instance.RemoveFilter();
        }
    }
}
