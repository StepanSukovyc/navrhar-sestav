//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDataStaleException.cs                       </Name>
//    <Description> výjimka, která je vyvolávána v případě neshody ETag         </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2019-02-18                                                  </Created>
//  </FileHeader>

using System;
using System.Reflection;
using System.Runtime.Serialization;
using System.Runtime.CompilerServices;

namespace Gordic.General {

    /// <summary>výjimka, která je vyvolávána v případě neshody ETag (dat_zmena) předaného a uloženého</summary>
    [Serializable]
    public class GDataStaleException : GDataInvalidException
    {

        #region konstruktory

        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        public GDataStaleException() : base() { }

        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        /// <param name="message">text výjimky</param>
        public GDataStaleException(string message) : base(message) { }

        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        /// <param name="serializationInfo">serializovaná data výjimky</param>
        /// <param name="streamingContext">kontext serializace</param>
        protected GDataStaleException(SerializationInfo serializationInfo,StreamingContext streamingContext) : base(serializationInfo,streamingContext) { }

        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        /// <param name="message">text výjimky</param>
        /// <param name="innerException">původní výjimka</param>
        public GDataStaleException(string message,Exception innerException) : base(message,innerException) { }


        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="member">název validovaného prvku</param>
        /// <param name="message">text výsledku validace</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GDataStaleException(int code, string member, string message = null) : base(code, Assembly.GetCallingAssembly(), member, message) { }

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="member">název validovaného prvku</param>
        /// <param name="message">text výsledku validace</param>
        public GDataStaleException(int code, Assembly assembly, string member, string message = null) : base(code, assembly, member, message) { }


        /// <summary>chráněný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="message">text výjimky</param>
        /// <param name="innerException">původní výjimka</param>
        protected GDataStaleException(int code,Assembly assembly,string message,Exception innerException) : base(code,assembly,message,innerException) { }

        #endregion

        /// <summary>Data Stale</summary>
        /// <remarks>
        /// Data are stale and need to be refreshed.
        /// </remarks>
        public override string ProblemType => "data-stale";

        /// <summary>Title problému pro ProblemDto</summary>
        public override string ProblemTitle => GResources.GetResourceText(21090077); //RC 21090077 : Zastaralá data

    } // end class

} // end namespace
