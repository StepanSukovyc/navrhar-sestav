//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ToolBarLabel.cs                        </Name>
//    <Description> Štítek nástrojové lišty                                     </Description>
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
    /// Štítek nástrojové lišty
    /// </summary>
    [ComVisible(false)]
    public class ToolBarLabel : ToolStripLabel, IStatusUpdate
    {
        readonly object caller;
        Entity entity;
        ICommand menuCommand = null;
        bool internVisible = true;
        /// <summary>
        /// Interní viditelnost objektu
        /// </summary>
        public bool InternVisible { get { return internVisible; } }

        /// <summary>
        /// Volající objekt
        /// </summary>
        public object Caller { get { return caller; } }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="entity">Položka konfiguračního souboru</param>
        /// <param name="caller"></param>
        public ToolBarLabel(Entity entity, object caller)
        {
            this.caller = caller;
            this.entity = entity;

            if (entity.Properties.Contains("class"))
            {
                menuCommand = (ICommand)entity.AddIn.CreateObject(entity.Properties["class"]);
                menuCommand.Owner = this;
            }
        }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        public void Initialize()
        {
            RightToLeft = RightToLeft.Inherit;
            UpdateText();
            UpdateStatus();
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
                this.Enabled = failedAction != ConditionFailedAction.Disable;
                this.Visible = failedAction != ConditionFailedAction.Exclude;
                internVisible = failedAction != ConditionFailedAction.Exclude;
            }
        }

        /// <summary>
        /// Aktualizace textu
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
