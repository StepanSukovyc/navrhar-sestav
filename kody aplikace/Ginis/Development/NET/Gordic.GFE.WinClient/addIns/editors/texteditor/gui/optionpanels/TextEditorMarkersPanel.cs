//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TextEditorMarkersPanel.cs              </Name>
//    <Description> Možnosti sekce Značky a Pravítka                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-17                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.General;
using Gordic.GFE.Parsers.Gui;
using Gordic.TextEditor.Document;
using Gordic.GFE.Parsers.DefaultEditor;
using Gordic.TextEditor;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.DefaultEditor;

namespace Gordic.GFE.WinClient.Dialogs.OptionPanels
{
    /// <summary>
    /// Možnosti sekce Značky a Pravítka
    /// </summary>
    class TextEditorMarkersPanel : AbstractOptionPanel
    {
        bool lineViewerStyle;
        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.TextEditorMarkersPanel.xfrm");

            ReportDesignerTextEditorProperties properties = ReportDesignerTextEditorProperties.Instance;
            ((CheckBox)ControlDictionary["showLineNumberCheckBox"]).Checked = properties.ShowLineNumbers;
            ((CheckBox)ControlDictionary["showInvalidLinesCheckBox"]).Checked = properties.ShowInvalidLines;
            ((CheckBox)ControlDictionary["showBracketHighlighterCheckBox"]).Checked = properties.ShowMatchingBracket;
            //((CheckBox)ControlDictionary["showErrorsCheckBox"]).Checked = properties.UnderlineErrors;
            ((CheckBox)ControlDictionary["showHRulerCheckBox"]).Checked = properties.ShowHorizontalRuler;
            ((CheckBox)ControlDictionary["showEOLMarkersCheckBox"]).Checked = properties.ShowEOLMarker;
            ((CheckBox)ControlDictionary["showVRulerCheckBox"]).Checked = properties.ShowVerticalRuler;
            ((CheckBox)ControlDictionary["showTabCharsCheckBox"]).Checked = properties.ShowTabs;
            ((CheckBox)ControlDictionary["showSpaceCharsCheckBox"]).Checked = properties.ShowSpaces;

            ((CheckBox)ControlDictionary["showCaretLineCheckBox"]).CheckedChanged +=
                delegate { lineViewerStyle = ((CheckBox)ControlDictionary["showCaretLineCheckBox"]).Checked; };
            ((CheckBox)ControlDictionary["showCaretLineCheckBox"]).Checked = properties.LineViewerStyle == LineViewerStyle.FullRow ? true : false;
            //lineViewerStyle = ((CheckBox)ControlDictionary["showCaretLineCheckBox"]).Checked;

            ControlDictionary["vRulerRowTextBox"].Text = properties.VerticalRulerRow.ToString();

            //((ComboBox)ControlDictionary["lineMarkerStyleComboBox"]).Items.Add(GResources.GetResourceText(29450196)); //RC 29450196 : žádný
            //((ComboBox)ControlDictionary["lineMarkerStyleComboBox"]).Items.Add(GResources.GetResourceText(29450197));  //RC 29450197 : úplný řádek
            //((ComboBox)ControlDictionary["lineMarkerStyleComboBox"]).SelectedIndex = (int)properties.LineViewerStyle;

            ((ComboBox)ControlDictionary["bracketMatchingStyleComboBox"]).Items.Add(GResources.GetResourceText(29450198)); //RC 29450198 : před kurzorem
            ((ComboBox)ControlDictionary["bracketMatchingStyleComboBox"]).Items.Add(GResources.GetResourceText(29450199));  //RC 29450199 : za kurzorem
            ((ComboBox)ControlDictionary["bracketMatchingStyleComboBox"]).SelectedIndex = (int)properties.BracketMatchingStyle;
        }

        /// <summary>
        /// Uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public override bool StorePanelContents()
        {
            ReportDesignerTextEditorProperties properties = ReportDesignerTextEditorProperties.Instance;
            properties.ShowInvalidLines = ((CheckBox)ControlDictionary["showInvalidLinesCheckBox"]).Checked;
            properties.ShowLineNumbers = ((CheckBox)ControlDictionary["showLineNumberCheckBox"]).Checked;
            properties.ShowMatchingBracket = ((CheckBox)ControlDictionary["showBracketHighlighterCheckBox"]).Checked;
            //properties.UnderlineErrors = ((CheckBox)ControlDictionary["showErrorsCheckBox"]).Checked;
            properties.ShowHorizontalRuler = ((CheckBox)ControlDictionary["showHRulerCheckBox"]).Checked;
            properties.ShowEOLMarker = ((CheckBox)ControlDictionary["showEOLMarkersCheckBox"]).Checked;
            properties.ShowVerticalRuler = ((CheckBox)ControlDictionary["showVRulerCheckBox"]).Checked;
            properties.ShowTabs = ((CheckBox)ControlDictionary["showTabCharsCheckBox"]).Checked;
            properties.ShowSpaces = ((CheckBox)ControlDictionary["showSpaceCharsCheckBox"]).Checked;
            properties.CaretLine = ((CheckBox)ControlDictionary["showCaretLineCheckBox"]).Checked;

            try { properties.VerticalRulerRow = Int32.Parse(ControlDictionary["vRulerRowTextBox"].Text); }
            catch { }

            properties.LineViewerStyle = lineViewerStyle ? LineViewerStyle.FullRow : LineViewerStyle.None;//(LineViewerStyle)((ComboBox)ControlDictionary["lineMarkerStyleComboBox"]).SelectedIndex;
            properties.BracketMatchingStyle = (BracketMatchingStyle)((ComboBox)ControlDictionary["bracketMatchingStyleComboBox"]).SelectedIndex;

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
            // TextEditorMarkersPanel
            // 
            this.Name = "TextEditorMarkersPanel";
            this.ResumeLayout(false);

        }
    }
}
