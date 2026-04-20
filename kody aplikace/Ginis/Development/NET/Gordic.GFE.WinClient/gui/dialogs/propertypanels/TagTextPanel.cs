//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.TagTextPanel.cs                        </Name>
//    <Description> Panel pro editaci textu.                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-25                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.General;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.Gui.PropertyPanels
{
    /// <summary>
    /// Panel pro editaci textu.
    /// </summary>
    class TagTextPanel : AbstractPropertyPanel
    {
        #region AbstractPropertyPanel
        /// <summary>
        /// Získání nové hodnoty - PropertyGrid
        /// </summary>
        /// <returns>Nová hodnota</returns>
        public override object PropertyValue { get => null; }

        /// <summary>
        /// Reakce na akceptace změn
        /// </summary>
        /// <returns>TRUE- změna provedená</returns>
        protected override bool Accept()
        {
            if (Service == null)
                return true;

            if (textChanged || hzarovnanichange || vzarovnanichange || prizpusobenichange
                || zakoncenichange || rotacechange || multiselectChange
                || znakChanged || textLeading || paragraphGap
                || paddingLeft || paddingRight || paddingTop || paddingBottom)
            {
                if (!UndoRedoService.IsTransactionStarted)
                    UndoRedoService.StartTransaction(GResources.GetResourceText(29450048)); //RC 29450048 : změna textu

                foreach (object item in Service.SelectedComponents)
                {
                    if (!(item is IText || item is ITextHandler || item is ITagComponent))
                        continue;

                    // zafixujeme Obsah vybraného objektu
                    IText lcontent = item is IText ? (IText)item : (item is ITextHandler ? (item as ITextHandler).Text : null);
                    if (lcontent == null)
                        continue;

                    //pokud Text byl pozměněn, pak ho předáme
                    if (textChanged)
                        lcontent.Text = rtbT.Text.Replace("\\n", "\n"); ;

                    // horizontální zarovnání
                    if (lbHZ.SelectedIndex != -1 && hzarovnanichange)
                    {
                        if (PBHZC.B_state == BtnState.pressed)
                            lcontent.Align.Horizontal = HAlign.center;
                        else if (PBHZR.B_state == BtnState.pressed)
                            lcontent.Align.Horizontal = HAlign.right;
                        else if (PBHZL.B_state == BtnState.pressed)
                            lcontent.Align.Horizontal = HAlign.left;
                        else lcontent.Align.Horizontal = HAlign.justify;
                    }

                    // vertikálí zarovnání
                    if (lbVZ.SelectedIndex != -1 && vzarovnanichange)
                    {
                        if (PBVZC.B_state == BtnState.pressed)
                            lcontent.Align.Vertical = VAlign.center;
                        else if (PBVZB.B_state == BtnState.pressed)
                            lcontent.Align.Vertical = VAlign.bottom;
                        else lcontent.Align.Vertical = VAlign.top;
                    }

                    // zakončení při přetečení 
                    if (zakoncenichange)
                    {
                        if (rbUT.Checked)
                            lcontent.Ellipsis.Style = ElStyle.cut;
                        else if (rbTNZV.Checked)
                            lcontent.Ellipsis.Style = ElStyle.fill;
                        else if (rbV.Checked)
                            lcontent.Ellipsis.Style = ElStyle.dots;
                    }

                    // přizpůsobení textu 
                    if (prizpusobenichange)
                    {
                        if (rbNone.Checked)
                            lcontent.Fittext = FitText.none;
                        else if (rbShrink.Checked)
                            lcontent.Fittext = FitText.shrink;
                        else if (rbGrow.Checked)
                            lcontent.Fittext = FitText.grow;
                        else if (rbAll.Checked)
                            lcontent.Fittext = FitText.all;
                    }

                    // otočeni textu
                    if (cbOT.SelectedIndex != -1 && rotacechange)
                    {
                        if (cbOT.SelectedIndex == 1)
                            lcontent.Orientation = RotateType.Rotate270FlipXY;
                        else if (cbOT.SelectedIndex == 2)
                            lcontent.Orientation = RotateType.Rotate180FlipXY;
                        else if (cbOT.SelectedIndex == 3)
                            lcontent.Orientation = RotateType.Rotate90FlipXY;
                        else lcontent.Orientation = RotateType.RotateNoneFlipNone;
                    }

                    // víceřádkový text
                    if (multiselectChange)
                        lcontent.MultiLine = cbVT.Checked;

                    // znak výpustky
                    if (znakChanged)
                        lcontent.Ellipsis.Char = tbZV.Text[0];

                    // odsazení
                    if (paddingLeft)
                        (item as ITagComponent).Padding.LeftValue = tbPaddingLeft.Text;
                    if (paddingRight)
                        (item as ITagComponent).Padding.RightValue = tbPaddingRight.Text;
                    if (paddingTop)
                        (item as ITagComponent).Padding.TopValue = tbPaddingTop.Text;
                    if (paddingBottom)
                        (item as ITagComponent).Padding.BottomValue = tbPaddingBottom.Text;

                    if (textLeading && float.TryParse(tbTextLeading.Text, out float tl))
                        lcontent.Textleading = tl;
                    if (paragraphGap && float.TryParse(tbParagraphGap.Text, out float pg))
                        lcontent.Paragraphgap = pg;
                }
                List<IGRRLine> lines = Service.SelectedComponents.FindAll(itm => itm is IGRR).Select(itm => (itm as IGRR).Line).Distinct().ToList();
                foreach (ILine subItem in lines)
                    if (subItem.IsHeightByContent)
                        subItem.IsHeightByContent = true;
            }
            return base.Accept();
        }
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
                    // pole indexů vybraných položek v comboboxech
                    // horizontální, vertikální, otočeni textu,
                    // víceřádkový text, výpustka, useknutý text, text nahrazen znákem výpustky
                    // přizpůsobení žádné, zmenšit, zvětšit, oboji
                    int[] values = new int[] { -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 };

                    string znakVypustky = string.Empty,
                        _text = string.Empty,
                        pLeftValue = string.Empty,
                        pRightValue = string.Empty,
                        pTopValue = string.Empty,
                        pBottomValue = string.Empty
                        , pTextLeading = string.Empty
                        , pParagraphGap = string.Empty;

                    bool _enableTextChange = false;

                    lbHZ.SelectedIndex = -1;
                    lbVZ.SelectedIndex = -1;
                    cbOT.SelectedIndex = -1;
                    cbVT.Checked = false;
                    tbZV.Text = string.Empty;
                    rtbT.Text = string.Empty;

                    PBHZL.B_state = BtnState.none;
                    PBHZR.B_state = BtnState.none;
                    PBHZC.B_state = BtnState.none;
                    PBVZB.B_state = BtnState.none;
                    PBVZC.B_state = BtnState.none;
                    PBVZT.B_state = BtnState.none;

                    rbV.Checked = false;
                    rbUT.Checked = false;
                    rbTNZV.Checked = false;

                    rbNone.Checked = false;
                    rbShrink.Checked = false;
                    rbGrow.Checked = false;
                    rbAll.Checked = false;
                    bool first = true;
                    // projdeme všechny vybrané položky a zjistíme jejích hodnoty
                    foreach (object item in Service.SelectedComponents)
                    {
                        if (!(item is IText || item is ITextHandler || item is ITagComponent))
                            continue;

                        // zafixujeme Obsah vybraného objektu
                        IText _txt = item is IText ? (IText)item : (item is ITextHandler ? (item as ITextHandler).Text : null);
                        if (_txt == null)
                            continue;

                        // pokud je to první objekt, pak jeho vlastnosti nakopírujeme
                        if (first)
                        {
                            first = false;
                            znakVypustky = _txt.Ellipsis.Char.ToString();
                            _text = _txt.Text;
                            _enableTextChange = _txt.EnableChangeText;

                            pLeftValue = (item as ITagComponent).Padding.LeftValue;
                            pRightValue = (item as ITagComponent).Padding.RightValue;
                            pTopValue = (item as ITagComponent).Padding.TopValue;
                            pBottomValue = (item as ITagComponent).Padding.BottomValue;

                            pParagraphGap = _txt.Paragraphgap.ToString();
                            pTextLeading = _txt.Textleading.ToString();

                            values[0] = GetIndex(_txt.Align.Horizontal);
                            values[1] = GetIndex(_txt.Align.Vertical);
                            values[2] = GetIndex(_txt.Orientation);
                            values[3] = _txt.MultiLine ? 1 : 0;
                            values[4] = _txt.Ellipsis.Style == ElStyle.dots ? 1 : 0;
                            values[5] = _txt.Ellipsis.Style == ElStyle.cut ? 1 : 0;
                            values[6] = _txt.Ellipsis.Style == ElStyle.fill ? 1 : 0;
                            values[7] = _txt.Fittext == FitText.none ? 1 : 0;
                            values[8] = _txt.Fittext == FitText.shrink ? 1 : 0;
                            values[9] = _txt.Fittext == FitText.grow ? 1 : 0;
                            values[10] = _txt.Fittext == FitText.all ? 1 : 0;
                        }
                        else
                        {
                            if (!_txt.EnableChangeText)
                                _enableTextChange = false;

                            // _znakVypustky == null znamená, že obsahy nejsou stejné
                            if (znakVypustky != _txt.Ellipsis.Char.ToString() && znakVypustky != null)
                                znakVypustky = null;

                            // _text == null znamená, že obsahy nejsou stejné
                            if (_text != _txt.Text && _text != null)
                                _text = null;

                            // pLeftValue == null znamená, že obsahy nejsou stejné
                            if (pLeftValue != (item as ITagComponent).Padding.LeftValue && pLeftValue != null)
                                pLeftValue = null;

                            // pRightValue == null znamená, že obsahy nejsou stejné
                            if (pRightValue != (item as ITagComponent).Padding.RightValue && pRightValue != null)
                                pRightValue = null;

                            // pTopValue == null znamená, že obsahy nejsou stejné
                            if (pTopValue != (item as ITagComponent).Padding.TopValue && pTopValue != null)
                                pTopValue = null;

                            // pBottomValue == null znamená, že obsahy nejsou stejné
                            if (pBottomValue != (item as ITagComponent).Padding.BottomValue && pBottomValue != null)
                                pBottomValue = null;

                            // pTextLeading == null znamená, že obsahy nejsou stejné
                            if (pTextLeading != _txt.Textleading.ToString() && pTextLeading != null)
                                pTextLeading = null;

                            // pParagraphGap == null znamená, že obsahy nejsou stejné
                            if (pParagraphGap != _txt.Paragraphgap.ToString() && pParagraphGap != null)
                                pParagraphGap = null;

                            //_values[0] == -1 znamená, že obsahy nejsou stejné
                            if (values[0] != -1
                                && values[0] != GetIndex(_txt.Align.Horizontal))
                                values[0] = -1;

                            //_values[1] == -1 znamená, že obsahy nejsou stejné
                            if (values[1] != -1
                                && values[1] != GetIndex(_txt.Align.Vertical))
                                values[1] = -1;

                            //_values[2] == -1 znamená, že obsahy nejsou stejné
                            if (values[2] != -1
                                && values[2] != GetIndex(_txt.Orientation))
                                values[2] = -1;

                            //_values[3] == -1 znamená, že obsahy nejsou stejné
                            if (values[3] != -1
                                && values[3] != (_txt.MultiLine ? 1 : 0))
                                values[3] = -1;

                            //_values[4] == -1 znamená, že obsahy nejsou stejné
                            if (values[4] != -1
                                && values[4] != (_txt.Ellipsis.Style == ElStyle.dots ? 1 : 0))
                                values[4] = -1;

                            //_values[5] == -1 znamená, že obsahy nejsou stejné
                            if (values[5] != -1
                                && values[5] != (_txt.Ellipsis.Style == ElStyle.cut ? 1 : 0))
                                values[5] = -1;

                            //_values[6] == -1 znamená, že obsahy nejsou stejné
                            if (values[6] != -1
                                && values[6] != (_txt.Ellipsis.Style == ElStyle.fill ? 1 : 0))
                                values[6] = -1;

                            //_values[7] == -1 znamená, že obsahy nejsou stejné
                            if (values[7] != -1
                                && values[7] != (_txt.Fittext == FitText.none ? 1 : 0))
                                values[7] = -1;

                            //_values[8] == -1 znamená, že obsahy nejsou stejné
                            if (values[8] != -1
                                && values[8] != (_txt.Fittext == FitText.shrink ? 1 : 0))
                                values[8] = -1;

                            //_values[9] == -1 znamená, že obsahy nejsou stejné
                            if (values[9] != -1
                                && values[9] != (_txt.Fittext == FitText.grow ? 1 : 0))
                                values[9] = -1;

                            //_values[10] == -1 znamená, že obsahy nejsou stejné
                            if (values[10] != -1
                                && values[10] != (_txt.Fittext == FitText.all ? 1 : 0))
                                values[10] = -1;
                        }
                    }
                    // pokud výpustky jsou stejné, pak
                    if (znakVypustky != null)
                        tbZV.Text = znakVypustky;

                    // pokud texty všech vybraných objektů jsou stejné, pak
                    if (_text != null)
                        rtbT.Text = _text.Replace("\\n", "\n");

                    // odsazení
                    if (pLeftValue != null)
                        tbPaddingLeft.Text = pLeftValue;
                    if (pRightValue != null)
                        tbPaddingRight.Text = pRightValue;
                    if (pTopValue != null)
                        tbPaddingTop.Text = pTopValue;
                    if (pBottomValue != null)
                        tbPaddingBottom.Text = pBottomValue;

                    if (pParagraphGap != null)
                        tbParagraphGap.Text = pParagraphGap;
                    if (pTextLeading != null)
                        tbTextLeading.Text = pTextLeading;

                    // horizontální zarovnání
                    lbHZ.SelectedIndex = values[0];
                    // vertikální zarovnání
                    lbVZ.SelectedIndex = values[1];
                    // otočeni textu
                    cbOT.SelectedIndex = values[2];
                    // víceřádkový text
                    if (values[3] != -1)
                        cbVT.Checked = values[3] != 0;

                    // výpustka
                    if (values[4] != -1)
                        rbV.Checked = values[4] != 0;

                    // useknutý text
                    if (values[5] != -1)
                        rbUT.Checked = values[5] != 0;

                    // text nahrazen znákem výpustky
                    if (values[6] != -1)
                        rbTNZV.Checked = values[6] != 0;

                    // přizpůsobené textu žádné
                    if (values[7] != -1)
                        rbNone.Checked = values[7] != 0;

                    // text nahrazen znákem výpustky
                    if (values[8] != -1)
                        rbShrink.Checked = values[8] != 0;

                    // text nahrazen znákem výpustky
                    if (values[9] != -1)
                        rbGrow.Checked = values[9] != 0;

                    // text nahrazen znákem výpustky
                    if (values[10] != -1)
                        rbAll.Checked = values[10] != 0;

                    rtbT.Enabled = _enableTextChange;
                    rtbT.Parent.Visible = rtbT.Enabled;
                }
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " TagTextPanel:" + ex.Message); }
            textChanged = false;
            znakChanged = false;
            multiselectChange = false;
            paddingLeft = false;
            paddingRight = false;
            paddingTop = false;
            paddingBottom = false;
            hzarovnanichange = false;
            vzarovnanichange = false;
            rotacechange = false;
            zakoncenichange = false;
            prizpusobenichange = false;
            textLeading = false;
            paragraphGap = false;
        }

        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            try
            {
                SetupLocalizedXFRM(AssemblyName + ".Resources.forms.property.TagTextPanel.xfrm");
                PBHZL = ((GFEHZarovnani)ControlDictionary["PBHZL"]);
                PBHZL.MouseDown += PBH_MouseDown;
                PBHZC = ((GFEHZarovnani)ControlDictionary["PBHZC"]);
                PBHZC.MouseDown += PBH_MouseDown;
                PBHZR = ((GFEHZarovnani)ControlDictionary["PBHZR"]);
                PBHZR.MouseDown += PBH_MouseDown;
                lbHZ = ((ListBox)ControlDictionary["lbHZ"]);
                lbHZ.Items.AddRange(new string[] { GResources.GetResourceText(29450605), GResources.GetResourceText(29450606), GResources.GetResourceText(29450607), "do bloku" }); //RC 29450607 : vpravo
                lbHZ.SelectedIndexChanged += lbHZ_SelectedIndexChanged;

                PBVZT = ((GFEVZarovnani)ControlDictionary["PBVZT"]);
                PBVZT.MouseDown += PBV_MouseDown;
                PBVZC = ((GFEVZarovnani)ControlDictionary["PBVZC"]);
                PBVZC.MouseDown += PBV_MouseDown;
                PBVZB = ((GFEVZarovnani)ControlDictionary["PBVZB"]);
                PBVZB.MouseDown += PBV_MouseDown;
                lbVZ = ((ListBox)ControlDictionary["lbVZ"]);
                lbVZ.Items.AddRange(new string[] { GResources.GetResourceText(29450609), GResources.GetResourceText(29450606), GResources.GetResourceText(29450608) }); //RC 29450609 : nahoru
                lbVZ.SelectedIndexChanged += lbVZ_SelectedIndexChanged;

                rbV = (RadioButton)ControlDictionary["rbV"];
                rbV.CheckedChanged += rb_CheckedChanged;
                rbUT = (RadioButton)ControlDictionary["rbUT"];
                rbUT.CheckedChanged += rb_CheckedChanged;
                rbTNZV = (RadioButton)ControlDictionary["rbTNZV"];
                rbTNZV.CheckedChanged += rb_CheckedChanged;

                rbNone = (RadioButton)ControlDictionary["rbNone"];
                rbNone.CheckedChanged += rbFT_CheckedChanged;
                rbShrink = (RadioButton)ControlDictionary["rbShrink"];
                rbShrink.CheckedChanged += rbFT_CheckedChanged;
                rbGrow = (RadioButton)ControlDictionary["rbGrow"];
                rbGrow.CheckedChanged += rbFT_CheckedChanged;
                rbAll = (RadioButton)ControlDictionary["rbAll"];
                rbAll.CheckedChanged += rbFT_CheckedChanged;

                cbVT = (CheckBox)ControlDictionary["cbVT"];
                cbVT.CheckedChanged += delegate { multiselectChange = true; };

                tbZV = (TextBox)ControlDictionary["tbZV"];
                tbZV.TextChanged += delegate { znakChanged = true; };
                cbOT = (ComboBox)ControlDictionary["cbOT"];
                cbOT.Items.AddRange(new string[] { "0°", "90°", "180°", "270°" });
                cbOT.SelectedIndexChanged += delegate { rotacechange = true; };

                tbPaddingLeft = (TextBox)ControlDictionary["tbPaddingLeft"];
                tbPaddingLeft.TextChanged += delegate { paddingLeft = true; };
                tbPaddingRight = (TextBox)ControlDictionary["tbPaddingRight"];
                tbPaddingRight.TextChanged += delegate { paddingRight = true; };
                tbPaddingTop = (TextBox)ControlDictionary["tbPaddingTop"];
                tbPaddingTop.TextChanged += delegate { paddingTop = true; };
                tbPaddingBottom = (TextBox)ControlDictionary["tbPaddingBottom"];
                tbPaddingBottom.TextChanged += delegate { paddingBottom = true; };

                tbTextLeading = (TextBox)ControlDictionary["tbTextLeading"];
                tbTextLeading.TextChanged += delegate { textLeading = true; };
                tbParagraphGap = (TextBox)ControlDictionary["tbParagraphGap"];
                tbParagraphGap.TextChanged += delegate { paragraphGap = true; };

                rtbT = (RichTextBox)ControlDictionary["rtbT"];
                rtbT.TextChanged += delegate { textChanged = true; };

                ThreadService.SafeThreadAsyncCall(SetDefault);
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " TagTextPanel.xfrm:" + ex.Message); }
        }
        /// <summary>
        /// Podmínky viditelnosti daného panelu
        /// </summary>
        /// <returns>TRUE - podmínka je splněná</returns>
        public override bool VisibleCondition() =>
            view == null
                ? base.VisibleCondition()
                : Service != null && Service.SelectedComponents.Exists(item => item is IText || item is ITextHandler);

        #endregion

        GFEHZarovnani PBHZL, PBHZC, PBHZR;
        GFEVZarovnani PBVZT, PBVZC, PBVZB;
        ListBox lbHZ, lbVZ;
        ComboBox cbOT;
        CheckBox cbVT;
        RadioButton rbV, rbUT, rbTNZV, rbNone, rbShrink, rbGrow, rbAll;
        TextBox tbZV, tbPaddingLeft, tbPaddingRight, tbPaddingTop, tbPaddingBottom, tbTextLeading, tbParagraphGap;
        RichTextBox rtbT;

        //indikuje, že text 'Velikost' byl záměrně pozměněn
        bool
            textChanged
            , znakChanged
            , multiselectChange
            , paddingLeft
            , paddingRight
            , paddingTop
            , paddingBottom
            , hzarovnanichange
            , vzarovnanichange
            , rotacechange
            , zakoncenichange
            , prizpusobenichange
            , textLeading
            , paragraphGap;

        void PBH_MouseDown(object sender, MouseEventArgs e)
        {
            if (!(sender is GFEHZarovnani))
                return;

            int index = (int)((GFEHZarovnani)sender).B_type;
            lbHZ.SelectedIndex = index == 1 ? 2
                : (index == 2 ? 1
                : (index == 3 ? 0 : index));
        }
        void lbHZ_SelectedIndexChanged(object sender, EventArgs e)
        {
            hzarovnanichange = true;
            if (lbHZ.SelectedIndex == 1)
            {
                PBHZL.B_state = BtnState.none;
                PBHZR.B_state = BtnState.none;
                PBHZC.B_state = BtnState.pressed;
            }
            else if (lbHZ.SelectedIndex == 2)
            {
                PBHZL.B_state = BtnState.none;
                PBHZC.B_state = BtnState.none;
                PBHZR.B_state = BtnState.pressed;
            }
            else if (lbHZ.SelectedIndex == 3)
            {
                PBHZC.B_state = BtnState.none;
                PBHZR.B_state = BtnState.none;
                PBHZL.B_state = BtnState.none;
            }
            else
            {
                PBHZC.B_state = BtnState.none;
                PBHZR.B_state = BtnState.none;
                PBHZL.B_state = BtnState.pressed;
            }

            ThreadService.SafeThreadAsyncCall(InvalidateHButtons);
        }
        void InvalidateHButtons()
        {
            PBHZC.Invalidate();
            PBHZR.Invalidate();
            PBHZL.Invalidate();
        }

        void PBV_MouseDown(object sender, MouseEventArgs e)
        {
            if (!(sender is GFEVZarovnani))
                return;

            int index = (int)((GFEVZarovnani)sender).B_type;
            lbVZ.SelectedIndex = index == 1 ? 2
                : (index == 2 ? 1 : index);
        }
        void lbVZ_SelectedIndexChanged(object sender, EventArgs e)
        {
            vzarovnanichange = true;

            if (lbVZ.SelectedIndex == 1)
            {
                PBVZT.B_state = BtnState.none;
                PBVZB.B_state = BtnState.none;
                PBVZC.B_state = BtnState.pressed;
            }
            else if (lbVZ.SelectedIndex == 2)
            {
                PBVZT.B_state = BtnState.none;
                PBVZC.B_state = BtnState.none;
                PBVZB.B_state = BtnState.pressed;
            }
            else
            {
                PBVZC.B_state = BtnState.none;
                PBVZB.B_state = BtnState.none;
                PBVZT.B_state = BtnState.pressed;
            }
            ThreadService.SafeThreadAsyncCall(InvalidateVButtons);
        }
        void InvalidateVButtons()
        {
            PBVZC.Invalidate();
            PBVZB.Invalidate();
            PBVZT.Invalidate();
        }

        void rb_CheckedChanged(object sender, EventArgs e)
        {
            zakoncenichange = true;
        }

        void rbFT_CheckedChanged(object sender, EventArgs e)
        {
            prizpusobenichange = true;
        }

        int GetIndex(HAlign hAlign)
        {
            if ((int)hAlign == 3)
                return 3;
            if ((int)hAlign == 1)
                return 2;
            else if ((int)hAlign == 2)
                return 1;
            else return 0;
        }
        int GetIndex(VAlign vAlign)
        {
            if ((int)vAlign == 1)
                return 2;
            else if ((int)vAlign == 2)
                return 1;
            else return 0;
        }
        int GetIndex(RotateType rotateTextType)
        {
            switch (rotateTextType)
            {
                case RotateType.Rotate90FlipXY:
                    return 3;
                case RotateType.Rotate180FlipXY:
                    return 2;
                case RotateType.Rotate270FlipXY:
                    return 1;
                default:
                    return 0;
            }
        }
    }
}
