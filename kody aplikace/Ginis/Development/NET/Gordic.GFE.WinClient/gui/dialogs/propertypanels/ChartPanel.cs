//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.BarcodePanel.cs                        </Name>
//    <Description> panel pro práci s čárovými kódy                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-16                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.WinForms.Controls;
using Gordic.General;
using Gordic.GFE.Parsers.Core;
using System.Threading;
using System.Windows.Forms;
using System.Drawing;
using Gordic.GFE.Parsers.ExternalList;
using Gordic.GFE.WinClient.Editor;
using Gordic.TextEditor;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.WinClient.LinkedFiles;
using Gordic.GFE.WinClient.Services;
using System.IO;
using Gordic.GFE.WinClient.Base;
using Gordic.GFE.WinClient.VariablesView;

namespace Gordic.GFE.WinClient.Gui.PropertyPanels
{
    /// <summary>
    /// panel pro práci s čárovými kódy
    /// </summary>
    class ChartPanel : AbstractPropertyPanel
    {
        #region AbstractPropertyPanel
        /// <summary>
        /// Podmínky viditelnosti daného panelu
        /// </summary>
        /// <returns>TRUE - podmínka je splněná</returns>
        public override bool VisibleCondition()
        {
            if (view == null)
                return base.VisibleCondition();

            return Service != null && Service.SelectedComponents.Exists(item => item is IChart);
        }

        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            try
            {
                SetupLocalizedXFRM(AssemblyName + ".Resources.forms.property.ChartPanel.xfrm");
                ccbPalette = ((ColorComboBox)ControlDictionary["coloCBPalette"]);
                ccbDataSet = ((ColorComboBox)ControlDictionary["coloCBDataSetColor"]);
                DSCBColor = ((ColorComboBox)ControlDictionary["DSCBColor"]);
                lcbPColor = ((ColorComboBox)ControlDictionary["lcbPColor"]);

                tvLayers = ((CustomListBox)ControlDictionary["tvLayers"]);
                tvLayers.SelectedIndexChanged += tvLayers_SelectedIndexChanged;

                tvLayers.OnAddItem += tvLayers_OnAddItem;
                tvLayers.OnDeleteItem += tvLayers_OnDeleteItem;
                tvLayers.OnShiftDownItem += tvLayers_OnShiftDownItem;
                tvLayers.OnShiftUpItem += tvLayers_OnShiftUpItem;

                tvDataSets = ((CustomListBox)ControlDictionary["tvDataSets"]);
                tvDataSets.SelectedIndexChanged += tvDataSets_SelectedIndexChanged;

                tvDataSets.OnAddItem += tvDataSets_OnAddItem;
                tvDataSets.OnDeleteItem += tvDataSets_OnDeleteItem;
                tvDataSets.OnShiftDownItem += tvDataSets_OnShiftDownItem;
                tvDataSets.OnShiftUpItem += tvDataSets_OnShiftUpItem;

                tvData = ((CustomListBox)ControlDictionary["tvData"]);
                tvData.SelectedIndexChanged += tvData_SelectedIndexChanged;

                tvData.OnAddItem += tvData_OnAddItem;
                tvData.OnDeleteItem += tvData_OnDeleteItem;
                tvData.OnShiftDownItem += tvData_OnShiftDownItem;
                tvData.OnShiftUpItem += tvData_OnShiftUpItem;
                ((TextEditorControl)ControlDictionary["textEditorControl"]).TextChanged += delegate
                {
                    if (!isLoading)
                    {
                        changedData = true;
                        (tvData.SelectedItem as IXMLContent).InnerText = ((TextEditorControl)ControlDictionary["textEditorControl"]).Text;
                    }
                };

                ltbPName = ((GLabeledTextBox)ControlDictionary["ltbPNazev"]);
                lcbPShape = ((GLabeledComboBox)ControlDictionary["lcbPShape"]);
                lcbPType = ((GLabeledComboBox)ControlDictionary["lcbPType"]);
                lcbPLabel = ((GLabeledComboBox)ControlDictionary["lcbPLabel"]);
                lcbPLabelLayout = ((GLabeledComboBox)ControlDictionary["lcbPLabelLayout"]);
                lcbPLegend = ((GLabeledComboBox)ControlDictionary["lcbPLegend"]);

                ltbName = ((GLabeledTextBox)ControlDictionary["ltbNazev"]);
                lcbType = ((GLabeledComboBox)ControlDictionary["lcbType"]);
                ltbColorPalette = ((GLabeledTextBox)ControlDictionary["ltbColorPalette"]);
                ltbMajorStep = ((GLabeledTextBox)ControlDictionary["ltbMajorStep"]);
                ltbMinorStep = ((GLabeledTextBox)ControlDictionary["ltbMinorStep"]);
                ltbZeroAffinity = ((GLabeledTextBox)ControlDictionary["ltbZeroAffinity"]);
                ltbGroupSmall = ((GLabeledTextBox)ControlDictionary["ltbGroupSmall"]);
                ltbGroupLimit = ((GLabeledTextBox)ControlDictionary["ltbGroupLimit"]);
                cb3D = ((CheckBox)ControlDictionary["cb3D"]);

                btnAddColorToPalette = ((Button)ControlDictionary["btnAddColorToPalette"]);
                btnAddColorDataSet = ((Button)ControlDictionary["btnAddColorDataSet"]);
                btnAddColorToDataSet = ((Button)ControlDictionary["btnAddColorToDataSet"]);
                btnAddColorLayout = ((Button)ControlDictionary["btnAddColorLayout"]);

                ccbPalette.Enabled = false;
                ccbDataSet.Enabled = false;
                DSCBColor.Enabled = false;
                lcbPColor.Enabled = false;

                ccbPalette.TextChanged += delegate { if (!isLoading) changedColorPalette = true; btnAddColorToPalette.Enabled = ccbPalette.SelectedIndex != -1 || !string.IsNullOrEmpty(ccbPalette.Text); };
                ccbPalette.SelectedIndexChanged += delegate { if (!isLoading) changedColorPalette = true; btnAddColorToPalette.Enabled = ccbPalette.SelectedIndex != -1 || !string.IsNullOrEmpty(ccbPalette.Text); };
                ccbDataSet.TextChanged += delegate { if (!isLoading) changedColorDataSet = true; };
                ccbDataSet.SelectedIndexChanged += delegate { if (!isLoading) changedColorDataSet = true; };
                DSCBColor.TextChanged += delegate { if (!isLoading) changedColorDSCB = true; };
                DSCBColor.SelectedIndexChanged += delegate { if (!isLoading) changedColorDSCB = true; };

                ltbPName.TextChanged += delegate { _changedLayer = true; };
                lcbPShape.SelectedIndexChanged += delegate { _changedLayer = true; };
                lcbPType.SelectedIndexChanged += delegate { _changedLayer = true; };
                lcbPLabel.SelectedIndexChanged += delegate { _changedLayer = true; };
                lcbPLabelLayout.SelectedIndexChanged += delegate { _changedLayer = true; };
                lcbPLegend.SelectedIndexChanged += delegate { _changedLayer = true; };
                ((CheckBox)ControlDictionary["cbP3DLayer"]).CheckedChanged += delegate { _changedLayer = true; };
                lcbPColor.TextChanged += delegate { _changedLayer = true; };
                lcbPColor.SelectedIndexChanged += delegate { _changedLayer = true; };

                ltbName.TextChanged += delegate { if (!isLoading) changedName = true; };
                lcbType.SelectedIndexChanged += delegate { if (!isLoading) changedType = true; };
                ltbColorPalette.TextChanged += delegate { if (!isLoading) changedColorPalette = true; };
                ltbMajorStep.TextChanged += delegate { if (!isLoading) changedMajorStep = true; };
                ltbMinorStep.TextChanged += delegate { if (!isLoading) changedMinorStep = true; };
                ltbZeroAffinity.TextChanged += delegate { if (!isLoading) changedZeroAffinity = true; };
                ltbGroupSmall.TextChanged += delegate { if (!isLoading) changedGroupSmall = true; };
                ltbGroupLimit.TextChanged += delegate { if (!isLoading) changedGroupLimit = true; };
                cb3D.CheckedChanged += delegate { if (!isLoading) changed3D = true; };

                ccbPalette.DrawItem += new System.Windows.Forms.DrawItemEventHandler(ComboBoxDrawItem);
                ccbDataSet.DrawItem += new System.Windows.Forms.DrawItemEventHandler(ComboBoxDrawItem);
                DSCBColor.DrawItem += new System.Windows.Forms.DrawItemEventHandler(ComboBoxDrawItem);
                lcbPColor.DrawItem += new System.Windows.Forms.DrawItemEventHandler(ComboBoxDrawItem);

                btnAddColorToDataSet.Click += btnAddColor_Click;
                btnAddColorLayout.Click += btnAddColor_Click;
                btnAddColorDataSet.Click += btnAddColor_Click;
                btnAddColorToPalette.Click += btnAddColorToPalette_Click;

                ((Button)ControlDictionary["btnApplicateChanges"]).Click += btnApplicateChanges_Click;
                ((Button)ControlDictionary["btnApplicate"]).Click += btnApplicate_Click;

                ((GLabeledTextBox)ControlDictionary["ltbDSNazev"]).TextChanged += delegate { _changedDataSet = true; };
                ((NumericUpDown)ControlDictionary["nudDSSeries"]).ValueChanged += delegate { _changedDataSet = true; };
                ((ColorComboBox)ControlDictionary["DSCBColor"]).TextChanged += delegate { _changedDataSet = true; };
                ((ColorComboBox)ControlDictionary["DSCBColor"]).SelectedIndexChanged += delegate { _changedDataSet = true; };

                ((TextEditorControl)ControlDictionary["textEditorControl"]).ActiveTextAreaControl.TextArea.DragDrop += editorDragDrop;
                ((TextEditorControl)ControlDictionary["textEditorControl"]).ActiveTextAreaControl.TextArea.DragOver += editorDragOver;

                isLoading = true;
                startListsThread();
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " GraphPanel.xfrm:" + ex.Message); }
        }

        /// <summary>
        /// Získání nové hodnoty - PropertyGrid
        /// </summary>
        /// <returns>Nová hodnota</returns>
        public override object PropertyValue { get { /*z panelu vlastnosti nelze editovat hodnotu*/return null; } }
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
                    // projdeme všechny vybrané položky a zjistíme jejích hodnoty
                    foreach (object item in Service.SelectedComponents)
                    {
                        IChart chart = item as IChart;

                        if (chart != null)
                        {
                            // pokud je to první objekt, pak jeho vlastnosti nakopírujeme
                            ltbName.Text = chart.DataSetName;

                            foreach (var p in chart.ColorPalette)
                                ltbColorPalette.Text += p + ",";
                            ltbColorPalette.Text = ltbColorPalette.Text.TrimEnd(',');

                            ltbMajorStep.Text = chart.StepMajor.ToString();
                            ltbMinorStep.Text = chart.StepMinor.ToString();
                            ltbGroupLimit.Text = chart.GroupLimit.ToString();
                            ltbZeroAffinity.Text = chart.ZeroAffinity.ToString();
                            ltbGroupSmall.Text = chart.GroupSmall;

                            bool checked3D = false;
                            Boolean.TryParse(chart.Draw3D.ToString(), out checked3D);
                            cb3D.Checked = checked3D;

                            lcbType.Text = GlobalListLoader.GetDictionary("ChartType")[chart.ChartType.ToString()];
                            if (chart.DataSetColor != null)
                                ccbDataSet.SelectedIndex = getIndex(ccbDataSet, new GFEColor(chart.DataSetColor.Name));

                            foreach (var subItem in chart.Layers)
                                tvLayers.Items.Add(subItem);

                            foreach (var subItem in chart.Data)
                                tvData.Items.Add(subItem);

                            // pouze jeden CHART objekt
                            break;
                        }
                    }
                }
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " GraphPanel.xfrm:" + ex.Message); }

            changedColorPalette = false;
            changedColorDataSet = false;

            changedType = false;
            changedName = false;

            changedMajorStep = false;
            changedMinorStep = false;
            changedZeroAffinity = false;
            changedGroupLimit = false;
            changedGroupSmall = false;
            changed3D = false;
            changedData = false;
        }
        /// <summary>
        /// Reakce na akceptace změn
        /// </summary>
        /// <returns>TRUE- změna provedená</returns>
        protected override bool Accept()
        {
            if (Service == null)
                return true;

            if (changedColorPalette
                || changedColorDataSet
                || changedType
                || changedLayers
                || changedName
                || changedMajorStep
                || changedMinorStep
                || changedZeroAffinity
                || changedGroupLimit
                || changedGroupSmall
                || changed3D
                || changedColorDSCB
                || changedData)
            {
                if (!UndoRedoService.IsTransactionStarted)
                    UndoRedoService.StartTransaction(GResources.GetResourceText(29451503));

                foreach (object item in Service.SelectedComponents)
                    if (item is IChart)
                    {
                        if (changedColorPalette)
                        {
                            (item as IChart).ColorPalette.Clear();
                            string[] _colors = ltbColorPalette.Text.Split(',');
                            if (_colors.Length != 0)
                                foreach (string _color in _colors)
                                {
                                    IComplexColor color = new URComplexColor().Initialize(_color);
                                    if (!(item as IChart).ColorPalette.Contains(color))
                                        (item as IChart).ColorPalette.Add(color);
                                }
                        }

                        if (changedColorDataSet)
                            if (ccbDataSet.SelectedIndex != -1)
                                (item as IChart).DataSetColor = new URComplexColor().Initialize((ccbDataSet.SelectedItem as ColorComboBox.ColorDescriptor).Color);
                            // případ, kdy barvu do seznamu vložíme ručně
                            else if (!string.IsNullOrEmpty(ccbDataSet.Text))
                                (item as IChart).DataSetColor = new URComplexColor().Initialize(ccbDataSet.Text);

                        if (changedType)
                            (item as IChart).ChartType = (Report.Implementation.Charting.ChartType)lcbType.SelectedIndex;
                        if (changedName)
                            (item as IChart).DataSetName = ltbName.Text;

                        if (changedMajorStep && int.TryParse(ltbMajorStep.Text, out int value))
                            (item as IChart).StepMajor = value;

                        if (changedMinorStep && int.TryParse(ltbMinorStep.Text, out int _value))
                            (item as IChart).StepMinor = _value;

                        if (changedZeroAffinity && float.TryParse(ltbZeroAffinity.Text, out float __value))
                            (item as IChart).ZeroAffinity = __value;
                        if (changedGroupLimit)
                            (item as IChart).GroupLimit = new Parsers.Utils.SizeValue(ltbGroupLimit.Text);
                        if (changedGroupSmall)
                            (item as IChart).GroupSmall = ltbGroupSmall.Text;
                        if (changed3D)
                            (item as IChart).Draw3D = cb3D.Checked;

                        if (changedData)
                        {
                            (item as IChart).Data.Clear();
                            foreach (var subItem in tvData.Items)
                                (item as IChart).Data.Add(subItem as IXMLContent);
                        }

                        if (changedLayers)
                        {
                            (item as IChart).Layers.Clear();
                            foreach (var subItem in tvLayers.Items)
                                (item as IChart).Layers.Add(subItem as IChartLayer);
                        }
                    }
            }

            return base.Accept();
        }
        #endregion

        ColorComboBox ccbPalette, ccbDataSet, DSCBColor, lcbPColor;
        GLabeledComboBox lcbType, lcbPShape, lcbPType, lcbPLabel, lcbPLabelLayout, lcbPLegend;
        GLabeledTextBox ltbName, ltbColorPalette, ltbMajorStep, ltbMinorStep, ltbZeroAffinity, ltbGroupSmall, ltbGroupLimit, ltbPName;
        CheckBox cb3D;

        CustomListBox tvLayers, tvDataSets, tvData;

        Button btnAddColorToPalette, btnAddColorToDataSet, btnAddColorDataSet, btnAddColorLayout;

        bool changedLayer = false;
        /// <summary>
        /// změna vrstvy
        /// </summary>
        bool _changedLayer { get { return changedLayer; } set { if (!isLoadingLayer) { changedLayer = value; ((Button)ControlDictionary["btnApplicate"]).Enabled = changedLayer; } } }

        bool changedDataSet;
        /// <summary>
        /// změna množiny dat
        /// </summary>
        bool _changedDataSet { get { return changedDataSet; } set { if (!isLoadingDataSet) { changedDataSet = value; ((Button)ControlDictionary["btnApplicateChanges"]).Enabled = changedDataSet; } } }

        bool changedColorPalette
            , changedColorDataSet
            , changedColorDSCB
            , changedType
            , changedName
            , changedMajorStep
            , changedMinorStep
            , changedZeroAffinity
            , changedGroupLimit
            , changedGroupSmall
            , changed3D
            , isLoading
            , isLoadingDataSet
            , isLoadingLayer
            , changedLayers
            , changedData;

        static StringFormat drawStringFormat = new StringFormat(StringFormatFlags.NoWrap);

        Thread threadColors;

        /// <exclude/>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                ((TextEditorControl)ControlDictionary["textEditorControl"]).ActiveTextAreaControl.TextArea.DragDrop -= editorDragDrop;
                ((TextEditorControl)ControlDictionary["textEditorControl"]).ActiveTextAreaControl.TextArea.DragOver -= editorDragOver;
            }
            base.Dispose(disposing);
        }

        /// <summary>
        /// Získání indexu barvy
        /// </summary>
        /// <param name="list">Seznam barev</param>
        /// <param name="color">Barva</param>
        /// <returns></returns>
        int getIndex(ColorComboBox list, GFEColor color)
        {
            for (int i = 0; i < list.Items.Count; i++)
                if ((list.Items[i] is ColorComboBox.ColorDescriptor)
                    && (list.Items[i] as ColorComboBox.ColorDescriptor).Color.Equals(color.Color))
                    return i;

            // barva neexistuje - přidáme jí jako novou
            list.Items.Add(new ColorComboBox.ColorDescriptor(color));
            return list.Items.Count - 1;
        }

        void btnAddColor_Click(object sender, EventArgs e)
        {
            using (ColorDialog cd = new ColorDialog())
            {
                List<int> customColors = new List<int>();
                foreach (var item in ColorService.UserDefineColors)
                    customColors.Add(ColorTranslator.ToOle(ColorService.HexToColor(item)));

                cd.CustomColors = customColors.ToArray();

                if (cd.ShowDialog() == DialogResult.OK)
                {
                    string name = cd.Color.Name.Length == 8 && cd.Color.Name.StartsWith("ff") ? '#' + cd.Color.Name.Substring(2) : cd.Color.Name;
                    ColorService.AddColorItem(name, name, cd.Color);

                    ccbPalette.Enabled = false;
                    ccbDataSet.Enabled = false;
                    DSCBColor.Enabled = false;
                    lcbPColor.Enabled = false;

                    List<ColorComboBox.ColorDescriptor> colors = new List<ColorComboBox.ColorDescriptor>();
                    foreach (var item in ColorService.ColorNameCzEn)
                        colors.Add(new ColorComboBox.ColorDescriptor(item));

                    // aktualizace barev
                    ThreadService.SafeThreadAsyncCall(
                        delegate
                        {
                            ccbPalette.Items.Clear();
                            ccbPalette.Items.AddRange(colors.ToArray());
                            ccbPalette.Enabled = true;

                            ccbDataSet.Items.Clear();
                            ccbDataSet.Items.AddRange(colors.ToArray());
                            ccbDataSet.Enabled = true;

                            DSCBColor.Items.Clear();
                            DSCBColor.Items.AddRange(colors.ToArray());
                            DSCBColor.Enabled = true;

                            lcbPColor.Items.Clear();
                            lcbPColor.Items.AddRange(colors.ToArray());
                            lcbPColor.Enabled = true;

                            ccbPalette.Invalidate();
                            ccbDataSet.Invalidate();
                            DSCBColor.Invalidate();
                            lcbPColor.Invalidate();
                        });
                }
            }
        }
        void btnAddColorToPalette_Click(object sender, EventArgs e)
        {
            ltbColorPalette.Text += (!string.IsNullOrEmpty(ltbColorPalette.Text) ? "," : string.Empty) + (ccbPalette.SelectedIndex != -1 ? (ccbPalette.SelectedItem as ColorComboBox.ColorDescriptor).Color.Name : ccbPalette.Text);
            changedColorPalette = true;
        }
        void tvLayers_SelectedIndexChanged(object sender, EventArgs e)
        {
            ListBox lb = sender as ListBox;
            if (lb != null && lb.SelectedItem != null)
            {
                loadLayer(lb.SelectedItem as IChartLayer);
                loadDataSets(lb.SelectedItem as IChartLayer);
            }
        }
        void loadDataSets(IChartLayer chartLayer)
        {
            if (chartLayer == null)
                return;

            ((System.Windows.Forms.TabPage)ControlDictionary["tpDataSet"]).Enabled = true;
            ((System.Windows.Forms.GroupBox)ControlDictionary["gbDSProp"]).Enabled = false;

            tvDataSets.Items.Clear();
            foreach (var dataSet in chartLayer.DataSet)
                tvDataSets.Items.Add(dataSet);
        }
        void loadLayer(IChartLayer chartLayer)
        {
            if (chartLayer == null)
                return;

            isLoadingLayer = true;
            ((System.Windows.Forms.TabPage)ControlDictionary["tpProperties"]).Enabled = true;

            ((GLabeledTextBox)ControlDictionary["ltbPNazev"]).Text = chartLayer.DataSetName;
            ((GLabeledComboBox)ControlDictionary["lcbPShape"]).SelectedIndex = (int)chartLayer.Shape;

            if (chartLayer.Type == LayerLayersType.side_colors)
                ((GLabeledComboBox)ControlDictionary["lcbPType"]).SelectedIndex = ((GLabeledComboBox)ControlDictionary["lcbPType"]).Items.IndexOf("side-colors");
            else
                ((GLabeledComboBox)ControlDictionary["lcbPType"]).SelectedIndex = (int)chartLayer.Type;

            if (chartLayer.Label == ChartLabelType.label_percent)
                ((GLabeledComboBox)ControlDictionary["lcbPLabel"]).SelectedIndex = ((GLabeledComboBox)ControlDictionary["lcbPLabel"]).Items.IndexOf("label-percent");
            else if (chartLayer.Label == ChartLabelType.label_value)
                ((GLabeledComboBox)ControlDictionary["lcbPLabel"]).SelectedIndex = ((GLabeledComboBox)ControlDictionary["lcbPLabel"]).Items.IndexOf("label-value");
            else
                ((GLabeledComboBox)ControlDictionary["lcbPLabel"]).SelectedIndex = (int)chartLayer.Label;

            ((CheckBox)ControlDictionary["cbP3DLayer"]).Checked = chartLayer.Draw3D;
            ((GLabeledComboBox)ControlDictionary["lcbPLabelLayout"]).SelectedIndex = (int)chartLayer.LabelLayout;
            ((GLabeledComboBox)ControlDictionary["lcbPLegend"]).SelectedIndex = (int)chartLayer.Legend;
            if (chartLayer.DataSetColor != null)
                lcbPColor.SelectedIndex = getIndex(lcbPColor, new GFEColor(chartLayer.DataSetColor.Name));
            else
                lcbPColor.SelectedIndex = -1;
            isLoadingLayer = false;
        }
        void tvDataSets_SelectedIndexChanged(object sender, EventArgs e)
        {
            ListBox lb = sender as ListBox;
            if (lb != null && lb.SelectedItem != null)
                loadDataSet(lb.SelectedItem as IChartDataSet);
        }
        void loadDataSet(IChartDataSet chartDataSet)
        {
            if (chartDataSet == null)
                return;
            isLoadingDataSet = true;

            ((System.Windows.Forms.GroupBox)ControlDictionary["gbDSProp"]).Enabled = true;
            ((GLabeledTextBox)ControlDictionary["ltbDSNazev"]).Text = chartDataSet.Name;
            ((NumericUpDown)ControlDictionary["nudDSSeries"]).Value = chartDataSet.Serie;
            if (chartDataSet.Color != null)
                DSCBColor.SelectedIndex = getIndex(DSCBColor, new GFEColor(chartDataSet.Color.Name));
            else
                DSCBColor.SelectedIndex = -1;

            ((Button)ControlDictionary["btnApplicateChanges"]).Enabled = false;
            isLoadingDataSet = false;
        }
        void btnApplicateChanges_Click(object sender, EventArgs e)
        {
            changedLayers = true;
            IChartDataSet dataSet = tvDataSets.SelectedItem as IChartDataSet;
            dataSet.Name = ((GLabeledTextBox)ControlDictionary["ltbDSNazev"]).Text;
            dataSet.Serie = (int)((NumericUpDown)ControlDictionary["nudDSSeries"]).Value;
            if (DSCBColor.SelectedIndex != -1)
            {
                dataSet.Color = new URComplexColor();
                dataSet.Color.Initialize((DSCBColor.SelectedItem as ColorComboBox.ColorDescriptor).Color);
            }
            else if (!string.IsNullOrEmpty(DSCBColor.Text))
                dataSet.Color = new URComplexColor().Initialize(DSCBColor.Text);
            else
                dataSet.Color = null;

            tvDataSets.RefreshSelectedItem();
            _changedDataSet = false;
        }
        void btnApplicate_Click(object sender, EventArgs e)
        {
            changedLayers = true;
            IChartLayer layer = tvLayers.SelectedItem as IChartLayer;

            layer.DataSetName = ((GLabeledTextBox)ControlDictionary["ltbPNazev"]).Text;
            layer.Shape = (ShapeType)((GLabeledComboBox)ControlDictionary["lcbPShape"]).SelectedIndex;

            if (lcbPColor.SelectedIndex != -1)
            {
                layer.DataSetColor = new URComplexColor();
                layer.DataSetColor.Initialize((lcbPColor.SelectedItem as ColorComboBox.ColorDescriptor).Color);
            }
            else if (!string.IsNullOrEmpty(lcbPColor.Text))
                layer.DataSetColor = new URComplexColor().Initialize(lcbPColor.Text);
            else
                layer.DataSetColor = null;
            if (((GLabeledComboBox)ControlDictionary["lcbPType"]).SelectedItem.ToString().Equals("side-colors"))
                layer.Type = LayerLayersType.side_colors;
            else
                layer.Type = (LayerLayersType)((GLabeledComboBox)ControlDictionary["lcbPType"]).SelectedIndex;

            if (((GLabeledComboBox)ControlDictionary["lcbPLabel"]).SelectedItem.ToString().Equals("label-percent"))
                layer.Label = ChartLabelType.label_percent;
            else if (((GLabeledComboBox)ControlDictionary["lcbPLabel"]).SelectedItem.ToString().Equals("label-value"))
                layer.Label = ChartLabelType.label_value;
            else
                layer.Label = (ChartLabelType)((GLabeledComboBox)ControlDictionary["lcbPLabel"]).SelectedIndex;
            layer.Draw3D = ((CheckBox)ControlDictionary["cbP3DLayer"]).Checked;
            layer.LabelLayout = (ChartLabelLayoutType)((GLabeledComboBox)ControlDictionary["lcbPLabelLayout"]).SelectedIndex;
            layer.Legend = (ChartLegendType)((GLabeledComboBox)ControlDictionary["lcbPLegend"]).SelectedIndex;

            tvLayers.RefreshSelectedItem();

            _changedLayer = false;
        }
        void startListsThread()
        {
            threadColors = new Thread(refreshListsThread);
            threadColors.IsBackground = true;
            threadColors.Start();
        }
        void refreshListsThread()
        {
            isLoading = true;
            Thread.Sleep(0);

            DebugTimer.Start();
            List<ColorComboBox.ColorDescriptor> colors = new List<ColorComboBox.ColorDescriptor>();

            foreach (var item in ColorService.ColorNameCzEn)
                colors.Add(new ColorComboBox.ColorDescriptor(item));

            DebugTimer.Stop(GResources.GetResourceText(29450473)); //RC 29450473 : Získání konfigurovaných barev
            // aktualizace barev
            ThreadService.SafeThreadAsyncCall(
                delegate
                {
                    isLoading = true;
                    ccbPalette.Items.Clear();
                    ccbPalette.Items.AddRange(colors.ToArray());
                    ccbPalette.Enabled = true;

                    ccbDataSet.Items.Clear();
                    ccbDataSet.Items.AddRange(colors.ToArray());
                    ccbDataSet.Enabled = true;

                    DSCBColor.Items.Clear();
                    DSCBColor.Items.AddRange(colors.ToArray());
                    DSCBColor.Enabled = true;

                    lcbPColor.Items.Clear();
                    lcbPColor.Items.AddRange(colors.ToArray());
                    lcbPColor.Enabled = true;

                    lcbType.Items.Clear();
                    lcbType.Items.AddRange(GlobalListLoader.GetDictionary("ChartType").Values.ToArray());

                    lcbPShape.Items.Clear();
                    lcbPShape.Items.AddRange(GlobalListLoader.GetDictionary("LayerLayersShape").Values.ToArray());

                    lcbPType.Items.Clear();
                    lcbPType.Items.AddRange(GlobalListLoader.GetDictionary("LayerLayersType").Values.ToArray());

                    lcbPLabel.Items.Clear();
                    lcbPLabel.Items.AddRange(GlobalListLoader.GetDictionary("LayerLayersLabel").Values.ToArray());

                    lcbPLabelLayout.Items.Clear();
                    lcbPLabelLayout.Items.AddRange(GlobalListLoader.GetDictionary("LayerLayersLabelLayout").Values.ToArray());

                    lcbPLegend.Items.Clear();
                    lcbPLegend.Items.AddRange(GlobalListLoader.GetDictionary("LayerLayersLegend").Values.ToArray());

                    ccbPalette.Invalidate();
                    ccbDataSet.Invalidate();
                    DSCBColor.Invalidate();
                    lcbPColor.Invalidate();

                    SetDefault();
                    isLoading = false;
                });
        }
        void ComboBoxDrawItem(object sender, System.Windows.Forms.DrawItemEventArgs e)
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
                                      drawStringFormat);
            else if (e.Index >= 0)
                if (sender is ColorComboBox)
                    (sender as ColorComboBox).ComboBoxDrawItem(e);

            e.DrawFocusRectangle();
        }

        void tvDataSets_OnAddItem(object sender, EventArgs e)
        {
            _changedDataSet = true;
            (tvLayers.SelectedItem as IChartLayer).DataSet.Add(new ChartLayerDataSet());
            tvDataSets.Items.Add((tvLayers.SelectedItem as IChartLayer).DataSet.Last());
            tvDataSets.SelectedIndex = tvDataSets.Items.Count - 1;
        }
        void tvDataSets_OnDeleteItem(object sender, EventArgs e)
        {
            _changedDataSet = true;
            int index = tvDataSets.SelectedIndex;
            if (index != -1)
            {
                tvDataSets.Items.RemoveAt(index);
                (tvLayers.SelectedItem as IChartLayer).DataSet.RemoveAt(index);

                if (index < tvDataSets.Items.Count)
                    tvDataSets.SelectedIndex = index;
            }
        }
        void tvDataSets_OnShiftDownItem(object sender, EventArgs e)
        {
            _changedDataSet = true;
            int index = tvDataSets.SelectedIndex;
            IChartDataSet ds = tvDataSets.SelectedItem as IChartDataSet;
            tvDataSets.Items.RemoveAt(index);

            if (index == tvDataSets.Items.Count - 1)
                tvDataSets.Items.Add(ds);
            else
                tvDataSets.Items.Insert(index + 1, ds);

            tvDataSets.SelectedIndex = index + 1;
            (tvLayers.SelectedItem as IChartLayer).DataSet.Reverse(index, 1);
        }
        void tvDataSets_OnShiftUpItem(object sender, EventArgs e)
        {
            _changedDataSet = true;
            int index = tvDataSets.SelectedIndex;
            IChartDataSet ds = tvDataSets.SelectedItem as IChartDataSet;
            tvDataSets.Items.RemoveAt(index);
            if (tvDataSets.Items.Count == 0)
                tvDataSets.Items.Add(ds);
            else
                tvDataSets.Items.Insert(index - 1, ds);

            tvDataSets.SelectedIndex = index - 1;
            (tvLayers.SelectedItem as IChartLayer).DataSet.Reverse(index - 1, 1);
        }

        void tvLayers_OnAddItem(object sender, EventArgs e)
        {
            _changedLayer = true;
            tvLayers.Items.Add(new ChartLayer());
            tvLayers.SelectedIndex = tvLayers.Items.Count - 1;
        }
        void tvLayers_OnShiftUpItem(object sender, EventArgs e)
        {
            _changedLayer = true;
            int index = tvLayers.SelectedIndex;
            IChartLayer cl = tvLayers.SelectedItem as IChartLayer;
            tvLayers.Items.RemoveAt(index);
            if (tvLayers.Items.Count == 0)
                tvLayers.Items.Add(cl);
            else
                tvLayers.Items.Insert(index - 1, cl);

            tvLayers.SelectedIndex = index - 1;
        }
        void tvLayers_OnShiftDownItem(object sender, EventArgs e)
        {
            _changedLayer = true;
            int index = tvLayers.SelectedIndex;
            IChartLayer cl = tvLayers.SelectedItem as IChartLayer;
            tvLayers.Items.RemoveAt(index);

            if (index == tvLayers.Items.Count - 1)
                tvLayers.Items.Add(cl);
            else
                tvLayers.Items.Insert(index + 1, cl);

            tvLayers.SelectedIndex = index + 1;
        }
        void tvLayers_OnDeleteItem(object sender, EventArgs e)
        {
            _changedLayer = true;
            int index = tvLayers.SelectedIndex;
            if (index != -1)
            {
                tvLayers.Items.RemoveAt(index);
                if (index < tvLayers.Items.Count)
                    tvLayers.SelectedIndex = index;
            }
        }

        void tvData_SelectedIndexChanged(object sender, EventArgs e)
        {
            ListBox lb = sender as ListBox;
            if (lb != null && lb.SelectedItem != null)
            {
                ((TextEditorControl)ControlDictionary["textEditorControl"]).Enabled = true;
                ((TextEditorControl)ControlDictionary["textEditorControl"]).Text = (lb.SelectedItem as IXMLContent).InnerText;
                ((TextEditorControl)ControlDictionary["textEditorControl"]).Refresh();
            }
        }

        void tvData_OnShiftUpItem(object sender, EventArgs e)
        {
            changedData = true;
            int index = tvData.SelectedIndex;
            IXMLContent xmlc = tvData.SelectedItem as IXMLContent;
            tvData.Items.RemoveAt(index);
            if (tvData.Items.Count == 0)
                tvData.Items.Add(xmlc);
            else
                tvData.Items.Insert(index - 1, xmlc);

            tvData.SelectedIndex = index - 1;
        }
        void tvData_OnShiftDownItem(object sender, EventArgs e)
        {
            changedData = true;
            int index = tvData.SelectedIndex;
            IXMLContent xmlc = tvData.SelectedItem as IXMLContent;
            tvData.Items.RemoveAt(index);

            if (index == tvData.Items.Count - 1)
                tvData.Items.Add(xmlc);
            else
                tvData.Items.Insert(index + 1, xmlc);

            tvData.SelectedIndex = index + 1;
        }
        void tvData_OnDeleteItem(object sender, EventArgs e)
        {
            changedData = true;
            int index = tvData.SelectedIndex;
            if (index != -1)
            {
                tvData.Items.RemoveAt(index);
                if (index < tvData.Items.Count)
                    tvData.SelectedIndex = index;
            }
        }
        void tvData_OnAddItem(object sender, EventArgs e)
        {
            changedData = true;
            tvData.Items.Add(new ChartXmlData());
            tvData.SelectedIndex = tvData.Items.Count - 1;
        }

        void editorDragOver(object sender, DragEventArgs drgevent)
        {
            if (drgevent.Data.GetDataPresent(typeof(StructExtNode))
                || drgevent.Data.GetDataPresent(typeof(LFExtNode))
                || drgevent.Data.GetDataPresent(typeof(string))
                || drgevent.Data.GetDataPresent(typeof(VarExtNode)))
                drgevent.Effect = DragDropEffects.Copy;
        }
        void editorDragDrop(object sender, DragEventArgs drgevent)
        {
            dynamic node;
            if (drgevent.Data.GetDataPresent(typeof(StructExtNode)))
            {
                node = (StructExtNode)drgevent.Data.GetData(typeof(StructExtNode));
                ((TextEditorControl)ControlDictionary["textEditorControl"]).ActiveTextAreaControl.TextArea.InsertString(LocalCommonService.GetText(node.FullName));
            }
            else if (drgevent.Data.GetDataPresent(typeof(LFExtNode)))
            {
                node = (LFExtNode)drgevent.Data.GetData(typeof(LFExtNode));
                ((TextEditorControl)ControlDictionary["textEditorControl"]).ActiveTextAreaControl.TextArea.InsertString(LocalCommonService.GetText(node.FullName, Path.DirectorySeparatorChar));
            }
            else if (drgevent.Data.GetDataPresent(typeof(string)))
                ((TextEditorControl)ControlDictionary["textEditorControl"]).ActiveTextAreaControl.TextArea.InsertString(LocalCommonService.GetText((((string)drgevent.Data.GetData(typeof(string))).Split(';').Last())));
            else if (drgevent.Data.GetDataPresent(typeof(VarExtNode)))
                ((TextEditorControl)ControlDictionary["textEditorControl"]).ActiveTextAreaControl.TextArea.InsertString(LocalCommonService.GetText(((VarExtNode)drgevent.Data.GetData(typeof(VarExtNode)))));
        }

    }
}
