//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IMenuCommand.cs                          </Name>
//    <Description> Menu příkaz                                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-05-07                                                  </Created>
//  </FileHeader>

using System.Drawing;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Menu příkaz
    /// </summary>
    public interface IMenuCommand : ICommand
    {
        /// <summary>
        /// Indikuje dostupnost příkazu
        /// </summary>
        bool IsEnabled { get; set; }

        /// <summary>
        /// barva pozadí příkazu
        /// </summary>
        Color BackColor { get; set; }
    }

}
