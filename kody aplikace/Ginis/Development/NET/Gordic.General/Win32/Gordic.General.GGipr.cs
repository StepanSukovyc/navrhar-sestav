//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GGipr.cs            </Name>
//    <Description> registr spuštěných aplikací        </Description>
//    <Author>      Leoš Hromádka                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021 </Copyright>
//    <Created>     2011-04-14                         </Created>
//  </FileHeader>

using System;
using System.Linq;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using System.IO.MemoryMappedFiles;
using System.Reflection;

namespace Gordic.General {

    /// <summary>registr spuštěných aplikací</summary>
    /// <remarks>implementace byla původně umístěna v knihovně G323gipr.dll</remarks>
    [System.Security.SecuritySafeCritical]
    public class GGipr : IGObject {

        #region konstanty
        
        // všechny konstnty musí odpovídat původní knihovně GIPR.DLL release build - hodnoty neměňte !!!

        /// <summary></summary>
        private const uint GIPR_MAJOR_VERSION_NUMBER = 1;

        /// <summary></summary>
        private const string GIPR_MAJOR_VERSION_STRING = "1";

        /// <summary></summary>
        private const uint GIPR_REGISTER_ITEM_NAME_MAX = 260;
        
        /// <summary></summary>
        private const uint GIPR_REGITEM_MAX = 250;
        
        /// <summary></summary>
        private const uint GIPR_WNDNOTIFICATION_MAX = 30;

        /// <summary></summary>
        private const string shared_mutex_name_fmt = "__GIPR_mtx_" + GIPR_MAJOR_VERSION_STRING + "_<{0}>__";
        
        /// <summary></summary>
        private const string shared_memory_name_fmt = "__GIPR_shm_" + GIPR_MAJOR_VERSION_STRING + "_<{0}>__";

        /// <summary></summary>
        private const uint _smem_pos_magic = 0;
        
        /// <summary></summary>
        private const uint _smem_pos_version = 4;
        
        /// <summary></summary>
        private const uint _smem_pos_item_0 = 12;
        
        /// <summary></summary>
        private const uint _smem_sizeof_item = 0x00000110;
        
        /// <summary></summary>
        private const uint _smem_pos_notification_0 = _smem_pos_item_0 + GIPR_REGITEM_MAX * _smem_sizeof_item;
        
        /// <summary></summary>
        private const uint _smem_sizeof_notification = 0x00000010;
        
        /// <summary></summary>
        private const uint _smem_pos_after = _smem_pos_notification_0 + GIPR_WNDNOTIFICATION_MAX * _smem_sizeof_notification;

        /// <summary></summary>
        private const uint GIPR_GLOBAL_SHARED_MEMORY_SIZE = _smem_pos_after; // !!! must be 0x00010b8c to match to "release" GIPR.DLL !!!
        
        /// <summary></summary>
        private const uint GIPR_GLOBAL_SHARED_MAGIC = 0x52504947;
        
        /// <summary></summary>
        private const uint GIPR_GLOBAL_SHARED_VERSION = ((((GIPR_MAJOR_VERSION_NUMBER << 8) | /*GIPR_MINOR_VERSION_NUMBER*/4) << 16) | (GIPR_GLOBAL_SHARED_MEMORY_SIZE & 0xFFFF));

        // GIPR_REGISTER_CHANGE_ADDED ((WPARAM)(1))
        // GIPR_REGISTER_CHANGE_REMOVED ((WPARAM)(-1))

        #endregion

        #region výčtové typy

        /// <summary>filtr záznamů</summary>
        public enum QueryItemFilter {
            /// <summary>všechny záznamy</summary>
            All_Items,
            /// <summary>pouze záznamy přidané touto aplikací (tímto procesem)</summary>
            Own_Items_Only,
            /// <summary>pouze záznamy přidané jinými aplikacemi (jinými procesy)</summary>
            Not_Own_Items_Only
        } // end enum

        /// <summary></summary>
        private enum SharedMemory_ItemState {
            /// <summary></summary>
            Unused = 0,
            /// <summary></summary>
            Used_Nonunique_Name = -2147483648, // 0x80000000
            /// <summary></summary>
            Used_Unique_Name = -2147483647     // 0x80000001
        } // end enum

        #endregion

