// <file>
//     <copyright see="prj:///doc/copyright.txt"/>
//     <license see="prj:///doc/license.txt"/>
//     <owner name="Mike Krüger" email="mike@icsharpcode.net"/>
//     <version>$Revision$</version>
// </file>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using Gordic.TextEditor.Document;
using Gordic.TextEditor.Misc.Util;

namespace Gordic.TextEditor.SearchAndReplace
{
    public sealed class SearchReplaceUtilities
	{
        public static TextEditorControl TextEditorControl { get; set; }
		public static bool IsTextAreaSelected {
			get {
                return TextEditorControl != null;
			}
		}
		
		public static TextEditorControl GetActiveTextEditor()
		{
            return TextEditorControl;
		}
		
		public static bool IsWholeWordAt(ITextBufferStrategy document, int offset, int length)
		{
			return (offset - 1 < 0 || Char.IsWhiteSpace(document.GetCharAt(offset - 1))) &&
				(offset + length + 1 >= document.Length || Char.IsWhiteSpace(document.GetCharAt(offset + length)));
		}
		
		public static ISearchStrategy CreateSearchStrategy(SearchStrategyType type)
		{
			switch (type) {
				case SearchStrategyType.Normal:
					return new BruteForceSearchStrategy(); // new KMPSearchStrategy();
				case SearchStrategyType.RegEx:
					return new RegExSearchStrategy();
				case SearchStrategyType.Wildcard:
					return new WildcardSearchStrategy();
				default:
					throw new System.NotImplementedException("CreateSearchStrategy for type " + type);
			}
		}
		
		public static IDocumentIterator CreateDocumentIterator(DocumentIteratorType type, IProgressMonitor monitor)
		{
			switch (type) {
				case DocumentIteratorType.CurrentDocument:
				case DocumentIteratorType.CurrentSelection:
					return new CurrentDocumentIterator(TextEditorControl);
				case DocumentIteratorType.Directory:
					try {
						if (!Directory.Exists(SearchOptions.LookIn)) {
							if (monitor != null) monitor.ShowingDialog = true;
                            MessageService.ShowMessageFormatted("Nenalezeno", "Složka '{0}' neexistuje.", FileUtility.NormalizePath(SearchOptions.LookIn));
							if (monitor != null) monitor.ShowingDialog = false;
							return new DummyDocumentIterator();
						}
					} catch (Exception ex) {
						if (monitor != null) monitor.ShowingDialog = true;
						MessageService.ShowMessage(ex.Message);
						if (monitor != null) monitor.ShowingDialog = false;
						return new DummyDocumentIterator();
					}
					return new DirectoryDocumentIterator(SearchOptions.LookIn,
					                                     SearchOptions.LookInFiletypes,
					                                     SearchOptions.IncludeSubdirectories);
				default:
					throw new System.NotImplementedException("CreateDocumentIterator for type " + type);
			}
		}
		
		static List<string> excludedFileExtensions;
		
		public static bool IsSearchable(string fileName)
		{
			if (fileName == null)
				return false;
			
			if (excludedFileExtensions == null) {
                excludedFileExtensions = new List<string>() { ".resx", ".resources", ".exe", ".dll", ".pdb" };
			}
			string extension = Path.GetExtension(fileName);
			if (extension != null) {
				foreach (string excludedExtension in excludedFileExtensions) {
					if (String.Compare(excludedExtension, extension, true) == 0) {
						return false;
					}
				}
			}
			return true;
		}
		
		public static void SelectText(TextEditorControl textArea, int offset, int endOffset)
		{
			int textLength = textArea.ActiveTextAreaControl.Document.TextLength;
			if (textLength < endOffset) {
				endOffset = textLength - 1;
			}
			textArea.ActiveTextAreaControl.Caret.Position = textArea.Document.OffsetToPosition(endOffset);
			textArea.ActiveTextAreaControl.TextArea.SelectionManager.ClearSelection();
			textArea.ActiveTextAreaControl.TextArea.SelectionManager.SetSelection(new DefaultSelection(textArea.Document, textArea.Document.OffsetToPosition(offset),
			                                                                                           textArea.Document.OffsetToPosition(endOffset)));
			textArea.Refresh();
		}

        //TODO: do properties dat vlastnosti označení textu
        public static void MarkText(TextEditorControl textArea, int offset, int lenght)
        {
            TextMarker marker = new TextMarker(offset, lenght, TextMarkerType.SolidBlock, SystemColors.Highlight, SystemColors.HighlightText);
            textArea.Document.MarkerStrategy.AddMarker(marker);
        }
    }
}
