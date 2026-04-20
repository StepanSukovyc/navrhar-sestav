//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.StringValueFilter.cs                     </Name>
//    <Description> Toto rozhraní je použito k filtrování hodnot definovaných v XML souborech.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.XmlForms
{
    /// <summary>
    /// Toto rozhraní je použito k filtrování hodnot definovaných v XML souborech.
    /// </summary>
    public class StringValueFilter : IStringValueFilter
    {
        /// <summary>
        /// Se volá pro každou hodnotu řetězec v souboru definice XML.
        /// </summary>
        /// <returns>
        /// Hodnota k filtraci
        /// </returns>
        public string GetFilteredValue(string originalValue)
        {
            return StringParser.Parse(originalValue);
        }
    }
}
