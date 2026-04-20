//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IDataManagerHandler.cs                   </Name>
//    <Description> rozhraní pro práci s daty                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-11                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// rozhraní pro práci s daty
    /// </summary>
    public interface IDataManagerHandler
    {
        /// <summary>
        /// správce dostupných dat
        /// </summary>
        DefaultDataManager DataManager { get; }
        /// <summary>
        /// přidružená datová struktura
        /// </summary>
        GFEStructure Structure { get; }
        /// <summary>
        /// data formuláře
        /// </summary>
        byte[] FileData { get; }
        /// <summary>
        /// Zdrojový soubor, ze kterého byla vytvořená jednotka.
        /// </summary>
        string FileContent { get; set; }

        IFiller Filler { get; }
    }
}
