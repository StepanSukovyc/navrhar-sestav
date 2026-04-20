//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.MenuItemMaker.cs                        </Name>
//    <Description> Vytvoří položku z umístění v konfiguračním stromu.          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Collections;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Vytvoří položku z umístění v konfiguračním stromu.
    /// </summary>
    /// <attribute name="label" use="required">
    /// Štítek položky
    /// </attribute>
    /// <attribute name="type" use="optional" enum="Separator;CheckBox;Item;Command;Menu;Builder">
    /// Tento atribut má jednu z následujících hodnot:
    /// Separator, CheckBox, Item=Command, Menu (=z podpoložkami),
    /// Builder (=třída implementovaná ISubmenuBuilder).
    /// Implicitně: Command.
    /// </attribute>
    /// <attribute name="loadclasslazy" use="optional">
    /// Jenom pro typ "Item"/"Command".
    /// Když nastaveno na FALSE, COMMAND třída je načtená hned (místo lazy-loading)
    /// </attribute>
    /// <attribute name="icon" use="optional">
    /// Obrázek položky
    /// </attribute>
    /// <attribute name="class" use="optional">
    /// Command třídy, která se spouští po kliknutí.
    /// </attribute>
    /// <attribute name="link" use="optional">
    /// Jenom pro typ "Item"/"Command".
    /// </attribute>
    /// <attribute name="shortcut" use="optional">
    /// Shortcut které aktivují akcí (např. "Control|S").
    /// </attribute>
    /// <children childTypes="MenuItem">
    /// Pokud "type" je "Menu", položka může mít podpoložky.
    /// </children>
    /// <usage>jiné cesty pro nabídku, např. /ReportDesigner/MainMenu</usage>
    /// <returns>
    /// MenuItemDescriptor objekt.
    /// </returns>
    /// <conditions>Podmínka vázaná na položku, "Exclude" mapuje "Visible = false", "Disable" na "Enabled = false"</conditions>
    public class MenuItemMaker : IMaker
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
            return new MenuItemDescriptor(caller, entity, subItems);
        }
    }

    /// <summary>
    /// Prezentuje položku menu. Tento objekt se vytváří pomocí MenuItemMaker a potom
    /// se přeb´vádí do GUI specifického objektu položky menu
    /// </summary>
    public sealed class MenuItemDescriptor
    {
        /// <summary>
        /// Vlastník
        /// </summary>
        public readonly object Caller;
        /// <summary>
        /// Jednotka s informaci
        /// </summary>
        public readonly Entity Entity;
        /// <summary>
        /// Podpoložky
        /// </summary>
        public readonly IList SubItems;

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="caller">vlastník</param>
        /// <param name="entity">Větev konfiguračního stromu</param>
        /// <param name="subItems">podpoložky dané položky</param>
        public MenuItemDescriptor(object caller, Entity entity, IList subItems)
        {
            this.Caller = caller;
            this.Entity = entity;
            this.SubItems = subItems;
        }
    }

}
