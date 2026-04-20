//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AbstractPropertyPanel.cs                   </Name>
//    <Description> Abstraktní třída Možnosti                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Hosting;
using System;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Abstraktní třída vlastnosti
    /// </summary>
    public abstract class AbstractPropertyPanel : AbstractOptionPanel
    {
        /// <summary>
        /// Reakce na ukončení s akceptací změn
        /// </summary>
        public event EventHandler AcceptEvent;

        /// <summary>
        /// Získání nové hodnoty - PropertyGrid
        /// </summary>
        /// <returns>Nová hodnota</returns>
        abstract public object PropertyValue { get; }

        /// <summary>
        /// pohled na obsah
        /// </summary>
        protected IViewContent view;
        /// <summary>
        /// Pohled na obsah
        /// </summary>
        public IViewContent View { get => view; set { view = value; } }

        /// <summary>
        /// služba vybraných objektů
        /// </summary>
        protected SelectionService Service { get => View is IHost ? (SelectionService)(View as IHost).ServiceSelection : null; }

        /// <summary>
        /// Zpracování zpráv
        /// </summary>
        /// <param name="message">typ zprávy</param>
        /// <returns>TRUE - zpráva zpracováná</returns>
        public override bool ReceiveDialogMessage(DialogMessage message)
        {
            switch (message)
            {
                case DialogMessage.def:
                    SetDefault();
                    return true;
                case DialogMessage.ok:
                    return Accept();
                case DialogMessage.activated:
                case DialogMessage.cancel:
                case DialogMessage.finish:
                case DialogMessage.help:
                case DialogMessage.next:
                case DialogMessage.prev:
                default:
                    return base.ReceiveDialogMessage(message);
            }
        }

        /// <summary>
        /// Reakce na tlačítko Výchozí hodnoty
        /// </summary>
        /// <returns>True - Nastavení provedené</returns>
        protected abstract void SetDefault();
        /// <summary>
        /// Reakce na akceptace změn
        /// </summary>
        /// <returns>TRUE- změna provedená</returns>
        protected virtual bool Accept() { OnAccept(); return true; }

        void OnAccept()
        {
            AcceptEvent?.Invoke(this, EventArgs.Empty);
        }

        /// <summary>
        /// Podmínky viditelnosti daného panelu
        /// </summary>
        /// <returns>TRUE - podmínka je splněná</returns>
        public virtual bool VisibleCondition() => true;

        /// <summary>
        /// kontext
        /// </summary>
        public System.ComponentModel.ITypeDescriptorContext Context { get; set; }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // AbstractPropertyPanel
            // 
            this.Name = "AbstractPropertyPanel";
            this.ResumeLayout(false);

        }
    }
}
