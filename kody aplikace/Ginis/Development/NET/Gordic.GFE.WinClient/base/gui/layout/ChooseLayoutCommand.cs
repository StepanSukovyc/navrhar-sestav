//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ChooseLayoutCommand.cs                 </Name>
//    <Description> Popis příkazu ChooseLayoutCommand.                          </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-05-20                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.WinClient.Gui;
using System;
using System.Collections.Generic;
using System.IO;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.Base.Gui
{
    /// <summary>
    /// Popis příkazu ChooseLayoutCommand.
    /// </summary>
    class ChooseLayoutCommand : AbstractComboBoxCommand
    {
        int editIndex = -1, resetIndex = -1, oldItem = 0;
        bool editingLayout;

        static IEnumerable<string> CustomLayoutNames
        {
            get
            {
                foreach (LayoutConfiguration layout in LayoutConfiguration.Layouts)
                    if (layout.Custom)
                        yield return layout.Name;
            }
        }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        public ChooseLayoutCommand()
        {
            try
            {
                LayoutConfiguration.LayoutChanged += new EventHandler(LayoutChanged);

                foreach (string layout in LayoutConfiguration.DefaultLayouts)
                {
                    LayoutConfiguration lc = LayoutConfiguration.GetLayout(layout);
                    if (lc != null) lc.DisplayName = layout;
                }
            }
            catch (Exception ex)
            {
                MessageService.ShowErrorFormatted(GResources.GetResourceText(29451473) + "\r\n{0}", ex.Message);
            }
        }

        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (editingLayout) return;
            LoggingService.Debug(GResources.GetResourceText(29451474));

            ComboBox comboBox = ((ToolBarComboBox)Owner).ComboBox;
            string dataPath = Path.Combine(PropertyService.DataDirectory, "resources" + Path.DirectorySeparatorChar + "layouts");
            string configPath = Path.Combine(PropertyService.ConfigDirectory, "layouts");
        
            if (!Directory.Exists(configPath))
                Directory.CreateDirectory(configPath);

            if (oldItem != editIndex && oldItem != resetIndex)
                SimpleDesktop.Desktop.DesktopLayout.StoreConfiguration();

            if (comboBox.SelectedIndex == editIndex)
            {
                editingLayout = true;
                ShowLayoutEditor();
                OnOwnerChanged(EventArgs.Empty);
                editingLayout = false;
            }
            else if (comboBox.SelectedIndex == resetIndex)
                ResetToDefaults();
            else
            {
                LayoutConfiguration config = (LayoutConfiguration)LayoutConfiguration.Layouts[comboBox.SelectedIndex];
                LayoutConfiguration.CurrentLayoutName = config.Name;
            }

            oldItem = comboBox.SelectedIndex;
        }

        void ShowLayoutEditor()
        {
            using (Form frm = new Form())
            {
                frm.Text = GResources.GetResourceText(29451475);

                StringListEditor ed = new StringListEditor();
                ed.Dock = DockStyle.Fill;
                ed.ManualOrder = false;
                ed.BrowseForDirectory = false;
                ed.TitleText = GResources.GetResourceText(29451476);
                ed.AddButtonText = GResources.GetResourceText(29451477);

                ed.LoadList(CustomLayoutNames);
                FlowLayoutPanel p = new FlowLayoutPanel();
                p.Dock = DockStyle.Bottom;
                p.FlowDirection = FlowDirection.RightToLeft;

                Button btn = new Button();
                p.Height = btn.Height + 8;
                btn.DialogResult = DialogResult.Cancel;
                btn.Text = GResources.GetResourceText(29450224);
                frm.CancelButton = btn;
                p.Controls.Add(btn);

                btn = new Button();
                btn.DialogResult = DialogResult.OK;
                btn.Text = "OK";
                frm.AcceptButton = btn;
                p.Controls.Add(btn);

                frm.Controls.Add(ed);
                frm.Controls.Add(p);

                frm.FormBorderStyle = FormBorderStyle.FixedDialog;
                frm.MaximizeBox = false;
                frm.MinimizeBox = false;
                frm.ClientSize = new System.Drawing.Size(400, 300);
                frm.StartPosition = FormStartPosition.CenterParent;
                frm.ShowInTaskbar = false;

                if (frm.ShowDialog(SimpleDesktop.MainForm) == DialogResult.OK)
                {
                    IList<string> oldNames = new List<string>(CustomLayoutNames);
                    IList<string> newNames = ed.GetList();
                    // přidat nově přidané rozvržení
                    foreach (string newLayoutName in newNames)
                        if (!oldNames.Contains(newLayoutName))
                        {
                            oldNames.Add(newLayoutName);
                            LayoutConfiguration.CreateCustom(newLayoutName);
                        }
                    // odebrat odstraněné rozvržení
                    LayoutConfiguration.Layouts.RemoveAll(delegate(LayoutConfiguration lc)
                    {
                        return lc.Custom && !newNames.Contains(lc.Name);
                    });
                    LayoutConfiguration.SaveCustomLayoutConfiguration();
                }
            }
        }

        void ResetToDefaults()
        {
            if (MessageService.AskQuestion(GResources.GetResourceText(29451478).Replace("\\r\\n", "\r\n")))
            {

                foreach (LayoutConfiguration config in LayoutConfiguration.Layouts)
                {
                    string configPath = Path.Combine(PropertyService.ConfigDirectory, "layouts");
                    string dataPath = Path.Combine(PropertyService.DataDirectory, "resources" + Path.DirectorySeparatorChar + "layouts");
                    if (File.Exists(Path.Combine(dataPath, config.FileName)) && File.Exists(Path.Combine(configPath, config.FileName)))
                        try { File.Delete(Path.Combine(configPath, config.FileName)); }
                        catch (Exception) { }
                }
                LayoutConfiguration.ReloadDefaultLayout();
            }
        }

        void LayoutChanged(object sender, EventArgs e)
        {
            if (editingLayout) return;
            LoggingService.Debug("ChooseLayoutCommand.LayoutChanged(object,EventArgs)");
            ToolBarComboBox toolbarItem = (ToolBarComboBox)Owner;
            ComboBox comboBox = toolbarItem.ComboBox;
            for (int i = 0; i < comboBox.Items.Count; ++i)
                if (((LayoutConfiguration)comboBox.Items[i]).Name == LayoutConfiguration.CurrentLayoutName)
                {
                    comboBox.SelectedIndex = i;
                    break;
                }
        }
        protected override void OnOwnerChanged(EventArgs e)
        {
            base.OnOwnerChanged(e);
            ToolBarComboBox toolbarItem = (ToolBarComboBox)Owner;
            ComboBox comboBox = toolbarItem.ComboBox;
            comboBox.Items.Clear();
            int index = 0;
            foreach (LayoutConfiguration config in LayoutConfiguration.Layouts)
            {
                if (LayoutConfiguration.CurrentLayoutName == config.Name)
                    index = comboBox.Items.Count;
                comboBox.Items.Add(config);
            }
            editIndex = comboBox.Items.Count;

            comboBox.Items.Add(GResources.GetResourceText(29451479));

            resetIndex = comboBox.Items.Count;
            comboBox.Items.Add(GResources.GetResourceText(29451480));
            comboBox.SelectedIndex = index;
        }
    }
}
