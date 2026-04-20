//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ConfigBrowserViewContent.cs            </Name>
//    <Description> Pohled prùzkumníka                                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-08                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.General;
using Gordic.GFE.Parsers.Binding;

namespace Gordic.GFE.WinClient.ConfigBrowser
{
    /// <summary>
    /// Pohled prùzkumníka
    /// </summary>
    class ConfigBrowserViewContent : DefaultAbstractViewContent
    {
        Control control = null;
        #region DefaultAbstractViewContent
        /// <summary>
        /// Ovladaè pohledu
        /// </summary>
        public override object Control { get { return control; } }
        /// <summary>
        /// Indikuje, že pohled je pouze pro ètení
        /// </summary>
        public override bool IsViewOnly { get { return true; } }
        /// <summary>
        /// uvolnìní objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnìní objektu</param>
        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);

            if (disposing)
            {
                if (control != null)
                {
                    control.Dispose();
                    control = null;
                }
                if (addInDetailsPanel != null)
                {
                    addInDetailsPanel.Dispose();
                    addInDetailsPanel = null;
                }
                if (entityListPanel != null)
                {
                    entityListPanel.Dispose();
                    entityListPanel = null;
                }
            }
        }
        #endregion

        ConfigDetailsPanel addInDetailsPanel = new ConfigDetailsPanel();
        EntityListPanel entityListPanel = new EntityListPanel();

        /// <summary>
        /// Vytvoøení pohledu
        /// </summary>
        public ConfigBrowserViewContent()
            : base()
        {
            this.TitleName = GResources.GetResourceText(29450247); //RC 29450247 : prùzkumník konfigurace

            Panel p = new Panel
            {
                Dock = DockStyle.Fill,
                BorderStyle = BorderStyle.FixedSingle
            };

            Panel RightPanel = new Panel
            {
                Dock = DockStyle.Fill
            };
            p.Controls.Add(RightPanel);

            entityListPanel.Dock = DockStyle.Fill;
            entityListPanel.CurrentConfigChanged += new EventHandler(EntityListPanelCurrentAddinChanged);
            RightPanel.Controls.Add(entityListPanel);

            Splitter hs = new Splitter
            {
                Dock = DockStyle.Top
            };
            RightPanel.Controls.Add(hs);

            addInDetailsPanel.Dock = DockStyle.Top;
            addInDetailsPanel.Height = 175;
            RightPanel.Controls.Add(addInDetailsPanel);

            Splitter s1 = new Splitter
            {
                Dock = DockStyle.Left
            };
            p.Controls.Add(s1);

            ConfigTreeView addinTreeView = new ConfigTreeView
            {
                Dock = DockStyle.Fill
            };
            addinTreeView.treeView.AfterSelect += new TreeViewEventHandler(this.TvSelectHandler);

            StructureTreeView treeTreeView = new StructureTreeView
            {
                Dock = DockStyle.Fill
            };
            treeTreeView.treeView.AfterSelect += new TreeViewEventHandler(this.TvSelectHandler);

            TabControl tab = new TabControl
            {
                Width = 300,
                Dock = DockStyle.Left
            };

            TabPage tabPage2 = new TabPage(GResources.GetResourceText(29450248))
            {
                Dock = DockStyle.Left
            }; //RC 29450248 : strom aplikace
            tabPage2.Controls.Add(treeTreeView);
            tab.TabPages.Add(tabPage2);

            TabPage tabPage = new TabPage(GResources.GetResourceText(29450235))
            {
                Dock = DockStyle.Left
            }; //RC 29450235 : konfigurace
            tabPage.Controls.Add(addinTreeView);
            tab.TabPages.Add(tabPage);

            p.Controls.Add(tab);

            this.control = p;
            this.TitleName = GResources.GetResourceText(29450247); //RC 29450247 : prùzkumník konfigurace
        }

        void EntityListPanelCurrentAddinChanged(object sender, EventArgs e)
        {
            addInDetailsPanel.ShowAddInDetails(entityListPanel.CurrentAddIn);
        }

        public void TvSelectHandler(object sender, TreeViewEventArgs e)
        {
            if (e.Node.Tag == null)
            {
                entityListPanel.ClearList();
                return;
            }

            TreeNode tn = e.Node;
            object o = e.Node.Tag;
            if (o is AddIn _AddIn)
            {
                addInDetailsPanel.ShowAddInDetails(_AddIn);
                if (tn.FirstNode != null)
                    entityListPanel.ListEntities((ExtensionPath)tn.FirstNode.Tag);
                else
                    entityListPanel.ClearList();
            }
            else
            {
                ExtensionPath ext = (ExtensionPath)o;
                if (!(tn.Parent.Tag is AddIn addIn))
                    entityListPanel.ListEntities(ext.Name);
                else
                {
                    addInDetailsPanel.ShowAddInDetails(addIn);
                    entityListPanel.ListEntities(ext);
                }
            }
        }
    }
}
