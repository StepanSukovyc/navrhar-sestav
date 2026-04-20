//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IconMaker.cs                            </Name>
//    <Description> Vytváří asociace mezi typy souborů nebo typy uzlů v prohlížeči projektu a ikony zdroje</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Collections;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Vytváří asociace mezi typy souborů nebo typy uzlů v prohlížeči projektu a ikony zdroje
    /// </summary>
    /// <attribute name="resource" use="required">
    /// Název obrázku ve zdroji
    /// </attribute>
    public class IconMaker : IMaker
    {
        /// <summary>
        /// Existuje podmínka spojená s daným filtrem.
        /// </summary>
        public bool HandleConditions { get { return false; } }

        /// <summary>
        /// Vytvoření objektu (ikonky)
        /// </summary>
        /// <param name="caller">Vlající sestavení</param>
        /// <param name="entity">Větev konfiguračního stromu</param>
        /// <param name="subItems">Podpoložky</param>
        /// <returns></returns>
        public object BuildItem(object caller, Entity entity, ArrayList subItems)
        {
            return new IconDescriptor(entity);
        }
    }
}
