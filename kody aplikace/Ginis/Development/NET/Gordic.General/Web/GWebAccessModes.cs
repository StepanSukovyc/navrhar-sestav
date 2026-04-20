//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GWebAccessModes.cs                           </Name>
//    <Description> Web access modes                                            </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-12-07                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{
    /// <summary>
    /// Web access modes
    /// </summary>
    public enum GWebAccessModes
    {
        /// <summary>
        /// Strict mode, 
        /// </summary>
        Strict,

        /// <summary>
        /// Whitelist is off
        /// </summary>
        Unsecured
    }
}
