//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.JsonConverter.cs                             </Name>
//    <Description> Konverze GDbTypů do JSON                                    </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2016-07-13                                                  </Created>
//  </FileHeader>

using System;
using Newtonsoft.Json;
using System.Globalization;

namespace Gordic.General
{
    /// <summary>
    /// Konverze GDbTypů do JSON
    /// </summary>
    public class GDbTypeJsonConverter : JsonConverter
    {
        internal static void InternalWrite(JsonWriter writer, GDbType v)
        {
            if (v.IsNull) { writer.WriteNull(); return; }
            if (v is GDecimal)
            {
                writer.WriteValue(((decimal)v.ValueInstance).ToString(CultureInfo.InvariantCulture));
                return;
            }
            if (v is GInt64) //Int64 do stringu. JS number umi jen 53bitu
            {
                writer.WriteValue(((long)v.ValueInstance).ToString(CultureInfo.InvariantCulture));
                return;
            }
            writer.WriteValue(v.ValueInstance); //ValueInstance vraci null pro NULL
        }
        /// <summary>Zápis</summary>
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            InternalWrite(writer, (GDbType)value);
        }

        /// <summary>Čtení</summary>
        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            switch (reader.TokenType)
            {
                case JsonToken.Null:
                    if (existingValue != null && existingValue.GetType() == objectType) return SetDbType((GDbType)existingValue, DBNull.Value);
                    return GDbType.GetNull(objectType);
                case JsonToken.Integer:
                case JsonToken.Float:
                case JsonToken.String:
                case JsonToken.Boolean:
                case JsonToken.Date:
                case JsonToken.Bytes:
                    break;
                default:
                    throw new GArgumentException(21000053, 21090049, reader.Path, reader.TokenType, objectType); //RC-EX 21090049 : !Nepovolená JSON konverze {0} z typu {1}. Očekávaný typ {2}.
            }

            object value = InternalGetGValueFromJson(objectType, reader.Value);
            if (existingValue != null && existingValue.GetType() == objectType) return SetDbType((GDbType)existingValue, value);
            return GDbType.Parse(objectType, value);
        }

        internal static object InternalGetGValueFromJson(Type objectType, object value)
        {
            if (objectType == typeof(GDecimal))
            {
                if (value is string && Decimal.TryParse((string)value, NumberStyles.Number, CultureInfo.InvariantCulture, out var dec)) value = dec;
                else value = Convert.ToDecimal(value);
            }
            else if (objectType == typeof(GInt64) || objectType == typeof(GIkc))
            {
                if (value is string && Int64.TryParse((string)value, NumberStyles.Number, CultureInfo.InvariantCulture, out var dec)) value = dec;
                else value = Convert.ToInt64(value);
            }

            return value;
        }

        private object SetDbType(GDbType existingValue, object value)
        {
            //změna MAL 2021/01/25: klon se provede pro všechny, i když jejich hodnota lze změnit
            //může to mít negativní performance efekt, ale nemáme všechny sdílené GString označeny jako ReadOnly (např. SessionInfo.IxsFun není)
            //viz testcase DeserializaGStringReference
            //if (existingValue.IsReadOnly)
            existingValue = (GDbType)existingValue.Clone();
            existingValue.DbValue = value;
            return existingValue;
        }

        /// <summary>Co umí?</summary>
        public override bool CanConvert(Type objectType)
        {
            return typeof(GDbType).IsAssignableFrom(objectType);
        }
    }
}
