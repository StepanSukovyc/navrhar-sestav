//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.MseOfficeDocument.cs                   </Name>
//    <Description> Třída bezprostření editace MSE obsahu pomocí Office         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2013-01-22                                                  </Created>
//  </FileHeader>

using System;
using System.Runtime.InteropServices;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Gui;
using Excel = Microsoft.Office.Interop.Excel;
using Gordic.GFE.Parsers.Utils;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Collections.ObjectModel;
using Gordic.GFE.Parsers.core;

namespace Gordic.GFE.WinClient.Editor
{
    class ExcelDocumentItem : IOfficeDocumentItem, IDisposable
    {
        #region IOfficeDocumentItem
        /// <summary>
        /// Uvolní dokument office
        /// </summary>
        public void CloseDocument()
        {
            FileUtility.FileSaved -= FileUtilityFileSaved;

            DisposeDirtyTimer();
            CloseExcelDocument();
            QuitExcelApplication();
            ReleaseComObjects();

            GC.Collect();
        }

        /// <summary>
        /// Uvolní timer pro dirty checking
        /// </summary>
        void DisposeDirtyTimer()
        {
            if (isDirtyTimer != null)
            {
                isDirtyTimer.Stop();
                isDirtyTimer.Dispose();
                isDirtyTimer = null;
            }
        }

        /// <summary>
        /// Zavře Excel dokument
        /// </summary>
        void CloseExcelDocument()
        {
            if (ExcelDocument != null)
                try
                {
                    ExcelDocument.Close(false, CommonService.MISSVALUE, CommonService.FALSE);
                }
                catch (COMException ex) { LoggingService.Error(ex); }
        }

        /// <summary>
        /// Ukončí Excel aplikaci
        /// </summary>
        void QuitExcelApplication()
        {
            if (oExcelApp != null)
            {
                RestoreExcelWindow();
                CloseExcelWorkbooks();
            }
        }

        /// <summary>
        /// Obnoví Excel okno do původního stavu
        /// </summary>
        void RestoreExcelWindow()
        {
            NativeMethods.SetParent(ExcelWnd, IntPtr.Zero);
            NativeMethods.SendMessage(ExcelWnd, Win32.WM_KILLFOCUS, 0, 0);
            ExcelWnd = IntPtr.Zero;
        }

        /// <summary>
        /// Zavře všechny Excel sešity
        /// </summary>
        void CloseExcelWorkbooks()
        {
            try
            {
                oExcelApp.Visible = false;

                if (oExcelApp.Workbooks.Count != 0)
                    oExcelApp.Workbooks.Close();
                oExcelApp.Quit();
            }
            catch (COMException ex)
            {
                LoggingService.Error(ex.Message);
            }
        }

        /// <summary>
        /// Uvolní COM objekty
        /// </summary>
        void ReleaseComObjects()
        {
            try
            {
                Marshal.FinalReleaseComObject(ExcelDocument);
                Marshal.FinalReleaseComObject(oExcelApp);
            }
            catch (Exception ex)
            {
                LoggingService.Error(ex.Message);
            }
            finally
            {
                oExcelApp = null;
                ExcelDocument = null;
            }
        }
        #endregion

        #region IDisposable
        public void Dispose(bool disposing)
        {
            if (disposing)
                CloseDocument();
        }
        /// <summary>
        /// uvolnění objektu
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        ~ExcelDocumentItem() { Dispose(false); }
        #endregion

        Timer isDirtyTimer;
        Excel.Application oExcelApp;

        /// <summary>
        /// úplný název šablony
        /// </summary>
        public string FileName { get; }
        /// <summary>
        /// šablona dokumentu
        /// </summary>
        public Excel.Workbook ExcelDocument;
        /// <summary>
        /// Instance dokumentu
        /// </summary>
        public IntPtr ExcelWnd = IntPtr.Zero;

        /// <summary>
        /// identifikátor verze aplikace excel
        /// </summary>
        public int Version;

        readonly IOfficeDocumentView view;

        /// <summary>
        /// vytvoření instance nové třídy
        /// </summary>
        /// <param name="tempFile">soubor šabony</param>
        /// <param name="pView">informace o dokumentu</param>
        public ExcelDocumentItem(string tempFile, IOfficeDocumentView pView)
        {
            this.view = pView;
            FileName = tempFile;
            OfficeUtil.CreateInstance(FileUtilityFileSaved, ref oExcelApp, ref ExcelWnd, ref Version);
        }

