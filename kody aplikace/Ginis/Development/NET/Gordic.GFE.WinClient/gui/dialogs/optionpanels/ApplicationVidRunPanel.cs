//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ApplicationVidRunPanel.cs              </Name>
//    <Description> nastavení potřebné pro práci s prohlížečem sestav           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-05                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.WinForms.Controls;
using Gordic.GFE.Parsers.Core;
using Gordic.General;
using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.WinClient.Dialogs.OptionPanels
{
    /// <summary>
    /// nastavení potřebné pro práci s prohlížečem sestav
    /// </summary>
    class ApplicationVidRunPanel : AbstractOptionPanel
    {
        ErrorProvider errorProvider;
        string oldPath;
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.ApplicationVidRunPanel.xfrm");
            errorProvider = new ErrorProvider();
            errorProvider.ContainerControl = this;

            ((GLabeledTextBox)ControlDictionary["tbAppDataPath"]).TextChanged += delegate { UpdateError(); };
            //((GLabeledTextBox)ControlDictionary["tbFillerPath"]).TextChanged += delegate { UpdateError(); };
            ((GLabeledTextBox)ControlDictionary["tbFormationPath"]).TextChanged += delegate { UpdateError(); };

            ((Button)ControlDictionary["btnAppDataPath"]).Click += delegate
            {
                string dirName = ((GLabeledTextBox)ControlDictionary["tbAppDataPath"]).Text;
                if (FileUtility.GetDialogDirectoryName(ref dirName)) //RC 29450455 : Prohlížeč sestav
                    ((GLabeledTextBox)ControlDictionary["tbAppDataPath"]).Text = dirName;
            };

            //((Button)ControlDictionary["btnFillerPath"]).Click += delegate
            //{
            //    string fileName = ((GLabeledTextBox)ControlDictionary["tbFillerPath"]).Text;
            //    if (FileUtility.GetDialogFileName("/ReportDesigner/Desktop/ApplicationFileFilter", GResources.GetResourceText(29450456), ref fileName)) //RC 29450456 : Prohlížeč formulářů
            //        ((GLabeledTextBox)ControlDictionary["tbFillerPath"]).Text = fileName;
            //};

            ((Button)ControlDictionary["btnFormationPath"]).Click += delegate
            {
                string fileName = ((GLabeledTextBox)ControlDictionary["tbFormationPath"]).Text;
                if (FileUtility.GetDialogDirectoryName(ref fileName))
                    ((GLabeledTextBox)ControlDictionary["tbFormationPath"]).Text = fileName;
            };

            ((GLabeledTextBox)ControlDictionary["tbXmePath"]).TextChanged += delegate { UpdateError(); };

            ((Button)ControlDictionary["btnXmePath"]).Click += delegate
            {
                string dirName = ((GLabeledTextBox)ControlDictionary["tbXmePath"]).Text;
                if (FileUtility.GetDialogDirectoryName(ref dirName))
                    ((GLabeledTextBox)ControlDictionary["tbXmePath"]).Text = dirName;
            };

            ((GLabeledTextBox)ControlDictionary["tbXmePath"]).Text = ReportDesignerProperties.Instance.XmePath;
            ((GLabeledTextBox)ControlDictionary["tbAppDataPath"]).Text = ReportDesignerProperties.Instance.AppRootDataPath;
            //((GLabeledTextBox)ControlDictionary["tbFillerPath"]).Text = ReportDesignerProperties.Instance.FillerPath;
            ((GLabeledTextBox)ControlDictionary["tbFormationPath"]).Text = ReportDesignerProperties.Instance.FormationPath;
            oldPath = ReportDesignerProperties.Instance.AppRootDataPath;
        }
        /// <summary>
        /// Uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public override bool StorePanelContents()
        {
            if ((Directory.Exists(((GLabeledTextBox)ControlDictionary["tbAppDataPath"]).Text)
                && !((GLabeledTextBox)ControlDictionary["tbAppDataPath"]).Text.Equals(oldPath, StringComparison.InvariantCultureIgnoreCase))
                || string.IsNullOrEmpty(((GLabeledTextBox)ControlDictionary["tbAppDataPath"]).Text))
            {
                MessageService.ShowWarning(GResources.GetResourceText(29450663)); //RC 29450663 : Změna úložiště konfigurační složky aplikace.
                using (AsynchronousWaitDialog wd = AsynchronousWaitDialog.ShowWaitDialog(GResources.GetResourceText(29450665))) //RC 29450665 : kopírování konfiguračních souborů...
                    try
                    {
                        FileService.DirectoryCopy(
                            Path.Combine(oldPath, RevisionClass.ApplicationName, RevisionClass.FullVersion),
                            Path.Combine(((GLabeledTextBox)ControlDictionary["tbAppDataPath"]).Text, RevisionClass.ApplicationName, RevisionClass.FullVersion));
                    }
                    catch { }

                using (AsynchronousWaitDialog wd = AsynchronousWaitDialog.ShowWaitDialog(GResources.GetResourceText(29450666))) //RC 29450666 : záznam do registru...
                    // uložíme hodnotu do registru
                    RegistryService.SetRegistryAppValue(ApplicationHelper.AppRootDataPathKey
                        , ((GLabeledTextBox)ControlDictionary["tbAppDataPath"]).Text);
            }

            //ReportDesignerProperties.Instance.FillerPath = ((GLabeledTextBox)ControlDictionary["tbFillerPath"]).Text;
            ReportDesignerProperties.Instance.FormationPath = ((GLabeledTextBox)ControlDictionary["tbFormationPath"]).Text;
            ReportDesignerProperties.Instance.XmePath = ((GLabeledTextBox)ControlDictionary["tbXmePath"]).Text;
            return true;
        }

        void UpdateError()
        {
            if (!string.IsNullOrEmpty(((GLabeledTextBox)ControlDictionary["tbAppDataPath"]).Text)
                && !Directory.Exists(((GLabeledTextBox)ControlDictionary["tbAppDataPath"]).Text))
                errorProvider.SetError((GLabeledTextBox)ControlDictionary["tbAppDataPath"], GResources.GetResourceText(29450662)); //RC 29450662 : cesta ke kořenové složce není platná!
            else errorProvider.SetError((GLabeledTextBox)ControlDictionary["tbAppDataPath"], "");

            //if (!string.IsNullOrEmpty(((GLabeledTextBox)ControlDictionary["tbFillerPath"]).Text)
            //    && !File.Exists(((GLabeledTextBox)ControlDictionary["tbFillerPath"]).Text))
            //    errorProvider.SetError((GLabeledTextBox)ControlDictionary["tbFillerPath"], GResources.GetResourceText(29450457)); //RC 29450457 : Cesta k prohlížeči není platná!
            //else errorProvider.SetError((GLabeledTextBox)ControlDictionary["tbFillerPath"], "");

            if (!string.IsNullOrEmpty(((GLabeledTextBox)ControlDictionary["tbFormationPath"]).Text)
                && !Directory.Exists(((GLabeledTextBox)ControlDictionary["tbFormationPath"]).Text))
                errorProvider.SetError((GLabeledTextBox)ControlDictionary["tbFormationPath"], GResources.GetResourceText(29450458)); //RC 29450458 : Cesta k výchozí složce sestav není platná!
            else errorProvider.SetError((GLabeledTextBox)ControlDictionary["tbFormationPath"], "");

            if (!string.IsNullOrEmpty(((GLabeledTextBox)ControlDictionary["tbXmePath"]).Text)
                && !Directory.Exists(((GLabeledTextBox)ControlDictionary["tbXmePath"]).Text))
                errorProvider.SetError((GLabeledTextBox)ControlDictionary["tbXmePath"], GResources.GetResourceText(29450454)); //RC 29450454 : Cesta ke složce datových struktur není platná!
            else errorProvider.SetError((GLabeledTextBox)ControlDictionary["tbXmePath"], "");
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // ApplicationVidRunPanel
            // 
            this.Name = "ApplicationVidRunPanel";
            this.ResumeLayout(false);

        }

    }
}
