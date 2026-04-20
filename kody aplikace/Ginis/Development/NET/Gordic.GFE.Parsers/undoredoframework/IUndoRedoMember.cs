//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IUndoRedoMember.cs                       </Name>
//    <Description> člen undo/redo příkazu                                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.UndoRedoFramework
{
    /// <summary>
    /// Stav pro UNDO/REDO
    /// </summary>
    /// <typeparam name="TState"></typeparam>
    public class Change<TState>
    {
        /// <summary>
        /// Starý stav objektu
        /// </summary>
        public TState OldState;
        /// <summary>
        /// Nový stav objektu
        /// </summary>
        public TState NewState;
    }
    /// <summary>
    /// člen undo/redo příkazu
    /// </summary>
    public interface IUndoRedoMember
    {
        /// <summary>
        /// Potvrzení provedení příkazu
        /// </summary>
        /// <param name="change">Změna</param>
        void OnCommit(object change);
        /// <summary>
        /// Příkaz Zpět
        /// </summary>
        /// <param name="change">Změna</param>
        void OnUndo(object change);
        /// <summary>
        /// Příkaz znovu provest
        /// </summary>
        /// <param name="change">Změna</param>
        void OnRedo(object change);
    }
}
