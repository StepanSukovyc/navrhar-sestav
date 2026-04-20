//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ResourceFileMaker.cs                  </Name>
//    <Description> Vytvoření položek zdroje z konfiguračního souboru           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System.Collections;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Vytvoření položek zdroje z konfiguračního souboru
    /// </summary>
    class ResourceFileMaker : IMaker
    {
        /// <exclude/>
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
            return entity.Properties["name"];
        }
    }
}
