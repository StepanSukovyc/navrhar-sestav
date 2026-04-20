//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GTstFile.cs                                  </Name>
//    <Description> Třída pro práci s TST souborem                              </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-05-25                                                  </Created>
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
    /// Třída pro práci s TST souborem
    /// </summary>
    public class GTstFile
    {
        #region Private
        /// <summary>
        /// Jméno TST souboru
        /// </summary>
        private string _tst_file_name = null;
        /// <summary>
        /// Řetězec obsahující seznam přímo vyžadovaných instalačních modulů ( neobsahuje rekursivně vyžadované moduly ) - pouze to co je uvedeno přímo v TST souboru.
        /// </summary>
        internal string _Required = null;
        /// <summary>
        /// Revize instalovaného modulu.
        /// </summary>
        internal GRevize _revize;
        /// <summary>
        /// Typ vývojového prostředí aplikace ( aktuálně jsou povolené hodnoty PB7, PB9, PB12 a prázdno )
        /// </summary>
        internal string _Apl_Type = null;
        internal string _Faze = null;
        private string _ExeFileName = null;
        internal string _DatetimeAkt = null;
        internal string _LicenceOd = null;
        internal string _LicencePro = null;
        internal GTypModuluEnum _TypModulu = GTypModuluEnum.NO;
        
        internal int? _VerzeDbMin = null;   // T39642
        internal int? _SubVerzeDbMin = null;
        internal int? _RevDbMin = null;
        
        internal int? _VerzeDbMin2 = null;  // T39642
        internal int? _SubVerzeDbMin2 = null;
        internal int? _RevDbMin2 = null;

        /// <summary>
        /// Pole informací o souborech modulu
        /// </summary>
        internal Dictionary<string, GDistributionFile> _DistributionFiles = null;
        /// <summary>
        /// Seznam vyžadovaných modulů
        /// </summary>
        internal Dictionary<string, GRequiredModule> _RequiredModules = null;
        /// <summary>
        /// Binární obsah TST souboru
        /// </summary>
        private MemoryStream _tstFileContent = null;
        #endregion

        #region Properties
        /// <summary>
        /// Objekt popisující revize
        /// </summary>
        public GRevize Revize => _revize;

        /// <summary>
        /// Vrátí textovou podobu verze včetně písmene zákazníka - doplněnou na plnou délku jednotlivých částí: např. 482.23.X01
        /// </summary>
        public string FullVersion => Revize.VerzeTxtFull;
        
        /// <summary>
        /// Jméno TST souboru
        /// </summary>
        public string TstFileName => _tst_file_name;

        /// <summary>
        /// Řetězec obsahující seznam přímo vyžadovaných instalačních modulů
        /// </summary>
        public string Required => _Required;

        /// <summary>
        /// Typ vývojového prostředí aplikace
        /// </summary>
        public string AplType => _Apl_Type;

        /// <summary>
        /// Fáze
        /// </summary>
        public string Faze => _Faze;

        /// <summary>
        /// Název hlavního EXE souboru
        /// </summary>
        public string ExeFileName => _ExeFileName;

        /// <summary>
        /// Datum a čas aktualizace
        /// </summary>
        public string DatetimeAkt => _DatetimeAkt;

        /// <summary>
        /// Licence od
        /// </summary>
        public string LicenceOd => _LicenceOd;

        /// <summary>
        /// Licence pro
        /// </summary>
        public string LicencePro => _LicencePro;

        /// <summary>
        /// Typ modulu
        /// </summary>
        public GTypModuluEnum TypModulu => _TypModulu;

        /// <summary>
        /// Minimální verze databáze
        /// </summary>
        public int? VerzeDbMin => _VerzeDbMin;

        /// <summary>
        /// Minimální subverze databáze
        /// </summary>
        public int? SubVerzeDbMin => _SubVerzeDbMin;

        /// <summary>
        /// Minimální revize databáze
        /// </summary>
        public int? RevDbMin => _RevDbMin;

        /// <summary>
        /// Minimální verze databáze 2
        /// </summary>
        public int? VerzeDbMin2 => _VerzeDbMin2;

        /// <summary>
        /// Minimální subverze databáze 2
        /// </summary>
        public int? SubVerzeDbMin2 => _SubVerzeDbMin2;

        /// <summary>
        /// Minimální revize databáze 2
        /// </summary>
        public int? RevDbMin2 => _RevDbMin2;

        /// <summary>
        /// Pole informací o souborech modulu
        /// </summary>
        public Dictionary<string, GDistributionFile> DistributionFiles => _DistributionFiles;

        /// <summary>
        /// Seznam vyžadovaných modulů
        /// </summary>
        public Dictionary<string, GRequiredModule> RequiredModules => _RequiredModules;
        #endregion

        #region Konstruktor
        /// <summary>
        /// Konstruktor pro případ TST souboru na disku
        /// </summary>
        /// <param name="a_tst_file_name">Plná cesta na TST soubor - musí existovat na disku</param>
        public GTstFile(string a_tst_file_name)
        {
            _tstFileContent = new MemoryStream();
            _tst_file_name = a_tst_file_name;
            using (FileStream fileStream = File.OpenRead(_tst_file_name))
            {
                _tstFileContent.SetLength(fileStream.Length);
                fileStream.Read(_tstFileContent.GetBuffer(), 0, (int)fileStream.Length);
            }
            _tstFileContent.Position = 0;
            ReadTstContent(_tstFileContent);
        }
        #endregion

        #region Pomocné funkce
        /// <summary>
        /// Čtení obsahu TST souboru do instančních proměnných tohoto objektu
        /// Je to nějak zdvojený kód s <see cref="GZipDistributionFile.ReadTstContent"/>
        /// </summary>
        /// <param name="tstFileContent"></param>
        /// <exception cref="GDataInvalidException"></exception>
        private void ReadTstContent(MemoryStream tstFileContent)
        {
            _DistributionFiles = new Dictionary<string, GDistributionFile>();
            _RequiredModules = new Dictionary<string, GRequiredModule>();
            _ExeFileName = "";
            _LicenceOd = "";
            _LicencePro = "";
            _VerzeDbMin = null; // T39642
            _SubVerzeDbMin = null;
            _RevDbMin = null;
            _VerzeDbMin2 = null;    // T39642
            _SubVerzeDbMin2 = null;
            _RevDbMin2 = null;

            bool v_in_section_program = false;
            bool v_in_section_required = false;
            bool v_in_section_files = false;
            string v_akt_adr = "";
            string v_master_exe_file_name = "";               // hlavni EXE pro fázi - pokud ovšem může existovat
            MemoryStream v_MemoryStream = tstFileContent;
            Encoding encoding = GFileUtils.DetectEncoding(v_MemoryStream);
            StreamReader v_reader = v_reader = new StreamReader(v_MemoryStream, encoding);
            while (v_reader.Peek() >= 0)
            {
                string originalLine = v_reader.ReadLine();
                string line = originalLine.Replace('\t', ' ').Trim().ToUpperInvariant();

                if (line.StartsWith("[PROGRAM]"))
                {
                    v_in_section_program = true;
                    v_in_section_required = false;
                    v_in_section_files = false;
                }
                else if (line.StartsWith("[REQUIRED]"))
                {
                    v_in_section_program = false;
                    v_in_section_required = true;
                    v_in_section_files = false;
                }
                else if (line.StartsWith("[FILES]"))
                {
                    v_in_section_program = false;
                    v_in_section_required = false;
                    v_in_section_files = true;
                }
                else if (line.StartsWith("[ASC_FILE]"))
                {
                    /*
                      [asc_file]
                      <+>[PSR]@(ginadr)@gin\g32psr01.exe
                       */

                    //TODO: Dodělat asociace souborů podle této sekce
                    // nejak takto:
                    //GFileExt v_FileLink = new GFileExt();
                    //if (!v_FileLink.CreateFileExtByCmdParamStr(v_cmd_param, ref v_error_text))

                    // nebo nouzově: Vidrun.exe /register  by to mělo udělat

                    v_in_section_program = false;
                    v_in_section_required = false;
                    v_in_section_files = false;
                }
                else if (line.StartsWith("["))
                {
                    v_in_section_program = false;
                    v_in_section_required = false;
                    v_in_section_files = false;
                }
                else if (v_in_section_program && line.StartsWith("REVIZE="))
                {
                    string revize = line.Substring("REVIZE=".Length);                                // tímto nastavím verzi, revizi, fázi
                    _revize = new GRevize(revize);
                    this._Faze = _revize.Faze;
                    this._TypModulu = _revize.TypModulu;
                    v_master_exe_file_name = _revize.ExeFileName;
                }
                else if (v_in_section_program && line.StartsWith("LICENCE_OD="))
                    _LicenceOd = line.Substring("LICENCE_OD=".Length);
                else if (v_in_section_program && line.StartsWith("LICENCE_PRO="))
                    _LicencePro = line.Substring("LICENCE_PRO=".Length);
                else if (v_in_section_program && line.StartsWith("DAT_AKT="))
                    this._DatetimeAkt = line.Substring("DAT_AKT=".Length);
                else if (v_in_section_required && line.StartsWith("MODULES="))
                {
                    this._Required = line.Substring("MODULES=".Length);
                    string[] v_req = _Required.Split(new char[] {','},StringSplitOptions.RemoveEmptyEntries);
                    foreach (string v_faze in v_req)
                    {
                        GFaze faze = new GFaze(v_faze);
                        if (!faze.IsGinisFaze)
                            throw new GDataInvalidException(21300086, 21300064, _tst_file_name, v_faze); //RC-EX 21300064 : V TST souboru {0} je zadána chybná požadovaná fáze {1}
                        if (!_RequiredModules.ContainsKey(v_faze))
                            _RequiredModules.Add(v_faze, new GRequiredModule(v_faze));
                    }
                }
                else if (v_in_section_required && line.Length > 8)
                {
                    string v_faze = line.Substring(0, 8);
                    if (_RequiredModules.ContainsKey(v_faze))
                    {
                        string v_pom = line.Substring(9);
                        if (v_pom.StartsWith("MANDATORY"))
                        {
                            string v_pov = GStrFce.CutFrom(line, "=");
                            _RequiredModules[v_faze].Mandatory = (v_pov == "TRUE");
                        }
                        else if (v_pom.StartsWith("SUB_VERZE_MIN"))
                        {
                            string v_ver_txt = line.Substring("SUB_VERZE_MIN=".Length);
                            if (int.TryParse(v_ver_txt, out int v_ver))
                                _RequiredModules[v_faze].SubVerzeMin = v_ver;
                            else
                                throw new GDataInvalidException(21300087, 21300065, _tst_file_name, "SUB_VERZE_MIN"); //RC-EX 21300065 : V TST souboru {0} je zadána chybná položka {1}
                        }
                        else if (v_pom.StartsWith("PARAM"))
                        {
                            string param = GStrFce.CutFrom(line, "=");
                            _RequiredModules[v_faze].Param = param;
                        }
                    }
                }
                else if (v_in_section_program && line.StartsWith("VERZE_DB_MIN="))
                {
                    string v_pom = line.Substring("VERZE_DB_MIN=".Length);
                    if (int.TryParse(v_pom, out int v_cis))
                        this._VerzeDbMin = v_cis;
                    else
                        throw new GDataInvalidException(21300107, 21300065, _tst_file_name, "VERZE_DB_MIN"); //RC-EX 21300065 : V TST souboru {0} je zadána chybná položka {1}
                }
                else if (v_in_section_program && line.StartsWith("SUB_VERZE_DB_MIN="))
                {
                    string v_pom = line.Substring("SUB_VERZE_DB_MIN=".Length);
                    if (int.TryParse(v_pom, out int v_cis))
                        this._SubVerzeDbMin = v_cis;
                    else
                        throw new GDataInvalidException(21300088, 21300065, _tst_file_name, "SUB_VERZE_DB_MIN"); //RC-EX 21300065 : V TST souboru {0} je zadána chybná položka {1}
                }
                else if (v_in_section_program && line.StartsWith("REV_DB_MIN="))
                {
                    string v_pom = line.Substring("REV_DB_MIN=".Length);
                    if (int.TryParse(v_pom, out int v_cis))
                        this._RevDbMin = v_cis;
                    else
                        throw new GDataInvalidException(21300089, 21300065, _tst_file_name, "REV_DB_MIN"); //RC-EX 21300065 : V TST souboru {0} je zadána chybná položka {1}
                }
                else if (v_in_section_program && line.StartsWith("VERZE_DB_MIN2="))
                {
                    string v_pom = line.Substring("VERZE_DB_MIN2=".Length);
                    if (int.TryParse(v_pom, out int v_cis))
                        this._VerzeDbMin2 = v_cis;
                    else
                        throw new GDataInvalidException(21300108, 21300065, _tst_file_name, "VERZE_DB_MIN2"); //RC-EX 21300065 : V TST souboru {0} je zadána chybná položka {1}
                }
                else if (v_in_section_program && line.StartsWith("SUB_VERZE_DB_MIN2="))
                {
                    string v_pom = line.Substring("SUB_VERZE_DB_MIN2=".Length);
                    if (int.TryParse(v_pom, out int v_cis))
                        this._SubVerzeDbMin2 = v_cis;
                    else
                        throw new GDataInvalidException(21300090, 21300065, _tst_file_name, "SUB_VERZE_DB_MIN2"); //RC-EX 21300065 : V TST souboru {0} je zadána chybná položka {1}
                }
                else if (v_in_section_program && line.StartsWith("REV_DB_MIN2="))
                {
                    string v_pom = line.Substring("REV_DB_MIN2=".Length);
                    if (int.TryParse(v_pom, out int v_cis))
                        this._RevDbMin2 = v_cis;
                    else
                        throw new GDataInvalidException(21300091, 21300065, _tst_file_name, "REV_DB_MIN2"); //RC-EX 21300065 : V TST souboru {0} je zadána chybná položka {1}
                }
                else if (v_in_section_files && !line.StartsWith("["))                                 // pokud jsem jiz u výčtu souboru
                {
                    if ( !line.IsNullOrWhiteSpace() && line[0] != ';')                                     // pokud řádek není prázdný a nebo zakomentovaný
                    {
                        if (originalLine[0] != ' ')                                                        // pokud řádek začíná mezerou - je to přepnutí adresáře
                        {
                            v_akt_adr = originalLine.Trim();                                               // musím zachovat velikost písma
                            if (!v_akt_adr.EndsWith("\\"))
                                v_akt_adr = v_akt_adr + "\\";
                        }
                        else                                                                                         // jinak se již jedná o samostatný soubor
                        {
                            #region Z jednoho řádku TST souboru nastavím parametry jednoho souboru pro instalaci

                            // musím zachovat velikost písma
                            string v_file_name_from_tst = originalLine.CutTo(originalLine.ToUpperInvariant(), new string[] { "SHA2=", "S=", "C=", "T=", "P=" }, a_or_to_end: true ).Trim();

                            if (v_file_name_from_tst != "")
                            {
                                GDistributionFile v_file_info = new GDistributionFile();
                                v_file_info.Revize = _revize.Revize;
                                v_file_info.FilePath = v_akt_adr;
                                v_file_info.FileName = v_file_name_from_tst;
                                v_file_info.FullFileName = Path.Combine(v_akt_adr, v_file_name_from_tst);   // tady to ale bude upper
                                // SIZE
                                string v_TstSize = line.CutFromTo("S=", " ", true); 
                                if (!v_TstSize.IsNullOrWhiteSpace() && Int32.TryParse(v_TstSize, out int pomSize ))
                                    v_file_info.Size = pomSize;
                                // TYPE
                                v_file_info.FileType = "";
                                string v_TstFileType = line.CutFromTo("T=", " ", true); 
                                if (!v_TstFileType.IsNullOrWhiteSpace())
                                    v_file_info.FileType = v_TstFileType;
                                // CRC
                                string v_TstFileCrc = line.CutFromTo("C=", " ", true); //GStrFce.CutFromTo(line.ToLower() + " ", "c=", " ");
                                if ( !v_TstFileCrc.IsNullOrWhiteSpace() && Int32.TryParse(v_TstFileCrc, out int pomCrc)) 
                                    v_file_info.Crc = pomCrc;
                                // SHA2
                                string v_TstFileSha2 = line.CutFromTo("SHA2=", " ", true);     // GStrFce.CutFromTo(line.ToLower() + " ", "sha2=", " ");
                                if (!v_TstFileSha2.IsNullOrWhiteSpace() )
                                    v_file_info.FileSHA2 = v_TstFileSha2;
                                // PARAM
                                string v_TstFileParam = line.CutFromTo("P=", " ", true);     // GStrFce.CutFromTo(line.ToLower() + " ", "p=", " ");
                                if (!v_TstFileParam.IsNullOrWhiteSpace())
                                    v_file_info.Param = v_TstFileParam;
                                // NAME
                                if (v_file_name_from_tst == v_master_exe_file_name)          // pokud se aktualne proverovany soubor shoduje s teoretickym hlavnim EXE souborem programove faze
                                    _ExeFileName = v_file_name_from_tst;

                                string v_full_file_name_tst = v_file_info.FullFileName.ToLower();
                                if (_DistributionFiles.ContainsKey(v_full_file_name_tst))
                                    _DistributionFiles[v_full_file_name_tst] = v_file_info;
                                else
                                    _DistributionFiles.Add(v_full_file_name_tst, v_file_info);
                            }
                            #endregion
                        }
                    }
                }
            } // end  while (v_reader.Peek() >= 0)
        }
        #endregion

        /// <summary>
        /// Find first tst file in specified directory
        /// </summary>
        /// <param name="rootDir"></param>
        /// <returns></returns>
        /// <exception cref="GException"></exception>
        public static string FindTstPath(string rootDir)
        {
            var tstFile = new DirectoryInfo(rootDir)
                .EnumerateFiles("*.tst")
                .FirstOrDefault();

            return tstFile == null
                ? throw new GException(21000103, 21090072, rootDir) //RC-EX 21090072 : Nenalezen vyžadovaný TST soubor v {0}.
                : tstFile.FullName;
        }
    }
}
