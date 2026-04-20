//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IFormFormation.cs                        </Name>
//    <Description> Rozhraní forulářu                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-14                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní forulářu
    /// </summary>
    public interface IFormFormation
    {
        OpenedFile FormFile { get; set; }
    }
}
