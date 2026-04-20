//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IMaker.cs                               </Name>
//    <Description> Rozhraní tříd, které lze vytvořit z větve konfiguračního stromu.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Collections;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Rozhraní tříd, které lze vytvořit z větve konfiguračního stromu.
    /// </summary>
    public interface IMaker
    {
        /// <summary>
        /// Vázaná podmínka
        /// </summary>
        bool HandleConditions { get; }

        /// <summary>
        /// Konstruktor položky
        /// </summary>
        /// <param name="caller">Vlastník.</param>
        /// <param name="entity">Jednotka s informáci potřebnou pro vytvoření objektu</param>
        /// <param name="subItems">Seznam položek vytvořených jiným dozzer objektem pro dané podpoložky.</param>
        /// <returns>Vytvoření položky.</returns>
        object BuildItem(object caller, Entity entity, ArrayList subItems);
    }
}
