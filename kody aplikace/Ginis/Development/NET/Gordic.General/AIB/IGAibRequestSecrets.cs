//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGAibRequestSecrets.cs                       </Name>
//    <Description> POC - transfer credentials to AIB                           </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-03-04                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;

namespace Gordic.General
{
    /// <summary>
    /// Request secrets collection for AIB
    /// </summary>
    public readonly struct GAibRequestSecrets
    {
        readonly IPasswordSecret[] PasswordSecrets;
        readonly ICertificateSecret[] CertificateSecrets;

        /// <summary>
        /// Get all secrets
        /// </summary>
        /// <returns></returns>
        public IEnumerable<ISecret> GetSecrets()
        {
            var passwordSecrets = PasswordSecrets == null ? Array.Empty<ISecret>() : PasswordSecrets.Cast<ISecret>();
            var certificateSecrets = CertificateSecrets == null ? Array.Empty<ISecret>() : CertificateSecrets.Cast<ISecret>();
            return passwordSecrets.Concat(certificateSecrets);
        }

        /// <summary>
        /// Empty collection
        /// </summary>
        public static GAibRequestSecrets Empty => new GAibRequestSecrets(new IPasswordSecret[0], new ICertificateSecret[0]);

        private GAibRequestSecrets(IPasswordSecret[] passwordSecrets, ICertificateSecret[] certificateSecrets)
        {
            PasswordSecrets = passwordSecrets;
            CertificateSecrets = certificateSecrets;
        }

        static IGSecuredVault Vault => GComponentCatalog.Mediate<IGSecuredVault>();

        /// <summary>
        /// Build collection of secrets
        /// </summary>
        /// <param name="secretNames"></param>
        /// <param name="certificateNames"></param>
        /// <returns></returns>
        public static GAibRequestSecrets Build(string[] secretNames, string[] certificateNames)
        {
            return new GAibRequestSecrets
            (
                passwordSecrets: secretNames.Select(secretName => Vault.GetPasswordSecret(secretName)).ToArray(),
                certificateSecrets: certificateNames.Select(certificateName => Vault.GetCertificateSecret(certificateName)).ToArray()
            );
        }

        /// <summary>
        /// Build collection of secrets
        /// </summary>
        /// <param name="secretNames"></param>
        /// <returns></returns>
        public static GAibRequestSecrets BuildPasswordSecrets(params string[] secretNames)
        {
            return new GAibRequestSecrets
            (
                passwordSecrets: secretNames.Select(secretName => Vault.GetPasswordSecret(secretName)).ToArray(),
                certificateSecrets: Array.Empty<ICertificateSecret>()
            );
        }

        /// <summary>
        /// Build collection of secrets
        /// </summary>
        /// <param name="secrets"></param>
        /// <returns></returns>
        public static GAibRequestSecrets BuildSecrets(params ISecret[] secrets)
        {
            return new GAibRequestSecrets
            (
                passwordSecrets: secrets.OfType<IPasswordSecret>().ToArray(),
                certificateSecrets: secrets.OfType<ICertificateSecret>().ToArray()
            );
        }
    }
}
