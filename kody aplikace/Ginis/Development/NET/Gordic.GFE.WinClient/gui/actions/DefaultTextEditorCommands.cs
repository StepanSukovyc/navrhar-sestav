//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DefaultTextEditorCommands.cs           </Name>
//    <Description> vytvoření podpoložek zvýraznění                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.WinClient.Gui;
using Gordic.TextEditor.Actions;
using Gordic.GFE.WinClient.DefaultEditor;
using Gordic.TextEditor;
using System.Windows.Forms;
using System.Collections;
using Gordic.TextEditor.Document;
using Gordic.GFE.WinClient.Dialogs.OptionPanels;
using System.Diagnostics;
using Gordic.GFE.Parsers.DefaultEditor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;

namespace Gordic.GFE.WinClient.DefaultTextEditorCommands
{
    /// <summary>
    /// vytvoření podpoložek zvýraznění
    /// </summary>
    class HighlightingTypeBuilder : ISubmenuBuilder
    {
        /// <summary>
        /// Porovnání
        /// </summary>
        sealed class HighlightingTypeComparer : IComparer
        {
            public int Compare(object x, object y)
            {
                Debug.Assert(x != null);
                Debug.Assert(y != null);
                MenuCheckBox item2 = y as MenuCheckBox;

                if (!(x is MenuCheckBox item1) || item2 == null)
                    return -1;

                return item1.Text.CompareTo(item2.Text);
            }
        }

        TextEditorControl control = null;
        ToolStripItem[] menuCommands = null;

        /// <summary>
        /// Vytvoření podpoložek menu
        /// </summary>
        /// <param name="entity">větev konfiguračního stromu</param>
        /// <param name="owner">vlastník</param>
        /// <returns></returns>
        public ToolStripItem[] BuildSubmenu(Entity entity, object owner)
        {
            control = (TextEditorControl)owner;

            ArrayList menuItems = new ArrayList();
            
            foreach (DictionaryEntry entry in HighlightingManager.Manager.HighlightingDefinitions)
            {
                MenuCheckBox item = new MenuCheckBox();
                item.Initialize(entry.Key.ToString());
                item.Click += new EventHandler(ChangeSyntax);
                item.Checked = control.Document.HighlightingStrategy.Name == entry.Key.ToString();
                menuItems.Add(item);
            }
            menuItems.Sort(new HighlightingTypeComparer());
            menuCommands = (ToolStripItem[])menuItems.ToArray(typeof(ToolStripItem));
            return menuCommands;
        }

        void ChangeSyntax(object sender, EventArgs e)
        {
            if (control != null)
            {
                MenuCheckBox item = (MenuCheckBox)sender;
                foreach (MenuCheckBox i in menuCommands)
                    i.Checked = false;

                item.Checked = true;
                try { control.SetHighlighting(item.Text); }
                catch (HighlightingDefinitionInvalidException ex) { MessageService.ShowError(ex); }
                control.Refresh();
            }
        }
    }

