//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDataTemplate.cs                             </Name>
//    <Description> Šablony                                                     </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2011-08-18                                                  </Created>
//  </FileHeader>

using System;
using System.Data;
using System.Collections.Generic;
using System.Text;

namespace Gordic.General
{

    /// <summary>Základní abstraktní šablona</summary>
    public abstract class GTemplate : IGObject
    {
        /// <summary>Vrací formátovanou hodnotu</summary>
        public string GetFormattedValue(DataRow dataRow)
        {
            return GetFormattedValue(new GDataTemplateDataRowSource(dataRow));
        }
        /// <summary>Vrací formátovanou hodnotu</summary>
        public string GetFormattedValue(DataRow dataRow, params object[] indexValues)
        {
            return GetFormattedValue(new GDataTemplateDataRowSource(dataRow, indexValues));
        }
        /// <summary>Vrací formátovanou hodnotu</summary>
        public string GetFormattedValue(GDataTemplateSource source)
        {
            var value = GetValue(source);
            if (value == null) return string.Empty;
            return value.ToString();
        }

        /// <summary>Vrací neformátovanou hodnotu</summary>
        public object GetValue(DataRow dataRow)
        {
            return GetValue(new GDataTemplateDataRowSource(dataRow));
        }
        /// <summary>Vrací neformátovanou hodnotu</summary>
        public object GetValue(DataRow dataRow, params object[] indexValues)
        {
            return GetValue(new GDataTemplateDataRowSource(dataRow, indexValues));
        }
        /// <summary>Vrací neformátovanou hodnotu</summary>
        public abstract object GetValue(GDataTemplateSource source);

        /// <summary>Pøevod ze stringu</summary>
        public static implicit operator GTemplate(string template)
        {
            return new GDataTemplate(template);
        }
    }

    /// <summary>Delegátová šablona</summary>
    public class GDelegateTemplate : GTemplate
    {
        /// <summary>Delegát pro delegátovou šablonu</summary>
        public delegate object GDelegateTemplateDelegate(GDataTemplateSource source);
        GDelegateTemplateDelegate m_d;
        /// <summary>Delegátová šablona</summary>
        public GDelegateTemplate(GDelegateTemplateDelegate d)
        {
            m_d = d;
        }
        /// <summary>Vrací formátovanou hodnotu</summary>
        public override object GetValue(GDataTemplateSource source)
        {
            return m_d(source);
        }
        ///// <summary>Pøevod do stringu</summary>
        //public override string ToString()
        //{
        //    return "GDelegateTemplate";
        //}
    }
    /// <summary>Delegátová šablona pro typové datarow</summary>
    public class GDelegateDataRowTemplate<T> : GTemplate where T:DataRow
    {
        /// <summary>Delegát pro delegátovou šablonu</summary>
        public delegate object GDelegateTemplateDelegate(T source);
        GDelegateTemplateDelegate m_d;
        /// <summary>Delegátová šablona</summary>
        public GDelegateDataRowTemplate(GDelegateTemplateDelegate d)
        {
            m_d = d;
        }
        /// <summary>Vrací formátovanou hodnotu</summary>
        public override object GetValue(GDataTemplateSource source)
        {
            var row = (source as GDataTemplateDataRowSource)?.Row as T;
            if (row == null) return null;
            return m_d(row);
        }
    }

    /// <summary>Datová šablona</summary>
#if !DEBUG
	[System.Diagnostics.DebuggerStepThrough]
#endif
    public class GDataTemplate : GTemplate
    {
        TemplateTree m_main;

        /// <summary>Konstruktor</summary>
        internal GDataTemplate()
        {
            //m_main = null;
        }
        /// <summary>Konstruktor</summary>
        public GDataTemplate(string template)
        {
            var parser = new Gordic.General.DataTemplateParser.TemplateParser(template);
            parser.Parse();
            m_main = parser.Result;
        }

