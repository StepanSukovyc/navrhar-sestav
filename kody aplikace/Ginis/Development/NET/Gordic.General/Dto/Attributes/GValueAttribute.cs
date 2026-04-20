//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GValueAttribute.cs                           </Name>
//    <Description> Pomocny predek pro kontrolu hodnoty (akt. pouz. u GMinValueAttribute, GMaxValueAttribute a GRangeAttribute).</Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-02-21                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{
    /// <summary>Pomocny predek pro kontrolu hodnoty (akt. pouz. u GMinValueAttribute, GMaxValueAttribute a GRangeAttribute).</summary>
    public abstract class GValueAttribute : GValidationAttribute
    {
        /// <summary>Ctor</summary>
        public GValueAttribute(int resourceCode):base(resourceCode)
        {}

        /// <summary>Typ validatoru (pro pouziti v JS)</summary>
        public override string Type { get { return "Range"; } } //NOTE: TSkala v JS nerozlisuje Range, MinVal, MaxVal - ma jen range

        /// <summary>Operand</summary>
        public Type OperandType { get; protected set; }

        /// <summary>Je datovy typ podporovan?</summary>
        protected virtual bool IsSupported(object value)
        {
            return (value is int
                    || value is short
                    || value is decimal
                    || value is GInt16
                    || value is GInt32
                    || value is GDecimal
                    || value is DateTime
                    || value is GDateTime
                    || value is GDate);
        }

        /// <summary>Prevede string na cilovy typ nebo na object na gordicky typ</summary>
        protected virtual object ConvertToGordicType(object value, Type destType)
        {
            if (!typeof(IGDbType).IsAssignableFrom(destType))
                throw new NotSupportedException();

            var newVal = Activator.CreateInstance(destType) as IGDbType;
            newVal.ParseValue(value);
            return newVal;
        }

        /// <summary>Naformatuje hodnotu do uzivatelsky citelne hlasky</summary>
        protected virtual string FormatValue(object value)
        {
            //GDate, GDateTime, GDecimal, GInt16, GInt32
            if (value is IGDbType)
                return value.ToString();

            //DateTime
            if (value is DateTime)
            {
                var dt = (DateTime)value;
                if (dt.TimeOfDay.TotalSeconds == 0)
                    return new GDate(dt).ToString();
                else
                    return new GDateTime(dt).ToString();
            }

            //int, decimal (podporovat i float, double, decimal, long???)
            return value.ToString();
        }

        /// <summary>
        /// Porovnava na null a IsSupported. Vrati-li true, neni nutne dal resit v potomkovi, vrati-li false, jen nutne porvnat hodnotu
        /// </summary>
        public override bool IsValid(object value)
        {
            if (value == null)
                return true;

            if (!IsSupported(value))
                return true;

            return false;
        }
    }
}
