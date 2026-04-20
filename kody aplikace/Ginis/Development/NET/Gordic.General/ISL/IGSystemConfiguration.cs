//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGSystemConfiguration.cs                     </Name>
//    <Description> Simple configuration for cross-layer                        </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-04-13                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{
    /// <summary>
    /// Simple configuration for cross-layer
    /// Should be IGConfiguration - but is too complex
    /// (server activated IGMailInfo,...)
    /// </summary>
    public interface IGSystemConfiguration
    {
        /// <summary>
        /// Get parameter from .Configuration. <see cref="GParamNames"/>
        /// </summary>
        /// <param name="name"></param>
        /// <param name="defaultValue"></param>
        /// <returns></returns>
        string GetSystemParameter(string name, string defaultValue);
    }
}
