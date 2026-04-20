//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.ApplicationCommands.cs                </Name>
//    <Description> příkazy aplikace                                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-12                                                  </Created>
//  </FileHeader>

using Gordic.Gfe.FormFiller.Gui;
using Gordic.GFE.Parsers.Core;

namespace Gordic.Gfe.FormFiller.ApplicationCommands
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
