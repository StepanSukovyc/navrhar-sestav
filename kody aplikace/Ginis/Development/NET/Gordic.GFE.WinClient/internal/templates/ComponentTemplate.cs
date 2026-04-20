//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ComponentTemplate.cs                   </Name>
//    <Description> Tato třída definuje a drží šablony nových objektů           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Xml;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.General;
using System.Reflection;

namespace Gordic.GFE.WinClient.Internal.Templates
{
    /// <summary>
    /// Tato třída definuje a drží šablony nových objektů
    /// které jsou trochu podobné šablonám kódu ale nevkládají se automaticky
    /// </summary>
    class ComponentTemplate
    {
        /// <summary>
        /// Seznam dostupných textových podšablon
        /// </summary>
        public static List<ComponentTemplate> ComponentTemplates = new List<ComponentTemplate>();

        /// <summary>
        /// název šablony
        /// </summary>
        public string Name { get { return GetAttribute("name"); } }

        /// <summary>
        /// Seznam záznamů
        /// </summary>
        public List<ComponentTemplateEntry> Entries { get; } = new List<ComponentTemplateEntry>();

        readonly XmlElement element = null;
        /// <summary>
        /// Vytvoření šablony ze souboru
        /// </summary>
        /// <param name="filename">Název souboru</param>
        /// <param name="asm"></param>
        public ComponentTemplate(string filename, Assembly asm)
        {
            try
            {
                XmlDocument doc = new XmlDocument();
                doc.PreserveWhitespace = true;
                doc.Load(GResLocalizer.Localize(filename, asm));
                element = doc.DocumentElement;
                XmlNodeList nodes = element.ChildNodes;
                foreach (var entrynode in nodes)
                    if(entrynode is XmlElement e)
                        Entries.Add(new ComponentTemplateEntry(e));
            }
            catch (Exception e)
            {
                throw new FileLoadException(GResources.GetResourceText(29450537), filename, e); //RC 29450537 : Nelze načíst soubor šablony standardní postranní lišty!
            }
        }

        /// <summary>
        /// získání specifického atributu jednotky
        /// </summary>
        /// <param name="attributeName">název atributu</param>
        /// <returns>hodnota hledaného atributu</returns>
        public string GetAttribute(string attributeName)
        {
            if (element != null)
            {
                XmlNode node = element.HasAttribute(attributeName) ? element.Attributes.GetNamedItem(attributeName) : null;
                if (node != null)
                    return node.InnerText;
            }
            return null;
        }

        static ComponentTemplate()
        {
            if (!Directory.Exists(FileUtility.Combine(PropertyService.DataDirectory, "templates", "graphiclib")))
                Directory.CreateDirectory(FileUtility.Combine(PropertyService.DataDirectory, "templates", "graphiclib"));

            List<string> files = FileUtility.SearchDirectory(FileUtility.Combine(PropertyService.DataDirectory, "templates", "graphiclib"), "*.xml");
#if DEBUG
            if (files.Count != 0)
                foreach (string item in files)
                    try { File.Delete(item); }
                    catch { }
            files.Clear();
#endif
            if (files.Count == 0)
                ResourceService.SaveFile(typeof(ReportDesignerMain).Assembly, FileUtility.Combine(PropertyService.DataDirectory, "templates", "graphiclib"), @"^*templates.graphiclib.*.xml", "templates.graphiclib.");

            files = FileUtility.SearchDirectory(FileUtility.Combine(PropertyService.DataDirectory, "templates", "graphiclib"), "*.xml");
            Assembly asm = Assembly.GetAssembly(typeof(ComponentTemplate));
            foreach (string file in files)
                LoadTextTemplate(file, asm);

            //// načteme uživatelské komponenty
            //if (Directory.Exists(FileUtility.Combine(PropertyService.DataDirectory, "templates", "userslib")))
            //{
            //    files = FileUtility.SearchDirectory(FileUtility.Combine(PropertyService.DataDirectory, "templates", "userslib"), "*.xml");
            //    foreach (string file in files)
            //        LoadTextTemplate(file, asm);
            //}
        }
        static void LoadTextTemplate(string filename, Assembly asm)
        {
            ComponentTemplates.Add(new ComponentTemplate(filename, asm));
        }
    }
}
