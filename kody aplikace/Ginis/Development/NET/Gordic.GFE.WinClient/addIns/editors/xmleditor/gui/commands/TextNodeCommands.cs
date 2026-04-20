//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TextNodeCommands.cs                    </Name>
//    <Description> Vložení vnitřní textové větve.                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-10                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Vložení vnitřní textové větve.
    /// </summary>
    public class InsertTextNodeBeforeCommand : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (Owner is XmlTreeViewContainerControl view)
                view.InsertTextNodeBefore();
        }
    }

    /// <summary>
    /// Vložení vnitřní textové větve.
    /// </summary>
    public class InsertTextNodeAfterCommand : AbstractMenuCommand
    {
        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (Owner is XmlTreeViewContainerControl view)
                view.InsertTextNodeAfter();
        }
    }

    /// <summary>
    /// Vložení vnitřní textové větve.
    /// </summary>
    public class AddChildTextNodeCommand : AbstractMenuCommand
    {
        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (Owner is XmlTreeViewContainerControl view)
                view.AppendChildTextNode();
        }
    }

}
