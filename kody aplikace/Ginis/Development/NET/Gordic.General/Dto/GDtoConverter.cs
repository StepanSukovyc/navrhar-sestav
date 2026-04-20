//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDtoConverter.cs                             </Name>
//    <Description> Converter pro prevod mezi DTO a DataRow                     </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2016-07-28                                                  </Created>
//  </FileHeader>

using System;
using System.Linq;
using System.Data;
using System.Reflection;
using System.Collections.Generic;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using Newtonsoft.Json;

namespace Gordic.General
{
    /// <summary>Converter pro prevod mezi DTO a DataRow</summary>
    public static class GDtoConverter
    {
        /// <summary>
        /// Prevede DataRow na DTO
        /// </summary>
        /// <remarks>u row prochazi jednotlive sloupce tabulky (snake_case)!!!</remarks>
        /// <typeparam name="T">Typ DTO</typeparam>
        /// <param name="row">Row from</param>
        /// <param name="dtoProps">Clenove DTO</param>
        /// <returns>DTO</returns>
        public static T ToDto<T>(this DataRow row, GDtoAccessor dtoProps = null) 
            where T: class, new()
        {
            return ToDto<T>(row, row.Table, dtoProps);
        }
        /// <summary>
        /// Prevede DataRow na DTO a stringove polozky trimuje zprava
        /// </summary>
        /// <remarks>u row prochazi jednotlive sloupce tabulky (snake_case)!!!</remarks>
        /// <typeparam name="T">Typ DTO</typeparam>
        /// <param name="row">Row from</param>
        /// <param name="dtoProps">Clenove DTO</param>
        /// <returns>DTO</returns>
        public static T ToDtoTrimmed<T>(this DataRow row, GDtoAccessor dtoProps = null)
            where T : class, new()
        {
            return ToDtoTrimmed<T>(row, row.Table, dtoProps);
        }
        /// <summary>
        /// Prevede DataRow na DTO (u row prochazi jednotlive sloupce tabulky (snake_case)!!!)
        /// </summary>
        /// <typeparam name="T">Typ DTO (muzi byt oznacen attributem GDtoAttribute)</typeparam>
        /// <param name="row">Row from</param>
        /// <param name="dt">DataTable (muze byt i nova instance, jen pro zjisteni sloupcu)</param>
        /// <param name="dtoProps">Clenove DTO</param>
        /// <returns>DTO</returns>
        public static T ToDto<T>(this DataRow row, DataTable dt, GDtoAccessor dtoProps = null) 
            where T : class, new()
        {
            if(dtoProps == null)
                dtoProps = GDtoAccessor.Get<T>();
            var dto = new T();

            foreach(DataColumn column in dt.Columns)
            {
                var prop = dtoProps[column.ColumnName];
                //var prop = dtoProps.SingleOrDefault(p => p.Name.Equals(column.ColumnName, StringComparison.OrdinalIgnoreCase));

                if (prop == null)
                    continue;

                try
                {
                    prop.SetValue(dto, Convert(column, row[column], prop.Type));
                }
                catch (Exception e)
                {
                    throw new GInvalidCastException(
                        string.Format("Nelze prevest property/field '{0}' mezi DTO a DataRow",
                            prop.Name),
                        e);
                }
            }

            return dto;
        }
        private static T ToDtoTrimmed<T>(this DataRow row, DataTable dt, GDtoAccessor dtoProps = null)
            where T : class, new()
        {
            if(dtoProps == null)
                dtoProps = GDtoAccessor.Get<T>();
            var dto = new T();

            foreach (DataColumn column in dt.Columns)
            {
                var prop = dtoProps[column.ColumnName];
                //var prop = dtoProps.SingleOrDefault(p => p.Name.Equals(column.ColumnName, StringComparison.OrdinalIgnoreCase));

                if (prop == null)
                    continue;

                try
                {
                    prop.SetValue(dto, ConvertTrimmed(column, row[column], prop.Type));
                }
                catch (Exception e)
                {
                    throw new GInvalidCastException(
                        string.Format("Nelze prevest property/field '{0}' mezi DTO a DataRow",
                            prop.Name),
                        e);
                }
            }

            return dto;
        }