        void FileUtilityFileSaved(object sender, FileNameEventArgs e)
        {
            if (view != null && view.PrimaryFile != null
                && e.FileName.Equals(view.PrimaryFile.FileName, StringComparison.InvariantCultureIgnoreCase)
                && isDirtyTimer != null)
                isDirtyTimer.Start();
        }

        ExcelOfficeDocument mod = null;
        /// <summary>
        /// zobrazení dokumentu
        /// </summary>
        /// <param name="intPtr"></param>
        /// <param name="bounds"></param>
        /// <param name="pMod"></param>
        internal IntPtr ShowDocument(IntPtr intPtr, System.Drawing.Rectangle bounds, ExcelOfficeDocument pMod)
        {
            this.mod = pMod;
            return OfficeUtil.ShowDocument(view, ref oExcelApp, ref ExcelDocument, ref ExcelWnd, FileName, ref intPtr, bounds, ref isDirtyTimer);
        }

        /// <summary>
        /// Zobrazení vlastnosti výběru
        /// </summary>
        internal void PrepareSelection()
        {
            mod?.PrepareSelection();
        }

        internal void UpdateSelected()
        {
            mod?.UpdateSelected();
        }

        //bool isStopped = false;
        ///// <summary>
        ///// zastavení vláken
        ///// </summary>
        //internal void StopThreads() { isStopped = true; }
    }
    /// <summary>
    /// Třída bezprostření editace MSE obsahu pomocí Office
    /// </summary>
    class ExcelOfficeDocument : IOfficeDocument
    {
        #region IOfficeDocument
        public IFormationDocumentProperty FormationProperty => throw new NotImplementedException();

        /// <summary>
        /// Načtení vlastnosti
        /// </summary>
        /// <param name="auto">indikuje automatické vložení sekce</param>
        /// <param name="head">Vlastnost head</param>
        /// <param name="body">Vlastnost body</param>
        /// <param name="foot">Vlastnost foot</param>
        public void GetInsertSectionProperty(ref bool auto, ref bool head, ref bool body, ref bool foot)
        {
            auto = ReportDesignerProperties.Instance.MseRegAutoInsert;
            head = ReportDesignerProperties.Instance.MseRegAutoInsertHead;
            body = ReportDesignerProperties.Instance.MseRegAutoInsertBody;
            foot = ReportDesignerProperties.Instance.MseRegAutoInsertFoot;
        }
        /// <summary>
        /// Vložení položky na objekt
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        public virtual void ItemDrag(object sender, ItemDragEventArgs e) { throw new NotImplementedException(); }

        /// <summary>
        /// Nastavení vlastnosti
        /// </summary>
        /// <param name="section">způsoby vložení sekcí auto/head/body/foot</param>
        public void SetInsertSectionProperty(params bool[] section)
        {
            ReportDesignerProperties.Instance.MseRegAutoInsert = section[0];
            ReportDesignerProperties.Instance.MseRegAutoInsertHead = section[1];
            ReportDesignerProperties.Instance.MseRegAutoInsertBody = section[2];
            ReportDesignerProperties.Instance.MseRegAutoInsertFoot = section[3];
        }
        #endregion

        /// <summary>
        /// Jedná se o hlavní region dokumentu
        /// </summary>
        public dynamic atom { get; set; }

        protected Dictionary<Guid, IScriptHandler> fieldsList = new Dictionary<Guid, IScriptHandler>();
        /// <summary>
        /// Slovník všech políček
        /// </summary>
        public Dictionary<Guid, IScriptHandler> FieldsList => fieldsList;

        readonly List<GFEFormatTag> unknowns = new List<GFEFormatTag>();
        readonly List<DefaultComment> comments = new List<DefaultComment>();
        /// <summary>
        /// Komentáře sestavy
        /// </summary>
        public ReadOnlyCollection<DefaultComment> Comments => comments.AsReadOnly();

        /// <summary>
        /// Globální skripta
        /// </summary>
        public List<string> GlobalScripts { get; } = new List<string>();

        /// <summary>
        /// Dokument sestavy
        /// </summary>
        public Excel._Workbook ExcelDocument => OfficeTemplateService.GetDocument(view.PrimaryFile);
        /// <summary>
        /// Instance okna WORD
        /// </summary>
        public IntPtr OfficeWnd => OfficeTemplateService.GetWordWnd(view.PrimaryFile);

