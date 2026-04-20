//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.OxsOfficeDocument.cs                   </Name>
//    <Description> Třída bezprostření editace OXS obsahu pomocí Office         </Description>
//    <Author>      Mgr. Stepan Sukovyč                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2016-09-01                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
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
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Editor._office;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.InfoSectionView;
using Gordic.GFE.WinClient.Services;
using Excel = Microsoft.Office.Interop.Excel;

namespace Gordic.GFE.WinClient.Editor
{

    /// <summary>
    /// Položka plošného seznamu objektu OXS sestavy
    /// </summary>
    class DynamicsItem
    {
        /// <summary>
        /// Kód/název položky
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Obsah položky analyzátoru
        /// </summary>
        public dynamic Item { get; set; }
    }

    /// <summary>
    /// Třída bezprostření editace MSE obsahu pomocí Office
    /// </summary>
    class OxsOfficeDocument : ExcelOfficeDocument
    {
        /// <summary>
        /// Jedná se o plošný seznam všech objeků seřazených dle struktury v atomu.
        /// Kvůli jednoduchému přístupu
        /// </summary>
        public List<dynamic> dynamics { get; set; }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="view"></param>
        public OxsOfficeDocument(IOfficeDocumentView view) : base(view) { }

        /// <summary>
        /// načtení hlavního regionu
        /// </summary>
        /// <param name="reg">hlavní region sestavy</param>
        protected override void LoadRegion(GFEFormatRegion reg)
        {
            dynamics = new List<dynamic>();
            pullToDynamic(reg);
            LoggingService.Info("KONEC");
        }

        protected override void SheetChange()
        {
            using (AsynchronousWaitDialog monitor = AsynchronousWaitDialog.ShowWaitDialog(GResources.GetResourceText(2945202))) //RC 2945202 : zpracování obsahu
            {
                InitExcelComments();
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
                if (ExcelDocument?.Application.ActiveCell != null)
                    if (ExcelDocument?.Application.ActiveCell.Comment != null)
                    {
                        OleMessageFilter.Register();
                        // vlastnosti prohlížíme pouze u položek
                        // ... podmínkou položek je existence komentáře
                        Excel.Comment cmmnt = ExcelDocument.Application.ActiveCell.Comment;
                        if (cmmnt != null)
                        {
                            dynamic itm;
                            string text = cmmnt.Shape.AlternativeText;
                            if (OfficeService.IsGroupByComment(text))
                                itm = OfficeAtomGroupItem.FromSerializeText(text);
                            else if (OfficeService.IsItemByComment(text))
                                itm = OfficeAtomItem.FromSerializeText(text);
                            else
                                // jedná se o region
                                // je možné, že se jedná o prázdný záznam (např. konec regionu nebo začátek před skupinou)
                                itm = OfficeService.HasDataByComment(text)
                                    ? OfficeAtomRegionItem.FromSerializeText(text)
                                    : new OfficeAtomRegionItem()
                                    {
                                        Guid = OfficeService.GetGuid(text).ToString()
                                    };

                            itm.ExcellComment = cmmnt;
                            if (itm != null)
                                view.ServiceSelection.SetSelectedComponents(itm, SelectionTypes.Add);
                        }
                    }
                    else
                        view.ServiceSelection.SetSelectedComponents(new OfficeAtomItem(), SelectionTypes.Replace);
            }
            catch (Exception ex) { LoggingService.Error(ex.Message, ex); }
            finally
            {
                if (ExcelDocument?.Application.ActiveCell != null && ExcelDocument?.Application.ActiveCell.Comment != null)
                    OleMessageFilter.Revoke();
            }
        }

