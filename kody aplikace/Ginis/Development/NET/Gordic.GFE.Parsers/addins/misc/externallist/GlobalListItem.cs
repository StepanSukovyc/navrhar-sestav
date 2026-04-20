//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GlobalListItem.cs                        </Name>
//    <Description> Položka globálního seznamu                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-08                                                  </Created>
//  </FileHeader>

using System;
using System.Xml;

namespace Gordic.GFE.Parsers.ExternalList
{
    /// <summary>
    /// Položka globálního seznamu
    /// </summary>
    public class GlobalListItem
    {
        string key = string.Empty, value = string.Empty;

        /// <summary>
        /// Klíč-identifikátor větve
        /// </summary>
        public string Key { get { return key; } set { key = value; } }
        /// <summary>
        /// hodnota položky
        /// </summary>
        public string Value { get { return value; } set { this.value = value; } }

        /// <summary>
        /// Vytvoření nové instance třídy dle konfigurační větve
        /// </summary>
        /// <param name="item">Informace o větvi</param>
        public GlobalListItem(System.Xml.XmlNode item)
        {
            if (item.Attributes == null)
                return;

            key = item.Attributes["key"] == null || string.IsNullOrEmpty(item.Attributes["key"].Value) ? null : item.Attributes["key"].Value;
            value = item.Attributes["value"] == null || string.IsNullOrEmpty(item.Attributes["value"].Value) ? null : item.Attributes["value"].Value;
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="key">Klíč</param>
        /// <param name="value">Hodnota klíče</param>
        public GlobalListItem(string key, string value)
        {
            this.key = key;
            this.value = value;
        }

        /// <summary>
        /// Vytvoření konfigurační větve
        /// </summary>
        /// <param name="doc">dokument, do kterého se větev vytváří</param>
        /// <returns>Větěv popisující danou položku</returns>
        internal System.Xml.XmlNode ToXmlElement(System.Xml.XmlDocument doc)
        {
            if (doc == null)
                throw new ArgumentNullException(Gordic.General.GResources.GetResourceText(29450114)); //RC 29450114 : ExternalList.ToXmlElement(XmlDocument doc): doc nemůže být null!

            XmlElement x = doc.CreateElement("item");
            XmlAttribute atrKey = doc.CreateAttribute("key");
            atrKey.Value = key;
            x.Attributes.Append(atrKey);

            if (!string.IsNullOrEmpty(value))
            {
                XmlAttribute atrValue = doc.CreateAttribute("value");
                atrValue.Value = value;
                x.Attributes.Append(atrValue);
            }
            return x;
        }
    }
}
