//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.InfoSectionViewPad.cs                  </Name>
//    <Description> 'okno' sekce INFO pohledu na sestavu                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-07                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Windows.Forms;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;

namespace Gordic.GFE.WinClient.InfoSectionView
{
    /// <summary>
    /// rozhraní umožňující práci se sekci INFO
    /// </summary>
    interface IInfoSectionHost
    {
        /// <summary>
        /// indikuje možnost editace infosekce
        /// </summary>
        bool ISEnableEdit { get; }
        /// <summary>
        /// Jednotka struktury
        /// </summary>
        InfoSectionViewEntry InfoSectionEntry { get; }
        /// <summary>
        /// reakce na změnu vlastnosti položky INFO sekce
        /// </summary>
        /// <param name="sender">objekt, který spustil událost</param>
        /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
        void OnInfoPropertyChanged(object sender, EventArgs e);
    }
    /// <summary>
    /// 'okno' sekce INFO pohledu na sestavu
    /// </summary>
    class InfoSectionViewPad : AbstractPadContent/*, IHasPropertyContainer*/
    {
        struct AppendCall
        {
            internal readonly InfoSectionViewEntry Entry;
            public AppendCall(InfoSectionViewEntry category) { this.Entry = category; }
        }

        #region AbstractPadContent
        /// <summary>
        /// Ovladač podložky
        /// </summary>
        public override Control Control { get { return padPanel; } }
        #endregion

        //#region IHasPropertyContainer
        ///// <summary>
        ///// kontejner pro práci s vlastnostmi objektů uvnitř záložky
        ///// </summary>
        //public PropertyContainer PropertyContainer { get { return infoSectionViewTree.PropertyContainer; } }
        //#endregion

        #region operace nad atributy
        /// <summary>
        /// odstranění aktuálního atributu
        /// </summary>
        internal void RemoveActiveAttribute()
        {
            //if (infoSectionViewTree != null)
            //    if (infoSectionViewTree.RemoveActiveAttribute())
            //        OnTreeChanged();
            if (attributeView != null)
                if (attributeView.RemoveActiveAttribute())
                    OnTreeChanged();
        }
        ///// <summary>
        ///// vytvoření nového atributu
        ///// </summary>
        //internal void AddAttribute()
        //{
        //    if (infoSectionViewTree != null)
        //        if (infoSectionViewTree.AddAttribute())
        //            OnTreeChanged();
        //}
        #endregion

        /// <summary>
        /// Instance třídy
        /// </summary>
        public static InfoSectionViewPad Instance
        {
            get
            {
                if (instance == null)
                    SimpleDesktop.Desktop.GetPad(typeof(InfoSectionViewPad)).CreatePad();//BringPadToFront(SimpleDesktop.Desktop.DesktopLayout);
                return instance;
            }
        }

        List<InfoSectionViewEntry> entries = new List<InfoSectionViewEntry>();
        /// <summary>
        /// Seznam načtených struktur
        /// </summary>
        public List<InfoSectionViewEntry> Entries { get { return entries; } }
        int selectedIndex = -1;
        Panel padPanel = new Panel();
        //InfoSectionViewTreeControl infoSectionViewTree;
        static InfoSectionViewPad instance;
        ToolStrip toolStrip;
        readonly object appendLock = new object();
        List<AppendCall> appendCalls = new List<AppendCall>();

