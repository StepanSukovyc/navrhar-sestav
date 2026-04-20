//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Support.Mail.IOAuthTokenStorage.cs            </Name>
//    <Description> OAuth support interface (refresh tokens)                    </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2021                            </Copyright>
//    <Created>     2021-07-14                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;

namespace Gordic.General
{
    /// <summary>
    /// Token types
    /// </summary>
    [Serializable]
    public enum OAuthTokenType
    {
        /// <summary>
        /// Access
        /// </summary>
        Access = 0,

        /// <summary>
        /// Refresh
        /// </summary>
        Refresh = 10,

        /// <summary>
        /// State
        /// </summary>
        State = 20,

        /// <summary>
        /// Code
        /// </summary>
        Code = 30,

        /// <summary>
        /// CodeVerifier
        /// </summary>
        CodeVerifier = 40,

		///<summary>
		/// DeviceCode
		///</summary>
        DeviceCode = 50,

        /// <summary>
        /// UserCode
        /// </summary>
        UserCode = 60,

        /// <summary>
        /// AdminConsent
        /// </summary>
        AdminConsent = 70
    }

    /// <summary>
    /// OAuth support interface (refresh tokens)
    /// </summary>
    public interface IOAuthTokenStorage : INamed
    {
        /// <summary>
        /// ReadToken
        /// </summary>
        /// <param name="tokenType"></param>
        /// <param name="service"></param>
        /// <param name="secretScope"></param>
        /// <param name="profile"></param>
        /// <param name="serviceScopes"></param>
        /// <returns></returns>
        OAuthTokenSecret ReadToken(
            OAuthTokenType tokenType,
            OAuthService service,
            SecretScope secretScope,
            GString profile,
            IEnumerable<string> serviceScopes
        );

        /// <summary>
        /// StoreToken
        /// </summary>
        /// <param name="token"></param>
        OAuthTokenSecret StoreToken(OAuthTokenSecret token);

        /// <summary>
        /// InvalidateToken
        /// </summary>
        void InvalidateToken(OAuthTokenSecret token);

        /// <summary>
        /// FindProfileByState
        /// </summary>
        /// <param name="content"></param>
        /// <param name="tokenType"></param>
        /// <returns></returns>
        OAuthTokenSecret FindTokenByContent(string content, OAuthTokenType tokenType);

        /// <summary>
        /// RemoveExpiredTokens
        /// </summary>
        /// <param name="authTokenTypes"></param>
        /// <returns></returns>
        void RemoveExpiredTokens(OAuthTokenType[] authTokenTypes);
    }
}
