//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ITextBoxCommand.cs                       </Name>
//    <Description> Rozhraní příkazu textové položky                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-10                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Rozhraní příkazu textové položky
    /// </summary>
    public interface ITextBoxCommand : ICommand
    {
        /// <summary>
        /// Indikuje dostupnost příkazu
        /// </summary>
        bool IsEnabled { get; set; }
    }
}
