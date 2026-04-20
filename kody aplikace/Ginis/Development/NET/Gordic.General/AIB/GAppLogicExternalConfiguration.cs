//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.GAppLogicConfiguration.cs</Name>
//    <Description> Base configuration for connectors(external) logics          </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-05-29                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{
    /// <summary>
    /// Base configuration for connectors(external) logics
    /// </summary>
    [Serializable]
    public class GAppLogicExternalConfiguration : IGExternalLogicTransferConfig
    {
        /// <summary>
        /// GAppLogicExternalConfiguration
        /// </summary>
        public GAppLogicExternalConfiguration()
        {
            ProviderName = "UNKNOWN";
        }

        /// <summary>
        /// GAppLogicExternalConfiguration
        /// </summary>
        /// <param name="parent"></param>
        public GAppLogicExternalConfiguration(object parent)
        {
            ProviderName = parent.GetType().FullName;
        }

        /// <summary>
        /// ProviderName
        /// </summary>
        public readonly string ProviderName;

        /// <summary>
        /// Faze
        /// </summary>
        public string Faze
        {
            get;
            set;
        }

        /// <summary>
        /// AIB_Enabled
        /// </summary>
        public bool AIB_Enabled
        {
            get;
            set;
        }

        /// <summary>
        /// Login pro AIB
        /// </summary>
        public string AIB_UserName
        {
            get;
            set;
        }

        /// <summary>
        /// Heslo pro AIB
        /// </summary>
        public IPasswordSecret AIB_Password
        {
            get;
            set;
        }

        /// <summary>
        /// Doména pro AIB
        /// </summary>
        public string AIB_Domain
        {
            get;
            set;
        }

        /// <summary>
        /// Main service url
        /// </summary>
        public string Url
        {
            get;
            set;
        }

        /// <summary>
        /// Timeout pro volání (web) služby
        /// </summary>
        public int Timeout
        {
            get;
            set;
        } = 100000; // ms

        /// <summary>
        /// Url pro proxy
        /// </summary>
        public string HTTP_ProxyUrl
        {
            get;
            set;
        }

        /// <summary>
        /// Login pro proxy
        /// </summary>
        public string HTTP_ProxyLogin
        {
            get;
            set;
        }

        /// <summary>
        /// Heslo pro proxy
        /// </summary>
        public string HTTP_ProxyPassword
        {
            get;
            set;
        }

        /// <summary>
        /// Typ autentikace pro proxy
        /// </summary>
        public GProxyType HTTP_ProxyAuthType
        {
            get;
            set;
        }
    }
}
