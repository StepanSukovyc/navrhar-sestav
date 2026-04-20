//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DrawingPanel.cs                        </Name>
//    <Description> panel pro editací vektorové grafiky                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-23                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.WinForms.Controls;
using Gordic.General;

namespace Gordic.GFE.WinClient.Gui.PropertyPanels
{
    /// <summary>
    /// panel pro editací vektorové grafiky
    /// </summary>
    class DrawingPanel : AbstractPropertyPanel
    {
        #region AbstractPropertyPanel
        /// <summary>
        /// Získání nové hodnoty - PropertyGrid
        /// </summary>
        /// <returns>Nová hodnota</returns>
        public override object PropertyValue { get => null; }
        /// <summary>
        /// Reakce na akceptace změn
        /// </summary>
        /// <returns>TRUE- změna provedená</returns>
        protected override bool Accept()
        {
            if (Service == null)
                return true;

            int gp = -1;
            if (gapChanged)
                if (!int.TryParse(tbGap.Text, out gp))
                    gp = 0;

            if (fillChanged || shapeChanged || edgeChanged || gapChanged || angleChanged)
            {
                if (!UndoRedoService.IsTransactionStarted)
                    UndoRedoService.StartTransaction(GResources.GetResourceText(29450471)); //RC 29450471 : změna vektoru

                foreach (object item in Service.SelectedComponents)
                {
                    IDrawing draw = item as IDrawing;
                    // zafixujeme Obsah vybraného objektu
                    if (draw != null)
                    {
                        // pokud výplň byla pozměněná, pak
                        if (cbFill.SelectedIndex != -1 && fillChanged)
                        {
                            draw.Fill = new URComplexColor();
                            draw.Fill.Initialize((cbFill.SelectedItem as ColorComboBox.ColorDescriptor).Color);
                        }
                        // pokud tvar byl pozměněn, pak
                        if (shapeChanged)
                            draw.Shape = tbShape.Text;

                        // pokud tvar byl pozměněn, pak
                        if (gapChanged)
                            draw.Gap = gp;

                        if (angleChanged)
                            draw.Angle = int.Parse(Convert.ToString(nudAngle.Value));

                        // v případě, že Barva písma je daná, pak ji předáme
                        if (cbEdge.SelectedIndex != -1 && edgeChanged)
                        {
                            draw.Edge = new URComplexColor();
                            draw.Edge.Initialize((cbEdge.SelectedItem as ColorComboBox.ColorDescriptor).Color);
                        }
                    }
                }
            }
            return base.Accept();
        }

