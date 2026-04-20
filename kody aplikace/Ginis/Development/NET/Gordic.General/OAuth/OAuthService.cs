//  <FileHeader xmlns = "http://www.gordic.cz/shared/file-header/v_1.0.0.0" >
//    <Name>        Gordic.General.OAuthService.cs                              </Name>
//    <Description> Available service providers for OAuth                       </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2021                            </Copyright>
//    <Created>     2021-09-07                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{
    /// <summary>
    /// Available service providers for OAuth
    /// </summary>
    [Serializable]
    public enum OAuthService
    {
        /// <summary>
        /// Mail_SMTP
        /// </summary>
        Mail_SMTP = 0,

        /// <summary>
        /// Vault
        /// </summary>
        Vault = 10,

        /// <summary>
        /// GraphAPI
        /// </summary>
        GraphAPI = 20,

        /// <summary>
        /// Mail_POP3
        /// </summary>
        Mail_POP3 = 30,

        /// <summary>
        /// MM_Recogniser
        /// </summary>
        MM_Recogniser = 40,

        /// <summary>
        /// CSAS_API
        /// </summary>
        CSAS_API = 50,
        /// <summary>
        /// BankGateway (CSAS)
        /// </summary>
        BankGateway = 51,

        /// <summary>
        /// Unknown
        /// </summary>
        Unknown = 60,

        /// <summary>
        /// GINIS_ESL
        /// </summary>
        GINIS_ESL = 70,

        /// <summary>
        /// AzureOpenAI
        /// </summary>
        AzureOpenAI = 80,

        /// <summary>
        /// Azure Foundry AI
        /// </summary>
        AzureFoundryAI = 81,
    }
}