        //------------------------------------------------------------------
        /// <summary>Pøevod ze stringu</summary>
        public static GDataTemplate Parse(string template)
        {
            return new GDataTemplate(template);
        }
        /// <summary>Pøevod do stringu</summary>
        public override string ToString()
        {
            if (m_main == null) return "";
            return m_main.ToString();
        }
        /// <summary>Pøevod do stringu</summary>
        public static implicit operator string(GDataTemplate template)
        {
            return template.ToString();
        }
        /// <summary>Vrací formátovanou hodnotu</summary>
        public override object GetValue(GDataTemplateSource source)
        {
            return m_main.GetValue(source);
        }
        internal abstract class TemplateTree
        {
            internal virtual string Name { get { throw new NotImplementedException(); } }
            //internal virtual IGDbType Value { get { throw new NotImplementedException(); } }
            internal abstract object GetValue(GDataTemplateSource source);
        }
        internal class TemplateText : TemplateTree
        {
            protected string m_Name;
            internal override string Name { get { return m_Name; } }
            public TemplateText(string name) { m_Name = name; }
            public override string ToString() { return m_Name; }
            internal override object GetValue(GDataTemplateSource source) { return Name; }
        }
        internal class TemplateTextList : TemplateTree
        {
            TemplateTree node;
            TemplateTextList next;
            StringBuilder sb = null;
            public TemplateTextList(TemplateTree node, TemplateTextList next = null)
            {
                this.node = node;
                this.next = next;
            }
            public override string ToString()
            {
                StringBuilder s = new StringBuilder();
                TemplateTextList l = this;
                while (l != null)
                {
                    bool b = l.node is TemplateText;
                    if (!b) s.Append('{');
                    s.Append(l.node.ToString());
                    if (!b) s.Append('}');
                    l = l.next;
                }
                return s.ToString();
            }
            internal override object GetValue(GDataTemplateSource source)
            {
                if (next == null) return node.GetValue(source);

                if (sb == null) sb = new StringBuilder(); else sb.Clear();
                TemplateTextList l = this;
                while (l != null)
                {
                    sb.Append(l.node.GetValue(source));
                    l = l.next;
                }
                return sb.ToString();
            }
        }
        internal class TemplateId : TemplateTree
        {
            protected string m_Name;
            internal override string Name { get { return m_Name; } }
            public TemplateId(string name) { m_Name = name; }
            public override string ToString() { if (m_Name.Contains("!")) return m_Name.Replace('!', '(') + ")"; return m_Name; }
            internal override object GetValue(GDataTemplateSource source) { throw new NotImplementedException(); }
            internal void AppendName(string n) { m_Name = m_Name + n; }
        }
        internal class TemplateNumber : TemplateTree
        {
            protected int m_Value;
            //internal override IGDbType Value { get { return m_Value; } }
            internal int Value { get { return m_Value; } }
            public TemplateNumber(string value) { m_Value = Int32.Parse(value); }
            public TemplateNumber(int value) { m_Value = value; }
            public override string ToString() { return m_Value.ToString(); }
            internal static TemplateNumber Negate(TemplateNumber t) { return new TemplateNumber(t.Value * -1); }
            internal override object GetValue(GDataTemplateSource source) { return m_Value; }
        }
        internal class TemplateColumn : TemplateId
        {
            public TemplateColumn(TemplateId id) : base(id.Name) { }
            internal override object GetValue(GDataTemplateSource source) { return source[Name]; }
        }
        internal class TemplateColumnByIndex : TemplateId
        {
            protected int m_Value;
            public TemplateColumnByIndex(TemplateNumber index) : base("") { m_Value = index.Value; }
            public override string ToString() { return m_Value.ToString(); }
            internal override object GetValue(GDataTemplateSource source) { return source[m_Value]; }
        }

        internal enum Funcs { lower, upper, trim, substr, substring, len, isnull, datecategory };
        
