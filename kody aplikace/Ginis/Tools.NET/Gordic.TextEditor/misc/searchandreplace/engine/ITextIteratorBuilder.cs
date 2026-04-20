// <file>
//     <copyright see="prj:///doc/copyright.txt"/>
//     <license see="prj:///doc/license.txt"/>
//     <owner name="Mike Krüger" email="mike@icsharpcode.net"/>
//     <version>$Revision$</version>
//      <modify name="Stepan Sukovych" />
// </file>

namespace Gordic.TextEditor.SearchAndReplace
{
    /// <summary>
    /// Builds a text iterator object.
    /// </summary>
    public interface ITextIteratorBuilder
	{
		ITextIterator BuildTextIterator(ProvidedDocumentInformation info);
	}
}
