//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FiletypesAssociationCommand.cs         </Name>
//    <Description> přkaz změny přidružení                                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-05                                                  </Created>
//  </FileHeader>

using System.IO;
using System.Reflection;
using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.WinClient.FileTypeAssociation
{
    /// <summary>
    /// přkaz změny přidružení
    /// </summary>
    class FiletypesAssociationCommand
    {
        /// <summary>
        /// registrace vazby na návrhář
        /// </summary>
        /// <param name="type">typ asociace</param>
        public static void RegisterToReportDesigner(FiletypeAssociation type)
        {
            string mainExe = Assembly.GetEntryAssembly().Location;
            RegistryService.RegisterFiletype(type.Extension,
                             type.Text,
                             '"' + Path.GetFullPath(mainExe) + '"' + " \"%1\"",
                             !string.IsNullOrEmpty(type.Icon) ? Path.GetFullPath(type.Icon) : null);
        }

        /// <summary>
        /// indikuje, zda asociace je již vytviřená
        /// </summary>
        /// <param name="extension">koncovka souboru, dle které se asciace identifikuje</param>
        /// <returns>TRUE - asociace je již vytvořená</returns>
        public static bool IsRegisteredToReportDesigner(string extension)
        {
            string openCommand = RegistryService.GetOpenCommand(extension);

            if (string.IsNullOrEmpty(openCommand))
                return false;

            string mainExe = Assembly.GetEntryAssembly().Location;
            return openCommand.StartsWith(mainExe) || openCommand.StartsWith('"' + mainExe);
        }
        
    }

}
