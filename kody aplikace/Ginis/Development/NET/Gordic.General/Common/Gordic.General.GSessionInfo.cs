//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//      <Name>        Gordic.General.GSessionInfo.cs             </Name>
//      <Description> informace o autorizované relaci            </Description>
//      <Author>      Jan Kuttich                                </Author>
//      <Copyright>   © GORDIC spol. s r. o. 1993 - 2021         </Copyright>
//      <Created>     2004-01-16                                 </Created>
//  </FileHeader>

using System;
using System.Xml;
using System.Reflection;
using System.Diagnostics;

namespace Gordic.General {

    /// <summary>informace o autorizované relaci</summary>
    [Serializable]
    [DebuggerStepThrough]
    public class GSessionInfo : IGSessionInfo, IGObject {
        
        #region soukromé konstanty

        /// <summary>defaultní název pro serializaci</summary>
        private const string m_csSerializationName = "SessionInfo";

        /// <summary>název elementu pro serializaci èísla chyby v autorizaèní proceduøe</summary>
        private const string m_csErrCode = "ErrCode";
        
        /// <summary>název elementu pro serializaci èísla SQL chyby v autorizaèní proceduøe</summary>
        private const string m_csSqlErr = "SqlErr";

        /// <summary>název elementu pro serializaci èísla ISAM chyby v autorizaèní proceduøe</summary>
        private const string m_csIsamErr = "IsamErr";

        /// <summary>název elementu pro serializaci textu databázové chyby v autorizaèní proceduøe</summary>
        private const string m_csErrText = "ErrText";

        /// <summary>název elementu pro serializaci poøadového èísla pøihlášení</summary>
        private const string m_csLogPorCislo = "LogPorCislo";
        
        /// <summary>název elementu pro serializaci id referenta</summary>
        private const string m_csIxsRef = "IxsRef";

        /// <summary>název elementu pro serializaci názvu referenta</summary>
        private const string m_csNazevRef = "NazevRef";

        /// <summary>název elementu pro serializaci zkratky referenta</summary>
        private const string m_csZkratka = "Zkratka";

        /// <summary>název elementu pro serializaci id funkce</summary>
        private const string m_csIxsFun = "IxsFun";

        /// <summary>název elementu pro serializaci názvu funkce</summary>
        private const string m_csNazevFun = "NazevFun";

        /// <summary>název elementu pro serializaci id pùvodce zmìny</summary>
        private const string m_csIxsZmp = "IxsZmp";

        /// <summary>název elementu pro serializaci priority max</summary>
        private const string m_csPrioritaMax = "PrioritaMax";

        /// <summary>název elementu pro serializaci fc</summary>
        private const string m_csFc = "Fc";

        /// <summary>název elementu pro serializaci id organizaèní jednotky</summary>
        private const string m_csIxsOrj = "IxsOrj";

        /// <summary>název elementu pro serializaci názvu organizaèní jednotky</summary>
        private const string m_csNazevOrj = "NazevOrj";

        /// <summary>název elementu pro serializaci kódovaného názvu silného uživatele</summary>
        private const string m_csLdb = "Ldb";

        /// <summary>název elementu pro serializaci kódovaného hesla silného uživatele</summary>
        private const string m_csPdb = "Pdb";

        /// <summary>název elementu pro serializaci id instance</summary>
        private const string m_csIxsIns = "IxsIns";

        /// <summary>název elementu pro serializaci id spisového uzlu</summary>
        private const string m_csIxsSu = "IxsSu";

        /// <summary>název elementu pro serializaci licence databáze</summary>
        private const string m_csLicAdr = "LicAdr";

        /// <summary>název elementu pro serializaci pøíznaku cs</summary>
        private const string m_csCsDb = "CsDb";

        /// <summary>název elementu pro serializaci typu instalace</summary>
        private const string m_csTypInst = "TypInst";

        /// <summary>název elementu pro serializaci pøíznaku archivace</summary>
        private const string m_csPrizArchiv = "PrizArchiv";

        /// <summary>název elementu pro serializaci pøíznaku blobù</summary>
        private const string m_csPrizBlob = "PrizBlob";

        /// <summary>název elementu pro serializaci id isu</summary>
        private const string m_csIxsIsu = "IxsIsu";

        /// <summary>název elementu pro serializaci vzkazu</summary>
        private const string m_csVzkazy = "Vzkazy";

        /// <summary>název elementu pro serializaci datumu aktualizace</summary>
        private const string m_csDatAkt = "DatAkt";

        /// <summary>název elementu pro serializaci verze databáze</summary>
        private const string m_csVerzeDb = "VerzeDb";

        /// <summary>název elementu pro serializaci sub verze databáze</summary>
        private const string m_csSubVerzeDb = "SubVerzeDb";
        
        /// <summary>název elementu pro serializaci názvu rf</summary>
        private const string m_csNazevRf = "NazevRf";

        /// <summary>název elementu pro serializaci projektu</summary>
        private const string m_csProject = "Project";

        /// <summary>název elementu pro serializaci pøíznaku d</summary>
        private const string m_csPrizD = "PrizD";

        /// <summary>název elementu pro serializaci názvu spisového uzlu</summary>
        private const string m_csNazevSu = "NazevSu";

        /// <summary>název elementu pro serializaci zkratky spisového uzlu</summary>
        private const string m_csZkratkaSu = "ZkratkaSu";

        /// <summary>název elementu pro serializaci datumu pøihlášení</summary>
        private const string m_csDatLogin = "DatLogin";
        
        /// <summary>název elementu pro serializaci názvu instance</summary>
        private const string m_csNazevIns = "NazevIns";

        /// <summary>název elementu pro serializaci datumu vypršení platnosti</summary>
        private const string m_csDatExp = "DatExp";

        /// <summary>název elementu pro serializaci režimu</summary>
        private const string m_csRezim = "Rezim";

        /// <summary>název elementu pro serializaci poøadí pro tøídìní</summary>
        private const string m_csPoradiLog = "PoradiLog";

        /// <summary>název elementu pro serializaci aktuálního poètu pøihlášených funkcí na fázi</summary>
        private const string m_csAktuz = "Aktuz";

        /// <summary>název elementu pro serializaci typu agendy</summary>
        private const string m_csTypAg = "TypAg";

        /// <summary>název elementu pro serializaci identifikátoru pøihlášení</summary>
        private const string m_csIxsLpc = "IxsLpc";

        /// <summary>název elementu pro serializaci výsledku autorizaèní procedury</summary>
        private const string m_csVysledek = "Vysledek";

        /// <summary>název elementu pro serializaci seznamu fází k reinstalaci</summary>
        private const string m_csFazeToReinst  = "FazeToReinst";

        /// <summary>název elementu pro serializaci pøíznaku privilegované funkce</summary>
        private const string m_csPrizF = "PrizF";

        /// <summary>název elementu pro serializaci expirace vstupenky do systému</summary>
        private const string m_csExpTic = "ExpTic";

        /// <summary>název elementu pro serializaci identifikátoru relace databázového stroje</summary>
        private const string m_csSessid = "Sessid";

        /// <summary>název elementu pro serializaci poøadovho èísla konkurenèního pøihlášení</summary>
        private const string m_csLogPorCisloKon = "LogPorCisloKon";

        /// <summary>název elementu pro serializaci názvu referenta s konkurenèním pøihlášením</summary>
        private const string m_csNazevRefKon = "NazevRefKon";

        /// <summary>název elementu pro serializaci adresy poèítaèe s konkurenèním pøihlášením</summary>
        private const string m_csIpAdrKon = "IpAdrKon";

        /// <summary>název elementu pro serializaci data pøihlášení uživatele s konkurenèním pøihlášením</summary>
        private const string m_csDatLoginKon = "DatLoginKon";

        /// <summary>název elementu pro serializaci pøihlašovacího jména uživatele s konkurenèním pøihlášením</summary>
        private const string m_csLoginUzivKon = "LoginUzivKon";

        /// <summary>název elementu pro serializaci sub verze ADZ</summary>
        private const string m_csSubVerzeAdz = "SubVerzeAdz";

        /// <summary>název elementu pro serializaci vodotisku</summary>
        private const string m_csVodotisk = "Vodotisk";

        /// <summary>název elementu pro serializaci pøíznaku testovací databáze</summary>
        private const string m_csPrizTest = "PrizTest";

        /// <summary>název elementu pro serializaci vzkazu pro testovací databázi</summary>
        private const string m_csVzkazTest = "VzkazTest";

        /// <summary>název elementu pro serializaci identifikátoru externího uživatele typu veøejnost</summary>
        private const string m_csIxsExu = "IxsExu";

        /// <summary>název elementu pro serializaci poøadového èísla pøihlášení externího uživatele typu veøejnost</summary>
        private const string m_csPorCisExu = "PorCisExu";

        /// <summary>název elementu pro serializaci identifikátoru externího subjektu odpovídajícího aktuálnì pøihlášenému uživateli typu veøejnost</summary>
        private const string m_csIxsEsuExu = "IxsEsuExu";

        /// <summary>název elementu pro serializaci licence zástupné osoby odpovídající aktuálnì pøihlášenému uživateli typu veøejnost</summary>
        private const string m_csLicEsuExu = "LicEsuExu";

        /// <summary>název elementu pro serializaci poøadového èísla zástupné osoby odpovídající aktuálnì pøihlášenému uživateli typu veøejnost</summary>
        private const string m_csPorZasExu = "PorZasExu";

        /// <summary>název elementu pro serializaci stupnì pøidìlené dùvìryhodnosti uživatele typu veøejnost</summary>
        private const string m_csStuVerExu = "StuVerExu";

        /// <summary>název elementu pro serializaci identifikátoru konfiguraèní skupiny uživatele typu veøejnost</summary>
        private const string m_csIxsUsrExu = "IxsUsrExu";

        /// <summary>název elementu pro serializaci èasu minulého úspìšného pøihlášení uživatele typu veøejnost</summary>
        private const string m_csLastLoginExu = "LastLoginExu";

        /// <summary>název elementu pro serializaci revize databáze</summary>
        private const string m_csRevizeAdz = "RevizeAdz";

        /// <summary>název elementu pro serializaci ièo</summary>
        private const string m_csIco = "Ico";

        /// <summary>název elementu pro serializaci id konfiguraèní skupiny</summary>
        private const string m_csIxsUsr = "IxsUsr";

        /// <summary>název elementu pro serializaci názvu konfiguraèní skupiny</summary>
        private const string m_csNazevUsr = "NazevUsr";

        /// <summary>název elementu pro serializaci poøadového èísla nadøazeného pøihlášení</summary>
        private const string m_csLogPorCisloNad = "LogPorCisloNad";

        /// <summary>název elementu pro serializaci identifikátoru nadøazeného pøihlášení</summary>
        private const string m_csIxsLpcNad = "IxsLpcNad";

        /// <summary>název elementu pro serializaci identifikátoru navázaného externího subjektu pro aktuálního uživatele typu veøejnost</summary>
        private const string m_csIxsPrevExu = "IxsPrevExu";

        /// <summary>název elementu pro serializaci identifikátoru navázaného externího uživatele typu veøejnost dle vazby na navázaný externí subjekt</summary>
        private const string m_csIxsExuPrev = "IxsExuPrev";

        /// <summary>název elementu pro serializaci identifikátoru støediska spisových uzlù</summary>
        private const string m_csIxsTre = "IxsTre";

        /// <summary>název elementu pro serializaci klíèe pro vícefaktorovou autentizaci pomocí TOTP</summary>
        private const string m_csTotpKey = "TotpKey";

        /// <summary>název elementu pro serializaci identifikátoru primárnì pøihlášeného externího uživatele typu veøejnost</summary>
        private const string m_csIxsExuLogin = "IxsExuLogin";

        /// <summary>název elementu pro serializaci identifikátoru externího subjektu odpovídajícího primárnì pøihlášenému uživateli typu veøejnost</summary>
        private const string m_csIxsEsuExuLogin = "IxsEsuExuLogin";

        /// <summary>název elementu pro serializaci stupnì pøidìlené dùvìryhodnosti primárnì pøihlášeného uživatele typu veøejnost</summary>
        private const string m_csStuVerExuLogin = "StuVerExuLogin";

        /// <summary>název elementu pro serializaci èasového limitu pro èekání na databázový zámek</summary>
        private const string m_csLockTimeout = "LockTimeout";

        /// <summary>název elementu pro serializaci èasového limitu pro vykonání databázového pøíkazu</summary>
        private const string m_csCommandTimeout = "CommandTimeout";

        /// <summary>název elementu pro serializaci pøíznaku vývojové databáze</summary>
        private const string m_csPrizVyvoj = "PrizVyvoj";

        #endregion

        #region soukromé èleny

        /// <summary>èíslo chyby v autorizaèní proceduøe</summary>
        private GInt32 m_gnErrCode = new GInt32();

        /// <summary>èíslo SQL chyby v autorizaèní proceduøe</summary>
        private GInt32 m_gnSqlErr = new GInt32();

        /// <summary>èíslo ISAM chyby v autorizaèní proceduøe</summary>
        private GInt32 m_gnIsamErr = new GInt32();

        /// <summary>text databázové chyby v autorizaèní proceduøe</summary>
        private GString m_gsErrText = new GString(254);

        /// <summary>poøadové èíslo pøihlášení</summary>
        private GInt32 m_gnLogPorCislo = new GInt32();
        
        /// <summary>id referenta</summary>
        private GString m_gsIxsRef = new GString(12);

        /// <summary>název referenta</summary>
        private GString m_gsNazevRef = new GString(200);

        /// <summary>zkratka referenta</summary>
        private GString m_gsZkratka = new GString(16);

        /// <summary>id funkce</summary>
        private GString m_gsIxsFun = new GString(12);

        /// <summary>název funkce</summary>
        private GString m_gsNazevFun = new GString(50);

        /// <summary>id pùvodce zmìny</summary>
        private GString m_gsIxsZmp = new GString(12);

