//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.OfficeUtil.cs                          </Name>
//    <Description> ano, jedná se o začátek sekce regionu                       </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2017-08-24                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Utils;
using System;
using System.Xml;
using System.Linq;
using Excel = Microsoft.Office.Interop.Excel;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.General;
using Gordic.GFE.Parsers.Core;
using System.Runtime.InteropServices;
using Gordic.GFE.WinClient.Gui.Dialogs;
using Gordic.GFE.WinClient.AddIns.Editors.Office;
using System.Windows.Forms;
using Gordic.GFE.WinClient.Editor._office;
using System.Drawing;
using System.Runtime.InteropServices.ComTypes;

namespace Gordic.GFE.WinClient.Editor
{
    class OfficeUtil
    {
        /// <summary>
        /// ano, jedná se o začátek sekce REGION
        /// </summary>
        /// <param name="text"></param>
        /// <returns></returns>
        internal static bool IsBeginRegionSection(string text) => text.Contains(CommonService.MSE_BEGIN_SECTION_BODY) || text.Contains(CommonService.MSE_BEGIN_SECTION_HEADER) || text.Contains(CommonService.MSE_BEGIN_SECTION_FOOTER);

        internal static XmlElement GetHeader(string regname, XmlDocument xmlDoc, Excel._Worksheet Sheet, string namespaceUri, dynamic atom, string type, ref int p_index)
        {
            //Vytvoříme větev HEAD
            XmlElement xmlHead = xmlDoc.CreateElement("head", namespaceUri);
            //Položky se mohou objevít ne dřivé než o řádek níž
            //Získáme a připojíme sekci datových položek
            if ("mse".Equals(type))
            {
                XmlElement xmlCopyAndFill = GetCopyAndFill((Sheet.Comments[p_index].Parent as Excel.Range).Row + 1, regname, xmlDoc, Sheet, namespaceUri, null, ref p_index);
                //Pokud nějaké položky v sekci jsou, pak sekci přidáme
                if (xmlCopyAndFill != null)
                    xmlHead.AppendChild(xmlCopyAndFill);
            }
            else if ("oxs".Equals(type))
                SetCopyAndFill((Sheet.Comments[p_index].Parent as Excel.Range).Row + 1, regname, xmlDoc, Sheet, namespaceUri, atom, ref p_index, ref xmlHead);
            return xmlHead;
        }
        internal static void SetCopyAndFill(int p_index, string regname, XmlDocument xmlDoc, Excel._Worksheet Sheet, string namespaceUri, dynamic atom, ref int p_comment, ref XmlElement xmlParent)
        {
            bool isFrom = false;

            while (p_comment < Sheet.Comments.Count)
            {
                p_comment++;
                //zafixujeme pozici komentáře
                int commentRowIndex = (Sheet.Comments[p_comment].Parent as Excel.Range).Row;
                //bereme pouze následující položky
                if (commentRowIndex < p_index)
                    continue;

                if (commentRowIndex >= p_index)
                {
                    //Jinak zafixujeme text komentáře ...
                    string text = Sheet.Comments[p_comment].Shape.AlternativeText;
                    //...a dle jeho obsahu zjistíme zda je to položka
                    if (text.Contains(CommonService.MSE_FIELD))
                    {
                        //a navíc nebyla otevřená větev copy-and-fill
                        if (!isFrom)
                            isFrom = true;

                        xmlParent.AppendChild(GetValueOf(text, regname, p_comment, xmlDoc, Sheet, namespaceUri, atom));
                    }
                    else if (IsBeginRegionSection(text) || text.Contains(CommonService.MSE_END_SECTION))
                    {
                        p_comment--;
                        if (commentRowIndex > p_index && !isFrom)
                        {
                            // případ sekce bez datové položky
                            XmlElement xmlCopyAndFill = xmlDoc.CreateElement("copy-and-fill", namespaceUri);
                            xmlCopyAndFill.SetAttribute("from", p_index.ToString());
                            xmlCopyAndFill.SetAttribute("to", (commentRowIndex - 1).ToString());
                            xmlParent.AppendChild(xmlCopyAndFill);
                        }
                        return;
                    }
                }
            }
        }

