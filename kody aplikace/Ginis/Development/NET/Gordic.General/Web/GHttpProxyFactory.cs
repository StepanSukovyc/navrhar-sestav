//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GHttpProxyFactory.cs                         </Name>
//    <Description> Http-proxy factory                                          </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-11-14                                                  </Created>
//  </FileHeader>

using System.Net;

namespace Gordic.General
{
#if NETFRAMEWORK
    public static class HttpStatusCodeExtensions
    {
        public static bool IsSuccessStatusCode(this HttpStatusCode statusCode)
        {
            int code = (int)statusCode;
            return code >= 200 && code <= 299;
        }
    }
#endif

    /// <summary>
    /// Http-proxy factory
    /// </summary>
    public class GHttpProxyFactory : IGHttpProxyFactory
    {
        IWebProxy IGHttpProxyFactory.CreateWebProxy()
        {
#if NETFRAMEWORK
            return null;
#else
            var proxyUrl = GComponentCatalog.Mediate<IGSystemConfiguration>().GetSystemParameter(GParamNames.HttpProxy, string.Empty);
            if(string.IsNullOrWhiteSpace(proxyUrl))
            {
                return null;
            }

            return new WebProxy(proxyUrl);
#endif
        }
    }
}
