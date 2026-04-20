//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.NativeMethods.cs                         </Name>
//    <Description> Obsahuje P/Invoke metody funkcí Windows API.                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Diagnostics.CodeAnalysis;
using System.Drawing;
using System.Runtime.InteropServices;
using System.Text;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Docking;
using System.Runtime.InteropServices.ComTypes;
using Microsoft.Win32.SafeHandles;

namespace Gordic.GFE.Parsers.Utils
{
    public static class NativeConstants
    {
        /// SC_CLOSE -> 0xF060
        public const uint SC_CLOSE = 61536;
        /// SC_MAXIMIZE -> 0xF030
        public const uint SC_MAXIMIZE = 61488;
        /// SC_MINIMIZE -> 0xF020
        public const uint SC_MINIMIZE = 61472;
        /// MF_DISABLED -> 0x00000002L
        public const int MF_DISABLED = 2;
        /// MF_ENABLED -> 0x00000001L
        public const int MF_ENABLED = 1;
    }

    /// <summary>
    /// Obsahuje P/Invoke metody funkcí Windows API.
    /// </summary>
    public class NativeMethods
    {
        static readonly IntPtr FALSE = new IntPtr(0);
        static readonly IntPtr TRUE = new IntPtr(1);

        /// <exclude/>
        public const int SWP_DRAWFRAME = 0x20;
        /// <exclude/>
        public const int SWP_NOMOVE = 0x2;
        /// <exclude/>
        public const int SWP_NOSIZE = 0x1;
        /// <exclude/>
        public const int SWP_NOZORDER = 0x4;

        /// <exclude/>
        public const int GWL_STYLE = (-16);
        /// <exclude/>
        public const uint WS_MAXIMIZE = 0x1000000;
        public const uint WS_CAPTION = WS_BORDER | WS_DLGFRAME;
        public const uint WS_BORDER = 0x00800000;
        public const uint WS_DLGFRAME = 0x00400000;
        public const uint WS_SYSMENU = 0x00080000;
        public const uint WS_THICKFRAME = 0x00040000;

        /// <exclude/>
        public const int EM_GETSEL = 0x00B0;
        /// <exclude/>
        public const int EM_LINEINDEX = 0x00BB;
        /// <exclude/>
        public const int EM_LINEFROMCHAR = 0x00C9;
        /// <exclude/>
        public const int EM_POSFROMCHAR = 0x00D6;

        /// <summary>
        /// Flag pro attributy souboru
        /// </summary>
        public const Int32 FILE_ATTRIBUTE_NORMAL = 0x80;
        /// <exclude/>
        public static Guid IID_IShellFolder = new Guid("000214E6-0000-0000-C000-000000000046");

        /// <exclude/>
        public const int WM_SETREDRAW = 0x00B;
        /// <exclude/>
        public const int WM_USER = 0x400;

        /// <exclude/>
        [Flags]
        public enum STRRET : uint
        {
            /// <exclude/>
            STRRET_WSTR = 0,
            /// <exclude/>
            STRRET_OFFSET = 0x1,
            /// <exclude/>
            STRRET_CSTR = 0x2,
        }

        /// <summary>
        /// http://msdn.microsoft.com/en-us/library/windows/desktop/bb762539(v=vs.85).aspx
        /// </summary>
        [Flags]
        public enum SHCONTF : uint
        {
            /// <summary>
            /// Windows 7 and later. The calling application is checking for the existence of child items in the folder.
            /// </summary>
            SHCONTF_CHECKING_FOR_CHILDREN = 0x00010,
            /// <summary>
            /// Include items that are folders in the enumeration.
            /// </summary>
            SHCONTF_FOLDERS = 0x0020,
            /// <summary>
            /// Include items that are not folders in the enumeration.
            /// </summary>
            SHCONTF_NONFOLDERS = 0x0040,
            /// <summary>
            /// Include hidden items in the enumeration. 
            /// This does not include hidden system items. 
            /// (To include hidden system items, use SHCONTF_INCLUDESUPERHIDDEN.)
            /// </summary>
            SHCONTF_INCLUDEHIDDEN = 0x0080,
            /// <summary>
            /// No longer used; always assumed. IShellFolder::EnumObjects can 
            /// return without validating the enumeration object. 
            /// Validation can be postponed until the first call to IEnumIDList::Next. 
            /// Use this flag when a user interface might be displayed prior to the first IEnumIDList::Next call. 
            /// For a user interface to be presented, hwnd must be set to a valid window handle.
            /// </summary>
            SHCONTF_INIT_ON_FIRST_NEXT = 0x0100,
            /// <summary>
            /// The calling application is looking for printer objects.
            /// </summary>
            SHCONTF_NETPRINTERSRCH = 0x0200,
            /// <summary>
            /// The calling application is looking for resources that can be shared.
            /// </summary>
            SHCONTF_SHAREABLE = 0x0400,
            /// <summary>
            /// Include items with accessible storage and their ancestors, including hidden items.
            /// </summary>
            SHCONTF_STORAGE = 0x0800,
            /// <summary>
            /// Windows 7 and later. Child folders should provide a navigation enumeration.
            /// </summary>
            SHCONTF_NAVIGATION_ENUM = 0x01000,
            /// <summary>
            /// Windows Vista and later. 
            /// The calling application is looking for resources that can be enumerated quickly.
            /// </summary>
            SHCONTF_FASTITEMS = 0x02000,
            /// <summary>
            /// Windows Vista and later. 
            /// Enumerate items as a simple list even if the folder itself is not structured in that way.
            /// </summary>
            SHCONTF_FLATLIST = 0x04000,
            /// <summary>
            /// Windows Vista and later. The calling application is monitoring for change notifications. 
            /// This means that the enumerator does not have to return all results.
            /// Items can be reported through change notifications.
            /// </summary>
            SHCONTF_ENABLE_ASYNC = 0x08000,
            /// <summary>
            /// Windows 7 and later. Include hidden system items in the enumeration. 
            /// This value does not include hidden non-system items. 
            /// (To include hidden non-system items, use SHCONTF_INCLUDEHIDDEN.)
            /// </summary>
            SHCONTF_INCLUDESUPERHIDDEN = 0x10000
        }

