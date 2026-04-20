//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Interfaces.cs                               </Name>
//    <Description> Import nativnich typu reporteru             </Description>
//    <Author>      Martin Aliger                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2006  </Copyright>
//    <Created>     2006-10-05                                  </Created>
//  </FileHeader>

using System;
using System.Runtime.InteropServices;
using System.Text;
using System.IO;
using System.Reflection;
using System.ComponentModel;
using Gordic.General;

#pragma warning disable 1591

namespace Gordic.Report.Implementation
{
    [System.Security.SecurityCritical]
    //public struct RepString
    public static class RepString
    {
        //IntPtr str;
        //public IntPtr S { get { return str; } }

        ////public RepString() { str = IntPtr.Zero; }
        //public RepString(IntPtr s) { str = s; }

        //public static RepString Null { get { return new RepString(IntPtr.Zero); } }

        //[System.Security.SecuritySafeCritical]
        //public static implicit operator string(RepString rs) { return s(rs.str); }
        //[System.Security.SecuritySafeCritical]
        //public override string ToString() { return s(str); }

        public static string s(IntPtr str)
        {
            if (str == IntPtr.Zero) return null;
            unchecked
            {
                unsafe
                {
                    var p = (sbyte*)str;
                    var b1 = p[0];
                    if (b1 == 0) return string.Empty;
                    var b2 = p[1]; // Marshal.ReadByte(str, 1);

                    //The UTF-8 representation of the BOM is the byte sequence 0xEF,0xBB,0xBF
                    if (b1 == (sbyte)0xEF && b2 == (sbyte)0xBB)
                    {
                        var b3 = Marshal.ReadByte(str, 2);
                        if (b3 == 0xBF) //UTF8 signature
                            return FromUtf8(p + 3);
                    }
                    //If the 16-bit units are represented in big-endian byte order, this BOM character will appear in the sequence of bytes as 0xFE followed by 0xFF.
                    if (b1 == (sbyte)0xFE && b2 == (sbyte)0xFF)
                        return FromUtf16BE(p + 2);
                    //if the 16-bit units use little-endian order, the sequence of bytes will have 0xFF followed by 0xFE.
                    if (b1 == (sbyte)0xFF && b2 == (sbyte)0xFE)
                        return FromUtf16LE(p + 2);
                }
            }
            var ret = Marshal.PtrToStringAnsi(str);
#if DEBUG
            //ANSI
            StringBuilder sb = new StringBuilder(ret.Length + 128);
            int cc = MultiByteToWideChar(CP_ACP, MB_PRECOMPOSED, str, -1, sb, sb.Capacity);
            System.Diagnostics.Debug.Assert(sb.ToString() == ret);
            System.Diagnostics.Debug.Assert(cc - 1 == ret.Length);
#endif
            return ret;
        }

        const uint CP_ACP = 0;
        //const uint CP_OEMCP = 1;
        //const uint CP_THREAD_ACP = 3;           // current thread's ANSI code page
        //const uint CP_UTF7 = 65000;
        //const uint CP_UTF8 = 65001;
        const int MB_PRECOMPOSED = 1;
        const int WC_NO_BEST_FIT_CHARS = 0x400; // do not use best fit chars
        [DllImport("kernel32.dll")]
        static extern int WideCharToMultiByte(uint CodePage, uint dwFlags,
           [MarshalAs(UnmanagedType.LPWStr)] string lpWideCharStr, int cchWideChar,
           [MarshalAs(UnmanagedType.LPArray)] Byte[] lpMultiByteStr, int cbMultiByte, IntPtr lpDefaultChar,
           out bool lpUsedDefaultChar);
        [DllImport("kernel32.dll")]
        static extern int WideCharToMultiByte(
            uint CodePage, uint dwFlags,
           [MarshalAs(UnmanagedType.LPWStr)] string lpWideCharStr, int cchWideChar,
           IntPtr lpMultiByteStr, int cbMultiByte, IntPtr lpDefaultChar,
           out bool lpUsedDefaultChar);
        [DllImport("kernel32.dll")]
        static extern int MultiByteToWideChar(uint CodePage, uint dwFlags,
            IntPtr lpMultiByteStr, int cbMultiByte, 
            [Out, MarshalAs(UnmanagedType.LPWStr)] StringBuilder lpWideCharStr, int cchWideChar);
        [DllImport("kernel32.dll")]
        static extern void CopyMemory(
            IntPtr destination
            , /*IntPtr*/ [MarshalAs(UnmanagedType.LPWStr)] string source
            , int length);

        public static IntPtr r(string s)
        {
            var len = (s.Length + 2) * 2;
            var a = Marshal.AllocCoTaskMem(len);
            bool bDefaultChar;
            WideCharToMultiByte(CP_ACP, WC_NO_BEST_FIT_CHARS, s, s.Length + 1, a, len, IntPtr.Zero, out bDefaultChar);
            if (bDefaultChar)
            {
                Marshal.WriteByte(a, 0, 0xFF);
                Marshal.WriteByte(a, 1, 0xFE);
                CopyMemory(a + 2, s, len - 2);
            }
            return a;
        }

        private static unsafe string FromUtf16LE(sbyte* p)
        {
            return new string(p, 0, find2zeros(p), Encoding.Unicode);
        }
        private static unsafe string FromUtf16BE(sbyte* p)
        {
            return new string(p, 0, find2zeros(p), Encoding.BigEndianUnicode);
        }
        private static unsafe string FromUtf8(sbyte* p)
        {
            return new string(p, 0, findzero(p), Encoding.UTF8);
        }
        private static unsafe int findzero(sbyte* p)
        {
            int l = 0;
            while (true)
            {
                if (*p == 0) return l;
                p++;
                l++;
            }
        }
        private static unsafe int find2zeros(sbyte* p)
        {
            int l = 0;
            while (true)
            {
                if (*p == 0 && p[1] == 0) return l;
                p += 2;
                l += 2;
            }
        }
    }    public class RepStringIn : ICustomMarshaler
    {
        static ICustomMarshaler GetInstance(string pstrCookie) { return new RepStringIn(); }        void ICustomMarshaler.CleanUpManagedData(object ManagedObj)
        {
        }        void ICustomMarshaler.CleanUpNativeData(IntPtr pNativeData)
        {
            Marshal.FreeCoTaskMem(pNativeData);
        }        int ICustomMarshaler.GetNativeDataSize()
        {
            return -1;
        }        IntPtr ICustomMarshaler.MarshalManagedToNative(object ManagedObj)
        {
            return RepString.r((string)ManagedObj);
        }        object ICustomMarshaler.MarshalNativeToManaged(IntPtr pNativeData)
        {
            return RepString.s(pNativeData);
        }
    }    public class RepStringOut : ICustomMarshaler
    {
        static ICustomMarshaler GetInstance(string pstrCookie) { return new RepStringOut(); }        void ICustomMarshaler.CleanUpManagedData(object ManagedObj)
        {
        }        void ICustomMarshaler.CleanUpNativeData(IntPtr pNativeData)
        {
        }        int ICustomMarshaler.GetNativeDataSize()
        {
            return -1;
        }

        [ThreadStatic]
        static private System.Collections.Generic.Stack<GNativeStringCache> m_cache;
        static internal System.Collections.Generic.Stack<GNativeStringCache> ns_cache
        {
            get
            {
                if (m_cache == null) //neni treba zamykat, pokud je ThreadStatic - jiny kod se k tomu nedostane
                    m_cache = new System.Collections.Generic.Stack<GNativeStringCache>();
                return m_cache;
            }
        }        IntPtr ICustomMarshaler.MarshalManagedToNative(object ManagedObj)
        {
            var c = ns_cache.Pop();
            if (c != null)
            {
                var s = (string)ManagedObj;
                var r = c.Find(s);
                if (r != IntPtr.Zero) return r;
                
                r = RepString.r(s);
                c.AddCoTaskmem(s, r);
                
                return r;
            }
            throw new NotImplementedException();
        }        object ICustomMarshaler.MarshalNativeToManaged(IntPtr pNativeData)
        {
            return RepString.s(pNativeData);
        }
    }

