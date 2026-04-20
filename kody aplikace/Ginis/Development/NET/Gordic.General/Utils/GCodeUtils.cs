//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GCodeUtils.cs                                </Name>
//    <Description> Pomocná třída pro manipulace se zdrojovým kódem             </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2021-01-15                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Text;

namespace Gordic.General
{
    /// <summary>
    /// Pomocná třída pro manipulace se zdrojovým kódem
    /// </summary>
    public static class GCodeUtils
    {
        /// <summary>
        /// Typ odstraňovaných komentářů
        /// </summary>
        [Flags]
        public enum RemoveSqlCommentType
        {
            /// <summary>
            /// Nebude se odstraňovat nic
            /// </summary>
            None = 0,
            /// <summary>
            /// Komentáře typu --xxx
            /// nebo pro c# typu /// xxxx
            /// </summary>
            PublicComment = 1,
            /// <summary>
            /// Komentáře typu -- xxx
            /// nebo pro c# // xxxx
            /// </summary>
            PrivateComment = 2,
            /// <summary>
            /// Komentáře typu /* sdsdasd */
            /// nebo
            /// /*
            /// xxxx
            /// */
            /// </summary>
            MultiLineComment = 4,
            /// <summary>
            /// Komentář, který je pro mail automat chápán jako ukončovací znak SQL příkazu např. --; nebo --;;
            /// </summary>
            EndCharComment = 8,
            /// <summary>
            /// Komentář, který je chápán jako příznak ADT příkazu. Např. --## xxx nebo --##xxx
            /// </summary>
            AdtCommandComment = 16,
            /// <summary>
            /// Komentář, který je chápán SQL strojem INFORMIX a ORACLE jako optimalization HINT. Např. --+ xxxxx 
            /// </summary>
            OneLineSqlHint = 32,
            /// <summary>
            /// Komentář, který je chápán SQL strojem ORACLE jako optimalization HINT. Např. /*+ xxxxx */
            /// </summary>
            MultiLineSqlHint = 64,
            /// <summary>
            /// Odstraní se i prázdné řádky
            /// </summary>
            RemoveEmptyLine = 128,
            /// <summary>
            /// Příznak, že se mají vyhazovat vícenásobné prázdné řádky - ale první prázdný řádek se zachová. 
            /// </summary>
            RemoveNextEmptyLine = 256,
            /// <summary>
            /// Odstraňovat obsah stringových konstant
            /// </summary>
            RemoveStringConstant = 512,
            /// <summary>
            /// Odstraňovat C# komentáře
            /// </summary>
            RemoveCsComment = 1024,
            /// <summary>
            /// Pouze zůstanou stringové konstanty
            /// </summary>
            OnlyStringConstant = 2048,
            /// <summary>
            /// Pouze zůstanou obsahy komentářů
            /// </summary>
            OnlyComment = 4096,
            /// <summary>
            /// Odstraňovat běžné komentáře, které lze odstranit aniž by došlo k poškození významu SQL příkazu
            /// Je to spojení PublicComment + PrivateComment + MultiLineComment
            /// </summary>
            SqlStandardComment = 1 + 2 + 4,
            /// <summary>
            /// Odstraňovat běžné C# komentáře, které lze odstranit aniž by došlo k poškození významu SQL příkazu
            /// Je to spojení PublicComment + PrivateComment + MultiLineComment
            /// </summary>
            CsStandardComment = 1 + 2 + 4 + 1024
        }

        /// <summary>
        /// Vyhodí multi line komentáře typu /* */ a z konce řádku komentářovou část typu "--" tedy SQL komentáře veřejné i neveřejné 
        /// Ponechá: ADT příkazy --##xxx a INF a ORA ukončovací znak --;; a --; 
        /// </summary>
        /// <param name="a_sql_code_text">SQL text, ze kterého se mají odstranit komentáře.</param>
        /// <param name="a_commentType">Typ odstranění - jaké komentáře se mají odstraňovat. Jedná se o enum typu FLAG </param>
        /// <param name="preserveTextPosition">zachová pozice textů </param>
        /// <returns>Výstupní text s odstraněným komentářem.</returns>
        public static string RemoveSqlComment(string a_sql_code_text, RemoveSqlCommentType a_commentType = RemoveSqlCommentType.SqlStandardComment, bool preserveTextPosition = false)
        {
            bool v_in_comment = false;
            bool v_je_retezec = false;
            bool v_byl_prazdny_radek = false;                               // pomocná proměnná pro odstranění více násobného výskytu prázdných řádků

            StringBuilder output = new StringBuilder();
            string v_line = "";
            StringReader strReader = new StringReader(a_sql_code_text);
            while ((v_line = strReader.ReadLine()) != null)
            {
                string v_radek = RemoveSqlCommentOneRow(v_line, ref v_in_comment, ref v_je_retezec, a_commentType, true);

                if (preserveTextPosition)
                    v_radek = v_radek.PadRight(v_line.Length);

                if (!String.IsNullOrWhiteSpace(v_radek))        // řádek není prázdný
                    v_byl_prazdny_radek = false;
                else if ((a_commentType & RemoveSqlCommentType.RemoveEmptyLine) == RemoveSqlCommentType.RemoveEmptyLine)    // je prázdný a prázdné se mají vyhazovat
                    v_radek = null;
                else if (v_byl_prazdny_radek && ((a_commentType & RemoveSqlCommentType.RemoveNextEmptyLine) == RemoveSqlCommentType.RemoveNextEmptyLine))
                    v_radek = null;
                else if (!v_byl_prazdny_radek)
                    v_byl_prazdny_radek = true;

                if (v_radek != null)
                    output.AppendLine(v_radek);

            }
            return (output.ToString());
        }

