//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GMaxValueAttribute.cs                        </Name>
//    <Description> Atribut pro validaci maximalni delky.                       </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-02-21                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{
    /// <summary>
    /// Atribut pro validaci maximalni delky pro typy: int, short, decimal, GInt16, GInt32, GDecimal, DateTime, GDateTime a GDate.
    /// Promenna ValidatorArgs bude obsahovat hodnotu max.
    /// Pokud na property/field davas i GMinValueAttribute, lze misto obou pouzit jeden - GRangeAttribute.
    /// !!!Pozor pri pouziti typu DateTime, GDate a GDateTime: defaultni hlaska bude obsahovat lokalni datetime serveru,
    /// tzn. bude-li se uzivatel nachazet v jinem casovem pasmu, bude tato hodnota spatne (tyka se to webovych klientu a pripadne klientu
    /// pripojujicich se k aplikacnimu serveru).
    /// </summary>
    public class GMaxValueAttribute : GValueAttribute
    {
        /// <summary>Maximalni hodnota</summary>
        public object Maximum { get; private set; }

        #region Ctors

        /// <summary>Default ctor</summary>
        private GMaxValueAttribute(object maximum, int resourceCode = 0, int foo = 0):base(resourceCode)
        {
            Maximum = maximum;
        }

        /// <summary>Ctor</summary>
        /// <param name="maximum">Maximalni hodnota</param>
        /// <param name="resourceCode">Resource code</param>
        public GMaxValueAttribute(int maximum, int resourceCode = 0):this(maximum, resourceCode, 0)
        {}

        /// <summary>Ctor</summary>
        /// <param name="maximum">Maximalni hodnota</param>
        /// <param name="resourceCode">Resource code</param>
        public GMaxValueAttribute(DateTime maximum, int resourceCode = 0) : this(maximum, resourceCode, 0)
        { }

        /// <summary>Ctor</summary>
        /// <param name="maximum">Maximalni hodnota</param>
        /// <param name="resourceCode">Resource code</param>
        public GMaxValueAttribute(GDate maximum, int resourceCode = 0) : this(maximum, resourceCode, 0)
        { }

        /// <summary>Ctor</summary>
        /// <param name="maximum">Maximalni hodnota</param>
        /// <param name="resourceCode">Resource code</param>
        public GMaxValueAttribute(GDateTime maximum, int resourceCode = 0) : this(maximum, resourceCode, 0)
        { }

        /// <summary>Ctor</summary>
        /// <param name="maximum">Maximalni hodnota</param>
        /// <param name="resourceCode">Resource code</param>
        public GMaxValueAttribute(GDecimal maximum, int resourceCode = 0) : this(maximum, resourceCode, 0)
        { }

        /// <summary>Ctor</summary>
        /// <param name="maximum">Maximalni hodnota</param>
        /// <param name="resourceCode">Resource code</param>
        public GMaxValueAttribute(GInt16 maximum, int resourceCode = 0) : this(maximum, resourceCode, 0)
        { }

        /// <summary>Ctor</summary>
        /// <param name="maximum">Maximalni hodnota</param>
        /// <param name="resourceCode">Resource code</param>
        public GMaxValueAttribute(GInt32 maximum, int resourceCode = 0) : this(maximum, resourceCode, 0)
        { }

        /// <summary>Ctor</summary>
        /// <param name="type">Cilovy typ, na ktery se prevede hodnota minima a maxima</param>
        /// <param name="maximum">Maximalni hodnota</param>
        /// <param name="resourceCode">Resource code</param>
        public GMaxValueAttribute(Type type, string maximum, int resourceCode = 0) : this(maximum, resourceCode, 0)
        {
            OperandType = type;
            Maximum = Convert.ChangeType(maximum, type);
        }

        #endregion

        /// <summary>Init</summary>
        /// <param name="type">Typ property/fieldu, na kterem se atribut nachazi</param>
        public override void Init(Type type)
        {
            base.Init(type);

            if (!typeof(IComparable).IsAssignableFrom(type))
                throw new GArgumentException(31100008, 21090038, typeof(GRangeAttribute).Assembly); //RC-EX 21090038 : Argument 'type' musí implementovat rozhraní IComparable.

            //Prevod na pripadny gordicky typ
            if (typeof(IGDbType).IsAssignableFrom(type))
                Maximum = ConvertToGordicType(Maximum, type);

            OperandType = type;
            m_oValidatorArgs["max"] = Maximum;
            DefaultMessage = GResources.GetResourceText(typeof(GMaxValueAttribute).Assembly, 21090039, FormatValue(Maximum)); //RC 21090039 : Maximální povolená hodnota je {0}.
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

            return ((IComparable)Maximum).CompareTo(convertedValue) >= 0;
        }
    }
}
