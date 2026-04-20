using Gordic.GFE.Parsers.Services;
namespace Gordic.GFE.Parsers.Gui
{
    partial class AsynchronousWaitDialogForm
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(AsynchronousWaitDialogForm));
            this.cancelButton = new System.Windows.Forms.Button();
            this.progressBar = new System.Windows.Forms.ProgressBar();
            this.taskLabel = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // cancelButton
            // 
            resources.ApplyResources(this.cancelButton, "cancelButton");
            this.cancelButton.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.cancelButton.Name = "cancelButton";
            this.cancelButton.UseVisualStyleBackColor = true;
            // 
            // progressBar
            // 
            resources.ApplyResources(this.progressBar, "progressBar");
            this.progressBar.Name = "progressBar";
            this.progressBar.Style = System.Windows.Forms.ProgressBarStyle.Marquee;
            // 
            // taskLabel
            // 
            resources.ApplyResources(this.taskLabel, "taskLabel");
            this.taskLabel.Name = "taskLabel";
            // 
            // AsynchronousWaitDialogForm
            // 
            resources.ApplyResources(this, "$this");
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.CancelButton = this.cancelButton;
            this.Controls.Add(this.cancelButton);
            this.Controls.Add(this.progressBar);
            this.Controls.Add(this.taskLabel);
            this.Name = "AsynchronousWaitDialogForm";
            this.ResumeLayout(false);

        }

        #endregion

        internal System.Windows.Forms.Button cancelButton;
        internal System.Windows.Forms.ProgressBar progressBar;
        internal System.Windows.Forms.Label taskLabel;
    }
}
