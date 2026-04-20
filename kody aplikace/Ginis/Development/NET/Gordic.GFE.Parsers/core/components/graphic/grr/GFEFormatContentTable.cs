//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GFEFormatContentTable.cs                 </Name>
//    <Description> content vnoøené tabulky                                     </Description>
//    <Author>      Ing. Martin Aliger                                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025                  </Copyright>
//    <Created>     2009-08-20                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// content vnoøené tabulky
    /// </summary>
    public class GFEFormatContentTable : GFEFormatContent
    {

        internal GFEFormatContentTable(GFEFormatRegion reg, Gordic.Report.Implementation.IGFormatContentTable t, Gordic.Report.Implementation.IGFormatDevTools dev)
            : base(reg, (Gordic.Report.Implementation.IGFormatContent)t, dev)
        {
        }
    }
}
