// <file>
//     <copyright see="prj:///doc/copyright.txt"/>
//     <license see="prj:///doc/license.txt"/>
//     <owner name="Mike Krüger" email="mike@icsharpcode.net"/>
//     <version>$Revision$</version>
// </file>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;
using Gordic.TextEditor.Document;

namespace Gordic.TextEditor
{
	/// <summary>
    /// Tato třída poskytuje pohled na čísla řádků a skládací strategii.
	/// </summary>
	public class FoldMargin : AbstractMargin
	{
		int selectedFoldLine = -1;
        /// <summary>
        /// velikost písma
        /// </summary>
        public override Size Size
        {
            get
            {
                return new Size((int)(textArea.TextView.FontHeight), -1);
            }
        }
        /// <summary>
        /// indikuje dostupnost skládací strategii
        /// </summary>
        public override bool IsVisible
        {
            get
            {
                return textArea.TextEditorProperties.EnableFolding;
            }
        }
		/// <summary>
		/// konstruktor třídy
		/// </summary>
		/// <param name="textArea">oblast, na kterou je strategie aplikováná</param>
		public FoldMargin(TextArea textArea) : base(textArea)
		{
		}
		/// <summary>
		/// kreslení čísel a strategii
		/// </summary>
		/// <param name="g">ovladač grafiky</param>
		/// <param name="rect">kreslící oblast</param>
        public override void Paint(Graphics g, Rectangle rect)
        {
            // pokud kreslící oblast není daná, pak není co řešit
            if (rect.Width <= 0 || rect.Height <= 0)
                return;
            
            HighlightColor lineNumberPainterColor = textArea.Document.HighlightingStrategy.GetColorFor("LineNumbers");

            for (int y = 0; y < (DrawingPosition.Height + textArea.TextView.VisibleLineDrawingRemainder) / textArea.TextView.FontHeight + 1; ++y)
            {
                Rectangle markerRectangle = new Rectangle(DrawingPosition.X,
                                                          DrawingPosition.Top + y * textArea.TextView.FontHeight - textArea.TextView.VisibleLineDrawingRemainder,
                                                          DrawingPosition.Width,
                                                          textArea.TextView.FontHeight);

                if (rect.IntersectsWith(markerRectangle))
                {
                    // vykreslení tečkované oddělovací čáry
                    if (textArea.Document.TextEditorProperties.ShowLineNumbers)
                    {
                        g.FillRectangle(BrushRegistry.GetBrush(textArea.Enabled ? lineNumberPainterColor.BackgroundColor : SystemColors.InactiveBorder),
                                        markerRectangle);

                        g.DrawLine(BrushRegistry.GetDotPen(lineNumberPainterColor.Color),
                                   base.drawingPosition.X,
                                   markerRectangle.Y,
                                   base.drawingPosition.X,
                                   markerRectangle.Bottom);
                    }
                    else
                        g.FillRectangle(BrushRegistry.GetBrush(textArea.Enabled ? lineNumberPainterColor.BackgroundColor : SystemColors.InactiveBorder), markerRectangle);

                    int currentLine = textArea.Document.GetFirstLogicalLine(textArea.TextView.FirstPhysicalLine + y);
                    if (currentLine < textArea.Document.TotalNumberOfLines)
                        PaintFoldMarker(g, currentLine, markerRectangle);
                }
            }
        }

        bool SelectedFoldingFrom(List<FoldMarker> list)
        {
            return list != null ? list.Exists(itm => itm.StartLine == this.selectedFoldLine) : false;
        }

