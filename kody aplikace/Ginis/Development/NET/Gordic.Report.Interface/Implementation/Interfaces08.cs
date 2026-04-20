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

#pragma warning disable 1591

namespace Gordic.Report.Implementation
{
    /// <exclude/>
    [StructLayout(LayoutKind.Sequential)]
    //__declspec(align(16))
    public struct GrrSize
    {
        /// <exclude/>
        public double width;
        /// <exclude/>
        public double height;
    };

    /// <exclude/>
    [StructLayout(LayoutKind.Sequential)]
    //__declspec(align(16))
    public struct GrrRect
    {
        /// <exclude/>
        public double left;
        /// <exclude/>
        public double top;
        /// <exclude/>
        public double right;
        /// <exclude/>
        public double bottom;
    };

    /// <exclude/>
    [GuidAttribute("83C02098-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IPagingEvents
    {
        [PreserveSig]
        int onBeginProcessing();
        [PreserveSig]
        int onEndProcessing(int result);
        [PreserveSig]
        int onPageComplete(int pageno);
    }

    /// <exclude/>
    [GuidAttribute("83C02092-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IPageInformation
    {
        [PreserveSig]
        int getPaperSize(out GrrSize psize);  //cely rozmer papiru
        [PreserveSig]
        int getPageBounds(out GrrRect pbounds); //stranka posunuta o okraje
    };

    /// <exclude/>
    [GuidAttribute("83C02093-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IMetrics
    {
        [PreserveSig]
        int computeTextSize([MarshalAs(UnmanagedType.LPStr)]string text, [MarshalAs(UnmanagedType.Interface)] IGFormatGRRCellStyle style, out double aw, out double ah);
        [PreserveSig]
        int getCalcHandle(out IntPtr rdc);
    };

    /// <exclude/>
    [GuidAttribute("83C02090-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IPageCache
    {
        [PreserveSig]
        int getPageCount(out int cnt);
        [PreserveSig]
        int getPage(int index, [MarshalAs(UnmanagedType.Interface)]out IPage di);
    };

    /// <exclude/>
    [GuidAttribute("83C02091-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IPage
    {
        [PreserveSig]
        int getPageNumber(out int num);

        [PreserveSig]
        int getContainerCount(out int cnt);
        [PreserveSig]
        int getContainer(int index, out GrrRect bounds, [MarshalAs(UnmanagedType.Interface)]out IPageContainer cell);

        [PreserveSig]
        int getPageHeight(out double height);
        [PreserveSig]
        int getPageEndFooterHeight(out double height);
        // virtual GRR08API getPageHeightWithoutHF(int* height) PURE;
        // virtual GRR08API dependsOn(int rowindex,int datindex,Grr08Depend* depend) PURE;
        // virtual GRR08API getRowData(int rowindex,IDataStore** dstore)   PURE;
    };

    /// <exclude/>
    [GuidAttribute("83C0209A-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IPageContainer
    {
        //obecné atributy
        [PreserveSig]
        int getTagName(out IntPtr name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, out IntPtr value);

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
        int getContent(int index, out object cc); //[MarshalAs(UnmanagedType.Interface)]out IGFormatContent cc);
        [PreserveSig]
        int getContent2(int index, ref Guid IID, out object cc); //[MarshalAs(UnmanagedType.Interface)]out object cc);

        [PreserveSig]
        int getContent(int index, out GrrRect bounds, [MarshalAs(UnmanagedType.Interface)]out object cc);
        [PreserveSig]
        int getContent2(int index, out GrrRect bounds, [MarshalAs(UnmanagedType.Interface)]out object cc, [MarshalAs(UnmanagedType.Interface)]out IPageRenderingInfo info);
    };

    /// <exclude/>
    [GuidAttribute("83C02099-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IPageContent
    {
        //obecné atributy
        [PreserveSig]
        int getTagName(out IntPtr name);
        [PreserveSig]
        int getAttributes([MarshalAs(UnmanagedType.Interface)]out IGAttrList atrs);
        [PreserveSig]
        int getAttribute([MarshalAs(UnmanagedType.LPStr)] string name, out IntPtr value);

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
    };

    /// <exclude/>
    [GuidAttribute("83C02095-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IPageRenderingInfo
    {
    };

    /// <exclude/>
    [GuidAttribute("83C0209E-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IPageTextRenderInfo //: public IPageRenderingInfo
    {
        [PreserveSig]
	    int getTextWWInfoLineCount(out int count);
        [PreserveSig]
	    int getTextWWInfoLine(int index,out double x,out double y,out IntPtr text,out int bindex,out int eindex);
        [EditorBrowsable(EditorBrowsableState.Never)]
        int __getInternal(); //void** buf);
    };

    /// <exclude/>
    [GuidAttribute("83C0209B-C16D-11D5-A873-00047697077E")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IPageContentText
    {
        [PreserveSig]
        int getText(out IntPtr text);
    };


}
