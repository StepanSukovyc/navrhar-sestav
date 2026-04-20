//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GBatchesInfoDto.cs                  </Name>
//    <Description> Rozsireni pro batch files                                   </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-02-17                                                  </Created>
//  </FileHeader>

using Gordic.General.ApplicationInterface;
using Newtonsoft.Json;

namespace Gordic.Report.Interface
{
    /// <summary>Rozsireni pro batch files</summary>
    public class GBatchesInfoDto : GFileInfoDto
    {
        /// <summary>ctor</summary>
        public GBatchesInfoDto()
        {}

        /// <summary>Copy ctor</summary>
        public GBatchesInfoDto(GFileInfoDto fi):base(fi)
        {
            if (fi is GBatchesInfoDto b) 
            {
                IsMainFileEmpty = b.IsMainFileEmpty; 
            }
        }

        /// <summary>Nazev adresare obs. files</summary>
        [JsonProperty("directory")]
        public string Directory { get; set; }

        /// <summary>Seznam souboru v adresari</summary>
        [JsonProperty("files")]
        public string[] Files { get; set; }

        /// <summary>Hlavni soubor ke stazeni neexistuje (jsou k dispozici jen prop. Files)</summary>
        [JsonProperty("isMainFileEmpty")]
        public bool IsMainFileEmpty { get; set; }
    }
}
