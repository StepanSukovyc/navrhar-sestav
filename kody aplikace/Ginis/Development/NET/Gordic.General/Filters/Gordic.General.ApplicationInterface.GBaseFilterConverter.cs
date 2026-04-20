//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.GBaseFilterConverter.cs </Name>
//    <Description> Konvertor rùzných typù na GBaseFilter                       </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2005-04-08                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using Gordic.General;

namespace Gordic.General
{
    //---------------------------------------------------------------------
    /// <summary>
    /// Konvertor rùzných typù na GBaseFilter
    /// </summary>
    public class GBaseFilterConverter : TypeConverter
    {

        #region **************** Veøejné metody ****************
        //---------------------------------------------------------------------
        /// <exclude/>
        public override bool CanConvertFrom(ITypeDescriptorContext context, Type sourceType)
        {
            if (sourceType == typeof(string)) return true;
            if (sourceType.IsSubclassOf(typeof(GDbType))) return true;
            return base.CanConvertFrom(context, sourceType);
        }

        //---------------------------------------------------------------------
        /// <exclude/>
        public override bool CanConvertTo(ITypeDescriptorContext context, Type destinationType)
        {
            return base.CanConvertTo(context, destinationType);
        }

        //---------------------------------------------------------------------
        /// <exclude/>
        public override object ConvertFrom(ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value)
        {
            if (value.GetType() == typeof(string))
            {
                Type ovt = typeof(GOperatorValue<GString>);
                Type bft = typeof(GBaseFilter<GString>);
                if (context != null) 
                {
                    PropertyDescriptor pi = context.PropertyDescriptor;
                    if (pi.PropertyType.IsGenericType)
                    {
                        ovt = typeof(GOperatorValue<>).MakeGenericType(pi.PropertyType.GetGenericArguments());
                        bft = pi.PropertyType;
                    }
                }

                string[] vals = ((string)value).Split(new string[] { " OR " }, StringSplitOptions.RemoveEmptyEntries);
                Array ops = (Array)Activator.CreateInstance(ovt.MakeArrayType(), vals.Length); //GOperatorValue<GString>[] ops = new GOperatorValue<GString>[vals.Length];
                int i = 0;
                foreach (string val in vals)
                {
                    object ov = ovt.GetMethod("Parse", new Type[] { typeof(string) }).Invoke(null, new object[] { val });
                    ops.SetValue(ov, i++); //ops[i++] =                     
                }
                return Activator.CreateInstance(bft, ops);
            }
            if (value.GetType().IsSubclassOf(typeof(GDbType)))
            {
                Type vt = value.GetType();
                Type bft = typeof(GBaseFilter<>).MakeGenericType(vt);
                if (context != null) bft = context.PropertyDescriptor.PropertyType;
                Array ops = (Array)Activator.CreateInstance(vt.MakeArrayType(), 1);
                ops.SetValue(value, 0);
                return Activator.CreateInstance(bft, ops);
            }
            return base.ConvertFrom(context, culture, value);
        }

        //---------------------------------------------------------------------
        /// <exclude/>
        public override object ConvertTo(ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value, Type destinationType)
        {
            return base.ConvertTo(context, culture, value, destinationType);
        }

        #endregion

    }

    /// <exclude/>
    public class GBaseFilterConverterContext : ITypeDescriptorContext
    {
        private class _TypeInPI : PropertyDescriptor
        {
            Type _t;
            public _TypeInPI(Type t) : base("_", new Attribute[] { }) { _t = t; }
            public override bool CanResetValue(object component) { return false; }
            public override Type ComponentType { get { throw new NotImplementedException(); } }
            public override object GetValue(object component) { throw new NotImplementedException(); }
            public override bool IsReadOnly { get { return false; } }
            public override Type PropertyType { get { return _t; } }
            public override void ResetValue(object component) { }
            public override void SetValue(object component, object value) { }
            public override bool ShouldSerializeValue(object component) { return false; }
        }

        private PropertyDescriptor m_pi;
        /// <exclude/>
        public GBaseFilterConverterContext(PropertyDescriptor pi) { m_pi = pi; }
        /// <exclude/>
        public GBaseFilterConverterContext(Type t) { m_pi = new _TypeInPI(t); }
        /// <exclude/>
        public IContainer Container
        {
            get { return null; }
        }

        /// <exclude/>
        public object Instance
        {
            get { return null; }
        }

        /// <exclude/>
        public void OnComponentChanged()
        {
        }

        /// <exclude/>
        public bool OnComponentChanging()
        {
            return true;
        }

        /// <exclude/>
        public PropertyDescriptor PropertyDescriptor
        {
            get { return m_pi; }
        }

        /// <exclude/>
        public object GetService(Type serviceType)
        {
            return null;
        }
    }
}
