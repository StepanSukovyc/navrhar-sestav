//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ToggleMessageViewWordWrap.cs           </Name>
//    <Description> příkaz přepnutí zalámování řádků                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-10                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;

namespace Gordic.GFE.WinClient.MessageView
{
    /// <summary>
    /// příkaz přepnutí zalámování řádků
    /// </summary>
    public class ToggleMessageViewWordWrap : AbstractCheckableMenuCommand
    {
        ToolBarCheckBox checkBox;
        /// <summary>
        /// Indikuje zaškrtnutí
        /// </summary>
        public override bool IsChecked
        {
            get { return CompilerMessageView.Instance.WordWrap; }
            set { CompilerMessageView.Instance.WordWrap = value; }
        }
        /// <summary>
        /// vlastník
        /// </summary>
        public override object Owner
        {
            set
            {
                base.Owner = value;
                checkBox = (ToolBarCheckBox)Owner;
            }
        }
        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run() { IsChecked = !IsChecked; }
    }
}
