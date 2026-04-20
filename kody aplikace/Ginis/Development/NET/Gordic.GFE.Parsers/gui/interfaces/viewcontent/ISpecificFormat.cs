//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ISpecificFormat.cs                       </Name>
//    <Description> Rozhraní specifického formátu                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-10                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní specifického formátu
    /// </summary>
    public interface ISpecificFormat
    {
        /// <summary>
        /// Typ formátu
        /// </summary>
        FormatType TypeFormat { get; }
        /// <summary>
        /// Změna zobrazení mřížky je povolená
        /// </summary>
        bool EnableGrid { get; }
        /// <summary>
        /// Indikátor dostuonosti změny řazení
        /// </summary>
        bool EnableOrder { get; }
        /// <summary>
        /// Změna zobrazení mřížky je povolená
        /// </summary>
        bool EnableHiddenObjects { get; }
        /// <summary>
        /// Zobrazit/skrýt mřížku
        /// </summary>
        bool ViewGrid { get; set; }
        /// <summary>
        /// Zobrazit/skrýt skryté objekty
        /// </summary>
        bool ViewHiddenObjects { get; set; }
        /// <summary>
        /// Zobrazit/skrýt řazení
        /// </summary>
        bool ViewOrder { get; set; }

        /// <summary>
        /// Nastavení odsazení
        /// </summary>
        void SetPageMargin();
    }
}
