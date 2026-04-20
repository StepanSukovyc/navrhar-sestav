//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FileTabStripCommands.cs                </Name>
//    <Description> Reakce na příkaz Zavřít vše kromě aktuálního                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using System.Linq;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.WinForm;
using Gordic.GFE.WinClient.Gui;

namespace Gordic.GFE.WinClient.FileTabStripCommands
{
    /// <summary>
    /// Reakce na příkaz Zavřít vše kromě aktuálního
    /// </summary>
    class CloseAllButThisFileTab : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            IDesktopWindow thisWindow = Owner as IDesktopWindow;
            foreach (IDesktopWindow window in SimpleDesktop.Desktop.DesktopWindowCollection.ToArray())
                if (window != thisWindow)
                    if (!window.CloseWindow(false))
                        break;
        }
    }
    /// <summary>
    /// Kopírování cesty (do clipboardu).
    /// </summary>
    class CopyPathName : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            IDesktopWindow window = Owner as IDesktopWindow;
            ClipboardWrapper.SetText(window.ActiveViewContent.PrimaryFileName ?? "");
        }
    }
    /// <summary>
    /// Otevře složku do schránky
    /// </summary>
    class OpenFolderContainingFile : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            IDesktopWindow window = Owner as IDesktopWindow;
            FileCommands.OpenFolderContainingFile.OpenContainingFolderInExplorer(
                window.ActiveViewContent.PrimaryFileName);
        }
    }

}
