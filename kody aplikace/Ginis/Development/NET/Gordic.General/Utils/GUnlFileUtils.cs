//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GUnlFileUtils.cs                             </Name>
//    <Description> Pomocné funkce pro práci s UNL formátem                     </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-05-07                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Globalization;
using System.Data;
using System.Reflection;
using System.Web;

namespace Gordic.General
{
    /// <summary>
    /// Pomocné funkce pro práci s UNL formátem
    /// </summary>
    public static class GUnlFileUtils
    {

        #region read
        /// <summary>
        /// Ze zadaného stringu vrátí pole položek UNL
        /// </summary>
        /// <param name="a_row_text">text UNL řádku</param>
        /// <param name="a_row_items">Pole textů položek UNL</param>
        public static void ReadUnlItems(string a_row_text, out string[] a_row_items)
        {
            using (MemoryStream stream = new MemoryStream(Encoding.UTF8.GetBytes(a_row_text ?? "")))
            {
                using (StreamReader reader = new StreamReader(stream))
                {
                    ReadNextUnlLine(reader, out _, out a_row_items);
                }
            }
        }

        /// <summary>
        /// Ze vstupního stream ve formátu UNL bude číst znak po znaku tak dlouho, dokud nenajde konec řádku. 
        /// Přitom bude hledat konec datových sekcí označených znakem "|" a rozřeže data do pole, které vrátí jako výsledek
        /// </summary>
        /// <param name="a_unl_reader">Otevřený StreamReader, ze kterého se budou znaky číst</param>
        /// <param name="a_row_text">Načtený řádek v textové podobě</param>
        /// <param name="a_row_items">Jednotlivé hodnoty sloupců tohoto řádku</param>
        /// <returns>Příznak, že je ještě co číst - tedy že následuje další řádek</returns>
        public static bool ReadNextUnlLine(StreamReader a_unl_reader, out string a_row_text, out string[] a_row_items)
        {
            bool v_can_continue = true;
            StringBuilder v_row_text = new StringBuilder();
            StringBuilder v_item = new StringBuilder();
            List<string> v_value_array = new List<string>();
            char v_znak;
            char? v_next_znak;

            while (!a_unl_reader.EndOfStream)
            {

                int v_intCharacter = a_unl_reader.Read();
                if (v_intCharacter == -1)
                    break;
                v_znak = (char)(v_intCharacter);
                if (a_unl_reader.Peek() == -1)
                    v_next_znak = null;
                else
                    v_next_znak = (char)a_unl_reader.Peek();

                v_row_text.Append(v_znak);
                if (v_znak == '|')                                  // je to konec jedné datové sekce
                {
                    string pomocna = v_item.ToString();
                    if (pomocna == "")                              // zcela prázdná sekce je NULL
                        pomocna = null;
                    else if (pomocna == "\\ ")                      // sekce, která obsahuje pouze \ a mezeru znamená v podání informixu prázdný string
                        pomocna = "";
                    v_value_array.Add(pomocna);
                    v_item.Clear();
                }
                else if (v_znak == '\r' || v_znak == '\n')
                {
                    if (v_item.Length != 0)                          // toto je chyba syntaxe UNL souboru - ale asi ji budu tolerovat, mohlo by se jednat o poslední hodnotu, která není důsledně ukončena svislítkem
                        v_value_array.Add(v_item.ToString());       // přidám poslední hodnotu do pole hodnot
                    if (v_znak == '\r' && v_next_znak == '\n')      // pokud je to CR+LF
                        v_row_text.Append((char)a_unl_reader.Read());     // posunu se za LF ( přeskočím jej )
                    break;
                }
                else if (v_next_znak == null)                       // pokud jsem na posledním znaku streamu a není to lomítko - toto je chyba a je otázka, jak se zachovat - možná vyhodit chybu
                {
                    v_item.Append(v_znak);
                    v_value_array.Add(v_item.ToString());
                    v_can_continue = false;                         // příznak, že jsem na konci souboru a tedy příště již není co číst
                    break;
                }
                else if (v_znak == '\\' && v_next_znak == '\\')     // pokud stojím na lomítku a další znak je také lomítko -> je to lomítko
                {
                    v_item.Append(v_znak);
                    v_row_text.Append((char)a_unl_reader.Read());        // posunu se za druhé lomítko ( přeskočím jej )
                }
                else if (v_znak == '\\' && v_next_znak == '|')     // pokud stojím na lomítku a další znak svislítko -> je to svislítko
                {
                    v_item.Append(v_next_znak);
                    v_row_text.Append((char)a_unl_reader.Read());        // posunu se za druhé lomítko ( přeskočím jej )
                }
                else if (v_znak == '\\' && v_next_znak == 'r')     // pokud stojím na lomítku a další znak r -> je to CR
                {
                    v_item.Append('\r');
                    v_row_text.Append((char)a_unl_reader.Read());        // posunu se za druhé lomítko ( přeskočím jej )
                }
                else if (v_znak == '\\' && v_next_znak == 'n')     // pokud stojím na lomítku a další znak r -> je to LF
                {
                    v_item.Append('\n');
                    v_row_text.Append((char)a_unl_reader.Read());        // posunu se za druhé lomítko ( přeskočím jej )
                }
                else if (v_znak == '\\' && v_next_znak == '0')     // 2025-10-15 pokud stojím na lomítku a další znak je 0 -> je to 0x00 - je to divný, ale co s tím jiného
                {
                    v_item.Append('\0');
                    v_row_text.Append((char)a_unl_reader.Read());        // posunu se za druhé lomítko ( přeskočím jej )
                }
                else                                                // je to běžný znak
                {
                    // sem spadne i situace kdy je lomeno + mezera a to je dobře - tento speciální případ rozebírám až později
                    v_item.Append(v_znak);                          // přidám jej do přávě otevřené hodnoty
                }
            }   // while

            if (a_unl_reader.EndOfStream)
                v_can_continue = false;                         // příznak, že jsem na konci souboru a tedy příště již není co číst

            a_row_items = v_value_array.ToArray();
            a_row_text = v_row_text.ToString().TrimEnd(new char[] { '\r', '\n' });
            return (v_can_continue);
        }
        #endregion

