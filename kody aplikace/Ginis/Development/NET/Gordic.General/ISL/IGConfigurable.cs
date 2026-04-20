//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.IGConfigurable.cs       </Name>
//    <Description> Configure sink - configure your logic as requested          </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-05-29                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{
    /// <summary>
    /// Configure sink - configure your logic as requested
    /// </summary>
    public interface IGConfigurable
    {
        /// <summary>
        /// Configure
        /// </summary>
        /// <param name="dependency"></param>
        void Configure(object dependency);
    }
}
