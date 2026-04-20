//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.StructureViewPad.cs                    </Name>
//    <Description> Rozhraní obsahů používajícíc strukturu                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.Project;

namespace Gordic.GFE.WinClient.StructureView
{
    /// <summary>
    /// Rozhraní obsahů používajících strukturu
    /// </summary>
    interface IStructureHost
    {
        /// <summary>
        /// Jednotka struktury
        /// </summary>
        StructureViewEntry StructureEntry { get; }
    }

    /// <summary>
    /// Podložka datových struktur
    /// </summary>
    class StructureViewPad : AbstractPadContent, IHasPropertyContainer
    {
        #region AbstractPadContent
        /// <summary>
        /// Ovladač podložky
        /// </summary>
        public override Control Control { get => padPanel; }
        #endregion

        #region IHasPropertyContainer
        /// <summary>
        /// kontejner pro práci s vlastnostmi objektů uvnitř záložky
        /// </summary>
        public PropertyContainer PropertyContainer { get => structureViewTree.PropertyContainer; }
        #endregion

        StructureViewTreeControl structureViewTree;
        static StructureViewPad instance;

        Panel padPanel = new Panel();
        readonly ToolStrip toolStrip;

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public StructureViewPad()
        {
            instance = this;
            padPanel.SuspendLayout();
            structureViewTree = new StructureViewTreeControl
            {
                Dock = DockStyle.Fill
            };

            toolStrip = ToolbarService.CreateToolStrip(this, "/ReportDesigner/Pads/StructureView/Toolbar");
            toolStrip.Stretch = true;
            toolStrip.GripStyle = ToolStripGripStyle.Hidden;

            padPanel.Controls.AddRange(new Control[] { structureViewTree, toolStrip });
            padPanel.ResumeLayout(false);
            DisplayActiveItem();
            SimpleDesktop.Desktop.ActiveViewContentChanged += ActiveViewContentChanged;
            ProjectService.SolutionClosed += ProjectService_SolutionClosed;
        }

        void ProjectService_SolutionClosed(object sender, EventArgs e)
        {
            int index = 0;
            bool removed = false;

            while (index < entries.Count)
                if (entries[index].IsFromSolution)
                {
                    entries.RemoveAt(index);
                    removed = true;
                }
                else index++;

            if (removed)
            {
                RefreshItem();
                OnItemRemoved(EventArgs.Empty);
            }
        }

        /// <summary>
        /// Instance třídy
        /// </summary>
        public static StructureViewPad Instance
        {
            get
            {
                if (instance == null)
                    SimpleDesktop.Desktop.GetPad(typeof(StructureViewPad)).CreatePad();
                return instance;
            }
        }

        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnění</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                SimpleDesktop.Desktop.ActiveViewContentChanged -= ActiveViewContentChanged;
                if (structureViewTree != null)
                {
                    structureViewTree.Dispose();
                    structureViewTree = null;
                }

