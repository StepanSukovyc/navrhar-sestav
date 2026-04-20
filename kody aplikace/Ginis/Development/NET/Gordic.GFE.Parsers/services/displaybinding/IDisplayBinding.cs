//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IDisplayBinding.cs                       </Name>
//    <Description> Tato třída definuje rozhraní vazby ReportDesigneru.         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-10                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.Services
{
    /// <summary>
    /// Tato třída definuje rozhraní vazby ReportDesigneru.
    /// Také vytváří IViewContent.
    /// </summary>
    public interface IDisplayBinding
    {
        /// <summary>
        /// události po inicializací 
        /// </summary>
        List<NamedFileOperationDelegate> AfterInitialize { get; }
        /// <summary>
        /// Tato třída vrací TRUE, pokud vazbu lze vytvořit.
        /// Je to dle názvu souboru
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <param name="content">případný obsah souboru</param>
        /// <returns>TRUE - danou vazbou lze pracovat se souborem</returns>
        bool CanCreateContent(string fileName, string content);

        /// <summary>
        /// Vytvoření nového IViewContent objektu dle otevřeného souboru
        /// </summary>
        /// <param name="file">Otevřený soubor</param>
        /// <returns>Pohled na obsah</returns>
        IViewContent CreateContent(OpenedFile file);
    }
}
