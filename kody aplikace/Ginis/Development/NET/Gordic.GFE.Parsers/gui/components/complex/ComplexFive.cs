//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ComplexFive.cs                           </Name>
//    <Description> Třída s pěti propojenými vlastnostmi                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-12                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Xml.Serialization;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.General;

namespace Gordic.GFE.Parsers.Gui
{
    #region ComplexFive
    /// <summary>
    /// rozhraní objektů s 5-ti vlastnosti
    /// </summary>
    public interface IComplexFive
    {
        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        string AllValue { get; set; }
        /// <summary>
        /// Programátorská veličina objektu, používaná pro programovací účely
        /// </summary>
        double AllPixels { get; }

        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        string LeftValue { get; set; }
        /// <exclude/>
        ScaleUni LeftScale { get; set; }
        /// <summary>
        /// Programátorská veličina objektu, používaná pro programovací účely
        /// </summary>
        float LeftPixels { get; set; }

        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        string RightValue { get; set; }
        /// <exclude/>
        ScaleUni RightScale { get; set; }
        /// <summary>
        /// Programátorská veličina objektu, používaná pro programovací účely
        /// </summary>
        float RightPixels { get; set; }

        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        string TopValue { get; set; }
        /// <exclude/>
        ScaleUni TopScale { get; set; }
        /// <summary>
        /// Programátorská veličina objektu, používaná pro programovací účely
        /// </summary>
        float TopPixels { get; set; }

        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        string BottomValue { get; set; }
        /// <exclude/>
        ScaleUni BottomScale { get; set; }
        /// <summary>
        /// Programátorská veličina objektu, používaná pro programovací účely
        /// </summary>
        float BottomPixels { get; set; }

        /// <summary>
        /// nastavení hodnoty
        /// </summary>
        /// <param name="p">číselná hodnota</param>
        /// <param name="grr06Metrics">metrika</param>
        /// <param name="part">1 - levé, 2 - pravé, 3 - horní, 4 - spodní</param>
        void SetValue(double p, Report.Implementation.Grr06Metrics grr06Metrics, byte part);
        /// <summary>
        /// inicializace dle hodnoty
        /// </summary>
        /// <param name="value">inicializační hodnoty</param>
        IComplexFive Initialize(IComplexFive value);
        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="allValue">stejna pro všechny strany hodnota</param>
        /// <returns></returns>
        IComplexFive Initialize(string allValue);
        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="options"></param>
        /// <returns></returns>
        IComplexFive Initialize(IDesignerOptions options);
    }

    /// <summary>
    /// Třída s pěti propojenými vlastnostmi
    /// </summary>
    [Serializable]
    public class ComplexFive : IComplexFive
    {
        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlAttribute("AllValue")]
        [DisplayName("vše")]
        public string AllValue
        {
            get => GetAllValue();
            set
            {
                if (UnitConverter.IsMetricValueValidFormat(value))
                {
                    LeftValue = value;
                    RightValue = value;
                    TopValue = value;
                    BottomValue = value;
                }
                else
                    Gordic.GFE.Parsers.Core.LoggingService.Error(string.Format(string.Join(" ", GResources.GetResourceText(29450521), "'{0}'", GResources.GetResourceText(29450520)), value)); //RC 29450521 : Hodnota
            }
        }
        /// <summary>
        /// Programátorská veličina objektu, používaná pro programovací účely
        /// </summary>
        [XmlAttribute("AllPixels")]
        [Browsable(false)]
        public double AllPixels { get => GetAllPixel(); }

