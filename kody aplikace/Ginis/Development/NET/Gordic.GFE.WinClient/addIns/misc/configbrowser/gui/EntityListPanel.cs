//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.EntityListPanel.cs                      </Name>
//    <Description> Seznam úzlù                                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-08                                                  </Created>
//  </FileHeader>


using System;
using System.Drawing;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.GFE.WinClient.ConfigBrowser
{
    /// <summary>
    /// Seznam úzlù
    /// </summary>
    class EntityListPanel : Panel
    {
        ListView EntityLV = new ListView();    // zobrazení podrobnosti úzlu
        Label ExtLabel = new Label();	    // zobrazení koncovky názvu
        AddIn currentAddIn = null;

        /// <summary>
        /// Aktuální konfigurace
        /// </summary>
        public AddIn CurrentAddIn
        {
            get { return currentAddIn; }
            set
            {
                currentAddIn = value;
                this.OnCurrentConfigChanged(EventArgs.Empty);
            }
        }

        /// <summary>
        /// Konstruktor tøídou
        /// </summary>
        public EntityListPanel()
        {
            EntityLV.Dock = DockStyle.Fill;
            EntityLV.GridLines = true;
            EntityLV.View = View.Details;
            EntityLV.FullRowSelect = true;
            EntityLV.MultiSelect = false;
            EntityLV.BorderStyle = BorderStyle.FixedSingle;
            EntityLV.SelectedIndexChanged += new EventHandler(EntityLVSelectedIndexChanged);
            EntityLV.Columns.Add(GResources.GetResourceText(29450240), 100, HorizontalAlignment.Left); //RC 29450240 : úzel
            EntityLV.Columns.Add(GResources.GetResourceText(29450241), 175, HorizontalAlignment.Left); //RC 29450241 : identifikátor úzlu/klíè
            EntityLV.Columns.Add(GResources.GetResourceText(29450242), 400, HorizontalAlignment.Left); //RC 29450242 : tøída úzlu/hodnota
            EntityLV.Columns.Add(GResources.GetResourceText(29450244) + " -> " + GResources.GetResourceText(29450243), 600, HorizontalAlignment.Left); //RC 29450244 : podmínky úzlu


            ExtLabel.Text = GResources.GetResourceText(29450245) + ": "; //RC 29450245 : koncovka
            ExtLabel.Dock = DockStyle.Top;
            ExtLabel.FlatStyle = FlatStyle.Flat;
            ExtLabel.TextAlign = ContentAlignment.MiddleLeft;
            ExtLabel.BorderStyle = BorderStyle.FixedSingle;

            Controls.Add(EntityLV);
            Controls.Add(ExtLabel);
        }


        void EntityLVSelectedIndexChanged(object sender, EventArgs e)
        {
            if (EntityLV.SelectedItems.Count != 1)
                return;
            if (!(EntityLV.SelectedItems[0].Tag is Entity c))
                return;

            CurrentAddIn = c.AddIn;
        }
        /// <summary>
        /// uvolnìní seznamu
        /// </summary>
        public void ClearList()
        {
            ExtLabel.Text = GResources.GetResourceText(29450245) + ": "; //RC 29450245 : koncovka
            EntityLV.Items.Clear();
        }
        /// <summary>
        /// seznam úzlù
        /// </summary>
        /// <param name="path">cesta k doplòku</param>
        public void ListEntities(string path)
        {
            EntityLV.Items.Clear();
            if (path == null)
            {
                ExtLabel.Text = GResources.GetResourceText(29450245) + ": "; //RC 29450245 : koncovka
                return;
            }

            ExtLabel.Text = GResources.GetResourceText(29450245) + ": " + path;

            AddInTreeNode node = AddInTree.GetTreeNode(path, false);
            if (node == null) return;
            foreach (Entity c in node.Entities)
            {
                ListViewItem lvi = new ListViewItem(c.Name)
                {
                    Tag = c
                };
                lvi.SubItems.Add(c.Id);
                if (c.Properties.Contains("class"))
                    lvi.SubItems.Add(c.Properties["class"]);
                else
                    lvi.SubItems.Add(c.Properties.Contains("value") ? c.Properties["value"] : "");

                foreach (ICondition condition in c.Conditions)
                    lvi.SubItems.Add(condition.Name + ", " + condition.Action);
                EntityLV.Items.Add(lvi);
            }
        }
        /// <summary>
        /// Seznam úzlù
        /// </summary>
        /// <param name="ext">Cesta</param>
        public void ListEntities(ExtensionPath ext)
        {
            EntityLV.Items.Clear();
            if (ext == null)
            {
                ExtLabel.Text = GResources.GetResourceText(29450245) + ": "; //RC 29450245 : koncovka
                return;
            }
            ListEntities(ext.Name);
        }
        /// <summary>
        /// Reakce na zmìnu doplòku
        /// </summary>
        /// <param name="e">Argument zmìny</param>
        protected virtual void OnCurrentConfigChanged(EventArgs e)
        {
            CurrentConfigChanged?.Invoke(this, e);
        }
        /// <summary>
        /// Volá se po zmìnì doplòku/konfigurace
        /// </summary>
        public event EventHandler CurrentConfigChanged;
    }
}
