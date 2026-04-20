//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.TextEditor.ContentCommands.cs                        </Name>
//    <Description> převod výběru na velká, resp. malá písmenka                 </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-03-03                                                  </Created>
//  </FileHeader>

namespace Gordic.TextEditor.Misc
{
    /// <summary>
    /// převod výběru na velká, resp. malá písmenka
    /// </summary>
    public class ToUpperLower
    {
        /// <summary>
        /// spuštění příkazu převodu výběru na velká písmenka
        /// </summary>
        /// <param name="textControl">textový ovladač</param>
        public static void ToUpper(TextEditorControl textControl)
        {
            if (textControl == null || textControl.ActiveTextAreaControl == null)
                return;

            Document.SelectionManager manager = textControl.ActiveTextAreaControl.SelectionManager;
            if (manager == null || !manager.HasSomethingSelected)
                return;

            foreach (var item in manager.SelectionCollection)
                textControl.ActiveTextAreaControl.Document.Replace(item.EndOffset - item.Length, item.Length, item.SelectedText.ToUpper());
        }
        /// <summary>
        /// spuštění příkazu převodu výběru na malá
        /// </summary>
        /// <param name="textControl">textový ovladač</param>
        public static void ToLower(TextEditorControl textControl)
        {
            if (textControl == null || textControl.ActiveTextAreaControl == null)
                return;

            Document.SelectionManager manager = textControl.ActiveTextAreaControl.SelectionManager;
            if (manager == null || !manager.HasSomethingSelected)
                return;

            foreach (var item in manager.SelectionCollection)
                textControl.ActiveTextAreaControl.Document.Replace(item.EndOffset - item.Length, item.Length, item.SelectedText.ToLower());
        }
    }
}
