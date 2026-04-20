//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AddInInstallBinding.cs                   </Name>
//    <Description> vázba na nástroj instalace doplòku                          </Description>
//    <Author>      Mgr. Stepan Sukovyè                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-07-02                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Services;
using System;
using System.Collections.Generic;
using System.IO;

namespace Gordic.GFE.Parsers.AddInManager
{
    /// <summary>
    /// vázba na nástroj instalace doplòku
    /// </summary>
	public class AddInInstallBinding : IDisplayBinding
	{
        /// <summary>
        /// události po inicializací 
        /// </summary>
        public List<Core.NamedFileOperationDelegate> AfterInitialize
        {
            get { return new List<Core.NamedFileOperationDelegate>(); }
        }

        /// <summary>
        /// Tato tøída vrací TRUE, pokud vazbu lze vytvoøit.
        /// Je to dle názvu souboru
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <param name="content">pøípadný obsah souboru</param>
        /// <returns>TRUE - danou vazbou lze pracovat se souborem</returns>
        public bool CanCreateContent(string fileName, string content)
        {
            return !string.IsNullOrEmpty(fileName)
                && (Path.GetExtension(fileName).Equals(".addin", StringComparison.OrdinalIgnoreCase)
                || Path.GetExtension(fileName).Equals(".rdaddin", StringComparison.OrdinalIgnoreCase));
        }

        /// <summary>
        /// Vytvoøení nového IViewContent objektu dle otevøeného souboru
        /// </summary>
        /// <param name="file">Otevøený soubor</param>
        /// <returns>Pohled na obsah</returns>
        public Gui.IViewContent CreateContent(OpenedFile file)
        {
            ManagerForm.ShowForm();
            ManagerForm.Instance.ShowInstallableAddIns(new string[] { file.FileName });
            return null;
        }
    }
}
