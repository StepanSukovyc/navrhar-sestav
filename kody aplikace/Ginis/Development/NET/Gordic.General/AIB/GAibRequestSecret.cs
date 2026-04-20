//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GAibRequestSecret.cs                         </Name>
//    <Description> AIB secret - restored from request (server on AIB)          </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-03-19                                                  </Created>
//  </FileHeader>

using Newtonsoft.Json;
using System;
using System.IO;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace Gordic.General
{
    /// <summary>
    /// AIB transferable secret - restored from request (server on AIB)
    /// * transfereable
    /// * cloneable
    /// * disposable
    /// </summary>
    [Serializable]
    public class GAibRequestSecret
    {
        public static IPasswordSecret NullPassword(string path, IGSecuredVault vault)
        {
            return new PasswordSecret(false, SecretScope.Global, vault.Id, path, string.Empty);
        }

        protected GAibRequestSecret(bool exists, SecretScope scope, string vaultId, string path)
        {
            Exists = exists;
            Scope = SecretScope.Global;
            VaultId = vaultId;
            Path = path;
        }

        public bool Exists
        {
            get;
        }

        public SecretScope Scope
        {
            get;
        }

        public string VaultId
        {
            get;
        }

        public string Path
        {
            get;
        }

        [Serializable]
        sealed class PasswordSecret : GAibRequestSecret, IPasswordSecret
        {
            [JsonConstructor]
            internal PasswordSecret(bool exists, SecretScope scope, string vaultId, string path, string secret) : base(exists, scope, vaultId, path)
            {
                Secret = secret;
            }

            internal PasswordSecret(IPasswordSecret passwordSecret) : base(passwordSecret.Exists, passwordSecret.Scope, passwordSecret.VaultId, passwordSecret.Path)
            {
                Secret = passwordSecret.Secret;
            }

            public string Secret
            {
                get;
            }

            void IDisposable.Dispose()
            {
            }
        }

        [Serializable]
        sealed class CertificateSecret : GAibRequestSecret, ICertificateSecret
        {
            [JsonConstructor]
            internal CertificateSecret(bool exists, SecretScope scope, string vaultId, string path, X509Certificate2 secret) : base(exists, scope, vaultId, path)
            {
                Certificate = secret;
            }

            public CertificateSecret(ICertificateSecret certificateSecret) : base(certificateSecret.Exists, certificateSecret.Scope, certificateSecret.VaultId, certificateSecret.Path)
            {
                Certificate = certificateSecret.Certificate;
                IsCertificateDateValid = certificateSecret.IsCertificateDateValid;
            }

            public X509Certificate2 Certificate
            {
                get;
            }

            public bool IsCertificateDateValid
            {
                get;
            }

            public void Dispose()
            {
            }
        }

        static ISecret Clone(ISecret secret)
        {
            switch (secret)
            {
                case IPasswordSecret passwordSecret:
                    return new PasswordSecret(passwordSecret);

                case ICertificateSecret certificateSecret:
                    return new CertificateSecret(certificateSecret);
            }

            throw new ArgumentNullException(nameof(secret));
        }

        public static string SerializeAndDispose(ISecret secret)
        {
            var transferableSecret = Clone(secret);
            secret.Dispose();

            var json = JsonConvert.SerializeObject(transferableSecret);
            var base64 = Convert.ToBase64String(Encoding.UTF8.GetBytes(json));
            switch (secret)
            {
                case IPasswordSecret _:
                    return $"IPasswordSecret:{base64}";

                case ICertificateSecret _:
                    return $"ICertificateSecret:{base64}";
            }

            throw new ArgumentNullException(nameof(secret));
        }

        public static ISecret Deserialize(string base64)
        {
            if(base64.StartsWith("IPasswordSecret:"))
            {
                var decoded = Encoding.UTF8.GetString(Convert.FromBase64String(base64.Substring("IPasswordSecret:".Length)));
                return JsonConvert.DeserializeObject<PasswordSecret>(decoded);
            }
            else if (base64.StartsWith("ICertificateSecret:"))
            {
                var decoded = Encoding.UTF8.GetString(Convert.FromBase64String(base64.Substring("ICertificateSecret:".Length)));
                return JsonConvert.DeserializeObject<CertificateSecret>(decoded);
            }

            throw new ArgumentNullException(nameof(base64));
        }
    }
}