        /// <summary>priorita max</summary>
        private GInt32 m_gnPrioritaMax = new GInt32();

        /// <summary>fc</summary>
        private GString m_gsFc = new GString(30);

        /// <summary>id organizaèní jednotky</summary>
        private GString m_gsIxsOrj = new GString(12);

        /// <summary>název organizaèní jednotky</summary>
        private GString m_gsNazevOrj = new GString(50);

        /// <summary>kódovaný název silného uživatele</summary>
        private GString m_gsLdb = new GString(200);

        /// <summary>kódované heslo silného uživatele</summary>
        private GString m_gsPdb = new GString(200);

        /// <summary>id instance</summary>
        private GString m_gsIxsIns = new GString(12);

        /// <summary>id spisového uzlu</summary>
        private GString m_gsIxsSu = new GString(12);

        /// <summary>licence databáze</summary>
        private GString m_gsLicAdr = new GString(4);

        /// <summary>pøíznak cs</summary>
        private GInt32 m_gnCsDb = new GInt32();

        /// <summary>typ instalace</summary>
        private GInt32 m_gnTypInst = new GInt32();

        /// <summary>pøíznak archivace</summary>
        private GInt32 m_gnPrizArchiv = new GInt32();

        /// <summary>pøíznak blobù</summary>
        private GInt32 m_gnPrizBlob = new GInt32();

        /// <summary>id isu</summary>
        private GString m_gsIxsIsu = new GString(12);

        /// <summary>vzkaz</summary>
        private GString m_gsVzkazy = new GString(254);

        /// <summary>datum aktualizace</summary>
        private GDateTime m_gdDatAkt = new GDateTime();

        /// <summary>verze databáze</summary>
        private GInt32 m_gnVerzeDb = new GInt32();

        /// <summary>sub verze databáze</summary>
        private GInt32 m_gnSubVerzeDb = new GInt32();
        
        /// <summary>název rf</summary>
        private GString m_gsNazevRf = new GString(200);

        /// <summary>projekt</summary>
        private GString m_gsProject = new GString(16);

        /// <summary>pøíznak d</summary>
        private GInt32 m_gnPrizD = new GInt32();

        /// <summary>název spisového uzlu</summary>
        private GString m_gsNazevSu = new GString(25);

        /// <summary>zkratka spisového uzlu</summary>
        private GString m_gsZkratkaSu = new GString(16);

        /// <summary>datum pøihlášení</summary>
        private GDateTime m_gdDatLogin = new GDateTime();
        
        /// <summary>název instance</summary>
        private GString m_gsNazevIns = new GString(50);

        /// <summary>datum vypršení platnosti</summary>
        private GDateTime m_gdDatExp = new GDateTime();

        /// <summary>režim</summary>
        private GInt32 m_gnRezim = new GInt32();

        /// <summary>poøadí pro tøídìní</summary>
        private GInt32 m_gnPoradiLog = new GInt32();

        /// <summary>aktuální poèet pøihlášených funkcí na fázi</summary>
        private GInt32 m_gnAktuz = new GInt32();

        /// <summary>typ agendy</summary>
        private GInt16 m_gnTypAg = new GInt16();

        /// <summary>identifikátor pøihlášení</summary>
        private GString m_gsIxsLpc = new GString(12);

        /// <summary>výsledek autorizaèní procedury</summary>
        private GInt32 m_gnVysledek = new GInt32();

        /// <summary>seznam fází k reinstalaci</summary>
        private GString m_gsFazeToReinst  = new GString(254);

        /// <summary>pøíznak privilegované funkce</summary>
        private GInt16 m_gnPrizF = new GInt16();

        /// <summary>expirace vstupenky do systému</summary>
        private GInt32 m_gnExpTic = new GInt32();

        /// <summary>identifikátor relace databázového stroje</summary>
        private GInt64 m_gnSessid = new GInt64();

        /// <summary>poøadové èíslo konkurenèního pøihlášení</summary>
        private GInt32 m_gnLogPorCisloKon = new GInt32();

        /// <summary>název referenta s konkurenèním pøihlášením</summary>
        private GString m_gsNazevRefKon = new GString(200);

        /// <summary>adresa poèítaèe s konkurenèním pøihlášením</summary>
        private GString m_gsIpAdrKon = new GString(50);

        /// <summary>datum pøihlášení uživatele s konkurenèním pøihlášením</summary>
        private GDateTime m_gdtDatLoginKon = new GDateTime();

        /// <summary>pøihlašovací jméno uživatele s konkurenèním pøihlášením</summary>
        private GString m_gsLoginUzivKon = new GString(60);

        /// <summary>sub verze ADZ</summary>
        private GInt16 m_gnSubVerzeAdz = new GInt16();

        /// <summary>vodotisk</summary>
        private GString m_gsVodotisk = new GString(254);

        /// <summary>pøíznak testovací databáze</summary>
        private GInt16 m_gnPrizTest = new GInt16();

        /// <summary>vzkaz pro testovací databázi</summary>
        private GString m_gsVzkazTest = new GString(254);

        /// <summary>identifikátor externího uživatele typu veøejnost (tj. obèana)</summary>
        private GString m_gsIxsExu = new GString(12);

        /// <summary>poøadové èíslo pøihlášení externího uživatele typu veøejnost (tj. obèana)</summary>
        private GInt32 m_gnPorCisExu = new GInt32();

        /// <summary>identifikátor externího subjektu odpovídajícího aktuálnì pøihlášenému uživateli typu veøejnost (tj. obèanu)</summary>
        private GString m_gsIxsEsuExu = new GString(12);

        /// <summary>licence zástupné osoby odpovídající aktuálnì pøihlášenému uživateli typu veøejnost (tj. obèanu)</summary>
        private GString m_gsLicEsuExu  = new GString(4);

        /// <summary>poøadové èíslo zástupné osoby odpovídající aktuálnì pøihlášenému uživateli typu veøejnost (tj. obèanu)</summary>
        private GInt32 m_gnPorZasExu = new GInt32();

        /// <summary>stupeò pøidìlené dùvìryhodnosti uživatele typu veøejnost (tj. obèana)</summary>
        private GInt16 m_gnStuVerExu = new GInt16();

        /// <summary>identifikátor konfiguraèní skupiny uživatele typu veøejnost (tj. obèana)</summary>
        private GString m_gsIxsUsrExu = new GString(12);

        /// <summary>èas minulého úspìšného pøihlášení uživatele typu veøejnost (tj. obèana)</summary>
        private GDateTime m_gdtLastLoginExu = new GDateTime();

        /// <summary>revize databáze</summary>
        private GInt32 m_gnRevizeAdz = new GInt32();

        /// <summary>ièo</summary>
        private GString m_gsIco = new GString(10);

        /// <summary>id konfiguraèní skupiny</summary>
        private GString m_gsIxsUsr = new GString(12);

        /// <summary>název konfiguraèní skupiny</summary>
        private GString m_gsNazevUsr = new GString(50);

        /// <summary>poøadové èíslo nadøazeného pøihlášení</summary>
        private GInt32 m_gnLogPorCisloNad = new GInt32();

        /// <summary>identifikátor nadøazeného pøihlášení</summary>
        private GString m_gsIxsLpcNad = new GString(12);

        /// <summary>identifikátor navázaného externího subjektu pro aktuálního uživatele typu veøejnost</summary>
        private GString m_gsIxsPrevExu = new GString(12);

        /// <summary>identifikátor navázaného externího uživatele typu veøejnost dle vazby na navázaný externí subjekt</summary>
        private GString m_gsIxsExuPrev = new GString(12);

        /// <summary>identifikátor støediska spisových uzlù</summary>
        private GString m_gsIxsTre = new GString(12);

        /// <summary>klíè pro vícefaktorovou autentizaci pomocí TOTP</summary>
        private GString m_gsTotpKey = new GString(254);

        /// <summary>identifikátor primárnì pøihlášeného externího uživatele typu veøejnost</summary>
        private GString m_gsIxsExuLogin = new GString(12);

        /// <summary>identifikátor externího subjektu odpovídajícího primárnì pøihlášenému uživateli typu veøejnost</summary>
        private GString m_gsIxsEsuExuLogin = new GString(12);

        /// <summary>stupeò pøidìlené dùvìryhodnosti primárnì pøihlášeného uživatele typu veøejnost</summary>
        private GInt16 m_gnStuVerExuLogin = new GInt16();

        /// <summary>èasový limit pro èekání na databázový zámek v sekundách</summary>
        private GInt16 m_gnLockTimeout = new GInt16();

        /// <summary>èasový limit pro vykonání databázového pøíkazu v sekundách</summary>
        private GInt16 m_gnCommandTimeout = new GInt16();

        /// <summary>pøíznak vývojové databáze</summary>
        private GInt16 m_gnPrizVyvoj = new GInt16();

        #endregion

        #region vlastnosti

        /// <summary>defaultní název pro serializaci</summary>
        public static string SerializationName {
            get {return m_csSerializationName;}
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(GSessionInfo).Assembly;}
        } // end property

        /// <summary>instance s výchozími hodnotami</summary>
        public static IGSessionInfo DefaultInstance {
            get {
                GSessionInfo l_oSessionInfo = new GSessionInfo();
                l_oSessionInfo.m_gnErrCode.Value = 0;
                l_oSessionInfo.m_gnSqlErr.Value = 0;
                l_oSessionInfo.m_gnIsamErr.Value = 0;
                l_oSessionInfo.m_gsErrText.Value = String.Empty;
                l_oSessionInfo.m_gnLogPorCislo.Value = -1;
                l_oSessionInfo.m_gsIxsRef.Value = "0000SR000016";
                l_oSessionInfo.m_gsNazevRef.Value = "Supervizor";
                l_oSessionInfo.m_gsZkratka.Value = "Supervizor";
                l_oSessionInfo.m_gsIxsFun.Value = "0000SF00000Z";
                l_oSessionInfo.m_gsNazevFun.Value = GResources.GetResourceText(ThisAssembly,23230009); // Neurèeno
                l_oSessionInfo.m_gsIxsZmp.Value = "0000SZ000007";
                l_oSessionInfo.m_gnPrioritaMax.Value = 0;
                l_oSessionInfo.m_gsFc.Value = String.Empty;
                l_oSessionInfo.m_gsIxsOrj.Value = "0000SG00000C";
                l_oSessionInfo.m_gsNazevOrj.Value = GResources.GetResourceText(ThisAssembly,23230009); // Neurèeno
                l_oSessionInfo.m_gsLdb.Value = String.Empty;
                l_oSessionInfo.m_gsPdb.Value = String.Empty;
                l_oSessionInfo.m_gsIxsIns.Value = "00000I00000I";
                l_oSessionInfo.m_gsIxsSu.Value = "0000SS00000O";
                l_oSessionInfo.m_gsLicAdr.Value = "0000";
                l_oSessionInfo.m_gnCsDb.Value = 0;
                l_oSessionInfo.m_gnTypInst.Value = 0;
                l_oSessionInfo.m_gnPrizArchiv.Value = 0;
                l_oSessionInfo.m_gnPrizBlob.Value = 0;
                l_oSessionInfo.m_gsIxsIsu.Value = "0000SE00000M";
                l_oSessionInfo.m_gsVzkazy.Value = String.Empty;
                l_oSessionInfo.m_gdDatAkt.Value = DateTime.Now;
                l_oSessionInfo.m_gnVerzeDb.Value = 0;
                l_oSessionInfo.m_gnSubVerzeDb.Value = 0;
                l_oSessionInfo.m_gsNazevRf.Value = "Supervizor";
                l_oSessionInfo.m_gsProject.Value = String.Empty;
                l_oSessionInfo.m_gnPrizD.Value = 0;
                l_oSessionInfo.m_gsNazevSu.Value = GResources.GetResourceText(ThisAssembly,23230009); // Neurèeno
                l_oSessionInfo.m_gsZkratkaSu.Value = GResources.GetResourceText(ThisAssembly,23230009); // Neurèeno
                l_oSessionInfo.m_gdDatLogin.Value = DateTime.Now;
                l_oSessionInfo.m_gsNazevIns.Value = GResources.GetResourceText(ThisAssembly,23230009); // Neurèeno
                l_oSessionInfo.m_gdDatExp.Value = DateTime.Now;
                l_oSessionInfo.m_gnRezim.Value = 1;
                l_oSessionInfo.m_gnPoradiLog.Value = 0;
                l_oSessionInfo.m_gnAktuz.Value = 0;
                l_oSessionInfo.m_gnTypAg.Value = 0;
                l_oSessionInfo.m_gsIxsLpc.Value = "0000ALC0000B";
                l_oSessionInfo.m_gnVysledek.Value = 0;
                l_oSessionInfo.m_gsFazeToReinst.Value = String.Empty;
                l_oSessionInfo.m_gnPrizF.Value = 0;
                l_oSessionInfo.m_gnExpTic.Value = 0;
                l_oSessionInfo.m_gnSessid.Value = 0;
                l_oSessionInfo.m_gnLogPorCisloKon.Value = 0;
                l_oSessionInfo.m_gsNazevRefKon.Value = String.Empty;
                l_oSessionInfo.m_gsIpAdrKon.Value = String.Empty;
                l_oSessionInfo.m_gdtDatLoginKon = new GDateTime();
                l_oSessionInfo.m_gsLoginUzivKon.Value = String.Empty;
                l_oSessionInfo.m_gnSubVerzeAdz.Value = 0;
                l_oSessionInfo.m_gsVodotisk.Value = String.Empty;
                l_oSessionInfo.m_gnPrizTest.Value = 0;
                l_oSessionInfo.m_gsVzkazTest.Value = String.Empty;
                l_oSessionInfo.m_gsIxsExu.Value = String.Empty;
                l_oSessionInfo.m_gnPorCisExu.Value = 0;
                l_oSessionInfo.m_gsIxsEsuExu.Value = String.Empty;
                l_oSessionInfo.m_gsLicEsuExu.Value = String.Empty;
                l_oSessionInfo.m_gnPorZasExu.Value = 0;
                l_oSessionInfo.m_gnStuVerExu.Value = 0;
                l_oSessionInfo.m_gsIxsUsrExu.Value = String.Empty;
                l_oSessionInfo.m_gdtLastLoginExu.Value = DateTime.Now;
                l_oSessionInfo.m_gnRevizeAdz.Value = 0;
                l_oSessionInfo.m_gsIco = String.Empty;
                l_oSessionInfo.m_gsIxsUsr = String.Empty;
                l_oSessionInfo.m_gsNazevUsr = String.Empty;
                l_oSessionInfo.m_gnLogPorCisloNad.Value = l_oSessionInfo.m_gnLogPorCislo.Value;
                l_oSessionInfo.m_gsIxsLpcNad.Value = l_oSessionInfo.m_gsIxsLpc.Value;
                l_oSessionInfo.m_gsIxsPrevExu.Value = String.Empty;
                l_oSessionInfo.m_gsIxsExuPrev.Value = String.Empty;
                l_oSessionInfo.m_gsIxsTre.Value = String.Empty;
                l_oSessionInfo.m_gsTotpKey.Value = String.Empty;
                l_oSessionInfo.m_gsIxsExuLogin.Value = String.Empty;
                l_oSessionInfo.m_gsIxsEsuExuLogin.Value = String.Empty;
                l_oSessionInfo.m_gnStuVerExuLogin.Value = 0;
                l_oSessionInfo.m_gnLockTimeout.Value = 0;
                l_oSessionInfo.m_gnCommandTimeout.Value = 0;
                l_oSessionInfo.m_gnPrizVyvoj.Value = 0;
                return l_oSessionInfo;
            } // end method
        } // end property

