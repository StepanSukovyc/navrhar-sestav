//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ClearOutputWindow.cs                   </Name>
//    <Description> Vyčištění obsahu okna                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.MessageView
{
    /// <summary>
    /// Vyčištění obsahu okna
    /// </summary>
    class ClearOutputWindow : AbstractCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            MessageViewCategory selectedMessageViewCategory = CompilerMessageView.Instance.SelectedMessageViewCategory;
            if (selectedMessageViewCategory != null)
                selectedMessageViewCategory.ClearText();
        }
    }
}
