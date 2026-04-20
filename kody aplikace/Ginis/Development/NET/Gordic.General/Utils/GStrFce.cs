//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GStrFce.cs                                   </Name>
//    <Description> Třída obsahující funkce pro manipulace se stringem.         </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-03-06                                                  </Created>
//  </FileHeader>

using System;
using System.Text;
using System.IO;
using System.Linq;

namespace Gordic.General
{
    /// <summary>
    /// Třída obsahující funkce pro manipulace se stringem převzaté z PowerBuilder aplikací. 
    /// Funkce jsou odvozeny od PowerBuilder funkcí.
    /// Hlavní rozdíl oproti funkcím DOT.NETu je indexování pozice řetězce od čísla 1.
    /// Dále jiné chování k požadavkům na manipulace s řetězci mimo povolený rozsah indexu znaků. 
    /// DOT.NET vzhlašuje v takovém případě chybu. Tyto funkce se zachovají podle pravidel PowerBuilderu a chybu nevyhlásí.
    /// 
    /// Verze 2017-01-02
    /// 
    /// </summary>
    public class GStrFce
    {
        /// <summary>
        /// Základní konstruktor.
        /// </summary>
        public GStrFce()
        {
        }

        /// <summary>
        /// Přepinač zda operace je CaseInsensitive nebo CaseSensitive
        /// </summary>
        public enum CaseSensitiveEnum
        {
            /// <summary>
            /// Přepinač Case Insensitive
            /// </summary>
            CI,
            /// <summary>
            ///  Přepinač Case Sensitive
            /// </summary>
            CS
        };
        /// <summary>
        /// Funkce otočí pořadí znaků v textu. První bude na konci a obráceně. Obdoba interní PB funkce Reverse()
        /// </summary>
        /// <param name="a_text"></param>
        /// <returns></returns>
        public static string Reverse(string a_text)
        {
            if (a_text.IsNullOrEmpty())
                return a_text;

            //int v_znak_count = a_text.Length;
            //int v_znak_count_minus_jedna = v_znak_count - 1;
            //char[] v_vysledek = new char[v_znak_count];
            //for (int v_znak_num = 0; v_znak_num < v_znak_count; v_znak_num++)		// vezmu znak po znaku
            //    v_vysledek[v_znak_count_minus_jedna - v_znak_num] = a_text[v_znak_num];
            //return (v_vysledek.ToString());

            char[] charArray = a_text.ToCharArray();
            Array.Reverse(charArray);
            return new string(charArray);
        }

        /// <summary>
        /// Převod čísla na string
        /// </summary>
        /// <param name="a_cislo"></param>
        /// <returns></returns>
        public static string String(int a_cislo)
        {
            return a_cislo.ToString();
        }

        /// <summary>
        /// Funkce pro převod textu na lower 
        /// </summary>
        /// <param name="a_text"></param>
        /// <returns></returns>
        public static string Lower(string a_text)
        {
            if (a_text == null)
                return a_text;
            else
                return a_text.ToLower();
        }

        /// <summary>
        /// Funkce převede zadaný řetězec na velká písmena.
        /// </summary>
        /// <param name="a_text">Převáděný řetězec.</param>
        /// <returns>Řetězec převedený na velká písmena.</returns>
        public static string Upper(string a_text)
        {
            if (a_text == null)
                return a_text;
            else
                return (a_text.ToUpper());
        }

        /// <summary>
        /// Vrátí počet výskytů zadaného řetězce v zadaném textu
        /// </summary>
        /// <param name="a_case">Příznak, zda se při hledání výskytů má postupovat case sensitive.</param>
        /// <param name="a_text">Text ve kterém se hledá</param>
        /// <param name="a_find_text">Text který se hledá</param>
        /// <returns>Počet nalezených výskytů.</returns>
        public static int CountExist(CaseSensitiveEnum a_case, string a_text, string a_find_text)
        {
            int v_vysledek;
            int v_pozice;
            int v_delka;
            v_pozice = 0;
            v_vysledek = 0;

            //if (a_case == CaseSensitiveEnum.CI)
            //{
            //    a_text = a_text.ToLower();
            //    a_find_text = a_find_text.ToLower();
            //}

            StringComparison stringComparison = StringComparison.Ordinal;
            if (a_case == CaseSensitiveEnum.CI)
                stringComparison = StringComparison.OrdinalIgnoreCase;

            v_delka = a_find_text.Length;
            do
            {
                v_pozice = a_text.IndexOf(a_find_text, v_pozice, stringComparison); 		// hledam vyskyt od pozice
                if (v_pozice != -1)
                {									// pokud se tam vyskytuje
                    v_vysledek++;	// zvetsim pocitadlo vyskytu
                    v_pozice += v_delka;	// posunu se pozici az za nalezeny text
                }
            } while (v_pozice != -1);
            return (v_vysledek);
        }

        /// <summary>
        /// Vrátí počet výskytů zadaného řetězce v zadaném textu. Hledání je CASE SENSITIVE
        /// </summary>
        /// <param name="a_text">Text ve kterém se hledá</param>
        /// <param name="a_find_text">Text který se hledá</param>
        /// <returns>Počet nalezených výskytů.</returns>
        public static int CountExist(string a_text, string a_find_text)
        {
            return (CountExist(CaseSensitiveEnum.CS, a_text, a_find_text));
        }

        /// <summary>
        /// Test existence substringu v zadané textu
        /// </summary>
        /// <param name="a_case">Příznak, zda se při hledání výskytů má postupovat case sensitive.</param>
        /// <param name="a_text">Text který se prohledává.</param>
        /// <param name="a_find_text">Text který se hledá</param>
        /// <returns>True pokud substring byl nalezen.</returns>
        public static bool TestExist(CaseSensitiveEnum a_case, string a_text, string a_find_text)
        {
            // bool v_vysledek = false;
            //if ( a_text.IndexOf(a_find_text, 0, stringComparison) >= 0 )
            //if (CountExist(a_case, a_text, a_find_text) >= 1)
            //    v_vysledek = true;
            //else
            //    v_vysledek = false;
            //return (v_vysledek);

            StringComparison stringComparison = StringComparison.Ordinal;
            if (a_case == CaseSensitiveEnum.CI)
                stringComparison = StringComparison.OrdinalIgnoreCase;
            return (a_text.IndexOf(a_find_text, 0, stringComparison) >= 0);
        }

        /// <summary>
        /// Test existence substringu v zadané textu. Hledání je CASE INSENSITIVE
        /// </summary>
        /// <param name="a_text">Text který se prohledává.</param>
        /// <param name="a_find_text">Text který se hledá</param>
        /// <returns>True pokud substring byl nalezen.</returns>
        public static bool TestExist(string a_text, string a_find_text)
        {
            //bool v_vysledek;
            //v_vysledek = TestExist(CaseSensitiveEnum.CI, a_text, a_find_text);
            //return (v_vysledek);
            return (a_text.IndexOf(a_find_text, 0, StringComparison.OrdinalIgnoreCase) >= 0);
        }
        /// <summary>
        /// Test existence substringu v zadané textu
        /// </summary>
        /// <param name="a_case">Příznak, zda se při hledání výskytů má postupovat case sensitive.</param>
        /// <param name="a_text">Text který se prohledává.</param>
        /// <param name="a_find_text">Text který se hledá</param>
        /// <returns>True pokud substring byl nalezen.</returns>
        public static bool TextExist(CaseSensitiveEnum a_case, string a_text, string a_find_text)
        {
            //bool v_vysledek;
            //v_vysledek = TestExist(a_case, a_text, a_find_text);
            //return (v_vysledek);

            StringComparison stringComparison = StringComparison.Ordinal;
            if (a_case == CaseSensitiveEnum.CI)
                stringComparison = StringComparison.OrdinalIgnoreCase;
            return (a_text.IndexOf(a_find_text, 0, stringComparison) >= 0);
        }
        /// <summary>
        /// Test existence substringu v zadané textu. Hledání je CASE INSENSITIVE
        /// </summary>
        /// <param name="a_text">Text který se prohledává.</param>
        /// <param name="a_find_text">Text který se hledá</param>
        /// <returns>True pokud substring byl nalezen.</returns>
        public static bool TextExist(string a_text, string a_find_text)
        {
            //bool v_vysledek;
            //v_vysledek = TestExist(CaseSensitiveEnum.CI, a_text, a_find_text);
            //return (v_vysledek);

            return (a_text.IndexOf(a_find_text, 0, StringComparison.OrdinalIgnoreCase) >= 0);
        }

