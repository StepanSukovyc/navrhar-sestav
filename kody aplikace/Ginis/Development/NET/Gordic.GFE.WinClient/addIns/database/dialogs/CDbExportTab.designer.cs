using Gordic.WinForms.Controls;
using Gordic.WinForms.DbControls;
namespace Gordic.GFE.WinClient
{
    partial class CDbExportTab
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(CDbExportTab));
            this.gGroupBox1 = new Gordic.WinForms.Controls.GGroupBox();
            this.tbDir = new Gordic.WinForms.Controls.GTbGString();
            this.chbSaveCopy = new System.Windows.Forms.CheckBox();
            this.chbAktualizovat = new Gordic.WinForms.Controls.GCheckBox();
            this.tbTema = new Gordic.WinForms.DbControls.GTbDataGinctem();
            this.tbFaze = new Gordic.WinForms.DbControls.GTbDataGincfaz();
            this.tbStrom = new Gordic.WinForms.DbControls.GTbDataGinsstr();
            this.tbIxsAlv = new Gordic.WinForms.Controls.GTbGString();
            this.tbTypPrilohy = new Gordic.WinForms.DbControls.GCbDataWflcktp();
            this.chbIxsTypSpis = new System.Windows.Forms.CheckBox();
            this.gGroupBox3 = new Gordic.WinForms.Controls.GGroupBox();
            this.btnNewPID = new System.Windows.Forms.Button();
            this.tbFormVyst = new Gordic.WinForms.Controls.GTbGString();
            this.tbFiltrFrm = new Gordic.WinForms.Controls.GTbGString();
            this.tbFormatSkup = new Gordic.WinForms.Controls.GTbGString();
            this.tbFilename = new Gordic.WinForms.Controls.GTbGString();
            this.tbRokmesDo = new Gordic.WinForms.Controls.GTbGEkoDate();
            this.tbRokmesOd = new Gordic.WinForms.Controls.GTbGEkoDate();
            this.tbPoznamka = new Gordic.WinForms.Controls.GTbGString();
            this.tbNazev = new Gordic.WinForms.Controls.GTbGString();
            this.tbXmetaSubver = new Gordic.WinForms.Controls.GTbGInt32();
            this.tbXmetaVer = new Gordic.WinForms.Controls.GTbGInt32();
            this.tbIxsXme = new Gordic.WinForms.Controls.GTbGString();
            this.tbIxsFrm = new Gordic.WinForms.Controls.GTbGString();
            this.tbIxsTyp = new Gordic.WinForms.DbControls.GTbDataSslstyp();
            this.ttObject = new System.Windows.Forms.ToolTip(this.components);
            this.gGroupBox1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.tbTypPrilohy)).BeginInit();
            this.gGroupBox3.SuspendLayout();
            this.SuspendLayout();
            // 
            // gGroupBox1
            // 
            resources.ApplyResources(this.gGroupBox1, "gGroupBox1");
            this.gGroupBox1.Controls.Add(this.tbDir);
            this.gGroupBox1.Controls.Add(this.chbSaveCopy);
            this.gGroupBox1.Controls.Add(this.chbAktualizovat);
            this.gGroupBox1.Controls.Add(this.tbTema);
            this.gGroupBox1.Controls.Add(this.tbFaze);
            this.gGroupBox1.Controls.Add(this.tbStrom);
            this.gGroupBox1.Controls.Add(this.tbIxsAlv);
            this.gGroupBox1.FlatStyle = System.Windows.Forms.FlatStyle.System;
            this.gGroupBox1.Name = "gGroupBox1";
            this.gGroupBox1.TabStop = false;
            // 
            // tbDir
            // 
            resources.ApplyResources(this.tbDir, "tbDir");
            this.tbDir.Name = "tbDir";
            // 
            // chbSaveCopy
            // 
            resources.ApplyResources(this.chbSaveCopy, "chbSaveCopy");
            this.chbSaveCopy.Name = "chbSaveCopy";
            this.chbSaveCopy.UseVisualStyleBackColor = true;
            // 
            // chbAktualizovat
            // 
            resources.ApplyResources(this.chbAktualizovat, "chbAktualizovat");
            this.chbAktualizovat.Name = "chbAktualizovat";
            this.chbAktualizovat.UseVisualStyleBackColor = true;
            // 
            // tbTema
            // 
            resources.ApplyResources(this.tbTema, "tbTema");
            this.tbTema.DependancyFaze = this.tbFaze;
            this.tbTema.Name = "tbTema";
            this.tbTema.ReadOnly = true;
            // 
            // tbFaze
            // 
            resources.ApplyResources(this.tbFaze, "tbFaze");
            this.tbFaze.LeaveInvalid = true;
            this.tbFaze.Name = "tbFaze";
            this.tbFaze.Required = true;
            this.tbFaze.ValueChanged += new System.EventHandler(this.TbFazeValueChanged);
            this.tbFaze.InputChanged += new System.EventHandler(this.TbFazeValueChanged);
            // 
            // tbStrom
            // 
            resources.ApplyResources(this.tbStrom, "tbStrom");
            this.tbStrom.Name = "tbStrom";
            // 
            // tbIxsAlv
            // 
            resources.ApplyResources(this.tbIxsAlv, "tbIxsAlv");
            this.tbIxsAlv.HasDetailButton = true;
            this.tbIxsAlv.Name = "tbIxsAlv";
            this.tbIxsAlv.ReadOnly = true;
            this.tbIxsAlv.DetailClicked += new System.EventHandler(this.TbIxsAlv_DetailClicked);
            // 
            // tbTypPrilohy
            // 
            this.tbTypPrilohy.AllowNull = true;
            resources.ApplyResources(this.tbTypPrilohy, "tbTypPrilohy");
            this.tbTypPrilohy.Name = "tbTypPrilohy";
            // 
            // chbIxsTypSpis
            // 
            resources.ApplyResources(this.chbIxsTypSpis, "chbIxsTypSpis");
            this.chbIxsTypSpis.Name = "chbIxsTypSpis";
            this.chbIxsTypSpis.UseVisualStyleBackColor = true;
            // 
            // gGroupBox3
            // 
            resources.ApplyResources(this.gGroupBox3, "gGroupBox3");
            this.gGroupBox3.Controls.Add(this.btnNewPID);
            this.gGroupBox3.Controls.Add(this.tbFormVyst);
            this.gGroupBox3.Controls.Add(this.tbFiltrFrm);
            this.gGroupBox3.Controls.Add(this.tbFormatSkup);
            this.gGroupBox3.Controls.Add(this.tbFilename);
            this.gGroupBox3.Controls.Add(this.tbTypPrilohy);
            this.gGroupBox3.Controls.Add(this.tbRokmesDo);
            this.gGroupBox3.Controls.Add(this.tbRokmesOd);
            this.gGroupBox3.Controls.Add(this.tbPoznamka);
            this.gGroupBox3.Controls.Add(this.tbNazev);
            this.gGroupBox3.Controls.Add(this.tbXmetaSubver);
            this.gGroupBox3.Controls.Add(this.tbXmetaVer);
            this.gGroupBox3.Controls.Add(this.tbIxsXme);
            this.gGroupBox3.Controls.Add(this.tbIxsFrm);
            this.gGroupBox3.FlatStyle = System.Windows.Forms.FlatStyle.System;
            this.gGroupBox3.Name = "gGroupBox3";
            this.gGroupBox3.TabStop = false;
            // 
            // btnNewPID
            // 
            resources.ApplyResources(this.btnNewPID, "btnNewPID");
            this.btnNewPID.Name = "btnNewPID";
            this.ttObject.SetToolTip(this.btnNewPID, resources.GetString("btnNewPID.ToolTip"));
            this.btnNewPID.UseVisualStyleBackColor = true;
            this.btnNewPID.Click += new System.EventHandler(this.NewPIDClick);
            // 
            // tbFormVyst
            // 
            resources.ApplyResources(this.tbFormVyst, "tbFormVyst");
            this.tbFormVyst.Name = "tbFormVyst";
            // 
            // tbFiltrFrm
            // 
            resources.ApplyResources(this.tbFiltrFrm, "tbFiltrFrm");
            this.tbFiltrFrm.Name = "tbFiltrFrm";
            // 
            // tbFormatSkup
            // 
            resources.ApplyResources(this.tbFormatSkup, "tbFormatSkup");
            this.tbFormatSkup.Name = "tbFormatSkup";
            this.tbFormatSkup.ReadOnly = true;
            // 
            // tbFilename
            // 
            resources.ApplyResources(this.tbFilename, "tbFilename");
            this.tbFilename.Name = "tbFilename";
            this.tbFilename.ReadOnly = true;
            // 
            // tbRokmesDo
            // 
            resources.ApplyResources(this.tbRokmesDo, "tbRokmesDo");
            this.tbRokmesDo.MaxLength = 7;
            this.tbRokmesDo.Name = "tbRokmesDo";
            // 
            // tbRokmesOd
            // 
            resources.ApplyResources(this.tbRokmesOd, "tbRokmesOd");
            this.tbRokmesOd.MaxLength = 7;
            this.tbRokmesOd.Name = "tbRokmesOd";
            // 
            // tbPoznamka
            // 
            resources.ApplyResources(this.tbPoznamka, "tbPoznamka");
            this.tbPoznamka.Name = "tbPoznamka";
            // 
            // tbNazev
            // 
            resources.ApplyResources(this.tbNazev, "tbNazev");
            this.tbNazev.Name = "tbNazev";
            this.tbNazev.ValueChanged += new System.EventHandler(this.TbNazevValueChanged);
            this.tbNazev.InputChanged += new System.EventHandler(this.TbNazevValueChanged);
            // 
            // tbXmetaSubver
            // 
            resources.ApplyResources(this.tbXmetaSubver, "tbXmetaSubver");
            this.tbXmetaSubver.Name = "tbXmetaSubver";
            this.tbXmetaSubver.ReadOnly = true;
            // 
            // tbXmetaVer
            // 
            resources.ApplyResources(this.tbXmetaVer, "tbXmetaVer");
            this.tbXmetaVer.Name = "tbXmetaVer";
            this.tbXmetaVer.ReadOnly = true;
            // 
            // tbIxsXme
            // 
            resources.ApplyResources(this.tbIxsXme, "tbIxsXme");
            this.tbIxsXme.Name = "tbIxsXme";
            this.tbIxsXme.ReadOnly = true;
            // 
            // tbIxsFrm
            // 
            resources.ApplyResources(this.tbIxsFrm, "tbIxsFrm");
            this.tbIxsFrm.Name = "tbIxsFrm";
            this.tbIxsFrm.ValueChanged += new System.EventHandler(this.TbIxsFrmValueChanged);
            this.tbIxsFrm.InputChanged += new System.EventHandler(this.TbIxsFrmValueChanged);
            // 
            // tbIxsTyp
            // 
            resources.ApplyResources(this.tbIxsTyp, "tbIxsTyp");
            this.tbIxsTyp.Name = "tbIxsTyp";
            // 
            // CDbExportTab
            // 
            resources.ApplyResources(this, "$this");
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.gGroupBox3);
            this.Controls.Add(this.gGroupBox1);
            this.Controls.Add(this.tbIxsTyp);
            this.Controls.Add(this.chbIxsTypSpis);
            this.Name = "CDbExportTab";
            this.gGroupBox1.ResumeLayout(false);
            this.gGroupBox1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.tbTypPrilohy)).EndInit();
            this.gGroupBox3.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private GGroupBox gGroupBox1;
        private GCheckBox chbAktualizovat;
        private GTbDataGinctem tbTema;
        private GTbDataGincfaz tbFaze;
        private GTbDataGinsstr tbStrom;
		private GCbDataWflcktp tbTypPrilohy;
        private GTbGString tbIxsAlv;
        private GGroupBox gGroupBox3;
        private GTbGString tbFiltrFrm;
        private GTbGString tbFormatSkup;
        private GTbGString tbFilename;
        private GTbGEkoDate tbRokmesDo;
        private GTbGEkoDate tbRokmesOd;
        private GTbGString tbPoznamka;
        private GTbGString tbNazev;
        private GTbGInt32 tbXmetaSubver;
        private GTbGInt32 tbXmetaVer;
        private GTbGString tbIxsXme;
        private GTbGString tbIxsFrm;
        private GTbDataSslstyp tbIxsTyp;
        private GTbGString tbFormVyst;
        private System.Windows.Forms.Button btnNewPID;
        private System.Windows.Forms.ToolTip ttObject;
        private System.Windows.Forms.CheckBox chbSaveCopy;
        private System.Windows.Forms.CheckBox chbIxsTypSpis;
        private GTbGString tbDir;
    }
}
