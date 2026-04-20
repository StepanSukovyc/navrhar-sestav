//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDataFilter.cs                               </Name>
//    <Description> Filtrace pro GDataView                                      </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2009-06-03                                                  </Created>
//  </FileHeader>

using System;
using System.Data;
using System.Collections.Generic;

namespace Gordic.General
{

    /// <summary>Filtrace pro GDataView</summary>
#if !DEBUG
	[System.Diagnostics.DebuggerStepThrough]
#endif
    public class GDataFilter : IGObject
    {
        FilterTree m_main;

        /// <summary>Konstruktor</summary>
        internal GDataFilter()
        {
            //m_main = null;
        }
        /// <summary>Konstruktor</summary>
        internal GDataFilter(FilterTree tree)
        {
            m_main = tree;
        }
        /// <summary>Konstruktor</summary>
        public GDataFilter(string expression)
        {
            var parser = new Gordic.General.DataFilterParser.FilterParser(expression);
            parser.Parse();
            m_main = parser.Result;
        }

        //------------------------------------------------------------------
        /// <summary>Pøevod ze stringu</summary>
        public static GDataFilter Parse(string expression)
        {
            return new GDataFilter(expression);
        }
        /// <summary>Pøevod ze stringu</summary>
        public static implicit operator GDataFilter(string expression)
        {
            return new GDataFilter(expression);
        }
        /// <summary>Pøevod do stringu</summary>
        public override string ToString()
        {
            if (m_main == null) return "";
            return m_main.ToString();
        }
        /// <summary>Pøevod do stringu</summary>
        public static implicit operator string(GDataFilter filter)
        {
            return filter.ToString();
        }

        //------------------------------------------------------------------
        /// <summary>Pøíznak prázdného filtru</summary>
        public bool IsEmpty
        {
            get { return m_main == null; }
        }

        /// <summary>Prázdný filtr</summary>
        public static GDataFilter Empty
        {
            get { return new GDataFilter(); }
        }

        //------------------------------------------------------------------
        /// <summary>Pøipojení dalšího filtru podmínkou AND</summary>
        public void And(GDataFilter andFilter)
        {
            if (andFilter.IsEmpty) return;
            if (m_main == null) { m_main = andFilter.m_main; m_GridFormatForAsterix = andFilter.m_GridFormatForAsterix; RemoveSpacesInAsterix = andFilter.RemoveSpacesInAsterix; return; }
            m_main = new FilterTreeAnd(m_main, andFilter.m_main);
            if (m_GridFormatForAsterix == null) { m_GridFormatForAsterix = andFilter.m_GridFormatForAsterix; RemoveSpacesInAsterix = andFilter.RemoveSpacesInAsterix; }
        }
        /// <summary>Pøipojení dalšího filtru podmínkou OR</summary>
        public void Or(GDataFilter orFilter)
        {
            if (IsEmpty || orFilter.IsEmpty) return;
            m_main = new FilterTreeOr(m_main, orFilter.m_main);
        }

        /// <summary>Pøipojení dalšího filtru podmínkou AND</summary>
        public static GDataFilter operator +(GDataFilter d1, GDataFilter d2)
        {
            var r = new GDataFilter();
            if (d1.m_main == null) 
                r.m_main = d2.m_main;
            else if (d2.m_main == null) 
                r.m_main = d1.m_main;
            else
                r.m_main = new FilterTreeAnd(d1.m_main, d2.m_main);
            return r;
        }

        //------------------------------------------------------------------
        /// <summary>Spustìní filtru</summary>
        public bool RunFilter(DataRow row)
        {
            if (m_main == null) return true;

            var asterix = new AsterixHelper(GridFormatForAsterix, RemoveSpacesInAsterix);
            //row.Table.ExtendedProperties["*"] = asterix;
            //try
            {
            again:
                var result = m_main.RunFilter(row, asterix);
                if (result)
                    return true;

                if (asterix.Next(row.Table))  //pokud filtr obsahuje * a radek neprosel testem v prvnim sloupci a je vice sloupcu, pak se toto splni a opakuje se hledani v dalsim sloupci
                    goto again;
            }
            //finally
            //{
            //    row.Table.ExtendedProperties.Remove("*");
            //}
            return false;
        }

