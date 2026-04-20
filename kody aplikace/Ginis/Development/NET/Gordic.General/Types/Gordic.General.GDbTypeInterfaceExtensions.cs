//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDbTypeInterfaceExtensions.cs          </Name>
//    <Description> Rozšíření IGAdmDtoControler                                 </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-11-14                                                  </Created>
//  </FileHeader>


using Newtonsoft.Json.Linq;
using System;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Text;

/*
            GString text = string.Empty;
            GString text2 = null;
            GString text3 = GString.Null;
            GString text4 = new GString("xxx");
            string pomocna = "";
            pomocna = text.Nvl();
            pomocna = text.Nvl("");
            pomocna = text.Nvl("x");
            text = text2;
            pomocna = text.Nvl();
            pomocna = text.Nvl("");
            pomocna = text.Nvl("x");
            text = text3;
            pomocna = text.Nvl();
            pomocna = text.Nvl("");
            pomocna = text.Nvl("x");
            text = text4;
            pomocna = text.Nvl();
            pomocna = text.Nvl("");
            pomocna = text.Nvl("x");

            GInt16 cislo = 0;
            GInt16 cislo2 = null;
            GInt16 cislo3 = GInt16.Null;
            GInt16 cislo4 = new GInt16(45);
            Int16? pom;
            pom = cislo.Nvl();
            pom = cislo.Nvl(10);
            cislo = cislo2;
            pom = cislo.Nvl();
            pom = cislo.Nvl(10);
            cislo = cislo3;
            pom = cislo.Nvl();
            pom = cislo.Nvl(10);
            cislo = cislo4;
            pom = cislo.Nvl();
            pom = cislo.Nvl(10);

            GDecimal dcislo = (decimal)1.22;
            GDecimal dcislo2 = null;
            GDecimal dcislo3 = GDecimal.Null;
            GDecimal dcislo4 = new GDecimal((decimal)45.44);
            decimal? dpom;
            dpom = dcislo.Nvl();
            dpom = dcislo.Nvl(10);
            dcislo = dcislo2;
            dpom = dcislo.Nvl();
            dpom = dcislo.Nvl(10);
            dcislo = dcislo3;
            dpom = dcislo.Nvl();
            dpom = dcislo.Nvl(10);
            dcislo = dcislo4;
            dpom = dcislo.Nvl();
            dpom = dcislo.Nvl(10);
 */


namespace Gordic.General
{
    /// <summary>
    /// Rozšíření IGDbType o funkce pro převod na UNL stringy a také pro testy, zda proměnné mají hodnoty
    /// </summary>
    public static class GDbTypeInterfaceExtensions
    {
        /// <summary>
        /// Vrátí hodnotový typ, který odpovídá G typu
        /// </summary>
        /// <param name="gType"></param>
        /// <returns></returns>
        public static Type GetUnderlyingType(this IGDbType gType)
        {
            Type v_vysledek = null;
            if (gType == null)
                v_vysledek = null;
            else if (gType.IsNull)
                v_vysledek = null;
            else if (gType is GBlob v_blob)
                v_vysledek = typeof( byte[] ) ;
            else if (gType is GTable v_table)
                v_vysledek = typeof( DataTable );
            else if (gType is GBoolean v_bool)
                v_vysledek = typeof( bool? );
            else if (gType is GDate v_date)
                v_vysledek = typeof(DateTime?);
            else if (gType is GDateTime v_datetime)
                v_vysledek = typeof(DateTime?);
            else if (gType is GDecimal v_dec)
                v_vysledek = typeof(Decimal?);
            else if (gType is GInt16 v_small)
                v_vysledek = typeof(Int16?);
            else if (gType is GInt32 v_int)
                v_vysledek = typeof(Int32?);
            else if (gType is GInt64 v_long)
                v_vysledek = typeof(Int64?);
            else if (gType is GString v_str)
                v_vysledek = typeof(String);
            return v_vysledek;
        }

