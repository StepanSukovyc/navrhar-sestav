//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.MouseWheelHandler.cs                   </Name>
//    <Description> Hromadí delty kolečkem myši a hlásí skutečný počet řádků přetáčení.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-08                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Utils
{
    /// <summary>
    /// Hromadí delty kolečkem myši a hlásí skutečný počet řádků přetáčení.
    /// </summary>
    public sealed class MouseWheelHandler
    {
        const int WHEEL_DELTA = 120;

        int mouseWheelDelta;

        /// <summary>
        /// Získání počtu řádků
        /// </summary>
        /// <param name="e"></param>
        /// <returns></returns>
        public int GetScrollAmount(MouseEventArgs e)
        {
            mouseWheelDelta += e.Delta;
            //Console.WriteLine(GResources.GetResourceText(29450497) + ": " + GResources.GetResourceText(29450498) + " delta=" + e.Delta + ", " + GResources.GetResourceText(29450499) + " delta=" + mouseWheelDelta); //RC 29450499 : celkem

            int linesPerClick = Math.Max(SystemInformation.MouseWheelScrollLines, 1);

            int scrollDistance = mouseWheelDelta * linesPerClick / WHEEL_DELTA;
            mouseWheelDelta %= Math.Max(1, WHEEL_DELTA / linesPerClick);
            return scrollDistance;
        }
        /// <summary>
        /// Přetáčebí
        /// </summary>
        /// <param name="scrollBar">Lišta přetáčení</param>
        /// <param name="e"></param>
        public void Scroll(ScrollBar scrollBar, MouseEventArgs e)
        {
            int newvalue = scrollBar.Value - GetScrollAmount(e) * scrollBar.SmallChange;
            scrollBar.Value = Math.Max(scrollBar.Minimum, Math.Min(scrollBar.Maximum - scrollBar.LargeChange + 1, newvalue));
        }
    }
}
