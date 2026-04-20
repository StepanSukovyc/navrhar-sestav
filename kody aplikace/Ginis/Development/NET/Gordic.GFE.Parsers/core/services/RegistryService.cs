//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.RegistryService.cs                       </Name>
//    <Description> služba pro práci s registry                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-08-08                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Utils;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;

namespace Gordic.GFE.Parsers.Services
{
    /// <summary>
    /// služba pro práci s registry
    /// </summary>
    public static class RegistryService
    {
        const string explorerFileExts = @"Software\Microsoft\Windows\CurrentVersion\Explorer\FileExts";

        static bool SetRegistryDirectoryValue(String mru, List<string> names)
        {
            try
            {
                RegistryKey rk = Registry.CurrentUser.OpenSubKey(mru);
                if (rk != null)
                {
                    string[] sub = rk.GetSubKeyNames();
                    bool isValues = false;
                    if (sub.Length == 0)
                    {
                        int index = 0;
                        string value = GetValue(rk, Convert.ToString(index));

                        while (!string.IsNullOrEmpty(value))
                        {
                            if (!names.Contains(value))
                                names.Add(value);
                            index++;
                            value = GetValue(rk, Convert.ToString(index));
                        }
                    }
                    else
                        foreach (string skName in sub)
                        {
                            RegistryKey sk = isValues ? rk : rk.OpenSubKey(skName);

                            int index = 0;
                            string value = GetValue(sk, Convert.ToString(index));

                            while (!string.IsNullOrEmpty(value))
                            {
                                if (!names.Contains(value))
                                    names.Add(value);
                                index++;
                                value = GetValue(sk, Convert.ToString(index));
                            }
                        }
                    return names.Count != 0;
                }
            }
            catch { }
            return false;
        }
        [System.Runtime.ExceptionServices.HandleProcessCorruptedStateExceptions]
        static string GetValue(RegistryKey sk, string key)
        {
            try
            {
                object value = sk.GetValue(key);
                if (value != null)
                {
                    byte[] data = (byte[])(value);

                    IntPtr p = Marshal.AllocHGlobal(data.Length);
                    Marshal.Copy(data, 0, p, data.Length);

                    // získání počtu dat
                    UInt32 cidl = (UInt32)Marshal.ReadInt16(p);

                    // získání nadřazené složky
                    UIntPtr parentpidl = (UIntPtr)((UInt32)p);

                    StringBuilder path = new StringBuilder(256);
                    NativeMethods.SHGetPathFromIDListW(parentpidl, path);

                    Marshal.Release(p);

                    return path.ToString();
                }
            }
            catch { }
            return null;
        }
        /// <summary>
        /// získání výchozí složky pro dialogové okno OpenDirectory 
        /// </summary>
        /// <returns></returns>
        public static List<string> GetRegistryDirectoryValue()
        {
            List<string> names = new List<string>();

            if (!SetRegistryDirectoryValue(@"Software\Microsoft\Windows\CurrentVersion\Explorer\ComDlg32\LastVisitedPidlMRU", names))
                if (!SetRegistryDirectoryValue(@"Software\Microsoft\Windows\CurrentVersion\Explorer\ComDlg32\OpenSavePidlMRU", names))
                    SetRegistryDirectoryValue(@"Software\Microsoft\Windows\CurrentVersion\Explorer\ComDlg32\OpenSaveMRU", names);

            return names;
        }

        /// <summary>
        /// Cesta k registru dle klíče
        /// </summary>
        /// <param name="key">Klíč k registru</param>
        /// <param name="valueName">Název hledané hodnoty</param>
        /// <returns></returns>
        public static string GetPathFromRegistry(string key, string valueName)
        {
            using (RegistryKey installRootKey = Registry.LocalMachine.OpenSubKey(key))
                if (installRootKey != null)
                {
                    object o = installRootKey.GetValue(valueName);
                    if (o != null)
                    {
                        string r = o.ToString();
                        if (!string.IsNullOrEmpty(r))
                            return r;
                    }
                }
            return null;
        }

        /// <summary>
        /// získání příkazu
        /// </summary>
        /// <param name="extension"></param>
        /// <returns></returns>
        public static string GetOpenCommand(string extension)
        {
            try
            {
                string clsKeyName = null;
                using (RegistryKey extKey = Registry.CurrentUser.OpenSubKey(explorerFileExts + "\\." + extension))
                    if (extKey != null)
                        clsKeyName = (string)extKey.GetValue("Progid", "");
                if (string.IsNullOrEmpty(clsKeyName))
                    using (RegistryKey extKey = Registry.ClassesRoot.OpenSubKey("." + extension))
                        if (extKey != null)
                            clsKeyName = (string)extKey.GetValue("", "");
                        else
                            return null;
                using (RegistryKey cmdKey = Registry.ClassesRoot.OpenSubKey(clsKeyName + "\\shell\\open\\command"))
                    return cmdKey != null ? (string)cmdKey.GetValue("", "") : null;
            }
            catch (System.Security.SecurityException)
            {
                // přístup k registru může být odepřen
                return null;
            }
        }

