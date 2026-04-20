//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GHttpClientCertificateValidator.cs           </Name>
//    <Description> Http-client certificate validator                           </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-01-31                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Concurrent;
using System.Net;
using System.Net.Http;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;

namespace Gordic.General
{
    /// <summary>
    /// Http-client certificate validator
    /// </summary>
    public static class GHttpClientCertificateValidator
    {
        static readonly ConcurrentDictionary<string, Func<string, object, X509Certificate, X509Chain, SslPolicyErrors, bool>> RegisteredValidations = new ConcurrentDictionary<string, Func<string, object, X509Certificate, X509Chain, SslPolicyErrors, bool>>();
        static IGSystemConfiguration SystemConfiguration => GComponentCatalog.Mediate<IGSystemConfiguration>();
        static string GetFaze()
        {
            try
            {
                return SystemConfiguration.GetSystemParameter(GParamNames.Faze, string.Empty);
            }
            catch
            {
                return "---";
            }
        }

        static bool AllowUnstrustedSslCertificate
        {
            get
            {
                if (bool.TryParse(
                    SystemConfiguration.GetSystemParameter(GParamNames.AllowUnstrustedSslCertificate, "false"),
                    out bool allowUnstrustedSslCertificate
                ))
                {
                    return allowUnstrustedSslCertificate;
                }

                return false;
            }
        }

        internal static void RaiseToStage(RuntimeStages stage)
        {
            if (stage == RuntimeStages.Stage2)
            {
                if (AllowUnstrustedSslCertificate)
                {
                    GLogManager.SECURITY.Warn("[AllowUnstrustedSslCertificate] is set to [true] - NOT SECURED, ONLY FOR DEV!");
                    RegisterServerCertValidation(
                        module: GetFaze(),
                        certValidation: AcceptInvalidCertificate
                    );
                }
                else
                {
                    GLogManager.SECURITY.Info("[AllowUnstrustedSslCertificate] is set to [false] - secured");
                    RegisterServerCertValidation(
                        module: GetFaze(),
                        certValidation: AcceptValidCertificate
                    );
                }
            }
        }

        internal static bool ValidateTrustHttpClient(
            HttpRequestMessage requestMessage,
            X509Certificate2 cert,
            SslPolicyErrors errors
        )
        {
            var validationResult = errors == SslPolicyErrors.None;

            LogValidationResult(
                cert: cert,
                url: requestMessage.RequestUri?.AbsoluteUri,
                module: GetFaze(),
                errors: errors,
                validationResult: validationResult
            );

            if (AllowUnstrustedSslCertificate)
            {
                GLogManager.SECURITY.Fatal("Accepting INVALID certificate[{Module}]: {Cert}, hash: {Hash}, SSL/TLS: {Errors}",
                    requestMessage,
                    cert.Subject,
                    cert.GetCertHashString(),
                    errors
                );
                return true;
            }

            return validationResult;
        }

        /// <summary>
        /// Register https cert. validation
        /// </summary>
        /// <param name="module">for NLog (multiple validations)</param>
        /// <param name="certValidation"></param>
        public static void RegisterServerCertValidation(
            string module,
            Func<string, object, X509Certificate, X509Chain, SslPolicyErrors, bool> certValidation
        )
        {
            RegisteredValidations.GetOrAdd(
                module,
                valueFactory =>
                {
                    GLogManager.SECURITY.Trace("RegisterServerCertValidation - adding validation module: {Module}", module);
                    ServicePointManager.ServerCertificateValidationCallback += new RemoteCertificateValidationCallback(
                        (sender, cert, chain, errors) =>
                        {
                            var validationResult = certValidation.Invoke(
                                module,
                                sender,
                                cert,
                                chain,
                                errors
                            );
                            LogValidationResult(
                                cert,
                                GetUrl(sender),
                                module,
                                errors,
                                validationResult
                            );
                            return validationResult;
                        }
                    );
                    return certValidation;
                }
            );
        }

        static string GetUrl(object sender)
        {
            if (sender is HttpWebRequest webRequest)
            {
                return (webRequest.Address?.AbsoluteUri) ?? "---";
            }

            return "---";
        }

        static void LogValidationResult(
            X509Certificate cert,
            string url,
            string module,
            SslPolicyErrors errors,
            bool validationResult)
        {
            if (!validationResult)
            {
                GLogManager.SECURITY.Error("ServerCertValidation: cert: [{Cert}], url: [{Url}], module: {Module}, SSL/TLS: {Errors}, result: {Result}",
                    cert == null ? "NULL cert!" : cert.ToString(),
                    url,
                    module,
                    errors,
                    validationResult
                );
            }
            else
            {
                GLogManager.SECURITY.Info("ServerCertValidation: cert: [{Cert}], url: [{Url}], module: {Module}, SSL/TLS: {Errors}, result: {Result}",
                    cert == null ? "NULL cert!" : cert.ToString(),
                    url,
                    module,
                    errors,
                    validationResult
                );
            }
        }

        static bool AcceptInvalidCertificate(string module, object sender, X509Certificate cert, X509Chain chain, SslPolicyErrors errors)
        {
            if (errors == SslPolicyErrors.None)
            {
                GLogManager.SECURITY.Info("Accepting certificate[{Module}]: {Cert}, hash: {Hash}",
                    module,
                    cert.Subject,
                    cert.GetCertHashString()
                );
            }
            else
            {
                GLogManager.SECURITY.Fatal("Accepting INVALID certificate[{Module}]: {Cert}, hash: {Hash}, SSL/TLS: {Errors}",
                    module,
                    cert.Subject,
                    cert.GetCertHashString(),
                    errors
                );
            }
            return true;
        }

        static bool AcceptValidCertificate(string module, object sender, X509Certificate cert, X509Chain chain, SslPolicyErrors errors)
        {
            if (errors == SslPolicyErrors.None)
            {
                GLogManager.SECURITY.Info("Accepting certificate[{Module}]: {Cert}, hash: {Hash}",
                    module,
                    cert.Subject,
                    cert.GetCertHashString()
                );
                return true;
            }

            GLogManager.SECURITY.Fatal("Blocking INVALID certificate[{Module}]: {Cert}, hash: {Hash}, SSL/TLS: {Errors}",
                module,
                cert.Subject,
                cert.GetCertHashString(),
                errors
            );
            return false;
        }
    }
}
