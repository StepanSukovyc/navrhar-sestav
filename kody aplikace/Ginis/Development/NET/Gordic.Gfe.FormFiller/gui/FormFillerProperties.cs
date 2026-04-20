//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.FormFillerProperties.cs               </Name>
//    <Description> Nastaveí aplikace                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;
using Gordic.General;
using System;

namespace Gordic.Gfe.FormFiller.Gui
{
    /// <summary>
    /// Nastaveí aplikace
    /// </summary>
    sealed class FormFillerProperties : IGraphicSettingService
    {
        static FormFillerProperties mainProperties;

        Property properties, pDocfrm, propertiesLabels;

        /// <summary>
        /// Instance třídy
        /// </summary>
        public static FormFillerProperties Instance
        {
            get
            {
                if (mainProperties == null)
                    mainProperties = new FormFillerProperties();

                return mainProperties;
            }
        }

        private FormFillerProperties()
        {
            properties = PropertyService.Get("FormFiller.FillerProperties", new Property());
            pDocfrm = PropertyService.Get("FormFiller.FillerProperties.Docfrm", new Property());
            propertiesLabels = PropertyService.Get("FormFiller.FillerProperties.Labels", new Property());

            //ColorService.InitializeService();
        }

        #region Application
        /// <summary>
        /// Cesta ke spouštěčí prohlížeče
        /// </summary>
        public string VidRunPath
        {
            get { return properties.Get("VidRunPath", string.Empty); }
            set { properties.Set("VidRunPath", value); }
        }

        /// <summary>
        /// Cesta ke složce s XME soubory
        /// </summary>
        public string XmePath
        {
            get { return properties.Get("XmePath", string.Empty); }
            set { properties.Set("XmePath", value); }
        }

        /// <summary>
        /// Maximální počet naposledy otevřených souborů
        /// </summary>
        public int RecentOpenMaxCount
        {
            get { return properties.Get("RecentOpenMaxCount", 10); }
            set { properties.Set("RecentOpenMaxCount", value); FileAgent.RecentOpen.SetMaxCount(value); }
        }

        /// <summary>
        /// URI pro GRR, GRF, MSE, atd. sestavy
        /// </summary>
        public string Uri
        {
            get { return properties.Get("Uri", "http://www.gordic.cz/TR/alf/1.4/"); }
            set { properties.Set("Uri", value); }
        }

        /// <summary>
        /// URI pro ssr soubory
        /// </summary>
        public string UriSsr
        {
            get { return properties.Get("UriSsr", "http://www.gordic.cz/TR/ssr/1.0"); }
            set { properties.Set("UriSsr", value); }
        }

        /// <summary>
        /// VERSION pro GRR, GRF, MSE, atd. sestavy
        /// </summary>
        public string Version
        {
            get { return properties.Get("Version", "1.0"); }
            set { properties.Set("Version", value); }
        }
        #endregion

        #region Designer
        /// <summary>
        /// Rozestup mezí stránkami
        /// </summary>
        public int PageSpacing
        {
            get { return properties.Get("PageSpacing", 10); }
            set { properties.Set("PageSpacing", value); }
        }

        /// <summary>
        /// Odstup stránky zlevá
        /// </summary>
        public int PageLeft
        {
            get { return properties.Get("PageLeft", 10); }
            set
            {
                properties.Set("PageLeft", value);
            }
        }

        /// <summary>
        /// Top pozice první stránky
        /// </summary>
        public int FirstPageTop
        {
            get { return properties.Get("FirstPageTop", 10); }
            set { properties.Set("FirstPageTop", value); }
        }

        /// <summary>
        /// Velikost černého průhu na stránce dole (simulace stránky)
        /// </summary>
        public int BottomDark
        {
            get { return properties.Get("BottomDark", 3); }
            set { properties.Set("BottomDark", value); }
        }

        /// <summary>
        /// Velikost černého průhu po prave stráně (simulace stránky)
        /// </summary>
        public int RightDark
        {
            get { return properties.Get("RightDark", 3); }
            set { properties.Set("RightDark", value); }
        }
        #endregion

