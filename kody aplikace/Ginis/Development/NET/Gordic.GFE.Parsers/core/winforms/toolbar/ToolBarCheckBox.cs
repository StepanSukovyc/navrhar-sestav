//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ToolBarCheckBox.cs                     </Name>
//    <Description> Položka nástrojové lišty ve tvaru zaškrtavátka              </Description>
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
    /// Položka nástrojové lišty ve tvaru zaškrtavátka
    /// </summary>
    [ComVisible(false)]
    public class ToolBarCheckBox : ToolStripButton, IStatusUpdate
    {
        readonly object caller;
        Entity entity;
        string description = string.Empty;
        ICheckableMenuCommand menuCommand = null;
        readonly bool internVisible = true;
        /// <summary>
        /// Interní viditelnost objektu
        /// </summary>
        public bool InternVisible { get { return internVisible; } }

        /// <summary>
        /// Akce položky
        /// </summary>
        public ICheckableMenuCommand MenuCommand { get { return menuCommand; } }

        /// <summary>
        /// Volající
        /// </summary>
        public object Caller { get { return caller; } }

        /// <summary>
        /// Popis položky
        /// </summary>
        public string Description { get { return description; } set { description = value; } }

        /// <summary>
        /// inicializace třídy
        /// </summary>
        /// <param name="text">Text u zaškrtavatka</param>
        public void Initialize(string text)
        {
            Initialize();
            Text = text;
        }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        public void Initialize()
        {
            RightToLeft = RightToLeft.Inherit;

            if (Image == null && entity.Properties.Contains("icon"))
                Image = WinFormsResourceService.GetBitmap(StringParser.Parse(entity.Properties["icon"]));

            UpdateText();
            UpdateStatus();
        }
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="entity">Jednotka s informaci o objektu</param>
        /// <param name="caller">Volající</param>
        public ToolBarCheckBox(Entity entity, object caller)
        {
            this.caller = caller;
            this.entity = entity;

            try { menuCommand = (ICheckableMenuCommand)entity.AddIn.CreateObject(entity.Properties["class"]); }
            catch (Exception) { }

            if (menuCommand == null)
                MessageService.ShowErrorFormatted(GResources.GetResourceText(29450274) + ": '{0}'", entity.Id); //RC 29450274 : Nelze vytvořit zaškrtavatko nástrojové lišty

            menuCommand.Owner = this;
        }

        /// <summary>
        /// Reakce na kliknutí
        /// </summary>
        /// <param name="e"></param>
        protected override void OnClick(EventArgs e)
        {
            base.OnClick(e);
            if (menuCommand != null)
            {
                menuCommand.Run();
                Checked = menuCommand.IsChecked;
            }
        }

        /// <summary>
        /// Položka je povolená nebo není
        /// </summary>
        public override bool Enabled
        {
            get
            {
                if (entity == null)
                    return base.Enabled;
                
                ConditionFailedAction failedAction = entity.GetFailedAction(caller);
                bool isEnabled = failedAction != ConditionFailedAction.Disable;

                if (menuCommand != null)
                    isEnabled &= menuCommand.IsEnabled;
                return isEnabled;
            }
        }

        /// <summary>
        /// Aktualizace stavu
        /// </summary>
        public virtual void UpdateStatus()
        {
            if (entity != null)
            {
                ConditionFailedAction failedAction = entity.GetFailedAction(caller);
                bool isVisible = failedAction != ConditionFailedAction.Exclude;
                if (isVisible != Visible)
                    Visible = isVisible;
                if (Visible && menuCommand != null)
                {
                    bool isChecked = menuCommand.IsChecked;
                    if (isChecked != Checked)
                        Checked = isChecked;
                }

                if (menuCommand != null)
                    base.Enabled = menuCommand.IsEnabled;

                if (this.Visible && entity.Properties.Contains("icon"))
                    Image = WinFormsResourceService.GetBitmap(StringParser.Parse(entity.Properties["icon"]));
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
