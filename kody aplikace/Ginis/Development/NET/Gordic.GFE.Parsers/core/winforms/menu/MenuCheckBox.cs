//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.MenuCheckBox.cs                        </Name>
//    <Description> Položka menu ve tvaru zaškrtavatka                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-03                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.General;
using Gordic.GFE.Parsers.Gui;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Core.WinForm
{
    /// <summary>
    /// Položka menu ve tvaru zaškrtavatka
    /// </summary>
    [ComVisible(false)]
    public class MenuCheckBox : ToolStripMenuItem, IStatusUpdate
    {
        readonly object caller;
        Entity entity;
        ICheckableMenuCommand menuCommand = null;
        readonly bool internVisible = true;
        /// <summary>
        /// Interní viditelnost objektu
        /// </summary>
        public bool InternVisible
        {
            get { return internVisible; }
        }

        void CreateMenuCommand()
        {
            if (menuCommand == null)
                try
                {
                    menuCommand = (ICheckableMenuCommand)entity.AddIn.CreateObject(entity.Properties["class"]);
                }
                catch (Exception e)
                {
                    MessageService.ShowErrorFormatted(GResources.GetResourceText(29450265) + ": '{0}'.\n" + GResources.GetResourceText(29450270) + ": '{1}'.", entity.Id, e.Message);  //RC 29450265 : Nelze vytvořit příkaz menu
                }
        }

        /// <summary>
        /// Příkaz
        /// </summary>
        public ICheckableMenuCommand MenuCommand
        {
            get
            {
                CreateMenuCommand();
                return menuCommand;
            }
        }

        /// <summary>
        /// popis
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="text">Text položky</param>
        public void Initialize(string text)
        {
            Text = text;
            Description = string.Empty;
            RightToLeft = RightToLeft.Inherit;
        }

        /// <summary>
        /// inicilaizace objektu
        /// </summary>
        public void Initialize()
        {
            Initialize(string.Empty);
            UpdateText();
        }


        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="entity">Jednotka s informací </param>
        /// <param name="caller">Volájící objekt</param>
        public MenuCheckBox(Entity entity, object caller)
        {
            this.caller = caller;
            this.entity = entity;
        }

        /// <summary>
        /// prázdný konstruktor třídy
        /// </summary>
        public MenuCheckBox() { }


        /// <summary>
        /// Reakce na stisknutí
        /// </summary>
        /// <param name="e"></param>
        protected override void OnClick(System.EventArgs e)
        {
            base.OnClick(e);
            if (entity != null)
            {
                MenuCommand.Run();
                Checked = MenuCommand.IsChecked;
            }
        }

        /// <summary>
        /// Položka je povolená
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
        /// Aktualizace statusu
        /// </summary>
        public virtual void UpdateStatus()
        {
            if (entity != null)
            {
                ConditionFailedAction failedAction = entity.GetFailedAction(caller);
                this.Visible = failedAction != ConditionFailedAction.Exclude;
                if (menuCommand == null && !string.IsNullOrEmpty(entity.Properties["checked"]))
                    Checked = string.Equals(StringParser.Parse(entity.Properties["checked"]),
                                            bool.TrueString, StringComparison.OrdinalIgnoreCase);
                else
                {
                    CreateMenuCommand();
                    if (menuCommand != null)
                        Checked = menuCommand.IsChecked;
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
