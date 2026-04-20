//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrfBox.cs                              </Name>
//    <Description> Kontainer s daty                                           </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                            </Copyright>
//    <Created>     2016-09-23                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.UndoRedoFramework;
using System.ComponentModel;

namespace Gordic.GFE.WinClient.Box
{
    class GrfBox : IBox
    {
        #region IBox
        readonly UndoRedo<IComplexColor> color = new UndoRedo<IComplexColor>();
        /// <summary>
        /// Barva množiny dat
        /// </summary>
        public IComplexColor Color { get { return color.Value; } set { color.Value = value; } }

        readonly UndoRedo<string> guid = new UndoRedo<string>();
        /// <summary>
        /// Jednoznačný identifikátor objektu
        /// </summary>
        public string GUID { get { return guid.Value; } set { guid.Value = value; } }
        #endregion

        #region ISizable
        /// <summary>
        /// Velikost objektu v pixelech - se Zoom faktorem
        /// </summary>
        [Browsable(false)]
        public RectangleF BoundsInPixels { get { return new RectangleF(LeftZoom, TopZoom, WidthZoom, HeightZoom); } }

        readonly UndoRedo<SizeValue> height = new UndoRedo<SizeValue>();
        /// <summary>
        /// výška
        /// </summary>
        [Browsable(false)]
        public SizeValue Height { get { return height.Value; } set { height.Value = value; } }
        /// <summary>
        /// výška - včetně Zoom
        /// </summary>
        [Browsable(false)]
        public float HeightZoom { get { return Height * localZoom; } }

        readonly UndoRedo<SizeValue> left = new UndoRedo<SizeValue>();
        /// <summary>
        /// Pozice zleva objektu
        /// </summary>
        [Browsable(false)]
        public SizeValue Left { get { return left.Value; } set { left.Value = value; } }
        /// <summary>
        /// Pozice zleva objektu - včetně Zoom hodnoty
        /// </summary>
        [Browsable(false)]
        public float LeftZoom { get { return 0; } }

        readonly UndoRedo<SizeValue> top = new UndoRedo<SizeValue>();
        /// <summary>
        /// Pozice shora objektu
        /// </summary>
        [Browsable(false)]
        public SizeValue Top { get { return top.Value; } set { top.Value = value; } }
        /// <summary>
        /// Pozice shora objektu - včetně Zoom hodnoty
        /// </summary>
        [Browsable(false)]
        public float TopZoom
        {
            get
            {
                if (Top.IsEmpty)
                    return 0;

                return Top * localZoom;
            }
        }

        readonly UndoRedo<SizeValue> width = new UndoRedo<SizeValue>();
        /// <summary>
        /// šířka
        /// </summary>
        [Browsable(false)]
        public SizeValue Width
        {
            get { return width.Value; }
            set { width.Value = value; }
        }
        /// <summary>
        /// šířka - včetně Zoom hodnoty
        /// </summary>
        [Browsable(false)]
        public float WidthZoom { get { return Width * localZoom; } }

        /// <summary>
        /// indikuje změnu výšky
        /// </summary>
        [Browsable(false)]
        public virtual bool IsHeightChanged { get { return false; } }
        #endregion

        #region IDispose
        public void Dispose()
        {
            throw new NotImplementedException();
        }
        #endregion

        #region IPaintable
        public void OnPaint(Graphics graphics)
        {
            //kreslení objektu není třeba - objekt je pouze jakýmsi ohraničením sloučených objektů
        }

        /// <summary>
        /// kreslení ohraničení objektu
        /// </summary>
        /// <param name="graphics">ovladač grafiky</param>
        /// <param name="isSelected"></param>
        public void OnPaintBorder(Graphics graphics, bool isSelected)
        {
            graphics.DrawRectangle(new Pen(new SolidBrush(Color.Color), 1), LeftZoom, TopZoom, BoundsInPixels.Width, BoundsInPixels.Height);
        }
        #endregion

        float localZoom = 1;
    }
}
