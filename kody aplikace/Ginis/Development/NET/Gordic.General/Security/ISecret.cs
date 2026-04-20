//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ISecret.cs                                   </Name>
//    <Description> Available GINIS secret types                                </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2021                            </Copyright>
//    <Created>     2021-08-18                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{
    /// <summary>
    /// TODO: refactor, move to ISecret ISecretDateValidity
    /// </summary>
    public interface ISecretDateValidity
    {
        bool IsDateValid(DateTime date);
    }

    /// <summary>
    /// Base Secret
    /// </summary>
    public interface ISecret: IExistable, IDisposable
    {
        /// <summary>
        /// Scope
        /// </summary>
        SecretScope Scope
        {
            get;
        }

        /// <summary>
        /// VaultId
        /// </summary>
        string VaultId
        {
            get;
        }

        /// <summary>
        /// Path
        /// </summary>
        string Path
        {
            get;
        }
    }

    /// <summary>
    /// Scope of secret
    /// </summary>
    [Serializable]
    public enum SecretScope
    {
        /// <summary>
        /// User
        /// </summary>
        User = 0,

        /// <summary>
        /// Global
        /// </summary>
        Global = 90,

        /// <summary>
        /// Unknown
        /// </summary>
        Unknown = 100
    }
}