        /// <summary>
        /// Převod na základní Nullable datové typy. 
        /// </summary>
        /// <param name="gType">IGDbType</param>
        /// <returns>Základní Nullable ValueType - tady až na Blob to array</returns>
        public static object ToNullableBaseType(this IGDbType gType)
        {
            object v_vysledek = null;
            if (gType == null)
                v_vysledek = null;
            else if (gType.IsNull)
                v_vysledek = null;
            else if (gType is GBlob v_blob)
                v_vysledek = v_blob.Value;
            else if (gType is GTable v_table)
                v_vysledek = v_table.Value;
            else if (gType is GBoolean v_bool)
                v_vysledek = v_bool.Value;
            else if (gType is GDate v_date)
                v_vysledek = v_date.Value;
            else if (gType is GDateTime v_datetime)
                v_vysledek = v_datetime.Value;
            else if (gType is GDecimal v_dec)
                v_vysledek = v_dec.Value;
            else if (gType is GInt16 v_small)
                v_vysledek = v_small.Value;
            else if (gType is GInt32 v_int)
                v_vysledek = v_int.Value;
            else if (gType is GInt64 v_long)
                v_vysledek = v_long.Value;
            else if (gType is GString v_str)
                v_vysledek = v_str.Value;
            return v_vysledek;
        }

        ///// <summary>
        ///// Vrátí hodnotu nebo null
        ///// </summary>
        ///// <param name="gType"></param>
        ///// <returns></returns>
        //public static T? Nvl<T>(this IGDbType gType) where T : struct, IFormattable
        //{
        //    object obj = gType.ToNullableBaseType();
        //    Type typ = gType.GetUnderlyingType();
        //    if (typ == null)
        //        return (null);
        //    else 
        //        return (T?)(Convert.ChangeType(obj, typ));
        //}

        ///// <summary>
        ///// Obdoba NVL funkce u DB stroje - pokud je instance NULL a nebo obsahuje NULL hodnotu, potom vrátí zadanou hodnotu druhého argumentu
        ///// </summary>
        ///// <param name="gType">G typ hodnota</param>
        ///// <param name="valForNullOrigValue">hodnota, která se má vrátit pokud je první argument NULL nebo jeho hodnota je DbNull </param>
        ///// <returns></returns>
        //public static T Nvl<T>(this IGDbType gType, T valForNullOrigValue) where T : struct, IFormattable
        //{
        //    object val = gType.ToNullableBaseType();
        //    if (val == null)
        //        return (valForNullOrigValue);
        //    else
        //        return (T)(Convert.ChangeType(val, valForNullOrigValue.GetType()));
        //}

        /// <summary>
        /// Konverze IGDbType na UNL string
        /// </summary>
        /// <param name="val"></param>
        /// <returns></returns>
        public static string ToUnlString(this IGDbType val)
        {
            return (GUnlFileUtils.ToUnlString(val));
        }

        /// <summary>
        /// Pokud G typ instance není NULL a samotná instance není NullOrEmpty
        /// </summary>
        /// <param name="val">G typ nebo NULL, který se prověřuje</param>
        /// <returns>true, pokud obsahuje instanci G typu s nějakou konkrétní nastavenou hondnotou jinou než DbNull nebo prázdno</returns>
        public static bool HasValue(this IGDbType val)
        {
            bool v_vysledek = true;

            if (val == null)
                v_vysledek = false;
            else if (val.IsNull)
                v_vysledek = false;
            else if (val is GString)
                v_vysledek = (!(val as GString).IsNullOrEmpty);

            return (v_vysledek);
        }

        /// <summary>
        /// Pokud G typ instance NENÍ NULL a samotná instance má hodnotu DbNull
        /// </summary>
        /// <param name="val">G typ nebo NULL, který se prověřuje</param>
        /// <returns>true, pokud obsahuje instanci G typu s nastavenou hodnotou na DbNull</returns>
        public static bool HasNullValue(this IGDbType val)
        {
            bool v_vysledek = false;

            if (val == null)
                v_vysledek = false;
            else if (val.IsNull)
                v_vysledek = true;

            return (v_vysledek);
        }


        /// <summary>
        /// Pokud G typ instance NENÍ NULL a samotná instance má hodnotu DbNull nebo prázdno
        /// </summary>
        /// <param name="val">G typ nebo NULL, který se prověřuje</param>
        /// <returns>true, pokud obsahuje instanci G typu s nastavenou hodnotou na DbNull </returns>
        public static bool HasNullOrEmptyValue(this IGDbType val)
        {
            bool v_vysledek = false;

            if (val == null)
                v_vysledek = false;
            else if (val.IsNull)
                v_vysledek = true;
            else if (val is GString)
                v_vysledek = ((val as GString).IsNullOrEmpty);

            return (v_vysledek);
        }