        /// <summary>
        /// Vyhodí multi line komentáře typu /* */ a z konce řádku komentářovou část typu "--" tedy SQL komentáře veřejné i neveřejné 
        /// ale ADT příkazy --##xxx a INF a ORA ukončovací znak --;; a --; ponechá
        /// </summary>
        /// <param name="a_radek">Vstupní řádek.</param>
        /// <param name="v_je_komentar">Příznak, že jsem uvnitř multiline komentáře</param>
        /// <param name="v_je_retezec">Příznak, že jsem uvnitř multiline stringové konstanty - to asi nastávat nebude </param>
        /// <param name="a_commentType">Typ odstranění - jaké komentáře se mají odstraňovat</param>
        /// <param name="preserveTextPosition">zachová pozice textů </param>
        /// <returns>Výstupní řádek s odstraněným komentářem.</returns>
        public static string RemoveSqlCommentOneRow(string a_radek, ref bool v_je_komentar, ref bool v_je_retezec, RemoveSqlCommentType a_commentType = RemoveSqlCommentType.SqlStandardComment, bool preserveTextPosition = false)
        {
            StringBuilder v_vysledek = new StringBuilder(a_radek.Length);
            StringBuilder v_string_constant = new StringBuilder(a_radek.Length);
            StringBuilder v_comments = new StringBuilder(a_radek.Length);
            char v_hranicni_znak = ' ';
            char v_znak;
            char v_znak_nasledujici;
            char v_znak_2nasledujici;
            char v_znak_3nasledujici;
            char v_znak_predchozi = ' ';
            string v_radek;

            bool v_OnlyComment = ((a_commentType & RemoveSqlCommentType.OnlyComment) == RemoveSqlCommentType.OnlyComment);  // vrací pouze obsah komentářů
            bool v_OnlyStringConstant = ((a_commentType & RemoveSqlCommentType.OnlyStringConstant) == RemoveSqlCommentType.OnlyStringConstant); // vrací pouze obsah stringových konstant - ty jsou ohraničeny úvozovkami nebo apostrofy
            bool v_RemoveCsComment = ((a_commentType & RemoveSqlCommentType.RemoveCsComment) == RemoveSqlCommentType.RemoveCsComment);  // odstraní komentáře CS formátu - při přepínači OnlyComment určuje, jaké komentáte se mají zachovat
            bool v_EndCharComment = ((a_commentType & RemoveSqlCommentType.EndCharComment) == RemoveSqlCommentType.EndCharComment);
            bool v_PublicComment = ((a_commentType & RemoveSqlCommentType.PublicComment) == RemoveSqlCommentType.PublicComment);    // pouze veřejné komentáře - to jsou komentáře které nemají za znaky "--" znak mezery
            bool v_PrivateComment = ((a_commentType & RemoveSqlCommentType.PrivateComment) == RemoveSqlCommentType.PrivateComment); // pouze neveřejné komentáře - to jsou komentáře které mají za znaky "--" mezeru
            bool v_AdtCommandComment = ((a_commentType & RemoveSqlCommentType.AdtCommandComment) == RemoveSqlCommentType.AdtCommandComment);    // adt příkazy - mají --##
            bool v_MultiLineComment = ((a_commentType & RemoveSqlCommentType.MultiLineComment) == RemoveSqlCommentType.MultiLineComment);   // víceřádkové komentáře
            bool v_MultiLineSqlHint = ((a_commentType & RemoveSqlCommentType.MultiLineSqlHint) == RemoveSqlCommentType.MultiLineSqlHint);   // víceřádkové SQL hint-y
            bool v_OneLineSqlHint = ((a_commentType & RemoveSqlCommentType.OneLineSqlHint) == RemoveSqlCommentType.OneLineSqlHint); // jednořádkové SQL hinty
            bool v_RemoveStringConstant = ((a_commentType & RemoveSqlCommentType.RemoveStringConstant) == RemoveSqlCommentType.RemoveStringConstant);   // příznak odstranění stringových konstant

            #region Test pouze na začátek řádku
            if (v_EndCharComment || v_PublicComment || v_PrivateComment || v_AdtCommandComment || v_RemoveCsComment)
            {
                string v_radek_start = a_radek.TrimStart();

                if (v_EndCharComment)
                    if (v_radek_start.StartsWith("--;"))
                        return ("");                            // vratim prazdny radek

                if (v_PublicComment && !v_OnlyComment)
                    if (v_radek_start.StartsWith("-- "))        // pokud radek primo zacina komentarem
                        return ("");                            // vratim prazdny radek

                if (v_PrivateComment && !v_OnlyComment)
                    if (v_radek_start.StartsWith("--") && !v_radek_start.StartsWith("--##"))		// pokud radek primo zacina komentarem
                        return ("");                            // vratim prazdny radek

                if (v_AdtCommandComment)
                    if (v_radek_start.StartsWith("--##"))       // pokud radek primo zacina ADT příkazem
                        return ("");                            // vratim prazdny radek

                if (v_RemoveCsComment)
                    if (v_radek_start.StartsWith("#region") || v_radek_start.StartsWith("#endregion"))
                        return ("");                            // vratim prazdny radek
            }
            #endregion

            v_radek = a_radek;
            v_znak = ' ';
            int delka = v_radek.Length;
            for (int i = 0; i < delka; i++)
            {
                v_znak_predchozi = v_znak;
                v_znak = v_radek[i];
                if (i + 1 < delka)
                    v_znak_nasledujici = v_radek[i + 1];
                else
                    v_znak_nasledujici = ' ';

                if (i + 2 < delka)
                    v_znak_2nasledujici = v_radek[i + 2];
                else
                    v_znak_2nasledujici = ' ';

                if (i + 3 < delka)
                    v_znak_3nasledujici = v_radek[i + 3];
                else
                    v_znak_3nasledujici = ' ';

                // zacatek multiline hintu
                if (v_MultiLineSqlHint && (!v_je_retezec && !v_je_komentar && v_znak == '/' && v_znak_nasledujici == '*' && v_znak_2nasledujici == '+'))
                {
                    v_je_komentar = true;
                    i++;
                    if (preserveTextPosition) v_vysledek.Append("  ");
                    if (preserveTextPosition && v_OnlyStringConstant) v_string_constant.Append("  ");
                    if (preserveTextPosition && v_OnlyComment) v_comments.Append("/*");
                    continue;
                }
                // zacatek multiline komentare
                else if (v_MultiLineComment && (!v_je_retezec && !v_je_komentar && v_znak == '/' && v_znak_nasledujici == '*' && v_znak_2nasledujici != '+')) // pokud je to začátek víceřádkového komentáře a není to ORACLE hint  https://docs.oracle.com/cd/B28359_01/server.111/b28286/sql_elements006.htm#SQLRF51089    https://docs.oracle.com/cd/B19306_01/server.102/b14211/hintsref.htm#i27644
                {
                    v_je_komentar = true;
                    i++;
                    if (preserveTextPosition) v_vysledek.Append("  ");
                    if (preserveTextPosition && v_OnlyStringConstant) v_string_constant.Append("  ");
                    if (preserveTextPosition && v_OnlyComment) v_comments.Append("/*");
                    continue;
                }
                // konec multiline komentare
                else if (!v_je_retezec && v_je_komentar && v_znak == '*' && v_znak_nasledujici == '/') // pokud je to konec víceřádkového komentáře
                {
                    v_je_komentar = false;
                    i++;
                    if (preserveTextPosition) v_vysledek.Append("  ");
                    if (preserveTextPosition && v_OnlyStringConstant) v_string_constant.Append("  ");
                    if (preserveTextPosition && v_OnlyComment) v_comments.Append("*/");
                    continue;
                }
                // uvnitr multiline komentare
                else if (v_je_komentar)                                                                 // pokud jsem uvnitř víceřádkového komntáře
                {
                    if (preserveTextPosition) v_vysledek.Append(' ');
                    if (preserveTextPosition && v_OnlyStringConstant) v_string_constant.Append(' ');
                    if (v_OnlyComment) v_comments.Append(v_znak);
                    continue;                                                                           // vynechám obsah a jdu na další znak
                }
                // zacatek stringove konstanty 
                else if (!v_je_retezec && (v_znak == '\'' || v_znak == '\"'))					       // pokud nejsem uvnitr textové konstanty ale stojim na zacatku retezce
                {
                    v_je_retezec = true;				// nastavim priznak, ze jsem v oblasti retezce
                    v_hranicni_znak = v_znak;			// uchovam hranicni znak
                    v_vysledek.Append(v_znak);
                    v_string_constant.Append(v_znak);
                    if (preserveTextPosition && v_OnlyComment) v_comments.Append(' ');
                    continue;
                }
                // uvnitr stringove konstanty ale nasel jsem dvojity znak konce stringu - SQL to používá pro uvedení znaku dovnitř stringové konstanty 
                else if (v_je_retezec && v_znak == v_hranicni_znak && v_znak_nasledujici == v_hranicni_znak)   // jsem uvnitř textové konstanty a našel jsem hraniční znak ale další znak je také hraniční - zdojený apostrof není koncem stringové konstanty ale příznakem jednoho apostrofu
                {
                    v_vysledek.Append(v_znak);
                    v_vysledek.Append(v_znak);
                    v_string_constant.Append(v_znak);
                    v_string_constant.Append(v_znak);
                    if (preserveTextPosition && v_OnlyComment) v_comments.Append(' ');
                    i++;
                    continue;
                }
                // na konci stringove konstanty
                else if (v_je_retezec && v_znak == v_hranicni_znak)		    // pokud jsem uvnitr textové konstanty a dosel jsem ke znaku, ktery je ukoncovacem retezce
                {
                    v_je_retezec = false;									// nastavim priznak, ze jsem mimo oblast retezce
                    v_hranicni_znak = ' ';									// zrusim hranicni znak
                    v_vysledek.Append(v_znak);
                    v_string_constant.Append(v_znak);
                    if (preserveTextPosition && v_OnlyComment) v_comments.Append(' ');
                    continue;
                }
                // uvnitr stringove konstanty
                else if (v_je_retezec)                                      // pokud jsem uvnitr textové konstanty
                {
                    if (v_RemoveStringConstant)
                        v_vysledek.Append(' ');
                    else
                        v_vysledek.Append(v_znak);
                    v_string_constant.Append(v_znak);
                    if (preserveTextPosition && v_OnlyComment) v_comments.Append(' ');
                    continue;
                }

                else if (v_znak == '/' && v_znak_nasledujici == '/' && v_znak_2nasledujici == '/' && v_PublicComment && v_RemoveCsComment && !v_je_retezec) // cs jednořádkový komentář typu dokumentace  - tedy /// xxx
                {
                    if (v_OnlyComment)
                    {
                        for (; i < delka; i++)   // dojedu to do konce 58dku
                            v_comments.Append(v_radek[i]);
                    }
                    break; // ukončení cyklu nad tímto řádkem
                }

                else if (v_znak_predchozi != '/' && v_znak == '/' && v_znak_nasledujici == '/' && v_znak_2nasledujici != '/' && v_PrivateComment && v_RemoveCsComment && !v_je_retezec) // cs jednořádkový komentář - ale nejedná se o komentář
                {
                    if (v_OnlyComment)
                    {
                        for (; i < delka; i++)   // dojedu to do konce 58dku
                            v_comments.Append(v_radek[i]);
                    }
                    break; // ukončení cyklu nad tímto řádkem
                }
                // v sekci bezneho kodu
                else                                                    // normální kód, který může obsahovat jednořádkové komentáře typu --
                {
                    // znak neni minus
                    if (v_znak != '-')                                     // pokud neni znak minus
                    {
                        v_vysledek.Append(v_znak);                         // do vysledneho radku pridam na konec dalsi zpracovany znak
                        if (preserveTextPosition && v_OnlyStringConstant) v_string_constant.Append(' ');
                        if (preserveTextPosition && v_OnlyComment) v_comments.Append(' ');
                    }
                    // je minus, ale jsem na konci radku
                    else if (i + 1 == delka)                               // pokud je to mínus, ale je to poslední znak
                    {
                        v_vysledek.Append(v_znak);                         // do vysledneho radku pridam na konec dalsi zpracovany znak
                        if (preserveTextPosition && v_OnlyStringConstant) v_string_constant.Append(' ');
                        if (preserveTextPosition && v_OnlyComment) v_comments.Append(' ');
                    }
                    else if (v_RemoveCsComment)   // je to znak - a je to CS odstraňování komentářů - jen zapsat na výstup
                    {
                        v_vysledek.Append(v_znak);                         // do vysledneho radku pridam na konec dalsi zpracovany znak
                        if (preserveTextPosition && v_OnlyStringConstant) v_string_constant.Append(' ');
                        if (preserveTextPosition && v_OnlyComment) v_comments.Append(' ');
                    }
                    // je minus a je za nim nejaky znak
                    else if (!v_RemoveCsComment)   // následující hrátky jsou platí mimo CS scripty - tedy SQL a ADT
                    {
                        // nasledujici znak neni minus
                        if (v_znak_nasledujici != '-')                      // pokud další znak není mínus
                        {
                            v_vysledek.Append(v_znak);                      // jedná se o samostatně stojící znak mínus
                            if (preserveTextPosition && v_OnlyStringConstant) v_string_constant.Append(' ');
                            if (preserveTextPosition && v_OnlyComment) v_comments.Append(' ');
                        }
                        // nasledujici je take minus
                        else                                                // je to nějaký druh komentáře
                        {
                            // další znak za komentářem je středník
                            if (v_znak_2nasledujici == ';') // potom to není komentář, ale ukončovací pomocný znak příkazu pro ORACLE
                            {
                                if (v_EndCharComment)   // pokud se maji vyhazovat
                                    break;              // s tímto řádkem končím
                                v_vysledek.Append("--;");
                                if (preserveTextPosition && v_OnlyStringConstant) v_string_constant.Append("   ");
                                if (preserveTextPosition && v_OnlyComment) v_comments.Append("   ");
                                i = i + 2;
                            }
                            // následující je +
                            else if (v_znak_2nasledujici == '+') // potom to není komentář, ale informix hint https://www.ibm.com/developerworks/data/zones/informix/library/techarticle/0502fan/0502fan.html
                            {
                                if (v_OneLineSqlHint)    // pokud se maji vyhazovat
                                    break;              // s tímto řádkem končím
                                v_vysledek.Append("--+");
                                if (preserveTextPosition && v_OnlyStringConstant) v_string_constant.Append("   ");
                                if (preserveTextPosition && v_OnlyComment) v_comments.Append("   ");
                                i = i + 2;
                            }
                            // následující je # a za ním další #
                            else if (v_znak_2nasledujici == '#' && v_znak_3nasledujici == '#') // potom to není komentář, ale ADT příkaz
                            {
                                if (v_AdtCommandComment)    // pokud se maji vyhazovat
                                    break;                  // s tímto řádkem končím
                                v_vysledek.Append("--##");
                                if (preserveTextPosition && v_OnlyStringConstant) v_string_constant.Append("    ");
                                if (preserveTextPosition && v_OnlyComment) v_comments.Append("    ");
                                i = i + 3;
                            }
                            // není to speciální případ komentáře, takže je to běžný typ komentáře - pokud je následující znak mezera - je to public komentar
                            else if (v_PublicComment && v_znak_2nasledujici == ' ')
                            {
                                if (v_OnlyComment)
                                {
                                    for (; i < delka; i++)   // dojedu to do konce 58dku
                                        v_comments.Append(v_radek[i]);
                                }
                                break;
                            }
                            // není to speciální případ komentáře, takže je to běžný typ komentáře - pokud je neni následující znak mezera - je to private komentar
                            else if (v_PrivateComment && v_znak_2nasledujici != ' ')
                            {
                                if (v_OnlyComment)
                                {
                                    for (; i < delka; i++)   // dojedu to do konce 58dku
                                        v_comments.Append(v_radek[i]);
                                }
                                break;
                            }
                            else                                                // zde jsou už skutečné komentáře 
                            {
                                v_vysledek.Append(v_znak);
                                if (preserveTextPosition && v_OnlyStringConstant) v_string_constant.Append(' ');
                                if (v_OnlyComment) v_comments.Append(v_znak);
                            }
                        }
                    }
                }
            }

            string vysledek;
            if (v_OnlyStringConstant)
                vysledek = v_string_constant.ToString();
            else if (v_OnlyComment)
                vysledek = v_comments.ToString();
            else
                vysledek = v_vysledek.ToString();

            return (vysledek);
        }

