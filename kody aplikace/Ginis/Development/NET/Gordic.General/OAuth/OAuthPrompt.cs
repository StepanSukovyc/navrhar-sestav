//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.OAuthPrompt.cs                               </Name>
//    <Description> OAuthPrompt for OAuth profil                                </Description>
//    <Author>      JKlusacek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-02-17                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{
    /// <summary>
    /// OAuthPrompt for OAuth profil
    /// </summary>
    [Serializable]
    public enum OAuthPrompt
    {
        /// <summary>
        /// Default
        /// </summary>
        Default = 0,

        /// <summary>
        /// Forces the user to enter their credentials on that request, negating single-sign on
        /// </summary>
        Login = 10,

        /// <summary>
        /// It is the opposite. It ensures that the user isn't presented with any interactive prompt. If the request can't be completed silently by using single-sign on, the Microsoft identity platform returns an interaction_required error.
        /// </summary>
        None = 20,

        /// <summary>
        /// Consent triggers the OAuth consent dialog after the user signs in, asking the user to grant permissions to the app.
        /// </summary>
        Consent = 30,

        /// <summary>
        /// Select_account interrupts single sign-on providing account selection experience listing all the accounts either in session or any remembered account or an option to choose to use a different account altogether.
        /// </summary>
        SelectAccount = 40
    }
}
