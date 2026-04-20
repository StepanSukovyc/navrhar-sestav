//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.FillerDesktopLayout.cs              </Name>
//    <Description> Pracovní prostor s jednoduchým rozhraním pro dokumenty      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-12                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Docking;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.Widgets;
using Gordic.General;

namespace Gordic.Gfe.FormFiller.Gui
{
    /// <summary>
    /// Pracovní prostor s jednoduchým rozhraním pro dokumenty
    /// </summary>
    sealed class FillerDesktopLayout : IDesktopLayout
    {
        #region IDesktopLayout
        /// <summary>
        /// Volá se po změně pracovního okna na jiné
        /// </summary>
        public event EventHandler ActiveDesktopWindowChanged;

        /// <summary>
        /// Aktivní okno pracovní plochy
        /// </summary>
        public IDesktopWindow ActiveDesktopWindow
        {
            get
            {
                if (dockPanel == null)
                    return null;

                return !(dockPanel.ActiveDocument is IDesktopWindow window) || window.IsDisposed ? null : window;
            }
        }

        IDockContent lastActiveContent;
        /// <summary>
        /// Aktivní obsah. Může být IViewContent nebo nějaký objekt, 
        /// záleží na tom, kde se nachází fokus
        /// </summary>
        public object ActiveContent
        {
            get
            {
                IDockContent activeContent;
                if (dockPanel == null)
                    activeContent = lastActiveContent;
                else
                    activeContent = dockPanel.ActiveContent ?? lastActiveContent;

                if (activeContent != null && activeContent.IsDisposed)
                    activeContent = null;

                lastActiveContent = activeContent;

                if (activeContent is IDesktopWindow)
                    return ((IDesktopWindow)activeContent).ActiveViewContent;
                if (activeContent is PadContentWrapper)
                    return ((PadContentWrapper)activeContent).PadContent;

                return activeContent;
            }
        }

