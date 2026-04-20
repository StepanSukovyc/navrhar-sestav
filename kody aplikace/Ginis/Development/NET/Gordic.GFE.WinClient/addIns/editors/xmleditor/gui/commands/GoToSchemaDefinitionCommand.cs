//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GoToSchemaDefinitionCommand.cs         </Name>
//    <Description> Nalezení definici XML elementu nebo atributu pod kurzorem.  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-10                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.XmlEditor.Gui.Editor;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Nalezení definici XML elementu nebo atributu pod kurzorem.
    /// </summary>
    public class GoToSchemaDefinitionCommand : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            XmlView view = XmlView.ActiveXmlView;
            if (view != null)
                view.GoToSchemaDefinition();
        }
    }
}
