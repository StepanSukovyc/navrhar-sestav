namespace Gordic.GFE.WinClient
{
    partial class CheckVersion
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(CheckVersion));
            this.btnExit = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.gvList = new Gordic.WinForms.DbControls.GDataGridViewCfg();
            this.gPictureBox1 = new Gordic.WinForms.Controls.GPictureBox();
            this.btnContinue = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.gvList)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.gPictureBox1)).BeginInit();
            this.SuspendLayout();
            // 
            // btnExit
            // 
            resources.ApplyResources(this.btnExit, "btnExit");
            this.btnExit.Name = "btnExit";
            this.btnExit.UseVisualStyleBackColor = true;
            this.btnExit.Click += new System.EventHandler(this.btnExit_Click);
            // 
            // label1
            // 
            resources.ApplyResources(this.label1, "label1");
            this.label1.Name = "label1";
            // 
            // gvList
            // 
            resources.ApplyResources(this.gvList, "gvList");
            this.gvList.FitColumnsToClientArea = true;
            this.gvList.Name = "gvList";
            this.gvList.CellFormatting += new System.Windows.Forms.DataGridViewCellFormattingEventHandler(this.gvList_CellFormatting);
            // 
            // gPictureBox1
            // 
            resources.ApplyResources(this.gPictureBox1, "gPictureBox1");
            this.gPictureBox1.Name = "gPictureBox1";
            this.gPictureBox1.TabStop = false;
            // 
            // btnContinue
            // 
            resources.ApplyResources(this.btnContinue, "btnContinue");
            this.btnContinue.Name = "btnContinue";
            this.btnContinue.UseVisualStyleBackColor = true;
            this.btnContinue.Click += new System.EventHandler(this.btnContinue_Click);
            // 
            // CheckVersion
            // 
            resources.ApplyResources(this, "$this");
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.btnContinue);
            this.Controls.Add(this.btnExit);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.gvList);
            this.Controls.Add(this.gPictureBox1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "CheckVersion";
            this.ShowInTaskbar = false;
            ((System.ComponentModel.ISupportInitialize)(this.gvList)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.gPictureBox1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button btnExit;
        private System.Windows.Forms.Label label1;
        private WinForms.DbControls.GDataGridViewCfg gvList;
        private WinForms.Controls.GPictureBox gPictureBox1;
        private System.Windows.Forms.Button btnContinue;
    }
}
