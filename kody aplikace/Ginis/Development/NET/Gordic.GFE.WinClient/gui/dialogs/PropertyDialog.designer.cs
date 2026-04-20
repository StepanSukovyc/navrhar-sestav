namespace Gordic.GFE.WinClient.Gui
{
    partial class PropertyDialog
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(PropertyDialog));
            this.splitContainerForm = new System.Windows.Forms.SplitContainer();
            this.pContent = new System.Windows.Forms.Panel();
            this.acceptButton = new System.Windows.Forms.Button();
            this.defaultButton = new System.Windows.Forms.Button();
            this.cancelButton = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.splitContainerForm)).BeginInit();
            this.splitContainerForm.Panel1.SuspendLayout();
            this.splitContainerForm.Panel2.SuspendLayout();
            this.splitContainerForm.SuspendLayout();
            this.SuspendLayout();
            // 
            // splitContainerForm
            // 
            resources.ApplyResources(this.splitContainerForm, "splitContainerForm");
            this.splitContainerForm.FixedPanel = System.Windows.Forms.FixedPanel.Panel2;
            this.splitContainerForm.Name = "splitContainerForm";
            // 
            // splitContainerForm.Panel1
            // 
            this.splitContainerForm.Panel1.Controls.Add(this.pContent);
            resources.ApplyResources(this.splitContainerForm.Panel1, "splitContainerForm.Panel1");
            // 
            // splitContainerForm.Panel2
            // 
            this.splitContainerForm.Panel2.Controls.Add(this.acceptButton);
            this.splitContainerForm.Panel2.Controls.Add(this.defaultButton);
            this.splitContainerForm.Panel2.Controls.Add(this.cancelButton);
            // 
            // pContent
            // 
            resources.ApplyResources(this.pContent, "pContent");
            this.pContent.Name = "pContent";
            // 
            // acceptButton
            // 
            resources.ApplyResources(this.acceptButton, "acceptButton");
            this.acceptButton.Name = "acceptButton";
            this.acceptButton.UseVisualStyleBackColor = true;
            this.acceptButton.Click += new System.EventHandler(this.AcceptEvent);
            // 
            // defaultButton
            // 
            resources.ApplyResources(this.defaultButton, "defaultButton");
            this.defaultButton.Name = "defaultButton";
            this.defaultButton.UseVisualStyleBackColor = true;
            this.defaultButton.Click += new System.EventHandler(this.DefaultEvent);
            // 
            // cancelButton
            // 
            resources.ApplyResources(this.cancelButton, "cancelButton");
            this.cancelButton.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.cancelButton.Name = "cancelButton";
            this.cancelButton.UseVisualStyleBackColor = true;
            this.cancelButton.Click += new System.EventHandler(this.CancelEvent);
            // 
            // PropertyDialog
            // 
            resources.ApplyResources(this, "$this");
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.splitContainerForm);
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "PropertyDialog";
            this.splitContainerForm.Panel1.ResumeLayout(false);
            this.splitContainerForm.Panel2.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.splitContainerForm)).EndInit();
            this.splitContainerForm.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button defaultButton;
        private System.Windows.Forms.Button cancelButton;
        private System.Windows.Forms.Button acceptButton;
        private System.Windows.Forms.Panel pContent;
        private System.Windows.Forms.SplitContainer splitContainerForm;
    }
}
