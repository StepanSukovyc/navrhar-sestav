//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.InfoSection.cs                         </Name>
//    <Description> Info sekce                                                  </Description>
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

using System.Linq;
using Gordic.GFE.Parsers.Utils;

namespace Gordic.GFE.WinClient.Internal.Templates
{
    /// <summary>
    /// Info sekce
    /// </summary>
    public class InfoSection
    {
        static InfoSection()
        {
            LoadSections();
        }

        static string version = "1.0";
        static string SectionFileName = "Gordic.GFE.WinClient.Resources.options.InfoSection.xml";
        static ArrayList sections = new ArrayList();

        /// <summary>
        /// seznam hlaviček
        /// </summary>
        public static ArrayList Sections { get { return sections; } }

        /// <summary>
        /// uložení hlaviček
        /// </summary>
        public static void StoreSections()
        {
            XmlDocument doc = new XmlDocument();
            doc.LoadXml("<StandardProperties version = \"" + version + "\" />");

            foreach (InfoSection infoSection in sections)
            {
                XmlElement newElement = doc.CreateElement("Property");
                newElement.SetAttribute("name", infoSection.Name);

                try
                {
                    var sectionXml = new XmlDocument();
                    sectionXml.LoadXml(infoSection.Section);

                    XmlNodeList lis = sectionXml.GetElementsByTagName("info");
                    foreach (XmlNode item in lis)
                    {
                        XmlNode elo = doc.ImportNode(item, true);
                        newElement.AppendChild(elo);
                    }
                }
                catch { newElement.InnerText = infoSection.Section; }

                doc.DocumentElement.AppendChild(newElement);
            }

            doc.Save(Path.Combine(PropertyService.ConfigDirectory, SectionFileName));

            LoadSections();
            SetSections();
        }
        /// <summary>
        /// nastavení hlaviček
        /// </summary>
        public static void SetSections()
        {
            foreach (InfoSection infoSection in sections)
                StringParser.Properties[infoSection.Name] = infoSection.Section;
        }

        /// <summary>
        /// Načte sections ze souboru
        /// </summary>
        static void LoadSections()
        {
            UpdateSections();

            if (!CreateSectionsArray(Path.Combine(PropertyService.ConfigDirectory, SectionFileName))
                && !CreateSectionsArray(FileUtility.Combine(PropertyService.DataDirectory, "options", SectionFileName)))
                MessageService.ShowWarning(GResources.GetResourceText(29450538));  //RC 29450538 : INFO sekci nelze načíst!
        }

        static void UpdateSections()
        {
            string dataOptionsDir = FileUtility.Combine(PropertyService.DataDirectory, "options");
            if (!Directory.Exists(dataOptionsDir))
                Directory.CreateDirectory(dataOptionsDir);

            Assembly assembly = Assembly.GetAssembly(typeof(InfoSection));
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

        /// <summary>
        /// Načtení hlaviček do sections
        /// </summary>
        /// <param name="fileName">soubor</param>
        /// <returns></returns>
        static bool CreateSectionsArray(string fileName)
        {
            if (!File.Exists(fileName))
                return false;

            XmlDocument doc = new XmlDocument();
            try
            {
                doc.Load(fileName);
                
                version = doc.DocumentElement.GetAttribute("version");
                sections = new ArrayList();
                foreach (XmlElement el in doc.DocumentElement.ChildNodes)
                    sections.Add(new InfoSection(el));
            }
            catch (Exception) { return false; }

            return true;
        }

        #region InfoSection
        /// <summary>
        /// Název sekce
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Obsah sekce
        /// </summary>
        public string Section { get; set; }
        /// <summary>
        /// Xml element sekce
        /// </summary>
        public XmlElement Element { get; private set; }
        /// <summary>
        /// vytvoření nové instance třídy z elementu
        /// </summary>
        /// <param name="el">element</param>
        public InfoSection(XmlElement el)
        {
            Name = el.GetAttribute("name");
            Section = TranslateInnerXml(el.InnerXml);
            Element = el;
        }

        /// <summary>
        /// Při vyjímce ukládání souboru se může xml uložit jako innerText, který potom obsahuje zástupné znaky pro "&gt;" "&lt;", což způsobuje problém při další prací s child elementy. 
        /// Běhmen načtení je třeba tyhle znaky přeložit na valídní xml.
        /// </summary>
        /// <param name="innerXml">innerXml</param>
        /// <returns>Text obsahující &gt; &lt; namísto zástupných znaků</returns>
        string TranslateInnerXml(string innerXml)
        {
            var xmlGt = new[] { "&amp;gt;", "&gt;" }; // >
            var xmlLt = new[] { "&amp;lt;", "&lt;" }; // <

            if (xmlGt.Any(x => innerXml.Contains(x))
                && xmlLt.Any(x => innerXml.Contains(x)))
            {
                xmlLt.ForEach(x => innerXml = innerXml.Replace(x, "<"));
                xmlGt.ForEach(x => innerXml = innerXml.Replace(x, ">"));
            }

            return innerXml;
        }

        /// <summary>
        /// na řetězec
        /// </summary>
        /// <returns></returns>
        public override string ToString() { return Name.Substring("InfoSection.".Length); }
        #endregion
    }
}
