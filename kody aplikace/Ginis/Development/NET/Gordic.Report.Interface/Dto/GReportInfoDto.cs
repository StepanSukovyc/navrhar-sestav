//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.WebClient.GReportInfoDto.cs                   </Name>
//    <Description> Info o sestave                                              </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2019                            </Copyright>
//    <Created>     2019-06-20                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gordic.Report.Interface
{
    /// <summary>Info o sestave</summary>
    [Serializable]
    public class GReportInfoDto : GReportMinimalInfoDto
    {
        /// <summary>ctor</summary>
        public GReportInfoDto()
        {}

        /// <summary></summary>
        [JsonProperty("isAktivni")]
        public bool IsAktivni { get; set; }

        /// <summary></summary>
        [JsonProperty("outputInfo")]
        public GReportOutputInfoDto OutputInfo { get; set; }

        #region GReportInfo

        /// <summary>Graficka</summary>
        [JsonProperty("graficka")]
        public bool Graficka { get; set; }

        /// <summary>IxsStr</summary>
        [JsonProperty("ixsStr")]
        public string IxsStr { get; set; }

        ///// <summary>IxsAlv</summary>
        //[JsonProperty("ixsAlv")]
        //public string IxsAlv { get; set; }

        /// <summary>IxsXme</summary>
        [JsonProperty("ixsXme")]
        public string IxsXme { get; set; }

        /// <summary>FormVyst</summary>
        [JsonProperty("formVyst")]
        public string FormVyst { get; set; }

        /// <summary>TypVyst</summary>
        [JsonProperty("typVyst")]
        public string TypVyst { get; set; }

        /// <summary>Nazev</summary>
        [JsonProperty("nazev")]
        public string Nazev { get; set; }

        /// <summary>TypAlv</summary>
        [JsonProperty("typAlv")]
        public string TypAlv { get; set; }

        ///// <summary>IdSes</summary>
        //[JsonProperty("idSes")]
        //public string IdSes { get; set; }

        /// <summary>Tema</summary>
        [JsonProperty("tema")]
        public string Tema { get; set; }

        #endregion

        [JsonProperty("alv")]
        [GTypeScript(Type = "ObjectLiteral<string>")]
        public IDictionary<string,string> Alv { get; set; }

        /// <summary>Podmonozina commoninfos</summary>
        [JsonProperty("commonInfos")]
        [GTypeScript(Type = "ObjectLiteral<string>")]
        public IDictionary<string,string> CommonInfos { get; set; }

        /// <summary>Lze sestavu odlozit?</summary>
        [JsonProperty("isOdlozitelne")]
        public bool IsOdlozitelne { get; set; }

        /// <summary>Info o sestavě</summary>
        public static new GReportInfoDto FromReport(IGReport report)
        {
            return new GReportInfoDto()
            {
                IxsAlv = GString.Parse(report.CommonInfos["IXS_ALV"], true),
                IdSes = GString.Parse(report.CommonInfos["ID_SES"], true),
                DatModif = GString.Parse(report.CommonInfos["DAT_MODIF"], true),
                CommonInfos = new Dictionary<string, string>()
                {
                    ["NAZEV"] = report.CommonInfos["NAZEV"]?.ToString(),
                    ["FILE_NAME"] = report.CommonInfos["FILE_NAME"]?.ToString(),

                    ["ZPUS_ULOZ"] = report.CommonInfos["ZPUS_ULOZ"]?.ToString(),
                    ["PRIMY_TISK"] = report.CommonInfos["PRIMY_TISK"]?.ToString(),
                }
            };
        }
    }
}
