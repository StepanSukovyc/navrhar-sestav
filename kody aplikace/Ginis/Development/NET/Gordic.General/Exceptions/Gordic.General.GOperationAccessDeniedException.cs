//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GOperationAccessDeniedException.cs           </Name>
//    <Description> výjimka, která je vyvolávána v případě nedostatečných oprávnění uživatele k operaci</Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2019-02-18                                                  </Created>
//  </FileHeader>

using System;
using System.Reflection;
using System.Runtime.Serialization;
using System.Runtime.CompilerServices;

namespace Gordic.General {

    /// <summary>výjimka, která je vyvolávána v případě nedostatečných oprávnění uživatele k operaci</summary>
    [Serializable]
    public class GOperationAccessDeniedException : GAccessDeniedException
    {
        #region konstruktory

        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        public GOperationAccessDeniedException() : base() { }

        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        /// <param name="message">text výjimky</param>
        public GOperationAccessDeniedException(string message) : base(message) { }

        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        /// <param name="serializationInfo">serializovaná data výjimky</param>
        /// <param name="streamingContext">kontext serializace</param>
        protected GOperationAccessDeniedException(SerializationInfo serializationInfo,StreamingContext streamingContext) : base(serializationInfo,streamingContext) { }

        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        /// <param name="message">text výjimky</param>
        /// <param name="innerException">původní výjimka</param>
        public GOperationAccessDeniedException(string message,Exception innerException) : base(message,innerException) { }

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GOperationAccessDeniedException(int code) : base(code) { }


        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GOperationAccessDeniedException(int code,int resourceCode,params object [] parameters) : base(code,resourceCode,Assembly.GetCallingAssembly(),null,parameters) { }

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="innerException">původní výjimka</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GOperationAccessDeniedException(int code,int resourceCode,Exception innerException,params object [] parameters) : base(code,resourceCode,Assembly.GetCallingAssembly(),innerException,parameters) { }

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GOperationAccessDeniedException(int code,int resourceCode,Assembly assembly,params object [] parameters) : base(code,resourceCode,assembly,null,parameters) { }

        /// <summary>veřejný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="innerException">původní výjimka</param>
        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GOperationAccessDeniedException(int code,int resourceCode,Assembly assembly,Exception innerException,params object [] parameters) : base(code,resourceCode,assembly,innerException,parameters) { }

        /// <summary>chráněný konstruktor</summary>
        /// <param name="code">kód výjimky</param>
        /// <param name="assembly">assembly, ve které výjimka vznikla</param>
        /// <param name="message">text výjimky</param>
        /// <param name="innerException">původní výjimka</param>
        protected GOperationAccessDeniedException(int code,Assembly assembly,string message,Exception innerException) : base(code,assembly,message,innerException) { }

        #endregion

        #region přetížené metody

        /// <summary>Operation Access Denied</summary>
        /// <remarks>
        /// Operation cannot be performed due to insufficient user permissions.
        /// </remarks>
        public override string ProblemType => "operation-access-denied";
        /// <summary>Title problému pro ProblemDto</summary>
        public override string ProblemTitle => GResources.GetResourceText(21090082); //RC 21090082 : Chyba přístupu operace

        /// <summary>získání výchozí kategorie výjimky</summary>
        /// <returns>kategorie výjimky</returns>
        protected override ExceptionCategory OnGetCategory() {
            return ExceptionCategory.UserActionAccessError;
        } // end method

        #endregion

        #region Doplňkové vlastnosti chyby

        /// <summary>
        /// Jméno datové položky, u které je reklamována chybná hodnota dat. Může být prázdná.
        /// Počítá se i s možností datovou položku upřesnit dodatečně - tedy i mimo konstruktor.
        /// </summary>
        public string Member
        {
            get => Data["member"] as string;
            set { Data["member"] = value; Data[value] = MemberData ?? true; }
            //get => Result?.Member;
            //set => Result = new GValidationResult(value, Result?.Message ?? this.ShortMessage);
        }
        /// <summary>Data uložená k Member</summary>
        public object MemberData
        {
            get => Data[Member];
            set => Data[Member] = value;
        }
        /// <summary>
        /// Jméno datové položky, u které je reklamována chybná hodnota dat. Může být prázdná.
        /// Počítá se i s možností datovou položku upřesnit dodatečně - tedy i mimo konstruktor.
        /// </summary>
        public string FieldName
        {
            get => Member;
            set => Member = value;
        }
        #endregion

    } // end class

} // end namespace
