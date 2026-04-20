//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.XPathQueryControl.cs                   </Name>
//    <Description> Ovladač XPath příkazů                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Windows.Forms;
using System.Xml;
using System.Xml.XPath;
using Gordic.GFE.Parsers.DefaultEditor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.XmlEditor;
using Gordic.GFE.WinClient.XmlEditor.Gui.Editor;
using Gordic.GFE.WinClient.XPath;
using Gordic.TextEditor;
using Gordic.TextEditor.Document;
using Gordic.General;

namespace Gordic.GFE.WinClient.XPathQuery
{
    /// <summary>
    /// Ovladač XPath příkazů
    /// </summary>
    class XPathQueryControl : System.Windows.Forms.UserControl, IMementoCapable
    {
        const int ErrorImageIndex = 0;
        const string NamespacesProperty = "Namespaces";
        const string PrefixColumnWidthProperty = "NamespacesDataGridView.PrefixColumn.Width";
        const string MatchColumnWidthProperty = "XPathResultsListView.MatchColumn.Width";
        const string LineColumnWidthProperty = "XPathResultsListView.LineColumn.Width";
        const string XPathComboBoxTextProperty = "XPathQuery.LastQuery";
        const string XPathComboBoxItemsProperty = "XPathQuery.History";

        /// <summary>
        /// Název souboru, nad kterým byl proveden poslední dotaz.
        /// </summary>
        string fileName = String.Empty;

        /// <summary>
        /// Celkový počet XPath dotazů pro pamatování
        /// </summary>
        const int xpathQueryHistoryLimit = 20;

        bool ignoreXPathTextChanges;

        enum MoveCaret
        {
            ByJumping = 1,
            ByScrolling = 2
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public XPathQueryControl()
        {
            InitializeComponent();
            InitStrings();
            InitImageList();
            xPathComboBox.KeyDown += XPathComboBoxKeyDown;
        }

        /// <summary>
        /// Přidání namespace do seznamu namespace.
        /// </summary>
        /// <param name="prefix">Prefix</param>
        /// <param name="uri">URI</param>
        public void AddNamespace(string prefix, string uri)
        {
            namespacesDataGridView.Rows.Add(new object[] { prefix, uri });
        }

        /// <summary>
        /// Kolekce v3ech namespace pouze pro čtení.
        /// </summary>
        public ReadOnlyCollection<XmlNamespace> GetNamespaces()
        {
            List<XmlNamespace> namespaces = new List<XmlNamespace>();
            for (int i = 0; i < namespacesDataGridView.Rows.Count - 1; ++i)
            {
                DataGridViewRow row = namespacesDataGridView.Rows[i];
                string prefix = GetPrefix(row);
                string uri = GetNamespace(row);
                if (prefix.Length != 0 || uri.Length != 0)
                    namespaces.Add(new XmlNamespace(prefix, uri));
            }
            return new ReadOnlyCollection<XmlNamespace>(namespaces);
        }

        /// <summary>
        /// Tabulka namespace
        /// </summary>
        public DataGridView NamespacesDataGridView
        {
            get
            {
                return namespacesDataGridView;
            }
        }
        /// <summary>
        /// Pohled na výsledky příkazu
        /// </summary>
        public ListView XPathResultsListView
        {
            get
            {
                return xPathResultsListView;
            }
        }
        /// <summary>
        /// Rozbalovací seznam
        /// </summary>
        public ComboBox XPathComboBox
        {
            get
            {
                return xPathComboBox;
            }
        }

        /// <summary>
        /// Vytvoření vlastnosti objektu popisujici aktuální stav
        /// </summary>
        public Property CreateMemento()
        {
            Property properties = new Property();

            // uložíme namespace.
            properties.Set(NamespacesProperty, GetNamespaceStringArray());

            // uložíme šířku sloupců tabulky namespace.
            properties.Set<int>(PrefixColumnWidthProperty, prefixColumn.Width);

            // uložíme šířku sloupců tabulky výsledků.
            properties.Set<int>(MatchColumnWidthProperty, matchColumnHeader.Width);
            properties.Set<int>(LineColumnWidthProperty, lineColumnHeader.Width);

            // histrie dotazů.
            properties.Set(XPathComboBoxTextProperty, XPathComboBox.Text);
            properties.Set(XPathComboBoxItemsProperty, GetXPathHistory());

            return properties;
        }

