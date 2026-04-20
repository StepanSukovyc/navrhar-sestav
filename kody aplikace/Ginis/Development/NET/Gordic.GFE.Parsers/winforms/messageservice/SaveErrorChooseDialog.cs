//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.SaveErrorChooseDialog.cs                 </Name>
//    <Description> Zobrazení dialogu na změnu                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;
using System.IO;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.GFE.Parsers.WinForms
{
    /// <summary>
    /// Zobrazení dialogu na změnu
    /// </summary>
    sealed class SaveErrorChooseDialog : System.Windows.Forms.Form
    {
        Button retryButton;
        Button ignoreButton;
        Label descriptionLabel;
        TextBox descriptionTextBox;
        Button exceptionButton;
        Button chooseLocationButton;
        readonly string displayMessage;
        Exception exceptionGot;

        public SaveErrorChooseDialog(string fileName, string message, string dialogName, Exception exceptionGot, bool chooseLocationEnabled)
        {
            this.Text = StringParser.Parse(dialogName);
            this.InitializeComponents(chooseLocationEnabled);

            displayMessage = StringParser.Parse(message, new string[,] {
				{"FileName", fileName},
				{"Path",     Path.GetDirectoryName(fileName)},
				{"FileNameWithoutPath", Path.GetFileName(fileName)},
				{"Exception", exceptionGot.GetType().FullName},
			});

            descriptionTextBox.Lines = StringParser.Parse(this.displayMessage).Split('\n');

            this.exceptionGot = exceptionGot;
        }

        void ShowException(object sender, EventArgs e)
        {
            MessageService.ShowMessage(exceptionGot.ToString(), GResources.GetResourceText(29450486)); //RC 29450486 : Výjímka
        }

        private void InitializeComponents(bool chooseLocationEnabled)
        {
            this.ClientSize = new Size(508, 320);
            this.SuspendLayout();
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "SaveErrorChooseDialog";
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            this.ShowInTaskbar = false;
            this.StartPosition = FormStartPosition.CenterScreen;

            this.descriptionLabel = new Label
            {
                Name = "descriptionLabel",
                Location = new Point(8, 8),
                Size = new Size(584, 24),
                TabIndex = 3,
                Anchor = (System.Windows.Forms.AnchorStyles.Top
                        | (System.Windows.Forms.AnchorStyles.Left | System.Windows.Forms.AnchorStyles.Right)),
                TextAlign = System.Drawing.ContentAlignment.BottomLeft,
                Text = GResources.GetResourceText(29450506) //RC 29450506 : Popis
            };
            this.Controls.Add(descriptionLabel);

            this.descriptionTextBox = new TextBox
            {
                Multiline = true,
                Size = new Size(584, 237),
                Location = new Point(8, 40),
                TabIndex = 2,
                Anchor = (System.Windows.Forms.AnchorStyles.Top
                        | (System.Windows.Forms.AnchorStyles.Bottom
                        | (System.Windows.Forms.AnchorStyles.Left | System.Windows.Forms.AnchorStyles.Right))),
                ReadOnly = true,
                Name = "descriptionTextBox"
            };
            this.Controls.Add(descriptionTextBox);

            this.retryButton = new Button
            {
                DialogResult = System.Windows.Forms.DialogResult.Retry,
                Name = "retryButton",
                TabIndex = 5,
                Anchor = (System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right),
                Text = GResources.GetResourceText(29450507), //RC 29450507 : Opakovat
                Size = new Size(110, 27),
                Location = new Point(28, 285)
            };
            this.Controls.Add(retryButton);

            this.ignoreButton = new Button
            {
                Name = "ignoreButton",
                DialogResult = System.Windows.Forms.DialogResult.Ignore,
                TabIndex = 4,
                Anchor = (System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right),
                Text = GResources.GetResourceText(29450508), //RC 29450508 : Ignorovat
                Size = new Size(110, 27),
                Location = new Point(146, 285)
            };
            this.Controls.Add(ignoreButton);

            this.exceptionButton = new Button
            {
                TabIndex = 1,
                Anchor = (System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right),
                Name = "exceptionButton",
                Text = GResources.GetResourceText(29450509), //RC 29450509 : Zobrazit výjímku
                Size = new Size(110, 27),
                Location = new Point(382, 285)
            };
            this.exceptionButton.Click += new EventHandler(ShowException);
            this.Controls.Add(exceptionButton);

            if (chooseLocationEnabled)
            {
                this.chooseLocationButton = new Button
                {
                    Name = "chooseLocationButton",
                    DialogResult = System.Windows.Forms.DialogResult.OK,
                    TabIndex = 0,
                    Anchor = (System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right),
                    Text = GResources.GetResourceText(29450510), //RC 29450510 : Vyberte umístění
                    Size = new Size(110, 27),
                    Location = new Point(264, 285)
                };
            }

            this.Controls.Add(chooseLocationButton);

            this.ResumeLayout(false);
            this.Size = new Size(526, 262);
        }

        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(SaveErrorChooseDialog));
            this.SuspendLayout();
            // 
            // SaveErrorChooseDialog
            // 
            resources.ApplyResources(this, "$this");
            this.Name = "SaveErrorChooseDialog";
            this.ResumeLayout(false);

        }
    }
}
