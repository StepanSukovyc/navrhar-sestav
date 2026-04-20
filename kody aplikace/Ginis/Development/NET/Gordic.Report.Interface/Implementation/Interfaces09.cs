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

    using LBOOL = System.Int32;
    public enum TICCProfileType
    {
        ictGray,
        ictRGB,
        ictCMYK,
        ictLab
    }

    public struct TPDFImage
    {
        public IntPtr Buffer;           // Each scanline is aligned to a full byte.
        public UInt32 BufSize;          // The size of the image buffer in bytes.
        internal int Filter;           // Required decode filter if the image is compressed.
                                        // Possible values are dfDCTDecode (JPEG), dfJPXDecode (JPEG2000),
                                        // and dfJBIG2Decode. Other filters are already removed by DynaPDF since
                                        // a conversion to a native file format is then always required.
        public int OrgFilter;        // The image was compressed with this filter in the PDF file. This info is
                                        // useful to determine which compression filter should be used when creating
                                        // a new image file from the image buffer.
        internal IntPtr JBIG2Globals;     // Optional global page 0 segment (dfJBIG2Decode filter only).
        internal UInt32 JBIG2GlobalsSize; // The size of the bit stream in bytes.
        public UInt32 BitsPerPixel;     // Bit depth of the image buffer. Possible values are 1, 2, 4, 8, 24, 32, and 64.
        internal int ColorSpace;       // The color space refers either to the image buffer or to the color table if set.
                              // Note that 1 bit images can occur with and without a color table.
        internal UInt32 NumComponents;    // The number of components stored in the image buffer.
        internal UInt32 MinIsWhite;       // If true, the colors of 1 bit images are reversed.
        internal IntPtr IColorSpaceObj;   // Pointer to the original color space.
        internal IntPtr ColorTable;       // The color table or NULL.
        internal UInt32 ColorCount;       // The number of colors in the color table.
        public UInt32 Width;            // Image width in pixel.
        public UInt32 Height;           // Image height in pixel.
        public UInt32 ScanLineLength;   // The length of a scanline in bytes.
        internal UInt32 InlineImage;      // If true, the image is an inline image.
        internal UInt32 Interpolate;      // If true, image interpolation should be performed.
        internal UInt32 Transparent;      // The meaning is different depending on the bit depth and whether a color
                                // table is available. If the image is a 1 bit image and if no color table is available,
                                // black pixels must be drawn with the current fill color.
                                // If the image contains a color table, ColorMask contains the range of indexes
                                // in the form min/max index which should appear transparent. If no color table is
                                // present ColorMask contains the transparent ranges in the form min/max for
                                // every color component.
        internal IntPtr ColorMask;        // The array contains ranges in the form min/max (2 values per component) for each
                                // component before decoding.
        internal IntPtr IMaskImage;       // If set, a 1 bit image is used as a transparency mask. Call GetImageObjEx() to decode the image.
        internal IntPtr ISoftMask;        // If set, a grayscale image is used as alpha channel. Call GetImageObjEx() to decode the image.
        internal IntPtr Decode;           // If set, samples must be decoded. The array contains 2 * NumComponents values.
                                          // The decode array is never set if the image is returned decompressed since
                                          // it is already applied during decompression.
        internal int Intent;           // Default riNone.
        internal UInt32 SMaskInData;      // JPXDecode only, PDF_MAX_INT if not set. See PDF Reference for further information.
        internal IntPtr OC;               // Pointer of an OCG or OCMD if set. -> See GetOCHandle()
        internal IntPtr Metadata;         // Optional XML Metadata stream.
        internal UInt32 MetadataSize;     // Length of Metadata in bytes.
        internal IntPtr ObjectPtr;        // Internal pointer to the image class.
        internal float ResolutionX;      // Image resolution on the x-axis.
        internal float ResolutionY;      // Image resolution on the y-axis.
        //IMSR* Measure;          // Optional measure dictionary -> GetMeasureObj().
        //IPTD* PtData;           // Pointer of a Point Data dictionary. The value can be accessed with GetPtDataObj().
        // /*
        //   The parallelogram into which the image is drawn.
        //   p1--p2
        //   |   |
        //   p4--p3
        // */
        //float DestX1;           // 0
        //float DestY1;           // 0
        //float DestX2;           // 1
        //float DestY2;           // 0
        //float DestX3;           // 1
        //float DestY3;           // 1
        //float DestX4;           // 0
        //float DestY4;           // 1
        //float DestWidth;        // Destination width (can be negative).
        //float DestHeight;       // Destination height (can be negative).
        //UI32 FillColor;        // The current fill color. An image mask is drawn with the current fill color.
        //TPDFColorSpace FillColorSpace;   // The color space in which FillColor is defined.
        //                                 // Reserved fields for future extensions
        //UI32 Reserved1;
        //UI32 Reserved2;
        //UI32 Reserved3;
        //UI32 Reserved4;
    };

    public delegate int TErrorProc(IntPtr Data, int ErrCode, IntPtr ErrMessage, int ErrType);
    public delegate int TOnFontNotFoundProc(IntPtr Data, IntPtr PDFFont, IntPtr FontName, int Style, int StdFontIndex, LBOOL IsSymbolFont);
    public delegate int TOnReplaceICCProfile(IntPtr Data, TICCProfileType Type, int ColorSpace);
    public delegate int TOnImageExtracted(IntPtr Data, ref TPDFImage img);


    [GuidAttribute("7F890C01-A8C0-4562-9C64-7B6F718E612A")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    public interface IGPdfEngine
    {
        void NewPdf([MarshalAs(UnmanagedType.LPStr)]string pdfname, [MarshalAs(UnmanagedType.LPStr)]string creator);
        void MergeIn([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))]string pdf);
        [PreserveSig] int Save();
        void InsertImage([MarshalAs(UnmanagedType.LPStr)]string fname);

        //VER 3
        void InsertText([MarshalAs(UnmanagedType.LPStr)]string text);

        void SetDocInfo(int DInfo, [MarshalAs(UnmanagedType.LPStr)]string Value);
        void SetImportFlags(int Flags);
        void SetImportFlags2(int Flags);
        [PreserveSig]int CheckConformance(int Type, int Options, IntPtr UserData, [MarshalAs(UnmanagedType.FunctionPtr)]TOnFontNotFoundProc OnFontNotFound, [MarshalAs(UnmanagedType.FunctionPtr)]TOnReplaceICCProfile OnReplaceICCProfile);
        void AddOutputIntent([MarshalAs(UnmanagedType.LPStr)]string ICCFile);
        void AddOutputIntentEx([MarshalAs(UnmanagedType.LPArray)]byte[] Buffer, int BufSize);
        [PreserveSig] int ReplaceFont(IntPtr PDFFont, [MarshalAs(UnmanagedType.LPStr)]string Name, int Style, bool NameIsFamilyName);
	    [PreserveSig] int ReplaceFontEx(IntPtr PDFFont, [MarshalAs(UnmanagedType.LPStr)]string FontFile, bool Embed);

        void GetDynaPDFVersion(out IntPtr version);
        [Obsolete("Nevolat primo! Volat SetPDFVersion z GPdfEngine")]
	    void __SetPDFVersion(int Version);
        void SetOnErrorProc(IntPtr Data, [MarshalAs(UnmanagedType.FunctionPtr)]TErrorProc ErrProc);
        void GetInPDFVersion(ref int ver);
        void CloseFile();

	    void ExtractText(int requiredLength
            , [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))]out string text
            //, out IntPtr text
            );
        void FlattenAnnots(int Flags);
        void FlattenForm();

        //VER 4
        [PreserveSig] int ReplaceICCProfile(int ColorSpace, [MarshalAs(UnmanagedType.LPStr)]string ICCFile);
        //VER 5
        void ExtractFields(out IntPtr text);
	    //VER 6
	    void GetPageCount(out int pcount);
	    void CalcPageSize(int pageNum, ref UInt32 w, ref UInt32 h, int flags);
        void ExportToImage(int pageNum, IntPtr buffer, int scanlineLen, UInt32 w, UInt32 h, int flags);
        //VER 7
        void ExtractTextAndPos(int pageNum,
            [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))]out string text
            );
        void GetPageSize(int pageNum, ref double w, ref double h);
        //VER 8
        void InsertInvisibleTextAndPos(int pageNum, [MarshalAs(UnmanagedType.LPStr)]string text);
        void InsertImage2(IntPtr bmp);
        //VER 9
	    void SetPageCoords(int coordSystem);
        void GetDocInfo(int DInfo, out IntPtr value);
        void InsertImage3([MarshalAs(UnmanagedType.LPStr)]string fname, int compressionFilter, int compressionLevel);
        void InsertAnnot(int annotType, int pageNum, double x1, double y1, double x2, double y2, int color, [MarshalAs(UnmanagedType.LPStr)]string author, [MarshalAs(UnmanagedType.LPStr)]string subject, [MarshalAs(UnmanagedType.LPStr)]string text, bool open);
        void ExtractAnnots([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))]out string text);
	    void DeleteAnnotation(int aIndex);
        //VER 10
	    void GetMeta(int MInfo, out IntPtr value);
        void SetMeta(int MInfo, [MarshalAs(UnmanagedType.LPWStr)]string value);
        //VER 11
	    void SetPageSize(int pageNum, double w, double h);
        void OpenImport([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))]string pdf);
	    void ImportPage(int pageNum);
        //VER 12
        void ExportToImage2(int pageNum, IntPtr buffer, int scanlineLen, UInt32 w, UInt32 h, int flags, out CTM PageSpace);
        //VER 13
        void GetAndClearErrorLog(out IntPtr log);
        //VER 14
        void InsertAttach([MarshalAs(UnmanagedType.LPStr)]string fname, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))]string title);
        void SaveAttach(int index, [MarshalAs(UnmanagedType.LPStr)]string fname);
        void GetAttachs([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))]out string fnames);
        void Optimize();
        //VER 15
        void GetInPageCount(ref int ver);
        //VER 16
        void GetOutputIntents([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string text);
        void GetFonts([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string text, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))] string testGlyphs);
        //VER 17
        void OpenImportWithPassword([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))] string pdf, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))] string passwd);
        [PreserveSig] int SaveWithPassword([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))] string passwd, int flags);
        //VER 18
        void ExtractImages(IntPtr Data, [MarshalAs(UnmanagedType.FunctionPtr)] TOnImageExtracted ImageProc);
        //VER 19
        void ExtractFields2(out IntPtr text, int fieldsFilter);
        //VER 20
        void MergeIn2([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))] string pdf, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))] string style);
        void SetDocInfo2(int DInfo, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))] string Value);
    }

    public struct CTM
    {
        public double a;
        public double b;
        public double c;
        public double d;
        public double x;
        public double y;

        public void TransformPoint(ref double x, ref double y)
        {
            double ox = x;
            x = ox * this.a + y * this.c + this.x;
            y = ox * this.b + y * this.d + this.y;
        }

    }

    //[Guid("5abd4d1e-f33b-49bf-bed3-9571d9b12238")]
    //[InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    //public interface IPdfGenerator
    //{
    //    [PreserveSig]
    //    bool AddActionToObj(int ObjType, int Event, int ActHandle, int ObjHandle);
    //    [PreserveSig]
    //    bool AddArticle(double PosX, double PosY, double Width, double Height);
    //}
}
