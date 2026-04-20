//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.LinkedFilesPad.cs                            </Name>
//    <Description> Podložka zobrazující vázané na aktuální sestavu soubory</Description>
//    <Author>      Mgr. Stepan Sukovyč                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Gui;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.LinkedFiles
{
    enum LFNodeType
    {
        file = 0,
        image = 1,
        template = 2,
        directory = 3
    }
    sealed class LFExtNode : AbstractExtTreeNode
    {
        const string nodeContextMenuPath = "/ReportDesigner/Pads/LinkedFiles/NodeContextMenu";
        const string rootContextMenuPath = "/ReportDesigner/Pads/LinkedFiles/RootContextMenu";

        /// <summary>
        /// cesta ke konfigurací kontextového menu
        /// </summary>
        public override string ContextmenuAddinTreePath => Nodes.Count != 0 ? rootContextMenuPath : nodeContextMenuPath;

        string fullName = string.Empty;
        /// <summary>
        /// úplný název
        /// </summary>
        public override string FullName => fullName;

        public LFNodeType Type { get; set; }
        /// <summary>
        /// prázdný konstruktor třídy
        /// </summary>
        private LFExtNode()
        {
        }
        public LFExtNode(string name, LFNodeType type)
            : this()
        {
            fullName = name;
            Text = name.Split(Path.DirectorySeparatorChar).Last();
            Type = type;
        }
        public LFExtNode(OpenedFile primaryFile)
            : this(primaryFile.FileName, LFNodeType.file)
        {
            FileInfo[] files = primaryFile.TemporaryDirectory.GetFiles();
            if (files != null)
                foreach (var item in primaryFile.TemporaryDirectory.GetFiles())
                    // soubor není skrytý
                    if ((item.Attributes & FileAttributes.Hidden) == 0)
                        this.Nodes.Add(new LFExtNode(item.Name, LFNodeType.file));
        }

        internal void UpdateIcons()
        {
            SetIcon(IconService.GetImageForFile(FullName));
            foreach (var item in this.Nodes)
                if (item is LFExtNode)
                    (item as LFExtNode).UpdateIcons();
        }
    }
    /// <summary>
    /// Podložka zobrazující prvek závislý na dokumentu aktuálního poledu
    /// </summary>
    class LinkedFilesPad : AbstractPadContent
    {
        static LinkedFilesPad instance;
        /// <summary>
        /// instance třídy
        /// </summary>
        public static LinkedFilesPad Instance
        {
            get
            {
                if (instance == null)
                    instance = new LinkedFilesPad();

                return instance;
            }
        }
        readonly LinkedFilesPanel lfPanel = new LinkedFilesPanel();
        string lastFileName;
        /// <summary>
        /// seznam vázaných souborů
        /// </summary>
        public List<string> Files => lfPanel != null ? lfPanel.Files : new List<string>();

        /// <summary>
        /// Ovladač obsahu podložky
        /// </summary>
        public override Control Control => lfPanel;

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public LinkedFilesPad()
        {
            instance = this;
            SimpleDesktop.Desktop.ActiveViewContentChanged += dACChanged;
            dACChanged(null, null);
        }

        void dACChanged(object sender, EventArgs e)
        {
            ThreadService.SafeThreadAsyncCall(delegate { selectFile(); });
        }

        void selectFile(IViewContent content = null)
        {
            if (content == null)
                content = SimpleDesktop.Desktop.ActiveViewContent;

            if (content == null)
                return;

            string fileName = content.PrimaryFileName;

            if (string.IsNullOrEmpty(fileName) ||
                (!string.IsNullOrEmpty(lastFileName) && lastFileName.Equals(fileName, StringComparison.InvariantCultureIgnoreCase)))
            {
                lfPanel.SelectFile();
                return;
            }

            if (!FileUtility.IsValidPath(fileName))
                return;

            lastFileName = fileName;
            lfPanel.SelectFile(SimpleDesktop.Desktop.ActiveViewContent, fileName);
        }

        /// <summary>
        /// aktualizace vázaných souborů daného otevřeného souboru sestavy <paramref name="file"/>.
        /// Odstraní všechny větve a dle dočané složky primárního souboru je znovu vytvoři
        /// </summary>
        /// <param name="file">otevřený soubor sestavy</param>
        internal void Refresh(OpenedFile file = null)
        {
            if (file == null)
                file = SimpleDesktop.Desktop.ActiveViewContent.PrimaryFile;

            lfPanel.Refresh(file);
            dACChanged(null, EventArgs.Empty);
        }
        /// <summary>
        /// odstranění vybrané položky
        /// </summary>
        internal void DeleteSelectedItem()
        {
            lfPanel.DeleteSelectedItem(SimpleDesktop.Desktop.ActiveViewContent.PrimaryFile);
            Refresh();
        }
        /// <summary>
        /// vložení souboru
        /// </summary>
        /// <param name="type">typ vkládaného souboru</param>
        internal void AddItem(LFNodeType type = LFNodeType.file)
        {
            lfPanel.AddItem(SimpleDesktop.Desktop.ActiveViewContent.PrimaryFile, type);
            Refresh();
        }
        /// <summary>
        /// stažení vybrané položky
        /// </summary>
        internal void DownloadSelectedItem()
        {
            lfPanel.DownloadSelectedItem(SimpleDesktop.Desktop.ActiveViewContent.PrimaryFile);
        }
    }
}