        /// <summary>
        /// http://www.jam-software.com/shellbrowser_net/api_doc/EN/html/T_Jam_Shell_SFGAOF.htm
        /// </summary>
        [Flags]
        public enum SFGAOF : uint
        {
            /// <summary>
            /// The specified items can be copied. 
            /// </summary>
            SFGAO_CANCOPY = 0x1,
            /// <summary>
            /// The specified items can be moved. 
            /// </summary>
            SFGAO_CANMOVE = 0x2,
            /// <summary>
            /// Shortcuts can be created for the specified items.
            /// </summary>
            SFGAO_CANLINK = 0x4,
            /// <summary>
            /// The specified items can be bound to an IStorage interface through BindToObject(IID_IStorage)
            /// </summary>
            SFGAO_STORAGE = 0x00000008,
            /// <summary>
            /// The specified items can be renamed.
            /// </summary>
            SFGAO_CANRENAME = 0x00000010,
            /// <summary>
            /// The specified items can be deleted.
            /// </summary>
            SFGAO_CANDELETE = 0x00000020,          // Objects can be deleted
            /// <exclude/>
            SFGAO_HASPROPSHEET = 0x00000040,       // Objects have property sheets
            /// <exclude/>
            SFGAO_DROPTARGET = 0x00000100,         // Objects are drop target
            /// <exclude/>
            SFGAO_CAPABILITYMASK = 0x00000177,
            /// <exclude/>
            SFGAO_ENCRYPTED = 0x00002000,          // Object is encrypted (use alt color)
            /// <exclude/>
            SFGAO_ISSLOW = 0x00004000,             // 'Slow' object
            /// <exclude/>
            SFGAO_GHOSTED = 0x00008000,            // Ghosted icon
            /// <exclude/>
            SFGAO_LINK = 0x00010000,               // Shortcut (link)
            /// <exclude/>
            SFGAO_SHARE = 0x00020000,              // Shared
            /// <exclude/>
            SFGAO_READONLY = 0x00040000,           // Read-only
            /// <exclude/>
            SFGAO_HIDDEN = 0x00080000,             // Hidden object
            /// <exclude/>
            SFGAO_DISPLAYATTRMASK = 0x000FC000,
            /// <exclude/>
            SFGAO_FILESYSANCESTOR = 0x10000000,    // May contain children with SFGAO_FILESYSTEM
            /// <exclude/>
            SFGAO_FOLDER = 0x20000000,             // Support BindToObject(IID_IShellFolder)
            /// <exclude/>
            SFGAO_FILESYSTEM = 0x40000000,         // Is a win32 file system object (file/folder/root)
            /// <exclude/>
            SFGAO_HASSUBFOLDER = 0x80000000,       // May contain children with SFGAO_FOLDER
            /// <exclude/>
            SFGAO_CONTENTSMASK = 0x80000000,
            /// <exclude/>
            SFGAO_VALIDATE = 0x01000000,           // Invalidate cached information
            /// <exclude/>
            SFGAO_REMOVABLE = 0x02000000,          // Is this removeable media?
            /// <exclude/>
            SFGAO_COMPRESSED = 0x04000000,         // Object is compressed (use alt color)
            /// <exclude/>
            SFGAO_BROWSABLE = 0x08000000,          // Supports IShellFolder, but only implements CreateViewObject() (non-folder view)
            /// <exclude/>
            SFGAO_NONENUMERATED = 0x00100000,      // Is a non-enumerated object
            /// <exclude/>
            SFGAO_NEWCONTENT = 0x00200000,         // Should show bold in explorer tree
            /// <exclude/>
            SFGAO_CANMONIKER = 0x00400000,         // Defunct
            /// <exclude/>
            SFGAO_HASSTORAGE = 0x00400000,         // Defunct
            /// <exclude/>
            SFGAO_STREAM = 0x00400000,             // Supports BindToObject(IID_IStream)
            /// <exclude/>
            SFGAO_STORAGEANCESTOR = 0x00800000,    // May contain children with SFGAO_STORAGE or SFGAO_STREAM
            /// <exclude/>
            SFGAO_STORAGECAPMASK = 0x70C50008,     // For determining storage capabilities, ie for open/save semantics
        }

        /// <summary>
        /// http://msdn.microsoft.com/en-us/library/aa453709.aspx
        /// </summary>
        [Flags]
        public enum SHGNO : uint
        {
            /// <summary>
            /// Full name. The name is relative to the desktop computer and not to a specific folder. 
            /// This value is used for generic display of the name of the specified file object or subfolder.
            /// </summary>
            SHGDN_NORMAL = 0x0000,
            /// <summary>
            /// Relative name. The name is relative to the folder that is processing the name.
            /// </summary>
            SHGDN_INFOLDER = 0x0001,
            /// <summary>
            /// The name is used for in-place editing when the user renames the item.
            /// </summary>
            SHGDN_FOREDITING = 0x1000,
            /// <summary>
            /// The name is displayed in an address bar combo box.
            /// </summary>
            SHGDN_FORADDRESSBAR = 0x4000,
            /// <summary>
            /// The name is used for parsing. That is, it can be passed to IShellFolder::ParseDisplayName 
            /// to recover the object's pointer to an item identifier list (PIDL). 
            /// The form this name takes depends on the particular object.
            /// </summary>
            SHGDN_FORPARSING = 0x8000
        }

