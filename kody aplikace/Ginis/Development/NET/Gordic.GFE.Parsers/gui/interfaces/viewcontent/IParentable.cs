//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.IParentable.cs                           </Name>
//    <Description> Rizhraní objektů s vlastníkem                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rizhraní objektů s vlastníkem
    /// </summary>
    public interface IParentable : IReadOnly
    {
        /// <summary>
        /// Vlastník objektu implementujícího toto rozhraní
        /// </summary>
        ISizable Parent { get; set; }
    }
}
