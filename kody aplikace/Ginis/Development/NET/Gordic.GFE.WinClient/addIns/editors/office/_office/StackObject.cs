//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.StackObject.cs                         </Name>
//    <Description> Struktura pro uchování názvu a indexu                       </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-03-19                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Struktura pro uchování názvu a indexu
    /// </summary>
    public class StackObject
    {
        /// <summary>
        /// Název položky objektu
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Název stack objektu: head, body, foot, group, region
        /// </summary>
        public string Type { get; set; }
        /// <summary>
        /// Pozice stack objektu v XLS souboru
        /// </summary>
        public int Index { get; set; }
        /// <summary>
        /// Text stack objektu - obsah komentáře
        /// </summary>
        public string Text { get; set; }

        /// <summary>
        /// Indikuje, zda sekce už obsahuje alespoň jeden value-of.
        /// </summary>
        public bool HasValueOf { get; set; }
    }

}
