//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TagTextFont.cs                        </Name>
//    <Description> Charset                                                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.Drawing;
using Gordic.General;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using System.Drawing.Design;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Charset
    /// </summary>
    public enum ECharSet : byte
    {
        /// <summary>
        /// 
        /// </summary>
        ANSI_CHARSET = 0,
        /// <summary>
        /// 
        /// </summary>
        DEFAULT_CHARSET = 1,
        /// <summary>
        /// 
        /// </summary>
        SYMBOL_CHARSET = 2,
        /// <summary>
        /// 
        /// </summary>
        SHIFTJIS_CHARSET = 128,
        /// <summary>
        /// 
        /// </summary>
        HANGUL_CHARSET = 129,
        /// <summary>
        /// 
        /// </summary>
        GB2312_CHARSET = 134,
        /// <summary>
        /// 
        /// </summary>
        CHINESEBIG5_CHARSET = 136,
        /// <summary>
        /// 
        /// </summary>
        OEM_CHARSET = 255,
        /// <summary>
        /// 
        /// </summary>
        GREEK_CHARSET = 161,
        /// <summary>
        /// 
        /// </summary>
        TURKISH_CHARSET = 162,
        /// <summary>
        /// 
        /// </summary>
        VIETNAMESE_CHARSET = 163,
        /// <summary>
        /// 
        /// </summary>
        EASTEUROPE_CHARSET = 238,
        /// <summary>
        /// 
        /// </summary>
        RUSSIAN_CHARSET = 204
    }

    /// <summary>
    /// Výčet všech možných stylů písma
    /// </summary>
    [TypeConverter(typeof(FontStyleEnumConverter))]
    public enum FontStyleEnum
    {
        /// <summary>
        /// tučné
        /// </summary>
        Bold = 1,
        /// <summary>
        /// kurzíva
        /// </summary>
        Italic = 2,
        /// <summary>
        /// obyčejné
        /// </summary>
        Regular = 0,
        /// <summary>
        /// přeškrtnuté
        /// </summary>
        Strikeout = 8,
        /// <summary>
        /// podtržené
        /// </summary>
        Underline = 4,
        /// <summary>
        /// tučná kurzíva
        /// </summary>
        BoldItalic = 3,
        /// <summary>
        /// přeškrtnuté tučné
        /// </summary>
        BoldStrikeout = 9,
        /// <summary>
        /// podtržené tučné
        /// </summary>
        BoldUnderline = 5,
        /// <summary>
        /// přeškrtnutá kurzíva
        /// </summary>
        ItalicStrikeout = 10,
        /// <summary>
        /// podtržená kurzíva
        /// </summary>
        ItalicUnderline = 6,
        /// <summary>
        /// přeškrtnuté podtržené
        /// </summary>
        StrikeoutUnderline = 12,
        /// <summary>
        /// přeškrtnutá tučná kurzíva
        /// </summary>
        BoldItalicStrikeout = 11,
        /// <summary>
        /// podtržená tučná kurzíva
        /// </summary>
        BoldItalicUnderline = 7,
        /// <summary>
        /// přeškrtnuté podtržené tučné
        /// </summary>
        BoldStrikeoutUnderline = 13,
        /// <summary>
        /// přeškrtnutá podtržená kurzíva
        /// </summary>
        ItalicStrikeoutUnderline = 14,
        /// <summary>
        /// přeškrtnutá podtržená tučná kurzíva
        /// </summary>
        BoldItalicStrikeoutUnderline = 15
    }

    /// <summary>
    /// rozhraní písma 
    /// </summary>
    [EditorAttribute(typeof(TextFontEditor), typeof(UITypeEditor))]
    public interface ITagTextFont
    {
        /// <exclude/>
        ECharSet GdiCharSet { get; }
        /// <exclude/>
        bool GdiVerticalFont { get; }
        /// <exclude/>
        GraphicsUnit Unit { get; }
        /// <exclude/>
        IFontSizeValue Size { get; set; }
        /// <exclude/>
        FontStyleEnum Style { get; set; }
        /// <exclude/>
        IComplexFontFamily FontFamily { get; set; }
        /// <exclude/>
        IComplexColor ForeColor { get; set; }
        /// <exclude/>
        IComplexColor BackColor { get; set; }
        /// <exclude/>
        Font Font { get; }
        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="style">styl písma</param>
        ITagTextFont Initialize(FontStyleEnum style);
        /// <summary>
        /// inicializace třídy
        /// </summary>
        /// <param name="style">styl písma</param>
        ITagTextFont Initialize(GFEFormatStyle style);
        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="options">Výchozí hodnoty</param>
        ITagTextFont Initialize(IDesignerOptions options);
        /// <summary>
        /// Inicializace třídy dle originálu
        /// </summary>
        /// <param name="copy">Originál</param>
        ITagTextFont Initialize(ITagTextFont copy);
        /// <summary>
        /// Vytvoření nové instance třídy dle názvu písma
        /// </summary>
        /// <param name="fontname">Název písma</param>
        ITagTextFont Initialize(string fontname);
    }

    /// <summary>
    /// písmo
    /// </summary>
    [EditorAttribute(typeof(TextFontEditor), typeof(UITypeEditor))]
    public class TagTextFont : ITagTextFont
    {
        protected ECharSet m_charset = ECharSet.EASTEUROPE_CHARSET;//EASTEUROPE_CHARSET
        /// <exclude/>
        [Browsable(false)]
        public ECharSet GdiCharSet { get { return m_charset; } }
        /// <exclude/>
        [Browsable(false)]
        public bool GdiVerticalFont { get { return false; } }
        /// <summary>
        /// Jednotka písma
        /// </summary>
        [Browsable(false)]
        public GraphicsUnit Unit { get { return GraphicsUnit.Point; } }

        /// <summary>
        /// cach hodnoty
        /// </summary>
        IFontSizeValue cacheSize;
        /// <summary>
        /// vnitřní proměnná velikostí písma
        /// </summary>
        protected virtual string _Size { get; set; }
        /// <summary>
        /// Velikost písma
        /// </summary>
        [DisplayName("velikost")]
        public virtual IFontSizeValue Size
        {
            get //CommonService nastavuje hodnotu pres Size.Value=xx
            {
                if (cacheSize == null)
                    cacheSize = new FontSizeValue(_Size);
                return cacheSize;
            }
            set { _Size = value.Value; cacheSize = null; }
        }

        /// <summary>
        /// Řez písma
        /// </summary>
        [DisplayName("řez")]
        public virtual FontStyleEnum Style { get; set; }

        /// <summary>
        /// Název písma
        /// </summary>
        [DisplayName("název")]
        public virtual IComplexFontFamily FontFamily { get; set; }

        /// <summary>
        /// Barva písma
        /// </summary>
        [DisplayName("barva písma")]
        public virtual IComplexColor ForeColor { get; set; }

        /// <summary>
        /// Barva pozadí
        /// </summary>
        [DisplayName("barva pozadí")]
        public virtual IComplexColor BackColor { get; set; }

        /// <summary>
        /// Písmo
        /// </summary>
        [Browsable(false)]
        public Font Font { get { return new Font(FontFamily.FontFamily.Name, Size.Point, (FontStyle)Style, Unit, Convert.ToByte(GdiCharSet), GdiVerticalFont); } }

        /// <summary>
        /// Prázdný konstruktor třídy
        /// </summary>
        public TagTextFont() { }

        /// <summary>
        /// Inicializace počátečných proměnných
        /// </summary>
        protected virtual ITagTextFont Initialize()
        {
            ForeColor = new ComplexColor();
            BackColor = new ComplexColor();
            FontFamily = new ComplexFontFamily();
            return this;
        }

        /// <summary>
        /// Inicializace objektu výchozích hodnot
        /// </summary>
        /// <param name="options">Výchozí hodnoty</param>
        public virtual ITagTextFont Initialize(IDesignerOptions options)
        {
            Initialize();

            if (options != null)
            {
                _Size = options.DefaultFontSize;
                ForeColor.Initialize(options.DefaultFontForeColor);
                BackColor.Initialize(options.DefaultFontBackColor);
                FontFamily.Initialize(options.DefaultFontFontFamily);
            }
            else
            {
                _Size = "2";
                ForeColor.Initialize("black");
                BackColor.Initialize("transparent");
                FontFamily.Initialize("arial");
                Style = FontStyleEnum.Regular;
            }
            return this;
        }

        /// <summary>
        /// Konstruktor třídy dle originálu
        /// </summary>
        /// <param name="copy">Originál</param>
        public virtual ITagTextFont Initialize(ITagTextFont copy)
        {
            Initialize();

            if (copy != null)
            {
                FontFamily.Initialize(copy.FontFamily.Name);
                _Size = copy.Size.Value;
                Style = copy.Style;
                m_charset = copy.GdiCharSet;
                ForeColor.Initialize(copy.ForeColor);
                BackColor.Initialize(copy.BackColor);
            }
            else
            {
                _Size = "2";
                ForeColor.Initialize("black");
                BackColor.Initialize("transparent");
                FontFamily.Initialize("arial");
                Style = FontStyleEnum.Regular;
            }
            return this;
        }

        /// <summary>
        /// Vytvoření nové instance třídy dle názvu písma
        /// </summary>
        /// <param name="fontname">Název písma</param>
        public virtual ITagTextFont Initialize(string fontname)
        {
            Initialize();

            BackColor.Initialize("transparent");
            ForeColor.Initialize("black");

            if (fontname.Equals("times", StringComparison.InvariantCultureIgnoreCase))
                fontname = System.Drawing.FontFamily.GenericSerif.Name;
            else if (fontname.Equals("arial", StringComparison.InvariantCultureIgnoreCase))
                fontname = System.Drawing.FontFamily.GenericSansSerif.Name;
            else if (fontname.Equals("courier", StringComparison.InvariantCultureIgnoreCase))
                fontname = System.Drawing.FontFamily.GenericMonospace.Name;

            _Size = "2";
            FontFamily.Initialize(fontname);
            Style = FontStyleEnum.Regular;
            m_charset = ECharSet.EASTEUROPE_CHARSET;
            return this;
        }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="style">styl písma</param>
        public virtual ITagTextFont Initialize(GFEFormatStyle style)
        {
            Initialize();
            if (style == null)
            {
                _Size = "2";
                ForeColor.Initialize("black");
                BackColor.Initialize("transparent");
                FontFamily.Initialize("arial");
                Style = FontStyleEnum.Regular;
            }
            else
            {
                if (style.Font != null)
                {
                    FontFamily.Initialize(style.Font.FontFamily.Name);
                    _Size = style.Font.Size.Value;
                    Style = (FontStyleEnum)style.Font.Style.Style;
                    m_charset = (ECharSet)style.Font.GdiCharSet;
                }
                else
                {
                    _Size = "2";
                    FontFamily.Initialize("arial");
                    Style = FontStyleEnum.Regular;
                }

                ForeColor.Initialize(style.FontColor);
                BackColor.Initialize(style.BackgroundColor);
            }
            return this;
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="style">styl písma</param>
        public virtual ITagTextFont Initialize(FontStyleEnum style)
        {
            Initialize();
            _Size = "2";
            ForeColor.Initialize("black");
            BackColor.Initialize("transparent");
            FontFamily.Initialize("arial");

            Style = style;
            return this;
        }

        /// <summary>
        /// Řetězcová prezentace objektu
        /// </summary>
        /// <returns>Řetězec prezentující objekt</returns>
        public override string ToString()
        {
            return string.Format(GResources.GetResourceText(29450002) + ":{0}; " + GResources.GetResourceText(29450160) + ": {1}; " + GResources.GetResourceText(29450232) + ": {2}; " + GResources.GetResourceText(29450326) + ": {3}; " + GResources.GetResourceText(29450327) + ": {4}", //RC 29450327 : řez
                FontFamily.Name, Size.Value, ForeColor.Color.Name, BackColor.Color.Name, Convert.ToString(Style));
        }
    }

    /// <summary>
    /// Třída řezu písma
    /// </summary>
    [EditorAttribute(typeof(TextFontEditor), typeof(UITypeEditor))]
    public class URTagTextFont : TagTextFont
    {
        readonly UndoRedo<string> _size = new UndoRedo<string>();
        /// <summary>
        /// vnitřní proměnná písma
        /// </summary>
        protected override string _Size { get { return _size.Value; } 
            set { _size.Value = value; } }

        readonly UndoRedo<IFontSizeValue> cacheSize = new UndoRedo<IFontSizeValue>();
        /// <summary>
        /// Velikost písma
        /// </summary>
        [DisplayName("velikost")]
        public override IFontSizeValue Size
        {
            get //CommonService nastavuje hodnotu pres Size.Value=xx
            {
                if (cacheSize.Value == null)
                    cacheSize.Value = new FontSizeValue(_Size);
                return cacheSize.Value;
            }
            set { _Size = value.Value; cacheSize.Value = null; }
        }

        readonly UndoRedo<FontStyleEnum> style = new UndoRedo<FontStyleEnum>();
        /// <summary>
        /// Řez písma
        /// </summary>
        [DisplayName("řez")]
        public override FontStyleEnum Style { get { return style.Value; } set { style.Value = value; } }

        readonly UndoRedo<IComplexFontFamily> fontfamily = new UndoRedo<IComplexFontFamily>();
        /// <summary>
        /// vnitřní proměnná písma
        /// </summary>
        public override IComplexFontFamily FontFamily { get { return fontfamily.Value; } set { fontfamily.Value = value; } }

        readonly UndoRedo<IComplexColor> forecolor = new UndoRedo<IComplexColor>();
        /// <summary>
        /// vnitřní proměnná barvy písma
        /// </summary>
        public override IComplexColor ForeColor { get { return forecolor.Value; } set { forecolor.Value = value; } }

        readonly UndoRedo<IComplexColor> backcolor = new UndoRedo<IComplexColor>();
        /// <summary>
        /// vnitřní proměnná barvy písma
        /// </summary>
        public override IComplexColor BackColor { get { return backcolor.Value; } set { backcolor.Value = value; } }

        /// <summary>
        /// Prázdný konstruktor třídy
        /// </summary>
        public URTagTextFont()
            : base()
        {
        }

        /// <summary>
        /// inicializace základních proměnných
        /// </summary>
        protected override ITagTextFont Initialize()
        {
            ForeColor = new URComplexColor();
            BackColor = new URComplexColor();
            FontFamily = new URComplexFontFamily();
            return this;
        }
    }
}
