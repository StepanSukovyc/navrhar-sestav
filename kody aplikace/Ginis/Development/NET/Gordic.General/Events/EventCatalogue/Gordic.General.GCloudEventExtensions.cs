//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Support.Events.GCloudEvent.cs                        </Name>
//    <Description> CloudEvent-like structure                                   </Description>
//    <Author>      Vlastimil Máca                                              </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-03-31                                                  </Created>
//  </FileHeader>
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Linq;
using System.Text;

namespace Gordic.General
{
    /// <summary>
    /// CloudEvent-like structure
    /// https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md
    /// </summary>
    public static class GCloudEventExtensions
    {

        /// <summary>
        /// Convert this CloudEvent object to Json string
        /// </summary>
        /// <returns></returns>
        public static string ToJSON(this GCloudEvent ce)
        {
            return JsonConvert.SerializeObject(ce);
        }
        /// <summary>
        /// Convert this CloudEvent object to bytes of Json string
        /// </summary>
        /// <returns></returns>
        public static byte[] ToBytes(this GCloudEvent ce)
        {
            return Encoding.UTF8.GetBytes(ce.ToJSON());
        }
        
    }

    public sealed partial class GCloudEvent
    {
        /// <summary>
        /// Convert json string bytes into GCloudEvent
        /// </summary>
        /// <param name="bytes"></param>
        /// <returns></returns>
        public static GCloudEvent FromBytes(byte[] bytes)
        {
            return JsonConvert.DeserializeObject<GCloudEvent>(Encoding.UTF8.GetString(bytes, 0, bytes.Length));
        }
    }

  
}
