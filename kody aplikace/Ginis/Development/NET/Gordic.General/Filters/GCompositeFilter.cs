//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GCompositeFilter.cs                          </Name>
//    <Description> Filtr pro složené klíče                                     </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2018-06-26                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Gordic.General
{
    /// <summary>Filtr pro složené klíče</summary>
    public interface IGBaseCompositeFilter : IGBaseFilter
    {
        /// <summary>Seznam typových hodnot</summary>
        List<IGDbType[]> TypedValues { get; }
        /// <summary>Typ DTO objektu s klíči</summary>
        Type CompositionType { get; }
        /// <summary>přidání nového filtru na složený klíč</summary>
        void AddFilterValue(IGDbType[] dbkeys, GString sxs);
    }
    /// <summary>Filtr pro složené klíče</summary>
    public class GBaseCompositeFilter<TDto> : GBaseFilter<GString>, IGBaseCompositeFilter where TDto : IGDtoWithCompositeKey
    {
        //toto drzi predek ( do toho posilam SXS, TValue=GString)
        ///// <summary>Pole hodnot, které filtrují danný sloupec (mezi nimi je OR)</summary>
        //protected List<GOperatorValue<TValue>> m_aoFilterValues = new List<GOperatorValue<TValue>>();

        private List<IGDbType[]> m_TypedValues = new List<IGDbType[]>();
        List<IGDbType[]> IGBaseCompositeFilter.TypedValues => m_TypedValues;
        Type IGBaseCompositeFilter.CompositionType => typeof(TDto);

        public override bool IsCompound() => true;

        GDtoAccessor m_accessor = GDtoAccessor.Get<TDto>();

        /// <summary>přidání nového filtru na složený klíč</summary>
        public void AddFilterValue(TDto val)
        {
            var keys = m_accessor.GetKeyValues(val);
            var sxs = string.Join("#", keys);
            var dbkeys = keys.Select(v => GDbTypeConverter.GetIGDbType(v, true)).ToArray();
            AddFilterValue(dbkeys, sxs);
        }
        /// <summary>přidání nového filtru na složený klíč</summary>
        public void AddFilterValue(IGDbType[] dbkeys, GString sxs)
        {
            m_TypedValues.Add(dbkeys);
            AddFilterValue(new GOperatorValue<GString>(OperatorEnum.In, sxs));
        }

        public GBaseCompositeFilter()
        {
        }

        //---------------------------------------------------------------------
        /// <summary>Konstruktor s přidáním filtrů na složený klíč</summary>
        public GBaseCompositeFilter(params TDto[] values)
        {
            foreach (var v in values)
                AddFilterValue(v);
        }
        /// <summary>Konstruktor s přidáním filtrů na složený klíč</summary>
        public GBaseCompositeFilter(IEnumerable<TDto> values)
        {
            foreach (var v in values)
                AddFilterValue(v);
        }
        //---------------------------------------------------------------------
        /// <summary>Nastavení nových filtrů na složený klíč</summary>
        public void Set(params TDto[] values)
        {
            ClearValues();
            foreach (var v in values)
                AddFilterValue(v);
        }
        /// <summary>Nastavení nových filtrů na složený klíč</summary>
        public void Set(IEnumerable<TDto> values)
        {
            ClearValues();
            foreach (var v in values)
                AddFilterValue(v);
        }

        //---------------------------------------------------------------------
        /// <summary>Vyrobí kopii instance filtru</summary>
        public override object Clone()
        {
            GBaseCompositeFilter<TDto> l_oNewFilter = new GBaseCompositeFilter<TDto>();
            l_oNewFilter.SetOnClone(this);
            l_oNewFilter.m_TypedValues = m_TypedValues;
            return l_oNewFilter;
        }
    }

    /// <summary>Filtr pro složené klíče</summary>
    public interface IGCompositeFilter : IGFilter
    {
        /// <summary>Seznam typových hodnot</summary>
        List<IGDbType[]> TypedValues { get; }
    }
    
    
    /// <summary>Filtr pro složené klíče</summary>
    [Serializable]
    [System.ComponentModel.TypeConverter(typeof(GCompositeFilterConverter))]
    public class GCompositeFilter<TFilterId> : GFilter<TFilterId, GString>, IGCompositeFilter where TFilterId : Enum
    {
        private List<IGDbType[]> m_TypedValues;
        List<IGDbType[]> IGCompositeFilter.TypedValues => m_TypedValues;

        public GCompositeFilter(TFilterId filterId, IGBaseCompositeFilter baseFilter)
        {
            //z predka
            if (baseFilter == null) throw new GArgumentNullException(21000031, "baseFilter");
            FilterId = filterId;
            m_bCaseSensitive = baseFilter.CaseSensitive;
            Enabled = baseFilter.Enabled;
            foreach (var val in baseFilter.OperatorValueList)
            {
                m_aoFilterValues.Add(new GOperatorValue<IGDbType>(val.Operator, val.Value));
            }
            //pridano
            m_TypedValues = baseFilter.TypedValues;
        }
    }

    /// <summary>Filtr pro složené klíče</summary>
    public class GCompositeFilterConverter : GBaseFilterConverter
    {
        ////---------------------------------------------------------------------
        ///// <exclude/>
        //public override object ConvertFrom(ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value)
        //{
        //    if (value is string)
        //        return String2Comp((string)value);
        //    return base.ConvertFrom(context, culture, value);
        //}

        ////---------------------------------------------------------------------
        ///// <exclude/>
        //public override object ConvertTo(ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value, Type destinationType)
        //{
        //    if (destinationType == typeof(string))
        //        return Comp2String(value);
        //    return base.ConvertTo(context, culture, value, destinationType);
        //}

        ///// <exclude/>
        //public static object String2Comp(string val)
        //{
        //    return new GBaseFilterConverter().ConvertFromInvariantString(val);
        //}

        ///// <exclude/>
        //public static string Comp2String(object value)
        //{
        //    return ((GBaseFilter<IGDbType>)value).Serialize();
        //}
    }

    /// <summary>JSON serializace pro GBaseCompositeFilter</summary>
    public class GCompositeFilterJsonConverter : GFilterJsonConverter
    {
        protected override void WriteValue(JsonWriter writer, IGBaseFilter v, IGOperatorValue ov, int index)
        {
            var c = (IGBaseCompositeFilter)v;
            var names = GDtoAccessor.Get(c.CompositionType).GetKeyNames();
            var keys = c.TypedValues[index];
            writer.WriteStartObject();
            for (int i = 0; i < names.Length; i++)
            {
                writer.WritePropertyName(names[i]);
                writer.WriteValue(keys[i]?.DbValue);
            }
            writer.WriteEndObject();
        }

        GDtoAccessor m_accessor;
        public override void AddValue(JsonReader reader, IGBaseFilter v, Type dbType = null)
        {
            var c = (IGBaseCompositeFilter)v;
            m_accessor = GDtoAccessor.Get(c.CompositionType);
            base.AddValue(reader, v, dbType);
        }

        protected override void ReadValue(JsonReader reader, IGBaseFilter v, Type dbType, OperatorEnum op)
        {
            if (reader.TokenType == JsonToken.StartObject)
            {
                var c = (IGBaseCompositeFilter)v;
                var names = m_accessor.GetKeyNames();
                var fields = m_accessor.GetKeyFields();
                System.Diagnostics.Debug.Assert(names.Length == fields.Length);

                reader.Read();
                var keys = new IGDbType[fields.Length];
                while (reader.TokenType != JsonToken.EndObject)
                {
                    System.Diagnostics.Debug.Assert(reader.TokenType == JsonToken.PropertyName);
                    var propName = reader.Value.ToString();
                    var i = Array.IndexOf(names, propName);
                    reader.Read();
                    if (i >= 0)
                    {
                        var value = ParseValue(v, reader, fields[i].Type);
                        keys[i] = value;
                    }
                    reader.Read();
                }
                var sxs = string.Join("#", keys.Select(f => f.ToString())); //val.MakeSxs();
                c.AddFilterValue(keys, sxs);
                return;
            }
            base.ReadValue(reader, v, dbType, op);
        }


        public override bool CanConvert(Type objectType)
        {
            return typeof(IGBaseCompositeFilter).IsAssignableFrom(objectType);
        }
    }

}
