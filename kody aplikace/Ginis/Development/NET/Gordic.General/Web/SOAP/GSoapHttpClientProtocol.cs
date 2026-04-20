//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationServer.GSoapHttpClientProtocol.cs </Name>
//    <Description> Base class for SoapHttpClientProtocol proxies               </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-11-10                                                  </Created>
//  </FileHeader>

using System;
using System.Linq;
using System.Net;
using System.Web;


#if NETFRAMEWORK
using System.Web.Services.Protocols;
using Gordic.General.ApplicationInterface;
#else
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using System.Security.Cryptography.X509Certificates;
#endif

namespace Gordic.General
{
#if NETFRAMEWORK
    /// <summary>
    /// Base class for SoapHttpClientProtocol proxies
    /// Drop-in replacement for SoapHttpClientProtocol
    /// Handle TLS normalization, whitelisting, telemetry, tenant headers
    /// 
    /// Works ONLY IN .48 (not .NET Core / .NET 5+)
    /// For core use <see cref="GSoapHttpClient"/>"/>
    /// </summary>
    public class GSoapHttpClientProtocol : SoapHttpClientProtocol
    {
        protected virtual bool NormalizeTLS => true;
        protected virtual bool SendTenantHeader => false;

        protected virtual IGTenant BuildTenantForRequest() => null;

        readonly static IGLogger Logger = GLogManager.CurrentClassLogger();
        SecurityProtocolType RequestedSslTls;
        IGSystemConfiguration SystemConfiguration => GComponentCatalog.Mediate<IGSystemConfiguration>();
        string Revize => SystemConfiguration.GetSystemParameter(GParamNames.Revize, "---");
        string IxsRef = string.Empty;

        /// <summary>
        /// Compatibility hack - see GetWebResponse
        /// </summary>
        public Action<HttpWebResponse> AfterResponseReceived
        {
            get;
            set;
        }

        string _RequestID;
        string RequestID
        {
            get => _RequestID ?? (_RequestID = new Guid().ToString());
            set
            {
                if (_RequestID == null)
                {
                    _RequestID = value;
                }
            }
        }

        /// <summary>
        /// Last HTTP status code from response
        /// </summary>
        public int StatusCode
        {
            get;
            private set;
        }


        /// <summary>
        /// Last HTTP status code from response
        /// </summary>
        public string AibVersion
        {
            get;
            private set;
        } = string.Empty;

        protected override WebResponse GetWebResponse(WebRequest request)
        {
            var response = base.GetWebResponse(request);

            if(response is HttpWebResponse webResponse)
            {
                StatusCode = (int)webResponse.StatusCode;
                AibVersion = GAibGlobals.TryGetAibVersion(webResponse);

                if (webResponse.StatusCode.IsSuccessStatusCode())
                {
                    Logger.Debug("Received SOAP-http[{Url}] response - StatusCode:[{statusCode}] for {requestID}",
                        webResponse.ResponseUri,
                        webResponse.StatusCode,
                        RequestID
                    );
                }
                else
                {
                    Logger.Error("Received SOAP-http[{Url}] response - StatusCode:[{statusCode}] for {requestID}",
                        webResponse.ResponseUri,
                        webResponse.StatusCode,
                        RequestID
                    );
                }

                AfterResponseReceived?.Invoke(webResponse);
            }

            return response;
        }

        /// <summary>
        /// Send telemetry (only for AIB)
        /// </summary>
        public bool SendTelemetry
        {
            get;
            private set;
        }

        /// <summary>
        /// SendTelemetry
        /// </summary>
        /// <param name="sessionInfo"></param>
        /// <param name="activityID"></param>
        public void TelemetryOn(IGSessionInfo sessionInfo, string activityID = null)
        {
            SendTelemetry = true;
            IxsRef = sessionInfo.IxsRef;
            RequestID = activityID;
        }

        /// <summary>
        /// GSoapHttpClientProtocol
        /// </summary>
        public GSoapHttpClientProtocol(SecurityProtocolType requestedSslTls)
        {
            Logger.Warn("Creating GSoapHttpClientProtocol - {RequestedSslTls}", requestedSslTls);
            RequestedSslTls = requestedSslTls;
        }

        /// <summary>
        /// GSoapHttpClientProtocol
        /// </summary>
        public GSoapHttpClientProtocol()
        {
            Logger.Info("Creating GSoapHttpClientProtocol - SystemDefault");
            RequestedSslTls = SecurityProtocolType.SystemDefault;
        }