        /// <summary>
        /// Vyříznutí textu od prvního nalezeného výskytu zadaného hraničního textu. Vyříznutý text neobsahuje hraniční text.
        /// Hledání hraničního textu je CASE SENSITIVE a to proti obsahu maskovacího textu.
        /// </summary>
        /// <param name="a_text">Originální text ze kterého se má vyřezává.</param>
        /// <param name="a_text_vzor">Maskovací vzorový text, podle kterého se má vyhledávat hraniční text. 
        /// V maskovacím textu se hledá výskyt hraničního textu a podle nalezené pozice se vyřízne text ze zadaného originálním textu.
        /// Aby maskovací text šlo použít, musí pozice znaků v originálním a maskovacím textu sedět. 
        /// Maskování lze použít např. na odstínění obsahu obsaženém uvnitř závorek. Vše co je uvnitř závorek se nejprve musí nahradit odpovídajícím počtem mezer a následně se takto upravený text použije jako maska pro funkci na vyřezávání textu.</param>
        /// <param name="a_from_text">Hraniční text, od kterého se má vyřezávat.</param>
        /// <param name="a_or_from_start">Pokud se hraniční text nenalezne, potom se vrátí vše od prvního znaku</param>
        /// <returns>Výsledný text. Pokud maskovací text neobsahuje žádný výskyt hraničního textu, potom se vrátí prázdný string.</returns>
        public static string CutFrom(string a_text, string a_text_vzor, string a_from_text, bool a_or_from_start = false)
        {
            int v_pozice;
            string v_vysledek;

            v_pozice = a_text_vzor.IndexOf(a_from_text, 0);	// hledam pozici zadaneho textu ve vzorovem retezci
            if (v_pozice == -1 && a_or_from_start)				    // pokud text nebyl nalezen 
                v_vysledek = a_text;
            else if (v_pozice == -1)								// pokud text nebyl nalezen
                v_vysledek = "";
            else
            {
                v_pozice = v_pozice + a_from_text.Length; 		// vypocitam pozici odkud budu vyrezavat
                if (a_text.Length < v_pozice)					// pokud za nalezenym textem jiz nic neni
                    v_vysledek = "";
                else
                    v_vysledek = a_text.Substring(v_pozice);	// vyriznu text do konce stringu
            };
            return (v_vysledek);
        }
        /// <summary>
        /// Vyříznutí textu od prvního nalezeného výskytu zadaného hraničního textu. Vyříznutý text neobsahuje hraniční text.
        /// Hledání hraničního textu je CASE SENSITIVE
        /// </summary>
        /// <param name="a_text">Originální text ve kterém se hledá hraniční text a ze kterého se vyřízne text následující za hraničním.</param>
        /// <param name="a_from_text">Hraniční text od kterého se vyřízne výsledný text.</param>
        /// <param name="a_or_from_start">Pokud se text nenajde, potom vrátí původní text, pro false vrátí prázdný string</param>
        /// <returns>Vyříznutý text.</returns>
        public static string CutFrom(string a_text, string a_from_text, bool a_or_from_start = false)
        {
            return (CutFrom(a_text, a_text, a_from_text, a_or_from_start));
        }
        /// <summary>
        /// Vyříznutí textu po první výskyt zadaného substringu
        /// </summary>
        /// <param name="a_text">Text ze kterého se vyřezává</param>
        /// <param name="a_text_vzor">Maskovací text, který slouží jako základ pro hledání hraničního textu</param>
        /// <param name="a_to_text">Hraniční substring, ke kterému se má text vyříznout</param>
        /// <param name="a_or_to_end">Příznak, že se má vyříznout do hledaného textu nebo až po konec zadaného textu</param>
        /// <returns>Vyříznutý text od začátku zadaného a_text až po první výskyt hraničního textu nalezeného v maskovacím textu.</returns>
        public static string CutTo(string a_text, string a_text_vzor, string a_to_text, bool a_or_to_end = false )
        {
            string v_vysledek;
            int v_pozice = Pos(a_text_vzor, a_to_text, 1);	 // hledam pozici zadaneho textu ve vzorovem textu
            if (v_pozice == 0 && a_or_to_end )				 // pokud text nebyl nalezen
                v_vysledek = a_text;
            else if (v_pozice == 0 )                         // pokud text nebyl nalezen
                    v_vysledek = "";
            else if (v_pozice == 1)                          // pokud text zacina zadanym textem
                    v_vysledek = "";
            else                                            // pokud pred nalezenym textem neco je
                v_vysledek = Left(a_text, v_pozice - 1);	// vyriznu text od zacatku az po nalezeny text

            return (v_vysledek);
        }
        /// <summary>
        /// Vyříznutí textu po první výskyt zadaného substringu
        /// </summary>
        /// <param name="a_text">Text ze kterého se vyřezává</param>
        /// <param name="a_to_text">Hraniční substring, ke kterému se má text vyříznout</param>
        /// <param name="a_or_to_end">Příznak, že se má vyříznout do hledaného textu nebo až po konec zadaného textu</param>
        /// <returns>Vyříznutý text od začátku zadaného a_text až po první výskyt hraničního textu nalezeného textu.</returns>
        public static string CutTo(string a_text, string a_to_text, bool a_or_to_end = false)
        {
            return (CutTo(a_text, a_text, a_to_text,a_or_to_end));
        }
        /// <summary>
        /// Vyříznutí text ze stringu a to od prvního výskytu zadaného startovacího hraničního substringu 
        /// po první další výskyt koncového hraničního substringu.
        /// </summary>
        /// <param name="a_text">Text ze kterého se má vyřezávat.</param>
        /// <param name="a_cut_from">Startovací hraniční substring</param>
        /// <param name="a_cu_to">Koncový hraniční substring.</param>
        /// <param name="a_or_to_end">Příznak, že se má vyříznout do hledaného textu nebo až po konec zadaného textu</param>
        /// <returns>Vyříznutý text a to bez hraničních substringů. Pokud vstupní text neobsahuje zadané hraniční znaky, 
        /// potom se vrátí prázdný string.</returns>
        public static string CutFromTo(string a_text, string a_cut_from, string a_cu_to, bool a_or_to_end = false)
        {
            string v_vysledek = CutFrom(a_text, a_cut_from);
            v_vysledek = CutTo(v_vysledek, a_cu_to, a_or_to_end);
            return (v_vysledek);
        }
        /// <summary>
        /// Vyříznutí od do podle masky
        /// </summary>
        /// <param name="a_text"></param>
        /// <param name="a_text_vzor"></param>
        /// <param name="a_from_text"></param>
        /// <param name="a_to_text"></param>
        /// <param name="a_or_to_end">Příznak, že se má vyříznout do hledaného textu nebo až po konec zadaného textu</param>
        /// <returns></returns>
        public static string CutFromTo(string a_text, string a_text_vzor, string a_from_text, string a_to_text, bool a_or_to_end = false)
        {

            int v_pozice_from;
            int v_pozice_to;
            string v_vysledek;

            v_pozice_from = Pos(a_text_vzor, a_from_text, 1);       // hledam pozici zadaneho textu ve vzorovem retezci
            if (v_pozice_from == 0)                                     // pokud text nebyl nalezen
                v_vysledek = "";            // koncim
            else
            {
                v_pozice_from = v_pozice_from + Len(a_from_text); // vypocitam pozici odkud budu vyrezavat

                if (Len(a_text) < v_pozice_from)                 // pokud za nalezenym textem jiz nic neni
                {
                    v_vysledek = "";                                            // je to prazdno
                }
                else                                                                // pokud za nalezenym textem je retezec
                {
                    v_pozice_to = Pos(a_text_vzor, a_to_text, v_pozice_from);   // hledam pozici zadaneho textu ve vzorovem textu a pokracuji v hledani od pozice OD
                    if (v_pozice_to == 0 && a_or_to_end)                // pokud text nebyl nalezen
                        v_vysledek = Mid(a_text, v_pozice_from );           // vyriznu pozadovany text
                    else if (v_pozice_to == 0)                                                   // pokud text nebyl nalezen
                        v_vysledek = "";                                                        // vratim prazdno - protoze tato funkce je dusledne vyriznuti OD - DO
                    else                                                                            // pokud koncova hranice byla nalezena
                    {
                        if (v_pozice_to == v_pozice_from)                               // pokud nalezeny text zacina hranicnim zadanym textem - text je prazdno DO tesne navazuje na DO
                            v_vysledek = "";                                                    // vratim prazdno
                        else                                                                        // pokud pred nalezenym textem neco je
                            v_vysledek = Mid(a_text, v_pozice_from, v_pozice_to - v_pozice_from);           // vyriznu pozadovany text
                    }
                }
            }
            return (v_vysledek);
        }
        /// <summary>
        /// Vyříznutí textu ze skládaného klíče. 
        /// </summary>
        /// <param name="a_cislo">Číslo sekce ze které se má vyřezávat</param>
        /// <param name="a_string">Text - skládaný klíč</param>
        /// <param name="a_text_vzor">Maskovací text pro hledání sekcí</param>
        /// <param name="a_separ_znak">Oddělovací string použitý pro oddělení jednotlivých sekcí.</param>
        /// <returns>Obsah zadané sekce skládaného klíče</returns>
        public static string CutFromKey(int a_cislo, string a_string, string a_text_vzor, string a_separ_znak)
        {
            string v_vysledek;
            int v_i;
            int v_zacatek;
            int v_konec;
            v_vysledek = "";
            v_zacatek = 1;
            for (v_i = 1; v_i <= a_cislo; v_i++)
            {
                v_konec = Pos(a_text_vzor, a_separ_znak, v_zacatek);
                if (v_konec == 0)			// pokud jsem nenasel oddelovaci znak
                {
                    v_vysledek = "";		// priznak neuspech
                    break;					// vyskocit z cyklu
                }
                else
                {
                    v_vysledek = Mid(a_string, v_zacatek, v_konec - v_zacatek);
                    v_zacatek = v_konec + Len(a_separ_znak);							// 343.16.
                }
            }
            return (v_vysledek);
        }
        /// <summary>
        /// Vyříznutí textu ze skládaného klíče. 
        /// </summary>
        /// <param name="a_cislo">Číslo sekce ze které se má vyřezávat</param>
        /// <param name="a_string">Text - skládaný klíč</param>
        /// <param name="a_separ_znak">Oddělovací string použitý pro oddělení jednotlivých sekcí.</param>
        /// <returns>Obsah zadané sekce skládaného klíče</returns>
        public static string CutFromKey(int a_cislo, string a_string, string a_separ_znak)
        {
            return (CutFromKey(a_cislo, a_string, a_string, a_separ_znak));
        }
        /// <summary>
        /// Vyříznutí textu ze skládaného klíče. 
        /// Jako oddělovací znak je použit znak '#'
        /// </summary>
        /// <param name="a_cislo">Číslo sekce ze které se má vyřezávat</param>
        /// <param name="a_string">Text - skládaný klíč</param>
        /// <returns>Obsah zadané sekce skládaného klíče</returns>
        public static string CutFromKey(int a_cislo, string a_string)
        {
            return (CutFromKey(a_cislo, a_string, a_string, "#"));
        }
        /// <summary>
        /// Vyříznutí textu z UNL souboru ze zadané sekce. 
        /// </summary>
        /// <param name="a_cislo">Číslo sekce ze které se má vyřezávat</param>
        /// <param name="a_string">Text - skládaný klíč</param>
        /// <returns>Obsah zadané sekce skládaného klíče - v textové podobě již bez escape sekvencí - pozor! Může být i NULL</returns>
        public static string CutFromKeyUnl(int a_cislo, string a_string )
        {
            string v_vysledek = null;
            GUnlFileUtils.ReadUnlItems(a_string, out string[] items);
            if (items.Length >= a_cislo)
                v_vysledek = items[a_cislo - 1];
            return (v_vysledek);
        }

