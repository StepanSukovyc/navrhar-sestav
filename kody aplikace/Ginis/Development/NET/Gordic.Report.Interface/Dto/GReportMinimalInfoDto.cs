//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GReportMinimalInfoDto.cs            </Name>
//    <Description> Nejnutnější info o sestave                                  </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-03-29                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gordic.Report.Interface
{
    /// <summary>Nejnutnější info o sestavě</summary>
    [Serializable]
    public class GReportMinimalInfoDto : IGDto
    {
        /// <summary>IXS_ALV</summary>
        [JsonProperty("ixsAlv")]
        public GString IxsAlv { get; set; }

        /// <summary>ID_SES</summary>
        [JsonProperty("idSes")]
        public GString IdSes { get; set; }

        /// <summary>DAT_MODIF</summary>
        [JsonProperty("datModif")]
        public GString DatModif { get; set; }

        /// <summary>Nejnutnější info o sestavě</summary>        public static GReportMinimalInfoDto FromReport(IGReport report)
        {
            return new GReportMinimalInfoDto()
            {
                IxsAlv = GString.Parse(report.CommonInfos["IXS_ALV"], true),
                IdSes = GString.Parse(report.CommonInfos["ID_SES"], true),
                DatModif = GString.Parse(report.CommonInfos["DAT_MODIF"], true),
            };
        }
    }
}
