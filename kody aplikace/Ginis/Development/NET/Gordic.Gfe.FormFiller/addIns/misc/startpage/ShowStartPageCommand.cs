//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.ShowStartPageCommand.cs                </Name>
//    <Description> Příkaz spuštění startovací stránky                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-03                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Gui;
using Gordic.Gfe.FormFiller.Gui;
using Gordic.GFE.Parsers.Core;

namespace Gordic.Gfe.FormFiller.StartPage
{
    /// <summary>
    /// Příkaz spuštění startovací stránky
    /// </summary>
    public class ShowStartPageCommand : AbstractMenuCommand
    {
        static bool isFirstStartPage = true;
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (isFirstStartPage)
                isFirstStartPage = false;

            foreach (IViewContent view in SimpleDesktop.Desktop.ViewContentCollection)
            {
                if (view is StartPane b)
                {
                    view.DesktopWindow.SelectWindow();
                    return;
                }
            }

            SimpleDesktop.Desktop.ShowView(new StartPane().Initialize());
        }
    }
}
