//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.MenuSeparator.cs                       </Name>
//    <Description> Rozdělovač položek menu                                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-03                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.Parsers.Gui;
using System.Runtime.InteropServices;
using System;

namespace Gordic.GFE.Parsers.Core.WinForm
{
    /// <summary>
    /// Rozdělovač položek menu
    /// </summary>
    [ComVisible(false)]
    public class MenuSeparator : ToolStripSeparator, IStatusUpdate
    {
        readonly object caller;
        Entity entity;
        readonly bool internVisible = true;
        /// <summary>
        /// Interní viditelnost objektu
        /// </summary>
        public bool InternVisible { get { return internVisible; } }
        /// <summary>
        /// Konstrultor třídy
        /// </summary>
        public MenuSeparator() { }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="entity">Jednotka s informaci</param>
        /// <param name="caller">Vlastník</param>
        public MenuSeparator(Entity entity, object caller)
        {
            this.caller = caller;
            this.entity = entity;
        }

        /// <summary>
        /// Aktualizace statusu
        /// </summary>
        public virtual void UpdateStatus()
        {
            if (entity != null)
            {
                ConditionFailedAction failedAction = entity.GetFailedAction(caller);
                this.Enabled = failedAction != ConditionFailedAction.Disable;
                this.Visible = failedAction != ConditionFailedAction.Exclude;
            }
        }

        /// <summary>
        /// Aktualiyace textu položky (žádná, protože je to rozdělovač)
        /// </summary>
        public virtual void UpdateText() { }

        /// <summary>
        /// inicializace objekt
        /// </summary>
        public void Initialize()
        {
            RightToLeft = RightToLeft.Inherit;
        }
    }
}
