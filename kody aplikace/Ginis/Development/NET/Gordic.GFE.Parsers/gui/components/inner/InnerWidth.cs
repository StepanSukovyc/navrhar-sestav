//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.InnerWidth.cs                            </Name>
//    <Description> rozhraní objektu s vlastnosti šířky                         </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2022-11-16                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// rozhraní objektu s vlastnosti šířky
    /// </summary>
    public interface IInnerWidth
    {
        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        string Value { get; set; }
        /// <summary>
        /// Programátorská veličina objektu, používaná pro programovací účely
        /// </summary>
        float Pixels { get; }
        /// <exclude/>
        ScaleUni Scale { get; set; }

        /// <summary>
        /// nastavení hodnoty
        /// </summary>
        /// <param name="p">číselná hodnota</param>
        /// <param name="grr06Metrics">metrika</param>
        void SetValue(double p, Report.Implementation.Grr06Metrics grr06Metrics);
        /// <summary>
        /// inicializace dle hodnoty
        /// </summary>
        /// <param name="value">inicializační hodnoty</param>
        IInnerWidth Initialize(IInnerWidth value);
        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="allValue">stejna pro všechny strany hodnota</param>
        /// <returns></returns>
        IInnerWidth Initialize(string allValue);
        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="options"></param>
        /// <returns></returns>
        IInnerWidth Initialize(IDesignerOptions options);
    }

    /// <summary>
    /// Třída s pěti propojenými vlastnostmi
    /// </summary>
    [Serializable]
    public class InnerWidth : IInnerWidth
    {
        /// <summary>
        /// hodnota
        /// </summary>
        protected virtual string _Value { get; set; }
        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlAttribute("Value")]
        [DisplayName("hodnota")]
        public string Value
        {
            get => string.IsNullOrEmpty(_Value) ? "0" : _Value;
            set
            {
                if (string.IsNullOrEmpty(value)
                    || value.Equals("0"))
                {
                    _Value = string.Empty;
                    Pixels = 0;
                    Scale = ScaleUni.unspec;
                }
                else
                {
                    value = value ?? string.Empty;
                    _Value = value.Replace("Unspec", "");
                    if (!string.IsNullOrEmpty(_Value))
                    {
                        if (_Value.EndsWith("mm", StringComparison.Ordinal) || _Value.EndsWith("MMeters", StringComparison.Ordinal))
                        {
                            Scale = ScaleUni.mm;
                            _Value = _Value.Replace("MMeters", "mm");

                            //Zkusíme převést hodnotu na pixely
                            if (float.TryParse(UnitConverter.FormatWidthValue(value, "mm", "MMeters"), out float _mm))
                                Pixels = (float)(_mm * 96 / 25.4);

                            return;
                        }
                        else if (_Value.EndsWith("px", StringComparison.Ordinal))
                        {
                            Scale = ScaleUni.px;

                            //Zkusíme převést hodnotu na pixely
                            if (float.TryParse(value.Replace("px", "").Replace(".", ","), out float _px))
                                Pixels = _px;

                            return;
                        }
                        else if (_Value.EndsWith("pt", StringComparison.Ordinal) || _Value.EndsWith("Points", StringComparison.Ordinal))
                        {
                            Scale = ScaleUni.pt;
                            _Value = _Value.Replace("Points", "pt");

                            //Zkusíme převést hodnotu na pixely
                            if (float.TryParse(UnitConverter.FormatWidthValue(value, "pt", "Points"), out float _pt))
                                Pixels = _pt * 96 / 72;

                            return;
                        }
                        else if (_Value.EndsWith("tw", StringComparison.Ordinal) || _Value.EndsWith("Twip", StringComparison.Ordinal))
                        {
                            Scale = ScaleUni.tw;
                            _Value = _Value.Replace("Twip", "tw");

                            //Zkusíme převést hodnotu na pixely
                            if (float.TryParse(UnitConverter.FormatWidthValue(value, "tw", "Twip"), out float _tw))
                            {
                                Pixels = _tw * 96 / 1440;
                                return;
                            }
                        }
                    }
                    string lValue = _Value;
                    float lPixel = Pixels;
                    ScaleUni lScale = Scale;
                    SetByRule(value.Replace("Unspec", ""), ref lValue, ref lPixel, ref lScale);
                    _Value = lValue;
                    Pixels = lPixel;
                    Scale = lScale;
                }
            }
        }
        /// <summary>
        /// Programátorská veličina objektu, používaná pro programovací účely
        /// </summary>
        [XmlAttribute("Pixels")]
        [Browsable(false)]
        public virtual float Pixels { get; set; }

        /// <summary>
        /// nastavení hodnoty
        /// </summary>
        /// <param name="dbl">číselná hodnota</param>
        /// <param name="metrics">metrika</param>
        public void SetValue(double dbl, Report.Implementation.Grr06Metrics metrics)
        {
            switch (metrics)
            {
                case Gordic.Report.Implementation.Grr06Metrics.MMeters:
                    Scale = ScaleUni.mm;
                    _Value = Convert.ToString(dbl) + "mm";
                    // zkusíme převést hodnotu na pixely
                    Pixels = (float)(dbl * 96 / 25.4);
                    return;
                case Gordic.Report.Implementation.Grr06Metrics.Percent:
                    break;
                case Gordic.Report.Implementation.Grr06Metrics.Points:
                    Scale = ScaleUni.pt;
                    _Value = Convert.ToString(dbl) + "pt";
                    // zkusíme převést hodnotu na pixely
                    Pixels = (float)(dbl * 96 / 72);
                    return;
                case Gordic.Report.Implementation.Grr06Metrics.Twip:
                    Scale = ScaleUni.tw;
                    _Value = Convert.ToString(dbl) + "tw";
                    // zkusíme převést hodnotu na pixely
                    Pixels = (float)(dbl * 96 / 1440);
                    return;
                default:
                    string lValue;
                    float lPixel;
                    ScaleUni lScale;
                    lValue = _Value;
                    lPixel = Pixels;
                    lScale = Scale;
                    SetByRule(Convert.ToString(dbl), ref lValue, ref lPixel, ref lScale);
                    _Value = lValue;
                    Pixels = lPixel;
                    Scale = lScale;
                    break;
            }
        }
        public virtual ScaleUni Scale { get; set; }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public InnerWidth() { }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        protected virtual void Initialize()
        {
            Scale = ScaleUni.unspec;
        }
        /// <summary>
        /// inicializace dle hodnoty
        /// </summary>
        /// <param name="value">inicializační hodnoty</param>
        public virtual IInnerWidth Initialize(IInnerWidth value)
        {
            if (value != null)
            {
                Value = value.Value;
                Pixels = value.Pixels;
            }
            else
                Initialize();
            return this;
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="value">stejna pro všechny strany hodnota</param>
        /// <returns></returns>
        public virtual IInnerWidth Initialize(string value)
        {
            Value = value;
            return this;
        }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="options"></param>
        /// <returns></returns>
        public virtual IInnerWidth Initialize(IDesignerOptions options) { Initialize(); return this; }

        /// <summary>
        /// Nastavení všech hodnot dle pravidla 
        /// </summary>
        /// <param name="value"></param>
        /// <param name="pValue">Hodnota</param>
        /// <param name="pPixels">Pixely</param>
        /// <param name="pScale">Měřítko</param>
        virtual internal void SetByRule(string value, ref string pValue, ref float pPixels, ref ScaleUni pScale) { }

        /// <summary>
        /// Vrátí milimetry dle pixelů
        /// </summary>
        /// <returns></returns>
        internal float GetMilimeters(double pPixels) => (float)Math.Round(pPixels * 25.4 / 96, 2);

        /// <summary>
        /// Převod na řetězec
        /// </summary>
        /// <returns></returns>
        public override string ToString() => Value;

        /// <exclude/>
        public override bool Equals(object obj) => obj is IInnerWidth ? Equals(obj as IInnerWidth) : base.Equals(obj);

        /// <summary>
        /// Porovnání s jinou položkou
        /// </summary>
        /// <param name="other">Jiná položka</param>
        /// <returns></returns>
        bool Equals(IInnerWidth other) => Math.Round(other.Pixels - this.Pixels, 2) == 0;

        /// <summary>
        /// Přetížení
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode() => base.GetHashCode();
    }

    /// <summary>
    /// Třída s propojenými vlastnostmi
    /// </summary>
    [Serializable]
    public class URInnerWidth : InnerWidth
    {
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public URInnerWidth()
            : base()
        {
        }

        [NonSerialized]
        readonly UndoRedo<string> value = new UndoRedo<string>();
        /// <summary>
        /// přetížení UNDO/REDO
        /// </summary>
        protected override string _Value
        {
            get => value.Value;
            set { this.value.Value = value; }
        }

        [NonSerialized]
        readonly UndoRedo<ScaleUni> scale = new UndoRedo<ScaleUni>();
        /// <summary>
        /// přetížení UNDO/REDO
        /// </summary>
        public override ScaleUni Scale { get => scale.Value; set => scale.Value = value; }

        [NonSerialized]
        readonly UndoRedo<float> pixels = new UndoRedo<float>();
        /// <summary>
        /// Programátorská veličina objektu, používaná pro programovací účely
        /// </summary>
        [XmlAttribute("Pixels")]
        [Browsable(false)]
        public override float Pixels { get => pixels.Value; set => pixels.Value = value; }
    }

}
