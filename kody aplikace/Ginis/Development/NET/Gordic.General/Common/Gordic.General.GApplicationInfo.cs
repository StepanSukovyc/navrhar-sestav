//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//      <Name>        Gordic.General.GApplicationInfo.cs </Name>
//      <Description> obecné parametry aplikace Ginis    </Description>
//      <Author>      Jan Kuttich                        </Author>
//      <Copyright>   © GORDIC spol. s r. o. 1993 - 2021 </Copyright>
//      <Created>     2004-01-16                         </Created>
//  </FileHeader>

using System;
using System.Xml;
using System.Reflection;
using System.IO;
using System.Text;
using System.Collections;
using System.Collections.Specialized;
using System.Diagnostics;
using Microsoft.Win32;

namespace Gordic.General {

    /// <summary>podpora získávání obecných parametrù aplikace Ginis</summary>
    [Serializable]
    [DebuggerStepThrough]
    public class GApplicationInfo : IGApplicationInfo, IGObject {

        #region soukromé konstanty

        /// <summary>pøípona souborù obsahujících revizi</summary>
        private const string m_csTstFileSuffix = ".tst";

        /// <summary>sekce tst souboru obsahující údaj o revizi</summary>
        private const string m_csProgramSection = "[program]";

        /// <summary>sekce tst souboru obsahující údaj o závislých modulech</summary>
        private const string m_csRequiredSection = "[required]";

        /// <summary>relativní cesta k adresáøi instalace spoleèných komponent</summary>
        private const string m_csGinRelativePath = @"..\GIN\";

        /// <summary>název fáze spoleèných komponent Ginis</summary>
        private const string m_csFazeGin = "GINGIN01";

        /// <summary>název fáze spoleèných komponent pro sestavy</summary>
        private const string m_csFazeGrr = "GINGRR01";

        /// <summary>název fáze spoleèných komponent pro spolupráci Win32 a .NET aplikací</summary>
        private const string m_csFazeDnp = "GINDNP01";

        /// <summary>defaultní název pro serializaci</summary>
        private const string m_csSerializationName = "ApplicationInfo";

        /// <summary>název klíèe registru s parametry instalace Ginis</summary>
        private const string m_csInstall32Key = @"Software\Gordic\Ginis\Shared\Install32";

        /// <summary>název klíèe registru s parametry instalace Ginis pro x64 architekturu</summary>
        private const string m_csInstall32Key_x64 = @"Software\Wow6432Node\Gordic\Ginis\Shared\Install32";

        /// <summary>název položky registru s cestou k instalaci Ginisu</summary>
        private const string m_csGinadr = "ginadr";

        /// <summary>název adresáøe se sdílenými komponentami systému</summary>
        private const string m_csGin = "GIN";

        /// <summary>název adresáøe se globálními sestavami</summary>
        private const string m_csFrm = "FRM";

        /// <summary>pøedpona názvu tst souboru win32 aplikací</summary>
        private const string m_csG32 = "G32";

        /// <summary>název elementu pro serializaci fáze aplikace Ginis</summary>
        private const string m_csFaze = "Faze";
        
        /// <summary>název elementu pro serializaci fáze sestav aplikace Ginis</summary>
        private const string m_csFazeSes = "FazeSes";

        /// <summary>název elementu pro serializaci verze aplikace Ginis</summary>
        private const string m_csVerze = "Verze";
        
        /// <summary>název elementu pro serializaci sub verze aplikace Ginis</summary>
        private const string m_csSubVerze = "SubVerze";
        
        /// <summary>název elementu pro serializaci revize aplikace Ginis</summary>
        private const string m_csRevize = "Revize";
        
        /// <summary>název elementu pro serializaci revize spoleèných komponent aplikace Ginis</summary>
        private const string m_csRevizeGin = "RevizeGin";

        /// <summary>název elementu pro serializaci revize sestav aplikace Ginis</summary>
        private const string m_csRevizeSes = "RevizeSes";

        /// <summary>název elementu pro serializaci minimální požadovaná verze distribuèní databáze</summary>
        private const string m_csVerzeDbMin = "VerzeDbMin";

        /// <summary>název elementu pro serializaci minimální požadovaná subverze distribuèní databáze</summary>
        private const string m_csSubVerzeDbMin = "SubVerzeDbMin";

        /// <summary>název elementu pro serializaci minimální požadovaná revize distribuèní databáze</summary>
        private const string m_csRevizeAdzMin = "RevizeAdzMin";

        /// <summary>název elementu pro serializaci minimální požadovaná verze databáze v testovací distribuci</summary>
        private const string m_csVerzeDbMin2 = "VerzeDbMin2";

        /// <summary>název elementu pro serializaci minimální požadovaná subverze databáze v testovací distribuci</summary>
        private const string m_csSubVerzeDbMin2 = "SubVerzeDbMin2";

        /// <summary>název elementu pro serializaci minimální požadovaná revize databáze v testovací distribuci</summary>
        private const string m_csRevizeAdzMin2 = "RevizeAdzMin2";

        /// <summary>defaultní fáze</summary>
        private const string m_csDefaultFaze = "GSAGIN01";

        /// <summary>název elementu pro serializaci seznamu závislých fází</summary>
        private const string m_csDependantModules = "DependantModules";

        /// <summary>název elementu pro serializaci seznamu závislých revizí</summary>
        private const string m_csDependantRevisions = "DependantRevisions";

        /// <summary>název elementu pro serializaci subsystému aplikace</summary>
        private const string m_csSubsystem = "Subsystem";

        /// <summary>název elementu pro serializaci zkráceného názvu aplikace</summary>
        private const string m_csShortName = "ShortName";

        /// <summary>parametr tst souboru obsahující údaj o závislých modulech</summary>
        private const string m_csModules = "modules";

        /// <summary>název klíèe registru s informacemi o instalovaných modulech</summary>
        private const string m_csSharedKey = @"Software\Gordic\Ginis\Shared\";

        /// <summary>název klíèe registru s informacemi o instalovaných modulech pro x64 architekturu</summary>
        private const string m_csSharedKey_x64 = @"Software\Wow6432Node\Gordic\Ginis\Shared\";

        /// <summary>název hodnoty registru s informacemi cestì k instalovanému modulu</summary>
        private const string m_csInstallAdr = "install_adr";

        /// <summary>název parametru tst souboru pro specifikaci pøíznak povinné kontroly instalovaného modulu</summary>
        private const string m_csMandatory = "_mandatory";

        /// <summary>název parametru tst souboru pro specifikaci minimální požadované subverze instalovaného modulu</summary>
        private const string m_csSubVerzeMin = "_sub_verze_min";

        /// <summary>název elementu pro serializaci názvu aplikace</summary>
        private const string m_csName = "Name";

        /// <summary>název elementu pro serializaci pøíznaku provádìní testu verze databáze</summary>
        private const string m_csTestVerzeDb = "TestVerzeDb";

        /// <summary>název elementu pro serializaci pøíznaku používání connect poolu pøi pøipojení k databázi</summary>
        private const string m_csUseConnectPool = "UseConnectPool";

        /// <summary>název elementu pro serializaci pøíznaku požadavku na naèítání databázové konfigurace</summary>
        private const string m_csLoadDatabaseConfiguration = "LoadDatabaseConfiguration";

        #endregion

        #region soukromé èleny

        /// <summary>typ zdrojového objektu pro získání obecných parametrù aplikace</summary>
        [NonSerialized]
        private Type m_oSourceType = null;

        /// <summary>domovský adresáø aplikace</summary>
        [NonSerialized]
        private string m_sApplicationPath = String.Empty;

        /// <summary>cesta k instalaci bìžných modulù</summary>
        [NonSerialized]
        private string m_sInstallPath = String.Empty;

        /// <summary>cesta k instalaci sdílených komponent</summary>
        [NonSerialized]
        private string m_sGinPath = String.Empty;

        /// <summary>atribut fáze</summary>
        [NonSerialized]
        private FazeAttribute m_oFazeAttribute = null;

        /// <summary>cesta k tst souboru aplikace</summary>
        [NonSerialized]
        private string m_sApplicationTstFile = String.Empty;

        /// <summary>fáze aplikace</summary>
        private GString m_gsFaze = new GString(8);

        /// <summary>fáze sestav aplikace</summary>
        private GString m_gsFazeSes = new GString(8);

        /// <summary>verze aplikace</summary>
        private GInt32 m_gnVerze = new GInt32();

        /// <summary>sub verze aplikace</summary>
        private GInt32 m_gnSubVerze = new GInt32();

        /// <summary>revize aplikace</summary>
        private GString m_gsRevize = new GString(30);

        /// <summary>revize spoleèných komponent aplikace</summary>
        private GString m_gsRevizeGin = new GString(30);

        /// <summary>revize sestav aplikace</summary>
        private GString m_gsRevizeSes = new GString(30);

        /// <summary>minimální požadovaná verze distribuèní databáze</summary>
        /// <remarks>v pøípadì souèasného nastavení VerzeDbMin2, je tato verze ta nižší</remarks>
        private GInt32 m_gnVerzeDbMin = new GInt32();

        /// <summary>minimální požadovaná subverze distribuèní databáze</summary>
        /// <remarks>v pøípadì souèasného nastavení SubVerzeDbMin2, je tato subverze ta nižší</remarks>
        private GInt32 m_gnSubVerzeDbMin = new GInt32();

        /// <summary>minimální požadovaná revize distribuèní databáze</summary>
        /// <remarks>v pøípadì souèasného nastavení RevizeAdzMin2, je tato revize ta nižší</remarks>
        private GInt32 m_gnRevizeAdzMin = new GInt32();

        /// <summary>minimální požadovaná verze databáze v testovací distribuci</summary>
        /// <remarks>v pøípadì souèasného nastavení VerzeDbMin, je tato verze ta vyšší</remarks>
        private GInt32 m_gnVerzeDbMin2 = new GInt32();

        /// <summary>minimální požadovaná subverze databáze v testovací distribuci</summary>
        /// <remarks>v pøípadì souèasného nastavení SubVerzeDbMin, je tato subverze ta vyšší</remarks>
        private GInt32 m_gnSubVerzeDbMin2 = new GInt32();

        /// <summary>minimální požadovaná revize databáze v testovací distribuci</summary>
        /// <remarks>v pøípadì souèasného nastavení RevizeAdzMin, je tato revize ta vyšší</remarks>
        private GInt32 m_gnRevizeAdzMin2 = new GInt32();

        /// <summary>seznam závislých fází oddìlených èárkami</summary>
        private GString m_gsDependantModules = new GString(UInt16.MaxValue);