        /// <summary>
        /// odstranění komentářů a částí kódu, které nesplňují kompilační podmínku
        /// </summary>
        /// <param name="a_cs_code_text">Zdrojový kód v CS</param>
        /// <param name="conditionalCompilationSymbols">Symboly kompilace oddělené středníkem</param>
        /// <param name="a_commentType">Typ odstraňovaných komentářů</param>
        /// <param name="preserveTextPosition">Zachovat pozice znaků shodné se zdrojovým souborem</param>
        /// <returns></returns>
        public static string RemoveByConditionalCompilationSymbols(string a_cs_code_text, string conditionalCompilationSymbols, RemoveSqlCommentType a_commentType = RemoveSqlCommentType.CsStandardComment, bool preserveTextPosition = false )
        {
            PositionTypeEnum status = PositionTypeEnum.main;
            Stack<PositionTypeEnum> stack = new Stack<PositionTypeEnum>();
            bool v_in_comment = false;
            bool v_je_retezec = false;
            bool v_byl_prazdny_radek = false;                               // pomocná proměnná pro odstranění více násobného výskytu prázdných řádků

            string[] symbolyArray = conditionalCompilationSymbols.Split(new char[] { ';' },StringSplitOptions.RemoveEmptyEntries);
            List<string> symbols = new List<string>(symbolyArray);

            StringBuilder output = new StringBuilder();
            string v_line = "";
            StringReader strReader = new StringReader(a_cs_code_text);
            while ((v_line = strReader.ReadLine()) != null)
            {
                string v_radek = RemoveSqlCommentOneRow(v_line, ref v_in_comment, ref v_je_retezec, a_commentType, true);

                if (!v_in_comment && !v_je_retezec)
                {
                    string rowText = v_radek.TrimStart();
                    if (rowText.StartsWith("#if"))
                    {
                        v_radek = "";
                        stack.Push(status); // aktuální status si uložím
                        if (status == PositionTypeEnum.main || status == PositionTypeEnum.in_if || status == PositionTypeEnum.in_else )
                        {
                            string condition = GetCodeOnlyTextFrom(rowText, "#if");
                            bool result = EvaluateCondition(condition, symbols);
                            if (result)
                                status = PositionTypeEnum.in_if;   // příznak, že jsem v if bloku - který byl true
                            else
                                status = PositionTypeEnum.over_if;    // příznak, že jdu přes if bloku - který byl false
                        }
                        else
                            status = PositionTypeEnum.over_over_if;
                    }
                    else if (rowText.StartsWith("#elif"))
                    {
                        v_radek = "";
                        // status by mel byt pouze in_if, over_if
                        if (status == PositionTypeEnum.in_if)
                            status = PositionTypeEnum.over_if;
                        else if (status == PositionTypeEnum.over_if)
                        {
                            string condition = GetCodeOnlyTextFrom(rowText, "#elif");
                            bool result = EvaluateCondition(condition, symbols);
                            if (result)
                                status = PositionTypeEnum.in_if;   // příznak, že jsem v if bloku - který byl true
                        }
                    }
                    else if (rowText.StartsWith("#else"))
                    {
                        v_radek = "";
                        // status by mel byt pouze in_if, over_if
                        if (status == PositionTypeEnum.in_if)
                            status = PositionTypeEnum.over_if;
                        else if (status == PositionTypeEnum.over_if)
                            status = PositionTypeEnum.in_else;   // příznak, že jsem v else bloku - který byl true
                    }
                    else if (rowText.StartsWith("#endif"))
                    {
                        v_radek = "";
                        // status by mel byt pouze in_if, over_if, in_else
                        status = stack.Pop();
                    }

                    if (status == PositionTypeEnum.main || status == PositionTypeEnum.in_if || status == PositionTypeEnum.in_else)
                        {
                        if (rowText.StartsWith("#define"))
                        {
                            v_radek = "";
                            string symbol = GetCodeOnlyTextFrom(rowText, "#define");
                            if (!symbols.Contains(symbol))
                                symbols.Add(symbol);
                        }
                        else if (rowText.StartsWith("#undef"))
                        {
                            v_radek = "";
                            string symbol = GetCodeOnlyTextFrom(rowText, "#undef");
                            if (symbols.Contains(symbol))
                                symbols.Remove(symbol);
                        }
                    }
                }

                if (!(status == PositionTypeEnum.main || status == PositionTypeEnum.in_if || status == PositionTypeEnum.in_else))    // pokud jsem v bloku, který se nemá zapisovat ven
                    v_radek = "";

                if (preserveTextPosition)
                    v_radek = v_radek.PadRight(v_line.Length);

                if (!String.IsNullOrWhiteSpace(v_radek))        // řádek není prázdný
                    v_byl_prazdny_radek = false;
                else if ((a_commentType & RemoveSqlCommentType.RemoveEmptyLine) == RemoveSqlCommentType.RemoveEmptyLine)    // je prázdný a prázdné se mají vyhazovat
                    v_radek = null;
                else if (v_byl_prazdny_radek && ((a_commentType & RemoveSqlCommentType.RemoveNextEmptyLine) == RemoveSqlCommentType.RemoveNextEmptyLine))
                    v_radek = null;
                else if (!v_byl_prazdny_radek)
                    v_byl_prazdny_radek = true;

                if (v_radek != null)
                    output.AppendLine(v_radek);
            }
            return (output.ToString());
        }


