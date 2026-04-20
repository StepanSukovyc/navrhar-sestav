// <file>
//     <copyright see="prj:///doc/copyright.txt"/>
//     <license see="prj:///doc/license.txt"/>
//     <owner name="Mike Krüger" email="mike@icsharpcode.net"/>
//     <version>$Revision$</version>
// </file>

using System;
using System.Collections.Generic;
using System.Windows.Forms;
using Gordic.TextEditor.Document;
using Gordic.TextEditor.Misc.Util;

namespace Gordic.TextEditor.SearchAndReplace
{
    public class SearchReplaceManager
	{
		public static SearchAndReplaceDialog SearchAndReplaceDialog = null;
		
		static Search find = new Search();
		
		static SearchReplaceManager()
		{
			find.TextIteratorBuilder = new ForwardTextIteratorBuilder();
		}
		
		static void SetSearchOptions(IProgressMonitor monitor)
		{
			find.SearchStrategy   = SearchReplaceUtilities.CreateSearchStrategy(SearchOptions.SearchStrategyType);
			find.DocumentIterator = SearchReplaceUtilities.CreateDocumentIterator(SearchOptions.DocumentIteratorType, monitor);
		}

        static TextEditorControl textEditorControl;
		public static void Replace(IProgressMonitor monitor)
		{
			SetSearchOptions(monitor);

            if (lastResult != null && textEditorControl != null)
            {
                if (textEditorControl != null)
                {
                    SelectionManager selectionManager = textEditorControl.ActiveTextAreaControl.TextArea.SelectionManager;
					
					if (selectionManager.SelectionCollection.Count == 1
					    && selectionManager.SelectionCollection[0].Offset == lastResult.Offset
					    && selectionManager.SelectionCollection[0].Length == lastResult.Length)
					{
						string replacePattern = lastResult.TransformReplacePattern(SearchOptions.ReplacePattern);

                        textEditorControl.BeginUpdate();
						selectionManager.ClearSelection();
                        textEditorControl.Document.Replace(lastResult.Offset, lastResult.Length, replacePattern);
                        textEditorControl.ActiveTextAreaControl.Caret.Position = textEditorControl.Document.OffsetToPosition(lastResult.Offset + replacePattern.Length);
                        textEditorControl.EndUpdate();
					}
				}
			}
			FindNext(monitor);
		}
		
		static TextSelection textSelection;
		
		public static void ReplaceFirstInSelection(int offset, int length, IProgressMonitor monitor)
		{
			SetSearchOptions(monitor);
			FindFirstInSelection(offset, length, monitor);
		}
		
		public static bool ReplaceNextInSelection(IProgressMonitor monitor)
		{
            if (lastResult != null && textEditorControl != null)
            {
                if (textEditorControl != null)
                {
                    SelectionManager selectionManager = textEditorControl.ActiveTextAreaControl.TextArea.SelectionManager;
					
					if (selectionManager.SelectionCollection.Count == 1
					    && selectionManager.SelectionCollection[0].Offset == lastResult.Offset
					    && selectionManager.SelectionCollection[0].Length == lastResult.Length)
					{
						string replacePattern = lastResult.TransformReplacePattern(SearchOptions.ReplacePattern);

                        textEditorControl.BeginUpdate();
						selectionManager.ClearSelection();
                        textEditorControl.Document.Replace(lastResult.Offset, lastResult.Length, replacePattern);
                        textEditorControl.ActiveTextAreaControl.Caret.Position = textEditorControl.Document.OffsetToPosition(lastResult.Offset + replacePattern.Length);
                        textEditorControl.EndUpdate();
						
						textSelection.Length -= lastResult.Length - replacePattern.Length;
					}
				}
			}
			return FindNextInSelection(monitor);
		}
		
		public static void MarkAll(IProgressMonitor monitor)
		{
			SetSearchOptions(monitor);
			ClearSelection();
			find.Reset();
			if (!find.SearchStrategy.CompilePattern(monitor))
				return;
			List<TextEditorControl> textAreas = new List<TextEditorControl>();
			int count;
			for (count = 0;; count++) {
				SearchResultMatch result = SearchReplaceManager.find.FindNext(monitor);
				
				if (result == null) {
					break;
				} else {
					MarkResult(textAreas, result);
				}
			}
			find.Reset();
			foreach (TextEditorControl ctl in textAreas) {
				ctl.Refresh();
			}
			ShowMarkDoneMessage(count, monitor);
		}
		
		public static void MarkAll(int offset, int length, IProgressMonitor monitor)
		{
			SetSearchOptions(monitor);
			find.Reset();
			
			if (!find.SearchStrategy.CompilePattern(monitor))
				return;
			
			List<TextEditorControl> textAreas = new List<TextEditorControl>();
			int count;
			for (count = 0;; count++) {
				SearchResultMatch result = find.FindNext(offset, length);
				if (result == null) {
					break;
				} else {
					MarkResult(textAreas, result);
				}
			}
			find.Reset();
			foreach (TextEditorControl ctl in textAreas) {
				ctl.Refresh();
			}
			ShowMarkDoneMessage(count, monitor);
		}

