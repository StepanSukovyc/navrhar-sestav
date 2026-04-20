//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>          Gordic.General.GBoolean.cs                  </Name>
//    <Description>   databázová hodnota typu logická 0 nebo 1    </Description>
//    <Author>        Jan Kuttich                                 </Author>
//    <Copyright>     © GORDIC spol. s r. o. 1993 - 2021  </Copyright>
//    <Created>       2007-12-11                                  </Created>
//  </FileHeader>

using System;
using System.Data.OleDb;
using System.ComponentModel;
using System.Reflection;
using System.Diagnostics;
using System.Linq;

namespace Gordic.General {

    /// <summary>databázová hodnota typu logická 0 nebo 1</summary>
    [Serializable]
	[TypeConverter(typeof(GBooleanConverter))]
    public class GBoolean : GDbType {

        #region soukromé èleny

        /// <summary>výchozí hodnota</summary>
        private bool m_nDefaultValue = false;

        /// <summary>instance hodnoty null urèená pouze pro ètení</summary>
        private static readonly GBoolean m_cgnNull = new GBoolean(true,0);

        #endregion

		#region konstruktory

		/// <summary>veøejný konstruktor</summary>
		public GBoolean() : base(true) {}

		/// <summary>veøejný konstruktor</summary>
        /// <param name="booleanValue">inicializaèní hodnota typu logická 0 nebo 1</param>
		public GBoolean(bool booleanValue) : base(true) {
			ValueInstance = booleanValue;
		} // end method

