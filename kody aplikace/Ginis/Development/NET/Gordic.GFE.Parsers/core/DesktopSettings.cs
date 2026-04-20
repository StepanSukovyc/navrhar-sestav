//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DesktopSettings.cs                     </Name>
//    <Description> Třída, obsahující vlastnosti ovladače JAK se má aplikace spustit</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-10                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.ObjectModel;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// startovací info
    /// </summary>
    public sealed class StartupFile
    {
        readonly string name;
        /// <exclude/>
        public string Name { get { return name; } }

        readonly bool isUntitled;
        /// <exclude/>
        public bool IsUntitled { get { return isUntitled; } }

        readonly bool isProject;
        /// <exclude/>
        public bool IsProject { get { return isProject; } }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <param name="isUntitled"></param>
        /// <param name="isProject"></param>
        public StartupFile(string name, bool isUntitled = false, bool isProject = false)
        {
            this.name = name;
            this.isUntitled = isUntitled;
            this.isProject = isProject;
        }
    }

    /// <summary>
    /// Třída, obsahující vlastnosti ovladače JAK se má aplikace spustit
    /// </summary>
    [Serializable]
    public sealed class DesktopSettings
    {
        bool runOnNewThread = true;
        readonly Collection<StartupFile> fileList = new Collection<StartupFile>();

        /// <summary>
        /// Indikuje, kdy se má vytvořit nové vlákno pro spuštění pracovní plochy.
        /// Výchozí hodnota je TRUE
        /// </summary>
        public bool RunOnNewThread
        {
            get { return runOnNewThread; }
            set { runOnNewThread = value; }
        }

        /// <summary>
        /// Soubory, které se otevřou po spuštění aplikace
        /// </summary>
        public Collection<StartupFile> InitialFileList { get { return fileList; } }
    }
}
