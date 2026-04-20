//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ParserMaker.cs                          </Name>
//    <Description> Vytvoření ParserDescriptor objektů pro službu analyzvání obsahu.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Collections;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Vytvoření ParserDescriptor objektů pro službu analyzvání obsahu.
    /// </summary>
    sealed class ParserMaker : IMaker
    {
        /// <exclude/>
        public bool HandleConditions { get { return false; } }

        /// <exclude/>
        public object BuildItem(object caller, Entity entity, ArrayList subItems)
        {
            return new ParserDescriptor(entity);
        }
    }
}
