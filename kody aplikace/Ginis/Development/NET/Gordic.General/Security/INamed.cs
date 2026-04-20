//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.INamed.cs                                    </Name>
//    <Description> Base named object                                           </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-11-10                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{
    /// <summary>
    /// Base named object
    /// </summary>
    public interface INamed
    {
        /// <summary>
        /// Name
        /// </summary>
        string Name
        {
            get;
        }
    }
}
