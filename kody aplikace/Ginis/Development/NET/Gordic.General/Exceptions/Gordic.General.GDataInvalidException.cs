//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDataInvalidException.cs                     </Name>
//    <Description> výjimka, která je vyvolávána v případě nemožnosti vykonat operaci při daném stavu dat</Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2019-02-18                                                  </Created>
//  </FileHeader>

using System;
using System.Reflection;
using System.Runtime.Serialization;
using System.Runtime.CompilerServices;

namespace Gordic.General
{

    /// <summary>výjimka, která je vyvolávána v případě nemožnosti vykonat operaci při daném stavu dat</summary>
    [Serializable]
    public class GDataInvalidException : GNonFatalException
    {
        ///// <summary>výsledek validace</summary>
        //public GValidationResult Result
        //{
        //    get => Data["Result"] as GValidationResult;
        //    private set => Data["Result"] = value;
        //}

        /// <summary>
        /// Jméno datové položky, u které je reklamována chybná hodnota dat. Může být prázdná.
        /// Počítá se i s možností datovou položku upřesnit dodatečně - tedy i mimo konstruktor.
        /// </summary>
        public string Member
        {
            get => AdditionalData.TryGetValue("member", out var res) ? res as string: null;
            set => AdditionalData["member"] = value;
        }
        /// <summary>Data s podrobnostmi o chybě. Může obsahovat např. hint k nápravě situace</summary>
        /// <remarks>Mělo by být Dto nebo anonymní objekt.</remarks>
        public object DataInvalidDetails
        {
            get => AdditionalData.TryGetValue("DataInvalidDetails", out var res) ? res : null;
            set => AdditionalData["DataInvalidDetails"] = value;
        }

        #region konstruktory

        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        public GDataInvalidException() : base() { }

        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        /// <param name="message">text výjimky</param>
        public GDataInvalidException(string message) : base(message) { }

        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        /// <param name="serializationInfo">serializovaná data výjimky</param>
        /// <param name="streamingContext">kontext serializace</param>
        protected GDataInvalidException(SerializationInfo serializationInfo, StreamingContext streamingContext) : base(serializationInfo, streamingContext) { }

        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        /// <param name="message">text výjimky</param>
        /// <param name="innerException">původní výjimka</param>
        public GDataInvalidException(string message, Exception innerException) : base(message, innerException) { }

        /// <summary>chráněný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="message">text výjimky</param>
        /// <param name="innerException">původní výjimka</param>
        protected GDataInvalidException(int code, Assembly assembly, string message, Exception innerException) : base(code, assembly, message, innerException) { }


        //-------------------------------------------------------------------------
        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód resources</param>
        /// <param name="parameters">parametry</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GDataInvalidException(int code, int resourceCode, params object[] parameters) : base(code, resourceCode, Assembly.GetCallingAssembly(), parameters) { }
        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        public GDataInvalidException(int code, int resourceCode, Assembly assembly, params object[] parameters) : base(code, resourceCode, assembly, parameters) { }

        //-------------------------------------------------------------------------
        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="member">název validovaného prvku</param>
        /// <param name="message">text výsledku validace</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GDataInvalidException(int code, string member, string message = null) : this(code, Assembly.GetCallingAssembly(), member, message) { }
        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="member">název validovaného prvku</param>
        /// <param name="message">text výsledku validace</param>
        public GDataInvalidException(int code, Assembly assembly, string member, string message = null) : this(code, assembly, message: PrepareMessage(member, message), innerException: null)
        {
            //Result = new GValidationResult(member, message);
            Member= member;
        }

        ////------------------------------------------------------------------
        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="member">název validovaného prvku</param>
        /// <param name="message">text výsledku validace</param>
        /// <param name="dataInvalidDetails">Data s podrobnostmi o chybě. Mělo by být Dto nebo anonymní objekt.</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GDataInvalidException(int code, string member, object dataInvalidDetails, string message = null) : this(code, Assembly.GetCallingAssembly(), member, dataInvalidDetails, message) { }
        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="member">název validovaného prvku</param>
        /// <param name="message">text výsledku validace</param>
        /// <param name="dataInvalidDetails">Data s podrobnostmi o chybě. Mělo by být Dto nebo anonymní objekt.</param>
        public GDataInvalidException(int code, Assembly assembly, string member, object dataInvalidDetails, string message = null) : this(code, assembly, member, message)
        {
            DataInvalidDetails = dataInvalidDetails;
        }

        public static string PrepareMessage(string member, string message)
        {
            if (message != null) return message;
            return GResources.GetResourceText(21090076, member); //RC 21090076 : Chyba datové položky {0}.
        } // end method

        #endregion

        /// <summary>Data Invalid Error</summary>
        /// <remarks>
        /// Operation cannot be performed in the current state of the data
        /// </remarks>
        /// <example>
        /// <code language="json">
        /// {"data":{"member":"field1","DataInvalidDetails":{}}}
        /// </code>  
        /// </example>
        public override string ProblemType => "data-invalid-error";
        /// <summary>Title problému pro ProblemDto</summary>
        public override string ProblemTitle => GResources.GetResourceText(21090079); //RC 21090079 : Chyba vstupních dat

        /// <summary>získání výchozí kategorie výjimky</summary>
        /// <returns>kategorie výjimky</returns>
        protected override ExceptionCategory OnGetCategory()
        {
            return ExceptionCategory.UserDataError;
        } // end method

    } // end class

}
