//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDbProfilConfigParamNamesEnum.cs             </Name>
//    <Description> Jména položek v config souboru popisujících DB profil a používané z .NET aplikací</Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-07-11                                                  </Created>
//  </FileHeader>

using System;
using System.Xml.Linq;

namespace Gordic.General
{
    /// <summary>
    /// Jména položek v config souboru popisujících DB profil a používané z .NET aplikací
    /// Obsahuje pouze položky odvozené z <see cref="GDbProfilAllParamNamesEnum"/>
    /// Jména položek v config souboru se po konverzi shodují se jmény zde uvedených enum - Pozor! config soubor je case-sensitive
    /// Konverze spočívá v tom, že první písmeno názvu položky je velké. Další velká písmena uvnitř názvu položky se převedou na malá a předřadí se před ně znak mínus.
    /// Používá se např. v rámci ApplicationServer.GAuthorizationProvider
    /// <example>
    /// Ukázka části XML v config souboru
    /// <code>
    /// &lt;Profiles&gt;
    ///   &lt;Profile name = &quot; local376&quot;&gt;
    ///     &lt;Database-type&gt;mssql&lt;/Database-type&gt; // jedna z hodnot informix, oracle, mssql
    ///     &lt;Data-source&gt;n-jkuttich4&lt;/Data-source&gt;
    ///     &lt;Database&gt;local376&lt;/Database&gt; // pouze pro informix a mssql
    ///     &lt;Description&gt;lok&#225;ln&#237; demo datab&#225;ze&lt;/Description&gt;
    ///     &lt;Provider-type&gt;native&lt;/Provider-type&gt; // jedna z hodnot oledb, native
    ///     &lt;Provider-name&gt;&lt;/Provider-name&gt;
    ///     &lt;Auth-mode&gt;sql&lt;/Auth-mode&gt; // jedna z hodnot sql, win, mix
    ///     &lt;Unicode&gt;false&lt;/Unicode&gt;
    ///     &lt;Azure&gt;false&lt;/Azure&gt; // pouze pro mssql
    ///   &lt;/Profile&gt;
    /// &lt;/Profiles&gt;
    /// </code>
    /// </example>
    /// 
    /// Pro převod enum položky na jméno konfigurační položky v config souboru slouží pomocná funkce <see cref="GDbProfilConfigParamNamesEnumExtensions.ToConfigKeyName" />
    /// 
    /// Pro zpětný převod z jména konfigurační položky v config souboru na enum slouží pomocná funkce <see cref="GDbProfilConfigParamNamesEnumExtensions.FromConfigKeyName" />
    /// 
    /// <example>
    /// Ukázka převodu z enum na jméno konfigurační položky a zpět.
    /// <code>
    /// GDbProfilConfigParamNamesEnum configName = GDbProfilConfigParamNamesEnum.ProviderName;  
    /// string config_key = configName.ToConfigKeyName();   // převod na jméno konfigurační položky používané v config souboru
    /// GDbProfilConfigParamNamesEnum configName2 = GDbProfilConfigParamNamesEnum.None.FromConfigKeyName(config_key); // na nějaké nesmyslné enum hodnotě se zavolá extension funkce pro převod stringu na enum hodnotu.
    /// </code>
    /// </example>
    /// 
    /// </summary>
    public enum GDbProfilConfigParamNamesEnum
    {
        /// <summary>
        /// Hodnota typu neurčeno - tato hodnota se nemá nikde používat
        /// </summary>
        None = 0,
        /// <summary>
        /// name (takto se to uvádí v *.config souborech jako atribut tagu Profile )
        /// Jméno DB profilu - v config souboru je uvedeno z atributu XML elementu Profile - ostatní položky popisující DB profil jso vnořeny v tomto elementu
        /// </summary>
        Name = GDbProfilAllParamNamesEnum.PROFIL,
        /// <summary>
        /// Database-type (takto se to uvádí v *.config souborech)
        /// { Informix, Oracle, MSSQL } case-insensitive
        /// nebo { 1, 51, 3, 53, 5, 55 }
        /// 
        /// Pozor! Neodpovídá 1:1 základní položce <see cref="GDbProfilAllParamNamesEnum.TYP_DB"/>
        /// Převod na  <see cref="GDbProfilParamTypDbEnum"/> je možný s pomocí <see cref="GCommon.GetDatabaseTypeForRegistry(GCommon.DatabaseType, bool)"/>
        /// </summary>
        DatabaseType = GDbProfilAllParamNamesEnum.TYP_DB,
        /// <summary>
        /// Data-source (takto se to uvádí v *.config souborech)
        /// inf, ora, mss - fyzické jméno databáze, pro oracle zahrnuje současně jméno databáze
        /// </summary>
        DataSource = GDbProfilAllParamNamesEnum.SERVERNAME32,
        /// <summary>
        /// Database (takto se to uvádí v *.config souborech)
        /// inf, mss - fyzické jméno databáze
        /// </summary>
        Database = GDbProfilAllParamNamesEnum.DATABASE,
        /// <summary>
        /// Description (takto se to uvádí v *.config souborech)
        /// Poznámka
        /// </summary>
        Description = GDbProfilAllParamNamesEnum.POZNAMKA,
        /// <summary>
        /// inf, ora, mss - typ klientského připojení - { OleDb, Native } - zatím je celý GINIS otestovaný pouze s OleDb
        /// </summary>
        ProviderType = GDbProfilAllParamNamesEnum.TYP_DR_NET,
        /// <summary>
        /// Provider-name (takto se to uvádí v *.config souborech)
        /// mss {MSOLEDBSQL, MSOLEDBSQL19, OLEDBSQL, [prázdno] }
        /// </summary>
        ProviderName = GDbProfilAllParamNamesEnum.NAME_DR_NET,
        /// <summary>
        /// Azure (takto se to uvádí v *.config souborech)
        /// mss - příznak, že databáze je provozována jako Azure SQL databáze - { 0-ne, 1-ano }
        /// </summary>
        Azure = GDbProfilAllParamNamesEnum.IS_AZURE,
        /// <summary>
        /// Auth-mode (takto se to uvádí v *.config souborech)
        /// inf, ora, mss - typ ověření přihlašovaného uživatele - { sql, win, mix } - mix znamená, že si uživatel v přihlašovacím dialogu může zvolit jméno+heslo nebo přihlášení přes aktuální Windows přihlášení
        /// </summary>
        AuthMode = GDbProfilAllParamNamesEnum.TYP_AUTENTICATION,
        /// <summary>
        /// Unicode (takto se to uvádí v *.config souborech)
        /// noReg, mss, ora - příznak, že databáze je unicode - používá se pouze v rámci config souborů - v registrech je uloženo kumulativně s pomocí položky <see cref="GDbProfilAllParamNamesEnum.TYP_DB" />
        /// </summary>
        Unicode = GDbProfilAllParamNamesEnum.IS_UNICODE
    }


