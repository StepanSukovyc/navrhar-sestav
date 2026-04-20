//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TextEditorBehaviorPanel.cs             </Name>
//    <Description> Panel editace možnosti Chování.                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-17                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.DefaultEditor;
using Gordic.TextEditor.Document;
using Gordic.GFE.Parsers.DefaultEditor;
using Gordic.TextEditor;
using Gordic.GFE.WinClient.Gui;

namespace Gordic.GFE.WinClient.Dialogs.OptionPanels
{
    /// <summary>
    /// Panel editace možnosti Chování.
    /// </summary>
    class TextEditorBehaviorPanel : AbstractOptionPanel
    {
        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.TextEditorBehaviorPanel.xfrm");

            ReportDesignerTextEditorProperties properties = ReportDesignerTextEditorProperties.Instance;

            ((CheckBox)ControlDictionary["autoinsertCurlyBraceCheckBox"]).Checked = properties.AutoInsertCurlyBracket;
            ((CheckBox)ControlDictionary["hideMouseCursorCheckBox"]).Checked = properties.HideMouseCursor;
            ((CheckBox)ControlDictionary["caretBehindEOLCheckBox"]).Checked = properties.AllowCaretBeyondEOL;
            ((CheckBox)ControlDictionary["autoInsertQuotationMarksCheckBox"]).Checked = properties.AutoInsertQuotationMarks;
            ((CheckBox)ControlDictionary["cutCopyWholeLine"]).Checked = properties.CutCopyWholeLine;

            ((CheckBox)ControlDictionary["convertTabsToSpacesCheckBox"]).Checked = properties.ConvertTabsToSpaces;

            ControlDictionary["tabSizeTextBox"].Text = properties.TabIndent.ToString();
            ControlDictionary["indentSizeTextBox"].Text = properties.IndentationSize.ToString();

            ((ComboBox)ControlDictionary["indentStyleComboBox"]).Items.Add("žádné");
            ((ComboBox)ControlDictionary["indentStyleComboBox"]).Items.Add("automatické");
            ((ComboBox)ControlDictionary["indentStyleComboBox"]).Items.Add("chytré"); 

            ((ComboBox)ControlDictionary["indentStyleComboBox"]).SelectedIndex = (int)properties.IndentStyle;

            ((ComboBox)ControlDictionary["mouseWhellDirectionComboBox"]).Items.Add("normální");
            ((ComboBox)ControlDictionary["mouseWhellDirectionComboBox"]).Items.Add("obrácený"); 
            ((ComboBox)ControlDictionary["mouseWhellDirectionComboBox"]).SelectedIndex = properties.MouseWheelScrollDown ? 0 : 1;
        }

        /// <summary>
        /// Uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public override bool StorePanelContents()
        {
            ReportDesignerTextEditorProperties properties = ReportDesignerTextEditorProperties.Instance;

            properties.ConvertTabsToSpaces = ((CheckBox)ControlDictionary["convertTabsToSpacesCheckBox"]).Checked;
            properties.MouseWheelScrollDown = ((ComboBox)ControlDictionary["mouseWhellDirectionComboBox"]).SelectedIndex == 0;

            properties.AutoInsertCurlyBracket = ((CheckBox)ControlDictionary["autoinsertCurlyBraceCheckBox"]).Checked;
            properties.HideMouseCursor = ((CheckBox)ControlDictionary["hideMouseCursorCheckBox"]).Checked;
            properties.AllowCaretBeyondEOL = ((CheckBox)ControlDictionary["caretBehindEOLCheckBox"]).Checked;
            properties.AutoInsertQuotationMarks = ((CheckBox)ControlDictionary["autoInsertQuotationMarksCheckBox"]).Checked;
            properties.CutCopyWholeLine = ((CheckBox)ControlDictionary["cutCopyWholeLine"]).Checked;

            properties.IndentStyle = (IndentStyle)((ComboBox)ControlDictionary["indentStyleComboBox"]).SelectedIndex;

            try
            {
                int tabSize = Int32.Parse(ControlDictionary["tabSizeTextBox"].Text);

                // nenastavovat na 0 (vyvolá chybu)
                if (tabSize > 0)
                    properties.TabIndent = tabSize;
            }
            catch (Exception) { }
            try
            {
                properties.IndentationSize = Int32.Parse(ControlDictionary["indentSizeTextBox"].Text);
            }
            catch (Exception) { }

            IViewContent activeViewContent = SimpleDesktop.Desktop.ActiveViewContent;

            if (activeViewContent is ITextEditorControlProvider)
            {
                TextEditorControl textarea = ((ITextEditorControlProvider)activeViewContent).TextEditorControl;
                textarea.OptionsChanged();
            }

            return true;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // TextEditorBehaviorPanel
            // 
            this.Name = "TextEditorBehaviorPanel";
            this.ResumeLayout(false);

        }
    }
}