        /// <summary>
        /// Pokud G typ instance JE NULL a nebo samotná instance má hodnotu DbNull nebo prázdno
        /// </summary>
        /// <param name="val">G typ nebo NULL, který se prověřuje</param>
        /// <returns>true, pokud neobsahuje instanci G typu nebo je nastavena hodnotou DbNull nebo u stringu prázdno</returns>
        public static bool IsNullOrEmptyValue(this IGDbType val)
        {
            bool v_vysledek = false;

            if (val == null)
                v_vysledek = true;
            else if (val.IsNull)
                v_vysledek = true;
            else if (val is GString)
                v_vysledek = ((val as GString).IsNullOrEmpty);
            return (v_vysledek);
        }

        /// <summary>
        /// Pokud G typ instance JE NULL a nebo samotná instance má hodnotu DbNull nebo prázdno nebo WhiteSpace
        /// </summary>
        /// <param name="val">G typ nebo NULL, který se prověřuje</param>
        /// <returns>true, pokud neobsahuje instanci G typu nebo je nastavena hodnotou DbNull nebo u stringu prázdno nebo prázdné znaky</returns>
        public static bool IsNullOrEmptyOrWhiteSpaceValue(this IGDbType val)
        {
            bool v_vysledek = false;

            if (val == null)
                v_vysledek = true;
            else if (val.IsNull)
                v_vysledek = true;
            else if (val is GString)
                v_vysledek = String.IsNullOrWhiteSpace((val as GString).Value);
            return (v_vysledek);
        }

        /// <summary>
        /// Porovná hodnoty stejných G typů
        /// Pokud se typy liší, nevyvolá to chybu ale vrátí false
        /// </summary>
        /// <param name="val"></param>
        /// <param name="a_value"></param>
        /// <returns>true, pokud jsou porovnávané hodnoty stejných typů a jejich hodnoty jsou stejné</returns>
        public static bool IsEquals(this IGDbType val, IGDbType a_value)
        {
            bool v_vysledek = false;

            if (val == null && a_value == null)
                v_vysledek = true;
            else if (val == null && a_value != null)
                v_vysledek = false;
            else if (val != null && a_value == null)
                v_vysledek = false;
            else if (val.IsNull && a_value.IsNull)
                v_vysledek = true;
            else if (val.IsNull && !a_value.IsNull)
                v_vysledek = false;
            else if (!val.IsNull && a_value.IsNull)
                v_vysledek = false;
            else if (val is GInt16 && a_value is GInt16)
                v_vysledek = ((val as GInt16) == (a_value as GInt16));
            else if (val is GInt32 && a_value is GInt32)
                v_vysledek = ((val as GInt32) == (a_value as GInt32));
            else if (val is GInt64 && a_value is GInt64)
                v_vysledek = ((val as GInt64) == (a_value as GInt64));
            else if (val is GDateTime && a_value is GDateTime)
                v_vysledek = ((val as GDateTime) == (a_value as GDateTime));
            else if (val is GDate && a_value is GDate)
                v_vysledek = ((val as GDate) == (a_value as GDate));
            else if (val is GString && a_value is GString)
                v_vysledek = ((val as GString) == (a_value as GString));
            else if (val is GDecimal && a_value is GDecimal)
                v_vysledek = ((val as GDecimal) == (a_value as GDecimal));

            return (v_vysledek);
        }

