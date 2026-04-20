//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ScriptPanel.cs                         </Name>
//    <Description> Panel skriptů                                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-18                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.TextEditor;
using Gordic.General;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.InfoSectionView;
using Gordic.GFE.WinClient.LinkedFiles;
using Gordic.GFE.WinClient.Services;
using System.IO;
using Gordic.GFE.WinClient.VariablesView;

namespace Gordic.GFE.WinClient.Gui.PropertyPanels
{
    /// <summary>
    /// Panel skriptů
    /// </summary>
    class ScriptPanel : AbstractPropertyPanel
    {
        #region AbstractPropertyPanel
        /// <summary>
        /// Získání nové hodnoty - PropertyGrid
        /// </summary>
        /// <returns>Nová hodnota</returns>
        public override object PropertyValue { get => currentScripts; }

        /// <summary>
        /// Reakce na tlačítko Výchozí hodnoty
        /// </summary>
        /// <returns>True - Nastavení provedené</returns>
        protected override void SetDefault()
        {
            currentScripts = new GFEScriptList();
            listBoxScripty.Items.Clear();
            try
            {
                if (Service != null)
                {
                    if (isGlobal)
                        try
                        {
                            Gordic.GFE.Parsers.Binding.CompilationUnit unit = CompilationService.Units[ParserService.GetActiveViewContent().PrimaryFile] as Gordic.GFE.Parsers.Binding.CompilationUnit;
                            if (unit != null && unit.FormationProperty != null)
                            {
                                int i = 1;
                                foreach (var item in unit.FormationProperty.GlobalScripts)
                                {
                                    listBoxScripty.Items.Add("onSkript_" + i.ToString());
                                    _changes.Add(false);
                                    currentScripts.Add("onSkript_" + i.ToString(), item);
                                    i++;
                                }
                            }
                            if (listBoxScripty.Items.Count == 0)
                            {
                                listBoxScripty.Items.Add("onSkript_1");
                                _changes.Add(false);
                                currentScripts.Add("onSkript_1", GResources.GetResourceText(29451506));
                            }
                        }
                        catch { }
                    else
                    {
                        // projdeme všechny vybrané položky a zjistíme jejích hodnoty
                        bool first = true;
                        foreach (object selecteditem in Service.SelectedComponents)
                            if (selecteditem is IScriptHandler)
                                if ((selecteditem as IScriptHandler).Scripts != null)
                                    // pokud je to první objekt, pak jeho vlastnosti nakopírujeme
                                    if (first)
                                    {
                                        first = false;
                                        foreach (var item in (selecteditem as IScriptHandler).Scripts)
                                        {
                                            listBoxScripty.Items.Add(item.Key);
                                            _changes.Add(false);
                                            currentScripts.Add(item.Key, item.Value);
                                        }
                                    }
                                    else
                                        foreach (var item in (selecteditem as IScriptHandler).Scripts)
                                            if (!listBoxScripty.Items.Contains(item.Key))
                                            {
                                                listBoxScripty.Items.Add(item.Key);
                                                _changes.Add(false);
                                                currentScripts.Add(item.Key, item.Value);
                                            }
                                            else if (item.Value != null && currentScripts[item.Key] != null)
                                                if (!currentScripts[item.Key].Equals(item.Value, StringComparison.InvariantCultureIgnoreCase))
                                                    currentScripts.SetValueDefault(item.Key, null);
                    }
                }
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " ScriptPanel:" + ex.Message); }

