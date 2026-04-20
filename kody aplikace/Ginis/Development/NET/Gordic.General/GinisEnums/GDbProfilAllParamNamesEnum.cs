//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDbProfilAllParamNamesEnum.cs                </Name>
//    <Description> Výčet všech jmen položek popisujících DB profily - odpovídá jménům string položek v registrech v sekci Počítač\HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Gordic\GINIS\SHARED\SET_profilName\</Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-07-10                                                  </Created>
//  </FileHeader>



namespace Gordic.General
{
    /// <summary>
    /// Výčet všech jmen položek popisujících DB profily - odpovídá jménům string položek v registrech v sekci Počítač\HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Gordic\GINIS\SHARED\SET_profilName\
    /// Obsahuje i zastaralé ( dříve využívané ) položky, které se podle jmen ukládají do registrů nebo do databázové tabulky ginddbp.dbp_klic
    /// </summary>
    public enum GDbProfilAllParamNamesEnum
    {
        /// <summary>
        /// noReg, inf, ora, mss - jméno DB profilu - v registrech je určeno již samotnou cestou k položkám DB profilu
        /// </summary>
        PROFIL = 1,
        /// <summary>
        /// inf, ora, mss  - Typ databázového serveru (obsahuje také příznak použití unicode databáze ) - { 1-inf,3-ora,5-mss, 53-ora unicode, 55-mss unicode } 
        /// <see cref="GDbProfilParamTypDbEnum"/>
        /// </summary>
        TYP_DB = 2,
        /// <summary>
        /// inf, ora, mss - typ připojení pro PowerBuilder aplikace - historický pozůstatek { IN7, O84, MSS }
        /// V rámci .NET aplikací se již nepoužívá
        /// </summary>
        TYP_DR32 = 3,
        /// <summary>
        /// inf, ora, mss - typ klientského připojení - { OleDb, Native } - zatím je celý GINIS otestovaný pouze s OleDb
        /// </summary>
        TYP_DR_NET = 4,
        /// <summary>
        /// inf, mss - fyzické jméno databáze
        /// </summary>
        DATABASE = 5,
        /// <summary>
        /// inf, ora, mss - fyzické jméno databáze, pro oracle zahrnuje současně jméno databáze
        /// </summary>
        SERVERNAME32 = 6,
        /// <summary>
        /// inf, ora, mss - typ ověření přihlašovaného uživatele - { sql, win, mix } - mix znamená, že si uživatel v přihlašovacím dialogu může zvolit jméno+heslo nebo přihlášení přes aktuální Windows přihlášení
        /// </summary>
        TYP_AUTENTICATION = 7,
        /// <summary>
        /// inf, ora, mss - pouze pro fázi GINSLG01 { sql, ws1, ws2 } - ws1 je již obsolete ale ještě se používá - pokud je nastaveno, potom musí být nastaveny URL na autentizační službu
        /// </summary>
        SLG_TYP_AUTENTICATION = 8,

        /// <summary>
        /// noReg, inf, ora, mss - Login uživatele - neukládá se do registrů! Dříve býval součástí profilu uloženého v vas.ginddbp - nově se má ukládat do KeyVault
        /// <see href="https://gordic.sharepoint.com/sites/ginis-vyvoj/SitePages/Tajemstv%C3%AD.aspx?e=ChRTaGFyZVBvaW50TmV3c0RpZ2VzdBIUU2hhcmVQb2ludE5ld3NEaWdlc3QaCwi2zuu+rfP%2fOxAFIiQ2ZDkwZGJlZS05OTM4LTNmZDUtNzhmZi1hYjEzMjc1ZGFkMWQ%3d_2_1_1_4_2"/>
        /// </summary>
        LDB = 9,
        /// <summary>
        /// noReg, inf, ora, mss - heslo uživatele - neukládá se do registrů! Dříve býval součástí profilu uloženého v vas.ginddbp - nově se má ukládat do KeyVault
        /// <see href="https://gordic.sharepoint.com/sites/ginis-vyvoj/SitePages/Tajemstv%C3%AD.aspx?e=ChRTaGFyZVBvaW50TmV3c0RpZ2VzdBIUU2hhcmVQb2ludE5ld3NEaWdlc3QaCwi2zuu+rfP%2fOxAFIiQ2ZDkwZGJlZS05OTM4LTNmZDUtNzhmZi1hYjEzMjc1ZGFkMWQ%3d_2_1_1_4_2"/>
        /// </summary>
        PDB = 10,

