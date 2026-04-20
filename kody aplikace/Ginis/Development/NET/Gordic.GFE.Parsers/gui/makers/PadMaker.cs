//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.PadMaker.cs                             </Name>
//    <Description> Vytvoření PadDescriptor objektu pro ReportDesigner podložku.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Collections;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Vytvoření PadDescriptor objektu pro ReportDesigner podložku.
    /// </summary>
    class PadMaker : IMaker
    {
        /// <exclude/>
        public bool HandleConditions { get { return false; } }
        /// <summary>
        /// Vytvoření podpoložek
        /// </summary>
        /// <param name="caller"></param>
        /// <param name="entity">Větev konfiguračního stromu</param>
        /// <param name="subItems">Případné podpoložky</param>
        /// <returns></returns>
        public object BuildItem(object caller, Entity entity, ArrayList subItems)
        {
            return new PadDescriptor(entity);
        }
    }
}
