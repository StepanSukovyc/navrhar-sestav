//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.XmlAttributeTypeDescriptor.cs          </Name>
//    <Description> Typový deskriptor umožňující zobrazení vlastnosti           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.Xml;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Typový deskriptor umožňující zobrazení vlastnosti
    /// </summary>
    class XmlAttributeTypeDescriptor : ICustomTypeDescriptor
    {
        readonly PropertyDescriptorCollection properties;
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="xmlAttributes">KOlekce atributů větve</param>
        public XmlAttributeTypeDescriptor(XmlAttributeCollection xmlAttributes)
        {
            if (xmlAttributes != null)
                properties = XmlAttributePropertyDescriptor.GetProperties(xmlAttributes);
            else
                properties = new PropertyDescriptorCollection(new XmlAttributePropertyDescriptor[0]);
        }
        /// <summary>
        /// Získání kolekce atributů
        /// </summary>
        /// <returns></returns>
        public AttributeCollection GetAttributes()
        {
            return null;
        }
        /// <summary>
        /// Získání názvu třídy
        /// </summary>
        /// <returns></returns>
        public string GetClassName()
        {
            return null;
        }
        /// <summary>
        /// Získání názvu omponenty
        /// </summary>
        /// <returns></returns>
        public string GetComponentName()
        {
            return null;
        }
        /// <exclude/>
        public TypeConverter GetConverter()
        {
            return null;
        }
        /// <exclude/>
        public EventDescriptor GetDefaultEvent()
        {
            return null;
        }
        /// <exclude/>
        public PropertyDescriptor GetDefaultProperty()
        {
            return null;
        }
        /// <exclude/>
        public object GetEditor(Type editorBaseType)
        {
            return null;
        }
        /// <exclude/>
        public EventDescriptorCollection GetEvents()
        {
            return null;
        }
        /// <exclude/>
        public EventDescriptorCollection GetEvents(Attribute[] attributes)
        {
            return null;
        }
        /// <exclude/>
        public PropertyDescriptorCollection GetProperties()
        {
            return GetProperties(new Attribute[0]);
        }
        /// <exclude/>
        public PropertyDescriptorCollection GetProperties(Attribute[] attributes)
        {
            return properties;
        }

        /// <exclude/>
        public object GetPropertyOwner(PropertyDescriptor pd)
        {
            return this;
        }
    }
}
