//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.OAuthJournalEvents.cs                        </Name>
//    <Description> OAuthJournalEvents                                          </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2026-01-05                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{
    /// <summary>
    /// OAuthJournalEvents
    /// </summary>
    [Serializable]
    public enum OAuthJournalEvents
    {
        Generic_AccessToken_ExpiryWarn = 10_000,
        Generic_OpenBrowser_Request = 10_001,
        Generic_ErrorAnalyze = 10_002,
        Generic_OpenBrowser_Done = 10_003,

        ClientCredentials_Start = 1,
        ClientCredentials_GrantReceived = 2,
        ClientCredentials_GrantStarted = 3,
        ClientCredentials_GrantCompleted = 4,
        ClientCredentials_GrantDenied = 5,
        ClientCredentials_InvalidConsentDeleteAccessToken = 6,
        ClientCredentials_CachedAccessToken = 7,
        ClientCredentials_AccessToken_Failed = 8,
        ClientCredentials_AccessToken_Success = 9,
        ClientCredentials_MS_LoginMicrosoftCom = 10,
        ClientCredentials_MissingClientSecret = 11,
        ClientCredentials_ExecuteTokenExtension = 12,
        ClientCredentials_GrantStateFailed = 13,
        ClientCredentials_ClientSecretNotExist = 14,
        ClientCredentials_ClientSecretExpired = 15,

        Default_RefreshAccessToken = 101,
        Default_RefreshAccessTokenFailed = 102,
        Default_RefreshAccessTokenNotFound = 103,
        Default_RefreshAccessTokenRedeem = 104,
        Default_RefreshAccessStateTokensPrepared = 105,
        Default_ReuseAccessToken = 106,
        Default_AccessTokenRefreshed = 107,
        Default_RefreshAccessTokenNotExists = 108,
        Default_RefreshAccessTokenAnotherLogin = 109,
        Default_StateVerificationFailed = 110,
        Default_StateVerificationFailed2 = 111,
        Default_StateVerificationOK = 112,
        Default_AccessTokenStart = 113,

        MSI_UnknownError = 200,


        Device_Start = 300,
        Device_OpenBrowser = 301,
        Device_ShowCodeSecret_Request = 302,
        Device_Pool = 303,
        Device_ShowCodeSecret_Done = 304,

        // OAuthFlow_Device
        // OAuthFlow_MSI_SAMI
        // OAuthFlow_Default
        // OAuthFlow_ClientCredentials

        MicrosoftAzure_AADSTS7000215 = 50_000,
        MicrosoftAzure_AADSTS7000218 = 50_001,
        MicrosoftAzure_AADSTS7000222 = 50_002
    }
}
