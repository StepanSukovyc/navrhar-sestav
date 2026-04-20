//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GUnsafeRepWrapper.cs                </Name>
//    <Description> Wrapper pro volání nativní g32grr06.dll a g32grr09.dll      </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2013                            </Copyright>
//    <Created>     2004-03-16                                                  </Created>
//  </FileHeader>

using System;
using System.Runtime.InteropServices;
using System.Text;
using System.IO;
using Gordic.General;
using System.Reflection;
using System.ComponentModel;
using Gordic.Report.Implementation;

namespace Gordic.Report.Interface
{
    /// <summary>
    /// Nalezení cesty k instalaci GORDIC prohlížeče a Reporter knihovnám
    /// </summary>
    public static class GVidrunLocator
    {
        /// <summary>
        /// Nalezení cesty k instalaci GORDIC prohlížeče a Reporter knihovnám
        /// </summary>
        public static string Locate(string fileName = "vidrun.exe")
        {
            if (File.Exists(fileName))
                return Path.GetFullPath(fileName);

            var invalid = Path.GetInvalidPathChars();
            var values = Environment.GetEnvironmentVariable("PATH");
            foreach (var path in values.Split(';'))
            {
                if (path.IndexOfAny(invalid) >= 0) continue;
                try
                {
                    var fullPath = Path.Combine(path, fileName);
                    if (File.Exists(fullPath))
                        return fullPath;
                }
                catch { }
            }

            var i = Gordic.General.GApplicationInfo.GetInstallPath();
            if (string.IsNullOrEmpty(i) == false)
            {
                try
                {
                    var fn = Path.Combine(i, "Gin", fileName); // GINIS/Gin
                    if (File.Exists(fn)) return fn;
                }
                catch { }
            }

            i = GetVidrunPath();
            if (string.IsNullOrEmpty(i) == false)
            {
                try
                {
                    var fn = Path.Combine(i, fileName);
                    if (File.Exists(fn)) return fn;
                }
                catch { }
            }

            return null; //nenalezeno
        }

        internal static string GetVidrunPath()
        {
            Microsoft.Win32.RegistryKey l_oRegistryKey = null;
            object l_oRegistryValue = null;
            string l_sRegistryValue = String.Empty;
            string l_sInstallPath = String.Empty;
            try
            {
                var key = "SOFTWARE";
                key += @"\Gordic\GINIS\SHARED\DOTNETINSTALL";
                if ((l_oRegistryKey = Microsoft.Win32.Registry.LocalMachine.OpenSubKey(key)) != null)
                {
                    if ((l_oRegistryValue = l_oRegistryKey.GetValue("VIEWER_PATH")) != null)
                    {
                        if ((l_sRegistryValue = l_oRegistryValue.ToString().Trim()) != String.Empty)
                        {
                            l_sInstallPath = Path.GetFullPath(l_sRegistryValue);
                        }
                    }
                }
                else if (GCommon.Is32Bit == false)
                {
                    key = key.Replace("SOFTWARE", @"SOFTWARE\Wow6432Node"); //kontroluju 32bit registry
                    if ((l_oRegistryKey = Microsoft.Win32.Registry.LocalMachine.OpenSubKey(key)) != null)
                    {
                        if ((l_oRegistryValue = l_oRegistryKey.GetValue("VIEWER_PATH")) != null)
                        {
                            if ((l_sRegistryValue = l_oRegistryValue.ToString().Trim()) != String.Empty)
                            {
                                l_sInstallPath = Path.GetFullPath(l_sRegistryValue);
                            }
                        }
                    }
                }

            }
            catch
            {
                // všechny výjimky jsou ignorovány
            }
            finally
            {
                if (l_oRegistryKey != null) l_oRegistryKey.Close();
            }
            return l_sInstallPath;
        }


        private static string ms_LibraryPath = null;
        [System.Security.SecurityCritical]
        public static void SetLibrariesPath(string path) { ms_LibraryPath = path; }
        public static string GetLibrariesPath() { return ms_LibraryPath; }
    }

    /// <summary>
    /// Zavedení nativní knihovny v GORDIC konvenci
    /// </summary>
    [System.Security.SecurityCritical]
    public class FunctionLoader
    {
        [DllImport("Kernel32.dll", SetLastError = true)]
        private static extern IntPtr LoadLibrary(string path);
        [System.Flags]
        private enum LoadLibraryFlags : uint
        {
            DONT_RESOLVE_DLL_REFERENCES = 0x00000001,
            LOAD_IGNORE_CODE_AUTHZ_LEVEL = 0x00000010,
            LOAD_LIBRARY_AS_DATAFILE = 0x00000002,
            LOAD_LIBRARY_AS_DATAFILE_EXCLUSIVE = 0x00000040,
            LOAD_LIBRARY_AS_IMAGE_RESOURCE = 0x00000020,
            LOAD_WITH_ALTERED_SEARCH_PATH = 0x00000008
        }
        [DllImport("kernel32.dll", SetLastError = true)]
        private static extern IntPtr LoadLibraryEx(string path, IntPtr hReservedNull, LoadLibraryFlags dwFlags);

        [DllImport("Kernel32.dll", ExactSpelling = true, SetLastError = true)]
        private static extern IntPtr GetProcAddress(IntPtr hModule, string procName);
        [DllImport("kernel32.dll", SetLastError = true)]
        [return: MarshalAs(UnmanagedType.Bool)]private static extern bool FreeLibrary(IntPtr hModule);
        //[DllImport("kernel32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
        //[return: MarshalAs(UnmanagedType.Bool)]private static extern bool SetDllDirectory(string lpPathName);
        [DllImport("kernel32.dll", SetLastError = true)][PreserveSig]
        private static extern uint GetModuleFileName([In]IntPtr hModule,[Out] StringBuilder lpFilename,[In][MarshalAs(UnmanagedType.U4)]int nSize);

        public FunctionLoader(string dllname)
        {
            DllName = (Environment.Is64BitProcess ? "g64" + dllname : "g32" + dllname) + ".dll";
        }
        public FunctionLoader(string dllname, bool noMangling)
        {
            DllName = noMangling ? dllname : (Environment.Is64BitProcess ? "g64" + dllname : "g32" + dllname) + ".dll";
        }
        ~FunctionLoader()
        {
            Free();
        }

        internal static void CheckLoaderException(Exception x)
        {
            var tx = x as TypeInitializationException;
            if (tx != null && tx.InnerException != null)
            {
                //tx.TypeName
                throw tx.InnerException;
            }
        }

