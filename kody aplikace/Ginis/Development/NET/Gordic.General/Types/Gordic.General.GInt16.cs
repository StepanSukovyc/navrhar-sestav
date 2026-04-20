//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>          Gordic.General.GInt16.cs                     </Name>
//    <Description>   databázová hodnota typu celé 16 bitové èíslo </Description>
//    <Author>        Jan Kuttich                                  </Author>
//    <Copyright>     © GORDIC spol. s r. o. 1993 - 2021   </Copyright>
//    <Created>       2003-08-26                                   </Created>
//  </FileHeader>

using System;
using System.Data.OleDb;
using System.ComponentModel;
using System.Globalization;
using System.Reflection;
using System.Diagnostics;
using System.Linq;

namespace Gordic.General {
    
    /// <summary>databázová hodnota typu celé 16 bitové èíslo</summary>
    [Serializable]
    [TypeConverter( typeof(GInt16Converter))]
    public class GInt16 : GDbType, IGDbTypeNumber
    {

        #region soukromé èleny

        /// <summary>výchozí hodnota</summary>
        private short m_nDefaultValue = 0;

        /// <summary>instance hodnoty null urèená pouze pro ètení</summary>
        private static readonly GInt16 m_cgnNull = new GInt16(true);

        #endregion

        #region konstruktory

        /// <summary>veøejný konstruktor</summary>
        public GInt16() : base(true) {}

