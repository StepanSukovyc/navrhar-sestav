//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.StructureViewEntry.cs                  </Name>
//    <Description> Jednotka prezentující položku seznamu struktur.             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Linq;
using System.Text;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Gui;
using Gordic.General;
using Gordic.GFE.WinClient.Project;

namespace Gordic.GFE.WinClient.StructureView
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
            if (!string.IsNullOrEmpty(structureID))
            {
                if (StructureViewPad.Instance.Entries.Exists(entry => entry.StructureID.Equals(structureID, StringComparison.InvariantCultureIgnoreCase)))
                    structure = StructureViewPad.Instance.Entries.First(entry => entry.StructureID.Equals(structureID, StringComparison.InvariantCultureIgnoreCase));

                if (structure == null)
                    structure = GetStructureFromDir(structureID, Directory.GetParent(file.FileName).FullName);

                if (structure == null)
                    CreateStructureFromUserDir(ref structure, structureID);
            }
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
            string _dirXME = ReportDesignerProperties.Instance.XmePath;
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
        StructureViewTreeControl viewTree;
        GFEStructure structure;
        /// <summary>
        /// Struktura
        /// </summary>
        public GFEStructure Structure { get => structure; }


        /// <summary>
        /// Získání objektu, ve kterém je StructureViewEntry uzamčeno.
        /// </summary>
        public object SyncRoot { get => viewTree; }
        /// <summary>
        /// Nastavení stromu struktury
        /// </summary>
        public StructureViewTreeControl ViewTree { set { viewTree = value; } }
        /// <summary>
        /// Prezentuje text jednotky
        /// </summary>
        public string StructureID { get => structure != null ? structure.StructureID : GResources.GetResourceText(29451485); }

        bool isFromSolution;
        /// <summary>
        /// indikuje, že struktura je ze sestavení
        /// </summary>
        public bool IsFromSolution { get => isFromSolution; }

        /// <summary>
        /// Soubor struktury dat
        /// </summary>
        public string FileName
        {
            get => fileName;
            set
            {
                fileName = value;
                Refresh();
            }
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="fileName">název souboru struktury</param>
        public StructureViewEntry(string fileName) { FileName = fileName; }

        /// <summary>
        /// Aktualizace struktury
        /// </summary>
        internal void Refresh()
        {
            if (!string.IsNullOrEmpty(fileName) && File.Exists(fileName))
            {
                isFromSolution = ProjectService.OpenSolution != null && ProjectService.OpenSolution.FindProjectContainingFile(fileName) != null;

                try { structure = GFEStructure.LoadFromFile(fileName); return; }
                catch (Exception ex)
                {
                    IViewContent content = Services.FileAgent.GetViewForFile(fileName);
                    if (content == null)
                    {
                        if (MessageService.AskQuestion(string.Format(GResources.GetResourceText(29450392) + "\n{0}\n" + GResources.GetResourceText(29450391), ex.Message))) //RC 29450392 : Chyba načtení datové struktury
                        {
                            Services.FileAgent.OpenFile(fileName, true);
                            return;
                        }
                    }
                    else
                        return;
                }
                try
                {
                    using (Stream s = new FileStream(fileName, FileMode.Open, FileAccess.Read))
                    {
                        // načtení souboru
                        Encoding encoding = Encoding.UTF8;
                        structure = GFEStructure.LoadFromBytes(FileReader.ReadFileBytes(s, ref encoding), fileName);
                    }
                }
                catch (Exception ex)
                {
                    MessageService.ShowError(ex);
                }
            }
        }

        /// <summary>
        /// Získání hlavního regionu struktury dle aktuálně otevřeného souboru
        /// </summary>
        /// <returns></returns>
        internal string GetStructureRootRegionName() => Structure.Root.Children.Count() != 0 ? Structure.Root.Children.First().Name : string.Empty;

        /// <summary>
        /// Získání hlavního regionu struktury dle aktuálně otevřeného souboru
        /// </summary>
        /// <returns></returns>
        internal GFERegion GetStructureRootRegion() => Structure.Root.Children.Count() != 0 ? Structure.Root.Children.First() : null;

        /// <summary>
        /// získání větve vnořeného regionu
        /// </summary>
        /// <param name="regName">název hledaného regionu</param>
        /// <returns></returns>
        internal System.Windows.Forms.TreeNode[] GetStructureRegion(string regName) => viewTree.GetNode(regName);

        /// <summary>
        /// nastavení výbraného objektu dle úplnéh onázvu
        /// </summary>
        /// <param name="fullPath">úplná cesta k objektu</param>
        /// <param name="position">pozice podvětve</param>
        internal void SelectNode(string fullPath, int position)
        {
            viewTree.SelectNode(fullPath, position);
        }
    }
}
