//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TagText.cs                            </Name>
//    <Description> Pomocná třída pro prezentaci textové veličiny               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.Drawing;
using System.Drawing.Drawing2D;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.General;
using System.IO;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// rozhraní textu
    /// </summary>
    public interface ITagText : IText, IResourceTagText, IHasTextContent
    {
        /// <summary>
        /// indikuje změnu objektu
        /// </summary>
        bool Changed { get; set; }
        /// <summary>
        /// barva pozadí
        /// </summary>
        Color FontBackColor { get; }
        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="graphics"></param>
        ///// <param name="font"></param>
        ///// <param name="bounds"></param>
        ///// <param name="padding"></param>
        ///// <returns></returns>
        //string WrapedRectangle(Graphics graphics, ITagTextFont font, RectangleF bounds, IComplexFive padding);
        /// <summary>
        /// Kreslení
        /// </summary>
        /// <param name="graphics">Ovladac grafiky</param>
        /// <param name="bounds">Oblsat objektu (BoundsInPixels)</param>
        /// <param name="padding">Odsazení textu</param>
        /// <param name="zoomFactor">Faktor zvětšení</param>
        void Paint(Graphics graphics, RectangleF bounds, IComplexFive padding, float zoomFactor);
        /// <summary>
        /// inicializace objektu
        /// </summary>
        ITagText Initialize();
        /// <summary>
        /// Inicializace objketu
        /// </summary>
        /// <param name="options">Výchozí hodnoty</param>
        ITagText Initialize(IDesignerOptions options);
        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="text">Text, hodnotou kterého se automaticky naplní nový text dané instance třídy</param>
        /// <param name="textChange">Indikuje povolení změny textu prostřednictvím dialogového okna</param>
        ITagText Initialize(string text, bool textChange = true);
        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="_origin">Originál stejné třídy, dle hodnot kterého se vytváří hodnoty pro danou třídu</param>
        /// <param name="withFont">TRUE - nakopíruje i písmo</param>
        /// <param name="textChange">Indikuje povolení změny textu prostřednictvím dialogového okna</param>
        ITagText Initialize(ITagText _origin, bool withFont, bool textChange = true);

        /// <summary>
        /// Předpřipravené zalomení textu
        /// </summary>
        InlineText Inline { get; set; }

    }

    /// <summary>
    /// text
    /// </summary>
    public class TagText : ITagText
    {
        #region IText
        /// <summary>
        /// Indikuje změnu objektu
        /// </summary>
        [Browsable(false)]
        public bool Changed { get => changed; set { changed = value; } }

        /// <summary>
        /// Povolení změny textu
        /// </summary>
        [Browsable(false)]
        public bool EnableChangeText { get; set; }
        /// <summary>
        /// Faktor zvětšení
        /// </summary>
        [Browsable(false)]
        public float Zoom { get; protected set; }

        bool changed = true;
        string text;
        /// <summary>
        /// řetězec symbolů
        /// </summary>
        [DisplayName("text")]
        public virtual string Text { get => text; set { changed |= text != value; text = value; OnTextChanged(); } }
        /// <summary>
        /// volá se po změně textové hodnoty
        /// </summary>
        public event EventHandler TextChanged;

        /// <summary>
        /// reakce na změnu textu
        /// </summary>
        protected void OnTextChanged()
        {
            TextChanged?.Invoke(this, EventArgs.Empty);
        }

        /// <summary>
        /// Směr textu
        /// </summary>
        [DisplayName("orientace")]
        public virtual RotateType Orientation { get; set; }

        /// <summary>
        /// Směr textu
        /// </summary>
        [DisplayName("přizpůsobení")]
        public virtual FitText Fittext { get; set; }

        /// <summary>
        /// Směr textu
        /// </summary>
        [DisplayName("řádkování")]
        public virtual float Textleading { get; set; }

        /// <summary>
        /// Vzdálenost mezí odstavce
        /// </summary>
        [DisplayName("vdálenost odstavců")]
        public virtual float Paragraphgap { get; set; }

        /// <summary>
        /// Zarovnání obsahu
        /// </summary>
        [DisplayName("zarovnání")]
        public virtual IAlign Align { get; set; }

        bool multiline;
        /// <summary>
        /// Pokud text má být víceřádkový pak TRUE
        /// </summary>
        [DisplayName("víceřádkový")]
        [Description("Indikuje víceřádkovost textu")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        public virtual bool MultiLine { get => multiline; set { changed |= multiline != value; multiline = value; } }

        /// <summary>
        /// Zakončení textu
        /// </summary>
        [DisplayName("ukončení")]
        public virtual IEllipsis Ellipsis { get; set; }

        /// <summary>
        /// Formátování textu
        /// </summary>
        [DisplayName("formát")]
        [Description("Vlastní formát datové položky")]
        public virtual string Format { get; set; }

        /// <summary>
        /// Barva pozadí písma
        /// </summary>
        [Browsable(false)]
        public Color FontBackColor { get => TextFont == null ? Color.Transparent : TextFont.BackColor.Color; }

        /// <summary>
        /// Písmo
        /// </summary>
        [DisplayName("písmo")]
        [Description("Písmo textu")]
        [Browsable(false)]
        public virtual ITagTextFont TextFont { get; set; }

        /// <summary>
        /// Předpřipravené zalomení textu
        /// </summary>
        [Browsable(false)]
        public InlineText Inline { get; set; } = null;

        #endregion

        #region IResourceTagText
        /// <summary>
        /// ID zdroje lokalizovaného textu
        /// </summary>
        [DisplayName("Zdroj: identifikátor"),
        Description("Jednoznačný identifikátor zdroje lokalizovaného textu")]
        public virtual string ResourceID { get; set; }
        /// <summary>
        /// ID zdroje lokalizovaného textu
        /// </summary>
        [DisplayName("Zdroj: hodnota"),
        Description("Jednoznačný identifikátor hodnoty zdroje lokalizovaného textu")]
        public virtual string ResourceIDValue { get; set; }
        #endregion

        #region IHasTextContent
        /// <summary>
        /// dostupnost funkce zarovnání textu
        /// </summary>
        public bool EnableChange { get => true; }
        /// <summary>
        /// Vertikální zarovnání textu nahoru
        /// </summary>
        public void AlignTop() { Align.Vertical = VAlign.top; }

        /// <summary>
        /// Vertikální zarovnání textu na střed
        /// </summary>
        public void AlignMiddle() { Align.Vertical = VAlign.center; }
        /// <summary>
        /// Vertikální zarovnání textu dolů
        /// </summary>
        public void AlignBottom() { Align.Vertical = VAlign.bottom; }

        /// <summary>
        /// Horizontální zarovnání textu doleva
        /// </summary>
        public void AlignLeft() { Align.Horizontal = HAlign.left; }
        /// <summary>
        /// Horizontální zarovnání textu na střed
        /// </summary>
        public void AlignCenter() { Align.Horizontal = HAlign.center; }
        /// <summary>
        /// Horizontální zarovnání textu doprava
        /// </summary>
        public void AlignRight() { Align.Horizontal = HAlign.right; }
        /// <summary>
        /// Horizontální zarovnání textu justify
        /// </summary>
        public void AlignJustify() { Align.Horizontal = HAlign.justify; }

        /// <summary>
        /// Nastavení řezu písma na 'regular'
        /// </summary>
        public void Regular() { TextFont.Style = FontStyleEnum.Regular; }

        /// <summary>
        /// Nastavení řezu písma na 'bold'
        /// </summary>
        /// <param name="isTrue">TRUE - nastavení na 'bold' písmo, opačně - vyjmutí 'bold' písma</param>
        public void Bold(bool isTrue = true)
        {
            if (isTrue)
                TextFont.Style |= FontStyleEnum.Bold;
            else if (TextFont.Style.HasFlag(FontStyleEnum.Bold))
                TextFont.Style -= FontStyleEnum.Bold;
        }
        /// <summary>
        /// Nastavení řezu písma na 'italic'
        /// </summary>
        /// <param name="isTrue">TRUE - nastavení na 'italic' písmo, opačně - vyjmutí 'italic' písma</param>
        public void Italic(bool isTrue = true)
        {
            if (isTrue)
                TextFont.Style |= FontStyleEnum.Italic;
            else if (TextFont.Style.HasFlag(FontStyleEnum.Italic))
                TextFont.Style -= FontStyleEnum.Italic;
        }
        /// <summary>
        /// Nastavení řezu písma na 'underline'
        /// </summary>
        /// <param name="isTrue">TRUE - nastavení na 'underline' písmo, opačně - vyjmutí 'underline' písma</param>
        public void Underline(bool isTrue = true)
        {
            if (isTrue)
                TextFont.Style |= FontStyleEnum.Underline;
            else if (TextFont.Style.HasFlag(FontStyleEnum.Underline))
                TextFont.Style -= FontStyleEnum.Underline;
        }
        /// <summary>
        /// Nastavení řezu písma na 'strikeout'
        /// </summary>
        /// <param name="isTrue">TRUE - nastavení na 'strikeout' písmo, opačně - vyjmutí 'strikeout' písma</param>
        public void Strikeout(bool isTrue = true)
        {
            if (isTrue)
                TextFont.Style |= FontStyleEnum.Strikeout;
            else if (TextFont.Style.HasFlag(FontStyleEnum.Strikeout))
                TextFont.Style -= FontStyleEnum.Strikeout;
        }
        #endregion

        /// <summary>
        /// Konstruktér třídy
        /// </summary>
        public TagText() { }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public virtual ITagText Initialize()
        {
            MultiLine = true;
            Ellipsis = new Ellipsis().Initialize();
            Align = new Align().Initialize();
            Orientation = RotateType.RotateNoneFlipNone;
            Fittext = FitText.none;
            Textleading = 1;
            Paragraphgap = 1;
            TextFont = new TagTextFont();
            TextFont.Initialize(FontStyleEnum.Regular);
            EnableChangeText = true;
            return this;
        }


        object parent;
        /// <summary>
        /// vlastník objektu
        /// </summary>
        [Browsable(false)]
        public object Parent { get => parent; }
        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="pParent">vlastnik objektu</param>
        public ITagText Initialize(object pParent)
        {
            Initialize();
            this.parent = pParent;
            return this;
        }

        /// <summary>
        /// Inicializace objktu
        /// </summary>
        /// <param name="pParent">vlastník objektu</param>
        /// <param name="tagText">objekt pro kopírování</param>
        public ITagText Initialize(object pParent, ITagText tagText)
        {
            Initialize(pParent);
            Text = tagText.Text;
            Orientation = tagText.Orientation;
            Fittext = tagText.Fittext;
            Textleading = tagText.Textleading;
            Paragraphgap = tagText.Paragraphgap;
            Ellipsis.Char = tagText.Ellipsis.Char;
            Ellipsis.Style = tagText.Ellipsis.Style;
            MultiLine = tagText.MultiLine;
            Align.Vertical = tagText.Align.Vertical;
            Align.Horizontal = tagText.Align.Horizontal;
            ResourceID = tagText.ResourceID;
            ResourceIDValue = tagText.ResourceIDValue;
            Format = tagText.Format;
            TextFont = new TagTextFont();
            TextFont.Initialize(tagText.TextFont);            
            return this;
        }

        /// <summary>
        /// Inicializace objketu
        /// </summary>
        /// <param name="options">Výchozí hodnoty</param>
        public virtual ITagText Initialize(IDesignerOptions options) => this;

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="pText">Text, hodnotou kterého se automaticky naplní nový text dané instance třídy</param>
        /// <param name="textChange">Indikuje povolení změny textu prostřednictvím dialogového okna</param>
        public virtual ITagText Initialize(string pText, bool textChange = true) => this;

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="_origin">Originál stejné třídy, dle hodnot kterého se vytváří hodnoty pro danou třídu</param>
        /// <param name="withFont">TRUE - nakopíruje i písmo</param>
        /// <param name="textChange">Indikuje povolení změny textu prostřednictvím dialogového okna</param>
        public virtual ITagText Initialize(ITagText _origin, bool withFont, bool textChange = true) => this;

        /// <summary>
        /// Kreslení
        /// </summary>
        /// <param name="graphics">Ovladac grafiky</param>
        /// <param name="bounds">Oblsat objektu (BoundsInPixels)</param>
        /// <param name="padding">Odsazení textu</param>
        /// <param name="zoomFactor">Faktor zvětšení</param>
        public virtual void Paint(Graphics graphics, RectangleF bounds, IComplexFive padding, float zoomFactor)
        {
            Zoom = zoomFactor;
            Paint(graphics, Text, TextFont, bounds, padding, Ellipsis, Align, Orientation, Zoom, MultiLine, Inline);
        }

        /// <summary>
        /// Konverze dané třídy do řetězcového formátu
        /// </summary>
        /// <returns>Řetězec prezentující hodnoty(tu) dané třídu</returns>
        public override string ToString() { return Text; }
        /// <summary>
        /// Přetížení porovnání objektu s komponentou dané třídy
        /// </summary>
        /// <param name="obj">Objekt, který se porovnává s daným</param>
        /// <returns>Pokud jsou stejné pak se vrací TRUE jinak FALSE</returns>
        public override bool Equals(object obj)
        {
            if (!(obj is ITagText itt))
                return base.Equals(obj);

            return (itt.Align.Horizontal == this.Align.Horizontal)
                && (itt.Text == this.Text)
                && (itt.Orientation == this.Orientation)
                && (itt.Fittext == this.Fittext)
                && (itt.Textleading == this.Textleading)
                && (itt.Paragraphgap == this.Paragraphgap)
                && (itt.Align.Vertical == this.Align.Vertical)
                && (itt.MultiLine == this.MultiLine)
                && (itt.Ellipsis.Char == this.Ellipsis.Char)
                && (itt.Ellipsis.Style == this.Ellipsis.Style);
        }
        /// <summary>
        /// Přetížení dané metody
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode() => base.GetHashCode();

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="graphics"></param>
        ///// <param name="font"></param>
        ///// <param name="bounds"></param>
        ///// <param name="padding"></param>
        ///// <returns></returns>
        //public string WrapedRectangle(Graphics graphics, ITagTextFont font, RectangleF bounds, IComplexFive padding)
        //{
        //    //RectangleF result = new RectangleF();
        //    string result = string.Empty;
        //    //pokud není žádný text, pak není co řešit
        //    if (!(string.IsNullOrEmpty(Text) || bounds.Height == 0 || bounds.Width == 0))
        //    {
        //        if (!font.FontFamily.FontFamily.IsStyleAvailable((FontStyle)font.Style))
        //        {
        //            //Vezmeme další styl
        //            int _index = (int)font.Style + 1;

        //            //Pokud je větší index než počet položek pak jdeme od začátku 
        //            if (_index > 15)
        //                _index = 0;

        //            font.Style = (FontStyleEnum)_index;

        //            //Předpokládá se, že určitě se najde vhodný styl
        //            while (!font.FontFamily.FontFamily.IsStyleAvailable((FontStyle)font.Style))
        //            {
        //                _index++;
        //                //Pokud je větší index než počet položek pak jdeme od začátku 
        //                if (_index > 15)
        //                    _index = 0;

        //                font.Style = (FontStyleEnum)_index;
        //            }
        //        }

        //        Matrix transform = graphics.Transform;
        //        if (font.Size.Point != 0)
        //            using (Font drawFont = new Font(font.FontFamily.FontFamily, font.Size.Point, (FontStyle)font.Style, font.Unit, Convert.ToByte(font.GdiCharSet), font.GdiVerticalFont))
        //            {
        //                using (SolidBrush drawBrush = new SolidBrush(font.ForeColor.Color))
        //                {
        //                    StringFormat textFormat = new StringFormat();
        //                    textFormat.FormatFlags = StringFormatFlags.NoWrap;

        //                    switch (Align.Horizontal)
        //                    {
        //                        case HAlign.center:
        //                            textFormat.Alignment = StringAlignment.Center;
        //                            break;
        //                        case HAlign.right:
        //                            textFormat.Alignment = StringAlignment.Far;
        //                            break;
        //                        default:
        //                            textFormat.Alignment = StringAlignment.Near;
        //                            break;
        //                    }
        //                    switch (Align.Vertical)
        //                    {
        //                        case VAlign.center:
        //                            textFormat.LineAlignment = StringAlignment.Center;
        //                            break;
        //                        case VAlign.bottom:
        //                            textFormat.LineAlignment = StringAlignment.Far;
        //                            break;
        //                        default:
        //                            textFormat.LineAlignment = StringAlignment.Near;
        //                            break;
        //                    }

        //                    // Výběr oblasti, do které se bude psát text
        //                    float x = 0, y = 0, w = 0, h = 0;

        //                    switch (Orientation)
        //                    {
        //                        case RotateType.RotateNoneFlipNone:
        //                            x = bounds.X + padding.LeftPixels;
        //                            y = bounds.Y + padding.TopPixels;
        //                            w = bounds.Width - (padding.LeftPixels + padding.RightPixels);
        //                            h = bounds.Height - (padding.TopPixels + padding.BottomPixels);
        //                            break;
        //                        case RotateType.Rotate90FlipXY:
        //                            x = bounds.Y + padding.TopPixels;
        //                            y -= bounds.X + bounds.Width - padding.RightPixels;
        //                            w = bounds.Height - (padding.TopPixels + padding.BottomPixels);
        //                            h = bounds.Width - (padding.LeftPixels + padding.RightPixels);
        //                            graphics.RotateTransform(90f);
        //                            break;
        //                        case RotateType.Rotate180FlipXY:
        //                            x -= bounds.X + bounds.Width + padding.RightPixels;
        //                            y -= bounds.Y + bounds.Height + padding.BottomPixels;
        //                            w = bounds.Width - (padding.LeftPixels + padding.RightPixels);
        //                            h = bounds.Height - (padding.TopPixels + padding.BottomPixels);
        //                            graphics.RotateTransform(180f);
        //                            break;
        //                        case RotateType.Rotate270FlipXY:
        //                            x -= bounds.Y + bounds.Height - padding.BottomPixels;
        //                            y = bounds.X + padding.LeftPixels;
        //                            w = bounds.Height - (padding.TopPixels + padding.BottomPixels);
        //                            h = bounds.Width - (padding.LeftPixels + padding.RightPixels);
        //                            graphics.RotateTransform(270f);
        //                            break;
        //                        default:
        //                            break;
        //                    }

        //                    string s = Text;
        //                    if (!MultiLine)
        //                        s = s.Substring(0, WordWrap.BreakLine(s, s.Length - 1) + 1);
        //                    else
        //                        s = WordWrap.Wrap(graphics, s, drawFont, new SizeF(w, h), textFormat);

        //                    switch (Ellipsis.Style)
        //                    {
        //                        case ElStyle.cut:
        //                            //textFormat.Trimming = StringTrimming.Word;
        //                            textFormat.Trimming = StringTrimming.Character;
        //                            break;
        //                        case ElStyle.dots:
        //                            textFormat.Trimming = StringTrimming.EllipsisCharacter;
        //                            break;
        //                        case ElStyle.fill:
        //                            SizeF actualSize = graphics.MeasureString(s, drawFont);
        //                            if (!MultiLine && actualSize.Width > w)
        //                                s = new string(Ellipsis.Char, 1000);
        //                            textFormat.Trimming = StringTrimming.Character;
        //                            break;
        //                        default:
        //                            break;
        //                    }
        //                    //result = new RectangleF(x, y, w, h);
        //                    result = s;
        //                }
        //            }
        //        graphics.Transform = transform;
        //    }
        //    return result;
        //}

        internal static Font DrawFontFromTextFont(ITagTextFont font, float zoom = 1) =>
            new Font(font.FontFamily.FontFamily, font.Size.Point * zoom, (FontStyle)font.Style, font.Unit, Convert.ToByte(font.GdiCharSet), font.GdiVerticalFont);

        /// <summary>
        /// Kreslení
        /// </summary>
        /// <param name="graphics">Ovladac grafiky</param>
        /// <param name="font">Font kterym se ma vykreslit text</param>
        /// <param name="bounds">Oblast objektu (BoundsInPixels).</param>
        /// <param name="padding">Odsazení textu</param>
        /// <param name="pText">obsah ke kreslení</param>
        /// <param name="zoom">faktor zvětšení</param>
        /// <param name="orientation"> orientace obsahu</param>
        /// <param name="multiLine">indikuje obsah ve více řádcích</param>
        /// <param name="ellipsis">způsob uikončení přetečení</param>
        /// <param name="align">způsob zarovnání textu</param>
        /// <param name="inline">předpřipravené zalomení textu</param>
        public static void Paint(Graphics graphics, string pText, ITagTextFont font, RectangleF bounds, IComplexFive padding, IEllipsis ellipsis, IAlign align
            , RotateType orientation = RotateType.RotateNoneFlipNone
            , float zoom = 1
            , bool multiLine = true
            , InlineText inline = null
            )
        {
            //pokud není žádný text, pak není co řešit
            if (string.IsNullOrEmpty(pText) || bounds.Height == 0 || bounds.Width == 0 || font == null || font.FontFamily == null)
                return;

            if (!font.FontFamily.FontFamily.IsStyleAvailable((FontStyle)font.Style))
            {
                MessageService.ShowWarning(GResources.GetResourceText(29450325)); //RC 29450325 : Pro dané písmo vybraný řez písma není povolen.
                //Vezmeme další styl
                int _index = (int)font.Style + 1;

                //Pokud je větší index než počet položek pak jdeme od začátku 
                if (_index > 15)
                    _index = 0;

                font.Style = (FontStyleEnum)_index;

                //Předpokládá se, že určitě se najde vhodný styl
                while (!font.FontFamily.FontFamily.IsStyleAvailable((FontStyle)font.Style))
                {
                    _index++;
                    //Pokud je větší index než počet položek pak jdeme od začátku 
                    if (_index > 15)
                        _index = 0;

                    font.Style = (FontStyleEnum)_index;
                }
            }

            Matrix transform = graphics.Transform;
            if (font.Size.Point * zoom != 0)
                using (Font drawFont = DrawFontFromTextFont(font, zoom))
                {
                    using (SolidBrush drawBrush = new SolidBrush(font.ForeColor.Color))
                    {
                        //StringFormat textFormat = new StringFormat
                        //{
                        //    FormatFlags = StringFormatFlags.NoWrap
                        //};
                        StringFormat textFormat = StringFormat.GenericTypographic;
                        textFormat.FormatFlags = StringFormatFlags.NoWrap;
                        graphics.TextRenderingHint = System.Drawing.Text.TextRenderingHint.ClearTypeGridFit;

                        switch (align.Horizontal)
                        {
                            case HAlign.center:
                                textFormat.Alignment = StringAlignment.Center;
                                break;
                            case HAlign.right:
                                textFormat.Alignment = StringAlignment.Far;
                                break;
                            default:
                                textFormat.Alignment = StringAlignment.Near;
                                break;
                        }
                        switch (align.Vertical)
                        {
                            case VAlign.center:
                                textFormat.LineAlignment = StringAlignment.Center;
                                break;
                            case VAlign.bottom:
                                textFormat.LineAlignment = StringAlignment.Far;
                                break;
                            default:
                                textFormat.LineAlignment = StringAlignment.Near;
                                break;
                        }

                        // Výběr oblasti, do které se bude psát text
                        float x = 0, y = 0, w = 0, h = 0;

                        switch (orientation)
                        {
                            case RotateType.RotateNoneFlipNone:
                                x = bounds.X + padding.LeftPixels * zoom;
                                y = bounds.Y + padding.TopPixels * zoom;
                                w = bounds.Width - (padding.LeftPixels + padding.RightPixels) * zoom;
                                h = bounds.Height - (padding.TopPixels + padding.BottomPixels) * zoom;
                                break;
                            case RotateType.Rotate90FlipXY:
                                x = bounds.Y + padding.TopPixels * zoom;
                                y -= bounds.X + bounds.Width - padding.RightPixels * zoom;
                                w = bounds.Height - (padding.TopPixels + padding.BottomPixels) * zoom;
                                h = bounds.Width - (padding.LeftPixels + padding.RightPixels) * zoom;
                                graphics.RotateTransform(90f);
                                break;
                            case RotateType.Rotate180FlipXY:
                                x -= bounds.X + bounds.Width + padding.RightPixels * zoom;
                                y -= bounds.Y + bounds.Height + padding.BottomPixels * zoom;
                                w = bounds.Width - (padding.LeftPixels + padding.RightPixels) * zoom;
                                h = bounds.Height - (padding.TopPixels + padding.BottomPixels) * zoom;
                                graphics.RotateTransform(180f);
                                break;
                            case RotateType.Rotate270FlipXY:
                                x -= bounds.Y + bounds.Height - padding.BottomPixels * zoom;
                                y = bounds.X + padding.LeftPixels * zoom;
                                w = bounds.Height - (padding.TopPixels + padding.BottomPixels) * zoom;
                                h = bounds.Width - (padding.LeftPixels + padding.RightPixels) * zoom;
                                graphics.RotateTransform(270f);
                                break;
                            default:
                                break;
                        }

                        if (inline != null)
                        {
                            inline.Paint(graphics, drawFont, drawBrush, new RectangleF(x, y, w, h), textFormat, zoom);
                            goto AfterPaint;
                        }

                        string s = pText;
                        if (!multiLine)
                        {
                            var r = s.IndexOf('\n');
                            if (r < 0) r = s.Length - 1;
                            s = s.Substring(0, WordWrap.BreakLine(s, r) + 1);
                            if (s.EndsWith("\n"))
                            {
                                textFormat.Trimming = StringTrimming.Character;
                                switch (ellipsis.Style)
                                {
                                    case ElStyle.dots:
                                        s = s.Replace("\n", "\u2026");
                                        break;
                                    case ElStyle.fill:
                                        s = new string(ellipsis.Char, 1000);
                                        break;
                                }
                                goto Paint;
                            }
                        }
                        else
                        {
                            s = WordWrap.Wrap(graphics, s, drawFont, new SizeF(w, h), textFormat, out var longestLine);
                            //if (asTextBlock && align.Horizontal != HAlign.left)
                            //{
                            //    textFormat.Alignment = StringAlignment.Near;
                            //    if (align.Horizontal == HAlign.center)
                            //        x += (w - longestLine) / 2;
                            //    else
                            //        x += w - longestLine;
                            //}
                        }

                        switch (ellipsis.Style)
                        {
                            case ElStyle.cut:
                                //textFormat.Trimming = StringTrimming.Word;
                                textFormat.Trimming = StringTrimming.Character;
                                break;
                            case ElStyle.dots:
                                textFormat.Trimming = StringTrimming.EllipsisCharacter;
                                break;
                            case ElStyle.fill:
                                SizeF actualSize = graphics.MeasureString(s, drawFont);
                                if (!multiLine && actualSize.Width > w)
                                    s = new string(ellipsis.Char, 1000);
                                textFormat.Trimming = StringTrimming.Character;
                                break;
                            default:
                                break;
                        }
                    Paint:
                        graphics.DrawString(s, drawFont, drawBrush, new RectangleF(x, y, w, h), textFormat);
                    AfterPaint:;
                    }
                }
            graphics.ResetTransform();
            graphics.Transform = transform;
        }
    }

    /// <summary>
    /// Pomocná třída pro prezentaci textové veličiny
    /// </summary>
    public class URTagText : TagText
    {
        #region IText
        readonly UndoRedo<string> text = new UndoRedo<string>();
        /// <summary>
        /// řetězec symbolů
        /// </summary>
        [DisplayName("text")]
        public override string Text { get => text.Value; set { text.Value = value; OnTextChanged(); } }

        readonly UndoRedo<RotateType> orientation = new UndoRedo<RotateType>();
        /// <summary>
        /// Směr textu
        /// </summary>
        [DisplayName("orientace")]
        public override RotateType Orientation { get => orientation.Value; set { orientation.Value = value; } }

        readonly UndoRedo<FitText> fittext = new UndoRedo<FitText>();
        /// <summary>
        /// Směr textu
        /// </summary>
        [DisplayName("přizpůsobení")]
        public override FitText Fittext { get => fittext.Value; set { fittext.Value = value; } }

        readonly UndoRedo<float> textleading = new UndoRedo<float>();
        /// <summary>
        /// Směr textu
        /// </summary>
        [DisplayName("řádkování")]
        public override float Textleading { get => textleading.Value; set { textleading.Value = value; } }

        readonly UndoRedo<float> paragraphgap = new UndoRedo<float>();
        /// <summary>
        /// Vzdálenost mezi odstavci
        /// </summary>
        [DisplayName("vzdálenost odstavců")]
        public override float Paragraphgap { get => paragraphgap.Value; set { paragraphgap.Value = value; } }

        readonly UndoRedo<IAlign> align = new UndoRedo<IAlign>();
        /// <summary>
        /// Zarovnání obsahu
        /// </summary>
        [DisplayName("zarovnání")]
        public override IAlign Align { get { return align.Value; } set { align.Value = value; } }

        readonly UndoRedo<bool> multiline = new UndoRedo<bool>();
        /// <summary>
        /// Pokud text má být víceřádkový pak TRUE
        /// </summary>
        [DisplayName("víceřádkový")]
        [Description("Indikuje víceřádkovost textu")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        public override bool MultiLine { get => multiline.Value; set { multiline.Value = value; } }

        readonly UndoRedo<IEllipsis> ellipsis = new UndoRedo<IEllipsis>();
        /// <summary>
        /// Zakončení textu
        /// </summary>
        [DisplayName("ukončení")]
        public override IEllipsis Ellipsis { get => ellipsis.Value; set { ellipsis.Value = value; } }

        readonly UndoRedo<string> format = new UndoRedo<string>();
        /// <summary>
        /// Formátování textu
        /// </summary>
        [DisplayName("formát")]
        [Description("Vlastní formát datové položky")]
        public override string Format { get => format.Value; set { format.Value = value; } }

        readonly UndoRedo<ITagTextFont> textfont = new UndoRedo<ITagTextFont>();
        /// <summary>
        /// Písmo
        /// </summary>
        [DisplayName("písmo")]
        [Description("Písmo textu")]
        [Browsable(false)]
        public override ITagTextFont TextFont { get => textfont.Value; set { textfont.Value = value; } }
        #endregion

        #region IResourceTagText
        readonly UndoRedo<string> resourceid = new UndoRedo<string>();
        /// <summary>
        /// ID zdroje lokalizovaného textu
        /// </summary>
        [DisplayName("Zdroj: identifikátor"),
        Description("Jednoznačný identifikátor zdroje lokalizovaného textu")]
        public override string ResourceID { get => resourceid.Value; set { resourceid.Value = value; } }
        readonly UndoRedo<string> resourceidvalue = new UndoRedo<string>();
        /// <summary>
        /// ID zdroje lokalizovaného textu
        /// </summary>
        [DisplayName("Zdroj: hodnota"),
        Description("Jednoznačný identifikátor hodnoty zdroje lokalizovaného textu")]
        public override string ResourceIDValue { get => resourceidvalue.Value; set { resourceidvalue.Value = value; } }
        #endregion

        /// <summary>
        /// Konstruktér třídy
        /// </summary>
        public URTagText() { }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        public override ITagText Initialize()
        {
            MultiLine = true;
            Ellipsis = new UREllipsis().Initialize();
            Align = new URAlign().Initialize();
            Orientation = RotateType.RotateNoneFlipNone;
            Fittext = FitText.none;
            Textleading = 1;
            Paragraphgap = 1;
            TextFont = new URTagTextFont().Initialize(FontStyleEnum.Regular);
            EnableChangeText = true;
            return this;
        }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="_origin">Originál stejné třídy, dle hodnot kterého se vytváří hodnoty pro danou třídu</param>
        /// <param name="withFont">TRUE - nakopíruje i písmo</param>
        /// <param name="textChange">Indikuje povolení změny textu prostřednictvím dialogového okna</param>
        public override ITagText Initialize(ITagText _origin, bool withFont, bool textChange = true)
        {
            Initialize();
            Text = _origin.Text;
            Orientation = _origin.Orientation;
            Fittext = _origin.Fittext;
            Textleading = _origin.Textleading;
            Paragraphgap = _origin.Paragraphgap;
            Ellipsis.Char = _origin.Ellipsis.Char;
            Ellipsis.Style = _origin.Ellipsis.Style;
            MultiLine = _origin.MultiLine;
            Align.Vertical = _origin.Align.Vertical;
            Align.Horizontal = _origin.Align.Horizontal;
            ResourceID = _origin.ResourceID;
            ResourceIDValue = _origin.ResourceIDValue;
            Format = _origin.Format;
            if (withFont)
                TextFont = new URTagTextFont().Initialize(_origin.TextFont);
            EnableChangeText = textChange;
            return this;
        }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="pText">Text, hodnotou kterého se automaticky naplní nový text dané instance třídy</param>
        /// <param name="textChange">Indikuje povolení změny textu prostřednictvím dialogového okna</param>
        public override ITagText Initialize(string pText, bool textChange = true)
        {
            Text = pText;
            EnableChangeText = textChange;
            return this;
        }

        /// <summary>
        /// Inicializace objketu
        /// </summary>
        /// <param name="options">Výchozí hodnoty</param>
        public override ITagText Initialize(IDesignerOptions options)
        {
            MultiLine = true;
            Ellipsis = new UREllipsis().Initialize();
            Align = new URAlign().Initialize();
            Orientation = RotateType.RotateNoneFlipNone;
            Fittext = FitText.none;
            Textleading = 1;
            Paragraphgap = 1;
            TextFont = new URTagTextFont().Initialize(options);
            EnableChangeText = true;
            return this;
        }
    }

    /// <summary>
    /// textové pole přílohy NS
    /// </summary>
    public class URAttachmentText : URTagText
    {
        #region URTagText
        /// <exclude/>
        public override void Paint(Graphics graphics, RectangleF bounds, IComplexFive padding, float zoomFactor)
        {
            Zoom = zoomFactor;
            IZoomSizable sizable = parent as IZoomSizable;
            RectangleF buttonBoundsInPixels = new RectangleF(sizable.LeftZoom + sizable.WidthZoom - sizable.HeightZoom, sizable.TopZoom, sizable.HeightZoom, sizable.HeightZoom);
            if (!string.IsNullOrEmpty(Text) && image == null)
                Paint(graphics, Text, TextFont, buttonBoundsInPixels, padding, Ellipsis, Align, Orientation, Zoom, MultiLine);
            else if (image != null)
                graphics.DrawImage(image, buttonBoundsInPixels);
        }
        #endregion

        /// <summary>
        /// řetězec symbolů
        /// </summary>
        [Browsable(false)]
        public string File { get; set; }

        readonly object parent;
        /// <summary>
        /// vlastník objektu
        /// </summary>
        [Browsable(false)]
        public new object Parent { get => parent; }

        readonly Bitmap image;
        /// <exclude/>
        public URAttachmentText()
            : base()
        {
            image = WinFormsResourceService.GetBitmap("Icons__Gin__plus");
        }

        /// <exclude/>
        public URAttachmentText(object pParent)
            : this()
        {
            this.parent = pParent;
        }
    }

    /// <summary>
    /// textové pole přílohy NS
    /// </summary>
    public class AttachmentText : TagText
    {
        #region TagText
        /// <exclude/>
        public override void Paint(Graphics graphics, RectangleF bounds, IComplexFive padding, float zoomFactor)
        {
            Zoom = zoomFactor;

            //IZoomSizable sizable = parent as IZoomSizable;
            //RectangleF buttonBoundsInPixels = new RectangleF(sizable.LeftZoom + sizable.WidthZoom - bounds.Height, bounds.Top, bounds.Height, bounds.Height);
            //if (!string.IsNullOrEmpty(Text) /*&& image == null*/)
            //    Paint(graphics, Text, TextFont, buttonBoundsInPixels, padding, Ellipsis, Align, Orientation, Zoom, MultiLine);
            //else if (image != null)
            //    graphics.DrawImage(image, buttonBoundsInPixels);

            if (!string.IsNullOrEmpty(file))
                //RectangleF fileBoundsInPixels = new RectangleF(sizable.LeftZoom, bounds.Top, sizable.WidthZoom - bounds.Height, bounds.Height);
                //Paint(graphics, Path.GetFileName(file), TextFont, fileBoundsInPixels, padding, Ellipsis, Align, Orientation, Zoom, MultiLine);
                Paint(graphics
                    , General.ApplicationInterface.GSanitizer.SanitizeFileName(Path.GetFileName(file))
                    , TextFont, bounds, padding, Ellipsis, Align, Orientation, Zoom, MultiLine
                    );
        }
        #endregion

        string file;
        /// <summary>
        /// řetězec symbolů
        /// </summary>
        [Browsable(false)]
        public string File
        {
            get => file;
            set
            {
                file = value;
                canAdd = string.IsNullOrEmpty(value);
                //image = !canAdd ? WinFormsResourceService.GetBitmap("Icons__Gin__minus") : WinFormsResourceService.GetBitmap("Icons__Gin__plus");
            }
        }

        bool canAdd = true;
        /// <summary>
        /// indikuje operací přidání
        /// </summary>
        public bool CanAdd { get => canAdd; set { canAdd = value; } }
        //Bitmap image;

        /// <exclude/>
        public AttachmentText()
            : base()
        {
        }

        /// <summary>
        /// Inicializace objktu
        /// </summary>
        public override ITagText Initialize()
        {
            base.Initialize();
            //image = WinFormsResourceService.GetBitmap("Icons__Gin__plus");
            return this;
        }
    }
}
