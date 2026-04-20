//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.AbstractXmlOfficeViewContent.cs        </Name>
//    <Description> abstraktní třída office sestav                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-10                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Database;
using Gordic.GFE.WinClient.DefaultEditor;
using Gordic.GFE.WinClient.FileCommands;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.InfoSectionView;
using Gordic.GFE.WinClient.Service;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.StructureView;
using Gordic.GFE.WinClient.XmlEditor;
using Gordic.GFE.WinClient.XmlEditor.Gui.Editor;
using Gordic.TextEditor;
using Gordic.TextEditor.Document;
using Gordic.General;
using Gordic.GFE.WinClient.Editor;
using System.Xml;

namespace Gordic.GFE.WinClient.FormatOffice
{
    /// <summary>
    /// abstraktní třída office sestav
    /// </summary>
    class AXmlOfficeView : XmlView, IStructureHost, IInfoSectionHost, ICustomizedCommands, IValidatable
    {
        #region XmlView
        /// <exclude/>
        protected override void _OnFileNameChanged(OpenedFile file)
        {
            base._OnFileNameChanged(file);
            _RdEditor.Document.HighlightingStrategy = HighlightingManager.Manager.FindHighlighter(Language);
        }
        /// <exclude/>
        public override void Save(OpenedFile file, System.IO.Stream stream)
        {
            TextService.SetLastModif(_RdEditor.Document);
            InfoSectionViewPad.Instance.RefreshInfoSection(infoSectionEntry, file, _RdEditor.Document.TextContent);
            base.Save(file, stream);
        }
        /// <exclude/>
        public override bool SwitchFromThisWithoutSaveLoad(OpenedFile file, Parsers.Gui.IViewContent newView)
        {
            // aktualizujeme sekci INFO dle textového editoru
            InfoSectionViewPad.Instance.RefreshInfoSection(infoSectionEntry, file, _RdEditor.Document.TextContent);
            return base.SwitchFromThisWithoutSaveLoad(file, newView);
        }

