//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ModuleForm.cs                          </Name>
//    <Description>                                                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                             </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025                  </Copyright>
//    <Created>     2009-06-15                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Windows.Forms;
using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.Base.Gui;
using Gordic.GFE.WinClient.Core;
using Gordic.GFE.WinClient.Project;

namespace Gordic.GFE.WinClient
{
    /// <summary>
    /// Hlavní modul aplikace
    /// </summary>
    sealed class DefaultDesktop : Form, IDesktop
    {
        #region IDesktop
        /// <summary>
        /// Hlavní formulář pracovního stolu
        /// </summary>
        public Form MainForm { get { return this; } }

        /// <summary>
        /// Zobrazení dalšího obsahu
        /// </summary>
        public bool ShowViewNext()
        {
            if (DesktopWindowCollection.Count != 0)
            {
                int index = DesktopWindowCollection.IndexOf(ActiveViewContent.DesktopWindow);
                this.DesktopLayout.ShowView(index < DesktopWindowCollection.Count - 1 ? DesktopWindowCollection[index + 1].ActiveViewContent : DesktopWindowCollection.First().ActiveViewContent, true);
                return true;
            }
            return false;
        }
        /// <summary>
        /// Zobrazení předchozího obsahu
        /// </summary>
        public bool ShowViewPrev()
        {
            if (DesktopWindowCollection.Count != 0)
            {
                int index = DesktopWindowCollection.IndexOf(ActiveViewContent.DesktopWindow);
                this.DesktopLayout.ShowView(index > 0 ? DesktopWindowCollection[index - 1].ActiveViewContent : DesktopWindowCollection.Last().ActiveViewContent, true);
                return true;
            }
            return false;
        }

        /// <summary>
        /// Název v záhlaví
        /// </summary>
        public string Title { get { return Text; } set { Text = value; } }

        /// <summary>
        /// Zjištění, zda GFE je aktivní aplikace ve Windows.
        /// </summary>
        public bool IsActiveWindow { get { return isActiveWindow; } }

        /// <summary>
        ///  Kolekce, v níž jsou uloženy všechny otevřené zobrazení obsahu 
        ///  (včetně všech sekundárních zobrazení obsahu).
        /// </summary>
        public ICollection<IViewContent> ViewContentCollection
        {
            get
            {
                ICollection<IViewContent> primaryContents = PrimaryViewContents;
                List<IViewContent> contents = new List<IViewContent>(primaryContents);
                try
                {
                    contents.AddRange(primaryContents.SelectMany(vc => vc.SecondaryViewContents));
                }
                catch (NullReferenceException ex) { LoggingService.Error(ex.Message); }
                return contents.AsReadOnly();
            }
        }
        /// <summary>
        /// Kolekce, v niž jsou uložené všechny primární pohledy na obsah
        /// </summary>
        public ICollection<IViewContent> PrimaryViewContents => primaryViewContentCollection.AsReadOnly(); 

        /// <summary>
        /// Kolekce, v niž jsou uloženy všechny okna pracovního prostoru
        /// </summary>
        public IList<IDesktopWindow> DesktopWindowCollection => primaryViewContentCollection.Select(vc => vc.DesktopWindow).Distinct().ToArray();

        IDesktopWindow activeDesktopWindow;
        /// <summary>
        /// Aktivní okno pracovního stolu.
        /// Toto okno obsahuje aktivní pohled na obsah.
        /// </summary>
        public IDesktopWindow ActiveDesktopWindow
        {
            get
            {
                if (!MainForm.InvokeRequired)
                    return activeDesktopWindow;
                else
                    throw new InvalidOperationException(GResources.GetResourceText(29450297)); //RC 29450297 : Tato operace může být voláná pouze v hlavním vlákně!
            }
            private set
            {
                if (activeDesktopWindow != value)
                {
                    if (activeDesktopWindow != null)
                        activeDesktopWindow.ActiveViewContentChanged -= OnDesktopActiveViewContentChanged;
                    activeDesktopWindow = value;
                    if (activeDesktopWindow != null)
                        activeDesktopWindow.ActiveViewContentChanged += OnDesktopActiveViewContentChanged;

                    ActiveDesktopWindowChanged?.Invoke(this, EventArgs.Empty);

                    OnDesktopActiveViewContentChanged(null, null);
                }
            }
        }
        void OnDesktopActiveViewContentChanged(object sender, EventArgs e)
        {
            // aktualizace ActiveViewContent
            IDesktopWindow window = this.ActiveDesktopWindow;
            this.ActiveViewContent = window?.ActiveViewContent;
            this.ActiveContent = layout.ActiveContent;
        }
        /// <summary>
        ///  Je volána, po změně vlastnosti ActiveDesktopWindow.
        /// </summary>
        public event EventHandler ActiveDesktopWindowChanged;

