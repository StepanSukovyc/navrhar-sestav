//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ToolLoader.cs                          </Name>
//    <Description> Tato třída se stará o externí nástroje                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-05                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Xml;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.GFE.WinClient.External
{
    /// <summary>
    /// Tato třída se stará o externí nástroje 
    /// </summary>
    class ToolLoader
    {
        static string toolfile = "ReportDesigner-tools.xml";
        static string toolfileversion = "1";

        static List<ExternalTool> tool = new List<ExternalTool>();

        /// <summary>
        /// Seznam nástrojů
        /// </summary>
        public static List<ExternalTool> Tool
        {
            get { return tool; }
            set
            {
                tool = value;
                System.Diagnostics.Debug.Assert(tool != null, "ReportDesigner.Tool.Data.ToolLoader: " + GResources.GetResourceText(29450534)); //RC 29450534 : nastavení seznamu nástrojů (hodnota == null)
            }
        }

        static bool LoadToolsFromStream(string filename)
        {
            if (!File.Exists(filename))
                return false;

            XmlDocument doc = new XmlDocument();
            try
            {
                doc.Load(filename);

                if (doc.DocumentElement.Attributes["version"].InnerText != toolfileversion)
                    return false;

                tool = new List<ExternalTool>();

                XmlNodeList nodes = doc.DocumentElement.ChildNodes;
                foreach (XmlElement el in nodes)
                    tool.Add(new ExternalTool(el));
            }
            catch (Exception) { return false; }
            return true;
        }

        static void WriteToolsToFile(string fileName)
        {
            XmlDocument doc = new XmlDocument();
            doc.LoadXml("<tools version = \"" + toolfileversion + "\" />");

            foreach (ExternalTool et in tool)
                doc.DocumentElement.AppendChild(et.ToXmlElement(doc));

            FileUtility.ObservedSave(new NamedFileOperationDelegate(doc.Save), fileName, FileErrorPolicy.ProvideAlternative, false);
        }

        /// <summary>
        /// Tato metoda načte externí nástroje z XML konfiguračního soubor.
        /// </summary>
        static ToolLoader()
        {
            LoadToolsFromStream(Path.Combine(PropertyService.ConfigDirectory, toolfile));
        }

        /// <summary>
        /// Tato metoda uloží externí nástroje do XML konfiguračního souboru
        /// v aktuálním uživatelském adresáři
        /// </summary>
        public static void SaveTools()
        {
            WriteToolsToFile(FileUtility.Combine(PropertyService.ConfigDirectory, toolfile));
        }
    }
}
