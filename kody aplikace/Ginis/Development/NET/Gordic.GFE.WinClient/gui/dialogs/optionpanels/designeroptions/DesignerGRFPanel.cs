//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DesignerGRFPanel.cs                </Name>
//    <Description> Hlavní nastavení                                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.WinForms.Controls;

namespace Gordic.GFE.WinClient.Dialogs.OptionPanels
{
    /// <summary>
    /// nastavení designéru grafické sestavy
    /// </summary>
    class DesignerGRFPanel : AbstractOptionPanel
    {
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.DesignerGRFPanel.xfrm");

            ((GLabeledTextBox)ControlDictionary["tbPageSpacing"]).Text = ReportDesignerProperties.Instance.PageSpacing.ToString();
            ((GLabeledTextBox)ControlDictionary["tbPageLeft"]).Text = ReportDesignerProperties.Instance.PageLeft.ToString();
            ((GLabeledTextBox)ControlDictionary["tbPageRightDark"]).Text = ReportDesignerProperties.Instance.RightDark.ToString();
            ((GLabeledTextBox)ControlDictionary["tbPageBottomDark"]).Text = ReportDesignerProperties.Instance.BottomDark.ToString();
            ((GLabeledTextBox)ControlDictionary["tbResolution"]).Text = ReportDesignerProperties.Instance.Resolution.Value;
            ((GLabeledTextBox)ControlDictionary["tbGridColor"]).Text = ReportDesignerProperties.Instance.GridColor;
            ((GLabeledTextBox)ControlDictionary["tbValueOfColor"]).Text = ReportDesignerProperties.Instance.ValueOfColor;

            ((CheckBox)ControlDictionary["cbAlignWidthResize"]).Checked = ReportDesignerProperties.Instance.AlignWidthResize;
            ((CheckBox)ControlDictionary["cbAlignHeightResize"]).Checked = ReportDesignerProperties.Instance.AlignHeightResize;
            ((CheckBox)ControlDictionary["cbAlignWidthMove"]).Checked = ReportDesignerProperties.Instance.AlignWidthMove;
            ((CheckBox)ControlDictionary["cbAlignHeightMove"]).Checked = ReportDesignerProperties.Instance.AlignHeightMove;

            ((CheckBox)ControlDictionary["cbApplyFormatSurround"]).Checked = ReportDesignerProperties.Instance.ApplyFormatSurround;
            ((CheckBox)ControlDictionary["cbApplyFormatSize"]).Checked = ReportDesignerProperties.Instance.ApplyFormatSize;
            ((CheckBox)ControlDictionary["cbApplyFormatText"]).Checked = ReportDesignerProperties.Instance.ApplyFormatText;

            ((CheckBox)ControlDictionary["cbF2Activation"]).Checked = ReportDesignerProperties.Instance.F2Activation;

            ((NumericUpDown)ControlDictionary["nudDelaySelection"]).Value = ReportDesignerProperties.Instance.ContextMenuMouseDownWaitMiliseconds;
        }

        /// <summary>
        /// Uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public override bool StorePanelContents()
        {
            int spacing = 10;
            int.TryParse(((GLabeledTextBox)ControlDictionary["tbPageSpacing"]).Text, out spacing);
            ReportDesignerProperties.Instance.PageSpacing = spacing;
            spacing = 10;
            int.TryParse(((GLabeledTextBox)ControlDictionary["tbPageLeft"]).Text, out spacing);
            ReportDesignerProperties.Instance.PageLeft = spacing;

            spacing = 3;
            int.TryParse(((GLabeledTextBox)ControlDictionary["tbPageRightDark"]).Text, out spacing);
            ReportDesignerProperties.Instance.RightDark = spacing;

            spacing = 3;
            int.TryParse(((GLabeledTextBox)ControlDictionary["tbPageBottomDark"]).Text, out spacing);
            ReportDesignerProperties.Instance.BottomDark = spacing;

            ReportDesignerProperties.Instance.DefaultResolution = ((GLabeledTextBox)ControlDictionary["tbResolution"]).Text;
            ReportDesignerProperties.Instance.AlignWidthResize = ((CheckBox)ControlDictionary["cbAlignWidthResize"]).Checked;
            ReportDesignerProperties.Instance.AlignHeightResize = ((CheckBox)ControlDictionary["cbAlignHeightResize"]).Checked;
            ReportDesignerProperties.Instance.AlignWidthMove = ((CheckBox)ControlDictionary["cbAlignWidthMove"]).Checked;
            ReportDesignerProperties.Instance.AlignHeightMove = ((CheckBox)ControlDictionary["cbAlignHeightMove"]).Checked;

            ReportDesignerProperties.Instance.ApplyFormatSurround = ((CheckBox)ControlDictionary["cbApplyFormatSurround"]).Checked;
            ReportDesignerProperties.Instance.ApplyFormatSize = ((CheckBox)ControlDictionary["cbApplyFormatSize"]).Checked;
            ReportDesignerProperties.Instance.ApplyFormatText = ((CheckBox)ControlDictionary["cbApplyFormatText"]).Checked;

            ReportDesignerProperties.Instance.F2Activation = ((CheckBox)ControlDictionary["cbF2Activation"]).Checked;

            ReportDesignerProperties.Instance.ContextMenuMouseDownWaitMiliseconds = (int)((NumericUpDown)ControlDictionary["nudDelaySelection"]).Value;

            ReportDesignerProperties.Instance.GridColor = ((GLabeledTextBox)ControlDictionary["tbGridColor"]).Text;
            ReportDesignerProperties.Instance.ValueOfColor = ((GLabeledTextBox)ControlDictionary["tbValueOfColor"]).Text;

            return true;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // DesignerGRFPanel
            // 
            this.Name = "DesignerGRFPanel";
            this.ResumeLayout(false);

        }

    }
}
