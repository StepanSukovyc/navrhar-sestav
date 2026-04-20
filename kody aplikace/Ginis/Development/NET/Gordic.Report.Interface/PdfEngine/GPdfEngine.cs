//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GPdfEngine.cs                       </Name>
//    <Description> PDF motor pro manipulacemi s PDF.                           </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2004-03-16                                                  </Created>
//  </FileHeader>

using System;
using System.Runtime.InteropServices;
using System.Text;
using System.IO;
using Gordic.General;
using System.Reflection;
using System.ComponentModel;
using System.Collections.Generic;
using System.Linq;
using System.Drawing;

namespace Gordic.Report.Interface
{
    /// <summary>
    /// PDF motor pro manipulacemi s PDF. Wrapuje unmanaged knihovnu DynaPDF
    /// </summary>
    [System.Security.SecurityCritical]
    public class GPdfEngine : IDisposable
    {
        static readonly IGLogger Log = GLogManager.CurrentClassLogger();

        #region Konstanty
        protected const int diAuthor = 0;
        protected const int diApplication = 1;
        protected const int diKeyWords = 2;
        protected const int diProducer = 3;
        protected const int diSubject = 4;
        protected const int diTitle = 5;

        protected const int ifImportAll = 0x0FFFFFFE; // default
        protected const int ifContentOnly = 0x00000000;
        // If this flag is set, only interactive objects are imported if any, Otherwise only empty pages are imported.
        // This flag can be used to copy an Interactive Form, bookmarks or annotations to another PDF file.
        protected const int ifNoContent = 0x00000001;
        // The imported page is not converted to a template if ifImportAsPage is set.
        // Note that this flag can cause resource conflicts. Use this flag carefully!
        protected const int ifImportAsPage = unchecked((int)0x80000000);
        // base objects
        protected const int ifCatalogAction = 0x00000002; // Open action, Catalog actions
        protected const int ifPageActions = 0x00000004;
        protected const int ifBookmarks = 0x00000008;
        protected const int ifArticles = 0x00000010;
        protected const int ifPageLabels = 0x00000020;
        protected const int ifThumbs = 0x00000040;
        protected const int ifTranspGroups = 0x00000080; // This flag is no longer considered.
        protected const int ifSeparationInfo = 0x00000100;
        protected const int ifBoxColorInfo = 0x00000200;
        protected const int ifStructureTree = 0x00000400;
        protected const int ifTransition = 0x00000800;
        protected const int ifSearchIndex = 0x00001000;
        protected const int ifJavaScript = 0x00002000; // Global JavaScripts
        protected const int ifJSActions = 0x00004000; // JavaScript actions
        protected const int ifDocInfo = 0x00008000; // Document info entries
        protected const int ifEmbeddedFiles = 0x00200000; // File attachments
        protected const int ifFileCollections = 0x00400000; // File collections (PDF 1.7)
        // Annotations -> Only the most important annotation types can be selected directly.
        // Note that all annotation types can be deleted with DeleteAnnotation.
        protected const int ifAllAnnots = 0x009F0000;
        protected const int ifFreeText = 0x00010000;
        protected const int ifTextAnnot = 0x00020000;
        protected const int ifLink = 0x00040000;
        protected const int ifStamp = 0x00080000;
        protected const int if3DAnnot = 0x00100000;
        protected const int ifOtherAnnots = 0x00800000;
        // Interactive Form Fields are annotations too but we handle this type separately!
        protected const int ifFormFields = 0x01000000;

        /* -------------------- Special flags -------------------- */
        protected const int ifPrepareForPDFA = 0x10000000; // Replace LZW compression with Flate, set the Interpolate key of images to false, do not import embedded files.
        protected const int ifEnumFonts = 0x20000000; // Import fonts for EnumDocFonts(). The document must be deleted when this flag is set!!!
        protected const int ifAllPageObjects = 0x40000000; // Import links when using ImportPageEx() within an open page. The entire document should be imported in this case.

        protected const int if2MergeLayers = 0x00000001; // If set, layers with identical name are merged. If this flag is absent DynaPDF
        // imports such layers separately so that each layer refers still to the pages
        // where it was orignally used.
        protected const int if2Normalize = 0x00000002; // Replace LZW compression with Flate, apply limit checks, repair errors if possible
        protected const int if2UseProxy = 0x00000004; // Not meaningful for PDF files which are loaded from a memory buffer. If set, all streams are loaded from the file
        // on demand but they are never hold in memory. This reduces drastically the memory usage and enables the processing
        // of almost arbitrary large PDF files with minimal memory usage. The corresponding PDF file must not be deleted before
        // CloseFile() or CloseFileEx() was called.
        protected const int if2NoMetadata = 0x00000008; // Ignore metadata streams which are attached to fonts, pages, images, and so on.
        protected const int if2DuplicateCheck = 0x00000010; // Perform a duplicate check on color spaces, fonts, images, patterns, and templates when merging PDF files.

        //typedef SI32 TRestrictions;
        protected const int rsDenyNothing = 0x00000000;
        protected const int rsDenyAll = 0x00000F3C;
        protected const int rsPrint = 0x00000004;
        protected const int rsModify = 0x00000008;
        protected const int rsCopyObj = 0x00000010;
        protected const int rsAddObj = 0x00000020;
        /* 128/256 bit encryption only -> these flags are ignored if 40 bit encryption is used */
        protected const int rsFillInFormFields = 0x00000100;
        protected const int rsExtractObj = 0x00000200;
        protected const int rsAssemble = 0x00000400;
        protected const int rsPrintHighRes = 0x00000800;
        protected const int rsExlMetadata = 0x00001000; // PDF 1.5 Exclude metadata streams -> 128/256 bit encryption bit only.
        protected const int rsEmbFilesOnly = 0x00002000; // PDF 1.6 Encrypt embedded files only -> Requires AES encryption.

        protected const int pvPDFA_2005 = 14; // PDF/A-1b 2005
        #endregion
        #region Init
        /// <summary>Native PdfEngine</summary>
        protected Gordic.Report.Implementation.IGPdfEngine m_pdf;
        /// <summary>Verze native PdfEngine</summary>
        protected int m_pdfver;
        /// <summary>Verze native PdfEngine</summary>
        public int EngineVersion { get { return m_pdfver; } }

        /// <summary>Konstruktor</summary>
        public GPdfEngine()
            : this(2)
        {
        }

        /// <summary>Konstruktor</summary>
        protected GPdfEngine(int minimumVersion)
        {
            try
            {
                m_pdfver = GUnsafeRepWrapper.grr09_SupportsPDF();
                if (m_pdfver < minimumVersion) throw new GNotImplementedException(21000058, 29, GUnsafeRepWrapper.grr09_FileVersion); //RC-EX 29 : PDF není podporováno. Máte starou verzi GRR ({0}).

                object o;
                GUnsafeRepWrapper.Throw09Error_HR(GUnsafeRepWrapper.grr09_GetPDFEngine(out o));
                Set(o as Gordic.Report.Implementation.IGPdfEngine);
            }
            catch (Exception x) { FunctionLoader.CheckLoaderException(x); throw; }
        }

        private Gordic.Report.Implementation.TErrorProc m_ErrorProc;
        /// <summary>Nastavení konkrétního enginu</summary>
        protected void Set(Implementation.IGPdfEngine pdf)
        {
            m_pdf = pdf;
            Log.Trace($"Start PdfEngine v{m_pdfver} {DynaPDFVersion}.");
            if (m_pdf != null && m_pdfver >= 3)
            {
                m_ErrorProc = PDFError;
                m_pdf.SetOnErrorProc(IntPtr.Zero, m_ErrorProc);                // Error messages and warnings are passed to the callback function.

                m_pdf.SetImportFlags(ifImportAll | ifImportAsPage | ifPrepareForPDFA);
                m_pdf.SetImportFlags2(if2UseProxy);
            }
        }


