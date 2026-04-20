//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>          Gordic.General.GDateTime.cs                 </Name>
//    <Description>   databázová hodnota hodnota typu datum a èas </Description>
//    <Author>        Jan Kuttich                                 </Author>
//    <Copyright>     © GORDIC spol. s r. o. 1993 - 2021          </Copyright>
//    <Created>       2003-08-26                                  </Created>
//  </FileHeader>

using System;
using System.Data.OleDb;
using System.ComponentModel;
using System.Globalization;
using System.Reflection;
using System.Diagnostics;
using System.Linq;

namespace Gordic.General {

    /// <summary>databázová hodnota typu datum a èas</summary>
    [Serializable]
	[TypeConverter(typeof(GDateTimeConverter))]
	public class GDateTime : GDbType, IGDbTypeDateTime
    {

    #region soukromé konstanty

        /// <summary>defaultní formátovací øetìzec</summary>
        private const string m_csDefaultFormat = "yyyy-MM-dd HH:mm:ss.fff";

        /// <summary>formátovací øetìzec pro datum a èas s pøesností na celé sekudy</summary>
        private const string m_csFormatWithoutFraction = "yyyy-MM-dd HH:mm:ss";

        /// <summary>formátovací øetìzec pro datum a èas pro použití v XML</summary>
        private const string m_csXmlFormat = "yyyy-MM-ddTHH:mm:ss";

        /// <summary>èasová zóna databázového serveru</summary>
        private static readonly TimeZoneInfo m_coDatabaseTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Central Europe Standard Time");

    #endregion

    #region soukromé èleny

        /// <summary>výchozí hodnota</summary>
        private DateTimeOffset m_dtDefaultValue = DateTimeOffset.MinValue;

        /// <summary>
        /// Pøíznak, že tato instance GDate reprezentuje databázovou hodnotu current 
        /// Pøi ètení z .NET se tváøí, jako že má hodnotu Null
        /// Pøi ukládání do databáze GDatabase zajistí náhradu na odpovídající symbol pro current
        /// Nastavuje se pouze v rámci konstruktoru potomka typu GDateCurrent
        /// </summary>
        protected bool m_bIsCurrent = false;

        /// <summary>instance hodnoty null urèená pouze pro ètení</summary>
        private static readonly GDateTime m_cgdtNull = new GDateTime(true);

        /// <summary>instance pøedplnìná na minimální hodnotu urèená pouze pro ètení</summary>
        private static readonly GDateTime m_cgdtMinValue = new GDateTime(true,new DateTime(1900,1,1,0,0,0));

        /// <summary>instance pøedplnìná na maximální hodnotu urèená pouze pro ètení</summary>
        private static readonly GDateTime m_cgdtMaxValue = new GDateTime(true,new DateTime(2999,12,31,23,59,59));

    #endregion

    #region konstruktory

        /// <summary>veøejný konstruktor</summary>
        public GDateTime() : base(true) {}

