//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ConvertFileDialog.cs                   </Name>
//    <Description> dialog konverze souboru z formátu GRR na formát GRF         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-09-17                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.General.WinApplication;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.XmlForms;
using Gordic.GFE.WinClient.Editor;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.StructureView;
using Gordic.GFE.WinClient.XmlEditor.Gui.Editor;
using System;
using System.IO;
using System.Text;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.Gui
{
    /// <summary>
    /// dialog konverze souboru z formátu GRR na formát GRF
    /// </summary>
    class ConvertFileDialog : BaseXmlForm
    {
        ErrorProvider errorProvider;

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public ConvertFileDialog()
        {
            initializeComponents();
            initializeValues();
            updateError();
        }

        void initializeValues()
        {
            XmlView primaryView = null;

            if (SimpleDesktop.Desktop.ActiveViewContent is AGraphicViewContent)
                primaryView = (SimpleDesktop.Desktop.ActiveViewContent as AGraphicViewContent).PrimaryViewContent as XmlView;
            if (primaryView == null)
                if (SimpleDesktop.Desktop.ActiveViewContent is XmlView)
                    primaryView = SimpleDesktop.Desktop.ActiveViewContent as XmlView;
            if (primaryView != null && primaryView.CategoryName.Equals("GRR"))
            {
                ControlDictionary["tbAlfPath"].Text = primaryView.PrimaryFileName;
                if (StructureViewPad.Instance.ActiveItem != null)
                    ControlDictionary["tbXmePath"].Text = StructureViewPad.Instance.ActiveItem.FileName;
            }
            ControlDictionary["openButton"].Click += new EventHandler(convertEvent);
        }

        void convertEvent(object sender, EventArgs e)
        {
            try
            {
                string tempFile = GTempFiles.CreateTempFile(TemporaryService.TempDirectory, 
                    string.Format("{0}_", Path.GetFileNameWithoutExtension(ControlDictionary["tbAlfPath"].Text)), 
                    ".alf");
                
                dynamic cnv;
                if (Path.GetExtension(ControlDictionary["tbAlfPath"].Text).Equals(".prf", StringComparison.InvariantCultureIgnoreCase))
                {
                    cnv = new PRFConverter(ControlDictionary["tbXmePath"].Text);
                    cnv.ConvertPRFFormat(ControlDictionary["tbAlfPath"].Text); //GRR formát
                }
                else
                {
                    cnv = new GRFConverter(ControlDictionary["tbXmePath"].Text);
                    cnv.ConvertGRRFormat(ControlDictionary["tbAlfPath"].Text); //GRR formát

                    string l_zipname = System.IO.Path.ChangeExtension(ControlDictionary["tbAlfPath"].Text, ".zip");
                    if (File.Exists(l_zipname))
                        File.Copy(l_zipname, System.IO.Path.ChangeExtension(tempFile, ".zip"));
                }

                using (var sw = File.CreateText(tempFile))
                    sw.Write(cnv.Output);
                FileInfo fi = new FileInfo(tempFile);

                if (!string.IsNullOrEmpty(tempFile))
                {
                    string parsedContent;
                    Encoding enc = Encoding.Default;
                    using (Stream str = new FileStream(tempFile, FileMode.Open, FileAccess.Read))
                        parsedContent = FileReader.ReadFileContent(str, ref enc);

                    IViewContent viewContent = Gordic.GFE.WinClient.Services.FileAgent.NewFile(fi.Name, parsedContent);
                    if (viewContent != null)
                    {
                        viewContent.PrimaryFile.ContentFileName = tempFile;
                        DisplayBindingService.AttachSubWindows(viewContent, false);
                        SimpleDesktop.Desktop.ShowView(viewContent);
                    }
                }
            }
            catch (System.ArgumentException ex) { GErrorDialog.ShowError(ex, true); }
            catch (Exception ex) { GErrorDialog.ShowError(ex, true); }
            DialogResult = DialogResult.OK;
        }
        void initializeComponents()
        {
            if (Assembly == null)
            {
                MessageService.ShowErrorFormatted(string.Format("{0}\n{1}", GResources.GetResourceText(29450490), GResources.GetResourceText(29450491))); //RC 29450491 : Modul není dostupný.
                return;
            }

            SetupLocalizedXFRM(Assembly.GetName().Name + ".Resources.forms.filedialog.ConvertFileDialog.xfrm");
            ControlDictionary["btnDataPath"].Click += dataPathClick;
            ControlDictionary["btnAlfPath"].Click += formationPathClick;

            ControlDictionary["tbXmePath"].TextChanged += textChanged;
            ControlDictionary["tbAlfPath"].TextChanged += textChanged;

            Owner = SimpleDesktop.MainForm;
            StartPosition = FormStartPosition.CenterParent;
            errorProvider = new ErrorProvider();
            errorProvider.ContainerControl = this;
        }
        void textChanged(object sender, EventArgs e) { updateError(); }
        void formationPathClick(object sender, EventArgs e)
        {
            string text = LocalCommonService.GetFormationFileName(ControlDictionary["tbAlfPath"].Text);
         
            if (!string.IsNullOrEmpty(text))
                ControlDictionary["tbAlfPath"].Text = text;
        }
        void dataPathClick(object sender, EventArgs e)
        {
            string text = LocalCommonService.GetStructureFileName(ControlDictionary["tbXmePath"].Text);

            if (!string.IsNullOrEmpty(text))
                ControlDictionary["tbXmePath"].Text = text;
        }
        void updateError()
        {
            if (string.IsNullOrEmpty(ControlDictionary["tbXmePath"].Text) || !FileUtility.TestFileExists(ControlDictionary["tbXmePath"].Text))
                errorProvider.SetError(ControlDictionary["tbXmePath"], GResources.GetResourceText(29450492)); //RC 29450492 : Cesta k souboru struktury není platná!
            else errorProvider.SetError(ControlDictionary["tbXmePath"], string.Empty);

            if (string.IsNullOrEmpty(ControlDictionary["tbAlfPath"].Text) || !FileUtility.TestFileExists(ControlDictionary["tbAlfPath"].Text))
                errorProvider.SetError(ControlDictionary["tbAlfPath"], GResources.GetResourceText(29450493)); //RC 29450493 : Cesta k souboru sestavy není platná!
            else errorProvider.SetError(ControlDictionary["tbAlfPath"], string.Empty);

            goOn();
        }
        void goOn()
        {
            ControlDictionary["openButton"].Enabled = string.IsNullOrEmpty(errorProvider.GetError(ControlDictionary["tbXmePath"]))
                && string.IsNullOrEmpty(errorProvider.GetError(ControlDictionary["tbAlfPath"]));
        }
    }
}
