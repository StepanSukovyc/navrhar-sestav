//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.CurrentPanelPanel.cs                     </Name>
//    <Description> Aktuální panel                                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Drawing;
using System.Drawing.Drawing2D;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Aktuální panel
    /// </summary>
    class CurrentPanelPanel : UserControl
    {
        WizardDialog wizard;

        Font normalFont;

        /// <summary>
        /// Vztvoření nové instance třídy
        /// </summary>
        /// <param name="wizard">průvodce</param>
        public CurrentPanelPanel(WizardDialog wizard)
        {
            normalFont = WinFormsResourceService.LoadFont("SansSerif", 18, GraphicsUnit.World);

            this.wizard = wizard;
            Size = new Size(wizard.Width - 220, 30);
            ResizeRedraw = false;

            SetStyle(ControlStyles.UserPaint, true);
        }
        /// <exclude/>
        protected override void OnPaintBackground(PaintEventArgs pe)
        {
            Graphics g = pe.Graphics;
            using (Brush brush = new LinearGradientBrush(new Point(0, 0), new Point(Width, Height),
                                                         Color.White,
                                                         SystemColors.Control))
                g.FillRectangle(brush, new Rectangle(0, 0, Width, Height));
        }

        /// <exclude/>
        protected override void OnPaint(PaintEventArgs pe)
        {
            Graphics g = pe.Graphics;
            g.DrawString(((IDialogPanelDescriptor)wizard.WizardPanels[wizard.ActivePanelNumber]).Label, normalFont, Brushes.Black,
                         10,
                         24 - normalFont.Height,
                         StringFormat.GenericTypographic);
            g.DrawLine(Pens.Black, 10, 24, Width - 10, 24);
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // CurrentPanelPanel
            // 
            this.Name = "CurrentPanelPanel";
            this.ResumeLayout(false);
        }
    }
}
