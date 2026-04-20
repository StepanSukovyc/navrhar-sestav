//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.OxsViewContent.cs                    </Name>
//    <Description> Sekundární pohled na obsah zobrazeného OXS dokumentu.       </Description>
//    <Author>      Mgr. Stepan Sukovyč                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2016-09-01                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.FormatOffice;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.StructureView;
using Gordic.GFE.Parsers.Core;
using Gordic.WinForms.Controls;
using Gordic.GFE.Parsers.Binding;
using Gordic.General;
using Gordic.GFE.WinClient.addIns.editors.office;
using Gordic.GFE.Parsers.AddIns;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Sekundární pohled na obsah zobrazeného OXS dokumentu.
    /// Je to Office
    /// </summary>
    class OxsViewContent : AOfficeViewContent, IStructureHost, IOfficeControl, IValidatable, IToolsHost
    {
        #region AbstractOfficeViewContent
        /// <summary>
        /// Validace dokumentu
        /// </summary>
        /// <param name="waitDialog">Indikuje zobrazení čekacího dialogu</param>
        /// <param name="isSuccess">Výsledek validace - TRUE: validace proběhla úspěšně, jinak FALSE</param>
        internal override string ValidateDocument(bool waitDialog, out bool isSuccess)
        {
            //string result = GResources.GetResourceText(29450108); //RC 29450108 : validace proběhla úspěšně

            //OfficeTemplateService.StopThreads(PrimaryFile);
            //CompilationUnit unit = CompilationService.Units[PrimaryFile] as CompilationUnit;
            //using (AsynchronousWaitDialog monitor = AsynchronousWaitDialog.ShowWaitDialog(GResources.GetResourceText(29450114))) //RC 29450114 : generování sestavy
            //    unit.Validate(this);

            //if (unit.ErrorsDuringValidate)
            //    result = unit.ErrorMessage;

            //isSuccess = !unit.ErrorsDuringCompile;

            //return result;

            isSuccess = true;
            return GResources.GetResourceText(29450692); //RC 29450692 : validace není dostupná!
        }

        /// <summary>
        /// Načtení z primárního pohledu
        /// </summary>
        protected override void LoadFromPrimary()
        {
            LoggingService.Debug(GResources.GetResourceText(29450693) + "..."); //RC 29450693 : aktualizace textového editoru dle OXS-designéru
            using (AsynchronousWaitDialog monitor = AsynchronousWaitDialog.ShowWaitDialog(GResources.GetResourceText(29450070))) //RC 29450070 : načtení designéru
                container.LoadXml(PrimaryFile);
        }

        /// <summary>
        /// Uložení do primárního pohledu
        /// </summary>
        protected override void SaveToPrimary()
        {
            LoggingService.Debug(GResources.GetResourceText(29450693) + "..."); //RC 29450693 : aktualizace textového editoru dle OXS-designéru

            if (!container.IsDirty)
                return;

            CompilationUnit unit = CompileDocument();

            if (!HandleCompilationErrors(unit))
                return;

            UpdateViewContent(unit);
            MarkAsClean();
        }

        /// <summary>
        /// Zkompiluje dokument
        /// </summary>
        CompilationUnit CompileDocument()
        {
            CompilationUnit unit = CompilationService.Units[PrimaryFile] as CompilationUnit;

            using (AsynchronousWaitDialog monitor = AsynchronousWaitDialog.ShowWaitDialog(GResources.GetResourceText(29450114))) //RC 29450114 : generování sestavy
                unit.Compile(this);

            return unit;
        }

        /// <summary>
        /// Zpracuje chyby kompilace
        /// </summary>
        /// <returns>False pokud má být uložení zrušeno</returns>
        bool HandleCompilationErrors(CompilationUnit unit)
        {
            if (unit.ErrorsDuringCompile)
                if (GMessageBox.ShowQuestion($"{GResources.GetResourceText(29450073)}\n\n{unit.ErrorMessage}\n\n{GResources.GetResourceText(29450115)}", SimpleDesktop.MainForm) == DialogResult.No) //RC 29450073 : Chyba generování sesatvy
                {
                    PrimaryFile.CancelSaving = true;
                    return false;
                }

            return true;
        }

        /// <summary>
        /// Aktualizuje view content vygenerovaným obsahem
        /// </summary>
        void UpdateViewContent(CompilationUnit unit)
        {
            if (!string.IsNullOrEmpty(unit.FileContent.Content))
                view.ReplaceAll(unit.FileContent.Content);
        }

        /// <summary>
        /// Označí container jako čistý (bez změn)
        /// </summary>
        void MarkAsClean()
        {
            ignoreDirtyChange = true;
            container.IsDirty = false;
            ignoreDirtyChange = false;
        }

        /// <summary>
        /// Ovladač sekundárního pohledu
        /// </summary>
        public override object Control => container;

        /// <summary>
        /// Akceptace změn vlastnosti z dialogového okna
        /// </summary>
        /// <param name="sender">objekt, který spustil událost</param>
        /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
        public override void ShowPropertyDialogAccepted(object sender, EventArgs e)
        {
            container.IsDirty = true;
            OfficeTemplateService.UpdateSelected(container);
            OfficeTemplateService.PrepareSelection(container);
        }
        /// <exclude/>
        public override void OnInfoPropertyChanged(object sender, EventArgs e) { container.IsDirty = true; }
        #endregion

        #region IStructureHost
        /// <summary>
        /// Jednotka struktury
        /// </summary>
        public StructureViewEntry StructureEntry => view?.StructureEntry;
        #endregion

        #region IOfficeControl
        /// <summary>
        /// Opuštění položky na objekt
        /// </summary>
        /// <param name="sender">Vlastník</param>
        /// <param name="e">Tažený objekt</param>
        public void ItemDrag(object sender, ItemDragEventArgs e)
        {
            container.Document.ItemDrag(sender, e);
        }
        #endregion

        #region IToolsHost
        Control toolscontrol;
        /// <summary>
        /// nástrojová lišta
        /// </summary>
        public object ToolsControl => toolscontrol ?? (toolscontrol = new GraphicEditorSideBar().Initialize("OXS", "USR-SideBarOxsConfig.xml"));
        #endregion

        OxsContainerControl container;
        OfficeView view;
        bool ignoreDirtyChange, disposed;

        ActiveOfficeDocumentChecker _actDocChecker;

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        /// <param name="primaryViewContent">Primární pohled</param>
        /// <param name="isLK">indikuje LK</param>
        public override IViewContent Initialize(IViewContent primaryViewContent, bool isLK = false)
        {
            base.Initialize(primaryViewContent, isLK);
            TabPageText = GResources.GetResourceText(29450143); //RC 29450143 : Office
            InitializeContainer(primaryViewContent);
            StartDocumentChecker();
            return this;
        }

        /// <summary>
        /// Inicializuje container a registruje event handlery
        /// </summary>
        void InitializeContainer(IViewContent primaryViewContent)
        {
            view = primaryViewContent as OfficeView;
            container = new OxsContainerControl(this);
            container.DirtyChanged += ContainerDirtyChanged;
        }

        /// <summary>
        /// Spustí kontrolu aktivního dokumentu
        /// </summary>
        void StartDocumentChecker()
        {
            _actDocChecker = new ActiveOfficeDocumentChecker(container, (Control)Control);
            _actDocChecker.Start();
        }

        void ContainerDirtyChanged(object sender, EventArgs e)
        {
            if (!ignoreDirtyChange)
                PrimaryFile.IsDirty = container.IsDirty;
        }

        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnění objektu</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && !disposed)
            {
                DisposeResources();
            }

            base.Dispose(disposing);
        }

        /// <summary>
        /// Uvolní zdroje
        /// </summary>
        void DisposeResources()
        {
            LoggingService.Debug(GResources.GetResourceText(29450696) + "..."); //RC 29450116 : uvolnění OXS-designéru

            disposed = true;
            UnloadDesigner();
            container?.Dispose();
            _actDocChecker?.Dispose();
        }
        /// <summary>
        /// vytvoření nové šablony
        /// </summary>
        internal override void CreateTemplate()
        {
            OfficeTemplateService.GetOrCreateTemplateFile(container);
        }
    }
}
