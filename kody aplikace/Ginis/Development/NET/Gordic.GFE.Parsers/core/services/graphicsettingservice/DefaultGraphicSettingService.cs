//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DefaultGraphicSettingService.cs          </Name>
//    <Description> Výchozí grafické nastavení pohledu                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-24                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;
using System;

namespace Gordic.GFE.Parsers.Core.Services
{
    /// <summary>
    /// Výchozí grafické nastavení pohledu
    /// </summary>
    public class DefaultGraphicSettingService : IGraphicSettingService
    {
        /// <summary>
        /// Výchozí rozlíšení mřížky grf sestav
        /// </summary>
        public string DefaultResolution { get; set; } = "5mm";
        /// <summary>
        /// Výchozí hodnota indikátoru zobrazení mřížky
        /// </summary>
        public bool DefaultShowGrid { get; set; } = false;
        /// <summary>
        /// Výchozí hodnota indikátoru zobrazení řazení
        /// </summary>
        public bool DefaultShowOrder { get; set; } = false;
        /// <summary>
        /// Výchozí hodnota zvětšení
        /// </summary>
        public float DefaultZoom { get; set; } = 1.0f;
        /// <summary>
        /// Výchozí hodnota indikátoru zobrazení mřížky
        /// </summary>
        public bool DefaultShowColorOf { get; set; } = true;

        #region Labels
        int stepBetween = 5;
        /// <summary>
        /// Indikuje krok mezí štítky
        /// </summary>
        public int StepBetween { get { return stepBetween; } set { stepBetween = value; } }

        int defaultLabelWidth = 20;
        /// <summary>
        /// Výchozí velikost štítku
        /// </summary>
        public int DefaultLabelWidth { get { return defaultLabelWidth; } set { defaultLabelWidth = value; } }

        int defaultGroupWidth = 10;
        /// <summary>
        /// Výchozí velikost skupiny
        /// </summary>
        public int DefaultGroupWidth { get { return defaultGroupWidth; } set { defaultGroupWidth = value; } }

        int defaultLabelFontSize = 15;
        /// <summary>
        /// Výchozí velikost písma štítku skupiny
        /// </summary>
        public int DefaultLabelFontSize { get { return defaultLabelFontSize; } set { defaultLabelFontSize = value; } }

        int defaultGroupFontSize = 7;
        /// <summary>
        /// Výchozí velikost písma štítku skupiny
        /// </summary>
        public int DefaultGroupFontSize { get { return defaultGroupFontSize; } set { defaultGroupFontSize = value; } }
        #endregion

        /// <summary>
        /// Pohled na obsah
        /// </summary>
        public IViewContent View { get; set; }

        /// <summary>
        /// Získání hodnoty ShowGrid z nastavení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání nastavení mřížky</param>
        /// <returns>TRUE  pokud v aktuálním pohledu se má zobrazit mřížka jinak FALSE</returns>
        public bool GetShowGrid(IViewContent content)
        {
            if (content == null)
                if (View == null)
                    return DefaultShowGrid;
                else content = View;

            return CommonService.GetShowGrid(content, DefaultShowGrid);
        }
        /// <summary>
        /// Nastavení indikátoru zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        public void SetShowGrid(IViewContent content, bool value)
        {
            if (content == null)
                if (View == null)
                    return;
                else content = View;

            CommonService.SetShowGrid(content, value);
        }
        /// <summary>
        /// Získání hodnoty ShowOrder z nastavení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání nastavení mřížky</param>
        /// <returns>TRUE pokud v aktuálním pohledu se má zobrazit řazení jinak FALSE</returns>
        public bool GetShowOrder(IViewContent content)
        {
            if (content == null)
                if (View == null)
                    return DefaultShowGrid;
                else content = View;

            return CommonService.GetShowOrder(content, DefaultShowGrid);
        }
        /// <summary>
        /// Nastavení indikátoru zobrazení řazení
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        public void SetShowOrder(IViewContent content, bool value)
        {
            if (content == null)
                if (View == null)
                    return;
                else content = View;

            CommonService.SetShowOrder(content, value);
        }
        /// <summary>
        /// Nastavení metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public void AddShowGridChanged(IViewContent content, EventHandler handlerChanged)
        {
            if (content == null)
                if (View == null)
                    return;
                else content = View;

            CommonService.AddShowGridChanged(content, handlerChanged);
        }
        /// <summary>
        /// Odstranění metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public void RemoveShowGridChanged(IViewContent content, EventHandler handlerChanged)
        {
            if (content == null)
                if (View == null)
                    return;
                else content = View;

            CommonService.RemoveShowGridChanged(content, handlerChanged);
        }
        /// <summary>
        /// Nastavení metody reakce na změnu zobrazení řazení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public void AddShowOrderChanged(IViewContent content, EventHandler handlerChanged)
        {
            if (content == null)
                if (View == null)
                    return;
                else content = View;

            CommonService.AddShowOrderChanged(content, handlerChanged);
        }
        /// <summary>
        /// Odstranění metody reakce na změnu zobrazení řazení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public void RemoveShowOrderChanged(IViewContent content, EventHandler handlerChanged)
        {
            if (content == null)
                if (View == null)
                    return;
                else content = View;

            CommonService.RemoveShowOrderChanged(content, handlerChanged);
        }

