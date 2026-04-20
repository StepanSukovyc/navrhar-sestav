//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.OfficeTemplateService.cs               </Name>
//    <Description>                                                             </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2020-05-30                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Core;
using System;
using Excel = Microsoft.Office.Interop.Excel;
using System.Runtime.InteropServices.ComTypes;
using System.IO;
using Gordic.General;
using Gordic.GFE.Parsers.Services;
using System.Drawing;

namespace Gordic.GFE.WinClient.Editor
{
    class OfficeTemplateService
    {
        static OfficeDocumentDictionary<ExcelDocumentItem> documents = new OfficeDocumentDictionary<ExcelDocumentItem>();
        /// <summary>
        /// Získání nebo vytvoření šablony MSE dokumentu
        /// </summary>
        /// <param name="view">Pohled na soubor, na který je vázaná šablona</param>
        internal static bool GetOrCreateTemplateFile(IOfficeDocumentView view)
        {
            if (view.PrimaryFile == null)
                return false;

            string templateName = CompilationService.Units[view.PrimaryFile].GetAttributeValue("//alf:template", "filename");

            if (!documents.ContainsKey(view.PrimaryFile))
            {
                // indikuje, že soubor teprve vytvořen
                if (view.PrimaryFile.IsUntitled)
                {
                    string tempFile = Path.Combine(view.PrimaryFile.TemporaryDirectory.Path, templateName);
                    if (!string.IsNullOrEmpty(DataService.TemplateFileName)
                        && FileUtility.TestFileExists(DataService.TemplateFileName))
                        File.Copy(DataService.TemplateFileName, tempFile);

                    documents.Add(view.PrimaryFile, new ExcelDocumentItem(tempFile, view));
                }
                else
                    foreach (var iFile in view.PrimaryFile.TemporaryDirectory.GetFiles())
                        if (iFile.Name.Equals(templateName))
                            documents.Add(view.PrimaryFile, new ExcelDocumentItem(iFile.FullName, view));
            }

            return documents.ContainsKey(view.PrimaryFile);
        }

        /// <summary>
        /// Položka MSE dokumentu
        /// </summary>
        /// <param name="openedFile">Otevřený soubor</param>
        /// <returns></returns>
        internal static Excel.Workbook GetDocument(OpenedFile openedFile) => documents.ContainsKey(openedFile) ? documents[openedFile].ExcelDocument : null;

        /// <summary>
        /// Položka MSE dokumentu
        /// </summary>
        /// <param name="openedFile">Otevřený soubor</param>
        /// <returns></returns>
        internal static IntPtr GetWordWnd(OpenedFile openedFile) => documents.ContainsKey(openedFile) ? documents[openedFile].ExcelWnd : IntPtr.Zero;

        /// <summary>
        /// Odstranění šablony ze seznamu šablon.
        /// Ukončení instance Word.
        /// </summary>
        /// <param name="primaryFile">Primární soubor, šablonu kterého je zapotřebí ukončit</param>
        internal static void RemoveTemplate(OpenedFile primaryFile) { documents.Remove(primaryFile); }

        #region NEW
        internal static IntPtr ShowDocument(IntPtr intPtr, OpenedFile openedFile, Rectangle bounds, ExcelOfficeDocument mod) =>
            documents.ContainsKey(openedFile) ? documents[openedFile].ShowDocument(intPtr, bounds, mod) : IntPtr.Zero;

        #endregion

        internal static void PrepareSelection(IOfficeDocumentView view)
        {
            if (view != null && documents.ContainsKey(view.PrimaryFile))
                documents[view.PrimaryFile].PrepareSelection();
        }

        internal static void SetContentOfCopyDocument(CompilationUnit unit)
        {
            // pokud dokument nebyl pozměněn pak není co řešit
            var wb = GetDocument(unit.OpenedFile);

            IPersistFile persistFile = (IPersistFile)wb;
            if (persistFile == null)
                return;

            // uložíme kopii
            string activeDocument = FileUtility.Combine((new GFETempDir()).Path, unit.GetAttributeValue("//alf:template", "filename"));
            // FIX změny formátu XLS souborů - nově podmínka < ...původně !=
            if (wb.FileFormat == Excel.XlFileFormat.xlExcel8 && Path.GetExtension(activeDocument).Equals(".xls"))
                wb.SaveAs(activeDocument, Excel.XlFileFormat.xlExcel8);
            else if ((wb.FileFormat <= Excel.XlFileFormat.xlExcel5 || wb.FileFormat == Excel.XlFileFormat.xlOpenXMLWorkbook)
                && (Path.GetExtension(activeDocument).Equals(".xlsx") || Path.GetExtension(activeDocument).Equals(".xls")))
                wb.SaveAs(activeDocument, wb.FileFormat <= Excel.XlFileFormat.xlExcel5 ? Excel.XlFileFormat.xlExcel5 : wb.FileFormat);
            persistFile.Save(activeDocument, false);

            // vytvoříme archivní balíček
            unit.ZipResources = FileUtility.Combine((new GFETempDir()).Path, Guid.NewGuid().ToString() + ".tmp");
            GZip.Zip(activeDocument, unit.ZipResources);
            // nakopírujeme uloženou kopií do dočasné složky otevřeného souboru
            unit.TemplateFile = Path.Combine(unit.OpenedFile.TemporaryDirectory.Path, Path.GetFileName(activeDocument));
            FileUtility.ObservedCopy(activeDocument, unit.TemplateFile, true);
        }

        internal static void UpdateSelected(OxsContainerControl view)
        {
            if (view != null && documents.ContainsKey(view.PrimaryFile))
                documents[view.PrimaryFile].UpdateSelected();
        }

        ///// <summary>
        ///// Zastavení vlákna pro práci s dokumentem
        ///// </summary>
        ///// <param name="file">Otevřený soubor dokumentu</param>
        //internal static void StopThreads(OpenedFile file)
        //{
        //    if (file != null && documents.ContainsKey(file))
        //        documents[file].StopThreads();
        //}
    }
}
