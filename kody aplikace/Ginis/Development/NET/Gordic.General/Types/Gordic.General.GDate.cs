//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>          Gordic.General.GDate.cs                    </Name>
//    <Description>   databázová hodnota hodnota typu datum      </Description>
//    <Author>        Jan Kuttich                                </Author>
//    <Copyright>     © GORDIC spol. s r. o. 1993 - 2021 </Copyright>
//    <Created>       2003-08-28                                 </Created>
//  </FileHeader>

using System;
using System.Data.OleDb;
using System.ComponentModel;
using System.Globalization;
using System.Reflection;
using System.Diagnostics;
using System.Linq;

namespace Gordic.General {
	
    /// <summary>databázová hodnota hodnota typu datum</summary>
	[Serializable]
	[TypeConverter(typeof(GDateConverter))]
	public class GDate : GDbType, IGDbTypeDateTime
    {

        #region soukromé konstanty

        /// <summary>defaultní formátovací řetězec</summary>
        private const string m_csDefaultFormat = "yyyy-MM-dd";

        #endregion

        #region soukromé členy

        /// <summary>výchozí hodnota</summary>
        private DateTime m_dtDefaultValue = DateTime.MinValue.Date;

        /// <summary>
        /// Příznak, že tato instance GDate reprezentuje databázovou hodnotu current 
        /// Při čtení z .NET se tváří, jako že má hodnotu Null
        /// Při ukládání do databáze GDatabase zajistí náhradu na odpovídající symbol pro current
        /// Nastavuje se pouze v rámci konstruktoru potomka typu GDateCurrent
        /// </summary>
        protected bool m_bIsCurrent = false;

        /// <summary>instance hodnoty null určená pouze pro čtení</summary>
        private static readonly GDate m_cgdNull = new GDate(true);

        /// <summary>instance předplněná na minimální hodnotu určená pouze pro čtení</summary>
        private static readonly GDate m_cgdMinValue = new GDate(true,new DateTime(1900,1,1));

        /// <summary>instance předplněná na maximální hodnotu určená pouze pro čtení</summary>
        private static readonly GDate m_cgdMaxValue = new GDate(true,new DateTime(2999,12,31));

        #endregion

        #region konstruktory

        /// <summary>veřejný konstruktor</summary>
        public GDate() : base(true) {}

        /// <summary>veřejný konstruktor</summary>
        /// <param name="date">inicializační hodnota typu datum a čas</param>
        public GDate(DateTime date) : base(true) {
            ValueInstance = ClearTime(date);
        } // end method

        /// <summary>veřejný konstruktor</summary>
        /// <param name="date">inicializační hodnota typu datum a čas</param>
        /// <param name="isNullable">příznak povolení hodnoty null</param>
        public GDate(DateTime date,bool isNullable) : base(isNullable) {
            ValueInstance = ClearTime(date);
        } // end method

        /// <summary>veřejný konstruktor</summary>
        /// <param name="date">inicializační hodnota typu datum a čas</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GDate(DateTime date,string sourceColumn) : this(date,true,sourceColumn) {
        } // end method

