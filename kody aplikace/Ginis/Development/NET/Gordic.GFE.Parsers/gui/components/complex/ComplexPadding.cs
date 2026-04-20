//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ComplexPadding.cs                        </Name>
//    <Description> Seskupeni vlastnosti ALL, LEFT, TOP, RIGHT, BOTTOM tridy unit</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using Gordic.GFE.Parsers.Utils;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Seskupeni vlastnosti ALL, LEFT, TOP, RIGHT, BOTTOM tridy unit 
    /// </summary>
    [Serializable]
    public class ComplexPadding : ComplexFive, ICloneable
    {
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public ComplexPadding() : base() { }

        /// <summary>
        /// Konstruktor dle výchozího nastavení
        /// </summary>
        /// <param name="options">Výchozí nastavení</param>
        public override IComplexFive Initialize(IDesignerOptions options)
        {
            if (options != null)
            {
                LeftValue = options.DefaultPaddingLeft;
                RightValue = options.DefaultPaddingRight;
                TopValue = options.DefaultPaddingTop;
                BottomValue = options.DefaultPaddingBottom;
            }
            else
                Initialize();

            return this;
        }

        /// <summary>
        /// Nastavení všech hodnot dle pravidla 
        /// </summary>
        /// <param name="value"></param>
        /// <param name="_value">Hodnota</param>
        /// <param name="_pixels">Pixely</param>
        /// <param name="_scale">Měřítko</param>
        override internal void SetByRule(string value, ref string _value, ref float _pixels, ref ScaleUni _scale)
        {
            CommonService.PaddingSetByRule(value, ref _value, ref _pixels, ref _scale);
        }
        #region ICloneable Members

        /// <summary>
        /// Vytvoření nové instance dané třídy (kvůli multiselectu v tabulce vlastnosti )
        /// </summary>
        /// <returns></returns>
        object ICloneable.Clone() { return new ComplexPadding().Initialize(this); }
        #endregion
    }

    /// <summary>
    /// Seskupeni vlastnosti ALL, LEFT, TOP, RIGHT, BOTTOM tridy unit 
    /// </summary>
    [Serializable]
    [TypeConverter(typeof(ExpandableObjectConverter))]
    public class URComplexPadding : URComplexFive, ICloneable
    {
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public URComplexPadding() : base() { }

        /// <summary>
        /// Konstruktor dle výchozího nastavení
        /// </summary>
        /// <param name="options">Výchozí nastavení</param>
        public override IComplexFive Initialize(IDesignerOptions options)
        {
            if (options != null)
            {
                LeftValue = options.DefaultPaddingLeft;
                RightValue = options.DefaultPaddingRight;
                TopValue = options.DefaultPaddingTop;
                BottomValue = options.DefaultPaddingBottom;
            }
            else
                Initialize();

            return this;
        }

        /// <summary>
        /// Nastavení všech hodnot dle pravidla 
        /// </summary>
        /// <param name="value"></param>
        /// <param name="_value">Hodnota</param>
        /// <param name="_pixels">Pixely</param>
        /// <param name="_scale">Měřítko</param>
        override internal void SetByRule(string value, ref string _value, ref float _pixels, ref ScaleUni _scale)
        {
            CommonService.PaddingSetByRule(value, ref _value, ref _pixels, ref _scale);
        }

        #region ICloneable Members

        /// <summary>
        /// Vytvoření nové instance dané třídy (kvůli multiselectu v tabulce vlastnosti )
        /// </summary>
        /// <returns></returns>
        object ICloneable.Clone() { return new URComplexPadding().Initialize(this); }
        #endregion        
    }
}