        #region TryGetValue
        /// <summary>
        /// Z pole textových hodnot načte ze zadané pozice hodnotu string 
        /// </summary>
        /// <param name="values">pole hodnot získaných funkcí ReadNextUnlLine nebo ReadUnlItems</param>
        /// <param name="index">Index položky, kterou chcete načíst</param>
        /// <param name="value">cílová proměnný specifického typu, do které chcete načíst</param>
        /// <returns>Příznak úspěšného načtení</returns>
        public static bool TryGetValue(string[] values, int index, out GString value )
        {
            bool vysledek = false;
            value = null;
            if( values.Length > index )
            {
                if (values[index] == null)
                    value = GString.Null;
                else
                    value = new GString(values[index]);
                vysledek = true;
            }
            return vysledek;
        }
        /// <summary>
        /// Z pole textových hodnot načte ze zadané pozice hodnotu string 
        /// </summary>
        /// <param name="values">pole hodnot získaných funkcí ReadNextUnlLine nebo ReadUnlItems</param>
        /// <param name="index">Index položky, kterou chcete načíst</param>
        /// <param name="value">cílová proměnný specifického typu, do které chcete načíst</param>
        /// <returns>Příznak úspěšného načtení</returns>
        public static bool TryGetValue(string[] values, int index, out GInt16 value)
        {
            bool vysledek = false;
            value = null;
            if (values.Length > index)
            {
                if (String.IsNullOrWhiteSpace(values[index]))
                    value = GInt16.Null;
                else
                    try
                    {
                        value = GInt16.Parse(values[index]);
                        vysledek = true;
                    }
                    catch { }
            }
            return vysledek;
        }
        /// <summary>
        /// Z pole textových hodnot načte ze zadané pozice hodnotu string 
        /// </summary>
        /// <param name="values">pole hodnot získaných funkcí ReadNextUnlLine nebo ReadUnlItems</param>
        /// <param name="index">Index položky, kterou chcete načíst</param>
        /// <param name="value">cílová proměnný specifického typu, do které chcete načíst</param>
        /// <returns>Příznak úspěšného načtení</returns>
        public static bool TryGetValue(string[] values, int index, out GInt32 value)
        {
            bool vysledek = false;
            value = null;
            if (values.Length > index)
            {
                if (String.IsNullOrWhiteSpace(values[index]))
                    value = GInt32.Null;
                else 
                    try
                    {
                        value = GInt32.Parse(values[index]); 
                        vysledek = true;
                    }
                    catch { }
            }
            return vysledek;
        }
        /// <summary>
        /// Z pole textových hodnot načte ze zadané pozice hodnotu string 
        /// </summary>
        /// <param name="values">pole hodnot získaných funkcí ReadNextUnlLine nebo ReadUnlItems</param>
        /// <param name="index">Index položky, kterou chcete načíst</param>
        /// <param name="value">cílová proměnný specifického typu, do které chcete načíst</param>
        /// <returns>Příznak úspěšného načtení</returns>
        public static bool TryGetValue(string[] values, int index, out GInt64 value)
        {
            bool vysledek = false;
            value = null;
            if (values.Length > index)
            {
                if (String.IsNullOrWhiteSpace(values[index]))
                    value = GInt64.Null;
                else
                    try
                    {
                        value = GInt64.Parse(values[index]); 
                        vysledek = true;
                    }
                    catch { }
        }
            return vysledek;
        }
        /// <summary>
        /// Z pole textových hodnot načte ze zadané pozice hodnotu string 
        /// </summary>
        /// <param name="values">pole hodnot získaných funkcí ReadNextUnlLine nebo ReadUnlItems</param>
        /// <param name="index">Index položky, kterou chcete načíst</param>
        /// <param name="value">cílová proměnný specifického typu, do které chcete načíst</param>
        /// <returns>Příznak úspěšného načtení</returns>
        public static bool TryGetValue(string[] values, int index, out GDecimal value)
        {
            bool vysledek = false;
            value = null;
            if (values.Length > index)
            {
                if (String.IsNullOrWhiteSpace(values[index]))
                    value = GDecimal.Null;
                else
                {
                    try
                    {
                        NumberFormatInfo nfi = new NumberFormatInfo();
                        nfi.NumberDecimalSeparator = ".";                                   // 2018-10-29
                        string v_value = values[index];                                     // 2018-10-29
                        if (v_value.Contains(','))                                          // 2018-10-29
                            v_value = v_value.Replace(',', '.');                            // 2018-10-29
                        value = GDecimal.Parse(v_value, nfi);                               // 2018-10-29
                        vysledek = true;
                    }
                    catch { }
                }
            }
            return vysledek;
        }
        /// <summary>
        /// Z pole textových hodnot načte ze zadané pozice hodnotu string 
        /// </summary>
        /// <param name="values">pole hodnot získaných funkcí ReadNextUnlLine nebo ReadUnlItems</param>
        /// <param name="index">Index položky, kterou chcete načíst</param>
        /// <param name="value">cílová proměnný specifického typu, do které chcete načíst</param>
        /// <returns>Příznak úspěšného načtení</returns>
        public static bool TryGetValue(string[] values, int index, out GDateTime value)
        {
            bool vysledek = false;
            value = null;
            if (values.Length > index)
            {
                if (String.IsNullOrWhiteSpace(values[index]))
                    value = GDateTime.Null;
                else
                {
                    try
                    {
                        string v_hodnota = values[index];
                        v_hodnota = v_hodnota.Trim();
                        if (v_hodnota.StartsWith("-"))
                            v_hodnota = "0000-01-01 00:00:00.000";
                        value = GDateTime.Parse(v_hodnota);
                        vysledek = true;
                    }
                    catch { }
            }
            }
            return vysledek;
        }
        /// <summary>
        /// Z pole textových hodnot načte ze zadané pozice hodnotu string 
        /// </summary>
        /// <param name="values">pole hodnot získaných funkcí ReadNextUnlLine nebo ReadUnlItems</param>
        /// <param name="index">Index položky, kterou chcete načíst</param>
        /// <param name="value">cílová proměnný specifického typu, do které chcete načíst</param>
        /// <returns>Příznak úspěšného načtení</returns>
        public static bool TryGetValue(string[] values, int index, out GDate value)
        {
            bool vysledek = false;
            value = null;
            if (values.Length > index)
            {
                if (String.IsNullOrWhiteSpace(values[index]))
                    value = GDate.Null;
                else
                {
                    try
                    {
                        string v_hodnota = values[index];
                        v_hodnota = v_hodnota.Trim();
                        if (v_hodnota.StartsWith("-"))
                            v_hodnota = "0000-01-01 00:00:00.000";
                        value = GDate.Parse(v_hodnota);
                        vysledek = true;
                    }
                    catch { }
                }
            }
            return vysledek;
        }
        /// <summary>
        /// Z pole textových hodnot načte ze zadané pozice hodnotu string 
        /// </summary>
        /// <param name="values">pole hodnot získaných funkcí ReadNextUnlLine nebo ReadUnlItems</param>
        /// <param name="index">Index položky, kterou chcete načíst</param>
        /// <param name="value">cílová proměnný specifického typu, do které chcete načíst</param>
        /// <returns>Příznak úspěšného načtení</returns>
        public static bool TryGetValue(string[] values, int index, out GBlob value)
        {
            bool vysledek = false;
            value = null;
            if (values.Length > index)
            {
                if (String.IsNullOrWhiteSpace(values[index]))
                    value = GBlob.Null;
                else
                {
                    try
                    {
                        byte[] buffer = System.Convert.FromBase64String(values[index]);
                        value = new GBlob(buffer);
                        vysledek = true;
                    }
                    catch { }
                }
            }
            return vysledek;
        }
        #endregion

