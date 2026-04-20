//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGHttpProxyFactory.cs                        </Name>
//    <Description> Web-proxy factory                                           </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-11-14                                                  </Created>
//  </FileHeader>

using System.Net;

namespace Gordic.General
{
    /// <summary>
    /// Web-proxy factory
    /// </summary>
    public interface IGHttpProxyFactory
    {
        /// <summary>
        /// Create web proxy
        /// </summary>
        /// <returns></returns>
        IWebProxy CreateWebProxy();
    }
}
