//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GFEFormatContentTextbox.cs               </Name>
//    <Description> Textbox content                                             </Description>
//    <Author>      Ing. Martin Aliger                                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025                  </Copyright>
//    <Created>     2009-08-20                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Textbox content
    /// </summary>
    public class GFEFormatContentTextbox : GFEFormatContent
    {
        internal GFEFormatContentTextbox(GFEFormatRegion reg, Gordic.Report.Implementation.IGFormatContentTextbox t, Gordic.Report.Implementation.IGFormatDevTools dev)
            : base(reg, (Gordic.Report.Implementation.IGFormatContent)t, dev)
        {
        }
    }
}
