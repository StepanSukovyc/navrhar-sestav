//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IGraphicSettingService.cs                </Name>
//    <Description> Rozhraní grafického nastavení pohledu                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-24                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;
using System;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Rozhraní hlavního grafického nastavení pohledu
    /// </summary>
    public interface IGraphicSettingService
    {
        /// <summary>
        /// Výchozí rozlíšení mřížky grf sestav
        /// </summary>
        string DefaultResolution { get; set; }
        /// <summary>
        /// Výchozí hodnota indikátoru zobrazení mřížky
        /// </summary>
        bool DefaultShowGrid { get; set; }
        /// <summary>
        /// Výchozí hodnota zvětšení
        /// </summary>
        float DefaultZoom { get; set; }
        /// <summary>
        /// Výchozí hodnota indikátoru zobrazení mřížky
        /// </summary>
        bool DefaultShowColorOf { get; set; }
        /// <summary>
        /// Rozestup mezí stránkami.
        /// </summary>
        int PageSpacing { get; set; }
        /// <summary>
        /// Odstup stránky zlevá
        /// </summary>
        int PageLeft { get; set; }
        /// <summary>
        /// Top pozice první stránky.
        /// </summary>
        int FirstPageTop { get; set; }
        #region Labels
        /// <summary>
        /// indikuje krok mezí štítky
        /// </summary>
        int StepBetween { get; set; }
        /// <summary>
        /// výchozí velikost štítku
        /// </summary>
        int DefaultLabelWidth { get; set; }
        /// <summary>
        /// výchozí velikost skupiny
        /// </summary>
        int DefaultGroupWidth { get; set; }
        #endregion


        /// <summary>
        /// Získání hodnoty ShowGrid z nastavení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání hodnoty</param>
        /// <returns>TRUE  pokud v aktuálním pohledu se má zobrazit mřížka jinak FALSE</returns>
        bool GetShowGrid(IViewContent content);
        /// <summary>
        /// Nastavení indikátoru zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        void SetShowGrid(IViewContent content, bool value);
        /// <summary>
        /// Získání hodnoty ShowOrder z nastavení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání hodnoty</param>
        /// <returns>TRUE pokud v aktuálním pohledu se má zobrazit řazení jinak FALSE</returns>
        bool GetShowOrder(IViewContent content);
        /// <summary>
        /// Nastavení indikátoru zobrazení řazení
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        void SetShowOrder(IViewContent content, bool value);

        /// <summary>
        /// Získání hodnoty podbarvení z nastavení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání hodnoty</param>
        /// <returns>TRUE  pokud v aktuálním pohledu se má zobrazit podbarvení jinak FALSE</returns>
        bool GetShowColorOf(IViewContent content);
        /// <summary>
        /// Nastavení indikátoru podbarvení
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        void SetShowColorOf(IViewContent content, bool value);

        /// <summary>
        /// Získání hodnoty Zoom z nastavení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání hodnoty</param>
        /// <returns>Hodnota faktoru zvětšení</returns>
        float GetZoom(IViewContent content);
        /// <summary>
        /// Nastavení faktoru zvětšení
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        void SetZoom(IViewContent content, float value);

        /// <summary>
        /// Získání hodnoty rozlišení z nastavení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání hodnoty</param>
        /// <returns>Hodnota rozlišení</returns>
        SizeValue GetResolution(IViewContent content);
        /// <summary>
        /// Nastavení rozlišení
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        void SetResolution(IViewContent content, SizeValue value);

        /// <summary>
        /// Nastavení metody reakce na změnu rozlišení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        void AddResolutionChanged(IViewContent content, EventHandler handlerChanged);
        /// <summary>
        /// Odstranění metody reakce na změnu rozlišení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        void RemoveResolutionChanged(IViewContent content, EventHandler handlerChanged);
        /// <summary>
        /// Nastavení metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        void AddShowGridChanged(IViewContent content, EventHandler handlerChanged);
        /// <summary>
        /// Odstranění metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        void RemoveShowGridChanged(IViewContent content, EventHandler handlerChanged);
        /// <summary>
        /// Nastavení metody reakce na změnu zobrazení řazení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        void AddShowOrderChanged(IViewContent content, EventHandler handlerChanged);
        /// <summary>
        /// Odstranění metody reakce na změnu zobrazení řazení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        void RemoveShowOrderChanged(IViewContent content, EventHandler handlerChanged);
        /// <summary>
        /// Nastavení metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        void AddZoomChanged(IViewContent content, EventHandler handlerChanged);
        /// <summary>
        /// Odstranění metody reakce na změnu faktoru zvětšení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        void RemoveZoomChanged(IViewContent content, EventHandler handlerChanged);
        /// <summary>
        /// Nastavení metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        void AddShowColorOfChanged(IViewContent content, EventHandler handlerChanged);
        /// <summary>
        /// Odstranění metody reakce na změnu zobrazení podbarvení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        void RemoveShowColorOfChanged(IViewContent content, EventHandler handlerChanged);

        /// <summary>
        /// Uvolnění cach pro daný pohled
        /// </summary>
        /// <param name="content">Pohled</param>
        void RemoveItem(IViewContent content);
    }
}
