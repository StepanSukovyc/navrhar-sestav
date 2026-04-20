//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DragDropItemMaker.cs                    </Name>
//    <Description> Vytvoření položky pro tažení nových komponent z lišty.      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Collections;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Vytvoření položky pro tažení nových komponent z lišty.
    /// </summary>
    class DragDropItemMaker : IMaker
    {
        /// <summary>
        /// Podmínka vázaná na položku.
        /// </summary>
        public bool HandleConditions { get { return true; } }

        /// <summary>
        /// Vytvoření položky
        /// </summary>
        /// <param name="caller">Volající objekt</param>
        /// <param name="entity">Položka konfiguračního stromu</param>
        /// <param name="subItems">Případné podpoložky</param>
        /// <returns></returns>
        public object BuildItem(object caller, Entity entity, ArrayList subItems)
        {
            return new CustomComponentItem(entity.Properties["tag"], entity.Properties["type"], subItems);
        }
    }
}
