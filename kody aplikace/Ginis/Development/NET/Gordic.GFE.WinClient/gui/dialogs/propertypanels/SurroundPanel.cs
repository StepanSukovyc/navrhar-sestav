//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SurroundPanel.cs                       </Name>
//    <Description> Panel ohraničení                                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-28                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.WinForms.Controls;
using Gordic.General;
using System.Drawing.Drawing2D;

namespace Gordic.GFE.WinClient.Gui.PropertyPanels
{
    /// <summary>
    /// Panel ohraničení
    /// </summary>
    class SurroundPanel : AbstractPropertyPanel
    {
        #region AbstractPropertyPanel
        /// <summary>
        /// Získání nové hodnoty - PropertyGrid
        /// </summary>
        /// <returns>Nová hodnota</returns>
        public override object PropertyValue { get => null; }

        bool isLoad = false;
        /// <summary>
        /// Reakce na tlačítko Výchozí hodnoty
        /// </summary>
        /// <returns>True - Nastavení provedené</returns>
        protected override void SetDefault()
        {
            isLoad = true;
            try
            {
                if (Service != null)
                {
                    // pole indexů vybraných položek v comboboxech
                    int[] _values = new int[]
                {
                    -1,      // top
                    -1,      // left
                    -1,      // right
                    -1,      // bottom
                    -1,      // all
                };

                    // umístění
                    byte _inside = 0;
                    int _corners = -1;
                    // odsazení rámečku
                    string
                        _styleTop = string.Empty,
                        _styleLeft = string.Empty,
                        _styleRight = string.Empty,
                        _styleBottom = string.Empty,
                        _styleAll = string.Empty;

                    // šířka rámečku
                    string
                        _sizeTop = string.Empty,
                        _sizeLeft = string.Empty,
                        _sizeRight = string.Empty,
                        _sizeBottom = string.Empty,
                        _sizeAll = string.Empty;

                    // odsazení rámečku
                    string
                        _spacingTop = string.Empty,
                        _spacingLeft = string.Empty,
                        _spacingRight = string.Empty,
                        _spacingBottom = string.Empty,
                        _spacingAll = string.Empty;

                    tbSirkaTop.Text = string.Empty;
                    tbSirkaLeft.Text = string.Empty;
                    tbSirkaRight.Text = string.Empty;
                    tbSirkaBottom.Text = string.Empty;
                    tbSirkaAll.Text = string.Empty;

                    tbOdsazeniTop.Text = string.Empty;
                    tbOdsazeniLeft.Text = string.Empty;
                    tbOdsazeniRight.Text = string.Empty;
                    tbOdsazeniBottom.Text = string.Empty;
                    tbOdsazeniAll.Text = string.Empty;

                    cbStylTop.SelectedIndex = -1;
                    cbStylLeft.SelectedIndex = -1;
                    cbStylRight.SelectedIndex = -1;
                    cbStylBottom.SelectedIndex = -1;
                    cbStylAll.SelectedIndex = -1;

                    cbBarvaTop.SelectedIndex = -1;
                    cbBarvaLeft.SelectedIndex = -1;
                    cbBarvaRight.SelectedIndex = -1;
                    cbBarvaBottom.SelectedIndex = -1;
                    cbBarvaAll.SelectedIndex = -1;

                    cbUmisteni.SelectedIndex = -1;
                    bool first = true;
                    angleText = null;

                    // projdeme všechny vybrané položky a zjistíme jejích hodnoty
                    foreach (object item in Service.SelectedComponents)
                    {
                        if (!(item is ISurroundable))
                            continue;

                        // zafixujeme Písmo vybraného objektu
                        var _border = (item as ISurroundable).Surround;
                        if (_border == null)
                            continue;

                        // pokud je to první objekt, pak jeho vlastnosti nakopírujeme
                        if (first)
                        {
                            first = false;
                            if (item is ITagComponent)
                            {
                                _spacingRight = (item as ITagComponent).Spacing.RightValue;
                                _spacingLeft = (item as ITagComponent).Spacing.LeftValue;
                                _spacingTop = (item as ITagComponent).Spacing.TopValue;
                                _spacingBottom = (item as ITagComponent).Spacing.BottomValue;
                                _spacingAll = (item as ITagComponent).Spacing.AllValue;
                            }

                            // top
                            _sizeTop = _border.Width.TopValue;
                            _styleTop = _border.DashStyle.TopValue;
                            if (_border.FrameColor.TopValue != null)
                                _values[0] = GetIndex(cbBarvaTop, new GFEColor(_border.FrameColor.TopValue));

                            // left
                            _sizeLeft = _border.Width.LeftValue;
                            _styleLeft = _border.DashStyle.LeftValue;
                            if (!(_border.FrameColor.LeftValue is null))
                                _values[1] = GetIndex(cbBarvaLeft, new GFEColor(_border.FrameColor.LeftValue));

                            // right
                            _sizeRight = _border.Width.RightValue;
                            _styleRight = _border.DashStyle.RightValue;
                            if (_border.FrameColor.RightValue != null)
                                _values[2] = GetIndex(cbBarvaRight, new GFEColor(_border.FrameColor.RightValue));

                            // bottom
                            _sizeBottom = _border.Width.BottomValue;
                            _styleBottom = _border.DashStyle.BottomValue;
                            if (_border.FrameColor.BottomValue != null)
                                _values[3] = GetIndex(cbBarvaBottom, new GFEColor(_border.FrameColor.BottomValue));

                            // all
                            _sizeAll = _border.Width.AllValue;
                            _styleAll = _border.DashStyle.AllValue;
                            if (!(_border.FrameColor.AllValue is null))
                                _values[4] = GetIndex(cbBarvaAll, new GFEColor(_border.FrameColor.AllValue));

                            // umístění
                            _inside = Convert.ToByte(_border.InsideBorder);
                            angleText = Convert.ToString(_border.Radius);
                            _corners = Convert.ToInt32(_border.Corners);
                        }
                        else
                        {
                            if (item is ITagComponent)
                            {
                                // _spacingTop == null znamená, že obsahy nejsou stejné
                                if (_spacingTop != (item as ITagComponent).Spacing.TopValue
                                    && _spacingTop != null)
                                    _spacingTop = null;

                                // _spacingLeft == null znamená, že obsahy nejsou stejné
                                if (_spacingLeft != (item as ITagComponent).Spacing.LeftValue
                                    && _spacingLeft != null)
                                    _spacingLeft = null;

                                // _spacingRight == null znamená, že obsahy nejsou stejné
                                if (_spacingRight != (item as ITagComponent).Spacing.RightValue
                                    && _spacingRight != null)
                                    _spacingRight = null;

                                // _spacingBottom == null znamená, že obsahy nejsou stejné
                                if (_spacingBottom != (item as ITagComponent).Spacing.BottomValue
                                    && _spacingBottom != null)
                                    _spacingBottom = null;

                                // _spacingAll == null znamená, že obsahy nejsou stejné
                                if (_spacingAll != (item as ITagComponent).Spacing.AllValue
                                    && _spacingAll != null)
                                    _spacingAll = null;
                            }

                            // top
                            // _sizeTop == null znamená, že obsahy nejsou stejné
                            if (_sizeTop != _border.Width.TopValue
                                && _sizeTop != null)
                                _sizeTop = null;

                            // _styleTop == null znamená, že obsahy nejsou stejné
                            if (_styleTop != _border.DashStyle.TopValue
                                && _styleTop != null)
                                _styleTop = null;

                            // _values[0] == -1 znamená, že obsahy nejsou stejné
                            if (_values[0] != -1
                                && _values[0] != GetIndex(cbBarvaTop, new GFEColor(_border.FrameColor.TopValue.Color)))
                                _values[0] = -1;

                            // left
                            // _sizeLeft == null znamená, že obsahy nejsou stejné
                            if (_sizeLeft != _border.Width.LeftValue
                                && _sizeLeft != null)
                                _sizeLeft = null;

                            // _styleLeft == null znamená, že obsahy nejsou stejné
                            if (_styleLeft != _border.DashStyle.LeftValue
                                && _styleLeft != null)
                                _styleLeft = null;

                            // _values[1] == -1 znamená, že obsahy nejsou stejné
                            if (_values[1] != -1
                                && _values[1] != GetIndex(cbBarvaLeft, new GFEColor(_border.FrameColor.LeftValue.Color)))
                                _values[1] = -1;

                            // right
                            // _sizeRight == null znamená, že obsahy nejsou stejné
                            if (_sizeRight != _border.Width.RightValue
                                && _sizeRight != null)
                                _sizeRight = null;

                            // right
                            // _styleRight == null znamená, že obsahy nejsou stejné
                            if (_styleRight != _border.DashStyle.RightValue
                                && _styleRight != null)
                                _styleRight = null;

                            // _values[2] == -1 znamená, že obsahy nejsou stejné
                            if (_values[2] != -1
                                && _values[2] != GetIndex(cbBarvaRight, new GFEColor(_border.FrameColor.RightValue.Color)))
                                _values[2] = -1;

                            // bottom
                            // _sizeBottom == null znamená, že obsahy nejsou stejné
                            if (_sizeBottom != _border.Width.BottomValue
                                && _sizeBottom != null)
                                _sizeBottom = null;

                            // _styleBottom == null znamená, že obsahy nejsou stejné
                            if (_styleBottom != _border.DashStyle.BottomValue
                                && _styleBottom != null)
                                _styleBottom = null;

                            // _values[3] == -1 znamená, že obsahy nejsou stejné
                            if (_values[3] != -1
                                && _values[3] != GetIndex(cbBarvaBottom, new GFEColor(_border.FrameColor.BottomValue.Color)))
                                _values[3] = -1;

                            // all
                            // _sizeAll == null znamená, že obsahy nejsou stejné
                            if (_sizeAll != _border.Width.AllValue
                                && _sizeAll != null)
                                _sizeAll = null;

                            // _styleAll == null znamená, že obsahy nejsou stejné
                            if (_styleAll != _border.DashStyle.AllValue
                                && _styleAll != null)
                                _styleAll = null;

                            // _values[4] == -1 znamená, že obsahy nejsou stejné
                            if (_values[4] != -1
                                && _border.FrameColor.AllValue != null
                                && _values[4] != GetIndex(cbBarvaAll, new GFEColor(_border.FrameColor.AllValue.Color)))
                                _values[4] = -1;

                            if (_corners != -1 && Convert.ToInt32(_border.Corners) != _corners)
                                _corners = -1;
                        }
                    }

                    // top
                    if (_sizeTop != null)
                        tbSirkaTop.Text = _sizeTop;
                    if (_spacingTop != null)
                        tbOdsazeniTop.Text = _spacingTop;
                    if (_styleTop != null)
                        cbStylTop.Text = ComplexDashStyle.ToCzName(_styleTop);
                    cbBarvaTop.SelectedIndex = _values[0];

                    // left
                    if (_sizeLeft != null)
                        tbSirkaLeft.Text = _sizeLeft;
                    if (_spacingLeft != null)
                        tbOdsazeniLeft.Text = _spacingLeft;
                    if (_styleLeft != null)
                        cbStylLeft.Text = ComplexDashStyle.ToCzName(_styleLeft);
                    cbBarvaLeft.SelectedIndex = _values[1];

                    // right
                    if (_sizeRight != null)
                        tbSirkaRight.Text = _sizeRight;
                    if (_spacingRight != null)
                        tbOdsazeniRight.Text = _spacingRight;
                    if (_styleRight != null)
                        cbStylRight.Text = ComplexDashStyle.ToCzName(_styleRight);
                    cbBarvaRight.SelectedIndex = _values[2];

                    // bottom
                    if (_sizeBottom != null)
                        tbSirkaBottom.Text = _sizeBottom;
                    if (_spacingBottom != null)
                        tbOdsazeniBottom.Text = _spacingBottom;
                    if (_styleBottom != null)
                        cbStylBottom.Text = ComplexDashStyle.ToCzName(_styleBottom);
                    cbBarvaBottom.SelectedIndex = _values[3];

                    // all
                    if (_sizeAll != null)
                        tbSirkaAll.Text = _sizeAll;
                    if (_spacingAll != null)
                        tbOdsazeniAll.Text = _spacingAll;
                    if (_styleAll != null)
                    {
                        string st = ComplexDashStyle.ToCzName(_styleAll);
                        if (st != ComplexDashStyle.Unspec)
                            cbStylAll.Text = st;
                    }
                    if (_values[4] != -1)
                        cbBarvaAll.SelectedIndex = _values[4];

                    cbUmisteni.SelectedIndex = _inside;
                    nudRadius.Value = angleText != null ? decimal.Parse(angleText) : 0;
                    if (_corners != -1)
                        cbCorners.SelectedIndex = _corners;
                }
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " SurroundPanel:" + ex.Message); }
            _sirkaTop = false;
            _sirkaLeft = false;
            _sirkaRight = false;
            _sirkaBottom = false;

