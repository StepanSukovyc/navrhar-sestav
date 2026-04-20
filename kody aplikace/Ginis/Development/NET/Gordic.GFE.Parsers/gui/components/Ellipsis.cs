//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Ellipsis.cs                              </Name>
//    <Description> Třída prezentující zakončení textu                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-11-08                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.UndoRedoFramework;
using System.ComponentModel;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Výčet všech možných zakončení
    /// </summary>
    public enum ElStyle
    {
        /// <summary>
        /// tečky
        /// </summary>
        dots = 0,
        /// <summary>
        /// uříznutý
        /// </summary>
        cut = 1,
        /// <summary>
        /// výpustka
        /// </summary>
        fill = 2,
    }

    public interface IEllipsis
    {
        /// <summary>
        /// Znak výpustky
        /// </summary>
        char Char { get; set; }
        /// <summary>
        /// Styl zakončení
        /// </summary>
        ElStyle Style { get; set; }
        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <returns></returns>
        IEllipsis Initialize();
    }

    /// <summary>
    /// Třída prezentující zakončení textu
    /// </summary>
    [TypeConverter(typeof(ExpandableObjectConverter))]
    public class Ellipsis : IEllipsis
    {
        /// <summary>
        /// Znak výpustky
        /// </summary>
        [DisplayName("znak")]
        [Description("Znak výpustky")]
        public virtual char Char { get; set; }

        /// <summary>
        /// Styl zakončení
        /// </summary>
        [DisplayName("styl")]
        [Description("Styl zakončení")]
        public virtual ElStyle Style { get; set; }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public Ellipsis() { }

        /// <exclude/>
        public IEllipsis Initialize()
        {
            Style = ElStyle.dots;
            Char = '*';
            return this;
        }
        /// <summary>
        /// Převod objektu do řetězce
        /// </summary>
        /// <returns>Řetězcová prezentace objektu</returns>
        public override string ToString()
        {
            return string.Format("[" + GResources.GetResourceText(29450479) + ": {0}; " + GResources.GetResourceText(29450368) + ": {1}]", Char, Style); //RC 29450368 : styl
        }
    }

    /// <summary>
    /// Třída prezentující zakončení textu
    /// </summary>
    [TypeConverter(typeof(ExpandableObjectConverter))]
    public class UREllipsis : Ellipsis
    {
        readonly UndoRedo<char> m_char = new UndoRedo<char>();
        /// <summary>
        /// Znak výpustky
        /// </summary>
        [DisplayName("znak")]
        [Description("Znak výpustky")]
        public override char Char { get { return m_char.Value; } set { m_char.Value = value; } }

        readonly UndoRedo<ElStyle> style = new UndoRedo<ElStyle>();
        /// <summary>
        /// Styl zakončení
        /// </summary>
        [DisplayName("styl")]
        [Description("Styl zakončení")]
        public override ElStyle Style { get { return style.Value; } set { style.Value = value; } }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public UREllipsis()
            : base()
        {
        }
    }
}
