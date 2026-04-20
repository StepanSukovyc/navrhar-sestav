//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IPaintable.cs                            </Name>
//    <Description> Rozhraní kreslitelných objektů                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní kreslitelných objektů
    /// </summary>
    public interface IPaintable
    {
        /// <summary>
        /// Kreslení objektu
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="args">Upřesnení co a jak vykreslovat</param>
        void OnPaint(Graphics graphics, PaintArgs args);
        /// <summary>
        /// Kreslení objektu
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="isSelected">indikátor vybranosti objektu</param>
        void OnPaintBorder(Graphics graphics, bool isSelected);
    }

    public class PaintArgs : EventArgs
    {
        [Flags]
        public enum PartsEnum { Background=1, Content=2, Border=4 };
        public PartsEnum Parts { get; set; }

        public bool DrawBackground => (Parts & PartsEnum.Background) > 0;
        public bool DrawContent => (Parts & PartsEnum.Content) > 0;
        public bool DrawBorder => (Parts & PartsEnum.Border) > 0;


        //---------------------------------------------------------------------
        ///<summary>Přechod na paint vnořeného prvku</summary>
        public Func<IPaintable, PaintArgs> ChildPaint;
        /// <exclude/>
        internal PaintArgs OnChildPaint(IPaintable obj)
        {            
            if (ChildPaint == null) return this;
            return ChildPaint(obj) ?? this;
        }


        public PaintArgs()
        {
            Parts = PartsEnum.Background | PartsEnum.Content | PartsEnum.Border;
        }
    }

}
