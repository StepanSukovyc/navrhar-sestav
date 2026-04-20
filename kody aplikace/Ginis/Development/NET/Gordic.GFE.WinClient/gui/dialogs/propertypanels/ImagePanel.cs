//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ImagePanel.cs                          </Name>
//    <Description> Panel editace obrázku                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-21                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.WinForms.Controls;
using Gordic.General;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.Gui.PropertyPanels
{
    /// <summary>
    /// Panel editace obrázku
    /// </summary>
    class ImagePanel : AbstractPropertyPanel
    {
        #region AbstractPropertyPanel
        /// <summary>
        /// Získání nové hodnoty - PropertyGrid
        /// </summary>
        /// <returns>Nová hodnota</returns>
        public override object PropertyValue { get { return new ImageItem(_image, _imageName); } }
        /// <summary>
        /// Reakce na akceptace změn
        /// </summary>
        /// <returns>TRUE- změna provedená</returns>
        protected override bool Accept()
        {
            if (Service == null)
                return true;

            if (_changeGlobal || _changeImage || _changeImageName || _changeWidthSizeType
                || _changeImgWidth || _changeImgHeight || _changeGlobal)
            {
                if (!UndoRedoService.IsTransactionStarted)
                    UndoRedoService.StartTransaction(GResources.GetResourceText(29450476)); //RC 29450476 : změna obrázku

                foreach (object item in Service.SelectedComponents)
                {
                    IImage image = item as IImage;
                    // zafixujeme Obsah vybraného objektu
                    if (image != null)
                    {
                        // pokud obrázek byl pozměněn, pak
                        if (_changeImage)
                        {
                            // buď ho odstraníme
                            if (_image == null)
                                image.Image = null;
                            // nebo načteme
                            else
                                image.Image = ImageService.GetImage(textBox3.Text, false);
                        }
                        if (_changeImageName)
                            image.ImageFileName = (image.Image == null && !cbGlobal.Checked) ? string.Empty : textBox3.Text;

                        if (_changeWidthSizeType)
                        {
                            if (rbWCell.Checked)
                                image.WidthSizeType = ImageSizeValueType.cell;
                            else if (rbWImage.Checked)
                                image.WidthSizeType = ImageSizeValueType.image;
                            else
                                image.WidthSizeType = ImageSizeValueType.spec;
                        }

                        if (_changeHeightSizeType)
                        {
                            if (rbHCell.Checked)
                                image.HeightSizeType = ImageSizeValueType.cell;
                            else if (rbHImage.Checked)
                                image.HeightSizeType = ImageSizeValueType.image;
                            else
                                image.HeightSizeType = ImageSizeValueType.spec;
                        }

                        if (_changeImgWidth)
                            image.ContentImageWidth = new SizeValue(textBox1.Text);

                        if (_changeImgHeight)
                            image.ContentImageHeight = new SizeValue(textBox2.Text);

                        if (_changeGlobal)
                            image.Global = cbGlobal.Checked;
                    }
                }
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
                listBox2.Items.Clear();
                images.Clear();
                _image = null;
                _imageWidthSizeType = -1;
                _imageHeightSizeType = -1;
                _imagePixelsW = -1;
                _imagePixelsH = -1;
                _imageValueW = string.Empty;
                _imageValueH = string.Empty;
                _imageName = string.Empty;

                int _global = -1;

                bool first = true;

                images.Add("<none>", null);
                images.AddRange(ImageService.GetImages(View));

                // projdeme všechny vybrané položky a zjistíme jejích hodnoty
                if (Service != null)
                {
                    foreach (object item in Service.SelectedComponents)
                    {
                        IImage image = item as IImage;
                        // zafixujeme Obsah vybraného objektu
                        if (image != null)
                        {
                            // pokud je to první objekt, pak jeho vlastnosti nakopírujeme
                            if (first)
                            {
                                if (image.Image != null
                                    && !string.IsNullOrEmpty(image.ImageFileName))
                                {
                                    if (!images.ToList().Exists(pk => pk.Key.Equals(image.ImageFileName, StringComparison.InvariantCultureIgnoreCase)))
                                        images.Add(image.ImageFileName, new Bitmap(image.Image));

                                    _imageName = images.ToList().First(pk => pk.Key.Equals(image.ImageFileName, StringComparison.InvariantCultureIgnoreCase)).Key;
                                }
                                _global = image.Global ? 1 : 0;

                                _imageWidthSizeType = (int)image.WidthSizeType;
                                _imagePixelsW = image.ContentImageWidth;
                                _imageValueW = image.ContentImageWidth.Value;

                                _imageHeightSizeType = (int)image.HeightSizeType;
                                _imagePixelsH = image.ContentImageHeight;
                                _imageValueH = image.ContentImageHeight.Value;

                                first = false;
                            }
                            else
                            {
                                if (image.Image != null
                                    && !string.IsNullOrEmpty(image.ImageFileName)
                                    && !images.ToList().Exists(pk => pk.Key.Equals(image.ImageFileName, StringComparison.InvariantCultureIgnoreCase)))
                                    images.Add(image.ImageFileName, new Bitmap(image.Image));

                                if (_global != -1 &&
                                    _global != (image.Global ? 1 : 0))
                                    _global = -1;

                                if (_imageWidthSizeType != -1
                                    && _imageWidthSizeType != ((int)image.WidthSizeType))
                                    _imageWidthSizeType = -1;

                                if (_imagePixelsW != -1
                                    && _imagePixelsW != image.ContentImageWidth)
                                    _imagePixelsW = -1;

                                if (_imageValueW != null)
                                    if (!_imageValueW.Equals(image.ContentImageWidth.Value, StringComparison.InvariantCultureIgnoreCase))
                                        _imageValueW = null;

                                if (_imageHeightSizeType != -1
                                    && _imageHeightSizeType != ((int)image.HeightSizeType))
                                    _imageHeightSizeType = -1;

                                if (_imagePixelsH != -1
                                    && _imagePixelsH != image.ContentImageHeight)
                                    _imagePixelsH = -1;

                                if (_imageValueH != null)
                                    if (!_imageValueH.Equals(image.ContentImageHeight.Value, StringComparison.InvariantCultureIgnoreCase))
                                        _imageValueH = null;

                                if (_imageName != null)
                                    if (!_imageName.Equals(image.ImageFileName, StringComparison.InvariantCultureIgnoreCase))
                                        _imageName = null;
                            }
                        }
                    }
                }
                rbWCell.Checked = _imageWidthSizeType == 0;
                rbWImage.Checked = _imageWidthSizeType == 1;
                rbWSpec.Checked = _imageWidthSizeType == 2 || _imageHeightSizeType == 2;

                rbHCell.Checked = _imageHeightSizeType == 0;
                rbHImage.Checked = _imageHeightSizeType == 1;
                rbHSpec.Checked = _imageHeightSizeType == 2;

                textBox1.Enabled = _imageWidthSizeType == 2;
                textBox2.Enabled = _imageHeightSizeType == 2;
                cbGlobal.Checked = _global == 1;

                if (textBox1.Enabled)
                    textBox1.Text = _imageValueW;
                if (textBox2.Enabled)
                    textBox2.Text = _imageValueH;

                foreach (KeyValuePair<string, Image> item in images)
                    listBox2.Items.Add(item.Key);

                if (listBox2.Items.Count > 0 && !string.IsNullOrEmpty(_imageName))
                    listBox2.SelectedIndex = listBox2.Items.IndexOf(_imageName);
                else
                    listBox2.SelectedIndex = 0;
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " ImagePanel:" + ex.Message); }
            _changeWidthSizeType = false;
            _changeGlobal = false;
            _changeImgWidth = false;
            _changeImgHeight = false;
            _changeImageName = false;
            _changeImage = false;
            _changeImageName = false;
        }

        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            try
            {
                SetupLocalizedXFRM(AssemblyName + ".Resources.forms.property.ImagePanel.xfrm");
                textBox3 = (GLabeledTextBox)ControlDictionary["textBox3"];
                textBox3.TextChanged += delegate { _changeImageName = true; _imageName = textBox3.Text.Equals("<none>", StringComparison.InvariantCultureIgnoreCase) ? null : textBox3.Text; };

                cbGlobal = (CheckBox)ControlDictionary["cbGlobal"];
                cbGlobal.CheckedChanged += delegate { _changeGlobal = true; textBox3.Enabled = cbGlobal.Checked; };

                textBox1 = (TextBox)ControlDictionary["textBox1"];
                textBox1.TextChanged += delegate { _changeImgWidth = true; _changeWidthSizeType = true; };

                textBox2 = (TextBox)ControlDictionary["textBox2"];
                textBox2.TextChanged += delegate { _changeImgHeight = true; _changeHeightSizeType = true; };

                rbWCell = (RadioButton)ControlDictionary["rbWCell"];
                rbWCell.CheckedChanged += delegate
                {
                    _changeWidthSizeType = true;
                    textBox1.Enabled = false;
                };

                rbWImage = (RadioButton)ControlDictionary["rbWImage"];
                rbWImage.CheckedChanged += delegate
                {
                    //text je záměrně pozměněn
                    _changeWidthSizeType = true;
                    textBox1.Enabled = false;
                };

                rbWSpec = (RadioButton)ControlDictionary["rbWSpec"];
                rbWSpec.CheckedChanged += delegate
                {
                    //text je záměrně pozměněn
                    _changeWidthSizeType = true;
                    textBox1.Enabled = true;
                };


                rbHCell = (RadioButton)ControlDictionary["rbHCell"];
                rbHCell.CheckedChanged += delegate
                {
                    _changeHeightSizeType = true;
                    textBox2.Enabled = false;
                };

                rbHImage = (RadioButton)ControlDictionary["rbHImage"];
                rbHImage.CheckedChanged += delegate
                {
                    //text je záměrně pozměněn
                    _changeHeightSizeType = true;
                    textBox2.Enabled = false;
                };

                rbHSpec = (RadioButton)ControlDictionary["rbHSpec"];
                rbHSpec.CheckedChanged += delegate
                {
                    //text je záměrně pozměněn
                    _changeHeightSizeType = true;
                    textBox2.Enabled = true;
                };

                listBox2 = (ListBox)ControlDictionary["listBox2"];
                listBox2.SelectedIndexChanged += delegate
                {
                    _changeImage = true;

                    if (listBox2.SelectedIndex != -1)
                    {
                        textBox3.Text = Convert.ToString(listBox2.SelectedItem);
                        _image = images[Convert.ToString(listBox2.SelectedItem)];
                    }
                    else
                    {
                        _image = null;
                        textBox3.Text = string.Empty;
                    }
                    ((Panel)ControlDictionary["pnlPreview"]).Invalidate();
                };

                ((Panel)ControlDictionary["pnlPreview"]).Paint += delegate
                {
                    if (_image != null)
                    {
                        Graphics _graphics = ((Panel)ControlDictionary["pnlPreview"]).CreateGraphics();
                        _graphics.DrawImage(_image, new Rectangle(10, 10, ((Panel)ControlDictionary["pnlPreview"]).Width - 20, ((Panel)ControlDictionary["pnlPreview"]).Height - 20));
                    }
                };

                //((Button)ControlDictionary["btnDelete"]).Click += delegate
                //{
                //    listBox2.SelectedIndex = -1;
                //    ((Panel)ControlDictionary["pnlPreview"]).Invalidate();
                //};

                ((Button)ControlDictionary["btnAdd"]).Click += delegate
                {
                    string imageName = string.Empty;
                    Image image = CommonService.GetNewImageByDialog(ref imageName);

                    if (image != null)
                    {
                        // najdeme jednoznačný název
                        if (images.ContainsKey(imageName))
                            imageName = "1_" + imageName;

                        while (images.ContainsKey(imageName))
                            imageName = "1" + imageName;

                        images.Add(imageName, image);
                        listBox2.Items.Add(imageName);
                        listBox2.SelectedIndex = listBox2.Items.Count - 1;
                    }
                };
                ThreadService.SafeThreadAsyncCall(SetDefault);
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " ImagePanel.xfrm:" + ex.Message); }
        }
        /// <summary>
        /// Podmínky viditelnosti daného panelu
        /// </summary>
        /// <returns>TRUE - podmínka je splněná</returns>
        public override bool VisibleCondition()
        {
            if (view == null)
                return base.VisibleCondition();

            return Service != null && Service.SelectedComponents.Exists(item => item is IImage);
        }

        #endregion

        bool _changeImageName, _changeGlobal, _changeImage, _changeWidthSizeType, _changeHeightSizeType, _changeImgWidth, _changeImgHeight;
        int _imageWidthSizeType = -1, _imageHeightSizeType = -1;
        
        float _imagePixelsW = -1,
            _imagePixelsH = -1;

        string _imageValueW = string.Empty, _imageValueH = string.Empty, _imageName;
        GLabeledTextBox textBox3;
        TextBox textBox1, textBox2;
        RadioButton rbWCell, rbWImage, rbWSpec, rbHCell, rbHImage, rbHSpec;
        ListBox listBox2;
        CheckBox cbGlobal;
        Dictionary<string, Image> images = new Dictionary<string, Image>();
        Image _image;
    }
}
