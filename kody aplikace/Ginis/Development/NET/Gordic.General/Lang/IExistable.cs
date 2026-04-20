//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IExistable.cs                                </Name>
//    <Description> Base existable                                              </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-11-07                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{
    /// <summary>
    /// Base existable
    /// </summary>
    public interface IExistable
    {
        /// <summary>
        /// Exists
        /// </summary>
        bool Exists
        {
            get;
        }
    }
}
