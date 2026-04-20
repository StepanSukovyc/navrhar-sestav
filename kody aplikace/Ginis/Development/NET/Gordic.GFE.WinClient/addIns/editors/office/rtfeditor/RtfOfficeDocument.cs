//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.RtfOfficeDocument.cs                   </Name>
//    <Description> Třída bezprostření editace RTF obsahu pomocí Office         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-12                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;
using System.Xml;
using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.StructureView;
using Word = Microsoft.Office.Interop.Word;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using System.Drawing;
using Gordic.GFE.WinClient.Gui.Dialogs;
using Gordic.GFE.WinClient.AddIns.Editors.Office;
using Gordic.GFE.WinClient.InfoSectionView;
using Gordic.GFE.Parsers.Binding;
using Gordic.Documents.Rtf;
using Gordic.GFE.Parsers.core;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Třída bezprostření editace RTF obsahu pomocí Office
    /// </summary>
    class RtfOfficeDocument : IOfficeDocument
    {
        #region IOfficeDocument
        IFormationDocumentProperty formProp;
        /// <summary>
        /// Vlastnosti dokumentu
        /// </summary>
        public IFormationDocumentProperty FormationProperty
        {
            get
            {
                if (formProp == null && CompilationService.Units[view.PrimaryFile] is CompilationUnit cu)
                {
                    if (cu.FormationProperty == null)
                        cu.FormationProperty = new RtfFormationProperty();

                    cu.CompileMethod += CompileMethod;
                    formProp = cu.FormationProperty;
                }

                return formProp;
            }
        }

        /// <summary>
        /// Nastavení vlastnosti
        /// </summary>
        /// <param name="section">způsoby vložení sekcí auto/head/body/foot .</param>
        public void SetInsertSectionProperty(params bool[] section)
        {
            ReportDesignerProperties.Instance.RtfRegAutoInsert = section[0];
            ReportDesignerProperties.Instance.RtfRegAutoInsertHead = section[1];
            ReportDesignerProperties.Instance.RtfRegAutoInsertBody = section[2];
            ReportDesignerProperties.Instance.RtfRegAutoInsertFoot = section[3];
        }
        /// <summary>
        /// Načtení vlastnosti
        /// </summary>
        /// <param name="auto">indikuje automatické vložení sekce</param>
        /// <param name="head">Vlastnost head</param>
        /// <param name="body">Vlastnost body</param>
        /// <param name="foot">Vlastnost foot</param>
        public void GetInsertSectionProperty(ref bool auto, ref bool head, ref bool body, ref bool foot)
        {
            auto = ReportDesignerProperties.Instance.RtfRegAutoInsert;
            head = ReportDesignerProperties.Instance.RtfRegAutoInsertHead;
            body = ReportDesignerProperties.Instance.RtfRegAutoInsertBody;
            foot = ReportDesignerProperties.Instance.RtfRegAutoInsertFoot;
        }
        /// <summary>
        /// Vložení položky na objekt
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        public void ItemDrag(object sender, ItemDragEventArgs e)
        {
            if (WordDocument.ProtectionType != Word.WdProtectionType.wdNoProtection)
            {
                MessageService.ShowWarning(string.Join("\r\n", GResources.GetResourceText(29450659), GResources.GetResourceText(29450658))); //RC 29450659 : Dokument je chráněný.
                return;
            }

            dynamic treeView = null
                , treeNode = null;
            SideTabItem draggedItem = null;
            if (sender is ExtTreeView)
            {
                treeView = (ExtTreeView)sender;
                treeNode = (StructExtNode)e.Item;
                if (treeView == null || treeNode == null)
                    return;

                // případ regionu
                if (treeNode.DataRegion != null)
                    ThreadService.SafeThreadCall(Question, (StructExtNode)treeNode);
                // případ položky
                else if (treeNode.DataItem != null)
                {
                    string insertText = treeNode.FullName;
                    string[] split = insertText.Split('.');
                    int ln = split.Length;
                    if (ln >= 2)
                        insertText = string.Join(".", split, ln - 2, 2);

                    //V případě, že táhneme objekt do oblasti Záhlaví nebo Zápatí dokumentu, 
                    //pak tažený objekt bude MacroButton
                    if (WordDocument.ActiveWindow.Selection != null)
                    {
                        switch (WordDocument.ActiveWindow.Selection.StoryType)
                        {
                            case Word.WdStoryType.wdMainTextStory:
                            case Word.WdStoryType.wdCommentsStory:
                            default:
                                createFormField(treeNode, insertText);
                                break;
                            case Word.WdStoryType.wdFootnotesStory:
                            case Word.WdStoryType.wdEndnotesStory:
                            case Word.WdStoryType.wdTextFrameStory:
                            case Word.WdStoryType.wdEvenPagesHeaderStory:
                            case Word.WdStoryType.wdPrimaryHeaderStory:
                            case Word.WdStoryType.wdEvenPagesFooterStory:
                            case Word.WdStoryType.wdPrimaryFooterStory:
                            case Word.WdStoryType.wdFirstPageHeaderStory:
                            case Word.WdStoryType.wdFirstPageFooterStory:
                                try
                                {
                                    object o = treeNode.Text, mType = Word.WdFieldType.wdFieldMacroButton, ob = false;
                                    var wrdField = WordDocument.Fields.Add(WordDocument.ActiveWindow.Selection.Range, ref mType, ref o, ref ob);
                                    wrdField.Code.Font.ColorIndex = Word.WdColorIndex.wdGray50;
                                    wrdField.Code.Text = "MACROBUTTON MSWField(" + insertText + ") " + treeNode.Text;
                                    RtfTemplateService.ItemDragged = true;
                                }
                                catch
                                {
                                    MessageService.ShowError(GResources.GetResourceText(29451451));
                                }
                                break;
                        }
                    }

                    // dle uživatelského nastavení zkontrolujeme dokument
                    if (ReportDesignerProperties.Instance.RtfAutoValidateAfterInsert)
                        ThreadService.SafeThreadCall(RtfValidateCommand.Validate, false);
                }
            }
            else if (sender is GraphicEditorSideBar)
            {
                treeView = (GraphicEditorSideBar)sender;
                draggedItem = (SideTabItem)e.Item;
                if (draggedItem == null)
                    draggedItem = (ReportDesignerSideTabItem)e.Item;

                WordDocument.ShowGrammaticalErrors = false;
                WordDocument.ShowSpellingErrors = false;
                WordDocument.ShowRevisions = false;

                if (draggedItem != null)
                {
                    OleMessageFilter.Register();
                    view.IsInsertSection = true;
                    object o = "BLOK", mType = Word.WdFieldType.wdFieldMacroButton, ob = (object)false;
                    Word.Field wrdField = WordDocument.Fields.Add(WordDocument.ActiveWindow.Selection.Range, ref mType, ref o, ref ob);
                    wrdField.Code.Bold = 1;
                    wrdField.Code.Text = "MACROBUTTON MSWBeginSectionBody(BLOCK) " + GResources.GetResourceText(29450148) + ": BLOCK";//RC 29450148 : Tělo
                    RtfTemplateService.SetWordsColor(wrdField.Code.Words, Word.WdColorIndex.wdGreen);
                    WordDocument.ActiveWindow.Selection.TypeText("\r\n");
                    int start = WordDocument.ActiveWindow.Selection.Start = WordDocument.ActiveWindow.Selection.End;
                    WordDocument.ActiveWindow.Selection.Start = start;
                    WordDocument.ActiveWindow.Selection.End = start + 1;
                    o = "BLOK";
                    mType = Word.WdFieldType.wdFieldMacroButton;
                    ob = (object)false;
                    wrdField = WordDocument.Fields.Add(WordDocument.ActiveWindow.Selection.Range, ref mType, ref o, ref ob);
                    wrdField.Code.Bold = 1;
                    wrdField.Code.Text = "MACROBUTTON MSWEndSection(BLOCK) " + GResources.GetResourceText(29450150) + ": BLOCK"; //RC 29450150 : Konec
                    WordDocument.ActiveWindow.Selection.TypeText("\r\n");
                    RtfTemplateService.SetWordsColor(wrdField.Code.Words, Word.WdColorIndex.wdGreen);
                    RtfTemplateService.ItemDragged = true;
                    view.IsInsertSection = false;
                    OleMessageFilter.Revoke();
                }
            }
        }

        void createFormField(StructExtNode treeNode, string insertText)
        {
            Word.FormField wrdFormField = WordDocument.FormFields.Add(WordDocument.ActiveWindow.Selection.Range, Word.WdFieldType.wdFieldFormTextInput);
            wrdFormField.TextInput.Default = treeNode.Text;
            wrdFormField.Result = treeNode.Text;
            //  
            RtfContent lst = new RtfContent() { Name = getName(treeNode), Guid = Guid.NewGuid(), COMObject = wrdFormField };
            // načteme výchozí atributy položky datové struktury
            lst.LoadAttributes(treeNode.DataItem.Attributes);

            (FormationProperty as RtfFormationProperty).Guids.Add(lst.Guid);
            (FormationProperty as RtfFormationProperty).FieldsList.Add(lst);
            wrdFormField.OwnStatus = true;
            wrdFormField.StatusText = string.Format("MSWField: {0}[#{1}#]", insertText != null && insertText.Equals(treeNode.FullName) ? lst.Name : insertText, Convert.ToString(lst.Guid));
            RtfTemplateService.ItemDragged = true;
            // tato operace je kvůli spuštění příkazu přepočtu datových poli
            wrdFormField.Select();
        }

        /// <summary>
        /// Získání jména dle logiky objektu
        /// </summary>
        /// <param name="treeNode">Větev obsahující informaci o vkládaném objektu</param>
        /// <returns></returns>
        string getName(StructExtNode treeNode) => treeNode != null ? (treeNode.DataItem != null && treeNode.DataItem.Attributes.ContainsKey("default_name") ? treeNode.DataItem.Attributes["default_name"] : treeNode.FullName) : "";
        #endregion

        readonly IOfficeDocumentView view;
        /// <summary>
        /// Dokument sestavy
        /// </summary>
        public Word.Document WordDocument { get => RtfTemplateService.GetDocument(view.PrimaryFile); }
        /// <summary>
        /// Instance okna WORD
        /// </summary>
        public IntPtr WordWnd { get => RtfTemplateService.GetWordWnd(view.PrimaryFile); }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="pView"></param>
        public RtfOfficeDocument(IOfficeDocumentView pView)
        {
            this.view = pView;
        }

        /// <summary>
        /// Načtení XML.
        /// </summary>
        /// <param name="xml">XML obsah</param>
        public void Load(string xml)
        {
            try
            {
                RtfTemplateService.GetOrCreateTemplateFile(view);
                if (view.PrimaryFile != null)
                {
                    // načteme vlastností dokumentu
                    FormationProperty.LoadContent(null, view.PrimaryFile.Encoding, xml, view.PrimaryFile.FileName);
                    // aktualizujeme seznamy
                    FormationProperty.RefreshContent();
                }
            }
            catch (Exception ex)
            {
                LoggingService.Error(ex.ToString());
                view.ShowErrorMessage(ex.Message);
            }
        }

        /// <summary>
        /// Okno s dotazem ohledně vkládané sekce
        /// </summary>
        /// <param name="treeNode">Informace o regionu</param>
        internal void Question(StructExtNode treeNode)
        {
            if (ReportDesignerProperties.Instance.RtfRegAutoInsert
                && (ReportDesignerProperties.Instance.RtfRegAutoInsertHead
                || ReportDesignerProperties.Instance.RtfRegAutoInsertBody
                || ReportDesignerProperties.Instance.RtfRegAutoInsertFoot))
                InsertSection(treeNode,
                    ReportDesignerProperties.Instance.RtfRegAutoInsertHead,
                    ReportDesignerProperties.Instance.RtfRegAutoInsertBody,
                    ReportDesignerProperties.Instance.RtfRegAutoInsertFoot);
            else
            {
                QuestionWithDefaultDialog slf = new QuestionWithDefaultDialog();
                InsertOfficeRegionQuestionPanel pnl = new InsertOfficeRegionQuestionPanel((IOfficeDocument)this);
                slf.AddControl(pnl);

                if (slf.ShowDialog(SimpleDesktop.MainForm) == DialogResult.OK)
                    InsertSection(treeNode, pnl.Head, pnl.Body, pnl.Foot);
            }
        }
        /// <summary>
        /// zobrazení dokumentu
        /// </summary>
        /// <param name="intPtr"></param>
        /// <param name="bounds"></param>
        internal void ShowDocument(IntPtr intPtr, Rectangle bounds)
        {
            RtfTemplateService.GetOrCreateTemplateFile(view);
            RtfTemplateService.ShowDocument(intPtr, view.PrimaryFile, bounds);
        }
        /// <summary>
        /// zavření dokumentu otevřeného souboru
        /// </summary>
        /// <param name="primaryFile">otevřený soubor návrháře</param>
        internal void CloseDocument(OpenedFile primaryFile)
        {
            RtfTemplateService.RemoveTemplate(primaryFile);
        }
        internal void RefreshLists()
        {
            if (FormationProperty is RtfFormationProperty rtf)
                rtf.RefreshLists();
        }

        #region ALF
        readonly object syncRoot = new object();
        GRTFField lastMB = null;
        GFERegion rootRegion;
        string rootRegionName, innerRegionName;
        long curPos = 0, lastStart = -1, lastEnd = -1;
        XmlElement currentElement, rootElement;
        XmlDocumentPosition ownerDoc;
        bool rootOpened;
        readonly List<string> currRegName = new List<string>();
        readonly List<GRTFField.GMBType> currRegType = new List<GRTFField.GMBType>();

        dynamic GetFirstElement(GRTFDocument rtfDocument) => GetFirstHeaderOrFooterElement(rtfDocument) ?? GetFirstPNSECLVLElement(rtfDocument);

        /// <summary>
        /// Získání RTF obsahu aktuálního dokumentu
        /// </summary>
        /// <returns></returns>
        string GetInnerRegionName(GRTFDocument rtfDocument)
        {
            if (rootRegion == null)
                return string.Empty;

            List<string> regions = new List<string>();
            bool inner = false;
            foreach (var item in rtfDocument.Fields)
                if (item.FieldType != GRTFField.GFieldType.unknown)
                {
                    string regName = CommonService.GetFullName(rootRegion, item.MSWName, false, item.FieldType != GRTFField.GFieldType.section);
                    if (!string.IsNullOrEmpty(regName))
                    {
                        if (CommonService.IsReservedWord(regName))
                            continue;

                        string[] names = regName.Split('.');
                        int length;
                        switch (item.FieldType)
                        {
                            case GRTFField.GFieldType.formfield:
                                length = names.Length - 1;
                                break;
                            case GRTFField.GFieldType.section:
                                if (item.MSWMBType == GRTFField.GMBType.end)
                                {
                                    // v opačném případě chyba umístění
                                    if (regions.Count != 0 && names.Last().Equals(regions.Last()))
                                    {
                                        regions.Remove(regions.Last());
                                        inner = true;
                                    }
                                    continue;
                                }
                                else length = names.Length;
                                break;
                            default:
                                if (item.MSWMBType == GRTFField.GMBType.field)
                                    length = names.Length - 1;
                                else
                                    length = names.Length;
                                break;
                        }

                        // aktualizace zásobníku
                        for (int i = 0; i < length; i++)
                            if (regions.Count <= i)
                            {
                                // pokud vnitřní element nebyl nalezen
                                if (!inner)
                                    regions.Add(names[i]);
                            }
                            else if (!regions[i].Equals(names[i], StringComparison.InvariantCultureIgnoreCase))
                                // zřejmě chyba umístění
                                continue;
                    }
                    else if (item.MSWName != null)
                        throw new RtfValidateException(string.Format(GResources.GetResourceText(29451452) + " {0} " + GResources.GetResourceText(29451453), item.MSWName));
                }

            return regions.Count > 0 ? string.Join(".", regions) : StructureViewPad.Instance.GetRootRegion(string.Empty);
        }
        /// <summary>
        /// Generování alf kódu
        /// </summary>
        /// <param name="unt"></param>
        /// <returns></returns>
        string CompileMethod(dynamic unt = null)
        {
            ThreadService.WaitForLockers();
            CompilationUnit unit = unt is CompilationUnit ? unt as CompilationUnit : (CompilationService.Units[view.PrimaryFile] as CompilationUnit);

            LoggingService.Debug(GResources.GetResourceText(29450151)); //RC 29450151 : start kompilace
            if (unit == null)
                throw new Exception(GResources.GetResourceText(29450128)); //RC 29450128 : Jednotka není připarvená!

            try
            {
                RtfTemplateService.SetContentOfCopyDocument(unit);

                //Načtení ze sestavy
                ownerDoc = new XmlDocumentPosition();
                ownerDoc.Selected.Clear();

                //<?xml version="1.0" encoding="utf-8"?>
                XmlDeclaration xmlDecl = ownerDoc.CreateXmlDeclaration(ReportDesignerProperties.Instance.Version, unit.OpenedFile.Encoding.WebName, null);
                ownerDoc.AppendChild(xmlDecl);

                // uložení globálního komentáře před sekci formát
                XmlDocumentService.SetChangesComments((FormationProperty as RtfFormationProperty).Comments, ownerDoc);

                // z obsahu převezmene Info sekci a template sekci
                XmlDocument xmlOldDoc = new XmlDocument();
                xmlOldDoc.LoadXml(unit.FileContent.Content);
                unit.NamespaceURI = xmlOldDoc.DocumentElement.NamespaceURI;

                //<format type="grr" xmlns="http://www.gordic.cz/TR/alf/1.4/">
                XmlElement xmlFormat = ownerDoc.CreateElement("format", unit.NamespaceURI);
                xmlFormat.SetAttribute("type", "rtf");

                // zkopírujeme sekcí INFO
                if (InfoSectionViewPad.Instance == null
                    || !InfoSectionViewPad.SetInfoSection(ownerDoc, xmlFormat, unit.OpenedFile))
                    XmlDocumentService.CopyInfoSection(xmlOldDoc, xmlFormat, ownerDoc);

                // zkopírujemen sekcí TEMPLATE
                XmlDocumentService.CopyTemplateSection(xmlOldDoc, xmlFormat, ownerDoc);
                // uložíme globální komentáře
                XmlDocumentService.SetGlobalScripts(FormationProperty.GlobalScripts, xmlFormat);

                // test kompletní analýzy RTF formátu
                if (!string.IsNullOrEmpty(unit.TemplateFile))
                {
                    rootOpened = false;
                    lastMB = null;
                    rootElement = null;
                    curPos = 0;
                    currentElement = xmlFormat;
                    currRegName.Clear();
                    currRegType.Clear();
                    rootRegion = unit.StructureViewEntry != null
                        ? (unit.StructureViewEntry as StructureViewEntry).GetStructureRootRegion()
                        : null;
                    rootRegionName = rootRegion != null ? rootRegion.Name : string.Empty;

                    if (rootRegion == null)
                        LoggingService.Error(GResources.GetResourceText(29450672)); //RC 29450672 : hlavní region nebyl identifikován
                    LoggingService.Debug("RTF parsing");
                    using (GRTFDocument rtfDocument = new GRTFDocument(unit.TemplateFile))
                        ToAlfFormat(rtfDocument);
                    LoggingService.Debug("RTF parsing OK");
                }

                //sjednotíme po sobě jdoucí sekci rtfref (je-li to možné)
                JoinRtfRef(ref xmlFormat);
                ownerDoc.AppendChild(xmlFormat);
                LoggingService.Debug(GResources.GetResourceText(29450154)); //RC 29450154 : konec kompilace
                unit.XmlDocPosition = ownerDoc;
            }
            catch (Exception ex)
            {
                MessageService.ShowError(string.Join("\n", GResources.GetResourceText(29450152), GResources.GetResourceText(29450153), GResources.GetResourceText(29450189), ex.Message)); //RC 29450189 : Chyba
                RtfTemplateService.RemoveTemplate(unit.OpenedFile);
                //TODO - RtfTemplateService.GetOrCreateTemplateFile(view);
                view?.ShowDocument();
                throw new Exception(ex.Message, ex.InnerException);
            }

            return ownerDoc.OuterXml;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="rtfDocument"></param>
        /// <param name="parentField"></param>
        /// <param name="mswName"></param>
        /// <returns>TRUE - je zapotřebí vytvořit region; FALSE - kontrola proběhla úspěšně - není zapotřebí vytvářet region</returns>
        bool CheckRootOpened(GRTFDocument rtfDocument, GRTFField parentField = null, string mswName = "")
        {
            bool needCreateRegion = false;
            if (currRegName.Count == 0)
            {
                // nastané v případě prvního výskytu
                // analyzujeme seznam FIELD objektu
                innerRegionName = !rootOpened ? GetInnerRegionName(rtfDocument) : mswName;
                needCreateRegion = SetFirstElement(rtfDocument);
            }

            if (!needCreateRegion
                && parentField != null)
                // případ každého dalšího výskytu
                // vynecháme samotnou větev RTF formátu popisující danou sekcí
                if (curPos <= parentField.OffsetStart)
                {
                    AppendComment(string.Format(GResources.GetResourceText(29451454), parentField.MSWMBType, parentField.MSWName));
                    if (curPos < parentField.OffsetStart)
                        AppendRtfRef((int)curPos, (int)parentField.OffsetStart);
                    curPos = parentField.OffsetEnd;
                }

            return needCreateRegion;
        }
        bool SetFirstElement(GRTFDocument rtfDocument)
        {
            dynamic firstHeaderOrFooterSection = GetFirstElement(rtfDocument);

            if (firstHeaderOrFooterSection != null)
            {
                AppendRtfRef((int)curPos, (int)firstHeaderOrFooterSection.OffsetStart - 1);
                curPos = firstHeaderOrFooterSection.OffsetStart;
                return string.IsNullOrEmpty(innerRegionName) || !OpenRegionByName(innerRegionName.Split('.'), true);
            }
            else
                return true;
        }
        bool OpenRegionByName(string[] names, bool isRegion = false)
        {
            string regName, fullName = null;

            if (names.Length <= 1)
                regName = StructureViewPad.Instance.GetRootRegion(string.Empty);
            else if (isRegion)
            {
                regName = names.Last();
                fullName = string.Join(".", names);
            }
            else
                regName = names[names.Length - 2];

            if (!string.IsNullOrEmpty(regName))
            {
                if (fullName == null)
                    fullName = CommonService.GetFullName(StructureViewPad.Instance.GetRootRegion(), regName);

                if (fullName != null && !fullName.Equals("ROOT"))
                {
                    List<string> namesL = fullName.Split('.').ToList();
                    int i = 0;
                    while (i < currRegName.Count && namesL.Count != 0)
                        if (currRegName[i].Equals(namesL.First()))
                        {
                            namesL.RemoveAt(0);
                            i++;
                        }
                        else
                            while (i < currRegName.Count)
                                CloseSection(currRegType.Last());

                    if (namesL.Count != 0)
                    {
                        int lIndex = 0;
                        string lGuid = null;
                        foreach (var item in namesL)
                        {
                            if (lIndex == 0)
                            {
                                RtfContent _cnt = (FormationProperty as RtfFormationProperty).FieldsList.FirstOrDefault(itm => itm.AttrList.ContainsValue(item));
                                if (_cnt != null)
                                    lGuid = _cnt.Guid.ToString();
                            }
                            OpenRegion(item, lGuid);
                            OpenSection(GRTFField.GMBType.body);
                        }
                    }
                }
                return true;
            }
            return false;
        }
        /// <summary>
        /// vložení doplňkových atributů
        /// </summary>
        /// <param name="content">obsah s potřebnými informacemi o objektu</param>
        /// <param name="rtfref">element - vlastník atributů</param>
        /// <returns>TRUE - byli vloženy dodatečné informace o objektu</returns>
        bool SetAttributes(RtfContent content, XmlElement rtfref)
        {
            if (content == null)
                return false;

            bool result = false;
            if (content.Scripts.Count != 0)
                foreach (var _item in content.Scripts)
                    if (!string.IsNullOrEmpty(_item.Value))
                    {
                        rtfref.SetAttribute(_item.Key, _item.Value);
                        result = true;
                    }

            if (!string.IsNullOrEmpty(content.Format))
            {
                rtfref.SetAttribute("format", content.Format);
                result = true;
            }

            // scriptname - mění název položky
            if (!string.IsNullOrEmpty(content.ScriptName) && NamedService.IsAggregate(content.Name).Aggregate)
            {
                rtfref.SetAttribute("name", content.ScriptName);
                result = true;
            }

            foreach (var _item in content.Unknowns)
            {
                rtfref.SetAttribute(_item.Key, _item.Value);
                result = true;
            }

            // nezapomeneme na vlastnost ONLY-IF
            foreach (var _item in content.AttrList)
                if ("only-if".Equals(_item.Key))
                {
                    rtfref.SetAttribute(_item.Key, _item.Value);
                    result = true;
                }

            return result;
        }
        bool SkipOptional(GRTFGroup grp, GRTFDocument rtfDocument)
        {
            if ((int)grp.OffsetStart - curPos > 0)
            {
                dynamic dest = grp.Tags.FirstOrDefault(itm => itm is GRTFDestination || itm is GRTFCommand);
                if (dest != null)
                    switch ((dest as GRTFCommand).Command)
                    {
                        case GRtfUtils._themedata:
                            if (rtfDocument.FontTable?.UseThemes != true &&
                                ReportDesignerProperties.Instance.RtfOpt_themedata
                                && !CheckRootOpened(rtfDocument))
                            {
                                if (lastMB != null)
                                    SkipParagraph(rtfDocument);

                                AppendRtfRef((int)curPos, (int)grp.OffsetStart);
                                AppendComment(dest);
                                curPos = grp.OffsetEnd;
                                return true;
                            }
                            return false;
                        case GRtfUtils._datastore:
                            if (ReportDesignerProperties.Instance.RtfOpt_datastore
                                && !CheckRootOpened(rtfDocument))
                            {
                                if (lastMB != null)
                                    SkipParagraph(rtfDocument);

                                AppendRtfRef((int)curPos, (int)grp.OffsetStart);
                                AppendComment(dest);
                                curPos = grp.OffsetEnd;
                                return true;
                            }
                            return false;
                        case GRtfUtils._colorschememapping:
                            if (ReportDesignerProperties.Instance.RtfOpt_colorschememapping
                                && !CheckRootOpened(rtfDocument))
                            {
                                if (lastMB != null)
                                    SkipParagraph(rtfDocument);

                                AppendRtfRef((int)curPos, (int)grp.OffsetStart);
                                AppendComment(dest);
                                curPos = grp.OffsetEnd;
                                return true;
                            }
                            return false;
                        case GRtfUtils._latentstyles:
                            if (ReportDesignerProperties.Instance.RtfOpt_latentstyles
                                && !CheckRootOpened(rtfDocument))
                            {
                                if (lastMB != null)
                                    SkipParagraph(rtfDocument);

                                AppendRtfRef((int)curPos, (int)grp.OffsetStart);
                                AppendComment(dest);
                                curPos = grp.OffsetEnd;
                                return true;
                            }
                            return false;
                        case GRtfUtils._nonshppict:
                        case GRtfUtils._shprslt:
                            if (ReportDesignerProperties.Instance.RtfOpt_shprslt)
                                if (grp.Contains(GRtfUtils._pict)
                                && !CheckRootOpened(rtfDocument))
                                {
                                    if (lastMB != null)
                                        SkipParagraph(rtfDocument);

                                    AppendRtfRef((int)curPos, (int)grp.OffsetStart);
                                    AppendComment(dest);
                                    curPos = grp.OffsetEnd;
                                    return true;
                                }
                            return false;
                        default:
                            if (!CheckRootOpened(rtfDocument))
                            {
                                if (lastMB != null)
                                    SkipParagraph(rtfDocument);

                                AppendRtfRef((int)curPos, (int)grp.OffsetStart);
                                AppendComment(dest);
                                curPos = grp.OffsetEnd;
                                return true;
                            }
                            return false;
                    }
                else if (ReportDesignerProperties.Instance.RtfOpt_comments)
                    AppendComment(GResources.GetResourceText(29451455, dest)); //RC 29451455 : !!!volitelná sekce {0} nebyla odstraněna!!!
            }
            return false;
        }

        void JoinRtfRef(ref XmlElement xmlFormat)
        {
            try
            {
                int i = 0;
                while (i < xmlFormat.ChildNodes.Count)
                {
                    if ((xmlFormat.ChildNodes[i].Name == "rtfref")
                         && (i != (xmlFormat.ChildNodes.Count - 1))
                         && (xmlFormat.ChildNodes[i + 1].Name == "rtfref"))
                    {
                        while ((i + 1) < xmlFormat.ChildNodes.Count && (xmlFormat.ChildNodes[i + 1].Name == "rtfref")
                            && xmlFormat.ChildNodes[i].Attributes["end"].Value == xmlFormat.ChildNodes[i + 1].Attributes["start"].Value)
                        {
                            xmlFormat.ChildNodes[i].Attributes["end"].Value = xmlFormat.ChildNodes[i + 1].Attributes["end"].Value;
                            xmlFormat.RemoveChild(xmlFormat.ChildNodes[i + 1]);
                        }
                    }
                    else
                        JoinRtfRef(xmlFormat.ChildNodes[i]);
                    i++;
                }
            }
            catch { }
        }
        void JoinRtfRef(XmlNode xmlNode)
        {
            int i = 0;
            while (i < xmlNode.ChildNodes.Count)
            {
                if ((xmlNode.ChildNodes[i].Name == "rtfref")
                     && (i != (xmlNode.ChildNodes.Count - 1))
                     && (xmlNode.ChildNodes[i + 1].Name == "rtfref"))
                {
                    while ((i + 1) < xmlNode.ChildNodes.Count && (xmlNode.ChildNodes[i + 1].Name == "rtfref")
                        && xmlNode.ChildNodes[i].Attributes["end"].Value == xmlNode.ChildNodes[i + 1].Attributes["start"].Value)
                    {
                        xmlNode.ChildNodes[i].Attributes["end"].Value = xmlNode.ChildNodes[i + 1].Attributes["end"].Value;
                        xmlNode.RemoveChild(xmlNode.ChildNodes[i + 1]);
                    }
                }
                else
                    JoinRtfRef(xmlNode.ChildNodes[i]);
                i++;
            }
        }
        /// <summary>
        /// Vložení položky nebo regionu (dle větve) do WORD dokumentu
        /// </summary>
        /// <param name="treeNode">Větev s informaci o vkládaném objektu</param>
        /// <param name="section">Indikuje potřebu vytvoření záhlaví/těla/zápatí</param>
        void InsertSection(StructExtNode treeNode, params bool[] section)
        {
            view.IsInsertSection = true;
            OleMessageFilter.Register();
            bool validate = false;
            string insertText = treeNode.FullName;
            string[] split = insertText.Split('.');
            int ln = split.Length;
            if (ln >= 2)
                insertText = string.Join(".", split, ln - 2, 2);

            //vložit hlavičku
            if (section[0])
            {
                object o = (object)treeNode.Text, mType = Word.WdFieldType.wdFieldMacroButton, ob = (object)false;
                Word.Field wrdField =
                    WordDocument.Fields.Add(WordDocument.ActiveWindow.Selection.Range, ref mType, ref o, ref ob);
                wrdField.Code.Bold = 1;
                wrdField.Code.Text = "MACROBUTTON MSWBeginSectionHeader(" + insertText + ") " + GResources.GetResourceText(29450147) + ": " + treeNode.Text; //RC 29450147 : Hlavička
                RtfTemplateService.SetWordsColor(wrdField.Code.Words, Word.WdColorIndex.wdRed);
                WordDocument.ActiveWindow.Selection.TypeText("\r\n");
                int start = WordDocument.ActiveWindow.Selection.Start = WordDocument.ActiveWindow.Selection.End;
                WordDocument.ActiveWindow.Selection.TypeText("\r\n");
                WordDocument.ActiveWindow.Selection.Start = start;
                WordDocument.ActiveWindow.Selection.End = start + 1;
                validate = true;
                RtfTemplateService.ItemDragged = true;
            }

            if (section[1])
            {
                object o = (object)treeNode.Text, mType = Word.WdFieldType.wdFieldMacroButton, ob = (object)false;
                Word.Field wrdField = WordDocument.Fields.Add(WordDocument.ActiveWindow.Selection.Range, ref mType, ref o, ref ob);
                wrdField.Code.Bold = 1;
                wrdField.Code.Text = "MACROBUTTON MSWBeginSectionBody(" + insertText + ") " + GResources.GetResourceText(29450148) + ": " + treeNode.Text;//ss 15.7.2009 //RC 29450148 : Tělo
                RtfTemplateService.SetWordsColor(wrdField.Code.Words, Word.WdColorIndex.wdRed);
                WordDocument.ActiveWindow.Selection.TypeText("\r\n");
                int start = WordDocument.ActiveWindow.Selection.Start = WordDocument.ActiveWindow.Selection.End;
                WordDocument.ActiveWindow.Selection.TypeText("\r\n");
                WordDocument.ActiveWindow.Selection.Start = start;
                WordDocument.ActiveWindow.Selection.End = start + 1;
                validate = true;
                RtfTemplateService.ItemDragged = true;
            }

            if (section[2])
            {
                object o = (object)treeNode.Text, mType = Word.WdFieldType.wdFieldMacroButton, ob = (object)false;
                Word.Field wrdField =
                    WordDocument.Fields.Add(WordDocument.ActiveWindow.Selection.Range, ref mType, ref o, ref ob);
                wrdField.Code.Bold = 1;
                wrdField.Code.Text = "MACROBUTTON MSWBeginSectionFooter(" + insertText + ") " + GResources.GetResourceText(29450149) + ": " + treeNode.Text;//ss 15.7.2009 //RC 29450149 : Patička
                RtfTemplateService.SetWordsColor(wrdField.Code.Words, Word.WdColorIndex.wdRed);
                WordDocument.ActiveWindow.Selection.TypeText("\r\n");
                int start = WordDocument.ActiveWindow.Selection.Start = WordDocument.ActiveWindow.Selection.End;
                WordDocument.ActiveWindow.Selection.TypeText("\r\n");
                WordDocument.ActiveWindow.Selection.Start = start;
                WordDocument.ActiveWindow.Selection.End = start + 1;
                validate = true;
                RtfTemplateService.ItemDragged = true;
            }

            if (section.FirstOrDefault(itm => itm == true))
            {
                object o = (object)treeNode.Text, mType = Word.WdFieldType.wdFieldMacroButton, ob = (object)false;
                Word.Field wrdField = WordDocument.Fields.Add(WordDocument.ActiveWindow.Selection.Range, ref mType, ref o, ref ob);
                wrdField.Code.Bold = 1;
                wrdField.Code.Text = "MACROBUTTON MSWEndSection(" + insertText + ") " + GResources.GetResourceText(29450150) + ": " + treeNode.Text; //RC 29450150 : Konec
                RtfTemplateService.SetWordsColor(wrdField.Code.Words, Word.WdColorIndex.wdRed);
                validate = true;
                RtfTemplateService.ItemDragged = true;
            }
            // dle uživatelského nastavení zkontrolujeme dokument
            if (validate && ReportDesignerProperties.Instance.RtfAutoValidateAfterInsert)
                ThreadService.SafeThreadCall(RtfValidateCommand.Validate, false);
            view.IsInsertSection = false;
            OleMessageFilter.Revoke();
        }
        void MacrobuttonToALF(GRTFField parentField, GRTFDocument rtfDocument)
        {
            if (parentField != null)
                if (parentField.FieldType == GRTFField.GFieldType.section)
                {
                    // případ otevření/zavření regionu buď 
                    // MSWBeginSectionHeader, MSWBeginSectionBody, MSWBeginSectionFooter nebo MSWEndSection
                    bool needCreateRegion = CheckRootOpened(rtfDocument, parentField, parentField.MSWName);

                    string regName = parentField.MSWName.Split('.').Last();
                    if (!regName.Equals(rootRegionName) || !rootOpened)
                    {
                        GRTFField.GMBType opndSec = GetOpenedSection(regName);
                        switch (parentField.MSWMBType)
                        {
                            case GRTFField.GMBType.header:
                                // získáme otevřenou sekci daného regionu
                                if (opndSec == GRTFField.GMBType.unknown)
                                    // pokud aktuální sekce není otevřená (jinak je to chyba)
                                    // pak ji otevřeme
                                    OpenRegion(regName, parentField.MSWGuid);

                                // otevřeme sekci HEAD  
                                OpenSection(GRTFField.GMBType.header);
                                break;
                            case GRTFField.GMBType.body:
                                if (opndSec != GRTFField.GMBType.body)
                                {
                                    bool isOpnd = currRegName.Contains(regName);
                                    // předchozí sekce není uzařená
                                    if (opndSec != GRTFField.GMBType.unknown)
                                    {
                                        CloseSection(opndSec);
                                        isOpnd = false;
                                    }
                                    else if (!isOpnd)
                                    {
                                        if (CommonService.IsReservedWord(parentField.MSWName))
                                            OpenReserved(parentField.MSWName, parentField.MSWGuid);
                                        // BODY je první sekci regionu
                                        else
                                            OpenRegion(regName, parentField.MSWGuid);
                                    }
                                    // pokud sekce není otevřená a zároveň se nejedná o speciální sekci, pak...
                                    if (!isOpnd && !CommonService.IsReservedWord(parentField.MSWName))
                                        OpenSection(GRTFField.GMBType.body);
                                }
                                break;
                            case GRTFField.GMBType.footer:
                                // předchozí sekce není uzařená
                                if (opndSec != GRTFField.GMBType.unknown)
                                    CloseSection(opndSec);
                                else
                                    // FOOT je první sekcí regionu
                                    OpenRegion(regName, parentField.MSWGuid);

                                OpenSection(GRTFField.GMBType.footer);
                                break;
                            case GRTFField.GMBType.end:
                                if (!CommonService.IsReservedWord(parentField.MSWName))
                                {
                                    needCreateRegion = false;
                                    // nějaká chyba v návrhu
                                    if (currRegType.Count != 0)
                                        // poslední region uzavřeme na konci
                                        if (currRegName.Count != 1 && regName == currRegName.Last())
                                        {
                                            // nejvnořenější region uzavřeme na koncí
                                            if (string.IsNullOrEmpty(innerRegionName)
                                                || regName != innerRegionName.Split('.').Last())
                                            {
                                                CloseSection(currRegType.Last());
                                                CloseSection(GRTFField.GMBType.end);
                                            }
                                        }
                                }
                                // jinam pouze uzavřeme sekci
                                else CloseSection(GRTFField.GMBType.end);
                                break;
                            default:
                                needCreateRegion = false;
                                break;
                        }

                        if (needCreateRegion)
                            if (curPos <= parentField.OffsetStart)
                            {
                                AppendComment(string.Format(GResources.GetResourceText(29451454), parentField.MSWMBType, parentField.MSWName));
                                if (curPos < parentField.OffsetStart)
                                    AppendRtfRef((int)curPos, (int)parentField.OffsetStart);
                                curPos = parentField.OffsetEnd;
                            }
                    }
                }
                else if (parentField.MSWMBType == GRTFField.GMBType.field)
                    FieldToAlf(parentField, rtfDocument, parentField.MSWName, parentField.MSWGuid);
        }
        void FieldToAlf(GRTFField parentField, GRTFDocument rtfDocument, string mswName, string guid)
        {
            if (!string.IsNullOrEmpty(mswName))
            {
                string[] names = mswName.Split('.');
                bool needCreateRegion = false;
                if (currRegName.Count == 0)
                    needCreateRegion = CheckRootOpened(rtfDocument, parentField, mswName);
                else
                {
                    if (names.Length > 1)
                    {
                        if (currRegName.Count == 1)
                        {
                            if (names.First() != currRegName[0])
                                needCreateRegion = !OpenRegionByName(names);
                        }
                        else if (names.First() != currRegName.Last()
                                && names.First() != currRegName[currRegName.Count - 2])
                            needCreateRegion = !OpenRegionByName(names);
                    }

                    if (curPos < parentField.OffsetStart)
                        AppendRtfRef((int)curPos, (int)parentField.OffsetStart);

                    curPos = parentField.OffsetEnd;
                }

                if (needCreateRegion)
                    OpenRegionByName(names);

                string name = names.Last();
                if (names.Length > 1)
                {
                    if (currRegName.Count == 0)
                        currRegName.Add(names[names.Length - 2]);
                    else if (names[names.Length - 2] != currRegName.Last())
                        name = string.Join(".", names[names.Length - 2], names.Last());
                }
                currentElement.AppendChild(CreateValueOf(parentField, name, guid));
            }
        }
        void OpenRegion(string regName, string regGuid = null)
        {
            string regionName = CommonService.GetFullName(StructureViewPad.Instance.GetRootRegion(), regName);

            if (string.IsNullOrEmpty(regionName))
                throw new RtfValidateException(string.Format(GResources.GetResourceText(29451456), regName));

            OpenRegionBefore(regionName);
            SetRegion(regName, regGuid);
        }
        void OpenReserved(string reservedName, string regGuid = null)
        {
            SetRegion(reservedName, regGuid, reservedName != null ? reservedName.ToLowerInvariant() : "");
        }
        void SetRegion(string regName, string regGuid = null, string elName = "region")
        {
            // najdeme položku seznamu
            Guid guid = Guid.Empty;
            RtfContent _content = null;
            if (Guid.TryParse(regGuid, out guid) && (FormationProperty as RtfFormationProperty).Guids.Contains(guid))
                _content = (FormationProperty as RtfFormationProperty).FieldsList.FirstOrDefault(itm => itm.Guid == guid);

            dynamic region = ownerDoc.CreateElement(elName, currentElement.NamespaceURI);
            if (_content != null && _content.IsSelected)
                region = new XmlElementSelected(region).Initialize(_content);

            // pouze pro případ regionu uložíme název
            if (elName != null && "region".Equals(elName))
                region.SetAttribute("name", regName);

            if (_content != null
                && SetAttributes(_content, region)
                && !string.IsNullOrEmpty(regGuid)
                // nebo se jedná o neznámý objekt, který není regionem
                || !"region".Equals(elName))
                region.SetAttribute("guid", regGuid);

            currRegName.Add(regName);
            currRegType.Add(GRTFField.GMBType.field);

            currentElement.AppendChild(region);
            currentElement = region;

            if (!string.IsNullOrEmpty(innerRegionName))
            {
                if (regName.Equals(innerRegionName.Split('.').Last()))
                {
                    rootElement = region;
                    rootOpened = true;
                }
            }
            else if (!string.IsNullOrEmpty(rootRegionName) && regName.Equals(rootRegionName))
            {
                rootElement = region;
                rootOpened = true;
            }
        }
        /// <summary>
        /// vytvoření struktury regionu před daným
        /// </summary>
        /// <param name="fullRegName">úplný název regionu</param>
        void OpenRegionBefore(string fullRegName)
        {
            if (string.IsNullOrEmpty(fullRegName))
                return;

            string[] names = fullRegName.Split('.');
            if (names.Length > 1)
                for (int i = 0; i < names.Length - 1; i++)
                    if (i < currRegName.Count && !names[i].Equals(currRegName[i]))
                        return;
                    else if (i >= currRegName.Count)
                    {
                        SetRegion(names[i]);
                        OpenSection(GRTFField.GMBType.body);
                    }
        }
        void CloseSection(GRTFField.GMBType mcType)
        {
            if (currentElement != null)
                switch (mcType)
                {
                    case GRTFField.GMBType.body:
                        currentElement = (XmlElement)currentElement.ParentNode;
                        break;
                    case GRTFField.GMBType.footer:
                        currentElement = (XmlElement)currentElement.ParentNode;
                        break;
                    case GRTFField.GMBType.header:
                        currentElement = (XmlElement)currentElement.ParentNode;
                        break;
                    default:
                        currentElement = (XmlElement)currentElement.ParentNode;
                        currRegName.RemoveAt(currRegName.Count - 1);
                        break;
                }
            currRegType.RemoveAt(currRegType.Count - 1);
        }
        /// <summary>
        /// otevření sekce.
        /// výchozí otevření je větev REGION
        /// </summary>
        /// <param name="mcType"></param>
        /// <param name="guid"></param>
        void OpenSection(GRTFField.GMBType mcType, string guid = null)
        {
            XmlElement xmlType;
            switch (mcType)
            {
                case GRTFField.GMBType.footer:
                    xmlType = ownerDoc.CreateElement("foot", currentElement.NamespaceURI);
                    currRegType.Add(mcType);
                    break;
                case GRTFField.GMBType.header:
                    xmlType = ownerDoc.CreateElement("head", currentElement.NamespaceURI);
                    currRegType.Add(mcType);
                    break;
                case GRTFField.GMBType.body:
                    xmlType = ownerDoc.CreateElement("body", currentElement.NamespaceURI);
                    currRegType.Add(mcType);
                    break;
                default:
                    xmlType = ownerDoc.CreateElement("region", currentElement.NamespaceURI);
                    if (!string.IsNullOrEmpty(guid))
                        xmlType.SetAttribute("guid", guid);
                    break;
            }
            currentElement.AppendChild(xmlType);
            currentElement = xmlType;
        }
        void ToAlfFormat(GRTFDocument rtfDocument)
        {
            if (rtfDocument == null)
                return;

            if (rtfDocument.Fields.Length == 0)
                SetMainRegion(rtfDocument);

            foreach (var subitem in rtfDocument.FieldsWithOptional)
            {
                // prvně otestujeme přítomnost nepovinných větví (předpokládá se, že jsou na konci dokumentu)
                if (subitem is GRTFGroup grp && grp.IsOptional && SkipOptional(grp, rtfDocument))
                    continue;

                ValidateName(subitem as GRTFField);

                if (subitem is GRTFField field)
                    if (field.FieldType == GRTFField.GFieldType.section
                        || field.FieldType == GRTFField.GFieldType.macrobutton)
                    {
                        if (field.Tags.Count == 0)
                            continue;

                        if (!(field.Tags[0] is GRTFCommand command) || !command.Command.Equals("field"))
                            continue;

                        if (lastMB != null)
                            SkipParagraph(rtfDocument);

                        MacrobuttonToALF(field, rtfDocument);
                        lastMB = field.FieldType == GRTFField.GFieldType.section ? field : null;
                    }
                    else
                    {
                        if (lastMB != null)
                            SkipParagraph(rtfDocument);

                        if (field.FieldType == GRTFField.GFieldType.formfield)
                            FieldToAlf(field, rtfDocument, field.MSWName, field.MSWGuid);
                    }
            }
            if (lastMB != null)
            {
                var regType = currRegType.Last();
                if (regType == GRTFField.GMBType.field)
                    CloseSection(regType);
                SkipParagraph(rtfDocument);
            }

            var last = rtfDocument.Tags.Last();
            if (last.OffsetEnd > curPos)
            {
                AppendRtfRef((int)curPos, (int)last.OffsetEnd);
                curPos = last.OffsetEnd;
            }

            while (currRegName.Count != 0)
                CloseSection(currRegType.Last());

            AppendRtfRef((int)curPos, (int)curPos + 1);
        }
        void ValidateName(GRTFField field)
        {
            if (currRegName.Count > 0 && field != null && field.MSWName != null && !CommonService.IsReservedWord(field.MSWName))
            {
                string fullName = CommonService.GetFullName(StructureViewPad.Instance.GetRootRegion(), field.MSWName)
                    , fieldMSWName = field.MSWName;
                if (fullName != null)
                    if (field.MSWMBType == GRTFField.GMBType.field)
                    {
                        if (fullName.LastIndexOf('.') != -1)
                        {
                            fieldMSWName = fullName.Substring(0, fullName.LastIndexOf('.'));
                            if (!string.Join(".", currRegName).Contains(fieldMSWName) && fieldMSWName != null && !"ROOT".Equals(fieldMSWName.ToUpper()))
                            {
                                OfficeService.ErrorStartOffset = (FormationProperty as RtfFormationProperty).FieldsList.First(item => item.Guid.ToString().Equals(field.MSWGuid)).Start;
                                OfficeService.ErrorEndOffset = (FormationProperty as RtfFormationProperty).FieldsList.First(item => item.Guid.ToString().Equals(field.MSWGuid)).End;
                                throw new RtfValidateException(string.Format(GResources.GetResourceText(29451457), fieldMSWName));
                            }
                        }// jinak je to rezervované slovo DATE, ROOT atd.
                    }
                    else if (!fullName.Contains(string.Join(".", currRegName)) && !string.Join(".", currRegName).StartsWith(fullName))
                        throw new RtfValidateException(string.Format(GResources.GetResourceText(29451457), fieldMSWName));
            }
        }
        void SetMainRegion(GRTFDocument rtfDocument)
        {
            if (SetFirstElement(rtfDocument))
            {
                // sem by se nemělo dostat - nejspíše chyba, kterou se mi zatím nepodařilo nasimulovat
                var region = StructureViewPad.Instance.GetRootRegion();
                if (region != null)
                {
                    var child = region.Children.First();
                    if (child != null)
                    {
                        SetRegion(child.Name);
                        OpenSection(GRTFField.GMBType.body);
                        return;
                    }
                }
                SetRegion("");
                OpenSection(GRTFField.GMBType.body);
            }
        }
        void AppendComment(dynamic dest)
        {
            if (ReportDesignerProperties.Instance.RtfOpt_comments)
                AppendComment(dest != null ? dest.Command : GResources.GetResourceText(29451458));//RC 29451458 : vynechání volitelné větve
        }
        void SkipParagraph(GRTFDocument rtfDocument)
        {
            int indexF = rtfDocument.Tags.IndexOf(lastMB);
            List<GRTFControl> parentTags;
            parentTags = indexF != -1 ? rtfDocument?.Tags : GetParentByOffset(rtfDocument.Tags, lastMB, ref indexF)?.Tags;

            if (parentTags != null && indexF != -1)
            {
                List<GRTFControl> list = parentTags;
                //if (list.FirstOrDefault(itm => itm is GRTFGroup && list.IndexOf(itm) > indexF) is GRTFGroup item)
                var iix = list.FindIndex(indexF + 1, itm => itm is GRTFGroup); //optimalizace. list mívá poměrně hodně položek a hledá se až od indexF - Linq je zbytečně pomalý
                if (iix > 0)
                {
                    GRTFGroup item = list[iix] as GRTFGroup;
                    var command = item.Tags.FirstOrDefault(
                        itm => itm is GRTFCommand
                        && (itm as GRTFCommand).Command.TrimEnd() == "par");
                    if (command != null && curPos < command.OffsetEnd)
                    {
                        // určita optimalizace
                        // podmínka znamená, že tato sekce je vytvořená jen kvůli příkazu '\par'
                        //{\\rtlch\\fcs1 \\af1\\afs16 \\ltrch\\fcs0 \\f1\\fs16\\insrsid10883787\\charrsid10883787 \r\n\\par }
                        if (item.Tags.FirstOrDefault(itm => itm is GRTFGroup || itm is GRTFText) == null)
                        {
                            AppendRtfRef((int)curPos, (int)item.OffsetStart);
                            AppendComment($"skipped group {item.OffsetStart}-{item.OffsetEnd}: {item.Text.Replace("\n", "").Replace("\r", "")}");
                            // posunutí zamezující zdvojení záznamů
                            curPos = item.OffsetEnd;
                        }
                        else
                        {
                            AppendRtfRef((int)curPos, (int)command.OffsetStart);
                            AppendComment($"skipped command {command.OffsetStart}-{command.OffsetEnd}: {command.Text.Replace("\n", "").Replace("\r", "")}");
                            // posunutí zamezující zdvojení záznamů
                            curPos = command.OffsetEnd;
                        }
                        lastMB = null; //práve jsme přeskočili, už není potřeba zkoušet dále.
                    }
                }
            }
            //lastMB = null; -- TODO
        }
        void AppendComment(string commentData)
        {
            if (ReportDesignerProperties.Instance.RtfOpt_comments)
                currentElement.AppendChild(ownerDoc.CreateComment(commentData));
        }
        void AppendRtfRef(int startOffset, int endOffset)
        {
            if (lastStart != -1 && lastEnd != -1)
            {
                currentElement.AppendChild(CreateRtfRef((int)lastStart, (int)lastEnd));
                lastStart = lastEnd = -1;
            }

            if (startOffset < endOffset)
                currentElement.AppendChild(CreateRtfRef(startOffset, endOffset));
        }

        /// <summary>
        /// indikuje otevřenost daného regionu
        /// </summary>
        /// <param name="regName">název daného regionu</param>
        /// <returns></returns>
        GRTFField.GMBType GetOpenedSection(string regName) =>
            currRegName.Count != 0 && currRegName.Last() == regName
                ? currRegType.Last()
                : GRTFField.GMBType.unknown;

        GRTFGroup GetFirstHeaderOrFooterElement(GRTFDocument rtfDocument)
        {
            foreach (var item in rtfDocument.Tags.FindAll(itm => itm is GRTFGroup))
                if ((item as GRTFGroup).Tags.First() is GRTFCommand command)
                    switch (command.Command)
                    {
                        case GRtfUtils._header:
                        case GRtfUtils._headerl:
                        case GRtfUtils._headerr:
                        case GRtfUtils._headerf:
                        case GRtfUtils._footer:
                        case GRtfUtils._footerl:
                        case GRtfUtils._footerr:
                        case GRtfUtils._footerf:
                            return item as GRTFGroup;
                        default:
                            break;
                    }

            return null;
        }
        GRTFGroup GetFirstPNSECLVLElement(GRTFDocument rtfDocument)
        {
            foreach (var item in rtfDocument.Tags.FindAll(itm => itm is GRTFGroup))
                if ((item as GRTFGroup).Tags.First() is GRTFCommand command)
                    switch (command.Command)
                    {
                        case GRtfUtils._pnseclvl:
                            return item as GRTFGroup;
                        default:
                            break;
                    }

            return null;
        }
        GRTFGroup GetParentByOffset(List<GRTFControl> list, GRTFField lastMB, ref int indexF)
        {
            foreach (var item in list.FindAll(itm => itm is GRTFGroup))
                if (item.OffsetStart <= lastMB.OffsetStart
                    && item.OffsetEnd >= lastMB.OffsetEnd)
                {
                    indexF = (item as GRTFGroup).Tags.IndexOf(lastMB);
                    return indexF != -1 ? item as GRTFGroup : GetParentByOffset((item as GRTFGroup).Tags, lastMB, ref indexF);
                }

            return null;
        }

        XmlNode CreateRtfRef(int start, int end)
        {
            XmlElement rtfref = ownerDoc.CreateElement("rtfref", currentElement.NamespaceURI);
            rtfref.SetAttribute("start", Convert.ToString(start));
            rtfref.SetAttribute("end", Convert.ToString(end));
            return rtfref;
        }
        XmlNode CreateValueOf(GRTFField parentField, string name, string fieldGuid)
        {
            // najdeme položku seznamu
            Guid guid = Guid.Empty;
            RtfContent _content = null;
            if (string.IsNullOrEmpty(fieldGuid) || (Guid.TryParse(fieldGuid, out guid) && (FormationProperty as RtfFormationProperty).Guids.Contains(guid)))
                _content = (FormationProperty as RtfFormationProperty).FieldsList.FirstOrDefault(itm => itm.Guid == guid);
            bool _isText = _content != null && _content.Instance != null && "TEXT".Equals(_content.Instance, StringComparison.InvariantCultureIgnoreCase);
            dynamic rtfref;
            if (_content != null && _content.ItemType == GResources.GetResourceText(29450944))
            {
                /*
                    <barcode type="qrcode,1" image-height="15mm" image-width="15mm" rtf="\rtlch\fcs1 \af0\afs20 \ltrch\fcs0 \fs20\insrsid2248542" instance="TEXT">
                        <value-of name="dotc_subjekty.ds_esu_txt" />
                    </barcode>
                 */
                rtfref = ownerDoc.CreateElement("barcode", currentElement.NamespaceURI);
                if (_content != null && _content.IsSelected)
                    rtfref = new XmlElementSelected(rtfref).Initialize(_content);

                string attr_name = _content?.AttrList["image-height"];
                if (!string.IsNullOrEmpty(attr_name))
                    rtfref.SetAttribute("image-height", attr_name);

                attr_name = _content?.AttrList["image-width"];
                if (!string.IsNullOrEmpty(attr_name))
                    rtfref.SetAttribute("image-width", attr_name);

                rtfref.SetAttribute("type", _content.Type);

                if (parentField.InstanceType.Equals("FORMTEXT"))
                {
                    if (!string.IsNullOrEmpty(parentField.InstanceRtf))
                        rtfref.SetAttribute("rtf", parentField.InstanceRtf);
                    rtfref.SetAttribute("instance", "FORMTEXT");
                }
                else
                {
                    if (!string.IsNullOrEmpty(parentField.InstanceRtf))
                        rtfref.SetAttribute("rtf", parentField.InstanceRtf);
                    rtfref.SetAttribute("instance", "MACROBUTTON");
                }

                // GUID vložíme pouze v případě, kdy objekt obsahuje dodatečné info nebo je typu TEXT
                if (SetAttributes(_content, rtfref) && !string.IsNullOrEmpty(fieldGuid) || _isText)
                    rtfref.SetAttribute("guid", fieldGuid);

                dynamic item = ownerDoc.CreateElement("value-of", currentElement.NamespaceURI);
                attr_name = _content?.AttrList["name"];
                item.SetAttribute("name", NamedService.IsAggregate(attr_name).Aggregate ? attr_name : name);
                rtfref.AppendChild(item);
            }
            else
            {
                rtfref = ownerDoc.CreateElement("value-of", currentElement.NamespaceURI);
                if (_content != null && _content.IsSelected)
                    rtfref = new XmlElementSelected(rtfref).Initialize(_content);

                string attr_name = _content?.AttrList["name"], customName = name;
                if (NamedService.IsAggregate(attr_name).Aggregate)
                {
                    customName = attr_name;
                    rtfref.SetAttribute("name", attr_name);
                }
                else
                    rtfref.SetAttribute("name", name);

                if (parentField.InstanceType.Equals("FORMTEXT"))
                {
                    rtfref.SetAttribute("type", parentField.Type);
                    if (!string.IsNullOrEmpty(parentField.InstanceRtf))
                        rtfref.SetAttribute("rtf", parentField.InstanceRtf);
                    rtfref.SetAttribute("instance", _content != null ? _content.Instance : "FORMTEXT");
                }
                else
                {
                    if (!string.IsNullOrEmpty(parentField.InstanceRtf))
                        rtfref.SetAttribute("rtf", parentField.InstanceRtf);
                    rtfref.SetAttribute("instance", _content != null && _content.Instance != null && !"FORMTEXT".Equals(_content.Instance) ? _content.Instance : "MACROBUTTON");
                }

                // GUID vložíme pouze v případě, kdy objekt obsahuje dodatečné info nebo je typu TEXT
                if (SetAttributes(_content, rtfref) && !string.IsNullOrEmpty(fieldGuid) || _isText)
                    rtfref.SetAttribute("guid", fieldGuid);
            }
            return rtfref;
        }
        #endregion
    }
}