    /// <summary>
    /// Rozšíření enum o funkci pro převod enum na jméno konfigurační položky v config souboru GINIS
    /// </summary>
    public static class GDbProfilConfigParamNamesEnumExtensions
    {
        /// <summary>
        /// Převede enum na jméno konfigurační položky uložené v config souboru
        /// </summary>
        /// <param name="typeEnum"></param>
        /// <returns></returns>
        public static string ToConfigKeyName(this GDbProfilConfigParamNamesEnum typeEnum)
        {
            switch (typeEnum)
            {
                case GDbProfilConfigParamNamesEnum.Name:
                    // pozor! Toto je atribut. Nejedná se o samostatný Xml element
                    return "name"; 
                case GDbProfilConfigParamNamesEnum.DatabaseType:
                    return "Database-type";
                case GDbProfilConfigParamNamesEnum.DataSource:
                    return "Data-source";
                case GDbProfilConfigParamNamesEnum.Database:
                    return "Database";
                case GDbProfilConfigParamNamesEnum.Description:
                    return "Description";
                case GDbProfilConfigParamNamesEnum.AuthMode:
                    return "Auth-mode";
                case GDbProfilConfigParamNamesEnum.ProviderType:
                    return "Provider-type";
                case GDbProfilConfigParamNamesEnum.ProviderName:
                    return "Provider-name";
                case GDbProfilConfigParamNamesEnum.Azure:
                    return "Azure";
                case GDbProfilConfigParamNamesEnum.Unicode:
                    return "Unicode";
                default:
                    throw new NotImplementedException($"U {nameof(ToConfigKeyName)} neošetřená hodnota {typeEnum} ");
            }
        }

        /// <summary>
        /// Převede enum na jméno konfigurační položky uložené v config souboru
        /// </summary>
        /// <param name="typeEnum">jen pomocný nositel této funkce. Akce se sám neúčastní</param>
        /// <param name="configKeyName">jméno konfigurační položky z config souboru</param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public static GDbProfilConfigParamNamesEnum FromConfigKeyName(this GDbProfilConfigParamNamesEnum typeEnum, string configKeyName )
        {
            switch (configKeyName)
            {
                case "name":
                    // pozor! Toto je atribut. Nejedná se o samostatný Xml element
                    return GDbProfilConfigParamNamesEnum.Name;
                case "Database-type":
                    return GDbProfilConfigParamNamesEnum.DatabaseType;
                case "Data-source":
                    return GDbProfilConfigParamNamesEnum.DataSource;
                case "Database":
                    return GDbProfilConfigParamNamesEnum.Database;
                case "Description":
                    return GDbProfilConfigParamNamesEnum.Description;
                case "Auth-mode":
                    return GDbProfilConfigParamNamesEnum.AuthMode;
                case "Provider-type":
                    return GDbProfilConfigParamNamesEnum.ProviderType;
                case "Provider-name":
                    return GDbProfilConfigParamNamesEnum.ProviderName;
                case "Azure":
                    return GDbProfilConfigParamNamesEnum.Azure;
                case "Unicode":
                    return GDbProfilConfigParamNamesEnum.Unicode;
                default:
                    throw new NotImplementedException($"U {nameof(FromConfigKeyName)} neošetřená hodnota {configKeyName} ");
            }
        }

    }

}