        /// <summary>název elementu pro serializaci èísla chyby v autorizaèní proceduøe</summary>
        public static string ErrCodeKey { get { return m_csErrCode; } }

        /// <summary>název elementu pro serializaci èísla SQL chyby v autorizaèní proceduøe</summary>
        public static string SqlErrKey { get { return m_csSqlErr; } }

        /// <summary>název elementu pro serializaci èísla ISAM chyby v autorizaèní proceduøe</summary>
        public static string IsamErrKey { get { return m_csIsamErr; } }

        /// <summary>název elementu pro serializaci textu databázové chyby v autorizaèní proceduøe</summary>
        public static string ErrTextKey { get { return m_csErrText; } }

        /// <summary>název elementu pro serializaci poøadového èísla pøihlášení</summary>
        public static string LogPorCisloKey { get { return m_csLogPorCislo; } }

        /// <summary>název elementu pro serializaci id referenta</summary>
        public static string IxsRefKey { get { return m_csIxsRef; } }

        /// <summary>název elementu pro serializaci názvu referenta</summary>
        public static string NazevRefKey { get { return m_csNazevRef; } }

        /// <summary>název elementu pro serializaci zkratky referenta</summary>
        public static string ZkratkaKey { get { return m_csZkratka; } }

        /// <summary>název elementu pro serializaci id funkce</summary>
        public static string IxsFunKey { get { return m_csIxsFun; } }

        /// <summary>název elementu pro serializaci názvu funkce</summary>
        public static string NazevFunKey { get { return m_csNazevFun; } }

        /// <summary>název elementu pro serializaci id pùvodce zmìny</summary>
        public static string IxsZmpKey { get { return m_csIxsZmp; } }

        /// <summary>název elementu pro serializaci priority max</summary>
        public static string PrioritaMaxKey { get { return m_csPrioritaMax; } }

        /// <summary>název elementu pro serializaci fc</summary>
        public static string FcKey { get { return m_csFc; } }

        /// <summary>název elementu pro serializaci id organizaèní jednotky</summary>
        public static string IxsOrjKey { get { return m_csIxsOrj; } }

        /// <summary>název elementu pro serializaci názvu organizaèní jednotky</summary>
        public static string NazevOrjKey { get { return m_csNazevOrj; } }

        /// <summary>název elementu pro serializaci kódovaného názvu silného uživatele</summary>
        public static string LdbKey { get { return m_csLdb; } }

        /// <summary>název elementu pro serializaci kódovaného hesla silného uživatele</summary>
        public static string PdbKey { get { return m_csPdb; } }

        /// <summary>název elementu pro serializaci id instance</summary>
        public static string IxsInsKey { get { return m_csIxsIns; } }

        /// <summary>název elementu pro serializaci id spisového uzlu</summary>
        public static string IxsSuKey { get { return m_csIxsSu; } }

        /// <summary>název elementu pro serializaci licence databáze</summary>
        public static string LicAdrKey { get { return m_csLicAdr; } }

        /// <summary>název elementu pro serializaci pøíznaku cs</summary>
        public static string CsDbKey { get { return m_csCsDb; } }

        /// <summary>název elementu pro serializaci typu instalace</summary>
        public static string TypInstKey { get { return m_csTypInst; } }

        /// <summary>název elementu pro serializaci pøíznaku archivace</summary>
        public static string PrizArchivKey { get { return m_csPrizArchiv; } }

        /// <summary>název elementu pro serializaci pøíznaku blobù</summary>
        public static string PrizBlobKey { get { return m_csPrizBlob; } }

        /// <summary>název elementu pro serializaci id isu</summary>
        public static string IxsIsuKey { get { return m_csIxsIsu; } }

        /// <summary>název elementu pro serializaci vzkazu</summary>
        public static string VzkazyKey { get { return m_csVzkazy; } }

        /// <summary>název elementu pro serializaci datumu aktualizace</summary>
        public static string DatAktKey { get { return m_csDatAkt; } }

        /// <summary>název elementu pro serializaci verze databáze</summary>
        public static string VerzeDbKey { get { return m_csVerzeDb; } }

        /// <summary>název elementu pro serializaci sub verze databáze</summary>
        public static string SubVerzeDbKey { get { return m_csSubVerzeDb; } }

        /// <summary>název elementu pro serializaci názvu rf</summary>
        public static string NazevRfKey { get { return m_csNazevRf; } }

        /// <summary>název elementu pro serializaci projektu</summary>
        public static string ProjectKey { get { return m_csProject; } }

        /// <summary>název elementu pro serializaci pøíznaku d</summary>
        public static string PrizDKey { get { return m_csPrizD; } }

        /// <summary>název elementu pro serializaci názvu spisového uzlu</summary>
        public static string NazevSuKey { get { return m_csNazevSu; } }

        /// <summary>název elementu pro serializaci zkratky spisového uzlu</summary>
        public static string ZkratkaSuKey { get { return m_csZkratkaSu; } }

        /// <summary>název elementu pro serializaci datumu pøihlášení</summary>
        public static string DatLoginKey { get { return m_csDatLogin; } }

        /// <summary>název elementu pro serializaci názvu instance</summary>
        public static string NazevInsKey { get { return m_csNazevIns; } }

        /// <summary>název elementu pro serializaci datumu vypršení platnosti</summary>
        public static string DatExpKey { get { return m_csDatExp; } }

        /// <summary>název elementu pro serializaci režimu</summary>
        public static string RezimKey { get { return m_csRezim; } }

        /// <summary>název elementu pro serializaci poøadí pro tøídìní</summary>
        public static string PoradiLogKey { get { return m_csPoradiLog; } }

        /// <summary>název elementu pro serializaci aktuálního poètu pøihlášených funkcí na fázi</summary>
        public static string AktuzKey { get { return m_csAktuz; } }

        /// <summary>název elementu pro serializaci typu agendy</summary>
        public static string TypAgKey { get { return m_csTypAg; } }

        /// <summary>název elementu pro serializaci identifikátoru pøihlášení</summary>
        public static string IxsLpcKey { get { return m_csIxsLpc; } }

        /// <summary>název elementu pro serializaci výsledku autorizaèní procedury</summary>
        public static string VysledekKey { get { return m_csVysledek; } }

        /// <summary>název elementu pro serializaci seznamu fází k reinstalaci</summary>
        public static string FazeToReinstKey { get { return m_csFazeToReinst; } }

        /// <summary>název elementu pro serializaci pøíznaku privilegované funkce</summary>
        public static string PrizFKey { get { return m_csPrizF; } }

        /// <summary>název elementu pro serializaci expirace vstupenky do systému</summary>
        public static string ExpTicKey { get { return m_csExpTic; } }

        /// <summary>název elementu pro serializaci identifikátoru relace databázového stroje</summary>
        public static string SessidKey { get { return m_csSessid; } }

        /// <summary>název elementu pro serializaci poøadovho èísla konkurenèního pøihlášení</summary>
        public static string LogPorCisloKonKey { get { return m_csLogPorCisloKon; } }

        /// <summary>název elementu pro serializaci názvu referenta s konkurenèním pøihlášením</summary>
        public static string NazevRefKonKey { get { return m_csNazevRefKon; } }

        /// <summary>název elementu pro serializaci adresy poèítaèe s konkurenèním pøihlášením</summary>
        public static string IpAdrKonKey { get { return m_csIpAdrKon; } }

        /// <summary>název elementu pro serializaci data pøihlášení uživatele s konkurenèním pøihlášením</summary>
        public static string DatLoginKonKey { get { return m_csDatLoginKon; } }

        /// <summary>název elementu pro serializaci pøihlašovacího jména uživatele s konkurenèním pøihlášením</summary>
        public static string LoginUzivKonKey { get { return m_csLoginUzivKon; } }

        /// <summary>název elementu pro serializaci sub verze ADZ</summary>
        public static string SubVerzeAdzKey { get { return m_csSubVerzeAdz; } }

        /// <summary>název elementu pro serializaci vodotisku</summary>
        public static string VodotiskKey { get { return m_csVodotisk; } }

        /// <summary>název elementu pro serializaci pøíznaku testovací databáze</summary>
        public static string PrizTestKey { get { return m_csPrizTest; } }

        /// <summary>název elementu pro serializaci vzkazu pro testovací databázi</summary>
        public static string VzkazTestKey { get { return m_csVzkazTest; } }

        /// <summary>název elementu pro serializaci identifikátoru externího uživatele typu veøejnost</summary>
        public static string IxsExuKey { get { return m_csIxsExu; } }

        /// <summary>název elementu pro serializaci poøadového èísla pøihlášení externího uživatele typu veøejnost</summary>
        public static string PorCisExuKey { get { return m_csPorCisExu; } }

        /// <summary>název elementu pro serializaci identifikátoru externího subjektu odpovídajícího aktuálnì pøihlášenému uživateli typu veøejnost</summary>
        public static string IxsEsuExuKey { get { return m_csIxsEsuExu; } }

        /// <summary>název elementu pro serializaci licence zástupné osoby odpovídající aktuálnì pøihlášenému uživateli typu veøejnost</summary>
        public static string LicEsuExuKey { get { return m_csLicEsuExu; } }

        /// <summary>název elementu pro serializaci poøadového èísla zástupné osoby odpovídající aktuálnì pøihlášenému uživateli typu veøejnost</summary>
        public static string PorZasExuKey { get { return m_csPorZasExu; } }

        /// <summary>název elementu pro serializaci stupnì pøidìlené dùvìryhodnosti uživatele typu veøejnost</summary>
        public static string StuVerExuKey { get { return m_csStuVerExu; } }

        /// <summary>název elementu pro serializaci identifikátoru konfiguraèní skupiny uživatele typu veøejnost</summary>
        public static string IxsUsrExuKey { get { return m_csIxsUsrExu; } }

        /// <summary>název elementu pro serializaci èasu minulého úspìšného pøihlášení uživatele typu veøejnost</summary>
        public static string LastLoginExuKey { get { return m_csLastLoginExu; } }

        /// <summary>název elementu pro serializaci revize databáze</summary>
        public static string RevizeAdzKey { get { return m_csRevizeAdz; } }
        
        /// <summary>název elementu pro serializaci ièo</summary>
        public static string  IcoKey { get { return m_csIco; } }

        /// <summary>název elementu pro serializaci id konfiguraèní skupiny</summary>
        public static string  IxsUsrKey { get { return m_csIxsUsr; } }

        /// <summary>název elementu pro serializaci názvu konfiguraèní skupiny</summary>
        public static string  NazevUsrKey { get { return m_csNazevUsr; } }

        /// <summary>název elementu pro serializaci poøadového èísla nadøazeného pøihlášení</summary>
        public static string LogPorCisloNadKey { get { return m_csLogPorCisloNad; } }

        /// <summary>název elementu pro serializaci identifikátoru nadøazeného pøihlášení</summary>
        public static string IxsLpcNadKey { get { return m_csIxsLpcNad; } }

        /// <summary>název elementu pro serializaci identifikátoru navázaného externího subjektu pro aktuálního uživatele typu veøejnost</summary>
        public static string IxsPrevExuKey { get { return m_csIxsPrevExu; } }

        /// <summary>název elementu pro serializaci identifikátoru navázaného externího uživatele typu veøejnost dle vazby na navázaný externí subjekt</summary>
        public static string IxsExuPrevKey { get { return m_csIxsExuPrev; } }

        /// <summary>název elementu pro serializaci identifikátoru støediska spisových uzlù</summary>
        public static string IxsTreKey { get { return m_csIxsTre; } }

        /// <summary>název elementu pro serializaci klíèe pro vícefaktorovou autentizaci pomocí TOTP</summary>
        public static string TotpKeyKey { get { return m_csTotpKey; } }

        /// <summary>název elementu pro serializaci identifikátoru primárnì pøihlášeného externího uživatele typu veøejnost</summary>
        public static string IxsExuLoginKey { get { return m_csIxsExuLogin; } }

        /// <summary>název elementu pro serializaci identifikátoru externího subjektu odpovídajícího primárnì pøihlášenému uživateli typu veøejnost</summary>
        public static string IxsEsuExuLoginKey { get { return m_csIxsEsuExuLogin; } }

