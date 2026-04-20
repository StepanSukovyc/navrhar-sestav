//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DataXmlView.cs                         </Name>
//    <Description> Třída Data Editoru pro zobrazení XML obsahu datového souboru</Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-05-13                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Dom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Gordic.GFE.Parsers.Gui;
using Gordic.TextEditor;
using Gordic.GFE.WinClient.XmlEditor.Gui.Editor;
using Gordic.GFE.Parsers.XmlEditor;
using System.Windows.Forms;
using Gordic.GFE.WinClient.DefaultEditor;
using Gordic.GFE.Parsers;
using Gordic.TextEditor.Document;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;
using System.Xml;
using Gordic.GFE.Parsers.DefaultEditor;
using Gordic.GFE.WinClient.StructureView;
using System.IO;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.TextEditor.Actions;
using Gordic.General;
using Gordic.WinForms.Controls;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.Parsers.Binding;

namespace Gordic.GFE.WinClient.DataEditor
{
    /// <summary>
    /// Třída Data Editoru pro zobrazení XML obsahu datového souboru
    /// </summary>
    class DataXmlView : DefaultAbstractSecondaryViewContent, ITextEditorControlProvider, IUndoHandler
    {
        #region DefaultAbstractSecondaryViewContent
        /// <exclude/>
        public override object Control { get { return xmlEditor; } }

