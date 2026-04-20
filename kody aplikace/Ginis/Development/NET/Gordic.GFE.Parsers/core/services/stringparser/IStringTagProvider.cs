//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IStringTagProvider.cs                    </Name>
//    <Description> Rozhraní poskytovatelů řetězcových štítků                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Rozhraní poskytovatelů řetězcových štítků
    /// </summary>
    public interface IStringTagProvider
    {
        /// <summary>
        /// Štítky
        /// </summary>
        string[] Tags { get; }

        /// <summary>
        /// Konverze
        /// </summary>
        /// <param name="tag">štítek</param>
        /// <returns></returns>
        string Convert(string tag);
    }
}
