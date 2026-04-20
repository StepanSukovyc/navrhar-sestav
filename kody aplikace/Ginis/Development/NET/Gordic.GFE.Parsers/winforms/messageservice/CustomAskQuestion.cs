//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.CustomAskQuestion.cs                     </Name>
//    <Description> Dotazovací dialog se zaškrávatkem Přiště se nedotazovat     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-15                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.GFE.Parsers.WinForms
{
    /// <summary>
    /// Dotazovací dialog se zaškrávatkem Přiště se nedotazovat
    /// </summary>
    sealed class CustomAskQuestion : Form
    {
        System.Windows.Forms.Label label;
        System.Windows.Forms.Panel panel;
        CheckBox box;
        readonly int acceptButton;
        readonly int cancelButton;
        DialogResult result = DialogResult.Yes;
        bool asksNext = true;
        /// <summary>
        /// Index stisknutého tlačítka.
        /// </summary>
        public DialogResult Result { get { return result; } }
        /// <summary>
        /// Ptat se i příště
        /// </summary>
        public bool AsksNext { get { return asksNext; } }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="caption">Titulek okna</param>
        /// <param name="question">Zpráva (dotaz)</param>
        public CustomAskQuestion(string question, string caption)
        {
            this.SuspendLayout();
            InitializeComponent();

            this.Icon = null;
            this.acceptButton = 0;
            this.cancelButton = 1;

            question = StringParser.Parse(question);
            this.Text = StringParser.Parse(caption);

            using (Graphics g = this.CreateGraphics())
            {
                Rectangle screen = Screen.PrimaryScreen.WorkingArea;
                SizeF size = g.MeasureString(question, label.Font, screen.Width - 20);
                Size clientSize = new Size((int)size.Width + 50, (int)size.Height + 8);
                Button[] buttons = new Button[2];
                int[] positions = new int[2];
                int pos = 0;
                for (int i = 0; i < 2; i++)
                {
                    Button newButton = new Button
                    {
                        FlatStyle = FlatStyle.System,
                        Tag = i
                    };
                    string buttonLabel = i == 0 ? GResources.GetResourceText(29450503) : GResources.GetResourceText(29450504); //RC 29450504 : Ne
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
            label.Text = question;
            panel.Controls.Add(box);
            this.ResumeLayout(false);
        }

        protected override void OnKeyDown(KeyEventArgs e)
        {
            if (cancelButton == -1 && e.KeyCode == Keys.Escape)
                this.Close();
        }

        void ButtonClick(object sender, EventArgs e)
        {
            result = (int)((Control)sender).Tag == 0 ? DialogResult.Yes : DialogResult.No;
            this.Close();
        }

        void InitializeComponent()
        {
            this.panel = new System.Windows.Forms.Panel();
            this.label = new System.Windows.Forms.Label();
            // 
            // panel
            // 
            this.panel.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.panel.Location = new System.Drawing.Point(4, 80);
            this.panel.Name = "panel";
            this.panel.Size = new System.Drawing.Size(266, 60);
            this.panel.TabIndex = 0;
            // 
            // label
            // 
            this.label.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label.FlatStyle = System.Windows.Forms.FlatStyle.System;
            this.label.TextAlign = ContentAlignment.MiddleCenter;
            this.label.Location = new System.Drawing.Point(4, 4);
            this.label.Name = "label";
            this.label.Size = new System.Drawing.Size(266, 76);
            this.label.TabIndex = 1;
            this.label.UseMnemonic = false;
            //
            // box
            //
            this.box = new CheckBox
            {
                Dock = DockStyle.Bottom,
                TabIndex = 1,
                Text = GResources.GetResourceText(29450505) + ' ' //RC 29450505 : u dalších se neptat
            };
            this.box.CheckedChanged += delegate { asksNext = !box.Checked; };
            // 
            // CustomDialog
            // 
            this.ClientSize = new System.Drawing.Size(274, 112);
            this.Controls.Add(this.label);
            this.Controls.Add(this.panel);
            this.DockPadding.Left = 4;
            this.DockPadding.Right = 4;
            this.DockPadding.Top = 4;
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            this.ShowInTaskbar = false;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "CustomAskQuestion";
            this.KeyPreview = true;
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterParent;
            this.Text = "CustomAskQuestion";
        }
    }
}
