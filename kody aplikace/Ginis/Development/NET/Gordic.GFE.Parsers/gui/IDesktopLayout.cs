//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IDesktopLayout.cs                      </Name>
//    <Description> IDesktopLayout objekt je zodpovědný za rozložení pracovního prostoru,</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// IDesktopLayout objekt je zodpovědný za rozložení pracovního prostoru,
    /// zobrazuje obsah, rozhoduje o výběru IDesktopWindow implementace atd.
    /// a může být připojen/odpojen na pracovní stůl za běhu aplikace
    /// </summary>
    public interface IDesktopLayout
    {
        /// <summary>
        /// Aktivní okno pracovní plochy
        /// </summary>
        IDesktopWindow ActiveDesktopWindow { get; }
        /// <summary>
        /// Aktivní obsah. Může být IViewContent nebo nějaký objekt, 
        /// záleží na tom, kde se nachází fokus
        /// </summary>
        object ActiveContent { get; }

        /// <summary>
        /// Připojení daného správce rozvržení k pracovní ploše
        /// </summary>
        /// <param name="desktop">Daná pracovní plocha</param>
        void Attach(IDesktop desktop);
        /// <summary>
        /// Odpojení tohoto správce od aktuální pracovní plochy
        /// </summary>
        void Detach();
        /// <summary>
        /// Opětovná inicializace všech komponent správce rozvržení
        /// </summary>
        void RedrawAllComponents();
        /// <summary>
        /// Načtení nastavení
        /// </summary>
        void LoadConfiguration();
        /// <summary>
        /// Uložení nastavení
        /// </summary>
        void StoreConfiguration();

        /// <summary>
        /// Zobrazení nového <see cref="IViewContent"/> a případné přepnutí na něj.
        /// </summary>
        /// <param name="content">Obsah k zobrazení.</param>
        /// <param name="switchToOpenedView">Indikuje potřebu přepnutí na něj.</param>
        /// <returns></returns>
        IDesktopWindow ShowView(IViewContent content, bool switchToOpenedView);

        /// <summary>
        /// Volá se po změně pracovního okna na jiné
        /// </summary>
        event EventHandler ActiveDesktopWindowChanged;

        /// <summary>
        /// Vrácí TRUE, pokud padContent je viditelný;
        /// </summary>
        /// <param name="padContent">Obsah</param>
        bool IsVisible(PadDescriptor padContent);

        /// <summary>
        /// Zobrazení nové podložky.
        /// </summary>
        /// <param name="content">Obsah</param>
        void ShowPad(PadDescriptor content);
        /// <summary>
        /// Aktivace podložky (Show udělá podložku pouze viditelnou
        /// ale Activate zároveň převede podložku do popředí)
        /// </summary>
        /// <param name="content">Obsah podložky</param>
        void ActivatePad(PadDescriptor content);

        /// <summary>
        /// Zavření a uvolnění podložky.
        /// </summary>
        /// <param name="content">Podložka s obsahem</param>
        void UnloadPad(PadDescriptor content);
        /// <summary>
        /// Skrýtí podložky podložky.
        /// </summary>
        /// <param name="content">Podložka s obsahem</param>
        void HidePad(PadDescriptor content);
        /// <summary>
        /// Aktivace záložky dle plného názvu
        /// </summary>
        /// <param name="fullyQualifiedTypeName">Úplný název záložky</param>
        void ActivatePad(string fullyQualifiedTypeName);
    }
}