        /// <summary>
        /// Porovnání hodnot dvou IGDbType - typy by měly být příbuzné 
        /// Pokud se porovnávají hodnoty nekompatibilních typů, potom se vyhlásí chyba GNotImplementedException(21300061)
        /// Porovnávané proměnné nesmí být null ale mohou mít hodnotu null
        /// Podporovány jsou:
        ///     Celá čísla x celá čísla
        ///     Datum nebo datumČas x Datum nebo datumČas
        ///     String x String
        ///     Decimal x Decima
        ///     Blob x Blob
        /// </summary>
        /// <param name="oldValue"></param>
        /// <param name="newValue"></param>
        /// <param name="trimed">U string hodnoty příznak, že se při porovnání ignorují mezery z prava</param>
        /// <returns></returns>
        public static bool IsEquivalent(this IGDbType oldValue, IGDbType newValue, bool trimed = false)
        {
            bool vysledek = true;

            if (newValue is GDateCurrent || newValue is GDateTimeCurrent)           // pokud nová hodnota je auto current čas
                vysledek = false;                                                   // bude to vždy changed hodnota
            else if (oldValue.IsNull && newValue.IsNull)                            // pokud jsou obe hodnoty NULL
            {
                vysledek = true;
            }
            else if ((oldValue.IsNull && !newValue.IsNull) || (!oldValue.IsNull && newValue.IsNull))  // pokud je jedna z hodnot NULL
            {
                vysledek = false;
            }
            else if (oldValue is GString strOld && newValue is GString strNew)  // pokud je to string
            {
                if (trimed && strOld.BaseValueTrimmed != strNew.BaseValueTrimmed)
                    vysledek = false;
                else if (!trimed && strOld.BaseValue != strNew.BaseValue)
                    vysledek = false;
            }
            else if (oldValue is IGDbTypeNumber numOld && newValue is IGDbTypeNumber numNew) // pokud je to celé číslo
            {
                if (numOld.ToInt64() != numNew.ToInt64())
                    vysledek = false;
            }
            else if (oldValue is IGDbTypeDateTime datOld && newValue is IGDbTypeDateTime datNew) // pokud je to obecne datumcas
            {
                if (datOld.Value != datNew.Value)
                    vysledek = false;
            }
            else if (oldValue is GDecimal decOld && newValue is GDecimal decNew)
            {
                if (decOld.Value != decNew.Value)
                    vysledek = false;
            }
            else if (oldValue is GBoolean bolOld && newValue is GBoolean bolNew)
            {
                if (bolOld.Value != bolNew.Value)
                    vysledek = false;
            }
            else if (oldValue is GBlob blobOld && newValue is GBlob blobNew)
            {
                if (blobOld.Value.Length != blobNew.Value.Length || !blobOld.Value.SequenceEqual(blobNew.Value))
                    vysledek = false;
            }
            else
                throw new GNotImplementedException(21300061, 21300044, nameof(IsEquivalent), oldValue.GetType().ToString(), newValue.GetType().ToString()); //RC-EX 21300044 : Interní chyba aplikace. Funkce [{0}] - Porovnání nepodporovaných typů [{1}] a [{2}]

            return (vysledek);
        }


        /// <summary>
        /// Funkce pro otrimování koncových mezer 
        /// Pokud by otrimováním vznikl prázdný string, potom se nastaví na jednu mezeru
        /// Původně prázdný stringy zůstane prázdný i po trimování
        /// </summary>
        /// <param name="a_hodnota">GString jehož textová hodnota se má otrimovat</param>
        /// <returns>Stejný GString jako byl na vstupu ale s upravenou textovou hodnotou</returns>
        public static GString DbTrim(this GString a_hodnota)
        {
            if (a_hodnota != null)
            {
                if (!a_hodnota.IsNullOrEmpty)
                {
                    string v_pomocna = a_hodnota.Value.TrimEnd();
                    if (a_hodnota.Value != v_pomocna && v_pomocna == "")     // pokud se jedná o prázdný string
                        a_hodnota.Value = " ";                              // nechám tam alespoň jednu mezeru
                    else if (a_hodnota.Value != v_pomocna)                   // pokud se otrimovaná hodnota liší od původní hodnoty
                        a_hodnota.Value = a_hodnota.Value.TrimEnd();       // otrimuji konec
                                                                           //v_prop_info.SetValue( a_dto, v_hodnota );                            // nastavím do DTO její hodnotu ( může být i NULL )
                }
            }
            return (a_hodnota);
        }
    }

