//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Menu.cs                                </Name>
//    <Description> Menu                                                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-03                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using System.Collections;
using Gordic.GFE.Parsers.Gui;
using Gordic.General;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Core.WinForm
{
    /// <summary>
    /// Menu
    /// </summary>
    [ComVisible(false)]
    public class Menu : ToolStripMenuItem, IStatusUpdate
    {
        Entity entity;
        readonly object caller;
        IList subItems;
        bool isInitialized;
        readonly bool internVisible = true;
        /// <summary>
        /// Interní viditelnost objektu
        /// </summary>
        public bool InternVisible { get { return internVisible; } }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="caller">Volající objekt</param>
        /// <param name="subItems">Podpoložky</param>
        public Menu(Entity entity, object caller, IList subItems)
        {
            if (subItems == null) subItems = new ArrayList(); // aby nepadlo, když položka nemá podpoložky
            this.entity = entity;
            this.caller = caller;
            this.subItems = subItems;
        }

        void CreateDropDownItems()
        {
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
                    try
                    {
                        ISubmenuBuilder submenuBuilder = (ISubmenuBuilder)item;
                        DropDownItems.AddRange(submenuBuilder.BuildSubmenu(entity, caller));
                    }
                    catch (Exception ex)
                    {
                        LoggingService.Error(GResources.GetResourceText(29450522) + "\r\n" + ex.Message); //RC 29450522 : podpoložky seznamu nelze vytvořit!
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
        /// inicializace objektu
        /// </summary>
        internal void Initialize()
        {
            RightToLeft = RightToLeft.Inherit;
            UpdateText();
        }


        /// <summary>
        /// Menu je k dispozici
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
                if (Image == null && entity.Properties.Contains("icon"))
                    try { Image = WinFormsResourceService.GetBitmap(entity.Properties["icon"]); }
                    catch (ResourceNotFoundException) { }

                ConditionFailedAction failedAction = entity.GetFailedAction(caller);
                this.Visible = failedAction != ConditionFailedAction.Exclude;
                if (!isInitialized && failedAction != ConditionFailedAction.Exclude)
                {
                    isInitialized = true;
                    CreateDropDownItems();
                    if (DropDownItems.Count == 0 && subItems.Count > 0)
                        DropDownItems.Add(new ToolStripMenuItem());
                }
            }
        }

        /// <summary>
        /// Aktualizace textu položky
        /// </summary>
        public virtual void UpdateText()
        {
            if (entity != null)
                Text = StringParser.Parse(entity.Properties["label"]);
        }
    }
}
