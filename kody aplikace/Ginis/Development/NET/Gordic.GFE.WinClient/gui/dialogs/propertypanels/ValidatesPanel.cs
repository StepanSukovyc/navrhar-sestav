//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ValidatesPanel.cs                      </Name>
//    <Description> Panel pro správu validačních pravidel                       </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2017-02-24                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Base;
using Gordic.WinForms.Controls;
using System.Windows.Forms;
using Gordic.General;
using Gordic.GFE.Parsers.Core;
using System.Collections.Generic;
using Gordic.GFE.WinClient.Editor;
using System.Linq;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers;

namespace Gordic.GFE.WinClient.Gui.PropertyPanels
{
    /// <summary>
    /// Panel pro správu validačních pravidel komponent
    /// </summary>
    class ValidatesPanel : AbstractPropertyPanel
    {
        #region Private Fields
        private bool loadingValue = false;
        private bool _changed = false;
        private bool _changedValidates = false;

        private AbstractContent content;
        private CustomListBox lbValidates;
        private GLabeledTextBox ltbMessage, ltbMinValue, ltbMaxValue, ltbAllowed, ltbDisallowed;
        private GLabeledComboBox cbType;

        // Placeholder konstanty
        private string messagePlaceholder;
        private string minValuePlaceholder;
        private string maxValuePlaceholder;
        #endregion

        #region AbstractPropertyPanel Implementation
        /// <summary>
        /// Získání nové hodnoty - PropertyGrid
        /// </summary>
        public override object PropertyValue => null;

        /// <summary>
        /// Reakce na tlačítko Výchozí hodnoty
        /// </summary>
        protected override void SetDefault()
        {
            try
            {
                if (Service == null) return;

                List<object> objects = Service.SelectedComponents.FindAll(itm => itm is AbstractContent);
                if (objects.Count > 1)
                    MessageService.ShowWarning(GResources.GetResourceText(29450698)); //RC 29450698 : Budou pozměněny proměnné pouze prvního regionu!

                content = (AbstractContent)objects.FirstOrDefault();
                if (content?.Validates != null)
                {
                    foreach (var item in content.Validates)
                        lbValidates.Items.Add(new Validate(item));
                }
            }
            catch (Exception ex)
            {
                LoggingService.Error($"{GResources.GetResourceText(29450428)} ValidatesPanel: {ex.Message}");
            }

            Changed = false;
        }

        /// <summary>
        /// Reakce na akceptace změn
        /// </summary>
        /// <returns>TRUE - změna provedená</returns>
        protected override bool Accept()
        {
            if (Service == null) return true;

            if (_changedValidates && content != null)
            {
                if (!UndoRedoService.IsTransactionStarted)
                    UndoRedoService.StartTransaction(GResources.GetResourceText(29450699)); //RC 29450699 : změna validací

                ((ICollection<IValidate>)content.Validates).Clear();

                foreach (var item in lbValidates.Items)
                    content.Validates.Add(new Validate((IValidate)item));
            }
            return base.Accept();
        }

        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            try
            {
                SetupLocalizedXFRM(AssemblyName + ".Resources.forms.property.ValidatesPanel.xfrm");

                InitializeControls();
                SetupEventHandlers();

                ThreadService.SafeThreadAsyncCall(SetDefault);
            }
            catch (Exception ex)
            {
                LoggingService.Error($"{GResources.GetResourceText(29450428)} ValidatesPanel.xfrm: {ex.Message}");
            }
        }

        /// <summary>
        /// Podmínky viditelnosti daného panelu
        /// </summary>
        /// <returns>TRUE - podmínka je splněná</returns>
        public override bool VisibleCondition() =>
            view == null
                ? base.VisibleCondition()
                : (Service != null && Service.SelectedComponents.Exists(item => item is AbstractContent));
        #endregion

        #region Properties
        /// <summary>
        /// Indikuje změny v panelu
        /// </summary>
        public bool Changed
        {
            get => _changed;
            set
            {
                _changed = value;
                ((Button)ControlDictionary["btnApplChanges"]).Enabled = _changed;
                if (value) _changedValidates = true;
            }
        }
        #endregion