        /// <summary>
        /// Obdoba POS funkce z PowerBuilderu. 
        /// Vrací první nalezenou pozici zadaného textu v jiném textu. Vrácená pozice je indexována ne od 0, ale podle PowerBuilder konvence od 1.
        /// Tato fuknce slouží pro přepis PowerBuilder algoritmů stylem 1:1.
        /// </summary>
        /// <param name="a_text">Text který je prohledáván.</param>
        /// <param name="a_find_text">Hledaný text.</param>
        /// <param name="a_start_index">Pozice, od které se má zahájit hledání. Indexování pozice znaků podle PB, tedy první znak má index 1.</param>
        /// <returns>Vrácená pozice prvního znaku zadaného hledaného textu.</returns>
        public static int Pos(string a_text, string a_find_text, int a_start_index)
        {
            int v_find_pos;
            v_find_pos = 0;
            a_start_index = a_start_index - 1;

            if (a_start_index >= 0 && a_start_index <= a_text.Length)
            {
                v_find_pos = a_text.IndexOf(a_find_text, a_start_index);
                v_find_pos = v_find_pos + 1;
            }
            return (v_find_pos);
        }
        /// <summary>
        /// Obdoba POS funkce z PowerBuilderu. 
        /// Vrací první nalezenou pozici zadaného textu v jiném textu. Vrácená pozice je indexována ne od 0, ale podle PowerBuilder konvence od 1.
        /// Tato fuknce slouží pro přepis PowerBuilder algoritmů stylem 1:1.
        /// Hledá se vždy od prvního znaku.
        /// </summary>
        /// <param name="a_text">Text který je prohledáván.</param>
        /// <param name="a_find_text">Hledaný text.</param>
        /// <returns>Vrácená pozice prvního znaku zadaného hledaného textu.</returns>
        public static int Pos(string a_text, string a_find_text)
        {
            return (Pos(a_text, a_find_text, 1));
        }
        /// <summary>
        /// Hledání pozice zadaného substringu v zadaném textu. Hledá se ale od zadu.
        /// Pozor! Jedná se o typ hledání podle standardu Powerbuilder - tedy první pozice znaku má index 1.
        /// </summary>
        /// <param name="a_text">Prohledávaný text</param>
        /// <param name="a_find_text">Hledaný text</param>
        /// <param name="a_start_index">Startovací pozice, od které se hledání zahajuje.</param>
        /// <returns>Index nalezeného textu</returns>
        public static int PosReverse(string a_text, string a_find_text, int a_start_index)
        {
            int v_find_pos;
            v_find_pos = 0;
            a_start_index = a_start_index - 1;
            if (a_start_index <= a_text.Length)
            {
                v_find_pos = a_text.LastIndexOf(a_find_text, a_start_index);
                v_find_pos = v_find_pos + 1;
            }
            return (v_find_pos);
        }
        /// <summary>
        /// Hledání pozice zadaného substringu v zadaném textu. Hledá se ale od zadu.
        /// Pozor! Jedná se o typ hledání podle standardu Powerbuilder - tedy první pozice znaku má index 1.
        /// </summary>
        /// <param name="a_text">Prohledávaný text</param>
        /// <param name="a_find_text">Hledaný text</param>
        /// <returns>Index nalezeného textu</returns>
        public static int PosReverse(string a_text, string a_find_text)
        {
            int v_find_pos;
            v_find_pos = PosReverse(a_text, a_find_text, a_text.Length);
            return (v_find_pos);
        }

        /// <summary>
        /// Obdoba MID funkce z PowerBuilderu. 
        /// Pozor! Pozice znaků v stringu je indexována ne od 0, ale podle PowerBuilder konvence od 1.
        /// </summary>
        /// <param name="a_text">Text ze kterého se vyřezává.</param>
        /// <param name="a_start_pos">Pozice od které se vyřezává.</param>
        /// <param name="a_len">Délka vyřezávaného textu.</param>
        /// <returns>Vyříznuty text. Pokud je délka a nebo pozice mimo možný rozsah originálního textu, potom to nevyhlásí exception jako u klasické .NET funkce ale vrátí se kratší nebo prázdný string.</returns>
        public static string Mid(string a_text, int a_start_pos, int a_len)
        {
            string v_vysledek;
            a_start_pos = a_start_pos - 1;
            if (a_start_pos >= a_text.Length)									// pokud je zacatek mimo delku retezce
                v_vysledek = "";
            else if (a_start_pos + a_len > a_text.Length)					// pokud je konec mimo delku retezce
                v_vysledek = a_text.Substring(a_start_pos);
            else
                v_vysledek = a_text.Substring(a_start_pos, a_len);
            return (v_vysledek);
        }
        /// <summary>
        /// Obdoba MID funkce z PowerBuilderu. 
        /// Pozor! Pozice znaků v stringu je indexována ne od 0, ale podle PowerBuilder konvence od 1.
        /// </summary>
        /// <param name="a_text">Text ze kterého se vyřezává.</param>
        /// <param name="a_start_pos">Pozice od které se vyřezává.</param>
        /// <returns>Vyříznuty text. Pokud je délka a nebo pozice mimo možný rozsah originálního textu, potom to nevyhlásí exception jako u klasické .NET funkce ale vrátí se kratší nebo prázdný string.</returns>
        public static string Mid(string a_text, int a_start_pos)
        {
            string v_vysledek;
            a_start_pos = a_start_pos - 1;
            v_vysledek = "";
            if (a_start_pos >= 0 && a_start_pos < a_text.Length)
                v_vysledek = a_text.Substring(a_start_pos);
            return (v_vysledek);
        }
        /// <summary>
        /// Obdoba LEN funkce z PowerBuilderu. 
        /// Pozor! Pozice znaků v stringu je indexována ne od 0, ale podle PowerBuilder konvence od 1.
        /// </summary>
        /// <param name="a_text"></param>
        /// <returns></returns>
        public static int Len(string a_text)
        {
            return (a_text.Length);
        }
        /// <summary>
        /// Vyříznutí prvních n znaků podle konvence PowerBuilder
        /// </summary>
        /// <param name="a_text">Text ze kterého se má řezat</param>
        /// <param name="a_delka">Počet znaků z leva, které se mají vrátit. Pokud je počet znaků větší jak délka celého stringu, potom to není považováno za chybu.</param>
        /// <returns>Vrácených prvních x znaků.</returns>
        public static string Left(string a_text, int a_delka)
        {
            string v_vysledek;
            if (a_delka > a_text.Length)
                v_vysledek = a_text;
            else
                v_vysledek = a_text.Substring(0, a_delka);
            return (v_vysledek);
        }
        /// <summary>
        /// Vyříznutí posledních n znaků podle konvence PowerBuilder
        /// </summary>
        /// <param name="a_text">Text ze kterého se má řezat</param>
        /// <param name="a_delka">Počet znaků z prava, které se mají vrátit. Pokud je počet znaků větší jak délka celého stringu, potom to není považováno za chybu.</param>
        /// <returns>Vrácených prvních x znaků.</returns>
        public static string Right(string a_text, int a_delka)
        {
            string v_vysledek;
            v_vysledek = Mid(a_text, Len(a_text) - a_delka + 1);
            return (v_vysledek);
        }

