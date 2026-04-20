//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DesignerDOCFRMPanel.cs                 </Name>
//    <Description> Hlavní nastavení                                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.WinForms.Controls;

namespace Gordic.GFE.WinClient.Dialogs.OptionPanels
{
    /// <summary>
    /// Hlavní nastavení nápovědného textu objektů sestavy
    /// </summary>
    class DesignerDOCFRMPanel : AbstractOptionPanel
    {
        /// <summary>
        /// načtené obsahu
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.DesignerDOCFRMPanel.xfrm");

            ((GLabeledTextBox)ControlDictionary["tbStructureName"]).Text = ReportDesignerProperties.Instance.DocfrmStructureName;
            ((GLabeledTextBox)ControlDictionary["tbStructureNote"]).Text = ReportDesignerProperties.Instance.DocfrmStructureNote;
            ((GLabeledTextBox)ControlDictionary["tbStructureIxsAlv"]).Text = ReportDesignerProperties.Instance.DocfrmStructureIxsAlv;
            ((GLabeledTextBox)ControlDictionary["tbStructureDateFrom"]).Text = ReportDesignerProperties.Instance.DocfrmStructureDateFrom;
            ((GLabeledTextBox)ControlDictionary["tbStructureDateTo"]).Text = ReportDesignerProperties.Instance.DocfrmStructureDateTo;
            ((GLabeledTextBox)ControlDictionary["tbStructureFormationOutput"]).Text = ReportDesignerProperties.Instance.DocfrmStructureFormationOutput;
            ((GLabeledTextBox)ControlDictionary["tbWflIxsXme"]).Text = ReportDesignerProperties.Instance.DocfrmWflIxsXme;
            ((GLabeledTextBox)ControlDictionary["tbWflVla"]).Text = ReportDesignerProperties.Instance.DocfrmWflVla;
        }

        /// <summary>
        /// Uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public override bool StorePanelContents()
        {
            ReportDesignerProperties.Instance.DocfrmStructureName = ((GLabeledTextBox)ControlDictionary["tbStructureName"]).Text;
            ReportDesignerProperties.Instance.DocfrmStructureIxsAlv = ((GLabeledTextBox)ControlDictionary["tbStructureIxsAlv"]).Text;
            ReportDesignerProperties.Instance.DocfrmStructureNote = ((GLabeledTextBox)ControlDictionary["tbStructureNote"]).Text;
            ReportDesignerProperties.Instance.DocfrmStructureDateFrom = ((GLabeledTextBox)ControlDictionary["tbStructureDateFrom"]).Text;
            ReportDesignerProperties.Instance.DocfrmStructureDateTo = ((GLabeledTextBox)ControlDictionary["tbStructureDateTo"]).Text;
            ReportDesignerProperties.Instance.DocfrmStructureFormationOutput = ((GLabeledTextBox)ControlDictionary["tbStructureFormationOutput"]).Text;
            ReportDesignerProperties.Instance.DocfrmWflIxsXme = ((GLabeledTextBox)ControlDictionary["tbWflIxsXme"]).Text;
            ReportDesignerProperties.Instance.DocfrmWflVla = ((GLabeledTextBox)ControlDictionary["tbWflVla"]).Text;
            return true;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // DesignerDOCFRMPanel
            // 
            this.Name = "DesignerDOCFRMPanel";
            this.ResumeLayout(false);

        }
    }
}