                if (padPanel != null)
                {
                    padPanel.Dispose();
                    padPanel = null;
                }
            }
            base.Dispose(disposing);
        }

        /// <summary>
        /// Aktivní položka
        /// </summary>
        public StructureViewEntry ActiveItem { get => selectedIndex == -1 || entries.Count == 0 ? null : entries[selectedIndex]; }

        /// <exclude/>
        protected virtual void OnSelectedItemIndexChanged(EventArgs e)
        {
            SelectedItemIndexChanged?.Invoke(this, e);
        }
        /// <exclude/>
        protected virtual void OnItemAdded(EventArgs e)
        {
            ItemAdded?.Invoke(this, e);
        }

        /// <summary>
        /// Zpracování událostí po změně struktury
        /// </summary>
        public event EventHandler SelectedItemIndexChanged;
        /// <summary>
        /// Volá se po přidání struktury do seznamu
        /// </summary>
        public event EventHandler ItemAdded;
        /// <summary>
        /// Volá se po odstranění struktury ze seznamu
        /// </summary>
        public event EventHandler ItemRemoved;
        /// <summary>
        /// Volá se po aktualizaci struktury v seznamu
        /// </summary>
        public event EventHandler ItemRefreshed;

        readonly List<StructureViewEntry> entries = new List<StructureViewEntry>();
        /// <summary>
        /// Seznam načtených struktur
        /// </summary>
        public List<StructureViewEntry> Entries { get => entries; }

        int selectedIndex = -1;
        /// <summary>
        /// Index vybrané struktury
        /// </summary>
        public int SelectedIndex
        {
            get => selectedIndex;
            set
            {
                ThreadService.AssertMainThread();
                if (selectedIndex != value && value != -1)
                    lock (Entries[value].SyncRoot)
                        EnqueueAppend(new AppendCall(Entries[value], Entries[value].StructureID));
            }
        }

        public ToolStrip ToolStrip => toolStrip;

        #region Entry
        /// <summary>
        /// Přidání položky dp zobrazení zpráv.
        /// </summary>
        /// <param name="entry">Přidávaná struktura</param>
        public void AddItem(StructureViewEntry entry)
        {
            if (ThreadService.InvokeRequired)
            {
                ThreadService.SafeThreadAsyncCall((Action<StructureViewEntry>)AddItem, entry);
                return;
            }

            if (entry != null)
            {
                entry.ViewTree = structureViewTree;
                entries.Add(entry);
            }

            OnItemAdded(EventArgs.Empty);
            EnqueueAppend(new AppendCall(entry, entry.StructureID));
        }

        struct AppendCall
        {
            internal readonly StructureViewEntry Entry;
            internal readonly string Text;

            public AppendCall(StructureViewEntry category, string text)
            {
                Entry = category;
                Text = text;
            }
        }

        internal void RemoveFilter()
        {
            Filter(null);
        }

        internal void Filter(string text)
        {
            if (structureViewTree != null)
                structureViewTree.FilterStructure(text);
        }

        readonly object appendLock = new object();
        List<AppendCall> appendCalls = new List<AppendCall>();

        void EnqueueAppend(AppendCall appendCall)
        {
            bool waitForMainThread;
            lock (appendLock)
            {
                appendCalls.Add(appendCall);
                if (appendCalls.Count == 1)
                    ThreadService.SafeThreadAsyncCall(ProcessRefreshItem);
                waitForMainThread = appendCalls.Count > 2000;
            }
            if (waitForMainThread && ThreadService.InvokeRequired)
            {
                int sleepLength = 20;
                do
                {
                    Thread.Sleep(sleepLength);
                    sleepLength += 20;
                    lock (appendLock)
                        waitForMainThread = appendCalls.Count > 2000;
                } while (waitForMainThread);
            }
        }
        void ProcessRefreshItem()
        {
            List<AppendCall> appendCalls;
            lock (appendLock)
            {
                appendCalls = this.appendCalls;
                this.appendCalls = new List<AppendCall>();
            }
            Debug.Assert(appendCalls.Count > 0);
            if (appendCalls.Count == 0)
                return;

            StructureViewEntry newCategory = appendCalls[appendCalls.Count - 1].Entry;
            if (SelectedIndex == -1 || Entries[SelectedIndex] != newCategory)
                SelectItem(newCategory.StructureID);
        }

        /// <summary>
        /// Výběr položky
        /// </summary>
        /// <param name="id">Identifikátor položky</param>
        public void SelectItem(string id)
        {
            for (int i = 0; i < Entries.Count; ++i)
            {
                StructureViewEntry structure = (StructureViewEntry)Entries[i];
                if (structure.StructureID == id)
                {
                    selectedIndex = i;
                    OnSelectedItemIndexChanged(EventArgs.Empty);
                    structureViewTree.SetStructure(structure.Structure);
                    break;
                }
            }
        }

        /// <summary>
        /// Získání kategorie dle názvu
        /// </summary>
        /// <param name="structureID">Název structury</param>
        /// <returns></returns>
        public StructureViewEntry GetStructure(string structureID)
        {
            foreach (StructureViewEntry structure in entries)
                if (structure.StructureID == structureID)
                    return structure;
            return null;
        }

        #endregion

        /// <summary>
        /// Aktualizace aktuálně výbrané struktury
        /// </summary>
        internal void RefreshItem()
        {
            if (selectedIndex != -1
                && selectedIndex < entries.Count)
            {
                entries[selectedIndex].Refresh();
                structureViewTree.SetStructure(entries[selectedIndex].Structure);
            }
            else
            {
                selectedIndex = entries.Count - 1;
                if (selectedIndex != -1)
                    structureViewTree.SetStructure(entries[selectedIndex].Structure);
                else structureViewTree.SetStructure(null);
            }
            DisplayActiveItem();
            OnItemRefreshed();
        }

        /// <summary>
        /// Pokud struktura existuje v seznamu již načtených, 
        /// pak jí vybere, jinak - vytvoří novou
        /// </summary>
        /// <param name="fileName">úplný název souboru</param>
        internal void SetOrCreateItem(string fileName)
        {
            StructureViewEntry sve = new StructureViewEntry(fileName);
            if (entries.Contains(sve, new EntityComparer()))
                SelectItem(sve.StructureID);
            else
                AddItem(sve);
        }

        void DisplayActiveItem()
        {
            ThreadService.DebugAssertMainThread();
            if (selectedIndex < 0)
                structureViewTree.Structure = null;
            else if (entries.Count > 0)
                lock (entries[selectedIndex].SyncRoot)
                {
                    EnqueueAppend(new AppendCall(entries[selectedIndex], entries[selectedIndex].StructureID));
                }
        }
        void ActiveViewContentChanged(object source, EventArgs e)
        {
            ThreadService.SafeThreadAsyncCall(delegate
            {
                if (SimpleDesktop.Desktop.ActiveViewContent is IStructureHost sh)
                    if (sh.StructureEntry != null && (selectedIndex == -1
                        || !entries[SelectedIndex].StructureID.Equals(sh.StructureEntry.StructureID, StringComparison.InvariantCultureIgnoreCase)))
                        SelectItem(sh.StructureEntry.StructureID);
            });
        }
        void OnItemRefreshed()
        {
            ItemRefreshed?.Invoke(this, EventArgs.Empty);
        }

        sealed class EntityComparer : IEqualityComparer<StructureViewEntry>
        {
            /// <summary>
            /// Porovnání dvou struktur
            /// </summary>
            /// <param name="x">Structura jedna</param>
            /// <param name="y">Druhá struktura</param>
            /// <returns></returns>
            public bool Equals(StructureViewEntry x, StructureViewEntry y)
            {
                // zkontrolujeme, zda porovnávané objekty odkazují na stejné data
                if (Object.ReferenceEquals(x, y)) return true;
                // zkontrolujeme, zda nějaký z objektu je NULL
                if (x is null || y is null)
                    return false;

                // zkontrolujeme odkazy na řádky
                return String.Equals(x.StructureID, y.StructureID);
            }

            /// <summary>
            /// Hash kód
            /// </summary>
            /// <param name="obj"></param>
            /// <returns></returns>
            public int GetHashCode(StructureViewEntry obj)
            {
                // zkontrolujeme, zda objekt je NULL nebo obsah není ILineable
                if (obj is null) return 0;

                // získáme hash kód řádku, pokud není NULL.
                return string.IsNullOrEmpty(obj.StructureID) ? 0 : obj.StructureID.GetHashCode();
            }
        }

        /// <summary>
        /// Získání hlavního regionu struktury dle otevřeného souboru
        /// </summary>
        /// <param name="structureID">Otevřený soubor</param>
        /// <returns></returns>
        internal string GetRootRegion(string structureID)
        {
            StructureViewEntry structureViewEntry;
            if (string.IsNullOrEmpty(structureID))
                structureViewEntry = this.ActiveItem;
            else
                structureViewEntry = Entries.FirstOrDefault(entry => entry.StructureID.Equals(structureID, StringComparison.InvariantCultureIgnoreCase));

            return structureViewEntry != null && structureViewEntry.Structure.Root.Children.Count() != 0
                ? structureViewEntry.Structure.Root.Children.First().Name
                : string.Empty;
        }
        /// <summary>
        /// Získání hlavního regionu struktury dle otevřeného souboru
        /// </summary>
        /// <returns></returns>
        internal GFERegion GetRootRegion() => ActiveItem != null && ActiveItem.Structure.Root.Children.Count() != 0
                ? ActiveItem.Structure.Root
                : null;

        /// <summary>
        /// Odstranění aktuální položky ze seznamu
        /// </summary>
        internal void RemoveActive()
        {
            if (selectedIndex != -1)
                entries.RemoveAt(selectedIndex);

            RefreshItem();
            OnItemRemoved(EventArgs.Empty);
        }

        /// <exclude/>
        protected virtual void OnItemRemoved(EventArgs e)
        {
            ItemRemoved?.Invoke(this, e);
        }
    }
}
