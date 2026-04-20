//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IConditionEvaluator.cs                   </Name>
//    <Description> Rozhraní pro třídy, které lze hodnotit dle podmínek uvedených ve stromě AddIn</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Rozhraní pro třídy, které lze hodnotit dle podmínek uvedených ve stromě AddIn
    /// </summary>
    public interface IConditionEvaluator
    {
        /// <summary>
        /// Podmínka platí
        /// </summary>
        /// <param name="caller">Vlastník</param>
        /// <param name="condition">Podmínka</param>
        /// <returns></returns>
        bool IsValid(object caller, Condition condition);
    }
}
