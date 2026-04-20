//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IXMLContent.cs                           </Name>
//    <Description> rozhraní objektů s XML obsahem                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-29                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// rozhraní objektů s XML obsahem
    /// </summary>
    public interface IXMLContent
    {
        /// <summary>
        /// obsah ve formátu XML
        /// </summary>
        string InnerText { get; set; }
    }
}
