//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.FileFilterMaker.cs                      </Name>
//    <Description> Vytvoření filtru na soubory pro OpenFileDialogs or SaveFileDialogs.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Collections;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Vytvoření filtru na soubory pro OpenFileDialogs or SaveFileDialogs.
    /// </summary>
    /// <attribute name="name" use="required">
    /// Název filtru souboru na vstupu.
    /// </attribute>
    /// <attribute name="extensions" use="required">
    /// Rozšíření spojené s tímto filtrem souboru.
    /// </attribute>
    /// <usage>Pouze v /ReportDesigner/Desktop/OpenFileFilter</usage>
    /// <returns>
    /// řádek ve formátu "name|extensions".
    /// </returns>
    public class FileFilterMaker : IMaker
    {
        /// <summary>
        /// Existuje podmínka spojená s daným filtrem.
        /// </summary>
        public bool HandleConditions { get => false; }

        /// <summary>
        /// Vytvoření položky
        /// </summary>
        /// <param name="caller">Volající aplikace</param>
        /// <param name="entity">Položka konfiguračního stromu</param>
        /// <param name="subItems">Podpoložky</param>
        /// <returns></returns>
        public object BuildItem(object caller, Entity entity, ArrayList subItems) => StringParser.Parse(entity.Properties["name"]) + "|" + entity.Properties["extensions"];
    }
}
