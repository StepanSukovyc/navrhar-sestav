//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ProcessService.cs                        </Name>
//    <Description> Služba pro práci s procesy                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using Gordic.GFE.Parsers.Gui;
using System;

namespace Gordic.GFE.Parsers.Services
{
    /// <summary>
    /// Služba pro práci s procesy
    /// </summary>
    public static class ProcessService
    {
        sealed class ProcessItem
        {
            readonly Assembly assembly;
            /// <summary>
            /// Modul procesu
            /// </summary>
            public Assembly Assembly { get { return assembly; } }

            readonly IDesktop desktop;
            /// <summary>
            /// Pracovní plocha procesu
            /// </summary>
            public IDesktop Desktop { get { return desktop; } }

            /// <summary>
            /// Vytvoření položky procesu
            /// </summary>
            /// <param name="desktop">Pracovní prostor procesu</param>
            public ProcessItem(IDesktop desktop)
            {
                this.desktop = desktop;
                this.assembly = desktop.GetType().Assembly;
            }
        }

        static Dictionary<int, ProcessItem> processCach = new Dictionary<int, ProcessItem>();
        /// <summary>
        /// Aktuální (dle kontextu - process ID) pracovní prostor
        /// </summary>
        public static IDesktop Desktop { get { return GetDesktop(); } }

        /// <summary>
        /// Aktuální (dle kontextu - process ID) modul
        /// </summary>
        public static Assembly Assembly { get { return GetAssembly(); } }

        /// <summary>
        /// Přopojení služby k běžícímju procesu.
        /// Znamená, že bude uložená metoda na získání aktuálně zobrazeného obsahu procesu.
        /// </summary>
        /// <param name="process">Proces</param>
        /// <param name="desktop">Pracovní prostor</param>
        public static void AttachProcess(Process process, IDesktop desktop)
        {
            if (!processCach.ContainsKey(process.Id))
                processCach.Add(process.Id, new ProcessItem(desktop));
        }
        /// <summary>
        /// Odpojení procesu
        /// </summary>
        /// <param name="process">Proces k odpojení</param>
        public static void DetachProcess(Process process)
        {
            if (processCach.ContainsKey(process.Id))
                processCach.Remove(process.Id);

            OnAfterDetach();
        }

        /// <summary>
        /// Volá se po uvolnění procesu
        /// </summary>
        public static event EventHandler AfterDetach;
        static void OnAfterDetach()
        {
            AfterDetach?.Invoke(null, EventArgs.Empty);
        }

        /// <summary>
        /// Získání hlavního formu procesu
        /// </summary>
        /// <returns>Hlavní formulář procesu</returns>
        static IDesktop GetDesktop()
        {
            int id = Process.GetCurrentProcess().Id;
            return processCach.ContainsKey(id) ? processCach[id].Desktop : null;
        }

        /// <summary>
        /// Aktuální modul
        /// </summary>
        /// <returns>Aktuální modul</returns>
        static Assembly GetAssembly()
        {
            int id = Process.GetCurrentProcess().Id;
            return processCach.ContainsKey(id) ? processCach[id].Assembly : null;
        }
    }
}
