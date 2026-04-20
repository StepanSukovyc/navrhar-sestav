//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GRequiredAttribute.cs                        </Name>
//    <Description> Validuje, zda hodnota neni null ci v pripade stringu nastavenim prop. AllowEmptyStrings na true na prazdny retezec.</Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2016-07-28                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{
    /// <summary>Validuje, zda hodnota neni null ci v pripade stringu nastavenim prop. AllowEmptyStrings na true na prazdny retezec.</summary>
    public class GRequiredAttribute : GValidationAttribute
    {
        /// <summary>Ma byt povolena prazdna stringova hodnota?</summary>
        public bool AllowEmptyStrings { get; set; }

        /// <summary>Ma byt povolena prazdna stringova hodnota?</summary>
        public bool AllowDbNull { get; set; }


        /// <summary>Type</summary>
        public override string Type { get { return "Required"; } }

        /// <summary>Ctor</summary>
        /// <param name="resourceCode">RC code</param>
        public GRequiredAttribute(int resourceCode = 0):base(resourceCode)
        {
            DefaultMessage = GResources.GetResourceText(typeof(GRequiredAttribute).Assembly, 21090046); //RC 21090046 : Povinná hodnota
        }

        /// <summary>IsValid</summary>
        public override bool IsValid(object value)
        {
            if (value == null)
                return false;

            if (!AllowEmptyStrings)
            {
                if (value is string stringValue)
                    return stringValue.Trim().Length != 0;
                if (value is GString stringValue2 && !stringValue2.IsNull)
                    return stringValue2.BaseValueTrimmed.Length != 0;
            }

            if (value is GDateTimeCurrent || value is GDateCurrent) //NOTE: Oba maji base value NULL
                return true;

            if (value is IGDbTypeDateTime datum && datum.IsCurrent ) 
                return true;

            if (!AllowDbNull && value is IGDbType dbval)
                return !dbval.IsNull;

            return true;
        }
    }
}