        /// <summary>
        /// Generování alf kódu
        /// </summary>
        /// <param name="unt"></param>
        /// <returns></returns>
        protected override string CompileMethod(dynamic unt = null)
        {
            ThreadService.WaitForLockers();
            CompilationUnit unit = (unt is CompilationUnit
                    ? unt as CompilationUnit
                    : (CompilationService.Units[view.PrimaryFile] as CompilationUnit))
                ?? throw new Exception(GResources.GetResourceText(29450128));

            XmlDocumentPosition xmlDoc = new XmlDocumentPosition();
            string xmlText = string.Empty;

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

                OxsDocument oxsDoc = new OxsDocument(this, unit);

                //<format type="grr" xmlns="http://www.gordic.cz/TR/alf/1.4/">
                XmlElement xmlFormat = xmlDoc.CreateElement("format", unit.NamespaceURI);
                xmlFormat.SetAttribute("type", "oxs");

                // zkopírujemen sekcí INFO
                if (InfoSectionViewPad.Instance == null
                    || !InfoSectionViewPad.SetInfoSection(xmlDoc, xmlFormat, unit.OpenedFile))
                    XmlDocumentService.CopyInfoSection(xmlOldDoc, xmlFormat, xmlDoc);

                // zkopírujeme sekcí TEMPLATE
                XmlDocumentService.CopyTemplateSection(xmlOldDoc, xmlFormat, xmlDoc);

                // uložíme globální komentáře
                XmlDocumentService.SetGlobalScripts(GlobalScripts, xmlFormat);
                xmlText = oxsDoc.GetSheetsData();
                xmlFormat.AppendChild(xmlDoc.CreateElement("replace", unit.NamespaceURI));
                xmlDoc.AppendChild(xmlFormat);
            }
            string outerXml = xmlDoc.OuterXml;

            return outerXml.Replace("<replace />", xmlText).Replace("<replace/>", xmlText);
        }

        internal override void UpdateSelected()
        {
            try
            {
                OleMessageFilter.Register();
                view.ServiceSelection.SelectedComponents.ForEach(component =>
                {
                    string cellRef = (component as OfficeAtomItem).CellRef;
                    string data = (component as OfficeAtomItem).ToSerializeText();
                    if (ExcelDocument?.Application.ActiveCell != null && ExcelDocument?.Application.ActiveCell.Comment != null)
                    {
                        Excel.Comment comment = ExcelDocument?.Application.ActiveCell.Comment;
                        comment.Text(OfficeService.GetUpdatedCommentData(comment.Shape.AlternativeText, data), CommonService.MISSVALUE, CommonService.MISSVALUE);
                    }
                });
            }
            catch (Exception ex) { LoggingService.Error(ex.Message, ex); }
            finally { OleMessageFilter.Revoke(); }
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
                                OfficeAtomItem item = new OfficeAtomItem()
                                {
                                    Guid = guid.ToString(),
                                    Name = treeNode.FullName,
                                    ExcellComment = selection.Comment,
                                    CellRef = (selection.Comment.Parent as Excel.Range).Address[false, false]
                                };
                                selection.Comment?.Text(OfficeService.GetUpdatedCommentData(selection.Comment.Shape.AlternativeText, item.ToSerializeText()), CommonService.MISSVALUE, CommonService.MISSVALUE);
                            }
                            // dle uživatelského nastavení zkontrolujeme dokument
                            if (ReportDesignerProperties.Instance.MseAutoValidateAfterInsert)
                                ThreadService.SafeThreadLockCall(delegate { lock (syncRoot) ExcelValidateCommand.Validate(false); }, syncRoot);

