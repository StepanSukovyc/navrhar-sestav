//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.CompilerMessageView.cs                 </Name>
//    <Description> Podložka pro zobrazení chyb, upozornění atd.                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Text;
using System.Threading;
using System.Windows.Forms;
using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Gui.OptionPanels;
using Gordic.GFE.WinClient.Services;

namespace Gordic.GFE.WinClient.MessageView
{
    /// <summary>
    /// Podložka pro zobrazení chyb, upozornění atd.
    /// </summary>
    class CompilerMessageView : AbstractPadContent, IClipboardHandler
    {
        static CompilerMessageView instance;
        /// <summary>
        /// Instance třídy
        /// </summary>
        public static CompilerMessageView Instance
        {
            get
            {
                if (instance == null)
                {
                    InitializeInstance();
                    if (instance != null)
                        instance.DisplayActiveCategory();
                }
                return instance;
            }
        }

        RichTextBox textEditorControl;
        Panel myPanel;
        ToolStrip toolStrip;

        List<MessageViewCategory> messageCategories;

        int selectedCategory;
        /// <summary>
        /// Index vybrané kategorií
        /// </summary>
        public int SelectedCategoryIndex
        {
            get { return selectedCategory; }
            set
            {
                ThreadService.AssertMainThread();
                if (selectedCategory != value)
                {
                    selectedCategory = value;
                    DisplayActiveCategory();
                    OnSelectedCategoryIndexChanged(EventArgs.Empty);
                }
            }
        }

        /// <summary>
        /// Krácení sov
        /// </summary>
        public bool WordWrap
        {
            get { return properties.Get("WordWrap", true); }
            set { properties.Set("WordWrap", value); }
        }
        /// <summary>
        /// Vybraný pohled na kategorii
        /// </summary>
        public MessageViewCategory SelectedMessageViewCategory { get { return selectedCategory >= 0 ? messageCategories[selectedCategory] : null; } }

        Property properties;
        /// <summary>
        /// Kategorie zpráv
        /// </summary>
        public List<MessageViewCategory> MessageCategories { get { return messageCategories; } }
        /// <summary>
        /// Ovladač podložky
        /// </summary>
        public override Control Control { get { return myPanel; } }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public CompilerMessageView()
        {
            instance = this;
            textEditorControl = new RichTextBox();
            myPanel = new Panel();
            selectedCategory = -1;
            messageCategories = new List<MessageViewCategory>();
            appendLock = new object();
            appendCalls = new List<AppendCall>();
            //AddCategory(new MessageViewCategory("", ""));
            myPanel.SuspendLayout();
            textEditorControl.Dock = DockStyle.Fill;
            textEditorControl.BorderStyle = BorderStyle.FixedSingle;
            textEditorControl.BackColor = SystemColors.Window;
            textEditorControl.LinkClicked += delegate (object sender, LinkClickedEventArgs e)
            {
                FileAgent.OpenFile("browser://" + e.LinkText);
            };

            textEditorControl.HideSelection = false;
            textEditorControl.ReadOnly = true;

            ContextMenuStrip strip = MenuService.CreateContextMenu(this, new EventArgsContextMenu("/ReportDesigner/Pads/CompilerMessageView/ContextMenu"));
            if (strip != null)
                textEditorControl.ContextMenuStrip = strip;

            properties = PropertyService.Get(OutputWindowOptionsPanel.OutputWindowsProperty, new Property());

            textEditorControl.Font = FontSelectionPanel.ParseFont(properties.Get("DefaultFont", WinFormsResourceService.DefaultMonospacedFont.ToString()).ToString());
            properties.PropertyChanged += new PropertyChangedEventHandler(PropertyChanged);

            textEditorControl.DoubleClick += TextEditorControlDoubleClick;

            toolStrip = ToolbarService.CreateToolStrip(this, "/ReportDesigner/Pads/CompilerMessageView/Toolbar");
            toolStrip.Stretch = true;
            toolStrip.GripStyle = ToolStripGripStyle.Hidden;

            myPanel.Controls.AddRange(new Control[] { textEditorControl, toolStrip });

            SetWordWrap();
            myPanel.ResumeLayout(false);
        }

