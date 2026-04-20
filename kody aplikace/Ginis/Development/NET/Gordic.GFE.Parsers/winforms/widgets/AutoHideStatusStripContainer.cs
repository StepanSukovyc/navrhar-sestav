//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AutoHideStatusStripContainer.cs        </Name>
//    <Description> AutoHideStatusStripContainer můžeme použit v StatusStrip pro získání lišty statusu</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-12-24                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Widgets
{
    /// <summary>
    /// AutoHideStatusStripContainer můžeme použit v StatusStrip pro získání lišty statusu
    /// která se automiticky skrývá nebo zobŕazuje
    /// </summary>
    public class AutoHideStatusStripContainer : AutoHideContainer
    {
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="statusStrip">Lišta statusu</param>
        public AutoHideStatusStripContainer(StatusStrip statusStrip)
            : base(statusStrip)
        {
            statusStrip.AutoSize = false;
            statusStrip.MouseMove += StatusStripMouseMove;
            statusStrip.ItemAdded += delegate(object sender, ToolStripItemEventArgs e)
            {
                e.Item.MouseMove += StatusStripMouseMove;
            };
            foreach (ToolStripItem i in statusStrip.Items)
                i.MouseMove += StatusStripMouseMove;
        }

        void StatusStripMouseMove(object sender, MouseEventArgs e)
        {
            if (e.Y < control.Height / 2)
                ShowOverlay = false;
        }
    }
}