        /// <summary>
        /// Pohled na sestavu
        /// </summary>
        readonly protected IOfficeDocumentView view;
        /// <summary>
        /// indikuje, že dokument byl teprvé vytvořen
        /// </summary>
        protected bool isCreated = false;
        /// <summary>
        /// pomocný objekt pro uzamčení operaci
        /// </summary>
        readonly protected object syncRoot = new object();
        /// <summary>
        /// ovladač nadřazeného objektu
        /// </summary>
        protected IntPtr ParentHandle;

        public ExcelOfficeDocument(IOfficeDocumentView pView)
        {
            this.view = pView;
            isCreated = true;
        }

        /// <summary>
        /// formát sestavy
        /// </summary>
        protected GFEFormat gfeFormat;

        internal class ExcelParentLock : IDisposable
        {
            readonly IntPtr ParentHandle, ExcelWnd;
            readonly Excel._Workbook ExcelDocument;
            public ExcelParentLock() { }
            public ExcelParentLock(IntPtr pParentHandle, IntPtr pExcelWnd, Excel._Workbook pExcelDocument)
            {
                this.ParentHandle = pParentHandle;
                this.ExcelWnd = pExcelWnd;
                this.ExcelDocument = pExcelDocument;
                NativeMethods.SetWindowRedraw(pParentHandle, false);
                if (pExcelDocument != null)
                    pExcelDocument.Application.Visible = false;
                NativeMethods.SetParent(pExcelWnd, IntPtr.Zero);
            }
            public void Dispose()
            {
                if (ExcelWnd != IntPtr.Zero && ParentHandle != IntPtr.Zero)
                {
                    NativeMethods.SetForegroundWindow(ExcelWnd);
                    NativeMethods.SetParent(ExcelWnd, ParentHandle);
                    if (ExcelDocument != null)
                        ExcelDocument.Application.Visible = true;
                    NativeMethods.SetWindowRedraw(ParentHandle, true);
                    NativeMethods.RedrawWindow(ParentHandle, IntPtr.Zero, IntPtr.Zero, NativeMethods.RedrawWindowFlags.AllChildren | NativeMethods.RedrawWindowFlags.UpdateNow | NativeMethods.RedrawWindowFlags.Frame | NativeMethods.RedrawWindowFlags.Invalidate);
                }
            }
        }
        ExcelParentLock plock;
        protected ExcelParentLock Plock
        {
            get
            {
                if (plock == null && ParentHandle != null && ExcelDocument != null && OfficeWnd != null)
                    plock = new ExcelParentLock(ParentHandle, OfficeWnd, ExcelDocument);

                return plock;
            }
        }
        void Doc_SheetSelectionChange(object Sh, Excel.Range Target)
        {
            ThreadService.SafeThreadAsyncCall(PrepareSelection, view);
        }
        void Doc_SheetActivate(object Sh)
        {
            ThreadService.SafeThreadAsyncCall(PrepareSelection, view);
        }
        void Application_SheetChange(object Sh, Excel.Range Target)
        {
            if (Target != null && Target.Comment == null || isInRefreshMode)
                return;

            ThreadService.SafeThreadAsyncCall(() => SheetChange(), view);
        }

        protected virtual void SheetChange() { throw new NotImplementedException(); }

        /// <summary>
        /// získání formátu z proudu dat
        /// </summary>
        /// <param name="enc">Kódování</param>
        /// <param name="xml">Proud dat formátu</param>
        /// <param name="filename">jméno souboru</param>
        protected void LoadContent(Encoding enc, string xml, string filename)
        {
            if (xml == null || xml.Length == 0)
                throw new Exception();

            try { gfeFormat = GFEFormat.LoadFromString(xml, filename, enc); }
            catch (Exception ex) { MessageBox.Show(ex.Message); }
            // načtení skriptů
            Task.Factory.StartNew(delegate { FormationService.LoadScripts(gfeFormat, GlobalScripts); });
            // načtení komentářů
            Task.Factory.StartNew(delegate { FormationService.LoadComments(gfeFormat, comments); });
            // načtení neznámých globálních větví
            Task.Factory.StartNew(delegate { FormationService.LoadUnknowns(gfeFormat, unknowns); });
        }

        /// <summary>
        /// Aktualizace stránek formuláře
        /// </summary>
        protected void RefreshContent()
        {
            LoadRegion(gfeFormat.Root);

            Application_SheetChange(null, null);
        }

        /// <summary>
        /// načtení hlavního regionu
        /// </summary>
        /// <param name="reg">hlavní region sestavy</param>
        protected virtual void LoadRegion(GFEFormatRegion reg) { throw new NotImplementedException(); }

