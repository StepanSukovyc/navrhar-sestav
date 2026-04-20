//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.ReportDesignerTextAreaControl.cs       </Name>
//    <Description> Základní textový ovladač editoru obsahu Návrháře sestav     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Windows.Forms;
using Gordic.GFE.Parsers.DefaultEditor;
using Gordic.GFE.Parsers.Services;
using Gordic.Gfe.FormFiller.AddIns;
using Gordic.Gfe.FormFiller.DefaultEditor.Gui.Editor;
using Gordic.Gfe.FormFiller.Gui;
using Gordic.TextEditor;
using Gordic.TextEditor.Actions;
using Gordic.TextEditor.Document;
using Gordic.TextEditor.Gui.CompletionWindow;
using Gordic.TextEditor.Gui.InsightWindow;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.Parsers;
using Gordic.General;

namespace Gordic.Gfe.FormFiller.DefaultEditor
{
    /// <summary>
    /// Základní textový ovladač editoru obsahu Návrháře sestav
    /// </summary>
    class FormFillerTextAreaControl : TextEditorControl, ICodeCompletionEditor
    {
        #region ICodeCompletion
        /// <summary>
        /// Jazyk - vázaný na daný editor
        /// </summary>
        public string Language { get; set; }
        /// <summary>
        /// Zobrazení okna doplněnís
        /// </summary>
        /// <param name="completionDataProvider">Poskytovatel dat</param>
        /// <param name="ch">Stisknutá klávesa</param>
        public void ShowCompletionWindow(ICompletionDataProvider completionDataProvider, char ch)
        {
            codeCompletionWindow = CodeCompletionWindow.ShowCompletionWindow(SimpleDesktop.MainForm, this, this.FileName, completionDataProvider, ch);
            if (codeCompletionWindow != null)
                codeCompletionWindow.Closed += new EventHandler(CloseCodeCompletionWindow);
        }
        /// <summary>
        /// Získání slova před posuvníkem
        /// </summary>
        /// <returns></returns>
        public string GetWordBeforeCaret()
        {
            int start = TextUtilities.FindPrevWordStart(Document, ActiveTextAreaControl.TextArea.Caret.Offset);
            return Document.GetText(start, ActiveTextAreaControl.TextArea.Caret.Offset - start);
        }
        /// <exclude/>
        public void InsertTemplate(CodeTemplate template) { }

        #endregion

        /// <summary>
        /// cesta k popisu položek kontextového menu
        /// </summary>
        protected string contextMenuPath = null;//"/FormFiller/ViewContent/DefaultTextEditor/ContextMenu";
        const string editActionsPath = "/FormFiller/FFTextEditor/EditActions";
        const string formatingStrategyPath = "/FormFiller/FFTextEditor/Formatter";
        const string advancedHighlighterPath = "/FormFiller/FFTextEditor/AdvancedHighlighter";
        InsightWindow insightWindow = null;
        CodeCompletionWindow codeCompletionWindow = null;
        bool inHandleKeyPress, startedDelayedReparse;

        static ICodeCompletionBinding[] codeCompletionBindings;
        /// <summary>
        /// Vazba na kompletací textu
        /// </summary>
        public static ICodeCompletionBinding[] CodeCompletionBindings
        {
            get
            {
                if (codeCompletionBindings == null)
                        codeCompletionBindings = (ICodeCompletionBinding[])(AddInTree.GetTreeNode("/FormFiller/FFTextEditor/CodeCompletion").BuildChildItems(null)).ToArray(typeof(ICodeCompletionBinding));
                return codeCompletionBindings;
            }
        }

        /// <summary>
        /// Okno nápovědy je zbrazeno
        /// </summary>
        public bool InsightWindowVisible { get { return insightWindow != null; } }

