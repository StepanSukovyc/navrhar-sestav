//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ToolBarDragDropButton.cs               </Name>
//    <Description> Tlačítko pro tažení                                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using System.Drawing;
using Gordic.GFE.Parsers.Gui;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Core.WinForm
{
    /// <summary>
    /// Tlačítko pro tažení
    /// </summary>
    [ComVisible(false)]
    public class ToolBarDragDropButton : ToolStripButton, IStatusUpdate
    {
        readonly object caller;
        Entity entity;
        ICommand menuCommand = null;
        readonly object dragdropobject = null;
        readonly bool internVisible = true;
        /// <summary>
        /// Interní viditelnost objektu
        /// </summary>
        public bool InternVisible
        {
            get { return internVisible; }
        }

        /// <summary>
        /// Vytvoření položky
        /// </summary>
        /// <param name="entity">Popis ze souboru doplňku</param>
        /// <param name="caller">Volající</param>
        public ToolBarDragDropButton(Entity entity, object caller)
        {
            this.caller = caller;
            this.entity = entity;
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="caller"></param>
        /// <param name="dragdropobject"></param>
        public ToolBarDragDropButton(Entity entity, object caller, object dragdropobject)
            : this(entity, caller)
        {
            this.dragdropobject = dragdropobject;
        }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        public void Initialize()
        {
            RightToLeft = RightToLeft.Inherit;
            try
            {
                menuCommand = (ICommand)entity.AddIn.CreateObject(entity.Properties["class"]);
                menuCommand.Owner = this;
            }
            catch (Exception) { }

            if (Image == null && entity.Properties.Contains("icon"))
                Image = WinFormsResourceService.GetBitmap(StringParser.Parse(entity.Properties["icon"]));

            UpdateStatus();
            UpdateText();
        }

        /// <summary>
        /// Přetížení kvůli tažení
        /// </summary>
        /// <param name="mea"></param>
        protected override void OnMouseMove(MouseEventArgs mea)
        {
            base.OnMouseMove(mea);
            if (mea.Button == MouseButtons.Left
                && dragdropobject != null)
                DoDragDrop(dragdropobject, DragDropEffects.Copy);
        }

        /// <summary>
        /// Aktualizace statusu
        /// </summary>
        public virtual void UpdateStatus()
        {
            if (entity != null)
            {
                ConditionFailedAction failedAction = entity.GetFailedAction(caller);
                this.Visible = failedAction != ConditionFailedAction.Exclude;
                bool isEnabled = failedAction != ConditionFailedAction.Disable;
                if (isEnabled && menuCommand != null && menuCommand is IMenuCommand)
                    isEnabled = ((IMenuCommand)menuCommand).IsEnabled;
                this.Enabled = isEnabled;

                if (this.Visible && entity.Properties.Contains("icon"))
                    Image = WinFormsResourceService.GetBitmap(StringParser.Parse(entity.Properties["icon"]));
            }
        }

        /// <summary>
        /// Aktualizace textu
        /// </summary>
        public virtual void UpdateText()
        {
            if (entity != null)
            {
                if (entity.Properties.Contains("tooltip"))
                    ToolTipText = StringParser.Parse(entity.Properties["tooltip"]);

                if (entity.Properties.Contains("label"))
                {
                    Text = StringParser.Parse(entity.Properties["label"]);
                    if (entity.Properties.Contains("fontstyle"))
                    {
                        FontStyle style = FontStyle.Bold;
                        if (Enum.TryParse(StringParser.Parse(entity.Properties["fontstyle"]), out style))
                            Font = new System.Drawing.Font(Font, style);
                    }
                }
            }
        }

    }
}
