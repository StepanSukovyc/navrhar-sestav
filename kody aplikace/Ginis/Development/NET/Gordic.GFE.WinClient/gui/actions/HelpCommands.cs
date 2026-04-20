//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.HelpCommands.cs                        </Name>
//    <Description> zobrazení nápovědy                                          </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-09-18                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.HelpCommands
{
    /// <summary>
    /// zobrazení nápovědy
    /// </summary>
    class ShowHelp : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run() { HelpService.ShowHelp(ReportDesignerMain.Current.ApplicationInfo); }
    }
}
