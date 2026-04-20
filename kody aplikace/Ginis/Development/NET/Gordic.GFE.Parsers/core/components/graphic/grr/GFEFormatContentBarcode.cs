//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GFEFormatContentBarcode.cs               </Name>
//    <Description> Barcode content                                             </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-15                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Barcode content
    /// </summary>
    public class GFEFormatContentBarcode : GFEFormatContentImage
    {


        internal GFEFormatContentBarcode(GFEFormatRegion reg, Gordic.Report.Implementation.IGFormatContentBarcode t, Gordic.Report.Implementation.IGFormatDevTools dev)
            : base(reg, (Gordic.Report.Implementation.IGFormatContentImage)t, dev)
        {
        }

        //public override void Dispose()
        //{
        //    base.Dispose();
        //}

    }
}
