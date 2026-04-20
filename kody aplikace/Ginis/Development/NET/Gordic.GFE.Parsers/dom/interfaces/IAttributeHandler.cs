//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IAttributeHandler.cs                  </Name>
//    <Description> Vlastní slovník atributů                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Manpulátor atributů
    /// </summary>
    public interface IAttributeHandler
    {
        /// <summary>
        /// neznámé atributy
        /// </summary>
        Dictionary<string, string> Unknowns { get; }

        /// <summary>
        /// seznam atributů
        /// </summary>
        GFEAttrList AttrList { get; set; }
    }
}