        /// <summary>název elementu pro serializaci stupenì pøidìlené dùvìryhodnosti primárnì pøihlášeného uživatele typu veøejnost</summary>
        public static string StuVerExuLoginKey { get { return m_csStuVerExuLogin; } }

        /// <summary>název elementu pro serializaci èasového limitu pro èekání na databázový zámek</summary>
        public static string LockTimeoutKey { get { return m_csLockTimeout; } }

        /// <summary>název elementu pro serializaci èasového limitu pro pøihlášení k databázi</summary>
        public static string CommandTimeoutKey { get { return m_csCommandTimeout; } }

        /// <summary>název elementu pro serializaci pøíznaku vývojové databáze</summary>
        public static string PrizVyvojKey { get { return m_csPrizVyvoj; } }

        #endregion

        #region vlastnosti rozhraní IGSessionInfo

        /// <summary>èíslo chyby v autorizaèní proceduøe</summary>
        public GInt32 ErrCode {
            get {return m_gnErrCode;}
            set {m_gnErrCode.DbValue = value.DbValue;}
        } // end property

        /// <summary>èíslo SQL chyby v autorizaèní proceduøe</summary>
        public GInt32 SqlErr {
            get {return m_gnSqlErr;}
            set {m_gnSqlErr.DbValue = value.DbValue;}
        } // end property

        /// <summary>èíslo ISAM chyby v autorizaèní proceduøe</summary>
        public GInt32 IsamErr {
            get {return m_gnIsamErr;}
            set {m_gnIsamErr.DbValue = value.DbValue;}
        } // end property

        /// <summary>text databázové chyby v autorizaèní proceduøe</summary>
        public GString ErrText {
            get {return m_gsErrText;}
            set {m_gsErrText.DbValue = value.DbValue;}
        } // end property

        /// <summary>poøadové èíslo pøihlášení</summary>
        public GInt32 LogPorCislo {
            get {return m_gnLogPorCislo;}
            set {m_gnLogPorCislo.DbValue = value.DbValue;}
        } // end property

        /// <summary>Pøíznak, že je pøiøazeno poøadové èíslo pøihlášení - tedy pøíznak, že již probìhlo GINIS pøihlášení</summary>
        public bool IsLogPorCislo {
            get { return (m_gnLogPorCislo.HasValue() && ( m_gnLogPorCislo  != -1 )); } 
        }

        /// <summary>id referenta</summary>
        public GString IxsRef {
            get {return m_gsIxsRef;}
            set {m_gsIxsRef.DbValue = value.DbValue;}
        } // end property

        /// <summary>název referenta</summary>
        public GString NazevRef {
            get {return m_gsNazevRef;}
            set {m_gsNazevRef.DbValue = value.DbValue;}
        } // end property

        /// <summary>zkratka referenta</summary>
        public GString Zkratka {
            get {return m_gsZkratka;}
            set {m_gsZkratka.DbValue = value.DbValue;}
        } // end property

        /// <summary>id funkce</summary>
        public GString IxsFun {
            get {return m_gsIxsFun;}
            set {m_gsIxsFun.DbValue = value.DbValue;}
        } // end property

        /// <summary>název funkce</summary>
        public GString NazevFun {
            get {return m_gsNazevFun;}
            set {m_gsNazevFun.DbValue = value.DbValue;}
        } // end property

        /// <summary>id pùvodce zmìny</summary>
        public GString IxsZmp {
            get {return m_gsIxsZmp;}
            set {m_gsIxsZmp.DbValue = value.DbValue;}
        } // end property

        /// <summary>priorita max</summary>
        public GInt32 PrioritaMax {
            get {return m_gnPrioritaMax;}
            set {m_gnPrioritaMax.DbValue = value.DbValue;}
        } // end property

        /// <summary>fc</summary>
        public GString Fc {
            get {return m_gsFc;}
            set {m_gsFc.DbValue = value.DbValue;}
        } // end property

        /// <summary>id organizaèní jednotky</summary>
        public GString IxsOrj {
            get {return m_gsIxsOrj;}
            set {m_gsIxsOrj.DbValue = value.DbValue;}
        } // end property

        /// <summary>název organizaèní jednotky</summary>
        public GString NazevOrj {
            get {return m_gsNazevOrj;}
            set {m_gsNazevOrj.DbValue = value.DbValue;}
        } // end property

        /// <summary>kódovaný název silného uživatele</summary>
        public GString Ldb {
            get {return m_gsLdb;}
            set {m_gsLdb.DbValue = value.DbValue;}
        } // end property

        /// <summary>kódované heslo silného uživatele</summary>
        public GString Pdb {
            get {return m_gsPdb;}
            set {m_gsPdb.DbValue = value.DbValue;}
        } // end property

        /// <summary>id instance</summary>
        public GString IxsIns {
            get {return m_gsIxsIns;}
            set {m_gsIxsIns.DbValue = value.DbValue;}
        } // end property

        /// <summary>id spisového uzlu</summary>
        public GString IxsSu {
            get {return m_gsIxsSu;}
            set {m_gsIxsSu.DbValue = value.DbValue;}
        } // end property

        /// <summary>licence databáze</summary>
        public GString LicAdr {
            get {return m_gsLicAdr;}
            set {m_gsLicAdr.DbValue = value.DbValue;}
        } // end property

        /// <summary>pøíznak cs</summary>
        public GInt32 CsDb {
            get {return m_gnCsDb;}
            set {m_gnCsDb.DbValue = value.DbValue;}
        } // end property

        /// <summary>typ instalace</summary>
        /// <remarks>hodnota odpovídá èíselníku ginctyi (10=AÈR, 20=civil, 30=ISTA, 40=ÚP, 50=OkÚ)</remarks>
        public GInt32 TypInst {
            get {return m_gnTypInst;}
            set {m_gnTypInst.DbValue = value.DbValue;}
        } // end property

        /// <summary>pøíznak archivace</summary>
        public GInt32 PrizArchiv {
            get {return m_gnPrizArchiv;}
            set {m_gnPrizArchiv.DbValue = value.DbValue;}
        } // end property

        /// <summary>pøíznak blobù</summary>
        public GInt32 PrizBlob {
            get {return m_gnPrizBlob;}
            set {m_gnPrizBlob.DbValue = value.DbValue;}
        } // end property

        /// <summary>id isu</summary>
        public GString IxsIsu {
            get {return m_gsIxsIsu;}
            set {m_gsIxsIsu.DbValue = value.DbValue;}
        } // end property

        /// <summary>vzkaz</summary>
        public GString Vzkazy {
            get {return m_gsVzkazy;}
            set {m_gsVzkazy.DbValue = value.DbValue;}
        } // end property

        /// <summary>datum aktualizace</summary>
        public GDateTime DatAkt {
            get {return m_gdDatAkt;}
            set {m_gdDatAkt.DbValue = value.DbValue;}
        } // end property

        /// <summary>verze databáze</summary>
        public GInt32 VerzeDb {
            get {return m_gnVerzeDb;}
            set {m_gnVerzeDb.DbValue = value.DbValue;}
        } // end property

        /// <summary>sub verze databáze</summary>
        public GInt32 SubVerzeDb {
            get {return m_gnSubVerzeDb;}
            set {m_gnSubVerzeDb.DbValue = value.DbValue;}
        } // end property
        
        /// <summary>název rf</summary>
        public GString NazevRf {
            get {return m_gsNazevRf;}
            set {m_gsNazevRf.DbValue = value.DbValue;}
        } // end property

        /// <summary>projekt</summary>
        public GString Project {
            get {return m_gsProject;}
            set {m_gsProject.DbValue = value.DbValue;}
        } // end property

        /// <summary>pøíznak d</summary>
        public GInt32 PrizD {
            get {return m_gnPrizD;}
            set {m_gnPrizD.DbValue = value.DbValue;}
        } // end property

        /// <summary>název spisového uzlu</summary>
        public GString NazevSu {
            get {return m_gsNazevSu;}
            set {m_gsNazevSu.DbValue = value.DbValue;}
        } // end property

        /// <summary>zkratka spisového uzlu</summary>
        public GString ZkratkaSu {
            get { return m_gsZkratkaSu; }
            set { m_gsZkratkaSu.DbValue = value.DbValue; }
        } // end property

        /// <summary>datum pøihlášení</summary>
        public GDateTime DatLogin {
            get {return m_gdDatLogin;}
            set {m_gdDatLogin.DbValue = value.DbValue;}
        } // end property
        
        /// <summary>název instance</summary>
        public GString NazevIns {
            get {return m_gsNazevIns;}
            set {m_gsNazevIns.DbValue = value.DbValue;}
        } // end property

        /// <summary>datum vypršení platnosti</summary>
        public GDateTime DatExp {
            get {return m_gdDatExp;}
            set {m_gdDatExp.DbValue = value.DbValue;}
        } // end property

        /// <summary>režim</summary>
        public GInt32 Rezim {
            get {return m_gnRezim;}
            set {m_gnRezim.DbValue = value.DbValue;}
        } // end property

        /// <summary>poøadí pro tøídìní</summary>
        public GInt32 PoradiLog {
            get {return m_gnPoradiLog;}
            set {m_gnPoradiLog.DbValue = value.DbValue;}
        } // end property

        /// <summary>aktuální poèet pøihlášených funkcí na fázi</summary>
        public GInt32 Aktuz {
            get {return m_gnAktuz;}
            set {m_gnAktuz.DbValue = value.DbValue;}
        } // end property

        /// <summary>typ agendy</summary>
        public GInt16 TypAg {
            get {return m_gnTypAg;}
            set {m_gnTypAg.DbValue = value.DbValue;}
        } // end property

        /// <summary>identifikátor pøihlášení</summary>
        public GString IxsLpc {
            get { return m_gsIxsLpc; }
            set { m_gsIxsLpc.DbValue = value.DbValue; }
        } // end property

        /// <summary>výsledek autorizaèní procedury</summary>
        public GInt32 Vysledek {
            get { return m_gnVysledek; }
            set { m_gnVysledek.DbValue = value.DbValue; }
        } // end property

        /// <summary>seznam fází k reinstalaci</summary>
        public GString FazeToReinst {
            get { return m_gsFazeToReinst; }
            set { m_gsFazeToReinst.DbValue = value.DbValue; }
        } // end property

        /// <summary>pøíznak privilegované funkce</summary>
        public GInt16 PrizF {
            get { return m_gnPrizF; }
            set { m_gnPrizF.DbValue = value.DbValue; }
        } // end property

        /// <summary>expirace vstupenky do systému</summary>
        public GInt32 ExpTic {
            get { return m_gnExpTic; }
            set { m_gnExpTic.DbValue = value.DbValue; }
        } // end property

        /// <summary>identifikátor relace databázového stroje</summary>
        public GInt64 Sessid {
            get { return m_gnSessid; }
            set { m_gnSessid.DbValue = value.DbValue; }
        } // end property

        /// <summary>poøadové èíslo konkurenèního pøihlášení</summary>
        public GInt32 LogPorCisloKon {
            get { return m_gnLogPorCisloKon; }
            set { m_gnLogPorCisloKon.DbValue = value.DbValue; }
        } // end property

        /// <summary>název referenta s konkurenèním pøihlášením</summary>
        public GString NazevRefKon {
            get { return m_gsNazevRefKon; }
            set { m_gsNazevRefKon.DbValue = value.DbValue; }
        } // end property

        /// <summary>adresa poèítaèe s konkurenèním pøihlášením</summary>
        public GString IpAdrKon {
            get { return m_gsIpAdrKon; }
            set { m_gsIpAdrKon.DbValue = value.DbValue; }
        } // end property

        /// <summary>datum pøihlášení uživatele s konkurenèním pøihlášením</summary>
        public GDateTime DatLoginKon {
            get { return m_gdtDatLoginKon; }
            set { m_gdtDatLoginKon.DbValue = value.DbValue; }
        } // end property

        /// <summary>pøihlašovací jméno uživatele s konkurenèním pøihlášením</summary>
        public GString LoginUzivKon {
            get { return m_gsLoginUzivKon; }
            set { m_gsLoginUzivKon.DbValue = value.DbValue; }
        } // end property

        /// <summary>sub verze ADZ</summary>
        public GInt16 SubVerzeAdz {
            get { return m_gnSubVerzeAdz; }
            set { m_gnSubVerzeAdz.DbValue = value.DbValue; }
        } // end property

        /// <summary>vodotisk</summary>
        public GString Vodotisk {
            get { return m_gsVodotisk; }
            set { m_gsVodotisk.DbValue = value.DbValue; }
        } // end property

        /// <summary>pøíznak testovací databáze</summary>
        public GInt16 PrizTest {
            get { return m_gnPrizTest; }
            set { m_gnPrizTest.DbValue = value.DbValue; }
        } // end property

        /// <summary>vzkaz pro testovací databázi</summary>
        public GString VzkazTest {
            get { return m_gsVzkazTest; }
            set { m_gsVzkazTest.DbValue = value.DbValue; }
        } // end property

        /// <summary>identifikátor externího uživatele typu veøejnost (tj. obèana)</summary>
        public GString IxsExu {
            get { return m_gsIxsExu; }
            set { m_gsIxsExu.DbValue = value.DbValue; }
        } // end property

        /// <summary>poøadové èíslo pøihlášení externího uživatele typu veøejnost (tj. obèana)</summary>
        public GInt32 PorCisExu {
            get { return m_gnPorCisExu; }
            set { m_gnPorCisExu.DbValue = value.DbValue; }
        } // end property

        /// <summary>identifikátor externího subjektu odpovídajícího aktuálnì pøihlášenému uživateli typu veøejnost (tj. obèanu)</summary>
        public GString IxsEsuExu {
            get { return m_gsIxsEsuExu; }
            set { m_gsIxsEsuExu.DbValue = value.DbValue; }
        } // end property