    abstract class AbstractEditorProviderMenuCommand : AbstractMenuCommand
    {
        /// <summary>
        /// akce editace
        /// </summary>
        public abstract IEditAction EditAction { get; }
        /// <summary>
        /// Prvek pro editací
        /// </summary>
        protected ITextEditorControlProvider Editable;
        /// <summary>
        /// Dostupnost příkazu
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                Editable = SimpleDesktop.Desktop.ActiveContent as ITextEditorControlProvider;
                return Editable != null;
            }
        }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (EditAction != null)
            {
                if (Editable == null)
                    Editable = SimpleDesktop.Desktop.ActiveViewContent as ITextEditorControlProvider;

                EditAction.Execute(Editable.TextEditorControl.ActiveTextAreaControl.TextArea);
            }
        }
    }

    /// <summary>
    /// Abstraktní třída příkazů editace
    /// </summary>
    public abstract class AbstractEditActionMenuCommand : AbstractMenuCommand
    {
        /// <summary>
        /// akce editace
        /// </summary>
        public abstract IEditAction EditAction { get; }
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (SimpleDesktop.Desktop.ActiveViewContent is ITextEditorControlProvider viewContent)
            {
                TextEditorControl textEditor = viewContent.TextEditorControl;
                EditAction.Execute(textEditor.ActiveTextAreaControl.TextArea);
            }
        }
    }

    ///// <summary>
    ///// Náhled
    ///// </summary>
    //class Syntax : AbstractEditorProviderMenuCommand
    //{
    //    /// <summary>
    //    /// Spuštění příkazu
    //    /// </summary>
    //    public override void Run()
    //    {
    //        //if (Editable != null)
    //        //    Editable.DialogSyntax();
    //    }
    //}

    /// <summary>
    /// Přepnutí složení
    /// </summary>
    public class ToggleFolding : AbstractEditActionMenuCommand
    {
        /// <summary>
        /// Akce příkazu
        /// </summary>
        public override IEditAction EditAction { get { return new Gordic.TextEditor.Actions.ToggleFolding(); } }
    }
    /// <summary>
    /// Přepnutí všech složení
    /// </summary>
    public class ToggleAllFoldings : AbstractEditActionMenuCommand
    {
        /// <summary>
        /// Akce příkazu
        /// </summary>
        public override IEditAction EditAction { get { return new Gordic.TextEditor.Actions.ToggleAllFoldings(); } }
    }

    /// <summary>
    /// Zobrazit pouze definice
    /// </summary>
    public class ShowDefinitionsOnly : AbstractEditActionMenuCommand
    {
        /// <summary>
        /// Akce příkazu
        /// </summary>
        public override IEditAction EditAction { get { return new Gordic.TextEditor.Actions.ShowDefinitionsOnly(); } }
    }

    /// <summary>
    /// Odrážky vybrané oblasti
    /// </summary>
    public class IndentSelection : AbstractEditActionMenuCommand
    {
        /// <summary>
        /// Akce
        /// </summary>
        public override IEditAction EditAction { get { return new Gordic.TextEditor.Actions.IndentSelection(); } }
    }

    /// <summary>
    /// Zakomentovat blok
    /// </summary>
    class CommentRegion : AbstractEditorProviderMenuCommand
    {
        /// <summary>
        /// akce položky nabídky
        /// </summary>
        public override IEditAction EditAction { get { return new Gordic.TextEditor.Actions.ToggleComment(); } }
    }

    /// <summary>
    /// Náhled
    /// </summary>
    class EnableFolding : AbstractCheckableMenuCommand
    {
        /// <summary>
        /// indikuje stav hodnoty
        /// </summary>
        public override bool IsChecked
        {
            get { return ReportDesignerTextEditorProperties.Instance.EnableFolding; }
            set
            {
                ReportDesignerTextEditorProperties.Instance.EnableFolding = value;

                if (SimpleDesktop.Desktop.ActiveViewContent is ITextEditorControlProvider viewContent)
                    viewContent.TextEditorControl.ActiveTextAreaControl.Refresh();
            }
        }
    }

    /// <summary>
    /// zobrazení čísel řádků
    /// </summary>
    class LineNumbers : AbstractCheckableMenuCommand
    {
        /// <summary>
        /// indikuje stav hodnoty
        /// </summary>
        public override bool IsChecked
        {
            get { return ReportDesignerTextEditorProperties.Instance.ShowLineNumbers; }
            set
            {
                ReportDesignerTextEditorProperties.Instance.ShowLineNumbers = value;

                if (SimpleDesktop.Desktop.ActiveViewContent is ITextEditorControlProvider viewContent)
                    viewContent.TextEditorControl.ActiveTextAreaControl.Refresh();
            }
        }
    }

    /// <summary>
    /// zobrazení netisknutelných znaků
    /// </summary>
    class Pilcrow : AbstractCheckableMenuCommand
    {
        /// <summary>
        /// indikuje stav hodnoty
        /// </summary>
        public override bool IsChecked
        {
            get
            {
                return
                    ReportDesignerTextEditorProperties.Instance.ShowSpaces
                    && ReportDesignerTextEditorProperties.Instance.ShowTabs
                    && ReportDesignerTextEditorProperties.Instance.ShowEOLMarker
                    && ReportDesignerTextEditorProperties.Instance.ShowInvalidLines;
            }
            set
            {
                ReportDesignerTextEditorProperties.Instance.ShowSpaces =
                    ReportDesignerTextEditorProperties.Instance.ShowTabs =
                    ReportDesignerTextEditorProperties.Instance.ShowEOLMarker =
                    ReportDesignerTextEditorProperties.Instance.ShowInvalidLines = value;

                if (SimpleDesktop.Desktop.ActiveViewContent is ITextEditorControlProvider viewContent)
                    viewContent.TextEditorControl.ActiveTextAreaControl.Refresh();
            }
        }
    }

    /// <summary>
    /// řazení výběru.
    /// </summary>
    public class SortSelection : AbstractMenuCommand
    {
        internal enum SortDirection
        {
            Ascending, Descending
        }

        class SortComparer : IComparer
        {
            readonly SortDirection sortDirection;
            readonly bool isCaseSensitive;
            readonly bool ignoreWhitespaces;

            public SortComparer()
            {
                isCaseSensitive = PropertyService.Get(SortOptionsDialog.caseSensitiveOption, true);
                ignoreWhitespaces = PropertyService.Get(SortOptionsDialog.ignoreWhiteSpacesOption, true);
                sortDirection = (SortDirection)PropertyService.Get(SortOptionsDialog.sortDirectionOption, SortDirection.Ascending);
            }

            /// <summary>
            /// Porovnání
            /// </summary>
            /// <param name="x">první argument porovnání</param>
            /// <param name="y">druhý argument porovnání</param>
            /// <returns></returns>
            public int Compare(object x, object y)
            {
                if (x == null || y == null)
                    return -1;
                string str1;
                string str2;

                if (sortDirection == SortDirection.Ascending)
                {
                    str1 = x.ToString();
                    str2 = y.ToString();
                }
                else
                {
                    str1 = y.ToString();
                    str2 = x.ToString();
                }

                if (ignoreWhitespaces)
                {
                    str1 = str1.Trim();
                    str2 = str2.Trim();
                }

                if (!isCaseSensitive)
                {
                    str1 = str1.ToUpper();
                    str2 = str2.ToUpper();
                }

                return str1.CompareTo(str2);
            }
        }

        /// <summary>
        /// řazení řádků
        /// </summary>
        /// <param name="document">dokument s obsahem</param>
        /// <param name="startLine">počáteční řádek</param>
        /// <param name="endLine">řádek konce</param>
        public void SortLines(IDocument document, int startLine, int endLine)
        {
            ArrayList lines = new ArrayList();
            for (int i = startLine; i <= endLine; ++i)
            {
                LineSegment line = document.GetLineSegment(i);
                lines.Add(document.GetText(line.Offset, line.Length));
            }

            lines.Sort(new SortComparer());

            bool removeDupes = PropertyService.Get(SortOptionsDialog.removeDupesOption, false);
            if (removeDupes)
                for (int i = 0; i < lines.Count - 1; ++i)
                    if (lines[i].Equals(lines[i + 1]))
                    {
                        lines.RemoveAt(i);
                        --i;
                    }

            for (int i = 0; i < lines.Count; ++i)
            {
                LineSegment line = document.GetLineSegment(startLine + i);
                document.Replace(line.Offset, line.Length, lines[i].ToString());
            }

            // odstranění duplicitních řádků
            for (int i = startLine + lines.Count; i <= endLine; ++i)
            {
                LineSegment line = document.GetLineSegment(startLine + lines.Count);
                document.Remove(line.Offset, line.TotalLength);
            }
        }
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            IViewContent viewContent = SimpleDesktop.Desktop.ActiveViewContent;

            if (viewContent == null || !(viewContent is ITextEditorControlProvider))
                return;

            using (SortOptionsDialog sortOptionsDialog = new SortOptionsDialog())
            {
                sortOptionsDialog.Owner = SimpleDesktop.MainForm;
                if (sortOptionsDialog.ShowDialog(SimpleDesktop.MainForm) == DialogResult.OK)
                {
                    TextArea textarea = ((ITextEditorControlProvider)viewContent).TextEditorControl.ActiveTextAreaControl.TextArea;
                    textarea.BeginUpdate();
                    if (textarea.SelectionManager.HasSomethingSelected)
                        foreach (ISelection selection in textarea.SelectionManager.SelectionCollection)
                            SortLines(textarea.Document, selection.StartPosition.Y, selection.EndPosition.Y);
                    else
                        SortLines(textarea.Document, 0, textarea.Document.TotalNumberOfLines - 1);
                    textarea.Caret.ValidateCaretPos();
                    textarea.EndUpdate();
                    textarea.Refresh();
                }
            }
        }
    }

}