        //------------------------------------------------------------------
        private GGridFormat m_GridFormatForAsterix;
        ///<summary>GridFormat pro použití v pseudosloupci *. Mùže omezit na množinu viditelných sloupcù. Používá formátování sloupcù.</summary>
        public GGridFormat GridFormatForAsterix
        {
            get { return m_GridFormatForAsterix; }
            set { m_GridFormatForAsterix = value; }
        }
        ///<summary>Zda odstranit mezery ve formátovaných údajích v pseudosloupci *. Pouze pokud je dán GridFormatForAsterix, jinak se neformátuje</summary>
        public bool RemoveSpacesInAsterix
        {
            get;
            set;
        }
        //------------------------------------------------------------------
        internal class AsterixHelper
        {
            public GGridFormat gf;
            public int index; //naposledny predavany sloupec. -1 je specialni zarazka
            private int gfindex;
            private bool removeSpaces;
            public AsterixHelper(GGridFormat gf, bool removeSpaces)
            {
                this.gf = gf;
                this.removeSpaces = removeSpaces;
                index = -1;
            }

            /// <summary>G-sloupec, pokud je vyplnen GridFormat</summary>
            public GColumn CurrentColumn { get { return gf == null ? null : gf.Columns[index]; } }

            //chodi do cyklu pres zarazku -1. v praxi projde jeden cyklus
            public bool Next(DataTable table, bool testFirst = true)
            {
                if (testFirst && index == -1) return false;
                index++; //next

                if (gf == null)
                {
                    if (table.Columns.Count <= index) { index = -1; return false; }
                    return true;
                }

                var cl = gf.Columns;
                while (true)
                {
                    if (cl.Count <= index) { index = -1; return false; }
                    var c = cl[index];
                    if (c.Visible == false) { index++; continue; }  //preskoceni neviditelnych sloupcu
                    gfindex = table.Columns.IndexOf(c.Name);
                    if (gfindex < 0) { index++; continue; }               //a je to vubec sloupec z datatably?
                    return true;
                }
            }

            public object GetValue(DataRow row, bool formatted)
            {
                var table = row.Table;
                if (index == -1) { if (Next(table, testFirst: false) == false) return DBNull.Value; }

                if (gf == null)
                {
                    if (table.Columns.Count <= index) return DBNull.Value;
                    return row[index];
                }

                var cl = gf.Columns;
                if (cl.Count <= index) return DBNull.Value;
                var val = row[gfindex];
                if (formatted && (val is IFormattable)) val = FormatValue((IFormattable)val, cl[index]);
                return val;
            }

            private object FormatValue(IFormattable fval, GColumn c)
            {
                var format = c.Format;
                switch (c.DataType)
                {
                    case GColumnType.Decimal:
                        if (c.Format == null || c.Format.Length == 0)
                            format = "N";
                        break;
                    case GColumnType.Integer:
                        if (c.Format == null || c.Format.Length == 0)
                            format = "0";
                        break;
                    case GColumnType.Date:
                        if (c.Format == null || c.Format.Length == 0)
                            format = GDateTime.DefaultDisplayFormat;
                        break;
                }
                var fmt = fval.ToString(format, null);
                if (removeSpaces == false) return fmt;

                //odstraneni vsech pripadnych mezer z formatovaneho retezce.
                var toRemove = new char[] { ' ', '\u00A0' };
                var p = fmt.IndexOfAny(toRemove);
                if (p < 0) return fmt;