        /// <summary>licence zástupné osoby odpovídající aktuálnì pøihlášenému uživateli typu veøejnost (tj. obèanu)</summary>
        public GString LicEsuExu {
            get { return m_gsLicEsuExu; }
            set { m_gsLicEsuExu.DbValue = value.DbValue; }
        } // end property

        /// <summary>poøadové èíslo zástupné osoby odpovídající aktuálnì pøihlášenému uživateli typu veøejnost (tj. obèanu)</summary>
        public GInt32 PorZasExu {
            get { return m_gnPorZasExu; }
            set { m_gnPorZasExu.DbValue = value.DbValue; }
        } // end property

        /// <summary>stupeò pøidìlené dùvìryhodnosti uživatele typu veøejnost (tj. obèana)</summary>
        public GInt16 StuVerExu {
            get { return m_gnStuVerExu; }
            set { m_gnStuVerExu.DbValue = value.DbValue; }
        } // end property

        /// <summary>identifikátor konfiguraèní skupiny uživatele typu veøejnost (tj. obèana)</summary>
        public GString IxsUsrExu {
            get { return m_gsIxsUsrExu; }
            set { m_gsIxsUsrExu.DbValue = value.DbValue; }
        } // end property

        /// <summary>èas minulého úspìšného pøihlášení uživatele typu veøejnost (tj. obèana)</summary>
        public GDateTime LastLoginExu {
            get { return m_gdtLastLoginExu; }
            set { m_gdtLastLoginExu.DbValue = value.DbValue; }
        } // end property

        /// <summary>revize databáze</summary>
        public GInt32 RevizeAdz {
            get { return m_gnRevizeAdz; }
            set { m_gnRevizeAdz.DbValue = value.DbValue; }
        } // end property
        
        /// <summary>ièo</summary>
        public GString Ico {
            get { return m_gsIco; }
            set { m_gsIco.DbValue = value.DbValue; }
        } // end property

        /// <summary>id konfiguraèní skupiny</summary>
        public GString IxsUsr {
            get { return m_gsIxsUsr; }
            set { m_gsIxsUsr.DbValue = value.DbValue; }
        } // end property

        /// <summary>název konfiguraèní skupiny</summary>
        public GString NazevUsr {
            get { return m_gsNazevUsr; }
            set { m_gsNazevUsr.DbValue = value.DbValue; }
        } // end property

        /// <summary>poøadové èíslo nadøazeného pøihlášení</summary>
        public GInt32 LogPorCisloNad {
            get { return m_gnLogPorCisloNad; }
            set { m_gnLogPorCisloNad.DbValue = value.DbValue; }
        } // end property

        /// <summary>identifikátor nadøazeného pøihlášení</summary>
        public GString IxsLpcNad {
            get { return m_gsIxsLpcNad; }
            set { m_gsIxsLpcNad.DbValue = value.DbValue; }
        } // end property

        /// <summary>identifikátor navázaného externího subjektu pro aktuálního uživatele typu veøejnost</summary>
        public GString IxsPrevExu {
            get { return m_gsIxsPrevExu; }
            set { m_gsIxsPrevExu.DbValue = value.DbValue; }
        } // end property

        /// <summary>identifikátor navázaného externího uživatele typu veøejnost dle vazby na navázaný externí subjekt</summary>
        public GString IxsExuPrev {
            get { return m_gsIxsExuPrev; }
            set { m_gsIxsExuPrev.DbValue = value.DbValue; }
        } // end property

        /// <summary>identifikátor støediska spisových uzlù</summary>
        public GString IxsTre {
            get { return m_gsIxsTre; }
            set { m_gsIxsTre.DbValue = value.DbValue; }
        } // end property

        /// <summary>klíè pro vícefaktorovou autentizaci pomocí TOTP</summary>
        public GString TotpKey {
            get { return m_gsTotpKey; }
            set { m_gsTotpKey.DbValue = value.DbValue; }
        } // end property

        /// <summary>identifikátor primárnì pøihlášeného externího uživatele typu veøejnost</summary>
        public GString IxsExuLogin {
            get { return m_gsIxsExuLogin; }
            set { m_gsIxsExuLogin.DbValue = value.DbValue; }
        } // end property

        /// <summary>identifikátor externího subjektu odpovídajícího primárnì pøihlášenému uživateli typu veøejnost</summary>
        public GString IxsEsuExuLogin {
            get { return m_gsIxsEsuExuLogin; }
            set { m_gsIxsEsuExuLogin.DbValue = value.DbValue; }
        } // end property

        /// <summary>stupeò pøidìlené dùvìryhodnosti primárnì pøihlášeného uživatele typu veøejnost</summary>
        public GInt16 StuVerExuLogin {
            get { return m_gnStuVerExuLogin; }
            set { m_gnStuVerExuLogin.DbValue = value.DbValue; }
        } // end property

        /// <summary>èasový limit pro èekání na databázový zámek v sekundách</summary>
        /// <remarks>hodnota menší než jedna znamená použití výchozí hodnoty definované v objektu pro komunikaci s databází</remarks>
        public GInt16 LockTimeout {
            get { return m_gnLockTimeout; }
            set { m_gnLockTimeout.DbValue = value.DbValue; }
        } // end property

        /// <summary>èasový limit pro pøihlášení k databázi v sekundách</summary>
        /// <remarks>hodnota menší než jedna znamená použití výchozí hodnoty definované v objektu pro komunikaci s databází</remarks>
        public GInt16 CommandTimeout {
            get { return m_gnCommandTimeout; }
            set { m_gnCommandTimeout.DbValue = value.DbValue; }
        } // end property

        /// <summary>pøíznak vývojové databáze</summary>
        public GInt16 PrizVyvoj {
            get { return m_gnPrizVyvoj; }
            set { m_gnPrizVyvoj.DbValue = value.DbValue; }
        } // end property

        #endregion

        #region metody rozhraní IGSessionInfo

        /// <summary>serializace hodnot do XML</summary>
        /// <returns>serializovaný XML tvar</returns>
        XmlNode IGSessionInfo.ToXml() {
            IGSessionInfo l_oThis = (IGSessionInfo) this;
            XmlDocument l_oDocument = new XmlDocument();
            XmlElement l_oDocumentElement = l_oDocument.CreateElement(m_csSerializationName);
            XmlElement l_oElement = null;
            // èíslo chyby v autorizaèní proceduøe
            l_oElement = l_oDocument.CreateElement(m_csErrCode);
            l_oElement.InnerText = l_oThis.ErrCode.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // èíslo SQL chyby v autorizaèní proceduøe
            l_oElement = l_oDocument.CreateElement(m_csSqlErr);
            l_oElement.InnerText = l_oThis.SqlErr.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // èíslo ISAM chyby v autorizaèní proceduøe
            l_oElement = l_oDocument.CreateElement(m_csIsamErr);
            l_oElement.InnerText = l_oThis.IsamErr.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // text databázové chyby v autorizaèní proceduøe
            l_oElement = l_oDocument.CreateElement(m_csErrText);
            l_oElement.InnerText = l_oThis.ErrText.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // poøadové èíslo pøihlášení
            l_oElement = l_oDocument.CreateElement(m_csLogPorCislo);
            l_oElement.InnerText = l_oThis.LogPorCislo.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // id referenta
            l_oElement = l_oDocument.CreateElement(m_csIxsRef);
            l_oElement.InnerText = l_oThis.IxsRef.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // název referenta
            l_oElement = l_oDocument.CreateElement(m_csNazevRef);
            l_oElement.InnerText = l_oThis.NazevRef.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // zkratka referenta
            l_oElement = l_oDocument.CreateElement(m_csZkratka);
            l_oElement.InnerText = l_oThis.Zkratka.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // id funkce
            l_oElement = l_oDocument.CreateElement(m_csIxsFun);
            l_oElement.InnerText = l_oThis.IxsFun.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // název funkce
            l_oElement = l_oDocument.CreateElement(m_csNazevFun);
            l_oElement.InnerText = l_oThis.NazevFun.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // id pùvodce zmìny
            l_oElement = l_oDocument.CreateElement(m_csIxsZmp);
            l_oElement.InnerText = l_oThis.IxsZmp.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // priorita max
            l_oElement = l_oDocument.CreateElement(m_csPrioritaMax);
            l_oElement.InnerText = l_oThis.PrioritaMax.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // fc
            l_oElement = l_oDocument.CreateElement(m_csFc);
            l_oElement.InnerText = l_oThis.Fc.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // id organizaèní jednotky
            l_oElement = l_oDocument.CreateElement(m_csIxsOrj);
            l_oElement.InnerText = l_oThis.IxsOrj.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // název organizaèní jednotky
            l_oElement = l_oDocument.CreateElement(m_csNazevOrj);
            l_oElement.InnerText = l_oThis.NazevOrj.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // kódovaný název silného uživatele
            l_oElement = l_oDocument.CreateElement(m_csLdb);
            l_oElement.InnerText = l_oThis.Ldb.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // kódované heslo silného uživatele
            l_oElement = l_oDocument.CreateElement(m_csPdb);
            l_oElement.InnerText = l_oThis.Pdb.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // id instance
            l_oElement = l_oDocument.CreateElement(m_csIxsIns);
            l_oElement.InnerText = l_oThis.IxsIns.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // id spisového uzlu
            l_oElement = l_oDocument.CreateElement(m_csIxsSu);
            l_oElement.InnerText = l_oThis.IxsSu.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // licence databáze
            l_oElement = l_oDocument.CreateElement(m_csLicAdr);
            l_oElement.InnerText = l_oThis.LicAdr.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // pøíznak cs
            l_oElement = l_oDocument.CreateElement(m_csCsDb);
            l_oElement.InnerText = l_oThis.CsDb.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // typ instalace
            l_oElement = l_oDocument.CreateElement(m_csTypInst);
            l_oElement.InnerText = l_oThis.TypInst.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // pøíznak archivace
            l_oElement = l_oDocument.CreateElement(m_csPrizArchiv);
            l_oElement.InnerText = l_oThis.PrizArchiv.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // pøíznak blobù
            l_oElement = l_oDocument.CreateElement(m_csPrizBlob);
            l_oElement.InnerText = l_oThis.PrizBlob.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // id isu
            l_oElement = l_oDocument.CreateElement(m_csIxsIsu);
            l_oElement.InnerText = l_oThis.IxsIsu.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // vzkaz
            l_oElement = l_oDocument.CreateElement(m_csVzkazy);
            l_oElement.InnerText = l_oThis.Vzkazy.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // datum aktualizace
            l_oElement = l_oDocument.CreateElement(m_csDatAkt);
            l_oElement.InnerText = l_oThis.DatAkt.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // verze databáze
            l_oElement = l_oDocument.CreateElement(m_csVerzeDb);
            l_oElement.InnerText = l_oThis.VerzeDb.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // sub verze databáze
            l_oElement = l_oDocument.CreateElement(m_csSubVerzeDb);
            l_oElement.InnerText = l_oThis.SubVerzeDb.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // název rf
            l_oElement = l_oDocument.CreateElement(m_csNazevRf);
            l_oElement.InnerText = l_oThis.NazevRf.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // projekt
            l_oElement = l_oDocument.CreateElement(m_csProject);
            l_oElement.InnerText = l_oThis.Project.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // pøíznak d
            l_oElement = l_oDocument.CreateElement(m_csPrizD);
            l_oElement.InnerText = l_oThis.PrizD.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // název spisového uzlu
            l_oElement = l_oDocument.CreateElement(m_csNazevSu);
            l_oElement.InnerText = l_oThis.NazevSu.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // datum pøihlášení
            l_oElement = l_oDocument.CreateElement(m_csDatLogin);
            l_oElement.InnerText = l_oThis.DatLogin.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // název instance
            l_oElement = l_oDocument.CreateElement(m_csNazevIns);
            l_oElement.InnerText = l_oThis.NazevIns.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // datum vypršení platnosti
            l_oElement = l_oDocument.CreateElement(m_csDatExp);
            l_oElement.InnerText = l_oThis.DatExp.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // režim
            l_oElement = l_oDocument.CreateElement(m_csRezim);
            l_oElement.InnerText = l_oThis.Rezim.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // poøadí pro tøídìní
            l_oElement = l_oDocument.CreateElement(m_csPoradiLog);
            l_oElement.InnerText = l_oThis.PoradiLog.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // aktuální poèet pøihlášených funkcí na fázi
            l_oElement = l_oDocument.CreateElement(m_csAktuz);
            l_oElement.InnerText = l_oThis.Aktuz.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // typ agendy
            l_oElement = l_oDocument.CreateElement(m_csTypAg);
            l_oElement.InnerText = l_oThis.TypAg.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // identifikátor pøihlášení
            l_oElement = l_oDocument.CreateElement(m_csIxsLpc);
            l_oElement.InnerText = l_oThis.IxsLpc.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // výsledek autorizaèní procedury
            l_oElement = l_oDocument.CreateElement(m_csVysledek);
            l_oElement.InnerText = l_oThis.Vysledek.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // seznam fází k reinstalaci
            l_oElement = l_oDocument.CreateElement(m_csFazeToReinst);
            l_oElement.InnerText = l_oThis.FazeToReinst.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // pøíznak privilegované funkce
            l_oElement = l_oDocument.CreateElement(m_csPrizF);
            l_oElement.InnerText = l_oThis.PrizF.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // expirace vstupenky do systému
            l_oElement = l_oDocument.CreateElement(m_csExpTic);
            l_oElement.InnerText = l_oThis.ExpTic.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // identifikátor relace databázového stroje
            l_oElement = l_oDocument.CreateElement(m_csSessid);
            l_oElement.InnerText = l_oThis.Sessid.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // poøadové èíslo konkurenèního pøihlášení
            l_oElement = l_oDocument.CreateElement(m_csLogPorCisloKon);
            l_oElement.InnerText = l_oThis.LogPorCisloKon.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // název referenta s konkurenèním pøihlášením
            l_oElement = l_oDocument.CreateElement(m_csNazevRefKon);
            l_oElement.InnerText = l_oThis.NazevRefKon.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // adresa poèítaèe s konkurenèním pøihlášením
            l_oElement = l_oDocument.CreateElement(m_csIpAdrKon);
            l_oElement.InnerText = l_oThis.IpAdrKon.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // datum pøihlášení uživatele s konkurenèním pøihlášením
            l_oElement = l_oDocument.CreateElement(m_csDatLoginKon);
            l_oElement.InnerText = l_oThis.DatLoginKon.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // pøihlašovací jméno uživatele s konkurenèním pøihlášením
            l_oElement = l_oDocument.CreateElement(m_csLoginUzivKon);
            l_oElement.InnerText = l_oThis.LoginUzivKon.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // sub verze ADZ
            l_oElement = l_oDocument.CreateElement(m_csSubVerzeAdz);
            l_oElement.InnerText = l_oThis.SubVerzeAdz.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // vodotisk
            l_oElement = l_oDocument.CreateElement(m_csVodotisk);
            l_oElement.InnerText = l_oThis.Vodotisk.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // pøíznak testovací databáze
            l_oElement = l_oDocument.CreateElement(m_csPrizTest);
            l_oElement.InnerText = l_oThis.PrizTest.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // vzkaz pro testovací databázi
            l_oElement = l_oDocument.CreateElement(m_csVzkazTest);
            l_oElement.InnerText = l_oThis.VzkazTest.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // identifikátor externího uživatele typu veøejnost
            l_oElement = l_oDocument.CreateElement(m_csIxsExu);
            l_oElement.InnerText = l_oThis.IxsExu.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // poøadové èíslo pøihlášení externího uživatele typu veøejnost
            l_oElement = l_oDocument.CreateElement(m_csPorCisExu);
            l_oElement.InnerText = l_oThis.PorCisExu.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // identifikátor externího subjektu odpovídajícího aktuálnì pøihlášenému uživateli typu veøejnost
            l_oElement = l_oDocument.CreateElement(m_csIxsEsuExu);
            l_oElement.InnerText = l_oThis.IxsEsuExu.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // licence zástupné osoby odpovídající aktuálnì pøihlášenému uživateli typu veøejnost
            l_oElement = l_oDocument.CreateElement(m_csLicEsuExu);
            l_oElement.InnerText = l_oThis.LicEsuExu.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // poøadové èíslo zástupné osoby odpovídající aktuálnì pøihlášenému uživateli typu veøejnost
            l_oElement = l_oDocument.CreateElement(m_csPorZasExu);
            l_oElement.InnerText = l_oThis.PorZasExu.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // stupeò pøidìlené dùvìryhodnosti uživatele typu veøejnost
            l_oElement = l_oDocument.CreateElement(m_csStuVerExu);
            l_oElement.InnerText = l_oThis.StuVerExu.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // identifikátor konfiguraèní skupiny uživatele typu veøejnost
            l_oElement = l_oDocument.CreateElement(m_csIxsUsrExu);
            l_oElement.InnerText = l_oThis.IxsUsrExu.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // èas minulého úspìšného pøihlášení uživatele typu veøejnost
            l_oElement = l_oDocument.CreateElement(m_csLastLoginExu);
            l_oElement.InnerText = l_oThis.LastLoginExu.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // revize databáze
            l_oElement = l_oDocument.CreateElement(m_csRevizeAdz);
            l_oElement.InnerText = l_oThis.RevizeAdz.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // ièo
            l_oElement = l_oDocument.CreateElement(m_csIco);
            l_oElement.InnerText = l_oThis.Ico.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // id konfiguraèní skupiny
            l_oElement = l_oDocument.CreateElement(m_csIxsUsr);
            l_oElement.InnerText = l_oThis.IxsUsr.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // název konfiguraèní skupiny
            l_oElement = l_oDocument.CreateElement(m_csNazevUsr);
            l_oElement.InnerText = l_oThis.NazevUsr.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // poøadové èíslo nadøazeného pøihlášení
            l_oElement = l_oDocument.CreateElement(m_csLogPorCisloNad);
            l_oElement.InnerText = l_oThis.LogPorCisloNad.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // identifikátor nadøazeného pøihlášení
            l_oElement = l_oDocument.CreateElement(m_csIxsLpcNad);
            l_oElement.InnerText = l_oThis.IxsLpcNad.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // identifikátor navázaného externího subjektu pro aktuálního uživatele typu veøejnost
            l_oElement = l_oDocument.CreateElement(m_csIxsPrevExu);
            l_oElement.InnerText = l_oThis.IxsPrevExu.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // identifikátor navázaného externího uživatele typu veøejnost dle vazby na navázaný externí subjekt
            l_oElement = l_oDocument.CreateElement(m_csIxsExuPrev);
            l_oElement.InnerText = l_oThis.IxsExuPrev.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // identifikátor støediska spisových uzlù
            l_oElement = l_oDocument.CreateElement(m_csIxsTre);
            l_oElement.InnerText = l_oThis.IxsTre.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // klíè pro vícefaktorovou autentizaci pomocí TOTP
            l_oElement = l_oDocument.CreateElement(m_csTotpKey);
            l_oElement.InnerText = l_oThis.TotpKey.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // identifikátor primárnì pøihlášeného externího uživatele typu veøejnost
            l_oElement = l_oDocument.CreateElement(m_csIxsExuLogin);
            l_oElement.InnerText = l_oThis.IxsExuLogin.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // identifikátor externího subjektu odpovídajícího primárnì pøihlášenému uživateli typu veøejnost
            l_oElement = l_oDocument.CreateElement(m_csIxsEsuExuLogin);
            l_oElement.InnerText = l_oThis.IxsEsuExuLogin.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // stupeò pøidìlené dùvìryhodnosti primárnì pøihlášeného uživatele typu veøejnost
            l_oElement = l_oDocument.CreateElement(m_csStuVerExuLogin);
            l_oElement.InnerText = l_oThis.StuVerExuLogin.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // èasový limit pro èekání na databázový zámek
            l_oElement = l_oDocument.CreateElement(m_csLockTimeout);
            l_oElement.InnerText = l_oThis.LockTimeout.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // èasový limit pro vykonání databázového pøíkazu
            l_oElement = l_oDocument.CreateElement(m_csCommandTimeout);
            l_oElement.InnerText = l_oThis.CommandTimeout.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // pøíznak vývojové databáze
            l_oElement = l_oDocument.CreateElement(m_csPrizVyvoj);
            l_oElement.InnerText = l_oThis.PrizVyvoj.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // zkratka spisového uzlu
            l_oElement = l_oDocument.CreateElement(m_csZkratkaSu);
            l_oElement.InnerText = l_oThis.ZkratkaSu.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // vrácení serializovaného tvaru
            return l_oDocument.AppendChild(l_oDocumentElement);
        } // end method

