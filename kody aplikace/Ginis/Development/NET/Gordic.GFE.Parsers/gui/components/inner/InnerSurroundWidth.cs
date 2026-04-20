//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.InnerSurroundWidth.cs                    </Name>
//    <Description> Vlastnosti šířky vnitčního ohraničení                       </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2022-11-16                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Utils;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Vlastnosti šířky vnitčního ohraničení 
    /// </summary>
    [Serializable]
    public class InnerSurroundWidth : InnerWidth, ICloneable
    {
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public InnerSurroundWidth()
            : base()
        {
        }

        /// <summary>
        /// Nastavení hodnot dle pravidla 
        /// </summary>
        /// <param name="value"></param>
        /// <param name="pvalue">Hodnota</param>
        /// <param name="ppixels">Pixely</param>
        /// <param name="pscale">Měřítko</param>
        override internal void SetByRule(string value, ref string pvalue, ref float ppixels, ref ScaleUni pscale)
        {
            pvalue = value;

            //Nastavení hodnoty dle pravidla:
            //celé kladné číslo v rozmezí od 0 do 25, 
            //které udává přesnou velikost v twipech  
            //dle pravidla 0 = 0 twipů, 1=1twip, a poté vždy N-1 násobek 10 twipů 
            //(tzn. 2 = 10twipů, 3 = 20twipů, atd.)
            //Zkusíme převést hodnotu
            if (!float.TryParse(pvalue, out float lunsp))
                pvalue = null;
            else
            {
                if (lunsp < 0)
                    lunsp = 0;

                //pokud hodnota je větší než 25, pak se převede na twipy
                if (lunsp <= 25)
                    pvalue = Convert.ToString(lunsp);
                else
                    pvalue = Convert.ToString((lunsp - 1) * 10) + "tw";

                if (lunsp > 1)
                    lunsp = (lunsp - 1) * 10;

                ppixels = lunsp * 96 / 1440;
            }

            pscale = ScaleUni.unspec;
        }

        /// <summary>
        /// Vytvoření nové instance dané třídy (kvůli multiselectu v tabulce vlastnosti )
        /// </summary>
        /// <returns></returns>
        object ICloneable.Clone()
        {
            var csw = new InnerSurroundWidth();
            csw.Initialize(this);
            return csw;
        }

        /// <summary>
        /// Indikuje prázdnou hodnotu
        /// </summary>
        [Browsable(false)]
        public bool IsEmpty { get => Pixels == 0; }
    }

    /// <summary>
    /// Seskupení vlastnosti ALL, LEFT, TOP, RIGHT, BOTTOM
    /// </summary>
    [Serializable]
    public class URInnerSurroundWidth : URInnerWidth, ICloneable
    {
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public URInnerSurroundWidth()
            : base()
        {
        }

        /// <summary>
        /// Nastavení všech hodnot dle pravidla 
        /// </summary>
        /// <param name="value"></param>
        /// <param name="pvalue">Hodnota</param>
        /// <param name="ppixels">Pixely</param>
        /// <param name="pscale">Měřítko</param>
        override internal void SetByRule(string value, ref string pvalue, ref float ppixels, ref ScaleUni pscale)
        {
            pvalue = value;

            //Nastavení hodnoty dle pravidla:
            //celé kladné číslo v rozmezí od 0 do 25, 
            //které udává přesnou velikost v twipech  
            //dle pravidla 0 = 0 twipů, 1=1twip, a poté vždy N-1 násobek 10 twipů 
            //(tzn. 2 = 10twipů, 3 = 20twipů, atd.)
            //Zkusíme převést hodnotu
            if (!float.TryParse(pvalue, out float lunsp))
                pvalue = null;
            else
            {
                if (lunsp < 0)
                    lunsp = 0;

                //pokud hodnota je větší než 25, pak se převede na twipy
                if (lunsp <= 25)
                    pvalue = Convert.ToString(lunsp);
                else
                    pvalue = Convert.ToString((lunsp - 1) * 10) + "tw";

                if (lunsp > 1)
                    lunsp = (lunsp - 1) * 10;

                ppixels = lunsp * 96 / 1440;
            }

            pscale = ScaleUni.unspec;
        }

        /// <summary>
        /// Vytvoření nové instance dané třídy (kvůli multiselectu v tabulce vlastnosti )
        /// </summary>
        /// <returns></returns>
        object ICloneable.Clone()
        {
            var urcsw = new URInnerSurroundWidth();
            urcsw.Initialize(this);
            return urcsw;
        }

        /// <summary>
        /// Indikuje prázdnou hodnotu
        /// </summary>
        [Browsable(false)]
        public bool IsEmpty { get => Pixels == 0; }
    }
}
