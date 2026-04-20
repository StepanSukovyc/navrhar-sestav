//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GMinValueAttribute.cs                        </Name>
//    <Description> Atribut pro validaci maximalni delky                        </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-02-21                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{
    /// <summary>
    /// Atribut pro validaci maximalni delky pro typy: int, short, decimal, GInt16, GInt32, GDecimal, DateTime, GDateTime a GDate.
    /// Promenna ValidatorArgs bude obsahovat hodnotu min.
    /// Pokud na property/field davas i GMaxValueAttribute, lze misto obou pouzit jeden - GRangeAttribute.
    /// !!!Pozor pri pouziti typu DateTime, GDate a GDateTime: defaultni hlaska bude obsahovat lokalni datetime serveru,
    /// tzn. bude-li se uzivatel nachazet v jinem casovem pasmu, bude tato hodnota spatne (tyka se to webovych klientu a pripadne klientu
    /// pripojujicich se k aplikacnimu serveru).
    /// </summary>
    public class GMinValueAttribute : GValueAttribute
    {
        /// <summary>Minimalni hodnota</summary>
        public object Minimum { get; private set; }

        #region Ctors

        private GMinValueAttribute(object minimum, int resourceCode = 0, int foo = 0):base(resourceCode)
        {
            Minimum = minimum;
        }

        /// <summary>Ctor</summary>
        /// <param name="minimum">Minimalni hodnota</param>
        /// <param name="resourceCode">Resource code</param>
        public GMinValueAttribute(int minimum, int resourceCode = 0):this(minimum, resourceCode, 0)
        {}

        /// <summary>Ctor</summary>
        /// <param name="minimum">Minimalni hodnota</param>
        /// <param name="resourceCode">Resource code</param>
        public GMinValueAttribute(DateTime minimum, int resourceCode = 0) : this(minimum, resourceCode, 0)
        { }

        /// <summary>Ctor</summary>
        /// <param name="minimum">Minimalni hodnota</param>
        /// <param name="resourceCode">Resource code</param>
        public GMinValueAttribute(GDate minimum, int resourceCode = 0) : this(minimum, resourceCode, 0)
        { }

        /// <summary>Ctor</summary>
        /// <param name="minimum">Minimalni hodnota</param>
        /// <param name="resourceCode">Resource code</param>
        public GMinValueAttribute(GDateTime minimum, int resourceCode = 0) : this(minimum, resourceCode, 0)
        { }

        /// <summary>Ctor</summary>
        /// <param name="minimum">Minimalni hodnota</param>
        /// <param name="resourceCode">Resource code</param>
        public GMinValueAttribute(GDecimal minimum, int resourceCode = 0) : this(minimum, resourceCode, 0)
        { }

        /// <summary>Ctor</summary>
        /// <param name="minimum">Minimalni hodnota</param>
        /// <param name="resourceCode">Resource code</param>
        public GMinValueAttribute(GInt16 minimum, int resourceCode = 0) : this(minimum, resourceCode, 0)
        { }

        /// <summary>Ctor</summary>
        /// <param name="minimum">Minimalni hodnota</param>
        /// <param name="resourceCode">Resource code</param>
        public GMinValueAttribute(GInt32 minimum, int resourceCode = 0) : this(minimum, resourceCode, 0)
        { }

        /// <summary>Ctor</summary>
        /// <param name="type">Cilovy typ, na ktery se prevede hodnota minima a maxima</param>
        /// <param name="minimum">Minimalni hodnota</param>
        /// <param name="resourceCode">Resource code</param>
        public GMinValueAttribute(Type type, string minimum, int resourceCode = 0) : this(minimum, resourceCode, 0)
        {
            OperandType = type;
            Minimum = Convert.ChangeType(minimum, type);
        }

        #endregion

        /// <summary>Init</summary>
        /// <param name="type">Typ property/fieldu, na kterem se atribut nachazi</param>
        public override void Init(Type type)
        {
            base.Init(type);

            if (!typeof(IComparable).IsAssignableFrom(type))
                throw new GArgumentException(31100007, 21090038, typeof(GRangeAttribute).Assembly); //RC-EX 21090038 : Argument 'type' musí implementovat rozhraní IComparable.

            //Prevod na pripadny gordicky typ
            if (typeof(IGDbType).IsAssignableFrom(type))
                Minimum = ConvertToGordicType(Minimum, type);

            OperandType = type;
            m_oValidatorArgs["min"] = Minimum;
            DefaultMessage = GResources.GetResourceText(typeof(GMinValueAttribute).Assembly, 21090041, FormatValue(Minimum)); //RC 21090041 : Minimální povolená hodnota je {0}.
        }

        /// <summary>IsValid</summary>
        public override bool IsValid(object value)
        {
            if (base.IsValid(value))
                return true;

            var convertedValue = value;

            //Konverze na gordickej typ
            if (value.GetType() != OperandType && typeof(IGDbType).IsAssignableFrom(OperandType))
                convertedValue = ConvertToGordicType(value, OperandType);

            return ((IComparable)Minimum).CompareTo(convertedValue) <= 0;
        }
    }
}
