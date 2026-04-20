//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGHttpClientFactory.cs                       </Name>
//    <Description> HttpClient factory                                          </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2021                            </Copyright>
//    <Created>     2021-08-16                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Security;
using System.Security.Authentication;
using System.Security.Cryptography.X509Certificates;

namespace Gordic.General
{
    /// <summary>
    /// HttpClient factory
    /// </summary>
    public interface IGHttpClientFactory
    {
        /// <summary>
        /// 👍 CreateHttpClient
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        HttpClient CreateHttpClient(string url);

        /// <summary>
        /// 👍 CreateHttpClient - modern way.
        /// </summary>
        /// <param name="url"></param>
        /// <param name="credentials"></param>
        /// <param name="proxyFactory"></param>
        /// <returns></returns>
        HttpClient CreateHttpClient(
            string url,
            IEnumerable<GHttpClientCredential> credentials,
            IGHttpProxyFactory proxyFactory = null
        );

        /// <summary>
        /// 👎 CreateHttpClient
        /// </summary>
        /// <param name="url"></param>
        /// <param name="clientCertificate"></param>
        /// <returns></returns>
        HttpClient CreateHttpClient(string url, X509Certificate2 clientCertificate);

        /// <summary>
        /// 👍 CreateHttpClient - for specific cases (PPF)
        /// </summary>
        /// <param name="url"></param>
        /// <param name="protocols"></param>
        /// <returns></returns>
        HttpClient CreateHttpClient(string url, SslProtocols protocols);

        /// <summary>
        /// 👍 CreateHttpClient
        /// </summary>
        /// <param name="url"></param>
        /// <param name="protocols"></param>
        /// <param name="credentials"></param>
        /// <param name="proxyFactory"></param>
        /// <returns></returns>
        HttpClient CreateHttpClient(
            string url,
            SslProtocols protocols,
            ICredentials credentials,
            IGHttpProxyFactory proxyFactory = null
        );

        /// <summary>
        /// 👎👍 CreateHttpClient
        /// </summary>
        /// <param name="url"></param>
        /// <param name="protocols"></param>
        /// <param name="credentials"></param>
        /// <param name="customCertificateValidator"></param>
        /// <returns></returns>
        HttpClient CreateHttpClient(
            string url,
            SslProtocols protocols,
            IEnumerable<GHttpClientCredential> credentials,
            Func<HttpRequestMessage, X509Certificate2, X509Chain, SslPolicyErrors, bool> customCertificateValidator
        );

        /// <summary>
        /// 👍 CreateOAuthHttpClient
        /// </summary>
        /// <param name="service"></param>
        /// <param name="profile"></param>
        /// <returns></returns>
        HttpClient CreateOAuthHttpClient(OAuthService service, GString profile);

        /// <summary>
        /// 👎👎👎 CreateWebRequest - do not use from 16.8.2021
        /// Please move to HttpClient
        /// </summary>
        /// <param name="url"></param>
        /// <param name="proxyFactory"></param>
        /// <returns></returns>
        WebRequest CreateWebRequest(string url, IGHttpProxyFactory proxyFactory = null);

        /// <summary>
        /// 👎👎👎 CreateWebRequest - do not use from 16.8.2021
        /// Please move to HttpClient
        /// </summary>
        /// <param name="url"></param>
        /// <param name="securityProtocolType"></param>
        /// <param name="proxyFactory"></param>
        /// <returns></returns>
        WebRequest CreateWebRequest(
            string url,
            SecurityProtocolType securityProtocolType,
            IGHttpProxyFactory proxyFactory = null
        );
    }
}
