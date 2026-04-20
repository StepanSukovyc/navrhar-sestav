// <file>
//     <copyright see="prj:///doc/copyright.txt"/>
//     <license see="prj:///doc/license.txt"/>
//     <owner name="Mike Krüger" email="mike@icsharpcode.net"/>
//     <version>$Revision$</version>
//      <modify name="Stepan Sukovych" />
// </file>

using Gordic.TextEditor.Document;

namespace Gordic.TextEditor.SearchAndReplace
{
    public class ProvidedDocumentInformation
    {
        IDocument document;
        ITextBufferStrategy textBuffer;
        int currentOffset;
        TextAreaControl textAreaControl = null;

        public TextAreaControl TextAreaControl { get { return textAreaControl; } }

        public ITextBufferStrategy TextBuffer
        {
            get
            {
                return textBuffer;
            }
            set
            {
                textBuffer = value;
            }
        }

        public IDocument Document
        {
            get
            {
                return document;
            }
        }

        // TODO Caret == null
        // odkud to leze?
        public int CurrentOffset
        {
            get
            {
                return (textAreaControl != null && textAreaControl.Caret != null) 
                    ? textAreaControl.Caret.Offset : currentOffset;
            }
            set
            {
                if (textAreaControl != null && textAreaControl.Caret != null)
                    textAreaControl.Caret.Position = document.OffsetToPosition(value + 1);
                else
                    currentOffset = value;
            }
        }

        int endOffset = 0;
        public int EndOffset
        {
            get
            {
                //				if (document != null) {
                //					return SearchReplaceUtilities.CalcCurrentOffset(document);
                //				}
                return endOffset;
            }
        }

        public void Replace(int offset, int length, string pattern)
        {
            if (document != null)
            {
                document.Replace(offset, length, pattern);
            }
            else
            {
                textBuffer.Replace(offset, length, pattern);
            }

            if (offset <= CurrentOffset)
            {
                CurrentOffset = CurrentOffset - length + pattern.Length;
            }
        }

        public IDocument CreateDocument()
        {
            if (document != null)
            {
                return document;
            }
            return new DocumentFactory().CreateFromTextBuffer(textBuffer);
        }

        public override bool Equals(object obj)
        {
            ProvidedDocumentInformation info = obj as ProvidedDocumentInformation;
            if (info == null)
            {
                return false;
            }
            return this.textAreaControl == info.textAreaControl;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        public ProvidedDocumentInformation(IDocument document, int currentOffset)
        {
            this.document = document;
            this.textBuffer = document.TextBufferStrategy;
            this.endOffset = this.currentOffset = currentOffset;
        }

        public ProvidedDocumentInformation(IDocument document, TextAreaControl textAreaControl)
        {
            this.document = document;
            this.textBuffer = document.TextBufferStrategy;
            this.textAreaControl = textAreaControl;
            this.endOffset = this.CurrentOffset;
        }

        public ProvidedDocumentInformation(ITextBufferStrategy textBuffer, int currentOffset)
        {
            this.textBuffer = textBuffer;
            this.endOffset = this.currentOffset = currentOffset;
        }
    }
}
