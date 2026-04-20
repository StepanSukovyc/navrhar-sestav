//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDbTypeNull.cs                               </Name>
//    <Description> G-typ reprezentující v rámci akcí Insert a Update hodnotu NULL - jinde by se tento typ neměl používat.</Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2018-05-02                                                  </Created>
//  </FileHeader>


using System;
using System.Data.OleDb;
using System.Reflection;

namespace Gordic.General
{
    /// <summary>
    /// G-typ reprezentující v rámci akcí Insert a Update hodnotu NULL - jinde by se tento typ neměl používat.
    /// 
    /// Je určen pro přenos hodnoty DB NULL v případě, že dynamické objekty přesně neví, o jaký cílový datový typ se jedná
    /// 
    /// Před konkrétním použitím si objekty tento objekt musí přetypovat na konkrétní G type
    /// </summary>
    public class GDbTypeNull : GDbType
    {

        /// <summary>instance hodnoty null určená pouze pro čtení</summary>
        private static readonly GDbTypeNull m_cgnNull = new GDbTypeNull(  );


        /// <summary>
        /// Výchozí konstruktor
        /// </summary>
        public GDbTypeNull( ) : base(true) 
        {
            this.IsNull = true;
            SetReadOnly( );
        }

        /// <summary>
        /// Výchozí konstruktor se zadáním jména zdrojového sloupce
        /// </summary>
        public GDbTypeNull(string SourceColumn) : base(true)
        {
            this.IsNull = true;
            base.SourceColumn = SourceColumn;
            SetReadOnly();
        }

        #region vlastnosti
        /// <summary>hodnota typu logická 0 nebo 1 s ohledem na hodnotu null</summary>
        public object Value
        {
            get
            {
                //if(IsNull)
                //    throw new GException( 23200160, 21300010, ThisAssembly );  //RC-EX 21300010 : pokus o přístup k hodnotě null
                return null;
            } // end method
        } // end property

        /// <summary>výchozí hodnota</summary>
        public object DefaultValue
        {
            get { return null; }
            set
            {
                throw new GException( 21300011, 23200084, ThisAssembly );  //RC-EX 23200084 : hodnota je určena pouze ke čtení
            } // end method
        } // end property

        /// <summary>hodnota null</summary>
        public object BaseValue
        {
            get { return null; }
        } // end property

