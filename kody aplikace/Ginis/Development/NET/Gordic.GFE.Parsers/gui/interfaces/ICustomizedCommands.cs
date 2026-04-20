//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ICustomizedCommands.cs                </Name>
//    <Description> Umožňuje IViewContent zpracovát příkaz Uložit místo toho, aby se použil v OpenedFile.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.Parsers.Gui
{
    public delegate void EventHandlerOpenedFileArgument(OpenedFile file);

    /// <summary>
    /// Umožňuje IViewContent zpracovát příkaz Uložit místo toho, aby se použil v OpenedFile.
    /// </summary>
    public interface ICustomizedCommands
    {
        /// <summary>
        /// Vrácí TRUE, pokud operace Uložit je k dispozici, jinak FALSE
        /// </summary>
        bool SaveCommand();

        /// <summary>
        /// Vrácí TRUE, pokud je k dispozici příkaz Uložit jako, jinak FALSE
        /// </summary>
        bool SaveAsCommand();

        /// <summary>
        /// Uložení souboru do databáze
        /// </summary>
        /// <returns>TRUE, pokud operace je dostupná</returns>
        bool SaveToDatabaseCommand(EventHandlerOpenedFileArgument eventHandler);
    }
}
