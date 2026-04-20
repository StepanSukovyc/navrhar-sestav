//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IStatusUpdate.cs                         </Name>
//    <Description> Rozhraní položek menu                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-04-16                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní aktualizovatelných položek menu
    /// </summary>
    public interface IStatusUpdate
    {
        /// <summary>
        /// Interní viditelnost objektu
        /// </summary>
        bool InternVisible { get; }
        /// <summary>
        /// Akce pro aktualizací statusu
        /// </summary>
        void UpdateStatus();
        /// <summary>
        /// Aktualizace textu
        /// </summary>
        void UpdateText();
    }
}
