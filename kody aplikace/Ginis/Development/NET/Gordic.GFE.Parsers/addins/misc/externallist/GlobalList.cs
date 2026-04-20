//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GlobalList.cs                            </Name>
//    <Description> Externí seznam                                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Xml;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.GFE.Parsers.ExternalList
{
    /// <summary>
    /// Externí seznam
    /// </summary>
    public class GlobalList
    {
        string id;
        /// <summary>
        /// Identifikátor seznamu
        /// </summary>
        public string ID { get { return id; } set { id = value; } }
        string displayName;
        /// <summary>
        /// Název seznamu
        /// </summary>
        public string DisplayName { get { return string.IsNullOrEmpty(displayName) ? id : displayName; } set { displayName = value; } }

        private readonly string keyConverter;
        private readonly string valueConverter;
        List<GlobalListItem> items = new List<GlobalListItem>();
        /// <summary>
        /// Položky seznamu
        /// </summary>
        public List<GlobalListItem> Items { get { return items; } }

        /// <summary>
        /// Prázdný konstruktor
        /// </summary>
        public GlobalList() { }

        /// <summary>
        /// Konstruktor dle konfigurační větve
        /// </summary>
        /// <param name="el">Větve konfigurace</param>
        public GlobalList(XmlElement el)
        {
            if (el == null) return;

            if (el.Attributes["id"] == null)
                throw new Exception(GResources.GetResourceText(29450110)); //RC 29450110 : GlobalList(XmlElement el) : atribut 'id' musí existovat (zkontrolujte GlobalList XML)!

            ID = el.Attributes["id"].Value;

            if (el.Attributes["name"] != null)
                displayName = el.Attributes["name"].Value;

            if (el.Attributes["keyConverter"] != null)
                keyConverter = el.Attributes["keyConverter"].Value;

            if (el.Attributes["valueConverter"] != null)
                valueConverter = el.Attributes["valueConverter"].Value;

            foreach (XmlNode item in el.ChildNodes)
            {
                GlobalListItem list = new GlobalListItem(item);

                if (!string.IsNullOrEmpty(list.Key))
                    items.Add(list);
            }
        }

        /// <summary>
        /// Převod na XML jednotku
        /// </summary>
        /// <param name="doc"></param>
        /// <returns></returns>
        public XmlElement ToXmlElement(XmlDocument doc)
        {
            if (doc == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450111)); //RC 29450111 : ExternalTool.ToXmlElement(XmlDocument doc): doc nemůže být null!

            XmlElement el = doc.CreateElement("list");
            XmlAttribute atr = doc.CreateAttribute("id");
            atr.Value = id;
            el.Attributes.Append(atr);

            if (!string.IsNullOrEmpty(keyConverter))
            {
                XmlAttribute atrC = doc.CreateAttribute("keyConverter");
                atrC.Value = keyConverter;
                el.Attributes.Append(atrC);
            }

            if (!string.IsNullOrEmpty(valueConverter))
            {
                XmlAttribute atrC = doc.CreateAttribute("valueConverter");
                atrC.Value = valueConverter;
                el.Attributes.Append(atrC);
            }

            if (!string.IsNullOrEmpty(displayName))
            {
                XmlAttribute atrC = doc.CreateAttribute("name");
                atrC.Value = displayName;
                el.Attributes.Append(atrC);
            }

            foreach (GlobalListItem et in items)
                el.AppendChild(et.ToXmlElement(doc));

            return el;
        }

        /// <summary>
        /// Získání slovníku
        /// </summary>
        /// <returns></returns>
        internal Dictionary<string, string> GetDictionary(bool reverse = false)
        {
            Dictionary<string, string> result = new Dictionary<string, string>();
            foreach (var item in items)
                if (reverse)
                {
                    if (!string.IsNullOrEmpty(item.Value))
                        result.Add(item.Value, item.Key);
                }
                else if (!string.IsNullOrEmpty(item.Key))
                    result.Add(item.Key, item.Value);
            return result;
        }

        internal Dictionary<string, T1> GetDictionaryKey<T1>(T1 type1)
        {
            Dictionary<string, T1> dict = new Dictionary<string, T1>();
            TypeConverter typeKeyConverter = (TypeConverter)(typeof(GlobalList).Assembly.CreateInstance(string.IsNullOrEmpty(keyConverter) ? "System.String" : keyConverter));

            if (typeKeyConverter != null && typeKeyConverter.CanConvertFrom(typeof(string)))
                foreach (var item in items)
                    if (!string.IsNullOrEmpty(item.Key))
                        try { dict.Add(item.Key, (T1)typeKeyConverter.ConvertFromString(item.Key)); }
                        catch { }
            return dict;
        }

        internal Dictionary<T1, T2> GetDictionaryKey<T1, T2>(T1 type1, T2 type2)
        {
            Dictionary<T1, T2> dict = new Dictionary<T1, T2>();

            TypeConverter typeKeyConverter = (TypeConverter)CommonService.GetConverter(keyConverter);
            if (typeKeyConverter == null)
                typeKeyConverter = new StringConverter();

            TypeConverter typeValueConverter = (TypeConverter)CommonService.GetConverter(valueConverter);
            if (typeValueConverter == null)
                typeValueConverter = new StringConverter();

            bool revers = false;
            try
            {
                foreach (var item in items)
                    if (!string.IsNullOrEmpty(item.Key))
                        if (revers)
                            dict.Add((T1)typeValueConverter.ConvertFromString(item.Key), (T2)typeKeyConverter.ConvertFromString(item.Key));
                        else
                            if (typeKeyConverter.ConvertFromString(item.Key).GetType().Equals(typeof(T1)))
                            dict.Add((T1)typeKeyConverter.ConvertFromString(item.Key), (T2)typeValueConverter.ConvertFromString(item.Key));
                        else
                        {
                            dict.Add((T1)typeValueConverter.ConvertFromString(item.Key), (T2)typeKeyConverter.ConvertFromString(item.Key));
                            revers = true;
                        }
            }
            catch (Exception ex)
            {
                MessageService.ShowErrorFormatted(GResources.GetResourceText(29450112) + '\n' + "{0}", ex.Message); //RC 29450112 : Chyba načtení konfigurace seznamu
            }
            return dict;
        }

        /// <summary>
        /// získání položky ze seznamu
        /// </summary>
        /// <typeparam name="T1">typ položky</typeparam>
        /// <param name="name">název objektu pro konverzí</param>
        /// <returns>konvertovaná hodnota</returns>
        internal T1 GetItem<T1>(string name)
        {
            TypeConverter typeKeyConverter = (TypeConverter)CommonService.GetConverter(keyConverter) ?? new StringConverter();
            TypeConverter typeValueConverter = (TypeConverter)CommonService.GetConverter(valueConverter) ?? new StringConverter();
            if (items != null)
            {
                var item = items.Find(pd => pd.Key.Equals(name, StringComparison.InvariantCultureIgnoreCase)) ?? throw new FormatException(GResources.GetResourceText(29450113));
            }
            return (T1)typeKeyConverter.ConvertFromString(name);
        }

        /// <exclude/>
        public override string ToString() => DisplayName;
    }
}
