//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.IOfficeDocument.cs                     </Name>
//    <Description> Roznraní dokuemntů office                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Dom;

namespace Gordic.GFE.Parsers.AddIns
{
    /// <summary>
    /// Roznraní dokuemntů office
    /// </summary>
    public interface IOfficeDocument
    {
        /// <summary>
        /// Nastavení vlastnosti
        /// </summary>
        /// <param name="section">způsoby vložení sekcí auto/head/body/foot</param>
        void SetInsertSectionProperty(params bool[] section);
        /// <summary>
        /// Načtení vlastnosti
        /// </summary>
        /// <param name="auto">indikuje automatické vložení sekce</param>
        /// <param name="head">Vlastnost head</param>
        /// <param name="body">Vlastnost body</param>
        /// <param name="foot">Vlastnost foot</param>
        void GetInsertSectionProperty(ref bool auto, ref bool head, ref bool body, ref bool foot);
        /// <summary>
        /// vlastsnosti sestavení
        /// </summary>
        IFormationDocumentProperty FormationProperty { get; }
        /// <summary>
        /// Vložení položky na objekt
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        void ItemDrag(object sender, System.Windows.Forms.ItemDragEventArgs e);
    }
}
