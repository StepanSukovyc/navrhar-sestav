//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDateTimeAttribute.cs                        </Name>
//    <Description> Validační atribut pro zadání data v určitém rozsahu         </Description>
//    <Author>      vnovotny                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-06-09                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{

    /// <summary>
    /// Validační atribut pro zadání data v určitém rozsahu. Standardně
    /// omezuje datum na krajní meze SQLDateTime typu. Využívá 
    /// <see cref="GDateTimeParser"/> pro zadávání proměnlivých časových
    /// údajů jako "TODAY", "YESTERDAY" a umožňuje využívat modifikátory
    /// času oddělené znakem '|' (pipe) jako "TODAY|-5WEEKS" nebo
    /// "TODAY|-1WEEK|+5HOURS".
    /// </summary>
    public class GDateTimeAttribute : GValidationAttribute
    {
        private const string
            DB_MIN_DATE = "1753-01-01T12:00:00"
            , DB_MAX_DATE = "9999-12-31T23:59:59"
            ;

        private const int DEFAULT_MESSAGE = /*RC*/ 31400023; //RC 31400023 : Zadaná hodnota neni v povoleném rozsahu
        
        private bool _MaximumIsDate;
        private string _Maximum;
        private string _Minimum;
        private DateTime? _MaximumCached = null;
        private DateTime? _MinimumCached = null;

        public override string Type => "DateTime";
        public DateTime? Minimum => _Minimum == null ? null :
            _MinimumCached ?? (GDateTimeParser.Parse(_Minimum) as DateTime?);

        public DateTime? Maximum => _Maximum == null ? null :
                _MaximumCached ?? ((_MaximumIsDate
                    ? GDateTimeParser.Parse(_Maximum).AddDays(1).AddSeconds(-1)
                    : GDateTimeParser.Parse(_Maximum)) as DateTime?);

        /// <summary>
        /// Konstruktor pro zadání dvou krajních mezí data.
        /// </summary>
        /// <param name="minimum">Spodní mez časového omezení. Standardně
        /// nastavená na SQLDateTime minimum, nastavením na null lze spodní
        /// omezení zrušit.</param>
        /// <param name="maximum">Horní mez časového omezení. Standardně
        /// nastavená na SQLDateTime maximum, nastavením na null lze horní
        /// omezení zrušit.</param>
        /// <param name="resourceCode">Resource kód</param>
        public GDateTimeAttribute(string minimum = DB_MIN_DATE
            , string maximum = DB_MAX_DATE, int resourceCode = DEFAULT_MESSAGE) 
            : base(resourceCode)
        {
            if (string.IsNullOrWhiteSpace(minimum)
                && string.IsNullOrWhiteSpace(maximum)
            ) {
                throw new GException(21000047, 21090025); //RC-EX 21090025 : Alespoň jedna mez časového omezení musí být nastavená.
            }

            Initialize(minimum, maximum);
        }

        /// <summary>
        /// Zjednodušená varianta atributu, chrání proti zadání hodnoty mimo
        /// rozsah SQLDateTime typu a umožňuje uvést vlastní chybovou hlášku.
        /// </summary>
        /// <param name="resourceCode"></param>
        public GDateTimeAttribute(int resourceCode = DEFAULT_MESSAGE)
            : this(DB_MIN_DATE, DB_MAX_DATE, resourceCode)
        {
        }

        private void Initialize(string minimum, string maximum)
        {
            _Minimum = minimum;
            _Maximum = maximum;

            DateTime dateTime;

            if (minimum != null && DateTime.TryParse(minimum, out dateTime)) {
                _MinimumCached = dateTime;
            }

            if (maximum != null) {
                bool isDate = GDateTimeParser.IsDate(maximum);
                if (DateTime.TryParse(maximum, out dateTime)) {
                    _MaximumCached = isDate
                        ? dateTime.AddDays(1).AddSeconds(-1)
                        : dateTime
                        ;
                }
                else _MaximumIsDate = isDate;
            }

            if (Minimum > Maximum) {
                throw new GException(21000039, 21090026); //RC-EX 21090026 : Minimum nesmí být větší než maximum
            }

            var tzOffset = TimeZoneInfo.Local.BaseUtcOffset;
            if (TimeZoneInfo.Local.IsDaylightSavingTime(DateTime.Now)) {
                tzOffset = tzOffset.Add(new TimeSpan(1, 0, 0));
            }

            m_oValidatorArgs.Add("min", minimum);
            m_oValidatorArgs.Add("max", maximum);
            m_oValidatorArgs.Add("tz", tzOffset.TotalMinutes);
        }

        public override bool IsValid(object v)
        {
            if (v == null) return true;

            var gValue = v as GDbType;
            if (gValue != null) {
                v = gValue.DbValue;
                if (v == DBNull.Value) return true;
            }

            var val = v as DateTime?;
            if (val == null) throw new GException(31400003, 21090027); //RC-EX 21090027 : Validační atribut může být aplikován pouze na časové typy.
            var min = Minimum;
            var max = Maximum;

            return (min == null || min <= val)
                && (max == null || max >= val);
        }
    }
}
