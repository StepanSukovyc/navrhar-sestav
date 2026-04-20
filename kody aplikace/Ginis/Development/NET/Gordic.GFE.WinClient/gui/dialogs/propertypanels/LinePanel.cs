//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.LinePanel.cs                           </Name>
//    <Description> Panel řádku                                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-30                                                  </Created>
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
using Gordic.GFE.WinClient.Editor;
using Gordic.WinForms.Controls;
using Gordic.General;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.LinkedFiles;
using Gordic.GFE.WinClient.Services;
using System.IO;
using Gordic.GFE.WinClient.VariablesView;

namespace Gordic.GFE.WinClient.Gui.PropertyPanels
{
    /// <summary>
    /// Panel řádku
    /// </summary>
    class LinePanel : AbstractPropertyPanel
    {
        #region AbstractPropertyPanel
        /// <summary>
        /// Získání nové hodnoty - PropertyGrid
        /// </summary>
        /// <returns>Nová hodnota</returns>
        public override object PropertyValue
        {
            get
            {
                // funguje to tak, že jelikož Line je komplexní objekt, 
                // tak jeho vlastnosti se špatně kopírují
                // jednoduše je vrátit NULL ale uložit změny
                if (UndoRedoService.IsTransactionStarted)
                    UndoRedoService.Commit();

                return null;
            }
        }