            _odsazeniTop = false;
            _odsazeniLeft = false;
            _odsazeniRight = false;
            _odsazeniBottom = false;

            _styleTopChanged = false;
            _styleLeftChanged = false;
            _styleRightChanged = false;
            _styleBottomChanged = false;

            _colorTop = false;
            _colorLeft = false;
            _colorRight = false;
            _colorBottom = false;

            _position = false;
            _angleChanged = false;
            _cornersChanged = false;
            isLoad = false;
        }
        /// <summary>
        /// Reakce na akceptace změn
        /// </summary>
        /// <returns>TRUE- změna provedená</returns>
        protected override bool Accept()
        {
            if (Service == null)
                return true;

            if (_position
                || _angleChanged || _cornersChanged
                || _colorBottom || _colorRight || _colorLeft || _colorTop
                || _styleBottomChanged || _styleRightChanged || _styleLeftChanged || _styleTopChanged
                || _odsazeniBottom || _odsazeniRight || _odsazeniLeft || _odsazeniTop
                || _sirkaTop || _sirkaLeft || _sirkaRight || _sirkaBottom)
            {
                if (!UndoRedoService.IsTransactionStarted)
                    UndoRedoService.StartTransaction(GResources.GetResourceText(29450479)); //RC 29450479 : změna orámování

                foreach (object item in Service.SelectedComponents)
                {
                    if (!(item is ISurroundable sur))
                        continue;

                    //pokud 'Šířka' byla pozměněná, pak jí předáme
                    if (_sirkaTop)
                        sur.Surround.Width.TopValue = tbSirkaTop.Text;

                    // v případě, že Barva je daná, pak jí předáme
                    if (cbBarvaTop.SelectedIndex != -1 && _colorTop)
                    {
                        sur.Surround.FrameColor.TopValue = new URComplexColor();
                        sur.Surround.FrameColor.TopValue.Initialize(((ColorComboBox.ColorDescriptor)cbBarvaTop.Items[cbBarvaTop.SelectedIndex]).Color);
                    }
                    // v případě, že Barva písma je daná, pak ji předáme
                    if (cbStylTop.SelectedIndex != -1 && _styleTopChanged)
                        sur.Surround.DashStyle.TopValue = ComplexDashStyle.Parse(cbStylTop.SelectedItem as string);
                    if (_odsazeniTop && item is ITagComponent)
                        (item as ITagComponent).Spacing.TopValue = tbOdsazeniTop.Text;


                    // left
                    //pokud 'Šířka' byla pozměněná, pak jí předáme
                    if (_sirkaLeft)
                        sur.Surround.Width.LeftValue = tbSirkaLeft.Text;
                    if (_odsazeniLeft && item is ITagComponent)
                        (item as ITagComponent).Spacing.LeftValue = tbOdsazeniLeft.Text;

                    // v případě, že Barva je daná, pak jí předáme
                    if (cbBarvaLeft.SelectedIndex != -1 && _colorLeft)
                    {
                        sur.Surround.FrameColor.LeftValue = new URComplexColor();
                        sur.Surround.FrameColor.LeftValue.Initialize(((ColorComboBox.ColorDescriptor)cbBarvaLeft.Items[cbBarvaLeft.SelectedIndex]).Color);
                    }
                    // v případě, že Barva písma je daná, pak ji předáme
                    if (cbStylLeft.SelectedIndex != -1 && _styleLeftChanged)
                        sur.Surround.DashStyle.LeftValue = ComplexDashStyle.Parse(cbStylLeft.SelectedItem as string);

                    // right
                    //pokud 'Šířka' byla pozměněná, pak jí předáme
                    if (_sirkaRight)
                        sur.Surround.Width.RightValue = tbSirkaRight.Text;
                    if (_odsazeniRight && item is ITagComponent)
                        (item as ITagComponent).Spacing.RightValue = tbOdsazeniRight.Text;

                    // v případě, že Barva je daná, pak jí předáme
                    if (cbBarvaRight.SelectedIndex != -1 && _colorRight)
                    {
                        sur.Surround.FrameColor.RightValue = new URComplexColor();
                        sur.Surround.FrameColor.RightValue.Initialize(((ColorComboBox.ColorDescriptor)cbBarvaRight.Items[cbBarvaRight.SelectedIndex]).Color);
                    }
                    // v případě, že Barva písma je daná, pak ji předáme
                    if (cbStylRight.SelectedIndex != -1 && _styleRightChanged)
                        sur.Surround.DashStyle.RightValue = ComplexDashStyle.Parse(cbStylRight.SelectedItem as string);

                    // bottom
                    //pokud 'Šířka' byla pozměněná, pak jí předáme
                    if (_sirkaBottom)
                        sur.Surround.Width.BottomValue = tbSirkaBottom.Text;
                    if (_odsazeniBottom && item is ITagComponent)
                        (item as ITagComponent).Spacing.BottomValue = tbOdsazeniBottom.Text;

                    // v případě, že Barva je daná, pak jí předáme
                    if (cbBarvaBottom.SelectedIndex != -1 && _colorBottom)
                    {
                        sur.Surround.FrameColor.BottomValue = new URComplexColor();
                        sur.Surround.FrameColor.BottomValue.Initialize(((ColorComboBox.ColorDescriptor)cbBarvaBottom.Items[cbBarvaBottom.SelectedIndex]).Color);
                    }
                    // v případě, že Barva písma je daná, pak ji předáme
                    if (cbStylBottom.SelectedIndex != -1 && _styleBottomChanged)
                        sur.Surround.DashStyle.BottomValue = ComplexDashStyle.Parse(cbStylBottom.SelectedItem as string);

                    if (cbUmisteni.SelectedIndex != -1 && _position)
                        sur.Surround.InsideBorder = cbUmisteni.SelectedIndex == 1;

                    if (_angleChanged)
                        sur.Surround.Radius = int.Parse(Convert.ToString(nudRadius.Value));

                    if (_cornersChanged)
                        sur.Surround.Corners = (ComplexSurroundCorners)cbCorners.SelectedIndex;
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
                SetupLocalizedXFRM(AssemblyName + ".Resources.forms.property.SurroundPanel.xfrm");

                tbSirkaTop = (GLabeledTextBox)ControlDictionary["tbSirkaTop"];
                tbSirkaTop.TextChanged += delegate { _sirkaTop = true; RepaintPreview(); };
                tbSirkaTop.GotFocus += _GotFocus;
                tbSirkaTop.MouseClick += _GotFocus;

                tbSirkaLeft = (GLabeledTextBox)ControlDictionary["tbSirkaLeft"];
                tbSirkaLeft.TextChanged += delegate { _sirkaLeft = true; RepaintPreview(); };
                tbSirkaLeft.GotFocus += _GotFocus;
                tbSirkaLeft.MouseClick += _GotFocus;

                tbSirkaRight = (GLabeledTextBox)ControlDictionary["tbSirkaRight"];
                tbSirkaRight.TextChanged += delegate { _sirkaRight = true; RepaintPreview(); };
                tbSirkaRight.GotFocus += _GotFocus;
                tbSirkaRight.MouseClick += _GotFocus;

                tbSirkaBottom = (GLabeledTextBox)ControlDictionary["tbSirkaBottom"];
                tbSirkaBottom.TextChanged += delegate { _sirkaBottom = true; RepaintPreview(); };
                tbSirkaBottom.GotFocus += _GotFocus;
                tbSirkaBottom.MouseClick += _GotFocus;

                tbSirkaAll = (GLabeledTextBox)ControlDictionary["tbSirkaAll"];
                tbSirkaAll.TextChanged += delegate
                {
                    isRepainting = true;
                    tbSirkaTop.Text = tbSirkaLeft.Text = tbSirkaRight.Text = tbSirkaBottom.Text = tbSirkaAll.Text;
                    isRepainting = false;
                    RepaintPreview();
                };
                tbSirkaAll.GotFocus += _GotFocus;
                tbSirkaAll.MouseClick += _GotFocus;

                tbOdsazeniTop = (GLabeledTextBox)ControlDictionary["tbOdsazeniTop"];
                tbOdsazeniTop.TextChanged += delegate { _odsazeniTop = true; RepaintPreview(); };
                tbOdsazeniTop.GotFocus += _GotFocus;
                tbOdsazeniTop.MouseClick += _GotFocus;

                tbOdsazeniLeft = (GLabeledTextBox)ControlDictionary["tbOdsazeniLeft"];
                tbOdsazeniLeft.TextChanged += delegate { _odsazeniLeft = true; RepaintPreview(); };
                tbOdsazeniLeft.GotFocus += _GotFocus;
                tbOdsazeniLeft.MouseClick += _GotFocus;

                tbOdsazeniRight = (GLabeledTextBox)ControlDictionary["tbOdsazeniRight"];
                tbOdsazeniRight.TextChanged += delegate { _odsazeniRight = true; RepaintPreview(); };
                tbOdsazeniRight.GotFocus += _GotFocus;
                tbOdsazeniRight.MouseClick += _GotFocus;

                tbOdsazeniBottom = (GLabeledTextBox)ControlDictionary["tbOdsazeniBottom"];
                tbOdsazeniBottom.TextChanged += delegate { _odsazeniBottom = true; RepaintPreview(); };
                tbOdsazeniBottom.GotFocus += _GotFocus;
                tbOdsazeniBottom.MouseClick += _GotFocus;

                tbOdsazeniAll = (GLabeledTextBox)ControlDictionary["tbOdsazeniAll"];
                tbOdsazeniAll.TextChanged += delegate
                {
                    isRepainting = true;
                    tbOdsazeniLeft.Text = tbOdsazeniRight.Text = tbOdsazeniTop.Text = tbOdsazeniBottom.Text = tbOdsazeniAll.Text;
                    isRepainting = false;
                    RepaintPreview();
                };
                tbOdsazeniAll.GotFocus += _GotFocus;
                tbOdsazeniAll.MouseClick += _GotFocus;

                cbStylTop = (GLabeledComboBox)ControlDictionary["cbStylTop"];
                cbStylTop.SelectedIndexChanged += delegate
                {
                    if (!isLoad)
                    { _styleTopChanged = true; RepaintPreview(); }
                };
                cbStylLeft = (GLabeledComboBox)ControlDictionary["cbStylLeft"];
                cbStylLeft.SelectedIndexChanged += delegate
                {
                    if (!isLoad)
                    { _styleLeftChanged = true; RepaintPreview(); }
                };
                cbStylRight = (GLabeledComboBox)ControlDictionary["cbStylRight"];
                cbStylRight.SelectedIndexChanged += delegate
                {
                    if (!isLoad)
                    { _styleRightChanged = true; RepaintPreview(); }
                };
                cbStylBottom = (GLabeledComboBox)ControlDictionary["cbStylBottom"];
                cbStylBottom.SelectedIndexChanged += delegate
                {
                    if (!isLoad)
                    { _styleBottomChanged = true; RepaintPreview(); }
                };
                cbStylAll = (GLabeledComboBox)ControlDictionary["cbStylAll"];
                cbStylAll.SelectedIndexChanged += delegate
                {
                    if (!isLoad)
                    {
                        isRepainting = true;
                        cbStylTop.SelectedIndex = cbStylRight.SelectedIndex = cbStylLeft.SelectedIndex = cbStylBottom.SelectedIndex = cbStylAll.SelectedIndex;
                        isRepainting = false;
                        RepaintPreview();
                    }
                };
                cbUmisteni = (GLabeledComboBox)ControlDictionary["cbUmisteni"];
                cbUmisteni.SelectedIndexChanged += delegate { _position = true; RepaintPreview(); };

                pnlPreview = (PFrame)ControlDictionary["pnlPreview"];
                pnlPreview.Paint += delegate { RepaintPreview(); };

                cbBarvaTop = (ColorComboBox)ControlDictionary["cbBarvaTop"];
                cbBarvaTop.DrawItem += CbDrawItem;
                cbBarvaTop.SelectedIndexChanged += delegate { _colorTop = true; RepaintPreview(); };
                cbBarvaLeft = (ColorComboBox)ControlDictionary["cbBarvaLeft"];
                cbBarvaLeft.DrawItem += CbDrawItem;
                cbBarvaLeft.SelectedIndexChanged += delegate { _colorLeft = true; RepaintPreview(); };
                cbBarvaRight = (ColorComboBox)ControlDictionary["cbBarvaRight"];
                cbBarvaRight.DrawItem += CbDrawItem;
                cbBarvaRight.SelectedIndexChanged += delegate { _colorRight = true; RepaintPreview(); };
                cbBarvaBottom = (ColorComboBox)ControlDictionary["cbBarvaBottom"];
                cbBarvaBottom.DrawItem += CbDrawItem;
                cbBarvaBottom.SelectedIndexChanged += delegate { _colorBottom = true; RepaintPreview(); };
                cbBarvaAll = (ColorComboBox)ControlDictionary["cbBarvaAll"];
                cbBarvaAll.DrawItem += CbDrawItem;
                cbBarvaAll.SelectedIndexChanged += delegate
                {
                    isRepainting = true;
                    // nastavíme všechny 
                    cbBarvaTop.SelectedIndex = cbBarvaRight.SelectedIndex = cbBarvaLeft.SelectedIndex = cbBarvaBottom.SelectedIndex = cbBarvaAll.SelectedIndex;
                    isRepainting = false;
                    // překreslíme panel
                    RepaintPreview();
                };

                nudRadius = (NumericUpDown)ControlDictionary["nudRadius"];
                nudRadius.ValueChanged += delegate { _angleChanged = true; RepaintPreview(); };
                nudRadius.Maximum = new decimal(new int[] { 360, 0, 0, 0 });
                nudRadius.Minimum = new decimal(new int[] { 0, 0, 0, 0 });

                cbCorners = (GLabeledComboBox)ControlDictionary["cbCorners"];
                cbCorners.SelectedIndexChanged += delegate { _cornersChanged = true; RepaintPreview(); };
                cbCorners.Items.AddRange(ComplexSurround.ListCorners.ToArray());

                RefreshComboBoxes();
                SetDefault();
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " SurroundPanel.xfrm:" + ex.Message); }
        }