            if (listBoxScripty.Items.Count > 0)
            {
                int index = listBoxScripty.Items.IndexOf("onData");
                if (index == -1)
                    index = 0;

                listBoxScripty.SelectedIndex = index;
            }
        }
        /// <summary>
        /// Reakce na akceptace změn
        /// </summary>
        /// <returns>TRUE- změna provedená</returns>
        protected override bool Accept()
        {
            if (Service == null)
                return true;

            if (_changes.Count != 0 && _changes.Exists(itm => itm == true))
            {
                if (isGlobal)
                    try
                    {
                        Gordic.GFE.Parsers.Binding.CompilationUnit unit = CompilationService.Units[ParserService.GetActiveViewContent().PrimaryFile] as Gordic.GFE.Parsers.Binding.CompilationUnit;

                        if (unit != null && unit.FormationProperty != null)
                            for (int index = 0; index < currentScripts.Count; index++)
                                if (index < unit.FormationProperty.GlobalScripts.Count)
                                    unit.FormationProperty.GlobalScripts[index] = currentScripts[currentScripts[index]];
                                else unit.FormationProperty.GlobalScripts.Add(currentScripts[currentScripts[index]]);

                        if (ParserService.GetActiveViewContent() is IInfoSectionHost)
                            (ParserService.GetActiveViewContent() as IInfoSectionHost).OnInfoPropertyChanged(this, EventArgs.Empty);
                        unit.OpenedFile.MakeDirty();
                    }
                    catch { }
                else
                {
                    if (!UndoRedoService.IsTransactionStarted)
                        UndoRedoService.StartTransaction(GResources.GetResourceText(29450478)); //RC 29450478 : změna skriptů

                    foreach (object item in Service.SelectedComponents)
                        if (item is IScriptHandler)
                        {
                            for (int i = 0; i < _changes.Count; i++)
                                if (_changes[i])
                                    if ((item as IScriptHandler).Scripts.ContainsKey(currentScripts[i]))
                                        (item as IScriptHandler).Scripts[currentScripts[i]] = currentScripts[currentScripts[i]];

                            (item as IScriptHandler).Scripts.OnScriptChanged();
                        }
                }
            }
            return base.Accept();
        }

        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            try
            {
                SetupLocalizedXFRM(AssemblyName + ".Resources.forms.property.ScriptPanel.xfrm");
                listBoxScripty = (ListBox)ControlDictionary["listBoxScripty"];
                listBoxScripty.SelectedIndexChanged += new System.EventHandler(SelectedIndexChanged);
                textEditorControl = (TextEditorControl)ControlDictionary["textEditorControl"];
                textEditorControl.Leave += TxbLeave;
                textEditorControl.SetHighlighting("Python");
                textEditorControl.ActiveTextAreaControl.TextArea.DragDrop += EditorDragDrop;
                textEditorControl.ActiveTextAreaControl.TextArea.DragOver += EditorDragOver;

                ThreadService.SafeThreadAsyncCall(SetDefault);
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " ScriptPanel.xfrm:" + ex.Message); }
        }
        /// <summary>
        /// Podmínky viditelnosti daného panelu
        /// </summary>
        /// <returns>TRUE - podmínka je splněná</returns>
        public override bool VisibleCondition()
        {
            if (view == null)
                return base.VisibleCondition();

            // podmínka globálních skriptů
            if (Service.SelectedComponents.Exists(item => item is IGRRLabel && (item as IGRRLabel).DataName.Equals("ROOT", StringComparison.OrdinalIgnoreCase)))
            {
                isGlobal = true;
                return true;
            }
            return Service != null && Service.SelectedComponents.Exists(item => item is IScriptHandler && !(item is IGRRLabel));
        }
        #endregion

        ListBox listBoxScripty;
        TextEditorControl textEditorControl;

        //indikuje, že text sktiptu byl záměrně pozměněn
        List<bool> _changes = new List<bool>();

        GFEScriptList currentScripts;
        bool isGlobal = false;

        /// <exclude/>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                textEditorControl.ActiveTextAreaControl.TextArea.DragDrop -= EditorDragDrop;
                textEditorControl.ActiveTextAreaControl.TextArea.DragOver -= EditorDragOver;
            }

            base.Dispose(disposing);
        }

        void SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                textEditorControl.Text = listBoxScripty.SelectedItem != null ? currentScripts[currentScripts[listBoxScripty.SelectedIndex]] : string.Empty;
            }
            catch { textEditorControl.Text = string.Empty; }
            textEditorControl.Refresh();
        }
        void TxbLeave(object sender, EventArgs e)
        {
            if (listBoxScripty.SelectedItem != null)
            {
                _changes[listBoxScripty.SelectedIndex] =
                    (currentScripts[currentScripts[listBoxScripty.SelectedIndex]] ?? string.Empty) != textEditorControl.Text;
                currentScripts.SetValueDefault(currentScripts[listBoxScripty.SelectedIndex], textEditorControl.Text);
            }
            else
                textEditorControl.Text = string.Empty;
        }
        void EditorDragOver(object sender, DragEventArgs drgevent)
        {
            if (drgevent.Data.GetDataPresent(typeof(StructExtNode))
                || drgevent.Data.GetDataPresent(typeof(LFExtNode))
                || drgevent.Data.GetDataPresent(typeof(string))
                || drgevent.Data.GetDataPresent(typeof(VarExtNode)))
                drgevent.Effect = DragDropEffects.Copy;
        }
        void EditorDragDrop(object sender, DragEventArgs drgevent)
        {
            dynamic node;
            if (drgevent.Data.GetDataPresent(typeof(StructExtNode)))
            {
                node = (StructExtNode)drgevent.Data.GetData(typeof(StructExtNode));
                textEditorControl.ActiveTextAreaControl.TextArea.InsertString(LocalCommonService.GetText(node.FullName));
            }
            else if (drgevent.Data.GetDataPresent(typeof(LFExtNode)))
            {
                node = (LFExtNode)drgevent.Data.GetData(typeof(LFExtNode));
                textEditorControl.ActiveTextAreaControl.TextArea.InsertString(LocalCommonService.GetText(node.FullName, Path.DirectorySeparatorChar));
            }
            else if (drgevent.Data.GetDataPresent(typeof(string)))
                textEditorControl.ActiveTextAreaControl.TextArea.InsertString(LocalCommonService.GetText((((string)drgevent.Data.GetData(typeof(string))).Split(';').Last())));
            else if (drgevent.Data.GetDataPresent(typeof(VarExtNode)))
                textEditorControl.ActiveTextAreaControl.TextArea.InsertString(LocalCommonService.GetText(((VarExtNode)drgevent.Data.GetData(typeof(VarExtNode)))));
        }
    }
}
