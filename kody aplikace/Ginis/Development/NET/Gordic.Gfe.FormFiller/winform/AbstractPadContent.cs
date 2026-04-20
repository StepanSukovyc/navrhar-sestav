//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.AbstractPadContent.cs                 </Name>
//    <Description> abstractní třída záložek                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.Gfe.FormFiller.Gui;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.Gfe.FormFiller.Pads
{
    /// <summary>
    /// abstractní třída záložek
    /// </summary>
    abstract class AbstractPadContent : IPadContent
    {
        /// <summary>
        /// Ovladač uvnitř záložky
        /// </summary>
        public abstract Control Control { get; }

        /// <summary>
        /// Překreslení obsahu záložky
        /// </summary>
        public virtual void RedrawContent() { }

        /// <summary>
        /// Uvolnění záložky
        /// </summary>
        public virtual void Dispose() { }

        /// <summary>
        /// Přenesení záložky do popředí
        /// </summary>
        /// <param name="layout">Rozvržení pracovní plochy</param>
        public void BringToFront(IDesktopLayout layout)
        {
            PadDescriptor d = this.PadDescriptor;
            if (d != null)
                d.BringPadToFront(layout);
        }

        /// <summary>
        /// Descriptor záložky
        /// </summary>
        protected virtual PadDescriptor PadDescriptor
        {
            get
            {
                if (SimpleDesktop.Desktop == null || SimpleDesktop.Desktop.DesktopLayout == null)
                    return null;
                return SimpleDesktop.Desktop.GetPad(GetType());
            }
        }

        /// <summary>
        /// Indikuje viditelnost záložky
        /// </summary>
        public bool IsVisible
        {
            get
            {
                Control ctl = this.Control;
                return ctl.Visible && ctl.Width > 0 && ctl.Height > 0;
            }
        }
    }
}