        /// <summary>
        /// http://msdn.microsoft.com/en-us/library/aa453707.aspx
        /// </summary>
        [Flags]
        public enum CSIDL : uint
        {
            /// <summary>
            /// File system directory that serves as a common repository for application-specific data
            /// </summary>
            CSIDL_APPDATA = 0x001A,
            /// <summary>
            /// Not supported on Smartphone.
            /// </summary>
            CSIDL_DESKTOP = 0x0000,
            /// <summary>
            /// File system directory used to physically store file objects 
            /// on the desktop (not to be confused with the desktop folder itself). 
            /// </summary>
            CSIDL_DESKTOPDIRECTORY = 0x0010,
            /// <summary>
            /// The file system directory that serves as a common repository for the user's favorite items.
            /// </summary>
            CSIDL_FAVORITES = 0x0006,
            /// <summary>
            /// The virtual folder that contains fonts.
            /// </summary>
            CSIDL_FONTS = 0x0014,
            /// <summary>
            /// Folder that contains music files. 
            /// </summary>
            CSIDL_MYMUSIC = 0x000d,
            /// <summary>
            /// Folder that contains picture files.
            /// </summary>
            CSIDL_MYPICTURES = 0x0027,
            /// <summary>
            /// Folder that contains video files. 
            /// </summary>
            CSIDL_MYVIDEO = 0x000e,
            /// <summary>
            /// The file system directory that serves as a common repository for documents.
            /// </summary>
            CSIDL_PERSONAL = 0x0005,
            /// <summary>
            /// Folder that contains the profile of the user.
            /// </summary>
            CSIDL_PROFILE = 0x0028,
            /// <summary>
            /// The program files folder.
            /// </summary>
            CSIDL_PROGRAM_FILES = 0x0026,
            /// <summary>
            /// The file system directory that contains the user's program groups, which are also file system directories.
            /// </summary>
            CSIDL_PROGRAMS = 0x0002,
            /// <summary>
            /// File system directory that contains the user's most recently used documents. 
            /// </summary>
            CSIDL_RECENT = 0x0008,
            /// <summary>
            /// The file system directory that corresponds to the user's Startup program group. 
            /// The system starts these programs when a device is powered on.
            /// </summary>
            CSIDL_STARTUP = 0x0007,
            /// <summary>
            /// The Windows folder.
            /// </summary>
            CSIDL_WINDOWS = 0x0024
        }

        /// <summary>
        /// SHGFI flagy
        /// </summary>
        [Flags]
        public enum SHGFI
        {
            /// <exclude/>
            SHGFI_ICON = 0x000000100,
            /// <exclude/>
            SHGFI_DISPLAYNAME = 0x000000200,
            /// <exclude/>
            SHGFI_TYPENAME = 0x000000400,
            /// <exclude/>
            SHGFI_ATTRIBUTES = 0x000000800,
            /// <exclude/>
            SHGFI_ICONLOCATION = 0x000001000,
            /// <exclude/>
            SHGFI_EXETYPE = 0x000002000,
            /// <exclude/>
            SHGFI_SYSICONINDEX = 0x000004000,
            /// <exclude/>
            SHGFI_LINKOVERLAY = 0x000008000,
            /// <exclude/>
            SHGFI_SELECTED = 0x000010000,
            /// <exclude/>
            SHGFI_ATTR_SPECIFIED = 0x000020000,
            /// <exclude/>
            SHGFI_LARGEICON = 0x000000000,
            /// <exclude/>
            SHGFI_SMALLICON = 0x000000001,
            /// <exclude/>
            SHGFI_OPENICON = 0x000000002,
            /// <exclude/>
            SHGFI_SHELLICONSIZE = 0x000000004,
            /// <exclude/>
            SHGFI_PIDL = 0x000000008,
            /// <exclude/>
            SHGFI_USEFILEATTRIBUTES = 0x000000010,
            /// <exclude/>
            SHGFI_ADDOVERLAYS = 0x000000020,
            /// <exclude/>
            SHGFI_OVERLAYINDEX = 0x000000040
        }

        /// <exclude/>
        [Flags()]
        public enum RedrawWindowFlags : uint
        {
            /// <summary>
            /// Invalidates the rectangle or region that you specify in lprcUpdate or hrgnUpdate.
            /// You can set only one of these parameters to a non-NULL value. If both are NULL, RDW_INVALIDATE invalidates the entire window.
            /// </summary>
            Invalidate = 0x1,

            /// <summary>Causes the OS to post a WM_PAINT message to the window regardless of whether a portion of the window is invalid.</summary>
            InternalPaint = 0x2,

            /// <summary>
            /// Causes the window to receive a WM_ERASEBKGND message when the window is repainted.
            /// Specify this value in combination with the RDW_INVALIDATE value; otherwise, RDW_ERASE has no effect.
            /// </summary>
            Erase = 0x4,

            /// <summary>
            /// Validates the rectangle or region that you specify in lprcUpdate or hrgnUpdate.
            /// You can set only one of these parameters to a non-NULL value. If both are NULL, RDW_VALIDATE validates the entire window.
            /// This value does not affect internal WM_PAINT messages.
            /// </summary>
            Validate = 0x8,

            NoInternalPaint = 0x10,

            /// <summary>Suppresses any pending WM_ERASEBKGND messages.</summary>
            NoErase = 0x20,

            /// <summary>Excludes child windows, if any, from the repainting operation.</summary>
            NoChildren = 0x40,

            /// <summary>Includes child windows, if any, in the repainting operation.</summary>
            AllChildren = 0x80,

            /// <summary>Causes the affected windows, which you specify by setting the RDW_ALLCHILDREN and RDW_NOCHILDREN values, to receive WM_ERASEBKGND and WM_PAINT messages before the RedrawWindow returns, if necessary.</summary>
            UpdateNow = 0x100,

