//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.OfficeService.cs                         </Name>
//    <Description> Zjištění názvu položky                                      </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2020-05-29                                                  </Created>
//  </FileHeader>


using Gordic.General;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Text;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Služba pro různorodé funkcionality kolem MS Office
    /// </summary>
    public class OfficeService
    {
        /// <summary>
        /// Offset Chybových polí
        /// </summary>
        public static int ErrorStartOffset = -1;
        public static int ErrorEndOffset = -1;
        /// <summary>
        /// Zjištění názvu položky
        /// </summary>
        /// <param name="p_text">Text obsahující název datové položky</param>
        /// <returns></returns>
        public static string GetName(string p_text)
        {
            string lText = p_text;
            if (lText.IndexOf("[#") != -1)
                lText = lText.Substring(0, lText.IndexOf("[#"));

            if (string.IsNullOrEmpty(lText))
                return null;

            string result = lText.Substring(lText.LastIndexOf(":") + 1).Trim();

            return result.IndexOf("[#") != -1
                 ? result.Substring(0, result.IndexOf("[")).Trim()
                 : result.Trim();
        }
        /// <summary>
        /// Zjiíštění existence guid v textu
        /// </summary>
        /// <param name="text">StatusText políčka, nebo text, který by měl prezentovat políčko</param>
        /// <returns>GUID políčka</returns>
        public static Guid GetGuid(string text)
        {
            string lText = text.Trim();
            if (IsGroupByComment(lText))
            {
                string groupId = GetGroupGuid(text);
                lText = lText.Replace(string.Format("[#{0}#]", groupId), string.Empty);
            }

            try
            {
                return ((lText.IndexOf("[#") != -1)
                    && (lText.IndexOf("#]") != -1)
                    && (lText.IndexOf("[#") < lText.IndexOf("#]")))
                    ? new Guid(lText.Substring(lText.IndexOf("[#") + 2, lText.IndexOf("#]") - lText.IndexOf("[#") - 2))
                    : Guid.Empty;
            }
            catch
            {
                return Guid.Empty;
            }
        }

        /// <summary>
        /// Zjiíštění existence guid v textu
        /// </summary>
        /// <param name="text">StatusText políčka, nebo text, který by měl prezentovat políčko</param>
        /// <param name="newguid">true - guid neexistoval, u této příležitosti byl vygenerován; false - guid existoval</param>
        /// <param name="b_guid">text před GUID</param>
        /// <returns>GUID políčka</returns>
        public static Guid GetGuid(string text, ref bool newguid, ref string b_guid)
        {
            try
            {
                b_guid = text;

                if ((text.IndexOf("[#") != -1)
                    && (text.IndexOf("#]") != -1)
                    && (text.IndexOf("[#") < text.IndexOf("#]")))
                {
                    b_guid = text.Substring(0, text.IndexOf("[#"));
                    newguid = false;
                    return new Guid(text.Substring(text.IndexOf("[#") + 2, text.IndexOf("#]") - text.IndexOf("[#") - 2));
                }
            }
            catch { }

            newguid = true;
            return Guid.NewGuid();
        }

        /// <summary>
        /// Zíslání specifické hodnoty z komentáře OXS sestav
        /// </summary>
        /// <param name="text">TExt komentáře</param>
        /// <param name="paramName">Parametr hodnoty</param>
        /// <returns>Hodnota parametru</returns>
        public static string GetParametrFromComment(string text, string paramName)
        {
            try
            {
                string prefix = "[#" + paramName;
                int startIndex = text.IndexOf(prefix);

                if (startIndex != -1)
                {
                    startIndex += prefix.Length;
                    int endIndex = text.IndexOf("#]", startIndex);

                    if (endIndex != -1)
                        return text.Substring(startIndex, endIndex - startIndex);
                }
            }
            catch { }
            return string.Empty;
        }

        /// <summary>
        /// Nahrazení GUID v textu Office objektu
        /// </summary>
        /// <param name="text"></param>
        /// <param name="n_guid"></param>
        /// <returns></returns>
        public static string ReplaceGUID(string text, Guid n_guid)
        {
            Guid o_guid = GetGuid(text);
            // jedná se o region bez GUID?
            return (o_guid == Guid.Empty)
                ? string.Format("{0}[#{1}#]", text, Convert.ToString(Guid.NewGuid()))
                : text.Replace(Convert.ToString(o_guid), Convert.ToString(n_guid));
        }

        /// <summary>
        /// Získání identifikátoru v textu Office objektu
        /// </summary>
        /// <param name="text"></param>
        /// <returns></returns>
        public static string GetId(string text)
        {
            try
            {
                return ((text.IndexOf("[$") != -1)
                    && (text.IndexOf("$]") != -1)
                    && (text.IndexOf("[$") < text.IndexOf("$]")))
                    ? text.Substring(text.IndexOf("[$") + 2, text.IndexOf("$]") - text.IndexOf("[$") - 2)
                    : string.Empty;
            }
            catch
            {
                return string.Empty;
            }
        }

        /// <summary>
        /// Získání aktualizované textové podoby komentáře
        /// </summary>
        /// <param name="originalData">Původní text komentáře</param>
        /// <param name="data">Data sekce komentáře</param>
        /// <returns>Nový komentář</returns>
        public static string GetUpdatedCommentData(string originalData, string data)
        {
            if (originalData.IsNullOrEmpty())
                return string.Format("[#data:{0}#]", data);
            if (originalData.IndexOf("[#data:") == -1)
                return originalData + string.Format("[#data:{0}#]", data);
            string textBefore = originalData.Substring(0, originalData.IndexOf("[#data:") + "[#data:".Length);

            foreach (var marker in CommonService.MSE_MARKERS)
                if (textBefore.Contains(marker))
                {
                    textBefore = textBefore.Substring(textBefore.IndexOf(marker));
                    break;
                }

            string textAfter = originalData.Substring(originalData.IndexOf("[#data:") + "[#data:".Length);
            textAfter = textAfter.Substring(textAfter.IndexOf("#]"));
            return textBefore + data + textAfter;
        }

        /// <summary>
        /// Zjištění na základě textu komentáře, zda se jedná o skupinu či nikoliv
        /// </summary>
        /// <param name="text">Text komentáče</param>
        /// <returns>TRUE - jedná se o buňku skupiny jinak FALSE</returns>
        public static bool IsGroupByComment(string text) => !string.IsNullOrEmpty(GetGroupGuid(text));

        /// <summary>
        /// Zjištění na základě textu komentáře, zda se jedná o region či nikoliv
        /// </summary>
        /// <param name="text">Text komentáře</param>
        /// <returns>TRUE - jedná se o buňku regionu jinak FALSE</returns>
        public static bool IsRegionByComment(string text) => !IsGroupByComment(text)
            && (text.Contains(CommonService.MSE_BEGIN_SECTION_BODY) || text.Contains(CommonService.MSE_BEGIN_SECTION_HEADER) || text.Contains(CommonService.MSE_BEGIN_SECTION_FOOTER) || text.Contains(CommonService.MSE_END_SECTION));

        /// <summary>
        /// Zjištění na základě textu komentáře, zda se jedná o konec sekce
        /// </summary>
        /// <param name="text">Text komentáře</param>
        /// <returns>TRUE - jedná se o buňku konce sekce jinak FALSE</returns>
        public static bool IsEndSectionByComment(string text) => text.Contains(CommonService.MSE_END_SECTION);

        /// <summary>
        /// Získání identifikátoru skupiny
        /// </summary>
        /// <param name="text">Text komentáře obsahující identifikátor</param>
        /// <returns></returns>
        public static string GetGroupGuid(string text)
        {
            string prefix = text.IndexOf("[#g") != -1 ? text.Substring(text.IndexOf("[#g")) : string.Empty;
            prefix = prefix.IndexOf("#]") != -1 ? prefix.Substring(0, prefix.IndexOf("#]") + 2) : string.Empty;
            prefix = prefix.Replace("[#", string.Empty).Replace("#]", string.Empty).Trim();
            return prefix.Length < 32 ? prefix : string.Empty;
        }

        /// <summary>
        /// Získání GUID z textu komentáře MSE sestavy
        /// </summary>
        /// <param name="text">Text komentáře</param>
        /// <returns>GUID v texové podobě nebo prázdná hodnota</returns>
        public static string GetAtomGuid(string text)
        {
            string lText = text;
            if (!string.IsNullOrEmpty(lText) && lText.Contains("#][#"))
            {
                lText = lText.Substring(0, lText.IndexOf("#][#"));
                lText = lText.Substring(lText.IndexOf("[#") + 2);
            }
            else lText = string.Empty;
            return lText;
        }


        public static bool IsItemByComment(string text) => text.IndexOf(CommonService.MSE_FIELD + ":") != -1;

        public static bool HasDataByComment(string text) => !string.IsNullOrEmpty(text) && text.IndexOf("[#data:") != -1;

        /// <summary>
        /// Získání nových dat CellRef textu Excell komentáře
        /// </summary>
        /// <param name="cellAddress">Adresa komentáře</param>
        /// <param name="text">Text komentáře</param>
        /// <returns>TRUE - proběhla aktualizace textu</returns>
        public static bool ReplaceCellRef(string cellAddress, ref string text)
        {
            string data = GetExcellCommentDataSection(text);
            if (!string.IsNullOrEmpty(data) && !data.Contains(string.Format("\"CellRef\":\"{0}\"", cellAddress)))
            {
                // získáme JSON objekt z hodnoty
                JObject jsonObject = JObject.Parse(data);
                if (!jsonObject.TryGetValue("CellRef", out JToken value) || !cellAddress.Equals(value.ToString()))
                {
                    jsonObject.Remove("CellRef");
                    jsonObject.Add("CellRef", cellAddress);
                    text = jsonObject.ToString(Formatting.None, null);
                    return true;
                }
            }
            return false;
        }

        /// <summary>
        /// Získání sekce data v textu komentáře
        /// </summary>
        /// <param name="text">Text komentáře</param>
        /// <returns>Obsah sekce data komentáře</returns>
        static string GetExcellCommentDataSection(string text)
        {
            if (string.IsNullOrEmpty(text) || !text.Contains("[#data:"))
                return string.Empty;

            string textAfter = text.Substring(text.IndexOf("[#data:") + "[#data:".Length).Trim();
            textAfter = textAfter.Substring(0, textAfter.IndexOf("#]")).Trim();
            return textAfter;
        }

        /// <summary>
        /// Třída zpracování informaci o Offisech 
        /// </summary>
        public class Office
        {

            [DllImport("kernel32.dll", CharSet = CharSet.Auto)]

            static extern uint RegOpenKeyEx(UIntPtr hKey, string lpSubKey, uint ulOptions, int samDesired, out int phkResult);
            [DllImport("Advapi32.dll")]
            static extern uint RegCloseKey(int hKey);
            [DllImport("advapi32.dll", EntryPoint = "RegQueryValueEx")]
            static extern int RegQueryValueEx(int hKey, string lpValueName, int lpReserved, ref uint lpType,
                System.Text.StringBuilder lpData, ref uint lpcbData);
            static readonly UIntPtr HKEY_LOCAL_MACHINE = new UIntPtr(0x80000002u);
            static readonly UIntPtr HKEY_CURRENT_USER = new UIntPtr(0x80000001u);

            readonly Dictionary<string, string> LatestVersions = new Dictionary<string, string>();

            /// <summary>
            /// Konstruktor třídy
            /// </summary>
            public Office()
            {
                LatestVersions.Add("12.0", "Office2007");
                LatestVersions.Add("14.0", "Office2010");
                LatestVersions.Add("15.0", "Office2013");
                LatestVersions.Add("16.0", "Office2017 and higher ");
            }

            string GetVersionNumberFromRegistry()
            {
                string regVersion;

                regVersion = GetVersionNumberFromRegistry("SOFTWARE\\Microsoft\\Office\\");
                if (regVersion == null)
                    regVersion = GetVersionNumberFromRegistry("SOFTWARE\\Wow6432Node\\Microsoft\\Office\\");

                return regVersion;
            }
            string GetVersionNumberFromRegistry(string key)
            {
                string version = null;
                foreach (string VerNo in LatestVersions.Keys)
                    if (Reg64(HKEY_LOCAL_MACHINE, key + VerNo + "\\Excel\\InstallRoot", "Path") != null)
                    {
                        version = VerNo;
                        break;
                    }
                return version;
            }

            /// <summary>
            /// Získání verze Office
            /// </summary>
            /// <returns></returns>
            public string GetVersion()
            {
                string versionFromReg = GetVersionNumberFromRegistry();
                string versionInstalled = LatestVersions[versionFromReg];

                bool? Office64BitFromReg = Off64Bit("SOFTWARE\\Microsoft\\Office\\", versionFromReg) ?? Off64Bit("SOFTWARE\\Wow6432Node\\Microsoft\\Office\\", versionFromReg);

                if (Office64BitFromReg.HasValue && Office64BitFromReg.Value)
                    versionInstalled += " (64 bit)";
                else if (Office64BitFromReg.HasValue && !Office64BitFromReg.Value)
                    versionInstalled += " (32 bit)";
                else
                    versionInstalled += " (Unknown bit)";

                return versionInstalled;
            }

            /// <summary>
            /// Zjištění, zda v systému instalován Office 64 bit
            /// </summary>
            /// <returns></returns>
            public bool? Is64()
            {
                string versionFromReg = GetVersionNumberFromRegistry();
                bool? Office64BitFromReg = Off64Bit("SOFTWARE\\Microsoft\\Office\\", versionFromReg) ?? Off64Bit("SOFTWARE\\Wow6432Node\\Microsoft\\Office\\", versionFromReg);
                return Office64BitFromReg.HasValue && Office64BitFromReg.Value;
            }

            bool? Off64Bit(string key, string version)
            {
                bool? Office64BitFromReg = null;
                string Bitness = Reg64(HKEY_LOCAL_MACHINE, key + version + "\\Outlook", "Bitness");
                if (Bitness == "x86")
                    Office64BitFromReg = false;
                else if (Bitness == "x64")
                    Office64BitFromReg = true;
                return Office64BitFromReg;
            }

            string Reg64(UIntPtr parent, string key, string prop)
            {
                int ikey = 0;
                int bit36_64 = 0x0100;
                int query = 0x0001;
                try
                {
                    uint res = RegOpenKeyEx(parent, key, 0, query | bit36_64, out ikey);
                    if (0 != res)
                        return null;
                    uint type = 0;
                    uint data = 1024;
                    StringBuilder buffer = new StringBuilder(1024);
                    RegQueryValueEx(ikey, prop, 0, ref type, buffer, ref data);
                    return buffer.ToString();
                }
                finally
                {
                    if (0 != ikey)
                        RegCloseKey(ikey);
                }
            }
        }
    }
}
