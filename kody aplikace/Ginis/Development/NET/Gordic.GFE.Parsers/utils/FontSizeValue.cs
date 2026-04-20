//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.FontSizeValue.cs                      </Name>
//    <Description> Převodník pro ScaleUni                                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.Globalization;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.Parsers.Utils
{
    /// <summary>
    /// Převodník pro ScaleUni
    /// </summary>
    class ScaleUniConverter : EnumConverter
    {
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="type"></param>
        public ScaleUniConverter(Type type) : base(type) { }

        /// <summary>
        /// Převod do 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="culture"></param>
        /// <param name="value">Hodnota, co se převádí</param>
        /// <param name="destinationType">Požadovaný typ výsledku</param>
        /// <returns></returns>
        public override object ConvertTo(ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value, Type destinationType)
        {
            //Pokud je požadován řetězec pak 
            if (destinationType == typeof(string))
            {
                if (value is ScaleUni _su)
                    switch (_su)
                    {
                        case ScaleUni.unspec:
                            return "-";
                        default:
                            return Convert.ToString(_su);
                    }
                return value;
            }
            return base.ConvertTo(context, culture, value, destinationType);
        }

        /// <summary>
        /// Zjistíme, zda hodnota z které se převádí je řetězec 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="sourceType">Typ hodnoty z které se převádí </param>
        /// <returns></returns>
        public override bool CanConvertFrom(ITypeDescriptorContext context, Type sourceType)
        {
            //Pokud zdroj je řetězec 
            return sourceType == typeof(string);
        }

        /// <summary>
        /// Převod z
        /// </summary>
        /// <param name="context"></param>
        /// <param name="culture"></param>
        /// <param name="value">Hodnota z které se převádí … musí být řetězec</param>
        /// <returns></returns>
        public override object ConvertFrom(ITypeDescriptorContext context, CultureInfo culture, object value)
        {
            string _value = (string)value;

            if (_value.CompareTo("tw") == 0)
                return ScaleUni.tw;

            if (_value.CompareTo("px") == 0)
                return ScaleUni.px;

            if (_value.CompareTo("pt") == 0)
                return ScaleUni.pt;

            if (_value.CompareTo("mm") == 0)
                return ScaleUni.mm;

            return ScaleUni.unspec;
        }
    }

    /// <summary>
    /// Vyčet možných měrných jednotek pro výšku
    /// </summary>
    [TypeConverter(typeof(ScaleUniConverter))]
    public enum ScaleUni
    {
        /// <summary>
        /// Milimetry
        /// </summary>
        mm = 0,
        /// <summary>
        /// Twipy
        /// </summary>
        tw = 1,
        /// <summary>
        /// Pixely
        /// </summary>
        px = 2,
        /// <summary>
        /// Pointy
        /// </summary>
        pt = 3,
        /// <summary>
        /// Nespecifikované
        /// </summary>
        unspec = 4
    }

    /// <summary>
    /// rozhraní velikosti písma
    /// </summary>
    public interface IFontSizeValue
    {
        /// <summary>
        /// hodnota velikosti písma (řetězec)
        /// </summary>
        string Value { get; set; }
        /// <summary>
        /// metrika písma
        /// </summary>
        ScaleUni Scale { get; set; }
        /// <summary>
        /// velikost v PT
        /// </summary>
        float Point { get; set; }
    }

    /// <summary>
    /// velikost písma
    /// </summary>
    [TypeConverter(typeof(FontSizeValueConverter))]
    public class FontSizeValue : IFontSizeValue
    {
        bool isInit = false;
        /// <summary>
        /// vnitřní pomocná hodnota
        /// </summary>
        string _value;
        /// <summary>
        /// Uživatelská hodnota [Viditelná v tabulce vlastnosti]
        /// </summary>
        [DisplayName("hodnota"),
        Description("Uživatelská hodnota")]
        public string Value
        {
            get { if (!isInit) Init(); return _value; }
            set { isInit = false; _value = value; }
        }

        void Init()
        {
            _scale = ScaleUni.unspec;
            _point = 0f;

            CommonService.FontSizeSetByRule(_value, ref _value, ref _scale, ref _point);

            isInit = true;
        }

        /// <summary>
        /// vnitřní pomocná hodnota
        /// </summary>
        ScaleUni _scale;
        /// <summary>
        /// Měřítko uživatelské hodnoty [Viditelné v tabulce vlastnosti]
        /// </summary>
        [DisplayName("měřítko"),
        Description("Měřítko uživatelské hodnoty")]
        public ScaleUni Scale
        {
            get { if (!isInit) Init(); return _scale; }
            set
            {
                // zafixujeme starou hodnotu
                ScaleUni _old = _scale;

                _scale = value;

                switch (_scale)
                {
                    case ScaleUni.mm:
                        // nastavíme milimetry dle pointů
                        Value = (int)Math.Round(_point * 25.4 / 72) + "mm";
                        break;
                    case ScaleUni.tw:
                        // nastavíme twipy dle pointů
                        Value = (int)Math.Round(_point * 1440 / 72) + "tw";
                        break;
                    case ScaleUni.px:
                        // nastavíme pixely dle pointů
                        Value = (int)Math.Round(_point * 96 / 72) + "px";
                        break;
                    case ScaleUni.pt:
                        // nastavíme pointy dle pointů
                        Value = (int)Math.Round(_point, 2) + "pt";
                        break;
                    case ScaleUni.unspec:
                        // nelze převést na nedefinovaný typ před časem definované hodnoty 
                        // pomocí tohoto comboboxu
                        _scale = _old;
                        break;
                    default:
                        break;
                }

            }
        }

        float _point;
        /// <summary>
        /// Velikost písma v pt
        /// </summary>
        [Browsable(false)]
        public float Point { get { if (!isInit) Init(); return _point; } set { _point = value; } }

        /// <summary>
        /// Prázdný konstruktor
        /// </summary>
        protected FontSizeValue() { }

        /// <summary>
        /// Vytvoření nové instance třídy dle stringové veličiny
        /// </summary>
        /// <param name="value">Hodnota pro nastavení</param>
        public FontSizeValue(string value) { Value = value; }

        /// <summary>
        /// stringová prezentace objektu
        /// </summary>
        /// <returns>řetězec, prezentující daný objekt</returns>
        public override string ToString() { return Value; }
    }

    /// <summary>
    /// konstanty analyzátoru
    /// </summary>
    internal static class GFEParserConsts
    {
        public const int S_OK = 0;
        public const int S_FALSE = 1;
    }
    /// <summary>
    /// Třída prezentující výšku
    /// </summary>
    public class GFEFontSize : ICloneable
    {
        string m_value;
        readonly int[] _FontSizes = new int[] { 0, 141, 179, 213, 250, 325, 433, 650, 831 };

        /// <summary>
        /// Uživatelská hodnota [Viditelná v tabulce vlastnosti]
        /// </summary>
        public string Value
        {
            get { return m_value; }
            set
            {
                m_value = value;
                if (m_value != null)
                {
                    if (m_value.EndsWith("mm"))
                    {
                        m_scale = ScaleUni.mm;

                        //Zkusíme převést hodnotu na pointy
                        if (float.TryParse(value.Replace("mm", "").Replace(".", ","), out float _mm))
                            m_point = (float)Math.Round((_mm * 72 / 25.4), 2);

                        return;
                    }
                    else if (m_value.EndsWith("px"))
                    {
                        m_scale = ScaleUni.px;

                        //Zkusíme převést hodnotu na pointy
                        if (float.TryParse(value.Replace("px", "").Replace(".", ","), out float _px))
                            m_point = (float)Math.Round(_px * 72 / 96, 2);

                        return;
                    }
                    else if (m_value.EndsWith("pt"))
                    {
                        m_scale = ScaleUni.pt;

                        //Zkusíme převést hodnotu na pointy
                        if (float.TryParse(value.Replace("pt", "").Replace(".", ","), out float _pt))
                            m_point = (float)Math.Round(_pt, 2);

                        return;
                    }
                    else if (m_value.EndsWith("tw"))
                    {
                        m_scale = ScaleUni.tw;

                        //Zkusíme převést hodnotu na pointy
                        if (float.TryParse(value.Replace("tw", "").Replace(".", ","), out float _tw))
                            m_point = (float)Math.Round(_tw * 72 / 1440, 2);

                        return;
                    }
                }

                //Nastavení hodnoty dle pravidla 1-8, *npsize
                //Zkusíme převést hodnotu
                if (!int.TryParse(value, out int _unsp))
                    m_value = "2";

                if (_unsp < 0)
                    _unsp = 1;

                if (_unsp > 8)
                    _unsp = 8;

                float _value = _FontSizes[_unsp] * 72 / 1440;

                m_point = (float)Math.Round(_value, 2);

                m_scale = ScaleUni.unspec;
            }
        }

        ScaleUni m_scale = ScaleUni.unspec;
        /// <summary>
        /// Měřítko uživatelské hodnoty [Viditelné v tabulce vlastnosti]
        /// </summary>
        public ScaleUni Scale
        {
            get { return m_scale; }
            set
            {
                //Zafixujeme starou hodnotu
                ScaleUni _old = m_scale;

                m_scale = value;

                switch (m_scale)
                {
                    case ScaleUni.mm:
                        //Nastavíme milimetry dle pointů
                        m_value = (int)Math.Round(m_point * 25.4 / 72) + "mm";
                        break;
                    case ScaleUni.tw:
                        //Nastavíme twipy dle pointů
                        m_value = (int)Math.Round(m_point * 1440 / 72) + "tw";
                        break;
                    case ScaleUni.px:
                        //Nastavíme pixely dle pointů
                        m_value = (int)Math.Round(m_point * 96 / 72) + "px";
                        break;
                    case ScaleUni.pt:
                        //Nastavíme pointy dle pointů
                        m_value = (int)Math.Round(m_point, 2) + "pt";
                        break;
                    case ScaleUni.unspec:
                        //Nelze převést na nedefinovaný typ před časem definované hodnoty 
                        //pomocí tohoto comboboxu
                        m_scale = _old;
                        break;
                    default:
                        break;
                }

            }
        }

        float m_point;
        /// <summary>
        /// Velikost písma v pt
        /// </summary>
        [Browsable(false)]
        public float Point { get { return m_point; } set { m_point = value; } }
        /// <summary>
        /// Prázdný konstruktor
        /// </summary>
        public GFEFontSize()
        {
        }

        /// <summary>
        /// Kopírování objektu
        /// </summary>
        /// <param name="p_origin">Originál</param>
        public GFEFontSize(GFEFontSize p_origin)
        {
            m_scale = p_origin.Scale;
            m_point = p_origin.Point;
            m_value = p_origin.Value;
        }

        #region ICloneable Members

        object ICloneable.Clone()
        {
            return new GFEFontSize() { Value = this.Value };
        }

        #endregion
    }

}
