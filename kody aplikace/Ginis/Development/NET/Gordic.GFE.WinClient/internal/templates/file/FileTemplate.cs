//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FileTemplate.cs                        </Name>
//    <Description> Třída definuje a udržuje nové šablony souboru.              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-19                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml;
using System.IO;
using Gordic.General;
using System.Collections;
using System.Reflection;
using Gordic.GFE.Parsers.Core;
using System.ComponentModel.Design;

namespace Gordic.GFE.WinClient.Internal.Templates
{
    /// <summary>
    /// Vlastnosti šablony
    /// </summary>
    public class TemplateProperty
    {
        /// <summary>
        /// Název
        /// </summary>
        public string Name { get; }
        /// <summary>
        /// lokalizovaný název
        /// </summary>
        public string LocalizedName { get; }
        /// <summary>
        /// Typ
        /// </summary>
        public string Type { get; }
        /// <summary>
        /// Kategorie
        /// </summary>
        public string Category { get; }
        /// <summary>
        /// Popis
        /// </summary>
        public string Description { get; }
        /// <summary>
        /// Výchozí hodnota
        /// </summary>
        public string DefaultValue { get; }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="propertyElement"></param>
        public TemplateProperty(XmlElement propertyElement)
        {
            Name = propertyElement.GetAttribute("name");
            LocalizedName = propertyElement.GetAttribute("localizedName");
            Type = propertyElement.GetAttribute("type");
            Category = propertyElement.GetAttribute("category");
            Description = propertyElement.GetAttribute("description");
            DefaultValue = propertyElement.GetAttribute("defaultValue");
        }
    }

    /// <summary>
    /// Typ šablony
    /// </summary>
    public class TemplateType
    {
        /// <summary>
        /// Název
        /// </summary>
        public string Name { get; }
        /// <summary>
        /// dvojice
        /// </summary>
        public Hashtable Pairs { get; } = new Hashtable();
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="enumType"></param>
        public TemplateType(XmlElement enumType)
        {
            Name = enumType.GetAttribute("name");
            foreach (XmlElement node in enumType.ChildNodes)
                Pairs[node.GetAttribute("name")] = node.GetAttribute("value");
        }
    }

    /// <summary>
    /// Třída definuje a udržuje nové šablony souboru.
    /// </summary>
    public sealed class FileTemplate : IComparable
    {
        /// <summary>
        /// šablony
        /// </summary>
        public static List<FileTemplate> FileTemplates = new List<FileTemplate>();

        int IComparable.CompareTo(object other)
        {
            if (!(other is FileTemplate pt)) return -1;
            int res = Category.CompareTo(pt.Category);
            if (res != 0) return res;
            return Name.CompareTo(pt.Name);
        }
        /// <summary>
        /// Autor
        /// </summary>
        public string Author { get; }
        /// <summary>
        /// Název
        /// </summary>
        public string Name { get; }
        /// <summary>
        /// Kategorie
        /// </summary>
        public string Category { get; }
        /// <summary>
        /// Podkategorie
        /// </summary>
        public string Subcategory { get; }
        /// <summary>
        /// Název jazyka
        /// </summary>
        public string LanguageName { get; }
        /// <summary>
        /// Typ šablony
        /// </summary>
        public string Type { get; }
        /// <summary>
        /// Ikonka
        /// </summary>
        public string Icon { get; }
        /// <summary>
        /// Popis
        /// </summary>
        public string Description { get; }
        /// <summary>
        /// Cesta ke průvodci
        /// </summary>
        public string WizardPath { get; }
        /// <summary>
        /// Výchozí název
        /// </summary>
        public string DefaultName { get; }
        /// <summary>
        /// Jedná se o indikátor, že šablona je aktivní
        /// </summary>
        public bool Active { get; }
        /// <summary>
        /// Nastavení souboru
        /// </summary>
        public XmlElement Fileoptions { get; } = null;
        /// <summary>
        /// Viditelnost dialogu na nový soubor
        /// </summary>
        public bool NewFileDialogVisible { get; } = true;
        /// <summary>
        /// šablony souborů
        /// </summary>
        public List<FileDescriptionTemplate> FileDescriptionTemplates { get; } = new List<FileDescriptionTemplate>();
        /// <summary>
        /// Vlastnosti šablony
        /// </summary>
        public List<TemplateProperty> Properties { get; } = new List<TemplateProperty>();

        /// <summary>
        /// typ šablony
        /// </summary>
        public List<TemplateType> CustomTypes { get; } = new List<TemplateType>();

