//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.PdfAVerifier.cs                     </Name>
//    <Description> Ověření a konverze PDF/A. Wrapuje unmanaged knihovnu DynaPDF</Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2014                            </Copyright>
//    <Created>     2014-01-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.InteropServices;
using Gordic.General;
using Gordic.Report.Implementation;

namespace Gordic.Report.Interface
{
    /// <summary>
    /// Ověření a konverze PDF/A. Wrapuje unmanaged knihovnu DynaPDF
    /// </summary>
    [System.Security.SecurityCritical]
    public class GPdfAVerifier : GPdfEngine
    {
        static readonly IGLogger Log = GLogManager.CurrentClassLogger();

        /// <summary>Konstruktor</summary>
        public GPdfAVerifier()
            : base(3)
        {
        }

        internal enum TConformanceType
        {
            ctPDFA_1b_2005,  // Convert the file to PDF/A if possible
            ctNormalize,     // Check the file for errors, rebuild all embedded fonts plus options
            ctPDFA_2b,       // Convert the file to PDF/A 2b if possible
            ctPDFA_3b,       // Convert the file to PDF/A 3b if possible
        }
        internal string ConformanceString(TConformanceType t)
        {
            switch (t)
            {
                case TConformanceType.ctPDFA_1b_2005:
                case TConformanceType.ctNormalize:
                    return "PDF/A-1b";
                case TConformanceType.ctPDFA_2b:
                    return "PDF/A-2b";
                case TConformanceType.ctPDFA_3b:
                    return "PDF/A-3b";
                default:
                    return "???";
            }
        }
        [Flags]
        internal enum TCheckOptions: uint
        {
            //GDefault = coDefault,
            coDefault = 0x0010FFFF,
            coEmbedSubsets = 0x00000001,
            coDeleteTransferFuncs = 0x00000002,
            coDeleteMultiMediaContents = 0x00000004,
            coDeleteActionsAndScripts = 0x00000008,
            coDeleteInvRenderingIntent = 0x00000010,
            coFlattenFormFields = 0x00000020,
            coReplaceV4ICCProfiles = 0x00000040,
            coDeleteEmbeddedFiles = 0x00000080,
            coDeleteOPIComments = 0x00000100,
            coDeleteSignatures = 0x00000200,
            coDeletePostscript = 0x00000400, // Delete Postscript XObjects. Rarely used and such Postscript fragments are meaningful on a Postscript device only.
            // It is usually safe to delete such objects.
            coDeleteAlternateImages = 0x00000800, // Alternate images are seldom used and prohibited in PDF/A.
            coReComprJPEG2000Images = 0x00001000, // Recompression results usually in larger images. It is often better to keep such files as is.
            coResolveOverprint = 0x00002000, // PDF/A 2 and 3. Set the overprint mode to 0 if overprint mode = 1 and if overprinting for fill or stroke is true
            // and if an ICCBased CMYK color space is used. Note that DeviceCMYK is treated as ICCBased color space due to implicit
            // color conversion rules.
            coMakeLayerVisible = 0x00004000, // PDF/A 2 and 3 prohibit invisible layers. Layers can also be flattened if this is no option.
            coDeleteAppEvents = 0x00008000, // PDF/A 2 and 3. Application events are prohibited in PDF/A. The view state will be applied.
            coReplCCITTFaxWithFlate = 0x00010000, // Replace CCITT Fax compression with Flate.
            coApplyExportState = 0x00020000, // Meaningful only if coDeleteAppEvents is set. Apply the export state.
            coApplyPrintState = 0x00040000, // Meaningful only if coDeleteAppEvents is set. Apply the print state.
            coDeleteReplies = 0x00080000, // Delete annotation replies. If absent, replies will be converted to regular text annotations.
            coDeleteHalftones = 0x00100000, // Delete halftone screens. 
            coFlattenLayers        =    0x00200000, // Flatten layers if any.
            coDeletePresentation   =    0x00400000, // Presentations are prohibited in PDF/A 2 and 3.
            coCheckImages          =    0x00800000, // If set, images will be decompressed to identify damaged images.
            coDeleteDamagedImages  =    0x01000000, // Meaningful only if coCheckImages is set.
            coRepairDamagedImages  =    0x02000000, // Meaningful only if coCheckImages is set. If set, try to recompress a damaged image. The new image is maybe not complete but error free.
            coNoFontEmbedding = 0x10000000, // If this flag is set no valid PDF/A file will be produced!
            coFlushPages = 0x20000000, // Write converted pages directly into the output file to reduce the memory usage.
            coAllowDeviceSpaces     =   0x40000000, // If set, device color spaces will not be replaced with ICC based color spaces. This flag is meaningful for normalization only.
            coResetAnnotAppearance  =   0x80000000, // If set, appearance streams of annotations are rebuild before executing CheckConformance().
        }
        internal static TCheckOptions DefaultCheckOptions(TConformanceType type, bool checkImages = false)
        {
            //            // Common default flags for normalization:
            //#define coDefault_Normalize        (coAllowDeviceSpaces | coNoFontEmbedding)
            //            // Common default flags for different PDF/A versions:
            //#define coDefault_PDFA_1           (coDefault | coFlattenLayers)               // The ability to flatten layers was added after coDefault was defined.
            //#define coDefault_PDFA_2           (coDefault | coDeletePresentation)          // Presentations are prohibited in PDF/A 2 and PDF/A 3.
            //#define coDefault_PDFA_3           (coDefault_PDFA_2 & ~coDeleteEmbeddedFiles) // Embedded files are allowed in PDF/A 3.

            TCheckOptions o = 0;
            if (checkImages)
            {
                //o = coRepairDamagedImages coDeleteDamagedImages  coCheckImages
                o = TCheckOptions.coDeleteDamagedImages | TCheckOptions.coCheckImages;
            }

            switch (type)
            {
                case TConformanceType.ctNormalize: return o | TCheckOptions.coAllowDeviceSpaces | TCheckOptions.coNoFontEmbedding;
                case TConformanceType.ctPDFA_1b_2005: return o | TCheckOptions.coDefault | TCheckOptions.coFlattenLayers;
                case TConformanceType.ctPDFA_2b: return o | TCheckOptions.coDefault | TCheckOptions.coDeletePresentation;
                case TConformanceType.ctPDFA_3b: return (o | TCheckOptions.coDefault | TCheckOptions.coDeletePresentation) & ~TCheckOptions.coDeleteEmbeddedFiles;
            }
            throw new GArgumentOutOfRangeException(21000142);
        }

