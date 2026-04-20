//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.DocfrmDisplayBinding.cs               </Name>
//    <Description> Vázba na Docfrm obálku                                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;

namespace Gordic.Gfe.FormFiller.Gui
{
    /// <summary>
    /// Vázba na Docfrm obálku
    /// </summary>
    class DocfrmDisplayBinding : IDisplayBinding
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
            FileAgent.RecentOpen.GetOrCreateLastFile(file.FileName).Formation = "GRF";

            return new DocfrmFiller().Initialize(file).PrimaryContents.FirstOrDefault();
        }

        /// <summary>
        /// Indikuje, zda lze vytvořit obsah pro soubor z daným rozšířením, specifikovaným v 
        /// SyntaxModes.xml souboru
        /// </summary>
        /// <param name="fileName">Název souboru pro specifikací</param>
        /// <param name="content">Případný obsah</param>
        public bool CanCreateContent(string fileName, string content)
        { return Path.GetExtension(fileName).Equals(".gfrm", StringComparison.InvariantCultureIgnoreCase); }
    }
}
