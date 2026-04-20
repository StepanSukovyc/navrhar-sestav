//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GODataFilter.cs                              </Name>
//    <Description> Filtrace dle OData standardu                                </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-03-30                                                  </Created>
//  </FileHeader>

using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;

namespace Gordic.General.ODataParser
{

    /// <summary>Filtrace dle OData standardu</summary>
#if !DEBUG
	[System.Diagnostics.DebuggerStepThrough]
#endif
    internal static class GODataFilter
    {

        ////------------------------------------------------------------------
        internal static Tree TextConstant(string text)
        {
            return new TreeLiteral(new GString(text.Replace("''","'")));
        }
        internal static Tree NumberConstant(GInt32 gInt32)
        {
            return new TreeLiteral(gInt32);
        }
        internal static Tree NumberConstant(GDecimal gDecimal)
        {
            return new TreeLiteral(gDecimal);
        }
        internal static Tree DateConstant(string yytext)
        {
            return new TreeLiteral(GDate.Parse(yytext));
        }
        internal static Tree DatetimeConstant(string yytext)
        {
            return new TreeLiteral(GDateTime.Parse(yytext));
        }
        internal static Tree True()
        {
            return new TreeLiteral(new GBoolean(true));
        }
        internal static Tree False()
        {
            return new TreeLiteral(new GBoolean(false));
        }
        internal static Tree Null()
        {
            return new TreeLiteral(GString.Null); //jiny typ?
        }

        internal static Tree Id(string name)
        {
            return new TreeId(name);
        }
        internal static Tree Not(Tree l)
        {
            return new TreeNot(l);
        }
        internal static Tree Eq(Tree l, Tree r)
        {
            return new TreeComparison(l, OperatorEnum.Equal, r);
        }
        internal static Tree Ne(Tree l, Tree r)
        {
            return new TreeComparison(l, OperatorEnum.NotEqual, r);
        }
        internal static Tree Lt(Tree l, Tree r)
        {
            return new TreeComparison(l, OperatorEnum.Less, r);
        }
        internal static Tree Le(Tree l, Tree r)
        {
            return new TreeComparison(l, OperatorEnum.LessOrEqual, r);
        }
        internal static Tree Gt(Tree l, Tree r)
        {
            return new TreeComparison(l, OperatorEnum.Greater, r);
        }
        internal static Tree Ge(Tree l, Tree r)
        {
            return new TreeComparison(l, OperatorEnum.GreaterOrEqual, r);
        }
        internal static Tree In(Tree l, Tree r)
        {
            return new TreeComparison(l, OperatorEnum.In, r);
        }

        internal static Tree Or(Tree l, Tree r)
        {
            throw new GNotImplementedException();
        }
        internal static Tree And(Tree l, Tree r)
        {
            return new TreeAnd(l, r);
        }

        internal static Tree Contains(Tree l, Tree r)
        {
            return new TreeBoolFunction(l, BoolFuncEnum.Contains, r);
        }
        internal static Tree StartsWith(Tree l, Tree r)
        {
            return new TreeBoolFunction(l, BoolFuncEnum.StartsWith, r);
        }
        internal static Tree EndsWith(Tree l, Tree r)
        {
            return new TreeBoolFunction(l, BoolFuncEnum.EndsWith, r);
        }


        internal abstract class Tree
        {
            internal virtual string Name => throw new GNotImplementedException(21000095);
            internal virtual IGDbType Value => throw new GNotImplementedException(21000094);
            internal virtual IEnumerable<Tree> GetNodes() { yield return this; }

            internal virtual GFilterSet<TFilterId> CreateGFilter<TFilterId>() where TFilterId : Enum => throw new GNotImplementedException(21000093);
        }
        private class TreeId : Tree
        {
            protected string m_Name;
            internal override string Name { get { return m_Name; } }
            public TreeId (string name) { m_Name=name; }
            public override string ToString() { return m_Name; }
        }
        private class TreeLiteral : Tree
        {
            protected IGDbType m_Value;
            internal override IGDbType Value { get { return m_Value; } }
            public TreeLiteral (IGDbType value) { m_Value=value; }

            public override string ToString() => m_Value is GString ? $"'{m_Value}'" : m_Value.ToString();
        }
        internal class TreeValueList : Tree
        {
            List<Tree> m_list;
            public TreeValueList(Tree t)
            {
                m_list = new List<Tree>(new Tree[] { t });
            }
            public void Add(Tree t)
            {
                m_list.Add(t);
            }
            internal IEnumerable<Tree> List { get { return m_list; } }
            internal Tree this[int index] { get { return m_list[index]; } }
            internal int Count { get { return m_list.Count; } }
            public override string ToString()
            {
                string s = "";
                foreach (Tree f in List)
                {
                    if (!string.IsNullOrEmpty(s)) s += ", ";
                    s += f.ToString();
                }
                return "(" + s + ")";
            }
            internal override IEnumerable<Tree> GetNodes()
            {
                yield return this;
                foreach (Tree f in List)
                {
                    foreach (Tree t in f.GetNodes()) yield return t;
                }
            }
        }
        private class TreeNot : Tree
        {
            Tree m_Val1;
            public TreeNot(Tree l) { m_Val1 = l; }
            public override string ToString() => $"not({m_Val1})";
            internal override GFilterSet<TFilterId> CreateGFilter<TFilterId>()
            {
                if (m_Val1 is TreeComparison c) return c.CreateGFilter<TFilterId>(GOperatorValueBase.NegateOperator(c.Operator) ?? throw new GArgumentOutOfRangeException(21000097, "operator"));
                throw new GNotImplementedException(21000099);
            }
        }
        private class TreeAnd : Tree
        {
            Tree m_Val1;
            Tree m_Val2;
            public TreeAnd(Tree l, Tree r) { m_Val1 = l; m_Val2 = r; }
            public override string ToString() => $"{m_Val1} and {m_Val2}";

