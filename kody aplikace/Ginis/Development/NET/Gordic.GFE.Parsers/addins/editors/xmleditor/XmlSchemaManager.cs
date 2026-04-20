//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlSchemaManager.cs                    </Name>
//    <Description> Udržuje informace o všech schématech o kterých editor XML ví</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-25                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Runtime.InteropServices;
using Gordic.GFE.Parsers.AlfEditor;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.XmlEditor
{
    /// <summary>
    /// Udržuje informace o všech schématech o kterých editor XML ví
    /// </summary>
    public class XmlSchemaManager
    {
        /// <summary>
        /// jmenný prostor XML schématu
        /// </summary>
        public const string XmlSchemaNamespace = "http://www.w3.org/2001/XMLSchema";

        static XmlSchemaCompletionDataCollection schemas = null;
        static XmlSchemaManager manager = null;

        /// <summary>
        /// Vyvolá se po přidání uživatelského schématu
        /// </summary>
        public static event EventHandler UserSchemaAdded;
        /// <summary>
        /// Vyvolá se po odstranění uživatelského schématu
        /// </summary>
        public static event EventHandler UserSchemaRemoved;

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        XmlSchemaManager()
        {
        }

        /// <summary>
        /// Určuje, zda jmenný prostor je W3C jmenným prostorem pro XSD soubory
        /// </summary>
        /// <param name="schemaNamespace">Kontrolovaný jmennýj prostor</param>
        public static bool IsXmlSchemaNamespace(string schemaNamespace)
        {
            return schemaNamespace == XmlSchemaNamespace;
        }

        /// <summary>
        /// Získání známých schémat.
        /// </summary>
        public static XmlSchemaCompletionDataCollection SchemaCompletionDataItems
        {
            get
            {
                if (schemas == null)
                {
                    schemas = new XmlSchemaCompletionDataCollection();
                    manager = new XmlSchemaManager();
                    manager.ReadSchemas();
                }

                return schemas;
            }
        }

        /// <summary>
        /// Získání schématu dokončování dat asociovaného s určitou připonou souboru
        /// </summary>
        /// <param name="extension">Přípona souboru</param>
        public static XmlSchemaCompletionData GetSchemaCompletionData(string extension)
        {
            XmlSchemaCompletionData data = null;

            XmlSchemaAssociation association = AlfEditorAddInOptions.GetSchemaAssociation(extension);
            if (association != null && association.NamespaceUri.Length > 0)
                    data = SchemaCompletionDataItems[association.NamespaceUri];
            
            return data;
        }

        /// <summary>
        /// Získání prefixu jmenného prostoru asociovaného s určitou příponou souboru
        /// </summary>
        /// <param name="extension">Přípona souboru</param>
        public static string GetNamespacePrefix(string extension)
        {
            string prefix = String.Empty;

            XmlSchemaAssociation association = AlfEditorAddInOptions.GetSchemaAssociation(extension);
            if (association != null)
                prefix = association.NamespacePrefix;

            return prefix;
        }

        /// <summary>
        /// Odstranění schématu se specifickým jmenným prostorem ze složky
        /// uživatelských schémat a odstranění dat k dokončování
        /// </summary>
        /// <param name="namespaceUri">URI specifikovan0ho jmenn0ho prostoru</param>
        public static void RemoveUserSchema(string namespaceUri)
        {
            XmlSchemaCompletionData schemaData = SchemaCompletionDataItems[namespaceUri];
            if (schemaData != null)
            {
                if (File.Exists(schemaData.FileName))
                    File.Delete(schemaData.FileName);
                SchemaCompletionDataItems.Remove(schemaData);
                OnUserSchemaRemoved();
            }
        }

        /// <summary>
        /// Přidání schématu do složky uživatelských schémat a 
        /// zpřístupnění schématu textovému editoru
        /// </summary>
        /// <param name="schemaData">Přidávané schéma</param>
        public static void AddUserSchema(XmlSchemaCompletionData schemaData)
        {
            if (SchemaCompletionDataItems[schemaData.NamespaceUri] == null)
            {

                if (!Directory.Exists(UserSchemaFolder))
                    Directory.CreateDirectory(UserSchemaFolder);

                string fileName = Path.GetFileName(schemaData.FileName);
                string destinationFileName = Path.Combine(UserSchemaFolder, fileName);
                File.Copy(schemaData.FileName, destinationFileName);
                schemaData.FileName = destinationFileName;
                SchemaCompletionDataItems.Add(schemaData);
                OnUserSchemaAdded();
            }
        }

        void ReadSchemas()
        {
            ReadSchemas(RuntimeEnvironment.GetRuntimeDirectory(), true);
            ReadSchemas(SchemaFolder, true);
            ReadSchemas(UserSchemaFolder, false);
        }

        void ReadSchemas(string folder, bool readOnly)
        {
            if (Directory.Exists(folder))
                foreach (string fileName in Directory.GetFiles(folder, "*.xsd"))
                    ReadSchema(fileName, readOnly);
        }

        void ReadSchema(string fileName, bool readOnly)
        {
            try
            {
                string baseUri = XmlSchemaCompletionData.GetUri(fileName);
                XmlSchemaCompletionData data = new XmlSchemaCompletionData(baseUri, fileName);
                if (data.NamespaceUri != null)
                {
                    if (schemas[data.NamespaceUri] == null)
                    {
                        data.ReadOnly = readOnly;
                        schemas.Add(data);
                    }
                }
            }
            catch (Exception) { }
        }

        static string SchemaFolder
        {
            get
            {
                return Path.Combine(PropertyService.DataDirectory, "schemas");
            }
        }

        static string UserSchemaFolder
        {
            get
            {
                return Path.Combine(PropertyService.ConfigDirectory, "schemas");
            }
        }

        static void OnUserSchemaAdded()
        {
            UserSchemaAdded?.Invoke(manager, new EventArgs());
        }

        static void OnUserSchemaRemoved()
        {
            UserSchemaRemoved?.Invoke(manager, new EventArgs());
        }
    }
}
