//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDbProfilParamTypDbEnum.cs                   </Name>
//    <Description> Povolené hodnoty pro položku v registrech: Počítač\HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Gordic\GINIS\SHARED\SET_profilName\ Typ_Db</Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-07-10                                                  </Created>
//  </FileHeader>


namespace Gordic.General
{
    /// <summary>
    /// Povolené hodnoty pro položku v registrech: Počítač\HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Gordic\GINIS\SHARED\SET_profilName\ Typ_Db
    /// </summary>
    public enum GDbProfilParamTypDbEnum 
    {
        /// <summary>
        /// Neznámo
        /// </summary>
        NONE = 0,
        /// <summary>
        /// Informix
        /// </summary>
        INF = 1,
        /// <summary>
        /// Oracle
        /// </summary>
        ORA = 3,
        /// <summary>
        /// Microsoft
        /// </summary>
        MSS = 5,
        /// <summary>
        /// Informix - UNICODE - nepoužívá se
        /// </summary>
        INFU = 51,
        /// <summary>
        /// Oracle - UNICODE
        /// </summary>
        ORAU = 53,
        /// <summary>
        /// Microsoft - UNICODE
        /// </summary>
        MSSU = 55
    }
}
