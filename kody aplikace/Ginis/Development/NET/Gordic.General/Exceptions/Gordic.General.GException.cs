//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>          Gordic.General.GException.cs                </Name>
//    <Description>   obecná aplikaèní vıjimka                    </Description>
//    <Author>        Jan Kuttich                                 </Author>
//    <Copyright>     © GORDIC spol. s r. o. 1993 - 2021  </Copyright>
//    <Created>       2005-05-02                                  </Created>
//  </FileHeader>

using System;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Runtime.CompilerServices;
using System.Runtime.Serialization;

namespace Gordic.General {

    #region vıètové typy

    /// <summary>kategorie vıjimky</summary>
    public enum ExceptionCategory {
        /// <summary>neurèeno</summary>
        Unknown = 0,
        /// <summary>záznamy o závanıch nebo nároènıch interních akcích</summary>
        InternalActionLog = 1130,
        /// <summary>interní chyby v datech aplikací</summary>
        InternalDataError = 1360,
        /// <summary>pomocné ladící záznamy</summary>
        InternalProgramDebug = 1410,
        /// <summary>pomocné trasovací záznamy</summary>
        InternalProgramTrace = 1420,
        /// <summary>interní chyby v aplikaci</summary>
        InternalProgramError = 1460,
        /// <summary>interní varování systému</summary>
        InternalSystemWarning = 1550,
        /// <summary>záznamy o závanıch nebo nároènıch uivatelskıch akcích</summary>
        UserActionLog = 2130,
        /// <summary>zablokování uivatelské akce z dùvodù odmítnutí pøístupu</summary>
        UserActionAccessError = 2155,
        /// <summary>chyby pøi provádìní uivatelskıch akcí</summary>
        UserActionError = 2160,
        /// <summary>zablokování akce z dùvodù odmítnutí pøístupu k datùm</summary>
        UserDataAccessError = 2355,
        /// <summary>chyby zpùsobené nesprávnım zadáním dat</summary>
        UserDataError = 2360,
        /// <summary>
        /// Chyba obsazení DB prostøedu - zámky
        /// FFIALA 2019-03-01 
        /// </summary>
        SqlBusyError = 3152,
        /// <summary>nezávaná selhání SQL akcí</summary>
        SqlActionError = 3160,
        /// <summary>
        /// Nedostateèná práva napø. na grant
        /// FFIALA 2019-03-01 
        /// </summary>
        SQLActionAccessError = 3155,
        /// <summary>
        /// Nedostateèná práva napø. na select
        /// /// FFIALA 2019-03-01 
        /// </summary>
        SQLDataAccessError = 3355,
        /// <summary>interní SQL datové chyby</summary>
        SqlDataError = 3360,
        /// <summary>interní SQL aplikaèní chyby</summary>
        SqlProgramErrorSyntax = 3461,
        /// <summary>interní SQL strukturální chyby</summary>
        SqlProgramErrorStructure = 3462,
        /// <summary>
        /// síové selhání pøi SQL akci
        /// FFIALA 2019-03-01 
        /// </summary>
        SqlSourceNetworkError = 3660,

        /// <summary>selhání SQL akcí</summary>
        SqlSystemCriticalError = 3860,                  // mìlo by bıt 3570 ?
        /// <summary>závaná selhání SQL akcí</summary>
        SqlSystemFatalError = 3960,                     // mìlo by bıt 3580 ?

        /// <summary>záznamy o akcích interního rozhraní</summary>
        InterfaceActionLog = 5130,
        /// <summary>aplikaèní chyby interního rozhraní</summary>
        InterfaceActionError = 5160,
        /// <summary>datové chyby interního rozhraní</summary>
        InterfaceDataError = 5360,
        /// <summary>záznamy o akcích na externím rozhraní</summary>
        ExternalActionLog = 6130,
        /// <summary>aplikaèní chyby externího rozhraní</summary>
        ExternalActionError = 6160,
        /// <summary>závané aplikaèní chyby externího rozhraní</summary>
        ExternalActionCriticalError = 6170,
        /// <summary>záznamy o úspìšnì realizovanıch akcích se vztahem k zabezpeèení systému</summary>
        SecurityActionLog = 7130,
        /// <summary>záznamy o neúspìšnì realizovanıch akcích se vztahem k zabezpeèení systému</summary>
        SecurityActionWarning = 7150,
        /// <summary>záznamy o zmìnách parametrù se vztahem k zabezpeèení systému</summary>
        SecurityDataChanged = 7340,
        /// <summary>záznamy o akcích spojenıch s instalací a aktualizací</summary>
        InstalationActionLog = 9130,
        /// <summary>záznamy o akcích aplikací</summary>
        AplicationActionLog = 10130,
        /// <summary>záznamy o zmìnách dat aplikací</summary>
        AplicationDataChanged = 10340,
        /// <summary>záznamy o akcích realizovanıch v rámci administrace systému</summary>
        AdministrationActionLog = 11130,
        /// <summary>záznamy o zmìnách administraèních dat</summary>
        AdministrationDataChanged = 11340
    } // end enum

