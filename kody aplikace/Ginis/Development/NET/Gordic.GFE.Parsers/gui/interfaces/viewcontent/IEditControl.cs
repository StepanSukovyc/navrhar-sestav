//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IEditControl.cs                          </Name>
//    <Description> Rozhraní editovatelného ovladače                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-03-15                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using System.Drawing;
using Gordic.GFE.Parsers.Dom;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní pro práci s ovladacím prvkem
    /// </summary>
    public interface IEditControlHandler
    {
        /// <summary>
        /// Editovatelný ovladač
        /// </summary>
        IEditControl EditControl { get; }
        /// <summary>
        /// Odstraněnění aktivního objektu
        /// </summary>
        bool RemoveEditControl(bool validate);
        /// <summary>
        /// Aktivujeme ovladač dle typu datové položky
        /// </summary>
        void ActivateEditControl();
    }

    /// <summary>
    /// Rozhraní ovládacího prvku
    /// </summary>
    public interface IEditControl
    {
        bool IsDirty { get; set; }
        /// <summary>
        /// Obsah, kterému patří daný objekt
        /// </summary>
        IDefaultDataItemHandler DataItem { get; set; }
        /// <summary>
        /// Barva textu
        /// </summary>
        Color ForeColor { get; set; }
        /// <summary>
        /// Pozice a velikost ovladače
        /// </summary>
        Rectangle Bounds { get; set; }
        /// <summary>
        /// Pozice obsahu uvnitř ovladače
        /// </summary>
        RectangleF ContentBounds { get; set; }
        /// <summary>
        /// Velikost ovladače
        /// </summary>
        Size Size { get; set; }
        /// <summary>
        /// Pozice ovladače
        /// </summary>
        Point Location { get; set; }
        /// <summary>
        /// Písmo ovladače
        /// </summary>
        Font Font { get; set; }
        /// <summary>
        /// Horizontální zarovnání textu
        /// </summary>
        HorizontalAlignment TextAlign { get; set; }
        /// <summary>
        /// Barva pozadí
        /// </summary>
        Color BackColor { get; set; }
        /// <summary>
        /// Styl rámečku
        /// </summary>
        BorderStyle BorderStyle { get; set; }
        /// <summary>
        /// "Vlastník" ovládacího prvku - objekt, který nahrazuje daný ovladací prvek
        /// </summary>
        object Owner { get; }
        /// <summary>
        /// Lupa
        /// </summary>
        float ZoomFactor { get; }
        /// <summary>
        /// Fokusace objektu
        /// </summary>
        void Focus();
        /// <summary>
        /// Víceřádkový
        /// </summary>
        bool Multiline { get; set; }
        /// <summary>
        /// Přetáčení myši
        /// </summary>
        event MouseEventHandler MouseWheel;
        /// <summary>
        /// Opuštění fokusu
        /// </summary>
        event EventHandler LostFocus;
        /// <summary>
        /// Stisknutí klavesy
        /// </summary>
        event KeyPressEventHandler KeyPress;
        /// <summary>
        /// Opuštěné tlačítko
        /// </summary>
        event KeyEventHandler KeyDown;
        /// <summary>
        /// Změna textu
        /// </summary>
        event EventHandler TextRefreshed;
        /// <summary>
        /// Aktualizace textu
        /// </summary>
        bool RefreshText();
        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        void Dispose();
    }
}
