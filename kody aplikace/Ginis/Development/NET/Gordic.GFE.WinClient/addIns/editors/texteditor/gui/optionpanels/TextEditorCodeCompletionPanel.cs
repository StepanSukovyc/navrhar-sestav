//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TextEditorCodeCompletionPanel.cs                 </Name>
//    <Description> Panel pro nastavení možnosti doplňování kódu                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-17                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.WinClient.Dialogs.OptionPanels
{
    /// <summary>
    /// Panel pro nastavení možnosti doplňování kódu
    /// </summary>
    class TextEditorCodeCompletionPanel : AbstractOptionPanel
    {
        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.TextEditorCodeCompletionPanel.xfrm");

            EnableCodeCompletionSettingsGroupBox();
            Get<CheckBox>("codeCompletionEnabled").CheckedChanged += delegate(object sender, EventArgs e)
            {
                EnableCodeCompletionSettingsGroupBox();
            };
            Get<CheckBox>("codeCompletionEnabled").Checked = CodeCompletionOptions.Instance.EnableCodeCompletion;

            Get<CheckBox>("useDataUsageCache").CheckedChanged += delegate(object sender, EventArgs e)
            {
                ControlDictionary["dataUsageCacheLabel1"].Enabled = Get<CheckBox>("useDataUsageCache").Checked;
                ControlDictionary["dataUsageCacheLabel2"].Enabled = Get<CheckBox>("useDataUsageCache").Checked;
                ControlDictionary["dataUsageCacheItemCountNumericUpDown"].Enabled = Get<CheckBox>("useDataUsageCache").Checked;
            };
            Get<CheckBox>("useDataUsageCache").Checked = CodeCompletionOptions.Instance.DataUsageCacheEnabled;

            Get<NumericUpDown>("dataUsageCacheItemCount").Value = CodeCompletionOptions.Instance.DataUsageCacheItemCount;

            //Get<CheckBox>("useTooltips").Checked = CodeCompletionOptions.Instance.TooltipsEnabled;

            //Get<CheckBox>("completeWhenTyping").Checked = CodeCompletionOptions.Instance.CompleteWhenTyping;
            //Get<CheckBox>("useKeywordCompletion").Checked = CodeCompletionOptions.Instance.KeywordCompletionEnabled;

            Get<CheckBox>("allowCompleteExistingExpression").CheckedChanged += delegate(object sender, EventArgs e)
            {
                ControlDictionary["automateCompleteIfUniqueCheckBox"].Enabled = Get<CheckBox>("allowCompleteExistingExpression").Checked;
            };
            ControlDictionary["automateCompleteIfUniqueCheckBox"].Enabled = Get<CheckBox>("allowCompleteExistingExpression").Checked;
            Get<CheckBox>("allowCompleteExistingExpression").Checked = CodeCompletionOptions.Instance.AllowCompleteExistingExpression;

            Get<CheckBox>("automateCompleteIfUnique").Checked = CodeCompletionOptions.Instance.AutomateCompleteIfUnique;
            Get<CheckBox>("showDescriptionWindow").Checked = CodeCompletionOptions.Instance.ShowDescriptionWindow;
        }

        /// <summary>
        /// Uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public override bool StorePanelContents()
        {
            CodeCompletionOptions.Instance.EnableCodeCompletion = Get<CheckBox>("codeCompletionEnabled").Checked;
            CodeCompletionOptions.Instance.DataUsageCacheEnabled = Get<CheckBox>("useDataUsageCache").Checked;
            CodeCompletionOptions.Instance.DataUsageCacheItemCount = (int)Get<NumericUpDown>("dataUsageCacheItemCount").Value;
            //CodeCompletionOptions.Instance.TooltipsEnabled = Get<CheckBox>("useTooltips").Checked;
            //CodeCompletionOptions.Instance.CompleteWhenTyping = Get<CheckBox>("completeWhenTyping").Checked;
            //CodeCompletionOptions.Instance.KeywordCompletionEnabled = Get<CheckBox>("useKeywordCompletion").Checked;
            CodeCompletionOptions.Instance.AllowCompleteExistingExpression = Get<CheckBox>("allowCompleteExistingExpression").Checked;
            CodeCompletionOptions.Instance.AutomateCompleteIfUnique = Get<CheckBox>("automateCompleteIfUnique").Checked;
            CodeCompletionOptions.Instance.ShowDescriptionWindow = Get<CheckBox>("showDescriptionWindow").Checked;
            return base.StorePanelContents();
        }

        void EnableCodeCompletionSettingsGroupBox()
        {
            ControlDictionary["groupBox"].Enabled = Get<CheckBox>("codeCompletionEnabled").Checked;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // TextEditorCodeCompletionPanel
            // 
            this.Name = "TextEditorCodeCompletionPanel";
            this.ResumeLayout(false);

        }
    }
}