        /// <summary>
        /// registrace typu souboru
        /// </summary>
        /// <param name="extension">koncovka souboru</param>
        /// <param name="description">popis</param>
        /// <param name="command">příkaz</param>
        /// <param name="icon">ikonka souboru</param>
        public static void RegisterFiletype(string extension, string description, string command, string icon)
        {
            // odstraníme případné systémové přidružení souboru
            RemoveSystemAssociationType(extension);
            try { RegisterFiletype(Registry.ClassesRoot, extension, description, command, icon); }
            catch (UnauthorizedAccessException ex)
            {
                LoggingService.Info(GResources.GetResourceText(29450704) + ": " + ex.Message);
                try { RegisterFiletype(Registry.CurrentUser.CreateSubKey("Software\\Classes"), extension, description, command, icon); }
                catch (Exception _ex) { MessageService.ShowError(_ex); }
            }
            NotifyShellAfterChanges();
        }

        static void RemoveSystemAssociationType(string extension)
        {
            object value = string.Empty;
            try
            {
                RegistryKey appKey = null;
                RegistryKey sysRoaming = Registry.CurrentUser.OpenSubKey(@"Software\Microsoft\Windows\Roaming\OpenWith\FileExts", true);
                // hledámé záznam 
                // HKEY_CURRENT_USER\Software\Microsoft\Windows\Roaming\OpenWith\FileExts\.ALF\UserChoice
                if (sysRoaming.GetSubKeyNames().ToList().Exists(itm => itm.Equals("." + extension, StringComparison.InvariantCultureIgnoreCase)))
                {
                    string keyName = sysRoaming.GetSubKeyNames().ToList().First(itm => itm.Equals("." + extension, StringComparison.InvariantCultureIgnoreCase));
                    RegistryKey sysSubRoaming = sysRoaming.OpenSubKey(keyName, true);
                    if (sysSubRoaming.GetSubKeyNames().Contains("UserChoice"))
                    {
                        RegistryKey sysSubRoamingUserChoice = sysSubRoaming.OpenSubKey("UserChoice", true);
                        if (sysSubRoamingUserChoice != null)
                        {
                            if (sysSubRoamingUserChoice.GetValueNames().Contains("ProgId"))
                                value = sysSubRoamingUserChoice.GetValue("ProgId");

                            try { sysSubRoaming.DeleteSubKey("UserChoice"); }
                            catch (Exception ex) { MessageService.ShowError(ex); }
                        }
                    }
                }
                // hledámé záznam 
                // HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\FileExts\.alf\UserChoice
                if (value == null || string.IsNullOrEmpty(value.ToString()))
                {
                    appKey = Registry.CurrentUser.OpenSubKey(@"Software\Microsoft\Windows\CurrentVersion\Explorer\FileExts\.alf\UserChoice");
                    if (appKey != null && appKey.GetValueNames().Contains("ProgId"))
                        value = appKey.GetValue("ProgId");
                }

                if (value != null && !string.IsNullOrEmpty(value.ToString()))
                {
                    List<string> v = value.ToString().Split('\\').ToList();

                    appKey = Registry.CurrentUser.OpenSubKey(@"Software\Classes\" + value.ToString(), true);
                    if (appKey != null)
                    {
                        string newKey = string.Empty;
                        for (int i = 0; i < v.Count - 1; i++)
                            newKey += @"\" + v[i];

                        RegistryKey nK = Registry.CurrentUser.OpenSubKey(@"Software\Classes" + newKey, true);
                        if (nK != null)
                            nK.DeleteSubKeyTree(v.Last());
                    }
                }
            }
            catch (Exception ex) { MessageService.ShowError(ex); }
        }

        static void RegisterFiletype(RegistryKey rootKey, string extension, string description, string command, string icon)
        {
            RegistryKey extKey, clsKey, openKey;
            extKey = rootKey.CreateSubKey("." + extension);
            // uložit předchozí přidružení
            string prev = (string)extKey.GetValue("", "");
            if (prev != "" && prev != ("RD." + extension + "file"))
                extKey.SetValue("PreRD", extKey.GetValue(""));
            extKey.SetValue("", "RD." + extension + "file");
            extKey.Close();

            try
            {
                extKey = Registry.CurrentUser.OpenSubKey(explorerFileExts + "\\." + extension, true);
                if (extKey != null && extKey.GetValue("Progid") != null)
                {
                    extKey.DeleteValue("Progid");
                    extKey.Close();
                }
            }
            catch (Exception ex) { MessageService.ShowError(ex); }

            clsKey = rootKey.CreateSubKey("RD." + extension + "file");

            clsKey.SetValue("", StringParser.Parse(description));
            if (icon != null)
                clsKey.CreateSubKey("DefaultIcon").SetValue("", '"' + icon + '"');

            openKey = clsKey.CreateSubKey("shell\\open\\command");
            openKey.SetValue("", command);
            openKey.Close();
            clsKey.Close();
        }
        /// <summary>
        /// odregistrace souboru dle koncovky
        /// </summary>
        /// <param name="extension"></param>
        public static void UnRegisterFiletype(string extension)
        {
            UnRegisterFiletype(extension, Registry.ClassesRoot);
            try { UnRegisterFiletype(extension, Registry.CurrentUser.CreateSubKey("Software\\Classes")); }
            catch { } // zachycení výjimky CreateSubKey(Software\Classes)
            NotifyShellAfterChanges();
        }

        static void UnRegisterFiletype(string extension, RegistryKey root)
        {
            try { root.DeleteSubKeyTree("RD." + extension + "file"); }
            catch { }
            try
            {
                RegistryKey extKey;
                extKey = root.OpenSubKey("." + extension, true);

                // pokud přidružení nejsou, pak return
                if (extKey == null) return;
                // při jiných přidruženích taky return
                if ((string)extKey.GetValue("", "") != ("RD." + extension + "file")) return;

                // obnovení předchozích přidružení
                string prev = (string)extKey.GetValue("PreRD", "");
                if (prev != "")
                    extKey.SetValue("", prev);
                extKey.Close();
                if (prev != null)
                    root.DeleteSubKeyTree("." + extension);
            }
            catch { }
        }
        /// <summary>
        /// Informujte Průzkumníka Windows, které ikony zástupců se změnily.
        /// </summary>
        static void NotifyShellAfterChanges()
        {
            const int SHCNE_ASSOCCHANGED = 0x08000000;
            const int SHCNF_IDLIST = 0x0;

            NativeMethods.SHChangeNotify(SHCNE_ASSOCCHANGED, SHCNF_IDLIST, IntPtr.Zero, IntPtr.Zero);
        }
        /// <summary>
        /// indikuje, zda typ souboru je registrován
        /// </summary>
        /// <param name="extension">koncovka souboru</param>
        /// <returns>TRUE - soubor je registrovaný</returns>
        public static bool IsRegisteredFileType(string extension)
        {
            try
            {
                using (RegistryKey key = Registry.ClassesRoot.OpenSubKey("." + extension))
                    if (key != null)
                        return true;
            }
            catch (System.Security.SecurityException)
            {
                // přístup k registru může být odepřen
            }
            try
            {
                using (RegistryKey key = Registry.CurrentUser.OpenSubKey(explorerFileExts + "\\." + extension))
                    if (key != null)
                        return true;
            }
            catch (System.Security.SecurityException)
            {
                // přístup k registru může být odepřen
            }
            return false;
        }

        #region AppValue
        /// <summary>
        /// uložení/vytvoření hodnoty do registru do sekce CURRENT_USER
        /// </summary>
        /// <param name="key">klíč registru</param>
        /// <param name="nameOfValue">Název hodnoty registru</param>
        /// <param name="value">hodnota registru</param>
        public static void SetRegistryAppValue(string nameOfValue, string value, string key = @"Software\Gordic\GSAGFE")
        {
            RegistryKey currUserKey = Registry.CurrentUser.OpenSubKey(key, RegistryKeyPermissionCheck.ReadWriteSubTree, System.Security.AccessControl.RegistryRights.FullControl);
            if (currUserKey == null)
                currUserKey = Registry.CurrentUser.CreateSubKey(key, RegistryKeyPermissionCheck.ReadWriteSubTree, RegistryOptions.Volatile);

            if (string.IsNullOrEmpty(value))
                currUserKey.DeleteValue(nameOfValue, false);
            else
                currUserKey.SetValue(nameOfValue, value, RegistryValueKind.String);

            currUserKey.Flush();
            currUserKey.Close();
        }
        /// <summary>
        /// Cesta k registru dle klíče
        /// </summary>
        /// <param name="key">Klíč k registru</param>
        /// <param name="valueName">Název hledané hodnoty</param>
        /// <returns></returns>
        public static string GetAppValueFromRegistry(string valueName, string key = @"Software\Gordic\GSAGFE")
        {
            using (RegistryKey currUserKey = Registry.CurrentUser.OpenSubKey(key))
                if (currUserKey != null)
                {
                    object o = currUserKey.GetValue(valueName);
                    if (o != null)
                    {
                        string r = o.ToString();
                        if (!string.IsNullOrEmpty(r))
                            return r;
                    }
                }
            return null;
        }
        #endregion
    }
}
