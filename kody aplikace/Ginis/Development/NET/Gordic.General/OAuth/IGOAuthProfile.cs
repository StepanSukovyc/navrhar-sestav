//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGOAuthProfile.cs                            </Name>
//    <Description> OAuth config profile                                        </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-10-07                                                  </Created>
//  </FileHeader>


using System.Collections.Immutable;

namespace Gordic.General
{
    /// <summary>
    /// CSAS_Types
    /// </summary>
    public enum CSAS_Types
    {
        /// <summary>
        /// Production
        /// </summary>
        Production = 0,

        /// <summary>
        /// Sandbox
        /// </summary>
        Sandbox = 10
    }

    /// <summary>
    /// OAuth config attribute (profile extension)
    /// </summary>
    public sealed class OAuthAttribute
    {
        public OAuthAttribute(string name, string value)
        {
            Name = name;
            Value = value;
        }

        public readonly string Name;
        public readonly string Value;
    }

    /// <summary>
    /// OAuth config profile
    /// </summary>
    public interface IGOAuthProfile
    {
        /// <summary>
        /// Id of profile (ixp_oap)
        /// </summary>
        string Id
        {
            get;
        }

        /// <summary>
        /// Service provider
        /// </summary>
        OAuthServiceProvider ServiceProvider
        {
            get;
        }

        /// <summary>
        /// Flow
        /// </summary>
        OAuthFlow Flow
        {
            get;
        }

        /// <summary>
        /// Tenant ID - MS specific
        /// </summary>
        string MS_TenantId
        {
            get;
        }

        /// <summary>
        /// CSAS_ApiKey
        /// </summary>
        IPasswordSecret CSAS_ApiKey
        {
            get;
        }

        /// <summary>
        /// CSAS_Type
        /// </summary>
        CSAS_Types CSAS_Type
        {
            get;
        }

        /// <summary>
        /// MS_ResponseMode
        /// </summary>
        OAuthPrompt Prompt
        {
            get;
        }

        /// <summary>
        /// Client ID
        /// </summary>
        string ClientId
        {
            get;
        }

        /// <summary>
        /// Client secret
        /// </summary>
        IPasswordSecret ClientSecret
        {
            get;
        }

        /// <summary>
        /// Redirect url
        /// </summary>
        string RedirectUrl
        {
            get;
        }

        /// <summary>
        /// Name
        /// </summary>
        string Name
        {
            get;
        }

        /// <summary>
        /// Additional properties
        /// </summary>
        ImmutableArray<OAuthAttribute> Attributes
        {
            get;
        }
    }
}
