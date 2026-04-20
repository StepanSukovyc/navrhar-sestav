//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AddXmlNodeDialog.cs                    </Name>
//    <Description> Základní třída AddElementDialog a AddAttributeDialog.       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System;
using System.Collections.Generic;
using System.Windows.Forms;
using System.Xml;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Základní třída AddElementDialog a AddAttributeDialog.
    /// </summary>
    public class AddXmlNodeDialog : System.Windows.Forms.Form, IAddXmlNodeDialog
    {
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public AddXmlNodeDialog()
            : this(new string[0])
        {
        }

        /// <summary>
        /// Vytvoření dialogu a přidání specifických názvů do seznamu
        /// </summary>
        /// <param name="names">Přidávané názvy</param>
        public AddXmlNodeDialog(string[] names)
        {
            InitializeComponent();
            InitStrings();
            if (names.Length > 0)
                AddNames(names);
            else
                RemoveNamesListBox();
        }

        /// <exclude/>
        public string[] GetNames()
        {
            List<string> names = new List<string>();
            foreach (string name in namesListBox.SelectedItems)
                names.Add(name);

            string customName = customNameTextBox.Text.Trim();
            if (customName.Length > 0)
                names.Add(customName);
            return names.ToArray();
        }

        /// <summary>
        /// Získání chyby
        /// </summary>
        public string GetError()
        {
            return errorProvider.GetError(customNameTextBox);
        }

        /// <summary>
        /// Text štítku
        /// </summary>
        public string CustomNameLabelText
        {
            get { return customNameTextBoxLabel.Text; }
            set { customNameTextBoxLabel.Text = value; }
        }

        /// <exclude/>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
                if (components != null)
                    components.Dispose();
            base.Dispose(disposing);
        }

        /// <exclude/>
        protected void NamesListBoxSelectedIndexChanged(object sender, EventArgs e)
        {
            UpdateOkButtonState();
        }

        /// <exclude/>
        protected void CustomNameTextBoxTextChanged(object sender, EventArgs e)
        {
            UpdateOkButtonState();
        }

        #region Windows Forms Designer generated code

        void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(AddXmlNodeDialog));
            this.namesListBox = new System.Windows.Forms.ListBox();
            this.errorProvider = new System.Windows.Forms.ErrorProvider(this.components);
            this.bottomPanel = new System.Windows.Forms.Panel();
            this.customNameTextBoxLabel = new System.Windows.Forms.Label();
            this.customNameTextBox = new System.Windows.Forms.TextBox();
            this.cancelButton = new System.Windows.Forms.Button();
            this.okButton = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.errorProvider)).BeginInit();
            this.bottomPanel.SuspendLayout();
            this.SuspendLayout();
            // 
            // namesListBox
            // 
            resources.ApplyResources(this.namesListBox, "namesListBox");
            this.namesListBox.FormattingEnabled = true;
            this.namesListBox.Name = "namesListBox";
            this.namesListBox.SelectionMode = System.Windows.Forms.SelectionMode.MultiExtended;
            this.namesListBox.Sorted = true;
            this.namesListBox.SelectedIndexChanged += new System.EventHandler(this.NamesListBoxSelectedIndexChanged);
            // 
            // errorProvider
            // 
            this.errorProvider.ContainerControl = this;
            // 
            // bottomPanel
            // 
            resources.ApplyResources(this.bottomPanel, "bottomPanel");
            this.bottomPanel.Controls.Add(this.customNameTextBoxLabel);
            this.bottomPanel.Controls.Add(this.customNameTextBox);
            this.bottomPanel.Controls.Add(this.cancelButton);
            this.bottomPanel.Controls.Add(this.okButton);
            this.bottomPanel.Name = "bottomPanel";
            // 
            // customNameTextBoxLabel
            // 
            resources.ApplyResources(this.customNameTextBoxLabel, "customNameTextBoxLabel");
            this.customNameTextBoxLabel.Name = "customNameTextBoxLabel";
            // 
            // customNameTextBox
            // 
            resources.ApplyResources(this.customNameTextBox, "customNameTextBox");
            this.customNameTextBox.Name = "customNameTextBox";
            this.customNameTextBox.TextChanged += new System.EventHandler(this.CustomNameTextBoxTextChanged);
            // 
            // cancelButton
            // 
            resources.ApplyResources(this.cancelButton, "cancelButton");
            this.cancelButton.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.cancelButton.Name = "cancelButton";
            this.cancelButton.UseVisualStyleBackColor = true;
            // 
            // okButton
            // 
            resources.ApplyResources(this.okButton, "okButton");
            this.okButton.DialogResult = System.Windows.Forms.DialogResult.OK;
            this.okButton.Name = "okButton";
            this.okButton.UseVisualStyleBackColor = true;
            // 
            // AddXmlNodeDialog
            // 
            this.AcceptButton = this.okButton;
            this.CancelButton = this.cancelButton;
            resources.ApplyResources(this, "$this");
            this.Controls.Add(this.bottomPanel);
            this.Controls.Add(this.namesListBox);
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "AddXmlNodeDialog";
            this.ShowIcon = false;
            this.ShowInTaskbar = false;
            ((System.ComponentModel.ISupportInitialize)(this.errorProvider)).EndInit();
            this.bottomPanel.ResumeLayout(false);
            this.bottomPanel.PerformLayout();
            this.ResumeLayout(false);

        }
        private System.Windows.Forms.Panel bottomPanel;
        private System.ComponentModel.IContainer components;
        private System.Windows.Forms.ErrorProvider errorProvider;
        private System.Windows.Forms.Button cancelButton;
        private System.Windows.Forms.Button okButton;
        private System.Windows.Forms.TextBox customNameTextBox;
        private System.Windows.Forms.Label customNameTextBoxLabel;
        private System.Windows.Forms.ListBox namesListBox;

        #endregion

        void AddNames(string[] names)
        {
            foreach (string name in names)
                namesListBox.Items.Add(name);
        }

        void UpdateOkButtonState()
        {
            okButton.Enabled = IsOkButtonEnabled;
        }

        bool IsItemSelected
        {
            get
            {
                return namesListBox.SelectedIndex >= 0;
            }
        }

        bool IsOkButtonEnabled
        {
            get
            {
                return IsItemSelected || ValidateCustomName();
            }
        }

        bool ValidateCustomName()
        {
            string name = customNameTextBox.Text.Trim();
            if (name.Length > 0)
                try
                {
                    VerifyName(name);
                    errorProvider.Clear();
                    return true;
                }
                catch (XmlException ex)
                {
                    errorProvider.SetError(customNameTextBox, ex.Message);
                }
            return false;
        }

        void VerifyName(string name)
        {
            string[] parts = name.Split(new char[] { ':' }, 2);
            if (parts.Length == 1)
            {
                XmlConvert.VerifyName(name);
                return;
            }

            string firstPart = parts[0].Trim();
            string secondPart = parts[1].Trim();
            if (firstPart.Length > 0 && secondPart.Length > 0)
            {
                XmlConvert.VerifyNCName(firstPart);
                XmlConvert.VerifyNCName(secondPart);
            }
            else
                XmlConvert.VerifyNCName(name);
        }

        void InitStrings()
        {
            okButton.Text = GResources.GetResourceText(29450223); //RC 29450223 : OK
            cancelButton.Text = GResources.GetResourceText(29450224); //RC 29450224 : Zrušit
        }

        void RemoveNamesListBox()
        {
            using (namesListBox)
            {
                Controls.Remove(namesListBox);

                MinimumSize = System.Drawing.Size.Empty;
                ClientSize = bottomPanel.Size;
                MinimumSize = Size;

                bottomPanel.Dock = DockStyle.Fill;
            }
        }
    }
}
