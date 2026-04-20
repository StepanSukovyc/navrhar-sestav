//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AbstractCheckableMenuCommand.cs          </Name>
//    <Description> Abstraktní třída check boxů                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-10                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Abstraktní třída check boxů
    /// </summary>
    public abstract class AbstractCheckableMenuCommand : AbstractMenuCommand, ICheckableMenuCommand
    {
        /// <summary>
        /// Je vybrán nebo není
        /// </summary>
        public virtual bool IsChecked { get; set; }
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run() { IsChecked = !IsChecked; }
    }
}
