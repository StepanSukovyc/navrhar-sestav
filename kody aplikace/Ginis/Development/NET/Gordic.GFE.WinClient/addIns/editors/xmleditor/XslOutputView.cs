//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XslOutputView.cs                       </Name>
//    <Description> Zobrazuje výsledný výstup z XSL transformace.               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.XmlEditor.Gui.Editor;
using Gordic.General;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Zobrazuje výsledný výstup z XSL transformace.
    /// </summary>
    class XslOutputView : XmlView
    {
        /// <summary>
        /// Vytvořenínové instance třídy
        /// </summary>
        public XslOutputView()
        {
            TitleName = GResources.GetResourceText(29450228); //RC 29450228 : XLST výstup
        }

        public override IViewContent Initialize()
        {
            base.Initialize();
            TextEditorControl.FileName = String.Empty;
            return this;
        }
        /// <summary>
        /// Instance objektu
        /// </summary>
        public static XslOutputView Instance
        {
            get
            {
                foreach (IViewContent content in SimpleDesktop.Desktop.ViewContentCollection)
                    if (content is XslOutputView)
                    {
                        LoggingService.Debug("XslOutputView" + GResources.GetResourceText(29450229)); //RC 29450229 : instance existuje
                        return (XslOutputView)content;
                    }
                return null;
            }
        }
    }
}
