//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.BuildCommands.cs                       </Name>
//    <Description> Příkazy kompilace projektu                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-07                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.FileCommands;
using Gordic.GFE.WinClient.Services;

namespace Gordic.GFE.WinClient.Project.Commands
{
    abstract class AbstractBuildMenuCommand : AbstractMenuCommand
    {
        public virtual bool CanRunBuild { get { return ProjectService.OpenSolution != null; } }

        public virtual void BeforeBuild()
        {
            TaskService.BuildMessageViewCategory.ClearText();
            TaskService.InUpdate = true;
            TaskService.ClearExceptCommentTasks();
            TaskService.InUpdate = false;
            SaveAllFiles.SaveAll();
        }

        public virtual void AfterBuild() { }

        public override void Run()
        {
            if (CanRunBuild)
            {
                BeforeBuild();
                StartBuild();
            }
            else
                AddNoSingleFileCompilationError();
        }

        BuildResults lastBuildResults;

        public BuildResults LastBuildResults
        {
            get { return lastBuildResults; }
            protected set { lastBuildResults = value; }
        }

        protected void CallbackMethod(BuildResults results)
        {
            lastBuildResults = results;
            ShowResults(results);
            AfterBuild();
            OnBuildComplete(EventArgs.Empty);
        }

        public abstract void StartBuild();

        public event EventHandler BuildComplete;

        protected virtual void OnBuildComplete(EventArgs e)
        {
            if (BuildComplete != null)
                BuildComplete(this, e);
        }

        public static void ShowResults(BuildResults results)
        {
            if (results != null)
            {
                TaskService.InUpdate = true;
                foreach (BuildError error in results.Errors)
                    TaskService.Add(new Task_(error));
                TaskService.InUpdate = false;
                //if (results.Errors.Count > 0 && ErrorListPad.ShowAfterBuild)
                //    SimpleDesktop.Desktop.GetPad(typeof(ErrorListPad)).BringPadToFront();
            }
        }

        /// <summary>
        /// Přidání chybové zprávy
        /// </summary>
        public static void AddNoSingleFileCompilationError()
        {
            //TaskService.Add(new Task(null, StringParser.Parse("Kompilace jednotlivých souborů nejsou podporovány, prosím, vytvořit projekt!"), 0, 0, TaskType.Error));
            //SimpleDesktop.Desktop.GetPad(typeof(ErrorListPad)).BringPadToFront();
        }
    }

    abstract class AbstractProjectBuildMenuCommand : AbstractBuildMenuCommand
    {
        protected IProject targetProject;
        protected IProject ProjectToBuild { get { return targetProject ?? ProjectService.CurrentProject; } }

        public override bool CanRunBuild { get { return base.CanRunBuild && this.ProjectToBuild != null; } }
    }

    class BuildProject : AbstractProjectBuildMenuCommand
    {
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public BuildProject() { }
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="targetProject"></param>
        public BuildProject(IProject targetProject)
        {
            this.targetProject = targetProject;
        }
        /// <summary>
        /// před kompilací projektu
        /// </summary>
        public override void BeforeBuild()
        {
            base.BeforeBuild();
            ProjectService.RaiseEventStartBuild();
        }
        /// <summary>
        /// začatek kompilace projektu
        /// </summary>
        public override void StartBuild()
        {
            //BuildEngine.BuildInGui(this.ProjectToBuild, new BuildOptions(BuildTarget.Build, CallbackMethod));
        }
        /// <summary>
        /// po kompilací projektu
        /// </summary>
        public override void AfterBuild()
        {
            ProjectService.RaiseEventEndBuild(new BuildEventArgs(LastBuildResults));
            base.AfterBuild();
        }
    }

    class BuildProjectBeforeExecute : BuildProject
    {
        public BuildProjectBeforeExecute(IProject project)
            : base(project)
        {
        }

        public override void Run()
        {
            LastBuildResults = new BuildResults { Result = BuildResultCode.Success };
            OnBuildComplete(EventArgs.Empty);
        }

        public override void StartBuild()
        {
        }
    }

}
