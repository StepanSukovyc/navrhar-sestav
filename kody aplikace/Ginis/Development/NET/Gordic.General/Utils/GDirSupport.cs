//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDirSupport.cs                       </Name>
//    <Description> Slouží pro načtení seznamu souborů zadaného adresáře.       </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2019                            </Copyright>
//    <Created>     2019-01-04                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Gordic.General;
using static System.Net.Mime.MediaTypeNames;

namespace Gordic.General
{
    /// <summary>
    /// Slouží pro načtení seznamu souborů zadaného adresáře. 
    /// </summary>
    public class GDirSupport
    {
        /// <summary>
        /// Slouží pro načtení seznamu souborů zadaného adresáře. 
        /// </summary>
        /// <param name="a_path">Cesta k adresáři, který se má načíst.</param>
        /// <param name="a_maska">Maska pro výběr souborů.</param>
        /// <param name="a_array">Výstupní pole obsahuje plná jména souborů, které jsou v adresáři obsaženy.</param>
        public static void ReadDir(string a_path, string a_maska, ref Dictionary<string, GFileInfo> a_array)
        {
            DirectoryInfo v_dir_info = new DirectoryInfo(a_path);
            FileSystemInfo[] v_files_and_dirs = v_dir_info.GetFileSystemInfos(a_maska);
            if (v_files_and_dirs != null)
                foreach (FileSystemInfo v_file in v_files_and_dirs)
                    if (!((v_file.Attributes & FileAttributes.Directory) == FileAttributes.Directory))   // pokud se nejedna o adresar
                        a_array.Add(v_file.FullName, new GFileInfo(v_file.FullName));
        }

        /// <summary>
        /// Slouží pro načtení seznamu souborů zadaného adresáře podle zadaných masek 
        /// </summary>
        /// <param name="a_path">Cesta k adresáři, který se má načíst.</param>
        /// <param name="a_masky">Masky pro výběr souborů.</param>
        /// <param name="a_array">Výstupní pole obsahuje plná jména souborů, které jsou v adresáři obsaženy.</param>
        public static void ReadDir(string a_path, string[] a_masky, ref Dictionary<string, GFileInfo> a_array)
        {
            foreach (string v_maska in a_masky)
                ReadDir(a_path, v_maska, ref a_array);
        }

    }
}
