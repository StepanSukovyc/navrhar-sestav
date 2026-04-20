//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Gui.StatusPanel.cs                           </Name>
//    <Description> Status panel                                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Drawing;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Status panel
    /// </summary>
    class StatusPanel : UserControl
    {
        WizardDialog wizard;

        Font smallFont;
        readonly Font normalFont;
        readonly Font boldFont;
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="wizard">průvodce</param>
        public StatusPanel(WizardDialog wizard)
        {
            smallFont = WinFormsResourceService.LoadFont("Tahoma", 14, GraphicsUnit.World);
            normalFont = WinFormsResourceService.LoadFont("Tahoma", 14, GraphicsUnit.World);
            boldFont = WinFormsResourceService.LoadFont("Tahoma", 14, FontStyle.Bold, GraphicsUnit.World);

            this.wizard = wizard;
            this.BackgroundImage = WinFormsResourceService.GetBitmap("Icons__Gin__aplikace_nastaveni_uzivatelske");//Properties.Resources. ("GeneralWizardBackground");
            this.BackgroundImageLayout = ImageLayout.Center;

            Size = new Size(198, 400);
            ResizeRedraw = false;

            SetStyle(ControlStyles.UserPaint, true);
            SetStyle(ControlStyles.OptimizedDoubleBuffer, true);
            SetStyle(ControlStyles.AllPaintingInWmPaint, true);
        }

        /// <summary>
        /// Kreslení objektu
        /// </summary>
        /// <param name="pe">argument kreslení</param>
        protected override void OnPaint(PaintEventArgs pe)
        {
            Graphics g = pe.Graphics;

            g.DrawString(GResources.GetResourceText(29450398), //RC 29450398 : Kroky
                         smallFont,
                         SystemBrushes.WindowText,
                         10,
                         24 - smallFont.Height);

            g.DrawLine(SystemPens.WindowText, 10, 24, Width - 10, 24);

            int curNumber = 0;
            for (int i = 0; i < wizard.WizardPanels.Count; i = wizard.GetSuccessorNumber(i))
            {
                Font curFont = wizard.ActivePanelNumber == i ? boldFont : normalFont;
                IDialogPanelDescriptor descriptor = ((IDialogPanelDescriptor)wizard.WizardPanels[i]);
                g.DrawString((1 + curNumber) + ". " + descriptor.Label, curFont, SystemBrushes.WindowText, 10, 40 + curNumber * curFont.Height);
                ++curNumber;
            }
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // StatusPanel
            // 
            this.Name = "StatusPanel";
            this.ResumeLayout(false);

        }
    }
}