        private void _GotFocus(object sender, EventArgs e)
        {
            (sender as GLabeledTextBox).SelectAll();
        }

        /// <summary>
        /// Podmínky viditelnosti daného panelu
        /// </summary>
        /// <returns>TRUE - podmínka je splněná</returns>
        public override bool VisibleCondition() => view == null
            ? base.VisibleCondition()
            : Service != null && Service.SelectedComponents.Exists(item => item is ISurroundable);

        #endregion

        //indikuje, že text 'Šířka' byl záměrně pozměněn
        bool
            _sirkaTop = false
            , _sirkaLeft = false
            , _sirkaRight = false
            , _sirkaBottom = false

        //indikuje, že text 'Odsazení' byl záměrně pozměněn        
            , _odsazeniTop = false
            , _odsazeniLeft = false
            , _odsazeniRight = false
            , _odsazeniBottom = false

        // indikuje změnu stylu
            , _styleTopChanged = false
            , _styleLeftChanged = false
            , _styleRightChanged = false
            , _styleBottomChanged = false

        // indikuje změnu barvy
            , _colorTop = false
            , _colorLeft = false
            , _colorRight = false
            , _colorBottom = false

        // indikuje záměrnou změnu umístění
            , _position = false
            , _angleChanged = false
            , _cornersChanged = false;

