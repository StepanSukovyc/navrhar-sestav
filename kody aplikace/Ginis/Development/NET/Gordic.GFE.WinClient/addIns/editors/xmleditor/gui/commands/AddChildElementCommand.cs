//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AddChildElementCommand.cs              </Name>
//    <Description> Přidání nového vnitřního elementu.                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-10                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Přidání nového vnitřního elementu.
    /// </summary>
    public class AddChildElementCommand : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (Owner is XmlTreeViewContainerControl view)
                view.AddChildElement();
        }
    }
}
