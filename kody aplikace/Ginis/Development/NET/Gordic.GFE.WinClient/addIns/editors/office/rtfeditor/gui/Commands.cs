//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ObjectProperty.cs                      </Name>
//    <Description> Vlastností výběru                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-14                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Validace RTF v RTF editoru
    /// </summary>
    class RtfValidateCommand : AbstractMenuCommand
    {
        /// <summary>
        /// Validace RTF.
        /// </summary>
        public override void Run() { Validate(true); }

        /// <summary>
        /// Validace dokumentu RTF
        /// </summary>
        /// <param name="waitDialog">Indikuje zobrazení čekacího dialogu</param>
        public static void Validate(bool waitDialog)
        {
            if (SimpleDesktop.Desktop.ActiveViewContent is RtfViewContent content)
                (content.PrimaryViewContent as OfficeView).ValidateDocument(waitDialog);
        }
    }

    /// <summary>
    /// Validace RTF v RTF editoru
    /// </summary>
    class OfficeForceGenerateCommand : AbstractMenuCommand
    {
        /// <summary>
        /// Validace RTF.
        /// </summary>
        public override void Run()
        {
            if (SimpleDesktop.Desktop.ActiveViewContent is Gordic.GFE.WinClient.FormatOffice.AOfficeViewContent content && content.Control is IDocumentView)
            {
                (content.Control as IDocumentView).IsDirty = true;
                if (content is RtfViewContent)
                    RtfTemplateService.PrepareSelection(content.Control as IOfficeDocumentView);
                else
                    OfficeTemplateService.PrepareSelection(content.Control as IOfficeDocumentView);
            }
        }
    }
}
