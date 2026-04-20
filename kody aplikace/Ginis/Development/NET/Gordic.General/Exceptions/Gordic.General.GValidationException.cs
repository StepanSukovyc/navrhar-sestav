//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GValidationException.cs                      </Name>
//    <Description> výjimka při validaci DTO                                    </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2016-07-28                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Runtime.Serialization;
using System.Text;

namespace Gordic.General {
    
    /// <summary>výjimka při validaci DTO</summary>
    [Serializable]
    public class GValidationException : GNonFatalException {

        #region vlastnosti

        /// <summary>seznam výsledků validace</summary>
        //public IEnumerable<GValidationResult> Results { get; private set; }
        public IEnumerable<GValidationResult> Results { get => Data["Results"] as IEnumerable<GValidationResult>; private set => Data["Results"] = value; }

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(GValidationException).Assembly; }
        } // end property

        /// <summary>získání výchozí kategorie výjimky</summary>
        /// <returns>kategorie výjimky</returns>
        [System.Security.SecuritySafeCritical]
        protected override ExceptionCategory OnGetCategory()
        {
            return ExceptionCategory.UserDataError;
        } // end method


        /// <summary>Validation Error</summary>
        /// <remarks>
        /// This problem occurs when the request is deemed unprocessable.
        /// Your client issued a request that failed validation.
        /// Please review your request to determine if you can remain within appropriate business rules. Consider validating your request against available metadata prior to sending to the server.
        /// </remarks>
        /// <example>
        /// <code language="json">
        /// {"errors":[{"message":"Value is required.","member":"field1"},{"message":"Value is not valid.","member":"field2"}]}
        /// </code>  
        /// </example>
        public override string ProblemType => "validation-error";

        /// <summary>Title for the problem type</summary>
        public override string ProblemTitle => "Validation Error";

        #endregion

        #region konstruktory

        /// <summary>konstruktor povinně odvozený ze základní třídy</summary>
        public GValidationException() : base() { }

        /// <summary>konstruktor povinně odvozený ze základní třídy</summary>
        /// <param name="message">text výjimky</param>
        public GValidationException(string message) : base(message) { }

        /// <summary>konstruktor povinně odvozený ze základní třídy</summary>
        /// <param name="serializationInfo">serializovaná data výjimky</param>
        /// <param name="streamingContext">kontext serializace</param>
        protected GValidationException(SerializationInfo serializationInfo,StreamingContext streamingContext) : base(serializationInfo,streamingContext) { }

        /// <summary>konstruktor povinně odvozený ze základní třídy</summary>
        /// <param name="message">text výjimky</param>
        /// <param name="innerException">původní výjimka</param>
        public GValidationException(string message,Exception innerException) : base(message,innerException) { }

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="results">seznam výsledků validace</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GValidationException(int code,IEnumerable<GValidationResult> results) : this(code,Assembly.GetCallingAssembly(),results) {
        } // end method

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="results">seznam výsledků validace</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GValidationException(int code,params GValidationResult[] results) : this(code,Assembly.GetCallingAssembly(),results) {
        } // end method

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="member">název validovaného prvku</param>
        /// <param name="message">text výsledku validace</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GValidationException(int code,string member,string message = null) : this(code,Assembly.GetCallingAssembly(),member,message) {
        } // end method

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="innerException">původní výjimka</param>
        /// <param name="results">seznam výsledků validace</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GValidationException(int code,Exception innerException,IEnumerable<GValidationResult> results) : this(code,Assembly.GetCallingAssembly(),innerException,results) {
        } // end method

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="innerException">původní výjimka</param>
        /// <param name="results">seznam výsledků validace</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GValidationException(int code,Exception innerException,params GValidationResult[] results) : this(code,Assembly.GetCallingAssembly(),innerException,results) {
        } // end method

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="innerException">původní výjimka</param>
        /// <param name="member">název validovaného prvku</param>
        /// <param name="message">text výsledku validace</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GValidationException(int code,Exception innerException,string member,string message = null) : this(code,Assembly.GetCallingAssembly(),innerException,member,message) {
        } // end method

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="results">seznam výsledků validace</param>
        public GValidationException(int code,Assembly assembly,IEnumerable<GValidationResult> results) : this(code,assembly,null,results) {
        } // end method

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="results">seznam výsledků validace</param>
        public GValidationException(int code,Assembly assembly,params GValidationResult[] results) : this(code,assembly,null,results) {
        } // end method

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="member">název validovaného prvku</param>
        /// <param name="message">text výsledku validace</param>
        public GValidationException(int code,Assembly assembly,string member,string message = null) : this(code,assembly,null,member,message) {
        } // end method

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="innerException">původní výjimka</param>
        /// <param name="results">seznam výsledků validace</param>
        public GValidationException(int code,Assembly assembly,Exception innerException,IEnumerable<GValidationResult> results) : base(code,assembly,PrepareMessage(results),innerException) {
            Results = results;
        } // end method

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="innerException">původní výjimka</param>
        /// <param name="results">seznam výsledků validace</param>
        public GValidationException(int code,Assembly assembly,Exception innerException,params GValidationResult[] results) : base(code,assembly,PrepareMessage(results),innerException) {
            Results = results;
        } // end method

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="innerException">původní výjimka</param>
        /// <param name="member">název validovaného prvku</param>
        /// <param name="message">text výsledku validace</param>
        public GValidationException(int code,Assembly assembly,Exception innerException,string member,string message = null) : this(code,assembly,innerException,new GValidationResult(member,message)) {
        } // end method

        /// <summary>chráněný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="message">text výjimky</param>
        /// <param name="innerException">původní výjimka</param>
        protected GValidationException(int code, Assembly assembly, string message, Exception innerException) : base(code, assembly, message, innerException) { }

        #endregion

        #region veřejné metody

        /// <summary>získání textu výjimky</summary>
        /// <param name="results">seznam výsledků validace</param>
        /// <returns>text výjimky</returns>
        public static string PrepareMessage(IEnumerable<GValidationResult> results) {
            try {
                StringBuilder l_oStringBuilder = null;
                if(results != null && results.Count() > 0) {
                    string l_sMember = String.Empty;
                    string l_sMessage = String.Empty;
                    foreach(GValidationResult l_oResult in results) {
                        if(l_oResult != null) {
                            l_sMember = l_oResult.Member == null ? String.Empty : l_oResult.Member.Trim();
                            l_sMessage = l_oResult.Message == null ? String.Empty : l_oResult.Message.Trim();
                            if(l_sMember != String.Empty || l_sMessage != String.Empty) {
                                if(l_oStringBuilder == null) {
                                    l_oStringBuilder = new StringBuilder();
                                    l_oStringBuilder.Append(GResources.GetResourceText(ThisAssembly,21090023)); //RC 21090023 : Zadané údaje neodpovídají požadavkům aplikace
                                } // end if
                                l_oStringBuilder.Append(Environment.NewLine);
                                if(l_sMember != String.Empty) l_oStringBuilder.Append(l_sMember);
                                if(l_sMessage != String.Empty) {
                                    if(l_sMember != String.Empty) l_oStringBuilder.Append(": ");
                                    l_oStringBuilder.Append(l_sMessage);
                                } // end if
                            } // end if
                        } // end if
                    } // end foreach
                } // end if
                return l_oStringBuilder == null ? GResources.GetResourceText(ThisAssembly,21090023) : l_oStringBuilder.ToString(); //RC 21090023 : Zadané údaje neodpovídají požadavkům aplikace
            } // end try
            catch(Exception e) {
                throw new GException(21000037, 21090024, ThisAssembly, e); //RC-EX 21090024 : selhal pokus o získání textu výjimky
            } // end catch
        } // end method

        #endregion

    } // end class

} // end namespace
