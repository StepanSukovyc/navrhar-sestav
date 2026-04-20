// <file>
//     <copyright see="prj:///doc/copyright.txt"/>
//     <license see="prj:///doc/license.txt"/>
//     <owner name="Mike Krüger" email="mike@icsharpcode.net"/>
//     <version>$Revision$</version>
//      <modify name="Stepan Sukovych" />
// </file>

namespace Gordic.TextEditor.SearchAndReplace
{
    public class CurrentDocumentIterator : IDocumentIterator
	{
		bool      didRead = false;
        TextEditorControl textEditorControl;
        public CurrentDocumentIterator(TextEditorControl textEditor)
		{
            this.textEditorControl = textEditor;
			Reset();
		}
			
		public ProvidedDocumentInformation Current {
			get {
				if (!SearchReplaceUtilities.IsTextAreaSelected) {
					return null;
				}
                return new ProvidedDocumentInformation(textEditorControl.Document, textEditorControl.ActiveTextAreaControl);
			}
		}
			
		public bool MoveForward() 
		{
			if (!SearchReplaceUtilities.IsTextAreaSelected) {
				return false;
			}
			if (didRead) {
				return false;
			}
			didRead = true;
			
			return true;
		}
		
		public bool MoveBackward()
		{
			return MoveForward();
		}
		
		public void Reset() 
		{
			didRead = false;
		}
	}
}
