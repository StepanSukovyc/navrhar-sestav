//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Adt04.WinClient.GRevize.cs                           </Name>
//    <Description> Třída rozebírající revize string na jednotlivé části        </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2018-12-07                                                  </Created>
//  </FileHeader>


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Třída rozebírající revize string na jednotlivé části
    /// </summary>
    public class GRevize
    {
        /// <summary>
        /// Text revize
        /// </summary>
        private string _revize = null;


        /// <summary>
        /// Konstruktor pro jedinou možnost inicializace informací o revizi
        /// </summary>
        /// <param name="a_revize"></param>
        public GRevize(string a_revize)
        {
            a_revize = a_revize.Trim();
            if (!IsValidRevize(a_revize, out string message))
                throw new GDataInvalidException(21300065, 21300048, a_revize, message); //RC-EX 21300048 : Chybná revize modulu GINIS: {0} - {1}
            _revize = a_revize;
        }

        #region Statické funkce

        /// <summary>
        /// 
        /// </summary>
        /// <param name="revize"></param>
        /// <param name="vysledek"></param>
        /// <param name="vysledek_txt"></param>
        /// <returns></returns>
        public static bool TryGetRevize(string revize, out GRevize vysledek, out string vysledek_txt)
        {
            if(String.IsNullOrWhiteSpace(revize))
            {
                vysledek = null;
                vysledek_txt = "Textové označení revize je prázdné.";
                return false;
            }

            revize = revize.Trim();
            if ( IsValidRevize( revize, out vysledek_txt))
            {
                vysledek = new GRevize(revize);
                vysledek_txt = "OK";
                return true;
            }
            else
            {
                vysledek = null;
                return false;
            }
        }

        /// <summary>
        /// Otestuje, zda zadaný řetězec může být revizí modulu GINIS
        /// Tato funkce nekontroluje povolený výčet fází ani verze.
        /// Pouze formálně překontroluje formát řetězce, zda odpovídá pravidlům pro pro tvorbu revizí GINIS
        /// </summary>
        /// <param name="revize"></param>
        /// <param name="vysledek_txt"></param>
        /// <returns></returns>
        public static bool IsValidRevize(string revize, out string vysledek_txt)
        {
            bool is_user_rev = false;

            revize = revize.Trim();

            //if (revize.Contains("GINGFE01") || revize.Contains("GINADS01"))
            //{
            //    vysledek_txt = "OK";
            //    return (true);
            //}

            if (revize.Length > 19 && revize.Substring(15, 4) == "_USR")
            {
                is_user_rev = true;
                // zatím OK - jedná se o revize generované v DB při zatržítku Vynutit reinstalace - nikde jinde než v DB by se ale taková revize neměla objevovat.
            }
            else if (revize.Length != 15 && revize.Length != 24)
            {
                vysledek_txt = "Chybná délka revize";
                return (false);
            }

            string v_zacatek2 = revize.Left(2);
            var v_list2 = new List<string> 
            { 
                "10", "20", "21",
                "32", "36",
                "40", "41", "42", "43",
                "50", "51", "52", "53", "54", "55", "56", "57","58","59", //vblabla: doplněn výčet povolených revizí o datové sklady (56, 57, 58 a 59)
                "AX",
                "80", "81", "82", "83", //ref T37746
            };            
            if ( !v_list2.Contains(v_zacatek2))
            {
                vysledek_txt = "Chybné první dva znaky. Povolené jsou pouze: " + String.Join( ",", v_list2 );
                return (false);
            }

            if (revize.Substring(2, 3) != "WD2" && revize.Substring(2, 3) != "WD1")        // výjimka na divnou fázi //08.09.2021 vblabla: Přidána vyjímka na programovou fázi GWSWD101, ref T14326
            {
                char[] v_text_2_3 = revize.Substring(2, 3).ToCharArray();
                foreach (var znak in v_text_2_3)
                {
                    if (znak < 'A' || znak > 'Z')
                    {
                        vysledek_txt = "Chybné znaky na pozici 2 až 5. Povolené jsou pouze A-Z";
                        return (false);
                    }
                }
            }

            char v_typ_modulu = revize[5];
            var v_list5 = new List<char> { '0', '1', 'D', 'H', 'S', 'R', 'T' }; //vblabla: Doplnění výčtu povolených znaků revize o balíky automatizovaných testů, ref T35512
            if (!v_list5.Contains(v_typ_modulu))
            {
                vysledek_txt = "Chybný typ modulu. Na pozici 5 jsou povoleny pouze znaky: " + String.Join(",", v_list5);
                return (false);
            }

            char[] v_text_6_6 = revize.Substring(6, 6).ToCharArray();
            foreach (var znak in v_text_6_6)
            {
                if (znak < '0' || znak > '9')
                {
                    vysledek_txt = "Chybné znaky na pozici 6 až 11. Povolené jsou pouze 0-9";
                    return (false);
                }
            }

            char znak12 = revize[12];
            if (znak12 < 'A' || znak12 > 'Z')
            {
                vysledek_txt = "Chybný znak na pozici 12. Povolené jsou pouze A-Z";
                return (false);
            }

            char[] v_text_13_2 = revize.Substring(13, 2).ToCharArray();
            foreach (var znak in v_text_13_2)
            {
                if (znak < '0' || znak > '9')
                {
                    vysledek_txt = "Chybné znaky na pozici 13 až 14. Povolené jsou pouze 0-9";
                    return (false);
                }
            }

            //if (!is_user_rev && znak12 == 'L' && revize.Length != 24 )
            //{
            //    vysledek_txt = "Chybná délka revize pro L-licenčního balíku.";
            //    return (false);
            //}


            if (!is_user_rev &&  revize.Length == 24)
            {
                if (znak12 != 'L')
                {
                    vysledek_txt = "Je zadána dlouhá revize a přitom není označena příznakem L-licenčního balíku.";
                    return (false);
                }

                if (revize[15] != '_')
                {
                    vysledek_txt = "Pro L-licenčního balíku musí být znak 15 pouze '_'. ";
                    return (false);
                }

                char[] v_text_16_8 = revize.Substring(16, 8).ToCharArray();
                foreach (var znak in v_text_16_8)
                {
                    if ( !((znak >= '0' && znak <= '9') || (znak >= 'A' && znak <= 'Z')) )
                    {
                        vysledek_txt = "Chybné znaky na pozici 16 až 23. Povolené jsou pouze 0-9 nebo A-Z";
                        return (false);
                    }
                }

            }

            vysledek_txt = "OK";
            return (true);
        }

        /// <summary>
        /// Pro zadanou revizi vrátí odpovídající fázi, ale se zachováním předposledního písmene pro sestavy a dokumentaci
        /// </summary>
        /// <param name="a_revize">Revize ze které se má zjistit fáze.</param>
        /// <returns>Fáze odpovídající revizi.</returns>
        public static string GetFaze2FromRevize(string a_revize)
        {
            // https://robot3.gordic.cz/doc/GINADM01/index.html?typy_aplikaci_systemu_ginis.htm

            string v_zacatek2;
            string v_zacatek3;
            string v_konec5;
            string v_vysledek = "";

            if (a_revize.Length >= 8)
            {
                a_revize = a_revize.Trim().ToUpper();
                v_zacatek2 = a_revize.Substring(0, 2);
                v_konec5 = a_revize.Substring(2, 5);

                if (v_zacatek2 == "10")
                    v_zacatek3 = "GNE";
                else if (v_zacatek2 == "20")
                    v_zacatek3 = "GMS";
                else if (v_zacatek2 == "21")
                    v_zacatek3 = "GIP";
                else if (v_zacatek2 == "32")
                    v_zacatek3 = "GIN";
                else if (v_zacatek2 == "40")
                    v_zacatek3 = "GSA";
                else if (v_zacatek2 == "41")
                    v_zacatek3 = "GWA";
                else if (v_zacatek2 == "42")
                    v_zacatek3 = "GWS";
                else if (v_zacatek2 == "43")
                    v_zacatek3 = "GSS";
                else if (v_zacatek2 == "80")
                    v_zacatek3 = "CSA";
                else if (v_zacatek2 == "81")
                    v_zacatek3 = "CWA";
                else if (v_zacatek2 == "82")
                    v_zacatek3 = "CWS";
                else if (v_zacatek2 == "83")
                    v_zacatek3 = "CSS";
                else if (v_zacatek2 == "36")
                    v_zacatek3 = "MSM";
                else if (v_zacatek2 == "50")
                    v_zacatek3 = "DWH";
                else if (v_zacatek2 == "51")
                    v_zacatek3 = "DWH";
                else if (v_zacatek2 == "52")
                    v_zacatek3 = "DWH";
                else if (v_zacatek2 == "53")
                    v_zacatek3 = "DWH";
                else if (v_zacatek2 == "54") //vblabla: doplneny revize s prefixem 54, 56, 57, 58, 59 (datove sklady)
                    v_zacatek3 = "DWH";
                else if (v_zacatek2 == "56")
                    v_zacatek3 = "DWH";
                else if (v_zacatek2 == "57") 
                    v_zacatek3 = "DWH";
                else if (v_zacatek2 == "58")
                    v_zacatek3 = "DWH";
                else if (v_zacatek2 == "59")
                    v_zacatek3 = "DWH";
                else
                    v_zacatek3 = "GIN";

                v_vysledek = v_zacatek3 + v_konec5;
            }

            return (v_vysledek);
        }

        /// <summary>
        /// Pro zadanou fázi vráti jméno EXE souboru. S příponou a bez cesty. 
        /// </summary>
        /// <param name="a_faze"></param>
        /// <returns></returns>
        public static string GetExeNameForFaze(string a_faze)
        {
            string v_zacatek3;
            string v_konec4;
            string v_vysledek;

            a_faze = a_faze.Trim().ToUpper();
            v_zacatek3 = GStrFce.Left(a_faze, 3);
            v_konec4 = GStrFce.Mid(a_faze, 4);

            if (v_zacatek3 == "GIN")											// pokud se jedna o stary typ modulu
                v_vysledek = "G32" + v_konec4 + ".EXE";
            else
                v_vysledek = a_faze + ".EXE";

            return (v_vysledek);
        }

        /// <summary>
        /// Vrátí fázi, která odpovídá exe souboru - nemusí být ale zajištěno, že taková fáze v rámci GINISu existuje
        /// Jedná se pouze o textové vyskládání exe podle pravidel pojmenování EXE souborů systému GINIS
        /// Pokud nejsou splněna základní pravidla pro pojmenování GINIS exe souborů a nelze tedy odvodit fázi, potom se vrací prázdný string
        /// </summary>
        /// <param name="a_exe_name">holé jméno exe souboru, včetně přípony očekává se formát GSAaaann.exe nebo GSSaaann.exe nebo G32aaann.exe</param>
        /// <returns>Odpovídající fáze (nemusí ale v rámci GINIS existovat) - jedná se pouze o textový výsledek přeformátování jména exe</returns>
        public static string GetFazeForExeName(string a_exe_name)
        {
            string			v_vysledek;

            v_vysledek = "";
            a_exe_name = a_exe_name.ToUpper().Trim();
            if (a_exe_name.EndsWith(".EXE") && (a_exe_name.Length == 12 || a_exe_name.Length == 16) && GStrFce.IsNumber(a_exe_name.Substring(6, 2)))
            {
                if (a_exe_name.StartsWith("G32"))
                    v_vysledek = "GIN" + a_exe_name.Substring(3, 5);
                else if (a_exe_name.StartsWith("GSA") || a_exe_name.StartsWith("GSS") || a_exe_name.StartsWith("GIN")
                    || a_exe_name.StartsWith("CSA") || a_exe_name.StartsWith("CSS")
                    || a_exe_name.StartsWith("CWA") || a_exe_name.StartsWith("CWS")
                    )
                    v_vysledek = a_exe_name.Substring(0, 8);
            }
            return (v_vysledek);
        }
        #endregion

        /// <summary>
        /// Vrátí textovou podobu verze doplněnou na plnou délku jednotlivých částí: např. 482.23.01
        /// </summary>
        public string VerzeTxt
        {
            get
            {
                return String.Format("{0}.{1}.{2}", Verze.ToString().PadLeft(3, '0'), SubVerze.ToString().PadLeft(2,'0'), SubVerzeRev.ToString().PadLeft(2, '0'));
            }
        }
        
        /// <summary>
        /// Vrátí textovou podobu verze včetně písmene zákazníka - doplněnou na plnou délku jednotlivých částí: např. 482.23.X01
        /// </summary>
        public string VerzeTxtFull
        {
            get
            {
                return String.Format("{0}.{1}.{2}{3}", Verze.ToString().PadLeft(3, '0'), SubVerze.ToString().PadLeft(2, '0'), Zakaznik, SubVerzeRev.ToString().PadLeft(2, '0'));
            }
        }
 
        /// <summary>
        /// Vrátí textovou podobu verze: např. 482.23.1
        /// </summary>
        public string VerzeTxtShort
        {
            get
            {
                return String.Format("{0}.{1}.{2}", Verze.ToString(), SubVerze.ToString(), SubVerzeRev.ToString());
            }
        }

        /// <summary>
        /// Revize instalovaného balíčku 
        /// </summary>
        public string Revize
        {
            get
            {
                return _revize;
            }
        }

        /// <summary>
        /// Fáze odvozená od revize
        /// </summary>
        public string Faze
        {
            get
            {
                return (GetFaze2FromRevize(_revize));
            }
        }
        /// <summary>
        /// Nadřízená fáze k této fázi ( např. pro sestavy, dokumentaci atd.. se jedná o hlavní fázi )
        /// </summary>
        public string NadFaze
        {
            get { return (Faze.Substring(0, 6) + "0" + Faze.Substring(7, 1)); }
        }
        /// <summary>
        /// Číslo odpovídající prvním dvěma znakům plné revize
        /// </summary>
        public GVarFazeEnum VarFaze
        {
            get
            {
                string v_zacatek2;
                v_zacatek2 = _revize.Substring(0, 2);
                if (int.TryParse(v_zacatek2, out int v_vysledek))
                    return ((GVarFazeEnum)v_vysledek);
                else
                    return (0);
            }
        }
        /// <summary>
        /// Přípona distribučního balíku. Pro web platformu je to zatím MSI
        /// </summary>
        public string FileExtension
        {
            get
            {
                switch (this.VarFaze)
                {
                    case GVarFazeEnum.GWA:
                    case GVarFazeEnum.GWS:
                    case GVarFazeEnum.GSS:
                        if( this.TypModulu == GTypModuluEnum.EXE)
                            return ".MSI";
                        else
                            return ".ZIP";
                    default:
                        return ".ZIP";
                }
            }
        }
        /// <summary>
        /// Jméno distribučního balíku
        /// </summary>
        public string FileName
        {
            get
            {
                return this.Revize + this.FileExtension;
            }
        }

        /// <summary>
        /// Příznak, že hlavní verze balíčku je v souladu s var faze ( tedy začátkem označení balíčku )
        /// </summary>
        public bool VerzeIsForVarFazeCorrect
        {
            get
            {
                int v_var_faze = (int)this.VarFaze;
                if( Verze >= 523 && Verze < 599 )    // novinka pro GINIS od podzimu 2023 
                    return true;
                if (v_var_faze >= 40 && v_var_faze <= 43 && Verze > 400 && Verze < 500 )
                    return true;
                else if (Verze > 300 && Verze <= 390 )
                    return true;
                else
                    return false;
            }
        }
        /// <summary>
        /// Pokud lze zjistit, potom vrátí hlavni verzi tohoto instalovaného balíčku.
        /// Pokud zjistit nelze, vrátí hodnotu NULL.
        /// </summary>
        public int? Verze
        {
            get
            {
                int? v_verze = null;
                int vl_verze;
                string vs_verze;

                if (_revize != null && _revize.Length > 10)                 // pokud revize vypada alespon trochu duveryhodne
                {
                    vs_verze = _revize.Substring(7, 3);
                    if (int.TryParse(vs_verze, out vl_verze))
                        v_verze = vl_verze;
                }
                return v_verze;
            }
        }

        /// <summary>
        /// Verze databáze, ke které tato revize distribučního balíku přísluší
        /// </summary>
        public int? VerzeDb
        {
            get
            {
                int? v_verze_db = this.Verze;
                if (v_verze_db > 400 && v_verze_db < 500 )  // pro verzi GINISu 524 a výše bude verze DB stejná jako verze aplikací - tedy 524+
                    v_verze_db = v_verze_db - 100;
                return v_verze_db;
            }
        }

        /// <summary>
        /// Pokud lze z revizního řetězce zjistit subverzi, potom ji vrátí, jinak vrátí null.
        /// </summary>
        public int? SubVerze
        {
            get
            {
                int? v_sub_verze = null;
                int vl_sub_verze;
                string vs_sub_verze;

                if (_revize != null && _revize.Length > 12)                 // pokud revize vypadá alespoň trochu důvěryhodně
                {
                    vs_sub_verze = _revize.Substring(10, 2);
                    if (int.TryParse(vs_sub_verze, out vl_sub_verze))
                        v_sub_verze = vl_sub_verze;
                }
                return v_sub_verze;
            }
        }
        /// <summary>
        /// Pokud lze z revizního řetězce zjistit číselnou revizi za písmenem zákazníka, potom ji vrátí, jinak vrátí null.
        /// </summary>
        public int? SubVerzeRev
        {
            get
            {
                int? v_sub_verze_rev = null;
                int vl_sub_verze_rev;
                string vs_sub_verze_rev;

                if (_revize != null && _revize.Length >= 15)                 // pokud revize vypadá alespoň trochu důvěryhodně
                {
                    vs_sub_verze_rev = _revize.Substring(13, 2);
                    if (int.TryParse(vs_sub_verze_rev, out vl_sub_verze_rev))
                        v_sub_verze_rev = vl_sub_verze_rev;
                }
                return v_sub_verze_rev;
            }
        }
        /// <summary>
        /// Pro L sestavy vrátí licenci tvůrce sestavy, jinak vrací prázdný string
        /// </summary>
        public string LicenceOd
        {
            get
            {
                string vs_LicenceOd = "";
                if (_revize != null && _revize.Length >= 19)
                {
                    vs_LicenceOd = _revize.Substring(16, 4);
                }
                return (vs_LicenceOd);
            }
        }
        /// <summary>
        /// Pro L sestavy vrátí licenci, pro koho je určeno, jinak vrací prázdný string
        /// </summary>
        public string LicencePro
        {
            get
            {
                string vs_LicencePro = "";
                if( Zakaznik == 'L')
                    if (_revize != null && _revize.Length >= 23)
                        vs_LicencePro = _revize.Substring(20, 4);
                
                return (vs_LicencePro);
            }
        }

        /// <summary>
        /// Kumulativní číslo plné verze balíčku - včetně čísla za písmenem zákazníka
        /// Výsledek je např. pro verzi GINIS 390.12.X05 číslo 3901205
        /// </summary>
        public int? CVerze
        {
            get
            {
                if (Verze == null || SubVerze == null || Revize == null)
                    return (null);
                else
                    return (Verze * 10000 + SubVerze * 100 + SubVerzeRev);
            }
        }
        /// <summary>
        /// Kumulativní číslo verze a subverze balíčku - bez čísla za písmenem zákazníka
        /// Výsledek je např. pro verzi GINIS 390.12.X05 číslo 3901200
        /// </summary>
        public int? CVerzeShort
        {
            get
            {
                if (Verze == null || SubVerze == null)
                    return (null);
                else
                    return (Verze * 10000 + SubVerze * 100);
            }
        }
        /// <summary>
        /// Pokud lze z revizního řetězce zjistit písmeno zákazníka - jinak vrátí null
        /// </summary>
        public char Zakaznik
        {
            get
            {
                char vs_zakaznik = ' ';
                if (_revize != null && _revize.Length >= 13)                 // pokud revize vypadá alespoň trochu důvěryhodně
                {
                    vs_zakaznik = _revize[12];
                }
                return vs_zakaznik;
            }
        }


        /// <summary>
        /// Typ instalačního modulu. S, R, D, H, N - jako number
        /// </summary>
        public string TypRevize
        {
            get
            {
                string v_typ_modulu = Faze.Substring(6, 1);
                if (int.TryParse(v_typ_modulu, out int cislo))
                    v_typ_modulu = "N";
                return v_typ_modulu;
            }
        }

        /// <summary>
        /// Typ distribučního balíčku
        /// </summary>
        public GTypModuluEnum TypModulu
        {
            get
            {
                switch(TypRevize)
                {
                    case "S":
                        return GTypModuluEnum.SES;
                    case "R":
                        return GTypModuluEnum.REP;
                    case "D":
                        return GTypModuluEnum.DOC;
                    case "H":
                        return GTypModuluEnum.HLP;
                    case "N":
                        List<string> v_com = new List<string>() { "GINGIN01", "GININS01", "GINDNP01", "GINGRR01", "GINTTF01", "GINORA01", "GINMSS01" };
                        if(v_com.Contains(Faze))
                            return GTypModuluEnum.COM;
                        else if( Faze.StartsWith("DEP"))
                            return GTypModuluEnum.COM;
                        else
                            return GTypModuluEnum.EXE;
                    default:
                        return GTypModuluEnum.NO;
                }
            }
        }

        /// <summary>
        /// Vrátí jméno exe souboru, který odpovídá fázi této revize - jedná se pouze o textově vyskládaný tvar fáze do file.exe name
        /// Pozor! Takový EXE nemusí reálně existovat. Jedná se pouze o pomocnou funkci - práce se string-em
        /// </summary>
        public string ExeFileName
        {
            get { return (GetExeNameForFaze(Faze)); }
        }

        /// <summary>
        /// Zkratka fáze - tři znaky, např. ADM
        /// </summary>
        public string Zkratka3
        {
            get { return (Faze.Substring(3,3)); }
        }
        /// <summary>
        /// Zkratka fáze - pět znaků, např. ADM01
        /// </summary>
        public string Zkratka5
        {
            get { return (Faze.Substring(3, 5)); }
        }

        /// <summary>
        /// Distribuční podadresář v rámci našich distribučních serverů, kde se revize má nacházet
        /// Pokud je to standardní revize, potom je podadresář prázdný string - tedy root adresář distribuce pro danou verzi a exe
        /// Další možností jsou SERVIS a TESTY
        /// </summary>
        public string DistribucniPodAdresar
        {
            get
            {
                string v_path = "";
                if (Zakaznik == 'S' && !Faze.In("GINORA01", "GINMSS01", "GINTTF01", "GININS03", "GINAKT01"))
                    v_path = "SERVIS";
                else if (Zakaznik == 'T')
                    v_path = "TESTY";
                return (v_path);
            }
        }
    }
}
