//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IDesktopWindow.cs                      </Name>
//    <Description> IDesktopWindow základní rozhraní oken, co zobrazují obsah </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-10                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// IDesktopWindow základní rozhraní oken, co zobrazují obsah
    /// </summary>
    public interface IDesktopWindow
    {
        /// <summary>
        /// titulek okna
        /// </summary>
        string Title { get; }

        /// <summary>
        /// indikuje zda okno pracovní plochy bylo uvolněno
        /// </summary>
        bool IsDisposed { get; }

        /// <summary>
        /// gets/sets aktuálně zobrazený v okně obsah
        /// </summary>
        IViewContent ActiveViewContent { get; set; }

        /// <summary>
        /// gets/sets ikonka pohledu na obsah
        /// </summary>
        Icon Icon { get; set; }

        /// <summary>
        /// seznam pohledů na obsah daného okna
        /// </summary>
        IList<IViewContent> ViewContents { get; }

        /// <summary>
        /// uzavřění okna, pokud force == true uzavře okno bez dotazu, i když obsah byl pozměněn
        /// </summary>
        /// <returns>true, pokud okno je zavřené</returns>
        bool CloseWindow(bool force);

        /// <summary>
        /// aktivace pohledu se specifickým indexem
        /// </summary>
        void SwitchView(int viewNumber);
        /// <summary>
        /// zobrazení daného okna na popředí a nastavení uživatelského fokusu na toto okno.
        /// </summary>
        void SelectWindow();
        /// <summary>
        /// opětovná inicializace obsahu a překreslení komponenty
        /// </summary>
        void RedrawContent();
        /// <summary>
        /// pro vnitřní použití:
        /// tato metoda se vola pracovní plochou pro zjištění, zda okno je vybrané
        /// </summary>
        void OnWindowSelected(EventArgs e);
        /// <summary>
        /// pouze interně:
        /// tato metoda volá pracovní stul s tím, že okno bylo uvolněno
        /// </summary>
        /// <param name="e">Argument metody</param>
        void OnWindowDeselected(EventArgs e);

        /// <summary>
        /// volá se povybrání okna.
        /// </summary>
        event EventHandler WindowSelected;
        /// <summary>
        /// volá se po uvolnění okna
        /// </summary>
        event EventHandler WindowDeselected;
        /// <summary>
        /// volá se po změně titulku okna
        /// </summary>
        event EventHandler TitleChanged;
        /// <summary>
        /// po zavření okna
        /// </summary>
        event EventHandler CloseEvent;
        /// <summary>
        /// aktivuje se po změně vlastnosti ActiveViewContent
        /// </summary>
        event EventHandler ActiveViewContentChanged;
    }
}
