//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGAuthorizationService.cs                    </Name>
//    <Description> Authorization result                                        </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-07-12                                                  </Created>
//  </FileHeader>

using Gordic.App.Core;
using System.Collections.Immutable;

namespace Gordic.General
{
    /// <summary>
    /// Authorization translation (login -> auth result)
    /// </summary>
    public interface IGEslAuthorizationService
    {
        /// <summary>
        /// Token/ticket/... => auth object
        /// </summary>
        /// <param name="claims"></param>
        /// <param name="sessionObject"></param>
        /// <returns></returns>
        IGEslAuthorization Authorize(ImmutableArray<ExtensionAttribute> claims, object sessionObject);

        /// <summary>
        /// AuthorizeOnBehalf - service got token
        /// </summary>
        /// <param name="claims"></param>
        /// <param name="sessionObject"></param>
        /// <returns></returns>
        IGEslAuthorization AuthorizeOnBehalf(ImmutableArray<ExtensionAttribute> claims, object sessionObject);
    }
}
