//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.AbstractOfficeViewContent.cs           </Name>
//    <Description> abstractní třída sekundárních pohledů office sestav         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2013-06-10                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.ComponentModel.Design;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.InfoSectionView;
using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.WinClient.Services;

namespace Gordic.GFE.WinClient.FormatOffice
{
    /// <summary>
    /// abstractní třída sekundárních pohledů office sestav
    /// </summary>
    class AOfficeViewContent : DefaultAbstractSecondaryViewContent, IInfoSectionHost, IHost
        , IHasPropertyContainer, ICustomizedCommands, IValidatable
    {
        #region DefaultAbstractSecondaryViewContent
        /// <exclude/>
        protected override void LoadFromPrimary() { }
        /// <exclude/>
        protected override void SaveToPrimary() { }
        /// <exclude/>
        public override object Control => null;
        #endregion

        #region IInfoSectionHost
        /// <summary>
        /// indikuje možnost editace infosekce
        /// </summary>
        public bool ISEnableEdit => true;

        /// <summary>
        /// Struktura
        /// </summary>
        public InfoSectionViewEntry InfoSectionEntry => 
            PrimaryViewContent is IInfoSectionHost infoHost ? infoHost.InfoSectionEntry : null;
        /// <summary>
        /// reakce na změnu vlastnosti položky INFO sekce
        /// </summary>
        /// <param name="sender">objekt, který spustil událost</param>
        /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
        public virtual void OnInfoPropertyChanged(object sender, EventArgs e) { }
        #endregion

        #region IHost
        SelectionService serviceSelection;
        /// <summary>
        /// Služba výběru objektů
        /// </summary>
        public SelectionService ServiceSelection => serviceSelection;
        IDesignerHost host;
        /// <summary>
        /// Hostovací služba
        /// </summary>
        public IDesignerHost Host => host;
        UndoRedoManager undoRedoManager;
        /// <summary>
        /// Správce undoredo operací
        /// </summary>
        public IUndoRedoManager UndoRedoManager => undoRedoManager;
        #endregion

        #region Design
        static readonly DesignSurfaceManager designSurfaceManager = new DesignSurfaceManager();
        /// <summary>
        /// vytvoření konstruktoru
        /// </summary>
        /// <param name="serviceProvider"></param>
        /// <returns></returns>
        public static DesignSurface CreateDesignSurface(IServiceProvider serviceProvider)
        {
            return designSurfaceManager.CreateDesignSurface(serviceProvider);
        }
        #endregion

        #region IHasPropertyContainer
        PropertyContainer propertyContainer = new PropertyContainer();
        /// <summary>
        /// Kontainer s objekty pro vlastnosti
        /// </summary>
        public PropertyContainer PropertyContainer => propertyContainer;
        void UpdatePropertyPad()
        {
            if (Host != null)
            {
                ConfigurePropertyContainer();
                UpdatePropertyPadSelectionIfAvailable();
            }
        }

        /// <summary>
        /// Nakonfiguruje property container
        /// </summary>
        void ConfigurePropertyContainer()
        {
            propertyContainer.Host = Host;
            propertyContainer.SelectableObjects = Host.Container.Components;
        }

        /// <summary>
        /// Aktualizuje výběr v property padu pokud je service dostupná
        /// </summary>
        void UpdatePropertyPadSelectionIfAvailable()
        {
            if (designSurface.GetService(typeof(ISelectionService)) is ISelectionService selectionService)
                UpdatePropertyPadSelection(selectionService);
        }
        void UpdatePropertyPadSelection(ISelectionService selectionService)
        {
            ICollection selection = selectionService.GetSelectedComponents();
            object[] selArray = new object[selection.Count];
            selection.CopyTo(selArray, 0);
            propertyContainer.SelectedObjects = selArray;
        }
        void SelectionChangedHandler(object sender, EventArgs args)
        {
            LocalCommonService.ClosePropertyOptions();
            UpdatePropertyPadSelection((ISelectionService)sender);
        }
        #endregion

        #region ICustomizedCommands
        /// <exclude/>
        public bool SaveCommand() => true;
        /// <exclude/>
        public bool SaveAsCommand() => true;
        /// <summary>
        /// Uložení souboru do databáze
        /// </summary>
        /// <returns>TRUE, pokud operace je dostupná</returns>
        public bool SaveToDatabaseCommand(EventHandlerOpenedFileArgument eventHandler) => false;
        #endregion

        #region IValidatable
        /// <summary>
        /// Validace obsahu
        /// </summary>
        /// <returns>TRUE - validace proběhla úspěšně v opačném případě false</returns>
        public virtual bool Validate()
        {
            return !(PrimaryViewContent is IValidatable validatable) || validatable.Validate();
        }
        #endregion

        DesignSurface designSurface;
        DefaultServiceContainer defaultServiceContainer;

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        /// <param name="primaryViewContent">Primární pohled</param>
        /// <param name="isLK">indikuje LK</param>
        public override IViewContent Initialize(IViewContent primaryViewContent, bool isLK = false)
        {
            base.Initialize(primaryViewContent, isLK);
            InitializeDesignSurface();
            ConfigureServices();
            RegisterEventHandlers();
            return this;
        }

        /// <summary>
        /// Inicializuje design surface
        /// </summary>
        void InitializeDesignSurface()
        {
            defaultServiceContainer = new DefaultServiceContainer();
            designSurface = CreateDesignSurface(defaultServiceContainer);
            defaultServiceContainer.RemoveService(typeof(ISelectionService));
            host = (IDesignerHost)designSurface.GetService(typeof(IDesignerHost));
        }

        /// <summary>
        /// Nakonfiguruje služby
        /// </summary>
        void ConfigureServices()
        {
            serviceSelection = new SelectionService(host);
            undoRedoManager = new UndoRedoManager();
            defaultServiceContainer.AddService(typeof(ISelectionService), serviceSelection);
        }

        /// <summary>
        /// Registruje event handlery
        /// </summary>
        void RegisterEventHandlers()
        {
            ServiceSelection.SelectionChanged += SelectionChangedHandler;
            UpdatePropertyPad();
            if (SimpleDesktop.Desktop != null)
                SimpleDesktop.Desktop.ActiveViewContentChanged += IsavcChangedHandler;
        }

        /// <summary>
        /// vytvoření nové šablony
        /// </summary>
        internal virtual void CreateTemplate() { }
        /// <summary>
        /// validace dokumentus
        /// </summary>
        /// <param name="waitDialog">čekácí dialog</param>
        /// <param name="isSuccess">Výsledek validace - TRUE: validace proběhla úspěšně, jinak FALSE</param>
        /// <returns>výsledek validace</returns>
        internal virtual string ValidateDocument(bool waitDialog, out bool isSuccess) { isSuccess = true; return string.Empty; }

        void IsavcChangedHandler(object sender, EventArgs e)
        {
            ThreadService.SafeThreadAsyncCall(delegate
            {
                if (IsActiveViewContent())
                    designSurfaceManager.ActiveDesignSurface = designSurface;
                else
                    DeactivateDesignSurface();
            });
        }

        /// <summary>
        /// Kontroluje, zda je tento view aktivní
        /// </summary>
        bool IsActiveViewContent() => SimpleDesktop.Desktop.ActiveViewContent == this;

        /// <summary>
        /// Deaktivuje design surface
        /// </summary>
        void DeactivateDesignSurface()
        {
            LoggingService.Debug($"{GResources.GetResourceText(29450184)}, ActiveDesignSurface {GResources.GetResourceText(29450084)}..."); //RC 29450184 : zobrazení obsahu OFFICE je deaktivováno
            designSurfaceManager.ActiveDesignSurface = null;
        }
        /// <summary>
        /// uvolnění designéru
        /// </summary>
        protected void UnloadDesigner()
        {
            UnregisterEventHandlers();
            defaultServiceContainer?.Dispose();
        }

        /// <summary>
        /// Odregistruje event handlery
        /// </summary>
        void UnregisterEventHandlers()
        {
            if (serviceSelection != null)
                serviceSelection.SelectionChanged -= SelectionChangedHandler;

            if (SimpleDesktop.Desktop != null)
                SimpleDesktop.Desktop.ActiveViewContentChanged -= IsavcChangedHandler;
        }
    }
}
