//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Support.Events.GEventType.cs                         </Name>
//    <Description> Metadata of Event - info about event                        </Description>
//    <Author>      Vlastimil Máca                                              </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-03-31                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;

namespace Gordic.General
{
    /// <summary>
    /// Metadata of Event - info about event
    /// </summary>
    public class GEventType
    {
        /// <summary>
        /// Event Id - gincuda.id_uda
        /// </summary>
        public string EventId { get; }

        /// <summary>
        /// Event name - gincuda.nazev
        /// </summary>
        public string EventName { get; }

        /// <summary>
        /// Domain of event - gincuda.domain
        /// </summary>
        public string Domain { get; }

        /// <summary>
        /// Data properties of event - ginsuda
        /// </summary>
        public IReadOnlyCollection<GEventParameter> DataProperties { get; }

        /// <summary>
        ///  Properties, which can be used as filters - ginsuda
        /// </summary>
        public IReadOnlyCollection<GEventParameter> SubjectProperties { get; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="eventId"></param>
        /// <param name="eventName"></param>
        /// <param name="domain"></param>
        /// <param name="dataProperties"></param>
        public GEventType(string eventId, string eventName, string domain, List<GEventParameter> dataProperties)
        {
            EventId = eventId;
            EventName = eventName;
            Domain = domain;
            DataProperties = dataProperties?.AsReadOnly();
            SubjectProperties = dataProperties?.Where(p => p.SubjectPropertyOrder >= 0).OrderBy(p => p.SubjectPropertyOrder).ToList().AsReadOnly();
        }
    }

}