        IViewContent activeViewContent;
        /// <summary>
        /// Aktivní pohled na obsah uvnitř aktivního okna pracovního stolu
        /// </summary>
        public IViewContent ActiveViewContent
        {
            get { return activeViewContent; }
            private set
            {
                if (activeViewContent != value)
                {
                    activeViewContent = value;
                    ActiveViewContent_Changed?.Invoke(this, EventArgs.Empty);
                }
            }
        }

        List<EventHandler> listOfEvents = new List<EventHandler>();
        event EventHandler ActiveViewContent_Changed;
        /// <summary>
        /// Volá se po změně aktivního pohledu na obsah
        /// </summary>
        public event EventHandler ActiveViewContentChanged
        {
            add
            {
                if (!listOfEvents.Contains(value))
                {
                    listOfEvents.Add(value);
                    ActiveViewContent_Changed += value;
                }
            }
            remove
            {
                if (listOfEvents.Contains(value))
                {
                    listOfEvents.Remove(value);
                    ActiveViewContent_Changed -= value;
                }
            }
        }

        object activeContent;
        /// <summary>
        /// Aktivní obsah, závislý na tom, kde se nachází focus.
        /// Pokud aktuálně je aktivní dokument, pak tato hodnota se rovná ActiveViewContent,
        /// jinak aktivní objekt.
        /// </summary>
        public object ActiveContent
        {
            get { return activeContent; }
            private set
            {
                if (activeContent != value)
                {
                    activeContent = value;
                    ActiveContentChanged?.Invoke(this, EventArgs.Empty);
                }
            }
        }
        /// <summary>
        /// Volá se po změně aktivního obsahu.
        /// </summary>
        public event EventHandler ActiveContentChanged;

        /// <summary>
        /// Rozložení pracovní plochy
        /// </summary>
        public IDesktopLayout DesktopLayout
        {
            get { return layout; }
            set
            {
                if (layout != null)
                {
                    layout.ActiveDesktopWindowChanged -= OnActiveWindowChanged;
                    layout.Detach();
                }
                value.Attach(this);
                layout = value;
                layout.ActiveDesktopWindowChanged += OnActiveWindowChanged;
                OnActiveWindowChanged(null, null);
            }
        }

        /// <summary>
        /// Inicializace pracovní plochy.
        /// </summary>
        public void Initialize()
        {
            try
            {
                UpdateRenderer();

                MenuComplete += new EventHandler(SetStandardStatusBar);
                SetStandardStatusBar(null, null);

                FileAgent.FileRemoved += CheckRemovedOrReplacedFile;
                FileService.FileReplaced += CheckRemovedOrReplacedFile;
                FileAgent.FileRenamed += CheckRenamedFile;

                FileAgent.FileRemoved += FileAgent.RecentOpen.FileOrProjectRemove;
                FileAgent.FileRenamed += FileAgent.RecentOpen.FileRenamed;

                ArrayList contents = AddInTree.GetTreeNode(viewContentPath).BuildChildItems(this);
                foreach (PadDescriptor content in contents)
                    if (content != null)
                        ShowPad(content);

                CreateMainMenu();
                CreateToolBars();

                toolbarUpdateTimer = new System.Windows.Forms.Timer();
                toolbarUpdateTimer.Tick += new EventHandler(UpdateMenu);

                toolbarUpdateTimer.Interval = 500;
                toolbarUpdateTimer.Start();
                MessageFilterManager.LoadMessageFilter(typeof(DefaultDesktop));
            }
            catch (TreePathNotFoundException) { SimpleDesktop.NeedRestart = true; }
        }

