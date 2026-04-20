//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.SimpleDesktop.cs                 </Name>
//    <Description> Jednoduchá pracovní plocha                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Diagnostics;
using System.Windows.Forms;
using Gordic.Gfe.FormFiller.AddIns;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.General;

namespace Gordic.Gfe.FormFiller.Gui
{
    /// <summary>
    /// Jednoduchá pracovní plocha
    /// </summary>
    static class SimpleDesktop
    {
        const string desktopMemento = "DesktopProperty";

        static IDesktop desktop;
        /// <summary>
        /// Hlavní formulář.
        /// </summary>
        public static Form MainForm { get => desktop?.MainForm; }
        /// <summary>
        /// Pracovní plocha.
        /// </summary>
        public static IDesktop Desktop { get => desktop; }
        /// <summary>
        /// Aktivní ovladač
        /// </summary>
        public static Control ActiveControl
        {
            get
            {
                ContainerControl container = SimpleDesktop.MainForm;
                Control ctl;
                do
                {
                    ctl = container.ActiveControl;
                    if (ctl == null)
                        return container;
                    container = ctl as ContainerControl;
                } while (container != null);
                return ctl;
            }
        }

        /// <summary>
        /// Spuštění ínicializace pracovní plochy.
        /// </summary>
        public static void InitializeDesktop()
        {
            InitializeDesktop(new DefaultDesktop(), new FillerDesktopLayout());
        }

        /// <summary>
        /// Inicializace pracovní plochy
        /// </summary>
        /// <param name="desktop">Pracovní plocha</param>
        /// <param name="layout">Rozvržení</param>
        public static void InitializeDesktop(IDesktop desktop, IDesktopLayout layout)
        {
            SimpleDesktop.desktop = desktop;
            ProcessService.AttachProcess(Process.GetCurrentProcess(), desktop);

            DisplayBindingService.InitializeService();
            LayoutConfiguration.LoadLayoutConfiguration();
            FileAgent.InitializeService();
            StatusBarService.Initialize();
            ParserService.InitializeService(GetActiveViewContent, FormFillerTextEditorProperties.Instance, null, FileAgent.GetViewForFile, FileAgent.GetOpenedFile);

            desktop.Initialize();
            desktop.SetMemento(PropertyService.Get(desktopMemento, new Property()));

            // aktivujeme správce bezpečného volání GUI metod
            ThreadService.ActivateCaller(desktop);
            PropertyService.PropertyChanged += new PropertyChangedEventHandler(TrackPropertyChanges);

            LoggingService.Info(GResources.GetResourceText(29450071) + " -> " + GResources.GetResourceText(29450070)); //RC 29450071 : Napojení rozložení pracovní plochy
            desktop.DesktopLayout = layout;

            OnDesktopCreated();

            desktop.ActiveContentChanged += delegate
            {
                LoggingService.Debug(string.Join(" ", "ActiveContentChanged", GResources.GetResourceText(29450072), desktop.ActiveContent)); //RC 29450072 : na
            };
            desktop.ActiveViewContentChanged += delegate
            {
                LoggingService.Debug(string.Join(" ", "ActiveViewContentChanged", GResources.GetResourceText(29450072), desktop.ActiveViewContent)); //RC 29450072 : na
            };
            desktop.ActiveDesktopWindowChanged += delegate
            {
                LoggingService.Debug(string.Join(" ", "ActiveDesktopWindowChanged", GResources.GetResourceText(29450072), desktop.ActiveDesktopWindow)); //RC 29450072 : na
            };
        }

        static void OnDesktopCreated()
        {
            DesktopCreated?.Invoke(null, EventArgs.Empty);
        }
        static void TrackPropertyChanges(object sender, PropertyChangedEventArgs e)
        {
            if (e.OldValue != e.NewValue && desktop != null)
            {
                switch (e.Key)
                {
                    case "Gui.VisualStyle":
                    case "Gui.ToolBarVisible":
                        desktop.RedrawAllComponents();
                        break;
                    case "Gui.UseProfessionalRenderer":
                        desktop.UpdateRenderer();
                        break;
                }
            }
        }

        /// <summary>
        /// Spuštění procesu uvolnění pracovní ploch.
        /// </summary>
        public static void OnDesktopUnloaded()
        {
            DesktopUnloaded?.Invoke(null, EventArgs.Empty);

            FileAgent.Unload();
            ImageService.Unload();
            TemporaryService.Unload();
        }

        /// <summary>
        /// Volá se po vytvoření pracovní plochy
        /// </summary>
        public static event EventHandler DesktopCreated;
        /// <summary>
        /// Volá se po uvolnění pracovní plochy
        /// </summary>
        public static event EventHandler DesktopUnloaded;

        /// <summary>
        /// Získání aktuálního obsahu.
        /// </summary>
        /// <returns>Aktivní pohled na obsah</returns>
        public static IViewContent GetActiveViewContent() => SimpleDesktop.Desktop.ActiveViewContent;
    }
}
