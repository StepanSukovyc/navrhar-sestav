//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DefaultAbstractViewContent.cs            </Name>
//    <Description> Poskytuje výchozí implementací rozhraní IViewContent.       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-28                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.General;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Poskytuje výchozí implementací rozhraní IViewContent.
    /// Poskytuje kolekci souborů, které ve výchozím nastavení, 
    /// automaticky registruji zobrazení ve kterých jsou otevřené.
    /// </summary>
    public abstract class DefaultAbstractViewContent : IViewContent
    {
        #region IViewContent
        /// <summary>
        /// Klíč vlastnosti
        /// </summary>
        public virtual string PropertyKey => FileUtility.NormalizePath(PrimaryFileName);
        /// <summary>
        /// Je Windows.Forms ovladač pro dané zobrazení.
        /// </summary>
        abstract public object Control { get; }

        IDesktopWindow desktopWindow;
        /// <summary>
        /// Okno pracovního stolu, ve kterém se zobrazí tento pohled
        /// </summary>
        IDesktopWindow IViewContent.DesktopWindow
        {
            get => desktopWindow;
            set
            {
                if (desktopWindow != value)
                {
                    desktopWindow = value;
                    _OnDesktopWindowChanged();
                }
            }
        }
        /// <summary>
        /// Okno pracovního stolu, ve kterém se zobrazí tento pohled
        /// </summary>
        public IDesktopWindow DesktopWindow => desktopWindow;

        /// <summary>
        /// Se volá po změně vlastnosti TabPageText
        /// </summary>
        public event EventHandler TabPageTextChanged;

        /// <summary>
        /// volá se po inicializací zobrazení
        /// </summary>
        public event FilesOperationDelegate AfterInitialize;

        string tabPageText;
        /// <summary>
        /// Text na záložce, když do pohledu je připojen více než jeden obsah
        /// </summary>
        public string TabPageText
        {
            get => tabPageText;
            set
            {
                if (tabPageText != value)
                {
                    tabPageText = value;
                    TabPageTextChanged?.Invoke(this, EventArgs.Empty);
                }
            }
        }

        bool visible = true;
        /// <summary>
        /// indikuje viditelnost záložky pohledu
        /// </summary>
        public bool Visible { get => visible; set { visible = value; } }

        /// <summary>
        /// Opětovná inicializace obsahu. (Znovu inicializuje všechny addin vlastnosti)
        /// a překreslí obsah.
        /// </summary>
        public virtual void RedrawContent() { }

        /// <summary>
        /// Uložení obsahu do souboru <code>fileName</code>
        /// </summary>
        /// <param name="file">Primární soubor zobrazení</param>
        /// <param name="stream">Datový proud</param>
        /// <remarks>
        /// Když se uživatel přepíná mezí více zobrazení stejného souboru, 
        /// změny se uloží do pamětí a jiný pohled si z pamětí načte tento obsah.
        /// </remarks>
        public virtual void Save(OpenedFile file, Stream stream) { }

        /// <summary>
        /// Načtení nebo znovu načtení obsahu specifického souboru z pamětí.
        /// </summary>
        /// <param name="file">Primární soubor zobrazení</param>
        /// <param name="stream">Datový proud</param>
        /// <remarks>
        /// Když se uživatel přepíná mezí více zobrazení stejného souboru, 
        /// změny se uloží do pamětí a jiný pohled si z pamětí načte tento obsah.
        /// </remarks>
        public virtual void Load(OpenedFile file, Stream stream) { }
        /// <summary>
        /// Zjištění, zda zobrazení je pouze pro čtení 
        /// (takové zobrazení mohou být uloženy pouze v případě, že vyberete jiný název souboru).
        /// </summary>
        public virtual bool IsReadOnly { get; set; }
        //public virtual bool IsReadOnly { get { return false; } }
        /// <summary>
        /// Zjištění, zda zobrazení je pouze pohled na obsah (nikdy ho nelze uložit).
        /// </summary>
        public virtual bool IsViewOnly => _Files.Count == 0;
        /// <summary>
        /// Akceptace změn vlastnosti z dialogového okna
        /// </summary>
        /// <param name="sender">objekt, který spustil událost</param>
        /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
        public virtual void ShowPropertyDialogAccepted(object sender, EventArgs e) { }
        /// <exclude/>
        public virtual void OnAfterInitialize(params string[] names)
        {
            AfterInitialize?.Invoke(names);
        }
        #endregion

        /// <summary>
        /// Vytvoření nové insatnce třídy.
        /// </summary>
        protected DefaultAbstractViewContent() { secondaryViewContentCollection = new SecondaryViewContentCollection(this); }

        /// <summary>
        /// Reakce na změnu okna pracovní plochy
        /// </summary>
        protected virtual void _OnDesktopWindowChanged() { }

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        public virtual IViewContent Initialize()
        {
            tabPageText = "TabPageText";
            secondaryViewContentCollection = new SecondaryViewContentCollection(this);
            InitFiles();
            return this;
        }

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        /// <param name="isLK">indikuje LK</param>
        /// <param name="primaryViewContent">Primární pohled</param>
        public virtual IViewContent Initialize(IViewContent primaryViewContent, bool isLK = false) => Initialize();

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        /// <param name="file">Primární soubor zobrazení.</param>
        public virtual IViewContent Initialize(OpenedFile file)
        {
            Initialize();

            if (file == null)
                throw new ArgumentNullException("file");
            _Files.Add(file);
            return this;
        }

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        /// <param name="file">primární soubor zobrazení</param>
        /// <param name="project">projekt souboru zobrazení</param>
        public virtual IViewContent Initialize(OpenedFile file, IFiller project) => Initialize(file);

        #region Podpora sekundarního pohledu na obsah
        public sealed class SecondaryViewContentCollection : ICollection<IViewContent>
        {
            readonly DefaultAbstractViewContent parent;
            readonly List<IViewContent> list = new List<IViewContent>();

            public SecondaryViewContentCollection(DefaultAbstractViewContent parent)
            {
                this.parent = parent;
            }

            public int Count
            {
                get => list.Count;
            }

            public bool IsReadOnly
            {
                get => false;
            }

            public void Add(IViewContent item)
            {
                if (item == null)
                    throw new ArgumentNullException("item");
                if (item.DesktopWindow != null && item.DesktopWindow != parent.DesktopWindow)
                    throw new ArgumentException(GResources.GetResourceText(29450315)); //RC 29450315 : Pohled na obsah je již zobrazen v jiném podokně!
                list.Add(item);
                parent.desktopWindow?.ViewContents.Add(item);
            }

            /// <summary>
            /// Vložení pohledu na pozici v seznamu
            /// </summary>
            /// <param name="index"></param>
            /// <param name="item"></param>
            public void Insert(int index, IViewContent item)
            {
                if (item == null)
                    throw new ArgumentNullException(GResources.GetResourceText(29450722));
                if (index >= Count)
                    throw new ArgumentOutOfRangeException(GResources.GetResourceText(29450723));
                list.Insert(index, item);
            }

            public void Clear()
            {
                if (parent.desktopWindow != null)
                    foreach (IViewContent vc in list)
                        parent.desktopWindow.ViewContents.Remove(vc);
                list.Clear();
            }

            public bool Contains(IViewContent item) => list.Contains(item);

            public void CopyTo(IViewContent[] array, int arrayIndex)
            {
                list.CopyTo(array, arrayIndex);
            }

            public bool Remove(IViewContent item)
            {
                if (list.Remove(item))
                {
                    parent.desktopWindow?.ViewContents.Remove(item);
                    return true;
                }
                else
                    return false;
            }

            public IEnumerator<IViewContent> GetEnumerator() => list.GetEnumerator();

            System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator() => list.GetEnumerator();
        }

        protected SecondaryViewContentCollection secondaryViewContentCollection;
        /// <summary>
        /// KOlekce obsahující sekundární pohledy na obsahy.
        /// </summary>
        public virtual ICollection<IViewContent> SecondaryViewContents => secondaryViewContentCollection;

        /// <summary>
        /// Zjištění, zda se můžeme přepnout z daného pohledu na obsah bez uložení/načtení obsahu.
        /// </summary>
        /// <param name="file">Primární soubor zobrazení</param>
        /// <param name="newView">Zobrazení, na které se uživátel přepíná.</param>
        public virtual bool SupportsSwitchFromThisWithoutSaveLoad(OpenedFile file, IViewContent newView) => newView == this;

        /// <summary>
        /// Zjištění, zda se můžeme přepnout na daný pohled na obsah bez uložení/načtení obsahu.
        /// </summary>
        /// <param name="file">Primární soubor zobrazení</param>
        /// <param name="oldView">Zobrazení ze kterého se přepíná</param>
        public virtual bool SupportsSwitchToThisWithoutSaveLoad(OpenedFile file, IViewContent oldView) => oldView == this;

        /// <summary>
        /// Provedé se před přepnutím z daného pohledu na obsah do nového.
        /// </summary>
        /// <param name="file">Primární soubor zuobrazení.</param>
        /// <param name="newView">Nový pohled na obsah</param>
        public virtual bool SwitchFromThisWithoutSaveLoad(OpenedFile file, IViewContent newView) => true;

        /// <summary>
        /// Provedé se před přepnutím ze starého zobrazení na dané.
        /// </summary>
        /// <param name="file">Primární soubor zobrazení</param>
        /// <param name="oldView">Zobrazení, ze kterého se přepínáme.</param>
        public virtual void SwitchToThisWithoutSaveLoad(OpenedFile file, IViewContent oldView)
        {
        }
        public virtual bool CanSafelySwitchFromThisView => true;
        #endregion

        #region Files
        FilesCollection files;

        void InitFiles() { files = new FilesCollection(this); }

        /// <summary>
        /// Seznam souborů editovatelných daným zobrazením.
        /// Kolekce je pouze pro čtení.
        /// </summary>
        protected Collection<OpenedFile> _Files => files;

        /// <summary>
        /// Seznam souborů editovatelných daným zobrazením.
        /// Kolekce je pouze pro čtení.
        /// </summary>
        IList<OpenedFile> IViewContent.Files => new ReadOnlyCollection<OpenedFile>(files ?? new FilesCollection(this));

        /// <summary>
        /// Primární editovatelný soubor. 
        /// Může vrátit hodnotu NULL, pokud žádný soubor není editovatelný.
        /// </summary>
        public virtual OpenedFile PrimaryFile => files != null && files.Count != 0 ? files[0] : null;

        /// <summary>
        /// Název primárního editovatelného souboru. 
        /// Může vrátit hodnotu NULL, pokud žádný soubor není editovatelný.
        /// </summary>
        public virtual string PrimaryFileName => PrimaryFile?.FileName;

        /// <summary>
        /// Indikuje potřebu automatické registrace pohledu pro soubor
        /// </summary>
        protected bool _AutomaticallyRegisterViewOnFiles = true;

        void RegisterFileEventHandlers(OpenedFile newItem)
        {
            newItem.FileNameChanged += OnFileNameChanged;
            newItem.IsDirtyChanged += OnIsDirtyChanged;
            if (_AutomaticallyRegisterViewOnFiles)
                newItem.RegisterView(this);
            OnIsDirtyChanged(this, EventArgs.Empty); // přehodnocení this.IsDirty po změně kolekce souborů
        }

        void UnregisterFileEventHandlers(OpenedFile oldItem)
        {
            oldItem.FileNameChanged -= OnFileNameChanged;
            oldItem.IsDirtyChanged -= OnIsDirtyChanged;
            if (_AutomaticallyRegisterViewOnFiles)
                oldItem.UnregisterView(this);
            OnIsDirtyChanged(this, EventArgs.Empty); // přehodnocení this.IsDirty po změně kolekce souborů
        }

        void OnFileNameChanged(object sender, EventArgs e)
        {
            _OnFileNameChanged((OpenedFile)sender);
            if (string.IsNullOrEmpty(titleName) && files.Count > 0 && sender == files[0])
                OnTitleNameChanged(EventArgs.Empty);
        }

        /// <summary>
        /// Volá se po změně názvu souboru zobrazení.
        /// </summary>
        /// <param name="file">Otevřený soubor zobrazení</param>
        protected virtual void _OnFileNameChanged(OpenedFile file) { }

        sealed class FilesCollection : Collection<OpenedFile>
        {
            DefaultAbstractViewContent parent;

            public FilesCollection(DefaultAbstractViewContent parent)
            {
                this.parent = parent;
            }

            protected override void InsertItem(int index, OpenedFile item)
            {
                base.InsertItem(index, item);
                parent.RegisterFileEventHandlers(item);
            }

            protected override void SetItem(int index, OpenedFile item)
            {
                parent.UnregisterFileEventHandlers(this[index]);
                base.SetItem(index, item);
                parent.RegisterFileEventHandlers(item);
            }

            protected override void RemoveItem(int index)
            {
                parent.UnregisterFileEventHandlers(this[index]);
                base.RemoveItem(index);
            }

            public void UnregisterView(DefaultAbstractViewContent view)
            {
                System.Diagnostics.Debug.Assert(parent == view);
                foreach (OpenedFile item in this)
                    //item.UnregisterView(view);
                    parent.UnregisterFileEventHandlers(item);
            }

            protected override void ClearItems()
            {
                foreach (OpenedFile item in this)
                    item.Dispose();
                base.ClearItems();
            }
        }
        #endregion

        #region TitleName
        /// <summary>
        /// Volá se pokažde, když se změní název obsahu
        /// </summary>
        public event EventHandler TitleNameChanged;

        void OnTitleNameChanged(EventArgs e)
        {
            TitleNameChanged?.Invoke(this, e);
        }

        string titleName;

        string IViewContent.TitleName
        {
            get
            {
                if (titleName != null)
                    return titleName;
                else if (files != null && files.Count > 0)
                    return Path.GetFileName(files[0].FileName);
                else
                    return "[" + GResources.GetResourceText(29450316) + "]"; //RC 29450316 : Výchozí Název
            }
        }
        /// <summary>
        /// Záhlaví zobrazení. Obvykle je to název editovatelného primárního souboru.
        /// </summary>
        public string TitleName
        {
            get => titleName;
            protected set
            {
                if (titleName != value)
                {
                    titleName = value;
                    OnTitleNameChanged(EventArgs.Empty);
                }
            }
        }
        #endregion

        #region IDisposable
        /// <summary>
        /// Volá se po uvolnění zobrazenní
        /// </summary>
        public event EventHandler Disposed;

        bool isDisposed;
        /// <summary>
        /// Indikuje uvolnění zobrazení
        /// </summary>
        public bool IsDisposed => isDisposed;

        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        public void Dispose()
        {
            Dispose(true);

            // odstraníme ze seznamu objektů pro uvolnění
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnění objektu</param>
        protected virtual void Dispose(bool disposing)
        {
#if MEMORYDEBUG
            Gordic.General.GLoggerExtensions.Trace(GFEFormat.MemoryDebugLog, $"{GetType()} Dispose {disposing}");
#endif
            if (disposing)
            {
                desktopWindow = null;
                if (PrimaryFile != null)
                    ImageService.RemoveImages(PrimaryFile);

                files?.UnregisterView(this);
                _UnregisterOnActiveViewContentChanged();
                if (secondaryViewContentCollection != null)
                {
                    foreach (IViewContent v in secondaryViewContentCollection) //nikoliv SecondaryViewContents (ta je virtualni a muze vracet neco uplne jineho)
                        if (v is IDisposable d) d.Dispose();
                    secondaryViewContentCollection.Clear();
                }

                if (files != null)
                {
                    files.Clear();
                    files = null;
                }
                (this as IDataManagerHandler)?.Structure?.Dispose();

                isDisposed = true;
                Disposed?.Invoke(this, EventArgs.Empty);
            }
        }

        /// <summary>
        /// realizace finalizeru jednorazového typu
        /// </summary>
        ~DefaultAbstractViewContent() { Dispose(false); }
        #endregion

        #region IsDirty
        bool IsDirtyInternal
        {
            get
            {
                foreach (OpenedFile file in this._Files)
                    if (file.IsDirty)
                        return true;
                return false;
            }
        }

        /// <summary>
        /// hodnota změny
        /// </summary>
        protected bool isDirty;
        /// <summary>
        /// Pokud tato vlastnost vrácí TRUE, pak obsah byl pozměněn 
        /// od okamžíku posledního uložení/načtení obsahu
        /// </summary>
        public virtual bool IsDirty => isDirty;

        void OnIsDirtyChanged(object sender, EventArgs e)
        {
            bool newIsDirty = IsDirtyInternal;
            if (newIsDirty != isDirty)
            {
                isDirty = newIsDirty;
                _RaiseIsDirtyChanged();
            }
        }

        /// <summary>
        /// Volá událost IsDirtyChanged.
        /// </summary>
        protected void _RaiseIsDirtyChanged()
        {
            IsDirtyChanged?.Invoke(this, EventArgs.Empty);
        }

        /// <summary>
        /// Se volá pokud obsah byl pozměněn od okamžíku posledního uložení/načtení
        /// </summary>
        public event EventHandler IsDirtyChanged;

        /// <summary>
        /// Pohled byl pozměněn
        /// </summary>
        public virtual void MakeDirty() { isDirty = true; }
        #endregion

        #region IsActiveViewContent
        protected bool _registeredOnViewContentChange;
        protected bool _wasActiveViewContent;

        /// <summary>
        /// Odregistrace aktivního pohledu na obsah
        /// </summary>
        protected virtual void _UnregisterOnActiveViewContentChanged() { }
        #endregion
    }
}