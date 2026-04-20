//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GSqlBoundString.cs                           </Name>
//    <Description> string SQL příkazu s možnými bindovanými proměnnými         </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-08-28                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// Rozhraní pro objekty schopné převodu na SQL řetězec s potenciálně bindovanými proměnnými (otazníky).
    public interface IGSqlBound
    {
        /// <summary>převod na <see cref="GSqlBoundString"/> sql string s možnými bindovanými proměnnými</summary>
        GSqlBoundString ToSql();
    }
    /// <summary>
    /// Reprezentuje SQL řetězec s pozicemi pro bindované proměnné pomocí znaků '?'.
    /// Umožňuje kombinovat více částí SQL a následně převádět na pojmenované parametry.
    /// Lze použít jako <see cref="FormattableString"/> interpolované řetězce.
    /// </summary>
    public class GSqlBoundString : FormattableString, IGSqlBound
    {
        /// <summary>String část SQL s možnými bindovanými proměnnými (otazníky)</summary>
        public readonly string Sql;
        /// <summary>Pole bindovaných hodnot v pořadí výskytu otazníků. Může být <c>null</c>, pokud nejsou bindy.</summary>
        public readonly IGDbType[] Binds;
        /// <summary>Má alespoň jeden otazníček a hodnotu?</summary>
        public bool HasBinds => Binds != null && Binds.Length > 0;

        GSqlBoundString IGSqlBound.ToSql() => this;
        /// <summary>Při použití jako string se bere Sql část</summary>
        public static implicit operator string(GSqlBoundString s) => s.Sql;
        /// <summary>Při použití jako string se bere Sql část</summary>
        public override string ToString() => Sql;
        /// <summary>Při použití jako string se bere Sql část</summary>
        public override string ToString(IFormatProvider formatProvider) => Sql;

        /// <summary>
        /// Zjistí, zda podřetězec existuje v SQL části.
        /// </summary>
        /// <param name="value">Hledaný podřetězec.</param>
        /// <returns>true, pokud se podřetězec vyskytuje; jinak false.</returns>
        public bool Contains(string value) => Sql.Contains(value);

        /// <summary>String část SQL s možnými bindovanými proměnnými ({0}..{N})</summary>
        public override string Format => SqlFormatToBraceFormat(Sql, ArgumentCount);
        /// <summary>Počet argumentů (bindovaných hodnot).</summary>
        public override int ArgumentCount => Binds == null ? 0 : Binds.Length;
        /// <summary>Vrátí argument (bind) podle indexu.</summary>
        public override object GetArgument(int index) => Binds[index];
        /// <summary>Vrací pole argumentů nebo prázdné pole.</summary>
        public override object[] GetArguments() => Binds ?? Array.Empty<object>();

        /// <summary>
        /// Převede formát s {0}..{N} na formát s otazníky '?'.
        /// </summary>
        /// <param name="format">Zdrojový formát s číslenými zástupci.</param>
        /// <param name="replace">Volitelné přemapování indexu na text (místo otazníku).</param>
        /// <returns>SQL formát s otazníky nebo nahrazeným textem.</returns>
        /// <exception cref="GArgumentOutOfRangeException">Neplatná struktura složených závorek.</exception>
        public static string BraceFormatToSqlFormat(string format, Func<int, string> replace = null)
        {
            // Replace all occurrences of {number} in the format string with '?'
            if (string.IsNullOrEmpty(format)) return string.Empty;

            var sb = new StringBuilder(format.Length);
            int i = 0;
            int len = format.Length;
            while (i < len)
            {
                //needs to handle special cases like this "123{{abc}}456 {0:dddd} {1}"
                if (format[i] == '{')
                {
                    if (i + 1 < len && format[i + 1] == '{')  // Escaped "{{"
                    {
                        sb.Append('{');
                        i += 2;
                        continue;
                    }

                    int start = i;
                    int end = format.IndexOf('}', start);
                    if (end > start + 1)
                    {
                        int col = format.IndexOf(':', start, end - start);
                        int pl = col > 0 ? col - start - 1 : end - start - 1;
                        if (int.TryParse(format.Substring(start + 1, pl), NumberStyles.None, CultureInfo.InvariantCulture, out var num))
                        {
                            if (replace != null) sb.Append(replace(num)); else sb.Append('?');
                            i = end + 1;
                            continue;
                        }
                    }
                    throw new GArgumentOutOfRangeException("GSqlBoundString: input string was not in a correct format.");
                }
                else if (format[i] == '}')
                {
                    if (i + 1 < len && format[i + 1] == '}')  // Escaped "}}"
                    {
                        sb.Append('}');
                        i += 2;
                        continue;
                    }
                    throw new GArgumentOutOfRangeException("GSqlBoundString: input string was not in a correct format.");
                }
                else sb.Append(format[i++]);
            }
            return sb.ToString();
        }
        /// <summary>
        /// Převede formát s otazníky '?' na formát s {0}..{N}. Escapuje literály '{' a '}'.
        /// </summary>
        /// <param name="format">Zdrojový SQL formát.</param>
        /// <param name="argumentCountEstimate">Počet otazníků, pokud je znám nebo 0</param>
        /// <returns>Formát s číselnými placeholdery.</returns>
        public static string SqlFormatToBraceFormat(string format, int argumentCountEstimate = 0)
        {
            // Replace all occurrences of '?' in the format string with {0}, {1}, etc.
            if (string.IsNullOrEmpty(format)) return string.Empty;

            int index = 0;
            var result = argumentCountEstimate > 0
                ? new StringBuilder(format.Length + argumentCountEstimate * (1 + GetDigitCount(argumentCountEstimate)))
                : new StringBuilder(format.Length);
            for (int i = 0; i < format.Length; i++)
            {
                if (format[i] == '?')
                    result.Append('{').Append(index++).Append('}');
                else if (format[i] == '{')
                    result.Append("{{");
                else if (format[i] == '}')
                    result.Append("}}");
                else
                    result.Append(format[i]);
            }
            return result.ToString();
        }

        private static int GetDigitCount(int x)
        {
            //zaporna cisla by nemela nastat, zahrnu je jako delka 1
            if (x < 10) return 1;
            if (x < 100) return 2;
            if (x < 1000) return 3;
            return (int)Math.Floor(Math.Log10(Math.Abs(x))) + 1;
            //return x.ToString().Length;
        }

        /// <summary>
        /// Spočítá počet otazníků v řetězci.
        /// </summary>
        /// <param name="s">Vstupní řetězec. Předpokládá se malý počet ?</param>
        /// <returns>Počet výskytů '?'.</returns>
        public static int CountQuestionMarks(string s)
        {
            //předpokládám, že ? nebude zase tak moc, tj. vyplatí se dělat IndexOf místo procházení všech znaků
            //benchmark ukazuje NET 8.0 4.2x rychlejší než procházení všech znaků
            //                  NET 4.8 1.7x rychlejší než procházení všech znaků (ale o dost pomaleji než NET 8.0)
            if (string.IsNullOrEmpty(s)) return 0;
            int count = 0;
            int pos = -1;
            while (true)
            {
                pos = s.IndexOf('?', pos + 1);
                if (pos < 0) break;
                count++;
            }
            return count;
        }

        /// <summary>
        /// konstruktor z SQL s otazníky a výčtem bindů
        /// </summary>
        private GSqlBoundString(string sqlQM, IGDbType[] binds)  // nesmí mít params! Nepoužije pro $"" konstruktor s FormattableString!
        {
            Sql = sqlQM;
            Binds = binds;
        }
        /// <summary>
        /// konstruktor z FormattableString
        /// </summary>
        private GSqlBoundString(FormattableString s)
        {
#if DEBUG || DEVELOP_VERSION
            if (s.Format.Contains('?')) throw new GArgumentOutOfRangeException(21000116, 21090089); //RC-EX 21090089 : Interpolovaný řetězec pro SqlBoundString  nesmí obsahovat otazníky
#endif

            var l_Binds = new List<IGDbType>(s.ArgumentCount);
            Sql = BraceFormatToSqlFormat(s.Format, i =>
            {
                var b = s.GetArgument(i);
                if (b is IGDbType bv) //fast track (mělo by to být nejčastější). GDbTypeConverter.GetIGDbType by to stejně rozpoznal, ale je to zbytečná režie navíc
                {
                    l_Binds.Add(bv);
                    return "?";
                }
                if (b is IGSqlBound bi)
                {
                    var bs = bi.ToSql();
                    if (bs.Binds != null) l_Binds.AddRange(bs.Binds); //přidáme jeho bindy do našeho seznamu bindů
                    return bs.Sql;
                }

                try
                {
                    IGDbType v_hodnota = GDbTypeConverter.GetIGDbType(b, true); //pohlídá všechny možnosti včetně null
                    l_Binds.Add(v_hodnota);
                    return "?";
                }
                catch (GArgumentOutOfRangeException outErr)
                {
                    throw new GInvalidCastException($"Bind {i} nelze převést na IGDbType - nepovolený rozsah - {b?.GetType()} - {outErr.Message}", outErr);
                }
                catch (GInvalidCastException invalidErr)
                {
                    throw new GInvalidCastException($"Bind {i} nelze převést na IGDbType - {b?.GetType()} - {invalidErr.Message}", invalidErr);
                }
            });
            Binds = l_Binds.ToArray();
        }

        /// <summary>
        /// Vytvoří instanci z SQL s otazníky a polem bindů.
        /// </summary>
        /// <param name="sqlQM">SQL s otazníky.</param>
        /// <param name="binds">Pole bindovaných hodnot.</param>
        /// <returns>Instance <see cref="GSqlBoundString"/>.</returns>
        public static GSqlBoundString Bound(GSqlStringWithQm sqlQM, IGDbType[] binds) // nesmí mít params! Nepoužije pro $"" přetížení s FormattableString!
        {
#if DEBUG || DEVELOP_VERSION
            if (CountQuestionMarks(sqlQM) != (binds?.Length ?? 0)) throw new GArgumentOutOfRangeException(21000117, 21090090); //RC-EX 21090090 : SqlBoundString musí dostat stejný počet otazníků, jako bindů
#endif
            return new GSqlBoundString(sqlQM, binds);
        }
        /// <summary>
        /// Vytvoří instanci z SQL s otazníky a výčtem bindů.
        /// </summary>
        /// <param name="sqlQM">SQL s otazníky.</param>
        /// <param name="binds">Výčet bindovaných hodnot.</param>
        /// <returns>Instance <see cref="GSqlBoundString"/>.</returns>
        public static GSqlBoundString Bound(GSqlStringWithQm sqlQM, IEnumerable<IGDbType> binds)
        {
            var barr = binds?.ToArray();
#if DEBUG || DEVELOP_VERSION
            if (CountQuestionMarks(sqlQM) != (barr?.Length ?? 0)) throw new GArgumentOutOfRangeException(21000119, 21090090); //RC-EX 21090090 : SqlBoundString musí dostat stejný počet otazníků, jako bindů
#endif
            return new GSqlBoundString(sqlQM, barr);
        }
        /// <summary>
        /// Vytvoří instanci z formátovaného řetězce (interpolace). Pokud je již typu <see cref="GSqlBoundString"/>, vrací ho přímo.
        /// </summary>
        /// <param name="fs">FormattableString zdroj.</param>
        /// <returns>Instance <see cref="GSqlBoundString"/>.</returns>
        public static GSqlBoundString Bound(FormattableString fs)
        {
            if (fs is GSqlBoundString gsb) return gsb; //pokud už je to GSqlBoundString, tak ho jen vrátím
            return new GSqlBoundString(fs);
        }

        /// <summary>
        /// Vytvoří instanci bez bindů. Řetězec nesmí obsahovat otazníky.
        /// </summary>
        /// <param name="sql">SQL bez otazníků.</param>
        /// <returns>Instance <see cref="GSqlBoundString"/> bez bindů.</returns>
        /// <exception cref="GArgumentOutOfRangeException">Řetězec obsahuje otazník.</exception>
        public static GSqlBoundString NonBound(GSqlString sql)
        {
            //nemělo by být, ale může... if(sql.Contains('?')) throw new GArgumentOutOfRangeException(21000108, 21090086); //RC-EX 21090086 : NonBound nesmí obsahovat otazníky
            return new GSqlBoundString(sql, null);
        }

        //nelze-konvertuje blbe $"" public static implicit operator GSqlBoundString(string s) => NonBound(s);
        //nelze-omezeni c# public static implicit operator GSqlBoundString(FormattableString s) => Bound(s);


        /// <summary>
        /// Spojí dvě <see cref="GSqlBoundString"/> do jedné (SQL části i bindy se zřetězí).
        /// </summary>
        /// <param name="a">Levý operand.</param>
        /// <param name="b">Pravý operand.</param>
        /// <returns>Nově složená instance.</returns>
        public static GSqlBoundString operator +(GSqlBoundString a, GSqlBoundString b) => Bound(a.Sql + b.Sql, GDbType.JoinArraysOrNulls(a.Binds, b.Binds));

        /// <summary>
        /// Připojí text k SQL části beze změny bindů.
        /// </summary>
        /// <param name="a">Levý operand.</param>
        /// <param name="b">Pravý operand. Řetězec nesmí obsahovat otazníky.</param>
        /// <returns>Nově složená instance.</returns>
        public static GSqlBoundString operator +(GSqlBoundString a, string b)
        {
            if (b.Contains('?')) throw new GArgumentOutOfRangeException(21000118, 21090086); //RC-EX 21090086 : NonBound nesmí obsahovat otazníky
            return Bound(a.Sql + b, a.Binds);
        }

        /// <summary>
        /// Převede SQL s otazníky na SQL s pojmenovanými parametry ve tvaru :sqlParamN
        /// a vrátí slovník parametrů.
        /// </summary>
        /// <returns>Dvojice (SQL příkaz, slovník parametrů).</returns>
        public (string sqlCommand, GDbTypeDictionary sqlParams) ToSqlDbTypeDictionary()
        {
            if (ArgumentCount == 0) return (Sql, new GDbTypeDictionary());

            GDbTypeDictionary sqlParamsDict = new GDbTypeDictionary();
            var result = new StringBuilder(Sql.Length + ArgumentCount * (GetDigitCount(ArgumentCount) + "sqlParam".Length));
            int index = 0;
            for (int i = 0; i < Sql.Length; i++)
            {
                if (Sql[i] == '?')
                {
                    string paramName = $"sqlParam{index}";
                    sqlParamsDict.Add(paramName, Binds[index]);
                    result.Append(':').Append(paramName);
                    index++;
                }
                else
                    result.Append(Sql[i]);
            }
            string sqlCommand = result.ToString();
            return (sqlCommand, sqlParamsDict);
        }
    }


    /// <summary>
    /// SQL řetězec bez bindovaných proměnných (neobsahuje otazníky).
    /// Slouží pro jasné odlišení řetězců, které jsou částí SQL příkazu a neobsahují parametry.
    /// </summary>
    public struct GSqlString
    {
        readonly private string m_sql;

        private GSqlString(string sql)
        {
            m_sql = sql;
        }

        /// <summary>Vrací SQL text.</summary>
        public override string ToString() => m_sql;

        /// <summary>
        /// Vytvoří instanci z SQL bez otazníků.
        /// </summary>
        /// <param name="sql">SQL bez otazníků.</param>
        /// <returns>Instance <see cref="GSqlString"/>.</returns>
        public static GSqlString NonBound(string sql)
        {
            return new GSqlString(sql);
        }

        public static implicit operator GSqlString(string s) => NonBound(s);
        public static implicit operator GSqlString(GString s) => NonBound(s.BaseValue);
        public static implicit operator string(GSqlString s) => s.ToString();

        /// <summary>
        /// explicitní převod na GSqlString bez bindů, předaný GSqlStringWithQm by neměl obshovat žádný ?
        /// </summary>
        /// <param name="s"></param>
        public static explicit operator GSqlString(GSqlStringWithQm s) => NonBound(s.ToString());
    }
    /// <summary>
    /// SQL řetězec, který může obsahovat otazníky, ale nemá k nim připojené bindy.
    /// Slouží pro jasné odlišení řetězců, které jsou částí SQL příkazu a obsahují parametry.
    /// Hodnoty musí být dodány jiným způsobem (např. externí kolekcí parametrů).
    /// </summary>
    public struct GSqlStringWithQm
    {
        readonly private string m_sql;

        private GSqlStringWithQm(string sql)
        {
            m_sql = sql;
        }
        /// <summary>Vrací SQL text.</summary>
        public override string ToString() => m_sql;

        /// <summary>
        /// Vytvoří instanci ze SQL, které může obsahovat otazníky bez vazby na bindy.
        /// </summary>
        /// <param name="sql">SQL text.</param>
        /// <returns>Instance <see cref="GSqlStringWithQm"/>.</returns>
        public static GSqlStringWithQm NonBound(string sql)
        {
            //sql může obsahovat ?, ale nemám bindy. Ty se musí předat jinde.
            //může být i bez ?
            return new GSqlStringWithQm(sql);
        }

        public static implicit operator GSqlStringWithQm(string s) => NonBound(s);
        public static implicit operator GSqlStringWithQm(GString s) => NonBound(s.BaseValue);
        public static implicit operator string(GSqlStringWithQm s) => s.ToString();
    }


}