        InfoSectionAttributeViewControl attributeView;

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        public InfoSectionViewPad()
        {
            instance = this;
            padPanel.SuspendLayout();
            //infoSectionViewTree = new InfoSectionViewTreeControl();
            //infoSectionViewTree.Dock = DockStyle.Fill;

            attributeView = new InfoSectionAttributeViewControl();
            attributeView.Dock = DockStyle.Fill;

            toolStrip = ToolbarService.CreateToolStrip(this, "/ReportDesigner/Pads/InfoSectionView/Toolbar");
            toolStrip.Stretch = true;
            toolStrip.GripStyle = System.Windows.Forms.ToolStripGripStyle.Hidden;

            padPanel.Controls.AddRange(new Control[] { /*infoSectionViewTree,*/ attributeView, toolStrip });
            padPanel.ResumeLayout(false);
            DisplayActiveItem();
            SimpleDesktop.Desktop.ActiveViewContentChanged += ActiveViewContentChanged;
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
                if (attributeView != null)
                {
                    attributeView.Dispose();
                    attributeView = null;
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
        /// Výběr položky
        /// </summary>
        /// <param name="infoSectionViewEntry">Identifikátor položky</param>
        public void SelectItem(InfoSectionViewEntry infoSectionViewEntry)
        {
            if (infoSectionViewEntry == null)
            {
                selectedIndex = -1;
                //infoSectionViewTree.SetSection(infoSectionViewEntry);
                attributeView.SetSection(infoSectionViewEntry);
            }
            else
            {
                if (!entries.Exists(entr => entr.Equals(infoSectionViewEntry)))
                    entries.Add(infoSectionViewEntry);

                selectedIndex = entries.FindIndex(info => info.Equals(infoSectionViewEntry));
                if (selectedIndex != -1)
                {
                    //infoSectionViewTree.SetSection(infoSectionViewEntry);
                    attributeView.SetSection(infoSectionViewEntry);
                }
            }
        }
        /// <summary>
        /// uložení sekce INFO do větve <paramref name="xmlFormat"/> dokumentu <paramref name="xmlDoc"/>.
        /// </summary>
        /// <param name="xmlDoc">Výsledný dokument sestavy</param>
        /// <param name="xmlFormat">Větev, do které se sekce vkládá</param>
        /// <param name="openedFile">otevřený soubor sestavy</param>
        internal static bool SetInfoSection(XmlDocumentPosition xmlDoc, System.Xml.XmlElement xmlFormat, OpenedFile openedFile)
        {
            InfoSectionViewEntry entry = Instance.Entries.FirstOrDefault(entr => entr.File == openedFile);
            if (entry != null)
            {
                foreach (var item in entry.AttrList)
                {
                    XmlElement xmlNode = xmlDoc.CreateElement("info", xmlFormat.NamespaceURI);
                    string key = CommonService.NormalizeKey(item.Key);
                    if (xmlNode.Attributes.GetNamedItem(key) == null)
                    {
                        xmlNode.SetAttribute(key, item.Value);
                        xmlFormat.AppendChild(xmlNode);
                    }
                }
                return true;
            }
            return false;
        }

        /// <summary>
        /// aktualizace položek stromu dle sekce INFO
        /// </summary>
        /// <param name="info">jednotka, položky které potřebují aktualizacis</param>
        /// <param name="file">otevřený soubor sestavy</param>
        /// <param name="xmlData">aktuální obsah souboru</param>
        internal void RefreshInfoSection(InfoSectionViewEntry info, OpenedFile file, string xmlData)
        {
            InfoSectionViewEntry.GetOrCreate(ref info, file, xmlData);
            SelectItem(info);
        }

        /// <summary>
        /// volá se po změně stromu atributů
        /// </summary>
        public static event EventHandler TreeChanged;

        void OnTreeChanged()
        {
            if (TreeChanged != null)
                TreeChanged(this, EventArgs.Empty);
        }
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

            InfoSectionViewEntry newCategory = appendCalls[appendCalls.Count - 1].Entry;
            if (selectedIndex == -1 || entries[selectedIndex] != newCategory)
                SelectItem(newCategory);
        }
        void DisplayActiveItem()
        {
            ThreadService.DebugAssertMainThread();
            if (selectedIndex < 0)
            {
                //infoSectionViewTree.InfoSection = null;
                attributeView.InfoSection = null;
            }
            else if (entries.Count > 0)
                lock (entries[selectedIndex].SyncRoot)
                    EnqueueAppend(new AppendCall(entries[selectedIndex]));
        }
        void ActiveViewContentChanged(object source, EventArgs e)
        {
            IInfoSectionHost sh = SimpleDesktop.Desktop.ActiveViewContent as IInfoSectionHost;
            if (sh != null)
            {
                if (sh.InfoSectionEntry != null
                    && (selectedIndex == -1
                    || !entries[selectedIndex].Equals(sh.InfoSectionEntry)))
                    SelectItem(sh.InfoSectionEntry);

                //infoSectionViewTree.Enabled = sh.ISEnableEdit;
                attributeView.Enabled = sh.ISEnableEdit;
            }
            else SelectItem(null);
        }
    }
}
