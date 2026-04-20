//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GResources.cs                  </Name>
//    <Description> Tøída pro pøístup k resources v rex souborech </Description>
//    <Author>      Libor Èaloud, Jan Kuttich                     </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021            </Copyright>
//    <Created>     2005-01-05                                    </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Reflection;
using System.Resources;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading;

namespace Gordic.General {

    /// <summary>tøída pro pøístup k textùm umístìným v souborech se zdroji (*.resx)</summary>
    [DebuggerStepThrough]
    [System.Security.SecuritySafeCritical]
    public static class GResources {

        /// <summary>
        /// Èíselník kultur podle GINIS tabulky Ginckul
        /// </summary>
        public enum GKulturaEnum {
            /// <summary>
            /// cs_CZ.cp1250
            /// </summary>
            Cs = 0,
            /// <summary>
            /// sk_SK.cp1250
            /// </summary>
            Sk = 10,
            /// <summary>
            /// en_GB.cp1252
            /// </summary>
            En = 20,
            /// <summary>
            /// ru_RU.cp1251
            /// </summary>
            Ru = 30,
            /// <summary>
            /// sr-Cyrl-RS    culture="Cy-sr-SP" uiCulture="Cy-sr-SP"             -- sr_RS.CP1251
            /// </summary>
            Sr = 40,
            /// <summary>
            /// Ukrajina
            /// 2019-02-25
            /// </summary>
            Uk = 50
        }

        #region delegáti

        /// <summary>delegát pro externí obsluhu získání objektu ze zdrojù</summary>
        /// <param name="assembly">assembly obsahující soubor se zdroji</param>
        /// <param name="manager">instance správce zdrojù</param>
        /// <param name="file">název souboru se zdroji (bez pøípony)</param>
        /// <param name="code">kód objektu v souboru se zdroji</param>
        /// <param name="baseValue">instance základního objektu získaného ze zdrojù</param>
        /// <returns>objekt ze zdrojù nebo null, má-li být vrácena instance základního objektu</returns>
        public delegate object OnGetResourceDelegate(Assembly assembly,ResourceManager manager,string file,string code,object baseValue);

        #endregion

        #region datové èleny

        /// <summary>pøetížení ètení resource</summary>
        public static GResourcesOverride Override;

        /// <summary>
        /// Pøíznak, který se zapíná nastavením ve web.config položky Ginis/All/Localization-debug
        /// Jeho nastavení na true ma za následek výpis ID resource kode + standardní lokalizovaný text
        /// </summary>
        public static bool OverrideDebug = false;

        /// <summary>
        /// Formátovací pøedpis pro výpis lokalizovaného textu v režimu OverrideDebug=true - v tom pøípadì se vypíše lokalizaèní zkrácený kód + lokalizovaný text
        /// </summary>
        public const string cDebugResxFrormat = "[{0}]{1}";

        /// <summary>kolekce instancí dostupných správcù souborù se zdroji</summary>
        private static readonly Hashtable m_oManagerHashTable = new Hashtable();

        /// <summary>metoda pro externí obsluhu získání textu ze zdrojù</summary>
        private static OnGetResourceDelegate m_oOnGetResourceText = null;

        /// <summary>metoda pro externí obsluhu získání objektu ze zdrojù</summary>
        private static OnGetResourceDelegate m_oOnGetResourceObject = null;

        #endregion

        #region vlastnosti

        /// <summary>metoda pro externí obsluhu získání textu ze zdrojù</summary>
        public static OnGetResourceDelegate OnGetResourceText {
            get { return m_oOnGetResourceText; }
            set { m_oOnGetResourceText = value; }
        } // end property

        /// <summary>metoda pro externí obsluhu získání objektu ze zdrojù</summary>
        public static OnGetResourceDelegate OnGetResourceObject {
            get { return m_oOnGetResourceObject; }
            set { m_oOnGetResourceObject = value; }
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(GResources).Assembly;}
        } // end property

        #endregion

        #region veøejné statické metody

