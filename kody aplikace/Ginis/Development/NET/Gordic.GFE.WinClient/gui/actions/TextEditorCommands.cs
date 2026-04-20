//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SearchAndReplace.cs                    </Name>
//    <Description> příkaz Najít                                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-18                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.DefaultEditor;

namespace Gordic.GFE.WinClient.Gui
{
    /// <summary>
    /// příkaz Najít
    /// </summary>
    class FindNext : AbstractMenuCommand
    {
        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled { get { return SimpleDesktop.Desktop.ActiveViewContent is ITextEditorControlProvider; } }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            ITextEditorControlProvider editable = SimpleDesktop.Desktop.ActiveViewContent as ITextEditorControlProvider;
            if (editable != null)
                Gordic.TextEditor.SearchAndReplace.Find.FindAction(editable.TextEditorControl);
        }
    }

    /// <summary>
    /// příkaz Nahradit
    /// </summary>
    class ReplaceNext : AbstractMenuCommand
    {
        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled { get { return SimpleDesktop.Desktop.ActiveViewContent is ITextEditorControlProvider; } }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            ITextEditorControlProvider editable = SimpleDesktop.Desktop.ActiveViewContent as ITextEditorControlProvider;
            if (editable != null)
                Gordic.TextEditor.SearchAndReplace.Replace.ReplaceAction(editable.TextEditorControl);
        }
    }
}
