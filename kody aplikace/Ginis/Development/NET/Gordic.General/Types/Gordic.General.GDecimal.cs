//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>          Gordic.General.GDecimal.cs                                 </Name>
//    <Description>   databázová hodnota desetinné èíslo s pevnou øádovou èárkou </Description>
//    <Author>        Jan Kuttich                                                </Author>
//    <Copyright>     © GORDIC spol. s r. o. 1993 - 2021                 </Copyright>
//    <Created>       2003-08-26                                                 </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.Globalization;
using System.Text;
using System.Reflection;
using System.Linq;
using System.Threading;

namespace Gordic.General {
	
    /// <summary>databázová hodnota desetinné èíslo s pevnou øádovou èárkou</summary>
	[Serializable]
	[TypeConverter( typeof(GDecimalConverter))]
	public class GDecimal : GDbType, IGDbTypeNumber {

		#region soukromé èleny

		/// <summary>výchozí hodnota</summary>
		private decimal m_dDefaultValue = 0;

        /// <summary>instance hodnoty null urèená pouze pro ètení</summary>
        private static readonly GDecimal m_cgmNull = new GDecimal(true);

        /// <summary>maximální poèet platných èíslic za desetinným znaménkem</summary>
        private ushort ? m_nMaxPrecision = null;

        /// <summary>maximální poèet platných èíslic celkem</summary>
        private ushort ? m_nMaxNumbers = null;

        #endregion

        #region konstruktory

        /// <summary>veøejný konstruktor</summary>
        public GDecimal() : base(true) {}

		/// <summary>veøejný konstruktor</summary>
		/// <param name="decimalValue">inicializaèní hodnota typu desetinné èíslo s pevnou øádovou èárkou</param>
		public GDecimal(decimal decimalValue) : base(true) {
			ValueInstance = decimalValue;
		} // end method

		/// <summary>veøejný konstruktor</summary>
		/// <param name="decimalValue">inicializaèní hodnota typu desetinné èíslo s pevnou øádovou èárkou</param>
		/// <param name="isNullable">pøíznak povolení hodnoty null</param>
		public GDecimal(decimal decimalValue,bool isNullable) : base(isNullable) {
			ValueInstance = decimalValue;
		} // end method