            /// <summary>
            /// Causes the affected windows, which you specify by setting the RDW_ALLCHILDREN and RDW_NOCHILDREN values, to receive WM_ERASEBKGND messages before RedrawWindow returns, if necessary.
            /// The affected windows receive WM_PAINT messages at the ordinary time.
            /// </summary>
            EraseNow = 0x200,

            Frame = 0x400,

            NoFrame = 0x800
        }

        /// <exclude/>
        public static void SetWindowRedraw(IntPtr hWnd, bool allowRedraw)
        {
            SendMessage(hWnd, WM_SETREDRAW, allowRedraw ? TRUE : FALSE, IntPtr.Zero);
        }

        /// <exclude/>
        public static bool IsKeyPressed(Keys key)
        {
            return GetKeyState((int)key) < 0;
        }

        /// <exclude/>
        public delegate IntPtr HookProc(int code, IntPtr wParam, IntPtr lParam);

        /// <exclude/>
        [DllImport("user32.dll", CharSet = CharSet.Auto)]
        [return: MarshalAs(UnmanagedType.Bool)]
        public static extern bool DragDetect(IntPtr hWnd, Point pt);
        /// <exclude/>
        [DllImport("user32.dll", CharSet = CharSet.Auto)]
        [return: MarshalAs(UnmanagedType.Bool)]
        public static extern bool PostMessage(IntPtr hWnd, int Msg, uint wParam, uint lParam);
        /// <exclude/>
        [DllImport("user32.dll", CharSet = CharSet.Auto)]
        public static extern int ShowWindow(IntPtr hWnd, short cmdShow);
        /// <exclude/>
        [DllImport("User32.dll", CharSet = CharSet.Auto)]
        public static extern int SetWindowPos(IntPtr hWnd, IntPtr hWndAfter, int X, int Y, int Width, int Height, FlagsSetWindowPos flags);
        /// <exclude/>
        [DllImport("user32.dll", CharSet = CharSet.Auto)]
        public static extern int GetWindowLong(IntPtr hWnd, int Index);
        /// <exclude/>
        /// <exclude/>
        [DllImport("user32.dll", CharSet = CharSet.Auto)]
        public static extern int ShowScrollBar(IntPtr hWnd, int wBar, int bShow);
        /// <exclude/>
        [DllImport("user32.dll", CharSet = CharSet.Auto)]
        //*********************************
        // Potlačení zprávy
        //*********************************
        [SuppressMessage("Microsoft.Portability", "CA1901:PInvokeDeclarationsShouldBePortable", MessageId = "0")]
        public static extern IntPtr WindowFromPoint(Point point);
        /// <exclude/>
        [DllImport("user32.dll")]
        public static extern IntPtr SetWindowsHookEx(HookType code, HookProc func, IntPtr hInstance, int threadID);
        /// <exclude/>
        [DllImport("user32.dll")]
        public static extern int UnhookWindowsHookEx(IntPtr hhook);
        /// <exclude/>
        [DllImport("user32.dll")]
        public static extern IntPtr CallNextHookEx(IntPtr hhook, int code, IntPtr wParam, IntPtr lParam);

        #region SHFileOperation
        public enum FO_FUNC : uint
        {
            FO_MOVE = 0x0001,
            FO_COPY = 0x0002,
            FO_DELETE = 0x0003,
            FO_RENAME = 0x0004,
        }

        [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
        public struct SHFILEOPSTRUCT
        {
            /// <exclude/>
            public IntPtr hwnd;
            /// <exclude/>
            public FO_FUNC wFunc;
            /// <exclude/>
            [MarshalAs(UnmanagedType.LPWStr)]
            public string pFrom;
            /// <exclude/>
            [MarshalAs(UnmanagedType.LPWStr)]
            public string pTo;
            /// <exclude/>
            public FILEOP_FLAGS fFlags;
            /// <exclude/>
            public bool fAnyOperationsAborted;
            /// <exclude/>
            public IntPtr hNameMappings;
            /// <exclude/>
            [MarshalAs(UnmanagedType.LPWStr)]
            public string lpszProgressTitle;
        }

        [Flags]
        public enum FILEOP_FLAGS : ushort
        {
            None = 0,
            FOF_MULTIDESTFILES = 0x0001,
            FOF_CONFIRMMOUSE = 0x0002,
            FOF_SILENT = 0x0004,  // ne vytvářet progress/report
            FOF_RENAMEONCOLLISION = 0x0008,
            FOF_NOCONFIRMATION = 0x0010,
            FOF_WANTMAPPINGHANDLE = 0x0020,  // vyplní SHFILEOPSTRUCT.hNameMappings
            // musí být uvolněn pomocí SHFreeNameMappings
            FOF_ALLOWUNDO = 0x0040,
            FOF_FILESONLY = 0x0080,  // v *.*, pouze soubory
            FOF_SIMPLEPROGRESS = 0x0100,  // myšleno nezobrazovat názvy souborů
            FOF_NOCONFIRMMKDIR = 0x0200,  // ne pro všechny složky
            FOF_NOERRORUI = 0x0400,  // nyzobrazovat chybu UI
            FOF_NOCOPYSECURITYATTRIBS = 0x0800,  // nekopírovat Security Attributes souboru
            FOF_NORECURSION = 0x1000,  // bez rekurzí v adresáři.
            FOF_NO_CONNECTED_ELEMENTS = 0x2000,
            FOF_WANTNUKEWARNING = 0x4000,  // v průběhu mazání, varovat v případě recyklace (částečně FOF_NOCONFIRMATION)
            FOF_NORECURSEREPARSE = 0x8000
        }

        [DllImport("shell32.dll", CharSet = CharSet.Unicode)]
        public static extern int SHFileOperation([In] ref SHFILEOPSTRUCT lpFileOp);
        #endregion

        /// <summary>
        /// Informace o ikonce
        /// </summary>
        public struct SHFILEINFO
        {
            /// <exclude/>
            public IntPtr hIcon;
            /// <exclude/>
            public int iIcon;
            /// <exclude/>
            public uint dwAttributes;
            /// <exclude/>
            [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 260)]
            public string szDisplayName;
            /// <exclude/>
            [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 80)]
            public string szTypeName;
        }

