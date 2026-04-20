//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GXmlWorker.cs                                </Name>
//    <Description> Třída pro práci s XML                                       </Description>
//    <Author>      Martin Halík                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2012-06-22                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Xml;
using System.Xml.Serialization;
using System.Security.Cryptography;
using System.Xml.Schema;
using System.Reflection;
using System.Xml.XPath;
using System.Text.RegularExpressions;

namespace Gordic.General
{
    /// <summary>
    /// Třída pro práci s XML
    /// </summary>
    public class GXmlWorker
    {
        #region PRIVATE VARIABLES
        private static readonly IGLogger Log = GLogManager.CurrentClassLogger();
        /// <summary>
        /// Zda se jedná o chybu XSD
        /// </summary>
        private bool m_bIsXsdError = false;
        /// <summary>
        /// Případné odchycené chyby při validaci SIP balíčku
        /// </summary>
        private string m_sChybaValidace = "";
        /// <summary>
        /// Případné odchycené chyby při validaci SIP balíčku
        /// </summary>
        private List<ValidationEventArgs> m_oValidationArgs = new List<ValidationEventArgs>();

        #endregion PRIVATE VARIABLES

        #region vlastnosti

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(GXmlWorker).Assembly; }
        } // end property

        #endregion

        #region CONSTRUCTOR

        //------------------------------------------------------------------
        /// <summary>
        /// Konstruktor
        /// </summary>
        public GXmlWorker()
        {

        }// end method

        #endregion CONSTRUCTOR

        ////------------------------------------------------------------------
        ///// <summary>
        ///// Vytvoří namespace manager se schématy použitými v XML.
        ///// </summary>
        ///// <param name="doc">xml dokument</param>
        ///// <returns>XmlNamespaceManager</returns>
        //public static XmlNamespaceManager CreateNamespaceManager(XmlDocument doc)
        //{
        //    try
        //    {
        //        //28.8.2020 - MH - jeste funkcnejsi metoda :-)
        //        XmlNamespaceManager l_oNamespaceManager = new XmlNamespaceManager(doc.NameTable);
        //        XPathDocument x = new XPathDocument(new StringReader(doc.OuterXml));
        //        XPathNavigator foo = x.CreateNavigator();
        //        foo.MoveToFollowing(XPathNodeType.Element);
        //        IDictionary<string, string> l_Namespaces = foo.GetNamespacesInScope(XmlNamespaceScope.All);
        //        int i = 0;
        //        foreach(var kvp in l_Namespaces)
        //        {
        //            string prefix = kvp.Key;
        //            if (string.IsNullOrEmpty(kvp.Key) || kvp.Key.ToLower() == "xmlns")
        //            {
        //                prefix = "gprefix_" + i++;
        //            }
        //            l_oNamespaceManager.AddNamespace(prefix, kvp.Value);
        //        }


        //        ////16.11.2012 - Martin Halik - nova funkcnejsi metoda dohledani namespace

        //        //XmlNamespaceManager l_oNamespaceManager = new XmlNamespaceManager(doc.NameTable);

        //        //var l_oaNamespaces = (from XmlNode n in doc.SelectNodes("//*|@*")
        //        //                      where n.NamespaceURI != string.Empty
        //        //                      select new
        //        //                      {
        //        //                          Prefix = n.Prefix,
        //        //                          Namespace = n.NamespaceURI
        //        //                      }).Distinct();

        //        //int i = 0;

        //        //foreach (var nsmpc in l_oaNamespaces)
        //        //{
        //        //    string prefix = nsmpc.Prefix;

        //        //    if (string.IsNullOrEmpty(nsmpc.Prefix) || nsmpc.Prefix.ToLower() == "xmlns")
        //        //    {
        //        //        prefix = "gprefix_" + i++;
        //        //    }

        //        //    l_oNamespaceManager.AddNamespace(prefix, nsmpc.Namespace);
        //        //}


        //        //XmlNodeList l_oXmlNameSpaceList = doc.SelectNodes(@"//namespace::*[not(. = ../../namespace::*)]");

        //        //if (l_oXmlNameSpaceList == null)
        //        //{
        //        //    return l_oNamespaceManager;
        //        //}

        //        ////26.6.2012 - Martin Halík - pro prázdný prefix u namespace se vytvoří nový (namespace bez prefixu se vždy chápe jako výchozí a pokud jsou dva, zaznamená se pouze jeden)
        //        //int i = 0;

        //        //foreach (XmlNode node in l_oXmlNameSpaceList)
        //        //{
        //        //    string prefix = node.LocalName;

        //        //    if (node.LocalName.ToLower() == "xmlns")
        //        //    {
        //        //        prefix = "gprefix_" + i++;
        //        //    }

        //        //    l_oNamespaceManager.AddNamespace(prefix, node.Value);
        //        //}

        //        return l_oNamespaceManager;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new GException(2950001, 29550001, ex); //RC-EX 29550001 : Při vytváření XML namespace manageru došlo k chybě.
        //    }
        //}// end method

        //public static XmlNamespaceManager CreateNamespaceManager(XmlDocument doc)
        //{
        //    XmlNamespaceManager namespaceManager = new XmlNamespaceManager(doc.NameTable);
        //    HashSet<string> registeredNamespaces = new HashSet<string>();

        //    XPathNavigator navigator = doc.CreateNavigator();
        //    if (navigator.MoveToFirstChild())
        //    {
        //        ScanNamespaces(navigator, namespaceManager, registeredNamespaces);
        //    }

        //    return namespaceManager;
        //}

        public static XmlNamespaceManager CreateNamespaceManager(string xmlPath)
        {
            NameTable nameTable = new NameTable();
            XmlNamespaceManager nsManager = new XmlNamespaceManager(nameTable);
            HashSet<string> seenUris = new HashSet<string>();

            using (XmlReader reader = XmlReader.Create(xmlPath))
            {
                while (reader.Read())
                {
                    if (reader.HasAttributes)
                    {
                        for (int i = 0; i < reader.AttributeCount; i++)
                        {
                            reader.MoveToAttribute(i);

                            if (reader.Prefix == "xmlns")
                            {
                                string prefix = reader.LocalName;
                                string nsUri = reader.Value;

                                if (!seenUris.Contains(nsUri))
                                {
                                    nsManager.AddNamespace(prefix, nsUri);
                                    seenUris.Add(nsUri);
                                }
                            }
                            else if (reader.Name == "xmlns")
                            {
                                // Default namespace
                                string nsUri = reader.Value;
                                if (!seenUris.Contains(nsUri))
                                {
                                    string autoPrefix = "ns" + seenUris.Count;
                                    nsManager.AddNamespace(autoPrefix, nsUri);
                                    seenUris.Add(nsUri);
                                }
                            }
                        }

                        reader.MoveToElement(); // návrat na element
                    }

                    // Pokud je na elementu namespace, přidej ho také
                    if (!string.IsNullOrEmpty(reader.NamespaceURI) && !seenUris.Contains(reader.NamespaceURI))
                    {
                        string autoPrefix = "ns" + seenUris.Count;
                        nsManager.AddNamespace(autoPrefix, reader.NamespaceURI);
                        seenUris.Add(reader.NamespaceURI);
                    }
                }
            }

            return nsManager;
        }


        public static XmlNamespaceManager CreateNamespaceManager(XmlDocument doc)
        {
            XmlNamespaceManager nsManager = new XmlNamespaceManager(doc.NameTable);
            HashSet<string> seenUris = new HashSet<string>();
            TraverseAndRegisterNamespaces(doc.DocumentElement, nsManager, seenUris);
            return nsManager;
        }

        private static void TraverseAndRegisterNamespaces(XmlNode node, XmlNamespaceManager nsManager, HashSet<string> seenUris)
        {
            if (node.Attributes != null)
            {
                foreach (XmlAttribute attr in node.Attributes)
                {
                    if (attr.Prefix == "xmlns") // xmlns:prefix="uri"
                    {
                        string prefix = attr.LocalName;
                        string uri = attr.Value;
                        if (!seenUris.Contains(uri))
                        {
                            nsManager.AddNamespace(prefix, uri);
                            seenUris.Add(uri);
                        }
                    }
                    else if (attr.Name == "xmlns") // xmlns="uri"
                    {
                        string uri = attr.Value;
                        if (!seenUris.Contains(uri))
                        {
                            string autoPrefix = "ns" + seenUris.Count;
                            nsManager.AddNamespace(autoPrefix, uri);
                            seenUris.Add(uri);
                        }
                    }
                }
            }

            // Pokud je element v namespace a není registrován
            if (!string.IsNullOrEmpty(node.NamespaceURI) && !seenUris.Contains(node.NamespaceURI))
            {
                string autoPrefix = "ns" + seenUris.Count;
                nsManager.AddNamespace(node.Prefix.IsNullOrEmpty() ? autoPrefix : node.Prefix , node.NamespaceURI);
                seenUris.Add(node.NamespaceURI);
            }

            // Rekurze pro všechny poduzly
            foreach (XmlNode child in node.ChildNodes)
            {
                if (child.NodeType == XmlNodeType.Element)
                {
                    TraverseAndRegisterNamespaces(child, nsManager, seenUris);
                }
            }
        }



        //private static void ScanNamespaces(XPathNavigator navigator, XmlNamespaceManager namespaceManager, HashSet<string> registeredNamespaces)
        //{
        //    do
        //    {
        //        string nsUri = navigator.NamespaceURI;
        //        if (!string.IsNullOrEmpty(nsUri) && !registeredNamespaces.Contains(nsUri))
        //        {
        //            string prefix = navigator.Prefix;
        //            if (string.IsNullOrEmpty(prefix))
        //            {
        //                prefix = "ns" + registeredNamespaces.Count;
        //            }

        //            namespaceManager.AddNamespace(prefix, nsUri);
        //            registeredNamespaces.Add(nsUri);
        //        }

        //        if (navigator.HasChildren)
        //        {
        //            navigator.MoveToFirstChild();
        //            ScanNamespaces(navigator, namespaceManager, registeredNamespaces);
        //            navigator.MoveToParent();
        //        }
        //    } while (navigator.MoveToNext());
        //}



        //------------------------------------------------------------------
        /// <summary>
        /// Serializace objektu do xml
        /// </summary>
        /// <param name="obj">objekt</param>
        /// <param name="type">type</param>
        /// <param name="namespaces">nemaspace pro serializaci</param>
        /// <returns></returns>
        public static string SerializeToXml(object obj, Type type, XmlSerializerNamespaces namespaces = null)
        {
            try
            {
                Log.Trace("(SerializeToXml-obj) XmlSerializer - cached");
                XmlSerializer serializer = GSerializerFactory.GetXmlSerializer(type);

                StringWriter sw = new StringWriter();
                if (namespaces == null)
                {
                    serializer.Serialize(sw, obj);
                }
                else
                {
                    serializer.Serialize(sw, obj, namespaces);
                }

                return sw.ToString();
            }
            catch (Exception ex)
            {
                throw new GException(2950014, 29550002, ex); //RC-EX 29550002 : Při serializaci do XML došlo k chybě.
            }
        }// end method


        //------------------------------------------------------------------
        /// <summary>
        /// Serializace objektu do xml
        /// </summary>
        /// <param name="dokument">dokument</param>
        /// <param name="namespaces">nemaspace pro serializaci</param>
        /// <returns></returns>
        public static string SerializeToXml(object dokument, XmlSerializerNamespaces namespaces = null)
        {
            try
            {
                Log.Trace("(SerializeToXml) XmlSerializer - cached");
                System.Xml.Serialization.XmlSerializer serializer = GSerializerFactory.GetXmlSerializer(dokument.GetType());

                StringWriter sw = new StringWriter();

                //6.6.2013 - Martin Halík - možnost přidání namespace
                if (namespaces == null)
                {
                    serializer.Serialize(sw, dokument);
                }
                else
                {
                    serializer.Serialize(sw, dokument, namespaces);
                }

                return sw.ToString();
            }
            catch (Exception ex)
            {
                throw new GException(2950002, 29550002, ex); //RC-EX 29550002 : Při serializaci do XML došlo k chybě.
            }
        }// end method

        //------------------------------------------------------------------
        /// <summary>
        /// Serializace objektu do xml
        /// </summary>
        /// <param name="obj">serializovaný objekt</param>
        /// <param name="namespaces">nemaspace pro serializaci</param>
        /// <returns>pole bajtů</returns>
        public static byte[] SerializeToXmlUTF8(object obj, XmlSerializerNamespaces namespaces = null)
        {
            try
            {
                Log.Trace("(SerializeToXmlUTF8) XmlSerializer - cached");

                System.Xml.Serialization.XmlSerializer serializer = GSerializerFactory.GetXmlSerializer(obj.GetType());

                using (var memStm = new MemoryStream())
                {
                    using (var xmlWriter = XmlWriter.Create(memStm, new XmlWriterSettings { Encoding = new UTF8Encoding(false) }))
                    {
                        //6.6.2013 - Martin Halík - možnost přidání namespace
                        if (namespaces == null)
                        {
                            serializer.Serialize(xmlWriter, obj);
                        }
                        else
                        {
                            serializer.Serialize(xmlWriter, obj, namespaces);
                        }

                        return memStm.ToArray();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new GException(2950009, 29550002, ex); //RC-EX 29550002 : Při serializaci do XML došlo k chybě.
            }
        }// end method


        //------------------------------------------------------------------
        /// <summary>
        /// Deserializace XML
        /// </summary>
        /// <typeparam name="T">typ</typeparam>
        /// <param name="xmlDoc">xml</param>
        /// <returns>instance typu</returns>
        public static T DeserializeXml<T>(XmlDocument xmlDoc) where T : class
        {
            try
            {
                T result;
                Log.Trace("(DeserializeXml) XmlSerializer - cached");
                XmlSerializer serializer = GSerializerFactory.GetXmlSerializer(typeof(T));

                using (XmlNodeReader reader = new XmlNodeReader(xmlDoc))
                {
                    result = (T)serializer.Deserialize(reader);
                }

                return result;
            }
            catch (Exception ex)
            {
                throw new GException(2950003, 29550003, ex); //RC-EX 29550003 : Při deserializaci XML došlo k chybě.
            }
        }// end method

        //------------------------------------------------------------------
        /// <summary>
        /// Deserializace xml uzlu
        /// </summary>
        /// <typeparam name="T">typ</typeparam>
        /// <param name="node">uzel</param>
        /// <returns>instance typu</returns>
        public static T DeserializeNode<T>(XmlNode node) where T : class
        {
            try
            {
                MemoryStream stm = new MemoryStream();

                StreamWriter stw = new StreamWriter(stm);
                stw.Write(node.OuterXml);
                stw.Flush();

                stm.Position = 0;

                Log.Trace("(DeserializeNode) new XmlSerializer! MemoryLeak!");
                XmlSerializer ser = new XmlSerializer(typeof(T), node.NamespaceURI);
                // XmlSerializer ser = GSerializerFactory.GetXmlSerializer(typeof(T), node.NamespaceURI);
                T result = (ser.Deserialize(stm) as T);

                stm.Close();

                return result;
            }
            catch (Exception ex)
            {
                throw new GException(2950004, 29550003, ex); //RC-EX 29550003 : Při deserializaci XML došlo k chybě.
            }
        }// end method


        //------------------------------------------------------------------
        /// <summary>
        /// Zvaliduje XML dokument podle zadaných schémat
        /// </summary>
        /// <param name="xmlDocument">XML dokument</param>
        /// <param name="schemasPaths">Cesta k embedded schématům, podle kterých se má provést validace.</param>
        /// <param name="assembly">volající assembly (nutné pro načtení embedded schémat)</param>
        /// <param name="chybyValidace">Chyby validace</param>
        /// <returns>TRUE = validní; FALSE = nevalidní</returns>
        public bool ValidateXml(XmlDocument xmlDocument, List<string> schemasPaths, Assembly assembly, out List<ValidationEventArgs> chybyValidace)
        {
            string chybaValidace = "";

            bool result = ValidateXml(xmlDocument, schemasPaths, assembly, out chybaValidace);

            chybyValidace = m_oValidationArgs;

            return result;
        }

        //------------------------------------------------------------------
        /// <summary>
        /// Zvaliduje XML dokument podle XSD schémat.
        /// </summary>
        /// <param name="xmlDocument">XML dokument</param>
        /// <param name="schemasPaths">Cesta k embedded schématům, podle kterých se má provést validace.</param>
        /// <param name="assembly">volající assembly (nutné pro načtení embedded schémat)</param>
        /// <param name="chyba">xsd chyba</param>
        /// <returns>Příznak validnosti XML souboru proti XML schématu.</returns>
        public bool ValidateXml(XmlDocument xmlDocument, List<string> schemasPaths, Assembly assembly, out string chyba)
        {
            try
            {
                m_bIsXsdError = false;
                m_sChybaValidace = "";

                chyba = "";
                bool v_vysledek = true;
                XmlSchema l_oSchema = null;

                // Set the validation settings.
                XmlReaderSettings v_settings = new XmlReaderSettings();
                v_settings.ValidationType = ValidationType.Schema;
                //v_settings.ValidationFlags |= XmlSchemaValidationFlags.ProcessInlineSchema;
                v_settings.ValidationFlags |= XmlSchemaValidationFlags.ReportValidationWarnings;
                v_settings.ValidationEventHandler += ValidationCallBack;

                foreach (string schemaPath in schemasPaths)
                {
                    using (Stream l_oStream = assembly.GetManifestResourceStream(schemaPath))
                    {
                        l_oSchema = XmlSchema.Read(l_oStream, null);                        
                    }

                    v_settings.Schemas.Add(l_oSchema);
                }

                StringReader sr = new StringReader(xmlDocument.DocumentElement.OuterXml);

                XmlTextReader tr = new XmlTextReader(sr);
                XmlReader l_oValidator = XmlReader.Create(tr, v_settings);

                try
                {
                    while (l_oValidator.Read())
                    {

                    }
                }
                catch (XmlException ex)
                {
                    chyba = String.Format("Chyba: {0}  ", ex.Message) + Environment.NewLine + Environment.NewLine;

                    m_bIsXsdError = true;
                }
                finally
                {
                    l_oValidator.Close();

                    chyba += m_sChybaValidace;
                }

                if (m_bIsXsdError)
                    v_vysledek = false;

                return v_vysledek;
            }
            catch (Exception ex)
            {
                throw new GException(2950005, 29550004, ex); //RC-EX 29550004 : Při validaci XML došlo k chybě.
            }
        }// end method

        //------------------------------------------------------------------
        /// <summary>
        /// Zvaliduje XML dokument podle XSD schématu.
        /// </summary>
        /// <param name="xmlDocument">XML dokument</param>
        /// <param name="xsdStream">Stream XSD souboru</param>
        /// <param name="chyba">xsd chyba</param>
        /// <returns>Příznak validnosti XML souboru proti XML schématu.</returns>
        public bool ValidateXml(XmlDocument xmlDocument, Stream xsdStream, out string chyba)
        {
            try
            {
                m_bIsXsdError = false;
                m_sChybaValidace = "";

                chyba = "";
                bool v_vysledek = true;
                XmlSchema l_oSchema = null;

                // Set the validation settings.
                XmlReaderSettings v_settings = new XmlReaderSettings();
                v_settings.ValidationType = ValidationType.Schema;
                //v_settings.ValidationFlags |= XmlSchemaValidationFlags.ProcessInlineSchema;
                v_settings.ValidationFlags |= XmlSchemaValidationFlags.ReportValidationWarnings;
                v_settings.ValidationEventHandler += ValidationCallBack;

                l_oSchema = XmlSchema.Read(xsdStream, null);

                v_settings.Schemas.Add(l_oSchema);
             

                StringReader sr = new StringReader(xmlDocument.DocumentElement.OuterXml);

                XmlTextReader tr = new XmlTextReader(sr);
                XmlReader l_oValidator = XmlReader.Create(tr, v_settings);

                try
                {
                    while (l_oValidator.Read())
                    {

                    }
                }
                catch (XmlException ex)
                {
                    chyba = String.Format("Chyba: {0}  ", ex.Message) + Environment.NewLine + Environment.NewLine;

                    m_bIsXsdError = true;
                }
                finally
                {
                    l_oValidator.Close();

                    chyba += m_sChybaValidace;
                }

                if (m_bIsXsdError)
                    v_vysledek = false;

                return v_vysledek;
            }
            catch (Exception ex)
            {
                throw new GException(31985501, 29550004, ex); //RC-EX 29550004 : Při validaci XML došlo k chybě.
            }
        }// end method


        //------------------------------------------------------------------
        /// <summary>
        /// Zvaliduje XML dokument podle zadaných XSD schémat
        /// </summary>
        /// <param name="xmlPath">Cesta k validovanému XML souboru.</param>
        /// <param name="schemasPaths">Cesta k embedded schématům, podle kterých se má provést validace.</param>
        /// <param name="assembly">volající assembly (nutné pro načtení embedded schémat)</param>
        /// <param name="chybaValidace">Chyba validace</param>
        /// <returns>TRUE = validní; FALSE = nevalidní</returns>
        public bool ValidateXml(string xmlPath, List<string> schemasPaths, Assembly assembly, out string chybaValidace)
        {
            List<ValidationEventArgs> result = new List<ValidationEventArgs>();

            result = ValidateXml(xmlPath, schemasPaths, assembly);

            chybaValidace = m_sChybaValidace;

            return result.Count == 0;
        }

        //------------------------------------------------------------------
        /// <summary>
        /// Zvaliduje XML dokument podle zadaných XSD schémat
        /// </summary>
        /// <param name="xmlPath">Cesta k validovanému XML souboru.</param>
        /// <param name="schemasPaths">Cesta k embedded schématům, podle kterých se má provést validace.</param>
        /// <param name="assembly">volající assembly (nutné pro načtení embedded schémat)</param>
        /// <param name="chybyValidace">Chyby validace</param>
        /// <returns>TRUE = validní; FALSE = nevalidní</returns>
        public bool ValidateXml(string xmlPath, List<string> schemasPaths, Assembly assembly, out List<ValidationEventArgs> chybyValidace)
        {
            chybyValidace = ValidateXml(xmlPath, schemasPaths, assembly);

            return chybyValidace.Count == 0;
        }

        //------------------------------------------------------------------
        /// <summary>
        /// Zvaliduje XML dokument podle zadaných XSD schémat
        /// </summary>
        /// <param name="xmlPath">Cesta k validovanému XML souboru.</param>
        /// <param name="schemasPaths">Cesta k embedded schématům, podle kterých se má provést validace.</param>
        /// <param name="assembly">volající assembly (nutné pro načtení embedded schémat)</param>
        /// <returns>Vrací seznam ValidationEventArgs, pokud je validní, tak je Count == 0</returns>
        public List<ValidationEventArgs> ValidateXml(string xmlPath, List<string> schemasPaths, Assembly assembly)
        {
            try
            {
                m_oValidationArgs = new List<ValidationEventArgs>();

                XmlReaderSettings l_oSettings = new XmlReaderSettings();
                l_oSettings.ValidationType = ValidationType.Schema;
                
                XmlSchemaSet l_oSchemas = new XmlSchemaSet();
                l_oSettings.Schemas = l_oSchemas;

                XmlSchema l_oSchema;

                foreach (string schemaPath in schemasPaths)
                {
                    using (Stream l_oStream = assembly.GetManifestResourceStream(schemaPath))
                    {
                        l_oSchema = XmlSchema.Read(l_oStream, null);
                    }

                    l_oSchemas.Add(l_oSchema);
                }

                l_oSettings.ValidationEventHandler += ValidationCallBack;
                XmlReader l_oValidator = XmlReader.Create(xmlPath, l_oSettings);
                try
                {
                    while (l_oValidator.Read()) { }
                }
                catch
                {

                }
                finally
                {
                    l_oValidator.Close();
                }

                return m_oValidationArgs;

            }
            catch (Exception ex)
            {
                throw new GException(2950006, 29550004, ex); //RC-EX 29550004 : Při validaci XML došlo k chybě.
            }
        }// end method

        /// <summary>
        /// Returns a _private_ Property Value from a given Object. Uses Reflection.
        /// Throws a ArgumentOutOfRangeException if the Property is not found.
        /// </summary>
        /// <typeparam name="T">Type of the Property</typeparam>
        /// <param name="obj">Object from where the Property Value is returned</param>
        /// <param name="propName">Propertyname as string.</param>
        /// <returns>PropertyValue</returns>
        public static T GetPrivatePropertyValue<T>(object obj, string propName)
        {
            if (obj == null) throw new ArgumentNullException("obj");
            PropertyInfo pi = obj.GetType().GetProperty(propName, BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
            if (pi == null) throw new ArgumentOutOfRangeException("propName", string.Format("Property {0} was not found in Type {1}", propName, obj.GetType().FullName));
            return (T)pi.GetValue(obj, null);
        }

        //------------------------------------------------------------------
        /// <summary>
        /// Pomocná funkce pro zachycení textu a místa případně chyby v XML souboru při kontrole proti XSD schématu.
        /// </summary>
        private void ValidationCallBack(object sender, ValidationEventArgs args)
        {
            try
            {
                string errorElement = "";
                try //dsebesta 04.08.2023 část na zjištování názvu uzlu, projistotu obalím, kdyby to někdy selhalo 
                {
                    XmlReader xmlReader = (XmlReader)sender;
                    if (xmlReader != null && xmlReader.Name != null && xmlReader.Name != "")
                    {
                        errorElement = xmlReader.Name;
                    }
                    else if (xmlReader != null && xmlReader.Value != null && xmlReader.Value != "")
                    {
                        errorElement = xmlReader.Value;
                    }

                }
                catch {
                    ;// dsebesta projistotu abych něckomu něco nerozbil
                }
                if (args.Severity == XmlSeverityType.Warning)
                {
                    m_sChybaValidace += String.Format(
                        GResources.GetResourceText(ThisAssembly,29550007),  //RC 29550007 : Řádek: {0}, Znak {1}, Název node nebo jeho hodnota: {3} - Varování: {2}  
                        args.Exception.LineNumber.ToString(), 
                        args.Exception.LinePosition.ToString(), 
                        args.Message,
                        errorElement
                        ) + Environment.NewLine + Environment.NewLine;
                }
                else
                {
                    //19.4.2017 - Martin Halik - pozrani chyby validace datoveho typu integer. XML dovoluje pro tento typ neomezeny pocet cisel, ale .NET uz ne
                    if(args.Exception != null && args.Exception is XmlSchemaException)
                    {
                        //pres reflection vytahnu skrytou property
                        PropertyInfo l_Property = args.Exception.GetType().GetProperty("Args", BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
                        if (l_Property != null)
                        {
                            string[] l_Args = l_Property.GetValue(args.Exception) as string[];

                            if (l_Args != null && l_Args.Length > 3)
                            {
                                if (l_Args[2].Contains("http://www.w3.org/2001/XMLSchema:integer"))
                                {
                                    string l_Value = l_Args[1];

                                    Regex regex = new Regex("[0-9]");

                                    if (regex.IsMatch(l_Value)) //obsahuje pouze cisla
                                    {
                                        m_bIsXsdError = false;
                                        return;
                                    }
                                }
                            }
                        }
                    }
                   
                    m_sChybaValidace += String.Format(
                        GResources.GetResourceText(ThisAssembly,29550008), //RC 29550008 : Řádek: {0}, Znak {1}, Název node nebo jeho hodnota: {3} - Chyba: {2}
                        args.Exception.LineNumber.ToString(),
                        args.Exception.LinePosition.ToString(), 
                        args.Message,
                        errorElement) + Environment.NewLine + Environment.NewLine;
                }
                m_oValidationArgs.Add(args);

                if (args.Severity == XmlSeverityType.Error)
                {
                    m_bIsXsdError = true;
                }
            }
            catch (Exception ex)
            {
                throw new GException(2950007, 29550005, ex); //RC-EX 29550005 : Při zapisování chyb validace došlo k chybě.
            }
        }// end method

        /// <summary>
        /// Převede datum v xml formátu gYear do DateTime
        /// Povolené hodnoty dle http://books.xmlschemata.org/relaxng/ch19-77135.html :
        /// 2001-10, 2001-10+02:00, 2001-10Z, 2001-10+00:00, -2001-10, -20000-04
        /// </summary>
        /// <param name="xmlValue">hodnota z xml</param>
        /// <returns>DateTime</returns>
        public static DateTime GYearMonthToDateTime(string xmlValue)
        {
            try
            {
                DateTime l_oResult;

                DateTime.TryParse(xmlValue, out l_oResult);

                if (l_oResult.Year < 2)
                {
                    return l_oResult;
                }

                DateTime.TryParseExact(xmlValue, "yyyy-MM", null, System.Globalization.DateTimeStyles.None, out l_oResult);

                if (l_oResult.Year < 2)
                {
                    return l_oResult;
                }

                DateTime.TryParseExact(xmlValue, "yyyy-MM+hh:mm", null, System.Globalization.DateTimeStyles.None, out l_oResult);

                if (l_oResult.Year < 2)
                {
                    return l_oResult;
                }

                DateTime.TryParseExact(xmlValue, "yyyy-MMZ", null, System.Globalization.DateTimeStyles.None, out l_oResult);

                if (l_oResult.Year < 2)
                {
                    return l_oResult;
                }

                DateTime.TryParseExact(xmlValue, "-yyyy-MM", null, System.Globalization.DateTimeStyles.None, out l_oResult);

                if (l_oResult.Year < 2)
                {
                    return l_oResult;
                }

                return l_oResult;
            }
            catch (Exception ex)
            {
                throw new GException(2950008, 29550006, ex); //RC-EX 29550006 : Při převodu gYear na DateTime došlo k chybě.
            }
        }

        /// <summary>
        /// Vytvoří XPath pro daný uzel
        /// </summary>
        /// <param name="node">uzel</param>
        /// <param name="mngr">namespace manager</param>
        /// <returns>XPath</returns>
        public static string FindXPath(XmlNode node, XmlNamespaceManager mngr)
        {
            try
            {
                if(node == null) throw new GArgumentNullException("node");
                if(mngr == null) throw new GArgumentNullException("mngr");

                StringBuilder builder = new StringBuilder();

                while (node != null)
                {
                    switch (node.NodeType)
                    {
                        case XmlNodeType.Attribute:
                            builder.Insert(0, "/@" + node.Name);
                            node = ((XmlAttribute)node).OwnerElement;
                            break;
                        case XmlNodeType.Element:
                            string l_NmspcPrefix = mngr.LookupPrefix(node.NamespaceURI);
                            builder.Insert(0, string.Format("/{0}{1}[{2}]", l_NmspcPrefix.IsNullOrEmpty() ? "" : l_NmspcPrefix + ":", node.LocalName, FindElementIndex((XmlElement)node)));
                            node = node.ParentNode;
                            break;
                        case XmlNodeType.Document:
                            node = null;
                            break;
                        default:
                            throw new GArgumentException(2950012, 29550010); //RC-EX 29550010 : Nepodporovaný typ uzlu - povoleny pouze elementy a atributy.
                    }
                }

                return builder.ToString();
            }
            catch (Exception ex)
            {
                throw new GException(2950010, 29550009, ex); //RC-EX 29550009 : Při hledání XPath došlo k chybě.
            }
        }

        static int FindElementIndex(XmlElement element)
        {
            try
            {
                int index = 1;

                XmlNode parentNode = element.ParentNode;

                if (parentNode is XmlDocument)
                {
                    return 1;
                }

                XmlElement parent = (XmlElement)parentNode;

                foreach (XmlNode candidate in parent.ChildNodes)
                {
                    if (candidate is XmlElement && candidate.Name == element.Name)
                    {
                        if (candidate == element)
                        {
                            return index;
                        }
                        index++;
                    }
                }

                return index;
            }
            catch (Exception ex)
            {
                throw new GException(2950013, 29550011, ex); //RC-EX 29550011 : Při hledání indexu xml elementu došlo k chybě.
            }
        }

    }
}
