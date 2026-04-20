//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GWin32.cs             </Name>
//    <Description> volání aplikací založených na Win32        </Description>
//    <Author>      Jan Kuttich                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021 </Copyright>
//    <Created>     2003-03-24                                 </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Resources;
using System.Text;
using System.Diagnostics;
using System.Security.Permissions;
using System.Reflection;
using Microsoft.Win32;
using System.Runtime.InteropServices;

namespace Gordic.General {

    /// <summary>Podpora práce s aplikacemi založenými na Win32 API.</summary>
    /// <remarks>
    /// <para>Tøída GWin32 obsahuje sadu metod pro spouštìní existujících Win32 aplikací. Aplikace jsou spouštìny v samostatném procesu, pøièemž aktuální proces èená na jeho ukonèení a potom teprve pokraèuje ve svém dalším bìhu. Pøi spouštìní se bere v úvahu nastavení promìnné prostøedí PATH.</para>
    /// <para>Aplikaci lze spustit s volitelným poètem parametrù. Minimální poèet parametrù je 0.</para> 
    /// <para>Spuštìní je možné rovnìž stylem spouštìní modulù prostøednictvím spouštìcí lišty Ginis, tj. modul SLG. K tomuto úèelu slouží metoda SlgRun.</para> 
    /// <para>Souèástí tøídy GWin32 jsou rovnìž metody pro kódování a dekódování krátkých øetìzcù F15 a F51.</para>
    /// </remarks>
    /// <example>
    /// <code>
    /// using System;
    /// using Gordic.General;
    /// 
    /// static void Main() {
    ///     string l_sDecoded = "hello world !";
    ///     string l_sEncoded = String.Empty;
    ///     GWin32 l_oGWin32 = new GWin32();
    ///   
    ///     // prosté spuštìní Win32 aplikace
    ///     l_oGWin32.Run("app.exe","parametr 1","parametr 2", ... );
    ///   
    ///     // zakódování øetìzce
    ///     l_sEncoded = l_oGWin32.F15(l_sDecoded);
    ///   
    ///     // dekódování øetìzce
    ///     l_sDecoded = l_oGWin32.F51(l_sEncoded);
    ///   
    /// } // end main
    /// </code>
    /// </example>
    [
    StrongNameIdentityPermission(SecurityAction.Demand,
        PublicKey = "0x0024000004800000940000000602000000240000525341310004000001000100B1C17D23E70B92" +
        "E4075E36FD307F011D116287FB414A5D231AD6AC9355602AC0ACAC3EF2005FE462C0366176C1CDBE" +
        "C8A2E4EB21B49331894F2B682F52B5AAFEB1178B7826E4E51551D193AF629656EC385F8170EFB359" +
        "DA1B3EFBB114660C12DB2309FA6E711225312E35E220BF401010942A4558ABBBD01CB5824641BCFAF0")
    ]
    [System.Security.SecurityCritical]
    public class GWin32 : IGObject {

        #region externí funkce

        [DllImport("Shlwapi.dll", SetLastError = true, CharSet = CharSet.Auto)]
        private static extern uint AssocQueryString(AssocF flags, AssocStr str, string pszAssoc, string pszExtra, [Out] StringBuilder pszOut, [In][Out] ref uint pcchOut);

        [DllImport("user32.dll")]
        private static extern bool SetForegroundWindow(IntPtr hWnd);

        [DllImport("user32.dll")]
        private static extern Boolean GetLastInputInfo(ref LastInputInfo lastInput);

        #endregion

        #region výètové typy

        [Flags]
        private enum AssocF {
            None = 0,
            Init_NoRemapCLSID = 0x1,
            Init_ByExeName = 0x2,
            Open_ByExeName = 0x2,
            Init_DefaultToStar = 0x4,
            Init_DefaultToFolder = 0x8,
            NoUserSettings = 0x10,
            NoTruncate = 0x20,
            Verify = 0x40,
            RemapRunDll = 0x80,
            NoFixUps = 0x100,
            IgnoreBaseClass = 0x200,
            Init_IgnoreUnknown = 0x400,
            Init_FixedProgId = 0x800,
            IsProtocol = 0x1000,
            InitForFile = 0x2000,
        } // end enum

        private enum AssocStr {
            Command = 1,
            Executable,
            FriendlyDocName,
            FriendlyAppName,
            NoOpen,
            ShellNewValue,
            DDECommand,
            DDEIfExec,
            DDEApplication,
            DDETopic,
            InfoTip,
            QuickTip,
            TileInfo,
            ContentType,
            DefaultIcon,
            ShellExtension,
            DropTarget,
            DelegateExecute,
            SupportedUriProtocols,
            Max,
        } // end enum

        #endregion

        #region soukromé konstanty

        /// <summary>relativní cesta k reinstalaènímu programu</summary>
        private const string m_csReinstallerPath = @"GIN\G32INS01.exe";

        /// <summary>relativní cesta k reinstalaènímu programu</summary>
        private const string m_csReinstallerServicePath = @"INS01\GSAINS01.exe";

        #endregion

