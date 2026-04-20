//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DictionaryMaker.cs                      </Name>
//    <Description> Vytvoření položky pro tažení nových komponent z lišty.      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Collections;
using System.ComponentModel;
using Gordic.General;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Vytvoření položky pro tažení nových komponent z lišty.
    /// </summary>
    public class DictionaryMaker : IMaker
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
            return new CustomComponentItem(null, null, subItems);
        }
    }

    /// <summary>
    /// Vytvoření položky pro tažení nových komponent z lišty.
    /// </summary>
    public class DictionaryItemMaker : IMaker
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
            return new DictionaryEntry(entity.Properties["key"], entity.Properties["value"]);
        }
    }

    /// <summary>
    /// Vytvoření položky pro tažení nových komponent z lišty.
    /// </summary>
    public class DictionaryConverterItemMaker : IMaker
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
            TypeConverter converter = (TypeConverter)entity.AddIn.CreateObject(entity.Properties["converter"]);

            if (converter != null && converter.CanConvertFrom(typeof(string)))
                try { return new DictionaryEntry(converter.ConvertFromString(entity.Properties["value"]), entity.Properties["value"]); }
                catch { }
            return null;
        }
    }

    /// <summary>
    /// Obsahuje jednu nebo více položek z jiného místa stromu doplňků.
    /// Lze použit atribut "item" (pro jednu položku) NEBO
    /// atribut "path" (na všechny položky z cílové cesty).
    /// </summary>
    /// <attribute name="item">
    /// Při použití tohoto atributu, tento nástroj vytváření objektů buduje položku, která 
    /// se nachází na určeném místě ve stromu doplňků
    /// </attribute>
    /// <attribute name="path">
    /// Při použití tohoto atributu, tento nástroj vytváření objektů vytvoři všechny položky uvnitř
    /// uvedené uvedené cesty a vrátí
    /// <see cref="IBuildItemsModifier"/> který zahrnuje všechny položky ve výstupném seznamu.
    /// </attribute>
    /// <usage>Kdekoliv</usage>
    /// <returns>
    /// </returns>
    public class IncludeDictionaryMaker : IMaker
    {
        /// <summary>
        /// Při výstupu FALSE, položka se vylučuje při nesplnění podmínky
        /// </summary>
        public bool HandleConditions
        {
            get { return false; }
        }

        /// <summary>
        /// Vytvoření položky
        /// </summary>
        /// <param name="caller">Volající</param>
        /// <param name="entity">Větev konfiguračního stromu</param>
        /// <param name="subItems">Případné podpoložky</param>
        /// <returns></returns>
        public object BuildItem(object caller, Entity entity, ArrayList subItems)
        {
            string item = entity.Properties["item"];
            string path = entity.Properties["path"];
            if (!string.IsNullOrEmpty(item))
                // položka
                return AddInTree.BuildItem(item, caller);
            else if (!string.IsNullOrEmpty(path))
                // více položek (cesta)
                return new IncludeReturnItem(caller, path);
            else
                MessageService.ShowInformation("<IncludeList> " + GResources.GetResourceText(29450120)); //RC 29450120 : potřebuje atribut 'item' (pro jednu položku) nebo atribut 'path' (pro více položek).
            return null;
        }

        /// <summary>
        /// Vrácené položky
        /// </summary>
        class IncludeReturnItem : IBuildItemsModifier
        {
            readonly string path;
            readonly object caller;

            /// <summary>
            /// Konstruktor třídy
            /// </summary>
            /// <param name="caller">Volající</param>
            /// <param name="path">Cesta k položkam</param>
            public IncludeReturnItem(object caller, string path)
            {
                this.caller = caller;
                this.path = path;
            }

            /// <summary>
            /// Provedení
            /// </summary>
            /// <param name="items">Položky</param>
            public void Apply(IList items)
            {
                AddInTreeNode node;
                try
                {
                    node = AddInTree.GetTreeNode(path);
                    foreach (object o in node.BuildChildItems(caller))
                        items.Add(o);
                }
                catch (TreePathNotFoundException)
                {
                    MessageService.ShowError(string.Format("IncludeListMaker: " + GResources.GetResourceText(29450121) + " '{0}'!", path)); //RC 29450121 : addinTree-Path nenalezeno cestu
                }
            }
        }
    }
}
