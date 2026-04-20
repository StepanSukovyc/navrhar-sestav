//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.TemplateService.cs                     </Name>
//    <Description> Sužba pro práci s RTF šablonou                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Services;
using Word = Microsoft.Office.Interop.Word;
using System.Reflection;
using System.Drawing;
using System.Windows.Forms;
using System.Runtime.InteropServices;
using System.ComponentModel.Design;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.FormatOffice;
using Gordic.Documents.Rtf;
using Gordic.GFE.Parsers.core;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Sužba pro práci s RTF šablonou
    /// </summary>
    static class RtfTemplateService
    {
        sealed class RtfWordDocumentItem : IOfficeDocumentItem, IDisposable
        {
            #region IOfficeDocumentItem
            /// <summary>
            /// Uvolní dokument office
            /// </summary>
            public void CloseDocument()
            {
                try
                {
                    FileUtility.FileSaved -= FileUtilityFileSaved;
                    if (isDirtyTimer != null)
                    {
                        isDirtyTimer.Stop();
                        isDirtyTimer.Dispose();
                        isDirtyTimer = null;
                    }

                    DocumentQuit();
                    ApplicationQuit();
                    ActivatorQuit();

                    GC.Collect();
                }
                catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450677) + "\r\n" + ex.Message); } //RC 29450677 : Chyba ukončení běhu instance WORD.
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
            ~RtfWordDocumentItem() { Dispose(false); }
            #endregion

            object activator;
            Timer isDirtyTimer;
            /// <summary>
            /// Instance aplikaci Office
            /// </summary>
            Word.Application oWordApp;
            readonly IOfficeDocumentView view;
            readonly List<Guid> lstGuids = new List<Guid>(), listOfGuids = new List<Guid>();
            readonly List<RtfContent> lstContents = new List<RtfContent>();

            int formFieldsCount, fieldsCount;
            bool isStopped = false;
            readonly object syncRoot = new object(), syncRefresh = new object();

            /// <summary>
            /// Handler s Range jako argument
            /// </summary>
            /// <param name="range">argument metody</param>
            delegate void EventHandlerRangeArgument(Word.Range range);

            /// <summary>
            /// úplný název šablony
            /// </summary>
            public string FileName { get; private set; }
            /// <summary>
            /// šablona dokumentu
            /// </summary>
            public Word.Document WordDocument { get; private set; }
            /// <summary>
            /// Instance dokumentu
            /// </summary>
            public IntPtr WordWnd { get; private set; } = IntPtr.Zero;

            /// <summary>
            /// vytvoření instance nové třídy
            /// </summary>
            /// <param name="tempFile">šablona souboru</param>
            /// <param name="pView">pohled na soubor</param>
            public RtfWordDocumentItem(string tempFile, IOfficeDocumentView pView)
            {
                this.FileName = tempFile;
                this.view = pView;
                CreateInstance();
                LoadWord();
            }

            /// <summary>
            /// zobrazení dokumentu
            /// </summary>
            /// <param name="intPtr"></param>
            /// <param name="bounds"></param>
            internal void ShowDocument(IntPtr intPtr, Rectangle bounds)
            {
                isStopped = false;

                formFieldsCount = 0;
                fieldsCount = 0;

                lock (syncRoot)
                {
                    if (WordWnd == IntPtr.Zero || oWordApp == null)
                        CreateInstance();
                    if (oWordApp != null)
                    {
                        var pp = NativeMethods.SetParent(WordWnd, intPtr);
                        if (pp == IntPtr.Zero) throw new System.ComponentModel.Win32Exception();

                        //zviditelníme
                        oWordApp.Visible = true;
                        // aplikace má VISIBLE == FALSE pokud neobsahuje žádný dokument
                        if (oWordApp.Visible)
                        {
                            oWordApp.Activate();

                            NativeMethods.SetWindowPos(WordWnd, intPtr, 0, 0, bounds.Width, bounds.Height, NativeMethods.SWP_NOZORDER | NativeMethods.SWP_NOMOVE | NativeMethods.SWP_DRAWFRAME | NativeMethods.SWP_NOSIZE);
                            NativeMethods.MoveWindow(WordWnd, 0, 0, bounds.Width, bounds.Height, true);
                            //TODO - nemělo by to tady být... ale jinak word se nenačte celý...
                            LoadWord();
                        }

                        // po změně sekce Selection u RTF sestav proběhne RefreshField, takže v daném případě buď nebo
                        if (OfficeService.ErrorStartOffset != -1 && OfficeService.ErrorEndOffset != -1)
                        {
                            WordDocument.ActiveWindow.Selection.Start = OfficeService.ErrorStartOffset;
                            WordDocument.ActiveWindow.Selection.End = OfficeService.ErrorEndOffset;
                            OfficeService.ErrorStartOffset = OfficeService.ErrorEndOffset = -1;
                            WordDocument.ActiveWindow.ScrollIntoView(WordDocument.ActiveWindow.Selection.Range, true);
                        }
                        else
                            // aktualizujeme políčka
                            RefreshFields();
                    }
                    else
                        MessageService.ShowError(GResources.GetResourceText(29451459));
                }
            }

            /// <summary>
            /// Zobrazení vlastnosti výběru
            /// </summary>
            internal void PrepareSelection()
            {
                if (!view.IsInsertSection)
                    ThreadService.SafeThreadLockCall(delegate
                    {
                        StatusBarService.SetMessage(GResources.GetResourceText(29450168) + "...");//RC 29450168 : aktualizace identifikátorů
                        try
                        {
                            if (!isStopped)
                                ClearServiceSelection();

                            // v případě nezamčeného dokumentu
                            if (!isStopped && WordDocument.ProtectionType == Word.WdProtectionType.wdNoProtection)
                                if (formFieldsCount != WordDocument.FormFields.Count
                                    || fieldsCount != WordDocument.Fields.Count)
                                {
                                    formFieldsCount = WordDocument.FormFields.Count;
                                    fieldsCount = WordDocument.Fields.Count;
                                    RefreshFields();
                                }

                            try
                            {
                                if (WordDocument != null)
                                    PrepareSelection(WordDocument.ActiveWindow.Selection.Range);
                            }
                            catch (Exception ex) { LoggingService.Error(ex); }
                        }
                        catch (Exception ex) { LoggingService.Error(ex); }

                        StatusBarService.SetMessage(GResources.GetResourceText(29450307)); //RC 29450307 : Připraven
                    }, syncRoot);
            }

            /// <summary>
            /// Získání textu pole RTF dokumentu
            /// </summary>
            /// <param name="item">Položka-pole RTF dokumentu</param>
            /// <returns></returns>
            string GetTextFromMSWField(Word.Field item)
            {
                try
                {
                    string result = string.Empty;
                    foreach (Word.Range chr_item in item.Code.Characters)
                        result += chr_item.Text;

                    if (result.IndexOf(" FORMTEXT") != -1)
                    {
                        result = string.Empty;
                        foreach (Word.Range chr_item in item.Result.Characters)
                            result += chr_item.Text;
                    }
                    return result;
                }
                catch (Exception ex)
                {
                    MessageService.ShowError(ex);
                    return string.Empty;
                }
            }

            /// <summary>
            /// získání dokumentu po počkání na odemčení
            /// </summary>
            /// <returns></returns>
            internal Word.Document GetDocument()
            {
                LoggingService.Debug(GResources.GetResourceText(29450167) + " GetDocument"); //RC 29450167 : metoda
                while (CommonService.IsLocked(syncRoot))
                    Application.DoEvents();

                return WordDocument;
            }

            void ClearServiceSelection()
            {
                view.ServiceSelection.Clear();
                ClearSelectedFields();
                isStopped = false;
            }
            void ClearSelectedFields()
            {
                if ((view.Document.FormationProperty as RtfFormationProperty).FieldsList != null)
                    foreach (var item in (view.Document.FormationProperty as RtfFormationProperty).FieldsList)
                        item.IsSelected = false;
            }
            void PrepareSelection(Word.Range range)
            {
                if ((view.Document.FormationProperty as RtfFormationProperty).Guids == null)
                    return;

                System.Collections.IEnumerator enumer = range.FormFields.GetEnumerator();
                while (enumer.MoveNext())
                {
                    if (isStopped)
                        return;

                    var field = enumer.Current as Word.FormField;
                    string lText = field.StatusText, b_guid = lText;
                    bool novy = false;
                    Guid guid = OfficeService.GetGuid(lText, ref novy, ref b_guid);
                    string[] l_asPoles = b_guid.Split(' ');
                    if (l_asPoles.Length > 1)
                    {
                        string l_sPole = l_asPoles[1];

                        // v případě, že tento objekt je nový 
                        // nebo ještě není v seznamu všech RTF objektů pak ho tam přidáme 
                        if (novy || !(view.Document.FormationProperty as RtfFormationProperty).Guids.Contains(guid))
                        {
                            RtfContent lst = new RtfContent() { Guid = guid, Name = l_sPole, COMObject = field, Start = field.Range.Start, End = field.Range.End };
                            (view.Document.FormationProperty as RtfFormationProperty).Guids.Add(lst.Guid);
                            (view.Document.FormationProperty as RtfFormationProperty).FieldsList.Add(lst);

                            // pokud nový, pak mu do vlastností přidáme jeho identifikátor
                            if (novy)
                                field.StatusText = lText + string.Format("[#{0}#]", guid.ToString());
                        }
                        SetSelection((view.Document.FormationProperty as RtfFormationProperty).FieldsList.FirstOrNull(itm => itm.Guid == guid), SelectionTypes.Add);
                    }
                }

                enumer = WordDocument.ActiveWindow.Selection.Fields.GetEnumerator();
                while (enumer.MoveNext())
                {
                    if (isStopped)
                        return;

                    var field = enumer.Current as Word.Field;
                    if (field.Type == Word.WdFieldType.wdFieldMacroButton)
                    {
                        GRTFField.GMBType buttonType = GRTFField.GMBType.unknown;
                        string lName = CommonService.GetFieldName(field.Code.Text, ref buttonType);

                        if (!string.IsNullOrEmpty(lName))
                        {
                            Guid guid = GetWithSetGuid(field, buttonType);
                            if (guid != Guid.Empty)
                            {
                                if (!(view.Document.FormationProperty as RtfFormationProperty).Guids.Contains(guid))
                                {
                                    string f_name = CommonService.GetNameMSWField(GetTextFromMSWField(field), true);
                                    // vytvoříme a inicializujeme RTF objekt
                                    RtfContent lst = new RtfContent() { Name = f_name, Guid = guid, MacroButtonType = buttonType, COMObject = field, Start = field.Code.Start, End = field.Code.End };
                                    (view.Document.FormationProperty as RtfFormationProperty).Guids.Add(lst.Guid);
                                    (view.Document.FormationProperty as RtfFormationProperty).FieldsList.Add(lst);
                                }
                                SetSelection((view.Document.FormationProperty as RtfFormationProperty).FieldsList.FirstOrNull(itm => itm.Guid == guid), SelectionTypes.Add);
                            }
                        }
                    }
                }
            }
            void SetSelection(RtfContent rtfContent, SelectionTypes selectionTypes)
            {
                if (rtfContent == null)
                    return;

                view.ServiceSelection.SetSelectedComponents(rtfContent, selectionTypes);
                switch (selectionTypes)
                {
                    case SelectionTypes.Add:
                        rtfContent.IsSelected = true;
                        break;
                    case SelectionTypes.Remove:
                        rtfContent.IsSelected = false;
                        return;
                    case SelectionTypes.Replace:
                        ClearSelectedFields();
                        rtfContent.IsSelected = true;
                        break;
                    default:
                        break;
                }
            }
            void AllFieldsMethod(EventHandlerRangeArgument eventHundler, Word.Sections sections)
            {
                if (eventHundler == null || sections == null)
                    return;

                // projdeme všechny sekce a v každé aktualizujeme poli
                System.Collections.IEnumerator enumer = sections.GetEnumerator();
                while (enumer.MoveNext())
                {
                    if (isStopped)
                        return;

                    Word.Section obj = (Word.Section)enumer.Current;
                    if (obj != null)
                    {
                        // hlavička dokumentu
                        System.Collections.IEnumerator headersFooters;
                        if (obj.Headers.Count != 0)
                        {
                            headersFooters = obj.Headers.GetEnumerator();
                            while (headersFooters.MoveNext())
                            {
                                if (isStopped)
                                    return;

                                Word.HeaderFooter hf = (Word.HeaderFooter)headersFooters.Current;
                                if (hf.Exists && hf.IsHeader && hf.Index == Word.WdHeaderFooterIndex.wdHeaderFooterFirstPage)
                                {
                                    eventHundler(hf.Range);
                                    if (isStopped)
                                        return;

                                    // projdeme všechny oblasti a u textových projdeme všechny položky
                                    System.Collections.IEnumerator shapes = hf.Shapes.GetEnumerator();
                                    while (shapes.MoveNext())
                                    {
                                        if (isStopped)
                                            return;

                                        Word.Shape shp = shapes.Current as Word.Shape;

                                        if (shp.Type == Microsoft.Office.Core.MsoShapeType.msoTextBox)
                                            eventHundler(shp.TextFrame.TextRange);

                                        if (isStopped)
                                            return;
                                    }
                                }
                            }
                        }

                        // tělo dokumentu
                        eventHundler(obj.Range);

                        if (isStopped)
                            return;

                        if (obj.Footers != null && obj.Footers.Count != 0)
                        {
                            //patička dokumentu
                            headersFooters = obj.Footers.GetEnumerator();
                            while (headersFooters.MoveNext())
                            {
                                if (isStopped)
                                    return;

                                Word.HeaderFooter hf = (Word.HeaderFooter)headersFooters.Current;
                                if (hf.Exists
                                    && hf.Index == Word.WdHeaderFooterIndex.wdHeaderFooterEvenPages
                                    && !hf.IsHeader)
                                    eventHundler(hf.Range);

                                if (isStopped)
                                    return;
                            }
                        }
                    }
                }
            }
            /// <summary>
            /// Zneviditelnění tlačítek zavření instance Word dokumentu
            /// </summary>
            void HideTitleBar()
            {
                try
                {
                    /*
                GFEModuleForm.Instance.GMT.ActiveViewControl.GfeCon.WordVersion = WordVersion;*/
                    //Zjistíme verzi Wordu
                    //if (float.Parse(WordVersion.Replace('.', ',')) < 12)
                    NativeMethods.SetWindowLong(WordWnd, NativeMethods.GWL_STYLE, (int)NativeMethods.WS_MAXIMIZE);
                }
                catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450676) + "\r\n" + ex.Message); }
                ; //RC 29450676 : Chyba funkce zneviditelnění tlačítek zavření instance Word dokumentu.
            }
            void CreateInstance()
            {
                CloseDocument();
                OpenAppInstance();
                FileUtility.FileSaved += FileUtilityFileSaved;
                if (oWordApp != null)
                {
                    oWordApp.WindowSelectionChange += OWordAppWindowSelectionChange;
                    if (WordDocument != null)
                    {
                        System.Threading.Tasks.Task.Factory.StartNew(() => LocalCommonService.UpdateDocumentByList(WordDocument, (view.Document.FormationProperty as RtfFormationProperty).FieldsList.ToList(), (view.Document.FormationProperty as RtfFormationProperty).Guids));
                        if (WordDocument.FormsDesign)
                            WordDocument.ToggleFormsDesign();
                    }
                }
                // znemožníme zavření Word dokumentu pomocí křížku
                HideTitleBar();
            }
            void ActivatorQuit()
            {

                if (activator != null)
                    try
                    {
                        LoggingService.Info("Activator quit word instance");
                        activator.GetType().InvokeMember("Quit", BindingFlags.InvokeMethod, null, activator, null);
                    }
                    catch { }
                try
                {
                    if (oWordApp != null)
                        Marshal.ReleaseComObject(oWordApp);
                    if (activator != null)
                        Marshal.ReleaseComObject(activator);
                }
                catch { }
                finally
                {
                    oWordApp = null;
                    activator = null;
                }
            }
            void ApplicationQuit()
            {
                if (oWordApp != null)
                    try
                    {
                        LoggingService.Debug("ApplicationQuit");
                        oWordApp.WindowSelectionChange -= OWordAppWindowSelectionChange;
                        if (oWordApp.Documents.Count != 0)
                            oWordApp.Documents.Close();
                    }
                    catch { }
            }
            void DocumentQuit()
            {
                lock (syncRoot)
                {
                    // pokud žádný dokument nemáme, pak není co řešit
                    if (WordDocument != null)
                    {
                        LoggingService.Debug("DocumentQuit");
                        object doNotSaveChanges = Word.WdSaveOptions.wdDoNotSaveChanges;
                        object originalFormat = Word.WdOriginalFormat.wdOriginalDocumentFormat;
                        object routeDocument = false;

                        try
                        {
                            if (SimpleDesktop.Desktop.ActiveViewContent is AOfficeViewContent)
                                if (WordDocument != null)
                                    (WordDocument as Word.DocumentClass).Close(ref doNotSaveChanges, ref originalFormat, ref routeDocument);
                        }
                        catch { }
                        WordWnd = IntPtr.Zero;
                        try
                        {
                            if (WordDocument != null)
                                Marshal.ReleaseComObject(WordDocument);
                        }
                        catch { }
                        finally { WordDocument = null; }
                    }
                }
            }
            void OpenAppInstance()
            {
                LoggingService.Info("Activator starting Word instance");
                try
                {
                    Type tp;
                    tp = Type.GetTypeFromProgID("Word.Application");
                    if (tp == null) throw new Exception("nenalezena instalace Word");
                    activator = Activator.CreateInstance(tp);

                    //získání reference na Word.Application z ROT.
                    oWordApp = (Word.Application)activator;

                    if (WordWnd == IntPtr.Zero && oWordApp != null)
                    {
                        oWordApp.Caption = "***GFE" + Guid.NewGuid().ToString() + "***";
                        WordWnd = NativeMethods.FindWindow(default, oWordApp.Caption);
                        oWordApp.Caption = string.Empty;
                    }
                }
                catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450678) + "\r\n" + ex.Message); } //RC 29450678 : Chyba otevření instance WORD.
            }

            /// <summary>
            /// Pokud během prací s dokumentem došlo k několikanásobnému kopírování a vložení některých políček, 
            /// pak tato metoda zaktualizuje tabulku políček a Guid.
            /// </summary>
            void RefreshFields()
            {
                try
                {
                    lstGuids.Clear();
                    lstContents.Clear();
                    listOfGuids.Clear();

                    if (WordDocument != null)
                        AllFieldsMethod(RefreshFields, WordDocument.Sections);

                    LinkContents();
                    UpdateLists();
                }
                catch (Exception ex)
                {
                    // stači Logování...chyba není podstatná
                    LoggingService.Error(ex.Message, ex);
                }
            }
            void UpdateLists()
            {
                dynamic list = lstGuids.FindAll(itm => !(view.Document.FormationProperty as RtfFormationProperty).Guids.Contains(itm));
                if (list != null)
                    foreach (var item in list)
                        (view.Document.FormationProperty as RtfFormationProperty).Guids.Add(item);

                foreach (var item in lstContents)
                {
                    var subItem = (view.Document.FormationProperty as RtfFormationProperty).FieldsList.FirstOrNull(itm => itm.Guid == item.Guid);
                    if (subItem != null)
                    {
                        int index = (view.Document.FormationProperty as RtfFormationProperty).FieldsList.IndexOf(subItem);
                        (view.Document.FormationProperty as RtfFormationProperty).FieldsList[index] = item;
                    }
                    else
                        (view.Document.FormationProperty as RtfFormationProperty).FieldsList.Add(item);
                }
            }
            void LinkContents()
            {
                List<RtfContent> conts = (view.Document.FormationProperty as RtfFormationProperty).FieldsList.Select(fld => fld.COMObject == null ? fld : null).Distinct().ToList().FindAll(fld => fld != null);
                if (conts.Count != 0)
                    foreach (var item in conts)
                    {
                        List<RtfContent> lContsFromContents = lstContents.Select(fld => fld.Name.Equals(item.Name) ? fld : null).Distinct().ToList().FindAll(fld => fld != null);
                        if (lContsFromContents.Count == 1)
                        {
                            lContsFromContents[0].Scripts = new GFEScriptList(item.Scripts);
                            lContsFromContents[0].Format = item.Format;
                        }
                        else if (lContsFromContents.Count > 1)
                        {
                            List<RtfContent> lContsFromField = (view.Document.FormationProperty as RtfFormationProperty).FieldsList.Select(fld => fld.Name != null && fld.Name.Equals(item.Name) ? fld : null).Distinct().ToList().FindAll(fld => fld != null);
                            if (lContsFromField.Count != 0)
                            {
                                int index = lContsFromField.IndexOf(item);
                                if (index != -1 && index < lContsFromContents.Count)
                                {
                                    lContsFromContents[index].Scripts = new GFEScriptList(item.Scripts);
                                    lContsFromContents[index].Format = item.Format;
                                }
                            }
                        }
                    }
            }
            /// <summary>
            /// aktualizace seznamu jednoznačných identifikátorů dle dané oblasti
            /// </summary>
            /// <param name="range">oblast zkoumání</param>
            void RefreshFields(Word.Range range)
            {
                if (isStopped)
                    return;
                if (range.Fields.Count != 0 || range.FormFields.Count != 0)
                {
                    List<int> positions = new List<int>();
                    List<RtfContent> contents = new List<RtfContent>();

                    System.Collections.IEnumerator fld;
                    if (range.Fields.Count != 0)
                    {
                        fld = range.Fields.GetEnumerator();
                        while (fld.MoveNext())
                        {
                            Application.DoEvents();
                            if (isStopped)
                                return;

                            var field = fld.Current as Word.Field;
                            if (field.Type == Word.WdFieldType.wdFieldMacroButton)
                            {
                                GRTFField.GMBType buttonType = GRTFField.GMBType.unknown;
                                string _name = CommonService.GetFieldName(field.Code.Text, ref buttonType);

                                if (!string.IsNullOrEmpty(_name))
                                {
                                    Guid guid = GetWithSetGuid(field as Word.Field, buttonType);
                                    if (guid != Guid.Empty)
                                    {
                                        RtfContent lFirst = (view.Document.FormationProperty as RtfFormationProperty).FieldsList.FirstOrNull(itm => itm.Guid == guid)
                                            ?? (view.Document.FormationProperty as RtfFormationProperty).FieldsList.FirstOrNull(itm => itm.Guid == Guid.Empty && _name.Equals(itm.Name));
                                        if (lFirst != null)
                                        {
                                            if (lFirst.Guid == Guid.Empty)
                                                lFirst.Guid = guid;

                                            if (lFirst.COMObject == null)
                                                lFirst.COMObject = field;

                                            if (listOfGuids.Contains(guid))
                                            {
                                                Guid n_guid = Guid.NewGuid();
                                                //Změníme GUID
                                                CommonService.ReplaceGuid(field, guid, n_guid);

                                                //Vytvoříme RTF objekt a nakopírujeme do něj vlastnosti
                                                RtfContent lst = new RtfContent()
                                                {
                                                    Guid = n_guid,
                                                    Name = _name,
                                                    MacroButtonType = buttonType,
                                                    COMObject = field,
                                                    Start = field.Code.Start,
                                                    End = field.Code.End
                                                };
                                                lst.Copy(lFirst);

                                                contents.Add(lst);
                                                // přidáme guid již použitého objektu
                                                positions.Add(field.Code.Start);
                                                listOfGuids.Add(guid);
                                            }
                                            else
                                            {
                                                listOfGuids.Add(guid);
                                                positions.Add(field.Code.Start);
                                                lFirst.Start = field.Code.Start;
                                                lFirst.End = field.Code.End;
                                                contents.Add(lFirst);
                                            }
                                        }
                                        // nebo objekt taky nemusí existovat v seznamu všech objektů ...
                                        else
                                        {
                                            //...pak ho tam přidáme
                                            // vytvoříme a inicializujeme RTF objekt  
                                            RtfContent lst = new RtfContent()
                                            {
                                                Guid = guid,
                                                Name = _name,
                                                MacroButtonType = buttonType,
                                                COMObject = field,
                                                Start = field.Code.Start,
                                                End = field.Code.End
                                            };
                                            if (!string.IsNullOrEmpty(lst.Name))
                                            {
                                                positions.Add(field.Code.Start);
                                                contents.Add(lst);
                                            }
                                        }
                                    }
                                    else
                                    // "pamatování" si atributů regionů SS. 20. 10. 2015
                                    {
                                        Guid n_guid = Guid.NewGuid();
                                        field.Code.Rows.First.ID = n_guid.ToString();

                                        //Vytvoříme a inicializujeme RTF objekt  
                                        RtfContent lst = new RtfContent()
                                        {
                                            Guid = n_guid,
                                            Name = _name,
                                            MacroButtonType = buttonType,
                                            COMObject = field,
                                            Start = field.Code.Start,
                                            End = field.Code.End
                                        };

                                        if (!string.IsNullOrEmpty(lst.Name))
                                        {
                                            int start = positions.FirstOrNull(itm => itm > field.Code.Start);
                                            if (start == 0)
                                            {
                                                positions.Add(field.Code.Start);
                                                contents.Add(lst);
                                            }
                                            else
                                            {
                                                int index = positions.IndexOf(start);
                                                positions.Insert(index, field.Code.Start);
                                                contents.Insert(index, lst);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (range.FormFields.Count != 0)
                    {
                        fld = range.FormFields.GetEnumerator();
                        while (fld.MoveNext())
                        {
                            System.Windows.Forms.Application.DoEvents();
                            if (isStopped)
                                return;

                            Word.FormField wrdFrmField = fld.Current as Word.FormField;
                            GRTFField ffield = new GRTFField(wrdFrmField.StatusText);
                            if (ffield != null)
                            {
                                Guid guid = Guid.Empty;
                                string lName = ffield.MSWName;
                                //Pokud v dokumentu existuje více objektů se stejným identifikátorem, 
                                //pak je zapotřebí pozměnit identifikátory všech objektů
                                if (Guid.TryParse(ffield.MSWGuid, out guid)
                                    && guid != Guid.Empty)
                                {
                                    RtfContent lFirst = (view.Document.FormationProperty as RtfFormationProperty).FieldsList.FirstOrNull(itm => itm.Guid == guid);
                                    string shortName = lName?.Split('.').Last();
                                    if (lFirst == null)
                                        lFirst = (view.Document.FormationProperty as RtfFormationProperty).FieldsList.FirstOrNull(itm => itm.Guid == Guid.Empty && itm.Name != null && (itm.Name.Equals(lName) || itm.Name.Equals(shortName)));

                                    if (lFirst != null)
                                    {
                                        if (lFirst.Guid == Guid.Empty)
                                            lFirst.Guid = guid;

                                        if (!string.IsNullOrEmpty(lName))
                                        {
                                            if (lFirst.COMObject == null)
                                                lFirst.COMObject = wrdFrmField;

                                            if (listOfGuids.Contains(guid))
                                            {
                                                Guid n_guid = Guid.NewGuid();
                                                //Změníme GUID
                                                wrdFrmField.StatusText = string.Format("MSWField: {0}[#{1}#]", ffield.MSWName, n_guid.ToString());
                                                //wrdFrmField.StatusText = CommonService.ReplaceGuid(wrdFrmField.StatusText, ref n_guid);

                                                //Vytvoříme RTF objekt a nakopírujeme do něj vlastnosti
                                                RtfContent lst = new RtfContent()
                                                {
                                                    Guid = n_guid,
                                                    Name = lName,
                                                    COMObject = wrdFrmField,
                                                    Start = wrdFrmField.Range.Start,
                                                    End = wrdFrmField.Range.End
                                                };
                                                lst.Copy(lFirst);

                                                // přidáme guid již použitého objektu
                                                listOfGuids.Add(lst.Guid);
                                                contents.Add(lst);
                                                positions.Add(wrdFrmField.Range.Start);
                                            }
                                            else
                                            {
                                                listOfGuids.Add(guid);
                                                int start = positions.FirstOrNull(itm => itm > wrdFrmField.Range.Start);
                                                lFirst.Start = wrdFrmField.Range.Start;
                                                lFirst.End = wrdFrmField.Range.End;

                                                if (start == 0)
                                                {
                                                    positions.Add(wrdFrmField.Range.Start);
                                                    contents.Add(lFirst);
                                                }
                                                else
                                                {
                                                    int index = positions.IndexOf(start);
                                                    positions.Insert(index, wrdFrmField.Range.Start);
                                                    contents.Insert(index, lFirst);
                                                }
                                            }
                                        }
                                        else
                                            (view.Document.FormationProperty as RtfFormationProperty).Guids.Remove(guid);
                                    }
                                    // nebo objekt taky nemusí existovat v seznamu všech objektů ...
                                    else
                                    {
                                        //...pak ho tam přidáme
                                        // vytvoříme a inicializujeme RTF objekt  
                                        RtfContent lst = new RtfContent()
                                        {
                                            Guid = guid,
                                            Name = lName,
                                            COMObject = wrdFrmField,
                                            Start = wrdFrmField.Range.Start,
                                            End = wrdFrmField.Range.End
                                        };
                                        if (!string.IsNullOrEmpty(lst.Name))
                                        {
                                            int start = positions.FirstOrNull(itm => itm > wrdFrmField.Range.Start);
                                            if (start == 0)
                                            {
                                                positions.Add(wrdFrmField.Range.Start);
                                                contents.Add(lst);
                                            }
                                            else
                                            {
                                                int index = positions.IndexOf(start);
                                                positions.Insert(index, wrdFrmField.Range.Start);
                                                contents.Insert(index, lst);
                                            }
                                        }
                                    }
                                }
                                //Resp. Objekt nemá zatím GUID
                                else if (guid == Guid.Empty && wrdFrmField.StatusText.StartsWith("MSWField"))
                                {
                                    //...pak ho tam přidáme
                                    Guid n_guid = Guid.NewGuid();
                                    wrdFrmField.StatusText = string.Format("MSWField: {0}[#{1}#]", ffield.MSWName, n_guid.ToString());

                                    //Vytvoříme a inicializujeme RTF objekt  
                                    RtfContent lst = new RtfContent()
                                    {
                                        Guid = n_guid,
                                        Name = lName,
                                        COMObject = wrdFrmField,
                                        Start = wrdFrmField.Range.Start,
                                        End = wrdFrmField.Range.End
                                    };

                                    if (!string.IsNullOrEmpty(lst.Name))
                                    {
                                        int start = positions.FirstOrNull(itm => itm > wrdFrmField.Range.Start);
                                        if (start == 0)
                                        {
                                            positions.Add(wrdFrmField.Range.Start);
                                            contents.Add(lst);
                                        }
                                        else
                                        {
                                            int index = positions.IndexOf(start);
                                            positions.Insert(index, wrdFrmField.Range.Start);
                                            contents.Insert(index, lst);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (positions.Count != 0)
                        foreach (var item in contents)
                        {
                            lstGuids.Add(item.Guid);
                            lstContents.Add(item);
                        }

                    WordDocument.Content.Fields.Update();
                }
            }
            void OWordAppWindowSelectionChange(Word.Selection Sel)
            {
                if (Sel != null && Sel.Fields != null && Sel.Fields.Count > 0)
                    ThreadService.SafeThreadAsyncCall(SelectionChanged, syncRoot);
            }
            void SelectionChanged()
            {
                OleMessageFilter.Register();
                if (oWordApp != null)
                {
                    oWordApp.ScreenRefresh();

                    if (!(view.Content.Control as Control).Focused)
                    {
                        NativeMethods.SetForegroundWindow(WordWnd);
                        view.Content.DesktopWindow.SelectWindow();
                    }
                    PrepareSelection();
                }
                OleMessageFilter.Revoke();
            }

            void FileUtilityFileSaved(object sender, FileNameEventArgs e)
            {
                if (isDirtyTimer != null && view != null && view.PrimaryFile != null && e.FileName.Equals(view.PrimaryFile.FileName, StringComparison.InvariantCultureIgnoreCase))
                    isDirtyTimer.Start();
            }
            void LoadWord()
            {
                //oWordApp může být NULL, pokud se nepovedlo vůbec zavést Word
                OleMessageFilter.Register();
                if (WordDocument == null || WordDocument != oWordApp?.ActiveDocument)
                {
                    var level = oWordApp?.DisplayAlerts;
                    try
                    {

                        LoggingService.Debug(GResources.GetResourceText(29450169)); //RC 29450169 : načtení WORD dokumentu
                        if (oWordApp != null)
                            lock (syncRoot)
                            {
                                oWordApp.DisplayAlerts = Word.WdAlertLevel.wdAlertsNone;
                                // opětovné přepnutí na záložku kóde
                                if (view != null && view.PrimaryFile != null)
                                {
                                    if (CompilationService.Units[view.PrimaryFile] is CompilationUnit unit)
                                    {
                                        if (string.IsNullOrEmpty(unit.TemplateFile))
                                            unit.TemplateFile = Path.Combine(unit.OpenedFile.TemporaryDirectory.Path, unit.GetAttributeValue("//alf:template", "filename"));
                                        FileName = unit.TemplateFile;
                                    }
                                }

                                object oTemplatePath = FileUtility.TestFileExists(FileName) ? FileName : Gordic.GFE.Parsers.CommonService.MISSVALUE;
                                LoggingService.Debug(GResources.GetResourceText(29450173) + " " + Convert.ToString(oTemplatePath));
                                Word.Documents documents = (Word.Documents)oWordApp.GetType().InvokeMember("Documents", BindingFlags.GetProperty, null, oWordApp, null);
                                try
                                {
                                    if (oTemplatePath == CommonService.MISSVALUE)
                                        try
                                        {
                                            LoggingService.Debug(GResources.GetResourceText(29450170)); //RC 29450170 : případ nové sestavy
                                            documents.Add(ref oTemplatePath, CommonService.FALSE
                                                , CommonService.MISSVALUE, CommonService.MISSVALUE);
                                        }
                                        catch (Exception ex) { LoggingService.Error(string.Format(GResources.GetResourceText(29450171) + " '{0}'!\n{1}", Convert.ToString(oTemplatePath), ex.Message)); } //RC 29450171 : chyba II načtení šablony
                                    else
                                        try
                                        {
                                            LoggingService.Info(GResources.GetResourceText(29450172)); //RC 29450172 : případ, když název šablony je uveden a zároveň šablona fyzicky existuje
                                            LoggingService.Info(string.Join(" ", GResources.GetResourceText(29450173), oTemplatePath)); //RC 29450173 : šablona
                                                                                                                                        // pokud je uveden název šablony a zároveň šablona fyzicky existuje, pak ji použijeme
                                            documents.Open(ref oTemplatePath, CommonService.MISSVALUE
                                                , CommonService.MISSVALUE, CommonService.MISSVALUE
                                                , CommonService.MISSVALUE, CommonService.MISSVALUE
                                                , CommonService.MISSVALUE, CommonService.MISSVALUE
                                                , CommonService.MISSVALUE, CommonService.MISSVALUE
                                                , CommonService.MISSVALUE, CommonService.MISSVALUE);
                                        }
                                        catch (Exception ex)
                                        {
                                            LoggingService.Error(string.Format(GResources.GetResourceText(29450174) + " '{0}'!\n{1}", FileName, ex.Message)); //RC 29450174 : chyba I načtení šablony
                                        }

                                    WordDocument = oWordApp.ActiveDocument;
                                    if (WordDocument == null)
                                    {
                                        MessageService.ShowError(GResources.GetResourceText(29450175)); //RC 29450175 : Dokument není WORD!
                                        return;
                                    }
                                    else
                                    {
                                        WordDocument.ActiveWindow.Visible = true;

                                        if (oTemplatePath == CommonService.MISSVALUE)
                                        // případ nové sestavy
                                        {
                                            oTemplatePath = FileName;
                                            LoggingService.Info(GResources.GetResourceText(29450176)); //RC 29450176 : uložení sestavy - případ nové sestavy
                                            WordDocument.SaveAs(ref oTemplatePath, Word.WdSaveFormat.wdFormatRTF, CommonService.MISSVALUE
                                                                , CommonService.MISSVALUE, CommonService.FALSE
                                                                , CommonService.MISSVALUE, CommonService.MISSVALUE
                                                                , CommonService.MISSVALUE, CommonService.MISSVALUE
                                                                , CommonService.MISSVALUE, CommonService.MISSVALUE);
                                        }
                                    }
                                }
                                catch (Exception ex) { LoggingService.Error(string.Format(GResources.GetResourceText(29450177) + " '{0}'!\n{1}", FileName, ex.Message)); } //RC 29450177 : chyba III načtení šablony
                                finally
                                {
                                    LoggingService.Debug(GResources.GetResourceText(29450178)); //RC 29450178 : uvolnění objektů
                                    try
                                    {
                                        Marshal.ReleaseComObject(documents);
                                    }
                                    catch { }
                                    finally { documents = null; }
                                }
                            }

                        if (WordDocument != null)
                        {
                            if (isDirtyTimer == null)
                            {
                                isDirtyTimer = new Timer();
                                isDirtyTimer.Tick += delegate { CheckDocument(WordDocument); };

                                isDirtyTimer.Interval = 500;
                            }
                            LoggingService.Debug(GResources.GetResourceText(29450179)); //RC 29450179 : start časovače změny dokumentu
                            isDirtyTimer.Start();
                        }
                        else
                            isDirtyTimer?.Stop();
                        LoggingService.Debug(GResources.GetResourceText(29450180)); //RC 29450180 : konec načtení WORD dokumentu
                    }
                    catch { }
                    finally
                    {
                        if (level.HasValue) oWordApp.DisplayAlerts = level.Value;
                    }
                }
                OleMessageFilter.Revoke();
            }
            void CheckDocument(Word.Document doc)
            {
                //lock (wordDocument)
                lock (syncRoot)
                {
                    if (doc == null)
                        isDirtyTimer.Stop();
                    else
                        try
                        {
                            IPersistFile persistFile = (IPersistFile)doc;
                            if (persistFile != null && persistFile.IsDirty() == 0 && view != null)
                            {
                                view.IsDirty = true;
                                isDirtyTimer.Stop();
                            }
                        }
                        catch (InvalidCastException ex)
                        {
                            isDirtyTimer.Stop();
                            MessageService.ShowError(ex);
                            if (view != null
                                && view.PrimaryFile != null
                                && view.PrimaryFile.CurrentView != null
                                && view.PrimaryFile.CurrentView.DesktopWindow != null)
                                view.PrimaryFile.CurrentView.DesktopWindow.CloseWindow(true);
                        }
                }
            }

            /// <summary>
            /// zastavení vláken
            /// </summary>
            internal void StopThreads() { isStopped = true; }
            /// <summary>
            /// uzavření instance WORD dokumentu
            /// </summary>
            internal void CloseInstance()
            {
                DocumentQuit();
                if (oWordApp == null || oWordApp.Documents.Count == 0)
                {
                    ApplicationQuit();
                    ActivatorQuit();
                }
            }
        }

        static readonly OfficeDocumentDictionary<RtfWordDocumentItem> documents = new OfficeDocumentDictionary<RtfWordDocumentItem>();

        /// <summary>
        /// indikuje, provedení akce tažení objektu na dokument
        /// </summary>
        public static bool ItemDragged = false;

        /// <summary>
        /// Získání nebo vytvoření šablony rtf dokumentu
        /// </summary>
        /// <param name="view">pohled na dokument</param>
        internal static bool GetOrCreateTemplateFile(IOfficeDocumentView view)
        {
            if (view.PrimaryFile == null)
                return false;

            CompilationUnit cu = CompilationService.Units[view.PrimaryFile] as CompilationUnit;
            string templateName = cu.GetAttributeValue("//alf:template", "filename");

            if (!documents.ContainsKey(view.PrimaryFile)
                || !Path.GetFileName(documents[view.PrimaryFile].FileName).Equals(templateName))
            {
                // změna názvu šablony v textu
                if (documents.ContainsKey(view.PrimaryFile))
                {
                    documents.Remove(view.PrimaryFile);
                    cu.TemplateFile = null;
                }
                // indikuje, že soubor teprve vytvořen
                if (view.PrimaryFile.IsUntitled)
                {
                    //string tempFile = Path.Combine((new GFETempDir()).Path, templateName);
                    string tempFile = Path.Combine(view.PrimaryFile.TemporaryDirectory.Path, templateName);
                    if (!string.IsNullOrEmpty(DataService.TemplateFileName)
                        && FileUtility.TestFileExists(DataService.TemplateFileName))
                        File.Copy(DataService.TemplateFileName, tempFile);

                    documents.Add(view.PrimaryFile, new RtfWordDocumentItem(tempFile, view));
                }
                else
                    foreach (var iFile in view.PrimaryFile.TemporaryDirectory.GetFiles())
                        if (iFile.Name.Equals(templateName))
                            documents.Add(view.PrimaryFile, new RtfWordDocumentItem(iFile.FullName, view));
            }

            return documents.ContainsKey(view.PrimaryFile);
        }

        /// <summary>
        /// Odstranění šablony ze seznamu šablon.
        /// Ukončení instance Word.
        /// </summary>
        /// <param name="primaryFile">Primární soubor, šablonu kterého je zapotřebí ukončit</param>
        internal static void RemoveTemplate(OpenedFile primaryFile)
        {
            if (primaryFile != null && documents.ContainsKey(primaryFile))
                documents.Remove(primaryFile);
        }

        /// <summary>
        /// Položka RTF dokumentu
        /// </summary>
        /// <param name="openedFile">Otevřený soubor</param>
        /// <returns></returns>
        internal static Word.Document GetDocument(OpenedFile openedFile)
        {
            LoggingService.Debug(GResources.GetResourceText(29450182)); //RC 29450182 : získání dokumentu WORD
            LoggingService.Debug(GResources.GetResourceText(29450183) + ' ' + openedFile != null ? openedFile.FileName : null); //RC 29450183 : otevřený soubor

            return openedFile != null && documents.ContainsKey(openedFile) ? documents[openedFile].GetDocument() : null;
        }
        /// <summary>
        /// opětovné otevření documentu
        /// </summary>
        /// <param name="openedFile">otevřený soubor documentu</param>
        /// <param name="intPtr"></param>
        /// <param name="rectangle"></param>
        internal static void ReopenDocument(OpenedFile openedFile, IntPtr intPtr, Rectangle rectangle)
        {
            if (openedFile != null && documents.ContainsKey(openedFile))
                documents[openedFile].ShowDocument(intPtr, rectangle);
        }

        /// <summary>
        /// Položka RTF dokumentu
        /// </summary>
        /// <param name="openedFile">Otevřený soubor</param>
        /// <returns></returns>
        internal static IntPtr GetWordWnd(OpenedFile openedFile) => openedFile != null && documents.ContainsKey(openedFile) ? documents[openedFile].WordWnd : IntPtr.Zero;

        /// <summary>
        /// Zobrazení dokumentu v prohlížeči
        /// </summary>
        /// <param name="intPtr">Vlastník dokumentu</param>
        /// <param name="openedFile">Otevřený soubor s informaci o dokumentu</param>
        /// <param name="bounds">Informace o rozměru dokumentu</param>
        internal static void ShowDocument(IntPtr intPtr, OpenedFile openedFile, System.Drawing.Rectangle bounds)
        {
            if (openedFile != null && documents.ContainsKey(openedFile))
                documents[openedFile].ShowDocument(intPtr, bounds);
        }

        /// <summary>
        /// Chystání výběru pro následnou práci s ním
        /// </summary>
        /// <param name="view">Pohled pro práci s výběrem</param>
        internal static void PrepareSelection(IOfficeDocumentView view)
        {
            if (view != null && documents.ContainsKey(view.PrimaryFile))
                documents[view.PrimaryFile].PrepareSelection();
        }

        /// <summary>
        /// Zastavení vlákna pro práci s dokumentem
        /// </summary>
        /// <param name="file">Otevřený soubor dokumentu</param>
        internal static void StopThreads(OpenedFile file)
        {
            if (file != null && documents.ContainsKey(file))
                documents[file].StopThreads();
        }

        /// <summary>
        /// Zavření WORD instance
        /// </summary>
        /// <param name="file">Otevřený soubor s infomaci o objektu</param>
        internal static void CloseInstance(OpenedFile file)
        {
            if (file != null && documents.ContainsKey(file))
                documents[file].CloseInstance();
        }

        internal static void SetContentOfCopyDocument(CompilationUnit unit)
        {
            LoggingService.Debug(GResources.GetResourceText(29450155) + " getContentOfCopyWordDocument."); //RC 29450155 : start metody
            //string activeDocument = string.Empty;
            try
            {
                // pokud dokument nebyl pozměněn pak není co řešit
                Word.Document doc = GetDocument(unit.OpenedFile);
                GFETempDir tempDir = new GFETempDir();

                // uložíme WORD dokument
                //activeDocument = FileUtility.Combine(tempDir.Path, unit.GetAttributeValue("//alf:template", "filename"));
                if (doc != null)
                {
                    LoggingService.Info(GResources.GetResourceText(29450156, unit.TemplateFile)); //RC 29450156 : uložení dokumentu {0}
                    doc.SaveAs(unit.TemplateFile, Word.WdSaveFormat.wdFormatRTF, CommonService.MISSVALUE
                        , CommonService.MISSVALUE, CommonService.FALSE
                        , CommonService.MISSVALUE, CommonService.MISSVALUE
                        , CommonService.MISSVALUE, CommonService.MISSVALUE
                        , CommonService.MISSVALUE, CommonService.MISSVALUE);
                    LoggingService.Info("uložení OK");

                    unit.ZipResources = FileUtility.Combine(tempDir.Path, Guid.NewGuid().ToString() + ".tmp");
                    GZip.Zip(unit.TemplateFile, unit.ZipResources);
                    LoggingService.Debug("ZIP OK");
                }
                else
                    LoggingService.Warning(GResources.GetResourceText(29450157, unit.TemplateFile)); //RC 29450157 : uložení dokumentu {0} neproběhlo!
            }
            catch (Exception ex) { LoggingService.Error(ex); }
            finally
            {
                //if (doc != null)
                //    (doc as Word._Document).Close();
                CloseInstance(unit.OpenedFile);
                //unit.TemplateFile = Path.Combine(unit.OpenedFile.TemporaryDirectory.Path, Path.GetFileName(activeDocument));
                //FileUtility.ObservedCopy(activeDocument, unit.TemplateFile);
            }
        }

        /// <summary>
        /// získání jednoznačného identifikátoru ze skriptu MACROUTTON objektu
        /// </summary>
        /// <param name="field">všechny skripty MACROBUTTONU</param>
        /// <param name="rtfType">RTF typ objektu</param>
        /// <returns>Jednoznačný identifikátor</returns>
        public static Guid GetWithSetGuid(Word.Field field, GRTFField.GMBType rtfType)
        {
            Guid res = Guid.Empty;

            string text = field.Code.Text;
            if (!string.IsNullOrEmpty(text))
            {
                //MACROBUTTON MSWField(zasilka.z_st1) Zásilka - obálk. adresa 1. řádek
                if (text.ToLowerInvariant().Contains(rtfType + "("))
                {
                    text = text.Substring(0, text.IndexOf(")") + 1);
                    string newText = text;
                    string[] splitt = text.Split('(');
                    string name = splitt.Last().Trim(')');

                    if (name.Contains("["))
                    {
                        string guid = name.Split('[').Last().Trim('#');
                        if (guid.Contains("#"))
                        {
                            guid = guid.Split('#').First();
                            if (!string.IsNullOrEmpty(guid) && Guid.TryParse(guid, out res))
                                return res;
                        }
                    }
                    res = Guid.NewGuid();
                    string newName = string.Format("({0}[#{1}#])", name, res.ToString());
                    newText = newText.Replace(string.Format("({0})", name), newName);
                    //SS. 20. 10. 2015 
                    //newText = string.Format(" MACROBUTTON {0}{1}", rtfType, newName);
                    field.Code.Text = field.Code.Text.Replace(text, newText);
                    field.Update();
                    field.UpdateSource();
                    SetWordsColor(field.Code.Words, Word.WdColorIndex.wdRed);
                    return res;
                }

            }
            return res;
        }
        /// <summary>
        /// nastavení zvýraznění word objektů
        /// </summary>
        /// <param name="words"></param>
        /// <param name="color">Barva textu</param>
        public static void SetWordsColor(Word.Words words, Word.WdColorIndex color)
        {
            bool b = false;
            for (int i = 1; i <= words.Count; i++)
            {
                string se = words[i].Text;
                if (b) words[i].Font.ColorIndex = color;
                if (se.IndexOf(":") >= 0) b = true;
            }
        }
    }
}
