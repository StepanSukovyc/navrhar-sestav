//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SolutionPreferences.cs                 </Name>
//    <Description> Preference řešení                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// Předvolby sestavení
    /// </summary>
    sealed class SolutionPreferences : IMementoCapable
    {
        /// <summary>
        /// reakce na změnu hlavního projektu
        /// </summary>
        public event EventHandler StartupProjectChanged;
        
        Property properties = new Property();
        /// <summary>
        /// Vlastnosti
        /// </summary>
        public Property Properties { get { return properties; } }

        string startupProject = "";
        /// <summary>
        /// Startovací projekt
        /// </summary>
        public IProject StartupProject
        {
            get
            {
                if (startupProject.Length == 0)
                    return null;
                foreach (IProject project in solution.Projects)
                    if (project.IdGuid.Equals(startupProject, StringComparison.OrdinalIgnoreCase))
                        return project;
                return null;
            }
            set { SetStartupProject((value != null) ? value.IdGuid : ""); }
        }

        External.ExternalTool startupTool = null;
        /// <summary>
        /// externí nástroj spuštění
        /// </summary>
        public External.ExternalTool StartupTool
        {
            get { return startupTool; }
            set { startupTool = value; if (startupTool != null) startupByOS = false; }
        }

        bool startupByOS = true;
        /// <summary>
        /// indikuje spuštění procesu dle názvu sestavení
        /// </summary>
        public bool StartupByOS { get { return startupByOS; } set { startupByOS = value; } }

        Solution solution;
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="solution">řešení</param>
        internal SolutionPreferences(Solution solution) { this.solution = solution; }

        /// <summary>
        /// Vytvoření vlastnosti ze stavu.
        /// </summary>
        Property IMementoCapable.CreateMemento()
        {
            Property p = properties;
            p.Set("StartupProject", startupProject);
            p.Set("StartupByOS", startupByOS);
            if (startupTool != null)
                p.Set("StartupTool", startupTool);
            return p;
        }

        /// <summary>
        /// Nastavení stavu dle vlastnosti.
        /// </summary>
        /// <param name="memento">Vlastnosti pro nastavení</param>
        void IMementoCapable.SetMemento(Property memento)
        {
            SetStartupProject(memento.Get("StartupProject", ""));
            startupTool = memento.Get("StartupTool", External.ExternalTool.Empty);
            startupByOS = memento.Get("StartupByOS", true);
            this.properties = memento;
        }
        void SetStartupProject(string value)
        {
            if (value != startupProject)
            {
                startupProject = value;
                StartupProjectChanged?.Invoke(this, EventArgs.Empty);
            }
        }

    }
}
