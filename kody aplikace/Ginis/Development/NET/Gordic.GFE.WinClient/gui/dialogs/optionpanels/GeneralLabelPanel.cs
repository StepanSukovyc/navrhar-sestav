//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GeneralToolTipPanel.cs                 </Name>
//    <Description> Hlavní nastavení                                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Gui;
using Gordic.General;

namespace Gordic.GFE.WinClient.Gui.OptionPanels
{
    /// <summary>
    /// Hlavní nastavení nápovědného textu objektů sestavy
    /// </summary>
    class GeneralLabelPanel : AbstractOptionPanel
    {
        TextBox tbStepBetweenLabels, tbDefaultLabelWidth, tbDefaultGroupWidth, tbDefaultLabelFontSize, tbDefaultGroupFontSize;
        ErrorProvider errorProvider;

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.GeneralLabelPanel.xfrm");
            errorProvider = new ErrorProvider();
            errorProvider.ContainerControl = this;

            tbStepBetweenLabels = ((TextBox)ControlDictionary["tbStepBetweenLabels"]);
            tbDefaultLabelWidth = ((TextBox)ControlDictionary["tbDefaultLabelWidth"]);
            tbDefaultGroupWidth = ((TextBox)ControlDictionary["tbDefaultGroupWidth"]);
            tbDefaultLabelFontSize = ((TextBox)ControlDictionary["tbDefaultLabelFontSize"]);
            tbDefaultGroupFontSize = ((TextBox)ControlDictionary["tbDefaultGroupFontSize"]);

            ReportDesignerProperties properties = ReportDesignerProperties.Instance;

            tbStepBetweenLabels.Text = properties.StepBetween.ToString();
            tbStepBetweenLabels.TextChanged += textChanged;
            tbDefaultLabelWidth.Text = properties.DefaultLabelWidth.ToString();
            tbDefaultLabelWidth.TextChanged += textChanged;
            tbDefaultGroupWidth.Text = properties.DefaultGroupWidth.ToString();
            tbDefaultGroupWidth.TextChanged += textChanged;
            tbDefaultLabelFontSize.Text = properties.DefaultLabelFontSize.ToString();
            tbDefaultLabelFontSize.TextChanged += textChanged;
            tbDefaultGroupFontSize.Text = properties.DefaultGroupFontSize.ToString();
            tbDefaultGroupFontSize.TextChanged += textChanged;
        }

        void textChanged(object sender, EventArgs e)
        {
            int value = 0;
            if (!int.TryParse(tbStepBetweenLabels.Text, out value) || value <= 0)
                errorProvider.SetError(tbStepBetweenLabels, string.Format(string.Join(" ", GResources.GetResourceText(29450464), "'{0}'", GResources.GetResourceText(29450080)), tbStepBetweenLabels.Text)); //RC 29450464 : Hodnota
            else errorProvider.SetError(tbStepBetweenLabels, "");

            value = 0;
            if (!int.TryParse(tbDefaultLabelWidth.Text, out value) || value <= 0)
                errorProvider.SetError(tbDefaultLabelWidth, string.Format(string.Join(" ", GResources.GetResourceText(29450464), "'{0}'", GResources.GetResourceText(29450080)), tbDefaultLabelWidth.Text));
            else errorProvider.SetError(tbDefaultLabelWidth, "");

            value = 0;
            if (!int.TryParse(tbDefaultGroupWidth.Text, out value) || value <= 0)
                errorProvider.SetError(tbDefaultGroupWidth, string.Format(string.Join(" ", GResources.GetResourceText(29450464), "'{0}'", GResources.GetResourceText(29450080)), tbDefaultGroupWidth.Text));
            else errorProvider.SetError(tbDefaultGroupWidth, "");

            value = 0;
            if (!int.TryParse(tbDefaultLabelFontSize.Text, out value) || value <= 0)
                errorProvider.SetError(tbDefaultLabelFontSize, string.Format(string.Join(" ", GResources.GetResourceText(29450464), "'{0}'", GResources.GetResourceText(29450080)), tbDefaultLabelFontSize.Text));
            else errorProvider.SetError(tbDefaultLabelFontSize, "");

            value = 0;
            if (!int.TryParse(tbDefaultGroupFontSize.Text, out value) || value <= 0)
                errorProvider.SetError(tbDefaultGroupFontSize, string.Format(string.Join(" ", GResources.GetResourceText(29450464), "'{0}'", GResources.GetResourceText(29450080)), tbDefaultGroupFontSize.Text));
            else errorProvider.SetError(tbDefaultGroupFontSize, "");
        }

        /// <summary>
        /// Uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public override bool StorePanelContents()
        {
            ReportDesignerProperties properties = ReportDesignerProperties.Instance;

            int value = 5;
            int.TryParse(tbStepBetweenLabels.Text, out value);
            properties.StepBetween = value;

            value = 20;
            int.TryParse(tbDefaultLabelWidth.Text, out value);
            properties.DefaultLabelWidth = value;

            value = 10;
            int.TryParse(tbDefaultGroupWidth.Text, out value);
            properties.DefaultGroupWidth = value;

            value = 15;
            int.TryParse(tbDefaultLabelFontSize.Text, out value);
            properties.DefaultLabelFontSize = value;

            value = 7;
            int.TryParse(tbDefaultGroupFontSize.Text, out value);
            properties.DefaultGroupFontSize = value;
            return true;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // GeneralLabelPanel
            // 
            this.Name = "GeneralLabelPanel";
            this.ResumeLayout(false);

        }

    }
}
