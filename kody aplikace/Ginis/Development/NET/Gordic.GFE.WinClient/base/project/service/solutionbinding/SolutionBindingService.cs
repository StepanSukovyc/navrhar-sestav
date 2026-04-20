//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SolutionBindingService.cs              </Name>
//    <Description> Služba pro práci s jazyky projektů                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.General;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// Služba pro práci s jazyky projektů
    /// </summary>
    static class SolutionBindingService
    {
        static readonly IList<SolutionBindingDescriptor> bindings;
        static readonly IList<SolutionTypeDescriptor> solutionTypes;
        static SolutionBindingService()
        {
            bindings = AddInTree.BuildItems<SolutionBindingDescriptor>("/ReportDesigner/Desktop/LanguageBindings", null, false);
            solutionTypes = AddInTree.BuildItems<SolutionTypeDescriptor>("/ReportDesigner/Desktop/SolutionTypeBindings", null, false);
        }
        /// <summary>
        /// Získání vazby dle názvu souboru projektu
        /// </summary>
        /// <param name="filename">soubor projektu</param>
        /// <returns></returns>
        public static ISolutionBinding GetBindingPerProjectFile(string filename)
        {
            SolutionBindingDescriptor descriptor = GetEntityPerProjectFile(filename);
            return descriptor?.Binding;
        }
        /// <summary>
        /// Získání deskriptoru dle názvu souboru projektu
        /// </summary>
        /// <param name="fileName">název souboru projektu</param>
        /// <returns></returns>
        public static SolutionBindingDescriptor GetEntityPerProjectFile(string fileName)
        {
            string ext = Path.GetExtension(fileName).ToUpperInvariant();
            foreach (SolutionBindingDescriptor binding in bindings)
                if (binding.ProjectFileExtension.Equals(ext, StringComparison.OrdinalIgnoreCase))
                    return binding;
            return null;
        }

        /// <summary>
        /// Načtení projektu v kontextu řešení
        /// </summary>
        /// <param name="solution">řešení projektu</param>
        /// <param name="location">umístění projektu</param>
        /// <param name="title"></param>
        /// <returns></returns>
        public static IProject LoadProject(Solution solution, string location, string title) => LoadProject(solution, location, null);

        /// <summary>
        /// načtení projektu
        /// </summary>
        /// <param name="solution">sestavení projektu</param>
        /// <param name="location">umístění konfiguračního souboru projektu</param>
        /// <param name="title">titulek projektu</param>
        /// <param name="progressMonitor">čekácí dialogové okýnko</param>
        /// <param name="binding">vazba typu sestavení</param>
        /// <returns></returns>
        public static IProject LoadProject(Solution solution, string location, string title, AsynchronousWaitDialog progressMonitor = null, ISolutionBinding binding = null)
        {
            if (solution == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450686)); //RC 29450686 : sestavení je NULL!
            if (location == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450687)); //RC 29450687 : umístění konfiguračního souboru projektu je NULL!

            IProject newProject;
            if (!File.Exists(location))
                newProject = new MissingProject(location, title);
            else
            {
                if (binding != null)
                {
                    location = FileUtility.NormalizePath(location);
                    try { newProject = binding.LoadProject(solution, location, title); }
                    catch (ProjectLoadException ex)
                    {
                        throw ex;
                        //if (progressMonitor != null) progressMonitor.ShowingDialog = true;
                        //newProject = new UnknownProject(location, title, ex.Message, true);
                        //if (progressMonitor != null) progressMonitor.ShowingDialog = false;
                    }
                    catch (UnauthorizedAccessException ex)
                    {
                        LoggingService.Warning(GResources.GetResourceText(29450404), ex); //RC 29450404 : Chyba načtení projektu!
                        if (progressMonitor != null) progressMonitor.ShowingDialog = true;
                        newProject = new UnknownProject(location, title, ex.Message, true);
                        if (progressMonitor != null) progressMonitor.ShowingDialog = false;
                    }
                }
                else
                    newProject = new UnknownProject(location, title);
            }
            return newProject;
        }

        public static SolutionBindingDescriptor GetEntityPerLanguageName(string languagename)
        {
            foreach (SolutionBindingDescriptor binding in bindings)
                if (binding.Language == languagename)
                    return binding;
            return null;
        }

        #region NEW
        /// <summary>
        /// start sestavení dle typu sestavení
        /// </summary>
        /// <param name="solution">aktuální sestavení</param>
        /// <param name="force">TRUE - v případě chyby konfiguračního souboru sestavení se nabídne oprava samotného konfiguračního souboru</param>
        /// <returns></returns>
        internal static bool SetupSolution(Solution solution, bool force)
        {
            if (solution == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450686));
            if (string.IsNullOrEmpty(solution.FileName))
                throw new ArgumentNullException(GResources.GetResourceText(29451486));

            using (AsynchronousWaitDialog waitDialog = AsynchronousWaitDialog.ShowWaitDialog(GResources.GetResourceText(29450383))) //RC 29450383 : načtení sestavení
            {
                // najdeme vazbu na sestavení
                ISolutionBinding binding = GetBindingPerProjectFile(solution.FileName);
                if (binding != null)
                {
                    binding.SetupSolution(solution, waitDialog, force);
                    return true;
                }
            }

            return false;
        }
        /// <summary>
        /// načtení části sestavení
        /// </summary>
        /// <param name="solution">sestavení k načtení</param>
        /// <param name="item">část sestavení</param>
        /// <param name="waitDialog">čekácí dialogové okno</param>
        /// <param name="binding">vazba na SSR sestavení</param>
        /// <param name="location">umístění konfiguračního souboru projektu</param>
        /// <returns></returns>
        internal static ISolutionFolder LoadProject(Solution solution, string location, dynamic item, AsynchronousWaitDialog waitDialog, ISolutionBinding binding)
        {
            if (solution == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450686));
            if (item == null)
                throw new ArgumentNullException(GResources.GetResourceText(29451487));

            IProject newProject;
            if (binding != null)
            {
                try { newProject = binding.LoadProject(solution, item); }
                catch (ProjectLoadException ex)
                {
                    LoggingService.Warning(GResources.GetResourceText(29450404), ex); //RC 29450404 : Chyba načtení projektu!
                    if (waitDialog != null) waitDialog.ShowingDialog = true;
                    newProject = new UnknownProject(ex.Message);
                    if (waitDialog != null) waitDialog.ShowingDialog = false;
                }
                catch (UnauthorizedAccessException ex)
                {
                    LoggingService.Warning(GResources.GetResourceText(29450404), ex); //RC 29450404 : Chyba načtení projektu!
                    if (waitDialog != null) waitDialog.ShowingDialog = true;
                    newProject = new UnknownProject(ex.Message);
                    if (waitDialog != null) waitDialog.ShowingDialog = false;
                }
            }
            else
                newProject = new UnknownProject();

            if (newProject != null)
                newProject.FileName = location;

            return newProject;
        }

        #endregion

        /// <summary>
        /// uložení sestavení
        /// </summary>
        /// <param name="solution">sestavení k uložení</param>
        internal static void SaveSolution(Solution solution)
        {
            if (solution == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450686));

            using (AsynchronousWaitDialog waitDialog = AsynchronousWaitDialog.ShowWaitDialog(GResources.GetResourceText(29451488))) //RC 29450383 : načtení sestavení
            {
                // najdeme vazbu na sestavení
                ISolutionBinding binding = SolutionBindingService.GetBindingPerProjectFile(solution.FileName);
                binding?.SaveSolution(solution, waitDialog);
            }
        }

        /// <summary>
        /// získání typu sestavení
        /// </summary>
        /// <param name="fileName">název souboru sestavení</param>
        /// <returns></returns>
        internal static Type GetSolutionType(string fileName)
        {
            if (!string.IsNullOrEmpty(fileName))
            {
                string ext = Path.GetExtension(fileName);
                foreach (SolutionTypeDescriptor item in solutionTypes)
                {
                    List<string> exts = item.SupportedExtensions.Split(';').ToList<string>();

                    if (exts.Contains(ext, StringComparer.OrdinalIgnoreCase))
                        return Type.GetType(item.Class);
                }
            }

            return typeof(Solution);
        }

        /// <summary>
        /// znovu načtení sestavení
        /// </summary>
        /// <param name="solution">sestavení ke znovu načtení</param>
        internal static void ReloadSolution(Solution solution)
        {
            if (solution == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450686));
            if (string.IsNullOrEmpty(solution.FileName))
                throw new ArgumentNullException(GResources.GetResourceText(29451486));

            using (AsynchronousWaitDialog waitDialog = AsynchronousWaitDialog.ShowWaitDialog(GResources.GetResourceText(29451489)))
            {
                // najdeme vazbu na sestavení
                GetBindingPerProjectFile(solution.FileName)?.ReloadSolution(solution, waitDialog);
            }
        }
    }
}