        //public static T ToDto<T>(this IGDto dto) where T : class, new()
        //{
        //    //if (typeof(T) == dto.GetType()) return (T)dto;
        //    return (T)CopyValues(dto, new T());
        //}
        //public static List<T> ToDtoList<T,U>(this List<U> dtos) where T : class, new() where U: IGDto
        //{
        //    //if (dtos.Count == 0) return new List<T>();
        //    //if (typeof(T) == typeof(U)) return (List<T>)dtos;
        //    return dtos.Select(dto => dto.ToDto<T>()).ToList();
        //}

        ///// <summary>Prevede row na DTO (u row prochazi property)</summary>
        //public static T ToDto<T>(this DataRow row) where T : class, new()
        //{
        //    return CopyValues(row, new T()) as T;
        //}

        /// <summary>Prevede datbulku na List DTO (u row prochazi property)</summary>
        public static List<T> ToDtoList<T>(this DataTable dt)
            where T : class, new()
        {
            var dtoProps = GDtoAccessor.Get<T>();
            return dt.Rows.Cast<DataRow>().Select(r => r.ToDto<T>(dtoProps)).ToList();
        }


        /// <summary>Prevede datbulku na List trimovaných DTO (u row prochazi property)</summary>
        public static List<T> ToDtoListTrimmed<T>(this DataTable dt)
            where T : class, new()
        {
            var dtoProps = GDtoAccessor.Get<T>();
            return dt.Rows.Cast<DataRow>().Select(r => r.ToDtoTrimmed<T>(dtoProps)).ToList();
        }


        /// <summary>Prevede DTO na row (s kopirovanim do column row).</summary>
        /// <typeparam name="D">Typ DTO (musi byt oznacen attributem GDtoAttribute)</typeparam>
        /// <typeparam name="R">Typ row</typeparam>
        [Obsolete("Pouzij metodu CopyToRow")]
        public static R ToRow<D, R>(this IGDto dto, DataTable dt)
            where D : class
            where R : DataRow
        {
            var row = dt.NewRow();
            CopyToRow(dto, row);
            return row as R;
        }

        /// <summary>Prevede hodnoty DTO do row</summary>
        /// <typeparam name="D">Typ DTO (musi byt oznacen attributem GDtoAttribute)</typeparam>
        /// <typeparam name="R">Typ row</typeparam>
        [Obsolete("Pouzij metodu CopyToRow")]
        public static R ToRow<D, R>(this IGDto dto, R row) 
            where D : class
            where R : DataRow
        {
//TODO Alik: je CopyValues spravne?! Nema byt CopyToRow??
            return CopyValues(dto, row) as R;
            //CopyToRow(dto, row);
            //return row;
        }

        /// <summary>Z DTO naplni existujici DataTable + doplni neexistujici sloupce dle fieldu nalezenych v DTO (existujici radky v tabulce zustanou zachovany)</summary>
        /// <typeparam name="T">typ DTO</typeparam>
        /// <param name="dtos">seznam DTO</param>
        /// <param name="dt">instance DataTable k naplneni</param>
        /// <param name="createNewColumns">priznak, zda se v DataTable maji vytvaret nove sloupce, pokud v ni jiz neexistuji</param>
        public static void CopyToTable<T>(this IEnumerable<T> dtos, DataTable dt, bool createNewColumns = false) where T: IGDto {
            var dtoProps = GDtoAccessor.Get<T>();
            if (createNewColumns) CreateNewColumns<T>(dt, dtoProps);
            foreach (var dto in dtos) 
            {
                var row = dt.NewRow();
                CopyToRow(dto, row, dtoProps);
                dt.Rows.Add(row);
            }
        }

        /// <summary>Z DTO vytvori novou naplnenou netypovou DataTable</summary>
        /// <typeparam name="T">typ DTO</typeparam>
        /// <param name="dtos">seznam DTO</param>
        /// <returns>novou naplnenou instanci datatable</returns>
        public static DataTable ToDataTable<T>(this IEnumerable<T> dtos) where T : IGDto {
            var dt = CreateTable<T>(createNewColumns: true);
            CopyToTable(dtos, dt, createNewColumns: false);
            return dt;
        }

