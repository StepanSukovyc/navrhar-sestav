//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FontSelectionPanel.cs                  </Name>
//    <Description> Popis FontSelectionPanel.                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-16                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;
using System.Threading;
using Gordic.General;
using System.Drawing.Text;
using Gordic.GFE.Parsers.XmlForms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers;

namespace Gordic.GFE.WinClient.Gui
{
    /// <summary>
    /// Popis FontSelectionPanel.
    /// </summary>
    public class FontSelectionPanel : BaseXmlUserControl
    {
        /// <summary>
        /// aktuální písmo
        /// </summary>
        public string CurrentFontString
        {
            get
            {
                Font font = CurrentFont;
                return font != null ? font.ToString() : null;
            }
            set { CurrentFont = FontSelectionPanel.ParseFont(value); }
        }
        /// <summary>
        /// Aktuální písmo
        /// </summary>
        public Font CurrentFont
        {
            get { return helper == null ? null : helper.GetSelectedFont(); }
            set
            {
                if (helper == null)
                {
                    helper = new FontSelectionPanelHelper((ComboBox)ControlDictionary["fontSizeComboBox"], (ComboBox)ControlDictionary["fontListComboBox"], value);
                    helper.StartThread();
                    ((ComboBox)ControlDictionary["fontListComboBox"]).MeasureItem += helper.MeasureComboBoxItem;
                    ((ComboBox)ControlDictionary["fontListComboBox"]).DrawItem += helper.ComboBoxDrawItem;
                }
                else
                {
                    int index = 0;
                    for (int i = 0; i < ((ComboBox)ControlDictionary["fontListComboBox"]).Items.Count; ++i)
                    {
                        FontSelectionPanelHelper.FontDescriptor descriptor = (FontSelectionPanelHelper.FontDescriptor)((ComboBox)ControlDictionary["fontListComboBox"]).Items[i];
                        if (descriptor.Name == value.Name)
                            index = i;
                    }
                    ((ComboBox)ControlDictionary["fontListComboBox"]).SelectedIndex = index;
                }
                ((ComboBox)ControlDictionary["fontSizeComboBox"]).Text = value.Size.ToString();
            }
        }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public FontSelectionPanel()
        {
            SetupLocalizedXFRM("Resources.forms.options.FontSelectionPanel.xfrm");

            for (int i = 6; i <= 24; ++i)
                ((ComboBox)ControlDictionary["fontSizeComboBox"]).Items.Add(i);
            ((ComboBox)ControlDictionary["fontSizeComboBox"]).TextChanged += new EventHandler(UpdateFontPreviewLabel);
            ((ComboBox)ControlDictionary["fontSizeComboBox"]).Enabled = false;
            ((ComboBox)ControlDictionary["fontListComboBox"]).Enabled = false;

            ((ComboBox)ControlDictionary["fontListComboBox"]).TextChanged += new EventHandler(UpdateFontPreviewLabel);
            ((ComboBox)ControlDictionary["fontListComboBox"]).SelectedIndexChanged += new EventHandler(UpdateFontPreviewLabel);
        }

        FontSelectionPanelHelper helper;
        /// <summary>
        /// Analýza písma
        /// </summary>
        /// <param name="font">písmo</param>
        /// <returns></returns>
        public static Font ParseFont(string font)
        {
            try
            {
                string[] descr = font.Split(new char[] { ',', '=' });
                return new Font(descr[1], Single.Parse(descr[3]));
            }
            catch { return WinFormsResourceService.DefaultMonospacedFont; }
        }

        void UpdateFontPreviewLabel(object sender, EventArgs e)
        {
            helper.UpdateFontPreviewLabel(ControlDictionary["fontPreviewLabel"]);
        }
    }

    class FontSelectionPanelHelper : IDisposable
    {
        #region IDisposable
        /// <summary>
        /// uvolnění objektu
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikace uvolnění</param>
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (defaultFont != null)
                {
                    defaultFont.Dispose();
                    defaultFont = null;
                }

                if (boldComboBoxFont != null)
                {
                    boldComboBoxFont.Dispose();
                    boldComboBoxFont = null;
                }

                if (fontSizeComboBox != null)
                {
                    fontSizeComboBox.Dispose();
                    fontSizeComboBox = null;
                }

