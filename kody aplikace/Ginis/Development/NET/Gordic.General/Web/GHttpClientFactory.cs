//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GHttpClientFactory.cs                        </Name>
//    <Description> Http client factory                                         </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2020-11-10                                                  </Created>
//  </FileHeader>

using System;
using System.Net;
using System.Net.Http;
using System.Net.Security;
using System.Reflection;
using System.Security.Authentication;
using System.Security.Cryptography.X509Certificates;
using System.Collections.Generic;

namespace Gordic.General
{
    /// <summary>
    /// Http client factory
    /// </summary>
    public sealed class GHttpClientFactory : IGHttpClientFactory, IGRaiseableRuntime
    {
        /// <summary>
        /// Rozhodnutí klienta OAuth, jak pokračovat
        /// </summary>
        public enum OAuthClientDecisions
        {
            /// <summary>
            /// Volání OAuth-služby bylo úspěšné, vrať výsledek
            /// </summary>
            Success,

            /// <summary>
            /// Při volání došlo k selhání služby - zkus znovu se stejným access-tokenem
            /// </summary>
            Retry,

            /// <summary>
            /// Při volání došlo k fatálnímu selhání služby - vyhodí vyjímku. (např. špatné url)
            /// Nelze pokračovat
            /// </summary>
            Fail,

            /// <summary>
            /// Došlo k selhání služby a lze předpokládat, že jde o chybu IdP (špatný access token)
            /// Zahoď access-token a zkus znovu
            /// </summary>
            DiscardAccessTokenAndRetry
        }

        static readonly IGLogger Logger = GLogManager.CurrentClassLogger();
        static IGSystemConfiguration SystemConfiguration => GComponentCatalog.Mediate<IGSystemConfiguration>();

        static IGHttpProxyFactory GetSafeHttpProxyFactory(IGHttpProxyFactory proxyFactory)
        {
            if(proxyFactory != null)
            {
                Logger.Trace("HttpProxy factory1: {Type}", proxyFactory.GetType().FullName);
                return proxyFactory;
            }

            try
            {
                proxyFactory = GComponentCatalog.Mediate<IGHttpProxyFactory>();
            }
            catch (Exception ex)
            {
                Logger.Trace(ex, "Nepodařilo se získat IGHttpProxyFactory z GComponentCatalog");
            }

            if(proxyFactory == null)
            {
                proxyFactory = new GHttpProxyFactory();
            }

            Logger.Trace("HttpProxy factory2: {Type}", proxyFactory.GetType().FullName);
            return proxyFactory;
        }

        void IGRaiseableRuntime.RaiseToStage(RuntimeStages stage) => GHttpClientCertificateValidator.RaiseToStage(stage);

        /// <summary>
        /// Create new http client
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        HttpClient IGHttpClientFactory.CreateHttpClient(string url) =>
            CreateHttpClient_Internal(
                url: url,
                requestedProtocols: SslProtocols.None,
                authObject: null,
                proxyFactory: null
            );

        /// <summary>
        /// 👍 CreateHttpClient - modern way.
        /// </summary>
        /// <param name="url"></param>
        /// <param name="credentials"></param>
        /// <param name="proxyFactory"></param>
        /// <returns></returns>
        HttpClient IGHttpClientFactory.CreateHttpClient(
            string url,
            IEnumerable<GHttpClientCredential> credentials,
            IGHttpProxyFactory proxyFactory
        ) =>
            CreateHttpClient_Internal(
                url: url,
                requestedProtocols: SslProtocols.None,
                authObject: credentials,
                proxyFactory: proxyFactory
            );

        /// <summary>
        /// Create new http client
        /// </summary>
        /// <param name="url"></param>
        /// <param name="clientCertificate"></param>
        /// <returns></returns>
        HttpClient IGHttpClientFactory.CreateHttpClient(
            string url,
            X509Certificate2 clientCertificate
        ) =>
            CreateHttpClient_Internal(
                url: url,
                requestedProtocols: SslProtocols.None,
                authObject: clientCertificate,
                proxyFactory: null
            );

        /// <summary>
        /// Create new http client
        /// </summary>
        /// <param name="url"></param>
        /// <param name="protocols"></param>
        /// <returns></returns>
        HttpClient IGHttpClientFactory.CreateHttpClient(
            string url,
            SslProtocols protocols
        ) =>
            CreateHttpClient_Internal(
                url: url,
                requestedProtocols: protocols,
                authObject: null,
                proxyFactory: null
            );

