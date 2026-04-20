//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.IDifferenceHandler.cs                  </Name>
//    <Description> Rozhraní pro kontrolu změny šířky a výšky                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-05-10                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.WinClient.Gui
{
    /// <summary>
    /// Rozhraní pro kontrolu změny šířky a výšky
    /// </summary>
    interface IDifferenceHandler
    {
        /// <summary>
        /// Povilená kontrola změny šířky objektu 
        /// </summary>
        bool EnableWidthDifference { get; }
        /// <summary>
        /// Povolená kontrola změny výšky objektu
        /// </summary>
        bool EnableHeightDifference { get; }

        /// <summary>
        /// Hodnota změny kroku
        /// </summary>
        string DifferenceWidth { get; set; }
        /// <summary>
        /// Hodnota změny kroku
        /// </summary>
        string DifferenceHeight { get; set; }
    }

}
