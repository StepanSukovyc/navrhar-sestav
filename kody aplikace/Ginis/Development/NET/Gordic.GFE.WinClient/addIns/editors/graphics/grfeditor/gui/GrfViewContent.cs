//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ViewContent.cs                           </Name>
//    <Description> Sekundární pohled na obsah zobrazeného GRF dokumentu.       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Editor;
using Gordic.General;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.MessageView;

namespace Gordic.GFE.WinClient.GrfEditor
{
    /// <summary>
    /// Sekundární pohled na obsah zobrazeného GRF dokumentu.
    /// </summary>
    class GrfViewContent : AGraphicViewContent, ICustomizedCommands,
        IAnchorHandler, IRDArgumentHandler
    {
        #region IToolsHost
        Control toolscontrol;
        /// <summary>
        /// nástrojová lišta
        /// </summary>
        public override object ToolsControl
        {
            get
            {
                if (toolscontrol == null)
                    toolscontrol = (new Editor.GraphicEditorSideBar()).Initialize("GRF", "USR-SideBarGrfConfig.xml");
                return toolscontrol;
            }
        }
        #endregion

        #region AbstractSecondaryViewContent
        /// <summary>
        /// Akceptace změn vlastnosti z dialogového okna
        /// </summary>
        /// <param name="sender">objekt, který spustil událost</param>
        /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
        public override void ShowPropertyDialogAccepted(object sender, EventArgs e)
        {
            if (UndoRedoManager.IsTransactionStarted)
                UndoRedoManager.Commit();
        }

        /// <summary>
        /// Akce na vložení objektu
        /// </summary>
        public override void Paste() { Container.Paste(); }
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
        public bool SaveToDatabaseCommand(EventHandlerOpenedFileArgument eventHandler) { return true; }
        #endregion

        #region IAnchorHandler
        /// <summary>
        /// Indikuje, kdy všechny vybrané objekty jsou ukotvené
        /// </summary>
        public bool AllAnchored
        {
            get
            {
                if (ServiceSelection == null)
                    return false;

                return (ServiceSelection.SelectedComponents.Count
                    == ServiceSelection.SelectedComponents.Count(AnchorCount));
            }
        }

        bool AnchorCount(object arg)
        {
            return (arg is IAnchored) && (arg as IAnchored).Anchor;
        }

        /// <summary>
        /// Spuštění akce ukotvení/odkotvení
        /// </summary>
        /// <param name="value">TRUE - ukotvit, FALSE - odkotvit</param>
        public void Anchor(bool value)
        {
            using (UndoRedoManager.StartTransaction(GResources.GetResourceText(29450055))) //RC 29450055 : změna ukotvení
            {
                ServiceSelection.SelectedComponents.ForEach(Anchor, value);
                UndoRedoManager.Commit();
            }
        }

        void Anchor(object obj, params object[] par)
        {
            if (!(obj is IAnchored) || par.Length != 1)
                return;

            (obj as IAnchored).Anchor = bool.Parse(par[0].ToString());
        }
        #endregion

        #region IRDArgumentHandler
        /// <summary>
        /// změna argumentu 'edit' vybraných objektů
        /// </summary>
        public bool Edit
        {
            get
            {
                object argument = ServiceSelection.SelectedComponents.FirstOrDefault(cmp => cmp is IRDArgumentHandler);
                return argument == null ? false : (argument as IRDArgumentHandler).Edit;
            }
            set
            {
                using (UndoRedoManager.StartTransaction(GResources.GetResourceText(29450056) + " 'edit'")) //RC 29450056 : změna argumentu
                {
                    ServiceSelection.SelectedComponents.ForEach(SetEdit, value);
                    UndoRedoManager.Commit();
                }
            }
        }
        void SetEdit(object obj, params object[] values)
        {
            if (!(obj is IRDArgumentHandler) || values.Length != 1)
                return;

            if (bool.TryParse(Convert.ToString(values[0]), out bool edit))
                (obj as IRDArgumentHandler).Edit = edit;
        }

        /// <summary>
        /// změna argumentu 'row' vybraných objektů
        /// </summary>
        public int Row
        {
            get
            {
                object argument = ServiceSelection.SelectedComponents.FirstOrDefault(cmp => cmp is IRDArgumentHandler);
                return argument == null ? 1 : (argument as IRDArgumentHandler).Row;
            }
            set
            {
                using (UndoRedoManager.StartTransaction(GResources.GetResourceText(29450056) + " 'row'")) //RC 29450056 : změna argumentu
                {
                    ServiceSelection.SelectedComponents.ForEach(SetRow, value);
                    UndoRedoManager.Commit();
                }
            }
        }
        void SetRow(object obj, params object[] values)
        {
            if (!(obj is IRDArgumentHandler) || values.Length != 1)
                return;

            if (int.TryParse(Convert.ToString(values[0]), out int row))
                (obj as IRDArgumentHandler).Row = row == 0 ? 1 : row;
        }

        /// <summary>
        /// Dostupnost změny argumentu 'edit'
        /// </summary>
        public bool EnableEdit
        {
            get
            {
                if (ServiceSelection == null || ServiceSelection.SelectionCount == 0)
                    return false;
                return ServiceSelection.SelectedComponents.Exists(cmp => cmp is IRDArgumentHandler && (cmp as IRDArgumentHandler).EnableEdit);
            }
        }
        #endregion

        #region IInfoSectionHost
        /// <summary>
        /// volá se po změně InfoSekce
        /// </summary>
        /// <param name="sender">objekt, který spustil událost</param>
        /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
        public override void OnInfoPropertyChanged(object sender, EventArgs e) { Container.IsDirty = true; }

        #endregion
        GrfContainerControl Container { get => container as GrfContainerControl; }

        /// <summary>
        /// validace dokumentus
        /// </summary>
        /// <param name="waitDialog">čekácí dialog</param>
        /// <param name="isSuccess">Výsledek validace - TRUE: validace proběhla úspěšně, jinak FALSE</param>
        /// <returns>výsledek validace</returns>
        internal override string ValidateDocument(bool waitDialog, out bool isSuccess) {
            string result = GResources.GetResourceText(29450108); //RC 29450108 : validace proběhla úspěšně

            CompilationUnit unit = CompilationService.Units[PrimaryFile] as CompilationUnit;
            using (AsynchronousWaitDialog monitor = AsynchronousWaitDialog.ShowWaitDialog(GResources.GetResourceText(29450114))) //RC 29450114 : generování sestavy
                unit.Validate(this);

            if (unit.ErrorsDuringValidate)
                result = unit.ErrorMessage;

            isSuccess = !unit.ErrorsDuringCompile;

            return result;
        }

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        /// <param name="primaryViewContent">Primární pohled</param>
        /// <param name="isLK">indikuje LK</param>
        public override IViewContent Initialize(IViewContent primaryViewContent, bool isLK = false)
        {
            base.Initialize(primaryViewContent, isLK);
            container = new GrfContainerControl(this);
            Container.DirtyChanged += delegate { MakeDirty(); };
            return this;
        }

        /// <summary>
        /// Aktualizace položek dle seznamu
        /// </summary>
        internal override void RefreshItem()
        {
            Container.RefreshByStructure();
            container.Invalidate();
        }
        /// <exclude/>
        public override void MakeDirty()
        {
            if (!ignoreDirtyChange)
                this.PrimaryFile.IsDirty = Container.IsDirty;
        }

        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnění objektu</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && container != null)
                container.Dispose();

            base.Dispose(disposing);
        }
    }
}
