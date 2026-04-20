// <file>
//     <copyright see="prj:///doc/copyright.txt"/>
//     <license see="prj:///doc/license.txt"/>
//     <owner name="Mike Krüger" email="mike@icsharpcode.net"/>
//     <version>$Revision$</version>
// </file>

using System.Drawing;

namespace Gordic.TextEditor.Document
{
	/// <summary>
    /// Rozhraní představující část aktuálního výběru.
	/// </summary>
	public interface ISelection
	{
        /// <summary>
        /// Pozice začátku výběru
        /// </summary>
        TextLocation StartPosition { get; set; }
        /// <summary>
        /// Pozice konce výběru
        /// </summary>
        TextLocation EndPosition { get; set; }
        /// <summary>
        /// Offset začátku
        /// </summary>
        int Offset { get; }
		/// <summary>
		/// Offset konce
		/// </summary>
        int EndOffset { get; }
		/// <summary>
		/// délka části
		/// </summary>
        int Length { get; }
		
		/// <value>
        /// Vrací true, pokud je výběr obdélníkový
		/// </value>
        bool IsRectangularSelection { get; }
		/// <value>
        /// Vrací true, pokud je výběr prázdný
		/// </value>
        bool IsEmpty { get; }
		/// <value>
        /// Text, který je vybrán tímto výběrem.
		/// </value>
        string SelectedText { get; }
		
        /// <summary>
        /// Indikuje, zda výběr obsahuje offset
        /// </summary>
        /// <param name="offset">Offset pro kontrolu</param>
        /// <returns>TRUE - pokud výběr obsahuje daný offset, jinak FALSE</returns>
		bool ContainsOffset(int offset);
		/// <summary>
		/// Zjištění, zda výběr obsahuje pozici
		/// </summary>
		/// <param name="position">Pozice pro zjištění</param>
        /// <returns>TRUE - pokud výběr obsahuje danou pozici, jinak FALSE</returns>
        bool ContainsPosition(TextLocation position);
	}
}