                var s = 0;
                var l = fmt.Length;
                var sb = new System.Text.StringBuilder(l);
                while(true)
                {
                    sb.Append(fmt, s, p - s);
                    s = p + 1;
                    p = fmt.IndexOfAny(toRemove, s);
                    if (p < 0) break;
                }
                sb.Append(fmt, s, l - s);
                return sb.ToString();
            }

        }
        
        //------------------------------------------------------------------

        /// <summary>Seznam všech jmen sloupcù</summary>
        public IEnumerable<String> GetColumns()
        {
            if (m_main == null) yield break;
            foreach (FilterTree t in m_main.GetNodes())
            {
                if (t is FilterColumn) yield return t.Name;
            }
        }

        //------------------------------------------------------------------

        internal static object Trim(object val)
        {
            if (val is string) return ((string)val).TrimEnd();
            return val;
        }

        internal static object CastTrim(object val, Type t)
        {
            if (t == null) return Trim(val);
            if (val.GetType() == t) return Trim(val);
            if (val == DBNull.Value) return val; //NULL nezkonvertuju

            if (t == typeof(string))
                return Convert.ToString(val).TrimEnd();
            return _Cast(val, t);
        }
        internal static object Cast(object val, Type t)
        {
            if (t == null) return val;
            if (val.GetType() == t) return val;

            if (t == typeof(string))
                return Convert.ToString(val);
            return _Cast(val, t);
        }
        private static object _Cast(object val, Type t)
        { 
            if (t == typeof(decimal))
                return Convert.ToDecimal(val);
            if (t == typeof(Int64))
                return Convert.ToInt64(val);
            if (t == typeof(Int32))
                return Convert.ToInt32(val);
            if (t == typeof(Int16))
                return Convert.ToInt16(val);
            if (t == typeof(DateTime))
                return Convert.ToDateTime(val);
            if (t == typeof(DateTimeOffset))
                return DateTimeOffset.Parse(val.ToString());

            var l_converter = System.ComponentModel.TypeDescriptor.GetConverter(val);
            return l_converter.ConvertTo(val, t);
        }

        internal static object CallFunc(Funcs func, FilterValueList args, DataRow row, AsterixHelper asterix)
        {
            object v,v2;
            string val;
            switch (func)
            {
                case Funcs.lower:
                    return args[0].GetValue(row, typeof(string), asterix).ToString().ToLower();
                case Funcs.upper:
                    return args[0].GetValue(row, typeof(string), asterix).ToString().ToUpper();
                case Funcs.latin:
                    return GCommon.RemoveDiacritics(args[0].GetValue(row, typeof(string), asterix).ToString());
                case Funcs.trim:
                    return args[0].GetValue(row, typeof(string), asterix).ToString().Trim();
                case Funcs.substr:
                case Funcs.substring:
                    val = args[0].GetValue(row, typeof(string), asterix).ToString();
                    int from = (int)args[1].GetValue(row, typeof(int), asterix);
                    if (from > 0) from--;
                    else if (from < 0) from = val.Length - from;
                    if (from < 0 || from > val.Length) return "";
                    if (args.Count == 2) return val.Substring(from);
                    if (args.Count == 3)
                    {
                        int len = (int)args[2].GetValue(row, typeof(int), asterix);
                        if (from + len > val.Length) return val.Substring(from);
                        return val.Substring(from, len);
                    }
                    throw new ArgumentException();
                case Funcs.convert:
                    //CONVERT – converts particular expression to a specified .NET Framework type 
                    //Example: myDataColumn.Expression="Convert(total, 'System.Int32')" 
                    Type vt = Type.GetType(args[1].GetValue(row, typeof(string), asterix).ToString(), true);
                    v = args[0].GetValue(row, vt, asterix);
                    return Cast(v, vt);
                case Funcs.len:
                    //LEN – gets the length of a string 
                    //Example: myDataColumn.Expression="Len(ItemName)" 
                    val = args[0].GetValue(row, typeof(string), asterix).ToString();
                    return val.Length;
                case Funcs.isnull:
                    //ISNULL – checks an expression and either returns the checked expression or a replacement value 
                    //Example: myDataColumn.Expression="IsNull(price, -1)" 
                    v = args[0].GetValue(row, null, asterix);
                    if (v != DBNull.Value) return v;
                    v2 = args[1].GetValue(row, null, asterix);
                    return v2;
                case Funcs.iif:
                    //IIF – gets one of two values depending on the result of a logical expression 
                    //Example: myDataColumn.Expression = "IIF(total>1000, 'expensive', 'dear') 
                    bool cond = GBoolean.Parse(args[0].GetValue(row, typeof(bool), asterix));
                    v = args[1].GetValue(row, null, asterix);
                    v2 = args[2].GetValue(row, null, asterix);
                    return cond ? v : v2;
            }
            throw new NotImplementedException();
        }

