//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>          Gordic.General.GDbException.cs     </Name>
//    <Description>   obecná databázová výjimka          </Description>
//    <Author>        Jan Kuttich                        </Author>
//    <Copyright>     © GORDIC spol. s r. o. 1993 - 2021 </Copyright>
//    <Created>       2017-05-23                         </Created>
//  </FileHeader>

using System;
using System.Reflection;
using System.Runtime.Serialization;

namespace Gordic.General {

    /// <summary>obecná basová databázová výjimka</summary>
    [Serializable]
    public abstract class GDbException : GException  {

        #region vlastnosti

        /// <summary>kód databázové výjimky</summary>
		public abstract int ErrorCode { get; }

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(GDbException).Assembly; }
        } // end property

        #endregion

        #region konstruktory
        
        /// <summary> konstruktor povinnì odvozený ze základní tøídy </summary>
        public GDbException() : base() {} 

        /// <summary> konstruktor povinnì odvozený ze základní tøídy </summary>
        /// <param name="message">text výjimky</param>
        public GDbException(string message) : base(message) {} 
        
        /// <summary> konstruktor povinnì odvozený ze základní tøídy </summary>
        /// <param name="serializationInfo">serializovaná data výjimky</param>
        /// <param name="streamingContext">kontext serializace</param>
        protected GDbException(SerializationInfo serializationInfo,StreamingContext streamingContext) : base(serializationInfo,streamingContext) {}

        /// <summary> konstruktor povinnì odvozený ze základní tøídy </summary>
        /// <param name="message">text výjimky</param>
        /// <param name="innerException">pùvodní výjimka</param>
        public GDbException(string message,Exception innerException) : base(message,innerException) {}

        /// <summary>veøejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        public GDbException(int code) : base(code) {}

        /// <summary>veøejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="innerException">pùvodní výjimka</param>
        public GDbException(int code,Exception innerException) : base(code,innerException) {}

        /// <summary>veøejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        public GDbException(int code,int resourceCode,params object[] parameters) : base(code,resourceCode,parameters) {}
        
        /// <summary>veøejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="innerException">pùvodní výjimka</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        public GDbException(int code,int resourceCode,Exception innerException,params object[] parameters) : base(code,resourceCode,innerException,parameters) {}
        
        /// <summary>veøejný konstruktor</summary>
        /// <param name="code">kód výjimky shodný s kódem textu výjimky ve zdrojích</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        public GDbException(int code,Assembly assembly,params object[] parameters) : base(code,assembly,parameters) {}
        
        /// <summary>veøejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        public GDbException(int code,int resourceCode,Assembly assembly,params object[] parameters) : base(code,resourceCode,assembly,parameters) {}
        
        /// <summary>veøejný konstruktor</summary>
        /// <param name="code">kód výjimky shodný s kódem textu výjimky ve zdrojích</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="innerException">pùvodní výjimka</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        public GDbException(int code,Assembly assembly,Exception innerException,params object[] parameters) : base(code,assembly,innerException,parameters) {}
        
        /// <summary>veøejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="innerException">pùvodní výjimka</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        public GDbException(int code,int resourceCode,Assembly assembly,Exception innerException,params object[] parameters) : base(code,resourceCode,assembly,innerException,parameters) {}

        /// <summary>chránìný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="message">text výjimky</param>
        /// <param name="innerException">pùvodní výjimka</param>
        protected GDbException(int code,Assembly assembly,string message,Exception innerException) : base(code,assembly,message,innerException) {}

        #endregion

        #region pøetížené metody

        /// <summary>získání výchozí kategorie výjimky</summary>
        /// <returns>kategorie výjimky</returns>
        protected override ExceptionCategory OnGetCategory() {
            return ExceptionCategory.SqlActionError;
        } // end method

        #endregion

    } // end class

} // end namespace
