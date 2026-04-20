//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IPasswordSecret.cs                           </Name>
//    <Description> Password secret                                             </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-04-14                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{
    /// <summary>
    /// Password secret
    /// </summary>
    /// <summary>
    /// GINIS Secret representation
    /// </summary>
    public interface IPasswordSecret : ISecret
    {
        /// <summary>
        /// Value of secret
        /// </summary>
        string Secret
        {
            get;
        }
    }
}
