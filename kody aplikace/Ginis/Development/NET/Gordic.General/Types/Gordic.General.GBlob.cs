//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>          Gordic.General.GBlob.cs                  </Name>
//    <Description>   databázová hodnota typu BLOB   </Description>
//    <Author>        FFIALA                                </Author>
//    <Copyright>     © GORDIC spol. s r. o. 1993 - 2021  </Copyright>
//    <Created>       2007-12-11                                  </Created>
//  </FileHeader>

using System;
using System.Data.OleDb;
using System.ComponentModel;
using System.Reflection;
using System.Diagnostics;
using System.Linq;
using System.Collections;

namespace Gordic.General {

    /// <summary>databázová hodnota typu BLOB</summary>
    [Serializable]
    [TypeConverter( typeof( GBlobConverter ) )]
    public class GBlob : GDbType {

        #region soukromé členy

        /// <summary>výchozí hodnota</summary>
        private byte[] m_nDefaultValue = null;

        /// <summary>instance hodnoty null určená pouze pro čtení</summary>
        private static readonly GBlob m_cgnNull = new GBlob( true, 0 );

        /// <summary>datový soubor</summary>
        private string m_sFile = String.Empty;

        #endregion

        #region konstruktory

        /// <summary>veřejný konstruktor</summary>
        public GBlob( ) : base( true ) { }

        /// <summary>veřejný konstruktor</summary>
        /// <param name="a_value">inicializační hodnota</param>
        public GBlob( byte[] a_value ) : base( true )
        {
            ValueInstance = a_value;
        } // end method

        /// <summary>veřejný konstruktor</summary>
        /// <param name="a_value">inicializační hodnota</param>
        /// <param name="isNullable">příznak povolení hodnoty null</param>
        public GBlob( byte[] a_value, bool isNullable ) : base( isNullable )
        {
            ValueInstance = a_value;
        } // end method

        /// <summary>veřejný konstruktor</summary>
        /// <param name="a_value">inicializační hodnota</param>
		/// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
		public GBlob( byte[] a_value, string sourceColumn ) : this( a_value, true, sourceColumn )
        {
        } // end method

        /// <summary>veřejný konstruktor</summary>
        /// <param name="a_value">inicializační hodnota</param>
        /// <param name="isNullable">příznak povolení hodnoty null</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GBlob( byte[] a_value, bool isNullable, string sourceColumn ) : base( isNullable )
        {
            ValueInstance = a_value;
            SourceColumn = sourceColumn;
        } // end method

        /// <summary>veřejný kopírovací konstruktor</summary>
        /// <param name="source">zdrojová instance</param>
        /// <param name="copyOptions">vhrazeno pro budoucí použití</param>
        public GBlob( GBlob source, GDbTypeCopyOptions copyOptions ) : base( source as GDbType )
        {
            m_nDefaultValue = source.m_nDefaultValue;
        } // end method

        /// <summary>soukromý konstruktor</summary>
        /// <param name="readOnly">příznak hodnoty určené pouze pro čtení</param>
        /// <param name="unused">nevyužívaný parametr</param>
        private GBlob( bool readOnly, int unused ) : base( true )
        {
            if(readOnly)
                SetReadOnly( );
        } // end method
        #endregion

        #region vlastnosti

        /// <summary>hodnota typu byte[]</summary>
        public byte[] Value {
            get {
                if(IsNull) throw new GException(21300014,23200003,ThisAssembly); // pokus o přístup k hodnotě null
                return ((byte[]) ValueInstance);
            } // end method
            set { ValueInstance = value; }
        } // end property

        /// <summary>výchozí hodnota</summary>
        public byte[] DefaultValue {
            get { return m_nDefaultValue; }
            set {
                if(IsReadOnly) throw new GException(21300002,23200084,ThisAssembly); // hodnota je určena pouze ke čtení
                m_nDefaultValue = value;
            } // end method
        } // end property

        /// <summary>hodnota </summary>
        public byte[] BaseValue {
            get { return IsNull ? DefaultValue : (byte[]) ValueInstance; }
        } // end property

        /// <summary>instance hodnoty null určená pouze pro čtení</summary>
        public static GBlob Null {
            get { return m_cgnNull; }
        } // end property

        /// <summary>datový soubor</summary>
        public string File {
            get { return m_sFile; }
            set { m_sFile = value == null ? String.Empty : value.Trim(); }
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(GBlob).Assembly; }
        } // end property

        #endregion

        #region přetížené metody

        // <summary>získání výchozí hodnoty</summary>
        /// <returns>výchozí hodnota typu typu logická 0 nebo 1</returns>
        protected override object GetDefaultValue( )
        {
            return DefaultValue;
        } // end method

