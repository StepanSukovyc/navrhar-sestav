//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DisplayBindingMaker.cs                  </Name>
//    <Description> Vytvoření DisplayBindingDescriptor objektů.                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Collections;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Vytvoření DisplayBindingDescriptor objektů.
    /// </summary>
    class DisplayBindingMaker : IMaker
    {
        /// <summary>
        /// Položka se vyloučí, v případě, že podmínka není splněná.
        /// </summary>
        public bool HandleConditions { get { return false; } }

        /// <summary>
        /// Vytvoření položky s podpoložkami.
        /// </summary>
        /// <param name="caller"></param>
        /// <param name="entity">Jednotka s informaci</param>
        /// <param name="subItems"></param>
        /// <returns></returns>
        public object BuildItem(object caller, Entity entity, ArrayList subItems)
        {
            return new DisplayBindingDescriptor(entity);
        }
    }
}