        /// <summary>
        /// Create new http client
        /// </summary>
        /// <param name="url"></param>
        /// <param name="protocols"></param>
        /// <param name="credentials"></param>
        /// <param name="customCertificateValidator"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        HttpClient IGHttpClientFactory.CreateHttpClient(
            string url,
            SslProtocols protocols,
            IEnumerable<GHttpClientCredential> credentials,
            Func<HttpRequestMessage, X509Certificate2, X509Chain, SslPolicyErrors, bool> customCertificateValidator
        ) =>
            CreateHttpClient_Internal(
                url: url,
                requestedProtocols: protocols,
                authObject: credentials,
                proxyFactory: null,
                customCertificateValidator: customCertificateValidator
            );

        /// <summary>
        /// Create new http client
        /// </summary>
        /// <param name="url"></param>
        /// <param name="protocols"></param>
        /// <param name="credentials"></param>
        /// <param name="proxyFactory"></param>
        /// <returns></returns>
        HttpClient IGHttpClientFactory.CreateHttpClient(
            string url,
            SslProtocols protocols,
            ICredentials credentials,
            IGHttpProxyFactory proxyFactory
        )
        {
            return CreateHttpClient_Internal(
                url: url,
                requestedProtocols: protocols,
                authObject: credentials,
                proxyFactory: proxyFactory
            );
        }

        /// <summary>
        /// CreateOAuthHttpClient
        /// </summary>
        /// <param name="service"></param>
        /// <param name="profile"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        HttpClient IGHttpClientFactory.CreateOAuthHttpClient(OAuthService service, GString profile)
        {
            // bridge - do not break current API to developers.
            return GComponentCatalog.Mediate<IGOAuthHttpClientFactory>().CreateOAuthHttpClient(service, profile);
        }

        HttpClient CreateHttpClient_Internal(
            string url,
            SslProtocols requestedProtocols,
            object authObject,
            IGHttpProxyFactory proxyFactory,
            Func<HttpRequestMessage, X509Certificate2, X509Chain, SslPolicyErrors, bool> customCertificateValidator = null
        )
        {
            IsAllowed(url);

            var handler = CreateHandler_Internal(
                url,
                requestedProtocols,
                authObject,
                proxyFactory,
                customCertificateValidator
            );

            var httpClient = new HttpClient(handler)
            {
                BaseAddress = new Uri(url),
                Timeout = GetClientTimeout()
            };

            Logger.Trace("HttpClient({Url}) prepared, requestedProtocols: {RequestedProtocols}, timeout: {Timeout}s",
                httpClient.BaseAddress,
                requestedProtocols,
                httpClient.Timeout.TotalSeconds
            );
            return httpClient;
        }

        static TimeSpan GetClientTimeout()
        {
            var timeout = SystemConfiguration.GetSystemParameter("gin_http_to", "180");
            if(int.TryParse(timeout, out var clientTimeout))
            {
                return new TimeSpan(0, 0, clientTimeout);
            }

            return new TimeSpan(0, 0, 180);
        }

        HttpMessageHandler CreateHandler_Internal(
            string url,
            SslProtocols protocols,
            object authObject,
            IGHttpProxyFactory proxyFactory,
            Func<HttpRequestMessage, X509Certificate2, X509Chain, SslPolicyErrors, bool> customCertificateValidator = null
        )
        {
            var handler = new HttpClientHandler
            {
                ClientCertificateOptions = ClientCertificateOption.Manual,
                ServerCertificateCustomValidationCallback =
                    (httpRequestMessage, cert, certChain, policyErrors) =>
                    {
                        return customCertificateValidator != null
                            ? customCertificateValidator(httpRequestMessage, cert, certChain, policyErrors)
                            : GHttpClientCertificateValidator.ValidateTrustHttpClient(httpRequestMessage, cert, policyErrors);
                    },
                SslProtocols = protocols,
                Proxy = GetSafeHttpProxyFactory(proxyFactory).CreateWebProxy()
            };

            switch (authObject)
            {
                case ICredentials credentials:
                    handler.Credentials = credentials;
                    break;

                case X509Certificate2 certificate:
                    handler.ClientCertificates.Add(certificate);
                    break;

                case IEnumerable<GHttpClientCredential> credentials:
                    AppendSecrets(credentials, handler);
                    break;
            }

            return handler;
        }