        /// <summary>Podle DTO vytvoří novou prázdnou netypovou DataTable</summary>
        public static DataTable CreateTable<T>(bool createNewColumns = false) where T : IGDto
        {
            var dt = new DataTable();
            if (createNewColumns) CreateNewColumns<T>(dt);
            return dt;
        }
        /// <summary>Podle DTO vytvoří novou prázdnou netypovou DataTable</summary>
        public static void CreateNewColumns<T>(DataTable dt, GDtoAccessor dtoProps = null) where T : IGDto
        {
            if (dtoProps == null)
                dtoProps = GDtoAccessor.Get<T>();
            DataColumn[] keys = new DataColumn[dtoProps.GetKeyFields().Length];
            foreach (var prop in dtoProps)
                if (!dt.Columns.Contains(prop.Name))
                {
                    var mType = prop.Type;
                    var c = dt.Columns.Add(prop.Name, typeof(IGDbType).IsAssignableFrom(mType) ? GDbType.GetBaseType(mType) : mType);
                    if (prop.Key != null)
                        keys[prop.Key.Order] = c;
                }
            dt.PrimaryKey = keys;
        }


        /// <summary>Zkopiruje property/fieldy z DTO do row</summary>
        /// <param name="dto">DTO (from)</param>
        /// <param name="toRow">Row (to)</param>
        /// <param name="dtoProps">seznam memberu DTO (optimalizace pro opakovane volani)</param>
        private static void CopyToRow(IGDto dto, DataRow toRow, GDtoAccessor dtoProps = null)
        {
            if (dtoProps == null) 
                dtoProps = GDtoAccessor.Get(dto.GetType());

            foreach (DataColumn column in toRow.Table.Columns)
            {
                var prop = dtoProps[column.ColumnName];
                
                if (prop == null)
                    continue;

                object value;
                try
                {
                    value = prop.GetValue(dto);
                    if (value == null) { }           //Je-li na DTO normalni null, datarow by ho mel ignorovat, protoze pri updatu zaznamu chci posilat pouze property, se kterymi chci neco delat
                    else if (value is DBNull)
                        toRow[column] = value;
                    else if (value is IGDbType gDb && gDb.IsNull)
                        toRow[column] = gDb.DbValue;
                    else
                        toRow[column] = Convert(value, column.DataType);
                }
                catch(Exception e)
                {
                    throw new GInvalidCastException(
                        string.Format("Nelze prevest property/field '{0}' mezi DTO a DataRow",
                            prop.Name),
                        e);
                }
            }
        }

        /// <summary>Zkopiruje property/fieldy z DTO do row</summary>
        /// <param name="dto">DTO (from)</param>
        /// <param name="toRow">Row (to)</param>
        public static void CopyToRow(this IGDto dto, DataRow toRow) {
            CopyToRow(dto, toRow, null);
        }

        /// <summary>Zkopiruje hodnoty spolecnych property</summary>
        private static object CopyValues(object from, object to)
        {
            var toProps = GDtoAccessor.Get(to.GetType());
            var fromProps = GDtoAccessor.Get(from.GetType());

            foreach (var toProp in toProps)
            {
                //var fromProp = fromProps[toProp.Name];      bacha je case-insensitive
                var fromProp = fromProps.SingleOrDefault(p => string.Compare(p.Name, toProp.Name) == 0);

                if (fromProp == null)
                    continue;

                CopyValue(from, fromProp, to, toProp);
            }

            return to;
        }

