//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SolutionLanguageBindingMaker.cs       </Name>
//    <Description> Maker na jazykovou vazbu                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-25                                                  </Created>
//  </FileHeader>

using System.Collections;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Project;

namespace Gordic.GFE.WinClient
{
    /// <summary>
    /// Maker na jazykovou vazbu
    /// </summary>
    class SolutionLanguageBindingMaker : IMaker
    {
        /// <exclude/>
        public bool HandleConditions { get { return false; } }

        /// <exclude/>
        public object BuildItem(object caller, Entity entity, ArrayList subItems)
        {
            return new SolutionBindingDescriptor(entity);
        }
    }

    /// <summary>
    /// Maker na typovou vazbu sestavení
    /// </summary>
    class SolutionTypeBindingMaker : IMaker
    {
        /// <exclude/>
        public bool HandleConditions { get { return false; } }

        /// <exclude/>
        public object BuildItem(object caller, Entity entity, ArrayList subItems)
        {
            return new SolutionTypeDescriptor(entity);
        }
    }
}
