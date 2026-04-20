//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.StartDesktopCommand.cs              </Name>
//    <Description> Příkaz spuštění aplikace                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Windows.Forms;
using Gordic.Gfe.FormFiller.Gui;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.Gfe.FormFiller.Core
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
                LoggingService.Info(string.Join(" ", GResources.GetResourceText(29450042), file)); //RC 29450042 : otevření souboru
                didLoadFile = true;
                try { FileAgent.OpenFile(file); }
                catch (Exception e) { MessageService.ShowError(e, string.Format(string.Join(" ", GResources.GetResourceText(29450044), "'{0}'", GResources.GetResourceText(29450043)), file)); } //RC 29450044 : Soubor
            }

            if (!didLoadFile)
                foreach (ICommand command in AddInTree.BuildItems<ICommand>("/Workspace/AutostartNothingLoaded", null, false))
                    try { command.Run(); }
                    catch (Exception ex) { MessageService.ShowError(ex); }

            LoggingService.Info(GResources.GetResourceText(29450045)); //RC 29450045 : načtení filtrů aplikace
            LoggingService.Info(GResources.GetResourceText(29450046)); //RC 29450046 : odchytávaní klávesových zkrátek atd.
            MessageFilterManager.LoadMessageFilter(typeof(FormFillerMain));
            Application.Run(SimpleDesktop.MainForm);

            LoggingService.Info(GResources.GetResourceText(29450047)); //RC 29450047 : uložení vlastnosti pracovní plochy do IDE vlastnosti
            try { PropertyService.Set(desktopMemento, SimpleDesktop.Desktop.CreateMemento()); }
            catch (Exception e) { MessageService.ShowError(e, GResources.GetResourceText(29450048)); } //RC 29450048 : Chyba uložení stavu pracovní plochy!

            // uvolněnní filtrů zpráv aplikace
            MessageFilterManager.UnloadMessageFilter(typeof(FormFillerMain));
        }

    }
}
