namespace Gordic.GFE.WinClient.AddIns.Editors.Office
{
    partial class InsertOfficeRegionQuestionPanel
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

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(InsertOfficeRegionQuestionPanel));
            this.label1 = new System.Windows.Forms.Label();
            this.cbFoot = new System.Windows.Forms.CheckBox();
            this.cbBody = new System.Windows.Forms.CheckBox();
            this.cbHead = new System.Windows.Forms.CheckBox();
            this.SuspendLayout();
            // 
            // label1
            // 
            resources.ApplyResources(this.label1, "label1");
            this.label1.Name = "label1";
            // 
            // cbFoot
            // 
            resources.ApplyResources(this.cbFoot, "cbFoot");
            this.cbFoot.Name = "cbFoot";
            this.cbFoot.UseVisualStyleBackColor = true;
            // 
            // cbBody
            // 
            resources.ApplyResources(this.cbBody, "cbBody");
            this.cbBody.Checked = true;
            this.cbBody.CheckState = System.Windows.Forms.CheckState.Checked;
            this.cbBody.Name = "cbBody";
            this.cbBody.UseVisualStyleBackColor = true;
            // 
            // cbHead
            // 
            resources.ApplyResources(this.cbHead, "cbHead");
            this.cbHead.Name = "cbHead";
            this.cbHead.UseVisualStyleBackColor = true;
            // 
            // InsertOfficeRegionQuestionPanel
            // 
            resources.ApplyResources(this, "$this");
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.label1);
            this.Controls.Add(this.cbFoot);
            this.Controls.Add(this.cbBody);
            this.Controls.Add(this.cbHead);
            this.Name = "InsertOfficeRegionQuestionPanel";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.CheckBox cbFoot;
        private System.Windows.Forms.CheckBox cbBody;
        private System.Windows.Forms.CheckBox cbHead;
    }
}