        GLabeledTextBox tbSirkaTop, tbSirkaLeft, tbSirkaRight, tbSirkaBottom, tbSirkaAll;
        GLabeledTextBox tbOdsazeniTop, tbOdsazeniLeft, tbOdsazeniRight, tbOdsazeniBottom, tbOdsazeniAll;
        GLabeledComboBox cbStylTop, cbStylLeft, cbStylRight, cbStylBottom, cbStylAll, cbUmisteni;
        GLabeledComboBox cbCorners;
        ColorComboBox cbBarvaTop, cbBarvaLeft, cbBarvaRight, cbBarvaBottom, cbBarvaAll;

        /// <summary>
        /// Barva pozadí stisknutého tlačítka
        /// </summary>
        Bitmap _backBuffer = null;
        PFrame pnlPreview;
        NumericUpDown nudRadius;
        string angleText;
        bool isRepainting;
        void RefreshComboBoxes()
        {
            List<ColorComboBox.ColorDescriptor> colors = new List<ColorComboBox.ColorDescriptor>();

            foreach (var item in ColorService.ColorNameCzEn)
                colors.Add(new ColorComboBox.ColorDescriptor(item));

            cbBarvaTop.Items.Clear();
            cbBarvaTop.Items.AddRange(colors.ToArray());
            cbBarvaLeft.Items.Clear();
            cbBarvaLeft.Items.AddRange(colors.ToArray());
            cbBarvaRight.Items.Clear();
            cbBarvaRight.Items.AddRange(colors.ToArray());
            cbBarvaBottom.Items.Clear();
            cbBarvaBottom.Items.AddRange(colors.ToArray());
            cbBarvaAll.Items.Clear();
            cbBarvaAll.Items.AddRange(colors.ToArray());
            cbBarvaTop.Invalidate();

            cbStylTop.Items.Clear();
            cbStylTop.Items.AddRange(CommonService.FloatDashStyles.Values.ToArray());
            //cbStylTop.Items.AddRange(new string[] { "plná", "čárkovaná", "tečkovaná", "dvojitá", "nespecifikováno" });
            cbStylLeft.Items.Clear();
            cbStylLeft.Items.AddRange(CommonService.FloatDashStyles.Values.ToArray());
            //cbStylLeft.Items.AddRange(new string[] { "plná", "čárkovaná", "tečkovaná", "dvojitá", "nespecifikováno" });
            cbStylRight.Items.Clear();
            cbStylRight.Items.AddRange(CommonService.FloatDashStyles.Values.ToArray());
            //cbStylRight.Items.AddRange(new string[] { "plná", "čárkovaná", "tečkovaná", "dvojitá", "nespecifikováno" });
            cbStylBottom.Items.Clear();
            cbStylBottom.Items.AddRange(CommonService.FloatDashStyles.Values.ToArray());
            //cbStylBottom.Items.AddRange(new string[] { "plná", "čárkovaná", "tečkovaná", "dvojitá", "nespecifikováno" });
            cbStylAll.Items.Clear();
            cbStylAll.Items.AddRange(CommonService.FloatDashStyles.Values.ToArray());
            //cbStylAll.Items.AddRange(new string[] { "plná", "čárkovaná", "tečkovaná", "dvojitá", "nespecifikováno" });

            cbUmisteni.Items.Clear();
            cbUmisteni.Items.AddRange(new string[] { GResources.GetResourceText(29450480), GResources.GetResourceText(29450481) }); //RC 29450481 : ano
        }
        void CbDrawItem(object sender, DrawItemEventArgs e)
        {
            ComboBox comboBox = (ComboBox)sender;
            e.DrawBackground();

            Rectangle drawingRect = new Rectangle(e.Bounds.X, e.Bounds.Y, e.Bounds.Width, e.Bounds.Height);

            Brush drawItemBrush = SystemBrushes.WindowText;
            if ((e.State & DrawItemState.Selected) == DrawItemState.Selected)
                drawItemBrush = SystemBrushes.HighlightText;

            if (e.Index >= 0)
            {
                if (sender is FontComboBox)
                    (sender as FontComboBox).ComboBoxDrawItem(e);
                else if (sender is FontStyleComboBox)
                    (sender as FontStyleComboBox).ComboBoxDrawItem(e);
                else if (sender is ColorComboBox)
                    (sender as ColorComboBox).ComboBoxDrawItem(e);
            }

            e.DrawFocusRectangle();
        }
        void DrawGray(Graphics graphics)
        {
            using (SolidBrush brush = new SolidBrush(Color.Gray))
            using (Pen pen = new Pen(brush))
            {
                graphics.DrawLines(pen, new Point[3] { new Point(15, 5), new Point(15, 15), new Point(5, 15) });
                graphics.DrawLines(pen, new Point[3] { new Point(pnlPreview.Width - 20, 5), new Point(pnlPreview.Width - 20, 15), new Point(pnlPreview.Width - 10, 15) });
                graphics.DrawLines(pen, new Point[3] { new Point(5, pnlPreview.Height - 20), new Point(15, pnlPreview.Height - 20), new Point(15, pnlPreview.Height - 10) });
                graphics.DrawLines(pen, new Point[3] { new Point(pnlPreview.Width - 10, pnlPreview.Height - 20), new Point(pnlPreview.Width - 20, pnlPreview.Height - 20), new Point(pnlPreview.Width - 20, pnlPreview.Height - 10) });
            }
        }
        void SetByRule(ref SizeValue value)
        {
            //Nastavení hodnoty dle pravidla:
            //celé kladné číslo v rozmezí od 0 do 25, 
            //které udává přesnou velikost v twipech  
            //dle pravidla 0 = 0 twipů, 1=1twip, a poté vždy N-1 násobek 10 twipů 
            //(tzn. 2 = 10twipů, 3 = 20twipů, atd.)
            double _unsp = value;
            if (_unsp == 0 && !string.IsNullOrEmpty(value.Value) && string.IsNullOrEmpty(value.Metrics))
                try { _unsp = Convert.ToInt32(value.Value); }
                catch { _unsp = 0; }

            //Zkusíme převést hodnotu
            if (_unsp < 0)
                _unsp = 0;

            //pokud hodnota je větší než 25, pak se převede na twipy
            if (_unsp > 25)
            {
                value = new SizeValue((_unsp - 1) * 10, "tw");
                return;
            }

            if (_unsp > 1)
                _unsp = (_unsp - 1) * 10;

            value = new SizeValue(_unsp * 96 / 1440, "px");
        }
        void RepaintPreview()
        {
            if (isRepainting)
                return;

            //kreslení komponenty
            _backBuffer = new Bitmap(pnlPreview.Width, pnlPreview.Height);
            Graphics graphics = Graphics.FromImage(_backBuffer);
            graphics.Clear(Color.White);
            DrawGray(graphics);

            // top
            SizeValue _widthTop = new SizeValue(tbSirkaTop.Text);
            // pokud hodnota zadaná bez metriky, pak ji zkusíme převest dle pravidla
            if (string.IsNullOrEmpty(_widthTop.Metrics))
                SetByRule(ref _widthTop);

            SizeValue _toppadding = new SizeValue(tbOdsazeniTop.Text);
            // pokud hodnota zadaná bez metriky, pak ji zkusíme převest dle pravidla
            if (string.IsNullOrEmpty(_toppadding.Metrics))
                SetByRule(ref _toppadding);

            float _yDiff = cbUmisteni.SelectedIndex == 1 ? _widthTop / 2 : 0;
            _yDiff += _toppadding;

            float _yLeftTop = _yDiff, _yRightTop = _yDiff;

            SizeValue _widthLeft = new SizeValue(tbSirkaLeft.Text);
            // pokud hodnota zadaná bez metriky, pak ji zkusíme převest dle pravidla
            if (string.IsNullOrEmpty(_widthLeft.Metrics))
                SetByRule(ref _widthLeft);

            SizeValue _leftpadding = new SizeValue(tbOdsazeniLeft.Text);
            // pokud hodnota zadaná bez metriky, pak ji zkusíme převest dle pravidla
            if (string.IsNullOrEmpty(_leftpadding.Metrics))
                SetByRule(ref _leftpadding);

            float _xDiff = cbUmisteni.SelectedIndex == 1 ? _widthLeft / 2 : 0;
            _xDiff += _leftpadding;

            float _xLeftTop = _xDiff, _xLeftBottom = _xDiff;

            SizeValue _widthRight = new SizeValue(tbSirkaRight.Text);
            // pokud hodnota zadaná bez metriky, pak ji zkusíme převest dle pravidla
            if (string.IsNullOrEmpty(_widthRight.Metrics))
                SetByRule(ref _widthRight);

            SizeValue _rightpadding = new SizeValue(tbOdsazeniRight.Text);
            // pokud hodnota zadaná bez metriky, pak ji zkusíme převest dle pravidla
            if (string.IsNullOrEmpty(_rightpadding.Metrics))
                SetByRule(ref _rightpadding);

            float _xDiffright = cbUmisteni.SelectedIndex == 1 ? _widthRight / 2 : 0;
            _xDiffright += _rightpadding;

            float _xRightTop = _xDiffright, _xRightBottom = _xDiffright;

            SizeValue _widthBottom = new SizeValue(tbSirkaBottom.Text);
            // pokud hodnota zadaná bez metriky, pak ji zkusíme převest dle pravidla
            if (string.IsNullOrEmpty(_widthBottom.Metrics))
                SetByRule(ref _widthBottom);

            SizeValue _bottompadding = new SizeValue(tbOdsazeniBottom.Text);
            // pokud hodnota zadaná bez metriky, pak ji zkusíme převest dle pravidla
            if (string.IsNullOrEmpty(_bottompadding.Metrics))
                SetByRule(ref _bottompadding);

            float _yDiffbottom = cbUmisteni.SelectedIndex == 1 ? _widthBottom / 2 : 0;
            _yDiffbottom += _bottompadding;

            float _yLeftBottom = _yDiffbottom, _yRightBottom = _yDiffbottom;

            DrawLeftSide(graphics, _widthLeft, _xLeftTop, _yLeftTop, _xLeftBottom, _yLeftBottom);
            DrawTopSide(graphics, _widthTop, _xLeftTop, _yLeftTop, _xRightTop, _yRightTop);
            DrawRightSide(graphics, _widthRight, _xRightTop, _yRightTop, _xRightBottom, _yRightBottom);
            DrawBottomSide(graphics, _widthBottom, _xLeftBottom, _yLeftBottom, _xRightBottom, _yRightBottom);
            //Copy the back buffer to the screen
            pnlPreview.CreateGraphics().DrawImageUnscaled(_backBuffer, 0, 0);
        }

