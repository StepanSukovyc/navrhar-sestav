//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.FilterExtensions.cs     </Name>
//    <Description> Extension metody pro filtry                                 </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2010-09-27                                                  </Created>
//  </FileHeader>

using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Reflection;

namespace Gordic.General
{
    /// <summary>
    /// Extension metody pro filtry
    /// </summary>
    public static class GFilterExtensions
    {
        /// <summary>
        /// Test na přítomnost filtru
        /// </summary>
        public static bool Contains<TFilterId>(this GFilter<TFilterId>[] filters, TFilterId i) where TFilterId : Enum
        {
            foreach (GFilter<TFilterId> item in filters)
            {
                if (i.Equals(item.FilterId)) return true;
            }
            return false;
        }

        /// <summary>
        /// Zkrácení o neaktivní filtry
        /// </summary>
        public static GFilter<TFilterId>[] Shrink<TFilterId>(this GFilter<TFilterId>[] filters) where TFilterId : Enum
        {
            int c = 0;
            foreach (GFilter<TFilterId> item in filters)
            {
                if (item != null && item.NotEmpty) c++;
            }
            var s = new GFilter<TFilterId>[c];
            int i = 0;
            foreach (GFilter<TFilterId> item in filters)
            {
                if (item != null && item.NotEmpty) s[i++] = item;
            }
            return s;
        }
        /// <summary>
        /// Zkrácení o neaktivní filtry
        /// </summary>
        public static List<GFilter<TFilterId>> Shrink<TFilterId>(this List<GFilter<TFilterId>> filters) where TFilterId : Enum
        {
            var s = new List<GFilter<TFilterId>>(filters.Count);
            foreach (GFilter<TFilterId> item in filters)
            {
                if (item != null && item.NotEmpty) s.Add(item);
            }
            return s;
        }
        /// <summary>
        /// Hledání konkrétního filtru
        /// </summary>
        public static GFilter<TFilterId> Find<TFilterId>(this GFilter<TFilterId>[] filters, TFilterId i) where TFilterId : Enum
        {
            foreach (GFilter<TFilterId> item in filters)
            {
                if (i.Equals(item.FilterId)) return item;
            }
            return null;
        }

        //public static GFilter<T>[] ToFilters<T>(this IEnumerable<IGFilter> filters)
        //{
        //    return filters.Cast<GFilter<T>>().ToArray();
        //}


        /// <summary>Přidání nového filtru</summary>
        public static GFilter<TFilterId, TValue> Add<TFilterId, TValue>(this List<GFilter<TFilterId>> filters, TFilterId i, TValue value) where TFilterId : Enum
            where TValue : IGDbType, ICloneable, IGObject
        {
            var f = new GFilter<TFilterId, TValue>(i, value);
            filters.Add(f);
            return f;
        }
        /// <summary>Přidání nového filtru</summary>
        public static GFilter<TFilterId, TValue> Add<TFilterId, TValue>(this List<GFilter<TFilterId>> filters, TFilterId i, OperatorEnum operato, TValue value) where TFilterId : Enum
            where TValue : IGDbType, ICloneable, IGObject
        {
            var f = new GFilter<TFilterId, TValue>(i, operato, value);
            filters.Add(f);
            return f;
        }
        /// <summary>Přidání nového filtru</summary>
        public static GFilter<TFilterId, TValue> Add<TFilterId, TValue>(this List<GFilter<TFilterId>> filters, TFilterId i, GBaseFilter<TValue> filter) where TFilterId : Enum
            where TValue : IGDbType, ICloneable, IGObject
        {
            var f = new GFilter<TFilterId, TValue>(i, filter);
            filters.Add(f);
            return f;
        }

