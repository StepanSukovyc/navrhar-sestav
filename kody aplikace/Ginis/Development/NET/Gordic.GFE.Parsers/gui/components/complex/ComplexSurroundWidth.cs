//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ComplexSurroundWidth.cs                     </Name>
//    <Description> Seskupení vlastnosti ALL, LEFT, TOP, RIGHT, BOTTOM          </Description>
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
    /// Seskupení vlastnosti ALL, LEFT, TOP, RIGHT, BOTTOM
    /// </summary>
    [Serializable]
    public class ComplexSurroundWidth : ComplexFive, ICloneable
    {
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public ComplexSurroundWidth()
            : base()
        {
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
            _value = value;

            //Nastavení hodnoty dle pravidla:
            //celé kladné číslo v rozmezí od 0 do 25, 
            //které udává přesnou velikost v twipech  
            //dle pravidla 0 = 0 twipů, 1=1twip, a poté vždy N-1 násobek 10 twipů 
            //(tzn. 2 = 10twipů, 3 = 20twipů, atd.)
            //Zkusíme převést hodnotu
            if (!float.TryParse(_value, out float _unsp))
                _value = null;
            else
            {
                if (_unsp < 0)
                    _unsp = 0;

                //pokud hodnota je větší než 25, pak se převede na twipy
                if (_unsp <= 25)
                    _value = Convert.ToString(_unsp);
                else
                    _value = Convert.ToString((_unsp - 1) * 10) + "tw";

                if (_unsp > 1)
                    _unsp = (_unsp - 1) * 10;

                _pixels = _unsp * 96 / 1440;
            }

            _scale = ScaleUni.unspec;
        }

        /// <summary>
        /// Vytvoření nové instance dané třídy (kvůli multiselectu v tabulce vlastnosti )
        /// </summary>
        /// <returns></returns>
        object ICloneable.Clone()
        {
            var csw = new ComplexSurroundWidth();
            csw.Initialize(this);
            return csw;
        }

        /// <summary>
        /// Indikuje prázdnou hodnotu
        /// </summary>
        [Browsable(false)]
        public bool IsEmpty { get => LeftPixels == 0 && RightPixels == 0 && TopPixels == 0 && BottomPixels == 0; }
    }

    /// <summary>
    /// Seskupení vlastnosti ALL, LEFT, TOP, RIGHT, BOTTOM
    /// </summary>
    [Serializable]
    public class URComplexSurroundWidth : URComplexFive, ICloneable
    {
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public URComplexSurroundWidth()
            : base()
        {
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
            _value = value;

            //Nastavení hodnoty dle pravidla:
            //celé kladné číslo v rozmezí od 0 do 25, 
            //které udává přesnou velikost v twipech  
            //dle pravidla 0 = 0 twipů, 1=1twip, a poté vždy N-1 násobek 10 twipů 
            //(tzn. 2 = 10twipů, 3 = 20twipů, atd.)
            //Zkusíme převést hodnotu
            if (!float.TryParse(_value, out float _unsp))
                _value = null;
            else
            {
                if (_unsp < 0)
                    _unsp = 0;

                //pokud hodnota je větší než 25, pak se převede na twipy
                if (_unsp <= 25)
                    _value = Convert.ToString(_unsp);
                else
                    _value = Convert.ToString((_unsp - 1) * 10) + "tw";

                if (_unsp > 1)
                    _unsp = (_unsp - 1) * 10;

                _pixels = _unsp * 96 / 1440;
            }

            _scale = ScaleUni.unspec;
        }

        /// <summary>
        /// Vytvoření nové instance dané třídy (kvůli multiselectu v tabulce vlastnosti )
        /// </summary>
        /// <returns></returns>
        object ICloneable.Clone()
        {
            var urcsw = new URComplexSurroundWidth();
            urcsw.Initialize(this);
            return urcsw;
        }

        /// <summary>
        /// Indikuje prázdnou hodnotu
        /// </summary>
        [Browsable(false)]
        public bool IsEmpty { get => LeftPixels == 0 && RightPixels == 0 && TopPixels == 0 && BottomPixels == 0; }
    }
}