		/// <summary>veøejný konstruktor</summary>
        /// <param name="booleanValue">inicializaèní hodnota typu typu logická 0 nebo 1</param>
		/// <param name="isNullable">pøíznak povolení hodnoty null</param>
		public GBoolean(bool booleanValue,bool isNullable) : base(isNullable) {
			ValueInstance = booleanValue;
		} // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="booleanValue">inicializaèní hodnota typu typu logická 0 nebo 1</param>
		/// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
		public GBoolean(bool booleanValue,string sourceColumn) : this(booleanValue,true,sourceColumn) {
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="booleanValue">inicializaèní hodnota typu typu logická 0 nebo 1</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GBoolean(bool booleanValue,bool isNullable,string sourceColumn) : base(isNullable) {
			ValueInstance = booleanValue;
			SourceColumn = sourceColumn;
		} // end method

        /// <summary>veøejný kopírovací konstruktor</summary>
        /// <param name="source">zdrojová instance</param>
        /// <param name="copyOptions">vhrazeno pro budoucí použití</param>
        public GBoolean(GBoolean source,GDbTypeCopyOptions copyOptions) : base(source as GDbType) {
            m_nDefaultValue = source.m_nDefaultValue;
        } // end method

        /// <summary>veøejný kopírovací konstruktor</summary>
        /// <param name="source">zdrojová instance</param>
        public GBoolean(GBoolean source) : base(source as GDbType)
        {
            m_nDefaultValue = source.m_nDefaultValue;
            SourceColumn = source.SourceColumn;
        } // end method

        /// <summary>soukromý konstruktor</summary>
        /// <param name="readOnly">pøíznak hodnoty urèené pouze pro ètení</param>
        /// <param name="unused">nevyužívaný parametr</param>
        private GBoolean(bool readOnly,int unused) : base(true) {
            if(readOnly) SetReadOnly();
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="value">inicializaèní hodnota</param>
        public GBoolean(bool ? value) : base(true) {
            if(value != null) ValueInstance = value;
        } // end method

        /// <summary>
        /// Konstruktor s pøevzetím obecné G hodnoty - umí èíslo, text, bool - pro ostatní vyhlásí chybu
        /// </summary>
        /// <param name="hodnota"></param>
        public GBoolean( IGDbType hodnota ) : base( true )
        {
            if (hodnota != null && !hodnota.IsNull)
            {
                if (hodnota is GBoolean gBoolean)
                    ValueInstance = gBoolean.ValueInstance;
                if (hodnota is GString text)
                    this.ValueInstance = text.Value.ToBool();
                else if (hodnota is IGDbTypeNumber gcislo)
                    this.ValueInstance = (gcislo.ToInt64() != 0);
                else
                    throw new GInvalidCastException(21300063, 21300046, hodnota.GetType().ToString()); //RC-EX 21300046 : Nelze pøevést typ {0} na GBoolean
                SourceColumn = hodnota.SourceColumn;
            }
        }

		#endregion

		#region vlastnosti

        /// <summary>hodnota typu logická 0 nebo 1 s ohledem na hodnotu null</summary>
        public Boolean Value {
            get {
                if(IsNull) throw new GException(23200160,23200003,ThisAssembly); // pokus o pøístup k hodnotì null
                return ((Boolean)ValueInstance);
            } // end method
            set { ValueInstance = value; }
        } // end property

        /// <summary>výchozí hodnota</summary>
        public bool DefaultValue {
            get { return m_nDefaultValue; }
            set {
                if(IsReadOnly) throw new GException(23200161,23200084,ThisAssembly); // hodnota je urèena pouze ke ètení
                m_nDefaultValue = value;
            } // end method
        } // end property

        /// <summary>hodnota typu logická 0 nebo 1 bez ohledu na hodnotu null</summary>
        public bool BaseValue {
            get { return IsNull ? DefaultValue : (bool) ValueInstance; }
        } // end property

        /// <summary>instance hodnoty null urèená pouze pro ètení</summary>
        public static GBoolean Null {
            get { return m_cgnNull; }
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(GBoolean).Assembly; }
        } // end property

		#endregion

		#region pøetížené metody

        // <summary>získání výchozí hodnoty</summary>
        /// <returns>výchozí hodnota typu typu logická 0 nebo 1</returns>
        protected override object GetDefaultValue() {
            return DefaultValue;
        } // end method

        /// <summary>konverze vstupní hodnoty</summary>
        /// <param name="sourceValue">vstupní hodnota</param>
        /// <returns>hodnota typu typu logická 0 nebo 1</returns>
        protected override object ConvertValue(object sourceValue) {
            return Convert(sourceValue);
        } // end method

        /// <summary>konverze vstupní hodnoty</summary>
        /// <param name="sourceValue">vstupní hodnota</param>
        /// <returns>hodnota typu typu logická 0 nebo 1</returns>
        private static bool Convert(object sourceValue) {
            bool l_bReturnValue = false;
            if(sourceValue is bool) l_bReturnValue = (bool)sourceValue;
            else if(sourceValue is short) l_bReturnValue = (short)sourceValue != 0;
            else if(sourceValue is int) l_bReturnValue = (int)sourceValue != 0;
            else if(sourceValue is decimal) l_bReturnValue = (decimal)sourceValue != 0;
            else if(sourceValue is double) l_bReturnValue = (double)sourceValue != 0;
            else if(sourceValue is long) l_bReturnValue = (long)sourceValue != 0;
            else if(sourceValue is float) l_bReturnValue = (float)sourceValue != 0;
            else if(sourceValue is sbyte) l_bReturnValue = (sbyte)sourceValue != 0;
            else if(sourceValue is byte) l_bReturnValue = (byte)sourceValue != 0;
            else if(sourceValue is ushort) l_bReturnValue = (ushort)sourceValue != 0;
            else if(sourceValue is uint) l_bReturnValue = (uint)sourceValue != 0;
            else if(sourceValue is ulong) l_bReturnValue = (ulong)sourceValue != 0;
            else throw new GException(23200162,23200004,ThisAssembly); // pokus o nepodporovanou konverzi typù
            return l_bReturnValue;
        } // end method

        /// <summary>porovnání dvou hodnot s ohledem na typ</summary>
        /// <param name="valueOne">první hodnota</param>
        /// <param name="valueTwo">druhá hodnota</param>
        /// <returns>true pokud se hodnoty shodují, jinak false</returns>
        protected override bool CompareValues(object valueOne,object valueTwo) {
            return (bool)valueOne == (bool)valueTwo;
        } // end method

        /// <summary>vytvoøení identické kopie objektu</summary>
        /// <returns>nová instance objektu</returns>
        /// <remarks>pøíznak hodnoty urèené pouze ke ètení je u novì vzniklé instance vždy negativní</remarks>
        public override object Clone() {
            return new GBoolean(this,null);
        } // end method

        /// <summary>nastavení hodnoty s pøípadnou pøedchozí typovou konverzí</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        public override void ParseValue(object inputValue) {
            GBoolean l_gbValue = GBoolean.Parse(inputValue,true);
            ValueInstance = l_gbValue.IsNull ? null : l_gbValue.DbValue;
        } // end method

