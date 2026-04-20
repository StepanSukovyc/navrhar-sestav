//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.Command.cs                               </Name>
//    <Description> Příkaz undo/redo                                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using Gordic.GFE.Parsers.Services;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.UndoRedoFramework
{
    /// <summary>
    /// výčet možných ukončení akce
    /// </summary>
    public enum CommandDoneType { Commit, Undo, Redo }
    /// <summary>
    /// handler argumentu akce
    /// </summary>
    public class CommandDoneEventArgs : EventArgs
    {
        public readonly CommandDoneType CommandDoneType;
        public CommandDoneEventArgs(CommandDoneType type)
        {
            CommandDoneType = type;
        }
    }

    /// <summary>
    /// Příkaz undo/redo
    /// </summary>
    [ComVisible(false)]
    public class Command : Dictionary<IUndoRedoMember, object>, IDisposable
    {
        /// <summary>
        /// titulek příkazu
        /// </summary>
        public readonly string Caption;
        /// <summary>
        /// Vytvoření příkazu s titulkem
        /// </summary>
        /// <param name="caption">Titulek příkazu</param>
        public Command(string caption) { Caption = caption; }

        #region IDisposable
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            UndoRedoService.Dispose(this);
        }
        ~Command() { Dispose(false); }
        #endregion

        /// <summary>
        /// Prázdný příkaz
        /// </summary>
        public static IDisposable Empty { get; set; }
    }
}
