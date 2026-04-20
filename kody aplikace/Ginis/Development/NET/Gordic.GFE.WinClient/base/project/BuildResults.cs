//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.BuildResults.cs                        </Name>
//    <Description> Kompilace skončila úspěšně.                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Gordic.GFE.WinClient.Project
{
    enum BuildResultCode
    {
        None,
        /// <summary>Kompilace skončila úspěšně.</summary>
        Success,
        /// <summary>Došlo k chybě při kompilací</summary>
        Error,
        /// <summary>Projekt není patný</summary>
        BuildFileError,
        /// <summary>kompilace byla zrušená.</summary>
        Cancelled
    }

    /// <summary>
    /// třída pro zabalení výsledků kompilace sestavení.
    /// </summary>
    class BuildResults
    {
        List<BuildError> errors = new List<BuildError>();
        ReadOnlyCollection<BuildError> readOnlyErrors;

        List<IBuildable> builtProjects = new List<IBuildable>();
        ReadOnlyCollection<IBuildable> readOnlyBuiltProjects;

        BuildResultCode result;
        int errorCount, warningCount;

        /// <summary>
        /// Přidání chyby/varování při kompilací
        /// </summary>
        public void Add(BuildError error)
        {
            if (error == null)
                throw new ArgumentNullException("error");
            lock (errors)
            {
                readOnlyErrors = null;
                errors.Add(error);
                if (error.IsWarning)
                    warningCount++;
                else
                    errorCount++;
            }
        }

        /// <summary>
        /// Přidání projektu do seznamu kompilovatelných
        /// </summary>
        public void AddBuiltProject(IBuildable buildable)
        {
            if (buildable == null)
                throw new ArgumentNullException("buildable");
            lock (builtProjects)
            {
                readOnlyBuiltProjects = null;
                builtProjects.Add(buildable);
            }
        }

        /// <summary>
        /// Gets the list of build errors or warnings.
        /// This property is thread-safe.
        /// </summary>
        public ReadOnlyCollection<BuildError> Errors
        {
            get
            {
                lock (errors)
                {
                    if (readOnlyErrors == null)
                        readOnlyErrors = Array.AsReadOnly(errors.ToArray());
                    return readOnlyErrors;
                }
            }
        }

        /// <summary>
        /// Seznam kompilovaných projektů
        /// </summary>
        public ReadOnlyCollection<IBuildable> BuiltProjects
        {
            get
            {
                lock (builtProjects)
                {
                    if (readOnlyBuiltProjects == null)
                        readOnlyBuiltProjects = Array.AsReadOnly(builtProjects.ToArray());
                    return readOnlyBuiltProjects;
                }
            }
        }

        public BuildResultCode Result
        {
            get { return result; }
            set { result = value; }
        }

        public int ErrorCount { get { return errorCount; } }

        public int WarningCount { get { return warningCount; } }
    }
}
