//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.InputBox.cs                              </Name>
//    <Description> Třída slouží k zobrazení vstupního pole.                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Drawing;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.GFE.Parsers.WinForms
{
    /// <summary>
    /// Třída slouží k zobrazení vstupního pole.
    /// </summary>
    sealed class InputBox : System.Windows.Forms.Form
    {
        private System.Windows.Forms.Label label;
        private System.Windows.Forms.Button cancelButton;
        private System.Windows.Forms.TextBox textBox;
        private System.Windows.Forms.Button acceptButton;

        public InputBox(string text, string caption, string defaultValue)
        {
            InitializeComponent();

            text = StringParser.Parse(text);
            this.Text = StringParser.Parse(caption);
            acceptButton.Text = GResources.GetResourceText(29450481); //RC 29450481 : OK
            cancelButton.Text = GResources.GetResourceText(29450402); //RC 29450402 : Zrušit

            Size size;
            using (Graphics g = this.CreateGraphics())
            {
                Rectangle screen = Screen.PrimaryScreen.WorkingArea;
                SizeF sizeF = g.MeasureString(text, label.Font, screen.Width - 20);
                size = sizeF.ToSize();
                size.Width += 4;
            }
            if (size.Width < 200)
                size.Width = 200;
            Size clientSize = this.ClientSize;
            clientSize.Width += size.Width - label.Width;
            clientSize.Height += size.Height - label.Height;
            this.ClientSize = clientSize;
            label.Text = text;
            textBox.Text = defaultValue;
            this.DialogResult = DialogResult.Cancel;
        }

        #region Windows Forms Designer generated code
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(InputBox));
            this.acceptButton = new System.Windows.Forms.Button();
            this.textBox = new System.Windows.Forms.TextBox();
            this.cancelButton = new System.Windows.Forms.Button();
            this.label = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // acceptButton
            // 
            resources.ApplyResources(this.acceptButton, "acceptButton");
            this.acceptButton.Name = "acceptButton";
            this.acceptButton.Click += new System.EventHandler(this.AcceptButtonClick);
            // 
            // textBox
            // 
            resources.ApplyResources(this.textBox, "textBox");
            this.textBox.Name = "textBox";
            // 
            // cancelButton
            // 
            resources.ApplyResources(this.cancelButton, "cancelButton");
            this.cancelButton.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.cancelButton.Name = "cancelButton";
            this.cancelButton.Click += new System.EventHandler(this.CancelButtonClick);
            // 
            // label
            // 
            resources.ApplyResources(this.label, "label");
            this.label.Name = "label";
            this.label.UseMnemonic = false;
            // 
            // InputBox
            // 
            this.AcceptButton = this.acceptButton;
            this.CancelButton = this.cancelButton;
            resources.ApplyResources(this, "$this");
            this.Controls.Add(this.textBox);
            this.Controls.Add(this.label);
            this.Controls.Add(this.cancelButton);
            this.Controls.Add(this.acceptButton);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "InputBox";
            this.ShowInTaskbar = false;
            this.ResumeLayout(false);
            this.PerformLayout();

        }
        #endregion

        void CancelButtonClick(object sender, System.EventArgs e)
        {
            result = null;
            this.Close();
        }

        void AcceptButtonClick(object sender, System.EventArgs e)
        {
            this.DialogResult = DialogResult.OK;
            result = textBox.Text;
            this.Close();
        }

        string result;
        /// <summary>
        /// výsledek dialogového okna
        /// </summary>
        public string Result { get { return result; } }
    }
}
