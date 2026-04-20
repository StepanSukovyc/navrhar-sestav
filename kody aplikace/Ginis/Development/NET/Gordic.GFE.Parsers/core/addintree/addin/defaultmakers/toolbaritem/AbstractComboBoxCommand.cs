//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AbstractComboBoxCommand.cs               </Name>
//    <Description> Abstractní třída rolovacího seznamu na liště                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-10                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core.WinForm;
using System;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Abstractní třída rolovacího seznamu na liště
    /// </summary>
    public abstract class AbstractComboBoxCommand : AbstractCommand, IComboBoxCommand
    {
        bool isEnabled = true;
        /// <summary>
        /// Dostupnost příkazu
        /// </summary>
        public virtual bool IsEnabled
        {
            get { return isEnabled; }
            set { isEnabled = value; }
        }
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run() { }
    }

    /// <summary>
    /// argument metody opuštění fokusu
    /// </summary>
    public class LostFocusEventArgs
    {
        /// <summary>
        /// opouští fokus
        /// </summary>
        public bool Focused { get; set; }
        /// <summary>
        /// indikuje nutnost ukončení transakce
        /// </summary>
        public bool Commit { get; set; }

        /// <exclude/>
        public LostFocusEventArgs(bool foc, bool commit)
        {
            Focused = foc;
            Commit = commit;
        }
    }

    /// <summary>
    /// příkazy písma nástrojové líšty
    /// </summary>
    public abstract class ContentAbstractComboBoxCommand : AbstractComboBoxCommand
    {
        /// <summary>
        /// ovladač na panelu nástroju
        /// </summary>
        protected ComboBox comboBox;
        /// <summary>
        /// ovladač na panelu nástroju
        /// </summary>
        protected bool indexChanged = false;
        /// <exclude/>
        abstract protected void LostFocus(LostFocusEventArgs arg);
        /// <summary>
        /// kód aktualizace textové hodnoty objektu
        /// </summary>
        protected virtual void TextValueUpdate() {  }
        /// <summary>
        /// REakce na změnu vlastníka
        /// </summary>
        /// <param name="e"></param>
        protected override void OnOwnerChanged(EventArgs e)
        {
            base.OnOwnerChanged(e);
            ToolBarComboBox box1 = (ToolBarComboBox)this.Owner;
            comboBox = box1.ComboBox;
            comboBox.DropDownStyle = ComboBoxStyle.DropDown;
            if (box1.Items != null)
                comboBox.Items.AddRange(box1.Items.ToArray());

            if (comboBox.Items.Count != 0)
                comboBox.SelectedIndex = 1;

            box1.TextValueUpdate += delegate { ThreadService.SafeThreadAsyncCall(TextValueUpdate); };

            box1.LostFocus += delegate { LostFocus(new LostFocusEventArgs(false, true)); };
            box1.SelectedIndexChanged += delegate { LostFocus(new LostFocusEventArgs(true, true)); };
            box1.TextChanged += delegate { LostFocus(new LostFocusEventArgs(true, false)); };

            comboBox.AutoCompleteMode = AutoCompleteMode.SuggestAppend;
            comboBox.AutoCompleteSource = AutoCompleteSource.ListItems;
            LostFocus(new LostFocusEventArgs(false, false));
            indexChanged = false;
        }
    }

}
