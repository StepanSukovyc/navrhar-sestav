//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.RevisionClass.cs                       </Name>
//    <Description> Informace o verzích aplikace                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-03                                                  </Created>
//  </FileHeader>

using System.Reflection;
using Gordic.GFE.Parsers.Utils;

namespace Gordic.GFE.WinClient
{
    /// <summary>
    /// Informace o verzích aplikace
    /// </summary>
    static class RevisionClass
    {
        static Assembly asm;
        /// <summary>
        /// sestavení
        /// </summary>
        public static Assembly Assembly { get { return asm; } set { asm = value; } }
        /// <summary>
        /// Majoritní verze
        /// </summary>
        public const string Major = "4";
        /// <summary>
        /// Minoritní
        /// </summary>
        public const string Minor = "76";
        /// <summary>
        /// Sestavení
        /// </summary>
        public const string Build = "3";
        /// <summary>
        /// Revize
        /// </summary>
        public const string Revision = "1";
        /// <summary>
        /// Hlavní verze
        /// </summary>
        public const string MainVersion = Major + "." + Minor + "." + Build + "." + Revision;
        static string fullVersion;
        /// <summary>
        /// Plná verze
        /// </summary>
        public static string FullVersion
        {
            get
            {
                if (string.IsNullOrEmpty(fullVersion))
                {
                    if (asm != null)
                        fullVersion = asm.FullName.Split(',').FirstOrNull(str => str.Trim().StartsWith("Version"));
                    if (fullVersion != null)
                        fullVersion = fullVersion.Substring(fullVersion.IndexOf('=') + 1);
                }
                return fullVersion;
            }
        }

        static string appName;
        /// <summary>
        /// Název aplikace
        /// </summary>
        public static string ApplicationName
        {
            get
            {
                if (string.IsNullOrEmpty(appName))
                    appName = asm != null ? asm.GetName().Name : "Gordic.Gfe.WinClient";

                return appName;
            }
        }
    }
}