        /// <summary>veřejný konstruktor</summary>
        /// <param name="date">inicializační hodnota typu datum a čas</param>
        /// <param name="isNullable">příznak povolení hodnoty null</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GDate(DateTime date,bool isNullable,string sourceColumn) : base(isNullable) {
            ValueInstance = ClearTime(date);
            SourceColumn = sourceColumn;
        } // end method

        /// <summary>veřejný kopírovací konstruktor</summary>
        /// <param name="source">zdrojová instance</param>
        /// <param name="copyOptions">vhrazeno pro budoucí použití</param>
        public GDate(GDate source,GDbTypeCopyOptions copyOptions) : base(source as GDbType) {
            m_dtDefaultValue = source.m_dtDefaultValue;
        } // end method

        /// <summary>soukromý konstruktor</summary>
        /// <param name="readOnly">příznak hodnoty určené pouze pro čtení</param>
        private GDate(bool readOnly) : base(true) {
            if(readOnly) SetReadOnly();
        } // end method

        /// <summary>soukromý konstruktor</summary>
        /// <param name="readOnly">příznak hodnoty určené pouze pro čtení</param>
        /// <param name="date">inicializační hodnota typu datum a čas</param>
        private GDate(bool readOnly,DateTime date) : base(true) {
            ValueInstance = ClearTime(date);
            if(readOnly) SetReadOnly();
        } // end method

        /// <summary>veřejný konstruktor</summary>
        /// <param name="value">inicializační hodnota</param>
        public GDate(DateTime ? value) : base(true) {
            if(value != null) ValueInstance = value;
        } // end method

        #endregion

        #region vlastnosti

        /// <summary>hodnota typu datum s ohledem na hodnotu null</summary>
        public DateTime Value {
            get {
                if(IsNull) throw new GException(23200015,23200003,ThisAssembly); // pokus o přístup k hodnotě null
                return ((DateTime) ValueInstance).Date;
            } // end method
            set {
                ValueInstance = ClearTime(value);
            } // end method
        } // end property

        /// <summary>databázová hodnota</summary>
        public new object DbValue {
            get {
                if(IsNull) return DBNull.Value;
                else return ((DateTime) ValueInstance).Date;
            } // end method
            set {
                if(value==null || value.GetType()==typeof(DBNull)) ValueInstance = null;
                else ValueInstance = ConvertValue(value);
            } // end method
        } // end property
    
        /// <summary>výchozí hodnota</summary>
        public DateTime DefaultValue {
            get {return m_dtDefaultValue.Date;}
            set {
                if(IsReadOnly) throw new GException(23200085,23200084,ThisAssembly); // hodnota je určena pouze ke čtení
                m_dtDefaultValue = ClearTime(value);
            } // end method
        } // end property

        /// <summary>
        /// Příznak, že tato G hodnota reprezentuje databázový current
        /// Tato varianta je použitelná pouze pro ukládání do databáze.
        /// Z .NET se bude chovat jako by byla nastavena na null.
        /// Nastavení tohoto příznaku je možné v rámci konstruktoru poděděné třídy GDateCurrent
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

        /// <summary>hodnota typu datum bez ohledu na hodnotu null</summary>
        public DateTime BaseValue {
            get {return IsNull ? DefaultValue : ((DateTime) ValueInstance).Date;}
        } // end property

        /// <summary>instance hodnoty null určená pouze pro čtení</summary>
        public static GDate Null {
            get {return m_cgdNull;}
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(GDate).Assembly;}
        } // end property

        /// <summary>defaultní formátovací řetězec</summary>
        public static string DefaultFormat {
            get { return m_csDefaultFormat; }
        } // end property

        /// <summary>defaultní formátovací řetězec pro zobrazení uživateli</summary>
        public static string DefaultDisplayFormat {
            get {
                return GResources.GetResourceText(ThisAssembly,23230188); // dd.MM.yyyy
            } // end method
        } // end property

        /// <summary>instance předplněná na minimální hodnotu určená pouze pro čtení</summary>
        public static GDate MinValue {
            get { return m_cgdMinValue; }
        } // end property

        /// <summary>instance předplněná na maximální hodnotu určená pouze pro čtení</summary>
        public static GDate MaxValue {
            get { return m_cgdMaxValue; }
        } // end property

        /// <summary>den</summary>
        public short Day {
            get { return (short) (IsNull ? 0 : Value.Day); } 
        } // end property

        /// <summary>měsíc</summary>
        public short Month {
            get { return (short) (IsNull ? 0 : Value.Month); }
        } // end property

        /// <summary>rok</summary>
        public short Year {
            get { return (short) (IsNull ? 0 : Value.Year); }
        } // end property

        /// <summary>den jako GInt16</summary>
        public GInt16 GDay {
            get { return IsNull ? new GInt16() : new GInt16(Day); }
        } // end property

        /// <summary>měsíc jako GInt16</summary>
        public GInt16 GMonth {
            get { return IsNull ? new GInt16() : new GInt16(Month); }
        } // end property

        /// <summary>rok jako GInt16</summary>
        public GInt16 GYear {
            get { return IsNull ? new GInt16() : new GInt16(Year); }
        } // end property

        /// <summary>
        /// Hodnota je validní pro ukládání do databáze.
        /// Tedy je NULL nebo je větší/rovno rok 1753 - to je nejmenší přípustná hodnota pro ukládání datumů do DB stroje Microsoft - ten má tuto hranici nejvyšší
        /// </summary>
        public bool IsDbValid
        {
            get { return IsNull ? true : Year >= 1753; }
        }

        #endregion

        #region přetížené metody

        /// <summary>získání výchozí hodnoty</summary>
        /// <returns>výchozí hodnota typu datum</returns>
        protected override object GetDefaultValue() {
            return DefaultValue;
        } // end method

        /// <summary>konverze vstupní hodnoty</summary>
        /// <param name="sourceValue">vstupní hodnota</param>
        /// <returns>hodnota typu datum</returns>
        protected override object ConvertValue(object sourceValue) {
            if(sourceValue.GetType() != typeof(DateTime)) throw new GException(23200016,23200004,ThisAssembly); // pokus o nepodporovanou konverzi typů
            return ClearTime((DateTime) sourceValue);
        } // end method

        /// <summary>porovnání dvou hodnot s ohledem na typ</summary>
        /// <param name="valueOne">první hodnota</param>
        /// <param name="valueTwo">druhá hodnota</param>
        /// <returns>true pokud se hodnoty shodují, jinak false</returns>
        protected override bool CompareValues(object valueOne,object valueTwo) {
            return ((DateTime) valueOne).Date == ((DateTime) valueTwo).Date;
        } // end method

        /// <summary>vytvoření identické kopie objektu</summary>
        /// <returns>nová instance objektu</returns>
        /// <remarks>příznak hodnoty určené pouze ke čtení je u nově vzniklé instance vždy negativní</remarks>
        public override object Clone() {
            return new GDate(this,null);
        } // end method

        /// <summary>nastavení hodnoty s případnou předchozí typovou konverzí</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        public override void ParseValue(object inputValue) {
            GDate l_gdaValue = GDate.Parse(inputValue,true);
            ValueInstance = l_gdaValue.IsNull ? null : l_gdaValue.DbValue;
        } // end method

        /// <summary>porovnání hodnoty se vstupní hodnotou stejného typu</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>hodnota menší než nula pokud aktuální hodnota je v rámci třídění před vstupní hodnotou, hodnota nula pokud je na stejné pozici nebo hodnota větší než nula pokud je za vstupní hodnotou</returns>
        public override int CompareTo(object inputValue) {
            if(inputValue == null) return 1;
            GDate l_gbInputValue = inputValue as GDate;
            if(l_gbInputValue == null) throw new GArgumentException(23200416);
            if(this == l_gbInputValue) return 0;
            else return this < l_gbInputValue ? -1 : 1;
        } // end method

        #endregion

		#region přetížené operátory

        /// <summary>vrací kontrolní součet instance objektu</summary>
        /// <returns>kontrolní součet instance objektu</returns>
		public override int GetHashCode() {
			return BaseValue.GetHashCode();
		} // end method

        /// <summary>porovnání hodnoty s jiným objektem</summary>
        /// <param name="inputObject">instance pro porovnání</param>
        /// <returns>true pokud jsou objekty stejného typu a jejich hodnoty jsou shodné, jinak false</returns>
        public override bool Equals(object inputObject) {
            GDate l_gdInputObject = inputObject as GDate;
            return l_gdInputObject!=null && l_gdInputObject==this;
		} // end method

        /// <summary>operátor porovnání</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě shody hodnot, jinak false</returns>
        public static bool operator ==(GDate a,GDate b) {
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
        /// <returns>vrací true v případě neshody hodnot, jinak false</returns>
        public static bool operator !=(GDate a,GDate b) {
            return (a == b) == false;
        } // end method

		/// <summary>implicitní konverze na <see cref="DateTime"/></summary>
		/// <param name="a">konvertovaná hodnota</param>
		/// <returns>hodnota typu DateTime</returns>
		public static implicit operator DateTime(GDate a) {
			return a.Value;
		} // end method

		/// <summary>implicitní konverze z <see cref="DateTime"/></summary>
		/// <param name="a">konvertovaná hodnota</param>
		/// <returns>hodnota typu GDate</returns>
		public static implicit operator GDate(DateTime a) {
			return new GDate(a);
		} // end method

        /// <summary>implicitní konverze z GDate na DateTime ?</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu DateTime ?</returns>
        public static implicit operator DateTime? (GDate a) {
            return a == null || a.IsNull ? null : (DateTime ?) a.Value;
        } // end method

        /// <summary>implicitní konverze z DateTime ? na GDate</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GDate</returns>
        public static implicit operator GDate(DateTime? a) {
            return a == null ? new GDate() : new GDate((DateTime) a);
        } // end method	
        
		/// <summary>implicitní konverze z <see cref="GDateTime"/></summary>
		/// <param name="a">konvertovaná hodnota</param>
		/// <returns>hodnota typu GDate</returns>
		public static implicit operator GDate(GDateTime a) {
            if (a == null) return null;
			GDate b = a.IsNull ? new GDate() : new GDate(a.Value);
            b.SourceColumn = a.SourceColumn;
			return b;
		} // end method

		/// <summary>implicitní konverze z <see cref="GDate"/></summary>
		/// <param name="a">konvertovaná hodnota</param>
		/// <returns>hodnota typu GDateTime</returns>
		public static implicit operator GDateTime(GDate a) {
            if (a == null) return null;
            GDateTime b = a.IsNull ? new GDateTime() : new GDateTime(a.Value);
            b.SourceColumn = a.SourceColumn;
			return b;
		} // end method

        /// <summary>operátor větší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě, že hodnota levého operandu je větší než hodnota pravého, jinak false</returns>
        public static bool operator >(GDate a,GDate b) {
            if(a == b) return false;
            else {
                if((object)a == null || (object)b == null) throw new GArgumentNullException(23200321);
                if(a.IsNull || b.IsNull) throw new GException(23200322,23200003,ThisAssembly); // pokus o přístup k hodnotě null
                return a.Value > b.Value;
            } // end if
        } // end method

        /// <summary>operátor menší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě, že hodnota levého operandu je menší než hodnota pravého, jinak false</returns>
        public static bool operator <(GDate a,GDate b) {
            if(a == b) return false;
            else {
                if((object)a == null || (object)b == null) throw new GArgumentNullException(23200323);
                if(a.IsNull || b.IsNull) throw new GException(23200324,23200003,ThisAssembly); // pokus o přístup k hodnotě null
                return a.Value < b.Value;
            } // end if
        } // end method

        /// <summary>operátor větší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě, že hodnota levého operandu je větší nebo rovná hodnotě pravého, jinak false</returns>
        public static bool operator >=(GDate a,GDate b) {
            if(a == b) return true;
            else return a > b;
        } // end method

        /// <summary>operátor menší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě, že hodnota levého operandu je menší nebo rovná hodnotě pravého, jinak false</returns>
        public static bool operator <=(GDate a,GDate b) {
            if(a == b) return true;
            else return a < b;
        } // end method

        /// <summary>operátor větší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě, že hodnota levého operandu je větší než hodnota pravého, jinak false</returns>
        public static bool operator >(DateTime a,GDate b) {
            return a > b.Value;
        } // end method

        /// <summary>operátor menší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě, že hodnota levého operandu je menší než hodnota pravého, jinak false</returns>
        public static bool operator <(DateTime a,GDate b) {
            return a < b.Value;
        } // end method

        /// <summary>operátor větší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě, že hodnota levého operandu je větší nebo rovná hodnotě pravého, jinak false</returns>
        public static bool operator >=(DateTime a,GDate b) {
            return a >= b.Value;
        } // end method

        /// <summary>operátor menší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě, že hodnota levého operandu je menší nebo rovná hodnotě pravého, jinak false</returns>
        public static bool operator <=(DateTime a,GDate b) {
            return a <= b.Value;
        } // end method

        /// <summary>operátor větší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě, že hodnota levého operandu je větší než hodnota pravého, jinak false</returns>
        public static bool operator >(GDate a,DateTime b) {
            return a.Value > b;
        } // end method

        /// <summary>operátor menší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě, že hodnota levého operandu je menší než hodnota pravého, jinak false</returns>
        public static bool operator <(GDate a,DateTime b) {
            return a.Value < b;
        } // end method

        /// <summary>operátor větší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě, že hodnota levého operandu je větší nebo rovná hodnotě pravého, jinak false</returns>
        public static bool operator >=(GDate a,DateTime b) {
            return a.Value >= b;
        } // end method

        /// <summary>operátor menší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě, že hodnota levého operandu je menší nebo rovná hodnotě pravého, jinak false</returns>
        public static bool operator <=(GDate a,DateTime b) {
            return a.Value <= b;
        } // end method

        #endregion

        #region statická metoda Parse

        /// <summary>obecná typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>výstupní hodnota</returns>
        public static GDate Parse(object inputValue) {
            return Parse(inputValue,false);
        } // end method

        /// <summary>obecná typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="acceptNull">příznak přípustnosti hodnoty null</param>
        /// <returns>výstupní hodnota</returns>
        public static GDate Parse(object inputValue,bool acceptNull) {
            GDate l_gdDate = null;
            if(inputValue == null || (acceptNull && inputValue is string && inputValue.ToString().Trim() == String.Empty)) {
                if(acceptNull) l_gdDate = new GDate();
                else throw new GArgumentNullException(23200061); // neinicializovaná hodnota parametru
            } else if(inputValue is string) l_gdDate = Parse((string) inputValue);
            else if(inputValue is GInt16 || inputValue is GInt32 || inputValue is GDecimal || inputValue is GEkoDate) throw new GInvalidCastException(23200062); // pokus o nepovolenou typovou konverzi
            else if(inputValue is GString && ((GString)inputValue).IsNull == false) l_gdDate = Parse(inputValue.ToString());
            else {
                l_gdDate = new GDate();
                if(inputValue is IGDbType) l_gdDate.DbValue = ((IGDbType) inputValue).DbValue;
                else l_gdDate.DbValue = inputValue;
            } // end if
            return l_gdDate;
        } // end method
		
        /// <summary>typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>výstupní hodnota</returns>
        public static GDate Parse(string inputValue) {
            try {
                return DateTime.Parse(inputValue);
            } // end try
            catch(Exception e) {
                if(inputValue == null) inputValue = NullString;
                else if((inputValue = inputValue.Trim()) == String.Empty) inputValue = EmptyString;
                throw new GException(23200063,21350001,ThisAssembly,e,inputValue,nameof(GDate)); //RC-EX 21350001 : vstupní hodnotu {0} nelze použít pro inicializaci datového typu {1}
            } // end catch
        } // end method

        /// <summary>typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="formatProvider">hodnota typu <see cref="IFormatProvider"/> s informacemi o formátu vstupní hodnoty</param>
        /// <returns>výstupní hodnota</returns>
        public static GDate Parse(string inputValue,IFormatProvider formatProvider) {
            try {
                return DateTime.Parse(inputValue,formatProvider);
            } // end try
            catch(Exception e) {
                if(inputValue == null) inputValue = NullString;
                else if((inputValue = inputValue.Trim()) == String.Empty) inputValue = EmptyString;
                throw new GException(23200064,21350001,ThisAssembly,e,inputValue,nameof(GDate)); //RC-EX 21350001 : vstupní hodnotu {0} nelze použít pro inicializaci datového typu {1}
            } // end catch
        } // end method

        /// <summary>typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="formatProvider">hodnota typu <see cref="IFormatProvider"/> s informacemi o formátu vstupní hodnoty</param>
        /// <param name="dateTimeStyles">hodnota typu <see cref="DateTimeStyles"/> obsahující nastavení možností konverze</param>
        /// <returns>výstupní hodnota</returns>
        public static GDate Parse(string inputValue, IFormatProvider formatProvider, DateTimeStyles dateTimeStyles) {
            try {
                return DateTime.Parse(inputValue,formatProvider,dateTimeStyles);
            } // end try
            catch(Exception e) {
                if(inputValue == null) inputValue = NullString;
                else if((inputValue = inputValue.Trim()) == String.Empty) inputValue = EmptyString;
                throw new GException(23200065,21350001,ThisAssembly,e,inputValue,nameof(GDate)); //RC-EX 21350001 : vstupní hodnotu {0} nelze použít pro inicializaci datového typu {1}
            } // end catch
        } // end method

        #endregion

        #region přetížená metoda ToString

        /// <summary>převod hodnoty na text</summary>
        /// <returns>textová reprezentace hodnoty</returns>
        public override string ToString() {
            return BaseValue.ToString(m_csDefaultFormat);
        } // end method

        /// <summary>převod hodnoty na text</summary>
        /// <param name="formatProvider">hodnota typu <see cref="IFormatProvider"/> s informacemi o požadovaném formátu</param>
        /// <returns>textová reprezentace hodnoty</returns>
        public override string ToString(IFormatProvider formatProvider) {
            return BaseValue.ToString(m_csDefaultFormat, formatProvider);
        } // end method

        /// <summary>převod hodnoty na text</summary>
        /// <param name="format">specifikace požadovaném formátu</param>
        /// <returns>textová reprezentace hodnoty</returns>
        public virtual string ToString(string format) {
            return BaseValue.ToString(format);
        } // end method

        /// <summary>převod hodnoty na text</summary>
        /// <param name="format">specifikace požadovaném formátu</param>
        /// <param name="formatProvider">hodnota typu <see cref="IFormatProvider"/> s informacemi o požadovaném formátu</param>
        /// <returns>textová reprezentace hodnoty</returns>
        public virtual string ToString(string format, IFormatProvider formatProvider) {
            return BaseValue.ToString(format,formatProvider);
        } // end method

        /// <summary>převod hodnoty na text</summary>
        /// <param name="involveNull">příznak zahrnutí hodnoty null</param>
        /// <returns>textová reprezentace hodnoty</returns>
        public override string ToString(bool involveNull) {
            return (involveNull && IsNull) ? NullString : BaseValue.ToString(m_csDefaultFormat);
        } // end method

        #endregion

        #region veřejné metody

        /// <summary>zjištění zda se hodnota nachází v předaném výčtu hodnot</summary>
        /// <param name="items">výčet hodnot</param>
        /// <returns>true v případě, že se hodnota nachází v předaném výčtu hodnot, jinak false</returns>
        public bool In(params GDate[] items) {
            if(items == null) return false;
            else if(IsNull) return items.Where(item => item.IsNull).Any();
            else return items.Where(item => item.BaseValue == BaseValue).Any();
        } // end method

        /// <summary>zjištění zda se hodnota nachází v předaném výčtu hodnot</summary>
        /// <param name="items">výčet hodnot</param>
        /// <returns>true v případě, že se hodnota nachází v předaném výčtu hodnot, jinak false</returns>
        public bool In(params GDateTime[] items) {
            if(items == null) return false;
            else if(IsNull) return items.Where(item => item.IsNull).Any();
            else return items.Where(item => item.BaseValue == BaseValue).Any();
        } // end method

        /// <summary>zjištění zda se hodnota nachází v předaném výčtu hodnot</summary>
        /// <param name="items">výčet hodnot</param>
        /// <returns>true v případě, že se hodnota nachází v předaném výčtu hodnot, jinak false</returns>
        public bool In(params DateTime[] items) {
            if(items == null || IsNull) return false;
            else return Array.IndexOf<DateTime>(items,BaseValue) > -1;
        } // end method

        /// <summary>vrací novou instanci GDate s přidáním zadaného počtu dnů k aktuální hodnotě</summary>
        /// <param name="value">počet dnů</param>
        /// <returns>nová instance GDate s přidaným počtem dnů</returns>
        public GDate AddDays(int value) {
            return new GDate(Value.AddDays(value));
        } // end method

        /// <summary>vrací novou instanci GDate s přidáním zadaného počtu měsíců k aktuální hodnotě</summary>
        /// <param name="value">počet měsíců</param>
        /// <returns>nová instance GDate s přidaným počtem měsíců</returns>
        public GDate AddMonths(int value) {
            return new GDate(Value.AddMonths(value));
        } // end method

        /// <summary>vrací novou instanci GDate s přidáním zadaného počtu roků k aktuální hodnotě</summary>
        /// <param name="value">počet roků</param>
        /// <returns>nová instance GDate s přidaným počtem roků</returns>
        public GDate AddYears(int value) {
            return new GDate(Value.AddYears(value));
        } // end method

        #endregion

        #region veřejné statické metody

        /// <summary>vrací instanci s větší hodnotou</summary>
        /// <param name="first">první instance</param>
        /// <param name="second">druhá instance</param>
        /// <returns>instance s větší hodnotou</returns>
        public static GDate Max(GDate first,GDate second) {
            return (first > second) ? first : second;
        } // end method

        /// <summary>vrací instanci s menší hodnotou</summary>
        /// <param name="first">první instance</param>
        /// <param name="second">druhá instance</param>
        /// <returns>instance s menší hodnotou</returns>
        public static GDate Min(GDate first,GDate second) {
            return (first < second) ? first : second;
        } // end method

        /// <summary>vynulování časové složky u data</summary>
        /// <param name="dateTime">vstupní datum</param>
        /// <returns>datum s vynulovanou časovou složkou</returns>
        public static DateTime ClearTime(DateTime dateTime) {
            //return dateTime.Subtract(dateTime.TimeOfDay);
            return dateTime.Date;
        } // end method

        #endregion

        #region kategorie datumu

        /// <summary>Kategorizace datumu do skupin (dnes, zítra, atp.)</summary>
        public string Category(string format = "") {
            if (IsNull) return String.Empty;

            var d1 = this.BaseValue;
            var d2 = DateTime.Today;
            int m1 = d1.Month;
            int m2 = d2.Month;
            int y1 = d1.Year;
            int y2 = d2.Year;

            //prvne drobne testy
            if (y1 != y2) return GResources.GetResourceText(ThisAssembly,21090018, y1); //RC 21090018 : Rok {0}
            bool l_samemonth = m1 == m2;
            if (l_samemonth) {
                int l_days = d1.Day - d2.Day;
                if (l_days == 0) return GResources.GetResourceText(ThisAssembly,21090005); //RC 21090005 : Dnes
                if (l_days == -1) return GResources.GetResourceText(ThisAssembly,21090006); //RC 21090006 : Včera
                if (l_days == +1) return GResources.GetResourceText(ThisAssembly,21090007); //RC 21090007 : Zítra
            } // end if

            var i = DateTimeFormatInfo.CurrentInfo;
            var c = i.Calendar;

            //tento tyden
            int w1 = c.GetWeekOfYear(d1, i.CalendarWeekRule, i.FirstDayOfWeek);
            int w2 = c.GetWeekOfYear(d2, i.CalendarWeekRule, i.FirstDayOfWeek);
            if (w1 == w2) return i.GetDayName(d1.DayOfWeek);

            //stejný měsíc, ale jiný týden
            if (l_samemonth) {
                int wd = w1 - w2;
                if (wd == -1) return GResources.GetResourceText(ThisAssembly,21090008); //RC 21090008 : Minulý týden
                if (wd == 1) return GResources.GetResourceText(ThisAssembly,21090009); //RC 21090009 : Příští týden
                string wds;
                switch (wd)
                {
                    case -2: wds = GResources.GetResourceText(ThisAssembly,21090010); break;  //RC 21090010 : dvěma
                    case -3: wds = GResources.GetResourceText(ThisAssembly,21090011); break;  //RC 21090011 : třemi
                    case +2: wds = GResources.GetResourceText(ThisAssembly,21090016); break; //RC 21090016 : dva
                    case +3: wds = GResources.GetResourceText(ThisAssembly,21090017); break;  //RC 21090017 : tři
                    default: wds = Math.Abs(wd).ToString(); break;
                }
                if (wd < 0) return String.Format(GResources.GetResourceText(ThisAssembly,21090012), wds); //RC 21090012 : Před {0} týdny
                return String.Format(GResources.GetResourceText(ThisAssembly,21090013), wds); //RC 21090013 : Za {0} týdny
            }

            int md = m1 - m2;
            if (md == -1) return GResources.GetResourceText(ThisAssembly,21090014); //RC 21090014 : Minulý měsíc
            if (md == 1) return GResources.GetResourceText(ThisAssembly,21090015); //RC 21090015 : Příští měsíc
            return i.GetMonthName(m1);
        } // end method

        #endregion

    } // end class

} // end namespace