        IAdvancedHighlighter advancedHighlighter;
        /// <summary>
        /// Sada explicitního zvýraznění
        /// </summary>
        public bool HighlightingExplicitlySet { get; set; }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public FormFillerTextAreaControl()
            : this(true)
        {
            GenerateEditActions();

            TextEditorProperties = FormFillerTextEditorProperties.Instance;
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="enableFolding">Indikuje povolení strategii skládání</param>
        protected FormFillerTextAreaControl(bool enableFolding)
        {
            Document.FoldingManager.FoldingStrategy = new ParserFoldingStrategy();
        }

        /// <summary>
        /// Explicitněn nastavené zvýraznění.
        /// Na pořád.
        /// </summary>
        public override void SetHighlighting(string name)
        {
            base.SetHighlighting(name);
            this.HighlightingExplicitlySet = true;
            InitializeAdvancedHighlighter();
        }

        /// <summary>
        /// Inicializace pokročilejšího zvýraznění
        /// </summary>
        public void InitializeAdvancedHighlighter()
        {
            if (advancedHighlighter != null)
            {
                advancedHighlighter.Dispose();
                advancedHighlighter = null;
            }
            string highlighterPath = advancedHighlighterPath + "/" + Document.HighlightingStrategy.Name;
            if (AddInTree.ExistsTreeNode(highlighterPath))
            {
                IList<IAdvancedHighlighter> highlighter = AddInTree.BuildItems<IAdvancedHighlighter>(highlighterPath, this);
                if (highlighter != null && highlighter.Count > 0)
                {
                    advancedHighlighter = highlighter[0];
                    advancedHighlighter.Initialize(this);
                    Document.HighlightingStrategy = new AdvancedHighlightingStrategy((DefaultHighlightingStrategy)Document.HighlightingStrategy, advancedHighlighter);
                }
            }
        }
        /// <summary>
        /// Inicializace formátování
        /// </summary>
        public void InitializeFormatter()
        {
            string formatterPath = formatingStrategyPath + "/" + Document.HighlightingStrategy.Name;
            if (AddInTree.ExistsTreeNode(formatterPath))
            {
                IFormattingStrategy[] formatter = (IFormattingStrategy[])(AddInTree.GetTreeNode(formatterPath).BuildChildItems(this)).ToArray(typeof(IFormattingStrategy));
                if (formatter != null && formatter.Length > 0)
                    Document.FormattingStrategy = formatter[0];
            }
        }
        /// <summary>
        /// Reakce na stisknutí Ctrl+Space
        /// </summary>
        public void StartCtrlSpaceCompletion()
        {
            foreach (ICodeCompletionBinding ccBinding in CodeCompletionBindings)
                if (ccBinding.CtrlSpace(this))
                    return;
        }
        /// <summary>
        /// Zobrazení okna s nápovědou
        /// </summary>
        /// <param name="insightDataProvider">POskytovatel dat pro doplnění</param>
        public void ShowInsightWindow(IInsightDataProvider insightDataProvider)
        {
            if (insightWindow == null || insightWindow.IsDisposed)
            {
                insightWindow = new InsightWindow(SimpleDesktop.MainForm, this);
                insightWindow.Closed += new EventHandler(CloseInsightWindow);
            }
            insightWindow.AddInsightDataProvider(insightDataProvider, this.FileName);
            insightWindow.ShowInsightWindow();
        }

        /// <summary>
        /// Odstranění slova před posuvníkem
        /// </summary>
        /// <returns></returns>
        public int DeleteWordBeforeCaret()
        {
            int start = TextUtilities.FindPrevWordStart(Document, ActiveTextAreaControl.TextArea.Caret.Offset);
            Document.Remove(start, ActiveTextAreaControl.TextArea.Caret.Offset - start);
            return start;
        }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="newControl">Textový ovladač</param>
        protected override void InitializeTextAreaControl(TextAreaControl newControl)
        {
            base.InitializeTextAreaControl(newControl);

            newControl.ShowContextMenu += delegate(object sender, MouseEventArgs e)
            {
                if (contextMenuPath != null)
                    MenuService.ShowContextMenu(this, contextMenuPath, (Control)sender, e.X, e.Y);
            };
            newControl.TextArea.KeyEventHandler += new Gordic.TextEditor.KeyEventHandler(HandleKeyPress);

            newControl.MouseWheel += new MouseEventHandler(TextAreaMouseWheel);
            newControl.DoHandleMousewheel = false;
        }
        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        /// <param name="disposing">Indikuje uvolnění</param>
        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            if (disposing)
            {
                if (advancedHighlighter != null)
                {
                    advancedHighlighter.Dispose();
                    advancedHighlighter = null;
                }
                CloseCodeCompletionWindow(this, EventArgs.Empty);
                CloseInsightWindow(this, EventArgs.Empty);
            }
        }
        /// <exclude/>
        protected override void OnReloadHighlighting(object sender, EventArgs e)
        {
            base.OnReloadHighlighting(sender, e);
            InitializeAdvancedHighlighter();
        }

