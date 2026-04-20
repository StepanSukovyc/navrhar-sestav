////  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
////    <Name>        Gordic.General.GDataModel.cs                                </Name>
////    <Description> Model                                                       </Description>
////    <Author>      Martin Aliger                                               </Author>
////    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
////    <Created>     2016-06-16                                                  </Created>
////  </FileHeader>

//using System;
//using System.Linq;
//using System.Collections.Generic;
//using System.Text;
//using System.Data;
////using System.Runtime.Serialization;
////using System.Runtime.Caching;
//using Newtonsoft.Json;

//namespace Gordic.General
//{
//    /// <summary>
//    /// Model
//    /// </summary>
//    //[DataContract]
//    [GDataModel]
//    [JsonObject(memberSerialization: MemberSerialization.OptOut)]
//    public abstract class GDataModel
//    {
//        public GDataModel()
//        {
//        }

//        public GDataModel(DataRow r)
//        {
//            ParseRow(r);
//        }

//        public static JsonSerializerSettings DefaultJsonSettings
//        {
//            get
//            {
//                return new JsonSerializerSettings()
//                {
//                    ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver()
//                    ,
//                    DateFormatHandling = DateFormatHandling.IsoDateFormat
//                    ,
//                    DateTimeZoneHandling = DateTimeZoneHandling.Local
//                };
//            }
//        }
//        public virtual JsonSerializerSettings GetJsonSettings()
//        {
//            return DefaultJsonSettings;
//        }

//        //static public implicit operator GDataModel(DataRow r)
//        //{
//        //    this.get
//        //}

//        public void ParseRow(DataRow r)
//        {
//            ParseRow(r, this.GetType(), this);
//        }
//        public static void ParseRow(DataRow r, Type modelType, object modelInstance)
//        {
//            DataColumnCollection Columns = r.Table.Columns;
//            foreach (var f in modelType.GetFields())
//            {
//                string name = f.Name;
//                var c = Columns[name];
//                if (c == null) c = Columns[ToSnakeCase(name)];
//                if (c != null)
//                {
//                    var v = r[c];
//                    if (v == DBNull.Value) v = null;
//                    f.SetValue(modelInstance, v);
//                }
//            }
//        }
//        public void CopyToRow(DataRow r)
//        {
//            CopyToRow(r, this.GetType(), this);
//        }
//        public static void CopyToRow(DataRow r, Type modelType, object modelInstance)
//        {
//            DataColumnCollection Columns = r.Table.Columns;
//            foreach (var f in modelType.GetFields())
//            {
//                string name = f.Name;
//                var c = Columns[name];
//                if (c == null) c = Columns[ToSnakeCase(name)];
//                if (c != null)
//                {
//                    var v = f.GetValue(modelInstance);
//                    if (v == null) v = DBNull.Value;
//                    r[c] = v;
//                }
//            }
//        }
//        public static void CopyToRow(DataRow r, Type modelType, object modelInstance, params object[] otherInstances)
//        {
//            DataColumnCollection Columns = r.Table.Columns;
//            foreach (var f in modelType.GetFields())
//            {
//                string name = f.Name;
//                var c = Columns[name];
//                if (c == null) c = Columns[ToSnakeCase(name)];
//                if (c != null)
//                {
//                    var v = f.GetValue(modelInstance);
//                    if (v == null)
//                    {
//                        foreach (object o in otherInstances)
//                        {
//                            v = f.GetValue(o);
//                            if (v != null) goto use;
//                        }
//                        v = DBNull.Value;
//                    }
//                    use:
//                    r[c] = v;
//                }
//            }
//        }
//        public static void CopyToRow(DataRow r, Type modelType, object modelInstance, params Func<object>[] otherInstances)
//        {
//            DataColumnCollection Columns = r.Table.Columns;
//            foreach (var f in modelType.GetFields())
//            {
//                string name = f.Name;
//                var c = Columns[name];
//                if (c == null) c = Columns[ToSnakeCase(name)];
//                if (c != null)
//                {
//                    var v = f.GetValue(modelInstance);
//                    if (v == null)
//                    {
//                        foreach (Func<object> o in otherInstances)
//                        {
//                            v = f.GetValue(o());
//                            if (v != null) goto use;
//                        }
//                        v = DBNull.Value;
//                    }
//                    use:
//                    r[c] = v;
//                }
//            }
//        }


//        public R ToRow<R, T>() where R : DataRow where T : DataTable, new()
//        {
//            var r = (R)new T().NewRow();
//            CopyToRow(r);
//            return r;
//        }

//        //Newtonsoft.Json.Utilities.StringUtils.ToSnakeCase(string s)
//        private static string ToSnakeCase(string name)
//        {            
//            StringBuilder s = new StringBuilder(name);
//            for (int i = 0; i < s.Length; i++)
//            {
//                if (Char.IsUpper(s[i]))
//                {
//                    s[i] = Char.ToLowerInvariant(s[i]);
//                    if (i > 0) s.Insert(i++, '_');
//                }
//            }
//            return s.ToString();
//        }

