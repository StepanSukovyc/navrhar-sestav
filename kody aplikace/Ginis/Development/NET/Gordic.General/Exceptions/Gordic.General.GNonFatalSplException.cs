//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GSplException.cs      </Name>
//    <Description> mìkká výjimka v databázové proceduøe </Description>
//    <Author>      Martin Aliger, Jan Kuttich           </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021   </Copyright>
//    <Created>     2011-06-27                           </Created>
//  </FileHeader>

using System;
using System.Reflection;
using System.Runtime.Serialization;
using System.Runtime.CompilerServices;
using System.Text;

namespace Gordic.General
{

    /// <summary>mìkká výjimka v databázové proceduøe</summary>
    [Serializable]
    public class GNonFatalSplException : GNonFatalException, IGSplException
    {
        
        #region konstanty

        private const int m_cnDefaultMessageCode = /*RC-EX*/ 23200423; // procedura {0} skonèila s chybou kód:{1} sql:{2} isam:{3} uživ.text:{4} tech.text:{5} lok:{6}

        #endregion

        #region datové èleny

        /// <summary>informace o chybì vrácené z databázové procedury</summary>
        private GSplError m_oSplError = null;

        /// <summary>název databázové procedury v níž chyba nastala</summary>
        private string m_sProcedureName = String.Empty;

        #endregion

        #region vlastnosti
        /// <summary>
        /// Vrátí novou instanci vnitøního stavového objektu se základní sadou hodnot vrácených ze SPG 
        /// FFIALA 2018-04-30
        /// </summary>
        public GSplError SplError
        {
            get { return new GSplError(m_oSplError); }
        }


        /// <summary>název databázové procedury v níž chyba nastala</summary>
        public string ProcedureName {
            get { return m_sProcedureName; }
        } // end property

        /// <summary>èíslo chyby</summary>
        public int ErrCode {
            get { return m_oSplError == null ? 0 : m_oSplError.ErrCode; }
        } // end property

        /// <summary>èíslo sql chyby</summary>
        public int SqlErr {
            get { return m_oSplError == null ? 0 : m_oSplError.SqlErr; }
        } // end property

        /// <summary>èíslo isam chyby</summary>
        public int IsamErr {
            get { return m_oSplError == null ? 0 : m_oSplError.IsamErr; }
        } // end property

        /// <summary>text chyby bez rozdìlení na uživatelskou a technologickou èást</summary>
        public string TxtErr {
            get { return m_oSplError == null ? String.Empty : m_oSplError.TxtErr; }
        } // end property

        /// <summary>lokace chyby</summary>
        public string LokErr {
            get { return m_oSplError == null ? String.Empty : m_oSplError.LokErr; }
        } // end property

        /// <summary>pøíznak fatální chyby</summary>
        public bool FatalError {
            get { return m_oSplError == null ? false : m_oSplError.FatalError; }
        } // end property

        /// <summary>technologický text chyby</summary>
        public string FatalErrorText {
            get { return m_oSplError == null ? String.Empty : m_oSplError.FatalErrorText; }
        } // end property

        /// <summary>uživatelský text chyby</summary>
        public string UserErrorText {
            get { return m_oSplError == null ? String.Empty : m_oSplError.UserErrorText; }
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(GNonFatalSplException).Assembly; }
        } // end property

        /// <summary>chybové hlášení vèetnì textù vnitøních chyb</summary>
        public override string LongMessage {
            get {
                StringBuilder l_oMessageBuilder = new StringBuilder(InnerMessage);
                AppendAdditionalInfo(l_oMessageBuilder,AdditionalInfo,true);
                if(InnerException != null) AppendInnerException(l_oMessageBuilder,InnerException,true);
                return l_oMessageBuilder.ToString();
            } // end method
        } // end property

        /// <summary>hlášení pro výpis v rámci vnitøní výjimky</summary>
        protected override string InnerMessage {
            get {
                StringBuilder l_oMessageBuilder = new StringBuilder();
                AppendPrefix(l_oMessageBuilder);
                AppendText(l_oMessageBuilder,
                        m_cnDefaultMessageCode,
                        ThisAssembly,
                        ProcedureName,
                        ErrCode,
                        SqlErr,
                        IsamErr,
                        UserErrorText,
                        FatalErrorText,
                        LokErr
                );
                AppendPostfix(l_oMessageBuilder,Code,AssemblyName,AssemblyVersion);
                return l_oMessageBuilder.ToString();
            } // end method
        } // end property

        #endregion