        static void InitializeInstance()
        {
            if (SimpleDesktop.Desktop != null)
            {
                PadDescriptor desc = SimpleDesktop.Desktop.GetPad(typeof(CompilerMessageView));
                if (desc != null)
                    desc.CreatePad();
            }
        }

        #region Category
        /// <summary>
        /// Přidání kategorie dp zobrazení zpráv.
        /// </summary>
        /// <param name="category">Přidávaná kategorie</param>
        public void AddCategory(MessageViewCategory category)
        {
            if (SimpleDesktop.MainForm.InvokeRequired)
            {
                ThreadService.SafeThreadAsyncCall((Action<MessageViewCategory>)AddCategory, category);
                return;
            }
            messageCategories.Add(category);
            category.TextSet += new TextEventHandler(CategoryTextSet);
            category.TextAppended += new TextEventHandler(CategoryTextAppended);

            if (category != null)
                OnMessageCategoryAdded(category.DisplayCategory);
        }

        struct AppendCall
        {
            internal readonly MessageViewCategory Category;
            internal readonly string Text;
            internal readonly bool ClearCategory;

            public AppendCall(MessageViewCategory category, string text, bool clearCategory)
            {
                this.Category = category;
                this.Text = text;
                this.ClearCategory = clearCategory;
            }
        }

        readonly object appendLock;
        List<AppendCall> appendCalls;

        /// <summary>
        /// Výběr kategorie
        /// </summary>
        /// <param name="categoryName">Název kategorie</param>
        public bool SelectCategory(string categoryName)
        {
            bool selected = false;
            for (int i = 0; i < messageCategories.Count; ++i)
            {
                MessageViewCategory category = (MessageViewCategory)messageCategories[i];
                if (category.Category == categoryName)
                {
                    SelectedCategoryIndex = i;
                    selected = true;
                    break;
                }
            }
            return selected;
        }

        /// <summary>
        /// Získání kategorie dle názvu
        /// </summary>
        /// <param name="categoryName">Název kategorie</param>
        /// <returns></returns>
        public MessageViewCategory GetCategory(string categoryName)
        {
            foreach (MessageViewCategory category in messageCategories)
                if (category.Category == categoryName)
                    return category;
            return null;
        }

