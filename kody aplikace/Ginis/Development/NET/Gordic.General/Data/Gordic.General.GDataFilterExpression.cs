//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDataFilterExpression.cs                     </Name>
//    <Description> Výrazy pro filtr nad jedním sloupcem                        </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2013-08-09                                                  </Created>
//  </FileHeader>

using System;
using System.Data;
using System.Collections.Generic;

namespace Gordic.General
{

    /// <summary>Výrazy pro filtr nad jedním sloupcem</summary>
#if !DEBUG
	[System.Diagnostics.DebuggerStepThrough]
#endif
    public static class GDataFilterExpression
    {
        //------------------------------------------------------------------
        /// <summary>Pøevod výrazu pro jeden sloupec</summary>
        public static GDataFilter ParseExpression(string p, string value, Type t = null, bool caseSensitive = false, bool diacriticsSensitive = false)
        {
            if (value.Length == 0) throw new GArgumentException(23400289);

            bool valueIsString = t == null || t == typeof(string) || t == typeof(GString);
            string low = $"lower({p})";

            if (value == "'") return low + "=''"; //lower pouzivam jako konverzi NULL na string (jinak NULL <> '')
            if (value == "_") return low + "<>''"; //lower pouzivam jako konverzi NULL na string (jinak NULL <> '')
            if (value.StartsWith("@")) return value.Length > 1 ? $"{p} {value.Substring(1)}" : "";

            string key;
            if (caseSensitive == false && valueIsString) { key = low; value = value.ToLower(); } else key = p;
            if (diacriticsSensitive == false && valueIsString) { key = $"latin({key})"; value = GCommon.RemoveDiacritics(value); }

            GDataFilter f = GDataFilter.Empty;
            foreach (var tk in ParseExpressionTokenizer(value))
                switch(tk.Item1)
                {
                    case ',':
                        f.Or(ParseExpression1(key, tk.Item2, t));
                        break;
                    default:
                        f.And(ParseExpression1(key, tk.Item2, t));
                        break;
                }
            return f;
        }
        private static GDataFilter ParseExpression1(string key, string value, Type t)
        {
            var c1 = value[0];
            if (t != null && t.IsAssignableFrom(typeof(DateTime)) && (c1 == '=' || c1 == '<' || c1 == '>'))
                return ParseExpression_Datetime(key, value);

            if (c1 == '=') return $"{key}='{value.Substring(1)}'";
            if (value.StartsWith("<>")) return $"{key}<>'{value.Substring(2)}'";
            if (value.StartsWith("<=")) return $"{key}<='{value.Substring(2)}'";
            if (value.StartsWith(">=")) return $"{key}>='{value.Substring(2)}'";
            if (c1 == '>') return $"{key}>'{value.Substring(1)}'";
            if (c1 == '<') return $"{key}<'{value.Substring(1)}'";

            if (c1 == '^') return $"{key} RLIKE '\\b{System.Text.RegularExpressions.Regex.Escape(value.Substring(1))}'";
            if (value.StartsWith("-^")) return $"{key} NOT RLIKE '\\b{System.Text.RegularExpressions.Regex.Escape(value.Substring(2))}'";
            if (c1 == '-') return $"{key} NOT RLIKE '{System.Text.RegularExpressions.Regex.Escape(value.Substring(1))}'";
            return $"{key} RLIKE '{System.Text.RegularExpressions.Regex.Escape(value)}'";
        }
        private static GDataFilter ParseExpression_Datetime(string key, string value)
        {
            var s = 0;
            while (value.Length > s && (value[s] == '=' || value[s] == '>' || value[s] == '<')) s++;
            var cult = System.Globalization.CultureInfo.CurrentUICulture.DateTimeFormat;
            var val = value.Substring(s);
            var d1 = DateTime.Parse(val, cult, System.Globalization.DateTimeStyles.AssumeLocal | System.Globalization.DateTimeStyles.AllowWhiteSpaces);
            var d2 = d1;

            //var prec = 0; //pocet zadanych casti
            ////zjisteni kolik toho je na vstupu
            //bool f = true;
            //for (var l = 0; l < val.Length; l++)
            //{
            //    var ch = val[l];
            //    if (ch >= '0' && ch <= '9') { if (f) { f = false; prec++; } }
            //    else f = true;
            //}
            //var p = cult.ShortDatePattern + " " + cult.LongTimePattern;
            //f = true;
            //for (var l = 0; l < p.Length; l++)
            //{
            //    var ch = p[l];
            //    if (Char.IsLetter(ch)) { if (f) { f = false; prec--; if (prec < 0) SetInt(ch, ref d1, ref d2); } }
            //    else f = true;
            //}

            if (d1.Hour == 0)
                d2 = new DateTime(d2.Year, d2.Month, d2.Day, 23, d2.Minute, d2.Second, d2.Millisecond);
            if (d1.Minute == 0)
                d2 = new DateTime(d2.Year, d2.Month, d2.Day, d2.Hour, 59, d2.Second, d2.Millisecond);
            if (d1.Second == 0)
                d2 = new DateTime(d2.Year, d2.Month, d2.Day, d2.Hour, d2.Minute, 59, d2.Millisecond);
            d2 = new DateTime(d2.Year, d2.Month, d2.Day, d2.Hour, d2.Minute, d2.Second, 999);

            var c1 = value[0];
            if (c1 == '=') return $"{key}>='{d1:o}' AND {key}<='{d2:o}'";
            if (value.StartsWith("<>")) return $"{key}<'{d1:o}' OR {key}>'{d2:o}'";
            if (value.StartsWith("<=")) return $"{key}<='{d2:o}'";
            if (value.StartsWith(">=")) return $"{key}>='{d1:o}'";
            if (c1 == '>') return $"{key}>'{d2:o}'";
            if (c1 == '<') return $"{key}<'{d1:o}'";

            return GDataFilter.Empty;
        }

