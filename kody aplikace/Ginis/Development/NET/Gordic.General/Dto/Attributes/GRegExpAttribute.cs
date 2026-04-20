//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GRegExpAttribute.cs                          </Name>
//    <Description> Atribut pro kontrolu hodnoty proti regularnimu vyrazu       </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2016-08-12                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Gordic.General
{
    /// <summary>Atribut pro kontrolu hodnoty proti regularnimu vyrazu</summary>
    public class GRegExpAttribute : GValidationAttribute
    {
        /// <summary>Regularni vyraz</summary>
        public string Pattern { get; private set; }

        /// <summary>Ctor</summary>
        /// <param name="pattern">Regularni vyraz</param>
        /// <param name="resourceCode">Resource code</param>
        public GRegExpAttribute(string pattern, int resourceCode = 0):base(resourceCode)
        {
            Pattern = pattern;
            DefaultMessage = GResources.GetResourceText(typeof(GRegExpAttribute).Assembly, 21090045); //RC 21090045 : Chybná hodnota.
        }

        /// <summary>Inicializace argumentu (ponechat pro pripadne pridani dalsich ctoru)</summary>
        public override void Init(Type type)
        {
            base.Init(type);
            m_oValidatorArgs["pattern"] = Pattern; //NOTE: Davat camel case a s nazvy odpovidajici nazvum property validatoru v JS?
        }

        /// <summary>Type</summary>
        public override string Type { get { return "RegExp"; } }

        /// <summary>IsValid</summary>
        public override bool IsValid(object value)
        {
            if (string.IsNullOrEmpty(Pattern))
                throw new InvalidOperationException();//Gordicky ekvivalent neexistuje???

            if (!(value is string || value is GString))
                return true;

            var stringValue = Convert.ToString(value, CultureInfo.CurrentCulture);

            //Melo by to projit v pripade prazdneho stringu, protoze vyplneni hodnoty by melo byt kontrolovano atributem GRequired
            if (string.IsNullOrWhiteSpace(stringValue))
                return true;

            var regex = new Regex(Pattern);
            var match = regex.Match(stringValue);

            //Timto zpusobem to delaji v DataAnnotations - hleda se presny match.
            return match.Success && match.Index == 0 && match.Length == stringValue.Length; 
        }
    }
}
