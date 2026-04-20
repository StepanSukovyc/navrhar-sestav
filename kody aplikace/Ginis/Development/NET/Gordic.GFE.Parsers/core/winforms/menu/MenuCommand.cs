//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.MenuCommand.cs                         </Name>
//    <Description> Položka menu                                                </Description>
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
    /// Položka menu
    /// </summary>
    [ComVisible(false)]
    public class MenuCommand : ToolStripMenuItem, IStatusUpdate
    {
        readonly object caller;
        Entity entity;
        ICommand menuCommand = null;
        /// <summary>
        /// Interní viditelnost objektu
        /// </summary>
        public bool InternVisible { get; } = true;

        /// <summary>
        /// Popis položky menu
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Příkaz položky menu
        /// </summary>
        public ICommand Command
        {
            get
            {
                if (menuCommand == null)
                    CreateCommand();

                return menuCommand;
            }
        }

        void CreateCommand()
        {
            //try
            //{
            menuCommand = (ICommand)entity.AddIn.CreateObject(entity.Properties["class"]);
            if (menuCommand != null)
                menuCommand.Owner = caller;
            //}
            //catch (Exception e) { MessageService.ShowError(e, GResources.GetResourceText(29450265) +  ": " + entity.Id); } //RC 29450265 : Nelze vytvořit příkaz menu
        }

        /// <summary>
        /// Klavesové zkratky
        /// </summary>
        /// <param name="shortcutString">řetězcová podoba zkratky</param>
        /// <returns></returns>
        public static Keys ParseShortcut(string shortcutString)
        {
            Keys shortCut = Keys.None;
            bool isShortCut = true;
            //try
            //{
            Keys kk = Keys.None;
            foreach (string key in shortcutString.Split('|'))
                if (Enum.TryParse(key, out kk))
                    shortCut |= kk;
                else
                    isShortCut = false;
            //}
            //catch (Exception ex)
            //{
            //    MessageService.ShowError(ex);
            //    return System.Windows.Forms.Keys.None;
            //}

            return isShortCut ? shortCut : Keys.None;
        }

        /// <summary>
        /// Vytvoření příkazu menu
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="caller">vlastník</param>
        /// <param name="createCommand">Indikuje vytvoření příkazu</param>
        public MenuCommand(Entity entity, object caller, bool createCommand)
        {
            this.caller = caller;
            this.entity = entity;

            if (createCommand)
                CreateCommand();

            if (entity.Properties.Contains("shortcut"))
                try { ShortcutKeys = ParseShortcut(entity.Properties["shortcut"]); }
                catch (Exception ex) { MessageService.ShowError(ex); }
        }

        /// <summary>
        /// prázdný konstruktor třídy
        /// </summary>
        public MenuCommand() { }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="handler">handler příkazu</param>
        public MenuCommand(EventHandler handler)
        {
            Click += handler;
        }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="label">štítek</param>
        public void Initialize(string label)
        {
            RightToLeft = RightToLeft.Inherit;
            Text = StringParser.Parse(label);
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public void Initialize()
        {
            RightToLeft = RightToLeft.Inherit;
            UpdateText();
        }

        /// <summary>
        /// Reakce na stisknutí položky
        /// </summary>
        /// <param name="e"></param>
        protected override void OnClick(System.EventArgs e)
        {
            base.OnClick(e);
            if (entity != null)
                if (GetVisible() && Enabled)
                {
                    ICommand cmd = Command;
                    if (cmd != null)
                        try { cmd.Run(); }
                        catch (NotImplementedException) { MessageService.ShowErrorFormatted(string.Join(" ", GResources.GetResourceText(29450268), "{0}", GResources.GetResourceText(29450267)), entity.Properties.Get("class", string.Empty)); } //RC 29450268 : Metoda nebo operace
                        catch (Exception ex) { MessageService.ShowErrorFormatted(GResources.GetResourceText(29450269) + " {0}: {1}", entity.Properties.Get("class", string.Empty), ex.Message); } //RC 29450269 : Chyba metody nebo operace
                }
        }

        /// <summary>
        /// Dostupnost příkazu
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
                    isEnabled &= ((IMenuCommand)menuCommand).IsEnabled;
                return isEnabled;
            }
        }

        bool GetVisible() => entity == null || entity.GetFailedAction(caller) != ConditionFailedAction.Exclude;

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

                Visible = GetVisible();
            }
        }

        /// <summary>
        /// Aktualizace textu položky menu
        /// </summary>
        public virtual void UpdateText()
        {
            if (entity != null)
                Text = StringParser.Parse(entity.Properties["label"]);
        }
    }
}