                if (fontListComboBox != null)
                {
                    fontListComboBox.Dispose();
                    fontListComboBox = null;
                }
            }
        }
        /// <summary>
        /// finalizer třídy
        /// </summary>
        ~FontSelectionPanelHelper() { Dispose(false); }
        #endregion

        ComboBox fontSizeComboBox, fontListComboBox;
        Font defaultFont, boldComboBoxFont;

        static StringFormat drawStringFormat = new StringFormat(StringFormatFlags.NoWrap);

        /// <exclude/>
        public FontSelectionPanelHelper(ComboBox fontSizeComboBox, ComboBox fontListComboBox, Font defaultFont)
        {
            this.fontSizeComboBox = fontSizeComboBox;
            this.fontListComboBox = fontListComboBox;
            this.defaultFont = defaultFont;
            boldComboBoxFont = new Font(fontListComboBox.Font, FontStyle.Bold);
        }

        /// <summary>
        /// aktualizace písma štítku
        /// </summary>
        /// <param name="fontPreviewLabel">štítek</param>
        public void UpdateFontPreviewLabel(Control fontPreviewLabel)
        {
            Font currentFont = GetSelectedFont();
            fontPreviewLabel.Visible = currentFont != null;
            if (currentFont != null)
                fontPreviewLabel.Font = currentFont;
        }

        /// <exclude/>
        public void StartThread()
        {
            Thread thread = new Thread(DetectMonospacedThread);
            thread.IsBackground = true;
            thread.Start();
        }

        /// <summary>
        /// Získání vybraného písma
        /// </summary>
        /// <returns></returns>
        public Font GetSelectedFont()
        {
            if (!fontListComboBox.Enabled)
                return null;
            float fontSize = 10f;
            if (!string.IsNullOrEmpty(fontSizeComboBox.Text))
                try { fontSize = Math.Max(6, Single.Parse(fontSizeComboBox.Text)); }
                catch (Exception) { }

            FontDescriptor fontDescriptor =
                fontListComboBox.SelectedIndex != -1 ?
                (FontDescriptor)fontListComboBox.Items[fontListComboBox.SelectedIndex]
                : new FontDescriptor(SystemFonts.DefaultFont.FontFamily);

            return new Font(fontDescriptor.Name,
                            fontSize);
        }

        void DetectMonospacedThread()
        {
            Thread.Sleep(0);
            DebugTimer.Start();
            InstalledFontCollection installedFontCollection = new InstalledFontCollection();
            Font currentFont = defaultFont;
            List<FontDescriptor> fonts = new List<FontDescriptor>();

            int index = 0;
            foreach (FontFamily fontFamily in installedFontCollection.Families)
                if (fontFamily.IsStyleAvailable(FontStyle.Regular) 
                    && fontFamily.IsStyleAvailable(FontStyle.Bold) 
                    && fontFamily.IsStyleAvailable(FontStyle.Italic))
                {
                    if (fontFamily.Name == currentFont.Name)
                        index = fonts.Count;
                    fonts.Add(new FontDescriptor(fontFamily));
                }
            
            DebugTimer.Stop(GResources.GetResourceText(29450446)); //RC 29450446 : Získání instalovaných písem
            ThreadService.SafeThreadAsyncCall(
                delegate
                {
                    fontListComboBox.Items.AddRange(fonts.ToArray());
                    fontSizeComboBox.Enabled = true;
                    fontListComboBox.Enabled = true;
                    fontListComboBox.SelectedIndex = index;
                    fontSizeComboBox.Text = currentFont.Size.ToString();
                });
            DebugTimer.Start();
            using (Bitmap newBitmap = new Bitmap(1, 1))
            {
                using (Graphics g = Graphics.FromImage(newBitmap))
                {
                    foreach (FontDescriptor fd in fonts)
                        fd.DetectMonospaced(g);
                }
            }
            DebugTimer.Stop(GResources.GetResourceText(29450447)); //RC 29450447 : Detekce strojopisu
            fontListComboBox.Invalidate();
        }

        /// <exclude/>
        internal void MeasureComboBoxItem(object sender, System.Windows.Forms.MeasureItemEventArgs e)
        {
            ComboBox comboBox = (ComboBox)sender;
            if (e.Index >= 0)
            {
                FontDescriptor fontDescriptor = (FontDescriptor)comboBox.Items[e.Index];
                SizeF size = e.Graphics.MeasureString(fontDescriptor.Name, comboBox.Font);
                e.ItemWidth = (int)size.Width;
                e.ItemHeight = (int)comboBox.Font.Height;
            }
        }
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
                FontDescriptor fontDescriptor = (FontDescriptor)comboBox.Items[e.Index];
                e.Graphics.DrawString(fontDescriptor.Name,
                                      fontDescriptor.IsMonospaced ? boldComboBoxFont : 
                                      comboBox.Font,
                                      drawItemBrush,
                                      drawingRect,
                                      drawStringFormat);
            }
            e.DrawFocusRectangle();
        }
        
        /// <summary>
        /// Descriptor písma
        /// </summary>
        public class FontDescriptor : IDisposable
        {
            #region IDisposable
            /// <summary>
            /// uvolnění objektu
            /// </summary>
            public void Dispose()
            {
                Dispose(true);
                GC.SuppressFinalize(this);
            }

            /// <summary>
            /// uvolnění objektu
            /// </summary>
            /// <param name="disposing">indikace uvolnění</param>
            protected virtual void Dispose(bool disposing)
            {
                if (disposing)
                {
                    if (fontFamily != null)
                    {
                        fontFamily.Dispose();
                        fontFamily = null;
                    }
                }
            }
            /// <summary>
            /// finalizer třídy
            /// </summary>
            ~FontDescriptor() { Dispose(false); }
            #endregion

            FontFamily fontFamily;
            /// <exclude/>
            internal string Name;
            /// <exclude/>
            internal bool IsMonospaced;
            /// <summary>
            /// Vytvoření nové instance třídy
            /// </summary>
            /// <param name="fontFamily">písmo</param>
            public FontDescriptor(FontFamily fontFamily)
            {
                this.fontFamily = fontFamily;
                this.Name = fontFamily.Name;
            }
            /// <exclude/>
            internal void DetectMonospaced(Graphics g)
            {
                this.IsMonospaced = DetectMonospaced(g, fontFamily);
            }

            static bool DetectMonospaced(Graphics g, FontFamily fontFamily)
            {
                using (Font f = new Font(fontFamily, 10))
                {
                    int w1 = TextRenderer.MeasureText("i.", f).Width;
                    int w2 = TextRenderer.MeasureText("mw", f).Width;
                    return w1 == w2;
                }
            }

            /// <summary>
            /// řetězcová prezentace položky
            /// </summary>
            /// <returns>Řetězec, prezentující danou položku</returns>
            public override string ToString() { return Name; }
        }
    }

}
