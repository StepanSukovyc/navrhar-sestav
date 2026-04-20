//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DefaultViewContent.cs                    </Name>
//    <Description> Výchozí implementace abstraktní třídy pohledu na obsah      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-01                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.IO;
using System.Linq;
using System.Text;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.Report.Implementation;
using Gordic.Report.Interface;
using Gordic.GFE.Parsers.AddIns;
using System.Drawing;
using Gordic.General;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Výchozí implementace abstraktní třídy sekundarního pohledu na obsah
    /// </summary>
    public class DefaultViewContent : DefaultAbstractSecondaryViewContent, IHost, ICustomizedCommands,
        IFormFormation, IPDFHandler, ISendHandler, IFillerContent, IDisposable, IScriptable
    {
        #region AbstractSecondaryViewContent
        /// <summary>
        /// Načtení z primárního pohledu
        /// </summary>
        protected override void LoadFromPrimary()
        {
            LoggingService.Debug("DocfrmViewContent.LoadFromPrimary");
            DataManagerInternal.ReloadData(primaryViewContent is IDataManagerHandler ? (primaryViewContent as IDataManagerHandler).FileData : null);
        }
        private DefaultDataManager SaveToPrimary(DefaultDataManager manager)
        {
            if (container.IsDirty)
            {
                container.RefreshData();
                ignoreDirtyChange = true;
                container.IsDirty = false;
                ignoreDirtyChange = false;
                //zkusmo presunuto sem, co to bude delat. vola se pomerne casto!
                //nefunguje...(primaryViewContent as IDataManagerHandler).FileContent = manager.GetOuterData();
            }
            (primaryViewContent as IDataManagerHandler).FileContent = manager.GetOuterData();
            return manager;
        }
        /// <summary>
        /// Uložení do primárního pohledu
        /// </summary>
        protected override void SaveToPrimary()
        {
            LoggingService.Debug("DocfrmViewContent.SaveToPrimary");
            SaveToPrimary(DataManagerInternal);
        }
        /// <summary>
        /// Ovladač sekundárního pohledu
        /// </summary>
        public override object Control { get { return container; } }
        /// <summary>
        /// ovladač stránek
        /// </summary>
        public FillerPagePanel PagePanel { get { return container.Control as FillerPagePanel; } }
        #endregion

        #region IFillerContent
        /// <summary>
        /// grafika pro výpočty
        /// </summary>
        public Graphics ComputeGraphics
        {
            get { return container?.ComputeGraphics; }
            set { if (container != null) container.ComputeGraphics = value; }
        }
        /// <summary>
        /// Kolekce stránek sekundárního obsahu pohledu na formulář
        /// </summary>
        public IPages Pages { get { return container?.Pages; } }
        /// <summary>
        /// formát
        /// </summary>
        public GFEFormat Format
        {
            get
            {
                dynamic fpp = container as LightFillerControl;
                if (fpp == null)
                    fpp = container.Control as FillerPagePanel;

                if (fpp != null)
                    return fpp.gfeFormat;

                return null;
            }
        }
        #endregion

        #region IHost
        /// <summary>
        /// Služba výběru objektů
        /// </summary>
        public SelectionService ServiceSelection { get { return designSurface != null ? (SelectionService)designSurface.GetService(typeof(ISelectionService)) : null; } }
        /// <summary>
        /// Hostovací služba
        /// </summary>
        public IDesignerHost Host { get { return designSurface == null ? null : (IDesignerHost)designSurface.GetService(typeof(IDesignerHost)); } }
        /// <summary>
        /// Správce undoredo operací
        /// </summary>
        public IUndoRedoManager UndoRedoManager { get => null; }
        #endregion

        #region ICustomizedCommands
        /// <exclude/>
        public bool SaveCommand() { return true; }
        /// <exclude/>
        public bool SaveAsCommand() { return true; }
        /// <summary>
        /// Uložení souboru do databáze
        /// </summary>
        /// <returns>TRUE, pokud operace je dostupná</returns>
        public bool SaveToDatabaseCommand(EventHandlerOpenedFileArgument eventHandler) { return false; }
        #endregion

        #region IFormFormation
        OpenedFile formFile;
        /// <summary>
        /// Otevřený soubor daného pohledu - šablona pro data
        /// </summary>
        public OpenedFile FormFile
        {
            get { return formFile; }
            set
            {
                formFile = value;
                if (value != null)
                {
                    //setFormatFileData();
                    LoadFromPrimary();
                }
            }
        }
        #endregion

        #region IPDFHandler
        readonly object syncLock = new object();

        /// <summary>
        /// Konverze do PDF
        /// </summary>
        public void ToPDF()
        {
            bool isDirty = container.IsDirty;
            //save vzdy. zabezpeci i prenos ROOT region if (isDirty)
            SaveFile.Save(PrimaryFile);

            if (isDirty != container.IsDirty)
                container.IsDirty = isDirty;

            var outname = Path.ChangeExtension(formFile.FileName, ".pdf");
            try
            {
                lock (syncLock)
                {
                    //GUnsafeRepWrapper.GReporterStructure l_oStruct = null;
                    GUnsafeRepWrapper.GReporterFormat l_oFormat = null;
                    GUnsafeRepWrapper.GReporterData l_oData = null;
                    try
                    {
                        var imgs = ImageService.GetTempDir(formFile);
                        GUnsafeRepWrapper.SetParameter("working_dir", imgs == null ? "" : imgs.Path);
                        GUnsafeRepWrapper.SetParameter09("FilesPath", imgs == null ? "" : imgs.Path);
                        GUnsafeRepWrapper.SetParameter("developer_mode", "0");

                        //l_oStruct = GUnsafeRepWrapper.OpenStructure(Structure.FileName);
                        l_oFormat = GUnsafeRepWrapper.OpenFormat(formFile.FileName);
                        //l_oData = GUnsafeRepWrapper.OpenData(PrimaryFileName, l_oStruct.Structure, l_oFormat.Format);
                        l_oData = GUnsafeRepWrapper.OpenData(PrimaryFileName, Structure, l_oFormat.Format);

                        try { GUnsafeRepWrapper.RunBridge(l_oData, null, "PDF", outname); }
                        catch
                        {
                            try { File.Delete(outname); }
                            catch (Exception) { }
                            throw;
                        }
                    }
                    finally
                    {
                        if (l_oData != null) l_oData.Dispose();
                        if (l_oFormat != null) l_oFormat.Dispose();
                        //if (l_oStruct != null) l_oStruct.Dispose();
                    }
                }
                System.Diagnostics.Process.Start(outname);
            }
            catch (Exception e) { MessageService.ShowError(e); }
        }
        #endregion

        #region ISendHandler
        public bool CanSend
        {
            get
            {
                if (Format == null) return false;
                return Format.OfflineSettings.Count > 0;
            }
        }
        /// <summary>
        /// Metoda odeslání obsahu
        /// </summary>
        public void Send(int submitIndex, Sender sender)
        {
            //ulozeni dataku
            bool isDirty = container.IsDirty;
            if (isDirty)
            {
                //SaveFile.Save(PrimaryFile);
                ContentService.Save(PrimaryFile);
            }

            //ulozeni GFRM
            if (!(primaryViewContent is IDataManagerHandler p)) return;
            var f = p.Filler;
            if (f == null) return;
            f.Save(this, EventArgs.Empty);


            var commandSend = Format.OfflineSettings[submitIndex];
            switch (commandSend.SubmitMethod.ToLowerInvariant())
            {
                case "post-xml":
                    sender.SendGetPost(commandSend, "POST", PrimaryFile.FileName);
                    break;
                case "post-gfrm":
                    sender.SendGetPost(commandSend, "POST", f.FileName);
                    break;
                case "get-xml":
                    sender.SendGetPost(commandSend, "GET", PrimaryFile.FileName);
                    break;
                case "get-gfrm":
                    sender.SendGetPost(commandSend, "GET", f.FileName);
                    break;
                case "mail-xml":
                    sender.SendMail(commandSend, PrimaryFile.FileName);
                    return;
                case "mail-gfrm":
                    sender.SendMail(commandSend, f.FileName);
                    return;
                default:
                    throw new Exception(GResources.GetResourceText(29450724));
            }
            //MessageBox.Show(result, "Submit");
        }
        #endregion

        bool ignoreDirtyChange;
        /// <summary>
        /// "lehká" verze primárního pohledu
        /// </summary>
        public LightFillerView LightFillerView { get { return primaryViewContent as LightFillerView; } }
        /// <summary>
        /// Správce dat
        /// </summary>
        public DefaultDataManager DataManager { get { return SaveToPrimary(DataManagerInternal); } }  //nove se zde dela refresh (drive jen z Filler.DataManager)

        /// <summary>
        /// Správce dat. Bez aktualizace XML obsahu
        /// </summary>
        public DefaultDataManager DataManagerInternal
        {
            get
            {
                IDataManagerHandler vc = primaryViewContent as IDataManagerHandler;
                return vc?.DataManager;
            }
        }
        //byte[] formatFileData;
        ///// <summary>
        ///// obsah ALF souboru
        ///// </summary>
        //public byte[] FormatFileData { get { return formatFileData; } }
        ///// <summary>
        ///// obsah ALF souboru
        ///// </summary>
        //public byte[] GetFormatFileData() { return FormatFileData; }

        /// <summary>
        /// Nastavení změny
        /// </summary>
        public override void MakeDirty() { container.IsDirty = true; }
        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnění objektu</param>
        protected override void Dispose(bool disposing)
        {
#if MEMORYDEBUG
            Gordic.General.GLoggerExtensions.Trace(GFEFormat.MemoryDebugLog, $"{GetType()} Dispose {disposing}");
#endif
            if (disposing)
            {
                if (DataManagerInternal != null)
                    DataManagerInternal.DataSetChanged -= DmDataSetChanged;

                if (container != null)
                {
                    container.Dispose();
                    container = null;
                }
                if (designSurface != null)
                {
                    designSurface.Dispose();
                    designSurface = null;
                }
                CommonService.RemoveView(this);

                if (FormFile != null)
                {
                    ImageService.RemoveImages(FormFile);
                    FormFile.Dispose();
                }
            }

            base.Dispose(disposing);
        }

        ReportDesignSurface designSurface;
        IControlView container;

        /// <summary>
        /// Datová struktura
        /// </summary>
        public GFEStructure Structure { get { return primaryViewContent is IDataManagerHandler ? (primaryViewContent as IDataManagerHandler).Structure : null; } }

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        /// <param name="primaryViewContent">Primární pohled</param>
        /// <param name="isLK">indikuje LK</param>
        public override IViewContent Initialize(IViewContent primaryViewContent, bool isLK = false)
        {
            base.Initialize(primaryViewContent, isLK);

            if (!isLK)
            {
                this.TabPageText = GResources.GetResourceText(29450332); //RC 29450332 : Formulář
                ServiceContainer serviceContainer = new ServiceContainer();
                designSurface = new ReportDesignSurface(serviceContainer);
                serviceContainer.AddService(typeof(ISelectionService), new SelectionService((IDesignerHost)designSurface.GetService(typeof(IDesignerHost))));
                container = new DefaultFillerContainerControl(this);
            }
            else
                container = new LightFillerControl(this);

            container.DirtyChanged += ContainerDirtyChanged;
            DataManagerInternal.DataSetChanged += DmDataSetChanged;
            return this;
        }

        void DmDataSetChanged(object sender, EventArgs e)
        {
            DataManagerInternal.FormatScript = this;
            container.LoadData(PrimaryFile, (primaryViewContent as IDataManagerHandler).FileData, formFile, DataManagerInternal);
            //if (!container.IsErrorVisible)
            //    DataManager.ScriptManager.FormatScript = this;
        }
        void ContainerDirtyChanged(object sender, EventArgs e)
        {
            if (!ignoreDirtyChange)
                this.PrimaryFile.IsDirty = container.IsDirty;
        }
        //void setFormatFileData()
        //{
        //    if (formFile != null)
        //        using (Stream stream = formFile.OpenRead())
        //        {
        //            Encoding enc = Encoding.Default;
        //            formatFileData = FileReader.ReadFileBytes(stream, ref enc);
        //        }
        //}


        #region IScriptable

        public ScriptManager ScriptManager { get { return DataManagerInternal.ScriptManager; } }

        int IScriptable.getProperty(string name, out IDataScriptable value)
        {
            switch (name)
            {
                case "editable":
                    value = ScriptManager.Engine.GetScriptableNumber(name, IsReadOnly ? 0 : 1);
                    return 0;

                case "ver_major":
                    value = ScriptManager.Engine.GetScriptableNumber(name, Format.SpecVersionMajor);
                    return 0;
                case "ver_minor":
                    value = ScriptManager.Engine.GetScriptableNumber(name, Format.SpecVersionMinor);
                    return 0;
                case "formatting_group":
                    value = ScriptManager.Engine.GetScriptableString(name, Format.FormattingGroup);
                    return 0;
                case "info":
                    value = ScriptManager.Engine.GetScriptableContainer(name, Format.Infos);
                    return 0;
                case "resource":
                    value = ScriptManager.Engine.GetScriptableContainer(name, Format.Resources);
                    return 0;
                case "paper_width":
                    value = ScriptManager.Engine.GetScriptableNumber(name, Pages.PageWidth.IntValue);
                    return 0;
                case "paper_height":
                    value = ScriptManager.Engine.GetScriptableNumber(name, Pages.PageHeight.IntValue);
                    return 0;
                case "paper_margin_top":
                    value = ScriptManager.Engine.GetScriptableNumber(name, Pages.MarginTop.IntValue);
                    return 0;
                case "paper_margin_left":
                    value = ScriptManager.Engine.GetScriptableNumber(name, Pages.MarginLeft.IntValue);
                    return 0;
                case "paper_margin_right":
                    value = ScriptManager.Engine.GetScriptableNumber(name, Pages.MarginRight.IntValue);
                    return 0;
                case "paper_margin_bottom":
                    value = ScriptManager.Engine.GetScriptableNumber(name, Pages.MarginBottom.IntValue);
                    return 0;

                case "toggle":
                    value = new Gordic.Report.Implementation.GScriptableMethod(ScriptManager.Engine, name, delegate (IDataScriptable[] args)
                        {
                            using (var v = new GDataScriptable(ScriptManager.Engine, args[0]))
                                Toggle(v.ToString());
                            return null;
                        });
                    return 0;
                default:
                    foreach (INamedComponent nc in Format.NamedComponents[name])
                    {
                        if (nc is IScriptable snc)
                        {
                            value = new GScriptableObject(ScriptManager.Engine, name, snc);
                            return 0;
                        }
                        if (nc is IDefaultDataItemHandler dih)
                            if (dih.DataItem is IScriptable sdi)
                            {
                                value = new GScriptableObject(ScriptManager.Engine, name, sdi);
                                return 0;
                            }
                    }
                    value = null;
                    return 1;
            }
        }

        int IScriptable.setProperty(string name, IDataScriptable value)
        {
            //switch (name)
            {
                //default:
                return 1;
            }
        }

        internal void Toggle(string id)
        {
            IEnumerable<INamedComponent> comps = Format.NamedComponents[id].Distinct();

            foreach (var c in comps)
                if (c is IVisibleComponent vc)
                    vc.BeginUpdate();
            foreach (var c in comps)
                if (c is IVisibleComponent vc)
                    vc.Visible = !vc.Visible;
                else if (c is DefaultContentDrawing d)
                    d.Toggle();
            foreach (var c in comps)
                if (c is IVisibleComponent vc)
                    vc.EndUpdate();
        }
        #endregion

        #region Validations

        //Dictionary<Dom.IEditableContent, ValidationResult> m_ValidationErrors = new Dictionary<IEditableContent, ValidationResult>();
        //public Dictionary<Dom.IEditableContent, ValidationResult> ValidationErrors { get { return m_ValidationErrors; } }
        /// <summary>Seznam chybných položek</summary>
        public IEnumerable<ValidationResult> ValidationErrors
        {
            get
            {
                foreach (DefaultPage p in Pages)
                    foreach (ITagComponent c in p.All)
                        if (c is IDefaultDataItemHandler v)
                        {
                            //yield return new ValidationResult(v.DataItem.StructureItem, v.DataItem.ValidationResult);
                            var e = v.DataItem.ValidationResult;
                            if (e != null)
                                yield return e;
                        }
            }
        }
        /// <summary>Obsahuje chybnou položku?</summary>
        public bool ContainsValidationError
        {
            get
            {
                var e = ValidationErrors.FirstOrDefault();
                return e != null;
            }
        }
        /// <summary>Sumarizace všech chyb do řetězce</summary>
        public string ValidationErrorSummaryMessage
        {
            get
            {
                var sb = new StringBuilder();
                foreach (var e in ValidationErrors)
                {
                    sb.Append(e.MemberTitle);
                    sb.Append(": ");
                    sb.Append(e.Message);
                    sb.Append("\n");
                }
                return sb.ToString();
            }
        }
        #endregion
    }
}
