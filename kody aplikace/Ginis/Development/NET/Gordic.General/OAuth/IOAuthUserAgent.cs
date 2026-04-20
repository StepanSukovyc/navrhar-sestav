//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Support.Mail.IOAuthUserAgent.cs                      </Name>
//    <Description> OAuth user agent                                            </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2021                            </Copyright>
//    <Created>     2021-07-15                                                  </Created>
//  </FileHeader>

using System;
using System.Threading;

namespace Gordic.General
{
    /// <summary>
    /// OAuth user agent
    /// </summary>
    public interface IOAuthUserAgent
    {
        /// <summary>
        /// Open browser
        /// </summary>
        /// <param name="profile"></param>
        /// <param name="uri"></param>
        void StartBrowser(IGOAuthProfile profile, Uri uri);

        /// <summary>
        /// Show user code to support device-code flow
        /// </summary>
        /// <param name="profile"></param>
        /// <param name="userCodeSecret"></param>
        void ShowUserCode(IGOAuthProfile profile, IPasswordSecret userCodeSecret);

        /// <summary>
        /// StopToken
        /// </summary>
        CancellationToken StopToken
        {
            get;
        }

        /// <summary>
        /// Get description
        /// </summary>
        string Name
        {
            get;
        }
    }
}
