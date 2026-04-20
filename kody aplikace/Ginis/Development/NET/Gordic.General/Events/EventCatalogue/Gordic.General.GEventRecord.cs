//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Support.Events.GEventType.cs                         </Name>
//    <Description> Metadata of Event - info about event                        </Description>
//    <Author>      Vlastimil Máca                                              </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-03-31                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;

namespace Gordic.General
{
    /// <summary>
    /// Metadata of Event - info about event
    /// </summary>
    public class GEventRecord
    {
        /// <summary>
        /// Owner of event - tenant id
        /// </summary>
        public string TenantId { get; set; }

        /// <summary>
        /// Event Id - ginluda.por_cis_uda
        /// </summary>
        public int PorCisUda { get; }

        /// <summary>
        /// Event type - ginluda.id_uda
        /// </summary>
        public string IdUda { get; }

        /// <summary>
        /// DatZmena
        /// </summary>
        public DateTime DatZmena { get; }

        /// <summary>
        /// Data
        /// </summary>
        public Dictionary<string, string> Data { get; }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="tenantId"></param>
        /// <param name="por_cis_uda"></param>
        /// <param name="id_uda"></param>
        /// <param name="datZmena"></param>
        /// <param name="data"></param>
        public GEventRecord(string tenantId, int por_cis_uda, string id_uda, DateTime datZmena, Dictionary<string, string> data)
        {
            TenantId = tenantId;
            PorCisUda = por_cis_uda;
            IdUda = id_uda;
            DatZmena = datZmena;
            Data = data;
        }
    }

}
