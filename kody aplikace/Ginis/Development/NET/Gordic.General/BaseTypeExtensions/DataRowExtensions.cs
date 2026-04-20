//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.DataRowExtensions.cs                         </Name>
//    <Description> Rozšíření základního typu DataRow o nové funkce             </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2019-11-18                                                  </Created>
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
    /// Rozšíření základního typu DataRow o nové funkce
    /// </summary>
    public static class DataRowExtensions
    {
        /// <summary>
        /// Konverze všech hodnot sloupců z datarow do GDbTypeDisctionaty
        /// </summary>
        /// <param name="a_datarow"></param>
        /// <param name="lowercaseKeys">Všechny klíče budou pouze malými znaky</param>
        /// <param name="trimValues">Příznak, že se stringové hodnoty mají trimovat. Výchozí hodnota je trimovat mezery - To ale na oracle vede k hodnotě NULL!!</param>
        /// <returns></returns>
        public static GDbTypeDictionary GDataRowToGDbTypeDictionary(GDataRow a_datarow, bool lowercaseKeys = false, bool trimValues = true)
        {
            GDbTypeDictionary v_vysledek = new GDbTypeDictionary();
            foreach (DataColumn v_sloupec in a_datarow.Table.Columns)
            {
                string v_col_name = v_sloupec.ColumnName;
                IGDbType v_value = a_datarow.GetDbValue(v_col_name, trimValues);
                if (lowercaseKeys)
                    v_col_name = v_col_name.ToLower();
                v_vysledek.Add(v_col_name, v_value);
            }
            return (v_vysledek);
        }
        /// <summary>
        /// Konverze všech hodnot sloupců z datarow do GDbTypeDictionaty
        /// </summary>
        /// <param name="a_datarow"></param>
        /// <param name="lowercaseKeys">Všechny klíče budou pouze malými znaky</param>
        /// <param name="trimValues">Příznak, že se stringové hodnoty mají trimovat. Výchozí hodnota je trimovat mezery - To ale na oracle vede k hodnotě NULL!!</param>
        /// <returns></returns>
        public static GDbTypeDictionary GDataRowToGDbTypeDictionary(DataRow a_datarow, bool lowercaseKeys = false, bool trimValues = true )
        {
            GDbTypeDictionary v_vysledek = new GDbTypeDictionary();
            foreach (DataColumn v_sloupec in a_datarow.Table.Columns)
            {
                string v_col_name = v_sloupec.ColumnName;
                object v_value = a_datarow[v_col_name];
                IGDbType gValue = GDataSet.GetDbValue(v_sloupec, v_value, trimValues ); // pokud neumí převést, potom nevyhazuje chybu ale vrací NULL !!!
                if (gValue == null)
                    gValue = new GDbTypeNull(); // toto je asi špatně - spíše bych měl vyhodit exception pokud neumím převést na správný typ

                if(lowercaseKeys)
                    v_col_name = v_col_name.ToLower();
                v_vysledek.Add(v_col_name, gValue);
            }
            return (v_vysledek);
        }

        /// <summary>
        /// Převod GDataRow na GDbTypeDictionary
        /// </summary>
        /// <param name="a_datarow">GDataRow jehož data se mají převést do GDbTypeDictionary</param>
        /// <param name="lowercaseKeys">Všechny klíče budou pouze malými znaky</param>
        /// <param name="trimValues">Příznak, že se stringové hodnoty mají trimovat. Výchozí hodnota je trimovat mezery - To ale na oracle vede k hodnotě NULL!!</param>
        /// <returns>Nově vytvořené GDbTypeDictionary</returns>
        public static GDbTypeDictionary ToGDbTypeDictionary(this GDataRow a_datarow, bool lowercaseKeys = false, bool trimValues = true)
        {
            return (GDataRowToGDbTypeDictionary(a_datarow, lowercaseKeys, trimValues));
        }

        ///// <summary>
        ///// Převod GDataRow na GDbTypeDictionary
        ///// </summary>
        ///// <param name="a_datarow">GDataRow jehož data se mají převést do GDbTypeDictionary</param>
        ///// <param name="lowercaseKeys">Všechny klíče budou pouze malými znaky</param>
        ///// <returns>Nově vytvořené GDbTypeDictionary</returns>
        //public static GDbTypeDictionary ToGDbTypeDictionary(this GDataRow a_datarow, bool lowercaseKeys = false)
        //{
        //    return (GDataRowToGDbTypeDictionary(a_datarow, lowercaseKeys));
        //}

        /// <summary>
        /// Převod DataRow na GDbTypeDictionary
        /// </summary>
        /// <param name="a_datarow">GDataRow jehož data se mají převést do GDbTypeDictionary</param>
        /// <param name="lowercaseKeys">Všechny klíče budou pouze malými znaky</param>
        /// <param name="trimValues">Příznak, že se stringové hodnoty mají trimovat. Výchozí hodnota je trimovat mezery - To ale na oracle vede k hodnotě NULL!!</param>
        /// <returns>Nově vytvořené GDbTypeDictionary</returns>
        public static GDbTypeDictionary ToGDbTypeDictionary(this DataRow a_datarow, bool lowercaseKeys = false, bool trimValues = true)
        {
            return (GDataRowToGDbTypeDictionary(a_datarow, lowercaseKeys, trimValues));
        }


        ///// <summary>
        ///// Převod DataRow na GDbTypeDictionary
        ///// </summary>
        ///// <param name="a_datarow">GDataRow jehož data se mají převést do GDbTypeDictionary</param>
        ///// <param name="lowercaseKeys">Všechny klíče budou pouze malými znaky</param>
        ///// <returns>Nově vytvořené GDbTypeDictionary</returns>
        //public static GDbTypeDictionary ToGDbTypeDictionary(this DataRow a_datarow, bool lowercaseKeys )
        //{
        //    return (GDataRowToGDbTypeDictionary(a_datarow, lowercaseKeys));
        //}

        /// <summary>
        /// Konverze všech hodnot sloupců z datarow do Dictionary
        /// </summary>
        /// <param name="a_datarow">Obecná DataRow</param>
        /// <returns></returns>
        public static Dictionary<string, object> DataRowToDictionary(DataRow a_datarow)
        {
            Dictionary<string, object> v_vysledek = new Dictionary<string, object>();
            foreach (DataColumn v_sloupec in a_datarow.Table.Columns)
            {
                object v_value = null;
                string v_col_name = v_sloupec.ColumnName;
                if (!a_datarow.IsNull(v_col_name))
                    v_value = a_datarow[v_col_name];
                v_vysledek.Add(v_col_name, v_value);
            }
            return (v_vysledek);
        }
        /// <summary>
        /// Převod DataRow na Dictionary
        /// </summary>
        /// <param name="a_datarow">GDataRow jehož data se mají převést do Dictionary</param>
        /// <returns>Nově vytvořené Dictionary string, object </returns>
        public static Dictionary<string, object> ToDictionary(this DataRow a_datarow)
        {
            return (DataRowToDictionary(a_datarow));
        }

        ///// <summary>
        ///// Převod DataRow na GDbTypeDictionary
        ///// </summary>
        ///// <param name="a_datarow">GDataRow jehož data se mají převést do Dictionary</param>
        ///// <returns>Nově vytvořené GDbTypeDictionary</returns>
        //public static GDbTypeDictionary ToGDbTypeDictionary(this DataRow a_datarow)
        //{
        //    return (new GDbTypeDictionary(DataRowToDictionary(a_datarow)));
        //}
    }
}
