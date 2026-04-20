//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AddAttributeCommand.cs                 </Name>
//    <Description> přidání nového atributu do XML stromu atributů              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-10                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// přidání nového atributu do XML stromu atributů
    /// </summary>
    public class AddAttributeCommand : AbstractMenuCommand
    {
        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (Owner is XmlTreeViewContainerControl view)
                view.AddAttribute();
        }
    }
}
