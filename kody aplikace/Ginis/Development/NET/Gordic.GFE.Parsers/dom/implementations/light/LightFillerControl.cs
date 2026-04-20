//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.LightFillerControl.cs                    </Name>
//    <Description> ovladač pro LK                                              </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-02-17                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using System;
using System.Drawing;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// ovladač pro LK
    /// </summary>
    public class LightFillerControl : IControlView
    {
        #region IControlView
        /// <summary>
        /// indikuje změnu obsahu
        /// </summary>
        public event EventHandler DirtyChanged;

        /// <summary>
        /// aktuální ovladač na pohledu
        /// </summary>
        public object Control { get => null; }

        bool dirty;
        /// <summary>
        /// Indikuje nutnost uložení dokumentu
        /// </summary>
        public bool IsDirty
        {
            get { return dirty; }
            set
            {
                bool previousDirty = dirty;
                dirty = value;
                OnChanged(previousDirty);
            }
        }

        OpenedFile dataFile;
        /// <summary>
        /// Primární soubor sestavy
        /// </summary>
        public OpenedFile PrimaryFile { get { return dataFile; } }
        /// <summary>
        /// Indikuje, že je zobrazená chybová hláška.
        /// </summary>
        public bool IsErrorVisible { get { return false; } }

        /// <summary>
        /// zobrazení chybové hlášky
        /// </summary>
        /// <param name="message">text chybové hlášky</param>
        public void ShowErrorMessage(string message) { throw new Exception(message); }

        Graphics computeGraphics;
        /// <summary>
        /// grafika pro výpočty
        /// </summary>
        public Graphics ComputeGraphics { get { return computeGraphics; } set { computeGraphics = value; } }

        /// <summary>
        /// hodnota zvětšení
        /// </summary>
        public float Zoom { get; internal set; } = 1;

        /// <summary>
        /// služba grafiky
        /// </summary>
        public IGraphicSettingService GSS { get; set; }

        /// <summary>
        /// uvolnění objektu
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
#if MEMORYDEBUG
            Gordic.General.GLoggerExtensions.Trace(GFEFormat.MemoryDebugLog, $"{GetType()} Dispose {disposing}");
#endif
            if (disposing)
            {
                DisposePages();
                if (manager != null) { manager.Dispose(); manager = null; }
                if (gfeFormat != null) { gfeFormat.Dispose(); gfeFormat = null; }
                if (computeGraphics != null) computeGraphics = null; //bez dispose
                GSS.RemoveZoomChanged(view, ZoomChanged);
                view = null;  //nevolat Dispose. obvykle je volano z view.Dispose()     
            }
        }
        ~LightFillerControl() { Dispose(false); }
        /// <summary>
        /// aktualizace dat dle pohledu
        /// </summary>
        public void RefreshData() { }
        /// <summary>
        /// Načtení dat formuláře.
        /// </summary>
        /// <param name="primaryDataFile">primární datový soubor</param>
        /// <param name="fileData">Obsah primárních dat</param>
        /// <param name="formatFile">Format sestavy</param>
        /// <param name="manager">Správce dat</param>
        public void LoadData(OpenedFile primaryDataFile, byte[] fileData, OpenedFile formatFile, DefaultDataManager manager)
        {
            this.dataFile = primaryDataFile;

            try { ReloadData(fileData, formatFile, manager); }
            catch (Gordic.Report.Interface.GUnsafeRepWrapper.GrrException ex) { LoggingService.Error(ex.Message, ex); throw; }
        }

        /// <summary>
        /// Načtení dat formuláře.
        /// </summary>
        /// <param name="fileData">Obsah primárních dat</param>
        /// <param name="formatFile">Format sestavy</param>
        /// <param name="manager">Správce dat</param>
        void ReloadData(byte[] fileData, OpenedFile formatFile, DefaultDataManager manager)
        {
            //if (formatFileData == null || formatFileData.Length == 0)
            //    throw new Exception(Gordic.General.GResources.GetResourceText(29450299)); //RC 29450299 : Soubor sestavy je prázdný!

            if (gfeFormat == null)
                //gfeFormat = Gordic.GFE.Parsers.Core.GFEFormat.LoadFromBytes(formatFileData, dataFile.FileName);
                gfeFormat = GFEFormat.LoadFromFile(formatFile.FileName);
            else
                gfeFormat.InitializeRegisterNamedComponents();

            if (this.manager == null)
                this.manager = manager;
            this.manager.AttachFormat(gfeFormat);

            DisposePages();
            Pages = new Pages(GSS);
            RefreshPages();
            //zoomChanged(this, EventArgs.Empty);
        }
        /// <exclude/>
        void ZoomChanged(object sender, EventArgs e)
        {
            //nemelo by se volat. GSS to po zmene rovnou vstrikne do property Zoom
            Zoom = GSS.GetZoom(view);
            //settingServiceChanged();
        }

        void DisposePages()
        {
            // pokud se stránky nenačítají poprvé, pak je před znovu vytvořením uvolníme
            if (Pages != null)
            {
                Pages.Dispose();
                Pages = null;
            }
        }
        /// <summary>
        /// Aktualizace stránek formuláře
        /// </summary>
        void RefreshPages()
        {
            GFEFormatGRF grf = (GFEFormatGRF)gfeFormat;
            if (grf == null)
                throw new Exception(GResources.GetResourceText(29450302));

            // lze získat i z manager.GetCollectionsCount(), ale tento počet se již určuje v metodě LoadPages
            int collectionsCount = LoadPages(grf);

            for (int index = 0; index < collectionsCount; index++)
                FillerService.LoadRegions(grf, manager.GetRootData(index), index * grf.PageCount, view, Pages, Structure);

            AfterLoad();
        }
        /// <summary>
        /// Načtení stránek z formátu.
        /// </summary>
        /// <param name="grf">Formát s informací o sestavě.</param>
        int LoadPages(GFEFormatGRF grf)
        {
            Pages.PageHeight = new SizeValue((grf.PageSize.Height == 0 ? 297 : grf.PageSize.Height) + "mm");
            Pages.PageWidth = new SizeValue((grf.PageSize.Width == 0 ? 210 : grf.PageSize.Width) + "mm");
            Pages.MarginLeft = new SizeValue((grf.PageMargins.left == 0 ? 10 : grf.PageMargins.left) + "mm");
            Pages.MarginRight = new SizeValue((grf.PageMargins.right == 0 ? 10 : grf.PageMargins.right) + "mm");
            Pages.MarginTop = new SizeValue((grf.PageMargins.top == 0 ? 10 : grf.PageMargins.top) + "mm");
            Pages.MarginBottom = new SizeValue((grf.PageMargins.bottom == 0 ? 10 : grf.PageMargins.bottom) + "mm");
            Pages.Parent = this;

            int collectionsCount;
            if (manager == null)
                collectionsCount = 1;
            else
            {
                var mainReg = grf.FindMainRegion();
                manager.SetMain(mainReg.Name);
                collectionsCount = manager.GetCollectionsCount();
            }

            for (int index = 0; index < collectionsCount; index++)
                for (int i = 0; i < grf.PageCount; i++)
                {
                    DefaultPage page = new DefaultPage(Pages, view);
                    page.Initialize();
                    Pages.Add(page as IPage);
                }
            return collectionsCount;
        }
        void AfterLoad()
        {
            foreach (DefaultPage page in Pages)
                AfterLoad(page);
        }
        void AfterLoad(DefaultPage p)
        {
            foreach (ITagComponent c in p.All)
                if (c is DefaultAbstractContent ac)
                    ac.AfterLoad();
        }
        /// <summary>
        /// struktura vázané sestavy
        /// </summary>
        public GFEStructure Structure { get { return (view as DefaultViewContent).Structure; } }
        #endregion

        /// <summary>
        /// Kolekce stránek
        /// </summary>
        public IPages Pages { get; set; }

        /// <summary>
        /// formát sestavy
        /// </summary>
        internal GFEFormat gfeFormat;
        DefaultDataManager manager;
        IViewContent view;
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="view">primární pohled na data </param>
        public LightFillerControl(IViewContent view)
        {
            this.view = view;
            GSS = GraphicSettingService.Instance; //mela by to byt BackgroundRenderer.GraphicSetting
            Zoom = GSS.GetZoom(view);
            GSS.AddZoomChanged(view, ZoomChanged); //nemelo by delat nic
            CommonService.IsLC = true;
        }

        void OnChanged(bool previousIsDirty)
        {
            if (previousIsDirty != dirty)
                OnDirtyChanged();
        }
        void OnDirtyChanged()
        {
            DirtyChanged?.Invoke(this, new EventArgs());
        }
    }
}
