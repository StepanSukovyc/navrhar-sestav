//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.CodeTemplate.cs                          </Name>
//    <Description> kód šablony                                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-27                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System;
using System.Xml;

namespace Gordic.GFE.Parsers.DefaultEditor
{
    /// <summary>
    /// kód šablony
    /// </summary>
    public class CodeTemplate
    {
        string shortcut = String.Empty;
        string description = String.Empty;
        string text = String.Empty;
        /// <summary>
        /// klávesová zkrátka
        /// </summary>
        public string Shortcut
        {
            get { return shortcut; }
            set { shortcut = value; }
        }
        /// <summary>
        /// popis šablony
        /// </summary>
        public string Description
        {
            get { return description; }
            set { description = value; }
        }
        /// <summary>
        /// text šablony
        /// </summary>
        public string Text
        {
            get { return text; }
            set { text = value; }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public CodeTemplate() { }
        /// <summary>
        /// vytvoření nnové instance třídy
        /// </summary>
        /// <param name="shortcut"></param>
        /// <param name="description"></param>
        /// <param name="text"></param>
        public CodeTemplate(string shortcut, string description, string text)
        {
            this.shortcut = shortcut;
            this.description = description;
            this.text = text;
        }
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="el"></param>
        public CodeTemplate(XmlElement el)
        {
            if (el == null)
                throw new ArgumentNullException("el");

            if (el.Attributes["template"] == null || el.Attributes["description"] == null)
                throw new Exception(GResources.GetResourceText(29450102)); //RC 29450102 : CodeTemplate(XmlElement el): šablony a popis atributů musí existovat (zkontrolujte CodeTemplate XML)!

            Shortcut = el.GetAttribute("template");
            Description = el.GetAttribute("description");
            Text = el.InnerText;
        }
        /// <summary>
        /// Převod na XML element
        /// </summary>
        /// <param name="doc"></param>
        /// <returns></returns>
        public XmlElement ToXmlElement(XmlDocument doc)
        {
            if (doc == null)
                throw new ArgumentNullException("doc");

            XmlElement newElement = doc.CreateElement("CodeTemplate");
            newElement.SetAttribute("template", Shortcut);
            newElement.SetAttribute("description", Description);
            newElement.InnerText = Text;
            return newElement;
        }
    }
}