        /// <summary>vrátí text ze souboru se zdroji volající assembly</summary>
        /// <param name="resourceCode">kód textu v souboru se zdroji</param>
        /// <returns>text ze souboru se zdroji</returns>
        /// <remarks>metoda pøedpokládá název souboru se zdroji shodný s názvem volající assembly ( tj. &lt;CallingAssemblyName&gt;.resx )</remarks>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public static string GetResourceText(int resourceCode) {
            return GetResourceObject(resourceCode.ToString(),String.Empty,Assembly.GetCallingAssembly(),OnGetResourceText).ToString();
        } // end method

        /// <summary>vrátí text ze souboru se zdroji volající assembly</summary>
        /// <param name="resourceCodeString">textový kód textu v souboru se zdroji</param>
        /// <returns>text ze souboru se zdroji</returns>
        /// <remarks>metoda pøedpokládá název souboru se zdroji shodný s názvem volající assembly ( tj. &lt;CallingAssemblyName&gt;.resx )</remarks>
        [MethodImpl( MethodImplOptions.NoInlining )]
        public static string GetResourceText( string resourceCodeString )
        {
            return GetResourceObject( resourceCodeString, String.Empty, Assembly.GetCallingAssembly( ), OnGetResourceText ).ToString( );
        } // end method

        /// <summary>vrátí text ze souboru se zdroji volající assembly</summary>
        /// <param name="extendedFileName">rozlišující název souboru se zdroji</param>
        /// <param name="resourceCode">kód textu v souboru se zdroji</param>
        /// <returns>text ze souboru se zdroji</returns>
        /// <remarks>metoda pøedpokládá název souboru se zdroji vzniklý spojením názvu volající assembly a zadaného rozlišujícího názvu ( tj. &lt;CallingAssemblyName&gt;.&lt;extendedFileName&gt;.resx )</remarks>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public static string GetResourceText(string extendedFileName,int resourceCode) {
            return GetResourceObject(resourceCode.ToString(),extendedFileName == null ? String.Empty : extendedFileName.Trim(),Assembly.GetCallingAssembly(),OnGetResourceText).ToString();
        } // end method

		/// <summary>vrací zformátovaný text jehož pøedloha se bere ze souboru se zdroji volající assembly</summary>
		/// <param name="resourceCode">kód pøedlohy pro formátování textu v souboru se zdroji</param>
		/// <param name="parameters">parametry pro formátování textu</param>
		/// <returns>zformátovaný text</returns>
		/// <remarks>metoda pøedpokládá název souboru se zdroji shodný s názvem volající assembly ( tj. &lt;CallingAssemblyName&gt;.resx )</remarks>
		[MethodImpl(MethodImplOptions.NoInlining)]
        public static string GetResourceText(int resourceCode,params object[] parameters) {
            string l_sFormattedText = String.Empty;
            try {
                l_sFormattedText = GetResourceObject(resourceCode.ToString(),String.Empty,Assembly.GetCallingAssembly(),OnGetResourceText).ToString();
                l_sFormattedText = String.Format(l_sFormattedText,parameters);
            } // end try
            catch(Exception e) {
                throw new GException(23200082,ThisAssembly,e,resourceCode,l_sFormattedText,GCommon.JoinTexts(parameters,',',false)); // selhalo formátování øetìzce na základì pøedlohy uložené v souboru se zdroji - kód:{0} text:{1} parametry:{2}
            } // end catch
            return l_sFormattedText;
		} // end method
       
		/// <summary>vrací zformátovaný text jehož pøedloha se bere ze souboru se zdroji volající assembly</summary>
        /// <param name="extendedFileName">rozlišující název souboru se zdroji</param>
        /// <param name="resourceCode">kód pøedlohy pro formátování textu v souboru se zdroji</param>
		/// <param name="parameters">parametry pro formátování textu</param>
		/// <returns>zformátovaný text</returns>
		/// <remarks>metoda pøedpokládá název souboru se zdroji vzniklý spojením názvu volající assembly a zadaného rozlišujícího názvu ( tj. &lt;CallingAssemblyName&gt;.&lt;extendedFileName&gt;.resx )</remarks>
		[MethodImpl(MethodImplOptions.NoInlining)]
        public static string GetResourceText(string extendedFileName,int resourceCode,params object[] parameters) {
			string l_sFormattedText = String.Empty;
            try {
                l_sFormattedText = GetResourceObject(resourceCode.ToString(),extendedFileName,Assembly.GetCallingAssembly(),OnGetResourceText).ToString();
                l_sFormattedText = String.Format(l_sFormattedText,parameters);
            } // end try
            catch(Exception e) {
                throw new GException(23200083,23200082,ThisAssembly,e,resourceCode,l_sFormattedText,GCommon.JoinTexts(parameters,',',false)); // selhalo formátování øetìzce na základì pøedlohy uložené v souboru se zdroji - kód:{0} text:{1} parametry:{2}
            } // end catch
            return l_sFormattedText;
		} // end method

        /// <summary>vrátí text ze souboru se zdroji</summary>
        /// <param name="assembly">assembly obsahující soubor se zdroji</param>
        /// <param name="resourceCode">kód textu v souboru se zdroji</param>
        /// <param name="throwOnMissing">zda vyhodit výjimku, pokud není zdroj nalezen</param>
        /// <returns>text ze souboru se zdroji</returns>
        /// <remarks>metoda pøedpokládá název souboru se zdroji shodný s názvem zadané assembly ( tj. &lt;AssemblyName&gt;.resx )</remarks>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public static string GetResourceText(Assembly assembly,int resourceCode, bool throwOnMissing = true) {
            return GetResourceObject(resourceCode.ToString(),String.Empty,assembly == null ? Assembly.GetCallingAssembly() : assembly,OnGetResourceText, throwOnMissing)?.ToString();
        } // end method

        /// <summary>vrátí text ze souboru se zdroji</summary>
        /// <param name="assembly">assembly obsahující soubor se zdroji</param>
        /// <param name="extendedFileName">rozlišující název souboru se zdroji</param>
        /// <param name="resourceCode">kód textu v souboru se zdroji</param>
        /// <param name="throwOnMissing">zda vyhodit výjimku, pokud není zdroj nalezen</param>
        /// <returns>text ze souboru se zdroji</returns>
        /// <remarks>metoda pøedpokládá název souboru se zdroji vzniklý spojením názvu specifikované assembly a zadaného rozlišujícího názvu ( tj. &lt;AssemblyName&gt;.&lt;extendedFileName&gt;.resx )</remarks>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public static string GetResourceText(Assembly assembly,string extendedFileName,int resourceCode, bool throwOnMissing = true) {
            return GetResourceObject(resourceCode.ToString(),extendedFileName == null ? String.Empty : extendedFileName.Trim(),assembly == null ? Assembly.GetCallingAssembly() : assembly,OnGetResourceText, throwOnMissing)?.ToString();
        } // end method

        /// <summary>vrací zformátovaný text jehož pøedloha se bere ze souboru se zdroji</summary>
        /// <param name="assembly">assembly obsahující soubor se zdroji</param>
        /// <param name="resourceCode">kód pøedlohy pro formátování textu v souboru se zdroji</param>
        /// <param name="parameters">parametry pro formátování textu</param>
        /// <returns>zformátovaný text</returns>
        /// <remarks>metoda pøedpokládá název souboru se zdroji shodný s názvem zadané assembly ( tj. &lt;AssemblyName&gt;.resx )</remarks>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public static string GetResourceText(Assembly assembly,int resourceCode,params object[] parameters) {
            string l_sFormattedText = String.Empty;
            try {
                l_sFormattedText = GetResourceObject(resourceCode.ToString(),String.Empty,assembly == null ? Assembly.GetCallingAssembly() : assembly,OnGetResourceText).ToString();
                l_sFormattedText = String.Format(l_sFormattedText,parameters);
            } // end try
            catch(Exception e) {
                throw new GException(23200114,23200082,ThisAssembly,e,resourceCode,l_sFormattedText,GCommon.JoinTexts(parameters,',',false)); // selhalo formátování øetìzce na základì pøedlohy uložené v souboru se zdroji - kód:{0} text:{1} parametry:{2}
            } // end catch
            return l_sFormattedText;
        } // end method

        /// <summary>
        /// Vrací zformátovaný text jehož pøedloha se bere ze souboru se zdroji.
        /// Generická varianta pro kratší zápis.
        /// </summary>
        /// <typeparam name="T">Libovolný typ z assebmly, která obsahuje soubor
        /// se zdroji</typeparam>
        /// <param name="resourceCode">ód pøedlohy pro formátování textu v 
        /// souboru se zdroji</param>
        /// <param name="parameters">parametry pro formátování textu</param>
        /// <returns></returns>
        public static string GetResourceText<T>(int resourceCode, params object[] parameters)
        {
            return GetResourceText(typeof(T).Assembly, resourceCode, parameters);
        }

        /// <summary>vrací zformátovaný text jehož pøedloha se bere ze souboru se zdroji</summary>
        /// <param name="assembly">assembly obsahující soubor se zdroji</param>
        /// <param name="extendedFileName">rozlišující název souboru se zdroji</param>
        /// <param name="resourceCode">kód pøedlohy pro formátování textu v souboru se zdroji</param>
        /// <param name="parameters">parametry pro formátování textu</param>
        /// <returns>zformátovaný text</returns>
        /// <remarks>metoda pøedpokládá název souboru se zdroji vzniklý spojením názvu specifikované assembly a zadaného rozlišujícího názvu ( tj. &lt;AssemblyName&gt;.&lt;extendedFileName&gt;.resx )</remarks>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public static string GetResourceText(Assembly assembly,string extendedFileName,int resourceCode,params object[] parameters) {
            string l_sFormattedText = String.Empty;
            try {
                l_sFormattedText = GetResourceObject(resourceCode.ToString(),extendedFileName == null ? String.Empty : extendedFileName.Trim(),assembly == null ? Assembly.GetCallingAssembly() : assembly,OnGetResourceText).ToString();
                l_sFormattedText = String.Format(l_sFormattedText,parameters);
            } // end try
            catch(Exception e) {
                throw new GException(23200115,23200082,ThisAssembly,e,resourceCode,l_sFormattedText,GCommon.JoinTexts(parameters,',',false)); // selhalo formátování øetìzce na základì pøedlohy uložené v souboru se zdroji - kód:{0} text:{1} parametry:{2}
            } // end catch
            return l_sFormattedText;
        } // end method

        /// <summary>
        /// Vrací zformátovaný text jehož pøedloha se bere ze souboru se zdroji.
        /// Generická varianta pro kratší zápis.
        /// </summary>
        /// <typeparam name="T">Libovolný typ z assebmly, která obsahuje soubor
        /// se zdroji</typeparam>
        /// <param name="extendedFileName">rozlišující název souboru se zdroji
        /// </param>
        /// <param name="resourceCode">ód pøedlohy pro formátování textu v 
        /// souboru se zdroji</param>
        /// <param name="parameters">parametry pro formátování textu</param>
        /// <returns></returns>
        public static string GetResourceText<T>(string extendedFileName
            , int resourceCode, params object[] parameters)
        {
            return GetResourceText(typeof(T).Assembly, extendedFileName
                , resourceCode, parameters);
        }

        /// <summary>vrátí objekt ze souboru se zdroji volající assembly</summary>
        /// <param name="resourceCode">kód objektu v souboru se zdroji</param>
        /// <returns>objekt ze souboru se zdroji</returns>
        /// <remarks>metoda pøedpokládá název souboru se zdroji shodný s názvem volající assembly ( tj. &lt;CallingAssemblyName&gt;.resx )</remarks>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public static object GetResourceObject(int resourceCode) {
            return GetResourceObject(resourceCode.ToString(),String.Empty,Assembly.GetCallingAssembly(),OnGetResourceObject);
        } // end method

        /// <summary>vrátí objekt ze souboru se zdroji volající assembly</summary>
        /// <param name="extendedFileName">rozlišující název souboru se zdroji</param>
        /// <param name="resourceCode">kód objektu v souboru se zdroji</param>
        /// <returns>objekt ze souboru se zdroji</returns>
        /// <remarks>metoda pøedpokládá název souboru se zdroji vzniklý spojením názvu volající assembly a zadaného rozlišujícího názvu ( tj. &lt;CallingAssemblyName&gt;.&lt;extendedFileName&gt;.resx )</remarks>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public static object GetResourceObject(string extendedFileName,int resourceCode) {
            return GetResourceObject(resourceCode.ToString(),extendedFileName == null ? String.Empty : extendedFileName.Trim(),Assembly.GetCallingAssembly(),OnGetResourceObject);
        } // end method

        /// <summary>vrátí objekt ze souboru se zdroji volající assembly</summary>
        /// <param name="resourceCode">kód objektu v souboru se zdroji</param>
        /// <returns>objekt ze souboru se zdroji</returns>
        /// <remarks>metoda pøedpokládá název souboru se zdroji shodný s názvem volající assembly ( tj. &lt;CallingAssemblyName&gt;.resx )</remarks>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public static object GetResourceObject(string resourceCode) {
            return GetResourceObject(resourceCode,String.Empty,Assembly.GetCallingAssembly(),OnGetResourceObject);
        } // end method

        /// <summary>vrátí objekt ze souboru se zdroji volající assembly</summary>
        /// <param name="extendedFileName">rozlišující název souboru se zdroji</param>
        /// <param name="resourceCode">kód objektu v souboru se zdroji</param>
        /// <returns>objekt ze souboru se zdroji</returns>
        /// <remarks>metoda pøedpokládá název souboru se zdroji vzniklý spojením názvu volající assembly a zadaného rozlišujícího názvu ( tj. &lt;CallingAssemblyName&gt;.&lt;extendedFileName&gt;.resx )</remarks>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public static object GetResourceObject(string extendedFileName,string resourceCode) {
            return GetResourceObject(resourceCode,extendedFileName == null ? String.Empty : extendedFileName.Trim(),Assembly.GetCallingAssembly(),OnGetResourceObject);
        } // end method

        /// <summary>získání souboru zaøazeného jako zdroj do volající assembly</summary>
        /// <param name="resourceFileName">název souboru</param>
        /// <returns>proud bytù zdrojového souboru</returns>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public static Stream GetResourceStream(string resourceFileName) {
            Assembly l_oAssembly = null;
            string l_sAssemblyName = String.Empty;
            string l_sResourceName = String.Empty;
            Stream l_oStream = null;
            try {
                l_oAssembly = Assembly.GetCallingAssembly();
                l_sAssemblyName = l_oAssembly.GetName().Name;
                l_sResourceName = String.Format("{0}.{1}",l_sAssemblyName,resourceFileName);
                l_oStream = l_oAssembly.GetManifestResourceStream(l_sResourceName);
                if(l_oStream == null) throw new GException(23200112,ThisAssembly,l_sResourceName); // nenalezen požadovaný zdroj {0}
            } // end try
            catch(Exception e) {
                if(e is GException == false) e = new GException(23200113,ThisAssembly,e,l_sResourceName); // pøi pokusu o získání zdroje {0} došlo k neoèekávané výjimce
                throw e;
            } // end catch
            return l_oStream;
        } // end method

        /// <summary>
        /// Vrátí resource jako StringBuilder
        /// </summary>
        /// <param name="assembly"></param>
        /// <param name="resourceName"></param>
        /// <returns></returns>
        public static StringBuilder GetResourceStreamAsStringBuilder(Assembly assembly, string resourceName)
        {
            using (var stream = assembly.GetManifestResourceStream(resourceName))
            using (var reader = new StreamReader(stream))
            {
                return new StringBuilder(reader.ReadToEnd());
            }
        }

        /// <summary>získání správce zdrojù volající assembly</summary>
        /// <returns>instance správce zdrojù</returns>
        /// <remarks>metoda pøedpokládá název souboru se zdroji shodný s názvem volající assembly ( tj. &lt;CallingAssemblyName&gt;.resx )</remarks>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public static ResourceManager GetResourceManager() {
            return GetResourceManager(String.Empty,Assembly.GetCallingAssembly());
        } // end method

        /// <summary>získání správce zdrojù volající assembly</summary>
        /// <param name="extendedFileName">rozlišující název souboru se zdroji</param>
        /// <returns>instance správce zdrojù</returns>
        /// <remarks>metoda pøedpokládá název souboru se zdroji vzniklý spojením názvu volající assembly a zadaného rozlišujícího názvu ( tj. &lt;CallingAssemblyName&gt;.&lt;extendedFileName&gt;.resx )</remarks>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public static ResourceManager GetResourceManager(string extendedFileName) {
            return GetResourceManager(extendedFileName==null ? String.Empty : extendedFileName.Trim(),Assembly.GetCallingAssembly());
        } // end method

        /// <summary>získání správce zdrojù</summary>
        /// <param name="assembly">assembly obsahující soubor se zdroji</param>
        /// <returns>instance správce zdrojù</returns>
        /// <remarks>metoda pøedpokládá název souboru se zdroji shodný s názvem zadané assembly ( tj. &lt;AssemblyName&gt;.resx )</remarks>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public static ResourceManager GetResourceManager(Assembly assembly) {
            return GetResourceManager(String.Empty,assembly==null ? Assembly.GetCallingAssembly() : assembly);
        } // end method

        /// <summary>získání správce zdrojù</summary>
        /// <param name="assembly">assembly obsahující soubor se zdroji</param>
        /// <param name="extendedFileName">rozlišující název souboru se zdroji</param>
        /// <returns>instance správce zdrojù</returns>
        /// <remarks>metoda pøedpokládá název souboru se zdroji vzniklý spojením názvu specifikované assembly a zadaného rozlišujícího názvu ( tj. &lt;AssemblyName&gt;.&lt;extendedFileName&gt;.resx )</remarks>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public static ResourceManager GetResourceManager(Assembly assembly,string extendedFileName) {
            return GetResourceManager(extendedFileName==null ? String.Empty : extendedFileName.Trim(),assembly==null ? Assembly.GetCallingAssembly() : assembly);
        } // end method

        #endregion

        #region soukromé statické metody

        /// <summary>vrátí objekt ze souboru se zdroji</summary>
        /// <param name="resourceCode">kód objektu v souboru se zdroji</param>
        /// <param name="extendedFileName">rozlišující název souboru se zdroji</param>
        /// <param name="assembly">assembly obsahující soubor se zdroji</param>
        /// <param name="customMethod">externí metoda volaná pøed vrácením vlastního objektu</param>
        /// <param name="throwOnMissing">zda vyhodit výjimku, pokud není zdroj nalezen</param>
        /// <returns>objekt ze souboru se zdroji</returns>
        [System.Security.Permissions.FileIOPermission(System.Security.Permissions.SecurityAction.Assert, AllLocalFiles = System.Security.Permissions.FileIOPermissionAccess.PathDiscovery)]
        private static object GetResourceObject(string resourceCode, string extendedFileName, Assembly assembly,OnGetResourceDelegate customMethod, bool throwOnMissing = true) {
            object l_oResourceObject = null;

            if (Override != null)
                l_oResourceObject = Override.GetResourceObject(new GResourceId(resourceCode, extendedFileName, assembly));

            if (l_oResourceObject == null)
            {
                string l_sAssemblyName = String.Empty;
                string l_sResourceName = String.Empty;
                try
                {
                    // konstrukce názvu souboru se zdroji
                    l_sAssemblyName = assembly.GetName().Name;
                    l_sResourceName = extendedFileName == String.Empty ? l_sAssemblyName : String.Format("{0}.{1}", l_sAssemblyName, extendedFileName);
                    // získání správce zdrojù
                    ResourceManager l_oResourceManager = GetResourceManager(extendedFileName, assembly);
                    // získání objektu ze zdrojù
                    l_oResourceObject = l_oResourceManager.GetObject(resourceCode);
                    // volání externí metody
                    if (customMethod != null)
                    {
                        object l_oCustomObject = customMethod(assembly, l_oResourceManager, l_sResourceName, resourceCode, l_oResourceObject);
                        if (l_oCustomObject != null)
                            l_oResourceObject = l_oCustomObject;
                    } // end if
                      // kontrola výsledku
                    if (throwOnMissing && l_oResourceObject == null)
                        throw new GException(23200051, ThisAssembly, resourceCode, l_sResourceName); // pro kód {0} nebyl v souboru {1}.resx nalezen odpovídající zdroj
                } // end try
                catch (Exception e)
                {
                    if (e is GException == false) e = new GException(23200052, ThisAssembly, e, l_sResourceName, resourceCode); // pøi pokusu o získání objektu ze souboru se zdroji došlo k neoèekávané výjimce, soubor:{0}.resx kód:{1}
                    throw e;
                } // end catch
            }

            if (GResources.OverrideDebug && l_oResourceObject != null)
                if (l_oResourceObject is string)
                {
                    GResourceId v_id = new GResourceId(resourceCode, extendedFileName, assembly);
                    l_oResourceObject = String.Format(GResources.cDebugResxFrormat, v_id.ResourceShortcut, (string)l_oResourceObject );
                }

            return l_oResourceObject;
        } // end method
        #endregion

        #region veøejné statické metody ( FFIALA )
        /// <summary>získání správce zdrojù</summary>
        /// <param name="extendedFileName">rozlišující název souboru se zdroji</param>
        /// <param name="assembly">assembly obsahující soubor se zdroji</param>
        /// <returns>instance správce zdrojù</returns>
        public static ResourceManager GetResourceManager(string extendedFileName,Assembly assembly) {
            string l_sAssemblyName = String.Empty;
            string l_sResourceName = String.Empty;
            ResourceManager l_oResourceManager = null;
            try {
                // konstrukce názvu souboru se zdroji
                l_sAssemblyName = assembly.GetName().Name;
                l_sResourceName = extendedFileName==String.Empty ? l_sAssemblyName : String.Format("{0}.{1}",l_sAssemblyName,extendedFileName);
                l_oResourceManager = GetResourceManagerBase(String.Format("{0}.{1}", l_sAssemblyName, l_sResourceName), assembly);
            } // end try
            catch(Exception e) {
                throw new GException(23200120,ThisAssembly,e,l_sResourceName); // pøi pokusu o získání instance správce zdrojù pro soubor {0}.resx došlo k neoèekávané výjimce
            } // end catch
            Debug.Assert(l_oResourceManager != null,"Assert: nepodaøilo se získat instanci správce zdrojù.");
            return l_oResourceManager;
        } // end method

        /// <summary>základní získání správce zdrojù</summary>
        /// <remarks>mohou volat generátory atp. pro centrální metodiku získávání správce zdrojù</remarks>
        public static ResourceManager GetResourceManagerBase(string baseName, Assembly assembly) {
            ResourceManager l_oResourceManager = null;
            // nalezení pøíslušného správce zdrojù
            lock (m_oManagerHashTable.SyncRoot) {
                l_oResourceManager = m_oManagerHashTable[baseName] as ResourceManager;
                // vytvoøení nového správce zdrojù
                if (l_oResourceManager == null) {
                    //#if (DEBUG || DEVELOP_VERSION)
                    //l_oResourceManager = new GCachingResourceManager(baseName, assembly);
                    //#else
                    l_oResourceManager = new ResourceManager(baseName, assembly);
                    //#endif
                    m_oManagerHashTable.Add(baseName, l_oResourceManager);
                } // end if
            } // end lock
            return l_oResourceManager;
        } // end method

        /// <summary>
        /// Pro aktuální kulturu threadu vrátí èíselníkovou hodnotu Kultura ( podle tabulky ginckul )
        /// Pokud neexistuje pøevod, vyvolá GNotImplementedException(21300005)
        /// </summary>
        /// <returns>Kultura podle èíselníkové tabulky ginckul</returns>
        public static GKulturaEnum GetGinisKultura() {
            if(TryGetGinisKultura(out GKulturaEnum kultura)) return kultura;
            else throw new GNotImplementedException(21300005,21350004,Thread.CurrentThread.CurrentUICulture.Name); //RC-EX 21350004 : Kultura aplikace {0} nemá odpovídající podporu v GINIS databázi.
        } // end method

        /// <summary>pokus o pøevod kultury aktuálního threadu na kód dle èíselníku ginckul</summary>
        /// <param name="kultura">èíselníkový kód kultury aktuálního threadu</param>
        /// <returns>true v pøípadì úspìšného pøevodu, false v pøípadì neexistence aktuální kultury v èíselníku</returns>
        public static bool TryGetGinisKultura(out GKulturaEnum kultura) {
            switch(Thread.CurrentThread.CurrentUICulture.Name) {
                case "cs_CZ":
                case "cs-CZ":
                case "cz-CS":
                    kultura = GKulturaEnum.Cs;
                    return true;
                case "sk_SK":
                case "sk-SK":
                    kultura = GKulturaEnum.Sk;
                    return true;
                case "en_GB":
                case "en-GB":
                case "en_US":
                case "en-US":
                    kultura = GKulturaEnum.En;
                    return true;
                case "ru_RU":
                case "ru-RU":
                    kultura = GKulturaEnum.Ru;
                    return true;
                case "sr_RS":
                case "sr-Cyrl-RS":
                case "Cy-sr-SP":
                    kultura = GKulturaEnum.Sr;
                    return true;
                case "uk_UA.cp1251": 
                case "uk-UA":
                    kultura = GKulturaEnum.Uk;
                    return true;
                default:
                    kultura = GKulturaEnum.Cs;
                    return false;
            } // end switch
        } // end method

        #endregion

    } // end calss

} // end namespace