        /// <summary>
        /// Vložení nového <see cref="IViewContent"/> objektu na pracovní plochu a přepnutí na nový pohled.
        /// </summary>
        /// <param name="content">Vytvářený pohled</param>
        public void ShowView(IViewContent content)
        {
            this.ShowView(content, true);
        }
        /// <summary>
        /// Vložení nového <see cref="IViewContent"/> objektu na pracovní plochu.
        /// </summary>
        /// <param name="content">Vytvářený pohled</param>
        /// <param name="switchToOpenedView">Indikuje potřebu přepnutí na nový pohled</param>
        public void ShowView(IViewContent content, bool switchToOpenedView)
        {
            if (content == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450298)); //RC 29450298 : Není žádný obsah!
            if (content.DesktopWindow != null)
                throw new ArgumentException(GResources.GetResourceText(29450299)); //RC 29450299 : Nelze zobrazit pohled, který je již zobrazen v jiném okně!

            if (layout == null)
                throw new InvalidOperationException(GResources.GetResourceText(29450300)); //RC 29450300 : Žádné rozložení není připojeno!

            primaryViewContentCollection.Add(content);
            if (PropertyService.Get("LoadDocumentProperties", true)
                && content is IMementoCapable)
            {
                try
                {
                    Property memento = GetStoredMemento(content);
                    if (memento != null)
                        ((IMementoCapable)content).SetMemento(memento);
                }
                catch (Exception) { MessageService.ShowError(GResources.GetResourceText(29450301)); } //RC 29450301 : Nelze získát nebo nastavit vlastnosti!
            }

            layout.ShowView(content, switchToOpenedView);
            if (switchToOpenedView)
                content.DesktopWindow.SelectWindow();

            OnViewOpened(new ViewContentEventArgs(content));
        }
        /// <summary>
        /// Zavření IViewContent obsahu pokud je otevřený.
        /// </summary>
        /// <param name="content">Obsah k zavření</param>
        public void CloseContent(IViewContent content)
        {
            if (PropertyService.Get("LoadDocumentProperties", true))
                if (content is IMementoCapable && !(content is DefaultAbstractSecondaryViewContent))
                    StoreMemento(content);

            if (primaryViewContentCollection.Contains(content))
                primaryViewContentCollection.Remove(content);

            OnViewClosed(new ViewContentEventArgs(content));
            content.Dispose();
            content = null;
        }

        /// <summary>
        /// Zavření všech pohledů pracovní plochy
        /// </summary>
        /// <param name="solution">indikuje potřebu zavření pouze všech pohledů sestavení</param>
        public void CloseAllViews(bool solution = false)
        {
            try
            {
                closeAll = true;
                if (solution)
                {
                    if (ProjectService.OpenSolution != null)
                    {
                        ProjectService.OpenSolution.Projects.ForEach(project => project.Items.ForEach(item => CloseByName(item.FileName)));

                        if (ProjectService.CurrentProject != null)
                            CloseByName(ProjectService.CurrentProject.FileName);
                    }
                }
                else
                    this.DesktopWindowCollection.ToArray().ForEach(window => window.CloseWindow(false));
            }
            finally
            {
                closeAll = false;
                OnActiveWindowChanged(this, EventArgs.Empty);
            }
        }

        void CloseByName(string fileName)
        {
            IViewContent content = SimpleDesktop.Desktop.PrimaryViewContents.FirstOrNull(vc => !string.IsNullOrEmpty(vc.PrimaryFileName) && vc.PrimaryFileName.Equals(fileName, StringComparison.InvariantCultureIgnoreCase));
            if (content != null && content.DesktopWindow != null)
                content.DesktopWindow.CloseWindow(false);
        }

        /// <summary>
        /// Opětovná inicializace všech komponent pracovní plochy, 
        /// může se volát po změně speciální vlastnosti která má vliv na rozložení
        /// </summary>
        public void RedrawAllComponents()
        {
            foreach (ToolStripItem item in TopMenu.Items)
                if (item is IStatusUpdate update)
                    update.UpdateText();

            ViewContentCollection.ForEach(content => content.RedrawContent());
            DesktopWindowCollection.ForEach(window => window.RedrawContent());
            padViewContentCollection.ForEach(content => content.RedrawContent());

            if (layout != null)
                layout.RedrawAllComponents();

            StatusBarService.RedrawStatusbar();
        }

        /// <summary>
        /// Aktualizace toolstrip renderer.
        /// </summary>
        public void UpdateRenderer()
        {
            ToolStripManager.Renderer = PropertyService.Get("UseProfessionalRenderer", true)
                ? new ToolStripProfessionalRenderer()
                : new ToolStripProfessionalRenderer(new ProfessionalColorTable { UseSystemColors = true });
        }