        /// <summary>konverze vstupní hodnoty</summary>
        /// <param name="sourceValue">vstupní hodnota</param>
        /// <returns>hodnota typu typu logická 0 nebo 1</returns>
        protected override object ConvertValue( object sourceValue )
        {
            return Convert( sourceValue );
        } // end method

        /// <summary>konverze vstupní hodnoty</summary>
        /// <param name="sourceValue">vstupní hodnota</param>
        /// <returns>hodnota typu typu logická 0 nebo 1</returns>
        private static byte[] Convert( object sourceValue )
        {
            byte[] l_bReturnValue = null;

            if(sourceValue is byte[])
                l_bReturnValue = (byte[])sourceValue;
            else
                throw new GException( 21300016, 23200004, ThisAssembly ); //RC-EX 23200004 : pokus o nepodporovanou typovou konverzi

            return l_bReturnValue;
        } // end method

        /// <summary>porovnání dvou hodnot s ohledem na typ</summary>
        /// <param name="valueOne">první hodnota</param>
        /// <param name="valueTwo">druhá hodnota</param>
        /// <returns>true pokud se hodnoty shodují, jinak false</returns>
        protected override bool CompareValues( object valueOne, object valueTwo )
        {
            return StructuralComparisons.StructuralEqualityComparer.Equals( valueOne, valueTwo );
        } // end method

        /// <summary>vytvoření identické kopie objektu</summary>
        /// <returns>nová instance objektu</returns>
        /// <remarks>příznak hodnoty určené pouze ke čtení je u nově vzniklé instance vždy negativní</remarks>
        public override object Clone( )
        {
            return new GBlob( this, null );
        } // end method

        /// <summary>obecná typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>výstupní hodnota</returns>
        public static GBlob Parse(object inputValue)
        {
            return Parse(inputValue, false);
        } // end method

        /// <summary>obecná typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="acceptNull">příznak přípustnosti hodnoty null, nepromítá se do hodnoty vlastnosti IsNullable</param>
        /// <returns>výstupní hodnota</returns>
        public static GBlob Parse(object inputValue, bool acceptNull)
        {
            GBlob l_blob = null;
            if (inputValue == null)
            {
                if (acceptNull) l_blob = new GBlob();
                else throw new GArgumentNullException(21000049); // neinicializovaná hodnota parametru
            }
            else if (inputValue is string) l_blob = new GBlob(System.Convert.FromBase64String((string)inputValue));
            else {
                l_blob = new GBlob();
                if (inputValue is IGDbType) l_blob.DbValue = ((IGDbType)inputValue).DbValue;
                else l_blob.DbValue = inputValue;
            } // end if
            return l_blob;
        } // end method

        /// <summary>nastavení hodnoty s případnou předchozí typovou konverzí</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        public override void ParseValue( object inputValue )
        {
            if (inputValue == null)
                ValueInstance = null;
            else if (inputValue is byte[] v_data)
                ValueInstance = v_data;
            else
                throw new GNotImplementedException(21300018, 21350003, nameof(ParseValue), inputValue.GetType().ToString()); //RC-EX 21350003 : Interní chyba aplikace. Pro GBlob  není u metody {0} podporován vstupní datový typ {1}.
        } // end method

        /// <summary>porovnání hodnoty se vstupní hodnotou stejného typu</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>hodnota menší než nula pokud aktuální hodnota je v rámci třídění před vstupní hodnotou, hodnota nula pokud je na stejné pozici nebo hodnota větší než nula pokud je za vstupní hodnotou</returns>
        public override int CompareTo( object inputValue )
        {
            throw new GNotImplementedException(21300017);
        } // end method

        #endregion

        #region přetížené operátory
        /// <summary>vrací kontrolní součet instance objektu</summary>
        /// <returns>kontrolní součet instance objektu</returns>
        public override int GetHashCode( )
        {
            return BaseValue.GetHashCode( );
        } // end method

        /// <summary>porovnání hodnoty s jiným objektem</summary>
        /// <param name="inputObject">instance pro porovnání</param>
        /// <returns>true pokud jsou objekty stejného typu a jejich hodnoty jsou shodné, jinak false</returns>
        public override bool Equals( object inputObject )
        {
            GBlob l_gnInputObject = inputObject as GBlob;
            return StructuralComparisons.StructuralEqualityComparer.Equals( BaseValue, l_gnInputObject );
        } // end method