        /// <summary>porovnání hodnoty se vstupní hodnotou stejného typu</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>hodnota menší než nula pokud aktuální hodnota je v rámci tøídìní pøed vstupní hodnotou, hodnota nula pokud je na stejné pozici nebo hodnota vìtší než nula pokud je za vstupní hodnotou</returns>
        public override int CompareTo(object inputValue) {
            if(inputValue == null) return 1;
            GBoolean l_gbInputValue = inputValue as GBoolean;
            if(l_gbInputValue == null) throw new GArgumentException(23200415);
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
            GBoolean l_gnInputObject = inputObject as GBoolean;
            return l_gnInputObject != null && l_gnInputObject == this;
        } // end method

        /// <summary>operátor porovnání</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì shody hodnot, jinak false</returns>
        public static bool operator ==(GBoolean a,GBoolean b) {
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
        public static bool operator !=(GBoolean a,GBoolean b) {
            return (a == b) == false;
        } // end method

        /// <summary>implicitní konverze na bool</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu bool</returns>
        public static implicit operator bool(GBoolean a) {
            if(a.IsNull) throw new GException(23200163,23200003,ThisAssembly); // pokus o pøístup k hodnotì null
            return (a.BaseValue);
        } // end method

        /// <summary>implicitní konverze z bool na GBoolean</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GBoolean</returns>
        public static implicit operator GBoolean(bool a) {
            return new GBoolean(a);
        } // end method

        /// <summary>implicitní konverze z GBoolean na bool ?</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu bool ?</returns>
        public static implicit operator bool ? (GBoolean a) {
            return a == null || a.IsNull ? null : (bool ?) a.Value;
        } // end method

        /// <summary>implicitní konverze z bool ? na GBoolean</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GBoolean</returns>
        public static implicit operator GBoolean(bool ? a) {
            return a == null ? new GBoolean() : new GBoolean((bool) a);
        } // end method	

        /// <summary>implicitní konverze ze int na GBoolean</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GBoolean</returns>
        public static implicit operator GBoolean(int a) {
            return new GBoolean(a != 0);
        } // end method

        /// <summary>implicitní konverze z int ? na GBoolean</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GBoolean</returns>
        public static implicit operator GBoolean(int ? a) {
            return a == null ? new GBoolean() : (GBoolean)((int) a);
        } // end method	
        /// <summary>explicitní konverze z GInt16 na GBoolean</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GBoolean</returns>
        public static explicit operator GBoolean(GInt16 a) {
            GBoolean b;
            if(a.IsNull) b = new GBoolean();
            else b = new GBoolean(a.BaseValue != 0);
            b.SourceColumn = a.SourceColumn;
            return b;
        } // end method

        /// <summary>explicitní konverze z GInt32 na GBoolean</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GBoolean</returns>
        public static explicit operator GBoolean(GInt32 a) {
            GBoolean b;
            if(a.IsNull) b = new GBoolean();
            else b = new GBoolean(a.BaseValue != 0);
            b.SourceColumn = a.SourceColumn;
            return b;
        } // end method

        /// <summary>explicitní konverze z GDecimal na GBoolean</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GBoolean</returns>
        public static explicit operator GBoolean(GDecimal a) {
            GBoolean b;
            if(a.IsNull) b = new GBoolean();
            else b = new GBoolean(a.BaseValue != 0);
            b.SourceColumn = a.SourceColumn;
            return b;
        } // end method

        /// <summary>operátor vìtší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je vìtší než hodnota pravého, jinak false</returns>
        public static bool operator >(GBoolean a,GBoolean b) {
            if(a == b) return false;
            else {
                if((object)a == null || (object)b == null) throw new GArgumentNullException(23200317);
                if(a.IsNull || b.IsNull) throw new GException(23200318,23200003,ThisAssembly); // pokus o pøístup k hodnotì null
                return a.Value;
            } // end if
        } // end method

        /// <summary>operátor menší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je menší než hodnota pravého, jinak false</returns>
        public static bool operator <(GBoolean a,GBoolean b) {
            if(a == b) return false;
            else {
                if((object)a == null || (object)b == null) throw new GArgumentNullException(23200319);
                if(a.IsNull || b.IsNull) throw new GException(23200320,23200003,ThisAssembly); // pokus o pøístup k hodnotì null
                return b.Value;
            } // end if
        } // end method

        /// <summary>operátor vìtší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je vìtší nebo rovná hodnotì pravého, jinak false</returns>
        public static bool operator >=(GBoolean a,GBoolean b) {
            if(a == b) return true;
            else return a > b;
        } // end method

        /// <summary>operátor menší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je menší nebo rovná hodnotì pravého, jinak false</returns>
        public static bool operator <=(GBoolean a,GBoolean b) {
            if(a == b) return true;
            else return a < b;
        } // end method

		#endregion

		#region statická metoda Parse

		/// <summary>obecná typová konverze</summary>
		/// <param name="inputValue">vstupní hodnota</param>
		/// <returns>výstupní hodnota</returns>
		public static GBoolean Parse(object inputValue) {
            return Parse(inputValue,false);
		} // end method

        /// <summary>obecná typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="acceptNull">pøíznak pøípustnosti hodnoty null</param>
        /// <returns>výstupní hodnota</returns>
        public static GBoolean Parse(object inputValue,bool acceptNull) {
            GBoolean l_gbBoolean = null;
            if(inputValue == null || (acceptNull && inputValue is string && inputValue.ToString().Trim() == String.Empty)) {
                if(acceptNull) l_gbBoolean = new GBoolean();   
                else throw new GArgumentNullException(23200164); // neinicializovaná hodnota parametru
            } else if(inputValue is string) l_gbBoolean = ParseString((string)inputValue);
            else if(inputValue is GDate || inputValue is GDateTime || inputValue is GEkoDate) throw new GInvalidCastException(23200165); // pokus o nepovolenou typovou konverzi
            else if(inputValue is GString && ((GString)inputValue).IsNull == false) l_gbBoolean = ParseString(inputValue.ToString());
            else {
                l_gbBoolean = new GBoolean();
                if(inputValue is IGDbType) l_gbBoolean.DbValue = ((IGDbType)inputValue).DbValue;
                else l_gbBoolean.DbValue = inputValue;
            } // end if
            return l_gbBoolean;
        } // end method
		
        /// <summary>typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>výstupní hodnota</returns>
		private static GBoolean ParseString(string inputValue) {
            GBoolean l_gbBoolean = new GBoolean();
            inputValue = inputValue==null ? String.Empty : inputValue.Trim();
            if(String.Compare(inputValue,Boolean.TrueString,true)==0) l_gbBoolean.Value = true;
            else if(String.Compare(inputValue,GResources.GetResourceText(ThisAssembly,23230007),true)==0) l_gbBoolean.Value = true; // ano
            else if(String.Compare(inputValue,"yes",true)==0) l_gbBoolean.Value = true;
            else if(String.Compare(inputValue,"on",true)==0) l_gbBoolean.Value = true;
            else if(String.Compare(inputValue,Boolean.FalseString,true)==0) l_gbBoolean.Value = false;
            else if(String.Compare(inputValue,GResources.GetResourceText(ThisAssembly,23230008),true)==0) l_gbBoolean.Value = false; // ne
            else if(String.Compare(inputValue,"no",true)==0) l_gbBoolean.Value = false;
            else if(String.Compare(inputValue,"off",true)==0) l_gbBoolean.Value = false;
            else if(String.Compare(inputValue,"y",true)==0) l_gbBoolean.Value = true;
            else if(String.Compare(inputValue,"n",true)==0) l_gbBoolean.Value = false;
            else if(String.Compare(inputValue,GResources.GetResourceText(ThisAssembly,23230007)[0].ToString(),true)==0) l_gbBoolean.Value = true; // ano
            else if(String.Compare(inputValue,GResources.GetResourceText(ThisAssembly,23230008)[0].ToString(),true)==0) l_gbBoolean.Value = false; // ne
            else {
                try {
                    l_gbBoolean.Value = Decimal.Parse(inputValue) != 0;
                } catch { } // end try
            } // end if
            return l_gbBoolean;
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
        /// <param name="involveNull">pøíznak zahrnutí hodnoty null</param>
        /// <returns>textová reprezentace hodnoty</returns>
        public override string ToString(bool involveNull) {
            return (involveNull && IsNull) ? NullString : BaseValue.ToString();
        } // end method

		#endregion

        #region veøejné metody

        /// <summary>zjištìní zda se hodnota nachází v pøedaném výètu hodnot</summary>
        /// <param name="items">výèet hodnot</param>
        /// <returns>true v pøípadì, že se hodnota nachází v pøedaném výètu hodnot, jinak false</returns>
        public bool In(params GBoolean[] items) {
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
        public static GBoolean Max(GBoolean first,GBoolean second) {
            return (first > second) ? first : second;
        } // end method

        /// <summary>vrací instanci s menší hodnotou</summary>
        /// <param name="first">první instance</param>
        /// <param name="second">druhá instance</param>
        /// <returns>instance s menší hodnotou</returns>
        public static GBoolean Min(GBoolean first,GBoolean second) {
            return (first < second) ? first : second;
        } // end method

        #endregion

    } // end class

} // end namespace