        /// <summary>Test na dokonèení výrazu. Pokud vrátí false, uživatel asi výraz ještì nedopsal a nemá smysl ho spouštìt (nepøeloží se)</summary>
        public static bool IsExpressionComplete(string value)
        {
            foreach (var tk in ParseExpressionTokenizer(value))
                if (IsExpressionComplete1(tk.Item2) == false) return false;
            return true;
        }
        private static bool IsExpressionComplete1(string value)
        {
            switch (value)
            {
                case "":
                case "=":
                case "<>":
                case ">":
                case "<":
                case ">=":
                case "<=":
                case "^":
                    return false;
                default:
                    return true;
            }
        }
        private static IEnumerable<Tuple<char,string>> ParseExpressionTokenizer(string value)
        {
            char op = ' ';
            int l = value.Length;
            bool q = false;
            int s = 0;
            int i = 0;
            while(i < l)
            {
                var ch = value[i];
                if (ch == '"')
                {
                    if (i > s)
                    {
                        value = value.Substring(0, i) + value.Substring(i + 1);
                        l--;
                    }
                    else
                        s = ++i;
                    q = !q;
                    continue;
                }
                if (!q)
                {
                    if (ch == ' ')
                    {
                        if (i > s) yield return new Tuple<char, string>(op, value.Substring(s, i - s));
                        i++;
                        while (i < l && value[i] == ' ') i++;
                        s = i;
                        op = ' ';
                        continue;
                    }
                    if (ch == ',')
                    {
                        if (i > s) yield return new Tuple<char, string>(op, value.Substring(s, i - s));
                        i++;
                        while (i < l && (value[i] == ' ' || value[i] == ',')) i++;
                        s = i;
                        op = ',';
                        continue;
                    }
                    //if (ch == '.' && i + 1 < l && value[i + 1] == '.') //..
                    //{
                    //    if (i > s) yield return new Tuple<char, string>(op, ">=" + value.Substring(s, i - s));
                    //    i++;
                    //    while (i < l && (value[i] == ' ' || value[i] == ',')) i++;
                    //    s = i;
                    //    op = ' ';
                    //    kam s "<=" ?
                    //    continue;
                    //}
                }
                i++;
            }
            if (s == 0) yield return new Tuple<char, string>(op, value);
            else if (s < l) yield return new Tuple<char, string>(op, value.Substring(s));
        }

    }
}
