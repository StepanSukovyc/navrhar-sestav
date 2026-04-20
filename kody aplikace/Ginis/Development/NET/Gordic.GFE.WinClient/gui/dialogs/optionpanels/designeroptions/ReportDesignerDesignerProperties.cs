//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ReportDesignerDesignerProperties.cs    </Name>
//    <Description> Vlastnosti vychozího nastavení Designéru                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.General;

namespace Gordic.GFE.WinClient.Designer.Gui
{
    /// <summary>
    /// Vlastnosti vychozího nastavení Designéru
    /// </summary>
    public sealed class ReportDesignerDesignerProperties : IDesignerOptions
    {
        static ReportDesignerDesignerProperties designerProperties;
        Property mainProperties, newTextProperties, newImageProperties;

        /// <summary>
        /// Instance třídy
        /// </summary>
        public static ReportDesignerDesignerProperties Instance
        {
            get
            {
                if (designerProperties == null)
                    designerProperties = new ReportDesignerDesignerProperties();

                return designerProperties;
            }
        }

        private ReportDesignerDesignerProperties()
        {
            mainProperties = PropertyService.Get("ReportDesigner.Designer.DefaultDesignerProperties", new Property());
            newTextProperties = PropertyService.Get("ReportDesigner.Designer.DefaultDesignerProperties.NewText", new Property());
            newImageProperties = PropertyService.Get("ReportDesigner.Designer.DefaultDesignerProperties.NewImage", new Property());
        }

        #region NewImage
        /// <summary>
        /// Po přetažení nového obrázku na stránku zobrazit dialog nového obrzku?
        /// </summary>
        public bool ImageShowDialog
        {
            get { return newImageProperties.Get("ShowDialog", false); }
            set { newImageProperties.Set("ShowDialog", value); }
        }

        /// <summary>
        /// šířka nového obrázku
        /// </summary>
        public string ImageWidth
        {
            get { return newImageProperties.Get("ImageWidth", "50mm"); }
            set { newImageProperties.Set("ImageWidth", value); }
        }

        /// <summary>
        /// šířka nového obrázku
        /// </summary>
        public string ImageHeight
        {
            get { return newImageProperties.Get("ImageHeight", "50mm"); }
            set { newImageProperties.Set("ImageHeight", value); }
        }
        /// <summary>
        /// Výchozí metrika vkládaného obrázku
        /// </summary>
        public string ImageDefaultMetrics
        {
            get { return newTextProperties.Get("ImageDefaultMetrics", "mm"); }
            set { newTextProperties.Set("ImageDefaultMetrics", value); }
        }
        #endregion

        #region TextBox
        /// <summary>
        /// šířka nového textového pole.
        /// Je to Value hodnota objektu Float
        /// </summary>
        public string TextBoxWidth
        {
            get { return newTextProperties.Get("TextBoxWidth", "50mm"); }
            set { newTextProperties.Set("TextBoxWidth", value); }
        }

        /// <summary>
        /// Výška nového textového pole.
        /// Je to Value hodnota objektu Float
        /// </summary>
        public string TextBoxHeight
        {
            get { return newTextProperties.Get("TextBoxHeight", "20mm"); }
            set { newTextProperties.Set("TextBoxHeight", value); }
        }

        /// <summary>
        /// Výchozí hodnota textu
        /// </summary>
        public string TextBoxText
        {
            get { return newTextProperties.Get("TextBoxText", GResources.GetResourceText(29450452)); } //RC 29450452 : Textové pole
            set { newTextProperties.Set("TextBoxText", value); }
        }

        /// <summary>
        /// Indikuje, zda lze měnit šířku
        /// </summary>
        public bool TextBoxEnableChangeWidth
        {
            get { return newTextProperties.Get("TextBoxEnableChangeWidth", true); }
            set { newTextProperties.Set("TextBoxEnableChangeWidth", value); }
        }

        /// <summary>
        /// Indikuje, zda lze měnit výšku
        /// </summary>
        public bool TextBoxEnableChangeHeight
        {
            get { return newTextProperties.Get("TextBoxEnableChangeHeight", true); }
            set { newTextProperties.Set("TextBoxEnableChangeHeight", value); }
        }

        /// <summary>
        /// Indikuje, zda lze měnit text
        /// </summary>
        public bool TextBoxEnableChangeText
        {
            get { return newTextProperties.Get("TextBoxEnableChangeText", true); }
            set { newTextProperties.Set("TextBoxEnableChangeText", value); }
        }

        #endregion

