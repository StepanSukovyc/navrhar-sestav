//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.InsertCommentCommands.cs               </Name>
//    <Description> vložení nového vnitřního komentáře.                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-10                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// vložení nového vnitřního komentáře.
    /// </summary>
    public class InsertCommentBeforeCommand : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (Owner is XmlTreeViewContainerControl view)
                view.InsertCommentBefore();
        }
    }

    /// <summary>
    /// vložení nového vnitřního komentáře.
    /// </summary>
    public class InsertCommentAfterCommand : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (Owner is XmlTreeViewContainerControl view)
                view.InsertCommentAfter();
        }
    }

    /// <summary>
    /// vložení nového vnitřního komentáře.
    /// </summary>
    public class AddChildCommentCommand : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (Owner is XmlTreeViewContainerControl view)
                view.AppendChildComment();
        }
    }
}
