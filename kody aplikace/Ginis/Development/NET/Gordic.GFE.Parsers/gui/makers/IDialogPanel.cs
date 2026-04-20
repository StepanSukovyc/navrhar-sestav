//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IDialogPanel.cs                        </Name>
//    <Description> Výsledky dialogu                                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-01-24                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Panel, který se nachází v dialogovém okně
    /// </summary>
    public interface IDialogPanel
    {
        /// <summary>
        /// Některé panely pro přizpůsobení dialogového okna.
        /// </summary>
        object CustomizationObject { get; set; }
        /// <summary>
        /// Ovladač dialogového okna
        /// </summary>
        Control Control { get; }
        /// <summary>
        /// dostupnost je ukončená
        /// </summary>
        bool EnableFinish { get; }
        /// <summary>
        /// Reaguje na ukončení dostupnosti
        /// </summary>
        event EventHandler EnableFinishChanged;
        /// <returns>
        /// TRUE, pokud DialogMessage nemůžeme provest.
        /// </returns>
        bool ReceiveDialogMessage(DialogMessage message);
        /// <summary>
        /// Ikonka panelu
        /// </summary>
        Icon Icon { get; }
        /// <summary>
        /// Wizard
        /// </summary>
        WizardDialog Wizard { get; set; }
    }
}
