//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ShowOutputFromComboBox.cs              </Name>
//    <Description> Zobrazení výstupu z ... příkaz                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-10                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;

namespace Gordic.GFE.WinClient.MessageView
{
    /// <summary>
    /// Zobrazení výstupu z ... příkaz
    /// </summary>
    public class ShowOutputFromComboBox : AbstractComboBoxCommand
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
            SetItems(null);
            CompilerMessageView.Instance.MessageCategoryAdded += CompilerMessageViewMessageCategoryAdded;
            CompilerMessageView.Instance.SelectedCategoryIndexChanged += new EventHandler(CompilerMessageViewSelectedCategoryIndexChanged);
            comboBox.SelectedIndexChanged += new EventHandler(ComboBoxSelectedIndexChanged);
        }
        void CompilerMessageViewSelectedCategoryIndexChanged(object sender, EventArgs e)
        {
            if (comboBox.SelectedIndex != CompilerMessageView.Instance.SelectedCategoryIndex)
                comboBox.SelectedIndex = CompilerMessageView.Instance.SelectedCategoryIndex;
        }
        void ComboBoxSelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                if (comboBox.SelectedIndex != CompilerMessageView.Instance.SelectedCategoryIndex)
                    CompilerMessageView.Instance.SelectedCategoryIndex = comboBox.SelectedIndex;
            }
            catch { }
        }
        void CompilerMessageViewMessageCategoryAdded(params string[] parameters) { SetItems(parameters); }

        void SetItems(params string[] parameters)
        {
            comboBox.Items.Clear();
            foreach (MessageViewCategory category in CompilerMessageView.Instance.MessageCategories)
                comboBox.Items.Add(StringParser.Parse(category.DisplayCategory));
            if (parameters != null && parameters.Length > 0 && comboBox.Items.Count > 0)
                comboBox.SelectedIndex = comboBox.Items.IndexOf(parameters[0]);
        }
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run() { }
    }
}
