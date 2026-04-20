//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDataExpression.cs                           </Name>
//    <Description> Výpoèty výrazù pro GDataView                                </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2011-08-17                                                  </Created>
//  </FileHeader>

using System;
using System.Data;
using System.Collections.Generic;

namespace Gordic.General
{

    /// <summary>Výpoèty výrazù</summary>
#if !DEBUG
	[System.Diagnostics.DebuggerStepThrough]
#endif
    public class GDataExpression : IGObject
    {
        Gordic.General.GDataFilter.FilterTree m_main;

        /// <summary>Konstruktor</summary>
        internal GDataExpression()
        {
            //m_main = null;
        }
        /// <summary>Konstruktor</summary>
        public GDataExpression(string expression)
        {
            var parser = new Gordic.General.DataFilterParser.ExpressionParser(expression);
            parser.Parse();
            m_main = parser.Result;
        }

        //------------------------------------------------------------------
        /// <summary>Pøevod ze stringu</summary>
        public static GDataExpression Parse(string expression)
        {
            return new GDataExpression(expression);
        }
        /// <summary>Pøevod ze stringu</summary>
        public static implicit operator GDataExpression(string expression)
        {
            return new GDataExpression(expression);
        }
        /// <summary>Pøevod do stringu</summary>
        public override string ToString()
        {
            if (m_main == null) return "";
            return m_main.ToString();
        }
        /// <summary>Pøevod do stringu</summary>
        public static implicit operator string(GDataExpression filter)
        {
            return filter.ToString();
        }
        /// <summary>Pøíznak prázdného výrazu</summary>
        public bool IsEmpty
        {
            get { return m_main == null; }
        }

        //------------------------------------------------------------------
        /// <summary>Výpoèet výrazu</summary>
        public object Compute(DataRow row, Type t)
        {
            if (m_main == null) return null;
            return m_main.GetValue(row, t);
        }
        /// <summary>Výpoèet výrazu</summary>
        public T Compute<T>(DataRow row)
        {
            if (m_main == null) return default(T);
            return (T)m_main.GetValue(row, typeof(T));
        }

        //------------------------------------------------------------------


    }

}
