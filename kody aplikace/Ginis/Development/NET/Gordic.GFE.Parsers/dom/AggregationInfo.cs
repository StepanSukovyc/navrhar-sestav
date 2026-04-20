//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AggregationInfo.cs                       </Name>
//    <Description> informace o funkci                                          </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2016-10-20                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// informace o funkci
    /// </summary>
    public class AggregationInfo
    {
        /// <summary>
        /// agregační funkce
        /// </summary>
        public string Function { get; set; }
        /// <summary>
        /// indikuje, jestli se jedná o funkci
        /// </summary>
        public bool Aggregate { get; set; }
        /// <summary>
        /// název případné datové položky
        /// </summary>
        public string DataName { get; set; }
    }
}
