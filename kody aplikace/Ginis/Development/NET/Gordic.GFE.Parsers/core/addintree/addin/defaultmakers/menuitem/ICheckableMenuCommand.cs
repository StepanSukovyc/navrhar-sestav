//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ICheckableMenuCommand.cs                 </Name>
//    <Description> Rozhraní položek ve tvaru zaškrtavatek                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-10                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Rozhraní položek ve tvaru zaškrtavatek
    /// </summary>
    public interface ICheckableMenuCommand : IMenuCommand
    {
        /// <summary>
        /// Indikuje stav zaškrtnutí
        /// </summary>
        bool IsChecked { get; set; }
    }
}
