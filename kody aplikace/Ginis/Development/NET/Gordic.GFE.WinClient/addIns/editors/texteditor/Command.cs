//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.Command.cs                             </Name>
//    <Description> příkaz nápovědného okýnka                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-27                                                  </Created>
//  </FileHeader>

using Gordic.TextEditor;
using Gordic.TextEditor.Actions;

namespace Gordic.GFE.WinClient.DefaultEditor
{
    /// <summary>
    /// příkaz nápovědného okýnka
    /// </summary>
    class CodeCompletionPopup : AbstractEditAction
    {
        /// <summary>
        /// spuštění příkazu
        /// </summary>
        /// <param name="textArea">pracovní plocha</param>
        public override void Execute(TextArea textArea)
        {
            if (textArea.MotherTextEditorControl is ReportDesignerTextAreaControl rdtac)
                rdtac.StartCtrlSpaceCompletion();
            //if (textArea.MotherTextEditorControl is XmlEditorControl)
            //{
            //    XmlEditorControl cntrl = (XmlEditorControl)textArea.MotherTextEditorControl;
            //    cntrl.StartCtrlSpaceCompletion();
            //}
        }
    }
}
