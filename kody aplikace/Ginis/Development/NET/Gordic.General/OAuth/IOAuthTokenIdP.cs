//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IOAuthTokenIdP.cs                            </Name>
//    <Description> OAuth token extensions - IdP                                </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-10-10                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{
    public sealed class GOAuthResultIdP
    {
        public readonly bool Success;
        public readonly string Error;
        public readonly string[] Results;

        private GOAuthResultIdP(bool success, string error, params string[] results)
        {
            Success = success;
            Error = error;
            Results = results;
        }

        public static GOAuthResultIdP Fail(string error)
        {
            return new GOAuthResultIdP(false, error);
        }

        public static GOAuthResultIdP Ok(params string[] results)
        {
            return new GOAuthResultIdP(true, null, results);
        }
    }

    /// <summary>
    /// OAuth token extensions - IdP
    /// </summary>
    public interface IOAuthTokenIdP
    {
        /// <summary>
        /// Client credentials flow - create access token - return serialized json
        /// Store token to storage
        /// </summary>
        /// <param name="clientID"></param>
        /// <param name="scope"></param>
        /// <param name="clientSecret"></param>
        /// <param name="grantType"></param>
        /// <returns></returns>
        GOAuthResultIdP AccessTokenClient(
            string clientID,
            string scope,
            string clientSecret,
            string grantType
        );

        /// <summary>
        /// Default flow - redeem AccessToken
        /// </summary>
        /// <param name="clientID"></param>
        /// <param name="redirectUri"></param>
        /// <param name="clientSecret"></param>
        /// <param name="scope"></param>
        /// <param name="grantType"></param>
        /// <param name="codeVerifier"></param>
        /// <param name="state"></param>
        /// <returns></returns>
        GOAuthResultIdP AccessToken(
            string clientID,
            string redirectUri,
            string clientSecret,
            string scope,
            string grantType,
            string codeVerifier,
            string state
        );

        /// <summary>
        /// Default flow - prepare code token
        /// Store token to storage
        /// </summary>
        /// <param name="clientID"></param>
        /// <param name="scope"></param>
        /// <param name="redirectUri"></param>
        /// <param name="state"></param>
        /// <returns></returns>
        GOAuthResultIdP PrepareAccessToken(
            string clientID,
            string scope,
            string redirectUri,
            string state
        );
    }
}
