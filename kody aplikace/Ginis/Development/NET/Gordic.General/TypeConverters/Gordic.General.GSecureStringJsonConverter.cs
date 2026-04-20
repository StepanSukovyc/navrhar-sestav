//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GSecureStringJsonConverter.cs                </Name>
//    <Description> Json.NET converter for GSecureString                        </Description>
//    <Author>      vmaca                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-11-18                                                  </Created>
//  </FileHeader>


using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;

namespace Gordic.General {

    ///<summary>
    /// Json.NET converter for GSecureString
    /// </summary>
    public sealed class GSecureStringJsonConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return typeof(GSecureString).IsAssignableFrom(objectType);
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            if (value == null)
            {
                writer.WriteNull();
                return;
            }

            var gs = value as GSecureString;
            var covered = gs?.Cover();
            if (covered == null)
                writer.WriteNull();
            else
                writer.WriteValue(covered);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.String)
            {
                var s = (string)reader.Value;
                try
                {
                    return GSecureString.Uncover(s);
                }
                catch
                {
                    return new GSecureString(s);
                }
            }

            if (reader.TokenType == JsonToken.StartObject)
            {
                var jo = JObject.Load(reader);
                var token = jo["Secure"] ?? jo["secure"];
                if (token == null || token.Type == JTokenType.Null)
                    return new GSecureString();

                var s = token.ToString();
                try
                {
                    return GSecureString.Uncover(s);
                }
                catch
                {
                    return new GSecureString(s);
                }
            }

            throw new GInternalDataException(31700010, 31750002, reader.TokenType); //RC-EX 31750002 : Unexpected token {0} when deserializing GSecureString.

        }

        public override bool CanRead => true;
        public override bool CanWrite => true;
    }

} // end namespace
