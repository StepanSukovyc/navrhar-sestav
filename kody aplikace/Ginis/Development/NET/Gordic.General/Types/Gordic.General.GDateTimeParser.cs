//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDateTimeParser.cs                           </Name>
//    <Description> Třída pro parsování datumu vč. pomocných výrazů.            </Description>
//    <Author>      vnovotny                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-06-07                                                  </Created>
//  </FileHeader>

using System;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;

namespace Gordic.General
{
    /// <summary>
    /// Třída pro parsování datumu vč. pomocných výrazů.
    /// </summary>
    public class GDateTimeParser: IGObject
    {

        private const char MODIFIERS_DELIMITER = '|';
        
        /// <summary>
        /// Parsuje datum uvedené v ISO8601 a chápe pomocné výrazy:
        /// * NOW
        /// * TODAY
        /// * YESTERDAY
        /// * TOMORROW
        /// a modifikátory <see cref="ModifyDateTime(DateTime, string)"/>
        /// oddělené znakem <see cref="MODIFIERS_DELIMITER"/>
        /// </summary>
        /// <param name="s"></param>
        /// <param name="provider"></param>
        /// <param name="dateTimeStyles"></param>
        /// <returns></returns>
        public static DateTime Parse(string s, IFormatProvider provider = null
            , DateTimeStyles dateTimeStyles = DateTimeStyles.AssumeLocal)
        {
            if (s.Contains(MODIFIERS_DELIMITER)) {
                var parts = s.Split(MODIFIERS_DELIMITER);
                return parts.Skip(1).Aggregate(Parse(parts[0]), ModifyDateTime);
            }

            switch (s.Trim().ToUpper()) {
                case "NOW": return DateTime.Now;
                case "TODAY": return DateTime.Today;
                case "YESTERDAY": return DateTime.Today.AddDays(-1);
                case "TOMORROW": return DateTime.Today.AddDays(1);
            }

            DateTime dateTime;
            if (DateTime.TryParse(s, provider ?? new DateTimeFormatInfo()
                , dateTimeStyles, out dateTime)
            ) {
                return dateTime;
            }

            throw new FormatException(GResources.GetResourceText(
                typeof(GDateTimeParser).Assembly, /*RC*/ 31400003, s)); //RC 31400003 : Nepodporovaný časový výraz: {0}
        }

        private static readonly Regex _RE_MODIFIER =
            new Regex(@"^([+-])(\d+)?(\w+?)s?$", RegexOptions.IgnoreCase);

        /// <summary>
        /// Upraví DateTime dle modifikátoru uvedeného jako řetězez obsahující
        /// validní zápis <see cref="TimeSpan"/> nebo pomocný výraz.
        /// Př. modifkátorů: "+5days", "+00:45:22"
        /// </summary>
        /// <param name="seed"></param>
        /// <param name="modifier"></param>
        /// <returns></returns>
        public static DateTime ModifyDateTime(DateTime seed, string modifier)
        {
            TimeSpan timeSpan;
            if (TimeSpan.TryParse(
                // znaménko '+' není v TimeSpan validní, znaménko '-' už ano
                modifier.StartsWith("+") ? modifier.Substring(1) : modifier
                , out timeSpan)
            ) {
                return seed.Add(timeSpan);
            }

            var match = _RE_MODIFIER.Match(modifier);
            if (match.Success) {
                var groups = match.Groups;

                int multiplier = Int32.Parse(groups[1]
                    // uvedení číslovky není povinné a pokud chybí, dosadí se "1"
                    + (groups[2].Success ? groups[2].Value : "1"));

                switch (groups[3].Value.ToUpper()) {
                    case "SECOND": return seed.AddSeconds(multiplier);
                    case "MINUTE": return seed.AddMinutes(multiplier);
                    case "HOUR": return seed.AddHours(multiplier);
                    case "DAY": return seed.AddDays(multiplier);
                    case "WEEK": return seed.AddDays(7 * multiplier);
                    case "MONTH": return seed.AddMonths(multiplier);
                    case "YEAR": return seed.AddYears(multiplier);
                }
            }

            throw new FormatException(GResources.GetResourceText(
                typeof(GDateTimeParser).Assembly, /*RC*/ 31400002, modifier)); //RC 31400002 : Nepodporovaný časový modifikátor: {0}
        }

        /// <summary>
        /// Vyhodnotí textový zápis, zda se jedná o datum bez určení času.
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        public static bool IsDate(string s)
        {
            if (s.Length == 0) return false;

            int pos = s.IndexOf(MODIFIERS_DELIMITER);
            if (pos != -1) return IsDate(s.Substring(0, pos));

            switch(s.ToUpper()) {
                case "TODAY":
                case "TOMORROW":
                case "YESTERDAY":
                    return true;
                default:
                // datetime je v ISO8601 bez časové složky
                DateTime dt;
                    return DateTime.TryParse(s, out dt) && !s.Contains("T");
            }
        }
    }
}