    /// <summary>
    /// Extend na GTable
    /// </summary>
    public static class GTableExtensions
    {
        /// <summary>
        /// Podobně jako u DB strojů - pokud je zdrojová hodnota null, vrátí náhradní hodnotu, jinak vrací původní hodnotu
        /// </summary>
        /// <param name="a_val">Hodnota, který se má testovat na null hodnotu</param>
        /// <param name="a_val_for_null">Text, který se má dosadit v případě, že zdrojový text je null</param>
        /// <returns>Vrátí původní hodnotu a v případě, že byl null, potom vrátí náhradní hodnotu zadanou v argumentu.</returns>
        public static DataTable Nvl(this GTable a_val, DataTable a_val_for_null)
        {
            DataTable v_vysledek;
            if (a_val == null)
                v_vysledek = a_val_for_null;
            else if (a_val.IsNull)
                v_vysledek = a_val_for_null;
            else
                v_vysledek = a_val.Value;
            return v_vysledek;
        }

        /// <summary>
        /// Z GString vrací základní hodnotový nullable typ
        /// </summary>
        /// <param name="a_val">Hodnota, který se má testovat na null hodnotu</param>
        /// <returns>Vrátí hodnotu a v případě, že byl null, potom vrátí null.</returns>
        public static DataTable Nvl(this GTable a_val)
        {
            DataTable v_vysledek = null;
            if (a_val == null)
                v_vysledek = null;
            else if (a_val.IsNull)
                v_vysledek = null;
            else
                v_vysledek = a_val.BaseValue;
            return v_vysledek;
        }
    }

    /// <summary>
    /// Extend na Blob
    /// </summary>
    public static class GBlobExtensions
    {
        /// <summary>
        /// Podobně jako u DB strojů - pokud je zdrojová hodnota null, vrátí náhradní hodnotu, jinak vrací původní hodnotu
        /// </summary>
        /// <param name="a_val">Hodnota, který se má testovat na null hodnotu</param>
        /// <param name="a_val_for_null">Text, který se má dosadit v případě, že zdrojový text je null</param>
        /// <returns>Vrátí původní hodnotu a v případě, že byl null, potom vrátí náhradní hodnotu zadanou v argumentu.</returns>
        public static byte[] Nvl(this GBlob a_val, byte[] a_val_for_null)
        {
            byte[] v_vysledek;
            if (a_val == null)
                v_vysledek = a_val_for_null;
            else if (a_val.IsNull)
                v_vysledek = a_val_for_null;
            else
                v_vysledek = a_val.Value;
            return v_vysledek;
        }

        /// <summary>
        /// Z GString vrací základní hodnotový nullable typ
        /// </summary>
        /// <param name="a_val">Hodnota, který se má testovat na null hodnotu</param>
        /// <returns>Vrátí hodnotu a v případě, že byl null, potom vrátí null.</returns>
        public static byte[] Nvl(this GBlob a_val)
        {
            byte[] v_vysledek = null;
            if (a_val == null)
                v_vysledek = null;
            else if (a_val.IsNull)
                v_vysledek = null;
            else
                v_vysledek = a_val.BaseValue;
            return v_vysledek;
        }
    }

    /// <summary>
    /// Extend na Decimal
    /// </summary>
    public static class GDecimalExtensions
    {
        /// <summary>
        /// Podobně jako u DB strojů - pokud je zdrojová hodnota null, vrátí náhradní hodnotu, jinak vrací původní hodnotu
        /// </summary>
        /// <param name="a_val">Hodnota, který se má testovat na null hodnotu</param>
        /// <param name="a_val_for_null">Text, který se má dosadit v případě, že zdrojový text je null</param>
        /// <returns>Vrátí původní hodnotu a v případě, že byl null, potom vrátí náhradní hodnotu zadanou v argumentu.</returns>
        public static Decimal Nvl(this GDecimal a_val, Decimal a_val_for_null)
        {
            Decimal v_vysledek;
            if (a_val == null)
                v_vysledek = a_val_for_null;
            else if (a_val.IsNull)
                v_vysledek = a_val_for_null;
            else
                v_vysledek = a_val.Value;
            return v_vysledek;
        }

        /// <summary>
        /// Z GString vrací základní hodnotový nullable typ
        /// </summary>
        /// <param name="a_val">Hodnota, který se má testovat na null hodnotu</param>
        /// <returns>Vrátí hodnotu a v případě, že byl null, potom vrátí null.</returns>
        public static Decimal? Nvl(this GDecimal a_val)
        {
            Decimal? v_vysledek = null;
            if (a_val == null)
                v_vysledek = null;
            else if (a_val.IsNull)
                v_vysledek = null;
            else
                v_vysledek = a_val.BaseValue;
            return v_vysledek;
        }
    }

