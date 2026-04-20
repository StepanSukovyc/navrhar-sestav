//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ToolBarTextBox.cs                      </Name>
//    <Description> Textová položka nástrojové lišty                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-04                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.General;
using Gordic.GFE.Parsers.Gui;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Core.WinForm
{
    /// <summary>
    /// Textová položka nástrojové lišty
    /// </summary>
    [ComVisible(false)]
    public class ToolBarTextBox : ToolStripTextBox, IStatusUpdate
    {
        readonly object caller;
        Entity entity;
        string description = string.Empty;
        ITextBoxCommand menuCommand = null;
        bool internVisible = true;
        /// <summary>
        /// Interní viditelnost objektu
        /// </summary>
        public bool InternVisible { get { return internVisible; } }

        /// <summary>
        /// Přetížení
        /// </summary>
        /// <param name="keyData"></param>
        /// <returns></returns>
        protected override bool IsInputKey(System.Windows.Forms.Keys keyData)
        {
            return base.IsInputKey(keyData);
        }

        /// <summary>
        /// Aktualizace textové hodnoty
        /// </summary>
        public event EventHandlerDynamic TextValueUpdate;

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
        /// Příkaz položkyy
        /// </summary>
        public ITextBoxCommand MenuCommand { get { return menuCommand; } }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="entity">Položka konfiguračního souuboru</param>
        /// <param name="caller">Volající objekt</param>
        public ToolBarTextBox(Entity entity, object caller)
        {
            this.caller = caller;
            this.entity = entity;
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public void Initialize()
        {
            RightToLeft = RightToLeft.Inherit;
            TextBox.KeyDown += new KeyEventHandler(TextBox_KeyDown);

            menuCommand = (ITextBoxCommand)entity.AddIn.CreateObject(entity.Properties["class"]);
            menuCommand.Owner = this;
            if (menuCommand == null)
                throw new NullReferenceException(GResources.GetResourceText(29450275)); //RC 29450275 : Nelze vytvořit textovou položku nástrojové lišty!

            UpdateText();
            UpdateStatus();
        }

        void TextBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                MenuCommand.Run();
                // argument == force
                TextValueUpdate?.Invoke(this, new EventArgsDynamic(true));
            }
        }

        bool GetEnabled()
        {
            if (entity == null)
                return base.Enabled;

            ConditionFailedAction failedAction = entity.GetFailedAction(caller);

            bool isEnabled = failedAction != ConditionFailedAction.Disable;

            if (menuCommand != null)
                isEnabled &= menuCommand.IsEnabled;
            
            TextBox.Enabled = isEnabled;
            return isEnabled;
        }

        /// <summary>
        /// Aktualizace statusu
        /// </summary>
        public virtual void UpdateStatus()
        {
            bool isVisible = base.Visible;
            bool isEnabled = Enabled;
            if (entity != null)
            {
                ConditionFailedAction failedAction = entity.GetFailedAction(caller);
                isVisible &= failedAction != ConditionFailedAction.Exclude;
                isEnabled = failedAction != ConditionFailedAction.Disable;
                if (menuCommand != null)
                    isEnabled &= menuCommand.IsEnabled;
            }
            if (base.Visible != isVisible)
                Visible = isVisible;

            if (Enabled != isEnabled)
                Enabled = TextBox.Enabled = isEnabled;
            TextValueUpdate?.Invoke(this, new EventArgsDynamic(false));

            internVisible = Visible;
        }

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