        void PaintFoldMarker(Graphics g, int lineNumber, Rectangle drawingRectangle)
        {
            HighlightColor foldLineColor = textArea.Document.HighlightingStrategy.GetColorFor("FoldLine");
            HighlightColor selectedFoldLine = textArea.Document.HighlightingStrategy.GetColorFor("SelectedFoldLine");

            List<FoldMarker> foldingsWithStart = textArea.Document.FoldingManager.GetFoldingsWithStart(lineNumber);
            List<FoldMarker> foldingsBetween = textArea.Document.FoldingManager.GetFoldingsContainsLineNumber(lineNumber);
            List<FoldMarker> foldingsWithEnd = textArea.Document.FoldingManager.GetFoldingsWithEnd(lineNumber);

            bool isFoldStart = foldingsWithStart.Count > 0;
            bool isBetween = foldingsBetween.Count > 0;
            bool isFoldEnd = foldingsWithEnd.Count > 0;

            bool isStartSelected = SelectedFoldingFrom(foldingsWithStart);
            bool isBetweenSelected = SelectedFoldingFrom(foldingsBetween);
            bool isEndSelected = SelectedFoldingFrom(foldingsWithEnd);

            int foldMarkerSize = (int)Math.Round(textArea.TextView.FontHeight * 0.57f);
            foldMarkerSize -= (foldMarkerSize) % 2;
            int foldMarkerYPos = drawingRectangle.Y + (int)((drawingRectangle.Height - foldMarkerSize) / 2);
            int xPos = drawingRectangle.X + (drawingRectangle.Width - foldMarkerSize) / 2 + foldMarkerSize / 2;


            if (isFoldStart)
            {
                bool isVisible = true;
                bool moreLinedOpenFold = false;
                foreach (FoldMarker foldMarker in foldingsWithStart)
                {
                    if (foldMarker.IsFolded)
                    {
                        isVisible = false;
                    }
                    else
                    {
                        moreLinedOpenFold = foldMarker.EndLine > foldMarker.StartLine;
                    }
                }

                bool isFoldEndFromUpperFold = false;
                foreach (FoldMarker foldMarker in foldingsWithEnd)
                {
                    if (foldMarker.EndLine > foldMarker.StartLine && !foldMarker.IsFolded)
                    {
                        isFoldEndFromUpperFold = true;
                    }
                }

                DrawFoldMarker(g, new RectangleF(drawingRectangle.X + (drawingRectangle.Width - foldMarkerSize) / 2,
                                                 foldMarkerYPos,
                                                 foldMarkerSize,
                                                 foldMarkerSize),
                               isVisible,
                               isStartSelected
                              );

                // kreslení čary NAD značkou FOLD
                if (isBetween || isFoldEndFromUpperFold)
                {
                    g.DrawLine(BrushRegistry.GetPen(isBetweenSelected ? selectedFoldLine.Color : foldLineColor.Color),
                               xPos,
                               drawingRectangle.Top,
                               xPos,
                               foldMarkerYPos - 1);
                }

                // kreslení čary POD značkou FOLD
                if (isBetween || moreLinedOpenFold)
                {
                    g.DrawLine(BrushRegistry.GetPen(isEndSelected || (isStartSelected && isVisible) || isBetweenSelected ? selectedFoldLine.Color : foldLineColor.Color),
                               xPos,
                               foldMarkerYPos + foldMarkerSize + 1,
                               xPos,
                               drawingRectangle.Bottom);
                }
            }
            else if (isFoldEnd)
            {
                int midy = drawingRectangle.Top + drawingRectangle.Height / 2;

                // kreslení konce FOLD značky
                g.DrawLine(BrushRegistry.GetPen(isEndSelected ? selectedFoldLine.Color : foldLineColor.Color),
                           xPos,
                           midy,
                           xPos + foldMarkerSize / 2,
                           midy);

                // kreslení čary NAD značkou konce FOLD
                // kreslí se po skládací značce, protože může mít jinou barvu
                g.DrawLine(BrushRegistry.GetPen(isBetweenSelected || isEndSelected ? selectedFoldLine.Color : foldLineColor.Color),
                           xPos,
                           drawingRectangle.Top,
                           xPos,
                           midy);

                // kreslení čary POD značkou konce FOLD
                if (isBetween)
                    g.DrawLine(BrushRegistry.GetPen(isBetweenSelected ? selectedFoldLine.Color : foldLineColor.Color),
                               xPos,
                               midy + 1,
                               xPos,
                               drawingRectangle.Bottom);
            }
            else if (isBetween)
                // jenom řádek
                g.DrawLine(BrushRegistry.GetPen(isBetweenSelected ? selectedFoldLine.Color : foldLineColor.Color),
                           xPos,
                           drawingRectangle.Top,
                           xPos,
                           drawingRectangle.Bottom);
        }
		
