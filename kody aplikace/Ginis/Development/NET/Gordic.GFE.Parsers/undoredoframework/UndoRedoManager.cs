//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.UndoRedoManager.cs                       </Name>
//    <Description> Správce Undo/Redo operaci                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using Gordic.General;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.UndoRedoFramework
{
    /// <summary>
    /// Správce Undo/Redo operaci
    /// </summary>
    public class UndoRedoManager : IUndoRedoManager, IDisposable
    {
        #region IDisposable
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (currentCommand != null)
                {
                    currentCommand.Dispose();
                    currentCommand = null;
                }
            }
        }
        ~UndoRedoManager() { Dispose(false); }
        #endregion

        #region IUndoRedoManager
        /// <summary>
        /// aktuálně běžící příkaz
        /// </summary>
        public Command CurrentCommand { get { return currentCommand; } }
        /// <summary>
        /// pro bezpečný přístup k metodám
        /// </summary>
        readonly object syncRoot = new object();
        /// <summary>
        /// Ukončí aktuální příkaz a uloží změny do historie
        /// </summary>
        public void Commit()
        {
            lock (syncRoot)
            {
                AssertCommand();
                if (currentCommand.Count != 0)
                {
                    foreach (IUndoRedoMember member in currentCommand.Keys)
                        if (member != null && currentCommand.ContainsKey(member))
                            member.OnCommit(currentCommand[member]);

                    // přidat příkaz do historie (všechny redo záznamy budou odstraněny)
                    int count = history.Count - currentPosition - 1;
                    history.RemoveRange(currentPosition + 1, count);

                    history.Add(currentCommand);
                    currentPosition++;
                    TruncateHistory();
                    OnCommandDone(CommandDoneType.Commit);
                }
                currentCommand = null;
            }
        }

        /// <summary>
        /// Rollback aktuální příkaz. Neukládá žádné změny.
        /// </summary>
        public void Cancel()
        {
            lock (syncRoot)
            {
                AssertCommand();
                foreach (IUndoRedoMember member in currentCommand.Keys)
                    if (member != null)
                        member.OnUndo(currentCommand[member]);
                currentCommand = null;
            }
        }
        /// <summary>
        /// Vrátit zpět poslední příkaz z seznamu historie
        /// </summary>
        public void Undo()
        {
            lock (syncRoot)
            {
                AssertNoCommand();
                if (CanUndo)
                {
                    Command command = history[currentPosition--];
                    foreach (IUndoRedoMember member in command.Keys)
                        if (member != null)
//#if DEBUG
                            member.OnUndo(command[member]);
//#else
//                            try { member.OnUndo(command[member]); }
//                            catch { }
//#endif
                    OnCommandDone(CommandDoneType.Undo);
                }
            }
        }
        /// <summary>
        /// Opakuje příkaz, který byl odvolán
        /// </summary>
        public void Redo()
        {
            lock (syncRoot)
            {
                AssertNoCommand();
                if (CanRedo)
                {
                    Command command = history[++currentPosition];
                    foreach (IUndoRedoMember member in command.Keys)
                        if (member != null)
//#if DEBUG
                            member.OnRedo(command[member]);
//#else
//                            try { member.OnRedo(command[member]); }
//                            catch { }
//#endif
                            OnCommandDone(CommandDoneType.Redo);
                }
            }
        }
        /// <summary>Kontroluje, zda příkaz byl spuštěn</summary>
        public void AssertCommand()
        {
            if (currentCommand == null)
                throw new InvalidOperationException(string.Join(" ", GResources.GetResourceText(29450489), GResources.GetResourceText(29450490), "UndoRedoManager.Start()!")); //RC 29450490 : Použijte metodu
        }
        /// <summary>
        /// Spuštění příkazu. Jakékoli změny dat musí být provedené v rámci příkazu.
        /// </summary>
        /// <param name="commandCaption"></param>
        /// <returns></returns>
        public IDisposable StartTransaction(string commandCaption)
        {
            try { AssertNoCommand(); }
            catch (InvalidOperationException)
            {
                MessageService.ShowCustomDialog(GResources.GetResourceText(29450761), GResources.GetResourceText(29450762), 0, -1, "OK");
                Cancel();
            }

            currentCommand = new Command(commandCaption);
            return currentCommand;
        }

        /// <summary>
        /// Vymaže celou historii. To nemá vliv na aktuální data, ale jen historií. 
        /// </summary>
        public void FlushHistory()
        {
            lock (syncRoot)
            {
                currentCommand = null;
                currentPosition = -1;
                history.Clear();
            }
        }

        /// <summary>
        /// Volá se po provedení příkazu UNDO nebo REDO
        /// </summary>
        public event EventHandler<CommandDoneEventArgs> CommandDone;
        /// <summary>
        /// Indikuje stav, kdy příkaz je spuštěn
        /// </summary>
        public bool IsTransactionStarted { get { return currentCommand != null; } }

        /// <summary>
        /// Vrací true, pokud historie má příkaz, který může být odvolán
        /// </summary>
        public bool CanUndo { get { return currentPosition >= 0; } }
        /// <summary>
        /// Vrací true, pokud historie má příkaz, který může být přepracován
        /// </summary>
        public bool CanRedo { get { return currentPosition < history.Count - 1; } }

        #endregion

        List<Command> history = new List<Command>();
        int currentPosition = -1;
        Command currentCommand = null;

        /// <summary>
        /// Získá / nastaví max. příkazy uložené v historii. 
        /// Nulová hodnota (default) stanoví neomezenou velikost historie.
        /// </summary>
        public int MaxHistorySize
        {
            get { return maxHistorySize; }
            set
            {
                if (IsTransactionStarted)
                    throw new InvalidOperationException(GResources.GetResourceText(29450491)); //RC 29450491 : Maximální velikost nesmí být nastavováná, když je příkaz spuštěn!
                if (value < 0)
                    throw new ArgumentOutOfRangeException(GResources.GetResourceText(29450492)); //RC 29450492 : Hodnota nesmí být menší než 0!
                maxHistorySize = value;
                TruncateHistory();
            }
        }

        /// <summary>Získá výčet příkazů, které lze vracet.</summary>
        /// <remarks>První příkaz ve výčtu bude první vrácen</remarks>
        public IEnumerable<string> UndoCommands
        {
            get
            {
                for (int i = currentPosition; i >= 0; i--)
                    yield return history[i].Caption;
            }
        }

        /// <summary>Získá výčet příkazů, které mohou být přepracováné.</summary>
        /// <remarks></remarks>
        public IEnumerable<string> RedoCommands
        {
            get
            {
                for (int i = currentPosition + 1; i < history.Count; i++)
                    yield return history[i].Caption;
            }
        }

        /// <summary>Kontroly zda není žádný příkaz spuštěn</summary>
        void AssertNoCommand()
        {
            if (currentCommand != null)
                throw new InvalidOperationException(string.Join(" ", GResources.GetResourceText(29450493), GResources.GetResourceText(29450494), "UndoRedoManager.Commit()", GResources.GetResourceText(29450495))); //RC 29450495 : pro ukončení aktuálního příkazu!
        }
        void OnCommandDone(CommandDoneType type)
        {
            CommandDone?.Invoke(null, new CommandDoneEventArgs(type));
        }
        int maxHistorySize = 0;
        void TruncateHistory()
        {
            if (maxHistorySize > 0)
                if (history.Count > maxHistorySize)
                {
                    int count = history.Count - maxHistorySize;
                    history.RemoveRange(0, count);
                    currentPosition -= count;
                }
        }
    }
}
