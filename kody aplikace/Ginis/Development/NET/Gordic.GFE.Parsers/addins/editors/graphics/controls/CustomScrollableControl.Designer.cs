namespace Gordic.GFE.Parsers
{
    partial class CustomScrollableControl
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
                components.Dispose();
            base.Dispose(disposing);
        }

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(CustomScrollableControl));
            this.innerPanel = new System.Windows.Forms.Panel();
            this.outerPanel = new System.Windows.Forms.Panel();
            this.vScrollBar = new System.Windows.Forms.VScrollBar();
            this.hScrollBar = new System.Windows.Forms.HScrollBar();
            this.outerPanel.SuspendLayout();
            this.SuspendLayout();
            // 
            // innerPanel
            // 
            resources.ApplyResources(this.innerPanel, "innerPanel");
            this.innerPanel.Name = "innerPanel";
            // 
            // outerPanel
            // 
            resources.ApplyResources(this.outerPanel, "outerPanel");
            this.outerPanel.Controls.Add(this.innerPanel);
            this.outerPanel.Name = "outerPanel";
            // 
            // vScrollBar
            // 
            resources.ApplyResources(this.vScrollBar, "vScrollBar");
            this.vScrollBar.Name = "vScrollBar";
            // 
            // hScrollBar
            // 
            resources.ApplyResources(this.hScrollBar, "hScrollBar");
            this.hScrollBar.Name = "hScrollBar";
            // 
            // CustomScrollableControl
            // 
            resources.ApplyResources(this, "$this");
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.hScrollBar);
            this.Controls.Add(this.vScrollBar);
            this.Controls.Add(this.outerPanel);
            this.Name = "CustomScrollableControl";
            this.outerPanel.ResumeLayout(false);
            this.ResumeLayout(false);

        }
        #endregion

        private System.Windows.Forms.Panel innerPanel;
        private System.Windows.Forms.Panel outerPanel;
        private System.Windows.Forms.VScrollBar vScrollBar;
        private System.Windows.Forms.HScrollBar hScrollBar;
    }
}
