//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GlobalListLoader.cs                      </Name>
//    <Description> Tato třída se stará o externí-měnitelné seznamy             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Xml;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.ExternalList
{
    /// <summary>
    /// Tato třída se stará o externí-měnitelné seznamy
    /// </summary>
    public class GlobalListLoader
    {
        static readonly string dictionaryfile = "USR-Parsers-lists.xml";
        static string dictionaryfileversion = "19";

        static List<GlobalList> lists = new List<GlobalList>();
        /// <summary>
        /// Seznam nástrojů
        /// </summary>
        public static List<GlobalList> Lists
        {
            get { return lists; }
            set { lists = value; }
        }

        /// <summary>
        /// načtení seznamu ze souboru
        /// </summary>
        /// <param name="filename">cesta k souboru seznamů</param>
        /// <returns>TRUE - seznamy jsou načtené</returns>
        static bool LoadListsFromFile(string filename)
        {
            if (!File.Exists(filename))
                return false;

            XmlDocument doc = new XmlDocument();
            try
            {
                doc.Load(filename);

                if (doc.FirstChild != null
                    && doc.FirstChild.Attributes["version"] != null
                    && doc.FirstChild.Attributes["version"].Value != null)
                    dictionaryfileversion = doc.FirstChild.Attributes["version"].Value;

                //if (doc.DocumentElement.Attributes["version"].InnerText != dictionaryfileversion)
                //    return false;

                lists = new List<GlobalList>();
                XmlNodeList nodes = doc.DocumentElement.ChildNodes;

                foreach (var el in nodes)
                    if (el is XmlElement)
                        lists.Add(new GlobalList(el as XmlElement));
            }
            catch (Exception) { return false; }
            return true;
        }

        static void WriteListsToFile(string fileName)
        {
            XmlDocument doc = new XmlDocument();
            doc.LoadXml("<lists version = \"" + dictionaryfileversion + "\" />");

            foreach (GlobalList et in lists)
                doc.DocumentElement.AppendChild(et.ToXmlElement(doc));

            FileUtility.ObservedSave(new NamedFileOperationDelegate(doc.Save), fileName, FileErrorPolicy.ProvideAlternative, false);
        }

        /// <summary>
        /// Tato metoda načte externí seznamy z XML konfiguračního soubor.
        /// </summary>
        static GlobalListLoader() { LoadListsFromUsersData(); }

        static bool LoadListsFromUsersData()
        {
            try
            {
                if (!CommonService.IsLC && string.IsNullOrEmpty(PropertyService.ConfigDirectory))
                {
                    //MAL:pada z DNP!
                    //string applicationName = Assembly.GetEntryAssembly().GetName().Name;
                    string applicationName = Path.GetFileNameWithoutExtension(System.Diagnostics.Process.GetCurrentProcess().MainModule.FileName);
                    if (applicationName.EndsWith(".vshost")) applicationName = applicationName.Substring(0, applicationName.Length - ".vshost".Length);
                    PropertyService.InitializeService(
                        Path.Combine(EnvironmentService.ApplicationData, applicationName)
                        , Path.Combine(EnvironmentService.ApplicationData, applicationName, "data")
                        , applicationName + ".Properties");
                }

                ResourceService.SaveFile(typeof(GlobalListLoader).Assembly, PropertyService.ConfigDirectory, @"^*." + dictionaryfile, ".");

                return LoadListsFromFile(FileUtility.Combine(PropertyService.ConfigDirectory, dictionaryfile));
            }
            catch { return false; }
        }

        /// <summary>
        /// Tato metoda uloží externí seznamy do XML konfiguračního souboru
        /// v aktuálním uživatelském adresáři
        /// </summary>
        public static void SaveLists()
        {
            WriteListsToFile(Path.Combine(PropertyService.ConfigDirectory, dictionaryfile));
        }

        /// <summary>
        /// získání slovníku dle identifikátoru
        /// </summary>
        /// <param name="id">Jednozančý identifikátor listu</param>
        /// <param name="reverse">Obrácené pořadí</param>
        /// <returns></returns>
        public static Dictionary<string, string> GetDictionary(string id, bool reverse = false)
        {
            if (CommonService.IsLC)
                return new Dictionary<string, string>();

            GlobalList list = lists.FirstOrDefault(lst => lst.ID.Equals(id, StringComparison.InvariantCultureIgnoreCase));
            return list == null ? new Dictionary<string, string>() : list.GetDictionary(reverse);
        }

        /// <summary>
        /// Získání seznamu
        /// </summary>
        /// <typeparam name="T1"></typeparam>
        /// <param name="id"></param>
        /// <param name="type1"></param>
        /// <returns></returns>
        public static Dictionary<string, T1> GetDictionaryKey<T1>(string id, T1 type1)
        {
            if (!CommonService.IsDesigner)
                return new Dictionary<string, T1>();

            GlobalList list = lists.FirstOrDefault(lst => lst.ID.Equals(id, StringComparison.InvariantCultureIgnoreCase));
            return list == null ? new Dictionary<string, T1>() : list.GetDictionaryKey(type1);
        }

        /// <summary>
        /// Získání seznamu
        /// </summary>
        /// <typeparam name="T1"></typeparam>
        /// <typeparam name="T2"></typeparam>
        /// <param name="id"></param>
        /// <param name="type1"></param>
        /// <param name="type2"></param>
        /// <returns></returns>
        public static Dictionary<T1, T2> GetDictionaryKey<T1, T2>(string id, T1 type1, T2 type2)
        {
            if (!CommonService.IsDesigner)
                return new Dictionary<T1, T2>();

            GlobalList list = lists.FirstOrDefault(lst => lst.ID.Equals(id, StringComparison.InvariantCultureIgnoreCase));
            return list == null ? new Dictionary<T1, T2>() : list.GetDictionaryKey(type1, type2);
        }
    }
}