        static void MarkResult(List<TextEditorControl> textAreas, SearchResultMatch result)
        {
            SetTextEditor(result);
            if (textEditorControl != null)
            {
                if (!textAreas.Contains(textEditorControl))
                    textAreas.Add(textEditorControl);
                textEditorControl.ActiveTextAreaControl.Caret.Position = textEditorControl.Document.OffsetToPosition(result.Offset);
                LineSegment segment = textEditorControl.Document.GetLineSegmentForOffset(result.Offset);

                int lineNr = segment.LineNumber;
                if (!textEditorControl.Document.BookmarkManager.IsMarked(lineNr))
                    textEditorControl.Document.BookmarkManager.ToggleMarkAt(new TextLocation(result.Offset - segment.Offset, lineNr));
            }
        }
		
		static void ShowMarkDoneMessage(int count, IProgressMonitor monitor)
		{
			if (count == 0) {
				ShowNotFoundMessage(monitor);
			} else {
				if (monitor != null) monitor.ShowingDialog = true;
                MessageService.ShowMessage(string.Format("Označeno vše '{0}'.", count.ToString()), "Konec");
				if (monitor != null) monitor.ShowingDialog = false;
			}
		}
		
		static void ShowReplaceDoneMessage(int count, IProgressMonitor monitor)
		{
			if (count == 0) {
				ShowNotFoundMessage(monitor);
			} else {
				if (monitor != null) monitor.ShowingDialog = true;
                MessageService.ShowMessage(string.Format("Nahrazeno '{0}'.", count.ToString()), "Hotovo");
				if (monitor != null) monitor.ShowingDialog = false;
			}
		}
		
		public static void ReplaceAll(IProgressMonitor monitor)
		{
			SetSearchOptions(monitor);
			ClearSelection();
			find.Reset();
			if (!find.SearchStrategy.CompilePattern(monitor))
				return;
			
			List<TextEditorControl> textAreas = new List<TextEditorControl>();
            textEditorControl = null;
            int count = 0;
            while (true)
            {
                SearchResultMatch result = find.FindNext(monitor);

                if (result == null)
                    break;
                if (textEditorControl == null)
                {
                    // we need to open another text area
                    SetTextEditor(result);
                    if (textEditorControl != null)
                        if (!textAreas.Contains(textEditorControl))
                        {
                            textEditorControl.BeginUpdate();
                            textEditorControl.ActiveTextAreaControl.TextArea.SelectionManager.SelectionCollection.Clear();
                            textAreas.Add(textEditorControl);
                        }
                }
                if (textEditorControl != null)
                {
                    string transformedPattern = result.TransformReplacePattern(SearchOptions.ReplacePattern);
                    find.Replace(result.Offset, result.Length, transformedPattern);
                    if (find.CurrentDocumentInformation.Document == null)
                        textEditorControl.Document.Replace(result.Offset, result.Length, transformedPattern);
                }

                count++;
            }
            find.Reset();

            if (count != 0)
                foreach (TextEditorControl ta in textAreas)
                {
                    ta.EndUpdate();
                    ta.Refresh();
                }

            ShowReplaceDoneMessage(count, monitor);
		}
		
		public static void ReplaceAll(int offset, int length, IProgressMonitor monitor)
		{
			SetSearchOptions(monitor);
			find.Reset();
			
			if (!find.SearchStrategy.CompilePattern(monitor))
				return;
			
			for (int count = 0;; count++) {
				SearchResultMatch result = find.FindNext(offset, length);
				if (result == null) {
					ShowReplaceDoneMessage(count, monitor);
					return;
				}
				
				string replacement = result.TransformReplacePattern(SearchOptions.ReplacePattern);
				find.Replace(result.Offset,
				             result.Length,
				             replacement);
				length -= result.Length - replacement.Length;
				
				// HACK - Move the cursor to the correct offset - the caret gets
				// moved before the replace range if we replace a string with a
				// single character. The ProvidedDocInfo.Replace method assumes that
				// the current offset is at the end of the found text which it is not.
				find.CurrentDocumentInformation.CurrentOffset = result.Offset + replacement.Length - 1;
			}
		}
		
		static SearchResultMatch lastResult = null;
		
		public static void FindNext(IProgressMonitor monitor)
		{
			SetSearchOptions(monitor);
			if (find == null ||
			    SearchOptions.FindPattern == null ||
			    SearchOptions.FindPattern.Length == 0) {
				return;
			}
			
			if (!find.SearchStrategy.CompilePattern(monitor)) {
				find.Reset();
				lastResult = null;
				return;
			}

            textEditorControl = null;
            while (textEditorControl == null)
            {
				SearchResultMatch result = find.FindNext(monitor);
				if (result == null) {
					ShowNotFoundMessage(monitor);
					find.Reset();
					lastResult = null;
					return;
				} else {
                    SetTextEditor(result);
                    if (textEditorControl != null)
                    {
						if (lastResult != null &&
                            textEditorControl.ActiveTextAreaControl.Caret.Offset != lastResult.Offset + lastResult.Length)
                        {
							find.Reset();
						}
                        int startPos = Math.Min(textEditorControl.Document.TextLength, Math.Max(0, result.Offset));
                        int endPos = Math.Min(textEditorControl.Document.TextLength, startPos + result.Length);

                        SearchReplaceUtilities.SelectText(textEditorControl, startPos, endPos);
						lastResult = result;
					}
				}
			}
		}
		
