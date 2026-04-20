//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IAnchored.cs                             </Name>
//    <Description> Rozhraní kotvy                                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní kotvy
    /// </summary>
    public interface IAnchorHandler
    {
        /// <summary>
        /// Indikuje, kdy všechny vybrané objekty jsou ukotvené
        /// </summary>
        bool AllAnchored { get; }

        /// <summary>
        /// Spuštění akce ukotvení/odkotvení
        /// </summary>
        /// <param name="value">TRUE - ukotvit, FALSE - odkotvit</param>
        void Anchor(bool value);
    }

    /// <summary>
    /// Rozhraní kotvících objektů
    /// </summary>
    public interface IAnchored
    {
        /// <summary>
        /// Ukotvení
        /// </summary>
        bool Anchor { get; set; }
    }
}
