//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GValidationResult.cs                         </Name>
//    <Description> Vysledek validace                                           </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2016-07-28                                                  </Created>
//  </FileHeader>

using Newtonsoft.Json;
using System;
using System.ComponentModel;
using System.Diagnostics;

namespace Gordic.General
{
    /// <summary>Vysledek validace</summary>
    [DebuggerDisplay("Member={Member}")]
    [Serializable]
    public class GValidationResult : IGObject, IGDto
    {
        /// <summary>Lepe porovnavat s timto nez s NULL (kvuli citelnosti kodu)</summary>
        [JsonIgnore]
        public static GValidationResult Success;

        /// <summary>Ctor</summary>
        public GValidationResult()
        {}

        /// <summary>Ctor</summary>
        public GValidationResult(string member, string message)
        {
            Member = member;
            Message = message;
        }

        /// <summary>Error message</summary>
        [JsonProperty("message")]
        public string Message { get; set; }

        /// <summary>Cesta k memberu (property/fieldu) v hierarchii DTO</summary>
        [JsonProperty("member")]
        public string Member { get; set; }

        /// <summary>Instance nevalidniho DTO</summary>
        [JsonIgnore]
        public object Dto { get; set; }

        /// <summary>Možnost přidání vlastních dat. POZOR: Při použití s APG může být typu JObject!</summary>
        [JsonProperty("data")]
        public object Data { get; set; }

        /// <summary>Uroven vaznosti (default = Error)</summary>
        [JsonProperty("severity", DefaultValueHandling = DefaultValueHandling.Ignore)]
        [DefaultValue(GSeverityLevelEnum.Error)]
        public GSeverityLevelEnum Severity { get; set; } = GSeverityLevelEnum.Error;
    }

    /// <summary>Vysledek validace pres property nebo field</summary>
    public class GPropertyValidationResult : GValidationResult
    {
        /// <summary>Typ validacniho atributu</summary>
        [JsonIgnore]
        public Type ValidationAttributeType { get; set; }

        /// <summary>Obsahuje defaultni hlasku (optimalizace - defaulty se neposilaji do JS)</summary>
        [JsonIgnore]
        public bool ContainsDefaultMessage { get; set; }
    }

    /// <summary>Vysledek validace pomoci business rules.</summary>
    public class GBusinessValidationResult : GValidationResult
    { }
}
