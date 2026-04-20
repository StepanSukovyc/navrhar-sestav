//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ApplicationCommands.cs                 </Name>
//    <Description> Ukončení aplikace                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-08-24                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;

namespace Gordic.GFE.WinClient.ApplicationCommands
{
    /// <summary>
    /// Ukončení aplikace
    /// </summary>
    class ExitDesktopCommand : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkatu ukončení
        /// </summary>
        public override void Run()
        {
            SimpleDesktop.MainForm.Close();
        }
    }
}
