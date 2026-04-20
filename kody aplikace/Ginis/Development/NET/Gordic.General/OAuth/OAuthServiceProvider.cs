//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.OAuthServiceProvider.cs                      </Name>
//    <Description> Available service providers for OAuth                       </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2021                            </Copyright>
//    <Created>     2021-09-07                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{
    /// <summary>
    /// Available service providers for OAuth
    /// </summary>
    public enum OAuthServiceProvider
    {
        /// <summary>
        /// Azure
        /// </summary>
        MicrosoftAzure = 0,

        /// <summary>
        /// Google - pro budoucnost
        /// </summary>
        Google = 10,

        /// <summary>
        /// ČSAS
        /// </summary>
        CSAS = 30,

        /// <summary>
        /// Gordic
        /// </summary>
        Gordic = 40
    }
}