        /// <summary>
        /// Ze zadaného textu vytáhne stringové konstanty a vrátí je do listu
        /// </summary>
        /// <param name="sInputSQL"></param>
        /// <param name="vysledek"></param>
        public static void GetStringConstants(string sInputSQL, ref List<string> vysledek)
        {
            int v_text_len = sInputSQL.Length;
            bool v_in_text_constant = false;
            StringBuilder v_txt_values = new StringBuilder();
            char prevChar = '\0';
            bool verbatimString  = false;
            for (int v_i = 0; v_i < v_text_len; v_i++)
            {
                if (sInputSQL[v_i] == '\"' && !v_in_text_constant)                    // pokud jsem nalezl začátek textové konstanty
                {
                    if (prevChar == '@')
                        verbatimString = true;
                    v_in_text_constant = true;
                }
                else if (v_in_text_constant && verbatimString && sInputSQL[v_i] == '"' && v_i+1 < v_text_len && sInputSQL[v_i+1] == '"')
                {
                    // https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/tokens/verbatim
                    v_i++;
                    v_txt_values.Append('"');
                }
                else if ( v_in_text_constant && !verbatimString  && sInputSQL[v_i] == '\\' )  // pokud jsem na escape sekvenci
                {
                    //v_txt_values.Append(sInputSQL[v_i]);
                    //if (sInputSQL[v_i+1] == '\'')
                    //{
                    //    v_i++;
                    //    v_txt_values.Append('\'');
                    //}

                    v_i++;
                    // https://csharpindepth.com/articles/Strings
                    if (sInputSQL[v_i] == '\'')
                        v_txt_values.Append('\'');
                    else if (sInputSQL[v_i] == '\"')
                        v_txt_values.Append('\"');
                    else if (sInputSQL[v_i] == '\\')
                        v_txt_values.Append('\\');
                    else if (sInputSQL[v_i] == '\0')
                        v_txt_values.Append('\0');
                    else if (sInputSQL[v_i] == '\a')
                        v_txt_values.Append('\a');
                    else if (sInputSQL[v_i] == '\b')
                        v_txt_values.Append('\b');
                    else if (sInputSQL[v_i] == '\f')
                        v_txt_values.Append('\f');
                    else if (sInputSQL[v_i] == '\n')
                        v_txt_values.Append('\n');
                    else if (sInputSQL[v_i] == '\r')
                        v_txt_values.Append('\r');
                    else if (sInputSQL[v_i] == '\v')
                        v_txt_values.Append('\v');
                    else if (sInputSQL[v_i] == 'u')
                    {
                        //\uxxxx - Unicode escape sequence for character with hex value xxxx
                        // "\u8ba1\u7b97\u673a\u2022\u7f51\u7edc\u2022\u6280\u672f\u7c7b";
                        StringBuilder sb = new StringBuilder();
                        //sb.Append('\\').Append(sInputSQL[v_i]).Append(sInputSQL[v_i + 1]).Append(sInputSQL[v_i + 2]).Append(sInputSQL[v_i + 3]).Append(sInputSQL[v_i + 4]);
                        //v_txt_values.Append(String.Format(sb.ToString()));
                        //v_txt_values.Append(Regex.Unescape(sb.ToString()));
                        sb.Append(sInputSQL[v_i + 1]).Append(sInputSQL[v_i + 2]).Append(sInputSQL[v_i + 3]).Append(sInputSQL[v_i + 4]);
                        string text = char.ToString((char)ushort.Parse(sb.ToString(), NumberStyles.AllowHexSpecifier));
                        v_txt_values.Append(text);

                        v_i = v_i + 4;
                    }
                    else if (sInputSQL[v_i] == 'x')
                    {
                        //\xn[n][n][n] - Unicode escape sequence for character with hex value nnnn(variable length version of \uxxxx)
                        StringBuilder sb = new StringBuilder();
                        //sb.Append('\\').Append(sInputSQL[v_i]);
                        int j = 1;
                        for (; j <= 4; j++)
                            if ((sInputSQL[v_i + j] >= '0' && sInputSQL[v_i + j] <= '9') || (sInputSQL[v_i + j] >= 'a' && sInputSQL[v_i + j] <= 'f'))
                                sb.Append(sInputSQL[v_i + j]);
                            else
                                break;
                        //v_txt_values.Append(String.Format(sb.ToString()));
                        //v_txt_values.Append(Regex.Unescape(sb.ToString()));
                        string text = char.ToString((char)ushort.Parse(sb.ToString(), NumberStyles.AllowHexSpecifier));
                        v_txt_values.Append(text);
                        v_i = v_i + j - 1;
                    }
                    else if (sInputSQL[v_i] == 'U')
                    {
                        //\Uxxxxxxxx - Unicode escape sequence for character with hex value xxxxxxxx(for generating surrogates)
                        StringBuilder sb = new StringBuilder();
                        //sb.Append('\\').Append(sInputSQL[v_i]).Append(sInputSQL[v_i + 1]).Append(sInputSQL[v_i + 2]).Append(sInputSQL[v_i + 3]).Append(sInputSQL[v_i + 4]).Append(sInputSQL[v_i + 5]).Append(sInputSQL[v_i + 6]).Append(sInputSQL[v_i + 7]).Append(sInputSQL[v_i + 8]);
                        //v_txt_values.Append(String.Format(sb.ToString()));
                        sb.Append(sInputSQL[v_i + 1]).Append(sInputSQL[v_i + 2]).Append(sInputSQL[v_i + 3]).Append(sInputSQL[v_i + 4]).Append(sInputSQL[v_i + 5]).Append(sInputSQL[v_i + 6]).Append(sInputSQL[v_i + 7]).Append(sInputSQL[v_i + 8]);
                        string text = char.ToString( (char)uint.Parse(sb.ToString(), NumberStyles.AllowHexSpecifier));
                        v_txt_values.Append(text);
                        //v_txt_values.Append(Regex.Unescape(sb.ToString()));
                        v_i = v_i + 8;
                    }
                }
                else if (sInputSQL[v_i] == '\"' && v_in_text_constant)                // pokud jsem našel konec textové konstanty
                {
                    string konstanta = v_txt_values.ToString();
                    //if(doEscape)
                    //    konstanta = Regex.Unescape(konstanta);
                    vysledek.Add(konstanta);
                    //vysledek.Add(v_txt_values.ToString());
                    v_txt_values.Length = 0;
                    verbatimString = false;
                    v_in_text_constant = false;
                }
                else if (v_in_text_constant)
                    v_txt_values.Append(sInputSQL[v_i]);
                prevChar = sInputSQL[v_i];
            }
        }