        #region datové členy

        /// <summary></summary>
        private Mutex c_shared_mutex = null;

        /// <summary></summary>
        private MemoryMappedFile c_shared_memory = null;

        /// <summary></summary>
        private MemoryMappedViewAccessor c_shared_memory_view = null;

        /// <summary>this procces ID</summary>
        private int c_process_id = Process.GetCurrentProcess().Id;

        /// <summary>název registru</summary>
        private readonly string m_sRegisterName = String.Empty;

        #endregion

        #region vlastnosti

        /// <summary>název registru</summary>
        public string RegisterName {
            get { return m_sRegisterName; }
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(GGipr).Assembly; }
        } // end property

        #endregion

        #region konstruktor a destruktor

        /// <summary>veřejný konstruktor</summary>
        /// <param name="registerName">název sdíleného registru</param>
        public GGipr(string registerName) {
            if(registerName == null || (m_sRegisterName = registerName.Trim()) == String.Empty) throw new GArgumentException(23200461);
            Open(RegisterName);
        } // end method

        /// <summary>Destruktor. Uzavře sdílený registr.</summary>
        ~GGipr() {
            Close();
        } // end method

        #endregion

        #region veřejné metody

        /// <summary>Uzavře přístup ke sdílenému registru.</summary>
        public void Close() {
            if(c_shared_memory_view != null) {
                c_shared_memory_view.Dispose();
                c_shared_memory_view = null;
            } // end if
            if(c_shared_memory != null) {
                c_shared_memory.Dispose();
                c_shared_memory = null;
            } // end if
            if (c_shared_mutex != null) {
                c_shared_mutex.Close();
                c_shared_mutex = null;
            } // end if
        } // end method

        /// <summary>Přidá položku do registru.</summary>
        /// <param name="a_name">Položka</param>
        /// <param name="a_unique">Požadavek na unikátnost položky</param>
        /// <returns>Po úspěšném přidání položky vrátí true.</returns>
        public bool AddItem(string a_name,bool a_unique = false) {
            if(a_name.Length > GIPR_REGISTER_ITEM_NAME_MAX) throw new GArgumentException(23200395);
            OpenSharedMemory();
            uint l_free_item = GIPR_REGITEM_MAX;
            uint i = 0;
            var processlist = Process.GetProcesses();
            while (i < GIPR_REGITEM_MAX) {
                SharedMemory_ItemState i_state = SharedMemory_GetItemState(i);
                if(i_state != SharedMemory_ItemState.Unused) {
                    if(a_unique || (i_state == SharedMemory_ItemState.Used_Unique_Name)) {
                        int l_process;
                        string l_name;
                        SharedMemory_GetItem(i,out l_process,out l_name);
                        if (CheckIfAlive(i, l_process, processlist))
                            if(a_name.CompareTo(l_name) == 0) {
                                l_free_item = GIPR_REGITEM_MAX;
                                break;
                            } // end if
                    } // end if
                } else {
                    if(l_free_item == GIPR_REGITEM_MAX) l_free_item = i;
                } // end if
                i++;
            } // end while
            if(l_free_item < GIPR_REGITEM_MAX) {
                SharedMemory_SetItemState(l_free_item,a_unique ? SharedMemory_ItemState.Used_Unique_Name : SharedMemory_ItemState.Used_Nonunique_Name);
                SharedMemory_SetItem(l_free_item,c_process_id,a_name);
                // NotifyAboutChangeSharedMemory(GIPR_REGISTER_CHANGE_ADDED);
            } // end if
            CloseSharedMemory();
            return l_free_item < GIPR_REGITEM_MAX;
        } // end method

        /// <summary>Odebere položku z registru. Lze odebrat pouze položky přidané touto aplikací (tímto procesem).</summary>
        /// <param name="a_name">Položka</param>
        /// <returns>Po úspěšném odebrání položky vrátí true.</returns>
        public bool RemoveItem(string a_name) {
            bool l_result = false;
            OpenSharedMemory();
            uint i = 0;
            while(i < GIPR_REGITEM_MAX) {
                SharedMemory_ItemState i_state = SharedMemory_GetItemState(i);
                if(i_state != SharedMemory_ItemState.Unused) {
                    int l_process;
                    string l_name;
                    SharedMemory_GetItem(i,out l_process,out l_name);
                    if(l_process == c_process_id) {
                        if(a_name.CompareTo(l_name) == 0) {
                            SharedMemory_SetItemState(i,SharedMemory_ItemState.Unused);
                            l_result = true;
                            // NotifyAboutChangeSharedMemory(GIPR_REGISTER_CHANGE_REMOVED);
                            break;
                        } // end if
                    } // end if
                } // end if
                i++;
            } // end while
            CloseSharedMemory();
            return l_result;
        } // end metod

