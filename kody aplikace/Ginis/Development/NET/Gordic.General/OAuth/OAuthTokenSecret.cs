//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.OAuthTokenSecret.cs                          </Name>
//    <Description> OAuth negotiated token                                      </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2021                            </Copyright>
//    <Created>     2021-10-19                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;

namespace Gordic.General
{
    /// <summary>
    /// OAuth negotiated token
    /// </summary>
    public class OAuthTokenSecret : IPasswordSecret, ISecretDateValidity
    {
        /// <summary>
        /// TokenType
        /// </summary>
        public readonly OAuthTokenType TokenType;

        /// <summary>
        /// ExpiresAt
        /// </summary>
        public readonly DateTime ExpiresAt;

        readonly string Token;

        /// <summary>
        /// Scope
        /// </summary>
        public readonly SecretScope Scope;

        /// <summary>
        /// Profile
        /// </summary>
        public GString Profile;

        /// <summary>
        /// Service
        /// </summary>
        public readonly OAuthService Service;

        /// <summary>
        /// ServiceScopes
        /// </summary>
        public readonly IEnumerable<string> ServiceScopes;

        /// <summary>
        /// Null token
        /// </summary>
        /// <param name="tokenType"></param>
        /// <param name="service"></param>
        /// <param name="secretScope"></param>
        /// <param name="profile"></param>
        /// <param name="serviceScopes"></param>
        /// <returns></returns>
        public static OAuthTokenSecret Null(
            OAuthTokenType tokenType,
            OAuthService service,
            SecretScope secretScope,
            GString profile,
            IEnumerable<string> serviceScopes
        ) => 
            new OAuthTokenSecret(
                secretValue: "",
                tokenType: tokenType,
                expiresAt: DateTime.Now,
                service: service,
                secretScope: secretScope,
                profile: profile,
                serviceScopes: serviceScopes
            )
            {
                Exists = false
            };

        /// <summary>
        /// Null
        /// </summary>
        /// <param name="tokenType"></param>
        /// <returns></returns>
        public static OAuthTokenSecret Null(OAuthTokenType tokenType) =>
            new OAuthTokenSecret(
                secretValue: "",
                tokenType: tokenType,
                expiresAt: DateTime.Now,
                service: OAuthService.Unknown,
                secretScope: SecretScope.Unknown,
                profile: string.Empty,
                serviceScopes: Enumerable.Empty<string>()
            )
            {
                Exists = false
            };

        /// <summary>
        /// OAuthTokenSecret
        /// </summary>
        /// <param name="secretValue"></param>
        /// <param name="tokenType"></param>
        /// <param name="expiresIn">token lifetime (secs)</param>
        /// <param name="service"></param>
        /// <param name="secretScope"></param>
        /// <param name="profile"></param>
        /// <param name="serviceScopes"></param>
        public OAuthTokenSecret(
            string secretValue,
            OAuthTokenType tokenType,
            int expiresIn,
            OAuthService service,
            SecretScope secretScope,
            GString profile,
            IEnumerable<string> serviceScopes
        )
        {
            Exists = true;
            Scope = secretScope;
            Token = secretValue;
            TokenType = tokenType;
            ExpiresAt = DateTime.Now.AddSeconds(expiresIn);
            Service = service;
            Profile = profile;
            ServiceScopes = serviceScopes;
        }

        /// <summary>
        /// OAuthTokenSecret
        /// </summary>
        /// <param name="secretValue"></param>
        /// <param name="tokenType"></param>
        /// <param name="expiresAt"></param>
        /// <param name="service"></param>
        /// <param name="secretScope"></param>
        /// <param name="profile"></param>
        /// <param name="serviceScopes"></param>
        public OAuthTokenSecret(
            string secretValue,
            OAuthTokenType tokenType,
            DateTime expiresAt,
            OAuthService service,
            SecretScope secretScope,
            GString profile,
            IEnumerable<string> serviceScopes)
        {
            Exists = true;
            Scope = secretScope;
            Token = secretValue;
            TokenType = tokenType;
            ExpiresAt = expiresAt;
            Service = service;
            Profile = profile;
            ServiceScopes = serviceScopes;
        }

        int Used = 0;
        /// <summary>
        /// IPasswordSecret implementation
        /// </summary>
        public string Secret
        {
            get
            {
                Used++;
                if (Used == 1)
                {
                    GLogManager.SECURITY.Info("{token} TOKEN has been revealed", ToString());
                }
                else
                {
                    GLogManager.SECURITY.Warn("{token} TOKEN has been revealed", ToString());
                }
                return Token;
            }
        }

        SecretScope ISecret.Scope => Scope;

        string ISecret.VaultId => "OAuth";

        string ISecret.Path => $"{Scope}/{TokenType}/{Service}";

        /// <summary>
        /// No null
        /// </summary>
        public bool Exists
        {
            get;
            private set;
        }

        /// <summary>
        /// IsBeforeExpiration
        /// </summary>
        /// <returns></returns>
        public bool IsTimeValid() => IsDateValid_Internal(DateTime.Now);

        bool ISecretDateValidity.IsDateValid(DateTime date) => IsDateValid_Internal(date);


        bool IsDateValid_Internal(DateTime dateTime) => DateTime.Compare(dateTime, ExpiresAt) < 0;


        /// <summary>
        /// ToString
        /// </summary>
        /// <returns></returns>
        public override string ToString() => $"{(this as ISecret).Path}: {(Exists ? "Exists" : "EMPTY")} - [{GetHashCode()} - {ExpiresAt}], {string.Join(" ", ServiceScopes)}";

        void IDisposable.Dispose()
        {
            GLogManager.SECURITY.Trace("OAuth secret({token}) has been disposed from memory", ToString());
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// TokenEquals
        /// </summary>
        /// <param name="tokenType"></param>
        /// <param name="service"></param>
        /// <param name="scope"></param>
        /// <param name="profile"></param>
        /// <param name="serviceScopes"></param>
        /// <returns></returns>
        public bool TokenEquals(
            OAuthTokenType tokenType,
            OAuthService service,
            SecretScope scope,
            GString profile,
            IEnumerable<string> serviceScopes
        ) =>
            TokenType == tokenType &&
            Service == service &&
            Scope == scope &&
            Profile == profile &&
            ServiceScopes.SequenceEqual(serviceScopes);

        /// <summary>
        /// EQ
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        public bool EQ(OAuthTokenSecret token) =>
            token.TokenEquals(
                TokenType,
                Service,
                Scope,
                Profile,
                ServiceScopes
            );

        /// <summary>
        /// TokenEqualsBy
        /// </summary>
        /// <param name="state"></param>
        /// <param name="tokenType"></param>
        /// <returns></returns>
        public bool TokenEqualsBy(string state, OAuthTokenType tokenType) =>
            state == Secret &&
            tokenType == TokenType;
    }
}
