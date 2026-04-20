//  <FileHeader xmlns = "http://www.gordic.cz/shared/file-header/v_1.0.0.0" >
//    <Name>        Gordic.Support.Mail.IGOAuthRuntime.cs                       </Name>
//    <Description> OAuth runtime                                               </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2021                            </Copyright>
//    <Created>     2021-07-15                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{
    /// <summary>
    /// OAuth runtime
    /// </summary>
    public interface IGOAuthRuntime
    {
        /// <summary>
        /// Create configuration by profile ID
        /// </summary>
        /// <param name="profile"></param>
        /// <returns></returns>
        IGOAuthProfile LoadProfile(GString profile);

        /// <summary>
        /// Config
        /// </summary>
        bool IsWebapplication
        {
            get;
        }

        /// <summary>
        /// TokenStorage
        /// </summary>
        IOAuthTokenStorage TokenStorage
        {
            get;
        }

        /// <summary>
        /// UserAgent
        /// </summary>
        IOAuthUserAgent UserAgent
        {
            get;
        }
    }
}