        /// <summary>
        /// Reakce na tlačítko Výchozí hodnoty
        /// </summary>
        /// <returns>True - Nastavení provedené</returns>
        protected override void SetDefault()
        {
            try
            {
                if (Service != null)
                {
                    List<ColorComboBox.ColorDescriptor> colors = new List<ColorComboBox.ColorDescriptor>();

                    foreach (var item in ColorService.ColorNameCzEn)
                        colors.Add(new ColorComboBox.ColorDescriptor(item));
                    cbEdge.Items.Clear();
                    cbEdge.Items.AddRange(colors.ToArray());
                    cbEdge.Enabled = true;
                    cbEdge.Invalidate();

                    cbFill.Items.Clear();
                    cbFill.Items.AddRange(colors.ToArray());
                    cbFill.Enabled = true;
                    cbFill.Invalidate();

                    bool first = true;
                    shapeText = null;
                    gapText = null;
                    angleText = null;

                    edgeIndex = -1;
                    fillIndex = -1;
                    // projdeme všechny vybrané položky a zjistíme jejích hodnoty
                    foreach (object item in Service.SelectedComponents)
                    {
                        IDrawing draw = item as IDrawing;
                        // zafixujeme Obsah vybraného objektu
                        if (draw != null)
                        {
                            // pokud je to první objekt, pak jeho vlastnosti nakopírujeme
                            if (first)
                            {
                                fillIndex = GetIndex(cbFill, new GFEColor(draw.Fill.Color));
                                shapeText = draw.Shape;
                                gapText = Convert.ToString(draw.Gap);
                                angleText = Convert.ToString(draw.Angle);
                                edgeIndex = GetIndex(cbEdge, new GFEColor(draw.Edge.Color));
                                first = false;
                            }
                            else
                            {
                                //edgeIndex==-1 znamená, že obsahy nejsou stejné
                                if (fillIndex != -1
                                    && fillIndex != GetIndex(cbFill, new GFEColor(draw.Fill.Color)))
                                    fillIndex = -1;

                                if (shapeText != null && !shapeText.Equals(draw.Shape, StringComparison.InvariantCultureIgnoreCase))
                                    shapeText = null;

                                if (gapText != null && !gapText.Equals(draw.Gap.ToString(), StringComparison.InvariantCultureIgnoreCase))
                                    gapText = null;

                                if (angleText != null && !angleText.Equals(draw.Angle.ToString(), StringComparison.InvariantCultureIgnoreCase))
                                    gapText = null;

                                //edgeIndex==-1 znamená, že obsahy nejsou stejné
                                if (edgeIndex != -1
                                    && edgeIndex != GetIndex(cbEdge, new GFEColor(draw.Edge.Color)))
                                    edgeIndex = -1;
                            }
                        }
                    }

                    cbFill.SelectedIndex = fillIndex;
                    tbShape.Text = shapeText;
                    tbGap.Text = gapText;
                    cbEdge.SelectedIndex = edgeIndex;
                    nudAngle.Value = angleText != null ? decimal.Parse(angleText) : 0;
                }
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " DrawingPanel:" + ex.Message); }
            fillChanged = false;
            shapeChanged = false;
            edgeChanged = false;
            gapChanged = false;
        }

        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            try
            {
                SetupLocalizedXFRM(AssemblyName + ".Resources.forms.property.DrawingPanel.xfrm");
                cbFill = (ColorComboBox)ControlDictionary["cbFill"];
                cbFill.TextChanged += delegate { fillChanged = true; };
                cbFill.SelectedIndexChanged += delegate { fillChanged = true; };
                cbFill.DrawItem += new System.Windows.Forms.DrawItemEventHandler(ComboBoxDrawItem);

                tbShape = (GLabeledTextBox)ControlDictionary["tbShape"];
                tbShape.TextChanged += delegate { shapeChanged = true; };

                tbGap = (GLabeledTextBox)ControlDictionary["tbGap"];
                tbGap.TextChanged += delegate { gapChanged = true; };

                nudAngle = (NumericUpDown)ControlDictionary["nudAngle"];
                nudAngle.ValueChanged += delegate { angleChanged = true; };
                nudAngle.Maximum = new decimal(new int[] { 360, 0, 0, 0 });

                cbEdge = ((ColorComboBox)ControlDictionary["cbEdge"]);
                cbEdge.TextChanged += delegate { edgeChanged = true; };
                cbEdge.SelectedIndexChanged += delegate { edgeChanged = true; };
                cbEdge.DrawItem += new System.Windows.Forms.DrawItemEventHandler(ComboBoxDrawItem);

                ThreadService.SafeThreadAsyncCall(SetDefault);
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " DrawingPanel.xfrm:" + ex.Message); }
        }

        /// <summary>
        /// Podmínky viditelnosti daného panelu
        /// </summary>
        /// <returns>TRUE - podmínka je splněná</returns>
        public override bool VisibleCondition()
        {
            if (view == null)
                return base.VisibleCondition();

            return Service != null && Service.SelectedComponents.Exists(item => item is IDrawing);
        }

        #endregion

        bool fillChanged, shapeChanged, edgeChanged, gapChanged, angleChanged;
        string shapeText, gapText, angleText;
        GLabeledTextBox tbShape, tbGap;
        ColorComboBox cbEdge, cbFill;
        NumericUpDown nudAngle;
        int edgeIndex, fillIndex;
        /// <exclude/>
        internal void ComboBoxDrawItem(object sender, System.Windows.Forms.DrawItemEventArgs e)
        {
            ComboBox comboBox = (ComboBox)sender;
            e.DrawBackground();

            Rectangle drawingRect = new Rectangle(e.Bounds.X,
                                                  e.Bounds.Y,
                                                  e.Bounds.Width,
                                                  e.Bounds.Height);

            Brush drawItemBrush = SystemBrushes.WindowText;
            if ((e.State & DrawItemState.Selected) == DrawItemState.Selected)
                drawItemBrush = SystemBrushes.HighlightText;

            if (comboBox.Enabled == false)
                e.Graphics.DrawString(GResources.GetResourceText(29450275) + "...", //RC 29450275 : Načtení
                                      comboBox.Font,
                                      drawItemBrush,
                                      drawingRect,
                                      new StringFormat(StringFormatFlags.NoWrap));
            else if (e.Index >= 0)
            {
                if (sender is ColorComboBox)
                    (sender as ColorComboBox).ComboBoxDrawItem(e);
            }

            e.DrawFocusRectangle();
        }
        int GetIndex(ColorComboBox list, GFEColor color)
        {
            for (int i = 0; i < list.Items.Count; i++)
                if ((list.Items[i] is ColorComboBox.ColorDescriptor)
                    && (list.Items[i] as ColorComboBox.ColorDescriptor).Color.Equals(color.Color))
                    return i;
            return -1;
        }
    }
}
