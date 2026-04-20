//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDirUtils.cs                                 </Name>
//    <Description> Pomocná třída např. pro rekursivní načtení obsahu adresáře  </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2018-12-06                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Pomocná třída např. pro rekursivní načtení obsahu adresáře
    /// </summary>
    public class GDirUtils
    {
        /// <summary>
        /// Slouží pro načtení seznamu souborů zadaného adresáře. 
        /// Při chybě nevyhazuje exception, ale pokračuje v načítání dalších adresářů. Pouze na výstupu funkce nebude 1-úspěch, ale bude tam -1 nebo -2 jako příznak částečně neúspěšné akce ( přístupová práv k podadresářům atd..)
        /// </summary>
        /// <param name="a_path">Cesta k adresáři, který se má načíst.</param>
        /// <param name="a_maska">Maska pro výběr souborů.</param>
        /// <param name="a_recursive">Příznak, že se mají procházet také podadresáře.</param>
        /// <param name="a_array">Výstupní pole obsahuje plná jména souborů, které jsou v adresáři obsaženy.</param>
        /// <returns>1 příznak úplného úspěšného načtení, jinak příznak chyby.</returns>
        public static int ReadDir(string a_path, string a_maska, bool a_recursive, ref List<string> a_array)
        {
            int v_vysledek = -1;

            FileSystemInfo[] v_files_and_dirs;
            DirectoryInfo v_dir_info;

            try
            {
                // nactu soubory podle masky
                v_files_and_dirs = null;
                v_dir_info = new DirectoryInfo(a_path);
                v_files_and_dirs = v_dir_info.GetFileSystemInfos(a_maska);
                if (v_files_and_dirs != null)
                    foreach (FileSystemInfo v_file in v_files_and_dirs)
                        if (!((v_file.Attributes & FileAttributes.Directory) == FileAttributes.Directory))   // pokud se nejedna o adresar
                            a_array.Add(v_file.FullName);
                v_vysledek = 1;

                // nactu podadresare
                if (a_recursive)
                {
                    v_files_and_dirs = null;
                    v_dir_info = new DirectoryInfo(a_path);
                    v_files_and_dirs = v_dir_info.GetFileSystemInfos();
                    if (v_files_and_dirs != null)
                        foreach (FileSystemInfo v_file in v_files_and_dirs)
                            if (((v_file.Attributes & FileAttributes.Directory) == FileAttributes.Directory))   // pokud se jedna o adresar
                                if (ReadDir(v_file.FullName, a_maska, a_recursive, ref a_array) != 1)
                                    v_vysledek = -2;
                }


            }
            catch { }

            return v_vysledek;
        }

        /// <summary>
        /// This one actually checks if the given path represents one of the current system's logical drives.
        /// https://stackoverflow.com/questions/5047570/c-sharp-how-to-know-if-a-given-path-represents-a-root-drive
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static bool IsLogicalDrive(string path)
        {
            return Directory.GetLogicalDrives().Contains(path);
        }

        /// <summary>
        /// if this function returns true, then it means that given path represents a root drive!
        /// https://stackoverflow.com/questions/5047570/c-sharp-how-to-know-if-a-given-path-represents-a-root-drive
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static bool IsRootPath(string path)
        {
            return (new DirectoryInfo(path).FullName == new DirectoryInfo(path).Root.FullName);
        }

        /// <summary>
        /// Check if path is system special folder
        /// https://stackoverflow.com/questions/7131354/check-if-directoryinfo-fullname-is-special-folder
        /// </summary>
        /// <param name="path"></param>
        /// <param name="_specialFolder"></param>
        /// <returns></returns>
        public static bool IsSpecialFolder(string path, out Environment.SpecialFolder? _specialFolder)
        {
            bool isSpecialFolder = false;
            _specialFolder = null;

            DirectoryInfo directoryInfo = new DirectoryInfo(path);
            string directoryInfo_FullPath = directoryInfo.FullName;
            foreach (Environment.SpecialFolder specialFolder in Enum.GetValues(typeof(Environment.SpecialFolder)))
            {
                var specialFolder_FullPath = Environment.GetFolderPath(specialFolder);

                if (string.Equals(directoryInfo_FullPath, specialFolder_FullPath, StringComparison.OrdinalIgnoreCase))
                {
                    isSpecialFolder = true;
                    _specialFolder = specialFolder;
                    break;
                }
            }

            return isSpecialFolder;
        }
    }
}
