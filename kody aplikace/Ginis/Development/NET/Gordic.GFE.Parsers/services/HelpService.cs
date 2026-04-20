//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.HelpService.cs                   </Name>
//    <Description> Služba pro práci s nápovědou                                </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-09-18                                                  </Created>
//  </FileHeader>

using System;
using System.Linq;
using Gordic.General;
using Gordic.GFE.Parsers.Core;
using System.IO;
using System.Windows.Forms;
using Microsoft.Win32;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Služba pro práci s nápovědou
    /// </summary>
    public static class HelpService
    {
        /// <summary>
        /// indikuje povolení zobrazení obsahu nápovědy
        /// </summary>
        static readonly bool m_bAllowHelpContent = true;
        static readonly string m_csMaxAllowedZonePath = @"SOFTWARE\Microsoft\HTMLHelp\1.x\ItssRestrictions";
        static readonly string m_csMaxAllowedZone = "MaxAllowedZone";
        static readonly UInt32 m_cnDriveRemote = 4;

        /// <summary>
        /// zobrazení nápovědy
        /// </summary>
        /// <param name="appInfo">informace o aplikaci</param>
        public static void ShowHelp(IGApplicationInfo appInfo) { ShowHelp(appInfo, null); }

        /// <summary>
        /// zobrazení nápovědy dle jednoznačného identifikátoru
        /// </summary>
        /// <param name="appInfo">uživatelský process</param>
        /// <param name="helpTopicId">informace o aplikaci</param>
        public static void ShowHelp(IGApplicationInfo appInfo, string helpTopicId)
        {
            string[] l_asHelpFileExt = (string[])(AddInTree.GetTreeNode("/Desktop/HelpFileFilter").BuildChildItems(null)).ToArray(typeof(string));

            if (!m_bAllowHelpContent)
                return;

            string[] l_sFullPath = new string[2];
            string l_sAllPaths = String.Empty;

            for (int i = 0; i < l_asHelpFileExt.Length; i++)
            {
                l_sFullPath[i] =
                    HelpPathWithoutExt(appInfo) 
                    + (l_asHelpFileExt[i].Contains('|') ? l_asHelpFileExt[i].Substring(l_asHelpFileExt[i].IndexOf('|') + 1) : l_asHelpFileExt[i]);
                if (File.Exists(l_sFullPath[i]))
                {
                    if (l_asHelpFileExt[i].EndsWith(".chm"))
                        CheckChmOnNetwork(l_sFullPath[i]);
                    if (helpTopicId == null || helpTopicId.Length == 0)
                        Help.ShowHelp(ProcessService.Desktop.MainForm, l_sFullPath[i]);
                    else
                        Help.ShowHelp(ProcessService.Desktop.MainForm, l_sFullPath[i],
                            HelpNavigator.Topic, helpTopicId + ".htm");
                    return;
                }
                l_sAllPaths += "\n" + l_sFullPath[i];
            }

            MessageBox.Show(
                string.Format(GResources.GetResourceText(29450756) + ":{1}", "\n\n", l_sAllPaths)
                , GResources.GetResourceText(29450757)
                , MessageBoxButtons.OK
                , MessageBoxIcon.Information);
        }

        /// <summary>Zjistí cestu k souboru s nápovědou (bez koncovky)</summary>
        /// <param name="appInfo">informace o aplikaci</param>
        static string HelpPathWithoutExt(IGApplicationInfo appInfo)
        {
            string l_sDir = Path.GetDirectoryName(Application.ExecutablePath);
            string appName = appInfo == null ? "GSAGFE01" : appInfo.Faze.ToString();

            return Path.Combine(l_sDir, appName);
        }

        static void CheckChmOnNetwork(string chmFile)
        {
            object l_oMaxAllowedZone = null;
            Int32 l_nMaxAllowedZone = 0;
            UInt32 l_nDriveType = 0;
            string l_sPathRoot = null;
            /*
            Různé možnosti nastavení MaxAllowedZone: 
            0 - chm pouze z lokálního počítače 
            1 - chm z lokal a inranetu 
            2 - chm z lokal, intranetu a z důvěryhodnych serverů 
            3 - chm z lokal, intranetu, z důvěryhodnych serverů a internetu 
            4 - chm z lokal, intranetu, z důvěryhodnych serverů, internetu a serverů s omezeným přístupem */
            try
            {
                RegistryKey l_oRegKey = Registry.LocalMachine.OpenSubKey(m_csMaxAllowedZonePath);
                if (l_oRegKey != null)
                    l_oMaxAllowedZone = l_oRegKey.GetValue(m_csMaxAllowedZone);
                if (l_oMaxAllowedZone != null)
                    l_nMaxAllowedZone = Convert.ToInt32(l_oMaxAllowedZone);

                l_sPathRoot = Path.GetPathRoot(Path.GetFullPath(chmFile));
                if (l_sPathRoot != null && !l_sPathRoot.EndsWith("\\"))
                    l_sPathRoot += "\\";
                // Pointer to a null-terminated string that specifies the root directory of the disk to return information about. 
                // A trailing backslash is required.
                l_nDriveType = NativeMethods.GetDriveType(l_sPathRoot);
            }
            finally { }
            if (l_nMaxAllowedZone == 0 && l_nDriveType == m_cnDriveRemote)
                MessageBox.Show(
                    GResources.GetResourceText(29450758) 
                    + "/n/n" 
                    + GResources.GetResourceText(29450759)
                    , GResources.GetResourceText(29450760)
                    , MessageBoxButtons.OK
                    , MessageBoxIcon.Warning);
        }

    }
}
