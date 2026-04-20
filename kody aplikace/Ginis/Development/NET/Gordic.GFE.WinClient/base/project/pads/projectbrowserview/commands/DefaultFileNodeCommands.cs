//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DefaultFileNodeCommands.cs             </Name>
//    <Description> Otevření vybrané položky                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-25                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.AddIns;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.WinClient.Gui;
using Gordic.General;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// Otevřít soubor z prohlížeče projektu
    /// </summary>
    class OpenFileFromProjectBrowser : AbstractMenuCommand
    {
        public override void Run()
        {
            AbstractFileTreeNode node = ProjectBrowserPad.Instance.SelectedNode;
            if (node == null)
                return;

            node.ActivateItem();
        }
    }

    class AbstractSolutionMenuCommand : AbstractMenuCommand
    {
        /// <summary>
        /// vlastnosti složky sestavení
        /// </summary>
        protected ISolutionFolderProperties isfp;
        /// <exclude/>
        public override bool IsEnabled
        {
            get
            {
                isfp = ProjectService.OpenSolution as ISolutionFolderProperties;
                return isfp != null;
            }
        }
        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run() { throw new NotImplementedException(); }
    }

    /// <summary>
    /// vytvoření archivu
    /// </summary>
    class CreateArchive : AbstractSolutionMenuCommand
    {
        /// <exclude/>
        public override bool IsEnabled { get => base.IsEnabled && isfp.CanCreateArchive; }
        /// <exclude/>
        public override void Run()
        {
            if (isfp != null)
                isfp.CreateArchive();
        }
    }

    /// <summary>
    /// nastavení sestavení
    /// </summary>
    class SolutionOptions : AbstractSolutionMenuCommand
    {
        /// <exclude/>
        public override bool IsEnabled { get => base.IsEnabled && isfp.ShowOptions; }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            PropertyCommand.ShowPropertyOptions(GResources.GetResourceText(29451483), AddInTree.GetTreeNode("/SolutionOptionsDialog"));
        }
    }

    /// <summary>
    /// Příkaz spuštění sestavení
    /// </summary>
    class RunSolution : AbstractSolutionMenuCommand
    {
        /// <summary>
        /// dostupnost příkazu
        /// </summary>
        public override bool IsEnabled { get => base.IsEnabled && isfp.IsRunable; }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run() { isfp.Run(); }
    }

    /// <summary>
    /// Zavření sestavení
    /// </summary>
    class CloseSolution : AbstractSolutionMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            ProjectService.SaveSolutionPreferences();
            SimpleDesktop.Desktop.CloseAllViews(true);
            ProjectService.CloseSolution();
        }
    }

}
