//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGEslAuthorization.cs                        </Name>
//    <Description> ESL Authorization result                                    </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-07-15                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Security.Principal;

namespace Gordic.General
{
    /// <summary>
    /// ESL Authorization result
    /// </summary>
    public interface IGEslAuthorization : IPrincipal
    {
        /// <summary>
        /// Claims
        /// </summary>
        KeyValuePair<string, string>[] Claims { get; }
    }
}
