//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TopComparer.cs                           </Name>
//    <Description> porovnání dle TOP hodnoty seznamu objektu                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-09-04                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Gui;
using System.Collections.Generic;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// porovnání dle TOP hodnoty seznamu objektu
    /// </summary>
    public class TopComparer : IComparer<object>
    {
        readonly bool desc = false;
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="desc">indikuje, že uspořádání je zapotřebí provest v obráceném pořadí</param>
        public TopComparer(bool desc) { this.desc = desc; }

        /// <exclude/>
        public int Compare(object cx, object cy)
        {
            var y = cy as ISizable;

            if (!(cx is ISizable x))
            {
                if (y == null)
                    return 0;
                // 'y' je větší
                return desc ? 1 : -1;
            }

            if (y == null)
                // 'x' je větší
                return desc ? -1 : 1;

            var xc = x.Top;
            var yc = y.Top;

            if (xc > yc)
                // 'x' je větší
                return desc ? -1 : 1;
            if (xc < yc)
                // 'y' je větší
                return desc ? 1 : -1;
            return 0;
        }
    }
}
