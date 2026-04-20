//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GReportDmsInfoDto.cs                </Name>
//    <Description> DTO s info k ulozeni do DMS                                 </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2019                            </Copyright>
//    <Created>     2019-01-15                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gordic.Report.Interface
{
    /// <summary>DTO s info k ulozeni do DMS</summary>
    public class GReportDmsInfoDto : IGDto
    {
        /// <summary>Sestava ma byt ulozena?</summary>
        [JsonProperty("shouldSave")]
        public bool ShouldSave { get; set; }

        /// <summary>Zpusob ulozeni</summary>
        [JsonProperty("zpusobUlozeni")]
        public int ZpusobUlozeni { get; set; }

        /// <summary>Ma se zobrazit vyzva k ulozeni?</summary>
        [JsonProperty("shouldShowConfirmation")]
        public bool ShouldShowConfirmation { get; set; }

        /// <summary>Ma se zobrazit vyzva k ulozeni? (Toto je varianta z reportu)</summary>
        [JsonProperty("shouldShowConfirmationRep")]
        public bool ShouldShowConfirmationRep { get; set; }

        /// <summary>Ma se zobrazit vyber uloziste?</summary>
        [JsonProperty("shouldShowConfirmationChoice")]
        public bool ShouldShowConfirmationChoice { get; set; }

        /// <summary>Ma byt zobrazeny podpis?</summary>
        [JsonProperty("shouldShowSignature")]
        public bool ShouldShowSignature { get; set; }

        /// <summary>Melo by byt podepsano?</summary>
        [JsonProperty("shouldMakeSignature")]
        public bool ShouldMakeSignature { get; set; }

        /// <summary>Melo by se zobrazit razitkovani?</summary>
        [JsonProperty("shouldShowTimestamp")]
        public bool ShouldShowTimestamp { get; set; }

        /// <summary>Melo melo byt se razitkovat?</summary>
        [JsonProperty("shouldMakeTimestamp")]
        public bool ShouldMakeTimestamp { get; set; }

        /// <summary>Ixp</summary>
        [JsonProperty("ixp")]
        public string Ixp { get; set; }

        /// <summary>IXS duvodu podpisu</summary>
        [JsonProperty("ixsDpo")]
        public string IxsDpo { get; set; }

        #region Ulozene ihned po vygenerovani

        //NOTE: Je problem dat referenci na Gordic.Wfl.Interface, pry vznikne kruhova zavislost. Spravny typ vsak je v komentari
        [JsonProperty("prepared")]
        public /*Gordic.Wfl.Interface.GReportSaveDto*/ object Prepared { get; set; }

        [JsonProperty("ixbNew")]
        public string IxbNew { get; set; }

        [JsonProperty("ixpNew")]
        public string IxpNew { get; set; }

        [JsonProperty("ixsFrm")]
        public string IxsFrm { get; set; }

        [JsonProperty("ixsAlv")]
        public string IxsAlv { get; set; }

        #endregion
    }
}