        void CategoryTextSet(object sender, TextEventArgs e)
        {
            EnqueueAppend(new AppendCall((MessageViewCategory)sender, e.Text, true));
        }
        void CategoryTextAppended(object sender, TextEventArgs e)
        {
            EnqueueAppend(new AppendCall((MessageViewCategory)sender, e.Text, false));
        }
        void EnqueueAppend(AppendCall appendCall)
        {
            bool waitForMainThread;
            lock (appendLock)
            {
                appendCalls.Add(appendCall);
                ProcessAppendText();
                //ThreadService.SafeThreadAsyncCall(ProcessAppendText);
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
        void ProcessAppendText()
        {
            if (SelectedCategoryIndex == -1)
                return;

            List<AppendCall> appendCalls;
            lock (appendLock)
            {
                appendCalls = this.appendCalls;
                this.appendCalls = new List<AppendCall>();
            }
            if (appendCalls.Count == 0)
                return;

            MessageViewCategory newCategory = appendCalls[appendCalls.Count - 1].Category;
            if (messageCategories[SelectedCategoryIndex] != newCategory)
            {
                SelectCategory(newCategory.Category);
                return;
            }

            try
            {
                bool clear;
                string text;
                if (appendCalls.Count == 1)
                {
                    clear = appendCalls[0].ClearCategory;
                    text = appendCalls[0].Text;
                }
                else
                {
                    clear = false;
                    StringBuilder b = new StringBuilder();
                    foreach (AppendCall append in appendCalls)
                        if (append.Category == newCategory)
                        {
                            if (append.ClearCategory)
                            {
                                b.Length = 0;
                                clear = true;
                            }
                            b.Append(append.Text);
                        }
                    text = b.ToString();
                }

                if (clear)
                    textEditorControl.Text = text;
                else
                {
                    textEditorControl.SelectionStart = textEditorControl.TextLength;
                    textEditorControl.SelectedText = text;
                }
                textEditorControl.SelectionStart = textEditorControl.TextLength;
            }
            //catch (ObjectDisposedException ex) { LoggingService.Error(GResources.GetResourceText(29451482), ex); }
            catch { }
        }
        void SelectCategory(string categoryName, string text)
        {
            for (int i = 0; i < messageCategories.Count; ++i)
            {
                MessageViewCategory category = (MessageViewCategory)messageCategories[i];
                if (category.Category == categoryName)
                {
                    selectedCategory = i;
                    textEditorControl.Text = StringParser.Parse(text);
                    OnSelectedCategoryIndexChanged(EventArgs.Empty);
                    break;
                }
            }
        }

        #endregion

        void SetWordWrap()
        {
            bool wordWrap = this.WordWrap;
            textEditorControl.WordWrap = wordWrap;
            if (wordWrap)
                textEditorControl.ScrollBars = RichTextBoxScrollBars.ForcedVertical;
            else
                textEditorControl.ScrollBars = RichTextBoxScrollBars.ForcedBoth;
        }
        void TextEditorControlDoubleClick(object sender, EventArgs e)
        {
            string fullText = textEditorControl.Text;
            // nějaký text?
            if (fullText.Length > 0)
            {
                Point clickPos = textEditorControl.PointToClient(Control.MousePosition);
                int index = textEditorControl.GetCharIndexFromPosition(clickPos);
                int start = index;
                // najdeme začátek řádku
                while (--start > 0 && fullText[start - 1] != '\n') ;
                // najdeme konec řádku
                while (++index < fullText.Length && fullText[index] != '\n') ;

                string textLine = fullText.Substring(start, index - start);

                FileLineReference lineReference = OutputTextLineParser.GetFileLineReference(textLine);
                if (lineReference != null)
                    Gordic.GFE.WinClient.Services.FileAgent.JumpToFilePosition(lineReference.FileName, lineReference.Line, lineReference.Column);
            }
        }
        void PropertyChanged(object sender, PropertyChangedEventArgs e)
        {
            if (e.Key == "WordWrap")
            {
                SetWordWrap();
                ToolbarService.UpdateToolbar(toolStrip);
            }
            if (e.Key == "DefaultFont")
                textEditorControl.Font = FontSelectionPanel.ParseFont(properties.Get("DefaultFont", WinFormsResourceService.DefaultMonospacedFont.ToString()).ToString());
        }
        void DisplayActiveCategory()
        {
            ThreadService.DebugAssertMainThread();
            if (selectedCategory < 0)
                try { textEditorControl.Text = ""; }
                catch (ObjectDisposedException ex) { LoggingService.Error(GResources.GetResourceText(29451482), ex); }
            else
                lock (messageCategories[selectedCategory].SyncRoot) { EnqueueAppend(new AppendCall(messageCategories[selectedCategory], messageCategories[selectedCategory].Text, true)); }
        }

        /// <exclude/>
        protected virtual void OnMessageCategoryAdded(params string[] parameters)
        {
            MessageCategoryAdded?.Invoke(parameters);
        }
        /// <exclude/>
        protected virtual void OnSelectedCategoryIndexChanged(EventArgs e)
        {
            SelectedCategoryIndexChanged?.Invoke(this, e);
        }

        /// <summary>
        /// Volá se po přidání kategorii
        /// </summary>
        public event EventHandlerParamArgument MessageCategoryAdded;
        /// <summary>
        /// Volá se po změně indexu výbrané kategorie
        /// </summary>
        public event EventHandler SelectedCategoryIndexChanged;

        #region IClipboardHandler
        /// <exclude/>
        public bool EnableCut { get { return false; } }
        /// <exclude/>
        public bool EnableCopy { get { return textEditorControl.SelectionLength > 0; } }

        /// <exclude/>
        public bool EnablePaste { get { return false; } }

        /// <exclude/>
        public bool EnableDelete { get { return false; } }

        /// <exclude/>
        public bool EnableSelectAll { get { return textEditorControl.TextLength > 0; } }

        /// <exclude/>
        public void Cut() { }

        /// <exclude/>
        public void Copy() { textEditorControl.Copy(); }

        /// <exclude/>
        public void Paste() { }
        /// <exclude/>
        public void Delete() { }
        /// <exclude/>
        public void SelectAll() { textEditorControl.SelectAll(); }
        #endregion
    }
}
