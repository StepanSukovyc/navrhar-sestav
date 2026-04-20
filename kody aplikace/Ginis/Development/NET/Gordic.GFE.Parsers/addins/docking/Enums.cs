//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Enums.cs                               </Name>
//    <Description> Výèet možných umístìní dokovatelných objektù                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Výèet možných umístìní dokovatelných objektù
    /// </summary>
	[Flags]
	[Serializable]
	[Editor(typeof(DockAreasEditor), typeof(System.Drawing.Design.UITypeEditor))]
	public enum DockAreas
	{
        /// <summary>
        /// plovoucí
        /// </summary>
		Float = 1,
        /// <summary>
        /// dokování vlevo
        /// </summary>
		DockLeft = 2,
        /// <summary>
        /// dokování vpravo
        /// </summary>
		DockRight = 4,
        /// <summary>
        /// dokování nahoøe
        /// </summary>
		DockTop = 8,
        /// <summary>
        /// dokování dole
        /// </summary>
		DockBottom = 16,
        /// <summary>
        /// dokument
        /// </summary>
		Document = 32
	}

    /// <summary>
    /// výèet stavu dokování
    /// </summary>
	public enum DockState
	{

        /// <summary>
        /// neznamý
        /// </summary>
		Unknown = 0,
        /// <summary>
        /// plovoucí
        /// </summary>
		Float = 1,
        /// <summary>
        /// horní auto skrýtí
        /// </summary>
		DockTopAutoHide = 2,
        /// <summary>
        /// levé automatické skrývání
        /// </summary>
		DockLeftAutoHide = 3,
        /// <summary>
        /// spodní automatické skrývání
        /// </summary>
		DockBottomAutoHide = 4,
        /// <summary>
        /// pravé automatické skrývání
        /// </summary>
		DockRightAutoHide = 5,
        /// <summary>
        /// dokument
        /// </summary>
		Document = 6,
        /// <summary>
        /// horní
        /// </summary>
		DockTop = 7,
        /// <summary>
        /// levé
        /// </summary>
		DockLeft = 8,
        /// <summary>
        /// spodní
        /// </summary>
		DockBottom = 9,
        /// <summary>
        /// pravé
        /// </summary>
		DockRight = 10,
        /// <summary>
        /// skrýté
        /// </summary>
		Hidden = 11
	}

    /// <summary>
    /// výèet možných zarovnání
    /// </summary>
	public enum DockAlignment
	{
        /// <summary>
        /// zlevá
        /// </summary>
		Left,
        /// <summary>
        /// zprava
        /// </summary>
		Right,
        /// <summary>
        /// shora
        /// </summary>
		Top,
        /// <summary>
        /// sdola
        /// </summary>
		Bottom
	}

    /// <summary>
    /// výèet možných stylù dokumentu
    /// </summary>
	public enum DocumentStyle
	{
        /// <summary>
        /// MDI
        /// </summary>
		DockingMdi,
        /// <summary>
        /// dokovací okno
        /// </summary>
		DockingWindow,
        /// <summary>
        /// RDI
        /// </summary>
		DockingRdi,
        /// <summary>
        /// MDI
        /// </summary>
		SystemMdi,
	}

    /// <summary>
    /// Výèet možných hodnot pozice okna
    /// </summary>
    [Flags]
    public enum FlagsSetWindowPos : uint
    {
        /// <exclude/>
        SWP_NOSIZE = 0x0001,
        /// <exclude/>
        SWP_NOMOVE = 0x0002,
        /// <exclude/>
        SWP_NOZORDER = 0x0004,
        /// <exclude/>
        SWP_NOREDRAW = 0x0008,
        /// <exclude/>
        SWP_NOACTIVATE = 0x0010,
        /// <exclude/>
        SWP_FRAMECHANGED = 0x0020,
        /// <exclude/>
        SWP_SHOWWINDOW = 0x0040,
        /// <exclude/>
        SWP_HIDEWINDOW = 0x0080,
        /// <exclude/>
        SWP_NOCOPYBITS = 0x0100,
        /// <exclude/>
        SWP_NOOWNERZORDER = 0x0200,
        /// <exclude/>
        SWP_NOSENDCHANGING = 0x0400,
        /// <exclude/>
        SWP_DRAWFRAME = 0x0020,
        /// <exclude/>
        SWP_NOREPOSITION = 0x0200,
        /// <exclude/>
        SWP_DEFERERASE = 0x2000,
        /// <exclude/>
        SWP_ASYNCWINDOWPOS = 0x4000
    }

    /// <summary>
    /// Výèet možných zobrazení stylù okna
    /// </summary>
    public enum ShowWindowStyles : short
    {
        /// <exclude/>
        SW_HIDE = 0,
        /// <exclude/>
        SW_SHOWNORMAL = 1,
        /// <exclude/>
        SW_NORMAL = 1,
        /// <exclude/>
        SW_SHOWMINIMIZED = 2,
        /// <exclude/>
        SW_SHOWMAXIMIZED = 3,
        /// <exclude/>
        SW_MAXIMIZE = 3,
        /// <exclude/>
        SW_SHOWNOACTIVATE = 4,
        /// <exclude/>
        SW_SHOW = 5,
        /// <exclude/>
        SW_MINIMIZE = 6,
        /// <exclude/>
        SW_SHOWMINNOACTIVE = 7,
        /// <exclude/>
        SW_SHOWNA = 8,
        /// <exclude/>
        SW_RESTORE = 9,
        /// <exclude/>
        SW_SHOWDEFAULT = 10,
        /// <exclude/>
        SW_FORCEMINIMIZE = 11,
        /// <exclude/>
        SW_MAX = 11
    }

    /// <summary>
    /// výèet možných stylù okna
    /// </summary>
    public enum WindowStyles : uint
    {
        /// <exclude/>
        WS_OVERLAPPED = 0x00000000,
        /// <exclude/>
        WS_POPUP = 0x80000000,
        /// <exclude/>
        WS_CHILD = 0x40000000,
        /// <exclude/>
        WS_MINIMIZE = 0x20000000,
        /// <exclude/>
        WS_VISIBLE = 0x10000000,
        /// <exclude/>
        WS_DISABLED = 0x08000000,
        /// <exclude/>
        WS_CLIPSIBLINGS = 0x04000000,
        /// <exclude/>
        WS_CLIPCHILDREN = 0x02000000,
        /// <exclude/>
        WS_MAXIMIZE = 0x01000000,
        /// <exclude/>
        WS_CAPTION = 0x00C00000,
        /// <exclude/>
        WS_BORDER = 0x00800000,
        /// <exclude/>
        WS_DLGFRAME = 0x00400000,
        /// <exclude/>
        WS_VSCROLL = 0x00200000,
        /// <exclude/>
        WS_HSCROLL = 0x00100000,
        /// <exclude/>
        WS_SYSMENU = 0x00080000,
        /// <exclude/>
        WS_THICKFRAME = 0x00040000,
        /// <exclude/>
        WS_GROUP = 0x00020000,
        /// <exclude/>
        WS_TABSTOP = 0x00010000,
        /// <exclude/>
        WS_MINIMIZEBOX = 0x00020000,
        /// <exclude/>
        WS_MAXIMIZEBOX = 0x00010000,
        /// <exclude/>
        WS_TILED = 0x00000000,
        /// <exclude/>
        WS_ICONIC = 0x20000000,
        /// <exclude/>
        WS_SIZEBOX = 0x00040000,
        /// <exclude/>
        WS_POPUPWINDOW = 0x80880000,
        /// <exclude/>
        WS_OVERLAPPEDWINDOW = 0x00CF0000,
        /// <exclude/>
        WS_TILEDWINDOW = 0x00CF0000,
        /// <exclude/>
        WS_CHILDWINDOW = 0x40000000
    }

    /// <summary>
    /// Výèet externích stylù okna
    /// </summary>
    public enum WindowExStyles
    {
        /// <exclude/>
        WS_EX_DLGMODALFRAME = 0x00000001,
        /// <exclude/>
        WS_EX_NOPARENTNOTIFY = 0x00000004,
        /// <exclude/>
        WS_EX_TOPMOST = 0x00000008,
        /// <exclude/>
        WS_EX_ACCEPTFILES = 0x00000010,
        /// <exclude/>
        WS_EX_TRANSPARENT = 0x00000020,
        /// <exclude/>
        WS_EX_MDICHILD = 0x00000040,
        /// <exclude/>
        WS_EX_TOOLWINDOW = 0x00000080,
        /// <exclude/>
        WS_EX_WINDOWEDGE = 0x00000100,
        /// <exclude/>
        WS_EX_CLIENTEDGE = 0x00000200,
        /// <exclude/>
        WS_EX_CONTEXTHELP = 0x00000400,
        /// <exclude/>
        WS_EX_RIGHT = 0x00001000,
        /// <exclude/>
        WS_EX_LEFT = 0x00000000,
        /// <exclude/>
        WS_EX_RTLREADING = 0x00002000,
        /// <exclude/>
        WS_EX_LTRREADING = 0x00000000,
        /// <exclude/>
        WS_EX_LEFTSCROLLBAR = 0x00004000,
        /// <exclude/>
        WS_EX_RIGHTSCROLLBAR = 0x00000000,
        /// <exclude/>
        WS_EX_CONTROLPARENT = 0x00010000,
        /// <exclude/>
        WS_EX_STATICEDGE = 0x00020000,
        /// <exclude/>
        WS_EX_APPWINDOW = 0x00040000,
        /// <exclude/>
        WS_EX_OVERLAPPEDWINDOW = 0x00000300,
        /// <exclude/>
        WS_EX_PALETTEWINDOW = 0x00000188,
        /// <exclude/>
        WS_EX_LAYERED = 0x00080000
    }

    /// <summary>
    /// Možné zprávy
    /// </summary>
    public enum Msgs
    {
        /// <exclude/>
        WM_NULL = 0x0000,
        /// <exclude/>
        WM_CREATE = 0x0001,
        /// <exclude/>
        WM_DESTROY = 0x0002,
        /// <exclude/>
        WM_MOVE = 0x0003,
        /// <exclude/>
        WM_SIZE = 0x0005,
        /// <exclude/>
        WM_ACTIVATE = 0x0006,
        /// <exclude/>
        WM_SETFOCUS = 0x0007,
        /// <exclude/>
        WM_KILLFOCUS = 0x0008,
        /// <exclude/>
        WM_ENABLE = 0x000A,
        /// <exclude/>
        WM_SETREDRAW = 0x000B,
        /// <exclude/>
        WM_SETTEXT = 0x000C,
        /// <exclude/>
        WM_GETTEXT = 0x000D,
        /// <exclude/>
        WM_GETTEXTLENGTH = 0x000E,
        /// <exclude/>
        WM_PAINT = 0x000F,
        /// <exclude/>
        WM_CLOSE = 0x0010,
        /// <exclude/>
        WM_QUERYENDSESSION = 0x0011,
        /// <exclude/>
        WM_QUIT = 0x0012,
        /// <exclude/>
        WM_QUERYOPEN = 0x0013,
        /// <exclude/>
        WM_ERASEBKGND = 0x0014,
        /// <exclude/>
        WM_SYSCOLORCHANGE = 0x0015,
        /// <exclude/>
        WM_ENDSESSION = 0x0016,
        /// <exclude/>
        WM_SHOWWINDOW = 0x0018,
        /// <exclude/>
        WM_WININICHANGE = 0x001A,
        /// <exclude/>
        WM_SETTINGCHANGE = 0x001A,
        /// <exclude/>
        WM_DEVMODECHANGE = 0x001B,
        /// <exclude/>
        WM_ACTIVATEAPP = 0x001C,
        /// <exclude/>
        WM_FONTCHANGE = 0x001D,
        /// <exclude/>
        WM_TIMECHANGE = 0x001E,
        /// <exclude/>
        WM_CANCELMODE = 0x001F,
        /// <exclude/>
        WM_SETCURSOR = 0x0020,
        /// <exclude/>
        WM_MOUSEACTIVATE = 0x0021,
        /// <exclude/>
        WM_CHILDACTIVATE = 0x0022,
        /// <exclude/>
        WM_QUEUESYNC = 0x0023,
        /// <exclude/>
        WM_GETMINMAXINFO = 0x0024,
        /// <exclude/>
        WM_PAINTICON = 0x0026,
        /// <exclude/>
        WM_ICONERASEBKGND = 0x0027,
        /// <exclude/>
        WM_NEXTDLGCTL = 0x0028,
        /// <exclude/>
        WM_SPOOLERSTATUS = 0x002A,
        /// <exclude/>
        WM_DRAWITEM = 0x002B,
        /// <exclude/>
        WM_MEASUREITEM = 0x002C,
        /// <exclude/>
        WM_DELETEITEM = 0x002D,
        /// <exclude/>
        WM_VKEYTOITEM = 0x002E,
        /// <exclude/>
        WM_CHARTOITEM = 0x002F,
        /// <exclude/>
        WM_SETFONT = 0x0030,
        /// <exclude/>
        WM_GETFONT = 0x0031,
        /// <exclude/>
        WM_SETHOTKEY = 0x0032,
        /// <exclude/>
        WM_GETHOTKEY = 0x0033,
        /// <exclude/>
        WM_QUERYDRAGICON = 0x0037,
        /// <exclude/>
        WM_COMPAREITEM = 0x0039,
        /// <exclude/>
        WM_GETOBJECT = 0x003D,
        /// <exclude/>
        WM_COMPACTING = 0x0041,
        /// <exclude/>
        WM_COMMNOTIFY = 0x0044,
        /// <exclude/>
        WM_WINDOWPOSCHANGING = 0x0046,
        /// <exclude/>
        WM_WINDOWPOSCHANGED = 0x0047,
        /// <exclude/>
        WM_POWER = 0x0048,
        /// <exclude/>
        WM_COPYDATA = 0x004A,
        /// <exclude/>
        WM_CANCELJOURNAL = 0x004B,
        /// <exclude/>
        WM_NOTIFY = 0x004E,
        /// <exclude/>
        WM_INPUTLANGCHANGEREQUEST = 0x0050,
        /// <exclude/>
        WM_INPUTLANGCHANGE = 0x0051,
        /// <exclude/>
        WM_TCARD = 0x0052,
        /// <exclude/>
        WM_HELP = 0x0053,
        /// <exclude/>
        WM_USERCHANGED = 0x0054,
        /// <exclude/>
        WM_NOTIFYFORMAT = 0x0055,
        /// <exclude/>
        WM_CONTEXTMENU = 0x007B,
        /// <exclude/>
        WM_STYLECHANGING = 0x007C,
        /// <exclude/>
        WM_STYLECHANGED = 0x007D,
        /// <exclude/>
        WM_DISPLAYCHANGE = 0x007E,
        /// <exclude/>
        WM_GETICON = 0x007F,
        /// <exclude/>
        WM_SETICON = 0x0080,
        /// <exclude/>
        WM_NCCREATE = 0x0081,
        /// <exclude/>
        WM_NCDESTROY = 0x0082,
        /// <exclude/>
        WM_NCCALCSIZE = 0x0083,
        /// <exclude/>
        WM_NCHITTEST = 0x0084,
        /// <exclude/>
        WM_NCPAINT = 0x0085,
        /// <exclude/>
        WM_NCACTIVATE = 0x0086,
        /// <exclude/>
        WM_GETDLGCODE = 0x0087,
        /// <exclude/>
        WM_SYNCPAINT = 0x0088,
        /// <exclude/>
        WM_NCMOUSEMOVE = 0x00A0,
        /// <exclude/>
        WM_NCLBUTTONDOWN = 0x00A1,
        /// <exclude/>
        WM_NCLBUTTONUP = 0x00A2,
        /// <exclude/>
        WM_NCLBUTTONDBLCLK = 0x00A3,
        /// <exclude/>
        WM_NCRBUTTONDOWN = 0x00A4,
        /// <exclude/>
        WM_NCRBUTTONUP = 0x00A5,
        /// <exclude/>
        WM_NCRBUTTONDBLCLK = 0x00A6,
        /// <exclude/>
        WM_NCMBUTTONDOWN = 0x00A7,
        /// <exclude/>
        WM_NCMBUTTONUP = 0x00A8,
        /// <exclude/>
        WM_NCMBUTTONDBLCLK = 0x00A9,
        /// <exclude/>
        WM_KEYDOWN = 0x0100,
        /// <exclude/>
        WM_KEYUP = 0x0101,
        /// <exclude/>
        WM_CHAR = 0x0102,
        /// <exclude/>
        WM_DEADCHAR = 0x0103,
        /// <exclude/>
        WM_SYSKEYDOWN = 0x0104,
        /// <exclude/>
        WM_SYSKEYUP = 0x0105,
        /// <exclude/>
        WM_SYSCHAR = 0x0106,
        /// <exclude/>
        WM_SYSDEADCHAR = 0x0107,
        /// <exclude/>
        WM_KEYLAST = 0x0108,
        /// <exclude/>
        WM_IME_STARTCOMPOSITION = 0x010D,
        /// <exclude/>
        WM_IME_ENDCOMPOSITION = 0x010E,
        /// <exclude/>
        WM_IME_COMPOSITION = 0x010F,
        /// <exclude/>
        WM_IME_KEYLAST = 0x010F,
        /// <exclude/>
        WM_INITDIALOG = 0x0110,
        /// <exclude/>
        WM_COMMAND = 0x0111,
        /// <exclude/>
        WM_SYSCOMMAND = 0x0112,
        /// <exclude/>
        WM_TIMER = 0x0113,
        /// <exclude/>
        WM_HSCROLL = 0x0114,
        /// <exclude/>
        WM_VSCROLL = 0x0115,
        /// <exclude/>
        WM_INITMENU = 0x0116,
        /// <exclude/>
        WM_INITMENUPOPUP = 0x0117,
        /// <exclude/>
        WM_MENUSELECT = 0x011F,
        /// <exclude/>
        WM_MENUCHAR = 0x0120,
        /// <exclude/>
        WM_ENTERIDLE = 0x0121,
        /// <exclude/>
        WM_MENURBUTTONUP = 0x0122,
        /// <exclude/>
        WM_MENUDRAG = 0x0123,
        /// <exclude/>
        WM_MENUGETOBJECT = 0x0124,
        /// <exclude/>
        WM_UNINITMENUPOPUP = 0x0125,
        /// <exclude/>
        WM_MENUCOMMAND = 0x0126,
        /// <exclude/>
        WM_CHANGEUISTATE = 0x0127, // 295
        /// <exclude/>
        WM_UPDATEUISTATE = 0x0128, // 296
        /// <exclude/>
        WM_QUERYUISTATE = 0x0129, // 297
        /// <exclude/>
        WM_CTLCOLORMSGBOX = 0x0132,
        /// <exclude/>
        WM_CTLCOLOREDIT = 0x0133,
        /// <exclude/>
        WM_CTLCOLORLISTBOX = 0x0134,
        /// <exclude/>
        WM_CTLCOLORBTN = 0x0135,
        /// <exclude/>
        WM_CTLCOLORDLG = 0x0136,
        /// <exclude/>
        WM_CTLCOLORSCROLLBAR = 0x0137,
        /// <exclude/>
        WM_CTLCOLORSTATIC = 0x0138,
        /// <exclude/>
        WM_MOUSEMOVE = 0x0200,
        /// <exclude/>
        WM_LBUTTONDOWN = 0x0201,
        /// <exclude/>
        WM_LBUTTONUP = 0x0202,
        /// <exclude/>
        WM_LBUTTONDBLCLK = 0x0203,
        /// <exclude/>
        WM_RBUTTONDOWN = 0x0204,
        /// <exclude/>
        WM_RBUTTONUP = 0x0205,
        /// <exclude/>
        WM_RBUTTONDBLCLK = 0x0206,
        /// <exclude/>
        WM_MBUTTONDOWN = 0x0207,
        /// <exclude/>
        WM_MBUTTONUP = 0x0208,
        /// <exclude/>
        WM_MBUTTONDBLCLK = 0x0209,
        /// <exclude/>
        WM_MOUSEWHEEL = 0x020A,
        /// <exclude/>
        WM_PARENTNOTIFY = 0x0210,
        /// <exclude/>
        WM_ENTERMENULOOP = 0x0211,
        /// <exclude/>
        WM_EXITMENULOOP = 0x0212,
        /// <exclude/>
        WM_NEXTMENU = 0x0213,
        /// <exclude/>
        WM_SIZING = 0x0214,
        /// <exclude/>
        WM_CAPTURECHANGED = 0x0215,
        /// <exclude/>
        WM_MOVING = 0x0216,
        /// <exclude/>
        WM_DEVICECHANGE = 0x0219,
        /// <exclude/>
        WM_MDICREATE = 0x0220,
        /// <exclude/>
        WM_MDIDESTROY = 0x0221,
        /// <exclude/>
        WM_MDIACTIVATE = 0x0222,
        /// <exclude/>
        WM_MDIRESTORE = 0x0223,
        /// <exclude/>
        WM_MDINEXT = 0x0224,
        /// <exclude/>
        WM_MDIMAXIMIZE = 0x0225,
        /// <exclude/>
        WM_MDITILE = 0x0226,
        /// <exclude/>
        WM_MDICASCADE = 0x0227,
        /// <exclude/>
        WM_MDIICONARRANGE = 0x0228,
        /// <exclude/>
        WM_MDIGETACTIVE = 0x0229,
        /// <exclude/>
        WM_MDISETMENU = 0x0230,
        /// <exclude/>
        WM_ENTERSIZEMOVE = 0x0231,
        /// <exclude/>
        WM_EXITSIZEMOVE = 0x0232,
        /// <exclude/>
        WM_DROPFILES = 0x0233,
        /// <exclude/>
        WM_MDIREFRESHMENU = 0x0234,
        /// <exclude/>
        WM_IME_SETCONTEXT = 0x0281,
        /// <exclude/>
        WM_IME_NOTIFY = 0x0282,
        /// <exclude/>
        WM_IME_CONTROL = 0x0283,
        /// <exclude/>
        WM_IME_COMPOSITIONFULL = 0x0284,
        /// <exclude/>
        WM_IME_SELECT = 0x0285,
        /// <exclude/>
        WM_IME_CHAR = 0x0286,
        /// <exclude/>
        WM_IME_REQUEST = 0x0288,
        /// <exclude/>
        WM_IME_KEYDOWN = 0x0290,
        /// <exclude/>
        WM_IME_KEYUP = 0x0291,
        /// <exclude/>
        WM_MOUSEHOVER = 0x02A1,
        /// <exclude/>
        WM_MOUSELEAVE = 0x02A3,
        /// <exclude/>
        WM_CUT = 0x0300,
        /// <exclude/>
        WM_COPY = 0x0301,
        /// <exclude/>
        WM_PASTE = 0x0302,
        /// <exclude/>
        WM_CLEAR = 0x0303,
        /// <exclude/>
        WM_UNDO = 0x0304,
        /// <exclude/>
        WM_RENDERFORMAT = 0x0305,
        /// <exclude/>
        WM_RENDERALLFORMATS = 0x0306,
        /// <exclude/>
        WM_DESTROYCLIPBOARD = 0x0307,
        /// <exclude/>
        WM_DRAWCLIPBOARD = 0x0308,
        /// <exclude/>
        WM_PAINTCLIPBOARD = 0x0309,
        /// <exclude/>
        WM_VSCROLLCLIPBOARD = 0x030A,
        /// <exclude/>
        WM_SIZECLIPBOARD = 0x030B,
        /// <exclude/>
        WM_ASKCBFORMATNAME = 0x030C,
        /// <exclude/>
        WM_CHANGECBCHAIN = 0x030D,
        /// <exclude/>
        WM_HSCROLLCLIPBOARD = 0x030E,
        /// <exclude/>
        WM_QUERYNEWPALETTE = 0x030F,
        /// <exclude/>
        WM_PALETTEISCHANGING = 0x0310,
        /// <exclude/>
        WM_PALETTECHANGED = 0x0311,
        /// <exclude/>
        WM_HOTKEY = 0x0312,
        /// <exclude/>
        WM_PRINT = 0x0317,
        /// <exclude/>
        WM_PRINTCLIENT = 0x0318,
        /// <exclude/>
        WM_HANDHELDFIRST = 0x0358,
        /// <exclude/>
        WM_HANDHELDLAST = 0x035F,
        /// <exclude/>
        WM_AFXFIRST = 0x0360,
        /// <exclude/>
        WM_AFXLAST = 0x037F,
        /// <exclude/>
        WM_PENWINFIRST = 0x0380,
        /// <exclude/>
        WM_PENWINLAST = 0x038F,
        /// <exclude/>
        WM_USER = 0x0400,
        /// <exclude/>
        WM_APP = 0x8000,


        /// <exclude/>
        RB_GETBANDINFOA = 0x041D, // 1053 - TB_GETITEMRECT, TBM_SETTOOLTIPS, TTM_UPDATE
        /// <exclude/>
        SBM_SETSCROLLINFO = 0x00E9, // 233
        /// <exclude/>
        SBM_ENABLE_ARROWS = 0x00E4, // 228
        /// <exclude/>
        RB_IDTOINDEX = 0x0410, // 1040 - SB_SETTIPTEXTA, TBM_GETNUMTICS, TTM_WINDOWFROMPOINT
        /// <exclude/>
        RB_BEGINDRAG = 0x0418, // 1048 - TB_BUTTONCOUNT, TBM_GETLINESIZE, TTM_SETMAXTIPWIDTH 
        /// <exclude/>
        TB_GETHOTIMAGELIST = 0x0435, // 1077 - TTM_GETTOOLINFOW 
        /// <exclude/>
        TB_SETANCHORHIGHLIGHT = 0x0449, // 1097
        /// <exclude/>
        TB_GETANCHORHIGHLIGHT = 0x044A, // 1098
        /// <exclude/>
        OCM_NOTIFY = 0x204E, // 8270
        /// <exclude/>
        OCM_COMMAND = 0x2111, // 8465
        /// <exclude/>
        OCM_PARENTNOTIFY = 0x2210, // 8720
        /// <exclude/>
        OCM_DRAWITEM = 0x202B,
        /// <exclude/>
        TB_SETBUTTONWIDTH = 0x043B, // 1083 - TTM_GETCURRENTTOOLW
        /// <exclude/>
        CBEM_GETIMAGELIST = 0x0403, // 1027 - DDM_BEGIN, HKM_SETRULES, PBM_DELTAPOS, RB_GETBARINFO, SB_GETTEXTLENGTHA, TBM_GETTIC, TB_PRESSBUTTON, TTM_SETDELAYTIME, WM_PSD_MARGINRECT
        /// <exclude/>
        TB_LOADIMAGES = 0x0432, // 1074 - TTM_ADDTOOLW
        /// <exclude/>
        CBEM_GETEDITCONTROL = 0x0407 // 1031 - PBM_GETRANGE, RB_SETPARENT, SB_GETBORDERS, TBM_SETRANGEMIN, TTM_RELAYEVENT
}

    /// <exclude/>
    public enum HitTest
    {
        /// <exclude/>
        HTERROR = -2,
        /// <exclude/>
        HTTRANSPARENT = -1,
        /// <exclude/>
        HTNOWHERE = 0,
        /// <exclude/>
        HTCLIENT = 1,
        /// <exclude/>
        HTCAPTION = 2,
        /// <exclude/>
        HTSYSMENU = 3,
        /// <exclude/>
        HTGROWBOX = 4,
        /// <exclude/>
        HTSIZE = 4,
        /// <exclude/>
        HTMENU = 5,
        /// <exclude/>
        HTHSCROLL = 6,
        /// <exclude/>
        HTVSCROLL = 7,
        /// <exclude/>
        HTMINBUTTON = 8,
        /// <exclude/>
        HTMAXBUTTON = 9,
        /// <exclude/>
        HTLEFT = 10,
        /// <exclude/>
        HTRIGHT = 11,
        /// <exclude/>
        HTTOP = 12,
        /// <exclude/>
        HTTOPLEFT = 13,
        /// <exclude/>
        HTTOPRIGHT = 14,
        /// <exclude/>
        HTBOTTOM = 15,
        /// <exclude/>
        HTBOTTOMLEFT = 16,
        /// <exclude/>
        HTBOTTOMRIGHT = 17,
        /// <exclude/>
        HTBORDER = 18,
        /// <exclude/>
        HTREDUCE = 8,
        /// <exclude/>
        HTZOOM = 9,
        /// <exclude/>
        HTSIZEFIRST = 10,
        /// <exclude/>
        HTSIZELAST = 17,
        /// <exclude/>
        HTOBJECT = 19,
        /// <exclude/>
        HTCLOSE = 20,
        /// <exclude/>
        HTHELP = 21
    }

    /// <summary>
    /// Možnosti posuvníku
    /// </summary>
    public enum ScrollBars : uint
    {
        /// <exclude/>
        SB_HORZ = 0,
        /// <exclude/>
        SB_VERT = 1,
        /// <exclude/>
        SB_CTL = 2,
        /// <exclude/>
        SB_BOTH = 3
    }

    /// <summary>
    /// Index okna
    /// </summary>
    public enum GetWindowLongIndex : int
    {
        /// <exclude/>
        GWL_STYLE = -16,
        /// <exclude/>
        GWL_EXSTYLE = -20
    }

    /// <summary>
    /// Typy hook
    /// </summary>
    public enum HookType : int
    {
        /// <exclude/>
        WH_JOURNALRECORD = 0,
        /// <exclude/>
        WH_JOURNALPLAYBACK = 1,
        /// <exclude/>
        WH_KEYBOARD = 2,
        /// <exclude/>
        WH_GETMESSAGE = 3,
        /// <exclude/>
        WH_CALLWNDPROC = 4,
        /// <exclude/>
        WH_CBT = 5,
        /// <exclude/>
        WH_SYSMSGFILTER = 6,
        /// <exclude/>
        WH_MOUSE = 7,
        /// <exclude/>
        WH_HARDWARE = 8,
        /// <exclude/>
        WH_DEBUG = 9,
        /// <exclude/>
        WH_SHELL = 10,
        /// <exclude/>
        WH_FOREGROUNDIDLE = 11,
        /// <exclude/>
        WH_CALLWNDPROCRET = 12,
        /// <exclude/>
        WH_KEYBOARD_LL = 13,
        /// <exclude/>
        WH_MOUSE_LL = 14
    }
}
