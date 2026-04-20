//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.Interface1.cs                                </Name>
//    <Description> GINIS cross-platform path mapper                            </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-03-08                                                  </Created>
//  </FileHeader>


namespace Gordic.General
{
    /// <summary>
    /// GINIS cross-platform path mapper
    /// </summary>
    public interface IGPathMapper
    {
        /// <summary>
        /// Map relative path to absolute
        /// </summary>
        /// <param name="relativePath"></param>
        /// <returns></returns>
        string GetAbsolutePath(string relativePath);
    }
}
