//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GCreateReportAsyncDto.cs            </Name>
//    <Description> DTO pro generovani sestavy pres async. ulohu                </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-01-27                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.General.ApplicationInterface;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Gordic.Report.Interface
{
    /// <summary>DTO pro generovani sestavy pres async. ulohu</summary>
    [Serializable]
    public class GCreateReportAsyncDto : IGDto
    {
        /// <summary>Id sestavy (wrid)</summary>
        [JsonProperty("id")]
        public string Id { get; set; }

        /// <summary>Nazev sestavy</summary>
        [JsonProperty("name")]
        public string Name { get; set; }

        /// <summary>Platnost</summary>
        [JsonProperty("platnost")]
        public string Platnost { get; set; }

        /// <summary>Parametry reportu (X0000 - X0009 i dalsi vlastni)</summary>
        [JsonProperty("params")]
        [GTypeScript(Type = "ObjectLiteral<string>")]
        public Dictionary<string, object> Params { get; set; }

        /// <summary>CommonInfos (smerem na server plna verze, smerem do JS oklestena na vybrane hodnoty)</summary>
        [JsonProperty("commonInfos")]
        [GTypeScript(Type = "ObjectLiteral<any>")]
        public Dictionary<string, object> CommonInfos { get; set; }

        /// <summary>Vypnuti serializace do TS (serializaci na APG by to melo prezit diky tomu, ze se tam pouziva jiny serializer)</summary>
        public virtual bool ShouldSerializeCommonInfos()
        {
            return false;
        }

        /// <summary>Kontext generovani (pozor, co se tam uklada, posila se vsude!)</summary>
        [JsonProperty("context")]
        [GTypeScript(Type = "ObjectLiteral<any>")]
        public Dictionary<string, object> Context { get; set; }

        /// <summary>Hodnoty z posledniho custom dialogu</summary>
        [JsonProperty("dialogValues")]
        [GTypeScript(Type = "ObjectLiteral<any>")]
        public Dictionary<string, object> DialogValues { get; set; }

        /// <summary>Trida pro generovani v async. uloze</summary>
        [JsonProperty("reportGeneratorTypeAsync")]
        public string ReportGeneratorTypeAsync { get; set; }

        /// <summary>Parametry pro beh generatoru</summary>
        [JsonProperty("reportGeneratorParams")]
        public string ReportGeneratorParams { get; set; }

        /// <summary>RestrictionAlf</summary>
        [JsonProperty("restrictionAlf")]
        public string RestrictionAlf { get; set; }

        /// <summary>Nacist data sestavy?</summary>
        [JsonProperty("loadData")]
        public bool LoadData { get; set; }

        /// <summary>State: 0 = initialized, 3 - running, 5 - report byl uspesne vygenerovan, 6 - vyskytla se vyjimka, 7 - generovani bylo zruseno, 8 - custom dialog</summary>
        [JsonProperty("state")]
        public int State { get; set; }

        /// <summary>Vygenerovany soubor</summary>
        [JsonProperty("fileInfo")]
        public GFileInfoDto FileInfo { get; set; }

        /// <summary>DmsInfo</summary>
        [JsonProperty("dmsInfo")]
        public GReportDmsInfoDto DmsInfo { get; set; }

        /// <summary>Nazev aplikace, ktere sestava patri</summary>
        [JsonProperty("appName")]
        public string AppName { get; set; }
    }

    /// <summary>Vysledek generovani (muze byt i jen dilci step)</summary>
    [Serializable]
    public class GReportGenerateResultAsyncDto : GCreateReportAsyncDto
    {
        /// <summary>Custom Dialog sestavy</summary>
        [JsonProperty("customDialog")]
        public GCustomDialogDto CustomDialogDto { get; set; }

        /// <summary>Data z vygenerovane sestavy (je-li pozadovano pres prop. LoadData = true)</summary>
        [JsonProperty("data")]
        public object Data { get; set; }

        /// <summary>Zapnutí serializace do TS - zde jsou jiz commonInfos oklestene pouze o potrebne hodnoty</summary>
        public override bool ShouldSerializeCommonInfos()
        {
            return true;
        }
    }

    /// <summary>Progress async. ulohy generovane sestavy</summary>
    [Serializable]    public class GAsyncReportProgressDto : GAsyncProgressDto
    {
        /// <summary>Nazev sestavy</summary>
        [JsonProperty("name")]
        public string Name { get; set; }

        /// <summary>Nazev aplikace, ktere sestava patri</summary>
        [JsonProperty("appName")]
        public string AppName { get; set; }
    }
}
