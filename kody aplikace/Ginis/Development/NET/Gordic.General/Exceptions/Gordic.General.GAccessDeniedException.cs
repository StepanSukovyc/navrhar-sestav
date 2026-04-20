//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>          Gordic.General.GAccessDeniedException.cs       </Name>
//    <Description>   výjimka přístup odmítnut                   </Description>
//    <Author>        Jan Kuttich                                </Author>
//    <Copyright>     © GORDIC spol. s r. o. 1993 - 2021 </Copyright>
//    <Created>       2008-07-24                                 </Created>
//  </FileHeader>

using System;
using System.Reflection;
using System.Runtime.Serialization;
using System.Runtime.CompilerServices;

namespace Gordic.General {

    /// <summary>výjimka, která je vyvolávána v případě nedostatečných oprávnění uživatele</summary>
    [Serializable]
    public class GAccessDeniedException : GNonFatalException {

        #region soukromé konstanty

        private const int m_cnDefaultMessageCode = /*RC-EX*/ 23200306; // přístup odmítnut 

        #endregion

        #region vlastnosti

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(GAccessDeniedException).Assembly; }
        } // end property

        #endregion

        #region konstruktory

        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        public GAccessDeniedException() : base() { }

        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        /// <param name="message">text výjimky</param>
        public GAccessDeniedException(string message) : base(message) { }

        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        /// <param name="serializationInfo">serializovaná data výjimky</param>
        /// <param name="streamingContext">kontext serializace</param>
        protected GAccessDeniedException(SerializationInfo serializationInfo,StreamingContext streamingContext) : base(serializationInfo,streamingContext) { }

        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        /// <param name="message">text výjimky</param>
        /// <param name="innerException">původní výjimka</param>
        public GAccessDeniedException(string message,Exception innerException) : base(message,innerException) { }

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GAccessDeniedException(int code) : base(code,Assembly.GetCallingAssembly(),GException.PrepareMessage(m_cnDefaultMessageCode,ThisAssembly),(Exception) null) { }

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="innerException">původní výjimka</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GAccessDeniedException(int code,Exception innerException) : base(code,ThisAssembly,GException.PrepareMessage(m_cnDefaultMessageCode,ThisAssembly),innerException) { }

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GAccessDeniedException(int code,int resourceCode,params object [] parameters) : base(code,resourceCode,Assembly.GetCallingAssembly(),null,parameters) { }

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="innerException">původní výjimka</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GAccessDeniedException(int code,int resourceCode,Exception innerException,params object [] parameters) : base(code,resourceCode,Assembly.GetCallingAssembly(),innerException,parameters) { }

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky shodný s kódem textu výjimky ve zdrojích</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GAccessDeniedException(int code,Assembly assembly,params object [] parameters) : base(code,code,assembly,null,parameters) { }

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GAccessDeniedException(int code,int resourceCode,Assembly assembly,params object [] parameters) : base(code,resourceCode,assembly,null,parameters) { }

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky shodný s kódem textu výjimky ve zdrojích</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="innerException">původní výjimka</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GAccessDeniedException(int code,Assembly assembly,Exception innerException,params object [] parameters) : base(code,code,assembly,innerException,parameters) { }

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="innerException">původní výjimka</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GAccessDeniedException(int code,int resourceCode,Assembly assembly,Exception innerException,params object [] parameters) : base(code,resourceCode,assembly,innerException,parameters) { }

        /// <summary>chráněný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="message">text výjimky</param>
        /// <param name="innerException">původní výjimka</param>
        protected GAccessDeniedException(int code,Assembly assembly,string message,Exception innerException) : base(code,assembly,message,innerException) { }

        #endregion

        #region přetížené metody

        /// <summary>Access Denied</summary>
        /// <remarks>
        /// Operation cannot be performed due to insufficient permissions
        /// </remarks>
        public override string ProblemType => "access-denied";
        /// <summary>Title problému pro ProblemDto</summary>
        public override string ProblemTitle => GResources.GetResourceText(21090083); //RC 21090083 : Chyba přístupu

        /// <summary>získání výchozí kategorie výjimky</summary>
        /// <returns>kategorie výjimky</returns>
        protected override ExceptionCategory OnGetCategory() {
            return ExceptionCategory.UserActionAccessError;
        } // end method

        #endregion

    } // end class

} // end namespace
