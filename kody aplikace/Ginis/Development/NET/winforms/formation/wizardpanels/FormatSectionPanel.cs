//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FormatSectionPanel.cs                  </Name>
//    <Description> panel průvodce vytvořením nové grafické sestavy             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2013-07-19                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;
using Gordic.General;

namespace Gordic.GFE.WinClient.FormationWizard
{
    /// <summary>
    /// panel průvodce vytvořením nové grafické sestavy
    /// </summary>
    class FormatSectionPanel : AbstractWizardPanel
    {
        private GroupBox groupBox1;
        private RadioButton radioButton2;
        private RadioButton radioButton1;
    
        /// <summary>
        /// konstruktor
        /// </summary>
        public FormatSectionPanel()
        {
            InitializeComponent();
            Init();
        }

        void Init()
        {
            if (ReportDesignerProperties.Instance.AlfAutoSaveFormat)
            {
                radioButton1.Checked = ReportDesignerProperties.Instance.AlfSaveFormatOld;
                radioButton2.Checked = ReportDesignerProperties.Instance.AlfSaveFormatNew;
            }
            else
                radioButton1.Checked = true;
            radioButton1.CheckedChanged += checkedChanged;
            radioButton2.CheckedChanged += checkedChanged;
        }

        void checkedChanged(object sender, EventArgs e)
        {
            EnableFinish = string.IsNullOrEmpty(NextWizardPanelID);
        }

        void InitializeComponent()
        {
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.radioButton2 = new System.Windows.Forms.RadioButton();
            this.radioButton1 = new System.Windows.Forms.RadioButton();
            this.groupBox1.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.radioButton2);
            this.groupBox1.Controls.Add(this.radioButton1);
            this.groupBox1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.groupBox1.Location = new System.Drawing.Point(0, 0);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(135, 73);
            this.groupBox1.TabIndex = 4;
            this.groupBox1.TabStop = false;
            // 
            // radioButton2
            // 
            this.radioButton2.AutoSize = true;
            this.radioButton2.ImeMode = System.Windows.Forms.ImeMode.NoControl;
            this.radioButton2.Location = new System.Drawing.Point(7, 44);
            this.radioButton2.Name = "radioButton2";
            this.radioButton2.Size = new System.Drawing.Size(96, 17);
            this.radioButton2.TabIndex = 1;
            this.radioButton2.Text = GResources.GetResourceText(29450598) + " *.alfx"; //RC 29450598 : použit formát
            this.radioButton2.UseVisualStyleBackColor = true;
            // 
            // radioButton1
            // 
            this.radioButton1.AutoSize = true;
            this.radioButton1.Checked = true;
            this.radioButton1.ImeMode = System.Windows.Forms.ImeMode.NoControl;
            this.radioButton1.Location = new System.Drawing.Point(7, 20);
            this.radioButton1.Name = "radioButton1";
            this.radioButton1.Size = new System.Drawing.Size(91, 17);
            this.radioButton1.TabIndex = 0;
            this.radioButton1.TabStop = true;
            this.radioButton1.Text = GResources.GetResourceText(29450598) + " *.alf"; //RC 29450598 : použit formát
            this.radioButton1.UseVisualStyleBackColor = true;
            // 
            // FormatSectionPanel
            // 
            this.Controls.Add(this.groupBox1);
            this.Name = "FormatSectionPanel";
            this.Size = new System.Drawing.Size(135, 73);
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.ResumeLayout(false);

        }

        /// <summary>
        /// Přetížení kvůli ukončení průvodce s parametrem Finish
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public override bool ReceiveDialogMessage(DialogMessage message)
        {
            switch (message)
            {
                case DialogMessage.finish:
                    if (radioButton1.Checked)
                        StringParser.Properties["Extension"] = ".alf";
                    else
                        StringParser.Properties["Extension"] = ".alfx";
                    foreach (var item in Wizard.WizardPanels)
                        if (item is DefaultDialogPanelDescriptor)
                            if ((item as DefaultDialogPanelDescriptor).DialogPanel != this)
                            {
                                AbstractWizardPanel wp = (item as DefaultDialogPanelDescriptor).DialogPanel as AbstractWizardPanel;
                                if (wp != null)
                                {
                                    wp.FinishPanel();
                                    break;
                                }
                            }
                    break;
                default:
                    break;
            }

            return true;
        }

    }
}