        IntPtr DLL;
        public string DllName;
        public void Load()
        {
            if (DLL != IntPtr.Zero) return;

            string errs = string.Empty;
            string i = AppDomain.CurrentDomain.BaseDirectory;
            if (string.IsNullOrEmpty(i) == false)
            {
                var err4 = LoadFrom(i);
                if (DLL != IntPtr.Zero) return;
                errs += "/a" + err4;
                i = Path.Combine(i, "@(GINADR)@", "GIN");
                err4 = LoadFrom(i);
                if (DLL != IntPtr.Zero) return;
                errs += "/ag" + err4;
            }

            DLL = LoadLibrary(DllName);
            if (DLL != IntPtr.Zero) return;

            int err = Marshal.GetLastWin32Error();
            errs += "/d" + err.ToString();

            i = GVidrunLocator.GetLibrariesPath();
            //var i = (AppDomain.CurrentDomain.GetData("native_dll_path") ?? "").ToString();
            if (string.IsNullOrEmpty(i) == false)
            {
                var err1 = LoadFrom(i);
                if (DLL != IntPtr.Zero) return;
                errs += "/n" + err1;
            }

            i = Gordic.General.GApplicationInfo.GetInstallPath();
            if (string.IsNullOrEmpty(i) == false)
            {
                var err2 = LoadFrom(Path.Combine(i, "Gin")); // GINIS/Gin
                if (DLL != IntPtr.Zero) return;
                errs += "/g" + err2;
            }

            i = GVidrunLocator.GetVidrunPath();
            if (string.IsNullOrEmpty(i) == false)
            {
                var err3 = LoadFrom(i);
                if (DLL != IntPtr.Zero) return;
                errs += "/v" + err3;
            }

#if NETFRAMEWORK
            i = AppDomain.CurrentDomain.SetupInformation.PrivateBinPath;
            if (string.IsNullOrEmpty(i) == false)
            {
                foreach(var p in i.Split(Path.PathSeparator))
                {
                    var err5 = LoadFrom(p);
                    if (DLL != IntPtr.Zero) return;
                    errs += "/b" + err5;
                }
            }

            i = AppDomain.CurrentDomain.SetupInformation.CachePath;
            if (string.IsNullOrEmpty(i) == false)
            {
                var err6 = LoadFrom(i);
                if (DLL != IntPtr.Zero) return;
                errs += "/c" + err6;
            }
#endif
            //i = AppDomain.CurrentDomain.SetupInformation.ApplicationBase;
            //if (string.IsNullOrEmpty(i) == false)
            //{
            //    var err7 = LoadFrom(i);
            //    if (DLL != IntPtr.Zero) return;
            //    errs += "/ab" + err7;
            //}

            throw new GReportException(21000050, 33, new Win32Exception(err), DllName, errs); //RC-EX 33 : Nelze najít knihovnu {0}. Kód {1}. Ověřte nastavení cest.
        }
        private string LoadFrom(string path)
        {
            var n = Path.Combine(path, DllName); // GINIS/Gin
            //DLL = LoadLibrary(n);
            DLL = LoadLibraryEx(n, IntPtr.Zero, LoadLibraryFlags.LOAD_WITH_ALTERED_SEARCH_PATH); //XP+: zajisti, ze zavisle DLL se hledaji ve stejne ceste _path_

            if (DLL == IntPtr.Zero)
                return string.Format("{0}({1})", Marshal.GetLastWin32Error(), n);
            return null;
        }

        public void Free()
        {
            if (DLL != IntPtr.Zero)
            {
                FreeLibrary(DLL);
                DLL = IntPtr.Zero;
            }
        }

        public void ForgetAndLeaveLibraryLoaded()
        {
            DLL = IntPtr.Zero;
        }

        public Delegate LoadFunction<T>()
        {
            Load();
            var functionName = typeof(T).Name.TrimStart('d');
            var functionAddress = GetProcAddress(DLL, functionName);
            if (functionAddress == IntPtr.Zero)
                throw new GReportException(21000051, 34, new Win32Exception(), DllName, functionName); //RC-EX 34 : Knihovna {0} je v nesprávné verzi nebo porušená. Neobsahuje funkci {1}.
            return Marshal.GetDelegateForFunctionPointer(functionAddress, typeof(T));
        }

        public string ModuleFileName
        {
            get
            {
                Load();
                StringBuilder fileName = new StringBuilder(261);
                GetModuleFileName(DLL, fileName, fileName.Capacity);
                return fileName.ToString();
            }
        }

        private System.Diagnostics.FileVersionInfo m_ver = null;
        /// <summary>Verze</summary>
        public System.Diagnostics.FileVersionInfo VersionInfo
        {
            get
            {
                if (m_ver == null)
                    m_ver = System.Diagnostics.FileVersionInfo.GetVersionInfo(ModuleFileName);
                return m_ver;
            }
        }
        /// <summary>Verze</summary>
        public string Version
        {
            get
            {
                var v = VersionInfo;
                if (v == null) return "N/A";
                return v.FileVersion;
            }
        }

        public long VersionLong
        {
            get
            {
                var v = VersionInfo;
                return ((((long)v.FileMajorPart * 1000) + v.FileMinorPart) * 1000 + v.FileBuildPart) * 1000 + v.FilePrivatePart;
            }
        }
    }

	/// <summary>
	/// Statický objekt pro volání nativní G32GRR06.DLL a G32GRR09.DLL
	/// </summary>
	/// <remarks>
	/// Tento objekt zprostředkovává volání knihovny
	/// G32GRR06.DLL a G32GRR09.DLL tj. volání Gordic Reporteru
	/// </remarks>
    [System.Security.SecurityCritical]
	public static class GUnsafeRepWrapper
    {
        #region Consts
        /// <exclude/>
        public const int S_OK = 0;
        /// <exclude/>
        public const int S_FALSE = 1;
        #endregion
        #region Interfaces wrapper classes (public)

        /// <summary>
        /// seznam info sekcí a jejich hodnot
        /// </summary>
        [System.Security.SecurityCritical]
        public class GInfoList : IDisposable
        {
            private Gordic.Report.Implementation.IGInfoList m_list;

            internal GInfoList(Gordic.Report.Implementation.IGInfoList list)
            {
                m_list = list;
            }

            /// <exclude/>
            ~GInfoList()
            {
                Dispose(false);
            }

            /// <summary>Internal use only</summary>
            [EditorBrowsable(EditorBrowsableState.Never)]
            public Gordic.Report.Implementation.IGInfoList List
            {
                get { return m_list; }
            }

            /// <summary>
            /// Počet obsažených info sekcí
            /// </summary>
            public int Count
            {
                get
                {
                    int r;
                    GUnsafeRepWrapper.Throw06Error(m_list.getCount(out r));
                    return r;
                }
            }
            /// <summary>
            /// Vrací info na základě indexu (0- Count-1)
            /// </summary>
            public void getItem(int index, out string name, out string value)
            {
                string l_name, l_value;
                GUnsafeRepWrapper.Throw06Error(m_list.getItem(index, out l_name, out l_value));
                name = l_name;
                value = l_value;
            }
            /// <summary>
            /// Vrací info na základě jména
            /// </summary>
            public string getInfo(string name)
            {
                string r;
                GUnsafeRepWrapper.Throw06Error(m_list.getInfo(name, out r));
                return r;
            }
            /// <summary>
            /// Vrací info v jednom dlouhém řetězci
            /// </summary>
            public string convertToText()
            {
                StringBuilder b = new StringBuilder(2048);
                GUnsafeRepWrapper.Throw06Error(m_list.convertToText(b, b.Capacity));
                return b.ToString();
            }

            #region IDisposable Members

            /// <summary>
            /// Uvolni interface
            /// </summary>
            public void Dispose()
            {
                Dispose(true);
                GC.SuppressFinalize(this);
            }

            private void Dispose(bool disposing)
            {
                if (m_list != null) Marshal.ReleaseComObject(m_list);
                m_list = null;
            }

            #endregion
        }

        /// <summary>
        /// Interní třída reporteru
        /// </summary>
        [System.Security.SecurityCritical]
        public class GReporterStructure : IDisposable
        {
            private Gordic.Report.Implementation.IGStructure m_structure;

            internal GReporterStructure(Gordic.Report.Implementation.IGStructure s)
            {
                m_structure = s;
            }

            /// <exclude/>
            ~GReporterStructure()
            {
                Dispose(false);
            }

