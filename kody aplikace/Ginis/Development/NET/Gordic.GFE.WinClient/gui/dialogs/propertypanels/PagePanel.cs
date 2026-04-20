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
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.WinForms.Controls;
using Gordic.General;
using Gordic.GFE.Parsers.Core;
using System.Threading;
using Gordic.GFE.Parsers.Hosting;
using System.Drawing;

namespace Gordic.GFE.WinClient.Gui.PropertyPanels
{
    /// <summary>
    /// Panel řádku
    /// </summary>
    class PagePanel : AbstractPropertyPanel
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

        /// <summary>
        /// Reakce na tlačítko Výchozí hodnoty
        /// </summary>
        /// <returns>True - Nastavení provedené</returns>
        protected override void SetDefault()
        {
            formatComboBox.Items.Clear();
            formatComboBox.Items.AddRange(ListOfFormats.Formats);
            try
            {
                if (Service != null)
                {
                    IPage page = Service.SelectedComponents.FirstOrDefault(mm => mm is IPage) as IPage;
                    if (page != null)
                    {
                        formatComboBox.Text = page.Format;
                        tbLeft.Text = page.MarginLeft.Value;
                        tbTop.Text = page.MarginTop.Value;
                        tbBottom.Text = page.MarginBottom.Value;
                        tbRight.Text = page.MarginRight.Value;
                        if (page is IBackground && (page as IBackground).BackImage != null)
                        {
                            this.image = (page as IBackground).BackImage.Image;
                            this.imageName = (page as IBackground).BackImage.ImageFile;
                        }
                    }
                }
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " PagePanel:" + ex.Message); }
            formatChanged = false;
            ((TextBox)ControlDictionary["tbPicture"]).Text = imageName;
            UpdatePagePreview(true);
        }
        /// <summary>
        /// Reakce na akceptace změn
        /// </summary>
        /// <returns>TRUE- změna provedená</returns>
        protected override bool Accept()
        {
            if (Service == null)
                return true;

            if (formatChanged || mLeft || mTop || mRight || mBottom)
            {
                if (!UndoRedoService.IsTransactionStarted)
                    UndoRedoService.StartTransaction(GResources.GetResourceText(29450688)); //RC 29450688 : změna vlastnosti stránky

                IPage page = Service.SelectedComponents.FirstOrDefault(mm => mm is IPage) as IPage;
                if (page != null)
                {
                    if (formatChanged)
                        (page as AbstractPage).Format = formatComboBox.Text;
                    if (mLeft)
                        page.MarginLeft = new Parsers.Utils.SizeValue(tbLeft.Text);
                    if (mRight)
                        page.MarginRight = new Parsers.Utils.SizeValue(tbRight.Text);
                    if (mTop)
                        page.MarginTop = new Parsers.Utils.SizeValue(tbTop.Text);
                    if (mBottom)
                        page.MarginBottom = new Parsers.Utils.SizeValue(tbBottom.Text);
                }
            }
            if (_colorChanged || _imageChanged)
            {
                IBackground page = Service.SelectedComponents.FirstOrDefault(mm => mm is IPage) as IBackground;
                if (page != null)
                {
                    if (_colorChanged)
                    {
                        page.BackColor = new URComplexColor();
                        page.BackColor.Initialize((cbColor.SelectedItem as ColorComboBox.ColorDescriptor).Color);
                    }
                    if (_imageChanged)
                        page.BackImage = new BackgroundImage(this.image, this.imageName);
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
                SetupLocalizedXFRM(AssemblyName + ".Resources.forms.property.PagePanel.xfrm");
                cbColor = ((ColorComboBox)ControlDictionary["bckColorComboBox"]);
                cbColor.Enabled = false;
                cbColor.TextChanged += delegate { if (!helper.IsLoading) _colorChanged = true; UpdatePagePreview(); };
                cbColor.SelectedIndexChanged += delegate { if (!helper.IsLoading) _colorChanged = true; UpdatePagePreview(); };
                btnAddColor = ((Button)ControlDictionary["btnAddColor"]);

                formatComboBox = (ComboBox)ControlDictionary["formatComboBox"];
                formatComboBox.TextChanged += delegate { formatChanged = true; };

                tbLeft = (GLabeledTextBox)ControlDictionary["tbLeft"];
                tbLeft.TextChanged += delegate { mLeft = true; };

                tbRight = (GLabeledTextBox)ControlDictionary["tbRight"];
                tbRight.TextChanged += delegate { mRight = true; };

                tbTop = (GLabeledTextBox)ControlDictionary["tbTop"];
                tbTop.TextChanged += delegate { mTop = true; };

                tbBottom = (GLabeledTextBox)ControlDictionary["tbBottom"];
                tbBottom.TextChanged += delegate { mBottom = true; };

                helper = new BckSelectionHelper(cbColor);
                cbColor.DrawItem += new System.Windows.Forms.DrawItemEventHandler(helper.ComboBoxDrawItem);

                btnAddColor.Click += btnAddColor_Click;
                helper.StartColorsThread();

                ((Button)ControlDictionary["btnAddPicture"]).Click += delegate
                {
                    string imageName = string.Empty;
                    Image image = CommonService.GetNewImageByDialog(ref imageName);
                    if (image != this.image)
                    {
                        this.imageName = imageName;
                        this.image = image;
                        ((TextBox)ControlDictionary["tbPicture"]).Text = imageName;
                        _imageChanged = true;
                        UpdatePagePreview();
                    }
                };

                ThreadService.SafeThreadAsyncCall(SetDefault);
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " PagePanel.xfrm:" + ex.Message); }
        }

        /// <summary>
        /// Podmínky viditelnosti daného panelu
        /// </summary>
        /// <returns>TRUE - podmínka je splněná</returns>
        public override bool VisibleCondition()
        {
            if (view == null)
                return base.VisibleCondition();

            return Service != null && Service.SelectedComponents.Exists(item => item is IPage);
        }
        #endregion

        sealed class BckSelectionHelper
        {
            ColorComboBox cbColor;

            /// <exclude/>
            public BckSelectionHelper(ColorComboBox cbColor) { this.cbColor = cbColor; }

            Thread threadColors;
            /// <exclude/>
            public void StartColorsThread()
            {
                threadColors = new Thread(refreshColorsThread);
                threadColors.IsBackground = true;
                threadColors.Start();
            }

            /// <summary>
            /// Aktualizace seznamů barev
            /// </summary>
            void refreshColorsThread()
            {
                Thread.Sleep(0);

                ////////////////////// BackColor
                DebugTimer.Start();
                List<ColorComboBox.ColorDescriptor> colors = new List<ColorComboBox.ColorDescriptor>();

                foreach (var item in ColorService.ColorNameCzEn)
                    colors.Add(new ColorComboBox.ColorDescriptor(item));

                DebugTimer.Stop(GResources.GetResourceText(29450473)); //RC 29450473 : Získání konfigurovaných barev
                // aktualizace barev
                ThreadService.SafeThreadAsyncCall(
                    delegate
                    {
                        cbColor.Items.Clear();
                        cbColor.Items.AddRange(colors.ToArray());
                        cbColor.Enabled = true;

                        UpdatePagePreviewPanel(pagePreviewPanel, setDefault, service);
                    });

                cbColor.Invalidate();
            }

            SelectionService service;
            bool setDefault;

            bool ThreadsRunning() { return (threadColors != null && threadColors.ThreadState != ThreadState.Stopped); }
            bool SetDefault(SelectionService service = null)
            {
                if (service != null)
                {
                    // pole indexů vybraných položek v comboboxech
                    int _indexColor = -1;

                    bool first = true;
                    // projdeme všechny vybrané položky a zjistíme jejích hodnoty
                    foreach (object item in service.SelectedComponents)
                    {
                        var ith = item as IBackground;
                        if (ith != null)
                        {
                            // pokud je to první objekt, pak jeho vlastnosti nakopírujeme
                            if (first)
                            {
                                first = false;
                                if (ith.BackColor != null)
                                    _indexColor = GetIndex(cbColor, new GFEColor(ith.BackColor.Color));
                                else
                                    _indexColor = -1;
                            }
                            else
                                //_indexColor==-1 znamená, že obsahy nejsou stejné
                                if (ith.BackColor != null)
                            {
                                if (_indexColor != -1
                                    && _indexColor != GetIndex(cbColor, new GFEColor(ith.BackColor.Color)))
                                    _indexColor = -1;
                            }
                            else
                                _indexColor = -1;
                        }
                    }

                    cbColor.SelectedIndex = _indexColor;

                    return true;
                }
                else
                    return false;
            }

            bool isUpdating;
            Control pagePreviewPanel;

            /// <summary>
            /// aktualizace písma štítku
            /// </summary>
            /// <param name="pagePreviewPanel">štítek</param>
            /// <param name="setDefault">Indikuje načtení výchozích hodnot</param>
            /// <param name="service">Služba vybraných objektů</param>
            /// <param name="image">obrázek pozadí</param>
            public void UpdatePagePreviewPanel(Control pagePreviewPanel, bool setDefault, SelectionService service = null, Image image = null)
            {
                if (isUpdating)
                    return;

                this.service = service;
                this.setDefault = setDefault;
                this.pagePreviewPanel = pagePreviewPanel;

                if (cbColor == null)
                    return;

                isUpdating = true;
                if (setDefault)
                {
                    IsLoading = true;
                    SetDefault(service);
                }

                ColorComboBox.ColorDescriptor colorDescriptor =
                    cbColor.SelectedIndex != -1 ?
                    (ColorComboBox.ColorDescriptor)cbColor.Items[cbColor.SelectedIndex]
                    : new ColorComboBox.ColorDescriptor();

                pagePreviewPanel.Visible = true;
                pagePreviewPanel.BackColor = colorDescriptor.Color;

                if (image != null)
                    pagePreviewPanel.BackgroundImage = image;

                isUpdating = false;
                IsLoading = false;
            }

            /// <exclude/>
            internal void ComboBoxDrawItem(object sender, System.Windows.Forms.DrawItemEventArgs e)
            {
                e.DrawBackground();

                if (e.Index >= 0)
                    if (sender is ColorComboBox)
                        (sender as ColorComboBox).ComboBoxDrawItem(e);

                e.DrawFocusRectangle();
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

            /// <summary>
            /// Indikuje stav načítání objektu
            /// </summary>
            public bool IsLoading { get; set; }
        }

        BckSelectionHelper helper;
        Button btnAddColor;

        ComboBox formatComboBox;
        ColorComboBox cbColor;
        GLabeledTextBox tbLeft, tbRight, tbTop, tbBottom;
        Image image;
        string imageName;
        bool formatChanged, mLeft, mTop, mRight, mBottom, _colorChanged, _imageChanged;

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

        void UpdatePagePreview() { UpdatePagePreview(false); }

        /// <summary>
        /// Aktualizace náhledu
        /// </summary>
        /// <param name="setDefault">Indikuje nutnost načtení výchozích hodnot</param>
        void UpdatePagePreview(bool setDefault)
        {
            try { helper.UpdatePagePreviewPanel(ControlDictionary["pagePreviewPanel"], setDefault, Service, image); }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " PagePanel:" + ex.Message); }
        }

    }
}
