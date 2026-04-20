//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IToolTip.cs                              </Name>
//    <Description> Rozhraní pro nápovědu                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-02                                                  </Created>
//  </FileHeader>

using Gordic.WinForms.Controls;
using System.Drawing;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní pro nápovědu
    /// </summary>
    public interface IToolTip
    {
        /// <summary>
        /// Text nápovědy
        /// </summary>
        HintText ToolTipText { get; }
        /// <summary>
        /// Ovladač nápovědy
        /// </summary>
        ScrollableControl Control { get; set; }
    }

    public class HintText : GHintText
    {
        public string ToolTipText { get; set; }
        
        public override bool IsEmpty { get { return string.IsNullOrEmpty(ToolTipText); } }

        Font textFont;
        public Font TextFont { get { return textFont; } set { textFont = value; } }

        public HintText(string text)
        {
            ToolTipText = text;
            textFont = new Font("arial", 8);
        }

        public override Size MeasureSize(Control c, GTooltipRenderer renderer)
        {
            return c.CreateGraphics().MeasureString(ToolTipText, TextFont).ToSize();
        }

        public override void Paint(Graphics graphics, GTooltipRenderer renderer, Font Font, Rectangle rect)
        {
            graphics.DrawString(ToolTipText, TextFont, Brushes.Black, new PointF(0, 0));
        }
    }
}
