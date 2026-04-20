//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.OAuthFlow.cs                                 </Name>
//    <Description> Available OAuth methods                                     </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2021                            </Copyright>
//    <Created>     2021-09-07                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{
    /// <summary>
    /// Available OAuth methods
    /// </summary>
    [Serializable]
    public enum OAuthFlow
    {
        /// <summary>
        /// Default
        /// </summary>
        Default = 0,

        /// <summary>
        /// ClientCredentials
        /// </summary>
        ClientCredentials = 10,

        /// <summary>
        /// Device
        /// </summary>
        Device = 20,

        /// <summary>
        /// Azure System Assigned Managed Identity
        /// </summary>
        MSI_SAMI = 30
    }
}
