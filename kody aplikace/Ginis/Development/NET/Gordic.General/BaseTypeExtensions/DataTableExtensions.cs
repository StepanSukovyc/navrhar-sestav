//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.DataTableExtensions.cs                       </Name>
//    <Description> Rozšíření základní DataTable o nové funkce                  </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2019-11-18                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Rozšíření základní DataTable o nové funkce
    /// </summary>
    public static class DataTableExtensions
    {
        /// <summary>
        /// Jména všech sloupců se u zadané tabulky převedou na malá písmena
        /// Toto je vhodné realizovat např. u tabulek vzniklých dynamicky na základě selectu realizovaném proti ORACLE databázi - ta vrací jména sloupců selectu velkými písmeny.
        /// </summary>
        /// <param name="dataTable">Tabulka u které se mají jména sloupců převést na malá písmena.</param>
        public static void ColumnsNameToLower(this DataTable dataTable )
        {
            foreach (DataColumn v_sloupec in dataTable.Columns)
                v_sloupec.ColumnName = v_sloupec.ColumnName.ToLower();
            dataTable.AcceptChanges();
        }

        /// <summary>
        /// Převod DataTable na List of dictionary { string, object }
        /// </summary>
        /// <param name="a_datatable"></param>
        /// <returns></returns>
        public static List<Dictionary<string, object>> ToListDictionary(this DataTable a_datatable)
        {
            List<Dictionary<string, object>> v_vysledek = new List<Dictionary<string, object>>();
            foreach (DataRow v_row in a_datatable.Rows)
            {
                v_vysledek.Add(v_row.ToDictionary());
            }
            return v_vysledek;
        }

        /// <summary>
        /// Převod GDataTable na List of GDbTypeDictionary
        /// </summary>
        /// <param name="a_datatable"></param>
        /// <param name="lowercaseKeys">Všechny klíče budou pouze malými znaky</param>
        /// <param name="trimValues">Příznak, že se stringové hodnoty mají trimovat. Výchozí hodnota je trimovat mezery - To ale na oracle vede k hodnotě NULL!!</param>
        /// <returns></returns>
        public static List<GDbTypeDictionary> ToListGDbTypeDictionary(this GDataTable a_datatable, bool lowercaseKeys = false, bool trimValues = true)
        {
            List<GDbTypeDictionary> v_vysledek = new List<GDbTypeDictionary>();
            foreach (GDataRow v_row in a_datatable.Rows)
            {
                v_vysledek.Add(v_row.ToGDbTypeDictionary(lowercaseKeys: lowercaseKeys, trimValues: trimValues));
            }
            return v_vysledek;
        }

        /// <summary>
        /// Převod DataTable na List of GDbTypeDictionary
        /// </summary>
        /// <param name="a_datatable"></param>
        /// <param name="lowercaseKeys">Všechny klíče budou pouze malými znaky</param>
        /// <param name="trimValues">Příznak, že se stringové hodnoty mají trimovat. Výchozí hodnota je trimovat mezery - To ale na oracle vede k hodnotě NULL!!</param>
        /// <returns></returns>
        public static List<GDbTypeDictionary> ToListGDbTypeDictionary(this DataTable a_datatable, bool lowercaseKeys = false, bool trimValues = true)
        {
            List<GDbTypeDictionary> v_vysledek = new List<GDbTypeDictionary>();
            foreach (DataRow v_row in a_datatable.Rows)
            {
                v_vysledek.Add(v_row.ToGDbTypeDictionary(lowercaseKeys: lowercaseKeys, trimValues: trimValues));
            }
            return v_vysledek;
        }

        /// <summary>
        /// Do tabulky přidá řádek podle dat zadaného GDbTypeDictionary
        /// </summary>
        /// <param name="a_datatable"></param>
        /// <param name="items"></param>
        /// <returns></returns>
        public static DataRow AddRow( this DataTable a_datatable, GDbTypeDictionary items )
        {
            DataRow v_row = null;
            try
            {
                v_row = a_datatable.NewRow();
                foreach (string v_col_name in items.Keys)
                {
                    if (a_datatable.Columns.Contains(v_col_name))
                    {
                        if (items[v_col_name] == null || items[v_col_name].IsNull)
                            v_row[v_col_name] = DBNull.Value;
                        else
                            try
                            {
                                if(items[v_col_name] is GDecimal gDecimal && !gDecimal.IsNull )
                                {
                                    // toto je aktuální přesnost hodnoty nastavené v G typu
                                    int presnost = gDecimal.Precision;

                                    // pokud je na G typu nastavena max. přesnost => chápáno jako požadovaná přesnost  // větší ( tedy chápáno jako požadovaná přesnost )
                                    if (gDecimal.MaxPrecision != null)     // && gDecimal.Precision < gDecimal.MaxPrecision
                                        presnost = (int)gDecimal.MaxPrecision;

                                    // pokud je na sloupci tabulky nastavena přesnost => chápáno jako požadovaná přesnost
                                    decimal dec = gDecimal.Value;
                                    if ( a_datatable.Columns[v_col_name].ExtendedProperties != null && a_datatable.Columns[v_col_name].ExtendedProperties.ContainsKey("prec") )
                                    {
                                        int? prec = a_datatable.Columns[v_col_name].ExtendedProperties["prec"] as int?;
                                        if(prec != null && prec < 16)  // presnost < prec
                                                presnost = (int)prec;
                                    }

                                    // pokud je aktuální a požadovaná přesnost různá - musím decimal přepočítat
                                    if (presnost != gDecimal.Precision)
                                    {
                                        string decTxt = dec.ToString($"F{presnost}");
                                        dec = decimal.Parse(decTxt);
                                    }

                                    v_row[v_col_name] = dec;
                                }
                                else
                                    v_row[v_col_name] = items[v_col_name].DbValue;
                            }
                            catch (Exception error)
                            {
                                Debug.WriteLine($"Chyba přiřazení typu {items[v_col_name].DbValue.GetType().ToString()} do sloupce {v_col_name} typu {a_datatable.Columns[v_col_name].DataType.ToString()}");
                                Debug.WriteLine(error.Message);
                            }
                    }
                }
                a_datatable.Rows.Add(v_row);
            }
            catch( Exception error)
            {
                Debug.WriteLine(error.Message);
            }
            return v_row;
        }

        /// <summary>
        /// Převede data z interní DataTable na pole DTO objektů (na základě jeho property ) zadaného typu
        /// </summary>
        /// <typeparam name="TDto">Cílový typ řádku</typeparam>
        /// <param name="dataTable">DataTable se zdrojovými daty pro převod</param>
        /// <param name="trim">Příznak, zda stringové hodnoty při převodu trimovat. Výchozí nastavení je NE</param>
        /// <returns>Pole vytvořených a naplněných řádků zadaného typu</returns>
        public static TDto[] ConvertToDtoArrayByPropertyName<TDto>(this DataTable dataTable, bool trim = false) where TDto : new()
        {
            if (dataTable == null)
            {
                return null;
            }
            else
            {
                TDto[] dtoArray = new TDto[dataTable.Rows.Count];

                var properties = typeof(TDto).GetProperties();

                for (var i = 0; i < dataTable.Rows.Count; i++)
                {
                    var itemUdt = Activator.CreateInstance<TDto>();
                    for (var j = 0; j < properties.Length; j++)
                    {
                        object value = null;
                        object vysl = null;
                        string property_name = properties[j].Name;
                        if (dataTable.Columns.Contains(property_name))
                        {
                            if (!dataTable.Rows[i].IsNull(property_name))
                            {
                                value = dataTable.Rows[i][property_name];
                                Type typ = properties[j].PropertyType;
                                if (value == null)
                                    vysl = null;
                                else if (typ == value.GetType())
                                    vysl = value;
                                else // if (typ != value.GetType())
                                {
                                    // https://stackoverflow.com/questions/1106974/how-can-i-convert-to-a-specific-type-in-a-generic-version-of-tryparse
                                    try
                                    {
                                        Type conversionType = Nullable.GetUnderlyingType(typ) ?? typ;
                                        vysl = Convert.ChangeType(value, conversionType);
                                    }
                                    catch (Exception chyba)
                                    {
                                        Debug.WriteLine($"Chyba při konverzi hodnoty sloupce {property_name} hodnoty {value.ToString()}. Text chyby {chyba.Message}");
                                    }
                                }
                            }
                            try
                            {
                                if (trim && vysl is string text)
                                    vysl = text.Trim();
                                properties[j].SetValue(itemUdt, vysl);
                            }
                            catch (Exception chyba)
                            {
                                Debug.WriteLine($"Chyba při nastavení sloupce {property_name} hodnoty {value.ToString()}. Text chyby {chyba.Message}");
                            }
                        }
                    }
                    dtoArray[i] = itemUdt;
                }
                return dtoArray;
            }
        } // 

    }
}
