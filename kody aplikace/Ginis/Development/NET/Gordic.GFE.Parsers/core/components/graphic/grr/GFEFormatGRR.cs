//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        GFEFormat.cs                                </Name>
//    <Description> Parser formatu (ALF)                        </Description>
//    <Author>      Ing. Martin Aliger                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025  </Copyright>
//    <Created>     2006-10-05                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// 
    /// </summary>
    public class GFEFormatGRR : GFEFormat
    {
        internal GFEFormatGRR(Gordic.Report.Implementation.IGFormatGRR fmt, GFETempDir temp)
            : base((Gordic.Report.Implementation.IGFormat)fmt, temp)
        {
        }

    }
}
