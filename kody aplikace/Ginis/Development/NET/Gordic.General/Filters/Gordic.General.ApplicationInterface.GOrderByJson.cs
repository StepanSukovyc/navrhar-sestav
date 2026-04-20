//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.GOrderByJson.cs         </Name>
//    <Description> OrderBy - JSON serializace                                  </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-02-22                                                  </Created>
//  </FileHeader>

using System;
using System.Data;
using System.Linq;
using Gordic.General;
using Newtonsoft.Json;

namespace Gordic.General
{
    //---------------------------------------------------------------------
    /// <summary>
    /// OrderBy - JSON serializace
    /// </summary>
    public class GOrderByJsonConverter : JsonConverter
    {
        /// <summary>Test na OrderBy</summary>
        public override bool CanConvert(Type objectType)
        {
            //nevolá se
            return typeof(IGOrderBy).IsAssignableFrom(objectType);
        }

        /// <summary>Ètení JSON</summary>
        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            var et = objectType.GenericTypeArguments[0];
            string s = null;
            object e = null;
            OrderDirection direction = OrderDirection.Asc;
            object Result()
            {
                if (existingValue == null)
                {
                    var tc = objectType.GetConstructor(new[] { et, typeof(OrderDirection) });
                    if (tc != null) existingValue = tc.Invoke(new[] { e, direction });
                    else existingValue = Activator.CreateInstance(objectType);
                }
                else
                {
                    objectType.GetProperty("Column").SetValue(existingValue, s);
                    objectType.GetProperty("ColumnId").SetValue(existingValue, e);
                }
                return existingValue;
            }

            //tvar "s1 Desc"
            if (reader.TokenType == JsonToken.String)
            {
                s = reader.Value.ToString();
                if (s.EndsWith(" DESC", StringComparison.OrdinalIgnoreCase)) { direction = OrderDirection.Desc; s = s.Substring(0, s.Length - " DESC".Length); }
                e = Enum.Parse(et, s);
                return Result();
            }
            //tvar "{ Column: "s1", Direction: "Desc" }"
            if (reader.TokenType == JsonToken.StartObject)
            {
                reader.Read();
                while (true)
                {
                    switch(reader.TokenType)
                    {
                        case JsonToken.PropertyName:
                            var p = reader.Value.ToString();
                            reader.Read();
                            if (p == nameof(GOrderBy<Enum>.Direction)) Enum.TryParse<OrderDirection>(reader.Value.ToString(), out direction);
                            if (p == nameof(GOrderBy<Enum>.Column)) { if (s == null) s = reader.Value.ToString(); e = Enum.Parse(et, s); }
                            if (p == nameof(GOrderBy<Enum>.ColumnId)) s = reader.Value.ToString();
                            reader.Read();
                            break;
                        case JsonToken.EndObject:
                            return Result();
                    }
                }
            }
            throw new GArgumentOutOfRangeException(21000090);
        }

        /// <summary>Zápis JSON</summary>
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            writer.WriteValue(value.ToString());
        }
    }

}
