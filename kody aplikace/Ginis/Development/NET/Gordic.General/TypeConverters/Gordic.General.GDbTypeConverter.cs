//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDbTypeConverter.cs                          </Name>
//    <Description> Pomocná třída pro konverzi základních typů na IGDbType      </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-11-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Pomocná třída pro konverzi základních typů na IGDbType
    /// </summary>
    public static class GDbTypeConverter
    {
        /// <summary>
        /// Převede hodnotu hodnotového typu nebo IGDbType na IGDbType nebo vyhlásí chybu
        /// 
        /// Pokud je hodnota zadána NULL, potom to převeden na zástupný G type GDbTypeNull ( to je signál pro další vrstvy, že je to G typ s hodnotou DB NULL )
        /// 
        /// </summary>
        /// <param name="a_param">Vstupní hodnota, která se má převést na IGDbType</param>
        /// <param name="dynamicByValue">
        /// U celočíselných typů se bude realizovat převod dynamicky, podle hodnoty na nejmenčí možný typ
        /// Výchozí chování je konverze přesně podle vstupního typu, tedy ne podle hodnoty
        /// </param>
        /// <returns>Odpovídající hodnota IGDbType</returns>
        public static IGDbType GetIGDbType(object a_param, bool dynamicByValue = false )
        {
            IGDbType v_vysledek = null;
            if (!TryGetIGDbType(a_param, out v_vysledek, dynamicByValue))
                throw new GInvalidCastException( 21300012, 21350007, a_param.GetType().ToString()); //RC-EX 21350007 : Interní chyba aplikace. Nepovolený typ {0} pro konverzi do IGDbType
            return (v_vysledek);
        }

        /// <summary>
        /// Pokus o převedení zadané proměnné do IGDbType. Pokud je proměnná převeditelná, potom se vrátí TRUE. Pokud se jedná o nepřevoditelný typ, potom se vrací FALSE.
        /// 
        /// </summary>
        /// <param name="a_param">Vstupní hodnota pro převod. Počítá se s IGDbType nebo s hodnotovým typem nebo nullable hodnotovým typem.</param>
        /// <param name="v_out_param">Výstupní převedená hodnota</param>
        /// <param name="dynamicByValue">
        /// U celočíselných typů se bude realizovat převod dynamicky, podle hodnoty na nejmenčí možný typ
        /// Výchozí chování je konverze přesně podle vstupního typu, tedy ne podle hodnoty
        /// </param>
        /// <returns>true pokud lze převést, false pokud nešlo převést.</returns>
        public static bool TryGetIGDbType(object a_param, out IGDbType v_out_param, bool dynamicByValue = false)
        {
            bool v_vysledek = true;
            v_out_param = null;

            if (a_param == null)
                v_out_param = new GDbTypeNull();
            else if (a_param is DBNull)                 // 2018-02-23
                v_out_param = new GDbTypeNull();
            else if (a_param.GetType().IsAssignableTo(typeof(IGDbType)))
                v_out_param = ((IGDbType)a_param);
            else if (a_param is string)
                v_out_param = (new GString((string)a_param));
            // tuto dynamiku zde potřebuji FFIALA

            else if (dynamicByValue && (a_param is decimal || a_param is decimal?))
            {
                decimal v_dec_pom = (decimal)a_param;
                if(v_dec_pom % 1 == 0)      // pokud se jedná o celé číslo
                {
                    long v_long = Convert.ToInt64(v_dec_pom);
                    if (v_long <= Int16.MaxValue && v_long > Int16.MinValue)        // Hodnota Int16.MinValue nesmí být včetně - dělá to problém s INFORMIX typem SMALLINT - ten má posunutu spodní hranici o jedna nahoru
                        v_out_param = (new GInt16((int)v_long));
                    else if (v_long <= Int32.MaxValue && v_long > Int32.MinValue)  // Hodnota Int32.MinValue nesmí být včetně - dělá to problém s INFORMIX typem integer - ten má posunutu spodní hranici o jedna nahoru
                        v_out_param = (new GInt32((int)v_long));
                    else if (v_long <= Int64.MaxValue && v_long >= Int64.MinValue)
                        v_out_param = (new GInt64(v_long));
                    else
                        v_out_param = (new GDecimal((decimal)a_param));
                }
                else
                    v_out_param = (new GDecimal((decimal)a_param));
            }
            else if (dynamicByValue && (a_param is long || a_param is long?))
            {
                long v_long = (long)a_param;
                if (v_long <= Int16.MaxValue && v_long > Int16.MinValue)        // Hodnota Int16.MinValue nesmí být včetně - dělá to problém s INFORMIX typem SMALLINT - ten má posunutu spodní hranici o jedna nahoru
                    v_out_param = (new GInt16((int)v_long));
                else if (v_long <= Int32.MaxValue && v_long > Int32.MinValue)  // Hodnota Int32.MinValue nesmí být včetně - dělá to problém s INFORMIX typem integer - ten má posunutu spodní hranici o jedna nahoru
                    v_out_param = (new GInt32((int)v_long));
                else if (v_long <= Int64.MaxValue && v_long >= Int64.MinValue)
                    v_out_param = (new GInt64(v_long));
                else
                    throw new GArgumentOutOfRangeException(21300007, 21350006, v_long.ToString(), typeof(Int32).ToString()); //RC-EX 21350006 : Interní chyba aplikace. Číselná hodnota [{0}] je mimo rozsah cílového typu [{1}]
            }
            else if (a_param is long)
                v_out_param = (new GInt64((long)a_param));
            else if (a_param is long?)
                v_out_param = (new GInt64((long?)a_param));
            // tuto dynamiku zde potřebuji FFIALA
            else if (dynamicByValue && (a_param is int || a_param is int?))
            {
                int v_int = (int)a_param;
                if (v_int <= Int16.MaxValue && v_int >= Int16.MinValue)
                    v_out_param = (new GInt16((int)v_int));
                else
                    v_out_param = (new GInt32((int)a_param));
            }
            else if (a_param is int)
                v_out_param = (new GInt32((int)a_param));
            else if (a_param is int?)
                v_out_param = (new GInt32((int?)a_param));
            else if (a_param is short)
                v_out_param = (new GInt16((Int16)a_param));
            else if (a_param is short?)
                v_out_param = (new GInt16((Int16?)a_param));

            else if (a_param is DateTime)
            {
                DateTime v_datum_a_cas = (DateTime)a_param;
                if (v_datum_a_cas.Hour == 0 && v_datum_a_cas.Minute == 0 && v_datum_a_cas.Second == 0 && v_datum_a_cas.Millisecond == 0)
                    v_out_param = (new GDate((DateTime)a_param));
                else
                    v_out_param = (new GDateTime((DateTime)a_param));
            }
            else if (a_param is DateTime?)
            {
                if (a_param == null)
                    v_out_param = GDate.Null;
                else
                {
                    DateTime v_datum_a_cas = (DateTime)a_param;
                    if (v_datum_a_cas.Hour == 0 && v_datum_a_cas.Minute == 0 && v_datum_a_cas.Second == 0 && v_datum_a_cas.Millisecond == 0)
                        v_out_param = (new GDate((DateTime)a_param));
                    else
                        v_out_param = (new GDateTime((DateTime)a_param));
                }
            }
            else if (a_param is DateTimeOffset || a_param is DateTimeOffset?)
            {
                DateTimeOffset v_datum_a_cas = (DateTimeOffset)a_param;
                if (v_datum_a_cas.Hour == 0 && v_datum_a_cas.Minute == 0 && v_datum_a_cas.Second == 0 && v_datum_a_cas.Millisecond == 0)
                    v_out_param = (new GDate(((DateTimeOffset)a_param).Date));
                else
                    v_out_param = (new GDateTime((DateTimeOffset)a_param));
            }
            else if (a_param is decimal)
                v_out_param = (new GDecimal((decimal)a_param));
            else if (a_param is decimal?)
                v_out_param = (new GDecimal((decimal?)a_param));
            else if (a_param is bool)
                v_out_param = (new GBoolean((bool)a_param));
            else if (a_param is bool?)
                v_out_param = (new GBoolean((bool?)a_param));
            else if (a_param is byte[])
                v_out_param = (new GBlob((byte[])a_param));
            else if (a_param is DataTable)
                v_out_param = (new GTable((DataTable)a_param));
            else if (a_param.GetType().BaseType == typeof(System.Enum))
                v_out_param = (new GInt32((int)a_param));
            else
                v_vysledek = false;
            return (v_vysledek);
        }

    }
}