        /// <summary>
        /// Získání textového ovladače
        /// </summary>
        /// <returns></returns>
        protected override TextEditorControl CreateTextAreaControl()
        {
            return new ReportDesignerTextAreaControl();
        }
        /// <summary>
        /// editor návrháře
        /// </summary>
        protected ReportDesignerTextAreaControl _RdEditor { get { return lXmlEditor as ReportDesignerTextAreaControl; } }
        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnění objektu</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                SimpleDesktop.Desktop.ActiveViewContentChanged -= SvpSelectedItemIndexChanged;
                StructureViewPad.Instance.SelectedItemIndexChanged -= SvpSelectedItemIndexChanged;
                if (LocalTextArea != null)
                {
                    LocalTextArea.DragDrop -= EditorDragDrop;
                    LocalTextArea.DragOver -= EditorDragOver;
                }
            }
            base.Dispose(disposing);
        }
        #endregion

        #region IStructureHost
        StructureViewEntry structureViewEntry;
        /// <summary>
        /// Struktura
        /// </summary>
        public StructureViewEntry StructureEntry { get { return structureViewEntry; } }
        #endregion

        #region IInfoSectionHost
        /// <summary>
        /// indikuje možnost editace infosekce
        /// </summary>
        public bool ISEnableEdit { get { return false; } }

        InfoSectionViewEntry infoSectionEntry;
        /// <summary>
        /// Struktura
        /// </summary>
        public InfoSectionViewEntry InfoSectionEntry { get { return infoSectionEntry; } }
        /// <summary>
        /// reakce na změnu vlastnosti položky INFO sekce
        /// </summary>
        /// <param name="sender">objekt, který spustil událost</param>
        /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
        public virtual void OnInfoPropertyChanged(object sender, EventArgs e) { }
        #endregion

        #region ICustomizedCommands
        /// <summary>
        /// Uložení sestavy
        /// </summary>
        /// <returns></returns>
        public bool SaveCommand()
        {
            if (!PrimaryFile.IsDatabase)
                return Save(new EventHandlerOpenedFileArgument(SaveFile.Save));
            else
                DatabaseService.ObservedSave();
            return true;
        }
        bool isSaveAs = false;
        /// <summary>
        /// Uložení sestavy
        /// </summary>
        /// <returns></returns>
        public bool SaveAsCommand()
        {
            PrimaryFile.IsDatabase = false;
            isSaveAs = true;
            try { return Save(new EventHandlerOpenedFileArgument(SaveFileAs.Save)); }
            finally { isSaveAs = false; }
        }
        bool Save(EventHandlerOpenedFileArgument eventHandler)
        {
            try
            {
                if (PrimaryFile.CancelSaving)
                    PrimaryFile.CancelSaving = false;

                CompilationUnit unit = (CompilationUnit)CompilationService.Units[PrimaryFile];

                if (SimpleDesktop.Desktop.ActiveViewContent != this && PrimaryFile.IsUntitled)
                {
                    unit.Compile(officeView);
                    if (unit.ErrorsDuringCompile)
                    {
                        MessageService.ShowError(GResources.GetResourceText(29450185)); //RC 29450185 : Sestavu nelze uložit - zkuste uložení z designéru!
                        return true;
                    }
                }
                else if (!unit.IsCompiled)
                    switch (this.CategoryName)
                    {
                        case "OXS":
                        case "MSE":
                            OfficeTemplateService.SetContentOfCopyDocument(unit);
                            break;
                        case "RTF":
                            RtfTemplateService.SetContentOfCopyDocument(unit);
                            break;
                        default:
                            break;
                    }

                string oldName = PrimaryFileName;

                if (!isSaveAs && Path.GetExtension(PrimaryFileName).Equals(".alf", StringComparison.InvariantCultureIgnoreCase))
                    PrimaryFile.FileName = _GetNewAlfxName();

                if (!PrimaryFile.CancelSaving)
                {
                    // po uložení textové části souboru
                    eventHandler.Invoke(PrimaryFile);

                    if (!PrimaryFile.CancelSaving)
                        // uložíme archiv - pomocné soubory kopírujeme
                        PrimaryFile.CopyArchive(oldName);

                    if (!PrimaryFile.CancelSaving && ReportDesignerProperties.Instance.AlfShowSaveMessage)
                        MessageService.ShowMessage(Path.GetFileName(PrimaryFileName), GResources.GetResourceText(29450025)); //RC 29450025 : Soubor uložen
                    else
                        StatusBarService.SetMessage(GResources.GetResourceText(29450025) + ": " + Path.GetFileName(PrimaryFileName)); //RC 29450025 : Soubor uložen
                }

                if (PrimaryFile.CancelSaving)
                {
                    MessageService.ShowWarning(GResources.GetResourceText(29450085)); //RC 29450085 : Operace uložení zrušená!
                    PrimaryFile.CancelSaving = false;
                }

                return true;
            }
            catch (ErrorFileNameException ex) { LoggingService.Error(ex); return true; }
            catch (Exception ex) { MessageService.ShowError(ex); }
            return false;
        }
        /// <summary>
        /// Uložení souboru do databáze
        /// </summary>
        /// <returns>TRUE, pokud operace je dostupná</returns>
        public bool SaveToDatabaseCommand(EventHandlerOpenedFileArgument eventHandler)
        {
            string oldName = PrimaryFileName;
            bool oldDB = PrimaryFile.IsDatabase;
            PrimaryFile.IsDatabase = true;
            if (Save(eventHandler))
            {
                PrimaryFile.FileName = oldName;
                return true;
            }
            else
            {
                PrimaryFile.IsDatabase = oldDB;
                return false;
            }
        }
        #endregion

        #region IMementoCapable
        /// <exclude/>
        public override Property CreateMemento()
        {
            // uložení typu sestavy
            RecentOpenFile file = Services.FileAgent.RecentOpen.RecentFileOrProject.FirstOrNull(rof => rof.Path.Equals(PrimaryFileName, StringComparison.InvariantCultureIgnoreCase));
            if (file != null)
                file.Set("formation", CategoryName);

            return base.CreateMemento();
        }
        #endregion

        #region IValidatable
        public virtual bool Validate() => true;
        #endregion

        /// <summary>
        /// pracovní oblast
        /// </summary>
        TextArea LocalTextArea => _RdEditor.ActiveTextAreaControl.TextArea;

        public ValidType Type { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string Message { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string Allowed { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string Disallowed { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string Ext { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string MinValue { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string MaxValue { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        /// <summary>
        /// proměnná pohledu office sestavy
        /// </summary>
        protected AOfficeViewContent officeView;
        /// <summary>
        /// instance třídy
        /// </summary>
        protected static AXmlOfficeView instance;

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        /// <param name="textEditorProperties">vlastnosti textového editoru</param>
        public virtual IViewContent Initialize(ITextEditorProperties textEditorProperties)
        {
            base.Initialize();
            instance = this;
            TabPageText = GResources.GetResourceText(29450086); //RC 29450086 : Zdrojový kód

            LocalTextArea.DragDrop += EditorDragDrop;
            LocalTextArea.DragOver += EditorDragOver;
            return this;
        }


        /// <summary>
        /// nastavení oken dle primárního souboru
        /// </summary>
        /// <param name="file">primární soubor</param>
        protected void SetPads(OpenedFile file)
        {
            StructureViewEntry.Create(ref structureViewEntry, file);
            InfoSectionViewEntry.Create(ref infoSectionEntry, file);

            CompilationService.InitializeUnit(file);
            if (!(CompilationService.Units[file] is CompilationUnit unit))
                unit = new CompilationUnit
                {
                    OpenedFile = file
                };

            unit.IsArchive = false;
            unit.UpdateContent(_RdEditor.Text);
            unit.StructureViewEntry = structureViewEntry;
            unit.InfoSectionEntry = infoSectionEntry;
            unit.Compiled += delegate
            {
                if (unit.XmlDocPosition != null)
                    this.ReplaceAll(unit.XmlDocPosition, officeView.Visible ? officeView.ServiceSelection : null);
                else if (!string.IsNullOrEmpty(unit.FileContent.Content))
                    this.ReplaceAll(unit.FileContent.Content);
                //if (!string.IsNullOrEmpty(CompilationService.Units[file].FileContent.Content))
                //    this.ReplaceAll(CompilationService.Units[file].FileContent.Content);
            };

            StructureViewPad.Instance.SelectedItemIndexChanged += SvpSelectedItemIndexChanged;
            SimpleDesktop.Desktop.ActiveViewContentChanged += SvpSelectedItemIndexChanged;
        }
        /// <summary>
        /// nastavení standardních sekundárních pohledů
        /// </summary>
        protected void SetStandardSecContent()
        {
            SecondaryViewContents.Add(officeView);
            lXmlTreeView = new XmlTreeView();
            lXmlTreeView.Initialize(this);
            SecondaryViewContents.Add(lXmlTreeView);
            lXmlTreeView.Visible = ReportDesignerProperties.Instance.TabVisibilityTree;
            officeView.Visible = ReportDesignerProperties.Instance.TabVisibilityDesign;
            Visible = ReportDesignerProperties.Instance.TabVisibilityCode;
        }

        void SvpSelectedItemIndexChanged(object sender, EventArgs e)
        {
            if (structureViewEntry == null)
                if (SimpleDesktop.Desktop.ActiveViewContent != null)
                    if (PrimaryFile == SimpleDesktop.Desktop.ActiveViewContent.PrimaryFile)
                    {
                        StructureViewEntry.Create(ref structureViewEntry, PrimaryFile);

                        CompilationUnit cu = CompilationService.Units[PrimaryFile] as CompilationUnit;
                        if (structureViewEntry != null && cu != null)
                            cu.StructureViewEntry = structureViewEntry;
                    }
        }
        protected override void EditorDragOver(object sender, DragEventArgs drgevent)
        {
            if (drgevent.Data.GetDataPresent(typeof(StructExtNode))
                || drgevent.Data.GetDataPresent(typeof(string)))
                drgevent.Effect = DragDropEffects.Copy;
        }
        protected override void EditorDragDrop(object sender, DragEventArgs drgevent)
        {
            if (drgevent.Data.GetDataPresent(typeof(StructExtNode)))
            {
                StructExtNode node = (StructExtNode)drgevent.Data.GetData(typeof(StructExtNode));
                LocalTextArea.InsertString(LocalCommonService.GetText(node.FullName));
            }
            else if (drgevent.Data.GetDataPresent(typeof(string)))
                LocalTextArea.InsertString(LocalCommonService.GetText(((string)drgevent.Data.GetData(typeof(string))).Split(';').Last()));
        }

        public XmlNode GetDataContent(XmlDocumentPosition xmlDoc, string namespaceUri)
        {
            throw new NotImplementedException();
        }
    }
}
