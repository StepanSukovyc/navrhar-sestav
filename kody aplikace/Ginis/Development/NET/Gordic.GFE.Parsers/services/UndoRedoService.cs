//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.UndoRedoService.cs                       </Name>
//    <Description> Služba pro práci s UNDO/REDO objekty                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Diagnostics;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.UndoRedoFramework;

namespace Gordic.GFE.Parsers.Services
{
    /// <summary>
    /// Služba pro práci s UNDO/REDO objekty
    /// </summary>
    public static class UndoRedoService
    {
        /// <summary>
        /// Položka s informaci o správci zdrojů aplikace.
        /// </summary>
        sealed class UndoManagerItem
        {
            /// <summary>
            /// Správce zdroju aplikace
            /// </summary>
            public IUndoRedoManager Manager { get; private set; }

            /// <summary>
            /// Konstruktir položky
            /// </summary>
            /// <param name="manager">Správce zdrojů</param>
            public UndoManagerItem(IUndoRedoManager manager)
            {
                Manager = manager;
            }
        }

        sealed class ManagerDictionary : Dictionary<IViewContent, UndoManagerItem>
        {
            //public EventHandlerNonArgumentViewContent ActiveViewContentHandler { get; private set; }
            //public ManagerDictionary(EventHandlerNonArgumentViewContent handler)
            //{
            //    ActiveViewContentHandler = handler;
            //}
        }

        static Dictionary<int, ManagerDictionary> managersCach = new Dictionary<int, ManagerDictionary>();

        /// <summary>
        /// Připojení zdrojů do správce WinFormsResourceService
        /// </summary>
        /// <param name="content">Obsah jako klíč ke zdrojům</param>
        /// <param name="manager">Správce lokálních zdrojů</param>
        public static void AttachContent(IViewContent content, IUndoRedoManager manager)
        {
            int id = Process.GetCurrentProcess().Id;
            if (!managersCach.ContainsKey(id))
                managersCach.Add(id, new ManagerDictionary());

            if (!managersCach[id].ContainsKey(content))
                managersCach[id].Add(content, null);

            managersCach[id][content] = new UndoManagerItem(manager);
        }

        /// <summary>
        /// Odpojení lokálních zdrojů
        /// </summary>
        /// <param name="content">Obsah jako klíč k lokálním zdrojům</param>
        public static void DetachContent(IViewContent content)
        {
            int id = Process.GetCurrentProcess().Id;
            if (managersCach.ContainsKey(id) && managersCach[id].ContainsKey(content))
                managersCach[id].Remove(content);
        }

        public static void DetachProcess(Process process)
        {
            if (managersCach.ContainsKey(process.Id))
                managersCach.Remove(process.Id);
        }

        /// <summary>
        /// Aktuální správce Undo/redo operací
        /// </summary>
        public static IUndoRedoManager Manager
        {
            get
            {
                ManagerDictionary item = GetCurrentItem();
                IDesktop desktop = ProcessService.Desktop;
                if (item != null && desktop != null)
                {
                    IViewContent content = desktop.ActiveViewContent;
                    if (content != null && item.ContainsKey(content))
                        return item[content].Manager;
                }
                return null;
            }
        }

        /// <summary>
        /// Uvolnění příkazu
        /// </summary>
        /// <param name="command"></param>
        public static void Dispose(Command command)
        {
            ManagerDictionary item = GetCurrentItem();
            if (item != null)
            {
                foreach (KeyValuePair<IViewContent, UndoManagerItem> keyValue in item)
                {
                    IUndoRedoManager manager = keyValue.Value?.Manager;
                    if (manager == null) return;

                    if (manager.CurrentCommand != null)
                        if (manager.CurrentCommand == command)
                            manager.Cancel();
                        //else
                        //    Debug.Fail("Nesouhlas příkazů.");   
                }
                //IUndoRedoManager manager = Manager;
                //if (manager == null) return;

                //if (Manager.CurrentCommand != null)
                //    if (Manager.CurrentCommand == command)
                //        Manager.Cancel();
                //    else
                //        Debug.Fail("Nesouhlas příkazů.");
            }
        }

        static ManagerDictionary GetCurrentItem()
        {
            int id = Process.GetCurrentProcess().Id;
            if (managersCach.Count != 0 && managersCach.ContainsKey(id))
                return managersCach[id];
            return null;
        }

        /// <summary>
        /// Vrátit zpět poslední příkaz z seznamu historie
        /// </summary>
        public static void Undo()
        {
            IUndoRedoManager manager = Manager;
            if (manager == null) return;
            manager.Undo();
        }
        /// <summary>
        /// Opakuje příkaz, který byl odvolán
        /// </summary>
        public static void Redo()
        {
            IUndoRedoManager manager = Manager;
            if (manager == null) return;
            manager.Redo();
        }

        /// <summary>
        /// Spuštění příkazu. Jakékoli změny dat musí být provedené v rámci příkazu.
        /// </summary>
        /// <param name="commandCaption"></param>
        /// <returns></returns>
        public static IDisposable StartTransaction(string commandCaption)
        {
            IUndoRedoManager manager = Manager;
            return manager == null ? Command.Empty : manager.StartTransaction(commandCaption);
        }

        public static void FlushHistory()
        {
            IUndoRedoManager manager = Manager;
            if (manager != null)
            {
                //počkáme na zámky
                ThreadService.WaitForLockers();
                manager.FlushHistory();
            }
        }

        public static void Commit()
        {
            IUndoRedoManager manager = Manager;
            if (manager != null)
            {
                //počkáme na zámky
                ThreadService.WaitForLockers();
                manager.Commit();
            }
        }
        /// <summary>
        /// Indikuje, že transakce byla spuštěná
        /// </summary>
        public static bool IsTransactionStarted
        {
            get
            {
                IUndoRedoManager manager = Manager;
                return manager != null ? manager.IsTransactionStarted : true;
            }
        }

        /// <summary>
        /// Vrací true, pokud historie má příkaz, který může být odvolán
        /// </summary>
        public static bool CanUndo
        {
            get
            {
                IUndoRedoManager manager = Manager;
                return manager != null ? manager.CanUndo : false;
            }
        }
        /// <summary>
        /// Vrací true, pokud historie má příkaz, který může být přepracován
        /// </summary>
        public static bool CanRedo
        {
            get
            {
                IUndoRedoManager manager = Manager;
                return manager != null ? manager.CanRedo : false;
            }
        }

    }
}
