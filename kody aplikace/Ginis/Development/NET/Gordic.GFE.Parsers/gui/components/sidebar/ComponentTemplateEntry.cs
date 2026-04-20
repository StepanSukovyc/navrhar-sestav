//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ComponentTemplateEntry.cs              </Name>
//    <Description> Třída záznamu                                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-11                                                  </Created>
//  </FileHeader>

using System.Drawing;
using System.Xml;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Třída záznamu
    /// </summary>
    public class ComponentTemplateEntry
    {
        /// <summary>
        /// kolekce atributů
        /// </summary>
        public XmlAttributeCollection Collection { get { return Element?.Attributes; } }
        /// <summary>
        /// Získání atributu dle kliče
        /// </summary>
        /// <param name="key">klič</param>
        /// <returns></returns>
        public string this[string key]
        {
            get
            {
                if (Element != null)
                {
                    XmlNode node = Element.HasAttribute(key) ? Element.Attributes.GetNamedItem(key) : null;
                    if (node != null)
                        return node.InnerText;
                }
                return null;
            }
        }
        /// <summary>
        /// Zobrazený text
        /// </summary>
        public string Display { get { return this["display"]; } }
        /// <summary>
        /// Hodnota
        /// </summary>
        public string Value { get { return this["value"]; } }
        /// <summary>
        /// Třída průvodce
        /// </summary>
        public string WizardPath { get { return this["wizardpath"]; } }

        /// <summary>
        /// Obrázek položky
        /// </summary>
        public Bitmap Icon { get; set; }

        /// <summary>
        /// XML element popisující objekt
        /// </summary>
        public XmlElement Element { get; set; }

        /// <summary>
        /// Vytvoření záznamu z konfigurační větve
        /// </summary>
        /// <param name="el">Element konfigurační větve</param>
        public ComponentTemplateEntry(XmlElement el)
        {
            Element = el;
            string value = this["icon"];
            if (!string.IsNullOrEmpty(value))
                Icon = new Bitmap(WinFormsResourceService.GetBitmap(value), new Size(18, 18));
        }
        /// <exclude/>
        public override string ToString() { return Display; }        
    }

}
