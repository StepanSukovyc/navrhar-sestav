//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.InnerSurroundPanel.cs                  </Name>
//    <Description> Panel vnitřního orámování                                   </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2022-11-27                                                  </Created>
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
    /// Panel vnitřního orámování
    /// </summary>
    class InnerSurroundPanel : AbstractPropertyPanel
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
                    -1      // left                    
                };

                    // odsazení rámečku
                    string
                        _styleUp = string.Empty,
                        _styleDown = string.Empty;

                    // šířka rámečku
                    string
                        _sizeUp = string.Empty,
                        _sizeDown = string.Empty;

                    tbSirkaUp.Text = string.Empty;
                    tbSirkaDown.Text = string.Empty;

                    cbStylUp.SelectedIndex = -1;
                    cbStylDown.SelectedIndex = -1;

                    cbBarvaUp.SelectedIndex = -1;
                    cbBarvaDown.SelectedIndex = -1;

                    bool first = true;

                    // projdeme všechny vybrané položky a zjistíme jejích hodnoty
                    foreach (object item in Service.SelectedComponents)
                    {
                        if (!(item is ISurroundable))
                            continue;

                        // zafixujeme Písmo vybraného objektu
                        var _border = (item as ISurroundable).InnerSurround;
                        if (_border == null)
                            continue;

                        // pokud je to první objekt, pak jeho vlastnosti nakopírujeme
                        if (first)
                        {
                            first = false;
                            // up
                            _sizeUp = _border.UpWidth.Value;
                            _styleUp = _border.UpDashStyle.Value;
                            if (_border.UpFrameColor != null)
                                _values[0] = GetIndex(cbBarvaUp, new GFEColor(_border.UpFrameColor));

                            // down
                            _sizeDown = _border.DownWidth.Value;
                            _styleDown = _border.DownDashStyle.Value;
                            if (!(_border.DownFrameColor is null))
                                _values[1] = GetIndex(cbBarvaDown, new GFEColor(_border.DownFrameColor));
                        }
                        else
                        {
                            // up
                            // _sizeUp == null znamená, že obsahy nejsou stejné
                            if (_sizeUp != _border.UpWidth.Value
                                && _sizeUp != null)
                                _sizeUp = null;

                            // _styleUp == null znamená, že obsahy nejsou stejné
                            if (_styleUp != _border.UpDashStyle.Value
                                && _styleUp != null)
                                _styleUp = null;

                            // _values[0] == -1 znamená, že obsahy nejsou stejné
                            if (_values[0] != -1
                                && _values[0] != GetIndex(cbBarvaUp, new GFEColor(_border.UpFrameColor.Color)))
                                _values[0] = -1;

                            // down
                            // _sizeDown == null znamená, že obsahy nejsou stejné
                            if (_sizeDown != _border.DownWidth.Value
                                && _sizeDown != null)
                                _sizeDown = null;

                            // _styleDown == null znamená, že obsahy nejsou stejné
                            if (_styleDown != _border.DownDashStyle.Value
                                && _styleDown != null)
                                _styleDown = null;

                            // _values[1] == -1 znamená, že obsahy nejsou stejné
                            if (_values[1] != -1
                                && _values[1] != GetIndex(cbBarvaDown, new GFEColor(_border.DownFrameColor.Color)))
                                _values[1] = -1;
                        }
                    }

                    // up
                    if (_sizeUp != null)
                        tbSirkaUp.Text = _sizeUp;
                    if (_styleUp != null)
                        cbStylUp.Text = ComplexDashStyle.ToCzName(_styleUp);
                    cbBarvaUp.SelectedIndex = _values[0];

                    // down
                    if (_sizeDown != null)
                        tbSirkaDown.Text = _sizeDown;
                    if (_styleDown != null)
                        cbStylDown.Text = ComplexDashStyle.ToCzName(_styleDown);
                    cbBarvaDown.SelectedIndex = _values[1];
                }
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " SurroundPanel:" + ex.Message); }
            _sirkaUp = false;
            _sirkaDown = false;

            _styleUpChanged = false;
            _styleDownChanged = false;

            _colorUp = false;
            _colorDown = false;
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

            if (_colorDown || _colorUp || _styleDownChanged || _styleUpChanged || _sirkaUp || _sirkaDown)
            {
                if (!UndoRedoService.IsTransactionStarted)
                    UndoRedoService.StartTransaction(GResources.GetResourceText(29450479)); //RC 29450479 : změna orámování

                foreach (object item in Service.SelectedComponents)
                {
                    if (!(item is ISurroundable sur))
                        continue;

                    //pokud 'Šířka' byla pozměněná, pak jí předáme
                    if (_sirkaUp)
                        sur.InnerSurround.UpWidth.Value = tbSirkaUp.Text;

                    // v případě, že Barva je daná, pak jí předáme
                    if (cbBarvaUp.SelectedIndex != -1 && _colorUp)
                    {
                        sur.InnerSurround.UpFrameColor = new URComplexColor();
                        sur.InnerSurround.UpFrameColor.Initialize(((ColorComboBox.ColorDescriptor)cbBarvaUp.Items[cbBarvaUp.SelectedIndex]).Color);
                    }
                    // v případě, že Barva písma je daná, pak ji předáme
                    if (cbStylUp.SelectedIndex != -1 && _styleUpChanged)
                        sur.InnerSurround.UpDashStyle.Value = ComplexDashStyle.Parse(cbStylUp.SelectedItem as string);

                    // down
                    //pokud 'Šířka' byla pozměněná, pak jí předáme
                    if (_sirkaDown)
                        sur.InnerSurround.DownWidth.Value = tbSirkaDown.Text;

                    // v případě, že Barva je daná, pak jí předáme
                    if (cbBarvaDown.SelectedIndex != -1 && _colorDown)
                    {
                        sur.InnerSurround.DownFrameColor = new URComplexColor();
                        sur.InnerSurround.DownFrameColor.Initialize(((ColorComboBox.ColorDescriptor)cbBarvaDown.Items[cbBarvaDown.SelectedIndex]).Color);
                    }
                    // v případě, že Barva písma je daná, pak ji předáme
                    if (cbStylDown.SelectedIndex != -1 && _styleDownChanged)
                        sur.InnerSurround.DownDashStyle.Value = ComplexDashStyle.Parse(cbStylDown.SelectedItem as string);
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
                SetupLocalizedXFRM(AssemblyName + ".Resources.forms.property.InnerSurroundPanel.xfrm");

                tbSirkaUp = (GLabeledTextBox)ControlDictionary["tbSirkaTop"];
                tbSirkaUp.TextChanged += delegate { _sirkaUp = true; RepaintPreview(); };
                tbSirkaUp.GotFocus += _GotFocus;
                tbSirkaUp.MouseClick += _GotFocus;

                tbSirkaDown = (GLabeledTextBox)ControlDictionary["tbSirkaLeft"];
                tbSirkaDown.TextChanged += delegate { _sirkaDown = true; RepaintPreview(); };
                tbSirkaDown.GotFocus += _GotFocus;
                tbSirkaDown.MouseClick += _GotFocus;

                cbStylUp = (GLabeledComboBox)ControlDictionary["cbStylTop"];
                cbStylUp.SelectedIndexChanged += delegate
                {
                    if (!isLoad)
                    { _styleUpChanged = true; RepaintPreview(); }
                };
                cbStylDown = (GLabeledComboBox)ControlDictionary["cbStylLeft"];
                cbStylDown.SelectedIndexChanged += delegate
                {
                    if (!isLoad)
                    { _styleDownChanged = true; RepaintPreview(); }
                };

                pnlPreview = (PFrame)ControlDictionary["pnlPreview"];
                pnlPreview.Paint += delegate { RepaintPreview(); };

                cbBarvaUp = (ColorComboBox)ControlDictionary["cbBarvaTop"];
                cbBarvaUp.DrawItem += CbDrawItem;
                cbBarvaUp.SelectedIndexChanged += delegate { _colorUp = true; RepaintPreview(); };
                cbBarvaDown = (ColorComboBox)ControlDictionary["cbBarvaLeft"];
                cbBarvaDown.DrawItem += CbDrawItem;
                cbBarvaDown.SelectedIndexChanged += delegate { _colorDown = true; RepaintPreview(); };

                RefreshComboBoxes();
                SetDefault();
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " InnerSurroundPanel.xfrm:" + ex.Message); }
        }

        private void _GotFocus(object sender, EventArgs e)
        {
            (sender as GLabeledTextBox).SelectAll();
        }

        /// <summary>
        /// Podmínky viditelnosti daného panelu
        /// </summary>
        /// <returns>TRUE - podmínka je splněná</returns>
        public override bool VisibleCondition()
        {
            if (view == null)
                return base.VisibleCondition();

            return Service != null && Service.SelectedComponents.Exists(item => item is ISurroundable);
        }
        #endregion

        //indikuje, že text 'Šířka' byl záměrně pozměněn
        bool
            _sirkaUp = false,
            _sirkaDown = false;

        // indikuje změnu stylu
        bool
            _styleUpChanged = false,
            _styleDownChanged = false;

        // indikuje změnu barvy
        bool
            _colorUp = false,
            _colorDown = false;

        GLabeledTextBox tbSirkaUp, tbSirkaDown;
        GLabeledComboBox cbStylUp, cbStylDown;
        ColorComboBox cbBarvaUp, cbBarvaDown;

        /// <summary>
        /// Barva pozadí stisknutého tlačítka
        /// </summary>
        Bitmap _backBuffer = null;
        PFrame pnlPreview;
        void RefreshComboBoxes()
        {
            List<ColorComboBox.ColorDescriptor> colors = new List<ColorComboBox.ColorDescriptor>();

            foreach (var item in ColorService.ColorNameCzEn)
                colors.Add(new ColorComboBox.ColorDescriptor(item));

            cbBarvaUp.Items.Clear();
            cbBarvaUp.Items.AddRange(colors.ToArray());
            cbBarvaDown.Items.Clear();
            cbBarvaDown.Items.AddRange(colors.ToArray());
            cbBarvaUp.Invalidate();

            cbStylUp.Items.Clear();
            cbStylUp.Items.AddRange(CommonService.FloatDashStyles.Values.ToArray());
            cbStylDown.Items.Clear();
            cbStylDown.Items.AddRange(CommonService.FloatDashStyles.Values.ToArray());
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
            //kreslení komponenty
            _backBuffer = new Bitmap(pnlPreview.Width, pnlPreview.Height);
            Graphics graphics = Graphics.FromImage(_backBuffer);
            graphics.Clear(Color.White);
            DrawGray(graphics);

            // up
            SizeValue lWidthUp = new SizeValue(tbSirkaUp.Text);
            // pokud hodnota zadaná bez metriky, pak ji zkusíme převest dle pravidla
            if (string.IsNullOrEmpty(lWidthUp.Metrics))
                SetByRule(ref lWidthUp);

            SizeValue lWidthDown = new SizeValue(tbSirkaDown.Text);
            // pokud hodnota zadaná bez metriky, pak ji zkusíme převest dle pravidla
            if (string.IsNullOrEmpty(lWidthDown.Metrics))
                SetByRule(ref lWidthDown);

            DrawDown(graphics, lWidthDown);
            DrawUp(graphics, lWidthUp);
            //Copy the back buffer to the screen
            pnlPreview.CreateGraphics().DrawImageUnscaled(_backBuffer, 0, 0);
        }

        void DrawUp(Graphics graphics, float _widthTop)
        {
            // top
            if (_widthTop != 0)
            {
                if (cbBarvaUp.SelectedIndex != -1
                    && cbStylUp.SelectedIndex != -1)
                {
                    ColorComboBox.ColorDescriptor _colorDescriptor = cbBarvaUp.SelectedIndex != -1 ? (ColorComboBox.ColorDescriptor)cbBarvaUp.Items[cbBarvaUp.SelectedIndex] : new ColorComboBox.ColorDescriptor();
                    using (Pen pen = new Pen(_colorDescriptor.Color, _widthTop))
                    {
                        float[] pattern = ComplexDashStyle.GetDashPattern(cbStylUp.SelectedItem != null ? cbStylUp.SelectedItem.ToString() : "");
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

                        //if (pen.DashStyle != System.Drawing.Drawing2D.DashStyle.Custom)
                        //    graphics.DrawLine(pen, new PointF(15 + _xLeftTop, 15 + _yLeftTop), new PointF(pnlPreview.Width - 20 - _xRightTop, 15 + _yRightTop));
                        //else
                        //    using (Pen subPen = new Pen(_colorDescriptor.Color, _widthTop / 4))
                        //    {
                        //        graphics.DrawLine(subPen, new PointF(15 + _xLeftTop, 15 - _widthTop / 2 + _yLeftTop), new PointF(pnlPreview.Width - 20 - _xRightTop, 15 - _widthTop / 2 + _yRightTop));
                        //        graphics.DrawLine(subPen, new PointF(15 + _xLeftTop, 15 + _widthTop / 4 + _yLeftTop), new PointF(pnlPreview.Width - 20 - _xRightTop, 15 + _widthTop / 4 + _yRightTop));
                        //    }
                    }
                }
            }

        }
        void DrawTop(Graphics graphics, Pen pen, PointF location, SizeF size)
        {
            //int radius = (int)nudRadius.Value;
            //ComplexSurroundCorners crnrs = cbCorners.SelectedIndex != -1 ? (ComplexSurroundCorners)cbCorners.SelectedIndex : ComplexSurroundCorners.None;
            //if (radius != 0)
            //    if (cbUmisteni.SelectedIndex == 1)
            //        RoundedRectangle.DrawRectangle(graphics, pen
            //            , location.X + pen.Width / 2
            //            , location.Y + pen.Width / 2
            //            , size.Width - pen.Width
            //            , 0
            //            , radius
            //            , crnrs
            //            , RoundedRectangle.RectangleSides.Top);
            //    else
            //        RoundedRectangle.DrawRectangle(graphics, pen
            //            , location.X
            //            , location.Y
            //            , size.Width
            //            , 0
            //            , radius
            //            , crnrs
            //            , RoundedRectangle.RectangleSides.Top);
            //else
            //    if (cbUmisteni.SelectedIndex == 1)
            //    RoundedRectangle.DrawRectangle(graphics, pen
            //        , location.X
            //        , location.Y + pen.Width / 2
            //        , size.Width
            //        , 0
            //        , radius
            //        , crnrs
            //        , RoundedRectangle.RectangleSides.Top);
            //else
            //    RoundedRectangle.DrawRectangle(graphics, pen
            //        , location.X - pen.Width / 2
            //        , location.Y
            //        , size.Width + pen.Width
            //        , 0
            //        , radius
            //        , crnrs
            //        , RoundedRectangle.RectangleSides.Top);
        }
        void DrawDown(Graphics graphics, float _widthLeft)
        {
            //// left
            //if (_widthLeft != 0)
            //    if (cbBarvaDown.SelectedIndex != -1
            //        && cbStylDown.SelectedIndex != -1)
            //    {
            //        ColorComboBox.ColorDescriptor _colorDescriptor = cbBarvaDown.SelectedIndex != -1 ? (ColorComboBox.ColorDescriptor)cbBarvaDown.Items[cbBarvaDown.SelectedIndex] : new ColorComboBox.ColorDescriptor();
            //        using (Pen pen = new Pen(_colorDescriptor.Color, _widthLeft))
            //        {
            //            float[] pattern = ComplexDashStyle.GetDashPattern(cbStylDown.SelectedItem != null ? cbStylDown.SelectedItem.ToString() : "");
            //            // prázdné pole je hodnota "nespecifikováno"
            //            if ((pattern.Length > 0
            //                // záporná hodnota v poli nesmí být - jinak se jedná o "nespecifikováno"
            //                && pattern.Min() >= 0)
            //                || pen.DashStyle == DashStyle.Custom)
            //            {
            //                // hodnota 0 znamená že se jedná o dvojitou čáru
            //                if (pen.DashStyle != DashStyle.Custom && pattern.Min() > 0)
            //                {
            //                    pen.DashPattern = pattern;
            //                    DrawLeft(graphics, pen, new PointF(15, 15), new SizeF(pnlPreview.Width - 35, pnlPreview.Height - 35));
            //                }
            //                else
            //                // kreslíme dvojitou čáru
            //                // jedná se o kreslení 2xčáry vedle sebe s mezerou rovnou velikosti šířky péra
            //                {
            //                    pen.DashStyle = System.Drawing.Drawing2D.DashStyle.Custom;
            //                    PointF _locOut = new PointF(15 - pen.Width * 3 / 2, 15 - pen.Width * 3 / 2),
            //                        _locInt = new PointF(15 + pen.Width / 2, 15 + pen.Width / 2);
            //                    SizeF _sizeOut = new SizeF(pnlPreview.Width - 35 + 3 * pen.Width, pnlPreview.Height - 35 + 3 * pen.Width),
            //                        _sizeInt = new SizeF(pnlPreview.Width - 35 - pen.Width, pnlPreview.Height - 35 - pen.Width);

            //                    DrawLeft(graphics, pen, _locOut, _sizeOut);
            //                    DrawLeft(graphics, pen, _locInt, _sizeInt);
            //                }
            //            }
            //        }
            //    }
        }
        void DrawLeft(Graphics graphics, Pen pen, PointF location, SizeF size)
        {
            //int radius = (int)nudRadius.Value;
            //ComplexSurroundCorners crnrs = cbCorners.SelectedIndex != -1 ? (ComplexSurroundCorners)cbCorners.SelectedIndex : ComplexSurroundCorners.None;
            //if (radius != 0)
            //    if (cbUmisteni.SelectedIndex == 1)
            //        RoundedRectangle.DrawRectangle(graphics, pen
            //            , location.X + pen.Width / 2
            //            , location.Y + pen.Width / 2
            //            , 0
            //            , size.Height - pen.Width
            //            , radius
            //            , crnrs
            //            , RoundedRectangle.RectangleSides.Left);
            //    else
            //        RoundedRectangle.DrawRectangle(graphics, pen
            //            , location.X
            //            , location.Y
            //            , 0
            //            , size.Height
            //            , radius
            //            , crnrs
            //            , RoundedRectangle.RectangleSides.Left);
            //else
            //    if (cbUmisteni.SelectedIndex == 1)
            //    RoundedRectangle.DrawRectangle(graphics, pen
            //        , location.X + pen.Width / 2
            //        , location.Y
            //        , 0
            //        , size.Height
            //        , radius
            //        , crnrs
            //        , RoundedRectangle.RectangleSides.Left);
            //else
            //    RoundedRectangle.DrawRectangle(graphics, pen
            //        , location.X
            //        , location.Y - pen.Width / 2
            //        , 0
            //        , size.Height + pen.Width
            //        , radius
            //        , crnrs
            //        , RoundedRectangle.RectangleSides.Left);
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
