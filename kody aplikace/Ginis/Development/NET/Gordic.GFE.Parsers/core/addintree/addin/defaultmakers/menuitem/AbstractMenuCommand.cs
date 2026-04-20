//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AbstractMenuCommand.cs                   </Name>
//    <Description> Abstratní implementace příkazu menu                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-10                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Abstratní implementace příkazu menu
    /// </summary>
    public abstract class AbstractMenuCommand : AbstractCommand, IMenuCommand
    {
        bool isEnabled = true;
        /// <summary>
        /// Dostupnost příkazu
        /// </summary>
        public virtual bool IsEnabled
        {
            get => isEnabled;
            set => isEnabled = value;
        }

        System.Drawing.Color backColor = System.Drawing.Color.Transparent;
        /// <summary>
        /// barva pozadí
        /// </summary>
        public virtual System.Drawing.Color BackColor
        {
            get => backColor;
            set => backColor = value;
        }
    }
}
