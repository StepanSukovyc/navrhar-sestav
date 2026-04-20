//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.FileUtility.cs                           </Name>
//    <Description> Třída souborových nástrojů                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using Gordic.GFE.Parsers.Core.Services;
using Gordic.GFE.Parsers.Services;
using Gordic.General;
using System.Xml;
using System.Windows.Forms;
using System.Diagnostics;
using Gordic.Report.Interface;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Co dělat když se soubor nenačte
    /// </summary>
    public enum FileErrorPolicy
    {
        /// <summary>
        /// Informovat
        /// </summary>
        Inform,
        /// <summary>
        /// Poskytnout alternativní operaci
        /// </summary>
        ProvideAlternative
    }

    /// <summary>
    /// Možné výsledky operace nad souborem
    /// </summary>
    public enum FileOperationResult
    {
        /// <summary>
        /// úspěch
        /// </summary>
        OK,
        /// <summary>
        /// neúspěch
        /// </summary>
        Failed,
        /// <summary>
        /// uložit jinak
        /// </summary>
        SavedAlternatively
    }

    /// <summary>
    /// Delegát operace uložení souboru
    /// </summary>
    public delegate void FileOperationDelegate();
    /// <summary>
    /// Delegát operace s názvem souboru
    /// </summary>
    /// <param name="fileName">Název souboru</param>
    public delegate void NamedFileOperationDelegate(string fileName);
    /// <summary>
    /// Delegát operace uložit jako souboru
    /// </summary>
    /// <param name="fileNames">Názvy souborů-parametrů</param>
    public delegate void FilesOperationDelegate(params string[] fileNames);
    /// <summary>
    /// Delegát operace získání tevřeného souboru
    /// </summary>
    /// <param name="fileName">Název souboru</param>
    public delegate OpenedFile NamedFileOperationOpenedFileDelegate(string fileName);

    /// <summary>
    /// Třída souborových nástrojů.
    /// </summary>
    public partial class FileUtility
    {
        /// <summary>lokální assembly</summary>
        internal static System.Reflection.Assembly ThisAssembly
        {
            get => typeof(FileUtility).Assembly;
        } // end property

        readonly static char[] separators = { Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar, Path.VolumeSeparatorChar };
        const string fileNameRegEx = @"^([a-zA-Z]:)?[^:]+$";

        /// <summary>
        /// Cesta ke kořenovému adresáři
        /// </summary>
        public static string ApplicationRootPath { get; set; } = AppDomain.CurrentDomain.BaseDirectory;

        /// <summary>
        /// Vytvoření cesty dle jijích části
        /// </summary>
        /// <param name="paths">Části k vytvoření cesty</param>
        /// <returns></returns>
        public static string Combine(params string[] paths)
        {
            if (paths == null || paths.Length == 0)
                return String.Empty;

            string result = paths[0];
            for (int i = 1; i < paths.Length; i++)
                result = Path.Combine(result, paths[i]);
            return result;
        }

        /// <summary>
        /// Indikuje, zda cesta je URL formátu
        /// </summary>
        /// <param name="path">Kontrolovaná cesta</param>
        /// <returns></returns>
        public static bool IsUrl(string path)
        {
            return path.IndexOf("://", StringComparison.Ordinal) > 0;
        }

        /// <summary>
        /// Získání společného základního adresáře
        /// </summary>
        /// <param name="dir1">CEsta k adresáří 1</param>
        /// <param name="dir2">Cesta k adresáři 2</param>
        /// <returns></returns>
        public static string GetCommonBaseDirectory(string dir1, string dir2)
        {
            if (dir1 == null || dir2 == null) return null;
            if (IsUrl(dir1) || IsUrl(dir2)) return null;

            dir1 = NormalizePath(dir1);
            dir2 = NormalizePath(dir2);

            string[] aPath = dir1.Split(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar);
            string[] bPath = dir2.Split(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar);
            StringBuilder result = new StringBuilder();
            int indx = 0;
            for (; indx < Math.Min(bPath.Length, aPath.Length); ++indx)
            {
                if (bPath[indx].Equals(aPath[indx], StringComparison.OrdinalIgnoreCase))
                {
                    if (result.Length > 0) result.Append(Path.DirectorySeparatorChar);
                    result.Append(aPath[indx]);
                }
                else
                    break;
            }
            return (indx == 0) ? null : result.ToString();
        }

        /// <summary>
        /// Získání relativní cesty z absolutní cesty
        /// </summary>
        /// <param name="absPath">Absolutní cesta</param>
        /// <param name="baseDirectoryPath">Základní cesta</param>
        public static string GetRelativePath(string baseDirectoryPath, string absPath)
        {
            if (IsUrl(absPath) || IsUrl(baseDirectoryPath))
                return absPath;

            baseDirectoryPath = NormalizePath(baseDirectoryPath);
            absPath = NormalizePath(absPath);

            string[] bPath = baseDirectoryPath.Split(separators);
            string[] aPath = absPath.Split(separators);
            int indx = 0;
            for (; indx < Math.Min(bPath.Length, aPath.Length); ++indx)
                if (!bPath[indx].Equals(aPath[indx], StringComparison.OrdinalIgnoreCase))
                    break;

            if (indx == 0)
                return absPath;

            StringBuilder erg = new StringBuilder();

            if (indx != bPath.Length)
                for (int i = indx; i < bPath.Length; ++i)
                {
                    erg.Append("..");
                    erg.Append(Path.DirectorySeparatorChar);
                }
            erg.Append(String.Join(Path.DirectorySeparatorChar.ToString(), aPath, indx, aPath.Length - indx));
            return erg.ToString();
        }

        /// <summary>
        /// KOmbinuje baseDirectoryPath s relPath a normalizuje výslednou cestu.
        /// </summary>
        /// <param name="baseDirectoryPath">Základní adresář</param>
        /// <param name="relPath">Relativní cesta</param>
        public static string GetAbsolutePath(string baseDirectoryPath, string relPath)
        {
            return NormalizePath(Path.Combine(baseDirectoryPath, relPath));
        }

        /// <summary>
        /// Indikuje, zda testDirectory je základní adresář
        /// </summary>
        /// <param name="baseDirectory">Základní adresář</param>
        /// <param name="testDirectory">Testovací</param>
        /// <returns></returns>
        public static bool IsBaseDirectory(string baseDirectory, string testDirectory)
        {
            if (baseDirectory == null || testDirectory == null)
                return false;
            baseDirectory = NormalizePath(baseDirectory) + Path.DirectorySeparatorChar;
            testDirectory = NormalizePath(testDirectory) + Path.DirectorySeparatorChar;

            return testDirectory.StartsWith(baseDirectory, StringComparison.OrdinalIgnoreCase);
        }

        /// <summary>
        /// Přejmenování základního adresáře
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <param name="oldDirectory">starý adresář</param>
        /// <param name="newDirectory">nový adresář</param>
        /// <returns></returns>
        public static string RenameBaseDirectory(string fileName, string oldDirectory, string newDirectory)
        {
            fileName = NormalizePath(fileName);
            oldDirectory = NormalizePath(oldDirectory.TrimEnd(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar));
            newDirectory = NormalizePath(newDirectory.TrimEnd(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar));

            if (IsBaseDirectory(oldDirectory, fileName))
                return (fileName.Length == oldDirectory.Length) ? newDirectory : Path.Combine(newDirectory, fileName.Substring(oldDirectory.Length + 1));
            return fileName;
        }

        /// <summary>
        /// Hloubkové kopírování
        /// </summary>
        /// <param name="sourceDirectory">Zdrojový adresář</param>
        /// <param name="destinationDirectory">Cílový adresář</param>
        /// <param name="overwrite">Indikue, zda je zapotřebí přepsat v případě existencí cílového adresáře</param>
        public static void DeepCopy(string sourceDirectory, string destinationDirectory, bool overwrite)
        {
            if (!Directory.Exists(destinationDirectory))
                Directory.CreateDirectory(destinationDirectory);
            foreach (string fileName in Directory.GetFiles(sourceDirectory))
                File.Copy(fileName, Path.Combine(destinationDirectory, Path.GetFileName(fileName)), overwrite);
            foreach (string directoryName in Directory.GetDirectories(sourceDirectory))
                DeepCopy(directoryName, Path.Combine(destinationDirectory, Path.GetFileName(directoryName)), overwrite);
        }

        /// <summary>
        /// Nalezení souborů ve složce dle masky
        /// </summary>
        /// <param name="directory">Složka pro hledání</param>
        /// <param name="filemask">Maska hledaných souborů</param>
        /// <param name="searchSubdirectories">Indikuje nutnost prohledát i podadresáře</param>
        /// <param name="ignoreHidden">Indikuje ignorování skrýtých adresářů</param>
        /// <returns></returns>
        public static List<string> SearchDirectory(string directory, string filemask, bool searchSubdirectories, bool ignoreHidden)
        {
            List<string> collection = new List<string>();
            SearchDirectory(directory, filemask, collection, searchSubdirectories, ignoreHidden);
            return collection;
        }

        /// <summary>
        /// Nalezení souborů ve složce dle masky
        /// </summary>
        /// <param name="directory">Složka pro hledání</param>
        /// <param name="filemask">Maska hledaných souborů</param>
        /// <param name="searchSubdirectories">Indikuje nutnost prohledát i podadresáře</param>
        public static List<string> SearchDirectory(string directory, string filemask, bool searchSubdirectories)
        {
            return SearchDirectory(directory, filemask, searchSubdirectories, true);
        }

        /// <summary>
        /// Nalezení souborů ve složce dle masky
        /// </summary>
        /// <param name="directory">Složka pro hledání</param>
        /// <param name="filemask">Maska hledaných souborů</param>
        public static List<string> SearchDirectory(string directory, string filemask)
        {
            return SearchDirectory(directory, filemask, true, true);
        }

        /// <summary>
        /// Nalezení všech souborů platných dle masky <paramref name="filemask"/> na cestě
        /// <paramref name="directory"/> a všech podadresářích
        /// (pokud parameter <paramref name="searchSubdirectories"/> je TRUE).
        /// Pokud <paramref name="ignoreHidden"/> je TRUE, skrýté soubory a adresáře jsou ignorováné.
        /// </summary>
        static void SearchDirectory(string directory, string filemask, List<string> collection, bool searchSubdirectories, bool ignoreHidden)
        {
            if (string.IsNullOrEmpty(directory))
                return;

            try
            {
                bool isExtMatch = Regex.IsMatch(filemask, @"^\*\..{3}$");
                string ext = null;
                string[] file = Directory.GetFiles(directory, filemask);
                if (isExtMatch) ext = filemask.Remove(0, 1);

                foreach (string f in file)
                {
                    if (ignoreHidden && (File.GetAttributes(f) & FileAttributes.Hidden) == FileAttributes.Hidden)
                        continue;
                    if (isExtMatch && Path.GetExtension(f) != ext) continue;

                    collection.Add(f);
                }

                if (searchSubdirectories)
                {
                    string[] dir = Directory.GetDirectories(directory);
                    foreach (string d in dir)
                    {
                        if (ignoreHidden && (File.GetAttributes(d) & FileAttributes.Hidden) == FileAttributes.Hidden)
                            continue;
                        SearchDirectory(d, filemask, collection, searchSubdirectories, ignoreHidden);
                    }
                }
            }
            catch (UnauthorizedAccessException)
            {
                // Ignorujeme výjimky odepření přístupu k adresáři.
            }
        }

        /// <summary>
        /// Libovolné omezení integrované do .NET Framework. 
        /// Windows podporuje cesty do 32k délky.
        /// </summary>
        public static readonly int MaxPathLength = 260;

        /// <summary>
        /// Metoda zjišťuje platnost cesty (úplné nebo relativní).
        /// </summary>
        /// <param name="fileName">Cesta k souboru</param>
        public static bool IsValidPath(string fileName)
        {
            if (fileName == null || fileName.Length == 0 || fileName.Length >= MaxPathLength)
                return false;

            if (fileName.IndexOfAny(Path.GetInvalidPathChars()) >= 0)
                return false;
            if (fileName.IndexOf('?') >= 0 || fileName.IndexOf('*') >= 0)
                return false;

            if (!Regex.IsMatch(fileName, fileNameRegEx))
                return false;

            if (fileName[fileName.Length - 1] == ' ')
                return false;

            if (fileName[fileName.Length - 1] == '.')
                return false;

            string nameWithoutExtension = Path.GetFileNameWithoutExtension(fileName);
            if (nameWithoutExtension != null)
                nameWithoutExtension = nameWithoutExtension.ToUpperInvariant();

            if (nameWithoutExtension == "CON" ||
                nameWithoutExtension == "PRN" ||
                nameWithoutExtension == "AUX" ||
                nameWithoutExtension == "NUL")
                return false;

            char ch = nameWithoutExtension.Length == 4 ? nameWithoutExtension[3] : '\0';

            return !((nameWithoutExtension.StartsWith("COM") ||
                      nameWithoutExtension.StartsWith("LPT")) &&
                     Char.IsDigit(ch));
        }

        /// <summary>
        /// Zjištění platností jednoduchého názvu adresáře (neúplná cesta).
        /// </summary>
        /// <param name="name">Jednoduchý název adresáře</param>
        public static bool IsValidDirectoryEntryName(string name)
        {
            if (!IsValidPath(name))
                return false;
            if (name.IndexOfAny(new char[] { Path.AltDirectorySeparatorChar, Path.DirectorySeparatorChar, Path.VolumeSeparatorChar }) >= 0)
                return false;
            if (name.Trim(' ').Length == 0)
                return false;
            return true;
        }

        /// <summary>
        /// Zjištění existencí souboru
        /// </summary>
        /// <param name="filename">Úplný název textového souboru</param>
        /// <returns></returns>
        public static bool TestFileExists(string filename)
        {
            if (!File.Exists(filename))
            {
                LoggingService.Warning(GResources.GetResourceText(ThisAssembly, 29450235, filename)); //RC 29450235 : soubor {0} nebyl nalezen...
                return false;
            }
            return true;
        }

        /// <summary>
        /// Zjištění, zda uvedená cesta prezentuje adresář
        /// </summary>
        /// <param name="filename">Úplná cesta</param>
        /// <returns></returns>
        public static bool IsDirectory(string filename)
        {
            if (!Directory.Exists(filename))
                return false;

            FileAttributes attr = File.GetAttributes(filename);
            return (attr & FileAttributes.Directory) != 0;
        }

        //TODO Tengto kód je specifick pro Windows
        static bool MatchN(string src, int srcidx, string pattern, int patidx)
        {
            int patlen = pattern.Length;
            int srclen = src.Length;
            char next_char;

            for (; ; )
            {
                if (patidx == patlen)
                    return (srcidx == srclen);
                next_char = pattern[patidx++];
                if (next_char == '?')
                {
                    if (srcidx == src.Length)
                        return false;
                    srcidx++;
                }
                else if (next_char != '*')
                {
                    if ((srcidx == src.Length) || (src[srcidx] != next_char))
                        return false;
                    srcidx++;
                }
                else
                {
                    if (patidx == pattern.Length)
                        return true;
                    while (srcidx < srclen)
                    {
                        if (MatchN(src, srcidx, pattern, patidx))
                            return true;
                        srcidx++;
                    }
                    return false;
                }
            }
        }
        static bool Match(string src, string pattern)
        {
            if (pattern[0] == '*')
            {
                // běžný případ optimalizace
                int i = pattern.Length;
                int j = src.Length;
                while (--i > 0)
                {
                    if (pattern[i] == '*')
                        return MatchN(src, 0, pattern, 0);
                    if (j-- == 0)
                        return false;
                    if ((pattern[i] != src[j]) && (pattern[i] != '?'))
                        return false;
                }
                return true;
            }
            return MatchN(src, 0, pattern, 0);
        }

        /// <summary>
        /// Zjištění, zda cesta odpovídá vzoru
        /// </summary>
        /// <param name="filename">Úplná cesta</param>
        /// <param name="pattern">Vzor</param>
        /// <returns></returns>
        public static bool MatchesPattern(string filename, string pattern)
        {
            filename = filename.ToUpper();
            pattern = pattern.ToUpper();
            string[] patterns = pattern.Split(';');
            foreach (string p in patterns)
                if (Match(filename, p))
                    return true;
            return false;
        }

        /// <summary>
        /// Funkce bezpečného uložení
        /// </summary>
        /// <param name="saveFile">Metoda uložení souboru</param>
        /// <param name="fileName">Název souboru</param>
        /// <param name="message">Zpráva při špatném uložení</param>
        /// <param name="policy">Pravidla pro případ nepodařeného uložení</param>
        /// <returns></returns>
        public static FileOperationResult ObservedSave(FileOperationDelegate saveFile, string fileName, string message, FileErrorPolicy policy)
        {
            Debug.Assert(IsValidPath(fileName));
            try
            {
                saveFile();
                RaiseFileSaved(new FileNameEventArgs(fileName));
                return FileOperationResult.OK;
            }
            catch (Exception e)
            {
                switch (policy)
                {
                    case FileErrorPolicy.Inform:
                        ServiceManager.MessageService.InformSaveError(fileName, message, GResources.GetResourceText(ThisAssembly, 29450237), e); //RC 29450237 : Chyba při ukládání
                        break;
                    case FileErrorPolicy.ProvideAlternative:
                        ChooseSaveErrorResult r = ServiceManager.MessageService.ChooseSaveError(fileName, message, GResources.GetResourceText(ThisAssembly, 29450237), e, false); //RC 29450237 : Chyba při ukládání
                        if (r.IsRetry)
                            return ObservedSave(saveFile, fileName, message, policy);
                        else if (r.IsIgnore)
                            return FileOperationResult.Failed;
                        break;
                }
            }
            return FileOperationResult.Failed;
        }
        /// <summary>
        /// Funkce bezpečného uložení souboru
        /// </summary>
        /// <param name="saveFile">Metoda uložení souboru</param>
        /// <param name="fileName">Název souboru</param>
        /// <param name="policy">Pravidla pr přída neúspěšného uložení</param>
        /// <returns></returns>
        public static FileOperationResult ObservedSave(FileOperationDelegate saveFile, string fileName, FileErrorPolicy policy)
        {
            return ObservedSave(saveFile, fileName, GResources.GetResourceText(ThisAssembly, 29450238), policy); //RC 29450238 : Soubor nelze uložit
        }
        /// <summary>
        /// Funkce bezpečného uložení souboru
        /// </summary>
        /// <param name="saveFile">Metoda uložení souboru</param>
        /// <param name="fileName">Název souboru</param>
        /// <returns></returns>
        public static FileOperationResult ObservedSave(FileOperationDelegate saveFile, string fileName)
        {
            return ObservedSave(saveFile, fileName, FileErrorPolicy.Inform);
        }
        /// <summary>
        /// Funkce bezpečného uložení souboru
        /// </summary>
        /// <param name="saveFileAs">Metoda uložení jako souboru</param>
        /// <param name="fileName">Název souboru</param>
        /// <param name="message">Zpráva pro případ špatného uložení</param>
        /// <param name="policy">Pravidla pro případ neúspěšného uložení souboru</param>
        /// <param name="addRecentOpen">TRUE - přidá, do naposledy otevřených</param>
        /// <returns></returns>
        public static FileOperationResult ObservedSave(NamedFileOperationDelegate saveFileAs, string fileName, string message, FileErrorPolicy policy, bool addRecentOpen = true)
        {
            Debug.Assert(IsValidPath(fileName));
            try
            {
                if (!Directory.Exists(GetOrCreateDirectory(Path.GetDirectoryName(fileName))))
                    return FileOperationResult.Failed;

                saveFileAs(fileName);
                RaiseFileSaved(new FileNameEventArgs(fileName, addRecentOpen));
                return FileOperationResult.OK;
            }
            catch (Exception e)
            {
                switch (policy)
                {
                    case FileErrorPolicy.Inform:
                        ServiceManager.MessageService.InformSaveError(fileName, message, GResources.GetResourceText(ThisAssembly, 29450237), e); //RC 29450237 : Chyba při ukládání
                        break;
                    case FileErrorPolicy.ProvideAlternative:
                        ChooseSaveErrorResult r = ServiceManager.MessageService.ChooseSaveError(fileName, message, GResources.GetResourceText(ThisAssembly, 29450237), e, true); //RC 29450237 : Chyba při ukládání
                        if (r.IsRetry)
                            return ObservedSave(saveFileAs, fileName, message, policy, addRecentOpen);
                        else if (r.IsIgnore)
                            return FileOperationResult.Failed;
                        else if (r.IsSaveAlternative)
                            return ObservedSave(saveFileAs, r.AlternativeFileName, message, policy, addRecentOpen);
                        break;
                }
            }
            return FileOperationResult.Failed;
        }
        /// <summary>
        /// Funkce bezpečného uložení souboru
        /// </summary>
        /// <param name="saveFileAs">Metoda uložit jako pro soubor</param>
        /// <param name="fileName">Název souboru</param>
        /// <param name="policy">Pravidlo pro případ neúspěšného uložení souboru</param>
        /// <param name="addRecentOpen">TRUE - přidá, do naposledy otevřených</param>
        /// <returns></returns>
        public static FileOperationResult ObservedSave(NamedFileOperationDelegate saveFileAs, string fileName, FileErrorPolicy policy, bool addRecentOpen = true)
        {
            return ObservedSave(saveFileAs, fileName, GResources.GetResourceText(ThisAssembly, 29450238), policy, addRecentOpen); //RC 29450238 : Soubor nelze uložit
        }
        /// <summary>
        /// Funkce bezpečného uložení souboru
        /// </summary>
        /// <param name="saveFileAs">Metoda uložit jako pro soubor</param>
        /// <param name="fileName">Název souboru</param>
        /// <param name="addRecentOpen">TRUE - přidá, do naposledy otevřených</param>
        /// <returns></returns>
        public static FileOperationResult ObservedSave(NamedFileOperationDelegate saveFileAs, string fileName, bool addRecentOpen = true)
        {
            return ObservedSave(saveFileAs, fileName, FileErrorPolicy.Inform, addRecentOpen);
        }

        /// <summary>
        /// Funkce bezpečného načtení
        /// </summary>
        /// <param name="loadFile">Metoda načtení souboru</param>
        /// <param name="fileName">Název souboru k načtení</param>
        /// <param name="message">Zpráva pro případ neúspěšného načtení</param>
        /// <param name="policy">Pravidlo pro případ neúspěšného načtení</param>
        /// <param name="addToRecentOpen">TRUE - přidá, do naposledy otevřených</param>
        /// <returns></returns>
        public static FileOperationResult ObservedLoad(FileOperationDelegate loadFile, string fileName, string message, FileErrorPolicy policy, bool addToRecentOpen = true)
        {
            try
            {
                loadFile();
                OnFileLoaded(new FileNameEventArgs(fileName, addToRecentOpen));
                return FileOperationResult.OK;
            }
            catch (Exception e)
            {
                switch (policy)
                {
                    case FileErrorPolicy.Inform:
                        ServiceManager.MessageService.InformSaveError(fileName, message, GResources.GetResourceText(ThisAssembly, 29450239), e); //RC 29450239 : Chyba načtení
                        break;
                    case FileErrorPolicy.ProvideAlternative:
                        ChooseSaveErrorResult r = ServiceManager.MessageService.ChooseSaveError(fileName, message, GResources.GetResourceText(ThisAssembly, 29450239), e, false); //RC 29450239 : Chyba načtení
                        if (r.IsRetry)
                            return ObservedLoad(loadFile, fileName, message, policy);
                        else if (r.IsIgnore)
                            return FileOperationResult.Failed;
                        break;
                }
            }
            return FileOperationResult.Failed;
        }
        /// <summary>
        /// Beypečné načtení souboru
        /// </summary>
        /// <param name="loadFile">Meto načtení souboru</param>
        /// <param name="fileName">Název souboru</param>
        /// <param name="policy">Pravidlo pro případ neúspěšného načtení</param>
        /// <returns></returns>
        public static FileOperationResult ObservedLoad(FileOperationDelegate loadFile, string fileName, FileErrorPolicy policy)
        {
            return ObservedLoad(loadFile, fileName, GResources.GetResourceText(ThisAssembly, 29450240, Path.GetFileName(fileName), Path.GetDirectoryName(fileName)), policy); //RC 29450240 : Nelze načíst soubor {0} z umístění {1};Zkontrolujte existenci souboru a oprávnění k jeho načtení!
        }
        /// <summary>
        /// Bezpečné načtení souboru
        /// </summary>
        /// <param name="loadFile">Metoda načtení souboru</param>
        /// <param name="fileName">Pravidlo pro případ neúspěšného načtení</param>
        /// <returns></returns>
        public static FileOperationResult ObservedLoad(FileOperationDelegate loadFile, string fileName)
        {
            return ObservedLoad(loadFile, fileName, FileErrorPolicy.Inform);
        }
        /// <summary>
        /// Bezpečné načtení souboru
        /// </summary>
        /// <param name="saveFileAs">Metoda pro uložení souboru jako</param>
        /// <param name="fileName">Název souboru</param>
        /// <param name="message">Zprava pro případ neúspěšného načtení</param>
        /// <param name="policy">Pravidlo pro případ neúspěšného načtení</param>
        /// <param name="addToRecentOpen">TRUE - přidá, do naposledy otevřených</param>
        /// <returns></returns>
        public static FileOperationResult ObservedLoad(NamedFileOperationDelegate saveFileAs, string fileName, string message, FileErrorPolicy policy, bool addToRecentOpen = true)
        {
            return ObservedLoad(new FileOperationDelegate(delegate { saveFileAs(fileName); }), fileName, message, policy, addToRecentOpen);
        }
        /// <summary>
        /// Bezpečné načtení souboru
        /// </summary>
        /// <param name="saveFileAs">Metoda pro uložení jako</param>
        /// <param name="fileName">Název souboru k načtení</param>
        /// <param name="policy">Pravidlo pro případ neúspěšného načtení</param>
        /// <param name="addToRecentOpen">TRUE - přidá, do naposledy otevřených</param>
        /// <returns></returns>
        public static FileOperationResult ObservedLoad(NamedFileOperationDelegate saveFileAs, string fileName, FileErrorPolicy policy, bool addToRecentOpen = true)
        {
            return ObservedLoad(saveFileAs, fileName, GResources.GetResourceText(ThisAssembly, 29450240, Path.GetFileName(fileName), Path.GetDirectoryName(fileName)), policy, addToRecentOpen); //RC 29450240 : Nelze načíst soubor {0} z umístění {1};Zkontrolujte existenci souboru a oprávnění k jeho načtení!
        }
        /// <summary>
        /// Bezpečné načtení souboru
        /// </summary>
        /// <param name="saveFileAs">Metoda uložit jako</param>
        /// <param name="fileName">Název souboru k načtení</param>
        /// <param name="addToRecentOpen">TRUE - přidá, do naposledy otevřených</param>
        /// <returns></returns>
        public static FileOperationResult ObservedLoad(NamedFileOperationDelegate saveFileAs, string fileName, bool addToRecentOpen = true)
        {
            return ObservedLoad(saveFileAs, fileName, FileErrorPolicy.Inform, addToRecentOpen);
        }

        static void OnFileLoaded(FileNameEventArgs e)
        {
            FileLoaded?.Invoke(null, e);
        }

        /// <summary>
        /// reakce na kopírování archivu
        /// </summary>
        /// <param name="e"></param>
        public static void RaiseArchiveCopied(FileNameEventArgs e)
        {
            ArchiveCopied?.Invoke(null, e);
        }

        /// <summary>
        /// Vola se po uložení souboru
        /// </summary>
        /// <param name="e"></param>
        public static void RaiseFileSaved(FileNameEventArgs e)
        {
            FileSaved?.Invoke(null, e);
        }

        /// <summary>
        /// Událost po načtení souboru
        /// </summary>
        public static event FileNameEventHandler FileLoaded;
        /// <summary>
        /// Událost po uložení souboru
        /// </summary>
        public static event FileNameEventHandler FileSaved;

        /// <summary>
        /// Událost po vytvoření/kopírování archivu
        /// </summary>
        public static event FileNameEventHandler ArchiveCopied;

        /// <summary>
        /// Získání relativní cesty od souboru destFileName k souboru resFileName
        /// </summary>
        /// <param name="resFileName">Ke kterému se hledá cesta</param>
        /// <param name="destFileName">Od kterého se hledá cesta</param>
        /// <returns></returns>
        public static string GetRelativePathFromFileToFile(string destFileName, string resFileName)
        {
            if (!TestFileExists(destFileName) || !TestFileExists(resFileName))
                return resFileName;

            FileInfo fi = new FileInfo(resFileName);
            FileInfo di = new FileInfo(destFileName);

            // soubory jsou ve stejné složce
            if (String.Equals(fi.DirectoryName, di.DirectoryName))
                return fi.Name;
            List<string> diList = di.DirectoryName.Split('\\').ToList();
            List<string> fiList = fi.DirectoryName.Split('\\').ToList();

            // jsou na různých discích
            if (diList[0] != fiList[0])
                return resFileName;

            while (fiList.Count != 0 && diList[0].Equals(fiList[0], StringComparison.InvariantCultureIgnoreCase))
            {
                diList.RemoveAt(0);
                fiList.RemoveAt(0);
            }

            string res = string.Empty;

            for (int i = 0; i < diList.Count; i++)
                res += "..\\";

            if (fiList.Count != 0)
                foreach (string item in fiList)
                    res += item + "\\";
            return res + fi.Name;
        }

        /// <summary>
        /// Vytvoření FolderBrowserDialog pro výběr složky.
        /// pokud složka není vybraná, pak se bere Plocha
        /// </summary>
        /// <param name="description">Popis</param>
        /// <param name="selectedPath">Výchozí cesta</param>
        /// <returns></returns>
        public static FolderBrowserDialog CreateFolderBrowserDialog(string description, string selectedPath)
        {
            FolderBrowserDialog dialog = new FolderBrowserDialog
            {
                Description = StringParser.Parse(description)
            };
            if (selectedPath != null && selectedPath.Length > 0 && Directory.Exists(selectedPath))
            {
                dialog.RootFolder = Environment.SpecialFolder.MyComputer;
                dialog.SelectedPath = selectedPath;
            }
            return dialog;
        }

        /// <summary>
        /// Vytvoření FolderBrowserDialog s počátečně zvolenou složkou systémové plochy.
        /// </summary>
        /// <param name="description">Popisek dialogového okna</param>
        public static FolderBrowserDialog CreateFolderBrowserDialog(string description)
        {
            return CreateFolderBrowserDialog(description, null);
        }

        /// <summary>
        /// Vytvoření unikatního (ve stejné úrovní) názvu souboru
        /// </summary>
        /// <param name="fileName">Současný název souboru</param>
        /// <returns>Název souboru, který ještě v dané složce neexistuje</returns>
        public static string GetUniqueName(string fileName)
        {
            string dir = Path.GetDirectoryName(fileName);
            string ext = Path.GetExtension(fileName);
            string name = Path.GetFileNameWithoutExtension(fileName);
            int index = 1;
            while (File.Exists(fileName))
            {
                fileName = Combine(dir, string.Format("{0}_{1}{2}", name, index, ext));
                index++;
            }

            return fileName;
        }

        /// <summary>
        /// Vytvoření vnořené složky
        /// </summary>
        /// <param name="paths">Části k vytvoření cesty</param>
        /// <returns>Cesta ke nově vytvořené (pokud neexistuje) složce</returns>
        public static string GetOrCreateDirectory(params string[] paths)
        {
            return GetOrCreateDirectory(Combine(paths));
        }

        /// <summary>
        /// Vytvoření vnořené složky
        /// </summary>
        /// <param name="value">Cesta k nové složce</param>
        static string GetOrCreateDirectory(string value)
        {
            if (!Directory.Exists(value))
                Directory.CreateDirectory(value);
            return value;

            //string[] names = value.Split(Path.DirectorySeparatorChar);

            //if (names.Length <= 1)
            //    return value;

            //List<string> _names = new List<string>();
            //for (int i = 1; i < names.Length; i++)
            //    if (!string.IsNullOrEmpty(names[i - 1]) && !string.IsNullOrEmpty(names[i]))
            //    {
            //        names[i] = names[i - 1] + Path.DirectorySeparatorChar + names[i];
            //        _names.Add(names[i]);
            //    }
            //    else
            //        names[i] = names[i - 1] + Path.DirectorySeparatorChar + names[i];

            //if (value.StartsWith("\\") && _names.Count > 0)
            //    _names.RemoveAt(0);

            //_names.ForEach(CreateDirectory);

            //return value;
        }

        //static void CreateDirectory(string path)
        //{
        //    try
        //    {
        //        if (!string.IsNullOrEmpty(path))
        //            if (!Directory.Exists(path))
        //                Directory.CreateDirectory(path);
        //    }
        //    catch (Exception ex) { MessageService.ShowError(ex); }
        //}

        /// <summary>
        /// Otevření složky
        /// </summary>
        /// <param name="dirName">otevřená složka</param>
        /// <returns></returns>
        public static bool GetDialogDirectoryName(ref string dirName)
        {
            FolderBrowserDialog dialog = new FolderBrowserDialog
            {
                SelectedPath = !string.IsNullOrEmpty(dirName) ? Path.GetDirectoryName(dirName) : string.Empty
            };
            if (dialog.ShowDialog() == DialogResult.OK)
            {
                dirName = dialog.SelectedPath;
                return true;
            }
            return false;
        }

        /// <summary>
        /// Dialogové okno na získání cesty k souboru
        /// </summary>
        /// <param name="configTreePath"></param>
        /// <param name="title"></param>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public static bool GetDialogFileName(string configTreePath, string title, ref string fileName)
        {
            OpenFileDialog vidRun = new OpenFileDialog
            {
                Multiselect = false
            };
            string[] fileFilters = !string.IsNullOrEmpty(configTreePath)
                ? (string[])(AddInTree.GetTreeNode(configTreePath).BuildChildItems(null)).ToArray(typeof(string))
                : new string[] { "(" + GResources.GetResourceText(ThisAssembly, 29450703) + ")|*.*" }; //RC 29450703 : vše

            try { vidRun.Filter = String.Join("|", fileFilters); }
            catch { vidRun.Filter = "(" + GResources.GetResourceText(ThisAssembly, 29450703) + ")|*.*"; } //RC 29450703 : vše

            vidRun.Title = title;
            vidRun.InitialDirectory = !string.IsNullOrEmpty(fileName) ? Path.GetDirectoryName(fileName) : string.Empty;
            if (vidRun.ShowDialog() == DialogResult.OK)
            {
                fileName = vidRun.FileName;
                return true;
            }
            return false;
        }

        /// <summary>
        /// Dialogové okno na získání cesty k souboru
        /// </summary>
        /// <param name="filters">filtry souborů</param>
        /// <param name="title">titulek dialogového okna</param>
        /// <returns></returns>
        public static string GetFileNameByDialog(string title, string[] filters = null)
        {
            OpenFileDialog fileDialog = new OpenFileDialog();
            if (filters == null || filters.Length == 0)
                filters = new string[] { "(" + GResources.GetResourceText(ThisAssembly, 29450703) + ")|*.*" }; //RC 29450703 : vše

            fileDialog.Multiselect = false;
            try { fileDialog.Filter = String.Join("|", filters); }
            catch { fileDialog.Filter = "(" + GResources.GetResourceText(ThisAssembly, 29450703) + ")|*.*"; } //RC 29450703 : vše
            fileDialog.Title = title;

            if (fileDialog.ShowDialog() == System.Windows.Forms.DialogResult.OK)
                return fileDialog.FileName;

            return null;
        }


        /// <summary>
        /// zjištění, zda verze XML obsahu souboru paměti je aktuálnější než verze souboru na lokálním disku
        /// </summary>
        /// <param name="stream">obsah paměti</param>
        /// <param name="fileStream">obsah souboru</param>
        /// <returns></returns>
        public static bool LaterVersion(Stream stream, FileStream fileStream)
        {
            string desc = string.Empty;
            return LaterVersion(stream, fileStream, ref desc);
        }

        /// <summary>
        /// zjištění, zda verze XML obsahu souboru paměti je aktuálnější než verze souboru na lokálním disku
        /// </summary>
        /// <param name="stream">obsah paměti</param>
        /// <param name="fileStream">obsah souboru</param>
        /// <param name="desc">popis</param>
        /// <returns></returns>
        public static bool LaterVersion(Stream stream, FileStream fileStream, ref string desc)
        {
            try
            {
                XmlDocument docStream = new XmlDocument();
                docStream.Load(stream);
                XmlDocument fileStreamDoc = new XmlDocument();
                fileStreamDoc.Load(fileStream);
                if (fileStreamDoc.DocumentElement.Attributes["description"] != null)
                    desc = fileStreamDoc.DocumentElement.Attributes["description"].Value;

                if (fileStreamDoc.DocumentElement.Attributes["version"] == null)
                    return true;

                if (docStream.DocumentElement.Attributes["version"] != null)
                    return LaterVersion(docStream.DocumentElement.Attributes["version"].Value, fileStreamDoc.DocumentElement.Attributes["version"].Value);
            }
            catch { }
            finally { }
            // pokud nějaká chyba v porovnání, pak...
            return true;
        }
        static bool LaterVersion(string memVer, string fileVer)
        {
            string[] mem = memVer.Split('.');
            string[] file = fileVer.Split('.');

            int min = Math.Min(mem.Length, file.Length);
            int index = 0;

            while (index < min)
            {
                Int32.TryParse(mem[index], out int mC);
                Int32.TryParse(file[index], out int fC);

                if (mC > fC)
                    return true;
                if (fC > mC)
                    return false;

                // jinak verze jsou stejné
                index++;
            }

            return mem.Length > file.Length;
        }

        /// <summary>
        /// odstranění souboru
        /// </summary>
        /// <param name="apath">bezpečné odstranění seznamu souborů/složek</param>
        /// <param name="onlyContent">indikuje odstranění pouze obsahu</param>
        public static void ObservedDelete(List<string> apath, bool onlyContent = false)
        {
            apath?.ForEach(path =>
                {
                    try
                    {
                        if (File.Exists(path))
                            File.Delete(path);
                        else if (Directory.Exists(path))
                        {
                            foreach (var item in Directory.GetFiles(path))
                                ObservedDelete(new List<string>() { item });
                            foreach (var item in Directory.GetDirectories(path))
                                ObservedDelete(new List<string>() { item });

                            if (!onlyContent)
                                Directory.Delete(path, true);
                        }
                    }
                    catch { }
                });
        }

        /// <summary>
        /// Indikace oprávnění
        /// </summary>
        public static bool IsElevated => new System.Security.Principal.WindowsPrincipal(System.Security.Principal.WindowsIdentity.GetCurrent()).IsInRole(System.Security.Principal.WindowsBuiltInRole.Administrator);

        /// <summary>
        /// bezpečné kopírování souboru
        /// </summary>
        /// <param name="fileSource">zdroj</param>
        /// <param name="fileDest">cíl</param>
        /// <param name="forceOverwrite">vynutit přepsání souboru bez dotazu</param>
        public static void ObservedCopy(string fileSource, string fileDest, bool forceOverwrite = false)
        {
            if (TestFileExists(fileSource))
            {
                if (TestFileExists(fileDest))
                {
                    if (forceOverwrite || MessageService.AskQuestion(GResources.GetResourceText(ThisAssembly, 29450523))) //RC 29450523 : Cílový soubor již existuje. Přejete si ho přepsat?
                        ObservedDelete(new List<string>() { fileDest });
                    else
                        return;
                }

                try
                {
                    File.Copy(fileSource, fileDest);
                }
                catch (UnauthorizedAccessException ex)
                {
                    if (IsElevated)
                        throw new GNonFatalException(21000029, 21000036, ex, fileDest + "\n(Administrator role detected)"); //RC-EX 21000036 : Nedostatečná oprávnění k zápisu do;{0}
                    else
                        throw new GNonFatalException(21000028, 21000036, ex, fileDest); //RC-EX 21000036 : Nedostatečná oprávnění k zápisu do;{0}
                }
            }

        }

        /// <summary>
        /// indikuje, že soubor jepouze na čtení
        /// </summary>
        /// <param name="fileName">název souboru</param>
        /// <returns></returns>
        public static bool IsFileReadOnly(string fileName)
        {
            return TestFileExists(fileName) && (File.GetAttributes(fileName) & FileAttributes.ReadOnly) == FileAttributes.ReadOnly;
        }

        /// <summary>
        /// spuštění prohlížeče
        /// </summary>
        /// <param name="fileName">název souboru ke spuštění</param>
        /// <returns>TRUE - volání se zdařilo</returns>
        public static bool StartVidRun(string fileName)
        {
            ProcessStartInfo startInfo = new ProcessStartInfo
            {
                FileName = GVidrunLocator.Locate()
            };
            if (!string.IsNullOrEmpty(startInfo.FileName))
                try
                {
                    startInfo.Arguments = string.Format("\"{0}\"", fileName);
                    Process process = new Process
                    {
                        StartInfo = startInfo
                    };
                    process.Start();
                    return true;
                }
                catch (Exception ex)
                {
                    LoggingService.Error(GResources.GetResourceText(ThisAssembly, 29450525, startInfo.FileName, fileName, ex.Message)); //RC 29450525 : chyba spuštění: spouštěč\r;{0}\r;souboru\r;{1}\r;chyba:{2}
                }
            return false;
        }
    }

}
