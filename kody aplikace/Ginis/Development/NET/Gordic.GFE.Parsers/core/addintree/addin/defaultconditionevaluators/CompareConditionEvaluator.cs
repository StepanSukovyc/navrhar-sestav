//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.CompareConditionEvaluator.cs             </Name>
//    <Description> Porovnání dvou řetězců.                                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-22                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Porovnání dvou řetězců.
    /// Řetězcy jsou po zpracování StringParser.<br/>
    /// </summary>
    /// <attribute name="string">
    /// První řetězec.
    /// </attribute>
    /// <attribute name="equals">
    /// Druhý řetězec.
    /// </attribute>
    /// <attribute name="comparisonType">
    /// Režim srovnání: pole výčtu System.StringComparison. Výchozí je 'OrdinalIgnoreCase'.
    /// </attribute>
    public class CompareConditionEvaluator : IConditionEvaluator
    {
        /// <summary>
        /// Kontrola platnosti
        /// </summary>
        /// <param name="caller">Volaný objekt</param>
        /// <param name="condition">Podmmínka</param>
        /// <returns></returns>
        public bool IsValid(object caller, Condition condition)
        {
            string comparisonTypeText = condition.Properties["comparisonType"];
            StringComparison comparisonType;
            if (string.IsNullOrEmpty(comparisonTypeText))
                comparisonType = StringComparison.OrdinalIgnoreCase;
            else
                comparisonType = (StringComparison)Enum.Parse(typeof(StringComparison), comparisonTypeText);

            return string.Equals(StringParser.Parse(condition.Properties["string"]),
                                 StringParser.Parse(condition.Properties["equals"]),
                                 comparisonType);
        }
    }
}
