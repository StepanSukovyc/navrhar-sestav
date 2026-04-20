//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SelectOption.cs                        </Name>
//    <Description> Položka výběru                                              </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2016-10-20                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.WinClient.Gui;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Drawing.Design;
using System.Linq;
using System.Text;
using Gordic.GFE.Parsers.Utils;
using System.Xml;
using Gordic.GFE.WinClient.GrfEditor;
using Gordic.GFE.WinClient.Utils;

namespace Gordic.GFE.WinClient.Editor
{

    /// <summary>
    /// Položka výběru
    /// </summary>
    class SelectOption
    {
        readonly UndoRedo<string> value;
        /// <summary>
        /// Výška obrázku
        /// </summary>
        [Category("Volba")]
        [DisplayName("hodnota")]
        [Description("Hodnota volby výběru")]
        public string Value { get => this.value.Value; set { this.value.Value = value; } }

        UndoRedo<string> shape;
        /// <summary>
        /// TODO
        /// </summary>
        [Category("Volba")]
        [DisplayName("tvar")]
        [Description("TODO")]
        public string Shape { get => shape.Value; set { shape.Value = value; } }

        UndoRedo<Image> image;
        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        [Category("Volba")]
        [DisplayName("obrázek")]
        [Description("Obrázek objektu")]
        [Browsable(false)]
        public Image Image { get => image.Value; set { image.Value = value; } }

        UndoRedo<string> imagefilename;
        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        [Category("Volba")]
        [DisplayName("název obrázku")]
        [Description("Název obrázku objektu v seznamu všech obrázků dané sestavy")]
        [EditorAttribute(typeof(OnlyImageFileNameTypeEditor), typeof(UITypeEditor))]
        [TypeConverter(typeof(ImageFileNameConverter))]
        public string ImageFileName
        {
            get => imagefilename.Value;
            set
            {
                if (!initializing)
                {
                    if (formFile == null)
                        SetFormFile();

                    if (!string.IsNullOrEmpty(value)
                        && !string.IsNullOrEmpty(imagefilename.Value))
                    {
                        // pokud obrázek s daným názvem existuje, pak ho načteme
                        // tato odbočka je pro případ, že chceme načíst obrázek zadaním názvu
                        if (!imagefilename.Value.Equals(value, StringComparison.InvariantCultureIgnoreCase))
                        {
                            Image bmp = ImageService.GetImage(value, formFile, false);
                            if (bmp != Image)
                                if (ImageService.CopyImage(imagefilename.Value, value, formFile))
                                    Image = ImageService.GetImage(value, formFile, false);
                        }
                    }
                    else
                        if (!string.IsNullOrEmpty(value) && Image == null)
                        Image = ImageService.GetImage(value, formFile, false);
                }

                imagefilename.Value = value;
            }
        }

        UndoRedo<GFEAttrList> attrlist;
        /// <summary>
        /// Všechny atributy objektu
        /// </summary>
        [Category("Volba")]
        [DisplayName("atributy")]
        [Description("Všechny atributy")]
        [EditorAttribute(typeof(AttributeListEditor), typeof(UITypeEditor))]
        public GFEAttrList AttrList { get => attrlist.Value; set { attrlist.Value = value; } }

        UndoRedo<SelectionOptionTyp> optiontyp;
        /// <summary>
        /// Výška obrázku
        /// </summary>
        [Category("Objekt")]
        [DisplayName("typ výběru")]
        [Description("Typ výběru")]
        public SelectionOptionTyp OptionTyp { get => optiontyp.Value; set { optiontyp.Value = value; } }

