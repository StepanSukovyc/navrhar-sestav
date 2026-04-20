//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.EditorSideBar.cs                         </Name>
//    <Description> Okno nástrojů, které se zobrazí pro grafický editor editor  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Xml;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Base.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Internal.Templates;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Okno nástrojů, které se zobrazí pro grafický editor editor
    /// </summary>
    public sealed class GraphicEditorSideBar : ReportDesignerSideBar
    {
        string userConfigFileName;
        /// <summary>
        /// Vytvoření nvé instance třídy
        /// </summary>
        public GraphicEditorSideBar() { }

        /// <summary>
        /// inicializace editoru
        /// </summary>
        /// <param name="type">typ objektů editoru</param>
        /// <param name="userConfigFileName">název (zkrácený) uživatelských objektů</param>
        /// <returns></returns>
        public GraphicEditorSideBar Initialize(string type, string userConfigFileName)
        {
            this.userConfigFileName = userConfigFileName;
            foreach (ComponentTemplate template in ComponentTemplate.ComponentTemplates)
                if (template.GetAttribute("type") == type)
                {
                    SideTab tab = new SideTab(this, template.Name);
                    tab.DisplayName = StringParser.Parse(tab.Name);
                    tab.CanSaved = false;
                    foreach (ComponentTemplateEntry entry in template.Entries)
                        tab.Items.Add(SideTabItemFactory.CreateSideTabItem(entry));
                    tab.CanBeDeleted = tab.CanDragDrop = false;
                    Tabs.Add(tab);
                }

            if (!string.IsNullOrEmpty(userConfigFileName))
                try
                {
                    XmlDocument doc = new XmlDocument();
                    doc.Load(FileUtility.Combine(PropertyService.ConfigDirectory, userConfigFileName));
                    if (doc.DocumentElement.GetAttribute("version") == "1.0")
                        LoadSideBarConfig(doc.DocumentElement["SideBar"]);
                }
                catch (FileNotFoundException)
                {
                    // nezobrazuje upozornění, pokud soubor boční lišty neexistuje
                }
                catch (Exception ex) { MessageService.ShowWarning(ex.ToString()); }

            if (ActiveTab == null && Tabs.Count != 0)
                ActiveTab = Tabs[0];

            SimpleDesktop.DesktopUnloaded += delegate { SaveSideBarViewConfig(); };
            return this;
        }

        /// <summary>
        /// Uložení konfigurace boční lišty
        /// </summary>
        public void SaveSideBarViewConfig()
        {
            if (!string.IsNullOrEmpty(userConfigFileName))
            {
                XmlDocument doc = new XmlDocument();
                doc.LoadXml("<SideBarConfig version=\"1.0\"/>");
                doc.DocumentElement.AppendChild(WriteConfig(doc));

                FileUtility.ObservedSave(new NamedFileOperationDelegate(doc.Save),
                                         FileUtility.Combine(PropertyService.ConfigDirectory, userConfigFileName),
                                         FileErrorPolicy.ProvideAlternative, false);
            }
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
                if (tab.CanSaved)
                {
                    XmlElement child = doc.CreateElement("SideTab");
                    child.SetAttribute("text", tab.Name);

                    foreach (SideTabItem item in tab.Items)
                    {
                        XmlElement itemChild = doc.CreateElement("SideTabItem");

                        itemChild.SetAttribute("text", item.Name);
                        itemChild.SetAttribute("value", item.Tag.ToString());

                        child.AppendChild(itemChild);
                    }
                    el.AppendChild(child);
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
    }
}