        #region ToUnlString()
        /// <summary>
        /// Převod obecného typu splňujícího IGDbType na jeho textovou obdobu UNL formátu
        /// </summary>
        /// <param name="val">Obecná proměnná typu IGDbType</param>
        /// <returns>String formátu UNL odpovídající hodnotou hodnotě zadané proměnné.</returns>
        public static string ToUnlString(IGDbType val)
        {
            string v_vysledek = null;

            if (val == null)
                v_vysledek = "";
            else if (val is GInt16)
                v_vysledek = ToUnlString(val as GInt16);
            else if (val is GInt32)
                v_vysledek = ToUnlString(val as GInt32);
            else if (val is GInt64)
                v_vysledek = ToUnlString(val as GInt64);
            else if (val is GDateTime)
                v_vysledek = ToUnlString(val as GDateTime);
            else if (val is GDate)
                v_vysledek = ToUnlString(val as GDate);
            else if (val is GString)
                v_vysledek = ToUnlString(val as GString);
            else if (val is GDecimal)
                v_vysledek = ToUnlString(val as GDecimal);
            else if (val is GBlob)
                v_vysledek = ToUnlString(val as GBlob);
            //else if (val is GTable)
            //    v_vysledek = ToUnlString(val as GTable);
            else
                v_vysledek = ToUnlString(val.ToString());

            return (v_vysledek);
        }
        /// <summary>
        /// Převod G typu GInt16 na UNL string
        /// </summary>
        /// <param name="a_cislo">G int16 pro převod na UNL string</param>
        /// <returns>UNL text odpovídající hodnotě zadaného čísla</returns>
        public static string ToUnlString(GInt16 a_cislo)
        {
            if (a_cislo.IsNull)
                return "";
            else
                return a_cislo.Value.ToString();
        }
        /// <summary>
        /// Převod G typu GInt32 na UNL string
        /// </summary>
        /// <param name="a_cislo">G int32 pro převod na UNL string</param>
        /// <returns>UNL text odpovídající hodnotě zadaného čísla</returns>
        public static string ToUnlString(GInt32 a_cislo)
        {
            if (a_cislo.IsNull)
                return "";
            else
                return a_cislo.Value.ToString();
        }
        /// <summary>
        /// Převod G typu GInt64 na UNL string
        /// </summary>
        /// <param name="a_cislo">G int64 pro převod na UNL string</param>
        /// <returns>UNL text odpovídající hodnotě zadaného čísla</returns>
        public static string ToUnlString(GInt64 a_cislo)
        {
            if (a_cislo.IsNull)
                return "";
            else
                return a_cislo.Value.ToString();
        }
        /// <summary>
        /// Převod G typu GDecimal na UNL string
        /// </summary>
        /// <param name="a_cislo"></param>
        /// <returns></returns>
        public static string ToUnlString(GDecimal a_cislo)
        {
            if (a_cislo.IsNull)
                return "";
            else
            {
                NumberFormatInfo nfi = new NumberFormatInfo();      // 2019-05-20 FFIALA
                nfi.NumberDecimalSeparator = ".";
                return a_cislo.Value.ToString(nfi);
            }
        }
        /// <summary>
        /// Převod G typu GDate na UNL string
        /// </summary>
        /// <param name="a_datume">G datum</param>
        /// <returns>UNL text odpovídající hodnotě zadaného datumu</returns>
        public static string ToUnlString(GDate a_datume)
        {
            string v_hodnota;
            if (a_datume.IsNull)
                v_hodnota = "";
            else
                v_hodnota = a_datume.Value.ToString("yyyy-MM-dd");
            return v_hodnota;
        }
        /// <summary>
        /// Převod G typu GDateTime na UNL string
        /// </summary>
        /// <param name="a_datume">G datum</param>
        /// <returns>UNL text odpovídající hodnotě zadaného datumu</returns>
        public static string ToUnlString(GDateTime a_datume)
        {
            string v_hodnota;
            if (a_datume.IsNull)
                v_hodnota = "";
            else
            {
                v_hodnota = a_datume.Value.ToString("yyyy-MM-dd HH:mm:ss.fff");
            }
            return v_hodnota;
        }
        /// <summary>
        /// Převod G typu GString na UNL string
        /// oproti pojetí v PB se hodnoty nebudou trimovat - to mělo význam na INFORMIXu, kde téměř vše bylo CHAR a dopněno mezerami
        /// </summary>
        /// <param name="a_string">Hodnota odpovídající DB</param>
        /// <param name="a_trimovat">Příznak, že se pravé mezery mají trimovat - to se na informix UNL souboru realizovalo pouze u sloupců typu CHAR. Výchozí nastavení je NEtrimovat</param>
        /// <returns>Text odpovídající zadané hodnotě formátovaný podle UNL standardu</returns>
        public static string ToUnlString(GString a_string, bool a_trimovat = false )
        {
            return (ToUnlStringRow(a_string, a_trimovat ));
        }
        /// <summary>
        /// Převod G typu GString na UNL string
        /// oproti pojetí v PB se hodnoty nebudou trimovat - to mělo význam na INFORMIXu, kde téměř vše bylo CHAR a dopněno mezerami
        /// </summary>
        /// <param name="a_string">Hodnota odpovídající DB</param>
        /// <returns>Text odpovídající zadané hodnotě formátovaný podle UNL standardu</returns>
        public static string ToMdString(GString a_string)
        {
            return (ToMdStringRow(a_string));
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="a_string"></param>
        /// <param name="a_trimovat"></param>
        /// <returns></returns>
        public static string ToUnlStringRow(string a_string, bool a_trimovat = false)
        {
            string v_hodnota;

            if (a_string == null )
                v_hodnota = "";
            else
            {
                v_hodnota = a_string;
                if (v_hodnota == "")
                    v_hodnota = "\\ ";
                else
                {
                    if (a_trimovat)                                  // měl bych trimovat pouze CHAR sloupce ( ale ty na ORACLE a MSS nepoužíváme ) - u VARCHAR sloupců bych měl zachovat původní počet mezer
                        v_hodnota = v_hodnota.TrimEnd(' ');

                    if (v_hodnota == "")
                        v_hodnota = " ";        // případ jedné, nebo mnoho mezer - může ale nastat pouze v případě trimování

                    // odpovídá funkci v ADT03 - replace_text_to_escape()
                    char[] v_znaky = v_hodnota.ToCharArray();
                    StringBuilder v_out_string = new StringBuilder();
                    foreach (char v_znak in v_znaky)
                    {
                        if (v_znak == '\\')
                            v_out_string.Append("\\\\");
                        else if (v_znak == '|')
                            v_out_string.Append("\\|");
                        else if (v_znak == '\n')
                            v_out_string.Append("\\n");
                        else if (v_znak == '\r')
                            v_out_string.Append("\\r");
                        else if (v_znak == '\0')    // 2025-10-15
                            v_out_string.Append("\\0"); // je to divný, ale co s tím jiného - mám to stejně ošetřený při čtení dat z UNL
                        else
                            v_out_string.Append(v_znak);
                    }
                    v_hodnota = v_out_string.ToString();
                }
            }
            return (v_hodnota);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="a_string"></param>
        /// <returns></returns>
        public static string ToMdStringRow(string a_string)
        {
            string v_hodnota;

            if (a_string == null)
                v_hodnota = "";
            else
            {
                v_hodnota = a_string;
                if (v_hodnota == "")
                    v_hodnota = " ";
                else
                {
                    v_hodnota = v_hodnota.TrimEnd(' ');

                    if (v_hodnota == "")
                        v_hodnota = " ";        // případ jedné, nebo mnoho mezer - může ale nastat pouze v případě trimování

                    // odpovídá funkci v ADT03 - replace_text_to_escape()
                    char[] v_znaky = v_hodnota.ToCharArray();
                    StringBuilder v_out_string = new StringBuilder();
                    foreach (char v_znak in v_znaky)
                    {
                        if (v_znak == '|')
                            v_out_string.Append("&#124;");
                        else
                            v_out_string.Append(v_znak);
                    }
                    v_hodnota = v_out_string.ToString();
                }
            }
            return (v_hodnota);
        }
        /// <summary>
        /// Převod G typu GString na UNL string
        /// oproti pojetí v PB se hodnoty nebudou trimovat - to mělo význam na INFORMIXu, kde téměř vše bylo CHAR a dopněno mezerami
        /// </summary>
        /// <param name="a_blob">Hodnota odpovídající DB</param>
        /// <returns>Text odpovídající zadané hodnotě formátovaný podle UNL standardu</returns>
        public static string ToUnlString(GBlob a_blob)
        {
            string v_hodnota = "";
            if (a_blob.IsNull)
                v_hodnota = "";
            else
                v_hodnota = System.Convert.ToBase64String(a_blob.BaseValue);
            return (v_hodnota);
        }
        /// <summary>
        /// Převod G typu GTable na UNL string
        /// oproti pojetí v PB se hodnoty nebudou trimovat - to mělo význam na INFORMIXu, kde téměř vše bylo CHAR a dopněno mezerami
        /// </summary>
        /// <param name="a_table">Hodnota odpovídající DB</param>
        /// <returns>Text odpovídající zadané hodnotě formátovaný podle UNL standardu</returns>
        public static string ToUnlString(GTable a_table)
        {
            string v_hodnota = "";
            if (a_table.IsNull)
                v_hodnota = "";
            else
                v_hodnota = ToUnlString( a_table.BaseValue );
            return (v_hodnota);
        }
        /// <summary>
        /// Převod G typu GString na UNL string
        /// oproti pojetí v PB se hodnoty nebudou trimovat - to mělo význam na INFORMIXu, kde téměř vše bylo CHAR a dopněno mezerami
        /// </summary>
        /// <param name="a_table">Hodnota odpovídající DB</param>
        /// <param name="ignoreColumn"></param>
        /// <returns>Text odpovídající zadané hodnotě formátovaný podle UNL standardu</returns>
        public static string ToUnlString(DataTable a_table, string[] ignoreColumn = null)
        {
            string v_hodnota = "";
            if (a_table == null )
                v_hodnota = "";
            else
            {
                StringBuilder builder = new StringBuilder();
                foreach (DataRow row in a_table.Rows)
                    builder.AppendLine(ToUnlString(row, ignoreColumn));
                v_hodnota = builder.ToString();
            }
            return (v_hodnota);
        }
        /// <summary>
        /// Převod G typu GString na MD string
        /// </summary>
        /// <param name="a_table">Hodnota odpovídající DB</param>
        /// <param name="a_header">Příznak, že se má dělat hlavička</param>
        /// <param name="a_header_plus">Příznak, že se má v rámci hlavičky dělat zarovnání sloupce</param>
        /// <param name="ignoreColumn"></param>
        /// <returns>Text odpovídající zadané hodnotě formátovaný podle UNL standardu</returns>
        public static string ToMdString(DataTable a_table, bool a_header = false, bool a_header_plus = false, string[] ignoreColumn = null)
        {
            string v_hodnota = "";
            if(ignoreColumn == null)
                ignoreColumn = new string[] { };

            if (a_table == null)
                v_hodnota = "";
            else
            {
                StringBuilder builder = new StringBuilder();

                if( a_header)
                {
                    builder.Append("|");
                    foreach (DataColumn col in a_table.Columns)
                    {
                        if (ignoreColumn.Contains(col.ColumnName, StringComparer.OrdinalIgnoreCase))
                            continue;
                        builder.Append(col.ColumnName);
                        builder.Append('|');
                    }
                    builder.AppendLine();
                    builder.Append('|');
                    foreach (DataColumn col in a_table.Columns)
                    {
                        if (ignoreColumn.Contains(col.ColumnName, StringComparer.OrdinalIgnoreCase) )
                            continue;

                        System.Type v_field_typ = col.DataType;
                        System.TypeCode v_typeCode = Type.GetTypeCode(v_field_typ);

                        switch (v_typeCode)
                        {
                            case TypeCode.SByte:
                            case TypeCode.Byte:
                            case TypeCode.Int16:
                            case TypeCode.Int32:
                            case TypeCode.Int64:
                            case TypeCode.UInt16:
                            case TypeCode.UInt32:
                            case TypeCode.UInt64:
                            case TypeCode.Decimal:
                            case TypeCode.Double:
                                if( a_header_plus)
                                    builder.Append("---:|");
                                else
                                    builder.Append("---|");
                                break;
                            case TypeCode.DateTime:
                                if (a_header_plus)
                                    builder.Append(":---|");
                                else
                                    builder.Append("---|");
                                break;
                            case TypeCode.String:
                            case TypeCode.Char:
                                if (a_header_plus)
                                    builder.Append(":---|");
                                else
                                    builder.Append("---|");
                                break;
                            default:
                                builder.Append("---|");
                                break;
                        }
                    }
                    builder.AppendLine();
                }


                foreach (DataRow row in a_table.Rows)
                {
                    builder.AppendLine(ToMdString(row, ignoreColumn));
                }
                v_hodnota = builder.ToString();
            }
            return (v_hodnota);
        }

        /// <summary>
        /// Převod G typu GString na RTF string
        /// </summary>
        /// <param name="a_table">Hodnota odpovídající DB</param>
        /// <param name="a_header">Příznak, že se má dělat hlavička</param>
        /// <param name="a_header_plus">Příznak, že se má v rámci hlavičky dělat zarovnání sloupce</param>
        /// <param name="ignoreColumn"></param>
        /// <returns>Text odpovídající zadané hodnotě formátovaný podle UNL standardu</returns>
        public static string ToRtfString(DataTable a_table, bool a_header = false, bool a_header_plus = false, string[] ignoreColumn = null)
        {

            /*
             {\rtf1\ansi
            {\trowd \cellx1000 \cellx2000 \intbl 
            \b Hlavička 1\b0 \cell Hlavička 2\cell \row}
            {\trowd \cellx1000 \cellx2000 \intbl 
            Buňka 1\cell Buňka 2\cell \row}
            \pard
            } 
            */

            StringBuilder sloupce = new StringBuilder(@"\trowd\trgaph10\trpaddl10\trpaddr10\trpaddfl3\trpaddfr3");
            sloupce.AppendLine();
            foreach (DataColumn col in a_table.Columns)
            {
                if (ignoreColumn.Contains(col.ColumnName))
                    continue;

                sloupce.Append("\\cellx");

                System.Type v_field_typ = col.DataType;
                System.TypeCode v_typeCode = Type.GetTypeCode(v_field_typ);

                switch (v_typeCode)
                {
                    case TypeCode.SByte:
                    case TypeCode.Byte:
                    case TypeCode.Int16:
                    case TypeCode.Int32:
                    case TypeCode.Int64:
                    case TypeCode.UInt16:
                    case TypeCode.UInt32:
                    case TypeCode.UInt64:
                    case TypeCode.Decimal:
                    case TypeCode.Double:
                        sloupce.Append("1000");
                        break;
                    case TypeCode.DateTime:
                        sloupce.Append("1000");

                        break;
                    case TypeCode.String:
                    case TypeCode.Char:
                        sloupce.Append("2000");
                        break;
                    default:
                        sloupce.Append("2000");
                        break;
                }
                //sloupce.Append(' ');
            }
            sloupce.AppendLine();
            sloupce.Append("\\pard\\intbl\\sa200\\sl276\\slmult1");

            string v_hodnota = "";
            if (ignoreColumn == null)
                ignoreColumn = new string[] { };

            if (a_table == null)
                v_hodnota = "";
            else
            {
                StringBuilder builder = new StringBuilder(@"{\rtf1\ansi\ansicpg1250\deff0\nouicompat\deflang1029{\fonttbl{\f0\fnil\fcharset238 Calibri;}}
{\*\generator Riched20 10.0.19041}\viewkind4\uc1 
\pard\sa200\sl276\slmult1\f0\fs22\lang5  \par");

                if (a_header)
                {
                    builder.Append(sloupce.ToString());
                    foreach (DataColumn col in a_table.Columns)
                    {
                        if (ignoreColumn.Contains(col.ColumnName))
                            continue;
                        builder.Append("\\b ");
                        builder.Append(col.ColumnName);
                        builder.Append("\\b0\\cell");
                    }
                    builder.AppendLine(@"\row");
                }

                foreach (DataRow row in a_table.Rows)
                {
                    builder.Append(sloupce.ToString());
                    foreach (DataColumn col in a_table.Columns)
                    {
                        if (ignoreColumn.Contains(col.ColumnName))
                            continue;
                        builder.Append(' ');
                        builder.Append(row[col.ColumnName].ToString());
                        builder.Append("\\cell");
                    }
                    builder.AppendLine("\\row");
                }
                builder.AppendLine("\\pard\\sa200\\sl276\\slmult1\\par");
                builder.AppendLine("}");
                v_hodnota = builder.ToString();
            }
            return (v_hodnota);
        }

        /// <summary>
        /// Převod G typu GString na RTF string
        /// </summary>
        /// <param name="a_table">Hodnota odpovídající DB</param>
        /// <param name="a_header">Příznak, že se má dělat hlavička</param>
        /// <param name="a_header_plus">Příznak, že se má v rámci hlavičky dělat zarovnání sloupce</param>
        /// <param name="ignoreColumn"></param>
        /// <returns>Text odpovídající zadané hodnotě formátovaný podle UNL standardu</returns>
        public static string ToHtmlString(DataTable a_table, bool a_header = false, bool a_header_plus = false, string[] ignoreColumn = null)
        {

            /*
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jednoduchá HTML Tabulka</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <h2>Jednoduchá Tabulka</h2>
    <table>
        <thead>
            <tr>
                <th>Jméno</th>
                <th>Věk</th>
                <th>Město</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Jan</td>
                <td>25</td>
                <td>Praha</td>
            </tr>
            <tr>
                <td>Eva</td>
                <td>30</td>
                <td>Brno</td>
            </tr>
            <tr>
                <td>Petr</td>
                <td>28</td>
                <td>Ostrava</td>
            </tr>
        </tbody>
    </table>
</body>
</html>             
             */



            string v_hodnota = "";
            if (ignoreColumn == null)
                ignoreColumn = new string[] { };

            if (a_table == null)
                v_hodnota = "";
            else
            {
                StringBuilder builder = new StringBuilder(
$@"<!DOCTYPE html>
            <html lang=""cs"">
            <head>
                <meta charset=""UTF-8"">
                <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
                <title>{a_table.TableName}</title>
                <style>
                    table {{
                        width: 100%;
                        border-collapse: collapse;
                    }}
                    th, td {{
                        border: 1px solid black;
                        padding: 8px;
                        text-align: left;
                    }}
                    th {{
                        background-color: #f2f2f2;
                    }}
                </style>
            </head>
            <body>
                <h2>{a_table.TableName}</h2>
            <table>");

                if (a_header)
                {
                    builder.Append(@"<thead><tr>");
                    foreach (DataColumn col in a_table.Columns)
                    {
                        if (ignoreColumn.Contains(col.ColumnName))
                            continue;
                        builder.Append("<th>");
                        builder.Append(HttpUtility.HtmlEncode(col.ColumnName));
                        builder.Append("</th>");
                    }
                    builder.AppendLine(@"</tr></thead>");
                }
                
                builder.AppendLine(@"<tbody>");
                
                foreach (DataRow row in a_table.Rows)
                {
                    builder.Append("<tr>");
                    foreach (DataColumn col in a_table.Columns)
                    {
                        if (ignoreColumn.Contains(col.ColumnName))
                            continue;
                        builder.Append("<td>");
                        string hodnota = "";
                        if (!( row[col.ColumnName] is DBNull) )
                            hodnota = row[col.ColumnName].ToString();
                        builder.Append(HttpUtility.HtmlEncode(hodnota));
                        builder.Append("</td>");
                    }
                    builder.Append("</tr>");
                }

                builder.AppendLine(@"</tbody></table></body></html>");
                v_hodnota = builder.ToString();
            }
            return (v_hodnota);
        }



        /// <summary>
        /// Převod G typu GString na RTF string
        /// </summary>
        /// <param name="a_table">Hodnota odpovídající DB</param>
        /// <param name="a_header">Příznak, že se má dělat hlavička</param>
        /// <param name="a_header_plus">Příznak, že se má v rámci hlavičky dělat zarovnání sloupce</param>
        /// <param name="ignoreColumn"></param>
        /// <returns>Text odpovídající zadané hodnotě formátovaný podle UNL standardu</returns>
        public static string ToRtfStringOld(DataTable a_table, bool a_header = false, bool a_header_plus = false, string[] ignoreColumn = null)
        {

            /*
             {\rtf1\ansi
            {\trowd \cellx1000 \cellx2000 \intbl 
            \b Hlavička 1\b0 \cell Hlavička 2\cell \row}
            {\trowd \cellx1000 \cellx2000 \intbl 
            Buňka 1\cell Buňka 2\cell \row}
            \pard
            } 
            */

            StringBuilder sloupce = new StringBuilder("{\\trowd ");
            foreach (DataColumn col in a_table.Columns)
            {
                if (ignoreColumn.Contains(col.ColumnName))
                    continue;
                
                sloupce.Append("\\cellx");

                System.Type v_field_typ = col.DataType;
                System.TypeCode v_typeCode = Type.GetTypeCode(v_field_typ);

                switch (v_typeCode)
                {
                    case TypeCode.SByte:
                    case TypeCode.Byte:
                    case TypeCode.Int16:
                    case TypeCode.Int32:
                    case TypeCode.Int64:
                    case TypeCode.UInt16:
                    case TypeCode.UInt32:
                    case TypeCode.UInt64:
                    case TypeCode.Decimal:
                    case TypeCode.Double:
                            sloupce.Append("1000");
                        break;
                    case TypeCode.DateTime:
                            sloupce.Append("1000");
                        
                        break;
                    case TypeCode.String:
                    case TypeCode.Char:
                        sloupce.Append("2000");
                        break;
                    default:
                        sloupce.Append("2000");
                        break;
                }
                sloupce.Append(' ');
            }
            sloupce.Append(" \\intbl ");

            string v_hodnota = "";
            if (ignoreColumn == null)
                ignoreColumn = new string[] { };

            if (a_table == null)
                v_hodnota = "";
            else
            {
                StringBuilder builder = new StringBuilder("{\\rtf1\\ansi\r\n ");

                if (a_header)
                {
                    builder.Append(sloupce.ToString());
                    foreach (DataColumn col in a_table.Columns)
                    {
                        if (ignoreColumn.Contains(col.ColumnName))
                            continue;
                        builder.Append("\\b ");
                        builder.Append(col.ColumnName);
                        builder.Append("\\b0 \\cell ");
                    }
                    builder.Append("\\row}");
                }

                foreach (DataRow row in a_table.Rows)
                {
                    builder.Append(sloupce.ToString());
                    foreach (DataColumn col in a_table.Columns)
                    {
                        if (ignoreColumn.Contains(col.ColumnName))
                            continue;

                        builder.Append(row[col.ColumnName].ToString());
                        builder.Append("\\cell ");
                    }
                    builder.Append("\\row}");
                }
                builder.AppendLine("\\pard}");

                v_hodnota = builder.ToString();
            }
            return (v_hodnota);
        }


        /// <summary>
        /// Konverze DB řádku na text odpovídající UNL řádku
        /// </summary>
        /// <param name="a_row">DB row</param>
        /// <returns>text obsahující UNL reprezentaci dat řádku.</returns>
        public static string ToUnlString(IDataRecord a_row)
        {
            StringBuilder v_row_txt = new StringBuilder();
            for (int i = 0; i < a_row.FieldCount; i++)
            {
                string v_data_text_value = ToUnlString(a_row, i);
                v_row_txt.Append(v_data_text_value);
                v_row_txt.Append('|');
            }
            return v_row_txt.ToString();
        }
        /// <summary>
        /// Konverze DB typu na stringovou reprezentaci hodnoty proměnné ve formátu pro UNL soubor
        /// </summary>
        /// <param name="a_radek">DataRow jehož data se mají převést na string</param>
        /// <param name="ignoreColumn"></param>
        /// <returns>Text odpovídající UNL hodnotě požadovaného sloupce.</returns>
        public static string ToUnlString(DataRow a_radek, string[] ignoreColumn = null)
        {
            StringBuilder v_row_txt = new StringBuilder();
            for (int i = 0; i < a_radek.Table.Columns.Count; i++)
            {
                bool ignore = false;
                if (ignoreColumn != null )
                {
                    for( int j = 0; j < ignoreColumn.Length; j++)
                    {
                        if( a_radek.Table.Columns[i].ColumnName == ignoreColumn[j] )
                            ignore = true;
                    }
                }
                if (!ignore)
                {
                    string v_data_text_value = ToUnlString(a_radek, i);
                    v_row_txt.Append(v_data_text_value);
                    v_row_txt.Append('|');
                }
            }
            return v_row_txt.ToString();
        }
        /// <summary>
        /// Konverze DB typu na stringovou reprezentaci hodnoty proměnné ve formátu pro UNL soubor
        /// </summary>
        /// <param name="a_radek">DataRow jehož data se mají převést na string</param>
        /// <param name="ignoreColumn"></param>
        /// <returns>Text odpovídající UNL hodnotě požadovaného sloupce.</returns>
        public static string ToMdString(DataRow a_radek, string[] ignoreColumn = null)
        {
            StringBuilder v_row_txt = new StringBuilder("|");
            for (int i = 0; i < a_radek.Table.Columns.Count; i++)
            {
                bool ignore = false;
                if (ignoreColumn != null)
                {
                    ignore = ignoreColumn.Contains(a_radek.Table.Columns[i].ColumnName, StringComparer.OrdinalIgnoreCase);
                }
                if (!ignore)
                {
                    string v_data_text_value = ToMdString(a_radek, i);
                    v_row_txt.Append(v_data_text_value);
                    v_row_txt.Append('|');
                }
            }
            return v_row_txt.ToString();
        }
        /// <summary>
        /// Konverze DB typu na stringovou reprezentaci hodnoty proměnné ve formátu pro UNL soubor
        /// </summary>
        /// <param name="a_data">DB row record</param>
        /// <param name="a_index">index proměnné, kterou chci získat</param>
        /// <returns>Text odpovídající UNL hodnotě požadovaného sloupce.</returns>
        public static string ToUnlString(DataRow a_data, int a_index)
        {
            string v_vysledek = "";
            if (a_data[a_index] == null)
                v_vysledek = "";
            else
            {
                System.Type v_field_typ = a_data[a_index].GetType();
                System.TypeCode v_typeCode = Type.GetTypeCode(v_field_typ);

                switch (v_typeCode)
                {
                    case TypeCode.SByte:
                    case TypeCode.Byte:
                    case TypeCode.Int16:
                    case TypeCode.Int32:
                    case TypeCode.Int64:
                    case TypeCode.UInt16:
                    case TypeCode.UInt32:
                    case TypeCode.UInt64:
                    case TypeCode.Decimal:
                    case TypeCode.Double:
                        v_vysledek = a_data[a_index].ToString();
                        break;
                    case TypeCode.DateTime:
                        v_vysledek = ToUnlString(GDateTime.Parse(a_data[a_index]));
                        break;
                    case TypeCode.String:
                    case TypeCode.Char:
                        v_vysledek = ToUnlString(GString.Parse(a_data[a_index]));
                        break;
                    case TypeCode.Empty:
                        v_vysledek = "";
                        break;
                    case TypeCode.DBNull:
                        v_vysledek = "";
                        break;
                    default:
                        v_vysledek = ToUnlString((GString)a_data[a_index].ToString());
                        break;
                }
            }
            return (v_vysledek);
        }
        /// <summary>
        /// Konverze DB typu na stringovou reprezentaci hodnoty proměnné ve formátu pro UNL soubor
        /// </summary>
        /// <param name="a_data">DB row record</param>
        /// <param name="a_index">index proměnné, kterou chci získat</param>
        /// <returns>Text odpovídající UNL hodnotě požadovaného sloupce.</returns>
        public static string ToMdString(DataRow a_data, int a_index)
        {
            string v_vysledek = "";
            if (a_data[a_index] == null)
                v_vysledek = "";
            else
            {
                System.Type v_field_typ = a_data[a_index].GetType();
                System.TypeCode v_typeCode = Type.GetTypeCode(v_field_typ);

                switch (v_typeCode)
                {
                    case TypeCode.SByte:
                    case TypeCode.Byte:
                    case TypeCode.Int16:
                    case TypeCode.Int32:
                    case TypeCode.Int64:
                    case TypeCode.UInt16:
                    case TypeCode.UInt32:
                    case TypeCode.UInt64:
                    case TypeCode.Decimal:
                    case TypeCode.Double:
                        v_vysledek = a_data[a_index].ToString();
                        break;
                    case TypeCode.DateTime:
                        v_vysledek = ToUnlString(GDateTime.Parse(a_data[a_index]));
                        break;
                    case TypeCode.String:
                    case TypeCode.Char:
                        v_vysledek = ToMdString(GString.Parse(a_data[a_index]));
                        break;
                    case TypeCode.Empty:
                        v_vysledek = "";
                        break;
                    case TypeCode.DBNull:
                        v_vysledek = "";
                        break;
                    default:
                        v_vysledek = ToUnlString((GString)a_data[a_index].ToString());
                        break;
                }
            }
            return (v_vysledek);
        }
        /// <summary>
        /// Konverze DB typu na stringovou reprezentaci hodnoty proměnné ve formátu pro UNL soubor
        /// </summary>
        /// <param name="a_data">DB row record</param>
        /// <param name="a_index">index proměnné, kterou chci získat</param>
        /// <returns>Text odpovídající UNL hodnotě požadovaného sloupce.</returns>
        public static string ToUnlString(IDataRecord a_data, int a_index)
        {
            string v_vysledek = "";
            if (a_data.IsDBNull(a_index))
                v_vysledek = "";
            else
            {
                System.Type v_field_typ = a_data.GetFieldType(a_index);
                System.TypeCode v_typeCode = Type.GetTypeCode(v_field_typ);

                switch (v_typeCode)
                {
                    case TypeCode.SByte:
                    case TypeCode.Byte:
                    case TypeCode.Int16:
                    case TypeCode.Int32:
                    case TypeCode.Int64:
                    case TypeCode.UInt16:
                    case TypeCode.UInt32:
                    case TypeCode.UInt64:
                    case TypeCode.Decimal:
                    case TypeCode.Double:
                        v_vysledek = a_data.GetValue(a_index).ToString();
                        break;
                    case TypeCode.DateTime:
                        v_vysledek = ToUnlString((GDateTime)a_data.GetDateTime(a_index));
                        break;
                    case TypeCode.String:
                    case TypeCode.Char:
                        v_vysledek = ToUnlString((GString)a_data.GetString(a_index));
                        break;
                    case TypeCode.Empty:
                        v_vysledek = "";
                        break;
                    default:
                        v_vysledek = ToUnlString((GString)a_data.GetValue(a_index).ToString());
                        break;
                }

            }
            return (v_vysledek);
        }
        /// <summary>
        /// Převede data z DTO do stringové podoby a to v UNL formátu
        /// </summary>
        /// <param name="a_dto">DTO objekt s daty, které se mají převést na UNL string</param>
        /// <returns>String ve formátu UNL obsahující data z DTO objektu</returns>
        public static string ToUnlString(IGDto a_dto)
        {
            StringBuilder v_row_txt = new StringBuilder();

            var dtoProps = a_dto.GetType().GetMembers(BindingFlags.Public | BindingFlags.Instance);
            foreach (var prop in dtoProps)
            {
                if (prop == null)
                    continue;
                if (prop.MemberType == MemberTypes.Field)           // pokud je to instanční proměnná DTO - potom se jedná o sloupce DB tabulky
                {
                    FieldInfo v_prop_info = (prop as FieldInfo);
                    var v_field = v_prop_info.GetValue(a_dto);
                    if (v_field is IGDbType)                       //if (v_field_type.IsAssignableTo<IGDbType>( ) )
                    {
                        IGDbType v_gdbtype_field = (v_field as IGDbType);
                        string v_data_text_value = ToUnlString(v_gdbtype_field);
                        v_row_txt.Append(v_data_text_value);
                        v_row_txt.Append('|');
                    }
                }
            } // foreach

            return v_row_txt.ToString();
        }

        /// <summary>
        /// Převede pole GDbType položek na UNL string
        /// </summary>
        /// <param name="a_val_array"></param>
        /// <returns></returns>
        public static string ToUnlString(IGDbType[] a_val_array)
        {
            StringBuilder v_vysledek = new StringBuilder();
            foreach (IGDbType v_arg in a_val_array)
            {
                if (v_arg.IsNull)
                    v_vysledek.Append("NULL|");
                else
                    v_vysledek.Append(String.Format("{0}|", ToUnlString(v_arg)));
            }
            return (v_vysledek.ToString());
        }
        /// <summary>
        /// Převede pole položek na UNL string
        /// </summary>
        /// <param name="a_val_array"></param>
        /// <returns></returns>
        public static string ToUnlString(string[] a_val_array)
        {
            StringBuilder v_vysledek = new StringBuilder();
            foreach (string v_arg in a_val_array)
            {
                v_vysledek.Append(String.Format("{0}|", ToUnlStringRow(v_arg)));
            }
            return (v_vysledek.ToString());
        }
        #endregion

    }
}
