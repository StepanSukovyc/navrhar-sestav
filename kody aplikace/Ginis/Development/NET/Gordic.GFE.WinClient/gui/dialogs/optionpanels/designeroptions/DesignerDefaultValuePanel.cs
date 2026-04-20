//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DesignerDefaultValuePanel.cs           </Name>
//    <Description> panel editací výchozích hodnot                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-12                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Designer.Gui;
using Gordic.WinForms.Controls;

namespace Gordic.GFE.WinClient.Dialogs.OptionPanels
{
    /// <summary>
    /// panel editací výchozích hodnot
    /// </summary>
    class DesignerDefaultValuePanel : AbstractOptionPanel 
    {
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.DesignerDefaultValuePanel.xfrm");

            ((GLabeledTextBox)ControlDictionary["tbFontSize"]).Text = ReportDesignerDesignerProperties.Instance.DefaultFontSize;
            ((GLabeledTextBox)ControlDictionary["tbFontFamily"]).Text = ReportDesignerDesignerProperties.Instance.DefaultFontFontFamily;
            ((GLabeledTextBox)ControlDictionary["tbForeColor"]).Text = ReportDesignerDesignerProperties.Instance.DefaultFontForeColor;
            ((GLabeledTextBox)ControlDictionary["tbBackColor"]).Text = ReportDesignerDesignerProperties.Instance.DefaultFontBackColor;

            ((GLabeledTextBox)ControlDictionary["tbSpacingLeft"]).Text = ReportDesignerDesignerProperties.Instance.DefaultSpacingLeft;
            ((GLabeledTextBox)ControlDictionary["tbSpacingRight"]).Text = ReportDesignerDesignerProperties.Instance.DefaultSpacingRight;
            ((GLabeledTextBox)ControlDictionary["tbSpacingTop"]).Text = ReportDesignerDesignerProperties.Instance.DefaultSpacingTop;
            ((GLabeledTextBox)ControlDictionary["tbSpacingBottom"]).Text = ReportDesignerDesignerProperties.Instance.DefaultSpacingBottom;

            ((GLabeledTextBox)ControlDictionary["tbPaddingLeft"]).Text = ReportDesignerDesignerProperties.Instance.DefaultPaddingLeft;
            ((GLabeledTextBox)ControlDictionary["tbPaddingRight"]).Text = ReportDesignerDesignerProperties.Instance.DefaultPaddingRight;
            ((GLabeledTextBox)ControlDictionary["tbPaddingTop"]).Text = ReportDesignerDesignerProperties.Instance.DefaultPaddingTop;
            ((GLabeledTextBox)ControlDictionary["tbPaddingBottom"]).Text = ReportDesignerDesignerProperties.Instance.DefaultPaddingBottom;

            ((GLabeledTextBox)ControlDictionary["tbSizeWidth"]).Text = ReportDesignerDesignerProperties.Instance.DefaultSizeWidth;
            ((GLabeledTextBox)ControlDictionary["tbSizeHeight"]).Text = ReportDesignerDesignerProperties.Instance.DefaultSizeHeight;

            ((GLabeledTextBox)ControlDictionary["tbSizeMetrics"]).Text = ReportDesignerDesignerProperties.Instance.DefaultMetrics;
        }

        /// <summary>
        /// Uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public override bool StorePanelContents()
        {
            ReportDesignerDesignerProperties.Instance.DefaultFontSize = ((GLabeledTextBox)ControlDictionary["tbFontSize"]).Text;
            ReportDesignerDesignerProperties.Instance.DefaultFontFontFamily = ((GLabeledTextBox)ControlDictionary["tbFontFamily"]).Text;
            ReportDesignerDesignerProperties.Instance.DefaultFontForeColor = ((GLabeledTextBox)ControlDictionary["tbForeColor"]).Text;
            ReportDesignerDesignerProperties.Instance.DefaultFontBackColor = ((GLabeledTextBox)ControlDictionary["tbBackColor"]).Text;

            ReportDesignerDesignerProperties.Instance.DefaultSpacingLeft = ((GLabeledTextBox)ControlDictionary["tbSpacingLeft"]).Text;
            ReportDesignerDesignerProperties.Instance.DefaultSpacingRight = ((GLabeledTextBox)ControlDictionary["tbSpacingRight"]).Text;
            ReportDesignerDesignerProperties.Instance.DefaultSpacingTop = ((GLabeledTextBox)ControlDictionary["tbSpacingTop"]).Text;
            ReportDesignerDesignerProperties.Instance.DefaultSpacingBottom = ((GLabeledTextBox)ControlDictionary["tbSpacingBottom"]).Text;

            ReportDesignerDesignerProperties.Instance.DefaultPaddingLeft = ((GLabeledTextBox)ControlDictionary["tbPaddingLeft"]).Text;
            ReportDesignerDesignerProperties.Instance.DefaultPaddingRight = ((GLabeledTextBox)ControlDictionary["tbPaddingRight"]).Text;
            ReportDesignerDesignerProperties.Instance.DefaultPaddingTop = ((GLabeledTextBox)ControlDictionary["tbPaddingTop"]).Text;
            ReportDesignerDesignerProperties.Instance.DefaultPaddingBottom = ((GLabeledTextBox)ControlDictionary["tbPaddingBottom"]).Text;

            ReportDesignerDesignerProperties.Instance.DefaultSizeWidth = ((GLabeledTextBox)ControlDictionary["tbSizeWidth"]).Text;
            ReportDesignerDesignerProperties.Instance.DefaultSizeHeight = ((GLabeledTextBox)ControlDictionary["tbSizeHeight"]).Text;

            ReportDesignerDesignerProperties.Instance.DefaultMetrics = ((GLabeledTextBox)ControlDictionary["tbSizeMetrics"]).Text;
            return true;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // DesignerDefaultValuePanel
            // 
            this.Name = "DesignerDefaultValuePanel";
            this.ResumeLayout(false);

        }
    }
}
