//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>          Gordic.General.GTable.cs                  </Name>
//    <Description>   databázová hodnota typu DataTable   </Description>
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
using System.Data;


namespace Gordic.General {

    /// <summary>databázová hodnota typu DataTable</summary>
    [Serializable]
    [TypeConverter( typeof(GTableConverter) )]
    public class GTable : GDbType {

        #region soukromé členy

        /// <summary>výchozí hodnota</summary>
        protected DataTable m_nDefaultValue = null;

        /// <summary>instance hodnoty null určená pouze pro čtení</summary>
        private static readonly GTable m_cgnNull = new GTable( null, true );

        #endregion

        #region konstruktory

        /// <summary>veřejný konstruktor</summary>
        public GTable( ) : base( true ) { }

        /// <summary>veřejný konstruktor</summary>
        /// <param name="a_value">inicializační hodnota</param>
        public GTable( DataTable a_value ) : base( true )
        {
            ValueInstance = a_value;
        } // end method

        /// <summary>veřejný konstruktor</summary>
        /// <param name="a_value">inicializační hodnota</param>
        /// <param name="isNullable">příznak povolení hodnoty null</param>
        public GTable(DataTable a_value, bool isNullable ) : base( isNullable )
        {
            ValueInstance = a_value;
        } // end method

        /// <summary>veřejný konstruktor</summary>
        /// <param name="a_value">inicializační hodnota</param>
		/// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
		public GTable(DataTable a_value, string sourceColumn ) : this( a_value, true, sourceColumn )
        {
        } // end method

        /// <summary>veřejný konstruktor</summary>
        /// <param name="a_value">inicializační hodnota</param>
        /// <param name="isNullable">příznak povolení hodnoty null</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GTable(DataTable a_value, bool isNullable, string sourceColumn ) : base( isNullable )
        {
            ValueInstance = a_value;
            SourceColumn = sourceColumn;
        } // end method

        /// <summary>veřejný kopírovací konstruktor</summary>
        /// <param name="source">zdrojová instance</param>
        /// <param name="copyOptions">vhrazeno pro budoucí použití</param>
        public GTable(GTable source, GDbTypeCopyOptions copyOptions ) : base( source as GDbType )
        {
            m_nDefaultValue = source.m_nDefaultValue;
        } // end method

        /// <summary>soukromý konstruktor</summary>
        /// <param name="readOnly">příznak hodnoty určené pouze pro čtení</param>
        /// <param name="unused">nevyužívaný parametr</param>
        protected GTable( bool readOnly, int unused ) : base( true )
        {
            if(readOnly)
                SetReadOnly( );
        } // end method
        #endregion

        #region vlastnosti

        /// <summary>hodnota typu byte[]</summary>
        public DataTable Value {
            get {
                if(IsNull) throw new GException(21300046,23200003,ThisAssembly); // pokus o přístup k hodnotě null
                return ((DataTable) ValueInstance);
            } // end method
            set { ValueInstance = value; }
        } // end property

        /// <summary>výchozí hodnota</summary>
        public DataTable DefaultValue {
            get { return m_nDefaultValue; }
            set {
                if(IsReadOnly) throw new GException(21300047,23200084,ThisAssembly); // hodnota je určena pouze ke čtení
                m_nDefaultValue = value;
            } // end method
        } // end property

        /// <summary>hodnota </summary>
        public DataTable BaseValue {
            get { return IsNull ? DefaultValue : (DataTable) ValueInstance; }
        } // end property

        /// <summary>instance hodnoty null určená pouze pro čtení</summary>
        public static GTable Null {
            get { return m_cgnNull; }
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(GTable).Assembly; }
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
        private static DataTable Convert( object sourceValue )
        {
            DataTable l_bReturnValue = null;

            if(sourceValue is DataTable)
                l_bReturnValue = (DataTable)sourceValue;
            else
                throw new GException( 21300035, 23200004, ThisAssembly ); // pokus o nepodporovanou konverzi typů

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
            return new GTable( this, null );
        } // end method

        /// <summary>obecná typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>výstupní hodnota</returns>
        public static GTable Parse(object inputValue)
        {
            throw new GNotImplementedException(21300039, 21300037, nameof(GTable), nameof(ParseValue)); //RC-EX 21300037 : Interní chyba aplikace. Pro {0} není metoda {1} podporována
        } // end method

        /// <summary>obecná typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="acceptNull">příznak přípustnosti hodnoty null, nepromítá se do hodnoty vlastnosti IsNullable</param>
        /// <returns>výstupní hodnota</returns>
        public static GTable Parse(object inputValue, bool acceptNull)
        {
            throw new GNotImplementedException(21300038, 21300037, nameof(GTable), nameof(ParseValue)); //RC-EX 21300037 : Interní chyba aplikace. Pro {0} není metoda {1} podporována
        } // end method

        /// <summary>nastavení hodnoty s případnou předchozí typovou konverzí</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        public override void ParseValue( object inputValue )
        {
            if (inputValue == null)
                ValueInstance = null;
            else if (inputValue is DataTable v_data)
                ValueInstance = v_data;
            else
                throw new GNotImplementedException(21300037, 21300037, nameof(GTable), nameof(ParseValue)); //RC-EX 21300037 : Interní chyba aplikace. Pro {0} není metoda {1} podporována
        } // end method

        /// <summary>porovnání hodnoty se vstupní hodnotou stejného typu</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>hodnota menší než nula pokud aktuální hodnota je v rámci třídění před vstupní hodnotou, hodnota nula pokud je na stejné pozici nebo hodnota větší než nula pokud je za vstupní hodnotou</returns>
        public override int CompareTo( object inputValue )
        {
            throw new GNotImplementedException( 21300040, 21300037, nameof(GTable), nameof(ParseValue)); //RC-EX 21300037 : Interní chyba aplikace. Pro {0} není metoda {1} podporována
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
            GTable l_gnInputObject = inputObject as GTable;
            return StructuralComparisons.StructuralEqualityComparer.Equals( BaseValue, l_gnInputObject );
        } // end method

        /// <summary>operátor porovnání</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě shody hodnot, jinak false</returns>
        public static bool operator ==( GTable a, GTable b )
        {
            return StructuralComparisons.StructuralEqualityComparer.Equals( a, a );
        } // end method

        /// <summary>operátor nerovnosti</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě neshody hodnot, jinak false</returns>
        public static bool operator !=(GTable a, GTable b )
        {
            return !StructuralComparisons.StructuralEqualityComparer.Equals( a, a );
        } // end method


        /// <summary>implicitní konverze z <see cref="DateTime"/></summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GDate</returns>
        public static implicit operator GTable( DataTable a )
        {
            return new GTable( a );
        } // end method

        /// <summary>implicitní konverze z GDate na DateTime ?</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu DateTime ?</returns>
        public static implicit operator DataTable (GTable a )
        {
            return a == null || a.IsNull ? null : (DataTable)a.Value;
        } // end method

        #endregion

        #region statická metoda Parse

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
        protected override string DebuggerDisplayValue => $"Rows = {((DataTable)ValueInstance).Rows.Count}";
        #endregion

        #region veřejné metody

        #endregion

        #region veřejné statické metody
        // nic
        #endregion

    } // end class


} // end namespace
