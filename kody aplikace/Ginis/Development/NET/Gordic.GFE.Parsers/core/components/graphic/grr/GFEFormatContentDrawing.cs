//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GFEFormatContentDrawing.cs               </Name>
//    <Description> content s vektorovou grafikou                               </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-15                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// content s vektorovou grafikou
    /// </summary>
    public class GFEFormatContentDrawing : GFEFormatContent
    {

        internal GFEFormatContentDrawing(GFEFormatRegion reg, Gordic.Report.Implementation.IGFormatContentDrawing t, Gordic.Report.Implementation.IGFormatDevTools dev)
            : base(reg, (Gordic.Report.Implementation.IGFormatContent)t, dev)
        {
        }
    }
}
