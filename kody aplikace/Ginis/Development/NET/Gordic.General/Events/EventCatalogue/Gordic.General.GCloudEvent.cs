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
#if NETCOREAPP
using System.Text.Json;
#endif

namespace Gordic.General
{
    /// <summary>
    /// CloudEvent-like structure
    /// https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md
    /// </summary>
    public sealed partial class GCloudEvent
    {

        internal sealed class RawDataJsonConverter : Newtonsoft.Json.JsonConverter
        {
            public override bool CanConvert(Type objectType)
            {
                return objectType == typeof(string);
            }


            public override object ReadJson(JsonReader reader, Type objectType, object existingValue, Newtonsoft.Json.JsonSerializer serializer)
            {
                var tokenReader = reader as JTokenReader;
                var data = tokenReader.CurrentToken.ToString(Formatting.None);
                return data;
            }

            public override void WriteJson(JsonWriter writer, object value, Newtonsoft.Json.JsonSerializer serializer)
            {
                writer.WriteToken(JsonToken.Raw, value);
            }

        }
#if NETCOREAPP
        /// <summary>
        /// System.Text.Json converter that preserves the raw JSON text in a string property.
        /// Mirrors the behaviour of the Newtonsoft RawDataJsonConverter.
        /// Use with: [JsonConverter(typeof(RawDataSystemTextJsonConverter))]
        /// </summary>
        internal sealed class RawDataSystemTextJsonConverter : System.Text.Json.Serialization.JsonConverter<string>
        {
            public override string Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
            {
                // Handle explicit null token
                if (reader.TokenType == JsonTokenType.Null)
                {
                    // advance past the null token
                    reader.Read();
                    return null;
                }

                // Parse the value at the current position and return its raw JSON representation
                using (var doc = JsonDocument.ParseValue(ref reader))
                {
                    return doc.RootElement.GetRawText();
                }
            }

            public override void Write(Utf8JsonWriter writer, string value, JsonSerializerOptions options)
            {
                if (value == null)
                {
                    writer.WriteNullValue();
                    return;
                }

                // Write the stored raw JSON directly to the output
                writer.WriteRawValue(value);
            }
        }
#endif
        //************* REQUIRED ******************//
        /// <summary>
        /// 
        /// </summary>
        public string specversion = "1.0";
        /// <summary>
        /// 
        /// </summary>
        public string type;
        /// <summary>
        /// 
        /// </summary>
        public string source;
        /// <summary>
        /// 
        /// </summary>
        public string id;

        //*****************OPTIONAL*****************//
        /// <summary>
        /// 
        /// </summary>
        public string time;

        /// <summary>
        /// 
        /// </summary>
        public string datacontenttype = "application/json;charset=utf-8";

        /// <summary>
        /// 
        /// </summary>
        [JsonConverter(typeof(RawDataJsonConverter))]
#if NETCOREAPP
        [System.Text.Json.Serialization.JsonConverter(typeof(RawDataSystemTextJsonConverter))]
#endif
        public string data;

        /// <summary>
        /// 
        /// </summary>
        public string subject;

        /// <summary>
        /// 
        /// </summary>
        public GCloudEvent()
        {
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="evType"></param>
        public GCloudEvent(GEventType evType)
        {
            var channel = evType.GetChannel();
            this.source = string.Join("/",channel.prefixes) + "/" + channel.domain;
            this.subject = String.Join(".", evType?.SubjectProperties?.Select(it => it.ToString()) ?? new string[] { null });
            this.subject = this.subject == String.Empty ? null : this.subject; 
            this.type = channel.ToCloudEventType();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="evType"></param>
        /// <param name="evData"></param>
        public GCloudEvent(GEventType evType, object evData) : this(evType)
        {
            this.id = data.GetHashCode().ToString();
#if NETFRAMEWORK
            this.data = JsonConvert.SerializeObject(evData);
#else
            this.data = System.Text.Json.JsonSerializer.Serialize(evData);
#endif
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="evType"></param>
        /// <param name="dto"></param>
        public GCloudEvent(GEventType evType, IGDto dto) : this(evType)
        {
     
            this.id = data.GetHashCode().ToString();
#if NETFRAMEWORK
            this.data = JsonConvert.SerializeObject(dto);
#else
            this.data = System.Text.Json.JsonSerializer.Serialize(dto);
#endif
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="evType"></param>
        /// <param name="record"></param>
        public GCloudEvent(GEventType evType, GEventRecord record) : this(evType)
        {
            this.id = record.PorCisUda.ToString();
            this.time = record.DatZmena.ToString("o");
#if NETFRAMEWORK
            this.data = JsonConvert.SerializeObject(record.Data);
#else
            this.data = System.Text.Json.JsonSerializer.Serialize(record.Data);
#endif
        }
    }  
}
