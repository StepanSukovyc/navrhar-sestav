//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>          Gordic.General.GNonFatalException.cs </Name>
//    <Description>   očekávatelná výjimka                 </Description>
//    <Author>        Jan Kuttich                          </Author>
//    <Copyright>     © GORDIC spol. s r. o. 1993 - 2021   </Copyright>
//    <Created>       2005-05-04                           </Created>
//  </FileHeader>

using System;
using System.Resources;
using System.Reflection;
using System.Runtime.Serialization;
using System.Runtime.CompilerServices;

namespace Gordic.General {
	
    /// <summary>výjimka, jejíž výskyt je očekávatelný a zpravidla je ošetřena pouze zobrazením uživatelského hlášení</summary>
    [Serializable]
    public class GNonFatalException : GException  {
    
        #region vlastnosti

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(GNonFatalException).Assembly;}
        } // end property


        /// <summary>Application Error</summary>
        /// <remarks>
        /// The server cannot process the request due to client-side errors, such as malformed syntax. Ensure the request is correctly formatted and follows API specifications.
        /// </remarks>
        public virtual string ProblemType => "application-error";
        /// <summary>Title problému pro ProblemDto</summary>
        public virtual string ProblemTitle => GResources.GetResourceText(21090078); //RC 21090078 : Chyba aplikace


        #endregion

        #region konstruktory

        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        public GNonFatalException() : base() {} 

        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        /// <param name="message">text výjimky</param>
        public GNonFatalException(string message) : base(message) {} 
        
        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        /// <param name="serializationInfo">serializovaná data výjimky</param>
        /// <param name="streamingContext">kontext serializace</param>
        protected GNonFatalException(SerializationInfo serializationInfo,StreamingContext streamingContext) : base(serializationInfo,streamingContext) {}

        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        /// <param name="message">text výjimky</param>
        /// <param name="innerException">původní výjimka</param>
        public GNonFatalException(string message,Exception innerException) : base(message,innerException) {}

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GNonFatalException(int code,int resourceCode,params object[] parameters) : base(code,resourceCode,Assembly.GetCallingAssembly(),null,parameters) {}
        
        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="innerException">původní výjimka</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GNonFatalException(int code,int resourceCode,Exception innerException,params object[] parameters) : base(code,resourceCode,Assembly.GetCallingAssembly(),innerException,parameters) {}
        
        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        public GNonFatalException(int code,int resourceCode,Assembly assembly,params object[] parameters) : base(code,resourceCode,assembly,null,parameters) {}
        
        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="innerException">původní výjimka</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        public GNonFatalException(int code,int resourceCode,Assembly assembly,Exception innerException,params object[] parameters) : base(code,resourceCode,assembly,innerException,parameters) {}

        /// <summary>chráněný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="message">text výjimky</param>
        /// <param name="innerException">původní výjimka</param>
        protected GNonFatalException(int code,Assembly assembly,string message,Exception innerException) : base(code,assembly,message,innerException) {}

        #endregion

        #region přetížené metody

        /// <summary>získání výchozí kategorie výjimky</summary>
        /// <returns>kategorie výjimky</returns>
        protected override ExceptionCategory OnGetCategory() {
            return ExceptionCategory.SqlActionError;
        } // end method

        #endregion

    } // end class
   
} // end namespace
