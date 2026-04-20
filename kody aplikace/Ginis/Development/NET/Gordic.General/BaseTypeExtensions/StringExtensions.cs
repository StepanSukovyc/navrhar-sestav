//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.StringExtensions.cs                          </Name>
//    <Description> Rozšíření základního typu String o nové funkce              </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2019-11-18                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Rozšíření základního typu String o nové funkce
    /// </summary>
    public static class StringExtensions
    {
        /// <summary>
        /// Převede string na SecureString
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static SecureString ConvertStringToSecureString(this string data)
        {
            if( data == null)
                return null;

            var secure = new SecureString();
            foreach (var character in   data.ToCharArray())
                secure.AppendChar(character);
            secure.MakeReadOnly();
            return secure;

        }

        /// <summary>
        /// Funkce pro přepis textu od zadané pozice v zadané délce novým textem
        /// Pokud je pozice pro přepis mimo délku původního textu, potom se vrátí původní text.
        /// </summary>
        /// <param name="a_orig_text">Text který do kterého se má vpisovat.</param>
        /// <param name="a_start_pos">Pozice od které má být v originálním textu přepisováno. 
        /// Pokud je startovací pozice mimo délku originálního textu, potom funkce vrací pouze originální text.</param>
        /// <param name="a_delka">Délka textu, která má být z originálního textu nahrazena novým textem</param>
        /// <param name="a_new_text">Nový text který má být vepsán do originálního textu</param>
        /// <returns>Upravený text.</returns>
        public static string Replace(this string a_orig_text, int a_start_pos, int a_delka, string a_new_text)
        {
            string v_vysledek;
            int v_end_index;
            v_vysledek = "";
            if (a_start_pos == a_orig_text.Length && a_delka == 0)		        // pokud je zadana pozice za poslednim znake a delka je nula
                v_vysledek = a_orig_text + a_new_text;							// pripojim novy text na konec retezce
            else if (a_start_pos > a_orig_text.Length)							// pokud je pocatecni pozice mimo delku zadaneho originalniho retecze
                v_vysledek = a_orig_text;										// vratim originalni text bez uprav
            else
            {
                if (a_start_pos > 0)											// pokud je startovaci pozice vice nez od zacatku stringu
                    v_vysledek = a_orig_text.Substring(0, a_start_pos );	    // umistim na zacatek zacatek originalniho textu az po startovaci pozici
                v_vysledek = v_vysledek + a_new_text;							// pridam retezec, ktery se ma zapsat na misto stareho retezce
                v_end_index = a_start_pos + a_delka;						    //posunu se za prepisovany retezec a protoze index je v DOT.NET od 0, odectu jednicku
                if (v_end_index <= a_orig_text.Length)							// pokud koncova poloha neni mimo delku originalniho retezce
                    if (v_end_index > 0)
                        v_vysledek = v_vysledek + a_orig_text.Substring(v_end_index);	// pripojim na konec konec originalniho textu
            }
            return (v_vysledek);
        }
        /// <summary>
        /// Funkce pro náhradu všech výskytů zadaného textu za nový zadaný text a to podle maskovacího textu.
        /// </summary>
        /// <param name="a_zdroj">Originální text ve kterém má být přepisováno.</param>
        /// <param name="a_mask_zdroj">Maskovací text, který je použit pro vyhledávání textu pro přepisování.
        /// Délka a pozice jednotlivých znaků musí odpovídat originálnímu textu.
        /// Texty které se mají vyřadit z prohledávání a přepisování se v maskovacím řetězci nahradí mezerami.</param>
        /// <param name="a_orig_text">Řetězec který má být přepisován - nahrazován. Nesmí to být mezera/mezery.</param>
        /// <param name="a_new_text">Nový řetězec, který má nahrazovat přepisovaný text.</param>
        /// <returns></returns>
        public static string Replace(this string a_zdroj, string a_mask_zdroj, string a_orig_text, string a_new_text)
        {
            int v_start;					            // zacatek prepisovaneho textu
            string v_vysledek;
            v_start = 0;								// nastavim zacatek vyhledavani
            v_vysledek = a_zdroj;						// presunu zdrojovy text do pracovni prom.
            v_start = a_mask_zdroj.IndexOf(a_orig_text, v_start) ;	// hledam prvni vyskyt textu v maskovacim retezci, ktery se ma prepsat
            while (v_start != -1)									// pokud tam takovy text je
            {
                v_vysledek = Replace(v_vysledek, v_start, a_orig_text.Length, a_new_text);	// prepisu text na novou hodnotu
                a_mask_zdroj = Replace(a_mask_zdroj, v_start, a_orig_text.Length, "".PadLeft(a_new_text.Length, ' '));	// prepisu maskovaci text - misto nove hodnoty pouziji odpovidajici pocet mezer
                v_start = v_start + a_new_text.Length;					// posunu se za nove vlozeny text
                v_start = a_mask_zdroj.IndexOf(a_orig_text, v_start);	// hledam dalsi vyskyt textu v maskovacim retezci, ktery se ma prepsat	
            }
            return (v_vysledek);
        }

        /// <summary>
        /// Test zda string má hodnotu null, nebo je prázdný
        /// Stejné jako String.IsNullOrEmpty()
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static bool IsNullOrEmpty(this string value)
        {
            return (String.IsNullOrEmpty(value));
        }

        /// <summary>
        /// Test zda string má hodnotu null, nebo je prázdný nebo obsahu je pouze White znaky
        /// Stejné jako String.IsNullOrWhiteSpace()
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static bool IsNullOrWhiteSpace(this string value)
        {
            return (String.IsNullOrWhiteSpace(value));
        }

        /// <summary>
        /// Vyříznutí prvních n znaků. Pokud je ořezávaný řetězec kratší, potom to není chyba. Vrátí se v tom případě původní řetězec.
        /// </summary>
        /// <param name="value">Ořezávaný text</param>
        /// <param name="length">Počet znaků z leva, které se mají vrátit. Pokud je počet znaků větší jak délka celého stringu, potom to není považováno za chybu.</param>
        /// <returns>Vrácených prvních x znaků.</returns>
        public static string Left(this string value, int length)
        {
            string v_vysledek = value;
            if (length < 0)
                throw new ArgumentOutOfRangeException("Pro funkci String.Left() nesmí být požadovaná délka menší jak 0.");
            if (value != null)
                if (length <= value.Length)
                    v_vysledek = value.Substring(0, length);
            return (v_vysledek);
        }

        /// <summary>
        /// Vyříznutí posledních n znaků 
        /// </summary>
        /// <param name="value">Text ze kterého se má řezat. Pokud je vstupem NULL, potom je výstupem také NULL</param>
        /// <param name="length">Počet znaků z prava, které se mají vrátit. Pokud je počet znaků větší jak délka celého stringu, potom to není považováno za chybu a vrátí se původní text.</param>
        /// <returns>Vrácených posledních x znaků z původního textu.</returns>
        public static string Right(this string value, int length)
        {
            string v_vysledek = value;
            if (length < 0)
                throw new ArgumentOutOfRangeException("Pro funkci String.Right() nesmí být požadovaná délka menší jak 0.");
            if (value != null)
                if ((value.Length - length) >= 0)
                    v_vysledek = value.Substring(value.Length - length);
            return (v_vysledek);
        }

        /// <summary>
        /// Podobně jako u DB strojů - Převede string na malá písmena. Pokud je string NULL, výsledek je bez vyhlášení chyby také NULL
        /// </summary>
        /// <param name="a_text">Text, který se má převést na malé znaky</param>
        /// <returns>Vrátí původní text převedený na malé znaky a v případě, že byl null, potom vrátí null.</returns>
        public static string Lower(this string a_text)
        {
            string v_vysledek = a_text;
            if (a_text != null)
                v_vysledek = a_text.ToLower();
            return v_vysledek;
        }

        /// <summary>
        /// Vyříznutí textu do prvního nalezeného výskytu zadaného hraničního textu. Vyříznutý text neobsahuje hraniční text.
        /// Hledání hraničního textu je CASE SENSITIVE
        /// Pokud hraniční text není nalezen, potom se vrátí prázdný string, pokud je nastaveno a_or_to_end, potom vrátí celý text.
        /// </summary>
        /// <param name="value">Text ze kterého se vyřezává</param>
        /// <param name="toText">Hraniční substring, ke kterému se má text vyříznout</param>
        /// <param name="a_or_to_end">Příznak, že se má vyříznout do hledaného textu nebo až po konec zadaného textu</param>
        /// <returns>Vyříznutý text od začátku zadaného textu až po první výskyt hraničního textu nalezeného zadaném textu.</returns>
        public static string CutTo(this string value, string toText, bool a_or_to_end = false)
        {
            return GStrFce.CutTo(value, toText, a_or_to_end);
        }

        /// <summary>
        /// Vyříznutí textu do prvního nalezeného výskytu zadaného hraničního textu ze zadaného pole textů. Vyříznutý text neobsahuje hraniční text.
        /// Hledání hraničního textu je CASE SENSITIVE
        /// Pokud hraniční text není nalezen, potom se vrátí prázdný string, pokud je nastaveno a_or_to_end, potom vrátí celý text.
        /// </summary>
        /// <param name="value">Text ze kterého se vyřezává</param>
        /// <param name="toText">Hraniční substring, ke kterému se má text vyříznout</param>
        /// <param name="a_or_to_end">Příznak, že se má vyříznout do hledaného textu nebo až po konec zadaného textu</param>
        /// <returns>Vyříznutý text od začátku zadaného textu až po první výskyt hraničního textu nalezeného zadaném textu.</returns>
        public static string CutTo(this string value, string[] toText, bool a_or_to_end = false)
        {
            bool nalezeno = false;
            string vysledek = value;
            foreach (string text in toText)
            {
                vysledek = GStrFce.CutTo(vysledek, text, true); // oříznu do zadaného textu nebo do konce textu
                if(vysledek != value)       // pokud se výsledek liší od originálního textu
                    nalezeno = true;        // to je příznak, že jsem našel nějaký výskyt
            }
            if (!nalezeno && !a_or_to_end)  // pokud nebyla ani jeden výskyt a nemám vracet celý text
                vysledek = "";              // vrátím prázdno
            return vysledek;
        }

        /// <summary>
        /// Vyříznutí textu do prvního nalezeného výskytu zadaného hraničního znaku ze zadaného pole znaků. Vyříznutý text neobsahuje hraniční znak.
        /// Hledání hraničního textu je CASE SENSITIVE
        /// Pokud hraniční znak není nalezen, potom se vrátí prázdný string, pokud je nastaveno a_or_to_end, potom vrátí celý text.
        /// </summary>
        /// <param name="value">Text ze kterého se vyřezává</param>
        /// <param name="toChar">Hraniční znaky, ke kterým se má text vyříznout</param>
        /// <param name="a_or_to_end">Příznak, že se má vyříznout do hledaných znaků nebo až po konec zadaného textu</param>
        /// <returns>Vyříznutý text od začátku zadaného textu až po první výskyt hraničního znaku nalezeného v zadaném textu.</returns>
        public static string CutTo(this string value, char[] toChar, bool a_or_to_end = false)
        {
            int index = value.IndexOfAny(toChar);
            if( index == -1 )
            {
                if (a_or_to_end)
                    return value;
                else
                    return "";
            }
            else
            {
                return value.Substring(0, index);
            }
        }

        /// <summary>
        /// Vyříznutí textu do prvního nalezeného výskytu zadaného hraničního textu ze zadaného pole textů. Vyříznutý text neobsahuje hraniční text. Hledání se ale realizuje v maskovaném textu
        /// Hledání hraničního textu je CASE SENSITIVE
        /// Pokud hraniční text není nalezen, potom se vrátí prázdný string, pokud je nastaveno a_or_to_end, potom vrátí celý text.
        /// </summary>
        /// <param name="value">Text ze kterého se vyřezává</param>
        /// <param name="maskText">Text podle kterého se bude vyřezávat</param>
        /// <param name="toText">Hraniční substring, ke kterému se má text vyříznout</param>
        /// <param name="a_or_to_end">Příznak, že se má vyříznout do hledaného textu nebo až po konec zadaného textu</param>
        /// <returns>Vyříznutý text od začátku zadaného textu až po první výskyt hraničního textu nalezeného zadaném textu.</returns>
        public static string CutTo(this string value, string maskText, string[] toText, bool a_or_to_end = false)
        {
            bool nalezeno = false;
            string vysledek = value;
            foreach (string text in toText)
            {
                vysledek = GStrFce.CutTo(vysledek, maskText, text, true); // oříznu do zadaného textu nebo do konce textu

                if (vysledek != value)       // pokud se výsledek liší od originálního textu
                {
                    nalezeno = true;        // to je příznak, že jsem našel nějaký výskyt
                    maskText = GStrFce.CutTo(maskText, text, true); // oříznu do zadaného textu nebo do konce textu
                }
            }
            if (!nalezeno && !a_or_to_end)  // pokud nebyla ani jeden výskyt a nemám vracet celý text
                vysledek = "";              // vrátím prázdno
            return vysledek;
        }

        /// <summary>
        /// Vyříznutí textu od prvního nalezeného výskytu zadaného hraničního textu. Vyříznutý text neobsahuje hraniční text.
        /// Hledání hraničního textu je CASE SENSITIVE
        /// Pokud hraniční text není nalezen, potom se vrátí prázdný string
        /// </summary>
        /// <param name="value">Originální text ve kterém se hledá hraniční text a ze kterého se vyřízne text následující za hraničním.</param>
        /// <param name="fromText">Hraniční text od kterého se vyřízne výsledný text.</param>
        /// <returns>Vyříznutý text.</returns>
        public static string CutFrom(this string value, string fromText)
        {
            return GStrFce.CutFrom(value, fromText);
        }

        /// <summary>
        /// Vyříznutí textu od prvního nalezeného výskytu zadaného hraničního textu. Vyříznutý text neobsahuje hraniční text.
        /// Hledání hraničního textu je CASE SENSITIVE
        /// Pokud hraniční text není nalezen, potom se vrátí prázdný string
        /// </summary>
        /// <param name="value">Originální text ve kterém se hledá hraniční text a ze kterého se vyřízne text následující za hraničním.</param>
        /// <param name="fromText">Hraniční text od kterého se vyřízne výsledný text.</param>
        /// <param name="a_or_from_start">Pokud se hraniční text nenalezne, potom se vrátí vše od prvního znaku</param>
        /// <returns>Vyříznutý text.</returns>
        public static string CutFrom(this string value, string[] fromText, bool a_or_from_start = false)
        {
            bool nalezeno = false;
            string vysledek = value;
            SortedDictionary<int,string> texty = new SortedDictionary<int,string>();
            foreach (string text in fromText)
            {
                string pomText = GStrFce.CutFrom(vysledek, text, true);
                int pomLength = pomText.Length;
                if (pomLength != value.Length)  // pokud jsou různé délky, potom jsem něco našel
                    nalezeno = true;

                if (!texty.ContainsKey(pomLength))
                    texty.Add(pomLength, pomText);
            }
            if (!nalezeno && !a_or_from_start)
                vysledek = "";
            else if (texty.Count > 0)
                vysledek = texty[0];
            return vysledek;

        }

        /// <summary>
        /// Vyříznutí textu od do zadaných hraničních textů
        /// Pokud hraniční texty nejsou nalezeny, potom se vrátí prázdný string, pokud je nastaveno a_or_to_end, potom vrátí celý text.
        /// </summary>
        /// <param name="value">Originální text ze kterého se vyřízne text</param>
        /// <param name="fromText">Hraniční text od kterého se vyřízne výsledný text.</param>
        /// <param name="toText">Hraniční substring, ke kterému se má text vyříznout</param>
        /// <param name="a_or_to_end">Příznak, že se má vyříznout do hledaného textu nebo až po konec zadaného textu</param>
        /// <returns></returns>
        public static string CutFromTo(this string value, string fromText, string toText, bool a_or_to_end = false)
        {
            return GStrFce.CutFromTo(value, fromText, toText, a_or_to_end);
        }

        /// <summary>
        /// Rozřezání stringu na stejně velké úseky ( při zachování celistvosti více znakových písmen )
        /// </summary>
        /// <param name="value">Text, který se má rozřezat</param>
        /// <param name="desiredLength">Velikost jednotlivých kusů</param>
        /// <param name="strict">Příznak, že se kontroluje přesná velikost zdrojového textu na celé násobky požadované délky</param>
        /// <returns>Pole rozřezaných stringů</returns>
        public static string[] SplitByLength(this string value, int desiredLength, bool strict = false)
        {
            //https://codereview.stackexchange.com/questions/111919/split-a-string-into-chunks-of-the-same-length

            if (!SplitByLengthParamsIsValid(value, desiredLength, strict))
                throw new ArgumentException("Chybné vstupní argumenty funkce SplitByLength");

            var stringInfo = new StringInfo(value);

            int currentLength = stringInfo.LengthInTextElements;
            if (currentLength == 0) { return new string[0]; }

            int numberOfItems = currentLength / desiredLength;

            int remaining = (currentLength > numberOfItems * desiredLength) ? 1 : 0;

            var chunks = new string[numberOfItems + remaining];

            for (var i = 0; i < numberOfItems; i++)
            {
                chunks[i] = stringInfo.SubstringByTextElements(i * desiredLength, desiredLength);
            }

            if (remaining != 0)
            {
                chunks[numberOfItems] = stringInfo.SubstringByTextElements(numberOfItems * desiredLength);
            }

            return chunks;
        }
        /// <summary>
        /// pomocná funkce pro kontrolu argumentů funkce SplitByLength
        /// </summary>
        /// <param name="value"></param>
        /// <param name="desiredLength"></param>
        /// <param name="strict"></param>
        /// <returns></returns>
        private static bool SplitByLengthParamsIsValid(string value, int desiredLength, bool strict)
        {
            return value != null
                && !(value.Length == 0 && desiredLength != 0)
                && !(value.Length != 0 && desiredLength < 1)
                && !(strict && (value.Length % desiredLength != 0));
        }

        /// <summary>
        /// Převod textu na bool - podle PowerBuilder
        /// Pokud je bez ohledu na velikost: "TRUE", "YES", "1", "ANO", "ON", "T", "Y", "A" - potom vrátí true, jinak vždy false
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static bool ToBool(this string value )
        {
            string text = value.ToUpper().Trim();
            if (text == "TRUE" || text == "YES" || text == "1" || text == "ANO" || text == "ON" || text == "T" || text == "Y" || text == "A")
                return (true);
            else
                return (false);
        }

        /// <summary>
        /// Test zda textu má nějakou hodnotu převeditelnou na bool - podle PowerBuilder
        /// Pokud je bez ohledu na velikost: "TRUE", "YES", "1", "ANO", "ON", "T", "Y", "A", "FALSE", "NO", "0", "NE", "OFF", "F", "N"  - potom vrátí true, jinak vždy false
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static bool IsBool(this string value)
        {
            string text = value.ToUpper().Trim();
            if (text == "TRUE" || text == "YES" || text == "1" || text == "ANO" || text == "ON" || text == "T" || text == "Y" || text == "A")
                return (true);
            else if (text == "FALSE" || text == "NO" || text == "0" || text == "NE" || text == "OFF" || text == "F" || text == "N")
                return (true);
            else
                return (false);
        }

        /// <summary>
        /// Redukuje za sebou jdoucí vícenásobné výskyty různých whiteSpace na vždy jednu mezeru
        /// Případnou první a poslední mezeru zachová
        /// Příklad:
        /// "This contains     too          much  whitespace."
        /// "This contains too much whitespace."
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static String ReduceWhiteSpaces(this String value)
        {
            var newString = new StringBuilder();
            bool previousIsWhitespace = false;
            for (int i = 0; i < value.Length; i++)
            {
                if (Char.IsWhiteSpace(value[i]))
                {
                    if (previousIsWhitespace)
                        continue;
                    previousIsWhitespace = true;
                    newString.Append(" ");
                }
                else
                {
                    previousIsWhitespace = false;
                    newString.Append(value[i]);
                }
            }

            return newString.ToString();
        }

        /// <summary>
        /// Převede zadaný string na jeho unicodový HEX code - každý element/znak je na samostatném řádku
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string ToUnicodeHexCode(this string value)
        {
            StringBuilder vysledek = new StringBuilder();
            
            TextElementEnumerator teEnum = StringInfo.GetTextElementEnumerator(value);
            while (teEnum.MoveNext())
            {
                vysledek.AppendLine(ShowHexValues((string)(teEnum.Current)));
            }
            return vysledek.ToString();
        }
        private static string ShowHexValues(string s)
        {
            string hexString = "";
            foreach (var ch in s)
                hexString += $"{(ushort)ch:X4} ";

            return hexString;
        }

    }
}
