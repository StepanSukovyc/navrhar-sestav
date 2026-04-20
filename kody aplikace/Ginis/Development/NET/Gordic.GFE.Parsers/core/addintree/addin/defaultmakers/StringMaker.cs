//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.StringMaker.cs                          </Name>
//    <Description> Vytvoření řetězce.                                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-22                                                  </Created>
//  </FileHeader>

using System.Collections;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Vytvoření řetězce.
    /// </summary>
    /// <attribute name="text" use="required">
    /// Řetězec na vrácení.
    /// </attribute>
    /// <returns>
    /// Řetězec specifikovaný hodnotou 'text', který je transformován metodou StringParser.
    /// </returns>
    public class StringMaker : IMaker
    {
        /// <summary>
        /// Existuje podmínka spojená s daným filtrem.
        /// </summary>
        public bool HandleConditions { get { return false; } }

        /// <summary>
        /// Vytvoření položky
        /// </summary>
        /// <param name="caller">Volající aplikace</param>
        /// <param name="entity">Položka konfiguračního stromu</param>
        /// <param name="subItems">Podpoložky</param>
        /// <returns></returns>
        public object BuildItem(object caller, Entity entity, ArrayList subItems)
        {
            return StringParser.Parse(entity.Properties["text"]);
        }
    }
}
