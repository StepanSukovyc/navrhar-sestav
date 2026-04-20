//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FontPanel.cs                           </Name>
//    <Description>                                                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-07                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Text;
using System.Threading;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.DefaultEditor;
using Gordic.General;

namespace Gordic.GFE.WinClient.Gui.PropertyPanels
{
    /// <summary>
    /// Panel písma
    /// </summary>
    class FontPanel : AbstractPropertyPanel
    {
        #region AbstractPropertyPanel
        /// <summary>
        /// Získání nové hodnoty - PropertyGrid
        /// </summary>
        /// <returns>Nová hodnota</returns>
        public override object PropertyValue { get { return helper.CurrentFont; } }
        /// <summary>
        /// Reakce na tlačítko Výchozí hodnoty
        /// </summary>
        /// <returns>True - Nastavení provedené</returns>
        protected override void SetDefault()
        {
            _sizeChanged = false;
            _fontChanged = false;
            _styleChanged = false;
            _foreChanged = false;
            _backChange = false;
            UpdateFontPreviewLabel(true);
        }
        /// <summary>
        /// Reakce na akceptace změn
        /// </summary>
        /// <returns>TRUE- změna provedená</returns>
        protected override bool Accept()
        {
            if (Service == null)
                return true;

            if (_sizeChanged || _fontChanged || _styleChanged || _foreChanged || _backChange)
            {
                if (!UndoRedoService.IsTransactionStarted)
                    UndoRedoService.StartTransaction(GResources.GetResourceText(29450472)); //RC 29450472 : změna písma

                foreach (object item in Service.SelectedComponents)
                    if (item is ITextHandler)
                    {
                        IBackground background = item as IBackground;
                        //pokud Velikost písma byla pozměněná, pak jí předáme
                        if (_sizeChanged)
                            (item as ITextHandler).Text.TextFont.Size = new FontSizeValue(fontSizeComboBox.Text);

                        // v případě, že Písmo je dané, pak ho předáme
                        if (fontListComboBox.SelectedIndex != -1 && _fontChanged)
                        {
                            FontFamily ff = new FontFamily((fontListComboBox.SelectedItem as FontComboBox.FontDescriptor).Name);
                            (item as ITextHandler).Text.TextFont.FontFamily = new URComplexFontFamily().Initialize(ff.Name);
                        }

                        // v případě, že Barva písma je daná, pak ji předáme
                        if (_foreChanged)
                            if (fontColorComboBox.SelectedIndex != -1)
                                (item as ITextHandler).Text.TextFont.ForeColor = new URComplexColor().Initialize((fontColorComboBox.SelectedItem as ColorComboBox.ColorDescriptor).Color);
                            // případ, kdy barvu do seznamu vložíme ručně
                            else if (!string.IsNullOrEmpty(fontColorComboBox.Text))
                                (item as ITextHandler).Text.TextFont.ForeColor = new URComplexColor().Initialize(fontColorComboBox.Text);

                        // v případě, že Barva pozadí je daná, pak ji předáme
                        if (_backChange)
                            if (backColorComboBox.SelectedIndex != -1)
                                (item as ITextHandler).Text.TextFont.BackColor = new URComplexColor().Initialize((backColorComboBox.SelectedItem as ColorComboBox.ColorDescriptor).Color);
                            // případ, kdy barvu do seznamu vložíme ručně
                            else if (!string.IsNullOrEmpty(backColorComboBox.Text))
                                (item as ITextHandler).Text.TextFont.BackColor = new URComplexColor().Initialize(backColorComboBox.Text);

                        // v případě, že Řez písma je dan, pak ho předáme
                        if (fontStyleComboBox.SelectedIndex != -1 && _styleChanged)
                            (item as ITextHandler).Text.TextFont.Style = (FontStyleEnum)(fontStyleComboBox.SelectedItem as FontStyleComboBox.FontStyleDescription).FontStyle;

                        if (background != null)
                            background.ShowBackground = (backColorComboBox.SelectedItem as ColorComboBox.ColorDescriptor).Color != Color.Transparent;
                    }
            }
            return base.Accept();
        }
        /// <summary>
        /// Načtení panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            try
            {
                SetupLocalizedXFRM(AssemblyName + ".Resources.forms.property.FontPanel.xfrm");
                btnAddColor = ((Button)ControlDictionary["btnAddColor"]);
                fontSizeComboBox = ((ComboBox)ControlDictionary["fontSizeComboBox"]);
                fontSizeComboBox.Enabled = false;
                fontStyleComboBox = ((FontStyleComboBox)ControlDictionary["fontStyleComboBox"]);
                fontListComboBox = ((FontComboBox)ControlDictionary["fontListComboBox"]);
                fontColorComboBox = ((ColorComboBox)ControlDictionary["fontColorComboBox"]);
                backColorComboBox = ((ColorComboBox)ControlDictionary["backColorComboBox"]);

                fontStyleComboBox.Enabled = false;
                fontListComboBox.Enabled = false;
                fontColorComboBox.Enabled = false;
                backColorComboBox.Enabled = false;

                fontListComboBox.TextChanged += delegate { if (!helper.IsLoading) _fontChanged = true; UpdateFontPreviewLabel(); };
                fontListComboBox.SelectedIndexChanged += delegate { if (!helper.IsLoading) _fontChanged = true; UpdateFontPreviewLabel(); };
                fontStyleComboBox.TextChanged += delegate { if (!helper.IsLoading) _styleChanged = true; UpdateFontPreviewLabel(); };
                fontStyleComboBox.SelectedIndexChanged += delegate { if (!helper.IsLoading) _styleChanged = true; UpdateFontPreviewLabel(); };
                fontSizeComboBox.TextChanged += delegate { if (!helper.IsLoading) _sizeChanged = true; UpdateFontPreviewLabel(); };
                fontSizeComboBox.SelectedIndexChanged += delegate { if (!helper.IsLoading) _sizeChanged = true; UpdateFontPreviewLabel(); };
                fontColorComboBox.TextChanged += delegate { if (!helper.IsLoading) _foreChanged = true; UpdateFontPreviewLabel(); };
                fontColorComboBox.SelectedIndexChanged += delegate { if (!helper.IsLoading) _foreChanged = true; UpdateFontPreviewLabel(); };
                backColorComboBox.TextChanged += delegate { if (!helper.IsLoading) _backChange = true; UpdateFontPreviewLabel(); };
                backColorComboBox.SelectedIndexChanged += delegate { if (!helper.IsLoading) _backChange = true; UpdateFontPreviewLabel(); };

                helper = new FontSelectionHelper(
                    fontListComboBox,
                    fontStyleComboBox,
                    fontSizeComboBox,
                    fontColorComboBox,
                    backColorComboBox);

                fontListComboBox.DrawItem += new System.Windows.Forms.DrawItemEventHandler(helper.ComboBoxDrawItem);
                fontStyleComboBox.DrawItem += new System.Windows.Forms.DrawItemEventHandler(helper.ComboBoxDrawItem);
                fontColorComboBox.DrawItem += new System.Windows.Forms.DrawItemEventHandler(helper.ComboBoxDrawItem);
                backColorComboBox.DrawItem += new System.Windows.Forms.DrawItemEventHandler(helper.ComboBoxDrawItem);

                btnAddColor.Click += btnAddColor_Click;
                helper.StartThreads();
                UpdateFontPreviewLabel(true);
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " FontPanel.xfrm:" + ex.Message); }
        }

        /// <summary>
        /// Podmínky viditelnosti daného panelu
        /// </summary>
        /// <returns>TRUE - podmínka je splněná</returns>
        public override bool VisibleCondition()
        {
            if (view == null)
                return base.VisibleCondition();

            return Service != null && Service.SelectedComponents.Exists(item => item is ITextHandler);
        }
        #endregion

        sealed class FontSelectionHelper
        {
            ComboBox fontSizeComboBox;
            FontComboBox fontListComboBox;
            FontStyleComboBox fontStyleComboBox;
            ColorComboBox fontColorComboBox, backColorComboBox;

            /// <exclude/>
            public FontSelectionHelper(FontComboBox fontListComboBox, FontStyleComboBox fontStyleComboBox, ComboBox fontSizeComboBox, ColorComboBox fontColorComboBox, ColorComboBox backColorComboBox)
            {
                this.fontSizeComboBox = fontSizeComboBox;
                this.fontListComboBox = fontListComboBox;
                this.fontStyleComboBox = fontStyleComboBox;
                this.fontColorComboBox = fontColorComboBox;
                this.backColorComboBox = backColorComboBox;
            }

            /// <summary>
            /// Spuštění vláken na aktualizací všech rozbalovacích seznamů
            /// </summary>
            public void StartThreads()
            {
                StartFontsThread();
                StartStylesThread();
                StartColorsThread();
            }
            Thread threadColors;
            /// <exclude/>
            public void StartColorsThread()
            {
                threadColors = new Thread(RefreshColorsThread);
                threadColors.IsBackground = true;
                threadColors.Start();
            }

            /// <summary>
            /// Aktualizace seznamů barev
            /// </summary>
            void RefreshColorsThread()
            {
                Thread.Sleep(0);

                ////////////////////// ForeColor, BackColor
                DebugTimer.Start();
                List<ColorComboBox.ColorDescriptor> colors = new List<ColorComboBox.ColorDescriptor>();

                foreach (var item in ColorService.ColorNameCzEn)
                    colors.Add(new ColorComboBox.ColorDescriptor(item));

                DebugTimer.Stop(GResources.GetResourceText(29450473)); //RC 29450473 : Získání konfigurovaných barev
                // aktualizace barev
                ThreadService.SafeThreadAsyncCall(
                    delegate
                    {
                        fontColorComboBox.Items.Clear();
                        fontColorComboBox.Items.AddRange(colors.ToArray());
                        fontColorComboBox.Enabled = true;

                        backColorComboBox.Items.Clear();
                        backColorComboBox.Items.AddRange(colors.ToArray());
                        backColorComboBox.Enabled = true;
                        UpdateFontPreviewLabel(fontPreviewLabel, setDefault, service);
                    });

                fontColorComboBox.Invalidate();
                backColorComboBox.Invalidate();
            }
            void RefreshStylesThread()
            {
                Thread.Sleep(0);

                /////////////////// style
                DebugTimer.Start();
                List<FontStyleComboBox.FontStyleDescription> styles = new List<FontStyleComboBox.FontStyleDescription>();

                foreach (var item in ListOfFontStyles.StylesList)
                    styles.Add(new FontStyleComboBox.FontStyleDescription(item));

                DebugTimer.Stop(GResources.GetResourceText(29450474)); //RC 29450474 : Získání konfigurovaných stylů písem

                // aktualizace stylu
                ThreadService.SafeThreadAsyncCall(
                    delegate
                    {
                        fontStyleComboBox.Items.Clear();
                        fontStyleComboBox.Items.AddRange(styles.ToArray());
                        fontStyleComboBox.Enabled = true;
                        UpdateFontPreviewLabel(fontPreviewLabel, setDefault, service);
                    });
                fontStyleComboBox.Invalidate();
            }
            void RefreshFontsThread()
            {
                Thread.Sleep(0);

                DebugTimer.Start();
                InstalledFontCollection installedFontCollection = new InstalledFontCollection();
                List<FontComboBox.FontDescriptor> fonts = new List<FontComboBox.FontDescriptor>();

                foreach (var item in ListOfFonts.Fonts)
                    fonts.Add(new FontComboBox.FontDescriptor(item));

                foreach (FontFamily fontFamily in installedFontCollection.Families)
                    if (fontFamily.IsStyleAvailable(FontStyle.Regular)
                        && fontFamily.IsStyleAvailable(FontStyle.Bold)
                        && fontFamily.IsStyleAvailable(FontStyle.Italic))
                        fonts.Add(new FontComboBox.FontDescriptor(fontFamily));
                DebugTimer.Stop(GResources.GetResourceText(29450446)); //RC 29450446 : Získání instalovaných písem

                // zviditelnění dostupného písma
                ThreadService.SafeThreadAsyncCall(
                    delegate
                    {
                        fontListComboBox.Items.Clear();
                        fontListComboBox.Items.AddRange(fonts.ToArray());
                        fontListComboBox.Enabled = true;
                        UpdateFontPreviewLabel(fontPreviewLabel, setDefault, service);
                    });

                DebugTimer.Start();
                using (Bitmap newBitmap = new Bitmap(1, 1))
                using (Graphics g = Graphics.FromImage(newBitmap))
                    foreach (FontComboBox.FontDescriptor fd in fonts)
                        fd.DetectMonospaced(g);
                DebugTimer.Stop(GResources.GetResourceText(29450447)); //RC 29450447 : Detekce strojopisu
                fontListComboBox.Invalidate();

                //////////////// size aktualizace velikosti
                ThreadService.SafeThreadAsyncCall(
                    delegate
                    {
                        fontSizeComboBox.Items.Clear();
                        for (int i = 1; i <= 8; ++i)
                            fontSizeComboBox.Items.Add(i);
                        fontSizeComboBox.Enabled = true;
                        UpdateFontPreviewLabel(fontPreviewLabel, setDefault, service);
                    });
            }
            Thread threadStyles;
            void StartStylesThread()
            {
                threadStyles = new Thread(RefreshStylesThread);
                threadStyles.IsBackground = true;
                threadStyles.Start();
            }
            Thread threadFonts;
            void StartFontsThread()
            {
                threadFonts = new Thread(RefreshFontsThread);
                threadFonts.IsBackground = true;
                threadFonts.Start();
            }

            SelectionService service;
            bool setDefault;

            /// <summary>
            /// Získání vybraného písma
            /// </summary>
            /// <returns></returns>
            Font GetSelectedFont(bool setDefault, SelectionService service = null)
            {
                if (!fontListComboBox.Enabled
                    || !fontStyleComboBox.Enabled
                    || !fontSizeComboBox.Enabled
                    || !backColorComboBox.Enabled)
                    return null;

                isUpdating = true;
                if (setDefault)
                {
                    IsLoading = true;
                    SetDefault(service);
                }
                // velikost písma
                GFEFontSize _fontSize = new GFEFontSize();
                if (fontSizeComboBox.SelectedIndex != -1)
                    _fontSize.Value = Convert.ToString(fontSizeComboBox.SelectedIndex + 1);
                else
                    _fontSize.Value = fontSizeComboBox.Text;

                FontComboBox.FontDescriptor fontDescriptor =
                    fontListComboBox.SelectedIndex != -1 ?
                    (FontComboBox.FontDescriptor)fontListComboBox.Items[fontListComboBox.SelectedIndex]
                    : new FontComboBox.FontDescriptor(ReportDesignerTextEditorProperties.Instance.FontContainer.DefaultFont.FontFamily);

                FontStyleComboBox.FontStyleDescription fontStyleDescriptor =
                    fontStyleComboBox.SelectedIndex != -1 ?
                    (FontStyleComboBox.FontStyleDescription)fontStyleComboBox.Items[fontStyleComboBox.SelectedIndex]
                    : new FontStyleComboBox.FontStyleDescription();

                CurrentFont.FontFamily = new URComplexFontFamily().Initialize(fontDescriptor.Name);
                CurrentFont.Size = new FontSizeValue(_fontSize.Value);
                CurrentFont.Style = (FontStyleEnum)fontStyleDescriptor.FontStyle;

                return new Font(fontDescriptor.Name, _fontSize.Point <= 0 ? 10 : _fontSize.Point, fontStyleDescriptor.FontStyle);
            }

            bool ThreadsRunning()
            {
                return (threadColors != null && threadColors.ThreadState != ThreadState.Stopped)
                    || (threadFonts != null && threadFonts.ThreadState != ThreadState.Stopped)
                    || (threadStyles != null && threadStyles.ThreadState != ThreadState.Stopped);
            }
            bool SetDefault(SelectionService service = null)
            {
                if (service != null)
                {
                    // pole indexů vybraných položek v comboboxech
                    int[] _values = new int[] { -1, -1, -1, -1 };
                    // velikost písma
                    string _size = string.Empty;

                    bool first = true;
                    // projdeme všechny vybrané položky a zjistíme jejích hodnoty
                    foreach (object item in service.SelectedComponents)
                    {
                        var ith = item as ITextHandler;
                        if (ith != null && ith.Text != null && ith.Text.TextFont != null)
                        {
                            // zafixujeme Písmo vybraného objektu
                            ITagTextFont _font = ith.Text.TextFont;

                            // pokud je to první objekt, pak jeho vlastnosti nakopírujeme
                            if (first)
                            {
                                first = false;
                                _values[0] = GetIndex(fontListComboBox, _font.FontFamily.FontFamily);
                                _values[1] = GetIndex(fontStyleComboBox, (FontStyle)_font.Style);
                                _values[2] = GetIndex(fontColorComboBox, new GFEColor(_font.ForeColor.Color));
                                _values[3] = GetIndex(backColorComboBox, new GFEColor(_font.BackColor.Color));
                                _size = _font.Size.Value;
                            }
                            else
                            {
                                // _size == null znamená, že obsahy nejsou stejné
                                if (_size != _font.Size.Value
                                    && _size != null)
                                    _size = null;

                                //_values[0]==-1 znamená, že obsahy nejsou stejné
                                if (_values[0] != -1
                                    && _values[0] != GetIndex(fontListComboBox, _font.FontFamily.FontFamily))
                                    _values[0] = -1;

                                //_values[1]==-1 znamená, že obsahy nejsou stejné
                                if (_values[1] != -1
                                    && _values[1] != GetIndex(fontStyleComboBox, (FontStyle)_font.Style))
                                    _values[1] = -1;

                                //_values[2]==-1 znamená, že obsahy nejsou stejné
                                if (_values[2] != -1
                                    && _values[2] != GetIndex(fontColorComboBox, new GFEColor(_font.ForeColor.Color)))
                                    _values[2] = -1;

                                //_values[3]==-1 znamená, že obsahy nejsou stejné
                                if (_values[3] != -1
                                    && _values[3] != GetIndex(backColorComboBox, new GFEColor(_font.BackColor.Color)))
                                    _values[3] = -1;
                            }
                        }
                    }

                    fontListComboBox.SelectedIndex = _values[0];
                    fontStyleComboBox.SelectedIndex = _values[1];
                    fontColorComboBox.SelectedIndex = _values[2];
                    backColorComboBox.SelectedIndex = _values[3];
                    if (_size != null)
                        fontSizeComboBox.Text = _size;

                    return true;
                }
                else
                    return false;
            }

            bool isUpdating;
            Control fontPreviewLabel;

            ITagTextFont txCurrentFont;
            /// <summary>
            /// Aktuální písmo
            /// </summary>
            public ITagTextFont CurrentFont
            {
                get
                {
                    if (txCurrentFont == null)
                        txCurrentFont = new URTagTextFont().Initialize(FontStyleEnum.Regular);
                    return txCurrentFont;
                }
            }

            /// <summary>
            /// aktualizace písma štítku
            /// </summary>
            /// <param name="fontPreviewLabel">štítek</param>
            /// <param name="setDefault">Indikuje načtení výchozích hodnot</param>
            /// <param name="service">Služba vybraných objektů</param>
            public void UpdateFontPreviewLabel(Control fontPreviewLabel, bool setDefault, SelectionService service = null)
            {
                if (isUpdating)
                    return;

                this.service = service;
                this.setDefault = setDefault;
                this.fontPreviewLabel = fontPreviewLabel;

                if (fontColorComboBox == null || backColorComboBox == null)
                    return;

                Font currentFont = GetSelectedFont(setDefault, service);
                if (currentFont == null)
                    return;

                ColorComboBox.ColorDescriptor fontColorDescriptor =
                    fontColorComboBox.SelectedIndex != -1 ?
                    (ColorComboBox.ColorDescriptor)fontColorComboBox.Items[fontColorComboBox.SelectedIndex]
                    : new ColorComboBox.ColorDescriptor();

                ColorComboBox.ColorDescriptor backColorDescriptor =
                    backColorComboBox.SelectedIndex != -1 ?
                    (ColorComboBox.ColorDescriptor)backColorComboBox.Items[backColorComboBox.SelectedIndex]
                    : new ColorComboBox.ColorDescriptor();

                fontPreviewLabel.Visible = currentFont != null;
                if (currentFont != null)
                {
                    fontPreviewLabel.ForeColor = fontColorDescriptor.Color;
                    fontPreviewLabel.BackColor = backColorDescriptor.Color;
                    fontPreviewLabel.Font = currentFont;
                }

                CurrentFont.ForeColor = new URComplexColor();
                CurrentFont.ForeColor.Initialize(fontColorDescriptor.Color);
                CurrentFont.BackColor = new URComplexColor();
                CurrentFont.BackColor.Initialize(backColorDescriptor.Color);

                isUpdating = false;
                IsLoading = false;
            }

            static StringFormat drawStringFormat = new StringFormat(StringFormatFlags.NoWrap);
            /// <exclude/>
            internal void ComboBoxDrawItem(object sender, System.Windows.Forms.DrawItemEventArgs e)
            {
                ComboBox comboBox = (ComboBox)sender;
                e.DrawBackground();

                Rectangle drawingRect = new Rectangle(e.Bounds.X,
                                                      e.Bounds.Y,
                                                      e.Bounds.Width,
                                                      e.Bounds.Height);

                Brush drawItemBrush = SystemBrushes.WindowText;
                if ((e.State & DrawItemState.Selected) == DrawItemState.Selected)
                    drawItemBrush = SystemBrushes.HighlightText;

                if (comboBox.Enabled == false)
                    e.Graphics.DrawString(GResources.GetResourceText(29450275) + "...", //RC 29450275 : Načtení
                                          comboBox.Font,
                                          drawItemBrush,
                                          drawingRect,
                                          drawStringFormat);
                else if (e.Index >= 0)
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

            int GetIndex(FontComboBox list, FontFamily fontFamily)
            {
                string name = fontFamily.Name;

                if (fontFamily.Name == CommonService.Serif.Name)
                    name = "times";
                else if (fontFamily.Name == CommonService.SansSerif.Name)
                    name = "arial";
                else if (fontFamily.Name == CommonService.Monospace.Name)
                    name = "courier";

                for (int i = 0; i < list.Items.Count; i++)
                    if ((list.Items[i] is FontComboBox.FontDescriptor)
                        && (list.Items[i] as FontComboBox.FontDescriptor).Name.Equals(name, StringComparison.InvariantCultureIgnoreCase))
                        return i;

                // výchozí je 'times'
                return 1;
            }
            int GetIndex(FontStyleComboBox list, FontStyle fontStyle)
            {
                for (int i = 0; i < list.Items.Count; i++)
                    if ((list.Items[i] is FontStyleComboBox.FontStyleDescription)
                        && ((list.Items[i] as FontStyleComboBox.FontStyleDescription).FontStyle == fontStyle))
                        return i;
                return 1;
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

                // barva neexistuje - přidáme jí jako novou
                list.Items.Add(new ColorComboBox.ColorDescriptor(color));
                return list.Items.Count - 1;
            }

            /// <summary>
            /// Indikuje stav načítání objektu
            /// </summary>
            public bool IsLoading { get; set; }
        }


        FontSelectionHelper helper;
        Button btnAddColor;

        //indikuje, že text 'Velikost' byl záměrně pozměněn
        bool _sizeChanged,
        // indikuje záměrnou změnu písma
        _fontChanged,
        // indikuje záměrnou změnu písma
        _styleChanged,
        // indikuje záměrnou změnu barvy písma
        _foreChanged,
        // indikuje záměrnou změnu barvy pozadí
        _backChange;

        // velikost písma
        GFEFontSize _fontSize = new GFEFontSize();

        ComboBox fontSizeComboBox;
        FontComboBox fontListComboBox;
        FontStyleComboBox fontStyleComboBox;
        ColorComboBox fontColorComboBox, backColorComboBox;

        void btnAddColor_Click(object sender, EventArgs e)
        {
            using (ColorDialog cd = new ColorDialog())
            {
                List<int> customColors = new List<int>();
                foreach (var item in ColorService.UserDefineColors)
                    customColors.Add(ColorTranslator.ToOle(ColorService.HexToColor(item)));

                cd.CustomColors = customColors.ToArray();

                if (cd.ShowDialog() == DialogResult.OK)
                {
                    string name = cd.Color.Name.Length == 8 && cd.Color.Name.StartsWith("ff") ? '#' + cd.Color.Name.Substring(2) : cd.Color.Name;
                    ColorService.AddColorItem(name, name, cd.Color);
                    helper.StartColorsThread();
                }
            }
        }
        void UpdateFontPreviewLabel()
        {
            UpdateFontPreviewLabel(false);
        }
        /// <summary>
        /// Aktualizace náhledu
        /// </summary>
        /// <param name="setDefault">Indikuje nutnost načtení výchozích hodnot</param>
        void UpdateFontPreviewLabel(bool setDefault)
        {
            try { helper.UpdateFontPreviewLabel(ControlDictionary["fontPreviewLabel"], setDefault, Service); }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " FontPanel:" + ex.Message); }
        }
    }
}