        #region Private Methods
        /// <summary>
        /// Inicializace ovládacích prvků
        /// </summary>
        private void InitializeControls()
        {
            lbValidates = (CustomListBox)ControlDictionary["lbValidates"];

            cbType = (GLabeledComboBox)ControlDictionary["cbType"];
            foreach (ValidType el in Enum.GetValues(typeof(ValidType)))
                cbType.Items.Add(el);

            ltbMessage = (GLabeledTextBox)ControlDictionary["ltbMessage"];
            ltbMinValue = (GLabeledTextBox)ControlDictionary["ltbMinValue"];
            ltbMaxValue = (GLabeledTextBox)ControlDictionary["ltbMaxValue"];
            ltbAllowed = (GLabeledTextBox)ControlDictionary["ltbAllowed"];
            ltbDisallowed = (GLabeledTextBox)ControlDictionary["ltbDisallowed"];

            // Načtení placeholder textů
            messagePlaceholder = GResources.GetResourceText(29451507);
            minValuePlaceholder = GResources.GetResourceText(29451508);
            maxValuePlaceholder = GResources.GetResourceText(29451509);

            // Nastavení placeholder funkčnosti
            SetupPlaceholder(ltbMessage, messagePlaceholder);
            SetupPlaceholder(ltbMinValue, minValuePlaceholder);
            SetupPlaceholder(ltbMaxValue, maxValuePlaceholder);
        }

        /// <summary>
        /// Nastavení placeholder funkčnosti pro TextBox
        /// </summary>
        private void SetupPlaceholder(GLabeledTextBox labeledTextBox, string placeholderText)
        {
            if (labeledTextBox?.Text == null || string.IsNullOrEmpty(placeholderText))
                return;

            // Enter event - odstraní placeholder když uživatel začne psát
            EventHandler enterHandler = (s, e) =>
            {
                if (labeledTextBox.Text == placeholderText && labeledTextBox.ForeColor == System.Drawing.SystemColors.GrayText)
                {
                    labeledTextBox.Text = string.Empty;
                    labeledTextBox.ForeColor = System.Drawing.SystemColors.WindowText;
                }
            };

            // Leave event - vrátí placeholder pokud je textbox prázdný
            EventHandler leaveHandler = (s, e) =>
            {
                if (string.IsNullOrWhiteSpace(labeledTextBox.Text))
                {
                    labeledTextBox.Text = placeholderText;
                    labeledTextBox.ForeColor = System.Drawing.SystemColors.GrayText;
                }
            };

            labeledTextBox.Enter += enterHandler;
            labeledTextBox.Leave += leaveHandler;

            // Inicializace - pokud je prázdný, nastav placeholder
            if (string.IsNullOrWhiteSpace(labeledTextBox.Text))
            {
                labeledTextBox.Text = placeholderText;
                labeledTextBox.ForeColor = System.Drawing.SystemColors.GrayText;
            }
        }

        /// <summary>
        /// Získá skutečnou hodnotu z textboxu (bez placeholderu)
        /// </summary>
        private string GetRealValue(GLabeledTextBox labeledTextBox, string placeholder)
        {
            if (labeledTextBox.Text == placeholder && labeledTextBox.ForeColor == System.Drawing.SystemColors.GrayText)
                return string.Empty;
            return labeledTextBox.Text;
        }

