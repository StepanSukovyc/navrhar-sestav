//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.WebClient.GReportOutputInfoDto.cs             </Name>
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
    public class GReportOutputInfoDto : IGDto
    {
        /// <summary>Ctor</summary>
        public GReportOutputInfoDto()
        {}
        
        /// <summary>Vychozi format</summary>
        [JsonProperty("selectedOutputTypeOrDefault")]
        public string SelectedOutputTypeOrDefault { get; set; }

        /// <summary>Formaty</summary>
        [JsonProperty("formats")]
        public IEnumerable<GFormatTypeInfoDto> Formats { get; set; }
    }
}
