// <file>
//     <copyright see="prj:///doc/copyright.txt"/>
//     <license see="prj:///doc/license.txt"/>
//     <owner name="Mike Krüger" email="mike@icsharpcode.net"/>
//     <version>$Revision$</version>
//      <modify name="Stepan Sukovych" />
// </file>

using System.Diagnostics;

namespace Gordic.TextEditor.SearchAndReplace
{
    public class ForwardTextIteratorBuilder : ITextIteratorBuilder
	{
		public ITextIterator BuildTextIterator(ProvidedDocumentInformation info)
		{
			Debug.Assert(info != null);
			return new ForwardTextIterator(info);
		}
	}
}