        /// <summary>
        /// Připojení daného správce rozvržení k pracovní ploše
        /// </summary>
        /// <param name="desktop">Daná pracovní plocha</param>
        public void Attach(IDesktop desktop)
        {
            wbForm = (DefaultDesktop)desktop;
            wbForm.SuspendLayout();
            wbForm.Controls.Clear();

            mainMenuContainer = new AutoHideMenuStripContainer(wbForm.TopMenu)
            {
                Dock = DockStyle.Top
            };

            statusStripContainer = new AutoHideStatusStripContainer((StatusStrip)StatusBarService.Control)
            {
                Dock = DockStyle.Bottom
            };

            toolBarPanel = new ToolStripPanel();
            if (wbForm.ToolBars != null)
                toolBarPanel.Controls.AddRange(wbForm.ToolBars);
            toolBarPanel.Dock = DockStyle.Top;

            dockPanel = new DockPanel
            {
                Dock = DockStyle.Fill,
                RightToLeftLayout = true,
                DocumentStyle = DocumentStyle.DockingWindow
            };

            wbForm.Controls.Add(dockPanel);
            wbForm.Controls.Add(toolBarPanel);
            wbForm.Controls.Add(mainMenuContainer);
            wbForm.Controls.Add(statusStripContainer);
            wbForm.MainMenuStrip = wbForm.TopMenu;

            LoadLayoutConfiguration();
            ShowPads();
            ShowViewContents();
            RedrawAllComponents();

            dockPanel.ActiveDocumentChanged += new EventHandler(ActiveMdiChanged);
            dockPanel.ActiveContentChanged += new EventHandler(ActiveContentChanged);
            ActiveMdiChanged(this, EventArgs.Empty);

            wbForm.ResumeLayout(false);

            Property fullscreenProperties = PropertyService.Get("Gui.FullscreenOptions", new Property());
            fullscreenProperties.PropertyChanged += TrackFullscreenPropertyChanges;
        }
        /// <summary>
        /// Odpojení tohoto správce od aktuální pracovní plochy
        /// </summary>
        public void Detach()
        {
            StoreConfiguration();
            dockPanel.ActiveDocumentChanged -= new EventHandler(ActiveMdiChanged);

            DetachPadContents(true);
            DetachViewContents(true);

            try
            {
                if (dockPanel != null)
                {
                    dockPanel.Dispose();
                    dockPanel = null;
                }
            }
            catch (Exception e) { MessageService.ShowError(e); }

            if (contentHash != null)
                contentHash.Clear();
            wbForm.Controls.Clear();
        }
        /// <summary>
        /// Opětovná inicializace všech komponent správce rozvržení
        /// </summary>
        public void RedrawAllComponents()
        {
            foreach (PadDescriptor padDescriptor in ((IDesktop)wbForm).PadContentCollection)
            {
                DockContent c = contentHash[padDescriptor.Class];
                if (c != null)
                    c.Text = StringParser.Parse(padDescriptor.Title);
            }

            RedrawMainMenu();
            RedrawToolbars();
            RedrawStatusBar();
        }
        /// <summary>
        /// Načtení nastavení
        /// </summary>
        public void LoadConfiguration()
        {
            if (dockPanel != null)
            {
                Gordic.GFE.Parsers.Utils.NativeMethods.SetWindowRedraw(wbForm.Handle, false);
                try
                {
                    IDesktopWindow activeWindow = this.ActiveDesktopWindow;
                    dockPanel.ActiveDocumentChanged -= new EventHandler(ActiveMdiChanged);
                    dockPanel.ActiveContentChanged -= new EventHandler(ActiveContentChanged);

                    DetachPadContents(false);
                    DetachViewContents(false);
                    dockPanel.ActiveDocumentChanged += new EventHandler(ActiveMdiChanged);
                    dockPanel.ActiveContentChanged += new EventHandler(ActiveContentChanged);

                    LoadLayoutConfiguration();
                    ShowPads();
                    ShowViewContents();
                    if (activeWindow != null)
                        activeWindow.SelectWindow();
                }
                finally
                {
                    Gordic.GFE.Parsers.Utils.NativeMethods.SetWindowRedraw(wbForm.Handle, true);
                    wbForm.Refresh();
                }
            }
        }
        /// <summary>
        /// Uložení nastavení
        /// </summary>
        public void StoreConfiguration()
        {
            try
            {
                if (dockPanel != null)
                {
                    LayoutConfiguration current = LayoutConfiguration.CurrentLayout;
                    if (current != null && !current.ReadOnly)
                    {
                        string configPath = Path.Combine(PropertyService.ConfigDirectory, "layouts");
                        if (!Directory.Exists(configPath))
                            Directory.CreateDirectory(configPath);
                        dockPanel.SaveAsXml(Path.Combine(configPath, current.FileName), System.Text.Encoding.UTF8);
                    }
                }
            }
            catch (Exception e) { MessageService.ShowError(e); }
        }
        /// <summary>
        /// Skrýtí podložky <see cref="IPadContent"/>.
        /// </summary>
        /// <param name="padContent">Podložka s obsahem</param>
        public void HidePad(PadDescriptor padContent)
        {
            if (padContent != null && contentHash.ContainsKey(padContent.Class))
                contentHash[padContent.Class].Hide();
        }
        /// <summary>
        /// Zavření a uvolnění <see cref="IPadContent"/>.
        /// </summary>
        /// <param name="padContent">Podložka s obsahem</param>
        public void UnloadPad(PadDescriptor padContent)
        {
            if (padContent != null && contentHash.ContainsKey(padContent.Class))
            {
                contentHash[padContent.Class].Close();
                contentHash[padContent.Class].Dispose();
                contentHash.Remove(padContent.Class);
            }
        }
        /// <summary>
        /// Zobrazení nové <see cref="IPadContent"/>.
        /// </summary>
        /// <param name="content">Obsah</param>
        public void ShowPad(PadDescriptor content)
        {
            if (content == null)
                return;

            if (!contentHash.TryGetValue(content.Class, out PadContentWrapper dockContent))
            {
                dockContent = CreateContent(content);
                dockContent.Show(dockPanel);
            }
            else if (dockContent.VisibleState == DockState.Unknown)
                dockContent.Show(dockPanel);
            else
                dockContent.Show();
        }
        /// <summary>
        /// Aktivace podložky (Show udělá podložku pouze viditelnou
        /// ale Activate zároveň převede podložku do popředí)
        /// </summary>
        /// <param name="padContent">Obsah podložky</param>
        public void ActivatePad(PadDescriptor padContent)
        {
            if (padContent != null && contentHash.ContainsKey(padContent.Class))
                contentHash[padContent.Class].Show();
        }
        /// <summary>
        /// Aktivace podložky
        /// </summary>
        /// <param name="fullyQualifiedTypeName">úplný název typu podložky</param>
        public void ActivatePad(string fullyQualifiedTypeName)
        {
            contentHash[fullyQualifiedTypeName].Show();
        }

