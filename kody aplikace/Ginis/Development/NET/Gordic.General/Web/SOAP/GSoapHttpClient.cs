//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GSoapHttpClient.cs                           </Name>
//    <Description> SOAP http client (for connectors)                           </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-06-13                                                  </Created>
//  </FileHeader>

using System;
using System.Text;
using System.Net.Http;
using System.Collections.Generic;
using System.Linq;

namespace Gordic.General
{
    /// <summary>
    /// SOAP-http client (for connectors)
    /// Works in .NET Framework and .NET Core / .NET 5+
    /// </summary>
    public class GSoapHttpClient
    {
        static readonly IGLogger Logger = GLogManager.CurrentClassLogger();
        readonly string RequestID = Guid.NewGuid().ToString();
        static IGHttpClientFactory HttpClientFactory => GComponentCatalog.Mediate<IGHttpClientFactory>();
        readonly string Url;
        readonly IEnumerable<GHttpClientCredential> Credentials;
        readonly HttpMethod Method = HttpMethod.Post;

        /// <summary>
        /// AddSoapHeader
        /// </summary>
        protected virtual bool AddSoapHeader
        {
            get => true;
        }

        /// <summary>
        /// GSoapHttpClient
        /// </summary>
        /// <param name="url"></param>
        public GSoapHttpClient(string url)
        {
            Credentials = Enumerable.Empty<GHttpClientCredential>();
            Url = url;
        }

        /// <summary>
        /// GSoapHttpClient
        /// </summary>
        /// <param name="url"></param>
        /// <param name="credentials"></param>
        public GSoapHttpClient(string url, IEnumerable<GHttpClientCredential> credentials)
        {
            Credentials = credentials;
            Url = url;
        }

        protected virtual GSoapClientException CreateGSoapException(string soapFault, string soapFaultString) =>
            new GSoapClientException(
                requestID: RequestID,
                soapFault: soapFault,
                soapFaultString: soapFaultString
            );

        /// <summary>
        /// Factory method for SOAP serializer
        /// Create your own by overriding this method
        /// </summary>
        /// <returns></returns>
        protected virtual IGSoapSerializer CreateSoapSerializer(string url)
        {
            return new GSoapGenericSerializer(CreateGSoapException, url);
        }

        /// <summary>
        /// 👴 SendSOAP - "GSoapHttpClientProtocol2"
        /// </summary>
        /// <param name="request"></param>
        /// <param name="responseType"></param>
        /// <param name="soapAction"></param>
        /// <returns></returns>
        public object SendSOAP(object request, Type responseType, string soapAction = "")
        {
            var soapMessage = BuildHttpSOAPMessage(
                request,
                soapAction
            );

            using (var httpClient = CreateHttpClient())
            {
                using (var responseMessage = httpClient
                    .SendAsync(soapMessage)
                    .ConfigureAwait(true)
                    .GetAwaiter()
                    .GetResult()
                )
                {
                    var rawResponse = responseMessage
                        .Content
                        .ReadAsStringAsync()
                        .ConfigureAwait(true)
                        .GetAwaiter()
                        .GetResult();

                    Logger.Info("SOAP-Client-{RequestID} received {Method} [{statusCode1}-{statusCode2}] from: {Url}",
                        RequestID,
                        Method,
                        (int)responseMessage.StatusCode,
                        responseMessage.StatusCode,
                        Url
                    );

                    var soapResponse = CreateSoapSerializer(soapMessage.RequestUri.AbsoluteUri).ParseSoapObject(rawResponse, responseType);
                    switch (soapResponse)
                    {
                        case GSoapClientException soapException:
                            throw soapException;

                        default:
                            if (soapResponse.GetType() == responseType)
                            {
                                return soapResponse;
                            }

                            throw CreateGSoapException(
                                soapFault: $"SOAP-Response type mismatch, expected type: [{responseType.FullName}], returned: [{soapResponse.GetType().FullName}]",
                                soapFaultString: ""
                            );
                    }
                }
            }
        }

        /// <summary>
        /// 👍 Preffered
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="request"></param>
        /// <param name="soapAction"></param>
        /// <returns></returns>
        public T SendSOAP<T>(object request, string soapAction = "") where T : class
        {
            return SendSOAP(request, typeof(T), soapAction) as T;
        }

        protected virtual HttpClient CreateHttpClient() =>
            HttpClientFactory.CreateHttpClient(
                url: Url, 
                credentials: Credentials
            );

        /// <summary>
        /// Build SOAP http message
        /// </summary>
        /// <param name="request"></param>
        /// <param name="soapAction"></param>
        /// <returns></returns>
        protected virtual HttpRequestMessage BuildHttpSOAPMessage(object request, string soapAction)
        {
            var content = new StringContent(
                content: CreateSoapSerializer(Url).MakeSoapDocument(request),
                encoding: Encoding.UTF8,
                mediaType: "text/xml"
            );

            var requestMessage = new HttpRequestMessage(Method, Url)
            {
                Content = content
            };

            if(AddSoapHeader)
            {
                requestMessage.Headers.Add("SOAPAction", soapAction);
            }
            return requestMessage;
        }
    }
}