        #region Docfrm
        /// <summary>
        /// Název structury
        /// </summary>
        public string DocfrmStructureName
        {
            get { return pDocfrm.Get("StructureName", "DOCFORM: " + GResources.GetResourceText(29450068) + " XYZ"); } //RC 29450068 : Formulář
            set { pDocfrm.Set("StructureName", value); }
        }
        /// <summary>
        /// 
        /// </summary>
        public string DocfrmStructureNote
        {
            get { return pDocfrm.Get("StructureNote", "DOCFORM"); }
            set { pDocfrm.Set("StructureNote", value); }
        }
        /// <summary>
        /// Název structury
        /// </summary>
        public string DocfrmStructureIxsAlv
        {
            get { return pDocfrm.Get("Struct_IXS_ALV", "0000ALV056IT"); }
            set { pDocfrm.Set("Struct_IXS_ALV", value); }
        }
        /// <summary>
        /// Název structury
        /// </summary>
        public string DocfrmStructureDateFrom
        {
            get { return pDocfrm.Get("StructureDateFrom", "200000"); }
            set { pDocfrm.Set("StructureDateFrom", value); }
        }
        /// <summary>
        /// Název structury
        /// </summary>
        public string DocfrmStructureDateTo
        {
            get { return pDocfrm.Get("StructureDateTo", "299999"); }
            set { pDocfrm.Set("StructureDateTo", value); }
        }
        /// <summary>
        /// Název structury
        /// </summary>
        public string DocfrmStructureFormationOutput
        {
            get { return pDocfrm.Get("StructureFormationOutput", "GFRM"); }
            set { pDocfrm.Set("StructureFormationOutput", value); }
        }
        /// <summary>
        /// 
        /// </summary>
        public string DocfrmWflIxsXme
        {
            get { return pDocfrm.Get("WflIxsXme", "0000ALX0AY2Q"); }
            set { pDocfrm.Set("WflIxsXme", value); }
        }
        /// <summary>
        /// 
        /// </summary>
        public string DocfrmWflVla
        {
            get { return pDocfrm.Get("WflVla", "0000ALX0AY1V"); }
            set { pDocfrm.Set("WflVla", value); }
        }
        #endregion

        #region IGraphicSettingService
        #region Labels
        /// <summary>
        /// Indikuje krok mezí štítky
        /// </summary>
        public int StepBetween
        {
            get { return propertiesLabels.Get("StepBetween", 5); }
            set { propertiesLabels.Set("StepBetween", value); }
        }
        /// <summary>
        /// Výchozí velikost štítku
        /// </summary>
        public int DefaultLabelWidth
        {
            get { return propertiesLabels.Get("DefaultLabelWidth", 20); }
            set { propertiesLabels.Set("DefaultLabelWidth", value); }
        }
        /// <summary>
        /// Výchozí velikost skupiny
        /// </summary>
        public int DefaultGroupWidth
        {
            get { return propertiesLabels.Get("DefaultGroupWidth", 10); }
            set { propertiesLabels.Set("DefaultGroupWidth", value); }
        }

        /// <summary>
        /// Výchozí velikost písma štítku skupiny
        /// </summary>
        public int DefaultLabelFontSize
        {
            get { return propertiesLabels.Get("DefaultLabelFontSize", 15); }
            set { propertiesLabels.Set("DefaultLabelFontSize", value); }
        }
        /// <summary>
        /// Výchozí velikost písma štítku skupiny
        /// </summary>
        public int DefaultGroupFontSize
        {
            get { return propertiesLabels.Get("DefaultGroupFontSize", 7); }
            set { propertiesLabels.Set("DefaultGroupFontSize", value); }
        }
        #endregion
        /// <summary>
        /// Výchozí rozlíšení mřížky grf sestav
        /// </summary>
        public string DefaultResolution
        {
            get { return pDocfrm.Get("DefaultResolution", "5mm"); }
            set { pDocfrm.Set("DefaultResolution", value); }
        }
        /// <summary>
        /// Výchozí hodnota indikátoru zobrazení mřížky
        /// </summary>
        public bool DefaultShowGrid
        {
            get { return pDocfrm.Get("DefaultShowGrid", false); }
            set { pDocfrm.Set("DefaultShowGrid", value); }
        }
        /// <summary>
        /// Výchozí hodnota indikátoru zobrazení řazení
        /// </summary>
        public bool DefaultShowOrder
        {
            get { return pDocfrm.Get("DefaultShowOrder", false); }
            set { pDocfrm.Set("DefaultShowOrder", value); }
        }
        /// <summary>
        /// Výchozí hodnota zvětšení
        /// </summary>
        public float DefaultZoom
        {
            get { return pDocfrm.Get("DefaultZoom", 1); }
            set { pDocfrm.Set("DefaultZoom", value); }
        }
        /// <summary>
        /// Výchozí hodnota indikátoru zobrazení mřížky
        /// </summary>
        public bool DefaultShowColorOf
        {
            get { return pDocfrm.Get("DefaultShowColorOf", false); }
            set { pDocfrm.Set("DefaultShowColorOf", value); }
        }

