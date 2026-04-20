//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDbProfilNetParamNamesEnum.cs                </Name>
//    <Description> Jména položek v registrech popisujících DB profil a používané z .NET aplikací</Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-07-11                                                  </Created>
//  </FileHeader>



namespace Gordic.General
{
    /// <summary>
    /// Jména položek v registrech popisujících DB profil a používané z .NET aplikací
    /// Obsahuje pouze položky odvozené z <see cref="GDbProfilAllParamNamesEnum"/>
    /// Jména položek v registrech se shodují se jmény zde uvedených enum
    /// </summary>
    public enum GDbProfilRegistryParamNamesEnum
    {
        /// <summary>
        /// inf, ora, mss  - Typ databázového serveru (obsahuje také příznak použití unicode databáze ) - { 1-inf,3-ora,5-mss, 53-ora unicode, 55-mss unicode } 
        /// <see cref="GDbProfilParamTypDbEnum"/>
        /// </summary>
        TYP_DB = GDbProfilAllParamNamesEnum.TYP_DB,
        /// <summary>
        /// inf, ora, mss - fyzické jméno databáze, pro oracle zahrnuje současně jméno databáze
        /// </summary>
        SERVERNAME32 = GDbProfilAllParamNamesEnum.SERVERNAME32,
        /// <summary>
        /// inf, mss - fyzické jméno databáze
        /// </summary>
        DATABASE = GDbProfilAllParamNamesEnum.DATABASE,
        /// <summary>
        /// inf, ora, mss - typ klientského připojení - { OleDb, Native } - zatím je celý GINIS otestovaný pouze s OleDb
        /// </summary>
        TYP_DR_NET = GDbProfilAllParamNamesEnum.TYP_DR_NET,
        /// <summary>
        /// mss {MSOLEDBSQL, MSOLEDBSQL19, OLEDBSQL, [prázdno] }
        /// </summary>
        NAME_DR_NET = GDbProfilAllParamNamesEnum.NAME_DR_NET,
        /// <summary>
        /// mss - příznak, že databáze je provozována jako Azure SQL databáze - { 0-ne, 1-ano }
        /// </summary>
        IS_AZURE = GDbProfilAllParamNamesEnum.IS_AZURE,

        /// <summary>
        /// Příznak, že připojení k databázi je pouze pro čtení - { 0-ne, 1-ano }
        /// </summary>
        IS_READONLY = GDbProfilAllParamNamesEnum.IS_READONLY
    }
}


