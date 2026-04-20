//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TextEditorSideBar.cs                   </Name>
//    <Description> Okno nástrojů, které se zobrazí pro textový editor          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-08                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Internal.Templates;
using Gordic.GFE.Parsers.Gui;
using Gordic.General;
using Gordic.GFE.WinClient.StructureView;
using System.Collections.Generic;
using System.Linq;
using Gordic.GFE.WinClient.Base.Gui;

namespace Gordic.GFE.WinClient.DefaultEditor
{
    /// <summary>
    /// Okno nástrojů, které se zobrazí pro textový editor
    /// </summary>
    sealed class EditorSideBar : ReportDesignerSideBar
    {
        static EditorSideBar instance;
        /// <summary>
        /// Instance dané třídy
        /// </summary>
        public static EditorSideBar Instance
        {
            get
            {
                ThreadService.AssertMainThread();
                if (instance == null)
                {
                    instance = new EditorSideBar();
                    instance.Initialize();
                }
                return instance;
            }
        }

        SideTab clipboardRing;

        /// <summary>
        /// Vytvoření nvé instance třídy
        /// </summary>
        private EditorSideBar() { }

        private void Initialize()
        {
            foreach (TextTemplate template in TextTemplate.TextTemplates)
            {
                SideTab tab = new SideTab(this, template.Name);
                tab.DisplayName = StringParser.Parse(tab.Name);
                tab.CanSaved = false;
                foreach (TextTemplate.Entry entry in template.Entries)
                    tab.Items.Add(SideTabItemFactory.CreateSideTabItem(entry.Display, entry.Value));
                tab.CanBeDeleted = tab.CanDragDrop = false;
                Tabs.Add(tab);
            }

            try
            {
                XmlDocument doc = new XmlDocument();

                doc.Load(FileUtility.Combine(PropertyService.ConfigDirectory, "USR-SideBarConfig.xml"));
                if (doc.DocumentElement.GetAttribute("version") != "1.0")
                    GenerateStandardSideBar();
                else
                    LoadSideBarConfig(doc.DocumentElement["SideBar"]);
            }
            catch (FileNotFoundException)
            {
                // nezobrazuje upozornění, pokud boční lišta souboru neexistuje
                GenerateStandardSideBar();
            }
            catch (Exception ex)
            {
                MessageService.ShowWarning(ex.ToString());
                GenerateStandardSideBar();
            }

            SimpleDesktop.DesktopUnloaded += delegate { SaveSideBarViewConfig(); };
            StructureViewPad.Instance.SelectedItemIndexChanged += Instance_SelectedItemIndexChanged;
            StructureViewPad.Instance.ItemRefreshed += Instance_ItemRefreshed;
            Instance_ItemRefreshed(StructureViewPad.Instance, EventArgs.Empty);
        }

        private void Instance_ItemRefreshed(object sender, EventArgs e)
        {
            if (sender is StructureViewPad svp && svp.ActiveItem != null && svp.ActiveItem.Structure != null)
                LoadTemplates(svp.ActiveItem.StructureID, svp.ActiveItem.Structure.Templates);
        }

        private void Instance_SelectedItemIndexChanged(object sender, EventArgs e)
        {
            if (sender is StructureViewPad svp && svp.ActiveItem != null && svp.ActiveItem.Structure != null)
                LoadTemplates(svp.ActiveItem.StructureID, svp.ActiveItem.Structure.Templates);
        }

        void LoadTemplates(string id, List<GFETemplate> templates)
        {
            if (templates == null)
                return;

            SideTab tab = new SideTab(this, id)
            {
                DisplayName = StringParser.Parse(id),
                CanBeDeleted = false,
                CanDragDrop = false
            };

            foreach (GFETemplate template in templates)
                tab.Items.Add(SideTabItemFactory.CreateSideTabItem(template));

            SideTab tb = Tabs.FirstOrDefault(itm => itm != null && itm.DisplayName != null && itm.DisplayName.Equals(id));
            while (tb != null)
            {
                Tabs.Remove(tb);
                tb = Tabs.FirstOrDefault(itm => itm != null && itm.DisplayName != null && itm.DisplayName.Equals(id));
            }

            Tabs.Add(tab);
            ActiveTab = tab;
            Refresh();
        }

