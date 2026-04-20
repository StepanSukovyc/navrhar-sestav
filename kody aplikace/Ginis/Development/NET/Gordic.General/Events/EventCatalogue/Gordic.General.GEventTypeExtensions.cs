//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Support.Events.GEventType.cs                         </Name>
//    <Description> Metadata of Event - info about event                        </Description>
//    <Author>      Vlastimil Máca                                              </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-03-31                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Gordic.General
{
    /// <summary>
    /// Metadata of Event - info about event
    /// </summary>
    public static class GEventTypeExtensions
    {
        private static readonly string[] channelPrefixes = new string[] { "G1", "Events" };
        /// <summary>
        /// Creates cloud event object
        /// </summary>
        /// <param name="et"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public static GCloudEvent ToCloudEvent(this GEventType et, IGDto data)
        {
            return new GCloudEvent(et, data) { source = "http://developer.gordic.cz"/*et.GetChannel(data).ToCloudEventSource()*/ };
        }
        /// <summary>
        /// Converts the specified event type and event record into a <see cref="GCloudEvent"/> instance.
        /// </summary>
        /// <remarks>The <see cref="GCloudEvent"/> instance includes a source property derived from the
        /// event type's channel based on the provided event data.</remarks>
        /// <param name="et">The event type to be converted.</param>
        /// <param name="data">The event record containing the data associated with the event.</param>
        /// <returns>A <see cref="GCloudEvent"/> instance representing the specified event type and data.</returns>
        public static GCloudEvent ToCloudEvent(this GEventType et, GEventRecord data)
        {
            return new GCloudEvent(et, data) { source = "http://developer.gordic.cz/"+ data.TenantId/*et.GetChannel(data.Data).ToCloudEventSource()*/ };
        }

        /// <summary>
        /// Creates cloud event object
        /// </summary>
        /// <param name="et"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public static GCloudEvent ToCloudEvent(this GEventType et, object data)
        {
            return new GCloudEvent(et, data) { source = et.GetChannel(data).ToCloudEventSource() };
        }

        /// <summary>
        /// Creates cloud event object
        /// </summary>
        /// <param name="et"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public static GCloudEvent ToCloudEvent(this GEventType et, Dictionary<string, string> data)
        {
            
            return new GCloudEvent(et, data) { source = "http://developer.gordic.cz" /*et.GetChannel(data).ToCloudEventSource()*/ };
        }

        private static GString ToCloudEventSource(this GEventChannel channel)
        {
            return "https://developer.gordic.cz/" + channel.ToString();
        }

        /// <summary>
        /// Generates a channel definition string for the specified <see cref="GEventType"/>.
        /// </summary>
        /// <remarks>The generated channel definition is a concatenation of the event type's domain, event
        /// ID, and  subject properties (if present). Subject properties are formatted with an asterisk (*) appended  to
        /// the property ID if the property is required. This method is useful for constructing unique  identifiers or
        /// paths for event channels.</remarks>
        /// <param name="et">The event type for which the channel definition is generated. Must not be null.</param>
        /// <returns>A string representing the channel definition, formatted as a hierarchical path.  The string includes the
        /// domain, event ID, and subject properties (if any), with each property  represented in the format
        /// "&lt;PropertyId[*]:DataType&gt;".
        /// </returns>
        public static GString GetChannelDefinition(this GEventType et)
        {
            return String.Join("/", String.Join("/", channelPrefixes), et.Domain, et.EventId, et.SubjectProperties != null ? String.Join("/", et.SubjectProperties.Select(it => "<" + it.PropertyId.Trim()+ (it.Required ? "*" : "") + ":" +it.DataType+ ">")) : String.Empty);
        }
        /// <summary>
        /// Channel name in AsyncApi format
        /// </summary>
        /// <param name="et"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public static GEventChannel GetChannel(this GEventType et, object data = null)
        {
            return new GEventChannel() { prefixes = channelPrefixes, domain = et.Domain, eventId = et.EventId };
        }

        /// <summary>
        /// Channel name in AsyncApi format
        /// </summary>
        /// <returns></returns>
        public static GEventChannel GetChannel(this GEventType et, IGDto data)
        {
            return new GEventChannel() { prefixes = channelPrefixes, domain = et.Domain, eventId = et.EventId, subjectParts = et.SubjectProperties?.Select(p=> data?.GetValue(p.PropertyName) ?? new GString("*")).ToArray() };
        }
        /// <summary>
        /// Creates a new <see cref="GEventChannel"/> based on the specified event type and data.
        /// </summary>
        /// <remarks>The method constructs the subject parts of the channel by matching the property names
        /// in the event type's subject properties with the keys in the provided data dictionary. If a match is found,
        /// the corresponding value is used; otherwise, a wildcard character ("*") is used.</remarks>
        /// <param name="et">The event type containing domain, event ID, and subject properties.</param>
        /// <param name="data">A dictionary containing key-value pairs used to populate the subject parts of the channel.</param>
        /// <returns>A <see cref="GEventChannel"/> with the specified domain, event ID, and subject parts derived from the
        /// provided data.</returns>
        public static GEventChannel GetChannel(this GEventType et, Dictionary<string, string> data)
        {
            return new GEventChannel() { prefixes = channelPrefixes, domain = et.Domain, eventId = et.EventId, subjectParts = et.SubjectProperties?.Select(p => data.ContainsKey(p.PropertyName) ? new GString(data[p.PropertyName]) : new GString("*")).ToArray() };
        }

        /// <summary>
        /// Channel name in AsyncApi format
        /// </summary>
        /// <param name="et"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public static GEventChannel GetChannel(this GEventType et, Dictionary<string,IGDbType> data)
        {
            return new GEventChannel() { prefixes = channelPrefixes, domain = et.Domain, eventId = et.EventId, subjectParts = et.SubjectProperties?.Select(p => data.ContainsKey(p.PropertyName) ? data[p.PropertyName] : new GString("*")).ToArray() };
        }
    }

}