        /// <summary>
        /// Volá se po otevření pohledu
        /// </summary>
        public event ViewContentEventHandler ViewOpened;
        /// <summary>
        /// Volá se po zavření pohledu pracovního stolu
        /// </summary>
        public event ViewContentEventHandler ViewClosed;

        /// <summary>
        /// Volá se po stisknutí klávesy. Slouží k zachycení příkazových kláves.
        /// </summary>
        public event System.Windows.Forms.KeyEventHandler ProcessCommandKey;

        #region IMementoCapable
        string viewContentMementosFileName;
        string ViewContentMementosFileName
        {
            get
            {
                if (viewContentMementosFileName == null)
                    viewContentMementosFileName = Path.Combine(PropertyService.ConfigDirectory, "LastViewStates.xml");
                return viewContentMementosFileName;
            }
        }

        Property GetStoredMemento(IViewContent viewContent)
        {
            if (viewContent.PrimaryFileName == null)
                return null;

            string key = GetMementoKeyName(viewContent);
            LoggingService.DebugFormatted(GResources.GetResourceText(29450303) + " '{0}' " + GResources.GetResourceText(29450302) + " '{1}'.", viewContent.ToString().Split('.').Last(), key); //RC 29450303 : pokus o obnovení vlastnosti

            return this.LoadOrCreateViewContentMementos().Get<Property>(key, null);
        }
        static string GetMementoKeyName(IViewContent viewContent)
        {
            string pk = viewContent.PropertyKey.ToLowerInvariant();
            if (pk.Contains(".tmp\\"))
                pk = viewContent.PropertyKey.Substring(viewContent.PropertyKey.IndexOf(".tmp\\") + 5);

            return String.Concat(viewContent.GetType().FullName.GetHashCode().ToString("x", CultureInfo.InvariantCulture), ":", pk);
        }
        Property LoadOrCreateViewContentMementos()
        {
            try { return Property.Load(this.ViewContentMementosFileName) ?? new Property(); }
            catch (Exception ex)
            {
                LoggingService.Warning(GResources.GetResourceText(29450304) + '\n' + GResources.GetResourceText(29450305), ex); //RC 29450305 : Rušení všech uložených stavů zobrazení.
                return new Property();
            }
        }

        /// <summary>
        /// Vytvoření vlastnosti
        /// </summary>
        /// <returns></returns>
        public Property CreateMemento()
        {
            Property properties = new Property();
            properties["bounds"] = normalBounds.X.ToString(NumberFormatInfo.InvariantInfo)
                + "," + normalBounds.Y.ToString(NumberFormatInfo.InvariantInfo)
                + "," + normalBounds.Width.ToString(NumberFormatInfo.InvariantInfo)
                + "," + normalBounds.Height.ToString(NumberFormatInfo.InvariantInfo);

            properties["windowstate"] = FullScreen || WindowState == FormWindowState.Minimized
                ? defaultWindowState.ToString()
                : WindowState.ToString();
            properties["defaultstate"] = defaultWindowState.ToString();

            return properties;
        }
        /// <summary>
        /// Nastavení dle vlastnosti
        /// </summary>
        /// <param name="properties"></param>
        public void SetMemento(Property properties)
        {
            if (properties != null && properties.Contains("bounds"))
            {
                string[] bounds = properties["bounds"].Split(',');
                if (bounds.Length == 4)
                    Bounds = normalBounds = new Rectangle(int.Parse(bounds[0], NumberFormatInfo.InvariantInfo),
                                                          int.Parse(bounds[1], NumberFormatInfo.InvariantInfo),
                                                          int.Parse(bounds[2], NumberFormatInfo.InvariantInfo),
                                                          int.Parse(bounds[3], NumberFormatInfo.InvariantInfo));

                defaultWindowState = (FormWindowState)Enum.Parse(typeof(FormWindowState), properties["defaultstate"]);
                FullScreen = properties.Get("fullscreen", false);
                WindowState = (FormWindowState)Enum.Parse(typeof(FormWindowState), properties["windowstate"]);
            }
            else
                WindowState = FormWindowState.Maximized;
        }
        #endregion
        #endregion