        protected virtual string CompileMethod(dynamic unt = null) => null;

        internal virtual void UpdateSelected() { }

        /// <summary>
        /// Zobrazení vlastnosti výběru
        /// </summary>
        public virtual void PrepareSelection() {
            throw new NotImplementedException(); 
        }

        protected bool isInRefreshMode = false;

        /// <summary>
        /// Aktualizace poli dle Excel komentářů
        /// </summary>
        protected void RefreshFields()
        {
            if (Plock != null && !isInRefreshMode)
                using (Plock)
                {
                    try
                    {
                        OleMessageFilter.Register();
                        isInRefreshMode = true;
                        SyncWorksheetComments();
                        isInRefreshMode = false;
                        OleMessageFilter.Revoke();
                    }
                    catch (Exception ex)
                    {
                        LoggingService.Error($"Chyba: {ex}");
                    }
                }
        }

        /// <summary>
        /// Synchronizuje komentáře všech worksheetů
        /// </summary>
        void SyncWorksheetComments()
        {
            for (int index = 1; index <= ExcelDocument.Worksheets.Count; index++)
            {
                if (ExcelDocument.Worksheets.get_Item(index) is Excel._Worksheet worksheet)
                    atom.SyncWithComments(index, worksheet.Comments);
            }
        }

        public void CloseDocument(OpenedFile primaryFile)
        {
            lock (syncRoot)
            {
                UnregisterDocumentEvents(primaryFile);
                OfficeTemplateService.RemoveTemplate(primaryFile);
            }
        }

        /// <summary>
        /// Odregistruje eventy dokumentu
        /// </summary>
        void UnregisterDocumentEvents(OpenedFile primaryFile)
        {
            Excel.Workbook doc = OfficeTemplateService.GetDocument(primaryFile);
            if (doc != null)
                try
                {
                    doc.SheetSelectionChange -= Doc_SheetSelectionChange;
                    doc.SheetActivate -= Doc_SheetActivate;
                    //doc.Application.SheetChange -= Application_SheetChange;
                }
                catch (COMException ex) { LoggingService.Error(ex.Message); }
        }

        public IntPtr ShowDocument(IntPtr intPtr, System.Drawing.Rectangle bounds)
        {
            ParentHandle = intPtr;
            IntPtr hWnd = OfficeTemplateService.ShowDocument(intPtr, view.PrimaryFile, bounds, this);
            RegisterDocumentEventsIfCreated();
            return hWnd;
        }

        /// <summary>
        /// Registruje eventy dokumentu pokud byl právě vytvořen
        /// </summary>
        void RegisterDocumentEventsIfCreated()
        {
            Excel.Workbook doc = OfficeTemplateService.GetDocument(view.PrimaryFile);
            if (doc != null && isCreated)
            {
                isCreated = false;
                doc.SheetSelectionChange += Doc_SheetSelectionChange;
                doc.SheetActivate += Doc_SheetActivate;
                //doc.Application.SheetChange += Application_SheetChange;
            }
        }

        /// <summary>
        /// Načtení XML.
        /// </summary>
        /// <param name="xml">XML obsah</param>
        public void Load(string xml)
        {
            try
            {
                InitializeTemplate();

                if (view.PrimaryFile != null)
                {
                    ConfigureCompilationUnit();
                    LoadAndRefreshContent(xml);
                }
            }
            catch (Exception ex)
            {
                HandleLoadError(ex);
            }
        }

        /// <summary>
        /// Inicializuje šablonu dokumentu
        /// </summary>
        void InitializeTemplate()
        {
            OfficeTemplateService.GetOrCreateTemplateFile(view);
        }

        /// <summary>
        /// Nakonfiguruje compilation unit
        /// </summary>
        void ConfigureCompilationUnit()
        {
            if (CompilationService.Units[view.PrimaryFile] is CompilationUnit unit)
                unit.CompileMethod += CompileMethod;
        }

        /// <summary>
        /// Načte a obnoví obsah dokumentu
        /// </summary>
        void LoadAndRefreshContent(string xml)
        {
            LoadContent(view.PrimaryFile.Encoding, xml, view.PrimaryFile.FileName);
            RefreshContent();
        }

        /// <summary>
        /// Zpracuje chybu při načítání
        /// </summary>
        void HandleLoadError(Exception ex)
        {
            LoggingService.Debug(ex.ToString());
            view.ShowErrorMessage(ex.Message);
        }
    }
}