        bool HandleKeyPress(char ch)
        {
            if (inHandleKeyPress)
                return false;
            inHandleKeyPress = true;
            try
            {
                if (codeCompletionWindow != null && !codeCompletionWindow.IsDisposed)
                {
                    if (codeCompletionWindow.ProcessKeyEvent(ch))
                        return true;
                    if (codeCompletionWindow != null && !codeCompletionWindow.IsDisposed)
                        // code-completion window je pořád otevřené
                        return false;
                }

                if (CodeCompletionOptions.Instance.EnableCodeCompletion)
                {
                    foreach (ICodeCompletionBinding ccBinding in CodeCompletionBindings)
                        if (ccBinding.HandleKeyPress(this, ch))
                            return false;
                    if (ch == '\n')
                        StartDelayedReparse();
                }
            }
            catch (Exception ex) { LogException(ex); }
            finally { inHandleKeyPress = false; }
            return false;
        }

        void LogException(Exception ex)
        {
            MessageService.ShowError(ex);
        }
        void CloseCodeCompletionWindow(object sender, EventArgs e)
        {
            if (codeCompletionWindow != null)
            {
                codeCompletionWindow.Closed -= new EventHandler(CloseCodeCompletionWindow);
                codeCompletionWindow.Dispose();
                codeCompletionWindow = null;
            }
        }
        void CloseInsightWindow(object sender, EventArgs e)
        {
            if (insightWindow != null)
            {
                insightWindow.Closed -= new EventHandler(CloseInsightWindow);
                insightWindow.Dispose();
                insightWindow = null;
            }
        }
        void TextAreaMouseWheel(object sender, MouseEventArgs e)
        {
            TextAreaControl textAreaControl = (TextAreaControl)sender;
            if (insightWindow != null && !insightWindow.IsDisposed && insightWindow.Visible)
                insightWindow.HandleMouseWheel(e);
            else if (codeCompletionWindow != null && !codeCompletionWindow.IsDisposed && codeCompletionWindow.Visible)
                codeCompletionWindow.HandleMouseWheel(e);
            else
                textAreaControl.HandleMouseWheel(e);
        }
        void GenerateEditActions()
        {
            try
            {
                IEditAction[] actions = (IEditAction[])(AddInTree.GetTreeNode(editActionsPath).BuildChildItems(this)).ToArray(typeof(IEditAction));

                foreach (IEditAction action in actions)
                    foreach (Keys key in action.Keys)
                        editactions[key] = action;
            }
            catch (TreePathNotFoundException)
            {
                LoggingService.Warning(string.Join(" ", "EditAction", editActionsPath, GResources.GetResourceText(29450002), "AddInTree!")); //RC 29450002 : neexistuje v konfiguračním stromu
            }
        }
        void StartDelayedReparse()
        {
            if (startedDelayedReparse)
                return;
            startedDelayedReparse = true;
            ThreadService.SafeThreadAsyncCall(
                delegate
                {
                    startedDelayedReparse = false;
                    if (!this.IsDisposed)
                        ParserService.StartAsyncParse(this.FileName, this.Document.TextContent);
                });
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // FormFillerTextAreaControl
            // 
            this.Name = "FormFillerTextAreaControl";
            this.ResumeLayout(false);

        }
    }
}
