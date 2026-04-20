//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.VaultTypes.cs                                </Name>
//    <Description> VaultTypes                                                  </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-11-21                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{
    /// <summary>
    /// VaultTypes
    /// </summary>
    public enum VaultTypes
    {
        /// <summary>
        /// Empty
        /// </summary>
        Empty,

        /// <summary>
        /// File
        /// </summary>
        File,

        /// <summary>
        /// Database
        /// </summary>
        Database,

        /// <summary>
        /// Config
        /// </summary>
        Config,

        /// <summary>
        /// Composite
        /// </summary>
        Composite,

        /// <summary>
        /// WindowsCertStore
        /// </summary>
        WindowsCertStore,

        /// <summary>
        /// Azure
        /// </summary>
        Azure,

        /// <summary>
        /// SecureAnyBox
        /// </summary>
        SecureAnyBox
    }
}