        List<ILine> selectedLines = new List<ILine>();
        /// <summary>
        /// Reakce na tlačítko Výchozí hodnoty
        /// </summary>
        /// <returns>True - Nastavení provedené</returns>
        protected override void SetDefault()
        {
            try
            {
                if (Service != null)
                {
                    selectedLines = Service.SelectedComponents
                        .Select(cm => cm is ITagComponent && (cm as ITagComponent).Parent is IGRRCell ? ((cm as ITagComponent).Parent as IGRRCell).Line : null)
                        .Distinct()
                        .ToList()
                        .FindAll(mm => mm != null);

                    if (selectedLines.Count != 0)
                    {
                        //jsou to hodnoty v skupinových boxéch
                        byte[] _values = new byte[] { 3, 3, 3, 3, 2, 3 };
                        string _onlyIf = string.Empty;

                        bool first = true, parentIsTable = false;
                        // projdeme všechny vybrané položky a zjistíme jejích hodnoty
                        foreach (IGRRLine item in selectedLines)
                        {
                            parentIsTable = (!parentIsTable && item.Parent is GrrContentTable) || parentIsTable;
                            // pokud je to první objekt, pak jeho vlastnosti nakopírujeme
                            if (first)
                            {
                                first = false;
                                //jenom když
                                _onlyIf = item.Property.OnlyIf;
                                //pozice v regionu
                                _values[0] = Convert.ToByte(item.Type);
                                //pozice při tisku
                                _values[1] = Convert.ToByte(item.Property.PrintPosition);
                                //stránkvání za řádkem
                                _values[2] = Convert.ToByte(item.Property.BreakPageAfter);
                                //stránkování před řádkem
                                _values[3] = Convert.ToByte(item.Property.BreakPageBefore);
                                //na konci stránky
                                _values[4] = Convert.ToByte(item.Property.EndPage);
                                // je nulové výšky
                                _values[5] = Convert.ToByte(item.IsNULLHeight);
                            }
                            else
                            {
                                //_onlyIf == null znamená, že obsahy nejsou stejné
                                if (_onlyIf != item.Property.OnlyIf
                                    && _onlyIf != null)
                                    _onlyIf = null;

                                //_values[0]==3 znamená, že obsahy nejsou stejné
                                if (_values[0] != 3
                                    && _values[0] != Convert.ToByte(item.Type))
                                    _values[0] = 3;

                                //_values[1]==3 znamená, že obsahy nejsou stejné
                                if (_values[1] != 3
                                    && _values[1] != Convert.ToByte(item.Property.PrintPosition))
                                    _values[1] = 3;

                                //_values[2]==3 znamená, že obsahy nejsou stejné
                                if (_values[2] != 3
                                    && _values[2] != Convert.ToByte(item.Property.BreakPageAfter))
                                    _values[2] = 3;

                                //_values[3]==3 znamená, že obsahy nejsou stejné
                                if (_values[3] != 3
                                    && _values[3] != Convert.ToByte(item.Property.BreakPageBefore))
                                    _values[3] = 3;

                                //_values[4]==2 znamená, že obsahy nejsou stejné
                                if (_values[4] != 2
                                    && _values[4] != Convert.ToByte(item.Property.EndPage))
                                    _values[4] = 2;

                                //_values[5]==2 znamená, že obsahy nejsou stejné
                                if (_values[5] != 2
                                    && _values[5] != Convert.ToByte(item.IsNULLHeight))
                                    _values[5] = 2;
                            }
                        }

                        //pozice v regionu
                        rbTitle.Checked = _values[0] == 0;
                        rbBody.Checked = _values[0] == 1;
                        rbFoot.Checked = _values[0] == 2;

                        //pozice při tisku
                        if (_values[1] != 3)
                        {
                            cbIntrclose.Checked = _values[1] == 2 || _values[1] == 0;
                            cbMiddle.Checked = _values[1] == 1 || _values[1] == 0;
                        }

                        //stránkování za řádkem
                        rbAfterNone.Checked = _values[2] == 0;
                        rbAfterForbid.Checked = _values[2] == 1;
                        rbAfterPageup.Checked = _values[2] == 2;
                        rbAfterSheet.Checked = _values[2] == 3;

                        //stránkování před řádkem
                        rbBeforeNone.Checked = _values[3] == 0;
                        rbBeforeForbid.Checked = _values[3] == 1;
                        rbBeforePageup.Checked = _values[3] == 2;
                        rbBeforeSheet.Checked = _values[3] == 3;

                        //na konci stránky
                        //rbYes.Checked = _values[4] == 1;
                        //rbNo.Checked = _values[4] == 0;
                        cbEndPage.Checked = _values[4] == 1;
                        cbEndPage.Enabled = cbMiddle.Checked;

                        cbIsNULL.Checked = _values[5] == 1;

                        //jenom když
                        if (_onlyIf != null)
                            tbOnlyIf.Text = _onlyIf;

                        // pokud alespoň jeden řádek je z tabulky
                        if (parentIsTable)
                            ((GroupBox)ControlDictionary["gbAfter"]).Enabled =
                                ((GroupBox)ControlDictionary["gbBefore"]).Enabled =
                                ((GroupBox)ControlDictionary["gbPaging"]).Enabled =
                                ((GroupBox)ControlDictionary["gbPrintPositions"]).Enabled =
                                ((GroupBox)ControlDictionary["gbRegionPosition"]).Enabled = false;
                    }
                }
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " LinePanel:" + ex.Message); }
            _chggbRegionPosition = false;
            _chggbPrintPositions = false;
            _chgrbAfter = false;
            _chgrbBefore = false;
            _chgtbOnlyIf = false;
            _chgcbIntrclose = false;
            _chgcbMiddle = false;
            _chgcbEndPage = false;
            _chgcbIsNULL = false;
        }
        /// <summary>
        /// Reakce na akceptace změn
        /// </summary>
        /// <returns>TRUE- změna provedená</returns>
        protected override bool Accept()
        {
            if (Service == null)
                return true;

            if (_chggbRegionPosition
                || _chggbPrintPositions
                || _chgrbAfter
                || _chgrbBefore
                || _chgtbOnlyIf
                || _chgcbIsNULL
                || _chgcbIntrclose
                || _chgcbMiddle
                || _chgcbEndPage)
            {
                if (!UndoRedoService.IsTransactionStarted)
                    UndoRedoService.StartTransaction(GResources.GetResourceText(29450477)); //RC 29450477 : změna vlastnosti řádku

                foreach (IGRRLine item in selectedLines)
                {
                    if (_chgtbOnlyIf)
                        item.Property.OnlyIf = tbOnlyIf.Text;

                    //pozice v regionu
                    if (!(item.Parent is GrrContentTable) && _chggbRegionPosition)
                        if (rbTitle.Checked && item.Type != LineType.head)
                            item.Type = LineType.head;
                        else if (rbBody.Checked && item.Type != LineType.body)
                            item.Type = LineType.body;
                        else if (rbFoot.Checked && item.Type != LineType.foot)
                            item.Type = LineType.foot;

                    //pozice při tisku
                    if (_chgcbIntrclose || _chgcbMiddle)
                        if (cbIntrclose.Checked && !cbMiddle.Checked)
                            item.Property.PrintPosition = LinePrintPosition.intrclose;
                        else if (cbIntrclose.Checked && cbMiddle.Checked)
                            item.Property.PrintPosition = LinePrintPosition.oneachpage;
                        else if (!cbIntrclose.Checked && cbMiddle.Checked)
                            item.Property.PrintPosition = LinePrintPosition.middle;

                    //stránkování za řádkem
                    if (_chgrbAfter)
                        if (rbAfterNone.Checked)
                            item.Property.BreakPageAfter = LineBreak.none;
                        else if (rbAfterForbid.Checked)
                            item.Property.BreakPageAfter = LineBreak.forbid;
                        else if (rbAfterPageup.Checked)
                            item.Property.BreakPageAfter = LineBreak.pageup;
                        else if (rbAfterSheet.Checked)
                            item.Property.BreakPageAfter = LineBreak.sheet;

                    //stránkování před řádkem
                    if (_chgrbBefore)
                        if (rbBeforeNone.Checked)
                            item.Property.BreakPageBefore = LineBreak.none;
                        else if (rbBeforeForbid.Checked)
                            item.Property.BreakPageBefore = LineBreak.forbid;
                        else if (rbBeforePageup.Checked)
                            item.Property.BreakPageBefore = LineBreak.pageup;
                        else if (rbBeforeSheet.Checked)
                            item.Property.BreakPageBefore = LineBreak.sheet;

                    //na konci stránky
                    if (_chgcbEndPage)
                        item.Property.EndPage = cbEndPage.Checked;

                    if (_chgcbIsNULL)
                    {
                        item.SetNullHeight(cbIsNULL.Checked);
                        _chgcbIsNULL = false;
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
                SetupLocalizedXFRM(AssemblyName + ".Resources.forms.property.LinePanel.xfrm");
                rbTitle = (RadioButton)ControlDictionary["rbTitle"];
                rbTitle.CheckedChanged += RbTitleCheckedChanged;
                rbBody = (RadioButton)ControlDictionary["rbBody"];
                rbBody.CheckedChanged += RbTitleCheckedChanged;
                rbFoot = (RadioButton)ControlDictionary["rbFoot"];
                rbFoot.CheckedChanged += RbTitleCheckedChanged;

                rbBeforePageup = (RadioButton)ControlDictionary["rbBeforePageup"];
                rbBeforePageup.CheckedChanged += RbBeforeCheckedChanged;
                rbBeforeForbid = (RadioButton)ControlDictionary["rbBeforeForbid"];
                rbBeforeForbid.CheckedChanged += RbBeforeCheckedChanged;
                rbBeforeNone = (RadioButton)ControlDictionary["rbBeforeNone"];
                rbBeforeNone.CheckedChanged += RbBeforeCheckedChanged;
                rbBeforeSheet = (RadioButton)ControlDictionary["rbBeforeSheet"];
                rbBeforeSheet.CheckedChanged += RbBeforeCheckedChanged;

                rbAfterPageup = (RadioButton)ControlDictionary["rbAfterPageup"];
                rbAfterPageup.CheckedChanged += RbAfterCheckedChanged;
                rbAfterSheet = (RadioButton)ControlDictionary["rbAfterSheet"];
                rbAfterSheet.CheckedChanged += RbAfterCheckedChanged;
                rbAfterForbid = (RadioButton)ControlDictionary["rbAfterForbid"];
                rbAfterForbid.CheckedChanged += RbAfterCheckedChanged;
                rbAfterNone = (RadioButton)ControlDictionary["rbAfterNone"];
                rbAfterNone.CheckedChanged += RbAfterCheckedChanged;

                cbEndPage = (CheckBox)ControlDictionary["cbEndPage"];
                cbEndPage.CheckedChanged += delegate { _chgcbEndPage = true; };
                cbMiddle = (CheckBox)ControlDictionary["cbMiddle"];
                cbMiddle.CheckedChanged += delegate { _chgcbMiddle = true; cbEndPage.Enabled = cbMiddle.Checked && rbFoot.Checked; };
                cbIntrclose = (CheckBox)ControlDictionary["cbIntrclose"];
                cbIntrclose.CheckedChanged += delegate { _chgcbIntrclose = true; };

                cbIsNULL = (CheckBox)ControlDictionary["cbIsNULL"];
                cbIsNULL.CheckedChanged += delegate { _chgcbIsNULL = true; };

                tbOnlyIf = (GLabeledTextBox)ControlDictionary["tbOnlyIf"];
                tbOnlyIf.TextChanged += delegate { _chgtbOnlyIf = true; };
                tbOnlyIf.DragOver += Drag_Over;
                tbOnlyIf.DragDrop += Drag_Drop;
                tbOnlyIf.AllowDrop = true;

                ThreadService.SafeThreadAsyncCall(SetDefault);
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " LinePanel.xfrm:" + ex.Message); }
        }

        /// <summary>
        /// Podmínky viditelnosti daného panelu
        /// </summary>
        /// <returns>TRUE - podmínka je splněná</returns>
        public override bool VisibleCondition()
        {
            if (view == null)
                return base.VisibleCondition();

            return Service != null && Service.SelectedComponents.Exists(item => item is ITagComponent && (item as ITagComponent).Parent is IGRRCell);
        }
        #endregion

        bool
            _chggbRegionPosition = false,
            _chggbPrintPositions = false,
            _chgrbAfter = false,
            _chgrbBefore = false,
            _chgtbOnlyIf = false,
            _chgcbIntrclose = false,
            _chgcbMiddle = false,
            _chgcbIsNULL = false,
            _chgcbEndPage = false;

        RadioButton rbFoot, rbBody, rbTitle,
            rbBeforePageup, rbBeforeForbid, rbBeforeNone, rbBeforeSheet,
            rbAfterPageup, rbAfterForbid, rbAfterNone, rbAfterSheet;

        CheckBox cbEndPage, cbMiddle, cbIntrclose, cbIsNULL;
        GLabeledTextBox tbOnlyIf;

        /// <exclude/>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                tbOnlyIf.DragOver -= Drag_Over;
                tbOnlyIf.DragDrop -= Drag_Drop;
            }
            base.Dispose(disposing);
        }

        void Drag_Drop(object sender, DragEventArgs drgevent)
        {
            dynamic node;
            if (drgevent.Data.GetDataPresent(typeof(StructExtNode)))
            {
                node = (StructExtNode)drgevent.Data.GetData(typeof(StructExtNode));
                tbOnlyIf.Text = tbOnlyIf.Text.Insert(tbOnlyIf.CaretPosition, LocalCommonService.GetText(node.FullName));
            }
            else if (drgevent.Data.GetDataPresent(typeof(LFExtNode)))
            {
                node = (LFExtNode)drgevent.Data.GetData(typeof(LFExtNode));
                tbOnlyIf.Text = tbOnlyIf.Text.Insert(tbOnlyIf.CaretPosition, LocalCommonService.GetText(node.FullName, Path.DirectorySeparatorChar));
            }
            else if (drgevent.Data.GetDataPresent(typeof(string)))
                tbOnlyIf.Text = tbOnlyIf.Text.Insert(tbOnlyIf.CaretPosition, LocalCommonService.GetText((((string)drgevent.Data.GetData(typeof(string))).Split(';').Last())));
            else if (drgevent.Data.GetDataPresent(typeof(VarExtNode)))
                tbOnlyIf.Text = tbOnlyIf.Text.Insert(tbOnlyIf.CaretPosition, LocalCommonService.GetText(((VarExtNode)drgevent.Data.GetData(typeof(VarExtNode)))));
        }
        void Drag_Over(object sender, DragEventArgs drgevent)
        {
            if (drgevent.Data.GetDataPresent(typeof(StructExtNode))
                || drgevent.Data.GetDataPresent(typeof(LFExtNode))
                || drgevent.Data.GetDataPresent(typeof(string))
                || drgevent.Data.GetDataPresent(typeof(VarExtNode)))
                drgevent.Effect = DragDropEffects.Copy;
        }
        void RbAfterCheckedChanged(object sender, EventArgs e) { _chgrbAfter = true; }
        void RbBeforeCheckedChanged(object sender, EventArgs e) { _chgrbBefore = true; }
        void RbTitleCheckedChanged(object sender, EventArgs e)
        {
            _chggbRegionPosition = true;
            cbMiddle.Enabled = cbIntrclose.Enabled = !rbBody.Checked;
            cbEndPage.Enabled = cbMiddle.Checked && rbFoot.Checked;
        }
    }
}