        #region vlastnosti

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(GWin32).Assembly; }
        } // end property

        #endregion

        #region veøejné metody

        /// <summary> spuštìní exe souboru s parametry </summary>
        /// <param name="l_sApplicationPath">cesta ke spustitelnému souboru</param>
        /// <param name="l_aParameters">seznam parametrù aplikace</param>
        public void Run(string l_sApplicationPath, params string[] l_aParameters) {
            try {
                StringBuilder l_sArguments = new StringBuilder(String.Empty);
                if (l_aParameters != null) {
                    for (int i = 0; i < l_aParameters.Length; i++) {
                        if (i > 0) l_sArguments.Append(' ');
                        l_sArguments.Append(l_aParameters[i]);
                    } // end for
                } // end if
                Process l_oProcess = Process.Start(l_sApplicationPath, l_sArguments.ToString());
                l_oProcess.WaitForExit();
            } // end try
            catch (Exception e) {
                throw new GException(23200243, ThisAssembly, e, l_sApplicationPath); // externí aplikaci nelze spustit, soubor {0} pravdìpodobnì neexistuje nebo není v cestì
            } // end catch
        } // end function

        /// <summary>spuštìní reinstalaèního programu</summary>
        /// <param name="reinstallerPath">cesta k reinstalaènímu progranu nebo k instalaènímu adresáøi Ginis</param>
        /// <param name="profile">databázový profil</param>
        /// <param name="user">uživatel</param>
        /// <param name="password">heslo</param>
        /// <param name="seznamFazi">seznam fází k reinstalaci (oddìlený èárkami)</param>
        /// <param name="faze">fáze urèená k automatickému spuštìní reinstalátorem</param>
        /// <param name="useReinstallationService">pøíznak požadavku na použití reinstalaèní služby</param>
        /// <param name="rezim">režim pøihlášení (1=funkce, 2=zástup, 3=funkce+zástup, 4=pouze první položka funkce+zástup)</param>
        public void RunReinstaller(string reinstallerPath, string profile, string user, string password, string seznamFazi, string faze, bool useReinstallationService = false, int rezim = 4) {
            string l_sParameters = String.Empty;
            // cesta k reinstalaènímu programu
            reinstallerPath = reinstallerPath == null ? String.Empty : reinstallerPath.Trim();
            if (reinstallerPath.EndsWith(".exe", StringComparison.OrdinalIgnoreCase) == false) reinstallerPath = Path.Combine(reinstallerPath, useReinstallationService ? m_csReinstallerServicePath : m_csReinstallerPath);
            if (File.Exists(reinstallerPath) == false) throw new GException(23200244, ThisAssembly, reinstallerPath); // aktualizaci nelze spustit, soubor {0} nebyl nenalezen
            // parametry aplikace
            l_sParameters = String.Format("{0}#{1}#{2}##{3}###", profile, user, password, rezim > 0 && rezim < 5 ? rezim : 4);
            l_sParameters = Cover(l_sParameters);
            l_sParameters += String.Format(" {0}", seznamFazi);
            // fáze urèená k automatickému spuštìní
            if (faze != null && (faze = faze.Trim()) != String.Empty && user != "ginis01") l_sParameters += String.Format(" autorun={0}", faze);
            // spuštìní reinstalátoru
            try {
                Process.Start(reinstallerPath, l_sParameters);
            } // end try
            catch (Exception e) {
                throw new GException(23200245, ThisAssembly, e); // pøi pokusu o spuštìní aktualizace došlo k neoèekávané výjimce
            } // end catch
        } // end method

        /// <summary>analýza kódovaného parametru standardní pøíkazové øádky GINIS aplikací</summary>
        /// <returns>pole obsažených parametrù v pøípadì úspìšného dekódování, jinak null</returns>
        public string[] ParseCommandLineParameter() {
            string[] l_asParameters = null;
            try {
                l_asParameters = Environment.GetCommandLineArgs();
                if (l_asParameters != null && l_asParameters.Length > 1) l_asParameters = Uncover(l_asParameters[1]).Split('#'); // dekódování prvního parametru
                else l_asParameters = null;
            } // end try
#if DEBUG || DEVELOP_VERSION
            catch (Exception e) {
                if (e is GException == false) e = new GException(23200434, ThisAssembly, e); // selhal pokus o dekódování parametrù z pøíkazové øádky
                throw e;
            } // end catch
#else
                catch {
                    l_asParameters = null;
                } // end catch
#endif
            return l_asParameters;
        } // end if

        #endregion

        #region veøejné statické metody

        /// <summary>kontrola validity IÈ</summary>
        /// <param name="ico">IÈ ke kontrole</param>
        public static void CheckIco(string ico) {
            int l_nResult = GValidation.CheckICO8(ico);
            if (l_nResult != 0) throw new GException(23200455, 23230165, ThisAssembly, GValidation.GetErrorDescription(l_nResult)); // {0}
        } // end if

        /// <summary>kontrola validity specifického symbolu</summary>
        /// <param name="bu">bankovní úèet</param>
        /// <param name="ss">specifický symbol</param>
        public static void CheckSpecialSymbol(string bu, string ss) {
            int l_nResult = GValidation.CheckSpecialSymbol(bu, ss);
            if (l_nResult != 0) throw new GException(23200456, 23230165, ThisAssembly, GValidation.GetErrorDescription(l_nResult)); // {0}
        } // end if

        /// <summary>kontrola validity èísla bankovního úètu</summary>
        /// <param name="bu">bankovní úèet</param>
        /// <param name="predcisli">pøedèíslí</param>
        /// <param name="cisloUctu">èíslo úètu</param>
        public static void CheckAccountNumber(string bu, out string predcisli, out string cisloUctu) {
            int l_nResult = GValidation.CheckAccountNumber(bu, out predcisli, out cisloUctu);
            if (l_nResult != 0) throw new GException(23200457, 23230165, ThisAssembly, GValidation.GetErrorDescription(l_nResult)); // {0}
        } // end if

        /// <summary>doplnìní zpìtných lomítek pøed speciální znaky v textu</summary>
        /// <param name="text">vstupní text</param>
        /// <returns>výstupní text</returns>
        public static string MleStr(string text) {
            if (text == null) throw new GArgumentNullException(23200468);
            text = text.Replace("\\", "\\\\");
            text = text.Replace(Environment.NewLine, "\\n");
            text = text.Replace("\n", "\\n");
            text = text.Replace("\r", "\\r");
            return text.Replace("\t", "\\t");
        } // end method

        /// <summary>odstranìní zpìtných lomítek u speciálních znakù v textu</summary>
        /// <param name="text">vstupní text</param>
        /// <returns>výstupní text</returns>
        public static string StrMle(string text) {
            if (text == null) throw new GArgumentNullException(23200469);
            text = text.Replace("\\n", Environment.NewLine);
            text = text.Replace("\\r", "\r");
            text = text.Replace("\\t", "\t");
            return text.Replace("\\\\", "\\");
        } // end method

        /// <summary>výpis textu na standardní výstup</summary>
        /// <param name="text">vstupní text</param>
        public static void WriteToStandardOutput(string text) {
            if (text == null) throw new GArgumentNullException(23200470);
            Console.WriteLine(text);
        } // end method

        /// <summary>nastavení hodnoty klíèe v systémovém registru</summary>
        /// <param name="baseKey">kód klíèe nejvyšší úrovnì systémového registru</param>
        /// <param name="path">cesta ke klíèi</param>
        /// <param name="key">název klíèe</param>
        /// <param name="value">hodnota klíèe</param>
        public static void SetRegistryValue(int baseKey, string path, string key, string value) {
            try {
                if (path == null) throw new GArgumentNullException(23200480, "path");
                if (value == null) throw new GArgumentNullException(23200481, "value");
                using (RegistryKey l_oBaseKey = RegistryKey.OpenBaseKey(GetRegistryHive(baseKey), RegistryView.Default)) {
                    using (RegistryKey l_oKey = l_oBaseKey.CreateSubKey(path)) {
                        if (l_oKey != null) l_oKey.SetValue(key, value);
                        else throw new GException(23200471, ThisAssembly, path); // klíè systémového registru {0} nelze otevøít pro zápis
                    } // end using
                } // end using
            } // end try
            catch (Exception e) {
                if (e is GException == false) e = new GException(23200472, ThisAssembly, e); // selhal pokus o nastavení hodnoty klíèe v systémovém registru
                throw e;
            } // end catch
        } // end method

        /// <summary>získání hodnoty klíèe ze systémového registru</summary>
        /// <param name="baseKey">kód klíèe nejvyšší úrovnì systémového registru</param>
        /// <param name="path">cesta ke klíèi</param>
        /// <param name="key">název klíèe</param>
        /// <returns>hodnota klíèe</returns>
        public static string GetRegistryValue(int baseKey, string path, string key) {
            try {
                if (path == null) throw new GArgumentNullException(23200482, "path");
                using (RegistryKey l_oBaseKey = RegistryKey.OpenBaseKey(GetRegistryHive(baseKey), RegistryView.Default)) {
                    using (RegistryKey l_oKey = l_oBaseKey.OpenSubKey(path)) {
                        if (l_oKey != null) {
                            object l_oValue = l_oKey.GetValue(key);
                            if (l_oValue != null) return l_oValue.ToString().Trim();
                        } // end if 
                    } // end using
                } // end using
                return String.Empty;
            } // end try
            catch (Exception e) {
                if (e is GException == false) e = new GException(23200473, ThisAssembly, e); // selhal pokus o získání hodnoty klíèe ze systémového registru
                throw e;
            } // end catch
        } // end method

        /// <summary>smazání klíèe ze systémového registru</summary>
        /// <param name="baseKey">kód klíèe nejvyšší úrovnì systémového registru</param>
        /// <param name="path">cesta ke klíèi</param>
        /// <param name="key">název klíèe</param>
        public static void DeleteRegistryKey(int baseKey, string path, string key) {
            try {
                if (path == null) throw new GArgumentNullException(23200483, "path");
                using (RegistryKey l_oBaseKey = RegistryKey.OpenBaseKey(GetRegistryHive(baseKey), RegistryView.Default)) {
                    using (RegistryKey l_oKey = l_oBaseKey.OpenSubKey(path, true)) {
                        if (l_oKey != null) {
                            bool l_bDeleteKey = false;
                            if (String.IsNullOrWhiteSpace(key) == false) {
                                using (RegistryKey l_oDeleteKey = l_oKey.OpenSubKey(key)) {
                                    l_bDeleteKey = l_oDeleteKey != null;
                                } // end using
                            } // end if
                            if (l_bDeleteKey) l_oKey.DeleteSubKey(key, true);
                            else l_oKey.DeleteValue(key, true);
                        } else throw new GException(23200485, 23200471, ThisAssembly, path); // klíè systémového registru {0} nelze otevøít pro zápis
                    } // end using
                } // end using
            } // end try
            catch (Exception e) {
                if (e is GException == false) e = new GException(23200474, ThisAssembly, e); // selhal pokus o smazání klíèe v systémovém registru
                throw e;
            } // end catch
        } // end method

        /// <summary>získání programu asociovaného s pøíponu souboru</summary>
        /// <param name="extension">pøípona souboru</param>
        /// <returns>cesta k asociovanému programu</returns>
        public static string GetExtensionCommand(string extension) {
            try {
                uint l_nSize = 0;
                if (extension == null || (extension = extension.Trim()) == String.Empty) throw new GArgumentNullException(23200477, "extension");
                if (extension.StartsWith(".") == false) extension = "." + extension;
                AssocQueryString(AssocF.Verify, AssocStr.Executable, extension, null, null, ref l_nSize);
                if (l_nSize == 0) return String.Empty;
                // získání cesty k asociovanému programu
                StringBuilder l_oStringBuilder = new StringBuilder((int)l_nSize);
                AssocQueryString(AssocF.Verify, AssocStr.Executable, extension, null, l_oStringBuilder, ref l_nSize);
                // návrat výsledku
                return l_oStringBuilder.ToString();
            } // end try
            catch (Exception e) {
                if (e is GException == false) e = new GException(23200486, ThisAssembly, e); // selhal pokus o získání získání programu asociovaného s pøíponu souboru
                throw e;
            } // end catch
        } // end method

        //[Obsolete("Test použití", true)]

        /// <summary>nastavení konfigurace Informix klienta v systémovém registru</summary>
        /// <param name="profile">název databázového profilu</param>
        /// <param name="checkSqlini">pøíznak kontroly nastavení v sql.ini</param>

        public static void SetInformixRegistryConfiguration(string profile,bool checkSqlini) {
            try {
                // kontrola parametrù
                if(profile == null || (profile = profile.Trim()) == String.Empty) throw new GArgumentNullException(23200475,"profile");
                // získání nastavení databázového profilu
                string l_sHost = String.Empty;
                string l_sServer = String.Empty;
                string l_sDatabase = String.Empty;
                string l_sService = String.Empty;
                ObtainProfileSettings(profile,out l_sHost,out l_sServer,out l_sDatabase,out l_sService);
                
                // kontrola nastavení v sql.ini
                if(checkSqlini) 
                    CheckSqlini(profile,l_sHost,l_sServer,l_sDatabase,l_sService);
                
                // záloha pùvodního nastavení informix klienta
                CopyRegistryKey(@"HKCU\Software\Informix\Netrc",@"HKCU\Software\Gordic\Netrc_batch");
                CopyRegistryKey(@"HKCU\Software\Informix\Environment",@"HKCU\Software\Gordic\Environment_batch");
                CopyRegistryKey(NormalizeRegistryHklmPath(@"HKLM\Software\Informix\SqlHosts\" + l_sServer),
                                NormalizeRegistryHklmPath(@"HKLM\Software\Gordic\SqlHosts\" + l_sServer + "_batch"));
                
                // smazání klíèù gordic
                DeleteRegistryKey(@"HKCU\Software\Gordic\Netrc");
                DeleteRegistryKey(@"HKCU\Software\Gordic\Environment");
                DeleteRegistryKey(NormalizeRegistryHklmPath(@"HKLM\Software\Gordic\SqlHosts\" + l_sServer));
                
                // nastavení klíèù gordic
                PrepareInformixRegistryConfiguration(profile,l_sHost,l_sServer,l_sDatabase,l_sService);
                
                // nastavení klíèù pro informix klienta
                CopyRegistryKey(@"HKCU\Software\Gordic\Netrc",
                                @"HKCU\Software\Informix\Netrc");

                CopyRegistryKey(@"HKCU\Software\Gordic\Environment",
                                @"HKCU\Software\Informix\Environment");

                CopyRegistryKey(NormalizeRegistryHklmPath(@"HKLM\Software\Gordic\SqlHosts\" + l_sServer),
                                NormalizeRegistryHklmPath(@"HKLM\Software\Informix\SqlHosts\" + l_sServer));

            } // end try
            catch(Exception e) {
                throw new GException(23200487,ThisAssembly,e); // selhal pokus o nastavení konfigurace Informix klienta v systémovém registru
            } // end catch
        } // end method

        /// <summary>obnovení pùvodní konfigurace Informix klienta v systémovém registru</summary>
        /// <param name="profile">název databázového profilu</param>
        public static void RestoreInformixRegistryConfiguration(string profile) {
            try {
                // kontrola parametrù
                if(profile == null || (profile = profile.Trim()) == String.Empty) throw new GArgumentNullException(23200476,"profile");
                // získání nastavení databázového profilu
                string l_sHost = String.Empty;
                string l_sServer = String.Empty;
                string l_sDatabase = String.Empty;
                string l_sService = String.Empty;
                ObtainProfileSettings(profile,out l_sHost,out l_sServer,out l_sDatabase,out l_sService);
                // nakopírování klíèù ze zálohy gordic
                CopyRegistryKey(@"HKCU\Software\Gordic\Netrc_batch",
                                @"HKCU\Software\Informix\Netrc");
                CopyRegistryKey(@"HKCU\Software\Gordic\Environment_batch",
                                @"HKCU\Software\Informix\Environment");
                CopyRegistryKey(
                    NormalizeRegistryHklmPath(@"HKLM\Software\Gordic\SqlHosts\" + l_sServer + "_batch"),
                    NormalizeRegistryHklmPath(@"HKLM\Software\Informix\SqlHosts\" + l_sServer)
                );
            } // end try
            catch(Exception e) {
                throw new GException(23200488,ThisAssembly,e); // selhal pokus o obnovení pùvodní konfigurace Informix klienta v systémovém registru
            } // end catch
        } // end method

        /// <summary>získání pøíznaku spuštìní jiné instance stejné aplikace</summary>
        /// <param name="activate">pøíznak pøenesení jiné instance aplikace do popøedí</param>
        /// <returns>true v pøípadì, že je již spuštìna jiná instance aplikace, jinak false</returns>
        public static bool AnotherApplicationRuns(bool activate) {
            try {
                // získání seznamu aktuálnì bìžících instancí aplikace
                Process[] l_aoProcesses = Process.GetProcessesByName(
                    Path.GetFileNameWithoutExtension(
                        Assembly.GetEntryAssembly().Location
                    )
                );
                // pøenesení aplikace do popøedí
                if(l_aoProcesses.Length > 1 && activate) {
                    foreach(Process l_oProcess in l_aoProcesses) {
                        if(l_oProcess.Id != Process.GetCurrentProcess().Id) {
                            if(l_oProcess.MainWindowHandle != IntPtr.Zero) SetForegroundWindow(l_oProcess.MainWindowHandle);
                        } // end if
                    } // end foreach
                } // end if
                // návrat výsledku
                return l_aoProcesses.Length > 1;
            } // end try
            catch(Exception e) {
                throw new GException(23200514,ThisAssembly,e); // nepodaøilo se získat pøíznak spuštìní jiné instance aktuální aplikace
            } // end catch
        } // end method

        /// <summary>získání èasu neaktivity uživatele</summary>
        /// <returns>èasu neaktivity uživatele v sekundách</returns>
        public static int GetIdleTime() {
            try {
                LastInputInfo l_oLastInput = new LastInputInfo();
                l_oLastInput.Size = (uint) Marshal.SizeOf(l_oLastInput);
                l_oLastInput.Time = 0;
                return GetLastInputInfo(ref l_oLastInput) ? (Environment.TickCount - l_oLastInput.Time) / 1000 : 0;
            } // end try
            catch(Exception e) {
                throw new GException(23200540,ThisAssembly,e); // selhal pokus o získání èasu neaktivity uživatele
            } // end catch
        } // end method

        #endregion

        #region metody pro kódování a dekódovaní krátkých øetìzcù

        /// <summary>zakódování øetìzce</summary>
        /// <param name="l_sInput">vstupní øetìzec (max. 25 znakù)</param>
        /// <returns>kódovaný tvar vstupního øetìzce</returns>
        public string F15(string l_sInput)
        {
            return (StaticF15(l_sInput));
        }

        /// <summary>zakódování øetìzce</summary>
        /// <param name="l_sInput">vstupní øetìzec (max. 25 znakù)</param>
        /// <returns>kódovaný tvar vstupního øetìzce</returns>
        public static string StaticF15(string l_sInput) {
            int i = 0;
            int j = 0;
            int k = 0;
            int l = 0;
            char l_cCharacter = ' ';
            StringBuilder l_oStringBuilder = null;
            int[] l_aTable1 = new int[255] {
                                            134,181,228,18,65,112,159,206,253,43,90,137,184,231,21,68,
                                            115,162,209,87,46,93,140,187,234,24,71,118,165,212,2,49,
                                            96,143,190,237,27,74,121,168,215,5,52,99,146,193,240,30,
                                            77,124,171,218,8,55,102,149,196,243,33,80,127,174,221,11,
                                            58,105,152,199,246,36,83,130,177,224,14,61,108,155,202,249,
                                            39,86,133,180,227,17,64,111,158,205,252,42,89,136,183,230,
                                            20,67,114,161,208,255,45,92,139,186,233,23,70,117,164,211,
                                            1,48,95,142,189,236,26,73,120,167,214,4,51,98,145,192,
                                            239,29,76,123,170,217,7,54,101,148,195,242,32,79,126,173,
                                            220,10,57,104,151,198,245,35,82,129,176,223,13,60,107,154,
                                            201,248,38,85,132,179,226,16,63,110,157,204,251,41,88,135,
                                            182,229,19,66,113,160,207,254,44,91,138,185,232,22,69,116,
                                            163,210,47,94,141,188,235,25,72,119,166,213,3,50,97,
                                            144,191,238,28,75,122,169,216,6,53,100,147,194,241,31,78,
                                            125,172,219,9,56,103,150,197,244,34,81,128,175,222,12,59,
                                            106,153,200,247,37,84,131,178,225,15,62,109,156,203,250,40
                                            }; // end array
            int[] l_aTable2 = new int[25]  { 239,29,76,46,93,140,187,9,56,103,138,185,232,22,1,48,95,87,234,24,155,202,249,71,218 };
            try {
                // délka vstupního øetìzce
                if((k=l_sInput.Length) == 0) return String.Empty;
                if(k > 25) throw new GException(23200246,ThisAssembly); // kódování je podporováno pro øetìzce s délkou maximálnì 25 znakù
                // ciferný souèet jednotlivých znakù
                for(i=0;i<k;i++) {
                    l_cCharacter = ConvertCharF15(l_sInput[i]);
                    do {
                        l += l_cCharacter%10;
                        l_cCharacter = Convert.ToChar((l_cCharacter-l_cCharacter%10)/10);
                    } while(l_cCharacter != 0); // end while
                } // end for
                l = (l%16)+1; // poèet opakování 
                // zakódovaní
                l_oStringBuilder = new StringBuilder();
                for(i=0;i<l;i++) {
                    l_oStringBuilder.Length=0;
                    for(j=0;j<k;j++) {
                        l_cCharacter = i == 0 ? ConvertCharF15(l_sInput[j]) : Convert.ToChar(l_sInput[j]);
                        l_oStringBuilder.Append(Convert.ToChar(((l_aTable1[l_cCharacter - 1] + l_aTable2[j]) % 255) + 1));
                    } // end for
                    l_sInput = l_oStringBuilder.ToString();
                } // end for
                // pøevod znakù 
                l_oStringBuilder.Length=0;
                for(i=0;i<k;i++) {
                    l_cCharacter = l_sInput[i];
                    l_oStringBuilder.Append( Convert.ToChar(((l_cCharacter-l_cCharacter%16)/16)+97));
                    l_oStringBuilder.Append( Convert.ToChar(l_cCharacter%16+97));
                } // end for 
                l_oStringBuilder.Append(Convert.ToChar(l+97-1)); // pøipojení poètu opakování zmenšený o 1
                return l_oStringBuilder.ToString();
            } // end try
            catch(Exception e) {
                if(e.GetType() != typeof(GException)) e = new GException(23200247,ThisAssembly); // selhalo kódování vstupního øetìzce, øetìzec má pravdìpodobnì nesprávný formát
                throw e;
            } // end catch
        } // end function

        /// <summary> dekódování øetìzce </summary>
        /// <param name="l_sInput"> kódovaný vstupní øetìzec (max. 51 znakù) </param>
        /// <returns> dekódovaný øetìzec </returns>
        public string F51(string l_sInput)
        {
            return (StaticF51(l_sInput));
        }

        /// <summary> dekódování øetìzce </summary>
        /// <param name="l_sInput"> kódovaný vstupní øetìzec (max. 51 znakù) </param>
        /// <returns> dekódovaný øetìzec </returns>
        public static string StaticF51(string l_sInput) {
            int i = 0;
            int j = 0;
            int k = 0;
            int l = 0;
            int l_nCharacter = 0;
            char l_cCharacter = ' ';
            StringBuilder l_oStringBuilder = null;
            int[] l_aTable1 = new int[255] {
                                            113,31,205,124,42,216,135,53,227,146,64,238,157,75,249,
                                            168,86,4,179,97,15,190,108,26,200,119,37,211,130,48,222,
                                            141,59,233,152,70,244,163,81,255,174,92,10,185,103,21,195,
                                            114,32,206,125,43,217,136,54,228,147,65,239,158,76,250,169,
                                            87,5,180,98,16,191,109,27,201,120,38,212,131,49,223,142,
                                            60,234,153,71,245,164,82,20,175,93,11,186,104,22,196,115,
                                            33,207,126,44,218,137,55,229,148,66,240,159,77,251,170,88,
                                            6,181,99,17,192,110,28,202,121,39,213,132,50,224,143,61,
                                            235,154,72,246,165,83,1,176,94,12,187,105,23,197,116,34,
                                            208,127,45,219,138,56,230,149,67,241,160,78,252,171,89,7,
                                            182,100,18,193,111,29,203,122,40,214,133,51,225,144,62,236,
                                            155,73,247,166,84,2,177,95,13,188,106,24,198,117,35,209,
                                            128,46,220,139,57,231,150,68,242,161,79,253,172,90,8,183,
                                            101,19,194,112,30,204,123,41,215,134,52,226,145,63,237,156,
                                            74,248,167,85,3,178,96,14,189,107,25,199,118,36,210,129,
                                            47,221,140,58,232,151,69,243,162,80,254,173,91,9,184,102
                                            }; // end array
            int[] l_aTable2 = new int[25] {239,29,76,46,93,140,187,9,56,103,138,185,232,22,1,48,95,87,234,24,155,202,249,71,218 };
            try {
                // oddìlení poètu opakování 
                if(l_sInput==null || (l_sInput=l_sInput.Trim())==String.Empty) return String.Empty;
                if((k=l_sInput.Length) > 51) throw new GException(23200248,ThisAssembly); // dekódování je podporováno pro øetìzce s délkou maximálnì 51 znakù
                l = l_sInput[--k] - 96;
                k /= 2;
                // pøevod znakù
                l_oStringBuilder = new StringBuilder();
                for(i=0;i<k;i++) {
                    l_cCharacter = Convert.ToChar(16*(l_sInput[2*i]-97)+(l_sInput[2*i+1]-97));
                    l_oStringBuilder.Append(l_cCharacter);
                } // end for
                // dekódování
                for(j=0;j<l;j++) {
                    l_sInput = l_oStringBuilder.ToString();
                    l_oStringBuilder.Length = 0;
                    for(i=0;i<l_sInput.Length;i++) {
                        l_cCharacter = Convert.ToChar(l_sInput[i]-1); 
                        if((k=l_cCharacter-l_aTable2[i]) <= 0) k += 255;
                        l_nCharacter = l_aTable1[k - 1];
                        l_oStringBuilder.Append((j + 1)==l ? ConvertCharF51(l_nCharacter) : Convert.ToChar(l_nCharacter));
                    } // end for
                } // end for
                return l_oStringBuilder.ToString();  
            } // end try
            catch(Exception e) {
                if(e.GetType() != typeof(GException)) e = new GException(23200249,ThisAssembly); // selhalo dekódování vstupního øetìzce, øetìzec má pravdìpodobnì nesprávný formát
                throw e;
            } // end catch
        } // end function

        #endregion

        #region metody pro kódování a dekódování dlouhých øetìzcù
        /// <summary>zakódování øetìzce bez omezení délky</summary>
        /// <param name="source">zdrojový øetìzec</param>
        /// <returns>zakódovaný øetìzec</returns>
        public string Cover(string source)
        {
            return ToGinisCoverString(source);
        }

        /// <summary>zakódování øetìzce bez omezení délky</summary>
        /// <param name="source">zdrojový øetìzec</param>
        /// <returns>zakódovaný øetìzec</returns>
        public static string ToGinisCoverString(string source) {
            StringBuilder f_oDestination = new StringBuilder();
            if(source != null) {
                for(int i=0;i<source.Length;i+=25) {
                    if((source.Length - i) < 25) f_oDestination.Append(StaticF15(source.Substring(i)));
                    else f_oDestination.Append(StaticF15(source.Substring(i,25)));
                } // end for
            } // end if
            return f_oDestination.ToString();
        } // end method

        /// <summary>dekódování øetìzce bez omezení délky</summary>
        /// <param name="source">zdrojový øetìzec</param>
        /// <returns>dekódovaný øetìzec</returns>
        public string Uncover(string source)
        {
            return FromGinisCoverString(source);
        }

        /// <summary>dekódování øetìzce bez omezení délky</summary>
        /// <param name="source">zdrojový øetìzec</param>
        /// <returns>dekódovaný øetìzec</returns>
        public static string FromGinisCoverString(string source) {
            StringBuilder f_oDestination = new StringBuilder();
            if(source != null) {
                for(int i=0;i<source.Length;i+=51) {
                    if((source.Length - i) < 51) f_oDestination.Append(StaticF51(source.Substring(i)));
                    else f_oDestination.Append(StaticF51(source.Substring(i,51)));
                } // end for
            } // end if
            return f_oDestination.ToString();
        } // end if

        #endregion

        #region soukromé metody

        /// <summary>konverze znaku pro úèely kódování øetìzce pomocí F15</summary>
        /// <param name="inputChar">vstupní znak</param>
        /// <returns>výstupní znak</returns>
        public static char ConvertCharF15(char inputChar) {
            if(inputChar < 255) return inputChar;
            return Convert.ToChar((Encoding.Default.GetBytes(new string(inputChar,1)))[0]);
        } // end method

        /// <summary>konverze znaku pro úèely dekódování øetìzce pomocí F51</summary>
        /// <param name="inputChar">vstupní znak</param>
        /// <returns>výstupní znak</returns>
        public static char ConvertCharF51(int inputChar) {
            if(inputChar < 128) return Convert.ToChar(inputChar);
            else {
                byte [] l_abyInputChar = new byte[1];
                l_abyInputChar[0] = (byte)inputChar;
                return (Encoding.Default.GetString(l_abyInputChar).ToCharArray())[0];
            } // end if
        } // end method

        /// <summary>získání klíèe nejvyšší úrovnì systémového registru</summary>
        /// <param name="key">kód klíèe nejvyšší úrovnì systémového registru</param>
        /// <returns>klíè nejvyšší úrovnì systémového registru</returns>
        private static RegistryHive GetRegistryHive(int key) {
            try {
                return (RegistryHive) key;
            } // end try
            catch(Exception) {
                throw new GException(23200479,ThisAssembly,key); // hodnota {0} neodpovídá žádnému kódu klíèe nejvyšší úrovnì systémového registru
            } // end catch
        } // end method

        /// <summary>získání nastavení databázového profilu</summary>
        /// <param name="profile">název databázového profilu</param>
        /// <param name="host">název poèítaèe s databázovým serverem</param>
        /// <param name="server">název databázového serveru</param>
        /// <param name="database">název databáze</param>
        /// <param name="service">název databázové služby</param>
        private static void ObtainProfileSettings(string profile,out string host,out string server,out string database,out string service) {
            try {
                // inicializace návratových hodnot
                host = String.Empty;
                server = String.Empty;
                database = String.Empty;
                service = String.Empty;
                // získání hodnot z registru
                string l_sValue = String.Empty;
                using(RegistryKey l_oKey = Registry.LocalMachine.OpenSubKey(NormalizeRegistryHklmPath(@"Software\Gordic\Ginis\Shared\Set_" + profile))) {
                    if(l_oKey != null) {
                        object l_oValue = null;
                        if((l_oValue = l_oKey.GetValue("Database")) != null) database = l_oValue.ToString().Trim();
                        if((l_oValue = l_oKey.GetValue("ServerName32")) != null) l_sValue = l_oValue.ToString().Trim();
                        if((l_oValue = l_oKey.GetValue("Service")) != null) service = l_oValue.ToString().Trim();
                    } // end if 
                } // end using
                // nastavení výstupních hodnot
                int l_nPosition = l_sValue.IndexOf('@');
                if(l_nPosition > 0 && l_nPosition < l_sValue.Length) {
                    host = l_sValue.Substring(0,l_nPosition).Trim();
                    server = l_sValue.Substring(l_nPosition + 1).Trim();
                } // end if
                if(service == String.Empty) service = "sqlexec";
            } // end try
            catch(Exception e) {
                throw new GException(23200489,ThisAssembly,e); // selhal pokus o získání nastavení databázového profilu
            } // end catch 
            if(host == String.Empty || server == String.Empty || database == String.Empty) throw new GException(23200490,ThisAssembly,profile); // v systémovém registru nebyl nalezen nìkterý z údajù vyžadovaný pro databázový profil {0}
        } // end method

        /// <summary>pøíprava konfigurace Informix klienta v systémovém registru</summary>
        /// <param name="profile">název databázového profilu</param>
        /// <param name="host">název poèítaèe s databázovým serverem</param>
        /// <param name="server">název databázového serveru</param>
        /// <param name="database">název databáze</param>
        /// <param name="service">název databázové služby</param>
        private static void PrepareInformixRegistryConfiguration(string profile,string host,string server,string database,string service) {
            try {
                // zápis do HKCU\Software\Gordic\Netrc
                using(RegistryKey l_oDestinationKey = Registry.CurrentUser.CreateSubKey(@"Software\Gordic\Netrc")) {
                    SetRegistryValue(null,null,l_oDestinationKey,"PROTOCOLLIST","olsoctcp;onsoctcp;olsocspx;onsocspx;sesoctcp;sesocspx;seipcip;olipcnmp;onipcnmp;group;");
                } // end using
                // zápis do HKCU\Software\Gordic\Environment
                using(RegistryKey l_oDestinationKey = Registry.CurrentUser.CreateSubKey(@"Software\Gordic\Environment")) {
                    SetRegistryValue(null,null,l_oDestinationKey,"INFORMIXSERVER",server);
                    using(RegistryKey l_oSourceKey = Registry.LocalMachine.OpenSubKey(NormalizeRegistryHklmPath(@"Software\Gordic\Ginis\Shared\Set_" + profile))) {
                        SetRegistryValue(l_oSourceKey,"DbDate32",l_oDestinationKey,"DBDATE","Y4MD-");
                        SetRegistryValue(l_oSourceKey,"DbMoney32",l_oDestinationKey,"DBMONEY",".");
                        SetRegistryValue(l_oSourceKey,"CollChar32",l_oDestinationKey,"COLLCHAR",String.Empty);
                        SetRegistryValue(l_oSourceKey,"Client_Locale32",l_oDestinationKey,"CLIENT_LOCALE","cs_cz.CP1250");
                        SetRegistryValue(l_oSourceKey,"Db_Locale32",l_oDestinationKey,"DB_LOCALE","cs_cz.CP1250");
                        SetRegistryValue(l_oSourceKey,"DbAnsiWarn32",l_oDestinationKey,"DBANSIWARN","n");
                        SetRegistryValue(l_oSourceKey,"Delimident32",l_oDestinationKey,"DELIMIDENT","n");
                    } // end using

                    using(RegistryKey l_oSourceKey = Registry.LocalMachine.OpenSubKey(NormalizeRegistryHklmPath(@"Software\Gordic\Ginis\Shared\INSTALL32"))) {
                        SetRegistryValue(l_oSourceKey,"INFADR",l_oDestinationKey,"INFORMIXDIR",@"C:\Inf32\");
                    } // end using

                } // end using
                // zápis do HKLM\Software\Gordic\SqlHosts
                using(RegistryKey l_oDestinationKey = Registry.LocalMachine.CreateSubKey(NormalizeRegistryHklmPath(@"Software\Gordic\SqlHosts\" + server))) {
                    SetRegistryValue(null,null,l_oDestinationKey,"HOST",host);
                    SetRegistryValue(null,null,l_oDestinationKey,"SERVICE",service);
                    using(RegistryKey l_oSourceKey = Registry.LocalMachine.OpenSubKey(NormalizeRegistryHklmPath(@"Software\Gordic\Ginis\Shared\Set_" + profile))) {
                        SetRegistryValue(l_oSourceKey,"PROTOCOL32",l_oDestinationKey,"PROTOCOL","olsoctcp");
                    } // end using
                } // end using
            } // end try
            catch(Exception e) {
                throw new GException(23200491,ThisAssembly,e); // selhal pokus o pøípravu konfigurace Informix klienta v systémovém registru
            } // end catch
        } // end method

        /// <summary>úprava cesty systémového registru v závislosti na použité architektuøe</summary>
        /// <param name="path">cesta v systémovém registru</param>
        /// <returns>upravená cesta v systémovém registru</returns>
        private static string NormalizeRegistryHklmPath(string path) {
            if(path != null && GCommon.Is64Bit && path.Contains(@"Software\",StringComparison.OrdinalIgnoreCase)) return path.Replace(@"Software\",@"Software\Wow6432Node\");
            else return path;
        } // end method

        /// <summary>získání koøenového klíèe systémového registru</summary>
        /// <param name="path">cesta v systémovém registru</param>
        /// <returns>koøenový klíè systémového registru</returns>
        private static RegistryKey GetRegistryBaseKey(string path) {
            if(path != null) {
                if(path.StartsWith(@"HKLM\",StringComparison.OrdinalIgnoreCase)) return Registry.LocalMachine;
                else if(path.StartsWith(@"HKCU\",StringComparison.OrdinalIgnoreCase)) return Registry.CurrentUser;
            } // end if
            return null;
        } // end method

        /// <summary>kopírování klíèe v systémovém registru vèetnì vnoøených klíèù a položek</summary>
        /// <param name="sourcePath">zdrojová cesta v systémovém registru</param>
        /// <param name="destinationPath">cílová cesta v systémovém registru</param>
        private static void CopyRegistryKey(string sourcePath,string destinationPath) {
            try {
                RegistryKey l_oSourceBaseKey = GetRegistryBaseKey(sourcePath);
                RegistryKey l_oDestinationBaseKey = GetRegistryBaseKey(destinationPath);
                if(l_oSourceBaseKey != null && l_oDestinationBaseKey != null) {
                    using(RegistryKey l_oSourceKey = l_oSourceBaseKey.OpenSubKey(sourcePath.Substring(5))) {
                        using(RegistryKey l_oDestinationKey = l_oDestinationBaseKey.CreateSubKey(destinationPath.Substring(5))) {
                            CopyRegistryKey(l_oSourceKey,l_oDestinationKey);
                        } // end using
                    } // end using
                } // end if
            } // end try
            catch(Exception e) {
                if(e is GException == false) e = new GException(23200492,ThisAssembly,e); // selhal pokus o kopírování klíèe v systémovém registru
                throw e;
            } // end catch
        } // end method

        /// <summary>kopírování klíèe v systémovém registru vèetnì vnoøených klíèù a položek</summary>
        /// <param name="sourceKey">zdrojový klíè systémového registru</param>
        /// <param name="destinationKey">cílový klíè systémového registru</param>
        private static void CopyRegistryKey(RegistryKey sourceKey,RegistryKey destinationKey) {
            try {
                if(sourceKey != null && destinationKey != null) {
                    // kopie hodnot
                    foreach(string l_sValueName in sourceKey.GetValueNames()) {
                        destinationKey.SetValue(l_sValueName,sourceKey.GetValue(l_sValueName),sourceKey.GetValueKind(l_sValueName));
                    } // end foreach
                    // kopie vnoøených klíèù
                    foreach(string l_sSubKeyName in sourceKey.GetSubKeyNames()) {
                        using(RegistryKey l_oSourceSubKey = sourceKey.OpenSubKey(l_sSubKeyName,false)) {
                            var l_oDestinationSubKey = destinationKey.CreateSubKey(l_sSubKeyName);
                            CopyRegistryKey(l_oSourceSubKey,l_oDestinationSubKey);
                        } // end using
                    } // end foreach
                } // end using
            } // end try
            catch(Exception e) {
                if(e is GException == false) e = new GException(23200493,23200492,ThisAssembly,e); // selhal pokus o kopírování klíèe v systémovém registru
                throw e;
            } // end catch
        } // end method

        /// <summary>smazání klíèe v systémovém registru</summary>
        /// <param name="path">cesta v systémovém registru</param>
        private static void DeleteRegistryKey(string path) {
            try {
                RegistryKey l_oBaseKey = GetRegistryBaseKey(path);
                if(l_oBaseKey != null) l_oBaseKey.DeleteSubKeyTree(path.Substring(5),false);
            } // end try
            catch(Exception e) {
                throw new GException(23200494,23200474,ThisAssembly,e); // selhal pokus o smazání klíèe v systémovém registru
            } // end catch
        } // end method

        /// <summary>nastavení hodnoty klíèe v systémovém registru</summary>
        /// <param name="sourceKey">zdrojový klíè systémového registru</param>
        /// <param name="sourceName">název zdrojové položky</param>
        /// <param name="destinationKey">cílový klíè systémového registru</param>
        /// <param name="destinationName">název cílové položky</param>
        /// <param name="defaultValue">výchozí hodnota položky</param>
        private static void SetRegistryValue(RegistryKey sourceKey,string sourceName,RegistryKey destinationKey,string destinationName,string defaultValue) {
            try {
                if(destinationKey != null) {
                    object l_oValue = null;
                    if(sourceKey != null) l_oValue = sourceKey.GetValue(sourceName);
                    destinationKey.SetValue(destinationName,l_oValue == null ? defaultValue : l_oValue.ToString());
                } // end if
            } // end try
            catch(Exception e) {
                throw new GException(23200495,23200472,ThisAssembly,e); // selhal pokus o nastavení hodnoty klíèe v systémovém registru
            } // end catch
        } // end method

        /// <summary>kontrola nastavení Informix klienta v sql.ini</summary>
        /// <param name="profile">název databázového profilu</param>
        /// <param name="host">název poèítaèe s databázovým serverem</param>
        /// <param name="server">název databázového serveru</param>
        /// <param name="database">název databáze</param>
        /// <param name="service">název databázové služby</param>
        private static void CheckSqlini(string profile,string host,string server,string database,string service) {
            try {
                // nalezení sql.ini
                string l_sFile = Path.Combine(GApplicationInfo.GetApplicationExePath(),"sql.ini");
                if(File.Exists(l_sFile) == false) l_sFile = Path.Combine(Path.Combine(GApplicationInfo.GetInstallPath(),"DEP"),"sql.ini");
                if(File.Exists(l_sFile) == false) throw new GException(23200496,ThisAssembly); // nenalezen soubor sql.ini
                // nalezení pøíslušného záznamu remotedbname v sekci infogtwy
                string l_sValue = String.Empty;
                bool l_bSearchProfile = false;
                string l_sLineText = String.Empty;
                string[] l_asLineTextParts = null;
                using(StreamReader l_oStreamReader = new StreamReader(l_sFile)) {
                    // ètení souboru po øádcích
                    while((l_sLineText = l_oStreamReader.ReadLine()) != null) {
                        l_sLineText = l_sLineText.Trim();
                        if(l_sLineText.Length > 1) {
                            if(l_bSearchProfile) {
                                // hledání pøíslušného záznamu remotedbname
                                if(l_sLineText[0] == '[' && l_sLineText[l_sLineText.Length - 1] == ']') break; // dosaženo další sekce
                                if(l_sLineText.StartsWith("remotedbname",StringComparison.OrdinalIgnoreCase)) {
                                    l_asLineTextParts = l_sLineText.Split(new char[] { '=',',',' ','\t' },StringSplitOptions.RemoveEmptyEntries);
                                    if(l_asLineTextParts.Length > 1 && String.Compare(l_asLineTextParts[1].Trim(),profile,true) == 0) break; // hodnota nalezena
                                    else l_asLineTextParts = null;
                                } // end if
                            } else {
                                // hledání sekce
                                if(String.Compare(l_sLineText,"[infogtwy]",true) == 0) l_bSearchProfile = true;
                            } // end if
                        } // end if
                    } // end while
                } // end using
                // kontrola hodnot v nalezeném záznamu remotedbname
                if(l_asLineTextParts != null && l_asLineTextParts.Length > 2) {
                    bool l_bHostFound = false;
                    bool l_bServerFound = false;
                    bool l_bDatabaseFound = false;
                    bool l_bServiceFound = false;
                    for(int i = 2; i < l_asLineTextParts.Length; i++) {
                        if(l_asLineTextParts[i].StartsWith("-h",StringComparison.OrdinalIgnoreCase) && l_asLineTextParts[i].EndsWith(host,StringComparison.OrdinalIgnoreCase)) l_bHostFound = true;
                        else if(l_asLineTextParts[i].StartsWith("-v",StringComparison.OrdinalIgnoreCase) && l_asLineTextParts[i].EndsWith(server,StringComparison.OrdinalIgnoreCase)) l_bServerFound = true;
                        else if(String.Compare(l_asLineTextParts[i],"database",true) == 0 && (i + 1) < l_asLineTextParts.Length && String.Compare(l_asLineTextParts[i + 1],database,true) == 0) l_bDatabaseFound = true;
                        else if(l_asLineTextParts[i].StartsWith("-s",StringComparison.OrdinalIgnoreCase) && l_asLineTextParts[i].EndsWith(service,StringComparison.OrdinalIgnoreCase)) l_bServiceFound = true;
                    } // end for
                    if(l_bHostFound == false || l_bServerFound == false || l_bDatabaseFound == false || l_bServiceFound == false) throw new GException(23200497,ThisAssembly,profile); // detekován rozdíl v nastavení profilu {0} v souboru sql.ini a systémovém registru
                } else throw new GException(23200498,ThisAssembly,profile,database,host,service,server); // v souboru sql.ini nebyl v rámci sekce infogtwy nalezen následující záznam: remotedbname={0},database {1},-h{2} -s{3} -v{4}
            } // end try
            catch(Exception e) {
                if(e is GException == false) e = new GException(23200499,ThisAssembly,e); // selhal pokus o provedení kontroly souboru sql.ini
                throw e;
            } // end catch
        } // end method

        #endregion

        #region vnoøené tøídy

        /// <summary>informace o poslední aktivitì uživatele</summary>
        private struct LastInputInfo {
            
            /// <summary>velikost struktury</summary>
            public uint Size;
            
            /// <summary>èas poslední aktivity v milisekundách</summary>
            public Int32 Time;

        } // end struct

        #endregion

    } // end class

} // end namespace
