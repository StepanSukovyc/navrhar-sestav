//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GFileInfo.cs                         </Name>
//    <Description> Pomocná třída pro popis parametrů obecného soubour ( na disku, nebo i ve vzdáleném úložišti )</Description>
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


namespace Gordic.General
{
    /// <summary>
    /// Pomocná třída pro popis parametrů obecného soubour ( na disku, nebo i ve vzdáleném úložišti )
    /// </summary>
    public class GFileInfo
    {
        /// <summary>
        /// Konstruktor pro definici souboru na lokálním disku
        /// </summary>
        /// <param name="a_file_name"></param>
        public GFileInfo(string a_file_name)
        {
            this.FullName = a_file_name;
            this.Path = System.IO.Path.GetDirectoryName(FullName);
            this.Name = System.IO.Path.GetFileName(FullName);
            if (File.Exists(this.FullName))
            {
                FileInfo info = new FileInfo(this.FullName);
                this.Length = info.Length;
            }
        }

        /// <summary>
        /// Konstruktor pro popis souboru na vzdáleném úložišti
        /// </summary>
        /// <param name="a_file_name"></param>
        /// <param name="a_length"></param>
        public GFileInfo(string a_file_name, long a_length)
        {
            this.FullName = a_file_name;
            this.Path = System.IO.Path.GetDirectoryName(FullName);
            this.Name = System.IO.Path.GetFileName(FullName);
            this.Length = a_length;
        }

        /// <summary>
        /// Plné jméno souboru včetně zadané cesty
        /// </summary>
        public string FullName { get; }

        /// <summary>
        /// Adresář souboru
        /// </summary>
        public string Path { get; }

        /// <summary>
        /// Samotné jméno souboru bez cesty
        /// </summary>
        public string Name { get; }

        /// <summary>
        /// Velikost souboru - nemusí být známá, potom je null
        /// </summary>
        public long? Length { get; } = null;

        /// <summary>
        /// textová zkrácená podoba velikosti souboru ( s doplněním jednotek kB, MB, GB, TB )
        /// </summary>
        public string LengthText { get { return GFileUtils.LengthToText(Length); } }

        /// <summary>
        /// Převod velikosti souboru na textovou zkrácenou podobu ( s doplněním jednotek kB, MB, GB, TB )
        /// </summary>
        /// <param name="a_size">Velikost souboru</param>
        /// <returns>Textová podoba velikosti souboru</returns>
        public static string LengthToText(long? a_size)
        {
            return GFileUtils.LengthToText(a_size);
        }

        //    string v_vysledek = "";
        //    if (a_size == null)
        //        v_vysledek = "";
        //    else
        //    {
        //        double v_velikost = Convert.ToDouble(a_size);
        //        if (a_size < 1000)
        //            v_vysledek = String.Format("{0} B", a_size.ToString());
        //        else if (a_size < 1000000)
        //        {
        //            v_velikost = v_velikost / 1000;
        //            v_vysledek = String.Format("{0} kB", v_velikost.ToString("0.##"));
        //        }
        //        else if (a_size < 1000000000)
        //        {
        //            v_velikost = v_velikost / 1000000;
        //            v_vysledek = String.Format("{0} MB", v_velikost.ToString("0.##"));
        //        }
        //        else if (a_size < 1000000000000)
        //        {
        //            v_velikost = v_velikost / 1000000000;
        //            v_vysledek = String.Format("{0} GB", v_velikost.ToString("0.##"));
        //        }
        //        else
        //        {
        //            v_velikost = v_velikost / 1000000000000;
        //            v_vysledek = String.Format("{0} TB", v_velikost.ToString("0.##"));
        //        }
        //    }
        //    return (v_vysledek);

    }
}
