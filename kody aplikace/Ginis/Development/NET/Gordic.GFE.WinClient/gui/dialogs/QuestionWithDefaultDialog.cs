//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.QuestionWithDefaultDialog.cs           </Name>
//    <Description> dotazovací dialog s možnosti pamatování výběru              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-22                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.Gui.Dialogs
{
    /// <summary>
    /// dotazovací dialog s možnosti pamatování výběru
    /// </summary>
    partial class QuestionWithDefaultDialog : Form
    {
        /// <summary>
        /// konstruktor dialogového okna
        /// </summary>
        public QuestionWithDefaultDialog()
        {
            InitializeComponent();
        }

        /// <exclude/>
        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);
            if (!DesignMode)
                Icon = WinFormsResourceService.GetIcon("Icons__Gin__dialog_dotaz");
        }
        /// <summary>
        /// přidání ovladače na panel
        /// </summary>
        public void AddControl(IQuestionPanel question)
        {
            if (question is Control)
            {
                controlPanel.Controls.Clear();
                this.OnResize(question as Control);
                controlPanel.Controls.Add(question as Control);
                (question as Control).Dock = DockStyle.Fill;
                question.LoadPanel();
                checkBox1.Checked = question.DefaultValue;
                this.Text = question.Title;
            }
        }

        private void OnResize(Control control)
        {
            if (control == null)
                return;

            this.Width += control.Width - controlPanel.Width;
            this.Height += control.Height - controlPanel.Height;
        }

        void BtnOk_Click(object sender, EventArgs e)
        {
            DialogResult = System.Windows.Forms.DialogResult.OK;

            foreach (var item in controlPanel.Controls)
                if (item is IMementoCapable)
                    (item as IMementoCapable).CreateMemento();

            Close();
        }

        void CheckBox1_CheckedChanged(object sender, EventArgs e)
        {
            foreach (var item in controlPanel.Controls)
                if (item is IQuestionPanel)
                    (item as IQuestionPanel).DefaultValue = (sender as CheckBox).Checked;
        }
    }
}