    /// <summary>
    /// Extend na Boolean
    /// </summary>
    public static class GBooleanExtensions
    {
        /// <summary>
        /// Podobně jako u DB strojů - pokud je zdrojová hodnota null, vrátí náhradní hodnotu, jinak vrací původní hodnotu
        /// </summary>
        /// <param name="a_val">Hodnota, který se má testovat na null hodnotu</param>
        /// <param name="a_val_for_null">Text, který se má dosadit v případě, že zdrojový text je null</param>
        /// <returns>Vrátí původní hodnotu a v případě, že byl null, potom vrátí náhradní hodnotu zadanou v argumentu.</returns>
        public static Boolean Nvl(this GBoolean a_val, Boolean a_val_for_null)
        {
            Boolean v_vysledek;
            if (a_val == null)
                v_vysledek = a_val_for_null;
            else if (a_val.IsNull)
                v_vysledek = a_val_for_null;
            else
                v_vysledek = a_val.Value;
            return v_vysledek;
        }

        /// <summary>
        /// Z GString vrací základní hodnotový nullable typ
        /// </summary>
        /// <param name="a_val">Hodnota, který se má testovat na null hodnotu</param>
        /// <returns>Vrátí hodnotu a v případě, že byl null, potom vrátí null.</returns>
        public static Boolean? Nvl(this GBoolean a_val)
        {
            Boolean? v_vysledek = null;
            if (a_val == null)
                v_vysledek = null;
            else if (a_val.IsNull)
                v_vysledek = null;
            else
                v_vysledek = a_val.BaseValue;
            return v_vysledek;
        }
    }

    /// <summary>
    /// Extend na DateTime
    /// </summary>
    public static class GDateExtensions
    {
        /// <summary>
        /// Podobně jako u DB strojů - pokud je zdrojová hodnota null, vrátí náhradní hodnotu, jinak vrací původní hodnotu
        /// </summary>
        /// <param name="a_val">Hodnota, který se má testovat na null hodnotu</param>
        /// <param name="a_val_for_null">Text, který se má dosadit v případě, že zdrojový text je null</param>
        /// <returns>Vrátí původní hodnotu a v případě, že byl null, potom vrátí náhradní hodnotu zadanou v argumentu.</returns>
        public static DateTime Nvl(this GDate a_val, DateTime a_val_for_null)
        {
            DateTime v_vysledek;
            if (a_val == null)
                v_vysledek = a_val_for_null;
            else if (a_val.IsNull)
                v_vysledek = a_val_for_null;
            else
                v_vysledek = a_val.Value;
            return v_vysledek;
        }

        /// <summary>
        /// Z GString vrací základní hodnotový nullable typ
        /// </summary>
        /// <param name="a_val">Hodnota, který se má testovat na null hodnotu</param>
        /// <returns>Vrátí hodnotu a v případě, že byl null, potom vrátí null.</returns>
        public static DateTime? Nvl(this GDate a_val)
        {
            DateTime? v_vysledek = null;
            if (a_val == null)
                v_vysledek = null;
            else if (a_val.IsNull)
                v_vysledek = null;
            else
                v_vysledek = a_val.BaseValue;
            return v_vysledek;
        }
    }

    /// <summary>
    /// Extend na DateTime
    /// </summary>
    public static class GDateTimeExtensions
    {
        /// <summary>
        /// Podobně jako u DB strojů - pokud je zdrojová hodnota null, vrátí náhradní hodnotu, jinak vrací původní hodnotu
        /// </summary>
        /// <param name="a_val">Hodnota, který se má testovat na null hodnotu</param>
        /// <param name="a_val_for_null">Text, který se má dosadit v případě, že zdrojový text je null</param>
        /// <returns>Vrátí původní hodnotu a v případě, že byl null, potom vrátí náhradní hodnotu zadanou v argumentu.</returns>
        public static DateTime Nvl(this GDateTime a_val, DateTime a_val_for_null)
        {
            DateTime v_vysledek;
            if (a_val == null)
                v_vysledek = a_val_for_null;
            else if (a_val.IsNull)
                v_vysledek = a_val_for_null;
            else
                v_vysledek = a_val.Value;
            return v_vysledek;
        }