        /// <summary>
        /// Výchozí rozlíšení mřížky grf sestav
        /// </summary>
        public string Resolution
        {
            get { return GetResolution(SimpleDesktop.Desktop.ActiveViewContent).Value; }
            set { SetResolution(SimpleDesktop.Desktop.ActiveViewContent, new SizeValue(value)); }
        }
        /// <summary>
        /// Získání hodnoty rozlišení z nastavení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání nastavení rozlišení</param>
        /// <returns>Hodnota rozlišení</returns>
        public SizeValue GetResolution(IViewContent content)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return new SizeValue(DefaultResolution);
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            return CommonService.GetResolution(content, DefaultResolution);
        }
        /// <summary>
        /// Nastavení rozlišení
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        public void SetResolution(IViewContent content, SizeValue value)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

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
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

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
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            CommonService.RemoveResolutionChanged(content, handlerChanged);
        }

        /// <summary>
        /// Výchozí hodnota indikátoru zobrazení mřížky
        /// </summary>
        public bool ShowGrid
        {
            get { return GetShowGrid(SimpleDesktop.Desktop.ActiveViewContent); }
            set { SetShowGrid(SimpleDesktop.Desktop.ActiveViewContent, value); }
        }
        /// <summary>
        /// Získání hodnoty ShowGrid z nastavení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání nastavení mřížky</param>
        /// <returns>TRUE  pokud v aktuálním pohledu se má zobrazit mřížka jinak FALSE</returns>
        public bool GetShowGrid(IViewContent content)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return DefaultShowGrid;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

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
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            CommonService.SetShowGrid(content, value);
        }
        /// <summary>
        /// Nastavení metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public void AddShowGridChanged(IViewContent content, EventHandler handlerChanged)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

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
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            CommonService.RemoveShowGridChanged(content, handlerChanged);
        }

        /// <summary>
        /// Výchozí hodnota indikátoru zobrazení mřížky
        /// </summary>
        public bool ShowOrder
        {
            get { return GetShowOrder(SimpleDesktop.Desktop.ActiveViewContent); }
            set { SetShowOrder(SimpleDesktop.Desktop.ActiveViewContent, value); }
        }
        /// <summary>
        /// Získání hodnoty ShowGrid z nastavení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání nastavení mřížky</param>
        /// <returns>TRUE  pokud v aktuálním pohledu se má zobrazit mřížka jinak FALSE</returns>
        public bool GetShowOrder(IViewContent content)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return DefaultShowOrder;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

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
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            CommonService.SetShowOrder(content, value);
        }
        /// <summary>
        /// Nastavení metody reakce na změnu zobrazení řazení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public void AddShowOrderChanged(IViewContent content, EventHandler handlerChanged)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

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
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            CommonService.RemoveShowOrderChanged(content, handlerChanged);
        }

        /// <summary>
        /// Výchozí hodnota zvětšení
        /// </summary>
        public float Zoom
        {
            get { return GetZoom(SimpleDesktop.Desktop.ActiveViewContent); }
            set { SetZoom(SimpleDesktop.Desktop.ActiveViewContent, value); }
        }
        /// <summary>
        /// Získání faktoru zvětšení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání faktoru zvětšení</param>
        /// <returns>Hodnota faktoru zvětšení</returns>
        public float GetZoom(IViewContent content)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return DefaultZoom;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

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
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

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
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

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
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            CommonService.RemoveZoomChanged(content, handlerChanged);
        }

        /// <summary>
        /// Výchozí hodnota indikátoru zobrazení mřížky
        /// </summary>
        public bool ShowColorOf
        {
            get { return GetShowColorOf(SimpleDesktop.Desktop.ActiveViewContent); }
            set { SetShowColorOf(SimpleDesktop.Desktop.ActiveViewContent, value); }
        }
        /// <summary>
        /// Získání hodnoty podbarvení z nastavení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání nastavení mřížky</param>
        /// <returns>TRUE  pokud v aktuálním pohledu se má zobrazit podbarvení jinak FALSE</returns>
        public bool GetShowColorOf(IViewContent content)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return DefaultShowColorOf;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            return CommonService.GetShowColorOf(content, DefaultShowColorOf);
        }
        /// <summary>
        /// Nastavení indikátoru zobrazení podbarvení
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        public void SetShowColorOf(IViewContent content, bool value)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            CommonService.SetShowColorOf(content, value);
        }
        /// <summary>
        /// Nastavení metody reakce na změnu zobrazení podbarvení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public void AddShowColorOfChanged(IViewContent content, EventHandler handlerChanged)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            CommonService.AddShowColorOfChanged(content, handlerChanged);
        }
        /// <summary>
        /// Odstranění metody reakce na změnu zobrazení podbarvení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public void RemoveShowColorOfChanged(IViewContent content, EventHandler handlerChanged)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            CommonService.RemoveShowColorOfChanged(content, handlerChanged);
        }

        /// <summary>
        /// Uvolnění cach pro daný pohled
        /// </summary>
        /// <param name="content">Pohled</param>
        public void RemoveItem(IViewContent content)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            CommonService.RemoveItem(content);
        }
        #endregion

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
    }
}