        /// <summary>
        /// Ze zadaného textu vytáhne stringové konstanty a vrátí je do listu
        /// </summary>
        /// <param name="sInputSQL"></param>
        /// <param name="vysledek"></param>
        public static void GetPowerBuilderStringConstants(string sInputSQL, ref List<string> vysledek)
        {
            char hranice = ' ';
            int v_text_len = sInputSQL.Length;
            bool v_in_text_constant = false;
            StringBuilder v_txt_values = new StringBuilder();
            char prevChar = '\0';
            for (int v_i = 0; v_i < v_text_len; v_i++)
            {
                if ((sInputSQL[v_i] == '\'' || sInputSQL[v_i] == '\"' )&& !v_in_text_constant)                    // pokud jsem nalezl začátek textové konstanty
                {
                    hranice = sInputSQL[v_i];
                    v_in_text_constant = true;
                }
                else if (v_in_text_constant && sInputSQL[v_i] == '~')  // pokud jsem na escape sekvenci
                {
                    v_i++;
                    if (sInputSQL[v_i] == '\'')
                        v_txt_values.Append('\'');
                    if (sInputSQL[v_i] == '~')
                        v_txt_values.Append('~');
                    else if (sInputSQL[v_i] == '\"')
                        v_txt_values.Append('\"');
                    else if (sInputSQL[v_i] == '\\')
                        v_txt_values.Append('\\');
                    else if (sInputSQL[v_i] == '\t')
                        v_txt_values.Append('\t');
                    else if (sInputSQL[v_i] == '\n')
                        v_txt_values.Append('\n');
                    else if (sInputSQL[v_i] == '\r')
                        v_txt_values.Append('\r');
                }
                else if (sInputSQL[v_i] == hranice && v_in_text_constant)                // pokud jsem našel konec textové konstanty
                {
                    string konstanta = v_txt_values.ToString();
                    vysledek.Add(konstanta);
                    v_txt_values.Length = 0;
                    v_in_text_constant = false;
                }
                else if (v_in_text_constant)
                    v_txt_values.Append(sInputSQL[v_i]);
                prevChar = sInputSQL[v_i];
            }
        }


