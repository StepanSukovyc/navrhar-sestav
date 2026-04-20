namespace Gordic.GFE.WinClient
{
    partial class CExistsImages
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(CExistsImages));
            this.lbNames = new System.Windows.Forms.ListBox();
            this.pnlView = new System.Windows.Forms.Panel();
            this.lblName = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // lbNames
            // 
            resources.ApplyResources(this.lbNames, "lbNames");
            this.lbNames.FormattingEnabled = true;
            this.lbNames.Name = "lbNames";
            this.lbNames.SelectedIndexChanged += new System.EventHandler(this.lbNames_SelectedIndexChanged);
            this.lbNames.MouseDoubleClick += new System.Windows.Forms.MouseEventHandler(this.lbNames_MouseDoubleClick);
            // 
            // pnlView
            // 
            resources.ApplyResources(this.pnlView, "pnlView");
            this.pnlView.Name = "pnlView";
            // 
            // lblName
            // 
            resources.ApplyResources(this.lblName, "lblName");
            this.lblName.Name = "lblName";
            // 
            // CExistsImages
            // 
            resources.ApplyResources(this, "$this");
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.lblName);
            this.Controls.Add(this.pnlView);
            this.Controls.Add(this.lbNames);
            this.Name = "CExistsImages";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.ListBox lbNames;
        private System.Windows.Forms.Panel pnlView;
        private System.Windows.Forms.Label lblName;
    }
}
