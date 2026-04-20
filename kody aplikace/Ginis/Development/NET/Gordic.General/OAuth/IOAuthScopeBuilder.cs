//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IOAuthScopeBuilder.cs                        </Name>
//    <Description> Build scope for selected service                            </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-01-31                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;

namespace Gordic.General
{
    /// <summary>
    /// Build scope for selected service
    /// </summary>
    public interface IOAuthScopeBuilder
    {
        IEnumerable<string> GetScopes(IGOAuthProfile profile, OAuthService service);
    }
}