        /// <summary>veøejný konstruktor</summary>
        /// <param name="shortValue">inicializaèní hodnota celé 16 bitové èíslo</param>
        public GInt16(short shortValue) : base(true) {
            ValueInstance = shortValue;
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="shortValue">inicializaèní hodnota typu celé 16 bitové èíslo</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        public GInt16(short shortValue,bool isNullable) : base(isNullable) {
            ValueInstance = shortValue;
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="shortValue">inicializaèní hodnota typu celé 16 bitové èíslo</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GInt16(short shortValue,bool isNullable,string sourceColumn) : base(isNullable) {
            ValueInstance = shortValue;
            SourceColumn = sourceColumn;
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="shortValue">inicializaèní hodnota celé 16 bitové èíslo</param>
        public GInt16(int shortValue) : base(true) {
            if(shortValue < Int16.MinValue || shortValue > Int16.MaxValue) throw new GArgumentOutOfRangeException(23200506); // hodnota parametru je mimo povolený rozsah
            ValueInstance = Convert.ToInt16(shortValue);
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="shortValue">inicializaèní hodnota typu celé 16 bitové èíslo</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        public GInt16(int shortValue,bool isNullable) : base(isNullable) {
            if(shortValue < Int16.MinValue || shortValue > Int16.MaxValue) throw new GArgumentOutOfRangeException(23200507); // hodnota parametru je mimo povolený rozsah
            ValueInstance = Convert.ToInt16(shortValue);
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="shortValue">inicializaèní hodnota typu celé 16 bitové èíslo</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GInt16(int shortValue,string sourceColumn) : this(shortValue,true,sourceColumn) {
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="shortValue">inicializaèní hodnota typu celé 16 bitové èíslo</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GInt16(int shortValue,bool isNullable,string sourceColumn) : base(isNullable) {
            if(shortValue < Int16.MinValue || shortValue > Int16.MaxValue) throw new GArgumentOutOfRangeException(23200508); // hodnota parametru je mimo povolený rozsah
            ValueInstance = Convert.ToInt16(shortValue);
            SourceColumn = sourceColumn;
        } // end method

        /// <summary>veøejný kopírovací konstruktor</summary>
        /// <param name="source">zdrojová instance</param>
        /// <param name="copyOptions">vhrazeno pro budoucí použití</param>
        public GInt16(GInt16 source,GDbTypeCopyOptions copyOptions) : base(source as GDbType) {
            m_nDefaultValue = source.m_nDefaultValue;
        } // end method

        /// <summary>soukromý konstruktor</summary>
        /// <param name="readOnly">pøíznak hodnoty urèené pouze pro ètení</param>
        private GInt16(bool readOnly) : base(true) {
            if(readOnly) SetReadOnly();
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="value">inicializaèní hodnota</param>
        public GInt16(short ? value) : base(true) {
            if(value != null) ValueInstance = value;
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="value">inicializaèní hodnota</param>
        public GInt16(int ? value) : base(true) {
            if(value != null) {
                if(value < Int16.MinValue || value > Int16.MaxValue) throw new GArgumentOutOfRangeException(23200536); // hodnota parametru je mimo povolený rozsah
                ValueInstance = Convert.ToInt16(value);
            } // end if
        } // end method

        #endregion

        #region vlastnosti

        /// <summary>hodnota typu celé 16 bitové èíslo s ohledem na hodnotu null</summary>
        public Int16 Value {
            get {
                if (IsNull) throw new GException(23200005, 23200003, ThisAssembly); // pokus o pøístup k hodnotì null
                return ((Int16)ValueInstance);
            } // end method
            set { ValueInstance = value; }
        } // end property

        /// <summary>výchozí hodnota</summary>
        public short DefaultValue {
            get {return m_nDefaultValue;}
            set {
                if(IsReadOnly) throw new GException(23200090,23200084,ThisAssembly); // hodnota je urèena pouze ke ètení
                m_nDefaultValue = value;
            } // end method
        } // end property

        /// <summary>hodnota typu celé 16 bitové èíslo bez ohledu na hodnotu null</summary>
        public short BaseValue {
            get {return IsNull ? DefaultValue : (short) ValueInstance;}
        } // end property

        /// <summary>instance hodnoty null urèená pouze pro ètení</summary>
        public static GInt16 Null {
            get {return m_cgnNull;}
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(GInt16).Assembly;}
        } // end property

        #endregion

        #region pøetížené metody

        /// <summary>získání výchozí hodnoty</summary>
        /// <returns>výchozí hodnota typu celé 16 bitové èíslo</returns>
        protected override object GetDefaultValue() {
            return DefaultValue;
        } // end method

        /// <summary>konverze vstupní hodnoty</summary>
        /// <param name="sourceValue">vstupní hodnota</param>
        /// <returns>hodnota typu celé 16 bitové èíslo</returns>
        protected override object ConvertValue(object sourceValue) {
            short l_nReturnValue = 0;
            if (sourceValue is short) l_nReturnValue = (short)sourceValue;
            else if (sourceValue is bool) l_nReturnValue = (short)((bool)sourceValue ? 1 : 0);
            else if (sourceValue is int) l_nReturnValue = ConvertValue(Convert.ToDecimal((int)sourceValue), true, true, false, 23200020);
            else if (sourceValue is decimal) l_nReturnValue = ConvertValue(Convert.ToDecimal((decimal)sourceValue), true, true, true, 23200021);
            else if (sourceValue is double)
            {
                decimal l_mDecimalValue = Convert.ToDecimal(0.1);
                try { l_mDecimalValue = Convert.ToDecimal((double)sourceValue); } catch { }
                l_nReturnValue = ConvertValue(l_mDecimalValue, true, true, true, 23200039);
            }
            else if (sourceValue is long) l_nReturnValue = ConvertValue(Convert.ToDecimal((long)sourceValue), true, true, false, 23200040);
            else if (sourceValue is float) l_nReturnValue = ConvertValue(Convert.ToDecimal((float)sourceValue), true, true, true, 23200041);
            else if (sourceValue is sbyte) l_nReturnValue = Convert.ToInt16((sbyte)sourceValue);
            else if (sourceValue is byte) l_nReturnValue = Convert.ToInt16((byte)sourceValue);
            else if (sourceValue is ushort) l_nReturnValue = ConvertValue(Convert.ToDecimal((ushort)sourceValue), false, true, false, 23200042);
            else if (sourceValue is uint) l_nReturnValue = ConvertValue(Convert.ToDecimal((uint)sourceValue), false, true, false, 23200043);
            else if (sourceValue is ulong) l_nReturnValue = ConvertValue(Convert.ToDecimal((ulong)sourceValue), false, true, false, 23200044);
            else throw new GException(23200006, 23200004, ThisAssembly); //RC-EX 23200004 : pokus o nepodporovanou typovou konverzi
            return l_nReturnValue;
        } // end method

        /// <summary>konverze vstupní hodnoty</summary>
        /// <param name="sourceValue">vstupní hodnota</param>
        /// <param name="testMinValue">pøíznak požadavku na test minimální hodnoty</param>
        /// <param name="testMaxValue">pøíznak požadavku na test maximální hodnoty</param>
        /// <param name="testTurncation">pøíznak požadavku na test desetinné èásti hodnoty</param>
        /// <param name="exceptionCode">kód pro pøípadnou výjimku</param>
        /// <returns>hodnota typu celé 16 bitové èíslo</returns>
        private short ConvertValue(decimal sourceValue,bool testMinValue,bool testMaxValue,bool testTurncation,int exceptionCode) {
            if( (testMinValue && sourceValue<Int16.MinValue) ||
                (testMaxValue && sourceValue>Int16.MaxValue) ||
                (testTurncation && sourceValue!=Decimal.Truncate(sourceValue))
            ) throw new GInvalidCastException(exceptionCode); // pokus o nepovolenou typovou konverzi
            return Convert.ToInt16(sourceValue);
        } // end method

        /// <summary>porovnání dvou hodnot s ohledem na typ</summary>
        /// <param name="valueOne">první hodnota</param>
        /// <param name="valueTwo">druhá hodnota</param>
        /// <returns>true pokud se hodnoty shodují, jinak false</returns>
        protected override bool CompareValues(object valueOne,object valueTwo) {
            return (short) valueOne == (short) valueTwo;
        } // end method

        /// <summary>vytvoøení identické kopie objektu</summary>
        /// <returns>nová instance objektu</returns>
        /// <remarks>pøíznak hodnoty urèené pouze ke ètení je u novì vzniklé instance vždy negativní</remarks>
        public override object Clone() {
            return new GInt16(this,null);
        } // end method

        /// <summary>nastavení hodnoty s pøípadnou pøedchozí typovou konverzí</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        public override void ParseValue(object inputValue) {
            GInt16 l_gnValue = GInt16.Parse(inputValue,true);
            ValueInstance = l_gnValue.IsNull ? null : l_gnValue.DbValue;
        } // end method

        /// <summary>porovnání hodnoty se vstupní hodnotou stejného typu</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>hodnota menší než nula pokud aktuální hodnota je v rámci tøídìní pøed vstupní hodnotou, hodnota nula pokud je na stejné pozici nebo hodnota vìtší než nula pokud je za vstupní hodnotou</returns>
        public override int CompareTo(object inputValue) {
            if(inputValue == null) return 1;
            GInt16 l_gbInputValue = inputValue as GInt16;
            if(l_gbInputValue == null) throw new GArgumentException(23200420);
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
            GInt16 l_gnInputObject = inputObject as GInt16;
            return l_gnInputObject!=null && l_gnInputObject==this;
        } // end method

        /// <summary>operátor porovnání</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì shody hodnot, jinak false</returns>
        public static bool operator ==(GInt16 a,GInt16 b) {
            if((object) a == null) {
                if((object) b == null) return true;
                else return false;
            } else if((object) b == null) return false;
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
        public static bool operator !=(GInt16 a, GInt16 b) {
            return (a == b) == false;
        } // end method

        /// <summary>operátor sèítání</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>souèet</returns>
        public static GInt16 operator +(GInt16 a, GInt16 b)	{
            try {
                short l_nValueA = a.Value;
                short l_nValueB = b.Value;
                short l_nSum = checked((short)(l_nValueA + l_nValueB));
                return new GInt16(l_nSum);
            } // end try
            catch(OverflowException e) {
                throw new GOverflowException(23200141,e);
            } // end catch
            catch(GException e) {
                throw new GArgumentException(23200142,e);
            } // end catch
        } // end method

        /// <summary>implicitní konverze na int</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu int</returns>
        public static implicit operator int(GInt16 a) {
            try { return a.Value; }
            catch(Exception e) { throw new GArgumentException(23200143,e); }
        } // end method

        /// <summary>explicitní konverze na GInt16 z int se ztrátou pøesnosti</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GInt16</returns>
        public static explicit operator GInt16(int a)	{
            try {
                short b;
                checked	{ b = (short) a; }
                return new GInt16(b);
            } // end try
            catch(Exception e) { throw new GOverflowException(23200145,e); }
        } // end method
    
        /// <summary>implicitní konverze na short</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu short</returns>
        public static implicit operator short(GInt16 a)	{
            try { return a.Value; }
            catch(Exception e) { throw new GArgumentException(23200144,e); }
        } // end method

        /// <summary>implicitní konverze z short na GInt16</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GInt16</returns>
        public static implicit operator GInt16(short a) {
            return new GInt16(a);
        } // end method

        /// <summary>implicitní konverze z GInt16 na short ?</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu short ?</returns>
        public static implicit operator short ? (GInt16 a) {
            return a == null || a.IsNull ? null : (short ?) a.Value;
        } // end method

        /// <summary>implicitní konverze z short ? na GInt16</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GInt16</returns>
        public static implicit operator GInt16(short ? a) {
            return a == null ? new GInt16() : new GInt16((short) a);
        } // end method	

        /// <summary>explicitní konverze z GInt16 na int ?</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu int ?</returns>
        public static explicit operator int ? (GInt16 a) {
            return a == null || a.IsNull ? null : (int ?) a.Value;
        } // end method

        /// <summary>explicitní konverze z int ? na GInt16</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GInt16</returns>
        public static explicit operator GInt16(int ? a) {
            return a == null ? new GInt16() : (GInt16)((int) a);
        } // end method	

        /// <summary>explicitní konverze z GInt64 na GInt16 se ztrátou pøesnosti</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GInt16</returns>
        public static explicit operator GInt16(GInt64 a)
        {
            try
            {
                GInt16 b;
                if (a.IsNull) b = new GInt16();
                else
                {
                    checked
                    {
                        short c = (short)a.Value;
                        b = new GInt16(c);
                    } // end checked
                } // end if
                b.SourceColumn = a.SourceColumn;
                return b;
            } // end try
            catch (Exception e) { throw new GOverflowException(21000081, e); }
        } // end method

        /// <summary>explicitní konverze z GInt32 na GInt16 se ztrátou pøesnosti</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GInt16</returns>
        public static explicit operator GInt16(GInt32 a) {
            try {
                GInt16 b;
                if(a.IsNull) b = new GInt16();
                else {
                    checked {
                        short c = (short)a.Value;
                        b = new GInt16(c);
                    } // end checked
                } // end if
                b.SourceColumn = a.SourceColumn;
                return b;
            } // end try
            catch(Exception e) { throw new GOverflowException(23200146,e); }
        } // end method

        /// <summary>explicitní konverze z GDecimal na GInt16 se ztrátou pøesnosti</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GInt16</returns>
        public static explicit operator GInt16(GDecimal a) {
            try {
                GInt16 b;
                if (a.IsNull) b = new GInt16();
                else {
                    checked {
                        short c = (short)a.Value;
                        b = new GInt16(c);
                    } // end checked
                } // end if0
                b.SourceColumn = a.SourceColumn;
                return b;
            } // end try
            catch(Exception e) { throw new GOverflowException(23200147,e); }
        } // end method

        /// <summary>operátor vìtší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je vìtší než hodnota pravého, jinak false</returns>
        public static bool operator >(GInt16 a,GInt16 b) {
            if(a == b) return false;
            else {
                if((object)a == null || (object)b == null) throw new GArgumentNullException(23200337);
                if(a.IsNull || b.IsNull) throw new GException(23200338,23200003,ThisAssembly); // pokus o pøístup k hodnotì null
                return a.Value > b.Value;
            } // end if
        } // end method

        /// <summary>operátor menší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je menší než hodnota pravého, jinak false</returns>
        public static bool operator <(GInt16 a,GInt16 b) {
            if(a == b) return false;
            else {
                if((object)a == null || (object)b == null) throw new GArgumentNullException(23200339);
                if(a.IsNull || b.IsNull) throw new GException(23200340,23200003,ThisAssembly); // pokus o pøístup k hodnotì null
                return a.Value < b.Value;
            } // end if
        } // end method

        /// <summary>operátor vìtší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je vìtší nebo rovná hodnotì pravého, jinak false</returns>
        public static bool operator >=(GInt16 a,GInt16 b) {
            if(a == b) return true;
            else return a > b;
        } // end method

        /// <summary>operátor menší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je menší nebo rovná hodnotì pravého, jinak false</returns>
        public static bool operator <=(GInt16 a,GInt16 b) {
            if(a == b) return true;
            else return a < b;
        } // end method

        #endregion

        #region statická metoda Parse

        /// <summary>obecná typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>výstupní hodnota</returns>
        public static GInt16 Parse(object inputValue) {
            return Parse(inputValue,false);
        } // end method

        /// <summary>obecná typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="acceptNull">pøíznak pøípustnosti hodnoty null</param>
        /// <returns>výstupní hodnota</returns>
        public static GInt16 Parse(object inputValue,bool acceptNull) {
            GInt16 l_gnNumber = null;
            if(inputValue == null || (acceptNull && inputValue is string && inputValue.ToString().Trim() == String.Empty)) {
                if(acceptNull) l_gnNumber = new GInt16();   
                else throw new GArgumentNullException(23200053); // neinicializovaná hodnota parametru
            } else if(inputValue is string) l_gnNumber = Parse((string) inputValue);
            else if(inputValue is GDate || inputValue is GDateTime || inputValue is GEkoDate) throw new GInvalidCastException(23200054); // pokus o nepovolenou typovou konverzi
            else if(inputValue is GString && ((GString)inputValue).IsNull == false) l_gnNumber = Parse(inputValue.ToString());
            else {
                l_gnNumber = new GInt16();
                if(inputValue is IGDbType) l_gnNumber.DbValue = ((IGDbType) inputValue).DbValue;
                else l_gnNumber.DbValue = inputValue;
            } // end if
            return l_gnNumber;
        } // end method
        
        /// <summary>typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>výstupní hodnota</returns>
        public static GInt16 Parse(string inputValue) {
            try {
                return short.Parse(inputValue);
            } // end try
            catch(Exception e) {
                if(inputValue == null) inputValue = NullString;
                else if((inputValue = inputValue.Trim()) == String.Empty) inputValue = EmptyString;
                throw new GException(23200073,21350001,ThisAssembly,e,inputValue, nameof( GInt16 ) ); //RC-EX 21350001 : vstupní hodnotu {0} nelze použít pro inicializaci datového typu {1}
            } // end catch
        } // end method

        /// <summary>typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="formatProvider">hodnota typu <see cref="IFormatProvider"/> s informacemi o formátu vstupní hodnoty</param>
        /// <returns>výstupní hodnota</returns>
        public static GInt16 Parse(string inputValue,IFormatProvider formatProvider) {
            try {
                return short.Parse(inputValue,formatProvider);
            } // end try
            catch(Exception e) {
                if(inputValue == null) inputValue = NullString;
                else if((inputValue = inputValue.Trim()) == String.Empty) inputValue = EmptyString;
                throw new GException(23200074, 21350001, ThisAssembly,e, inputValue, nameof( GInt16 ) ); //RC-EX 21350001 : vstupní hodnotu {0} nelze použít pro inicializaci datového typu {1}
            } // end catch
        } // end method

        /// <summary>typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="numberStyles">hodnota typu <see cref="NumberStyles"/> stanovující povolený formát èísla</param>
        /// <returns>výstupní hodnota</returns>
        public static GInt16 Parse(string inputValue, NumberStyles numberStyles)	{
            try {
                return short.Parse(inputValue,numberStyles);
            } // end try
            catch(Exception e) {
                if(inputValue == null) inputValue = NullString;
                else if((inputValue = inputValue.Trim()) == String.Empty) inputValue = EmptyString;
                throw new GException(23200075, 21350001, ThisAssembly,e, inputValue, nameof( GInt16 ) ); //RC-EX 21350001 : vstupní hodnotu {0} nelze použít pro inicializaci datového typu {1}
            } // end catch
        } // end method

        /// <summary>typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="numberStyles">hodnota typu <see cref="NumberStyles"/> stanovující povolený formát èísla</param>
        /// <param name="formatProvider">hodnota typu <see cref="IFormatProvider"/> s informacemi o formátu vstupní hodnoty</param>
        /// <returns>výstupní hodnota</returns>
        public static GInt16 Parse(string inputValue, NumberStyles numberStyles, IFormatProvider formatProvider) {
            try {
                return short.Parse(inputValue, numberStyles, formatProvider);
            } // end try
            catch(Exception e) {
                if(inputValue == null) inputValue = NullString;
                else if((inputValue = inputValue.Trim()) == String.Empty) inputValue = EmptyString;
                throw new GException(23200076, 21350001, ThisAssembly,e, inputValue, nameof( GInt16 ) ); //RC-EX 21350001 : vstupní hodnotu {0} nelze použít pro inicializaci datového typu {1}
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
        public bool In(params GInt32[] items) {
            if(items == null) return false;
            else if(IsNull) return items.Where(item => item.IsNull).Any();
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
        public bool In(params int[] items) {
            if(items == null || IsNull) return false;
            else return Array.IndexOf<int>(items,BaseValue) > -1;
        } // end method

        #endregion

        #region veøejné statické metody

        /// <summary>vrací instanci s vìtší hodnotou</summary>
        /// <param name="first">první instance</param>
        /// <param name="second">druhá instance</param>
        /// <returns>instance s vìtší hodnotou</returns>
        public static GInt16 Max(GInt16 first,GInt16 second) {
            return (first > second) ? first : second;
        } // end method

        /// <summary>vrací instanci s menší hodnotou</summary>
        /// <param name="first">první instance</param>
        /// <param name="second">druhá instance</param>
        /// <returns>instance s menší hodnotou</returns>
        public static GInt16 Min(GInt16 first,GInt16 second) {
            return (first < second) ? first : second;
        } // end method

        #endregion

    } // end class

} // end namespace