        /// <summary>veøejný konstruktor</summary>
        /// <param name="dateTimeOffset">inicializaèní hodnota typu datum a èas</param>
        public GDateTime(DateTimeOffset dateTimeOffset) : this(dateTimeOffset,true) {
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="dateTime">inicializaèní hodnota typu datum a èas</param>
        public GDateTime(DateTime dateTime) : this(dateTime,true) {
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="dateTimeOffset">inicializaèní hodnota typu datum a èas</param>
        public GDateTime(DateTimeOffset ? dateTimeOffset) : base(true) {
            if(dateTimeOffset != null) ValueInstance = ((DateTimeOffset) dateTimeOffset).ToLocalTime();
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="dateTime">inicializaèní hodnota typu datum a èas</param>
        public GDateTime(DateTime ? dateTime) : base(true) {
            if(dateTime != null) ValueInstance = GetDateTimeOffset((DateTime) dateTime);
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="dateTimeOffset">inicializaèní hodnota typu datum a èas</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        public GDateTime(DateTimeOffset dateTimeOffset,bool isNullable) : base(isNullable) {
            ValueInstance = dateTimeOffset.ToLocalTime();
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="dateTime">inicializaèní hodnota typu datum a èas</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        public GDateTime(DateTime dateTime,bool isNullable) : base(isNullable) {
            ValueInstance = GetDateTimeOffset(dateTime); 
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="dateTimeOffset">inicializaèní hodnota typu datum a èas</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GDateTime(DateTimeOffset dateTimeOffset,string sourceColumn) : this(dateTimeOffset,true,sourceColumn) {
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="dateTime">inicializaèní hodnota typu datum a èas</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GDateTime(DateTime dateTime,string sourceColumn) : this(dateTime,true,sourceColumn) {
        } // end method
        
        /// <summary>veøejný konstruktor</summary>
        /// <param name="dateTimeOffset">inicializaèní hodnota typu datum a èas</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GDateTime(DateTimeOffset dateTimeOffset,bool isNullable,string sourceColumn) : this(dateTimeOffset,isNullable) {
            SourceColumn = sourceColumn;
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="dateTime">inicializaèní hodnota typu datum a èas</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GDateTime(DateTime dateTime,bool isNullable,string sourceColumn) : this(dateTime,isNullable) {
            SourceColumn = sourceColumn;
        } // end method

        /// <summary>veøejný kopírovací konstruktor</summary>
        /// <param name="source">zdrojová instance</param>
        /// <param name="copyOptions">vhrazeno pro budoucí použití</param>
        public GDateTime(GDateTime source,GDbTypeCopyOptions copyOptions) : base(source as GDbType) {
            m_dtDefaultValue = source.m_dtDefaultValue;
        } // end method

        /// <summary>soukromý konstruktor</summary>
        /// <param name="readOnly">pøíznak hodnoty urèené pouze pro ètení</param>
        private GDateTime(bool readOnly) : base(true) {
            if(readOnly) SetReadOnly();
        } // end method

        /// <summary>soukromý konstruktor</summary>
        /// <param name="readOnly">pøíznak hodnoty urèené pouze pro ètení</param>
        /// <param name="dateTimeOffset">inicializaèní hodnota typu datum a èas</param>
        private GDateTime(bool readOnly,DateTimeOffset dateTimeOffset) : this(dateTimeOffset,true) {
            if(readOnly) SetReadOnly();
        } // end method

        /// <summary>soukromý konstruktor</summary>
        /// <param name="readOnly">pøíznak hodnoty urèené pouze pro ètení</param>
        /// <param name="dateTime">inicializaèní hodnota typu datum a èas</param>
        private GDateTime(bool readOnly,DateTime dateTime) : this(dateTime,true) {
            if(readOnly) SetReadOnly();
        } // end method

    #endregion

    #region vlastnosti

        /// <summary>hodnota typu datum a èas s ohledem na hodnotu null</summary>
        public DateTime Value {
            get { return OffsetValue.DateTime; }
            set { OffsetValue = GetDateTimeOffset(value); }
        } // end property

        /// <summary>hodnota typu datum a èas s údajem o èasovém posuvu s ohledem na hodnotu null</summary>
        public DateTimeOffset OffsetValue {
            get {
                if(IsNull) throw new GException(23200558,23200003,ThisAssembly); // pokus o pøístup k hodnotì null
                return ((DateTimeOffset) ValueInstance);
            } // end method
            set { ValueInstance = value.ToLocalTime(); }
        } // end property

        /// <summary>výchozí hodnota typu datum a èas</summary>
        public DateTime DefaultValue {
            get { return DefaultOffsetValue.DateTime; }
            set { DefaultOffsetValue = GetDateTimeOffset(value); }
        } // end property

        /// <summary>
        /// Pøíznak, že tato G hodnota reprezentuje databázový current
        /// Tato varianta je použitelná pouze pro ukládání do databáze.
        /// Z .NET se bude chovat jako by byla nastavena na null.
        /// Nastavení tohoto pøíznaku je možné v rámci konstruktoru podìdìné tøídy GDateCurrent
        /// </summary>
        public bool IsCurrent
        {
            get
            {
                return (this.m_bIsCurrent);
            }
            set
            {
                this.m_bIsCurrent = value;
                this.IsNull = true;
                SetReadOnly();
            }
        }

        /// <summary>výchozí hodnota typu datum a èas s údajem o èasovém posuvu</summary>
        public DateTimeOffset DefaultOffsetValue {
            get { return m_dtDefaultValue; }
            set {
                if(IsReadOnly) throw new GException(23200565,23200084,ThisAssembly); // hodnota je urèena pouze ke ètení
                m_dtDefaultValue = value.ToLocalTime();
            } // end method
        } // end property

        /// <summary>hodnota typu datum a èas bez ohledu na hodnotu null</summary>
        public DateTime BaseValue {
            get { return BaseOffsetValue.DateTime; }
        } // end property

        /// <summary>hodnota typu datum a èas s údajem o èasovém posuvu bez ohledu na hodnotu null</summary>
        public DateTimeOffset BaseOffsetValue {
            get { return IsNull ? DefaultOffsetValue : (DateTimeOffset) ValueInstance; }
        } // end property

        /// <summary>hodnota typu datum a èas v èasové zónì databáze</summary>
        public object DbZoneValue {
            get {
                if(IsNull) return DBNull.Value;
                else return OffsetValue.ToOffset(m_coDatabaseTimeZone.GetUtcOffset(OffsetValue)).DateTime;
            } // end method
            set {
                if(value == null || value.GetType() == typeof(DBNull)) ValueInstance = null;
                else if(value.GetType() == typeof(DateTime)) ValueInstance = (new DateTimeOffset((DateTime) value,m_coDatabaseTimeZone.GetUtcOffset((DateTime) value))).ToLocalTime();
                else throw new GException(23200557,23200004,ThisAssembly); // pokus o nepodporovanou konverzi typù
            } // end method
        } // end property

        /// <summary>instance hodnoty null urèená pouze pro ètení</summary>
        public static GDateTime Null {
            get {return m_cgdtNull;}
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(GDateTime).Assembly;}
        } // end property

        /// <summary>defaultní formátovací øetìzec</summary>
        public static string DefaultFormat {
            get { return m_csDefaultFormat; }
        } // end property

        /// <summary>formátovací øetìzec pro datum a èas s pøesností na celé sekudy</summary>
        public static string FormatWithoutFraction {
            get { return m_csFormatWithoutFraction; }
        } // end property

        /// <summary>defaultní formátovací øetìzec pro zobrazení uživateli</summary>
        public static string DefaultDisplayFormat {
            get {
                return GResources.GetResourceText(ThisAssembly,23230189); // dd.MM.yyyy HH:mm:ss
            } // end method
        } // end property

        /// <summary>formátovací øetìzec pro datum a èas pro použití v XML</summary>
        public static string XmlFormat {
            get { return m_csXmlFormat; }
        } // end property

        /// <summary>instance pøedplnìná na minimální hodnotu urèená pouze pro ètení</summary>
        public static GDateTime MinValue {
            get { return m_cgdtMinValue; }
        } // end property

        /// <summary>instance pøedplnìná na maximální hodnotu urèená pouze pro ètení</summary>
        public static GDateTime MaxValue {
            get { return m_cgdtMaxValue; }
        } // end property

        /// <summary>den</summary>
        public short Day {
            get { return (short)(IsNull ? 0 : OffsetValue.Day); }
        } // end property

        /// <summary>mìsíc</summary>
        public short Month {
            get { return (short)(IsNull ? 0 : OffsetValue.Month); }
        } // end property

        /// <summary>rok</summary>
        public short Year {
            get { return (short)(IsNull ? 0 : OffsetValue.Year); }
        } // end property

        /// <summary>hodina</summary>
        public short Hour {
            get { return (short)(IsNull ? 0 : OffsetValue.Hour); }
        } // end property

        /// <summary>minuta</summary>
        public short Minute {
            get { return (short)(IsNull ? 0 : OffsetValue.Minute); }
        } // end property

        /// <summary>sekunda</summary>
        public short Second {
            get { return (short)(IsNull ? 0 : OffsetValue.Second); }
        } // end property

        /// <summary>milisekunda</summary>
        public short Millisecond {
            get { return (short)(IsNull ? 0 : OffsetValue.Millisecond); }
        } // end property

        /// <summary>den jako GInt16</summary>
        public GInt16 GDay {
            get { return IsNull ? new GInt16() : new GInt16(Day); }
        } // end property

        /// <summary>mìsíc jako GInt16</summary>
        public GInt16 GMonth {
            get { return IsNull ? new GInt16() : new GInt16(Month); }
        } // end property

        /// <summary>rok jako GInt16</summary>
        public GInt16 GYear {
            get { return IsNull ? new GInt16() : new GInt16(Year); }
        } // end property

        /// <summary>hodina jako GInt16</summary>
        public GInt16 GHour {
            get { return IsNull ? new GInt16() : new GInt16(Hour); }
        } // end property

        /// <summary>minuta jako GInt16</summary>
        public GInt16 GMinute {
            get { return IsNull ? new GInt16() : new GInt16(Minute); }
        } // end property

        /// <summary>sekunda jako GInt16</summary>
        public GInt16 GSecond {
            get { return IsNull ? new GInt16() : new GInt16(Second); }
        } // end property

        /// <summary>milisekunda jako GInt16</summary>
        public GInt16 GMillisecond {
            get { return IsNull ? new GInt16() : new GInt16(Millisecond); }
        } // end property

        /// <summary>
        /// Hodnota je validní pro ukládání do databáze.
        /// Tedy je NULL nebo je vìtší/rovno rok 1753 - to je nejmenší pøípustná hodnota pro ukládání datumù do DB stroje Microsoft - ten má tuto hranici nejvyšší
        /// </summary>
        public bool IsDbValid
        {
            get { return IsNull ? true : Year >= 1753; }
        }

    #endregion

    #region pøetížené metody

        /// <summary>získání výchozí hodnoty</summary>
        /// <returns>výchozí hodnota typu datum a èas</returns>
        protected override object GetDefaultValue() {
            return DefaultValue;
        } // end method

        /// <summary>konverze vstupní hodnoty</summary>
        /// <param name="sourceValue">vstupní hodnota</param>
        /// <returns>hodnota typu datum a èas</returns>
        protected override object ConvertValue(object sourceValue) {
            Type l_oType = sourceValue.GetType();
            if(l_oType == typeof(DateTimeOffset)) return ((DateTimeOffset) sourceValue).ToLocalTime();
            else if(l_oType == typeof(DateTime)) return GetDateTimeOffset((DateTime) sourceValue);
            else throw new GException(23200559,23200004,ThisAssembly); // pokus o nepodporovanou konverzi typù
        } // end method

        /// <summary>porovnání dvou hodnot s ohledem na typ</summary>
        /// <param name="valueOne">první hodnota</param>
        /// <param name="valueTwo">druhá hodnota</param>
        /// <returns>true pokud se hodnoty shodují, jinak false</returns>
        protected override bool CompareValues(object valueOne,object valueTwo) {
            return (DateTimeOffset) valueOne == (DateTimeOffset) valueTwo;
        } // end method

        /// <summary>vytvoøení identické kopie objektu</summary>
        /// <returns>nová instance objektu</returns>
        /// <remarks>pøíznak hodnoty urèené pouze ke ètení je u novì vzniklé instance vždy negativní</remarks>
        public override object Clone() {
            return new GDateTime(this,null);
        } // end method

        /// <summary>nastavení hodnoty s pøípadnou pøedchozí typovou konverzí</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        public override void ParseValue(object inputValue) {
            GDateTime l_gdtValue = GDateTime.Parse(inputValue,true);
            ValueInstance = l_gdtValue.IsNull ? null : (object) l_gdtValue.OffsetValue;
        } // end method

        /// <summary>porovnání hodnoty se vstupní hodnotou stejného typu</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>hodnota menší než nula pokud aktuální hodnota je v rámci tøídìní pøed vstupní hodnotou, hodnota nula pokud je na stejné pozici nebo hodnota vìtší než nula pokud je za vstupní hodnotou</returns>
        public override int CompareTo(object inputValue) {
            if(inputValue == null) return 1;
            GDateTime l_gbInputValue = inputValue as GDateTime;
            if(l_gbInputValue == null) throw new GArgumentException(23200570);
            if(this == l_gbInputValue) return 0;
            else return this < l_gbInputValue ? -1 : 1;
        } // end method

    #endregion

    #region pøetížené operátory

        /// <summary>vrací kontrolní souèet instance objektu</summary>
        /// <returns>kontrolní souèet instance objektu</returns>
        public override int GetHashCode() {
            return BaseOffsetValue.GetHashCode();
        } // end method

        /// <summary>porovnání hodnoty s jiným objektem</summary>
        /// <param name="inputObject">instance pro porovnání</param>
        /// <returns>true pokud jsou objekty stejného typu a jejich hodnoty jsou shodné, jinak false</returns>
        public override bool Equals(object inputObject) {
            GDateTime l_gdtInputObject = inputObject as GDateTime;
            return l_gdtInputObject!=null && l_gdtInputObject==this;
        } // end method

        /// <summary>operátor porovnání</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì shody hodnot, jinak false</returns>
		public static bool operator == (GDateTime a, GDateTime b) {
            if(a == (object) null) {
                if(b == (object) null) return true;
                else return false;
            } else if((object) b == null) return false;
            if(a.IsNull) {
                if(b.IsNull) return true;
                else return false;
            } else if(b.IsNull) return false;
            return a.OffsetValue == b.OffsetValue;
        } // end method

        /// <summary>operátor nerovnosti</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì neshody hodnot, jinak false</returns>
		public static bool operator != (GDateTime a, GDateTime b) {
            return (a == b) == false;
        } // end method

		/// <summary>implicitní konverze na <see cref="DateTimeOffset"/></summary>
		/// <param name="a">konvertovaná hodnota</param>
		/// <returns>hodnota typu DateTimeOffset</returns>
		public static implicit operator DateTimeOffset(GDateTime a) {
			return a.OffsetValue;
		} // end method

		/// <summary>implicitní konverze z <see cref="DateTimeOffset"/></summary>
		/// <param name="a">konvertovaná hodnota</param>
		/// <returns>hodnota typu GDateTime</returns>
		public static implicit operator GDateTime(DateTimeOffset a) {
			return new GDateTime(a);
		} // end method

        /// <summary>implicitní konverze na <see cref="DateTime"/></summary>
		/// <param name="a">konvertovaná hodnota</param>
		/// <returns>hodnota typu DateTimeOffset</returns>
		public static implicit operator DateTime(GDateTime a) {
            if(a == null) throw new GArgumentNullException(23200571);
            return a.OffsetValue.DateTime;
        } // end method

        /// <summary>implicitní konverze z <see cref="DateTime"/></summary>
		/// <param name="a">konvertovaná hodnota</param>
		/// <returns>hodnota typu GDateTime</returns>
		public static implicit operator GDateTime(DateTime a) {
            return new GDateTime(a);
        } // end method

        /// <summary>implicitní konverze z GDateTime na DateTimeOffset ?</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu DateTimeOffset ?</returns>
        public static implicit operator DateTimeOffset ? (GDateTime a) {
            return a == null || a.IsNull ? null : (DateTimeOffset ?) a.OffsetValue;
        } // end method

        /// <summary>implicitní konverze z DateTimeOffset ? na GDateTime</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GDateTime</returns>
        public static implicit operator GDateTime(DateTimeOffset ? a) {
            return a == null ? new GDateTime() : new GDateTime((DateTimeOffset) a);
        } // end method

        /// <summary>implicitní konverze z GDateTime na DateTime ?</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu DateTimeOffset ?</returns>
        public static implicit operator DateTime ? (GDateTime a) {
            return a == null || a.IsNull ? null : (DateTime ?) a.Value;
        } // end method

        /// <summary>implicitní konverze z DateTime ? na GDateTime</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GDateTime</returns>
        public static implicit operator GDateTime(DateTime ? a) {
            return a == null ? new GDateTime() : new GDateTime((DateTime) a);
        } // end method	

        /// <summary>operátor vìtší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je vìtší než hodnota pravého, jinak false</returns>
        public static bool operator > (GDateTime a,GDateTime b) {
            if(a == b) return false;
            else {
                if(a == (object) null || b == (object) null) throw new GArgumentNullException(23200566);
                if(a.IsNull || b.IsNull) throw new GException(23200567,23200003,ThisAssembly); // pokus o pøístup k hodnotì null
                return a.OffsetValue > b.OffsetValue;
            } // end if
        } // end method

        /// <summary>operátor menší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je menší než hodnota pravého, jinak false</returns>
        public static bool operator < (GDateTime a,GDateTime b) {
            if(a == b) return false;
            else {
                if(a == (object) null || b == (object) null) throw new GArgumentNullException(23200568);
                if(a.IsNull || b.IsNull) throw new GException(23200569,23200003,ThisAssembly); // pokus o pøístup k hodnotì null
                return a.OffsetValue < b.OffsetValue;
            } // end if
        } // end method

        /// <summary>operátor vìtší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je vìtší nebo rovná hodnotì pravého, jinak false</returns>
        public static bool operator >= (GDateTime a,GDateTime b) {
            if(a == b) return true;
            else return a > b;
        } // end method

        /// <summary>operátor menší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je menší nebo rovná hodnotì pravého, jinak false</returns>
        public static bool operator <= (GDateTime a,GDateTime b) {
            if(a == b) return true;
            else return a < b;
        } // end method

        /// <summary>operátor vìtší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je vìtší než hodnota pravého, jinak false</returns>
        public static bool operator > (DateTimeOffset a,GDateTime b) {
            return a > b.OffsetValue;
        } // end method

        /// <summary>operátor menší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je menší než hodnota pravého, jinak false</returns>
        public static bool operator < (DateTimeOffset a,GDateTime b) {
            return a < b.OffsetValue;
        } // end method

        /// <summary>operátor vìtší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je vìtší nebo rovná hodnotì pravého, jinak false</returns>
        public static bool operator >=(DateTimeOffset a,GDateTime b) {
            return a >= b.OffsetValue;
        } // end method

        /// <summary>operátor menší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je menší nebo rovná hodnotì pravého, jinak false</returns>
        public static bool operator <=(DateTimeOffset a,GDateTime b) {
            return a <= b.OffsetValue;
        } // end method

        /// <summary>operátor vìtší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je vìtší než hodnota pravého, jinak false</returns>
        public static bool operator > (DateTime a,GDateTime b) {
            if(a.Kind == DateTimeKind.Utc) a = a.ToLocalTime();
            return a > b.Value;
        } // end method

        /// <summary>operátor menší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je menší než hodnota pravého, jinak false</returns>
        public static bool operator < (DateTime a,GDateTime b) {
            if(a.Kind == DateTimeKind.Utc) a = a.ToLocalTime();
            return a < b.Value;
        } // end method

        /// <summary>operátor vìtší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je vìtší nebo rovná hodnotì pravého, jinak false</returns>
        public static bool operator >= (DateTime a,GDateTime b) {
            if(a.Kind == DateTimeKind.Utc) a = a.ToLocalTime();
            return a >= b.Value;
        } // end method

        /// <summary>operátor menší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je menší nebo rovná hodnotì pravého, jinak false</returns>
        public static bool operator <= (DateTime a,GDateTime b) {
            if(a.Kind == DateTimeKind.Utc) a = a.ToLocalTime();
            return a <= b.Value;
        } // end method

        /// <summary>operátor vìtší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je vìtší než hodnota pravého, jinak false</returns>
        public static bool operator > (GDateTime a,DateTimeOffset b) {
            return a.OffsetValue > b;
        } // end method

        /// <summary>operátor menší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je menší než hodnota pravého, jinak false</returns>
        public static bool operator < (GDateTime a,DateTimeOffset b) {
            return a.OffsetValue < b;
        } // end method

        /// <summary>operátor vìtší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je vìtší nebo rovná hodnotì pravého, jinak false</returns>
        public static bool operator >= (GDateTime a,DateTimeOffset b) {
            return a.OffsetValue >= b;
        } // end method

        /// <summary>operátor menší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je menší nebo rovná hodnotì pravého, jinak false</returns>
        public static bool operator <= (GDateTime a,DateTimeOffset b) {
            return a.OffsetValue <= b;
        } // end method

        /// <summary>operátor vìtší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je vìtší než hodnota pravého, jinak false</returns>
        public static bool operator > (GDateTime a,DateTime b) {
            if(b.Kind == DateTimeKind.Utc) b = b.ToLocalTime();
            return a.Value > b;
        } // end method

        /// <summary>operátor menší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je menší než hodnota pravého, jinak false</returns>
        public static bool operator < (GDateTime a,DateTime b) {
            if(b.Kind == DateTimeKind.Utc) b = b.ToLocalTime();
            return a.Value < b;
        } // end method

        /// <summary>operátor vìtší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je vìtší nebo rovná hodnotì pravého, jinak false</returns>
        public static bool operator >= (GDateTime a,DateTime b) {
            if(b.Kind == DateTimeKind.Utc) b = b.ToLocalTime();
            return a.Value >= b;
        } // end method

        /// <summary>operátor menší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je menší nebo rovná hodnotì pravého, jinak false</returns>
        public static bool operator <= (GDateTime a,DateTime b) {
            if(b.Kind == DateTimeKind.Utc) b = b.ToLocalTime();
            return a.Value <= b;
        } // end method

    #endregion

    #region statická metoda Parse

        /// <summary>obecná typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>výstupní hodnota</returns>
        public static GDateTime Parse(object inputValue) {
            return Parse(inputValue,false);
        } // end method

        /// <summary>obecná typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="acceptNull">pøíznak pøípustnosti hodnoty null</param>
        /// <returns>výstupní hodnota</returns>
        public static GDateTime Parse(object inputValue,bool acceptNull) {
            GDateTime l_gdtDateTime = null;
            if(inputValue == null || (acceptNull && inputValue is string && inputValue.ToString().Trim() == String.Empty)) {
                if(acceptNull) l_gdtDateTime = new GDateTime();
                else throw new GArgumentNullException(23200560); // neinicializovaná hodnota parametru
            } else if(inputValue is string) l_gdtDateTime = Parse((string) inputValue);
            else if(inputValue is GBoolean || inputValue is GInt16 || inputValue is GInt32 || inputValue is GDecimal || inputValue is GEkoDate || inputValue is GBlob || inputValue is GTable) throw new GInvalidCastException(23200561); // pokus o nepovolenou typovou konverzi
            else if(inputValue is GString && ((GString)inputValue).IsNull == false) l_gdtDateTime = Parse(inputValue.ToString());
            else {
                l_gdtDateTime = new GDateTime();
                if(inputValue is IGDbType) l_gdtDateTime.DbValue = ((IGDbType) inputValue).DbValue;
                else l_gdtDateTime.DbValue = inputValue;
            } // end if
            return l_gdtDateTime;
        } // end method
		
        /// <summary>typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>výstupní hodnota</returns>
        public static GDateTime Parse(string inputValue) {
            try {
                DateTime l_dtValue;
                if(DateTime.TryParse(inputValue,out l_dtValue)) {
                    if(l_dtValue == DateTime.MinValue) return DateTimeOffset.MinValue;
                    else if(l_dtValue == DateTime.MaxValue) return DateTimeOffset.MaxValue;
                } // end if
                return DateTimeOffset.Parse(inputValue);
            } // end try
            catch(Exception e) {
                if(inputValue == null) inputValue = NullString;
                else if((inputValue = inputValue.Trim()) == String.Empty) inputValue = EmptyString;
                throw new GException(23200562,21350001,ThisAssembly,e,inputValue,nameof(GDateTime)); //RC-EX 21350001 : vstupní hodnotu {0} nelze použít pro inicializaci datového typu {1}
            } // end catch
        } // end method

        /// <summary>typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="formatProvider">hodnota typu <see cref="IFormatProvider"/> s informacemi o formátu vstupní hodnoty</param>
        /// <returns>výstupní hodnota</returns>
        public static GDateTime Parse(string inputValue,IFormatProvider formatProvider) {
            try {
                DateTime l_dtValue;
                if(DateTime.TryParse(inputValue,formatProvider,DateTimeStyles.None,out l_dtValue)) {
                    if(l_dtValue == DateTime.MinValue) return DateTimeOffset.MinValue;
                    else if(l_dtValue == DateTime.MaxValue) return DateTimeOffset.MaxValue;
                } // end if
                return DateTimeOffset.Parse(inputValue,formatProvider);
            } // end try
            catch(Exception e) {
                if(inputValue == null) inputValue = NullString;
                else if((inputValue = inputValue.Trim()) == String.Empty) inputValue = EmptyString;
                throw new GException(23200563,21350001,ThisAssembly,e,inputValue,nameof(GDateTime)); //RC-EX 21350001 : vstupní hodnotu {0} nelze použít pro inicializaci datového typu {1}
            } // end catch
        } // end method

        /// <summary>typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="formatProvider">hodnota typu <see cref="IFormatProvider"/> s informacemi o formátu vstupní hodnoty</param>
        /// <param name="dateTimeStyles">hodnota typu <see cref="DateTimeStyles"/> obsahující nastavení možností konverze</param>
        /// <returns>výstupní hodnota</returns>
        public static GDateTime Parse(string inputValue, IFormatProvider formatProvider, DateTimeStyles dateTimeStyles) {
            try {
                DateTime l_dtValue;
                if(DateTime.TryParse(inputValue,formatProvider,dateTimeStyles,out l_dtValue)) {
                    if(l_dtValue <= DateTime.MinValue) return DateTimeOffset.MinValue;
                    else if(l_dtValue >= DateTime.MaxValue) return DateTimeOffset.MaxValue;
                } // end if
                return DateTimeOffset.Parse(inputValue,formatProvider,dateTimeStyles);
            } // end try
            catch(Exception e) {
                if(inputValue == null) inputValue = NullString;
                else if((inputValue = inputValue.Trim()) == String.Empty) inputValue = EmptyString;
                throw new GException(23200564,21350001,ThisAssembly,e,inputValue,nameof(GDateTime)); //RC-EX 21350001 : vstupní hodnotu {0} nelze použít pro inicializaci datového typu {1}
            } // end catch
        } // end method

    #endregion
        
    #region pøetížená metoda ToString

        /// <summary>pøevod hodnoty na text</summary>
        /// <returns>textová reprezentace hodnoty</returns>
        public override string ToString() {
            return BaseOffsetValue.ToString(m_csDefaultFormat);
        } // end method

        /// <summary>pøevod hodnoty na text</summary>
        /// <param name="formatProvider">hodnota typu <see cref="IFormatProvider"/> s informacemi o požadovaném formátu</param>
        /// <returns>textová reprezentace hodnoty</returns>
        public override string ToString(IFormatProvider formatProvider) {
            return BaseOffsetValue.ToString(m_csDefaultFormat, formatProvider);
        } // end method

        /// <summary>pøevod hodnoty na text</summary>
        /// <param name="format">specifikace požadovaném formátu</param>
        /// <returns>textová reprezentace hodnoty</returns>
        public virtual string ToString(string format) {
            return BaseOffsetValue.ToString(format);
        } // end method

        /// <summary>pøevod hodnoty na text</summary>
        /// <param name="format">specifikace požadovaném formátu</param>
        /// <param name="formatProvider">hodnota typu <see cref="IFormatProvider"/> s informacemi o požadovaném formátu</param>
        /// <returns>textová reprezentace hodnoty</returns>
        public virtual string ToString(string format, IFormatProvider formatProvider) {
            return BaseOffsetValue.ToString(format,formatProvider);
        } // end method

        /// <summary>pøevod hodnoty na text</summary>
        /// <param name="involveNull">pøíznak zahrnutí hodnoty null</param>
        /// <returns>textová reprezentace hodnoty</returns>
        public override string ToString(bool involveNull) {
            return (involveNull && IsNull) ? NullString : BaseOffsetValue.ToString(m_csDefaultFormat);
        } // end method

        #endregion
    
    #region veøejné metody

        /// <summary>zjištìní zda se hodnota nachází v pøedaném výètu hodnot</summary>
        /// <param name="items">výèet hodnot</param>
        /// <returns>true v pøípadì, že se hodnota nachází v pøedaném výètu hodnot, jinak false</returns>
        public bool In(params GDate[] items) {
            if(items == null) return false;
            else if(IsNull) return items.Where(item => item.IsNull).Any();
            else return items.Where(item => item.BaseValue == BaseValue).Any();
        } // end method

        /// <summary>zjištìní zda se hodnota nachází v pøedaném výètu hodnot</summary>
        /// <param name="items">výèet hodnot</param>
        /// <returns>true v pøípadì, že se hodnota nachází v pøedaném výètu hodnot, jinak false</returns>
        public bool In(params GDateTime[] items) {
            if(items == null) return false;
            else if(IsNull) return items.Where(item => item.IsNull).Any();
            else return items.Where(item => item.BaseOffsetValue == BaseOffsetValue).Any();
        } // end method

        /// <summary>zjištìní zda se hodnota nachází v pøedaném výètu hodnot</summary>
        /// <param name="items">výèet hodnot</param>
        /// <returns>true v pøípadì, že se hodnota nachází v pøedaném výètu hodnot, jinak false</returns>
        public bool In(params DateTimeOffset[] items) {
            if(items == null || IsNull) return false;
            else return Array.IndexOf<DateTimeOffset>(items,BaseOffsetValue) > -1;
        } // end method

        /// <summary>zjištìní zda se hodnota nachází v pøedaném výètu hodnot</summary>
        /// <param name="items">výèet hodnot</param>
        /// <returns>true v pøípadì, že se hodnota nachází v pøedaném výètu hodnot, jinak false</returns>
        public bool In(params DateTime[] items) {
            if(items == null || IsNull) return false;
            else {
                foreach(DateTime l_dtItem in items) {
                    DateTime l_dtCurrent = BaseValue;
                    if(l_dtItem.Kind == DateTimeKind.Utc) {
                        if(l_dtItem.ToLocalTime() == l_dtCurrent) return true;
                    } else {
                        if(l_dtItem == l_dtCurrent) return true;
                    } // end if
                } // end foreach
                return false;
            } // end if
        } // end method

        /// <summary>vrací novou instanci GDateTime s pøidáním zadaného poètu sekund k aktuální hodnotì</summary>
        /// <param name="value">poèet sekund</param>
        /// <returns>nová instance GDateTime s pøidaným poètem sekund</returns>
        public GDateTime AddSeconds(int value) {
            return new GDateTime(OffsetValue.AddSeconds(value));
        } // end method 

        /// <summary>vrací novou instanci GDateTime s pøidáním zadaného poètu minut k aktuální hodnotì</summary>
        /// <param name="value">poèet minut</param>
        /// <returns>nová instance GDateTime s pøidaným poètem minut</returns>
        public GDateTime AddMinutes(int value) {
            return new GDateTime(OffsetValue.AddMinutes(value));
        } // end method 

        /// <summary>vrací novou instanci GDateTime s pøidáním zadaného poètu hodin k aktuální hodnotì</summary>
        /// <param name="value">poèet hodin</param>
        /// <returns>nová instance GDateTime s pøidaným poètem hodin</returns>
        public GDateTime AddHours(int value) {
            return new GDateTime(OffsetValue.AddHours(value));
        } // end method

        /// <summary>vrací novou instanci GDateTime s pøidáním zadaného poètu dnù k aktuální hodnotì</summary>
        /// <param name="value">poèet dnù</param>
        /// <returns>nová instance GDateTime s pøidaným poètem dnù</returns>
        public GDateTime AddDays(int value) {
            return new GDateTime(OffsetValue.AddDays(value));
        } // end method

        /// <summary>vrací novou instanci GDateTime s pøidáním zadaného poètu mìsícù k aktuální hodnotì</summary>
        /// <param name="value">poèet mìsícù</param>
        /// <returns>nová instance GDateTime s pøidaným poètem mìsícù</returns>
        public GDateTime AddMonths(int value) {
            return new GDateTime(OffsetValue.AddMonths(value));
        } // end method

        /// <summary>vrací novou instanci GDateTime s pøidáním zadaného poètu rokù k aktuální hodnotì</summary>
        /// <param name="value">poèet rokù</param>
        /// <returns>nová instance GDateTime s pøidaným poètem rokù</returns>
        public GDateTime AddYears(int value) {
            return new GDateTime(OffsetValue.AddYears(value));
        } // end method

    #endregion

    #region veøejné statické metody

        /// <summary>vrací instanci s vìtší hodnotou</summary>
        /// <param name="first">první instance</param>
        /// <param name="second">druhá instance</param>
        /// <returns>instance s vìtší hodnotou</returns>
        public static GDateTime Max(GDateTime first,GDateTime second) {
            return (first > second) ? first : second;
        } // end method

        /// <summary>vrací instanci s menší hodnotou</summary>
        /// <param name="first">první instance</param>
        /// <param name="second">druhá instance</param>
        /// <returns>instance s menší hodnotou</returns>
        public static GDateTime Min(GDateTime first,GDateTime second) {
            return (first < second) ? first : second;
        } // end method

    #endregion

    #region soukromé metody
        
        /// <summary>získání hodnoty typu datum a èas kontrolou na mezní hodnoty</summary>
        /// <param name="dateTime">hodnota typu datum a èas</param>
        /// <returns>hodnota typu datum a èas</returns>
        private static DateTimeOffset GetDateTimeOffset(DateTime dateTime) {
            DateTime l_dtDateTime = dateTime.ToUniversalTime();
            if(l_dtDateTime == DateTime.MinValue) return DateTimeOffset.MinValue;
            else if(l_dtDateTime == DateTime.MaxValue) return DateTimeOffset.MaxValue;
            else return new DateTimeOffset(l_dtDateTime).ToLocalTime();
        } // end method

    #endregion

    } // end class

} // end namespace