        UndoRedo<bool> webviewlabel;
        /// <summary>
        /// Indikuej zobarzení štítku webového rozhraní
        /// </summary>
        [Category("WEB")]
        [DisplayName("zobrazit štítek (web)")]
        [Description("Indikuej zobarzení štítku webového rozhraní")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        public bool WebViewLabel { get => webviewlabel.Value; set { webviewlabel.Value = value; } }

        dynamic innerObject;
        /// <summary>
        /// Výška obrázku
        /// </summary>
        [Category("Objekt")]
        [Browsable(false)]
        public dynamic InnerObject { get => innerObject; set { innerObject = value; } }

        /// <summary>
        /// inicializace objektu dle 
        /// </summary>
        /// <param name="FormatTag"></param>
        /// <param name="page">Stránka objektu</param>
        public void Initialize(dynamic FormatTag, IPage page)
        {
            initializing = true;
            if (FormatTag is GFEFormatTag)
            {
                if (FormatTag != null && FormatTag.Children.Count > 0)
                {
                    var chld = (FormatTag as GFEFormatTag).Children.First();
                    if (chld != null)
                    {
                        if (chld is GFEFormatContentDrawing)
                        {
                            if (chld.Attributes.ContainsKey("shape"))
                                Shape = Convert.ToString(chld.Attributes["shape"]);
                            OptionTyp = SelectionOptionTyp.drawing;
                        }
                        else if (chld is GFEFormatContentImage)
                        {
                            SetFormFile();
                            if (chld.Attributes.ContainsKey("file"))
                                ImageFileName = chld.Attributes["file"];

                            Image = ImageService.GetImage(ImageFileName, formFile, false);
                            OptionTyp = SelectionOptionTyp.image;
                        }
                        else if (chld is GFEFormatContentText)
                        {
                            innerObject = new GrfContentText();
                            innerObject.Initialize(chld);
                            innerObject.Load(page, null);
                            OptionTyp = SelectionOptionTyp.text;
                        }
                        AttrList.AddRange(chld.Attributes);
                        AttrList.SynchronizeByOrigin();

                        if (FormatTag.Attributes.ContainsKey("value"))
                            Value = Convert.ToString(FormatTag.Attributes["value"]);
                        WebViewLabel = new BooleanTypeConverter().ConvertFrom(FormatTag.Attributes.ContainsKey("webview-label") ? FormatTag.Attributes["webview-label"] : "false");
                    }
                }
            }
            // jedná se o klonování (kopírování)
            else if (FormatTag is SelectOption)
            {
                var ft = FormatTag as SelectOption;
                Shape = ft.Shape;
                OptionTyp = ft.OptionTyp;
                if (ft.ImageFileName != null)
                {
                    ImageFileName = ft.ImageFileName;
                    Image = ImageService.GetImage(ImageFileName, formFile, false);
                }

                if (ft.InnerObject is ICloneable)
                    innerObject = (ft.InnerObject as ICloneable).Clone();

                Value = ft.Value;
                WebViewLabel = ft.WebViewLabel;
                AttrList.AddRange(ft.AttrList);
                AttrList.SynchronizeByOrigin();
            }
            initializing = false;
        }

        /// <summary>
        /// Tento soubor pro případ IFormFormation sestav se může líšit od ActiveViewContent.PrimaryFile
        /// </summary>
        OpenedFile formFile;
        bool initializing;
        /// <summary>
        /// konstruktor třídy
        /// </summary>
        public SelectOption()
        {
            value = new UndoRedo<string>();
            shape = new UndoRedo<string>();
            imagefilename = new UndoRedo<string>();
            image = new UndoRedo<Image>();
            attrlist = new UndoRedo<GFEAttrList>();
            AttrList = new GFEAttrList(UndoRedoService.Manager);
            optiontyp = new UndoRedo<SelectionOptionTyp>();
            webviewlabel = new UndoRedo<bool>();
        }

        /// <summary>
        /// Získání XML prezentace objektu
        /// </summary>
        /// <param name="xmlDoc"></param>
        /// <param name="namespaceUri"></param>
        /// <param name="styles"></param>
        /// <returns></returns>
        public XmlElement GetDataComponent(XmlDocumentPosition xmlDoc, string namespaceUri = null, List<GFEList> styles = null)
        {
            XmlElement xmlNode = xmlDoc.CreateElement("option", string.IsNullOrEmpty(namespaceUri) ? ReportDesignerProperties.Instance.AlfReportXmlns : namespaceUri);
            if (!string.IsNullOrEmpty(Value))
                xmlNode.SetAttribute("value", CharacterEncodings.GetHexCodeText(Value));
            XmlElement xmlOption;
            switch (OptionTyp)
            {
                case SelectionOptionTyp.drawing:
                    xmlOption = xmlDoc.CreateElement("drawing", string.IsNullOrEmpty(namespaceUri) ? ReportDesignerProperties.Instance.AlfReportXmlns : namespaceUri);
                    if (!string.IsNullOrEmpty(Shape))
                        xmlOption.SetAttribute("shape", Shape);
                    foreach (var item in AttrList)
                        if (!item.Key.Equals("shape"))
                            xmlOption.SetAttribute(item.Key, item.Value);
                    xmlNode.AppendChild(xmlOption);
                    break;
                case SelectionOptionTyp.image:
                    if (ImageFileName != null)
                    {
                        xmlOption = xmlDoc.CreateElement("image", string.IsNullOrEmpty(namespaceUri) ? ReportDesignerProperties.Instance.AlfReportXmlns : namespaceUri);
                        if (!string.IsNullOrEmpty(ImageFileName))
                            xmlOption.SetAttribute("file", ImageFileName);
                        foreach (var item in AttrList)
                            if (!item.Key.Equals("file"))
                                xmlOption.SetAttribute(item.Key, item.Value);
                        xmlNode.AppendChild(xmlOption);
                    }
                    break;
                case SelectionOptionTyp.text:
                    xmlNode.AppendChild(innerObject.GetXmlData(xmlDoc, new List<GFEList>()));
                    break;
                default:
                    break;
            }

            if (WebViewLabel)
                xmlNode.SetAttribute("webview-label", "ano");

            return xmlNode;
        }
        void SetFormFile()
        {
            formFile = SimpleDesktop.Desktop.ActiveViewContent is IFormFormation
                ? (SimpleDesktop.Desktop.ActiveViewContent as IFormFormation).FormFile
                : SimpleDesktop.Desktop.ActiveViewContent.PrimaryFile;
        }
        /// <summary>
        /// Indikuje, že objektje prázdný
        /// </summary>
        /// <returns>TRUE - objekt je prázdný, jinak FALSE</returns>
        public bool IsEmpty() => Shape == null && AttrList.Count == 0 && Image == null && innerObject == null;
    }
}