        void DrawBottomSide(Graphics graphics, float _widthBottom, float _xLeftBottom, float _yLeftBottom, float _xRightBottom, float _yRightBottom)
        {
            // bottom
            if (_widthBottom != 0)
            {
                if (cbBarvaBottom.SelectedIndex != -1 && cbStylBottom.SelectedIndex != -1)
                {
                    ColorComboBox.ColorDescriptor _colorDescriptor = cbBarvaBottom.SelectedIndex != -1 ? (ColorComboBox.ColorDescriptor)cbBarvaBottom.Items[cbBarvaBottom.SelectedIndex] : new ColorComboBox.ColorDescriptor();
                    using (Pen pen = new Pen(_colorDescriptor.Color, _widthBottom))
                    {
                        float[] pattern = ComplexDashStyle.GetDashPattern(cbStylBottom.SelectedItem != null ? cbStylBottom.SelectedItem.ToString() : "");
                        // prázdné pole je hodnota "nespecifikováno"
                        if ((pattern.Length > 0
                            // záporná hodnota v poli nesmí být - jinak se jedná o "nespecifikováno"
                            && pattern.Min() >= 0)
                            || pen.DashStyle == DashStyle.Custom)
                        {
                            // hodnota 0 znamená že se jedná o dvojitou čáru
                            if (pen.DashStyle != DashStyle.Custom && pattern.Min() > 0)
                            {
                                pen.DashPattern = pattern;
                                DrawBottom(graphics, pen, new PointF(15, 15), new SizeF(pnlPreview.Width - 35, pnlPreview.Height - 35));
                            }
                            else
                            // kreslíme dvojitou čáru
                            {
                                pen.DashStyle = System.Drawing.Drawing2D.DashStyle.Custom;
                                PointF _locOut = new PointF(15 - pen.Width * 3 / 2, 15 - pen.Width * 3 / 2),
                                    _locInt = new PointF(15 + pen.Width / 2, 15 + pen.Width / 2);
                                SizeF _sizeOut = new SizeF(pnlPreview.Width - 35 + 3 * pen.Width, pnlPreview.Height - 35 + 3 * pen.Width),
                                    _sizeInt = new SizeF(pnlPreview.Width - 35 - pen.Width, pnlPreview.Height - 35 - pen.Width);

                                DrawBottom(graphics, pen, _locOut, _sizeOut);
                                DrawBottom(graphics, pen, _locInt, _sizeInt);
                            }
                        }
                    }
                }
            }

        }
        void DrawBottom(Graphics graphics, Pen pen, PointF location, SizeF size)
        {
            int radius = (int)nudRadius.Value;
            ComplexSurroundCorners crnrs = cbCorners.SelectedIndex != -1 ? (ComplexSurroundCorners)cbCorners.SelectedIndex : ComplexSurroundCorners.None;
            if (radius != 0)
                if (cbUmisteni.SelectedIndex == 1)
                    RoundedRectangle.DrawRectangle(graphics, pen
                        , location.X + pen.Width / 2
                        , location.Y + size.Height - pen.Width / 2
                        , size.Width - pen.Width
                        , 0
                        , radius
                        , crnrs
                        , RoundedRectangle.RectangleSides.Bottom);
                else
                    RoundedRectangle.DrawRectangle(graphics, pen
                        , location.X
                        , location.Y + size.Height
                        , size.Width
                        , 0
                        , radius
                        , crnrs
                        , RoundedRectangle.RectangleSides.Bottom);
            else
                if (cbUmisteni.SelectedIndex == 1)
                RoundedRectangle.DrawRectangle(graphics, pen
                    , location.X
                    , location.Y + size.Height - pen.Width / 2
                    , size.Width
                    , 0
                    , radius
                    , crnrs
                    , RoundedRectangle.RectangleSides.Bottom);
            else
                RoundedRectangle.DrawRectangle(graphics, pen
                    , location.X - pen.Width / 2
                    , location.Y + size.Height
                    , size.Width + pen.Width
                    , 0
                    , radius
                    , crnrs
                    , RoundedRectangle.RectangleSides.Bottom);
        }

