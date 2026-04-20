//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.GBaseFilterConverter.cs </Name>
//    <Description> Konvertor různých typů na GBaseFilter                       </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2005-04-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using Gordic.General;
using Newtonsoft.Json;

namespace Gordic.General
{

    /// <summary>
    /// Konverze GDbTypů do JSON
    /// </summary>
    public class GFiltersJsonConverter : JsonConverter
    {
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            Type enumType = null;

            writer.WriteStartObject();
            var c = new GFilterJsonConverter();
            var v = (IEnumerable)value;
            foreach (IGFilter f in v)
            {
                if (f.IsEmpty) continue; //empty neserializuju
                if (enumType == null)
                {
                    var t = f.GetType();
                    enumType = t.GetGenericArguments()[0];
                }

                var n = Enum.GetName(enumType, f.FilterId);
                //var n = f.FilterId.ToString();
                writer.WritePropertyName(n);
                c.WriteJson(writer, f, serializer);
            }
            writer.WriteEndObject();
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            var isSet = typeof(IGFilterSet).IsAssignableFrom(objectType);
            Type filterType;
            if (isSet)
                filterType = ((existingValue ?? Activator.CreateInstance(objectType)) as IGFilterSet).FilterType;
            else
                filterType = objectType.GetElementType();

            if (reader.TokenType == JsonToken.Null) return Array.CreateInstance(filterType, 0);
            if (reader.TokenType != JsonToken.StartObject) throw new GInvalidCastException();

            var ed = new Dictionary<int, object>();
            if (existingValue != null)
            {
                foreach (IGFilter f in (IEnumerable)existingValue)
                {
                    if (f != null && ed.ContainsKey(f.FilterId) == false)
                        ed.Add(f.FilterId, f);
                }
            }

            var fs = new ArrayList();
            Type enumType = filterType.GetGenericArguments()[0];
            var c = new GFilterJsonConverter();
            while (reader.Read())
            {
                if (reader.TokenType == JsonToken.EndObject) break;
                if (reader.TokenType != JsonToken.PropertyName) { reader.Skip(); continue; }
                System.Diagnostics.Debug.Assert(reader.TokenType == JsonToken.PropertyName);

                object enu = Enum.Parse(enumType, reader.Value.ToString()); //vyvola vyjimku, pokud nenajde filter
                //{
                //    reader.Skip();
                //    continue;
                //}

                object ret;
                if (ed.TryGetValue((int)enu, out ret))
                    ed.Remove((int)enu);
                else
                {
                    ret = Activator.CreateInstance(filterType, enu);
                }

                reader.Read();
                var ret2 = (IGFilter)c.ReadJson(reader, filterType, ret, serializer);
                if (
                    ret2 != null //null = nefiltrujeme
                    && ret2.IsEmpty == false //BaseFilter.IsEmpty nefiltrujeme
                )
                    fs.Add(ret2);
            }

            fs.AddRange(ed.Values);
            if(isSet)
                return Activator.CreateInstance(typeof(GFilterSet<>).MakeGenericType(enumType), fs);

            var ra = Array.CreateInstance(filterType, fs.Count);
            fs.CopyTo(ra);
            return ra;
        }

