//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DelayPaintItem.cs                        </Name>
//    <Description> položka zpožděného kreslení                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-04                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Drawing;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// porovnání zpožděných položek
    /// </summary>
    public class DelayPaintItemComparer : IEqualityComparer<DelayPaintItem>
    {
        /// <exclude/>
        public bool Equals(DelayPaintItem b1, DelayPaintItem b2) => b1.Paintable == b2.Paintable;

        /// <exclude/>
        public int GetHashCode(DelayPaintItem bx) => bx.Paintable != null ? bx.Paintable.GetHashCode() : bx.GetHashCode();
    }
    /// <summary>
    /// položka zpožděného kreslení
    /// </summary>
    public sealed class DelayPaintItem
    {
        /// <summary>
        /// indikuje, že objekt je "vybraný"
        /// </summary>
        public bool IsSelected { get; set; }

        /// <summary>
        /// kreslitelný objekt
        /// </summary>
        public IPaintable Paintable { get; set; }

        bool existsSurround = false;
        /// <summary>
        /// TRUE - existuje viditelný rámeček
        /// </summary>
        public bool ExistsSurround { get => existsSurround; }

        readonly Region region = null;

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="isSelected">indikace vybranosti objektu</param>
        /// <param name="region">Clip region</param>
        /// <param name="paintable">kreslící objekt</param>
        public DelayPaintItem(IPaintable paintable, bool isSelected, Region region)
        {
            Paintable = paintable;
            IsSelected = isSelected;
            this.region = region;
            ExistsFrame();
        }

        void ExistsFrame()
        {
            if (Paintable is ISurroundable && (Paintable as ISurroundable).Surround != null)
            {
                existsSurround = (Paintable as ISurroundable).Surround.Width.AllPixels > 0
                    || (Paintable as ISurroundable).Surround.Width.LeftPixels > 0
                    || (Paintable as ISurroundable).Surround.Width.RightPixels > 0
                    || (Paintable as ISurroundable).Surround.Width.BottomPixels > 0
                    || (Paintable as ISurroundable).Surround.Width.TopPixels > 0;

                return;
            }

            existsSurround = false;
        }

        /// <summary>
        /// kreslení rámečku objektu
        /// </summary>
        /// <param name="graphics">ovladač grafiky</param>
        public void Paint(Graphics graphics)
        {
            if (Paintable != null)
            {
                if (IsSelected)
                    Paintable.OnPaintBorder(graphics, IsSelected);
                else
                {
                    Region reg = graphics.Clip;
                    if (region != null && !IsSelected)
                        graphics.Clip = region;
                    Paintable.OnPaintBorder(graphics, IsSelected);
                    graphics.Clip = reg;
                }
            }
        }
    }
}