        /// <summary>deserializace hodnot z XML</summary>
        /// <param name="node">serializovaný XML tvar</param>
        void IGSessionInfo.ParseXml(XmlNode node) {
            IGSessionInfo l_oThis = (IGSessionInfo) this;
            XmlNode l_oNode = null;
            string l_sMissingElement = String.Empty;
            // kontrola parametru
            if(node==null || node is XmlElement==false) throw new GException(23200232,ThisAssembly); // nelze provést deserializaci informací o autorizované relaci, nesprávný parametr
            if(node.LocalName!=m_csSerializationName || node.NamespaceURI!=String.Empty) throw new GException(23200233,ThisAssembly); // nelze provést deserializaci informací o autorizované relaci, nesprávná koøenová položka
            // deserializace hodnot
            try {
                do {
                    // èíslo chyby v autorizaèní proceduøe
                    if((l_oNode=node.SelectSingleNode(m_csErrCode)) == null) {l_sMissingElement=m_csErrCode; break;}
                    l_oThis.ErrCode = l_oNode.InnerText==String.Empty ? GInt32.Null : GInt32.Parse(l_oNode.InnerText);
                    // èíslo SQL chyby v autorizaèní proceduøe
                    if((l_oNode=node.SelectSingleNode(m_csSqlErr)) == null) {l_sMissingElement=m_csSqlErr; break;}
                    l_oThis.SqlErr = l_oNode.InnerText==String.Empty ? GInt32.Null : GInt32.Parse(l_oNode.InnerText);
                    // èíslo ISAM chyby v autorizaèní proceduøe
                    if((l_oNode=node.SelectSingleNode(m_csIsamErr)) == null) {l_sMissingElement=m_csIsamErr; break;}
                    l_oThis.IsamErr = l_oNode.InnerText==String.Empty ? GInt32.Null : GInt32.Parse(l_oNode.InnerText);
                    // text databázové chyby v autorizaèní proceduøe
                    if((l_oNode=node.SelectSingleNode(m_csErrText)) == null) {l_sMissingElement=m_csErrText; break;}
                    l_oThis.ErrText = new GString(l_oNode.InnerText,l_oThis.ErrText.MaxSize);
                    // poøadové èíslo pøihlášení
                    if((l_oNode=node.SelectSingleNode(m_csLogPorCislo)) == null) {l_sMissingElement=m_csLogPorCislo; break;}
                    l_oThis.LogPorCislo = l_oNode.InnerText==String.Empty ? GInt32.Null : GInt32.Parse(l_oNode.InnerText);
                    // id referenta
                    if((l_oNode=node.SelectSingleNode(m_csIxsRef)) == null) {l_sMissingElement=m_csIxsRef; break;}
                    l_oThis.IxsRef = new GString(l_oNode.InnerText,l_oThis.IxsRef.MaxSize);
                    // název referenta
					if((l_oNode=node.SelectSingleNode(m_csNazevRef)) == null) {l_sMissingElement=m_csNazevRef; break;}
					l_oThis.NazevRef = new GString(l_oNode.InnerText,l_oThis.NazevRef.MaxSize);
                    // zkratka referenta
					if((l_oNode=node.SelectSingleNode(m_csZkratka)) == null) {l_sMissingElement=m_csZkratka; break;}
					l_oThis.Zkratka = new GString(l_oNode.InnerText,l_oThis.Zkratka.MaxSize);
                    // id funkce
					if((l_oNode=node.SelectSingleNode(m_csIxsFun)) == null) {l_sMissingElement=m_csIxsFun; break;}
					l_oThis.IxsFun = new GString(l_oNode.InnerText,l_oThis.IxsFun.MaxSize);
                    // název funkce
					if((l_oNode=node.SelectSingleNode(m_csNazevFun)) == null) {l_sMissingElement=m_csNazevFun; break;}
					l_oThis.NazevFun = new GString(l_oNode.InnerText,l_oThis.NazevFun.MaxSize);
                    // id pùvodce zmìny
					if((l_oNode=node.SelectSingleNode(m_csIxsZmp)) == null) {l_sMissingElement=m_csIxsZmp; break;}
					l_oThis.IxsZmp = new GString(l_oNode.InnerText,l_oThis.IxsZmp.MaxSize);
                    // priorita max
					if((l_oNode=node.SelectSingleNode(m_csPrioritaMax)) == null) {l_sMissingElement=m_csPrioritaMax; break;}
					l_oThis.PrioritaMax = l_oNode.InnerText==String.Empty ? GInt32.Null : GInt32.Parse(l_oNode.InnerText);
                    // fc
					if((l_oNode=node.SelectSingleNode(m_csFc)) == null) {l_sMissingElement=m_csFc; break;}
					l_oThis.Fc = new GString(l_oNode.InnerText,l_oThis.Fc.MaxSize);
                    // id organizaèní jednotky
					if((l_oNode=node.SelectSingleNode(m_csIxsOrj)) == null) {l_sMissingElement=m_csIxsOrj; break;}
					l_oThis.IxsOrj = new GString(l_oNode.InnerText,l_oThis.IxsOrj.MaxSize);
                    // název organizaèní jednotky
					if((l_oNode=node.SelectSingleNode(m_csNazevOrj)) == null) {l_sMissingElement=m_csNazevOrj; break;}
					l_oThis.NazevOrj = new GString(l_oNode.InnerText,l_oThis.NazevOrj.MaxSize);
                    // kódovaný název silného uživatele
					if((l_oNode=node.SelectSingleNode(m_csLdb)) == null) {l_sMissingElement=m_csLdb; break;}
					l_oThis.Ldb = new GString(l_oNode.InnerText,l_oThis.Ldb.MaxSize);
                    // kódované heslo silného uživatele
					if((l_oNode=node.SelectSingleNode(m_csPdb)) == null) {l_sMissingElement=m_csPdb; break;}
					l_oThis.Pdb = new GString(l_oNode.InnerText,l_oThis.Pdb.MaxSize);
                    // id instance
					if((l_oNode=node.SelectSingleNode(m_csIxsIns)) == null) {l_sMissingElement=m_csIxsIns; break;}
					l_oThis.IxsIns = new GString(l_oNode.InnerText,l_oThis.IxsIns.MaxSize);
                    // id spisového uzlu
					if((l_oNode=node.SelectSingleNode(m_csIxsSu)) == null) {l_sMissingElement=m_csIxsSu; break;}
					l_oThis.IxsSu = new GString(l_oNode.InnerText,l_oThis.IxsSu.MaxSize);
                    // licence databáze
					if((l_oNode=node.SelectSingleNode(m_csLicAdr)) == null) {l_sMissingElement=m_csLicAdr; break;}
					l_oThis.LicAdr = new GString(l_oNode.InnerText,l_oThis.LicAdr.MaxSize);
                    // pøíznak cs
					if((l_oNode=node.SelectSingleNode(m_csCsDb)) == null) {l_sMissingElement=m_csCsDb; break;}
					l_oThis.CsDb = l_oNode.InnerText==String.Empty ? GInt32.Null : GInt32.Parse(l_oNode.InnerText);
                    // typ instalace
					if((l_oNode=node.SelectSingleNode(m_csTypInst)) == null) {l_sMissingElement=m_csTypInst; break;}
					l_oThis.TypInst = l_oNode.InnerText==String.Empty ? GInt32.Null : GInt32.Parse(l_oNode.InnerText);
                    // pøíznak archivace
					if((l_oNode=node.SelectSingleNode(m_csPrizArchiv)) == null) {l_sMissingElement=m_csPrizArchiv; break;}
					l_oThis.PrizArchiv = l_oNode.InnerText==String.Empty ? GInt32.Null : GInt32.Parse(l_oNode.InnerText);
                    // pøíznak blobù
					if((l_oNode=node.SelectSingleNode(m_csPrizBlob)) == null) {l_sMissingElement=m_csPrizBlob; break;}
					l_oThis.PrizBlob = l_oNode.InnerText==String.Empty ? GInt32.Null : GInt32.Parse(l_oNode.InnerText);
                    // id isu
					if((l_oNode=node.SelectSingleNode(m_csIxsIsu)) == null) {l_sMissingElement=m_csIxsIsu; break;}
					l_oThis.IxsIsu = new GString(l_oNode.InnerText,l_oThis.IxsIsu.MaxSize);
                    // vzkaz
					if((l_oNode=node.SelectSingleNode(m_csVzkazy)) == null) {l_sMissingElement=m_csVzkazy; break;}
					l_oThis.Vzkazy = new GString(l_oNode.InnerText,l_oThis.Vzkazy.MaxSize);
                    // datum aktualizace
					if((l_oNode=node.SelectSingleNode(m_csDatAkt)) == null) {l_sMissingElement=m_csDatAkt; break;}
					l_oThis.DatAkt = l_oNode.InnerText==String.Empty ? GDateTime.Null : GDateTime.Parse(l_oNode.InnerText);
                    // verze databáze
					if((l_oNode=node.SelectSingleNode(m_csVerzeDb)) == null) {l_sMissingElement=m_csVerzeDb; break;}
					l_oThis.VerzeDb = l_oNode.InnerText==String.Empty ? GInt32.Null : GInt32.Parse(l_oNode.InnerText);
                    // sub verze databáze
					if((l_oNode=node.SelectSingleNode(m_csSubVerzeDb)) == null) {l_sMissingElement=m_csSubVerzeDb; break;}
					l_oThis.SubVerzeDb = l_oNode.InnerText==String.Empty ? GInt32.Null : GInt32.Parse(l_oNode.InnerText);
                    // název rf
					if((l_oNode=node.SelectSingleNode(m_csNazevRf)) == null) {l_sMissingElement=m_csNazevRf; break;}
					l_oThis.NazevRf = new GString(l_oNode.InnerText,l_oThis.NazevRf.MaxSize);
                    // projekt
					if((l_oNode=node.SelectSingleNode(m_csProject)) == null) {l_sMissingElement=m_csProject; break;}
					l_oThis.Project = new GString(l_oNode.InnerText,l_oThis.Project.MaxSize);
                    // pøíznak d
					if((l_oNode=node.SelectSingleNode(m_csPrizD)) == null) {l_sMissingElement=m_csPrizD; break;}
					l_oThis.PrizD = l_oNode.InnerText==String.Empty ? GInt32.Null : GInt32.Parse(l_oNode.InnerText);
                    // název spisového uzlu
					if((l_oNode=node.SelectSingleNode(m_csNazevSu)) == null) {l_sMissingElement=m_csNazevSu; break;}
					l_oThis.NazevSu = new GString(l_oNode.InnerText,l_oThis.NazevSu.MaxSize);
                    // datum pøihlášení
					if((l_oNode=node.SelectSingleNode(m_csDatLogin)) == null) {l_sMissingElement=m_csDatLogin; break;}
					l_oThis.DatLogin = l_oNode.InnerText==String.Empty ? GDateTime.Null : GDateTime.Parse(l_oNode.InnerText);
                    // název instance
					if((l_oNode=node.SelectSingleNode(m_csNazevIns)) == null) {l_sMissingElement=m_csNazevIns; break;}
					l_oThis.NazevIns = new GString(l_oNode.InnerText,l_oThis.NazevIns.MaxSize);
                    // datum vypršení platnosti
					if((l_oNode=node.SelectSingleNode(m_csDatExp)) == null) {l_sMissingElement=m_csDatExp; break;}
					l_oThis.DatExp = l_oNode.InnerText==String.Empty ? GDateTime.Null : GDateTime.Parse(l_oNode.InnerText);
                    // režim
					if((l_oNode=node.SelectSingleNode(m_csRezim)) == null) {l_sMissingElement=m_csRezim; break;}
					l_oThis.Rezim = l_oNode.InnerText==String.Empty ? GInt32.Null : GInt32.Parse(l_oNode.InnerText);
                    // poøadí pro tøídìní
					if((l_oNode=node.SelectSingleNode(m_csPoradiLog)) == null) {l_sMissingElement=m_csPoradiLog; break;}
					l_oThis.PoradiLog = l_oNode.InnerText==String.Empty ? GInt32.Null : GInt32.Parse(l_oNode.InnerText);
                    // aktuální poèet pøihlášených funkcí na fázi
					if((l_oNode=node.SelectSingleNode(m_csAktuz)) == null) {l_sMissingElement=m_csAktuz; break;}
					l_oThis.Aktuz = l_oNode.InnerText==String.Empty ? GInt32.Null : GInt32.Parse(l_oNode.InnerText);
                    // typ agendy
					if((l_oNode=node.SelectSingleNode(m_csTypAg)) == null) {l_sMissingElement=m_csTypAg; break;}
					l_oThis.TypAg = l_oNode.InnerText==String.Empty ? GInt16.Null : GInt16.Parse(l_oNode.InnerText);
                    // identifikátor pøihlášení
                    if((l_oNode=node.SelectSingleNode(m_csIxsLpc)) == null) { l_sMissingElement=m_csIxsLpc; break; }
                    l_oThis.IxsLpc = new GString(l_oNode.InnerText,l_oThis.IxsLpc.MaxSize);
                    // výsledek autorizaèní procedury
                    if((l_oNode=node.SelectSingleNode(m_csVysledek)) == null) { l_sMissingElement=m_csVysledek; break; }
                    l_oThis.Vysledek = l_oNode.InnerText==String.Empty ? GInt32.Null : GInt32.Parse(l_oNode.InnerText);
                    // seznam fází k reinstalaci
                    if((l_oNode=node.SelectSingleNode(m_csFazeToReinst)) == null) { l_sMissingElement=m_csFazeToReinst; break; }
                    l_oThis.FazeToReinst = new GString(l_oNode.InnerText,l_oThis.FazeToReinst.MaxSize);
                    // pøíznak privilegované funkce
                    if((l_oNode=node.SelectSingleNode(m_csPrizF)) == null) {l_sMissingElement=m_csPrizF; break;}
					l_oThis.PrizF = l_oNode.InnerText==String.Empty ? GInt16.Null : GInt16.Parse(l_oNode.InnerText);
                    // expirace vstupenky do systému
					if((l_oNode=node.SelectSingleNode(m_csExpTic)) == null) {l_sMissingElement=m_csExpTic; break;}
					l_oThis.ExpTic = l_oNode.InnerText==String.Empty ? GInt32.Null : GInt32.Parse(l_oNode.InnerText);
                    // identifikátor relace databázového stroje
                    if((l_oNode=node.SelectSingleNode(m_csSessid)) == null) {l_sMissingElement=m_csSessid; break;}
					l_oThis.Sessid = l_oNode.InnerText==String.Empty ? GInt64.Null : GInt64.Parse(l_oNode.InnerText);
                    // poøadové èíslo konkurenèního pøihlášení
                    if((l_oNode=node.SelectSingleNode(m_csLogPorCisloKon)) == null) {l_sMissingElement=m_csLogPorCisloKon; break;}
					l_oThis.LogPorCisloKon = l_oNode.InnerText==String.Empty ? GInt32.Null : GInt32.Parse(l_oNode.InnerText);
                    // název referenta s konkurenèním pøihlášením
                    if((l_oNode=node.SelectSingleNode(m_csNazevRefKon)) == null) { l_sMissingElement=m_csNazevRefKon; break; }
                    l_oThis.NazevRefKon = new GString(l_oNode.InnerText,l_oThis.NazevRefKon.MaxSize);
                    // adresa poèítaèe s konkurenèním pøihlášením
                    if((l_oNode=node.SelectSingleNode(m_csIpAdrKon)) == null) { l_sMissingElement=m_csIpAdrKon; break; }
                    l_oThis.IpAdrKon = new GString(l_oNode.InnerText,l_oThis.IpAdrKon.MaxSize);
                    // datum pøihlášení uživatele s konkurenèním pøihlášením
                    if((l_oNode=node.SelectSingleNode(m_csDatLoginKon)) == null) {l_sMissingElement=m_csDatLoginKon; break;}
					l_oThis.DatLoginKon = l_oNode.InnerText==String.Empty ? GDateTime.Null : GDateTime.Parse(l_oNode.InnerText);
                    // pøihlašovací jméno uživatele s konkurenèním pøihlášením
                    if((l_oNode=node.SelectSingleNode(m_csLoginUzivKon)) == null) { l_sMissingElement=m_csLoginUzivKon; break; }
                    l_oThis.LoginUzivKon = new GString(l_oNode.InnerText,l_oThis.LoginUzivKon.MaxSize);
                    // sub verze ADZ
					if((l_oNode=node.SelectSingleNode(m_csSubVerzeAdz)) == null) {l_sMissingElement=m_csSubVerzeAdz; break;}
					l_oThis.SubVerzeAdz = l_oNode.InnerText==String.Empty ? GInt16.Null : GInt16.Parse(l_oNode.InnerText);
                    // vodotisk
                    if((l_oNode=node.SelectSingleNode(m_csVodotisk)) == null) { l_sMissingElement=m_csVodotisk; break; }
                    l_oThis.Vodotisk = new GString(l_oNode.InnerText,l_oThis.Vodotisk.MaxSize);
                    // pøíznak testovací databáze
					if((l_oNode=node.SelectSingleNode(m_csPrizTest)) == null) {l_sMissingElement=m_csPrizTest; break;}
					l_oThis.PrizTest = l_oNode.InnerText==String.Empty ? GInt16.Null : GInt16.Parse(l_oNode.InnerText);
                    // vzkaz pro testovací databázi
                    if((l_oNode=node.SelectSingleNode(m_csVzkazTest)) == null) { l_sMissingElement=m_csVzkazTest; break; }
                    l_oThis.VzkazTest = new GString(l_oNode.InnerText,l_oThis.VzkazTest.MaxSize);
                    // identifikátor externího uživatele typu veøejnost
                    if((l_oNode=node.SelectSingleNode(m_csIxsExu)) == null) { l_sMissingElement=m_csIxsExu; break; }
                    l_oThis.IxsExu = new GString(l_oNode.InnerText,l_oThis.IxsExu.MaxSize);
                    // poøadové èíslo pøihlášení externího uživatele typu veøejnost
                    if((l_oNode=node.SelectSingleNode(m_csPorCisExu)) == null) { l_sMissingElement=m_csPorCisExu; break; }
                    l_oThis.PorCisExu = l_oNode.InnerText==String.Empty ? GInt32.Null : GInt32.Parse(l_oNode.InnerText);
                    // identifikátor externího subjektu odpovídajícího aktuálnì pøihlášenému uživateli typu veøejnost
                    if((l_oNode=node.SelectSingleNode(m_csIxsEsuExu)) == null) { l_sMissingElement=m_csIxsEsuExu; break; }
                    l_oThis.IxsEsuExu = new GString(l_oNode.InnerText,l_oThis.IxsEsuExu.MaxSize);
                    // licence zástupné osoby odpovídající aktuálnì pøihlášenému uživateli typu veøejnost
                    if((l_oNode=node.SelectSingleNode(m_csLicEsuExu)) == null) { l_sMissingElement=m_csLicEsuExu; break; }
                    l_oThis.LicEsuExu = new GString(l_oNode.InnerText,l_oThis.LicEsuExu.MaxSize);
                    // poøadové èíslo zástupné osoby odpovídající aktuálnì pøihlášenému uživateli typu veøejnost
                    if((l_oNode=node.SelectSingleNode(m_csPorZasExu)) == null) { l_sMissingElement=m_csPorZasExu; break; }
                    l_oThis.PorZasExu = l_oNode.InnerText==String.Empty ? GInt32.Null : GInt32.Parse(l_oNode.InnerText);
                    // stupeò pøidìlené dùvìryhodnosti uživatele typu veøejnost
                    if((l_oNode=node.SelectSingleNode(m_csStuVerExu)) == null) { l_sMissingElement=m_csStuVerExu; break; }
                    l_oThis.StuVerExu = l_oNode.InnerText==String.Empty ? GInt16.Null : GInt16.Parse(l_oNode.InnerText);
                    // identifikátor konfiguraèní skupiny uživatele typu veøejnost
                    if((l_oNode=node.SelectSingleNode(m_csIxsUsrExu)) == null) { l_sMissingElement=m_csIxsUsrExu; break; }
                    l_oThis.IxsUsrExu = new GString(l_oNode.InnerText,l_oThis.IxsUsrExu.MaxSize);
                    // èas minulého úspìšného pøihlášení uživatele typu veøejnost
                    if((l_oNode=node.SelectSingleNode(m_csLastLoginExu)) == null) { l_sMissingElement=m_csLastLoginExu; break; }
                    l_oThis.LastLoginExu = l_oNode.InnerText==String.Empty ? GDateTime.Null : GDateTime.Parse(l_oNode.InnerText);
                    // revize databáze
                    if((l_oNode = node.SelectSingleNode(m_csRevizeAdz)) == null) { l_sMissingElement = m_csRevizeAdz; break; }
                    l_oThis.RevizeAdz = l_oNode.InnerText == String.Empty ? GInt32.Null : GInt32.Parse(l_oNode.InnerText);
                    // ièo
                    if((l_oNode=node.SelectSingleNode(m_csIco)) == null) { l_sMissingElement=m_csIco; break; }
                    l_oThis.Ico = new GString(l_oNode.InnerText,l_oThis.Ico.MaxSize);
                    // id konfiguraèní skupiny
                    if((l_oNode=node.SelectSingleNode(m_csIxsUsr)) == null) { l_sMissingElement=m_csIxsUsr; break; }
                    l_oThis.IxsUsr = new GString(l_oNode.InnerText,l_oThis.IxsUsr.MaxSize);
                    // název konfiguraèní skupiny
                    if((l_oNode=node.SelectSingleNode(m_csNazevUsr)) == null) { l_sMissingElement=m_csNazevUsr; break; }
                    l_oThis.NazevUsr = new GString(l_oNode.InnerText,l_oThis.NazevUsr.MaxSize);
                    // poøadové èíslo nadøazeného pøihlášení
                    if((l_oNode = node.SelectSingleNode(m_csLogPorCisloNad)) == null) { l_sMissingElement = m_csLogPorCisloNad; break; }
                    l_oThis.LogPorCisloNad = l_oNode.InnerText == String.Empty ? GInt32.Null : GInt32.Parse(l_oNode.InnerText);
                    // identifikátor nadøazeného pøihlášení
                    if((l_oNode = node.SelectSingleNode(m_csIxsLpcNad)) == null) { l_sMissingElement = m_csIxsLpcNad; break; }
                    l_oThis.IxsLpcNad = new GString(l_oNode.InnerText,l_oThis.IxsLpcNad.MaxSize); 
                    // identifikátor navázaného externího subjektu pro aktuálního uživatele typu veøejnost
                    if((l_oNode = node.SelectSingleNode(m_csIxsPrevExu)) == null) { l_sMissingElement = m_csIxsPrevExu; break; }
                    l_oThis.IxsPrevExu = new GString(l_oNode.InnerText,l_oThis.IxsPrevExu.MaxSize); 
                    // identifikátor navázaného externího uživatele typu veøejnost dle vazby na navázaný externí subjekt
                    if((l_oNode = node.SelectSingleNode(m_csIxsExuPrev)) == null) { l_sMissingElement = m_csIxsExuPrev; break; }
                    l_oThis.IxsExuPrev = new GString(l_oNode.InnerText,l_oThis.IxsExuPrev.MaxSize); 
                    // identifikátor støediska spisových uzlù
                    if((l_oNode = node.SelectSingleNode(m_csIxsTre)) == null) { l_sMissingElement = m_csIxsTre; break; }
                    l_oThis.IxsTre = new GString(l_oNode.InnerText,l_oThis.IxsTre.MaxSize);
                    // klíè pro vícefaktorovou autentizaci pomocí TOTP
                    if((l_oNode = node.SelectSingleNode(m_csTotpKey)) == null) { l_sMissingElement = m_csTotpKey; break; }
                    l_oThis.TotpKey = new GString(l_oNode.InnerText,l_oThis.TotpKey.MaxSize);
                    // identifikátor primárnì pøihlášeného externího uživatele typu veøejnost
                    if((l_oNode = node.SelectSingleNode(m_csIxsExuLogin)) == null) { l_sMissingElement = m_csIxsExuLogin; break; }
                    l_oThis.IxsExuLogin = new GString(l_oNode.InnerText,l_oThis.IxsExuLogin.MaxSize);
                    // identifikátor externího subjektu odpovídajícího primárnì pøihlášenému uživateli typu veøejnost
                    if((l_oNode = node.SelectSingleNode(m_csIxsEsuExuLogin)) == null) { l_sMissingElement = m_csIxsEsuExuLogin; break; }
                    l_oThis.IxsEsuExuLogin = new GString(l_oNode.InnerText,l_oThis.IxsEsuExuLogin.MaxSize);
                    // stupeò pøidìlené dùvìryhodnosti primárnì pøihlášeného uživatele typu veøejnost
                    if((l_oNode = node.SelectSingleNode(m_csStuVerExuLogin)) == null) { l_sMissingElement = m_csStuVerExuLogin; break; }
                    l_oThis.StuVerExuLogin = l_oNode.InnerText==String.Empty ? GInt16.Null : GInt16.Parse(l_oNode.InnerText);
                    // èasový limit pro èekání na databázový zámek
                    if((l_oNode = node.SelectSingleNode(m_csLockTimeout)) == null) { l_sMissingElement = m_csLockTimeout; break; }
                    l_oThis.LockTimeout = l_oNode.InnerText==String.Empty ? GInt16.Null : GInt16.Parse(l_oNode.InnerText);
                    // èasový limit pro vykonání databázového pøíkazu
                    if((l_oNode = node.SelectSingleNode(m_csCommandTimeout)) == null) { l_sMissingElement = m_csCommandTimeout; break; }
                    l_oThis.CommandTimeout = l_oNode.InnerText==String.Empty ? GInt16.Null : GInt16.Parse(l_oNode.InnerText);
                    // pøíznak vývojové databáze
                    if((l_oNode = node.SelectSingleNode(m_csPrizVyvoj)) == null) { l_sMissingElement = m_csPrizVyvoj; break; }
                    l_oThis.PrizVyvoj = l_oNode.InnerText==String.Empty ? GInt16.Null : GInt16.Parse(l_oNode.InnerText);
                    // zkratka spisového uzlu
                    l_oNode = node.SelectSingleNode(m_csZkratkaSu);
                    l_oThis.ZkratkaSu = new GString(l_oNode == null ? String.Empty : l_oNode.InnerText,l_oThis.ZkratkaSu.MaxSize);
                } while(false);
            } // end try
            catch(Exception e) {
                throw new GException(23200234,ThisAssembly,e); // selhal pokus o deserializaci informací o autorizované relaci
            } // end catch
            if(l_sMissingElement != String.Empty) throw new GException(23200235,ThisAssembly,l_sMissingElement); // nelze provést deserializaci informací o autorizované relaci, nenalezena položka {0}
        } // end method

