//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GFEFormatGRFBlock.cs                     </Name>
//    <Description> Parser formatu (ALF) - øádek RTF                            </Description>
//    <Author>      Ing. Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2006-11-28                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// 
    /// </summary>
    public class GFEFormatGRFPart : GFEFormatTag
    {
        internal GFEFormatGRFPart(GFEFormatRegion reg, Report.Implementation.IGFormatGrfContainer cnt, Report.Implementation.IGFormatDevTools dev)
            : base(reg, (Report.Implementation.IGFormatTag)cnt, dev)
        {
        }
    }
}