        /// <exclude/>
        protected override void LoadFromPrimary()
        {
            ignoreDirtyChange = true;
            LoggingService.Debug(GResources.GetResourceText(29450685)); //RC 29450685 : konverze do XML...
            using (AsynchronousWaitDialog monitor = AsynchronousWaitDialog.ShowWaitDialog(GResources.GetResourceText(29450684))) //RC 29450684 : načtení XML prezentace
            {
                UndoRedoService.FlushHistory();
                if (CompilationService.Units[PrimaryFile] is CUData cu)
                {
                    cu.CompileMethod -= Cu_CompileMethod;
                    string obsah = cu.FileContent.Content;
                    if (!string.IsNullOrEmpty(obsah) && cu.StructureViewEntry != null)
                    {
                        string[] splitR = obsah.Split('\r');
                        if (splitR.Length != 0)
                        {
                            XmlDocumentPosition xmlDoc = new XmlDocumentPosition();
                            XmlDeclaration xmlDecl = xmlDoc.CreateXmlDeclaration(ReportDesignerProperties.Instance.Version, cu.OpenedFile.Encoding != null ? cu.OpenedFile.Encoding.WebName : Encoding.UTF8.WebName, null);
                            xmlDoc.AppendChild(xmlDecl);
                            XmlElement dataElement = xmlDoc.CreateElement("data", cu.NamespaceURI);
                            xmlDoc.AppendChild(dataElement);
                            dataElement.SetAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
                            dataElement.SetAttribute("xmlns:xsd", "http://www.w3.org/2001/XMLSchema");
                            dataElement.SetAttribute("xmlns", splitR[0].TrimEnd().TrimEnd('|').Replace('|', ':'));
                            XmlElement activeElement = dataElement;

                            int index = -1;
                            //List<string> regions = new List<string>();
                            Stack<string> stack = new Stack<string>();
                            foreach (var item in splitR)
                            {
                                index++;
                                if (index != 0)
                                {
                                    string[] splitP = item.Split('|');
                                    int subIndex = -1;
                                    TreeNode[] regNode = null;
                                    foreach (var subItem in splitP)
                                    {
                                        subIndex++;
                                        if (subIndex == 0)
                                        {
                                            string splitTrim = splitP[subIndex].Trim();
                                            if (!string.IsNullOrEmpty(splitTrim))
                                            {
                                                while (stack.Contains(splitTrim))
                                                {
                                                    stack.Pop();
                                                    activeElement = activeElement.ParentNode as XmlElement;
                                                }

                                                XmlElement nodeElement = xmlDoc.CreateElement(splitTrim, cu.NamespaceURI);
                                                activeElement.AppendChild(nodeElement);
                                                activeElement = nodeElement;

                                                stack.Push(splitTrim);
                                                regNode = (cu.StructureViewEntry as StructureViewEntry).GetStructureRegion(splitTrim);
                                            }
                                        }
                                        else if (regNode != null && regNode.Length > 0)
                                        {
                                            if (!string.IsNullOrEmpty(splitP[subIndex]))
                                            {
                                                var node = (regNode[0].Nodes.Count > (subIndex - 1)) ? regNode[0].Nodes[subIndex - 1] as StructExtNode : null;
                                                if (node != null)
                                                {
                                                    XmlElement nodeElement = xmlDoc.CreateElement(node.Name, cu.NamespaceURI);
                                                    nodeElement.InnerText = splitP[subIndex];
                                                    activeElement.AppendChild(nodeElement);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            xmlEditor.Text = XmlService.SimpleFormat(XmlService.IndentedFormat(xmlDoc.OuterXml));
                        }
                    }
                    cu.CompileMethod += Cu_CompileMethod;
                }
            }
            XmlService.UpdateFolding(xmlEditor);
            ignoreDirtyChange = false;
        }

        /// <summary>
        /// převod XML do řádkového formátu
        /// dle datové struktury
        /// </summary>
        /// <param name="unt"></param>
        /// <returns></returns>
        string Cu_CompileMethod(dynamic unt = null)
        {
            if (ParserService.IsWellFormedXML(xmlEditor.Text, out string _))
            {
                XmlDocument docXml = new XmlDocument();
                docXml.LoadXml(xmlEditor.Text);

                CUData cu = unt != null ? unt as CUData : CompilationService.Units[PrimaryFile] as CUData;
                if (cu != null)
                {
                    if (cu.StructureViewEntry is StructureViewEntry svEntry && docXml.DocumentElement.HasAttribute("xmlns"))
                    {
                        StringBuilder sb = new StringBuilder();
                        sb.AppendLine(docXml.DocumentElement.GetAttribute("xmlns").Replace(':', '|') + "|");
                        if (docXml.DocumentElement.FirstChild != null)
                            if (docXml.DocumentElement.Name.Equals("data"))
                                AppendElement(docXml.DocumentElement.FirstChild as XmlElement, sb, svEntry);
                            else
                                AppendElement(docXml.DocumentElement as XmlElement, sb, svEntry);
                        return sb.ToString();
                    }
                }
                if (MessageService.AskQuestion(GResources.GetResourceText(29451435)))
                    // pak odstraň!!!
                    return cu.FileContent.Content;
                else 
                    return string.Empty;
            }

            throw new Exception(GResources.GetResourceText(29450680)); //RC 29450680 : Obsah nelze konvertovat!
        }

        void AppendElement(XmlElement element, StringBuilder sb, StructureViewEntry entry)
        {
            TreeNode[] region = entry.GetStructureRegion(element.Name);
            if (region != null && region.Length > 0)
            {
                // název aktuálního regionu
                string line = region.First().Name;
                bool existsSubNode = false;
                // projdeme větve regionu a uložíme jejích prezentací v datovém souboru
                foreach (TreeNode item in region[0].Nodes)
                    // jednoduché větve
                    if (item.Nodes.Count == 0)
                    {
                        line += "|";
                        // pokud existuji data, pak je uložíme
                        XmlNodeList lst = element.GetElementsByTagName(item.Name);
                        if (lst.Count == 1 && lst[0].FirstChild != null)
                            line += Convert.ToString(lst[0].FirstChild.Value);
                    }
                    else
                    {
                        // větve vnořenéh oregionu
                        XmlNodeList lst = element.GetElementsByTagName(item.Name);
                        // data vnořeného regionu existuji
                        if (lst.Count != 0)
                        {
                            for (int index = 0; index < lst.Count; index++)
                            {
                                // uložíme předchozí data
                                if (index == 0)
                                    if (line != null)
                                    {
                                        sb.AppendLine(line + "|");
                                        line = null;
                                    }
                                // generujeme data regionu
                                AppendElement(lst[index] as XmlElement, sb, entry);
                            }
                            existsSubNode = true;
                        }
                    }
                // v XML prezentaci nejsou data daného regionu
                if (!existsSubNode)
                    sb.AppendLine(line + "|");
            }
        }

        /// <exclude/>
        protected override void SaveToPrimary() 
        {
            LoggingService.Debug(GResources.GetResourceText(29450071) + "..."); //RC 29450071 : aktualizace textového editoru dle designéru
            if (!IsDirty)
                return;

            CUData unit = CompilationService.Units[PrimaryFile] as CUData;
            using (AsynchronousWaitDialog monitor = AsynchronousWaitDialog.ShowWaitDialog(GResources.GetResourceText(29450681))) //RC 29450681 : generování datového souboru
                unit.Compile(this);

            if (unit.ErrorsDuringCompile)
                if (!PrimaryFile.CancelSaving)
                    if (GMessageBox.ShowQuestion(string.Format(GResources.GetResourceText(29450682) //RC 29450682 : Chyba generování datového souboru;;{0};;
                        + GResources.GetResourceText(29450074), unit.ErrorMessage), SimpleDesktop.MainForm) == DialogResult.No) //RC 29450074 : Přejete si uložit poslední známý překlad?
                    {
                        PrimaryFile.CancelSaving = true;
                        return;
                    }

            isDirty = false;
        }
        
        #endregion

        #region ITextEditorControlProvider
        /// <exclude/>
        public TextEditorControl TextEditorControl { get { return xmlEditor; } }

        /// <exclude/>
        public IDocument GetDocumentForFile(OpenedFile file)
        {
            throw new NotImplementedException();
        }
        #endregion

        #region IUndoHandler
        /// <summary>
        /// Dostupnost operace UNDO
        /// </summary>
        public bool EnableUndo { get { return xmlEditor.EnableUndo; } }
        /// <summary>
        /// Dostupnost operace REDO
        /// </summary>
        public bool EnableRedo { get { return xmlEditor.EnableRedo; } }

        /// <summary>
        /// Operace UNDO
        /// </summary>
        public void Undo() { this.xmlEditor.Undo(); }

        /// <summary>
        /// Opoerace REDO
        /// </summary>
        public void Redo() { this.xmlEditor.Redo(); }

        #endregion

        bool ignoreDirtyChange;
        /// <summary>
        /// editor obsahu
        /// </summary>
        XmlEditorControl xmlEditor;
        /// <summary>
        /// Kontextové menu pro ovladax XML editoru
        /// </summary>
        static readonly string contextMenuPath = "/ReportDesigner/ViewContent/XmlEditor/ContextMenu";
        /// <summary>
        /// Editovatelné operace pro ovladač daného editoru
        /// </summary>
        static readonly string editActionsPath = "/AddIns/XmlEditor/EditActions";

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="dataView"></param>
        /// <param name="unit">jednotka překladu</param>
        public void Initialize(IViewContent dataView, CUData unit)
        {
            Initialize(dataView);
            this.TabPageText = GResources.GetResourceText(29450683); //RC 29450683 : náhled

            xmlEditor = new XmlEditorControl
            {
                SchemaCompletionDataItems = XmlSchemaManager.SchemaCompletionDataItems,
                Dock = DockStyle.Fill,
                TextEditorProperties = ReportDesignerTextEditorProperties.Instance
            };
            if (unit != null && unit.IsXml)
                xmlEditor.Text = (unit.FileContent as CUData.FCData).XmlContent.OuterXml;

            xmlEditor.Document.DocumentChanged += DocumentChanged;

            xmlEditor.AddEditActions(GetEditActions());

            ContextMenuStrip strip = MenuService.CreateContextMenu(xmlEditor, new EventArgsContextMenu(contextMenuPath));
            if (strip != null)
                xmlEditor.TextAreaContextMenuStrip = strip;

            xmlEditor.EnableFolding = true;
            xmlEditor.ActiveTextAreaControl.TextArea.DragOver += EditorDragOver;
            xmlEditor.ActiveTextAreaControl.TextArea.DragDrop += EditorDragDrop;
        }

        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnění objektu</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && xmlEditor != null)
            {
                xmlEditor.ActiveTextAreaControl.TextArea.DragDrop -= EditorDragDrop;
                xmlEditor.ActiveTextAreaControl.TextArea.DragOver -= EditorDragOver;

                xmlEditor.Dispose();
                xmlEditor = null;
            }

            base.Dispose(disposing);
        }
        void EditorDragOver(object sender, DragEventArgs drgevent)
        {
            if (drgevent.Data.GetDataPresent(typeof(StructExtNode))
                || drgevent.Data.GetDataPresent(typeof(string)))
                drgevent.Effect = DragDropEffects.Copy;
        }
        void EditorDragDrop(object sender, DragEventArgs drgevent)
        {
            dynamic node;
            if (drgevent.Data.GetDataPresent(typeof(StructExtNode)))
            {
                node = (StructExtNode)drgevent.Data.GetData(typeof(StructExtNode));
                xmlEditor.ActiveTextAreaControl.TextArea.InsertString(LocalCommonService.GetTextXmlForData(node));
                XmlService.UpdateFolding(xmlEditor);
            }
        }
        /// <exclude/>
        void DocumentChanged(object sender, DocumentEventArgs e)
        {
            if (!ignoreDirtyChange && PrimaryFile != null)
            {
                MakeDirty();
                PrimaryFile.MakeDirty();
            }
        }

        /// <summary>
        /// Akce editoru
        /// </summary>
        /// <returns></returns>
        IEditAction[] GetEditActions() { return AddInTree.BuildItems<IEditAction>(editActionsPath, this, false).ToArray(); }

        /// <summary>
        /// uložení XML obsahu do datového proudu
        /// </summary>
        /// <param name="stream">datový proud</param>
        internal void Save(Stream stream)
        {
            if (!xmlEditor.CanSaveWithCurrentEncoding())
                if (MessageService.AskQuestion(GResources.GetResourceText(29450192) + ' ' + //RC 29450192 : Soubor nelze uložit s aktuálním kódování
                                               xmlEditor.Encoding.EncodingName + ' ' + GResources.GetResourceText(29450191) + //RC 29450191 : bez ztráty dat.
                                               '\n' + GResources.GetResourceText(29450190))) //RC 29450190 : Chcete uložit v UTF-8 formátu?
                    xmlEditor.Encoding = System.Text.Encoding.UTF8;

            xmlEditor.SaveFile(stream);
        }
    }
}
