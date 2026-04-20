//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.StructureViewEntry.cs                 </Name>
//    <Description> Jednotka prezentující položku seznamu struktur.             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Gordic.Gfe.FormFiller.Gui;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Services;

namespace Gordic.Gfe.FormFiller.StructureView
{
    /// <summary>
    /// Jednotka prezentující položku seznamu struktur.
    /// Má v sobě informací o datové struktuře.
    /// </summary>
    class StructureViewEntry
    {
        #region Staticeké metody vytvoření StructureViewEntry
        /// <summary>
        /// Vytvoření nové instance třídy se specifickou kategorii
        /// a přidání jí do podložky StructureViewPad.
        /// </summary>
        public static StructureViewEntry GetOrCreate(string fileName)
        {
            StructureViewEntry structure = null;

            if (StructureViewPad.Instance.Entries.Exists(entry => entry.FileName.Equals(fileName, StringComparison.InvariantCultureIgnoreCase)))
                structure = StructureViewPad.Instance.Entries.First(entry => entry.FileName.Equals(fileName, StringComparison.InvariantCultureIgnoreCase));
            else
            {
                structure = new StructureViewEntry(fileName);
                StructureViewPad.Instance.AddItem(structure);
            }
            return structure;
        }
        /// <summary>
        /// Vytvoření položky struktury
        /// </summary>
        /// <param name="structure"></param>
        /// <param name="file">Název souboru sestavy! dle kterého se hledá struktura</param>
        internal static void Create(ref StructureViewEntry structure, OpenedFile file)
        {
            if (file == null)
                return;

            ParseInformation parseInformation = ParserService.GetParseInformation(file.FileName);
            if (parseInformation == null)
                return;

            StructureViewEntry newStructure = null;
            CreateStructureByID(ref newStructure, parseInformation.ValidCompilationUnit.GetID(), file);
            if (System.Threading.Interlocked.CompareExchange(ref newStructure, structure, null) != null)
                structure = newStructure;
        }

        static void CreateStructureByID(ref StructureViewEntry structure, string structureID, OpenedFile file)
        {
            if (StructureViewPad.Instance.Entries.Exists(entry => entry.StructureID.Equals(structureID, StringComparison.InvariantCultureIgnoreCase)))
                structure = StructureViewPad.Instance.Entries.First(entry => entry.StructureID.Equals(structureID, StringComparison.InvariantCultureIgnoreCase));

            if (structure == null)
                structure = GetStructureFromDir(structureID, Directory.GetParent(file.FileName).FullName);

            if (structure == null)
                CreateStructureFromUserDir(ref structure, structureID);
        }

        static StructureViewEntry GetStructureFromDir(string structureID, string dirPath)
        {
            if (Directory.Exists(dirPath))
                // prohledáme i ve složce sestavy
                foreach (string l_FileName in Directory.GetFiles(dirPath, "*.xme"))
                    try
                    {
                        StructureViewEntry entry = new StructureViewEntry(l_FileName);

                        if (entry.StructureID.Equals(structureID, StringComparison.InvariantCultureIgnoreCase))
                        {
                            StructureViewPad.Instance.AddItem(entry);
                            return entry;
                        }
                    }
                    catch { } //vyjimku zaignoruju - asi nejaka chybna struktura, at si ji otevre explicitne, kdyz chce videt co je tam za chybu
            return null;
        }

        static void CreateStructureFromUserDir(ref StructureViewEntry structure, string structureID)
        {
            // v případě, že struktura nebyla nalezena ani ve složce sestavy
            // pak se jí pokusíme najit ve složce zadané uživatelem
            string _dirXME = FormFillerProperties.Instance.XmePath;
            string[] _xmeDirs = null;
            if (!string.IsNullOrEmpty(_dirXME))
                _xmeDirs = _dirXME.Split(';');

            if (_xmeDirs != null && _xmeDirs.Length != 0)
                // prohledáme v nakonfigurovaných složkách
                foreach (string _dir in _xmeDirs)
                {
                    if (Directory.Exists(_dir))
                        structure = GetStructureFromDir(structureID, _dir);
                    if (structure != null)
                        return;
                }
        }

        #endregion

        string fileName;
        GFEStructure structure;

        /// <summary>
        /// Struktura
        /// </summary>
        public GFEStructure Structure { get { return structure; } }

        /// <summary>
        /// Prezentuje text jednotky
        /// </summary>
        public string StructureID { get { return structure != null ? structure.StructureID : "<neznámé>"; } }

        /// <summary>
        /// Soubor struktury dat
        /// </summary>
        public string FileName
        {
            get { return fileName; }
            set
            {
                fileName = value;
                Refresh();
            }
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        private StructureViewEntry() { }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="fileName">název souboru struktury</param>
        public StructureViewEntry(string fileName)
        {
            FileName = fileName;
        }

        /// <summary>
        /// Aktualizace struktury
        /// </summary>
        internal void Refresh()
        {
            if (!string.IsNullOrEmpty(fileName) && File.Exists(fileName))
            {
                try { structure = GFEStructure.LoadFromFile(fileName); return; }
                catch
                {
                    try
                    {
                        using (Stream s = new FileStream(fileName, FileMode.Open, FileAccess.Read))
                        {
                            // načtení souboru
                            Encoding encoding = Encoding.UTF8;
                            structure = GFEStructure.LoadFromBytes(FileReader.ReadFileBytes(s, ref encoding), fileName);
                        }
                    }
                    catch (Exception ex) {
                        MessageService.ShowError(ex);
                    }
                }
            }
        }

        /// <summary>
        /// Získání hlavního regionu struktury dle aktuálně otevřeného souboru
        /// </summary>
        /// <returns></returns>
        internal string GetStructureRootRegion()
        {
            return Structure.Root.Children.Count() != 0 ? Structure.Root.Children.First().Name : string.Empty;
        }

        /// <summary>
        /// Získání hodnoty atributu dle klíče
        /// </summary>
        /// <param name="key">Klíč k hodnptě atributu</param>
        /// <returns></returns>
        internal string GetInfoAttributeValue(string key)
        {
            return structure.Infos.ContainsKey(key) ? structure.Infos[key] : string.Empty;
        }

        /// <summary>
        /// Získání položky struktury dat dle úplného názvu
        /// </summary>
        /// <param name="fullName">úplný název položky</param>
        /// <returns>Hledaná položka</returns>
        public object GetDataItem(string fullName)
        {
            if (Structure == null)
                return null;
            GFERegion region = Structure.Root;
            List<string> names = fullName.Split('.').ToList();
            while (names.Count > 0)
            {
                if (names.Count > 1)
                {
                    region = region.Children.FirstOrDefault(chld => chld.Name.Equals(names[0], StringComparison.InvariantCultureIgnoreCase));
                    if (region == null)
                        return null;
                    names.RemoveAt(0);
                }
                else
                {
                    GFEDataItem item = region.Items.FirstOrDefault(itm => itm.Name.Equals(names[0], StringComparison.InvariantCultureIgnoreCase));
                    if (item != null)
                        return item;
                    return region.Children.FirstOrDefault(chld => chld.Name.Equals(names[0], StringComparison.InvariantCultureIgnoreCase));
                }
            }
            return region;
        }
    }
}
