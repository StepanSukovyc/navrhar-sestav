//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GAppServerTransportResponseBaseConverter.cs  </Name>
//    <Description> Konverze GAibTransportResponse/GAppServerTransportResponseBase</Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-12-05                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using Gordic.App.Core;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NLog.Layouts;

namespace Gordic.General
{

    /// <summary>
    /// Konverze GAibTransportResponse/GAppServerTransportResponseBase
    /// </summary>
    public class GAppServerTransportResponseBaseConverter : JsonConverter
    {
        private class DummyContainer
        {
            [JsonConverter(typeof(NoConverter))] //dummy
            [JsonProperty(TypeNameHandling = TypeNameHandling.All)]
            public GAppServerTransportResponseBase resp;
        }
        public class NoConverter : JsonConverter
        {
            // NoConverter taken from this answer https://stackoverflow.com/a/39739105/3744182
            // To https://stackoverflow.com/questions/39738714/selectively-use-default-json-converter
            // By https://stackoverflow.com/users/3744182/dbc
            public override bool CanConvert(Type objectType) { throw new NotImplementedException(); /* This converter should only be applied via attributes */ }

            public override bool CanRead { get { return false; } }

            public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer) { throw new NotImplementedException(); }

            public override bool CanWrite { get { return false; } }

            public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer) { throw new NotImplementedException(); }
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            _WriteJson(writer, value, serializer);
        }
        [System.Security.SecuritySafeCritical]
        private void _WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            var d = new DummyContainer { resp = (GAppServerTransportResponseBase)value };
            var t = JObject.FromObject(d);
            var r = t["resp"];
            var e = r["exc"] as JObject;
            e?.Remove("WatsonBuckets");
            serializer.Serialize(writer, r);

            //var thisIndex = serializer.Converters.IndexOf(this);
            //serializer.Converters.RemoveAt(thisIndex);
            //serializer.Serialize(writer, v);
            //serializer.Converters.Insert(thisIndex, this);
            return;
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            return _ReadJson(reader, objectType, existingValue, serializer);
        }

        [System.Security.SecuritySafeCritical]
        private object _ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null) return null;

            Exception x = null;

            var r = JToken.ReadFrom(reader) as JObject;
            var e = r["exc"] as JObject;
            if (e != null)
            {
                var cls = e["ClassName"].ToString();
                var clt = Type.GetType(cls);
                if (clt != null)
                {
                    x = (Exception)e.ToObject(clt);
                    r.Remove("exc");
                }                
            }
            var t = new JObject(); t["resp"] = r;
            var d = t.ToObject<DummyContainer>();
            var v = d.resp;
            if (x != null)
                v.exc = x;

            return v;
        }


        public override bool CanConvert(Type objectType)
        {
            return typeof(GAppServerTransportResponseBase).IsAssignableFrom(objectType);
        }
    }

}
