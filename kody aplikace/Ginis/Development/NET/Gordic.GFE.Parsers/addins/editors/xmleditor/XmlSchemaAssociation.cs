//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlSchemaAssociation.cs                </Name>
//    <Description> Představuje vztah mezi XML schématem a příponu souboru.     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-24                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.Parsers.XmlEditor
{
    /// <summary>
    /// Představuje vztah mezi XML schématem a příponu souboru.
    /// </summary>
    public class XmlSchemaAssociation
    {
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public XmlSchemaAssociation()
        {
            NamespaceUri = String.Empty;
            Extension = String.Empty;
            NamespacePrefix = String.Empty;
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="extension">Přípona souboru</param>
        public XmlSchemaAssociation(string extension)
            : this(extension, String.Empty, String.Empty)
        {
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="extension">Přípona souboru</param>
        /// <param name="namespaceUri">URI jmenného prostoru</param>
        public XmlSchemaAssociation(string extension, string namespaceUri)
            : this(extension, namespaceUri, String.Empty)
        {
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="extension">Přípona souboru</param>
        /// <param name="namespaceUri">URI jmenného prostoru</param>
        /// <param name="namespacePrefix">Prefix jmenného prostoru</param>
        public XmlSchemaAssociation(string extension, string namespaceUri, string namespacePrefix)
        {
            Extension = extension;
            NamespaceUri = namespaceUri;
            NamespacePrefix = namespacePrefix;
        }

        /// <summary>
        /// URI jmenného prostoru
        /// </summary>
        public string NamespaceUri { get; set; }

        /// <summary>
        /// Přípona souboru (např. '.xml').
        /// </summary>
        public string Extension { get; set; }

        /// <summary>
        /// Výchozí prefix jmenného prostoru, který se přidává do XML elemntů
        /// </summary>
        public string NamespacePrefix { get; set; }

        /// <summary>
        /// Získání výchozí asociace schématu pro příponu souboru
        /// </summary>
        /// <param name="extension">Přípona souboru</param>
        /// <remarks>
        /// Tyto výchozí hodnoty jsou pevně zakódovány.
        /// </remarks>
        public static XmlSchemaAssociation GetDefaultAssociation(string extension)
        {
            XmlSchemaAssociation association = null;

            switch (extension.ToLowerInvariant())
            {
                case ".wxs":
                    association = new XmlSchemaAssociation(extension, @"http://schemas.microsoft.com/wix/2003/01/wi");
                    break;
                case ".config":
                    association = new XmlSchemaAssociation(extension, @"urn:app-config");
                    break;
                case ".build":
                    association = new XmlSchemaAssociation(extension, @"http://nant.sf.net/release/0.85/nant.xsd");
                    break;
                case ".xsl":
                case ".xslt":
                    association = new XmlSchemaAssociation(extension, @"http://www.w3.org/1999/XSL/Transform", "xsl");
                    break;
                case ".xsd":
                    association = new XmlSchemaAssociation(extension, @"http://www.w3.org/2001/XMLSchema", "xs");
                    break;
                case ".manifest":
                    association = new XmlSchemaAssociation(extension, @"urn:schemas-microsoft-com:asm.v1");
                    break;
                case ".xaml":
                    association = new XmlSchemaAssociation(extension, @"http://schemas.microsoft.com/winfx/avalon/2005");
                    break;
                case ".alf":
                    association = new XmlSchemaAssociation(extension, @"http://www.gordic.cz/TR/alf/1.4/");
                    break;
                default:
                    association = new XmlSchemaAssociation(extension);
                    break;
            }
            return association;
        }

        /// <summary>
        /// Porovnání asociací schématu
        /// </summary>
        /// <param name="obj">Porovnávaný objekt</param>
        public override bool Equals(object obj)
        {
            bool equals = false;

            if (obj is XmlSchemaAssociation rhs)
                if ((NamespacePrefix == rhs.NamespacePrefix) &&
                    (Extension == rhs.Extension) &&
                    (NamespaceUri == rhs.NamespaceUri))
                    equals = true;

            return equals;
        }

        /// <exclude/>
        public override int GetHashCode()
        {
            return (NamespaceUri != null ? NamespaceUri.GetHashCode() : 0) ^ (Extension != null ? Extension.GetHashCode() : 0) ^ (NamespacePrefix != null ? NamespacePrefix.GetHashCode() : 0);
        }

        /// <summary>
        /// Vytvoření XmlSchemaAssociation z uloženého XML textu.
        /// </summary>
        /// <param name="text">XML text</param>
        public static XmlSchemaAssociation ConvertFromString(string text)
        {
            string[] parts = text.Split(new char[] { '|' }, 3);
            return new XmlSchemaAssociation(parts[0], parts[1], parts[2]);
        }

        /// <summary>
        /// Převod na řetězec
        /// </summary>
        /// <returns></returns>
        public string ConvertToString()
        {
            return Extension + "|" + NamespaceUri + "|" + NamespacePrefix;
        }
    }
}
