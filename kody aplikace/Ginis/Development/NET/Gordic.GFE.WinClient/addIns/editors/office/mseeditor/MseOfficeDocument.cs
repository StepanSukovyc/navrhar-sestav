//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.MseOfficeDocument.cs                   </Name>
//    <Description> Třída bezprostření editace MSE obsahu pomocí Office         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-22                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel.Design;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using System.Xml;
using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.core;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Editor._office;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.InfoSectionView;
using Gordic.GFE.WinClient.Services;
using Excel = Microsoft.Office.Interop.Excel;

namespace Gordic.GFE.WinClient.Editor
{

    /// <summary>
    /// Třída bezprostření editace MSE obsahu pomocí Office
    /// </summary>
    class MseOfficeDocument : ExcelOfficeDocument
    {
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="view"></param>
        public MseOfficeDocument(IOfficeDocumentView view) : base(view) { }

        /// <summary>
        /// načtení hlavního regionu
        /// </summary>
        /// <param name="reg">hlavní region sestavy</param>
        protected override void LoadRegion(GFEFormatRegion reg)
        {
            atom = new MseOfficeAtom();
            atom.Init(reg);
        }

        protected override void SheetChange()
        {
            using (AsynchronousWaitDialog monitor = AsynchronousWaitDialog.ShowWaitDialog(GResources.GetResourceText(2945202))) //RC 2945202 : zpracování obsahu
            {
                RefreshFields();
                PrepareSelection();
            }
        }

        /// <summary>
        /// Zobrazení vlastnosti výběru
        /// </summary>
        public override void PrepareSelection()
        {
            try
            {
                view.ServiceSelection.Clear();
                if (ExcelDocument?.Application.ActiveCell != null && ExcelDocument?.Application.ActiveCell.Comment != null)
                {
                    OleMessageFilter.Register();
                    // vlastnosti prohlížíme pouze u položek
                    // ... podmínkou položek je existence komentáře
                    using (Plock)
                    {
                        MseOfficeAtom lAtom = atom.GetByGuid(OfficeService.GetGuid(ExcelDocument.Application.ActiveCell.Comment.Shape.AlternativeText), ExcelDocument.Application.ActiveCell.Comment.Shape.ID);
                        if (lAtom != null)
                            view.ServiceSelection.SetSelectedComponents(lAtom.Item, SelectionTypes.Add);
                    }
                }
            }
            catch (Exception ex) { LoggingService.Error(ex.Message, ex); }
            finally { OleMessageFilter.Revoke(); }
        }

        /// <summary>
        /// Generování alf kódu
        /// </summary>
        /// <param name="unt"></param>
        /// <returns></returns>
        protected override string CompileMethod(dynamic unt = null)
        {
            ThreadService.WaitForLockers();
            CompilationUnit unit = unt is CompilationUnit ? unt as CompilationUnit : (CompilationService.Units[view.PrimaryFile] as CompilationUnit);

            if (unit == null)
                throw new Exception(GResources.GetResourceText(29450128)); //RC 29450128 : Jednotka není připarvená!

            //Načtení ze sestavy
            XmlDocumentPosition xmlDoc = new XmlDocumentPosition();

            using (new ExcelParentLock(ParentHandle, OfficeWnd, ExcelDocument))
            {
                OfficeTemplateService.SetContentOfCopyDocument(unit);
                xmlDoc.Selected.Clear();

                //<?xml version="1.0" encoding="utf-8"?>
                XmlDeclaration xmlDecl = xmlDoc.CreateXmlDeclaration(ReportDesignerProperties.Instance.Version, unit.OpenedFile.Encoding.WebName, null);
                xmlDoc.AppendChild(xmlDecl);

                // uložení globálního komentáře před sekci formát
                XmlDocumentService.SetChangesComments(Comments, xmlDoc);

                // z obsahu převezmene Info sekci a template sekci
                XmlDocument xmlOldDoc = new XmlDocument();
                xmlOldDoc.LoadXml(unit.FileContent.Content);
                unit.NamespaceURI = xmlOldDoc.DocumentElement.NamespaceURI;

                MseDocument mseDoc = new MseDocument(this, unit);

                //<format type="grr" xmlns="http://www.gordic.cz/TR/alf/1.4/">
                XmlElement xmlFormat = xmlDoc.CreateElement("format", unit.NamespaceURI);
                xmlFormat.SetAttribute("type", xmlOldDoc.DocumentElement.GetAttribute("type") ?? "mse");

                // zkopírujemen sekcí INFO
                if (InfoSectionViewPad.Instance == null
                    || !InfoSectionViewPad.SetInfoSection(xmlDoc, xmlFormat, unit.OpenedFile))
                    XmlDocumentService.CopyInfoSection(xmlOldDoc, xmlFormat, xmlDoc);

                // zkopírujeme sekcí TEMPLATE
                XmlDocumentService.CopyTemplateSection(xmlOldDoc, xmlFormat, xmlDoc);

                // uložíme globální komentáře
                XmlDocumentService.SetGlobalScripts(GlobalScripts, xmlFormat);
                mseDoc.SetSheetData(ref xmlFormat, unit.NamespaceURI);
                xmlDoc.AppendChild(xmlFormat);
            }
            return xmlDoc.OuterXml;
        }

        /// <summary>
        /// Vložení položky na objekt
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        public override void ItemDrag(object sender, ItemDragEventArgs e)
        {
            try
            {
                ExtTreeView treeView = (ExtTreeView)sender;
                StructExtNode treeNode = (StructExtNode)e.Item;
                if (treeView == null || treeNode == null)
                    return;

                // případ regionu
                if (treeNode.DataRegion != null)
                    ThreadService.SafeThreadOfficeCall(OfficeUtil.Question, treeNode, ExcelDocument, ParentHandle, OfficeWnd, (IOfficeDocument)this);

                // případ položky
                else if (treeNode.DataItem != null)
                {
                    string insertText = treeNode.FullName;
                    string[] split = insertText.Split('.');
                    if (split.Length >= 2)
                        insertText = string.Join(".", split, split.Length - 2, 2);

                    using (Plock)
                    {
                        Excel.Range selection = ExcelDocument.Application.ActiveCell;
                        try
                        {
                            if (selection != null)
                            {
                                // nový identifikátor
                                Guid guid = Guid.NewGuid();
                                Excel.Worksheet ws = ExcelDocument.ActiveSheet as Excel.Worksheet;
                                if (selection.Comment != null)
                                    selection.Comment.Text(string.Format(CommonService.MSE_FIELD + ": {0}[#{1}#]", insertText, guid.ToString()));
                                else
                                    selection.AddComment(string.Format(CommonService.MSE_FIELD + ": {0}[#{1}#]", insertText, guid.ToString()));

                                selection.Value = treeNode.Text;
                            }
                            // dle uživatelského nastavení zkontrolujeme dokument
                            if (ReportDesignerProperties.Instance.MseAutoValidateAfterInsert)
                                ThreadService.SafeThreadLockCall(delegate { lock (syncRoot) ExcelValidateCommand.Validate(false); }, syncRoot);

                            RefreshFields();
                            Marshal.FinalReleaseComObject(selection);
                        }
                        catch (Exception ex) { LoggingService.Error(ex.Message); }
                        finally { selection = null; }
                    }
                }
            }
            catch (Exception ex) { LoggingService.Error(ex.Message, ex); }
        }
    }
}
