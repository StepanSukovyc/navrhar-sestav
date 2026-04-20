// <file>
//     <copyright see="prj:///doc/copyright.txt"/>
//     <license see="prj:///doc/license.txt"/>
//     <owner name="Mike Krüger" email="mike@icsharpcode.net"/>
//     <version>$Revision$</version>
// </file>

using System.Windows.Forms;

namespace Gordic.TextEditor.Gui.CompletionWindow
{
    /// <summary>
    /// nastavení automatického dokončování
    /// </summary>
    public interface ICompletionOptions
    {
        /// <summary>
        /// automatické vložení jednoznačného textu
        /// </summary>
        bool AutomateCompleteIfUnique { get; }
        /// <summary>
        /// zobrazit deklarační okno ()
        /// </summary>
        bool ShowDescriptionWindow { get; }
    }
    /// <summary>
    /// rozhraní poskytovatele dat pro dokončení textu
    /// </summary>
	public interface ICompletionDataProvider
	{
        /// <summary>
        /// seznam dostupných obrázků
        /// </summary>
        ImageList ImageList { get; }
        /// <summary>
        /// vstupní řetězec
        /// </summary>
        string PreSelection { get; }
		/// <summary>
        /// Načte index prvku v seznamu, který je vybrán ve výchozím nastavení.
		/// </summary>
        int DefaultIndex { get; }


		/// <summary>
		/// Zperacování kláves. 
        /// Vrátí akci, která má být spuštěna po stisknutí klávesy
		/// </summary>
		CompletionDataProviderKeyResult ProcessKey(char key);
		
		/// <summary>
		/// Provedení vložení. 
        /// Poskytovatel by měl určit pozici vložení a dostupná data
		/// </summary>
		bool InsertAction(ICompletionData data, TextArea textArea, int insertionOffset, char key);
		
		/// <summary>
		/// Generovaní položek doplnění. 
        /// Volá se textovým editorem.
		/// </summary>
		ICompletionData[] GenerateCompletionData(string fileName, TextArea textArea, char charTyped);

        /// <summary>
        /// nastavení doplňování dat
        /// </summary>
        ICompletionOptions Options { get; set; }
	}
	
	public enum CompletionDataProviderKeyResult
	{
		/// <summary>
		/// Normal key, used to choose an entry from the completion list
		/// </summary>
		NormalKey,
		/// <summary>
		/// This key triggers insertion of the completed expression
		/// </summary>
		InsertionKey,
		/// <summary>
		/// Increment both start and end offset of completion region when inserting this
		/// key. Can be used to insert whitespace (or other characters) in front of the expression
		/// while the completion window is open.
		/// </summary>
		BeforeStartKey
	}
}