        /// <summary>
        /// Z GString vrací základní hodnotový nullable typ
        /// </summary>
        /// <param name="a_val">Hodnota, který se má testovat na null hodnotu</param>
        /// <returns>Vrátí hodnotu a v případě, že byl null, potom vrátí null.</returns>
        public static DateTime? Nvl(this GDateTime a_val)
        {
            DateTime? v_vysledek = null;
            if (a_val == null)
                v_vysledek = null;
            else if (a_val.IsNull)
                v_vysledek = null;
            else
                v_vysledek = a_val.BaseValue;
            return v_vysledek;
        }
    }

    /// <summary>
    /// Extend na Int64
    /// </summary>
    public static class GInt64Extensions
    {
        /// <summary>
        /// Podobně jako u DB strojů - pokud je zdrojová hodnota null, vrátí náhradní hodnotu, jinak vrací původní hodnotu
        /// </summary>
        /// <param name="a_val">Hodnota, který se má testovat na null hodnotu</param>
        /// <param name="a_val_for_null">Text, který se má dosadit v případě, že zdrojový text je null</param>
        /// <returns>Vrátí původní hodnotu a v případě, že byl null, potom vrátí náhradní hodnotu zadanou v argumentu.</returns>
        public static Int64 Nvl(this GInt64 a_val, Int64 a_val_for_null)
        {
            Int64 v_vysledek;
            if (a_val == null)
                v_vysledek = a_val_for_null;
            else if (a_val.IsNull)
                v_vysledek = a_val_for_null;
            else
                v_vysledek = a_val.Value;
            return v_vysledek;
        }

        /// <summary>
        /// Z GString vrací základní hodnotový nullable typ
        /// </summary>
        /// <param name="a_val">Hodnota, který se má testovat na null hodnotu</param>
        /// <returns>Vrátí hodnotu a v případě, že byl null, potom vrátí null.</returns>
        public static Int64? Nvl(this GInt64 a_val)
        {
            Int64? v_vysledek = null;
            if (a_val == null)
                v_vysledek = null;
            else if (a_val.IsNull)
                v_vysledek = null;
            else
                v_vysledek = a_val.BaseValue;
            return v_vysledek;
        }
    }

    /// <summary>
    /// Extend na Int32
    /// </summary>
    public static class GInt32Extensions
    {
        /// <summary>
        /// Podobně jako u DB strojů - pokud je zdrojová hodnota null, vrátí náhradní hodnotu, jinak vrací původní hodnotu
        /// </summary>
        /// <param name="a_val">Hodnota, který se má testovat na null hodnotu</param>
        /// <param name="a_val_for_null">Text, který se má dosadit v případě, že zdrojový text je null</param>
        /// <returns>Vrátí původní hodnotu a v případě, že byl null, potom vrátí náhradní hodnotu zadanou v argumentu.</returns>
        public static Int32 Nvl(this GInt32 a_val, Int32 a_val_for_null)
        {
            Int32 v_vysledek;
            if (a_val == null)
                v_vysledek = a_val_for_null;
            else if (a_val.IsNull)
                v_vysledek = a_val_for_null;
            else
                v_vysledek = a_val.Value;
            return v_vysledek;
        }

        /// <summary>
        /// Z GString vrací základní hodnotový nullable typ
        /// </summary>
        /// <param name="a_val">Hodnota, který se má testovat na null hodnotu</param>
        /// <returns>Vrátí hodnotu a v případě, že byl null, potom vrátí null.</returns>
        public static Int32? Nvl(this GInt32 a_val)
        {
            Int32? v_vysledek = null;
            if (a_val == null)
                v_vysledek = null;
            else if (a_val.IsNull)
                v_vysledek = null;
            else
                v_vysledek = a_val.BaseValue;
            return v_vysledek;
        }
    }

