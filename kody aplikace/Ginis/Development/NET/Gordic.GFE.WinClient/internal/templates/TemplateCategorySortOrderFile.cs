//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.TemplateCategorySortOrderFile.cs       </Name>
//    <Description> Soubor, který definuje pořadí pro kategorie souboru a projektu.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-19                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Xml;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.Internal.Templates
{
    /// <summary>
    /// Soubor, který definuje pořadí pro kategorie souboru a projektu.
    /// </summary>
    public class TemplateCategorySortOrderFile
    {
        /// <summary>
        /// neurčité řazení
        /// </summary>
        public const int UndefinedSortOrder = -1;
        /// <summary>
        /// soubor řazení souborů v kategorii
        /// </summary>
        public const string FileCategorySortOrderFileName = "FileCategorySortOrder.xml";

        Dictionary<string, int> sortOrders = new Dictionary<string, int>();
        static List<TemplateCategorySortOrderFile> fileCategorySortOrderFiles;
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        public TemplateCategorySortOrderFile(string fileName)
            : this(new XmlTextReader(new StreamReader(fileName, true)))
        {
        }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="reader">čtečka</param>
        public TemplateCategorySortOrderFile(XmlTextReader reader)
        {
            using (reader)
            {
                XmlDocument doc = new XmlDocument();
                doc.Load(reader);
                foreach (XmlElement category in doc.DocumentElement.SelectNodes("Category"))
                {
                    string name = StringParser.Parse(category.GetAttribute("Name"));
                    if (name.Length > 0 && category.HasAttribute("SortOrder"))
                        sortOrders.Add(name, GetSortOrder(category.GetAttribute("SortOrder")));
                    foreach (XmlElement subCategory in category.SelectNodes("Category"))
                        if (subCategory.HasAttribute("Name"))
                            sortOrders.Add(String.Concat(name, ",", StringParser.Parse(subCategory.GetAttribute("Name"))), GetSortOrder(subCategory.GetAttribute("SortOrder")));
                }
            }
        }
        /// <summary>
        /// získání řazení dle názvu
        /// </summary>
        /// <param name="name">název</param>
        /// <returns></returns>
        public int GetCategorySortOrder(string name)
        {
            if (sortOrders.ContainsKey(name))
                return sortOrders[name];
            return UndefinedSortOrder;
        }
        /// <summary>
        /// získání řazení kategorie
        /// </summary>
        /// <param name="name">název</param>
        /// <param name="subcategoryName">podkategorie</param>
        /// <returns></returns>
        public int GetCategorySortOrder(string name, string subcategoryName)
        {
            string key = String.Concat(name, ",", subcategoryName);
            return GetCategorySortOrder(key);
        }
        
        /// <summary>
        /// získání řazení souboru kategorii
        /// </summary>
        /// <param name="name">název</param>
        /// <returns></returns>
        public static int GetFileCategorySortOrder(string name)
        {
            if (fileCategorySortOrderFiles == null)
                ReadFileCategorySortOrderFiles();
            foreach (TemplateCategorySortOrderFile file in fileCategorySortOrderFiles)
            {
                int sortOrder = file.GetCategorySortOrder(name);
                if (sortOrder != UndefinedSortOrder)
                    return sortOrder;
            }
            return UndefinedSortOrder;
        }

        /// <summary>
        /// získání řazení souboru v kategorii
        /// </summary>
        /// <param name="name">název</param>
        /// <param name="subcategoryName">název podkategorii</param>
        /// <returns></returns>
        public static int GetFileCategorySortOrder(string name, string subcategoryName)
        {
            string key = String.Concat(name, ",", subcategoryName);
            return GetFileCategorySortOrder(key);
        }

        int GetSortOrder(string s)
        {
            int sortOrder;
            if (Int32.TryParse(s, out sortOrder))
                return sortOrder;
            return UndefinedSortOrder;
        }

        static void ReadFileCategorySortOrderFiles()
        {
            fileCategorySortOrderFiles = new List<TemplateCategorySortOrderFile>();
            string dataTemplateDir = FileUtility.Combine(PropertyService.DataDirectory, "templates", "file");
            List<string> files = FileUtility.SearchDirectory(dataTemplateDir, FileCategorySortOrderFileName);
            foreach (string fileName in files)
                try { fileCategorySortOrderFiles.Add(new TemplateCategorySortOrderFile(fileName)); }
                catch { }
        }
    }
}