        /// <summary>
        /// Získání hodnoty podbarvení z nastavení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání podbarvení</param>
        /// <returns>TRUE  pokud v aktuálním pohledu se má zobrazit podbarvení jinak FALSE</returns>
        public bool GetShowColorOf(IViewContent content)
        {
            if (content == null)
                if (View == null)
                    return DefaultShowColorOf;
                else content = View;

            return CommonService.GetShowColorOf(content, DefaultShowColorOf);
        }
        /// <summary>
        /// Nastavení indikátoru podbarvení
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        public void SetShowColorOf(IViewContent content, bool value)
        {
            if (content == null)
                if (View == null)
                    return;
                else content = View;

            CommonService.SetShowColorOf(content, value);
        }
        /// <summary>
        /// Nastavení metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public void AddShowColorOfChanged(IViewContent content, EventHandler handlerChanged)
        {
            if (content == null)
                if (View == null)
                    return;
                else content = View;

            CommonService.AddShowColorOfChanged(content, handlerChanged);
        }
        /// <summary>
        /// Odstranění metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public void RemoveShowColorOfChanged(IViewContent content, EventHandler handlerChanged)
        {
            if (content == null)
                if (View == null)
                    return;
                else content = View;

            CommonService.RemoveShowColorOfChanged(content, handlerChanged);
        }

        /// <summary>
        /// Získání hodnoty Zoom z nastavení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání hodnoty</param>
        /// <returns>Hodnota faktoru zvětšení</returns>
        public SizeValue GetResolution(IViewContent content)
        {
            if (content == null)
                if (View == null)
                    return new SizeValue(DefaultResolution);
                else content = View;

            return CommonService.GetResolution(content, DefaultResolution);
        }
        /// <summary>
        /// Nastavení faktoru zvětšení
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        public void SetResolution(IViewContent content, SizeValue value)
        {
            if (content == null)
                if (View == null)
                    return;
                else content = View;

            CommonService.SetResolution(content, value);
        }
        /// <summary>
        /// Nastavení metody reakce na změnu rozlišení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public void AddResolutionChanged(IViewContent content, EventHandler handlerChanged)
        {
            if (content == null)
                if (View == null)
                    return;
                else content = View;

            CommonService.AddResolutionChanged(content, handlerChanged);
        }
        /// <summary>
        /// Odstranění metody reakce na změnu rozlišení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public void RemoveResolutionChanged(IViewContent content, EventHandler handlerChanged)
        {
            if (content == null)
                if (View == null)
                    return;
                else content = View;

            CommonService.RemoveResolutionChanged(content, handlerChanged);
        }

        /// <summary>
        /// Získání hodnoty Zoom z nastavení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání hodnoty</param>
        /// <returns>Hodnota faktoru zvětšení</returns>
        public float GetZoom(IViewContent content)
        {
            if (content == null)
                if (View == null)
                    return DefaultZoom;
                else content = View;

            return CommonService.GetZoom(content, DefaultZoom);
        }
        /// <summary>
        /// Nastavení faktoru zvětšení
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        public void SetZoom(IViewContent content, float value)
        {
            if (content == null)
                if (View == null)
                    return;
                else content = View;

            CommonService.SetZoom(content, value);
        }
        /// <summary>
        /// Nastavení metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public void AddZoomChanged(IViewContent content, EventHandler handlerChanged)
        {
            if (content == null)
                if (View == null)
                    return;
                else content = View;

            CommonService.AddZoomChanged(content, handlerChanged);
        }
        /// <summary>
        /// Odstranění metody reakce na změnu faktoru zvětšení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public void RemoveZoomChanged(IViewContent content, EventHandler handlerChanged)
        {
            if (content == null)
                if (View == null)
                    return;
                else content = View;

            CommonService.RemoveZoomChanged(content, handlerChanged);
        }

        /// <summary>
        /// Uvolnění cach pro daný pohled
        /// </summary>
        /// <param name="content">Pohled</param>
        public void RemoveItem(IViewContent content)
        {
            if (content == null)
                if (View == null)
                    return;
                else content = View;

            CommonService.RemoveItem(content);
        }

        Dictionary<string, string> userdefinecolors = new Dictionary<string, string>();
        /// <summary>
        /// Seznam uživatelem definovaných barev
        /// </summary>
        public Dictionary<string, string> GetUserDefineColors() { return userdefinecolors; }

        /// <summary>
        /// Přidání záznamu do seznamu uživatelských barev
        /// </summary>
        /// <param name="key">Český název barvy</param>
        /// <param name="value">Anglický název - dle tohoto názvu se bude volat parser</param>
        public void AddUserDefineColors(string key, string value)
        {
            if (!userdefinecolors.ContainsKey(key))
                userdefinecolors.Add(key, value);
        }

        int pageSpacing = 10;
        /// <summary>
        /// Rozestup mezí stránkami
        /// </summary>
        public int PageSpacing
        {
            get { return pageSpacing; }
            set { pageSpacing = value; }
        }

        int pageLeft = 0;
        /// <summary>
        /// Odstup stránky zlevá
        /// </summary>
        public int PageLeft
        {
            get { return pageLeft; }
            set { pageLeft = value; }
        }

        int firstPageTop = 0;
        /// <summary>
        /// Odstup stránky zlevá
        /// </summary>
        public int FirstPageTop
        {
            get { return firstPageTop; }
            set { firstPageTop = value; }
        }
    }
}
