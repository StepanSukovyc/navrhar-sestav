//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.AlfxDisplayBinding.cs                  </Name>
//    <Description> vazba na ALFX soubor                                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-17                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.XmlEditor.Gui.Editor;
using Gordic.GFE.WinClient.Project;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// vazba na ALFX soubor
    /// </summary>
    class AlfxDisplayBinding : IDisplayBinding
    {
        readonly List<NamedFileOperationDelegate> afterInitialize = new List<NamedFileOperationDelegate>();
        /// <summary>
        /// události po inicializací 
        /// </summary>
        public List<NamedFileOperationDelegate> AfterInitialize { get { return afterInitialize; } }

        /// <summary>
        /// Tato třída vrací TRUE, pokud vazbu lze vytvořit.
        /// Je to dle názvu souboru
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <param name="content">případný obsah souboru</param>
        /// <returns>TRUE - danou vazbou lze pracovat se souborem</returns>
        public bool CanCreateContent(string fileName, string content)
        {
            return Path.GetExtension(fileName).Equals(".ALFX", StringComparison.InvariantCultureIgnoreCase);
        }

        /// <summary>
        /// Vytvoření nového IViewContent objektu dle otevřeného souboru
        /// </summary>
        /// <param name="file">Otevřený soubor</param>
        /// <returns>Pohled na obsah</returns>
        public IViewContent CreateContent(OpenedFile file)
        {
            //IParser parser = ParserService.GetParser(file.FileName);
            GFETempDir dir = new GFETempDir(file.FileName);
            string main = FileUtility.NormalizePath(string.Format("{0}\\main.alf", dir.Path));
            bool fileExists = FileUtility.TestFileExists(main);
            if (fileExists || file.FileData != null)
            {
                file.ContentFileName = main;
                IParser parser = ParserService.GetParser(main);
                Encoding encoding = Encoding.Default;
                string content = fileExists ? ParserService.GetParseableFileContent(main, ref encoding)
                    : Encoding.UTF8.GetString(file.FileData);
                if (parser != null)
                {
                    ICompilationUnit unit = parser.Parse(file.FileName, content);

                    RecentOpenFile rof = ProjectService.IsSolutionItem(file.FileName) ? null : Services.FileAgent.RecentOpen.GetOrCreateLastFile(file.FileName);
                    
                    if (!unit.ErrorsDuringCompile)
                    {
                        string t = unit.GetAttributeValue(@"/alf:format", "type").ToUpperInvariant();
                        dynamic v = null;
                        switch (t)
                        {
                            case "GRF":
                            case "GRR":
                                if (rof != null)
                                    rof.Formation = t;
                                v = new GraphicView();
                                break;
                            case "MSE":
                            case "RTF":
                                if (rof != null)
                                    rof.Formation = t;
                                v = new OfficeView();
                                break;
                            default:
                                break;
                        }
                        if (v != null)
                        {
                            v.Initialize(file, t);
                            return v;
                        }
                    }
                }
            }
            var xmlView = new XmlView();
            xmlView.Initialize(file);

            return xmlView;
        }
    }
}
