//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ToggleFullscreenCommand.cs             </Name>
//    <Description> přepnutí na úplnou obrazovku                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-22                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;

namespace Gordic.GFE.WinClient.Commands
{
    /// <summary>
    /// přepnutí na úplnou obrazovku
    /// </summary>
    class ToggleFullscreenCommand : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            ((DefaultDesktop)SimpleDesktop.Desktop).FullScreen = 
                !((DefaultDesktop)SimpleDesktop.Desktop).FullScreen;
        }
    }
}