    #endregion

    /// <summary>Aplikaèní vıjimka pro obecné pouití v systému GINIS</summary>
    /// <remarks>
    /// <para>
    /// Tøída GException pøedstavuje jednotnou aplikaèní vıjimku pro obecné pouití.
    /// Jejím hlavním úèelem je umonìní unifikované správy vıjimek ve všech knihovnách a aplikacích.
    /// </para>
    /// <para>
    /// Pouití tøídy GException pøedpokládá pøidìlení unikátního kódu kadé z ní odvozené instanci vıjimky. 
    /// To umoní jednoznaènou identifikaci a lokalizaci místa vzniku kadé vıjimky ve zdrojovém kódu napøíè celım systémem.
    /// Unikátní kód je celé èíslo z øady èísel chyb pøidìlenıch autorovi.
    /// Zabezpeèení unikátnosti kódu vıjimky v rámci jedné assembly je pøitom plnì v reii autora vytváøejícího instanci tøídy GException.
    /// </para> 
    /// </remarks>
    [Serializable]
    [DebuggerStepThrough]
    public class GException : ApplicationException, IGObject {

        #region soukromé konstanty

        /// <summary>rozšiøující název souboru se zdrojovımi texty vıjimek</summary>
        private const string m_csResxExtendedFileName = "Exceptions";

        /// <summary>klíè pro uloení vıpisu zásobníku</summary>
        private const string m_csStackTrace = "StackTrace";

        /// <summary>klíè pro uloení chybového hlášení vèetnì textù vnitøních chyb</summary>
        private const string m_csLongMessage = "LongMessage";

        /// <summary>klíè s názvem aktuálního contentu</summary>
        private const string m_csCurrentContent = "CurrentContent";

        #endregion

        #region soukromé èleny

        /// <summary>kód vıjimky</summary>
        private readonly int m_nExceptionCode = Int32.MinValue;
        
        /// <summary>název assembly, ve které vıjimka vznikla</summary>
        private readonly string m_sAssemblyName = String.Empty;
        
        /// <summary>verze assembly, ve které vıjimka vznikla</summary>
        private readonly string m_sAssemblyVersion = String.Empty;

        /// <summary>url stránky, ve které vıjimka vznikla</summary>
        private readonly string m_sUrl = String.Empty;

        /// <summary>název serveru, na kterém vıjimka vznikla</summary>
        private readonly string m_sServerName = String.Empty;

        /// <summary>název contentu, ve kterém vıjimka vznikla</summary>
        private readonly string m_sCurrentContent = String.Empty;

        /// <summary>doplòující informace</summary>
        private string m_sAdditionalInfo = String.Empty;
        /// <summary>doplòující informace Dictionary</summary>
        private System.Collections.Generic.Dictionary<string, object> m_oAdditionalData = null;

        /// <summary>kategorie vıjimky</summary>
        private ExceptionCategory m_eCategory = ExceptionCategory.Unknown;

        #endregion

        #region vlastnosti

        /// <summary>chybové hlášení bez pøedpony, pøípony a textù vnitøních chyb</summary>
        public virtual string ShortMessage {
            get 
            {
                // ref T25026 - pokud se nedá naèíst message, potom vrátím prázdnı text a zabráním pádu
                try
                {
                    return base.Message;
                }
                catch( Exception error ) 
                {
                    try
                    {
                        return error.Message;
                    }
                    catch
                    {
                        return "";
                    }
                }
            }
        } // end property

        /// <summary>chybové hlášení</summary>
        public override string Message {
            get {
                StringBuilder l_oMessageBuilder = new StringBuilder();
                if(ShortMessage.StartsWith(Prefix) == false) 
                    AppendPrefix(l_oMessageBuilder);
                l_oMessageBuilder.Append(ShortMessage);
                AppendPostfix(l_oMessageBuilder, Code, AssemblyName, AssemblyVersion);
                return l_oMessageBuilder.ToString();
            } // end method
        } // end property

        /// <summary>chybové hlášení vèetnì textù vnitøních chyb</summary>
        public virtual string LongMessage {
            get {
                if(Data.Contains(m_csLongMessage)) 
                    return Data[m_csLongMessage].ToString();
                else {
                    StringBuilder l_oMessageBuilder = new StringBuilder();
                    l_oMessageBuilder.Append(Message);
                    AppendAdditionalInfo(l_oMessageBuilder,AdditionalInfo,true);
                    if(InnerException != null) AppendInnerException(l_oMessageBuilder,InnerException,true);
                    return l_oMessageBuilder.ToString();
                } // end if
            } // end method
        } // end property

