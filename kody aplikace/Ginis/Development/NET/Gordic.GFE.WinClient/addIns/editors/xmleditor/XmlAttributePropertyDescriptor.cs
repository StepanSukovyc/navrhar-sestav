//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlAttributePropertyDescriptor.cs      </Name>
//    <Description> Descriptor vlastnosti pro XmlAttribute.                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Xml;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Descriptor vlastnosti pro XmlAttribute.
    /// </summary>
    public class XmlAttributePropertyDescriptor : PropertyDescriptor
    {
        XmlAttribute xmlAttribute;
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="xmlAttribute">Atribut</param>
        public XmlAttributePropertyDescriptor(XmlAttribute xmlAttribute)
            : base(xmlAttribute.LocalName, new Attribute[0])
        {
            this.xmlAttribute = xmlAttribute;
        }

        /// <exclude/>
        public static PropertyDescriptorCollection GetProperties(XmlAttributeCollection xmlAttributes)
        {
            List<PropertyDescriptor> properties = new List<PropertyDescriptor>();
            foreach (XmlAttribute xmlAttribute in xmlAttributes)
                properties.Add(new XmlAttributePropertyDescriptor(xmlAttribute));
            return new PropertyDescriptorCollection(properties.ToArray());
        }

        /// <exclude/>
        public override Type ComponentType
        {
            get
            {
                return typeof(String);
            }
        }

        /// <exclude/>
        public override bool IsReadOnly
        {
            get
            {
                return false;
            }
        }

        /// <exclude/>
        public override Type PropertyType
        {
            get
            {
                return typeof(String);
            }
        }

        /// <exclude/>
        public override bool CanResetValue(object component)
        {
            return false;
        }

        /// <exclude/>
        public override object GetValue(object component)
        {
            return xmlAttribute.Value;
        }

        /// <exclude/>
        public override void ResetValue(object component)
        {
        }

        /// <exclude/>
        public override void SetValue(object component, object value)
        {
            xmlAttribute.Value = (String)value;
        }

        /// <exclude/>
        public override bool ShouldSerializeValue(object component)
        {
            return true;
        }
    }
}