        /// <summary>
        /// levá hodnota
        /// </summary>
        protected virtual string _LeftValue { get; set; }
        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlAttribute("LeftValue")]
        [DisplayName("levá")]
        public string LeftValue
        {
            get => string.IsNullOrEmpty(_LeftValue) ? "0" : _LeftValue;
            set
            {
                if (string.IsNullOrEmpty(value)
                    || value.Equals("0"))
                {
                    _LeftValue = string.Empty;
                    LeftPixels = 0;
                    LeftScale = ScaleUni.unspec;
                }
                else
                {
                    value = value ?? string.Empty;
                    _LeftValue = value.Replace("Unspec", "");
                    if (!string.IsNullOrEmpty(_LeftValue))
                    {
                        if (_LeftValue.EndsWith("mm", StringComparison.Ordinal) || _LeftValue.EndsWith("MMeters", StringComparison.Ordinal))
                        {
                            LeftScale = ScaleUni.mm;
                            _LeftValue = _LeftValue.Replace("MMeters", "mm");

                            //Zkusíme převést hodnotu na pixely
                            if (float.TryParse(UnitConverter.FormatWidthValue(value, "mm", "MMeters"), out float _mm))
                                LeftPixels = (float)(_mm * 96 / 25.4);

                            return;
                        }
                        else if (_LeftValue.EndsWith("px", StringComparison.Ordinal))
                        {
                            LeftScale = ScaleUni.px;

                            //Zkusíme převést hodnotu na pixely
                            if (float.TryParse(value.Replace("px", "").Replace(".", ","), out float _px))
                                LeftPixels = _px;

                            return;
                        }
                        else if (_LeftValue.EndsWith("pt", StringComparison.Ordinal) || _LeftValue.EndsWith("Points", StringComparison.Ordinal))
                        {
                            LeftScale = ScaleUni.pt;
                            _LeftValue = _LeftValue.Replace("Points", "pt");

                            //Zkusíme převést hodnotu na pixely
                            if (float.TryParse(UnitConverter.FormatWidthValue(value, "pt", "Points"), out float _pt))
                                LeftPixels = _pt * 96 / 72;

                            return;
                        }
                        else if (_LeftValue.EndsWith("tw", StringComparison.Ordinal) || _LeftValue.EndsWith("Twip", StringComparison.Ordinal))
                        {
                            LeftScale = ScaleUni.tw;
                            _LeftValue = _LeftValue.Replace("Twip", "tw");

                            //Zkusíme převést hodnotu na pixely
                            if (float.TryParse(UnitConverter.FormatWidthValue(value, "tw", "Twip"), out float _tw))
                            {
                                LeftPixels = _tw * 96 / 1440;
                                return;
                            }
                        }
                    }
                    string left = _LeftValue;
                    float leftpixel = LeftPixels;
                    ScaleUni scale = LeftScale;
                    SetByRule(value.Replace("Unspec", ""), ref left, ref leftpixel, ref scale);
                    _LeftValue = left;
                    LeftPixels = leftpixel;
                    LeftScale = scale;
                }
            }
        }
        /// <summary>
        /// nastavení hodnoty
        /// </summary>
        /// <param name="dbl">číselná hodnota</param>
        /// <param name="metrics">metrika</param>
        /// <param name="part">1 - levé, 2 - pravé, 3 - horní, 4 - spodní</param>
        public void SetValue(double dbl, Report.Implementation.Grr06Metrics metrics, byte part)
        {
            switch (metrics)
            {
                case Gordic.Report.Implementation.Grr06Metrics.MMeters:
                    switch (part)
                    {
                        case 1:
                            LeftScale = ScaleUni.mm;
                            _LeftValue = Convert.ToString(dbl) + "mm";
                            // zkusíme převést hodnotu na pixely
                            LeftPixels = (float)(dbl * 96 / 25.4);
                            break;
                        case 2:
                            RightScale = ScaleUni.mm;
                            _RightValue = Convert.ToString(dbl) + "mm";
                            // zkusíme převést hodnotu na pixely
                            RightPixels = (float)(dbl * 96 / 25.4);
                            break;
                        case 3:
                            TopScale = ScaleUni.mm;
                            _TopValue = Convert.ToString(dbl) + "mm";
                            // zkusíme převést hodnotu na pixely
                            TopPixels = (float)(dbl * 96 / 25.4);
                            break;
                        case 4:
                            BottomScale = ScaleUni.mm;
                            _BottomValue = Convert.ToString(dbl) + "mm";
                            // zkusíme převést hodnotu na pixely
                            BottomPixels = (float)(dbl * 96 / 25.4);
                            break;
                    }

                    return;
                case Gordic.Report.Implementation.Grr06Metrics.Percent:
                    break;
                case Gordic.Report.Implementation.Grr06Metrics.Points:
                    switch (part)
                    {
                        case 1:
                            LeftScale = ScaleUni.pt;
                            _LeftValue = Convert.ToString(dbl) + "pt";
                            // zkusíme převést hodnotu na pixely
                            LeftPixels = (float)(dbl * 96 / 72);
                            break;
                        case 2:
                            RightScale = ScaleUni.pt;
                            _RightValue = Convert.ToString(dbl) + "pt";
                            // zkusíme převést hodnotu na pixely
                            RightPixels = (float)(dbl * 96 / 72);
                            break;
                        case 3:
                            TopScale = ScaleUni.pt;
                            _TopValue = Convert.ToString(dbl) + "pt";
                            // zkusíme převést hodnotu na pixely
                            TopPixels = (float)(dbl * 96 / 72);
                            break;
                        case 4:
                            BottomScale = ScaleUni.pt;
                            _BottomValue = Convert.ToString(dbl) + "pt";
                            // zkusíme převést hodnotu na pixely
                            BottomPixels = (float)(dbl * 96 / 72);
                            break;
                    }

                    return;
                case Gordic.Report.Implementation.Grr06Metrics.Twip:
                    switch (part)
                    {
                        case 1:
                            LeftScale = ScaleUni.tw;
                            _LeftValue = Convert.ToString(dbl) + "tw";
                            // zkusíme převést hodnotu na pixely
                            LeftPixels = (float)(dbl * 96 / 1440);
                            break;
                        case 2:
                            RightScale = ScaleUni.tw;
                            _RightValue = Convert.ToString(dbl) + "tw";
                            // zkusíme převést hodnotu na pixely
                            RightPixels = (float)(dbl * 96 / 1440);
                            break;
                        case 3:
                            TopScale = ScaleUni.tw;
                            _TopValue = Convert.ToString(dbl) + "tw";
                            // zkusíme převést hodnotu na pixely
                            TopPixels = (float)(dbl * 96 / 1440);
                            break;
                        case 4:
                            BottomScale = ScaleUni.tw;
                            _BottomValue = Convert.ToString(dbl) + "tw";
                            // zkusíme převést hodnotu na pixely
                            BottomPixels = (float)(dbl * 96 / 1440);
                            break;
                    }

                    return;
                default:
                    string left;
                    float leftpixel;
                    ScaleUni scale;
                    switch (part)
                    {
                        case 1:
                            left = _LeftValue;
                            leftpixel = LeftPixels;
                            scale = LeftScale;
                            SetByRule(Convert.ToString(dbl), ref left, ref leftpixel, ref scale);
                            _LeftValue = left;
                            LeftPixels = leftpixel;
                            LeftScale = scale;
                            break;
                        case 2:
                            left = _RightValue;
                            leftpixel = RightPixels;
                            scale = RightScale;
                            SetByRule(Convert.ToString(dbl), ref left, ref leftpixel, ref scale);
                            _RightValue = left;
                            RightPixels = leftpixel;
                            RightScale = scale;
                            break;
                        case 3:
                            left = _TopValue;
                            leftpixel = TopPixels;
                            scale = TopScale;
                            SetByRule(Convert.ToString(dbl), ref left, ref leftpixel, ref scale);
                            _TopValue = left;
                            TopPixels = leftpixel;
                            TopScale = scale;
                            break;
                        case 4:
                            left = _BottomValue;
                            leftpixel = BottomPixels;
                            scale = BottomScale;
                            SetByRule(Convert.ToString(dbl), ref left, ref leftpixel, ref scale);
                            _BottomValue = left;
                            BottomPixels = leftpixel;
                            BottomScale = scale;
                            break;
                    }

                    break;
            }
        }
        public virtual ScaleUni LeftScale { get; set; }
        /// <summary>
        /// Programátorská veličina objektu, používaná pro programovací účely
        /// </summary>
        [XmlAttribute("LeftPixels")]
        [Browsable(false)]
        public virtual float LeftPixels { get; set; }

        /// <summary>
        /// pravá hodnota
        /// </summary>
        protected virtual string _RightValue { get; set; }
        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlAttribute("RightValue")]
        [DisplayName("pravá")]
        public string RightValue
        {
            get => string.IsNullOrEmpty(_RightValue) ? "0" : _RightValue;
            set
            {
                if (string.IsNullOrEmpty(value) || value.Equals("0"))
                {
                    _RightValue = string.Empty;
                    RightPixels = 0;
                    RightScale = ScaleUni.unspec;
                }
                else
                {
                    value = value ?? string.Empty;
                    _RightValue = value.Replace("Unspec", "");

                    if (!string.IsNullOrEmpty(_RightValue))
                    {
                        if (_RightValue.EndsWith("mm", StringComparison.Ordinal) || _RightValue.EndsWith("MMeters", StringComparison.Ordinal))
                        {
                            RightScale = ScaleUni.mm;
                            _RightValue = _RightValue.Replace("MMeters", "mm");

                            //Zkusíme převést hodnotu na pixely
                            if (float.TryParse(UnitConverter.FormatWidthValue(value, "mm", "MMeters"), out float _mm))
                                RightPixels = (float)(_mm * 96 / 25.4);

                            return;
                        }
                        else if (_RightValue.EndsWith("px", StringComparison.Ordinal))
                        {
                            RightScale = ScaleUni.px;

                            //Zkusíme převést hodnotu na pixely
                            if (float.TryParse(value.Replace("px", "").Replace(".", ","), out float _px))
                                RightPixels = _px;

                            return;
                        }
                        else if (_RightValue.EndsWith("pt", StringComparison.Ordinal) || _RightValue.EndsWith("Points", StringComparison.Ordinal))
                        {
                            RightScale = ScaleUni.pt;
                            _RightValue = _RightValue.Replace("Points", "pt");

                            //Zkusíme převést hodnotu na pixely
                            if (float.TryParse(UnitConverter.FormatWidthValue(value, "pt", "Points"), out float _pt))
                                RightPixels = _pt * 96 / 72;

                            return;
                        }
                        else if (_RightValue.EndsWith("tw", StringComparison.Ordinal) || _RightValue.EndsWith("Twip", StringComparison.Ordinal))
                        {
                            RightScale = ScaleUni.tw;
                            _RightValue = _RightValue.Replace("Twip", "tw");

                            //Zkusíme převést hodnotu na pixely
                            if (float.TryParse(UnitConverter.FormatWidthValue(value, "tw", "Twip"), out float _tw))
                            {
                                RightPixels = _tw * 96 / 1440;
                                return;
                            }
                        }
                    }
                    string right = _RightValue;
                    float rightpixel = RightPixels;
                    ScaleUni scale = RightScale;
                    SetByRule(value.Replace("Unspec", ""), ref right, ref rightpixel, ref scale);
                    _RightValue = right;
                    RightPixels = rightpixel;
                    RightScale = scale;
                }
            }
        }
        public virtual ScaleUni RightScale { get; set; }
        /// <summary>
        /// Programátorská veličina objektu, používaná pro programovací účely
        /// </summary>
        [XmlAttribute("RightPixels")]
        [Browsable(false)]
        public virtual float RightPixels { get; set; }

        /// <summary>
        /// pravá hodnota
        /// </summary>
        protected virtual string _TopValue { get; set; }
        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlAttribute("TopValue")]
        [DisplayName("horní")]
        public string TopValue
        {
            get => string.IsNullOrEmpty(_TopValue) ? "0" : _TopValue;
            set
            {
                if (string.IsNullOrEmpty(value) || value.Equals("0"))
                {
                    _TopValue = string.Empty;
                    TopPixels = 0;
                    TopScale = ScaleUni.unspec;
                }
                else
                {
                    value = value ?? string.Empty;
                    _TopValue = value.Replace("Unspec", "");
                    if (!string.IsNullOrEmpty(_TopValue))
                    {
                        if (_TopValue.EndsWith("mm", StringComparison.Ordinal) || _TopValue.EndsWith("MMeters", StringComparison.Ordinal))
                        {
                            TopScale = ScaleUni.mm;
                            _TopValue = _TopValue.Replace("MMeters", "mm");

                            // zkusíme převést hodnotu na pixely
                            if (float.TryParse(UnitConverter.FormatWidthValue(value, "mm", "MMeters"), out float _mm))
                                TopPixels = (float)(_mm * 96 / 25.4);

                            return;
                        }
                        else if (_TopValue.EndsWith("px", StringComparison.Ordinal))
                        {
                            TopScale = ScaleUni.px;

                            //Zkusíme převést hodnotu na pixely
                            if (float.TryParse(value.Replace("px", "").Replace(".", ","), out float _px))
                                TopPixels = _px;

                            return;
                        }
                        else if (_TopValue.EndsWith("pt", StringComparison.Ordinal) || _TopValue.EndsWith("Points", StringComparison.Ordinal))
                        {
                            TopScale = ScaleUni.pt;
                            _TopValue = _TopValue.Replace("Points", "pt");

                            //Zkusíme převést hodnotu na pixely
                            if (float.TryParse(UnitConverter.FormatWidthValue(value, "pt", "Points"), out float _pt))
                                TopPixels = _pt * 96 / 72;

                            return;
                        }
                        else if (_TopValue.EndsWith("tw", StringComparison.Ordinal) || _TopValue.EndsWith("Twip", StringComparison.Ordinal))
                        {
                            TopScale = ScaleUni.tw;
                            _TopValue = _TopValue.Replace("Twip", "tw");

                            //Zkusíme převést hodnotu na pixely
                            if (float.TryParse(UnitConverter.FormatWidthValue(value, "tw", "Twip"), out float _tw))
                            {
                                TopPixels = _tw * 96 / 1440;
                                return;
                            }
                        }
                    }

                    string top = _TopValue;
                    float toppixel = TopPixels;
                    ScaleUni scale = TopScale;
                    SetByRule(value.Replace("Unspec", ""), ref top, ref toppixel, ref scale);
                    _TopValue = top;
                    TopPixels = toppixel;
                    TopScale = scale;
                }
            }
        }
        public virtual ScaleUni TopScale { get; set; }
        /// <summary>
        /// Programátorská veličina objektu, používaná pro programovací účely
        /// </summary>
        [XmlAttribute("TopPixels")]
        [Browsable(false)]
        public virtual float TopPixels { get; set; }

        /// <summary>
        /// pravá hodnota
        /// </summary>
        protected virtual string _BottomValue { get; set; }
        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlAttribute("BottomValue")]
        [DisplayName("dolní")]
        public string BottomValue
        {
            get => string.IsNullOrEmpty(_BottomValue) ? "0" : _BottomValue;
            set
            {
                if (string.IsNullOrEmpty(value) || value.Equals("0"))
                {
                    _BottomValue = string.Empty;
                    BottomPixels = 0;
                    BottomScale = ScaleUni.unspec;
                }
                else
                {

                    value = value ?? string.Empty;
                    _BottomValue = value.Replace("Unspec", "");
                    if (!string.IsNullOrEmpty(_BottomValue))
                    {
                        if (_BottomValue.EndsWith("mm", StringComparison.Ordinal) || BottomValue.EndsWith("MMeters", StringComparison.Ordinal))
                        {
                            BottomScale = ScaleUni.mm;
                            _BottomValue = _BottomValue.Replace("MMeters", "mm");

                            //Zkusíme převést hodnotu na pixely
                            if (float.TryParse(UnitConverter.FormatWidthValue(value, "mm", "MMeters"), out float _mm))
                                BottomPixels = (float)(_mm * 96 / 25.4);

                            return;
                        }
                        else if (_BottomValue.EndsWith("px", StringComparison.Ordinal))
                        {
                            BottomScale = ScaleUni.px;

                            //Zkusíme převést hodnotu na pixely
                            if (float.TryParse(value.Replace("px", "").Replace(".", ","), out float _px))
                                BottomPixels = _px;

                            return;
                        }
                        else if (_BottomValue.EndsWith("pt", StringComparison.Ordinal) || _BottomValue.EndsWith("Points", StringComparison.Ordinal))
                        {
                            BottomScale = ScaleUni.pt;
                            _BottomValue = _BottomValue.Replace("Points", "pt");

                            //Zkusíme převést hodnotu na pixely
                            if (float.TryParse(UnitConverter.FormatWidthValue(value, "pt", "Points"), out float _pt))
                                BottomPixels = _pt * 96 / 72;

                            return;
                        }
                        else if (_BottomValue.EndsWith("tw", StringComparison.Ordinal) || _BottomValue.EndsWith("Twip", StringComparison.Ordinal))
                        {
                            BottomScale = ScaleUni.tw;
                            _BottomValue = _BottomValue.Replace("Twip", "tw");

                            //Zkusíme převést hodnotu na pixely
                            if (float.TryParse(UnitConverter.FormatWidthValue(value, "tw", "Twip"), out float _tw))
                            {
                                BottomPixels = _tw * 96 / 1440;
                                return;
                            }
                        }
                    }
                    string bottom = _BottomValue;
                    float bottompixel = BottomPixels;
                    ScaleUni scale = BottomScale;
                    SetByRule(value.Replace("Unspec", ""), ref bottom, ref bottompixel, ref scale);
                    _BottomValue = bottom;
                    BottomPixels = bottompixel;
                    BottomScale = scale;
                }
            }
        }
        public virtual ScaleUni BottomScale { get; set; }
        /// <summary>
        /// Programátorská veličina objektu, používaná pro programovací účely
        /// </summary>
        [XmlAttribute("BottomPixels")]
        [Browsable(false)]
        public virtual float BottomPixels { get; set; }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public ComplexFive() { }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        protected virtual void Initialize()
        {
            LeftScale = ScaleUni.unspec;
            RightScale = ScaleUni.unspec;
            TopScale = ScaleUni.unspec;
            BottomScale = ScaleUni.unspec;
        }
        /// <summary>
        /// inicializace dle hodnoty
        /// </summary>
        /// <param name="value">inicializační hodnoty</param>
        public virtual IComplexFive Initialize(IComplexFive value)
        {
            if (value != null)
            {
                LeftValue = value.LeftValue;
                LeftPixels = value.LeftPixels;

                RightValue = value.RightValue;
                RightPixels = value.RightPixels;

                TopValue = value.TopValue;
                TopPixels = value.TopPixels;

                BottomValue = value.BottomValue;
                BottomPixels = value.BottomPixels;
            }
            else
                Initialize();
            return this;
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="allValue">stejna pro všechny strany hodnota</param>
        /// <returns></returns>
        public virtual IComplexFive Initialize(string allValue)
        {
            AllValue = allValue;
            return this;
        }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="options"></param>
        /// <returns></returns>
        public virtual IComplexFive Initialize(IDesignerOptions options) { Initialize(); return this; }

        /// <summary>
        /// Nastavení všech hodnot dle pravidla 
        /// </summary>
        /// <param name="value"></param>
        /// <param name="_value">Hodnota</param>
        /// <param name="_pixels">Pixely</param>
        /// <param name="_scale">Měřítko</param>
        virtual internal void SetByRule(string value, ref string _value, ref float _pixels, ref ScaleUni _scale) { }

        /// <summary>
        /// Pokud všechny hodnoty jsou stejné, pak vrátí společnou hodnotu
        /// </summary>
        /// <returns></returns>
        string GetAllValue()
        {
            if (
                RightValue == LeftValue
                && RightPixels == LeftPixels
                && RightScale == LeftScale

                && TopValue == LeftValue
                && TopPixels == LeftPixels
                && TopScale == LeftScale

                && BottomValue == LeftValue
                && BottomPixels == LeftPixels
                && BottomScale == LeftScale
                )
                return LeftValue;
            else return string.Empty;
        }
        /// <summary>
        /// Pokud všechny pixely jsou stejné, pak vrátí společnou hodnotu pixelů
        /// </summary>
        /// <returns></returns>
        double GetAllPixel()
        {
            if (
                RightValue == LeftValue
                && RightPixels == LeftPixels
                && RightScale == LeftScale

                && TopValue == LeftValue
                && TopPixels == LeftPixels
                && TopScale == LeftScale

                && BottomValue == LeftValue
                && BottomPixels == LeftPixels
                && BottomScale == LeftScale
                )
                return LeftPixels;
            else return 0;
        }

        /// <summary>
        /// Vrátí milimetry dle pixelů
        /// </summary>
        /// <returns></returns>
        internal float GetMilimeters(double p_pixels) => (float)Math.Round(p_pixels * 25.4 / 96, 2);

        /// <summary>
        /// Převod na řetězec
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            //Pokud existuje společná hodnota, pak ji vrátíme
            if (!string.IsNullOrEmpty(AllValue))
                return AllValue;

            //Jinak vrátíme ostatní hodnoty 
            return string.Format(GResources.GetResourceText(29450345) + ": {0};" + GResources.GetResourceText(29450346) + ": {1};" + GResources.GetResourceText(29450347) + ": {2};" + GResources.GetResourceText(29450348) + ": {3};", LeftValue, RightValue, TopValue, BottomValue); //RC 29450348 : dole
        }

        /// <exclude/>
        public override bool Equals(object obj) => obj is IComplexFive ? Equals(obj as IComplexFive) : base.Equals(obj);

        /// <summary>
        /// Porovnání s jinou položkou
        /// </summary>
        /// <param name="other">Jiná položka</param>
        /// <returns></returns>
        bool Equals(IComplexFive other) => Math.Round(other.LeftPixels - this.LeftPixels, 2) == 0
                && Math.Round(other.RightPixels - this.RightPixels, 2) == 0
                && Math.Round(other.TopPixels - this.TopPixels, 2) == 0
                && Math.Round(other.BottomPixels - this.BottomPixels, 2) == 0;

        /// <summary>
        /// Přetížení
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode() => base.GetHashCode();
    }

    /// <summary>
    /// Třída s pěti propojenými vlastnostmi
    /// </summary>
    [Serializable]
    public class URComplexFive : ComplexFive
    {
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public URComplexFive()
            : base()
        {
        }

        [NonSerialized]
        readonly UndoRedo<string> leftvalue = new UndoRedo<string>();
        /// <summary>
        /// přetížení UNDO/REDO
        /// </summary>
        protected override string _LeftValue
        {
            get => leftvalue.Value;
            set { leftvalue.Value = value; }
        }

        [NonSerialized]
        readonly UndoRedo<ScaleUni> leftscale = new UndoRedo<ScaleUni>();
        /// <summary>
        /// přetížení UNDO/REDO
        /// </summary>
        public override ScaleUni LeftScale { get => leftscale.Value; set { leftscale.Value = value; } }

        [NonSerialized]
        readonly UndoRedo<float> leftpixels = new UndoRedo<float>();
        /// <summary>
        /// Programátorská veličina objektu, používaná pro programovací účely
        /// </summary>
        [XmlAttribute("LeftPixels")]
        [Browsable(false)]
        public override float LeftPixels { get => leftpixels.Value; set { leftpixels.Value = value; } }

        [NonSerialized]
        readonly UndoRedo<string> rightvalue = new UndoRedo<string>();
        /// <summary>
        /// přetížení UNDO/REDO
        /// </summary>
        protected override string _RightValue
        {
            get => rightvalue.Value;
            set { rightvalue.Value = value; }
        }

        [NonSerialized]
        readonly UndoRedo<ScaleUni> rightscale = new UndoRedo<ScaleUni>();
        /// <summary>
        /// přetížení UNDO/REDO
        /// </summary>
        public override ScaleUni RightScale { get => rightscale.Value; set { rightscale.Value = value; } }

        [NonSerialized]
        readonly UndoRedo<float> rightpixels = new UndoRedo<float>();
        /// <summary>
        /// Programátorská veličina objektu, používaná pro programovací účely
        /// </summary>
        [XmlAttribute("RightPixels")]
        [Browsable(false)]
        public override float RightPixels { get => rightpixels.Value; set { rightpixels.Value = value; } }

        [NonSerialized]
        readonly UndoRedo<string> topvalue = new UndoRedo<string>();
        /// <summary>
        /// přetížení UNDO/REDO
        /// </summary>
        protected override string _TopValue
        {
            get => topvalue.Value;
            set { topvalue.Value = value; }
        }

        [NonSerialized]
        readonly UndoRedo<ScaleUni> topscale = new UndoRedo<ScaleUni>();
        /// <summary>
        /// přetížení UNDO/REDO
        /// </summary>
        public override ScaleUni TopScale { get => topscale.Value; set { topscale.Value = value; } }

        [NonSerialized]
        readonly UndoRedo<float> toppixels = new UndoRedo<float>();
        /// <summary>
        /// Programátorská veličina objektu, používaná pro programovací účely
        /// </summary>
        [XmlAttribute("TopPixels")]
        [Browsable(false)]
        public override float TopPixels { get => toppixels.Value; set { toppixels.Value = value; } }

        [NonSerialized]
        readonly UndoRedo<string> bottomvalue = new UndoRedo<string>();
        /// <summary>
        /// přetížení UNDO/REDO
        /// </summary>
        protected override string _BottomValue
        {
            get => bottomvalue.Value;
            set { bottomvalue.Value = value; }
        }

        [NonSerialized]
        readonly UndoRedo<ScaleUni> bottomscale = new UndoRedo<ScaleUni>();
        /// <summary>
        /// přetížení UNDO/REDO
        /// </summary>
        public override ScaleUni BottomScale { get => bottomscale.Value; set { bottomscale.Value = value; } }

        [NonSerialized]
        readonly UndoRedo<float> bottompixels = new UndoRedo<float>();
        /// <summary>
        /// Programátorská veličina objektu, používaná pro programovací účely
        /// </summary>
        [XmlAttribute("BottomPixels")]
        [Browsable(false)]
        public override float BottomPixels { get => bottompixels.Value; set { bottompixels.Value = value; } }
    }
    #endregion

    #region ComplexFiveDashStyle
    /// <summary>
    /// komplexní styl kreslení
    /// </summary>
    public class ComplexDashStyle
    {
        static string _solid = string.Empty;
        /// <summary>
        /// nepřetržitá čára
        /// </summary>
        public static string Solid
        {
            get
            {
                if (string.IsNullOrEmpty(_solid))
                    try { _solid = CommonService.FloatDashStyles.FirstOrDefault(fds => fds.Value.Equals(CommonService.DashStyles.FirstOrDefault(ds => ds.Key == "solid").Value, StringComparison.OrdinalIgnoreCase)).Key; }
                    catch { }
                return _solid;
            }
        }

        static string _unspec = string.Empty;
        /// <summary>
        /// nespecifikovano
        /// </summary>
        public static string Unspec
        {
            get
            {
                if (string.IsNullOrEmpty(_unspec))
                    try { _unspec = CommonService.FloatDashStyles.FirstOrDefault(fds => fds.Value.Equals(CommonService.DashStyles.FirstOrDefault(ds => ds.Key == "unspec").Value, StringComparison.OrdinalIgnoreCase)).Key; }
                    catch { }
                return _unspec;
            }
        }

        /// <summary>
        /// převod řetězce stylu na jeho ENG název
        /// </summary>
        /// <param name="value">ENG/CZ/řetězec stylu</param>
        /// <returns>ENG/řetězec názvu stylu <paramref name="value"/>. Pokud název není nalezen, pak je vráce jeho řetězec</returns>
        public static string ToEngName(string value)
        {
            string internalValue = value;
            // pokud se již jedná o ENG název, pak ho vrátíme (s malými písmenky)
            if (CommonService.DashStyles.ExistsByKey(key => key.Equals(internalValue, StringComparison.OrdinalIgnoreCase)))
                return internalValue.ToLower();

            // pokud se jedná o známý řetězec, pak najdeme jeho CZ název
            if (CommonService.FloatDashStyles.ExistsByKey(key => key.Equals(internalValue, StringComparison.OrdinalIgnoreCase)))
                internalValue = CommonService.FloatDashStyles.FirstOrDefault(fds => fds.Key.Equals(internalValue, StringComparison.OrdinalIgnoreCase)).Value;

            // pokud se jedná o známý CZ název, pak vyhodíme jeho ENG název
            if (CommonService.DashStyles.ExistsByValue(val => val.Equals(internalValue, StringComparison.OrdinalIgnoreCase)))
                return CommonService.DashStyles.FirstOrDefault(ds => ds.Value.Equals(internalValue, StringComparison.OrdinalIgnoreCase)).Key;

            // nejedná se o známý styl
            return internalValue == value ? internalValue : value;
        }
        /// <summary>
        /// převod řetězce stylu na jeho CZ název
        /// </summary>
        /// <param name="value">ENG/CZ/řetězec stylu</param>
        /// <returns>CZ/řetězec názvu stylu <paramref name="value"/>. Pokud název není nalezen, pak je vráce jeho řetězec</returns>
        public static string ToCzName(string value)
        {
            // pokud se již jedná o CZ název, pak ho vrátíme (s malými písmenky)
            if (CommonService.DashStyles.ExistsByValue(val => val.Equals(value, StringComparison.OrdinalIgnoreCase)))
                return value.ToLower();

            // pokud se jedná o známý řetězec, pak najdeme jeho CZ název
            if (CommonService.FloatDashStyles.ExistsByKey(key => key.Equals(value, StringComparison.OrdinalIgnoreCase)))
                return CommonService.FloatDashStyles.FirstOrDefault(fds => fds.Key.Equals(value, StringComparison.OrdinalIgnoreCase)).Value;

            // pokud se jedná o známý ENG název, pak vyhodíme jeho CZ název
            if (CommonService.DashStyles.ExistsByKey(key => key.Equals(value, StringComparison.OrdinalIgnoreCase)))
                return CommonService.DashStyles.FirstOrDefault(fds => fds.Key.Equals(value, StringComparison.OrdinalIgnoreCase)).Value;

            // nejedná se o známý styl
            return value;
        }

        /// <summary>
        /// převod pole float hodnot zadaných v řetězci oddělených mezerou do pole float[]
        /// </summary>
        /// <param name="stringDashPattern">řetězec s hodnoty oddělené mezerou</param>
        /// <returns></returns>
        public static float[] GetDashPattern(string stringDashPattern)
        {
            List<float> result = new List<float>();
            stringDashPattern = Parse(stringDashPattern);
            if (!string.IsNullOrEmpty(stringDashPattern))
                foreach (var item in stringDashPattern.Split(' '))
                    if (float.TryParse(item, out float res))
                        result.Add(res);
            return result.ToArray<float>();
        }

        /// <summary>
        /// převod hodnoty typu Grr06BorderStyle na srozumitelnou pro NS
        /// </summary>
        /// <param name="value">hodnota převodu</param>
        /// <returns>řetězec float čísel prezentující styl <paramref name="value"/></returns>
        internal static string Parse(Report.Implementation.Grr06BorderStyle value) => Parse(Convert.ToString(value));

        /// <summary>
        /// převod stylu na řetězec float čísel
        /// </summary>
        /// <param name="value">řetězec float čísel nebo jméno stylu</param>
        /// <returns>řetězec float čísel prezentující styl <paramref name="value"/></returns>
        public static string Parse(string value)
        {
            if (!string.IsNullOrEmpty(value))
            {
                if (CommonService.DashStyles.ExistsByKey(k => k.Equals(value, StringComparison.OrdinalIgnoreCase)))
                    value = CommonService.DashStyles.FirstOrDefault(ds => ds.Key.Equals(value, StringComparison.OrdinalIgnoreCase)).Value;

                if (CommonService.FloatDashStyles.ExistsByValue(val => val.Equals(value, StringComparison.OrdinalIgnoreCase)))
                    value = CommonService.FloatDashStyles.FirstOrDefault(fds => fds.Value.Equals(value, StringComparison.OrdinalIgnoreCase)).Key;
            }

            return string.IsNullOrEmpty(value) ? Unspec : value;
        }
    }

    /*
     * dashPattern = new float[] { 8.0f, 5.0f };    - čárkovaná
     * dotPattern = new float[] { 1.0f, 2.0f };     - tečkovaná
     * solidPattern = new float[] { 1.0f };         - nepřetržitá
     */

    /// <summary>
    /// komplexné rozhraní stylů
    /// jedná se o to, že objekt má 5 vlastnosti
    /// kde jedná z ních (AllValue) je případná společná hodnota
    /// </summary>
    public interface IComplexFiveDashStyle
    {
        /// <summary>
        /// hodnota 'společného' stylu
        /// </summary>
        [TypeConverter(typeof(ComplexDashStyleConverter))]
        string AllValue { get; set; }
        /// <summary>
        /// hodnota 'levého' stylu
        /// </summary>
        [TypeConverter(typeof(ComplexDashStyleConverter))]
        string LeftValue { get; set; }
        /// <summary>
        /// hodnota 'pravého' stylu
        /// </summary>
        [TypeConverter(typeof(ComplexDashStyleConverter))]
        string RightValue { get; set; }
        /// <summary>
        /// hodnota 'horního' stylu
        /// </summary>
        [TypeConverter(typeof(ComplexDashStyleConverter))]
        string TopValue { get; set; }
        /// <summary>
        /// hodnota 'spodního' stylu
        /// </summary>
        [TypeConverter(typeof(ComplexDashStyleConverter))]
        string BottomValue { get; set; }
        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="value">objekt inicializačních hodnot</param>
        IComplexFiveDashStyle Initialize(IComplexFiveDashStyle value);
        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="value">objekt inicializačních hodnot</param>
        IComplexFiveDashStyle Initialize(string value);
    }

    /// <summary>
    /// Třída s pěti propojenými vlastnostmi
    /// </summary>
    [Serializable]
    public class ComplexFiveDashStyle : IComplexFiveDashStyle
    {
        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlAttribute("AllValue")]
        [DisplayName("vše")]
        public string AllValue
        {
            get => GetAllValue();
            set { SetAllValue(value); }
        }

        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlAttribute("LeftValue")]
        [DisplayName("levý")]
        public virtual string LeftValue { get; set; }

        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlAttribute("RightValue")]
        [DisplayName("pravý")]
        public virtual string RightValue { get; set; }

        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlAttribute("TopValue")]
        [DisplayName("horní")]
        public virtual string TopValue { get; set; }

        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlAttribute("BottomValue")]
        [DisplayName("dolní")]
        public virtual string BottomValue { get; set; }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public ComplexFiveDashStyle() { }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="value">objekt inicializačních hodnot</param>
        public virtual IComplexFiveDashStyle Initialize(string value) { AllValue = value; return this; }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        public virtual IComplexFiveDashStyle Initialize()
        {
            LeftValue = ComplexDashStyle.Unspec;
            RightValue = ComplexDashStyle.Unspec;
            TopValue = ComplexDashStyle.Unspec;
            BottomValue = ComplexDashStyle.Unspec;
            return this;
        }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="value">objekt inicializačních hodnot</param>
        public virtual IComplexFiveDashStyle Initialize(IComplexFiveDashStyle value)
        {
            if (value != null)
            {
                LeftValue = value.LeftValue;
                RightValue = value.RightValue;
                TopValue = value.TopValue;
                BottomValue = value.BottomValue;
            }
            else
                Initialize();

            return this;
        }

        void SetAllValue(string value) { BottomValue = TopValue = LeftValue = RightValue = value; }
        string GetAllValue()
        {
            if (
                !string.IsNullOrEmpty(BottomValue)
                && BottomValue.Equals(LeftValue, StringComparison.OrdinalIgnoreCase)
                && BottomValue.Equals(RightValue, StringComparison.OrdinalIgnoreCase)
                && BottomValue.Equals(TopValue, StringComparison.OrdinalIgnoreCase)
                )
                return BottomValue;
            else return ComplexDashStyle.Unspec;
        }

        /// <summary>
        /// Převod na řetězec
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            //Pokud existuje společná hodnota, pak ji vrátíme
            if (!string.IsNullOrEmpty(AllValue))
                return AllValue + ";";

            //Jinak vrátíme ostatní hodnoty 
            return string.Format("{0};{1};{2};{3};", LeftValue, RightValue, TopValue, BottomValue);
        }

        /// <exclude/>
        public override bool Equals(object obj) => obj is IComplexFiveDashStyle ? Equals(obj as IComplexFiveDashStyle) : base.Equals(obj);

        /// <summary>
        /// Porovnání s jinou položkou
        /// </summary>
        /// <param name="other">Jiná položka</param>
        /// <returns></returns>
        bool Equals(IComplexFiveDashStyle other) => LeftValue.Equals(other.LeftValue, StringComparison.OrdinalIgnoreCase)
                && RightValue.Equals(other.RightValue, StringComparison.OrdinalIgnoreCase)
                && TopValue.Equals(other.TopValue, StringComparison.OrdinalIgnoreCase)
                && BottomValue.Equals(other.BottomValue, StringComparison.OrdinalIgnoreCase);

        /// <summary>
        /// Přetížení
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode() => base.GetHashCode();
    }

    /// <summary>
    /// Třída s pěti propojenými vlastnostmi
    /// </summary>
    [Serializable]
    [TypeConverter(typeof(ExpandableObjectConverter))]
    public class URComplexFiveDashStyle : ComplexFiveDashStyle
    {
        [NonSerialized]
        readonly UndoRedo<string> leftvalue = new UndoRedo<string>();
        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlAttribute("LeftValue")]
        [DisplayName("levý")]
        public override string LeftValue { get => leftvalue.Value; set { leftvalue.Value = value; } }

        [NonSerialized]
        readonly UndoRedo<string> rightvalue = new UndoRedo<string>();
        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlAttribute("RightValue")]
        [DisplayName("pravý")]
        public override string RightValue { get => rightvalue.Value; set { rightvalue.Value = value; } }

        [NonSerialized]
        readonly UndoRedo<string> topvalue = new UndoRedo<string>();
        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlAttribute("TopValue")]
        [DisplayName("horní")]
        public override string TopValue { get => topvalue.Value; set { topvalue.Value = value; } }

        [NonSerialized]
        readonly UndoRedo<string> bottomvalue = new UndoRedo<string>();
        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlAttribute("BottomValue")]
        [DisplayName("dolní")]
        public override string BottomValue { get => bottomvalue.Value; set { bottomvalue.Value = value; } }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public URComplexFiveDashStyle() : base() { }
    }
    #endregion
}