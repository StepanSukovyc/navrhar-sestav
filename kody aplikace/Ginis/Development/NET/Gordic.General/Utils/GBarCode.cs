//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GBarCode.cs                                  </Name>
//    <Description> Vytvoření čárových (QR) kódů                                </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-11-23                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Vytvoření čárových (QR) kódů
    /// </summary>
    public static class GBarCode
    {
        private static readonly IGLogger Log = GLogManager.CurrentClassLogger();


        /// <summary>
        /// Vytvoření QR kódu
        /// </summary>
        [System.Security.SecuritySafeCritical]
        public static void CreateQRCode(string data, string file/*, float zoomFactor = 1.0f*/)
        {
            Log.Debug($"Vytvoření QR kódu pro data {data}");
#if NETFRAMEWORK
            var zxw = new ZXing.BarcodeWriter() { Format = ZXing.BarcodeFormat.QR_CODE };
#else
            var zxw = new ZXing.Windows.Compatibility.BarcodeWriter() { Format = ZXing.BarcodeFormat.QR_CODE };
#endif
            var bitmap = zxw.Write(data);
            bitmap.Save(file);
            Log.Debug($"QR kód pro data {data} úspěšně vytvořen.");
        } // end method

        /// <summary>
        /// Dekódování QR kódu
        /// </summary>
        public static string[] DecodeQRCode(Bitmap bitmap)
        {
            return DecodeBarCode(bitmap, new List<ZXing.BarcodeFormat>() { ZXing.BarcodeFormat.QR_CODE });
        }
        /// <summary>
        /// Dekódování QR kódu a CODE 39 čárového kódu (PID)
        /// </summary>
        public static string[] DecodeBarCode(Bitmap bitmap)
        {
            return DecodeBarCode(bitmap, new List<ZXing.BarcodeFormat>() { ZXing.BarcodeFormat.QR_CODE, ZXing.BarcodeFormat.CODE_39 });
        }

        private static string[] DecodeBarCode(Bitmap bitmap, List<ZXing.BarcodeFormat> formats)
        {
            Log.Debug($"Čtení Barcode");

#if NETFRAMEWORK
            var source = new ZXing.BitmapLuminanceSource(bitmap);
#else
            var source = new ZXing.Windows.Compatibility.BitmapLuminanceSource(bitmap);
#endif

#if NETFRAMEWORK
            var zx = new ZXing.BarcodeReader();
#else
            var zx = new ZXing.Windows.Compatibility.BarcodeReader();
#endif
            //zx.AutoRotate = true;
            zx.Options.TryHarder = true;
            zx.Options.PossibleFormats = formats;
            var zxArray = zx.DecodeMultiple(source);
            if (zxArray != null)
            {
                Log.Debug($"Barcode přečten: hard varianta.");
                return zxArray.Select(a => a.Text).ToArray();
            }

            if (formats.Contains(ZXing.BarcodeFormat.QR_CODE))
            {
                var binarizer = new ZXing.Common.HybridBinarizer(source);
                var binBitmap = new ZXing.BinaryBitmap(binarizer);
                var zxq = new ZXing.QrCode.QRCodeReader();
                var qrest = zxq.decode(binBitmap);
                if (qrest != null)
                {
                    Log.Debug($"Barcode přečten: přímá QR varianta.");
                    return new string[] { qrest.Text };
                }
            }

            Log.Debug($"Barcode nepřečten.");
            return null;
        }

        #region Starý způsob přes QRCoder (nuget, reference)
        ///// <summary>
        ///// Vytvoření QR kódu
        ///// </summary>
        //[System.Security.SecuritySafeCritical]
        //public static void CreateQRCode(string data, string file, float zoomFactor = 1.0f)
        //{
        //    Log.Debug($"Vytvoření QR kódu pro data {data}");

        //    QRCodeGenerator l_oGenerator = new QRCodeGenerator();
        //    QRCodeData l_oCodeData = l_oGenerator.CreateQrCode(data, QRCodeGenerator.ECCLevel.Q);
        //    QRCode l_oCode = new QRCode(l_oCodeData);
        //    l_oCode.GetGraphic(20).Save(file);
        //    Log.Debug($"QR kód pro data {data} úspěšně vytvořen.");
        //} // end method
        #endregion
        #region Starý způsob přes Reporter (native GRR)

        //delegate int dcreateBarcode(out IntPtr result, string data, int x, int y, int type, int o1, int o2, int o3, IntPtr atrs, IntPtr style);
        //private const int S_OK = 0;
        //private const int S_FALSE = 1;

        //private static void Throw06Error(int hresult)
        //{
        //    if (hresult != 0)
        //    {
        //        StringBuilder msg = new StringBuilder(1024);
        //        if (hresult == S_FALSE)
        //            msg.Append("S_FALSE");
        //        //else
        //        //    GetErrorText(msg, msg.Capacity);
        //        //throw new GrrException(21000052, /*RC-EX*/ 9, Grr06Loader.Loader, hresult, msg.ToString());  //RC-EX 9 : Chyba reporteru: {0}
        //        throw new GException(21000085, 21090057); //RC-EX 21090057 : Chyba při vytváření čárového kódu
        //    }
        //}

        ///// <summary>
        ///// Vytvoření QR kódu
        ///// </summary>
        //[System.Security.SecuritySafeCritical]
        //public static void CreateQRCode(string data, string file, float zoomFactor = 1.0f)
        //{
        //    Log.Debug($"Vytvoření QR kódu pro data {data}");

        //    FunctionLoader Grr06Loader = new FunctionLoader("grr06");
        //    dcreateBarcode createBarcode = (dcreateBarcode)Grr06Loader.LoadFunction<dcreateBarcode>();

        //    const int l_cnBarcodeType = 58; // QR kód

        //    //using (NativePaintHelper l_oPaintHelper = new NativePaintHelper(Color.Black, Color.White))
        //    {
        //        IntPtr res;
        //        Throw06Error(createBarcode(out res, data, 0, 0, l_cnBarcodeType, 4, 0, 0, IntPtr.Zero, IntPtr.Zero));
        //        using (BitmapWrap l_oBitmapWrap = BitmapWrap.FromHbitmap(res))
        //        {
        //            if (zoomFactor <= 1)
        //            {
        //                l_oBitmapWrap.Bitmap.Save(file);
        //            }
        //            else
        //            {
        //                Size l_oNewSize = new Size((int)(l_oBitmapWrap.Bitmap.Width * zoomFactor), (int)(l_oBitmapWrap.Bitmap.Height * zoomFactor));
        //                Bitmap l_oBitmap = new Bitmap(l_oBitmapWrap.Bitmap, l_oNewSize);
        //                l_oBitmap.Save(file);
        //            } // end if
        //        } // end using
        //    } // end using

        //    Log.Debug($"QR kód pro data {data} úspěšně vytvořen.");
        //} // end method
        /*
                #region NativePaintHelper

                //private sealed class NativeColorHelper : Gordic.Report.Implementation.IGFormatGRRColor
                //{
                //    Color color;

                //    public NativeColorHelper(Color color)
                //    {
                //        this.color = color;
                //    }
                //    int Gordic.Report.Implementation.IGFormatGRRColor.getIndexInColorTable(out int idx)
                //    {
                //        idx = 0;
                //        return 1;
                //    }
                //    int Gordic.Report.Implementation.IGFormatGRRColor.getName(out string cn)
                //    {
                //        cn = null;// IntPtr.Zero;
                //        return 1;
                //    }
                //    int Gordic.Report.Implementation.IGFormatGRRColor.getRGB(out int cr)
                //    {
                //        cr = System.Drawing.ColorTranslator.ToWin32(color);
                //        return 0;
                //    }
                //    int Gordic.Report.Implementation.IGFormatGRRColor.isTransparent(out bool ct)
                //    {
                //        ct = color == System.Drawing.Color.Transparent;
                //        return 0;
                //    }
                //} // end class

                //private class NativePaintHelper : IDisposable, Gordic.Report.Implementation.IGNativeStringOwner, Gordic.Report.Implementation.IGFormatGRRCellStyle
                //{

                //    public Gordic.Report.Implementation.GAttrList Attributes;

                //    public NativeColorHelper Color1;

                //    public NativeColorHelper Color2;

                //    public NativePaintHelper(Color front, Color back)
                //    {
                //        Attributes = new Gordic.Report.Implementation.GAttrList(this, 0);
                //        this.Color1 = new NativeColorHelper(front);
                //        this.Color2 = new NativeColorHelper(back);
                //    }

                //    public void Dispose()
                //    {
                //        Dispose(true);
                //        GC.SuppressFinalize(this);
                //    }

                //    protected virtual void Dispose(bool disposing)
                //    {
                //    }

                //    ~NativePaintHelper() { Dispose(false); }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getFontColor(out Gordic.Report.Implementation.IGFormatGRRColor clr)
                //    {
                //        clr = Color1;
                //        return 0;
                //    }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getBackColor(out Gordic.Report.Implementation.IGFormatGRRColor clr)
                //    {
                //        clr = Color2;
                //        return 0;
                //    }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getBorderWidths(out Gordic.Report.Implementation.Grr06Widths ws)
                //    {
                //        throw new NotImplementedException();
                //    }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getBottomBorder(out Gordic.Report.Implementation.IGFormatGRRBorder bd)
                //    {
                //        throw new NotImplementedException();
                //    }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getEllipsisChar(out char elc)
                //    {
                //        throw new NotImplementedException();
                //    }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getEllipsisStyle(out Gordic.Report.Implementation.Grr06ElStyle els)
                //    {
                //        throw new NotImplementedException();
                //    }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getFontBold(out bool fbold)
                //    {
                //        throw new NotImplementedException();
                //    }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getFontCharset(out int fcharset)
                //    {
                //        throw new NotImplementedException();
                //    }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getFontFace(out string fface)
                //    {
                //        throw new NotImplementedException();
                //    }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getFontFaceIndex(out Gordic.Report.Implementation.Grr06FontFace ffidx)
                //    {
                //        throw new NotImplementedException();
                //    }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getFontItalic(out bool fitalic)
                //    {
                //        throw new NotImplementedException();
                //    }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getFontSize(out int fsize)
                //    {
                //        throw new NotImplementedException();
                //    }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getFontStrokeOut(out bool fstroked)
                //    {
                //        throw new NotImplementedException();
                //    }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getFontUnderlined(out bool funder)
                //    {
                //        throw new NotImplementedException();
                //    }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getHorzAlign(out Gordic.Report.Implementation.Grr06HAlign alg)
                //    {
                //        throw new NotImplementedException();
                //    }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getLeftBorder(out Gordic.Report.Implementation.IGFormatGRRBorder bd)
                //    {
                //        throw new NotImplementedException();
                //    }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getMultiline(out bool multil)
                //    {
                //        throw new NotImplementedException();
                //    }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getPadding(out Gordic.Report.Implementation.Grr06Widths pad)
                //    {
                //        throw new NotImplementedException();
                //    }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getRightBorder(out Gordic.Report.Implementation.IGFormatGRRBorder bd)
                //    {
                //        throw new NotImplementedException();
                //    }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getSpacing(out Gordic.Report.Implementation.Grr06Widths spa)
                //    {
                //        throw new NotImplementedException();
                //    }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getStyleAttribute(string name, out string value)
                //    {
                //        throw new NotImplementedException();
                //    }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getStyleAttributes(out Gordic.Report.Implementation.IGAttrList atrs)
                //    {
                //        throw new NotImplementedException();
                //    }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getTextOrientation(out int orient)
                //    {
                //        throw new NotImplementedException();
                //    }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getTopBorder(out Gordic.Report.Implementation.IGFormatGRRBorder bd)
                //    {
                //        throw new NotImplementedException();
                //    }

                //    int Gordic.Report.Implementation.IGFormatGRRCellStyle.getVertAlign(out Gordic.Report.Implementation.Grr06VAlign alg)
                //    {
                //        throw new NotImplementedException();
                //    }
                //} // end class
                #endregion
                #region BitmapWrap
                /// <summary>Pomocná třída pro uvolnění nativního obrázku z paměti</summary>
                private class BitmapWrap : IDisposable
                {
                    private BitmapWrap(Bitmap bmp, IntPtr handle)
                    {
                        m_Bitmap = bmp;
                        m_Handle = handle;
                    }
                    //------------------------------------------------------------------
                    private Bitmap m_Bitmap;
                    ///<summary>Bitmapa</summary>
                    public Bitmap Bitmap
                    {
                        get { return m_Bitmap; }
                    }
                    ///<summary>Bitmapa</summary>
                    public static implicit operator Bitmap(BitmapWrap b)
                    {
                        return b.Bitmap;
                    }
                    //------------------------------------------------------------------
                    private IntPtr m_Handle;
                    ///<summary>Hlídaný handle</summary>
                    public IntPtr Handle
                    {
                        get { return m_Handle; }
                    }

                    ///<summary>Konstruktor</summary>
                    public static BitmapWrap FromHbitmap(IntPtr res)
                    {
                        return new BitmapWrap(Bitmap.FromHbitmap(res), res);
                    }

                    [DllImport("gdi32.dll")]
                    static extern bool DeleteObject(IntPtr hObject);

                    ///<summary>Uvolnění</summary>
                    [System.Security.SecuritySafeCritical]
                    public void Dispose()
                    {
                        m_Bitmap.Dispose();
                        if (m_Handle != IntPtr.Zero)
                        {
                            DeleteObject(m_Handle);
                            m_Handle = IntPtr.Zero;
                        }
                    }
                }
                #endregion
                #region FunctionLoader
                /// <summary>
                /// Zavedení nativní knihovny v GORDIC konvenci
                /// </summary>
                [System.Security.SecurityCritical]
                private class FunctionLoader
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
                    [return: MarshalAs(UnmanagedType.Bool)] private static extern bool FreeLibrary(IntPtr hModule);
                    //[DllImport("kernel32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
                    //[return: MarshalAs(UnmanagedType.Bool)]private static extern bool SetDllDirectory(string lpPathName);
                    [DllImport("kernel32.dll", SetLastError = true)]
                    [PreserveSig]
                    private static extern uint GetModuleFileName([In] IntPtr hModule, [Out] StringBuilder lpFilename, [In][MarshalAs(UnmanagedType.U4)] int nSize);

                    public FunctionLoader(string dllname)
                    {
                        DllName = (Environment.Is64BitProcess ? "g64" + dllname : "g32" + dllname) + ".dll";
                    }
                    public FunctionLoader(string dllname, bool noMangling)
                    {
                        DllName = noMangling ? dllname : (Environment.Is64BitProcess ? "g64" + dllname : "g32" + dllname) + ".dll";
                    }
                    [System.Security.SecuritySafeCritical]
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

                        //i = GVidrunLocator.GetLibrariesPath();
                        ////var i = (AppDomain.CurrentDomain.GetData("native_dll_path") ?? "").ToString();
                        //if (string.IsNullOrEmpty(i) == false)
                        //{
                        //    var err1 = LoadFrom(i);
                        //    if (DLL != IntPtr.Zero) return;
                        //    errs += "/n" + err1;
                        //}

                        i = Gordic.General.GApplicationInfo.GetInstallPath();
                        if (string.IsNullOrEmpty(i) == false)
                        {
                            var err2 = LoadFrom(Path.Combine(i, "Gin")); // GINIS/Gin
                            if (DLL != IntPtr.Zero) return;
                            errs += "/g" + err2;
                        }

                        //i = GVidrunLocator.GetVidrunPath();
                        //if (string.IsNullOrEmpty(i) == false)
                        //{
                        //    var err3 = LoadFrom(i);
                        //    if (DLL != IntPtr.Zero) return;
                        //    errs += "/v" + err3;
                        //}

                        i = AppDomain.CurrentDomain.SetupInformation.PrivateBinPath;
                        if (string.IsNullOrEmpty(i) == false)
                        {
                            foreach (var p in i.Split(Path.PathSeparator))
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

                        throw new GException(21000083, 21090055 , new Win32Exception(err), DllName, errs); //RC-EX 21090055 : Nelze najít knihovnu {0}. Kód {1}. Ověřte nastavení cest.
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
                            throw new GException(21000084, 21090056, new Win32Exception(), DllName, functionName); //RC-EX 21090056 : Knihovna {0} je v nesprávné verzi nebo porušená. Neobsahuje funkci {1}.
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
                #endregion
        */
        #endregion
    }
}