        /// <summary>
        /// Get web request for uri
        /// </summary>
        /// <param name="uri"></param>
        /// <returns></returns>
        protected override WebRequest GetWebRequest(Uri uri)
        {
            if (NormalizeTLS)
            {
                NormalizeTlsForUri();
            }

            // pokud je Whitelist zaregistrován a adresa není povolena
            if (WhitelistProvider != null && !WhitelistProvider.IsAllowed(uri.AbsoluteUri))
            {
                throw new GAccessDeniedException(24700002, 24700001, uri.AbsoluteUri); // Požadovaná url adresa není povolena systémem GINIS: {0}
            }

            var webRequest = base.GetWebRequest(uri);

            if (SendTelemetry)
            {
                webRequest.Headers.Add("G-TraceContextEnabled", "true");
                webRequest.Headers.Add("x-gordic-id", RequestID);
                webRequest.Headers.Add("x-gordic-revize", Revize);
                webRequest.Headers.Add("x-gordic-ixsref", IxsRef);
            }

            if(SendTenantHeader)
            {
                var tenant = BuildTenantForRequest();
                if (tenant != null)
                {
                    AibTenantFormatter.AddMultitenantHeadersNET48(webRequest, tenant);
                }
            }

            LogCurrentWebRequest(webRequest);
            return webRequest;
        }

        void NormalizeTlsForUri()
        {
            if (RequestedSslTls == SecurityProtocolType.SystemDefault)
            {
                RequestedSslTls =
                    SecurityProtocolType.SystemDefault
                    | SecurityProtocolType.Tls12
                    | SecurityProtocolType.Tls13
                ;
                Logger.Info("Setting SSL/TLS to: {RequestedSslTls}", RequestedSslTls);
            }
            else
            {
                Logger.Warn("Setting SSL/TLS to: {RequestedSslTls} - please reconsider SystemDefault", RequestedSslTls);
            }

            try
            {
                GServicePointManager48.SecurityProtocol = RequestedSslTls;
            }
            catch (Exception ex)
            {
                Logger.Error(ex, "Systém nelze přepnout na automatické vyjednání nejnovější verze protokolu SSL/TLS. Kontaktujte Vašeho IT správce.");
            }
        }

        /// <summary>
        /// Může vrátit NULL, pokud není Whitelist zaregistrován.
        /// </summary>
        IGWhitelistProvider WhitelistProvider => GComponentCatalog.Mediate<IGWhitelistProvider>(true);

        void LogCurrentWebRequest(WebRequest webRequest) =>
            Logger.Info("SOAP-http client for: [{url}] - SSL/TLS:[{tls}], global-set to: [{sys_tls}] - {requestID}",
                webRequest.RequestUri,
                GHttpClientFactory.GetSslTls(webRequest),
                GServicePointManager48.SecurityProtocol,
                RequestID
            );
    }
}
#else
    /// <summary>
    /// GSoapHttpClientProtocol - SoapHttpClientProtocol replacement for generated proxies
    /// Similiar to  <see cref="GSoapHttpClient"/> but works in .NET Framework and .NET Core / .NET 5+
    /// 
    /// Experimental-POC !
    /// </summary>
    public class GSoapHttpClientProtocol
    {
        /// <summary>
        /// SoapHttpClientProtocol compatibility
        /// </summary>
        public NetworkCredential Credentials { get; set; }

        /// <summary>
        /// SoapHttpClientProtocol compatibility
        /// </summary>
        public readonly IList<X509Certificate2> ClientCertificates = new List<X509Certificate2>();

        /// <summary>
        /// SoapHttpClientProtocol compatibility
        /// </summary>
        public string Url
        {
            get;
            set;
        }
        public bool UseDefaultCredentials { get; set; }

        protected object[] Invoke(string methodName, object[] parameters)
        {
            var soapHttpClient = new GSoapHttpClient(Url, BuildCredentials());
            var methodInfo = new StackFrame(1).GetMethod() as MethodInfo;
            var returnType = methodInfo.ReturnType;

            var soapResult = soapHttpClient.SendSOAP(
                request: parameters[0],
                responseType: returnType,
                soapAction: ""
            );

            return new object[] { soapResult };
            // var a1 = methodInfo.GetCustomAttributes(true)[0] as SoapDocumentMethodAttribute;
            // var x = methodType as MethodInfo;
            // var returnXmlAttribute = methodInfo.ReturnTypeCustomAttributes.GetCustomAttributes(true)[0];
        }

        IEnumerable<GHttpClientCredential> BuildCredentials()
        {
            var credentials = new List<GHttpClientCredential>();

            if (Credentials != null)
            {
                credentials.Add(GHttpClientCredential.Build(Credentials));
            }

            credentials.AddRange(ClientCertificates.Select(cert => GHttpClientCredential.Build(cert)));
            return credentials;
        }

        protected IAsyncResult BeginInvoke(string methodName, object[] parameters, AsyncCallback callback, object asyncState)
        {
            throw new GNotImplementedException("GSoapHttpClientProtocol2.BeginInvoke");
        }

        protected object[] EndInvoke(IAsyncResult asyncResult)
        {
            throw new GNotImplementedException("GSoapHttpClientProtocol2.BeginInvoke");
        }
    }
}
#endif