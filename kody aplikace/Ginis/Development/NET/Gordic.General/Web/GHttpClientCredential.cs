//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GHttpClientCredential.cs                     </Name>
//    <Description> GHttpClientCredential - support for IGHttpClientFactory     </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-06-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Net;
using System.Security.Cryptography.X509Certificates;

namespace Gordic.General
{
    /// <summary>
    /// GHttpClientCredential - support for IGHttpClientFactory
    /// </summary>
    public sealed class GHttpClientCredential
    {
        static readonly IGLogger Logger = GLogManager.CurrentClassLogger();

        /// <summary>
        /// Login
        /// </summary>
        public readonly string Login;

        /// <summary>
        /// Secret
        /// </summary>
        public readonly object Secret;

        private GHttpClientCredential(object directCredential)
        {
            Secret = directCredential;
        }

        private GHttpClientCredential(string login, ISecret secret)
        {
            Login = login;
            Secret = secret;
        }

        readonly List<GHttpClientCredential> Builder;
        public GHttpClientCredential()
        {
            Builder = new List<GHttpClientCredential>();
        }

        /// <summary>
        /// Build
        /// </summary>
        /// <param name="login"></param>
        /// <param name="passwordSecret"></param>
        /// <returns></returns>
        public static GHttpClientCredential Build(string login, IPasswordSecret passwordSecret) =>
            new GHttpClientCredential(login, passwordSecret);

        /// <summary>
        /// Build
        /// </summary>
        /// <param name="certificateSecret"></param>
        /// <returns></returns>
        public static GHttpClientCredential Build(ICertificateSecret certificateSecret) =>
            new GHttpClientCredential("", certificateSecret);

        /// <summary>
        /// Build
        /// </summary>
        /// <param name="certificateSecret"></param>
        /// <returns></returns>
        public static IEnumerable<GHttpClientCredential> BuildSingle(ICertificateSecret certificateSecret) =>
            new GHttpClientCredential[] { Build(certificateSecret) };

        /// <summary>
        /// Build - Gordic.General.ApplicationServer.GSoapHttpClientProtocol2
        /// </summary>
        /// <param name="cert"></param>
        /// <returns></returns>
        public static GHttpClientCredential Build(X509Certificate2 cert) =>
            new GHttpClientCredential(cert);

        /// <summary>
        /// Build - Gordic.General.ApplicationServer.GSoapHttpClientProtocol2
        /// </summary>
        /// <param name="credentials"></param>
        /// <returns></returns>
        public static GHttpClientCredential Build(NetworkCredential credentials) =>
            new GHttpClientCredential(credentials);

        public GHttpClientCredential[] Build()
        {
            return Builder.ToArray();
        }

        public GHttpClientCredential Add(NetworkCredential credential)
        {
            if (credential == null)
            {
                Logger.Warn("Network credential is null - skipping adding to HttpClientCredential");
                return this;
            }

            Builder.Add(new GHttpClientCredential(credential));
            return this;
        }

        public GHttpClientCredential Add(X509Certificate2 clientCertificate)
        {
            if(clientCertificate == null)
            {
                Logger.Warn("Client certificate is null - skipping adding to HttpClientCredential");
                return this;
            }

            Builder.Add(new GHttpClientCredential(clientCertificate));
            return this;
        }

        public GHttpClientCredential Add(ICredentials credential)
        {
            if(credential == null)
            {
                Logger.Warn("Credentials is null - skipping adding to HttpClientCredential");
                return this;
            }

            Builder.Add(new GHttpClientCredential(credential));
            return this;
        }
    }
}
