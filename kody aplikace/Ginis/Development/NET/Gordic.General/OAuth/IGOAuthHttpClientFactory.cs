//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGOAuthHttpClientFactory.cs                  </Name>
//    <Description> OAuth http-client factory.                                  </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-01-31                                                  </Created>
//  </FileHeader>

using System.Net.Http;

namespace Gordic.General
{
    /// <summary>
    /// OAuth http-client factory.
    /// Split dependency from Gordic.General (i want to have implementation in Gordic.Support.Auth)
    /// </summary>
    public interface IGOAuthHttpClientFactory
    {
        /// <summary>
        /// Build OAuth http client
        /// </summary>
        /// <param name="service"></param>
        /// <param name="profile"></param>
        /// <returns></returns>
        HttpClient CreateOAuthHttpClient(OAuthService service, GString profile);
    }
}
