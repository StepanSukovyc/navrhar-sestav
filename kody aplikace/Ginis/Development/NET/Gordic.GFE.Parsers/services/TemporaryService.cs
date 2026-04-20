//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TemporaryService.cs                      </Name>
//    <Description> Služba pro práci s odstraněnými složkami                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Windows.Forms;
using Gordic.General;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.Services
{
    /// <summary>
    /// Služba pro práci s odstraněnými složkami
    /// </summary>
    public static class TemporaryService
    {
        static List<string> registeredDirectories = new List<string>();
        static List<string> registeredFiles = new List<string>();

        /// <summary>
        /// dočasná složka návrháře
        /// </summary>
        public static string TempDirectory
        {
            get
            {
                string dir = FileUtility.NormalizePath(string.Format("{0}\\{1}\\", GTempFiles.GetTempDirectory(), "Content.Parsers470"));
                if (!Directory.Exists(dir))
                    Directory.CreateDirectory(dir);

                return dir;
            }
        }

        static bool initialized = false;
        static bool isdeleted = false;
        /// <summary>
        /// inicializace služby
        /// zde proběhne odstranění všech souborů z dočasné složky starších 2 dnů
        /// </summary>
        public static void Initialize()
        {
            if (initialized)
                return;

            initialized = true;

            deleteTimer = new Timer
            {
                Interval = 5000
            };
            deleteTimer.Tick += delegate { ThreadService.SafeThreadAsyncCall(Delete2DaysOldDirectories); };
            deleteTimer.Start();
        }

        /// <summary>
        /// Odstranění všech registrovaných dočasných složek
        /// </summary>
        public static void Unload()
        {
            string discadedFiles = PropertyService.Get("DiscardedFiles", string.Empty);
            if (!string.IsNullOrEmpty(discadedFiles))
                foreach (string item in discadedFiles.Split(';'))
                    if (!registeredFiles.Contains(item))
                        registeredFiles.Add(item);

            string discadedDirectories = PropertyService.Get("DiscadedDirectories", string.Empty);
            if (!string.IsNullOrEmpty(discadedDirectories))
                foreach (string item in discadedDirectories.Split(';'))
                    if (!registeredDirectories.Contains(item))
                        registeredDirectories.Add(item);

            int index = 0;
            int oldCount = registeredFiles.Count;
            while (index < registeredFiles.Count)
                try
                {
                    UnregisterFile(registeredFiles[index]);

                    if (oldCount == registeredFiles.Count)
                        index++;

                    oldCount = registeredFiles.Count;
                }
                catch { index++; }

            index = 0;
            oldCount = registeredDirectories.Count;
            while (index < registeredDirectories.Count)
            {
                try
                {
                    UnregisterDirectory(registeredDirectories[index]);

                    if (oldCount == registeredDirectories.Count)
                        index++;

                    oldCount = registeredDirectories.Count;
                }
                catch { index++; }
            }

            // nachystáme soubory, které se nám nepodařilo odstranit
            discadedFiles = string.Empty;
            foreach (string item in registeredFiles)
                discadedFiles += item + ";";

            discadedFiles = discadedFiles.Trim(';');
            PropertyService.Set("DiscardedFiles", discadedFiles);

            // nachystáme složky, které se nám nepodařilo odstranit
            discadedDirectories = string.Empty;
            foreach (string item in registeredDirectories)
                discadedDirectories += item + ";";

            discadedDirectories = discadedDirectories.Trim(';');
            PropertyService.Set("DiscadedDirectories", discadedDirectories);

            GTempFiles.DeleteRegisteredTempFiles();
        }
        /// <summary>
        /// Registrace dočasného souboru
        /// </summary>
        /// <param name="file">Dočasný soubor pro registraci</param>
        public static void RegisterFile(GTempFile file)
        {
            if (file == null)
                return;

            if (!registeredFiles.Contains(file.Path))
                registeredFiles.Add(file.Path);
        }

        /// <summary>
        /// Indikuje, zda objekt se nachází v dočasném uložišti
        /// </summary>
        /// <param name="name">název objektu</param>
        /// <returns></returns>
        internal static bool IsTemporary(string name)
        {
            foreach (var item in registeredDirectories)
                if (string.Equals(item, name, StringComparison.InvariantCultureIgnoreCase)
                    || string.Equals(item, Directory.GetParent(name).FullName, StringComparison.InvariantCultureIgnoreCase))
                    return true;

            foreach (var item in registeredFiles)
                if (string.Equals(item, name, StringComparison.InvariantCultureIgnoreCase))
                    return true;

            return false;
        }
        /// <summary>
        /// Registrace souboru
        /// </summary>
        /// <param name="backFile">soubor k regstraci - tento soubor po ukončení aplikace se odstraní</param>
        internal static void RegisterFile(string backFile)
        {
            if (!string.IsNullOrEmpty(backFile) && !registeredFiles.Contains(backFile))
                registeredFiles.Add(backFile);
        }
        /// <summary>
        /// Registrace dočasné složky
        /// </summary>
        /// <param name="m_tempdir">Cesta k dočasné složce</param>
        internal static void RegisterDirectory(string m_tempdir)
        {
            if (!string.IsNullOrEmpty(m_tempdir) && !registeredDirectories.Contains(m_tempdir))
                registeredDirectories.Add(m_tempdir);
        }
        /// <summary>
        /// Odregistrace dočasné složky
        /// </summary>
        /// <param name="m_tempdir">cesta k dočasné složce</param>
        internal static void UnregisterDirectory(string m_tempdir)
        {
            if (!string.IsNullOrEmpty(m_tempdir))
                try
                {
                    GTempFiles.DeleteTempDirectoryContent(m_tempdir);
                    GTempFiles.DeleteTempDirectory(m_tempdir);
                    if (!Directory.Exists(m_tempdir) && registeredDirectories.Contains(m_tempdir))
                        registeredDirectories.Remove(m_tempdir);
                }
                catch { }
        }

        /// <summary>
        /// vytvoření dočasné složky
        /// </summary>
        /// <param name="zipFile"></param>
        /// <returns></returns>
        public static GFETempDir CreateTempDir(string zipFile)
        {
            DirectoryInfo dir = Directory.CreateDirectory(string.Format(@"{0}\{1}", TempDirectory, Convert.ToString(Guid.NewGuid())));
            return null;
        }

        #region 2DaysOld
        static Timer deleteTimer;
        readonly static object syncRoot = new object();

        static void Delete2DaysOldDirectories()
        {
            lock (syncRoot)
            {
                if (isdeleted)
                {
                    deleteTimer.Stop();
                    return;
                }

                isdeleted = true;
                if (Directory.Exists(TempDirectory))
                {
                    string[] dirs = Directory.GetDirectories(TempDirectory);
                    if (dirs.Length != 0)
                        foreach (var item in dirs)
                            Delete2DaysOldDirectories(item);

                    dirs = Directory.GetFiles(TempDirectory);
                    if (dirs.Length != 0)
                        foreach (var item in dirs)
                            Delete2DaysOldFile(item);
                }
            }
        }
        static void Delete2DaysOldDirectories(string directory)
        {
            if (!string.IsNullOrEmpty(directory) && Directory.Exists(directory))
                if ((new DirectoryInfo(directory)).CreationTime <= DateTime.Now.AddDays(-2))
                    UnregisterDirectory(directory);
        }
        static void Delete2DaysOldFile(string filename)
        {
            if (!string.IsNullOrEmpty(filename) && FileUtility.TestFileExists(filename))
                if ((new FileInfo(filename)).CreationTime <= DateTime.Now.AddDays(-2))
                    UnregisterFile(filename);
        }
        static void UnregisterFile(string filename)
        {
            if (!string.IsNullOrEmpty(filename))
                try
                {
                    GTempFiles.DeleteTempFile(filename, true);
                    if (registeredFiles.Contains(filename))
                        registeredFiles.Remove(filename);
                }
                catch { }
        }
        #endregion
    }
}
