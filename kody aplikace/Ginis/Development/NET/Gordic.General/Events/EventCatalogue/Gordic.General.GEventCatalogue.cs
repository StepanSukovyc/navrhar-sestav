//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Support.Events.GEventCatalogue.cs                    </Name>
//    <Description> Event catalogue                                             </Description>
//    <Author>      Vlastimil Máca                                              </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-03-31                                                  </Created>
//  </FileHeader>

using System.Collections.Concurrent;
using System.Collections.Generic;

namespace Gordic.General 
{ 
    /// <summary>
    /// Event catalogue
    /// </summary>
    public class GEventCatalogue
    {
        private ConcurrentDictionary<string, GEventType> _catalogue;

        /// <summary>
        /// create catalogue from list of all events
        /// </summary>
        /// <param name="events"></param>
        public GEventCatalogue(GEventType[] events)
        {
            _catalogue = new ConcurrentDictionary<string, GEventType>();
            foreach (GEventType eventType in events)
            {
                _catalogue[eventType.EventId] = eventType;
            }
        }

        /// <summary>
        /// Get eventType by EventId
        /// </summary>
        /// <param name="eventId">id of EventType</param>
        /// <returns></returns>
        public GEventType GetEventType(string eventId)
        {
           //if eventId does not exist -> create it in customEvents domain
           return _catalogue.GetOrAdd(eventId, (id) => new GEventType(eventId, eventId, "customEvents", null));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<GEventType> GetRegistredEventTypes() => new List<GEventType>(_catalogue.Values);
    }
}
