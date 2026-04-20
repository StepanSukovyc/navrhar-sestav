//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DataDisplayBinding.cs                  </Name>
//    <Description> vazba na datový editor                                      </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2014-05-13                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Project;
using System.Collections.Generic;
using System.IO;

namespace Gordic.GFE.WinClient.DataEditor
{
    /// <summary>
    /// vazba na datový editor
    /// </summary>
    class DataDisplayBinding : IDisplayBinding
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

            var dv = new DataView();
            dv.Initialize(file);

            return dv;
        }

        /// <summary>
        /// Indikuje, zda lze vytvořit obsah pro soubor z daným rozšířením, specifikovaným v 
        /// SyntaxModes.xml souboru
        /// </summary>
        /// <param name="fileName">Název souboru pro specifikací</param>
        /// <param name="content">Případný obsah</param>
        public bool CanCreateContent(string fileName, string content)
        {
            if (!File.Exists(fileName))
                return false;  // Soubor ještě neexistuje

            // Načti obsah pokud není poskytnut
            if (string.IsNullOrEmpty(content))
                content = FileReader.ReadFileContent(fileName);

            // Content-based detection pro .tmp a .xml soubory
            return DataView.CanCreateContent(fileName, content);
        }
    }
}
