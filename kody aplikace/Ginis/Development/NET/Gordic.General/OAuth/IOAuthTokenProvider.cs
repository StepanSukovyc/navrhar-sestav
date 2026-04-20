//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IOAuthTokenProvider.cs                       </Name>
//    <Description> OAuth client                                                </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2021                            </Copyright>
//    <Created>     2021-09-07                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;

namespace Gordic.General
{
    /// <summary>
    /// OAuth client
    /// </summary>
    public interface IOAuthTokenProvider
    {
        /// <summary>
        /// Get access token by flow
        /// </summary>
        /// <returns></returns>
        OAuthTokenSecret NegotiateAccessToken();

        /// <summary>
        /// ExecuteStateStep - additional flow. Usually there is no need to implement
        /// </summary>
        /// <param name="tokens"></param>
        /// <returns></returns>
        string ExecuteTokenExtension(Dictionary<OAuthTokenType, string> tokens);

        /// <summary>
        /// Name
        /// </summary>
        string Name
        {
            get;
        }
    }
}