    /// <summary>
    /// Extend na int16
    /// </summary>
    public static class GInt16Extensions
    {
        /// <summary>
        /// Podobně jako u DB strojů - pokud je zdrojová hodnota null, vrátí náhradní hodnotu, jinak vrací původní hodnotu
        /// </summary>
        /// <param name="a_val">Hodnota, který se má testovat na null hodnotu</param>
        /// <param name="a_val_for_null">Text, který se má dosadit v případě, že zdrojový text je null</param>
        /// <returns>Vrátí původní hodnotu a v případě, že byl null, potom vrátí náhradní hodnotu zadanou v argumentu.</returns>
        public static Int16 Nvl(this GInt16 a_val, Int16 a_val_for_null)
        {
            Int16 v_vysledek;
            if (a_val == null)
                v_vysledek = a_val_for_null;
            else if (a_val.IsNull)
                v_vysledek = a_val_for_null;
            else
                v_vysledek = a_val.Value;
            return v_vysledek;
        }

        /// <summary>
        /// Z GString vrací základní hodnotový nullable typ
        /// </summary>
        /// <param name="a_val">Hodnota, který se má testovat na null hodnotu</param>
        /// <returns>Vrátí hodnotu a v případě, že byl null, potom vrátí null.</returns>
        public static Int16? Nvl(this GInt16 a_val)
        {
            Int16? v_vysledek = null;
            if (a_val == null)
                v_vysledek = null;
            else if (a_val.IsNull)
                v_vysledek = null;
            else
                v_vysledek = a_val.BaseValue;
            return v_vysledek;
        }
    }

    /// <summary>
    /// Extend na GString
    /// </summary>
    public static class GStringExtensions
    {
        /// <summary>
        /// Vrátí začátek textu ořezaný na zadaný počet znaků ( nebo méně v případě, že text je kratší )
        /// </summary>
        /// <param name="a_text">Text, který se má ořezat</param>
        /// <param name="a_length">Maximální delka, na kterou se má ořezat</param>
        /// <returns></returns>
        public static string Left(this GString a_text, int a_length)
        {
            string v_vysledek = a_text;
            if (a_text.BaseValue.Length > a_length)
                v_vysledek = a_text.BaseValue.Substring(0, a_length);
            return v_vysledek;
        }

        /// <summary>
        /// Podobně jako u DB strojů - pokud je zdrojový text null, vrátí náhradní zadaný text, jinak vrací původní text
        /// </summary>
        /// <param name="a_text">Text, který se má testovat na null hodnotu</param>
        /// <param name="a_text_for_null">Text, který se má dosadit v případě, že zdrojový text je null</param>
        /// <returns>Vrátí původní text a v případě, že byl null, potom vrátí náhradní text zadaný v argumentu.</returns>
        public static string Nvl(this GString a_text, string a_text_for_null)
        {
            string v_vysledek = a_text;
            if (a_text == null)
                v_vysledek = a_text_for_null;
            else if (a_text.IsNull)
                v_vysledek = a_text_for_null;
            return v_vysledek;
        }

        /// <summary>
        /// Z GString vrací základní hodnotový nullable typ
        /// </summary>
        /// <param name="a_text">Text, který se má testovat na null hodnotu</param>
        /// <returns>Vrátí původní text a v případě, že byl null, potom vrátí null.</returns>
        public static string Nvl(this GString a_text)
        {
            string v_vysledek = null;
            if (a_text == null)
                v_vysledek = null;
            else if (a_text.IsNull)
                v_vysledek = null;
            else
                v_vysledek = a_text.BaseValue;
            return v_vysledek;
        }

        /// <summary>
        /// Podobně jako u DB strojů - Převede string na malá písměna. Pokud je string hodnotou NULL, výsledek je bez vyhlášení chyby také NULL.
        /// Pokud je GString instanace NULL, vrátí také null
        /// </summary>
        /// <param name="a_text">Text, který se má převést na malé znaky</param>
        /// <returns>Vrátí původní text převedený na malé znaky a v případě, že byl null, potom vrátí null.</returns>
        public static string Lower(this GString a_text)
        {
            string v_vysledek;

            if (a_text == null)
                v_vysledek = null;
            else if (a_text.IsNull)
                v_vysledek = null;
            else
                v_vysledek = a_text.BaseValue.ToLower();
            return v_vysledek;
        }
    }


}