        internal static object CallFunc(Funcs func, TemplateValueList args, GDataTemplateSource source)
        {
            object v, v2;
            string val;
            switch (func)
            {
                case Funcs.lower:
                    return args[0].GetValue(source).ToString().ToLower();
                case Funcs.upper:
                    return args[0].GetValue(source).ToString().ToUpper();
                case Funcs.trim:
                    return args[0].GetValue(source).ToString().Trim();
                case Funcs.substr:
                case Funcs.substring:
                    val = args[0].GetValue(source).ToString();
                    int from = Convert.ToInt32(args[1].GetValue(source)); // GInt32.Parse(args[1].GetValue(source));
                    if (from > 0) from--;
                    else if (from < 0) from = val.Length - from;
                    if (from < 0 || from > val.Length) return "";
                    if (args.Count == 2) return val.Substring(from);
                    if (args.Count == 3)
                    {
                        int len = Convert.ToInt32(args[2].GetValue(source));
                        if (from + len > val.Length) return val.Substring(from);
                        return val.Substring(from, len);
                    }
                    throw new ArgumentException();
                case Funcs.len:
                    //LEN – gets the length of a string 
                    //Example: myDataColumn.Expression="Len(ItemName)" 
                    val = args[0].GetValue(source).ToString();
                    return val.Length;
                case Funcs.isnull:
                    //ISNULL – checks an expression and either returns the checked expression or a replacement value 
                    //Example: myDataColumn.Expression="IsNull(price, -1)" 
                    v = args[0].GetValue(source);
                    if (v != DBNull.Value) return v;
                    v2 = args[1].GetValue(source);
                    return v2;
                case Funcs.datecategory:
                    v = args[0].GetValue(source);
                    v2 = null;
                    if (args.Count > 1) v2 = args[1].GetValue(source);
                    if (v2 == null)
                        return GDate.Parse(v).Category();
                    else
                        return GDate.Parse(v).Category(v2.ToString());
            }
            throw new NotImplementedException();
        }
        internal class TemplateFunc : TemplateTree
        {
            protected TemplateValueList m_Arg;
            internal Funcs m_Func;
            internal override string Name { get { return m_Func.ToString(); } }
            internal override object GetValue(GDataTemplateSource source) { return CallFunc(m_Func, m_Arg, source); }

            public TemplateFunc(TemplateId name, TemplateTree arg)
            {
                try
                {
                    m_Func = (Funcs)Enum.Parse(typeof(Funcs), name.Name, true /*ignoreCase*/);
                }
                catch (ArgumentException)
                {
                    throw new GDatasetException(21000011, 21090004, name.Name); //RC-EX 21090004 : Chyba šablony: neznámá funkce {0}.
                }

                m_Arg = arg as TemplateValueList;
                if (m_Arg == null) throw new GArgumentNullException(23200510);
            }
            public override string ToString() { return Name + m_Arg.ToString(); }
        }
        internal class TemplateValueList : TemplateTree
        {
            List<TemplateTree> m_list;
            public TemplateValueList(TemplateTree t)
            {
                m_list = new List<TemplateTree>(new TemplateTree[] { t });
            }
            public void Add(TemplateTree t)
            {
                m_list.Add(t);
            }
            internal IEnumerable<TemplateTree> List { get { return m_list; } }
            internal TemplateTree this[int index] { get { return m_list[index]; } }
            internal int Count { get { return m_list.Count; } }
            internal override object GetValue(GDataTemplateSource source) { throw new NotImplementedException(); }
            public override string ToString()
            {
                string s = "";
                foreach (TemplateTree f in List)
                {
                    if (!string.IsNullOrEmpty(s)) s += ", ";
                    s += f.ToString();
                }
                return "(" + s + ")";
            }
        }
        internal enum ArithmeticOperator { Plus, Minus, Multiply, Divide };
        internal class TemplateArithmetics : TemplateTree
        {
            TemplateTree m_Val1;
            ArithmeticOperator Oper;
            TemplateTree m_Val2;

