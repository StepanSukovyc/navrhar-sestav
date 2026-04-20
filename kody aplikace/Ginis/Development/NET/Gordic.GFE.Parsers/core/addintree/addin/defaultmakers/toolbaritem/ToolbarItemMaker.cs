//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ToolbarItemMaker.cs                     </Name>
//    <Description> Vytvoření položky nástrojové lišty z konfiguračního stromu. </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Collections;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Vytvoření položky nástrojové lišty z konfiguračního stromu.
    /// </summary>
    /// <attribute name="label" use="optional">
    /// štítek položky nástrojové lišty
    /// </attribute>
    /// <attribute name="icon" use="optional">
    /// Obrázek položky nástrojové lišty
    /// </attribute>
    /// <attribute name="type" use="optional" enum="Separator;CheckBox;Item;ComboBox;DropDownButton">
    /// Tento atribut může mít hodnoty:
    /// Separator, CheckBox, Item, ComboBox, DropDownButton
    /// </attribute>
    /// <attribute name="loadclasslazy" use="optional">
    /// Pouze pro typ "Item".
    /// </attribute>
    /// <attribute name="tooltip" use="optional">
    /// Tooltip položky nástrojové lišty
    /// </attribute>
    /// <attribute name="class">
    /// Třída příkazu, který se spusti po kliknuti na položku; nebo třída pro práci s 
    /// ComboBox/DropDownButton. Povinná pro všechyn kromě "Separator".
    /// </attribute>
    /// <usage>Jiné cesty k položkam nástrojové lišty, např. /ReportDesigner/Desktop/ToolBar</usage>
    /// <children childTypes="MenuItem">DropDown tlačítko má podpoložky.</children>
    /// <returns>
    /// </returns>
    public class ToolbarItemMaker : IMaker
    {
        /// <summary>
        /// Podmínka vázaná na položku.
        /// </summary>
        public bool HandleConditions { get { return true; } }

        /// <summary>
        /// Vytvoření položky
        /// </summary>
        /// <param name="caller">Volající objekt</param>
        /// <param name="entity">Položka konfiguračního stromu</param>
        /// <param name="subItems">Případné podpoložky</param>
        /// <returns></returns>
        public object BuildItem(object caller, Entity entity, ArrayList subItems)
        {
            return new ToolbarItemDescriptor(caller, entity, subItems);
        }
    }

    /// <summary>
    /// Prezentuje položku nástrojové lišty.
    /// Tento objekt se vytváří pomocí ToolbarItemMaker a převádí se do GUI specifického objektu ToolbarService.
    /// </summary>
    public sealed class ToolbarItemDescriptor
    {
        /// <summary>
        /// Volající objekt
        /// </summary>
        public readonly object Caller;
        /// <summary>
        /// Jednotka s informaci
        /// </summary>
        public readonly Entity Entity;
        /// <summary>
        /// Podpoložky dané položky
        /// </summary>
        public readonly IList SubItems;

        /// <summary>
        /// Vytvoření položky
        /// </summary>
        /// <param name="caller">volající</param>
        /// <param name="entity">Větev konfiguračního stromu</param>
        /// <param name="subItems">podpoložky dané položky</param>
        public ToolbarItemDescriptor(object caller, Entity entity, IList subItems)
        {
            this.Caller = caller;
            this.Entity = entity;
            this.SubItems = subItems;
        }
    }

}
