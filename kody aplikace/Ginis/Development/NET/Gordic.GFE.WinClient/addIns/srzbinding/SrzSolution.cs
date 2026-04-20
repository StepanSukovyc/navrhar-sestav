//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SrzProject.cs                          </Name>
//    <Description> SRZ projekt                                                 </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2014-06-05                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Project;
using System;

namespace Gordic.GFE.WinClient.SrzBinding
{
    /// <summary>
    /// třída SRZ sestavení
    /// </summary>
    class SrzSolution : Solution
    {
        /// <summary>
        /// indikuje spustitelnost sestavení
        /// </summary>
        public override bool IsRunable { get => true; } 
        /// <summary>
        /// spuštění sestavení
        /// </summary>
        public override bool Run()
        {
            if (!base.Run())
                return TryRunStartableProject();

            return true;
        }

        /// <summary>
        /// Zkusí spustit startovací projekt
        /// </summary>
        bool TryRunStartableProject()
        {
            foreach (var project in Projects)
            {
                if (project.IsStartable)
                {
                    if (FileUtility.StartVidRun(project.FileName))
                        return true;

                    return TryStartProcess(project.FileName);
                }
            }
            return false;
        }

        /// <summary>
        /// Zkusí spustit proces
        /// </summary>
        bool TryStartProcess(string fileName)
        {
            try
            {
                System.Diagnostics.Process.Start(fileName);
                return true;
            }
            catch (Exception ex)
            {
                MessageService.ShowErrorFormatted($"{GResources.GetResourceText(29451460)}\r\n{{0}}", ex.Message);
                return false;
            }
        }
    }
}
