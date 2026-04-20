//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GfrmService.cs                           </Name>
//    <Description> pomocná služba GFRM projektu                                </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-05-27                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Dom;
using System.IO;

namespace Gordic.GFE.Parsers.AddIns.Project
{
    /// <summary>
    /// pomocná služba GFRM projektu
    /// </summary>
    public static class GfrmService
    {
        /// <summary>
        /// Načtení sekce z informací o souboru
        /// </summary>
        /// <param name="item">Informace o souboru</param>
        /// <returns>Sekce projektu dle typu souboru</returns>
        public static ProjectSection ReadSection(FileInfo item)
        {
            ProjectSection newFolder = null; 
            switch (item.Extension)
            {
                case ".alf":
                    newFolder = new ProjectSection(item.Name, ItemType.Content);
                    break;
                case ".tmp":
                    newFolder = new ProjectSection(item.Name, ItemType.Data);
                    break;
                case ".xme":
                    newFolder = new ProjectSection(item.Name, ItemType.Structure);
                    break;
                default:
                    newFolder = new ProjectSection(item.Name, ItemType.None);
                    break;
            }
            newFolder.Items.Add(new SolutionItem(item.Name, item.DirectoryName));
            return newFolder;
        }

        /// <summary>
        /// Načtení sekce
        /// </summary>
        /// <param name="content">obsah</param>
        /// <param name="ext">Typ souboru dle ukončení</param>
        /// <param name="path">Cesta k souboru</param>
        /// <returns></returns>
        internal static ProjectSection ReadSection(byte[] content, FillerExtensions ext, string path)
        {
            string fileName = "";
            switch (ext)
            {
                case FillerExtensions.format:
                    fileName = "format.alf";
                    break;
                case FillerExtensions.data:
                    fileName = "data.tmp";
                    break;
                case FillerExtensions.structure:
                    fileName = "structure.xme";
                    break;
                case FillerExtensions.archive:
                    fileName = "format.zip";
                    break;
                default:
                    break;
            }

            if (string.IsNullOrEmpty(fileName))
                return null;

            using (Stream stream = File.OpenWrite(Path.Combine(path, fileName)))
                for (int i = 0; i < content.Length; i++)
                    stream.WriteByte(content[i]);

            ProjectSection newFolder = null;
            switch (ext)
            {
                case FillerExtensions.format:
                    newFolder = new ProjectSection(fileName, ItemType.Content);
                    break;
                case FillerExtensions.data:
                    newFolder = new ProjectSection(fileName, ItemType.Data);
                    break;
                case FillerExtensions.structure:
                    newFolder = new ProjectSection(fileName, ItemType.Structure);
                    break;
                case FillerExtensions.archive:
                    newFolder = new ProjectSection(fileName, ItemType.Archive);
                    break;
                default:
                    newFolder = new ProjectSection(fileName, ItemType.None);
                    break;
            }
            newFolder.Items.Add(new SolutionItem(fileName, path));
            return newFolder;
        }
    }
}