    #region Structs
    //public enum Grr06DataTypeSimple : byte { String = 0, Number = 1, Datetime = 2 };
    public enum Grr06DataType : byte { String = 0, Number = 1, Datetime = 2, Object = 3, RtfText = 4, RtfCompressed = 5, StringNT = 6, Unknown = 0xff };
    public enum Grr06Metrics { Unspec = 0, Percent = 1, MMeters = 2, Twip = 3, Points = 4 };
    public enum Grr06HAlign { Left = 0, Right = 1, Center = 2, Justify = 3 };
    public enum Grr06VAlign { Top = 0, Bottom = 1, Center = 2 };
    public enum Grr06BorderStyle { Solid = 0, Dashed = 1, Dotted = 2, Double = 3 };
    public enum Grr06ElStyle { Dots = 0, Cut = 1, Fill = 2 };
    public enum Grr06FontFace { Times = 0, Arial = 1, Courier = 2, Custom = 3 };

    [Flags]
    public enum Grr06PagingEvent { None = 0, Eachpage = 1, EndPage = 2, MiddlePage = 4, BreakBefore = 16, AvoidBefore = 32, BreakAfter = 256, AvoidAfter = 512 };

    [StructLayout(LayoutKind.Sequential)]
    public struct Grr06Widths
    {
        public int left;
        public int top;
        public int right;
        public int bottom;
    }

    [StructLayout(LayoutKind.Sequential)]
    public struct Grr06WidthsWithMet
    {
        public double left;
        public double top;
        public double right;
        public double bottom;
        public Grr06Metrics leftMet;
        public Grr06Metrics topMet;
        public Grr06Metrics rightMet;
        public Grr06Metrics bottomMet;
    }

    [StructLayout(LayoutKind.Sequential)]
    public struct Grr06Pos
    {
        public Int32 p;
    }
    #endregion
    #region obecne

