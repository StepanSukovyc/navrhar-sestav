//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FontPreviewPanel.cs                    </Name>
//    <Description> Náhled písma                                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2010-07-22                                                  </Created>
//  </FileHeader>

using System.Drawing;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.Base
{
    /// <summary>
    /// Náhled písma
    /// </summary>
    public class FontPreviewPanel : Panel
    {
        /// <summary>
        /// 
        /// </summary>
        public override string Text { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public Color TextColor { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="e"></param>
        protected override void OnPaint(PaintEventArgs e)
        {
            Graphics panelGraphics = CreateGraphics();
            SizeF textSize = panelGraphics.MeasureString(Text, this.Font);
            panelGraphics.DrawString(Text, this.Font, new SolidBrush(ForeColor), new PointF(Width / 2 - textSize.Width / 2 - 4, Height / 2 - textSize.Height / 2 - 4));
            base.OnPaint(e);
        }
    }
}
