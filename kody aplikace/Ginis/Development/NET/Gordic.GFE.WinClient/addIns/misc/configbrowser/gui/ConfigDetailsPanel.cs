//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ConfigDetailsPanel.cs                  </Name>
//    <Description> Panel detailu                                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-08                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Services;
using Gordic.General;

namespace Gordic.GFE.WinClient.ConfigBrowser
{
    /// <summary>
    /// Panel detailu
    /// </summary>
	class ConfigDetailsPanel : Panel
	{
		ListView addInDetailsListView = new ListView();
		Label addInLabel              = new Label();
		
        /// <summary>
        /// Konstruktor panelu
        /// </summary>
		public ConfigDetailsPanel()
		{
			addInDetailsListView.Dock = DockStyle.Fill;
			addInDetailsListView.GridLines = false;
			addInDetailsListView.View = View.Details;
			addInDetailsListView.MultiSelect = false;
			addInDetailsListView.FullRowSelect = true;
			addInDetailsListView.Activation = ItemActivation.OneClick;
			addInDetailsListView.HeaderStyle = ColumnHeaderStyle.None;
			addInDetailsListView.BorderStyle = BorderStyle.FixedSingle;
			addInDetailsListView.ItemActivate += new EventHandler(AddInDetailsListViewItemActivate);
			addInDetailsListView.Columns.Add(GResources.GetResourceText(29450233),100, HorizontalAlignment.Left); //RC 29450233 : vlastnost
			addInDetailsListView.Columns.Add(GResources.GetResourceText(29450234), 500, HorizontalAlignment.Left); //RC 29450234 : hodnota
			Controls.Add(addInDetailsListView);
			
			addInLabel.Dock =DockStyle.Top;
            addInLabel.Text = GResources.GetResourceText(29450235) + ": "; //RC 29450235 : konfigurace
			addInLabel.Font = new Font(addInLabel.Font.FontFamily,addInLabel.Font.Size*2);
			addInLabel.Height = addInLabel.Height*2;
			addInLabel.FlatStyle = FlatStyle.Flat;
			addInLabel.TextAlign = ContentAlignment.MiddleLeft;
			addInLabel.BorderStyle = BorderStyle.FixedSingle;
			Controls.Add(addInLabel);
		}

        void AddInDetailsListViewItemActivate(object sender, EventArgs e)
        {
            Cursor.Current = Cursors.WaitCursor;

            ListViewItem selectedItem = ((ListView)sender).SelectedItems[0];
            if (selectedItem.Name.Equals("filename", StringComparison.OrdinalIgnoreCase))
                FileAgent.OpenFile(selectedItem.SubItems[1].Text, true, false);

            Cursor.Current = Cursors.Default;
        }
        
        /// <summary>
        /// Zobrazení detailu konfigurace
        /// </summary>
        /// <param name="ai"></param>
        public void ShowAddInDetails(AddIn ai)
        {
            addInLabel.Text = GResources.GetResourceText(29450235) + ": " + ai.Properties["name"]; //RC 29450235 : konfigurace
            addInDetailsListView.Items.Clear();

            ListViewItem[] items = new ListViewItem[] 
            {
				new ListViewItem(new string[] { GResources.GetResourceText(29450236), ai.Properties["description"] }), //RC 29450236 : popis
				new ListViewItem(new string[] { GResources.GetResourceText(29450237), ai.FileName}) //RC 29450237 : název souboru
                {
                    Name = "FileName"
                    , Font = new Font(addInDetailsListView.Font, FontStyle.Underline)
                    , ForeColor = Color.Blue
                }
            };

            // nastavení Název souboru a Url øádku na 'weblink' styl
            addInDetailsListView.Items.AddRange(items);

            //if (ai.Version != null && ai.Version.Major != 0)
                //addInDetailsListView.Items.Add(new ListViewItem(new string[] { GResources.GetResourceText(29450238), ai.Version.ToString() })); //RC 29450238 : verze
            if (ai.Properties["version"] != null)
                addInDetailsListView.Items.Add(new ListViewItem(new string[] { GResources.GetResourceText(29450238), ai.Properties["version"] })); //RC 29450238 : verze
        }
	}
}