        #endregion

        #region konstruktory

        /// <summary>veøejný konstruktor</summary>
        public GSessionInfo() {}

        /// <summary>veøejný konstruktor</summary>
        /// <param name="sessionInfo">rozhraní na informace o autorizované relaci</param>
        public GSessionInfo(IGSessionInfo sessionInfo) {
            IGSessionInfo l_oThis = this as IGSessionInfo;
            l_oThis.ErrCode = sessionInfo.ErrCode.Clone() as GInt32;
            l_oThis.SqlErr = sessionInfo.SqlErr.Clone() as GInt32;
            l_oThis.IsamErr = sessionInfo.IsamErr.Clone() as GInt32;
            l_oThis.ErrText = sessionInfo.ErrText.Clone() as GString;
            l_oThis.LogPorCislo = sessionInfo.LogPorCislo.Clone() as GInt32;
            l_oThis.IxsRef = sessionInfo.IxsRef.Clone() as GString;
            l_oThis.NazevRef = sessionInfo.NazevRef.Clone() as GString;
            l_oThis.Zkratka = sessionInfo.Zkratka.Clone() as GString;
            l_oThis.IxsFun = sessionInfo.IxsFun.Clone() as GString;
            l_oThis.NazevFun = sessionInfo.NazevFun.Clone() as GString;
            l_oThis.IxsZmp = sessionInfo.IxsZmp.Clone() as GString;
            l_oThis.PrioritaMax = sessionInfo.PrioritaMax.Clone() as GInt32;
            l_oThis.Fc = sessionInfo.Fc.Clone() as GString;
            l_oThis.IxsOrj = sessionInfo.IxsOrj.Clone() as GString;
            l_oThis.NazevOrj = sessionInfo.NazevOrj.Clone() as GString;
            l_oThis.Ldb = sessionInfo.Ldb.Clone() as GString;
            l_oThis.Pdb = sessionInfo.Pdb.Clone() as GString;
            l_oThis.IxsIns = sessionInfo.IxsIns.Clone() as GString;
            l_oThis.IxsSu = sessionInfo.IxsSu.Clone() as GString;
            l_oThis.LicAdr = sessionInfo.LicAdr.Clone() as GString;
            l_oThis.CsDb = sessionInfo.CsDb.Clone() as GInt32;
            l_oThis.TypInst = sessionInfo.TypInst.Clone() as GInt32;
            l_oThis.PrizArchiv = sessionInfo.PrizArchiv.Clone() as GInt32;
            l_oThis.PrizBlob = sessionInfo.PrizBlob.Clone() as GInt32;
            l_oThis.IxsIsu = sessionInfo.IxsIsu.Clone() as GString;
            l_oThis.Vzkazy = sessionInfo.Vzkazy.Clone() as GString;
            l_oThis.DatAkt = sessionInfo.DatAkt.Clone() as GDateTime;
            l_oThis.VerzeDb = sessionInfo.VerzeDb.Clone() as GInt32;
            l_oThis.SubVerzeDb = sessionInfo.SubVerzeDb.Clone() as GInt32;
            l_oThis.NazevRf = sessionInfo.NazevRf.Clone() as GString;
            l_oThis.Project = sessionInfo.Project.Clone() as GString;
            l_oThis.PrizD = sessionInfo.PrizD.Clone() as GInt32;
            l_oThis.NazevSu = sessionInfo.NazevSu.Clone() as GString;
            l_oThis.ZkratkaSu = sessionInfo.ZkratkaSu.Clone() as GString;
            l_oThis.DatLogin = sessionInfo.DatLogin.Clone() as GDateTime;
            l_oThis.NazevIns = sessionInfo.NazevIns.Clone() as GString;
            l_oThis.DatExp = sessionInfo.DatExp.Clone() as GDateTime;
            l_oThis.Rezim = sessionInfo.Rezim.Clone() as GInt32;
            l_oThis.PoradiLog = sessionInfo.PoradiLog.Clone() as GInt32;
            l_oThis.Aktuz = sessionInfo.Aktuz.Clone() as GInt32;
            l_oThis.TypAg = sessionInfo.TypAg.Clone() as GInt16;
            l_oThis.IxsLpc = sessionInfo.IxsLpc.Clone() as GString;
            l_oThis.Vysledek = sessionInfo.Vysledek.Clone() as GInt32;
            l_oThis.FazeToReinst = sessionInfo.FazeToReinst.Clone() as GString;
            l_oThis.PrizF = sessionInfo.PrizF.Clone() as GInt16;
            l_oThis.ExpTic = sessionInfo.ExpTic.Clone() as GInt32;
            l_oThis.Sessid = sessionInfo.Sessid.Clone() as GInt64;
            l_oThis.LogPorCisloKon = sessionInfo.LogPorCisloKon.Clone() as GInt32;
            l_oThis.NazevRefKon = sessionInfo.NazevRefKon.Clone() as GString;
            l_oThis.IpAdrKon = sessionInfo.IpAdrKon.Clone() as GString;
            l_oThis.DatLoginKon = sessionInfo.DatLoginKon.Clone() as GDateTime;
            l_oThis.LoginUzivKon = sessionInfo.LoginUzivKon.Clone() as GString;
            l_oThis.SubVerzeAdz = sessionInfo.SubVerzeAdz.Clone() as GInt16;
            l_oThis.Vodotisk = sessionInfo.Vodotisk.Clone() as GString;
            l_oThis.PrizTest = sessionInfo.PrizTest.Clone() as GInt16;
            l_oThis.VzkazTest = sessionInfo.VzkazTest.Clone() as GString;
            l_oThis.IxsExu = sessionInfo.IxsExu.Clone() as GString;
            l_oThis.PorCisExu = sessionInfo.PorCisExu.Clone() as GInt32;
            l_oThis.IxsEsuExu = sessionInfo.IxsEsuExu.Clone() as GString;
            l_oThis.LicEsuExu = sessionInfo.LicEsuExu.Clone() as GString;
            l_oThis.PorZasExu = sessionInfo.PorZasExu.Clone() as GInt32;
            l_oThis.StuVerExu = sessionInfo.StuVerExu.Clone() as GInt16;
            l_oThis.IxsUsrExu = sessionInfo.IxsUsrExu.Clone() as GString;
            l_oThis.LastLoginExu = sessionInfo.LastLoginExu.Clone() as GDateTime;
            l_oThis.RevizeAdz = sessionInfo.RevizeAdz.Clone() as GInt32;
            l_oThis.Ico = sessionInfo.Ico.Clone() as GString;
            if(sessionInfo.Ico.IsNullOrEmpty == false) sessionInfo.Ico.Value = sessionInfo.Ico.Value.TrimEnd();
            l_oThis.IxsUsr = sessionInfo.IxsUsr.Clone() as GString;
            l_oThis.NazevUsr = sessionInfo.NazevUsr.Clone() as GString;
            l_oThis.LogPorCisloNad = sessionInfo.LogPorCisloNad.Clone() as GInt32;
            l_oThis.IxsLpcNad = sessionInfo.IxsLpcNad.Clone() as GString;
            l_oThis.IxsPrevExu = sessionInfo.IxsPrevExu.Clone() as GString;
            l_oThis.IxsExuPrev = sessionInfo.IxsExuPrev.Clone() as GString;
            l_oThis.IxsTre = sessionInfo.IxsTre.Clone() as GString;
            l_oThis.TotpKey = sessionInfo.TotpKey.Clone() as GString;
            l_oThis.IxsExuLogin = sessionInfo.IxsExuLogin.Clone() as GString;
            l_oThis.IxsEsuExuLogin = sessionInfo.IxsEsuExuLogin.Clone() as GString;
            l_oThis.StuVerExuLogin = sessionInfo.StuVerExuLogin.Clone() as GInt16;
            l_oThis.LockTimeout = sessionInfo.LockTimeout.Clone() as GInt16;
            l_oThis.CommandTimeout = sessionInfo.CommandTimeout.Clone() as GInt16;
            l_oThis.PrizVyvoj = sessionInfo.PrizVyvoj.Clone() as GInt16;
        } // end method

        #endregion

    } // end class

} // end namespace

