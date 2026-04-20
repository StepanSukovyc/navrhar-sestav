//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGOAuthTokenProviderFactory.cs               </Name>
//    <Description> OAuth token provider                                        </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-04-13                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{
    /// <summary>
    /// OAuth token provider
    /// </summary>
    public interface IGOAuthTokenProviderFactory
    {
        /// <summary>
        /// VerifyOAuth
        /// </summary>
        /// <param name="service"></param>
        /// <param name="ixs_oap"></param>
        /// <returns></returns>
        bool VerifyOAuth(OAuthService service, GString ixs_oap);

        /// <summary>
        /// Create token provider
        /// </summary>
        /// <param name="service"></param>
        /// <param name="ixs_oap"></param>
        /// <returns></returns>
        IOAuthTokenProvider CreateByProfile(OAuthService service, GString ixs_oap);

        /// <summary>
        /// Create token provider
        /// </summary>
        /// <param name="state"></param>
        /// <returns></returns>
        IOAuthTokenProvider CreateByState(string state);
    }
}