        /// <summary>hlášení pro vıpis v rámci vnitøní vıjimky</summary>
        protected virtual string InnerMessage {
            get { return Message; }
        } // end property

        /// <summary>název assembly, ve které vıjimka vznikla</summary>
        public virtual string AssemblyName {
            get {return m_sAssemblyName;}
        } // end property

        /// <summary>verze assembly, ve které vıjimka vznikla</summary>
        public virtual string AssemblyVersion {
            get {return m_sAssemblyVersion;}
        } // end property

        /// <summary>kód vıjimky</summary>
        public virtual int Code {
            get {return m_nExceptionCode;}
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(GException).Assembly;}
        } // end property

        /// <summary>defaultní rozšiøující název souboru se zdrojovımi texty vıjimek</summary>
        public static string ResxExtendedFileName {
            get {return m_csResxExtendedFileName;}
        } // end property

        /// <summary>url stránky, ve které vıjimka vznikla</summary>
        public virtual string Url {
            get { return m_sUrl; }
        } // end property

        /// <summary>název serveru, na kterém vıjimka vznikla</summary>
        public virtual string ServerName {
            get { return m_sServerName; }
        } // end property

        /// <summary>název contentu, ve kterém vıjimka vznikla</summary>
        public virtual string CurrentContent {
            get { return m_sCurrentContent; }
        } // end property

        /// <summary>standardní pøedpona chybového textu</summary>
        public static string Prefix {
            get {
                return GResources.GetResourceText(ThisAssembly,23230001) + ": "; // Chyba
            } // end method
        } // end property

        /// <summary>doplòující informace</summary>
        public string AdditionalInfo {
            get { return m_sAdditionalInfo; }
            set { m_sAdditionalInfo = value == null ? String.Empty : value.Trim(); }
        } // end property

        /// <summary>doplòující informace</summary>
        public System.Collections.Generic.IDictionary<string, object> AdditionalData => m_oAdditionalData ?? (m_oAdditionalData = new System.Collections.Generic.Dictionary<string, object>());

        /// <summary>doplòující informace, které se vizualizují uivateli</summary>
        public interface IGExceptionData : IGDto {
            /// <summary>Nadpis sekce</summary>
            string Title { get; }
        } // end interface

        /// <summary>vıpis zásobníku</summary>
        public override string StackTrace {
            get { return Data.Contains(m_csStackTrace) ? Data[m_csStackTrace].ToString() : base.StackTrace; }
        } // end property

        /// <summary>kategorie vıjimky</summary>
        public ExceptionCategory Category {
            get { return GetCategory(); }
            set { m_eCategory = value; }
        } // end property

        #endregion

        #region konstruktory

        /// <summary> konstruktor povinnì odvozenı ze základní tøídy </summary>
        public GException() : base() {} 

        /// <summary> konstruktor povinnì odvozenı ze základní tøídy </summary>
        /// <param name="message">text vıjimky</param>
        public GException(string message) : base(message) {} 
        
        /// <summary>konstruktor povinnì odvozenı ze základní tøídy - deserializace</summary>
        /// <param name="serializationInfo">serializovaná data vıjimky</param>
        /// <param name="streamingContext">kontext serializace</param>
        protected GException(SerializationInfo serializationInfo,StreamingContext streamingContext) 
            : base(serializationInfo,streamingContext) 
        {
            m_nExceptionCode = serializationInfo.GetInt32("Code");
            m_sAssemblyName = serializationInfo.GetString("AssemblyName");
            m_sAssemblyVersion = serializationInfo.GetString("AssemblyVersion");
            m_sUrl = serializationInfo.GetString("Url");
            m_sServerName = serializationInfo.GetString("ServerName");
            m_sCurrentContent = serializationInfo.GetString("CurrentContent");
            m_sAdditionalInfo = serializationInfo.GetString("AdditionalInfo");
            Category = (ExceptionCategory)serializationInfo.GetValue("Category", typeof(ExceptionCategory));
            m_oAdditionalData = (System.Collections.Generic.Dictionary<string, object>)serializationInfo.GetValue("AdditionalData", typeof(System.Collections.Generic.Dictionary<string, object>));
        }

