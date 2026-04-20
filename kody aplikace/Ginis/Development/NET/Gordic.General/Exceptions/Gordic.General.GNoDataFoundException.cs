//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GNoDataFoundException.cs                     </Name>
//    <Description> Výjimka pro případ, kdy uživatel požaduje neexistující data </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2018-12-19                                                  </Created>
//  </FileHeader>



using System;
using System.Linq;
using System.Resources;
using System.Reflection;
using System.Text;
using System.Runtime.CompilerServices;
using System.Runtime.Serialization;

namespace Gordic.General
{
    /// <summary> Výjimka pro případ, kdy uživatel požaduje neexistující data  </summary>
    [Serializable]
    [System.Security.SecurityCritical]
    public class GNoDataFoundException : GNonFatalException {

        #region konstruktory

        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        public GNoDataFoundException() : base() { }

        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        /// <param name="message">text výjimky</param>
        public GNoDataFoundException(string message) : base(message) { }

        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        /// <param name="serializationInfo">serializovaná data výjimky</param>
        /// <param name="streamingContext">kontext serializace</param>
        protected GNoDataFoundException(SerializationInfo serializationInfo, StreamingContext streamingContext) : base(serializationInfo, streamingContext) { }

        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        /// <param name="message">text výjimky</param>
        /// <param name="innerException">původní výjimka</param>
        public GNoDataFoundException(string message, Exception innerException) : base(message, innerException) { }


        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GNoDataFoundException(int code, int resourceCode, params object[] parameters) : base(code, resourceCode, Assembly.GetCallingAssembly(), null, parameters) { }

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="innerException">původní výjimka</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GNoDataFoundException(int code, int resourceCode, Exception innerException, params object[] parameters) : base(code, resourceCode, Assembly.GetCallingAssembly(), innerException, parameters) { }

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GNoDataFoundException(int code, int resourceCode, Assembly assembly, params object[] parameters) : base(code, resourceCode, assembly, null, parameters) { }

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="innerException">původní výjimka</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GNoDataFoundException(int code, int resourceCode, Assembly assembly, Exception innerException, params object[] parameters) : base(code, resourceCode, assembly, innerException, parameters) { }

        /// <summary>chráněný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="message">text výjimky</param>
        /// <param name="innerException">původní výjimka</param>
        protected GNoDataFoundException(int code, Assembly assembly, string message, Exception innerException) : base(code, assembly, message, innerException) { }
        #endregion

        /// <summary>No Data Error</summary>
        /// <remarks>
        /// Operation demands data that does not exist.
        /// Indicates that the operation attempted to access data that does not exist.
        /// This exception is thrown when a user requests data that cannot be found.
        /// </remarks>
        public override string ProblemType => "no-data-error";
        /// <summary>Title problému pro ProblemDto</summary>
        public override string ProblemTitle => GResources.GetResourceText(21090084); //RC 21090084 : Neexistující data

        /// <summary>získání výchozí kategorie výjimky</summary>
        /// <returns>kategorie výjimky</returns>
        [System.Security.SecuritySafeCritical]
        protected override ExceptionCategory OnGetCategory( )
        {
            return ExceptionCategory.UserDataError;
        } // end method

    }// end class
}// end namespace