        /// <summary>
        /// Nastavení ovladače dle uloženého stavu.
        /// </summary>
        /// <param name="memento">Vlastnosti popisující stav objektu</param>
        public void SetMemento(Property memento)
        {
            ignoreXPathTextChanges = true;

            try
            {
                // nastavení namespace.
                string[] namespaces = memento.Get(NamespacesProperty, new string[0]);
                foreach (string ns in namespaces)
                {
                    XmlNamespace xmlNamespace = XmlNamespace.FromString(ns);
                    AddNamespace(xmlNamespace.Prefix, xmlNamespace.Uri);
                }

                // nastavení šířky sloupců tabulky namespace.
                prefixColumn.Width = memento.Get<int>(PrefixColumnWidthProperty, 50);

                // nastavení šířky sloupců XPath.
                matchColumnHeader.Width = memento.Get<int>(MatchColumnWidthProperty, 432);
                lineColumnHeader.Width = memento.Get<int>(LineColumnWidthProperty, 60);

                // nastavení historii příkazů.
                XPathComboBox.Text = memento.Get(XPathComboBoxTextProperty, String.Empty);
                string[] xpaths = memento.Get(XPathComboBoxItemsProperty, new string[0]);
                foreach (string xpath in xpaths)
                    xPathComboBox.Items.Add(xpath);
            }
            finally { ignoreXPathTextChanges = false; }
        }

        /// <summary>
        /// Volá se po změně aktivního okna.
        /// </summary>
        public void ActiveWindowChanged()
        {
            UpdateQueryButtonState();
        }

        /// <summary>
        /// Odstranění všech XPath značek úzlů ve všech otevřených dokumentech.
        /// </summary>
        public void RemoveXPathNodeTextMarkers()
        {
            foreach (IViewContent view in SimpleDesktop.Desktop.ViewContentCollection)
            {
                if (view is ITextEditorControlProvider textEditorProvider)
                {
                    XPathNodeTextMarker.RemoveMarkers(textEditorProvider.TextEditorControl.Document.MarkerStrategy);
                    textEditorProvider.TextEditorControl.Refresh();
                }
            }
        }

        /// <exclude/>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
                if (components != null)
                   components.Dispose();
            base.Dispose(disposing);
        }

        #region Forms Designer generated code

        /// <summary>
        /// Designer variable used to keep track of non-visual components.
        /// </summary>
        System.ComponentModel.IContainer components = null;

