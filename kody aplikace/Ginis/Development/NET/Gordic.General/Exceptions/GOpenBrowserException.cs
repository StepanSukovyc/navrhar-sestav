//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GOpenBrowserException.cs                     </Name>
//    <Description> Open browser (OAuth) request                                </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-04-28                                                  </Created>
//  </FileHeader>

using System;
using System.Web;

namespace Gordic.General
{
    /// <summary>
    /// Open browser (OAuth) request
    /// </summary>
    [Serializable]
    public sealed class GOpenBrowserException : GNonFatalException
    {
        /// <summary>
        /// Url
        /// </summary>
        public readonly Uri RedirectUri;

        /// <summary>
        /// MS_Client_Credentials_State_FIX
        ///   HOT-FIX 14.9.2022 - pro otevirani userprocess
        ///   je treba pridat state do vyjimky
        /// </summary>
        public string MS_Client_Credentials_State_FIX => HttpUtility
            .ParseQueryString(RedirectUri.Query)
            .Get("state");

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="redirectUri"></param>
        public GOpenBrowserException(Uri redirectUri)
        {
            RedirectUri = redirectUri;
        }
    }
}
