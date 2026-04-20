//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.GFilterOData.cs         </Name>
//    <Description> Rozšíření GFilter o prácí s OData výrazy                    </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-03-24                                                  </Created>
//  </FileHeader>

using System;
using System.Data;
using Gordic.General;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Gordic.General
{

    /// <summary>
    /// Rozšíření GFilter o prácí s OData výrazy
    /// </summary>
    public static class GFilterOData
    {
        /// <summary>OData reprezentace hodnoty</summary>
        public static string ODataValue(string value) => $"'{value.Replace("'", "''")}'";
        /// <summary>OData reprezentace hodnoty</summary>
        public static string ODataValue(DateTimeOffset value) => value.ToString("yyyy-MM-ddTHH:mm:ssK"); //2012-12-03T07:16:23Z
        /// <summary>OData reprezentace hodnoty</summary>
        public static string ODataValue(IGDbType value)
        {
            if (value == null || value.IsNull) return "null";
            switch (value)
            {
                case GString v: return ODataValue(v.BaseValue);
                case GDateTime d: return ODataValue(d.BaseOffsetValue);
                default: return value.ToString(System.Globalization.CultureInfo.InvariantCulture);
            }
        }

        /// <summary>OData reprezentace operátoru</summary>
        public static string ODataOperator(OperatorEnum op)
        {
            switch(op)
            {
                case OperatorEnum.Equal: return "eq";
                case OperatorEnum.NotEqual: return "ne";
                case OperatorEnum.Greater: return "gt";
                case OperatorEnum.GreaterOrEqual: return "ge";
                case OperatorEnum.Less: return "lt";
                case OperatorEnum.LessOrEqual: return "le";
                case OperatorEnum.In: return "in";
                //case OperatorEnum.NotIn: return "not in";
                //case OperatorEnum.Like: ?
                //case OperatorEnum.NotLikeLike: ?
                //case OperatorEnum.Contains: ?
                default: throw new GNotImplementedException(21000098);
            }
        }
        private static string ODataLikeFunction(string filterName, IGOperatorValue ov)
        {
            string value = ov.Value.ToString();
            if (value.StartsWith("%"))
                if(value.EndsWith("%"))
                    return $"contains({filterName}, {ODataValue(value.Substring(1, value.Length - 2))})";
                else
                    return $"startswith({filterName}, {ODataValue(value.Substring(1))})";
            else
                if (value.EndsWith("%"))
                    return $"endswith({filterName}, {ODataValue(value.Substring(0, value.Length-1))})";
            throw new GNotImplementedException(21000115);
        }

        /// <summary>OData reprezentace filtru</summary>
        public static string ToOData(this IGFilter filter)
        {
            if (filter?.IsEmpty != false) return String.Empty;
            var v = filter.OperatorValueList;
            if (v.Length == 1)
                if (v[0].Operator == OperatorEnum.Like)
                    return ODataLikeFunction(filter.FilterName, v[0]);
                else
                    return $"{filter.FilterName} {ODataOperator(v[0].Operator)} {ODataValue(v[0].Value)}";
            var sb = new StringBuilder($"{filter.FilterName} {ODataOperator(v[0].Operator)} (");
            int c = 0;
            foreach (var i in v)
            {
                if (c++ > 0) sb.Append(',');
                sb.Append(ODataValue(i.Value));
            }
            sb.Append(")");
            return sb.ToString();
        }

        /// <summary>OData reprezentace filtrů</summary>
        public static string ToOData<TFilterId>(this GFilterSet<TFilterId> filters) where TFilterId : Enum
        {
            return string.Join(" and ", filters.Select(f => f.ToOData()));
        }


        /// <summary>OData parse do filtrů</summary>
        public static GFilterSet<TFilterId> ParseOData<TFilterId>(string odataFilter) where TFilterId : Enum
        {
            var parser = new Gordic.General.ODataParser.GODataFilterParser(odataFilter);
            parser.Parse();
            return parser.Result.CreateGFilter<TFilterId>();
        }

    }

}