        internal enum FilterOperator
        {
            /// <summary>Znaménko = </summary>
            Equal = 0,
            /// <summary>Znaménko != </summary>
            NotEqual = 1,
            /// <summary>vìtší</summary>
            Greater = 5,
            /// <summary>menší</summary>
            Less = 6,
            /// <summary>vìtší nebo rovno</summary>
            GreaterOrEqual = 7,
            /// <summary>menší nebo rovno</summary>
            LessOrEqual = 8,
        }
        internal abstract class FilterTree
        {
            internal virtual bool RunFilter(DataRow row, AsterixHelper asterix = null) { throw new NotImplementedException(); }
            internal virtual string Name { get { throw new NotImplementedException(); } }
            internal virtual IGDbType Value { get { throw new NotImplementedException(); } }
            internal virtual object GetValue(DataRow row, Type t, AsterixHelper asterix = null) { return RunFilter(row, asterix); }
            internal virtual IEnumerable<FilterTree> GetNodes() { yield return this; }
            protected string PosString(bool n) { return n ? "" : " NOT"; }
        }
        internal class FilterTreeId : FilterTree
        {
            protected string m_Name;
            internal override string Name { get { return m_Name; } }
            public FilterTreeId (string name) { m_Name=name; }
            public override string ToString() { return m_Name; }
        }
        internal class FilterLiteral : FilterTree
        {
            protected IGDbType m_Value;
            internal override IGDbType Value { get { return m_Value; } }
            public FilterLiteral (IGDbType value) { m_Value=value; }

            object m_convertedValue;
            internal override object GetValue(DataRow row, Type t, AsterixHelper asterix)
            {
                if (t == null) return m_Value.DbValue;
                if (m_convertedValue == null) m_convertedValue = CastTrim(m_Value.DbValue, t);
                return m_convertedValue;
            }
            public override string ToString() { if (m_Value is GString) return "'" + m_Value.ToString() + "'"; else return m_Value.ToString(); }
        }
        internal class FilterColumn : FilterTreeId
        {
            public FilterColumn(string name) : base(name) { }
            internal override object GetValue(DataRow row, Type t, AsterixHelper asterix) 
            {
                if (m_Name == "*")
                {
                    //var asterix = row.Table.ExtendedProperties["*"] as AsterixHelper;
                    System.Diagnostics.Debug.Assert(asterix != null);
                    if (asterix == null) throw new GArgumentNullException(21000022, "*");
                    var val = asterix.GetValue(row, t == typeof(string));
                    return CastTrim(val, t);
                }
                return CastTrim(row[m_Name], t); 
            }
        }
        internal class FilterValueList : FilterTree
        {
            List<FilterTree> m_list;
            public FilterValueList(FilterTree t)
            {
                m_list = new List<FilterTree>(new FilterTree[] { t });
            }
            public void Add(FilterTree t)
            {
                m_list.Add(t);
            }
            internal IEnumerable<FilterTree> List { get { return m_list; } }
            internal FilterTree this[int index] { get { return m_list[index]; } }
            internal int Count { get { return m_list.Count; } }
            public override string ToString()
            {
                string s = "";
                foreach (FilterTree f in List)
                {
                    if (!string.IsNullOrEmpty(s)) s += ", ";
                    s += f.ToString();
                }
                return "(" + s + ")";
            }
            internal override IEnumerable<FilterTree> GetNodes() 
            {
                yield return this;
                foreach (FilterTree f in List)
                {
                    foreach(FilterTree t in f.GetNodes())  yield return t;
                }                
            }
        }
        internal enum Funcs { lower, upper, trim, substr, substring, convert, len, isnull, iif, latin };

