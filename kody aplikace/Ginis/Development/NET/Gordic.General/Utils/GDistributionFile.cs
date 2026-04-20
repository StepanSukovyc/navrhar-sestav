//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDistributionFile.cs                  </Name>
//    <Description> TDO popisující parametry jednoho souboru uvedeného v soupisce instalovaných souborů v TST</Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2018                            </Copyright>
//    <Created>     2018-12-12                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// TDO popisující parametry jednoho souboru uvedeného v soupisce instalovaných souborů v TST
    /// </summary>
    public class GDistributionFile
    {
        /// <summary>
        /// příznak, ze se nejedna o fyzicky soubor, ale pouze o příznak/povel pro jeho smazání - aktuální
        /// Odstranění souboru z PC - dočasné označení v databázi - další načítání jiných balíčků toto nastavení může změnit
        /// </summary>
        public const int c_priz_del_file1 = -1;
        /// <summary>
        /// příznak, ze se nejedna o fyzicky soubor, ale pouze o příznak/povel pro jeho smazání - trvalé
        /// Odstranění souboru z PC - trvalé označení v databázi ( ani další načítání distribučních ZIPů toto již nesmí změnit - to znamená, 
        /// že velikost -2 musí u souboru v DB zůstat trvale )
        /// </summary>
        public const int c_priz_del_file2 = -2;
        /// <summary>
        /// příznak, ze se nejedna o fyzicky soubor, ale pouze o povel pro jeho smazání pouze z databáze  
        /// na disku se s ním nesmí nic dít - tedy pouze delete z DB
        /// </summary>
        public const int c_priz_del_file3 = -3;

        ///// <summary>
        ///// Nouzová položka jak nastavit fázi v případě, že nelze nastavit přes položku revize
        ///// </summary>
        //private string _faze = null;

        /// <summary>
        /// Zadáním revize je předurčena i fáze - pouze v případě načítání přes ADS to nemusí platit
        /// </summary>
        private GRevize _revize = null;

        /// <summary>
        /// Revize se kterou je soubor šířen
        /// </summary>
        public string Revize {
            get { return (_revize.Revize); }
            set { _revize = new GRevize(value); }
        }

        /// <summary>
        /// Plné jméno souboru uvedené z ZIP souboru 
        /// </summary>
        public string FullFileNameInZip { get; set; }

        /// <summary>
        /// Plné jméno souboru - tedy cesta a jméno souboru - tak jak je uvedeno v TST souboru
        /// </summary>
        public string FullFileName { get; set;  }
        /// <summary>
        /// Jméno souboru - tak jak je uvedeno v TST souboru
        /// </summary>
        public string FileName { get; set; }
        /// <summary>
        /// Cesta k souboru - tak jak je uvedeno v TST souboru
        /// </summary>
        public string FilePath { get; set; }
        /// <summary>
        /// Velikost souboru - tak jak je uvedeno v TST souboru
        /// Může být podle konstant GDistributionFile.c_priz_del_file1-3 nebo kladná nebo záporná hodnota
        /// </summary>
        public int? Size { get; set; } = null;
        /// <summary>
        /// Typ souboru - tak jak je uvedeno v TST souboru
        /// </summary>
        public string FileType { get; set; }
        /// <summary>
        /// CRC souboru - tak jak je uvedeno v TST souboru
        /// </summary>
        public int? Crc { get; set; } = null;
        /// <summary>
        /// SHA2 souboru - tak jak je uvedeno v TST souboru
        /// </summary>
        public string FileSHA2 { get; set; } = null;

        /// <summary>
        /// Varianta fáze
        /// </summary>
        public int VarFaze { get { return ( (int)_revize.VarFaze); } }

        /// <summary>
        /// Fáze
        /// </summary>
        public string Faze { get { return (_revize.Faze); } }

        /// <summary>
        /// Parametry uvedené u řádku souboru v TST souboru za prefixem P=
        /// </summary>
        public string Param { get; set; }

        /// <summary>
        /// Příznak, že v TST souboru je uvedena velikost souboru, které je -1,-2,-3 a to je příznak, že se nešíří binární podoba souboru, 
        /// pouze se jedná o jeden z druhů DELETE příznaků tohoto souboru
        /// </summary>
        public bool PrizDeleteBlob
        {
            get
            {
                if (this.Size == GDistributionFile.c_priz_del_file1 || this.Size == GDistributionFile.c_priz_del_file2 || this.Size == GDistributionFile.c_priz_del_file3)
                    return true;
                else
                    return false;
            }
        }
        /// <summary>
        /// Příznak, že binární obsah souboru má existovat
        /// </summary>
        public bool IsBlobContent
        {
            get
            {
                return(!this.PrizDeleteBlob);
            }
        }
    }
}
