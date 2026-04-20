//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Commands.cs                            </Name>
//    <Description> dostupné příkazy formátu OXS                                </Description>
//    <Author>      Mgr. Stepan Sukovyč                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2016-09-01                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Validace Excel v OXS, MSE editoru
    /// </summary>
    class ExcelValidateCommand : AbstractMenuCommand
    {
        /// <summary>
        /// Validace MSE
        /// </summary>
        public override void Run() { Validate(true); }
        /// <summary>
        /// Validace dokumentu Excel
        /// </summary>
        /// <param name="waitDialog">Indikuje zobrazení čekacího dialogu</param>
        public static void Validate(bool waitDialog)
        {
            if (SimpleDesktop.Desktop.ActiveViewContent is OxsViewContent content)
                (content.PrimaryViewContent as OfficeView).ValidateDocument(waitDialog);
        }
    }
}
