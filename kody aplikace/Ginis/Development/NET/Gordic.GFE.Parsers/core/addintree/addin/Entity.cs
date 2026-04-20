//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Entity.cs                                 </Name>
//    <Description> Prezentuje úzel ve stromě, z kterého se dá vytvořit položka </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Text;
using System.Xml;
using Gordic.GFE.Parsers.Gui;
using Gordic.General;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Prezentuje jednotku, ze které se dá vytvořit objekt
    /// </summary>
    public class Entity
    {
        AddIn addIn;
        readonly string name;
        Property properties;
        ICondition[] conditions;

        /// <summary>
        /// Název
        /// </summary>
        public string Name { get { return name; } }

        /// <summary>
        /// Doplněk
        /// </summary>
        public AddIn AddIn { get { return addIn; } }

        /// <summary>
        /// Jedinečný identifikátor
        /// </summary>
        public string Id { get { return properties["id"]; } }

        /// <summary>
        /// Vložit PO
        /// </summary>
        public string InsertAfter
        {
            get { return !properties.Contains("insertafter") ? string.Empty : properties["insertafter"]; }
            set { properties["insertafter"] = value; }
        }

        /// <summary>
        /// Vložit PŘED
        /// </summary>
        public string InsertBefore
        {
            get { return !properties.Contains("insertbefore") ? string.Empty : properties["insertbefore"]; }
            set { properties["insertbefore"] = value; }
        }

        /// <summary>
        /// Získání valstnosti dle kliče
        /// </summary>
        /// <param name="key">klič</param>
        /// <returns></returns>
        public object this[string key] { get { return properties.Get(key); } }

        /// <summary>
        /// Vastnosti
        /// </summary>
        public Property Properties { get { return properties; } }

        /// <summary>
        /// Seznam podmínek
        /// </summary>
        public ICondition[] Conditions { get { return conditions; } }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="addIn">Doplněk</param>
        /// <param name="name">Název</param>
        /// <param name="properties">Vlastnosti</param>
        /// <param name="conditions">Podmínky</param>
        public Entity(AddIn addIn, string name, Property properties, ICondition[] conditions)
        {
            this.addIn = addIn;
            this.name = name;
            this.properties = properties;
            this.conditions = conditions;
        }

        /// <summary>
        /// vytvoření jednotky dle vstupního parametru
        /// </summary>
        /// <param name="entry"></param>
        public Entity(ComponentTemplateEntry entry)
        {
            if (entry != null)
            {
                name = entry["name"];
                properties = new Property();
                foreach (XmlAttribute item in entry.Collection)
                    properties.Set(item.Name, item.Value);
                string input = "<text>" + GResources.GetResourceText(29450148) + "</text>"; //RC 29450148 : něco
                properties.Set("contentBytes", Encoding.UTF8.GetBytes(input));
            }
        }
        /// <summary>
        /// Získání akce po selhání
        /// </summary>
        /// <param name="caller">Vlastník</param>
        /// <returns></returns>
        public ConditionFailedAction GetFailedAction(object caller)
        {
            return Condition.GetFailedAction(conditions, caller);
        }

        /// <summary>
        /// Vytvoření položky
        /// </summary>
        /// <param name="owner">Vlastník</param>
        /// <param name="subItems">Seznam podpoložek</param>
        /// <returns></returns>
        public object BuildItem(object owner, ArrayList subItems)
        {
            if (!AddInTree.Makers.TryGetValue(Name, out IMaker maker))
                MessageService.ShowError(string.Format(string.Join(" ", GResources.GetResourceText(29450149), "'{0}'", GResources.GetResourceText(29450143)), Name)); //RC 29450143 : nebyl nalezen!

            if (maker != null)
            {
                if (!maker.HandleConditions && conditions.Length > 0)
                {
                    ConditionFailedAction action = GetFailedAction(owner);
                    if (action != ConditionFailedAction.Nothing)
                        return null;
                }

                return maker.BuildItem(owner, this, subItems);
            }

            return null;
        }

        /// <summary>
        /// řetězcová prezentace objektu
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return String.Format('[' + GResources.GetResourceText(29450150) + ": " + GResources.GetResourceText(29450116) + " = {0}, " + GResources.GetResourceText(29450151) + "={1}]", name, addIn.FileName); //RC 29450151 : doplněk
        }
    }
}