        /// <summary>Konverze do listu GFilter. Používá [GFilter] atribut na properties</summary>
        public static GFilterSet<TFilterId> GetFilters<TFilterId>(this IGFilterDto<TFilterId> dto, string group = null) where TFilterId : Enum
        {
            var list = new List<GFilter<TFilterId>>();

            if (dto == null)
                return list;

            var dtoType = dto.GetType();
            //var props = //from prop in dtoType.GetMembers(BindingFlags.Public | BindingFlags.Instance)
            //            from prop in dtoType.GetProperties(BindingFlags.Public | BindingFlags.Instance)                
            //            let valAttrs = prop.GetCustomAttributes(typeof(GFilterAttribute), false)
            //            //where (prop is PropertyInfo || prop is FieldInfo) && valAttrs.Length>0
            //            where valAttrs.Length > 0
            //            select new { Member = prop, Attribute = (GFilterAttribute)valAttrs[0] };

            var props = from prop in GDtoAccessor.Get(dtoType)
                        let valAttrs = prop.GetCustomAttributes(typeof(GFilterAttribute), false)
                        where valAttrs.Length > 0
                        select new { Member = prop, Attribute = (GFilterAttribute)valAttrs[0] };

            foreach (var m in props)
            {
                if (group != null && m.Attribute.Group != group) continue; //jina skupina
                var v = m.Member.GetValue(dto);
                if (v == null) continue; //null = nefiltrujeme
                var vt = v.GetType();
                var id = (TFilterId)Enum.Parse(typeof(TFilterId), m.Attribute.FilterEnumVal == null ? m.Member.Name : m.Attribute.FilterEnumVal);
                GFilter<TFilterId> f;
                if (typeof(IGDbType).IsAssignableFrom(vt))
                {
                    if (((IGDbType)v).IsNull) continue; //DbType.Null nefiltrujeme
                    f = (GFilter<TFilterId>)Activator.CreateInstance(typeof(GFilter<,>).MakeGenericType(typeof(TFilterId), vt), id, m.Attribute.Operator, v);
                }
                else if (vt.IsGenericType && typeof(GBaseFilter<>) == vt.GetGenericTypeDefinition())
                {
                    if (((IGBaseFilter)v).IsEmpty) continue; //BaseFilter.IsEmpty nefiltrujeme
                    f = (GFilter<TFilterId>)Activator.CreateInstance(typeof(GFilter<,>).MakeGenericType(typeof(TFilterId), vt.GenericTypeArguments[0]), id, v);
                }
                else if (vt.IsGenericType && typeof(GBaseCompositeFilter<>) == vt.GetGenericTypeDefinition())
                {
                    if (((IGBaseCompositeFilter)v).IsEmpty) continue; //BaseFilter.IsEmpty nefiltrujeme
                    f = (GCompositeFilter<TFilterId>)Activator.CreateInstance(typeof(GCompositeFilter<>).MakeGenericType(typeof(TFilterId)), id, v);
                }
                else if (typeof(IGIntervalDto).IsAssignableFrom(vt))
                {
                    var vit = ((IGIntervalDto)v).Generic;
                    var v0 = ((IGIntervalDto)v).Start;
                    var v1 = ((IGIntervalDto)v).End;
                    var null0 = (v0 == null || (v0 is IGDbType && ((IGDbType)v0).IsNull));
                    var null1 = (v1 == null || (v1 is IGDbType && ((IGDbType)v1).IsNull));
                    if (null0 && null1) continue;
                    var o0 = ((IGIntervalDto)v).LeftOpened ? OperatorEnum.Greater : OperatorEnum.GreaterOrEqual;
                    var o1 = ((IGIntervalDto)v).RightOpened ? OperatorEnum.IntervalLess : OperatorEnum.IntervalLessOrEqual;
                    if (null0)
                        f = (GFilter<TFilterId>)Activator.CreateInstance(typeof(GFilter<,>).MakeGenericType(typeof(TFilterId), vit), id, o1, v1);
                    else if (null1)
                        f = (GFilter<TFilterId>)Activator.CreateInstance(typeof(GFilter<,>).MakeGenericType(typeof(TFilterId), vit), id, o0, v0);
                    else
                    {
                        f = (GFilter<TFilterId>)Activator.CreateInstance(typeof(GFilter<,>).MakeGenericType(typeof(TFilterId), vit), id, v0, v1);
                        f[0].Operator = o0;
                        f[1].Operator = o1;
                    }
                }
                else if (v is IGDto)
                    f = new GDtoFilter<TFilterId>(id, v as IGDto);
                else if (v is IGDto[])
                    f = new GDtoArrayFilter<TFilterId>(id, v as IGDto[]);
                else if (v is IGDbType[])
                    f = new GFilter<TFilterId, IGDbType>(id, v as IGDbType[]);
                else if (vt == typeof(string))
                    f = new GFilter<TFilterId, GString>(id, m.Attribute.Operator, (string)v);
                else if (vt == typeof(Int32) || vt == typeof(Int32?))
                    f = new GFilter<TFilterId, GInt32>(id, m.Attribute.Operator, (Int32)v);
                else if (vt == typeof(Int16) || vt == typeof(Int16?))
                    f = new GFilter<TFilterId, GInt16>(id, m.Attribute.Operator, (Int16)v);
                else if (vt == typeof(DateTime) || vt == typeof(DateTime?))
                    f = new GFilter<TFilterId, GDateTime>(id, m.Attribute.Operator, (DateTime)v);
                else if (vt == typeof(Decimal) || vt == typeof(Decimal?))
                    f = new GFilter<TFilterId, GDecimal>(id, m.Attribute.Operator, (Decimal)v);
                else if (vt == typeof(Boolean) || vt == typeof(Boolean?))
                    f = new GFilter<TFilterId, GBoolean>(id, m.Attribute.Operator, (Boolean)v);
                else
                    throw new GArgumentOutOfRangeException(21000036, "dto." + m.Member.Name);
                list.Add(f);
            }

            return list;
        }