//        /*
//                private object BaseValue(object v, Type propertyType)
//                {
//                    if (typeof(IGDbType).IsAssignableFrom(propertyType))
//                    {
//                        var g = (IGDbType)v;
//                        if (g.IsNull) return null;
//                        return g.DbValue;
//                    }            
//                    return v;
//                }

//                public dynamic GetDto()
//                {
//                    IDictionary<string, object> ret = new System.Dynamic.ExpandoObject();
//                    foreach (var p in this.GetType().GetProperties()
//                        //.Where(prop => Attribute.IsDefined(prop, typeof(DataMemberAttribute)))
//                        )
//                    {
//                        var atrs = p.GetCustomAttributes(typeof(DataMemberAttribute), false);
//                        if (atrs.Length == 0) continue;
//                        DataMemberAttribute dma = (DataMemberAttribute)atrs[0];
//                        ret.Add(dma.Name ?? p.Name.ToLowerFirstLetter(), BaseValue(p.GetValue(this, null), p.PropertyType));
//                    }
//                    return ret;
//                }

//                private void SetDto(IDictionary<string, object> dto)
//                {
//                    foreach (var p in this.GetType().GetProperties()
//                        //.Where(prop => Attribute.IsDefined(prop, typeof(DataMemberAttribute)))
//                        )
//                    {
//                        var atrs = p.GetCustomAttributes(typeof(DataMemberAttribute), false);
//                        if (atrs.Length == 0) continue;
//                        DataMemberAttribute dma = (DataMemberAttribute)atrs[0];
//                        var name = dma.Name ?? p.Name.ToLowerFirstLetter();
//                        object val;
//                        if (dto.TryGetValue(name, out val) == false) continue;
//                        SetProp(p, val);
//                    }
//                }
//                private void SetProp(PropertyInfo p, object val)
//                {
//                    if (p.CanWrite == false)
//                    {
//                        var old = p.GetValue(this, null);
//                        if (old.Equals(val)) return;
//                        throw new Exception("cant change value of " + p.Name);
//                    }
//                    p.SetValue(this, val, null);
//                }

//                public void ValidateAndSetDto(dynamic dto)
//                {
//                    SetDto(dto as IDictionary<string, object>);
//                }
//        */
//    }

//    public abstract class GDataModel<R, T> : GDataModel where R : DataRow where T : DataTable, new()
//    {
//        public static implicit operator R(GDataModel<R, T> m)
//        {
//            return m.ToRow<R, T>();
//        }
//    }
//    /*
//        public static class GDataModelExt
//        {
//            //public static T FromRow<T>(DataRow r) where T : class, new()
//            //{
//            //    var m = new T();
//            //    m.ParseRow(r);
//            //    return m;
//            //}

//            //public static T FromRow<T>(this T m, DataRow r) where T: GDataModel
//            //{
//            //    return null;
//            //}

//            public static T ToDto<T>(this DataRow r) where T : class, new()
//            {
//                var m = new T();
//                GDataModel.ParseRow(r, m.GetType(), m);
//                return m;
//            }
//            public static void ToDto(this DataRow r, object m)
//            {
//                GDataModel.ParseRow(r, m.GetType(), m);
//            }

//            public static T CopyFromDto<T>(this T r, object m) where T : DataRow
//            {
//                GDataModel.CopyToRow(r, m.GetType(), m);
//                return r;
//            }
//            public static T CopyFromDto<T>(this T r, object m, params object[] ms) where T : DataRow
//            {
//                GDataModel.CopyToRow(r, m.GetType(), m, ms);
//                return r;
//            }
//            public static T CopyFromDto<T>(this T r, object m, params Func<object>[] ms) where T : DataRow
//            {
//                GDataModel.CopyToRow(r, m.GetType(), m, ms);
//                return r;
//            }



//            //public static R NewRow<R>(this DataTable t, GDataModel m) where R : DataRow
//            //{
//            //    var r = (R)t.NewRow();
//            //    m.SetToRow(r);
//            //    return r;
//            //}

//            public static List<T> ToDtoList<T>(this DataTable t) where T : class, new()
//            {
//                return t.Rows.Cast<DataRow>().Select(r => r.ToDto<T>()).ToList();
//            }

//        }
//    */
//    [AttributeUsage(AttributeTargets.Class/* | AttributeTargets.Struct | AttributeTargets.Enum*/, Inherited = true, AllowMultiple = false)]
//    public class GDataModelAttribute : Attribute
//    {
//        public GDataModelAttribute()
//        {
//        }
//    }
//    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, Inherited = false, AllowMultiple = false)]
//    public class GDataModelPropertyAttribute : Attribute
//    {
//        public GDataModelPropertyAttribute()
//        {
//        }
//    }

//}
