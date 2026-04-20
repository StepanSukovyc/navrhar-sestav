//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ToolBarSplitButton.cs                  </Name>
//    <Description> Tlačítko nástrojové lišty                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-04                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using System.Collections;
using System.Drawing;
using Gordic.GFE.Parsers.Gui;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Core.WinForm
{
    /// <summary>
    /// Tlačítko nástrojové lišty
    /// </summary>
    [ComVisible(false)]
    public class ToolBarSplitButton : ToolStripSplitButton, IStatusUpdate
    {
        readonly object caller;
        Entity entity;
        readonly ArrayList subItems;
        ICommand menuCommand = null;
        Image imgButtonEnabled = null, 
            imgButtonDisabled = null;
        bool buttonEnabled = true,
            dropDownEnabled = true;
        readonly bool internVisible = true;
        /// <summary>
        /// Interní viditelnost objektu
        /// </summary>
        public bool InternVisible { get { return internVisible; } }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="entity">Položka konfiguračního souboru</param>
        /// <param name="caller">Volající objekt</param>
        /// <param name="subItems">Podpoložky dané položky</param>
        public ToolBarSplitButton(Entity entity, object caller, ArrayList subItems)
        {
            this.caller = caller;
            this.entity = entity;
            this.subItems = subItems;
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public void Initialize()
        {
            RightToLeft = RightToLeft.Inherit;
            if (entity.Properties.Contains("label"))
                Text = StringParser.Parse(entity.Properties["label"]);

            if (imgButtonEnabled == null && entity.Properties.Contains("icon"))
                imgButtonEnabled = WinFormsResourceService.GetBitmap(StringParser.Parse(entity.Properties["icon"]));

            if (imgButtonDisabled == null && entity.Properties.Contains("disabledIcon"))
                imgButtonDisabled = WinFormsResourceService.GetBitmap(StringParser.Parse(entity.Properties["disabledIcon"]));

            if (imgButtonDisabled == null)
                imgButtonDisabled = imgButtonEnabled;

            menuCommand = entity.AddIn.CreateObject(entity.Properties["class"]) as ICommand;
            menuCommand.Owner = this;
            UpdateStatus();
            UpdateText();
        }

        void CreateDropDownItems()
        {
            ToolStripItem[] itemsToAdd = null;

            DropDownItems.Clear();
            foreach (object item in subItems)
                if (item is ToolStripItem)
                {
                    DropDownItems.Add((ToolStripItem)item);
                    if (item is IStatusUpdate)
                    {
                        ((IStatusUpdate)item).UpdateStatus();
                        ((IStatusUpdate)item).UpdateText();
                    }
                }
                else
                {
                    ISubmenuBuilder submenuBuilder = (ISubmenuBuilder)item;
                    itemsToAdd = submenuBuilder.BuildSubmenu(entity, caller);
                    if (itemsToAdd != null)
                        DropDownItems.AddRange(itemsToAdd);
                }
        }

        /// <exclude/>
        protected override void OnDropDownShow(EventArgs e)
        {
            if (!dropDownEnabled)
                return;
            
            if (entity != null && !this.DropDown.Visible)
                CreateDropDownItems();

            base.OnDropDownShow(e);
        }

        /// <summary>
        /// Reakce na stisknutí tlačítka
        /// </summary>
        /// <param name="e"></param>
        protected override void OnButtonClick(EventArgs e)
        {
            if (!buttonEnabled)
                return;
            
            base.OnButtonClick(e);
            menuCommand.Run();
        }

        /// <summary>
        /// Indikuje dostupnost položky
        /// </summary>
        public override bool Enabled
        {
            get
            {
                if (entity == null)
                    return base.Enabled;
                
                ConditionFailedAction failedAction = entity.GetFailedAction(caller);

                bool isEnabled = failedAction != ConditionFailedAction.Disable;

                if (menuCommand != null && menuCommand is IMenuCommand)
                    isEnabled &= (((IMenuCommand)menuCommand).IsEnabled || dropDownEnabled);

                return isEnabled;
            }
        }

        /// <summary>
        /// Indikuje dostupnost tlačítka
        /// </summary>
        public bool ButtonEnabled
        {
            get { return buttonEnabled; }
            set
            {
                buttonEnabled = value;
                UpdateButtonImage();
            }
        }

        /// <summary>
        /// Aktualizace obrázku tlačítka
        /// </summary>
        private void UpdateButtonImage()
        {
            Image = buttonEnabled ? imgButtonEnabled : imgButtonDisabled;
        }

        /// <summary>
        /// Dostupnost rozbalovacích podpoložek
        /// </summary>
        public bool DropDownEnabled
        {
            get { return dropDownEnabled; }
            set { dropDownEnabled = value; }
        }

        /// <summary>
        /// Aktualizace statusu
        /// </summary>
        public virtual void UpdateStatus()
        {
            if (entity != null)
            {
                ConditionFailedAction failedAction = entity.GetFailedAction(caller);
                bool isVisible = failedAction != ConditionFailedAction.Exclude;
                if (base.Visible != isVisible)
                    base.Visible = isVisible;

                if (this.Visible)
                {
                    if (buttonEnabled && imgButtonEnabled != null)
                        Image = imgButtonEnabled;
                    else if (imgButtonDisabled != null)
                        Image = imgButtonDisabled;
                }
                base.Enabled = this.Enabled;
            }
        }

        /// <summary>
        /// Aktualizace textu položky
        /// </summary>
        public virtual void UpdateText()
        {
            if (entity != null)
            {
                if (entity.Properties.Contains("tooltip"))
                    ToolTipText = StringParser.Parse(entity.Properties["tooltip"]);

                if (entity.Properties.Contains("label"))
                    Text = StringParser.Parse(entity.Properties["label"]);
            }
        }
    }
}
