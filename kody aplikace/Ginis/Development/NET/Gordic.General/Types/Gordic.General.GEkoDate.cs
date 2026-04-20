//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        GEkoDate.cs                                                       </Name>
//    <Description> datum pro EKO agendy reprezentované v databázi jako øetìzec znakù </Description>
//    <Author>      Martin Aliger, Jan Kuttich                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                             </Copyright>
//    <Created>     2007-03-22                                                        </Created>
//  </FileHeader>

using System;
using System.Data.OleDb;
using System.ComponentModel;
using System.Reflection;
using System.Diagnostics;
using System.Linq;

namespace Gordic.General {
    
    /// <summary>datum pro EKO agendy reprezentované v databázi jako øetìzec znakù</summary>
    [Serializable]
    [TypeConverter(typeof(GEkoDateConverter))]
    public class GEkoDate : GString {

        #region výètové typy

        /// <summary>pøesnost data</summary>
        public enum DatePrecision {
            /// <summary>pøesnost pouze na roky ( odpovídá hodnotì rok )</summary>
            YearToYear = 4,
            /// <summary>pøesnost na roky a mìsíce ( odpovídá hodnotì rok_mes )</summary>
            YearToMonth = 6,
            /// <summary>pøesnost na roky, mìsíce a dny ( odpovídá hodnotì rok_mes_den )</summary>
            YearToDay = 8,
        } // end enum

        #endregion

        #region konstanty

        /// <summary>maximální délka øetìzcového vyjádøení hodnoty</summary>
        private const ushort m_cnMaxSize = 8;

        /// <summary>prázdná hodnota</summary>
        private const string m_csZeroValue = "00000000";

        #endregion

        #region soukromé èleny

        /// <summary>výchozí hodnota</summary>
        private string m_sDefaultValue = String.Empty;

        /// <summary>instance hodnoty null urèená pouze pro ètení</summary>
        private static readonly GEkoDate m_cgedNull = new GEkoDate();

        /// <summary>pøesnost hodnoty datumu</summary>
        private DatePrecision m_ePrecision = DatePrecision.YearToMonth;

        #endregion

        #region konstruktory

        /// <summary>veøejný konstruktor</summary>
        public GEkoDate() : base(m_cnMaxSize) { }