        #region pøetížené metody

        /// <summary>získání výchozí kategorie výjimky</summary>
        /// <returns>kategorie výjimky</returns>
        protected override ExceptionCategory OnGetCategory() {
            return ExceptionCategory.UserActionError;
        } // end method

        #endregion

        #region konstruktory

        /// <summary> konstruktor povinnì odvozený ze základní tøídy </summary>
        public GNonFatalSplException() : base() { }

        /// <summary> konstruktor povinnì odvozený ze základní tøídy </summary>
        /// <param name="message">text výjimky</param>
        public GNonFatalSplException(string message) : base(message) { }

        /// <summary> konstruktor povinnì odvozený ze základní tøídy </summary>
        /// <param name="serializationInfo">serializovaná data výjimky</param>
        /// <param name="streamingContext">kontext serializace</param>
        protected GNonFatalSplException(SerializationInfo serializationInfo,StreamingContext streamingContext) : base(serializationInfo,streamingContext) { }

        /// <summary> konstruktor povinnì odvozený ze základní tøídy </summary>
        /// <param name="message">text výjimky</param>
        /// <param name="innerException">pùvodní výjimka</param>
        public GNonFatalSplException(string message,Exception innerException) : base(message,innerException) { }

        /// <summary>veøejný konstruktor</summary>
        /// <param name="procedureName">název databázové procedury v níž chyba nastala</param>
        /// <param name="splError">informace o chybì vrácené z databázové procedury</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GNonFatalSplException(string procedureName,GSplError splError) : base(
            splError == null ? 0 : splError.ErrCode,
            Assembly.GetCallingAssembly(),
            splError == null ? String.Empty : splError.UserErrorText,
            (Exception) null
        ) {
            m_sProcedureName = procedureName == null ? String.Empty : procedureName.Trim();
            m_oSplError = splError;
        } // end method
        
        /// <summary>veøejný konstruktor</summary>
        /// <param name="procedureName">název databázové procedury v níž chyba nastala</param>
        /// <param name="splError">informace o chybì vrácené z databázové procedury</param>
        /// <param name="innerException">pùvodní výjimka</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GNonFatalSplException(string procedureName,GSplError splError,Exception innerException) : base (
            splError == null ? 0 : splError.ErrCode,
            Assembly.GetCallingAssembly(),
            splError == null ? String.Empty : splError.UserErrorText,
            innerException
        ) {
            m_sProcedureName = procedureName == null ? String.Empty : procedureName.Trim();
            m_oSplError = splError;
        } // end method
        
        /// <summary>veøejný konstruktor</summary>
        /// <param name="procedureName">název databázové procedury v níž chyba nastala</param>
        /// <param name="splError">informace o chybì vrácené z databázové procedury</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GNonFatalSplException(string procedureName,GSplError splError,int resourceCode,params object[] parameters) : this(procedureName,splError,resourceCode,Assembly.GetCallingAssembly(),(Exception) null,parameters) { }
        
        /// <summary>veøejný konstruktor</summary>
        /// <param name="procedureName">název databázové procedury v níž chyba nastala</param>
        /// <param name="splError">informace o chybì vrácené z databázové procedury</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="innerException">pùvodní výjimka</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GNonFatalSplException(string procedureName,GSplError splError,int resourceCode,Exception innerException,params object[] parameters) : this(procedureName,splError,resourceCode,Assembly.GetCallingAssembly(),innerException,parameters) { }
        
        /// <summary>veøejný konstruktor</summary>
        /// <param name="procedureName">název databázové procedury v níž chyba nastala</param>
        /// <param name="splError">informace o chybì vrácené z databázové procedury</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GNonFatalSplException(string procedureName,GSplError splError,int resourceCode,Assembly assembly,params object[] parameters) : this(procedureName,splError,resourceCode,assembly,(Exception) null,parameters) { }
        
        /// <summary>veøejný konstruktor</summary>
        /// <param name="procedureName">název databázové procedury v níž chyba nastala</param>
        /// <param name="splError">informace o chybì vrácené z databázové procedury</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="innerException">pùvodní výjimka</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GNonFatalSplException(string procedureName,GSplError splError,int resourceCode,Assembly assembly,Exception innerException,params object[] parameters) : base(splError == null ? 0 : splError.ErrCode,resourceCode,assembly,innerException,parameters) {
            m_sProcedureName = procedureName == null ? String.Empty : procedureName.Trim();
            m_oSplError = splError;
        } // end method
        
        #endregion
    
    } // end class

} // end namespace
