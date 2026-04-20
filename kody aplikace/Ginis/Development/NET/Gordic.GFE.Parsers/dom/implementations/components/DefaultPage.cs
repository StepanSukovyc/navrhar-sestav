//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DocfrmPage.cs                         </Name>
//    <Description> Stránka grf formuláře                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.General;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Stránka grf formuláře
    /// </summary>
    [ComVisible(false)]
    public class DefaultPage : AbstractPage
    {
        readonly IViewContent view;

        /// <summary>
        /// Vytvoření stránky v kolekcí <paramref name="pages"/>.
        /// </summary>
        /// <param name="pages">Kolekcé stránek - vlastník vytvářené stránky</param>
        /// <param name="view">Pohled na obsah</param>
        public DefaultPage(IPages pages, IViewContent view)
            : base(pages, null)
        {
            this.view = view;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
                if (DelayPaintList != null)
                    DelayPaintList.Clear();

            base.Dispose(disposing);
        }

        /// <summary>
        /// Kreslení stránky
        /// </summary>
        /// <param name="clipRectangle">kreslená oblast</param>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="args">Upřesnení co a jak vykreslovat</param>
        public override void Paint(Rectangle clipRectangle, Graphics graphics, PaintArgs args)
        {
            if (!clipRectangle.IntersectsWith(
                new Rectangle(PagePanel.GSS.PageLeft - _PagePanel.HorizontalScroll.Value
                    , (int)TopZoom - _PagePanel.VerticalScroll.Value
                    , (int)WidthZoom + 5
                    , (int)HeightZoom + 3)))
            {
                IsActive = false;
                return;
            }

            var transform = graphics.Transform;
            // zjistíme aktuální pozici levého horního rohu stránky
            // tato pozice je závislá na hodnotě přetáčení (Scroll)
            graphics.TranslateTransform(PagePanel.GSS.PageLeft - _PagePanel.HorizontalScroll.Value,
                (int)TopZoom - _PagePanel.VerticalScroll.Value);

            DrawClear(graphics);
            // kreslení ohraničení stránky (stíny)
            DrawFrame(graphics);

            // mřížku kreslíme také jen na obsahovou zónu
            // a až na obrázek pozadí
            if (PagePanel.GSS.GetShowGrid(view))
                DrawGrid(graphics);

            //if (backPageFoil.CachBitmap != null
            //    && backGridFoil.CachBitmap != null)
            //{
            //    if (backPageFoil.IsRepainted || backGridFoil.IsRepainted)
            //    {
            //        if (cachBitmap != null)
            //        {
            //            cachBitmap.Dispose();
            //            cachBitmap = null;
            //        }

            //        Rectangle rect = new Rectangle(0, 0, (int)(WidthZoom + 1 + CommonService.RightDark), (int)(HeightZoom + 1 + CommonService.BottomDark));
            //        cachBitmap = new Bitmap(rect.Width, rect.Height);

            //        using (Graphics _graphics = Graphics.FromImage(cachBitmap))
            //        {
            //            // vyčistíme stránku definovanou barvou
            //            // a nakreslímě pozadí stránky definovanou barvou
            //            _graphics.DrawImageUnscaledAndClipped(backPageFoil.CachBitmap, rect);

            //            // mřížku kreslíme také jen na obsahovou zónu
            //            // ale až na pozadí
            //            _graphics.DrawImageUnscaledAndClipped(backGridFoil.CachBitmap
            //                , new Rectangle(1, 1, (int)WidthZoom, (int)HeightZoom));
            //        }
            //    }
            //}

            //graphics.DrawImageUnscaledAndClipped(cachBitmap,
            //    new Rectangle((int)(LeftZoom - 1 - PagePanel.HorizontalScroll.Value)
            //                , (int)(TopZoom - 1 - PagePanel.VerticalScroll.Value)
            //                , (int)(WidthZoom + 1 + CommonService.RightDark)
            //                , (int)(HeightZoom + 1 + CommonService.BottomDark)));

            graphics.ResetTransform();
            graphics.Transform = transform;

            graphics.TranslateTransform(-_PagePanel.HorizontalScroll.Value, -_PagePanel.VerticalScroll.Value);
            // kreslení obsahu
            PaintContent(graphics, args);

            graphics.ResetTransform();
            graphics.Transform = transform;
            IsActive = true;
        }

        List<PointF> posVerticalCach = new List<PointF>(), posHorisontalCach = new List<PointF>();
        /// <summary>
        /// Kresení mřížky
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        void DrawGrid(Graphics graphics)
        {
            float res = GraphicSettingService.Resolution;
            if (res <= 0)
                return;
            int width = (int)WidthZoom,
                height = (int)HeightZoom;

            float zoom = GraphicSettingService.Zoom;
            float marginL = MarginLeft * zoom,
                marginR = MarginRight * zoom,
                marginT = MarginTop * zoom,
                marginB = MarginBottom * zoom;

            float resZoom = res * zoom;

            using (SolidBrush drawBrash = new SolidBrush(CommonService.BorderColorNonactive))
            {
                using (Pen pen = new Pen(drawBrash, 1F))
                {
                    float right = width - marginR,
                        down = height - marginB;

                    if (_PagePanel.PositionCachNeedRefresh)
                    {
                        posVerticalCach.Clear();
                        posHorisontalCach.Clear();

                        float x = marginL,
                            y = marginT;

                        while (x < 0)
                            x += resZoom;

                        while (y < 0)
                            y += resZoom;

                        bool next = true;
                        while (x <= width - marginR)
                        {
                            if (next)
                            {
                                posVerticalCach.Add(new PointF(x, marginT));
                                posVerticalCach.Add(new PointF(x, height - marginB));
                                next = !next;
                            }
                            else
                            {
                                posVerticalCach.Add(new PointF(x, height - marginB));
                                posVerticalCach.Add(new PointF(x, marginT));
                                next = !next;
                            }
                            x += resZoom;
                        }

                        next = true;
                        while (y <= height - marginB)
                        {
                            if (next)
                            {
                                posHorisontalCach.Add(new PointF(marginL, y));
                                posHorisontalCach.Add(new PointF(width - marginR, y));
                                next = !next;
                            }
                            else
                            {
                                posHorisontalCach.Add(new PointF(width - marginR, y));
                                posHorisontalCach.Add(new PointF(marginL, y));
                                next = !next;
                            }
                            y += resZoom;
                        }
                    }

                    if ((PagePanel as FillerPagePanel).Pages.Count == Order)
                        _PagePanel.PositionCachNeedRefresh = false;

                    PointF[] pointsVertical = new PointF[posVerticalCach.Count];
                    PointF[] pointsHorizontal = new PointF[posHorisontalCach.Count];
                    posVerticalCach.CopyTo(pointsVertical);
                    posHorisontalCach.CopyTo(pointsHorizontal);
                    if (pointsVertical.Length > 0)
                        graphics.DrawLines(pen, pointsVertical);
                    if (pointsHorizontal.Length > 0)
                        graphics.DrawLines(pen, pointsHorizontal);

                    if ((float)MarginRight != 0)
                        graphics.DrawLine(pen, new PointF(right, marginT), new PointF(right, down));

                    if ((float)MarginBottom != 0)
                        graphics.DrawLine(pen, new PointF(marginL, down), new PointF(right, down));
                }
            }
        }
        void DrawFrame(Graphics graphics)
        {
            int w = (int)WidthZoom,
                h = (int)HeightZoom;

            // pravý stín
            graphics.FillRectangle(SystemBrushes.ControlText,
                w, CommonService.BottomDark,
                CommonService.RightDark, h);
            // dolní stín
            graphics.FillRectangle(SystemBrushes.ControlText,
                CommonService.RightDark,
                h,
                w - CommonService.RightDark,
                CommonService.BottomDark);

            // černý rámeček stránky
            graphics.DrawRectangle(SystemPens.ControlText, 0, 0, w, h);
        }
        void DrawClear(Graphics graphics)
        {
            // stránku vyčistíme bílou barvou
            //MAL - neni nutne? graphics.FillRectangle(new SolidBrush(Color.White), new Rectangle(0, 0, (int)WidthZoom, (int)HeightZoom));

            if (BackColor.Color == Color.Transparent || !ShowBackground)
                // výchozí barva stránky
                graphics.FillRectangle(SystemBrushes.ControlLightLight, 0, 0, (int)WidthZoom, (int)HeightZoom);
            else
                // uživatelsky daná barva stránky
                graphics.FillRectangle(new SolidBrush(BackColor.Color), 0, 0, (int)WidthZoom, (int)HeightZoom);

            if (BackImage != null
                && BackImage.Image != null
                && ShowBackground)
                using (Image img = new Bitmap(BackImage.Image, new Size((int)(BackImage.Image.Width * Zoom), (int)(BackImage.Image.Height * Zoom))))
                    graphics.DrawImageUnscaledAndClipped(img, new Rectangle(0, 0, (int)WidthZoom, (int)HeightZoom));
        }

        public void PaintContent(Graphics graphics, System.Drawing.RectangleF rectangle)
        {
            //MAL nevim, co ten rectangle ma byt?
            PaintContent(graphics, new PaintArgs());
        }

        public void PaintContent(Graphics graphics, PaintArgs args)
        {
            // při absenci ovladače grafiky nelze objekt vykreslit
            if (graphics == null)
                throw new Exception(GResources.GetResourceText(29450282)); //RC 29450282 : Komponenty nelze kreslit - nelze použit ovladač grafiky!

            // vyprázdníme předchozí objekty
            DelayPaintList.Clear();

            Region reg = graphics.Clip;
            graphics.Clip = new Region(RectangleF.Intersect(BoundsInPixels, graphics.VisibleClipBounds));

            // vykreslíme vnitřní vybrané komponenty 
            this.ForEach(tag => tag != null, TagService.PaintTag, graphics, args);

            // vykreslíme rámečky všech objektů, které jsou v seznamu zpožděného kreslení a...
            // nemaji rámeček ani nejsou vybrané
            DelayPaintList.ForEach(item => !item.ExistsSurround && !item.IsSelected, PaintDelay, graphics);
            // mají rámeček ale nejsou vybrané
            DelayPaintList.ForEach(item => item.ExistsSurround && !item.IsSelected, PaintDelay, graphics);
            // jsou vybrané
            DelayPaintList.ForEach(item => item.IsSelected, PaintDelay, graphics);

            graphics.Clip = reg;
        }
        void PaintDelay(DelayPaintItem item, params object[] graphics)
        {
            item.Paint(graphics[0] as Graphics);
        }

        internal bool ContainsEditableValue()
        {
            foreach (ITagComponent c in All)
                if (c is IDefaultDataItemHandler v)
                    if (v.DataItem != null && v.DataItem.Edit) return true;
            return false;
        }
        //internal bool ContainsEmptyRequiredValue()
        //{
        //    foreach (ITagComponent c in All)
        //    {
        //        if (c is IDefaultDataItemHandler)
        //        {
        //            var v = (IDefaultDataItemHandler)c;
        //            if (v.DataItem.EmptyRequired) return true;
        //        }
        //    }
        //    return false;
        //}

    }
}