    [GuidAttribute("83C02001-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGScript
    {
        [PreserveSig]
        int getScriptText([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string script);
        [PreserveSig]
        int getCompiledScript(out IntPtr compiled);
        [PreserveSig]
        int check();
    }
    [GuidAttribute("83C02002-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    internal interface IGScriptEngine_Grr06
    {
        [PreserveSig]
        int addObject([MarshalAs(UnmanagedType.LPStr)] string name, IScriptable obj);
        [PreserveSig]
        int runScript(IGScript script);
        [PreserveSig]
        int evaluate(IGScript expression, out IDataScriptable result);

        [PreserveSig]
        //int compileScript([MarshalAs(UnmanagedType.LPStr)] string script, out IntPtr compiled);
        int compileScript([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))] string script, out IntPtr compiled);

        [PreserveSig]
        int compileExpression([MarshalAs(UnmanagedType.LPStr)] string expression, out IntPtr compiled);
        [PreserveSig]
        int freeCompiled(IntPtr compiled);


        [PreserveSig]
        int createDecimal([MarshalAs(UnmanagedType.LPStr)] string num, out IDecimal dec);
        [PreserveSig]
        int createDecimal2(int num, out IDecimal dec);
        [PreserveSig]
        int createDatetime([MarshalAs(UnmanagedType.LPStr)] string dat, out IDatetime dt);

        [PreserveSig]
	    int __runScriptLow(IntPtr compiled);
    };

    [GuidAttribute("83C01F94-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGAttrList
    {
        [PreserveSig]
        int getCount(out int cnt);
        [PreserveSig]
        int getItem(int index
            , [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))]out string name
            , [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))]out string value);
        [PreserveSig]
        int getAttribute(
            [MarshalAs(UnmanagedType.LPStr)]string name //[MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))]string name
            , [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))]out string value);
    }

    [GuidAttribute("83C01F95-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGInfoList
    {
        //seznam info sekcí a jejich hodnot
        [PreserveSig]
        int getCount(out int cnt);
        [PreserveSig]
        int getItem(int index
            , [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))]out string name
            , [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))]out string value);
        [PreserveSig]
        int getInfo(
            [MarshalAs(UnmanagedType.LPStr)]string name //[MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))]string name
            , [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);
        [PreserveSig]
        int convertToText(StringBuilder buffer, int size);
    }

    #endregion
    #region struktura
    [GuidAttribute("83C01F91-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGDataItem
    {
        //obecné
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)]string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //základní vlastnosti
        [PreserveSig]
        int getName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string aname);
        [PreserveSig]
        int getFullName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string fname);
        [PreserveSig]
        int getDescription([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string desc);
        //datové typy
        [PreserveSig]
        int getDataType(out Grr06DataType typ);

        //region
        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGRegion region);   //new ref

        //order (pomocny int)
        [PreserveSig]
        int getOrder(out int order);
        [PreserveSig]
        int setOrder(int order);
    }

    [GuidAttribute("83C01F90-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGRegion
    {
        //obecné
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)]string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //základní vlastnosti
        [PreserveSig]
        int getName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string aname);
        [PreserveSig]
        int getFullName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string fname);
        [PreserveSig]
        int getDescription([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string desc);

        //práce se stromovou hierarchií
        [PreserveSig]
        int getChildrenCount(out int cnt);
        [PreserveSig]
        int getChild(int index, out IGRegion reg);
        [PreserveSig]
        int getParentBorrowed(out IntPtr reg); //borrowed ref
        [PreserveSig]
        int getChildByName([MarshalAs(UnmanagedType.LPStr)]string name, out IGRegion reg);

        //datové polozky
        [PreserveSig]
        int getDataItemCount(out int cnt);
        [PreserveSig]
        int getDataItem(int index, out IGDataItem di);
        [PreserveSig]
        int getDataItemByName([MarshalAs(UnmanagedType.LPStr)]string name, out IGDataItem di);

        //ruzné testy
        [PreserveSig]
        int isA([MarshalAs(UnmanagedType.LPStr)]string name); //vrací S_OK, pokud se jméno shoduje se zadaným
        [PreserveSig]
        int hasChild([MarshalAs(UnmanagedType.LPStr)]string name); //vrací S_OK, pokud má potomka danného jména
        [PreserveSig]
        int getParentIndex(out int index); //index v rodièovském Children
    }

    [GuidAttribute("83C01FB0-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGStructure
    {
        [PreserveSig]
        int getVersion(out int major, out int minor);
        [PreserveSig]
        int getStructureVersion([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string ident, out int major, out int minor);

        //oblasti
        [PreserveSig]
        int getRoot([MarshalAs(UnmanagedType.Interface)]out IGRegion root);

        //info
        [PreserveSig]
        int getAllInfo([MarshalAs(UnmanagedType.Interface)]out IGInfoList info);
        [PreserveSig]
        int getInfo(
            [MarshalAs(UnmanagedType.LPStr)]string name //[MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))]string name
            , [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);
    }
    #endregion
    #region format - zakladni
    [GuidAttribute("83C01FB2-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormat
    {
        //verze specifikace
        [PreserveSig]
        int getVersion(out int major, out int minor);
        [PreserveSig]
        int getFormattingGroup([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string type);  //vraci "grr"/"msw"/"mse" (uppercase)
        [PreserveSig]
        int getStructureVersion([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string ident, out int major, out int minor);

        //všechny oblasti organizované v stromové hierarchii
        [PreserveSig]
        int getRoot([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion root); //newref, imaginární oblast, v níž jsou skuteèné oblasti

        //info
        [PreserveSig]
        int getAllInfo([MarshalAs(UnmanagedType.Interface)]out IGInfoList info);
        [PreserveSig]
        int getInfo([MarshalAs(UnmanagedType.LPStr)]string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //paper-setting
        [PreserveSig]
        int getPaperSize(out int width, out int height);
        [PreserveSig]
        int getPaperMargins(out Grr06Widths margins);

        //editor-setting
        [PreserveSig]
        int getEditorSetting([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);

        [EditorBrowsable(EditorBrowsableState.Never)]
        int __beforeData();
        [EditorBrowsable(EditorBrowsableState.Never)]
        int __afterData();
        [EditorBrowsable(EditorBrowsableState.Never)]
        int __getScriptEngine(out IntPtr engine);	//borrow ref
    }

    [GuidAttribute("83C01FB7-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatDevTools //: IUnknown
    {
        [PreserveSig]
        int getTagLocation([MarshalAs(UnmanagedType.Interface)]IGFormatTag tag, out int line, out int col);
    }

    [GuidAttribute("83C01FB8-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatParser //: IUnknown
    {
        [PreserveSig]        
        int parseContent([MarshalAs(UnmanagedType.LPArray)] byte[] bytes, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))]string fname, int part, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag);
    }

    [GuidAttribute("83C01F9E-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatVariable //: IGDataItem
    {
        //obecné
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)]string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //základní vlastnosti
        [PreserveSig]
        int getName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string aname);
        [PreserveSig]
        int getFullName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string fname);
        [PreserveSig]
        int getDescription([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string desc);
        //datové typy
        [PreserveSig]
        int getDataType(out Grr06DataType typ);

        [EditorBrowsable(EditorBrowsableState.Never)]
        int __getRegion();//IRegion** region);
        [EditorBrowsable(EditorBrowsableState.Never)]
        int __getOrder();//int* order);
        [EditorBrowsable(EditorBrowsableState.Never)]
        int __setOrder();//int order);

        [PreserveSig]
        int getValueScript([MarshalAs(UnmanagedType.Interface)]out IGScript valuescript);
        //int __getAssociatedItem(IDataItem** item);   //borrowed ref
        //int __setAssociatedItem(IDataItem* item);
        //int __getAssociatedRegion(IRegion** region); //borrowed ref
        //int __setAssociatedRegion(IRegion* region);
    }

    [GuidAttribute("83C01FA1-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatTag
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref
    }

    [GuidAttribute("83C01F9A-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatTag2
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getInnerText([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);
    }

    [GuidAttribute("83C01F9C-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatComment //: IGFormatTag
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getCommentText([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);
    }

    [GuidAttribute("83C01F9D-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatGroup
    {
        //skupina
        [PreserveSig]
        int getName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getIndex(out int index);
        [PreserveSig]
        int getGrouping([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string grouping);

        //hlavièka
        [PreserveSig]
        int getHeadCount(out int count);
        [PreserveSig]
        int getHead(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag ft);  //nutné Query (v GRR vždy IFormatLine)

        //patièka
        [PreserveSig]
        int getFootCount(out int count);
        [PreserveSig]
        int getFoot(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag ft);  //nutné Query (v GRR vždy IFormatLine)

        //zpracované Grouping
        //int getKeyItemCount(out int count);
        //int __getKeyItem(int index,[MarshalAs(UnmanagedType.Interface)]out IGDataItem item); //borrowed
        //int containsKey([MarshalAs(UnmanagedType.Interface)]IGDataItem item);  //vraci S_OK pokud obsahuje jinak S_FALSE
        //int containsKey(int order);        //vraci S_OK pokud obsahuje jinak S_FALSE
    }

    [GuidAttribute("83C01FA0-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatRegion //: IGFormatTag
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        //oblast
        [PreserveSig]
        int getName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getParent([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion parent);  //new ref

        //hlavièka
        [PreserveSig]
        int getHeadCount(out int count);
        [PreserveSig]
        int getHead(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag ft);  //nutné Query (v GRR vždy IFormatLine)

        //tìlo
        [PreserveSig]
        int getBodyCount(out int count);
        [PreserveSig]
        int getBody(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag ft);//IGFormatTag ft);  //nutné Query (v GRR IFormatLine nebo IFormatRegion)

        //patièka
        [PreserveSig]
        int getFootCount(out int count);
        [PreserveSig]
        int getFoot(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag ft);  //nutné Query (v GRR vždy IFormatLine)

        //skupiny
        [PreserveSig]
        int getGroupCount(out int count);
        [PreserveSig]
        int getGroup(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatGroup gr); //new ref

        //stránkování
        [PreserveSig]
        int getPageHeaderFooter([MarshalAs(UnmanagedType.Interface)]out object phf);

        //vazba na strukturu
        [PreserveSig]
        int getStructureRegion([MarshalAs(UnmanagedType.Interface)]out IGRegion reg); //new ref

        //skripty
        [PreserveSig]
        int getEnabledScript([MarshalAs(UnmanagedType.Interface)]out IGScript enabledScript);

        //poèítané promìnné
        [PreserveSig]
        int getVariableCount(out int count);
        [PreserveSig]
        int getVariable(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatVariable var);
        [EditorBrowsable(EditorBrowsableState.Never)]
        int __addVariable();//const char* varname,const char* varscript,const char* dtype,IFormatVariable** var);
        [PreserveSig]
        int getParentBorrowed(out IntPtr parent);  //borrowed ref
        [PreserveSig]
        int getChildRegion([MarshalAs(UnmanagedType.Interface)]IGRegion region, [MarshalAs(UnmanagedType.Interface)]out IGFormatRegion child); //new ref
    }

/**********************************************************************************************************/

    [GuidAttribute("83C02000-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGImageLoader
    {
        [PreserveSig]
        int getHandle(out IntPtr dib);
        [PreserveSig]
        int getHandleFromData(out IntPtr dib, string data);
    }
    [GuidAttribute("83C02003-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGImageGenerator //: IGImageLoader
    {
        [PreserveSig]
        int getHandle(out IntPtr dib);
        [PreserveSig]
        int getHandleFromData(out IntPtr dib, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))]string data);
        [PreserveSig]
        int getHandleSize(out IntPtr dib, int x, int y, int nx, int ny);
        [PreserveSig]
        int getHandleFromDataSize(out IntPtr dib, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))]string data, int x, int y, int nx, int ny);
    }
    #endregion
    #region format GRR - styly

    [GuidAttribute("83C01FA4-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatGRRColor
    {
        [PreserveSig]
        int getRGB(out int cr);
        [PreserveSig]
        int isTransparent([MarshalAs(UnmanagedType.Bool)]out bool ct);
        [PreserveSig]
        int getName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string cn);
        [PreserveSig]
        int getIndexInColorTable(out int idx);
    }

    [GuidAttribute("83C01FA5-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatGRRBorder
    {
        [PreserveSig]
        int getColor([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRColor bclr);
        [PreserveSig]
        int getWidth(out int bsize); //v twipech
        [PreserveSig]
        int getStyle(out Grr06BorderStyle bst);
    }

    [GuidAttribute("83C01FA9-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatGRRCellStyle
    {
        //obecné atributy stylu
        [PreserveSig]
        int getStyleAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getStyleAttribute([MarshalAs(UnmanagedType.LPStr)]string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //font
        [PreserveSig]
        int getFontColor([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRColor clr);
        [PreserveSig]
        int getFontFace([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string fface);
        [PreserveSig]
        int getFontFaceIndex(out Grr06FontFace ffidx);
        [PreserveSig]
        int getFontSize(out int fsize);  //ve twipech (od 1.4)
        [PreserveSig]
        int getFontBold(out bool fbold);
        [PreserveSig]
        int getFontItalic(out bool fitalic);
        [PreserveSig]
        int getFontUnderlined(out bool funder);
        [PreserveSig]
        int getFontStrokeOut(out bool fstroked);
        [PreserveSig]
        int getFontCharset(out int fcharset);

        //zarovnání
        [PreserveSig]
        int getHorzAlign(out Grr06HAlign alg);
        [PreserveSig]
        int getVertAlign(out Grr06VAlign alg);

        //rámeèky
        [PreserveSig]
        int getBorderWidths(out Grr06Widths ws);  //ve twipech
        [PreserveSig]
        int getLeftBorder([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRBorder bd);
        [PreserveSig]
        int getTopBorder([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRBorder bd);
        [PreserveSig]
        int getRightBorder([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRBorder bd);
        [PreserveSig]
        int getBottomBorder([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRBorder bd);

        //výpustky
        [PreserveSig]
        int getEllipsisStyle(out Grr06ElStyle els);
        [PreserveSig]
        int getEllipsisChar(out char elc);
        [PreserveSig]
        int getMultiline(out bool multil);

        //spacing/padding
        [PreserveSig]
        int getSpacing(out Grr06Widths spa); //v twipech
        [PreserveSig]
        int getPadding(out Grr06Widths pad); //v twipech

        //pozadí
        [PreserveSig]
        int getBackColor([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRColor clr);

        //orientace textu
        [PreserveSig]
        int getTextOrientation(out int orient); //(0-360)
    }
    //extern const IID IID_IFormatGRRCellStyle13;
    //__interface IFormatGRRCellStyle13 : IFormatGRRCellStyle
    //{
    //    int getInsideBorder(out bool inside);
    //};

    [GuidAttribute("83C01F9B-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatGRRCellStyle14
    {
        [PreserveSig]
        int getBorderWidths(out Grr06WidthsWithMet ws);
        [PreserveSig]
        int getSpacing(out Grr06WidthsWithMet spa);
        [PreserveSig]
        int getPadding(out Grr06WidthsWithMet pad);
        [PreserveSig]
        int getFontSize(out double met, out Grr06Metrics mtr);

        //virtual GRR06API getTextLeading(double* leading)     PURE;

	    //virtual GRR06API getBorderRadius(double* radius)     PURE;
	    //virtual GRR06API getBorderCorners(Grr06BorderCorners* corners) PURE;

	    //virtual GRR06API getParagraphGap(double* met, Grr06Metrics* mtr) PURE;
    }

    #endregion
    #region format GRR - contenty

    [GuidAttribute("83C01F60-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatContent //: IFormatTag
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getStyle([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRCellStyle style);
    }

    [GuidAttribute("83C01F70-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatContainer //: IFormatContent
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getStyle([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRCellStyle style);

        [PreserveSig]
        int getContentCount(out int count);
        [PreserveSig]
        int getContent(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatContent cc);
        [PreserveSig]
        int getContent2(int index, ref Guid IID, [MarshalAs(UnmanagedType.Interface)]out object cc);
    }

    [GuidAttribute("83C01F61-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatContentText //: IFormatContent
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getStyle([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRCellStyle style);

        [PreserveSig]
        int getText([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string txt);
    }

    [GuidAttribute("83C01F62-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatContentValue //: IFormatContent
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getStyle([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRCellStyle style);

        [PreserveSig]
        int getDataName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string nam);  // vrací jméno datové položky tak jak je v .alf (tj. nekdy se jménem oblasti nekdy bez)
        [EditorBrowsable(EditorBrowsableState.Never)]
        int __getDataIndex();//out int index);  // položce je pøiøazen index v rámci øádku pro DataCache
        [EditorBrowsable(EditorBrowsableState.Never)]
        int __getBoundOrder();//out int order);  
    }

    [GuidAttribute("83C01F63-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatContentImage //: IFormatContent
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getStyle([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRCellStyle style);

        [PreserveSig]
        int getImageFile([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string ifile);   // odkaz na soubor s bitmapou
        [PreserveSig]
        int getImageWidth(out double met, out Grr06Metrics mtr);
        [PreserveSig]
        int getImageHeight(out double met, out Grr06Metrics mtr);
    }

    [GuidAttribute("83C01F64-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatContentChart //: IFormatContent
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getStyle([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRCellStyle style);

        [PreserveSig]
        int getChartTitle([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string title);
        [PreserveSig]
        int getChartType(out int type);
        [PreserveSig]
        int getConfig([MarshalAs(UnmanagedType.Interface)]out IGChartLayerConfig config); //new ref (vychozi implementace neni ref.count!)
    };

    [GuidAttribute("83C01F65-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatContentTable //: IFormatContainer
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getStyle([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRCellStyle style);

        [PreserveSig]
        int getContentCount(out int count);
        [PreserveSig]
        int getContent(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatContent cc);
        [PreserveSig]
        int getContent2(int index, ref Guid IID, [MarshalAs(UnmanagedType.Interface)]out object cc);
    }

    [GuidAttribute("83C01F66-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatContentTextbox //: IFormatContainer
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getStyle([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRCellStyle style);

        [PreserveSig]
        int getContentCount(out int count);
        [PreserveSig]
        int getContent(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatContent cc);
        [PreserveSig]
        int getContent2(int index, ref Guid IID, [MarshalAs(UnmanagedType.Interface)]out object cc);
    }

    [GuidAttribute("83c01f68-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatContentBarcode //: IFormatContent
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getStyle([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRCellStyle style);

        [PreserveSig]
        int getBarcodeType(out int type);
    }

    [GuidAttribute("83C01F6D-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatContentPar //: IFormatContainer
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getStyle([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRCellStyle style);

        [PreserveSig]
        int getContentCount(out int count);
        [PreserveSig]
        int getContent(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatContent cc);
        [PreserveSig]
        int getContent2(int index, ref Guid IID, [MarshalAs(UnmanagedType.Interface)]out object cc);

    }

    [GuidAttribute("83C01F6E-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatContentSelect //: IFormatContentPar
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getStyle([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRCellStyle style);

        [PreserveSig]
        int getContentCount(out int count);
        [PreserveSig]
        int getContent(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatContent cc);
        [PreserveSig]
        int getContent2(int index, ref Guid IID, [MarshalAs(UnmanagedType.Interface)]out object cc);

	    void getDataIndex(out int index);  // položce je pøiøazen index v rámci øádku pro DataCache
	    void setOption(string value);
    }

    [GuidAttribute("83C01F69-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatContentDrawing //: IFormatContent
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getStyle([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRCellStyle style);

        [PreserveSig]
        int getShape(out int shape);
    }

    [GuidAttribute("83C01F6C-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatContentMap //: IFormatContent
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getStyle([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRCellStyle style);

    }


    [GuidAttribute("83c01f6B-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatContentGridLine //: IFormatContainer
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getStyle([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRCellStyle style);

        [PreserveSig]
        int getContentCount(out int count);
        [PreserveSig]
        int getContent(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatContent cc);
        [PreserveSig]
        int getContent2(int index, ref Guid IID, [MarshalAs(UnmanagedType.Interface)]out object cc);

        [PreserveSig]
	    int getParentGrid(out IGFormatContentGrid grid);
    }
    [GuidAttribute("83c01f6A-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatContentGrid //: IFormatContent
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getStyle([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRCellStyle style);

        [PreserveSig]
        int getHeader([MarshalAs(UnmanagedType.Interface)]out IGFormatContentGridLine header);
        [PreserveSig]
        int computeValue(IGDataCacheFillerRow data, IGDataParser dr, IGFormatGridFillCallback c);
        [PreserveSig]
        int getAltStyle([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRCellStyle style);
    }
    [GuidAttribute("83c02060-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatGridFillCallback
    {
        [PreserveSig]
        int fillRow(IGDataParser dr, IGFormatTag t, IGDataCacheFillerRow2 r);
    };
    [GuidAttribute("83c02061-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatGridFillCallback2 // : IGFormatGridFillCallback
    {
        [PreserveSig]
        int fillRow(IGDataParser dr, IGFormatTag t, IGDataCacheFillerRow2 r);
        [PreserveSig]
        int endregion(IGDataParser dr, IGFormatRegion r);
    };

    #endregion
    #region format GRR
    [GuidAttribute("83C01FA3-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatGRRCell //: IFormatContainer
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getStyle([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRCellStyle style);

        [PreserveSig]
        int getContentCount(out int count);
        [PreserveSig]
        int getContent(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatContent cc);
        [PreserveSig]
        int getContent2(int index, ref Guid IID, [MarshalAs(UnmanagedType.Interface)]out object cc);

        //základní informace buòky
        [PreserveSig]
        int getWidth(out double met, out Grr06Metrics mtr);
        [PreserveSig]
        int getHeight(out double met, out Grr06Metrics mtr);
    }

    //extern const IID IID_IFormatGRRCell2;
    //__interface IFormatGRRCell2 : IUnknown
    //{
    //    int clone(IFormatGRRCell** clon) ;
    //    int isSameAs(IFormatContent* with) ;  //S_OK pokud má shodný styl s with
    //    int isModified() ;                    //S_OK pokud byl styl zmìnìn (od poslední acceptchanges)
    //    int revertChanges() ;                 //vrátí všechny zmìny ve stylu na výchozí hodnoty
    //};

    [GuidAttribute("83C01FA2-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatGRRLine //: IFormatContainer
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getStyle([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRCellStyle style);

        [PreserveSig]
        int getContentCount(out int count);
        [PreserveSig]
        int getContent(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatContent cc);
        [PreserveSig]
        int getContent2(int index, ref Guid IID, [MarshalAs(UnmanagedType.Interface)]out object cc);

        //buòky
        [PreserveSig]
        int getCellCount(out int count);
        [PreserveSig]
        int getCell(int index, ref Guid IID, [MarshalAs(UnmanagedType.Interface)]out object cell);

        //stránkování
        [PreserveSig]
        int getPagingEvent(out Grr06PagingEvent evt);
    };

    [GuidAttribute("83C01F50-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatGRRColorTable //: IUnknown
    {
        [PreserveSig]
        int getColorCount(out int count);
        [PreserveSig]
        int getColor(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatGRRColor clr);
        [PreserveSig]
        int addColor(out int index, [MarshalAs(UnmanagedType.Interface)]IGFormatGRRColor clr);
    }

    [GuidAttribute("83C01F51-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatGRRFontTable //: IUnknown
    {
        [PreserveSig]
        int getFontCount(out int count);
        [PreserveSig]
        int getFont(int index, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string fname);
        [PreserveSig]
        int addFont(out int index, [MarshalAs(UnmanagedType.LPStr)] string fname);
        [PreserveSig]
        int findIndex(out int index, [MarshalAs(UnmanagedType.LPStr)] string fname);
    }

    [GuidAttribute("83C01F52-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatGRRStyleTable //: IUnknown
    {
        [PreserveSig]
        int getStyleCount(out int count);
        [PreserveSig]
        int getStyle(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatGRRCellStyle s);
    }

    [GuidAttribute("83C01FAF-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatGRR //: public IFormat
    {
        //verze specifikace
        [PreserveSig]
        int getVersion(out int major, out int minor);
        [PreserveSig]
        int getFormattingGroup([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string type);  //vraci "grr"/"msw"/"mse" (uppercase)
        [PreserveSig]
        int getStructureVersion([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string ident, out int major, out int minor);

        //všechny oblasti organizované v stromové hierarchii
        [PreserveSig]
        int getRoot([MarshalAs(UnmanagedType.Interface)]out object root); //newref, imaginární oblast, v níž jsou skuteèné oblasti

        //info
        [PreserveSig]
        int getAllInfo([MarshalAs(UnmanagedType.Interface)]out IGInfoList info);
        [PreserveSig]
        int getInfo([MarshalAs(UnmanagedType.LPStr)]string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //paper-setting
        [PreserveSig]
        int getPaperSize(out int width, out int height);
        [PreserveSig]
        int getPaperMargins(out Grr06Widths margins);

        //editor-setting
        [PreserveSig]
        int getEditorSetting([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);

        [EditorBrowsable(EditorBrowsableState.Never)]
        int __beforeData();
        [EditorBrowsable(EditorBrowsableState.Never)]
        int __afterData();
        [EditorBrowsable(EditorBrowsableState.Never)]
        int __getScriptEngine(); //IScriptEngine** engine);	//borrow ref

        [PreserveSig]
        int xxloadImage([MarshalAs(UnmanagedType.LPStr)] string fname, out IntPtr res);

        [PreserveSig]
        int getColorTable([MarshalAs(UnmanagedType.Interface)] out IGFormatGRRColorTable ctl);
        [PreserveSig]
        int getCustomFontTable([MarshalAs(UnmanagedType.Interface)] out IGFormatGRRFontTable ftl);
        [PreserveSig]
        int getStyleTable([MarshalAs(UnmanagedType.Interface)] out IGFormatGRRStyleTable stl);
        [PreserveSig]
        int xxloadImageFromString([MarshalAs(UnmanagedType.LPStr)] string str, out IntPtr res);

        [PreserveSig]
        int registerImage([MarshalAs(UnmanagedType.LPStr)] string key, IntPtr dib);
        [PreserveSig]
        int unregisterImage([MarshalAs(UnmanagedType.LPStr)] string key);
        [PreserveSig]
        int isRegistered([MarshalAs(UnmanagedType.LPStr)] string key, out IntPtr result);
    };
    #endregion
    #region format GRF
    /**********************************************************************************************************/

    [GuidAttribute("83C01FE8-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatGrfBlock //: IFormatContainer
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getStyle([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRCellStyle style);

        [PreserveSig]
        int getContentCount(out int count);
        [PreserveSig]
        int getContent(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatContent cc);
        [PreserveSig]
        int getContent2(int index, ref Guid IID, [MarshalAs(UnmanagedType.Interface)]out object cc);
    }

    [GuidAttribute("83C01FE9-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatGrfContainer //: IFormatContainer
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getStyle([MarshalAs(UnmanagedType.Interface)]out IGFormatGRRCellStyle style);

        [PreserveSig]
        int getContentCount(out int count);
        [PreserveSig]
        int getContent(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatContent cc);
        [PreserveSig]
        int getContent2(int index, ref Guid IID, [MarshalAs(UnmanagedType.Interface)]out object cc);
        //GRR06API getRect(IFormatGRF* fmt, IFormatTag* t, GrrRect* rect, int* page1, int* page2);
        //   GRR06API getRowIndex(IFormatGRF* fmt, IFormatTag* t, int* result);
        //   GRR06API checkRowIndex(IFormatGRF* fmt, IFormatTag* t, int value);
    }

    [GuidAttribute("83C01FAE-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatGRF //: IFormat
    {
        //verze specifikace
        [PreserveSig]
        int getVersion(out int major, out int minor);
        [PreserveSig]
        int getFormattingGroup([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string type);  //vraci "grr"/"msw"/"mse" (uppercase)
        [PreserveSig]
        int getStructureVersion([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string ident, out int major, out int minor);

        //všechny oblasti organizované v stromové hierarchii
        [PreserveSig]
        int getRoot([MarshalAs(UnmanagedType.Interface)]out object root); //newref, imaginární oblast, v níž jsou skuteèné oblasti

        //info
        [PreserveSig]
        int getAllInfo([MarshalAs(UnmanagedType.Interface)]out IGInfoList info);
        [PreserveSig]
        int getInfo([MarshalAs(UnmanagedType.LPStr)]string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //paper-setting
        [PreserveSig]
        int getPaperSize(out int width, out int height);
        [PreserveSig]
        int getPaperMargins(out Grr06Widths margins);

        //editor-setting
        [PreserveSig]
        int getEditorSetting([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);

        [EditorBrowsable(EditorBrowsableState.Never)]
        int __beforeData();
        [EditorBrowsable(EditorBrowsableState.Never)]
        int __afterData();
        [EditorBrowsable(EditorBrowsableState.Never)]
        int __getScriptEngine(); //IScriptEngine** engine);	//borrow ref

        [PreserveSig]
        int xxloadImage([MarshalAs(UnmanagedType.LPStr)] string fname, out IntPtr res);

        [PreserveSig]
        int getColorTable([MarshalAs(UnmanagedType.Interface)] out IGFormatGRRColorTable ctl);
        [PreserveSig]
        int getCustomFontTable([MarshalAs(UnmanagedType.Interface)] out IGFormatGRRFontTable ftl);
        [PreserveSig]
        int getStyleTable([MarshalAs(UnmanagedType.Interface)] out IGFormatGRRStyleTable stl);
        [PreserveSig]
        int xxloadImageFromString([MarshalAs(UnmanagedType.LPStr)] string str, out IntPtr res);

        [PreserveSig]
        int registerImage([MarshalAs(UnmanagedType.LPStr)] string key, IntPtr dib);
        [PreserveSig]
        int unregisterImage([MarshalAs(UnmanagedType.LPStr)] string key);
        [PreserveSig]
        int isRegistered([MarshalAs(UnmanagedType.LPStr)] string key, out IntPtr result);


        [PreserveSig]
        int getRect([MarshalAs(UnmanagedType.Interface)] IGFormatTag t, out GrrRect result, out int page1, out int page2);
        [PreserveSig]
        int getRowIndex([MarshalAs(UnmanagedType.Interface)] IGFormatTag t, out int result);
        [PreserveSig]
        int getPageCount(out int pcount);
        [PreserveSig]
        int getRect2([MarshalAs(UnmanagedType.Interface)] IGFormatTag t, out Grr06WidthsWithMet result, out int page1, out int page2);
    }

    #endregion
    #region format RTF
    /**********************************************************************************************************/

    public enum Grr06RTFInstance { FormText = 0, MacroButton = 1 };
    public enum Grr06RTFSectAfter { None = 0, True = 1, False = 2 };

    [GuidAttribute("83C01FE3-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatRTFItem //: IFormatTag
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getInstance(out Grr06RTFInstance instance);
        [PreserveSig]
        int getType([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string type);
        [PreserveSig]
        int getRTFFormat([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string format);
    }

    [GuidAttribute("83C01FE4-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatRTFRTF //: IFormatTag
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getRTF([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string rtf);
    }

    [GuidAttribute("83C01FE5-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatRTFRow //: IFormatTag
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getSectAfter(out Grr06RTFSectAfter sect);
    }

    [GuidAttribute("83C01FE6-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatRTF //: IFormat
    {
        //verze specifikace
        [PreserveSig]
        int getVersion(out int major, out int minor);
        [PreserveSig]
        int getFormattingGroup([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string type);  //vraci "grr"/"msw"/"mse" (uppercase)
        [PreserveSig]
        int getStructureVersion([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string ident, out int major, out int minor);

        //všechny oblasti organizované v stromové hierarchii
        [PreserveSig]
        int getRoot([MarshalAs(UnmanagedType.Interface)]out object root); //newref, imaginární oblast, v níž jsou skuteèné oblasti

        //info
        [PreserveSig]
        int getAllInfo([MarshalAs(UnmanagedType.Interface)]out IGInfoList info);
        [PreserveSig]
        int getInfo([MarshalAs(UnmanagedType.LPStr)]string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //paper-setting
        [PreserveSig]
        int getPaperSize(out int width, out int height);
        [PreserveSig]
        int getPaperMargins(out Grr06Widths margins);

        //editor-setting
        [PreserveSig]
        int getEditorSetting([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);

        [EditorBrowsable(EditorBrowsableState.Never)]
        int __beforeData();
        [EditorBrowsable(EditorBrowsableState.Never)]
        int __afterData();
        [EditorBrowsable(EditorBrowsableState.Never)]
        int __getScriptEngine(); //IScriptEngine** engine);	//borrow ref

        [PreserveSig]
        int getTemplate([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string templname);
    }

    #endregion
    #region format MSE
    /**********************************************************************************************************/

    [GuidAttribute("83C01FE2-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatMSEMSWItem //: IFormatTag
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref
    }

    [GuidAttribute("83C01FE1-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatMSEMSWCopy //: IFormatTag
    {
        //obecné atributy
        [PreserveSig]
        int getTagName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //vnoøené znaèky
        [PreserveSig]
        int getChildCount(out int count); //vrací E_NOTIMPL nemùže-li mít dìti
        [PreserveSig]
        int getChild(int index, [MarshalAs(UnmanagedType.Interface)]out IGFormatTag tag); //vrací E_NOTIMPL nemùže-li mít dìti

        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);  //new ref
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat fmt);        //new ref

        [PreserveSig]
        int getFromTo(out int from, out int to);
        [PreserveSig]
        int usingIndexes();
    }

    [GuidAttribute("83C01FE0-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGFormatMSEMSW //: IFormat
    {
        //verze specifikace
        [PreserveSig]
        int getVersion(out int major, out int minor);
        [PreserveSig]
        int getFormattingGroup([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string type);  //vraci "grr"/"msw"/"mse" (uppercase)
        [PreserveSig]
        int getStructureVersion([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string ident, out int major, out int minor);

        //všechny oblasti organizované v stromové hierarchii
        [PreserveSig]
        int getRoot([MarshalAs(UnmanagedType.Interface)]out object root); //newref, imaginární oblast, v níž jsou skuteèné oblasti

        //info
        [PreserveSig]
        int getAllInfo([MarshalAs(UnmanagedType.Interface)]out IGInfoList info);
        [PreserveSig]
        int getInfo([MarshalAs(UnmanagedType.LPStr)]string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);

        //paper-setting
        [PreserveSig]
        int getPaperSize(out int width, out int height);
        [PreserveSig]
        int getPaperMargins(out Grr06Widths margins);

        //editor-setting
        [PreserveSig]
        int getEditorSetting([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);

        [EditorBrowsable(EditorBrowsableState.Never)]
        int __beforeData();
        [EditorBrowsable(EditorBrowsableState.Never)]
        int __afterData();
        [EditorBrowsable(EditorBrowsableState.Never)]
        int __getScriptEngine(); //IScriptEngine** engine);	//borrow ref

        [PreserveSig]
        int getTemplate([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string templname);
    }

    #endregion
    #region Data

    /// <exclude/>
    [GuidAttribute("83C01F84-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGDataVector //: IUnknown
    {
        [PreserveSig]
        int getByOrder(int order, out IDataData data);
    }
    /// <exclude/>
    [GuidAttribute("83C01F86-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGDataVector2 //: IGDataVector
    {
        [PreserveSig]
        int getByOrder(int order, out IDataData data);
        [PreserveSig]
        int setString(int order, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))]string str);
        [PreserveSig]
        int setDecimal1(int order, [MarshalAs(UnmanagedType.LPStr)]string dec);
        [PreserveSig]
        int setDecimal2(int order, IDecimal dec);
        [PreserveSig]
        int setDatetime1(int order, [MarshalAs(UnmanagedType.LPStr)]string time);
        [PreserveSig]
        int setDatetime2(int order, IDatetime time);
    }
    /// <exclude/>
    [GuidAttribute("83C01F83-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGDataRow //: IUnknown
    {
        [PreserveSig]
        int getDataCount(out int cnt);
        [PreserveSig]
        int getName(int index, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string aname);
        [PreserveSig]
        int getDataType(int index, out Grr06DataType atype);

        [PreserveSig]
        int getDataByName([MarshalAs(UnmanagedType.LPStr)]string name, out IDataData adata);
        [PreserveSig]
        int getData(int index, out IDataData adata);
        [PreserveSig]
        int setData(int index, IDataData data);
        [PreserveSig]
        int setString(int index, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))]string str);
        [PreserveSig]
        int setDecimal1(int index, [MarshalAs(UnmanagedType.LPStr)]string dec);
        [PreserveSig]
        int setDecimal2(int index, IDecimal dec);
        [PreserveSig]
        int setDatetime1(int index, [MarshalAs(UnmanagedType.LPStr)]string time);
        [PreserveSig]
        int setDatetime2(int index, IDatetime time);
    }

    /// <exclude/>
    [GuidAttribute("83C01F80-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGDataParser //: IUnknown
    {
        [PreserveSig]
        int open([MarshalAs(UnmanagedType.LPStr)]string fname, IGAttrList alist); //alist could be null!
        [PreserveSig]
        int close();
        [PreserveSig]
        int getStructureVersion([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string ident, out int major, out int minor);
        [PreserveSig]
        int openDataRegion(IGRegion reg);
        [PreserveSig]
        int closeDataRegion();
        [PreserveSig]
        int getValues(IGDataRow row);  //naplni row pomoci setValue()
        [PreserveSig]
        int getOpenedRegion(out IntPtr reg); //borrowed
        [PreserveSig]
        int CheckValidEOF();
        [PreserveSig]
        int getRootData([MarshalAs(UnmanagedType.LPStr)]string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);
        [PreserveSig]
        int getRootDatas(out IGAttrList list);
    }

    /// <exclude/>
    [GuidAttribute("83C01F85-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGDataParser2 //: IUnknown
    {
        [PreserveSig]
        int getAllValues(IGDataVector2 vec);
    }
    /// <exclude/>
    [GuidAttribute("83C01F81-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGDataParserSeekable //: IGDataParser
    {
        [PreserveSig]
        int open([MarshalAs(UnmanagedType.LPStr)]string fname, IGAttrList alist); //alist could be null!
        [PreserveSig]
        int close();
        [PreserveSig]
        int getStructureVersion([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string ident, out int major, out int minor);
        [PreserveSig]
        int openDataRegion(IGRegion reg);
        [PreserveSig]
        int closeDataRegion();
        [PreserveSig]
        int getValues(IGDataRow row);  //naplni row pomoci setValue()
        [PreserveSig]
        int getOpenedRegion(out IntPtr reg); //borrowed
        [PreserveSig]
        int CheckValidEOF();
        [PreserveSig]
        int getRootData([MarshalAs(UnmanagedType.LPStr)]string name, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);
        [PreserveSig]
        int getRootDatas(out IGAttrList list);

        [PreserveSig]
        int getPosition(out int pos);
        [PreserveSig]
        int getEndPosition(out int pos);
        [PreserveSig]
        int setPosition(int pos);
    }

    [GuidAttribute("83C01FB1-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGDataReader //: IUnknown
    {
        [PreserveSig]
        int getVersion(out int count);
        [PreserveSig]
        int getData(int index, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string data);//vrátí data podle indexu   
    }

    [GuidAttribute("83C01FB6-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGDataReader2 //: IUnknown
    {
        [PreserveSig]
        int getDataType(int index, out Grr06DataType dtype); //vrátí datový typ podle indexu   
    }

    [GuidAttribute("83C01FB5-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGDataStore //: IDataReader
    {
        [PreserveSig]
        int getVersion(out int count);
        [PreserveSig]
        int getData(int index, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string data);//vrátí data podle indexu   
    }

    //[GuidAttribute("83C01FC2-C16D-11D5-A873-00047697077E")]
    //[InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    //[System.Security.SecurityCritical]
    //public interface IGSFBindable //: IUnknown
    //{
    //    int bindToItem(IDataItem* di) ;  //volano pri porovnani k zarazeni vazby na strukturu
    //    int bindToRegion(IRegion* di) ;  //volano pri porovnani k zarazeni vazby na strukturu
    //    int getBindedItem(IDataItem** item);
    //    int getBindedRegion(IRegion** item);
    //}

    [GuidAttribute("83C01FB4-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGDataFetcher //: IDataReader
    {
        [PreserveSig]
        int getVersion(out int count);
        [PreserveSig]
        int getData(int index, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string data);//vrátí data podle indexu   

        [PreserveSig]
        int next();  //vraci S_OK, jsou-li data, S_FALSE jinak
        [PreserveSig]
        int getRow(ref Guid IID, [MarshalAs(UnmanagedType.Interface)]out object row);//øádka z ALF (vazba data/formát)

        //pozice
        [PreserveSig]
        int getPosition(out Grr06Pos p); //vrátí aktuální pozici pro pozdìjší návrat (pred prectenym radkem)
        [PreserveSig]
        int seekTo(Grr06Pos p); //pøejde na pøedem zjištìnou pozici

        //stálá data
        [PreserveSig]
        int createDataStore([MarshalAs(UnmanagedType.Interface)]out IGDataStore ds); //uschová data (dostupná i po next)
    }

    [GuidAttribute("83C01FB3-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGDataCache //: IUnknown
    {
        [PreserveSig]
        int getFormat([MarshalAs(UnmanagedType.Interface)]out IGFormat frm); //celé ALF
        [PreserveSig]
        int getNewFetcher([MarshalAs(UnmanagedType.Interface)]out IGDataFetcher df);
    }

    [GuidAttribute("83C01FC1-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGDataCacheItem //: IUnknown
    {
        [PreserveSig]
        int getDataName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string nam);  // vrací jméno datové položky tak jak je v .alf (tj. nekdy se jménem oblasti nekdy bez)
        [PreserveSig]
        int getDataIndex(out int index);  // položce je pøiøazen index v rámci øádku pro DataCache
    };

    //[GuidAttribute("83C01F84-C16D-11D5-A873-00047697077E")]
    //[InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    //[System.Security.SecurityCritical]
    //public interface IGDataVector //: IUnknown
    //{
    //    int getByOrder(int order,[MarshalAs(UnmanagedType.Interface)]out IGDataData data);
    //};

    [GuidAttribute("83C01FC6-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGDataCacheFillerRow //: IDataVector
    {
        [PreserveSig]
        int getByOrder(int order, [MarshalAs(UnmanagedType.Interface)]out IDataData data);
        [PreserveSig]
        int getValue(IGDataCacheItem dci, IGDataParser dr, [MarshalAs(UnmanagedType.Interface)]out IDataData value);
        [PreserveSig]
        int __getRowBorrowed(out IGDataRow row);
        [PreserveSig]
        int go_down(IGRegion sr, [MarshalAs(UnmanagedType.Interface)] out IGDataCacheFillerRow down);
        [PreserveSig]
        int go_up([MarshalAs(UnmanagedType.Interface)] out IGDataCacheFillerRow up);
        [PreserveSig]
        int getLastOrder(out int lorder);
    }
    [GuidAttribute("83C01FC7-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGDataCacheFillerRow2 //: IUnknown
    {
        [PreserveSig]
        int getValue(IGDataCacheItem dci, IGDataParser dr, [MarshalAs(UnmanagedType.Interface)]out IDataData value);
        [PreserveSig]
        int getRow(out IGDataRow row); //new ref
        [PreserveSig]
        int getParent(IGDataCacheFillerRow2 parent); // new ref
        [PreserveSig]
        int getRegion(out IGFormatRegion region); //new ref
    }

    [GuidAttribute("83C01FC3-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGDataCacheItem2 //: IDataCacheItem
    {
        [PreserveSig]
        int getDataName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string nam);  // vrací jméno datové položky tak jak je v .alf (tj. nekdy se jménem oblasti nekdy bez)
        [PreserveSig]
        int getDataIndex(out int index);  // položce je pøiøazen index v rámci øádku pro DataCache
        [PreserveSig]
        int getDataScript(out IGScript script); //vrati-li S_OK musi implementovat IScriptable
        [PreserveSig]
        int setValue(IDataData value);
        [PreserveSig]
        int getValue(out IDataData value);
        [PreserveSig]
        int getEnterScript(out IGScript script); //vrati-li S_OK musi implementovat IScriptable
        [PreserveSig]
        int formatValue();
        [PreserveSig]
        int getPrintScript(out IGScript script); //vrati-li S_OK musi implementovat IScriptable
        [PreserveSig]
        int getValueType(out Grr06DataType dtype);
    }

    [GuidAttribute("83C01FC5-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGDataCacheItem3 //: IDataCacheItem2
    {
        [PreserveSig]
        int getDataName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string nam);  // vrací jméno datové položky tak jak je v .alf (tj. nekdy se jménem oblasti nekdy bez)
        [PreserveSig]
        int getDataIndex(out int index);  // položce je pøiøazen index v rámci øádku pro DataCache
        [PreserveSig]
        int getDataScript(out IGScript script); //vrati-li S_OK musi implementovat IScriptable
        [PreserveSig]
        int setValue(IDataData value);
        [PreserveSig]
        int getValue(out IDataData value);
        [PreserveSig]
        int getEnterScript(out IGScript script); //vrati-li S_OK musi implementovat IScriptable
        [PreserveSig]
        int formatValue();
        [PreserveSig]
        int getPrintScript(out IGScript script); //vrati-li S_OK musi implementovat IScriptable
        [PreserveSig]
        int getValueType(out Grr06DataType dtype);

        [PreserveSig]
        int computeValue(IGDataCacheFillerRow data, IGDataParser dr, out IDataData value);
    };

    [GuidAttribute("83C01FC0-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGDataCacheRow //: IUnknown
    {
        [PreserveSig]
        int getPagingEvent(out Grr06PagingEvent ev);  //priznak zda se ma polozka ukladat do strankoveho stromu hlavicek/paticek
        [PreserveSig]
        int getRegion([MarshalAs(UnmanagedType.Interface)]out IGFormatRegion reg);

        [PreserveSig]
        int getDataCount(out int count);
        [PreserveSig]
        int getDataItem(int index, [MarshalAs(UnmanagedType.Interface)]out IGDataCacheItem item);
    };

    //[GuidAttribute("?-C16D-11D5-A873-00047697077E")]
    //[InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    //[System.Security.SecurityCritical]
    //public interface IGDataCacheRow2 //: IDataCacheRow
    //{
    //    GRR06API isModified();         //S_OK pokud byl styl zmìnìn (od poslední acceptchanges)
    //    GRR06API clone(IDataCacheRow2** clon);
    //    GRR06API getEnabledScript(IScript** enabledScript);
    //    GRR06API getDataScript(IScript** script); //vrati-li S_OK musi implementovat IScriptable
    //    GRR06API getClonesCount(int* count);
    //    GRR06API getClone(int i,IDataCacheRow2** clon);
    //    GRR06API revertChanges();      //vrátí všechny zmìny ve stylu na výchozí hodnoty
    //    GRR06API getOriginal(IDataCacheRow2** orig); //vraci original pro klonovane radky
    //};


    #endregion
    #region Chart
    [GuidAttribute("83C02052-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGChartSet //: IUnknown
    {
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)]string name, string defaultValue, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);
    }
    [GuidAttribute("83C02051-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGChartLayer //: IUnknown
    {
        [PreserveSig]
        int getType(out int type);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)]string name, string defaultValue, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);
        [PreserveSig]
        int getSetCount(out int cnt);
        [PreserveSig]
        int getSet(int index, [MarshalAs(UnmanagedType.Interface)]out IGChartSet value);
    }
    [GuidAttribute("83C02050-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IGChartLayerConfig //: IUnknown
    {
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)]string name, string defaultValue, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);
        [PreserveSig]
        int getLayerCount(out int cnt);
        [PreserveSig]
        int getLayer(int index, [MarshalAs(UnmanagedType.Interface)]out IGChartLayer value);
        [PreserveSig]
        int setAttribute([MarshalAs(UnmanagedType.LPStr)]string name, [MarshalAs(UnmanagedType.LPStr)]string value);
    }
    #endregion
}