        /// <summary>
        /// mss
        /// </summary>
        TRUSTSERVERCERTIFICATE = 12,
        /// <summary>
        /// mss - příznak, že databáze je provozována jako Azure SQL databáze - { 0-ne, 1-ano }
        /// </summary>
        IS_AZURE = 13,

        /// <summary>
        /// noReg, mss, ora - příznak, že databáze je unicode - používá se pouze v rámci config souborů - v registrech je uloženo kumulativně s pomocí položky <see cref="GDbProfilAllParamNamesEnum.TYP_DB" />
        /// </summary>
        IS_UNICODE = 14,

        /// <summary>
        /// mss {MSOLEDBSQL, OLEDBSQL, [prázdno] }
        /// </summary>
        NAME_DR_NET = 15,

        /// <summary>
        /// inf, ora, mss - url na primární autentizační službu
        /// </summary>
        SLG_AUTENTICATION_URL = 16,
        /// <summary>
        /// inf, ora, mss - url na záložní autentizační službu
        /// </summary>
        SLG_AUTENTICATION_URL2 = 17,
        /// <summary>
        /// inf, ora, mss - url na záložní autentizační službu
        /// </summary>
        SLG_AUTENTICATION_URL3 = 18,
        /// <summary>
        /// inf, ora, mss - url na záložní autentizační službu
        /// </summary>
        SLG_AUTENTICATION_URL4 = 19,
        /// <summary>
        /// Nevím
        /// </summary>
        SLG_AUTENTICATION_PROT = 20,

        /// <summary>
        /// inf, ora, mss - pouze pomocný popisný údaj pro uživatele
        /// </summary>
        POZNAMKA = 500,

        /// <summary>
        /// pouze pro Gupta - obsolete { File DSN }
        /// </summary>
        DNS_TYPE = 1000,

        /// <summary>
        /// ora - obsolete - už se nepoužívá
        /// </summary>
        ORACLE_ALIAS = 9000,
        /// <summary>
        /// ora - obsolete - už se nepoužívá 
        /// </summary>
        ORACLE_HOST = 9001,
        /// <summary>
        /// ora - obsolete - už se nepoužívá 
        /// </summary>
        ORACLE_PORT = 9002,
        /// <summary>
        /// ora - obsolete - už se nepoužívá 
        /// </summary>
        ORACLE_PROTOCOL = 9003,
        /// <summary>
        /// ora - obsolete - už se nepoužívá 
        /// </summary>
        ORACLE_SID = 9004,

        /// <summary>
        /// inf - obsolete - už se nepoužívá - {olsoctcp,...}
        /// </summary>
        PROTOCOL32 = 90100,
        /// <summary>
        /// inf - obsolete - už se nepoužívá - {sqlexec,...}
        /// </summary>
        SERVICE = 90101,
        /// <summary>
        /// inf - obsolete - už se nepoužívá - {n}
        /// </summary>
        DELIMIDENT32 = 90102,
        /// <summary>
        /// inf - obsolete - už se nepoužívá - {.}
        /// </summary>
        DBMONEY = 90103,
        /// <summary>
        /// inf - obsolete - už se nepoužívá - {Y4MD-}
        /// </summary>
        DBDATE = 90104,
        /// <summary>
        /// inf - obsolete - už se nepoužívá - {n}
        /// </summary>
        DBANSIWARN32 = 90105,
        /// <summary>
        /// inf - obsolete - už se nepoužívá - {cs_cz.CP1250}
        /// </summary>
        DB_LOCALE32 = 90106,
        /// <summary>
        /// inf - obsolete - už se nepoužívá - {cs_cz.CP1250}
        /// </summary>
        CLIENT_LOCALE32 = 90107,
        /// <summary>
        /// inf - obsolete - už se nepoužívá - {cs_cz.CP1250}
        /// </summary>
        COLLCHAR32 = 90108,

        /// <summary>
        /// nevím
        /// </summary>
        ALTERNATIVNI_PROFIL = 100000,

        /// <summary>
        /// Uloženo v user části registrů - naposledy použitý typ autentizace - má význam pokud má uživatel na výběr
        /// </summary>
        LAST_TYP_AUTENTICATION = 200000,
        /// <summary>
        /// Uloženo v user části registrů - naposledy použitý login
        /// </summary>
        USERID = 200001,
    }
}