        /// <summary>veøejný konstruktor</summary>
		/// <param name="decimalValue">inicializaèní hodnota typu desetinné èíslo s pevnou øádovou èárkou</param>
		/// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
		public GDecimal(decimal decimalValue,string sourceColumn) : this(decimalValue,true,sourceColumn) {
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="decimalValue">inicializaèní hodnota typu desetinné èíslo s pevnou øádovou èárkou</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GDecimal(decimal decimalValue,bool isNullable,string sourceColumn) : base(isNullable) {
			ValueInstance = decimalValue;
			SourceColumn = sourceColumn;
		} // end method

        /// <summary>veøejný kopírovací konstruktor</summary>
        /// <param name="source">zdrojová instance</param>
        /// <param name="copyOptions">vhrazeno pro budoucí použití</param>
        public GDecimal(GDecimal source,GDbTypeCopyOptions copyOptions) : base(source as GDbType) {
            m_dDefaultValue = source.m_dDefaultValue;
        } // end method

        /// <summary>soukromý konstruktor</summary>
        /// <param name="readOnly">pøíznak hodnoty urèené pouze pro ètení</param>
        private GDecimal(bool readOnly) : base(true) {
            if(readOnly) SetReadOnly();
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="value">inicializaèní hodnota</param>
        public GDecimal(decimal ? value) : base(true) {
            if(value != null) ValueInstance = value;
        } // end method

		#endregion

		#region vlastnosti

		/// <summary>hodnota typu desetinné èíslo s pevnou øádovou èárkou s ohledem na hodnotu null</summary>
		public Decimal Value {
			get {
				if(IsNull) throw new GException(23200007,23200003,ThisAssembly); // pokus o pøístup k hodnotì null
				return ((Decimal) ValueInstance);
			} // end method
			set {ValueInstance = value;} 
		} // end property

		/// <summary>výchozí hodnota</summary>
		public decimal DefaultValue {
			get {return m_dDefaultValue;}
			set {
                if(IsReadOnly) throw new GException(23200089,23200084,ThisAssembly); // hodnota je urèena pouze ke ètení
                m_dDefaultValue = value;
            } // end method
		} // end property

		/// <summary>hodnota typu desetinné èíslo s pevnou øádovou èárkou bez ohledu na hodnotu null</summary>
		public decimal BaseValue {
			get {return IsNull ? DefaultValue : (decimal) ValueInstance;}
		} // end property

        /// <summary>instance hodnoty null urèená pouze pro ètení</summary>
        public static GDecimal Null {
            get {return m_cgmNull;}
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(GDecimal).Assembly;}
        } // end property

        /// <summary>poèet desetinných míst</summary>
        public int Precision {
            get {
                int[] bits = Decimal.GetBits(Value);
                return ((bits[3] & 0x00FF0000) >> 16);
            } // end method
        } // end property

        /// <summary>pøíznak záporné hodnoty</summary>
        public bool IsNegative {
            get {
                int[] bits = Decimal.GetBits(Value);
                return ((bits[3] & 0x80000000) > 0);
            } // end method
        } // end property
         
        /// <summary>maximální poèet platných èíslic za desetinným znaménkem</summary>
        /// <remarks>jedná se pouze o doplòkový popisný údaj bez vlivu na funkènost tøídy</remarks>
        public ushort? MaxPrecision {
            get { return m_nMaxPrecision; }
            set { m_nMaxPrecision = value; }
        } // end properties

        /// <summary>maximální poèet platných èíslic celkem</summary>
        /// <remarks>jedná se pouze o doplòkový popisný údaj bez vlivu na funkènost tøídy</remarks>
        public ushort? MaxNumbers {
            get { return m_nMaxNumbers; }
            set { m_nMaxNumbers = value; }
        } // end properties

        #endregion

        #region pøetížené metody

        /// <summary>získání výchozí hodnoty</summary>
        /// <returns>výchozí hodnota typu desetinné èíslo s pevnou øádovou èárkou</returns>
        protected override object GetDefaultValue() {
			return DefaultValue;
		} // end method

		/// <summary>konverze vstupní hodnoty</summary>
		/// <param name="sourceValue">vstupní hodnota</param>
		/// <returns>hodnota typu desetinné èíslo s pevnou øádovou èárkou</returns>
		protected override object ConvertValue(object sourceValue) {
			decimal l_mReturnValue = 0;
            if(sourceValue is decimal) l_mReturnValue = (decimal) sourceValue;
            else if(sourceValue is bool) l_mReturnValue = (bool) sourceValue ? 1 : 0;
            else if(sourceValue is int) l_mReturnValue = Convert.ToDecimal((int) sourceValue);
            else if(sourceValue is double) {
                try {
                    l_mReturnValue = Convert.ToDecimal((double) sourceValue);
                } // end try 
                catch { 
                    throw new GInvalidCastException(23200050); 
                } // end catch
            } else if(sourceValue is long) l_mReturnValue = Convert.ToDecimal((long) sourceValue);
            else if(sourceValue is short) l_mReturnValue = Convert.ToDecimal((short) sourceValue);
            else if(sourceValue is float) l_mReturnValue = Convert.ToDecimal((float) sourceValue);
            else if(sourceValue is sbyte) l_mReturnValue = Convert.ToDecimal((sbyte) sourceValue);
            else if(sourceValue is byte) l_mReturnValue = Convert.ToDecimal((byte) sourceValue);
            else if(sourceValue is ushort) l_mReturnValue = Convert.ToDecimal((ushort) sourceValue);
            else if(sourceValue is uint) l_mReturnValue = Convert.ToDecimal((uint) sourceValue);
            else if(sourceValue is ulong) l_mReturnValue = Convert.ToDecimal((ulong) sourceValue);
            else throw new GException(23200008,23200004,ThisAssembly); // pokus o nepodporovanou konverzi typù
            return l_mReturnValue;
		} // end method

		/// <summary>porovnání dvou hodnot s ohledem na typ</summary>
		/// <param name="valueOne">první hodnota</param>
		/// <param name="valueTwo">druhá hodnota</param>
		/// <returns>true pokud se hodnoty shodují, jinak false</returns>
		protected override bool CompareValues(object valueOne,object valueTwo) {
			return (decimal) valueOne == (decimal) valueTwo;
		} // end method

        /// <summary>vytvoøení identické kopie objektu</summary>
        /// <returns>nová instance objektu</returns>
        /// <remarks>pøíznak hodnoty urèené pouze ke ètení je u novì vzniklé instance vždy negativní</remarks>
        public override object Clone() {
            return new GDecimal(this,null);
        } // end method

        /// <summary>nastavení hodnoty s pøípadnou pøedchozí typovou konverzí</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        public override void ParseValue(object inputValue) {
            GDecimal l_gdmValue = GDecimal.Parse(inputValue,true);
            ValueInstance = l_gdmValue.IsNull ? null : l_gdmValue.DbValue;
        } // end method