            /// <summary>Internal use only</summary>
            [EditorBrowsable(EditorBrowsableState.Never)]
            public Gordic.Report.Implementation.IGStructure Structure
            {
                get { return m_structure; }
            }
            /// <summary>
            /// Vrací verzi specifikace XME. Prozatím vrací stále "1.0"
            /// </summary>
            public void getVersion(out int major, out int minor)
            {
                GUnsafeRepWrapper.Throw06Error(m_structure.getVersion(out major, out minor));
            }
            /// <summary>
            /// Vrací identifikaci a verzi struktury.
            /// </summary>
            public void getStructureVersion(out string ident, out int major, out int minor)
            {
                string l_ident;
                GUnsafeRepWrapper.Throw06Error(m_structure.getStructureVersion(out l_ident, out major, out minor));
                ident = l_ident;// Marshal.PtrToStringAnsi(l_ident);
            }
            /// <summary>
            /// Odkaz na jednotlivé oblasti a položky struktury
            /// </summary>
            public Gordic.Report.Implementation.IGRegion getRoot()
            {
                Gordic.Report.Implementation.IGRegion r;
                GUnsafeRepWrapper.Throw06Error(m_structure.getRoot(out r));
                return r;
            }
            /// <summary>
            /// Info sekce struktury
            /// </summary>
            public GInfoList getAllInfo()
            {
                Gordic.Report.Implementation.IGInfoList r = null;
                GUnsafeRepWrapper.Throw06Error(m_structure.getAllInfo(out r));
                return new GInfoList(r);
            }
            /// <summary>
            /// Vrací konkrétní info sekci struktury dle jména
            /// </summary>
            public string getInfo(string name)
            {
                string r;
                GUnsafeRepWrapper.S_Check06Error(m_structure.getInfo(name, out r));
                return r;
            }

            #region IDisposable Members

            /// <summary>
            /// Uvolni interface
            /// </summary>
            public void Dispose()
            {
                Dispose(true);
                GC.SuppressFinalize(this);
            }

            private void Dispose(bool disposing)
            {
                if (m_structure != null) Marshal.ReleaseComObject(m_structure);
                m_structure = null;
            }

            #endregion
        }

        /// <summary>
        /// Interní třída reporteru
        /// </summary>
        [System.Security.SecurityCritical]
        public class GReporterFormat : IDisposable
        {
            private Gordic.Report.Implementation.IGFormat m_format;

            internal GReporterFormat(Gordic.Report.Implementation.IGFormat f)
            {
                m_format = f;
            }

            /// <exclude/>
            ~GReporterFormat()
            {
                Dispose(false);
            }

            /// <summary>Internal use only</summary>
            [EditorBrowsable(EditorBrowsableState.Never)]
            public Gordic.Report.Implementation.IGFormat Format
            {
                get { return m_format; }
            }
            /// <summary>
            /// Vrací verzi specifikace ALF.
            /// </summary>
            public void getVersion(out int major, out int minor)
            {
                GUnsafeRepWrapper.Throw06Error(m_format.getVersion(out major, out minor));
            }
            /// <summary>
            /// Vrací identifikaci a verzi struktury.
            /// </summary>
            public void getStructureVersion(out string ident, out int major, out int minor)
            {
                string l_ident;
                GUnsafeRepWrapper.Throw06Error(m_format.getStructureVersion(out l_ident, out major, out minor));
                ident = l_ident;
            }
            /// <summary>
            /// Odkaz na jednotlivé oblasti a obsahy formátu
            /// </summary>
            public Gordic.Report.Implementation.IGFormatRegion getRoot()
            {
                Gordic.Report.Implementation.IGFormatRegion r;
                GUnsafeRepWrapper.Throw06Error(m_format.getRoot(out r));
                return r;
            }
            /// <summary>
            /// Info sekce formátu
            /// </summary>
            public GInfoList getAllInfo()
            {
                Gordic.Report.Implementation.IGInfoList r;
                GUnsafeRepWrapper.Throw06Error(m_format.getAllInfo(out r));
                return new GInfoList(r);
            }
            /// <summary>
            /// Vrací konkrétní info sekci formátu dle jména
            /// </summary>
            public string getInfo(string name)
            {
                string r;
                GUnsafeRepWrapper.S_Check06Error(m_format.getInfo(name, out r));
                return r;// Marshal.PtrToStringAnsi(r);
            }
            /// <summary>
            /// Zjistí formátovací skupinu ALF
            /// </summary>
            /// <returns>formátovací skupina (type)</returns>
            public string GetFormatGroup()
            {
                //IntPtr l_str;
                //GUnsafeRepWrapper.Throw06Error(m_format.getFormattingGroup(out l_str));
                //return Marshal.PtrToStringAnsi(l_str);
                string l_str;
                GUnsafeRepWrapper.Throw06Error(m_format.getFormattingGroup(out l_str));
                return l_str;
            }

            /// <summary>
            /// TODO
            /// </summary>
            public object GetInterface()
            {
                return m_format;
            }

            #region IDisposable Members

            /// <summary>
            /// Uvolni interface
            /// </summary>
            public void Dispose()
            {
                Dispose(true);
                GC.SuppressFinalize(this);
            }

            private void Dispose(bool disposing)
            {
                if (m_format != null) Marshal.ReleaseComObject(m_format);
                m_format = null;
            }

            #endregion
        }

        /// <summary>
        /// Interní třída reporteru
        /// </summary>
        [System.Security.SecurityCritical]
        public sealed class GReporterData : IDisposable
        {
            private Gordic.Report.Implementation.IGDataCache m_data;

            internal GReporterData(Gordic.Report.Implementation.IGDataCache d)
            {
                m_data = d;
            }

            /// <exclude/>
            ~GReporterData()
            {
                Dispose(false);
            }

            /// <summary>Internal use only</summary>
            [EditorBrowsable(EditorBrowsableState.Never)]
            public Gordic.Report.Implementation.IGDataCache Data
            {
                get { return m_data; }
            }

            /// <summary>
            /// TODO
            /// </summary>
            public object GetInterface()
            {
                return m_data;
            }

            #region IDisposable Members

            /// <summary>
            /// Uvolni interface
            /// </summary>
            public void Dispose()
            {
                Dispose(true);
                GC.SuppressFinalize(this);
            }

            private void Dispose(bool disposing)
            {
                if (m_data != null) Marshal.ReleaseComObject(m_data);
                m_data = null;
            }

            #endregion
        }
        #endregion

        #region GRR06 imports

        [System.Security.SecurityCritical]
        internal static class Grr06Loader
        {
            internal static FunctionLoader Loader = new FunctionLoader("grr06");
            public static Delegate LoadFunction<T>() { return Loader.LoadFunction<T>(); }

            public delegate int dGetErrorText(IntPtr buffer, int size);
            public static dGetErrorText GetErrorText = (dGetErrorText)LoadFunction<dGetErrorText>();

            public delegate int dGetErrorText2(IntPtr buffer, ref int size);
            //public static dGetErrorText2 GetErrorText2 = (dGetErrorText2)LoadFunction<dGetErrorText2>();

            public delegate int dOpenStructureFile(string fname, ref Guid IID, [MarshalAs(UnmanagedType.Interface)]out object Obj);
            public static readonly dOpenStructureFile OpenStructureFile = (dOpenStructureFile)LoadFunction<dOpenStructureFile>();
            public delegate int dOpenStructureBytes(byte[] bytes, ref Guid IID, [MarshalAs(UnmanagedType.Interface)]out object Obj);
            public static readonly dOpenStructureBytes OpenStructureBytes = (dOpenStructureBytes)LoadFunction<dOpenStructureBytes>();

            public delegate int dOpenFormatFile(string fname,ref Guid IID,[MarshalAs(UnmanagedType.Interface)]out object Obj);
            public static readonly dOpenFormatFile OpenFormatFile = (dOpenFormatFile)LoadFunction<dOpenFormatFile>();
            public delegate int dOpenFormatFileForInfo(string fname, ref Guid IID, [MarshalAs(UnmanagedType.Interface)]out object Obj);
            public static readonly dOpenFormatFileForInfo OpenFormatFileForInfo = (dOpenFormatFileForInfo)LoadFunction<dOpenFormatFileForInfo>();
            public delegate int dOpenFormatBytes(byte[] bytes, ref Guid IID, [MarshalAs(UnmanagedType.Interface)]out object Obj);
            public delegate int dOpenFormatBytes2(byte[] bytes, string fname, ref Guid IID, [MarshalAs(UnmanagedType.Interface)]out object Obj);
            public static readonly dOpenFormatBytes OpenFormatBytes = (dOpenFormatBytes)LoadFunction<dOpenFormatBytes>();

