//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AddInReference.cs                        </Name>
//    <Description> Představuje verzovaný odkaz na AddIn.                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-10                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using Gordic.General;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Představuje verzovaný odkaz na AddIn. 
    /// Používá se <see cref="AddInManifest"/>.
    /// </summary>
    public class AddInReference : ICloneable
    {
        string name;
        Version minimumVersion;
        Version maximumVersion;
        bool requirePreload;

        /// <summary>
        /// Minimání verze
        /// </summary>
        public Version MinimumVersion { get { return minimumVersion; } }

        /// <summary>
        /// Maximální verze
        /// </summary>
        public Version MaximumVersion { get { return maximumVersion; } }

        /// <summary>
        /// Nutné přednačtení
        /// </summary>
        public bool RequirePreload { get { return requirePreload; } }

        /// <summary>
        /// Název
        /// </summary>
        public string Name
        {
            get { return name; }
            set
            {
                if (string.IsNullOrEmpty(value))
                    throw new ArgumentException(GResources.GetResourceText(29450140), "name"); //RC 29450140 : Název nemůže být prázdný řádek!
                name = value;
            }
        }

        /// <returns>Vrácí TRUE když odkaz je platný.</returns>
        public bool Check(Dictionary<string, Version> addIns, out Version versionFound)
        {
            return addIns.TryGetValue(name, out versionFound) ? CompareVersion(versionFound, minimumVersion) >= 0 && CompareVersion(versionFound, maximumVersion) <= 0 : false;
        }

        /// <summary>
        /// Porovná dvě verze a ignoruje nespecifikované pole (na rozdíl od Version.CompareTo)
        /// </summary>
        /// <returns>-1 pokud a &lt; b, 0 pokud a == b, 1 pokud a &gt; b</returns>
        int CompareVersion(Version a, Version b)
        {
            if (a.Major != b.Major)
                return a.Major > b.Major ? 1 : -1;
            if (a.Minor != b.Minor)
                return a.Minor > b.Minor ? 1 : -1;
            if (a.Build < 0 || b.Build < 0)
                return 0;
            if (a.Build != b.Build)
                return a.Build > b.Build ? 1 : -1;
            if (a.Revision < 0 || b.Revision < 0)
                return 0;
            if (a.Revision != b.Revision)
                return a.Revision > b.Revision ? 1 : -1;
            return 0;
        }

        /// <summary>
        /// Vytvoření reference
        /// </summary>
        /// <param name="properties">Vlastnosti, dle kterých se objekt vytváří</param>
        /// <param name="hintPath">cesta k referenci</param>
        /// <returns>Nová reference</returns>
        public static AddInReference Create(Property properties, string hintPath)
        {
            AddInReference reference = new AddInReference(properties["addin"]);
            string version = properties["version"];
            if (version != null && version.Length > 0)
            {
                int pos = version.IndexOf('-');
                if (pos > 0)
                {
                    reference.minimumVersion = ParseVersion(version.Substring(0, pos), hintPath);
                    reference.maximumVersion = ParseVersion(version.Substring(pos + 1), hintPath);
                }
                else
                    reference.maximumVersion = reference.minimumVersion = ParseVersion(version, hintPath);
            }
            reference.requirePreload = string.Equals(properties["requirePreload"], "true", StringComparison.OrdinalIgnoreCase);
            return reference;
        }

        static Version entryVersion;

        /// <summary>
        /// Parsování verze
        /// </summary>
        /// <param name="version">verze</param>
        /// <param name="hintPath">cesta</param>
        /// <returns></returns>
        internal static Version ParseVersion(string version, string hintPath)
        {
            if (version == null || version.Length == 0)
                return new Version(0, 0, 0, 0);
            if (version.StartsWith("@"))
            {
                if (version == "@ReportDesignerCoreVersion"
                    || version == "@FormFillerCoreVersion"
                    || version == "@ParsersCoreVersion")
                {
                    if (entryVersion == null)
                        entryVersion = new Version();
                    return entryVersion;
                }
                if (!string.IsNullOrEmpty(hintPath))
                {
                    string fileName = Path.Combine(hintPath, version.Substring(1));
                    try
                    {
                        FileVersionInfo info = FileVersionInfo.GetVersionInfo(fileName);
                        return new Version(info.FileMajorPart, info.FileMinorPart, info.FileBuildPart, info.FilePrivatePart);
                    }
                    catch (FileNotFoundException ex)
                    {
                        throw new Exception(string.Format(string.Join(" ", GResources.GetResourceText(29450141), "'{0}': {1}."), version, ex.Message)); //RC 29450141 : Nelze získát verzi
                    }
                }
                return new Version(0, 0, 0, 0);
            }
            else
                return new Version(version);
        }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="name">Název</param>
        public AddInReference(string name) : this(name, new Version(0, 0, 0, 0), new Version(int.MaxValue, int.MaxValue)) { }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="name">Název</param>
        /// <param name="specificVersion">Specifická verze</param>
        public AddInReference(string name, Version specificVersion) : this(name, specificVersion, specificVersion) { }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="name">Název</param>
        /// <param name="minimumVersion">minimální verze</param>
        /// <param name="maximumVersion">Maximální verze</param>
        public AddInReference(string name, Version minimumVersion, Version maximumVersion)
        {
            this.Name = name;
            this.minimumVersion = minimumVersion ?? throw new ArgumentNullException("minimumVersion");
            this.maximumVersion = maximumVersion ?? throw new ArgumentNullException("maximumVersion");
        }

        /// <summary>
        /// Porovnání s objektem
        /// </summary>
        /// <param name="obj">Porovnávaný objekt</param>
        /// <returns></returns>
        public override bool Equals(object obj)
        {
            if (!(obj is AddInReference)) return false;
            AddInReference b = (AddInReference)obj;
            return name == b.name && minimumVersion == b.minimumVersion && maximumVersion == b.maximumVersion;
        }

        /// <summary>
        /// Kvůli ToString()
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode()
        {
            return name.GetHashCode() ^ minimumVersion.GetHashCode() ^ maximumVersion.GetHashCode();
        }

        /// <summary>
        /// řetězcový tvar objektu
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            if (minimumVersion.ToString() == "0.0.0.0")
            {
                if (maximumVersion.Major == int.MaxValue)
                    return name;
                else
                    return name + ", " + GResources.GetResourceText(29450574) + " <" + maximumVersion.ToString();
            }
            else
            {
                if (maximumVersion.Major == int.MaxValue)
                    return name + ", " + GResources.GetResourceText(29450574) + " >" + minimumVersion.ToString();
                else if (minimumVersion == maximumVersion)
                    return name + ", " + GResources.GetResourceText(29450574) + " " + minimumVersion.ToString();
                else
                    return name + ", " + GResources.GetResourceText(29450574) + " " + minimumVersion.ToString() + "-" + maximumVersion.ToString();
            }
        }

        /// <summary>
        /// Kopie objektu
        /// </summary>
        /// <returns></returns>
        public AddInReference Clone()
        {
            return new AddInReference(name, minimumVersion, maximumVersion);
        }

        object ICloneable.Clone() { return Clone(); }
    }
}