        /// <summary>Validace vstupního souboru a konverze do výstupního souboru PDF/A-1b</summary>
        public bool Validate(string input_file, bool normalize = false, string output_file = null)
        {
            return ValidateA1(input_file, normalize, output_file);
        }
        /// <summary>Validace vstupního souboru a konverze do výstupního souboru PDF/A-1b</summary>
        public bool ValidateA1(string input_file, bool normalize = false, string output_file = null)
        {
            return ValidateInternal(input_file, normalize, output_file, TConformanceType.ctPDFA_1b_2005);
        }
        /// <summary>Validace vstupního souboru a konverze do výstupního souboru PDF/A-2b</summary>
        public bool ValidateA2(string input_file, bool normalize = false, string output_file = null)
        {
            return ValidateInternal(input_file, normalize, output_file, TConformanceType.ctPDFA_2b);
        }
        /// <summary>Validace vstupního souboru a konverze do výstupního souboru PDF/A-3b</summary>
        public bool ValidateA3(string input_file, bool normalize = false, string output_file = null)
        {
            return ValidateInternal(input_file, normalize, output_file, TConformanceType.ctPDFA_3b);
        }

#if NETFRAMEWORK
        [System.Runtime.ExceptionServices.HandleProcessCorruptedStateExceptions]
#endif
        [System.Security.SecurityCritical]
        private bool ValidateInternal(string input_file, bool normalize, string output_file, TConformanceType conf)
        {
            Log.Trace($"PDF: Validate {input_file} {normalize} {output_file} {conf}");
            try
            {
                if (normalize)
                {
                    Console.WriteLine("GORDIC PDF Normalizer " + typeof(GPdfAVerifier).Assembly.GetName().Version.ToString());
                }
                else
                {
                    Console.WriteLine("GORDIC PDF Validator " + typeof(GPdfAVerifier).Assembly.GetName().Version.ToString());
                }
                Console.WriteLine("DynaPDF version " + DynaPDFVersion);

                NewPdf(output_file);
                if (m_pdfver >= 9)
                {
                    this.Application = null; //prevezme z Importovaneho
                    this.Producer = null; //prevezme z Importovaneho
                }

                m_pdf.SetImportFlags(ifImportAll | ifImportAsPage | ifPrepareForPDFA);
                if (normalize)
                    m_pdf.SetImportFlags2(if2UseProxy | if2Normalize);
                else
                    m_pdf.SetImportFlags2(if2UseProxy);

                MergeIn(input_file, setProducer: false);
                if (GetInPDFVersion() < 0)
                    return false;
                //Merge dela:
                //	m_PDF->OpenImportFile(pdf,DynaPDF::ptOpen,0);
                //  m_PDF->ImportPDFFile(m_PDF->GetPageCount() + 1, 1.0, 1.0);
                //ale uz ne!  m_PDF->CloseImportFile();

                Console.WriteLine("Input PDF {0} version {1}", Path.GetFileName(input_file), GetInPDFVersionStr());

                string title = (normalize ? "GORDIC PDF Normalizer" : "GORDIC PDF Validator") + " " + DynaPDFVersion;

                if (m_pdfver >= 9)
                {
                    this.Producer = this.Producer + " (" + title + ")";
                    this.Application = this.Application + " (" + title + ")";
                }
                else
                {
                    this.Producer = title;
                    this.Application = title;
                }


                TOnFontNotFoundProc font = FontNotFound; // output_file != null ? FontNotFound : (TOnFontNotFoundProc)null;
                TOnReplaceICCProfile icc = ReplaceICCProfile; // output_file != null ? ReplaceICCProfile : (TOnReplaceICCProfile)null;

                int err;
                //if (normalize)
                //{
                //    err = m_pdf.CheckConformance((int)TConformanceType.ctNormalize, (int)TCheckOptions.GDefault, IntPtr.Zero, font, icc);
                //    if (err != 0)
                //    {
                //        Console.WriteLine("Normalization fails with code " + err);
                //        //return CheckConformanceCheckResult(err_norm);
                //    }
                //}
                //else
                {
                    // Check whether the file is compatible to PDF/A 1b
                    //ref T46543 po dohodě s @mhalik nastavujeme (alespoň dočasně) odstranění nevalidních obrázků pro validaci i normalizaci.
                    err = m_pdf.CheckConformance((int)conf, (int)DefaultCheckOptions(conf, checkImages: true), IntPtr.Zero, font, icc);
                }

                switch (err)
                {
                    case 0:
                        Log.Info($"PDF: {input_file} file is fully compatible to {ConformanceString(conf)}.");
                        Console.WriteLine($"The PDF file is fully compatible to {ConformanceString(conf)}");
                        break;
                    case 1: // RGB
                        Log.Info($"PDF: {input_file} RGB output not configured.");
                        Console.WriteLine("RGB output not configured.");
                        if (output_file == null) return false;
                        if (CheckConformanceCheckResult(err) == false) return false;
                        break;
                    case 3: // Gray
                        Log.Info($"PDF: {input_file} Gray output not configured.");
                        Console.WriteLine("Gray output not configured.");
                        if (output_file == null) return false;
                        if (CheckConformanceCheckResult(err) == false) return false;
                        break;
                    case 2: // CMYK
                        Log.Info($"PDF: {input_file} CMYK output is not configured.");
                        Console.WriteLine("CMYK output is not configured.");
                        if (output_file == null) return false;
                        if (CheckConformanceCheckResult(err) == false) return false;
                        break;
                    default:
                        Log.Info($"PDF: {input_file} file is not a {ConformanceString(conf)} or failed to validate.");
                        Console.WriteLine($"Not a {ConformanceString(conf)} or failed to validate.");
                        return false;
                }
                if (output_file != null)
                {
                    Console.WriteLine("Outputting " + ConformanceString(conf) + " to: {0}", output_file);
                    m_pdf.CloseFile();
                }
                return true;
            }
            catch (AccessViolationException e)
            {
                Log.Warn(e, "PDF error");
                Console.WriteLine(e.Message);
                throw new GException(21000078, 39); //RC-EX 39 : PDF Validator skončil závažnou chybou
            }
            catch (Exception e)
            {
                Log.Warn(e, "PDF error");
                Console.WriteLine(e.Message);
                throw;
            }
        }

    }
}
