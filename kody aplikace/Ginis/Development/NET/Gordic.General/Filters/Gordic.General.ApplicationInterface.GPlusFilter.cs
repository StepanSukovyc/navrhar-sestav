//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.GPlusFilter.cs          </Name>
//    <Description> Filtr pro G+                                                </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2014-05-02                                                  </Created>
//  </FileHeader>

using System;
using System.Data;
using Gordic.General;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace Gordic.General
{

    //---------------------------------------------------------------------
    /// <summary>Filtr pro G+</summary>
    [Serializable]
    [System.ComponentModel.TypeConverter(typeof(GPlusFilterConverter))]
    public abstract class GPlusFilter<TFilterId> : GFilter<TFilterId> where TFilterId : Enum
    {
        /// <summary>Filtr pro G+</summary>
        protected GPlusFilter()
        {
            FilterId = (TFilterId)Enum.Parse(typeof(TFilterId), "gplus");
            CasoveRozliseni = new GInt16(0);
        }

        /// <summary>Filtr pro G+</summary>
        public GPlusFilter(short kind)
            : this()
        {
            m_aoFilterValues.Add(new GOperatorValue<IGDbType>(OperatorEnum.Equal, new GInt16(kind)));
        }

        ///<summary>složený filtr</summary>
        public override bool IsCompound() { return true; }

        /// <summary>Druh filtru. Podle toho lze rozlišit rùzné druhy èi kontexty použití</summary>
        public short Kind
        {
            get { return (this.Value as GInt16).BaseValue; }
            set { this.Value = new GInt16(value); }
        }


        /// <summary>Èasové rozlišení. Obvykle: roèní, kvartální, mìsíèní a bez rozlišení</summary>
        public GInt16 CasoveRozliseni { get; set; }

        //public virtual string SubSelect() { return null; }
    }


    /// <summary>Filtr pro G+</summary>
    public class GPlusFilterConverter : GBaseFilterConverter
    {
        //---------------------------------------------------------------------
        /// <exclude/>
        public override object ConvertFrom(ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value)
        {
            if (value is string)
                return String2Gplus((string)value);
            return base.ConvertFrom(context, culture, value);
        }

        //---------------------------------------------------------------------
        /// <exclude/>
        public override object ConvertTo(ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value, Type destinationType)
        {
            if (destinationType == typeof(string))
                return Gplus2String(value);
            return base.ConvertTo(context, culture, value, destinationType);
        }

        /// <exclude/>
        public static object String2Gplus(string val)
        {
            if (string.IsNullOrEmpty(val)) return null;
            try
            {
                using (var mf = new System.IO.MemoryStream(Convert.FromBase64String(val)))
                {
                    var formatter = new System.Runtime.Serialization.Formatters.Binary.BinaryFormatter();
                    var v = formatter.Deserialize(mf);
                    return v;
                }
            }
            catch (FormatException) { return null; }
            catch (System.Runtime.Serialization.SerializationException) { return null; }
        }

        /// <exclude/>
        public static string Gplus2String(object value)
        {
            //var sb = new System.Text.StringBuilder();
            //PropertyDescriptorCollection props = TypeDescriptor.GetProperties(value);
            //foreach (PropertyDescriptor pi in props)
            //{
            //    if (pi.Name == "x") break;
            //}
            //return sb.ToString();

            using (var mf = new System.IO.MemoryStream())
            {
                var formatter = new System.Runtime.Serialization.Formatters.Binary.BinaryFormatter() { AssemblyFormat = System.Runtime.Serialization.Formatters.FormatterAssemblyStyle.Simple, TypeFormat = System.Runtime.Serialization.Formatters.FormatterTypeStyle.TypesWhenNeeded };
                formatter.Serialize(mf, value);
                return Convert.ToBase64String(mf.ToArray());
            }

        }
    }

}
