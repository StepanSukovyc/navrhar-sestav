//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.WebClient.GFormatTypeInfoDto.cs               </Name>
//    <Description> Pomocna trida pro udrzeni informaci o formatu               </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2019                            </Copyright>
//    <Created>     2019-01-15                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.Report.Interface;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gordic.Report.Interface
{
    /// <summary>Pomocna trida pro udrzeni informaci o formatu</summary>
    public class GFormatTypeInfoDto : IGDto
    {
        /// <summary>Default ctor</summary>
        public GFormatTypeInfoDto()
        {}

        /// <summary>Skupina formatu</summary>
        [JsonProperty("group")]
        [JsonIgnore]
        public GFormatingGroup Group { get; set; }

        /// <summary>Pripona soubour</summary>
        [JsonProperty("extension")]
        [GTypeScript(AllowNull = false, AllowUndefined = false)]
        public string Extension { get; set; }

        /// <summary>Popis formatu</summary>
        [JsonProperty("description")]
        [GTypeScript(AllowNull = false, AllowUndefined = false)]
        public string Description { get; set; }
    }
}