        /// <summary>Dotaz na existenci položky v registru.</summary>
        /// <param name="a_name">Položka</param>
        /// <param name="a_filter">Filtr položek</param>
        /// <returns>Pokud položka v registru je, pak vrátí true.</returns>
        public bool QueryItemExists(string a_name,QueryItemFilter a_filter) {
            bool l_result = false;
            OpenSharedMemory();
            uint i = 0;
            while(i < GIPR_REGITEM_MAX) {
                SharedMemory_ItemState i_state = SharedMemory_GetItemState(i);
                if(i_state != SharedMemory_ItemState.Unused) {
                    int l_process;
                    string l_name;
                    SharedMemory_GetItem(i,out l_process,out l_name);
                    if(CheckIfAlive(i,l_process)) {
                        if(CheckFilter(l_process,a_filter)) {
                            if(a_name.CompareTo(l_name) == 0) {
                                l_result = true;
                                break;
                            } // end if
                        } // end if
                    } // end if
                } // end if
                i++;
            } // end while
            CloseSharedMemory();
            return l_result;
        } // end method

        /// <summary>Výpis obsahu registru.</summary>
        /// <param name="a_filter">Filtr položek</param>
        /// <returns>Obsah registru.</returns>
        public string[] GetItems(QueryItemFilter a_filter) {
            List<string> l_result = new List<string>();
            OpenSharedMemory();
            uint i = 0;
            while(i < GIPR_REGITEM_MAX) {
                SharedMemory_ItemState i_state = SharedMemory_GetItemState(i);
                if(i_state != SharedMemory_ItemState.Unused) {
                    int l_process;
                    string l_name;
                    SharedMemory_GetItem(i,out l_process,out l_name);
                    if(CheckIfAlive(i,l_process)) {
                        if(CheckFilter(l_process,a_filter)) l_result.Add(l_name);
                    } // end if
                } // end if
                i++;
            } // end if
            CloseSharedMemory();
            return l_result.ToArray();
        } // end method

        /// <summary>Dotaz na existenci položek v registru podle začátku hodnoty položky.</summary>
        /// <param name="a_name_like">Položka (počátek)</param>
        /// <param name="a_filter">Filtr položek</param>
        /// <param name="ao_name">Vrátí první nalezenou položku</param>
        /// <returns>Počet nalezených položek v registru.</returns>
        public int CountItemExists(string a_name_like,QueryItemFilter a_filter,out string ao_name) {
            int l_result = 0;
            ao_name = null;
            OpenSharedMemory();
            uint i = 0;
            while(i < GIPR_REGITEM_MAX) {
                SharedMemory_ItemState i_state = SharedMemory_GetItemState(i);
                if(i_state != SharedMemory_ItemState.Unused) {
                    int l_process;
                    string l_name;
                    SharedMemory_GetItem(i,out l_process,out l_name);
                    if(CheckIfAlive(i,l_process)) {
                        if(CheckFilter(l_process,a_filter)) {
                            if(l_name.StartsWith(a_name_like)) {
                                l_result++;
                                if(l_result == 1) ao_name = l_name;
                            } // end if
                        } // end if
                    } // end if
                } // end if
                i++;
            } // end while
            CloseSharedMemory();
            return l_result;
        } // end method

        #endregion

        #region soukromé metody

        /// <summary></summary>
        /// <param name="a_position"></param>
        /// <returns></returns>
        private string SharedMemory_ReadString(uint a_position) {
            string l_result = "";
            while (true) {
                byte l_c = c_shared_memory_view.ReadByte(a_position++);
                if (l_c == 0) break;
                else l_result += (char)l_c;
            } // end while
            return l_result;
        } // end method

