//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.IUndoRedoManager.cs                      </Name>
//    <Description> Rozhraní správců undo/redo operací                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.Parsers.UndoRedoFramework
{
    /// <summary>
    /// Rozhraní správců undo/redo operací
    /// </summary>
    public interface IUndoRedoManager
    {
        /// <summary>
        /// aktuální příkaz
        /// </summary>
        Command CurrentCommand { get; }
        /// <summary>
        /// Ukončí aktuální příkaz a uloží změny do historie
        /// </summary>
        void Commit();
        /// <summary>
        /// Rollback aktuální příkaz. Neukládá žádné změny.
        /// </summary>
        void Cancel();
        /// <summary>
        /// Vrátit zpět poslední příkaz z seznamu historie
        /// </summary>
        void Undo();
        /// <summary>
        /// Opakuje příkaz, který byl odvolán
        /// </summary>
        void Redo();
        /// <summary>
        /// Kontroluje, zda příkaz byl spuštěn
        /// </summary>
        void AssertCommand();

        /// <summary>
        /// Spuštění příkazu. Jakékoli změny dat musí být provedené v rámci příkazu.
        /// </summary>
        /// <param name="commandCaption">titulek příkazu</param>
        /// <returns></returns>
        IDisposable StartTransaction(string commandCaption);
        /// <summary>
        /// Vymaže celou historii. To nemá vliv na aktuální data, ale jen historií. 
        /// </summary>
        void FlushHistory();
        /// <summary>
        /// Volá se po provedení příkazu
        /// </summary>
        event EventHandler<CommandDoneEventArgs> CommandDone;

        /// <summary>
        /// Indikuje stav, kdy příkaz je spuštěn
        /// </summary>
        bool IsTransactionStarted { get; }
        /// <summary>
        /// Vrací true, pokud historie má příkaz, který může být odvolán
        /// </summary>
        bool CanUndo { get; }
        /// <summary>
        /// Vrací true, pokud historie má příkaz, který může být přepracován
        /// </summary>
        bool CanRedo { get; }
    }
}
