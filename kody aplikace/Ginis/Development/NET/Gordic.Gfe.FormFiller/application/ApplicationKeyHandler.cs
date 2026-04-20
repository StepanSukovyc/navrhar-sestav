//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.ApplicationKeyHandler.cs              </Name>
//    <Description> Odchycení zpráv hlavní aplikace                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.Gfe.FormFiller.Gui;
using Gordic.Gfe.FormFiller.ToolCommands;

namespace Gordic.Gfe.FormFiller.Core
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

            //if (keyPressed == Keys.F9)
            //    return ShowApplicationOptions.ShowSettings();

            return false;
        }
    }
}
