//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DialogPanelMaker.cs                   </Name>
//    <Description> Vytvoření DefaultDialogPanelDescriptor objektů, které se používají v dialogu Možnosti.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-17                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Collections;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Vytvoření DefaultDialogPanelDescriptor objektů, které se používají v dialogu Možnosti.
    /// </summary>
    class DialogPanelMaker : IMaker
    {
        /// <summary>
        /// Při výstupu FALSE, položka se vylučuje při nesplnění podmínky 
        /// </summary>
        public bool HandleConditions { get { return false; } }

        /// <summary>
        /// Vytvoření položky se specifickými podpoložkami.
        /// </summary>
        /// <param name="caller">volající</param>
        /// <param name="entity">větev konfiguračního stromu</param>
        /// <param name="subItems">podpoložky</param>
        /// <returns></returns>
        public object BuildItem(object caller, Entity entity, ArrayList subItems)
        {
            string label = entity.Properties["label"];

            if (subItems == null || subItems.Count == 0)
            {
                if (entity.Properties.Contains("class"))
                    return new DefaultDialogPanelDescriptor(entity.Id, StringParser.Parse(label), entity.AddIn, entity.Properties["class"]);
                else
                    return new DefaultDialogPanelDescriptor(entity.Id, StringParser.Parse(label));
            }

            List<IDialogPanelDescriptor> newList = new List<IDialogPanelDescriptor>();
            foreach (IDialogPanelDescriptor d in subItems)
                newList.Add(d);

            return new DefaultDialogPanelDescriptor(entity.Id, StringParser.Parse(label), newList);
        }
    }
}