        /// <summary>povinná metoda pro serializaci</summary>
        [System.Security.SecurityCritical]
#if !NETFRAMEWORK
        [Obsolete]
#endif
        public override void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            base.GetObjectData(info, context);
            info.AddValue("Code", Code, typeof(Int32));
            info.AddValue("AssemblyName", AssemblyName, typeof(String));
            info.AddValue("AssemblyVersion", AssemblyVersion, typeof(String));
            info.AddValue("Url", Url, typeof(String));
            info.AddValue("ServerName", ServerName, typeof(String));
            info.AddValue("CurrentContent", CurrentContent, typeof(String));
            info.AddValue("AdditionalInfo", AdditionalInfo, typeof(String));
            info.AddValue("Category", Category);
            info.AddValue("AdditionalData", m_oAdditionalData, typeof(System.Collections.Generic.Dictionary<string, object>));
        }

        /// <summary> konstruktor povinnì odvozenı ze základní tøídy </summary>
        /// <param name="message">text vıjimky</param>
        /// <param name="innerException">pùvodní vıjimka</param>
        public GException(string message,Exception innerException) : base(message,innerException) {}

        /// <summary>veøejnı konstruktor</summary>
        /// <param name="code">kód vıjimky shodnı s kódem textu vıjimky ve zdrojích</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GException(int code) : this(code,code,Assembly.GetCallingAssembly(),(Exception) null,(object[]) null) { }

        /// <summary>veøejnı konstruktor</summary>
        /// <param name="code">kód vıjimky shodnı s kódem textu vıjimky ve zdrojích</param>
        /// <param name="innerException">pùvodní vıjimka</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GException(int code,Exception innerException) : this(code,code,Assembly.GetCallingAssembly(),innerException,(object[]) null) { }

        /// <summary>veøejnı konstruktor</summary>
        /// <param name="code">kód vıjimky</param>
        /// <param name="resourceCode">kód textu vıjimky v souboru se zdroji</param>
        /// <param name="parameters">parametry pro formátovanı text vıjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GException(int code,int resourceCode,params object[] parameters) : this(code,resourceCode,Assembly.GetCallingAssembly(),(Exception) null,parameters) { }
                
        /// <summary>veøejnı konstruktor</summary>
        /// <param name="code">kód vıjimky</param>
        /// <param name="resourceCode">kód textu vıjimky v souboru se zdroji</param>
        /// <param name="innerException">pùvodní vıjimka</param>
        /// <param name="parameters">parametry pro formátovanı text vıjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GException(int code,int resourceCode,Exception innerException,params object[] parameters) : this(code,resourceCode,Assembly.GetCallingAssembly(),innerException,parameters) {}
        
        /// <summary>veøejnı konstruktor</summary>
        /// <param name="code">kód vıjimky shodnı s kódem textu vıjimky ve zdrojích</param>
        /// <param name="assembly">assembly, ve které vıjimka vznikla</param>
        /// <param name="parameters">parametry pro formátovanı text vıjimky</param>
        public GException(int code,Assembly assembly,params object[] parameters) : this(code,code,assembly,(Exception) null,parameters) { }
        
        /// <summary>veøejnı konstruktor</summary>
        /// <param name="code">kód vıjimky</param>
        /// <param name="resourceCode">kód textu vıjimky v souboru se zdroji</param>
        /// <param name="assembly">assembly, ve které vıjimka vznikla</param>
        /// <param name="parameters">parametry pro formátovanı text vıjimky</param>
        public GException(int code,int resourceCode,Assembly assembly,params object[] parameters) : this(code,resourceCode,assembly,(Exception) null,parameters) { }
        
        /// <summary>veøejnı konstruktor</summary>
        /// <param name="code">kód vıjimky shodnı s kódem textu vıjimky ve zdrojích</param>
        /// <param name="assembly">assembly, ve které vıjimka vznikla</param>
        /// <param name="innerException">pùvodní vıjimka</param>
        /// <param name="parameters">parametry pro formátovanı text vıjimky</param>
        public GException(int code,Assembly assembly,Exception innerException,params object[] parameters) : this(code,code,assembly,innerException,parameters) {}
        
        /// <summary>veøejnı konstruktor</summary>
        /// <param name="code">kód vıjimky</param>
        /// <param name="resourceCode">kód textu vıjimky v souboru se zdroji</param>
        /// <param name="assembly">assembly, ve které vıjimka vznikla</param>
        /// <param name="innerException">pùvodní vıjimka</param>
        /// <param name="parameters">parametry pro formátovanı text vıjimky</param>
        public GException(int code,int resourceCode,Assembly assembly,Exception innerException,params object[] parameters) : this(code,assembly,PrepareMessage(resourceCode,assembly,parameters),innerException) {}

        /// <summary>chránìnı konstruktor</summary>
        /// <param name="code">kód vıjimky</param>
        /// <param name="assembly">assembly, ve které vıjimka vznikla</param>
        /// <param name="message">text vıjimky</param>
        /// <param name="innerException">pùvodní vıjimka</param>
        [System.Security.SecuritySafeCritical]
        [System.Security.Permissions.FileIOPermission(System.Security.Permissions.SecurityAction.Assert, AllLocalFiles = System.Security.Permissions.FileIOPermissionAccess.PathDiscovery)]
        protected GException(int code, Assembly assembly, string message, Exception innerException) : base(message, innerException) {
            m_nExceptionCode = code;
            if(assembly != null) {
                m_sAssemblyName = Path.GetFileName(assembly.Location);
                m_sAssemblyName = m_sAssemblyName == null ? String.Empty : m_sAssemblyName.Trim();
                m_sAssemblyVersion = GetAssemblyVersion(assembly);
            } // end if
            try {
#if NETFRAMEWORK
                if(System.Web.HttpContext.Current?.Request?.Url != null) m_sUrl = System.Web.HttpContext.Current.Request.Url.ToString();
                if(System.Web.HttpContext.Current?.Server?.MachineName != null) m_sServerName = System.Web.HttpContext.Current.Server.MachineName.Trim();
                if(System.Web.HttpContext.Current?.Items?.Contains(m_csCurrentContent) ?? false) m_sCurrentContent = System.Web.HttpContext.Current.Items[m_csCurrentContent]?.ToString()?.Trim() ?? String.Empty;
#endif
            } // end try
            catch {
                // všechny vıjimky jsou ignorovány
            } // end catch
        } // end method

        /// <summary>kopírovací konstruktor</summary>
        /// <param name="exception">pùvodní vıjimka</param>
        protected GException(GException exception) : base(exception.ShortMessage,exception.InnerException) {
            m_nExceptionCode = exception.m_nExceptionCode;
            m_sAssemblyName = exception.m_sAssemblyName;
            m_sAssemblyVersion = exception.m_sAssemblyVersion;
            m_sUrl = exception.m_sUrl;
            m_sServerName = exception.m_sServerName;
            m_sCurrentContent = exception.m_sCurrentContent;
            m_sAdditionalInfo = exception.m_sAdditionalInfo;
            m_oAdditionalData = exception.m_oAdditionalData == null ? null : new System.Collections.Generic.Dictionary<string, object>(exception.m_oAdditionalData);
            if (exception.Data.Contains(m_csLongMessage)) Data[m_csLongMessage] = exception.Data[m_csLongMessage];
            if(String.IsNullOrWhiteSpace(exception.StackTrace) == false) Data[m_csStackTrace] = exception.StackTrace;
        } // end method

        /// <summary>soukromı konstruktor</summary>
        /// <param name="code">kód vıjimky</param>
        /// <param name="message">text vıjimky</param>
        /// <param name="assemblyName">assembly, ve které vıjimka vznikla</param>
        /// <param name="assemblyVersion">verze assembly, ve které vıjimka vznikla</param>
        private GException(int code,string message,string assemblyName,string assemblyVersion) : base(message) {
            m_nExceptionCode = code;
            m_sAssemblyName = assemblyName;
            m_sAssemblyVersion = assemblyVersion;
        } // end method

        #endregion

        #region virtuální metody

        /// <summary>získání vıchozí kategorie vıjimky</summary>
        /// <returns>kategorie vıjimky</returns>
        protected virtual ExceptionCategory OnGetCategory() {
            return ExceptionCategory.Unknown;
        } // end method

        #endregion

        #region chránìné metody

        /// <summary>pøíprava textu obecné aplikaèní vıjimky</summary>
        /// <param name="resourceCode">kód textu vıjimky v souboru se zdroji</param>
        /// <param name="assembly">assembly, ve které vıjimka vznikla</param>
        /// <param name="parameters">parametry pro formátování textu chyby</param>
        /// <returns>zformátovanı text obecné aplikaèní vıjimky</returns>
        protected static string PrepareMessage(int resourceCode,Assembly assembly,params object[] parameters) {
            StringBuilder l_oMessageBuilder = new StringBuilder();
            AppendText(l_oMessageBuilder,resourceCode,assembly,parameters); // text chyby
            return l_oMessageBuilder.ToString(); // vrácení textu vıjimky
        } // end method 

        /// <summary>pøipojení standardní pøedpony chybového textu</summary>
        /// <param name="messageBuilder">odkaz na formátovací objekt textu chyby</param>
        protected static void AppendPrefix(StringBuilder messageBuilder) {
            if(messageBuilder != null) messageBuilder.Append(Prefix); 
        } // end method

        /// <summary>pøipojení zformátovaného textu chyby</summary>
        /// <param name="messageBuilder">odkaz na formátovací objekt textu chyby</param>
        /// <param name="resourceCode">kód textu vıjimky v souboru se zdroji</param>
        /// <param name="assembly">assembly, ve které vıjimka vznikla</param>
        /// <param name="parameters">parametry pro formátování textu chyby</param>
        protected static void AppendText(StringBuilder messageBuilder,int resourceCode,Assembly assembly,params object[] parameters) {
            if(messageBuilder != null) {
                string l_sText = null;
                if(assembly != null) {
                    try {
                        if(parameters == null || parameters.Length == 0) 
                            l_sText = GResources.GetResourceText(assembly,m_csResxExtendedFileName,resourceCode);
                        else 
                            l_sText = GResources.GetResourceText(assembly,m_csResxExtendedFileName,resourceCode,parameters);
                    } // end try 
                    catch(Exception e) {
                        if(e is GException) 
                            l_sText = ((GException) e).ShortMessage;
                    } // end catch
                } // end if
                if(l_sText == null || (l_sText = l_sText.Trim()) == String.Empty) 
                    l_sText = GResources.GetResourceText(ThisAssembly,23230003); // v aplikaci došlo k neoèekávané vıjimce
                messageBuilder.Append(l_sText);
            } // end if
        } // end method

        /// <summary>pøipojení pøípony chybového textu</summary>
        /// <param name="messageBuilder">odkaz na formátovací objekt textu chyby</param>
        /// <param name="code">kód vıjimky</param>
        /// <param name="assemblyName">assembly, ve které vıjimka vznikla</param>
        /// <param name="assemblyVersion">verze assembly, ve které vıjimka vznikla</param>
        protected static void AppendPostfix(StringBuilder messageBuilder, int code, string assemblyName, string assemblyVersion) {
            if(messageBuilder != null && (String.IsNullOrWhiteSpace(assemblyName) == false || code != Int32.MinValue)) {
                messageBuilder.AppendLine();
                messageBuilder.Append("[ ");
                if(String.IsNullOrWhiteSpace(assemblyName) == false) {
                    // název assembly
                    messageBuilder.Append(GResources.GetResourceText(ThisAssembly,23230004)); // zdroj:
                    messageBuilder.Append(' ');
                    messageBuilder.Append(assemblyName);
                    if(String.IsNullOrWhiteSpace(assemblyVersion) == false) {
                        // verze assembly
                        messageBuilder.Append(' ');
                        messageBuilder.Append(GResources.GetResourceText(ThisAssembly,23230005)); // verze:
                        messageBuilder.Append(' ');
                        messageBuilder.Append(assemblyVersion);
                    } // end if
                } // end if
                if(code != Int32.MinValue) {
                    // kód chyby
                    messageBuilder.Append(' ');
                    messageBuilder.Append(GResources.GetResourceText(ThisAssembly,23230006)); // kód:
                    messageBuilder.Append(' ');
                    messageBuilder.Append(code);
                } // end if
                messageBuilder.Append(" ]");
            } // end if
        } // end method

        /// <summary>pøipojení doplòujících informací</summary>
        /// <param name="messageBuilder">odkaz na formátovací objekt textu chyby</param>
        /// <param name="additionalInfo">doplòující informace</param>
        /// <param name="writeTitle">pøíznak vıpisu nadpisu</param>
        protected static void AppendAdditionalInfo(StringBuilder messageBuilder,string additionalInfo,bool writeTitle) {
            if(messageBuilder != null && additionalInfo != null && additionalInfo != String.Empty) {
                messageBuilder.AppendLine();
                // vypsání nadpisu
                if(writeTitle) {
                    messageBuilder.AppendLine();
                    messageBuilder.Append(GResources.GetResourceText(ThisAssembly,23230174)); // Doplòující informace k vıjimce
                    messageBuilder.Append(" :");
                    messageBuilder.AppendLine();
                } // end if
                // pøipojení doplòujících informací
                messageBuilder.Append(additionalInfo);
            } // end if
        } // end method

        /// <summary>pøipojení textu všech podøízenıch vıjimek</summary>
        /// <param name="messageBuilder">odkaz na formátovací objekt textu chyby</param>
        /// <param name="exception">vıjimka</param>
        /// <param name="writeTitle">pøíznak vıpisu nadpisu</param>
        protected static void AppendInnerException(StringBuilder messageBuilder,Exception exception,bool writeTitle) {
            if(messageBuilder != null && exception != null) {
                messageBuilder.AppendLine();
                // vypsání nadpisu
                if(writeTitle) {
                    messageBuilder.AppendLine();
                    messageBuilder.Append(GResources.GetResourceText(ThisAssembly,23230002)); // Doplòující informace o pøíèinách
                    messageBuilder.Append(" :");
                    messageBuilder.AppendLine();
                } // end if
                // pøipojení textu
                GException l_oException = exception as GException;
                if (l_oException == null) {
                    // ref T25026 - pokud se nedá naèíst message, potom vrátím prázdnı text a zabráním pádu
                    try
                    {
                        messageBuilder.Append(exception.Message);   // text obecné vıjimky
                    } 
                    catch { }
                    // doplnìní informací k vıjimce SEHException
                    if(exception is SEHException) messageBuilder.Append(GetSEHExceptionInfo(exception as SEHException));
                } else {
                    // text vıjimky GException
                    if(l_oException.Data.Contains(m_csLongMessage)) {
                        messageBuilder.Append(
                            l_oException.LongMessage.Replace(
                                String.Format("{0} :{1}",GResources.GetResourceText(ThisAssembly,23230002),Environment.NewLine), // Doplòující informace o pøíèinách
                                String.Empty
                            )
                        );
                    } else messageBuilder.Append(l_oException.InnerMessage);
                    AppendAdditionalInfo(messageBuilder,l_oException.AdditionalInfo,false);
                } // end if
                // pøipojení textu vnitøní chyby
                if(exception.InnerException != null) {
                    if(exception is GException) messageBuilder.AppendLine();
                    AppendInnerException(messageBuilder,exception.InnerException,false);
                } // end if
            } // end if
        } // end method

        /// <summary>získání instance vıjimky z chybového hlášení</summary>
        /// <param name="message">chybové hlášení</param>
        /// <returns>instance vıjimky nebo null, pokud chybové hlášení nemá odpovídající formát</returns>
        protected static GException Parse(string message) {
            try {
                GException l_oException = null;
                if(String.IsNullOrWhiteSpace(message) == false) {
                    Match l_oMatch = Regex.Match(
                        message,
                        String.Format(
                            @"^{0}:\s(.*)\r\n\[\s{1}\s(.*)\s{2}\s(.*)\s{3}\s(\d+)\s\]",
                            GResources.GetResourceText(ThisAssembly,23230001), // Chyba
                            GResources.GetResourceText(ThisAssembly,23230004), // zdroj:
                            GResources.GetResourceText(ThisAssembly,23230005), // verze:
                            GResources.GetResourceText(ThisAssembly,23230006) // kód:
                        ),
                        RegexOptions.Multiline
                    );
                    if(l_oMatch.Success && l_oMatch.Groups.Count == 5) {
                        string l_sMessage = l_oMatch.Groups[1].Value;
                        string l_sAssemblyName = l_oMatch.Groups[2].Value;
                        string l_sAssemblyVersion = l_oMatch.Groups[3].Value;
                        int l_nCode = GCommon.Parse(l_oMatch.Groups[4].Value,0);
                        if(
                            String.IsNullOrWhiteSpace(l_sMessage) == false &&
                            String.IsNullOrWhiteSpace(l_sAssemblyName) == false &&
                            String.IsNullOrWhiteSpace(l_sAssemblyVersion) == false &&
                            l_nCode > 0
                        ) {
                            l_oException = new GException(l_nCode,l_sMessage,l_sAssemblyName,l_sAssemblyVersion);
                            l_oException.Data[m_csLongMessage] = message;
                        } // end if
                    } // end if
                } // end if
                return l_oException;
            } // end try
            catch {
                return null;
            } // end catch
        } // end method

        /// <summary>získání interní kategorie vıjimky</summary>
        /// <returns>kategorie vıjimky</returns>
        protected ExceptionCategory GetInternalCategory() {
            return m_eCategory;
        } // end method

        #endregion

        #region soukromé metody

        /// <summary>získání verze assembly</summary>
        /// <param name="assembly">assembly</param>
        /// <returns>verze assembly</returns>
        private static string GetAssemblyVersion(Assembly assembly) {
            string l_sVersion = String.Empty;
            if(assembly != null) {
                l_sVersion = GetAssemblyFileVersion(assembly);
                if(l_sVersion == String.Empty) l_sVersion = assembly.GetName().Version.ToString();
            } // end if
            return l_sVersion;
        } // end method

        /// <summary>získání verze z atributu obsahujícího verzi souboru</summary>
        /// <param name="assembly">assembly</param>
        /// <returns>verze assembly</returns>
        private static string GetAssemblyFileVersion(Assembly assembly) {
            string l_sVersion = String.Empty;
            if(assembly != null) {
                object [] l_aoAttributes = assembly.GetCustomAttributes(typeof(System.Reflection.AssemblyFileVersionAttribute),false);
                System.Reflection.AssemblyFileVersionAttribute l_oAttribute = (l_aoAttributes==null || l_aoAttributes.Length<1) ? null : l_aoAttributes[0] as System.Reflection.AssemblyFileVersionAttribute;
                if(l_oAttribute != null) l_sVersion = l_oAttribute.Version;
            } // end if
            return l_sVersion;
        } // end method

        /// <summary>získání doplòujících informací k vıjimce SEHException</summary>
        /// <param name="exception">zdrojová vıjimka</param>
        /// <returns>doplòujících informací k vıjimce</returns>
        private static string GetSEHExceptionInfo(SEHException exception) {
            if(exception == null) return String.Empty;
            else {
                return String.Format(
                    " - hResult:{0}  helpLink:{1}  source:{2}  targetSite:{3}",
                    exception.ErrorCode.ToString("X8",CultureInfo.InvariantCulture),
                    exception.HelpLink == null ? String.Empty : exception.HelpLink.Trim(),
                    exception.Source == null ? String.Empty : exception.Source.Trim(),
                    exception.TargetSite == null || exception.TargetSite.Name == null ? String.Empty : exception.TargetSite.Name.Trim()
                );
            } // end if
        } // end method

        /// <summary>získání kategorie vıjimky</summary>
        /// <returns>kategorie vıjimky</returns>
        private ExceptionCategory GetCategory() {
            try {
                if(m_eCategory == ExceptionCategory.Unknown) {
                    // dohledání autorem nastavené kategorie
                    ExceptionCategory l_eCategory = ExceptionCategory.Unknown;
                    Exception l_oException = this;
                    do {
                        if(l_oException is GException) {
                            l_eCategory = ((GException) l_oException).GetInternalCategory();
                            if(l_eCategory != ExceptionCategory.Unknown) return l_eCategory;
                        } // end if
                    } while((l_oException = l_oException.InnerException) != null);
                    // dohledání vıchozí kategorie
                    l_oException = this;
                    do {
                        if(l_oException is GException) {
                            l_eCategory = ((GException) l_oException).OnGetCategory();
                            if(l_eCategory != ExceptionCategory.Unknown) return l_eCategory;
                        } // end if
                    } while((l_oException = l_oException.InnerException) != null);
                } // end if
                return m_eCategory;
            } // end try
            catch(Exception e) {
                Debug.Assert(false,e.Message);
                return ExceptionCategory.Unknown;
            } // end catch
        } // end method

        #endregion

        #region veøejné metody

        /// <summary>získání pøíznaku zda nìkterá z vnoøenıch vıjimek je daného typu</summary>
        /// <param name="exceptionType">hledanı typ vıjimky</param>
        /// <returns>true v pøípadì nalezení vıjimky poadovaného typu, jinak false</returns>
        public bool ContainsInnerException(Type exceptionType) {
            return ContainsInnerException(exceptionType,true);
        } // end method

        /// <summary>získání pøíznaku zda nìkterá z vnoøenıch vıjimek je daného typu</summary>
        /// <param name="exceptionType">hledanı typ vıjimky</param>
        /// <param name="findDerived">pøíznak získání té odvozennıch typù vıjimky</param>
        /// <returns>true v pøípadì nalezení vıjimky poadovaného typu, jinak false</returns>
        public bool ContainsInnerException(Type exceptionType,bool findDerived) {
            return GetInnerException(exceptionType,findDerived) != null;
        } // end method

        /// <summary>získání vıjimky poadovaného typu ze všech vnoøenıch vıjimek</summary>
        /// <param name="exceptionType">hledanı typ vıjimky</param>
        /// <returns>vrací vıjimku poadovaného typu nebo null v pøípadì, e taková vıjimka nebyla nalezena</returns>
        public Exception GetInnerException(Type exceptionType) {
            return GetInnerException(exceptionType,true);
        } // end method

        /// <summary>získání vıjimky poadovaného typu ze všech vnoøenıch vıjimek</summary>
        /// <param name="exceptionType">hledanı typ vıjimky</param>
        /// <param name="findDerived">pøíznak získání té odvozennıch typù vıjimky</param>
        /// <returns>vrací vıjimku poadovaného typu nebo null v pøípadì, e taková vıjimka nebyla nalezena</returns>
        public Exception GetInnerException(Type exceptionType,bool findDerived) {
            if(exceptionType == null || (exceptionType != typeof(Exception) && exceptionType.IsSubclassOf(typeof(Exception)) == false)) throw new GArgumentException(23200171);
            Exception l_oException = this;
            do {
                if(l_oException.GetType() == exceptionType || (findDerived && l_oException.GetType().IsSubclassOf(exceptionType))) break;
                else l_oException = l_oException.InnerException;
            } while(l_oException != null); // end while
            return l_oException;
        } // end method

        /// <summary>získání vıjimky poadovaného typu, odvozeného z GException, ze všech vnoøenıch vıjimek</summary>
        /// <param name="exceptionType">hledanı typ vıjimky</param>
        /// <returns>vrací vıjimku poadovaného typu nebo null v pøípadì, e taková vıjimka nebyla nalezena</returns>
        public GException GetInnerGException(Type exceptionType) {
            return GetInnerGException(exceptionType,true);
        } // end method

        /// <summary>získání vıjimky poadovaného typu, odvozeného z GException, ze všech vnoøenıch vıjimek</summary>
        /// <param name="exceptionType">hledanı typ vıjimky</param>
        /// <param name="findDerived">pøíznak získání té odvozennıch typù vıjimky</param>
        /// <returns>vrací vıjimku poadovaného typu nebo null v pøípadì, e taková vıjimka nebyla nalezena</returns>
        public GException GetInnerGException(Type exceptionType,bool findDerived) {
            if(exceptionType == null || (exceptionType != typeof(GException) && exceptionType.IsSubclassOf(typeof(GException)) == false)) throw new GArgumentException(23200172);
            return GetInnerException(exceptionType,findDerived) as GException;
        } // end method

        #endregion

    } // end class
   
} // end namespace
