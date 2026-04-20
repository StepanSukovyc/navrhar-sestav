//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IWizardPanel.cs                          </Name>
//    <Description> Toto rozhraní se vztahuje na IDialogPanel rozhraní z průvodcem specifických funkcí</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Toto rozhraní se vztahuje na IDialogPanel rozhraní z průvodcem specifických funkcí
    /// </summary>
    public interface IWizardPanel : IDialogPanel
    {
        /// <remarks>
        /// Identifikátor následujícího panelu průvodce
        /// </remarks>
        string NextWizardPanelID { get; }

        /// <value>
        /// TRUE - pokud panel nemá nástupce
        /// </value>
        bool IsLastPanel { get; }

        /// <value>
        /// Indikuje možnost přechodu na následující panel
        /// </value>
        bool EnableNext { get; }

        /// <value>
        /// Indikuje možnost návratu na předchozí panel. 
        /// </value>
        bool EnablePrevious { get; }

        /// <value>
        /// Indikuje možnost zrušení průvodce
        /// </value>
        bool EnableCancel { get; }

        /// <remarks>
        /// Reakce na změnu následovníka.
        /// </remarks>
        event EventHandler EnableNextChanged;
        /// <remarks>
        /// reakce na změnu identifikátoru panelu následovníka
        /// </remarks>
        event EventHandler NextWizardPanelIDChanged;
        /// <remarks>
        /// reakce na změnu posledního panelu.
        /// </remarks>
        event EventHandler IsLastPanelChanged;
        /// <remarks>
        /// reakce na změnu předchozího.
        /// </remarks>
        event EventHandler EnablePreviousChanged;
        /// <remarks>
        /// reakce na změnu zrušení průvodce
        /// </remarks>
        event EventHandler EnableCancelChanged;
        /// <remarks>
        /// V případě, že průvodce chce přechod na další panel
        /// </remarks>
        event EventHandler FinishPanelRequested;
    }
}