        readonly List<PadDescriptor> padViewContentCollection = new List<PadDescriptor>();
        readonly List<IViewContent> primaryViewContentCollection = new List<IViewContent>();
        IDesktopLayout layout = null;
        bool isActiveWindow, closeAll, fullscreen; // indikuje, zda GFE je aktivní aplikace ve Windows
        Timer toolbarUpdateTimer;
        /// <summary>
        /// Menu
        /// </summary>
        public MenuStrip TopMenu = null;
        /// <summary>
        /// Nástrojové lišty
        /// </summary>
        public ToolStrip[] ToolBars = null;

        /// <summary>
        /// výchozí hodnoty ohraničení
        /// </summary>
        Rectangle normalBounds = new Rectangle(0, 0, 640, 480);
        /// <summary>
        /// výchozí status okna modulu
        /// </summary>
        FormWindowState defaultWindowState = FormWindowState.Normal;
        /// <summary>
        /// cesta k větví hlavního menu v konfiguračním souboru
        /// </summary>
        readonly string mainMenuPath = "/ReportDesigner/MainMenu", mainToolBarPath = "/ReportDesigner/ToolBarMenu";
        readonly static string viewContentPath = "/ReportDesigner/Desktop/Pads";

        /// <summary>
        /// Zobrazení přes celý displej
        /// </summary>
        public bool FullScreen
        {
            get { return fullscreen; }
            set
            {
                if (fullscreen == value)
                    return;

                fullscreen = value;

                if (fullscreen)
                {
                    defaultWindowState = WindowState;
                    // ohraničení viditelného okna se nastavují nekorektně
                    Visible = false;
                    FormBorderStyle = FormBorderStyle.None;
                    WindowState = FormWindowState.Maximized;
                    Visible = true;
                }
                else
                {
                    FormBorderStyle = FormBorderStyle.Sizable;
                    Bounds = normalBounds;
                    WindowState = defaultWindowState;
                }
                RedrawAllComponents();
            }
        }

        /// <summary>
        /// Vytvoření instance nové třídy
        /// </summary>
        public DefaultDesktop()
        {
            //Text = string.Join(" ", "GINIS®", GResources.GetResourceText(29450306), RevisionClass.MainVersion); //RC 29450306 : Návrhář sestav
            //Icon = WinFormsResourceService.GetIcon("Icons__App__gfe01");
            var UserProcess = ReportDesignerMain.Current;
            string l_sAppName = UserProcess.ApplicationInfo.Name.BaseValue;
            Text = UserProcess.GetApplicationTitle(l_sAppName) + "." + RevisionClass.Revision;

            if (Environment.Is64BitProcess)
            {
                Text += " (x64)";
            }

            Icon = Icon.ExtractAssociatedIcon(Application.ExecutablePath);
            StartPosition = FormStartPosition.Manual;
            AllowDrop = true;
        }

        #region Menu
        void CreateMainMenu()
        {
            TopMenu = new MenuStrip();
            TopMenu.Items.Clear();
            MenuService.AddItemsToMenu(TopMenu.Items, this, mainMenuPath);
            UpdateMenus();
        }
        void CreateToolBars()
        {
            if (ToolBars == null)
                ToolBars = ToolbarService.CreateToolbars(this, mainToolBarPath);
        }
        void UpdateMenu(object sender, EventArgs e)
        {
            UpdateMenus();
            UpdateToolbars();
        }
        void UpdateMenus()
        {
            // aktualizace menu
            foreach (object o in TopMenu.Items)
                if (o is IStatusUpdate update)
                    update.UpdateStatus();
        }
        void UpdateToolbars()
        {
            ToolBars?.ForEach(toolStrip => ToolbarService.UpdateToolbar(toolStrip));

            if (ToolBars.Length != 0)
            {
                var firstItem = ToolBars.First();
                if (firstItem.Parent is CustomToolStripPanel)
                    (firstItem.Parent as CustomToolStripPanel)._Refresh();
            }
        }
        #endregion

