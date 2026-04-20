//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GHttpClientFactoryExtensions.cs              </Name>
//    <Description> GHttpClientFactoryExtensions - specific OAuth               </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-08-29                                                  </Created>
//  </FileHeader>

using System;
using System.Net.Http;

namespace Gordic.General
{
    /// <summary>
    /// GHttpClientFactoryExtensions - specific OAuth
    /// </summary>
    public static class GHttpClientFactoryExtensions
    {
        static readonly IGLogger Logger = GLogManager.CurrentClassLogger();

        /// <summary>
        /// Execute OAuth http client on service
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="service"></param>
        /// <param name="ixs_oap"></param>
        /// <param name="execute"></param>
        /// <param name="notSupported"></param>
        /// <param name="authError"></param>
        /// <returns></returns>
        public static T ExecuteHttpWithOAuth<T>(
            this OAuthService service,
            GString ixs_oap,
            Func<HttpClient, T> execute,
            Func<T> notSupported,
            Func<Exception, HttpClient, Exception> authError)
        {
            if(!OAuthTokenProviderFactory.VerifyOAuth(service, ixs_oap))
            {
                Logger.Warn("Service: {service} is NOT supported on profile: {ixs_oap}", service, ixs_oap);
                return notSupported();
            }

            var httpClient = HttpClientFactory.CreateOAuthHttpClient(service, ixs_oap);

            try
            {
                return execute(httpClient);
            }
            catch (Exception ex)
            {
                throw authError(ex, httpClient);
            }
        }

        static IGOAuthTokenProviderFactory OAuthTokenProviderFactory => GComponentCatalog.Mediate<IGOAuthTokenProviderFactory>();
        static IGHttpClientFactory HttpClientFactory => GComponentCatalog.Mediate<IGHttpClientFactory>();
    }
}
