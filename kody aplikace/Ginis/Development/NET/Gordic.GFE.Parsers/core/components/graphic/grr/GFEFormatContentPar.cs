//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GFEFormatContentPar.cs                   </Name>
//    <Description> PAR (odstavec)                                              </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2015-05-27                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// PAR (odstavec)
    /// </summary>
    public class GFEFormatContentPar : GFEFormatContainer
    {

        /// <summary>
        /// konstruktor tøídy
        /// </summary>
        /// <param name="reg"></param>
        /// <param name="cell"></param>
        /// <param name="dev"></param>
        public GFEFormatContentPar(GFEFormatRegion reg, Gordic.Report.Implementation.IGFormatContentPar cell, Gordic.Report.Implementation.IGFormatDevTools dev = null)
            : base(reg, (Gordic.Report.Implementation.IGFormatContainer)cell, dev)
        {
        }
    }
}