        internal class FilterFunc : FilterTree
        {
            protected FilterValueList m_Arg;
            internal Funcs m_Func;
            internal override string Name { get { return m_Func.ToString(); } }
            internal override object GetValue(DataRow row, Type t, AsterixHelper asterix) { return CallFunc(m_Func, m_Arg, row, asterix); }

            public FilterFunc(string name, FilterTree arg)
            {
                try
                {
                    m_Func = (Funcs)Enum.Parse(typeof(Funcs), name, true /*ignoreCase*/);
                }
                catch(ArgumentException)
                {
                    throw new GDatasetException(23200369, 23230166, name); //RC-EX 23230166 : Chyba filtru: neznámá funkce {0}.
                }
                
                m_Arg = arg as FilterValueList;
                if (m_Arg == null) throw new GArgumentNullException(23200509);
            }
            public override string ToString() { return Name + m_Arg.ToString(); }
            internal override IEnumerable<FilterTree> GetNodes()
            {
                yield return this;
                foreach (FilterTree t in m_Arg.GetNodes()) yield return t;
            }
        }               

        internal enum ArithmeticOperator {Plus,Minus,Multiply,Divide};
        internal class FilterArithmetics : FilterTree
        {
            FilterTree m_Val1;
            ArithmeticOperator Oper;
            FilterTree m_Val2;

            public FilterArithmetics(FilterTree val1, ArithmeticOperator op, FilterTree val2)
            {
                m_Val1 = val1;
                Oper = op;
                m_Val2 = val2;
            }
            internal string OperatorAsText
            {
                get
                {
                    switch (Oper)
                    {
                        case ArithmeticOperator.Plus: return "+";
                        case ArithmeticOperator.Minus: return "-";
                        case ArithmeticOperator.Multiply: return "*";
                        case ArithmeticOperator.Divide: return "/";
                    }
                    throw new GNotImplementedException(23200371);
                }
            }
            internal override object GetValue(DataRow row, Type t, AsterixHelper asterix) 
            {
                object val1 = m_Val1.GetValue(row, t, asterix);
                if (t == null)
                {
                    t = val1.GetType();
                    if (t == typeof(DBNull)) t = null; //NULL je to zrovna ted, ale priste to muze byt neco jineho. NULL si pamatovat nebudu.
                }
                object val2 = m_Val2.GetValue(row, t, asterix);
                if (val1 == DBNull.Value || val2 == DBNull.Value) return DBNull.Value;

                if (t == typeof(string) && Oper==ArithmeticOperator.Plus)
                {
                    return val1.ToString() + val2.ToString();
                }
                if (t == typeof(decimal) || t == typeof(Int64) || t == typeof(Int32) || t == typeof(Int16))
                {
                    decimal d1 = Convert.ToDecimal(val1);
                    decimal d2 = Convert.ToDecimal(val2);
                    switch (Oper)
                    {
                        case ArithmeticOperator.Plus:
                            return Cast(d1 + d2, t);
                        case ArithmeticOperator.Minus:
                            return Cast(d1 - d2, t);
                        case ArithmeticOperator.Multiply:
                            return Cast(d1 * d2, t);
                        case ArithmeticOperator.Divide:
                            return Cast(d1 / d2, t);
                    }
                }
                throw new GNotImplementedException(23200372);
            }
            public override string ToString() { return m_Val1.ToString() + OperatorAsText + m_Val2.ToString(); }
            internal override IEnumerable<FilterTree> GetNodes()
            {
                yield return this;
                foreach (FilterTree t in m_Val1.GetNodes()) yield return t;
                foreach (FilterTree t in m_Val2.GetNodes()) yield return t;
            }
        }               

