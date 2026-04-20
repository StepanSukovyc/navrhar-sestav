//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.StartDesktopCommand.cs               </Name>
//    <Description> Příkaz spuštění aplikace                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-12-24                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.General;

namespace Gordic.GFE.WinClient.Core
{
    /// <summary>
    /// Příkaz spuštění aplikace
    /// </summary>
    class StartDesktopCommand
    {
        const string desktopMemento = "DesktopProperty";
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        /// <param name="fileList">Seznam souborů k spuštění</param>
        public void Run(IList<StartupFile> fileList)
        {
            bool didLoadFile = false;

            foreach (var file in fileList)
            {
                LoggingService.InfoFormatted(GResources.GetResourceText(29450292) + " '{0}' ...", file); //RC 29450292 : otevření souboru
                didLoadFile = true;
                try { FileAgent.OpenFile(file); }
                catch (Exception e) { MessageService.ShowError(e, string.Format(GResources.GetResourceText(29450253) + " '{0}' " + GResources.GetResourceText(29450293), file)); } //RC 29450253 : soubor
            }

            if (!didLoadFile)
                foreach (ICommand command in AddInTree.BuildItems<ICommand>("/Workspace/AutostartNothingLoaded", null, false))
                    try { command.Run(); }
                    catch (Exception ex) { MessageService.ShowError(ex); }

            // spuštění analyzátoru
            ParserService.StartParserThread();
            // spuštění služby hledání objektu nad myši
            TowedService.StartTowedService();
            LoggingService.Info(GResources.GetResourceText(29450294) + "..."); //RC 29450294 : načtení filtrů aplikace, klávesových zkratek
            MessageFilterManager.LoadMessageFilter(typeof(ReportDesignerMain));

            Application.Run(SimpleDesktop.MainForm);

            LoggingService.Info(GResources.GetResourceText(29450295)); //RC 29450295 : uložení vlastnosti pracovní plochy do IDE vlastnosti
            try { PropertyService.Set(desktopMemento, SimpleDesktop.Desktop.CreateMemento()); }
            catch (Exception e) { MessageService.ShowError(e, GResources.GetResourceText(29450296)); } //RC 29450296 : Chyba uložení stavu pracovní plochy!

            // uvolněnní filtrů zpráv aplikace
            MessageFilterManager.UnloadMessageFilter(typeof(ReportDesignerMain));
        }
    }
}
