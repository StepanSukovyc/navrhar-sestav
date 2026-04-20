//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ViewContentSettingService.cs             </Name>
//    <Description> Položka nastavení pohledu                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Core.Services;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;
using Gordic.General;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Služba pro prácí s nastavením grafického pohledu
    /// </summary>
    public static class GraphicSettingService
    {
        /// <summary>
        /// Položka s informaci o správci zdrojů aplikace.
        /// </summary>
        public sealed class Item
        {
            /// <summary>
            /// Volá se po změně indikátoru mřížky
            /// </summary>
            public event EventHandler ShowGridChanged;
            bool showGrid;
            /// <summary>
            /// Hodnota indikátoru zobrazení mřížky
            /// </summary>
            public bool ShowGrid { get { return showGrid; } set { showGrid = value; OnShowGridChanged(); } }
            /// <summary>
            /// Reakce na změnu zobrazení mřížky
            /// </summary>
            void OnShowGridChanged()
            {
                ShowGridChanged?.Invoke(this, EventArgs.Empty);
            }

            /// <summary>
            /// Volá se po změně indikátoru řazení
            /// </summary>
            public event EventHandler ShowOrderChanged;
            bool showOrder;
            /// <summary>
            /// Hodnota indikátoru zobrazení řazení
            /// </summary>
            public bool ShowOrder { get { return showOrder; } set { showOrder = value; OnShowOrderChanged(); } }
            /// <summary>
            /// Reakce na změnu zobrazení řazení
            /// </summary>
            void OnShowOrderChanged()
            {
                ShowOrderChanged?.Invoke(this, EventArgs.Empty);
            }

            /// <summary>
            /// Volá se po změně indikátoru podbarvění
            /// </summary>
            public event EventHandler ShowColorOfChanged;
            bool showColorOf;
            /// <summary>
            /// Hodnota indikátoru podbarvění
            /// </summary>
            public bool ShowColorOf { get { return showColorOf; } set { showColorOf = value; OnShowColorOfChanged(); } }
            /// <summary>
            /// Reakce na změnu podbarvění
            /// </summary>
            void OnShowColorOfChanged()
            {
                ShowColorOfChanged?.Invoke(this, EventArgs.Empty);
            }

            /// <summary>
            /// Volá se po změně faktoru zvětšení
            /// </summary>
            public event EventHandler ZoomChanged;
            float zoom;
            /// <summary>
            /// Hodnota faktoru zvětšení
            /// </summary>
            public float Zoom { get { return zoom; } set { zoom = value; OnZoomChanged(); } }
            /// <summary>
            /// Reakce na změnu faktoru zvětšení
            /// </summary>
            void OnZoomChanged()
            {
                ZoomChanged?.Invoke(this, EventArgs.Empty);
            }

            /// <summary>
            /// Volá se po změně rozlišení
            /// </summary>
            public event EventHandler ResolutionChanged;
            SizeValue resolution;
            /// <summary>
            /// Hodnota rozlišení
            /// </summary>
            public SizeValue Resolution { get { return resolution; } set { resolution = value; OnResolutionChanged(); } }
            /// <summary>
            /// Reakce na změnu rozlišení
            /// </summary>
            void OnResolutionChanged()
            {
                ResolutionChanged?.Invoke(this, EventArgs.Empty);
            }

            /// <summary>
            /// Vytvoření nové instance třídy
            /// </summary>
            /// <param name="service">Instance třídy</param>
            public Item(IGraphicSettingService service)
            {
                if (service == null)
                    throw new ArgumentNullException(GResources.GetResourceText(29450243)); //RC 29450243 : Služba musí být inicializováná!

                resolution = new SizeValue(service.DefaultResolution);
                showColorOf = service.DefaultShowColorOf;
                showGrid = service.DefaultShowGrid;
                zoom = service.DefaultZoom;
            }
        }

        /// <summary>
        /// instance služby
        /// </summary>
        public static IGraphicSettingService Instance { get { return ServiceManager.GraphicSettingService; } }

        /// <summary>
        /// Zobrazení mřížky
        /// </summary>
        public static bool ShowGrid
        {
            get { return GetShowGrid(null); }
            set { SetShowGrid(null, value); }
        }
        /// <summary>
        /// Získání hodnoty ShowGrid z nastavení pro daný pohled.
        /// </summary>
        /// <param name="content">
        /// Pohled pro získání hodnoty.
        /// Použij NULL pro aktuální pohled
        /// </param>
        /// <returns>TRUE  pokud v aktuálním pohledu se má zobrazit mřížka jinak FALSE</returns>
        public static bool GetShowGrid(IViewContent content)
        {
            return ServiceManager.GraphicSettingService.GetShowGrid(content);
        }
        /// <summary>
        /// Nastavení indikátoru zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        public static void SetShowGrid(IViewContent content, bool value)
        {
            ServiceManager.GraphicSettingService.SetShowGrid(content, value);
        }
        /// <summary>
        /// Nastavení metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public static void AddShowGridChanged(IViewContent content, EventHandler handlerChanged)
        {
            ServiceManager.GraphicSettingService.AddShowGridChanged(content, handlerChanged);
        }
        /// <summary>
        /// Odstranění metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public static void RemoveShowGridChanged(IViewContent content, EventHandler handlerChanged)
        {
            ServiceManager.GraphicSettingService.RemoveShowGridChanged(content, handlerChanged);
        }

        /// <summary>
        /// Zobrazení řazení
        /// </summary>
        public static bool ShowOrder
        {
            get { return GetShowOrder(null); }
            set { SetShowOrder(null, value); }
        }
        /// <summary>
        /// Získání hodnoty ShowGrid z nastavení pro daný pohled.
        /// </summary>
        /// <param name="content">
        /// Pohled pro získání hodnoty.
        /// Použij NULL pro aktuální pohled
        /// </param>
        /// <returns>TRUE  pokud v aktuálním pohledu se má zobrazit mřížka jinak FALSE</returns>
        public static bool GetShowOrder(IViewContent content)
        {
            return ServiceManager.GraphicSettingService.GetShowOrder(content);
        }
        /// <summary>
        /// Nastavení indikátoru zobrazení řazení
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        public static void SetShowOrder(IViewContent content, bool value)
        {
            ServiceManager.GraphicSettingService.SetShowOrder(content, value);
        }
        /// <summary>
        /// Nastavení metody reakce na změnu zobrazení řazení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public static void AddShowOrderChanged(IViewContent content, EventHandler handlerChanged)
        {
            ServiceManager.GraphicSettingService.AddShowOrderChanged(content, handlerChanged);
        }
        /// <summary>
        /// Odstranění metody reakce na změnu zobrazení řazení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public static void RemoveShowOrderChanged(IViewContent content, EventHandler handlerChanged)
        {
            ServiceManager.GraphicSettingService.RemoveShowOrderChanged(content, handlerChanged);
        }

        /// <summary>
        /// Zobrazení mřížky
        /// </summary>
        public static bool ShowColorOf
        {
            get { return GetShowColorOf(null); }
            set { SetShowColorOf(null, value); }
        }
        /// <summary>
        /// Získání hodnoty podbarvení z nastavení pro daný pohled.
        /// </summary>
        /// <param name="content">
        /// Pohled pro získání hodnoty.
        /// Použij NULL pro aktuální pohled
        /// </param>
        /// <returns>TRUE  pokud v aktuálním pohledu se má zobrazit mřížka jinak FALSE</returns>
        public static bool GetShowColorOf(IViewContent content)
        {
            return ServiceManager.GraphicSettingService.GetShowColorOf(content);
        }
        /// <summary>
        /// Nastavení indikátoru podbarvení
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        public static void SetShowColorOf(IViewContent content, bool value)
        {
            ServiceManager.GraphicSettingService.SetShowColorOf(content, value);
        }
        /// <summary>
        /// Nastavení metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public static void AddShowColorOfChanged(IViewContent content, EventHandler handlerChanged)
        {
            ServiceManager.GraphicSettingService.AddShowColorOfChanged(content, handlerChanged);
        }
        /// <summary>
        /// Odstranění metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public static void RemoveShowColorOfChanged(IViewContent content, EventHandler handlerChanged)
        {
            ServiceManager.GraphicSettingService.RemoveShowColorOfChanged(content, handlerChanged);
        }

        /// <summary>
        /// Zobrazení mřížky
        /// </summary>
        public static SizeValue Resolution
        {
            get { return GetResolution(null); }
            set { SetResolution(null, value); }
        }
        /// <summary>
        /// Získání hodnoty podbarvení z nastavení pro daný pohled.
        /// </summary>
        /// <param name="content">
        /// Pohled pro získání hodnoty.
        /// Použij NULL pro aktuální pohled
        /// </param>
        /// <returns>TRUE  pokud v aktuálním pohledu se má zobrazit mřížka jinak FALSE</returns>
        public static SizeValue GetResolution(IViewContent content)
        {
            return ServiceManager.GraphicSettingService.GetResolution(content);
        }
        /// <summary>
        /// Nastavení indikátoru podbarvení
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        public static void SetResolution(IViewContent content, SizeValue value)
        {
            ServiceManager.GraphicSettingService.SetResolution(content, value);
        }
        /// <summary>
        /// Nastavení metody reakce na změnu rozlišení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public static void AddResolutionChanged(IViewContent content, EventHandler handlerChanged)
        {
            ServiceManager.GraphicSettingService.AddResolutionChanged(content, handlerChanged);
        }
        /// <summary>
        /// Odstranění metody reakce na změnu rozlišení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public static void RemoveResolutionChanged(IViewContent content, EventHandler handlerChanged)
        {
            ServiceManager.GraphicSettingService.RemoveResolutionChanged(content, handlerChanged);
        }

        /// <summary>
        /// Faktor zvětšení
        /// </summary>
        public static float Zoom
        {
            get { return GetZoom(null); }
            set { SetZoom(null, value); }
        }
        /// <summary>
        /// Získání hodnoty Zoom z nastavení pro daný pohled.
        /// </summary>
        /// <param name="content">
        /// Pohled pro získání hodnoty.
        /// Použij NULL pro aktuální pohled
        /// </param>
        /// <returns>Hodnota faktoru zvětšení</returns>
        public static float GetZoom(IViewContent content)
        {
            return ServiceManager.GraphicSettingService.GetZoom(content);
        }
        /// <summary>
        /// Nastavení faktoru zvětšení
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        public static void SetZoom(IViewContent content, float value)
        {
            ServiceManager.GraphicSettingService.SetZoom(content, value);
        }
        /// <summary>
        /// Nastavení metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public static void AddZoomChanged(IViewContent content, EventHandler handlerChanged)
        {
            ServiceManager.GraphicSettingService.AddZoomChanged(content, handlerChanged);
        }
        /// <summary>
        /// Odstranění metody reakce na změnu faktoru zvětšení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public static void RemoveZoomChanged(IViewContent content, EventHandler handlerChanged)
        {
            ServiceManager.GraphicSettingService.RemoveZoomChanged(content, handlerChanged);
        }
    }
}
