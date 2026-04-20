//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TextEditorGeneralPanel.cs              </Name>
//    <Description> Panel možnosti pro obecé nastavení.                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-17                                                  </Created>
//  </FileHeader>

using System;
using System.Text;
using System.Windows.Forms;
using System.Drawing.Text;
using System.Drawing;
using Gordic.GFE.WinClient.Utils;
using Gordic.GFE.Parsers.Gui;
using Gordic.TextEditor;
using Gordic.GFE.Parsers.DefaultEditor;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.DefaultEditor;
using Gordic.WinForms.Controls;

namespace Gordic.GFE.WinClient.Dialogs.OptionPanels
{
    /// <summary>
    /// Panel možnosti pro obecé nastavení.
    /// </summary>
    class TextEditorGeneralPanel : AbstractOptionPanel
    {
        ComboBox fontListComboBox, fontSizeComboBox;
        FontSelectionPanelHelper helper;
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.TextEditorGeneralPanel.xfrm");

            fontListComboBox = ((ComboBox)ControlDictionary["fontListComboBox"]);
            fontSizeComboBox = ((ComboBox)ControlDictionary["fontSizeComboBox"]);

            ReportDesignerTextEditorProperties properties = ReportDesignerTextEditorProperties.Instance;

            ((GLabeledTextBox)ControlDictionary["tbBCMarkText"]).Text = properties.BCMarkerText;
            ((GLabeledTextBox)ControlDictionary["tbCMarkText"]).Text = properties.CMarkerText;

            ((CheckBox)ControlDictionary["enableFoldingCheckBox"]).Checked = properties.EnableFolding;

            if (IsClearTypeEnabled)
            {
                ((CheckBox)ControlDictionary["enableAAFontRenderingCheckBox"]).Checked = true;
                ((CheckBox)ControlDictionary["enableAAFontRenderingCheckBox"]).Enabled = false;
            }
            else
                ((CheckBox)ControlDictionary["enableAAFontRenderingCheckBox"]).Checked =
                    (properties.TextRenderingHint == TextRenderingHint.AntiAliasGridFit || properties.TextRenderingHint == TextRenderingHint.ClearTypeGridFit);

            ((CheckBox)ControlDictionary["mouseWheelZoomCheckBox"]).Checked = properties.MouseWheelTextZoom;

            foreach (String name in CharacterEncodings.Names)
                ((ComboBox)ControlDictionary["textEncodingComboBox"]).Items.Add(name);
            int encodingIndex = 0;
            try { encodingIndex = CharacterEncodings.GetEncodingIndex(properties.EncodingCodePage); }
            catch { encodingIndex = CharacterEncodings.GetEncodingIndex(Encoding.UTF8.CodePage); }
            
            ((ComboBox)ControlDictionary["textEncodingComboBox"]).SelectedIndex = encodingIndex;

            for (int i = 6; i <= 24; ++i)
                fontSizeComboBox.Items.Add(i);

            fontSizeComboBox.TextChanged += new EventHandler(UpdateFontPreviewLabel);
            fontSizeComboBox.Enabled = false;

            fontListComboBox.Enabled = false;
            fontListComboBox.TextChanged += new EventHandler(UpdateFontPreviewLabel);
            fontListComboBox.SelectedIndexChanged += new EventHandler(UpdateFontPreviewLabel);

            Font currentFont = FontSelectionPanel.ParseFont(properties.FontContainer.DefaultFont.ToString());
            helper = new FontSelectionPanelHelper(fontSizeComboBox, fontListComboBox, currentFont);

            fontListComboBox.MeasureItem += new System.Windows.Forms.MeasureItemEventHandler(helper.MeasureComboBoxItem);
            fontListComboBox.DrawItem += new System.Windows.Forms.DrawItemEventHandler(helper.ComboBoxDrawItem);

            UpdateFontPreviewLabel(null, null);
            helper.StartThread();
        }

        Font CurrentFont { get { return helper.GetSelectedFont(); } }

        bool IsClearTypeEnabled
        {
            get { return SystemInformation.IsFontSmoothingEnabled && SystemInformation.FontSmoothingType >= 2; }
        }

        void UpdateFontPreviewLabel(object sender, EventArgs e)
        {
            helper.UpdateFontPreviewLabel(ControlDictionary["fontPreviewLabel"]);
        }
        /// <summary>
        /// Uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public override bool StorePanelContents()
        {
            ReportDesignerTextEditorProperties properties = ReportDesignerTextEditorProperties.Instance;

            if (((CheckBox)ControlDictionary["enableAAFontRenderingCheckBox"]).Enabled)
                properties.TextRenderingHint = ((CheckBox)ControlDictionary["enableAAFontRenderingCheckBox"]).Checked
                    ? TextRenderingHint.ClearTypeGridFit : TextRenderingHint.SystemDefault;
            else
                properties.TextRenderingHint = TextRenderingHint.SystemDefault;
            properties.MouseWheelTextZoom = ((CheckBox)ControlDictionary["mouseWheelZoomCheckBox"]).Checked;
            properties.EnableFolding = ((CheckBox)ControlDictionary["enableFoldingCheckBox"]).Checked;
            Font currentFont = CurrentFont;
            if (currentFont != null)
                properties.Font = currentFont;
            properties.EncodingCodePage = CharacterEncodings.GetCodePageByIndex(((ComboBox)ControlDictionary["textEncodingComboBox"]).SelectedIndex);

            IViewContent activeViewContent = SimpleDesktop.Desktop.ActiveViewContent;

            if (activeViewContent is ITextEditorControlProvider)
            {
                TextEditorControl textarea = ((ITextEditorControlProvider)activeViewContent).TextEditorControl;
                textarea.OptionsChanged();
            }

            properties.BCMarkerText = ((GLabeledTextBox)ControlDictionary["tbBCMarkText"]).Text;
            properties.CMarkerText = ((GLabeledTextBox)ControlDictionary["tbCMarkText"]).Text;

            return true;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // TextEditorGeneralPanel
            // 
            this.Name = "TextEditorGeneralPanel";
            this.ResumeLayout(false);

        }
    }
}
