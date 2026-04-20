//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.LineProperty.cs                          </Name>
//    <Description> třída prezentující vastnosti řádku                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-21                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.UndoRedoFramework;

namespace Gordic.GFE.Parsers.Editor
{
    /// <summary>
    /// Typ řádku dle umístění
    /// </summary>
    public enum LineType
    {
        /// <summary>
        /// řádek se nachází v hlavičce
        /// </summary>
        head = 0,
        /// <summary>
        /// řádek se nachází v těle
        /// </summary>
        body = 1,
        /// <summary>
        /// řádek se nachází v patičce
        /// </summary>
        foot = 2,
        /// <summary>
        /// řádek je hlavičkou objektu, ve kterém se nachází
        /// </summary>
        columns,
        /// <summary>
        /// obyčejný řádek - tabulka, mřížka, atp.
        /// </summary>
        line
    }
    /// <summary>
    /// Možnosti stránkování za/před řádkem
    /// </summary>
    public enum LineBreak
    {
        /// <summary>
        /// Odtránkovat na nový list
        /// </summary>
        sheet = 3,
        /// <summary>
        /// Odstránkuje před/za řádkem
        /// </summary>
        pageup = 2,
        /// <summary>
        /// Zakáže stránkování před/za řádkem
        /// </summary>
        forbid = 1,
        /// <summary>
        /// Žádna akce
        /// </summary>
        none = 0
    }

    /// <summary>
    /// Pozice řádku na výstupu
    /// </summary>
    public enum LinePrintPosition
    {
        /// <summary>
        /// řádek hlavičky, nebo patičky se bude tisknout na úvod, nebo na závěr oblasti při zaškrtnute volbě
        /// FALSE
        /// </summary>
        intrclose = 2,
        /// <summary>
        /// řádek hlavičky, nebo patičky se bude tisknout uvnitř oblasti
        /// </summary>
        middle = 1,
        /// <summary>
        /// na každé stránce
        /// </summary>
        oneachpage = 0
    }

    /// <summary>
    /// Nastavení řádku
    /// </summary>
    public class LineProperty : ICloneable
    {
        #region ICloneable
        /// <summary>
        /// klon daného objektu
        /// </summary>
        /// <returns>nová instance objektu se stejnými vlastnostmi</returns>
        public object Clone()
        {
            return new LineProperty(this);
        }
        #endregion

        readonly UndoRedo<LinePrintPosition> printposition = new UndoRedo<LinePrintPosition>();
        /// <summary>
        /// Pozice řádku na stránce
        /// </summary>
        public LinePrintPosition PrintPosition { get { return printposition.Value; } set { printposition.Value = value; } }

        readonly UndoRedo<LineBreak> breakpageafter = new UndoRedo<LineBreak>();
        /// <summary>
        /// Odstránkovat ZA řádkem
        /// </summary>
        public LineBreak BreakPageAfter { get { return breakpageafter.Value; } set { breakpageafter.Value = value; } }

        readonly UndoRedo<LineBreak> breakpagebefore = new UndoRedo<LineBreak>();
        /// <summary>
        /// Odstránkovat před řádkem
        /// </summary>
        public LineBreak BreakPageBefore { get { return breakpagebefore.Value; } set { breakpagebefore.Value = value; } }

        readonly UndoRedo<bool> endpage = new UndoRedo<bool>();
        /// <summary>
        /// Indikuje stav, kdy řádek se nachází na konci stránky
        /// </summary>
        public bool EndPage { get { return endpage.Value; } set { endpage.Value = value; } }

        readonly UndoRedo<string> onlyif = new UndoRedo<string>();
        /// <summary>
        /// Parametr OnlyIf
        /// </summary>
        public string OnlyIf { get => onlyif.Value; set => onlyif.Value = value; } 

        /// <summary>
        /// Prázdný konstruktor třídy
        /// </summary>
        public LineProperty()
        {
            PrintPosition = LinePrintPosition.intrclose;
            BreakPageAfter = LineBreak.none;
            BreakPageBefore = LineBreak.none;
            EndPage = true;
        }

        /// <summary>
        /// Vytvoření nové instance třídy s následným kopírováním vlastností daného objektu.
        /// </summary>
        /// <param name="property">Daný objekt</param>
        public LineProperty(LineProperty property)
            : this()
        {
            // v případě, že ne - pak není co řešit
            if (property == null)
                return;

            // v opačnem případě zkopírujeme vlastnosti
            PrintPosition = property.PrintPosition;
            EndPage = property.EndPage;
            BreakPageBefore = property.BreakPageBefore;
            BreakPageAfter = property.BreakPageAfter;
            OnlyIf = property.OnlyIf;
        }
    }
}