        void DrawRightSide(Graphics graphics, float _widthRight, float _xRightTop, float _yRightTop, float _xRightBottom, float _yRightBottom)
        {
            // right
            if (_widthRight != 0)
            {
                if (cbBarvaRight.SelectedIndex != -1
                    && cbStylRight.SelectedIndex != -1)
                {
                    ColorComboBox.ColorDescriptor _colorDescriptor = cbBarvaRight.SelectedIndex != -1 ? (ColorComboBox.ColorDescriptor)cbBarvaRight.Items[cbBarvaRight.SelectedIndex] : new ColorComboBox.ColorDescriptor();
                    using (Pen pen = new Pen(_colorDescriptor.Color, _widthRight))
                    {
                        float[] pattern = ComplexDashStyle.GetDashPattern(cbStylRight.SelectedItem != null ? cbStylRight.SelectedItem.ToString() : "");
                        // prázdné pole je hodnota "nespecifikováno"
                        if ((pattern.Length > 0
                            // záporná hodnota v poli nesmí být - jinak se jedná o "nespecifikováno"
                            && pattern.Min() >= 0)
                            || pen.DashStyle == DashStyle.Custom)
                        {
                            // hodnota 0 znamená že se jedná o dvojitou čáru
                            if (pen.DashStyle != DashStyle.Custom && pattern.Min() > 0)
                            {
                                pen.DashPattern = pattern;
                                DrawRight(graphics, pen, new PointF(15, 15), new SizeF(pnlPreview.Width - 35, pnlPreview.Height - 35));
                            }
                            else
                            // kreslíme dvojitou čáru
                            {
                                pen.DashStyle = System.Drawing.Drawing2D.DashStyle.Custom;
                                PointF _locOut = new PointF(15 - pen.Width, 15 - pen.Width * 3 / 2),
                                    _locInt = new PointF(15 + pen.Width, 15 + pen.Width / 2);
                                SizeF _sizeOut = new SizeF(pnlPreview.Width - 35 + 3 * pen.Width, pnlPreview.Height - 35 + 3 * pen.Width),
                                    _sizeInt = new SizeF(pnlPreview.Width - 35 - pen.Width, pnlPreview.Height - 35 - pen.Width);

                                DrawRight(graphics, pen, _locOut, _sizeOut);
                                DrawRight(graphics, pen, _locInt, _sizeInt);
                            }
                        }
                    }
                }
            }
        }
        void DrawRight(Graphics graphics, Pen pen, PointF location, SizeF size)
        {
            int radius = (int)nudRadius.Value;
            ComplexSurroundCorners crnrs = cbCorners.SelectedIndex != -1 ? (ComplexSurroundCorners)cbCorners.SelectedIndex : ComplexSurroundCorners.None;
            if (radius != 0)
                if (cbUmisteni.SelectedIndex == 1)
                    RoundedRectangle.DrawRectangle(graphics, pen
                        , location.X + size.Width - pen.Width / 2
                        , location.Y + pen.Width / 2
                        , 0
                        , size.Height - pen.Width
                        , radius
                        , crnrs
                        , RoundedRectangle.RectangleSides.Right);
                else
                    RoundedRectangle.DrawRectangle(graphics, pen
                        , location.X + size.Width
                        , location.Y
                        , 0
                        , size.Height
                        , radius
                        , crnrs
                        , RoundedRectangle.RectangleSides.Right);
            else
                if (cbUmisteni.SelectedIndex == 1)
                RoundedRectangle.DrawRectangle(graphics, pen
                    , location.X + size.Width - pen.Width / 2
                    , location.Y
                    , 0
                    , size.Height
                    , radius
                    , crnrs
                    , RoundedRectangle.RectangleSides.Right);
            else
                RoundedRectangle.DrawRectangle(graphics, pen
                    , location.X + size.Width
                    , location.Y - pen.Width / 2
                    , 0
                    , size.Height + pen.Width
                    , radius
                    , crnrs
                    , RoundedRectangle.RectangleSides.Right);
        }