        /// Return Type: HMENU->HMENU__*
        ///hWnd: HWND->HWND__*
        ///bRevert: BOOL->int
        [System.Runtime.InteropServices.DllImportAttribute("user32.dll", EntryPoint = "GetSystemMenu")]
        public static extern System.IntPtr GetSystemMenu([System.Runtime.InteropServices.InAttribute()] System.IntPtr hWnd, [System.Runtime.InteropServices.MarshalAsAttribute(System.Runtime.InteropServices.UnmanagedType.Bool)] bool bRevert);
        [DllImport("user32.dll")]
        public static extern bool DeleteMenu(IntPtr hMenu, uint uPosition, uint uFlags);

        /// Return Type: BOOL->int
        ///hMnu: HMENU->HMENU__*
        ///uPosition: UINT->unsigned int
        ///uFlags: UINT->unsigned int
        ///uIDNewItem: UINT_PTR->unsigned int
        ///lpNewItem: LPCSTR->CHAR*
        [System.Runtime.InteropServices.DllImportAttribute("user32.dll", EntryPoint = "ModifyMenuA")]
        [return: System.Runtime.InteropServices.MarshalAsAttribute(System.Runtime.InteropServices.UnmanagedType.Bool)]
        public static extern bool ModifyMenuA(
            [System.Runtime.InteropServices.InAttribute()] System.IntPtr hMnu,
            uint uPosition,
            uint uFlags,
            UIntPtr uIDNewItem,
            [System.Runtime.InteropServices.InAttribute()] 
                [System.Runtime.InteropServices.MarshalAsAttribute(System.Runtime.InteropServices.UnmanagedType.LPStr)] 
                string lpNewItem);

        /// Return Type: BOOL->int
        ///hWnd: HWND->HWND__*
        [System.Runtime.InteropServices.DllImportAttribute("user32.dll", EntryPoint = "DrawMenuBar")]
        [return: System.Runtime.InteropServices.MarshalAsAttribute(System.Runtime.InteropServices.UnmanagedType.Bool)]
        public static extern bool DrawMenuBar([System.Runtime.InteropServices.InAttribute()] System.IntPtr hWnd);

        public static void SetMenuItem(uint vEI, uint vMF, UIntPtr newItemID, string lPNewItem)
        {
            System.Diagnostics.Process p = System.Diagnostics.Process.GetCurrentProcess();
            IntPtr lHwnd = NativeMethods.GetSystemMenu(p.MainWindowHandle, false);
            bool lResult = NativeMethods.ModifyMenuA(lHwnd, vEI, vMF, newItemID, lPNewItem);
            NativeMethods.DrawMenuBar(p.MainWindowHandle);
        }

        public static void SetMenuItem(IntPtr winH, uint vEI, uint vMF, UIntPtr newItemID, string lPNewItem)
        {
            IntPtr lHwnd = NativeMethods.GetSystemMenu(winH, false);
            bool lResult = NativeMethods.ModifyMenuA(lHwnd, vEI, vMF, newItemID, lPNewItem);
            NativeMethods.DrawMenuBar(winH);
        }

