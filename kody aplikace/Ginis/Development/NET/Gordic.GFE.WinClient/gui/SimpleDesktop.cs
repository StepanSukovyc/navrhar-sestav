//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SimpleDesktop.cs                  </Name>
//    <Description> Jednoduchá pracovní plocha                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Diagnostics;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Base.Gui;
using Gordic.GFE.WinClient.DefaultEditor;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.WinClient.Services;
using Gordic.General;

namespace Gordic.GFE.WinClient.Gui
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
        public static Form MainForm { get { return desktop?.MainForm; } }
        /// <summary>
        /// Pracovní plocha.
        /// </summary>
        public static IDesktop Desktop { get { return desktop; } }
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
            InitializeDesktop(new DefaultDesktop(), new RdiDesktopLayout());
        }
        /// <summary>
        /// Inicializace pracovní plochy
        /// </summary>
        /// <param name="pDesktop">Pracovní plocha</param>
        /// <param name="layout">Rozvržení</param>
        public static void InitializeDesktop(IDesktop pDesktop, IDesktopLayout layout)
        {
            SimpleDesktop.desktop = pDesktop;
            ProcessService.AttachProcess(Process.GetCurrentProcess(), pDesktop);
            DisplayBindingService.InitializeService();
            LayoutConfiguration.LoadLayoutConfiguration();
            FileAgent.InitializeService();
            StatusBarService.Initialize();
            ParserService.InitializeService(GetActiveViewContent, ReportDesignerTextEditorProperties.Instance, ProjectService.ParserServiceCreatedProjectContents, Services.FileAgent.GetViewForFile, Services.FileAgent.GetOpenedFile);

            pDesktop.Initialize();
            
            if (SimpleDesktop.NeedRestart)
                return;

            pDesktop.SetMemento(PropertyService.Get(desktopMemento, new Property()));
            // aktivujeme správce bezpečného volání GUI metod
            ThreadService.ActivateCaller(pDesktop);
            // tato služba volá ThreadService
            TemporaryService.Initialize();

            PropertyService.PropertyChanged += new PropertyChangedEventHandler(TrackPropertyChanges);

            LoggingService.Info(string.Join(" ", GResources.GetResourceText(29450506), "->", GResources.GetResourceText(29450507))); //RC 29450507 : načtení pohledů na obsah
            pDesktop.DesktopLayout = layout;
            ColorService.InitializeService();
            OnDesktopCreated();
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
            Gordic.GFE.WinClient.Services.FileAgent.Unload();
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
        /// Metoda nutná pro UndoRedoService
        /// </summary>
        /// <returns>Aktivní pohled na obsah</returns>
        public static IViewContent GetActiveViewContent()
        {
            return SimpleDesktop.Desktop.ActiveViewContent;
        }

        static bool needRestart = true;
        /// <summary>
        /// indikuje nutnost restartovat aplikaci s odstraněním konfiguračních souborů
        /// </summary>
        public static bool NeedRestart { get { return needRestart; } set { needRestart = value; } }
    }
}
