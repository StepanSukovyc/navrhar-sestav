//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IUndoHandler.cs                          </Name>
//    <Description> Rozhraní vrátných změn                                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-04-04                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.UndoRedoFramework
{
    /// <summary>
    /// Rozhraní vrátných změn
    /// </summary>
    public interface IUndoHandler
    {
        /// <summary>
        /// Lze změny vrátit
        /// </summary>
        bool EnableUndo { get; }

        /// <summary>
        /// Lze změny provest znovu
        /// </summary>
        bool EnableRedo { get; }

        /// <summary>
        /// Vrátit zpět
        /// </summary>
        void Undo();
        /// <summary>
        /// Provest znovu
        /// </summary>
        void Redo();
    }
}
