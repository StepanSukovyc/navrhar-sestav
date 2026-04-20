//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ToolBarDropDownButton.cs               </Name>
//    <Description> Rozbalovací tlačítko nástrojové lišty                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-04                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using System.Collections;
using Gordic.GFE.Parsers.Gui;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Core.WinForm
{
    /// <summary>
    /// Rozbalovací tlačítko nástrojové lišty
    /// </summary>
    [ComVisible(false)]
    public class ToolBarDropDownButton : ToolStripDropDownButton, IStatusUpdate
    {
        readonly object caller;
        Entity entity;
        ICommand menuBuilder = null;
        ArrayList subItems;
        bool internVisible = true;
        /// <summary>
        /// Interní viditelnost objektu
        /// </summary>
        public bool InternVisible
        {
            get { return internVisible; }
        }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="entity">Položka konfiguračního souboru</param>
        /// <param name="caller">Volající objekt</param>
        /// <param name="subItems">Podpoložky menu</param>
        public ToolBarDropDownButton(Entity entity, object caller, ArrayList subItems)
        {
            this.caller = caller;
            this.entity = entity;
            this.subItems = subItems;
        }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        public void Initialize()
        {
            RightToLeft = RightToLeft.Inherit;
            if (entity.Properties.Contains("label"))
                Text = StringParser.Parse(entity.Properties["label"]);

            if (Image == null && entity.Properties.Contains("icon"))
                Image = WinFormsResourceService.GetBitmap(StringParser.Parse(entity.Properties["icon"]));

            if (menuBuilder == null && entity.Properties.Contains("class"))
            {
                menuBuilder = entity.AddIn.CreateObject(StringParser.Parse(entity.Properties["class"])) as ICommand;
                menuBuilder.Owner = this;
            }

            UpdateStatus();
            UpdateText();

        }

        void CreateDropDownItems()
        {
            if (menuBuilder != null)
                return;

            if (subItems == null || subItems.Count == 0)
                return;

            DropDownItems.Clear();
            foreach (object item in subItems)
            {
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
                    DropDownItems.AddRange(submenuBuilder.BuildSubmenu(entity, caller));
                }
            }
        }

        /// <exclude/>
        protected override void OnDropDownShow(EventArgs e)
        {
            if (entity != null && !this.DropDown.Visible)
                CreateDropDownItems();
            
            base.OnDropDownShow(e);
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

                return failedAction != ConditionFailedAction.Disable;
            }
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
                internVisible = isVisible;
                if (this.Visible && entity.Properties.Contains("icon"))
                    Image = WinFormsResourceService.GetBitmap(StringParser.Parse(entity.Properties["icon"]));
            }
        }

        /// <summary>
        /// Aktuaizace textu položky
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