        /// <summary>veøejný konstruktor</summary>
        /// <param name="precision">pøesnost hodnoty datumu</param>
        public GEkoDate(DatePrecision precision) : base(m_cnMaxSize) {
            m_ePrecision = precision;
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="ekoDate">inicializaèní øetìzec v kompatibilním formátu, tj. podle jednoho z následujícíh vzorù '', 'yyyy', 'yyyyMM' nebo 'yyyyMMdd'</param>
        public GEkoDate(string ekoDate) : base(m_cnMaxSize) {
            ValueInstance = CheckValue(ekoDate);
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="ekoDate">inicializaèní øetìzec v kompatibilním formátu, tj. podle jednoho z následujícíh vzorù '', 'yyyy', 'yyyyMM' nebo 'yyyyMMdd'</param>
        /// <param name="precision">pøesnost hodnoty datumu</param>
        public GEkoDate(string ekoDate,DatePrecision precision) : base(m_cnMaxSize) {
            m_ePrecision = precision;
            ValueInstance = CheckValue(ekoDate);
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="ekoDate">inicializaèní øetìzec v kompatibilním formátu, tj. podle jednoho z následujícíh vzorù '', 'yyyy', 'yyyyMM' nebo 'yyyyMMdd'</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        public GEkoDate(string ekoDate,bool isNullable) : base(m_cnMaxSize,isNullable) {
            ValueInstance = CheckValue(ekoDate);
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="ekoDate">inicializaèní øetìzec v kompatibilním formátu, tj. podle jednoho z následujícíh vzorù '', 'yyyy', 'yyyyMM' nebo 'yyyyMMdd'</param>
        /// <param name="precision">pøesnost hodnoty datumu</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        public GEkoDate(string ekoDate,DatePrecision precision,bool isNullable) : base(m_cnMaxSize,isNullable) {
            m_ePrecision = precision;
            ValueInstance = CheckValue(ekoDate);
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="ekoDate">inicializaèní øetìzec v kompatibilním formátu, tj. podle jednoho z následujícíh vzorù '', 'yyyy', 'yyyyMM' nebo 'yyyyMMdd'</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GEkoDate(string ekoDate,string sourceColumn) : this(ekoDate,true,sourceColumn) {
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="ekoDate">inicializaèní øetìzec v kompatibilním formátu, tj. podle jednoho z následujícíh vzorù '', 'yyyy', 'yyyyMM' nebo 'yyyyMMdd'</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GEkoDate(string ekoDate,bool isNullable,string sourceColumn) : base(m_cnMaxSize,isNullable,sourceColumn) {
            ValueInstance = CheckValue(ekoDate);
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="ekoDate">inicializaèní øetìzec v kompatibilním formátu, tj. podle jednoho z následujícíh vzorù '', 'yyyy', 'yyyyMM' nebo 'yyyyMMdd'</param>
        /// <param name="precision">pøesnost hodnoty datumu</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GEkoDate(string ekoDate,DatePrecision precision,bool isNullable,string sourceColumn) : base(m_cnMaxSize,isNullable,sourceColumn) {
            m_ePrecision = precision;
            ValueInstance = CheckValue(ekoDate);
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="year">rok</param>
        public GEkoDate(short year) : base(m_cnMaxSize) {
            m_ePrecision = DatePrecision.YearToYear;
            ValueInstance = GetValueInstance(year,Int16.MinValue,Int16.MinValue);
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="year">rok</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        public GEkoDate(short year,bool isNullable) : base(m_cnMaxSize,isNullable) {
            m_ePrecision = DatePrecision.YearToYear;
            ValueInstance = GetValueInstance(year,Int16.MinValue,Int16.MinValue);
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="year">rok</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GEkoDate(short year,bool isNullable,string sourceColumn) : base(m_cnMaxSize,isNullable,sourceColumn) {
            m_ePrecision = DatePrecision.YearToYear;
            ValueInstance = GetValueInstance(year,Int16.MinValue,Int16.MinValue);
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="year">rok</param>
        /// <param name="month">mìsíc</param>
        public GEkoDate(short year,short month) : base(m_cnMaxSize) {
            m_ePrecision = DatePrecision.YearToMonth;
            ValueInstance = GetValueInstance(year,month,Int16.MinValue);
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="year">rok</param>
        /// <param name="month">mìsíc</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        public GEkoDate(short year,short month,bool isNullable) : base(m_cnMaxSize,isNullable) {
            m_ePrecision = DatePrecision.YearToMonth;
            ValueInstance = GetValueInstance(year,month,Int16.MinValue);
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="year">rok</param>
        /// <param name="month">mìsíc</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GEkoDate(short year,short month,bool isNullable,string sourceColumn) : base(m_cnMaxSize,isNullable,sourceColumn) {
            m_ePrecision = DatePrecision.YearToMonth;
            ValueInstance = GetValueInstance(year,month,Int16.MinValue);
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="year">rok</param>
        /// <param name="month">mìsíc</param>
        /// <param name="day">den</param>
        public GEkoDate(short year,short month,short day) : base(m_cnMaxSize) {
            m_ePrecision = DatePrecision.YearToDay;
            ValueInstance = GetValueInstance(year,month,day);
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="year">rok</param>
        /// <param name="month">mìsíc</param>
        /// <param name="day">den</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        public GEkoDate(short year,short month,short day,bool isNullable) : base(m_cnMaxSize,isNullable) {
            m_ePrecision = DatePrecision.YearToDay;
            ValueInstance = GetValueInstance(year,month,day);
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="year">rok</param>
        /// <param name="month">mìsíc</param>
        /// <param name="day">den</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GEkoDate(short year,short month,short day,bool isNullable,string sourceColumn) : base(m_cnMaxSize,isNullable,sourceColumn) {
            m_ePrecision = DatePrecision.YearToDay;
            ValueInstance = GetValueInstance(year,month,day);
        } // end method

        /// <summary>veøejný kopírovací konstruktor</summary>
        /// <param name="source">zdrojová instance</param>
        /// <param name="copyOptions">vhrazeno pro budoucí použití</param>
        public GEkoDate(GEkoDate source,GDbTypeCopyOptions copyOptions) : base(source as GString,copyOptions) {
            m_ePrecision = source.m_ePrecision;
            m_sDefaultValue = source.m_sDefaultValue;
        } // end method

        /// <summary>soukromý konstruktor</summary>
        /// <param name="readOnly">pøíznak hodnoty urèené pouze pro ètení</param>
        private GEkoDate(bool readOnly) : base(m_cnMaxSize) {
            if(readOnly) SetReadOnly();
        } // end method

        #endregion

        #region vlastnosti

        /// <summary>hodnota typu øetìzec s ohledem na hodnotu null</summary>
        public override string Value {
            get {
                if(IsNull) throw new GException(23200125,23200003,ThisAssembly); // pokus o pøístup k hodnotì null
                return (string)ValueInstance;
            } // end method
            set {
                ValueInstance = CheckValue(value);
            } // end method
        } // end property

        /// <summary>výchozí hodnota</summary>
        public override string DefaultValue {
            get { return m_sDefaultValue; }
            set {
                if(IsReadOnly) throw new GException(23200126,23200084,ThisAssembly); // hodnota je urèena pouze ke ètení
                m_sDefaultValue = CheckValue(value);
            } // end method
        } // end property

        /// <summary>instance hodnoty null urèená pouze pro ètení</summary>
        public new static GEkoDate Null {
            get { return m_cgedNull; }
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(GEkoDate).Assembly; }
        } // end property

        /// <summary>den</summary>
        public short Day {
            get {
                if(IsNull || Value.Length<8) return 0;
                else return Int16.Parse(Value.Substring(6,2));
            } // end method
        } // end property

        /// <summary>mìsíc</summary>
        public short Month {
            get {
                if(IsNull || Value.Length<6) return 0;
                else return Int16.Parse(Value.Substring(4,2));
            } // end method
        } // end property

        /// <summary>rok</summary>
        public short Year {
            get {
                if(IsNull || Value.Length<4) return 0;
                else return Int16.Parse(Value.Substring(0,4));
            } // end method
        } // end property

        /// <summary>den jako GInt16</summary>
        public GInt16 GDay {
            get {
                if(IsNull) return new GInt16();
                else return new GInt16(Day);
            } // end method
        } // end property

        /// <summary>mìsíc jako GInt16</summary>
        public GInt16 GMonth {
            get {
                if(IsNull) return new GInt16();
                else return new GInt16(Month);
            } // end method
        } // end property

        /// <summary>rok jako GInt16</summary>
        public GInt16 GYear {
            get {
                if(IsNull) return new GInt16();
                else return new GInt16(Year);
            } // end method
        } // end property

        /// <summary>pøesnost hodnoty datumu</summary>
        public DatePrecision Precision {
            get {return m_ePrecision;}
            set {
                m_ePrecision = value;
                DbValue = CheckValue(DbValue as string);
            } // end method
        } // end property

        #endregion

        #region pøetížené metody

        /// <summary>získání výchozí hodnoty</summary>
        /// <returns>výchozí hodnota typu datum</returns>
        protected override object GetDefaultValue() {
            return DefaultValue;
        } // end method

        /// <summary>konverze vstupní hodnoty</summary>
        /// <param name="sourceValue">vstupní hodnota</param>
        /// <returns>hodnota typu datum</returns>
        protected override object ConvertValue(object sourceValue) {
            if(sourceValue.GetType() != typeof(String)) throw new GException(23200127,23200004,ThisAssembly); // pokus o nepodporovanou konverzi typù
            return CheckValue(sourceValue.ToString());
        } // end method

        /// <summary>porovnání dvou hodnot s ohledem na typ</summary>
        /// <param name="valueOne">první hodnota</param>
        /// <param name="valueTwo">druhá hodnota</param>
        /// <returns>true pokud se hodnoty shodují, jinak false</returns>
        protected override bool CompareValues(object valueOne,object valueTwo) {
            return String.Compare((string) valueOne,(string) valueTwo) == 0;
        } // end method

        /// <summary>vytvoøení identické kopie objektu</summary>
        /// <returns>nová instance objektu</returns>
        /// <remarks>pøíznak hodnoty urèené pouze ke ètení je u novì vzniklé instance vždy negativní</remarks>
        public override object Clone() {
            return new GEkoDate(this,null);
        } // end method

        /// <summary>nastavení hodnoty s pøípadnou pøedchozí typovou konverzí</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        public override void ParseValue(object inputValue) {
            GEkoDate l_gedValue = GEkoDate.Parse(inputValue,true);
            ValueInstance = l_gedValue.IsNull ? null : l_gedValue.DbValue;
        } // end method

        /// <summary>porovnání hodnoty se vstupní hodnotou stejného typu</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>hodnota menší než nula pokud aktuální hodnota je v rámci tøídìní pøed vstupní hodnotou, hodnota nula pokud je na stejné pozici nebo hodnota vìtší než nula pokud je za vstupní hodnotou</returns>
        public override int CompareTo(object inputValue) {
            if(inputValue == null) return 1;
            GEkoDate l_gbInputValue = inputValue as GEkoDate;
            if(l_gbInputValue == null) throw new GArgumentException(23200419);
            if(this == l_gbInputValue) return 0;
            else return this < l_gbInputValue ? -1 : 1;
        } // end method

        #endregion

        #region pøetížené operátory

        /// <summary>vrací kontrolní souèet instance objektu</summary>
        /// <returns>kontrolní souèet instance objektu</returns>
        public override int GetHashCode() {
            return BaseValue.GetHashCode();
        } // end method

        /// <summary>porovnání hodnoty s jiným objektem</summary>
        /// <param name="inputObject">instance pro porovnání</param>
        /// <returns>true pokud jsou objekty stejného typu a jejich hodnoty jsou shodné, jinak false</returns>
        public override bool Equals(object inputObject) {
            GEkoDate l_gedInputObject = inputObject as GEkoDate;
            return l_gedInputObject!=null && l_gedInputObject==this;
        } // end method

        /// <summary>operátor porovnání</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì shody hodnot, jinak false</returns>
        public static bool operator==(GEkoDate a,GEkoDate b) {
            if((object)a == null) {
                if((object)b == null) return true;
                else return false;
            } else if((object)b == null) return false;
            if(a.IsNull) {
                if(b.IsNull) return true;
                else return false;
            } else if(b.IsNull) return false;
            return a.Value == b.Value;
        } // end method

        /// <summary>operátor nerovnosti</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì neshody hodnot, jinak false</returns>
        public static bool operator!=(GEkoDate a,GEkoDate b) {
            return (a == b) == false;
        } // end method

        /// <summary> konverze z GDate</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>konvertovaná hodnota</returns>
        public static implicit operator GEkoDate(GDate inputValue) {
            if(inputValue==null || inputValue.IsNull) return new GEkoDate();
            return new GEkoDate((short)inputValue.Value.Year,(short)inputValue.Value.Month,(short)inputValue.Value.Day);
        } // end method

        /// <summary>implicitní konverze z DateTime</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>konvertovaná hodnota</returns>
        public static implicit operator GEkoDate(DateTime inputValue) {
            return new GEkoDate((short)inputValue.Year,(short)inputValue.Month,(short)inputValue.Day);
        } // end method

        /// <summary>implicitní konverze z DateTime ? na GEkoDate</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GEkoDate</returns>
        public static implicit operator GEkoDate(DateTime ? a) {
            return a == null ? new GEkoDate() : (GEkoDate)((DateTime) a);
        } // end method	
        
        /// <summary>operátor vìtší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je vìtší než hodnota pravého, jinak false</returns>
        public static bool operator>(GEkoDate a,GEkoDate b) {
            if(a == b) return false;
            else {
                if((object)a == null || (object)b == null) throw new GArgumentNullException(23200333);
                if(a.IsNull || b.IsNull) throw new GException(23200334,23200003,ThisAssembly); // pokus o pøístup k hodnotì null
                return String.Compare(a.Value,b.Value) > 0;
            } // end if
        } // end method

        /// <summary>operátor menší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je menší než hodnota pravého, jinak false</returns>
        public static bool operator<(GEkoDate a,GEkoDate b) {
            if(a == b) return false;
            else {
                if((object)a == null || (object)b == null) throw new GArgumentNullException(23200335);
                if(a.IsNull || b.IsNull) throw new GException(23200336,23200003,ThisAssembly); // pokus o pøístup k hodnotì null
                return String.Compare(a.Value,b.Value) < 0;
            } // end if
        } // end method

        /// <summary>operátor vìtší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je vìtší nebo rovná hodnotì pravého, jinak false</returns>
        public static bool operator>=(GEkoDate a,GEkoDate b) {
            if(a == b) return true;
            else return a > b;
        } // end method

        /// <summary>operátor menší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je menší nebo rovná hodnotì pravého, jinak false</returns>
        public static bool operator<=(GEkoDate a,GEkoDate b) {
            if(a == b) return true;
            else return a < b;
        } // end method

        #endregion

        #region statická metoda Parse

        /// <summary>obecná typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>výstupní hodnota</returns>
        public new static GEkoDate Parse(object inputValue) {
            return Parse(inputValue,false);
        } // end method

        /// <summary>obecná typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="acceptNull">pøíznak pøípustnosti hodnoty null, nepromítá se do hodnoty vlastnosti IsNullable</param>
        /// <returns>výstupní hodnota</returns>
        public new static GEkoDate Parse(object inputValue,bool acceptNull) {
            GEkoDate l_gedEkoDate = null;
            if(inputValue == null) {
                if(acceptNull) l_gedEkoDate = new GEkoDate();
                else throw new GArgumentNullException(23200133); // neinicializovaná hodnota parametru
            } else if(inputValue is GInt16 || inputValue is GInt32 || inputValue is GInt64 || inputValue is GDecimal) {
                throw new GInvalidCastException(23200134); // pokus o nepovolenou typovou konverzi
            } else if(inputValue == DBNull.Value || (inputValue is IGDbType && ((IGDbType)inputValue).IsNull)) {
                l_gedEkoDate = new GEkoDate();
            } else if(inputValue is GDate) {
                DateTime l_dtDate = ((GDate)inputValue).Value;
                l_gedEkoDate = new GEkoDate((short)l_dtDate.Year,(short)l_dtDate.Month,(short)l_dtDate.Day);
            } else if(inputValue is GDateTime) {
                DateTime l_dtDateTime = ((GDateTime)inputValue).Value;
                l_gedEkoDate = new GEkoDate((short)l_dtDateTime.Year,(short)l_dtDateTime.Month,(short)l_dtDateTime.Day);
            } else if(inputValue is DateTime) {
                l_gedEkoDate = new GEkoDate((short)((DateTime)inputValue).Year,(short)((DateTime)inputValue).Month,(short)((DateTime)inputValue).Day);
            } else {
                l_gedEkoDate = new GEkoDate(inputValue.ToString());
            } // end if
            return l_gedEkoDate;
        } // end method

        #endregion

        #region pøetížená metoda ToString

        /// <summary>pøevod hodnoty na text</summary>
        /// <returns>textová reprezentace hodnoty</returns>
        public override string ToString() {
            return BaseValue.ToString();
        } // end method

        /// <summary>pøevod hodnoty na text</summary>
        /// <returns>textová reprezentace hodnoty</returns>
        public string ToString(string format)
        {
            if (format == "G")
            {
                switch(Precision)
                {
                    case DatePrecision.YearToYear:
                        return Year.ToString("0000");
                    case DatePrecision.YearToMonth:
                        return Month.ToString("00") + '/' + Year.ToString("0000");
                    case DatePrecision.YearToDay:
                        return new DateTime(Year, Month, Day).ToString("d");
                }
            }
            return BaseValue.ToString();
        } // end method

        /// <summary>pøevod hodnoty na text</summary>
        /// <param name="formatProvider">hodnota typu <see cref="IFormatProvider"/> s informacemi o požadovaném formátu</param>
        /// <returns>textová reprezentace hodnoty</returns>
        public override string ToString(IFormatProvider formatProvider) {
            return BaseValue.ToString(formatProvider);
        } // end method

        /// <summary>pøevod hodnoty na text</summary>
        /// <param name="involveNull">pøíznak zahrnutí hodnoty null</param>
        /// <returns>textová reprezentace hodnoty</returns>
        public override string ToString(bool involveNull) {
            return (involveNull && IsNull) ? NullString : BaseValue.ToString();
        } // end method

        #endregion

        #region soukromé metody

        /// <summary>kontrola pøípustnosti vstupní hodnoty</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>vstupní hodnota ve validní formì</returns>
        private string CheckValue(string inputValue) {
            if(inputValue!=null && (inputValue=inputValue.Trim())!=String.Empty) {
                if(inputValue.Length!=4 && inputValue.Length!=6 && inputValue.Length!=8) throw new GException(23200128,ThisAssembly); // nesprávná délka vstupního øetìzce
                // kontrola zda øetìzec obsahuje pouze èíslice
                for(int i=0; i<inputValue.Length; i++) {
                    if(Char.IsDigit(inputValue[i]) == false) throw new GException(23200129,ThisAssembly); // nesprávný formát vstupního øetìzce
                } // end for
            } // end if
            return ApplyPrecision(inputValue);
        } // end method

        /// <summary>konstrukce øetìzce ve formì pøípustné hodnoty</summary>
        /// <param name="year">rok</param>
        /// <param name="month">mìsíc</param>
        /// <param name="day">den</param>
        /// <returns>vstupní hodnota ve validní formì</returns>
        private string GetValueInstance(short year,short month,short day) {
            string l_sValueInstance = String.Empty;
            if(year>-1 && year<=9999) {
                l_sValueInstance = year.ToString("0000");
                if(month != Int16.MinValue) {
                    if(month>-1 && month<=99) {
                        l_sValueInstance += month.ToString("00");
                        if(day != Int16.MinValue) {
                            if(day>-1 && day<=99) {
                                l_sValueInstance += day.ToString("00");
                            } else throw new GArgumentOutOfRangeException(23200130); // hodnota parametru je mimo povolený rozsah
                        } // end if
                    } else throw new GArgumentOutOfRangeException(23200131); // hodnota parametru je mimo povolený rozsah
                } // end if
            } else throw new GArgumentOutOfRangeException(23200132); // hodnota parametru je mimo povolený rozsah
            return ApplyPrecision(l_sValueInstance);
        } // end method

        /// <summary>získání hodnoty s ohledem na pøedepsanou pøesnost</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>hodnota s ohledem na pøedepsanou pøesnost</returns>
        private string ApplyPrecision(string inputValue) {
            if(inputValue!=null && inputValue!=String.Empty) {
                if(inputValue.Length > (int)m_ePrecision) inputValue = inputValue.Substring(0,(int)m_ePrecision);
                else if(inputValue.Length < (int)m_ePrecision) inputValue = inputValue + m_csZeroValue.Substring(0,(int)m_ePrecision - inputValue.Length);
            } // end if
            return inputValue;
        } // end method

        #endregion

        #region veøejné metody

        /// <summary>zjištìní zda se hodnota nachází v pøedaném výètu hodnot</summary>
        /// <param name="items">výèet hodnot</param>
        /// <returns>true v pøípadì, že se hodnota nachází v pøedaném výètu hodnot, jinak false</returns>
        public bool In(params GEkoDate[] items) {
            if(items == null) return false;
            else if(IsNull) return items.Where(item => item.IsNull).Any();
            else return items.Where(item => item.BaseValue == BaseValue).Any();
        } // end method

        #endregion

        #region veøejné statické metody

        /// <summary>vrací instanci s vìtší hodnotou</summary>
        /// <param name="first">první instance</param>
        /// <param name="second">druhá instance</param>
        /// <returns>instance s vìtší hodnotou</returns>
        public static GEkoDate Max(GEkoDate first,GEkoDate second) {
            return (first > second) ? first : second;
        } // end method

        /// <summary>vrací instanci s menší hodnotou</summary>
        /// <param name="first">první instance</param>
        /// <param name="second">druhá instance</param>
        /// <returns>instance s menší hodnotou</returns>
        public static GEkoDate Min(GEkoDate first,GEkoDate second) {
            return (first < second) ? first : second;
        } // end method

        #endregion

    } // end class

} // end namespace