        /// <summary>
        /// Vrácí TRUE, pokud padContent je viditelný;
        /// </summary>
        /// <param name="padContent">Obsah</param>
        public bool IsVisible(PadDescriptor padContent)
        {
            if (padContent != null && contentHash.ContainsKey(padContent.Class))
            {
                PadContentWrapper dockContent = contentHash[padContent.Class];
                return !dockContent.IsHidden && dockContent.VisibleState != DockState.Unknown;
            }
            return false;
        }

        internal void OnActiveDesktopWindowChanged(EventArgs e)
        {
            IDesktopWindow newWindow = this.ActiveDesktopWindow;
            if (newWindow == null || newWindow.ActiveViewContent != null)
                ActiveDesktopWindowChanged?.Invoke(this, e);

            if (oldSelectedWindow != null && oldSelectedWindow.ActiveViewContent != null)
                oldSelectedWindow.OnWindowDeselected(EventArgs.Empty);
            oldSelectedWindow = newWindow;
            if (newWindow != null && newWindow.ActiveViewContent != null)
                newWindow.OnWindowSelected(EventArgs.Empty);
        }

        /// <summary>
        /// Zobrazení nového <see cref="IViewContent"/> a případné přepnutí na něj.
        /// </summary>
        /// <param name="content">Obsah k zobrazení.</param>
        /// <param name="switchToOpenedView">Indikuje potřebu přepnutí na něj.</param>
        /// <returns></returns>
        public IDesktopWindow ShowView(IViewContent content, bool switchToOpenedView)
        {
            if (content.DesktopWindow is FillerWorkspaceWindow oldSdiWindow)
                if (!oldSdiWindow.IsDisposed)
                {
                    if (switchToOpenedView)
                        oldSdiWindow.Show(dockPanel);
                    else
                        this.AddWindowToDockPanelWithoutSwitching(oldSdiWindow);
                    return oldSdiWindow;
                }
            (content.Control as Control).Dock = DockStyle.Fill;
            FillerWorkspaceWindow rdiWorkspaceWindow = new FillerWorkspaceWindow();

            rdiWorkspaceWindow.ViewContents.Add(content);
            rdiWorkspaceWindow.ViewContents.AddRange(content.SecondaryViewContents);
            rdiWorkspaceWindow.CloseEvent += new EventHandler(CloseWindowEvent);
            if (dockPanel != null)
                if (switchToOpenedView)
                    rdiWorkspaceWindow.Show(dockPanel);
                else
                    this.AddWindowToDockPanelWithoutSwitching(rdiWorkspaceWindow);

            return rdiWorkspaceWindow;
        }

        DockContent GetContent(string padTypeName)
        {
            foreach (PadDescriptor content in SimpleDesktop.Desktop.PadContentCollection)
                if (content.Class == padTypeName)
                    return CreateContent(content);
            return null;
        }

