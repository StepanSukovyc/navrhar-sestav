//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IDataItem.cs                             </Name>
//    <Description> Rozhraní datové položky                                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní datové položky
    /// </summary>
    public interface IDataItem
    {
        /// <summary>
        /// indikuje, že element pochází ze sekce ROOT
        /// </summary>
        bool IsRootElement { get; }
        /// <summary>
        /// úplný název datové položky
        /// </summary>
        string DataTitle { get; set; }
        /// <summary>
        /// Datový název položky
        /// </summary>
        string DataName { get; }
        /// <summary>
        /// popis datové položky
        /// </summary>
        string DataDescription { get; set; }
        /// <summary>
        /// úplný název položky 
        /// </summary>
        string DataFullName { get; }
        /// <summary>
        /// Položka struktury
        /// </summary>
        object StructureItem { get; set; }
    }
}
