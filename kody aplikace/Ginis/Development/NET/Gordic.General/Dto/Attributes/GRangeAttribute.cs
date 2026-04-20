//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GRangeAttribute.cs                           </Name>
//    <Description> Atribut validujici delkove rozsahy (zatim jen pro int)      </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2016-08-11                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{
    /// <summary>
    /// Atribut validujici delkove rozsahy: int, short, decimal, GInt16, GInt32, GDecimal, DateTime, GDateTime a GDate.
    /// Promenna ValidatorArgs bude obsahovat hodnoty min a max.
    /// !!!Pozor pri pouziti typu DateTime, GDate a GDateTime: defaultni hlaska bude obsahovat lokalni datetime serveru,
    /// tzn. bude-li se uzivatel nachazet v jinem casovem pasmu, bude tato hodnota spatne (tyka se to webovych klientu a pripadne klientu
    /// pripojujicich se k aplikacnimu serveru).
    /// </summary>
    public class GRangeAttribute : GValueAttribute //GValidationAttribute
    {
        /// <summary>Minimalni hodnota</summary>
        public object Minimum { get; private set; }

        /// <summary>Maximalni hodnota</summary>
        public object Maximum { get; private set; }

        #region Ctors

        /// <summary>Defaultni obecny</summary>
        private GRangeAttribute(object minimum, object maximum, int resourceCode, int foo = 0):base(resourceCode)
        {
            Minimum = minimum;
            Maximum = maximum;
        }

        /// <summary>Ctor</summary>
        /// <param name="minimum">Minimalni hodnota (vcetne)</param>
        /// <param name="maximum">Maximalni hodnota (vcetne)</param>
        /// <param name="resourceCode">Resource code</param>
        public GRangeAttribute(int minimum, int maximum, int resourceCode = 0):this(minimum, maximum, resourceCode, 0)
        { }

        /// <summary>Ctor</summary>
        /// <param name="minimum">Minimalni hodnota (vcetne)</param>
        /// <param name="maximum">Maximalni hodnota (vcetne)</param>
        /// <param name="resourceCode">Resource code</param>
        public GRangeAttribute(DateTime minimum, DateTime maximum, int resourceCode = 0) : this(minimum, maximum, resourceCode, 0)
        {}

        /// <summary>Ctor</summary>
        /// <param name="minimum">Minimalni hodnota (vcetne)</param>
        /// <param name="maximum">Maximalni hodnota (vcetne)</param>
        /// <param name="resourceCode">Resource code</param>
        public GRangeAttribute(GDate minimum, GDate maximum, int resourceCode = 0) : this(minimum, maximum, resourceCode, 0)
        { }

        /// <summary>Ctor</summary>
        /// <param name="minimum">Minimalni hodnota (vcetne)</param>
        /// <param name="maximum">Maximalni hodnota (vcetne)</param>
        /// <param name="resourceCode">Resource code</param>
        public GRangeAttribute(GDateTime minimum, GDateTime maximum, int resourceCode = 0) : this(minimum, maximum, resourceCode, 0)
        { }

        /// <summary>Ctor</summary>
        /// <param name="minimum">Minimalni hodnota (vcetne)</param>
        /// <param name="maximum">Maximalni hodnota (vcetne)</param>
        /// <param name="resourceCode">Resource code</param>
        public GRangeAttribute(GDecimal minimum, GDecimal maximum, int resourceCode = 0) : this(minimum, maximum, resourceCode, 0)
        { }

        /// <summary>Ctor</summary>
        /// <param name="minimum">Minimalni hodnota (vcetne)</param>
        /// <param name="maximum">Maximalni hodnota (vcetne)</param>
        /// <param name="resourceCode">Resource code</param>
        public GRangeAttribute(GInt16 minimum, GInt16 maximum, int resourceCode = 0) : this(minimum, maximum, resourceCode, 0)
        { }

        /// <summary>Ctor</summary>
        /// <param name="minimum">Minimalni hodnota (vcetne)</param>
        /// <param name="maximum">Maximalni hodnota (vcetne)</param>
        /// <param name="resourceCode">Resource code</param>
        public GRangeAttribute(GInt32 minimum, GInt32 maximum, int resourceCode = 0) : this(minimum, maximum, resourceCode, 0)
        { }

        /// <summary>Ctor</summary>
        /// <param name="type">Cilovy typ, na ktery se prevede hodnota minima a maxima</param>
        /// <param name="minimum">Minimalni hodnota jako string</param>
        /// <param name="maximum">Maximalni hodnota jako string</param>
        /// <param name="resourceCode"></param>
        public GRangeAttribute(Type type, string minimum, string maximum, int resourceCode = 0) : base(resourceCode)
        {
            OperandType = type;
            if (!string.IsNullOrWhiteSpace(minimum))
                Minimum = Convert.ChangeType(minimum, type);
            if (!string.IsNullOrWhiteSpace(maximum))
                Maximum = Convert.ChangeType(maximum, type);
        }

        #endregion

        /// <summary>Init</summary>
        public override void Init(Type type)
        {
            base.Init(type);

            if (!typeof(IComparable).IsAssignableFrom(type))
                throw new GArgumentException(31100001, 21090038, typeof(GRangeAttribute).Assembly); //RC-EX 21090038 : Argument 'type' musí implementovat rozhraní IComparable.

            //Prevod na pripadny gordicky typ
            if (typeof(IGDbType).IsAssignableFrom(type))
            {
                Minimum = ConvertToGordicType(Minimum, type);
                Maximum = ConvertToGordicType(Maximum, type);
            }

            m_oValidatorArgs["min"] = Minimum;
            m_oValidatorArgs["max"] = Maximum;

            OperandType = type;
            DefaultMessage = CreateMessage(type, Minimum, Maximum);
        }

        /// <summary>Vytvoreni defaultni hlasky</summary>
        /// <param name="type">Datovy typ property/fieldu, na kterem je atribut umisten</param>
        /// <param name="minimum">minimum</param>
        /// <param name="maximum">maximum</param>
        protected virtual string CreateMessage(Type type, object minimum, object maximum)
        {
            //NOTE: Sem by se to nemelo nikdy dostat, pokud se dodrzi struktura ctoru s minimem a maximem
            if (minimum == null && maximum == null)
                throw new GArgumentException(31100002, 21090048, typeof(GRangeAttribute).Assembly); //RC-EX 21090048 : Musí být zadán argument 'minimum' nebo 'maximum'.

            if (minimum != null && maximum == null)
                return GResources.GetResourceText(typeof(GRangeAttribute).Assembly, 21090053, FormatValue(minimum)); //RC 21090053 : Hodnota musí být minimálně {0}.
            if (maximum != null && minimum == null)
                return GResources.GetResourceText(typeof(GRangeAttribute).Assembly, 21090054, FormatValue(maximum)); //RC 21090054 : Hodnota musí být maximálně {0}.
            //if (minimum.Value > maximum.Value)
            //    throw new InvalidOperationException(?);

            if (minimum == maximum)
                return GResources.GetResourceText(typeof(GRangeAttribute).Assembly, 21090043, FormatValue(minimum)); //RC 21090043 : Hodnota musí být přesně {0}.

            return GResources.GetResourceText(typeof(GRangeAttribute).Assembly, 21090044, FormatValue(minimum), FormatValue(maximum)); //RC 21090044 : Hodnota musí být v rozmezí {0} - {1}.
        }

        /// <summary>IsValid</summary>
        public override bool IsValid(object value)
        {
            if (value == null)
                return true;

            if (value is IGDbType dbval && dbval.IsNull) //DB NULL
                return true;

            if (!IsSupported(value))
                return true;

            object convertedValue = value;

            object custNull = null;

            //Konverze na gordickej typ
            if(value.GetType() != OperandType && typeof(IGDbType).IsAssignableFrom(OperandType))
            {
                convertedValue = ConvertToGordicType(value, OperandType);
                custNull = GDbType.GetNull(OperandType);
            }

            var isMin = Minimum != null && custNull == null ? Minimum != custNull : !GDbType.Equals(Minimum, custNull);
            var isMax = Maximum != null && custNull == null ? Maximum != custNull : !GDbType.Equals(Maximum, custNull);

            var min = (IComparable)Minimum;
            var max = (IComparable)Maximum;

            if (isMin && isMax)
                return min.CompareTo(convertedValue) <= 0 && max.CompareTo(convertedValue) >= 0;
            else if (isMin)
                return min.CompareTo(convertedValue) <= 0;
            else if (isMax)
                return max.CompareTo(convertedValue) >= 0;
            else throw new NotSupportedException(); //NOTE: Sem by se to nikdy nemelo dostat
        }
    }
}
