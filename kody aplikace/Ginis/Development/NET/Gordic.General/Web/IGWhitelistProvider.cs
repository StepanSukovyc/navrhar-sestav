//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGWhitelistProvider.cs                       </Name>
//    <Description> White list url provider                                     </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-12-07                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{
    /// <summary>
    /// White list url provider
    /// </summary>
    public interface IGWhitelistProvider
    {
        /// <summary>
        /// Is url allowed?
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        bool IsAllowed(string url);
    }
}