        /// <summary>Zkopiruje hodnotu pro Property a Field (ostatni jsou ignorovany)</summary>
        private static void CopyValue(object from, GDtoAccessor.Field infoFrom, object to, GDtoAccessor.Field infoTo)
        {
            object value = infoFrom.GetValue(from);
            //if (infoFrom.MemberType == MemberTypes.Property)
            //    value = (infoFrom as PropertyInfo).GetValue(from, null);
            //else if (infoFrom.MemberType == MemberTypes.Field)
            //    value = (infoFrom as FieldInfo).GetValue(from);
            //else
            //    return;
            try
            {
                infoTo.SetValue(to, Convert(value, infoTo.Type));
                //if (infoTo.MemberType == MemberTypes.Property)
                //    (infoTo as PropertyInfo).SetValue(to, Convert(value, (infoTo as PropertyInfo).PropertyType), null);
                //else if (infoTo.MemberType == MemberTypes.Field)
                //    (infoTo as FieldInfo).SetValue(to, Convert(value, (infoTo as FieldInfo).FieldType));
                //else
                //    return;
            }
            catch(Exception e)
            {
                throw new GInvalidCastException(
                    string.Format("Nelze prevest property/field '{0}' mezi DTO a DataRow", 
                        infoFrom.Name),
                    e);
            }
        }

        /// <summary>Convert s GTypy</summary>
        /// <param name="fromValue"></param>
        /// <param name="toType"></param>
        /// <returns></returns>
        public static object Convert(object fromValue, Type toType)
        {
            if (fromValue == null)
                return null;

            var fromType = fromValue.GetType();

            //1) Stejny typ nebo potomek-parent (potomka lze prevest na parenta)
            if (toType.IsAssignableFrom(fromType))
                return fromValue;

            //2) Neco na gordicky typ
            if (typeof(IGDbType).IsAssignableFrom(toType))  //Co s tim, kdyz neni GTyp???
                return GDbType.Parse(toType, fromValue);

            //3) Gordicky type na neco jineho (nejcasteji C# primitive type)
            if (fromValue is IGDbType)
            {
                var value = (fromValue as IGDbType).DbValue;
                if (typeof(IConvertible).IsAssignableFrom(value.GetType()))
                    return ((IConvertible)value).ToType(toType, null);
            }

            //4) Prevod na enum
            if (toType.IsEnum)
                return Enum.ToObject(toType, System.Convert.ToInt32((fromValue))); //Bohous: Oracle vraci shorty jako decimal, zde to pak pada

            //5) Cokoliv (nejcasteji standardni csharpoviny) na cokoliv
            if (typeof(IConvertible).IsAssignableFrom(fromType))
                return ((IConvertible)fromValue).ToType(toType, null);

            throw new GInvalidCastException(21000033);
        }
        private static object Convert(DataColumn fromColumn, object fromValue, Type toType)
        {
            //g-typy
            if (toType == typeof(GString)) return GString.Parse(fromValue, (ushort)fromColumn.MaxLength, false);
            if (typeof(IGDbType).IsAssignableFrom(toType))
                return GDbType.Parse(toType, fromValue);
            //konverze mimo g-typy
            if (toType.IsAssignableFrom(fromColumn.DataType)) //fromValue.GetType() = fromColumn.DataType
            {
                if (fromValue == DBNull.Value) return null;
                return fromValue;
            }
            throw new GInvalidCastException(21000034);
        }
        private static object ConvertTrimmed(DataColumn fromColumn, object fromValue, Type toType)
        {
            //g-typy
            if (toType == typeof(GString)) return GString.Parse(fromValue, (ushort)fromColumn.MaxLength, false).Trimmed;
            if (typeof(IGDbType).IsAssignableFrom(toType))
                return GDbType.Parse(toType, fromValue);
            //konverze mimo g-typy
            if (toType == typeof(string)) return fromValue.ToString().TrimEnd();
            if (toType.IsAssignableFrom(fromColumn.DataType)) //fromValue.GetType() = fromColumn.DataType
            {
                if (fromValue == DBNull.Value) return null;
                return fromValue;
            }
            throw new GInvalidCastException(21000035);
        }

        /// <summary>Provede deep copy</summary>
        public static T DeepClone<T>(T obj)
        {
            return GObjectHelper.Copy<T>(obj);
        }

        /// <summary>Provede deep copy</summary>
        public static T DeepCloneDto<T>(this T obj) where T : IGDto
        {
            return GObjectHelper.Copy<T>(obj);
        }

        /// <summary>Provede deep copy do odvozeneho typu</summary>
        public static U DeepCopyAs<T,U>(this T original) 
            where T : IGDto
            where U : IGDto, T, new()
        {
            return GObjectHelper.CopyTo(original, new U());
        }
    }
}