        /// <summary></summary>
        /// <param name="a_position"></param>
        /// <param name="a_string"></param>
        private void SharedMemory_WriteString(uint a_position, string a_string) {
            a_string += (char)0;
            foreach (char l_c in a_string.ToCharArray())
                c_shared_memory_view.Write(a_position++, (byte)l_c);
        } // end method

        /// <summary></summary>
        /// <param name="a_index"></param>
        /// <returns></returns>
        private SharedMemory_ItemState SharedMemory_GetItemState(uint a_index) {
            if (a_index >= GIPR_REGITEM_MAX) throw new GArgumentOutOfRangeException(23200388);
            uint l_pos = _smem_pos_item_0 + a_index * _smem_sizeof_item;
            return (SharedMemory_ItemState)c_shared_memory_view.ReadInt32(l_pos);
        } // end method

        /// <summary></summary>
        /// <param name="a_index"></param>
        /// <param name="a_state"></param>
        private void SharedMemory_SetItemState(uint a_index, SharedMemory_ItemState a_state) {
            if (a_index >= GIPR_REGITEM_MAX) throw new GArgumentOutOfRangeException(23200389);
            uint l_pos = _smem_pos_item_0 + a_index * _smem_sizeof_item;
            c_shared_memory_view.Write(l_pos, (UInt32)a_state);
        } // end method

        /// <summary></summary>
        /// <param name="a_index"></param>
        /// <param name="a_owner_process_id"></param>
        /// <param name="a_name"></param>
        private void SharedMemory_GetItem(uint a_index, out int a_owner_process_id, out string a_name) {
            if (a_index >= GIPR_REGITEM_MAX) throw new GArgumentOutOfRangeException(23200390);
            uint l_pos = _smem_pos_item_0 + a_index * _smem_sizeof_item;
            a_owner_process_id = c_shared_memory_view.ReadInt32(l_pos + 4);
            a_name = SharedMemory_ReadString(l_pos + 8);
        } // end method

        /// <summary></summary>
        /// <param name="a_index"></param>
        /// <param name="a_owner_process_id"></param>
        /// <param name="a_name"></param>
        private void SharedMemory_SetItem(uint a_index, int a_owner_process_id, string a_name) {
            if (a_index >= GIPR_REGITEM_MAX) throw new GArgumentOutOfRangeException(23200391);
            uint l_pos = _smem_pos_item_0 + a_index * _smem_sizeof_item;
            c_shared_memory_view.Write(l_pos + 4, (UInt32)a_owner_process_id);
            SharedMemory_WriteString(l_pos + 8, a_name);
        } // end method

        /// <summary></summary>
        /// <param name="a_index"></param>
        /// <param name="a_h_window"></param>
        /// <param name="a_thread_id"></param>
        /// <param name="a_message"></param>
        /// <param name="a_l_param"></param>
        private void SharedMemory_SetNotification(uint a_index, int a_h_window, int a_thread_id, uint a_message, long a_l_param) {
            if (a_index >= GIPR_WNDNOTIFICATION_MAX) throw new GArgumentOutOfRangeException(23200392);
            uint l_pos = _smem_pos_notification_0 + a_index * _smem_sizeof_notification;
            c_shared_memory_view.Write(l_pos + 0, (UInt32)a_h_window);
            c_shared_memory_view.Write(l_pos + 4, (UInt32)a_thread_id);
            c_shared_memory_view.Write(l_pos + 8, (UInt32)a_message);
            c_shared_memory_view.Write(l_pos + 12, (UInt32)a_l_param);
        } // end method

        /// <summary></summary>
        /// <param name="a_register_identification"></param>
        /// <returns></returns>
        private static string EncodeRegisterName(string a_register_identification) {
            GMd2 l_md2 = new GMd2();
            byte[] l_id = new byte[a_register_identification.Length];
            for(int i = 0; i < a_register_identification.Length; i++) {
                l_id[i] = (byte) (a_register_identification[i]);
            } // end for
            byte[] l_hash = l_md2.Compute(l_id);
            string l_result = "";
            foreach(byte b in l_hash) {
                l_result += b.ToString("X2");
            } // end for
            return l_result;
        } // end method