        static void AppendSecrets(IEnumerable<GHttpClientCredential> credentials, HttpClientHandler handler)
        {
            foreach (var httpCredential in credentials)
            {
                switch (httpCredential.Secret)
                {
                    case IPasswordSecret passwordSecret:
                        handler.Credentials = new NetworkCredential(
                            userName: httpCredential.Login,
                            password: passwordSecret.Secret
                        );
                        break;

                    case ICertificateSecret certificateSecret:
                        handler.ClientCertificates.Add(certificateSecret.Certificate);
                        break;

                    case X509Certificate2 xcert:
                        handler.ClientCertificates.Add(xcert);
                        break;

                    case ICredentials creds:
                        handler.Credentials = creds;
                        break;

                    default:
                        throw new GNotImplementedException($"Unsupported secret type: [{httpCredential.Secret.GetType().Name}]");
                }
            }
        }

        /// <summary>
        /// Pokud není třeba, nepoužívat. V .NET core není podporováno.
        /// Použijte CreateHttpClient()
        /// </summary>
        /// <param name="url"></param>
        /// <param name="proxyFactory"></param>
        /// <returns></returns>
        WebRequest IGHttpClientFactory.CreateWebRequest(string url, IGHttpProxyFactory proxyFactory)
        {
#if NETFRAMEWORK
            return CreateWebRequest_Internal(
                url,
                GServicePointManager48.SecurityProtocol,
                proxyFactory
            );
#endif

            throw new NotImplementedException("Pro .NET > 4.8 použijte HttpClient");
        }

        /// <summary>
        /// Pokud není třeba, nepoužívat. V .NET core není podporováno.
        /// Použijte CreateHttpClient()
        /// </summary>
        /// <param name="url"></param>
        /// <param name="securityProtocolType"></param>
        /// <param name="proxyFactory"></param>
        /// <returns></returns>
        WebRequest IGHttpClientFactory.CreateWebRequest(string url, SecurityProtocolType securityProtocolType, IGHttpProxyFactory proxyFactory)
        {
#if NETFRAMEWORK
            return CreateWebRequest_Internal(
                url,
                securityProtocolType,
                proxyFactory
            );
#endif

            throw new NotImplementedException("Pro .NET > 4.8 použijte HttpClient");
        }

#if NETFRAMEWORK
        WebRequest CreateWebRequest_Internal(string url, SecurityProtocolType securityProtocolType, IGHttpProxyFactory proxyFactory)
        {
            IsAllowed(url);
            GServicePointManager48.SecurityProtocol = securityProtocolType;
            var webRequest = WebRequest.CreateHttp(url);
            Logger.Info("Http web-request-client url: [{Url} - {ctls}] - requested:({rtls}-- IGNORED), global-set to: {sys_tls}",
                webRequest.RequestUri,
                GetSslTls(webRequest),
                securityProtocolType,
                GServicePointManager48.SecurityProtocol
            );

            webRequest.Proxy = GetSafeHttpProxyFactory(proxyFactory).CreateWebProxy();
            return webRequest;
        }
#endif

        static string IsAllowed(string url)
        {
            if (!WhitelistProvider.IsAllowed(url))
            {
                Logger.Fatal("ACCESS DENIED: [{Url}] provider: {Provider}({Hash})",
                    url,
                    WhitelistProvider.GetType().Name,
                    WhitelistProvider.GetHashCode()
                );
                throw new GAccessDeniedException(24700001, 24700001, url); // Požadovaná url adresa není povolena systémem GINIS: {0}
            }

            Logger.Debug("ACCESS GRANTED: [{Url}] provider: {Provider}({Hash})",
                url,
                WhitelistProvider.GetType().Name,
                WhitelistProvider.GetHashCode()
            );
            return url;
        }

        /// <summary>
        /// WhitelistProvider
        /// </summary>
        static IGWhitelistProvider WhitelistProvider => GComponentCatalog.Mediate<IGWhitelistProvider>();

        static IGHttpClientFactory _Current = null;
        /// <summary>
        /// Current
        /// </summary>
        public static IGHttpClientFactory Current
        {
            get => _Current ?? (_Current = new GHttpClientFactory());
        }

        internal static string GetSslTls(WebRequest webRequest)
        {
            try
            {
                return webRequest
                    .GetType()
                    .InvokeMember(
                        "SslProtocols",
                        BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.GetProperty,
                        Type.DefaultBinder,
                        webRequest,
                        null
                    ).ToString();
            }
            catch (Exception ex)
            {
                Logger.Error(false, ex, "CANNOT DETECT SSL/TLS PROTOCOL");
                return "CANNOT DETECT SSL/TLS PROTOCOL";
            }
        }
    }
}
