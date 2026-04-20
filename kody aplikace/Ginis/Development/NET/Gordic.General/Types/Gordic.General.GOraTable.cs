//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>          Gordic.General.GOraTable.cs                  </Name>
//    <Description>   databázová hodnota typu DataTable   </Description>
//    <Author>        FFIALA                                </Author>
//    <Copyright>     © GORDIC spol. s r. o. 1993 - 2021  </Copyright>
//    <Created>       2007-12-11                                  </Created>
//  </FileHeader>


// funkční varianta s TABLE typem - vyžaduje ale referenci na Oracle.ManagedDataAccess.dll

using System;
using System.Data.OleDb;
using System.ComponentModel;
using System.Reflection;
using System.Diagnostics;
using System.Linq;
using System.Collections;
using System.Data;
using Oracle.ManagedDataAccess.Types;
using Oracle.ManagedDataAccess.Client;


namespace Gordic.General {


    // https://stackoverflow.com/questions/31890745/c-sharp-datatable-to-oracle-stored-procedure

    /// <summary>databázová hodnota typu DataTable pro ORACLE</summary>
    [Serializable]
    [TypeConverter( typeof(GTableConverter) )]
    public class GOraTable<TUdtTable, TUdtItem> : GTable, IGOracleGTable
        where TUdtTable : GOracleUdtCollectionBase<TUdtTable, TUdtItem>, new() where TUdtItem : GOracleUdtBase<TUdtItem>, new()
{

#region soukromé členy

        ///// <summary>výchozí hodnota</summary>
        //private DataTable m_nDefaultValue = null;

        /// <summary>instance hodnoty null určená pouze pro čtení</summary>
        private static readonly GOraTable<TUdtTable, TUdtItem> m_cgnNull = new GOraTable<TUdtTable, TUdtItem>( null, true );

#endregion

#region konstruktory

        /// <summary>veřejný konstruktor</summary>
        public GOraTable( ) : base(  ) { }

        /// <summary>veřejný konstruktor</summary>
        /// <param name="a_value">inicializační hodnota</param>
        public GOraTable( DataTable a_value ) : base(a_value)
        {
            ValueInstance = a_value;
        } // end method

        /// <summary>veřejný konstruktor</summary>
        /// <param name="a_value">inicializační hodnota</param>
        /// <param name="isNullable">příznak povolení hodnoty null</param>
        public GOraTable(DataTable a_value, bool isNullable ) : base(a_value, isNullable)
        {
            ValueInstance = a_value;
        } // end method

        /// <summary>veřejný konstruktor</summary>
        /// <param name="a_value">inicializační hodnota</param>
		/// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
		public GOraTable(DataTable a_value, string sourceColumn ) : this( a_value, true, sourceColumn )
        {
        } // end method

        /// <summary>veřejný konstruktor</summary>
        /// <param name="a_value">inicializační hodnota</param>
        /// <param name="isNullable">příznak povolení hodnoty null</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GOraTable(DataTable a_value, bool isNullable, string sourceColumn ) : base(a_value, isNullable, sourceColumn )
        {
            ValueInstance = a_value;
            SourceColumn = sourceColumn;
        } // end method

        /// <summary>veřejný kopírovací konstruktor</summary>
        /// <param name="source">zdrojová instance</param>
        /// <param name="copyOptions">vhrazeno pro budoucí použití</param>
        public GOraTable(GOraTable<TUdtTable, TUdtItem> source, GDbTypeCopyOptions copyOptions ) : base( source as GTable, copyOptions )
        {
            m_nDefaultValue = source.m_nDefaultValue;
        } // end method

        /// <summary>soukromý konstruktor</summary>
        /// <param name="readOnly">příznak hodnoty určené pouze pro čtení</param>
        /// <param name="unused">nevyužívaný parametr</param>
        private GOraTable( bool readOnly, int unused ) : base( readOnly, unused )
        {
            if(readOnly)
                SetReadOnly( );
        } // end method
#endregion

#region vlastnosti

        /// <summary>instance hodnoty null určená pouze pro čtení</summary>
        public new static GOraTable<TUdtTable, TUdtItem> Null {
            get { return m_cgnNull; }
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(GOraTable<TUdtTable, TUdtItem>).Assembly; }
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
                throw new GException( 21300049, 23200004, ThisAssembly ); // pokus o nepodporovanou konverzi typů

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
            return new GOraTable<TUdtTable, TUdtItem>( this, null );
        } // end method

        /// <summary>obecná typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>výstupní hodnota</returns>
        public static new GOraTable<TUdtTable, TUdtItem> Parse(object inputValue)
        {
            throw new GNotImplementedException(21300052, 21300037, nameof(GOraTable<TUdtTable, TUdtItem>), nameof(ParseValue)); //RC-EX 21300037 : Interní chyba aplikace. Pro {0} není metoda {1} podporována
        } // end method

        /// <summary>obecná typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="acceptNull">příznak přípustnosti hodnoty null, nepromítá se do hodnoty vlastnosti IsNullable</param>
        /// <returns>výstupní hodnota</returns>
        public static new GOraTable<TUdtTable, TUdtItem> Parse(object inputValue, bool acceptNull)
        {
            throw new GNotImplementedException(21300051, 21300037, nameof(GOraTable<TUdtTable, TUdtItem>), nameof(ParseValue)); //RC-EX 21300037 : Interní chyba aplikace. Pro {0} není metoda {1} podporována
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
                throw new GNotImplementedException(21300054, 21300037, nameof(GOraTable<TUdtTable, TUdtItem>), nameof(ParseValue)); //RC-EX 21300037 : Interní chyba aplikace. Pro {0} není metoda {1} podporována
        } // end method

