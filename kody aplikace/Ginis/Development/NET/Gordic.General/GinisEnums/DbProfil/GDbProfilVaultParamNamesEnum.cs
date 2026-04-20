//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDbProfilVaultParamNamesEnum.cs              </Name>
//    <Description> Jména položek v KeyVault popisujících parametry DB profilu - zatím jen jméno a heslo</Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-07-13                                                  </Created>
//  </FileHeader>



using System;
using System.Xml.Linq;

namespace Gordic.General
{
    /// <summary>
    /// Jména položek v KeyVault popisujících parametry DB profilu - zatím jen jméno a heslo
    /// Obsahuje pouze položky odvozené z <see cref="GDbProfilAllParamNamesEnum"/>
    ///
    /// <example>
    /// Ukázka použití jako jména klíče pro přístup do KeyVault
    /// <code>
    /// private void ObtainLoginProperties() {
    ///     m_sUzivatel = Vault.GetPasswordSecret(GSecretNameBuilder.DatabaseProfile.Klic(dbProfil.BaseValueTrimmed, nameof(GDbProfilVaultParamNamesEnum.ldb)));
    ///     m_sHeslo = Vault.GetPasswordSecret(GSecretNameBuilder.DatabaseProfile.Klic(dbProfil.BaseValueTrimmed, nameof(GDbProfilVaultParamNamesEnum.pdb)));
    /// }
    /// </code>
    /// </example>
    /// 
    /// </summary>
    public enum GDbProfilVaultParamNamesEnum
    {
        /// <summary>
        /// Login uživatele
        /// </summary>
        ldb = GDbProfilAllParamNamesEnum.LDB,
        /// <summary>
        /// Heslo uživatele
        /// </summary>
        pdb = GDbProfilAllParamNamesEnum.PDB
    }

}