        /// <exclude/>
        ~GPdfEngine()
        {
            Dispose(false);
        }

        private StringWriter m_Console = new StringWriter();
        /// <summary>Logovací konsole</summary>
        public StringWriter Console
        {
            get
            {
                if (ShowNonCriticalErrors && m_pdfver >= 13)
                {
                    var s = GetAndClearErrorLog();
                    if (string.IsNullOrWhiteSpace(s) == false)
                    {
                        Log.Warn($"PDF non-critical Error: {s}.");
                        m_Console.WriteLine(s);
                    }
                }
                return m_Console;
            }
        }
        /// <summary>Připojit do konzole i nekritické chyby</summary>
        public bool ShowNonCriticalErrors { get; set; } = true;

        // Error callback function.
        // If the function name should not appear at the beginning of the error message then set
        // the flag emNoFuncNames (pdf.SetErrorMode(DynaPDF.TErrMode.emNoFuncNames);).
        private int PDFError(IntPtr Data, int ErrCode, IntPtr ErrMessage, int ErrType)
        {
            return Error(ErrCode, System.Runtime.InteropServices.Marshal.PtrToStringAnsi(ErrMessage), ErrType);
        }

        /// <summary>Error callback function.</summary>
        protected int Error(int ErrCode, string ErrMessage, int ErrType)
        {
            Log.Warn($"PDF Error: {ErrMessage}.");
            switch(ErrMessage)
            {
                case "CheckConformance: One or more digital signatures were deleted!":
                    return 0; //stopím
                //case "CheckConformance: One or more Metadata streams were deleted!":
                //    return 0; //stopím
            }
            Console.WriteLine(ErrMessage);
            return 0;
        }

