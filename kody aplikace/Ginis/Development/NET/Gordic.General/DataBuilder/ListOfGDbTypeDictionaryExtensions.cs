//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ListOfGDbTypeDictionaryExtensions.cs         </Name>
//    <Description> Rozšíření Listu GDbTypeDictionary                           </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2019-11-11                                                  </Created>
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
    /// Rozšíření Listu GDbTypeDictionary 
    /// </summary>
    public static class ListOfGDbTypeDictionaryExtensions
    {
        /// <summary>
        /// Funkce pro porovnání dvou tabulek předaných formou listů řádků
        /// </summary>
        /// <param name="origList">Půvovodní list řádků pojmenovaných G hodnot</param>
        /// <param name="newList">Nový list řádků pojmenovaných G hodnot</param>
        /// <param name="pkFields">Seznam sloupců PK - podle těchto sloupců se posuzuje shoda řádků</param> 
        /// <param name="removed">List s odstraněnými řádky</param>
        /// <param name="added">List s přidanými řádky</param>
        /// <param name="same">List se řádky, které jsou podle PK shodné - ale ostatní sloupce mohou být různé</param>
        public static void GetDifferences( this List<GDbTypeDictionary> origList, List<GDbTypeDictionary> newList, string[] pkFields, out List<GDbTypeDictionary> removed, out List<GDbTypeDictionary> added, out List<KeyValuePair<GDbTypeDictionary, GDbTypeDictionary>> same )
        {
            removed = new List<GDbTypeDictionary>();
            added = new List<GDbTypeDictionary>();
            same = new List<KeyValuePair<GDbTypeDictionary, GDbTypeDictionary>>();

            foreach (GDbTypeDictionary newRow in newList)     // projdu nove řádky
                added.Add(newRow);

            foreach (GDbTypeDictionary oldRow in origList)     // projdu staré řádky
            {
                bool wasFindedSameRow = false; 
                foreach (GDbTypeDictionary newRow in added)     // projdu nove řádky
                {
                    bool isEquivalent = true;
                    foreach (string pkField in pkFields)
                    {
                        if (oldRow.ContainsKey(pkField) && newRow.ContainsKey(pkField))
                        {
                            IGDbType oldValue = oldRow[pkField];
                            IGDbType newValue = newRow[pkField];

                            if (!GDbTypeDictionary.IsEquivalent(oldValue, newValue, true))
                            {
                                isEquivalent = false;
                                break;
                            }
                        }
                    }

                    if (isEquivalent) // pokud je u řádků shoda podle PK
                    {
                        same.Add(new KeyValuePair<GDbTypeDictionary, GDbTypeDictionary>(oldRow, newRow));   // přidám do seznamu párů starý x nový 
                        added.Remove(newRow);       // odeberu se seznamu prověřovaných řádků (nových)
                        wasFindedSameRow = true;    // pamatovátko, že původní řádek byl v kolekci nových řádků nelezen
                        break;                      // ukončím cyklus, už jsem jej našel
                    }
                } // cyklus přes newList

                if (!wasFindedSameRow) // pokud jsem nenasel v nove kolekci puvodni radek, potom to znemaná, že byl odtraněn
                    removed.Add(oldRow);
            } // cyklus přes odlList
            // zde by v nové kolekci měli zůstat již pouze zcela nové řádky, které v původní kolekci nebyly nalezeny
        }
 
        /// <summary>
        /// 
        /// </summary>
        /// <param name="list"></param>
        /// <param name="table"></param>
        public static void ToDataTable( this List<GDbTypeDictionary> list, ref DataTable table )
        {
            foreach (GDbTypeDictionary v_radek in list)
            {
                try
                {
                    DataRow v_row = table.NewRow();
                    foreach (string v_col_name in v_radek.Keys )
                    {
                        if (table.Columns.Contains(v_col_name))
                        {
                            if (v_radek[v_col_name] == null || v_radek[v_col_name].IsNull)
                                v_row.IsNull(v_col_name);
                            else
                                v_row[v_col_name] = v_radek[v_col_name].DbValue;
                        }
                    }
                    table.Rows.Add(v_row);
                }
                catch (Exception v_error)
                {
                    //Console.WriteLine("Chyba na řádku DataTable {0}", v_row_num.ToString());
                    //Console.WriteLine(v_radek.ToString());
                    Console.WriteLine(v_error.Message);
                    throw;
                }
            }

        }
    }
}