        internal static XmlElement GetCopyAndFill(int p_index, string regname, XmlDocument xmlDoc, Excel._Worksheet Sheet, string namespaceUri, dynamic atom, ref int p_comment)
        {
            XmlElement xmlCopyAndFill = xmlDoc.CreateElement("copy-and-fill", namespaceUri);
            bool isFrom = false;

            while (p_comment < Sheet.Comments.Count)
            {
                p_comment++;
                //zafixujeme pozici komentáře
                int commentRowIndex = (Sheet.Comments[p_comment].Parent as Excel.Range).Row;
                //bereme pouze následující položky
                if (commentRowIndex < p_index)
                    continue;

                if (commentRowIndex >= p_index)
                {
                    //Jinak zafixujeme text komentáře ...
                    string text = Sheet.Comments[p_comment].Shape.AlternativeText;
                    //...a dle jeho obsahu zjistíme zda je to položka
                    if (text.Contains(CommonService.MSE_FIELD))
                    {
                        //a navíc nebyla otevřená větev copy-and-fill
                        if (!isFrom)
                        {
                            xmlCopyAndFill.SetAttribute("from", p_index.ToString());
                            isFrom = true;
                        }

                        xmlCopyAndFill.AppendChild(GetValueOf(text, regname, p_comment, xmlDoc, Sheet, namespaceUri, atom));
                    }
                    else if (IsBeginRegionSection(text) || text.Contains(CommonService.MSE_END_SECTION))
                    {
                        p_comment--;
                        if (commentRowIndex > p_index)
                        {
                            if (!isFrom)
                            {
                                xmlCopyAndFill.SetAttribute("from", p_index.ToString());
                                isFrom = true;
                            }

                            if (isFrom)
                            {
                                xmlCopyAndFill.SetAttribute("to", (commentRowIndex - 1).ToString());
                                return xmlCopyAndFill;
                            }
                        }
                        return null;
                    }
                }
            }

            p_index = Sheet.Comments.Count;
            if (isFrom)
            {
                xmlCopyAndFill.SetAttribute("to", (Sheet.Comments[p_index].Parent as Excel.Range).Row.ToString());
                return xmlCopyAndFill;
            }
            return null;
        }

        static void SetVersion(string p, ref int Version)
        {
            if (string.IsNullOrEmpty(p))
                Version = 1;

            if (float.TryParse(p.Replace('.', ','), out float f))
                Version = (int)f;
            LoggingService.Info(GResources.GetResourceText(29451450) + ": " + Version);
        }

