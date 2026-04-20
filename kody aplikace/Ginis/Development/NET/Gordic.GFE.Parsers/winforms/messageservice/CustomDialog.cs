//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.CustomDialog.cs                          </Name>
//    <Description> vlastní dialog                                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.WinForms
{
    /// <summary>
    /// vlastní dialog
    /// </summary>
    sealed class CustomDialog : System.Windows.Forms.Form
    {
        System.Windows.Forms.Label label;
        System.Windows.Forms.Panel panel;
        readonly int acceptButton;
        readonly int cancelButton;
        int result = -1;

        /// <summary>
        /// Index stisknutého tlačítka.
        /// </summary>
        public int Result { get { return result; } }

        public CustomDialog(string caption, string message, int acceptButton, int cancelButton, string[] buttonLabels)
        {
            this.SuspendLayout();
            InitializeComponent();

            this.Icon = null;
            this.acceptButton = acceptButton;
            this.cancelButton = cancelButton;
            this.StartPosition = FormStartPosition.CenterScreen;

            message = StringParser.Parse(message);
            this.Text = StringParser.Parse(caption);

            using (Graphics g = this.CreateGraphics())
            {
                Rectangle screen = Screen.PrimaryScreen.WorkingArea;
                SizeF size = g.MeasureString(message, label.Font, screen.Width - 20);
                Size clientSize = size.ToSize();
                Button[] buttons = new Button[buttonLabels.Length];
                int[] positions = new int[buttonLabels.Length];
                int pos = 0;
                for (int i = 0; i < buttons.Length; i++)
                {
                    Button newButton = new Button
                    {
                        FlatStyle = FlatStyle.System,
                        Tag = i
                    };
                    string buttonLabel = StringParser.Parse(buttonLabels[i]);
                    newButton.Text = buttonLabel;
                    newButton.Click += new EventHandler(ButtonClick);
                    SizeF buttonSize = g.MeasureString(buttonLabel, newButton.Font);
                    newButton.Width = Math.Max(newButton.Width, ((int)Math.Ceiling(buttonSize.Width / 8.0) + 1) * 8);
                    positions[i] = pos;
                    buttons[i] = newButton;
                    pos += newButton.Width + 4;
                }
                if (acceptButton >= 0)
                    AcceptButton = buttons[acceptButton];
                if (cancelButton >= 0)
                    CancelButton = buttons[cancelButton];

                pos += 4; // mezera mezí tlačítky

                if (pos > clientSize.Width)
                    clientSize.Width = pos;
                clientSize.Height += panel.Height + 6;
                this.ClientSize = clientSize;
                int start = (clientSize.Width - pos) / 2;
                for (int i = 0; i < buttons.Length; i++)
                    buttons[i].Location = new Point(start + positions[i], 4);
                panel.Controls.AddRange(buttons);
            }
            label.Text = message;

            this.ResumeLayout(false);
        }

        protected override void OnKeyDown(KeyEventArgs e)
        {
            if (cancelButton == -1 && e.KeyCode == Keys.Escape)
                this.Close();
        }

        void ButtonClick(object sender, EventArgs e)
        {
            result = (int)((Control)sender).Tag;
            this.Close();
        }

        void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(CustomDialog));
            this.panel = new System.Windows.Forms.Panel();
            this.label = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // panel
            // 
            resources.ApplyResources(this.panel, "panel");
            this.panel.Name = "panel";
            // 
            // label
            // 
            resources.ApplyResources(this.label, "label");
            this.label.FlatStyle = System.Windows.Forms.FlatStyle.System;
            this.label.Name = "label";
            this.label.UseMnemonic = false;
            // 
            // CustomDialog
            // 
            resources.ApplyResources(this, "$this");
            this.Controls.Add(this.label);
            this.Controls.Add(this.panel);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            this.KeyPreview = true;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "CustomDialog";
            this.ShowInTaskbar = false;
            this.ResumeLayout(false);

        }
    }
}