        /// <summary>
        /// This method is required for Windows Forms designer support.
        /// Do not change the method contents inside the source code editor. The Forms designer might
        /// not be able to load this method if it was changed manually.
        /// </summary>
        void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(XPathQueryControl));
            this.xPathLabel = new System.Windows.Forms.Label();
            this.xPathComboBox = new System.Windows.Forms.ComboBox();
            this.queryButton = new System.Windows.Forms.Button();
            this.tabControl = new System.Windows.Forms.TabControl();
            this.xPathResultsTabPage = new System.Windows.Forms.TabPage();
            this.xPathResultsListView = new System.Windows.Forms.ListView();
            this.matchColumnHeader = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.lineColumnHeader = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.imageList = new System.Windows.Forms.ImageList(this.components);
            this.namespacesTabPage = new System.Windows.Forms.TabPage();
            this.namespacesDataGridView = new System.Windows.Forms.DataGridView();
            this.prefixColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.namespaceColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.tabControl.SuspendLayout();
            this.xPathResultsTabPage.SuspendLayout();
            this.namespacesTabPage.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.namespacesDataGridView)).BeginInit();
            this.SuspendLayout();
            // 
            // xPathLabel
            // 
            resources.ApplyResources(this.xPathLabel, "xPathLabel");
            this.xPathLabel.Name = "xPathLabel";
            // 
            // xPathComboBox
            // 
            resources.ApplyResources(this.xPathComboBox, "xPathComboBox");
            this.xPathComboBox.FormattingEnabled = true;
            this.xPathComboBox.Name = "xPathComboBox";
            this.xPathComboBox.TextChanged += new System.EventHandler(this.XPathComboBoxTextChanged);
            this.xPathComboBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.XPathComboBoxKeyDown);
            // 
            // queryButton
            // 
            resources.ApplyResources(this.queryButton, "queryButton");
            this.queryButton.Name = "queryButton";
            this.queryButton.UseVisualStyleBackColor = true;
            this.queryButton.Click += new System.EventHandler(this.QueryButtonClick);
            // 
            // tabControl
            // 
            resources.ApplyResources(this.tabControl, "tabControl");
            this.tabControl.Controls.Add(this.xPathResultsTabPage);
            this.tabControl.Controls.Add(this.namespacesTabPage);
            this.tabControl.Name = "tabControl";
            this.tabControl.SelectedIndex = 0;
            // 
            // xPathResultsTabPage
            // 
            this.xPathResultsTabPage.Controls.Add(this.xPathResultsListView);
            resources.ApplyResources(this.xPathResultsTabPage, "xPathResultsTabPage");
            this.xPathResultsTabPage.Name = "xPathResultsTabPage";
            this.xPathResultsTabPage.UseVisualStyleBackColor = true;
            // 
            // xPathResultsListView
            // 
            this.xPathResultsListView.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.matchColumnHeader,
            this.lineColumnHeader});
            resources.ApplyResources(this.xPathResultsListView, "xPathResultsListView");
            this.xPathResultsListView.FullRowSelect = true;
            this.xPathResultsListView.HideSelection = false;
            this.xPathResultsListView.MultiSelect = false;
            this.xPathResultsListView.Name = "xPathResultsListView";
            this.xPathResultsListView.SmallImageList = this.imageList;
            this.xPathResultsListView.UseCompatibleStateImageBehavior = false;
            this.xPathResultsListView.View = System.Windows.Forms.View.Details;
            this.xPathResultsListView.ItemActivate += new System.EventHandler(this.XPathResultsListViewItemActivate);
            this.xPathResultsListView.SelectedIndexChanged += new System.EventHandler(this.XPathResultsListViewSelectedIndexChanged);
            this.xPathResultsListView.Click += new System.EventHandler(this.XPathResultsListViewClick);
            // 
            // matchColumnHeader
            // 
            resources.ApplyResources(this.matchColumnHeader, "matchColumnHeader");
            // 
            // lineColumnHeader
            // 
            resources.ApplyResources(this.lineColumnHeader, "lineColumnHeader");
            // 
            // imageList
            // 
            this.imageList.ColorDepth = System.Windows.Forms.ColorDepth.Depth32Bit;
            resources.ApplyResources(this.imageList, "imageList");
            this.imageList.TransparentColor = System.Drawing.Color.Transparent;
            // 
            // namespacesTabPage
            // 
            this.namespacesTabPage.Controls.Add(this.namespacesDataGridView);
            resources.ApplyResources(this.namespacesTabPage, "namespacesTabPage");
            this.namespacesTabPage.Name = "namespacesTabPage";
            this.namespacesTabPage.UseVisualStyleBackColor = true;
            // 
            // namespacesDataGridView
            // 
            this.namespacesDataGridView.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.namespacesDataGridView.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.prefixColumn,
            this.namespaceColumn});
            resources.ApplyResources(this.namespacesDataGridView, "namespacesDataGridView");
            this.namespacesDataGridView.MultiSelect = false;
            this.namespacesDataGridView.Name = "namespacesDataGridView";
            this.namespacesDataGridView.ShowEditingIcon = false;
            // 
            // prefixColumn
            // 
            resources.ApplyResources(this.prefixColumn, "prefixColumn");
            this.prefixColumn.Name = "prefixColumn";
            // 
            // namespaceColumn
            // 
            this.namespaceColumn.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.Fill;
            resources.ApplyResources(this.namespaceColumn, "namespaceColumn");
            this.namespaceColumn.Name = "namespaceColumn";
            // 
            // XPathQueryControl
            // 
            resources.ApplyResources(this, "$this");
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.tabControl);
            this.Controls.Add(this.queryButton);
            this.Controls.Add(this.xPathComboBox);
            this.Controls.Add(this.xPathLabel);
            this.Name = "XPathQueryControl";
            this.tabControl.ResumeLayout(false);
            this.xPathResultsTabPage.ResumeLayout(false);
            this.namespacesTabPage.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.namespacesDataGridView)).EndInit();
            this.ResumeLayout(false);

        }
        private System.Windows.Forms.ImageList imageList;
        private System.Windows.Forms.DataGridViewTextBoxColumn namespaceColumn;
        private System.Windows.Forms.DataGridViewTextBoxColumn prefixColumn;
        private System.Windows.Forms.DataGridView namespacesDataGridView;
        private System.Windows.Forms.ColumnHeader lineColumnHeader;
        private System.Windows.Forms.ColumnHeader matchColumnHeader;
        private System.Windows.Forms.ListView xPathResultsListView;
        private System.Windows.Forms.TabPage namespacesTabPage;
        private System.Windows.Forms.TabPage xPathResultsTabPage;
        private System.Windows.Forms.TabControl tabControl;
        private System.Windows.Forms.Button queryButton;
        private System.Windows.Forms.ComboBox xPathComboBox;
        private System.Windows.Forms.Label xPathLabel;

        #endregion

        void XPathComboBoxTextChanged(object sender, EventArgs e)
        {
            if (!ignoreXPathTextChanges)
                UpdateQueryButtonState();
        }

        void UpdateQueryButtonState()
        {
            queryButton.Enabled = IsXPathQueryEntered && XmlView.IsXmlViewActive;
        }

        bool IsXPathQueryEntered
        {
            get
            {
                return xPathComboBox.Text.Length > 0;
            }
        }

        void QueryButtonClick(object sender, EventArgs e)
        {
            RunXPathQuery();
        }

        void RunXPathQuery()
        {
            XmlView view = XmlView.ActiveXmlView;
            if (view == null)
                return;

            try
            {
                MarkerStrategy markerStrategy = view.TextEditorControl.Document.MarkerStrategy;
                fileName = view.PrimaryFileName;

                // vyčištění předchozích XPath výsledků.
                ClearResults();
                XPathNodeTextMarker.RemoveMarkers(markerStrategy);

                // spuštění XPath příkazu.
                XPathNodeMatch[] nodes = view.SelectNodes(xPathComboBox.Text, GetNamespaces());
                if (nodes.Length > 0)
                {
                    AddXPathResults(nodes);
                    XPathNodeTextMarker.AddMarkers(markerStrategy, nodes);
                }
                else
                    AddNoXPathResult();
                AddXPathToHistory();
            }
            catch (XPathException xpathEx)
            {
                AddErrorResult(xpathEx);
            }
            catch (XmlException xmlEx)
            {
                AddErrorResult(xmlEx);
            }
            finally
            {
                BringResultsTabToFront();
                view.TextEditorControl.Refresh();
            }
        }

        void ClearResults()
        {
            xPathResultsListView.Items.Clear();
        }

        void BringResultsTabToFront()
        {
            tabControl.SelectedTab = tabControl.TabPages[0];
        }

        void AddXPathResults(XPathNodeMatch[] nodes)
        {
            foreach (XPathNodeMatch node in nodes)
            {
                ListViewItem item = new ListViewItem(node.DisplayValue);
                if (node.HasLineInfo())
                {
                    int line = node.LineNumber + 1;
                    item.SubItems.Add(line.ToString());
                }
                item.Tag = node;
                xPathResultsListView.Items.Add(item);
            }
        }

        void AddNoXPathResult()
        {
            xPathResultsListView.Items.Add("XPath " + GResources.GetResourceText(29450258) + " 0 " + GResources.GetResourceText(29450259)); //RC 29450259 : položek
        }

        void AddErrorResult(XmlException ex)
        {
            ListViewItem item = new ListViewItem(ex.Message, ErrorImageIndex);
            item.SubItems.Add(ex.LineNumber.ToString());
            item.Tag = ex;
            xPathResultsListView.Items.Add(item);
        }

        void AddErrorResult(XPathException ex)
        {
            ListViewItem item = new ListViewItem(String.Concat("XPath:", " ", ex.Message), ErrorImageIndex)
            {
                Tag = ex
            };
            xPathResultsListView.Items.Add(item);
        }

        void InitImageList()
        {
            try
            {
                imageList.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.Error"));
            }
            catch (ResourceNotFoundException) { }
        }

        void InitStrings()
        {
            lineColumnHeader.Text = GResources.GetResourceText(29450260); //RC 29450260 : Řádek
            matchColumnHeader.Text = GResources.GetResourceText(29450261); //RC 29450261 : Shoda
            prefixColumn.HeaderText = GResources.GetResourceText(29450262); //RC 29450262 : Prefix
            namespaceColumn.HeaderText = "Namespace";
            queryButton.Text = GResources.GetResourceText(29450263); //RC 29450263 : Dotaz
            xPathLabel.Text = "XPath:";
            xPathResultsTabPage.Text = GResources.GetResourceText(29450264); //RC 29450264 : Výsledky
            namespacesTabPage.Text = "Namespacy";
        }

        void XPathResultsListViewItemActivate(object sender, EventArgs e)
        {
            JumpToResultLocation();
        }

        void JumpToResultLocation()
        {
            MoveCaretToResultLocation(MoveCaret.ByJumping);
        }

        void ScrollToResultLocation()
        {
            MoveCaretToResultLocation(MoveCaret.ByScrolling);
        }

        void MoveCaretToResultLocation(MoveCaret moveCaret)
        {
            if (xPathResultsListView.SelectedItems.Count > 0)
            {
                ListViewItem item = xPathResultsListView.SelectedItems[0];
                XPathException xpathException = item.Tag as XPathException;
                XmlException xmlException = item.Tag as XmlException;
                if (item.Tag is XPathNodeMatch xPathNodeMatch)
                    MoveCaretToXPathNodeMatch(moveCaret, xPathNodeMatch);
                else if (xmlException != null)
                    MoveCaretToXmlException(moveCaret, xmlException);
                else if (xpathException != null && moveCaret == MoveCaret.ByJumping)
                    xPathComboBox.Focus();
            }
        }

        void MoveCaretToXPathNodeMatch(MoveCaret moveCaret, XPathNodeMatch node)
        {
            if (moveCaret == MoveCaret.ByJumping)
                JumpTo(fileName, node.LineNumber, node.LinePosition);
            else
                ScrollTo(fileName, node.LineNumber, node.LinePosition, node.Value.Length);
        }

        void MoveCaretToXmlException(MoveCaret moveCaret, XmlException ex)
        {
            int line = ex.LineNumber - 1;
            int column = ex.LinePosition - 1;
            if (moveCaret == MoveCaret.ByJumping)
                JumpTo(fileName, line, column);
            else
                ScrollTo(fileName, line, column);
        }

        void JumpTo(string fileName, int line, int column)
        {
            Gordic.GFE.WinClient.Services.FileAgent.JumpToFilePosition(fileName, line, column);
        }

        void ScrollTo(string fileName, int line, int column, int length)
        {
            XmlView view = XmlView.ActiveXmlView;
            if (view != null && IsFileNameMatch(view))
            {
                TextAreaControl textAreaControl = view.TextEditorControl.ActiveTextAreaControl;
                if (length > 0 && line < textAreaControl.Document.TotalNumberOfLines)
                {
                    SelectionManager selectionManager = textAreaControl.SelectionManager;
                    selectionManager.ClearSelection();
                    TextLocation startPos = new TextLocation(column, line);
                    TextLocation endPos = new TextLocation(column + length, line);
                    selectionManager.SetSelection(startPos, endPos);
                }
                line = Math.Min(line, textAreaControl.Document.TotalNumberOfLines - 1);
                textAreaControl.ScrollTo(line, column);
            }
        }

        void ScrollTo(string fileName, int line, int column)
        {
            ScrollTo(fileName, line, column, 0);
        }

        bool IsFileNameMatch(XmlView view)
        {
            return FileUtility.IsEqualFileName(fileName, view.PrimaryFileName);
        }

        string[] GetNamespaceStringArray()
        {
            List<string> namespaces = new List<string>();
            foreach (XmlNamespace ns in GetNamespaces())
                namespaces.Add(ns.ToString());
            return namespaces.ToArray();
        }

        string[] GetXPathHistory()
        {
            List<string> xpaths = new List<string>();
            foreach (string xpath in xPathComboBox.Items)
                xpaths.Add(xpath);
            return xpaths.ToArray();
        }

        string GetPrefix(DataGridViewRow row)
        {
            string prefix = (string)row.Cells[0].Value;
            if (prefix != null)
                return prefix;
            return String.Empty;
        }

        string GetNamespace(DataGridViewRow row)
        {
            string ns = (string)row.Cells[1].Value;
            if (ns != null)
                return ns;
            return String.Empty;
        }

        void AddXPathToHistory()
        {
            string newXPath = xPathComboBox.Text;
            if (!xPathComboBox.Items.Contains(newXPath))
            {
                xPathComboBox.Items.Insert(0, newXPath);
                if (xPathComboBox.Items.Count > xpathQueryHistoryLimit)
                    xPathComboBox.Items.RemoveAt(xpathQueryHistoryLimit);
            }
        }

        void XPathComboBoxKeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Return)
                RunXPathQuery();
        }

        void XPathResultsListViewSelectedIndexChanged(object sender, EventArgs e)
        {
            ScrollToResultLocation();
        }

        void XPathResultsListViewClick(object sender, EventArgs e)
        {
            ScrollToResultLocation();
        }
    }
}
