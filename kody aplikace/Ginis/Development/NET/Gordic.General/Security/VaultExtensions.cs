//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.VaultExtensions.cs                           </Name>
//    <Description> VaultExtensions                                             </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-08-23                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;

namespace Gordic.General
{
    /// <summary>
    /// VaultExtensions
    /// </summary>
    public static class VaultExtensions
    {
        static readonly IGLogger LOG = GLogManager.CurrentClassLogger();

        /// <summary>
        /// ExecutePasswordSecret
        /// </summary>
        /// <typeparam name="R"></typeparam>
        /// <param name="vault"></param>
        /// <param name="path"></param>
        /// <param name="exists"></param>
        /// <param name="notExists"></param>
        /// <returns></returns>
        public static R UsingPasswordSecret<R>(
            this IGSecuredVault vault,
            string path,
            Func<IPasswordSecret, R> exists,
            Func<IPasswordSecret, R> notExists)
        {
            return UsingSecrets(
                vault: vault,
                secretRequests: new SecretRequest[]
                {
                    SecretRequest.Password(path)
                },
                exists: (secrets) => exists(secrets[0] as IPasswordSecret),
                notExists: (notFoundSecrets) => notExists(notFoundSecrets[0] as IPasswordSecret)
            );
        }

        /// <summary>
        /// WhenPasswordSecretExists
        /// </summary>
        /// <param name="vault"></param>
        /// <param name="path"></param>
        /// <param name="exists"></param>
        public static void WhenPasswordSecretExists(
            this IGSecuredVault vault,
            string path,
            Action<IPasswordSecret> exists)
        {
            var secret = vault.GetPasswordSecret(path);
            if(secret.Exists)
            {
                exists(secret);
            }
            else
            {
                LOG.Warn("Secret: [{path}] does not exists", path);
            }
        }

        /// <summary>
        /// UsingSecrets
        /// </summary>
        /// <typeparam name="R"></typeparam>
        /// <param name="vault"></param>
        /// <param name="secretRequests"></param>
        /// <param name="exists"></param>
        /// <param name="notExists"></param>
        /// <returns></returns>
        public static R UsingSecrets<R>(
            this IGSecuredVault vault,
            IEnumerable<SecretRequest> secretRequests,
            Func<ISecret[], R> exists,
            Func<ISecret[], R> notExists)
        {
            var secrets = secretRequests
                .Select(secretRequest => secretRequest.ToSecret(vault))
                .ToArray();

            try
            {
                if (secrets.All(existableSecret => existableSecret.Exists))
                {
                    LOG.Info($"All {secrets.Length} required secret(s) are ready to use");

                    var existingSecrets = secrets
                        .Where(secret => secret.Exists)
                        .ToArray();
                    Print(existingSecrets);
                    return exists(existingSecrets);
                }

                var notExistingSecrets = secrets
                    .Where(s => !s.Exists)
                    .ToArray();

                LOG.Error($"{notExistingSecrets.Length} out of {secrets.Length} required secret(s) are missing");
                Print(notExistingSecrets);
                return notExists(notExistingSecrets);
            }
            catch (Exception ex)
            {
                LOG.Error(ex, "Cannot execute secrets-block");
                throw;
            }
            finally
            {
                foreach (var disposableSecret in secrets)
                {
                    disposableSecret.Dispose();
                }
            }
        }

        static void Print(ISecret[] secrets)
        {
            foreach (var secret in secrets)
            {
                if (secret.Exists)
                {
                    LOG.Trace("Secret-OK: {secret}", secret);
                }
                else
                {
                    LOG.Error("Secret-MISSING: {secret}", secret);
                }
            }
        }

        /// <summary>
        /// SecretRequest
        /// </summary>
        public sealed class SecretRequest
        {
            readonly Type SecretType;
            readonly string Path;

            SecretRequest(Type secretType, string path)
            {
                SecretType = secretType;
                Path = path;
            }

            /// <summary>
            /// Password request
            /// </summary>
            /// <param name="path"></param>
            /// <returns></returns>
            public static SecretRequest Password(string path) =>
                new SecretRequest(typeof(IPasswordSecret), path);

            /// <summary>
            /// Certificatge request
            /// </summary>
            /// <param name="path"></param>
            /// <returns></returns>
            public static SecretRequest Certificate(string path) =>
                new SecretRequest(typeof(ICertificateSecret), path);

            internal ISecret ToSecret(IGSecuredVault vault)
            {
                if (SecretType == typeof(IPasswordSecret))
                {
                    return vault.GetPasswordSecret(Path);
                }
                else if (SecretType == typeof(ICertificateSecret))
                {
                    return vault.GetCertificateSecret(Path);
                }

                throw new NotImplementedException($"SecretRequest-{SecretType} is not implemented");
            }
        }

    }
}