        /// <summary>porovnání hodnoty se vstupní hodnotou stejného typu</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>hodnota menší než nula pokud aktuální hodnota je v rámci třídění před vstupní hodnotou, hodnota nula pokud je na stejné pozici nebo hodnota větší než nula pokud je za vstupní hodnotou</returns>
        public override int CompareTo( object inputValue )
        {
            throw new GNotImplementedException( 21300085, 21300037, nameof(GOraTable<TUdtTable, TUdtItem>), nameof(ParseValue)); //RC-EX 21300037 : Interní chyba aplikace. Pro {0} není metoda {1} podporována
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
            GOraTable<TUdtTable, TUdtItem> l_gnInputObject = inputObject as GOraTable<TUdtTable, TUdtItem>;
            return StructuralComparisons.StructuralEqualityComparer.Equals( BaseValue, l_gnInputObject );
        } // end method

        /// <summary>operátor porovnání</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě shody hodnot, jinak false</returns>
        public static bool operator ==( GOraTable<TUdtTable, TUdtItem> a, GOraTable<TUdtTable, TUdtItem> b )
        {
            return StructuralComparisons.StructuralEqualityComparer.Equals( a, a );
        } // end method

        /// <summary>operátor nerovnosti</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě neshody hodnot, jinak false</returns>
        public static bool operator !=(GOraTable<TUdtTable, TUdtItem> a, GOraTable<TUdtTable, TUdtItem> b )
        {
            return !StructuralComparisons.StructuralEqualityComparer.Equals( a, a );
        } // end method


        /// <summary>implicitní konverze z <see cref="DateTime"/></summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GDate</returns>
        public static implicit operator GOraTable<TUdtTable, TUdtItem>( DataTable a )
        {
            return new GOraTable<TUdtTable, TUdtItem>( a );
        } // end method

        /// <summary>implicitní konverze z GDate na DateTime ?</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu DateTime ?</returns>
        public static implicit operator DataTable (GOraTable<TUdtTable, TUdtItem> a )
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
        /// <summary>
        /// Převede data z interní DataTable na ORACLE UDT object
        /// </summary>
        /// <returns></returns>
        public object ConvertDataTableToOracleUdt() 
        {
            if (IsNull)
            {
                return null;
            }
            else
            {
                DataTable dataTable = (DataTable)ValueInstance;
                var tableUdt = Activator.CreateInstance<TUdtTable>();
                tableUdt.Values = (TUdtItem[])tableUdt.CreateArray(dataTable.Rows.Count);
                var fields = typeof(TUdtItem).GetFields();

                for (var i = 0; i < dataTable.Rows.Count; i++)
                {
                    var itemUdt = Activator.CreateInstance<TUdtItem>();
                    for (var j = 0; j < fields.Length; j++)
                    {
                        fields[j].SetValue(itemUdt, dataTable.Rows[i][j]);
                    }
                    tableUdt.Values[i] = itemUdt;
                }
                return tableUdt;
            }
        }

#endregion

#region veřejné statické metody
        // nic
#endregion

    } // end class



    /// <summary>
    /// Obecná třída pro popis ORACLE UDT tabulkového typu
    /// Je určena pro dědění pro práci s TABLE argumenty pro volání ORACLE SP
    /// </summary>
    /// <typeparam name="TType"></typeparam>
    /// <typeparam name="TValue"></typeparam>
    public abstract class GOracleUdtCollectionBase<TType, TValue> : GOracleUdtBase<TType>, IOracleArrayTypeFactory where TType : GOracleUdtBase<TType>, new()
    {
        /// <summary>
        /// Interní proměnná C# řádkového typu (obdoby DTO ale označena atribudy pro mapování na ORACLE UDT typ )
        /// </summary>
        [OracleArrayMapping()]
        public TValue[] Values;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="connection"></param>
        /// <param name="udt"></param>
        public override void FromCustomObject(OracleConnection connection, object udt)
        {
            OracleUdt.SetValue(connection, udt, 0, Values);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="connection"></param>
        /// <param name="udt"></param>
        public override void ToCustomObject(OracleConnection connection, object udt)
        {
            Values = (TValue[])OracleUdt.GetValue(connection, udt, 0);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="numElems"></param>
        /// <returns></returns>
        public Array CreateArray(int numElems)
        {
            return new TValue[numElems];
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="numElems"></param>
        /// <returns></returns>
        public Array CreateStatusArray(int numElems)
        {
            return null;
        }
    }

    /// <summary>
    /// Obecná třída pro popis ORACLE UDT řádkového typu
    /// Je určena pro dědění pro práci s TABLE argumenty pro volání ORACLE SP
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public abstract class GOracleUdtBase<T> : IOracleCustomType, IOracleCustomTypeFactory, INullable where T : GOracleUdtBase<T>, new()
    {
        private bool _isNull;
        /// <summary>
        /// Interní proměnná C# tabulkového typu (obdoby List of DTO ale označena atribudy pro mapování na ORACLE UDT typ )
        /// </summary>
        /// <returns></returns>
        public IOracleCustomType CreateObject()
        {
            return new T();
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="con"></param>
        /// <param name="udt"></param>
        public abstract void FromCustomObject(OracleConnection con, object udt);
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="con"></param>
        /// <param name="udt"></param>
        public abstract void ToCustomObject(OracleConnection con, object udt);

        /// <summary>
        /// 
        /// </summary>
        public bool IsNull
        {
            get { return this._isNull; }
        }
        /// <summary>
        /// 
        /// </summary>
        public static T Null
        {
            get { return new T { _isNull = true }; }
        }
    }

} // end namespace