        #region Override
        /// <summary>
        /// Přetížení metody s účelem získání informace o poloze a velikosti okna
        /// </summary>
        /// <param name="e">argumet</param>
        protected override void OnResize(EventArgs e)
        {
            base.OnResize(e);
            if (!FullScreen && WindowState != FormWindowState.Minimized)
            {
                defaultWindowState = WindowState;
                if (WindowState == FormWindowState.Normal)
                    normalBounds = Bounds;
            }
        }
        /// <summary>
        /// Přetížení metody s účelem získání informace o poloze a velikosti okna
        /// </summary>
        /// <param name="e">argumet</param>
        protected override void OnLocationChanged(EventArgs e)
        {
            base.OnLocationChanged(e);
            if (WindowState == FormWindowState.Normal)
                normalBounds = Bounds;
        }
        /// <summary>
        /// Zavření vsupního okna
        /// </summary>
        /// <param name="e"></param>
        protected override void OnClosing(CancelEventArgs e)
        {
            base.OnClosing(e);

            while (SimpleDesktop.Desktop.DesktopWindowCollection.Count > 0)
            {
                IDesktopWindow window = SimpleDesktop.Desktop.DesktopWindowCollection[0];
                if (window == null)
                    SimpleDesktop.Desktop.DesktopWindowCollection.RemoveAt(0);
                else if (window != null && !window.CloseWindow(false))
                {
                    e.Cancel = true;
                    return;
                }
            }

            closeAll = true;

            ParserService.StopParserThread();
            TowedService.StopTowedThread();
            layout.Detach();
            PadContentCollection.ForEach(padDescriptor => padDescriptor.Dispose());
        }
        /// <exclude/>
        protected override void OnDragDrop(DragEventArgs drgevent)
        {
            try
            {
                //pokud je to Soubor, pak zjistíme jeho název a navíc musí být pouze jeden ...
                ((string[])drgevent.Data.GetData(DataFormats.FileDrop, false)).ForEach(item =>
                {
                    if (FileUtility.TestFileExists(item)) FileAgent.OpenFile(item);
                });
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450189) + ':', ex); } //RC 29450189 : Chyba
        }
        /// <exclude/>
        protected override void OnDragOver(DragEventArgs drgevent)
        {
            // zjistíme, co přetahujeme na form
            drgevent.Effect = drgevent.Data.GetDataPresent(DataFormats.FileDrop) ? DragDropEffects.All : DragDropEffects.None;

            base.OnDragOver(drgevent);
        }
        /// <summary>
        /// Po aktivaci formu
        /// </summary>
        /// <param name="e"></param>
        protected override void OnActivated(EventArgs e)
        {
            isActiveWindow = true;
            base.OnActivated(e);
        }
        /// <summary>
        /// Po deaktivací formu
        /// </summary>
        /// <param name="e"></param>
        protected override void OnDeactivate(EventArgs e)
        {
            isActiveWindow = false;
            base.OnDeactivate(e);
        }
        /// <exclude/>
        protected override bool ProcessCmdKey(ref Message msg, Keys keyData)
        {
            if (ProcessCommandKey != null)
            {
                KeyEventArgs e = new KeyEventArgs(keyData);
                ProcessCommandKey(this, e);
                if (e.Handled || e.SuppressKeyPress)
                    return true;
            }
            if (IsAltGRPressed)
                return false;
            return base.ProcessCmdKey(ref msg, keyData);
        }
        /// <summary>
        /// Indikace stisknutí klávey AltGr
        /// </summary>
        public static bool IsAltGRPressed
        {
            get { return NativeMethods.IsKeyPressed(Keys.RMenu) && (Control.ModifierKeys & Keys.Control) == Keys.Control; }
        }
        #endregion

        #region Pads
        /// <summary>
        /// Kolekce všech uložených aktivních oken plochy.
        /// </summary>
        public IList<PadDescriptor> PadContentCollection
        {
            get
            {
                Debug.Assert(padViewContentCollection != null);
                return padViewContentCollection;
            }
        }
        /// <summary>
        /// Vložení nového objektu na plochu.
        /// </summary>
        /// <param name="content">Podložka s obsahem</param>
        public void ShowPad(PadDescriptor content)
        {
            if (content == null)
                throw new ArgumentNullException("content");
            PadContentCollection.Add(content);

            if (layout != null)
                layout.ShowPad(content);
        }
        /// <summary>
        /// Zavření a uvolnění.
        /// </summary>
        /// <param name="content">Podložka s obsahem</param>
        public void UnloadPad(PadDescriptor content)
        {
            PadContentCollection.Remove(content);

            if (layout != null)
                layout.UnloadPad(content);
            content.Dispose();
        }
        /// <summary>
        /// Získání podložky specifického typu
        /// </summary>
        /// <param name="type">Typ podložky</param>
        public PadDescriptor GetPad(Type type) => PadContentCollection.Count > 0 ? PadContentCollection.First(pad => pad.Class == type.FullName) : null;
        #endregion

        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing"></param>
        protected override void Dispose(bool disposing)
        {
            MessageFilterManager.UnloadMessageFilter(typeof(DefaultDesktop));
            base.Dispose(disposing);
            GC.SuppressFinalize(this);
        }

        void InitializeComponent()
        {
            ComponentResourceManager resources = new ComponentResourceManager(typeof(DefaultDesktop));
            this.SuspendLayout();
            // 
            // DefaultDesktop
            // 
            resources.ApplyResources(this, "$this");
            Name = "DefaultDesktop";
            ResumeLayout(false);
        }
        void SetStandardStatusBar(object sender, EventArgs e)
        {
            StatusBarService.SetMessage(GResources.GetResourceText(29450307)); //RC 29450307 : Připraven
        }
        void CheckRemovedOrReplacedFile(object sender, FileEventArgs e)
        {
            foreach (OpenedFile file in FileAgent.OpenedFiles)
                if (FileUtility.IsBaseDirectory(e.FileName, file.FileName))
                    file.RegisteredViewContents.ToArray().ForEach(content =>
                    {
                        // content.DesktopWindow může být NULL
                        if (content.DesktopWindow != null)
                            content.DesktopWindow.CloseWindow(true);
                    });
        }
        void CheckRenamedFile(object sender, FileRenameEventArgs e)
        {
            if (e.IsDirectory)
                FileAgent.OpenedFiles.ForEach(file =>
                {
                    if (file.FileName != null && FileUtility.IsBaseDirectory(e.SourceFile, file.FileName))
                        file.FileName = FileUtility.RenameBaseDirectory(file.FileName, e.SourceFile, e.TargetFile);
                });
            else
                foreach (OpenedFile file in FileAgent.OpenedFiles)
                    if (file.FileName != null &&
                        FileUtility.IsEqualFileName(file.FileName, e.SourceFile))
                    {
                        file.FileName = e.TargetFile;
                        return;
                    }
        }
        void StoreMemento(IViewContent viewContent)
        {
            if (string.IsNullOrEmpty(viewContent.PrimaryFileName))
                return;

            string key = GetMementoKeyName(viewContent);
            LoggingService.DebugFormatted(GResources.GetResourceText(29450309) + " '{0}' " + GResources.GetResourceText(29450308) + " '{1}'.", viewContent.ToString().Split('.').Last(), key); //RC 29450309 : uložení vlastnosti

            Property property = ((IMementoCapable)viewContent).CreateMemento();
            Property p = LoadOrCreateViewContentMementos();
            p.Set(key, property);
            FileUtility.ObservedSave(new NamedFileOperationDelegate(p.Save), ViewContentMementosFileName, FileErrorPolicy.Inform, false);
        }
        void OnViewOpened(ViewContentEventArgs e)
        {
            ViewOpened?.Invoke(this, e);
        }
        void OnViewClosed(ViewContentEventArgs e)
        {
            ViewClosed?.Invoke(this, e);
        }
        void OnActiveWindowChanged(object sender, EventArgs e)
        {
            if (closeAll) return;

            if (layout == null)
            {
                ActiveDesktopWindow = null;
                ActiveContent = null;
            }
            else
            {
                ActiveDesktopWindow = layout.ActiveDesktopWindow;
                ActiveContent = layout.ActiveContent;
            }
        }
    }

    /// <summary>
    /// Odchycení zpráv hlavní aplikace
    /// </summary>
    class DefaultDesktopKeyHandler : IMessageFilter
    {
        const int keyPressedMessage = 0x100;

        /// <summary>
        /// Odchycení zpráv aplikace
        /// </summary>
        /// <param name="m">Odchycená zprava</param>
        /// <returns></returns>
        public bool PreFilterMessage(ref Message m)
        {
            if (m.Msg != keyPressedMessage)
                return false;

            Keys keyPressed = (Keys)m.WParam.ToInt32() | Control.ModifierKeys;
            if (keyPressed == (Keys.Control | Keys.PageUp))
                return SimpleDesktop.Desktop.ShowViewNext();
            if (keyPressed == (Keys.Control | Keys.PageDown))
                return SimpleDesktop.Desktop.ShowViewPrev();
            return false;
        }
    }

}
