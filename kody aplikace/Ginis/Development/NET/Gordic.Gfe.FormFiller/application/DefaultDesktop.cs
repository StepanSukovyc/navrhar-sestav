//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.DefaultDesktop.cs                   </Name>
//    <Description> Hlavní modul aplikace                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
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
using Gordic.Gfe.FormFiller.Gui;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.General;

namespace Gordic.Gfe.FormFiller
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
        public Form MainForm { get => this; }
        /// <summary>
        /// Název v záhlaví
        /// </summary>
        public string Title { get => Text; set { Text = value; } }

        /// <summary>
        /// Zjištění, zda GFE je aktivní aplikace ve Windows.
        /// </summary>
        public bool IsActiveWindow { get => isActiveWindow; }

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
                contents.AddRange(primaryContents.SelectMany(vc => vc.SecondaryViewContents));
                return contents.AsReadOnly();
            }
        }
        /// <summary>
        /// Kolekce, v niž jsou uložené všechny primární pohledy na obsah
        /// </summary>
        public ICollection<IViewContent> PrimaryViewContents { get => primaryViewContentCollection.AsReadOnly(); }
        /// <summary>
        /// Kolekce, v niž jsou uloženy všechny okna pracovního prostoru
        /// </summary>
        public IList<IDesktopWindow> DesktopWindowCollection
        {
            get => primaryViewContentCollection.Select(vc => vc.DesktopWindow).Distinct().ToArray().AsReadOnly();
        }

        IDesktopWindow activeDesktopWindow;
        /// <summary>
        /// Aktivní okno pracovního stolu.
        /// Toto okno obsahuje aktivní pohled na obsah.
        /// </summary>
        public IDesktopWindow ActiveDesktopWindow
        {
            get
            {
                ThreadService.AssertMainThread();
                return activeDesktopWindow;
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
            get
            {
                ThreadService.AssertMainThread();
                return activeViewContent;
            }
            private set
            {
                if (activeViewContent != value)
                {
                    activeViewContent = value;
                    EHActiveViewContentChanged?.Invoke(this, EventArgs.Empty);
                }
            }
        }

        List<EventHandler> listOfEvents = new List<EventHandler>();
        event EventHandler EHActiveViewContentChanged;
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
                    EHActiveViewContentChanged += value;
                }
            }
            remove
            {
                if (listOfEvents.Contains(value))
                {
                    listOfEvents.Remove(value);
                    EHActiveViewContentChanged -= value;
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
            get => activeContent;
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
            get => layout;
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
            UpdateRenderer();

            MenuComplete += new EventHandler(SetStandardStatusBar);
            SetStandardStatusBar(null, null);

            FileAgent.FileRenamed += CheckRenamedFile;
            FileAgent.FileRenamed += FileAgent.RecentOpen.FileRenamed;

            try
            {
                ArrayList contents = AddInTree.GetTreeNode(viewContentPath).BuildChildItems(this);
                foreach (PadDescriptor content in contents)
                    if (content != null)
                        ShowPad(content);
            }
            catch (TreePathNotFoundException) { }

            CreateMainMenu();
            CreateToolBars();

            toolbarUpdateTimer = new System.Windows.Forms.Timer();
            toolbarUpdateTimer.Tick += new EventHandler(UpdateMenu);

            toolbarUpdateTimer.Interval = 500;
            toolbarUpdateTimer.Start();
        }

        void SetStandardStatusBar(object sender, EventArgs e)
        {
            StatusBarService.SetMessage(GResources.GetResourceText(29450022)); //RC 29450022 : Připraven
        }
        void CheckRenamedFile(object sender, FileRenameEventArgs e)
        {
            if (e.IsDirectory)
            {
                foreach (OpenedFile file in FileAgent.OpenedFiles)
                    if (file.FileName != null && FileUtility.IsBaseDirectory(e.SourceFile, file.FileName))
                        file.FileName = FileUtility.RenameBaseDirectory(file.FileName, e.SourceFile, e.TargetFile);
            }
            else
            {
                foreach (OpenedFile file in FileAgent.OpenedFiles)
                    if (file.FileName != null &&
                        FileUtility.IsEqualFileName(file.FileName, e.SourceFile))
                    {
                        file.FileName = e.TargetFile;
                        return;
                    }
            }
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
                throw new ArgumentNullException(GResources.GetResourceText(29450023)); //RC 29450023 : Není žádný obsah!
            if (content.DesktopWindow != null)
                throw new ArgumentException(GResources.GetResourceText(29450024)); //RC 29450024 : Nelze zobrazit pohled, který je již zobrazen v jiném okně!

            if (layout == null)
                throw new InvalidOperationException(GResources.GetResourceText(29450025)); //RC 29450025 : Žádné rozložení není připojeno!

            primaryViewContentCollection.Add(content);
            if (PropertyService.Get("LoadDocumentProperties", true) && content is IMementoCapable)
                try { ((IMementoCapable)content).SetMemento(GetStoredMemento(content)); }
                catch (Exception) { MessageService.ShowError(GResources.GetResourceText(29450026)); } //RC 29450026 : Nelze získát nebo nastavit vlastnosti!

            layout.ShowView(content, switchToOpenedView);
            if (switchToOpenedView)
                content.DesktopWindow.SelectWindow();

            OnViewOpened(new ViewContentEventArgs(content));
        }
        void OnViewOpened(ViewContentEventArgs e)
        {
            ViewOpened?.Invoke(this, e);
        }
        void OnViewClosed(ViewContentEventArgs e)
        {
            ViewClosed?.Invoke(this, e);
        }
        /// <summary>
        /// Zavření IViewContent obsahu pokud je otevřený.
        /// </summary>
        /// <param name="content">Obsah k zavření</param>
        public void CloseContent(IViewContent content)
        {
            if (PropertyService.Get("LoadDocumentProperties", true) && content is IMementoCapable)
                StoreMemento(content);
            if (primaryViewContentCollection.Contains(content))
                primaryViewContentCollection.Remove(content);
            OnViewClosed(new ViewContentEventArgs(content));
            content.Dispose();
            content = null;
        }
        void StoreMemento(IViewContent viewContent)
        {
            if (string.IsNullOrEmpty(viewContent.PrimaryFileName))
                return;

            string key = GetMementoKeyName(viewContent);
            LoggingService.DebugFormatted(string.Join(" ", GResources.GetResourceText(29450027), "'{0}'", GResources.GetResourceText(29450028), "'{1}'."), viewContent.ToString(), key); //RC 29450028 : do klíče

            Property property = ((IMementoCapable)viewContent).CreateMemento();
            Property p = this.LoadOrCreateViewContentMementos();
            p.Set(key, property);
            FileUtility.ObservedSave(new NamedFileOperationDelegate(p.Save), this.ViewContentMementosFileName, FileErrorPolicy.Inform, false);
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
                foreach (IDesktopWindow window in this.DesktopWindowCollection.ToArray())
                    window.CloseWindow(false);
            }
            finally
            {
                closeAll = false;
                OnActiveWindowChanged(this, EventArgs.Empty);
            }
        }
        void OnActiveWindowChanged(object sender, EventArgs e)
        {
            if (closeAll) return;

            if (layout == null)
            {
                this.ActiveDesktopWindow = null;
                this.ActiveContent = null;
            }
            else
            {
                this.ActiveDesktopWindow = layout.ActiveDesktopWindow;
                this.ActiveContent = layout.ActiveContent;
            }
        }

        /// <summary>
        /// Opětovná inicializace všech komponent pracovní plochy, 
        /// může se volát po změně speciální vlastnosti která má vliv na rozložení
        /// </summary>
        public void RedrawAllComponents()
        {
            foreach (ToolStripItem item in TopMenu.Items)
                if (item is IStatusUpdate)
                    ((IStatusUpdate)item).UpdateText();

            foreach (IViewContent content in this.ViewContentCollection)
                content.RedrawContent();
            foreach (IDesktopWindow window in this.DesktopWindowCollection)
                window.RedrawContent();
            foreach (PadDescriptor content in padViewContentCollection)
                content.RedrawContent();

            if (layout != null)
                layout.RedrawAllComponents();

            StatusBarService.RedrawStatusbar();
        }

        /// <summary>
        /// Aktualizace toolstrip renderer.
        /// </summary>
        public void UpdateRenderer()
        {
            bool pro = PropertyService.Get("UseProfessionalRenderer", true);
            if (pro)
                ToolStripManager.Renderer = new ToolStripProfessionalRenderer();
            else
            {
                ProfessionalColorTable colorTable = new ProfessionalColorTable
                {
                    UseSystemColors = true
                };
                ToolStripManager.Renderer = new ToolStripProfessionalRenderer(colorTable);
            }
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

        /// <summary>
        /// získání ovladače okna s fokusem 
        /// </summary>
        /// <returns></returns>
        public IntPtr GetFocus() { return IntPtr.Zero; }

        /// <summary>
        /// Zobrazení dalšího obsahu
        /// </summary>
        /// <returns></returns>
        public bool ShowViewNext()
        {
            if (DesktopWindowCollection.Count != 0)
            {
                int index = DesktopWindowCollection.IndexOf(ActiveViewContent.DesktopWindow);
                if (index < DesktopWindowCollection.Count - 1)
                    this.DesktopLayout.ShowView(DesktopWindowCollection[index + 1].ActiveViewContent, true);
                else
                    this.DesktopLayout.ShowView(DesktopWindowCollection.First().ActiveViewContent, true);
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
                if (index > 0)
                    this.DesktopLayout.ShowView(DesktopWindowCollection[index - 1].ActiveViewContent, true);
                else
                    this.DesktopLayout.ShowView(DesktopWindowCollection.Last().ActiveViewContent, true);
                return true;
            }
            return false;
        }

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
            LoggingService.DebugFormatted(string.Join(" ", GResources.GetResourceText(29450029), "'{0}'", GResources.GetResourceText(29450030), "'{1}'."), viewContent.ToString(), key); //RC 29450030 : dle klíče

            return this.LoadOrCreateViewContentMementos().Get<Property>(key, null);
        }
        static string GetMementoKeyName(IViewContent viewContent)
        {
            return String.Concat(viewContent.GetType().FullName.GetHashCode().ToString("x", CultureInfo.InvariantCulture), ":", viewContent.PropertyKey.ToLowerInvariant());
        }
        Property LoadOrCreateViewContentMementos()
        {
            try { return Property.Load(this.ViewContentMementosFileName) ?? new Property(); }
            catch (Exception ex)
            {
                LoggingService.Warning(GResources.GetResourceText(29450031), ex); //RC 29450031 : Chyba načítání souboru vlastnosti pohledu. Rušení všech uložených stavu zobrazení!
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

            if (FullScreen || WindowState == FormWindowState.Minimized)
                properties["windowstate"] = defaultWindowState.ToString();
            else
                properties["windowstate"] = WindowState.ToString();
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
        List<IViewContent> primaryViewContentCollection = new List<IViewContent>();
        IDesktopLayout layout = null;
        bool isActiveWindow; // indikuje, zda GFE je aktivní aplikace ve Windows
        System.Windows.Forms.Timer toolbarUpdateTimer;
        bool closeAll;
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
        readonly string mainMenuPath = "/FormFiller/MainMenu";
        readonly string mainToolBarPath = "/FormFiller/ToolBarMenu";
        readonly static string viewContentPath = "/FormFiller/Desktop/Pads";

        bool fullscreen;
        /// <summary>
        /// Zobrazení přes celý displej
        /// </summary>
        public bool FullScreen
        {
            get => fullscreen;
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
            }
        }

        /// <summary>
        /// Vytvoření instance nové třídy
        /// </summary>
        public DefaultDesktop()
        {
            //Text = string.Join(" ", "GINIS®", GResources.GetResourceText(29450032), RevisionClass.MainVersion); //RC 29450032 : Prohlížeč formulářů
            var UserProcess = FormFillerMain.Current;
            string l_sAppName = UserProcess.ApplicationInfo.Name.BaseValue;
            this.Text = UserProcess.GetApplicationTitle(l_sAppName) + "." + RevisionClass.Revision;

            Icon = WinFormsResourceService.GetIcon("Icons__Gin__logo_gordic_modul");
            StartPosition = FormStartPosition.Manual;
            AllowDrop = true;
        }

        #region Menu
        void CreateMainMenu()
        {
            TopMenu = new MenuStrip();
            TopMenu.Items.Clear();
            try
            {
                MenuService.AddItemsToMenu(TopMenu.Items, this, mainMenuPath);
                UpdateMenus();
            }
            catch (TreePathNotFoundException) { }
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
            if (ToolBars != null)
                foreach (ToolStrip toolStrip in ToolBars)
                    ToolbarService.UpdateToolbar(toolStrip);
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
                if (window != null && !window.CloseWindow(false))
                {
                    e.Cancel = true;
                    return;
                }
            }

            closeAll = true;

            ParserService.StopParserThread();

            layout.Detach();
            foreach (PadDescriptor padDescriptor in PadContentCollection)
                padDescriptor.Dispose();
        }
        /// <exclude/>
        protected override void OnDragDrop(DragEventArgs drgevent)
        {
            try
            {
                //pokud je to Soubor, pak zjistíme jeho název a navíc musí být pouze jeden ...
                string[] s = (string[])drgevent.Data.GetData(DataFormats.FileDrop, false);

                foreach (string item in s)
                    if (FileUtility.TestFileExists(item))
                        FileAgent.OpenFile(item);
            }
            catch (Exception ex) { LoggingService.Error("Chyba:", ex); }
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
            return !IsAltGRPressed && base.ProcessCmdKey(ref msg, keyData);
        }
        /// <summary>
        /// Indikace stisknutí klávey AltGr
        /// </summary>
        public static bool IsAltGRPressed
        {
            get => Gordic.GFE.Parsers.Utils.NativeMethods.IsKeyPressed(Keys.RMenu) && (Control.ModifierKeys & Keys.Control) == Keys.Control;
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

            layout?.ShowPad(content);
        }
        /// <summary>
        /// Zavření a uvolnění.
        /// </summary>
        /// <param name="content">Podložka s obsahem</param>
        public void UnloadPad(PadDescriptor content)
        {
            PadContentCollection.Remove(content);

            layout?.UnloadPad(content);
            content.Dispose();
        }
        /// <summary>
        /// Získání podložky specifického typu
        /// </summary>
        /// <param name="type">Typ podložky</param>
        public PadDescriptor GetPad(Type type)
        {
            foreach (PadDescriptor pad in PadContentCollection)
                if (pad.Class == type.FullName)
                    return pad;
            return null;
        }

        #endregion
    }
}
