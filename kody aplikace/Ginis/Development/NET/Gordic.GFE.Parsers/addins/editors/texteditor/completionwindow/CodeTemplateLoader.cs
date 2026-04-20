//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.CodeTemplateLoader.cs                    </Name>
//    <Description> Tato třída zpracovává kódu šablony                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-27                                                  </Created>
//  </FileHeader>

using System.Collections;
using System.IO;
using System.Xml;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.GFE.Parsers.DefaultEditor
{
    /// <summary>
    /// Tato třída zpracovává kódu šablony
    /// </summary>
    public class CodeTemplateLoader
    {
        static readonly string TemplateFileName = "ReportDesigner-templates.xml";
        static readonly string TemplateVersion = "1.0";

        static ArrayList templateGroups = new ArrayList();

        /// <exclude/>
        public static ArrayList TemplateGroups
        {
            get { return templateGroups; }
            set
            {
                templateGroups = value;
                System.Diagnostics.Debug.Assert(templateGroups != null);
            }
        }
        /// <exclude/>
        public static CodeTemplateGroup GetTemplateGroupPerFilename(string fileName)
        {
            return GetTemplateGroupPerExtension(Path.GetExtension(fileName));
        }
        /// <exclude/>
        public static CodeTemplateGroup GetTemplateGroupPerExtension(string extension)
        {
            foreach (CodeTemplateGroup group in templateGroups)
                foreach (string groupExtension in group.Extensions)
                    if (groupExtension == extension)
                        return group;
            return null;
        }

        static bool LoadTemplatesFromStream(string filename)
        {
            if (!File.Exists(filename))
                return false;

            XmlDocument doc = new XmlDocument();
            try
            {
                doc.PreserveWhitespace = true;
                doc.Load(filename);

                templateGroups = new ArrayList();

                if (doc.DocumentElement.GetAttribute("version") != TemplateVersion)
                    return false;

                foreach (XmlNode n in doc.DocumentElement.ChildNodes)
                {
                    if (n is XmlElement el)
                        templateGroups.Add(new CodeTemplateGroup(el));
                }
            }
            catch (FileNotFoundException) { return false; }
            return true;
        }

        static void WriteTemplatesToFile(string fileName)
        {
            XmlDocument doc = new XmlDocument();

            doc.LoadXml("<CodeTemplates version = \"" + TemplateVersion + "\" />");

            foreach (CodeTemplateGroup codeTemplateGroup in templateGroups)
                doc.DocumentElement.AppendChild(codeTemplateGroup.ToXmlElement(doc));

            FileUtility.ObservedSave(new NamedFileOperationDelegate(doc.Save), fileName, FileErrorPolicy.ProvideAlternative);
        }

        /// <summary>
        /// Tato metoda načte kód šablon z XML na základě konfiguračního souboru
        /// </summary>
        static CodeTemplateLoader()
        {
            if (!LoadTemplatesFromStream(Path.Combine(PropertyService.ConfigDirectory, TemplateFileName)))
            {
                LoggingService.Info(GResources.GetResourceText(29450103)); //RC 29450103 : Templates: nelze načíst výchozí nastavení uživatele, čtení výchozího nastavení systému.
                if (!LoadTemplatesFromStream(FileUtility.Combine(PropertyService.DataDirectory, "options", TemplateFileName)))
                    LoggingService.Warning(GResources.GetResourceText(29450104)); //RC 29450104 : Templates: nelze načíst konfigurační soubor šablony.
            }
        }

        /// <summary>
        /// Tato metoda uloží kód šablony na bázi XML konfiguračního souboru
        /// </summary>
        public static void SaveTemplates()
        {
            WriteTemplatesToFile(Path.Combine(PropertyService.ConfigDirectory, TemplateFileName));
        }
    }
}
