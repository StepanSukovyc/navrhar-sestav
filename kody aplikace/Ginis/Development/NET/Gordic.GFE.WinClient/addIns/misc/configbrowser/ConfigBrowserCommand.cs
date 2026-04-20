//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ConfigBrowserCommand.cs                </Name>
//    <Description> Pøíkaz spuštìní prùzkumníka konfigurace                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-08                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;

namespace Gordic.GFE.WinClient.ConfigBrowser
{
    /// <summary>
    /// Pøíkaz spuštìní prùzkumníka konfigurace
    /// </summary>
	class ConfigBrowserCommand : AbstractMenuCommand
	{
        /// <summary>
        /// Spuštìní pøíkazu
        /// </summary>
		public override void Run() 
		{
			ConfigBrowserViewContent vw = new ConfigBrowserViewContent();
			SimpleDesktop.Desktop.ShowView(vw);
		}
	}
}
