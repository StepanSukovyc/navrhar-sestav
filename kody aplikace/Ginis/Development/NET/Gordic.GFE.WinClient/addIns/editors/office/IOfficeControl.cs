//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IOfficeControl.cs                      </Name>
//    <Description> Rozhraní objektu Microsoft Office                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-23                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;

namespace Gordic.GFE.WinClient.FormatOffice
{
    /// <summary>
    /// Rozhraní objektu Microsoft Office
    /// </summary>
    public interface IOfficeControl
    {
        /// <summary>
        /// Vložení do objektu
        /// </summary>
        /// <param name="sender">Vlastnik</param>
        /// <param name="e">Argument tažení</param>
        void ItemDrag(object sender, ItemDragEventArgs e);
    }
}