        /// <summary>operátor porovnání</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě shody hodnot, jinak false</returns>
        public static bool operator ==( GBlob a, GBlob b )
        {
            return StructuralComparisons.StructuralEqualityComparer.Equals( a, a );
        } // end method

        /// <summary>operátor nerovnosti</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě neshody hodnot, jinak false</returns>
        public static bool operator !=( GBlob a, GBlob b )
        {
            return !StructuralComparisons.StructuralEqualityComparer.Equals( a, a );
        } // end method


        /// <summary>implicitní konverze z <see cref="DateTime"/></summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GDate</returns>
        public static implicit operator GBlob( byte[] a )
        {
            return new GBlob( a );
        } // end method

        /// <summary>implicitní konverze z GDate na DateTime ?</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu DateTime ?</returns>
        public static implicit operator byte[] ( GBlob a )
        {
            return a == null || a.IsNull ? null : (byte[])a.Value;
        } // end method

        #endregion

        #region statická metoda Parse

        ///// <summary>obecná typová konverze</summary>
        ///// <param name="inputValue">vstupní hodnota</param>
        ///// <returns>výstupní hodnota</returns>
        //public static GBlob Parse( object inputValue )
        //{
        //    return Parse( inputValue, false );
        //} // end method

        ///// <summary>obecná typová konverze</summary>
        ///// <param name="inputValue">vstupní hodnota</param>
        ///// <param name="acceptNull">příznak přípustnosti hodnoty null</param>
        ///// <returns>výstupní hodnota</returns>
        //public static GBlob Parse( object inputValue, bool acceptNull )
        //{
        //    GBlob l_gBlob = null;
        //    if(inputValue == null || (acceptNull && inputValue is string && inputValue.ToString( ).Trim( ) == String.Empty))
        //    {
        //        if(acceptNull)
        //            l_gBlob = new GBlob( );
        //        else
        //            throw new GArgumentNullException( 21300014 ); // neinicializovaná hodnota parametru //RC-EX 21300014 : neinicializovaná hodnota parametru
        //    }
        //    else if(inputValue is string)
        //        l_gBlob = ParseString( (string)inputValue );
        //    else if(inputValue is GDate || inputValue is GDateTime || inputValue is GEkoDate)
        //        throw new GInvalidCastException( 23200165 ); // pokus o nepovolenou typovou konverzi
        //    else if(inputValue is GString && ((GString)inputValue).IsNull == false)
        //        l_gbBoolean = ParseString( inputValue.ToString( ) );
        //    else
        //    {
        //        l_gbBoolean = new GBlob( );
        //        if(inputValue is IGDbType)
        //            l_gbBoolean.DbValue = ((IGDbType)inputValue).DbValue;
        //        else
        //            l_gbBoolean.DbValue = inputValue;
        //    } // end if
        //    return l_gbBoolean;
        //} // end method
        #endregion

        #region přetížená metoda ToString

        /// <summary>převod hodnoty na text</summary>
        /// <returns>textová reprezentace hodnoty</returns>
        public override string ToString( )
        {
            return BaseValue.ToString( );
        } // end method

        /// <summary>převod hodnoty na text</summary>
        /// <param name="formatProvider">hodnota typu <see cref="IFormatProvider"/> s informacemi o požadovaném formátu</param>
        /// <returns>textová reprezentace hodnoty</returns>
        public override string ToString( IFormatProvider formatProvider )
        {
            return BaseValue.ToString(  );
        } // end method

        /// <summary>převod hodnoty na text</summary>
        /// <param name="involveNull">příznak zahrnutí hodnoty null</param>
        /// <returns>textová reprezentace hodnoty</returns>
        public override string ToString( bool involveNull )
        {
            return (involveNull && IsNull) ? NullString : BaseValue.ToString( );
        } // end method

        /// <summary>hodnota zobrazovaná v okně debugeru</summary>
        protected override string DebuggerDisplayValue => IsNull ? "NULL" : $"Length = {((byte[])ValueInstance).Length}";
        #endregion

        #region veřejné metody

        ///// <summary>zjištění zda se hodnota nachází v předaném výčtu hodnot</summary>
        ///// <param name="items">výčet hodnot</param>
        ///// <returns>true v případě, že se hodnota nachází v předaném výčtu hodnot, jinak false</returns>
        //public bool In( params GBlob[] items )
        //{
        //    if(items == null)
        //        return false;
        //    else if(IsNull)
        //        return items.Where( item => item.IsNull ).Any( );
        //    else
        //        return items.Where( item => item.BaseValue == BaseValue ).Any( );
        //} // end method

        #endregion

        #region veřejné statické metody
        // nic
        #endregion

    } // end class

} // end namespace
