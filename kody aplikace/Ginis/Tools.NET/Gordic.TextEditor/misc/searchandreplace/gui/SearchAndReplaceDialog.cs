// <file>
//     <copyright see="prj:///doc/copyright.txt"/>
//     <license see="prj:///doc/license.txt"/>
//     <owner name="Mike Krüger" email="mike@icsharpcode.net"/>
//     <version>$Revision$</version>
// </file>

using System;
using System.Drawing;
using System.Windows.Forms;
using Gordic.TextEditor.Misc.Util;

namespace Gordic.TextEditor.SearchAndReplace
{
    /// <summary>
    /// režimy hledání/nahrazení
    /// </summary>
    public enum SearchAndReplaceMode
    {
        /// <summary>
        /// režim hledání
        /// </summary>
        Search,
        /// <summary>
        /// režim nahrazení
        /// </summary>
        Replace
    }
	/// <summary>
	/// dialogové okno hledání/nahrazení
	/// </summary>
	public class SearchAndReplaceDialog : Form
	{
        /// <summary>
        /// schéma hledání
        /// </summary>
		public static string SearchPattern  = String.Empty;
        /// <summary>
        /// schéma nahrazení
        /// </summary>
		public static string ReplacePattern = String.Empty;

        ToolStripButton searchButton = new ToolStripButton();
        ToolStripButton replaceButton = new ToolStripButton();

		Keys searchKeyboardShortcut = Keys.None;
		Keys replaceKeyboardShortcut = Keys.None;

		static SearchAndReplaceDialog Instance;

        /// <summary>
        /// zobrazení jednoduché insatnce dialogového okna
        /// </summary>
        /// <param name="searchAndReplaceMode">režim zobrazení okna</param>
        public static void ShowSingleInstance(SearchAndReplaceMode searchAndReplaceMode)
        {
            if (Instance != null)
            {
                Instance.Dispose();
                Instance = null;
            }

            Instance = new SearchAndReplaceDialog(searchAndReplaceMode);
            if (SearchReplaceUtilities.TextEditorControl != null)
                Instance.Show(SearchReplaceUtilities.TextEditorControl.FindForm());
            else Instance.Show();
        }
				
		SearchAndReplacePanel searchAndReplacePanel;
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="searchAndReplaceMode">režim dialogu</param>
		public SearchAndReplaceDialog(SearchAndReplaceMode searchAndReplaceMode)
		{
			this.FormBorderStyle = FormBorderStyle.FixedToolWindow;
            this.ShowInTaskbar = false;
            this.TopMost = false;
            this.Text = "Najít a Nahradit";
			this.KeyPreview = true;
            this.Icon = ImageService.BitmapToIcon((Bitmap)ImageService.GetBitmap(this.GetType(), "Icons.16x16.FindIcon.bmp"));

			searchAndReplacePanel = new SearchAndReplacePanel();
			searchAndReplacePanel.Dock = DockStyle.Fill;
			Controls.Add(searchAndReplacePanel);
			
			ToolStrip toolStrip = new ToolStrip();
			toolStrip.Dock = DockStyle.Top;
			toolStrip.Stretch   = true;
			toolStrip.GripStyle = System.Windows.Forms.ToolStripGripStyle.Hidden;

            searchButton.Text = "Najít";
            searchButton.Image = ImageService.GetBitmap(this.GetType(), "Icons.16x16.FindIcon.bmp");
			searchButton.Checked = searchAndReplaceMode == SearchAndReplaceMode.Search;
			searchButton.Click += new EventHandler(SearchButtonClick);
			toolStrip.Items.Add(searchButton);
            replaceButton.Text = "Nahradit";
            replaceButton.Image = ImageService.GetBitmap(this.GetType(), "Icons.16x16.ReplaceIcon.bmp");
			replaceButton.Checked = searchAndReplaceMode == SearchAndReplaceMode.Replace;
			replaceButton.Click += new EventHandler(ReplaceButtonClick);
			toolStrip.Items.Add(replaceButton);
			
			Controls.Add(toolStrip);
			
			SetSearchAndReplaceMode();
			FormLocationHelper.Apply(this, "Gordic.TextEditor.Gui.SearchAndReplaceDialog.Location", false);

            searchKeyboardShortcut = ParseShortcut("Control|F");
            replaceKeyboardShortcut = ParseShortcut("Control|H");
		}
        /// <summary>
        /// analýza klávesových zkrátek
        /// </summary>
        /// <param name="shortcutString">řetězec prezentující zkrátku</param>
        /// <returns>klíč ke zkrátce</returns>
        public static Keys ParseShortcut(string shortcutString)
        {
            Keys shortCut = Keys.None;
            if (shortcutString.Length > 0)
                try
                {
                    foreach (string key in shortcutString.Split('|'))
                        shortCut |= (System.Windows.Forms.Keys)Enum.Parse(typeof(System.Windows.Forms.Keys), key);
                }
                catch (Exception ex)
                {
                    MessageService.ShowError(ex);
                    return System.Windows.Forms.Keys.None;
                }
            return shortCut;
        }

        /// <exclude/>
        protected override void OnClosing(System.ComponentModel.CancelEventArgs e)
        {
            base.OnClosing(e);
            PropertyService.Save();
            if (Instance != null)
                Instance.Dispose();
            Instance = null;
        }
        /// <exclude/>
        protected override void OnKeyDown(KeyEventArgs e)
        {
            if (e.KeyData == Keys.Escape)
                Close();
            else if (searchKeyboardShortcut == e.KeyData && !searchButton.Checked)
                EnableSearchMode(true);
            else if (replaceKeyboardShortcut == e.KeyData && !replaceButton.Checked)
                EnableSearchMode(false);
        }

        void SearchButtonClick(object sender, EventArgs e)
        {
            if (!searchButton.Checked)
                EnableSearchMode(true);
        }
        void ReplaceButtonClick(object sender, EventArgs e)
        {
            if (!replaceButton.Checked)
                EnableSearchMode(false);
        }
		void EnableSearchMode(bool enable)
		{
			searchButton.Checked = enable;
			replaceButton.Checked = !enable;
			SetSearchAndReplaceMode();
			Focus();
		}
        void SetSearchAndReplaceMode()
        {
            searchAndReplacePanel.SearchAndReplaceMode = searchButton.Checked ? SearchAndReplaceMode.Search : SearchAndReplaceMode.Replace;
            this.ClientSize = searchButton.Checked ? new Size(430, 263) : new Size(430, 316);
        }
	}
}
