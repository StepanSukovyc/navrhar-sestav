//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.XmlDisplayBinding.cs                   </Name>
//    <Description> Zobrazení vazby pro XML editor.                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.IO;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.DataEditor;

namespace Gordic.GFE.WinClient.XmlEditor.Gui.Editor
{
    /// <summary>
    /// Zobrazení vazby pro XML editor.
    /// </summary>
    class XmlDisplayBinding : IDisplayBinding
    {
        readonly List<NamedFileOperationDelegate> afterInitialize = new List<NamedFileOperationDelegate>();
        /// <summary>
        /// události po inicializací 
        /// </summary>
        public List<NamedFileOperationDelegate> AfterInitialize { get { return afterInitialize; } }

        /// <summary>
        /// Vytvoření obsahu pro soubor
        /// </summary>
        /// <param name="file">Otevřený soubor</param>
        /// <returns></returns>
        public IViewContent CreateContent(OpenedFile file)
        {
            if (!ProjectService.IsSolutionItem(file.FileName))
                Services.FileAgent.RecentOpen.GetOrCreateLastFile(file.FileName);

            var xmlView = new XmlView();
            xmlView.Initialize(file);

            return xmlView;
        }

        /// <summary>
        /// Indikuje, zda lze vytvořit obsah pro soubor z daným rozšířením, specifikovaným v 
        /// SyntaxModes.xml souboru
        /// </summary>
        /// <param name="fileName">Název souboru pro specifikací</param>
        /// <param name="content">Případný obsah</param>
        public bool CanCreateContent(string fileName, string content)
        {
            // Pro .tmp a .xml soubory rozhodujeme podle OBSAHU, ne přípony
            string extension = System.IO.Path.GetExtension(fileName)?.ToLower();

            if (extension == ".tmp" || extension == ".xml")
            {
                // Content-based detection
                if (string.IsNullOrEmpty(content) && File.Exists(fileName))
                    content = FileReader.ReadFileContent(fileName);

                // Je to datový soubor? (má přednost před XML)
                if (DataView.IsValidContent(content))
                    return false;  // Nechť to zpracuje DataDisplayBinding

                // Je to XML?
                return ParserService.IsWellFormedXML(content, out string errorMessage);
            }

            // Pro ostatní přípony - standardní logika
            return XmlView.IsFileNameHandled(fileName) || ParserService.IsWellFormedXML(content, out string _);
        }
    }
}
