//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ToolBarComboBox.cs                     </Name>
//    <Description> Položka nástrojové lišty roovací seznam                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-04                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Windows.Forms;
using System.Collections;
using Gordic.GFE.Parsers.Gui;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Core.WinForm
{
    /// <summary>
    /// Položká combobox nabídky
    /// </summary>
    public class ComboBoxItem
    {
        public string Value { get { return (string)dictionaryEntry.Value; } }
        public object Key { get { return dictionaryEntry.Key; } }
        /// <summary>
        /// vytvoření položky dle položky seznamu
        /// </summary>
        /// <param name="dictionaryentry"></param>
        public ComboBoxItem(DictionaryEntry dictionaryentry)
        {
            dictionaryEntry = dictionaryentry;
        }
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="formatItem"></param>
        public ComboBoxItem(KeyValuePair<string, string> formatItem)
        {
            dictionaryEntry = new DictionaryEntry(formatItem.Key, formatItem.Value);
        }
        DictionaryEntry dictionaryEntry;
        /// <exclude/>
        public override string ToString() { return Value; }
    }

    /// <summary>
    /// Položka nástrojové lišty roovací seznam
    /// </summary>
    [ComVisible(false)]
    public class ToolBarComboBox : ToolStripComboBox, IStatusUpdate
    {
        readonly object caller;
        Entity entity;
        string description = String.Empty;
        IComboBoxCommand menuCommand = null;
        bool internVisible = true;
        /// <summary>
        /// Interní viditelnost objektu
        /// </summary>
        public bool InternVisible { get { return internVisible; } }

        /// <summary>
        /// Aktualizace textové hodnoty
        /// </summary>
        public event EventHandler TextValueUpdate;

        /// <summary>
        /// Položky dropdown
        /// </summary>
        public new List<object> Items { get; set; }

        /// <summary>
        /// Volající objekt
        /// </summary>
        public object Caller { get { return caller; } }

        /// <summary>
        /// Popis položky
        /// </summary>
        public string Description
        {
            get { return description; }
            set { description = value; }
        }

        /// <summary>
        /// Akce položky
        /// </summary>
        public IComboBoxCommand MenuCommand { get { return menuCommand; } }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="entity">Objekt konfiguračního souboru</param>
        /// <param name="caller">Volající</param>
        /// 
        public ToolBarComboBox(Entity entity, object caller)
        {
            this.caller = caller;
            this.entity = entity;
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        void Initialize()
        {
            RightToLeft = RightToLeft.Inherit;
            UpdateText();
            UpdateStatus();
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="customitem">Položky seznamu</param>
        public void Initialize(object customitem)
        {
            Initialize();
            Items = new List<object>();

            // přidáme položky seznamu dle vlastního objektu
            if (customitem is CustomComponentItem componentItem)
                foreach (DictionaryEntry item in componentItem.Attributes)
                    Items.Add(new ComboBoxItem(item));

            // pokud předávaný objekt je seznámem, pak předpokládejme, že je to seznam pr zobrazení
            if (customitem is List<string> list)
                Items.AddRange(list);

            ComboBox.DropDownStyle = ComboBoxStyle.DropDownList;
            ComboBox.SelectionChangeCommitted += new EventHandler(SelectionChanged);
            ComboBox.KeyDown += new KeyEventHandler(ComboBoxKeyDown);

            menuCommand = (IComboBoxCommand)entity.AddIn.CreateObject(entity.Properties["class"]);
            if (entity.Properties.Contains("width"))
            {
                int width = ComboBox.Width;
                if (int.TryParse(entity.Properties["width"], out width))
                    this.ComboBox.Width = width;
            }

            if (menuCommand != null)
                menuCommand.Owner = this;
        }


        void ComboBoxKeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
                MenuCommand.Run();
        }

        void SelectionChanged(object sender, EventArgs e)
        {
            MenuCommand.Run();
        }

        /// <summary>
        /// Reakce na kliknutí
        /// </summary>
        /// <param name="e"></param>
        protected override void OnClick(System.EventArgs e)
        {
            base.OnClick(e);
        }

        /// <summary>
        /// Aktualizace statusu
        /// </summary>
        public virtual void UpdateStatus()
        {
            bool isEnabled = Enabled;
            if (entity != null)
            {
                ConditionFailedAction failedAction = entity.GetFailedAction(caller);
                bool isVisible = failedAction != ConditionFailedAction.Exclude;
                if (base.Visible != isVisible)
                    Visible = isVisible;

                if (Visible && menuCommand != null && isEnabled != menuCommand.IsEnabled)
                    isEnabled = menuCommand.IsEnabled;

                isEnabled = failedAction != ConditionFailedAction.Disable;
                if (Enabled != isEnabled)
                    Enabled = ComboBox.Enabled = isEnabled;

                TextValueUpdate?.Invoke(this, EventArgs.Empty);

                if (internVisible != Visible)
                    internVisible = Visible;
            }
        }
        //public virtual void UpdateStatus()
        //{
        //    bool isVisible = base.Visible;
        //    bool isEnabled = Enabled;
        //    if (entity != null)
        //    {
        //        ConditionFailedAction failedAction = entity.GetFailedAction(caller);
        //        isVisible &= failedAction != ConditionFailedAction.Exclude;
        //        isEnabled = failedAction != ConditionFailedAction.Disable;
        //        if (menuCommand != null)
        //            isEnabled &= menuCommand.IsEnabled;
        //    }
        //    if (base.Visible != isVisible)
        //        Visible = isVisible;

        //    if (Enabled != isEnabled)
        //        Enabled = ComboBox.Enabled = isEnabled;
        //    if (TextValueUpdate != null)
        //        TextValueUpdate();
        //}

        /// <summary>
        /// Aktualizace textu položky
        /// </summary>
        public virtual void UpdateText()
        {
            if (entity.Properties.Contains("label"))
                Text = StringParser.Parse(entity.Properties["label"]);

            if (entity.Properties.Contains("tooltip"))
                ToolTipText = StringParser.Parse(entity.Properties["tooltip"]);
        }
    }
}