            public TemplateArithmetics(TemplateTree val1, ArithmeticOperator op, TemplateTree val2)
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
                    throw new GNotImplementedException(21000009);
                }
            }
            internal override object GetValue(GDataTemplateSource source)
            {
                object val1 = m_Val1.GetValue(source);
                object val2 = m_Val2.GetValue(source);
                //var t = val1.GetType();

                if (val1 is int || val1 is short)
                {
                    int d1 = Convert.ToInt32(val1);
                    int d2 = Convert.ToInt32(val2);
                    switch (Oper)
                    {
                        case ArithmeticOperator.Plus:
                            return d1 + d2;
                        case ArithmeticOperator.Minus:
                            return d1 - d2;
                        case ArithmeticOperator.Multiply:
                            return d1 * d2;
                        case ArithmeticOperator.Divide:
                            return d1 / d2;
                    }
                }
                if (val1 is string && Oper == ArithmeticOperator.Plus)
                {
                    return ((string)val1) + val2.ToString();
                }
                if (val1 is decimal || val1 is Int64)
                {
                    decimal d1 = Convert.ToDecimal(val1);
                    decimal d2 = Convert.ToDecimal(val2);
                    switch (Oper)
                    {
                        case ArithmeticOperator.Plus:
                            return d1 + d2;
                        case ArithmeticOperator.Minus:
                            return d1 - d2;
                        case ArithmeticOperator.Multiply:
                            return d1 * d2;
                        case ArithmeticOperator.Divide:
                            return d1 / d2;
                    }
                }
                throw new GNotImplementedException(21000010);
            }
            public override string ToString() { return m_Val1.ToString() + OperatorAsText + m_Val2.ToString(); }
        }
        internal class TemplateFormat : TemplateTree
        {
            string m_f;
            internal TemplateTree m_t;
            public TemplateFormat(string f) { m_f = f; }
            public override string ToString() { return (m_t == null ? "" : m_t.ToString()) + ':' + m_f; }
            internal override object GetValue(GDataTemplateSource source)
            {
                var v = m_t.GetValue(source);
                var f = v as IFormattable;
                if (f == null) return v;
                try
                {
                    return f.ToString(m_f, null);
                }
                catch
                {
                    return f.ToString();
                }
            }
            public static TemplateFormat Set(TemplateTree t, TemplateTree af)
            {
                TemplateFormat f = (TemplateFormat)af;
                if(t is TemplateNumber)
                {
                    t = new TemplateColumnByIndex((TemplateNumber)t);
                }
                f.m_t = t;
                return f;
            }
        }
    }

    /// <summary>Pomocná tøída na zdroj dat šablon</summary>
    public abstract class GDataTemplateSource
    {
        /// <summary>Data pomocí jména</summary>
        public abstract object GetDataByName(string name);
        /// <summary>Data pomocí indexu</summary>
        public abstract object GetDataByIndex(int index);

        /// <summary>Data pomocí indexu</summary>
        public object this[int index]
        {
            get { return GetDataByIndex(index); }
        }
        /// <summary>Data pomocí jména</summary>
        public object this[string name]
        {
            get { return GetDataByName(name); }
        }
    }
    /// <summary>Zdroj dat šablon z DataRow</summary>
    public class GDataTemplateDataRowSource : GDataTemplateSource
    {
        DataRow r;
        object[] indexValues;
        /// <summary>Zdroj dat šablon z DataRow</summary>
        public GDataTemplateDataRowSource(DataRow r) { this.r = r; }
        /// <summary>Zdroj dat šablon z DataRow a indexovaných hdonot</summary>
        public GDataTemplateDataRowSource(DataRow r, object[] indexValues) { this.r = r; this.indexValues = indexValues; }
        /// <summary>Data pomocí jména</summary>
        public override object GetDataByName(string name) { return r[name]; }
        /// <summary>Data pomocí indexu</summary>
        public override object GetDataByIndex(int index) { if (indexValues != null) return indexValues[index]; return null; }
        /// <summary>øádek dat</summary>
        public DataRow Row { get { return r; } }
    }

    /// <summary>Dynamický zdroj dat šablon</summary>
    public class GDataTemplateDynamicSource : GDataTemplateDataRowSource
    {
        /// <summary>Delegát pro zdroj dat šablon</summary>
        public delegate object GetDataByNameDelegate(string name);

        GetDataByNameDelegate nd;
        /// <summary>Zdroj dat šablon z DataRow a indexovaných hdonot</summary>
        public GDataTemplateDynamicSource(GetDataByNameDelegate nd, DataRow r, params object[] indexValues) : base(r, indexValues) { this.nd = nd; }
        /// <summary>Data pomocí jména</summary>
        public override object GetDataByName(string name) 
        {
            var v = nd(name); if (v != null) return v;
            return base.GetDataByName(name);
        }
    }
    
/*    
    public class TemplateTest
    {
        [STAThread]
        public static void Main()
        {
            new TemplateTest().Test1();
        }
        public void Test1()
        {
            DataTable t = new DataTable();
            t.Columns.Add("col",typeof(int));
            DataRow r = t.Rows.Add(42);

            //GDataTemplate t1 = "text";
            //GDataTemplate t2 = "{col}";
            //GDataTemplate t3 = "aaa{col}bbb";
            //GDataTemplate t4 = "{len(#text)}";
            GDataTemplate t4 = "{substr(#text,0,len(#text)-1)}";
            var s4 = new GDataTemplateDynamicSource(name => { if (name == "#text") return "[moje]"; return null; }, r, 33, 42);
            System.Diagnostics.Stopwatch sw = new System.Diagnostics.Stopwatch();
            sw.Start();

            for (int i = 0; i < 1000000; i++)
            {
                var v = t4.GetFormattedValue(s4);
            }

            sw.Stop();
            Console.WriteLine("Elapsed={0}",sw.Elapsed);
            Console.ReadKey();
        }
    }
        */
}
