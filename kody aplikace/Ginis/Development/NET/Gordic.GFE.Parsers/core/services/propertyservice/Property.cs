//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Properties.cs                            </Name>
//    <Description> Popis Properties.                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-04-10                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using Gordic.General;
using System.ComponentModel;
using System.Xml.Serialization;
using System.IO;
using System.Globalization;
using System.Xml;
using System.Collections;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Rozhraní objektů vlastnosti kterých lze uložit. 
    /// Je to myšleno tak, že jejích stavy lze uložit do vlastnosti a následně je načíst.
    /// Používá se pro uložení a načtení stavu GUI objektů.
    /// </summary>
    public interface IMementoCapable
    {
        /// <summary>
        /// Vytvoření nového memento ze stavu.
        /// </summary>
        Property CreateMemento();

        /// <summary>
        /// Uložení stavu do daného memento.
        /// </summary>
        /// <param name="memento">Vlastnosti, do kterých se ukládá.</param>
        void SetMemento(Property memento);
    }

    /// <summary>
    /// Popis Properties.
    /// </summary>
    public class Property
    {
        /// <summary> Potřebné pro podporu deserializátoru </summary>
        class SerializedValue
        {
            readonly string content;

            public string Content { get { return content; } }

            public T Deserialize<T>()
            {
                var serializer = GSerializerFactory.GetXmlSerializer(typeof(T));
                return (T)serializer.Deserialize(new StringReader(content));
            }

            public SerializedValue(string content) { this.content = content; }
        }

        Dictionary<string, object> properties = new Dictionary<string, object>();
        /// <summary>
        /// TRUE pokud vlastnosti neobsahují žádný element
        /// </summary>
        public bool IsEmpty { get { return Elements.Length == 0; } }

        /// <exclude/>
        public string this[string property]
        {
            get { return Convert.ToString(Get(property), CultureInfo.InvariantCulture); }
            set { Set(property, value); }
        }

        /// <exclude/>
        public string[] Elements
        {
            get
            {
                lock (properties)
                {
                    List<string> ret = new List<string>();
                    foreach (KeyValuePair<string, object> property in properties)
                        ret.Add(property.Key);

                    return ret.ToArray();
                }
            }
        }

        /// <exclude/>
        public object Get(string property)
        {
            lock (properties)
            {
                properties.TryGetValue(property, out object val);
                return val;
            }
        }

        /// <exclude/>
        public void Set<T>(string property, T value)
        {
            if (property == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450028)); //RC 29450028 : Vlastnost je NULL

            if (value == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450029)); //RC 29450029 : Hodnota je NULL

            T oldValue = default(T);
            lock (properties)
            {
                if (typeof(T) == typeof(List<Property>))
                {
                    List<Property> list = value as List<Property>;
                    Property prop = new Property();
                    for (int index = 0; index < list.Count; index++)
                        prop.Set(Convert.ToString(index), list[index]);

                    properties.Add(property, prop);
                }
                else if (!properties.ContainsKey(property))
                    properties.Add(property, value);
                else
                {
                    oldValue = Get<T>(property, value);
                    properties[property] = value;
                }
            }
            OnPropertyChanged(new PropertyChangedEventArgs(this, property, oldValue, value));
        }

        /// <exclude/>
        public bool Contains(string property)
        {
            lock (properties)
                return properties.ContainsKey(property);
        }

        /// <exclude/>
        public int Count { get { lock (properties) return properties.Count; } }

        /// <exclude/>
        public bool Remove(string property)
        {
            lock (properties)
                return properties.Remove(property);
        }

        /// <exclude/>
        public override string ToString()
        {
            lock (properties)
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("[Property:{");
                foreach (KeyValuePair<string, object> entry in properties)
                {
                    sb.Append(entry.Key);
                    sb.Append("=");
                    sb.Append(entry.Value);
                    sb.Append(",");
                }
                sb.Append("}]");
                return sb.ToString();
            }
        }

        /// <exclude/>
        public static Property ReadFromAttributes(XmlReader reader)
        {
            Property properties = new Property();
            if (reader.HasAttributes)
            {
                for (int i = 0; i < reader.AttributeCount; i++)
                {
                    reader.MoveToAttribute(i);
                    properties[reader.Name] = reader.Value;
                }
                reader.MoveToElement(); //přesune reader zpět na úzel prvku.
            }
            return properties;
        }

        /// <summary>
        /// Načtení vlastnosti
        /// </summary>
        /// <param name="reader">čtečka vlastnosti</param>
        /// <param name="endElement">Koncový element</param>
        public void ReadProperties(XmlReader reader, string endElement)
        {
            if (reader.IsEmptyElement)
                return;

            while (reader.Read())
                switch (reader.NodeType)
                {
                    case XmlNodeType.EndElement:
                        if (reader.LocalName == endElement)
                            return;
                        break;
                    case XmlNodeType.Element:
                        string propertyName = reader.LocalName;
                        if (propertyName == "Property")
                        {
                            propertyName = reader.GetAttribute(0);
                            Property p = new Property();
                            p.ReadProperties(reader, "Property");
                            properties[propertyName] = p;
                        }
                        else if (propertyName == "Array")
                        {
                            propertyName = reader.GetAttribute(0);
                            properties[propertyName] = ReadArray(reader);
                        }
                        else if (propertyName == "SerializedValue")
                        {
                            propertyName = reader.GetAttribute(0);
                            properties[propertyName] = new SerializedValue(reader.ReadInnerXml());
                        }
                        else
                            properties[propertyName] = reader.HasAttributes ? reader.GetAttribute(0) : null;
                        break;
                }
        }

        ArrayList ReadArray(XmlReader reader)
        {
            if (reader.IsEmptyElement)
                return new ArrayList(0);

            ArrayList l = new ArrayList();
            while (reader.Read())
                switch (reader.NodeType)
                {
                    case XmlNodeType.EndElement:
                        if (reader.LocalName == "Array")
                            return l;
                        break;
                    case XmlNodeType.Element:
                        l.Add(reader.HasAttributes ? reader.GetAttribute(0) : null);
                        break;
                }

            return l;
        }

        /// <exclude/>
        public void WriteProperties(XmlWriter writer)
        {
            lock (properties)
            {
                List<KeyValuePair<string, object>> sortedProperties = new List<KeyValuePair<string, object>>(properties);
                //sortedProperties.Sort((a, b) => StringComparer.OrdinalIgnoreCase.Compare(a.Key, b.Key));
                foreach (KeyValuePair<string, object> entry in sortedProperties)
                {
                    try
                    {
                        object val = entry.Value;
                        if (val == null)
                            continue;

                        if (val is Property)
                        {
                            writer.WriteStartElement("Property");
                            writer.WriteAttributeString("name", entry.Key);
                            ((Property)val).WriteProperties(writer);
                            writer.WriteEndElement();
                        }
                        else if (val is Array || val is ArrayList)
                        {
                            writer.WriteStartElement("Array");
                            writer.WriteAttributeString("name", entry.Key);
                            foreach (object o in (IEnumerable)val)
                            {
                                writer.WriteStartElement("Element");
                                WriteValue(writer, o);
                                writer.WriteEndElement();
                            }
                            writer.WriteEndElement();
                        }
                        else if (TypeDescriptor.GetConverter(val).CanConvertFrom(typeof(string)))
                        {
                            writer.WriteStartElement(entry.Key);
                            WriteValue(writer, val);
                            writer.WriteEndElement();
                        }
                        else if (val is SerializedValue)
                        {
                            writer.WriteStartElement("SerializedValue");
                            writer.WriteAttributeString("name", entry.Key);
                            writer.WriteRaw(((SerializedValue)val).Content);
                            writer.WriteEndElement();
                        }
                        else
                        {
                            writer.WriteStartElement("SerializedValue");
                            writer.WriteAttributeString("name", entry.Key);
                            var serializer = GSerializerFactory.GetXmlSerializer(val.GetType());
                            serializer.Serialize(writer, val, null);
                            writer.WriteEndElement();
                        }
                    }
                    catch (FileNotFoundException) { break; }
                    catch (Exception) { break; }
                }
            }
        }

        void WriteValue(XmlWriter writer, object val)
        {
            if (val != null)
            {
                if (val is string)
                    writer.WriteAttributeString("value", val.ToString());
                else
                {
                    TypeConverter c = TypeDescriptor.GetConverter(val.GetType());
                    writer.WriteAttributeString("value", c.ConvertToInvariantString(val));
                }
            }
        }

        /// <exclude/>
        public void Save(string fileName)
        {
            using (XmlTextWriter writer = new XmlTextWriter(fileName, Encoding.UTF8))
            {
                writer.Formatting = Formatting.Indented;
                writer.WriteStartElement("Property");
                WriteProperties(writer);
                writer.WriteEndElement();
            }
        }

        /// <exclude/>
        public static Property Load(string fileName)
        {
            if (!File.Exists(fileName))
                return null;

            using (XmlTextReader reader = new XmlTextReader(fileName))
                while (reader.Read())
                    if (reader.IsStartElement())
                        switch (reader.LocalName)
                        {
                            case "Property":
                                Property properties = new Property();
                                properties.ReadProperties(reader, "Property");
                                return properties;
                        }

            return null;
        }

        /// <summary>
        /// Získání hodnoty ze seznamu vlastnosti
        /// </summary>
        /// <typeparam name="T">Typ hodnoty</typeparam>
        /// <param name="property">Klíč hledané hodnoty</param>
        /// <param name="defaultValue">Implicitní veličina hledané hodnoty</param>
        /// <returns></returns>
        public T Get<T>(string property, T defaultValue)
        {
            if (string.IsNullOrEmpty(property))
                return defaultValue;

            lock (properties)
            {
                if (!properties.TryGetValue(property, out object o))
                {
                    properties.Add(property, defaultValue);
                    return defaultValue;
                }

                if (o is string && typeof(T) != typeof(string))
                {
                    TypeConverter c = TypeDescriptor.GetConverter(typeof(T));
                    try { o = c.ConvertFromInvariantString(o.ToString()); }
                    catch (Exception)
                    {
                        //MessageService.ShowWarning(GResources.GetResourceText(29450014) + property + "': " + ex.Message); //RC 29450014 : Chyba načtení vlastnosti '
                        o = defaultValue;
                    }
                    properties[property] = o; // uložení pro budoucí look up
                }
                else if (o is ArrayList && typeof(T).IsArray)
                {
                    ArrayList list = (ArrayList)o;
                    Type elementType = typeof(T).GetElementType();
                    Array arr = System.Array.CreateInstance(elementType, list.Count);
                    TypeConverter c = TypeDescriptor.GetConverter(elementType);
                    try
                    {
                        for (int i = 0; i < arr.Length; ++i)
                            if (list[i] != null)
                                arr.SetValue(c.ConvertFromInvariantString(list[i].ToString()), i);

                        o = arr;
                    }
                    catch (Exception)
                    {
                        //MessageService.ShowWarning(GResources.GetResourceText(29450014) + property + "': " + ex.Message);
                        o = defaultValue;
                    }
                    properties[property] = o; // uložení pro budoucí look up
                }
                else if (!(o is string) && typeof(T) == typeof(string))
                {
                    TypeConverter c = TypeDescriptor.GetConverter(typeof(T));
                    if (c.CanConvertTo(typeof(string)))
                        o = c.ConvertToInvariantString(o);
                    else
                        o = o.ToString();
                }
                else if (o is SerializedValue)
                {
                    try { o = ((SerializedValue)o).Deserialize<T>(); }
                    catch (Exception)
                    {
                        //MessageService.ShowWarning(GResources.GetResourceText(29450014) + property + "': " + ex.Message);
                        o = defaultValue;
                    }
                    properties[property] = o; // uložení pro budoucí look up
                }
                try { return (T)o; }
                catch (NullReferenceException)
                {
                    // může nastat při špatné konfiguraci -> o je NULL a hodnota typu není daná
                    return defaultValue;
                }
            }
        }

        /// <exclude/>
        protected virtual void OnPropertyChanged(PropertyChangedEventArgs e)
        {
            PropertyChanged?.Invoke(this, e);
        }
        /// <exclude/>
        public event PropertyChangedEventHandler PropertyChanged;
    }
}
