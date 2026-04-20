//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FontComboBox.cs                        </Name>
//    <Description> Položka písma                                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-11-15                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.WinClient.Base
{
    /// <summary>
    /// Položka písma
    /// </summary>
    class FontItem
    {
        /// <summary>
        /// Zvýraznění
        /// </summary>
        public bool Bold { get; set; }

        /// <summary>
        /// Popis položky
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Název písma
        /// </summary>
        public string FontName { get; set; }

        /// <summary>
        /// Řetězcová prezentace položky
        /// </summary>
        /// <returns></returns>
        public override string ToString() { return FontName; }

        /// <summary>
        /// Položka písma
        /// </summary>
        public FontItem() { Bold = false; }
    }
}
