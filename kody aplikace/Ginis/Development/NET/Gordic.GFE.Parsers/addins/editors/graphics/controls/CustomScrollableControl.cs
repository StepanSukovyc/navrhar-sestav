//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.CustomScrollableControl.cs               </Name>
//    <Description> Vlastní ovladač pro skrovotalý panel                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-03                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Vlastní ovladač pro skrovotalý panel
    /// </summary>
    public partial class CustomScrollableControl : UserControl
    {
        /// <summary>
        /// Panel ovladače
        /// </summary>
        public Control Control { get { return innerPanel; } }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public CustomScrollableControl()
        {
            InitializeComponent();
            this.hScrollBar.Scroll += delegate { innerPanel.HorizontalScroll.Value = hScrollBar.Value; };
            this.vScrollBar.Scroll += delegate { innerPanel.VerticalScroll.Value = vScrollBar.Value; };
            this.innerPanel.SizeChanged += InnerPanelClientSizeChanged;
        }

        bool isChanging = false;

        void InnerPanelClientSizeChanged(object sender, EventArgs e)
        {
            if (isChanging)
                return;

            vScrollBar.Enabled = innerPanel.Height < innerPanel.DisplayRectangle.Height;
            hScrollBar.Enabled = innerPanel.Width < innerPanel.DisplayRectangle.Width;

            if (vScrollBar.Enabled)
            {
                isChanging = true;
                innerPanel.Width = vScrollBar.Left + vScrollBar.Width;
                isChanging = false;

                vScrollBar.Maximum = innerPanel.VerticalScroll.Maximum;
                vScrollBar.Minimum = innerPanel.VerticalScroll.Minimum;
                vScrollBar.LargeChange = innerPanel.VerticalScroll.LargeChange + 16;// + 16 - je výška spodního posuvníka
                vScrollBar.Value = innerPanel.VerticalScroll.Value;
            }
            else
            {
                isChanging = true;
                if (innerPanel.Width > vScrollBar.Left)
                    innerPanel.Width = vScrollBar.Left;
                isChanging = false;
            }

            if (hScrollBar.Enabled)
            {
                isChanging = true;
                innerPanel.Height = hScrollBar.Top + hScrollBar.Height;
                isChanging = false;

                hScrollBar.Maximum = innerPanel.HorizontalScroll.Maximum;
                hScrollBar.Minimum = innerPanel.HorizontalScroll.Minimum;
                hScrollBar.LargeChange = innerPanel.HorizontalScroll.LargeChange;
                hScrollBar.Value = innerPanel.HorizontalScroll.Value;
            }
            else
            {
                isChanging = true;
                if (innerPanel.Height > hScrollBar.Top)
                    innerPanel.Height = hScrollBar.Top;
                isChanging = false;
            }
        }
    }
}