        public override bool CanConvert(Type objectType)
        {
            if (typeof(IGFilterSet).IsAssignableFrom(objectType)) return true;
            return objectType.IsArray && typeof(IGFilter).IsAssignableFrom(objectType.GetElementType());
        }
    }
    /// <summary>
    /// Konverze GDbTypů do JSON
    /// </summary>
    public class GFilterJsonConverter : JsonConverter
    {
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            var v = (IGBaseFilter)value;
            var written = false;
            try
            {
                if (v is IGDtoFilter vdto)
                {
                    serializer.Serialize(writer, vdto.Dto);
                    return;
                }
                if (v.IsEmpty)
                {
                    writer.WriteNull(); 
                    return;
                }
                var ops = v.OperatorValueList;
                var op0 = ops[0].Operator;
                for (int i = 1; i < ops.Length; i++)
                {
                    if (ops[i].Operator != op0)
                    {
                        written = true;
                        writer.WriteStartObject();
                        writer.WritePropertyName("o");
                        writer.WriteStartArray();
                        foreach (var op in ops)
                            writer.WriteValue(GOperatorValueBase.OperatorEnum2Shortcut(op.Operator));
                        writer.WriteEndArray();
                        goto value;
                    }
                }
                if (op0 != OperatorEnum.Equal && op0 != OperatorEnum.In)
                {
                    written = true;
                    writer.WriteStartObject();
                    writer.WritePropertyName("o");
                    writer.WriteValue(GOperatorValueBase.OperatorEnum2Shortcut(op0));
                }
                value:
                if (written)
                    writer.WritePropertyName("v");
                if (ops.Length == 1 && op0 != OperatorEnum.In && op0 != OperatorEnum.NotIn) // In/NotIn chceme vždycky serializovat jako pole
                    WriteValue(writer, v, ops[0], 0);
                else
                {
                    writer.WriteStartArray();
                    for (int j = 0; j < ops.Length; j++)
                        WriteValue(writer, v, ops[j], j);
                    writer.WriteEndArray();
                }
            }
            finally
            {
                if (written)
                    writer.WriteEndObject();
            }
        }
        protected virtual void WriteValue(JsonWriter writer, IGBaseFilter v, IGOperatorValue ov, int index)
        {
            GDbTypeJsonConverter.InternalWrite(writer, (GDbType)ov.Value);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null) return null;

            IGBaseFilter v;
            if (existingValue == null)
                v = (IGBaseFilter)Activator.CreateInstance(objectType);
            else
            {
                v = (IGBaseFilter)existingValue;
                v.ClearValues();
            }

            if (v is IGDtoFilter vdto)
            {
                throw new GNotImplementedException(21000100);
                //vdto.Dto = (IGDto)serializer.Deserialize(reader);
                //return v;
            }

            Type dbType;
            var t = v.GetType();
            if (t.IsGenericType && t.GetGenericTypeDefinition() == typeof(GFilter<,>))
                dbType = t.GetGenericArguments()[1];
            else if (t.IsGenericType && t.GetGenericTypeDefinition() == typeof(GBaseFilter<>))
                dbType = t.GetGenericArguments()[0];
            else
                dbType = null;

            AddValue(reader, v, dbType);
            return v;
        }
        protected IGDbType ParseValue(IGBaseFilter v, JsonReader reader, Type dbType)
        {
            if (dbType != null)
            {
                if (reader.TokenType == JsonToken.Null) return GDbType.GetNull(dbType);
                return GDbType.Parse(dbType, GDbTypeJsonConverter.InternalGetGValueFromJson(dbType, reader.Value));
            }
            switch (reader.TokenType)
            {
                case JsonToken.Null:
                    return null;
                case JsonToken.Integer:
                    if(reader.Value is Int64 i64 && i64 > Int32.MaxValue)
                        return GInt64.Parse(reader.Value);
                    else
                        return GInt32.Parse(reader.Value);
                case JsonToken.Float:
                    return GDecimal.Parse(reader.Value);
                case JsonToken.Boolean:
                    return GBoolean.Parse(reader.Value);
                case JsonToken.Date:
                    {
                        if (reader.Value is DateTime dt) //melo by se splnit vzdy
                        {
                            if (dt.TimeOfDay.Ticks == 0) return new GDate(dt); // GDate.Parse(dt);
                            return new GDateTime(dt); //GDateTime.Parse(dt);
                        }
                        return GDateTime.Parse(reader.Value);
                    }
                case JsonToken.String:
                    return new GString(reader.Value.ToString());
            }
            throw new GArgumentOutOfRangeException("Neznámý typ JSON objektu " + reader.TokenType.ToString());
        }
        public virtual void AddValue(JsonReader reader, IGBaseFilter v, Type dbType = null)
        {
            switch (reader.TokenType)
            {
                case JsonToken.Null:
                    //case JsonToken.Undefined:
                    return; //bez hodnoty
                //case JsonToken.Bytes:
                //    return v;
                case JsonToken.String:
                    var s = reader.Value.ToString();
                    if (dbType != null)
                        v.AddFilterValue(GOperatorValue.JsonParse(dbType, s));
                    else
                        v.AddFilterValue(new GOperatorValue(OperatorEnum.Equal, new GString(s)));
                    return;
                case JsonToken.StartArray:
                    ReadArray(reader, v, dbType, OperatorEnum.In);
                    break;
                case JsonToken.StartObject:
                    reader.Read();
                    List<GOperatorValue> values = new List<GOperatorValue>();
                    var l_leftOperator = OperatorEnum.GreaterOrEqual;
                    var l_rightOperator = OperatorEnum.IntervalLessOrEqual;
                    while (reader.TokenType != JsonToken.EndObject)
                    {
                        System.Diagnostics.Debug.Assert(reader.TokenType == JsonToken.PropertyName);
                        var prop = reader.Value.ToString();
                        reader.Read();
                        switch (prop)
                        {
                            case "o":
                                {
                                    if (reader.TokenType == JsonToken.StartArray)
                                    {
                                        reader.Read();
                                        int i = 0;
                                        while (reader.TokenType != JsonToken.EndArray)
                                        {
                                            var o = GOperatorValueBase.OperatorShortcut2Enum(reader.Value.ToString());
                                            if (o == OperatorEnum.OnlyColumname)
                                                throw new GArgumentOutOfRangeException("Neznámý typ JSON operátoru " + reader.Value.ToString());
                                            if (i > 0) o |= OperatorEnum.IntervalMask;
                                            if (values.Count <= i)
                                                values.Add(new GOperatorValue(o, GDbType.GetNull(dbType ?? typeof(GString))));
                                            else
                                                values[i].Operator = o;
                                            reader.Read();
                                            i++;
                                        }
                                    }
                                    else
                                    {
                                        var op = GOperatorValueBase.OperatorShortcut2Enum(reader.Value.ToString());
                                        if (op == OperatorEnum.OnlyColumname)
                                            throw new GArgumentOutOfRangeException("Neznámý typ JSON operátoru " + reader.Value.ToString());
                                        if (values.Count == 0)
                                            values.Add(new GOperatorValue(op, GDbType.GetNull(dbType ?? typeof(GString))));
                                        else
                                            foreach (var ov in values)
                                                ov.Operator = op;
                                    }
                                }
                                break;
                            case "v":
                                {
                                    if (reader.TokenType == JsonToken.StartArray)
                                    {
                                        reader.Read();
                                        int i = 0;
                                        while (reader.TokenType != JsonToken.EndArray)
                                        {
                                            var val = ParseValue(v, reader, dbType);
                                            if (values.Count == 0)
                                                values.Add(new GOperatorValue(OperatorEnum.Equal, val));
                                            else if (values.Count <= i)
                                                values.Add(new GOperatorValue(values[0].Operator, val));
                                            else
                                                values[i].Value = val;

                                            reader.Read();
                                            i++;
                                        }
                                    }
                                    else
                                    {
                                        var val = ParseValue(v, reader, dbType);
                                        if (values.Count == 0)
                                            values.Add(new GOperatorValue(OperatorEnum.Equal, val));
                                        else
                                            foreach (var ov in values)
                                                ov.Value = val;
                                    }
                                }
                                break;
                            case "start":
                                if (reader.TokenType != JsonToken.Null)
                                {
                                    var val = ParseValue(v, reader, dbType);
                                    if (values.Count == 0)
                                        values.Add(new GOperatorValue(l_leftOperator, val));
                                    else
                                        values[0] = new GOperatorValue(l_leftOperator, val);
                                }
                                else
                                {
                                    l_leftOperator = OperatorEnum.OnlyColumname;
                                    if (values.Count >= 1)
                                        values[0].Operator = l_leftOperator;
                                }
                                break;
                            case "end":
                                if (reader.TokenType != JsonToken.Null)
                                {
                                    var val = ParseValue(v, reader, dbType);
                                    if (values.Count == 0)
                                    {
                                        values.Add(new GOperatorValue(l_leftOperator, GDbType.GetNull(dbType ?? typeof(GString))));
                                        values.Add(new GOperatorValue(l_rightOperator, val));
                                    }
                                    else if (values.Count == 1)
                                        values.Add(new GOperatorValue(l_rightOperator, val));
                                    else
                                        values[1] = new GOperatorValue(l_rightOperator, val);
                                }
                                else
                                {
                                    l_rightOperator = OperatorEnum.OnlyColumname;
                                    if (values.Count >= 2)
                                        values[1].Operator = l_leftOperator;
                                }
                                break;
                            case "leftOpened":
                                if (l_leftOperator != OperatorEnum.OnlyColumname)
                                {
                                    l_leftOperator = (bool)reader.Value ? OperatorEnum.Greater : OperatorEnum.GreaterOrEqual;
                                    if (values.Count >= 1)
                                        values[0].Operator = l_leftOperator;
                                }
                                break;
                            case "rightOpened":
                                if (l_rightOperator != OperatorEnum.OnlyColumname)
                                {
                                    l_rightOperator = (bool)reader.Value ? OperatorEnum.IntervalLess : OperatorEnum.IntervalLessOrEqual;
                                    if (values.Count >= 2)
                                        values[1].Operator = l_rightOperator;
                                }
                                break;
                        }
                        reader.Read();
                    }
                    foreach (var val in values)
                        if(val.Operator != OperatorEnum.OnlyColumname)
                            v.AddFilterValue(val);
                    break;
                default:
                    ReadValue(reader, v, dbType, OperatorEnum.Equal);
                    return;
            }
        }

        protected virtual void ReadValue(JsonReader reader, IGBaseFilter v, Type dbType, OperatorEnum op)
        {
            v.AddFilterValue(new GOperatorValue(op, ParseValue(v, reader, dbType)));
        }
        private void ReadArray(JsonReader reader, IGBaseFilter v, Type dbType, OperatorEnum op)
        {
            reader.Read();
            while (reader.TokenType != JsonToken.EndArray)
            {
                ReadValue(reader, v, dbType, op);
                reader.Read();
            }
        }

        public override bool CanConvert(Type objectType)
        {
            return typeof(IGBaseFilter).IsAssignableFrom(objectType);
        }
    }

}