            internal override GFilterSet<TFilterId> CreateGFilter<TFilterId>()
            {
                return GFilterSet<TFilterId>.And(m_Val1.CreateGFilter<TFilterId>(), m_Val2.CreateGFilter<TFilterId>());
            }

        }

        private class TreeComparison : Tree
        {
            Tree m_Val1;
            OperatorEnum Oper;
            Tree m_Val2;

            public TreeComparison(Tree val1, OperatorEnum op, Tree val2)
            {
                m_Val1 = val1;
                Oper = op;
                m_Val2 = val2;
            }
            internal string OperatorAsText => GFilterOData.ODataOperator(Oper);
            internal OperatorEnum Operator => Oper;

            public override string ToString() => $"{m_Val1} {OperatorAsText} {m_Val2}";
            internal override IEnumerable<Tree> GetNodes()
            {
                yield return this;
                foreach (Tree t in m_Val1.GetNodes()) yield return t;
                foreach (Tree t in m_Val2.GetNodes()) yield return t;
            }

            internal override GFilterSet<TFilterId> CreateGFilter<TFilterId>() => CreateGFilter<TFilterId>(Oper);
            internal GFilterSet<TFilterId> CreateGFilter<TFilterId>(OperatorEnum oper) where TFilterId : Enum
            {
                if (m_Val1 is TreeId id)
                {
                    var f = (TFilterId)Enum.Parse(typeof(TFilterId), id.Name);
                    if (m_Val2 is TreeLiteral lit)
                    {
                        return (GFilterSet<TFilterId>)new GFilter<TFilterId>(f, oper, lit.Value);
                    }
                    if (m_Val2 is TreeValueList list)
                    {
                        var values = list.List.Select(i => new GOperatorValue(oper, i.Value)).ToArray();
                        return (GFilterSet<TFilterId>)new GFilter<TFilterId>(f, values);
                    }
                }
                throw new GNotImplementedException(21000091);
            }

        }

        enum BoolFuncEnum
        {
            Contains,
            StartsWith,
            EndsWith
        }
        private class TreeBoolFunction : Tree
        {
            Tree m_Val1;
            BoolFuncEnum Func;
            Tree m_Val2;

            public TreeBoolFunction(Tree val1, BoolFuncEnum op, Tree val2)
            {
                m_Val1 = val1;
                Func = op;
                m_Val2 = val2;
            }
            public override string ToString() => $"{Func.ToString().ToLower()}({m_Val1}, {m_Val2})";
            internal override IEnumerable<Tree> GetNodes()
            {
                yield return this;
                foreach (Tree t in m_Val1.GetNodes()) yield return t;
                foreach (Tree t in m_Val2.GetNodes()) yield return t;
            }

            internal override GFilterSet<TFilterId> CreateGFilter<TFilterId>() => CreateGFilter<TFilterId>(Func);
            internal GFilterSet<TFilterId> CreateGFilter<TFilterId>(BoolFuncEnum func) where TFilterId : Enum
            {
                if (m_Val1 is TreeId id)
                {
                    var f = (TFilterId)Enum.Parse(typeof(TFilterId), id.Name);
                    if (m_Val2 is TreeLiteral lit)
                    {
                        GString v;
                        switch(func)
                        {
                            case BoolFuncEnum.Contains:
                                v = GString.ReadOnly($"%{lit.Value}%");
                                break;
                            case BoolFuncEnum.StartsWith:
                                v = GString.ReadOnly($"{lit.Value}%");
                                break;
                            case BoolFuncEnum.EndsWith:
                                v = GString.ReadOnly($"%{lit.Value}");
                                break;
                            default:
                                throw new GNotImplementedException(21000113);
                        }
                        return (GFilterSet<TFilterId>)new GFilter<TFilterId>(f, OperatorEnum.Like, v);
                    }
                    //if (m_Val2 is TreeValueList list)
                    //{
                    //    var values = list.List.Select(i => new GOperatorValue(oper, i.Value)).ToArray();
                    //    return (GFilterSet<TFilterId>)new GFilter<TFilterId>(f, values);
                    //}
                }
                throw new GNotImplementedException(21000112);
            }

        }

    }
}
