namespace Gordic.GFE.WinClient.Gui
{
    partial class CustomDialog
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(CustomDialog));
            this.pContent = new System.Windows.Forms.Panel();
            this.button2 = new System.Windows.Forms.Button();
            this.button3 = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // pContent
            // 
            resources.ApplyResources(this.pContent, "pContent");
            this.pContent.Name = "pContent";
            // 
            // button2
            // 
            resources.ApplyResources(this.button2, "button2");
            this.button2.Name = "button2";
            this.button2.UseVisualStyleBackColor = true;
            this.button2.Click += new System.EventHandler(this.button2_Click);
            // 
            // button3
            // 
            resources.ApplyResources(this.button3, "button3");
            this.button3.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.button3.Name = "button3";
            this.button3.UseVisualStyleBackColor = true;
            // 
            // CustomDialog
            // 
            this.AcceptButton = this.button2;
            resources.ApplyResources(this, "$this");
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.CancelButton = this.button3;
            this.Controls.Add(this.button3);
            this.Controls.Add(this.button2);
            this.Controls.Add(this.pContent);
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "CustomDialog";
            this.SizeGripStyle = System.Windows.Forms.SizeGripStyle.Show;
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel pContent;
        private System.Windows.Forms.Button button2;
        private System.Windows.Forms.Button button3;
    }
}