        internal class FilterTreeAnd : FilterTree
        {
            FilterTree t1;
            FilterTree t2;
            public FilterTreeAnd(FilterTree t1, FilterTree t2)
            {
                this.t1 = t1;
                this.t2 = t2;
            }
            internal override bool RunFilter(DataRow row, AsterixHelper asterix)
            {
                if (!t1.RunFilter(row, asterix)) return false;
                return t2.RunFilter(row, asterix);
            }
            public override string ToString() { return t1.ToString() + " AND " + t2.ToString(); }
            internal override IEnumerable<FilterTree> GetNodes()
            {
                yield return this;
                foreach (FilterTree t in t1.GetNodes()) yield return t;
                foreach (FilterTree t in t2.GetNodes()) yield return t;
            }
        }
        internal class FilterTreeOr : FilterTree
        {
            FilterTree t1;
            FilterTree t2;
            public FilterTreeOr(FilterTree t1, FilterTree t2)
            {
                this.t1 = t1;
                this.t2 = t2;
            }
            internal override bool RunFilter(DataRow row, AsterixHelper asterix)
            {
                if (t1.RunFilter(row, asterix)) return true;
                return t2.RunFilter(row, asterix);
            }
            public override string ToString() { return "(" + t1.ToString() + " OR " + t2.ToString() + ")"; }
            internal override IEnumerable<FilterTree> GetNodes()
            {
                yield return this;
                foreach (FilterTree t in t1.GetNodes()) yield return t;
                foreach (FilterTree t in t2.GetNodes()) yield return t;
            }
        }
        internal class FilterTreeNot : FilterTree
        {
            FilterTree t;
            public FilterTreeNot(FilterTree t)
            {
                this.t = t;
            }
            internal override bool RunFilter(DataRow row, AsterixHelper asterix)
            {
                return !t.RunFilter(row, asterix);
            }
            public override string ToString() { return "(NOT " + t.ToString() + ")"; }
            internal override IEnumerable<FilterTree> GetNodes()
            {
                yield return this;
                foreach (FilterTree ch in t.GetNodes()) yield return ch;
            }
        }
        internal class FilterComparisonPredicate : FilterTree
        {
            FilterTree m_Val1;
            FilterOperator Oper;
            FilterTree m_Val2;
            Type t = null;

