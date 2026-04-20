//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TokensMaker.cs                           </Name>
//    <Description> Vytvoření TokensDescriptor objektu                          </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-11-27                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using System.Collections;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Vytvoření TokensDescriptor objektu
    /// </summary>
    class TokensMaker : IMaker
    {
        /// <exclude/>
        public bool HandleConditions { get { return false; } }
        /// <summary>
        /// Vytvoření klíčů
        /// </summary>
        /// <param name="caller"></param>
        /// <param name="entity">Větev konfiguračního stromu</param>
        /// <param name="subItems">Případné podpoložky</param>
        /// <returns></returns>
        public object BuildItem(object caller, Entity entity, ArrayList subItems)
        {
            return new TokensDescriptor(entity);
        }
    }
}
