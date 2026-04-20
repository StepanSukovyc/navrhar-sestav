//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.GOperatorValue.cs       </Name>
//    <Description> Hodnota a operátor, podle kterých se provádí filtrace.      </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2006-01-03                                                  </Created>
//  </FileHeader>

using System;
using System.Data;
using Gordic.General;

namespace Gordic.General
{

    //---------------------------------------------------------------------
    /// <summary>
    /// Hodnota a operátor, podle kterých se provádí filtrace.
    /// </summary>
    /// <remarks>
    /// Tato tøída je použita z tøídy GFilter, slouží k pøenosu filtraèních kritérií z klienta na server.
    /// Obsahuje dvojici operátor, hodnota. Pro bližší informace se podívejte do <see cref="GFilter{TFilterId,TValue}">GFilter</see>.
    /// </remarks>
    [Serializable]
    public class GOperatorValue<TValue> : GOperatorValueBase, IGOperatorValue
        where TValue : IGDbType, ICloneable, IGObject
    {
        //---------------------------------------------------------------------
        /// <summary>
        /// Implicitní konstruktor pro potomky
        /// </summary>
        protected GOperatorValue() {}
        //---------------------------------------------------------------------
        /// <summary>
        /// Implicitní konstruktor pro pøedky
        /// </summary>
        internal GOperatorValue(IGOperatorValue ov)
        {
            m_goValue = (TValue)ov.Value;
            m_eOperator = ov.Operator;
        }
        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor z hodnoty a operátoru
        /// </summary>
        /// <param name="val">hodnota</param>
        /// <param name="operato">operátor</param>
        public GOperatorValue(OperatorEnum operato, TValue val)
        {
            if (val == null) throw new GArgumentNullException(21000046, "val");
            if (operato == OperatorEnum.Like && !(val is GString))
                throw new GException(21000025, 21090060); //RC-EX 21090060 : Operátor like lze použít pouze u filtrù s hodnotou typu GString.
            m_goValue = val;
            m_eOperator = operato;
        }

        //---------------------------------------------------------------------
        /// <summary>Text, který se bude porovnávat s hodnotami ve sloupeèku</summary>
        protected TValue m_goValue;
        /// <summary>Hodnota v sloupci podle které se filtruje.</summary>
        public TValue Value
        {
            get
            {
                return (TValue)m_goValue;
            }
            set
            {
                if (value == null) throw new GArgumentNullException(21000048, "value");
                m_goValue = value;
            }
        }
        //---------------------------------------------------------------------
        /// <summary>
        /// Hodnota v sloupci podle které se filtruje.
        /// </summary>
        IGDbType IGOperatorValue.Value
        {
            get { return this.Value; }
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Vytvoøí klon hodnoty
        /// </summary>
        /// <returns>klon hodnoty</returns>
        public object Clone()
        {
            GOperatorValue<TValue> l_oClone;
            if (m_goValue == null)
                l_oClone = new GOperatorValue<TValue>(m_eOperator, (TValue)m_goValue);
            else
                l_oClone = new GOperatorValue<TValue>(m_eOperator, (TValue)(m_goValue.Clone()));
            return l_oClone;
        }

        internal string ValueString()
        {
            if (Value.IsNull) return "NULL";
            return Value.ToString(System.Globalization.CultureInfo.InvariantCulture);
        }
        /// <exclude/>
        public override string ToString()
        {
            System.Text.StringBuilder sb = new System.Text.StringBuilder();
            sb.Append(GOperatorValueBase.OperatorEnum2Shortcut(m_eOperator));
            sb.Append(' ');

            if (m_goValue.IsNull)
            {
                switch (m_eOperator)
                {
                    case OperatorEnum.Equal:
                    case OperatorEnum.Contains:
                    case OperatorEnum.Like:
                        return "IS NULL";
                    case OperatorEnum.NotEqual:
                    case OperatorEnum.NotLike:
                        return "IS NOT NULL";
                    default:
                        sb.Append("NULL");
                        break;
                }
            }
            else
                sb.Append(m_goValue.ToString(System.Globalization.CultureInfo.InvariantCulture));

            return sb.ToString();
        }

        /// <exclude/>
        public static GOperatorValue<TValue> Parse(string val)
        {
            return Parse(val, null);
        }
        /// <exclude/>
        public static GOperatorValue<TValue> Parse(string val, IFormatProvider formatProvider)
        {
            if(val==null) return null;
            string[] spl = val.Split(new char[] { ' ' }, 2);
            if (spl.Length != 2)
                return new GOperatorValue<TValue>(OperatorEnum.Equal, (TValue)GDbType.Parse<TValue>(val));
            OperatorEnum op = GOperatorValueBase.OperatorShortcut2Enum(spl[0]);
            if (op == OperatorEnum.OnlyColumname)
                return new GOperatorValue<TValue>(OperatorEnum.Equal, (TValue)GDbType.Parse<TValue>(val));
            TValue v = GDbType.Parse<TValue>(spl[1], formatProvider ?? System.Globalization.CultureInfo.InvariantCulture);
            return new GOperatorValue<TValue>(op,v);
        }

        /// <exclude/>
        public static IGOperatorValue Parse(Type dbType, string val, IFormatProvider formatProvider = null)
        {
            if (val == null) return null;
            string[] spl = val.Split(new char[] { ' ' }, 2);
            if (spl.Length != 2)
                return new GOperatorValue<IGDbType>(OperatorEnum.Equal, GDbType.Parse(dbType, val, formatProvider ?? System.Globalization.CultureInfo.InvariantCulture));
            OperatorEnum op = GOperatorValueBase.OperatorShortcut2Enum(spl[0]);
            if (op == OperatorEnum.OnlyColumname)
                return new GOperatorValue<IGDbType>(OperatorEnum.Equal, GDbType.Parse(dbType, val, formatProvider ?? System.Globalization.CultureInfo.InvariantCulture));
            GDbType v = GDbType.Parse(dbType, spl[1], formatProvider ?? System.Globalization.CultureInfo.InvariantCulture);
            return new GOperatorValue<IGDbType>(op, v);
        }
        /// <exclude/>
        public static IGOperatorValue JsonParse(Type dbType, string val)
        {
            if (val == null) return null;
            string[] spl = val.Split(new char[] { ' ' }, 2);
            if (spl.Length != 2)
                return new GOperatorValue<IGDbType>(OperatorEnum.Equal, GDbType.Parse(dbType, GDbTypeJsonConverter.InternalGetGValueFromJson(dbType, val)));
            OperatorEnum op = GOperatorValueBase.OperatorShortcut2Enum(spl[0]);
            if (op == OperatorEnum.OnlyColumname)
                return new GOperatorValue<IGDbType>(OperatorEnum.Equal, GDbType.Parse(dbType, GDbTypeJsonConverter.InternalGetGValueFromJson(dbType, val)));
            GDbType v = GDbType.Parse(dbType, GDbTypeJsonConverter.InternalGetGValueFromJson(dbType, spl[1]));
            return new GOperatorValue<IGDbType>(op, v);
        }

    }
    /// <summary>
    /// Hodnota a operátor, podle kterých se provádí filtrace.
    /// </summary>
    /// <remarks>
    /// Toto je pomocná tøída pro IGDbType variantu generického GOperatorValue
    /// </remarks>
    [Serializable]
    public class GOperatorValue : GOperatorValue<IGDbType>
    {
        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor z hodnoty a operátoru
        /// </summary>
        /// <param name="val">hodnota</param>
        /// <param name="operato">operátor</param>
        public GOperatorValue(OperatorEnum operato, IGDbType val)
            : base(operato,val)
        {
        }
    }

}