            public delegate int dOpenDataFile(string fname,Gordic.Report.Implementation.IGStructure str,Gordic.Report.Implementation.IGFormat fmt,ref Guid IID,[MarshalAs(UnmanagedType.Interface)]out object Obj);
            public static readonly dOpenDataFile OpenDataFile = (dOpenDataFile)LoadFunction<dOpenDataFile>();

            public delegate int dSetParameter(string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))] string value);
            public static readonly dSetParameter SetParameter = (dSetParameter)LoadFunction<dSetParameter>();

            public delegate int dGetParameter(string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))]out string value);
            public static readonly dGetParameter GetParameter = (dGetParameter)LoadFunction<dGetParameter>();

            public delegate int dStructureFormatCompare(Gordic.Report.Implementation.IGStructure str, Gordic.Report.Implementation.IGFormat frm);
            public static readonly dStructureFormatCompare StructureFormatCompare = (dStructureFormatCompare)LoadFunction<dStructureFormatCompare>();
        }

        /// <summary>Chybové hlášení z Grr06 vrstvy</summary>
        public static int GetErrorText(StringBuilder str, int size)
        {
            IntPtr buffer = Marshal.AllocCoTaskMem(size);
            try
            {
                int res;
                if (Grr06Loader.Loader.VersionLong >= 4005000017)
                {
                    Grr06Loader.dGetErrorText2 GetErrorText2 = (Grr06Loader.dGetErrorText2)Grr06Loader.LoadFunction<Grr06Loader.dGetErrorText2>();
                    res = GetErrorText2(buffer, ref size);
                    if (res == S_FALSE)
                        buffer = Marshal.ReAllocCoTaskMem(buffer, size);
                    else
                        goto n;
                }
                res = Grr06Loader.GetErrorText(buffer, size);
            n:
                str.Append(RepString.s(buffer));
                return res;
            }
            finally
            {
                Marshal.FreeCoTaskMem(buffer);
            }
        }

        internal static int OpenStructureFile(string fname, ref Guid IID, out object Obj) { return Grr06Loader.OpenStructureFile(fname, ref IID, out Obj); }
        internal static int OpenStructureBytes(byte[] bytes, ref Guid IID, out object Obj) { return Grr06Loader.OpenStructureBytes(bytes, ref IID, out Obj); }
        internal static int OpenFormatFile(string fname, ref Guid IID, out object Obj) { return Grr06Loader.OpenFormatFile(fname, ref IID, out Obj); }
        internal static int OpenFormatFileForInfo(string fname, ref Guid IID, out object Obj) { return Grr06Loader.OpenFormatFileForInfo(fname, ref IID, out Obj); }
        internal static int OpenFormatBytes(byte[] bytes, string fname, ref Guid IID, out object Obj)
        {
            //4.5.0.027
            if (Grr06Loader.Loader.VersionLong >= 4005000027)
            {
                Grr06Loader.dOpenFormatBytes2 OpenFormatBytes2 = (Grr06Loader.dOpenFormatBytes2)Grr06Loader.LoadFunction<Grr06Loader.dOpenFormatBytes2>();
                return OpenFormatBytes2(bytes, fname, ref IID, out Obj);
            }           
            return Grr06Loader.OpenFormatBytes(bytes, ref IID, out Obj);
        }

        internal static int OpenDataFile(string fname, Gordic.Report.Implementation.IGStructure str, Gordic.Report.Implementation.IGFormat fmt, ref Guid IID, out object Obj) { return Grr06Loader.OpenDataFile(fname, str, fmt, ref IID, out Obj); }

        internal static int StructureFormatCompare(Gordic.Report.Implementation.IGStructure str, Gordic.Report.Implementation.IGFormat frm) { return Grr06Loader.StructureFormatCompare(str, frm); }

        //[DllImport("g32grr06.dll", CharSet=CharSet.Ansi)]
        //private static extern int OpenSSRFile(
        //    string fname,
        //    ref Guid IID,
        //    [MarshalAs(UnmanagedType.Interface)]out object Obj
        //    );

        /// <summary>Parametry pro Grr06 vrstvu</summary>
        public static int grr06_SetParameter(string name, string value) { return Grr06Loader.SetParameter(name, value); }
        /// <summary>Parametry pro Grr06 vrstvu</summary>
        public static int grr06_GetParameter(string name, out string value) { return Grr06Loader.GetParameter(name, out value); }

        /// <summary>Verze grr06</summary>
        public static long grr06_Version()
        {
            Grr06Loader.Loader.Load();
            var versionInfo = Grr06Loader.Loader.VersionInfo;
            if (versionInfo != null)
            {
                return ((((long)versionInfo.FileMajorPart * 1000) + versionInfo.FileMinorPart) * 1000 + versionInfo.FileBuildPart) * 1000 + versionInfo.FilePrivatePart;
            }
            return 0;
        }

        /// <summary>Ladící funkce pro uvolnění knihovny Reporteru</summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        public static void grr06_Unload()
        {
            Grr06Loader.Loader.Free();
            typeof(Grr06Loader).TypeInitializer.Invoke(null,null);
        }

        #endregion
        #region GRR08 imports
        [System.Security.SecurityCritical]
        internal static class Grr08Loader
        {
            internal static FunctionLoader Loader = new FunctionLoader("grr08");
            public static Delegate LoadFunction<T>() { return Loader.LoadFunction<T>(); }

            public delegate int dCreatePageCacheEvent(
                [MarshalAs(UnmanagedType.Interface)]Gordic.Report.Implementation.IGDataCache dc,
                [MarshalAs(UnmanagedType.Interface)]Gordic.Report.Implementation.IPagingEvents pe,
                [MarshalAs(UnmanagedType.Interface)]Gordic.Report.Implementation.IPageInformation pi,
                [MarshalAs(UnmanagedType.Interface)]Gordic.Report.Implementation.IMetrics metr,
                ref Guid IID,
                [MarshalAs(UnmanagedType.Interface)]out object Obj
                );
            public static dCreatePageCacheEvent CreatePageCacheEvent = (dCreatePageCacheEvent)LoadFunction<dCreatePageCacheEvent>();

            public delegate int dCreatePageCache(
                [MarshalAs(UnmanagedType.Interface)]Gordic.Report.Implementation.IGDataCache dc,
                [MarshalAs(UnmanagedType.Interface)]Gordic.Report.Implementation.IPageInformation pi,
                [MarshalAs(UnmanagedType.Interface)]Gordic.Report.Implementation.IMetrics metr,
                ref Guid IID,
                [MarshalAs(UnmanagedType.Interface)]out object Obj
                );
            public static dCreatePageCache CreatePageCache = (dCreatePageCache)LoadFunction<dCreatePageCache>();

        }

        /// <summary>Internal use only</summary>
        public static int grr08_CreatePageCacheEvent(
            Gordic.Report.Implementation.IGDataCache dc,
            Gordic.Report.Implementation.IPagingEvents pe,
            Gordic.Report.Implementation.IPageInformation pi,
            Gordic.Report.Implementation.IMetrics metr,
            ref Guid IID,
            out object Obj
            )
        { return Grr08Loader.CreatePageCacheEvent(dc, pe, pi, metr, ref IID, out Obj); }

        /// <summary>Internal use only</summary>
        public static int grr08_CreatePageCache(
            Gordic.Report.Implementation.IGDataCache dc,
            Gordic.Report.Implementation.IPageInformation pi,
            Gordic.Report.Implementation.IMetrics metr,
            ref Guid IID,
            out object Obj
            )
        { return Grr08Loader.CreatePageCache(dc, pi, metr, ref IID, out Obj); }

        #endregion
        #region GRR09 imports

        const int GRR_SUCCESSFUL = 0;
        const int GRR_ERROR_OCURRED = -1;

        [System.Security.SecurityCritical]
        internal static class Grr09Loader
        {
            internal static FunctionLoader Loader = new FunctionLoader("grr09");
            public static Delegate LoadFunction<T>() { return Loader.LoadFunction<T>(); }

            public delegate IntPtr rep_GetLastError();
            public static readonly rep_GetLastError GetLastError = (rep_GetLastError)LoadFunction<rep_GetLastError>();

            public delegate short rep_RunBridge(string BridgeName, string OutputFile);
            public static readonly rep_RunBridge RunBridge = (rep_RunBridge)LoadFunction<rep_RunBridge>();

            public delegate short rep_RunBitmapBridge(int dpi, out IntPtr bmp);
            public static readonly rep_RunBitmapBridge RunBitmapBridge = (rep_RunBitmapBridge)LoadFunction<rep_RunBitmapBridge>();

            public delegate int rep_RunAction(string Action);
            public static readonly rep_RunAction RunAction = (rep_RunAction)LoadFunction<rep_RunAction>();

            public delegate IntPtr rep_GetFileTypes(string ALFName);
            public static readonly rep_GetFileTypes GetFileTypes = (rep_GetFileTypes)LoadFunction<rep_GetFileTypes>();

            public delegate IntPtr rep_GetFileTypesForGroup(string group);
            public static readonly rep_GetFileTypesForGroup GetFileTypesForGroup = (rep_GetFileTypesForGroup)LoadFunction<rep_GetFileTypesForGroup>();

            public delegate IntPtr rep_GetFileTypesFormat(Gordic.Report.Implementation.IGFormat group);
            public static readonly rep_GetFileTypesFormat GetFileTypesFormat = (rep_GetFileTypesFormat)LoadFunction<rep_GetFileTypesFormat>();            

            public delegate short rep_SetParameter(string Name, string Value);
            public static readonly rep_SetParameter SetParameter = (rep_SetParameter)LoadFunction<rep_SetParameter>();
            public delegate IntPtr rep_GetParameter(string Name);
            public static readonly rep_GetParameter GetParameter = (rep_GetParameter)LoadFunction<rep_GetParameter>();

            public delegate short rep_GetALFInfo(string Filename, string Output);
            public static readonly rep_GetALFInfo GetInfo = (rep_GetALFInfo)LoadFunction<rep_GetALFInfo>();

            public delegate short rep_SetData(Gordic.Report.Implementation.IGDataCache data);
            public static readonly rep_SetData SetData = (rep_SetData)LoadFunction<rep_SetData>();

            public delegate short rep_SetFormat(IPrintFormat pfrm);
            public static readonly rep_SetFormat SetFormat = (rep_SetFormat)LoadFunction<rep_SetFormat>();

            public delegate short rep_Free();
            public static readonly rep_Free Free = (rep_Free)LoadFunction<rep_Free>();

            public delegate int rep_GetPDFEngine([MarshalAs(UnmanagedType.Interface)]out object Obj);
            public static readonly rep_GetPDFEngine GetPDFEngine = (rep_GetPDFEngine)LoadFunction<rep_GetPDFEngine>();
            public delegate short rep_SupportsPDF();
            public static readonly rep_SupportsPDF SupportsPDF = (rep_SupportsPDF)LoadFunction<rep_SupportsPDF>();

            public delegate short rep_RunTextBridge(string InputFile, string BridgeName, string OutputFile);
            public static readonly rep_RunTextBridge RunTextBridge = (rep_RunTextBridge)LoadFunction<rep_RunTextBridge>();

            public delegate IntPtr rep_GetTextBridges();
            public static readonly rep_GetTextBridges GetTextBridges = (rep_GetTextBridges)LoadFunction<rep_GetTextBridges>();

            public delegate void rep_GetVersion(StringBuilder value);
            public static readonly rep_GetVersion GetVersion = (rep_GetVersion)LoadFunction<rep_GetVersion>();
        }
        /// <summary>Chybové hlášení z Grr09 vrstvy</summary>
        private static IntPtr grr09_GetLastError() { return Grr09Loader.GetLastError(); }

        private static short grr09_RunBridge(string BridgeName, string OutputFile) { return Grr09Loader.RunBridge(BridgeName, OutputFile); }

        internal static short grr09_RunBitmapBridge(int dpi, out IntPtr bmp) { return Grr09Loader.RunBitmapBridge(dpi, out bmp); }

        private static int grr09_RunAction(string Action) { return Grr09Loader.RunAction(Action); }

        private static IntPtr grr09_GetTypes(string ALFName) { return Grr09Loader.GetFileTypes(ALFName); }

        private static IntPtr grr09_GetTypesForGroup(string group) { return Grr09Loader.GetFileTypesForGroup(group); }
        private static IntPtr grr09_GetFileTypesFormat(Gordic.Report.Implementation.IGFormat format) { return Grr09Loader.GetFileTypesFormat(format); }

        private static short grr09_SetParameter(string Name, string Value) { return Grr09Loader.SetParameter(Name, Value); }
        private static IntPtr grr09_GetParameter(string Name) { return Grr09Loader.GetParameter(Name); }

        //private static short grr09_GetInfo(string Filename, string Output) { return Grr09Loader.GetInfo(Filename, Output); }

        internal static short grr09_SetData(Gordic.Report.Implementation.IGDataCache data) { return Grr09Loader.SetData(data); }

        private static short grr09_SetPrintFormat(IPrintFormat pfrm) { return Grr09Loader.SetFormat(pfrm); }

        internal static int grr09_GetPDFEngine(out object Obj) { return Grr09Loader.GetPDFEngine(out Obj); }
        ////[DllImport("g32grr09.dll", CharSet = CharSet.Ansi, EntryPoint = "rep_FreePDFEngine")]
        ////internal static extern short grr09_FreePDFEngine(IntPtr eng);
        internal static short grr09_SupportsPDF() { return Grr09Loader.SupportsPDF(); }

        private static short grr09_RunTextBridge(string InputFile, string BridgeName, string OutputFile) { return Grr09Loader.RunTextBridge(InputFile, BridgeName, OutputFile); }
        private static IntPtr grr09_GetTextBridges() { return Grr09Loader.GetTextBridges(); }

        internal static short grr09_Free() { return Grr09Loader.Free(); }

        private static void grr09_GetVersion(StringBuilder value) { Grr09Loader.GetVersion(value); }
        /// <summary>Informace o verzi GRR09</summary>
        public static Version grr09_Version
        {
            get
            {
                Version v = new Version();

                StringBuilder l_str = new StringBuilder(1024);
                grr09_GetVersion(l_str);

                string[] s = l_str.ToString().Split('\n');
                if (s.Length < 2) return v;
                string[] wa = s[1].Split(' ');
                string w = wa[wa.Length-1];
                Version.TryParse(w, out v);
                return v;
            }
        }
        /// <summary>Informace o verzi GRR09</summary>
        public static string grr09_FileVersion
        {
            get
            {
                return Grr09Loader.Loader.VersionInfo.FileVersion;
            }
        }

        /// <summary>Ladící funkce pro uvolnění knihovny Reporteru</summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        public static void grr09_Unload()
        {
            Grr09Loader.Free();
            Grr09Loader.Loader.Free();
            typeof(Grr09Loader).TypeInitializer.Invoke(null, null);
        }

        #endregion
        #region GRR10 imports
        [System.Security.SecurityCritical]
        internal static class Grr10Loader
        {
            internal static FunctionLoader Loader = new FunctionLoader("grr10");
            public static Delegate LoadFunction<T>() { return Loader.LoadFunction<T>(); }
            public static void Load() { Loader.Load(); }

            //GRR10_EXPORT rep_EncodeString(const char* string,int bufsize,char* buffer);
            public delegate int rep_EncodeString([MarshalAs(UnmanagedType.LPArray)]byte[] input, int bufsize, StringBuilder buffer);
            public static readonly rep_EncodeString EncodeString = (rep_EncodeString)LoadFunction<rep_EncodeString>();

            //GRR10_EXPORT rep_DecodeString(const char* string,int bufsize,char* buffer);
            public delegate int rep_DecodeString([In]string input, int bufsize, [MarshalAs(UnmanagedType.LPArray)] byte[] buffer);
            public static readonly rep_DecodeString DecodeString = (rep_DecodeString)LoadFunction<rep_DecodeString>();
        }

        private static int grr10_EncodeString(byte[] input, int bufsize, StringBuilder buffer) { return Grr10Loader.EncodeString(input, bufsize, buffer); }
        private static int grr10_DecodeString(string input, int bufsize, byte[] buffer) { return Grr10Loader.DecodeString(input, bufsize, buffer); }

        /// <summary>Ladící funkce pro uvolnění knihovny Reporteru</summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        public static void grr10_Unload()
        {
            Grr10Loader.Loader.Free();
            typeof(Grr10Loader).TypeInitializer.Invoke(null, null);
        }
        #endregion

        #region VIDRUN Unmanaged interfaces

        /// <exclude/>
        [GuidAttribute("24823852-8751-4BE0-B106-375B1FD47048")]
        [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
        [System.Security.SecurityCritical]
        public interface IPrintFormat
        {
            /// <exclude/>
            [PreserveSig]
            IntPtr GetName();

            /// <exclude/>
            [PreserveSig]
            IntPtr GetPrinterName();

            /// <exclude/>
            [PreserveSig]
            IntPtr GetDisplayName();
        }

        /// <exclude/>
        [GuidAttribute("24823854-8751-4BE0-B106-375B1FD47048")]
        [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
        [System.Security.SecurityCritical]
        public interface IPrintFormatGDI
        {
            /// <exclude/>
            [PreserveSig]
            IntPtr GetName();

            /// <exclude/>
            [PreserveSig]
            IntPtr GetPrinterName();

            /// <exclude/>
            [PreserveSig]
            IntPtr GetDisplayName();

            /// <exclude/>
            [PreserveSig]
            IntPtr GetPaperName();

            /// <exclude/>
            [PreserveSig]
            int GetTopMargin();

            /// <exclude/>
            [PreserveSig]
            int GetLeftMargin();

            /// <exclude/>
            [PreserveSig]
            int GetRightMargin();

            /// <exclude/>
            [PreserveSig]
            int GetBottomMargin();

            /// <exclude/>
            [PreserveSig]
            int GetOrientation();

            /// <exclude/>
            [PreserveSig]
            int GetDuplex();

            /// <exclude/>
            [PreserveSig]
            int GetColor();

            /// <exclude/>
            [PreserveSig]
            int GetTextWidth();

            /// <exclude/>
            [PreserveSig]
            int GetTextHeight();

            /// <exclude/>
            [PreserveSig]
            int GetPageWidth();

            /// <exclude/>
            [PreserveSig]
            int GetPageHeight();

            /// <exclude/>
            [PreserveSig]
            IntPtr GetFontName();

            /// <exclude/>
            [PreserveSig]
            int GetFontSize();

            /// <exclude/>
            [PreserveSig]
            int GetFontCharset();

            /// <exclude/>
            [PreserveSig]
            IntPtr GetCustomString();

            /// <exclude/>
            void __stub1();
            /// <exclude/>
            void __stub2();
            /// <exclude/>
            void __stub3();

            /// <exclude/>
            [PreserveSig]
            void GetmmPaperSize(out System.Drawing.Point p);

            /// <exclude/>
            [PreserveSig]
            void GetmmPageMargins(out System.Drawing.Rectangle p);

            /// <exclude/>
            [PreserveSig]
            void GetmmCharSize(out System.Drawing.Point p);
        }

        /// <exclude/>
        [GuidAttribute("24823853-8751-4BE0-B106-375B1FD47048")]
        [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
        [System.Security.SecurityCritical]
        public interface IPrintFormatText
        {
            /// <exclude/>
            [PreserveSig]
            IntPtr GetName();

            /// <exclude/>
            [PreserveSig]
            IntPtr GetPrinterName();

            /// <exclude/>
            [PreserveSig]
            IntPtr GetDisplayName();

            /// <exclude/>
            [PreserveSig]
            IntPtr GetPaperName();

            /// <exclude/>
            [PreserveSig]
            int GetTextWidth();

            /// <exclude/>
            [PreserveSig]
            int GetTextHeight();

            /// <exclude/>
            [PreserveSig]
            int GetTopMargin();

            /// <exclude/>
            [PreserveSig]
            int GetLeftMargin();

            /// <exclude/>
            [PreserveSig]
            IntPtr GetCsCode();
            /// <exclude/>
            [PreserveSig]
            IntPtr GetInitString();
            /// <exclude/>
            [PreserveSig]
            IntPtr GetFiniString();
            /// <exclude/>
            [PreserveSig]
            IntPtr GetBlockInitString();
            /// <exclude/>
            [PreserveSig]
            IntPtr GetBlockFiniString();

            /// <exclude/>
            [PreserveSig]
            int GetPageWidth();

            /// <exclude/>
            [PreserveSig]
            int GetPageHeight();

            /// <exclude/>
            void __stub1();
            /// <exclude/>
            void __stub2();
            /// <exclude/>
            void __stub3();
            /// <exclude/>
            void __stub4();

            /// <exclude/>
            [PreserveSig]
            IntPtr GetPageString();

            /// <exclude/>
            [PreserveSig]
            void GetmmPaperSize(out System.Drawing.Point p);

            /// <exclude/>
            [PreserveSig]
            void GetmmPageMargins(out System.Drawing.Rectangle p);

            /// <exclude/>
            [PreserveSig]
            void GetmmCharSize(out System.Drawing.Point p);

            /// <exclude/>
            [PreserveSig]
            void GetmmPageOrigin(out System.Drawing.Point p);
        }
        #endregion

        #region Error reporting

        /// <summary>Výjimka nativních GRR knihoven</summary>
        [System.Security.SecurityCritical]        
        public class GrrException : GReportException
        {
            FunctionLoader loader;
            int hresult;
            [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.NoInlining)]
            internal GrrException(int code, int rcex /*obvykle 9*/, FunctionLoader loader, int hresult, string msg)
                : base(code, rcex, Assembly.GetCallingAssembly(), msg, hresult.ToString()) //RC-EX 9 : Chyba reporteru {1}: {0}
            {
                this.hresult = hresult;
                this.loader = loader;
		    }
            internal GrrException(int code, int rcex /*obvykle 9*/, Assembly assembly, FunctionLoader loader, int hresult, string msg)
                : base(code, rcex, assembly, msg, hresult.ToString()) //RC-EX 9 : Chyba reporteru {1}: {0}
            {
                this.hresult = hresult;
                this.loader = loader;
            }
            /// <exclude/>
            protected GrrException(System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context)
            : base(info, context)
            {
            }

            /// <summary>chybové hlášení</summary>
            public override string Message
            {
                get
                {
                    StringBuilder l_oMessageBuilder = new StringBuilder();
                    //if (ShortMessage.StartsWith(Prefix) == false) AppendPrefix(l_oMessageBuilder);
                    l_oMessageBuilder.Append(ShortMessage);
                    AppendPostfix(l_oMessageBuilder, Code, AssemblyName, AssemblyVersion);
                    return l_oMessageBuilder.ToString();
                } // end method
            } // end property

            /// <summary>název assembly, ve které výjimka vznikla</summary>
            public override string AssemblyName
            {
                get { return loader.DllName; }
            }

            /// <summary>verze assembly, ve které výjimka vznikla</summary>
            public override string AssemblyVersion
            {
                get { return loader.Version; }
            }

            ///// <summary>kód výjimky</summary>
            //public override int Code
            //{
            //    [System.Security.SecuritySafeCritical]
            //    get { return this.hresult; }
            //}
        }

        /// <exclude/>
        public static void Throw06Error(int hresult)
        {
            if (hresult != 0)
            {
                StringBuilder msg = new StringBuilder(1024);
                if (hresult == S_FALSE)
                    msg.Append("S_FALSE");
                else
                    GetErrorText(msg, msg.Capacity);
                throw new GrrException(21000052, /*RC-EX*/ 9, Grr06Loader.Loader, hresult, msg.ToString());  //RC-EX 9 : Chyba reporteru: {0}
            }
        }
        /// <exclude/>
        public static bool S_Check06Error(int hresult)
        {
            if (hresult == S_FALSE) return false;
            Throw06Error(hresult);
            return true;
        }

        /// <exclude/>
        public static void Throw08Error(int hresult)
        {
            if (hresult != 0)
            {
                StringBuilder msg = new StringBuilder(1024);
                if (hresult == S_FALSE)
                    msg.Append("S_FALSE");
                else
                    GetErrorText(msg, msg.Capacity);
                throw new GrrException(21000057, /*RC-EX*/ 9, Grr08Loader.Loader, hresult, msg.ToString());  //RC-EX 9 : Chyba reporteru: {0}
            }
        }
        /// <exclude/>
        public static void Throw09Error(short err)
        {
            if (err != GRR_SUCCESSFUL)
            {
                IntPtr IntPtrMsg = grr09_GetLastError();
                String msg = Marshal.PtrToStringAnsi(IntPtrMsg);
                System.Diagnostics.Trace.WriteLine(String.Format("grr09_GetLastError={0}", msg));
                //throw new GReportException(21000018, 9, msg); // <resource value=9>Chyba reporteru: {0}</resource>
                throw new GrrException(21000053, /*RC-EX*/ 9, Grr09Loader.Loader, err, msg); //RC-EX 9 : Chyba reporteru: {0}
            }
        }
        /// <exclude/>
        public static void Throw09Error_HR(int err)
        {
            if (err != S_OK)
            {
                IntPtr IntPtrMsg = grr09_GetLastError();
                String msg = Marshal.PtrToStringAnsi(IntPtrMsg);
                System.Diagnostics.Trace.WriteLine(String.Format("grr09_GetLastError={0}", msg));
                //throw new GReportException(21000031, 9, msg); // <resource value=9>Chyba reporteru: {0}</resource>
                throw new GrrException(21000054, /*RC-EX*/ 9, Grr09Loader.Loader, err, msg); //RC-EX 9 : Chyba reporteru: {0}
            }
        }


        #endregion
        #region Public members

		//public static string FilesPath = "FilesPath";
		
		/// <summary>
		/// Interní funkce reporteru
		/// </summary>
        public static void SetParameter(string name,string value)
        {
            Throw06Error(grr06_SetParameter(name,value));
        }

		/// <summary>
		/// Interní funkce reporteru
		/// </summary>
		public static void SetParameter09(string name, string value)
		{
            Throw09Error(grr09_SetParameter(name, value));
		}

        /// <summary>
        /// Interní funkce reporteru
        /// </summary>
        public static string GetParameter(string name)
        {
            //IntPtr l_str;
            //Throw06Error(grr06_GetParameter(name,out l_str));
            //return Marshal.PtrToStringAnsi(l_str);
            string l_str;
            Throw06Error(grr06_GetParameter(name, out l_str));
            return l_str;
        }

        /// <summary>
        /// Interní funkce reporteru
        /// </summary>
        public static string GetParameter09(string name)
        {
            IntPtr l_str =  grr09_GetParameter(name);
            return Marshal.PtrToStringAnsi(l_str);
        }

		/// <summary>
		/// Interní funkce reporteru
		/// </summary>
		public static GReporterStructure OpenStructure(string fname, string fdi = null)
        {
            System.Diagnostics.Trace.WriteLine(String.Format("Report unsafe wrapper OpenStructure {0}.", fname));
            object ret;
            Guid g = typeof(Gordic.Report.Implementation.IGStructure).GUID;
            try
            {
			    int hr = OpenStructureFile(fname,ref g,out ret);
        	    Throw06Error(hr);
            }
            catch (GException ge)
            {
                throw new GReportException(21000125, 61, ge, fdi ?? fname); //RC-EX 61 : Nastala chyba při pokusu o otevření souboru formátu XME {0}
            }
            catch (Exception x) { FunctionLoader.CheckLoaderException(x); throw; }
		    return new GReporterStructure(ret as Gordic.Report.Implementation.IGStructure);
        }

		/// <summary>
		/// Vrací dostupné převodní mosty pro specifikovaný vstupní formát
		/// </summary>
		/// <param name="group">vstupní formát</param>
		/// <returns>seznam mostů oddělený pajpou</returns>
        public static string GetTypesForGroup(string group)
        {
            string res;

            try
            {
                IntPtr ret = grr09_GetTypesForGroup(group);
                res = Marshal.PtrToStringAnsi(ret);
            }
            catch (Exception x) { FunctionLoader.CheckLoaderException(x); throw; }

            return res;
        }
        /// <summary>
        /// Vrací dostupné převodní mosty pro specifikovaný vstupní formát
        /// </summary>
        /// <returns>seznam mostů oddělený pajpou</returns>
        public static string GetFileTypesFormat(Gordic.Report.Implementation.IGFormat format)
        {
            string res;

            try
            {
                IntPtr ret = grr09_GetFileTypesFormat(format);
                res = Marshal.PtrToStringAnsi(ret);
            }
            catch (Exception x) { FunctionLoader.CheckLoaderException(x); throw; }

            return res;
        }
		/// <summary>
		/// Interní funkce reporteru
		/// </summary>
		public static GReporterFormat OpenFormatForInfo(string fname, string fdi = null) 
		{ 
			try 
			{
                System.Diagnostics.Trace.WriteLine(String.Format("Report unsafe wrapper OpenFormatForInfo {0}.", fname));
                object ret;
				int hr;
                Guid g = typeof(Gordic.Report.Implementation.IGFormat).GUID;
				hr = OpenFormatFileForInfo(fname,ref g,out ret);
				Throw06Error(hr);
		                return new GReporterFormat(ret as Gordic.Report.Implementation.IGFormat);
			}
			catch (GException ge)
			{
                throw new GReportException(21000055, 10, ge, fdi ?? fname); //RC-EX 10 : Nastala chyba při pokusu o otevření souboru formátu ALF {0}
            }    
            catch (Exception x) { FunctionLoader.CheckLoaderException(x); throw; }
		}

		/// <summary>
		/// Interní funkce reporteru
		/// </summary>
		public static GReporterFormat OpenFormat(string fname, string fdi = null)
        {
			try 
			{
                System.Diagnostics.Trace.WriteLine(String.Format("Report unsafe wrapper OpenFormat {0}.", fname));
                object ret;
				int hr;
                Guid g = typeof(Gordic.Report.Implementation.IGFormat).GUID;
				hr = OpenFormatFile(fname,ref g,out ret);
				Throw06Error(hr);
                return new GReporterFormat(ret as Gordic.Report.Implementation.IGFormat);
			}
			catch (GException ge)
			{
                throw new GReportException(21000056, 10, ge, fdi ?? fname); //RC-EX 10 : Nastala chyba při pokusu o otevření souboru formátu ALF {0}
            }
            catch (Exception x) { FunctionLoader.CheckLoaderException(x); throw; }
        }

		/// <summary>
		/// Interní funkce reporteru
		/// </summary>
		public static GReporterData OpenData(string fname,GReporterStructure s,GReporterFormat f, string fdi_dat = null, string fdi_alf = null)
        {
            System.Diagnostics.Trace.WriteLine(String.Format("Report unsafe wrapper OpenData {0}.", fname));
            object ret;
            Guid g = typeof(Gordic.Report.Implementation.IGDataCache).GUID;
            try
            {
			    int hr = OpenDataFile(fname,s.Structure,f.Format,ref g,out ret);
			    Throw06Error(hr);
            }
            catch (GException ge)
            {
                throw new GReportException(21000123, 60, ge, fdi_dat ?? fname, fdi_alf); //RC-EX 60 : Nastala chyba při pokusu o otevření datového souboru {0} {1}
            }
            catch (Exception x) { FunctionLoader.CheckLoaderException(x); throw; }
            return new GReporterData(ret as Gordic.Report.Implementation.IGDataCache);
        }
        /// <summary>
        /// Interní funkce reporteru
        /// </summary>
        public static GReporterData OpenData(string fname, Gordic.Report.Implementation.IGStructure s, Gordic.Report.Implementation.IGFormat f, string fdi = null, string fdi_alf = null)
        {
            System.Diagnostics.Trace.WriteLine(String.Format("Report unsafe wrapper OpenData {0}.", fname));
            object ret;
            Guid g = typeof(Gordic.Report.Implementation.IGDataCache).GUID;
            try
            {
                int hr = OpenDataFile(fname, s, f, ref g, out ret);
                Throw06Error(hr);
            }
            catch (GException ge)
            {
                throw new GReportException(21000124, 60, ge, fdi ?? fname, fdi_alf); //RC-EX 60 : Nastala chyba při pokusu o otevření datového souboru {0}
            }
            catch (Exception x) { FunctionLoader.CheckLoaderException(x); throw; }
            return new GReporterData(ret as Gordic.Report.Implementation.IGDataCache);
        }

        ///<summary>jednorázové spuštění akce Grr mostu</summary>
        public static void RunAction(GReporterData data, string actionName, ref string copyOutput)
        {
            try
            {
                SetParameter09("CopyActionOutputTo", copyOutput);
                Throw09Error(grr09_SetData(data.Data));
                //SetPrintFormat(pfrm);
                Throw09Error_HR(grr09_RunAction(actionName));
                copyOutput = GetParameter09("CopyActionOutputTo");
            }
            catch (Exception x) { FunctionLoader.CheckLoaderException(x); throw; }
            finally
            {
                grr09_Free();
            }
        }

		/// <summary>
		/// Interní funkce reporteru
		/// </summary>
		public static void RunBridge(GReporterData data,string bridge,string OutFile)
		{
			try 
			{ 
				Throw09Error(grr09_SetData(data.Data)); 
				Throw09Error(grr09_RunBridge(bridge,OutFile)); 
			}
            catch (Exception x) { FunctionLoader.CheckLoaderException(x); throw; }
            finally 
			{ 
				grr09_Free(); 
			} 
		}

        /// <summary>
        /// Interní funkce reporteru
        /// </summary>
        public static void RunBridge(GReporterData data, IPrintFormat pfrm, string bridge, string OutFile)
        {
            try
            {
                Throw09Error(grr09_SetData(data.Data));
                SetPrintFormat(pfrm);
                Throw09Error(grr09_RunBridge(bridge, OutFile));
            }
            catch (Exception x) { FunctionLoader.CheckLoaderException(x); throw; }
            finally
            {
                grr09_Free();
            }
        }

        private static void SetPrintFormat(IPrintFormat pfrm)
        {
            if (pfrm == null) return;
            try
            {
                Throw09Error(grr09_SetPrintFormat(pfrm));
            }
            catch (EntryPointNotFoundException) //takova funkce neexistuje (= stara verze grr09)
            {
                return;
            }
        }

        /// <summary>
        /// Interní funkce reporteru
        /// </summary>
        public static byte[] RunBridge(GReporterData data, string bridge)
        {
            string fname = GTempFiles.CreateTempFile();
            try
            {
                RunBridge(data, bridge, fname);

                FileStream fs = new FileStream(fname, FileMode.Open, FileAccess.Read);
                long length = fs.Length;
                byte[] result = new byte[length];
                fs.Read(result, 0, (int)length);
                fs.Close();
                return result;
            }
            finally
            {
                GTempFiles.DeleteTempFile(fname);
            }
        }

		/// <summary>
		/// Interní funkce reporteru
		/// </summary>
		public static string ExportToHtml(GReporterData data)
        {
            byte[] html = RunBridge(data,"HTML");
            string decoded = Encoding.GetEncoding(1250).GetString(html);
            return decoded;
        }

        /// <summary>
        /// Interní funkce reporteru
        /// </summary>
        static public string EncodeString(byte[] input)
        {
            StringBuilder b = new StringBuilder(input.Length*2);
        again:
            int res = grr10_EncodeString(input, b.Capacity, b);
            if (res == S_FALSE)
            {
                b.Capacity *= 2;
                goto again;
            }
            return b.ToString();            
        }

        /// <summary>
        /// Interní funkce reporteru
        /// </summary>
        static public byte[] DecodeString(string input)
        {
            int len = input.Length * 4;
        again:
            byte[] b = new byte[len];
            int res = grr10_DecodeString(input, b.Length, b);
            if (res == S_FALSE)
            {
                len *= 2;
                goto again;
            }
            int size = Array.IndexOf<byte>(b, 0, 0, len);
            System.Diagnostics.Debug.Assert(size >= 0);
            //byte[] ret = new byte[size];
            //Array.Copy(b,ret,size);
            //return ret;
            Array.Resize(ref b, size);
            return b;
        }

        /// <summary>
        /// Vrací dostupné převodní mosty pro specifikovaný vstupní formát
        /// </summary>
        /// <returns>seznam mostů oddělený pajpou</returns>
        public static string GetTextBridges()
        {
            try
            {
                string res;

                IntPtr ret = grr09_GetTextBridges();
                res = Marshal.PtrToStringAnsi(ret);
                return res;
            }
            catch (EntryPointNotFoundException) //takova funkce neexistuje (= stara verze grr09)
            {
                return "";
            }
            catch (Exception x) { FunctionLoader.CheckLoaderException(x); throw; }
        }
        /// <summary>
        /// Interní funkce reporteru
        /// </summary>
        public static void RunTextBridge(string InFile, IPrintFormat pfrm, string bridge, string OutFile)
        {
            try
            {
                if (bridge == "PDF$A2" && grr09_Version < new Version(4, 4, 0, 034))
                    throw new GNotImplementedException(21000121, 57, grr09_FileVersion, "PDF/A2"); //RC-EX 57 : Převod do {1} není podporován. Máte starou verzi GRR ({0}).
                SetPrintFormat(pfrm);
                Throw09Error(grr09_RunTextBridge(InFile, bridge, OutFile));
            }
            catch (Exception x) { FunctionLoader.CheckLoaderException(x); throw; }
            finally
            {
                grr09_Free();
            }
        }

        #endregion
	}
}
