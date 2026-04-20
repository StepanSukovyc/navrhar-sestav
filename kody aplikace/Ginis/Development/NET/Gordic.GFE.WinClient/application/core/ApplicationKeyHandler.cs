//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ApplicationKeyHandler.cs               </Name>
//    <Description> Odchycení zpráv hlavní aplikace                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-12-21                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.WinClient.Gui;

namespace Gordic.GFE.WinClient.Core
{
    /// <summary>
    /// Odchycení zpráv hlavní aplikace
    /// </summary>
    class ApplicationKeyHandler : IMessageFilter
    {
        const int keyPressedMessage = 0x100;

        /// <summary>
        /// Odchycení zpráv aplikace
        /// </summary>
        /// <param name="m">Odchycená zprava</param>
        /// <returns></returns>
        public bool PreFilterMessage(ref Message m)
        {
            if (m.Msg != keyPressedMessage)
                return false;

            Keys keyPressed = (Keys)m.WParam.ToInt32() | Control.ModifierKeys;
            if (keyPressed == Keys.Escape)
                return SimpleDesktop.MainForm.PreProcessMessage(ref m);

            return false;
        }
    }
}
