// <file>
//     <copyright see="prj:///doc/copyright.txt"/>
//     <license see="prj:///doc/license.txt"/>
//     <owner name="Mike Krüger" email="mike@icsharpcode.net"/>
//     <version>$Revision$</version>
// </file>

using System;

namespace Gordic.TextEditor.Document
{
	/// <summary>
	/// This delegate is used for document events.
	/// </summary>
	public delegate void DocumentEventHandler(object sender, DocumentEventArgs e);
	
	/// <summary>
    /// Tato třída obsahuje více informací o akci dokumentů
	/// </summary>
	public class DocumentEventArgs : EventArgs, IDisposable
	{
		IDocument document;
		int       offset;
		int       length;
		string    text;
		
		/// <returns>
        /// vždy platný dokument, který se vztahuje k události.
		/// </returns>
        public IDocument Document { get { return document; } }
		
		/// <returns>
        /// -1, pokud žádný posun nebyl určen pro tuto akci
		/// </returns>
        public int Offset { get { return offset; } }
		
		/// <returns>
        /// null pokud žádný text nebyl určen pro tuto akci
		/// </returns>
        public string Text { get { return text; } }
		
		/// <returns>
        /// -1 pokud žádná délka nebylá určená pro tuto akci
		/// </returns>
        public int Length { get { return length; } }

        /// <summary>
        /// Vytvoření nové instance <see cref="DocumentEventArgs"/>
        /// </summary>
        /// <param name="document">platný dokument</param>
        public DocumentEventArgs(IDocument document) : this(document, -1, -1, null)
		{
		}
		
        /// <summary>
        /// Vytvoření nové instance <see cref="DocumentEventArgs"/>
        /// </summary>
        /// <param name="document">platný dokument</param>
        /// <param name="offset">počáteční pozice</param>
		public DocumentEventArgs(IDocument document, int offset) : this(document, offset, -1, null)
		{
		}

        /// <summary>
        /// Vytvoření nové instance <see cref="DocumentEventArgs"/>
        /// </summary>
        /// <param name="document">platný dokument</param>
        /// <param name="offset">počáteční pozice</param>
        /// <param name="length">délká řetězce</param>
		public DocumentEventArgs(IDocument document, int offset, int length) : this(document, offset, length, null)
		{
		}

        /// <summary>
        /// Vytvoření nové instance <see cref="DocumentEventArgs"/>
        /// </summary>
        /// <param name="document">platný dokument</param>
        /// <param name="offset">počáteční pozice</param>
        /// <param name="length">délká řetězce</param>
        /// <param name="text">daný řetězec</param>
		public DocumentEventArgs(IDocument document, int offset, int length, string text)
		{
			this.document = document;
			this.offset   = offset;
			this.length   = length;
			this.text     = text;
		}
        /// <summary>
        /// převod argumentu na řetězec
        /// </summary>
        /// <returns></returns>
		public override string ToString()
		{
			return String.Format("[DocumentEventArgs: document = {0}, pozice = {1}, text = {2}, délka = {3}]",
			                     Document,
			                     Offset,
			                     Text,
			                     Length);
		}

        /// <summary>
        /// uvolnění objektu
        /// </summary>
        public void Dispose() { }
    }
}
