//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.UndoRedo.cs                              </Name>
//    <Description> Jednotka Undo/Redo operace                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Diagnostics;
using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.Parsers.UndoRedoFramework
{
    /// <summary>
    /// Jednotka Undo/Redo operace
    /// </summary>
    /// <typeparam name="TValue">Typ parametru</typeparam>
    [DebuggerDisplay("{Value}")]
    public class UndoRedo<TValue> : IUndoRedoMember
    {
        public UndoRedo() { tValue = default; }
        public UndoRedo(TValue defaultValue) { tValue = defaultValue; }

        TValue tValue;
        public TValue Value
        {
            get { return tValue; }
            set
            {
                IUndoRedoManager manager = UndoRedoService.Manager;
                if (manager != null)
                {
                    //manager.AssertCommand();
                    if (manager.CurrentCommand != null
                        && !manager.CurrentCommand.ContainsKey(this))
                    {
                        Change<TValue> change = new Change<TValue>
                        {
                            OldState = tValue
                        };
                        manager.CurrentCommand[this] = change;
                    }
                }
                tValue = value;
            }
        }

        #region IUndoRedoMember Members

        void IUndoRedoMember.OnCommit(object change)
        {
            Debug.Assert(change != null);
            ((Change<TValue>)change).NewState = tValue;
        }

        void IUndoRedoMember.OnUndo(object change)
        {
            Debug.Assert(change != null);
            tValue = ((Change<TValue>)change).OldState;
        }

        void IUndoRedoMember.OnRedo(object change)
        {
            Debug.Assert(change != null);
            tValue = ((Change<TValue>)change).NewState;
        }
        #endregion
    }
}
