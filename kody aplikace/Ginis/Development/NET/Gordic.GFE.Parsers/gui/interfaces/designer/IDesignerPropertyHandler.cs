//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IDesignerPropertyHandler.cs              </Name>
//    <Description> Rozhraní vlastností designéru                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-28                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní vlastností designéru
    /// </summary>
    public interface IDesignerPropertyHandler
    {
        /// <summary>
        /// veličina indikujíci dostupnosti změny viditelnosti rozlišení
        /// </summary>
        bool EnableShowGrid { get; }
        /// <summary>
        /// veličina indikujíci dostupnosti změny viditelnosti řazení
        /// </summary>
        bool EnableShowOrder { get; }
        /// <summary>
        /// Indikátor zobrazení mřížky
        /// </summary>
        bool ShowGrid { get; set; }
        /// <summary>
        /// Indikátor zobrazení řazení
        /// </summary>
        bool ShowOrder { get; set; }
        /// <summary>
        /// Indikátor podbarevní datových položek
        /// </summary>
        bool ShowColorOf { get; set; }
        /// <summary>
        /// Indikátor podbarevní položek
        /// </summary>
        bool ShowColorOfObjects { get; set; }
        /// <summary>
        /// Faktor zvětšení
        /// </summary>
        float Zoom { get; set; }
    }
}
