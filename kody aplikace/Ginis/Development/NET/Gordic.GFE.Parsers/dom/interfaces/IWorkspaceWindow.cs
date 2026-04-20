//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IWorkspaceWindow.cs                      </Name>
//    <Description> rozhraní pracovního prostoru                                </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-06-29                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using System.Collections.Generic;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// rozhraní pracovního prostoru
    /// </summary>
    public interface IWorkspaceWindow : IDesktopWindow, IOwnerState
    {
        /// <summary>
        /// ziskání kolekce ovladačů daného pracovbního prostoru
        /// </summary>
        Control.ControlCollection Controls { get; }
        /// <summary>
        /// získání pohledu na záložky
        /// </summary>
        TabControl ViewTabControl { get; }
        /// <summary>
        /// Získání/Nastavení kolekce viditelných pohledů pracovního prostoru
        /// </summary>
        List<IViewContent> VisibleContents { get; set; }

        /// <summary>
        /// zrušení registrovaného pohledu
        /// </summary>
        /// <param name="content">pohled ke zrušení registrace</param>
        void UnregisterContent(IViewContent content);
        /// <summary>
        /// uvolnění pohledů
        /// </summary>
        void ClearContent();
                /// <summary>
        /// aktualizace aktualního pohledu
        /// </summary>
        void UpdateActiveViewContent();
        /// <summary>
        /// registrace nového pohledu na obsah
        /// </summary>
        /// <param name="content">Pohled k registraci</param>
        void RegisterNewContent(IViewContent content);
        /// <summary>
        /// vytvoření ovladače zobrazení všech obsahů
        /// </summary>
        void CreateViewTabControl();
    }
}
