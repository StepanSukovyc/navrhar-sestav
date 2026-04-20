//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.TemplateSection.cs                     </Name>
//    <Description> Sekce šablon                                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.IO;
using System.Reflection;
using System.Xml;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.GFE.WinClient.Internal.Templates
{
    /// <summary>
    /// Sekce šablon
    /// </summary>
    public class TemplateSection
    {
        static string version = "1.0";
        static string sectionFileName = "Gordic.GFE.WinClient.Resources.options.TemplateSection.xml";
        static ArrayList sections = new ArrayList();

        /// <summary>
        /// seznam hlaviček
        /// </summary>
        public static ArrayList Sections { get { return sections; } }
        /// <summary>
        /// Načtení hlaviček
        /// </summary>
        /// <param name="fileName">soubor</param>
        /// <returns></returns>
        static bool LoadSections(string fileName)
        {
            if (!File.Exists(fileName))
                return false;

            XmlDocument doc = new XmlDocument();
            try
            {
                doc.Load(fileName);
                version = doc.DocumentElement.GetAttribute("version");
                foreach (XmlElement el in doc.DocumentElement.ChildNodes)
                    sections.Add(new TemplateSection(el));
            }
            catch (Exception) { return false; }

            return true;
        }

        /// <summary>
        /// uložení hlaviček
        /// </summary>
        public static void StoreSections()
        {
            XmlDocument doc = new XmlDocument();
            doc.LoadXml("<StandardProperties version = \"" + version + "\" />");
            XmlDocument xmlOldDoc = new XmlDocument();

            foreach (StandardHeader templateSection in sections)
            {
                XmlElement newElement = doc.CreateElement("Property");
                newElement.SetAttribute("name", templateSection.Name);
                try
                {
                    xmlOldDoc.LoadXml(templateSection.Header);
                    XmlNodeList lis = xmlOldDoc.GetElementsByTagName("template");
                    foreach (XmlNode item in lis)
                    {
                        XmlNode elo = doc.ImportNode(item, true);
                        newElement.AppendChild(elo);
                    }
                }
                catch { newElement.InnerText = templateSection.Header; }
                doc.DocumentElement.AppendChild(newElement);
            }
            doc.Save(Path.Combine(PropertyService.ConfigDirectory, sectionFileName));
            SetSections();
        }
        /// <summary>
        /// nastavení hlaviček
        /// </summary>
        public static void SetSections()
        {
            foreach (TemplateSection templateSection in sections)
                StringParser.Properties[templateSection.Name] = templateSection.Section;
        }

        static TemplateSection()
        {
            UpdateSections();
            if (!LoadSections(Path.Combine(PropertyService.ConfigDirectory, sectionFileName)))
                if (!LoadSections(FileUtility.Combine(PropertyService.DataDirectory, "options", sectionFileName)))
                    MessageService.ShowWarning(GResources.GetResourceText(29450543));  //RC 29450543 : Nelze načíst sekci šablony!
        }

        static void UpdateSections()
        {
            string dataOptionsDir = FileUtility.Combine(PropertyService.DataDirectory, "options");
            if (!Directory.Exists(dataOptionsDir))
                Directory.CreateDirectory(dataOptionsDir);

            Assembly assembly = Assembly.GetAssembly(typeof(TemplateSection));
            bool later = false;

            foreach (string item in assembly.GetManifestResourceNames())
                // jsou to hlavičky šablon
                if (item.EndsWith("Section.xml"))
                    try
                    {
                        later = false;
                        string name = FileUtility.Combine(dataOptionsDir, item);
                        if (File.Exists(name))
                            using (FileStream fileStream = File.OpenRead(name))
                                later = FileUtility.LaterVersion(assembly.GetManifestResourceStream(item), fileStream);
                        if (later)
                            FileUtility.ObservedDelete(new System.Collections.Generic.List<string>() { name, Path.Combine(PropertyService.ConfigDirectory, item) });

                        if (!File.Exists(name))
                        {
                            Stream stream = assembly.GetManifestResourceStream(item);
                            using (FileStream filestream = new FileStream(name, FileMode.CreateNew))
                                stream.CopyTo(filestream);
                        }
                    }
                    catch { }
        }

        #region TemplateSection
        /// <summary>
        /// název
        /// </summary>
        public string Name
        {
            get;
            set;
        }
        /// <summary>
        /// hlavička
        /// </summary>
        public string Section
        {
            get;
            set;
        }
        /// <summary>
        /// vytvoření nové instance třídy z elementu
        /// </summary>
        /// <param name="el">element</param>
        public TemplateSection(XmlElement el)
        {
            Name = el.GetAttribute("name");
            Section = el.InnerXml;
        }
        /// <summary>
        /// na řetězec
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return Name.Substring("TemplateSection.".Length);
        }
        #endregion

    }
}
