//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.RemoveAttributeCommand.cs              </Name>
//    <Description> Odstranění vybraného atributu z XML dokumentu               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-10                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Odstranění vybraného atributu z XML dokumentu
    /// </summary>
    public class RemoveAttributeCommand : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            //XmlTreeViewContainerControl view = Owner as XmlTreeViewContainerControl;
            //if (view != null)
            //    view.RemoveAttribute();
            if (Owner is XmlTreeViewContainerControl view)
                view.RemoveAttribute();
        }
    }
}
