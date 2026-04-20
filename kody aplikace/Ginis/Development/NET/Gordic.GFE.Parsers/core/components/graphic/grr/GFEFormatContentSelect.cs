//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GFEFormatContentSelect.cs                </Name>
//    <Description> SELECT (rozeskok)                                           </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2015-05-27                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// SELECT (rozeskok)
    /// </summary>
    public class GFEFormatContentSelect : GFEFormatContentPar
    {

        /// <summary>
        /// konstruktor tøídy
        /// </summary>
        /// <param name="reg"></param>
        /// <param name="cell"></param>
        /// <param name="dev"></param>
        public GFEFormatContentSelect(GFEFormatRegion reg, Gordic.Report.Implementation.IGFormatContentSelect cell, Gordic.Report.Implementation.IGFormatDevTools dev = null)
            : base(reg, (Gordic.Report.Implementation.IGFormatContentPar)cell, dev)
        {
        }
    }
}
