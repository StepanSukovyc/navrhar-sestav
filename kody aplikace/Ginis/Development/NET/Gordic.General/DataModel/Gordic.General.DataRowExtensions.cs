////  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
////    <Name>        Gordic.General.DataRowExtensions.cs                         </Name>
////    <Description> Extension metody pro DataRow a DataTable ke konverzi do DTO </Description>
////    <Author>      Martin Aliger                                               </Author>
////    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
////    <Created>     2016-07-14                                                  </Created>
////  </FileHeader>

//using System;
//using System.Linq;
//using System.Collections.Generic;
//using Gordic.General;

//namespace System.Data
//{
//    /// <summary>
//    /// Extension metody pro DataRow a DataTable ke konverzi do DTO
//    /// </summary>
//    public static class DataRowExtensions
//    {
//        public static T ToDto<T>(this DataRow r) where T : class, new()
//        {
//            var m = new T();
//            GDataModel.ParseRow(r, m.GetType(), m);
//            return m;
//        }
//        public static void ToDto(this DataRow r, object m)
//        {
//            GDataModel.ParseRow(r, m.GetType(), m);
//        }

//        public static T CopyFromDto<T>(this T r, object m) where T : DataRow
//        {
//            GDataModel.CopyToRow(r, m.GetType(), m);
//            return r;
//        }
//        public static T CopyFromDto<T>(this T r, object m, params object[] ms) where T : DataRow
//        {
//            GDataModel.CopyToRow(r, m.GetType(), m, ms);
//            return r;
//        }
//        public static T CopyFromDto<T>(this T r, object m, params Func<object>[] ms) where T : DataRow
//        {
//            GDataModel.CopyToRow(r, m.GetType(), m, ms);
//            return r;
//        }


//        //public static R NewRow<R>(this DataTable t, GDataModel m) where R : DataRow
//        //{
//        //    var r = (R)t.NewRow();
//        //    m.SetToRow(r);
//        //    return r;
//        //}

//        public static List<T> ToDtoList<T>(this DataTable t) where T : class, new()
//        {
//            return t.Rows.Cast<DataRow>().Select(r => r.ToDto<T>()).ToList();
//        }

//    }
//}
