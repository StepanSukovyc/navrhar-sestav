//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ComplexFive.cs                           </Name>
//    <Description> Třída s pěti propojenými vlastnostmi                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.Drawing;
using System.Xml.Serialization;
using Gordic.GFE.Parsers.UndoRedoFramework;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// rozhraní komplexní pětíbarvy
    /// </summary>
    public interface IComplexFiveColor
    {
        /// <summary>
        /// hodnota společné barvy
        /// </summary>
        IComplexColor AllValue { get; set; }
        /// <summary>
        /// hodnota 'levé' barvy
        /// </summary>
        IComplexColor LeftValue { get; set; }
        /// <summary>
        /// hodnota 'pravé' barvy
        /// </summary>
        IComplexColor RightValue { get; set; }
        /// <summary>
        /// hodnota 'horní' barvy
        /// </summary>
        IComplexColor TopValue { get; set; }
        /// <summary>
        /// hodnota 'spodní' barvy
        /// </summary>
        IComplexColor BottomValue { get; set; }
        /// <summary>
        /// Nastavení barvy všem hodnotam
        /// </summary>
        /// <param name="value">Nová hodnota</param>
        void SetAllValue(IComplexColor value);
        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <returns></returns>
        IComplexFiveColor Initialize();
        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="value">společná barva</param>
        /// <returns></returns>
        IComplexFiveColor Initialize(Color value);
        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        IComplexFiveColor Initialize(IComplexFiveColor value);
    }

    /// <summary>
    /// třída pětí barev
    /// </summary>
    public class ComplexFiveColor : IComplexFiveColor
    {
        /// <summary>
        /// Vše
        /// </summary>
        [XmlElement("AllValue")]
        [DisplayName("vše")]
        public IComplexColor AllValue
        {
            get { return GetAllValue(); }
            set { SetAllValue(value); }
        }
        IComplexColor GetAllValue()
        {
            if (BottomValue.Color == LeftValue.Color
                && BottomValue.Color == RightValue.Color
                && BottomValue.Color == TopValue.Color)
                return LeftValue;
            else return null;
        }

        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlElement("LeftValue")]
        [DisplayName("levá")]
        public virtual IComplexColor LeftValue { get; set; }

        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlElement("RightValue")]
        [DisplayName("pravá")]
        public virtual IComplexColor RightValue { get; set; }

        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlElement("TopValue")]
        [DisplayName("horní")]
        public virtual IComplexColor TopValue { get; set; }

        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlElement("BottomValue")]
        [DisplayName("dolní")]
        public virtual IComplexColor BottomValue { get; set; }

        /// <summary>
        /// indikuje vytvoření konstrukteru všech objektů
        /// </summary>
        protected bool isConstruct;
        /// <summary>
        /// volání konstruktorů všech objektů
        /// </summary>
        protected virtual void Construct()
        {
            if (!isConstruct)
            {
                LeftValue = new ComplexColor();
                RightValue = new ComplexColor();
                TopValue = new ComplexColor();
                BottomValue = new ComplexColor();
            }
        }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <returns></returns>
        public virtual IComplexFiveColor Initialize()
        {
            Construct();

            LeftValue.Initialize();
            RightValue.Initialize();
            TopValue.Initialize();
            BottomValue.Initialize();
            return this;
        }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="value">společná barva</param>
        /// <returns></returns>
        public virtual IComplexFiveColor Initialize(Color value) { AllValue = new ComplexColor().Initialize(value); return this; }

        /// <exclude/>
        public virtual IComplexFiveColor Initialize(IComplexFiveColor value)
        {
            Construct();

            if (value != null)
            {
                BottomValue.Initialize(value.BottomValue);
                LeftValue.Initialize(value.LeftValue);
                RightValue.Initialize(value.RightValue);
                TopValue.Initialize(value.TopValue);
            }
            else
                Initialize();

            return this;
        }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public ComplexFiveColor() { }

        /// <summary>
        /// Nastavení barvy všem hodnotam
        /// </summary>
        /// <param name="value">Nová hodnota</param>
        public virtual void SetAllValue(IComplexColor value)
        {
            Construct();

            LeftValue.Initialize(value);
            RightValue.Initialize(value);
            TopValue.Initialize(value);
            BottomValue.Initialize(value);
        }

        /// <summary>
        /// Přetížení porovnaní dvou komponent 
        /// </summary>
        /// <param name="obj">Komponenta, s kterou se porovnává daná</param>
        /// <returns>Pokud jsou stejné pak se vrací TRUE jinak FALSE</returns>
        public override bool Equals(object obj)
        {
            if (!(obj is IComplexFiveColor cFC))
                return base.Equals(obj);

            if (obj is IComplexColor cC)
                return LeftValue.Color.Equals(cC.Color)
                    && RightValue.Color.Equals(cC.Color)
                    && TopValue.Color.Equals(cC.Color)
                    && BottomValue.Color.Equals(cC.Color);

            return Equals(cFC);
        }
        /// <exclude/>
        public override string ToString()
        {
            //Pokud existuje společná hodnota, pak ji vrátíme
            if (AllValue != null && AllValue.Color != Color.Transparent)
                if (!string.IsNullOrEmpty(AllValue.Color.Name))
                    return AllValue.Color.Name + ";";
                else return string.Empty;

            string _result = string.Empty;
            if (LeftValue != null && LeftValue.Color != Color.Transparent)
                _result += LeftValue.Color.Name + ";";
            else _result += ";";

            if (RightValue != null && RightValue.Color != Color.Transparent)
                _result += RightValue.Color.Name + ";";
            else _result += ";";

            if (TopValue != null && TopValue.Color != Color.Transparent)
                _result += TopValue.Color.Name + ";";
            else _result += ";";

            if (BottomValue != null && BottomValue.Color != Color.Transparent)
                _result += BottomValue.Color.Name + ";";
            else _result += ";";

            //Jinak vrátíme ostatní hodnoty 
            return _result;
        }

        bool Equals(IComplexFiveColor other)
        {
            return LeftValue.Equals(other.LeftValue)
                && RightValue.Equals(other.RightValue)
                && TopValue.Equals(other.TopValue)
                && BottomValue.Equals(other.BottomValue);
        }

        /// <summary>
        /// Přetížení
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode() { return base.GetHashCode(); }
    }

    /// <summary>
    /// Třída s pěti propojenými vlastnostmi
    /// </summary>
    [Serializable]
    [TypeConverter(typeof(ExpandableObjectConverter))]
    public class URComplexFiveColor : ComplexFiveColor
    {
        [NonSerialized]
        readonly UndoRedo<IComplexColor> leftvalue = new UndoRedo<IComplexColor>();
        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlElement("LeftValue")]
        [DisplayName("levá")]
        public override IComplexColor LeftValue { get { return leftvalue.Value; } set { leftvalue.Value = value; } }

        [NonSerialized]
        readonly UndoRedo<IComplexColor> rightvalue = new UndoRedo<IComplexColor>();
        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlElement("RightValue")]
        [DisplayName("pravá")]
        public override IComplexColor RightValue { get { return rightvalue.Value; } set { rightvalue.Value = value; } }

        [NonSerialized]
        readonly UndoRedo<IComplexColor> topvalue = new UndoRedo<IComplexColor>();
        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlElement("TopValue")]
        [DisplayName("horní")]
        public override IComplexColor TopValue { get { return topvalue.Value; } set { topvalue.Value = value; } }

        [NonSerialized]
        readonly UndoRedo<IComplexColor> bottomvalue = new UndoRedo<IComplexColor>();
        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlElement("BottomValue")]
        [DisplayName("dolní")]
        public override IComplexColor BottomValue { get { return bottomvalue.Value; } set { bottomvalue.Value = value; } }

        /// <summary>
        /// volání konstruktorů všech objektů
        /// </summary>
        protected override void Construct()
        {
            if (!isConstruct)
            {
                LeftValue = new URComplexColor();
                RightValue = new URComplexColor();
                TopValue = new URComplexColor();
                BottomValue = new URComplexColor();
            }
        }

        /// <exclude/>
        public override IComplexFiveColor Initialize()
        {
            Construct();

            LeftValue.Initialize();
            RightValue.Initialize();
            TopValue.Initialize();
            BottomValue.Initialize();

            return this;
        }

        /// <exclude/>
        public override IComplexFiveColor Initialize(Color value)
        {
            AllValue = new URComplexColor().Initialize(value);
            return this;
        }

        /// <exclude/>
        public override IComplexFiveColor Initialize(IComplexFiveColor value)
        {
            Construct();
            if (value != null)
            {
                BottomValue.Initialize(value.BottomValue);
                LeftValue.Initialize(value.LeftValue);
                RightValue.Initialize(value.RightValue);
                TopValue.Initialize(value.TopValue);
            }
            else
                Initialize();

            return this;
        }

        /// <summary>
        /// Nastavení barvy všem hodnotam
        /// </summary>
        /// <param name="value">Nová hodnota</param>
        public override void SetAllValue(IComplexColor value)
        {
            Construct();
            LeftValue.Initialize(value);
            RightValue.Initialize(value);
            TopValue.Initialize(value);
            BottomValue.Initialize(value);
        }
    }
}
