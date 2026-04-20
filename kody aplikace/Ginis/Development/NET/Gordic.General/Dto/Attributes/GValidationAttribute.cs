//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GValidationAttribute.cs                      </Name>
//    <Description> Obecny atribut pro validaci (vychazi ze System.ComponentModel.DataAnnotations.ValidationAttribute</Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2016-07-28                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace Gordic.General
{
    /// <summary>Obecny atribut pro validaci (vychazi ze System.ComponentModel.DataAnnotations.ValidationAttribute</summary>
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field)]
    [DebuggerDisplay("Type={Type}, Group={Group}")]
    public abstract class GValidationAttribute : Attribute, IGObject
    {
        /// <summary>Oddelovace skupin</summary>
        public static readonly char[] GroupSeparators = new char[] { '.', ',', ' ' };

        private string m_oErrorMessage;

        /// <summary>Message</summary>
        public string Message
        {
            get { return m_oErrorMessage; }
            set { m_oErrorMessage = value; }
        }

        private string m_oDefaultErrorMessage;
        
        /// <summary>Defaultni hlaska</summary>
        public string DefaultMessage
        {   get
            {
                if (string.IsNullOrEmpty(m_oDefaultErrorMessage))
                    throw new GNullReferenceException(31100003); //V potomkovi (nejlepe v metode Init) je nutne nastavit property DefaultMessage!
                return m_oDefaultErrorMessage; }
            protected set { m_oDefaultErrorMessage = value; }
        }

        /// <summary>Resource code</summary>
        public int ResourceCode { get; set; }

        /// <summary>Nazev validacni skupiny. Pokud je jich vice, lze pouzit tecku, carku jako oddelovac (viz GValidationAttribute.GroupSeparators)</summary>
        public string Group { get; set; }

        /// <summary>Ma byt validator zobrazovan i v pripade, ze je ovl. prvek zakazany?</summary>
        public bool ShowOnDisabled { get; set; }

        /// <summary>Validacni skupiny, ve kterych se atribut nachazi. Pokud v zadne neni, vrati null.</summary>
        public string[] Groups
        {
            get
            {
                if (string.IsNullOrEmpty(Group))
                    return null;
                return Group.Split(GroupSeparators);
            }
        }

        /// <summary>Level chyby (typ Error je default)</summary>
        public ErrorLevel ErrorType { get; set; }

        /// <summary>Ma se posilat defaultni chybova hlaska do JavaScriptu? (Default=false)</summary>
        public bool SerializeDefaultMessageToJS { get; protected set; }

        /// <summary>Ctor</summary>
        public GValidationAttribute()
        {}

        /// <summary>RC ctor</summary>
        /// <param name="resourceCode">Resource code hlasky (mel by odpovidat Assembly, ve ktere je definovano DTO)</param>
        public GValidationAttribute(int resourceCode)
        {
            ResourceCode = resourceCode;
        }

        /// <summary>Zvaliduje hodnotu DTO</summary>
        public virtual GPropertyValidationResult Validate(object value, GValidationContext context)
        {
            //Nema smysl validovat, pokud tento atribut neni ve zvolene validacni skupine
            if(context.Groups.Length != 0 && Groups != null && !Groups.Any(g => context.Groups.Any(gg => string.Compare(g, gg) == 0)))
                return GValidationResult.Success as GPropertyValidationResult;

            if (this.IsValid(value))
                return GValidationResult.Success as GPropertyValidationResult;

            return GetValidationResult(context);
        }

        /// <summary>Zvaliduje vuci DTO</summary>
        public virtual GPropertyValidationResult GetValidationResult(GValidationContext context)
        {
            var result = new GPropertyValidationResult
            {
                 Dto = context.ObjectInstance,
                 //Member = context.MemberName  //NOTE: Nastavuje se az ve validatoru, ktery ma celkovy prehled o zanoreni
                 Message = GetMessage(context.ObjectInstance.GetType(), context.MemberName),
                 ContainsDefaultMessage = ContainsDefaultMessage
            };

            //result.Message = GetMessage(context.ObjectInstance.GetType(), context.MemberName);
            //result.ContainsDefaultMessage = ContainsDefaultMessage;
            return result;
        }

        /// <summary>
        /// Inicializace pred validaci a pred zjistovanim vlastnosti val. attr.
        /// (misto pro vytvoreni skladanych hlasek, apod.)
        /// </summary>
        /// <param name="type">Typ hodnoty</param>
        public virtual void Init(Type type) { }

        /// <summary>Indikuje, ze property Message obsahuje defaultni message</summary>
        public virtual bool ContainsDefaultMessage { get { return string.IsNullOrEmpty(Message) && ResourceCode == 0; } }

        /// <summary>Je hodnota validni?</summary>
        /// <param name="value">Hodnota k validaci</param>
        /// <returns>True v pripade uspechu</returns>
        public abstract bool IsValid(object value);

        /// <summary>Typ validatoru (pro pouziti v JS)</summary>
        public abstract string Type { get; }

        /// <summary>Argumenty validatoru (plnit idealne v konstruktoru, pro pouziti v JS)</summary>
        protected Dictionary<string, object> m_oValidatorArgs = new Dictionary<string, object>();

        /// <summary>Argumenty validatoru (napr. pro GRegExp je to pattern, apod.)</summary>
        public IDictionary<string, object> ValidatorArgs
        {
            get { return m_oValidatorArgs; }
        }

        /// <summary>Vrati chybovou hlasku</summary>
        /// <param name="dtoType">Typ DTO</param>
        /// <param name="memberName">Nazev membera</param>
        /// <returns>Hlasku, pokud neni, tak string.Empty.</returns>
        public string GetMessage(Type dtoType, string memberName = "undefined")
        {
            if (ResourceCode != 0)
                return GResources.GetResourceText(dtoType.Assembly, ResourceCode);

            var msg = ContainsDefaultMessage ? DefaultMessage : Message;
            if (!string.IsNullOrEmpty(msg))
                return msg.Replace("{0}", memberName);

            return string.Empty;
        }
    }

    public enum ErrorLevel
    {
        Error = 0,
        Warning,
        Info
    }
}