		static bool foundAtLeastOneItem = false;

		public static void FindFirstInSelection(int offset, int length, IProgressMonitor monitor)
		{
			foundAtLeastOneItem = false;
			textSelection = null;
			SetSearchOptions(monitor);
			
			if (find == null ||
			    SearchOptions.FindPattern == null ||
			    SearchOptions.FindPattern.Length == 0) {
				return;
			}
			
			if (!find.SearchStrategy.CompilePattern(monitor)) {
				find.Reset();
				lastResult = null;
				return;
			}
			
			textSelection = new TextSelection(offset, length);
			FindNextInSelection(monitor);
		}

		public static bool FindNextInSelection(IProgressMonitor monitor)
		{
            textEditorControl = null;
            while (textEditorControl == null)
            {
				SearchResultMatch result = find.FindNext(textSelection.Offset, textSelection.Length);
				if (result == null) {
					if (!foundAtLeastOneItem) {
						ShowNotFoundMessage(monitor);
					}
					find.Reset();
					lastResult = null;
					foundAtLeastOneItem = false;
					return false;
				} else {
					SetTextEditor(result);
                    if (textEditorControl != null)
                    {
						foundAtLeastOneItem = true;
						if (lastResult != null  &&
                            textEditorControl.ActiveTextAreaControl.Caret.Offset != lastResult.Offset + lastResult.Length)
                        {
						}
                        int startPos = Math.Min(textEditorControl.Document.TextLength, Math.Max(0, result.Offset));
                        int endPos = Math.Min(textEditorControl.Document.TextLength, startPos + result.Length);
                        SearchReplaceUtilities.SelectText(textEditorControl, startPos, endPos);
						lastResult = result;
					}
				}
			}
			return true;
		}
		
		static void ShowNotFoundMessage(IProgressMonitor monitor)
		{
			if (monitor != null && monitor.IsCancelled)
				return;
			if (monitor != null) monitor.ShowingDialog = true;
            MessageBox.Show("Hledaný výraz nebyl nalezen!",
                            "Výraz nebyl nalezen",
			                MessageBoxButtons.OK,
			                MessageBoxIcon.Information);
			if (monitor != null) monitor.ShowingDialog = false;
		}

        static void SetTextEditor(SearchResultMatch result)
        {
            textEditorControl = result.ProvidedDocumentInformation.TextAreaControl.TextArea.MotherTextEditorControl;
        }
		
		static void ClearSelection()
		{
            if (textEditorControl != null && textEditorControl.ActiveTextAreaControl.TextArea != null)
                textEditorControl.ActiveTextAreaControl.TextArea.SelectionManager.ClearSelection();
		}

        internal static void FindAll(IProgressMonitor monitor)
        {
            SetSearchOptions(monitor);
            ClearSelection();
            find.Reset();
            if (!find.SearchStrategy.CompilePattern(monitor))
                return;

            List<TextEditorControl> textAreas = new List<TextEditorControl>();
            int count = 0;
            while (true)
            {
                SearchResultMatch result = find.FindNext(monitor);
                if (result == null)
                    break;
                else SelectResult(textAreas, result);
                count++;
            }
            find.Reset();
            foreach (TextEditorControl ctl in textAreas)
                ctl.Refresh();

            ShowSelectDoneMessage(count, monitor);
        }

        static void ShowSelectDoneMessage(int count, IProgressMonitor monitor)
        {
            {
                if (count == 0)
                    ShowNotFoundMessage(monitor);
                else
                {
                    if (monitor != null) monitor.ShowingDialog = true;
                    MessageService.ShowMessage(string.Format("Nalezeno '{0}'.", count.ToString()), "Konec");
                    if (monitor != null) monitor.ShowingDialog = false;
                }
            }
        }

        private static void SelectResult(List<TextEditorControl> textAreas, SearchResultMatch result)
        {
            SetTextEditor(result);
            if (textEditorControl != null)
            {
                if (!textAreas.Contains(textEditorControl))
                    textAreas.Add(textEditorControl);
                SearchReplaceUtilities.MarkText(textEditorControl, result.Offset, result.Length);
            }

        }

        public static void FindAll(int offset, int length, IProgressMonitor monitor)
        {
            SetSearchOptions(monitor);
            ClearSelection();
            find.Reset();

            List<TextEditorControl> textAreas = new List<TextEditorControl>();
            int count = 0;
            while (true)
            {
                SearchResultMatch result = find.FindNext(offset, length);
                if (result == null)
                    break;
                else SelectResult(textAreas, result);
                count++;
            }
            find.Reset();
            foreach (TextEditorControl ctl in textAreas)
                ctl.Refresh();

            ShowSelectDoneMessage(count, monitor);
        }

    }
}
