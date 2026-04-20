//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.StandardHeader.cs                      </Name>
//    <Description> standardní hlavička                                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-19                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Xml;
using System.IO;
using Gordic.General;
using System.Reflection;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.Internal.Templates
{
    /// <summary>
    /// standardní hlavička
    /// </summary>
    public class StandardHeader
    {
        static string version = "1.0";
        static string TemplateFileName = "Gordic.GFE.WinClient.Resources.options.StandardHeader.xml";
        static ArrayList standardHeaders = new ArrayList();

        /// <summary>
        /// seznam hlaviček
        /// </summary>
        public static ArrayList StandardHeaders { get { return standardHeaders; } }
        /// <summary>
        /// Načtení hlaviček
        /// </summary>
        /// <param name="fileName">soubor</param>
        /// <returns></returns>
        static bool LoadHeaders(string fileName)
        {
            if (!File.Exists(fileName))
                return false;

            XmlDocument doc = new XmlDocument();
            try
            {
                doc.Load(fileName);
                version = doc.DocumentElement.GetAttribute("version");
                foreach (XmlElement el in doc.DocumentElement.ChildNodes)
                    standardHeaders.Add(new StandardHeader(el));
            }
            catch (Exception) { return false; }
            return true;
        }
        /// <summary>
        /// uložení hlaviček
        /// </summary>
        public static void StoreHeaders()
        {
            XmlDocument doc = new XmlDocument();
            doc.LoadXml("<StandardProperties version = \"" + version + "\" />");

            foreach (StandardHeader standardHeader in standardHeaders)
            {
                XmlElement newElement = doc.CreateElement("Property");
                newElement.SetAttribute("name", standardHeader.Name);
                newElement.InnerText = standardHeader.Header;
                doc.DocumentElement.AppendChild(newElement);
            }
            doc.Save(Path.Combine(PropertyService.ConfigDirectory, TemplateFileName));
            SetHeaders();
        }
        /// <summary>
        /// nastavení hlaviček
        /// </summary>
        public static void SetHeaders()
        {
            foreach (StandardHeader standardHeader in standardHeaders)
                StringParser.Properties[standardHeader.Name] = standardHeader.Header;
        }

        static StandardHeader()
        {
            UpdateHeaders();
            if (!LoadHeaders(Path.Combine(PropertyService.ConfigDirectory, TemplateFileName)))
                if (!LoadHeaders(FileUtility.Combine(PropertyService.DataDirectory, "options", TemplateFileName)))
                    MessageService.ShowWarning(GResources.GetResourceText(29450539));  //RC 29450539 : Nelze načíst standardní hlavičky!
        }

        static void UpdateHeaders()
        {
            string dataOptionsDir = FileUtility.Combine(PropertyService.DataDirectory, "options");
            if (!Directory.Exists(dataOptionsDir))
                Directory.CreateDirectory(dataOptionsDir);

            Assembly assembly = Assembly.GetAssembly(typeof(StandardHeader));
            bool later = false;

            foreach (string item in assembly.GetManifestResourceNames())
                // jsou to hlavičky šablon
                if (item.EndsWith("Header.xml"))
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

        #region StandardHeader
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
        public string Header
        {
            get;
            set;
        }
        /// <summary>
        /// vytvoření nové instance třídy z elementu
        /// </summary>
        /// <param name="el">element</param>
        public StandardHeader(XmlElement el)
        {
            Name = el.GetAttribute("name");
            Header = el.InnerText;
        }
        /// <summary>
        /// na řetězec
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return "výchozí";
        }
        #endregion
    }
}
