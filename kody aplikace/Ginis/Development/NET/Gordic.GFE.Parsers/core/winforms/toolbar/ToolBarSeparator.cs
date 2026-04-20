//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ToolBarSeparator.cs                    </Name>
//    <Description> Oddělovač položek nástrojové lišty                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-04                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.Parsers.Gui;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Core.WinForm
{
    /// <summary>
    /// Oddělovač položek nástrojové lišty
    /// </summary>
    [ComVisible(false)]
    public class ToolBarSeparator : ToolStripSeparator, IStatusUpdate
    {
        readonly object caller;
        Entity entity;
        bool internVisible = true;
        /// <summary>
        /// Interní viditelnost objektu
        /// </summary>
        public bool InternVisible { get { return internVisible; } }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="entity">Jednotka s informaci o objektu</param>
        /// <param name="caller">Volající</param>
        public ToolBarSeparator(Entity entity, object caller)
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
        }
        /// <summary>
        /// aktualizace statusu
        /// </summary>
        public virtual void UpdateStatus()
        {
            if (entity != null)
            {
                ConditionFailedAction failedAction = entity.GetFailedAction(caller);
                this.Enabled = failedAction != ConditionFailedAction.Disable;
                this.Visible = failedAction != ConditionFailedAction.Exclude;
                internVisible = failedAction != ConditionFailedAction.Exclude;
            }
        }

        /// <summary>
        /// Aktualizace textu položky
        /// </summary>
        public virtual void UpdateText() { }
    }
}
