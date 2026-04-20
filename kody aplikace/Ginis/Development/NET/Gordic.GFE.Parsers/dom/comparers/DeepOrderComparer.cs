//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DeepOrderComparer.cs                     </Name>
//    <Description> hloubkové porovnání dle pořadového seznamu objektu          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-11                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// hloubkové porovnání dle pořadového seznamu objektu
    /// </summary>
    public class DeepOrderComparer : IComparer<IComponent>
    {
        readonly bool desc = false;
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="desc">indikuje, že uspořádání je zapotřebí provest v obráceném pořadí</param>
        public DeepOrderComparer(bool desc)
        {
            this.desc = desc;
        }
        /// <summary>
        /// porovnání dvou komponent
        /// </summary>
        /// <param name="cx">levá komponenta k porovnání</param>
        /// <param name="cy">pravá komponenta k porovnání</param>
        /// <returns>-1 - pravá komponenta je "první"; 0 - komponenty jsou rovné; 1 - levá komponenta je "první".</returns>
        public int Compare(IComponent cx, IComponent cy)
        {
            var y = cy as IOrder;

            if (!(cx is IOrder x))
            {
                if (y == null)
                    return 0;
                // 'y' je větší
                return desc ? 1 : -1;
            }

            if (y == null)
                    // 'x' je větší
                    return desc ? -1 : 1;

                var xc = x.Order.Count;
                var yc = y.Order.Count;
                var mc = Math.Min(xc, yc);

                for (int index = 0; index < mc; index++)
                {
                    var xo = x.Order[index];
                    var yo = y.Order[index];
                    if (xo < yo)
                        // 'y' je větší
                        return desc ? 1 : -1;
                    if (xo > yo)
                        // 'x' je větší
                        return desc ? -1 : 1;
                }

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
