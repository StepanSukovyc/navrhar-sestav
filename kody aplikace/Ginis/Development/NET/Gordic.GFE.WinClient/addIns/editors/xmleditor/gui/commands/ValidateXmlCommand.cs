//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ValidateXmlCommand.cs                  </Name>
//    <Description> Validace XML v XML editoru                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-10                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.DefaultEditor;
using Gordic.GFE.WinClient.Editor;
using Gordic.GFE.WinClient.XmlEditor.Gui.Editor;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Validace XML v XML editoru dle nového schématu
    /// </summary>
    public class ValidateXmlCommand : AbstractMenuCommand
    {
        /// <summary>
        /// Validace XML.
        /// </summary>
        public override void Run()
        {
            // nalezení aktivního XmlView.
            XmlView xmlView = XmlView.ActiveXmlView;
            // validace XML.
            xmlView?.ValidateXml();
        }
    }
    /// <summary>
    /// Validace XML v XML editoru dle nového schématu
    /// </summary>
    public class AlfValidateCommand : AbstractMenuCommand
    {
        /// <exclude/>
        public override bool IsEnabled { get => XmlView.ActiveXmlView is GraphicView && XmlView.ActiveXmlView.Control is ReportDesignerTextAreaControl; }
        /// <summary>
        /// Validace XML.
        /// </summary>
        public override void Run()
        {
            // nalezení aktivního XmlView.
            XmlView xmlView = XmlView.ActiveXmlView;
            // validace XML.
            xmlView?.ValidateAlf(true);
        }
    }
}