        /// <exclude/>
        [DllImport("user32.dll", CharSet = CharSet.Auto)]
        public static extern IntPtr GetFocus();
        /// <exclude/>
        [DllImport("user32.dll", CharSet = CharSet.Auto, ExactSpelling = true)]
        public static extern short GetKeyState(int keyCode);
        /// <exclude/>
        [DllImport("user32.dll")]
        public static extern bool AttachThreadInput(int idAttach, int idAttachTo, bool fAttach);
        /// <exclude/>
        [DllImport("kernel32.dll", CharSet = CharSet.Auto)]
        public static extern int GetCurrentThreadId();
        [DllImport("Kernel32.dll", CharSet = CharSet.Unicode)]
        internal static extern UInt32 GetDriveType(string lpRootPathName);
        /// <exclude/>
        [DllImport("user32.dll")]
        public static extern int GetWindowThreadProcessId(int hWnd, int ProcessId);
        /// <exclude/>
        [DllImport("user32.dll")]
        public static extern IntPtr GetForegroundWindow();
        /// <exclude/>
        [DllImport("user32.dll", ExactSpelling = true, CharSet = CharSet.Auto)]
        public static extern IntPtr GetParent(IntPtr hWnd);
        /// <exclude/>
        [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = false)]
        public static extern int SendMessage(int hWnd, int Msg, int wParam, StringBuilder lParam);
        /// <exclude/>
        [DllImport("user32.dll", SetLastError = true)]
        public static extern IntPtr SetActiveWindow(IntPtr hWnd);
        /// <exclude/>
        [DllImport("user32.dll")]
        [return: MarshalAs(UnmanagedType.Bool)]
        public static extern bool DestroyIcon(IntPtr handle);
        /// <exclude/>
        [DllImport("USER32.DLL", EntryPoint = "PostMessage")]
        public static extern bool PostMessage(IntPtr hwnd, uint msg, IntPtr wParam, IntPtr lParam);
        /// <exclude/>
        [DllImport("user32.dll", SetLastError = true, CharSet = CharSet.Auto)]
        public static extern IntPtr LoadImage(IntPtr hinst, string lpszName, uint uType, int cxDesired, int cyDesired, uint fuLoad);
        /// <exclude/>
        [DllImport("USER32.DLL", EntryPoint = "SendMessage")]
        public static extern int SendMessage(IntPtr hwnd, int msg, IntPtr wParam, IntPtr lParam);
        [DllImport("user32.dll", CharSet = CharSet.Auto, ExactSpelling = true)]
        public static extern IntPtr GetActiveWindow();
        /// <summary>
        /// Sends the specified message to a window or windows.
        ///  It calls the window procedure for the specified window 
        ///  and does not return until the window procedure has processed the message.
        /// </summary>
        /// <param name="hWnd">Handler okna</param>
        /// <param name="Msg"></param>
        /// <param name="wParam"></param>
        /// <param name="lParam"></param>
        /// <returns></returns>
        [DllImport("user32.dll", CharSet = CharSet.Auto)]
        public static extern IntPtr SendMessage(IntPtr hWnd, UInt32 Msg, int wParam, int lParam);
        /// <exclude/>
        [DllImport("USER32.DLL", EntryPoint = "GetCaretBlinkTime")]
        public static extern uint GetCaretBlinkTime();
        /// <exclude/>
        [DllImport("user32.dll", SetLastError = true)]
        public static extern bool MoveWindow(IntPtr hWnd, int X, int Y, int nWidth, int nHeight, bool bRepaint);
        /// <exclude/>
        [DllImport("user32.dll")]
        public static extern int SetWindowLong(IntPtr hWnd, int nIndex, int dwNewLong);
        /// <exclude/>
        [DllImport("user32.dll")]
        public static extern bool UpdateWindow(IntPtr hWnd);
        /// <exclude/>
        [DllImport("user32.dll", SetLastError = true)]
        public static extern IntPtr FindWindow(string lpClassName, string lpWindowName);
        /// <exclude/>
        [DllImport("user32.dll", SetLastError = true)]
        public static extern IntPtr FindWindowEx(IntPtr parentHandle, IntPtr childAfter, string className, IntPtr windowTitle);

        /// <exclude/>
        [DllImport("user32.dll")]
        public static extern bool GetWindowRect(IntPtr hwnd, out Rectangle lpRect);
        /// <exclude/>
        [DllImport("user32.dll")]
        public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
        /// <exclude/>
        [DllImport("user32.dll", CharSet = CharSet.Auto, ExactSpelling = true)]
        public static extern IntPtr SetParent(IntPtr hWndChild, IntPtr hWndNewParent);
        /// <exclude/>
        [DllImport("user32.dll", SetLastError = true)]
        public static extern bool BringWindowToTop(IntPtr hWnd);
        /// <exclude/>
        [DllImport("user32.dll")]
        public static extern uint GetBoundsRect(IntPtr hdc, out Rectangle lprcBounds, uint flags);
        /// <exclude/>
        [DllImport("user32.dll", CharSet = CharSet.Auto)]
        public static extern IntPtr SetFocus(IntPtr hWnd);
        /// <exclude/>
        [DllImport("user32.dll")]
        public static extern IntPtr GetWindowDC(IntPtr hWnd);
        /// <exclude/>
        [DllImport("user32.dll")]
        public static extern bool ReleaseDC(IntPtr hWnd, IntPtr hDC);
        /// <exclude/>
        [DllImport("user32.dll")]
        public static extern bool InvalidateRect(IntPtr hWnd, IntPtr lpRect, bool bErase);
        /// <exclude/>
        [DllImport("user32.dll")]
        public static extern bool RedrawWindow(IntPtr hWnd, IntPtr lprcUpdate, IntPtr hrgnUpdate, RedrawWindowFlags flags);
        /// <exclude/>
        [DllImport("user32.dll")]
        [return: MarshalAs(UnmanagedType.Bool)]
        public static extern bool SetForegroundWindow(IntPtr hWnd);
        /// <exclude/>
        [DllImport("user32.dll")]
        [return: MarshalAs(UnmanagedType.Bool)]
        public static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int X, int Y, int cx, int cy, uint uFlags);
        /// <exclude/>
        [DllImport("ole32.dll")]
        public static extern int GetRunningObjectTable(uint reserved, out IRunningObjectTable pprot);
        /// <exclude/>
        [DllImport("ole32.dll")]
        public static extern int CreateBindCtx(uint reserved, out IBindCtx pctx);
        /// <exclude/>
        [DllImport("shell32.dll")]
        public static extern IntPtr SHGetFileInfo(IntPtr pIDL, uint dwFileAttributes, out SHFILEINFO psfi, uint cbFileInfo, SHGFI uFlags);
        /// <exclude/>
        [DllImport("shell32.dll")]
        public static extern IntPtr SHGetFileInfo(string pszPath, uint dwFileAttribs, out SHFILEINFO psfi, uint cbFileInfo, SHGFI uFlags);
        /// <exclude/>
        [DllImport("user32.dll")]
        public static extern Int32 SendMessage(IntPtr pWnd, UInt32 uMsg, UInt32 wParam, IntPtr lParam);
        /// <exclude/>
        [DllImport("shell32.dll")]
        public static extern Int32 SHGetSpecialFolderLocation(IntPtr hwndOwner, CSIDL nFolder, ref IntPtr ppidl);
        /// <exclude/>
        [DllImport("shell32.dll")]
        public static extern Int32 SHGetDesktopFolder(ref IExplorerFolder ppshf);
        /// <exclude/>
        [DllImport("shell32.dll")]
        public static extern Int32 SHGetPathFromIDList(IntPtr pIDL, StringBuilder strPath);
        /// <exclude/>
        [DllImport("shell32.dll")]
        public static extern Int32 SHGetPathFromIDListW(UIntPtr pidl, [MarshalAs(UnmanagedType.LPWStr)]StringBuilder pszPath);
        /// <exclude/>
        [DllImport("kernel32", SetLastError = true)]
        public static extern IntPtr LoadLibrary(string lpFileName);
        /// <exclude/>
        [System.Runtime.InteropServices.DllImport("shell32.dll")]
        public static extern void SHChangeNotify(int wEventId, int uFlags, IntPtr dwItem1, IntPtr dwItem2);

        /// <exclude/>
        [DllImport("shell32.dll")]
        public static extern IntPtr ILCombine(IntPtr pIDLParent, IntPtr pIDLChild);
        /// <summary>
        /// Vytvoři seznam pidl dle cesty
        /// </summary>
        /// <param name="path">Cesta</param>
        /// <returns></returns>
        [DllImport("shell32.dll", CharSet = CharSet.Auto)]
        public static extern IntPtr ILCreateFromPath(string path);
        [DllImport("kernel32", SetLastError = true, ExactSpelling = true)]
        public static extern Int32 WaitForSingleObject(SafeWaitHandle handle, Int32 milliseconds);

        /// <summary>
        /// 
        /// </summary>
        [ComImport]
        [InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
        [Guid("000214E6-0000-0000-C000-000000000046")]
        public interface IExplorerFolder
        {
            // Translates a file object's or folder's display name into an item identifier list.
            // Return value: error code, if any
            /// <summary>
            /// 
            /// </summary>
            /// <param name="hwnd"></param>
            /// <param name="pbc"></param>
            /// <param name="pszDisplayName"></param>
            /// <param name="pchEaten"></param>
            /// <param name="ppidl"></param>
            /// <param name="pdwAttributes"></param>
            /// <returns></returns>
            [PreserveSig()]
            uint ParseDisplayName(
                IntPtr hwnd,             // Optional window handle
                IntPtr pbc,              // Optional bind context that controls the parsing operation. This parameter is normally set to NULL. 
                [In(), MarshalAs(UnmanagedType.LPWStr)]
                string pszDisplayName,   // Null-terminated UNICODE string with the display name.
                out uint pchEaten,       // Pointer to a ULONG value that receives the number of characters of the display name that was parsed.
                out IntPtr ppidl,        // Pointer to an ITEMIDLIST pointer that receives the item identifier list for the object.
                ref uint pdwAttributes); // Optional parameter that can be used to query for file attributes. This can be values from the SFGAO enum

            // Allows a client to determine the contents of a folder by creating an item identifier enumeration object and returning its IEnumIDList interface.
            // Return value: error code, if any
            /// <summary>
            /// 
            /// </summary>
            /// <param name="hwnd"></param>
            /// <param name="grfFlags"></param>
            /// <param name="ppenumIDList"></param>
            /// <returns></returns>
            [PreserveSig()]
            uint EnumObjects(
                IntPtr hwnd,                    // If user input is required to perform the enumeration, this window handle should be used by the enumeration object as the parent window to take user input.
                SHCONTF grfFlags,               // Flags indicating which items to include in the enumeration. For a list of possible values, see the SHCONTF enum. 
                out IEnumIDList ppenumIDList);  // Address that receives a pointer to the IEnumIDList interface of the enumeration object created by this method. 

            // Retrieves an IShellFolder object for a subfolder.
            // Return value: error code, if any
            /// <summary>
            /// 
            /// </summary>
            /// <param name="pidl"></param>
            /// <param name="pbc"></param>
            /// <param name="riid"></param>
            /// <param name="ppv"></param>
            /// <returns></returns>
            [PreserveSig()]
            uint BindToObject(
                IntPtr pidl,            // Address of an ITEMIDLIST structure (PIDL) that identifies the subfolder.
                IntPtr pbc,             // Optional address of an IBindCtx interface on a bind context object to be used during this operation.
                [In()]
                ref Guid riid,          // Identifier of the interface to return. 
                out IExplorerFolder ppv);        // Address that receives the interface pointer.

            // Requests a pointer to an object's storage interface. 
            // Return value: error code, if any
            /// <summary>
            /// 
            /// </summary>
            /// <param name="pidl"></param>
            /// <param name="pbc"></param>
            /// <param name="riid"></param>
            /// <param name="ppv"></param>
            /// <returns></returns>
            [PreserveSig()]
            uint BindToStorage(
                IntPtr pidl,            // Address of an ITEMIDLIST structure that identifies the subfolder relative to its parent folder. 
                IntPtr pbc,             // Optional address of an IBindCtx interface on a bind context object to be used during this operation.
                [In()]
                ref Guid riid,          // Interface identifier (IID) of the requested storage interface.
                [MarshalAs(UnmanagedType.Interface)]
                out object ppv);        // Address that receives the interface pointer specified by riid.

            // Determines the relative order of two file objects or folders, given their item identifier lists. 
            // Return value: If this method is successful, the CODE field of the HRESULT contains one of the following values (the code can be retrived using the helper function GetHResultCode)...
            // A negative return value indicates that the first item should precede the second (pidl1 < pidl2). 
            // A positive return value indicates that the first item should follow the second (pidl1 > pidl2).  Zero A return value of zero indicates that the two items are the same (pidl1 = pidl2). 
            /// <summary>
            /// 
            /// </summary>
            /// <param name="lParam"></param>
            /// <param name="pidl1"></param>
            /// <param name="pidl2"></param>
            /// <returns></returns>
            [PreserveSig()]
            int CompareIDs(
                int lParam,             // Value that specifies how the comparison should be performed. The lower sixteen bits of lParam define the sorting rule.
                                        // The upper sixteen bits of lParam are used for flags that modify the sorting rule. values can be from the SHCIDS enum
                IntPtr pidl1,           // Pointer to the first item's ITEMIDLIST structure.
                IntPtr pidl2);          // Pointer to the second item's ITEMIDLIST structure.

            // Requests an object that can be used to obtain information from or interact with a folder object.
            // Return value: error code, if any
            /// <summary>
            /// 
            /// </summary>
            /// <param name="hwndOwner"></param>
            /// <param name="riid"></param>
            /// <param name="ppv"></param>
            /// <returns></returns>
            [PreserveSig()]
            uint CreateViewObject(
                IntPtr hwndOwner,       // Handle to the owner window.
                [In()]
                ref Guid riid,          // Identifier of the requested interface.
                [MarshalAs(UnmanagedType.Interface)]
                out object ppv);        // Address of a pointer to the requested interface. 

            // Retrieves the attributes of one or more file objects or subfolders. 
            // Return value: error code, if any
            /// <summary>
            /// 
            /// </summary>
            /// <param name="cidl"></param>
            /// <param name="apidl"></param>
            /// <param name="rgfInOut"></param>
            /// <returns></returns>
            [PreserveSig()]
            uint GetAttributesOf(
                int cidl,               // Number of file objects from which to retrieve attributes. 
                out IntPtr apidl,           // Address of an array of pointers to ITEMIDLIST structures, each of which uniquely identifies a file object relative to the parent folder.
                out SFGAOF rgfInOut);       // Address of a single ULONG value that, on entry, contains the attributes that the caller is requesting. On exit, this value contains the requested attributes that are common to all of the specified objects. this value can be from the SFGAO enum

            // Retrieves an OLE interface that can be used to carry out actions on the specified file objects or folders. 
            // Return value: error code, if any
            /// <summary>
            /// 
            /// </summary>
            /// <param name="hwndOwner"></param>
            /// <param name="cidl"></param>
            /// <param name="apidl"></param>
            /// <param name="riid"></param>
            /// <param name="rgfReserved"></param>
            /// <param name="ppv"></param>
            /// <returns></returns>
            [PreserveSig()]
            uint GetUIObjectOf(
                IntPtr hwndOwner,       // Handle to the owner window that the client should specify if it displays a dialog box or message box.
                int cidl,               // Number of file objects or subfolders specified in the apidl parameter. 
                [In(), MarshalAs(UnmanagedType.LPArray)] IntPtr[]
                apidl,                  // Address of an array of pointers to ITEMIDLIST structures, each of which uniquely identifies a file object or subfolder relative to the parent folder.
                [In()]
                ref Guid riid,          // Identifier of the COM interface object to return.
                IntPtr rgfReserved,     // Reserved. 
                [MarshalAs(UnmanagedType.Interface)]
                out object ppv);        // Pointer to the requested interface.

            // Retrieves the display name for the specified file object or subfolder. 
            // Return value: error code, if any
            /// <summary>
            /// 
            /// </summary>
            /// <param name="pidl"></param>
            /// <param name="uFlags"></param>
            /// <param name="pName"></param>
            /// <returns></returns>
            [PreserveSig()]
            uint GetDisplayNameOf(
                IntPtr pidl,            // Address of an ITEMIDLIST structure (PIDL) that uniquely identifies the file object or subfolder relative to the parent folder. 
                SHGNO uFlags,           // Flags used to request the type of display name to return. For a list of possible values. 
                out STRRET pName);      // Address of a STRRET structure in which to return the display name.

            // Sets the display name of a file object or subfolder, changing the item identifier in the process.
            // Return value: error code, if any
            /// <summary>
            /// 
            /// </summary>
            /// <param name="hwnd"></param>
            /// <param name="pidl"></param>
            /// <param name="pszName"></param>
            /// <param name="uFlags"></param>
            /// <param name="ppidlOut"></param>
            /// <returns></returns>
            [PreserveSig()]
            uint SetNameOf(
                IntPtr hwnd,            // Handle to the owner window of any dialog or message boxes that the client displays.
                IntPtr pidl,            // Pointer to an ITEMIDLIST structure that uniquely identifies the file object or subfolder relative to the parent folder. 
                [In(), MarshalAs(UnmanagedType.LPWStr)]
                string pszName,         // Pointer to a null-terminated string that specifies the new display name. 
                SHGNO uFlags,           // Flags indicating the type of name specified by the lpszName parameter. For a list of possible values, see the description of the SHGNO enum. 
                out IntPtr ppidlOut);   // Address of a pointer to an ITEMIDLIST structure which receives the new ITEMIDLIST. 
        }

        /// <summary>
        /// 
        /// </summary>
        [ComImport]
        [InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
        [Guid("000214F2-0000-0000-C000-000000000046")]
        public interface IEnumIDList
        {

            // Retrieves the specified number of item identifiers in the enumeration sequence and advances the current position by the number of items retrieved. 
            /// <summary>
            /// 
            /// </summary>
            /// <param name="celt"></param>
            /// <param name="rgelt"></param>
            /// <param name="pceltFetched"></param>
            /// <returns></returns>
            [PreserveSig()]
            uint Next(
                uint celt,                // Number of elements in the array pointed to by the rgelt parameter.
                out IntPtr rgelt,         // Address of an array of ITEMIDLIST pointers that receives the item identifiers. The implementation must allocate these item identifiers using the Shell's allocator (retrieved by the SHGetMalloc function). 
                                          // The calling application is responsible for freeing the item identifiers using the Shell's allocator.
                out Int32 pceltFetched    // Address of a value that receives a count of the item identifiers actually returned in rgelt. The count can be smaller than the value specified in the celt parameter. This parameter can be NULL only if celt is one. 
                );

            // Skips over the specified number of elements in the enumeration sequence. 
            /// <summary>
            /// 
            /// </summary>
            /// <param name="celt"></param>
            /// <returns></returns>
            [PreserveSig()]
            uint Skip(
                uint celt                 // Number of item identifiers to skip.
                );

            // Returns to the beginning of the enumeration sequence. 
            /// <summary>
            /// 
            /// </summary>
            /// <returns></returns>
            [PreserveSig()]
            uint Reset();

            // Creates a new item enumeration object with the same contents and state as the current one. 
            /// <summary>
            /// 
            /// </summary>
            /// <param name="ppenum"></param>
            /// <returns></returns>
            [PreserveSig()]
            uint Clone(
                out IEnumIDList ppenum    // Address of a pointer to the new enumeration object. The calling application must eventually free the new object by calling its Release member function. 
                );
        }

    }
}