        internal string GetAndClearErrorLog()
        {
            if (m_pdfver < 13) throw new GNotImplementedException(21000127, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            IntPtr t;
            m_pdf.GetAndClearErrorLog(out t);
            return Marshal.PtrToStringUni(t);
        }

        /// <summary>Verze používané DynaPDF</summary>
        public string DynaPDFVersion
        {
            get
            {
                if (m_pdfver < 3) throw new GNotImplementedException(21000062, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
                IntPtr ver;
                m_pdf.GetDynaPDFVersion(out ver);
                return Marshal.PtrToStringAnsi(ver);
            }
        }
        #endregion
        #region Vytváření PDF
        /// <summary>Vytvoří nový PDF soubor (jako PDF/A)</summary>
        public void NewPdf(string pdfname, string creator = null)
        {
            Log.Info($"PDF: vytvoření nového souboru {pdfname}.");
            m_pdf.NewPdf(pdfname, creator);
        }
        /// <summary>Vytvoří nový PDF soubor (jako PDF/A)</summary>
        public void NewPdfA2(string pdfname, string creator = null)
        {
            Log.Info($"PDF: vytvoření nového souboru {pdfname}.");
            m_pdf.NewPdf(pdfname, creator);
            SetPDFVersion(18); //pvPDFA_2b     = 18, // PDF/A 2b
        }
        /// <summary>Vytvoří nový PDF soubor (jako PDF/A)</summary>
        public void NewPdfA3(string pdfname, string creator = null)
        {
            Log.Info($"PDF: vytvoření nového souboru {pdfname}.");
            m_pdf.NewPdf(pdfname, creator);
            SetPDFVersion(21); //pvPDFA_3b     = 21, // PDF/A 3b
        }

        /// <summary>Vytvoří nový PDF soubor (jako PDF 1.7)</summary>
        public void NewPdf17(string pdfname, string creator = null)
        {
            Log.Info($"PDF: vytvoření nového souboru {pdfname}.");
            m_pdf.NewPdf(pdfname, creator);
            SetPDFVersion(7);
        }

        int m_verset = pvPDFA_2005; //PDF/A-1b 2005
        /// <summary>Nastaví konkrétní verzi PDF</summary>
        protected void SetPDFVersion(int ver)
        {
            Log.Trace($"PDF: SetPDFVersion {ver}.");
            if (m_pdfver < 3) throw new GNotImplementedException(21000069, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            m_verset = ver;
#pragma warning disable 618
            m_pdf.__SetPDFVersion(ver);
#pragma warning restore 618
        }

        /// <summary>Uloží vytvářené PDF</summary>
        public void Save()
        {
            Save(true);
        }

        /// <summary>
        /// Uloží vytvářené PDF
        /// </summary>
        /// <param name="checkConformance">zda při uložení kontrolovat shodu s PDF/A</param>
        public void Save(bool checkConformance)
        {
            if (m_pdfver >= 4 && checkConformance) //neprida OutputIntent pokud si ho pridam sam
            {
                switch (m_verset)
                {
                    case pvPDFA_2005:
                    case 16:
                        Save_CheckConformance(GPdfAVerifier.TConformanceType.ctPDFA_1b_2005);
                        break;
                    case 17:
                    case 18:
                    case 19:
                        Save_CheckConformance(GPdfAVerifier.TConformanceType.ctPDFA_2b);
                        break;
                    case 20:
                    case 21:
                    case 22:
                        Save_CheckConformance(GPdfAVerifier.TConformanceType.ctPDFA_3b);
                        break;
                        //jinak by se to delat nemelo! (CheckConformance ten typ natvrdo nastavi na PDF/A-1b)
                }

            }
            Log.Info($"PDF: uložení.");
            var res = m_pdf.Save();
            Log.Trace($"PDF: Save {res}");
            if (res != 0)
            {
                System.Diagnostics.Trace.WriteLine(String.Format("PDF Save fatal error {0}", res));
                throw new Gordic.Report.Interface.GUnsafeRepWrapper.GrrException(21000082, /*RC-EX*/ 9, Gordic.Report.Interface.GUnsafeRepWrapper.Grr09Loader.Loader, res  //RC-EX 9 : Chyba reporteru {1}: {0}
                    , GResources.GetResourceText(40) //RC 40 : Fatální chyba PDF
                    );
            }
        }

        private void Save_CheckConformance(GPdfAVerifier.TConformanceType type)
        {
            Log.Trace($"PDF: Save_CheckConformance {type}");
            var opts = GPdfAVerifier.DefaultCheckOptions(type);
            var err = m_pdf.CheckConformance((int)type, (int)opts, IntPtr.Zero, FontNotFound, ReplaceICCProfile);
            Log.Trace($"PDF: Save_CheckConformance {err}");
            if (CheckConformanceCheckResult(err) == false)
            {
                throw new Gordic.Report.Interface.GUnsafeRepWrapper.GrrException(21000089, /*RC-EX*/ 41, Gordic.Report.Interface.GUnsafeRepWrapper.Grr09Loader.Loader, err, "");  //RC-EX 41 : Nelze uložit do PDF/A, jelikož není možno zajistit validitu výsledného dokumentu.;Některý ze vstupních souborů je zřejmě poškozen.
            }
        }
        /// <summary>Tuto funkci volat na konec a pote soubor uzavrit. Nevolat pak Save!</summary>
        public bool CheckIfConvertible()
        {
            Log.Trace($"PDF: CheckIfConvertible");
            if (m_pdfver < 4) throw new GNotImplementedException(21000091, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            GPdfAVerifier.TConformanceType type;
            switch (m_verset)
            {
                case pvPDFA_2005:
                case 16:
                    type = GPdfAVerifier.TConformanceType.ctPDFA_1b_2005;
                    break;
                case 17:
                case 18:
                case 19:
                    type = GPdfAVerifier.TConformanceType.ctPDFA_2b;
                    break;
                case 20:
                case 21:
                case 22:
                    type = GPdfAVerifier.TConformanceType.ctPDFA_3b;
                    break;
                default:
                    return true;
            }
            var opts = GPdfAVerifier.DefaultCheckOptions(type);
            var err = m_pdf.CheckConformance((int)type, (int)opts, IntPtr.Zero, FontNotFound, ReplaceICCProfile);
            return err >= 0 && err <= 3; //0,1,2,3
        }

        public void OptimizedSave()
        {
            Log.Trace($"PDF: OptimizedSave");
            if (m_pdfver < 14) throw new GNotImplementedException(21000129, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            m_pdf.Optimize();
            var res = m_pdf.Save();
            if (res != 0)
            {
                System.Diagnostics.Trace.WriteLine(String.Format("PDF Save fatal error {0}", res));
                throw new Gordic.Report.Interface.GUnsafeRepWrapper.GrrException(21000128, /*RC-EX*/ 9, Gordic.Report.Interface.GUnsafeRepWrapper.Grr09Loader.Loader, res  //RC-EX 9 : Chyba reporteru: {0}
                    , GResources.GetResourceText(40) //RC 40 : Fatální chyba PDF
                    );
            }
        }

        /// <summary>
        /// Uloží vytvářené PDF s heslem
        /// </summary>
        /// <param name="checkConformance">zda při uložení kontrolovat shodu s PDF/A</param>
        /// <param name="passwd">heslo</param>
        /// <param name="flags">restrikce PDF. Doporučuji 0=bez omezení</param>
        public void SaveWithPassword(bool checkConformance, string passwd, int flags)
        {
            if (m_pdfver < 17) throw new GNotImplementedException(21000143, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            if (checkConformance) //neprida OutputIntent pokud si ho pridam sam
            {
                switch (m_verset)
                {
                    case pvPDFA_2005:
                    case 16:
                        Save_CheckConformance(GPdfAVerifier.TConformanceType.ctPDFA_1b_2005);
                        break;
                    case 17:
                    case 18:
                    case 19:
                        Save_CheckConformance(GPdfAVerifier.TConformanceType.ctPDFA_2b);
                        break;
                    case 20:
                    case 21:
                    case 22:
                        Save_CheckConformance(GPdfAVerifier.TConformanceType.ctPDFA_3b);
                        break;
                        //jinak by se to delat nemelo! (CheckConformance ten typ natvrdo nastavi na PDF/A-1b)
                }

            }
            Log.Info($"PDF: uložení s heslem.");
            var res = m_pdf.SaveWithPassword(passwd, flags);
            Log.Trace($"PDF: SaveWithPassword {res}");
            if (res != 0)
            {
                System.Diagnostics.Trace.WriteLine(String.Format("PDF Save fatal error {0}", res));
                throw new Gordic.Report.Interface.GUnsafeRepWrapper.GrrException(21000144, /*RC-EX*/ 9, Gordic.Report.Interface.GUnsafeRepWrapper.Grr09Loader.Loader, res  //RC-EX 9 : Chyba reporteru: {0}
                    , GResources.GetResourceText(40) //RC 40 : Fatální chyba PDF
                    );
            }
        }

        #endregion
        #region Vkládání contentu
        /// <summary>Vloží existující PDF</summary>
        public void MergeIn(string pdf, bool setProducer = true)
        {
            Log.Trace($"PDF: MergeIn {pdf} {setProducer}");
            bool l_setprod = false;
            if (setProducer && m_pdfver >= 9)
            {
                if (PageCount == 0)
                {
                    this.Application = null; //prevezme z Importovaneho
                    this.Producer = null; //prevezme z Importovaneho
                    l_setprod = true;
                }
            }
            Log.Info($"PDF: otevření souboru {pdf}.");
            m_pdf.MergeIn(pdf);

            if (l_setprod)
            {
                string title = "GORDIC PDF Engine " + DynaPDFVersion;
                this.Producer = this.Producer + " (" + title + ")";
                this.Application = this.Application + " (" + title + ")";
            }
        }
        public void MergeWithWatermark(string pdf, string watermarkText, double textSize = 70.0)
        {
            Log.Trace($"PDF: MergeWithWatermark {pdf} {watermarkText}");
            if (m_pdfver < 20) throw new GNotImplementedException(21000148, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            bool l_setprod = false;
            if (PageCount == 0)
            {
                this.Application = null; //prevezme z Importovaneho
                this.Producer = null; //prevezme z Importovaneho
                l_setprod = true;
            }
            Log.Info($"PDF: otevření souboru {pdf}.");
            m_pdf.MergeIn2(pdf, $"watermark={watermarkText}|fs={textSize}|");

            if (l_setprod)
            {
                string title = "GORDIC PDF Engine " + DynaPDFVersion;
                this.Producer = this.Producer + " (" + title + ")";
                this.Application = this.Application + " (" + title + ")";
            }
        }

        /// <summary>Vloží jednu stranu z existujícího PDF</summary>
        public void ImportPage(string pdf, int pageNum)
        {
            Log.Trace($"PDF: ImportPage {pdf} {pageNum}");
            if (m_pdfver < 11) throw new GNotImplementedException(21000088, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            m_pdf.OpenImport(pdf);
            m_pdf.ImportPage(pageNum);
        }

        /// <summary>Vloží jednu stranu z existujícího PDF s heslem pro otevření</summary>
        public void ImportPageWithPassword(string pdf, int pageNum, string passwd)
        {
            Log.Trace($"PDF: ImportPageWithPassword {pdf} {pageNum}");
            if (m_pdfver < 17) throw new GNotImplementedException(21000145, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            m_pdf.OpenImportWithPassword(pdf, passwd);
            m_pdf.ImportPage(pageNum);
        }

        /// <summary>Verze importovaného PDF souboru</summary>
        public int GetInPDFVersion()
        {
            Log.Trace($"PDF: GetInPDFVersion");
            if (m_pdfver < 3) throw new GNotImplementedException(21000061, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            int v = -1;
            m_pdf.GetInPDFVersion(ref v);
            return v;
        }
        /// <summary>Verze importovaného PDF souboru</summary>
        public string GetInPDFVersionStr()
        {
            Log.Trace($"PDF: GetInPDFVersionStr");
            var inver = GetInPDFVersion();
            return string.Format("{0}.{1}", inver < 10 ? 1 : inver / 10, inver % 10);
        }
        /// <summary>Počet stran importovaného PDF souboru</summary>
        public int GetInPageCount()
        {
            Log.Trace($"PDF: GetInPageCount");
            if (m_pdfver < 15) throw new GNotImplementedException(21000135, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            int v = -1;
            m_pdf.GetInPageCount(ref v);
            return v;
        }
        /// <summary>Počet stran PDF souboru</summary>
        public static int FilePageCount(string filePath)
        {
            Log.Trace($"PDF: FilePageCount {filePath}");
            using (var v = new GPdfEngine())
            {
                if (v.EngineVersion >= 15)
                {
                    v.m_pdf.OpenImport(filePath);
                    return v.GetInPageCount();
                }
                else
                {
                    v.NewPdf(null);
                    v.MergeIn(filePath);
                    return v.PageCount;
                }
            }
        }

        public void InsertText(string text)
        {
            Log.Trace($"PDF: InsertText {text}");
            if (m_pdfver < 8) throw new GNotImplementedException(21000076, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            m_pdf.InsertText(text);
        }

        /// <summary>Vloží obrázek na celou novou stranu</summary>
        public void InsertImage(string fname)
        {
            Log.Trace($"PDF: InsertImage {fname}");
            m_pdf.InsertImage(fname);
        }

        public enum ImageEncoding { cfFlate = 0, cfJPEG = 1, cfCCITT3 = 2, cfCCITT4 = 3, cfLZW = 4, cfJP2K = 7 };
        public enum ImageCompressionLevel { clNone = 0, clDefault = 1, clFastest = 2, clMax = 3 };
        /// <summary>Vloží obrázek na celou novou stranu</summary>
        public void InsertImage(string fname, ImageEncoding encoding, ImageCompressionLevel level)
        {
            Log.Trace($"PDF: InsertImage {fname} {encoding} {level}");
            m_pdf.InsertImage3(fname, (int)encoding, (int)level);
        }
        //[DllImport("gdi32.dll")]
        //static extern bool DeleteObject(IntPtr hObject);
        ///// <summary>Vloží obrázek na celou novou stranu</summary>
        //public void InsertImage(System.Drawing.Bitmap bmp)
        //{
        //    if (m_pdfver < 8) throw new GNotImplementedException(21000077, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
        //    var w = Gordic.Report.Implementation.BitmapWrap.FromBitmap(bmp, System.Drawing.Imaging.PixelFormat.Format1bppIndexed);
        //    m_pdf.InsertImage2(w.Handle);
        //    m_bitmaps.Add(w);
        //}
        public void InsertInvisibleTextAndPos(int pageNum, IEnumerable<TextAndPos> texts)
        {
            Log.Trace($"PDF: InsertInvisibleTextAndPos {pageNum}");
            if (m_pdfver < 8) throw new GNotImplementedException(21000075, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            var s = new StringBuilder();
            foreach (var p in texts)
            {
                s.Append(p.x1.ToString(System.Globalization.CultureInfo.InvariantCulture));
                s.Append(' ');
                s.Append(p.y1.ToString(System.Globalization.CultureInfo.InvariantCulture));
                s.Append(' ');
                s.Append(p.x2.ToString(System.Globalization.CultureInfo.InvariantCulture));
                s.Append(' ');
                s.Append(p.y2.ToString(System.Globalization.CultureInfo.InvariantCulture));
                s.Append(' ');
                s.Append((int)p.c[0]);
                int len = p.c.Length;
                for (int i = 1; i < len; i++)
                {
                    s.Append(',');
                    s.Append((int)p.c[i]);
                }
                s.Append(' ');
            }
            m_pdf.InsertInvisibleTextAndPos(pageNum, s.ToString());
        }
        private const int NO_COLOR = unchecked((int)0xFFFFFFF1);

        public enum AnnotType
        {
            __Caret,
            __Circle,
            __FileLink,    // A Link annotation with an associated GoToR action (go to remote)
            __FreeText,
            Highlight,   // Highlight annotation
            __Ink,
            __Line,
            __PageLink,    // A Link annotation with an associated GoTo action
            __Polygon,
            __PolyLine,
            __PopUp,
            __Square,
            Squiggly,    // Highlight annotation
            __Stamp,
            StrikeOut,   // Highlight annotation
            __Text,        // Also used as container to store the State Model
            Underline,   // Highlight annotation
            __WebLink,     // A Link annotation with an associated URI action
            __Widget,      // Form Fields are handled separately
            __3D,          // PDF 1.6
            __SoundAnnot,  // PDF 1.2
            __FileAttach,  // PDF 1.3
            __Redact,      // PDF 1.7
            __Watermark,   // PDF 1.6
            __Unknown,     // Unknown annotation type
            __MovieAnnot,  // PDF 1.2
            __PrinterMark, // PDF 1.4
            __Projection,  // PDF 1.7 Extension Level 3
            __RichMedia,   // PDF 1.7 Extension Level 3
            __Screen,      // PDF 1.5
            __TrapNet,     // PDF 1.3
        };
        [System.Diagnostics.DebuggerDisplay("{text}")]
        public struct Annotation
        {
            public int pageNum;
            public AnnotType annotType;
            public double x1;
            public double y1;
            public double x2;
            public double y2;
            public System.Drawing.Color color;
            public string author;
            public string subject;
            public string text;
            public bool open;
            public string CreateDate;       // Creation Date -> Optional.
            public string ModDate;          // Modification Date -> Optional.

            public Annotation(int pageNum, AnnotType annotType, double x1, double y1, double x2, double y2, System.Drawing.Color color, string author, string subject, string text, bool open)
            {
                this.pageNum = pageNum;
                this.annotType = annotType;
                this.x1 = x1;
                this.y1 = y1;
                this.x2 = x2;
                this.y2 = y2;
                this.color = color;
                this.author = author;
                this.subject = subject;
                this.text = text;
                this.open = open;
                this.CreateDate = null;
                this.ModDate = null;
            }
        }
        [System.Diagnostics.DebuggerDisplay("{Name}={Value}")]
        public struct Field
        {
            public string Name;
            public string Value;
            public int FieldType;
            public int GroupType;
            public int KidCount;
            public string ModDate;          // Modification Date -> Optional.
        }

        //public void InsertAnnot(int pageNum, int annotType, double x1, double y1, double x2, double y2, int color, string author, string subject, string text, bool open)
        //{
        //    if (m_pdfver < 9) throw new GNotImplementedException(21000081, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
        //    m_pdf.InsertAnnot(pageNum, annotType, x1, y1, x2, y2, color, author, subject, text, open);
        //}
        //public void InsertAnnot(int pageNum, AnnotType annotType, double x1, double y1, double x2, double y2, System.Drawing.Color color, string author, string subject, string text, bool open)
        //{
        //    if (m_pdfver < 9) throw new GNotImplementedException(21000081, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
        //    m_pdf.InsertAnnot(pageNum, (int)annotType, x1, y1, x2, y2, color.IsEmpty ? NO_COLOR : System.Drawing.ColorTranslator.ToWin32(color), author, subject, text, open);
        //}
        public void InsertAnnotation(Annotation a)
        {
            Log.Trace($"PDF: InsertAnnotation");
            if (m_pdfver < 9) throw new GNotImplementedException(21000081, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            m_pdf.InsertAnnot((int)a.annotType, a.pageNum, a.x1, a.y1, a.x2, a.y2, a.color.IsEmpty ? NO_COLOR : System.Drawing.ColorTranslator.ToWin32(a.color), a.author, a.subject, a.text, a.open);
        }
        public void DeleteAnnotation(int aIndex)
        {
            Log.Trace($"PDF: DeleteAnnotation");
            m_pdf.DeleteAnnotation(aIndex);
        }


        #endregion
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
            try
            {
                Log.Trace($"End PdfEngine.");
                if (m_pdf != null) Marshal.ReleaseComObject(m_pdf);
                m_pdf = null;
                Free();
            }
            catch { }
        }

        List<GTempFile> m_temps = new List<GTempFile>();
        //List<Gordic.Report.Implementation.BitmapWrap> m_bitmaps = new List<Implementation.BitmapWrap>();

        /// <summary>Uvolnění zdrojů</summary>
        [System.Security.SecurityCritical]
        protected virtual void Free()
        {
            foreach (var tf in m_temps) tf.Dispose();
            m_temps.Clear();

            //foreach (var bmp in m_bitmaps) bmp.Dispose();
            //m_bitmaps.Clear();
        }

        #endregion
        #region Extract
        public List<Annotation> ExtractAnnots()
        {
            Log.Trace($"PDF: ExtractAnnots");
            string a0;
            m_pdf.ExtractAnnots(out a0);

            List<Annotation> r = new List<Annotation>();
            foreach (var an in a0.Split(new char[] { '|' }, StringSplitOptions.RemoveEmptyEntries))
            {
                var a = new Annotation();

                var am = an.Split(new char[] { ':' }, 2);
                var a1 = am[0].Split(',');
                var a2 = am[1].Split('~');

                int j = 0;
                foreach (var s in a1)
                {
                    switch (j++)
                    {
                        case 0: { int t; Int32.TryParse(s, System.Globalization.NumberStyles.None, System.Globalization.CultureInfo.InvariantCulture, out t); a.annotType = (AnnotType)t; } break;
                        case 1: Int32.TryParse(s, System.Globalization.NumberStyles.None, System.Globalization.CultureInfo.InvariantCulture, out a.pageNum); break;
                        case 2: Double.TryParse(s, System.Globalization.NumberStyles.AllowDecimalPoint, System.Globalization.CultureInfo.InvariantCulture, out a.x1); break;
                        case 3: Double.TryParse(s, System.Globalization.NumberStyles.AllowDecimalPoint, System.Globalization.CultureInfo.InvariantCulture, out a.y1); break;
                        case 4: Double.TryParse(s, System.Globalization.NumberStyles.AllowDecimalPoint, System.Globalization.CultureInfo.InvariantCulture, out a.x2); break;
                        case 5: Double.TryParse(s, System.Globalization.NumberStyles.AllowDecimalPoint, System.Globalization.CultureInfo.InvariantCulture, out a.y2); break;
                        case 6: { int t; Int32.TryParse(s, System.Globalization.NumberStyles.None, System.Globalization.CultureInfo.InvariantCulture, out t); a.color = System.Drawing.ColorTranslator.FromWin32(t); } break;
                    }
                }
                j = 0;
                foreach (var s in a2)
                {
                    switch (j++)
                    {
                        case 0: a.author = s; break;
                        case 1: a.subject = s; break;
                        case 2: a.text = s; break;
                        case 3: { int t; Int32.TryParse(s, System.Globalization.NumberStyles.None, System.Globalization.CultureInfo.InvariantCulture, out t); a.open = t > 0; } break;
                        case 4: a.CreateDate = s; break;
                        case 5: a.ModDate = s; break;
                    }
                }
                r.Add(a);
            }
            return r;
        }

        /// <summary>Zjištění textu PDF souboru</summary>
        public void FlattenForm()
        {
            Log.Trace($"PDF: FlattenForm");
            if (m_pdfver < 3) throw new GNotImplementedException(29500001, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            m_pdf.FlattenForm();
        }

        /// <summary>Zjištění textu PDF souboru</summary>
        public string ExtractText(int requiredLength = -1)
        {
            Log.Trace($"PDF: ExtractText");
            if (m_pdfver < 3) throw new GNotImplementedException(21000063, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.

            //MakeAbsolutePath(argv, "Resource/CMap/", filePath);
            //pdfSetCMapDir(pdf, filePath, (TLoadCMapFlags)(lcmRecursive | lcmDelayed));

            //m_pdf.FlattenForm(); - pak to bere i formulare (napr. el.podpis)

            //IntPtr t;
            //m_pdf.ExtractText(requiredLength, out t);
            //return Marshal.PtrToStringAnsi(t);
            string t;
            m_pdf.ExtractText(requiredLength, out t);
            return t;
        }
        [System.Diagnostics.DebuggerDisplay("{c}")]
        public struct TextAndPos
        {
            public double x1;
            public double y1;
            public double x2;
            public double y2;
            public string c;
        }
        /// <summary>Zjištění textu PDF souboru</summary>
        public IEnumerable<TextAndPos> ExtractTextAndPos(int pageNum)
        {
            Log.Trace($"PDF: ExtractTextAndPos {pageNum}");
            if (m_pdfver < 7) throw new GNotImplementedException(21000073, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.

            string t;
            m_pdf.ExtractTextAndPos(pageNum, out t);
            var l = new List<TextAndPos>(t.Length / 6);
            var p = new TextAndPos();
            int j = 0;
            foreach (var s in t.Split(' '))
            {
                switch (j++)
                {
                    case 0: Double.TryParse(s, System.Globalization.NumberStyles.AllowDecimalPoint, System.Globalization.CultureInfo.InvariantCulture, out p.x1); break;
                    case 1: Double.TryParse(s, System.Globalization.NumberStyles.AllowDecimalPoint, System.Globalization.CultureInfo.InvariantCulture, out p.y1); break;
                    case 2: Double.TryParse(s, System.Globalization.NumberStyles.AllowDecimalPoint, System.Globalization.CultureInfo.InvariantCulture, out p.x2); break;
                    case 3: Double.TryParse(s, System.Globalization.NumberStyles.AllowDecimalPoint, System.Globalization.CultureInfo.InvariantCulture, out p.y2); break;
                    case 4:
                        int z; if (Int32.TryParse(s, System.Globalization.NumberStyles.None, System.Globalization.CultureInfo.InvariantCulture, out z)) p.c = new string((char)z, 1);
                        j = 0; l.Add(p);
                        break;
                }
            }
            return l;
        }

        public enum PageCoord
        {
            BottomUp = 0,
            TopDown = 1,
        }
        private PageCoord m_PageCoordSystem = PageCoord.BottomUp;
        public PageCoord PageCoordSystem
        {
            get { return m_PageCoordSystem; }
            set
            {
                Log.Trace($"PDF: setPageCoordSystem {value}");
                if (m_pdfver < 9) throw new GNotImplementedException(21000079, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
                m_PageCoordSystem = value; m_pdf.SetPageCoords((int)value);
            }
        }

        /// <summary>Zjištění obsahu polí</summary>
        public Dictionary<string, string> ExtractFields()
        {
            Log.Trace($"PDF: ExtractFields");
            if (m_pdfver < 5) throw new GNotImplementedException(21000068, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.

            IntPtr t;
            m_pdf.ExtractFields(out t);
            string s = Marshal.PtrToStringUni(t);
            var d = new Dictionary<string, string>();
            foreach (var a in s.Split(new char[] { '\n' }, StringSplitOptions.RemoveEmptyEntries))
            {
                var b = a.Split(new char[] { '=' }, 2);
                if (b.Length == 2)
                    d[b[0]] = b[1]; //pokud by klíč byl duplicitní, použije se poslední hodnota
            }
            return d;
        }

        /// <summary>Zjištění obsahu polí</summary>
        public Dictionary<string, Field> ExtractFields2(bool signatureFields = false)
        {
            Log.Trace($"PDF: ExtractFields2");
            if (m_pdfver < 19) throw new GNotImplementedException(21000147, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.

            var options = 0;
            if (signatureFields == false) options |= 1;
            IntPtr t;
            m_pdf.ExtractFields2(out t, options);
            string s = Marshal.PtrToStringUni(t);
            var d = new Dictionary<string, Field>();
            foreach (var a in s.Split(new char[] { '\n' }, StringSplitOptions.RemoveEmptyEntries))
            {
                var b = a.Split(new char[] { '=' }, 2);
                if (b.Length == 2)
                {
                    var c = b[1].Split(new char[] { '|' });
                    var v = new Field()
                    {
                        Name = b[0],
                        Value = c[0],
                        FieldType = c.Length > 1 ? Int32.Parse(c[1]) : -1,
                        GroupType = c.Length > 2 ? Int32.Parse(c[2]) : -1,
                        KidCount = c.Length > 3 ? Int32.Parse(c[3]) : -1,
                        ModDate = c.Length > 4 ? c[4] : null,
                    };
                    d[b[0]] = v;
                }
            }
            return d;
        }

        private int ImageExtracted(IntPtr Data, ref Gordic.Report.Implementation.TPDFImage img)
        {
            Log.Trace($"PDF: ExtractImages found image ({img.Width}x{img.Height})");
            var res = GCHandle.FromIntPtr(Data).Target as List<Bitmap>;

            try
            {
                if(img.Height * img.ScanLineLength < img.BufSize)
                    throw new Exception("Nepodporovaná komprese obrázku");
                System.Drawing.Imaging.PixelFormat p;
                switch (img.BitsPerPixel)
                {
                    case 1: p = System.Drawing.Imaging.PixelFormat.Format1bppIndexed; break;
                    case 24: p = System.Drawing.Imaging.PixelFormat.Format24bppRgb; break;
                    case 32: p = System.Drawing.Imaging.PixelFormat.Format32bppArgb;break;
                    default: throw new Exception("Nepodporovaná bitová hloubka obrázku");
                }
                System.Drawing.Bitmap bmp;
                //if (img.ScanLineLength % 4 == 0)
                //    bmp = new System.Drawing.Bitmap((int)img.Width, (int)img.Height, (int)img.ScanLineLength, p, img.Buffer);
                //else
                {
                    bmp = new System.Drawing.Bitmap((int)img.Width, (int)img.Height, p);
                    if (img.BitsPerPixel == 1)
                    {
                        var pal = bmp.Palette;
                        //if (img.ColorCount == 2) { }   //přenesení palety z PDF (podle Dyna dokumentace to tam téměř nikdy nebude)
                        if (pal.Entries.Length == 2)
                        {
                            pal.Entries[0] = Color.White;
                            pal.Entries[1] = Color.Black;
                        }
                        bmp.Palette = pal;
                    }

                    System.Drawing.Imaging.BitmapData bd = bmp.LockBits(new System.Drawing.Rectangle(0, 0, bmp.Width, bmp.Height), System.Drawing.Imaging.ImageLockMode.WriteOnly, p);
                    IntPtr scan = bd.Scan0;
                    IntPtr buf = img.Buffer;
                    int offset = 0;
                    var len = (int)img.ScanLineLength;
                    for (int y = 0; y < bmp.Height; y++)
                    {
                        var stride = new byte[len];
                        Marshal.Copy(buf, stride, 0, len);
                        Marshal.Copy(stride, 0, scan, len);
                        scan = scan + bd.Stride;
                        buf = buf + len; offset += len;
                    }
                    bmp.UnlockBits(bd);
                }
                //bmp.Save(@"e:\test\pdf\xxx.png");
                res.Add(bmp);
            }
            catch (Exception ex)
            {
                Log.Warn(ex, $"Unable to parse image from Pdf ({img.Width}x{img.Height})");
            }
            return 0;
        }
        /// <summary>Zjištění obrázků</summary>
        public List<Bitmap> ExtractImages()
        {
            Log.Trace($"PDF: ExtractImages");
            if (m_pdfver < 18) throw new GNotImplementedException(21000146, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.

            var res = new List<Bitmap>();
            Gordic.Report.Implementation.TOnImageExtracted l_OnImageExtracted;
            l_OnImageExtracted = ImageExtracted;
            var h = GCHandle.Alloc(res);
            try
            {
                m_pdf.ExtractImages(GCHandle.ToIntPtr(h), l_OnImageExtracted);
            }
            finally
            {
                h.Free();
            }
            return res;
        }


        public string GetMetadata()
        {
            Log.Trace($"PDF: GetMetadata");
            IntPtr t;
            m_pdf.GetMeta(-1, out t);
            string s = Marshal.PtrToStringUni(t);
            return s;
        }
        public void SetMetadata(string value)
        {
            Log.Trace($"PDF: SetMetadata {value}");
            m_pdf.SetMeta(-1, value);
        }


        [System.Diagnostics.DebuggerDisplay("{Info}")]
        public struct OutputIntent
        {
            public string Info;
            public string OutputCondition;
            public string OutputConditionID;
            public string RegistryName;
            public string SubType;
            public int Size;
        }
        public List<OutputIntent> GetOutputIntents()
        {
            if (m_pdfver < 16) throw new GNotImplementedException(21000140, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            Log.Trace($"PDF: GetOutputIntents");
            string a0;
            m_pdf.GetOutputIntents(out a0);
            
            var r = new List<OutputIntent>();
            foreach (var an in a0.Split(new char[] { '|' }, StringSplitOptions.RemoveEmptyEntries))
            {
                var a1 = an.Split(',');
                var a = new OutputIntent()
                {
                    Info = a1[0],
                    OutputCondition = a1[1],
                    OutputConditionID = a1[2],
                    RegistryName = a1[3],
                    SubType = a1[4],
                    Size = Int32.Parse(a1[5]),
                };
                r.Add(a);
            }
            return r;
        }

        [System.Diagnostics.DebuggerDisplay("{BaseFont}")]
        public struct FontInfo
        {
            public string BaseFont;
            public string Mapping;
            public string FontType;
            public string BaseEncoding;
            public string FontFamily;
            public string Lang;
            public float MaxWidth;
            public float MaxHeight;
            public float AvgWidth;
            public float SpaceWidth;
            public int Size;
            public int MissingGlyphIndex;
        }
        public List<FontInfo> GetFonts(string testGlyphs = null)
        {
            if (m_pdfver < 16) throw new GNotImplementedException(21000141, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            Log.Trace($"PDF: GetFonts");
            string a0;
            m_pdf.GetFonts(out a0, testGlyphs);

            var r = new List<FontInfo>();
            foreach (var an in a0.Split(new char[] { '|' }, StringSplitOptions.RemoveEmptyEntries))
            {
                var a1 = an.Split(',');
                var a = new FontInfo()
                {
                    BaseFont = a1[0],
                    Mapping = a1[1],
                    FontType = a1[2],
                    BaseEncoding = a1[3],
                    FontFamily = a1[4],
                    Lang = a1[5],
                    MaxWidth = float.Parse(a1[6], System.Globalization.CultureInfo.InvariantCulture),
                    MaxHeight = float.Parse(a1[7], System.Globalization.CultureInfo.InvariantCulture),
                    AvgWidth = float.Parse(a1[8], System.Globalization.CultureInfo.InvariantCulture),
                    SpaceWidth = float.Parse(a1[9], System.Globalization.CultureInfo.InvariantCulture),
                    Size = Int32.Parse(a1[10]),
                    MissingGlyphIndex = a1[11] == "" ? -1 : Int32.Parse(a1[11]),
                };
                r.Add(a);
            }
            return r;
        }

        #endregion
        #region věci pro Verifier
        const int fsRegular = 0x19000000; // 400 -> Same as fsNone
        private uint WeightFromStyle(int Style)
        {
            return (((uint)Style & ~0xC00FFFFF) >> 20);
        }
        /// <summary/>
        protected int FontNotFound(IntPtr Data, IntPtr PDFFont, IntPtr FontName, int Style, int StdFontIndex, int IsSymbolFont)
        {
            Log.Trace($"PDF: ReplaceFont{StdFontIndex}");
            // The one and only really important font is ZapfDingbats. It is used
            // in form fields and usually not embedded.
            // The fonts Arial, Courier New, Times New Roman, and Symbol are
            // normally available on a system. So, the function should never be
            // called with standard font indexes below 13.
            switch (StdFontIndex)
            {
                case 0:
                case 1:
                case 2:
                case 3:
                    Console.WriteLine("Font replace {0} -> Courier New", StdFontIndex);
                    return m_pdf.ReplaceFont(PDFFont, "Courier New", Style, true);
                case 4:
                case 5:
                case 6:
                case 7:
                    Console.WriteLine("Font replace {0} -> Arial", StdFontIndex);
                    return m_pdf.ReplaceFont(PDFFont, "Arial", Style, true);
                case 8:
                case 9:
                case 10:
                case 11:
                    Console.WriteLine("Font replace {0} -> Times New Roman", StdFontIndex);
                    return m_pdf.ReplaceFont(PDFFont, "Times New Roman", Style, true);
                case 12:
                    Console.WriteLine("Font replace {0} -> Symbol", StdFontIndex);
                    return m_pdf.ReplaceFont(PDFFont, "Symbol", Style, true);
                // The font can also be loaded from a file if not installed on the system
                case 13:
                    var zapf = new GTempFile(); //Path.Combine(path, "ZapfDingbats.ttf");
                    m_temps.Add(zapf);
                    using (var s = typeof(GPdfAVerifier).Assembly.GetManifestResourceStream("Gordic.Report.Interface.PdfEngine.ZapfDingbats.ttf"))
                    {
                        GIOSupport.StreamToFile(s, zapf.Path);
                    }
                    Console.WriteLine("Font replace {0} -> ZapfDingbats.ttf", StdFontIndex, zapf.Path);
                    return m_pdf.ReplaceFontEx(PDFFont, zapf.Path, true);

                default:
                    Console.WriteLine("Unknown font replace {0} -> Arial", StdFontIndex);
                    // Here you could use your own mapping table
                    // In this example we replace the font simply with Arial
                    if (WeightFromStyle(Style) < 500)
                    {
                        // Only the weights 500 and 700 of Arial are installed
                        // by default. If you have also light variants then it is
                        // not required to change the style.
                        Style &= 0xF;
                        Style |= fsRegular;
                    }
                    return m_pdf.ReplaceFont(PDFFont, "Arial", Style, true);
            }
        }

        /// <summary/>
        protected int ReplaceICCProfile(IntPtr Data, Gordic.Report.Implementation.TICCProfileType Type, int ColorSpace)
        {
            Log.Trace($"PDF: ReplaceICCProfile {Type}");
            // The ICC profiles which should be used must normally be configured by the user.
            switch (Type)
            {
                case Gordic.Report.Implementation.TICCProfileType.ictGray:
                    return ReplaceICCProfile(ColorSpace, GetIcc("Gray"));
                case Gordic.Report.Implementation.TICCProfileType.ictRGB:
                    return ReplaceICCProfile(ColorSpace, GetIcc("RGB"));
                case Gordic.Report.Implementation.TICCProfileType.ictCMYK:
                    return ReplaceICCProfile(ColorSpace, GetIcc("CMYK"));
                //case Gordic.Report.Implementation.TICCProfileType.ictGray:
                //    return m_pdf.ReplaceICCProfile(ColorSpace, "c:/Windows/System32/spool/drivers/color/gray_gamma2.2.icm");
                //case Gordic.Report.Implementation.TICCProfileType.ictRGB:
                //    return m_pdf.ReplaceICCProfile(ColorSpace, "c:/Windows/System32/spool/drivers/color/sRGB Color Space Profile.icm");
                //case Gordic.Report.Implementation.TICCProfileType.ictCMYK:
                //    return m_pdf.ReplaceICCProfile(ColorSpace, "c:/Windows/System32/spool/drivers/color/EuropeISOCoatedFOGRA27.icc");
                default: return -1;
            }
        }

        /// <summary/>
        protected bool CheckConformanceCheckResult(int res)
        {
            Log.Trace($"PDF: CheckConformanceCheckResult {res}");
            switch (res)
            {
                case 0:
                    return true;
                case 1:
                    return AddOutputIntent(GetIcc("RGB"));
                case 2:
                    return AddOutputIntent(GetIcc("CMYK"));
                case 3:
                    return AddOutputIntent(GetIcc("Gray"));
                //case 1:
                //case 3:
                //    using (var s = typeof(GPdfAVerifier).Assembly.GetManifestResourceStream("Gordic.Report.Interface.PdfEngine.sRGB.icc"))
                //    {
                //        byte[] b = GIOSupport.StreamToBytes(s);
                //        m_pdf.AddOutputIntentEx(b, b.Length);
                //        Console.WriteLine("sRGB.icc added");
                //    }
                //    return true;
                //case 2:
                //    using (var s = typeof(GPdfAVerifier).Assembly.GetManifestResourceStream("Gordic.Report.Interface.PdfEngine.CoatedFOGRA39.icc"))
                //    {
                //        byte[] b = GIOSupport.StreamToBytes(s);
                //        m_pdf.AddOutputIntentEx(b, b.Length);
                //        Console.WriteLine("CoatedFOGRA39.icc added");
                //    }
                //    return true;
                default:
                    return false;
            }
        }

        #endregion
        #region ICC register
        struct s_icc
        {
            public string file;
            public Assembly asm;
            public string res;
            public s_icc(string file) { this.file = file; this.asm = null; this.res = null; }
            public s_icc(Assembly asm, string res) { this.file = null; this.asm = asm; this.res = res; }
        }
        Dictionary<string, s_icc> m_icc = new Dictionary<string, s_icc>();
        private s_icc GetIcc(string key)
        {
            s_icc ret;
            if (m_icc.TryGetValue(key, out ret)) return ret;
            switch (key)
            {
                case "RGB":
                case "Gray":
                    return new s_icc(typeof(GPdfAVerifier).Assembly, "Gordic.Report.Interface.PdfEngine.sRGB.icc");
                case "CMYK":
                    return new s_icc(typeof(GPdfAVerifier).Assembly, "Gordic.Report.Interface.PdfEngine.EuropeISOCoatedFOGRA27.icc");
            }
            return new s_icc(null);
        }
        public void RegisterIcc(string key, Assembly assembly, string resourceName)
        {
            m_icc.Add(key, new s_icc(assembly, resourceName));
        }
        public void RegisterIcc(string key, string iccFile)
        {
            m_icc.Add(key, new s_icc(iccFile));
        }
        private bool AddOutputIntent(s_icc icc)
        {
            Log.Trace($"PDF: AddOutputIntent");
            if (icc.asm != null)
            {
                using (var s = icc.asm.GetManifestResourceStream(icc.res))
                {
                    byte[] b = GIOSupport.StreamToBytes(s);
                    m_pdf.AddOutputIntentEx(b, b.Length);
                    Console.WriteLine(icc.res + " added");
                }
                return true;
            }
            if (icc.file != null)
            {
                m_pdf.AddOutputIntent(icc.file);
                Console.WriteLine(icc.file + " added");
                return true;
            }
            return false;
        }
        private int ReplaceICCProfile(int ColorSpace, s_icc icc)
        {
            Log.Trace($"PDF: ReplaceICCProfile");
            if (icc.asm != null)
            {
                Console.WriteLine(string.Format("Replacing colorspace {0} with {1}", ColorSpace, icc.res));
                if (icc.file == null)
                {
                    using (var s = icc.asm.GetManifestResourceStream(icc.res))
                    {
                        var tf = new GTempFile();
                        m_temps.Add(tf);
                        GIOSupport.StreamToFile(s, tf.Path);
                        icc.file = tf.Path;
                    }
                }
                return m_pdf.ReplaceICCProfile(ColorSpace, icc.file);
            }
            if (icc.file != null)
            {
                Console.WriteLine(string.Format("Replacing colorspace {0} with {1}", ColorSpace, icc.file));
                return m_pdf.ReplaceICCProfile(ColorSpace, icc.file);
            }
            return -1;
        }
        #endregion
        #region DocInfo

        /// <summary>čtení metadat</summary>
        protected string GetDocInfo(int DInfo)
        {
            Log.Trace($"PDF: GetDocInfo");
            if (m_pdfver < 9) throw new GNotImplementedException(21000080, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            IntPtr di;
            m_pdf.GetDocInfo(DInfo, out di);
            var s = Marshal.PtrToStringUni(di);
            return s;
        }
        /// <summary>zápis metadat</summary>
        protected void SetDocInfo(int DInfo, string text)
        {
            if (m_pdfver < 20 || string.IsNullOrEmpty(text)) 
                m_pdf.SetDocInfo(DInfo, text);
            else
                m_pdf.SetDocInfo2(DInfo, text);
        }

        /// <summary>
        /// Nastaví ve vlastnostech PDF dokumentu položku Autor
        /// </summary>
        /// <param name="text">Název/Jméno autora PDF dokumentu</param>
        public void SetAuthor(string text)
        {
            Log.Trace($"PDF: SetAuthor {text}");
            SetDocInfo(diAuthor, text);
        }

        /// <summary>
        /// Nastaví ve vlastnostech PDF dokumentu položku Aplikace
        /// </summary>
        /// <param name="text">Název aplikace, která PDF dokument vytvořila</param>
        public void SetApplication(string text)
        {
            Log.Trace($"PDF: SetApplication {text}");
            SetDocInfo(diApplication, text);
        }
        /// <summary>
        /// Vlastnost PDF dokumentu Aplikace
        /// </summary>
        public string Application
        {
            get { return GetDocInfo(diApplication); }
            set { SetApplication(value); }
        }

        /// <summary>
        /// Nastaví ve vlastnostech PDF dokumentu položku Klíčová slova
        /// </summary>
        /// <param name="text">Klíčová slova</param>
        public void SetKeyWords(string text)
        {
            Log.Trace($"PDF: SetKeyWords {text}");
            SetDocInfo(diKeyWords, text);
        }

        /// <summary>
        /// Nastaví ve vlastnostech PDF dokumentu položku Tvůrce PDF
        /// </summary>
        /// <param name="text">Tvůrce PDF</param>
        public void SetProducer(string text)
        {
            Log.Trace($"PDF: SetProducer {text}");
            SetDocInfo(diProducer, text);
        }
        /// <summary>
        /// Vlastnost PDF dokumentu Tvůrce PDF
        /// </summary>
        public string Producer
        {
            get { return GetDocInfo(diProducer); }
            set { SetProducer(value); }
        }

        /// <summary>
        /// Nastaví ve vlastnostech PDF dokumentu položku Předmět
        /// </summary>
        /// <param name="text">Předmět</param>
        public void SetSubject(string text)
        {
            Log.Trace($"PDF: SetSubject {text}");
            SetDocInfo(diSubject, text);
        }

        /// <summary>
        /// Nastaví ve vlastnostech PDF dokumentu položku Titul
        /// </summary>
        /// <param name="text">Titul</param>
        public void SetTitle(string text)
        {
            Log.Trace($"PDF: SetTitle {text}");
            SetDocInfo(diTitle, text);
        }
        #endregion
        #region Rasterizer
        public int PageCount
        {
            get
            {
                Log.Trace($"PDF: get PageCount");
                if (m_pdfver < 6) throw new GNotImplementedException(21000070, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
                int pcount; m_pdf.GetPageCount(out pcount); return pcount;
            }
        }
        public System.Drawing.SizeF PageSize(int pageNum)
        {
            Log.Trace($"PDF: PageSize {pageNum}");
            if (m_pdfver < 7) throw new GNotImplementedException(21000074, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            double w = 0.0;
            double h = 0.0;
            m_pdf.GetPageSize(pageNum, ref w, ref h);
            return new System.Drawing.SizeF((float)w, (float)h);
        }
        public System.Drawing.SizeF PageSize()
        {
            Log.Trace($"PDF: PageSize def");
            if (m_pdfver < 11) throw new GNotImplementedException(21000086, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            double w = 0.0;
            double h = 0.0;
            m_pdf.GetPageSize(-1, ref w, ref h);
            return new System.Drawing.SizeF((float)w, (float)h);
        }
        public void SetPageSize(System.Drawing.SizeF size)
        {
            Log.Trace($"PDF: SetPageSize def");
            if (m_pdfver < 11) throw new GNotImplementedException(21000085, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            m_pdf.SetPageSize(-1, size.Width, size.Height);
        }
        public void SetPageSize(int pageNum, System.Drawing.SizeF size)
        {
            Log.Trace($"PDF: SetPageSize {pageNum}");
            if (m_pdfver < 11) throw new GNotImplementedException(21000087, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            m_pdf.SetPageSize(pageNum, size.Width, size.Height);
        }

        public System.Drawing.Size CalcPageSize(int pageNum, System.Drawing.Size ps, int flags)
        {
            Log.Trace($"PDF: CalcPageSize {pageNum}");
            if (m_pdfver < 6) throw new GNotImplementedException(21000071, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            UInt32 w = (UInt32)ps.Width;
            UInt32 h = (UInt32)ps.Height;
            m_pdf.CalcPageSize(pageNum, ref w, ref h, flags);
            return new System.Drawing.Size((int)w, (int)h);
        }
        public System.Drawing.Bitmap ExportToImage(int pageNum, System.Drawing.Size ps, int flags)
        {
            Log.Trace($"PDF: ExportToImage {pageNum}");
            if (m_pdfver < 6) throw new GNotImplementedException(21000072, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            // Create a bitmap in this size
            System.Drawing.Bitmap bmp = new System.Drawing.Bitmap(ps.Width, ps.Height, System.Drawing.Imaging.PixelFormat.Format32bppArgb);
            System.Drawing.Imaging.BitmapData bd = bmp.LockBits(new System.Drawing.Rectangle(new System.Drawing.Point(0, 0), ps), System.Drawing.Imaging.ImageLockMode.WriteOnly, System.Drawing.Imaging.PixelFormat.Format32bppRgb);

            //Implementation.CTM ctm;
            //if (m_pdfver >= 12)
            //    m_pdf.ExportToImage2(pageNum, bd.Scan0, bd.Stride, (UInt32)ps.Width, (UInt32)ps.Height, flags, out ctm);
            //else
            m_pdf.ExportToImage(pageNum, bd.Scan0, bd.Stride, (UInt32)ps.Width, (UInt32)ps.Height, flags);
            bmp.UnlockBits(bd);
            return bmp;
        }
        public System.Drawing.Bitmap ExportToImage(int pageNum, System.Drawing.Size ps, int flags, out Implementation.CTM ctm)
        {
            Log.Trace($"PDF: ExportToImage2 {pageNum}");
            if (m_pdfver < 12) throw new GNotImplementedException(21000120, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            // Create a bitmap in this size
            System.Drawing.Bitmap bmp = new System.Drawing.Bitmap(ps.Width, ps.Height, System.Drawing.Imaging.PixelFormat.Format32bppArgb);
            System.Drawing.Imaging.BitmapData bd = bmp.LockBits(new System.Drawing.Rectangle(new System.Drawing.Point(0, 0), ps), System.Drawing.Imaging.ImageLockMode.WriteOnly, System.Drawing.Imaging.PixelFormat.Format32bppRgb);

            m_pdf.ExportToImage2(pageNum, bd.Scan0, bd.Stride, (UInt32)ps.Width, (UInt32)ps.Height, flags, out ctm);
            bmp.UnlockBits(bd);
            return bmp;
        }
        #endregion
        #region Attachments
        public void InsertAttachment(GBlob attach, string title = null)
        {
            Log.Trace($"PDF: InsertAttachment blob");
            var pth = GTempFiles.CreateTempDirectory();
            try
            {
                var fname = Path.GetFileName(attach.File);
                if (string.IsNullOrEmpty(fname)) fname = "attach.dat";
                fname = Path.Combine(pth, fname);
                GIOSupport.BytesToFile(attach, fname);
                InsertAttachment(fname, title);
            }
            finally
            {
                GTempFiles.DeleteTempDirectory(pth);
            }
        }
        public void InsertAttachment(string fname, string title = null)
        {
            Log.Trace($"PDF: InsertAttachment {fname}");
            if (m_pdfver < 14) throw new GNotImplementedException(21000130, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            m_pdf.InsertAttach(fname, title);
        }
        public struct AttachmentInfo
        {
            public string FileName;
            public string Description;
        }
        public IEnumerable<AttachmentInfo> Attachments
        {
            get
            {
                Log.Trace($"PDF: get Attachments");
                if (m_pdfver < 14) throw new GNotImplementedException(21000131, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
                m_pdf.GetAttachs(out var fnames);
                return fnames.Split(new char[] { '|' }, StringSplitOptions.RemoveEmptyEntries)
                    .Select(s =>
                        {
                            var p = s.Split('=');
                            return new AttachmentInfo()
                            {
                                FileName = p[0],
                                Description = p.Length > 1 ? p[1] : null,
                            };
                        });
            }
        }
        public void SaveAttachment(int index, string fname)
        {
            Log.Trace($"PDF: SaveAttachment {fname}");
            if (m_pdfver < 14) throw new GNotImplementedException(21000132, 36); //RC-EX 36 : Tato PDF funkce není podporována. Máte starou verzi GRR.
            m_pdf.SaveAttach(index, fname);
        }
        #endregion
    }
}
    

