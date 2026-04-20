// <file>
//     <copyright see="prj:///doc/copyright.txt"/>
//     <license see="prj:///doc/license.txt"/>
//     <owner name="Mike Krüger" email="mike@icsharpcode.net"/>
//     <version>$Revision$</version>
// </file>

namespace Gordic.TextEditor.Misc.XmlForms
{
    /// <summary>
    /// Toto rozhraní je použito k filtrování hodnot definovaných v XML souborech.
    /// </summary>
    public class SharpDevelopStringValueFilter : IStringValueFilter
    {
        /// <summary>
        /// Se volá pro každou hodnotu řetězec v souboru definice XML.
        /// </summary>
        /// <returns>
        /// Hodnota k filtraci
        /// </returns>
        public string GetFilteredValue(string originalValue)
        {
            string back = originalValue;
            return back;
        }
    }
}