        void DrawTopSide(Graphics graphics, float _widthTop, float _xLeftTop, float _yLeftTop, float _xRightTop, float _yRightTop)
        {
            // top
            if (_widthTop != 0)
            {
                if (cbBarvaTop.SelectedIndex != -1
                    && cbStylTop.SelectedIndex != -1)
                {
                    ColorComboBox.ColorDescriptor _colorDescriptor = cbBarvaTop.SelectedIndex != -1 ? (ColorComboBox.ColorDescriptor)cbBarvaTop.Items[cbBarvaTop.SelectedIndex] : new ColorComboBox.ColorDescriptor();
                    using (Pen pen = new Pen(_colorDescriptor.Color, _widthTop))
                    {
                        float[] pattern = ComplexDashStyle.GetDashPattern(cbStylTop.SelectedItem != null ? cbStylTop.SelectedItem.ToString() : "");
                        // prázdné pole je hodnota "nespecifikováno"
                        if ((pattern.Length > 0
                            // záporná hodnota v poli nesmí být - jinak se jedná o "nespecifikováno"
                            && pattern.Min() >= 0)
                            || pen.DashStyle == DashStyle.Custom)
                        {
                            // hodnota 0 znamená že se jedná o dvojitou čáru
                            if (pen.DashStyle != DashStyle.Custom && pattern.Min() > 0)
                            {
                                pen.DashPattern = pattern;
                                DrawTop(graphics, pen, new PointF(15, 15), new SizeF(pnlPreview.Width - 35, pnlPreview.Height - 35));
                            }
                            else
                            // kreslíme dvojitou čáru
                            {
                                pen.DashStyle = System.Drawing.Drawing2D.DashStyle.Custom;

                                PointF _locOut = new PointF(15 - pen.Width * 3 / 2, 15 - pen.Width * 3 / 2),
                                    _locInt = new PointF(15 + pen.Width / 2, 15 + pen.Width / 2);
                                SizeF _sizeOut = new SizeF(pnlPreview.Width - 35 + 3 * pen.Width, pnlPreview.Height - 35 + 3 * pen.Width),
                                    _sizeInt = new SizeF(pnlPreview.Width - 35 - pen.Width, pnlPreview.Height - 35 - pen.Width);

                                DrawTop(graphics, pen, _locOut, _sizeOut);
                                DrawTop(graphics, pen, _locInt, _sizeInt);
                            }
                        }
                    }
                }
            }

        }
        void DrawTop(Graphics graphics, Pen pen, PointF location, SizeF size)
        {
            int radius = (int)nudRadius.Value;
            ComplexSurroundCorners crnrs = cbCorners.SelectedIndex != -1 ? (ComplexSurroundCorners)cbCorners.SelectedIndex : ComplexSurroundCorners.None;
            if (radius != 0)
                if (cbUmisteni.SelectedIndex == 1)
                    RoundedRectangle.DrawRectangle(graphics, pen
                        , location.X + pen.Width / 2
                        , location.Y + pen.Width / 2
                        , size.Width - pen.Width
                        , 0
                        , radius
                        , crnrs
                        , RoundedRectangle.RectangleSides.Top);
                else
                    RoundedRectangle.DrawRectangle(graphics, pen
                        , location.X
                        , location.Y
                        , size.Width
                        , 0
                        , radius
                        , crnrs
                        , RoundedRectangle.RectangleSides.Top);
            else
                if (cbUmisteni.SelectedIndex == 1)
                RoundedRectangle.DrawRectangle(graphics, pen
                    , location.X
                    , location.Y + pen.Width / 2
                    , size.Width
                    , 0
                    , radius
                    , crnrs
                    , RoundedRectangle.RectangleSides.Top);
            else
                RoundedRectangle.DrawRectangle(graphics, pen
                    , location.X - pen.Width / 2
                    , location.Y
                    , size.Width + pen.Width
                    , 0
                    , radius
                    , crnrs
                    , RoundedRectangle.RectangleSides.Top);

        }
        void DrawLeftSide(Graphics graphics, float _widthLeft, float _xLeftTop, float _yLeftTop, float _xLeftBottom, float _yLeftBottom)
        {
            // left
            if (_widthLeft != 0)
                if (cbBarvaLeft.SelectedIndex != -1
                    && cbStylLeft.SelectedIndex != -1)
                {
                    ColorComboBox.ColorDescriptor _colorDescriptor = cbBarvaLeft.SelectedIndex != -1 ? (ColorComboBox.ColorDescriptor)cbBarvaLeft.Items[cbBarvaLeft.SelectedIndex] : new ColorComboBox.ColorDescriptor();
                    using (Pen pen = new Pen(_colorDescriptor.Color, _widthLeft))
                    {
                        float[] pattern = ComplexDashStyle.GetDashPattern(cbStylLeft.SelectedItem != null ? cbStylLeft.SelectedItem.ToString() : "");
                        // prázdné pole je hodnota "nespecifikováno"
                        if ((pattern.Length > 0
                            // záporná hodnota v poli nesmí být - jinak se jedná o "nespecifikováno"
                            && pattern.Min() >= 0)
                            || pen.DashStyle == DashStyle.Custom)
                        {
                            // hodnota 0 znamená že se jedná o dvojitou čáru
                            if (pen.DashStyle != DashStyle.Custom && pattern.Min() > 0)
                            {
                                pen.DashPattern = pattern;
                                DrawLeft(graphics, pen, new PointF(15, 15), new SizeF(pnlPreview.Width - 35, pnlPreview.Height - 35));
                            }
                            else
                            // kreslíme dvojitou čáru
                            // jedná se o kreslení 2xčáry vedle sebe s mezerou rovnou velikosti šířky péra
                            {
                                pen.DashStyle = System.Drawing.Drawing2D.DashStyle.Custom;
                                PointF _locOut = new PointF(15 - pen.Width * 3 / 2, 15 - pen.Width * 3 / 2),
                                    _locInt = new PointF(15 + pen.Width / 2, 15 + pen.Width / 2);
                                SizeF _sizeOut = new SizeF(pnlPreview.Width - 35 + 3 * pen.Width, pnlPreview.Height - 35 + 3 * pen.Width),
                                    _sizeInt = new SizeF(pnlPreview.Width - 35 - pen.Width, pnlPreview.Height - 35 - pen.Width);

                                DrawLeft(graphics, pen, _locOut, _sizeOut);
                                DrawLeft(graphics, pen, _locInt, _sizeInt);
                            }
                        }
                    }
                }
        }
        void DrawLeft(Graphics graphics, Pen pen, PointF location, SizeF size)
        {
            int radius = (int)nudRadius.Value;
            ComplexSurroundCorners crnrs = cbCorners.SelectedIndex != -1 ? (ComplexSurroundCorners)cbCorners.SelectedIndex : ComplexSurroundCorners.None;
            if (radius != 0)
                if (cbUmisteni.SelectedIndex == 1)
                    RoundedRectangle.DrawRectangle(graphics, pen
                        , location.X + pen.Width / 2
                        , location.Y + pen.Width / 2
                        , 0
                        , size.Height - pen.Width
                        , radius
                        , crnrs
                        , RoundedRectangle.RectangleSides.Left);
                else
                    RoundedRectangle.DrawRectangle(graphics, pen
                        , location.X
                        , location.Y
                        , 0
                        , size.Height
                        , radius
                        , crnrs
                        , RoundedRectangle.RectangleSides.Left);
            else
                if (cbUmisteni.SelectedIndex == 1)
                RoundedRectangle.DrawRectangle(graphics, pen
                    , location.X + pen.Width / 2
                    , location.Y
                    , 0
                    , size.Height
                    , radius
                    , crnrs
                    , RoundedRectangle.RectangleSides.Left);
            else
                RoundedRectangle.DrawRectangle(graphics, pen
                    , location.X
                    , location.Y - pen.Width / 2
                    , 0
                    , size.Height + pen.Width
                    , radius
                    , crnrs
                    , RoundedRectangle.RectangleSides.Left);
        }

        /// <summary>
        /// Získání indexu barvy
        /// </summary>
        /// <param name="list">Seznam barev</param>
        /// <param name="color">Barva</param>
        /// <returns></returns>
        int GetIndex(ColorComboBox list, GFEColor color)
        {
            for (int i = 0; i < list.Items.Count; i++)
                if ((list.Items[i] is ColorComboBox.ColorDescriptor)
                    && (list.Items[i] as ColorComboBox.ColorDescriptor).Color.Equals(color.Color))
                    return i;
            return -1;
        }
    }
}
