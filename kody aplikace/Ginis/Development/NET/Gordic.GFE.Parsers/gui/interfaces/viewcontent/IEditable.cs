//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IEditable.cs                             </Name>
//    <Description> Rozhraní editovatelných tříd                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní editovatelných tříd
    /// </summary>
    public interface IEditable
    {
        /// <summary>
        /// Text
        /// </summary>
        string Text { get; set; }
    }
}