        /// <summary>porovnání hodnoty se vstupní hodnotou stejného typu</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>hodnota menší než nula pokud aktuální hodnota je v rámci tøídìní pøed vstupní hodnotou, hodnota nula pokud je na stejné pozici nebo hodnota vìtší než nula pokud je za vstupní hodnotou</returns>
        public override int CompareTo(object inputValue) {
            if(inputValue == null) return 1;
            GDecimal l_gbInputValue = inputValue as GDecimal;
            if(l_gbInputValue == null) throw new GArgumentException(23200418);
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
            GDecimal l_gdmInputObject = inputObject as GDecimal;
            return l_gdmInputObject!=null && l_gdmInputObject==this;
		} // end method

        /// <summary>operátor porovnání</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì shody hodnot, jinak false</returns>
		public static bool operator ==(GDecimal a, GDecimal b) {
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
		public static bool operator !=(GDecimal a, GDecimal b) {
            return (a == b) == false;
        } // end method

		/// <summary>operátor sèítání</summary>
		/// <param name="a">levý operand</param>
		/// <param name="b">pravý operand</param>
		/// <returns>souèet</returns>
		public static GDecimal operator +(GDecimal a, GDecimal b) {
            decimal l_dmValueA = a.Value;
            decimal l_dmValueB = b.Value;
            decimal l_dmSum = checked((decimal)(l_dmValueA + l_dmValueB));
            GDecimal l_gdmSum  = new GDecimal(l_dmSum);
			if(a.SourceColumn == b.SourceColumn) l_gdmSum.SourceColumn = a.SourceColumn;
            return l_gdmSum;
		} // end method

		/// <summary>implicitní konverze na decimal</summary>
		/// <param name="a">konvertovaná hodnota</param>
		/// <returns>hodnota typu decimal</returns>
		public static implicit operator decimal(GDecimal a) {
			return a.Value;
		} // end method

		/// <summary>implicitní konverze na GDecimal z decimal</summary>
		/// <param name="a">konvertovaná hodnota</param>
		/// <returns>hodnota typu GDecimal</returns>
		public static implicit operator GDecimal(decimal a) {
			return new GDecimal(a);
		} // end method

        /// <summary>implicitní konverze z GDecimal na decimal ?</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu decimal ?</returns>
        public static implicit operator decimal ? (GDecimal a) {
            return a == null || a.IsNull ? null : (decimal ?) a.Value;
        } // end method

        /// <summary>implicitní konverze z decimal ? na GDecimal</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GDecimal</returns>
        public static implicit operator GDecimal(decimal ? a) {
            return a == null ? new GDecimal() : new GDecimal((decimal) a);
        } // end method	

		/// <summary>implicitní konverze z int na GDecimal</summary>
		/// <param name="a">konvertovaná hodnota</param>
		/// <returns>hodnota typu GDecimal</returns>
		public static implicit operator GDecimal(int a) {
			return new GDecimal((decimal) a);
		} // end method

        /// <summary>implicitní konverze z int ? na GDecimal</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GDecimal</returns>
        public static implicit operator GDecimal(int ? a) {
            return a == null ? new GDecimal() : new GDecimal((int) a);
        } // end method	

        /// <summary>implicitní konverze na GDecimal z GInt64</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GDecimal</returns>
        public static implicit operator GDecimal(GInt64 a)
        {
            GDecimal b;
            if (a.IsNull) b = new GDecimal();
            else b = new GDecimal((decimal)a.Value);
            b.SourceColumn = a.SourceColumn;
            return b;
        } // end method

        /// <summary>implicitní konverze na GDecimal z GInt32</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GDecimal</returns>
        public static implicit operator GDecimal(GInt32 a) {
			GDecimal b;
			if (a.IsNull) b = new GDecimal();
			else b = new GDecimal((decimal) a.Value);
			b.SourceColumn = a.SourceColumn;
			return b;
		} // end method

		/// <summary>implicitní konverze na GDecimal z GInt16</summary>
		/// <param name="a">konvertovaná hodnota</param>
		/// <returns>hodnota typu GDecimal</returns>
		public static implicit operator GDecimal(GInt16 a) {
			GDecimal b;
			if (a.IsNull) b = new GDecimal();
			else b = new GDecimal((decimal) a.Value);
			b.SourceColumn = a.SourceColumn;
			return b;
		} // end method

		/// <summary>implicitní konverze na GDecimal z double</summary>
		/// <param name="d">konvertovaná hodnota</param>
		/// <returns>hodnota typu GDecimal</returns>
		public static explicit operator GDecimal(double d) {
			return new GDecimal((decimal) d);
		} // end method

        /// <summary>operátor vìtší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je vìtší než hodnota pravého, jinak false</returns>
        public static bool operator >(GDecimal a,GDecimal b) {
            if(a == b) return false;
            else {
                if((object)a == null || (object)b == null) throw new GArgumentNullException(23200329);
                if(a.IsNull || b.IsNull) throw new GException(23200330,23200003,ThisAssembly); // pokus o pøístup k hodnotì null
                return a.Value > b.Value;
            } // end if
        } // end method

        /// <summary>operátor menší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je menší než hodnota pravého, jinak false</returns>
        public static bool operator <(GDecimal a,GDecimal b) {
            if(a == b) return false;
            else {
                if((object)a == null || (object)b == null) throw new GArgumentNullException(23200331);
                if(a.IsNull || b.IsNull) throw new GException(23200332,23200003,ThisAssembly); // pokus o pøístup k hodnotì null
                return a.Value < b.Value;
            } // end if
        } // end method

        /// <summary>operátor vìtší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je vìtší nebo rovná hodnotì pravého, jinak false</returns>
        public static bool operator >=(GDecimal a,GDecimal b) {
            if(a == b) return true;
            else return a > b;
        } // end method

        /// <summary>operátor menší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je menší nebo rovná hodnotì pravého, jinak false</returns>
        public static bool operator <=(GDecimal a,GDecimal b) {
            if(a == b) return true;
            else return a < b;
        } // end method

		#endregion

        #region statická metoda Parse

        /// <summary>obecná typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>výstupní hodnota</returns>
        public static GDecimal Parse(object inputValue) {
            return Parse(inputValue,false);
        } // end method
		
        /// <summary>obecná typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="acceptNull">pøíznak pøípustnosti hodnoty null</param>
        /// <returns>výstupní hodnota</returns>
        public static GDecimal Parse(object inputValue,bool acceptNull) {
            GDecimal l_gdmNumber = null;
            if(inputValue == null || (acceptNull && inputValue is string && inputValue.ToString().Trim() == String.Empty)) {
                if(acceptNull) l_gdmNumber = new GDecimal();
                else throw new GArgumentNullException(23200057); // neinicializovaná hodnota parametru
            } else if(inputValue is string) l_gdmNumber = Parse((string) inputValue);
            else if(inputValue is GDate || inputValue is GDateTime || inputValue is GEkoDate) throw new GInvalidCastException(23200058); // pokus o nepovolenou typovou konverzi
            else if(inputValue is GString && ((GString)inputValue).IsNull == false) l_gdmNumber = Parse(inputValue.ToString());
            else {
                l_gdmNumber = new GDecimal();
                if(inputValue is IGDbType) l_gdmNumber.DbValue = ((IGDbType) inputValue).DbValue;
                else l_gdmNumber.DbValue = inputValue;
            } // end if
            return l_gdmNumber;
        } // end method

        /// <summary>typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>výstupní hodnota</returns>
        public static GDecimal Parse(string inputValue) {
            try {
                if(decimal.TryParse(inputValue,out decimal result)) return result;
                else if(ChangeSeparator(inputValue,out string outputValue) && decimal.TryParse(outputValue,out result)) return result;
                else return decimal.Parse(inputValue);
            } // end try
            catch(Exception e) {
                if(inputValue == null) inputValue = NullString;
                else if((inputValue = inputValue.Trim()) == String.Empty) inputValue = EmptyString;
                throw new GException(23200069,21350001,ThisAssembly,e,inputValue,nameof(GDecimal)); //RC-EX 21350001 : vstupní hodnotu {0} nelze použít pro inicializaci datového typu {1}
            } // end catch
        } // end method

        /// <summary>typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="formatProvider">hodnota typu <see cref="IFormatProvider"/> s informacemi o formátu vstupní hodnoty</param>
        /// <returns>výstupní hodnota</returns>
        public static GDecimal Parse(string inputValue,IFormatProvider formatProvider) {
            try {
                if(decimal.TryParse(inputValue,NumberStyles.Number,formatProvider,out decimal result)) return result;
                else if(ChangeSeparator(inputValue,out string outputValue) && decimal.TryParse(outputValue,NumberStyles.Number,formatProvider,out result)) return result;
                else return decimal.Parse(inputValue,formatProvider);
            } // end try
            catch(Exception e) {
                if(inputValue == null) inputValue = NullString;
                else if((inputValue = inputValue.Trim()) == String.Empty) inputValue = EmptyString;
                throw new GException(23200070,21350001,ThisAssembly,e,inputValue,nameof(GDecimal)); //RC-EX 21350001 : vstupní hodnotu {0} nelze použít pro inicializaci datového typu {1}
            } // end catch
        } // end method

        /// <summary>typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="numberStyles">hodnota typu <see cref="NumberStyles"/> stanovující povolený formát èísla</param>
        /// <returns>výstupní hodnota</returns>
        public static GDecimal Parse(string inputValue, NumberStyles numberStyles)	{
            try {
                if(decimal.TryParse(inputValue,numberStyles,null,out decimal result)) return result;
                else if(ChangeSeparator(inputValue,out string outputValue) && decimal.TryParse(outputValue,numberStyles,null,out result)) return result;
                else return decimal.Parse(inputValue,numberStyles);
            } // end try
            catch(Exception e) {
                if(inputValue == null) inputValue = NullString;
                else if((inputValue = inputValue.Trim()) == String.Empty) inputValue = EmptyString;
                throw new GException(23200071,21350001,ThisAssembly,e,inputValue,nameof(GDecimal)); //RC-EX 21350001 : vstupní hodnotu {0} nelze použít pro inicializaci datového typu {1}
            } // end catch
        } // end method

        /// <summary>typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="numberStyles">hodnota typu <see cref="NumberStyles"/> stanovující povolený formát èísla</param>
        /// <param name="formatProvider">hodnota typu <see cref="IFormatProvider"/> s informacemi o formátu vstupní hodnoty</param>
        /// <returns>výstupní hodnota</returns>
        public static GDecimal Parse(string inputValue, NumberStyles numberStyles, IFormatProvider formatProvider) {
            try {
                if(decimal.TryParse(inputValue,numberStyles,formatProvider,out decimal result)) return result;
                else if(ChangeSeparator(inputValue,out string outputValue) && decimal.TryParse(outputValue,numberStyles,formatProvider,out result)) return result;
                else return decimal.Parse(inputValue,numberStyles,formatProvider);
            } // end try
            catch(Exception e) {
                if(inputValue == null) inputValue = NullString;
                else if((inputValue = inputValue.Trim()) == String.Empty) inputValue = EmptyString;
                throw new GException(23200072,21350001,ThisAssembly,e,inputValue,nameof(GDecimal)); //RC-EX 21350001 : vstupní hodnotu {0} nelze použít pro inicializaci datového typu {1}
            } // end catch
        } // end method

        /// <summary>zámìna oddìlovaèe desetinných míst z teèky na èárku a naopak</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="outputValue">výstupní hodnota</param>
        /// <returns>pøíznak úspìšné zámìny oddìlovaèe desetinných míst</returns>
        private static bool ChangeSeparator(string inputValue,out string outputValue) {
            outputValue = null;
            if(String.IsNullOrWhiteSpace(inputValue) == false) {
                var l_oNumberFormat = Thread.CurrentThread.CurrentCulture.NumberFormat;
                if(l_oNumberFormat.NumberGroupSeparator.In(".",",") == false) {
                    int l_nIndex = -1;
                    if(
                        (l_oNumberFormat.NumberDecimalSeparator == "." && (l_nIndex = inputValue.LastIndexOf(',')) > -1) ||
                        (l_oNumberFormat.NumberDecimalSeparator == "," && (l_nIndex = inputValue.LastIndexOf('.')) > -1)
                    ) {
                        StringBuilder l_oStringBuilder = new StringBuilder(inputValue);
                        l_oStringBuilder[l_nIndex] = l_oNumberFormat.NumberDecimalSeparator[0];
                        outputValue = l_oStringBuilder.ToString();
                    } // end if
                } // end if
            } // end if
            return outputValue != null;
        } // end method

        #endregion

        #region pøetížená metoda ToString

        /// <summary>pøevod hodnoty na text</summary>
        /// <returns>textová reprezentace hodnoty</returns>
        public override string ToString() {
            return BaseValue.ToString();
        } // end method

        /// <summary>pøevod hodnoty na text</summary>
        /// <param name="formatProvider">hodnota typu <see cref="IFormatProvider"/> s informacemi o požadovaném formátu</param>
        /// <returns>textová reprezentace hodnoty</returns>
        public override string ToString(IFormatProvider formatProvider) {
            return BaseValue.ToString(formatProvider);
        } // end method

        /// <summary>pøevod hodnoty na text</summary>
        /// <param name="format">specifikace požadovaném formátu</param>
        /// <returns>textová reprezentace hodnoty</returns>
        public virtual string ToString(string format) {
            return BaseValue.ToString(format);
        } // end method

        /// <summary>pøevod hodnoty na text</summary>
        /// <param name="format">specifikace požadovaném formátu</param>
        /// <param name="formatProvider">hodnota typu <see cref="IFormatProvider"/> s informacemi o požadovaném formátu</param>
        /// <returns>textová reprezentace hodnoty</returns>
        public virtual string ToString(string format, IFormatProvider formatProvider) {
            return BaseValue.ToString(format,formatProvider);
        } // end method

        /// <summary>pøevod hodnoty na text</summary>
        /// <param name="involveNull">pøíznak zahrnutí hodnoty null</param>
        /// <returns>textová reprezentace hodnoty</returns>
        public override string ToString(bool involveNull) {
            return (involveNull && IsNull) ? NullString : BaseValue.ToString();
        } // end method

        #endregion

        #region statické metody pro zaokrouhlování

		/// <summary>aritmetické zaokrouhlení na celé èíslo</summary>
		/// <param name="source">hodnota k zaokrouhlení</param>
		/// <returns>nová instance GDecimal se zaokrouhlenou hodnotou</returns>
        /// <remarks>Pøi zaokrouhlení je použit klasický algoritmus, tzn. že na rozdíl od metody Decimal.Round() se nepoužívá zaokrouhlení k nejbližší sudé hodnotì.</remarks>
		public static GDecimal Round(GDecimal source) {
			return GDecimal.Round(source,0);
		} // end method

		/// <summary>aritmetické zaokrouhlení desetinného èísla</summary>
		/// <param name="source">hodnota k zaokrouhlení</param>
		/// <param name="precision">kladná hodnota udává požadovaný poèet desetinných míst, záporná hodnota naproti tomu zpùsobí zakrouhlení v celoèíselných øádech</param>
		/// <returns>nová instance GDecimal se zaokrouhlenou hodnotou</returns>
		/// <remarks>Pøi zaokrouhlení je použit klasický algoritmus, tzn. že na rozdíl od metody Decimal.Round() se nepoužívá zaokrouhlení k nejbližší sudé hodnotì.</remarks>
        public static GDecimal Round(GDecimal source, int precision) {
            decimal l_mRoundedValue = Decimal.MinValue;
            decimal l_mAddition = Decimal.Zero;
            string l_sSourceValue = String.Empty;
            string l_sRoundedValue = String.Empty;
            if(precision < 0) {
                // zakrouhlení v celoèíselných øádech
                l_mRoundedValue = Decimal.Zero;
                l_sSourceValue = Decimal.Truncate(Math.Abs(source.Value)).ToString();
                if((precision=Math.Abs(precision)) <= l_sSourceValue.Length) {
                    if((int)(l_sSourceValue[l_sSourceValue.Length - precision] - '0') > 4) l_mAddition = (decimal) Math.Pow(10,precision);
                    if(precision < l_sSourceValue.Length) {
                        l_sRoundedValue = l_sSourceValue.Substring(0,l_sSourceValue.Length - precision) + new string('0',precision);
                        l_mRoundedValue = Decimal.Parse(l_sRoundedValue);
                    } // end if
                    l_mRoundedValue += l_mAddition;
                } // end if
            } else {
                // zaokrouhlení desetinných míst
                if(precision < source.Precision) {
                    l_sSourceValue = Math.Abs(source.Value).ToString();
                    if((int)(l_sSourceValue[l_sSourceValue.Length - source.Precision + precision] - '0') > 4) l_mAddition = (decimal) Math.Pow(10,-precision);
                    l_sRoundedValue = l_sSourceValue.Substring(0,l_sSourceValue.Length - source.Precision + precision);
                    l_mRoundedValue = Decimal.Parse(l_sRoundedValue) + l_mAddition;
                } // end if
            } // end if
            if(l_mRoundedValue == Decimal.MinValue) return (GDecimal) source.Clone();
            else return new GDecimal(source.IsNegative ? Decimal.Negate(l_mRoundedValue) : l_mRoundedValue,source.IsNullable,source.SourceColumn);
        } // end method

        /// <summary>oøíznutí desetinných míst</summary>
        /// <param name="source">hodnota k oøíznutí</param>
        /// <returns>nová instance GDecimal obsahující pouze celoèíselnou èást pùvodní hodnoty</returns>
        public static GDecimal Floor(GDecimal source) {
            return GDecimal.Floor(source,0);
        } // end method

        /// <summary>zaokrouhlení hodnoty na nejbližší nižší èíslo s danou pøesností</summary>
        /// <param name="source">hodnota k zaokrouhlení</param>
        /// <param name="precision">kladná hodnota udává požadovaný poèet desetinných míst, záporná hodnota naproti tomu zpùsobí zakrouhlení v celoèíselných øádech</param>
        /// <returns>nová instance GDecimal s hodnotou zaokrouhlenou smìrem dolù</returns>
        public static GDecimal Floor(GDecimal source, int precision) {
            decimal l_mRoundedValue = Decimal.MinValue;
            string l_sSourceValue = String.Empty;
            string l_sRoundedValue = String.Empty;
            if(precision < 0) {
                // zakrouhlení v celoèíselných øádech
                l_mRoundedValue = Decimal.Zero;
                l_sSourceValue = Decimal.Truncate(Math.Abs(source.Value)).ToString();
                if((precision=Math.Abs(precision)) <= l_sSourceValue.Length) {
                    if(precision < l_sSourceValue.Length) {
                        l_sRoundedValue = l_sSourceValue.Substring(0,l_sSourceValue.Length - precision) + new string('0',precision);
                        l_mRoundedValue = Decimal.Parse(l_sRoundedValue);
                    } // end if
                } // end if
            } else {
                // zaokrouhlení desetinných míst
                if(precision < source.Precision) {
                    l_sSourceValue = Math.Abs(source.Value).ToString();
                    l_sRoundedValue = l_sSourceValue.Substring(0,l_sSourceValue.Length - source.Precision + precision);
                    l_mRoundedValue = Decimal.Parse(l_sRoundedValue);
                } // end if
            } // end if
            if(l_mRoundedValue == Decimal.MinValue) return (GDecimal) source.Clone();
            else return new GDecimal(source.IsNegative ? Decimal.Negate(l_mRoundedValue) : l_mRoundedValue,source.IsNullable,source.SourceColumn);
        } // end method

        /// <summary>zaokrouhlení hodnoty na nejbližší vyšší celé èíslo</summary>
        /// <param name="source">hodnota k zaokrouhlení</param>
        /// <returns>nová instance GDecimal s celoèíselnou hodnotou zaokrouhlenou smìrem nahoru</returns>
        public static GDecimal Ceil(GDecimal source) {
            return GDecimal.Ceil(source,0);
        } // end method

        /// <summary>zaokrouhlení hodnoty na nejbližší vyšší èíslo s danou pøesností</summary>
        /// <param name="source">hodnota k zaokrouhlení</param>
        /// <param name="precision">kladná hodnota udává požadovaný poèet desetinných míst, záporná hodnota naproti tomu zpùsobí zakrouhlení v celoèíselných øádech</param>
        /// <returns>nová instance GDecimal s hodnotou zaokrouhlenou smìrem nahoru</returns>
        public static GDecimal Ceil(GDecimal source, int precision) {
            decimal l_mRoundedValue = Decimal.MinValue;
            decimal l_mAddition = Decimal.Zero;
            string l_sSourceValue = String.Empty;
            string l_sRoundedValue = String.Empty;
            if(precision < 0) {
                // zakrouhlení v celoèíselných øádech
                l_sSourceValue = Decimal.Truncate(Math.Abs(source.Value)).ToString();
                if((precision=Math.Abs(precision)) < l_sSourceValue.Length) {
                    if( Decimal.Parse(Math.Abs(source.Value).ToString().Substring(l_sSourceValue.Length - precision)) != 0) l_mAddition = (decimal) Math.Pow(10,precision);
                    l_sRoundedValue = l_sSourceValue.Substring(0,l_sSourceValue.Length - precision) + new string('0',precision);
                    l_mRoundedValue = Decimal.Parse(l_sRoundedValue) + l_mAddition;
                } else {
                    l_mRoundedValue = (decimal) Math.Pow(10,precision);
                } // end if
            } else {
                // zaokrouhlení desetinných míst
                if(precision < source.Precision) {
                    l_sSourceValue = Math.Abs(source.Value).ToString();
                    if( Decimal.Parse(l_sSourceValue.Substring(l_sSourceValue.Length - source.Precision + precision)) != 0 ) l_mAddition = (decimal) Math.Pow(10,-precision);
                    l_sRoundedValue = l_sSourceValue.Substring(0,l_sSourceValue.Length - source.Precision + precision);
                    l_mRoundedValue = Decimal.Parse(l_sRoundedValue) + l_mAddition;
                } // end if
            } // end if
            if(l_mRoundedValue == Decimal.MinValue) return (GDecimal) source.Clone();
            else return new GDecimal(source.IsNegative ? Decimal.Negate(l_mRoundedValue) : l_mRoundedValue,source.IsNullable,source.SourceColumn);
        } // end method

        #endregion

        #region Veøejné metody TryParse() - naplòující interface IGDbTypeNumber
        /// <summary>
        /// Pokusí se o pøevod na cílový typ GInt16
        /// </summary>
        /// <param name="vysledek">Novì vytvoøený objekt typu GInt16 s nastavenou hodnotou podle vstupu. Pokud nelze pøevést, potom je zde NULL</param>
        /// <returns>Pøíznak, že pøevod byl požadovaný cílový typ byl realizován</returns>
        public bool TryParse(out GInt16 vysledek)
        {
            bool success = false;
            vysledek = null;
            if (this.IsNull)
            {
                vysledek = new GInt16(null);
                success = true;
            }
            else
            {
                try
                {
                    vysledek = new GInt16(Convert.ToInt16(this.DbValue));
                    success = true;
                }
                catch (OverflowException) { }
            }
            return (success);
        }

        /// <summary>
        /// Pokusí se o pøevod na cílový typ GInt32
        /// </summary>
        /// <param name="vysledek">Novì vytvoøený objekt typu GInt16 s nastavenou hodnotou podle vstupu. Pokud nelze pøevést, potom je zde NULL</param>
        /// <returns>Pøíznak, že pøevod byl požadovaný cílový typ byl realizován</returns>
        public bool TryParse(out GInt32 vysledek)
        {
            bool success = false;
            vysledek = null;
            if (this.IsNull)
            {
                vysledek = new GInt32(null);
                success = true;
            }
            else
            {
                try
                {
                    vysledek = new GInt32(Convert.ToInt32(this.DbValue));
                    success = true;
                }
                catch (OverflowException) { }
            }
            return (success);
        }

        /// <summary>
        /// Pokusí se o pøevod na cílový typ GInt64
        /// </summary>
        /// <param name="vysledek">Novì vytvoøený objekt typu GInt16 s nastavenou hodnotou podle vstupu. Pokud nelze pøevést, potom je zde NULL</param>
        /// <returns>Pøíznak, že pøevod byl požadovaný cílový typ byl realizován</returns>
        public bool TryParse(out GInt64 vysledek)
        {
            bool success = false;
            vysledek = null;
            if (this.IsNull)
            {
                vysledek = new GInt64(null);
                success = true;
            }
            else
            {
                try
                {
                    vysledek = new GInt64(Convert.ToInt32(this.DbValue));
                    success = true;
                }
                catch (OverflowException) { }
            }
            return (success);
        }

        /// <summary>
        /// Pøevede hodnotu na short - mùže vyvolat chyby OverflowException nebo NullReferenceException
        /// </summary>
        /// <returns></returns>
        public short ToInt16()
        {
            short vysledek;
            if (this.IsNull)
                throw new NullReferenceException();
            else
            {
                vysledek = Convert.ToInt16(this.DbValue);
            }
            return (vysledek);
        }

        /// <summary>
        /// Pøevede hodnotu na int - mùže vyvolat chyby OverflowException nebo NullReferenceException
        /// </summary>
        /// <returns></returns>
        public int ToInt32()
        {
            int vysledek;
            if (this.IsNull)
                throw new NullReferenceException();
            else
            {
                vysledek = Convert.ToInt32(this.DbValue);
            }
            return (vysledek);
        }

        /// <summary>
        /// Pøevede hodnotu na long - mùže vyvolat chyby OverflowException nebo NullReferenceException
        /// </summary>
        /// <returns></returns>
        public long ToInt64()
        {
            long vysledek;
            if (this.IsNull)
                throw new NullReferenceException();
            else
            {
                vysledek = Convert.ToInt64(this.DbValue);
            }
            return (vysledek);
        }
        #endregion

        #region veøejné metody

        /// <summary>zjištìní zda se hodnota nachází v pøedaném výètu hodnot</summary>
        /// <param name="items">výèet hodnot</param>
        /// <returns>true v pøípadì, že se hodnota nachází v pøedaném výètu hodnot, jinak false</returns>
        public bool In(params GDecimal[] items) {
            if(items == null) return false;
            else if(IsNull) return items.Where(item => item.IsNull).Any();
            else return items.Where(item => item.BaseValue == BaseValue).Any();
        } // end method

        /// <summary>zjištìní zda se hodnota nachází v pøedaném výètu hodnot</summary>
        /// <param name="items">výèet hodnot</param>
        /// <returns>true v pøípadì, že se hodnota nachází v pøedaném výètu hodnot, jinak false</returns>
        public bool In(params decimal[] items) {
            if(items == null || IsNull) return false;
            else return Array.IndexOf<decimal>(items,BaseValue) > -1;
        } // end method

        #endregion

        #region veøejné statické metody

        /// <summary>vrací instanci s vìtší hodnotou</summary>
        /// <param name="first">první instance</param>
        /// <param name="second">druhá instance</param>
        /// <returns>instance s vìtší hodnotou</returns>
        public static GDecimal Max(GDecimal first,GDecimal second) {
            return (first > second) ? first : second;
        } // end method

        /// <summary>vrací instanci s menší hodnotou</summary>
        /// <param name="first">první instance</param>
        /// <param name="second">druhá instance</param>
        /// <returns>instance s menší hodnotou</returns>
        public static GDecimal Min(GDecimal first,GDecimal second) {
            return (first < second) ? first : second;
        } // end method

        #endregion

    } // end class

} // end namespace