        /// <summary>
        /// Převede znaky uvedené v maskovacím řetězci na malá písmena.
        /// </summary>
        /// <param name="a_text">Vstupní text</param>
        /// <param name="a_maska">Maskovací řetězec obsahující mezery na místě znaků, které 
        /// se nemají převádět na malá písmena.</param>
        /// <returns>Upravený řetězec.</returns>
        public static string Lower(string a_text, string a_maska)
        {
            int v_znak_count;
            int v_znak_num;
            char[] v_znak_maska;
            char[] v_znak;
            char[] v_znakLower;
            StringBuilder builder = new StringBuilder();

            v_znak = a_text.ToCharArray();
            v_znakLower = a_text.ToLower().ToCharArray();
            v_znak_maska = a_maska.ToCharArray();
            v_znak_count = a_text.Length;
            for (v_znak_num = 0; v_znak_num < v_znak_count; v_znak_num++)		// vezmu znak po znaku
            {
                if (v_znak_maska[v_znak_num] == ' ')									// pokud je znak v masce vymaskovan a nebo se jedna o pomocny znak, se kterym ohranicuji subretezce - ty stejne Lower neovlivni a tak tam necham original
                    builder.Append(v_znak[v_znak_num]);
                else                                                                    // pokud znak neni vymaskovan - ma se tato operace s nim provest - to znamena prevest na mala pismena 
                    builder.Append(v_znakLower[v_znak_num]);
            }
            return (builder.ToString());
        }
        /// <summary>
        /// Funkce vytvoří řetězec obsahující pouze zadaný počet mezer.
        /// </summary>
        /// <param name="a_pocet_znaku">Počet požadovaného počtu mezer.</param>
        /// <returns></returns>
        public static string Space(int a_pocet_znaku)
        {
            string v_vysledek;
            v_vysledek = string.Empty;
            v_vysledek = v_vysledek.PadLeft(a_pocet_znaku, ' ');
            return (v_vysledek);
        }
        /// <summary>
        /// Funkce pro přepis textu od zadané pozice v zadané délce novým textem
        /// Pokud je pozice pro přepis mimo délku původního textu, potom se vrátí původní text.
        /// Pozor! Pozice v textu je číslována od indexu 1.
        /// </summary>
        /// <param name="a_orig_text">Text který do kterého se má vpisovat.</param>
        /// <param name="a_start_pos">Pozice od které má být v originálním textu přepisováno. 
        /// Pokud je startovací pozice mimo délku originálního textu, potom funkce vrací pouze originální text.
        /// Pozor. Pro indexování pozice v textu je platí pro znak 1 index 1.</param>
        /// <param name="a_delka">Délka textu, která má být z originálního textu nahrazena novým textem</param>
        /// <param name="a_new_text">Nový text který má být vepsán do originálního textu</param>
        /// <returns>Upravený text.</returns>
        public static string Replace(string a_orig_text, int a_start_pos, int a_delka, string a_new_text)
        {
            string v_vysledek;
            int v_end_index;
            v_vysledek = "";
            if (a_start_pos == a_orig_text.Length + 1 && a_delka == 0)		// pokud je zadana pozice za poslednim znake a delka je nula
                v_vysledek = a_orig_text + a_new_text;							// pripojim novy text na konec retezce
            else if (a_start_pos > a_orig_text.Length)							// pokud je pocatecni pozice mimo delku zadaneho originalniho retecze
                v_vysledek = a_orig_text;										// vratim originalni text bez uprav
            else
            {
                if (a_start_pos > 1)											// pokud je startovaci pozice vice nez od zacatku stringu
                    v_vysledek = a_orig_text.Substring(0, a_start_pos - 1);	// umistim na zacatek zacatek originalniho textu az po startovaci pozici
                v_vysledek = v_vysledek + a_new_text;							// pridam retezec, ktery se ma zapsat na misto stareho retezce
                v_end_index = a_start_pos + a_delka - 1;						//posunu se za prepisovany retezec a protoze index je v DOT.NET od 0, odectu jednicku
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
        /// <param name="a_mask_zdroj">Maskovací text který je použit pro vzhledávání textu pro přepisování.
        /// Délka a pozice jednotlivých znaků musí odpovídat originálnímu textu.
        /// Texty které se mají vyřadit z prohledávání a přepisování se v maskovacím řetězci nahradí mezerami.</param>
        /// <param name="a_orig_text">Řetězec který má být přepisován - nahrazován.</param>
        /// <param name="a_new_text">Nový řetězec, který má nahrazovat přepisovaný text.</param>
        /// <returns></returns>
        public static string ReplaceText(string a_zdroj, string a_mask_zdroj, string a_orig_text, string a_new_text)
        {
            int v_start;					// zacatek prepisovaneho textu
            string v_vysledek;
            v_start = 1;								// nastavim zacatek vyhledavani
            v_vysledek = a_zdroj;						// presunu zdrojovy text do pracovni prom.
            v_start = Pos(a_mask_zdroj, a_orig_text, v_start);	// hledam prvni vyskyt textu v maskovacim retezci, ktery se ma prepsat
            while (v_start != 0)									// pokud tam takovy text je
            {
                v_vysledek = Replace(v_vysledek, v_start, Len(a_orig_text), a_new_text);	// prepisu text na novou hodnotu
                a_mask_zdroj = Replace(a_mask_zdroj, v_start, Len(a_orig_text), Space(Len(a_new_text)));	// prepisu maskovaci text - misto nove hodnoty pouziji odpovidajici pocet mezer
                v_start = v_start + Len(a_new_text);					// posunu se za nove vlozeny text
                v_start = Pos(a_mask_zdroj, a_orig_text, v_start);	// hledam dalsi vyskyt textu v maskovacim retezci, ktery se ma prepsat	
            }
            return (v_vysledek);
        }
        /// <summary>
        /// Funkce pro přepis všech výskztů řetězce v textu za jiný řetězec. 
        /// Tato funkce duplikuje DOT.NET funkci a je zde umístěna pouze pro snadnější přepis PB algoritmů. 
        /// Časem by veškerá volání této funkce měla být nahrazena originál DOT.NET funkcí.
        /// </summary>
        /// <param name="a_zdroj">Originální text ve kterém se má přepisovat.</param>
        /// <param name="a_old_text">Řetězec který se má přepisovat.</param>
        /// <param name="a_new_text">Řetězec kterým se má přepisovet.</param>
        /// <returns></returns>
        public static string ReplaceText(string a_zdroj, string a_old_text, string a_new_text)
        {
            return (a_zdroj.Replace(a_old_text, a_new_text));
        }

        /// <summary>
        ///   Prevede text obsahujici lomitka nasledovana zastupnymi znaku zpet na obecny text
        ///   napr. ze znaku ENTER vytrori \n a z lomitka udela dve
        ///   prevodni tabulka 
        ///   CHAR(13)		-		\n
        ///   CHAR(10)		-		\r
        ///   \				-		\\
        ///   #				-		\x23					- odpovidajici hexa kod
        /// </summary>
        /// <param name="a_text">Text</param>
        /// <returns>Odkódovaný text</returns>
        public static string UnEscape(string a_text)
        {
            bool bylEscape = false;
            StringBuilder sb = new StringBuilder(a_text.Length);
            for (int i = 0; i < a_text.Length; i++)
            {
                char c = a_text[i];
                if (c == '\\' && !bylEscape)
                    bylEscape = true;
                else if (bylEscape)
                {
                    if (c == '\\')
                        sb.Append('\\');
                    else if (c == 'n')
                        sb.Append('\n');
                    else if (c == 'r')
                        sb.Append('\r');
                    else if (c == 'x')
                    {
                        if (i + 2 >= a_text.Length)
                            throw new ArgumentException("Chybná vstupní data pro funkci UnEscape");

                        string vs_hexa = a_text[i + 1].ToString() + a_text[i + 2].ToString();
                        int vl_hexa = HexToInt(vs_hexa);                // prevedu na odpovidajici dekadicky kod
                        if (vl_hexa != -1)                          // pokud bylo mozne prevest HEXa cislo na decimalni hodnotu
                        {
                            char vc_hexa = Convert.ToChar(vl_hexa);                   // prevedu kod na znak
                            sb.Append(vc_hexa);
                        }
                    }
                    bylEscape = false;
                }
                sb.Append(c);
            }
#if DEBUG
            if (UnEscapeOld(a_text) != sb.ToString())
                throw new Exception("Chyba funkce UnEscape");
#endif

            return (sb.ToString());
        }

        /// <summary>
        ///   Prevede text obsahujici lomitka nasledovana zastupnymi znaku zpet na obecny text
        ///   napr. ze znaku ENTER vytrori \n a z lomitka udela dve
        ///   prevodni tabulka 
        ///   CHAR(13)		-		\n
        ///   CHAR(10)		-		\r
        ///   \				-		\\
        ///   #				-		\x23					- odpovidajici hexa kod
        /// </summary>
        /// <param name="a_text">Text</param>
        /// <returns>Odkódovaný text</returns>
        private static string UnEscapeOld(string a_text)
        {
            string v_vysledek;
            int v_pozice;
            string v_znak;
            string vs_hexa;
            int vl_hexa;
            string vc_hexa;

            v_vysledek = a_text;
            v_pozice = Pos(v_vysledek, "\\", 1);	// hledam prvni vyskyt lommitka
            while (v_pozice > 0)					// pokud tam je nejake lomitko
            {
                if (v_pozice == Len(v_vysledek))	// 339.20. pokud jsem na konci stringu
                    break;
                else
                {
                    v_znak = Mid(v_vysledek, v_pozice + 1, 1);	// vyriznu jeden dalsi znak
                    switch (v_znak)
                    {
                        case "\\":
                            v_vysledek = Replace(v_vysledek, v_pozice, 2, "\\");
                            break;
                        case "n":
                            v_vysledek = Replace(v_vysledek, v_pozice, 2, "\n");
                            break;
                        case "r":
                            v_vysledek = Replace(v_vysledek, v_pozice, 2, "\r");
                            break;
                        case "x":
                            vs_hexa = Mid(v_vysledek, v_pozice + 2, 2);	// vyriznu hexakod znaku
                            vl_hexa = HexToInt(vs_hexa);				// prevedu na odpovidajici dekadicky kod
                            if (vl_hexa != -1)							// pokud bylo mozne prevest HEXa cislo na decimalni hodnotu
                            {
                                vc_hexa = Convert.ToChar(vl_hexa).ToString();					// prevedu kod na znak
                                v_vysledek = Replace(v_vysledek, v_pozice, 4, vc_hexa); // prepisi zastupne znaky za odpovidajici znak
                            }
                            break;
                    }
                    v_pozice = Pos(v_vysledek, "\\", v_pozice + 1);		// hledam dalsi vyskyt lommitka
                } // end if
            } // loop
            return (v_vysledek);
        } // end function
        /// <summary>
        /// Převod jednoho hexa znaku na odpovídající číselnou hodnotu.
        /// </summary>
        /// <param name="a_znak">Znak od 0-9 a A-F</param>
        /// <returns>DEC Číselná hodnota</returns>
        public static short Hex1ToInt(string a_znak)
        {
            short vl_hexa;
            switch (a_znak)
            {
                case "A":
                    vl_hexa = 10;
                    break;
                case "B":
                    vl_hexa = 11;
                    break;
                case "C":
                    vl_hexa = 12;
                    break;
                case "D":
                    vl_hexa = 13;
                    break;
                case "E":
                    vl_hexa = 14;
                    break;
                case "F":
                    vl_hexa = 15;
                    break;
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    vl_hexa = short.Parse(a_znak);
                    break;
                default:
                    vl_hexa = -1;			// priznak neuspechu
                    break;
            }
            return (vl_hexa);
        } // end function
        /// <summary>
        ///  Prevede string na decimalni cislo, ktere odpovida hexidacimalnimu cislu zadanemu v stringu
        /// </summary>
        /// <param name="a_hex">Text který odpovídá HEX vyjádření čísla</param>
        /// <returns>Odpovídající DEC hodnota</returns>
        public static int HexToInt(string a_hex)
        {
            string v_char1;
            string v_char2;
            string v_text;
            short v_int1;
            short v_int2;
            int v_vysledek;
            if (a_hex == null)		// pokud je vstupni retezec NULL
                v_vysledek = -1;													// vratim take NULL
            else
            {
                v_text = a_hex.ToUpper();
                v_text = v_text.Trim();
                v_char2 = Left(v_text, 1);
                v_char1 = Mid(v_text, 2, 1);
                v_int1 = Hex1ToInt(v_char1);
                v_int2 = Hex1ToInt(v_char2);
                if (v_int2 != -1 && v_int1 != -1)
                    v_vysledek = v_int2 * 16 + v_int1;
                else
                    v_vysledek = -1;
            }
            return (v_vysledek);
        } // end function

        /// <summary>
        /// Upravi obecny retezec tak, ze uvozene substringy nahradi mezerami.
        /// napr.:
        /// 		Print "fsdfsdf' fsd fs" + 'dfs' Trim( 'df"""df s' )
        /// prevede na 
        /// 		Print "               " + "   " Trim( "         " )
        ///
        /// Tento prevedeny "maskovaci" retezec lze dale pouzit na zpracovani (interpretaci) prikacu, nebot vse mezi uvozovkami 
        /// jsou substringy a pri porovnani s originalnim stringem je lze z retezce vypreparovat
        /// </summary>
        /// <param name="a_text">Text, který se má vymaskovat</param>
        /// <returns>Vymaskovaný text</returns>
        public static string SubsSubstr(string a_text)
        {
            return (SubsSubstr(a_text, ' '));
        } // end function

        /// <summary>
        /// Upravi obecny retezec tak, ze uvozene substringy nahradi mezerami.
        /// napr.:
        /// 		Print "fsdfsdf' fsd fs" + 'dfs' Trim( 'df"""df s' )
        /// prevede na 
        /// 		Print "               " + "   " Trim( "         " )
        ///
        /// Tento prevedeny "maskovaci" retezec lze dale pouzit na zpracovani (interpretaci) prikacu, nebot vse mezi uvozovkami 
        /// jsou substringy a pri porovnani s originalnim stringem je lze z retezce vypreparovat
        /// Pozor! Hraniční znak apostrof se v rámci této funkci nahrazuje za úvozovky !!
        /// </summary>
        /// <param name="a_text">Text, který se má vymaskovat</param>
        /// <param name="a_mask_znak">Maskovací znak</param>
        /// <returns>Vymaskovaný text</returns>
        public static string SubsSubstr(string a_text, char a_mask_znak)
        {
            char v_znak;
            string v_pomocna;
            char v_uvoz_znak;
            char v_predchozi_znak;
            //string v_pomocna_cil;
            int v_znaku;
            int v_i;
            StringBuilder builder = new StringBuilder();

            v_pomocna = a_text;										// prevedu na pomocny radek
            v_uvoz_znak = ' ';										// uvozujici znak
            v_predchozi_znak = ' ';									// predchozi znak
            v_znaku = Len(v_pomocna);								// zjistim delku prikazu
            for (v_i = 0; v_i < a_text.Length; v_i++)				    // vezmu znak po znaku
            {
                //v_znak = Mid(v_pomocna, v_i, 1);				    // vyriznu znak, ktery je na rade
                v_znak = a_text[v_i];
                if (v_znak == '"' || v_znak == '\'' ) 			    // pokud je znak uvozovkami nebo apostrofy
                    if (v_uvoz_znak == v_znak && v_predchozi_znak != '~')// pokud jsem uvnitr uvozeneho stringu a je uvozen stejnym znakem, jako ma byt ukoncen
                    {
                        v_uvoz_znak = ' ';								// zrusim nastaveni uvozovaciho znaku
                        builder.Append('"');			// na vystup dam aktualni znka - tedy uvozujici znak	
                    }
                    else if (v_uvoz_znak == ' ')						    // pokud nejsem uvnitr uvozeneho stringu a aktualni znak je uvozovaci
                    {
                        v_uvoz_znak = v_znak;							// nastavim uvozovaci znak podle aktualniho znaku
                        builder.Append('"');			// na vystup dam aktualni znak - tedy uvozujici znak	
                    }
                    else
                        builder.Append(a_mask_znak); 	// nahradim znak uvnitr uvozeneho stringu mezerou
                else if (v_uvoz_znak == '"' || v_uvoz_znak == '\'')	    // pokud jsem uvnitr uvozeneho stringu
                    builder.Append(a_mask_znak);		// nahradim znak uvnitr uvozeneho stringu mezerou
                else																					// pokud je to bezny radek
                    builder.Append(v_znak);				// do pomocneho radku presunu aktualni znak
                v_predchozi_znak = v_znak;								// uchovam predchozi znak
            }
            //v_pomocna_cil = ReplaceText(builder.ToString(), "'", "\"");	    // apostrofi prevedu na uvozovky
            //return (v_pomocna_cil);
            return (builder.ToString());
        } // end function


        /// <summary>
        /// Upravi obecny retezec tak, ze uvozene substringy nahradi mezerami.
        /// Pritom uvozovaci znaky substringů jsou zadany v parametrech a_prvni_znak a a_druhy_znak
        /// Tento prevedeny "maskovaci" retezec lze dale pouzit na zpracovani (interpretaci) prikacu, nebot vse mezi napr. zavorkami
        /// jsou substringy a pri porovnani s originalnim stringem je lze z retezce takto vypreparovat
        /// </summary>
        /// <param name="a_text"></param>
        /// <param name="a_prvni_znak"></param>
        /// <param name="a_druhy_znak"></param>
        /// <returns></returns>
        public static string SubsSubstr(string a_text, string a_prvni_znak, string a_druhy_znak)
        {
            string v_znak;
            string v_pomocna;
            StringBuilder v_pomocna_cil;
            int v_znaku;
            int v_i;
            int v_vnoreni;

            v_pomocna_cil = new StringBuilder();
            v_vnoreni = 0;
            v_pomocna = a_text;																	// prevedu na pomocny radek
            v_znaku = Len(v_pomocna);															// zjistim delku prikazu
            for (v_i = 1; v_i <= v_znaku; v_i++)															// vezmu znak po znaku
            {
                v_znak = Mid(v_pomocna, v_i, 1);											// vyriznu znak, ktery je na rade
                if (v_znak == a_prvni_znak)					// pokud je znak prvnim hranicnim znakem 
                {
                    if (v_vnoreni == 0)
                        v_pomocna_cil.Append(v_znak);								// na vystup dam aktualni znak - tedy zahajujici uvozujici znak	
                    else
                        v_pomocna_cil.Append(' ');		 							// misto znaku zapisi mezeru
                    v_vnoreni = v_vnoreni + 1;													// zvetsim pocitadlo vnoreni zavorek
                }
                else if (v_znak == a_druhy_znak)											// pokud je znak prvnim hranicnim znakem 
                {
                    v_vnoreni = v_vnoreni - 1;													// zmensim pocitadlo vnoreni zavorek
                    if (v_vnoreni == 0)
                        v_pomocna_cil.Append(v_znak);								// na vystup dam aktualni znak - tedy zahajujici uvozujici znak	
                    else
                        v_pomocna_cil.Append(' ');		 							// misto znaku zapisi mezeru
                }
                else if (v_vnoreni > 0)														// pokud jsem uvnitr zavorek
                {
                    v_pomocna_cil.Append(' ');		 								// misto znaku zapisi mezeru
                }
                else
                {
                    v_pomocna_cil.Append(v_znak); 								// do pomocneho radku presunu aktualni znak
                }
            }
            return (v_pomocna_cil.ToString());
        } // SubsSubstr
        #region Starý způsob
        //public static string SubsSubstr_pomala( string a_text, string a_prvni_znak, string a_druhy_znak )
        //{
        //    string				v_znak;
        //    string				v_pomocna;
        //    string				v_pomocna_cil;
        //    int					v_znaku;
        //    int					v_i;
        //    int					v_vnoreni;
        //    v_vnoreni = 0;
        //    v_pomocna = a_text;																	// prevedu na pomocny radek
        //    v_pomocna_cil = "";																	// cilovy pomocny radek
        //    v_znaku = Len( v_pomocna );															// zjistim delku prikazu
        //    for( v_i=1;  v_i <= v_znaku;	v_i++ )															// vezmu znak po znaku
        //    {
        //        v_znak = Mid( v_pomocna, v_i, 1 );											// vyriznu znak, ktery je na rade
        //        if( v_znak == a_prvni_znak )					// pokud je znak prvnim hranicnim znakem 
        //        {
        //            if( v_vnoreni == 0 )		
        //                v_pomocna_cil = v_pomocna_cil + v_znak;								// na vystup dam aktualni znak - tedy zahajujici uvozujici znak	
        //            else
        //                v_pomocna_cil = v_pomocna_cil + ' ';		 							// misto znaku zapisi mezeru
        //            v_vnoreni = v_vnoreni + 1;													// zvetsim pocitadlo vnoreni zavorek
        //        } 
        //        else if( v_znak == a_druhy_znak )											// pokud je znak prvnim hranicnim znakem 
        //        {
        //            v_vnoreni = v_vnoreni - 1;													// zmensim pocitadlo vnoreni zavorek
        //            if( v_vnoreni == 0 )		
        //                v_pomocna_cil = v_pomocna_cil + v_znak;								// na vystup dam aktualni znak - tedy zahajujici uvozujici znak	
        //            else
        //                v_pomocna_cil = v_pomocna_cil + ' ';		 							// misto znaku zapisi mezeru
        //        }
        //        else if( v_vnoreni > 0 )														// pokud jsem uvnitr zavorek
        //        {
        //            v_pomocna_cil = v_pomocna_cil + ' ';		 								// misto znaku zapisi mezeru
        //        } 
        //        else 
        //        {
        //            v_pomocna_cil = v_pomocna_cil + v_znak; 								// do pomocneho radku presunu aktualni znak
        //        }
        //    }
        //    return( v_pomocna_cil ); 
        //} // SubsSubstr_pomala
        #endregion
        /// <summary>
        /// Ořezání mezer a tabelátorů z prava
        /// </summary>
        /// <param name="a_text">Text</param>
        /// <returns>Ořezaný text</returns>
        public static string RightTrim(string a_text)
        {
            return (a_text.TrimEnd(' ', '\t'));
        }
        /// <summary>
        /// Ořezání mezer a tabelátorů z leva
        /// </summary>
        /// <param name="a_text">Text</param>
        /// <returns>Ořezaný text</returns>
        public static string LeftTrim(string a_text)
        {
            return (a_text.TrimStart(' ', '\t'));
        }
        /// <summary>
        /// Ořezání mezer a tabelátorů z obou stran
        /// </summary>
        /// <param name="a_text">Text</param>
        /// <returns>Ořezaný text</returns>
        public static string Trim(string a_text)
        {
            return (a_text.Trim(' ', '\t'));
        }
        /// <summary>
        /// Funkce slouzi pro porovnani zacatku retezce na shodu se zadanym retezcem. 
        /// Velka a mala pismena se ignoruji
        /// </summary>
        /// <param name="a_case"></param>
        /// <param name="a_text"></param>
        /// <param name="a_test_text"></param>
        /// <returns></returns>
        public static bool TestZacatek(CaseSensitiveEnum a_case, string a_text, string a_test_text)
        {
            bool v_vysledek;
            string v_zacatek;
            int v_delka;
            a_text = Trim(a_text);
            a_test_text = Trim(a_test_text);
            v_delka = Len(a_test_text);
            v_zacatek = Left(a_text, v_delka);
            if (a_case == CaseSensitiveEnum.CI)
            {
                v_zacatek = Upper(v_zacatek);
                a_test_text = Upper(a_test_text);
            }
            if (v_zacatek == a_test_text)
                v_vysledek = true;
            else
                v_vysledek = false;
            return (v_vysledek);
        }
        /// <summary>
        /// Test na shodu začátků zadaných textů.
        /// </summary>
        /// <param name="a_text">Delší text na porovnání</param>
        /// <param name="a_test_text">Kratší text na porovnání</param>
        /// <returns>Příznak shody</returns>
        public static bool TestZacatek(string a_text, string a_test_text)
        {
            return (TestZacatek(CaseSensitiveEnum.CI, a_text, a_test_text));
        }
        /// <summary>
        /// Funkce slouží pro porovnání konce řetezce na shodu se zadaným řetězcem. 
        /// </summary>
        /// <param name="a_case">Příznak zda se při porovnání má brát ohled na velikost písmen.</param>
        /// <param name="a_text">Prohledávaný text.</param>
        /// <param name="a_test_text">Hledaný text</param>
        /// <returns>Vrátí true, pokud se konec textu shoduje s hledaným řetězcem.</returns>
        public static bool TestKonec(CaseSensitiveEnum a_case, string a_text, string a_test_text)
        {
            bool v_vysledek;
            string v_zacatek;
            int v_delka;
            a_text = Trim(a_text);
            a_test_text = Trim(a_test_text);
            v_delka = Len(a_test_text);
            v_zacatek = Right(a_text, v_delka);
            if (a_case == CaseSensitiveEnum.CS)
            {
                v_zacatek = Upper(v_zacatek);
                a_test_text = Upper(a_test_text);
            }
            if (v_zacatek == a_test_text)
                v_vysledek = true;
            else
                v_vysledek = false;
            return (v_vysledek);
        }
        /// <summary>
        /// Funkce slouží pro porovnání konce řetezce na shodu se zadaným řetězcem. 
        /// Při porovnání se nebere zřetel na velikost písmen.
        /// </summary>
        /// <param name="a_text">Prohledávaný text.</param>
        /// <param name="a_test_text">Hledaný text</param>
        /// <returns>Vrátí true, pokud se konec textu shoduje s hledaným řetězcem.</returns>
        public static bool TestKonec(string a_text, string a_test_text)
        {
            return (TestKonec(CaseSensitiveEnum.CS, a_text, a_test_text));
        }
        /// <summary>
        /// Funkce přepíše speciální znaky jako CR,LF,TAB na mezery. Vícenásobné mezery jsou přepsány vždy na jednoduchou mezeru.
        /// </summary>
        /// <param name="a_text">Text který má být znormalizován.</param>
        /// <returns>Upravený text.</returns>
        public static string NormalizeText(string a_text)
        {
            //string v_text;
            //v_text = ReplaceText(a_text, "\t", " ");
            //v_text = ReplaceText(v_text, "\n", " ");
            //v_text = ReplaceText(v_text, "\r", " ");
            //while (TextExist(v_text, "  "))
            //    v_text = ReplaceText(v_text, "  ", " ");
            //v_text = Trim(v_text);
            //return (v_text);

            return (a_text.ReduceWhiteSpaces());
        }
        /// <summary>
        /// Funkce na vyříznutí textu podobná funkci CutFromTo.
        /// Rozdíl je v tom, že koncový hraniční text může být zadán výcenásobně a výsledný text bude vyříznut ke konečnému hraničnámu textu, který je nejblíže výchozímu hraničnímu textu.
        /// Jedná se o poněkud speciální funkci, která slouží především u rozboru SQL příkazů, kde je např. potřeba vyříznout část selectu a to sekci FROM a ta 
        /// může začínat pouze klíčovým slovem FROM ale končit může několika klíčovými slovy. Proto koncový hraniční string lze zadat proměnný počet vstpních argumentů.
        /// </summary>
        /// <param name="a_text">Text ze kterého se vyřezává.</param>
        /// <param name="a_from_key">Startovací hraniční string od kterého se vyřezává. Např. "FROM"</param>
        /// <param name="a_to_key">Koncové hraniční stringy, ke kterým se má vyříznout. Např. "WHERE", "ORDER", "GROUP" </param>
        /// <returns>Vyříznutý text.</returns>
        public static string GetSectionFromTo(string a_text, string a_from_key, params string[] a_to_key)
        {
            string v_vysledek;
            int v_index_param;
            string v_text_mask;
            string v_pom_text;
            string v_pom_vysledek;

            v_vysledek = "";
            a_text = a_text.ToLower();													// prevedu na mala pismena
            v_text_mask = SubsSubstr(a_text, "(", ")");								// vymaskuji text od zavorek
            v_pom_vysledek = CutFrom(a_text, v_text_mask, a_from_key.ToLower());		// vyseknu od zadaneho slova
            v_text_mask = CutFrom(v_text_mask, v_text_mask, a_from_key.ToLower());	// vyseknu od zadaneho slova
            for (v_index_param = 0; v_index_param < a_to_key.Length; v_index_param++)
            {
                v_pom_text = CutTo(v_pom_vysledek, v_text_mask, a_to_key[v_index_param].ToLower());
                if (v_pom_text.Length != 0)
                {
                    v_vysledek = v_pom_text;
                    v_pom_vysledek = v_pom_text;
                    v_text_mask = Left(v_text_mask, v_pom_text.Length);
                }
            }
            return (v_vysledek);
        } // end GetSectionFromTo
        /// <summary>
        /// Test zda string obsahuje obdobu celočíselného, případně záporného čísla.
        /// </summary>
        /// <param name="a_text"></param>
        /// <returns></returns>
        public static bool IsNumber(string a_text)
        {
            char[] v_znak;
            int v_znak_num;
            int v_znak_count;
            bool v_vysledek = false;

            v_znak = a_text.ToCharArray();
            v_znak_count = a_text.Length;
            if (v_znak_count > 0)
            {
                v_vysledek = true;
                for (v_znak_num = 0; v_znak_num < v_znak_count; v_znak_num++)		// vezmu znak po znaku
                {
                    if (v_znak_num == 0 && v_znak[v_znak_num] == '-')
                        v_vysledek = true;
                    else if (!char.IsNumber(v_znak[v_znak_num]))
                    {
                        v_vysledek = false;
                        break;
                    }
                }
            }
            return (v_vysledek);
        }
        /// <summary>
        /// Test zda string obsahuje obdobu i neceločíselného, případně i záporného čísla.
        /// </summary>
        /// <param name="a_text"></param>
        /// <returns></returns>
        public static bool IsDecimal(string a_text)
        {
            char[] v_znak;
            int v_znak_num;
            int v_znak_count;
            bool v_vysledek = true;
            v_znak = a_text.ToCharArray();
            v_znak_count = a_text.Length;
            for (v_znak_num = 0; v_znak_num < v_znak_count; v_znak_num++)		// vezmu znak po znaku
            {
                if (!(char.IsNumber(v_znak[v_znak_num]) || v_znak[v_znak_num] == '.' || v_znak[v_znak_num] == '-' || v_znak[v_znak_num] == '+'))
                    v_vysledek = false;
            }
            return (v_vysledek);
        }

        /// <summary>
        /// Ze zadaného textu, který obsahuje i znaky odřádkování, vrátí text z řádku podle zadaného čísla.
        /// První řádek má index 0.
        /// </summary>
        /// <param name="a_text"></param>
        /// <param name="a_line_number"></param>
        /// <returns></returns>
        public static string GetRowTextByLineNumber(string a_text, int a_line_number)
        {
            StringReader v_strReader;
            int v_pocet_radku = 0;
            string v_text = "";

            v_strReader = new StringReader(a_text);
            while ((v_text = v_strReader.ReadLine()) != null)
            {
                if (a_line_number == v_pocet_radku)
                    break;
                v_pocet_radku++;
            }
            return (v_text);
        }
        /// <summary>
        /// Funkce na odstranění komentáře ze zadaného textu - řádku.
        /// Počáteční znaky komentáře lze zadat, např. -- pro SQL nebo // pro PowerBuilder.
        /// </summary>
        /// <param name="a_radek">Text ze kterého má být odstraněna zakomentovaná část.</param>
        /// <param name="a_comment_begin">String, který označuje začátek komentáře.</param>
        /// <returns>Text bez zakomentované části.</returns>
        public static string VyhodKomentarRadek(string a_radek, string a_comment_begin)
        {
            string v_vysledek = "";
            bool v_je_retezec = false;
            char v_hranicni_znak = ' ';
            string v_test_oblast;
            char v_znak;
            string v_radek;
            int v_znak_num = 0;
            int v_znak_count;

            if (a_radek.StartsWith(a_comment_begin))		// pokud radek primo zacina komentarem
                v_vysledek = "";							// vratim prazdny radek
            else if (GStrFce.Trim(GStrFce.ReplaceText(a_radek, "\t", " ")).StartsWith(a_comment_begin))	// pokud na celem radku neni nic jineho nez komentar
                v_vysledek = "";							// vratim prazdny radek
            else if (GStrFce.TestExist(a_radek, a_comment_begin)) 											// pokud to neni samostatny komentar na samostatnem radku
            {
                v_znak_count = a_radek.Length;
                char[] v_znaky;
                v_znaky = a_radek.ToCharArray();
                v_radek = a_radek;
                v_vysledek = "";
                v_test_oblast = "";
                v_je_retezec = false;						// priznak, ze jsem nevstoupil do retezce
                while (v_znak_num < v_znak_count)
                {
                    v_znak = v_znaky[v_znak_num];
                    if (!v_je_retezec)					    // pokud nejsem uvnitr retezce
                    {
                        if (v_znak == '\'' || v_znak == '\"')	// pokud stojim na zacatku retezce
                        {
                            v_je_retezec = true;				// nastavim priznak, ze jsem v oblasti retezce
                            v_hranicni_znak = v_znak;			// uchovam hranicni znak
                        }
                    }
                    else if (v_je_retezec && v_znak == v_hranicni_znak)		    // pokud jsem uvnitr retezce a dosel jsem ke znaku, ktery je ukoncovacem retezce
                    {
                        v_je_retezec = false;									// nastavim priznak, ze jsem mimo oblast retezce
                        v_hranicni_znak = ' ';									// zrusim hranicni znak
                    }

                    if (GStrFce.Len(v_test_oblast) > a_comment_begin.Length + 1)						    // pokud je v testovaci oblasti jiz neco obsazeno
                        v_test_oblast = GStrFce.Mid(v_test_oblast, 2);			// odriznu od testovaci oblasti prvni znak

                    v_vysledek = v_vysledek + v_znak;							// do vysledneho radku pridam na konec dalsi zpracovany znak
                    v_test_oblast = v_test_oblast + v_znak;					    // do testovane oblasti pridam na konec dalsi znak

                    if (!v_je_retezec)										    // pokud nejsem uvnitr retezce
                        if (GStrFce.Left(v_test_oblast, 1) != a_comment_begin.Substring(0, 1))			    // pokud neni prvni znak minus
                            if (GStrFce.Mid(v_test_oblast, 2, a_comment_begin.Length) == a_comment_begin)	// pokud je to komentar
                            {
                                v_vysledek = GStrFce.Left(v_vysledek, GStrFce.Len(v_vysledek) - a_comment_begin.Length - 1);		// z vysledku odriznu konec s komentarem
                                break;
                            }
                    v_znak_num++;
                }
            }
            else
            {
                v_vysledek = a_radek;
            }
            return (v_vysledek);
        } // VyhodKomentarRadek		
        /// <summary>
        /// Vyhodí z konce řádku komentářovou část typu "-- " tedy SQL komentáře, které se podle konvence vývoje GINIS mají před distribucí SQL k zákazníkovi odstraňovat.
        /// </summary>
        /// <param name="a_radek">Vstupní řádek.</param>
        /// <returns>Výstupní řádek s odstraněným komentářem.</returns>
        public static string VyhodKomentarRadek(string a_radek)
        {
            string v_vysledek = "";
            bool v_je_retezec = false;
            string v_hranicni_znak = "";
            string v_test_oblast;
            string v_znak;
            string v_radek;

            if (GStrFce.Left(a_radek, 3) == "-- ")		// pokud radek primo zacina komentarem
                v_vysledek = "";							// vratim prazdny radek
            else if (GStrFce.Left(GStrFce.Trim(GStrFce.ReplaceText(a_radek, "\t", " ")), 3) == "-- ")	// pokud na celem radku neni nic jineho nez komentar
                v_vysledek = "";							// vratim prazdny radek
            else											// pokud to neni samostatny komentar na samostatnem radku
            {
                v_radek = a_radek;
                v_vysledek = "";
                v_test_oblast = "";
                v_je_retezec = false;						// priznak, ze jsem nevstoupil do retezce
                while (v_radek != "")
                {
                    v_znak = GStrFce.Left(v_radek, 1);		// vyriznu prvni znak
                    v_radek = GStrFce.Mid(v_radek, 2);		// radek zkratim
                    if (!v_je_retezec)					// pokud nejsem uvnitr retezce
                    {
                        if (v_znak == "'" || v_znak == "\"")	// pokud stojim na zacatku retezce
                        {
                            v_je_retezec = true;				// nastavim priznak, ze jsem v oblasti retezce
                            v_hranicni_znak = v_znak;			// uchovam hranicni znak
                        }
                    }
                    else if (v_je_retezec && v_znak == v_hranicni_znak)		// pokud jsem uvnitr retezce a dosel jsem ke znaku, ktery je ukoncovacem retezce
                    {
                        v_je_retezec = false;									// nastavim priznak, ze jsem mimo oblast retezce
                        v_hranicni_znak = "";									// zrusim hranicni znak
                    }

                    if (GStrFce.Len(v_test_oblast) > 4)						// pokud je v testovaci oblasti jiz neco obsazeno
                        v_test_oblast = GStrFce.Mid(v_test_oblast, 2);			// odriznu od testovaci oblasti prvni znak

                    v_vysledek = v_vysledek + v_znak;							// do vysledneho radku pridam na konec dalsi zpracovany znak
                    v_test_oblast = v_test_oblast + v_znak;					// do testovane oblasti pridam na konec dalsi znak

                    if (!v_je_retezec)										// pokud nejsem uvnitr retezce
                        if (GStrFce.Left(v_test_oblast, 1) != "-")			// pokud neni prvnio znak minus
                            if (GStrFce.Mid(v_test_oblast, 2, 3) == "-- ")	// pokud je to komentar
                            {
                                v_vysledek = GStrFce.Left(v_vysledek, GStrFce.Len(v_vysledek) - 4);		// z vysledku odriznu konec s komentarem
                                break;
                            }

                }
            }
            return (v_vysledek);
        } // VyhodKomentarRadek
        /// <summary>
        /// Vyhodí z textu ze všech řádků komentář typů "-- ".
        /// </summary>
        /// <param name="a_text">Text obsahující řádky SQL kódu.</param>
        /// <returns>Text obsahující řádky SQL kódu s odstraněnými komentáři typu "-- ".</returns>
        public static string VyhodKomentarRadky(string a_text)
        {
            StringReader v_strReader;
            StringWriter v_strWriter;
            string v_text;

            v_strReader = new StringReader(a_text);
            v_strWriter = new StringWriter();
            while ((v_text = v_strReader.ReadLine()) != null)
            {
                v_text = VyhodKomentarRadek(v_text);
                v_strWriter.WriteLine(v_text);
            }
            v_text = v_strWriter.ToString();
            return (v_text);
        } // VyhodKomentar
        /// <summary>
        /// Otrimování mezer a tabelátorů z leva i z prava a to u všech řádků obsažených v textu.
        /// </summary>
        /// <param name="a_text">Text s řádky, které se mají otrimovat.</param>
        /// <returns>Ořezané řádky.</returns>
        public static string TrimRadky(string a_text)
        {
            StringReader v_strReader;
            StringWriter v_strWriter;
            string v_text;

            v_strReader = new StringReader(a_text);
            v_strWriter = new StringWriter();
            while ((v_text = v_strReader.ReadLine()) != null)
            {
                v_text = GStrFce.Trim(v_text);
                v_strWriter.WriteLine(v_text);
            }
            v_text = v_strWriter.ToString();
            return (v_text);
        } // TrimRadky

        /// <summary>
        /// Převod datumu a času na string, který obsahuje formátování YYYYMMDDHHMMSS
        /// Už přesně nevím, k čemu tato funkce byla - možná něco s překladačem.
        /// </summary>
        /// <param name="a_datum">Datum a čas určený pro převod</param>
        /// <returns>Text obsahující naformátovanou hodnotu datumu a času</returns>
        public static string Date_To_String1(DateTime a_datum)
        {
            string v_vysledek;
            v_vysledek = a_datum.Year.ToString().PadLeft(4, '0');
            v_vysledek += a_datum.Month.ToString().PadLeft(2, '0');
            v_vysledek += a_datum.Day.ToString().PadLeft(2, '0');
            v_vysledek += a_datum.Hour.ToString().PadLeft(2, '0');
            v_vysledek += a_datum.Minute.ToString().PadLeft(2, '0');
            v_vysledek += a_datum.Second.ToString().PadLeft(2, '0');

            return (v_vysledek);
        }
        /// <summary>
        /// Převod bool hodnoty na odpovídající hodnotu ve stringu
        /// </summary>
        /// <param name="a_value">Hodnota pro převod</param>
        /// <returns>Převedená hodnota</returns>
        public static string BoolToString(bool a_value)
        {
            string v_vysledek;
            if (a_value)
                v_vysledek = "true";
            else
                v_vysledek = "false";
            return (v_vysledek);
        }
        /// <summary>
        /// Převod textové hodnoty na odpovídající bool hodnotu
        /// Pokud se nejedná o jednu ze známých hodnota pro ANO, potom se vždy vrátí false.
        /// </summary>
        /// <param name="a_value">Text který se má převést</param>
        /// <returns>Odpovídající bool hodnota</returns>
        public static bool StringToBool(string a_value)
        {
            bool v_vysledek;
            a_value = a_value.ToLower().Trim();
            if (a_value == "true" || a_value == "1" || a_value == "ano" || a_value == "yes" || a_value == "a" || a_value == "t" || a_value == "y")
                v_vysledek = true;
            else
                v_vysledek = false;
            return (v_vysledek);
        }
        /// <summary>
        /// Pomocná funkce pro výpočet mezer při převodu tabelátorů na mezery.
        /// </summary>
        /// <param name="a_in"></param>
        /// <param name="a_tab_size"></param>
        /// <returns></returns>
        private static int DorovnaniLong(int a_in, int a_tab_size)
        {
            int v_row_num;
            int v_vysledek;
            v_row_num = a_in;
            while (v_row_num > 0)
                v_row_num = v_row_num - a_tab_size;
            v_vysledek = a_in - v_row_num;
            return (v_vysledek);
        }
        /// <summary>
        /// Funkce převede tabelátory v textu na mezery tak, aby i po převodu opticky texty souhlasily. 
        /// Pro převod je nutné zadat, jak bylo v původním editoru nastaveno odsazení jednoho tabelátoru ( počet mezer na jeden tabelátor )
        /// </summary>
        /// <param name="a_text">Původní text, který může obsahovat tabelátory.</param>
        /// <param name="a_tab_size">Původní velikost tabelátoru.</param>
        /// <returns>Text s nahrazenými tabelátory mezerami.</returns>
        public static string TabToSpace(string a_text, int a_tab_size)
        {
            int v_row_len;
            string v_vysledek;
            string v_znak;
            int v_delka;
            bool v_nahrazovat;
            string v_hranicni_znak;

            a_text += "\r";
            v_nahrazovat = true;
            v_hranicni_znak = "";
            v_vysledek = "";
            v_row_len = a_text.Length;
            v_delka = 0;

            for (int v_i = 1; v_i < v_row_len; v_i++)
            {
                v_znak = Mid(a_text, v_i, 1);						// vyriznu znak
                if (v_znak == "\t" && v_nahrazovat)				// pokud je znak tabelatorem
                {
                    v_vysledek = v_vysledek + "".PadLeft(DorovnaniLong(v_delka + 1, a_tab_size) - v_delka, ' ');
                    v_delka = DorovnaniLong(v_delka + 1, a_tab_size);
                }
                else
                    if (v_znak == "\r" || v_znak == "\n")       // pokud je znak koncem radku
                {
                    v_vysledek = v_vysledek + v_znak;
                    //v_radek = ''
                    v_nahrazovat = true;
                    v_delka = 0;
                }
                else
                {                                                // pokud se nedorovnavalo a neni to konec radku
                    v_vysledek = v_vysledek + v_znak;
                    //v_radek = v_radek + v_znak
                    if (v_znak == "\t")
                        v_delka = DorovnaniLong(v_delka + 1, a_tab_size);
                    else
                        v_delka = v_delka + 1;
                }
                if ((v_znak == "\"" || v_znak == "'") && v_hranicni_znak == "")  		// pokud vstupuji do substringu
                {
                    v_nahrazovat = false;																// ted se tabelatory nesmi nahrazovat
                    v_hranicni_znak = v_znak;														// uchovam si znak, kterym substring zacinal
                }
                else if (v_hranicni_znak != "")					// pokud jsem na konci substringu
                {
                    v_nahrazovat = true;																// ted se tabelatory smi nahrazovat
                    v_hranicni_znak = "";																// uchovam si znak, kterym substring zacinal
                }
                //v_delka = Len( v_radek )
            }
            return (v_vysledek);
        }

        /// <summary>
        /// Odstraní z textu mezery a nahradí je tabelátory ( přitom vynechá texty uvedené v substringu ( označený apostrofy nebo úvozovkami )
        /// </summary>
        /// <param name="a_text">Vstupní text, který obsahuje mezery.</param>
        /// <param name="a_tab_size">Velikost tebelátoru urcena poctem znaku</param>
        /// <returns>Vystupni text, u ktereho jsou mezery nahrazeny tabelatorem. Pokud to nevychazi na cely tabelator, potom se vysledny text zkracuje tak, aby to na cely tabelator vyslo.</returns>
        public static string SpaceToTab(string a_text, int a_tab_size)
        {
            string v_vysledek;
            string v_maska;
            string v_mezery_tabelatoru;
            v_mezery_tabelatoru = "".PadLeft(a_tab_size);                      // ziskam mezery, ktere odpovidaji jednomu tabelatoru
            v_maska = SubsSubstr(a_text, '_');

            v_vysledek = GStrFce.ReplaceText(a_text, v_maska, v_mezery_tabelatoru, "\t");

            v_maska = SubsSubstr(v_vysledek, '_');
            v_vysledek = GStrFce.ReplaceText(a_text, v_maska, "\t ", "\t");

            v_maska = SubsSubstr(v_vysledek, '_');
            v_vysledek = GStrFce.ReplaceText(a_text, v_maska, " \t", "\t");

            return (v_vysledek);
        }

        /// <summary>
        /// Doplní text napravo tabelátory tak, aby konce zařezávaly na zadanou požadovanou velikost
        /// </summary>
        /// <param name="a_text"></param>
        /// <param name="a_target_tab_size"></param>
        /// <param name="a_tab_size"></param>
        /// <returns></returns>
        public static string TabRight(string a_text, int a_target_tab_size, int a_tab_size)
        {
            string v_vysledek;
            int v_pomocna;
            v_pomocna = (a_target_tab_size + 1 - a_text.Length) / a_tab_size;
            v_vysledek = a_text + "".PadRight(v_pomocna, '\t');

            return v_vysledek;
        }
        /// <summary>
        /// Vyhozeni prazdnych radku z textu.
        /// </summary>
        /// <param name="a_text">Text s řádky, které se mají redukovat - odstranit prazdne radky.</param>
        /// <returns>Redukovane radky.</returns>
        public static string VyhodPrazdneRadky(string a_text)
        {
            StringReader v_strReader;
            StringWriter v_strWriter;
            string v_text;

            v_strReader = new StringReader(a_text);
            v_strWriter = new StringWriter();
            while ((v_text = v_strReader.ReadLine()) != null)
            {
                v_text = GStrFce.Trim(v_text);
                if (v_text != "")
                    v_strWriter.WriteLine(v_text);
            }
            v_text = v_strWriter.ToString();
            return (v_text);
        } // TrimRadky

        /// <summary>
        /// Text se rozřeže na slova a ta se doplní zleva zadaným počtem nul - to vytvoří sloučený text, který lze použít pro správné třídění plně určených spisových znaků
        /// Slouží pro naplěníní sloupce https://robot.gordic.cz/ginisdoc/db/sslsspz/cs2_spis_znak
        /// https://phabricator.gordic.cz/T25704
        /// </summary>
        /// <param name="a_text">Plně určená spisový znak</param>
        /// <param name="a_presnost">počet znaků na jednotlivé sekce - standardně se používá 10</param>
        /// <returns>Text, kde jednotlivé sekce jsou doplněný na zadaný počet znaků znakem '0' a oddělovače jsou odstraněny- takto </returns>
        public static string MakeCs2(string a_text, int a_presnost)
        {
            //-----------------------------------------------------------------------------------------------------------
            // PowerBuilder: String Gin.Str_Fce.Make_Cs2( String a_text, Long a_presnost )
            //
            // 
            //
            // Funkce pro pouziti v DW, umoznuje tridit textove sloupce alespon priblizne podle standardu UVIS
            // Pokusna funkce pro zajisteni trideni podle standardu UVIS
            // 343.13.     
            //-----------------------------------------------------------------------------------------------------------
            string[] slova = a_text.Split(new char[] { '.', ',', '\t', '-', '/', '\\' });
            StringBuilder vysledek = new StringBuilder();
            foreach( string slovo in slova )
                vysledek.Append(slovo.PadLeft(a_presnost, '0'));
            return(vysledek.ToString());    
        }

        /// <summary>
        /// Funkce pro naformátování hodnoty pro sloupce https://robot.gordic.cz/ginisdoc/db/sslsspz/spis_znak_norm
        /// Jednotlivé sekce jsou nově odděleny jednotným separačním spisovým znakem. Potom bez ohledu na použitý oddělovací znak bude možné porovnávat různé spisové znaky, zda jsou hodnotově duplicitní - textově díky různým oddělovacím znakům budou přitom různé
        /// </summary>
        /// <param name="a_spis_znak">Plně určený spisový znak</param>
        /// <param name="a_odelovace">Oddělovače jednotlivých úrovní. Pokud je zadáno prázdno, potom se použijí standardní oddělovače</param>
        /// <returns>Normalizovaná hodnota plně určeného spisového znaku</returns>
        public static string MakeSpisZnakNorm(string a_spis_znak, string a_odelovace)
        {
            if (a_spis_znak == null)
                throw new GArgumentNullException(21300083, "a_spis_znak");
            if(a_odelovace == null)
                throw new GArgumentNullException(21300084, "a_odelovace");
            char[] v_oddelovace;
            if ( a_odelovace.Length == 0 )
                v_oddelovace = new char[] { '.', ',', '\t', '-', '/', '\\' };
            else
                v_oddelovace = a_odelovace.ToCharArray();
            string[] slova = a_spis_znak.Split(v_oddelovace);
            StringBuilder vysledek = new StringBuilder();
            foreach (string slovo in slova)
                vysledek.Append(slovo).Append('#');
            string vysl = vysledek.ToString();
            vysl = vysl.TrimEnd('#') + "#";     // takto odstraním z konce prázdné sekce a ukočním to separačním znakem
            return (vysl);
        }


    }

}