        void GenerateStandardSideBar()
        {
            clipboardRing = new SideTab(this, GResources.GetResourceText(29450200)); //RC 29450200 : Schránka
            clipboardRing.DisplayName = StringParser.Parse(clipboardRing.Name);
            clipboardRing.CanBeDeleted = false;
            clipboardRing.CanDragDrop = false;
            this.Tabs.Add(clipboardRing);
            this.ActiveTab = clipboardRing;
        }
        /// <summary>
        /// Vložení textu do schránky
        /// </summary>
        /// <param name="text">Vkládaný text</param>
        public void PutInClipboardRing(string text)
        {
            if (clipboardRing != null)
            {
                string shortenedText = text.Trim();
                if (shortenedText.Length > 50)
                    shortenedText = shortenedText.Substring(0, 47) + "...";
                clipboardRing.Items.Add(GResources.GetResourceText(29450201) + ':' + shortenedText, text); //RC 29450201 : Text
                if (clipboardRing.Items.Count > 20)
                    clipboardRing.Items.RemoveAt(0);
            }
            Refresh();
        }
        /// <summary>
        /// Uložení konfigurace boční lišty
        /// </summary>
        public void SaveSideBarViewConfig()
        {
            XmlDocument doc = new XmlDocument();
            doc.LoadXml("<SideBarConfig version=\"1.0\"/>");
            doc.DocumentElement.AppendChild(WriteConfig(doc));

            FileUtility.ObservedSave(new NamedFileOperationDelegate(doc.Save),
                                     FileUtility.Combine(PropertyService.ConfigDirectory, "USR-SideBarConfig.xml"),
                                     FileErrorPolicy.ProvideAlternative, false);
        }

        void LoadSideBarConfig(XmlElement el)
        {
            foreach (XmlElement sideTabEl in el.ChildNodes)
            {
                SideTab tab = new SideTab(this, sideTabEl.GetAttribute("text"));
                tab.DisplayName = StringParser.Parse(tab.Name);
                if (tab.Name == el.GetAttribute("activetab"))
                    ActiveTab = tab;
                else if (ActiveTab == null)
                    ActiveTab = tab;

                foreach (XmlElement sideTabItemEl in sideTabEl.ChildNodes)
                    tab.Items.Add(SideTabItemFactory.CreateSideTabItem(sideTabItemEl.GetAttribute("text"),
                                                                       sideTabItemEl.GetAttribute("value")));

                if (sideTabEl.GetAttribute("clipboardring") == "true")
                {
                    tab.CanBeDeleted = false;
                    tab.CanDragDrop = false;
                    tab.Name = GResources.GetResourceText(29450200); //RC 29450200 : Schránka
                    tab.DisplayName = StringParser.Parse(tab.Name);
                    clipboardRing = tab;
                }

                Tabs.Add(tab);
            }
        }

        XmlElement WriteConfig(XmlDocument doc)
        {
            if (doc == null)
                throw new ArgumentNullException("doc");
            XmlElement el = doc.CreateElement("SideBar");
            el.SetAttribute("activetab", ActiveTab.Name);

            foreach (SideTab tab in Tabs)
            {
                if (tab.CanSaved)
                {
                    XmlElement child = doc.CreateElement("SideTab");

                    if (tab == clipboardRing)
                        child.SetAttribute("clipboardring", "true");

                    child.SetAttribute("text", tab.Name);

                    foreach (SideTabItem item in tab.Items)
                    {
                        XmlElement itemChild = doc.CreateElement("SideTabItem");

                        itemChild.SetAttribute("text", item.Name);
                        if (item.Tag != null)
                            itemChild.SetAttribute("value", item.Tag.ToString());

                        child.AppendChild(itemChild);
                    }
                    el.AppendChild(child);
                }
            }

            return el;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // EditorSideBar
            // 
            this.Name = "EditorSideBar";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="disposing"></param>
        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            if (disposing)
            {
                StructureViewPad.Instance.SelectedItemIndexChanged -= Instance_SelectedItemIndexChanged;
                StructureViewPad.Instance.ItemRefreshed -= Instance_ItemRefreshed;
            }
        }

    }
}
