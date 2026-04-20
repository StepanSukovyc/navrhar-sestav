//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FileDescriptionTemplate.cs             </Name>
//    <Description> Popisovač šablony souboru                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-19                                                  </Created>
//  </FileHeader>

using System;
using System.Xml;
using Gordic.General;
using System.IO;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.Internal.Templates
{
    /// <summary>
    /// typy vytvářených souborů
    /// </summary>
    public enum FileType
    {
        /// <summary>
        /// projekt
        /// </summary>
        project,
        /// <summary>
        /// soubor
        /// </summary>
        file
    }
    /// <summary>
    /// Popisovač šablony souboru
    /// </summary>
    public class FileDescriptionTemplate
    {
        string name, language, template, content, fileName;

        // Buď content nebo contentData jsou nastavené, jiné je NULL
        byte[] contentData;

        /// <summary>
        /// Jakýsi idenifikátor šablony
        /// </summary>
        public string Template { get { return template; } }
        /// <summary>
        /// Název
        /// </summary>
        public string Name { get { return name; } }
        /// <summary>
        /// Jazyk
        /// </summary>
        public string Language { get { return language; } }
        /// <summary>
        /// Obsah souboru šablony
        /// </summary>
        public string Content { get { return content; } set { content = value; } }
        /// <summary>
        /// Binární obsah
        /// </summary>
        public byte[] ContentData { get { return contentData; } }

        FileType filetype = FileType.file;
        /// <summary>
        /// Obsah souboru šablony
        /// </summary>
        public FileType FileType { get { return filetype; } set { filetype = value; } }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="xml">element</param>
        /// <param name="hintPath">Adresář relativní cesty</param>
        public FileDescriptionTemplate(XmlElement xml, string hintPath)
        {
            TemplateLoadException.AssertAttributeExists(xml, "name");

            name = xml.GetAttribute("name");
            language = xml.GetAttribute("language");
            template = xml.GetAttribute("template");
            
            if (xml.HasAttribute("filetype"))
                filetype = (FileType)Enum.Parse(typeof(FileType), xml.GetAttribute("filetype"));

            if (xml.HasAttribute("src"))
            {
                fileName = Path.Combine(hintPath, StringParser.Parse(xml.GetAttribute("src")));
                try
                {
                    if (xml.HasAttribute("binary") && bool.Parse(xml.GetAttribute("binary")))
                        contentData = File.ReadAllBytes(fileName);
                    else
                        content = File.ReadAllText(fileName);
                }
                catch (Exception e) { content = string.Format(GResources.GetResourceText(29450535) + " '{0}':\n{1}", fileName, e.ToString()); } //RC 29450535 : Chyba načtení obsahu z
            }
            else
                content = xml.InnerText;
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="name">název</param>
        /// <param name="language">jazyk</param>
        /// <param name="content">obsah</param>
        /// <param name="template">Identifikátor šablony</param>
        /// <param name="filetype">typ souboru</param>
        public FileDescriptionTemplate(string name, string language, string content, string template, string filetype)
        {
            this.name = name;
            this.language = language;
            this.content = content;
            this.template = template;
            this.filetype = (FileType)Enum.Parse(typeof(FileType), filetype);
        }

        /// <summary>
        /// Uložení šablony
        /// </summary>
        public void StoreTemplates()
        {
            if (FileUtility.TestFileExists(fileName))
                try
                {
                    if (string.IsNullOrEmpty(content))
                        File.WriteAllBytes(fileName, contentData);
                    else File.WriteAllText(fileName, content);
                }
                catch { }
        }
        /// <exclude/>
        public override string ToString() { return Language; }
    }
}