        /// <summary></summary>
        private void OpenSharedMemory() {
            try {
                if(c_shared_mutex != null) c_shared_mutex.WaitOne(-1);
            } // end try
            catch(AbandonedMutexException) {
                // pravděpodobně spadla jiná aplikace a neuvolnila mutex
            } // end catch
        } // end method

        /// <summary></summary>
        private void CloseSharedMemory() {
            try {
                if(c_shared_mutex != null) c_shared_mutex.ReleaseMutex();
            } // end try
            catch {
                #if DEBUG || DEVELOP_VERSION
                    throw;
                #else
                    // všechny výjimky jsou ignorovány
                #endif
            } // end catch
        } // end method

        /// <summary></summary>
        /// <param name="a_process"></param>
        /// <param name="a_filter"></param>
        /// <returns></returns>
        private bool CheckFilter(int a_process, QueryItemFilter a_filter) {
            switch (a_filter) {
                case QueryItemFilter.All_Items:
                    return true;
                case QueryItemFilter.Own_Items_Only:
                    return a_process == c_process_id;
                case QueryItemFilter.Not_Own_Items_Only:
                    return a_process != c_process_id;
                default:
                    return false;
            } // end switch
        } // end method

        /// <summary>test, zda je process stále živý</summary>
        private bool CheckIfAlive(uint a_index, int a_process, Process[] processlist = null) {
            bool l_result = false;
            try {
                if (processlist == null) processlist = Process.GetProcesses();
                Process l_process = processlist.FirstOrDefault(pr => pr.Id == a_process);
                l_result = l_process != null && l_process.HasExited == false;
            } // end try
            catch(Exception) {
                // všechny výjimky jsou ignorovány
            } // end try
            if (l_result == false) SharedMemory_SetItemState(a_index, SharedMemory_ItemState.Unused);
            return l_result;
        } // end method

        /// <summary></summary>
        /// <param name="a_register_identification"></param>
        private void Open(string a_register_identification) {
            if (a_register_identification == null) throw new GArgumentNullException(23200393);
            string l_id = EncodeRegisterName(a_register_identification);
            bool l_creator;
            c_shared_mutex = new Mutex(true, string.Format(shared_mutex_name_fmt, l_id), out l_creator);
            if(l_creator)
                try { c_shared_memory = MemoryMappedFile.CreateNew(string.Format(shared_memory_name_fmt,l_id),GIPR_GLOBAL_SHARED_MEMORY_SIZE,MemoryMappedFileAccess.ReadWrite); }
                catch(System.IO.IOException a_exception) {
                    UInt32 l_hresult = (UInt32) System.Runtime.InteropServices.Marshal.GetHRForException(a_exception);
                    if(l_hresult == 0x800700b7 /* FACILITY_WIN32(ERROR_ALREADY_EXISTS) */) l_creator = false; else throw;
                }; // end catch
            if(!l_creator) c_shared_memory = MemoryMappedFile.OpenExisting(string.Format(shared_memory_name_fmt,l_id),MemoryMappedFileRights.ReadWrite);
            c_shared_memory_view = c_shared_memory.CreateViewAccessor(0, 0, MemoryMappedFileAccess.ReadWrite);
            if (l_creator) {
                c_shared_memory_view.Write(_smem_pos_magic, (UInt32)GIPR_GLOBAL_SHARED_MAGIC);
                c_shared_memory_view.Write(_smem_pos_version, (UInt32)GIPR_GLOBAL_SHARED_VERSION);
                for(uint i = 0; i < GIPR_REGITEM_MAX; i++) {
                    SharedMemory_SetItemState(i,SharedMemory_ItemState.Unused);
                } // end for
                for(uint i = 0; i < GIPR_WNDNOTIFICATION_MAX; i++) {
                    SharedMemory_SetNotification(i,0,0,0,0);
                } // end for
                CloseSharedMemory();
            } else {
                OpenSharedMemory();
                bool l_ok = (c_shared_memory_view.ReadUInt32(_smem_pos_magic) == GIPR_GLOBAL_SHARED_MAGIC) && (c_shared_memory_view.ReadUInt32(_smem_pos_version) == GIPR_GLOBAL_SHARED_VERSION);
                CloseSharedMemory();
                if (!l_ok) throw new GException(23200394,ThisAssembly); // načtena nesprávná knihovna
            } // end if
        } // end method

        #endregion

    } // end class

} // end namespace
