//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IBarcodeType.cs                          </Name>
//    <Description> Výčet typů barcodu                                          </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-03-06                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Výčet typů barcodu
    /// </summary>
    public enum BarcodeTypeEnum
    {
        BARCODE_TYPE_CODE11 = 1,
        BARCODE_TYPE_C25MATRIX = 2,
        BARCODE_TYPE_C25INTER = 3,
        BARCODE_TYPE_C25IATA = 4,
        BARCODE_TYPE_C25LOGIC = 6,
        BARCODE_TYPE_C25IND = 7,
        BARCODE_TYPE_CODE39 = 8,
        BARCODE_TYPE_EXCODE39 = 9,
        BARCODE_TYPE_EANX = 13,
        BARCODE_TYPE_EAN128 = 16,
        BARCODE_TYPE_CODABAR = 18,
        BARCODE_TYPE_CODE128 = 20,
        BARCODE_TYPE_DPLEIT = 21,
        BARCODE_TYPE_DPIDENT = 22,
        BARCODE_TYPE_CODE16K = 23,
        BARCODE_TYPE_CODE49 = 24,
        BARCODE_TYPE_CODE93 = 25,
        BARCODE_TYPE_FLAT = 28,
        BARCODE_TYPE_RSS14 = 29,
        BARCODE_TYPE_RSS_LTD = 30,
        BARCODE_TYPE_RSS_EXP = 31,
        BARCODE_TYPE_TELEPEN = 32,
        BARCODE_TYPE_UPCA = 34,
        BARCODE_TYPE_UPCE = 37,
        BARCODE_TYPE_POSTNET = 40,
        BARCODE_TYPE_MSI_PLESSEY = 47,
        BARCODE_TYPE_FIM = 49,
        BARCODE_TYPE_LOGMARS = 50,
        BARCODE_TYPE_PHARMA = 51,
        BARCODE_TYPE_PZN = 52,
        BARCODE_TYPE_PHARMA_TWO = 53,
        BARCODE_TYPE_PDF417 = 55,
        BARCODE_TYPE_PDF417TRUNC = 56,
        BARCODE_TYPE_MAXICODE = 57,
        BARCODE_TYPE_QRCODE = 58,
        BARCODE_TYPE_CODE128B = 60,
        BARCODE_TYPE_AUSPOST = 63,
        BARCODE_TYPE_AUSREPLY = 66,
        BARCODE_TYPE_AUSROUTE = 67,
        BARCODE_TYPE_AUSREDIRECT = 68,
        BARCODE_TYPE_ISBNX = 69,
        BARCODE_TYPE_RM4SCC = 70,
        BARCODE_TYPE_DATAMATRIX = 71,
        BARCODE_TYPE_EAN14 = 72,
        BARCODE_TYPE_CODABLOCKF = 74,
        BARCODE_TYPE_NVE18 = 75,
        BARCODE_TYPE_JAPANPOST = 76,
        BARCODE_TYPE_KOREAPOST = 77,
        BARCODE_TYPE_RSS14STACK = 79,
        BARCODE_TYPE_RSS14STACK_OMNI = 80,
        BARCODE_TYPE_RSS_EXPSTACK = 81,
        BARCODE_TYPE_PLANET = 82,
        BARCODE_TYPE_MICROPDF417 = 84,
        BARCODE_TYPE_ONECODE = 85,
        BARCODE_TYPE_PLESSEY = 86,

        /* Tbarcode 8 codes */
        BARCODE_TYPE_TELEPEN_NUM = 87,
        BARCODE_TYPE_ITF14 = 89,
        BARCODE_TYPE_KIX = 90,
        BARCODE_TYPE_AZTEC = 92,
        BARCODE_TYPE_DAFT = 93,
        BARCODE_TYPE_MICROQR = 97,

        /* Tbarcode 9 codes */
        BARCODE_TYPE_HIBC_128 = 98,
        BARCODE_TYPE_HIBC_39 = 99,
        BARCODE_TYPE_HIBC_DM = 102,
        BARCODE_TYPE_HIBC_QR = 104,
        BARCODE_TYPE_HIBC_PDF = 106,
        BARCODE_TYPE_HIBC_MICPDF = 108,
        BARCODE_TYPE_HIBC_BLOCKF = 110,
        BARCODE_TYPE_HIBC_AZTEC = 112,
    }
}