        internal static void CreateInstance(FileNameEventHandler fileUtilityFileSaved, ref Excel.Application oExcelApp, ref IntPtr ExcelWnd, ref int Version)
        {
            Type tp = Type.GetTypeFromProgID("Excel.Application");
            var xls = Activator.CreateInstance(tp);

            //získání reference na Excel.Application z ROT.
            oExcelApp = (Excel.Application)xls;

            SetVersion(oExcelApp.Version, ref Version);
            if (ExcelWnd == IntPtr.Zero)
            {
                oExcelApp.Caption = "***GFE" + Guid.NewGuid().ToString();
                ExcelWnd = NativeMethods.FindWindow(default, oExcelApp.Caption);
                oExcelApp.Caption = "";
            }

            FileUtility.FileSaved += fileUtilityFileSaved;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="view"></param>
        /// <param name="oExcelApp"></param>
        /// <param name="ExcelDocument"></param>
        /// <param name="ExcelWnd"></param>
        /// <param name="FileName"></param>
        /// <param name="isDirtyTimer"></param>
        /// <param name="force"></param>
        public static void LoadExcel(IOfficeDocumentView view, Excel.Application oExcelApp, ref Excel.Workbook ExcelDocument, ref IntPtr ExcelWnd, string FileName, ref Timer isDirtyTimer, bool force = false)
        {
            if (oExcelApp != null && (ExcelDocument == null || ExcelWnd == IntPtr.Zero))
                try
                {
                    if (ExcelDocument == null)
                        ExcelDocument = FileUtility.TestFileExists(FileName) ? oExcelApp.Workbooks.Open(FileName) : oExcelApp.Workbooks.Add();
                    if (!force && ExcelWnd == IntPtr.Zero)
                    {
                        //System.Threading.Thread.Sleep(2000); - SS nutno?
                        oExcelApp.Caption = "***GFE" + Guid.NewGuid().ToString();
                        oExcelApp.Visible = true;
                        ExcelWnd = NativeMethods.FindWindow(default(string), oExcelApp.Caption);
                        oExcelApp.Caption = "";
                    }
                }
                catch (Exception ex) { LoggingService.Error(string.Format(GResources.GetResourceText(29450135) + " '{0}'!\n{1}", FileName, ex.Message)); } //RC 29450135 : chyba načtení šablony

            if (isDirtyTimer == null && ExcelWnd != IntPtr.Zero)
            {
                Excel.Workbook ed = ExcelDocument;
                isDirtyTimer = new Timer();
                Timer tmr = isDirtyTimer;
                isDirtyTimer.Tick += delegate { checkDocument(view, ed, tmr); };
                isDirtyTimer.Interval = 500;
            }
            isDirtyTimer?.Start();
        }

        static void checkDocument(IOfficeDocumentView view, Excel.Workbook doc, Timer isDirtyTimer)
        {
            if (!view.IsDirty)
                try
                {
                    IPersistFile persistFile = (IPersistFile)doc;
                    if (persistFile != null && persistFile.IsDirty() == 0)
                    {
                        view.IsDirty = true;
                        isDirtyTimer.Stop();
                    }
                }
                catch (InvalidCastException ex)
                {
                    isDirtyTimer.Stop();
                    MessageService.ShowError(ex);
                    view.PrimaryFile.CurrentView.DesktopWindow.CloseWindow(true);
                }
        }
        /// <summary>
        /// zobrazení dokumentu
        /// </summary>
        /// <param name="view"></param>
        /// <param name="oExcelApp"></param>
        /// <param name="ExcelWnd"></param>
        /// <param name="ExcelDocument"></param>
        /// <param name="FileName"></param>
        /// <param name="intPtr"></param>
        /// <param name="bounds"></param>
        /// <param name="isDirtyTimer"></param>
        internal static IntPtr ShowDocument(IOfficeDocumentView view, ref Excel.Application oExcelApp, ref Excel.Workbook ExcelDocument, ref IntPtr ExcelWnd, string FileName, ref IntPtr intPtr, Rectangle bounds, ref Timer isDirtyTimer)
        {
            if (oExcelApp == null)
            {
                LoggingService.Debug(GResources.GetResourceText(29450690));//RC 29450690 : dokument nelze zobrazit - aplikace nebyla načtená
                return ExcelWnd;
            }
            if (oExcelApp != null)
                //zviditelníme
                oExcelApp.Visible = true;

            LoadExcel(view, oExcelApp, ref ExcelDocument, ref ExcelWnd, FileName, ref isDirtyTimer);

            if (ExcelDocument != null && ExcelWnd.ToInt32() > 0)
            {
                NativeMethods.SetWindowPos(ExcelWnd, intPtr, 0, 0, bounds.Width, bounds.Height, NativeMethods.SWP_NOZORDER | NativeMethods.SWP_NOMOVE | NativeMethods.SWP_DRAWFRAME | NativeMethods.SWP_NOSIZE);
                NativeMethods.MoveWindow(ExcelWnd, 0, 0, bounds.Width, bounds.Height, true);
                // občas nefunguje správně (kvůli tomu je sjednocení vláken)
                NativeMethods.SetForegroundWindow(ExcelWnd);
                NativeMethods.SetParent(ExcelWnd, intPtr);
            }

            // znemožníme zavření OFFICE dokumentu pomocí křížku
            HideTitleBar(ref ExcelWnd);

            return ExcelWnd;
        }

        internal static XmlElement GetValueOf(string _text, string p_regName, int p_commentIndex, XmlDocument xmlDoc, Excel._Worksheet Sheet, string namespaceUri, dynamic atom)
        {
            //Zafixujeme název položky 
            string name = OfficeService.GetName(_text);

            if (name.StartsWith(p_regName + '.'))
                name = name.Remove(0, p_regName.Length + 1);

            Guid guid = OfficeService.GetGuid(_text);

            //ANO je tohle položka ...
            //...teď ji uložíme 
            XmlElement xmlValueOf = xmlDoc.CreateElement("value-of", namespaceUri);
            xmlValueOf.SetAttribute("name", name);
            string adres = Convert.ToString((Sheet.Comments[p_commentIndex].Parent as Excel.Range).get_Address((Sheet.Comments[p_commentIndex].Parent as Excel.Range).Row, (Sheet.Comments[p_commentIndex].Parent as Excel.Range).Column, Excel.XlReferenceStyle.xlA1, CommonService.MISSVALUE, CommonService.MISSVALUE)).Replace("$", "");
            xmlValueOf.SetAttribute("cell", string.Format("{0}", adres));
            if (atom != null && !guid.Equals(Guid.Empty))
            {
                dynamic lAtom = atom.GetByGuid(guid, Sheet.Comments[p_commentIndex].Shape.ID);
                if (lAtom is MseOfficeAtom)
                    lAtom?.SetAttributes(xmlValueOf);
                else
                    lAtom?.SetAttributes(xmlValueOf, xmlDoc, namespaceUri);
            }
            return xmlValueOf;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static bool AtomItemKnownAttributForGenerateXML(string key) => key.Equals("name") || key.Equals("guid") || key.Equals("filter-out") || key.Equals("filter-in");

        /// <summary>
        /// 
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static bool AtomItemKnownAttribut(string key) => key.Equals("name") || key.Equals("guid") || key.Equals("onPrint") || key.Equals("onLoad") || key.Equals("onEnter") || key.Equals("onData") || key.Equals("cell");

        /// <summary>
        /// 
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static bool AtomRegionItemKnownAttribut(string key) => key.Equals("name") || key.Equals("guid") || key.Equals("filter-out") || key.Equals("filter-in") || key.Equals("only-if") || key.Equals("order-by") || key.Equals("onPrint") || key.Equals("onLoad") || key.Equals("onEnter") || key.Equals("onData");

        /// <summary>
        /// 
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static bool AtomItemGroupKnownAttribut(string key) => key.Equals("name") || key.Equals("guid") || key.Equals("by");



        /// <summary>
        /// Vložení položky nebo regionu (dle větve) do WORD dokumentu
        /// </summary>
        /// <param name="treeNode">Větev s informaci o vkládaném objektu</param>
        /// <param name="head">Indikuje potřebu vytvoření záhlaví</param>
        /// <param name="body">Indikuje potřebu vytvoření těla</param>
        /// <param name="foot">Indikuje potřebu vytvoření zápatí</param>
        /// <param name="ExcelDocument"></param>
        /// <param name="ParentHandle"></param>
        /// <param name="OfficeWnd"></param>
        internal static void MseInsertSection(StructExtNode treeNode, bool head, bool body, bool foot, Excel._Workbook ExcelDocument, IntPtr ParentHandle, IntPtr OfficeWnd)
        {
            if (treeNode == null)
            {
                MessageService.ShowWarning(GResources.GetResourceText(29450129)); //RC 29450129 : Tažený objekt není podporovaného formátu!
                return;
            }

            string insertText = treeNode.FullName;
            string[] split = insertText.Split('.');
            if (split.Length >= 2)
                insertText = split.Last();

            using (new MseOfficeDocument.ExcelParentLock(ParentHandle, OfficeWnd, ExcelDocument))
            {
                Excel.Range selection = ExcelDocument.Application.ActiveCell;

                if (selection == null)
                {
                    MessageService.ShowWarning(GResources.GetResourceText(29450130)); //RC 29450130 : Objekt nelze vložit!
                    return;
                }

                string comment;

                bool validate = false;
                if (head || body || foot)
                {
                    // vložení konce sekce
                    SetRowProperties(selection.EntireRow);
                    comment = string.Format("MSEEndSection: {0}", insertText);

                    if (selection.Comment != null)
                        selection.Comment.Text(comment);
                    else
                        selection.AddComment(comment);

                    selection.Value = string.Format(GResources.GetResourceText(29450131) + ": {0}", treeNode.Text); //RC 29450131 : Konec oblasti

                    // index 3 odpovídá červené barvě
                    (ExcelDocument.Application.Selection as Excel.Range).get_Characters(16, treeNode.Text.Length).Font.ColorIndex = 3;
                    validate = true;
                }

                if (foot)
                {
                    selection = (ExcelDocument.Application.Selection as Excel.Range).EntireRow;
                    //Vložení prázdných řádků pro tělo
                    selection.Insert(Excel.XlInsertShiftDirection.xlShiftDown);
                    // vložení samotného těla
                    selection = (ExcelDocument.Application.Selection as Excel.Range).EntireRow;
                    // nastavíme výchozí barvu pozadí
                    SetNoneRowProperties(selection);
                    selection.Insert(Excel.XlInsertShiftDirection.xlShiftDown);

                    selection = ExcelDocument.Application.Selection as Excel.Range;
                    SetRowProperties(selection.EntireRow);

                    comment = string.Format("MSEBeginSectionFooter: {0}", insertText);

                    if (selection.Comment != null)
                        selection.Comment.Text(comment);
                    else
                        selection.AddComment(comment);

                    selection.Value = string.Format(GResources.GetResourceText(29450132) + ": {0}", treeNode.Text); //RC 29450132 : Patička oblasti

                    // index 3 odpovídá červené barvě
                    (ExcelDocument.Application.Selection as Excel.Range).get_Characters(18, treeNode.Text.Length).Font.ColorIndex = 3;

                    validate = true;
                }

                if (body)
                {
                    selection = (ExcelDocument.Application.Selection as Excel.Range).EntireRow;
                    //Vložení prázdných řádků pro tělo
                    selection.Insert(Excel.XlInsertShiftDirection.xlShiftDown);
                    // vložení samotného těla
                    selection = (ExcelDocument.Application.Selection as Excel.Range).EntireRow;
                    // nastavíme výchozí barvu pozadí
                    SetNoneRowProperties(selection);
                    selection.Insert(Excel.XlInsertShiftDirection.xlShiftDown);

                    selection = ExcelDocument.Application.Selection as Excel.Range;
                    SetRowProperties(selection.EntireRow);
                    comment = string.Format("MSEBeginSectionBody: {0}[#{1}#]", insertText, Guid.NewGuid().ToString());

                    if (selection.Comment != null)
                        selection.Comment.Text(comment);
                    else
                        selection.AddComment(comment);

                    selection.Value = string.Format(GResources.GetResourceText(29450133) + ": {0}", treeNode.Text); //RC 29450133 : Tělo oblasti

                    // index 3 odpovídá červené barvě
                    (ExcelDocument.Application.Selection as Excel.Range).get_Characters(15, treeNode.Text.Length).Font.ColorIndex = 3;

                    validate = true;
                }

                //vložit hlavičku
                if (head)
                {
                    selection = (ExcelDocument.Application.Selection as Excel.Range).EntireRow;
                    //Vložení prázdných řádků pro tělo
                    selection.Insert(Excel.XlInsertShiftDirection.xlShiftDown);
                    // vložení samotného těla
                    selection = (ExcelDocument.Application.Selection as Excel.Range).EntireRow;
                    // nastavíme výchozí barvu pozadí
                    SetNoneRowProperties(selection);

                    selection.Insert(Excel.XlInsertShiftDirection.xlShiftDown);

                    selection = ExcelDocument.Application.Selection as Excel.Range;
                    SetRowProperties(selection.EntireRow);

                    comment = string.Format("MSEBeginSectionHeader: {0}[#{1}#]", insertText, Guid.NewGuid().ToString());

                    if (selection.Comment != null)
                        selection.Comment.Text(comment);
                    else
                        selection.AddComment(comment);

                    selection.Value = string.Format(GResources.GetResourceText(29450134) + ": {0}", treeNode.Text); //RC 29450134 : Hlavička oblasti

                    // index 3 odpovídá červené barvě
                    (ExcelDocument.Application.Selection as Excel.Range).get_Characters(19, treeNode.Text.Length).Font.ColorIndex = 3;
                    validate = true;
                }

                // dle uživatelského nastavení zkontrolujeme dokument
                if (validate && ReportDesignerProperties.Instance.MseAutoValidateAfterInsert)
                    ThreadService.SafeThreadCall(ExcelValidateCommand.Validate, false);

                try
                {
                    if (selection != null)
                        Marshal.FinalReleaseComObject(selection);
                }
                catch { }
                finally { selection = null; }
            }
        }


        /// <summary>
        /// Vložení položky nebo regionu (dle větve) do WORD dokumentu
        /// </summary>
        /// <param name="treeNode">Větev s informaci o vkládaném objektu</param>
        /// <param name="head">Indikuje potřebu vytvoření záhlaví</param>
        /// <param name="body">Indikuje potřebu vytvoření těla</param>
        /// <param name="foot">Indikuje potřebu vytvoření zápatí</param>
        /// <param name="ExcelDocument"></param>
        /// <param name="ParentHandle"></param>
        /// <param name="OfficeWnd"></param>
        internal static void OxsInsertSection(StructExtNode treeNode, bool head, bool body, bool foot, Excel._Workbook ExcelDocument, IntPtr ParentHandle, IntPtr OfficeWnd)
        {
            if (treeNode == null)
            {
                MessageService.ShowWarning(GResources.GetResourceText(29450129)); //RC 29450129 : Tažený objekt není podporovaného formátu!
                return;
            }

            string insertText = treeNode.FullName;
            string[] split = insertText.Split('.');
            if (split.Length >= 2)
                insertText = split.Last();

            Guid guid = Guid.NewGuid();
            using (new MseOfficeDocument.ExcelParentLock(ParentHandle, OfficeWnd, ExcelDocument))
            {
                Excel.Range selection = ExcelDocument.Application.ActiveCell;

                if (selection == null)
                {
                    MessageService.ShowWarning(GResources.GetResourceText(29450130)); //RC 29450130 : Objekt nelze vložit!
                    return;
                }

                string comment;

                bool validate = false;
                if (head || body || foot)
                {
                    // vložení konce sekce
                    SetRowProperties(selection.EntireRow);
                    comment = string.Format(CommonService.MSE_END_SECTION + ": {0}", insertText);

                    if (selection.Comment != null)
                        selection.Comment.Text(comment);
                    else
                        selection.AddComment(comment);

                    selection.Value = string.Format(GResources.GetResourceText(29450131) + ": {0}", treeNode.Text); //RC 29450131 : Konec oblasti

                    OfficeAtomRegionItem item = new OfficeAtomRegionItem()
                    {
                        Guid = guid.ToString(),
                        Name = treeNode.FullName,
                        ExcellComment = selection.Comment,
                        CellRef = (selection.Comment.Parent as Excel.Range).Address[false, false]
                    };
                    selection.Comment?.Text(OfficeService.GetUpdatedCommentData(selection.Comment.Shape.AlternativeText, item.ToSerializeText()), CommonService.MISSVALUE, CommonService.MISSVALUE);

                    // index 3 odpovídá červené barvě
                    (ExcelDocument.Application.Selection as Excel.Range).get_Characters(16, treeNode.Text.Length).Font.ColorIndex = 3;
                    validate = true;
                }

                if (foot)
                {
                    selection = (ExcelDocument.Application.Selection as Excel.Range).EntireRow;
                    //Vložení prázdných řádků pro tělo
                    selection.Insert(Excel.XlInsertShiftDirection.xlShiftDown);
                    // vložení samotného těla
                    selection = (ExcelDocument.Application.Selection as Excel.Range).EntireRow;
                    // nastavíme výchozí barvu pozadí
                    SetNoneRowProperties(selection);
                    selection.Insert(Excel.XlInsertShiftDirection.xlShiftDown);

                    selection = ExcelDocument.Application.Selection as Excel.Range;
                    SetRowProperties(selection.EntireRow);

                    comment = string.Format(CommonService.MSE_BEGIN_SECTION_FOOTER + ": {0}", insertText);

                    if (selection.Comment != null)
                        selection.Comment.Text(comment);
                    else
                        selection.AddComment(comment);

                    selection.Value = string.Format(GResources.GetResourceText(29450132) + ": {0}", treeNode.Text); //RC 29450132 : Patička oblasti

                    OfficeAtomRegionItem item = new OfficeAtomRegionItem()
                    {
                        Guid = guid.ToString(),
                        Name = treeNode.FullName,
                        ExcellComment = selection.Comment,
                        CellRef = (selection.Comment.Parent as Excel.Range).Address[false, false]
                    };
                    selection.Comment?.Text(OfficeService.GetUpdatedCommentData(selection.Comment.Shape.AlternativeText, item.ToSerializeText()), CommonService.MISSVALUE, CommonService.MISSVALUE);

                    // index 3 odpovídá červené barvě
                    (ExcelDocument.Application.Selection as Excel.Range).get_Characters(18, treeNode.Text.Length).Font.ColorIndex = 3;

                    validate = true;
                }

                if (body)
                {
                    selection = (ExcelDocument.Application.Selection as Excel.Range).EntireRow;
                    //Vložení prázdných řádků pro tělo
                    selection.Insert(Excel.XlInsertShiftDirection.xlShiftDown);
                    // vložení samotného těla
                    selection = (ExcelDocument.Application.Selection as Excel.Range).EntireRow;
                    // nastavíme výchozí barvu pozadí
                    SetNoneRowProperties(selection);
                    selection.Insert(Excel.XlInsertShiftDirection.xlShiftDown);

                    selection = ExcelDocument.Application.Selection as Excel.Range;
                    SetRowProperties(selection.EntireRow);
                    comment = string.Format(CommonService.MSE_BEGIN_SECTION_BODY + ": {0}[#{1}#]", insertText, Guid.NewGuid().ToString());

                    if (selection.Comment != null)
                        selection.Comment.Text(comment);
                    else
                        selection.AddComment(comment);

                    selection.Value = string.Format(GResources.GetResourceText(29450133) + ": {0}", treeNode.Text); //RC 29450133 : Tělo oblasti

                    OfficeAtomRegionItem item = new OfficeAtomRegionItem()
                    {
                        Guid = guid.ToString(),
                        Name = treeNode.FullName,
                        ExcellComment = selection.Comment,
                        CellRef = (selection.Comment.Parent as Excel.Range).Address[false, false]
                    };
                    selection.Comment?.Text(OfficeService.GetUpdatedCommentData(selection.Comment.Shape.AlternativeText, item.ToSerializeText()), CommonService.MISSVALUE, CommonService.MISSVALUE);

                    // index 3 odpovídá červené barvě
                    (ExcelDocument.Application.Selection as Excel.Range).get_Characters(15, treeNode.Text.Length).Font.ColorIndex = 3;

                    validate = true;
                }

                //vložit hlavičku
                if (head)
                {
                    selection = (ExcelDocument.Application.Selection as Excel.Range).EntireRow;
                    //Vložení prázdných řádků pro tělo
                    selection.Insert(Excel.XlInsertShiftDirection.xlShiftDown);
                    // vložení samotného těla
                    selection = (ExcelDocument.Application.Selection as Excel.Range).EntireRow;
                    // nastavíme výchozí barvu pozadí
                    SetNoneRowProperties(selection);

                    selection.Insert(Excel.XlInsertShiftDirection.xlShiftDown);

                    selection = ExcelDocument.Application.Selection as Excel.Range;
                    SetRowProperties(selection.EntireRow);

                    comment = string.Format(CommonService.MSE_BEGIN_SECTION_HEADER + ": {0}[#{1}#]", insertText, Guid.NewGuid().ToString());

                    if (selection.Comment != null)
                        selection.Comment.Text(comment);
                    else
                        selection.AddComment(comment);

                    selection.Value = string.Format(GResources.GetResourceText(29450134) + ": {0}", treeNode.Text); //RC 29450134 : Hlavička oblasti

                    OfficeAtomRegionItem item = new OfficeAtomRegionItem()
                    {
                        Guid = guid.ToString(),
                        Name = treeNode.FullName,
                        ExcellComment = selection.Comment,
                        CellRef = (selection.Comment.Parent as Excel.Range).Address[false, false]
                    };
                    selection.Comment?.Text(OfficeService.GetUpdatedCommentData(selection.Comment.Shape.AlternativeText, item.ToSerializeText()), CommonService.MISSVALUE, CommonService.MISSVALUE);

                    // index 3 odpovídá červené barvě
                    (ExcelDocument.Application.Selection as Excel.Range).get_Characters(19, treeNode.Text.Length).Font.ColorIndex = 3;
                    validate = true;
                }

                // dle uživatelského nastavení zkontrolujeme dokument
                if (validate && ReportDesignerProperties.Instance.MseAutoValidateAfterInsert)
                    ThreadService.SafeThreadCall(ExcelValidateCommand.Validate, false);

                Marshal.FinalReleaseComObject(selection);
            }
        }

        /// <summary>
        /// Okno s dotazem ohledně vkládané sekce
        /// </summary>
        /// <param name="treeNode"></param>
        /// <param name="ExcelDocument"></param>
        /// <param name="ParentHandle"></param>
        /// <param name="OfficeWnd"></param>
        /// <param name="document"></param>
        internal static void Question(StructExtNode treeNode, Excel._Workbook ExcelDocument, IntPtr ParentHandle, IntPtr OfficeWnd, Parsers.AddIns.IOfficeDocument document)
        {
            if (ReportDesignerProperties.Instance.MseRegAutoInsert && (ReportDesignerProperties.Instance.MseRegAutoInsertHead || ReportDesignerProperties.Instance.MseRegAutoInsertBody || ReportDesignerProperties.Instance.MseRegAutoInsertFoot))
                if (ExcelDocument is MseOfficeDocument)
                    MseInsertSection(treeNode, ReportDesignerProperties.Instance.MseRegAutoInsertHead, ReportDesignerProperties.Instance.MseRegAutoInsertBody, ReportDesignerProperties.Instance.MseRegAutoInsertFoot, ExcelDocument, ParentHandle, OfficeWnd);
                else
                    OxsInsertSection(treeNode, ReportDesignerProperties.Instance.MseRegAutoInsertHead, ReportDesignerProperties.Instance.MseRegAutoInsertBody, ReportDesignerProperties.Instance.MseRegAutoInsertFoot, ExcelDocument, ParentHandle, OfficeWnd);
            else
            {
                QuestionWithDefaultDialog slf = new QuestionWithDefaultDialog();
                InsertOfficeRegionQuestionPanel pnl = new InsertOfficeRegionQuestionPanel(document);
                slf.AddControl(pnl);

                if (slf.ShowDialog(SimpleDesktop.MainForm) == DialogResult.OK)
                    if (ExcelDocument is MseOfficeDocument)
                        MseInsertSection(treeNode, pnl.Head, pnl.Body, pnl.Foot, ExcelDocument, ParentHandle, OfficeWnd);
                    else
                        OxsInsertSection(treeNode, pnl.Head, pnl.Body, pnl.Foot, ExcelDocument, ParentHandle, OfficeWnd);
            }
        }
        static void SetRowProperties(Excel.Range range)
        {
            range.Font.Bold = true;
            //barva pozadí
            range.Interior.ColorIndex = 8;
        }
        /// <summary>
        /// Nastavení standardního vzhledu řádku  
        /// </summary>
        /// <param name="range">Oblast řádku</param>
        static void SetNoneRowProperties(Excel.Range range)
        {
            range.Font.Bold = false;
            //barva pozadí
            range.Interior.ColorIndex = Excel.Constants.xlNone;
        }

        /// <summary>
        /// Zneviditelnění tlačítek zavření instance Word dokumentu
        /// </summary>
        /// <param name="wndPtr"></param>
        public static void HideTitleBar(ref IntPtr wndPtr)
        {
            if (wndPtr != IntPtr.Zero)
                try
                {
                    var styles = NativeMethods.GetWindowLong(wndPtr, NativeMethods.GWL_STYLE);
                    NativeMethods.SetWindowLong(wndPtr, NativeMethods.GWL_STYLE, styles & ~(int)(NativeMethods.WS_THICKFRAME | NativeMethods.WS_DLGFRAME | NativeMethods.WS_MAXIMIZE));

                    for (int i = 0; i < 9; i++)
                        //Delete the first menu command until all commands are deleted
                        if (NativeMethods.DeleteMenu(NativeMethods.GetSystemMenu(wndPtr, false), 0, 1024) == false)
                            break;

                    NativeMethods.BringWindowToTop(wndPtr);
                    NativeMethods.SetFocus(wndPtr);
                }
                catch { };
        }
    }
}