            public FilterComparisonPredicate(FilterTree val1, FilterOperator op, FilterTree val2)
            {
                m_Val1 = val1;
                Oper = op;
                m_Val2 = val2;
            }
            internal string OperatorAsText
            {
                get
                {
                    switch (Oper)
                    {
                        case FilterOperator.Equal:
                            return "=";
                        case FilterOperator.NotEqual:
                            return "<>";
                        case FilterOperator.Less:
                            return "<";
                        case FilterOperator.Greater:
                            return ">";
                        case FilterOperator.LessOrEqual:
                            return "<=";
                        case FilterOperator.GreaterOrEqual:
                            return ">=";
                    }
                    throw new GNotImplementedException(23200368);
                }
            }
            internal override bool RunFilter(DataRow row, AsterixHelper asterix)
            {
                object val1 = m_Val1.GetValue(row, null, asterix);
                //NULL hodnoty nikdy nesplni podminku porovnani - at uz porovnavam jakkoliv
                if (val1 == null || val1 == DBNull.Value) return false;

                if (t == null) t = val1.GetType();
                else val1 = Cast(val1, t);
                IComparable val2 = (IComparable)m_Val2.GetValue(row, t, asterix);

                switch (Oper)
                {
                    case FilterOperator.Equal:
                        return val2.Equals(val1);
                    case FilterOperator.NotEqual:
                        return !val2.Equals(val1);
                    case FilterOperator.Less:
                        return val2.CompareTo(val1) > 0;
                    case FilterOperator.Greater:
                        return val2.CompareTo(val1) < 0;
                    case FilterOperator.LessOrEqual:
                        return val2.CompareTo(val1) >= 0;
                    case FilterOperator.GreaterOrEqual:
                        return val2.CompareTo(val1) <= 0;
                }
                throw new GNotImplementedException(23200352);
            }
            public override string ToString() { return m_Val1.ToString() + OperatorAsText + m_Val2.ToString(); }
            internal override IEnumerable<FilterTree> GetNodes()
            {
                yield return this;
                foreach (FilterTree t in m_Val1.GetNodes()) yield return t;
                foreach (FilterTree t in m_Val2.GetNodes()) yield return t;
            }
        }
        internal class FilterInPredicate : FilterTree
        {
            FilterTree m_Val;
            FilterValueList m_List;
            bool m_pos;
            Type t = null;
            public FilterInPredicate(FilterTree val, FilterValueList list, bool positive)
            {
                m_Val = val;
                m_List = list;
                m_pos = positive;
            }
            internal override bool RunFilter(DataRow row, AsterixHelper asterix)
            {
                object val1 = m_Val.GetValue(row, t, asterix);
                if (t == null)
                {
                    t = val1.GetType();
                    if (t == typeof(DBNull)) { t = null; return !m_pos; }//NULL hodnota nikdy není v IN sekci a nechci si pamatovat tento typ
                }
                foreach (FilterTree l_Val2 in m_List.List)
                {
                    object val2 = l_Val2.GetValue(row, t, asterix);
                    if (val2.Equals(val1))
                        return m_pos;
                }
                return !m_pos;
            }
            public override string ToString() { return m_Val.ToString() + PosString(m_pos) + " IN " + m_List.ToString(); }
            internal override IEnumerable<FilterTree> GetNodes()
            {
                yield return this;
                foreach (FilterTree t in m_Val.GetNodes()) yield return t;
                foreach (FilterTree t in m_List.GetNodes()) yield return t;
            }
        }
        internal class FilterBetweenPredicate : FilterTree
        {
            FilterTree m_Val;
            FilterTree m_Val1;
            FilterTree m_Val2;
            bool m_pos;
            Type t = null;
            public FilterBetweenPredicate(FilterTree val, FilterTree val1, FilterTree val2, bool positive)
            {
                m_Val = val;
                m_Val1 = val1;
                m_Val2 = val2;
                m_pos = positive;
            }
            internal override bool RunFilter(DataRow row, AsterixHelper asterix)
            {
                object val = m_Val.GetValue(row, t, asterix);
                if (t == null)
                {
                    t = val.GetType();
                }

                IComparable val1 = (IComparable)m_Val1.GetValue(row, t, asterix);
                if(val1.CompareTo(val) > 0)
                    return !m_pos;
                IComparable val2 = (IComparable)m_Val2.GetValue(row, t, asterix);
                if (val2.CompareTo(val) < 0)
                    return !m_pos;

                return m_pos;
            }
            public override string ToString() { return "(" + m_Val.ToString() + PosString(m_pos) + " BETWEEN " + m_Val1.ToString() + " AND " + m_Val2.ToString() + ")"; }
            internal override IEnumerable<FilterTree> GetNodes()
            {
                yield return this;
                foreach (FilterTree t in m_Val.GetNodes()) yield return t;
                foreach (FilterTree t in m_Val1.GetNodes()) yield return t;
                foreach (FilterTree t in m_Val2.GetNodes()) yield return t;
            }
        }
        internal class FilterNullPredicate : FilterTree
        {
            FilterTree m_Val;
            bool m_pos;
            public FilterNullPredicate(FilterTree val, bool positive)
            {
                m_Val = val;
                m_pos = positive;
            }
            internal override bool RunFilter(DataRow row, AsterixHelper asterix)
            {
                object val1 = m_Val.GetValue(row, null, asterix);
                if (val1 == null || val1 == DBNull.Value) return m_pos;
                return !m_pos;
            }
            public override string ToString()
            {
                if (m_pos)
                    return m_Val.ToString() + " IS NULL";
                else
                    return m_Val.ToString() + " IS NOT NULL";
            }
            internal override IEnumerable<FilterTree> GetNodes()
            {
                yield return this;
                foreach (FilterTree t in m_Val.GetNodes()) yield return t;
            }
        }
        /// <summary>Vytvoøení regexp pro kontrolu LIKE výrazu</summary>
        public static System.Text.RegularExpressions.Regex LikePredicateRegExp(string pattern)
        {
            /* Turn "off" all regular expression related syntax in
            * the pattern string. */
            pattern = System.Text.RegularExpressions.Regex.Escape(pattern);
            //(\, *, +, ?, |, {, [, (,), ^, $,., #, and 

            /* Replace the SQL LIKE wildcard metacharacters with the
            * equivalent regular expression metacharacters. */
            pattern = pattern.Replace("%", ".*?").Replace("_", ".");

            /* The previous call to Regex.Escape actually turned off
            * too many metacharacters, i.e. those which are recognized by
            * both the regular expression engine and the SQL LIKE
            * statement ([...] and [^...]). Those metacharacters have
            * to be manually unescaped here. */
            pattern = pattern.Replace(@"\[", "[").Replace(@"\^", "^").Replace(@"\\", "\\");

            pattern = "^" + pattern + "$"; //porovnavam pouze na shodu

            //pokus o casovou optimalizaci. Snad se tim zadny extremni pripad nerozbije
            if (pattern.StartsWith("^.*?")) pattern = pattern.Substring(4);
            if (pattern.EndsWith(".*?$")) pattern = pattern.Substring(0, pattern.Length - 4);

            return new System.Text.RegularExpressions.Regex(pattern);
        }
        internal class FilterLikePredicate : FilterTree
        {
            FilterTree m_Val;
            string m_text;
            System.Text.RegularExpressions.Regex m_like;
            bool m_pos;
            public FilterLikePredicate(FilterTree val, IGDbType text, bool positive)
            {
                m_Val = val;
                m_text = ((GString)text).BaseValue;
                m_like = LikePredicateRegExp(m_text);
                m_pos = positive;
            }
            internal override bool RunFilter(DataRow row, AsterixHelper asterix)
            {
                string val = m_Val.GetValue(row, typeof(string), asterix).ToString();
                if(m_pos)
                    return m_like.IsMatch(val);
                else
                    return !m_like.IsMatch(val);
            }
            public override string ToString() { return m_Val.ToString() + PosString(m_pos) + " LIKE '" + m_text + "'"; }
            internal override IEnumerable<FilterTree> GetNodes()
            {
                yield return this;
                foreach (FilterTree t in m_Val.GetNodes()) yield return t;
            }
        }
        internal class FilterRegexPredicate : FilterTree
        {
            FilterTree m_Val;
            string m_text;
            System.Text.RegularExpressions.Regex m_like;
            bool m_pos;
            public FilterRegexPredicate(FilterTree val, IGDbType text, bool positive)
            {
                m_Val = val;
                m_text = ((GString)text).BaseValue;
                m_like = new System.Text.RegularExpressions.Regex(m_text);
                m_pos = positive;
            }
            internal override bool RunFilter(DataRow row, AsterixHelper asterix)
            {
                string val = m_Val.GetValue(row, typeof(string), asterix).ToString();
                if (m_pos)
                    return m_like.IsMatch(val);
                else
                    return !m_like.IsMatch(val);
            }
            public override string ToString() { return m_Val.ToString() + PosString(m_pos) + " LIKE '" + m_text + "'"; }
            internal override IEnumerable<FilterTree> GetNodes()
            {
                yield return this;
                foreach (FilterTree t in m_Val.GetNodes()) yield return t;
            }
        }
    }
}
