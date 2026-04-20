//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.CustomStringTagProvider.cs             </Name>
//    <Description> Poskytovatel hodnot štítků                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-09                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.DefaultEditor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.WinClient.Services;

namespace Gordic.GFE.WinClient.Commands
{
    /// <summary>
    /// Poskytovatel hodnot štítků
    /// </summary>
    class CustomStringTagProvider : IStringTagProvider
    {
        readonly static string[] tags = new string[] {
			"ItemPath", "ItemDir", "ItemFilename", "ItemExt", "ItemNameNoExt",
			"CurLine", "CurCol", "CurText",
			"CurrentProjectName",
			"ProjectDir", "ProjectFilename",
			"CombineDir", "SolutionPath",
			"SolutionDir", "SolutionFilename",
			"Startuppath", "ConfigDirectory",
			"TaskService.Warnings", "TaskService.Errors", "TaskService.Messages"
		};

        /// <summary>
        /// seznam dostupných štítků poskytovatele
        /// </summary>
        public string[] Tags { get { return tags; } }

        string GetCurrentItemPath()
        {
            return SimpleDesktop.Desktop.ActiveViewContent != null ? SimpleDesktop.Desktop.ActiveViewContent.PrimaryFileName : string.Empty;
        }
        /// <summary>
        /// Konverze štítku/zkrátky na hodnotu
        /// </summary>
        /// <param name="tag">Štítek</param>
        /// <returns>Konvertovaná hodnota</returns>
        public string Convert(string tag)
        {
            switch (tag)
            {
                case "TaskService.Warnings":
                    return TaskService.GetCount(TaskType.Warning).ToString();
                case "TaskService.Errors":
                    return TaskService.GetCount(TaskType.Error).ToString();
                case "TaskService.Messages":
                    return TaskService.GetCount(TaskType.Message).ToString();
                case "CurrentProjectName":
                    if (ProjectService.CurrentProject == null)
                        return "<aktuální projekt neexistuje>";
                    else
                        return ProjectService.CurrentProject.Name;

            }
            switch (tag.ToUpperInvariant())
            {
                case "ITEMPATH":
                    try { return GetCurrentItemPath() ?? string.Empty; }
                    catch (Exception) { }
                    break;
                case "ITEMDIR":
                    try { return Path.GetDirectoryName(GetCurrentItemPath()) ?? string.Empty; }
                    catch (Exception) { }
                    break;
                case "ITEMFILENAME":
                    try { return Path.GetFileName(GetCurrentItemPath()) ?? string.Empty; }
                    catch (Exception) { }
                    break;
                case "ITEMEXT":
                    try { return Path.GetExtension(GetCurrentItemPath()) ?? string.Empty; }
                    catch (Exception) { }
                    break;
                case "ITEMNAMENOEXT":
                    try { return Path.GetFileNameWithoutExtension(GetCurrentItemPath()) ?? string.Empty; }
                    catch (Exception) { }
                    break;
                case "CURLINE":
                    {
                        IPositionable positionable = SimpleDesktop.Desktop.ActiveViewContent as IPositionable;
                        if (positionable != null)
                            return (positionable.Line + 1).ToString();
                        break;
                    }
                case "CURCOL":
                    {
                        IPositionable positionable = SimpleDesktop.Desktop.ActiveViewContent as IPositionable;
                        if (positionable != null)
                            return (positionable.Column + 1).ToString();
                        break;
                    }
                case "CURTEXT":
                    {
                        var tecp = SimpleDesktop.Desktop.ActiveViewContent as ITextEditorControlProvider;
                        if (tecp != null)
                            return tecp.TextEditorControl.ActiveTextAreaControl.SelectionManager.SelectedText;
                        break;
                    }

                case "PROJECTDIR":
                    if (ProjectService.CurrentProject != null)
                        return ProjectService.CurrentProject.Directory;
                    break;
                case "PROJECTFILENAME":
                    if (ProjectService.CurrentProject != null)
                        try { return Path.GetFileName(ProjectService.CurrentProject.FileName); }
                        catch (Exception) { }
                    break;

                case "COMBINEDIR":
                case "SOLUTIONDIR":
                    return Path.GetDirectoryName(ProjectService.OpenSolution.FileName);
                case "SOLUTIONFILENAME":
                    try { return Path.GetFileName(ProjectService.OpenSolution.FileName); }
                    catch (Exception) { }
                    break;
                case "SOLUTIONPATH":
                    return FileUtility.NormalizePath(Path.GetFullPath(ProjectService.OpenSolution.FileName));
                case "STARTUPPATH":
                    return Application.StartupPath;
                case "CONFIGDIRECTORY":
                    return PropertyService.ConfigDirectory;
            }
            return String.Empty;
        }

        /// <summary>
        /// nastavení proměnných
        /// </summary>
        /// <param name="list">seznam s aktuálními hodnotami</param>
        internal static void LoadInfoTags(Parsers.GFEAttrList list)
        {
            if (list != null)
            {
                if (list.ContainsKey("xmeta_ver"))
                    StringParser.Properties["Struct_VersionMajor"] = list["xmeta_ver"];
                if (list.ContainsKey("xmeta_subver_min"))
                    StringParser.Properties["Struct_VersionMinor"] = list["xmeta_subver_min"];
                if (list.ContainsKey("ixs_xme"))
                    StringParser.Properties["Struct_IXS_XME"] = list["ixs_xme"];
                if (list.ContainsKey("ixs_alv"))
                    StringParser.Properties["Struct_IXS_ALV"] = list["ixs_alv"];
                if (list.ContainsKey("allowed_output"))
                    StringParser.Properties["Struct_Allowed_Output"] = list["allowed_output"];
                if (list.ContainsKey("maker"))
                    StringParser.Properties["Struct_Maker"] = list["maker"];
                if (list.ContainsKey("filtr_frm"))
                    StringParser.Properties["Struct_Filtr_Frm"] = list["filtr_frm"];
            }
        }
    }
}
