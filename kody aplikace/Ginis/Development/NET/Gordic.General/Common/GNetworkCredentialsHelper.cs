//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GNetworkCredentialsHelper.cs                 </Name>
//    <Description> Tools for network credentials                               </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-05-29                                                  </Created>
//  </FileHeader>

using System;
using System.Net;

namespace Gordic.General
{
    /// <summary>
    /// Tools for network credentials
    /// </summary>
    public static class GNetworkCredentialsHelper
    {
        /// <summary>
        /// Create network credentials
        /// </summary>
        /// <param name="login">DOMAIN\login or login</param>
        /// <param name="password">password</param>
        /// <returns></returns>
        public static ICredentials CreateNetworkCredentials(string login, string password)
        {
            var loginPair = login.Split(new char[] { '\\' }, StringSplitOptions.RemoveEmptyEntries);
            if (loginPair.Length == 2)
            {
                return new NetworkCredential(loginPair[1], password, loginPair[0]);
            }

            return new NetworkCredential(login, password);
        }

        /// <summary>
        /// CreateNetworkCredentials
        /// </summary>
        /// <param name="domain"></param>
        /// <param name="login"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public static ICredentials CreateNetworkCredentials(string domain, string login, IPasswordSecret password)
        {
            return new NetworkCredential(login, password.Secret, domain);
        }
    }
}
