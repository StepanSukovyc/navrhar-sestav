//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GZipDistributionFile.cs               </Name>
//    <Description> Třída popisující jeden distribuční ZIP soubor - podle standardů distribučních ZIP balíčků</Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2018                            </Copyright>
//    <Created>     2018-07-04                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Security.Cryptography;
using System.Security.Cryptography.Pkcs;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;


namespace Gordic.General
{
    /// <summary>
    /// Třída popisující jeden distribuční ZIP soubor - podle standardů distribučních ZIP balíčků GINIS
    /// </summary>
    public class GZipDistributionFile : IDisposable
    {
        #region Interní proměnné
        /// <summary>
        /// Logování
        /// </summary>
        protected static readonly IGLogger _Logger = GLogManager.CurrentClassLogger();    // toto je varianta, kdy se šifruje v NLOG kódu a jeho tasku

        /// <summary>
        /// Plné jméno distribučního ZIP balíčku na disku
        /// </summary>
        private string _zip_file_name = "";
        /// <summary>
        /// Jméno TST souboru, nalezeného v ZIPu - tak jak se má jmenovat v ZIPu ( tady mám truchu bordel )
        /// </summary>
        private string _tst_file_name = null;
        /// <summary>
        /// Řetězec obsahující seznam přímo vyžadovaných instalačních modulů ( neobsahuje rekursivně vyžadované moduly ) - pouze to co je uvedeno přímo v TST souboru.
        /// </summary>
        internal string _Required = null;
        /// <summary>
        /// Revize instalovaného modulu.
        /// </summary>
        internal string _Revize = null;
        /// <summary>
        /// Typ vývojového prostředí aplikace ( aktuálně jsou povolené hodnoty PB7, PB9, PB12 a prázdno )
        /// </summary>
        internal string _Apl_Type = null;
        internal string _Faze = null;
        internal string _TstFileName = null;
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
        /// <summary>
        /// Seznam jmen všech souborů obsažených v ZIPu - v klíči jsou jména souborů uvedena malým písmem pro zajištění unikátnosti
        /// </summary>
        private Dictionary<string, string> _FilesInZip = null;
        /// <summary>
        /// Celková velikost souborů obsažených z ZIPu ( v rozzipované podobě )
        /// </summary>
        private long _FilesSize = 0;
        #endregion

        /// <summary>
        /// Konstruktor, který si zapamatuje umístění distribučního ZIP balíčku na disku
        /// </summary>
        /// <param name="a_zip_file_name"></param>
        public GZipDistributionFile( string a_zip_file_name )
        {
            _zip_file_name = a_zip_file_name;
        }

        /// <summary>
        /// Konstruktor, který si zapamatuje umístění distribučního ZIP balíčku na disku a zajistí načtení TST souboru do paměti.
        /// Pokud zadaný TST soubor na disku neexistuje, potom jej vytáhne ze ZIPu a uloží na disk do zadaného souboru
        /// </summary>
        /// <param name="a_zip_file_name">Plná cesta k ZIP souboru na disku</param>
        /// <param name="a_tst_file_name">Plná cesta k TST souboru na disku</param>
        public GZipDistributionFile(string a_zip_file_name, string a_tst_file_name )
        {
            _zip_file_name = a_zip_file_name;
            _tstFileContent = new MemoryStream();

            if (!File.Exists(a_tst_file_name))  // pokud zadaný TST soubor na disku neexistuje
            {
                // Načtu obsah TST souboru ze ZIPu do paměti - a nechám si jej v paměti
                using (ZipArchive zipArchive = ZipFile.OpenRead(_zip_file_name))
                {
                    ZipArchiveEntry v_item = null;
                    try
                    {
                        v_item = zipArchive.GetEntry(this.TstFileName);         // tím, že načtu property TstFileName se načte ze ZIPu její hodnota
                    }
                    catch (Exception error)
                    {
                        throw new GDataInvalidException(21300097, 21300068, _zip_file_name, error.Message); //RC-EX 21300068 : Chyba při pokusu načíst TST soubor z distribučního souboru {0}. Tento ZIP soubor může být poškozen. {1}
                    }
                    using (Stream v_Stream = v_item.Open())
                    {
                        try
                        {
                            v_Stream.CopyTo(_tstFileContent);
                        }
                        catch( Exception error)
                        {
                            throw new GDataInvalidException(21300098, 21300068, _zip_file_name, error.Message); //RC-EX 21300068 : Chyba při pokusu načíst TST soubor z distribučního souboru {0}. Tento ZIP soubor může být poškozen. {1}
                        }
                    }
                }

                // Zapíšu obsah TST souboru na disk do zadaného místa 
                using (FileStream file = new FileStream(a_tst_file_name, FileMode.Create, System.IO.FileAccess.Write))
                {
                    _tstFileContent.CopyTo(file);
                }
                _tst_file_name = a_tst_file_name;
            }
            else // Pokud TST soubor na disku existuje - načtu si jej
            {
                _tst_file_name = a_tst_file_name;
                using (FileStream fileStream = File.OpenRead(_tst_file_name))
                {
                    _tstFileContent.SetLength(fileStream.Length);
                    fileStream.Read(_tstFileContent.GetBuffer(), 0, (int)fileStream.Length);    // načtu jej do paměti
                }
            }
        }

