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
    class GeneralToolTipPanel : AbstractOptionPanel
    {
        CheckBox showToolTip, showScripts, showTextAlign, showTextFont, showSize, showImageSize, showTablePadding, showVariables, showNazev, showUplnyNazev, showDatovyTyp;
        TextBox tbDuration;
        ErrorProvider errorProvider;

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.GeneralToolTipPanel.xfrm");
            errorProvider = new ErrorProvider
            {
                ContainerControl = this
            };

            showToolTip = ((CheckBox)ControlDictionary["showToolTip"]);
            showToolTip.CheckedChanged += checkedChanged;
            showScripts = ((CheckBox)ControlDictionary["showScripts"]);
            showTextAlign = ((CheckBox)ControlDictionary["showTextAlign"]);
            showTextFont = ((CheckBox)ControlDictionary["showTextFont"]);
            showSize = ((CheckBox)ControlDictionary["showSize"]);
            tbDuration = ((TextBox)ControlDictionary["tbDuration"]);
            showImageSize = ((CheckBox)ControlDictionary["showImageSize"]);
            showTablePadding = ((CheckBox)ControlDictionary["showTablePadding"]);
            showVariables = ((CheckBox)ControlDictionary["showVariables"]);
            showNazev = ((CheckBox)ControlDictionary["showNazev"]);
            showUplnyNazev = ((CheckBox)ControlDictionary["showUplnyNazev"]);
            showDatovyTyp = ((CheckBox)ControlDictionary["showDatovyTyp"]);

            ReportDesignerProperties properties = ReportDesignerProperties.Instance;
            showToolTip.Checked = properties.ShowToolTip;
            showScripts.Checked = properties.ShowScripts;
            showTextAlign.Checked = properties.ShowTextAlign;
            showTextFont.Checked = properties.ShowTextFont;
            showSize.Checked = properties.ShowSize;
            showImageSize.Checked = properties.ShowImageSize;
            showTablePadding.Checked = properties.ShowTablePadding;
            showVariables.Checked = properties.ShowVariables;
            showNazev.Checked = properties.ShowNazev;
            showUplnyNazev.Checked = properties.ShowUplnyNazev;
            showDatovyTyp.Checked = properties.ShowDatovyTyp;

            tbDuration.Text = properties.Duration.ToString();
            tbDuration.TextChanged += textChanged;


            showTablePadding.Enabled = showVariables.Enabled = showImageSize.Enabled = false;

            if (!showToolTip.Checked)
                checkedChanged(showToolTip, new EventArgs());
        }

        void textChanged(object sender, EventArgs e)
        {
            if (!int.TryParse(tbDuration.Text, out int value) || value < 0)
                errorProvider.SetError(tbDuration, string.Format(string.Join(" ", GResources.GetResourceText(29450464), "'{0}'", GResources.GetResourceText(29450080)), tbDuration.Text));
            else if (value <= 500)
                errorProvider.SetError(tbDuration, string.Format(string.Join(" ", GResources.GetResourceText(29450466), "'{0}'", GResources.GetResourceText(29450465)), tbDuration.Text)); //RC 29450466 : Berte na vědomí, že hodnota
            else errorProvider.SetError(tbDuration, "");
        }

        void checkedChanged(object sender, EventArgs e)
        {
            showScripts.Enabled = showTextAlign.Enabled = showTextFont.Enabled = showSize.Enabled = /*showImageSize.Enabled = showTablePadding.Enabled = showVariables.Enabled = */
                showNazev.Enabled = showUplnyNazev.Enabled = showDatovyTyp.Enabled = showToolTip.Checked;
        }

        /// <summary>
        /// Uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public override bool StorePanelContents()
        {
            ReportDesignerProperties properties = ReportDesignerProperties.Instance;
            properties.ShowToolTip = showToolTip.Checked;
            properties.ShowScripts = showScripts.Checked;

            properties.ShowTextAlign = showTextAlign.Checked;
            properties.ShowTextFont = showTextFont.Checked;
            properties.ShowSize = showSize.Checked;
            properties.ShowImageSize = showImageSize.Checked;
            properties.ShowTablePadding = showTablePadding.Checked;
            properties.ShowVariables = showVariables.Checked;
            properties.ShowNazev = showNazev.Checked;
            properties.ShowUplnyNazev = showUplnyNazev.Checked;
            properties.ShowDatovyTyp = showDatovyTyp.Checked;

            int.TryParse(tbDuration.Text, out int duration);
            properties.Duration = duration;

            return true;
        }

        void InitializeComponent()
        {
            SuspendLayout();
            // 
            // GeneralToolTipPanel
            // 
            Name = "GeneralToolTipPanel";
            ResumeLayout(false);
        }

    }
}
