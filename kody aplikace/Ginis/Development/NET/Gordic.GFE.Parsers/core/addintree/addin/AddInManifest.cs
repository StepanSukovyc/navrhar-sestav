//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AddInManifest.cs                         </Name>
//    <Description> Zde jsou uložené informace o manifestu AddIn                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-10                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Xml;
using Gordic.General;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Zde jsou uložené informace o manifestu AddIn
    /// </summary>
    public class AddInManifest
    {        
        string primaryIdentity;
        /// <summary>
        /// Primární identita
        /// </summary>
        public string PrimaryIdentity { get { return primaryIdentity; } }

        Version primaryVersion;
        /// <summary>
        /// Primárn verze
        /// </summary>
        public Version PrimaryVersion { get { return primaryVersion; } }
        Dictionary<string, Version> identities = new Dictionary<string, Version>();
        /// <summary>
        /// Slovník identit
        /// </summary>
        public Dictionary<string, Version> Identities { get { return identities; } }

        List<AddInReference> dependencies = new List<AddInReference>();
        /// <summary>
        /// Závislostí
        /// </summary>
        public List<AddInReference> Dependencies { get { return dependencies; } }

        void AddIdentity(string name, string version, string hintPath)
        {
            LoggingService.Info(string.Join(" ", GResources.GetResourceText(29450134), name)); //RC 29450134 : Načtení identity
            if (name.Length == 0)
                throw new Exception(GResources.GetResourceText(29450135)); //RC 29450135 : Identita potřebuje název!
            foreach (char c in name)
                if (!char.IsLetterOrDigit(c) && c != '.' && c != '_')
                    throw new Exception(string.Format(string.Join(" ", GResources.GetResourceText(29450136), "'{0}'."), c)); //RC 29450136 : Název identity obashuje naplatná znak:

            Version v = AddInReference.ParseVersion(version, hintPath);
            if (primaryVersion == null)
                primaryVersion = v;
            if (primaryIdentity == null)
                primaryIdentity = name;
            identities.Add(name, v);
        }

        /// <summary>
        /// Načtení sekce Manifest
        /// </summary>
        /// <param name="reader">čtečka</param>
        /// <param name="hintPath">cesta</param>
        public void ReadManifestSection(XmlReader reader, string hintPath)
        {
            if (reader.AttributeCount != 0)
                throw new Exception(GResources.GetResourceText(29450137)); //RC 29450137 : Větev Manifest nemůže mít atributy!
            if (reader.IsEmptyElement)
                throw new Exception(GResources.GetResourceText(29450138)); //RC 29450138 : Větev Manifest nesmí být prázdná!

            while (reader.Read())
                switch (reader.NodeType)
                {
                    case XmlNodeType.EndElement:
                        if (string.Equals(reader.LocalName, "Manifest", StringComparison.OrdinalIgnoreCase))
                            return;
                        break;
                    case XmlNodeType.Element:
                        string nodeName = reader.LocalName;
                        Property properties = Property.ReadFromAttributes(reader);
                        switch (nodeName)
                        {
                            case "Identity":
                                AddIdentity(properties["name"], properties["version"], hintPath);
                                break;
                            case "Dependency":
                                dependencies.Add(AddInReference.Create(properties, hintPath));
                                break;
                            default:
                                throw new Exception(string.Format(string.Join(" ", GResources.GetResourceText(29450139), "{0}."), nodeName)); //RC 29450139 : Neznáma větev v sekci Manifest:
                        }
                        break;
                }
        }
    }
}