        /// <summary>
        /// Kontrola obsahu distribučního balíku na podepsaný soubor se seznamem obsahu ZIP balíku
        /// </summary>
        /// <exception cref="GDataInvalidException"></exception>
        public void CheckFileList()
        {
            // kontrola přítomnosti bezpečnostních prvků prokazujících integritu a původnost ZIP balíku - pouze od verze GINISu 490
            List<string> allFileInZip = new List<string>();
            // vykopíruji si seznam všech souborů obsažených v ZIPu
            foreach (string item in this.FilesInZip.Keys)
            {
                _Logger.Debug("Zip obsahuje: {0}", item);
                allFileInZip.Add(item);
            }
            if (this.ContainsFileInZip("fileslist.p7s"))
            {
                byte[] fileslist = this.GetFileContent("fileslist.p7s");
                SignedCms v_Cms = new SignedCms();
                v_Cms.Decode(fileslist);
                try
                {
                    v_Cms.CheckSignature(true);
                }
                catch (System.Security.Cryptography.CryptographicException v_chyba_podpisu)
                {
                    throw new GDataInvalidException(21300070, 21300053, v_chyba_podpisu.Message); //RC-EX 21300053 : Chyba při ověření integrity dat: {0}
                }

                // pro tuto kontrolu musí být důvěrzhodná certifikační autorita - a to naše není
                //try
                //{
                //    v_Cms.CheckSignature(false);
                //}
                //catch (System.Security.Cryptography.CryptographicException v_chyba_podpisu)
                //{
                //    throw new GDataInvalidException(21300071, 21300055, v_chyba_podpisu.Message); //RC-EX 21300055 : Chyba při ověření podpisu dat: {0}
                //}

                X509Certificate2 v_cer = v_Cms.Certificates[0];
                if (!v_cer.Thumbprint.Equals("0640396947A2378DF1748DB6E986123D9F950BC4", System.StringComparison.InvariantCultureIgnoreCase))
                    throw new GDataInvalidException(21300072, 21300054);  //RC-EX 21300054 : Data jsou podepsána jiným certifikátem, než je požadováno.

                byte[] v_out_buff = v_Cms.ContentInfo.Content;
                string fileListTxt = GetString(v_out_buff, new UTF8Encoding(true));
                _Logger.Debug("fileslist.p7s obsahuje: {0}", fileListTxt);
                using (var sr = new StringReader(fileListTxt))
                {
                    string line;
                    while ((line = sr.ReadLine()) != null)
                    {
                        if (!String.IsNullOrWhiteSpace(line))
                        {
                            string[] items = line.Split('|');
                            if (items.Length == 3)
                            {
                                string fileName = items[0].Replace(@"\\", @"\");
                                string hash = items[1];
                                if (allFileInZip.Contains(fileName))
                                {
                                    byte[] fileContent = this.GetFileContent(fileName);
                                    string fileHash = GetHash2(fileContent);
                                    if (!hash.Equals(fileHash, StringComparison.InvariantCultureIgnoreCase))
                                        throw new GDataInvalidException(21300073, 21300056, fileName);  //RC-EX 21300056 : Chybná kontrolní data balíku pro soubor: {0}
                                    allFileInZip.Remove(fileName);  // byl ověřen OK a proto jej odeberu z kolekce
                                    _Logger.Debug("Obsažený soubor je OK: {0}", fileName);
                                }
                                else
                                {
                                    _Logger.Debug("ZIP neobsahuje požadovaý soubor: {0}", fileName);
                                    throw new GDataInvalidException(21300074, 21300057, fileName);  //RC-EX 21300057 : ZIP neobsahuje požadovaný soubor: {0}
                                }
                            }
                        }
                    }
                } // using

                allFileInZip.Remove("fileslist.p7s");
                List<string> filesOver = new List<string>();
                foreach (string item in allFileInZip)
                {
                    bool ignore = false;
                    string fileName = Path.GetFileName(item);
                    string filepath = Path.GetDirectoryName(item);

                    if (String.IsNullOrWhiteSpace(fileName))
                        ignore = true;
                    else if (String.IsNullOrWhiteSpace(filepath) && Path.GetExtension(item).Equals(".txt", StringComparison.InvariantCultureIgnoreCase))
                        ignore = true;
                    if (!ignore)
                        filesOver.Add(fileName);
                }

                // zde by pomocný seznam souborů obsažených v ZIPu měl být již prázdný - po kontrole souboru jej vždy z pomocného seznamu odeberu
                if (filesOver.Count > 0)
                {
                    _Logger.Debug("V ZIPu jsou navíc soubory: {0}", String.Join(",", filesOver));
                    throw new GDataInvalidException(21300075, 21300058, String.Join(",", filesOver));  //RC-EX 21300058 : V ZIPu je obsaženo více souborů, než má být: {0}
                }
            }
            else
            {
                _Logger.Debug("V distribučním ZIP balíku chybí požadovaný bezpečnostní prvek." );
                throw new GDataInvalidException(21300076, 21300059);  //RC-EX 21300059 : V distribučním ZIP balíku chybí požadovaný bezpečnostní prvek.
            }
        }

        /// <summary>
        /// Pomocná funkce - převede pole byte na string - i pro případ, že je na začátku přítomen BOM
        /// </summary>
        /// <param name="data"></param>
        /// <param name="encoding"></param>
        /// <returns></returns>
        private static string GetString(byte[] data, Encoding encoding)
        {
            using (var stream = new MemoryStream(data, false))
            {
                using (var reader = new StreamReader(stream, encoding))
                {
                    return reader.ReadToEnd();
                }
            }
        }

        /// <summary>
        /// Pomocná funkce. Pro zadané pole byte vrátí kontrolní hash - stejně sestavený, jako je v TST souboru
        /// </summary>
        /// <param name="a_file_content"></param>
        /// <returns></returns>
        private static string GetHash2(byte[] a_file_content)
        {
            string v_vysledek = "";
            byte[] v_arrbytHashValue;
            SHA256CryptoServiceProvider v_SHA2Hasher = new SHA256CryptoServiceProvider();
            using (MemoryStream v_stream = new MemoryStream(a_file_content))
            {
                v_arrbytHashValue = v_SHA2Hasher.ComputeHash(v_stream);
            }
            v_vysledek = System.BitConverter.ToString(v_arrbytHashValue);
            v_vysledek = v_vysledek.Replace("-", "").ToLower();
            return v_vysledek;
        }

        /// <summary>
        /// Načtení zadaného souboru ze ZIPu do pole byte
        /// </summary>
        /// <param name="a_file_name">Jméno souboru, který se má načíst ze ZIPu</param>
        /// <returns>Pole byte</returns>
        public byte[] GetFileContent( string a_file_name )
        {
            byte[] v_vysledek = null;
            string v_file_name_lower = a_file_name.ToLower().Replace('/', '\\'); 
            if (FilesInZip.ContainsKey(v_file_name_lower))
                {
                string v_file_name = FilesInZip[v_file_name_lower];
                using (ZipArchive zipArchive = ZipFile.OpenRead(_zip_file_name))
                {
                    ZipArchiveEntry v_item = zipArchive.GetEntry(v_file_name);
                    v_vysledek = new byte[v_item.Length];
                    using (Stream v_Stream = v_item.Open())
                    {
                        v_Stream.Read(v_vysledek, 0, (int)v_item.Length);
                    }
                }
            }
            else
            {
                throw new GException(21300066, 21300049, v_file_name_lower, _zip_file_name); //RC-EX 21300049 : Požadovaný soubor {0} není v ZIPu {1} obsažen.
            }
            return (v_vysledek);
        }

        /// <summary>
        /// Otestuje přítomnost zadaného souboru v ZIPu a to bez ohledu na velikost písmen a bez ohledu na typ lomítka v cestě
        /// Soubor musí být uveden včetně cesty v ZIPu
        /// </summary>
        /// <param name="a_file_name">Plná cesta k testovanému souboru</param>
        /// <returns>true, pokud se v zipu takový soubor nachází</returns>
        public bool ContainsFileInZip( string a_file_name )
        {
            string file = a_file_name.ToLower().Replace('/', '\\');
            return(FilesInZip.ContainsKey(file));
        }

        /// <summary>
        /// Otestuje přítomnost zadaného souboru v TST souboru a to bez ohledu na velikost písmen a bez ohledu na typ lomítka v cestě
        /// Soubor musí být uveden včetně cesty uvedené v TST souboru
        /// </summary>
        /// <param name="a_file_name">Plná cesta k testovanému souboru</param>
        /// <returns>true, pokud se v zipu takový soubor nachází</returns>
        public bool ContainsFileInTst(string a_file_name)
        {
            string file = a_file_name.ToLower().Replace('/', '\\');
            return (DistributionFiles.ContainsKey(file));
        }

        #region Property
        /// <summary>
        /// Seznam jmen všech souborů obsažených v ZIPu - v klíči jsou jména souborů uvedena malým písmem pro zajištění unikátnosti
        /// Prvním dotazem na tuto Property vyvolám vnitřní čtení ZIP adresáře
        /// </summary>
        public Dictionary<string, string> FilesInZip
        {
            get
            {
                if (_FilesInZip == null)
                {
                    _FilesInZip = new Dictionary<string, string>();
                    try
                    {
                        using (ZipArchive _ZipArchive = ZipFile.OpenRead(_zip_file_name))
                        {
                            foreach (var item in _ZipArchive.Entries)
                            {
                                string v_key = item.FullName.ToLower().Replace( '/', '\\' );
                                if (!_FilesInZip.ContainsKey(v_key))
                                    _FilesInZip.Add(v_key, item.FullName);
                                _FilesSize = _FilesSize + item.Length;
                            }
                        }
                    }
                    catch( Exception v_error )
                    {
                        throw new GException( 21300067, 21300050, _zip_file_name, v_error.Message); //RC-EX 21300050 : Zip {0} nelze číst. Chyba: {1}
                    }
                }
                return (_FilesInZip);
            }
        }

        /// <summary>
        /// Celková velikost nekomprimovaných souborů obsažených v ZIPu
        /// </summary>
        public long FilesSize
        {
            get
            {
                if (FilesInZip.Count > 0)       // tímto dotazem vyvolám načtení interních informací ze zip adresáře
                    return _FilesSize;
                else
                    return 0;
            }
        }

        /// <summary>
        /// Plné jméno distribučního ZIP balíčku
        /// </summary>
        public string ZipFileName { get { return _zip_file_name; } }

        /// <summary>
        /// Vrátí jméno TST souboru nalezeného uvnitř ZIPu - pokud ZIP neobsahuje TST soubor, potom vrátí prázdný string.
        /// Jméno je včetně cesty v rámci ZIPu
        /// Pokud obsahuje více TST souborů, potom vyvolá výjimku.
        /// </summary>
        public string TstFileName
        {
            get
            {
                if (_tst_file_name == null)     // pokud tato informace zatím nebyla ze ZIPu načtena
                {
                    string v_tst_file_name_in_zip = "";             // výchozí stav je prázdné jméno a to odpovídá nenalezenému TST souboru
                    foreach (string item in FilesInZip.Values)
                    {
                        if (Path.GetExtension(item).ToLower() == ".tst")
                        {
                            if (v_tst_file_name_in_zip != String.Empty)
                                throw new GException(21300068, 21300051, _zip_file_name); //RC-EX 21300051 : Distribuční ZIP {0} obsahuje více jak jeden TST soubor.
                            v_tst_file_name_in_zip = item;
                        }
                    }
                    _tst_file_name = v_tst_file_name_in_zip;
                }
                if( String.IsNullOrEmpty(_tst_file_name))
                    throw new GException(21300094, 21300066, _zip_file_name); //RC-EX 21300066 : Distribuční ZIP {0} neobsahuje TST soubor.
                return _tst_file_name;
            }
        }
        /// <summary>
        /// Vrátí jméno TST souboru nalezeného uvnitř ZIPu - pokud ZIP neobsahuje TST soubor, potom vrátí prázdný string.
        /// Jméno je bez cesty
        /// Pokud obsahuje více TST souborů, potom vyvolá výjimku.
        /// ref T8131
        /// </summary>
        public string TstFileNameShort
        {
            get 
            {
                return (Path.GetFileName(TstFileName));
            }
        }
        
        /// <summary>
        /// Binární obsah TST souboru v podobě MemoryStream
        /// </summary>
        public MemoryStream TstFileContent
        {
            get
            {
                if (_tstFileContent == null)
                {
                    try
                    {


                        _tstFileContent = new MemoryStream();
                        using (ZipArchive zipArchive = ZipFile.OpenRead(_zip_file_name))
                        {
                            ZipArchiveEntry v_item = zipArchive.GetEntry(TstFileName);
                            using (Stream v_Stream = v_item.Open())
                            {
                                v_Stream.CopyTo(_tstFileContent);
                            }
                        }
                    }
                    catch( Exception error)
                    {
                        throw new GException(21300096, 21300067, _zip_file_name, error.Message); //RC-EX 21300067 : Nepodařilo se ze ZIPu {0} načíst obsah TST souboru pro chybu: {1}
                    }
                }
                return (_tstFileContent); 
            }
        }
        /// <summary>
        /// Seznam souborů obsažených v distribučním balíčku podle obsahu TST souboru
        /// </summary>
        public Dictionary<string, GDistributionFile> DistributionFiles
        {
            get
            {
                if (_DistributionFiles == null)
                    ReadTstContent();
                return (_DistributionFiles);
            }
        }
        /// <summary>
        /// Seznam požadovaných balíčků
        /// </summary>
        public Dictionary<string, GRequiredModule> RequiredModules
        {
            get
            {
                if (_DistributionFiles == null)
                    ReadTstContent();

                return( _RequiredModules);
            }
        }
        /// <summary>
        /// Řetězec obsahující seznam přímo vyžadovaných instalačních modulů ( neobsahuje rekursivně vyžadované moduly ) - pouze to co je uvedeno přímo v TST souboru.
        /// </summary>
        public string Required
        {
            get
            {
                if (_DistributionFiles == null)
                    ReadTstContent();
                return (_Required);
            }
        }
        //TODO: Udělat get pro Requiredx - který by nepovinné moduly obsahoval v závorkách

        /// <summary>
        /// Revize instalovaného modulu.
        /// </summary>
        public string Revize
        {
            get
            {
                if (_DistributionFiles == null)
                    ReadTstContent();
                return (_Revize);
            }
        }

        /// <summary>
        /// Revize instalovaného modulu a to včetně případného rozlišení licence od a licence pro.
        /// https://phabricator.gordic.cz/T23670
        /// </summary>
        public string RevizeFull
        {
            get
            {
                if (_DistributionFiles == null)
                    ReadTstContent();
                if( !String.IsNullOrWhiteSpace( LicenceOd ) && !String.IsNullOrWhiteSpace( LicencePro ) )
                    return (_Revize + "_" + LicenceOd + LicencePro);
                else
                    return (_Revize);
            }
        }

        /// <summary>
        /// Typ vývojového prostředí aplikace ( aktuálně jsou povolené hodnoty PB7, PB9, PB12 a prázdno )
        /// </summary>
        public string Apl_Type
        {
            get
            {
                if (_DistributionFiles == null)
                    ReadTstContent();
                return (_Apl_Type);
            }
        }
        /// <summary>
        /// Fáze balíčku načtená z TST souboru a tam uvedené revize
        /// </summary>
        public string Faze
        {
            get
            {
                if (_DistributionFiles == null)
                    ReadTstContent();
                return (_Faze);
            }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ExeFileName
        {
            get
            {
                if (_DistributionFiles == null)
                    ReadTstContent();
                return (_ExeFileName);
            }
        }
        /// <summary>
        /// Datum vzniku balíčku
        /// </summary>
        public string DatetimeAkt
        {
            get
            {
                if (_DistributionFiles == null)
                    ReadTstContent();
                return (_DatetimeAkt);
            }
        }
        /// <summary>
        /// Licence určuje, kdo je autorem sestav - naplněno pouze pro zákazníka L - jinak je prázdný string
        /// </summary>
        public string LicenceOd
        {
            get
            {
                if (_DistributionFiles == null)
                    ReadTstContent();
                return (_LicenceOd);
            }
        }
        /// <summary>
        /// Licence, pro koho je sestava určena - většinou je prázdný string
        /// </summary>
        public string LicencePro
        {
            get
            {
                if (_DistributionFiles == null)
                    ReadTstContent();
                return (_LicencePro);
            }
        }
        /// <summary>
        /// Typ distribučního balíčku
        /// </summary>
        public GTypModuluEnum TypModulu
        {
            get
            {
                if (_DistributionFiles == null)
                    ReadTstContent();
                return (_TypModulu);
            }
        }

        /// <summary>
        /// Minimální požadovaná verze DB - ref T39642
        /// </summary>
        public int? VerzeDbMin { get { return _VerzeDbMin; } }

        /// <summary>
        /// Minimální požadovaná subverze DB 
        /// ( verze již nemusí být stejná jako verze celého distribučního balíčku )
        /// </summary>
        public int? SubVerzeDbMin { get { return _SubVerzeDbMin; } }
        /// <summary>
        /// Minimální požadovaná revize DB  - to je třetí část číslování verze databáze ( SP )
        /// v tomto případě musí být stanovena subverze databáze, ke které se tato revize vztahuje
        /// </summary>
        public int? RevDbMin { get { return _RevDbMin; } }

        /// <summary>
        /// Minimální požadovaná verze DB alternativní - autor může uvést minimální požadavek dvojitě OPR / NEOPR verze DB - ref T39642
        /// </summary>
        public int? VerzeDbMin2 { get { return _VerzeDbMin2; } }

        /// <summary>
        /// Minimální požadovaná subverze DB alternativní - autor může uvést minimální požadavek dvojitě OPR / NEOPR verze DB
        /// ( verze musí být stejná jako verze celého distribučního balíčku )
        /// </summary>
        public int? SubVerzeDbMin2 { get { return _SubVerzeDbMin2; } }
        /// <summary>
        /// Minimální požadovaná revize DB alternativní - to je třetí část číslování verze databáze ( SP )
        /// v tomto případě musí být stanovena subverze databáze, ke které se tato revize vztahuje
        /// </summary>
        public int? RevDbMin2 { get { return _RevDbMin2; } }
        #endregion

        #region Pomocné funkce
        /// <summary>
        /// Čtení obsahu TST souboru
        /// Je to nějak zdvojený kód s <see cref="GTstFile.ReadTstContent"/>
        /// </summary>
        private void ReadTstContent()
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
            int? v_VerzeDb = null;

            bool v_in_section_program = false;
            bool v_in_section_required = false;
            bool v_in_section_files = false;
            string v_akt_adr = "";
            string v_master_exe_file_name = "";               // hlavni EXE pro fázi - pokud ovšem může existovat
            MemoryStream v_MemoryStream = this.TstFileContent;
            Encoding encoding = GFileUtils.DetectEncoding(v_MemoryStream);
            StreamReader v_reader = v_reader = new StreamReader(v_MemoryStream, encoding);
            while (v_reader.Peek() >= 0)
            {
                string v_radek = v_reader.ReadLine();
                v_radek = GStrFce.ReplaceText(v_radek, "\t", " ");


                if (v_radek.ToLower().Trim().StartsWith("[program]"))
                {
                    v_in_section_program = true;
                    v_in_section_required = false;
                    v_in_section_files = false;
                    //v_in_section_asc_file = false;
                }
                else if (v_radek.ToLower().Trim().StartsWith("[required]"))
                {
                    v_in_section_program = false;
                    v_in_section_required = true;
                    v_in_section_files = false;
                    //v_in_section_asc_file = false;
                }
                else if (v_radek.ToLower().Trim().StartsWith("[files]"))
                {
                    v_in_section_program = false;
                    v_in_section_required = false;
                    v_in_section_files = true;
                    //v_in_section_asc_file = false;
                }
                else if (v_radek.ToLower().Trim().StartsWith("[asc_file]"))
                {
                    v_in_section_program = false;
                    v_in_section_required = false;
                    v_in_section_files = false;
                    //v_in_section_asc_file = true;
                }
                else if (v_radek.ToLower().Trim().StartsWith("["))
                {
                    v_in_section_program = false;
                    v_in_section_required = false;
                    v_in_section_files = false;
                    //v_in_section_asc_file = false;
                }
                else if (v_in_section_program && v_radek.ToLower().Trim().StartsWith("revize="))
                {
                    this._Revize = v_radek.Trim().Substring("revize=".Length);                                // tímto nastavím verzi, revizi, fazi
                    GRevize v_revize = new GRevize(this._Revize);
                    this._Faze = v_revize.Faze;
                    this._TypModulu = v_revize.TypModulu;   
                    v_master_exe_file_name = v_revize.ExeFileName;
                    v_VerzeDb = v_revize.VerzeDb;    // 2025-02-04
                    //if (_VerzeDbMin == null)    // T39646
                    //    _VerzeDbMin = v_revize.VerzeDb;
                    //if (_VerzeDbMin2 == null)   // T39646
                    //    _VerzeDbMin2 = v_revize.VerzeDb;
                }
                else if (v_in_section_program && v_radek.ToLower().Trim().StartsWith("licence_od="))
                    _LicenceOd = v_radek.Trim().Substring("licence_od=".Length);                           // nastavim seznam pozadovanych modulu
                else if (v_in_section_program && v_radek.ToLower().Trim().StartsWith("licence_pro="))
                    _LicencePro = v_radek.Trim().Substring("licence_pro=".Length);                           // nastavim seznam pozadovanych modulu
                else if (v_in_section_program && v_radek.ToLower().Trim().StartsWith("dat_akt="))
                    this._DatetimeAkt = v_radek.Trim().Substring("dat_akt=".Length);                           // nastavim seznam pozadovanych modulu
                else if (v_in_section_required && v_radek.ToLower().Trim().StartsWith("modules="))
                {
                    this._Required = v_radek.Trim().Substring("modules=".Length);                              // nastavim seznam pozadovanych modulu
                    string[] v_req = _Required.Split(',');
                    foreach( string v_faz in v_req )
                    {
                        string v_faze = v_faz.Trim().ToUpper();
                        if(!String.IsNullOrWhiteSpace(v_faze))
                        {
                            if (!_RequiredModules.ContainsKey(v_faze))
                                _RequiredModules.Add(v_faze, new GRequiredModule(v_faze));
                        }
                    }
                }
                else if (v_in_section_required && v_radek.Length > 8)
                {
                    string v_faze = v_radek.Substring(0, 8).ToUpper();
                    if (_RequiredModules.ContainsKey(v_faze))
                    { 
                        string v_pom = v_radek.Substring(9).ToUpper();
                        if (v_pom.StartsWith("MANDATORY"))
                        {
                            string v_pov = GStrFce.CutFrom(v_radek, "=");
                            _RequiredModules[v_faze].Mandatory = (v_pov == "TRUE");
                        }
                        else if (v_pom.StartsWith("SUB_VERZE_MIN"))
                        {
                            string v_ver_txt = GStrFce.CutFrom(v_radek, "=");
                            if( int.TryParse(v_ver_txt, out int v_ver ))
                                _RequiredModules[v_faze].SubVerzeMin = v_ver;
                        }
                        else if (v_pom.StartsWith("PARAM"))
                        {
                            string v_param = GStrFce.CutFrom(v_radek, "=");
                             _RequiredModules[v_faze].Param = v_param;
                        }
                    }
                }
                else if (v_in_section_program && v_radek.ToLower().Trim().StartsWith("verze_db_min="))  // T39646
                {
                    string v_pom = v_radek.Trim().Substring("verze_db_min=".Length);
                    if (int.TryParse(v_pom, out int v_cis))
                        this._VerzeDbMin = v_cis;
                }
                else if (v_in_section_program && v_radek.ToLower().Trim().StartsWith("sub_verze_db_min="))
                {
                    string v_pom = v_radek.Trim().Substring("sub_verze_db_min=".Length);
                    if (int.TryParse(v_pom, out int v_cis))
                        this._SubVerzeDbMin = v_cis;
                }
                else if (v_in_section_program && v_radek.ToLower().Trim().StartsWith("rev_db_min="))
                {
                    string v_pom = v_radek.Trim().Substring("rev_db_min=".Length);
                    if (int.TryParse(v_pom, out int v_cis))
                        this._RevDbMin = v_cis;
                }
                else if (v_in_section_program && v_radek.ToLower().Trim().StartsWith("verze_db_min2=")) // T39646
                {
                    string v_pom = v_radek.Trim().Substring("verze_db_min2=".Length);
                    if (int.TryParse(v_pom, out int v_cis))
                        this._VerzeDbMin2 = v_cis;
                }
                else if (v_in_section_program && v_radek.ToLower().Trim().StartsWith("sub_verze_db_min2="))
                {
                    string v_pom = v_radek.Trim().Substring("sub_verze_db_min2=".Length);
                    if (int.TryParse(v_pom, out int v_cis))
                        this._SubVerzeDbMin2 = v_cis;
                }
                else if (v_in_section_program && v_radek.ToLower().Trim().StartsWith("rev_db_min2="))
                {
                    string v_pom = v_radek.Trim().Substring("rev_db_min2=".Length);
                    if (int.TryParse(v_pom, out int v_cis))
                        this._RevDbMin2 = v_cis;
                }
                else if (v_in_section_files && !v_radek.ToLower().Trim().StartsWith("["))                                 // pokud jsem jiz u vyctu souboru
                {
                    if (v_radek.Trim() != "" && !v_radek.Trim().StartsWith(";"))                                     // pokud radek neni prazdny a nebo zakomentovany
                    {
                        if (!v_radek.StartsWith(" "))                                                                // pokud radek zacina mezerou - je to prepnuti adresare
                        {
                            v_akt_adr = v_radek.Trim();
                            if (!v_akt_adr.EndsWith("\\"))
                                v_akt_adr = v_akt_adr + "\\";
                        }
                        else                                                                                         // jinak se jiz jedna o samostatny soubor
                        {
                            #region Z jednoho řádku TST souboru nastavím parametry jednoho souboru pro instalaci
                            string v_file_name_from_tst = v_radek.Trim();
                            v_file_name_from_tst = GStrFce.CutTo(v_file_name_from_tst, v_file_name_from_tst.ToLower() + "sha2=", "sha2=");
                            v_file_name_from_tst = GStrFce.CutTo(v_file_name_from_tst, v_file_name_from_tst.ToLower() + "s=", "s=");
                            v_file_name_from_tst = GStrFce.CutTo(v_file_name_from_tst, v_file_name_from_tst.ToLower() + "c=", "c=");
                            v_file_name_from_tst = GStrFce.CutTo(v_file_name_from_tst, v_file_name_from_tst.ToLower() + "t=", "t=");
                            v_file_name_from_tst = GStrFce.CutTo(v_file_name_from_tst, v_file_name_from_tst.ToLower() + "p=", "p=");
                            v_file_name_from_tst = v_file_name_from_tst.Trim();
                            if (v_file_name_from_tst != "")
                            {
                                GDistributionFile v_file_info = new GDistributionFile();
                                v_file_info.Revize = this.Revize;
                                v_file_info.FilePath = v_akt_adr;
                                v_file_info.FileName = v_file_name_from_tst;
                                v_file_info.FullFileName = Path.Combine(v_akt_adr, v_file_name_from_tst);
                                // SIZE
                                string v_TstSize = GStrFce.CutFromTo(v_radek.ToLower() + " ", "s=", " ");
                                if (v_TstSize.Trim() != "" && GStrFce.IsNumber(v_TstSize))
                                    v_file_info.Size = int.Parse(v_TstSize);
                                // TYPE
                                string v_TstFileType = GStrFce.CutFromTo(v_radek.ToLower() + " ", "t=", " ");
                                if (v_TstFileType.Trim() != "")
                                    v_file_info.FileType = v_TstFileType.ToUpper();
                                else
                                    v_file_info.FileType = "";
                                // CRC
                                string v_TstFileCrc = GStrFce.CutFromTo(v_radek.ToLower() + " ", "c=", " ");
                                if (v_TstFileCrc.Trim() != "" && GStrFce.IsNumber(v_TstFileCrc))
                                    v_file_info.Crc = int.Parse(v_TstFileCrc);
                                // SHA2
                                string v_TstFileSha2 = GStrFce.CutFromTo(v_radek.ToLower() + " ", "sha2=", " ");
                                if (v_TstFileSha2.Trim() != "")
                                    v_file_info.FileSHA2 = v_TstFileSha2.ToUpper();
                                // PARAM
                                string v_TstFileParam = GStrFce.CutFromTo(v_radek.ToLower() + " ", "p=", " ");
                                if (v_TstFileParam.Trim() != "")
                                    v_file_info.Param = v_TstFileParam;
                                // NAME
                                if (v_file_name_from_tst.ToUpper() == v_master_exe_file_name)          // pokud se aktualne proverovany soubor shoduje s teoretickym hlavnim EXE souborem programove faze
                                {
                                    //this._TypModulu = GTypModuluEnum.EXE;
                                    _ExeFileName = v_file_name_from_tst.ToUpper();
                                }

                                if (v_file_info.IsBlobContent)
                                {
                                    string v_full_file_name = v_file_info.FullFileName.ToLower();
                                    v_full_file_name = v_full_file_name.Replace('/', '\\');
                                    if (FilesInZip.ContainsKey(v_full_file_name))
                                        v_file_info.FullFileNameInZip = FilesInZip[v_full_file_name];
                                    else
                                        throw new GException(21300069, 21300052, this._zip_file_name, v_full_file_name); //RC-EX 21300052 : V zip souboru: [{0}] se nepodařilo dohledat soubor [{1}] předepsaný TST souborem.
                                }
                                else
                                    v_file_info.FullFileNameInZip = ""; // pro soubory, které jsou v TST uvedeny pouze jako příkaz pro smazání, nemusí v ZIPu existovat jejich fyzická podoba
                                
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

            // ref T39854 - 2025-02-04 
            if (v_VerzeDb != null)  // pokud se z revize podařilo zjistit hlavní verzi databáze
            {
                // když v TST není uvedeno vůbec nic okolo min verze databáze
                if (_VerzeDbMin == null && _SubVerzeDbMin == null && _RevDbMin == null && _VerzeDbMin2 == null && _SubVerzeDbMin2 == null && _RevDbMin2 == null)
                {
                    _VerzeDbMin = v_VerzeDb - 1;    // potom je povoleno připojení do databáze o verzi mensi
                    _SubVerzeDbMin = 3; // ale subverze musí být min 3
                    _RevDbMin = 0;
                    _VerzeDbMin2 = v_VerzeDb;   // a do databáze verze stejné jako je verze balíku
                    _SubVerzeDbMin2 = 0;
                    _RevDbMin2 = 0;
                }

                if (_VerzeDbMin == null)
                    _VerzeDbMin = v_VerzeDb;
                if (_SubVerzeDbMin == null)
                    _SubVerzeDbMin = 0;
                if (_RevDbMin == null)
                    _RevDbMin = 0;
                if (_VerzeDbMin2 == null)
                    _VerzeDbMin2 = v_VerzeDb;
                if (_SubVerzeDbMin2 == null)
                {
                    if (_VerzeDbMin == _VerzeDbMin2)
                        _SubVerzeDbMin2 = 999;
                    else
                        _SubVerzeDbMin2 = 0;
                }
                if (_RevDbMin2 == null)
                {
                    if (_VerzeDbMin == _VerzeDbMin2 && _SubVerzeDbMin == _SubVerzeDbMin2)
                        _RevDbMin2 = 999;
                    else
                        _RevDbMin2 = 0;
                }

            }
        }
        #endregion

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        /// <summary>
        /// Uvolnění zdrojů - Naalokovaného MemoryStream
        /// </summary>
        /// <param name="disposing"></param>
        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    if (_tstFileContent != null)
                    {
                        _tstFileContent.Close();
                        _tstFileContent.Dispose();
                    }
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~GZipDistributionFile() {
        //   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //   Dispose(false);
        // }

        // This code added to correctly implement the disposable pattern.
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            // TODO: uncomment the following line if the finalizer is overridden above.
            // GC.SuppressFinalize(this);
        }
        #endregion

    }
}
