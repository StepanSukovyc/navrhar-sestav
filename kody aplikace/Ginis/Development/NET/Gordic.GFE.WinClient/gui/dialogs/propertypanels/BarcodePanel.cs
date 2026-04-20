//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.BarcodePanel.cs                        </Name>
//    <Description> panel pro práci s čárovými kódy                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-16                                                  </Created>
//  </FileHeader>

using System;
using System.Linq;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.WinForms.Controls;
using Gordic.General;
using Gordic.GFE.Parsers.Core;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.Gui.PropertyPanels
{
    /// <summary>
    /// panel pro práci s čárovými kódy
    /// </summary>
    class BarcodePanel : AbstractPropertyPanel
    {
        #region AbstractPropertyPanel
        /// <summary>
        /// Podmínky viditelnosti daného panelu
        /// </summary>
        /// <returns>TRUE - podmínka je splněná</returns>
        public override bool VisibleCondition() =>
            view == null
            ? base.VisibleCondition()
            : Service != null && Service.SelectedComponents.Exists(item => item is IBarcode);

        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            try
            {
                SetupLocalizedXFRM(AssemblyName + ".Resources.forms.property.BarcodePanel.xfrm");
                tbText = (GLabeledTextBox)ControlDictionary["tbText"];
                tbText.TextChanged += delegate { _text = true; };

                cbType = (GLabeledComboBox)ControlDictionary["cbType"];
                cbType.SelectedIndexChanged += delegate { _type = true; };
                cbType.TextChanged += delegate { _type = true; };
                foreach (BarcodeTypeEnum item in CommonService.GetStandardValuesCollectionBarcodeTypes())
                    cbType.Items.Add(CommonService.ParseStringBarcode(item));

                nudO1 = (NumericUpDown)ControlDictionary["nudO1"];
                nudO1.ValueChanged += delegate { _o1 = true; };
                nudO1.Maximum = new decimal(new int[] { 360, 0, 0, 0 });
                nudO1.Minimum = new decimal(new int[] { 0, 0, 0, 0 });

                nudO2 = (NumericUpDown)ControlDictionary["nudO2"];
                nudO2.ValueChanged += delegate { _o2 = true; };
                nudO2.Maximum = new decimal(new int[] { 360, 0, 0, 0 });
                nudO2.Minimum = new decimal(new int[] { 0, 0, 0, 0 });

                nudO3 = (NumericUpDown)ControlDictionary["nudO3"];
                nudO3.ValueChanged += delegate { _o3 = true; };
                nudO3.Maximum = new decimal(new int[] { 360, 0, 0, 0 });
                nudO3.Minimum = new decimal(new int[] { 0, 0, 0, 0 });

                ThreadService.SafeThreadAsyncCall(SetDefault);
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " BarcodePanel.xfrm:" + ex.Message); }
        }

        /// <summary>
        /// Získání nové hodnoty - PropertyGrid
        /// </summary>
        /// <returns>Nová hodnota</returns>
        public override object PropertyValue
        {
            /*z panelu vlastnosti nelze editovat hodnotu*/
            get => null;
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
                    string text = string.Empty;
                    string type = string.Empty;
                    string o1 = string.Empty;
                    string o2 = string.Empty;
                    string o3 = string.Empty;

                    bool isEditable = false;

                    bool first = true;
                    // projdeme všechny vybrané položky a zjistíme jejích hodnoty
                    foreach (object item in Service.SelectedComponents)
                    {
                        if (item is IBarcode)
                        {
                            // pokud je to první objekt, pak jeho vlastnosti nakopírujeme
                            if (first)
                            {
                                first = false;
                                text = (item as IBarcode).Text;
                                type = CommonService.ParseStringBarcode((item as IBarcode).Type);
                                o1 = (item as IBarcode).O1.ToString();
                                o2 = (item as IBarcode).O2.ToString();
                                o3 = (item as IBarcode).O3.ToString();
                            }
                            else
                            {
                                // text == null znamená, že obsahy nejsou stejné
                                if (text != null
                                    && !text.Equals((item as IBarcode).Text, StringComparison.InvariantCultureIgnoreCase))
                                    text = null;

                                // type == null znamená, že obsahy nejsou stejné
                                if (!type.Equals(CommonService.ParseStringBarcode((item as IBarcode).Type)))
                                    type = null;

                                // o1 == null znamená, že obsahy nejsou stejné
                                if (!o1.Equals((item as IBarcode).O1.ToString()))
                                    o1 = null;

                                // o2 == null znamená, že obsahy nejsou stejné
                                if (!o2.Equals((item as IBarcode).O2.ToString()))
                                    o2 = null;

                                // o3 == null znamená, že obsahy nejsou stejné
                                if (!o3.Equals((item as IBarcode).O3.ToString()))
                                    o3 = null;
                            }
                            isEditable = isEditable || (item as IBarcode).Editable;
                        }
                    }
                    tbText.Enabled = isEditable;
                    tbText.Text = text;
                    cbType.Text = type;
                    nudO1.Value = o1 != null ? decimal.Parse(o1) : 0;
                    nudO2.Value = o2 != null ? decimal.Parse(o2) : 0;
                    nudO3.Value = o3 != null ? decimal.Parse(o3) : 0;
                }
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " BarcodePanel.xfrm:" + ex.Message); }
            _text = false;
            _type = false;
            _o1 = false;
            _o2 = false;
            _o3 = false;
        }
        /// <summary>
        /// Reakce na akceptace změn
        /// </summary>
        /// <returns>TRUE- změna provedená</returns>
        protected override bool Accept()
        {
            if (Service == null)
                return true;

            if (_text || _type || _o1 || _o2 || _o3)
            {
                if (!UndoRedoService.IsTransactionStarted)
                    UndoRedoService.StartTransaction(GResources.GetResourceText(29450469)); //RC 29450469 : změna čárového kódu

                foreach (object item in Service.SelectedComponents)
                    if (item is IBarcode)
                    {
                        //pokud 'Text' byl pozměněn, pak ho předáme
                        if (_text)
                            if ((item as IBarcode).Editable)
                                (item as IBarcode).Text = tbText.Text;

                        //pokud 'Typ' byl pozměněn, pak ho předáme
                        if (_type)
                            (item as IBarcode).Type = CommonService.ParseBarcodeString(cbType.Text);

                        //pokud 'O1' bylo pozměněno, pak ho předáme
                        if (_o1)
                            (item as IBarcode).O1 = int.Parse(Convert.ToString(nudO1.Value));

                        //pokud 'O2' bylo pozměněno, pak ho předáme
                        if (_o2)
                            (item as IBarcode).O2 = int.Parse(Convert.ToString(nudO2.Value));
                        //pokud 'O3' bylo pozměněno, pak ho předáme
                        if (_o3)
                            (item as IBarcode).O3 = int.Parse(Convert.ToString(nudO3.Value));
                    }
            }

            return base.Accept();
        }


        #endregion

        bool _text, _type, _o1, _o2, _o3;
        GLabeledTextBox tbText;
        GLabeledComboBox cbType;
        NumericUpDown nudO1, nudO2, nudO3;
    }
}