        /// <summary>instance hodnoty null určená pouze pro čtení</summary>
        public static GDbTypeNull Null
        {
            get { return m_cgnNull; }
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly
        {
            get { return typeof(GDbTypeNull).Assembly; }
        } // end property


        /// <summary>zdrojový sloupec v databázové tabulce</summary>
        public new string SourceColumn
        {
            get { return base.SourceColumn; }
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
        /// <returns>hodnota </returns>
        protected override object ConvertValue( object sourceValue )
        {
            return Convert( sourceValue );
        } // end method

        /// <summary>konverze vstupní hodnoty</summary>
        /// <param name="sourceValue">vstupní hodnota</param>
        /// <returns>hodnota typu typu logická 0 nebo 1</returns>
        private static object Convert( object sourceValue )
        {
            throw new GException( 21300009, 21350005, ThisAssembly ); //RC-EX 21350005 : pokus o nepodporovanou konverzi typů
        } // end method

        
        /// <summary>porovnání dvou hodnot s ohledem na typ</summary>
        /// <param name="valueOne">první hodnota</param>
        /// <param name="valueTwo">druhá hodnota</param>
        /// <returns>true pokud se hodnoty shodují, jinak false</returns>
        protected override bool CompareValues( object valueOne, object valueTwo )
        {
            throw new GException( 21300010, 21350005, ThisAssembly );  //RC-EX 21350005 : pokus o nepodporovanou konverzi typů
        } // end method

        /// <summary>vytvoření identické kopie objektu</summary>
        /// <returns>nová instance objektu</returns>
        /// <remarks>příznak hodnoty určené pouze ke čtení je u nově vzniklé instance vždy negativní</remarks>
        public override object Clone( )
        {
            return new GDbTypeNull( );
        } // end method

        /// <summary>nastavení hodnoty s případnou předchozí typovou konverzí</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        public override void ParseValue( object inputValue )
        {
            throw new GException( 21300006, 23200084, ThisAssembly ); //RC-EX 23200084 : hodnota je určena pouze ke čtení
        } // end method

        /// <summary>porovnání hodnoty se vstupní hodnotou stejného typu</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>hodnota menší než nula pokud aktuální hodnota je v rámci třídění před vstupní hodnotou, hodnota nula pokud je na stejné pozici nebo hodnota větší než nula pokud je za vstupní hodnotou</returns>
        public override int CompareTo( object inputValue )
        {
            if(inputValue == null)
                return 0;
            else
                return 1;
        } // end method
        #endregion

        #region přetížené operátory
        /*
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
            return inputObject == null;
        } // end method

        /// <summary>operátor porovnání</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě shody hodnot, jinak false</returns>
        public static bool operator ==( GDbTypeNull a, GDbTypeNull b )
        {
            if((object)a == null)
            {
                if((object)b == null)
                    return true;
                else
                    return false;
            }
            else if((object)b == null)
                return false;
            if(a.IsNull)
            {
                if(b.IsNull)
                    return true;
                else
                    return false;
            }
            else if(b.IsNull)
                return false;
            return false;
        } // end method

        /// <summary>operátor nerovnosti</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě neshody hodnot, jinak false</returns>
        public static bool operator !=( GDbTypeNull a, GDbTypeNull b )
        {
            return (a == b) == false;
        } // end method


        /// <summary>operátor větší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě, že hodnota levého operandu je větší než hodnota pravého, jinak false</returns>
        public static bool operator >( GDbTypeNull  a, GDbTypeNull b )
        {
            throw new GException( 21300006, 23200003, ThisAssembly ); // pokus o přístup k hodnotě null

        } // end method

        /// <summary>operátor menší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě, že hodnota levého operandu je menší než hodnota pravého, jinak false</returns>
        public static bool operator <( GDbTypeNull a, GDbTypeNull b )
        {
            throw new GException( 21300007, 23200003, ThisAssembly ); // pokus o přístup k hodnotě null         
        } // end method

        /// <summary>operátor větší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě, že hodnota levého operandu je větší nebo rovná hodnotě pravého, jinak false</returns>
        public static bool operator >=( GDbTypeNull a, GDbTypeNull b )
        {
            throw new GException( 21300008, 23200003, ThisAssembly ); // pokus o přístup k hodnotě null         
        } // end method

        /// <summary>operátor menší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v případě, že hodnota levého operandu je menší nebo rovná hodnotě pravého, jinak false</returns>
        public static bool operator <=( GDbTypeNull a, GDbTypeNull b )
        {
            throw new GException( 21300009, 23200003, ThisAssembly ); // pokus o přístup k hodnotě null         
        } // end method
        */
        #endregion

        #region statická metoda Parse
        /*
                /// <summary>obecná typová konverze</summary>
                /// <param name="inputValue">vstupní hodnota</param>
                /// <returns>výstupní hodnota</returns>
                public static GBoolean Parse( object inputValue )
                {
                    return Parse( inputValue, false );
                } // end method

                /// <summary>obecná typová konverze</summary>
                /// <param name="inputValue">vstupní hodnota</param>
                /// <param name="acceptNull">příznak přípustnosti hodnoty null</param>
                /// <returns>výstupní hodnota</returns>
                public static GBoolean Parse( object inputValue, bool acceptNull )
                {
                    GBoolean l_gbBoolean = null;
                    if(inputValue == null || (acceptNull && inputValue is string && inputValue.ToString( ).Trim( ) == String.Empty))
                    {
                        if(acceptNull)
                            l_gbBoolean = new GBoolean( );
                        else
                            throw new GArgumentNullException( 23200164 ); // neinicializovaná hodnota parametru
                    }
                    else if(inputValue is string)
                        l_gbBoolean = ParseString( (string)inputValue );
                    else if(inputValue is GDate || inputValue is GDateTime || inputValue is GEkoDate)
                        throw new GInvalidCastException( 23200165 ); // pokus o nepovolenou typovou konverzi
                    else if(inputValue is GString && ((GString)inputValue).IsNull == false)
                        l_gbBoolean = ParseString( inputValue.ToString( ) );
                    else
                    {
                        l_gbBoolean = new GBoolean( );
                        if(inputValue is IGDbType)
                            l_gbBoolean.DbValue = ((IGDbType)inputValue).DbValue;
                        else
                            l_gbBoolean.DbValue = inputValue;
                    } // end if
                    return l_gbBoolean;
                } // end method

                /// <summary>typová konverze</summary>
                /// <param name="inputValue">vstupní hodnota</param>
                /// <returns>výstupní hodnota</returns>
                private static GBoolean ParseString( string inputValue )
                {
                    GBoolean l_gbBoolean = new GBoolean( );
                    inputValue = inputValue == null ? String.Empty : inputValue.Trim( );
                    if(String.Compare( inputValue, Boolean.TrueString, true ) == 0)
                        l_gbBoolean.Value = true;
                    else if(String.Compare( inputValue, GResources.GetResourceText( ThisAssembly, 23230007 ), true ) == 0)
                        l_gbBoolean.Value = true; // ano
                    else if(String.Compare( inputValue, "yes", true ) == 0)
                        l_gbBoolean.Value = true;
                    else if(String.Compare( inputValue, "on", true ) == 0)
                        l_gbBoolean.Value = true;
                    else if(String.Compare( inputValue, Boolean.FalseString, true ) == 0)
                        l_gbBoolean.Value = false;
                    else if(String.Compare( inputValue, GResources.GetResourceText( ThisAssembly, 23230008 ), true ) == 0)
                        l_gbBoolean.Value = false; // ne
                    else if(String.Compare( inputValue, "no", true ) == 0)
                        l_gbBoolean.Value = false;
                    else if(String.Compare( inputValue, "off", true ) == 0)
                        l_gbBoolean.Value = false;
                    else if(String.Compare( inputValue, "y", true ) == 0)
                        l_gbBoolean.Value = true;
                    else if(String.Compare( inputValue, "n", true ) == 0)
                        l_gbBoolean.Value = false;
                    else if(String.Compare( inputValue, GResources.GetResourceText( ThisAssembly, 23230007 )[0].ToString( ), true ) == 0)
                        l_gbBoolean.Value = true; // ano
                    else if(String.Compare( inputValue, GResources.GetResourceText( ThisAssembly, 23230008 )[0].ToString( ), true ) == 0)
                        l_gbBoolean.Value = false; // ne
                    else
                    {
                        try
                        {
                            l_gbBoolean.Value = Decimal.Parse( inputValue ) != 0;
                        }
                        catch { } // end try
                    } // end if
                    return l_gbBoolean;
                } // end method

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
                    return BaseValue.ToString( formatProvider );
                } // end method

                /// <summary>převod hodnoty na text</summary>
                /// <param name="involveNull">příznak zahrnutí hodnoty null</param>
                /// <returns>textová reprezentace hodnoty</returns>
                public override string ToString( bool involveNull )
                {
                    return (involveNull && IsNull) ? NullString : BaseValue.ToString( );
                } // end method

                #endregion

                #region veřejné metody

                /// <summary>zjištění zda se hodnota nachází v předaném výčtu hodnot</summary>
                /// <param name="items">výčet hodnot</param>
                /// <returns>true v případě, že se hodnota nachází v předaném výčtu hodnot, jinak false</returns>
                public bool In( params GBoolean[] items )
                {
                    if(items == null)
                        return false;
                    else if(IsNull)
                        return items.Where( item => item.IsNull ).Any( );
                    else
                        return items.Where( item => item.BaseValue == BaseValue ).Any( );
                } // end method

                #endregion

                #region veřejné statické metody

                /// <summary>vrací instanci s větší hodnotou</summary>
                /// <param name="first">první instance</param>
                /// <param name="second">druhá instance</param>
                /// <returns>instance s větší hodnotou</returns>
                public static GBoolean Max( GBoolean first, GBoolean second )
                {
                    return (first > second) ? first : second;
                } // end method

                /// <summary>vrací instanci s menší hodnotou</summary>
                /// <param name="first">první instance</param>
                /// <param name="second">druhá instance</param>
                /// <returns>instance s menší hodnotou</returns>
                public static GBoolean Min( GBoolean first, GBoolean second )
                {
                    return (first < second) ? first : second;
                } // end method
        */
        #endregion

        #region přetížená metoda ToString

        /// <summary>převod hodnoty na text</summary>
        /// <returns>textová reprezentace hodnoty</returns>
        public override string ToString( )
        {
            return "NULL";
        } // end method

        /// <summary>převod hodnoty na text</summary>
        /// <param name="formatProvider">hodnota typu <see cref="IFormatProvider"/> s informacemi o požadovaném formátu</param>
        /// <returns>textová reprezentace hodnoty</returns>
        public override string ToString( IFormatProvider formatProvider )
        {
            return "NULL";
        } // end method

        /// <summary>převod hodnoty na text</summary>
        /// <param name="involveNull">příznak zahrnutí hodnoty null</param>
        /// <returns>textová reprezentace hodnoty</returns>
        public override string ToString( bool involveNull )
        {
            return (involveNull && IsNull) ? NullString : "NULL";
        } // end method

        #endregion


    }
}
