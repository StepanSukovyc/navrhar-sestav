//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ToolBarCommand.cs                      </Name>
//    <Description> Klasická položka nástrojové lišty                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-04                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.General;
using System.Drawing;
using Gordic.GFE.Parsers.Gui;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Core.WinForm
{
    /// <summary>
    /// Klasická položka nástrojové lišty
    /// </summary>
    [ComVisible(false)]
    public class ToolBarCommand : ToolStripButton, IStatusUpdate
    {
        readonly object caller;
        Entity entity;
        ICommand menuCommand = null;
        bool internVisible;
        /// <summary>
        /// Internal visible
        /// </summary>
        public bool InternVisible { get { return internVisible; } }
        /// <summary>
        /// Vytvoření položky
        /// </summary>
        /// <param name="entity">Popis ze souboru doplňku</param>
        /// <param name="caller">Volající</param>
        public ToolBarCommand(Entity entity, object caller)
        {
            this.caller = caller;
            this.entity = entity;
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="createCommand">Akce položky</param>
        public void Initialize(bool createCommand)
        {
            RightToLeft = RightToLeft.Inherit;
            if (createCommand)
                menuCommand = (ICommand)entity.AddIn.CreateObject(entity.Properties["class"]);

            if (menuCommand != null)
                menuCommand.Owner = caller;

            if (entity.Properties.Contains("label"))
                Text = StringParser.Parse(entity.Properties["label"]);

            if (Image == null && entity.Properties.Contains("icon"))
                Image = WinFormsResourceService.GetBitmap(StringParser.Parse(entity.Properties["icon"]));

            UpdateStatus();
            UpdateText();
        }

        /// <summary>
        /// Reakce na stisknutí položky
        /// </summary>
        /// <param name="e"></param>
        protected override void OnClick(EventArgs e)
        {
            base.OnClick(e);
            if (menuCommand == null)
            {
                menuCommand = (ICommand)entity.AddIn.CreateObject(entity.Properties["class"]);
                if (menuCommand != null)
                    menuCommand.Owner = caller;
            }
            if (menuCommand != null)
            {
                //menuCommand.Owner = caller;
                try
                {
                    LoggingService.InfoFormatted(GResources.GetResourceText(29450266) + " '{0}' ...", menuCommand.GetType().Name); //RC 29450266 : spuštění příkazu
                    menuCommand.Run();
                }
                catch (NotImplementedException) { MessageService.ShowErrorFormatted(string.Join(" ", GResources.GetResourceText(29450268), "{0}", GResources.GetResourceText(29450267)), entity.Properties.Get("class", string.Empty)); } //RC 29450267 : není implementována!
                catch (Exception ex) { MessageService.ShowErrorFormatted(GResources.GetResourceText(29450269) + " {0}: {1}", entity.Properties.Get("class", string.Empty), ex.Message); } //RC 29450269 : Chyba metody nebo operace
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
                internVisible = failedAction != ConditionFailedAction.Exclude;
                bool isEnabled = failedAction != ConditionFailedAction.Disable;
                if (menuCommand != null && menuCommand is IMenuCommand)
                {
                    if (isEnabled)
                        isEnabled = ((IMenuCommand)menuCommand).IsEnabled;

                    if (((IMenuCommand)menuCommand).BackColor != this.BackColor)
                        this.BackColor = ((IMenuCommand)menuCommand).BackColor;
                }
                this.Enabled = isEnabled;

                if (/*this.Visible*/internVisible && entity.Properties.Contains("icon"))
                    Image = WinFormsResourceService.GetBitmap(StringParser.Parse(entity.Properties["icon"]));
                Visible = internVisible;

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