                            if (selection != null)
                                Marshal.FinalReleaseComObject(selection);
                        }
                        catch (Exception ex) { LoggingService.Error(ex.Message); }
                        finally { selection = null; }
                    }
                }
            }
            catch (Exception ex) { LoggingService.Error(ex.Message, ex); }
        }

        void pullToDynamic(GFEFormatRegion reg)
        {
            if (reg.Name != "ROOT")
            {
                if (reg.Head.Count > 0)
                {
                    dynamics.Add(new DynamicsItem() { Name = "head", Item = reg });
                    reg.Head.ForEach(x => pullToDynamic(x));
                }
                if (reg.Body.Count > 0)
                {
                    dynamics.Add(new DynamicsItem() { Name = "body", Item = reg });
                    reg.Body.ForEach(x => pullToDynamic(x));
                }
                else if (reg.Groups.Count > 0)
                    reg.Groups.ForEach(x => pullToDynamic(x));
                if (reg.Foot.Count > 0)
                {
                    dynamics.Add(new DynamicsItem() { Name = "foot", Item = reg });
                    reg.Foot.ForEach(x => pullToDynamic(x));
                }
            }
            else pullToDynamic(reg.Body.First());
        }

        void pullToDynamic(GFEFormatTag tag)
        {
            if (tag is GFEFormatRegion)
                pullToDynamic((GFEFormatRegion)tag);
            else
            {
                if (tag.GetType().Name.Equals("GFEFormatRTFItem"))
                    dynamics.Add(new DynamicsItem() { Name = "item", Item = tag });
                else
                    tag.Children.ForEach(x => pullToDynamic(x));
            }
        }

        void pullToDynamic(GFEFormatGroup tag)
        {
            dynamics.Add(new DynamicsItem() { Name = "group", Item = tag });

            tag.Head.ForEach((x) => pullToDynamic(x));
            tag.Foot.ForEach((x) => pullToDynamic(x));
        }

        /// <summary>
        /// Nový způsob synchronizace mezí seznamem <see cref="dynamics"/> a aktuálním seznamem komentářů dokumentu
        /// </summary>
        void InitExcelComments()
        {
            if (Plock != null && !isInRefreshMode)
                using (Plock)
                {
                    try
                    {
                        OleMessageFilter.Register();
                        for (int index = 1; index <= ExcelDocument.Worksheets.Count; index++)
                            Init(dynamics, (ExcelDocument.Worksheets.get_Item(index) as Excel._Worksheet).Comments);
                        OleMessageFilter.Revoke();
                    }
                    catch (Exception ex)
                    {
                        LoggingService.Error("Chyba:", ex);
                    }
                }
        }

        /// <summary>
        /// Jedná se o inicializaci komentářů dokumentu vůči údajům v ALF textovém souboru
        /// </summary>
        /// <param name="pDynamics">Aktuální seznam objektů dle ALF souboru odpovídající sadě komentářu</param>
        /// <param name="comments">Sada komentářů aktuální záložky Excel</param>
        void Init(List<dynamic> pDynamics, Excel.Comments comments)
        {
            if (comments?.Count == 0)
                return;

            try
            {
                int index = 0;
                int dynamicsIndex = 0;
                for (int i = 1; i <= comments.Count; i++)
                    InitComment(comments[i], i, comments, ref dynamicsIndex);
                LoggingService.Info(String.Format("Celkem {0} - {1}", index, pDynamics.Count));
            }
            catch (Exception ex) { LoggingService.Error(ex.Message, ex); }
        }

        /// <summary>
        /// Inicializace konkrétního komentáře
        /// </summary>
        /// <param name="comment">Komentář k inicializaci</param>
        /// <param name="index">Index konce hledání regionu/skupiny</param>
        /// <param name="comments">Seznam dostupných komentářů</param>
        /// <param name="dynamicsIndex">Aktuální index objektu v seznamu dynamics</param>
        void InitComment(Excel.Comment comment, int index, Excel.Comments comments, ref int dynamicsIndex)
        {
            if (comment == null)
                return;

            Excel.Range commentedCell = comment.Parent as Excel.Range;
            // Get the row and column numbers  
            //int rowNumber = commentedCell.Row;
            //int columnNumber = commentedCell.Column;
            string cellAddress = commentedCell.Address[false, false];
            LoggingService.Info(string.Format("Zpracování buňky {0}", cellAddress));

            // jinak zafixujeme text komentáře ...
            string text = comment.Shape.AlternativeText;
            if (!OfficeService.IsEndSectionByComment(text))
            {
                string name = OfficeService.GetName(text);
                if (name != null)
                {
                    string guid = OfficeService.GetGuid(text).ToString();
                    // is group
                    bool isGroup = OfficeService.IsGroupByComment(text);
                    if (isGroup)
                        guid = OfficeService.GetGroupGuid(text).ToString();

                    // musíme ignorovat značku začátku regionu, pokud další komentář je skupina
                    if (!(text.Contains(CommonService.MSE_BEGIN_SECTION_BODY) && OfficeService.IsGroupByComment(comments[index + 1].Shape.AlternativeText)))
                    {
                        dynamic item = GetDynamicsItem(guid, name, cellAddress, isGroup, ref dynamicsIndex);
                        if (item != null)
                        {
                            // pokud se nejedná o vnořenou skupinu
                            bool logToBreak = !(text.Contains(CommonService.MSE_BEGIN_SECTION_BODY) && item is OfficeAtomGroupItem);

                            if (
                                // pokud buňky jsou stejné - jedná se nejspíše o value-of
                                item.CellRef == cellAddress
                                // nebo sedí jména - jedná se o úplná jména
                                || item.Name.Equals(name)
                                // nebo se jedná o skupinu
                                || isGroup
                                )
                            {
                                LoggingService.Info(String.Format("{0} - {1}", "Položka", name));
                                string textToUpdate = comment.Shape.AlternativeText;
                                if (string.IsNullOrEmpty(item.Guid))
                                    item.Guid = guid;
                                else if (item.Guid != guid)
                                    // nutná změna GUID v Excell buňce
                                    textToUpdate = textToUpdate.Replace(string.Format("[#{0}#]", guid), item.Guid);

                                if (item.CellRef != cellAddress)
                                    item.CellRef = cellAddress;

                                //aktualizujeme data v komentáři
                                textToUpdate = OfficeService.GetUpdatedCommentData(textToUpdate, item.ToSerializeText());
                                textToUpdate = textToUpdate.Replace("Textové pole: ", "");

                                if (!textToUpdate.Equals(comment.Shape.AlternativeText.Replace("Textové pole: ", "")))
                                    comment?.Text(textToUpdate, CommonService.MISSVALUE, CommonService.MISSVALUE);
                            }
                            else if (logToBreak)
                                LoggingService.Info(String.Format("{0} - {1}", "Položka", name));
                        }
                    }
                    else
                        LoggingService.Info("Ignorujeme začátek regionu...");
                }
            }
            Marshal.ReleaseComObject(commentedCell);
        }

        dynamic GetDynamicsItem(string guid, string name, string cellAddress, bool isGroup, ref int dynamicsIndex)
        {
            dynamic result = null;
            while (dynamics.Count > dynamicsIndex)
            {
                bool exists = true;
                dynamic item = dynamics[dynamicsIndex];
                if (isGroup && item.Name == "group")
                {
                    Dictionary<string, string> attr = null;
                    if (item.Item.Foot.Count > 0)
                        attr = item.Item.Foot[0].Attributes;
                    else if (item.Item.Head.Count > 0)
                        attr = attr = item.Item.Head[0].Attributes;
                    if (attr != null)
                    {
                        Dictionary<string, string> a = attr.FindAllByKey(x => x == "cell" || x == "guid");
                        if (a.Count > 0)
                        {
                            a = a.FindAllByValue(x => x == guid || x == cellAddress);
                            if (a.Count > 0)
                            {

                                result = new OfficeAtomGroupItem();
                                result.Init(attr, null);
                                //dynamics.Remove(dynamics.First());
                            }
                            else
                            {
                                exists = false;
                                LoggingService.Info(String.Format("NENALEZENO ve skupině dle hodnoty '{0}' nebo '{1}'", guid, cellAddress));
                            }
                        }
                        else
                        {
                            exists = false;
                            LoggingService.Info("NENALEZENO ve skupině dle klíče 'cell' nebo 'guid'");
                        }
                    }
                }
                else
                {
                    Dictionary<string, string> a = (item.Item.Attributes as Dictionary<string, string>).FindAllByKey(x => x == "name" || x == "cell");
                    if (a.Count > 0)
                    {
                        string itemFullName = GetFullName(item.Item);
                        a = a.FindAllByValue(x => x == name || x == cellAddress || ("region".Equals(item.Item.TagName) && name.EndsWith(itemFullName)));
                        if (a.Count > 0)
                        {
                            if (item.Item.GetType().Name == "GFEFormatRTFItem")
                                // vytvoříme atom
                                result = new OfficeAtomItem();
                            else if (item.Name == "group")
                                result = new OfficeAtomGroupItem();
                            else
                                result = new OfficeAtomRegionItem();
                            result.Init(item.Item.Attributes, null);

                            result.Name = itemFullName;
                            //dynamics.Remove(dynamics.First());
                        }
                        else
                        {
                            exists = false;
                            LoggingService.Info(String.Format("NENALEZENO dle hodnoty '{0}' nebo '{1}'", name, cellAddress));
                        }
                    }
                    else
                    {
                        exists = false;
                        LoggingService.Info("NENALEZENO dle klíče 'cell' nebo 'name'");
                    }
                }
                dynamicsIndex++;

                if (exists)
                    break;
            }
            return result;
        }

        string GetFullName(dynamic item)
        {
            String name = null;
            dynamic parent = null;

            if ("value-of".Equals(item.TagName))
            {
                Dictionary<string, string> a = (item.Attributes as Dictionary<string, string>).FindAllByKey(x => x == "name");
                if (a.Count > 0)
                {
                    name = a.First().Value;
                    parent = item.Region;
                }
            }
            else
            {
                name = item.Name;
                parent = item.Parent;
            }

            if (!String.IsNullOrEmpty(name))
                while (parent != null)
                {
                    if ("ROOT".Equals(parent.Name))
                        break;

                    name = String.Format("{0}.{1}", parent.Name, name);
                    parent = parent.Parent;
                }
            return name;
        }
    }
}
