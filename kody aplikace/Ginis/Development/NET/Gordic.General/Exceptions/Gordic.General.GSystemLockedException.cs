//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>          Gordic.General.GSystemLockedException.cs </Name>
//    <Description>   výjimka uzamèení systému administrátorem </Description>
//    <Author>        Jan Kuttich                              </Author>
//    <Copyright>     © GORDIC spol. s r. o. 1993 - 2021       </Copyright>
//    <Created>       2005-05-04                               </Created>
//  </FileHeader>

using System;
using System.Resources;
using System.Reflection;
using System.Runtime.Serialization;
using System.Runtime.CompilerServices;

namespace Gordic.General {

    /// <summary>výjimka, která je vyvolávána v pøípadì uzamèení systému administrátorem</summary>
    [Serializable]
    public class GSystemLockedException : GException {
    
        #region soukromé konstanty

        private const int m_cnDefaultMessageCode = /*RC-EX*/ 23200580; // systém byl uzamèen administrátorem, v aplikaci nelze pokraèovat a bude ukonèena

        #endregion

        #region vlastnosti

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(GSystemLockedException).Assembly;}
        } // end property

        #endregion

        #region konstruktory
        
        /// <summary> konstruktor povinnì odvozený ze základní tøídy </summary>
        public GSystemLockedException() : base() {} 

        /// <summary> konstruktor povinnì odvozený ze základní tøídy </summary>
        /// <param name="message">text výjimky</param>
        public GSystemLockedException(string message) : base(message) {} 
        
        /// <summary> konstruktor povinnì odvozený ze základní tøídy </summary>
        /// <param name="serializationInfo">serializovaná data výjimky</param>
        /// <param name="streamingContext">kontext serializace</param>
        protected GSystemLockedException(SerializationInfo serializationInfo,StreamingContext streamingContext) : base(serializationInfo,streamingContext) {}

        /// <summary> konstruktor povinnì odvozený ze základní tøídy </summary>
        /// <param name="message">text výjimky</param>
        /// <param name="innerException">pùvodní výjimka</param>
        public GSystemLockedException(string message,Exception innerException) : base(message,innerException) {}

        /// <summary>veøejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GSystemLockedException(int code) : base(code,Assembly.GetCallingAssembly(),GException.PrepareMessage(m_cnDefaultMessageCode,ThisAssembly),(Exception) null) {}
		
        /// <summary>veøejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="innerException">pùvodní výjimka</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GSystemLockedException(int code, Exception innerException) : base(code,ThisAssembly,GException.PrepareMessage(m_cnDefaultMessageCode,ThisAssembly),innerException) {}

        /// <summary>veøejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GSystemLockedException(int code,int resourceCode,params object[] parameters) : base(code,resourceCode,Assembly.GetCallingAssembly(),null,parameters) {}
        
        /// <summary>veøejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="innerException">pùvodní výjimka</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GSystemLockedException(int code,int resourceCode,Exception innerException,params object[] parameters) : base(code,resourceCode,Assembly.GetCallingAssembly(),innerException,parameters) {}
        
        /// <summary>veøejný konstruktor</summary>
        /// <param name="code">kód výjimky shodný s kódem textu výjimky ve zdrojích</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GSystemLockedException(int code,Assembly assembly,params object[] parameters) : base(code,code,assembly,null,parameters) {}
        
        /// <summary>veøejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GSystemLockedException(int code,int resourceCode,Assembly assembly,params object[] parameters) : base(code,resourceCode,assembly,null,parameters) {}
        
        /// <summary>veøejný konstruktor</summary>
        /// <param name="code">kód výjimky shodný s kódem textu výjimky ve zdrojích</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="innerException">pùvodní výjimka</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GSystemLockedException(int code,Assembly assembly,Exception innerException,params object[] parameters) : base(code,code,assembly,innerException,parameters) {}
        
        /// <summary>veøejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="innerException">pùvodní výjimka</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GSystemLockedException(int code,int resourceCode,Assembly assembly,Exception innerException,params object[] parameters) : base(code,resourceCode,assembly,innerException,parameters) {}

        /// <summary>chránìný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="message">text výjimky</param>
        /// <param name="innerException">pùvodní výjimka</param>
        protected GSystemLockedException(int code,Assembly assembly,string message,Exception innerException) : base(code,assembly,message,innerException) {}

        #endregion

        #region pøetížené metody

        /// <summary>získání výchozí kategorie výjimky</summary>
        /// <returns>kategorie výjimky</returns>
        protected override ExceptionCategory OnGetCategory() {
            return ExceptionCategory.UserActionAccessError;
        } // end method

        #endregion

    } // end class
   
} // end namespace
