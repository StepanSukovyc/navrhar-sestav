//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.TextTemplate.cs                        </Name>
//    <Description> Tato třída definuje a drží textové šablony                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Xml;
using Gordic.GFE.Parsers.Core;
using Gordic.General;
using System.Reflection;

namespace Gordic.GFE.WinClient.Internal.Templates
{
    /// <summary>
    /// Tato třída definuje a drží textové šablony
    /// které jsou trochu podobné šablonám kódu ale nevkládají se automaticky
    /// </summary>
    class TextTemplate
    {
        /// <summary>
        /// Třída záznamu
        /// </summary>
        public class Entry
        {
            /// <summary>
            /// Zobrazený text
            /// </summary>
            public string Display;
            /// <summary>
            /// Hodnota
            /// </summary>
            public string Value;

            /// <summary>
            /// Vytvoření záznamu z konfigurační větve
            /// </summary>
            /// <param name="el">Element konfigurační větve</param>
            public Entry(XmlElement el)
            {
                this.Display = el.Attributes["display"].InnerText;
                this.Value = el.Attributes["value"].InnerText;
            }
            /// <exclude/>
            public override string ToString()
            {
                return Display;
            }
        }

        /// <summary>
        /// Seznam dostupných textových podšablon
        /// </summary>
        public static List<TextTemplate> TextTemplates = new List<TextTemplate>();

        string name = null;
        List<Entry> entries = new List<Entry>();

        /// <summary>
        /// název šablony
        /// </summary>
        public string Name { get { return name; } }

        /// <summary>
        /// Seznam záznamů
        /// </summary>
        public List<Entry> Entries { get { return entries; } }

        /// <summary>
        /// Vytvoření šablony ze souboru
        /// </summary>
        /// <param name="filename">Název souboru</param>
        /// <param name="asm"></param>
        public TextTemplate(string filename, Assembly asm)
        {
            try
            {
                XmlDocument doc = new XmlDocument();
                doc.Load(GResLocalizer.Localize(filename, asm));

                name = doc.DocumentElement.Attributes["name"].InnerText;

                XmlNodeList nodes = doc.DocumentElement.ChildNodes;
                foreach (XmlElement entrynode in nodes)
                    entries.Add(new Entry(entrynode));
            }
            catch (Exception e)
            {
                throw new FileLoadException(GResources.GetResourceText(29450537), filename, e); //RC 29450537 : Nelze načíst soubor šablony standardní postranní lišty!
            }
        }

        static TextTemplate()
        {
            if (!Directory.Exists(FileUtility.Combine(PropertyService.DataDirectory, "templates", "textlib")))
                Directory.CreateDirectory(FileUtility.Combine(PropertyService.DataDirectory, "templates", "textlib"));

            List<string> files = FileUtility.SearchDirectory(FileUtility.Combine(PropertyService.DataDirectory, "templates", "textlib"), "*.xml");

            if (files.Count == 0)
                ResourceService.SaveFile(typeof(ReportDesignerMain).Assembly, FileUtility.Combine(PropertyService.DataDirectory, "templates", "textlib"), @"^*templates.textlib.*.xml", "templates.textlib.");

            files = FileUtility.SearchDirectory(FileUtility.Combine(PropertyService.DataDirectory, "templates", "textlib"), "*.xml");
            Assembly asm = Assembly.GetAssembly(typeof(TextTemplate));
            foreach (string file in files)
                LoadTextTemplate(file, asm);
        }
        static void LoadTextTemplate(string filename, Assembly asm)
        {
            TextTemplates.Add(new TextTemplate(filename, asm));
        }
    }
}
