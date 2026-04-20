//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.CreateSchemaCommand.cs                 </Name>
//    <Description> Vytvoření schématu založeného na XML v aktuálně aktivním pohledu.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-10                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.XmlEditor.Gui.Editor;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Vytvoření schématu založeného na XML v aktuálně aktivním pohledu.
    /// </summary>
    public class CreateSchemaCommand : AbstractMenuCommand
    {
        /// <summary>
        /// Vytvoření příkazu
        /// </summary>
        public CreateSchemaCommand() { }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            // Nalezení aktivního XmlView.
            XmlView xmlView = XmlView.ActiveXmlView;
            if (xmlView != null)
            {
                // Vytvoření schématu založeného na xml.
                string[] schemas = xmlView.InferSchema();
                if (schemas != null)
                    // vytvoření nového souboru pro generované schéma.
                    for (int i = 0; i < schemas.Length; ++i)
                    {
                        string fileName = GenerateSchemaFileName(xmlView.TextEditorControl.FileName, i + 1);
                        OpenNewXmlFile(fileName, schemas[i]);
                    }
            }
        }

        /// <summary>
        /// Otevření nov=ho XML souboru bez názvu
        /// </summary>
        /// <param name="fileName">Proviórní název</param>
        /// <param name="xml">Obsah</param>
        void OpenNewXmlFile(string fileName, string xml)
        {
            FileAgent.NewFile(fileName, xml);
        }

        /// <summary>
        /// Generuje xsd název souboru založeného na názvu xml souboru.
        /// </summary>
        /// <param name="xmlFileName">Název XML souboru</param>
        /// <param name="count">Počet</param>
        string GenerateSchemaFileName(string xmlFileName, int count)
        {
            string baseFileName = Path.GetFileNameWithoutExtension(xmlFileName);
            string schemaFileName = String.Concat(baseFileName, ".xsd");
            if (count == 1)
                return schemaFileName;
            return schemaFileName = String.Concat(baseFileName, count.ToString(), ".xsd");
        }
    }
}