        /// <summary>
        /// indikuje přítomnost vlastnosti
        /// </summary>
        public bool HasProperties { get { return Properties != null && Properties.Count > 0; } }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="filename">název soubrou</param>
        /// <param name="asm"></param>
        public FileTemplate(string filename, Assembly asm)
        {
            XmlDocument doc = new XmlDocument();
            doc.Load(GResLocalizer.Localize(filename, asm));

            Author = doc.DocumentElement.GetAttribute("author");

            XmlElement config = doc.DocumentElement["Config"];
            Name = config.GetAttribute("name");
            Icon = config.GetAttribute("icon");
            Category = config.GetAttribute("category");
            DefaultName = config.GetAttribute("defaultname");
            LanguageName = config.GetAttribute("language");
            Type = config.GetAttribute("type");
            Active = !config.HasAttribute("active") || bool.Parse(config.GetAttribute("active"));

            if (config.HasAttribute("subcategory"))
                Subcategory = config.GetAttribute("subcategory");

            string newFileDialogVisibleAttr = config.GetAttribute("newfiledialogvisible");
            if (newFileDialogVisibleAttr != null && newFileDialogVisibleAttr.Length != 0)
                if (newFileDialogVisibleAttr.Equals("false", StringComparison.OrdinalIgnoreCase))
                    NewFileDialogVisible = false;

            if (doc.DocumentElement["Description"] != null)
                Description = doc.DocumentElement["Description"].InnerText;

            if (config["Wizard"] != null)
                WizardPath = config["Wizard"].Attributes["path"].InnerText;

            if (doc.DocumentElement["Properties"] != null)
            {
                XmlNodeList propertyList = doc.DocumentElement["Properties"].SelectNodes("Property");
                foreach (XmlElement propertyElement in propertyList)
                    Properties.Add(new TemplateProperty(propertyElement));
            }

            if (doc.DocumentElement["Types"] != null)
            {
                XmlNodeList typeList = doc.DocumentElement["Types"].SelectNodes("Type");
                foreach (XmlElement typeElement in typeList)
                    CustomTypes.Add(new TemplateType(typeElement));
            }

            Fileoptions = doc.DocumentElement["AdditionalOptions"];

            doc.DocumentElement.SetAttribute("fileName", filename);
            // načtení souborů
            XmlElement files = doc.DocumentElement["Files"];
            if (files != null)
            {
                XmlNodeList nodes = files.ChildNodes;
                foreach (XmlNode filenode in nodes)
                    if (filenode is XmlElement element)
                        this.FileDescriptionTemplates.Add(new FileDescriptionTemplate(element, Path.GetDirectoryName(filename)));
            }
        }
        /// <summary>
        /// Aktualizace šablony
        /// </summary>
        public static void UpdateTemplates()
        {
            string dataTemplateDir = FileUtility.Combine(PropertyService.DataDirectory, "templates", "file");
            if (!Directory.Exists(dataTemplateDir))
                Directory.CreateDirectory(dataTemplateDir);
            Assembly assembly = Assembly.GetAssembly(typeof(FileTemplate));
            // uložení šablon ze zdrojů do složky
            foreach (string item in assembly.GetManifestResourceNames())
                if (item.EndsWith(".xft") || item.EndsWith(".sss"))
                    try
                    {
                        bool later = false;
                        string name = FileUtility.Combine(dataTemplateDir, item);
                        if (File.Exists(name))
                            using (FileStream fileStream = File.OpenRead(name))
                                later = FileUtility.LaterVersion(assembly.GetManifestResourceStream(item), fileStream);

                        if (later)
                            try { File.Delete(name); }
                            catch { LoggingService.Error(GResources.GetResourceText(29451514)); }

                        if (!File.Exists(name))
                        {
                            Stream stream = assembly.GetManifestResourceStream(item);
                            using (FileStream filestream = new FileStream(name, FileMode.CreateNew))
                                stream.CopyTo(filestream);
                        }
                    }
                    catch { }

            List<string> files = FileUtility.SearchDirectory(dataTemplateDir, "*.xft");
            FileTemplates.Clear();
            Assembly asm = Assembly.GetAssembly(typeof(FileTemplate));
            foreach (string file in files)
                try
                {
                    FileTemplate item = new FileTemplate(file, asm);
                    if (item.Active)
                        FileTemplates.Add(item);
                }
                catch (XmlException ex)
                {
                    MessageService.ShowErrorFormatted(GResources.GetResourceText(29450536) + " '{0}':\n{1}!", file, ex.Message); //RC 29450536 : Chyba načtení šablony souboru
                }
                catch (TemplateLoadException ex)
                {
                    MessageService.ShowErrorFormatted(GResources.GetResourceText(29450536) + " '{0}':\n{1}!", file, ex);
                }
                catch (Exception)
                {
                    MessageService.ShowErrorFormatted(GResources.GetResourceText(29450536) + " '{0}'!", file);
                }
            FileTemplates.Sort();
        }

        static FileTemplate() { UpdateTemplates(); }

        /// <summary>
        /// Získání šablony dle názvu
        /// </summary>
        /// <param name="type">Type šablony</param>
        public static List<FileTemplate> GetTemplateByType(string type)
        {
            List<FileTemplate> result = new List<FileTemplate>();
            try
            {
                FileTemplate fileTemplate = FileTemplates.FirstOrDefault(ft => ft.Type.Equals(type, StringComparison.InvariantCultureIgnoreCase));
                if (fileTemplate != null)
                    result.Add(fileTemplate);
            }
            catch { }
            return result;
        }

        /// <exclude/>
        public override string ToString() { return Name; }

        /// <summary>
        /// Uložení šablon
        /// </summary>
        public static void StoreTemplates()
        {
            foreach (FileTemplate file in FileTemplates)
                file.FileDescriptionTemplates.ForEach(template => template.StoreTemplates());
        }
    }
}