        #region Grafické sestavy
        /// <summary>
        /// Výchozí velikost písma
        /// </summary>
        public string DefaultFontSize
        {
            get { return newTextProperties.Get("DefaultFontSize", "2"); }
            set { newTextProperties.Set("DefaultFontSize", value); }
        }
        /// <summary>
        /// Výchozí barva písma
        /// </summary>
        public string DefaultFontForeColor
        {
            get { return newTextProperties.Get("DefaultFontForeColor", "black"); }
            set { newTextProperties.Set("DefaultFontForeColor", value); }
        }
        /// <summary>
        /// Výchozí barva pozadí písma
        /// </summary>
        public string DefaultFontBackColor
        {
            get { return newTextProperties.Get("DefaultFontBackColor", "transparent"); }
            set { newTextProperties.Set("DefaultFontBackColor", value); }
        }
        /// <summary>
        /// Výchozí písmo
        /// </summary>
        public string DefaultFontFontFamily
        {
            get { return newTextProperties.Get("DefaultFontFontFamily", "arial"); }
            set { newTextProperties.Set("DefaultFontFontFamily", value); }
        }

        /// <summary>
        /// Výchozí odsazení rámečku zleva
        /// </summary>
        public string DefaultSpacingLeft
        {
            get { return newTextProperties.Get("DefaultSpacingLeft", "0"); }
            set { newTextProperties.Set("DefaultSpacingLeft", value); }
        }
        /// <summary>
        /// Výchozí odsazení rámečku zprava
        /// </summary>
        public string DefaultSpacingRight
        {
            get { return newTextProperties.Get("DefaultSpacingRight", "0"); }
            set { newTextProperties.Set("DefaultSpacingRight", value); }
        }
        /// <summary>
        /// Výchozí odsazení rámečku shora
        /// </summary>
        public string DefaultSpacingTop
        {
            get { return newTextProperties.Get("DefaultSpacingTop", "0"); }
            set { newTextProperties.Set("DefaultSpacingTop", value); }
        }
        /// <summary>
        /// Výchozí odsazení rámečku dole
        /// </summary>
        public string DefaultSpacingBottom
        {
            get { return newTextProperties.Get("DefaultSpacingBottom", "0"); }
            set { newTextProperties.Set("DefaultSpacingBottom", value); }
        }

        /// <summary>
        /// Výchozí odsazení textu zleva
        /// </summary>
        public string DefaultPaddingLeft
        {
            get { return newTextProperties.Get("DefaultPaddingLeft", "5"); }
            set { newTextProperties.Set("DefaultPaddingLeft", value); }
        }
        /// <summary>
        /// Výchozí odsazení textu zprava
        /// </summary>
        public string DefaultPaddingRight
        {
            get { return newTextProperties.Get("DefaultPaddingRight", "5"); }
            set { newTextProperties.Set("DefaultPaddingRight", value); }
        }
        /// <summary>
        /// Výchozí odsazení textu shora
        /// </summary>
        public string DefaultPaddingTop
        {
            get { return newTextProperties.Get("DefaultPaddingTop", "5"); }
            set { newTextProperties.Set("DefaultPaddingTop", value); }
        }
        /// <summary>
        /// Výchozí odsazení textu dole
        /// </summary>
        public string DefaultPaddingBottom
        {
            get { return newTextProperties.Get("DefaultPaddingBottom", "5"); }
            set { newTextProperties.Set("DefaultPaddingBottom", value); }
        }

        /// <summary>
        /// Výchozí šířka objektu
        /// </summary>
        public string DefaultSizeWidth
        {
            get { return newTextProperties.Get("DefaultSizeWidth", "25mm"); }
            set { newTextProperties.Set("DefaultSizeWidth", value); }
        }
        /// <summary>
        /// Výchozí výška objektu
        /// </summary>
        public string DefaultSizeHeight
        {
            get { return newTextProperties.Get("DefaultSizeHeight", "5mm"); }
            set { newTextProperties.Set("DefaultSizeHeight", value); }
        }

        /// <summary>
        /// Výchozí metrika vkládaného textového pole
        /// </summary>
        public string DefaultMetrics
        {
            get
            {
                var _value = newTextProperties.Get("DefaultMetrics", "mm");
                return string.IsNullOrEmpty(_value) ? "mm" : _value;
            }
            set { newTextProperties.Set("DefaultMetrics", value); }
        }

        /// <summary>
        /// Indikátor podbarevní položek
        /// </summary>
        public bool ShowColorOfObjects
        {
            get { return mainProperties.Get("ShowColorOfObjects", true); }
            set { mainProperties.Set("ShowColorOfObjects", value); }
        }
        #endregion
    }
}
