//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GInt64.cs                                    </Name>
//    <Description> databázová hodnota typu celé 64 bitové èíslo                </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2019-07-04                                                  </Created>
//  </FileHeader>

using System;
using System.Data.OleDb;
using System.ComponentModel;
using System.Globalization;
using System.Reflection;
using System.Diagnostics;
using System.Linq;

namespace Gordic.General {
	
    /// <summary>databázová hodnota typu celé 64 bitové èíslo</summary>
	[Serializable]
	[TypeConverter(typeof(GInt64Converter))]
	public class GInt64 : GDbType, IGDbTypeNumber
    {

        #region soukromé èleny

        /// <summary>výchozí hodnota</summary>
        private long m_nDefaultValue = 0;

        /// <summary>instance hodnoty null urèená pouze pro ètení</summary>
        private static readonly GInt64 m_cgnNull = new GInt64(true);

        #endregion

        #region konstruktory

        /// <summary>veøejný konstruktor</summary>
        public GInt64() : base(true) {}

        /// <summary>veøejný konstruktor</summary>
        /// <param name="longValue">inicializaèní hodnota celé 64 bitové èíslo</param>
        public GInt64(long longValue) : base(true) {
            ValueInstance = longValue;
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="longValue">inicializaèní hodnota typu celé 64 bitové èíslo</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        public GInt64(long longValue,bool isNullable) : base(isNullable) {
            ValueInstance = longValue;
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="longValue">inicializaèní hodnota typu celé 64 bitové èíslo</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GInt64(long longValue,string sourceColumn) : this(longValue,true,sourceColumn) {
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="longValue">inicializaèní hodnota typu celé 64 bitové èíslo</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GInt64(long longValue,bool isNullable,string sourceColumn) : base(isNullable) {
            ValueInstance = longValue;
            SourceColumn = sourceColumn;
        } // end method

        /// <summary>veøejný kopírovací konstruktor</summary>
        /// <param name="source">zdrojová instance</param>
        /// <param name="copyOptions">vhrazeno pro budoucí použití</param>
        public GInt64(GInt64 source,GDbTypeCopyOptions copyOptions) : base(source as GDbType) {
            m_nDefaultValue = source.m_nDefaultValue;
        } // end method

        /// <summary>soukromý konstruktor</summary>
        /// <param name="readOnly">pøíznak hodnoty urèené pouze pro ètení</param>
        private GInt64(bool readOnly) : base(true) {
            if(readOnly) SetReadOnly();
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="value">inicializaèní hodnota</param>
        public GInt64(long ? value) : base(true) {
            if(value != null) ValueInstance = value;
        } // end method

        #endregion

        #region vlastnosti

        /// <summary>hodnota typu celé 64 bitové èíslo s ohledem na hodnotu null</summary>
        public Int64 Value {
            get {
                if(IsNull) throw new GException(21000060, 23200003, ThisAssembly); //RC-EX 23200003 : pokus o pøístup k hodnotì null
                return ((Int64) ValueInstance);
            } // end method
            set {ValueInstance = value;} 
        } // end property

        /// <summary>výchozí hodnota</summary>
        public long DefaultValue {
            get {return m_nDefaultValue;}
            set {
                if(IsReadOnly) throw new GException(21000061,23200084,ThisAssembly); // hodnota je urèena pouze ke ètení
                m_nDefaultValue = value;
            } // end method
        } // end property

        /// <summary>hodnota typu celé 64 bitové èíslo bez ohledu na hodnotu null</summary>
        public long BaseValue {
            get {return IsNull ? DefaultValue : (long) ValueInstance;}
        } // end property

        /// <summary>instance hodnoty null urèená pouze pro ètení</summary>
        public static GInt64 Null {
            get {return m_cgnNull;}
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(GInt64).Assembly;}
        } // end property

        #endregion

        #region pøetížené metody

        /// <summary>získání výchozí hodnoty</summary>
        /// <returns>výchozí hodnota typu celé 64 bitové èíslo</returns>
        protected override object GetDefaultValue() {
            return DefaultValue;
        } // end method

        /// <summary>konverze vstupní hodnoty</summary>
        /// <param name="sourceValue">vstupní hodnota</param>
        /// <returns>hodnota typu celé 64 bitové èíslo</returns>
        protected override object ConvertValue(object sourceValue) {
            long l_nReturnValue = 0;
            if (sourceValue is int) l_nReturnValue = (int)sourceValue;
            else if (sourceValue is bool) l_nReturnValue = (bool)sourceValue ? 1 : 0;
            else if (sourceValue is decimal) l_nReturnValue = ConvertValue(Convert.ToDecimal((decimal)sourceValue), true, true, true, 23200019);
            else if (sourceValue is double)
            {
                decimal l_mDecimalValue = Convert.ToDecimal(0.1);
                try { l_mDecimalValue = Convert.ToDecimal((double)sourceValue); } catch { }
                l_nReturnValue = ConvertValue(l_mDecimalValue, true, true, true, 23200045);
            }
            else if (sourceValue is long) l_nReturnValue = Convert.ToInt64((long)sourceValue);
            else if (sourceValue is float) l_nReturnValue = ConvertValue(Convert.ToDecimal((float)sourceValue), true, true, true, 23200047);
            else if (sourceValue is short) l_nReturnValue = Convert.ToInt64((short)sourceValue);
            else if (sourceValue is sbyte) l_nReturnValue = Convert.ToInt64((sbyte)sourceValue);
            else if (sourceValue is byte) l_nReturnValue = Convert.ToInt64((byte)sourceValue);
            else if (sourceValue is ushort) l_nReturnValue = Convert.ToInt64((ushort)sourceValue);
            else if (sourceValue is uint) l_nReturnValue = ConvertValue(Convert.ToDecimal((uint)sourceValue), false, true, false, 23200048);
            else if (sourceValue is ulong) l_nReturnValue = ConvertValue(Convert.ToDecimal((ulong)sourceValue), false, true, false, 23200049);
            else throw new GException(21000075, 23200004, ThisAssembly); //RC-EX 23200004 : pokus o nepodporovanou typovou konverzi
            return l_nReturnValue;
        } // end method

        /// <summary>konverze vstupní hodnoty</summary>
        /// <param name="sourceValue">vstupní hodnota</param>
        /// <param name="testMinValue">pøíznak požadavku na test minimální hodnoty</param>
        /// <param name="testMaxValue">pøíznak požadavku na test maximální hodnoty</param>
        /// <param name="testTurncation">pøíznak požadavku na test desetinné èásti hodnoty</param>
        /// <param name="exceptionCode">kód pro pøípadnou výjimku</param>
        /// <returns>hodnota typu celé 64 bitové èíslo</returns>
        private long ConvertValue(decimal sourceValue,bool testMinValue,bool testMaxValue,bool testTurncation,int exceptionCode) {
            if( (testMinValue && sourceValue<Int64.MinValue) ||
                (testMaxValue && sourceValue>Int64.MaxValue) ||
                (testTurncation && sourceValue!=Decimal.Truncate(sourceValue))
                ) throw new GInvalidCastException(exceptionCode);
            return Convert.ToInt64(sourceValue);
        } // end method

        /// <summary>porovnání dvou hodnot s ohledem na typ</summary>
        /// <param name="valueOne">první hodnota</param>
        /// <param name="valueTwo">druhá hodnota</param>
        /// <returns>true pokud se hodnoty shodují, jinak false</returns>
        protected override bool CompareValues(object valueOne,object valueTwo) {
            return (long) valueOne == (long) valueTwo;
        } // end method

        /// <summary>vytvoøení identické kopie objektu</summary>
        /// <returns>nová instance objektu</returns>
        /// <remarks>pøíznak hodnoty urèené pouze ke ètení je u novì vzniklé instance vždy negativní</remarks>
        public override object Clone() {
            return new GInt64(this,null);
        } // end method

        /// <summary>nastavení hodnoty s pøípadnou pøedchozí typovou konverzí</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        public override void ParseValue(object inputValue) {
            GInt64 l_gnValue = GInt64.Parse(inputValue,true);
            ValueInstance = l_gnValue.IsNull ? null : l_gnValue.DbValue;
        } // end method

        /// <summary>porovnání hodnoty se vstupní hodnotou stejného typu</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>hodnota menší než nula pokud aktuální hodnota je v rámci tøídìní pøed vstupní hodnotou, hodnota nula pokud je na stejné pozici nebo hodnota vìtší než nula pokud je za vstupní hodnotou</returns>
        public override int CompareTo(object inputValue) {
            if(inputValue == null) return 1;
            GInt64 l_gbInputValue = inputValue as GInt64;
            if(l_gbInputValue == null) throw new GArgumentException(21000076);
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
        public override bool Equals(object inputObject)	{
			GInt64 l_gnInputObject = inputObject as GInt64;
            return l_gnInputObject!=null && l_gnInputObject==this;
        } // end method

        /// <summary>operátor porovnání</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì shody hodnot, jinak false</returns>
		public static bool operator ==(GInt64 a, GInt64 b) {
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
		public static bool operator !=(GInt64 a, GInt64 b) {
            return (a == b) == false;
        } // end method
		
		/// <summary>operátor sèítání</summary>
		/// <param name="a">levý operand</param>
		/// <param name="b">pravý operand</param>
		/// <returns>souèet</returns>
		public static GInt64 operator +(GInt64 a, GInt64 b)	{
			try {
				long l_nValueA = a.Value;
                long l_nValueB = b.Value;
                long l_nSum = checked((long)(l_nValueA + l_nValueB));
                return new GInt64(l_nSum);
			} // end try
			catch(OverflowException e) {
				throw new GOverflowException(21000062,e);
			} // end catch
			catch(GException e) {
				throw new GArgumentException(21000063,e);
			} // end catch
		} // end method

        /// <summary>implicitní konverze z GInt64 na long</summary>
		/// <param name="a">konvertovaná hodnota</param>
		/// <returns>hodnota typu long</returns>
		public static implicit operator long(GInt64 a) {
			return a.Value;
		} // end method

        /// <summary>implicitní konverze z long na GInt64</summary>
		/// <param name="a">konvertovaná hodnota</param>
		/// <returns>hodnota typu GInt64</returns>
		public static implicit operator GInt64(long a) {
			return new GInt64(a);
		} // end method	

        /// <summary>explicitní konverze z GInt64 na long?</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu int ?</returns>
        public static explicit operator long? (GInt64 a) {
            return a == null || a.IsNull ? null : (int ?) a.Value;
        } // end method

        /// <summary>implicitní konverze z long? na GInt64</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GInt64</returns>
        public static implicit operator GInt64(long? a) {
            return a == null ? new GInt64() : new GInt64((int) a);
        } // end method	

        /// <summary>implicitní konverze na GInt64 z GInt32</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GInt64</returns>
        public static implicit operator GInt64(GInt32 a) {
            GInt64 b;
			if (a.IsNull) b = new GInt64();
			else b = new GInt64((long) a.Value);
			b.SourceColumn = a.SourceColumn;
			return b;
		} // end method

        /// <summary>implicitní konverze na GInt64 z GInt16</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GInt64</returns>
        public static implicit operator GInt64(GInt16 a)
        {
            GInt64 b;
            if (a.IsNull) b = new GInt64();
            else b = new GInt64((long)a.Value);
            b.SourceColumn = a.SourceColumn;
            return b;
        } // end method

        /// <summary>explicitní konverze z GDecimal na GInt64 se ztrátou pøesnosti</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GInt64</returns>
        public static explicit operator GInt64(GDecimal a) {
			try {
                GInt64 b;
				if (a.IsNull) b = new GInt64();
				else {
					checked {
						int c = (int)a.Value;
						b = new GInt64(c);
					} // end checked
				} // end if
				b.SourceColumn = a.SourceColumn;
				return b;
			} // end try
			catch(Exception e) {
				throw new GOverflowException(21000064,e);
			} // end catch
		} // end method

        /// <summary>operátor vìtší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je vìtší než hodnota pravého, jinak false</returns>
        public static bool operator >(GInt64 a, GInt64 b) {
            if(a == b) return false;
            else {
                if((object)a == null || (object)b == null) throw new GArgumentNullException(21000065);
                if(a.IsNull || b.IsNull) throw new GException(21000066, 23200003,ThisAssembly); // pokus o pøístup k hodnotì null
                return a.Value > b.Value;
            } // end if
        } // end method

        /// <summary>operátor menší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je menší než hodnota pravého, jinak false</returns>
        public static bool operator <(GInt64 a, GInt64 b) {
            if(a == b) return false;
            else {
                if((object)a == null || (object)b == null) throw new GArgumentNullException(21000067);
                if(a.IsNull || b.IsNull) throw new GException(21000068,23200003,ThisAssembly); // pokus o pøístup k hodnotì null
                return a.Value < b.Value;
            } // end if
        } // end method

        /// <summary>operátor vìtší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je vìtší nebo rovná hodnotì pravého, jinak false</returns>
        public static bool operator >=(GInt64 a, GInt64 b) {
            if(a == b) return true;
            else return a > b;
        } // end method

        /// <summary>operátor menší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je menší nebo rovná hodnotì pravého, jinak false</returns>
        public static bool operator <=(GInt64 a, GInt64 b) {
            if(a == b) return true;
            else return a < b;
        } // end method

		#endregion

        #region statická metoda Parse

        /// <summary>obecná typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>výstupní hodnota</returns>
        public static GInt64 Parse(object inputValue) {
            return Parse(inputValue,false);
        } // end method

        /// <summary>obecná typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="acceptNull">pøíznak pøípustnosti hodnoty null</param>
        /// <returns>výstupní hodnota</returns>
        public static GInt64 Parse(object inputValue,bool acceptNull) {
            GInt64 l_gnNumber = null;
            if(inputValue == null || (acceptNull && inputValue is string && inputValue.ToString().Trim() == String.Empty)) {
                if(acceptNull) l_gnNumber = new GInt64();
                else throw new GArgumentNullException(21000069); // neinicializovaná hodnota parametru
            } else if(inputValue is string) l_gnNumber = Parse((string) inputValue);
            else if(inputValue is GDate || inputValue is GDateTime || inputValue is GEkoDate) throw new GInvalidCastException(21000070); // pokus o nepovolenou typovou konverzi
            else if(inputValue is GString && ((GString)inputValue).IsNull == false) l_gnNumber = Parse(inputValue.ToString());
            else {
                l_gnNumber = new GInt64();
                if(inputValue is IGDbType) l_gnNumber.DbValue = ((IGDbType) inputValue).DbValue;
                else l_gnNumber.DbValue = inputValue;
            } // end if
            return l_gnNumber;
        } // end method
		
        /// <summary>typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>výstupní hodnota</returns>
        public static GInt64 Parse(string inputValue) {
            try {
                return long.Parse(inputValue);
            } // end try
            catch(Exception e) {
                if(inputValue == null) inputValue = NullString;
                else if((inputValue = inputValue.Trim()) == String.Empty) inputValue = EmptyString;
                throw new GException(21000071,21350001,ThisAssembly,e,inputValue,nameof(GInt64)); //RC-EX 21350001 : vstupní hodnotu {0} nelze použít pro inicializaci datového typu {1}
            } // end catch
        } // end method

        /// <summary>typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="formatProvider">hodnota typu <see cref="IFormatProvider"/> s informacemi o formátu vstupní hodnoty</param>
        /// <returns>výstupní hodnota</returns>
        public static GInt64 Parse(string inputValue,IFormatProvider formatProvider) {
            try {
                return long.Parse(inputValue,formatProvider);
            } // end try
            catch(Exception e) {
                if(inputValue == null) inputValue = NullString;
                else if((inputValue = inputValue.Trim()) == String.Empty) inputValue = EmptyString;
                throw new GException(21000072,21350001,ThisAssembly,e,inputValue,nameof(GInt64)); //RC-EX 21350001 : vstupní hodnotu {0} nelze použít pro inicializaci datového typu {1}
            } // end catch
        } // end method

        /// <summary>typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="numberStyles">hodnota typu <see cref="NumberStyles"/> stanovující povolený formát èísla</param>
        /// <returns>výstupní hodnota</returns>
        public static GInt64 Parse(string inputValue, NumberStyles numberStyles)	{
            try {
                return long.Parse(inputValue,numberStyles);
            } // end try
            catch(Exception e) {
                if(inputValue == null) inputValue = NullString;
                else if((inputValue = inputValue.Trim()) == String.Empty) inputValue = EmptyString;
                throw new GException(21000073,21350001,ThisAssembly,e,inputValue,nameof(GInt64)); //RC-EX 21350001 : vstupní hodnotu {0} nelze použít pro inicializaci datového typu {1}
            } // end catch
        } // end method

        /// <summary>typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="numberStyles">hodnota typu <see cref="NumberStyles"/> stanovující povolený formát èísla</param>
        /// <param name="formatProvider">hodnota typu <see cref="IFormatProvider"/> s informacemi o formátu vstupní hodnoty</param>
        /// <returns>výstupní hodnota</returns>
        public static GInt64 Parse(string inputValue, NumberStyles numberStyles, IFormatProvider formatProvider) {
            try {
                return long.Parse(inputValue, numberStyles, formatProvider);
            } // end try
            catch(Exception e) {
                if(inputValue == null) inputValue = NullString;
                else if((inputValue = inputValue.Trim()) == String.Empty) inputValue = EmptyString;
                throw new GException(21000074,21350001,ThisAssembly,e,inputValue,nameof(GInt64)); //RC-EX 21350001 : vstupní hodnotu {0} nelze použít pro inicializaci datového typu {1}
            } // end catch
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
        public bool In(params GInt64[] items) {
            if(items == null) return false;
            else if(IsNull) return items.Where(item => item.IsNull).Any();
            else return items.Where(item => item.BaseValue == BaseValue).Any();
        } // end method

        /// <summary>zjištìní zda se hodnota nachází v pøedaném výètu hodnot</summary>
        /// <param name="items">výèet hodnot</param>
        /// <returns>true v pøípadì, že se hodnota nachází v pøedaném výètu hodnot, jinak false</returns>
        public bool In(params GInt32[] items)
        {
            if (items == null) return false;
            else if (IsNull) return items.Where(item => item.IsNull).Any();
            else return items.Where(item => item.BaseValue == BaseValue).Any();
        } // end method
        /// <summary>zjištìní zda se hodnota nachází v pøedaném výètu hodnot</summary>
        /// <param name="items">výèet hodnot</param>
        /// <returns>true v pøípadì, že se hodnota nachází v pøedaném výètu hodnot, jinak false</returns>
        public bool In(params GInt16[] items) {
            if(items == null) return false;
            else if(IsNull) return items.Where(item => item.IsNull).Any();
            else return items.Where(item => item.BaseValue == BaseValue).Any();
        } // end method

        /// <summary>zjištìní zda se hodnota nachází v pøedaném výètu hodnot</summary>
        /// <param name="items">výèet hodnot</param>
        /// <returns>true v pøípadì, že se hodnota nachází v pøedaném výètu hodnot, jinak false</returns>
        public bool In(params long[] items) {
            if(items == null || IsNull) return false;
            else return Array.IndexOf<long>(items,BaseValue) > -1;
        } // end method

        #endregion

        #region veøejné statické metody

        /// <summary>vrací instanci s vìtší hodnotou</summary>
        /// <param name="first">první instance</param>
        /// <param name="second">druhá instance</param>
        /// <returns>instance s vìtší hodnotou</returns>
        public static GInt64 Max(GInt64 first, GInt64 second) {
            return (first > second) ? first : second;
        } // end method

        /// <summary>vrací instanci s menší hodnotou</summary>
        /// <param name="first">první instance</param>
        /// <param name="second">druhá instance</param>
        /// <returns>instance s menší hodnotou</returns>
        public static GInt64 Min(GInt64 first, GInt64 second) {
            return (first < second) ? first : second;
        } // end method

        #endregion

    } // end class

} // end namespace