        /// <summary>seznam závislých revizí oddìlených èárkami</summary>
        private GString m_gsDependantRevisions = new GString(UInt16.MaxValue);

        /// <summary>subsystém aplikace Ginis</summary>
        private object m_oSubsystem = null;

        /// <summary>zkrácený název aplikace</summary>
        private GString m_gsShortName = new GString(5);

        /// <summary>název aplikace</summary>
        private GString m_gsName = new GString(254);

        /// <summary>pøíznak provádìní testu verze databáze</summary>
        private GBoolean m_gbTestVerzeDb = new GBoolean();

        /// <summary>pøíznak používání connect poolu pøi pøipojení k databázi</summary>
        private GBoolean m_gbUseConnectPool = new GBoolean();

        /// <summary>pøíznak požadavku na naèítání databázové konfigurace</summary>
        private GBoolean m_gbLoadDatabaseConfiguration = new GBoolean();

        #endregion

        #region konstruktory

        /// <summary>veøejný konstruktor</summary>
        public GApplicationInfo() {
            m_gbUseConnectPool.DefaultValue = true;
            m_gbLoadDatabaseConfiguration.DefaultValue = true;
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="sourceType">typ zdrojového objektu pro získání obecných parametrù aplikace Ginis</param>
        /// <param name="applicationPath">cesta k exe souboru aplikace</param>
        public GApplicationInfo(Type sourceType,string applicationPath) {
            m_oSourceType = sourceType;
            if(applicationPath != null && (applicationPath = applicationPath.Trim()) != String.Empty) m_sApplicationPath = Path.GetFullPath(applicationPath);
            m_gbUseConnectPool.DefaultValue = true;
            m_gbLoadDatabaseConfiguration.DefaultValue = true;
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="sourceType">typ zdrojového objektu pro získání obecných parametrù aplikace Ginis</param>
        /// <param name="declaredFaze">deklarovaný atribut fáze</param>
        /// <param name="applicationPath">cesta k exe souboru aplikace</param>
        public GApplicationInfo(Type sourceType, FazeAttribute declaredFaze, string applicationPath)
        {
            m_oSourceType = sourceType;
            m_oFazeAttribute = declaredFaze;
            if (applicationPath != null && (applicationPath = applicationPath.Trim()) != String.Empty) m_sApplicationPath = Path.GetFullPath(applicationPath);
            m_gbUseConnectPool.DefaultValue = true;
            m_gbLoadDatabaseConfiguration.DefaultValue = true;
        } // end method

        /// <summary>veøejný kopírovací konstruktor</summary>
        /// <param name="applicationInfo">rozhraní na obecné informace o aplikaci</param>
        public GApplicationInfo(IGApplicationInfo applicationInfo) {
            IGApplicationInfo l_oThis = this as IGApplicationInfo;
            l_oThis.Faze                      = applicationInfo.Faze.Clone() as GString;
            l_oThis.FazeSes                   = applicationInfo.FazeSes.Clone() as GString;
            l_oThis.Verze                     = applicationInfo.Verze.Clone() as GInt32;
            l_oThis.SubVerze                  = applicationInfo.SubVerze.Clone() as GInt32;
            l_oThis.Revize                    = applicationInfo.Revize.Clone() as GString;
            l_oThis.RevizeGin                 = applicationInfo.RevizeGin.Clone() as GString;
            l_oThis.RevizeSes                 = applicationInfo.RevizeSes.Clone() as GString;
            l_oThis.VerzeDbMin                = applicationInfo.VerzeDbMin.Clone() as GInt32;
            l_oThis.SubVerzeDbMin             = applicationInfo.SubVerzeDbMin.Clone() as GInt32;
            l_oThis.RevizeAdzMin              = applicationInfo.RevizeAdzMin.Clone() as GInt32;
            l_oThis.VerzeDbMin2               = applicationInfo.VerzeDbMin2.Clone() as GInt32;
            l_oThis.SubVerzeDbMin2            = applicationInfo.SubVerzeDbMin2.Clone() as GInt32;
            l_oThis.RevizeAdzMin2             = applicationInfo.RevizeAdzMin2.Clone() as GInt32;
            l_oThis.DependantModules          = applicationInfo.DependantModules.Clone() as GString;
            l_oThis.DependantRevisions        = applicationInfo.DependantRevisions.Clone() as GString;
            l_oThis.Subsystem                 = applicationInfo.Subsystem;
            l_oThis.ShortName                 = applicationInfo.ShortName.Clone() as GString;
            l_oThis.Name                      = applicationInfo.Name.Clone() as GString;
            l_oThis.TestVerzeDb               = applicationInfo.TestVerzeDb.Clone() as GBoolean;
            l_oThis.UseConnectPool            = applicationInfo.UseConnectPool.Clone() as GBoolean;
            l_oThis.LoadDatabaseConfiguration = applicationInfo.LoadDatabaseConfiguration.Clone() as GBoolean;
        } // end method

        #endregion

        #region vlastnosti

        /// <summary>zdrojový objekt pro získání obecných parametrù aplikace</summary>
        private Type SourceType {
            get {
                if(m_oSourceType == null) throw new GException(23200178,ThisAssembly); //RC-EX 23200178 : Nenalezen typ zdrojového objektu nutná pro získání parametrù aplikace
                return m_oSourceType;
            } // end method
        } // end method

        /// <summary>deklarovaný atribut fáze</summary>
        private FazeAttribute DeclaredFaze {
            get {
                if(m_oFazeAttribute == null) {
                    foreach(Attribute l_oAttribute in SourceType.GetCustomAttributes(typeof(FazeAttribute),true)) {
                        if(l_oAttribute is FazeAttribute) {
                            m_oFazeAttribute = l_oAttribute as FazeAttribute;
                            break;
                        } // end if
                    } // end foreach
                    if(m_oFazeAttribute == null) throw new GException(23200179,ThisAssembly); // nenalezena deklarace fáze aplikace
                } // end if
                return m_oFazeAttribute;
            } // end method
        } // end method

        /// <summary>defaultní název pro serializaci</summary>
        public static string SerializationName {
            get {return m_csSerializationName;}
        } // end property

        /// <summary>cesta k aplikace</summary>
        private string ApplicationPath {
            get {
                if(m_sApplicationPath == String.Empty) m_sApplicationPath = Directory.GetCurrentDirectory();
                return m_sApplicationPath;
            } // end method
        } // end property

        /// <summary>cesta k instalaci bìžných modulù</summary>
        private string InstallPath {
            get {
                if(m_sInstallPath == String.Empty) m_sInstallPath = LocateInstallPath();
                return m_sInstallPath;
            } // end method
        } // end property

        /// <summary>cesta k instalaci sdílených komponent</summary>
        private string GinPath {
            get {
                if(m_sGinPath == String.Empty) m_sGinPath = Path.Combine(InstallPath,m_csGin);
                return m_sGinPath;
            } // end method
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(GApplicationInfo).Assembly;}
        } // end property

        /// <summary>defaultní fáze</summary>
        public static string DefaultFaze {
            get { return m_csDefaultFaze; }
        } // end property

        /// <summary>instance s výchozími hodnotami</summary>
        public static IGApplicationInfo DefaultInstance {
            get {
                GApplicationInfo l_oApplicationInfo = new GApplicationInfo();
                l_oApplicationInfo.m_gsFaze.Value = m_csDefaultFaze;
                l_oApplicationInfo.m_gsFazeSes.Value = String.Empty;
                l_oApplicationInfo.m_gnVerze.Value = ThisAssembly.GetName().Version.Major;
                l_oApplicationInfo.m_gnSubVerze.Value = 1;
                l_oApplicationInfo.m_gsRevize.Value = String.Format("40{0}{1}01X01",m_csDefaultFaze.Substring(3),l_oApplicationInfo.m_gnVerze.Value);
                l_oApplicationInfo.m_gsRevizeGin.Value = l_oApplicationInfo.m_gsRevize.Value;
                l_oApplicationInfo.m_gsRevizeSes.Value = l_oApplicationInfo.m_gsRevize.Value;
                l_oApplicationInfo.m_gnVerzeDbMin.Value = 0;
                l_oApplicationInfo.m_gnSubVerzeDbMin.Value = 0;
                l_oApplicationInfo.m_gnRevizeAdzMin.Value = 0;
                l_oApplicationInfo.m_gnVerzeDbMin2.Value = 0;
                l_oApplicationInfo.m_gnSubVerzeDbMin2.Value = 0;
                l_oApplicationInfo.m_gnRevizeAdzMin2.Value = 0;
                l_oApplicationInfo.m_gsDependantModules.Value = String.Empty;
                l_oApplicationInfo.m_gsDependantRevisions.Value = String.Empty;
                l_oApplicationInfo.m_oSubsystem = GCommon.Subsystem.Gin;
                l_oApplicationInfo.m_gbTestVerzeDb.Value = true;
                l_oApplicationInfo.m_gbUseConnectPool.Value = true;
                l_oApplicationInfo.m_gbLoadDatabaseConfiguration.Value = true;
                return l_oApplicationInfo;
            } // end method
        } // end property

        /// <summary>cesta k tst souboru aplikace</summary>
        private string ApplicationTstFile {
            get {
                if(m_sApplicationTstFile == String.Empty) {
                    m_sApplicationTstFile = Path.Combine(ApplicationPath,This.Faze.Value + m_csTstFileSuffix);
                    if(File.Exists(m_sApplicationTstFile) == false) throw new GException(23200180,ThisAssembly,m_sApplicationTstFile); // nesprávná instalace aplikace, nenalezen soubor {0}
                } // end if
                return m_sApplicationTstFile;
            } // end method
        } // end property

        /// <summary>instance této tøídy</summary>
        private IGApplicationInfo This {
            get { return (IGApplicationInfo) this; }
        } // end property

        /// <summary>název elementu pro serializaci fáze</summary>
        public static string FazeKey { get { return m_csFaze; } }

        /// <summary>název elementu pro serializaci fáze sestav</summary>
        public static string FazeSesKey { get { return m_csFazeSes; } }

        /// <summary>název elementu pro serializaci verze</summary>
        public static string VerzeKey { get { return m_csVerze; } }

        /// <summary>název elementu pro serializaci subverze</summary>
        public static string SubVerzeKey { get { return m_csSubVerze; } }

        /// <summary>název elementu pro serializaci revize</summary>
        public static string RevizeKey { get { return m_csRevize; } }

        /// <summary>název parametru obsahujícího revizi spoleèných komponent</summary>
        public static string RevizeGinKey { get { return m_csRevizeGin; } }

        /// <summary>název parametru obsahujícího revizi sestav</summary>
        public static string RevizeSesKey { get { return m_csRevizeSes; } }

        /// <summary>název parametru obsahujícího verzi distribuèní databáze</summary>
        public static string VerzeDbMinKey { get { return m_csVerzeDbMin; } }

        /// <summary>název parametru obsahujícího subverzi distribuèní databáze</summary>
        public static string SubVerzeDbMinKey { get { return m_csSubVerzeDbMin; } }

        /// <summary>název parametru obsahujícího revizi distribuèní databáze</summary>
        public static string RevizeAdzMinKey { get { return m_csRevizeAdzMin; } }

        /// <summary>název parametru obsahujícího verzi testovací databáze</summary>
        public static string VerzeDbMin2Key { get { return m_csVerzeDbMin2; } }

        /// <summary>název parametru obsahujícího subverzi testovací databáze</summary>
        public static string SubVerzeDbMin2Key { get { return m_csSubVerzeDbMin2; } }

        /// <summary>název parametru obsahujícího revizi testovací databáze</summary>
        public static string RevizeAdzMin2Key { get { return m_csRevizeAdzMin2; } }

        /// <summary>název parametru obsahujícího seznam závislých fází</summary>
        public static string DependantModulesKey { get { return m_csDependantModules; } }

        /// <summary>název parametru obsahujícího seznam závislých revizí</summary>
        public static string DependantRevisionsKey { get { return m_csDependantRevisions; } }

        /// <summary>název parametru obsahujícího subsystém aplikace</summary>
        public static string SubsystemKey { get { return m_csSubsystem; } }

        /// <summary>název parametru obsahujícího zkrácený název aplikace</summary>
        public static string ShortNameKey { get { return m_csShortName; } }

        /// <summary>název parametru obsahujícího název aplikace</summary>
        public static string NameKey { get { return m_csName; } }

        /// <summary>název parametru obsahujícího pøíznak testu verze databáze</summary>
        public static string TestVerzeDbKey { get { return m_csTestVerzeDb; } }

        /// <summary>název parametru obsahujícího používání connect poolu pøi pøipojení k databázi</summary>
        public static string UseConnectPoolKey { get { return m_csUseConnectPool; } }

        /// <summary>název parametru obsahujícího pøíznak požadavku na naèítání databázové konfigurace</summary>
        public static string LoadDatabaseConfigurationKey { get { return m_csLoadDatabaseConfiguration; } }

        #endregion

        #region vlastnosti rozhraní IGApplicationInfo

        /// <summary>fáze aplikace Ginis</summary>
        public GString Faze {
            get {
                if(m_gsFaze.IsNull) m_gsFaze.Value = DeclaredFaze.Faze;
                return m_gsFaze;
            } // end method
            set {
                if(value.BaseValueTrimmed.Length != 8) throw new GException(23200181,ThisAssembly); // nepodaøilo se nastavit fázi aplikace, nepøípustná hodnota
                m_gsFaze.Value = value.BaseValueTrimmed; 
            } // end method
        } // end property

        /// <summary>fáze spoleèných komponent aplikace Ginis</summary>
        public GString FazeGin {
            get {
                return new GString(m_csFazeGin,8);
            } // end method
        } // end property

        /// <summary>fáze sestav aplikace Ginis</summary>
        public GString FazeSes { 
            get {
                if(m_gsFazeSes.IsNull) m_gsFazeSes.Value = DeclaredFaze.FazeSes;
                return m_gsFazeSes;
            } // end method
            set {
                string l_sFazeSes = value.BaseValueTrimmed;
                if(l_sFazeSes!=String.Empty && (l_sFazeSes.Length!=8 || l_sFazeSes[6]!='S')) throw new GException(23200182,ThisAssembly); // nepodaøilo se nastavit fázi sestav aplikace, nepøípustná hodnota
                m_gsFazeSes.Value = l_sFazeSes; 
            } // end method
        } // end property

        /// <summary>verze aplikace Ginis</summary>
        public GInt32 Verze {
            get {
                if(m_gnVerze.IsNull) m_gnVerze.Value = GetVerze();
                return m_gnVerze;
            } // end method
            set {
                if(value.BaseValue < 100) throw new GException(23200183,ThisAssembly); // nepodaøilo se nastavit verzi aplikace, nepøípustná hodnota
                m_gnVerze.Value = value.Value;
            } // end method
        } // end property

        /// <summary>sub verze aplikace Ginis</summary>
        public GInt32 SubVerze {
            get {
                if(m_gnSubVerze.IsNull) m_gnSubVerze.Value = GetSubVerze();
                return m_gnSubVerze;
            } // end method
            set {
                if(value.BaseValue < 0) throw new GException(23200184,ThisAssembly); // nepodaøilo se nastavit subverzi aplikace, nepøípustná hodnota
                m_gnSubVerze.Value = value.Value;
            } // end method
        } // end property

        /// <summary>revize aplikace Ginis</summary>
        public GString Revize {
            get {
                if(m_gsRevize.IsNull) {
                    m_gsRevize.Value = GetRevizeFromTstFile(ApplicationTstFile);
                    if(m_gsRevize.BaseValueTrimmed == String.Empty) throw new GException(23200185,ThisAssembly,ApplicationTstFile); // nepodaøilo se získat revizi aplikace, v souboru {0} nebyl nalezen pøíslušný údaj
                } // end if
                return m_gsRevize;
            } // end method
            set {
                if(value.BaseValueTrimmed.Length < 15) throw new GException(23200186,ThisAssembly); // nepodaøilo se nastavit revizi aplikace, nepøípustná hodnota
                m_gsRevize.Value = value.BaseValueTrimmed;
            } // end method
        } // end property

        /// <summary>revize spoleèných komponent aplikace Ginis</summary>
        public GString RevizeGin {
            get {
                if(m_gsRevizeGin.IsNull) m_gsRevizeGin.Value = GetRevision(m_csFazeGin,GinPath);
                return m_gsRevizeGin;
            } // end method
            set {
                if(value.BaseValueTrimmed.Length < 15) throw new GException(23200187,ThisAssembly); // nepodaøilo se nastavit revizi spoleèných komponent aplikace, nepøípustná hodnota
                m_gsRevizeGin.Value = value.BaseValueTrimmed;
            } // end method
        } // end property

        /// <summary>revize sestav aplikace Ginis</summary>
        public GString RevizeSes {
            get {
                if(m_gsRevizeSes.IsNull) {
                    if(DeclaredFaze.Sestavy) {
                        m_gsRevizeSes.Value = GetRevision(This.FazeSes.Value,ApplicationPath);
                    } else {
                        m_gsRevizeSes.Value = This.Revize.Value;
                    } // end if
                } // end if
                return m_gsRevizeSes;
            } // end method
            set {
                string l_sRevizeSes = value.BaseValueTrimmed;
                if(l_sRevizeSes == String.Empty) m_gsRevizeSes.Value = This.Revize.Value;
                else if(l_sRevizeSes.Length < 15) throw new GException(23200188,ThisAssembly); // nepodaøilo se nastavit revizi sestav aplikace, nepøípustná hodnota
                else m_gsRevizeSes.Value = l_sRevizeSes;
            } // end method
        } // end property

        /// <summary>minimální požadovaná verze distribuèní databáze</summary>
        /// <remarks>v pøípadì souèasného nastavení VerzeDbMin2, je tato verze ta nižší</remarks>
        public GInt32 VerzeDbMin {
            get {
                if(m_gnVerzeDbMin.State == GDbType.ValueState.Uninitialized) m_gnVerzeDbMin.Value = DeclaredFaze.VerzeDbMin;
                return m_gnVerzeDbMin;
            } // end method
            set {
                if(value.Value!=0 && value.Value<100) throw new GException(23200189,ThisAssembly); // nepodaøilo se nastavit minimální požadovanou verzi databáze, nepøípustná hodnota
                m_gnVerzeDbMin.DbValue = value.DbValue;
            } // end method
        } // end property

        /// <summary>minimální požadovaná subverze distribuèní databáze</summary>
        /// <remarks>v pøípadì souèasného nastavení SubVerzeDbMin2, je tato subverze ta nižší</remarks>
        public GInt32 SubVerzeDbMin {
            get {
                if(m_gnSubVerzeDbMin.State == GDbType.ValueState.Uninitialized) m_gnSubVerzeDbMin.Value = DeclaredFaze.SubVerzeDbMin;
                return m_gnSubVerzeDbMin;
            } // end method
            set {
                if(value.Value<0) throw new GException(23200190,ThisAssembly); // nepodaøilo se nastavit minimální požadovanou sub verzi databáze, nepøípustná hodnota
                m_gnSubVerzeDbMin.DbValue = value.DbValue;
            } // end method
        } // end property

        /// <summary>minimální požadovaná revize distribuèní databáze</summary>
        /// <remarks>v pøípadì souèasného nastavení RevizeAdzMin2, je tato revize ta nižší</remarks>
        public GInt32 RevizeAdzMin {
            get {
                if(m_gnRevizeAdzMin.State == GDbType.ValueState.Uninitialized) m_gnRevizeAdzMin.Value = DeclaredFaze.RevizeAdzMin;
                return m_gnRevizeAdzMin;
            } // end method
            set {
                if(value.Value < 0) throw new GException(23200192,ThisAssembly); // nepodaøilo se nastavit minimální požadovanou revizi adz, nepøípustná hodnota
                m_gnRevizeAdzMin.DbValue = value.DbValue;
            } // end method
        } // end property

        /// <summary>minimální požadovaná verze databáze v testovací distribuci</summary>
        /// <remarks>v pøípadì souèasného nastavení VerzeDbMin, je tato verze ta vyšší</remarks>
        public GInt32 VerzeDbMin2 {
            get {
                if(m_gnVerzeDbMin2.State == GDbType.ValueState.Uninitialized) m_gnVerzeDbMin2.Value = DeclaredFaze.VerzeDbMin2;
                return m_gnVerzeDbMin2;
            } // end method
            set {
                if(value.Value != 0 && value.Value < 100) throw new GException(23200357,23200189,ThisAssembly); // nepodaøilo se nastavit minimální požadovanou verzi databáze, nepøípustná hodnota
                m_gnVerzeDbMin2.DbValue = value.DbValue;
            } // end method
        } // end property

        /// <summary>minimální požadovaná subverze databáze v testovací distribuci</summary>
        /// <remarks>v pøípadì souèasného nastavení SubVerzeDbMin, je tato subverze ta vyšší</remarks>
        public GInt32 SubVerzeDbMin2 {
            get {
                if(m_gnSubVerzeDbMin2.State == GDbType.ValueState.Uninitialized) m_gnSubVerzeDbMin2.Value = DeclaredFaze.SubVerzeDbMin2;
                return m_gnSubVerzeDbMin2;
            } // end method
            set {
                if(value.Value < 0) throw new GException(23200358,23200190,ThisAssembly); // nepodaøilo se nastavit minimální požadovanou sub verzi databáze, nepøípustná hodnota
                m_gnSubVerzeDbMin2.DbValue = value.DbValue;
            } // end method
        } // end property

        /// <summary>minimální požadovaná revize databáze v testovací distribuci</summary>
        /// <remarks>v pøípadì souèasného nastavení RevizeAdzMin, je tato revize ta vyšší</remarks>
        public GInt32 RevizeAdzMin2 {
            get {
                if(m_gnRevizeAdzMin2.State == GDbType.ValueState.Uninitialized) m_gnRevizeAdzMin2.Value = DeclaredFaze.RevizeAdzMin2;
                return m_gnRevizeAdzMin2;
            } // end method
            set {
                if(value.Value < 0) throw new GException(23200359,23200192,ThisAssembly); // nepodaøilo se nastavit minimální požadovanou revizi adz, nepøípustná hodnota
                m_gnRevizeAdzMin2.DbValue = value.DbValue;
            } // end method
        } // end property

        /// <summary>seznam závislých fází oddìlených èárkami</summary>
        public GString DependantModules {
            get {
                if(m_gsDependantModules.IsNull) ObtainDependantModules();
                return m_gsDependantModules;
            } // end method
            set {
                if(value == null) m_gsDependantModules.Value = String.Empty;
                m_gsDependantModules.Value = value.BaseValueTrimmed;
            } // end method
        } // end property

        /// <summary>seznam závislých revizí oddìlených èárkami</summary>
        public GString DependantRevisions {
            get {
                if(m_gsDependantRevisions.IsNull) ObtainDependantModules();
                return m_gsDependantRevisions;
            } // end method
            set {
                if(value == null) m_gsDependantRevisions.Value = String.Empty;
                m_gsDependantRevisions.Value = value.BaseValueTrimmed;
            } // end method
        } // end property

        /// <summary>subsystém aplikace Ginis</summary>
        public GCommon.Subsystem Subsystem {
            get {
                if(m_oSubsystem == null) m_oSubsystem = DeclaredFaze.Subsystem;
                return (GCommon.Subsystem) m_oSubsystem;
            } // end method
            set {
                m_oSubsystem = value;
            } // end method
        } // end property

        /// <summary>zkrácený název aplikace</summary>
        public GString ShortName { 
            get {
                if(m_gsShortName.IsNullOrEmpty) m_gsShortName.Value = GetApplicationShortName();
                return m_gsShortName;
            } // end method
            set {
                string l_sShortName = value.BaseValueTrimmed.ToUpper();
                if(l_sShortName.Length==0 || l_sShortName.Length==3 || l_sShortName.Length==5) m_gsShortName.Value = l_sShortName; 
                else throw new GException(23200191,ThisAssembly); // nepodaøilo se nastavit zkrácený název aplikace, nepøípustná hodnota
            } // end method
        } // end property

        /// <summary>název aplikace</summary>
        public GString Name {
            get {
                if(m_gsName.IsNull) m_gsName.Value = GetApplicationName();
                return m_gsName;
            } // end method
            set {
                if(value.BaseValueTrimmed.Length > m_gsName.MaxSize) throw new GException(23200193,ThisAssembly); // nepodaøilo se nastavit název aplikace, nepøípustná hodnota
                m_gsName.Value = value.BaseValueTrimmed;
            } // end method
        } // end property

        /// <summary>pøíznak provádìní testu verze databáze</summary>
        public GBoolean TestVerzeDb {
            get {
                if(m_gbTestVerzeDb.IsNull) m_gbTestVerzeDb.Value = DeclaredFaze.TestVerzeDb;
                return m_gbTestVerzeDb;
            } // end method
            set {
                m_gbTestVerzeDb.Value = (value == null || value.IsNull) ? true : value.Value;
            } // end method
        } // end property

        /// <summary>pøíznak používání connect poolu pøi pøipojení k databázi</summary>
        public GBoolean UseConnectPool {
            get {
                if(m_gbUseConnectPool.IsNull) m_gbUseConnectPool.Value = DeclaredFaze.UseConnectPool;
                return m_gbUseConnectPool;
            } // end method
            set {
                m_gbUseConnectPool.Value = (value == null || value.IsNull) ? true : value.Value;
            } // end method
        } // end property

        /// <summary>pøíznak požadavku na naèítání databázové konfigurace</summary>
        public GBoolean LoadDatabaseConfiguration {
            get {
                if(m_gbLoadDatabaseConfiguration.IsNull) m_gbLoadDatabaseConfiguration.Value = DeclaredFaze.LoadDatabaseConfiguration;
                return m_gbLoadDatabaseConfiguration;
            } // end method
            set {
                m_gbLoadDatabaseConfiguration.Value = (value == null || value.IsNull) ? true : value.Value;
            } // end method
        } // end property

        #endregion

        #region metody rozhraní IGApplicationInfo

        /// <summary>serializace hodnot do XML</summary>
        /// <returns>serializovaný XML tvar</returns>
        XmlNode IGApplicationInfo.ToXml() {
            IGApplicationInfo l_oThis = (IGApplicationInfo) this;
            XmlDocument l_oDocument = new XmlDocument();
            XmlElement l_oDocumentElement = l_oDocument.CreateElement(m_csSerializationName);
            XmlElement l_oElement = null;
            // fáze
            l_oElement = l_oDocument.CreateElement(m_csFaze);
            l_oElement.InnerText = l_oThis.Faze.BaseValue;
            l_oDocumentElement.AppendChild(l_oElement);
            // fáze sestav
            l_oElement = l_oDocument.CreateElement(m_csFazeSes);
            l_oElement.InnerText = l_oThis.FazeSes.BaseValue;
            l_oDocumentElement.AppendChild(l_oElement);
            // verze
            l_oElement = l_oDocument.CreateElement(m_csVerze);
            l_oElement.InnerText = l_oThis.Verze.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // sub verze
            l_oElement = l_oDocument.CreateElement(m_csSubVerze);
            l_oElement.InnerText = l_oThis.SubVerze.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // revize
            l_oElement = l_oDocument.CreateElement(m_csRevize);
            l_oElement.InnerText = l_oThis.Revize.BaseValue;
            l_oDocumentElement.AppendChild(l_oElement);
            // revize GIN
            l_oElement = l_oDocument.CreateElement(m_csRevizeGin);
            l_oElement.InnerText = l_oThis.RevizeGin.BaseValue;
            l_oDocumentElement.AppendChild(l_oElement);
            // revize sestav
            l_oElement = l_oDocument.CreateElement(m_csRevizeSes);
            l_oElement.InnerText = l_oThis.RevizeSes.BaseValue;
            l_oDocumentElement.AppendChild(l_oElement);
            // minimální verze distribuèní databáze
            l_oElement = l_oDocument.CreateElement(m_csVerzeDbMin);
            l_oElement.InnerText = l_oThis.VerzeDbMin.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // minimální subverze distribuèní databáze
            l_oElement = l_oDocument.CreateElement(m_csSubVerzeDbMin);
            l_oElement.InnerText = l_oThis.SubVerzeDbMin.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // seznam závislých fází
            l_oElement = l_oDocument.CreateElement(m_csDependantModules);
            l_oElement.InnerText = l_oThis.DependantModules.BaseValue;
            l_oDocumentElement.AppendChild(l_oElement);
            // seznam závislých revizí
            l_oElement = l_oDocument.CreateElement(m_csDependantRevisions);
            l_oElement.InnerText = l_oThis.DependantRevisions.BaseValue;
            l_oDocumentElement.AppendChild(l_oElement);
            // seznam závislých revizí
            l_oElement = l_oDocument.CreateElement(m_csSubsystem);
            l_oElement.InnerText = GCommon.GetSubsystem(l_oThis.Subsystem);
            l_oDocumentElement.AppendChild(l_oElement);
            // zkrácený název aplikace
            l_oElement = l_oDocument.CreateElement(m_csShortName);
            l_oElement.InnerText = l_oThis.ShortName.BaseValue;
            l_oDocumentElement.AppendChild(l_oElement);
            // minimální revize distribuèní databáze
            l_oElement = l_oDocument.CreateElement(m_csRevizeAdzMin);
            l_oElement.InnerText = l_oThis.RevizeAdzMin.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // název aplikace
            l_oElement = l_oDocument.CreateElement(m_csName);
            l_oElement.InnerText = l_oThis.Name.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // minimální verze databáze v testovací distribuci
            l_oElement = l_oDocument.CreateElement(m_csVerzeDbMin2);
            l_oElement.InnerText = l_oThis.VerzeDbMin2.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // minimální subverze databáze v testovací distribuci
            l_oElement = l_oDocument.CreateElement(m_csSubVerzeDbMin2);
            l_oElement.InnerText = l_oThis.SubVerzeDbMin2.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // minimální revize databáze v testovací distribuci
            l_oElement = l_oDocument.CreateElement(m_csRevizeAdzMin2);
            l_oElement.InnerText = l_oThis.RevizeAdzMin2.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // pøíznak provádìní testu verze databáze
            l_oElement = l_oDocument.CreateElement(m_csTestVerzeDb);
            l_oElement.InnerText = l_oThis.TestVerzeDb.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // pøíznak používání connect poolu pøi pøipojení k databázi
            l_oElement = l_oDocument.CreateElement(m_csUseConnectPool);
            l_oElement.InnerText = l_oThis.UseConnectPool.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // pøíznak požadavku na naèítání databázové konfigurace
            l_oElement = l_oDocument.CreateElement(m_csLoadDatabaseConfiguration);
            l_oElement.InnerText = l_oThis.LoadDatabaseConfiguration.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // vrácení serializovaného tvaru
            return l_oDocument.AppendChild(l_oDocumentElement);
        } // end method

        /// <summary>deserializace hodnot z XML</summary>
        /// <param name="node">serializovaný XML tvar</param>
        void IGApplicationInfo.ParseXml(XmlNode node) {
            IGApplicationInfo l_oThis = (IGApplicationInfo) this;
            XmlNode l_oNode = null;
            string l_sMissingElement = String.Empty;
            // kontrola parametru
            if(node==null || node is XmlElement==false) throw new GException(23200194,ThisAssembly); // nelze provést deserializaci informací o aplikaci, nesprávný parametr
            if(node.LocalName!=m_csSerializationName || node.NamespaceURI!=String.Empty) throw new GException(23200195,ThisAssembly); // nelze provést deserializaci informací o aplikaci, nesprávná koøenová položka
            // deserializace hodnot
            try {
                do {
                    // fáze
                    if((l_oNode=node.SelectSingleNode(m_csFaze))==null || l_oNode.InnerText==String.Empty) {l_sMissingElement=m_csFaze; break;}
                    l_oThis.Faze = new GString(l_oNode.InnerText,8);
                    // fáze sestav
                    if((l_oNode=node.SelectSingleNode(m_csFazeSes))==null) {l_sMissingElement=m_csFazeSes; break;}
                    l_oThis.FazeSes = new GString(l_oNode.InnerText,8);
                    // verze
                    if((l_oNode=node.SelectSingleNode(m_csVerze))==null || l_oNode.InnerText==String.Empty) {l_sMissingElement=m_csVerze; break;}
                    l_oThis.Verze = GInt32.Parse(l_oNode.InnerText);
                    // sub verze
                    if((l_oNode=node.SelectSingleNode(m_csSubVerze))==null || l_oNode.InnerText==String.Empty) {l_sMissingElement=m_csSubVerze; break;}
                    l_oThis.SubVerze = GInt32.Parse(l_oNode.InnerText);
                    // revize
                    if((l_oNode=node.SelectSingleNode(m_csRevize))==null || l_oNode.InnerText==String.Empty) {l_sMissingElement=m_csRevize; break;}
                    l_oThis.Revize = new GString(l_oNode.InnerText,30);
                    // revize GIN
                    if((l_oNode=node.SelectSingleNode(m_csRevizeGin))==null || l_oNode.InnerText==String.Empty) {l_sMissingElement=m_csRevizeGin; break;}
                    l_oThis.RevizeGin = new GString(l_oNode.InnerText,30);
                    // revize sestav
                    if((l_oNode=node.SelectSingleNode(m_csRevizeSes))==null || l_oNode.InnerText==String.Empty) {l_sMissingElement=m_csRevizeSes; break;}
                    l_oThis.RevizeSes = new GString(l_oNode.InnerText,30);
                    // minimální verze distribuèní databáze
                    if((l_oNode=node.SelectSingleNode(m_csVerzeDbMin))==null || l_oNode.InnerText==String.Empty) {l_sMissingElement=m_csVerzeDbMin; break;}
                    l_oThis.VerzeDbMin = GInt32.Parse(l_oNode.InnerText);
                    // minimální subverze distribuèní databáze
                    if((l_oNode=node.SelectSingleNode(m_csSubVerzeDbMin))==null || l_oNode.InnerText==String.Empty) {l_sMissingElement=m_csSubVerzeDbMin; break;}
                    l_oThis.SubVerzeDbMin = GInt32.Parse(l_oNode.InnerText);
                    // seznam závislých fází
                    l_oNode=node.SelectSingleNode(m_csDependantModules);
                    l_oThis.DependantModules = new GString(l_oNode == null ? String.Empty : l_oNode.InnerText,UInt16.MaxValue);
                    // seznam závislých revizí
                    l_oNode=node.SelectSingleNode(m_csDependantRevisions);
                    l_oThis.DependantRevisions = new GString(l_oNode == null ? String.Empty : l_oNode.InnerText,UInt16.MaxValue);
                    // subsystém
                    l_oNode = node.SelectSingleNode(m_csSubsystem);
                    l_oThis.Subsystem = (l_oNode == null) ? GCommon.Subsystem.Gin : GCommon.GetSubsystem(l_oNode.InnerText);
                    // zkrácený název aplikace
                    l_oNode=node.SelectSingleNode(m_csShortName);
                    l_oThis.ShortName = new GString(l_oNode==null ? String.Empty : l_oNode.InnerText,5);
                    // minimální revize distribuèní databáze
                    l_oNode = node.SelectSingleNode(m_csRevizeAdzMin);
                    l_oThis.RevizeAdzMin = (l_oNode==null || l_oNode.InnerText==String.Empty) ? new GInt32(0) : GInt32.Parse(l_oNode.InnerText);
                    // název aplikace
                    l_oNode = node.SelectSingleNode(m_csName);
                    l_oThis.Name = new GString(l_oNode==null ? String.Empty : l_oNode.InnerText,254);
                    // minimální verze databáze v testovací distribuci
                    l_oNode = node.SelectSingleNode(m_csVerzeDbMin2);
                    l_oThis.VerzeDbMin2 = (l_oNode == null || l_oNode.InnerText == String.Empty) ? new GInt32(0) : GInt32.Parse(l_oNode.InnerText);
                    // minimální subverze databáze v testovací distribuci
                    l_oNode = node.SelectSingleNode(m_csSubVerzeDbMin2);
                    l_oThis.SubVerzeDbMin2 = (l_oNode == null || l_oNode.InnerText == String.Empty) ? new GInt32(0) : GInt32.Parse(l_oNode.InnerText);
                    // minimální revize databáze v testovací distribuci
                    l_oNode = node.SelectSingleNode(m_csRevizeAdzMin2);
                    l_oThis.RevizeAdzMin2 = (l_oNode == null || l_oNode.InnerText == String.Empty) ? new GInt32(0) : GInt32.Parse(l_oNode.InnerText);
                    // pøíznak provádìní testu verze databáze
                    l_oNode = node.SelectSingleNode(m_csTestVerzeDb);
                    l_oThis.TestVerzeDb = (l_oNode == null || l_oNode.InnerText == String.Empty) ? new GBoolean(true) : GBoolean.Parse(l_oNode.InnerText);
                    // pøíznak používání connect poolu pøi pøipojení k databázi
                    l_oNode = node.SelectSingleNode(m_csUseConnectPool);
                    l_oThis.UseConnectPool = (l_oNode == null || l_oNode.InnerText == String.Empty) ? new GBoolean(true) : GBoolean.Parse(l_oNode.InnerText);
                    // pøíznak požadavku na naèítání databázové konfigurace
                    l_oNode = node.SelectSingleNode(m_csLoadDatabaseConfiguration);
                    l_oThis.LoadDatabaseConfiguration = (l_oNode == null || l_oNode.InnerText == String.Empty) ? new GBoolean(true) : GBoolean.Parse(l_oNode.InnerText);
                } while(false);
            } // end try
            catch(Exception e) {
                throw new GException(23200196,ThisAssembly,e); // selhal pokus o deserializaci informací o aplikaci
            } // end catch
            if(l_sMissingElement != String.Empty) throw new GException(23200197,ThisAssembly,l_sMissingElement); // nelze provést deserializaci informací o aplikaci, nenalezena položka {0}
        } // end method

        #endregion

        #region soukromé metody

        /// <summary>získání verze aplikace Ginis</summary>
        /// <returns>verze aplikace Ginis</returns>
        private int GetVerze() {
            Version l_oVersion = Assembly.GetAssembly(SourceType).GetName().Version;
            if(l_oVersion == null) throw new GException(23200198,ThisAssembly); // nenalezena verze aplikace
            if(l_oVersion.Major == 3) return 100 * l_oVersion.Major + l_oVersion.Minor;
            else return l_oVersion.Major;
        } // end method

        /// <summary>získání sub verze aplikace Ginis</summary>
        /// <returns>sub verze aplikace Ginis</returns>
        private int GetSubVerze() {
            Version l_oVersion = Assembly.GetAssembly(SourceType).GetName().Version;
            if(l_oVersion == null) throw new GException(23200199,ThisAssembly); // nenalezena subverze aplikace
            if(l_oVersion.Major == 3) return l_oVersion.Build;
            else return l_oVersion.Minor;
        } // end method

        /// <summary>získání revize z tst souboru</summary>
        /// <param name="filePath">cesta k tst souboru</param>
        /// <returns>revize</returns>
        protected string GetRevizeFromTstFile(string filePath) {
            try {
                return GetValueFromTstFile(filePath,m_csProgramSection,m_csRevize);
            } // end try
            catch (Exception e) {
                throw new GException(23200200,ThisAssembly,e,filePath); // selhal pokus o získání revize ze souboru {0}
            } // end catch
        } // end method

        /// <summary>získání hodnoty parametru z tst souboru</summary>
        /// <param name="filePath">cesta k tst souboru</param>
        /// <param name="section">název sekce</param>
        /// <param name="parameter">název parametru</param>
        /// <returns>hodnota parametru</returns>
        private string GetValueFromTstFile(string filePath,string section,string parameter) {
            string l_sValue = String.Empty;
            bool l_bSearchParameter = false;
            string l_sLineText = String.Empty;
            string[] l_asLineTextParts = null;
            using(StreamReader l_oStreamReader = new StreamReader(filePath)) {
                // ètení souboru po øádcích
                while((l_sLineText = l_oStreamReader.ReadLine()) != null) {
                    l_sLineText = l_sLineText.Trim();
                    if(l_sLineText.Length > 1) {
                        if(l_bSearchParameter) {
                            // hledání hodnoty
                            if(l_sLineText[0] == '[' && l_sLineText[l_sLineText.Length - 1] == ']') break; // dosaženo další sekce
                            l_asLineTextParts = l_sLineText.Split('=');
                            if(l_asLineTextParts.Length == 2 && String.Compare(l_asLineTextParts[0].TrimEnd(),parameter,true) == 0) {
                                l_sValue = l_asLineTextParts[1].TrimStart();
                                break; // hodnota nalezena
                            } // end if
                        } else {
                            // hledání sekce
                            if(String.Compare(l_sLineText,section,true) == 0) l_bSearchParameter = true;
                        } // end if
                    } // end if
                } // end while
            } // end using
            return l_sValue;
        } // end method

        /// <summary>získání cesty k instalaci bìžných modulù</summary>
        /// <returns>cesta k instalaci bìžných modulù</returns>
        private string LocateInstallPath() {
            string l_sInstallPath = GetInstallPath();
            if(l_sInstallPath == String.Empty) {
                DirectoryInfo l_oInstallPath = Directory.GetParent(ApplicationPath);
                if(l_oInstallPath == null) l_sInstallPath = ApplicationPath;
                else l_sInstallPath = l_oInstallPath.FullName;
            } // end if
            return l_sInstallPath;
        } // end method

        /// <summary>získání revize modulu</summary>
        /// <param name="faze">programová fáze</param>
        /// <param name="path">cesta k instalaci modulu</param>
        /// <returns>revize modulu</returns>
        private string GetRevision(string faze,string path) {
            string l_sRevision = String.Empty;
            string l_sFileNameWithoutSuffix = faze.StartsWith(m_csGin) ? (m_csG32 + faze.Substring(3)) : faze;
            string l_sTstFile = Path.Combine(path,l_sFileNameWithoutSuffix + m_csTstFileSuffix);
            if(File.Exists(l_sTstFile)) {
                // získání revize z tst souboru
                l_sRevision = GetRevizeFromTstFile(l_sTstFile);
            } // end if
            if(l_sRevision == String.Empty) {
                // zámìrnì nesprávná revize
                l_sRevision = GetWrongRevision(faze);
            } // end if
            return l_sRevision;
        } // end method

        /// <summary>získání zámìrnì nesprávné revize pro danou fázi</summary>
        /// <param name="faze">programová fáze</param>
        /// <returns>zámìrnì nesprávná revize</returns>
        private string GetWrongRevision(string faze) {
            System.Diagnostics.Debug.Assert((faze!=null && faze.Length==8),"Assert: specifikována nesprávná fáze");
            return GetRevisionPrefix(faze) + faze.Substring(3) + This.Verze.Value.ToString() + GCommon.WrongRevisionSuffix;
        } // end method

        /// <summary>získání seznamu závislých modulù a jejich revizí</summary>
        private void ObtainDependantModules() {
            try {
                GDependantModules l_oDependantModules = new GDependantModules(this);
                // pøidání vlastní fáze
                l_oDependantModules.AddModule(This.Faze.Value);
                // vlastní nastavení seznamu závislých modulù
                l_oDependantModules.Initialize();
            } // end try
            catch(Exception e) {
                if(e is GException == false) e = new GException(23200201,ThisAssembly,e); // pøi pokusu o získání seznamu závislých modulù došlo k neoèekávané výjimce
                throw e;
            } // end catch
        } // end method

        /// <summary>získání zkráceného názvu aplikace</summary>
        /// <returns>zkrácený název aplikace</returns>
        private string GetApplicationShortName() {
            if(This.Faze.Value.StartsWith("GSA") || This.Faze.Value.StartsWith("GSS") || This.Faze.Value.StartsWith("GWA") || This.Faze.Value.StartsWith("GWS") || This.Faze.Value.EndsWith("01") == false) {
                return This.Faze.Value.Substring(3);
            } else {
                return This.Faze.Value.Substring(3,3);
            } // end if
        } // end method

        /// <summary>získání názvu aplikace</summary>
        /// <returns>název aplikace</returns>
        private string GetApplicationName() {
            try {
                string l_sApplicationName = String.Empty;
                if(m_oSourceType != null) {
                    if(DeclaredFaze.NameResourceCode > 0) l_sApplicationName = GResources.GetResourceText(Assembly.GetAssembly(SourceType),DeclaredFaze.NameResourceCode);
                    else {
                        object[] l_aoAttributes = Assembly.GetAssembly(SourceType).GetCustomAttributes(typeof(AssemblyDescriptionAttribute),false);
                        if(l_aoAttributes.Length == 1) l_sApplicationName = ((AssemblyDescriptionAttribute) l_aoAttributes[0]).Description;
                    } // end if
                } // end if
                return l_sApplicationName == null ? String.Empty : l_sApplicationName.Trim();
            } // end try
            catch(Exception e) {
                throw new GException(23200387,ThisAssembly,e); // selhal pokus o získání názvu aplikace
            } // end catch
        } // end method

        #endregion
        
        #region vnoøené tøídy

        /// <summary>podpora pro získání seznamu závislých modulù</summary>
        private class GDependantModules : IGObject {

            #region soukromé èleny

            /// <summary>instance rodièovského objektu</summary>
            private readonly GApplicationInfo m_oParent = null;

            /// <summary>seznam závislých modulù s jejich atributy</summary>
            private readonly HybridDictionary m_oDependantModules = new HybridDictionary();

            /// <summary>seznam povinnì vyžadovaných modulù pro aktuální programovou fázi</summary>
            private readonly HybridDictionary m_oMandatoryModules = new HybridDictionary();

            #endregion

            #region datové typy

            /// <summary>povinnost instalace závislého modulu</summary>
            private enum MandatoryType {
                /// <summary>výchozí nastavení - instalace je povinná</summary>
                Default,
                /// <summary>instalace je nepovinná</summary>
                NonMandatory,
                /// <summary>instalace je povinná</summary>
                Mandatory
            } // end enum

            /// <summary>atributy sledované u závislého modulu</summary>
            private struct ModuleProperties {
                /// <summary>programová fáze</summary>
                public string m_sFaze;
                /// <summary>revize modulu</summary>
                public string m_sRevize;
                /// <summary>nejmenší požadovaná revize</summary>
                public string m_sRevizeMin;
                /// <summary>povinnost instalace modulu</summary>
                public MandatoryType m_eMandatory;
                /// <summary>pøíznak nainstalovaného modulu</summary>
                public bool m_bInstalled;
            } // end struct

            #endregion

            #region konstruktory

            /// <summary>veøejný konstruktor</summary>
            /// <param name="parent">instance rodièovského objektu</param>
            public GDependantModules(GApplicationInfo parent) {
                System.Diagnostics.Debug.Assert(parent != null,"Assert: není specifikována instance rodièovského objektu");
                m_oParent = parent;
            } // end method

            #endregion

            #region veøejné metody

            /// <summary>pøidání nového modulu do seznamu závislých modulù</summary>
            /// <param name="faze">fáze modulu</param>
            public void AddModule(string faze) {
                if((faze=GetValidFaze(faze)) != String.Empty) {
                    if(m_oDependantModules.Contains(faze) == false) {
                        // pøidání nové fáze
                        if(faze[6]!='S' || m_oParent.This.Faze.Value.StartsWith("GSA")) { // fáze sestav se kontroluje pouze u tlustých klientù
                            ModuleProperties l_oModuleProperties = new ModuleProperties();
                            l_oModuleProperties.m_sFaze = faze;
                            l_oModuleProperties.m_sRevize = String.Empty;
                            l_oModuleProperties.m_sRevizeMin = String.Empty;
                            l_oModuleProperties.m_eMandatory = MandatoryType.Default;
                            l_oModuleProperties.m_bInstalled = true;
                            m_oDependantModules.Add(faze,l_oModuleProperties);
                        } // end if
                        // pøidání souvisejících modulù
                        if(faze[6] == 'S') {
                            AddMandatoryModule(m_csFazeGin);
                            AddMandatoryModule(m_csFazeGrr);
                        } else if(faze.StartsWith(m_csGin) && faze!=m_csFazeGin) {
                            AddMandatoryModule(m_csFazeGin);
                        } // end if
                    } // end if
                } // end if
            } // end method

            /// <summary>získání seznamu závyslích modulù</summary>
            public void Initialize() {
                string l_sFazeToInitialize = String.Empty;
                // hlavní smyèka pro analýzu všech dotèených tst souborù
                while((l_sFazeToInitialize=GetUnititializedFaze()) != String.Empty) {
                    ParseTstFile(l_sFazeToInitialize);
                } // end while
                // odmazání irelevantních modulù ze seznamu
                RemoveUnnesessaryModules();
                // finální nastavení seznamu závislých modulù 
                SetDependantModules();
            } // end method

            #endregion

            #region soukromé metody

            /// <summary>získání validního názvu programové fáze</summary>
            /// <param name="faze">programová fáze</param>
            /// <returns>validní název programové fáze, nebo prázný øetìzec v pøípadì nesprávného vstupního øetìzce</returns>
            private string GetValidFaze(string faze) {
                if(faze != null) {
                    faze = faze.Trim();
                    if(faze.Length == 8) {
                        faze = faze.ToUpper();
                        if(faze.StartsWith(m_csG32)) faze = m_csGin + faze.Substring(3);
                        return faze;
                    } // end if
                } // end if
                return String.Empty;
            } // end method

            /// <summary>pøidání povinného modulu do seznamu</summary>
            /// <param name="faze">programová fáze</param>
            private void AddMandatoryModule(string faze) {
                ModuleProperties l_oModuleProperties;
                if(m_oDependantModules.Contains(faze)) {
                    l_oModuleProperties = (ModuleProperties) m_oDependantModules[faze];
                    l_oModuleProperties.m_eMandatory = MandatoryType.Mandatory;
                    m_oDependantModules[faze] = l_oModuleProperties;
                } else {
                    l_oModuleProperties = new ModuleProperties();
                    l_oModuleProperties.m_sFaze = faze;
                    l_oModuleProperties.m_sRevize = String.Empty;
                    l_oModuleProperties.m_sRevizeMin = String.Empty;
                    l_oModuleProperties.m_eMandatory = MandatoryType.Mandatory;
                    l_oModuleProperties.m_bInstalled = true;
                    m_oDependantModules.Add(faze,l_oModuleProperties);
                } // end if
            } // end method

            /// <summary>získání programové fáze dosud neinicializovaného závislého modulu</summary>
            /// <returns>programová fáze nebo v pøípadì, že již byly inicializovány všechny závislé moduly, prázdný øetìzec</returns>
            private string GetUnititializedFaze() {
                string l_sUnititializedFaze = String.Empty;
                ModuleProperties l_oModuleProperties;
                foreach(DictionaryEntry l_oDictionaryEntry in m_oDependantModules) {
                    l_oModuleProperties = (ModuleProperties) l_oDictionaryEntry.Value;
                    if(l_oModuleProperties.m_sRevize==String.Empty && l_oModuleProperties.m_bInstalled) {
                        l_sUnititializedFaze = (string) l_oDictionaryEntry.Key;
                        break;
                    } // end if
                } // end foreach
                return l_sUnititializedFaze;
            } // end property

            /// <summary>analýza tst souboru závislého modulu</summary>
            /// <param name="faze">programová fáze</param>
            private void ParseTstFile(string faze) {
                string l_sTstFile = String.Empty;
                string l_sLineText = String.Empty;
                string[] l_asLineTextParts = null;
                bool l_bInProgramSection = false;
                bool l_bInRequiredSection = false;
                bool l_bProgramSectionParsed = false;
                bool l_bRequiredSectionParsed = false;
                try {
                    // získání pùvodního nastavení
                    ModuleProperties l_oModuleProperties = (ModuleProperties)m_oDependantModules[faze];
                    // získání cesty k tst souboru
                    l_sTstFile = GetTstFilePath(faze);
                    if(l_sTstFile == String.Empty) {
                        // tst soubor nebyl nalezen
                        l_oModuleProperties.m_bInstalled = false;
                    } else {
                        // ètení tst souboru po øádcích
                        using(StreamReader l_oStreamReader = new StreamReader(l_sTstFile)) {
                            while((l_sLineText = l_oStreamReader.ReadLine()) != null) {
                                l_sLineText = l_sLineText.Trim();
                                if(l_sLineText.Length > 1) {
                                    // další sekce tst souboru
                                    if(l_sLineText[0] == '[' && l_sLineText[l_sLineText.Length - 1] == ']') {
                                        if(l_bInProgramSection) {
                                            l_bProgramSectionParsed = true;
                                            l_bInProgramSection = false;
                                        } else if(l_bInRequiredSection) {
                                            l_bRequiredSectionParsed = true;
                                            l_bInRequiredSection = false;
                                        } // end if
                                        if(l_bProgramSectionParsed && l_bRequiredSectionParsed) break; // vše potøebé je již naèteno
                                        else if(String.Compare(l_sLineText,m_csProgramSection,true) == 0) l_bInProgramSection = true;
                                        else if(String.Compare(l_sLineText,m_csRequiredSection,true) == 0) l_bInRequiredSection = true;
                                        continue; // pøeètení dalšího øádku
                                    } // end if
                                    // analýza parametru a hodnoty
                                    if(l_bInProgramSection || l_bInRequiredSection) {
                                        l_asLineTextParts = l_sLineText.Split('=');
                                        if(l_asLineTextParts.Length == 2 && (l_asLineTextParts[0] = l_asLineTextParts[0].Trim()) != String.Empty && (l_asLineTextParts[1] = l_asLineTextParts[1].Trim()) != String.Empty) {
                                            if(l_bInProgramSection) ParseProgramSection(ref l_oModuleProperties,l_asLineTextParts[0],l_asLineTextParts[1]);
                                            else if(l_bInRequiredSection) ParseRequiredSection(l_asLineTextParts[0],l_asLineTextParts[1]);
                                        } // end if
                                    } // end if
                                } // end if
                            } // end while
                        } // end using
                        SetMandatoryModules(); // nastavení povinnì vyžadovaných modulù pro aktuální programovou fázi
                    } // end if
                    // uložení výsledku
                    SetRevision(ref l_oModuleProperties);
                    m_oDependantModules[faze] = l_oModuleProperties;
                } // end try
                catch(Exception e) {
                    if(e is GException == false) e = new GException(23200202,ThisAssembly,e,l_sTstFile); // nepodaøilo se získat seznam závislých modulù, pøi provádìní analýzy souboru {0} došlo k neoèekávané výjimce
                    throw e;
                } // end catch
            } // end method

            /// <summary>získání cesty k tst souboru závislého modulu</summary>
            /// <param name="faze">programová fáze</param>
            /// <returns>cesty k tst souboru nebo prázdný øetìzec pokud nebyl tst soubor nalezen</returns>
            private string GetTstFilePath(string faze) {
                string l_sPath = String.Empty;
                string l_sFileNameWithoutSuffix = faze.StartsWith(m_csGin) ? (m_csG32 + faze.Substring(3)) : faze;
                string l_sFileName = l_sFileNameWithoutSuffix + m_csTstFileSuffix;
                try {
                    if(faze == m_oParent.This.Faze.Value) {
                        // tst soubor aplikace
                        return m_oParent.ApplicationTstFile;
                    } else {
                        // pokus o naètení cesty z registru
                        if((l_sPath = GetFazeRegistryPath(l_sFileNameWithoutSuffix)) != String.Empty) {
                            l_sPath = Path.Combine(l_sPath,l_sFileName);
                            if(File.Exists(l_sPath)) return l_sPath;
                        } // end if
                        // pokus o nalezení tst souboru v adresáøi GIN
                        if(faze == m_csFazeGin || faze == m_csFazeGrr || faze == m_csFazeDnp) {
                            l_sPath = Path.Combine(m_oParent.GinPath,l_sFileName);
                            if(File.Exists(l_sPath)) return l_sPath;
                        } // end if 
                        // pokus o nalezení tst souboru v adresáøi aplikace
                        if(faze.StartsWith(m_oParent.This.Faze.Value.Substring(0,6)) && (faze[6] == 'S' || faze[6] == 'D') && faze[7] == m_oParent.This.Faze.Value[7]) {
                            l_sPath = Path.Combine(m_oParent.ApplicationPath,l_sFileName);
                            if(File.Exists(l_sPath)) return l_sPath;
                        } // end if
                        // pokus o nalezení tst souboru podle posledních pìti znakù fáze
                        l_sPath = Path.Combine(m_oParent.InstallPath,faze.Substring(3));
                        l_sPath = Path.Combine(l_sPath,l_sFileName);
                        if(File.Exists(l_sPath)) return l_sPath;
                        // pokus o nalezení tst souboru podle prostøedních tøí znakù fáze
                        l_sPath = Path.Combine(m_oParent.InstallPath,faze.Substring(3,3));
                        l_sPath = Path.Combine(l_sPath,l_sFileName);
                        if(File.Exists(l_sPath)) return l_sPath;
                        // pokus o nalezení tst souboru v adresáøi FRM
                        l_sPath = Path.Combine(m_oParent.InstallPath,m_csFrm);
                        l_sPath = Path.Combine(l_sPath,l_sFileName);
                        return File.Exists(l_sPath) ? l_sPath : String.Empty;
                    } // end if
                } // end try
                catch(Exception e) {
                    if(e is GException == false) e = new GException(23200203,ThisAssembly,e,faze); // pøi pokusu o získání cesty k tst souboru závislého modulu {0} došlo k neoèekávané výjimce
                    throw e;
                } // end catch
            } // end method

            /// <summary>analýza parametrù v sekci program tst souboru</summary>
            /// <param name="moduleProperties">atributy závislého modulu</param>
            /// <param name="parameterName">název parametru</param>
            /// <param name="parameterValue">hodnota parametru</param>
            private void ParseProgramSection(ref ModuleProperties moduleProperties,string parameterName,string parameterValue) {
                // nastavení revize
                if(String.Compare(parameterName,m_csRevize,true) == 0 && parameterValue.Length > 14) {
                    moduleProperties.m_sRevize = parameterValue.ToUpper();
                } // end if
            } // end method

            /// <summary>analýza parametrù v sekci required tst souboru</summary>
            /// <param name="parameterName">název parametru</param>
            /// <param name="parameterValue">hodnota parametru</param>
            private void ParseRequiredSection(string parameterName,string parameterValue) {
                ModuleProperties l_oModuleProperties;
                string l_sFaze = String.Empty;
                if(String.Compare(parameterName,m_csModules,true) == 0) {
                    // závislé fáze
                    string[] l_asModules = parameterValue.Split(',');
                    m_oMandatoryModules.Clear();
                    foreach(string l_sModule in l_asModules) {
                        if((l_sFaze = GetValidFaze(l_sModule)) != String.Empty) {
                            AddModule(l_sFaze);
                            if(m_oMandatoryModules.Contains(l_sFaze) == false) m_oMandatoryModules.Add(l_sFaze,null);
                        } // end if
                    } // end foreach
                } else if(parameterName.Length>8 && String.Compare(parameterName.Substring(8),m_csMandatory,true)==0) {
                    // povinnost
                    if((l_sFaze = GetValidFaze(parameterName.Substring(0,8))) != String.Empty) {
                        if(m_oDependantModules.Contains(l_sFaze)) {
                            if(String.Compare(parameterValue,Boolean.FalseString,true) == 0) {
                                l_oModuleProperties = (ModuleProperties)m_oDependantModules[l_sFaze];
                                if(l_oModuleProperties.m_eMandatory == MandatoryType.Default) l_oModuleProperties.m_eMandatory = MandatoryType.NonMandatory;
                                m_oDependantModules[l_sFaze] = l_oModuleProperties;
                                if(m_oMandatoryModules.Contains(l_sFaze)) m_oMandatoryModules.Remove(l_sFaze);
                            } else if(String.Compare(parameterValue,Boolean.TrueString,true) == 0) {
                                if(m_oMandatoryModules.Contains(l_sFaze) == false) m_oMandatoryModules.Add(l_sFaze,null);
                            } // end if
                        } // end if
                    } // end if
                } else if(parameterName.Length > 8 && String.Compare(parameterName.Substring(8),"_revize_min",true) == 0) {
                    // minimální požadovaná revize
                    if(
                        (l_sFaze = GetValidFaze(parameterName.Substring(0,8))) != String.Empty &&
                        m_oDependantModules.Contains(l_sFaze) &&
                        parameterValue.Length > 14
                    ) {
                        l_oModuleProperties = (ModuleProperties) m_oDependantModules[l_sFaze];
                        l_oModuleProperties.m_sRevizeMin = parameterValue;
                        m_oDependantModules[l_sFaze] = l_oModuleProperties;
                    } // end if
                } // end if
            } // end method

            /// <summary>nastavení povinnì vyžadovaných modulù pro aktuální programovou fázi</summary>
            private void SetMandatoryModules() {
                ModuleProperties l_oModuleProperties;
                string[] l_asKeys = new string[m_oMandatoryModules.Count];
                m_oMandatoryModules.Keys.CopyTo(l_asKeys,0);
                for(int i = 0; i < m_oMandatoryModules.Count; i++) {
                    if(m_oDependantModules.Contains(l_asKeys[i])) {
                        l_oModuleProperties = (ModuleProperties)m_oDependantModules[l_asKeys[i]];
                        l_oModuleProperties.m_eMandatory = MandatoryType.Mandatory;
                        m_oDependantModules[l_asKeys[i]] = l_oModuleProperties;
                    } // end if
                } // end for
            } // end method

            /// <summary>nastavení revize závislého modulu</summary>
            /// <param name="moduleProperties">atributy závislého modulu</param>
            private void SetRevision(ref ModuleProperties moduleProperties) {
                if(moduleProperties.m_bInstalled==false || moduleProperties.m_sRevize==String.Empty) {
                    if(moduleProperties.m_sFaze == m_oParent.This.Faze.Value) throw new GException(23200204,ThisAssembly,m_oParent.ApplicationTstFile); // nepodaøilo se získat revizi aplikace, v souboru {0} nebyl nalezen pøíslušný údaj
                    moduleProperties.m_sRevize = m_oParent.GetWrongRevision(moduleProperties.m_sFaze);
                } // end if
                if(moduleProperties.m_sFaze == m_oParent.This.Faze.Value) {
                    m_oParent.m_gsRevize.Value = moduleProperties.m_sRevize;
                } else if(moduleProperties.m_sFaze == m_oParent.This.FazeSes.Value) {
                    m_oParent.m_gsRevizeSes.Value = moduleProperties.m_sRevize;
                } else if(moduleProperties.m_sFaze == m_oParent.This.FazeGin.Value) {
                    m_oParent.m_gsRevizeGin.Value = moduleProperties.m_sRevize;
                } // end if
            } // end method

            /// <summary>odmazání irelevantních modulù ze seznamu závislých modulù</summary>
            private void RemoveUnnesessaryModules() {
                ModuleProperties l_oModuleProperties;
                string[] l_asKeys = new string[m_oDependantModules.Count];
                m_oDependantModules.Keys.CopyTo(l_asKeys,0);
                var l_toremove = new System.Collections.Generic.List<string>();
                for (int i = 0; i < m_oDependantModules.Count; i++) {
                    l_oModuleProperties = (ModuleProperties) m_oDependantModules[l_asKeys[i]];
                    if(l_oModuleProperties.m_bInstalled==false && (l_oModuleProperties.m_eMandatory==MandatoryType.NonMandatory || l_oModuleProperties.m_sFaze[6]=='D')) {
                        l_toremove.Add(l_asKeys[i]); //nelze rovnou odebrat, mìní se indexy v dictionary
                    } // end if
                } // end for
                foreach(var fazeToRemove in l_toremove)
                    m_oDependantModules.Remove(fazeToRemove);
            } // end method

            /// <summary>nastavení zjištìných výsledkù do promìnných rodièovského objektu</summary>
            private void SetDependantModules() {
                if(m_oDependantModules.Count == 0) {
                    m_oParent.m_gsDependantModules.Value = String.Empty;
                    m_oParent.m_gsDependantRevisions.Value = String.Empty;
                } else {
                    bool l_bFirstModule = true;
                    bool l_bCorrectRevision = true;
                    StringBuilder l_oDependantModules = new StringBuilder();
                    StringBuilder l_oDependantRevisions = new StringBuilder();
                    ModuleProperties l_oModuleProperties;
                    string[] l_asDependantModules = new string[m_oDependantModules.Count];
                    m_oDependantModules.Keys.CopyTo(l_asDependantModules,0);
                    for(int i = 0; i < m_oDependantModules.Count; i++) {
                        if(l_asDependantModules[i] == m_oParent.This.Faze.Value) continue; // vlastní fáze nepatøí mezi závislé moduly
                        l_oModuleProperties = (ModuleProperties) m_oDependantModules[l_asDependantModules[i]];
                        if(l_bFirstModule) l_bFirstModule = false;
                        else {
                            l_oDependantModules.Append(',');
                            l_oDependantRevisions.Append(',');
                        } // end if
                        l_bCorrectRevision = IsCorrectRevision(l_oModuleProperties.m_sRevize,l_oModuleProperties.m_sRevizeMin);
                        if(l_oModuleProperties.m_eMandatory == MandatoryType.NonMandatory) {
                            l_oDependantModules.Append('(');
                            l_oDependantRevisions.Append('(');
                        } else if(l_bCorrectRevision == false) l_oDependantModules.Append('[');
                        l_oDependantModules.Append(l_oModuleProperties.m_sFaze);
                        l_oDependantRevisions.Append(l_oModuleProperties.m_sRevize);
                        if(l_oModuleProperties.m_eMandatory == MandatoryType.NonMandatory) {
                            l_oDependantModules.Append(')');
                            l_oDependantRevisions.Append(')');
                        } else if(l_bCorrectRevision == false) l_oDependantModules.Append(']');
                    } // end for
                    if(l_oDependantRevisions.Length > m_oParent.m_gsDependantRevisions.MaxSize) throw new GException(23200205,ThisAssembly); // seznam závislých revizí pøesáhl maximální pøípustnou délku
                    m_oParent.m_gsDependantRevisions.Value = l_oDependantRevisions.ToString();
                    m_oParent.m_gsDependantModules.Value = l_oDependantModules.ToString();
                } // end if
            } // end method

            /// <summary>test na pøípustnost revize závislého modulu</summary>
            /// <param name="revize">revize modulu</param>
            /// <param name="revizeMin">nejmenší požadovaná revize modulu</param>
            /// <returns>pøíznak pøípustné revize</returns>
            private static bool IsCorrectRevision(string revize,string revizeMin) {
                bool l_bIsCorrect = String.IsNullOrWhiteSpace(revizeMin);
                if(
                    (revize = revize.NotNullTrimmed().ToUpper()).Length > 14 &&
                    (revizeMin = revizeMin.NotNullTrimmed().ToUpper()).Length > 14 &&
                    revize.Substring(0,7) == revizeMin.Substring(0,7)
                ) {
                    int l_nVerze = GCommon.Parse(revize.Substring(7,3),0);
                    int l_nVerzeMin = GCommon.Parse(revizeMin.Substring(7,3),0);
                    if(l_nVerze > l_nVerzeMin) l_bIsCorrect = true;
                    else if(l_nVerze == l_nVerzeMin) {
                        int l_nSubVerze = GCommon.Parse(revize.Substring(10,2),0);
                        int l_nSubVerzeMin = GCommon.Parse(revizeMin.Substring(10,2),0);
                        if(l_nSubVerze > l_nSubVerzeMin) l_bIsCorrect = true;
                        else if(l_nSubVerze == l_nSubVerzeMin) {
                            int l_nRevize = GCommon.Parse(revize.Substring(13,2),0);
                            int l_nRevizeMin = GCommon.Parse(revizeMin.Substring(13,2),0);
                            l_bIsCorrect = l_nRevize >= l_nRevizeMin;
                        } // end if
                    } // end if
                } // end if
                return l_bIsCorrect;
            } // end method

            #endregion

        } // end class

        #endregion

        #region veøejné statické metody

        /// <summary>získání cesty k instalaci bìžných modulù</summary>
        /// <returns>cesta k instalaci bìžných modulù</returns>
        /// <remarks>pokud cestu nelze získat, je vrácen prázdný øetìzec</remarks>
        public static string GetInstallPath() {
            RegistryKey l_oRegistryKey = null;
            object l_oRegistryValue = null;
            string l_sRegistryValue = String.Empty;
            string l_sInstallPath = String.Empty;
            try {
                // pokus o získání instalaèního adresáøe Ginisu z registrù
                if((l_oRegistryKey=Registry.LocalMachine.OpenSubKey(GCommon.Is32Bit ? m_csInstall32Key : m_csInstall32Key_x64)) != null) {
                    if((l_oRegistryValue=l_oRegistryKey.GetValue(m_csGinadr)) != null) {
                        if((l_sRegistryValue=l_oRegistryValue.ToString().Trim()) != String.Empty) {
                            l_sInstallPath = Path.GetFullPath(l_sRegistryValue);
                        } // end if
                    } // end if
                } // end if
            } // end try
            catch { 
                // všechny výjimky jsou ignorovány
            } // end catch
            finally {
                if(l_oRegistryKey != null) l_oRegistryKey.Close();
            } // end finally
            return l_sInstallPath;
        } // end method

        /// <summary>získání cesty k exe souboru aplikace</summary>
        /// <returns>cesta k exe souboru aplikace</returns>
        /// <remarks>pokud cestu nelze získat, je vrácen prázdný øetìzec</remarks>
        public static string GetApplicationExePath() {
            string l_sApplicationPath = String.Empty;
            try {
                l_sApplicationPath =  Path.GetFullPath(Environment.GetCommandLineArgs()[0]);
            } // end try
            catch {
                // všechny výjimky jsou ignorovány
            } // end catch
            return l_sApplicationPath;
        } // end if

        /// <summary>získání cesty k instalaci modulu ze systémového registru</summary>
        /// <returns>cesta k instalaci modulu</returns>
        public static string GetFazeRegistryPath(string faze) {
            RegistryKey l_oRegistryKey = null;
            object l_oRegistryValue = null;
            string l_sRegistryValue = String.Empty;
            try {
                if((l_oRegistryKey = Registry.CurrentUser.OpenSubKey((GCommon.Is32Bit ? m_csSharedKey : m_csSharedKey_x64) + faze)) != null) {
                    if((l_oRegistryValue = l_oRegistryKey.GetValue("dev_path")) != null) {
                        if ((l_sRegistryValue = l_oRegistryValue.ToString().Trim()) != String.Empty) {
                            return Path.GetFullPath(l_sRegistryValue);
                        } // end if
                    } // end if
                } // end if
                if (faze.StartsWith("GIN",StringComparison.InvariantCultureIgnoreCase)) faze = "G32" + faze.Substring(3);
                if ((l_oRegistryKey = Registry.LocalMachine.OpenSubKey((GCommon.Is32Bit ? m_csSharedKey : m_csSharedKey_x64) + faze)) != null) {
                    if ((l_oRegistryValue = l_oRegistryKey.GetValue(m_csInstallAdr)) != null) {
                        if ((l_sRegistryValue = l_oRegistryValue.ToString().Trim()) != String.Empty) {
                            return Path.GetFullPath(l_sRegistryValue);
                        } // end if
                    } // end if
                } // end if
            } catch { } // end try
            return String.Empty;
        } // end method

        /// <summary>získání pøedpony revize</summary>
        /// <param name="faze">programová fáze</param>
        /// <returns>pøedpona revize</returns>
        public static string GetRevisionPrefix(string faze) {
            // https://robot3.gordic.cz/doc/GINADM01/index.html?typy_aplikaci_systemu_ginis.htm
            if (faze == null || (faze = faze.Trim().ToUpper()).Length != 8) 
                throw new GException(23200375,ThisAssembly); // specifikována nesprávná fáze
            switch(faze.Substring(0,3)) {
                case "GSA": return "40";
                case "GSS": return "43";
                case "GWA": return "41";
                case "GWS": return "42";
                case "GMS": return "20";
                case "GIP": return "21";
                case "GWH": return "53";
                case "GNE": return "10";
                default: return "32";
            } // end switch
        } // end method

        /// <summary>získání revize z tst souboru pro požadovanou fázi</summary>
        /// <param name="faze">požadovaná fáze</param>
        /// <returns>revize nebo prázdný øetìzec v pøípadì, že se revizi nepodaøilo získat</returns>
        /// <remarks>metodu nelze použít pro webové aplikace a služby</remarks>
        public static string GetRevizeFromTst(string faze) {
            string l_sRevize = String.Empty;
            try {
                string l_sPath = GetFazeRegistryPath(faze);
                if(Directory.Exists(l_sPath) == false) l_sPath = Path.GetDirectoryName(GetApplicationExePath());
                l_sRevize = (new GApplicationInfo()).GetRevision(faze,l_sPath);
            } // end try
            catch {
                // všechny výjimky jsou ignorovány
            } // end catch
            return l_sRevize;
        } // end method

        #endregion

    } // end class

} // end namespace

