//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.GBaseFilter.cs          </Name>
//    <Description> Předek filtrů                                               </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2006-01-13                                                  </Created>
//  </FileHeader>

using System;
using System.Data;
using Gordic.General;
using System.Collections;
using System.Collections.Generic;

namespace Gordic.General
{
    //---------------------------------------------------------------------
    /// <summary>
    /// Předek filtrů
    /// </summary>
    [Serializable()]
    [System.ComponentModel.TypeConverter(typeof(GBaseFilterConverter))]
    public class GBaseFilter<TValue> : IGBaseFilter
        where TValue : IGDbType, ICloneable, IGObject
    {
        //---------------------------------------------------------------------
        /// <summary>
        /// Implicitní konstruktor, vytvoří neinicializovaný filtr
        /// </summary>
        public GBaseFilter()
        {
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Vytvoří nový filtr na rovnost jedné hodnoty
        /// </summary>
        public static implicit operator GBaseFilter<TValue>(TValue value)
        {
            //viz tez GFilterConverter.ConvertFrom
            return new GBaseFilter<TValue>(OperatorEnum.Equal, value);
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor - zakládá filtr pro sloupec
        /// </summary>
        /// <param name="values">kolekce hodnot a operátorů</param>
        public GBaseFilter(params GOperatorValue<TValue>[] values)
        {
            m_aoFilterValues.AddRange(values);
        }
        /// <summary>
        /// Plní filtr pro sloupec
        /// </summary>
        public void Set(params GOperatorValue<TValue>[] values)
        {
            ClearValues();
            m_aoFilterValues.AddRange(values);
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor - zakládá filtr pro sloupec
        /// </summary>
        /// <param name="inValues">kolekce hodnot které budou spojeny v in. Je-li předána pouze jedna hodnota, bude použit operátor equal.</param>
        public GBaseFilter(params TValue[] inValues)
        {
            foreach (TValue val in inValues)
            {
                m_aoFilterValues.Add(new GOperatorValue<TValue>(ColOperator(inValues), val));
            }
        }
        /// <summary>
        /// Plní filtr pro sloupec
        /// </summary>
        public void Set(params TValue[] inValues)
        {
            ClearValues();
            foreach (TValue val in inValues)
            {
                m_aoFilterValues.Add(new GOperatorValue<TValue>(ColOperator(inValues), val));
            }
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor - zakládá filtr pro sloupec
        /// </summary>
        /// <param name="caseSensitive">zda se má tetstovat case sensitive</param>
        /// <param name="values">kolekce hodnot a operátorů</param>
        public GBaseFilter(bool caseSensitive, params GOperatorValue<TValue>[] values)
        {
            m_aoFilterValues.AddRange(values);
            m_bCaseSensitive = caseSensitive;
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor - zakládá filtr pro sloupec
        /// </summary>
        /// <param name="val">hodnota</param>
        /// <param name="operato">operátor</param>
        public GBaseFilter(OperatorEnum operato, TValue val)
        {
            m_aoFilterValues.Add(new GOperatorValue<TValue>(operato, val));
        }
        /// <summary>
        /// Plní filtr pro sloupec
        /// </summary>
        public void Set(OperatorEnum operato, TValue val)
        {
            ClearValues();
            m_aoFilterValues.Add(new GOperatorValue<TValue>(operato, val));
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor - zakládá filtr pro sloupec
        /// </summary>
        /// <param name="val">hodnota</param>
        /// <param name="operato">operátor</param>
        /// <param name="caseSensitive">zda se má tetstovat case sensitive</param>
        public GBaseFilter(OperatorEnum operato, TValue val, bool caseSensitive)
        {
            m_aoFilterValues.Add(new GOperatorValue<TValue>(operato, val));
            m_bCaseSensitive = caseSensitive;
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Operátor podle počtu záznamů v kolekci - pro jeden záznam vrací Equal, pro více In
        /// </summary>
        /// <param name="inValues">in</param>
        /// <returns>podle počtu záznamů v kolekci - pro jeden záznam vrací Equal, pro více In</returns>
        protected OperatorEnum ColOperator(TValue[] inValues)
        {
            if (inValues.Length == 1) return OperatorEnum.Equal;
            else return OperatorEnum.In;
        }
        //---------------------------------------------------------------------
        /// <summary>
        /// Operátor podle počtu záznamů v kolekci - pro jeden záznam vrací Equal, pro více In
        /// </summary>
        /// <param name="inValues">in</param>
        /// <returns>podle počtu záznamů v kolekci - pro jeden záznam vrací Equal, pro více In</returns>
        protected OperatorEnum ColOperator(ICollection inValues)
        {
            if (inValues.Count == 1) return OperatorEnum.Equal;
            else return OperatorEnum.In;
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Vyrobí kopii instance filtru
        /// </summary>
        public virtual object Clone()
        {
            var l_oNewFilter = new GBaseFilter<TValue>();
            l_oNewFilter.SetOnClone(this);
            return l_oNewFilter;
        }
        protected void SetOnClone(GBaseFilter<TValue> from)
        {
            m_bCaseSensitive = from.m_bCaseSensitive;
            Enabled = from.Enabled;
            foreach (var val in from.m_aoFilterValues)
            {
                m_aoFilterValues.Add((GOperatorValue<TValue>)val.Clone());
            }
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Přidá hodnotu do filtru
        /// </summary>
        /// <param name="val">hodnota - dvojice text a podmínka testu</param>
        public void AddFilterValue(GOperatorValue<TValue> val)
        {
            m_aoFilterValues.Add(val);
        }

        /// <exclude/>
        void IGBaseFilter.AddFilterValue(IGOperatorValue val)
        {
            if (val is GOperatorValue<TValue>) 
                AddFilterValue((GOperatorValue<TValue>)val);
            else
                AddFilterValue(new GOperatorValue<TValue>(val));
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Odstraní všechny hodnoty z filtru sloupce
        /// </summary>
        public void ClearValues()
        {
            m_aoFilterValues.Clear();
        }

        //---------------------------------------------------------------------
        /// <summary>Zda je hledání CaseSensitive</summary>
        protected bool m_bCaseSensitive = true;
        /// <summary>
        /// Zda bude hrát při porovnání roli velikost písmen
        /// </summary>
        public bool CaseSensitive
        {
            get { return m_bCaseSensitive; }
            set { m_bCaseSensitive = value; }
        }

        //------------------------------------------------------------------
        ///<summary>Zda je filtr povolen, je-li zakázán, bude ho WhereBuilder ignorovat při vytváření klauzule Where</summary>
        public bool Enabled { get; set; } = true;
        /// <summary>Příznak výchozího filtru, např. aktivita=100</summary>
        public bool DefaultFilter { get; set; } = false;

        ///<summary>True, pokud je filtr zakázán nebo neobsahuje žádnou hodnotu</summary>
        public virtual bool IsEmpty
        {
            get { return !Enabled || m_aoFilterValues.Count == 0; }
        }
        ///<summary>True, pokud filtr není zakázán a obsahuje nějakou hodnotu</summary>
        public bool NotEmpty
        {
            get { return !IsEmpty; }
        }
        /// <summary>Zda má filtr alespoň jednu hodnotu</summary>
        public bool HasValue
        {
            get { return m_aoFilterValues.Count > 0; }
        }
        /// <summary>Zda má filtr více než jednu hodnotu</summary>
        public bool HasMultipleValue
        {
            get { return m_aoFilterValues.Count > 1; }
        }
        /// <summary>Počet hodnot filtru</summary>
        public int Count
        {
            get { return m_aoFilterValues.Count; }
        }
        ///<summary>složený filtr</summary>
        public virtual bool IsCompound() { return false; }

        //---------------------------------------------------------------------
        /// <summary>Pole hodnot, které filtrují danný sloupec (mezi nimi je OR)</summary>
        protected List<GOperatorValue<TValue>> m_aoFilterValues = new List<GOperatorValue<TValue>>();
        /// <summary>
        /// Pole dvojic operátor/hodnota podle kterých se bude danný sloupec filtrovat
        /// </summary>
        public GOperatorValue<TValue>[] OperatorValueList
        {
            get { return m_aoFilterValues.ToArray(); }
            set
            {
                m_aoFilterValues.Clear();
                m_aoFilterValues.AddRange(value);
            }
        }

        IGOperatorValue[] IGBaseFilter.OperatorValueList
        {
            get { return this.OperatorValueList; }
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Dvojice hodnota, operátor filtru - s touto property lze pracovat pouze v případě, že filtr má právě jednu hodnotu.
        /// </summary>
        public GOperatorValue<TValue> OperatorValue
        {
            get
            {
                CheckValueFilter(this);
                return m_aoFilterValues[0];
            }
            set
            {
                CheckValueFilter(this);
                m_aoFilterValues[0] = value;
            }
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Hodnota filtru - s touto property lze pracovat pouze v případě, že filtr má právě jednu hodnotu.
        /// </summary>
        public TValue Value
        {
            get
            {
                CheckValueFilter(this);
                return (TValue)m_aoFilterValues[0].Value;
            }
            set
            {
                CheckValueFilter(this);
                m_aoFilterValues[0].Value = value;
            }
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Hodnoty filtru - nebere ohled na uložené operátory
        /// </summary>
        public TValue[] Values
        {
            get
            {
                TValue[] vals = new TValue[m_aoFilterValues.Count];
                int i = 0;
                foreach (GOperatorValue<TValue> val in m_aoFilterValues)
                {
                    vals[i++] = val.Value;
                }
                return vals;
            }
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Operátor filtru - s touto property lze pracovat pouze v případě, že filtr má právě jednu hodnotu.
        /// </summary>
        public OperatorEnum Operator
        {
            get
            {
                CheckValueFilter(this);
                return m_aoFilterValues[0].Operator;
            }
            set
            {
                CheckValueFilter(this);
                m_aoFilterValues[0].Operator = value;
            }
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Indexer - vrací dvojici hodnota/operátor filtru na danném indexu
        /// </summary>
        public GOperatorValue<TValue> this[int idx]
        {
            get
            {
                if (idx < 0 || idx >= m_aoFilterValues.Count) throw new GException(21000026, 21090052); //RC-EX 21090052 : Chybný index při přístupu k hodnotám filtru.
                return m_aoFilterValues[idx];
            }
            set
            {
                if (idx < 0 || idx > m_aoFilterValues.Count) throw new GException(21000027, 21090052); //RC-EX 21090052 : Chybný index při přístupu k hodnotám filtru.
                if (idx == m_aoFilterValues.Count)
                    m_aoFilterValues.Add(value);
                else
                    m_aoFilterValues[idx] = value;
            }
        }

        //---------------------------------------------------------------------
        /// <summary>Převede na string</summary>
        public override string ToString()
        {
            int c = m_aoFilterValues.Count;
            if (c == 0) return "EMPTY";
            if (c == 1) return m_aoFilterValues[0].ToString();

            int i = 0;
            var sb = new System.Text.StringBuilder();
            while (i < c)
            {
                var fv = m_aoFilterValues[i];
                var op = fv.Operator;
                if (sb.Length > 0)
                {
                    if ((op & OperatorEnum.IntervalMask) > 0)
                        sb.Append(" AND ");
                    else
                        sb.Append(" OR ");
                }
                if (fv.Operator == OperatorEnum.In || fv.Operator == OperatorEnum.NotIn)
                {
                    sb.Append(GOperatorValueBase.OperatorEnum2Shortcut(fv.Operator));
                    sb.Append(" (");
                    while (i + 1 < c && m_aoFilterValues[i + 1].Operator == op)
                    {
                        sb.Append(fv.ValueString());
                        sb.Append(',');
                        fv = m_aoFilterValues[++i];
                    }
                    sb.Append(fv.ValueString());
                    sb.Append(')');
                }
                else
                    sb.Append(fv.ToString());
                i++;
            }
            return sb.ToString();
        }

        //---------------------------------------------------------------------
        /// <summary>Převede na string (PO STARU)</summary>
        public string Serialize()
        {
            string l_sOvList = "";
            foreach (GOperatorValue<TValue> ov in OperatorValueList)
            {
                if (l_sOvList != "") l_sOvList += " OR ";
                l_sOvList += ov.ToString();
            }
            return l_sOvList;
        }

        /// <summary>Převede ze stringu</summary>
        public static GBaseFilter<TValue> Parse(string text)
        {
            System.ComponentModel.TypeConverter tc = System.ComponentModel.TypeDescriptor.GetConverter(typeof(GBaseFilter<TValue>));
            return (GBaseFilter<TValue>)tc.ConvertFromString(new GBaseFilterConverterContext(typeof(GBaseFilter<TValue>)), text);
        }


        //---------------------------------------------------------------------
        /// <summary>
        /// Spojí dvě pole filtrů do jednoho
        /// </summary>
        /// <param name="filterArray">pole filtrů</param>
        /// <param name="addFilters">nové pole filtrů</param>
        /// <returns>spojená pole filtrů</returns>
        public static GBaseFilter<TValue>[] JoinFilters(GBaseFilter<TValue>[] filterArray, params GBaseFilter<TValue>[] addFilters)
        {
            if (filterArray.Length == 0) return addFilters;
            if (addFilters.Length == 0) return filterArray;

            GBaseFilter<TValue>[] l_oNewArray = new GBaseFilter<TValue>[filterArray.Length + addFilters.Length];
            int i = 0;
            foreach (GBaseFilter<TValue> oldFilter in filterArray) l_oNewArray[i++] = oldFilter;
            foreach (GBaseFilter<TValue> newFilter in addFilters) l_oNewArray[i++] = newFilter;
            return l_oNewArray;
        }

        /// <summary>
        /// Kontrola filtru na obsah právě jedné hodnoty. Pokud je jiný počet hodnot, vyhodí výjimku.
        /// </summary>
        public static void CheckValueFilter(GBaseFilter<TValue> filter)
        {
            if (filter.m_aoFilterValues.Count != 1) throw new GException(21000005, 21090059); //RC-EX 21090059 : Filtr vyžaduje právě jednu hodnotu.
        }

        //------------------------------------------------------------------
        /// <summary>
        /// Vrací filtr s IN předaných hodnot
        /// </summary>
        public static GBaseFilter<TValue> In(params TValue[] values)
        {
            GOperatorValue<TValue>[] ovs = new GOperatorValue<TValue>[values.Length];
            int i = 0;
            foreach (TValue value in values)
            {
                ovs[i++] = new GOperatorValue<TValue>(OperatorEnum.In, value);
            }
            return new GBaseFilter<TValue>(ovs);
        }
        /// <summary>
        /// Vrací filtr s NOT IN předaných hodnot
        /// </summary>
        public static GBaseFilter<TValue> NotIn(params TValue[] values)
        {
            GOperatorValue<TValue>[] ovs = new GOperatorValue<TValue>[values.Length];
            int i = 0;
            foreach (TValue value in values)
            {
                ovs[i++] = new GOperatorValue<TValue>(OperatorEnum.NotIn, value);
            }
            return new GBaseFilter<TValue>(ovs);
        }

        //------------------------------------------------------------------
        /// <summary>
        /// Vrací filtr s intervalem předaných hodnot
        /// </summary>
        public static GBaseFilter<TValue> Interval(TValue value1, TValue value2)
        {
            GOperatorValue<TValue>[] ovs = new GOperatorValue<TValue>[2];
            ovs[0] = new GOperatorValue<TValue>(OperatorEnum.GreaterOrEqual, value1);
            ovs[1] = new GOperatorValue<TValue>(OperatorEnum.IntervalLessOrEqual, value2);
            return new GBaseFilter<TValue>(ovs);
        }
        /// <summary>
        /// Vrací filtr s intervalem předaných hodnot
        /// </summary>
        public static GBaseFilter<TValue> Interval(TValue value1, bool open1, TValue value2, bool open2)
        {
            GOperatorValue<TValue>[] ovs = new GOperatorValue<TValue>[2];
            ovs[0] = new GOperatorValue<TValue>(open1 ? OperatorEnum.Greater : OperatorEnum.GreaterOrEqual, value1);
            ovs[1] = new GOperatorValue<TValue>(open2 ? OperatorEnum.IntervalLess : OperatorEnum.IntervalLessOrEqual, value2);
            return new GBaseFilter<TValue>(ovs);
        }

        //------------------------------------------------------------------
        /// <summary>
        /// Zjištění zda filtr zahrnuje i předanou hodnotu
        /// </summary>
        public bool ContainsValue(TValue value)
        {
            if (IsEmpty) return true; //prazdny filtr nefiltruje -> obsahuje cokoliv
            var ret = false;
            var last = OperatorEnum.Equal;
            foreach (GOperatorValue<TValue> val in m_aoFilterValues)
            {
                if (ret == true && (val.Operator & OperatorEnum.IntervalMask) == 0 && val.Operator != last) return false;
                switch (val.Operator & ~OperatorEnum.IntervalMask)
                {
                    case OperatorEnum.Equal:
                    case OperatorEnum.In:
                        if (val.Value.Equals(value)) return true;
                        break;
                    case OperatorEnum.NotEqual:
                    case OperatorEnum.NotIn:
                        if (val.Value.Equals(value)) return false;
                        ret = true; //pokud budou vsechny notin neuspesne, je vysledek kladny
                        break;
                    case OperatorEnum.Greater:
                        ret = (value as IComparable).CompareTo(val.Value) > 0;
                        if (ret == false) return ret;
                        break;
                    case OperatorEnum.GreaterOrEqual:
                        ret = (value as IComparable).CompareTo(val.Value) >= 0;
                        if (ret == false) return ret;
                        break;
                    case OperatorEnum.Less:
                        ret = (value as IComparable).CompareTo(val.Value) < 0;
                        if (ret == false) return ret;
                        break;
                    case OperatorEnum.LessOrEqual:
                        ret = (value as IComparable).CompareTo(val.Value) <= 0;
                        if (ret == false) return ret;
                        break;
                    case OperatorEnum.Like:
                    case OperatorEnum.NotLike:
                        var exp = val.Value.ToString();
                        if (exp.Contains("%") == false) exp = exp + "%";
                        like_check:
                        return GDataFilter.LikePredicateRegExp(exp).IsMatch(value.ToString()) ^ (val.Operator == OperatorEnum.NotLike);
                    case OperatorEnum.Contains:
                        exp = val.Value.ToString();
                        if (exp.Contains("%") == false) exp = "%" + exp + "%";
                        goto like_check;
                    case OperatorEnum.InText:
                        exp = val.Value.ToString();
                        int p = exp.IndexOf(value.ToString());
                        if (p < 0) return false;
                        int r = p + value.ToString().Length;
                        return (p == 0 || exp[p - 1] == ',') && (r == exp.Length || exp[r] == ',');
                    default:
                        throw new GNotImplementedException(21000040);
                }
                last = val.Operator;
            }
            return ret;
        }
        /// <summary>
        /// Zjištění zda filtr zahrnuje i některou z předaných hodnot
        /// </summary>
        public bool ContainsAnyValue(TValue[] values)
        {
            foreach (var value in values)
            {
                var ret = ContainsValue(value);
                if (ret == true) return true;
            }
            return false;
        }
        /// <summary>
        /// Zjištění zda filtr zahrnuje i hodnotu ve vstupním intervalu. Předpokládá se, že filtr je tvořen hodnotou, výčtem či intervalem, tj. není to LIKE atp.
        /// </summary>
        public bool ContainsAnyValueInterval(TValue from, TValue to)
        {
            if (IsEmpty) return true; //prazdny filtr nefiltruje -> obsahuje cokoliv
            var ret = false;
            var last = OperatorEnum.Equal;
            foreach (GOperatorValue<TValue> val in m_aoFilterValues)
            {
                if (ret == true && (val.Operator & OperatorEnum.IntervalMask) == 0 && val.Operator != last) return false;
                var v = val.Value as IComparable;
                if (v == null) throw new GArgumentException(21000043);
                switch (val.Operator & ~OperatorEnum.IntervalMask)
                {
                    case OperatorEnum.Equal:
                    case OperatorEnum.In:
                        if (_inInterval(v, from, to)) return true;
                        break;
                    case OperatorEnum.NotEqual:
                    case OperatorEnum.NotIn:
                        if (_inInterval(v, from, to)) return false;
                        ret = true; //pokud budou vsechny notin neuspesne, je vysledek kladny
                        break;
                    case OperatorEnum.Greater:
                        ret = v.CompareTo(from) <= 0 || v.CompareTo(to) <= 0;
                        if (ret == false) return ret;
                        break;
                    case OperatorEnum.GreaterOrEqual:
                        ret = v.CompareTo(from) < 0 || v.CompareTo(to) < 0;
                        if (ret == false) return ret;
                        break;
                    case OperatorEnum.Less:
                        ret = v.CompareTo(from) >= 0 || v.CompareTo(to) >= 0;
                        if (ret == false) return ret;
                        break;
                    case OperatorEnum.LessOrEqual:
                        ret = v.CompareTo(from) > 0 || v.CompareTo(to) > 0;
                        if (ret == false) return ret;
                        break;
                    default:
                        throw new GNotImplementedException(21000041);
                }
                last = val.Operator;
            }
            return ret;
        }
        private bool _inInterval(IComparable v, TValue from, TValue to)
        {
            return v.CompareTo(from) >= 0 && v.CompareTo(to) <= 0;
        }
    }

}
