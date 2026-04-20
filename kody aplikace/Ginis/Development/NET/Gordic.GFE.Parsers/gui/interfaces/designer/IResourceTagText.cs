//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IResourceTagText.cs                      </Name>
//    <Description> Rozhraní zdrojových textů                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní zdrojových textů
    /// </summary>
    public interface IResourceTagText
    {
        /// <summary>
        /// ID zdroje lokalizovaného textu
        /// </summary>
        string ResourceID { get; set; }
        /// <summary>
        /// ID zdroje lokalizovaného textu
        /// </summary>
        string ResourceIDValue { get; set; }
    }
}
