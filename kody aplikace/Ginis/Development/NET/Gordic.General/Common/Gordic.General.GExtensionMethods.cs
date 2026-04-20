//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//      <Name>        Gordic.General.GExtensionMethods.cs </Name>
//      <Description> obecné extension metody             </Description>
//      <Author>      Jan Kuttich                         </Author>
//      <Copyright>   © GORDIC spol. s r. o. 1993 - 2021  </Copyright>
//      <Created>     2012-05-29                          </Created>
//  </FileHeader>

using System;
using System.Reflection;
using System.Diagnostics;
using System.Linq;
using System.Xml.Linq;

namespace Gordic.General {

    /// <summary>obecné extension metody</summary>
    [DebuggerStepThrough]
    public static class GExtensionMethods {

        #region vlastnosti

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(GExtensionMethods).Assembly; }
        } // end property

        #endregion

        #region metody pro práci s řetězci

        /// <summary>změna prvního písmena v řetězci na velké</summary>
        /// <param name="source">zdrojový řetězec</param>
        /// <returns>výsledný řetězec</returns>
        public static string ToUpperFirstLetter(this string source) {
            if(String.IsNullOrEmpty(source)) return source;
            return source.Length > 1 ? source.Substring(0,1).ToUpper() + source.Substring(1) : source.ToUpper();
        } // end method

        /// <summary>změna prvního písmena v řetězci na malé</summary>
        /// <param name="source">zdrojový řetězec</param>
        /// <returns>výsledný řetězec</returns>
        public static string ToLowerFirstLetter(this string source) {
            if(String.IsNullOrEmpty(source)) return source;
            return source.Length > 1 ? source.Substring(0,1).ToLower() + source.Substring(1) : source.ToLower();
        } // end method

        /// <summary>zjištění, zda řetězec obsahuje jiný řetězec</summary>
        /// <param name="source">prohledávaný řetězec</param>
        /// <param name="value">hledaný řetězec</param>
        /// <param name="comparison">typ porovnávání řetězců</param>
        /// <returns>true pokud prohledávaný řetězec obsahuje hledaný řetězec, jinak false</returns>
        public static bool Contains(this string source,string value,StringComparison comparison) {
            if(String.IsNullOrEmpty(source) || String.IsNullOrEmpty(value)) return false;
            else return source.IndexOf(value,comparison) >= 0;
        }  // end method

        /// <summary>změna prvního písmena v řetězci na malé</summary>
        /// <param name="source">zdrojový řetězec</param>
        /// <returns>výsledný řetězec</returns>
        public static GString ToUpperFirstLetter(this GString source) {
            if(source == null) return source;
            GString l_gsDestiny = source.Clone() as GString;
            if(source.IsNullOrEmpty == false) l_gsDestiny.Value = ToUpperFirstLetter(source.Value);
            return l_gsDestiny;
        } // end if

        /// <summary>změna prvního písmena v řetězci na malé</summary>
        /// <param name="source">zdrojový řetězec</param>
        /// <returns>výsledný řetězec</returns>
        public static GString ToLowerFirstLetter(this GString source) {
            if(source == null) return source;
            GString l_gsDestiny = source.Clone() as GString;
            if(source.IsNullOrEmpty == false) l_gsDestiny.Value = ToLowerFirstLetter(source.Value);
            return l_gsDestiny;
        } // end if

        /// <summary>zjištění, zda řetězec obsahuje jiný řetězec</summary>
        /// <param name="source">prohledávaný řetězec</param>
        /// <param name="value">hledaný řetězec</param>
        /// <returns>true pokud prohledávaný řetězec obsahuje hledaný řetězec, jinak false</returns>
        public static bool Contains(this GString source,GString value) {
            return Contains(source,value,StringComparison.Ordinal);
        }  // end method

        /// <summary>zjištění, zda řetězec obsahuje jiný řetězec</summary>
        /// <param name="source">prohledávaný řetězec</param>
        /// <param name="value">hledaný řetězec</param>
        /// <param name="comparison">typ porovnávání řetězců</param>
        /// <returns>true pokud prohledávaný řetězec obsahuje hledaný řetězec, jinak false</returns>
        public static bool Contains(this GString source,GString value,StringComparison comparison) {
            if(source.IsNull || value.IsNull) return false;
            else return Contains(source.Value,value.Value,comparison);
        }  // end method

        /// <summary>získání řetězce nebo hodnoty null</summary>
        /// <param name="source">zdrojový řetězec</param>
        /// <returns>výsledný řetězec nebo hodnota null</returns>
        public static string GetValueOrNull(this GString source) {
            return source==null || source.IsNull ? null : source.Value;
        } // end method

        /// <summary>test na prázdnou hodnotu</summary>
        /// <param name="input">vstupní hodnota</param>
        /// <param name="trim">příznak oříznutí počátečních a koncových mezer u řetězcové hodnoty</param>
        /// <returns>true v případě že je vstupní hodnota rovna null, DBNull nebo prázdnému řetězci, jinak false</returns>
        public static bool IsBlank(this IGDbType input,bool trim = true) {
            return
                input == null ||
                input.IsNull ||
                (input is GString && (trim ? ((GString) input).IsNullOrWhiteSpace : ((GString) input).IsNullOrEmpty));
        } // end method

        /// <summary>test na prázdnou hodnotu</summary>
        /// <param name="input">vstupní hodnota</param>
        /// <returns>true v případě že je vstupní hodnota rovna null nebo DBNull, jinak false</returns>
        public static bool IsNull(this IGDbType input) => input == null || input.IsNull;
        /// <summary>test na neprázdnou hodnotu</summary>
        /// <param name="input">vstupní hodnota</param>
        /// <returns>false v případě že je vstupní hodnota rovna null nebo DBNull, jinak true</returns>
        public static bool IsNotNull(this IGDbType input) => input != null && input.IsNull == false;


        /// <summary>zjištění zda se řetězec nachází v předaném seznamu</summary>
        /// <param name="text">řetězec</param>
        /// <param name="list">seznam</param>
        /// <returns>true v případě, že se řetězec nachází v předaném seznamu, jinak false</returns>
        /// <remarks>porovnávání se provádí s ohledem na velikost znaků s předchozím oříznutím počátečních a koncových mezer</remarks>
        public static bool In(this string text,params string[] list) {
            return In(text,true,list);
        } // end method

        /// <summary>zjištění zda se řetězec nachází v předaném seznamu</summary>
        /// <param name="text">řetězec</param>
        /// <param name="trim">příznak porovnávání s předchozím oříznutím počátečních a koncových mezer</param>
        /// <param name="list">seznam</param>
        /// <returns>true v případě, že se řetězec nachází v předaném seznamu, jinak false</returns>
        /// <remarks>porovnávání se provádí s ohledem na velikost znaků</remarks>
        public static bool In(this string text,bool trim,params string[] list) {
            return In(text,trim,false,list);
        } // end method

        /// <summary>zjištění zda se řetězec nachází v předaném seznamu</summary>
        /// <param name="text">řetězec</param>
        /// <param name="trim">příznak porovnávání s předchozím oříznutím počátečních a koncových mezer</param>
        /// <param name="ignoreCase">příznak porovnávání bez ohledu na velikost znaků</param>
        /// <param name="list">seznam</param>
        /// <returns>true v případě, že se řetězec nachází v předaném seznamu, jinak false</returns>
        public static bool In(this string text,bool trim,bool ignoreCase,params string[] list) {
            if(list == null || text == null) return false;
            else if(trim) return list.Where(item => item != null && String.Compare(text.Trim(),item.Trim(),ignoreCase) == 0).Any();
            else return list.Where(item => item != null && String.Compare(text,item,ignoreCase) == 0).Any();
        } // end method

        /// <summary>zjištění zda se znak nachází v předaném seznamu</summary>
        /// <param name="character">znak</param>
        /// <param name="list">seznam</param>
        /// <returns>true v případě, že se znak nachází v předaném seznamu, jinak false</returns>
        public static bool In(this char character,params char[] list) {
            return list == null ? false : list.Contains(character);
        } // end method

        /// <summary>získání oříznutého řetězce s kontrolou na null</summary>
        /// <param name="source">zdrojový řetězec</param>
        /// <returns>výsledný řetězec</returns>
        public static string NotNullTrimmed(this string source) {
            return source == null ? String.Empty : source.Trim();
        } // end method

        #endregion

        #region metody pro praci s XML

        /// <summary>Nahradí (přidá nebo přepíše) element konkrétního jména jiným obsahem (obdoba metody SetElementValue)</summary>
        /// <param name="root">kořenový element, na němž se metoda volá</param>
        /// <param name="name">název podřízeného elementu (pokud jich existuje více, budou všechny odstraněny)</param>
        /// <param name="objects">nový obsah elementu</param>
        /// <returns>instance nově přidaného elementu</returns>
        public static XElement SetElementContent(this XElement root, XName name, params object[] objects) {
            root.Elements(name).Remove();
            var l_oElem = new XElement(name, objects); 
            root.Add(l_oElem);
            return l_oElem;
        } // end method 

        #endregion

        #region metody pro práci se zdroji

        /// <summary>vrací zformátovaný text jehož předloha se bere ze souboru se zdroji volající assembly</summary>
        /// <typeparam name="T">typ implementující rozhraní IGObject</typeparam>
        /// <param name="source">instance typu implementujícího rozhraní IGObject</param>
        /// <param name="resourceCode">kód předlohy pro formátování textu v souboru se zdroji</param>
        /// <param name="parameters">parametry pro formátování textu</param>
        /// <returns>zformátovaný text</returns>
        /// <remarks>metoda předpokládá název souboru se zdroji shodný s názvem volající assembly ( tj. &lt;CallingAssemblyName&gt;.resx )</remarks>
        public static string GetResourceText<T>(this T source,int resourceCode,params object[] parameters) where T : IGObject {
            try
            {
                return GResources.GetResourceText(typeof(T).Assembly, resourceCode, parameters);
            }
            catch( Exception )
            {
                StackTrace stackTrace = new StackTrace();
                var callingMethod = stackTrace.GetFrame(1).GetMethod().Name;
                var callingClass = stackTrace.GetFrame(1).GetMethod().DeclaringType.FullName;

                throw new GInternalException(21300064, 21300047, callingClass, callingMethod, resourceCode); //RC-EX 21300047 : Třída: {0} Metoda: {1} Chyba při zjištění lokalizovaných textů s kódem {2} 
            }
        } // end method

        #endregion

        #region převod pole bytů na hexadecimální řetězec

        /// <summary>převodní tabulka pro převod pole bytů na hexadecimální řetězec</summary>
        private static readonly string[] m_casHexStringTable = new string[] {
            "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f",
            "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f",
            "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f",
            "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f",
            "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f",
            "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f",
            "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f",
            "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f",
            "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f",
            "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f",
            "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af",
            "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf",
            "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf",
            "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df",
            "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef",
            "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"
        };

        /// <summary>převod pole bytů na hexadecimální řetězec</summary>
        /// <param name="input">vstupní pole bytů</param>
        /// <returns>hexadecimální řetězec</returns>
        public static string ToHexString(this byte[] input) {
            if(input == null) return null;
            else {
                char[] l_acOutput = new char[input.Length << 1];
                for(int i = 0, j = 0; i < input.Length; i++) {
                    l_acOutput[j++] = m_casHexStringTable[input[i]][0];
                    l_acOutput[j++] = m_casHexStringTable[input[i]][1];
                } // en for
                return new string(l_acOutput);
            } // end if
        } // end  method

        #endregion

        #region obecné metody

        /// <summary>zjištění zda vstupní objekt lze reprezentovat jako číslo</summary>
        /// <param name="value">vstupní objekt</param>
        /// <returns>true v případě, že vstupní objekt lze reprezentovat jako číslo, jinak false</returns>
        public static bool IsNumber(this object value) {
            if(value == null) return false;
            else {
                Type l_oType = value.GetType();
                return
                    l_oType == typeof(sbyte) ||
                    l_oType == typeof(byte) ||
                    l_oType == typeof(short) ||
                    l_oType == typeof(ushort) ||
                    l_oType == typeof(int) ||
                    l_oType == typeof(uint) ||
                    l_oType == typeof(long) ||
                    l_oType == typeof(ulong) ||
                    l_oType == typeof(float) ||
                    l_oType == typeof(double) ||
                    l_oType == typeof(decimal) ||
                    l_oType == typeof(SByte) ||
                    l_oType == typeof(Byte) ||
                    l_oType == typeof(Int16) ||
                    l_oType == typeof(UInt16) ||
                    l_oType == typeof(Int32) ||
                    l_oType == typeof(UInt32) ||
                    l_oType == typeof(Int64) ||
                    l_oType == typeof(UInt64) ||
                    l_oType == typeof(Single) ||
                    l_oType == typeof(Double) ||
                    l_oType == typeof(Decimal) ||
                    (l_oType == typeof(GInt16) && ((GInt16) value).IsNull == false) ||
                    (l_oType == typeof(GInt32) && ((GInt32) value).IsNull == false) ||
                    (l_oType == typeof(GInt64) && ((GInt64) value).IsNull == false) ||
                    (l_oType == typeof(GDecimal) && ((GDecimal) value).IsNull == false) ||
                    (l_oType == typeof(GIkc) && ((GIkc) value).IsNull == false) ||
                    GCommon.Parse(value.ToString(),Decimal.MinValue) != Decimal.MinValue; // kontrola na nepovolený znak
            } // end if
        } // end method

        /// <summary>zjištění zda se hodnota výčtového typu nachází v předaném seznamu</summary>
        /// <typeparam name="T">výčtový typ</typeparam>
        /// <param name="value">hodnota výčtového typu</param>
        /// <param name="list">seznam</param>
        /// <returns>true v případě, že se znak nachází v předaném seznamu, jinak false</returns>
        public static bool In<T>(this T value,params T[] list) where T : Enum {
            if(list == null || list.Length < 1) return false;
            return list.Contains(value);
        } // end method

        #endregion

    } // end class

} // end namespace