        /// <summary>Filtr podle BaseFilter</summary>
        public static GFilter<TFilterId> Filter<TFilterId, TValue>(this TFilterId e, GBaseFilter<TValue> f) where TFilterId : Enum where TValue : IGDbType
        {
            return new GFilter<TFilterId, TValue>(e, f);
        }

        /// <summary>Filtr na rovnost s danou hodnotou</summary>
        public static GFilter<TFilterId> FilterEqual<TFilterId, TValue>(this TFilterId e, TValue v) where TFilterId : Enum where TValue : IGDbType
        {
            return new GFilter<TFilterId>(e, OperatorEnum.Equal, v);
        }
        /// <summary>Filtr na rovnost s danou hodnotou</summary>
        public static GFilter<TFilterId> FilterEqual<TFilterId>(this TFilterId e, string v) where TFilterId : Enum
        {
            return new GFilter<TFilterId>(e, OperatorEnum.Equal, new GString(v));
        }

        /// <summary>Filtr na nerovnost s danou hodnotou</summary>
        public static GFilter<TFilterId> FilterNotEqual<TFilterId, TValue>(this TFilterId e, TValue v) where TFilterId : Enum where TValue : IGDbType
        {
            return new GFilter<TFilterId>(e, OperatorEnum.NotEqual, v);
        }
        /// <summary>Filtr na nerovnost s danou hodnotou</summary>
        public static GFilter<TFilterId> FilterNotEqual<TFilterId>(this TFilterId e, string v) where TFilterId : Enum
        {
            return new GFilter<TFilterId>(e, OperatorEnum.NotEqual, new GString(v));
        }

        /// <summary>Filtr na LIKE s danou hodnotou. Pokud není v řetězci žádný znak "%", tak doplní procento na konec, jinak ponechá procenta tak jak byla...</summary>
        public static GFilter<TFilterId> FilterLike<TFilterId>(this TFilterId e, string v) where TFilterId : Enum
        {
            return new GFilter<TFilterId>(e, OperatorEnum.Like, new GString(v));
        }
        /// <summary>Filtr na NOT LIKE s danou hodnotou. Pokud není v řetězci žádný znak "%", tak doplní procento na konec, jinak ponechá procenta tak jak byla...</summary>
        public static GFilter<TFilterId> FilterNotLike<TFilterId>(this TFilterId e, string v) where TFilterId : Enum
        {
            return new GFilter<TFilterId>(e, OperatorEnum.NotLike, new GString(v));
        }
        /// <summary>Filtr na LIKE s danou hodnotou. Pokud není v řetězci znak "%", doplní ho na konec i na začátek řetězce.</summary>
        public static GFilter<TFilterId> FilterContains<TFilterId>(this TFilterId e, string v) where TFilterId : Enum
        {
            return new GFilter<TFilterId>(e, OperatorEnum.Contains, new GString(v));
        }

        /// <summary>Filtr na větší než daná hodnota</summary>
        public static GFilter<TFilterId> FilterGreater<TFilterId, TValue>(this TFilterId e, TValue v) where TFilterId : Enum where TValue : IGDbType
        {
            return new GFilter<TFilterId>(e, OperatorEnum.Greater, v);
        }
        /// <summary>Filtr na větší než daná hodnota</summary>
        public static GFilter<TFilterId> FilterGreater<TFilterId>(this TFilterId e, string v) where TFilterId : Enum
        {
            return new GFilter<TFilterId>(e, OperatorEnum.Greater, new GString(v));
        }

