namespace Gordic.GFE.WinClient
{
    partial class CSyntax
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(CSyntax));
            this.listBoxSyntax = new System.Windows.Forms.ListBox();
            this.SuspendLayout();
            // 
            // listBoxSyntax
            // 
            resources.ApplyResources(this.listBoxSyntax, "listBoxSyntax");
            this.listBoxSyntax.FormattingEnabled = true;
            this.listBoxSyntax.Name = "listBoxSyntax";
            this.listBoxSyntax.Sorted = true;
            this.listBoxSyntax.SelectedIndexChanged += new System.EventHandler(this.listBoxSyntax_SelectedIndexChanged);
            this.listBoxSyntax.MouseDoubleClick += new System.Windows.Forms.MouseEventHandler(this.LBSyntaxMouseDoubleClick);
            // 
            // CSyntax
            // 
            resources.ApplyResources(this, "$this");
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.listBoxSyntax);
            this.Name = "CSyntax";
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.ListBox listBoxSyntax;
    }
}