        /// <summary>
        /// odchycení pohybu myši nad objektem
        /// </summary>
        /// <param name="mousepos">aktuální pozice myši</param>
        /// <param name="mouseButtons">tlačítka myši</param>
        public override void HandleMouseMove(Point mousepos, MouseButtons mouseButtons)
        {
            bool showFolding = textArea.Document.TextEditorProperties.EnableFolding;
            int physicalLine = +(int)((mousepos.Y + textArea.VirtualTop.Y) / textArea.TextView.FontHeight);
            int realline = textArea.Document.GetFirstLogicalLine(physicalLine);

            if (!showFolding || realline < 0 || realline + 1 >= textArea.Document.TotalNumberOfLines)
                return;

            List<FoldMarker> foldMarkers = textArea.Document.FoldingManager.GetFoldingsWithStart(realline);
            int oldSelection = selectedFoldLine;
            if (foldMarkers.Count > 0)
                selectedFoldLine = realline;
            else
                selectedFoldLine = -1;
            if (oldSelection != selectedFoldLine)
                textArea.Refresh(this);
        }
		
        /// <summary>
        /// odchycení kliknutí myši
        /// </summary>
        /// <param name="mousepos">aktuální pozice myši</param>
        /// <param name="mouseButtons">dostupná tlačítka myši</param>
        public override void HandleMouseDown(Point mousepos, MouseButtons mouseButtons)
        {
            bool showFolding = textArea.Document.TextEditorProperties.EnableFolding;
            int physicalLine = +(int)((mousepos.Y + textArea.VirtualTop.Y) / textArea.TextView.FontHeight);
            int realline = textArea.Document.GetFirstLogicalLine(physicalLine);

            // aktivujeme textarea pro případ, že uživatel klikl na čísla řádků
            textArea.Focus();

            if (!showFolding || realline < 0 || realline + 1 >= textArea.Document.TotalNumberOfLines)
                return;

            List<FoldMarker> foldMarkers = textArea.Document.FoldingManager.GetFoldingsWithStart(realline);
            foreach (FoldMarker fm in foldMarkers)
                fm.IsFolded = !fm.IsFolded;
            textArea.Document.FoldingManager.NotifyFoldingsChanged(EventArgs.Empty);
        }
		
        /// <summary>
        /// odchycení akce opuštění plochy
        /// </summary>
        /// <param name="e">argument metody</param>
        public override void HandleMouseLeave(EventArgs e)
        {
            if (selectedFoldLine != -1)
            {
                selectedFoldLine = -1;
                textArea.Refresh(this);
            }
        }
		
		#region funkce kreslení
        void DrawFoldMarker(Graphics g, RectangleF rectangle, bool isOpened, bool isSelected)
        {
            HighlightColor foldMarkerColor = textArea.Document.HighlightingStrategy.GetColorFor("FoldMarker");
            HighlightColor foldLineColor = textArea.Document.HighlightingStrategy.GetColorFor("FoldLine");
            HighlightColor selectedFoldLine = textArea.Document.HighlightingStrategy.GetColorFor("SelectedFoldLine");

            Rectangle intRect = new Rectangle((int)rectangle.X, (int)rectangle.Y, (int)rectangle.Width, (int)rectangle.Height);
            g.FillRectangle(BrushRegistry.GetBrush(foldMarkerColor.BackgroundColor), intRect);
            g.DrawRectangle(BrushRegistry.GetPen(isSelected ? selectedFoldLine.Color : foldLineColor.Color), intRect);

            int space = (int)Math.Round(((double)rectangle.Height) / 8d) + 1;
            int mid = intRect.Height / 2 + intRect.Height % 2;

            // kreslení "-"
            g.DrawLine(BrushRegistry.GetPen(foldMarkerColor.Color),
                       rectangle.X + space,
                       rectangle.Y + mid,
                       rectangle.X + rectangle.Width - space,
                       rectangle.Y + mid);

            // kreslení "+"
            if (!isOpened)
                g.DrawLine(BrushRegistry.GetPen(foldMarkerColor.Color),
                           rectangle.X + mid,
                           rectangle.Y + space,
                           rectangle.X + mid,
                           rectangle.Y + rectangle.Height - space);
        }
		#endregion
	}
}