        /// <summary>Filtr na menší než daná hodnota</summary>
        public static GFilter<TFilterId> FilterLess<TFilterId, TValue>(this TFilterId e, TValue v) where TFilterId : Enum where TValue : IGDbType
        {
            return new GFilter<TFilterId>(e, OperatorEnum.Less, v);
        }
        /// <summary>Filtr na menší než daná hodnota</summary>
        public static GFilter<TFilterId> FilterLess<TFilterId>(this TFilterId e, string v) where TFilterId : Enum
        {
            return new GFilter<TFilterId>(e, OperatorEnum.Less, new GString(v));
        }

        /// <summary>Filtr na větší nebo rovná  než daná hodnota</summary>
        public static GFilter<TFilterId> FilterGreaterOrEqual<TFilterId, TValue>(this TFilterId e, TValue v) where TFilterId : Enum where TValue : IGDbType
        {
            return new GFilter<TFilterId>(e, OperatorEnum.GreaterOrEqual, v);
        }
        /// <summary>Filtr na větší nebo rovná než daná hodnota</summary>
        public static GFilter<TFilterId> FilterGreaterOrEqual<TFilterId>(this TFilterId e, string v) where TFilterId : Enum
        {
            return new GFilter<TFilterId>(e, OperatorEnum.GreaterOrEqual, new GString(v));
        }

        /// <summary>Filtr na menší nebo rovná než daná hodnota</summary>
        public static GFilter<TFilterId> FilterLessOrEqual<TFilterId, TValue>(this TFilterId e, TValue v) where TFilterId : Enum where TValue : IGDbType
        {
            return new GFilter<TFilterId>(e, OperatorEnum.LessOrEqual, v);
        }
        /// <summary>Filtr na menší nebo rovná než daná hodnota</summary>
        public static GFilter<TFilterId> FilterLessOrEqual<TFilterId>(this TFilterId e, string v) where TFilterId : Enum
        {
            return new GFilter<TFilterId>(e, OperatorEnum.LessOrEqual, new GString(v));
        }

        /// <summary>Filtr na IN jednou z daných hodnot</summary>
        public static GFilter<TFilterId> FilterIn<TFilterId, TValue>(this TFilterId e, params TValue[] inValues) where TFilterId : Enum where TValue : class, IGDbType
        {
            return new GFilter<TFilterId>(e, inValues.Select(v => new GOperatorValue<IGDbType>(OperatorEnum.In, v)));
        }
        /// <summary>Filtr na NOT IN jednou z daných hodnot</summary>
        public static GFilter<TFilterId> FilterNotIn<TFilterId, TValue>(this TFilterId e, params TValue[] inValues) where TFilterId : Enum where TValue : class, IGDbType
        {
            return new GFilter<TFilterId>(e, inValues.Select(v => new GOperatorValue<IGDbType>(OperatorEnum.NotIn, v)));
        }

        /// <summary>Filtr na interval daných hodnot</summary>
        public static GFilter<TFilterId> FilterInterval<TFilterId, TValue>(this TFilterId e, TValue value1, TValue value2)
            where TFilterId : Enum where TValue : class, IGDbType
        {
            return new GFilter<TFilterId>(e, GBaseFilter<IGDbType>.Interval(value1, value2));
        }
        /// <summary>Filtr na interval daných hodnot</summary>
        public static GFilter<TFilterId> FilterInterval<TFilterId, TValue>(this TFilterId e, TValue value1, bool open1, TValue value2, bool open2)
            where TFilterId : Enum where TValue : class, IGDbType
        {
            return new GFilter<TFilterId>(e, GBaseFilter<IGDbType>.Interval(value1, open1, value2, open2));
        }


        //public static GFilter<TFilterId>[] And<TFilterId>(this GFilter<TFilterId> e, GFilter<TFilterId> m) where TFilterId : Enum
        //{
        //    return new[] { e, m };
        //}
        //public static GFilter<TFilterId>[] And<TFilterId>(this GFilter<TFilterId>[] e, GFilter<TFilterId> m) where TFilterId : Enum
        //{
        //    return ?;
        //}

    }
}
