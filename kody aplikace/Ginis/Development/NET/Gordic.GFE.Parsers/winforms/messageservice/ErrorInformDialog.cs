//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.SaveErrorInformDialog.cs                 </Name>
//    <Description> Uložení                                                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.GFE.Parsers.WinForms
{
    /// <summary>
    /// Uložení
    /// </summary>
    sealed class ErrorInformDialog : System.Windows.Forms.Form
    {
        System.Windows.Forms.Label descriptionLabel;
        System.Windows.Forms.TextBox descriptionTextBox;
        System.Windows.Forms.Button exceptionButton;
        System.Windows.Forms.Button okButton;
        readonly string displayMessage;
        Exception exceptionGot;

        public ErrorInformDialog(string fileName, string message, string dialogName, Exception exceptionGot)
        {
            this.Text = StringParser.Parse(dialogName);
            this.InitializeComponent();

            displayMessage = StringParser.Parse(message, new string[,] {
				{"FileName", fileName},
				{"Path",     Path.GetDirectoryName(fileName)},
				{"FileNameWithoutPath", Path.GetFileName(fileName)},
				{"Exception", exceptionGot.GetType().FullName},
			});
            descriptionTextBox.Lines = this.displayMessage.Split('\n');

            this.exceptionGot = exceptionGot;
        }

        public ErrorInformDialog(string title, string message, Exception exceptionGot)
        {
            this.Text = StringParser.Parse(title);
            this.InitializeComponent();

            displayMessage = StringParser.Parse(message, new string[,] {
				{"Exception", exceptionGot.GetType().FullName},
			});
            descriptionTextBox.Lines = this.displayMessage.Split('\n');

            this.exceptionGot = exceptionGot;
        }

        void ShowException(object sender, EventArgs e)
        {
            MessageService.ShowMessage(exceptionGot.ToString(), GResources.GetResourceText(29450486)); //RC 29450486 : Výjímka
        }

        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);
            this.okButton.DialogResult = DialogResult.OK;
        }

        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(ErrorInformDialog));
            this.descriptionLabel = new System.Windows.Forms.Label();
            this.descriptionTextBox = new System.Windows.Forms.TextBox();
            this.exceptionButton = new System.Windows.Forms.Button();
            this.okButton = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // descriptionLabel
            // 
            resources.ApplyResources(this.descriptionLabel, "descriptionLabel");
            this.descriptionLabel.Name = "descriptionLabel";
            // 
            // descriptionTextBox
            // 
            resources.ApplyResources(this.descriptionTextBox, "descriptionTextBox");
            this.descriptionTextBox.Name = "descriptionTextBox";
            this.descriptionTextBox.ReadOnly = true;
            // 
            // exceptionButton
            // 
            resources.ApplyResources(this.exceptionButton, "exceptionButton");
            this.exceptionButton.Name = "exceptionButton";
            this.exceptionButton.Click += new System.EventHandler(this.ShowException);
            // 
            // okButton
            // 
            resources.ApplyResources(this.okButton, "okButton");
            this.okButton.Name = "okButton";
            // 
            // ErrorInformDialog
            // 
            resources.ApplyResources(this, "$this");
            this.Controls.Add(this.descriptionLabel);
            this.Controls.Add(this.descriptionTextBox);
            this.Controls.Add(this.exceptionButton);
            this.Controls.Add(this.okButton);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "ErrorInformDialog";
            this.ShowInTaskbar = false;
            this.ResumeLayout(false);
            this.PerformLayout();

        }
    }
}
