using Gordic.WinForms.Controls;
using Gordic.WinForms.DbControls;
namespace Gordic.GFE.WinClient
{
    partial class CDbImportTab
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
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(CDbImportTab));
            this.gGroupBox1 = new Gordic.WinForms.Controls.GGroupBox();
            this.chbFolders = new Gordic.WinForms.Controls.GCheckBox();
            this.chbGraphics = new Gordic.WinForms.Controls.GCheckBox();
            this.tbTema = new Gordic.WinForms.DbControls.GTbDataGinctem();
            this.tbFaze = new Gordic.WinForms.DbControls.GTbDataGincfaz();
            this.tbStrom = new Gordic.WinForms.DbControls.GTbDataGinsstr();
            this.gvList = new Gordic.WinForms.DbControls.GDataGridViewCfg();
            this.gContextMenuStrip1 = new Gordic.WinForms.Gui.GContextMenuStrip();
            this.gToolStripMenuItem1 = new Gordic.WinForms.Gui.GToolStripMenuItem();
            this.aOpenALV = new Gordic.WinForms.Gui.GAction(this.components);
            this.gGroupBox1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.gvList)).BeginInit();
            this.gContextMenuStrip1.SuspendLayout();
            this.SuspendLayout();
            // 
            // gGroupBox1
            // 
            this.gGroupBox1.Controls.Add(this.chbFolders);
            this.gGroupBox1.Controls.Add(this.chbGraphics);
            this.gGroupBox1.Controls.Add(this.tbTema);
            this.gGroupBox1.Controls.Add(this.tbFaze);
            this.gGroupBox1.Controls.Add(this.tbStrom);
            resources.ApplyResources(this.gGroupBox1, "gGroupBox1");
            this.gGroupBox1.FlatStyle = System.Windows.Forms.FlatStyle.System;
            this.gGroupBox1.Name = "gGroupBox1";
            this.gGroupBox1.TabStop = false;
            // 
            // chbFolders
            // 
            this.chbFolders.Checked = true;
            this.chbFolders.CheckState = System.Windows.Forms.CheckState.Checked;
            resources.ApplyResources(this.chbFolders, "chbFolders");
            this.chbFolders.Name = "chbFolders";
            this.chbFolders.UseVisualStyleBackColor = true;
            this.chbFolders.CheckedChanged += new System.EventHandler(this.ChbFolders_CheckedChanged);
            // 
            // chbGraphics
            // 
            this.chbGraphics.Checked = true;
            this.chbGraphics.CheckState = System.Windows.Forms.CheckState.Checked;
            resources.ApplyResources(this.chbGraphics, "chbGraphics");
            this.chbGraphics.Name = "chbGraphics";
            this.chbGraphics.UseVisualStyleBackColor = true;
            this.chbGraphics.CheckedChanged += new System.EventHandler(this.ChbGraphics_CheckedChanged);
            // 
            // tbTema
            // 
            resources.ApplyResources(this.tbTema, "tbTema");
            this.tbTema.DependancyFaze = this.tbFaze;
            this.tbTema.Name = "tbTema";
            this.tbTema.Required = true;
            this.tbTema.ValueChanged += new System.EventHandler(this.TbTema_ValueChanged);
            // 
            // tbFaze
            // 
            resources.ApplyResources(this.tbFaze, "tbFaze");
            this.tbFaze.Name = "tbFaze";
            this.tbFaze.ValueChanged += new System.EventHandler(this.TbFaze_ValueChanged);
            // 
            // tbStrom
            // 
            resources.ApplyResources(this.tbStrom, "tbStrom");
            this.tbStrom.Name = "tbStrom";
            this.tbStrom.Required = true;
            this.tbStrom.FiltersChanged += new System.EventHandler(this.TbStrom_FiltersChanged);
            this.tbStrom.ValueChanged += new System.EventHandler(this.TbStrom_ValueChanged);
            // 
            // gvList
            // 
            resources.ApplyResources(this.gvList, "gvList");
            this.gvList.Name = "gvList";
            this.gvList.RowContextMenuStrip = this.gContextMenuStrip1;
            this.gvList.ToolPanelVisible = false;
            this.gvList.CurrentRowChanged += new System.EventHandler(this.GvList_CurrentRowChanged);
            this.gvList.CellDoubleClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.GvList_CellDoubleClick);
            // 
            // gContextMenuStrip1
            // 
            this.gContextMenuStrip1.ImageScalingSize = new System.Drawing.Size(22, 22);
            this.gContextMenuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.gToolStripMenuItem1});
            this.gContextMenuStrip1.Name = "gContextMenuStrip1";
            resources.ApplyResources(this.gContextMenuStrip1, "gContextMenuStrip1");
            // 
            // gToolStripMenuItem1
            // 
            this.gToolStripMenuItem1.Action = this.aOpenALV;
            this.gToolStripMenuItem1.Name = "gToolStripMenuItem1";
            resources.ApplyResources(this.gToolStripMenuItem1, "gToolStripMenuItem1");
            // 
            // aOpenALV
            // 
            resources.ApplyResources(this.aOpenALV, "aOpenALV");
            this.aOpenALV.Start += new System.EventHandler(this.aOpenALV_Start);
            // 
            // CDbImportTab
            // 
            resources.ApplyResources(this, "$this");
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.gvList);
            this.Controls.Add(this.gGroupBox1);
            this.Name = "CDbImportTab";
            this.gGroupBox1.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.gvList)).EndInit();
            this.gContextMenuStrip1.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private GGroupBox gGroupBox1;
        private GCheckBox chbFolders;
        private GCheckBox chbGraphics;
        private GTbDataGinctem tbTema;
        private GTbDataGincfaz tbFaze;
        private GTbDataGinsstr tbStrom;
        private GDataGridViewCfg gvList;
        private WinForms.Gui.GContextMenuStrip gContextMenuStrip1;
        private WinForms.Gui.GToolStripMenuItem gToolStripMenuItem1;
        private WinForms.Gui.GAction aOpenALV;
    }
}