        /// <summary>
        /// Typ pozice v rámci CS kódu - podle vnořených bloků podmínek kompilace
        /// </summary>
        private enum PositionTypeEnum
        {
            /// <summary>
            /// hlavní blok kódu - není do ničeho zanořený
            /// </summary>
            main,
            /// <summary>
            /// V bloku IF který se má zapisovat ven - byla splněna podmínka
            /// </summary>
            in_if,
            /// <summary>
            /// V bloku if, který se má přeskočit
            /// </summary>
            over_if,
            /// <summary>
            /// v bloku else, který se má zapisovat ven
            /// </summary>
            in_else,
            /// <summary>
            /// V bloku if, který se má celý přeskočit - včetně všech jeho elif a else
            /// </summary>
            over_over_if
        }

        /// <summary>
        /// Vrátí text bez případných komentářů
        /// </summary>
        /// <param name="text"></param>
        /// <returns></returns>
        private static string GetCodeOnlyText( string text )
        {
            string result = "";
            bool v_pom_in_comment = false;
            bool v_pom_je_retezec = false;
            result = RemoveSqlCommentOneRow(text, ref v_pom_in_comment, ref v_pom_je_retezec, RemoveSqlCommentType.CsStandardComment, false).Trim();
            return(result);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="text"></param>
        /// <param name="fromText"></param>
        /// <returns></returns>
        private static string GetCodeOnlyTextFrom(string text, string fromText )
        {
            return GetCodeOnlyText(text.CutFrom(fromText).Trim());
        }

        /// <summary>
        /// Z podmínky vytahá jména všech proměnných
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        private static List<string> GetVarFromCondition( string condition )
        {
            List<string> result = new List<string>();
            string[] symbolyArray = condition.Split(new char[] { ' ', '\t', '&', '|', '(', ')', '!' }, StringSplitOptions.RemoveEmptyEntries);
            foreach(string symbol in symbolyArray)
                if(!result.Contains(symbol))
                    result.Add(symbol);
            return(result);
        }

        /// <summary>
        /// Z podmínky vytahá jména všech proměnných
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        private static string GetDataTableCondition(string condition)
        {
            string result = condition;
            result = result.Replace("!", " Not ").Replace("||", " Or ").Replace("&&", " And ");
            return (result);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="condition"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        private static bool GetConditionalResult( string condition, Dictionary<string,bool> parameters )
        {
            DataTable dataTable = new DataTable();
            foreach( string paramName in parameters.Keys)
                dataTable.Columns.Add(paramName, typeof(bool));
            DataRow row = dataTable.NewRow();
            foreach (var item in parameters)
                row[item.Key] = item.Value;

            dataTable.Columns.Add("result", typeof(bool), GetDataTableCondition( condition));
            dataTable.Rows.Add(row);
            object resultObject = dataTable.Rows[0]["result"];
            if (resultObject is bool result)
                return (result);
            else
                throw new Exception("Chybný výsledek vyhodnocení podmínky.");
            //bool result = Convert.ToBoolean(dataTable.Compute(condition, null));
        }

        /// <summary>
        /// Vyhodnocení podmínky podle zadaného seznamu define
        /// </summary>
        /// <param name="condition"></param>
        /// <param name="define"></param>
        /// <returns></returns>
        private static bool EvaluateCondition( string condition, List<string> define )
        {
            List<string> symbolsInCondition = GetVarFromCondition(condition);
            Dictionary<string, bool> conditionParams = new Dictionary<string, bool>();
            foreach (string symbolInCondition in symbolsInCondition)
                conditionParams.Add(symbolInCondition, false);
            foreach (string definedSymbol in define )
                if (conditionParams.ContainsKey(definedSymbol))
                    conditionParams[definedSymbol] = true;
                else
                    conditionParams.Add(definedSymbol, true);
            bool result = GetConditionalResult(condition, conditionParams);
            return result;
        }
        
    }
}
