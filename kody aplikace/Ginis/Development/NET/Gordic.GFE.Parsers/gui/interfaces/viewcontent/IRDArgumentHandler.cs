//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.IArgumentHandler.cs                       </Name>
//    <Description> Rozhraní pro netypické argumenty                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-08-08                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní netypických argumentů
    /// </summary>
    public interface IRDArgumentHandler
    {
        /// <summary>
        /// Argument 'edit'
        /// </summary>
        bool Edit { get; set; }
        /// <summary>
        /// Indikuje dostupnost změny argumentu 'edit'
        /// </summary>
        bool EnableEdit { get; }
        /// <summary>
        /// Argument 'row'
        /// </summary>
        int Row { get; set; }
    }
}
