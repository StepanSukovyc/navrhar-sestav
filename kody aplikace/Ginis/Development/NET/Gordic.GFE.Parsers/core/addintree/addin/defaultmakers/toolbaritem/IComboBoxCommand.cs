//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IComboBoxCommand.cs                      </Name>
//    <Description> Rozhraní příkazu rozbalovacího seznamu                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-10                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Rozhraní příkazu rozbalovacího seznamu
    /// </summary>
    public interface IComboBoxCommand : ICommand
    {
        /// <summary>
        /// Objekt je povolený nebo není
        /// </summary>
        bool IsEnabled { get; set; }
    }
}
