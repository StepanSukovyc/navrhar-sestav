//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.RtfViewContent.cs                    </Name>
//    <Description> Sekundární pohled na obsah zobrazeného RTF dokumentu.       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-12                                                  </Created>
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
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.WinClient.DefaultEditor;
using Gordic.GFE.WinClient.addIns.editors.office;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Sekundární pohled na obsah zobrazeného RTF dokumentu.
    /// Je to Office
    /// </summary>
    class RtfViewContent : AOfficeViewContent, IStructureHost, ICustomizedCommands, IOfficeControl, IToolsHost
    {
        #region AbstractOfficeViewContent
        /// <summary>
        /// Validace dokumentu
        /// </summary>
        /// <param name="waitDialog">Indikuje zobrazení čekacího dialogu</param>
        /// <param name="isSuccess">Výsledek validace - TRUE: validace proběhla úspěšně, jinak FALSE</param>
        internal override string ValidateDocument(bool waitDialog, out bool isSuccess)
        {
            string result = GResources.GetResourceText(29450108); //RC 29450108 : validace proběhla úspěšně

            RtfTemplateService.StopThreads(PrimaryFile);
            CompilationUnit unit = CompilationService.Units[PrimaryFile] as CompilationUnit;
            using (AsynchronousWaitDialog monitor = AsynchronousWaitDialog.ShowWaitDialog(GResources.GetResourceText(29450114))) //RC 29450114 : generování sestavy
                unit.Validate(this);

            if (unit.ErrorsDuringValidate)
                result = unit.ErrorMessage;

            isSuccess = !unit.ErrorsDuringCompile;

            return result;
        }

        /// <summary>
        /// Načtení z primárního pohledu
        /// </summary>
        protected override void LoadFromPrimary()
        {
            LoggingService.Debug(GResources.GetResourceText(29450141) + "..."); //RC 29450141 : aktualizace RTF-designéru dle textového editoru
            using (AsynchronousWaitDialog monitor = AsynchronousWaitDialog.ShowWaitDialog(GResources.GetResourceText(29450070))) //RC 29450070 : načtení designéru
                container.LoadXml(PrimaryFile);
        }
        /// <summary>
        /// Uložení do primárního pohledu
        /// </summary>
        protected override void SaveToPrimary()
        {
            RtfTemplateService.StopThreads(PrimaryFile);
            LoggingService.Debug(GResources.GetResourceText(29450142) + "..."); //RC 29450142 : aktualizace textového editoru dle RTF-designéru

            if (!container.IsDirty)
                return;

            CompilationUnit unit = CompilationService.Units[PrimaryFile] as CompilationUnit;
            using (AsynchronousWaitDialog monitor = AsynchronousWaitDialog.ShowWaitDialog(GResources.GetResourceText(29450114))) //RC 29450114 : generování sestavy
                unit.Compile(this);

            if (unit.ErrorsDuringCompile)
                if (GMessageBox.ShowQuestion(string.Format(GResources.GetResourceText(29450073) + "\n\n{0}\n\n" + GResources.GetResourceText(29450115), unit.ErrorMessage), SimpleDesktop.MainForm) == DialogResult.No) //RC 29450073 : Chyba generování sesatvy
                {
                    PrimaryFile.CancelSaving = true;
                    return;
                }

            ignoreDirtyChange = true;
            container.IsDirty = false;
            ignoreDirtyChange = false;

            if (SimpleDesktop.Desktop.ActiveViewContent is RtfViewContent)
                container.LoadXml(CompilationService.Units[PrimaryFile].FileContent.Content);
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
            RtfTemplateService.PrepareSelection(container);
        }
        /// <exclude/>
        public override void OnInfoPropertyChanged(object sender, EventArgs e) { container.IsDirty = true; }
        #endregion

        #region IStructureHost
        /// <summary>
        /// Jednotka struktury
        /// </summary>
        public StructureViewEntry StructureEntry => view.StructureEntry;
        #endregion

        #region IToolsHost
        Control toolscontrol;
        /// <summary>
        /// nástrojová lišta
        /// </summary>
        public object ToolsControl
        {
            get
            {
                if (toolscontrol == null)
                    toolscontrol = (new GraphicEditorSideBar()).Initialize("RTF", "USR-SideBarOxsConfig.xml");
                return toolscontrol;
            }
        }
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

        ActiveOfficeDocumentChecker _actDocChecker;
        RtfContainerControl container;
        OfficeView view;
        bool ignoreDirtyChange;

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        /// <param name="primaryViewContent">Primární pohled</param>
        /// <param name="isLK">indikuje LK</param>
        public override IViewContent Initialize(IViewContent primaryViewContent, bool isLK = false)
        {
            base.Initialize(primaryViewContent, isLK);

            TabPageText = GResources.GetResourceText(29450143); //RC 29450143 : Office
            view = primaryViewContent as OfficeView;

            container = new RtfContainerControl(this);
            container.DirtyChanged += ContainerDirtyChanged;

            _actDocChecker = new ActiveOfficeDocumentChecker(container, (Control)this.Control);
            _actDocChecker.Start();
            return this;
        }

        /// <summary>
        /// vytvoření nové šablony
        /// </summary>
        internal override void CreateTemplate()
        {
            RtfTemplateService.GetOrCreateTemplateFile(container);
        }
        void ContainerDirtyChanged(object sender, EventArgs e)
        {
            if (!ignoreDirtyChange)
                this.PrimaryFile.IsDirty = container.IsDirty;
        }

        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnění objektu</param>
        protected override void Dispose(bool disposing)
        {
            try
            {
                if (disposing)
                {
                    LoggingService.Debug(GResources.GetResourceText(29450144) + "..."); //RC 29450144 : uvolnění RTF-designéru
                    container.Dispose();
                    UnloadDesigner();
                    _actDocChecker?.Dispose();
                }
            }
            finally { base.Dispose(disposing); }
        }
    }
}
