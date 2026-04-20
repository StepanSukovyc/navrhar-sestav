//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GReportProgressDto.cs               </Name>
//    <Description> Udaje progresu generovani sestavy                           </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-01-09                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Newtonsoft.Json;
using System;

namespace Gordic.Report.Interface
{
    /// <summary>Udaje progresu generovani sestavy</summary>
    [Serializable]
    public class GReportProgressDto : IGDto
    {
        /// <summary>V TK spodni popisek</summary>
        [JsonProperty("bottomLabel")]
        public string BottomLabel { get; set; }

        /// <summary>Canceled</summary>
        [JsonProperty("cancelled")]
        public bool Cancelled { get; set; }

        /// <summary>V TK popisek okna</summary>
        [JsonProperty("caption")]
        public string Caption { get; set; }

        /// <summary>V TK horni popisek (nad teplomerem?)</summary>
        [JsonProperty("topLabel")]
        public string TopLabel { get; set; }

        /// <summary>Hodnota progresu</summary>
        [JsonProperty("value")]
        public int Value { get; set; }
    }
}
