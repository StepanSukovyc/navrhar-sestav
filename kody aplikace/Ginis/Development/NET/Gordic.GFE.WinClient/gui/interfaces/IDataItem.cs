//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.IDataItem.cs                             </Name>
//    <Description> Rozhraní ovladačů datových položek                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;

namespace Gordic.GFE.WinClient.Gui
{
    /// <summary>
    /// Rozhraní ovladačů datových položek
    /// </summary>
    interface IDataItemHandler
    {
        /// <summary>
        /// Nastavení zobrazovacích názvů pro štítky a buňky dle struktury dat
        /// </summary>
        /// <param name="structure">Struktura dat</param>
        void SetDisplayName(GFEStructure structure);
        /// <summary>
        /// Nastavení názvu regionu stránky
        /// </summary>
        /// <param name="obj">Kontejner komponentů</param>
        /// <param name="structureview">Jednotka struktury dat</param>
        void SetFullFieldName(URAbstractContainer obj, StructureView.StructureViewEntry structureview);
    }
}
