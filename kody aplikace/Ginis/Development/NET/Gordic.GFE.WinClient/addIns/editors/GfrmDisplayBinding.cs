//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GfrmDisplayBinding.cs                  </Name>
//    <Description> souborová vazba na GFRM projekt                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-24                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// souborová vazba na GFRM projekt
    /// </summary>
    class GfrmDisplayBinding : IDisplayBinding
    {
        readonly List<NamedFileOperationDelegate> afterInitialize = new List<NamedFileOperationDelegate>();
        /// <summary>
        /// události po inicializací 
        /// </summary>
        public List<NamedFileOperationDelegate> AfterInitialize { get => afterInitialize; }

        /// <summary>
        /// Tato třída vrací TRUE, pokud vazbu lze vytvořit.
        /// Je to dle názvu souboru
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <param name="content">případný obsah souboru</param>
        /// <returns>TRUE - danou vazbou lze pracovat se souborem</returns>
        public bool CanCreateContent(string fileName, string content) => Path.GetExtension(fileName).Equals(".gfrm", StringComparison.InvariantCultureIgnoreCase);

        /// <summary>
        /// Vytvoření nového IViewContent objektu dle otevřeného souboru
        /// </summary>
        /// <param name="file">Otevřený soubor</param>
        /// <returns>Pohled na obsah</returns>
        public IViewContent CreateContent(OpenedFile file)
        {
            ProjectService.LoadSolutionOrProject(file.FileName);
            return null;
        }
    }
}
