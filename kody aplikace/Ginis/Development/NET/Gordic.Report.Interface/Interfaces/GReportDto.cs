//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GReportDto.cs                       </Name>
//    <Description> Dto pro prenost informaci k IGReport                        </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2017                            </Copyright>
//    <Created>     2017-03-17                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using Gordic.General;
using Gordic.General.ApplicationInterface;
using Newtonsoft.Json;

namespace Gordic.Report.Interface
{

	/// <summary>
	/// Dto pro prenost informaci k IGReport
	/// </summary>
    [System.Security.SecurityCritical]
	public class GReportDto : IGDto
	{
		/// <summary>Typ reportu</summary>
		public GReportType Type { get; set; }

        /// <summary>Typ distribuce sestavy. Rozlišení uživatelských a distribuèních sestav</summary>
        public GReportDistributionType DistributionType { get; set; }
        /// <summary>
        /// Kolekce spoleèných Info sekcí sestavy
        /// </summary>
        public Dictionary<string, object> CommonInfos { get; set; }

		/// <summary>
		/// Všechny možné pohledy na tuto sestavu
		/// </summary>
		public List<GVisualRepresentationDto> VisualRepresentationsOrdered { get; set; }
        /// <summary>
        /// Index výchozího formátu v VisualRepresentationsOrdered
        /// </summary>
        public int DefaultVisualRepresentation { get; set; }

        /// <summary>
        /// Nastavitelné parametry reportu použité pøi generování sestavy
        /// </summary>
        public Dictionary<string, object> Parameters { get; set; }

        ///// <summary>
        ///// Nastavitelné parametry prohlížeèe
        ///// </summary>
        //IDictionary ViewerParameters
        //{
        //	get;
        //}

        /// <summary>
        /// Identita reportu. Podle tohoto lze report kdykoliv opìt vyhledat.
        /// </summary>
        public GReportIdentity Identity { get; set; }

        /// <summary>
        /// Urèuje odkud se mají brát reporty
        /// </summary>
        public GReportSource ReportSource { get; set; }


        /// <summary>
        /// Stav v jakém je právì teï sestava
        /// </summary>
        public GReportState State { get; set; }

        /// <summary>
        /// Doposud vygenerované soubory, hlavnì pro pokraèování (Continue)
        /// </summary>
        [JsonIgnore]
        public GMemoryFiles Files { get; set; }
    }

    /// <summary>
    /// Reprezentuje jednotlivý pohled na data.
    /// </summary>
    /// <remarks>
    /// Pohled na data, u grafických sestav odpovídá jednotlivým souborùm .alf, u textových sestav
    /// je toto rozhraní pouze jedno a vychází z .alv
    /// </remarks>
    [System.Security.SecurityCritical]
    public class GVisualRepresentationDto : IGDto
    {
        /// <summary>
        /// Kolekce Info sekcí pohledu.
        /// </summary>
        public Dictionary<string, object> LocalInfos { get; set; }
    }

    [System.Security.SecurityCritical]
    [Serializable]
    public class GReportFilesDto : IGDto, System.Runtime.Serialization.ISerializable //i JSON serializace použije ISerializable implementaci
    {
        /// <summary>
        /// Vygenerované soubory
        /// </summary>
        public GMemoryFiles Files { get; set; }

        public GReportFilesDto()
        {
        }
        private GReportFilesDto(SerializationInfo info, StreamingContext context)
        {
            //deserializace
            Files = new GMemoryFiles(3);
            foreach (var se in info)
            {
                var t = se.Name[0];
                var i = Int32.Parse(se.Name.Substring(1));
                switch(t)
                {
                    case 'a':
                        Files[i] = new GMemoryFile((byte[])se.Value);
                        break;
                    case 'f':
                        Files[i].FileName = (string)se.Value;
                        break;
                }

            }
        }

        [System.Security.SecurityCritical]
        void ISerializable.GetObjectData(SerializationInfo info, StreamingContext context)
        {
            //serializace
            if (Files == null) return;
            for (int i = 0; i < Files.Count; i++)
            {
                var f = Files[i];
                if (f != null)
                {
                    info.AddValue($"a{i}", f.ToArray());
                    if(string.IsNullOrEmpty(f.FileName) == false) info.AddValue($"f{i}", f.FileName);
                }
            }
        }
    }
}

