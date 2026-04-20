//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.CodeTemplateGroup.cs                     </Name>
//    <Description> skupina šablon na doplnění textu                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-27                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Xml;

namespace Gordic.GFE.Parsers.DefaultEditor
{
    /// <summary>
    /// skupina šablon na doplnění textu
    /// </summary>
    public class CodeTemplateGroup
    {
        List<string> extensions = new List<string>();
        List<CodeTemplate> templates = new List<CodeTemplate>();

        /// <summary>
        /// koncovky
        /// </summary>
        public List<string> Extensions { get { return extensions; } }
        /// <summary>
        /// šablony
        /// </summary>
        public List<CodeTemplate> Templates { get { return templates; } }
        /// <summary>
        /// řetězce koncovek
        /// </summary>
        public string[] ExtensionStrings
        {
            get
            {
                string[] extensionStrings = new string[extensions.Count];
                extensions.CopyTo(extensionStrings, 0);
                return extensionStrings;
            }
            set
            {
                extensions.Clear();
                foreach (string str in value)
                    extensions.Add(str);
            }
        }

        /// <summary>
        /// vytvořen í nové instance třídy
        /// </summary>
        /// <param name="extensions"></param>
        public CodeTemplateGroup(string extensions)
        {
            ExtensionStrings = extensions.Split(';');
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="el"></param>
        public CodeTemplateGroup(XmlElement el)
        {
            if (el == null)
                throw new ArgumentNullException("el");
            string[] exts = el.GetAttribute("extensions").Split(';');
            foreach (string ext in exts)
                extensions.Add(ext);
            foreach (XmlNode childNode in el.ChildNodes)
                if (childNode is XmlElement childElement)
                    templates.Add(new CodeTemplate(childElement));
        }
        /// <exclude/>
        public XmlElement ToXmlElement(XmlDocument doc)
        {
            if (doc == null)
                throw new ArgumentNullException("doc");
            XmlElement newElement = doc.CreateElement("CodeTemplateGroup");

            newElement.SetAttribute("extensions", String.Join(";", ExtensionStrings));

            foreach (CodeTemplate codeTemplate in templates)
                newElement.AppendChild(codeTemplate.ToXmlElement(doc));

            return newElement;
        }

    }
}