        PadContentWrapper CreateContent(PadDescriptor content)
        {
            if (contentHash.ContainsKey(content.Class))
                return contentHash[content.Class];

            PadContentWrapper newContent = new PadContentWrapper(content);
            if (!string.IsNullOrEmpty(content.Icon))
                newContent.Icon = IconService.GetIcon(content.Icon);
            newContent.Text = StringParser.Parse(content.Title);
            contentHash[content.Class] = newContent;
            return newContent;
        }

        void TrackFullscreenPropertyChanges(object sender, PropertyChangedEventArgs e)
        {
            if (!Boolean.Equals(e.OldValue, e.NewValue) && wbForm.FullScreen)
                switch (e.Key)
                {
                    case "HideMainMenu":
                    case "ShowMainMenuOnMouseMove":
                        RedrawMainMenu();
                        break;
                    case "HideToolbars":
                        RedrawToolbars();
                        break;
                    case "HideStatusBar":
                    case "ShowStatusBarOnMouseMove":
                        RedrawStatusBar();
                        break;
                }
        }
        void RedrawMainMenu()
        {
            Property fullscreenProperties = PropertyService.Get("Gui.FullscreenOptions", new Property());
            bool hideInFullscreen = fullscreenProperties.Get("HideMainMenu", false);
            bool showOnMouseMove = fullscreenProperties.Get("ShowMainMenuOnMouseMove", true);

            mainMenuContainer.AutoHide = wbForm.FullScreen && hideInFullscreen;
            mainMenuContainer.ShowOnMouseDown = true;
            mainMenuContainer.ShowOnMouseMove = showOnMouseMove;
        }
        void RedrawToolbars()
        {
            Property fullscreenProperties = PropertyService.Get("Gui.FullscreenOptions", new Property());
            bool hideInFullscreen = fullscreenProperties.Get("HideToolbars", true);
            bool toolBarVisible = PropertyService.Get("Gui.ToolBarVisible", true);

            toolBarPanel.Visible = toolBarVisible && !(wbForm.FullScreen && hideInFullscreen);
        }
        void RedrawStatusBar()
        {
            Property fullscreenProperties = PropertyService.Get("Gui.FullscreenOptions", new Property());
            bool hideInFullscreen = fullscreenProperties.Get("HideStatusBar", true);
            bool showOnMouseMove = fullscreenProperties.Get("ShowStatusBarOnMouseMove", true);
            bool statusBarVisible = PropertyService.Get("Gui.StatusBarVisible", true);

            statusStripContainer.AutoHide = wbForm.FullScreen && hideInFullscreen;
            statusStripContainer.ShowOnMouseDown = true;
            statusStripContainer.ShowOnMouseMove = showOnMouseMove;
            statusStripContainer.Visible = statusBarVisible;
        }
        void DetachViewContents(bool dispose)
        {
            foreach (FillerWorkspaceWindow f in SimpleDesktop.Desktop.DesktopWindowCollection)
                try
                {
                    f.DockPanel = null;
                    if (dispose)
                    {
                        f.CloseEvent -= CloseWindowEvent;
                        f.Dispose();
                    }
                }
                catch (Exception e) { MessageService.ShowError(e); }
        }
        void CloseWindowEvent(object sender, EventArgs e)
        {
            FillerWorkspaceWindow f = (FillerWorkspaceWindow)sender;
            f.CloseEvent -= CloseWindowEvent;
            foreach (IViewContent vc in f.ViewContents.ToArray())
                ((IDesktop)wbForm).CloseContent(vc);
            if (f == oldSelectedWindow)
                oldSelectedWindow = null;
            ActiveMdiChanged(this, null);
        }
        void ShowPads()
        {
            foreach (PadDescriptor content in SimpleDesktop.Desktop.PadContentCollection)
                if (!contentHash.ContainsKey(content.Class))
                    ShowPad(content);

            // ShowPads může vytvořit nové podložky pokud nové doplňky byli nainstalované, takže musíme
            // zde zavolat AllowInitialize  místo LoadLayoutConfiguration
            foreach (PadContentWrapper content in contentHash.Values)
                content.SetAllowInitialize();
        }
        void ShowViewContents()
        {
            foreach (IViewContent content in wbForm.PrimaryViewContents)
                ShowView(content, true);
        }
        void LoadLayoutConfiguration()
        {
            try
            {
                if (File.Exists(LayoutConfiguration.CurrentLayoutFileName))
                    LoadDockPanelLayout(LayoutConfiguration.CurrentLayoutFileName);
                else
                    LoadDefaultLayoutConfiguration();
            }
            catch (Exception ex)
            {
                MessageService.ShowError(ex);
                LoggingService.Info(GResources.GetResourceText(29450061)); //RC 29450061 : ignorujeme chyby načítání konfigurace rozložení.
            }
        }
        void LoadDefaultLayoutConfiguration()
        {
            if (!File.Exists(LayoutConfiguration.CurrentLayoutTemplateFileName))
                ResourceService.SaveFile(typeof(FormFillerMain).Assembly, Path.Combine(PropertyService.DataDirectory, LayoutConfiguration.DataLayoutSubPath), @"^*layouts.Default.xml", "layouts.");
            if (File.Exists(LayoutConfiguration.CurrentLayoutTemplateFileName))
                LoadDockPanelLayout(LayoutConfiguration.CurrentLayoutTemplateFileName);
        }
        void LoadDockPanelLayout(string fileName)
        {
            // LoadFromXml(fileName, ...) uzamkne soubor pro současný přístup ke čtení
            // -> pokud by se dvakrát spustil Návrhář, pak by hrozila ztrata rozložení
            // pro tento účel by se měl otevřít proud pro sdílený přístup ke čtení.
            using (FileStream fs = new FileStream(fileName, FileMode.Open, FileAccess.Read))
                dockPanel.LoadFromXml(fs, new DeserializeDockContent(GetContent));
        }
        void ActiveMdiChanged(object sender, EventArgs e)
        {
            OnActiveDesktopWindowChanged(e);
        }
        void ActiveContentChanged(object sender, EventArgs e)
        {
            OnActiveDesktopWindowChanged(e);
        }
        void DetachPadContents(bool dispose)
        {
            foreach (PadContentWrapper padContentWrapper in contentHash.Values)
                padContentWrapper.AllowInitialize = false;
            foreach (PadDescriptor content in ((DefaultDesktop)wbForm).PadContentCollection)
                try
                {
                    PadContentWrapper padContentWrapper = contentHash[content.Class];
                    padContentWrapper.DockPanel = null;
                    if (dispose)
                    {
                        padContentWrapper.DetachContent();
                        padContentWrapper.Dispose();
                    }
                }
                catch (Exception e) { MessageService.ShowError(e); }
            if (dispose)
                contentHash.Clear();
        }
        void AddWindowToDockPanelWithoutSwitching(FillerWorkspaceWindow rdiWorkspaceWindow)
        {
            rdiWorkspaceWindow.DockPanel = dockPanel;
            if (!(dockPanel.ActiveContent is FillerWorkspaceWindow otherWindow))
                otherWindow = dockPanel.Contents.OfType<FillerWorkspaceWindow>().FirstOrDefault(c => c.Pane != null);
            if (otherWindow != null)
                rdiWorkspaceWindow.Pane = otherWindow.Pane;
            rdiWorkspaceWindow.DockState = DockState.Document;
        }
        #endregion

        DefaultDesktop wbForm;
        DockPanel dockPanel;
        Dictionary<string, PadContentWrapper> contentHash = new Dictionary<string, PadContentWrapper>();

        AutoHideMenuStripContainer mainMenuContainer;
        AutoHideStatusStripContainer statusStripContainer;
        ToolStripPanel toolBarPanel;
        IDesktopWindow oldSelectedWindow = null;
    }
}