        /// <summary>
        /// Nastaví hodnotu do textboxu s ohledem na placeholder
        /// </summary>
        private void SetValueWithPlaceholder(GLabeledTextBox labeledTextBox, string value, string placeholder)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                labeledTextBox.Text = placeholder;
                labeledTextBox.ForeColor = System.Drawing.SystemColors.GrayText;
            }
            else
            {
                labeledTextBox.Text = value;
                labeledTextBox.ForeColor = System.Drawing.SystemColors.WindowText;
            }
        }

        /// <summary>
        /// Nastavení event handlerů
        /// </summary>
        private void SetupEventHandlers()
        {
            cbType.SelectedIndexChanged += CbType_SelectedIndexChanged;

            // TextChanged handlery - použijeme lambda s kontrolou placeholderu
            ltbMessage.TextChanged += (s, e) =>
            {
                if (!loadingValue && ltbMessage.ForeColor != System.Drawing.SystemColors.GrayText)
                    OnTextBoxChanged(v => v.Message = ltbMessage.Text);
            };

            ltbMinValue.TextChanged += (s, e) =>
            {
                if (!loadingValue && ltbMinValue.ForeColor != System.Drawing.SystemColors.GrayText)
                    OnTextBoxChanged(v => v.MinValue = ltbMinValue.Text);
            };

            ltbMaxValue.TextChanged += (s, e) =>
            {
                if (!loadingValue && ltbMaxValue.ForeColor != System.Drawing.SystemColors.GrayText)
                    OnTextBoxChanged(v => v.MaxValue = ltbMaxValue.Text);
            };

            ltbAllowed.TextChanged += (s, e) =>
            {
                if (!loadingValue)
                    OnTextBoxChanged(v => v.Allowed = ltbAllowed.Text);
            };

            ltbDisallowed.TextChanged += (s, e) =>
            {
                if (!loadingValue)
                    OnTextBoxChanged(v => v.Disallowed = ltbDisallowed.Text);
            };

            // Tlačítko pro aplikaci změn
            ((Button)ControlDictionary["btnApplChanges"]).Click += BtnApplChanges_Click;

            // Nové tlačítko pro přidání validace
            if (ControlDictionary.ContainsKey("btnAddValidate"))
                ((Button)ControlDictionary["btnAddValidate"]).Click += BtnAddValidate_Click;

            // Nové tlačítko pro odebrání validace
            if (ControlDictionary.ContainsKey("btnDeleteValidate"))
                ((Button)ControlDictionary["btnDeleteValidate"]).Click += BtnDeleteValidate_Click;

            // Eventy CustomListBox
            lbValidates.SelectedIndexChanged += LbValidates_SelectedIndexChanged;
            lbValidates.OnAddItem += OnAddItem;
            lbValidates.OnDeleteItem += OnDeleteItem;
            lbValidates.OnShiftDownItem += OnShiftDownItem;
            lbValidates.OnShiftUpItem += OnShiftUpItem;
        }

        /// <summary>
        /// Reakce na změnu textboxu
        /// </summary>
        private void OnTextBoxChanged(Action<IValidate> updateAction)
        {
            if (loadingValue) return;
            if (lbValidates.SelectedItem is IValidate validate)
            {
                updateAction(validate);
                Changed = true;
            }
        }
        #endregion

        #region Event Handlers
        /// <summary>
        /// Přidání nové validace
        /// </summary>
        private void OnAddItem(object sender, EventArgs e)
        {
            Changed = true;
            var newValidate = new Validate
            {
                MessagePlaceholder = messagePlaceholder,
                MinValuePlaceholder = minValuePlaceholder,
                MaxValuePlaceholder = maxValuePlaceholder
            };
            lbValidates.Items.Add(newValidate);
            lbValidates.SelectedIndex = lbValidates.Items.Count - 1;
        }

        /// <summary>
        /// Odstranění vybrané validace
        /// </summary>
        private void OnDeleteItem(object sender, EventArgs e)
        {
            Changed = true;
            int index = lbValidates.SelectedIndex;
            if (index == -1) return;

            lbValidates.Items.RemoveAt(index);

            if (index < lbValidates.Items.Count)
                lbValidates.SelectedIndex = index;
            else if (lbValidates.Items.Count > 0)
                lbValidates.SelectedIndex = lbValidates.Items.Count - 1;
            else
            {
                // Žádné položky nezbývají - deaktivuj tlačítko odebrat
                if (ControlDictionary.ContainsKey("btnDeleteValidate"))
                    ((Button)ControlDictionary["btnDeleteValidate"]).Enabled = false;
            }
        }

        /// <summary>
        /// Posun validace dolů
        /// </summary>
        private void OnShiftDownItem(object sender, EventArgs e)
        {
            Changed = true;
            int index = lbValidates.SelectedIndex;
            if (index == -1 || index >= lbValidates.Items.Count - 1) return;

            IValidate v = (IValidate)lbValidates.SelectedItem;
            lbValidates.Items.RemoveAt(index);
            lbValidates.Items.Insert(index + 1, v);
            lbValidates.SelectedIndex = index + 1;
        }

        /// <summary>
        /// Posun validace nahoru
        /// </summary>
        private void OnShiftUpItem(object sender, EventArgs e)
        {
            Changed = true;
            int index = lbValidates.SelectedIndex;
            if (index <= 0) return;

            IValidate v = lbValidates.SelectedItem as IValidate;
            lbValidates.Items.RemoveAt(index);
            lbValidates.Items.Insert(index - 1, v);
            lbValidates.SelectedIndex = index - 1;
        }

        /// <summary>
        /// Změna vybrané validace v seznamu
        /// </summary>
        private void LbValidates_SelectedIndexChanged(object sender, EventArgs e)
        {
            loadingValue = true;

            if (lbValidates.SelectedItem is IValidate validate)
            {
                // Nastavení hodnot s ohledem na placeholder
                SetValueWithPlaceholder(ltbMessage, validate.Message, messagePlaceholder);
                SetValueWithPlaceholder(ltbMinValue, validate.MinValue, minValuePlaceholder);
                SetValueWithPlaceholder(ltbMaxValue, validate.MaxValue, maxValuePlaceholder);

                ltbAllowed.Text = validate.Allowed ?? string.Empty;
                ltbDisallowed.Text = validate.Disallowed ?? string.Empty;

                cbType.SelectedItem = validate.Type;
            }

            loadingValue = false;

            // Aktualizace stavu tlačítek
            ((GroupBox)ControlDictionary["gbProp"]).Enabled = lbValidates.SelectedItem != null;
            ((Button)ControlDictionary["btnApplChanges"]).Enabled = false;

            // Tlačítko "Odebrat" je aktivní pouze když je něco vybraného
            if (ControlDictionary.ContainsKey("btnDeleteValidate"))
                ((Button)ControlDictionary["btnDeleteValidate"]).Enabled = lbValidates.SelectedItem != null;
        }

        /// <summary>
        /// Změna typu validace
        /// </summary>
        private void CbType_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (loadingValue) return;
            if (Enum.TryParse(cbType.SelectedItem?.ToString(), out ValidType tp) &&
                lbValidates.SelectedItem is IValidate validate)
            {
                validate.Type = tp;
                Changed = true;
            }
        }

        /// <summary>
        /// Aplikace změn na vybranou validaci
        /// </summary>
        private void BtnApplChanges_Click(object sender, EventArgs e)
        {
            if (!(lbValidates.SelectedItem is IValidate v)) return;

            // Získání skutečných hodnot (bez placeholderů)
            v.Message = GetRealValue(ltbMessage, messagePlaceholder);
            v.MinValue = GetRealValue(ltbMinValue, minValuePlaceholder);
            v.MaxValue = GetRealValue(ltbMaxValue, maxValuePlaceholder);
            v.Allowed = ltbAllowed.Text;
            v.Disallowed = ltbDisallowed.Text;
            v.Type = (ValidType)cbType.SelectedItem;

            lbValidates.RefreshSelectedItem();
            Changed = false;
        }

        /// <summary>
        /// Přidání nové validace pomocí tlačítka
        /// </summary>
        private void BtnAddValidate_Click(object sender, EventArgs e)
        {
            OnAddItem(sender, e);
        }

        /// <summary>
        /// Odebrání vybrané validace pomocí tlačítka
        /// </summary>
        private void BtnDeleteValidate_Click(object sender, EventArgs e)
        {
            OnDeleteItem(sender, e);
        }
        #endregion
    }
}
